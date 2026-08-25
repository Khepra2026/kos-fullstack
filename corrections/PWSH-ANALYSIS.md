# Analyse PowerShell - KOS Platform

| Script | Rôle déclaré | Comportement réel observé | Risque Big Four | Fix requis |
|---|---|---|---|
| MASTER-CD-FIXED-v4.ps1 | God Script - Orchestre deploy Vercel+Fly+Cloudflar | Voir evidence/ packs auto-générés | CRITIQUE - Evidence circulaire | Implementer vraie logique + tests + logs structurés |
| 05-FUSION-TOTALE-CD.ps1 | Fusion totale CD - Merge tous les workers + env va | Voir evidence/ packs auto-générés | CRITIQUE - Evidence circulaire | Implementer vraie logique + tests + logs structurés |
| VERIFY-BIGFOUR-REAL.ps1 | Script d'auto-certification - lit evidence/*.json  | Voir evidence/ packs auto-générés | CRITIQUE - Evidence circulaire | Refactor en modules + validation code réelle + pas d'auto-certification |
| DEPLOY-PROD.ps1 | Deploy prod - wrangler publish + fly deploy + verc | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
| CHECK-HSTS.ps1 | Vérifie headers HSTS sur khepraexperts.com via Inv | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
| GATE0-VERIFY.ps1 | Gate 0 - Vérifie structure repo minimale | Voir evidence/ packs auto-générés | CRITIQUE - Evidence circulaire | Refactor en modules + validation code réelle + pas d'auto-certification |
| GATE2-CHECK.ps1 | Gate 2 - Check RLS enable | Voir evidence/ packs auto-générés | Majeur - Stub | Implementer vraie logique + tests + logs structurés |
| GATE5-SCAN.ps1 | Gate 5 - Scan secrets basique | Voir evidence/ packs auto-générés | Majeur - Stub | Implementer vraie logique + tests + logs structurés |
| GATE7-DATASET.ps1 | Gate 7 - Génère dataset 100 Q/A BCEAO/UEMOA | Voir evidence/ packs auto-générés | Majeur - Stub | Implementer vraie logique + tests + logs structurés |
| GATE11-RLS.ps1 | Gate 11 - Test RLS (actuellement echo seulement) | Voir evidence/ packs auto-générés | Majeur - Stub | Implementer vraie logique + tests + logs structurés |
| GATE15-FINAL.ps1 | Gate 15 - Génère rapport final 100% | Voir evidence/ packs auto-générés | CRITIQUE - Evidence circulaire | Implementer vraie logique + tests + logs structurés |
| BOOTSTRAP.ps1 | Bootstrap env local - .env.local + supabase keys | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
| CLEAN.ps1 | Clean evidence / dist | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
| BUILD.ps1 | Build Next.js standalone | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
| RELEASE.ps1 | Tag + release GitHub | Voir evidence/ packs auto-générés | Moyen | Implementer vraie logique + tests + logs structurés |
