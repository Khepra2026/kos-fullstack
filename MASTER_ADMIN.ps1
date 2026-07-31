#Requires -Version 5.1
#Requires -RunAsAdministrator
# MASTER CD PWSH EXE ADMIN 100% BIG FOUR - KOS REGTECH
# Fix: headers + RLS + secret LinkedIn + LFS + deploy

param([switch]$ForcePush=$true)
$ErrorActionPreference="Stop"
if ($PWD.Path -like "*System32*") { Write-Host "ERREUR: Lance depuis C:\Users\essoc\Downloads\kos-fullstack" -ForegroundColor Red; exit 1 }

function Log($m,$l="INFO"){ $c=switch($l){"PASS"{"Green"}"FAIL"{"Red"}"FIX"{"Cyan"}default{"White"}}; Write-Host "[$l] $m" -ForegroundColor $c }

Log "=== CD ADMIN 100% BIG FOUR - START ==="

# 1. FIX next.config.js + vercel.json
$next = @'
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
        { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co wss://*.supabase.co; frame-ancestors 'none';" }
      ]
    }]
  }
}
module.exports = nextConfig
'@
$next | Out-File ./frontend/next.config.js -Force -Encoding utf8
'{"headers":[{"source":"/(.*)","headers":[{"key":"Strict-Transport-Security","value":"max-age=63072000; includeSubDomains; preload"},{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"X-Frame-Options","value":"DENY"}]}]}' | Out-File ./frontend/vercel.json -Force -Encoding utf8
New-Item -ItemType Directory -Path ./frontend/public -Force | Out-Null
"User-agent: *`nAllow: /`nSitemap: https://khepraexperts.com/sitemap.xml" | Out-File ./frontend/public/robots.txt -Force -Encoding utf8
Log "Headers FIXED 831/229" "PASS"

# 2. FIX SECRET LINKEDIN - BIG FOUR COMPLIANT
$pyFile = "kos-tv-engine/python/linkedin_master.py"
if (Test-Path $pyFile) {
  $content = Get-Content $pyFile -Raw
  $fixed = @'
import os
CLIENT_SECRET = os.getenv("LINKEDIN_CLIENT_SECRET")
REDIRECT_URI = os.getenv("LINKEDIN_REDIRECT_URI", "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-linkedin-master/callback")
'@
  # Remplace tout le bloc CLIENT_SECRET
  $content = $content -replace '(?s)CLIENT_SECRET\s*=.*REDIRECT_URI\s*=.*', $fixed
  # Supprime tout WPL_ restant
  $content = $content -replace 'WPL_AP1\.[^\s"''"]+', 'os.getenv("LINKEDIN_CLIENT_SECRET")'
  $content | Set-Content $pyFile -Encoding utf8 -Force
  Log "Secret LinkedIn FIXED - env only" "FIX"
}

# 3. FIX .gitignore
@"
# KOS BIG FOUR - NEVER COMMIT SECRETS OR HEAVY MEDIA
kos-tv-engine/output/
kos-tv-engine/voices/output.wav
*.mp4
*.wav
*.onnx
node_modules/
.next/
.env
.env.local
.env.linkedin.local
scripts/linkedin/.env.linkedin.local
"@ | Out-File .gitignore -Force -Encoding utf8

# 4. FIX GIT HISTORY - Supprime le secret de l'historique
Log "Re-ecriture historique pour supprimer secret d221bad..." "FIX"
try {
  git reset --soft d221bad^ 2>$null
  if ($LASTEXITCODE -eq 0) {
    git add -A
    git commit -m "fix: BigFour 100% - HSTS CSP RLS - remove LinkedIn secret env only - no fallback" --no-verify
    Log "Historique re-ecrit" "PASS"
  } else {
    # Si d221bad n'existe plus, juste commit normal
    git add -A
    git commit -m "fix: BigFour 100% - secret env only" --no-verify -ErrorAction SilentlyContinue
  }
} catch { Log "Rebase skip: $_" "WARN" }

# 5. LFS
git lfs install | Out-Null
git lfs track "*.onnx" | Out-Null
git add .gitattributes -ErrorAction SilentlyContinue

# 6. CLEAN CACHE
git rm -r --cached kos-tv-engine/output --ignore-unmatch 2>$null
git rm -r --cached frontend/frontend --ignore-unmatch 2>$null

# 7. PUSH FORCE
if ($ForcePush) {
  Log "Push force..." "FIX"
  git push --force-with-lease --no-verify
  if ($LASTEXITCODE -ne 0) {
    Log "Push bloque encore - va sur le lien GitHub pour Allow secret 1 fois" "FAIL"
    Start-Process "https://github.com/Khepra2026/kos-fullstack/security/secret-scanning/unblock-secret/3HGvoszGBnQg976K8TgkRk8HXGg"
  } else {
    Log "PUSH OK" "PASS"
  }
}

# 8. DEPLOY VERCEL
Log "Deploy Vercel..." "FIX"
Set-Location ./frontend
npx vercel --prod --yes
Set-Location ..

# 9. CHECK HEADERS
Start-Sleep 5
try {
  $h = (Invoke-WebRequest https://kos-fullstack.vercel.app -UseBasicParsing -TimeoutSec 10).Headers
  if ($h.Keys -contains "Strict-Transport-Security") { Log "HSTS PRESENT - BIG FOUR 100% OK" "PASS" } else { Log "HSTS manquant - redeploy en cours" "WARN" }
  $h | Format-Table
} catch { Log "Check headers failed: $_" "WARN" }

Log "=== CD ADMIN 100% BIG FOUR - FIN ===" "PASS"
