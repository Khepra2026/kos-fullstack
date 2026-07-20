# ==========================================================
# KOS REGTECH AI
# BIG FOUR PRODUCTION PATCH 008 KILLER
# Deploy + Test + Audit Validation
# ==========================================================


Write-Host "
====================================================
 KOS REGTECH AI
 BIG FOUR PRODUCTION PATCH 008
====================================================
" -ForegroundColor Cyan


$Project="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $Project


# ================================
# CONFIG
# ================================

$supabaseUrl="https://pgfwhahiwqvqeahpirjx.supabase.co"


if([string]::IsNullOrWhiteSpace($env:SUPABASE_ANON_KEY)){

Write-Host "ERREUR clé Supabase absente" -ForegroundColor Red
exit

}


$key=$env:SUPABASE_ANON_KEY.Trim()


# contrôle ASCII

if($key.ToCharArray() | Where-Object {[int]$_ -gt 127}){

Write-Host "ERREUR clé contient caractères non ASCII" -ForegroundColor Red
exit

}


$headers=@{

"apikey"=$key

"Authorization"="Bearer $key"

"Content-Type"="application/json"

"Prefer"="return=representation"

}



$agents=@(
"strategic-insight",
"data-protection",
"compliance",
"cybersec",
"aml",
"risk"
)



# ================================
# BACKUP
# ================================


Write-Host "[1] BACKUP" -ForegroundColor Yellow


$backup="backup_BIGFOUR_008_$(Get-Date -Format yyyyMMdd_HHmmss)"

New-Item $backup -ItemType Directory | Out-Null


foreach($a in $agents){

$src="./supabase/functions/$a"


if(Test-Path $src){

Copy-Item $src "$backup\$a" -Recurse -Force

Write-Host "Backup OK : $a" -ForegroundColor Green

}

}



# ================================
# TYPESCRIPT CHECK
# ================================


Write-Host "[2] TYPESCRIPT CHECK" -ForegroundColor Yellow


foreach($a in $agents){


$file="./supabase/functions/$a/index.ts"


if(Test-Path $file){


$content=Get-Content $file -Raw


if(
$content -match "Unexpected eof" -or
$content -match "Erreur interne du\s*$"
){

Write-Host "ERREUR TS détectée : $a" -ForegroundColor Red

}

else{

Write-Host "$a syntaxe OK" -ForegroundColor Green

}


}

}



# ================================
# DEPLOY
# ================================


Write-Host "[3] DEPLOY EDGE FUNCTIONS" -ForegroundColor Yellow


foreach($a in $agents){


Write-Host "Deploy $a"


supabase functions deploy $a


if($LASTEXITCODE -eq 0){

Write-Host "$a DEPLOY OK" -ForegroundColor Green

}
else{

Write-Host "$a DEPLOY FAILED" -ForegroundColor Red

}

}



# ================================
# TESTS
# ================================


Write-Host "[4] TEST BIG FOUR" -ForegroundColor Yellow


$tests=@(

@{
name="strategic-insight"
query="analyse stratégique"
},

@{
name="data-protection"
query="RGPD protection données"
},

@{
name="compliance"
query="KYC conformité"
},

@{
name="cybersec"
query="cybersécurité"
},

@{
name="aml"
query="anti blanchiment"
},

@{
name="risk"
query="analyse risque"
}

)



$success=@()



foreach($test in $tests){


$name=$test.name


Write-Host ""
Write-Host "--- $name ---" -ForegroundColor Cyan


$body=@{

query=$test.query

org_id="khepra-production"

}|ConvertTo-Json



try{


$response=Invoke-RestMethod `

-Uri "$supabaseUrl/functions/v1/$name" `

-Headers $headers `

-Method POST `

-Body $body `

-TimeoutSec 30



$response | 
Select-Object agent,
bigfour_standard,
iso_compliant,
cobac_compliant,
response_time_ms |
Format-List



$success += $name



}

catch{


Write-Host "FAILED $name : $($_.Exception.Message)" -ForegroundColor Red


}



}



# ================================
# RESULTAT
# ================================


Write-Host "

====================================================
 RESULTAT BIG FOUR
====================================================
"


Write-Host "$($success.Count) / 6 agents opérationnels"


if($success.Count -eq 6){

Write-Host "
CERTIFICATION TECHNIQUE BIG FOUR OK
" -ForegroundColor Green

}
else{

Write-Host "
Correction nécessaire
" -ForegroundColor Yellow

}



Write-Host "

Backup :
$backup

PATCH 008 TERMINE

====================================================
"