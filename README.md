# KOS REGTECH AI - Pack Open Source Tests de Connectivité

Big Four grade - Windows / PowerShell 7+

## Objectif

Déterminer objectivement GO / NO-GO production avec score /100, gates critiques, preuves techniques.

## Structure

```
tests/
 connectivity/ test-dns, test-tls, test-endpoints, test-network
 api/ smoke, contract, negative-tests
 performance/ baseline.js, load.js, stress.js (k6)
 security/ headers, cors, api-security
 database/ supabase-connectivity
 monitoring/ uptime-kuma.md
 reports/ generate-report.ps1
 run-full-audit.ps1
```

## Usage Windows

```powershell
# Préproduction (safe)
.\tests\run-full-audit.ps1 -Environment preproduction

# Production (safe, pas de stress)
.\tests\run-full-audit.ps1 -Environment production

# Avec k6
k6 run tests/performance/baseline.js
```

Exit codes: 0=GO, 1=NO-GO, 2=ERROR

## Rapports

- reports/KOS-BIG4-CONNECTIVITY-REPORT.json
- reports/KOS-BIG4-CONNECTIVITY-REPORT.html
- reports/KOS-BIG4-CONNECTIVITY-REPORT.csv

## Scoring

Connectivity 10, API Contract 15, Functional 20, Database 15, Security 15, Performance 10, Resilience 10, Observability 5 = 100

## Principes

- Jamais inventer de résultat
- PASS uniquement avec preuve
- Secrets masqués
- Tests non destructifs par défaut
- GO/NO-GO déterministe

## Uptime Kuma

Voir tests/monitoring/uptime-kuma.md pour config monitoring continu.

## CI/CD

GitHub Actions: .github/workflows/kos-connectivity-tests.yml
