# ==========================================================
# KOS BIG FOUR - MASTER CD PWSH 104
# TYPESCRIPT ERROR EXTRACTION
# ==========================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root


Write-Host "=== EXTRACTION ERREURS TYPESCRIPT ===" -ForegroundColor Cyan


pnpm exec tsc --noEmit 2>&1 |
Tee-Object `
-FilePath `
"C:\KOS-BIG4-AUTOMATION\reports\typescript-errors-104.txt"



Write-Host ""
Write-Host "TOP ERREURS :" -ForegroundColor Yellow


Get-Content `
"C:\KOS-BIG4-AUTOMATION\reports\typescript-errors-104.txt" |
Select-Object -First 80