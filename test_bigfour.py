import requests
urls = [
    'https://khepraexperts.com/',
    'https://khepraexperts.com/trust-center',
    'https://api.khepraexperts.com/',
    'https://kos-gateway-prod.khepra-experts.workers.dev'
]
for url in urls:
    try:
        r = requests.get(url, timeout=15)
        print(f"{url}")
        print(f"  Status: {r.status_code} Score: {r.headers.get('X-KOS-BigFour-Score')} HSTS: {'Strict-Transport-Security' in r.headers} CSP: {'Content-Security-Policy' in r.headers} Evidence: {r.headers.get('X-KOS-Evidence-ID')}")
        print()
    except Exception as e:
        print(f"{url} ERROR {e}")
