# ==========================================================
# KOS BIG FOUR - MASTER CD PWSH 101
# Security Hardening + Production Validation
# ==========================================================

$Root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $Root

Write-Host "=== KOS SECURITY HARDENING ===" -ForegroundColor Cyan


# ----------------------------------------------------------
# 1. Vérification secrets exposés
# ----------------------------------------------------------

Write-Host "SCAN SECRETS..."

$patterns=@(
"AIza[0-9A-Za-z-_]{35}",
"sbp_[a-zA-Z0-9]{40}",
"service_role",
"SUPABASE_SERVICE_ROLE",
"PRIVATE_KEY"
)


foreach($pattern in $patterns){

    Select-String `
    -Path . `
    -Pattern $pattern `
    -Exclude "*.map","node_modules","dist" `
    -Recurse `
    -ErrorAction SilentlyContinue |

    ForEach-Object {

        Write-Host "🚨 SECRET TROUVE:"
        Write-Host $_.Path
        Write-Host "Ligne:" $_.LineNumber
    }
}



# ----------------------------------------------------------
# 2. Nettoyage gitignore
# ----------------------------------------------------------

Write-Host "VERIFICATION GITIGNORE"

$ignore=@(
".env",
".env.local",
".env.production",
"node_modules",
"dist",
"*.log"
)


foreach($i in $ignore){

 if(!(Select-String ".gitignore" -Pattern $i -Quiet)){
    
    Add-Content ".gitignore" $i
    Write-Host "Ajout:" $i
 }

}



# ----------------------------------------------------------
# 3. Vérification TypeScript
# ----------------------------------------------------------

Write-Host "TYPE CHECK"

pnpm exec tsc --noEmit



# ----------------------------------------------------------
# 4. Build production
# ----------------------------------------------------------

Write-Host "BUILD PRODUCTION"

pnpm run build



# ----------------------------------------------------------
# 5. Audit routes
# ----------------------------------------------------------

Write-Host "ROUTES"

Select-String `
src/routes/*.tsx `
-Pattern "lazy|import" |
Format-Table Filename,LineNumber,Line



# ----------------------------------------------------------
# 6. Rapport
# ----------------------------------------------------------

$report=@{

Date=(Get-Date)

Secrets="Scanned"

Build="Executed"

TypeScript="Executed"

}

$report |
ConvertTo-Json |
Out-File `
"C:\KOS-BIG4-AUTOMATION\reports\Security_101.json"


Write-Host ""
Write-Host "=== MASTER 101 TERMINE ===" -ForegroundColor Green