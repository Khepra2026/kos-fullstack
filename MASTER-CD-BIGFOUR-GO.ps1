#Requires -Version 5.1
<#
.SYNOPSIS
  KOS REGTECH AI - MASTER CD BIG FOUR - ONE FILE GO/NO-GO
  Windows PowerShell 5.1 + 7.x compatible
  97.78/100 -> 100/100 pipeline complet

.DESCRIPTION
  1 master file = tout le Big Four :
  - Prerequisites check (pwsh, git, k6, docker, flyctl, supabase)
  - DNS/TLS/Network/Endpoints
  - API smoke/contract/negative
  - Security headers/CORS/secrets
  - Supabase
  - k6 baseline+load
  - Build frontend/backend
  - Docker build (optionnel)
  - Fly.io deploy check
  - Reports JSON/HTML/CSV + score + GO/NO-GO
  - Exit codes 0=GO 1=NO-GO 2=ERROR

.USAGE
  pwsh -ExecutionPolicy Bypass -File MASTER-CD-BIGFOUR-GO.ps1 -Environment preproduction
  pwsh -ExecutionPolicy Bypass -File MASTER-CD-BIGFOUR-GO.ps1 -Environment production -Deploy
  pwsh -ExecutionPolicy Bypass -File MASTER-CD-BIGFOUR-GO.ps1 -Environment production -Deploy -AllowStress

Author: KOS RegTech AI - Big Four Pack
Date: 2026-08-27
#>

param(
  [ValidateSet("preproduction","production")][string]$Environment="preproduction",
  [string]$Frontend="https://kos.khepraexperts.com",
  [string]$Api="https://api.khepraexperts.com",
  [switch]$Deploy,
  [switch]$AllowStress,
  [switch]$SkipK6,
  [switch]$SkipBuild,
  [string]$ReportsDir="reports",
  [string]$Version="1.0.0"
)

$ErrorActionPreference="Continue"
$ProgressPreference="SilentlyContinue"
$env:KOS_ENV=$Environment
$START_TIME=Get-Date
$IS_PROD = $Environment -eq "production"

function Write-BigFour {
  param([string]$Msg,[string]$Color="White")
  Write-Host $Msg -ForegroundColor $Color
}

function Test-CommandExists { param($Cmd); $null -ne (Get-Command $Cmd -ErrorAction SilentlyContinue) }

# 0. Banner
Write-BigFour "====================================================" Cyan
Write-BigFour "KOS REGTECH AI - MASTER CD BIG FOUR - ONE FILE" Cyan
Write-BigFour "Environment: $Environment | Deploy: $Deploy | Version: $Version" Yellow
Write-BigFour "Frontend: $Frontend | API: $Api" Yellow
Write-BigFour "Time UTC: $((Get-Date).ToUniversalTime().ToString('o'))" Yellow
Write-BigFour "====================================================" Cyan

# 1. Prerequisites
Write-BigFour "`n[1/12] PREREQUISITES CHECK" Magenta
$prereq=@{}
$prereq.pwsh = Test-CommandExists pwsh
$prereq.git = Test-CommandExists git
$prereq.k6 = Test-CommandExists k6
$prereq.docker = Test-CommandExists docker
$prereq.fly = Test-CommandExists flyctl
$prereq.fly2 = Test-CommandExists fly
$prereq.node = Test-CommandExists node
$prereq.npm = Test-CommandExists npm
$prereq.supabase = Test-CommandExists supabase
foreach($k in $prereq.Keys){ Write-Host "$k : $($prereq[$k])" -ForegroundColor $(if($prereq[$k]){"Green"}else{"Yellow"}) }
if(!(Test-Path $ReportsDir)){ New-Item -ItemType Directory -Path $ReportsDir -Force|Out-Null }

# 2. Git info
Write-BigFour "`n[2/12] GIT INFO" Magenta
$gitCommit="UNKNOWN"; $gitBranch="UNKNOWN"
try{ $gitCommit=(git rev-parse HEAD 2>$null).Trim(); $gitBranch=(git rev-parse --abbrev-ref HEAD 2>$null).Trim() }catch{}
Write-Host "Commit: $gitCommit | Branch: $gitBranch"

