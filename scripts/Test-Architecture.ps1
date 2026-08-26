param([string]$RepoPath)
Write-Host "Checking modular architecture §5..."
$modules = @("auth","users","organizations","governance","compliance","regulatory","documents","crawler","rag","ai","agents","orchestrator","notifications","audit","monitoring")
$srcModules = Get-ChildItem "$RepoPath/src/modules" -Directory -ErrorAction SilentlyContinue
if(!$srcModules){ $srcModules = Get-ChildItem "$RepoPath/kos-frontend/src" -Directory -ErrorAction SilentlyContinue }

# Check circular deps with dependency-cruiser if present
if(Test-Path "$RepoPath/package.json"){
  try { npx --yes dependency-cruiser --version | Out-Null; npx dependency-cruiser "$RepoPath/src" --validate 2>&1 | Write-Host } catch { Write-Host "dependency-cruiser not installed, skipping circular check" -ForegroundColor Yellow }
}

# Check monolith files >500 lines
$bigFiles = Get-ChildItem -Path $RepoPath -Recurse -Include "*.ts","*.tsx" -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 100KB } | Select-Object -First 10
if($bigFiles){ Write-Host "WARNING: Large files >100KB (possible monolith):" -ForegroundColor Yellow; $bigFiles | ForEach-Object { Write-Host " - $($_.Name) $($_.Length)" } }

Write-Host "ARCHITECTURE CHECK DONE"
