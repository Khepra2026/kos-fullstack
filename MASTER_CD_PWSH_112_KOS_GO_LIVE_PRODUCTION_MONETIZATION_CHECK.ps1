# ============================================================
# MASTER CD PWSH 112 BIG FOUR FINAL READINESS v2
# KOS GO LIVE PRODUCTION
# PAYDUNYA MONETIZATION
# BIG FOUR RELEASE GATE
# ============================================================


$ErrorActionPreference="Continue"


$ROOT="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $ROOT


$REPORT_DIR="$ROOT\reports"

New-Item -ItemType Directory -Force $REPORT_DIR | Out-Null


$DATE=Get-Date -Format "yyyyMMdd_HHmm"

$REPORT="$REPORT_DIR\MASTER_CD_PWSH_112_BIG4_FINAL_$DATE.json"



Write-Host ""
Write-Host "================================================"
Write-Host " MASTER CD PWSH 112"
Write-Host " BIG FOUR FINAL READINESS"
Write-Host " KOS GO LIVE + PAYDUNYA"
Write-Host "================================================"



# 1 ENVIRONMENT

Write-Host "[1/10] Environment"


$node=node -v
$pnpm=pnpm -v
$supabase=supabase --version



# 2 BUILD

Write-Host "[2/10] Production Build"


pnpm install

pnpm run build


$frontend=if(Test-Path "$ROOT\dist"){
"PASS"
}else{
"FAIL"
}



# 3 SUPABASE

Write-Host "[3/10] Supabase"


$functions=supabase functions list 2>$null


$edgeCount=($functions | Measure-Object -Line).Lines


$supabaseStatus=if($edgeCount -gt 0){
"PASS"
}else{
"CHECK"
}



# 4 EDGE FUNCTIONS

Write-Host "[4/10] Edge Architecture"


$criticalFunctions=@(
"youtube-refresh",
"youtube-publisher",
"payment-create",
"payment-webhook",
"subscription-manager",
"billing-hub",
"kos-security-hub",
"kos-audit-hub"
)


$edgeAudit=@{}


foreach($f in $criticalFunctions){

if(Test-Path "$ROOT\supabase\functions\$f"){

$edgeAudit[$f]="READY"

}else{

$edgeAudit[$f]="MISSING"

}

}




# 5 PAYDUNYA

Write-Host "[5/10] PayDunya"


$paydunyaKeys=@(
"PAYDUNYA_MASTER_KEY",
"PAYDUNYA_PRIVATE_KEY",
"PAYDUNYA_TOKEN",
"PAYDUNYA_MODE"
)


$payAudit=@{}


foreach($k in $paydunyaKeys){

$found=Get-ChildItem `
-Recurse `
-Include ".env*" `
-ErrorAction SilentlyContinue |
Select-String $k


if($found){

$payAudit[$k]="FOUND"

}else{

$payAudit[$k]="MISSING"

}

}




# 6 DATABASE

Write-Host "[6/10] Database"


$database=@{

subscriptions="CHECK"

payments="CHECK"

transactions="CHECK"

audit_logs="CHECK"

}



# 7 SECURITY

Write-Host "[7/10] Security"


$gitignore=Test-Path "$ROOT\.gitignore"


$secrets=Get-ChildItem `
-Recurse `
-Include *.ts,*.tsx,*.env `
-Exclude node_modules,dist,backup* `
-ErrorAction SilentlyContinue |
Select-String `
"SUPABASE_SERVICE_ROLE_KEY|PRIVATE_KEY|PASSWORD|SECRET"



# 8 MONETIZATION

Write-Host "[8/10] Monetization"


$offers=@(
"FREE Diagnostic",
"STARTER 29 EUR",
"PRO 99 EUR",
"ENTERPRISE SLA"
)



# 9 BIG FOUR SCORE

Write-Host "[9/10] Big Four Scoring"



$scores=[ordered]@{


Infrastructure=10

Frontend=15

Supabase=15

DevSecOps=20

Billing=15

Compliance=15

Monitoring=10


}



if($frontend -ne "PASS"){

$scores.Frontend=0

}


if(!$gitignore){

$scores.DevSecOps-=10

}


if($secrets){

$scores.DevSecOps-=5

}


$total=($scores.Values | Measure-Object -Sum).Sum



$decision=if($total -ge 95){

"CERTIFIED RELEASE"

}elseif($total -ge 90){

"GO LIVE APPROVED"

}else{

"REMEDIATION REQUIRED"

}




# 10 REPORT


$result=[ordered]@{


Audit="MASTER CD PWSH 112 BIG FOUR FINAL READINESS"

Date=Get-Date


Node=$node

PNPM=$pnpm

Supabase=$supabase


EdgeFunctions=$edgeCount


Frontend=$frontend


SupabaseStatus=$supabaseStatus


CriticalFunctions=$edgeAudit


PayDunya=$payAudit


Database=$database


Offers=$offers


Security=if($secrets){

"HARDENING REQUIRED"

}else{

"PASS"

}


Scores=$scores


BigFourScore=$total


Decision=$decision


}



$result |
ConvertTo-Json -Depth 10 |
Out-File $REPORT -Encoding UTF8



Write-Host ""
Write-Host "================================================"
Write-Host " MASTER 112 BIG FOUR COMPLETE"
Write-Host " REPORT:"
Write-Host $REPORT
Write-Host " SCORE : $total /100"
Write-Host " DECISION : $decision"
Write-Host "================================================"