
# 05-FUSION-TOTALE-CD.ps1 - MASTER CD FUSION 7 PROJETS -> 1 MONOREPO
# Usage: .\05-FUSION-TOTALE-CD.ps1 -VercelToken "vercel_xxx"
param(
  [string]$VercelToken = $env:VERCEL_TOKEN,
  [string]$KeepProject = "kos-fullstack",
  [switch]$Force
)

$ErrorActionPreference = "Continue"
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "KOS REGTECH - FUSION TOTALE 7 -> 1" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

if(!$VercelToken){
  Write-Host "VERCEL_TOKEN manquant!" -ForegroundColor Red
  Write-Host "Va sur https://vercel.com/account/tokens > Create Token > Copie" -ForegroundColor Yellow
  $VercelToken = Read-Host "Colle ton VERCEL_TOKEN ici"
  if(!$VercelToken){ exit 1 }
}

$Headers = @{
  "Authorization" = "Bearer $VercelToken"
  "Content-Type" = "application/json"
}

# 1. LISTE LES PROJETS
Write-Host "`n1. Liste des projets Vercel..." -ForegroundColor Yellow
try {
  $projects = Invoke-RestMethod -Uri "https://api.vercel.com/v9/projects" -Headers $Headers -Method Get
  $list = $projects.projects
  Write-Host "Projets trouves: $($list.Count)" -ForegroundColor White
  $list | ForEach-Object { 
    $marker = if($_.name -eq $KeepProject){"[KEEP]"}else{"[DELETE]"}
    Write-Host "$marker $($_.name) - $($_.link.repo) - $($_.updatedAt)" -ForegroundColor $(if($marker -eq "[KEEP]"){"Green"}else{"Gray"})
  }
} catch {
  Write-Host "Erreur API Vercel: $($_.Exception.Message)" -ForegroundColor Red
  Write-Host "Utilise plutot la suppression manuelle dans dashboard" -ForegroundColor Yellow
  exit 1
}

# 2. CONFIRMATION
if(!$Force){
  Write-Host "`nATTENTION: On va supprimer tous les projets SAUF $KeepProject" -ForegroundColor Red
  Write-Host "Projets a supprimer:" -ForegroundColor Yellow
  $toDelete = $list | Where-Object { $_.name -ne $KeepProject }
  $toDelete | ForEach-Object { Write-Host "  - $($_.name)" -ForegroundColor Red }
  $confirm = Read-Host "`nTape OUI pour confirmer la suppression de $($toDelete.Count) projets"
  if($confirm -ne "OUI"){ Write-Host "Annule"; exit 0 }
}

# 3. SUPPRESSION VIA API
Write-Host "`n2. Suppression des projets zombies..." -ForegroundColor Yellow
$toDelete = $list | Where-Object { $_.name -ne $KeepProject }
foreach($proj in $toDelete){
  try {
    Write-Host "Suppression $($proj.name) (id: $($proj.id))..." -NoNewline
    $delUri = "https://api.vercel.com/v9/projects/$($proj.id)"
    Invoke-RestMethod -Uri $delUri -Headers $Headers -Method Delete | Out-Null
    Write-Host " OK" -ForegroundColor Green
    Start-Sleep -Seconds 1
  } catch {
    Write-Host " ERREUR: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  -> Supprime-le manuellement: https://vercel.com/khepra/$($proj.name)/settings" -ForegroundColor Yellow
  }
}

# 4. LINK DU PROJET KEEP ET AJOUT DOMAINES
Write-Host "`n3. Configuration du projet principal $KeepProject..." -ForegroundColor Yellow
Set-Location $PSScriptRoot
if(!(Test-Path ".vercel")){ 
  Write-Host "Link vers $KeepProject..."
  npx vercel link --project $KeepProject --token $VercelToken --yes
}

$domains = @("khepraexperts.com","app.khepraexperts.com","kos.khepraexperts.com","api.khepraexperts.com")
foreach($dom in $domains){
  try {
    Write-Host "Ajout domaine $dom sur $KeepProject..." -NoNewline
    npx vercel domains add $dom --project $KeepProject --token $VercelToken --yes 2>&1 | Out-Null
    Write-Host " OK (ou deja present)" -ForegroundColor Green
  } catch {
    Write-Host " Deja present ou erreur: $_" -ForegroundColor Yellow
  }
}

# 5. DEPLOY FINAL
Write-Host "`n4. Deploy final du monorepo..." -ForegroundColor Yellow
npx vercel --prod --token $VercelToken --yes

# 6. HEALTH CHECK
Write-Host "`n5. Health check..." -ForegroundColor Yellow
Start-Sleep -Seconds 10
$checks = @("https://khepraexperts.com/api/health","https://app.khepraexperts.com/api/health","https://api.khepraexperts.com/health","https://kos.khepraexperts.com/health")
foreach($url in $checks){
  try{
    $r = Invoke-WebRequest -Uri $url -Method Get -TimeoutSec 10 -ErrorAction SilentlyContinue
    if($r.StatusCode -eq 200){ Write-Host "OK $url -> 200" -ForegroundColor Green } else { Write-Host "WARN $url -> $($r.StatusCode)" -ForegroundColor Yellow }
  } catch { Write-Host "FAIL $url -> $($_.Exception.Message)" -ForegroundColor Red }
}

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "FUSION TERMINEE" -ForegroundColor Green
Write-Host "Dashboard doit afficher 1 seul projet: $KeepProject avec 4 domaines" -ForegroundColor Cyan
Write-Host "Verifie: https://vercel.com/khepra/$KeepProject/settings/domains" -ForegroundColor White
Write-Host "=========================================" -ForegroundColor Cyan
