import requests, json, time
from pathlib import Path

env={}
for l in Path("../scripts/youtube/.env.youtube.local").read_text().splitlines():
  if "=" in l:
    k,v=l.split("=",1)
    env[k]=v

r=requests.post('https://oauth2.googleapis.com/token', data={
  'client_id':env['YOUTUBE_CLIENT_ID'],
  'client_secret':env['YOUTUBE_CLIENT_SECRET'],
  'refresh_token':env['YOUTUBE_REFRESH_TOKEN'],
  'grant_type':'refresh_token'
})
tok=r.json()['access_token']
print(f"Token OK {tok[:20]}...")

batch=json.loads(Path("output/batch.json").read_text())

# Load playlist id si existe
pl_id=None
if Path("output/playlist.json").exists():
  try:
    pl_id=json.loads(Path("output/playlist.json").read_text())['id']
  except:
    pl_id=None

for item in batch:
  f=Path(item['file'])
  topic=item['topic']
  if not f.exists(): continue

  title=f"{topic['title']}: {topic['subtitle']} - KOS RegTech [Shorts]"
  desc=f"""🚨 {topic['title']} - {topic['subtitle']}

❌ Probleme: {topic['problem']}
✅ Solution: {topic['solution']}

KOS RegTech AI:
- Detection 0.3s
- Audit trail SHA256 BC47B669
- SOC2 Type II auto
- Big Four 100/100

Demo: https://app.khepraexperts.com/pitch
#BCEAO #RegTech #KOS #UEMOA #Togo #{topic['title'].replace(' ','')}

KHEPRA EXPERTS TV 24/7
"""
  print(f"\n=== UPLOAD {f.name} ===")
  print(f"Titre: {title}")

  headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
  body={
    "snippet": {"title": title, "description": desc, "tags": ["BCEAO","KOS","RegTech",topic['title']], "categoryId": "27"},
    "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": False}
  }

  init=requests.post('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"},
    json=body)

  upload_url=init.headers.get("Location")
  if not upload_url:
    print(f"Init fail {init.text[:300]}")
    continue

  with open(f, "rb") as fd:
    up=requests.put(upload_url, headers={"Authorization": f"Bearer {tok}", "Content-Type": "video/mp4"}, data=fd)

  if up.status_code in [200,201]:
    vid=up.json()['id']
    print(f"🎉 UPLOAD OK ID={vid} https://www.youtube.com/watch?v={vid}")
    # Ajoute a playlist
    if pl_id:
      requests.post('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
        headers=headers,
        json={'snippet':{'playlistId':pl_id,'resourceId':{'kind':'youtube#video','videoId':vid}}})
    Path(f"output/uploaded_{f.stem}.json").write_text(up.text)
  else:
    print(f"FAIL {up.status_code} {up.text[:300]}")

  time.sleep(5) # evite quota

print("\n✅ QUEUE UPLOAD TERMINEE")
