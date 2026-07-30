# MASTER-9-YOUTUBE-UPLOADER.ps1 - Upload auto depuis content-factory
param([string]$VideoPath, [string]$Title, [string]$Description)

$EnvFile = ".\scripts\youtube\.env.youtube.local"
Get-Content $EnvFile | ForEach-Object { if ($_ -match "=") { $k,$v = $_ -split "=",2; Set-Item -Path Env:$k -Value $v } }

# Refresh token si besoin
$tokenBody = @{
    client_id = $env:YOUTUBE_CLIENT_ID
    client_secret = $env:YOUTUBE_CLIENT_SECRET
    refresh_token = $env:YOUTUBE_REFRESH_TOKEN
    grant_type = "refresh_token"
}
$newToken = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $tokenBody
$accessToken = $newToken.access_token

Write-Host "✅ Token refresh OK" -ForegroundColor Green

# Si pas de video fournie, cree une video texte auto (test)
if (-not $VideoPath) {
    $Title = "BCEAO KYC 2026: 3 changements qui coutent 2M - KOS RegTech"
    $Description = @"
🚨 BCEAO KYC 2026

3 points cles:
✅ Audit trail immutable Big Four
✅ Detection KYC/AML 0.3s
✅ Rapport SOC2 auto

Demo: app.khepraexperts.com/pitch
#RegTech #BCEAO #KOS #Compliance #Togo
"@
    Write-Host "Mode TEST - Pas de video, creation metadata seule" -ForegroundColor Yellow
    Write-Host "Titre: $Title"
    # Pour vrai upload, utilise ffmpeg pour generer Shorts depuis ton script video
}

# Upload (exemple)
Write-Host "`n=== YOUTUBE UPLOAD PRET ===" -ForegroundColor Green
Write-Host "Channel: KHEPRA-KOS"
Write-Host "Refresh Token: $($env:YOUTUBE_REFRESH_TOKEN.Substring(0,20))... securise"
