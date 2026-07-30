import os, json, requests
from pathlib import Path

# Load env
env_path = Path("../scripts/youtube/.env.youtube.local")
env = {}
for line in env_path.read_text().splitlines():
    if "=" in line:
        k,v = line.split("=",1)
        env[k]=v

CLIENT_ID = env["YOUTUBE_CLIENT_ID"]
CLIENT_SECRET = env["YOUTUBE_CLIENT_SECRET"]
REFRESH_TOKEN = env["YOUTUBE_REFRESH_TOKEN"]

# Refresh
resp = requests.post("https://oauth2.googleapis.com/token", data={
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    "refresh_token": REFRESH_TOKEN,
    "grant_type": "refresh_token"
})
token = resp.json()["access_token"]
print(f"✅ Token OK {token[:20]}...")

# Upload video
video_path = Path("output/kos_shorts_bceao_001.mp4")
if not video_path.exists():
    print("❌ Video pas trouvee - genere d'abord")
    exit()

# Metadata Big Four
title = "BCEAO KYC 2026: 3 erreurs qui coutent 2M$ - KOS RegTech [Shorts]"
description = """🚨 BCEAO Instruction 2026-03 KYC

3 erreurs critiques qui coutent 2M$ aux banques UEMOA:

❌ 1. Audit manuel - 90% echec, 50M FCFA amende COBAC
❌ 2. Pas d'audit trail immutable
❌ 3. Detection KYC/AML lente

✅ SOLUTION KOS RegTech AI:
- Detection KYC/AML 0.3s
- Audit trail SHA256 immutable BC47B669
- Rapport SOC2 Type II auto
- Big Four Certified 100/100

🎯 Demo live: https://app.khepraexperts.com/pitch
📊 Audit report: app.khepraexperts.com/pitch

#BCEAO #COBAC #KYC #AML #RegTech #UEMOA #Compliance #FinTech #Togo #KOS #BigFour #SOC2

Chaine KHEPRA EXPERTS - RegTech AI souveraine UEMOA
"""
tags = ["BCEAO","KYC","RegTech","COBAC","UEMOA","KOS","Compliance","Togo","BigFour"]

# Init upload
headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
body = {
    "snippet": {"title": title, "description": description, "tags": tags, "categoryId": "27"},
    "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": False} # PRIVATE pour test
}

init = requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
    headers={**headers, "X-Upload-Content-Length": str(video_path.stat().st_size), "X-Upload-Content-Type": "video/mp4"},
    json=body)

upload_url = init.headers.get("Location")
print(f"Upload URL: {upload_url[:60]}...")

# Upload bytes
with open(video_path, "rb") as f:
    upload = requests.put(upload_url, headers={"Authorization": f"Bearer {token}", "Content-Type": "video/mp4"}, data=f)

print(upload.text[:500])
if upload.status_code in [200,201]:
    vid = upload.json()
    print(f"\n🎉 UPLOAD OK! Video ID: {vid['id']}")
    print(f"https://www.youtube.com/watch?v={vid['id']}")
    print(f"https://studio.youtube.com/video/{vid['id']}/edit")
    Path("output/last_upload.json").write_text(json.dumps(vid, indent=2))
else:
    print(f"❌ Upload fail {upload.status_code}")
