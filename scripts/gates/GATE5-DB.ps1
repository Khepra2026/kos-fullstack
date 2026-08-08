# Vérif Supabase RLS via API
$domain="kos.khepraexperts.com"
try{
 $h=Invoke-RestMethod "https://$domain/api/health" -TimeoutSec 10
 "Supabase Host: $($h.debug.url_host)" | Set-Content ..\evidence\GATE5-DB\GATE5-RLS-CHECK.txt -Encoding utf8
 "Table: $($h.table) RLS à vérifier dans Supabase Dashboard -> Authentication -> Policies" | Add-Content ..\evidence\GATE5-DB\GATE5-RLS-CHECK.txt
 "CRITIQUE: Tester manuellement: Tenant A ne doit pas lire Tenant B - Preuve à joindre" | Add-Content ..\evidence\GATE5-DB\GATE5-RLS-CHECK.txt
 cat ..\evidence\GATE5-DB\GATE5-RLS-CHECK.txt
}catch{"DB DOWN" | Set-Content ..\evidence\GATE5-DB\GATE5-RLS-CHECK.txt}
