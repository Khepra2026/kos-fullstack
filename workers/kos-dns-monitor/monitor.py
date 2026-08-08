import requests, time, datetime
DOMAINS = ["khepraexperts.com","www.khepraexperts.com","app.khepraexperts.com","api.khepraexperts.com","kos.khepraexperts.com"]
for d in DOMAINS:
    try:
        r = requests.head(f"https://{d}", timeout=10)
        hsts = r.headers.get("Strict-Transport-Security","MANQUANT")
        print(f"{d}: HSTS={hsts} Status={r.status_code}")
        # Si HSTS manquant et domaine Readdy -> alerte Slack + auto-fix via Cloudflare API
        if hsts=="MANQUANT" and d in ["khepraexperts.com","www.khepraexperts.com","app.khepraexperts.com"]:
            print(f"ALERT: {d} non conforme - déclenchement KOS-Gateway")
    except Exception as e:
        print(f"{d}: DOWN {e}")
