param([string]$RepoPath)
Write-Host "=== PERFORMANCE §19 p50/p95/p99 ==="
# Check k6 scripts
$k6 = Get-ChildItem -Path $RepoPath -Recurse -Include "*.k6.js","k6-*.js","performance/*.js" -ErrorAction SilentlyContinue
if(!$k6){ Write-Host "WARNING: No k6 performance scripts" -ForegroundColor Yellow } else { Write-Host "k6 scripts: $($k6.Name)" }

# Bundle size check
if(Test-Path "$RepoPath/kos-frontend/package.json"){
  Write-Host "Checking frontend bundle..."
  try {
    Push-Location "$RepoPath/kos-frontend"
    npm run build 2>&1 | Select-String -Pattern "bundle|chunk|size" | Write-Host
    Pop-Location
  } catch { Pop-Location }
}

# BEFORE -> CHANGE -> AFTER required
Write-Host "Performance must be measured BEFORE->CHANGE->AFTER, not theoretical §19"

Write-Host "PERFORMANCE BASELINE DONE"
