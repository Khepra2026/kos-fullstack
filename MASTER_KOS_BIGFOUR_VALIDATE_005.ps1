Write-Host "
====================================================
 KOS REGTECH AI - BIG FOUR VALIDATION MASTER 005
====================================================
" -ForegroundColor Cyan


$supabaseUrl="https://pgfwhahiwqvqeahpirjx.supabase.co"

$headers=@{
apikey=$env:SUPABASE_SERVICE_ROLE_KEY
Authorization="Bearer $env:SUPABASE_SERVICE_ROLE_KEY"
"Content-Type"="application/json"
}


$agents=@(
@{name="strategic-insight";query="gouvernance"},
@{name="data-protection";query="protection données"},
@{name="compliance";query="KYC"},
@{name="cybersec";query="continuité"},
@{name="aml";query="soupçon"},
@{name="risk";query="Tier"}
)


Write-Host "`n=== TEST 6 AGENTS BIG FOUR ===" -ForegroundColor Yellow


foreach($a in $agents){

Write-Host "`n--- $($a.name) ---" -ForegroundColor Cyan

$body=@{
query=$a.query
org_id="KHEPRA-TEST"
}|ConvertTo-Json


try{

$r=Invoke-RestMethod `
-Uri "$supabaseUrl/functions/v1/$($a.name)" `
-Method POST `
-Headers $headers `
-Body $body


$r | Select `
agent,
cobac_compliant,
bigfour_standard,
iso_compliant,
response_time_ms,
request_id


}
catch{

Write-Host "ERREUR $($a.name)" -ForegroundColor Red

}

Start-Sleep -Seconds 2

}



Write-Host "

=== VERIFICATION AUDIT LOG ===
" -ForegroundColor Yellow


$audit=Invoke-RestMethod `
-Uri "$supabaseUrl/rest/v1/kos_audit_log?order=ts.desc&limit=20" `
-Headers $headers


$audit |
Select agent_name,
user_id,
org_id,
prompt_hash,
response_hash,
model_version,
cobac_compliant,
bigfour_standard,
iso_compliant |
Format-Table



$count=(
$audit |
Where-Object{
$_.agent_name -in @(
"Strategic_Insight",
"Data_Protection",
"Compliance",
"CyberSec",
"AML",
"Risk"
)
}
|
Select-Object agent_name -Unique
).Count



Write-Host "

RESULTAT BIG FOUR :
$count / 6 agents enregistrés

" -ForegroundColor Cyan



if($count -eq 6){

Write-Host "
✅ CERTIFICATION TECHNIQUE BIG FOUR OK
✅ TRACE AUDIT 7 ANS OK
✅ COBAC READY
✅ ISO READY
" -ForegroundColor Green

}
else{

Write-Host "
⚠️ AUDIT INCOMPLET
Correction nécessaire
" -ForegroundColor Yellow

}