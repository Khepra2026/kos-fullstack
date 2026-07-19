# =====================================================
# KOS BIG FOUR MASTER 105
# SUPABASE EDGE FUNCTIONS SCANNER
# =====================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root


Write-Host "SCAN EDGE FUNCTIONS" -ForegroundColor Cyan


$files=Get-ChildItem `
"supabase/functions" `
-Recurse `
-Filter "index.ts"


$result=@()


foreach($file in $files){

$content=Get-Content $file.FullName -Raw


# détection chaînes non fermées
$quotes=([regex]::Matches($content,'"')).Count


if($quotes % 2 -ne 0){

$result += @{
File=$file.FullName
Issue="Unclosed quote"
}

}


# détection try sans catch

if(
$content -match "try\s*\{" `
-and
$content -notmatch "catch"
){

$result += @{
File=$file.FullName
Issue="Missing catch"
}

}


}


$result |
ConvertTo-Json |
Out-File `
"C:\KOS-BIG4-AUTOMATION\reports\EDGE_SCAN_105.json"



$result