[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)]
    [string]$FunctionName,

    [Parameter(Mandatory=$false)]
    [switch]$NoVerify
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$LogDir = "./logs"
if (!(Test-Path $LogDir)) { New-Item -ItemType Directory -Path $LogDir | Out-Null }
$LogFile = "$LogDir/kos_edge_deploy_$(Get-Date -Format 'yyyyMMdd_HHmmss').log"

function Write-Log {
    param([string]$Message, [string]$Level = "INFO")
    $Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $LogEntry = "[$Timestamp] [$Level] $Message"
    Write-Host $LogEntry -ForegroundColor $(
        switch ($Level) {
            "ERROR" { "Red" }
            "WARN"  { "Yellow" }
            "SUCCESS" { "Green" }
            default { "Cyan" }
        }
    )
    Add-Content -Path $LogFile -Value $LogEntry
}

try {
    Write-Log "==================================================================" "INFO"
    Write-Log " Démarrage du déploiement de l'Edge Function : $FunctionName" "INFO"
    Write-Log "==================================================================" "INFO"

    if (-not (Get-Command "supabase" -ErrorAction SilentlyContinue)) {
        throw "La CLI Supabase n'est pas installée ou introuvable dans le PATH."
    }

    $functionPath = "./supabase/functions/$FunctionName"
    if (-not (Test-Path $functionPath)) {
        throw "Le dossier de la fonction est introuvable : $functionPath"
    }

    if ($NoVerify) {
        supabase functions deploy $FunctionName --no-verify-jwt
    } else {
        supabase functions deploy $FunctionName
    }

    Write-Log "DÉPLOIEMENT RÉUSSI : $FunctionName" "SUCCESS"
} catch {
    Write-Log "ÉCHEC : $_" "ERROR"
    exit 1
}
