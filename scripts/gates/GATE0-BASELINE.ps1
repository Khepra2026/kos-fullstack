$domain="kos.khepraexperts.com"
$apiDomain="api.khepraexperts.com"
$report=@()
$report+="=== GATE 0 - INVENTAIRE BASELINE $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') ==="
$report+="evidence_id: 04288af8-5153-4fb5-bdfa-0fb0541707dd"
try{$dns=Resolve-DnsName $domain -Type CNAME -ErrorAction Stop; $report+="PRE-001 DNS KOS: $($dns.NameHost) PASS"}catch{$report+="PRE-001 DNS KOS: FAIL"}
try{$dns2=Resolve-DnsName $apiDomain -Type CNAME; $report+="PRE-002 DNS API: $($dns2.NameHost) PASS"}catch{$report+="PRE-002 DNS API: FAIL"}
try{$tcp=Test-NetConnection $domain -Port 443; $report+="PRE-003 TLS: TcpTestSucceeded=$($tcp.TcpTestSucceeded) PASS"}catch{$report+="PRE-003 TLS: FAIL"}
$routes=@("/","/dashboard","/hub","/api-docs","/docs","/funding-hub","/observatoires","/trust-center","/billing","/checkout")
foreach($r in $routes){
 try{$res=Invoke-WebRequest "https://$domain$r" -UseBasicParsing -TimeoutSec 10; $report+="PRE-008 Route $r : $($res.StatusCode) PASS"}catch{$report+="PRE-008 Route $r : FAIL"}
}
try{$h=Invoke-RestMethod "https://$domain/api/health" -TimeoutSec 10; $report+="PRE-011 Health: $($h.status) real_data=$($h.real_data) PASS"; $report+="  -> Supabase: $($h.debug.url_host) Count=$($h.count) Worker=$($h.worker) EV=$($h.evidence_id)"}catch{$report+="PRE-011 Health: FAIL"}
try{$rag=Invoke-RestMethod "https://$domain/api/rag/status" -TimeoutSec 10; $report+="PRE-012 Readiness RAG: $($rag.status) gateway=$($rag.gateway) PASS"}catch{$report+="PRE-012 Readiness RAG: BLOCKED"}
try{$oa=Invoke-WebRequest "https://$domain/api/openapi" -UseBasicParsing -TimeoutSec 5; $report+="PRE-009 OpenAPI /api/openapi: $($oa.StatusCode) PASS"}catch{$report+="PRE-009 OpenAPI /api/openapi: FAIL"}
try{$oa2=Invoke-WebRequest "https://$domain/api/openapi.json" -UseBasicParsing -TimeoutSec 5; $report+="PRE-009 OpenAPI /api/openapi.json: $($oa2.StatusCode) PASS"}catch{$report+="PRE-009 OpenAPI /api/openapi.json: FAIL"}
try{$docs=Invoke-WebRequest "https://$domain/docs" -UseBasicParsing -TimeoutSec 5; $report+="PRE-010 Docs /docs: $($docs.StatusCode) PASS"}catch{$report+="PRE-010 Docs /docs: FAIL"}
$report | Set-Content ..\evidence\GATE0-BASELINE\GATE0-REPORT.txt -Encoding utf8
cat ..\evidence\GATE0-BASELINE\GATE0-REPORT.txt
