# KOS RegTech AI - Master CD Big Four 100% GO Tests

## Usage
```pwsh
# Local full run
.\Run-BigFour.ps1

# CI
.\Run-BigFour.ps1 -CI -FailFast

# Individual phases
pwsh ./scripts/Test-Inventory.ps1
pwsh ./scripts/Test-SecurityBaseline.ps1
pwsh ./scripts/Test-DatabaseBaseline.ps1 -SupabaseUrl $env:SUPABASE_URL -SupabaseKey $env:SUPABASE_SERVICE_KEY
pwsh ./scripts/Measure-QualityGate.ps1
```

## Coverage §38
1. INVENTORY - backup anti-pattern, pollution, structure
2. ARCHITECTURE MAP - modular domains, circular deps, monolith files
3. DEPENDENCY MAP - lockfile, npm audit, knip, supply chain
4. DUPLICATE SCAN - routes, compose, tables, API handlers
5. BASELINE TEST - Pester baseline
6. SECURITY BASELINE - ASVS 5.0, gitleaks, semgrep, headers, any check, RLS
7. DATABASE BASELINE - idempotent migrations, PK, pgvector, live RLS
8. API BASELINE - OpenAPI contract, auth, deterministic, rate limit
9. AI/RAG BASELINE - provenance, injection tests, least privilege, regression dataset
10. PERFORMANCE BASELINE - k6, bundle size, BEFORE->AFTER
11-14. TEST PYRAMID - lint, typecheck, unit, integration, contract, e2e, Pester
15. BUILD - reproducible GIT SHA->IMAGE
16-17. DEPLOY + SMOKE - /health on 4 envs, version check
18. SCORE - Quality Gate 100/100 weighted
19. DOCUMENTATION - architecture, api, runbooks sync
20. CONTINUOUS - GitHub Actions bigfour-100.yml

## Quality Gate §31
Architecture 10 + Code 10 + API 10 + DB 10 + Tests 10 + Security 15 + AI/RAG 10 + Performance 8 + DevSecOps 7 + Observability 5 + Doc 5 = 100
≥95 = GO, 90-94.99 = CONDITIONAL GO, <90 = NO-GO
Hard Blockers §32 = instant NO-GO

## Evidence
All scripts output PASS/FAIL/WARNING with proof CODE->TEST->RUNTIME->LOG->METRIQUE
Results saved to quality-gate-result.json
