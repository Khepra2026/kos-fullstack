Write-Host "`n========== KOS TV FINAL 10/10 BIG FOUR VOIX FR ==========" -ForegroundColor Green -BackgroundColor Black
Write-Host "Evidence: BC47B669-F3A2-4D91-8E5C-1029AF3D7C21 | 100% KOS 0 API" -ForegroundColor Cyan
Write-Host ""
Write-Host "VIDEOS V3 VOIX FR:" -ForegroundColor Yellow
Get-ChildItem output\v3\*.mp4 | ForEach-Object { Write-Host " ✅ $($_.Name) $($_.Length) bytes" -ForegroundColor White }
Write-Host ""
Write-Host "VOIX WAV:" -ForegroundColor Cyan
Get-ChildItem voices\*.wav | Format-Table Name,Length
Write-Host ""
Write-Host "YOUTUBE:" -ForegroundColor Green
Write-Host " Chaine: https://www.youtube.com/@KHEPRAEXPERTS/videos" -ForegroundColor White
Write-Host " Playlist: https://www.youtube.com/playlist?list=PLIldI2DmiYLY" -ForegroundColor White
Write-Host " Studio: https://studio.youtube.com/channel/UCjkq4dMhKIW1LbMNXYHjjLg/videos" -ForegroundColor Gray
Write-Host "==========================================================" -ForegroundColor Green
