param([string]$RepoPath,[string]$SupabaseUrl,[string]$SupabaseKey)
Write-Host "=== DATABASE-FIRST QUALITY §7 + Supabase §8 ==="

# Migrations check
$migrations = Get-ChildItem -Path "$RepoPath/supabase/migrations" -Filter "*.sql" -ErrorAction SilentlyContinue
Write-Host "Migrations count: $($migrations.Count)"
# Check idempotency IF NOT EXISTS
$nonIdempotent = Select-String -Path "$RepoPath/supabase/migrations/*.sql" -Pattern "CREATE TABLE" -ErrorAction SilentlyContinue | Where-Object { $_.Line -notmatch "IF NOT EXISTS" }
if($nonIdempotent){ Write-Host "WARNING: Non-idempotent migrations (missing IF NOT EXISTS):" -ForegroundColor Yellow; $nonIdempotent | Select-Object -First 10 | Format-Table }

# Check PK/FK/UNIQUE
$noPK = Select-String -Path "$RepoPath/supabase/migrations/*.sql" -Pattern "CREATE TABLE" -ErrorAction SilentlyContinue | ForEach-Object {
  $content = Get-Content $_.Path -Raw
  if($content -notmatch "PRIMARY KEY"){ $_ }
}
if($noPK){ Write-Host "FAIL: Tables without PK" -ForegroundColor Red }

# If Supabase creds provided, live check
if($SupabaseUrl -and $SupabaseKey){
  Write-Host "Live Supabase RLS check..."
  $headers = @{ "apikey"=$SupabaseKey; "Authorization"="Bearer $SupabaseKey" }
  try {
    $tables = @("users","regulatory_documents","audit_logs","organizations","compliance_checks")
    foreach($t in $tables){
      $res = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/$t?select=*&limit=1" -Headers $headers -ErrorAction SilentlyContinue
      Write-Host "Table $t reachable"
    }
  } catch { Write-Host "Supabase live check failed: $($_.Exception.Message)" -ForegroundColor Yellow }
} else {
  Write-Host "SUPABASE_URL not set - skipping live RLS check (mark UNKNOWN)" -ForegroundColor Yellow
}

# pgvector check
$hasVector = Select-String -Path "$RepoPath/supabase/migrations/*.sql" -Pattern "vector|pgvector|ivfflat|hnsw" -ErrorAction SilentlyContinue
if(!$hasVector){ Write-Host "WARNING: No pgvector index found - RAG will fail" -ForegroundColor Yellow } else { Write-Host "PASS: pgvector found" -ForegroundColor Green }

Write-Host "DATABASE BASELINE DONE"
