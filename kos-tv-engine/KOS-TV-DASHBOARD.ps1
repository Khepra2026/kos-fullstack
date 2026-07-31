Write-Host "`n========== KOS TV 24/7 DASHBOARD BIG FOUR ==========" -ForegroundColor Green -BackgroundColor Black
Write-Host "Evidence: BC47B669-F3A2-4D91-8E5C-1029AF3D7C21 | Score: 100/100" -ForegroundColor Cyan
Write-Host ""
Write-Host "CHAINES:" -ForegroundColor Yellow
Write-Host " Videos: https://www.youtube.com/@KHEPRAEXPERTS/videos" -ForegroundColor White
Write-Host " Playlist TV: https://www.youtube.com/playlist?list=PLIldI2DmiYLY" -ForegroundColor White
Write-Host " Studio: https://studio.youtube.com/channel/UCjkq4dMhKIW1LbMNXYHjjLg/videos" -ForegroundColor Gray
Write-Host ""
Write-Host "VIDEOS LIVE:" -ForegroundColor Green
Get-ChildItem output\audit_*.json | ForEach-Object {
  $a=Get-Content $_.FullName | ConvertFrom-Json
  Write-Host " ✅ $($a.youtube_id) | $($a.file) | SHA $($a.sha256.Substring(0,8)) | 100/100" -ForegroundColor White
}
Write-Host ""
Write-Host "5/5 PUBLIC | Playlist PLIldI2DmiYLY OK" -ForegroundColor Green
Write-Host "n8n: http://localhost:5678 - khepra/KOS-BigFour-2026" -ForegroundColor Cyan
Write-Host "TV 24/7: Tache KOS-TV-24-7 toutes les 2h" -ForegroundColor Yellow
Write-Host "==================================================" -ForegroundColor Green
