# ==========================================================
# KOS BIG FOUR - MASTER CD PWSH 102
# ENV SECURITY HARDENING
# ==========================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root

Write-Host "=== KOS BIG FOUR ENV HARDENING ===" -ForegroundColor Cyan


# 1. Backup environnement actuel

if(Test-Path ".env"){
    
    Copy-Item ".env" `
    ".env.backup.$(Get-Date -Format yyyyMMddHHmmss)"

    Write-Host "Backup .env créé" -ForegroundColor Green
}


# 2. Scan secrets exposés

Write-Host "SCAN VARIABLES SENSIBLES..."


Select-String `
-Path ".env*" `
-Pattern `
"AIza|service_role|PRIVATE|SECRET|PASSWORD|TOKEN" `
-ErrorAction SilentlyContinue |
Format-Table Filename,LineNumber,Line



# 3. Protection Git

$gitignore=".gitignore"


$rules=@(
".env",
".env.*",
"*.env",
"node_modules",
"dist"
)


foreach($rule in $rules){

    if(!(Select-String $gitignore -Pattern $rule -Quiet)){

        Add-Content $gitignore $rule

        Write-Host "Ajout gitignore : $rule"
    }
}



# 4. Vérification API Gateway

Write-Host ""
Write-Host "Verification API Gateway"

Select-String `
-Path ".env*" `
-Pattern "VITE_PUBLIC_API_GATEWAY_URL" `
-ErrorAction SilentlyContinue



# 5. Rapport Big Four

$report=@{

Audit="ENV Security Hardening"

Date=(Get-Date)

Status="Completed"

}


$report |
ConvertTo-Json |
Out-File `
"C:\KOS-BIG4-AUTOMATION\reports\ENV_HARDENING_102.json"


Write-Host ""
Write-Host "=== MASTER 102 TERMINE ===" -ForegroundColor Green