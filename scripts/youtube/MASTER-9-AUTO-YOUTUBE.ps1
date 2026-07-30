# MASTER-9-AUTO-YOUTUBE.ps1 - Content Factory -> YouTube Shorts Auto
$envFile = ".\scripts\youtube\.env.youtube.local"
if (Test-Path $envFile) { Get-Content $envFile | ForEach-Object { if ($_ -match "=") { $k,$v = $_ -split "=",2; Set-Item -Path Env:$k -Value $v } } }

# 1. Refresh token
$body = @{ client_id=$env:YOUTUBE_CLIENT_ID; client_secret=$env:YOUTUBE_CLIENT_SECRET; refresh_token=$env:YOUTUBE_REFRESH_TOKEN; grant_type="refresh_token" }
$tok = Invoke-RestMethod -Uri "https://oauth2.googleapis.com/token" -Method Post -Body $body
Write-Host "✅ YouTube Token OK - Expire $($tok.expires_in)s" -ForegroundColor Green

# 2. Test channel info
$headers = @{ Authorization = "Bearer $($tok.access_token)" }
$channel = Invoke-RestMethod -Uri "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true" -Headers $headers
Write-Host "✅ Chaine: $($channel.items[0].snippet.title)" -ForegroundColor Cyan

# 3. Cree tache planifiee upload auto 19h
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-File C:\Users\essoc\Downloads\kos-fullstack\scripts\content-factory\MASTER-7-CONTENT-FACTORY.ps1; C:\Users\essoc\Downloads\kos-fullstack\scripts\youtube\MASTER-9-YOUTUBE-UPLOADER.ps1"
$trigger = New-ScheduledTaskTrigger -Daily -At 19:00
Register-ScheduledTask -TaskName "KOS-Youtube-Auto" -Action $action -Trigger $trigger -Description "Upload auto YouTube Shorts 19h" -Force | Out-Null

Write-Host "`n=== KOS YOUTUBE AUTO DEPLOYE ===" -ForegroundColor Green -BackgroundColor Black
Write-Host "Tache: KOS-Youtube-Auto 19h quotidienne" -ForegroundColor Cyan
Write-Host "Content Factory -> LinkedIn 8h -> YouTube 19h" -ForegroundColor Cyan
