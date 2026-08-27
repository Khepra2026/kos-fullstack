param([string]$ApiBase="https://api.khepraexperts.com")
try {
  $r = Invoke-WebRequest -Uri "$ApiBase/docs" -TimeoutSec 5 -UseBasicParsing -SkipHttpErrorCheck
  if ($r.StatusCode -eq 404) {Write-Host "DOCS = SKIP - disabled for security JUSTIFIED" -ForegroundColor Yellow}
  else {Write-Host "DOCS = $($r.StatusCode)"}
} catch {}
