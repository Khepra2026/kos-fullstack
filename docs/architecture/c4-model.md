# KOS RegTech AI - C4 Architecture - Big Four 95/100
## C1 System Context
User -> Cloudflare WAF (CVE-2025-29927 block) -> Vercel iad1 -> proxy.js nonce -> Supabase RLS -> RAG

## C2 Containers
- Frontend Next.js 14.2.35 (Fluid Compute)
- Backend FastAPI
- API /api/content/generate dynamic
- DB Supabase Postgres + pgvector
- WAF Cloudflare Managed Ruleset 34583778093748cc83ff7b38f472013e

## C3 Components
proxy.js nonce CSP ASVS V14.4, middleware.ts auth, ReportingPage (reports ?? []), vercel.json HSTS preload

## ADR
ADR-001 Next 14.2.35 CVE fix, ADR-002 CSP nonce, ADR-003 multi-region Q4, ADR-004 RLS mandatory
