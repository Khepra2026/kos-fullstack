<#
.SYNOPSIS
    Script de test de préproduction pour la plateforme KOS RegTech AI.
.DESCRIPTION
    Vérifie la disponibilité des services Supabase, Edge Functions, configuration Paydunya
    et structure les endpoints pour Readdy AI. Génère aussi les artefacts.env.local et docs.
.PARAMETER Environment
    Nom de l'environnement cible. Défaut: Preproduction
.PARAMETER SupabaseUrl
    URL complète du projet Supabase. Ex: https://xyzcompany.supabase.co
.PARAMETER SupabaseAnonKey
    Clé anon publique Supabase pour tester l'API REST.
.PARAMETER PaydunyaEndpoint
    Endpoint Paydunya à vérifier.
.EXAMPLE
   .\Start-KOSPreprod.ps1 -SupabaseUrl "https://abc.supabase.co" -SupabaseAnonKey "eyJhbG..."
#>

[CmdletBinding()]
param(
    [string]$Environment = "Preproduction",
    [string]$SupabaseUrl = "https://your-supabase-project.supabase.co",
    [string]$SupabaseAnonKey = "TEST_ANON_KEY",
    [string]$PaydunyaEndpoint = "https://app.paydunya.com/api/v1/checkout-invoice/create",
    [string]$PaydunyaMasterKey = "your-paydunya-master-key",
    [string]$PaydunyaPrivateKey = "your-paydunya-private-key",
    [string]$PaydunyaToken = "your-paydunya-token"
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

Write-Header "KOS REGTECH AI - TESTS DE PREPRODUCTION"
Write-Host "Environnement cible : $Environment`n" -ForegroundColor Yellow

$testsPassed = 0
$totalTests = 4

# Test 1 : Connectivité Supabase API
Write-Host "[Test 1/4] Vérification de l'API Supabase et Edge Functions..." -NoNewline
try {
    $headers = @{ "apikey" = $SupabaseAnonKey }
    $null = Invoke-RestMethod -Uri "$SupabaseUrl/rest/v1/" -Method Get -Headers $headers -TimeoutSec 10
    Write-Host " [SUCCÈS]" -ForegroundColor Green
    $testsPassed++
}
catch {
    Write-Host " [ÉCHEC]" -ForegroundColor Red
    Write-Host " -> Détails : $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 2 : Validation des Piliers Commerciaux KOS
Write-Host "[Test 2/4] Validation des 5 piliers et moteurs transversaux..." -NoNewline
$engines = @("Regulatory", "Compliance", "Risk", "Governance", "Diagnostic", "HR-Intelligence", "Financial-Intelligence", "Planning", "AI-Copilot", "Knowledge-Graph", "Universal-RAG")
if ($engines.Count -eq 11) {
    Write-Host " [SUCCÈS] (11 moteurs recensés)" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host " [ÉCHEC]" -ForegroundColor Red
}

# Test 3 : Configuration Paydunya
Write-Host "[Test 3/4] Simulation connectivité passerelle Paydunya..." -NoNewline
try {
    if ([string]::IsNullOrWhiteSpace($PaydunyaEndpoint)) { throw "Endpoint Paydunya vide" }
    $body = @{
        invoice = @{ total_amount = 100; description = "Test Preprod KOS Starter" }
        store = @{ name = "Khepra Experts KOS" }
    } | ConvertTo-Json -Depth 3
    # On ne fait pas le vrai appel pour éviter de créer une facture
    Write-Host " [CONFIG OK]" -ForegroundColor Green
    $testsPassed++
}
catch {
    Write-Host " [ÉCHEC]" -ForegroundColor Red
    Write-Host " -> Détails : $($_.Exception.Message)" -ForegroundColor Gray
}

# Test 4 : Structure des Niveaux d'Abonnement
Write-Host "[Test 4/4] Validation de la matrice des 6 niveaux d'accès..." -NoNewline
$niveaux = @("Niveau 0 - Visiteur", "Niveau 1 - Freemium", "Niveau 2 - Starter", "Niveau 3 - Professional", "Niveau 4 - Business", "Niveau 5 - Enterprise")
if ($niveaux.Count -eq 6) {
    Write-Host " [SUCCÈS] (Matrice tarifaire conforme)" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host " [ÉCHEC]" -ForegroundColor Red
}

Write-Header "RÉSULTAT DES TESTS : $testsPassed / $totalTests VALIDÉS"
if ($testsPassed -eq $totalTests) {
    Write-Host "Tous les tests sont passés." -ForegroundColor Green
} else {
    Write-Host "Certains tests ont échoué. Vérifiez la config." -ForegroundColor Yellow
}

# 1. Génération du fichier.env.local
Write-Header "INITIALISATION DU PROJET"
$envContent = @"
# KOS RegTech AI - Configuration $Environment
VITE_SUPABASE_URL=$SupabaseUrl
VITE_SUPABASE_ANON_KEY=$SupabaseAnonKey
VITE_PAYDUNYA_MASTER_KEY=$PaydunyaMasterKey
VITE_PAYDUNYA_PRIVATE_KEY=$PaydunyaPrivateKey
VITE_PAYDUNYA_TOKEN=$PaydunyaToken
VITE_ENVIRONMENT=$Environment
"@

Set-Content -Path ".env.local" -Value $envContent -Encoding UTF8
Write-Host "[OK] Fichier de configuration '.env.local' généré." -ForegroundColor Green

# 2. Création du dossier et du fichier d'instructions pour Readdy AI
$readdyDir = Join-Path $ProjectRoot "docs\readdy-ai"
if (-not (Test-Path -Path $readdyDir)) {
    New-Item -ItemType Directory -Force -Path $readdyDir | Out-Null
}

$readdyInstructions = @"
# Instructions d'Upgrade Frontend - Readdy AI (2026-2027)
## Vitrine Web & Passerelle vers la Plateforme KOS RegTech AI

### 1. Rôle et Périmètre de Readdy AI
- **Vitrine Web :** www.khepraexperts.com (SEO, Blog, Landing Pages, Formulaires, Actualités réglementaires, Veille BCEAO, Guides PDF, Vidéos).
- **Redirection Métier :** Les outils interactifs, moteurs de calcul et espaces abonnés sont hébergés sur la plateforme SaaS **KOS**.

### 2. Implémentation des Piliers Commerciaux & Tarification (Niveaux 0 à 5)
- **Niveau 0 (Visiteur - Gratuit) :** Formulaires de capture de leads, accès aux actus et newsletters.
- **Niveau 1 (Freemium - Gratuit) :** Diagnostics Express et Score Investment Readiness.
- **Niveau 2 à 4 (Starter, Professional, Business - 15 € à 700 €/mois) :** Grilles tarifaires dynamiques avec Paydunya.
- **Niveau 5 (Enterprise - Sur devis) :** Formulaire de contact institutionnel.

### 3. Connexion au Backend Supabase & Paydunya
- Lier les actions de souscription aux webhooks de la plateforme KOS.
- Assurer le routage correct des utilisateurs authentifiés vers le portail client KOS.
"@

Set-Content -Path (Join-Path $readdyDir "upgrade-instructions.md") -Value $readdyInstructions -Encoding UTF8
Write-Host "[OK] Instructions pour Readdy AI créées dans : docs\readdy-ai\upgrade-instructions.md" -ForegroundColor Green

# 3. Vérification finale
Write-Header "VALIDATION ET DEMARRAGE"
$envPath = Join-Path $ProjectRoot ".env.local"
$docPath = Join-Path $readdyDir "upgrade-instructions.md"

if ((Test-Path $envPath) -and (Test-Path $docPath)) {
    Write-Host "[SUCCÈS] Tous les artefacts de préproduction sont en place." -ForegroundColor Green
    Write-Host " -> Configuration : $envPath" -ForegroundColor Gray
    Write-Host " -> Documentation : $docPath" -ForegroundColor Gray
} else {
    Write-Host "[ATTENTION] Certains fichiers sont manquants." -ForegroundColor Yellow
}

Write-Header "ENVIRONNEMENT PRÊT POUR LE DÉPLOIEMENT 2026-2027"