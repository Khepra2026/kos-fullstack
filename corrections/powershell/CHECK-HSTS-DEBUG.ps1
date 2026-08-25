param([string[]]$Domains = @("https://kos-gateway-hsts.khepra-experts.workers.dev","https://khepraexperts.com","https://www.khepraexperts.com","https://app.khepraexperts.com"))

foreach ($domain in $Domains) {
  Write-Host "`n=== $domain ===" -ForegroundColor Cyan
  try {
    # Force GET, not HEAD, and no cache
    $resp = Invoke-WebRequest -Uri $domain -Method Get -Headers @{"Cache-Control"="no-cache"; "Pragma"="no-cache"} -TimeoutSec 20 -SkipHttpErrorCheck -ErrorAction Continue
    Write-Host " Status: $($resp.StatusCode)" -ForegroundColor Gray
    $h = $resp.Headers
    foreach ($k in $h.Keys) {
      Write-Host "  $k : $($h[$k])"
    }
    $hsts = $h["Strict-Transport-Security"]
    if ($hsts) { Write-Host " ✅ OK HSTS: $hsts" -ForegroundColor Green } else { Write-Host " ❌ FAIL HSTS manquant" -ForegroundColor Red }
  } catch {
    Write-Host " ERROR: $_" -ForegroundColor Red
    # Try curl fallback
    try {
      $curl = curl.exe -i -s --max-time 10 $domain 2>&1 | Out-String
      Write-Host " curl output:`n$($curl.Substring(0,[Math]::Min(500,$curl.Length)))" -ForegroundColor Yellow
    } catch {}
  }
}
