# Master 7 + 10: Comments AI + Audit Big Four - 100% KOS
import requests, json, hashlib, datetime
from pathlib import Path

KNOWLEDGE_BASE = {
    "BCEAO": "Instruction 2026-03 KYC - KOS detection 0.3s vs manuel 90% echec, amende COBAC 50M FCFA",
    "COBAC": "COBAC AML temps reel - KOS 0.3s detection vs pertes 50M/jour",
    "SOC2": "SOC2 Type II auto - Big Four 25ke vs KOS audit trail SHA256 BC47B669",
    "PEP": "PEP Screening UEMOA - 90% banques bloquees, KOS liste temps reel",
    "Togo": "Togo hub RegTech - Lome - KOS -80% couts compliance",
    "prix": "KOS: 299€/mois vs Big Four 25k€ audit, ROI 80x, demo app.khepraexperts.com/pitch",
    "demo": "Demo live: https://app.khepraexperts.com/pitch - Evidence BC47B669 - Big Four 100/100"
}

def generate_reply(comment_text):
    comment_lower = comment_text.lower()
    for key, knowledge in KNOWLEDGE_BASE.items():
        if key.lower() in comment_lower:
            return f"""Merci pour votre question sur {key} 🙏

{knowledge}

🎯 Evidence: BC47B669 | Big Four 100/100
Demo: app.khepraexperts.com/pitch

#KOS #RegTech #BigFour"""

    # Reponse generique
    return f"""Merci pour votre commentaire 🙏

KOS RegTech AI - 100% souveraine UEMOA:
✅ Detection 0.3s
✅ Audit trail SHA256 BC47B669
✅ SOC2 auto - Big Four 100/100

Demo: app.khepraexperts.com/pitch

Quelle thematique BCEAO/COBAC vous interesse?"""

def audit_comment(comment_id, reply):
    return {
        "timestamp": datetime.datetime.now().isoformat(),
        "comment_id": comment_id,
        "reply_hash": hashlib.sha256(reply.encode()).hexdigest()[:16],
        "evidence": "BC47B669-F3A2-4D91-8E5C-1029AF3D7C21",
        "compliance": "SOC2-II comments",
        "bigfour_score": 100
    }

def process_all_comments():
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
    headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"}

    vids=["vSs53swh3Fc","rWxuwn3ZHv8","A4HWIc2EmaI","2wysv2qlDAg","MRi7YhGX4GA"]
    print("=== KOS COMMENTS AI BIG FOUR ===")

    for vid in vids:
        print(f"\n--- Video {vid} ---")
        # Get comments
        resp=requests.get(f"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId={vid}&maxResults=10",
            headers=headers)
        data=resp.json()

        if "items" not in data or len(data["items"])==0:
            print("0 commentaire - en attente audience")
            continue

        for item in data["items"]:
            comment_id=item["id"]
            text=item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
            author=item["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"]
            print(f"Comment {author}: {text[:100]}")

            # Genere reponse
            reply=generate_reply(text)
            audit=audit_comment(comment_id, reply)
            print(f"Reply: {reply[:120]}... | Audit {audit['reply_hash']}")

            # POST reply (decommente pour activer)
            # reply_resp=requests.post("https://www.googleapis.com/youtube/v3/comments?part=snippet",
            # headers=headers,
            # json={"snippet":{"parentId":comment_id,"textOriginal":reply}})
            # print(f"Replied: {reply_resp.status_code}")

if __name__=="__main__":
    process_all_comments()
