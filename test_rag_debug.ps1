# test_rag_debug.ps1
$headers = @{
  "apikey" = "sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "Authorization" = "Bearer sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "Content-Type" = "application/json"
}

Write-Host "1. Test existence table knowledge_base..." -ForegroundColor Cyan
try {
  $count = Invoke-RestMethod -Uri "https://pgfwhahiwqvqeahpirjx.supabase.co/rest/v1/knowledge_base?select=id" -Headers $headers
  Write-Host "✓ Table existe. Rows: $($count.Count)" -ForegroundColor Green
} catch {
  Write-Host "✗ Table manquante: $($_.Exception.Message)" -ForegroundColor Red
  exit
}

Write-Host "`n2. Test insertion doc..." -ForegroundColor Cyan
$testDoc = @{
  title = "COBAC R-2016/04 Art. 12"
  content = "Le ratio de solvabilité minimum des établissements de crédit est fixé à 8% des risques pondérés."
  article_ref = "Art. 12"
  authority = "COBAC"
  agent_name = "Compliance_Auditor"
} | ConvertTo-Json

try {
  $res = Invoke-RestMethod -Uri "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-knowledge-hub/update" -Method Post -Body $testDoc -Headers $headers
  Write-Host "✓ Insertion OK: $($res | ConvertTo-Json)" -ForegroundColor Green
} catch {
  Write-Host "✗ Erreur insertion: $($_.Exception.Response.StatusCode) $($_.Exception.Message)" -ForegroundColor Red
  Write-Host "Logs: supabase functions logs kos-knowledge-hub --tail" -ForegroundColor Yellow
  exit
}

Write-Host "`n3. Test search RAG..." -ForegroundColor Cyan
$testQuery = @{
  query = "ratio solvabilité minimum"
  agent_name = "Compliance_Auditor"
  top_k = 3
} | ConvertTo-Json

try {
  $res = Invoke-RestMethod -Uri "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-knowledge-hub/search" -Method Post -Body $testQuery -Headers $headers
  Write-Host "✓ RAG OK:" -ForegroundColor Green
  $res | ConvertTo-Json -Depth 5
} catch {
  Write-Host "✗ Erreur search: $($_.Exception.Message)" -ForegroundColor Red
}
