# VERIFY-BIGFOUR-REAL-FIXED-v2.ps1 - Works from C:\ or any path
param([string]$RepoRoot = "C:\kos-fullstack",[string]$AltRoot = "C:\",[switch]$FailOnMock = $true)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Continue"
function Find-Repo { foreach ($p in @($RepoRoot, $AltRoot, ".", "C:\kos-fullstack", "C:\", "$env:USERPROFILE\kos-fullstack")) { if (Test-Path "$p\supabase" -PathType Container -ErrorAction SilentlyContinue) { return $p } if (Test-Path "$p\fly-backend" -PathType Container -ErrorAction SilentlyContinue) { return $p } } return $null }
$realRoot = Find-Repo
if (-not $realRoot) { Write-Host "Repo non trouvé. Clone: git clone https://github.com/Khepra2026/kos-fullstack C:\kos-fullstack" -ForegroundColor Yellow; $realRoot = $AltRoot }
Write-Host "=== KOS Big Four REAL Verification ===" -ForegroundColor Cyan
Write-Host "RepoRoot: $realRoot"
$checks = @()
function Safe-Select { param($Paths,$Pattern) $found = @(); foreach ($path in $Paths) { $full = Join-Path $realRoot $path; if (Test-Path $full) { $m = Select-String -Path $full -Pattern $Pattern -ErrorAction SilentlyContinue; if ($m) { $found += $m } } } return $found }
$ragFiles = @("fly-backend\app\main.py","routes\rag.js"); $ragMock = Safe-Select $ragFiles "OHADA Art 694|confidence_score.*0.92|MOCK|TODO.*RAG"; $checks += [PSCustomObject]@{Check="RAG Mock Detection"; Found=($ragMock.Count -gt 0); Details=($ragMock | Select-Object -First 2 | Out-String); Severity="CRITICAL"}
$rls = @(); Get-ChildItem "$realRoot\supabase" -Filter "*.sql" -Recurse -ErrorAction SilentlyContinue | ForEach-Object { $m = Select-String $_.FullName -Pattern "USING\s*\(\s*true\s*\)" -ErrorAction SilentlyContinue; if ($m) { $rls += $m } }
$checks += [PSCustomObject]@{Check="RLS Permissive USING true"; Found=($rls.Count -gt 0); Details=($rls | Out-String); Severity="CRITICAL"}
$cors = Safe-Select @("fly-backend\app\main.py") 'allow_origins.*\*|allow_origins=\["\*"\]'; $checks += [PSCustomObject]@{Check="CORS Wildcard *"; Found=($cors.Count -gt 0); Severity="HIGH"}
$fake = Safe-Select @("workers\kos-gateway-prod\src\index.js") "mongodb.*UP|typesense.*UP|redis.*UP"; $checks += [PSCustomObject]@{Check="Fake Service Status"; Found=($fake.Count -gt 0); Severity="HIGH"}
$ignore = Safe-Select @("next.config.js") "ignoreDuringBuilds|ignoreBuildErrors"; $checks += [PSCustomObject]@{Check="Next.js ignoreDuringBuilds"; Found=($ignore.Count -gt 0); Severity="MEDIUM"}
$checks | Format-Table Check,Found,Severity -AutoSize
$crit = $checks | Where-Object { $_.Found -and $_.Severity -eq "CRITICAL" }
if ($crit -and $FailOnMock) { Write-Host "`nVERIFICATION FAILED - Critical: $($crit.Count)" -ForegroundColor Red; exit 1 } else { Write-Host "`nVerification passed" -ForegroundColor Green; exit 0 }
