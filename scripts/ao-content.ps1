# MASTER-4-AUTOMATION.ps1 - Scraping AO/AMI + Auto Content
#Requires -Version 5.1

$EmailDest = "essochamanu@gmail.com" # CORRIGE @com -> @gmail.com
$SourcesAO = @(
    "https://www.marches-publics.gouv.fr",
    "https://www.armp.tg",
    "https://www.bceao.int/appels-offres"
)

foreach ($url in $SourcesAO) {
    try {
        $content = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 20
        if ($content.Content -match "RegTech|Compliance|KYC|AML|FinTech") {
            $subject = "[KOS] AO Detecte: $url"
            $body = "Nouvel AO correspondant: $url`nDate: $(Get-Date)"
            # Send via Brevo/Sendgrid API
            # Invoke-RestMethod -Uri "https://api.brevo.com/v3/smtp/email" -Method Post -Body @{ to=@(@{email=$EmailDest}); subject=$subject; htmlContent=$body } | ConvertTo-Json
            $body | Out-File "$PSScriptRoot\AO-$(Get-Date -Format yyyyMMdd-HHmm).log" -Append
            Write-Host "AO trouve: $url" -ForegroundColor Green
        }
    } catch { Write-Host "Erreur scan $url : $($_.Exception.Message)" -ForegroundColor Red }
}

# Auto Content + Video Live
$ContentIdeas = @(
    "BCEAO: Nouvelle circulaire KYC 2026 - Ce qui change",
    "RegTech: Comment eviter 2M d'amende COBAC",
    "Live: Demo KOS en 10min - Audit trail immutable"
)
$ContentIdeas | ForEach-Object {
    # Genere post LinkedIn via LLM + image
    # Puis upload vers Buffer/Hootsuite API
    $_ | Out-File "$PSScriptRoot\content-queue-$(Get-Date -Format yyyyMMdd).txt" -Append
}
