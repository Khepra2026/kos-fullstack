# seeding_rag_cobac.ps1 - VERSION CORRIGÉE
$JINA_KEY = "jina_TA_VRAIE_CLE"
$SUPABASE_URL = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-knowledge-hub/update"
$headers = @{
  "Authorization" = "Bearer sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "apikey" = "sb_publishable_tHDb6wdV1GrnJFVsZMUb8w_LtmLNem4"
  "Content-Type" = "application/json"
}

# Documents COBAC 2016/04 - Réglementation prudentielle
$cobac_docs = @(
  @{title="COBAC R-2016/04 Art. 1"; content="Champ d'application : établissements de crédit CEMAC..."; article_ref="Art. 1"; authority="COBAC"; agent_name="Compliance_Auditor"},
  @{title="COBAC R-2016/04 Art. 12"; content="Ratio de solvabilité minimum 8%..."; article_ref="Art. 12"; authority="COBAC"; agent_name="CFO_Agent"},
  @{title="COBAC R-2016/04 Art. 45"; content="LCB-FT : vigilance clientèle..."; article_ref="Art. 45"; authority="COBAC"; agent_name="SOC_Agent"}
)

# Documents OHADA AUDCIF
$ohada_docs = @(
  @{title="OHADA AUDCIF Art. 8"; content="États financiers : bilan, compte résultat..."; article_ref="Art. 8"; authority="OHADA"; agent_name="Report_Generator"},
  @{title="OHADA AUDCIF Art. 15"; content="Annexes obligatoires..."; article_ref="Art. 15"; authority="OHADA"; agent_name="Report_Generator"}
)

# Documents BEAC/BCEAO
$beac_docs = @(
  @{title="BEAC Instruction 02/2018"; content="Déclaration incidents opérationnels..."; article_ref="Inst. 02/2018"; authority="BEAC"; agent_name="Risk_Analyzer"}
)

$all_docs = $cobac_docs + $ohada_docs + $beac_docs
$total = $all_docs.Count
$i = 0

foreach ($doc in $all_docs) {
  $i++
  Write-Host "[$i/$total] Ingestion: $($doc.title)" -ForegroundColor Cyan
  
  $body = $doc | ConvertTo-Json -Depth 3
  try {
    Invoke-RestMethod -Uri $SUPABASE_URL -Method Post -Headers $headers -Body $body | Out-Null
    Start-Sleep -Milliseconds 500
  } catch {
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
  }
}

Write-Host "✓ Seeding terminé : $total documents ingérés" -ForegroundColor Green
