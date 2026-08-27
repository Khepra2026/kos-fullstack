# KOS REGTECH AI - FULL AUDIT ORCHESTRATOR - PowerShell 7+ Windows
param(
  [ValidateSet("preproduction","production")][string]$Environment="preproduction",
  [string]$Frontend="https://kos.khepraexperts.com",
  [string]$Api="https://api.khepraexperts.com",
  [switch]$SkipK6,
  [switch]$AllowMutating=$false,
  [switch]$AllowStress=$false,
  [string]$ReportsDir="reports"
)
$ErrorActionPreference="Continue"
$env:KOS_ENV=$Environment
$PRODUCTION_SAFE = if($Environment -eq "production"){ $true } else { $false }

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "KOS REGTECH AI - BIG FOUR CONNECTIVITY AUDIT" -ForegroundColor Cyan
Write-Host "Env: $Environment | ProductionSafe: $PRODUCTION_SAFE" -ForegroundColor Yellow
Write-Host "Frontend: $Frontend | API: $Api" -ForegroundColor Yellow
Write-Host "===================================================="

# Prerequisites
$missing=@()
if(-not (Get-Command pwsh -ErrorAction SilentlyContinue) -and -not (Get-Command powershell -ErrorAction SilentlyContinue)){ $missing+="PowerShell" }
if($missing.Count -gt 0){ Write-Error "Missing: $($missing -join ',')"; exit 2 }

if(!(Test-Path $ReportsDir)){ New-Item -ItemType Directory -Path $ReportsDir -Force|Out-Null }

$steps=@(
  @{name="DNS";script="tests/connectivity/test-dns.ps1";args=@{Frontend=($Frontend -replace "https://","");Api=($Api -replace "https://","");OutJson="$ReportsDir/KOS-DNS.json"}},
  @{name="NETWORK";script="tests/connectivity/test-network.ps1";args=@{OutJson="$ReportsDir/KOS-NETWORK.json"}},
  @{name="TLS";script="tests/connectivity/test-tls.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-TLS.json"}},
  @{name="ENDPOINTS";script="tests/connectivity/test-endpoints.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-ENDPOINTS.json"}},
  @{name="API-SMOKE";script="tests/api/smoke.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-API-SMOKE.json"}},
  @{name="API-CONTRACT";script="tests/api/contract.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-CONTRACT.json"}},
  @{name="NEGATIVE";script="tests/api/negative-tests.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-NEGATIVE.json"}},
  @{name="HEADERS";script="tests/security/headers.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-HEADERS.json"}},
  @{name="CORS";script="tests/security/cors.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-CORS.json"}},
  @{name="API-SECURITY";script="tests/security/api-security.ps1";args=@{OutJson="$ReportsDir/KOS-API-SECURITY.json";RepoPath="."}},
  @{name="SUPABASE";script="tests/database/supabase-connectivity.ps1";args=@{OutJson="$ReportsDir/KOS-SUPABASE.json"}}
)

foreach($step in $steps){
  Write-Host "`n>>> STEP: $($step.name) - $($step.script)" -ForegroundColor Magenta
  try {
    $argHash = $step.args
    & $step.script @argHash
  } catch {
    Write-Warning "Step $($step.name) failed: $($_.Exception.Message)"
    # Save error
    [PSCustomObject]@{id="ORCH-$($step.name)";result="FAIL";error=$_.Exception.Message;timestamp=(Get-Date -Format o)} | ConvertTo-Json | Set-Content "$ReportsDir/ORCH-$($step.name)-ERROR.json"
  }
}

# k6
if(-not $SkipK6 -and (Get-Command k6 -ErrorAction SilentlyContinue)){
  if($PRODUCTION_SAFE -and $AllowStress){ Write-Warning "Stress test blocked in production-safe mode" }
  Write-Host "`n>>> K6 BASELINE" -ForegroundColor Magenta
  $k6Out="$ReportsDir/k6-baseline.json"
  try { k6 run --out json="$k6Out" tests/performance/baseline.js --env FRONTEND=$Frontend --env API=$Api } catch { Write-Warning $_ }
  if(-not $PRODUCTION_SAFE){
    Write-Host "`n>>> K6 LOAD" -ForegroundColor Magenta
    try { k6 run tests/performance/load.js --env FRONTEND=$Frontend --env API=$Api } catch {}
  }
  if($AllowStress -and -not $PRODUCTION_SAFE){
    Write-Host "`n>>> K6 STRESS" -ForegroundColor Magenta
    try { k6 run tests/performance/stress.js --env API=$Api } catch {}
  }
} else {
  Write-Host "k6 skipped (not installed or SkipK6)" -ForegroundColor Yellow
  [PSCustomObject]@{id="PERF-K6-SKIPPED";result="SKIP";details="k6 not available";timestamp=(Get-Date -Format o)} | ConvertTo-Json | Set-Content "$ReportsDir/KOS-K6-SKIPPED.json"
}

# Generate report
Write-Host "`n>>> GENERATING REPORT" -ForegroundColor Cyan
$report = & tests/reports/generate-report.ps1 -ReportsDir $ReportsDir

# GO/NO-GO logic
$exitCode=0
if($report.critical_blockers -gt 0){ $exitCode=1 }
elseif($report.major_blockers -gt 0 -and $report.total_score -lt 95){ $exitCode=1 }
elseif($report.total_score -lt 95){ $exitCode=1 }
elseif($report.release_status -eq "NO-GO"){ $exitCode=1 }

Write-Host "`n====================================================" -ForegroundColor Cyan
Write-Host "KOS REGTECH AI" -ForegroundColor White
Write-Host "BIG FOUR CONNECTIVITY & RELEASE VALIDATION" -ForegroundColor White
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Environment: $($report.environment)"
Write-Host "Frontend: $($report.frontend)"
Write-Host "API: $($report.api)"
Write-Host "Git Commit: $($report.git_commit)"
Write-Host ""
Write-Host "Tests: PASS:$($report.tests_pass) FAIL:$($report.tests_fail) WARN:$($report.tests_warn) SKIP:$($report.tests_skip)"
Write-Host "Critical blockers: $($report.critical_blockers)"
Write-Host "Major blockers: $($report.major_blockers)"
Write-Host ""
foreach($k in $report.scores.Keys){ Write-Host "$k : $($report.scores[$k].score) - P:$($report.scores[$k].pass) F:$($report.scores[$k].fail)" }
Write-Host ""
Write-Host "TOTAL: $($report.total_score)/100"
Write-Host "RELEASE STATUS: $($report.release_status)" -ForegroundColor $(if($report.release_status -eq "GO"){"Green"}else{"Red"})
Write-Host "===================================================="

exit $exitCode
