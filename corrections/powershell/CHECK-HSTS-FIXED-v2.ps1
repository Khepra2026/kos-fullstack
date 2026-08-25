param([string[]]$Domains = @("https://khepraexperts.com","https://www.khepraexperts.com","https://app.khepraexperts.com","https://kos-gateway-hsts.khepra-experts.workers.dev"))
foreach ($domain in $Domains) {
  Write-Host "`n=== Checking $domain ===" -ForegroundColor Cyan
  try {
    $resp = Invoke-WebRequest -Uri $domain -Method Head -TimeoutSec 15 -SkipHttpErrorCheck -ErrorAction SilentlyContinue
    if (-not $resp -or -not $resp.Headers) { $resp = Invoke-WebRequest -Uri $domain -TimeoutSec 15 -ErrorAction SilentlyContinue }
    $h = $resp.Headers; $hsts = $h["Strict-Transport-Security"]; $csp = $h["Content-Security-Policy"]
    Write-Host " HSTS: $hsts"
    if (-not $hsts) { Write-Host " FAIL - HSTS manquant -> deploy Worker kos-gateway-hsts" -ForegroundColor Red }
    elseif ($hsts -notmatch "63072000") { Write-Host " FAIL HSTS incomplet" -ForegroundColor Red }
    else { Write-Host " OK HSTS" -ForegroundColor Green }
    if ($csp) { Write-Host " CSP: $($csp.ToString().Substring(0,[Math]::Min(100,$csp.ToString().Length)))..." }
  } catch { Write-Host " ERROR $_" -ForegroundColor Red }
}
