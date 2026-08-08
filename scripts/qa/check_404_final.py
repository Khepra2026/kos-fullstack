import requests

URLS = [
    "https://api.khepraexperts.com/api/health",
    "https://api.khepraexperts.com/api/health?question=BCEAO",
    "https://api.khepraexperts.com/api/rag/query?question=BCEAO",
    "https://api.khepraexperts.com/api/rag/health",
    "https://api.khepraexperts.com/api/rag/query",
    "https://api.khepraexperts.com/api/openapi",
    "https://api.khepraexperts.com/api/bceao/ask?question=test",
    "https://api.khepraexperts.com/api/compliance/check",
    "https://api.khepraexperts.com/api/auth/me",
    "https://api.khepraexperts.com/api/v1/tenants",
    "https://api.khepraexperts.com/api/v1/audit",
    "https://khepraexperts.com/rag/query?question=BCEAO",
    "https://kos.khepraexperts.com/rag/query?question=BCEAO",
]

print("=== KOS FINAL 404 CHECK (frontend/app/api) ===")
ok=0
fail=0
for url in URLS:
    try:
        method = "POST" if "compliance/check" in url else "GET"
        if method=="POST":
            r = requests.post(url, json={"question":"test"}, timeout=10)
        else:
            r = requests.get(url, timeout=10)
        status = "✅" if r.status_code in [200,201,400,401,405] else "❌"
        if status=="✅": ok+=1
        else: fail+=1
        print(f"{status} {r.status_code} {url}")
    except Exception as e:
        print(f"💥 ERROR {url} -> {e}")
        fail+=1

print(f"\n=== RESULT: {ok} OK / {fail} FAIL / {len(URLS)} TOTAL ===")
if fail==0:
    print("🎉 0 404 - MISSION ACCOMPLIE")
else:
    print(f"⚠️ Encore {fail} endpoints en échec")
