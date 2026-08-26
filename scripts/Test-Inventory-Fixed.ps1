
param([string]$RepoPath = (Get-Location).Path)
Write-Host "Scanning backup_* anti-pattern (excluding docs/archive, node_modules)..."
$allBackups = Get-ChildItem -Path $RepoPath -Directory -Filter "backup*" -Depth 2 -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*docs\archive*" -and $_.FullName -notlike "*node_modules*" }
if($allBackups.Count -gt 0){
  Write-Host "FAIL: $($allBackups.Count) backup folders found - Hard Blocker §32" -ForegroundColor Red
  $allBackups | ForEach-Object { Write-Host " - $($_.FullName)" }
} else {
  Write-Host "PASS: No backup folders outside archive" -ForegroundColor Green
}
Write-Host "INVENTORY DONE"
