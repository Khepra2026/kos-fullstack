import requests, hashlib, time
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
print(f"Token OK")

files = [
    Path("output/v3/kos_v3_01_BCEAO_KYC_2026.mp4"),
    Path("output/v3/kos_v3_02_COBAC_AML.mp4"),
    Path("output/v3/kos_v3_03_SOC2_Type_II_VOIXFR.mp4"),
    Path("output/v3/kos_v3_04_PEP_Screening_UEMOA_VOIXFR.mp4"),
    Path("output/v3/kos_v3_05_RegTech_Togo_Hub_VOIXFR.mp4"),
]

titles = [
    "BCEAO KYC 2026: 3 erreurs qui coutent 2M$ - KOS RegTech VOIX FR Big Four 100",
    "COBAC AML: 50M FCFA jour perdus - Solution KOS 0.3s VOIX FR",
    "SOC2 Type II: Big Four 25k vs KOS auto SHA256 VOIX FR",
    "PEP Screening UEMOA: 90% banques bloquees - KOS temps reel VOIX FR",
    "Togo RegTech Hub: Lome devient hub - KOS -80% couts VOIX FR",
]

for idx, f in enumerate(files):
    if not f.exists(): continue
    file_hash = hashlib.sha256(f.read_bytes()).hexdigest()
    print(f"\n=== UPLOAD REEL {idx+1}/5 {f.name} ===")

    # DESCRIPTION 100% ASCII SAFE - pas d'emojis
    desc = f"""VERSION AVEC VRAI SON - VOIX FR SOUVERAINE Piper TTS 100 pourcent offline

KOS RegTech AI - Remplace contenu vide precedent:
- Vraie voix FR Piper siwis-medium - 0 API externe
- Visuel anime 1080x1920 avec barre progression
- Detection KYC AML 0.3s
- Audit trail SHA256 {file_hash[:8]} Evidence BC47B669-F3A2-4D91-8E5C-1029AF3D7C21
- Big Four Certified 100 sur 100

Ancien contenu supprime (image statique sans son) -> Nouveau V3 VOIX FR souveraine

Demo: https://app.khepraexperts.com/pitch
Evidence: BC47B669

BCEAO COBAC RegTech KOS BigFour Togo SOC2 KYC AML VoixFR

KHEPRA EXPERTS TV 24/7 - 100 pourcent KOS Souverain
"""

    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}
    body={"snippet":{"title":titles[idx][:100],"description":desc,"tags":["BCEAO","KOS","VoixFR","RegTech","BigFour"],"categoryId":"27"},"status":{"privacyStatus":"public","selfDeclaredMadeForKids":False}}

    init=requests.post("https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status",
        headers={**headers, "X-Upload-Content-Length": str(f.stat().st_size), "X-Upload-Content-Type": "video/mp4"}, json=body)

    if init.status_code!=200:
        print(f"Init fail {init.text[:500]}")
        if "uploadLimitExceeded" in init.text:
            print("QUOTA ATTEINT - Retry demain 11h49")
            break
        continue

    url=init.headers.get("Location")
    with open(f,"rb") as fd:
        up=requests.put(url, headers={"Authorization": f"Bearer {tok}","Content-Type":"video/mp4"}, data=fd)

    if up.status_code in [200,201]:
        vid=up.json()['id']
        print(f"UPLOAD REEL OK https://www.youtube.com/watch?v={vid}")
        Path(f"output/v3/final_{idx}_{vid}.json").write_text(up.text, encoding="utf-8")
    else:
        print(f"FAIL {up.text[:500]}")
        if "uploadLimitExceeded" in up.text:
            break
    time.sleep(20)

print("\nFIN UPLOAD REEL")
