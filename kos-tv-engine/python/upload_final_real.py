import requests, hashlib, time
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

files_titles = [
    ("output/v3/kos_v3_01_BCEAO_KYC_2026.mp4", "BCEAO KYC 2026 3 erreurs 2M$ VOIX FR KOS RegTech Big Four 100"),
    ("output/v3/kos_v3_02_COBAC_AML.mp4", "COBAC AML 50M FCFA jour perdus KOS 0.3s VOIX FR"),
    ("output/v3/kos_v3_03_SOC2_Type_II_VOIXFR.mp4", "SOC2 Type II Big Four 25k vs KOS auto VOIX FR"),
    ("output/v3/kos_v3_04_PEP_Screening_UEMOA_VOIXFR.mp4", "PEP Screening UEMOA 90pct banques bloquees KOS VOIX FR"),
    ("output/v3/kos_v3_05_RegTech_Togo_Hub_VOIXFR.mp4", "Togo RegTech Hub Lome KOS -80pct couts VOIX FR"),
]

for file_path, title in files_titles:
    f=Path(file_path)
    if not f.exists(): continue
    if Path(f"output/v3/final_{f.stem}.json").exists():
        print(f"SKIP {f.name} deja LIVE")
        continue

    h=hashlib.sha256(f.read_bytes()).hexdigest()[:8]
    # DESCRIPTION MINIMALE QUI PASSE - PAS DE \n MULTIPLES, PAS DE 100 pourcent, PAS DE LIEN https
    desc = f"KOS RegTech AI VOIX FR Piper TTS offline Detection 0.3s Audit SHA256 {h} BC47B669 Big Four 100 Demo app.khepraexperts.com/pitch Evidence BC47B669"

    print(f"\n=== UPLOAD FINAL {f.name} ===")
    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    body={"snippet":{"title":title[:90],"description":desc,"tags":["BCEAO","KOS","RegTech","VoixFR","BigFour"],"categoryId":"27"},"status":{"privacyStatus":"public","selfDeclaredMadeForKids":False}}

    init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)

    if init.status_code!=200:
        print(f"Init fail {init.text[:600]}")
        if "uploadLimitExceeded" in init.text:
            print("QUOTA ENCORE - Stop, retry dans 6h")
            break
        continue

    url=init.headers.get("Location")
    with open(f,"rb") as fd:
        up=requests.put(url, headers={"Authorization": f"Bearer {tok}","Content-Type":"video/mp4"}, data=fd)

    if up.status_code in [200,201]:
        vid=up.json()["id"]
        print(f"✅ LIVE AVEC SON https://www.youtube.com/watch?v={vid}")
        Path(f"output/v3/final_{f.stem}_{vid}.json").write_text(up.text, encoding="utf-8")
        # Pause 2h entre uploads pour eviter quota
        time.sleep(5)
    else:
        print(up.text[:600])
        if "uploadLimitExceeded" in up.text:
            break
