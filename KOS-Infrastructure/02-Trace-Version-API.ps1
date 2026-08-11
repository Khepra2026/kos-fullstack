$ErrorActionPreference = "Continue"
$baseDir = if ($PSScriptRoot) { $PSScriptRoot } else { "C:\Users\essoc\kos-fullstack\KOS-Infrastructure" }
Set-Location $baseDir
$configPath = Join-Path $baseDir "00-Config.ps1"
if (Test-Path $configPath) {. $configPath }
if (-not $Global:KOSConfig.ApiBase) { $Global:KOSConfig.ApiBase = "https://api.khepraexperts.com" }
if (-not (Get-Command Write-KOSLog -ErrorAction SilentlyContinue)) {
    function Write-KOSLog { param([string]$Message); $ts=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; $line="[$ts] $Message"; Write-Host $line -ForegroundColor Cyan; try { $line | Out-File -Append -FilePath $Global:KOSConfig.LogPath -Encoding utf8 } catch {} }
}
Write-KOSLog "=== TRACE VERSION API ==="
Write-Host "API cible: $($Global:KOSConfig.ApiBase)" -ForegroundColor Yellow
try {
    $api = Invoke-RestMethod -Uri $Global:KOSConfig.ApiBase -TimeoutSec 15 -UseBasicParsing
    $api | ConvertTo-Json -Depth 5 | Write-Host -ForegroundColor DarkGray
    $result = [PSCustomObject]@{ Service=$api.service; Status=$api.status; Version=$api.version; Timestamp=Get-Date -Format "yyyy-MM-dd HH:mm:ss"; Result=if($api.version -match "6\.0"){"PASS"}else{"WARN - $($api.version)"} }
    $result | Format-List
    if ($api.version -match "FULL-CLONE|CLONE") { Write-Warning "FULL-CLONE detecte"; Write-KOSLog "[WARN] FULL-CLONE $($api.version)" } else { Write-Host " [PASS] Version propre: $($api.version)" -ForegroundColor Green; Write-KOSLog "[PASS] Version API: $($api.version)" }
    $result | ConvertTo-Json | Set-Content -Path (Join-Path $baseDir "logs\version-api-$(Get-Date -Format 'yyyyMMdd-HHmm').json") -Encoding utf8
} catch { Write-Host " [FAIL] $_" -ForegroundColor Red; Write-KOSLog "[FAIL] $_" }
