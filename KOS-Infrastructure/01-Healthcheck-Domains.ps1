$ErrorActionPreference = "Continue"
if (-not $Global:KOSConfig) {. (Join-Path $PSScriptRoot "00-Config.ps1") }
Write-Host "[HEALTHCHECK] Début de la vérification des domaines..." -ForegroundColor Cyan
foreach ($url in $Global:KOSConfig.Domains) {
    try {
        $resp = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 15 -UseBasicParsing
        Write-Host " [PASS] $url -> Status: $($resp.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host " [FAIL] $url -> Erreur: $($_.Exception.Message)" -ForegroundColor Red
    }
}
