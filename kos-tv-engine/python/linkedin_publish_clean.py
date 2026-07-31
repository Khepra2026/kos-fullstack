import requests, json
from pathlib import Path

token = Path("scripts/linkedin/token_raw.txt").read_text(encoding="utf-8").strip().split()[0] # prend 1er mot
print(f"Token lu: {token[:30]}... len={len(token)}")

if len(token) < 100:
    print("Token trop court - recolle le vrai token dans scripts/linkedin/token_raw.txt")
    exit()

# Sauve propre
Path("scripts/linkedin/token.json").write_text(json.dumps({"access_token": token}, indent=2), encoding="utf-8")

# Test
me = requests.get("https://api.linkedin.com/v2/me", headers={"Authorization": f"Bearer {token}"})
print(f"Me API: {me.status_code}")
if me.status_code==200:
    print(me.text[:400])
    person_id = me.json().get("id")
else:
    print(me.text[:600])
    print("Token invalide - regenere via https://www.linkedin.com/developers/apps/776gq4ut86irkl/auth")
    exit()

# Publish 1er post de la file
queue_file = Path("kos-tv-engine/output/linkedin_queue.json")
queue = json.loads(queue_file.read_text(encoding="utf-8"))

for item in queue:
    if item["status"]!= "pending":
        continue

    # Try company post d'abord
    print(f"\nPublish {item['id']} as COMPANY 111941349...")
    body={
        "author": "urn:li:organization:111941349",
        "lifecycleState": "PUBLISHED",
        "specificContent": {"com.linkedin.ugc.ShareContent": {"shareCommentary": {"text": item["text"]}, "shareMediaCategory": "NONE"}},
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    resp = requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
    print(f"Company post: {resp.status_code} {resp.text[:800]}")

    if resp.status_code not in [200,201]:
        # Fallback personal
        print("Fallback personal post...")
        body["author"] = f"urn:li:person:{person_id}"
        resp = requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
        print(f"Personal post: {resp.status_code} {resp.text[:800]}")

    if resp.status_code in [200,201]:
        item["status"]="published"
        item["linkedin_id"]=resp.json().get("id")
        queue_file.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
        print(f"✅ PUBLIE: {item['linkedin_id']}")
        print(f"URL: https://www.linkedin.com/feed/update/{item['linkedin_id']}")
    break
