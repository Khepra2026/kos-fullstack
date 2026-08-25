# KOS BIG FOUR REMEDIATION PACK

Ce pack corrige les 6 Critical identifiés.

## Ordre d'exécution PowerShell partout
```powershell
cd C:\chemin\vers\kos-fullstack
pwsh ./KOS-BIGFOUR-REMEDIATION-PACK/scripts/01-Cleanup-Backups.ps1 -DryRun:$false
pwsh ./KOS-BIGFOUR-REMEDIATION-PACK/scripts/02-Secure-Secrets-Management.ps1 -AppName kos-khepraexperts
pwsh ./KOS-BIGFOUR-REMEDIATION-PACK/scripts/03-Apply-Fly-Config.ps1
pwsh ./KOS-BIGFOUR-REMEDIATION-PACK/scripts/04-Test-E2E-BigFour.ps1
```

## Secrets: JAMAIS obtenus automatiquement depuis repo
Utiliser:
- fly secrets set KEY=val -a app (val depuis 1Password / env local)
- GitHub Settings > Secrets

## Checklist GO
- [ ] backups supprimés
- [ ] Dockerfile non-root + HEALTHCHECK
- [ ] fly.toml avec /healthz et /ready distincts
- [ ] /healthz 2xx rapide déterministe
- [ ] RAG guard anti-hallucination déployé
- [ ] rollback testé: fly deploy --strategy canary puis rollback
