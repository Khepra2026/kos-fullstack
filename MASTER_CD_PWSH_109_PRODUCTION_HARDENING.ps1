# ============================================================
# MASTER CD PWSH 109
# KOS REGTECH AI - PRODUCTION HARDENING
# BIG FOUR DEVSECOPS
# ============================================================

$ErrorActionPreference="Continue"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"

$REPORT_DIR="$ROOT\reports"

$DATE=Get-Date -Format "yyyyMMdd_HHmm"

$REPORT="$REPORT_DIR\MASTER_CD_PWSH_109_HARDENING_$DATE.json"


Write-Host "=============================================="
Write-Host " MASTER CD PWSH 109 PRODUCTION HARDENING"
Write-Host "=============================================="


New-Item `
-ItemType Directory `
-Force `
$REPORT_DIR | Out-Null



# ------------------------------------------------------------
# 1 ENVIRONMENT CHECK
# ------------------------------------------------------------

Write-Host "[1/8] Environment"


$NODE_VERSION=node -v
$PNPM_VERSION=pnpm -v
$SUPABASE_VERSION=supabase --version



# ------------------------------------------------------------
# 2 GIT SECURITY
# ------------------------------------------------------------

Write-Host "[2/8] Git Security"


$gitignore=Test-Path "$ROOT\.gitignore"

$envFiles=Get-ChildItem `
$ROOT `
-Filter ".env*" `
-Recurse `
-ErrorAction SilentlyContinue



# ------------------------------------------------------------
# 3 SECRET EXPOSURE
# ------------------------------------------------------------

Write-Host "[3/8] Secret Detection"


$patterns=@(
"SUPABASE_SERVICE_ROLE_KEY",
"PRIVATE_KEY",
"SECRET",
"PASSWORD",
"AIza"
)


$secretHits=@()


foreach($pattern in $patterns){

$result=Select-String `
-Path "$ROOT\**\*" `
-Pattern $pattern `
-ErrorAction SilentlyContinue


if($result){

$secretHits += $pattern

}

}



# ------------------------------------------------------------
# 4 SUPABASE EDGE
# ------------------------------------------------------------

Write-Host "[4/8] Edge Functions"


$edges=Get-ChildItem `
"$ROOT\supabase\functions" `
-Directory


$edgeCount=$edges.Count



# ------------------------------------------------------------
# 5 FRONTEND SECURITY
# ------------------------------------------------------------

Write-Host "[5/8] Frontend"


$package=Test-Path "$ROOT\package.json"

$dist=Test-Path "$ROOT\dist"



# ------------------------------------------------------------
# 6 BUILD TEST
# ------------------------------------------------------------

Write-Host "[6/8] Production Build"


pnpm run build


if($LASTEXITCODE -eq 0){

$build="PASS"

}
else{

$build="FAILED"

}



# ------------------------------------------------------------
# 7 SCORE
# ------------------------------------------------------------

$score=100


if(!$gitignore){
$score-=10
}


if($secretHits.Count -gt 0){
$score-=15
}


if($build -ne "PASS"){
$score-=20
}


$status=

if($score -ge 90){
"PRODUCTION READY"
}
elseif($score -ge 75){
"HARDENING REQUIRED"
}
else{
"CRITICAL"
}



# ------------------------------------------------------------
# 8 REPORT
# ------------------------------------------------------------


$data=@{

Audit="MASTER CD PWSH 109 PRODUCTION HARDENING"

Date=(Get-Date).ToString()

Score=$score

Status=$status

Node=$NODE_VERSION

PNPM=$PNPM_VERSION

Supabase=$SUPABASE_VERSION

GitIgnore=$gitignore

EnvironmentFiles=$envFiles.Count

SecretFindings=$secretHits

EdgeFunctions=$edgeCount

Build=$build

}


$data |
ConvertTo-Json -Depth 8 |
Out-File $REPORT -Encoding UTF8


Write-Host ""
Write-Host "=============================================="
Write-Host " MASTER 109 TERMINE"
Write-Host $REPORT
Write-Host "=============================================="