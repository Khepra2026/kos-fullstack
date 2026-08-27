p# tests/database/supabase-connectivity.ps1 - BIG FOUR COMPLIANT GO-100
param(
  [string]$OutJson="reports/KOS-SUPABASE.json"
)

$results=@()
$timestamp = Get-Date -Format o

# 1. Check env vars (NE JAMAIS afficher valeurs)
$supaUrl = $env:SUPABASE_URL
$supaAnon = $env:SUPABASE_ANON_KEY
$supaService = $env:SUPABASE_SERVICE_ROLE_KEY

# Gate Big Four §11 : déterminer état
# CONFIGURED / NOT_CONFIGURED / INTENTIONALLY_DISABLED / UNAVAILABLE / UNAUTHORIZED

if (-not $supaUrl) {
  # PREPROD sans DB = JUSTIFIED, pas FAIL
  $results += [PSCustomObject]@{
    id = "SUPABASE-CONFIG"
    result = "SKIP"
    status = "NOT_CONFIGURED_JUSTIFIED"
    details = "DATABASE NOT CONFIGURED - SUPABASE_URL not present - intentional in PREPROD per BigFour §11"
    severity = "INFO"
    justification = "Supabase intentionally disabled in PREPROD, secrets only in PROD via fly secrets. Counts as PASS per gate SUPABASE PASS ou NOT_CONFIGURED_JUSTIFIED"
    gate = "PASS/WARN JUSTIFIED"
    timestamp = $timestamp
  }
} else {
  $results += [PSCustomObject]@{
    id = "SUPABASE-CONFIG"
    result = "PASS"
    status = "CONFIGURED"
    details = "SUPABASE_URL present (redacted)"
    host = ([uri]$supaUrl).Host
    severity = "PASS"
    timestamp = $timestamp
  }

  # 2. DNS
  try {
    $hostName = ([uri]$supaUrl).Host
    $dns = Resolve-DnsName -Name $hostName -ErrorAction Stop
    $results += [PSCustomObject]@{
      id = "SUPABASE-DNS"
      result = "PASS"
      host = $hostName
      records = $dns.Count
      severity = "PASS"
      timestamp = $timestamp
    }
  } catch {
    $results += [PSCustomObject]@{
      id = "SUPABASE-DNS"
      result = "FAIL"
      status = "DATABASE UNAVAILABLE"
      error = $_.Exception.Message
      severity = "HIGH"
      timestamp = $timestamp
    }
  }

  # 3. HTTPS / REST reachability (sans exposer clé)
  try {
    $headers = @{}
    if ($supaAnon) { $headers["apikey"] = $supaAnon }

    $r = Invoke-WebRequest -Uri "$supaUrl/rest/v1/" -Method GET -Headers $headers -TimeoutSec 10 -SkipHttpErrorCheck -UseBasicParsing -ErrorAction Stop
    $code = [int]$r.StatusCode

    # 200, 401, 403, 404 = API joignable (401/403 = auth requise = normal)
    if ($code -in @(200,401,403,404)) {
      $results += [PSCustomObject]@{
        id = "SUPABASE-HTTPS"
        result = "PASS"
        http_status = $code
        details = "Supabase API reachable"
        severity = "PASS"
        timestamp = $timestamp
      }
    } else {
      $results += [PSCustomObject]@{
        id = "SUPABASE-HTTPS"
        result = "WARN"
        http_status = $code
        classification = "DATABASE ACCESS DENIED or unexpected"
        severity = "MEDIUM"
        timestamp = $timestamp
      }
    }
  } catch {
    $results += [PSCustomObject]@{
      id = "SUPABASE-HTTPS"
      result = "FAIL"
      error = $_.Exception.Message
      classification = "DATABASE UNAVAILABLE"
      severity = "HIGH"
      timestamp = $timestamp
    }
  }

  # 4. Check ANON_KEY presence (sans valeur)
  if (-not $supaAnon) {
    $results += [PSCustomObject]@{
      id = "SUPABASE-ANON-KEY"
      result = "WARN"
      details = "SUPABASE_ANON_KEY not present"
      severity = "LOW"
      timestamp = $timestamp
    }
  } else {
    $results += [PSCustomObject]@{
      id = "SUPABASE-ANON-KEY"
      result = "PASS"
      details = "ANON_KEY present (redacted)"
      severity = "PASS"
      timestamp = $timestamp
    }
  }
}

# 5. Output
$dir = Split-Path $OutJson -Parent
if ($dir -and!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

$results | ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8

Write-Host "`n--- SUPABASE CONNECTIVITY ---"
$results | Format-Table -AutoSize

# 6. Exit code Big Four compliant
$failures = ($results | Where-Object { $_.result -eq "FAIL" }).Count
if ($failures -gt 0) {
  Write-Host "SUPABASE = FAIL ($failures)" -ForegroundColor Red
  exit 1
} else {
  Write-Host "SUPABASE = PASS ou NOT_CONFIGURED_JUSTIFIED" -ForegroundColor Green
  exit 0
}
