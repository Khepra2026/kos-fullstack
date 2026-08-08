import requests, time
from datetime import datetime

URLS = [
    "https://api.khepraexperts.com/health",
    "https://api.khepraexperts.com/rag/query?question=test",
    "https://api.khepraexperts.com/rag/health",
    "https://api.khepraexperts.com/openapi.json"
]

print(f"Polling Vercel deploy {datetime.now()} - Ctrl+C pour stop")
for i in range(30):
    ok = 0
    for url in URLS:
        try:
            r = requests.get(url, timeout=8)
            flag = "✅" if r.status_code==200 else f"❌ {r.status_code}"
            print(f"{flag} {url} -> {r.status_code}")
            if r.status_code==200: ok+=1
        except Exception as e:
            print(f"💥 {url} -> {e}")
    print(f"--- {ok}/{len(URLS)} OK - tentative {i+1}/30 ---\n")
    if ok==len(URLS):
        print("🎉 DEPLOIEMENT OK - 0 404 sur API !")
        break
    time.sleep(10)
