param([string]$RepoPath = (Get-Location).Path)
Write-Host "Scanning backup_* anti-pattern..."
$allBackups = Get-ChildItem -Path $RepoPath -Directory -Filter "backup*" -Depth 2 -ErrorAction SilentlyContinue | Where-Object { $_.FullName -notlike "*docs\archive*" -and $_.FullName -notlike "*node_modules*" }
if($allBackups.Count -gt 0){
  Write-Host "FAIL: $($allBackups.Count) backup folders found - Hard Blocker §32" -ForegroundColor Red
  $allBackups | ForEach-Object { Write-Host " - $($_.FullName)" }
} else {
  Write-Host "PASS: No backup folders (excluding docs/archive)" -ForegroundColor Green
}
if(!(Test-Path "$RepoPath/src")){ Write-Host "WARNING: Missing src" -ForegroundColor Yellow }
if(!(Test-Path "$RepoPath/tests")){ Write-Host "WARNING: Missing tests" -ForegroundColor Yellow }
Write-Host "INVENTORY DONE"
