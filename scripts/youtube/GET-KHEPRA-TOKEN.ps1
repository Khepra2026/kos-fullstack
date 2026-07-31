$ClientId = "851512578726-r168hjb2u6dova74cap3t0n88cfmlkbs.apps.googleusercontent.com"
$RedirectUri = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-youtube-master/callback"
$Scope = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube"
$AuthUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id=$ClientId&redirect_uri=$RedirectUri&response_type=code&scope=$([Uri]::EscapeDataString($Scope))&access_type=offline&prompt=consent"

Write-Host "=== KHEPRA-KOS YOUTUBE AUTH ===" -ForegroundColor Green -BackgroundColor Black
Write-Host $AuthUrl -ForegroundColor Cyan
Start-Process $AuthUrl

Write-Host "`n1. Autorise avec essochamanu@gmail.com" -ForegroundColor Yellow
Write-Host "2. Tu seras redirige vers supabase callback qui affiche ton token" -ForegroundColor Yellow
Write-Host "3. Copie le refresh_token" -ForegroundColor Yellow
