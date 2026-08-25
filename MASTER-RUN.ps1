
# KOS BIG FOUR - MASTER RUN - Exécuter DEPUIS C:\kos-fullstack en PowerShell déjà ouvert
# Ne pas taper "pwsh" devant, tu es déjà en PS>
$ErrorActionPreference="Stop"
Set-Location "C:\kos-fullstack"

Write-Host "=== KOS MASTER REMEDIATION ===" -ForegroundColor Cyan
Write-Host "PWD: $(Get-Location)"

# Vérifie que le pack est bien décompressé ici
$packRoot = ".\KOS-BIGFOUR-REMEDIATION-PACK"
if(-not (Test-Path $packRoot)){
  Write-Host "Pack non trouvé à $packRoot - Copie les fichiers depuis /mnt/data ou télécharge le zip" -ForegroundColor Red
  Write-Host "Création structure minimale..."
  New-Item -ItemType Directory -Force -Path "$packRoot\scripts","$packRoot\docker","$packRoot\fly","$packRoot\security","$packRoot\rag" | Out-Null
}

# 1. Cleanup
Write-Host "`n[1/4] Cleanup backups..." -ForegroundColor Yellow
$patterns = @("backup_*","backups")
Get-ChildItem -Directory -Force | Where-Object { $_.Name -like "backup_*" } | ForEach-Object {
  Write-Host "Removing $($_.Name)" -ForegroundColor Magenta
  Remove-Item -Recurse -Force $_.FullName
}
Get-ChildItem -Filter "backup*.zip" -File | ForEach-Object { Remove-Item -Force $_.FullName; Write-Host "Removed zip $($_.Name)" }

# 2. .gitignore patch
Write-Host "`n[2/4] Patch .gitignore..." -ForegroundColor Yellow
$gitignoreAdd = @"
# BIG FOUR - NEVER commit
.env
.env.*
*.zip
backup_*
backups/
evidence/
logs/
exports/
"@
Add-Content -Path ".gitignore" -Value $gitignoreAdd -ErrorAction SilentlyContinue
Write-Host ".gitignore patched"

# 3. Apply Dockerfile + fly.toml
Write-Host "`n[3/4] Apply Dockerfile + fly.toml Big Four..." -ForegroundColor Yellow
if(Test-Path "$packRoot\docker\Dockerfile.bigfour"){ Copy-Item "$packRoot\docker\Dockerfile.bigfour" ".\Dockerfile" -Force; Write-Host "Dockerfile remplacé" }
if(Test-Path "$packRoot\fly\fly.toml.bigfour"){ Copy-Item "$packRoot\fly\fly.toml.bigfour" ".\fly.toml" -Force; Write-Host "fly.toml remplacé" }

# 4. Créer healthz endpoint si backend Python
Write-Host "`n[4/4] Inject healthz..." -ForegroundColor Yellow
$healthCode = @'
@router.get("/healthz")
async def healthz():
    return {"status":"ok","service":"kos-api"}
@router.get("/ready")
async def ready():
    return {"status":"ready"}
'@
Write-Host "Ajoute manuellement ce code dans ton main FastAPI si pas déjà présent:`n$healthCode"

Write-Host "`n=== FIN MASTER RUN ===" -ForegroundColor Green
Write-Host "Prochaines étapes:"
Write-Host "  fly config validate"
Write-Host "  fly secrets list -a kos-khepraexperts  # vérifie secrets (sans valeurs)"
Write-Host "  fly deploy --strategy=canary -a kos-khepraexperts"
Write-Host "  Invoke-WebRequest https://kos-khepraexperts.fly.dev/healthz"
