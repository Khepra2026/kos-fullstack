import requests
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
print(f"Token OK {tok[:20]}")

# Les 5 videos vides a supprimer
empty_ids = [
    "vSs53swh3Fc", # BCEAO KYC vide
    "rWxuwn3ZHv8", # COBAC AML vide
    "A4HWIc2EmaI", # SOC2 vide
    "2wysv2qlDAg", # PEP vide
    "MRi7YhGX4GA", # Togo vide
]

headers={"Authorization": f"Bearer {tok}"}
for vid in empty_ids:
    print(f"\n=== DELETE {vid} ===")
    resp = requests.delete(f"https://www.googleapis.com/youtube/v3/videos?id={vid}", headers=headers)
    print(f"Status: {resp.status_code} {resp.text[:200]}")
    if resp.status_code==204:
        print(f"✅ DELETED {vid}")
    else:
        print(f"❌ Fail {vid}")

print("\n✅ NETTOYAGE TERMINE - Chaine vide prete pour vrais contenus")
