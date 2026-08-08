
# FIX-PATHS-KHEPRAROOT.ps1 - Corrige tous tes chemins
$ErrorActionPreference = "Stop"
# Ton vrai root d'apres ta capture PowerShell
$REAL_ROOT = "C:\Users\essoc\khepra-work\kos-fullstack"
Set-Location $REAL_ROOT
Write-Host "Root reel: $REAL_ROOT" -ForegroundColor Green

# Unblock tous les scripts
Get-ChildItem -Path $HOME\Downloads\*.ps1 -ErrorAction SilentlyContinue | Unblock-File
Get-ChildItem -Path $REAL_ROOT\*.ps1 -Recurse -ErrorAction SilentlyContinue | Unblock-File
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Bypass -Force

# Copie les nouveaux scripts au bon endroit
Copy-Item "$HOME\Downloads\Kill-Replace-MASTER.ps1" "$REAL_ROOT\" -Force -ErrorAction SilentlyContinue
Copy-Item "$HOME\Downloads\deploy-full-FIXED.ps1" "$REAL_ROOT\" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Tous les .ps1 débloqués et copiés dans $REAL_ROOT" -ForegroundColor Green
Write-Host "Lance maintenant: cd $REAL_ROOT ; pwsh -ExecutionPolicy Bypass -File .\VERIFY-BIGFOUR-REAL.ps1" -ForegroundColor Yellow
