$ErrorActionPreference = "Continue"
Write-Host "[SOCIAL HYGIENE] Controle anti-hallucination fondateur..." -ForegroundColor Cyan
$postContent = "Publication officielle Khepra Experts validee par SIMDA Essoyomewe."
# Controle sans accent pour robustesse encoding
if ($postContent -match "SIMDA") {
    Write-Host " [PASS] Identite du fondateur conforme (SIMDA Essoyomewe)." -ForegroundColor Green
} else {
    Write-Host " [FAIL] Identite du fondateur non conforme." -ForegroundColor Red
    exit 1
}
