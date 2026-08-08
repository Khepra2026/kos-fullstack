$DOMAINS = @("khepraexperts.com","www.khepraexperts.com","api.khepraexperts.com","kos.khepraexperts.com","app.khepraexperts.com")
$logFile = "reports/dns-$(Get-Date -Format 'yyyy-MM-dd').log"
"=== KHEpra DNS Audit $(Get-Date) ===" | Tee-Object $logFile
foreach($d in $DOMAINS){
  "== $d ==" | Tee-Object $logFile -Append
  try { Resolve-DnsName $d -Type A -ErrorAction Stop | Out-String | Tee-Object $logFile -Append } catch { "$d : A record introuvable" | Tee-Object $logFile -Append }
  try { Resolve-DnsName $d -Type TXT | Out-String | Tee-Object $logFile -Append } catch {}
}
Write-Host "`n=== HSTS ===" -ForegroundColor Cyan
foreach($d in $DOMAINS){
  try{
    $r = Invoke-WebRequest -Uri "https://$d" -Method Head -UseBasicParsing -TimeoutSec 10
    $h = $r.Headers["Strict-Transport-Security"]
    if($h){ Write-Host "$d HSTS OK $h" -ForegroundColor Green } else { Write-Host "$d HSTS MANQUANT" -ForegroundColor Red }
  } catch { Write-Host "$d non joignable" -ForegroundColor Yellow }
}
Write-Host "`nLog: $logFile" -ForegroundColor Green
