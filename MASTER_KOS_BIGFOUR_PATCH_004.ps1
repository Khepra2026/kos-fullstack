# ==============================================================
# KOS REGTECH AI
# BIG FOUR PATCH 004
# SAFE INSERT MIGRATION
# ==============================================================


$ErrorActionPreference="Stop"

$root="C:\KOS DEV PLATEFORM\project-11940621"

cd $root


$agents=@(
"aml",
"compliance",
"cybersec",
"risk",
"strategic-insight"
)


Write-Host ""
Write-Host "=== KOS BIG FOUR SAFE MIGRATION ===" -ForegroundColor Cyan


foreach($agent in $agents){


$file =
"supabase/functions/$agent/index.ts"


$content =
Get-Content $file -Raw



# 1. query_hash variable conservee
# mais mapping vers prompt_hash dans payload


$content =
$content.Replace(
"query_hash,",
"prompt_hash: query_hash,"
)


$content =
$content.Replace(
"query_hash: queryHash",
"prompt_hash: queryHash"
)



# 2. Ajouter les champs obligatoires uniquement
# dans les objets audit existants

$content =
$content.Replace(
"request_id,",
"request_id,
      user_id: org_id,
      model_version: 'KOS-RegTech-v1',
      response_hash: query_hash,
      sources: [],"
)



Set-Content `
-Path $file `
-Value $content `
-Encoding UTF8



Write-Host "PATCH OK : $agent" -ForegroundColor Green


}


Write-Host ""
Write-Host "=== VERIFICATION POST PATCH ===" -ForegroundColor Cyan


Get-ChildItem `
.\supabase\functions `
-Recurse `
-Include index.ts |
Select-String `
"query_hash|prompt_hash|response_hash|model_version"


Write-Host ""
Write-Host "FIN PATCH 004"