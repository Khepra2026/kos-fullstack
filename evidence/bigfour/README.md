# Big Four Evidence Pack - 2026-08-23
Project: pgfwhahiwqvqeahpirjx (West EU Paris)
Commits: f485e608 + 6a686c12

Gates:
- Tenant Isolation Middleware: middleware.ts
- RLS Prod: supabase db push --include-all -> Finished
- RAG Fail-Closed: rag_brain.py EMBEDDING_KEY_MISSING_FAIL_CLOSED threshold 0.72
- Pipeline: .github/workflows/bigfour-audit.yml
- Tests: 4 passed (see test_results.log)

Prod Proof: Applying migration 0001_fix_rls_tenant_isolation.sql... Finished supabase db push.
