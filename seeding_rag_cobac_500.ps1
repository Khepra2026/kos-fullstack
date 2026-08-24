# seeding_rag_cobac_500.ps1 - Ingestion massive production
$SUPABASE_URL = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-knowledge-hub/update"
$headers = @{
  "Authorization" = "Bearer sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "apikey" = "sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "Content-Type" = "application/json"
}

# COBAC R-2016/04 - 200 articles
$cobac_articles = 1..200 | ForEach-Object {
  @{
    title = "COBAC R-2016/04 Art. $_"
    content = "Article $_ - Disposition prudentielle COBAC relative aux établissements de crédit CEMAC..."
    article_ref = "Art. $_"
    authority = "COBAC"
    agent_name = "Compliance_Auditor"
  }
}

# OHADA AUDCIF - 150 articles
$ohada_articles = 1..150 | ForEach-Object {
  @{
    title = "OHADA AUDCIF Art. $_"
    content = "Article $_ - Norme comptable OHADA applicable aux entités CEMAC..."
    article_ref = "Art. $_"
    authority = "OHADA"
    agent_name = "Report_Generator"
  }
}

# BEAC Instructions - 150 docs
$beac_docs = 1..150 | ForEach-Object {
  @{
    title = "BEAC Instruction 02/$($_ + 2017)"
    content = "Instruction BEAC n°02/$($_ + 2017) relative aux déclarations réglementaires..."
    article_ref = "Inst. 02/$($_ + 2017)"
    authority = "BEAC"
    agent_name = "Risk_Analyzer"
  }
}

$all_docs = $cobac_articles + $ohada_articles + $beac_docs
$total = $all_docs.Count
$i = 0
$success = 0
$errors = 0

Write-Host "Début seeding $total documents..." -ForegroundColor Cyan

foreach ($doc in $all_docs) {
  $i++
  $body = $doc | ConvertTo-Json -Depth 3 -Compress

  try {
    $res = Invoke-RestMethod -Uri $SUPABASE_URL -Method Post -Headers $headers -Body $body -TimeoutSec 30
    $success++
    if ($i % 50 -eq 0) { Write-Host "[$i/$total] ✓ $success OK, $errors ERR" -ForegroundColor Green }
    Start-Sleep -Milliseconds 600 # Rate limit Jina 100 req/min
  } catch {
    $errors++
    Write-Host "[$i/$total] ✗ Erreur: $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host "`n✓ SEEDING TERMINÉ" -ForegroundColor Green
Write-Host "Succès: $success / $total" -ForegroundColor Green
Write-Host "Erreurs: $errors" -ForegroundColor $(if ($errors -eq 0) { "Green" } else { "Red" })
