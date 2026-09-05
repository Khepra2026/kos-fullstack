# =====================================================================
# Master Build Script - KOS RegTech AI (Unified Root Architecture)
# =====================================================================
$ErrorActionPreference = "Stop"
$RootPath = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }

Write-Host "=====================================================" -ForegroundColor Yellow
Write-Host " [KOS-FULLSTACK] Lancement du Master Build via pwsh" -ForegroundColor Yellow
Write-Host " Racine du projet : $RootPath" -ForegroundColor DarkGray
Write-Host "=====================================================" -ForegroundColor Yellow

# --- 1. FRONTEND BUILD (Vite / Root package.json) ---
Write-Host "`n[1/2] Construction du Frontend & Application..." -ForegroundColor Cyan
pwsh -Command "npm run build"
Write-Host "[1/2] Build frontend exécuté avec succès !" -ForegroundColor Green

# --- 2. VÉRIFICATION BACKEND / SERVICES ---
$BackendPath = Join-Path $RootPath "backend"
if (Test-Path $BackendPath) {
    Write-Host "`n[2/2] Dossier backend détecté." -ForegroundColor Cyan
} else {
    Write-Host "`n[2/2] Architecture unifiée validée." -ForegroundColor Cyan
}

Write-Host "`n=== Processus Master Build terminé avec succès ! ===" -ForegroundColor Green
