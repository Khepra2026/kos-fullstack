param([string]$Action = "check")
$API_URL = "https://api.khepraexperts.com"
$API_FALLBACK = "https://api-azure-two-15.vercel.app"
$FRONT_URL = "https://kos.khepraexperts.com"
$API_DIR = "C:\Users\essoc\Downloads\api"
$FRONT_DIR = "C:\Users\essoc\khepra-work\kos-fullstack\frontend"

function Test-Endpoint($url){
  $res = curl.exe -s -w "`n%{http_code}" $url
  $lines = $res -split "`n"; $code=$lines[-1]; $body=($lines[0..($lines.Length-2)] -join "`n")
  if($code -eq "200"){ Write-Host "✅ $url -> $code" -ForegroundColor Green; Write-Host $body } else { Write-Host "❌ $url -> $code" -ForegroundColor Red }
}
Write-Host "=== KOS CHECK ===" -ForegroundColor Cyan
Test-Endpoint "$API_URL/health"
Test-Endpoint "$API_URL/ready"
Test-Endpoint "$FRONT_URL"
Get-Content "$FRONT_DIR\.env.local" -ErrorAction SilentlyContinue
Get-Content "$FRONT_DIR\vercel.json" -ErrorAction SilentlyContinue
