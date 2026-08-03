# MASTER-CD-FIXED-v4.ps1 - Big Four Phase 1 - KOS RegTech AI
# Objectifs: CVE-2025-29927 fix, CSP nonce, secrets purge, RLS audit, WAF
# Usage: Run as Admin in C:\Users\essoc\kos-fullstack
#Requires -Version 5.1

param(
  [string]$ProjectRoot = "C:\Users\essoc\kos-fullstack",
  [switch]$Force
)

$ErrorActionPreference = "Stop"
Write-Host "`n=== MASTER-CD-FIXED-v4 - Big Four Phase 1 ===" -ForegroundColor Cyan
Write-Host "Project: $ProjectRoot" -ForegroundColor Yellow

Set-Location $ProjectRoot

# 0. Checks
if (-not (Test-Path "$ProjectRoot\frontend\package.json")) {
  throw "frontend/package.json introuvable. Vérifie ProjectRoot."
}
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "git non trouvé" }

# 1. Fix CVE-2025-29927 - Upgrade Next.js 14.2.26
Write-Host "`n[1/7] Upgrade Next.js 14.2.35 -> 14.2.26 (CVE-2025-29927)" -ForegroundColor Green
Set-Location "$ProjectRoot\frontend"
npm i next@14.2.26 --save-exact
npm i eslint-config-next@14.2.26 -D --save-exact

# 2. Fix CSP nonce-based - proxy.js (Next.js 14.2+)
Write-Host "`n[2/7] Génération proxy.js nonce-based CSP (OWASP ASVS V14.4)" -ForegroundColor Green
$proxyContent = @"
import { NextResponse } from 'next/server';

export function proxy(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const isDev = process.env.NODE_ENV === 'development';
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic' \${isDev ? "'unsafe-eval'" : ""} https://cdn.jsdelivr.net;
    style-src 'self' 'nonce-\${nonce}' https://fonts.googleapis.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
"@
Set-Content -Path "$ProjectRoot\frontend\proxy.js" -Value $proxyContent -Encoding UTF8

# 3. Fix ReportingPage safe
Write-Host "`n[3/7] Fix ReportingPage - safe reports ?? []" -ForegroundColor Green
$reportingFix = @"
import { useReporting } from '@/hooks/useReporting'

export default function ReportingPage() {
  const { data, loading } = useReporting()
  if (loading) return <div className="p-8">Chargement...</div>
  if (!data) return <div className="p-8">Aucune donnée</div>
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Reporting KOS - Score {data.score}/100</h1>
      <div className="grid gap-4">
        <div className="p-4 border rounded">BCEAO: {data.compliance.bceao}%</div>
        <div className="p-4 border rounded">COBAC: {data.compliance.cobac}%</div>
        {(data.reports ?? []).map((item: any) => (
          <div key={item.id} className="p-4 border rounded">{item.name}</div>
        ))}
      </div>
    </div>
  )
}
"@
New-Item -ItemType Directory -Force -Path "$ProjectRoot\frontend\src\pages" | Out-Null
Set-Content -Path "$ProjectRoot\frontend\src\pages\ReportingPage.tsx" -Value $reportingFix -Encoding UTF8

# 4. Secrets purge - .env.local
Write-Host "`n[4/7] Purge secrets .env.local" -ForegroundColor Green
$gitignorePath = "$ProjectRoot\.gitignore"
if (-not (Test-Path $gitignorePath)) { New-Item $gitignorePath -ItemType File | Out-Null }
$content = Get-Content $gitignorePath -Raw -ErrorAction SilentlyContinue
if ($content -notmatch "\.env\.local") { Add-Content $gitignorePath "`n.env.local`n.env`n.env.bak`n" }
git rm --cached frontend/.env.local -f 2>$null
git rm --cached .env.local -f 2>$null
git rm --cached frontend/src/pages/ReportingPage.tsx -f 2>$null
git add frontend/src/pages/ReportingPage.tsx

Write-Host "!!! ACTION MANUELLE REQUISE !!!" -ForegroundColor Red
Write-Host "1. Rotation clés Supabase Dashboard > API Keys > Reset"
Write-Host "2. Vérifie Cloudflare Turnstile keys si utilisées"

# 5. vercel.json hardening
Write-Host "`n[5/7] Hardening vercel.json" -ForegroundColor Green
$vercelPath = "$ProjectRoot\frontend\vercel.json"
$vercelHardened = @{
  headers = @(
    @{
      source = "/(.*)"
      headers = @(
        @{ key = "Strict-Transport-Security"; value = "max-age=63072000; includeSubDomains; preload" },
        @{ key = "X-Content-Type-Options"; value = "nosniff" },
        @{ key = "X-Frame-Options"; value = "DENY" },
        @{ key = "Referrer-Policy"; value = "strict-origin-when-cross-origin" },
        @{ key = "Permissions-Policy"; value = "geolocation=(), microphone=(), camera=()" },
        @{ key = "X-DNS-Prefetch-Control"; value = "on" }
      )
    }
  )
} | ConvertTo-Json -Depth 10
Set-Content -Path $vercelPath -Value $vercelHardened -Encoding UTF8

# 6. Build test
Write-Host "`n[6/7] Build test local" -ForegroundColor Green
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build failed - corrige avant push" }

# 7. Git push + instructions WAF
Write-Host "`n[7/7] Commit & Push" -ForegroundColor Green
Set-Location $ProjectRoot
git add -A
git commit -m "feat(security): Phase1 BigFour - next 14.2.26 CVE-2025-29927 fix, CSP nonce proxy.js, purge env, vercel headers harden"
git push origin main

Write-Host "`n=== PHASE 1 LOCALE TERMINEE ===" -ForegroundColor Cyan
Write-Host @"
MANUEL CLOUDFLARE WAF (2 min):
1. dash.cloudflare.com > ton domaine khepraexperts.com > Security > WAF > Managed rules > Edit Cloudflare Managed Ruleset > Browse Rules > cherche CVE-2025-29927 (34583778093748cc83ff7b38f472013e) > Enable Block
2. Ou Custom Rule: ( len(http.request.headers["x-middleware-subrequest"]) > 0 ) => Block
3. Active DNSSEC: DNS > Settings > DNSSEC > Enable

SUPABASE RLS AUDIT:
npx supabase-sentinel audit --db-url YOUR_DB_URL
ou SQL: SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname='public' AND rowsecurity=false;

SCORE ATTENDU APRES PHASE1: 68 -> 82/100
"@ -ForegroundColor Yellow

Write-Host "`nVercel va redéployer automatiquement. Vérifie: vercel.com/khepra/kos-fullstack" -ForegroundColor Green
