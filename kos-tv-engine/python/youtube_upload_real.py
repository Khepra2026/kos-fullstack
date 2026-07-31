import os
import sys
import json
import google.auth.transport.requests
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

# Fix youtube_upload_real.py - version stable KOS
VIDEO_PATH = sys.argv[sys.argv.index("--video")+1] if "--video" in sys.argv else "output/kos_shorts_bceao_001.mp4"
TITLE = sys.argv[sys.argv.index("--title")+1] if "--title" in sys.argv else "BCEAO 2026-03 KYC - 3 erreurs qui coutent 2M$ | KOS"
TAGS = sys.argv[sys.argv.index("--tags")+1].split(",") if "--tags" in sys.argv else ["BCEAO","KOS","KYC"]

TOKEN_PATH = "scripts/youtube/token.json"

print(f"=== KOS YOUTUBE UPLOAD ===")
print(f"Video: {VIDEO_PATH}")
print(f"Title: {TITLE}")

if not os.path.exists(VIDEO_PATH):
    print(f"❌ Video not found: {VIDEO_PATH}")
    sys.exit(1)

if not os.path.exists(TOKEN_PATH):
    print(f"❌ Token not found: {TOKEN_PATH}")
    sys.exit(1)

with open(TOKEN_PATH, "r") as f:
    token_data = json.load(f)

creds = Credentials.from_authorized_user_info(token_data, ["https://www.googleapis.com/auth/youtube.upload"])
# Refresh if needed
if creds.expired and creds.refresh_token:
    print("Refreshing token...")
    request = google.auth.transport.requests.Request()
    creds.refresh(request)
    with open(TOKEN_PATH, "w") as f:
        f.write(creds.to_json())

youtube = build("youtube", "v3", credentials=creds)

body = {
    "snippet": {
        "title": TITLE[:100],
        "description": f"{TITLE}\n\nKOS BCEAO Instruction 2026-03 KYC en 0.3s, SHA256 BC47B669\nDemo: app.khepraexperts.com/pitch\n\n#BCEAO #KOS #KYCauditUEMOA",
        "tags": TAGS,
        "categoryId": "27"
    },
    "status": {
        "privacyStatus": "public",
        "selfDeclaredMadeForKids": False
    }
}

media = MediaFileUpload(VIDEO_PATH, chunksize=-1, resumable=True, mimetype="video/mp4")

print("Uploading...")
request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

response = None
while response is None:
    status, response = request.next_chunk()
    if status:
        print(f"Upload {int(status.progress()*100)}%")

if response:
    print(f"✅ UPLOAD OK - Video ID: {response['id']}")
    print(f"URL: https://youtu.be/{response['id']}")
else:
    print("❌ Upload failed - no response")
    sys.exit(1)