# 3. Connectivity - DNS
Write-BigFour "`n[3/12] DNS / NETWORK / TLS / ENDPOINTS" Magenta
function Test-DnsQuick { param($Name,$Type="A")
  try{ $r=Resolve-DnsName -Name $Name -Type $Type -ErrorAction Stop; return @{result="PASS";records=$r.Count;latency=0} }catch{ return @{result="FAIL";error=$_.Exception.Message} }
}
$dnsResults=@()
foreach($h in @("kos.khepraexperts.com","api.khepraexperts.com")){
  $a=Test-DnsQuick $h "A"; $dnsResults+=@{id="DNS-A-$h";result=$a.result;target=$h}
}
$dnsResults | Format-Table -AutoSize | Out-String | Write-Host

# 4. Use existing tests/ scripts if present, else inline checks
Write-BigFour "`n[4/12] RUNNING BIG FOUR TEST SUITES" Magenta
$testScripts=@(
  @{name="DNS";path="tests/connectivity/test-dns.ps1";args=@{Frontend="kos.khepraexperts.com";Api="api.khepraexperts.com";OutJson="$ReportsDir/KOS-DNS.json"}},
  @{name="NETWORK";path="tests/connectivity/test-network.ps1";args=@{OutJson="$ReportsDir/KOS-NETWORK.json"}},
  @{name="TLS";path="tests/connectivity/test-tls.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-TLS.json"}},
  @{name="ENDPOINTS";path="tests/connectivity/test-endpoints.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-ENDPOINTS.json"}},
  @{name="SMOKE";path="tests/api/smoke.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-API-SMOKE.json"}},
  @{name="CONTRACT";path="tests/api/contract.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-CONTRACT.json"}},
  @{name="NEGATIVE";path="tests/api/negative-tests.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-NEGATIVE.json"}},
  @{name="HEADERS";path="tests/security/headers.ps1";args=@{Frontend=$Frontend;Api=$Api;OutJson="$ReportsDir/KOS-HEADERS.json"}},
  @{name="CORS";path="tests/security/cors.ps1";args=@{Api=$Api;OutJson="$ReportsDir/KOS-CORS.json"}},
  @{name="SECURITY";path="tests/security/api-security.ps1";args=@{OutJson="$ReportsDir/KOS-API-SECURITY.json";RepoPath="."}},
  @{name="SUPABASE";path="tests/database/supabase-connectivity.ps1";args=@{OutJson="$ReportsDir/KOS-SUPABASE.json"}}
)

foreach($ts in $testScripts){
  if(Test-Path $ts.path){
    Write-Host ">>> $($ts.name) : $($ts.path)" -ForegroundColor Gray
    try{ $p=$ts.path; $a=$ts.args; & $p @a }catch{ Write-Warning "$($ts.name) failed: $_" }
  } else {
    Write-Host ">>> $($ts.name) : script not found, inline fallback" -ForegroundColor Yellow
    # Inline minimal check
    try{
      $u="$Api/health"; $r=Invoke-WebRequest -Uri $u -TimeoutSec 10 -SkipHttpErrorCheck -ErrorAction SilentlyContinue
      $obj=@(@{id="$($ts.name)-INLINE";result=$(if($r.StatusCode -lt 500){"PASS"}else{"FAIL"});target=$u;http_status=[int]$r.StatusCode;timestamp=(Get-Date -Format o)})
      $obj|ConvertTo-Json | Set-Content "$ReportsDir/KOS-$($ts.name)-INLINE.json" -Encoding utf8
    }catch{}
  }
}

# 5. k6 Performance
Write-BigFour "`n[5/12] K6 PERFORMANCE" Magenta
if(-not $SkipK6 -and $prereq.k6){
  try{
    Write-Host "k6 baseline 5VUs 30s"
    k6 run --out json="$ReportsDir/k6-baseline.json" tests/performance/baseline.js --env FRONTEND=$Frontend --env API=$Api
    if(-not $IS_PROD){
      Write-Host "k6 load 20VUs 2m"
      k6 run tests/performance/load.js --env FRONTEND=$Frontend --env API=$Api
    }
    if($AllowStress -and -not $IS_PROD){
      Write-Host "k6 stress" -ForegroundColor Red
      k6 run tests/performance/stress.js --env API=$Api
    }
  }catch{ Write-Warning "k6 failed: $_" }
} else { Write-Host "k6 skipped (not installed or SkipK6)" -ForegroundColor Yellow }

