# Security Policy - KOS RegTech AI
## Reporting: GitHub Security Advisory /security/advisories/new - SLA Critique 24h Majeur 7j
## Supported: main 14.2.35 ✅, <14.2.35 ❌
## Headers: HSTS 63072000 preload, CSP nonce proxy.js, DENY, nosniff
## WAF: Cloudflare Managed + CVE rule 34583778093748cc83ff7b38f472013e Block + Custom len(x-middleware-subrequest)>0
## RLS: All tables enabled, audited via SELECT tablename, rowsecurity FROM pg_tables
## Pipeline: .github/workflows/bigfour-audit.yml CodeQL Semgrep Trivy SBOM ZAP Lighthouse RLS
