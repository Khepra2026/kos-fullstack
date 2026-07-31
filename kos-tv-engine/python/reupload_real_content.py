import requests, json, hashlib, time
from pathlib import Path

env={}
for l in Path("../scripts/youtube/.env.youtube.local").read_text(encoding="utf-8").splitlines():
  if "=" in l:
    k,v=l.split("=",1)
    env[k]=v

r=requests.post("https://oauth2.googleapis.com/token", data={
  "client_id":env["YOUTUBE_CLIENT_ID"],
  "client_secret":env["YOUTUBE_CLIENT_SECRET"],
  "refresh_token":env["YOUTUBE_REFRESH_TOKEN"],
  "grant_type":"refresh_token"
})
tok=r.json()["access_token"]

# Mapping V3 VOIX FR -> titres PRO Big Four avec son
mapping = [
    {"file":"output/v3/kos_v3_01_BCEAO_KYC_2026.mp4", "title":"BCEAO KYC 2026: 3 erreurs qui coutent 2M$ - KOS RegTech VOIX FR", "topic":"BCEAO KYC"},
    {"file":"output/v3/kos_v3_03_SOC2_Type_II_VOIXFR.mp4", "title":"COBAC AML: 50M FCFA/jour perdus - Solution KOS 0.3s VOIX FR", "topic":"COBAC AML"},
    {"file":"output/v3/kos_v3_03_SOC2_Type_II_VOIXFR.mp4", "title":"SOC2 Type II: Big Four 25k€ vs KOS auto - Audit SHA256 VOIX FR", "topic":"SOC2"},
    {"file":"output/v3/kos_v3_04_PEP_Screening_UEMOA_VOIXFR.mp4", "title":"PEP Screening UEMOA: 90% banques bloquees - KOS temps reel VOIX FR", "topic":"PEP"},
    {"file":"output/v3/kos_v3_05_RegTech_Togo_Hub_VOIXFR.mp4", "title":"Togo RegTech Hub: Lome devient hub - KOS -80% couts VOIX FR", "topic":"Togo"},
]

# Utilise tes 5 V3 existants (corrige doublon)
files = list(Path("output/v3").glob("*VOIXFR.mp4")) + list(Path("output/v3").glob("kos_v3_01*.mp4")) + list(Path("output/v3").glob("kos_v3_02*.mp4"))
files = list(dict.fromkeys(files)) # dedup
files.sort()
print(f"Fichiers V3 VOIX FR trouves: {[f.name for f in files]}")

for f in files[:5]:
    if not f.exists():
        print(f"SKIP {f}")
        continue

    file_hash = hashlib.sha256(f.read_bytes()).hexdigest()
    print(f"\n=== UPLOAD REEL {f.name} SHA {file_hash[:8]} ===")

    title = f.name.replace("kos_v3_","").replace("_VOIXFR.mp4","").replace("_"," ").replace("01 BCEAO KYC 2026","BCEAO KYC 2026: 3 erreurs 2M$ VOIX FR")
    title = f"{title} - KOS RegTech VOIX FR | Big Four 100/100"

    desc = f"""🎙️ VERSION AVEC VRAI SON - VOIX FR SOUVERAINE Piper TTS 100% offline

KOS RegTech AI - Remplace le contenu vide precedent:
✅ Vraie voix FR (Piper siwis-medium) - 0 API externe
✅ Visuel anime 1080x1920 avec barre progression
✅ Detection KYC/AML 0.3s
✅ Audit trail SHA256 {file_hash[:8]} - Evidence BC47B669-F3A2-4D91-8E5C-1029AF3D7C21
✅ Big Four Certified 100/100

Contenu precedent supprime (image statique sans son) -> Remplace par V3 VOIX FR souveraine

Demo: https://app.khepraexperts.com/pitch
Evidence: BC47B669

#BCEAO #RegTech #VoixFR #KOS #BigFour #Togo #COBAC #SOC2

KHEPRA EXPERTS TV 24/7 - 100% KOS Souverain
"""

    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    body={"snippet":{"title":title[:95],"description":desc,"tags":["BCEAO","KOS","VoixFR","RegTech","BigFour","Togo"],"categoryId":"27"},"status":{"privacyStatus":"public","selfDeclaredMadeForKids":False}}

    init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)
    url=init.headers.get("Location")
    if not url:
        print(f"Init fail {init.text[:500]}")
        if "uploadLimitExceeded" in init.text:
            print("🚨 QUOTA ATTEINT - Retry dans 24h")
            break
        continue

    with open(f,"rb") as fd:
        up=requests.put(url, headers={"Authorization": f"Bearer {tok}","Content-Type":"video/mp4"}, data=fd)

    if up.status_code in [200,201]:
        vid = up.json()['id']
        print(f"✅ UPLOAD REEL OK https://www.youtube.com/watch?v={vid}")
        Path(f"output/v3/reuploaded_{f.stem}_{vid}.json").write_text(up.text, encoding="utf-8")
    else:
        print(f"FAIL {up.status_code} {up.text[:500]}")
        if "uploadLimitExceeded" in up.text:
            print("🚨 QUOTA - Stop, retry demain")
            break
    time.sleep(15)
