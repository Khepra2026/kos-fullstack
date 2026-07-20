# ============================================================================
# KOS REGTECH AI - MASTER CD PWSH BIG FOUR PRODUCTION 001
# Audit + Backup + Deploy + Validation
# ============================================================================

$ErrorActionPreference = "Stop"

$ProjectPath = "C:\KOS DEV PLATEFORM\project-11940621"
$BackupPath = "$ProjectPath\backup_BIGFOUR_$(Get-Date -Format yyyyMMdd_HHmmss)"

$SupabaseUrl = "https://pgfwhahiwqvqeahpirjx.supabase.co"

Write-Host ""
Write-Host "===================================================="
Write-Host " KOS REGTECH AI - BIG FOUR PRODUCTION MASTER"
Write-Host "===================================================="
Write-Host ""

cd $ProjectPath


# ----------------------------------------------------
# 1 - BACKUP
# ----------------------------------------------------

Write-Host "[1/7] Backup des Edge Functions..." -ForegroundColor Cyan

New-Item -ItemType Directory -Force -Path $BackupPath | Out-Null

Copy-Item `
    -Path "$ProjectPath\supabase\functions" `
    -Destination "$BackupPath\functions" `
    -Recurse `
    -Force

Write-Host "Backup OK : $BackupPath" -ForegroundColor Green


# ----------------------------------------------------
# 2 - VERIFICATION FUNCTIONS
# ----------------------------------------------------

Write-Host ""
Write-Host "[2/7] Vérification des agents Big Four..." -ForegroundColor Cyan


$Agents = @(
"strategic-insight",
"data-protection",
"compliance",
"cybersec",
"aml",
"risk"
)


foreach ($agent in $Agents){

    $file =
    "$ProjectPath\supabase\functions\$agent\index.ts"

    if(Test-Path $file){

        Write-Host "OK : $agent" -ForegroundColor Green

    }
    else{

        Write-Host "MANQUANT : $agent" -ForegroundColor Red

    }
}


# ----------------------------------------------------
# 3 - DETECTION AUDIT INSERT
# ----------------------------------------------------

Write-Host ""
Write-Host "[3/7] Recherche kos_audit_log..." -ForegroundColor Cyan


Get-ChildItem `
-Recurse `
-Include *.ts `
"$ProjectPath\supabase\functions" |
Select-String "kos_audit_log" |
Out-File "$BackupPath\audit_insert_scan.txt"


Write-Host "Rapport : $BackupPath\audit_insert_scan.txt"


# ----------------------------------------------------
# 4 - VERIFICATION SCHEMA
# ----------------------------------------------------

Write-Host ""
Write-Host "[4/7] Vérification SQL requise..." -ForegroundColor Cyan


$sql = @"

SELECT
column_name,
data_type,
is_nullable
FROM information_schema.columns
WHERE table_name='kos_audit_log'
ORDER BY ordinal_position;

"@


$sql | Out-File "$BackupPath\verify_audit_schema.sql"


Write-Host "SQL généré"


# ----------------------------------------------------
# 5 - DEPLOY EDGE FUNCTIONS
# ----------------------------------------------------

Write-Host ""
Write-Host "[5/7] Déploiement Supabase Edge Functions..." -ForegroundColor Cyan


foreach ($agent in $Agents){

    Write-Host ""
    Write-Host "Deploy $agent..." -ForegroundColor Yellow

    supabase functions deploy $agent

}


# ----------------------------------------------------
# 6 - TEST BIG FOUR
# ----------------------------------------------------

Write-Host ""
Write-Host "[6/7] Test des agents..." -ForegroundColor Cyan


$headers = @{
"Authorization" =
"Bearer $env:SUPABASE_SERVICE_ROLE_KEY"

"apikey" =
"$env:SUPABASE_SERVICE_ROLE_KEY"

"Content-Type" =
"application/json"
}



foreach($agent in $Agents){


$body = @{
query="KYC"
org_id="test@khepraexperts.com"
} | ConvertTo-Json


Write-Host ""
Write-Host "--- $agent ---" -ForegroundColor Yellow


try{


$result = Invoke-RestMethod `
-Uri "$SupabaseUrl/functions/v1/$agent" `
-Method POST `
-Headers $headers `
-Body $body


$result | 
Select-Object `
agent,
cobac_compliant,
bigfour_standard,
iso_compliant,
response_time_ms,
request_id


}
catch{

Write-Host "ERREUR $agent" -ForegroundColor Red

}


}


# ----------------------------------------------------
# 7 - RAPPORT FINAL
# ----------------------------------------------------

Write-Host ""
Write-Host "[7/7] FIN MASTER" -ForegroundColor Cyan


Write-Host ""
Write-Host "Backup:"
Write-Host $BackupPath


Write-Host ""
Write-Host "PROCHAINE ETAPE:"
Write-Host "Correction automatique des INSERT kos_audit_log"
Write-Host "puis validation 6/6 agents Big Four"

