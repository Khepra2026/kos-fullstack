#Requires -Version 7.0
<#
.SYNOPSIS
  MASTER CD - KOS RegTech AI Big Four 100% GO
  Exécute TOUTES les phases §38 du Master Prompt
  ORDER: INVENTORY -> ARCH MAP -> DUPLICATE -> BASELINE TEST/SECURITY/DB/API/AI/PERF -> IMPLEMENTATION -> TEST -> SECURITY -> REGRESSION -> BUILD -> DEPLOY -> SMOKE -> SCORE -> DOC
#>
param(
  [string]$RepoPath = (Get-Location).Path,
  [string]$SupabaseUrl = $env:SUPABASE_URL,
  [string]$SupabaseKey = $env:SUPABASE_SERVICE_KEY,
  [switch]$FailFast,
  [switch]$CI
)

$ErrorActionPreference = "Stop"
$Global:BigFourResults = @()
$Global:Score = 0

function Write-Phase($name){ Write-Host "`n=== PHASE: $name ===" -ForegroundColor Cyan }
function Add-Result($domain,$weight,$status,$score,$proof){
  $Global:BigFourResults += [PSCustomObject]@{Domain=$domain;Weight=$weight;Status=$status;Score=$score;Proof=$proof;Timestamp=Get-Date}
}

# --- 1. INVENTORY ---
Write-Phase "1. INVENTORY"
./scripts/Test-Inventory.ps1 -RepoPath $RepoPath

# --- 2. ARCHITECTURE MAP ---
Write-Phase "2. ARCHITECTURE MAP"
./scripts/Test-Architecture.ps1 -RepoPath $RepoPath

# --- 3. DEPENDENCY MAP ---
Write-Phase "3. DEPENDENCY MAP"
./scripts/Test-DependencyMap.ps1 -RepoPath $RepoPath

# --- 4. DUPLICATE SCAN ---
Write-Phase "4. DUPLICATE SCAN"
./scripts/Test-DuplicateScan.ps1 -RepoPath $RepoPath

# --- 5. BASELINE TEST ---
Write-Phase "5. BASELINE TEST"
./tests/Test-Baseline.Tests.ps1 -RepoPath $RepoPath

# --- 6. SECURITY BASELINE ---
Write-Phase "6. SECURITY BASELINE ASVS 5.0"
./scripts/Test-SecurityBaseline.ps1 -RepoPath $RepoPath

# --- 7. DATABASE BASELINE ---
Write-Phase "7. DATABASE BASELINE"
./scripts/Test-DatabaseBaseline.ps1 -RepoPath $RepoPath -SupabaseUrl $SupabaseUrl -SupabaseKey $SupabaseKey

# --- 8. API BASELINE ---
Write-Phase "8. API BASELINE"
./scripts/Test-ApiBaseline.ps1 -RepoPath $RepoPath

# --- 9. AI/RAG BASELINE ---
Write-Phase "9. AI/RAG BASELINE"
./scripts/Test-AiRagBaseline.ps1 -RepoPath $RepoPath

# --- 10. PERFORMANCE BASELINE ---
Write-Phase "10. PERFORMANCE BASELINE"
./scripts/Test-PerformanceBaseline.ps1 -RepoPath $RepoPath

# --- 11-14. IMPLEMENTATION + TEST + SECURITY + REGRESSION ---
Write-Phase "11-14. TEST PYRAMID"
./scripts/Test-Pyramid.ps1 -RepoPath $RepoPath -FailFast:$FailFast

# --- 15. BUILD ---
Write-Phase "15. BUILD REPRODUCIBLE"
./scripts/Test-Build.ps1 -RepoPath $RepoPath

# --- 16-17. DEPLOY + SMOKE ---
Write-Phase "16-17. DEPLOY + SMOKE"
./scripts/Test-SmokeProduction.ps1 -RepoPath $RepoPath

# --- 18. SCORE ---
Write-Phase "18. SCORE 100"
./scripts/Measure-QualityGate.ps1 -RepoPath $RepoPath

# --- 19-20. DOC + CONTINUOUS ---
Write-Phase "19. DOCUMENTATION SYNC"
./scripts/Test-Documentation.ps1 -RepoPath $RepoPath

Write-Host "`n=== FINAL BIG FOUR SCORE ===" -ForegroundColor Green
$Global:BigFourResults | Format-Table -AutoSize
