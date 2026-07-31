import requests, json
from pathlib import Path

token = input("Colle ton TOKEN LinkedIn (AQV...): ").strip()
Path("scripts/linkedin/token.json").write_text(json.dumps({"access_token": token}, indent=2), encoding="utf-8")

# Test whoami
me = requests.get("https://api.linkedin.com/v2/me", headers={"Authorization": f"Bearer {token}"})
print(f"Me: {me.status_code} {me.text[:300]}")

# Publish queue
queue_file = Path("kos-tv-engine/output/linkedin_queue.json")
queue = json.loads(queue_file.read_text(encoding="utf-8"))

for item in queue:
    if item["status"] != "pending":
        continue
    print(f"\n=== PUBLISH {item['id']} ===")
    body={
        "author": "urn:li:organization:111941349",
        "lifecycleState": "PUBLISHED",
        "specificContent": {"com.linkedin.ugc.ShareContent": {"shareCommentary": {"text": item["text"]}, "shareMediaCategory": "NONE"}},
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    resp = requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
    print(f"{resp.status_code} {resp.text[:600]}")
    if resp.status_code in [200,201]:
        item["status"]="published"
        queue_file.write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
        print("PUBLIE SUR LINKEDIN KHEPRA EXPERTS 111941349")
    else:
        print("Echec - peut-etre scopes manquants, essaie w_member_social seulement")
        # Try as personal post
        body["author"] = f"urn:li:person:{me.json().get('id')}" if me.status_code==200 else "urn:li:person:me"
        resp2 = requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
        print(f"Retry personal: {resp2.status_code} {resp2.text[:600]}")
    break
