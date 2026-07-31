import requests, json, hashlib, datetime, time
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

for f in Path("output/v3").glob("*.mp4"):
    print(f"\n=== UPLOAD V3 VOIX {f.name} ===")
    file_hash=hashlib.sha256(f.read_bytes()).hexdigest()

    title=f"{f.stem.replace('_',' ')} - VOIX FR - KOS RegTech | Big Four 100/100"
    desc=f"""Version VOIX FR souveraine - 100% Piper TTS offline

KOS RegTech AI:
- Voix FR Piper 0 API externe
- Detection 0.3s
- SHA256 {file_hash[:8]} BC47B669
- Big Four 100/100

Demo: https://app.khepraexperts.com/pitch
Evidence: BC47B669-F3A2-4D91-8E5C-1029AF3D7C21

#BCEAO #RegTech #VoixFR #KOS #Togo
"""

    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    body={"snippet":{"title":title[:95],"description":desc,"tags":["BCEAO","KOS","VoixFR","RegTech"],"categoryId":"27"},"status":{"privacyStatus":"public","selfDeclaredMadeForKids":False}}

    init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)
    url=init.headers.get("Location")
    if not url: print(init.text[:300]); continue

    with open(f,"rb") as fd:
        up=requests.put(url, headers={"Authorization": f"Bearer {tok}","Content-Type":"video/mp4"}, data=fd)

    if up.status_code in [200,201]:
        print(f"✅ UPLOAD V3 OK https://www.youtube.com/watch?v={up.json()['id']}")
        Path(f"output/v3/uploaded_{f.stem}.json").write_text(up.text, encoding="utf-8")
    else:
        print(f"FAIL {up.text[:300]}")
    time.sleep(10)
