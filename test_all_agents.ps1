# test_all_agents.ps1
$headers = @{
  "Authorization" = "Bearer sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "apikey" = "sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "Content-Type" = "application/json"
}

$tests = @(
  @{agent="cfo-agent"; query="Ratio de solvabilité minimum COBAC"},
  @{agent="risk-analyzer"; query="Déclaration incident opérationnel BEAC"},
  @{agent="legal-expert"; query="États financiers OHADA AUDCIF"},
  @{agent="soc-agent"; query="Vigilance clientèle LCB-FT"}
)

foreach ($test in $tests) {
  Write-Host "`n[$($test.agent)] Test..." -ForegroundColor Cyan
  $body = @{query=$test.query; org_id="test_org"} | ConvertTo-Json

  try {
    $res = Invoke-RestMethod -Uri "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/$($test.agent)" `
      -Method Post -Headers $headers -Body $body

    Write-Host "✓ Réponse: $($res.answer.Substring(0,100))..." -ForegroundColor Green
    Write-Host " Source: $($res.sources[0].doc)" -ForegroundColor Yellow
    Write-Host " Confiance: $([math]::Round($res.confidence * 100, 1))%" -ForegroundColor Yellow
  } catch {
    Write-Host "✗ Erreur: $($_.Exception.Message)" -ForegroundColor Red
  }
}
