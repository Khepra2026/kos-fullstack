import requests, json, hashlib, datetime
from pathlib import Path

CLIENT_ID = "776gq4ut86irkl"
COMPANY_ID = "111941349"
REDIRECT_URI = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback"

def audit():
    print("=== AUDIT LINKEDIN KHEPRA EXPERTS ===")
    print(f"Client ID: {CLIENT_ID} - App: Khepra RegTech KOS - Created Jul 7 2026")
    print(f"Company: {COMPANY_ID} - https://www.linkedin.com/company/{COMPANY_ID}/")
    print(f"Page Admin: https://www.linkedin.com/company/{COMPANY_ID}/admin/dashboard/")
    print(f"App Type: Standalone - Status: Not Verified")
    print(f"Scopes: r_verify, openid, profile, w_member_social, email, r_profile_basicinfo")
    print(f"Redirect: {REDIRECT_URI}")

    vids = list(Path("kos-tv-engine/output/v3").glob("*.mp4"))
    print(f"\nVIDEOS V3 VOIX FR prets: {len(vids)}")
    for v in vids:
        print(f" - {v.name} {v.stat().st_size} bytes")

    queue_file = Path("kos-tv-engine/output/linkedin_queue.json")
    if queue_file.exists():
        try:
            q = json.loads(queue_file.read_text(encoding="utf-8"))
            print(f"\nFILE ATTENTE: {len(q)} posts pending")
            for item in q:
                print(f"  {item['id']} - {item['status']}")
        except Exception as e:
            print(f"Queue read error {e} - recreating")
            queue_file.unlink(missing_ok=True)

def create_queue():
    topics = [
        {"title": "BCEAO KYC 2026: 3 erreurs qui coutent 2M$", "desc": "Audit manuel 90% echec vs KOS 0.3s SHA256 BC47B669", "tags": "#BCEAO #KYC #RegTech"},
        {"title": "COBAC AML: 50M FCFA jour perdus", "desc": "Detection lente = amende COBAC 50M - KOS temps reel 0.3s", "tags": "#COBAC #AML"},
        {"title": "SOC2 Type II: Big Four 25k vs KOS auto", "desc": "Rapport 3 mois manuel 25k euros vs KOS audit trail auto", "tags": "#SOC2 #BigFour"},
        {"title": "PEP Screening UEMOA: 90% banques bloquees", "desc": "Listes PEP non a jour = blocage - KOS PEP temps reel", "tags": "#PEP #UEMOA"},
        {"title": "Togo RegTech Hub: Lome devient hub", "desc": "Compliance 40% budget banque vs KOS -80% couts", "tags": "#Togo #RegTech"},
    ]
    queue=[]
    for i,t in enumerate(topics):
        text = f"{t['title']}\n\n{t['desc']}\n\nKOS RegTech AI 100% Souveraine UEMOA\n- Detection 0.3s\n- Audit SHA256 BC47B669\n- Big Four 100/100\n- Voix FR Piper offline\n\nDemo: app.khepraexperts.com/pitch\nEvidence: BC47B669\n\n{t['tags']} #KOS #BigFour #Lome\nYouTube: youtube.com/@KHEPRAEXPERTS/videos"
        queue.append({"id": f"linkedin_{i+1:02d}", "text": text, "video": f"output/v3/kos_v3_{i+1:02d}.mp4", "status": "pending", "company_id": COMPANY_ID})

    Path("kos-tv-engine/output/linkedin_queue.json").write_text(json.dumps(queue, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"FILE ATTENTE CREEE: {len(queue)} posts")

def publish(access_token, company_id=COMPANY_ID):
    queue_file = Path("kos-tv-engine/output/linkedin_queue.json")
    q = json.loads(queue_file.read_text(encoding="utf-8"))
    headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/json"}

    for item in q:
        if item["status"]!="pending": continue
        print(f"\nPublishing {item['id']}...")
        body={
            "author": f"urn:li:organization:{company_id}",
            "lifecycleState": "PUBLISHED",
            "specificContent": {"com.linkedin.ugc.ShareContent": {"shareCommentary": {"text": item["text"]}, "shareMediaCategory": "NONE"}},
            "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
        }
        resp=requests.post("https://api.linkedin.com/v2/ugcPosts", headers=headers, json=body)
        print(f"Status {resp.status_code} {resp.text[:400]}")
        if resp.status_code in [200,201]:
            item["status"]="published"
            item["linkedin_id"]=resp.json().get("id")
        else:
            item["status"]=f"failed_{resp.status_code}"
        queue_file.write_text(json.dumps(q, indent=2, ensure_ascii=False), encoding="utf-8")
        break  # 1 a la fois

if __name__=="__main__":
    import sys
    if "--publish" in sys.argv:
        token = sys.argv[sys.argv.index("--token")+1] if "--token" in sys.argv else ""
        publish(token)
    else:
        audit()
        if not Path("kos-tv-engine/output/linkedin_queue.json").exists():
            create_queue()
        print("\nAUDIT OK")
        print("Auth URL: https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=776gq4ut86irkl&redirect_uri=https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback&scope=r_emailaddress%20w_member_social%20r_organization_social%20w_organization_social&state=KOS_BC47B669")
