param([string]$RepoPath)
Write-Host "=== API-FIRST §6 ==="
$openapi = Get-ChildItem -Path $RepoPath -Recurse -Include "openapi.yaml","openapi.json","swagger.yaml" -ErrorAction SilentlyContinue
if(!$openapi){ Write-Host "FAIL: No OpenAPI contract - mandatory §6" -ForegroundColor Red } else { Write-Host "PASS: OpenAPI found at $($openapi.FullName)" -ForegroundColor Green; try { npx --yes @redocly/cli lint $openapi.FullName } catch {} }

# Check endpoint contract: METHOD PATH AUTH VALIDATION BUSINESS LOGIC RESPONSE ERROR RATE LIMIT AUDIT OBSERVABILITY TEST
$endpoints = Select-String -Path "$RepoPath/**/*.ts" -Pattern "router\.(get|post|put|patch|delete)|app\.(get|post)" -ErrorAction SilentlyContinue | Measure-Object
Write-Host "Detected ~$($endpoints.Count) endpoints"

# Check missing auth
$noAuth = Select-String -Path "$RepoPath/**/api/**/*.ts" -Pattern "app\.get\(|router\.get\(" -ErrorAction SilentlyContinue | Where-Object { $_.Line -notmatch "auth|authenticate|authorize" } | Select-Object -First 5
if($noAuth){ Write-Host "WARNING: Potential endpoints without auth check (manual review needed)" -ForegroundColor Yellow }

# Check error model deterministic
$randomResponses = Select-String -Path "$RepoPath/**/*.ts" -Pattern "Math\.random\(\)|Date\.now\(\)" -ErrorAction SilentlyContinue | Where-Object { $_.Path -like "*api*" } | Select-Object -First 5
if($randomResponses){ Write-Host "WARNING: Non-deterministic responses in API layer" -ForegroundColor Yellow }

Write-Host "API BASELINE DONE"
