# ======================================================
# KOS BIG FOUR MASTER 106
# EDGE FUNCTION TEMPLATE COMPARISON
# ======================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root


$agents=@(
"cfo-agent",
"marketing-agent",
"procurement-agent",
"project-manager",
"qa-tester",
"risk-analyzer"
)


foreach($agent in $agents){

Write-Host ""
Write-Host "===== $agent =====" -ForegroundColor Cyan


Write-Host "--- ACTUEL ---"

Get-Content `
"supabase/functions/$agent/index.ts" |
Select-Object -Skip 15 -First 15


Write-Host "--- BACKUP ---"

if(Test-Path "backup_20260719_1421/supabase/functions/$agent/index.ts"){

Get-Content `
"backup_20260719_1421/supabase/functions/$agent/index.ts" |
Select-Object -Skip 15 -First 15

}
else{

Write-Host "Pas de backup trouvé"

}

}# ======================================================
# KOS BIG FOUR MASTER 106
# EDGE FUNCTION TEMPLATE COMPARISON
# ======================================================

$root="C:\KOS DEV PLATEFORM\project-11940621"

Set-Location $root


$agents=@(
"cfo-agent",
"marketing-agent",
"procurement-agent",
"project-manager",
"qa-tester",
"risk-analyzer"
)


foreach($agent in $agents){

Write-Host ""
Write-Host "===== $agent =====" -ForegroundColor Cyan


Write-Host "--- ACTUEL ---"

Get-Content `
"supabase/functions/$agent/index.ts" |
Select-Object -Skip 15 -First 15


Write-Host "--- BACKUP ---"

if(Test-Path "backup_20260719_1421/supabase/functions/$agent/index.ts"){

Get-Content `
"backup_20260719_1421/supabase/functions/$agent/index.ts" |
Select-Object -Skip 15 -First 15

}
else{

Write-Host "Pas de backup trouvé"

}

}