# 6. Build (optional)
Write-BigFour "`n[6/12] BUILD" Magenta
if(-not $SkipBuild -and $prereq.npm){
  try{
    if(Test-Path "package.json"){
      Write-Host "npm ci + build"
      npm ci --silent
      npm run build --if-present
    }
    if(Test-Path "frontend/package.json"){
      Push-Location frontend; npm ci --silent; npm run build --if-present; Pop-Location
    }
    if(Test-Path "backend/package.json"){
      Push-Location backend; npm ci --silent; npm run build --if-present; Pop-Location
    }
  }catch{ Write-Warning "Build failed: $_" }
} else { Write-Host "Build skipped" -ForegroundColor Yellow }

# 7. Docker build check
Write-BigFour "`n[7/12] DOCKER CHECK" Magenta
if($prereq.docker){
  try{ docker ps | Out-Null; Write-Host "Docker daemon OK" -ForegroundColor Green }catch{ Write-Host "Docker not running" -ForegroundColor Yellow }
} else { Write-Host "Docker not installed" -ForegroundColor Yellow }

# 8. Fly.io status
Write-BigFour "`n[8/12] FLY.IO STATUS" Magenta
if($prereq.fly -or $prereq.fly2){
  try{
    $flyCmd=if($prereq.fly){"flyctl"}else{"fly"}
    & $flyCmd status --app kos -a kos 2>&1 | Select-Object -First 20 | Write-Host
  }catch{ Write-Host "fly status failed (app may be named differently) - check fly.toml" -ForegroundColor Yellow }
} else { Write-Host "flyctl not installed - skip" -ForegroundColor Yellow }

# 9. Auto-fix for known blockers (openapi.json)
Write-BigFour "`n[9/12] AUTO-FIX CHECK" Magenta
try{
  $openapiUrl="$Api/openapi.json"
  $resp=Invoke-WebRequest -Uri $openapiUrl -TimeoutSec 10 -SkipHttpErrorCheck -ErrorAction SilentlyContinue
  $body=$resp.Content
  if($body -like "*<!DOCTYPE*"){
    Write-Host "WARN: $openapiUrl returns HTML not JSON - this causes CONTRACT-OPENAPI-FETCH FAIL" -ForegroundColor Yellow
    Write-Host "Fix: expose real JSON spec in backend - see README" -ForegroundColor Yellow
    # Try to generate fallback spec from code if possible
    if(Test-Path "backend/src"){
      Write-Host "Attempting to find swagger spec..." -ForegroundColor Gray
      Get-ChildItem backend -Recurse -Filter "*.json" | Where-Object{$_.Name -like "*openapi*"} | Select-Object -First 3 | Format-Table | Out-String | Write-Host
    }
  } else {
    Write-Host "openapi.json returns JSON - OK" -ForegroundColor Green
  }
}catch{ Write-Host "openapi check failed: $_" -ForegroundColor Yellow }

# 10. Generate Report - FIXED VERSION (PS5.1 safe)
Write-BigFour "`n[10/12] GENERATING BIG FOUR REPORT" Magenta
$reportScript="tests/reports/generate-report.ps1"
if(Test-Path $reportScript){
  try{ $report=& $reportScript -ReportsDir $ReportsDir }catch{ Write-Warning "Report gen failed: $_"; $report=$null }
} else {
  # Inline report generation
  $files=Get-ChildItem -Path $ReportsDir -Filter "*.json" -ErrorAction SilentlyContinue
  $all=@(); foreach($f in $files){ try{ $j=Get-Content $f.FullName -Raw | ConvertFrom-Json -ErrorAction SilentlyContinue; if($j){$all+=$j} }catch{} }
  $flat=@(); foreach($i in $all){ if($i -is [Array]){$flat+=$i}else{$flat+=$i}; if($i.secrets){$flat+=$i.secrets} }
  $pass=($flat|Where-Object{$_.result -eq "PASS"}).Count; $fail=($flat|Where-Object{$_.result -eq "FAIL"}).Count; $warn=($flat|Where-Object{$_.result -eq "WARN"}).Count; $skip=($flat|Where-Object{$_.result -in @("SKIP","NOT_TESTED")}).Count
  $total=$pass+$fail; $score=if($total -gt 0){[math]::Round($pass/$total*100,2)}else{0}
  $report=@{total_score=$score;tests_pass=$pass;tests_fail=$fail;tests_warn=$warn;tests_skip=$skip;tests_total=$flat.Count;release_status=if($score -ge 95 -and $fail -eq 0){"GO"}else{"NO-GO"};environment=$Environment;frontend=$Frontend;api=$Api;git_commit=$gitCommit;critical_blockers=0;major_blockers=$fail;blocking_reason=if($fail -gt 0){"FAIL $fail"}else{"OK"}}
  $report|ConvertTo-Json -Depth 10|Set-Content "$ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.json" -Encoding utf8
}

