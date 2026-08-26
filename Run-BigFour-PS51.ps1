#Requires -Version 5.1
param([string]$RepoPath = (Get-Location).Path, [switch]$FailFast)
$ErrorActionPreference="Continue"
Write-Host "=== KOS BIGFOUR 100% GO - PS5.1 ===" -ForegroundColor Cyan
function Run-Phase($name,$script){
  Write-Host "`n=== PHASE: $name ===" -ForegroundColor Cyan
  if(Test-Path $script){ try { & $script -RepoPath $RepoPath } catch { Write-Host "Error $name $($_.Exception.Message)" -ForegroundColor Red; if($FailFast){ exit 1 } } } else { Write-Host "SKIP $script" -ForegroundColor Yellow }
}
Run-Phase "1. INVENTORY" "$RepoPath/scripts/Test-Inventory.ps1"
Run-Phase "2. ARCH" "$RepoPath/scripts/Test-Architecture.ps1"
Run-Phase "3. DEP" "$RepoPath/scripts/Test-DependencyMap.ps1"
Run-Phase "4. DUP" "$RepoPath/scripts/Test-DuplicateScan.ps1"
Run-Phase "6. SEC" "$RepoPath/scripts/Test-SecurityBaseline.ps1"
Run-Phase "7. DB" "$RepoPath/scripts/Test-DatabaseBaseline.ps1"
Run-Phase "8. API" "$RepoPath/scripts/Test-ApiBaseline.ps1"
Run-Phase "9. AI" "$RepoPath/scripts/Test-AiRagBaseline.ps1"
Run-Phase "10. PERF" "$RepoPath/scripts/Test-PerformanceBaseline.ps1"
Run-Phase "15. BUILD" "$RepoPath/scripts/Test-Build.ps1"
Run-Phase "16-17. SMOKE" "$RepoPath/scripts/Test-SmokeProduction.ps1"
Run-Phase "18. SCORE" "$RepoPath/scripts/Measure-QualityGate-PS51.ps1"
Run-Phase "19. DOC" "$RepoPath/scripts/Test-Documentation.ps1"
Write-Host "`n=== DONE ===" -ForegroundColor Green
