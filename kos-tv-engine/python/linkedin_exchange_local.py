import requests, json
from pathlib import Path
from urllib.parse import parse_qs, urlparse

print("=== ECHANGE CODE LINKEDIN LOCAL ===")
callback_url = input("Colle l'URL de callback avec?code= : ").strip()

parsed = urlparse(callback_url)
code = parse_qs(parsed.query).get("code", [None])[0]
if not code:
    print("Pas de code")
    exit()

print(f"Code: {code[:30]}...")

secret = Path("scripts/linkedin/.env.linkedin.local").read_text(encoding="utf-8").split("CLIENT_SECRET="${LINKEDIN_CLIENT_SECRET}"\n")[0].strip()
print(f"Secret: {secret[:10]}...")

resp = requests.post("https://www.linkedin.com/oauth/v2/accessToken", data={
    "grant_type": "authorization_code",
    "code": code,
    "client_id": "776gq4ut86irkl",
    "client_secret": secret,
    "redirect_uri": "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback"
})

print(f"Status: {resp.status_code}")
print(resp.text[:1500])

if resp.status_code==200:
    data=resp.json()
    token=data["access_token"]
    Path("scripts/linkedin/token.json").write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"\nTOKEN OK {token[:40]}...")
    print("Sauve dans scripts/linkedin/token.json")

    # Publie 1 post test sur KHEPRA EXPERTS 111941349
    test = "KOS RegTech AI - Test publication auto - Voix FR Piper TTS offline - Detection 0.3s - Audit BC47B669 - Demo app.khepraexperts.com/pitch - KHEPRA EXPERTS TV"
    body={
        "author": "urn:li:organization:111941349",
        "lifecycleState": "PUBLISHED",
        "specificContent": {"com.linkedin.ugc.ShareContent": {"shareCommentary": {"text": test}, "shareMediaCategory": "NONE"}},
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
    pub=requests.post("https://api.linkedin.com/v2/ugcPosts", headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"}, json=body)
    print(f"PUBLISH: {pub.status_code} {pub.text[:600]}")
else:
    print("Echec - chaque code ne marche qu'UNE fois, regenere un nouveau lien")
