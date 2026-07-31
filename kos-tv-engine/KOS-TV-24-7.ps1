# Lance un Shorts toutes les 2h
while($true){
  python python/kos_engine.py
  python python/make_video_sovereign.py
  python python/youtube_upload_real.py
  Start-Sleep -Seconds 7200
}
