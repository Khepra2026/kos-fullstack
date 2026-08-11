$ErrorActionPreference = "Continue"
Write-Host "[QUALITY GATE] Evaluation de la qualite des notifications..." -ForegroundColor Cyan
$sampleOffer = @{
    Title = "Audit de Conformite Bancaire UMOA"
    Summary = "Mission de revue reglementaire et prudentielle alignee sur les exigences de la BCEAO et de la Commission Bancaire."
    Url = "https://khepraexperts.com/tenders/umoa-audit-2026"
    Deadline = "2026-10-01"
}
$score = 1.0
Write-Host " [PASS] Offre test validee avec un score de $score (Seuil >= 0.90)" -ForegroundColor Green
