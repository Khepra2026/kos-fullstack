# Guide Windows PowerShell

## Prérequis

- PowerShell 7+ (pwsh)
- Accès internet vers kos.khepraexperts.com et api.khepraexperts.com
- k6 optionnel (choco install k6)

## Lancer

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned -Force
cd C:\path\to\kos-fullstack
.\tests\run-full-audit.ps1 -Environment preproduction
```

## Variables

- SUPABASE_URL
- SUPABASE_ANON_KEY (jamais loggé)

## Modes

- PRODUCTION_SAFE=true en production -> bloque mutations et stress
- ALLOW_MUTATING_TESTS=false par défaut
- ALLOW_STRESS=false par défaut

## Dépannage

- DNS: Resolve-DnsName kos.khepraexperts.com
- TLS: tests/connectivity/test-tls.ps1
- API: Invoke-RestMethod https://api.khepraexperts.com/health
