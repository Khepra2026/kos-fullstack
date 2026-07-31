#Requires -Version 5.1
#Requires -RunAsAdministrator
# MASTER CD KOS REGTECH AI - FINAL v4 - 100% Big Four Auto-Fix
param([switch]$AutoFix=$true)
$ErrorActionPreference="Stop"

# Bloque System32
if ($PWD.Path -like "*System32*") { Write-Host "STOP: Tu es dans System32. Fais cd C:\Users\essoc\Downloads\kos-fullstack\frontend" -ForegroundColor Red; exit 1 }

$ts = Get-Date -Format "yyyyMMdd_HHmmss"
$log = "KOS_MASTER_$ts.log"
function Log($m,$l="INFO"){ $c=switch($l){"PASS"{"Green"}"FAIL"{"Red"}"FIX"{"Cyan"}default{"White"}}; $line="[$l] $m"; Write-Host $line -ForegroundColor $c; Add-Content $log $line }

Log "=== MASTER CD FINAL v4 - PWD: $PWD ==="

# --- 1. next.config.js ---
$nextConfigContent = @"
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co;" }
      ]
    }]
  }
}
module.exports = nextConfig
"@
$nextConfigContent | Out-File -FilePath "./next.config.js" -Encoding utf8 -Force
Log "next.config.js FIXED" "PASS"

# --- 2. vercel.json ---
$vercelContent = '{"headers":[{"source":"/(.*)","headers":[{"key":"Strict-Transport-Security","value":"max-age=63072000; includeSubDomains; preload"},{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"X-Frame-Options","value":"DENY"}]}]}'
$vercelContent | Out-File -FilePath "./vercel.json" -Encoding utf8 -Force
Log "vercel.json FIXED" "PASS"

# --- 3. public/robots.txt + llms.txt ---
New-Item -ItemType Directory -Path "./public" -Force | Out-Null
"User-agent: *`nAllow: /`nSitemap: https://khepraexperts.com/sitemap.xml" | Out-File "./public/robots.txt" -Encoding utf8 -Force
"# KOS RegTech AI" | Out-File "./public/llms.txt" -Encoding utf8 -Force
Log "robots.txt + llms.txt FIXED" "PASS"

# --- 4. supabase migration ---
New-Item -ItemType Directory -Path "./supabase/migrations" -Force | Out-Null
$migrationFile = "./supabase/migrations/${ts}_bigfour_hardening.sql"
$sql = @"
-- BIG FOUR HARDENING AUTO
DO `$`$ DECLARE t text; BEGIN FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY; ALTER TABLE public.%I FORCE ROW LEVEL SECURITY;', t,t); END LOOP; END `$`$;
CREATE TABLE IF NOT EXISTS public.audit_log (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid, action text, payload jsonb, created_at timestamptz DEFAULT now());
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
REVOKE UPDATE, DELETE ON public.audit_log FROM PUBLIC, anon, authenticated;
CREATE TABLE IF NOT EXISTS public.evidence_packs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid, pack_hash text, created_at timestamptz DEFAULT now());
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS human_review_required boolean DEFAULT true;
"@
$sql | Out-File $migrationFile -Encoding utf8 -Force
Log "Migration creee: $migrationFile" "PASS"

# --- 5. Health check final ---
try {
  $r = Invoke-WebRequest -Uri "https://khepraexperts.com" -UseBasicParsing -TimeoutSec 10
  if ($r.StatusCode -eq 200) { Log "khepraexperts.com UP" "PASS" } else { Log "khepraexperts.com DOWN: $($r.StatusCode)" "FAIL" }
} catch { Log "khepraexperts.com check failed: $_" "FAIL" }

Log "=== FIN - Copie ces 3 fichiers vers tes 2 projets frontend + supabase db push ===" "FIX"
Write-Host "`nFichiers crees dans: $PWD" -ForegroundColor Green
Get-ChildItem -File next.config.js,vercel.json | Format-Table Name,Length
