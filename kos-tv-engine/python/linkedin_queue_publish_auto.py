import requests, json, time
from pathlib import Path

# Recupere token depuis Supabase via fonction
resp = requests.get("https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/publish")
print(resp.text[:1000])

# Ou publie via queue locale en utilisant token Supabase
queue = json.loads(Path("kos-tv-engine/output/linkedin_queue.json").read_text(encoding="utf-8"))
print(f"\nFile d'attente: {len([x for x in queue if x['status']=='pending'])} posts")
for q in queue:
    print(f" - {q['id']}: {q['status']} - {q['text'][:60]}...")
