Write-Host "=== GATE 7 VERACITE - BENCHMARK RAG LIVE ===" -ForegroundColor Yellow
$dataset = Get-Content ..\evidence\GATE7-VERACITE\GATE7-DATASET-100-BCEAO-UEMOA-OHADA-COBAC.json | ConvertFrom-Json

$results=@()
foreach($q in $dataset.questions){
  Write-Host "Test $($q.id): $($q.q)..." -ForegroundColor Cyan
  try{
    # Teste ton RAG réel - adapte l'endpoint si différent
    $body = @{query=$q.q; juridiction=$q.source} | ConvertTo-Json
    $resp = Invoke-RestMethod -Uri "https://kos.khepraexperts.com/api/veille" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 10 -ErrorAction SilentlyContinue
    $status = if($resp){"RAG_RESPONDED"}else{"NO_RESPONSE"}
  }catch{$status="ERROR $($_.Exception.Message)"}
  
  $results += [PSCustomObject]@{
    id=$q.id
    question=$q.q
    expected=$q.expected
    source=$q.source
    status=$status
    citation_present="A_VERIFIER_DANS_DASHBOARD"
    evidence_id="EV-$(Get-Date -Format yyyyMMddHHmmss)"
  }
}

$results | Export-Csv ..\evidence\GATE7-VERACITE\GATE7-RESULTS-VAL-001.csv -NoTypeInformation -Encoding utf8
$results | Format-Table id,expected,status

# Génère rapport veracité
$prec = $results.Count
@"
=== GATE 7 RAPPORT VERACITE $(Get-Date) ===
Dataset: $($dataset.benchmark) Evidence: $($dataset.evidence_id)
Total questions testées: $($results.Count) / 100 (6 de base, à étendre à 100)
RAG endpoint: https://kos.khepraexperts.com/api/veille
Gateway: https://kos-gateway-prod.khepra-experts.workers.dev
Status: PARTIEL - 6/100 - À étendre

REGLE ABSOLUE: Une réponse sans source vérifiable = FAIL P0

Résultats: voir GATE7-RESULTS-VAL-001.csv
Prochaine étape: Tester manuellement chaque question dans /dashboard et noter Article / Source / Date / Hash
"@ | Set-Content ..\evidence\GATE7-VERACITE\GATE7-RAPPORT.txt -Encoding utf8
cat ..\evidence\GATE7-VERACITE\GATE7-RAPPORT.txt
