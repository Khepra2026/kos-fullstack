# ============================================================
# MASTER CD PWSH 114
# KOS PAYDUNYA EDGE FUNCTIONS DEPLOYMENT
# BILLING PRODUCTION ENGINE
# ============================================================

$ErrorActionPreference="Continue"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"
$REPORT_DIR="$ROOT\reports"

New-Item -ItemType Directory -Force $REPORT_DIR | Out-Null

Set-Location $ROOT

$DATE=Get-Date -Format "yyyyMMdd_HHmm"
$REPORT="$REPORT_DIR\MASTER_CD_PWSH_114_PAYDUNYA_EDGE_$DATE.json"


Write-Host ""
Write-Host "================================================"
Write-Host " MASTER CD PWSH 114"
Write-Host " PAYDUNYA EDGE BILLING DEPLOYMENT"
Write-Host " KOS MONETIZATION ENGINE"
Write-Host "================================================"



# ------------------------------------------------------------
# 1 CREATE FUNCTIONS
# ------------------------------------------------------------

Write-Host "[1/8] Checking Billing Functions"


$functions=@(
"payment-create",
"payment-webhook",
"subscription-manager",
"billing-hub",
"invoice-generator"
)


$creation=@{}


foreach($f in $functions){

$path="$ROOT\supabase\functions\$f"


if(!(Test-Path $path)){

Write-Host "Creating $f"

supabase functions new $f

$creation[$f]="CREATED"

}
else{

$creation[$f]="EXISTS"

}

}



# ------------------------------------------------------------
# 2 GENERATE INDEX FILES
# ------------------------------------------------------------


Write-Host "[2/8] Validate Edge Files"


$audit=@{}


foreach($f in $functions){

$file="$ROOT\supabase\functions\$f\index.ts"


if(Test-Path $file){

$audit[$f]="READY"

}
else{

$audit[$f]="ERROR"

}

}



# ------------------------------------------------------------
# 3 DEPLOY FUNCTIONS
# ------------------------------------------------------------


Write-Host "[3/8] Deploy Supabase Functions"


$deploy=@{}


foreach($f in $functions){

if($audit[$f] -eq "READY"){

supabase functions deploy $f

$deploy[$f]="DEPLOYED"

}
else{

$deploy[$f]="SKIPPED"

}

}



# ------------------------------------------------------------
# 4 VERIFY SECRETS
# ------------------------------------------------------------


Write-Host "[4/8] PayDunya Secrets"


$keys=@(
"PAYDUNYA_MASTER_KEY",
"PAYDUNYA_PRIVATE_KEY",
"PAYDUNYA_TOKEN",
"PAYDUNYA_MODE"
)


$secretAudit=@{}


foreach($k in $keys){

if(supabase secrets list | Select-String $k){

$secretAudit[$k]="OK"

}
else{

$secretAudit[$k]="MISSING"

}

}



# ------------------------------------------------------------
# 5 FRONTEND BUILD
# ------------------------------------------------------------


Write-Host "[5/8] Production Build"


pnpm install
pnpm run build


$frontend=

if(Test-Path "$ROOT\dist")
{
"PASS"
}
else
{
"FAIL"
}



# ------------------------------------------------------------
# 6 BILLING MODEL
# ------------------------------------------------------------


Write-Host "[6/8] SaaS Packages"


$packages=@(
"FREE",
"STARTER",
"PRO",
"ENTERPRISE"
)



# ------------------------------------------------------------
# 7 SCORE
# ------------------------------------------------------------


Write-Host "[7/8] Big Four Score"


$score=0


if($frontend -eq "PASS"){
$score+=20
}


if($deploy.Values -notcontains "SKIPPED"){
$score+=30
}


if($secretAudit.Values -notcontains "MISSING"){
$score+=20
}


if($audit.Values -notcontains "ERROR"){
$score+=20
}


$score+=10



# ------------------------------------------------------------
# 8 REPORT
# ------------------------------------------------------------


Write-Host "[8/8] Report"


$result=[ordered]@{

Audit="MASTER CD PWSH 114 PAYDUNYA EDGE DEPLOYMENT"

Date=(Get-Date)

FunctionsCreated=$creation

FunctionsAudit=$audit

Deployment=$deploy

PayDunya=$secretAudit

Frontend=$frontend

Packages=$packages

BigFourScore=$score

Decision=
if($score -ge 90)
{
"BILLING PRODUCTION READY"
}
else
{
"REVIEW REQUIRED"
}

}


$result |
ConvertTo-Json -Depth 8 |
Out-File $REPORT -Encoding UTF8



Write-Host ""
Write-Host "================================================"
Write-Host " MASTER 114 COMPLETE"
Write-Host $REPORT
Write-Host " SCORE : $score /100"
Write-Host "================================================"