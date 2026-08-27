# Matrice des tests KOS

| ID | Component | Expected | Actual OBSERVED | Result | Severity |
|---|---|---|---|---|---|
| DNS-A-kos | DNS | A record resolves | PASS 66.241.125.166 + IPv6 | PASS | INFO |
| DNS-A-api | DNS | A record resolves | PASS 66.241.125.166 | PASS | INFO |
| TLS-kos | TLS | Valid cert | FAIL Connection reset by peer | FAIL | CRITICAL |
| TLS-api | TLS | Valid cert | FAIL Connection reset by peer | FAIL | CRITICAL |
| FRONTEND-ROOT | Frontend | HTTP 200 | FAIL Connection reset | FAIL | CRITICAL |
| API-HEALTH | API | HTTP 200 /health | FAIL Connection reset | FAIL | CRITICAL |
| API-READY | API | HTTP 200 /ready | FAIL | FAIL | CRITICAL |
| API-VERSION | API | HTTP 200 /version | FAIL | FAIL | MAJOR |
| API-OPENAPI | API Contract | openapi.json valid | FAIL unreachable | FAIL | MAJOR |
| HEADERS | Security | HSTS etc | NOT_TESTED upstream FAIL | NOT_TESTED | MAJOR |
| CORS | Security | No wildcard dangerous | NOT_TESTED | NOT_TESTED | MAJOR |
| SUPABASE | Database | Config present | SKIP NOT CONFIGURED | SKIP | INFO |
| SECRET-SCAN | Security | No secrets | PASS | PASS | CRITICAL |
