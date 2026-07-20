# ==============================================================
# KOS REGTECH AI
# BIG FOUR PATCH 003
# SAFE AUDIT MIGRATION
# ==============================================================

$ErrorActionPreference="Stop"

$root="C:\KOS DEV PLATEFORM\project-11940621"

cd $root


$agents=@(
"aml",
"compliance",
"cybersec",
"risk",
"strategic-insight"
)


$backup="backup_BIGFOUR_SAFE_$(Get-Date -Format yyyyMMdd_HHmmss)"

New-Item `
-ItemType Directory `
-Path $backup | Out-Null


Write-Host "=== BACKUP ===" -ForegroundColor Cyan


foreach($agent in $agents){

$file="supabase/functions/$agent/index.ts"

Copy-Item `
$file `
"$backup\$agent.index.ts" `
-Force

Write-Host "Backup $agent OK"

}


Write-Host ""
Write-Host "=== DETECTION INSERT AUDIT ===" -ForegroundColor Cyan


foreach($agent in $agents){

$file="supabase/functions/$agent/index.ts"

Write-Host ""
Write-Host "--- $agent ---"

Select-String `
-Path $file `
-Pattern "query_hash|prompt_hash|kos_audit_log|insert"


}



Write-Host ""
Write-Host "================================================"
Write-Host "ANALYSE TERMINEE"
Write-Host "Aucune modification destructive appliquee"
Write-Host "================================================"
