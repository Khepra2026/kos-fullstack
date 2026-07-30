# MASTER-7-CONTENT-FACTORY.ps1 - KOS RegTech Content Automation Big Four
param([string]$Mode = "daily")

$Topics = @(
    @{ title="BCEAO KYC 2026: 3 changements qui coutent 2M"; hook="La BCEAO vient de frapper..."; cta="Commentez KYC pour recevoir le template" },
    @{ title="COBAC: Comment eviter l'amende de 50M FCFA"; hook="90% des banques echouent ici..."; cta="DM 'AUDIT' pour un diag gratuit" },
    @{ title="RegTech: L'IA qui detecte la fraude en 0.3s"; hook="On a teste KOS sur 10k transactions..."; cta="Lien demo en commentaire" },
    @{ title="Live Demo KOS: De 0 a audit trail en 10min"; hook="Live aujourd'hui 18h GMT..."; cta="Set reminder" }
)

$Today = $Topics | Get-Random
$Date = Get-Date -Format "yyyy-MM-dd HH:mm"

# 1. Post LinkedIn
$LinkedInPost = @"
🚨 $($Today.title)

$($Today.hook)

3 points cles:
✅ Audit trail immutable (Big Four compliant)
✅ Detection KYC/AML temps reel
✅ Rapport SOC2 genere auto

$($Today.cta)

#RegTech #BCEAO #FinTech #KOS #Compliance #Togo

---
Genere par KOS Content Factory - $Date
"@

$LinkedInPost | Set-Content "$PSScriptRoot\linkedin-post-$(Get-Date -Format yyyyMMdd).txt" -Encoding UTF8
Write-Host "LinkedIn Post genere:" -ForegroundColor Cyan
Write-Host $LinkedInPost

# 2. Script Video Live (30s, 60s, 10min)
$VideoScript = @"
[HOOK 0-3s] $($Today.hook)
[PROBLEME 3-15s] Les banques perdent 2M/an en amendes COBAC a cause de...
[SOLUTION 15-45s] KOS RegTech AI automatise KYC/AML avec audit trail Big Four
[DEMO 45-90s] Montre app.khepraexperts.com - generation rapport en 10s
[CTA 90-100s] $($Today.cta) - lien en bio
"@
$VideoScript | Set-Content "$PSScriptRoot\video-script-$(Get-Date -Format yyyyMMdd).txt" -Encoding UTF8

# 3. Envoi via Buffer API (si configure)
if ($env:BUFFER_ACCESS_TOKEN) {
    $payload = @{
        text = $LinkedInPost
        profiles = @($env:BUFFER_LINKEDIN_PROFILE_ID)
    } | ConvertTo-Json -Depth 3
    try {
        Invoke-RestMethod -Uri "https://api.bufferapp.com/1/updates/create.json?access_token=$env:BUFFER_ACCESS_TOKEN" -Method Post -Body $payload -ContentType "application/json"
        Write-Host "✅ Poste sur Buffer" -ForegroundColor Green
    } catch { Write-Host "Buffer non configure - post sauve localement" -ForegroundColor Yellow }
}

# 4. Log audit Big Four
"$(Get-Date -Format o) | Content genere | $($Today.title)" | Out-File "$PSScriptRoot\content-log.txt" -Append -Encoding utf8
