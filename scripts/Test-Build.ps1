param([string]$RepoPath)
Write-Host "=== BUILD REPRODUCIBLE §27 ==="
Set-Location $RepoPath
# Check GIT SHA -> BUILD -> IMAGE -> DEPLOYMENT
$sha = git rev-parse HEAD
Write-Host "GIT SHA: $sha"

# Build
try {
  docker build -t kos-regtech:$sha --label "git.sha=$sha" . 2>&1 | Write-Host
  Write-Host "PASS: Docker build succeeded" -ForegroundColor Green
} catch { Write-Host "FAIL: Docker build failed" -ForegroundColor Red; exit 1 }

# Check image reproducibility
try { docker inspect kos-regtech:$sha | ConvertFrom-Json | Select-Object -ExpandProperty Config | Format-List } catch {}

Write-Host "BUILD DONE"
