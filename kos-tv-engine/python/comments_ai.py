# Master 7: Reponses auto aux questions public - 100% KOS
import requests
from pathlib import Path

def reply_comments():
    env={}
    for l in Path("../scripts/youtube/.env.youtube.local").read_text(encoding="utf-8").splitlines():
        if "=" in l: k,v=l.split("=",1); env[k]=v
    r=requests.post("https://oauth2.googleapis.com/token", data={
      "client_id":env["YOUTUBE_CLIENT_ID"],
      "client_secret":env["YOUTUBE_CLIENT_SECRET"],
      "refresh_token":env["YOUTUBE_REFRESH_TOKEN"],
      "grant_type":"refresh_token"
    })
    tok=r.json()["access_token"]

    # Liste tes 5 videos
    vids=["vSs53swh3Fc","rWxuwn3ZHv8","A4HWIc2EmaI","2wysv2qlDAg","MRi7YhGX4GA"]
    for vid in vids:
        comments=requests.get(f"https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId={vid}&maxResults=20",
          headers={"Authorization": f"Bearer {tok}"})
        print(f"Video {vid}: {comments.text[:200]}")

if __name__=="__main__":
    reply_comments()
