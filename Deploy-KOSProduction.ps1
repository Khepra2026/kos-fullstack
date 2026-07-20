<#
.SYNOPSIS
    Script de déploiement production pour KOS RegTech AI
.DESCRIPTION
    Build le frontend, pousse les migrations Supabase, déploie les Edge Functions,
    et affiche la checklist Go-Live.
#>

[CmdletBinding()]
param(
    [switch]$BuildFrontend,
    [switch]$DeploySupabase,
    [string]$SupabaseProjectRef = "pgfwhahiwqvqeahpirjx"
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = "C:\KOS DEV PLATEFORM\project-11940621"
Set-Location $ProjectRoot

function Write-Header {
    param([string]$Title)
    Write-Host "`n==================================================" -ForegroundColor Cyan
    Write-Host " $Title" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
}

# 1. Build Frontend
if ($BuildFrontend) {
    Write-Header "BUILD FRONTEND PROD"
    if (Test-Path ".\package.json") {
        if (Get-Command npm -ErrorAction SilentlyContinue) {
            Write-Host "npm ci" -ForegroundColor Cyan
            npm ci
            Write-Host "npm run build" -ForegroundColor Cyan
            npm run build
            Write-Host "[OK] Build frontend terminé." -ForegroundColor Green
        } else {
            Write-Host "npm non trouvé. Installe Node.js" -ForegroundColor Red
        }
    } else {
        Write-Host "package.json introuvable. Skip build." -ForegroundColor Yellow
    }
}

# 2. Deploy Supabase Edge Functions + Migrations
if ($DeploySupabase) {
    Write-Header "DEPLOY SUPABASE PROD"
    if (Get-Command supabase -ErrorAction SilentlyContinue) {
        Write-Host "supabase link --project-ref $SupabaseProjectRef" -ForegroundColor Cyan
        supabase link --project-ref $SupabaseProjectRef

        Write-Host "supabase db push" -ForegroundColor Cyan
        supabase db push

        Write-Host "supabase functions deploy --project-ref $SupabaseProjectRef" -ForegroundColor Cyan
        supabase functions deploy --project-ref $SupabaseProjectRef

        Write-Host "[OK] Déploiement Supabase terminé." -ForegroundColor Green
    } else {
        Write-Host "CLI Supabase non installé. Installe: npm i -g supabase" -ForegroundColor Yellow
    }
}

# 3. Checklist Go-Live
Write-Header "CHECKLIST GO-LIVE MONÉTISATION"
$checklist = @(
    "[ ] Paydunya en mode LIVE + compte vérifié",
    "[ ] Webhooks Paydunya configurés vers https://api.khepraexperts.com/webhooks/paydunya",
    "[ ] Supabase RLS activé sur toutes les tables clients",
    "[ ] Variables d'env prod sur Vercel/Netlify/hosting",
    "[ ] DNS www + api pointent vers la prod",
    "[ ] SSL/TLS valide",
    "[ ] Backups Supabase automatiques activés",
    "[ ] Monitoring Sentry/LogSnag branché",
    "[ ] CGV + Mentions légales + RGPD à jour",
    "[ ] Test paiement réel 1€ effectué et remboursé"
)
$checklist | ForEach-Object { Write-Host $_ -ForegroundColor Gray }

Write-Header "PRÊT POUR MISE EN PRODUCTION LIVE"
Write-Host "Relance sans paramètres pour voir la checklist uniquement." -ForegroundColor Gray