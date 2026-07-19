# ==========================================================
# KOS BIG FOUR - MASTER CD PWSH 103
# TYPESCRIPT + BUILD PRODUCTION AUDIT
# ==========================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root

Write-Host "=== KOS BIG FOUR TYPECHECK BUILD ===" -ForegroundColor Cyan


# ----------------------------------------------------------
# 1. Nettoyage cache Vite
# ----------------------------------------------------------

Write-Host "NETTOYAGE CACHE"

if(Test-Path "node_modules\.vite"){
    Remove-Item "node_modules\.vite" -Recurse -Force
}


# ----------------------------------------------------------
# 2. Vérification dépendances
# ----------------------------------------------------------

Write-Host "PNPM INSTALL"

pnpm install


# ----------------------------------------------------------
# 3. TypeScript Check
# ----------------------------------------------------------

Write-Host ""
Write-Host "TYPESCRIPT CHECK"

pnpm exec tsc --noEmit

$ts=$LASTEXITCODE


# ----------------------------------------------------------
# 4. Build production
# ----------------------------------------------------------

Write-Host ""
Write-Host "BUILD PRODUCTION"

pnpm run build

$build=$LASTEXITCODE



# ----------------------------------------------------------
# 5. Rapport Big Four
# ----------------------------------------------------------

$status="FAILED"

if(($ts -eq 0) -and ($build -eq 0)){
    $status="PASSED"
}


$report=@{

Audit="MASTER CD PWSH 103"

TypeScript=$ts

Build=$build

Status=$status

Date=(Get-Date)

}


$report |
ConvertTo-Json |
Out-File `
"C:\KOS-BIG4-AUTOMATION\reports\BUILD_AUDIT_103.json"


Write-Host ""

if($status -eq "PASSED"){

Write-Host "=== BUILD CERTIFIABLE ===" -ForegroundColor Green

}else{

Write-Host "=== CORRECTIONS NECESSAIRES ===" -ForegroundColor Red

}