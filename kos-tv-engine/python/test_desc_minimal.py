import requests
from pathlib import Path

env={}
for l in Path("../scripts/youtube/.env.youtube.local").read_text(encoding="utf-8").splitlines():
  if "=" in l: k,v=l.split("=",1); env[k]=v

r=requests.post("https://oauth2.googleapis.com/token", data={
  "client_id":env["YOUTUBE_CLIENT_ID"],
  "client_secret":env["YOUTUBE_CLIENT_SECRET"],
  "refresh_token":env["YOUTUBE_REFRESH_TOKEN"],
  "grant_type":"refresh_token"
})
tok=r.json()["access_token"]

f=Path("output/v3/kos_v3_01_BCEAO_KYC_2026.mp4")
headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
# DESCRIPTION MINIMALE VALIDE - 1 ligne, ASCII, <500 chars
desc = "KOS RegTech AI Voix FR Piper TTS Detection 0.3s Audit BC47B669 Big Four Demo app.khepraexperts.com"

body={"snippet":{"title":"BCEAO KYC 2026 VOIX FR KOS RegTech TEST","description":desc,"tags":["BCEAO"],"categoryId":"27"},"status":{"privacyStatus":"private","selfDeclaredMadeForKids":False}}

init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)

print(init.status_code)
print(init.text[:1000])
