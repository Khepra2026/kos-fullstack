
# KOS-BIGFOUR-001 - Cleanup gouvernance catastrophique
# Objectif: supprimer tous les backup_* qui polluent le repo et l'image Docker
param([switch]$DryRun=$true)
$ErrorActionPreference="Stop"
Write-Host "=== KOS Cleanup Backups ===" -ForegroundColor Cyan
$patterns = @("backup_*","backups","backup","evidence","logs","exports")
$found = Get-ChildItem -Path "." -Directory -Force | Where-Object { $_.Name -like "backup_*" -or $_.Name -in $patterns }
foreach($d in $found){
  if($DryRun){ Write-Host "[DRY-RUN] Would remove $($d.FullName)" -ForegroundColor Yellow }
  else { Remove-Item -Recurse -Force $d.FullName; Write-Host "Removed $($d.Name)" }
}
# Nettoyer aussi les zip de backup contenant potentiellement des secrets
Get-ChildItem -Filter "backup*.zip" | ForEach-Object {
  if($DryRun){ Write-Host "[DRY-RUN] Would remove $($_.Name)" }
  else { Remove-Item -Force $_.FullName }
}
Write-Host "Ajoute ces patterns à .gitignore - Voir security/.gitignore.patch"
