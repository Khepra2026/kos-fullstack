# VERIFY-BIGFOUR-REAL-FIXED.ps1 - Big Four Compliant Evidence-Based Verification
# CDC §3.5 Evidence-based, §51 Detection fonctionnalités fantômes
param(
  [string]$RepoRoot = ".",
  [switch]$FailOnMock = $true
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-RealCode {
  param($Path, $Pattern)
  if (-not (Test-Path $Path)) { return $false }
  $content = Get-Content $Path -Raw
  return $content -match $Pattern
}

Write-Host "=== KOS Big Four REAL Verification (evidence-based) ===" -ForegroundColor Cyan

$checks = @()

# 1. RAG must not be mock
$ragMock = Test-RealCode "fly-backend/app/main.py" "OHADA Art 694|confidence_score.*0.92|MOCK"
$checks += [PSCustomObject]@{Check="RAG Mock Detection"; Path="fly-backend/app/main.py"; Failed=$ragMock; Severity="CRITICAL"; Fix="Implement real retrieval pgvector + citation"}

# 2. RLS must not be USING true
$rlsPermissive = Select-String -Path "supabase/migrations/*.sql","supabase/*.sql" -Pattern "USING\s*\(\s*true\s*\)" -ErrorAction SilentlyContinue
$checks += [PSCustomObject]@{Check="RLS Permissive"; Found=($rlsPermissive -ne $null); Severity="CRITICAL"; Fix="tenant_id = auth.uid()"}

# 3. CORS *
$corsStar = Select-String -Path "fly-backend/app/main.py" -Pattern 'allow_origins.*\*|"\*"' -ErrorAction SilentlyContinue
$checks += [PSCustomObject]@{Check="CORS Wildcard"; Found=($corsStar -ne $null); Severity="HIGH"; Fix="Env ALLOWED_ORIGINS"}

# 4. Workers fake status
$fakeStatus = Select-String -Path "workers/kos-gateway-prod/src/index.js" -Pattern "mongodb.*UP|typesense.*UP|redis.*UP" -ErrorAction SilentlyContinue
$checks += [PSCustomObject]@{Check="Fake Service Status"; Found=($fakeStatus -ne $null); Severity="HIGH"; Fix="Check only real services"}

# 5. Next.js ignore
$ignoreBuild = Select-String -Path "next.config.js" -Pattern "ignoreDuringBuilds|ignoreBuildErrors" -ErrorAction SilentlyContinue
$checks += [PSCustomObject]@{Check="Quality Ignore"; Found=($ignoreBuild -ne $null); Severity="MEDIUM"; Fix="Remove ignores"}

# Report
$checks | Format-Table -AutoSize
$criticalFailed = $checks | Where-Object { $_.Failed -or $_.Found } | Where-Object { $_.Severity -eq "CRITICAL" }

if ($criticalFailed -and $FailOnMock) {
  Write-Host "VERIFICATION FAILED - Critical findings present" -ForegroundColor Red
  exit 1
} else {
  Write-Host "Verification passed (no critical mocks)" -ForegroundColor Green
  exit 0
}
