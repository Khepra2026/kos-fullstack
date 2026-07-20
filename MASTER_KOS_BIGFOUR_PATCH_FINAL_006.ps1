# ==========================================================
# KOS REGTECH AI
# BIG FOUR FINAL PATCH + VALIDATION 006
# ==========================================================

Write-Host "`n====================================================`n KOS BIG FOUR FINAL PATCH 006`n====================================================`n" -ForegroundColor Cyan

$Project="C:\KOS DEV PLATEFORM\project-11940621"
Set-Location $Project

# ----------------------------------------------------------
# CONFIG SUPABASE
# ----------------------------------------------------------
$supabaseUrl="https://pgfwhahiwqvqeahpirjx.supabase.co"

Write-Host "[1] Chargement clé Supabase" -ForegroundColor Yellow

if([string]::IsNullOrWhiteSpace($env:SUPABASE_ANON_KEY))
{
    Write-Host "`nDéfinir SUPABASE_ANON_KEY avant exécution`n" -ForegroundColor Red
    exit
}

$headers=@{
    "apikey" = $env:SUPABASE_ANON_KEY.Trim()
    "Authorization" = "Bearer $($env:SUPABASE_ANON_KEY.Trim())"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

# ----------------------------------------------------------
# BACKUP FINAL
# ----------------------------------------------------------
$backup="backup_BIGFOUR_FINAL_$(Get-Date -Format yyyyMMdd_HHmmss)"
New-Item $backup -ItemType Directory | Out-Null

$agents=@(
    "strategic-insight",
    "data-protection",
    "compliance",
    "cybersec",
    "aml",
    "risk"
)

foreach($a in $agents)
{
    Copy-Item ".\supabase\functions\$a" "$backup\$a" -Recurse -Force
    Write-Host "Backup OK : $a" -ForegroundColor Green
}

# ----------------------------------------------------------
# DEPLOY FINAL
# ----------------------------------------------------------
Write-Host "`n[2] DEPLOY EDGE FUNCTIONS`n" -ForegroundColor Yellow

foreach($a in $agents)
{
    Write-Host "Deploy $a" -ForegroundColor Cyan
    supabase functions deploy $a
    if($LASTEXITCODE -ne 0) {
        Write-Host "ERREUR deploy $a" -ForegroundColor Red
    }
}

# ----------------------------------------------------------
# TEST AGENTS
# ----------------------------------------------------------
Write-Host "`n[3] TEST AGENTS BIG FOUR`n" -ForegroundColor Yellow

$tests=@(
    @{name="strategic-insight";query="strategie"},
    @{name="data-protection";query="RGPD"},
    @{name="compliance";query="KYC"},
    @{name="cybersec";query="continuité"},
    @{name="aml";query="soupçon"},
    @{name="risk";query="Tier"}
)

foreach($t in $tests)
{
    Write-Host "`n--- $($t.name) ---" -ForegroundColor Yellow
    $body=@{
        query=$t.query
        org_id="khepra-production"
    } | ConvertTo-Json

    try {
        $r = Invoke-RestMethod -Uri "$supabaseUrl/functions/v1/$($t.name)" -Headers $headers -Method POST -Body $body -ErrorAction Stop
        $r | Select-Object agent,cobac_compliant,bigfour_standard,iso_compliant,response_time_ms,request_id
    }
    catch {
        Write-Host "ERREUR $($t.name) : $($_.Exception.Message)" -ForegroundColor Red
    }
    Start-Sleep -Seconds 2
}

# ----------------------------------------------------------
# AUDIT LOG
# ----------------------------------------------------------
Write-Host "`n[4] VERIFICATION AUDIT LOG`n" -ForegroundColor Yellow

try {
    $audit = Invoke-RestMethod -Uri "$supabaseUrl/rest/v1/kos_audit_log?order=ts.desc&limit=50" -Headers $headers -ErrorAction Stop

    $bigfour = $audit | Where-Object {
        $_.agent_name -in @("Strategic_Insight","Data_Protection","Compliance","CyberSec","AML","Risk")
    }

    if($bigfour.Count -gt 0) {
        $bigfour | Format-Table agent_name,bigfour_standard,cobac_compliant,iso_compliant,response_time_ms,ts
    } else {
        Write-Host "Aucun log Big Four trouvé dans kos_audit_log" -ForegroundColor Yellow
    }

    $count = ($bigfour | Select-Object agent_name -Unique).Count

    Write-Host "`nRESULTAT FINAL : $count / 6 agents Big Four`n" -ForegroundColor Cyan

    if($count -eq 6) {
        Write-Host "`n✅ KOS BIG FOUR CERTIFICATION TECHNIQUE OK`n" -ForegroundColor Green
    } else {
        Write-Host "`n⚠ Correction restante : vérifier RLS sur kos_audit_log ou logs Edge Functions`n" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "ERREUR AUDIT : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Vérifie que la clé anon a les droits SELECT sur kos_audit_log via RLS" -ForegroundColor Yellow
}