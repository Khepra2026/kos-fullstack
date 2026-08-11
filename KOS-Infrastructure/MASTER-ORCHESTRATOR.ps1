$ErrorActionPreference = "Continue"
$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = "C:\Users\essoc\KOS-Infrastructure" }
Set-Location $baseDir
. (Join-Path $baseDir "00-Config.ps1")

Write-Host "=== KOS BIG FOUR FULL AUDIT ===" -ForegroundColor Cyan

function Invoke-AuditScript {
    param([Parameter(Mandatory)][string]$ScriptName)
    $scriptPath = Join-Path $baseDir $ScriptName
    if (Test-Path $scriptPath) {
        Write-Host "`n[EXECUTION] Lancement de $ScriptName..." -ForegroundColor Yellow
        & $scriptPath
    } else {
        Write-Host " [WARN] Script introuvable : $ScriptName" -ForegroundColor Red
    }
}

Invoke-AuditScript "01-Healthcheck-Domains.ps1"
Invoke-AuditScript "03-Notification-Quality-Gate.ps1"
Invoke-AuditScript "05-Social-Content-Hygiene.ps1"

Write-Host "`nAudit global termine avec succes." -ForegroundColor Green
