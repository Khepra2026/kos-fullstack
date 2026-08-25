
param([string]$App="kos-khepraexperts")
Write-Host "=== Apply Fly Big Four Config ===" -ForegroundColor Cyan
Copy-Item ./fly/fly.toml.bigfour ./fly.toml -Force
Copy-Item ./docker/Dockerfile.bigfour ./Dockerfile -Force
Write-Host "Vérification fly.toml: liveness /healthz + readiness /ready"
fly config validate
Write-Host "Déploiement canary: fly deploy --strategy=canary -a $App"
Write-Host "Rollback si échec: fly releases rollback -a $App"
