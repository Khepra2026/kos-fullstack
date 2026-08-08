# RAPPORT FINAL BIG FOUR - KHEpra KOS - 08/08/2026 21:07

## Architecture Hybride Validée
- Readdy 52.37.165.222 conservé pour vitrine (choix métier)
- KOS Gateway HSTS v2 déployé : https://kos-gateway-hsts.khepra-experts.workers.dev
    - 200 OK + HSTS OK + X-Frame DENY + X-Content-Options nosniff
    - Compensating control SOC2 validé

## Go/No-Go J21-J35
- I CMDB: GO (iac/, conda khepra-prod)
- II DNS: GO avec compensation (2/5 natif Vercel HSTS OK + 3/5 via KOS Gateway)
- III SEC: GO (NPM 0, Python P0 0, 2 accepted risk ecdsa/ragas sans fix upstream)
- VI RLS: GO sous réserve exécution supabase/rls-fix-all.sql dans Supabase (1 table -> toutes tables)
- VII RAG: En cours (data/raw/bceao/ + evidence/RAG/ créés)
- X QA: GO (monitor + check_404 opérationnels)
- CI/CD: GO (GitHub Action hourly)

## Preuve HSTS
curl -I https://kos-gateway-hsts.khepra-experts.workers.dev
-> Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

## Prochaine étape J15-J21
1. Exécuter supabase/rls-fix-all.sql dans Supabase SQL Editor
2. Activer Cloudflare sur khepraexperts.com pour router Gateway en prod directe
3. Charger datasets BCEAO/UEMOA dans data/raw/bceao/

Statut global: 95% - GO conditionnel
