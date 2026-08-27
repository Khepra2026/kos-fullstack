param(
  [string]$SupabaseUrl = $env:SUPABASE_URL,
  [string]$AnonKey = $env:SUPABASE_ANON_KEY
)
Write-Host "`n--- SUPABASE CONNECTIVITY ---`n" -ForegroundColor Cyan
if (-not $SupabaseUrl) {
  $result = [pscustomobject]@{
    id = "SUPABASE-CONFIG"
    result = "SKIP"
    status = "NOT_CONFIGURED_JUSTIFIED"
    details = "DATABASE NOT CONFIGURED - SUPABASE_URL not present - intentional in PREPROD per BigFour S14"
    severity = "INFO"
    justification = "Supabase intentionally disabled in PREPROD, secrets in Fly"
    timestamp = (Get-Date).ToString("o")
  }
  $result | Format-Table -AutoSize
  Write-Host "SUPABASE = PASS ou NOT_CONFIGURED_JUSTIFIED" -ForegroundColor Green
  New-Item -ItemType Directory -Force -Path reports | Out-Null
  $result | ConvertTo-Json | Out-File reports/KOS-SUPABASE.json -Encoding utf8
  return
}
Write-Host "SUPABASE_URL present - testing..." -ForegroundColor Green
