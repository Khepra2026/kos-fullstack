import requests
DOMAINS = ["https://khepraexperts.com","https://www.khepraexperts.com","https://app.khepraexperts.com","https://api.khepraexperts.com","https://kos.khepraexperts.com","https://kos-gateway-hsts.khepra-experts.workers.dev"]
print("=== KOS QA 404 + HSTS ===")
for domain in DOMAINS:
    try:
        r = requests.get(domain, timeout=15, allow_redirects=True)
        hsts = r.headers.get("Strict-Transport-Security","MANQUANT")
        gateway = r.headers.get("X-KOS-Gateway","natif")
        print(f"{domain:55} -> {r.status_code} HSTS:{'OK' if 'max-age' in hsts else 'MANQUANT'} Gateway:{gateway}")
    except Exception as e:
        print(f"{domain} DOWN: {e}")
