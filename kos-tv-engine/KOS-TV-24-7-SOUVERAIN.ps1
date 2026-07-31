cd C:\Users\essoc\Downloads\kos-fullstack\kos-tv-engine
while($true){
  Write-Host "=== KOS TV CYCLE $(Get-Date) ===" -ForegroundColor Green
  python python/kos_engine.py
  python python/make_video_sovereign.py
  python python/youtube_upload_real.py
  Write-Host "Sleep 2h" -ForegroundColor Cyan
  Start-Sleep -Seconds 7200
}
