import requests, json
from pathlib import Path

# Token perso (w_member_social seulement) - genere via https://www.linkedin.com/developers/apps/776gq4ut86irkl/auth -> Token Generator -> coche w_member_social uniquement
token = Path("scripts/linkedin/token_raw.txt").read_text(encoding="utf-8").strip().split()[0]
print(f"Token len {len(token)}")

me = requests.get("https://api.linkedin.com/v2/me", headers={"Authorization": f"Bearer {token}"})
print(me.text[:500])
if me.status_code!=200:
    print("Token mort - regenere un nouveau")
    exit()

person_id = me.json()["id"]
queue = json.loads(Path("kos-tv-engine/output/linkedin_queue.json").read_text(encoding="utf-8"))

for item in queue:
    if item["status"]!="pending":
        continue
    # Publication perso qui mentionne la page entreprise
    text = item["text"] + "\n\n@Khepra Experts"
    body={
        "author": f"urn:li:person:{person_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {"com.linkedin.ugc.ShareContent": {"shareCommentary": {"text": text}, "shareMediaCategory": "NONE"}},
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    resp = requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
    print(f"{resp.status_code} {resp.text[:1000]}")
    if resp.status_code in [200,201]:
        item["status"]="published_personal"
        Path("kos-tv-engine/output/linkedin_queue.json").write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"PUBLIE PERSO - Visible sur ton profil + tag KHEPRA EXPERTS")
    break
