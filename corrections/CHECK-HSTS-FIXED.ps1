# CHECK-HSTS-FIXED.ps1 - Real HSTS + CSP + Security Headers validation
param(
  [string[]]$Domains = @("https://khepraexperts.com","https://www.khepraexperts.com","https://app.khepraexperts.com")
)

foreach ($domain in $Domains) {
  Write-Host "Checking $domain..." -ForegroundColor Cyan
  try {
    $resp = Invoke-WebRequest -Uri $domain -Method Head -TimeoutSec 10 -ErrorAction Stop
    $hsts = $resp.Headers["Strict-Transport-Security"]
    $csp = $resp.Headers["Content-Security-Policy"]
    $xframe = $resp.Headers["X-Frame-Options"]
    
    Write-Host "  HSTS: $hsts"
    if ($hsts -notmatch "max-age=63072000" -or $hsts -notmatch "preload") {
      Write-Host "  FAIL HSTS" -ForegroundColor Red
    }
    Write-Host "  CSP: $($csp.Substring(0,[Math]::Min(100,$csp.Length)))..."
    if ($csp -match "unsafe-inline") { Write-Host "  FAIL CSP contains unsafe-inline" -ForegroundColor Red }
    Write-Host "  X-Frame-Options: $xframe"
    if ($xframe -ne "DENY") { Write-Host "  WARN X-Frame should be DENY" -ForegroundColor Yellow }
  } catch {
    Write-Host "  ERROR $_" -ForegroundColor Red
  }
}
