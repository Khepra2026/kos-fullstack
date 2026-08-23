# Script de compilation et de vérification finale de KOS RegTech AI
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  KOS RegTech AI — Compilation & Build de Production    " -ForegroundColor Cyan
Write-Host "  Khepra Experts — Lomé, Togo                           " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$projectDir = "C:\Users\essoc\OneDrive\Documents\GitHub\kos-platform"
Set-Location $projectDir

Write-Host "
[1/3] Vérification des dépendances et nettoyage..." -ForegroundColor Yellow
if (!(Test-Path "node_modules")) {
    npm install
} else {
    Write-Host "Dépendances déjà installées." -ForegroundColor Green
}

Write-Host "
[2/3] Lancement de la compilation Vite (TypeScript & React)..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "
[3/3] Build de production réussi avec succès !" -ForegroundColor Green
    Write-Host "Les fichiers optimisés sont disponibles dans le dossier 'dist'." -ForegroundColor Cyan
    Write-Host "Votre plateforme est prête pour le déploiement ou la démonstration exécutive." -ForegroundColor Green
    
    Write-Host "========================================================" -ForegroundColor Cyan
    $reponse = Read-Host "Souhaitez-vous lancer la prévisualisation locale (npm run preview) ? (O/n)"
    if ($reponse -eq "" -or $reponse -eq "o" -or $reponse -eq "O") {
        Write-Host "Lancement du serveur de prévisualisation..." -ForegroundColor Yellow
        npm run preview
    } else {
        Write-Host "Prévisualisation ignorée. Fin du script." -ForegroundColor Cyan
    }
} else {
    Write-Host "
[ERREUR] Une anomalie a été détectée lors de la compilation." -ForegroundColor Red
}
Write-Host "========================================================" -ForegroundColor Cyan