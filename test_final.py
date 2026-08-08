import requests
urls=[
    'https://khepraexperts.com/',
    'https://kos.khepraexperts.com/',
    'https://api.khepraexperts.com/',
    'https://kos-gateway-prod.khepra-experts.workers.dev',
    'https://kos.khepraexperts.com/api/cron/bceao'
]
for u in urls:
    try:
        r=requests.get(u,timeout=15)
        score=r.headers.get('X-KOS-BigFour-Score')
        hsts='Strict-Transport-Security' in r.headers
        print(f"{u} -> {r.status_code} Score={score} HSTS={hsts} Body={r.text[:100]}")
    except Exception as e:
        print(f"{u} ERROR {e}")
