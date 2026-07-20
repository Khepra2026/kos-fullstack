# ==========================================================
# KOS REGTECH AI
# BIG FOUR PRODUCTION PATCH 007
# FINAL AUDIT REPAIR
# ==========================================================


$Project="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $Project


Write-Host "
====================================================
 KOS BIG FOUR PRODUCTION PATCH 007
====================================================
" -ForegroundColor Cyan



# ----------------------------------------------------------
# 1 BACKUP
# ----------------------------------------------------------

$backup="backup_BIGFOUR_PATCH007_$(Get-Date -Format yyyyMMdd_HHmmss)"

New-Item $backup -ItemType Directory | Out-Null


$agents=@(
"strategic-insight",
"data-protection"
)


foreach($a in $agents)
{

Copy-Item `
".\supabase\functions\$a" `
"$backup\$a" `
-Recurse `
-Force

Write-Host "Backup $a OK"

}



# ----------------------------------------------------------
# 2 RECHERCHE ERREURS
# ----------------------------------------------------------

Write-Host "
=== SCAN STRATEGIC ===
"


Get-Content `
".\supabase\functions\strategic-insight\index.ts" |
Select-String "insert|response_hash|query_hash"



Write-Host "
=== SCAN DATA PROTECTION ===
"


Get-Content `
".\supabase\functions\data-protection\index.ts" |
Select-String "insert|query|org_id"



# ----------------------------------------------------------
# 3 VERIFICATION TYPESCRIPT
# ----------------------------------------------------------

Write-Host "
=== DEPLOY TEST ===
"


supabase functions deploy strategic-insight

supabase functions deploy data-protection



# ----------------------------------------------------------
# 4 TEST
# ----------------------------------------------------------


$supabaseUrl="https://pgfwhahiwqvqeahpirjx.supabase.co"


$key=$env:SUPABASE_ANON_KEY.Trim()


$headers=@{
"apikey"=$key
"Authorization"="Bearer $key"
"Content-Type"="application/json"
}



$tests=@(
@{
name="strategic-insight"
query="strategie"
},
@{
name="data-protection"
query="RGPD"
}
)



foreach($t in $tests)
{

Write-Host "
TEST $($t.name)
"


$body=@{
query=$t.query
org_id="production"
}|ConvertTo-Json



try
{

Invoke-RestMethod `
-Uri "$supabaseUrl/functions/v1/$($t.name)" `
-Headers $headers `
-Method POST `
-Body $body |
Format-List


}
catch
{

Write-Host $_.Exception.Message -ForegroundColor Red

}

}




Write-Host "
PATCH 007 TERMINE
" -ForegroundColor Green
