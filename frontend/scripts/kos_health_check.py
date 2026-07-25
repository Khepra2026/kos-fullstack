import requests
URLS=["https://khepraexperts.com","https://app.khepraexperts.com"]
for url in URLS:
    try:
        r=requests.get(url,timeout=15)
        print(f"{url}: {r.status_code} OK")
    except Exception as e:
        print(f"FAIL {url}: {e}")
