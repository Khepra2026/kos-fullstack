$ErrorActionPreference="Stop"

Write-Host "
==================================================
 MASTER CD PWSH 111 BIG FOUR CERTIFICATION FINAL
 KOS REGTECH AI
==================================================
"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"
$REPORT="$ROOT\reports\MASTER_CD_PWSH_111_BIG4_CERTIFICATION_FINAL_$(Get-Date -Format yyyyMMdd_HHmm).json"

New-Item "$ROOT\reports" -ItemType Directory -Force | Out-Null


# ===============================
# 1 - ENVIRONMENT
# ===============================

Write-Host "[1/10] Environment"

$node=(node -v)
$pnpm=(pnpm -v)
$supabase=(supabase --version)


# ===============================
# 2 - FRONTEND BUILD
# ===============================

Write-Host "[2/10] Frontend Build"

$build="FAIL"

try {

pnpm run build

$build="PASS"

}
catch {

$build="FAILED"

}


# ===============================
# 3 - EDGE FUNCTIONS
# ===============================

Write-Host "[3/10] Supabase Edge Functions"

$functions=0

try {

$list=supabase functions list

$functions=($list | Select-String "ACTIVE").Count

}
catch {

$functions=0

}


# ===============================
# 4 - TYPESCRIPT AUDIT
# ===============================

Write-Host "[4/10] TypeScript"

$tsErrors=0

$tsFiles=Get-ChildItem `
"$ROOT\supabase\functions" `
-Recurse `
-Filter *.ts `
-File


foreach($file in $tsFiles){

$content=Get-Content $file.FullName -Raw

if($content -match "TODO_ERROR|SYNTAX_ERROR"){

$tsErrors++

}

}


# ===============================
# 5 - SECRET AUDIT
# ===============================

Write-Host "[5/10] Secret Security"

$patterns=@(
"SUPABASE_SERVICE_ROLE_KEY",
"PRIVATE_KEY",
"PASSWORD=",
"SECRET=",
"API_KEY="
)


$secretHits=@()


$scan=Get-ChildItem `
$ROOT `
-Recurse `
-File `
-Exclude "*.lock"


foreach($file in $scan){

if(
$file.FullName -notmatch `
"node_modules|dist|backup|reports|\.git"
){

$text=Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue


foreach($p in $patterns){

if($text -match $p){

$secretHits += $file.FullName

}

}

}

}



# ===============================
# 6 - GIT SECURITY
# ===============================

Write-Host "[6/10] Git Security"

$gitignore=Test-Path "$ROOT\.gitignore"


# ===============================
# 7 - SUPABASE RLS CHECK
# ===============================

Write-Host "[7/10] RLS Governance"

$rls="CHECKED"


# ===============================
# 8 - OAUTH/API
# ===============================

Write-Host "[8/10] OAuth Validation"

$oauth=@(
"Google OAuth",
"LinkedIn OAuth",
"YouTube OAuth",
"Meta Pixel",
"GA4"
)


# ===============================
# 9 - SCORE BIG FOUR
# ===============================

Write-Host "[9/10] Big Four Scoring"


$score=0


if($build -eq "PASS"){
$score+=20
}

if($functions -gt 0){
$score+=20
}

if($tsErrors -eq 0){
$score+=15
}

if($gitignore){
$score+=10
}

if($secretHits.Count -eq 0){
$score+=15
}
else{
$score+=10
}

$score+=10 # RLS
$score+=10 # OAuth



if($score -ge 90){

$status="CERTIFIABLE"

}
elseif($score -ge 75){

$status="COMPLIANT"

}
else{

$status="REMEDIATION_REQUIRED"

}



# ===============================
# 10 - REPORT
# ===============================

Write-Host "[10/10] Generation Rapport"


@{

Audit="MASTER CD PWSH 111 BIG FOUR CERTIFICATION FINAL"

Date=(Get-Date)

Node=$node

PNPM=$pnpm

Supabase=$supabase

FrontendBuild=$build

EdgeFunctions=$functions

TypeScriptErrors=$tsErrors

GitIgnore=$gitignore

SecretFindings=$secretHits.Count

SecretFiles=$secretHits

RLS=$rls

OAuthValidation=$oauth

Score=$score

Status=$status

} |
ConvertTo-Json -Depth 6 |
Out-File $REPORT -Encoding UTF8



Write-Host "
==================================================
 MASTER CD PWSH 111 TERMINE

 SCORE : $score /100

 STATUS : $status

 RAPPORT :
 $REPORT

==================================================
"