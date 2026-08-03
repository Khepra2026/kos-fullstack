# PRA/PCA Runbook - RPO 1h RTO 4h - ISO 22301
## Scénario 1 Supabase down: maintenance=true -> PITR T-15min -> check RLS true -> reindex RAG
## Scénario 2 Vercel down: promote previous deployment -> cdg1
## Scénario 3 CVE: WAF Block -> npm i next@latest -> redeploy
## Scénario 4 Secret leak déjà exécuté 03/08: filter-branch 69e4290->83415e2 + reset keys + force push
Checklist mensuelle: restore backup staging, RLS audit, failover Vercel