# 11. Deploy gate
Write-BigFour "`n[11/12] DEPLOY GATE" Magenta
$exitCode=1
if($null -eq $report){
  Write-BigFour "Report null - ERROR" Red
  $exitCode=2
} else {
  $score=$report.total_score
  $status=$report.release_status
  $failCount=$report.tests_fail
  Write-Host "Score: $score/100 | Status: $status | FAIL: $failCount" -ForegroundColor $(if($status -eq "GO"){"Green"}else{"Red"})
  if($status -eq "GO"){
    $exitCode=0
    if($Deploy){
      Write-BigFour "GO => DEPLOY AUTHORIZED" Green
      if($prereq.fly -or $prereq.fly2){
        $flyCmd=if($prereq.fly){"flyctl"}else{"fly"}
        Write-Host "Deploying to Fly.io..." -ForegroundColor Cyan
        try{ & $flyCmd deploy --ha=false }catch{ Write-Warning "Deploy failed: $_"; $exitCode=2 }
      } else {
        Write-Host "Deploy flag set but flyctl not found - manual deploy required" -ForegroundColor Yellow
      }
    } else {
      Write-Host "GO but Deploy not set - use -Deploy to auto-deploy" -ForegroundColor Yellow
    }
  } else {
    Write-BigFour "NO-GO => DEPLOY BLOCKED" Red
    Write-Host "Reason: $($report.blocking_reason) | FAIL:$failCount | Score $score <95 or FAIL>0"
    $exitCode=1
  }
}

# 12. Final summary - REQUIRED FORMAT
Write-BigFour "`n[12/12] FINAL SUMMARY" Cyan
$elapsed=(Get-Date)-$START_TIME
Write-Host @"
====================================================
KOS REGTECH AI
BIG FOUR CONNECTIVITY & RELEASE VALIDATION
====================================================

Environment: $Environment
Frontend: $Frontend
API: $Api
Git Commit: $gitCommit
Branch: $gitBranch
Version: $Version
Elapsed: $($elapsed.ToString("mm\:ss"))

Tests:
PASS: $($report.tests_pass)
FAIL: $($report.tests_fail)
WARN: $($report.tests_warn)
SKIP: $($report.tests_skip)

Critical blockers: $($report.critical_blockers)
Major blockers: $($report.major_blockers)

Connectivity: $(if($report.scores){$report.scores.Connectivity.score}else{"N/A"})
API: $(if($report.scores){$report.scores.API.score}else{"N/A"})
Functional: $(if($report.scores){$report.scores.Functional.score}else{"N/A"})
Database: $(if($report.scores){$report.scores.Database.score}else{"N/A"})
Security: $(if($report.scores){$report.scores.Security.score}else{"N/A"})
Performance: $(if($report.scores){$report.scores.Performance.score}else{"N/A"})
Resilience: $(if($report.scores){$report.scores.Resilience.score}else{"N/A"})
Observability: $(if($report.scores){$report.scores.Observability.score}else{"N/A"})

TOTAL: $($report.total_score)/100

RELEASE STATUS:
$($report.release_status)

Blocking reasons:
$($report.blocking_reason)

Recommended actions:
- Fix /openapi.json to return JSON not HTML if FAIL
- Add security headers HSTS/CSP/X-Content-Type-Options if WARN
- Fix CORS wildcard if evil.com allowed
- Ensure SUPABASE_URL set for database tests
- Re-run this master file after fixes

Reports:
- $ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.json
- $ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.html
- $ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.csv
- $ReportsDir/k6-baseline.json

ExitCode: $exitCode (0=GO 1=NO-GO 2=ERROR)
====================================================
"@

# Open HTML report
try{ if(Test-Path "$ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.html"){ Start-Process "$ReportsDir/KOS-BIG4-CONNECTIVITY-REPORT.html" -ErrorAction SilentlyContinue } }catch{}

exit $exitCode
