# Matrice des risques KOS

| Risque | Probabilité | Impact | Gate | Mitigation |
|---|---|---|---|---|
| API indisponible - Fly.io down | OBSERVED HIGH | CRITICAL | CRITICAL BLOCKER | fly status, fly logs, redeploy |
| Frontend indisponible | OBSERVED HIGH | CRITICAL | CRITICAL BLOCKER | Vérifier build Next.js, static export |
| TLS invalide / reset | OBSERVED | CRITICAL | CRITICAL BLOCKER | Check cert Fly.io, Cloudflare |
| Secret exposé | LOW (PASS dans pack) | CRITICAL | CRITICAL BLOCKER | Scan regex + GitHub secret scanning |
| RLS bypass | UNKNOWN | CRITICAL | CRITICAL | Audit Supabase RLS policies |
| OpenAPI divergence | HIGH (API down) | MAJOR | MAJOR | Re-fetch openapi.json quand API up |
| Performance hors SLO | UNKNOWN | MAJOR | MAJOR | k6 baseline/load après fix infra |
| Supabase not configured | OBSERVED in audit env | MAJOR | MAJOR | Configurer env vars |

Règle: tout FAIL CRITICAL = NO-GO immédiat.
