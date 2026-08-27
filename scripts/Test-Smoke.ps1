param([string]$BaseUrl = "https://kos.khepraexperts.com")
Write-Host "=== PRODUCTION SMOKE Â§27 + Â§13 ===" -ForegroundColor Cyan
$urls = @("https://kos-khepraexperts.fly.dev/health","https://kos.khepraexperts.com/health")
foreach($url in $urls){
  try {
    $res = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    if($res.StatusCode -eq 200){ Write-Host "PASS: $url -> 200" -ForegroundColor Green; Write-Host $res.Content.Substring(0,80) }
  } catch { Write-Host "FAIL: $url -> $_" -ForegroundColor Red }
}
Write-Host "SMOKE DONE"
