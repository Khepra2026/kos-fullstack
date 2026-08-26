param([string]$RepoPath)
Write-Host "Scanning duplicates §24..."
# Duplicate routes
$routeFiles = Get-ChildItem -Path $RepoPath -Recurse -Include "gen-routes.mjs","api_gateway_mapping.json","routes.ts" -ErrorAction SilentlyContinue
if($routeFiles.Count -gt 1){ Write-Host "FAIL: Multiple route definitions: $($routeFiles.Count)" -ForegroundColor Red; $routeFiles | Format-Table Name,Directory }

# Duplicate docker-compose
$compose = Get-ChildItem -Path $RepoPath -Filter "docker-compose*.yml" -ErrorAction SilentlyContinue
if($compose.Count -gt 1){ Write-Host "FAIL: Multiple docker-compose files: $($compose.Name) - must unify to 1" -ForegroundColor Red } else { Write-Host "PASS: Single compose" -ForegroundColor Green }

# Duplicate tables via governance_schema.sql vs supabase/migrations
$schemas = Get-ChildItem -Path $RepoPath -Recurse -Include "*.sql" | Where-Object { $_.Name -match "governance|audit_tables" }
if($schemas.Count -gt 2){ Write-Host "WARNING: Multiple schema definitions - check duplication" -ForegroundColor Yellow }

# Check duplicate API paths via grep
try {
  $apis = Select-String -Path "$RepoPath/**/*.ts" -Pattern "app\.(get|post|put|delete)\(" -ErrorAction SilentlyContinue | Group-Object Line | Where-Object Count -gt 1
  if($apis){ Write-Host "FAIL: Duplicate API handlers found" -ForegroundColor Red; $apis | Format-Table }
} catch {}

Write-Host "DUPLICATE SCAN DONE"
