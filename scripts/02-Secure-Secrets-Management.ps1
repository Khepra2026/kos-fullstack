
# KOS-BIGFOUR-002 - Gestion sécurisée des secrets - JAMAIS auto-extraction
# Principe Big Four: secrets = Fly secrets + GitHub Secrets, jamais dans le repo
param(
  [string]$AppName="kos-khepraexperts",
  [string]$EnvFile=".env.example"
)
$ErrorActionPreference="Stop"
Write-Host "=== KOS Secure Secrets Management (Big Four) ===" -ForegroundColor Cyan
Write-Host "INTERDICTION: ne jamais faire Get-Content .env | publish, ni git log -p | grep SECRET" -ForegroundColor Red

# 1. Vérifier .env.example existe, pas .env
if(Test-Path ".env"){ Write-Warning ".env présent en local - ne jamais commit ! Vérifie .gitignore" }
if(-not (Test-Path $EnvFile)){ Write-Host "Création $EnvFile template" }
@"
# KOS RegTech AI - Template public - AUCUNE vraie valeur ici
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role
DATABASE_URL=postgresql://user:placeholder@localhost:5432/kos
OPENAI_API_KEY=sk-placeholder
ANTHROPIC_API_KEY=sk-ant-placeholder
JWT_SECRET=generate-with-openssl-rand-hex-32
ENCRYPTION_KEY=generate-with-openssl-rand-hex-32
REDIS_URL=redis://localhost:6379
VECTOR_STORE_URL=placeholder
"@ | Set-Content $EnvFile

# 2. Générer des secrets forts localement (pas depuis le repo)
function New-SecureSecret { param([int]$len=32); return [Convert]::ToHexString((1..$len | ForEach-Object { Get-Random -Max 256 }) ) }
$jwt = New-SecureSecret -len 32
$enc = New-SecureSecret -len 32
Write-Host "Secrets générés localement (ne pas commit): JWT=$($jwt.Substring(0,8))... ENC=$($enc.Substring(0,8))..."

# 3. Pousser vers Fly.io via fly secrets set (méthode sécurisée)
Write-Host "`nPour pousser vers Fly.io (manuel, auditable):"
Write-Host "fly secrets set JWT_SECRET=$jwt -a $AppName"
Write-Host "fly secrets set ENCRYPTION_KEY=$enc -a $AppName"
Write-Host "fly secrets set SUPABASE_URL=`$env:SUPABASE_URL -a $AppName  # depuis ton env local, jamais depuis repo"
Write-Host "`nLister (sans valeurs): fly secrets list -a $AppName"

# 4. GitHub Actions - utiliser ${{ secrets.XXX }}
Write-Host "`nGitHub: Configurer Settings > Secrets > Actions > New repository secret"
Write-Host "Ne JAMAIS faire echo ${{ secrets.X }} dans les logs"
