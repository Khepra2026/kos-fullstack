# =====================================================
# KOS BIG FOUR MASTER 107
# EDGE FUNCTIONS BACKUP + REPAIR PREPARATION
# =====================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root


$backup="C:\KOS-BIG4-AUTOMATION\backup_edge_$(Get-Date -Format yyyyMMdd_HHmm)"


Write-Host "Création backup Edge Functions..." -ForegroundColor Cyan


Copy-Item `
"supabase/functions" `
$backup `
-Recurse `
-Force


Write-Host "Backup créé : $backup" -ForegroundColor Green


Write-Host ""
Write-Host "Analyse ligne 23 des fonctions"


Get-ChildItem `
"supabase/functions" `
-Recurse `
-Filter index.ts |
ForEach-Object {

$content=Get-Content $_.FullName

Write-Host ""
Write-Host $_.FullName -ForegroundColor Yellow

$content[20..28]

}