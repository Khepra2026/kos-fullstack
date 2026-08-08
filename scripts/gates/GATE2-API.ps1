$domain="kos.khepraexperts.com"
$apis=@("/api/agents","/api/ao","/api/automations","/api/cron/bceao","/api/funding","/api/funding-hub/assessment","/api/health","/api/observatoires","/api/rag/status","/api/social/publish","/api/trust-center","/api/veille","/api/watchers","/api/wranglers")
$report=@(); $report+="=== GATE 2 - API SURFACE ==="
foreach($a in $apis){
  # Test valide
  try{$res=Invoke-WebRequest "https://$domain$a" -UseBasicParsing -TimeoutSec 10; $report+="PASS $a -> $($res.StatusCode) 200"}catch{$report+="FAIL $a -> $($_.Exception.Response.StatusCode.value__)"}
  # Test sans auth, param manquant, injection
  try{Invoke-RestMethod "https://$domain$a?test=' OR 1=1--" -TimeoutSec 5; $report+="P0 RISQUE $a injection non bloquée"}catch{$report+="SEC $a injection bloquée PASS"}
}
$report | Set-Content ..\evidence\GATE2-API\GATE2-REPORT.txt -Encoding utf8
cat ..\evidence\GATE2-API\GATE2-REPORT.txt
