param([string]$RepoPath = (Get-Location).Path)
Write-Host "[Duplicate §24] Scanning (ignoring docs/archive, node_modules, backup)"
$excludePattern = @("docs\\archive","docs/archive","node_modules","backup")
function Test-IsExcluded($path){
  foreach($ex in $excludePattern){ if($path -like "*$ex*"){ return $true } }
  return $false
}
$routes = Get-ChildItem -Path $RepoPath -Filter "api_gateway_mapping.json" -Recurse -ErrorAction SilentlyContinue | Where-Object { -not (Test-IsExcluded $_.FullName) }
$genRoutes = Get-ChildItem -Path $RepoPath -Filter "gen-routes.mjs" -Recurse -ErrorAction SilentlyContinue | Where-Object { -not (Test-IsExcluded $_.FullName) }
$compose = Get-ChildItem -Path $RepoPath -Depth 1 -Filter "docker-compose*.yml" -ErrorAction SilentlyContinue | Where-Object { $_.Name -eq "docker-compose.yml" -or $_.Name -eq "docker-compose.prod.yml" }

if($routes.Count -gt 1){ Write-Host "FAIL: $($routes.Count) api_gateway_mapping.json" -ForegroundColor Red; $routes | % { Write-Host " - $($_.FullName)" } } else { Write-Host "PASS: api_gateway_mapping.json count=$($routes.Count)" -ForegroundColor Green }
if($genRoutes.Count -gt 1){ Write-Host "FAIL: $($genRoutes.Count) gen-routes.mjs" -ForegroundColor Red } else { Write-Host "PASS: gen-routes.mjs count=$($genRoutes.Count)" -ForegroundColor Green }
if($compose.Count -gt 1){ Write-Host "INFO: $($compose.Count) compose files: $($compose.Name -join ', ') - should unify to 1 for §24" -ForegroundColor Yellow } else { Write-Host "PASS: Single docker-compose" -ForegroundColor Green }
Write-Host "DUPLICATE SCAN DONE"
