# Incident Response - NIST CSF 2.0 RS, RGPD Art33-34
| Criticité | SLA | Exemple |
| Critique | <24h | RLS bypass, CVE auth, fuite secret |
| Majeur | 7j | XSS, WAF bypass |
| Moyen | 30j | Headers manquants |

Playbooks: CVE-2025-29927 WAF block 34583778 + npm i next@14.2.35, RLS enable rowsecurity, LLM01 prompt injection, Secret leak filter-branch.

Pre-commit hook: block .env + gitleaks protect
