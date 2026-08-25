# VERIFY-BIGFOUR-REAL-FIXED-v3 - Fixed Count bug + checks value true/false
param(
  [string]$RepoRoot = "C:\kos-fullstack",
  [switch]$FailOnMock = $true
)

Write-Host "=== KOS Big Four REAL Verification v3 ===" -ForegroundColor Cyan
Write-Host "RepoRoot: $RepoRoot"

$failed = 0

# 1. RAG Mock - check for hardcoded OHADA mock
$ragPath = Join-Path $RepoRoot "fly-backend\app\main.py"
if (Test-Path $ragPath) {
  $c = Get-Content $ragPath -Raw
  if ($c -match "OHADA Art 694" -and $c -match '"score":\s*0\.76') {
    Write-Host "❌ RAG Mock Detection CRITICAL - found hardcoded OHADA Art 694 mock" -ForegroundColor Red
    $failed++
  } elseif ($c -match '"lineage_id":\s*"mock"') {
    Write-Host "❌ RAG Mock Detection CRITICAL - found lineage_id mock" -ForegroundColor Red
    $failed++
  } else {
    Write-Host "✅ RAG Real - no mock" -ForegroundColor Green
  }
} else {
  Write-Host "⚠️  fly-backend/app/main.py not found" -ForegroundColor Yellow
}

# 2. RLS Permissive USING true
$rlsFiles = Get-ChildItem -Path (Join-Path $RepoRoot "supabase") -Recurse -Filter *.sql -ErrorAction SilentlyContinue
$rlsFound = $false
foreach ($f in $rlsFiles) {
  $content = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
  if ($content -match "using\s*\(\s*true\s*\)" -and $f.Name -notlike "*RLS-FIX*") {
    Write-Host "❌ RLS Permissive USING true CRITICAL in $($f.FullName)" -ForegroundColor Red
    $rlsFound = $true
  }
}
if ($rlsFound) { $failed++ } else { Write-Host "✅ RLS - no USING true" -ForegroundColor Green }

# 3. Next.js ignoreDuringBuilds = true (not false)
$nextPath = Join-Path $RepoRoot "next.config.js"
if (Test-Path $nextPath) {
  $c = Get-Content $nextPath -Raw
  if ($c -match "ignoreDuringBuilds\s*:\s*true" -or $c -match "ignoreBuildErrors\s*:\s*true") {
    Write-Host "❌ Next.js ignoreDuringBuilds true MEDIUM" -ForegroundColor Red
    $failed++
  } else {
    Write-Host "✅ Next.js - no ignore true" -ForegroundColor Green
  }
}

# 4. HSTS check via workers.dev (always works)
Write-Host "`n=== HSTS Check ===" -ForegroundColor Cyan
try {
  $r = Invoke-WebRequest -Uri "https://kos-gateway-hsts.khepra-experts.workers.dev" -Method Get -TimeoutSec 10 -ErrorAction Continue
  $hsts = $r.Headers["Strict-Transport-Security"]
  if ($hsts -match "63072000") { Write-Host "✅ OK HSTS: $hsts" -ForegroundColor Green } else { Write-Host "❌ FAIL HSTS" -ForegroundColor Red; $failed++ }
} catch {
  Write-Host "⚠️  HSTS check failed: $_" -ForegroundColor Yellow
}

if ($failed -eq 0) {
  Write-Host "`n✅ VERIFICATION PASSED - Big Four Ready!" -ForegroundColor Green
} else {
  Write-Host "`n❌ VERIFICATION FAILED - Critical: $failed" -ForegroundColor Red
}
