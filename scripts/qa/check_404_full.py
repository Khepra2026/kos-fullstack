import requests
from datetime import datetime

# Toutes les routes connues KOS Regtech AI
ROUTES = {
    "ROOT": [
        "/", "/about", "/services", "/contact", "/legal", "/privacy",
        "/rag", "/rag/query"  # votre page 404 actuelle
    ],
    "APP": [
        "/", "/dashboard", "/login", "/register", "/onboarding",
        "/compliance", "/bceao", "/uemoa", "/reports"
    ],
    "API": [
        "/", "/health", "/docs", "/openapi.json",
        "/rag/query", "/rag/health", "/rag/search",
        "/compliance/check", "/bceao/ask", "/auth/me",
        "/v1/tenants", "/v1/audit"
    ],
    "KOS": [
        "/", "/health", "/status", "/metrics"
    ]
}

DOMAINS = {
    "khepraexperts.com": "https://khepraexperts.com",
    "www.khepraexperts.com": "https://www.khepraexperts.com",
    "app.khepraexperts.com": "https://app.khepraexperts.com",
    "api.khepraexperts.com": "https://api.khepraexperts.com",
    "kos.khepraexperts.com": "https://kos.khepraexperts.com",
    "KOS-Gateway": "https://kos-gateway-hsts.khepra-experts.workers.dev"
}

print(f"=== KOS REGTECH 404 DIAGNOSTIC {datetime.now()} ===\n")
report = []

for name, base in DOMAINS.items():
    print(f"\n== {name} ({base}) ==")
    # Test root first
    paths = ROUTES["ROOT"] if "khepraexperts.com" in name and "api" not in name and "app" not in name and "kos" not in name else \
            ROUTES["APP"] if "app" in name else \
            ROUTES["API"] if "api" in name else \
            ROUTES["KOS"] if "kos" in name and "gateway" not in name else \
            ["/"]
    
    # Pour gateway on teste juste /
    if "Gateway" in name:
        paths = ["/"]
    
    for path in paths:
        url = base + path
        try:
            r = requests.get(url, timeout=10, allow_redirects=True)
            status = r.status_code
            hsts = "OK" if "max-age" in r.headers.get("Strict-Transport-Security","") else "MANQUANT"
            gateway = r.headers.get("X-KOS-Gateway","-")
            flag = "✅" if status < 400 else "❌ 404" if status==404 else f"⚠️ {status}"
            print(f"{flag} {url:60} -> {status} HSTS:{hsts}")
            report.append({"domain": name, "url": url, "status": status, "hsts": hsts, "gateway": gateway})
        except Exception as e:
            print(f"💥 DOWN {url} -> {e}")
            report.append({"domain": name, "url": url, "status": 0, "error": str(e)})

# Résumé 404
print("\n\n=== RESUME 404 ===")
errors = [r for r in report if r.get("status") in [0,404,405]]
for e in errors:
    print(f"{e['domain']} {e['url']} -> {e['status']}")

# Sauvegarde
import json, pathlib
pathlib.Path("evidence/QA").mkdir(parents=True, exist_ok=True)
open(f"evidence/QA/404-report-{datetime.now().strftime('%Y-%m-%d')}.json","w",encoding="utf-8").write(json.dumps(report,indent=2))
print(f"\nRapport sauvé: evidence/QA/404-report-{datetime.now().strftime('%Y-%m-%d')}.json")
print(f"Total 404: {len(errors)} / {len(report)}")
