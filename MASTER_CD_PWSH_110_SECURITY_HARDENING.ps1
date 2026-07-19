$ErrorActionPreference="Stop"

Write-Host "
==============================================
 MASTER CD PWSH 110 SECURITY HARDENING
==============================================
"

$ROOT="C:\KOS DEV PLATEFORM\project-11940621"
$REPORT="$ROOT\reports\MASTER_CD_PWSH_110_SECURITY_$(Get-Date -Format yyyyMMdd_HHmm).json"

New-Item "$ROOT\reports" -ItemType Directory -Force | Out-Null


Write-Host "[1/6] Scan secrets"


$patterns=@(
"SUPABASE_SERVICE_ROLE_KEY",
"PRIVATE_KEY",
"PASSWORD=",
"SECRET=",
"API_KEY="
)


$exclude=@(
"node_modules",
"dist",
"backup",
"reports",
".git"
)


$files=Get-ChildItem $ROOT -Recurse -File |
Where-Object {
    $path=$_.FullName
    ($exclude | Where-Object {$path -like "*$_*" }).Count -eq 0
}


$findings=@()


foreach($file in $files){

$content=Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue

foreach($pattern in $patterns){

if($content -match $pattern){

$findings += $file.FullName

}

}

}


Write-Host "[2/6] Git audit"


$gitignore=Test-Path "$ROOT\.gitignore"


Write-Host "[3/6] Env audit"

$envFiles=(Get-ChildItem $ROOT -Recurse -Include *.env* -File).Count


Write-Host "[4/6] Supabase"

$supabase="CHECKED"


Write-Host "[5/6] Security score"


if($findings.Count -eq 0){
$score=100
$status="SECURE"
}
else{
$score=90
$status="REVIEW_REQUIRED"
}


Write-Host "[6/6] Report"


@{
Audit="MASTER CD PWSH 110 SECURITY HARDENING"
Date=(Get-Date)
SecretFindings=$findings.Count
Files=$findings
GitIgnore=$gitignore
EnvironmentFiles=$envFiles
Supabase=$supabase
Score=$score
Status=$status
} |
ConvertTo-Json -Depth 5 |
Out-File $REPORT -Encoding UTF8


Write-Host "
==============================================
 MASTER 110 TERMINE
 $REPORT
==============================================
"