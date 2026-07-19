# ============================================================
# MASTER CD PWSH 108
# KOS REGTECH AI - BIG FOUR CERTIFICATION
# ============================================================

$ErrorActionPreference="Continue"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"

$REPORT_DIR="$ROOT\reports"

$DATE=Get-Date -Format "yyyyMMdd_HHmm"

$REPORT="$REPORT_DIR\MASTER_CD_PWSH_108_BIG4_CERTIFICATION_$DATE.json"


Write-Host "============================================"
Write-Host " MASTER CD PWSH 108 BIG FOUR CERTIFICATION "
Write-Host "============================================"


# ------------------------------------------------------------
# 1 REPORT DIRECTORY
# ------------------------------------------------------------

New-Item `
-ItemType Directory `
-Force `
$REPORT_DIR | Out-Null



# ------------------------------------------------------------
# 2 TYPESCRIPT EDGE AUDIT
# ------------------------------------------------------------

Write-Host "[1/8] Audit TypeScript Edge Functions"


$functions=Get-ChildItem `
"$ROOT\supabase\functions" `
-Filter index.ts `
-Recurse


$TS_ERRORS=@()


foreach($f in $functions){

$result=npx tsc `
--noEmit `
--allowJs false `
$f.FullName `
2>&1


if($LASTEXITCODE -ne 0){

$TS_ERRORS += @{
file=$f.FullName
error=$result
}

}

}



# ------------------------------------------------------------
# 3 SECRET SCAN
# ------------------------------------------------------------

Write-Host "[2/8] Scan secrets"


$secretPatterns=@(
"service_role",
"SUPABASE_SERVICE_ROLE_KEY",
"AIza",
"PRIVATE_KEY",
"PASSWORD"
)


$SECRET_FINDINGS=@()


foreach($p in $secretPatterns){

$scan=Select-String `
-Path "$ROOT\supabase\functions\**\*.ts" `
-Pattern $p `
-ErrorAction SilentlyContinue


if($scan){

$SECRET_FINDINGS += $p

}

}



# ------------------------------------------------------------
# 4 SUPABASE FUNCTIONS
# ------------------------------------------------------------

Write-Host "[3/8] Supabase Functions"

try {

$SUPABASE_FUNCTIONS=supabase functions list

$SUPABASE_STATUS="PASS"

}

catch {

$SUPABASE_STATUS="WARNING"

}



# ------------------------------------------------------------
# 5 FRONTEND BUILD
# ------------------------------------------------------------

Write-Host "[4/8] Vite Production Build"


pnpm run build


if($LASTEXITCODE -eq 0){

$BUILD="PASS"

}

else {

$BUILD="FAILED"

}



# ------------------------------------------------------------
# 6 DATABASE CONFIG
# ------------------------------------------------------------

Write-Host "[5/8] Database"


$dbFiles=Get-ChildItem `
"$ROOT\supabase" `
-Recurse `
-Include *.sql


$DATABASE_FILES=$dbFiles.Count



# ------------------------------------------------------------
# 7 SCORE BIG FOUR
# ------------------------------------------------------------


$score=100


if($TS_ERRORS.Count -gt 0){
$score-=20
}


if($SECRET_FINDINGS.Count -gt 0){
$score-=10
}


if($BUILD -ne "PASS"){
$score-=20
}



# ------------------------------------------------------------
# 8 JSON REPORT
# ------------------------------------------------------------


$REPORT_DATA=@{

Audit="MASTER CD PWSH 108 BIG FOUR CERTIFICATION"

Date=(Get-Date).ToString()

Score=$score

Frontend=$BUILD

EdgeFunctions=$functions.Count

TypeScriptErrors=$TS_ERRORS.Count

SecretFindings=$SECRET_FINDINGS

DatabaseFiles=$DATABASE_FILES

Supabase=$SUPABASE_STATUS

Certification=(
if($score -ge 90){
"BIG FOUR READY"
}
elseif($score -ge 75){
"REVIEW REQUIRED"
}
else{
"NOT CERTIFIABLE"
}
)

}


$REPORT_DATA |
ConvertTo-Json -Depth 8 |
Out-File `
$REPORT `
-Encoding UTF8



Write-Host ""
Write-Host "============================================"
Write-Host " MASTER 108 TERMINE"
Write-Host " RAPPORT:"
Write-Host $REPORT
Write-Host "============================================"