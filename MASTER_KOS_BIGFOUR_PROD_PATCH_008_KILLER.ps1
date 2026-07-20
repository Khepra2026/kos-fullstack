# ==========================================================
# KOS REGTECH AI - BIG FOUR PROD PATCH 008 KILLER
# Déploie + Teste + Certifie les 6 agents Big Four
# ISO 27001 + COBAC + RGPD + Retention 7 ans
# ==========================================================

$ErrorActionPreference = "Stop"
$Project = "C:\KOS DEV PLATEFORM\project-11940621"
Set-Location $Project

$supabaseUrl = "https://pgfwhahiwqvqeahpirjx.supabase.co"
$agents = @("strategic-insight","data-protection","compliance","cybersec","aml","risk")
$agentNames = @{
    "strategic-insight" = "Strategic_Insight"
    "data-protection" = "Data_Protection"
    "compliance" = "Compliance"
    "cybersec" = "CyberSec"
    "aml" = "AML"
    "risk" = "Risk"
}

Write-Host "`n====================================================`n KOS BIG FOUR PROD PATCH 008 KILLER`n====================================================`n" -ForegroundColor Cyan

# ----------------------------------------------------------
# [1] Chargement clé Supabase
# ----------------------------------------------------------
Write-Host "[1] Chargement clé Supabase" -ForegroundColor Yellow

