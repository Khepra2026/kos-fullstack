import requests, hashlib, time
from pathlib import Path
from datetime import datetime

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

files = [
    (Path("output/v3/kos_v3_01_BCEAO_KYC_2026.mp4"), "BCEAO KYC 2026 3 erreurs 2M$ VOIX FR KOS Big Four"),
    (Path("output/v3/kos_v3_02_COBAC_AML.mp4"), "COBAC AML 50M FCFA jour KOS 0.3s VOIX FR"),
    (Path("output/v3/kos_v3_03_SOC2_Type_II_VOIXFR.mp4"), "SOC2 Type II Big Four 25k vs KOS VOIX FR"),
    (Path("output/v3/kos_v3_04_PEP_Screening_UEMOA_VOIXFR.mp4"), "PEP Screening UEMOA 90pct bloquees KOS VOIX FR"),
    (Path("output/v3/kos_v3_05_RegTech_Togo_Hub_VOIXFR.mp4"), "Togo RegTech Hub Lome KOS VOIX FR"),
]

for f,title in files:
    if Path(f"output/v3/final_{f.stem}.json").exists():
        print(f"SKIP deja upload {f.name}")
        continue

    h=hashlib.sha256(f.read_bytes()).hexdigest()
    desc = f"KOS RegTech AI VOIX FR 100pct souveraine Piper TTS offline Detection 0.3s Audit SHA256 {h[:8]} BC47B669 Big Four 100 sur 100 Demo app.khepraexperts.com/pitch Evidence BC47B669"

    print(f"\n=== UPLOAD {f.name} {datetime.now()} ===")
    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    body={"snippet":{"title":title[:95],"description":desc,"tags":["BCEAO","KOS","RegTech"],"categoryId":"27"},"status":{"privacyStatus":"public","selfDeclaredMadeForKids":False}}

    init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)

    if init.status_code!=200:
        print(init.text[:400])
        if "uploadLimitExceeded" in init.text:
            print("QUOTA - on attend 6h")
            time.sleep(10)
            break
        continue

    url=init.headers["Location"]
    with open(f,"rb") as fd:
        up=requests.put(url, headers={"Authorization": f"Bearer {tok}","Content-Type":"video/mp4"}, data=fd)

    if up.status_code in [200,201]:
        vid=up.json()["id"]
        print(f"OK LIVE https://www.youtube.com/watch?v={vid}")
        Path(f"output/v3/final_{f.stem}.json").write_text(up.text, encoding="utf-8")
        # On s'arrete apres 1 upload pour ne pas re-trigger quota
        print("1 upload OK - stop pour eviter quota - relance dans 6h")
        break
    else:
        print(up.text[:400])
        break
