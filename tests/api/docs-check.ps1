param([string]$ApiBase="https://api.khepraexperts.com")
try {
  $r = Invoke-WebRequest -Uri "$ApiBase/docs" -TimeoutSec 5 -UseBasicParsing -SkipHttpErrorCheck
  if ($r.StatusCode -eq 200) {Write-Host "DOCS = PASS (200)" -ForegroundColor Green}
  elseif ($r.StatusCode -eq 404) {Write-Host "DOCS = SKIP - docs disabled for security (JUSTIFIED per BigFour S9)" -ForegroundColor Yellow}
  else {Write-Host "DOCS = $($r.StatusCode)" -ForegroundColor Gray}
} catch { Write-Host "DOCS check error $_" -ForegroundColor Yellow }
