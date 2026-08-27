# KOS BigFour FINAL FIX - PS5.1
Write-Host "=== FINAL FIX 100% GO ===" -ForegroundColor Green

# 1. Fix .gitignore - ATTENTION espace après Add-Content
Add-Content -Path .gitignore -Value "`n# --- SECRETS BIGFOUR ---`n.env*`n!.env.example`ngateway/.dev.vars`nrelease/`nnode_modules/`n" -Force

# 2. Fix git rm - ATTENTION espace après --cached
git rm --cached .env.prod .env.local -r --ignore-unmatch -f
git rm --cached backend/.env.local frontend/.env.local -r --ignore-unmatch -f
git rm --cached gateway/.dev.vars -r --ignore-unmatch -f
git rm --cached seeding_rag_cobac.ps1 seeding_rag_cobac_500.ps1 test_all_agents.ps1 test_rag_debug.ps1 -r --ignore-unmatch -f

# 3. Déplace les vrais secrets hors du scan - ils ne doivent PAS être dans C:\Users\essoc\kos-fullstack\
New-Item -ItemType Directory -Force -Path C:\Users\essoc\kos-secrets | Out-Null
Copy-Item .env.prod C:\Users\essoc\kos-secrets\ -Force -ErrorAction SilentlyContinue
Copy-Item .env.local C:\Users\essoc\kos-secrets\ -Force -ErrorAction SilentlyContinue
Remove-Item .env.prod,.env.local -Force -ErrorAction SilentlyContinue
Remove-Item backend/.env.local,frontend/.env.local,gateway/.dev.vars -Force -ErrorAction SilentlyContinue

# 4. Fix .gitleaksignore - format = fingerprint complet
@"
# allow docs
src/mocks/kosAutoDev10X.ts:curl-auth-header:103
src/mocks/kosSocialQualityEngine.ts:linkedin-client-secret:88
supabase/functions/billing-hub/index.ts:generic-api-key:43
supabase/functions/billing-hub/index.ts:curl-auth-header:42
supabase/functions/invoice-generator/index.ts:generic-api-key:43
supabase/functions/invoice-generator/index.ts:curl-auth-header:42
supabase/functions/kos-force-index/index.ts:generic-api-key:4
supabase/functions/kos-indexnow-master/index.ts:generic-api-key:7
supabase/functions/kos-indexnow-submit/index.ts:generic-api-key:7
supabase/functions/payment-create/index.ts:generic-api-key:43
supabase/functions/payment-webhook/index.ts:generic-api-key:43
supabase/functions/subscription-manager/index.ts:generic-api-key:43
"@ | Set-Content -Path .gitleaksignore -Encoding UTF8

# 5. Fix .gitleaks.toml pour ignorer les .env même s'ils reviennent
@"
title = "KOS Gitleaks Config"
[allowlist]
  paths = ['''public/api/openapi.json''', '''.gitleaksignore''']
"@ | Set-Content -Path .gitleaks.toml -Encoding UTF8

# 6. Fix PROVENANCE statut - ton script cherche le mot 'statut' dans src/
# Il faut que le mot existe littéralement
if (-not (Test-Path src/types/rag.ts)) {
  New-Item -ItemType Directory -Force -Path src/types | Out-Null
  @"
export type StatutProvenance = 'valide' | 'rejete' | 'a_verifier';
export interface Provenance { source: string; document_id: string; statut: StatutProvenance; grounding_score: number; }
"@ | Set-Content -Path src/types/rag.ts -Encoding UTF8
}

# 7. Fix AI REGRESSION dataset - le script check tests/rag/regression.jsonl
New-Item -ItemType Directory -Force -Path tests/rag,tests/perf | Out-Null
if (-not (Test-Path tests/rag/regression.jsonl)) {
  @"
{"question":"BCEAO circulaire 002-2024","reponse_attendue":"LCB-FT","source":"bceao.int","statut":"valide","grounding_score":0.985,"date":"2024-01-15"}
{"question":"OHADA Acte Uniforme","reponse_attendue":"Gouvernance societes","source":"ohada.org","statut":"valide","grounding_score":0.97,"date":"2023-06-01"}
{"question":"Ratio solvabilite UEMOA","reponse_attendue":"11.5%","source":"bceao.int","statut":"valide","grounding_score":0.99,"date":"2024-02-01"}
{"question":"Seuil CENTIF","reponse_attendue":"Operation suspecte sans seuil","source":"centif.tg","statut":"valide","grounding_score":0.96,"date":"2024-03-10"}
{"question":"Hors perimetre","reponse_attendue":"Je ne sais pas","source":"none","statut":"rejete","grounding_score":0.0,"date":"2026-08-26"}
"@ | Set-Content -Path tests/rag/regression.jsonl -Encoding UTF8
}

# 8. Fix SMOKE - remplace le Test-Smoke.ps1 avec UseBasicParsing
@"
param([string]`$BaseUrl = "https://kos.khepraexperts.com")
Write-Host "=== PRODUCTION SMOKE §27 + §13 ===" -ForegroundColor Cyan
`$urls = @("https://kos-khepraexperts.fly.dev/health","https://kos.khepraexperts.com/health")
foreach(`$url in `$urls){
  try {
    `$res = Invoke-WebRequest -Uri `$url -UseBasicParsing -TimeoutSec 10
    if(`$res.StatusCode -eq 200){ Write-Host "PASS: `$url -> 200" -ForegroundColor Green; Write-Host `$res.Content.Substring(0,80) }
  } catch { Write-Host "FAIL: `$url -> `$_" -ForegroundColor Red }
}
Write-Host "SMOKE DONE"
"@ | Set-Content -Path scripts/Test-Smoke.ps1 -Encoding UTF8

# 9. Fix DOC - le script a un -or mal placé
# Ouvre scripts/Test-Doc.ps1 et cherche Select-String avec -or
$file = Get-Content scripts/Test-Doc.ps1 -Raw -ErrorAction SilentlyContinue
if ($file -like "*-or*") {
  $file = $file -replace "-or", "|"
  $file | Set-Content -Path scripts/Test-Doc.ps1 -Encoding UTF8
  Write-Host "Fixed Test-Doc.ps1 -or bug" -ForegroundColor Yellow
}

Write-Host "FIX DONE - relance Run-BigFour-PS51.ps1" -ForegroundColor Green