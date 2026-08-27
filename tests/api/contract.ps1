Param([string]$ApiBase="https://api.khepraexperts.com")
$raw = Invoke-WebRequest -Uri "$ApiBase/openapi.json" -UseBasicParsing -TimeoutSec 20
Write-Host "Content-Type: $($raw.Headers['Content-Type'])"
if($raw.Headers["Content-Type"] -notmatch "application/json"){
  Write-Host "CONTRACT-OPENAPI-FETCH = FAIL Content-Type is $($raw.Headers['Content-Type']) not json - SPA fallback!" -ForegroundColor Red
  Write-Host "Body start: $($raw.Content.Substring(0,100))"
  exit 1
}
try {
  $doc = $raw.Content | ConvertFrom-Json
  if($null -eq $doc.openapi -and $null -eq $doc.swagger){ throw "missing openapi field" }
  Write-Host "CONTRACT-OPENAPI-FETCH = PASS $($doc.info.title)" -ForegroundColor Green
} catch {
  Write-Host "CONTRACT-OPENAPI-FETCH = FAIL $_" -ForegroundColor Red
  exit 1
}
