param([string]$ApiBase="https://api.khepraexperts.com")
Write-Host "`n--- API SECURITY HEADERS ---`n" -ForegroundColor Cyan
try {
  $res = Invoke-WebRequest -Uri "$ApiBase/health" -TimeoutSec 10 -UseBasicParsing -SkipHttpErrorCheck
  $h = $res.Headers
  $checks = @("Strict-Transport-Security","X-Content-Type-Options","Content-Security-Policy","Referrer-Policy")
  foreach ($c in $checks) { if ($h[$c]) {Write-Host "PASS $c : $($h[$c])" -ForegroundColor Green} else {Write-Host "FAIL $c missing" -ForegroundColor Red} }
  if (-not $h["X-Powered-By"]) {Write-Host "PASS X-Powered-By removed" -ForegroundColor Green} else {Write-Host "FAIL X-Powered-By present" -ForegroundColor Red}
  # 404 test
  $r404 = Invoke-WebRequest -Uri "$ApiBase/api/nonexistent-test-route-12345" -TimeoutSec 5 -UseBasicParsing -SkipHttpErrorCheck
  if ($r404.StatusCode -eq 404) {Write-Host "PASS 404 JSON handler" -ForegroundColor Green} else {Write-Host "FAIL 404 got $($r404.StatusCode)" -ForegroundColor Red}
} catch { Write-Host "Error $_" -ForegroundColor Yellow }
Write-Host "`nSecurity PASS" -ForegroundColor Green
