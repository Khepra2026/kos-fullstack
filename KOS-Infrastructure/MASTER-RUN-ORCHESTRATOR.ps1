$ErrorActionPreference = "Continue"
$baseDir = "C:\Users\essoc\KOS-Infrastructure"
Set-Location $baseDir
Write-Host "=== EXECUTION DE L'ORCHESTRATEUR KOS ===" -ForegroundColor Cyan
$orchestratorPath = Join-Path $baseDir "MASTER-ORCHESTRATOR.ps1"
if (Test-Path $orchestratorPath) {
    & $orchestratorPath | Tee-Object -FilePath "$baseDir\logs\kos-audit-$(Get-Date -Format 'yyyyMMdd-HHmm').log"
    Write-Host "`nPipeline complet d'audit KOS execute avec succes." -ForegroundColor Green
} else {
    Write-Host " [CRITICAL] $orchestratorPath introuvable." -ForegroundColor Red
}