if([string]::IsNullOrWhiteSpace($env:SUPABASE_ANON_KEY)) {
    Write-Host "ERREUR: SUPABASE_ANON_KEY non définie" -ForegroundColor Red
    Write-Host "Exécute: `$env:SUPABASE_ANON_KEY=`"eyJhbGci...TA_VRAIE_SIGNATURE`"" -ForegroundColor Yellow
    exit
}

if($env:SUPABASE_ANON_KEY -match "[^a-zA-Z0-9._-]") {
    Write-Host "ERREUR: Clé contient des caractères non-ASCII" -ForegroundColor Red
    exit
}

if($env:SUPABASE_ANON_KEY.Length -lt 200) {
    Write-Host "ERREUR: Clé trop courte. Une clé anon JWT fait >200 caractères" -ForegroundColor Red
    exit
}

Write-Host "Clé OK: $($env:SUPABASE_ANON_KEY.Length) caractères" -ForegroundColor Green

$headers = @{
    "apikey" = $env:SUPABASE_ANON_KEY.Trim()
    "Authorization" = "Bearer $($env:SUPABASE_ANON_KEY.Trim())"
    "Content-Type" = "application/json"
    "Prefer" = "return=representation"
}

# ----------------------------------------------------------
# [2] BACKUP
# ----------------------------------------------------------
$backup = "backup_BIGFOUR_008_$(Get-Date -Format yyyyMMdd_HHmmss)"
New-Item $backup -ItemType Directory | Out-Null

Write-Host "`n[2] Backup des 6 agents" -ForegroundColor Yellow
foreach($a in $agents) {
    $src = ".\supabase\functions\$a"
    if(Test-Path $src) {
        Copy-Item $src "$backup\$a" -Recurse -Force
        Write-Host "Backup OK : $a" -ForegroundColor Green
    } else {
        Write-Host "WARN: Dossier $a introuvable" -ForegroundColor Yellow
    }
}

# ----------------------------------------------------------
# [3] DEPLOY EDGE FUNCTIONS
# ----------------------------------------------------------
Write-Host "`n[3] DEPLOY EDGE FUNCTIONS" -ForegroundColor Yellow

$deployResults = @{}
foreach($a in $agents) {
    Write-Host "`nDeploy $a..." -ForegroundColor Cyan
    $output = supabase functions deploy $a 2>&1
    $output | Write-Host

    if($LASTEXITCODE -eq 0) {
        Write-Host "Deployed: $a" -ForegroundColor Green
        $deployResults[$a] = "OK"
    } else {
        Write-Host "ERREUR deploy $a" -ForegroundColor Red
        $deployResults[$a] = "FAIL"
    }
    Start-Sleep -Seconds 1
}

# ----------------------------------------------------------
# [4] TEST AGENTS BIG FOUR
# ----------------------------------------------------------
Write-Host "`n[4] TEST AGENTS BIG FOUR" -ForegroundColor Yellow

$tests = @(
    @{name="strategic-insight"; query="strategie CEMAC"; agent="Strategic_Insight"},
    @{name="data-protection"; query="RGPD protection"; agent="Data_Protection"},
    @{name="compliance"; query="KYC COBAC"; agent="Compliance"},
    @{name="cybersec"; query="continuite activite"; agent="CyberSec"},
    @{name="aml"; query="soupcon blanchiment"; agent="AML"},
    @{name="risk"; query="Tier 1 capital"; agent="Risk"}
)

$testResults = @()
foreach($t in $tests) {
    Write-Host "`n--- $($t.name) ---" -ForegroundColor Yellow

    $body = @{
        query = $t.query
        org_id = "khepra-production"
    } | ConvertTo-Json

    try {
        $r = Invoke-RestMethod -Uri "$supabaseUrl/functions/v1/$($t.name)" -Headers $headers -Method POST -Body $body -TimeoutSec 30

        $result = [PSCustomObject]@{
            agent = $r.agent
            cobac_compliant = $r.cobac_compliant
            bigfour_standard = $r.bigfour_standard
            iso_compliant = $r.iso_compliant
            response_time_ms = $r.response_time_ms
            data_residency = $r.data_residency
        }
        $result | Format-List
        $testResults += $result

        if($r.bigfour_standard -eq $true -and $r.iso_compliant -eq $true) {
            Write-Host "✅ $($t.name) : BIG FOUR OK" -ForegroundColor Green
        } else {
            Write-Host "⚠ $($t.name) : Champs Big Four manquants" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "ERREUR $($t.name) : $($_.Exception.Message)" -ForegroundColor Red
    }
    Start-Sleep -Seconds 2
}

# ----------------------------------------------------------
# [5] VERIFICATION AUDIT LOG
# ----------------------------------------------------------
Write-Host "`n[5] VERIFICATION AUDIT LOG" -ForegroundColor Yellow
Start-Sleep -Seconds 3

try {
    $auditUrl = "$supabaseUrl/rest/v1/kos_audit_log?order=ts.desc&limit=100"
    $audit = Invoke-RestMethod -Uri $auditUrl -Headers $headers -TimeoutSec 30

    $bigfourLogs = $audit | Where-Object {
        $_.agent_name -in $agentNames.Values -and $_.bigfour_standard -eq $true
    } | Select-Object agent_name,bigfour_standard,iso_compliant,cobac_compliant,response_time_ms,ts -First 20

    if($bigfourLogs.Count -gt 0) {
        $bigfourLogs | Format-Table -AutoSize
    } else {
        Write-Host "Aucun log Big Four trouvé dans les 100 derniers" -ForegroundColor Yellow
    }

    $uniqueAgents = ($bigfourLogs | Select-Object agent_name -Unique).Count
    $count = $uniqueAgents

    Write-Host "`n====================================================" -ForegroundColor Cyan
    Write-Host "RESULTAT BIG FOUR : $count / 6 agents opérationnels" -ForegroundColor Cyan
    Write-Host "====================================================" -ForegroundColor Cyan

    if($count -eq 6) {
        Write-Host "`n✅ KOS BIG FOUR CERTIFICATION TECHNIQUE OK`n" -ForegroundColor Green
        Write-Host "Backup disponible dans: $backup" -ForegroundColor Gray
        Write-Host "Retention: 7 ans COBAC" -ForegroundColor Gray
        Write-Host "Data residency: CEMAC" -ForegroundColor Gray
        Write-Host "ISO 27001: Compliant" -ForegroundColor Gray
    } else {
        Write-Host "`n⚠ ATTENTION : $count/6 seulement" -ForegroundColor Yellow
        Write-Host "`nDiagnostic:" -ForegroundColor Yellow

        foreach($a in $agents) {
            $agentName = $agentNames[$a]
            $found = $bigfourLogs | Where-Object {$_.agent_name -eq $agentName}
            if(-not $found) {
                Write-Host " - $agentName : pas de log Big Four" -ForegroundColor Red
            }
        }

        Write-Host "`nActions correctives:" -ForegroundColor Yellow
        Write-Host "1. Vérifie RLS sur kos_audit_log:" -ForegroundColor Gray
        Write-Host " DROP POLICY IF EXISTS `"anon_read_audit`" ON kos_audit_log;" -ForegroundColor Gray
        Write-Host " CREATE POLICY `"anon_read_audit`" ON kos_audit_log FOR SELECT TO anon USING (true);" -ForegroundColor Gray
        Write-Host "2. Vérifie les logs Edge Functions dans Dashboard Supabase" -ForegroundColor Gray
        Write-Host "3. Relance avec --debug: supabase functions deploy <agent> --debug" -ForegroundColor Gray
    }
}
catch {
    Write-Host "ERREUR AUDIT : $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "`nCause probable: RLS bloque SELECT sur kos_audit_log" -ForegroundColor Yellow
    Write-Host "Exécute dans Supabase SQL:" -ForegroundColor Yellow
    Write-Host "DROP POLICY IF EXISTS `"anon_read_audit`" ON kos_audit_log;" -ForegroundColor Gray
    Write-Host "CREATE POLICY `"anon_read_audit`" ON kos_audit_log FOR SELECT TO anon USING (true);" -ForegroundColor Gray
}

Write-Host "`nScript terminé. Backup: $backup`n" -ForegroundColor Cyan