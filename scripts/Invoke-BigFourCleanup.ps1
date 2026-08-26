param([string]$RepoPath = (Get-Location).Path)
$ErrorActionPreference="Continue"
Set-Location $RepoPath
Write-Host "=== BIGFOUR CLEANUP §32 ===" -ForegroundColor Cyan
try { git tag -a "bigfour-baseline-$(Get-Date -Format yyyyMMdd_HHmmss)" -m "baseline before cleanup" 2>&1 | Write-Host } catch {}
$archiveRoot = Join-Path $RepoPath "docs/archive/backups_$(Get-Date -Format yyyyMMdd)"
if(!(Test-Path $archiveRoot)){ New-Item -ItemType Directory -Path $archiveRoot -Force | Out-Null }
$backups = Get-ChildItem -Path $RepoPath -Directory -Filter "backup*" -Depth 1 -ErrorAction SilentlyContinue
Write-Host "Found $($backups.Count) backup folders"
foreach($b in $backups){ $dest = Join-Path $archiveRoot $b.Name; Write-Host "  Moving $($b.Name)"; try { Move-Item -Path $b.FullName -Destination $dest -Force } catch { Write-Host $_.Exception.Message -ForegroundColor Red } }
$composeFiles = Get-ChildItem -Path $RepoPath -Filter "docker-compose.*.yml" -ErrorAction SilentlyContinue
if($composeFiles.Count -gt 1){
  $composeArchive = Join-Path $archiveRoot "compose"
  if(!(Test-Path $composeArchive)){ New-Item -ItemType Directory -Path $composeArchive -Force | Out-Null }
  foreach($c in $composeFiles){ if($c.Name -ne "docker-compose.yml"){ Move-Item $c.FullName (Join-Path $composeArchive $c.Name) -Force -ErrorAction SilentlyContinue; Write-Host "  Archived $($c.Name)" -ForegroundColor Yellow } }
}
$gitignore = Join-Path $RepoPath ".gitignore"
$requiredIgnores = @(".env",".env.prod",".env.local","backend/.env.local","frontend/.env.local","gateway/.dev.vars","docs/archive/","*.log")
foreach($ig in $requiredIgnores){
  $content = if(Test-Path $gitignore){ Get-Content $gitignore -Raw } else { "" }
  if($content -notmatch [regex]::Escape($ig)){ Add-Content -Path $gitignore -Value "`n$ig" -Force; Write-Host "  Added $ig to .gitignore" -ForegroundColor Green }
}
try { git rm --cached .env .env.prod .env.local 2>&1 | Out-Null; git rm --cached backend/.env.local frontend/.env.local 2>&1 | Out-Null } catch {}
$openapiPath = "$RepoPath/public/api/openapi.json"
if(Test-Path $openapiPath){
  try {
    $json = Get-Content $openapiPath -Raw | ConvertFrom-Json
    $newPaths = New-Object PSObject
    foreach($key in $json.paths.PSObject.Properties.Name){ $newKey = $key.TrimEnd('/'); if($newKey -eq ""){ $newKey = "/" }; $newPaths | Add-Member -NotePropertyName $newKey -NotePropertyValue $json.paths.$key -Force }
    $json.paths = $newPaths
    $json | ConvertTo-Json -Depth 20 | Set-Content $openapiPath -Encoding UTF8 -Force
    Write-Host "  Fixed openapi trailing slash" -ForegroundColor Green
  } catch { Write-Host $_.Exception.Message -ForegroundColor Red }
}
Write-Host "`n=== CLEANUP DONE ===" -ForegroundColor Green
Write-Host "ROTATE SUPABASE KEYS IMMEDIATELY! 148 secrets exposed" -ForegroundColor Red
