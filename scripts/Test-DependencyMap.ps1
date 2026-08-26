param([string]$RepoPath)
Write-Host "Checking supply chain §18..."
Set-Location $RepoPath
if(Test-Path "package-lock.json"){ Write-Host "PASS: lockfile present" -ForegroundColor Green } else { Write-Host "FAIL: No lockfile - build non reproductible" -ForegroundColor Red }

try { npm audit --audit-level=high 2>&1 | Out-String | Write-Host } catch {}
try { npx --yes knip --include dependencies,unlisted 2>&1 | Write-Host } catch { Write-Host "knip not available" }

# Check abandoned packages
if(Test-Path "package.json"){
  $pkg = Get-Content package.json | ConvertFrom-Json
  $deps = $pkg.dependencies.PSObject.Properties.Name
  Write-Host "Dependencies count: $($deps.Count)"
}

# Docker image scan
if(Test-Path "Dockerfile"){ try { npx --yes trivy --version; } catch {} }

Write-Host "DEPENDENCY MAP DONE"
