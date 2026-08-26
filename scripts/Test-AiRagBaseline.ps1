param([string]$RepoPath)
Write-Host "=== AI/RAG §12-15 ==="

# RAG pipeline checks
$pipeline = @("SOURCE","INGESTION","NORMALISATION","CHUNKING","EMBEDDING","VECTOR STORE","RETRIEVAL","RERANK","GENERATION","CITATION")
$ragFiles = Get-ChildItem -Path "$RepoPath/backend/ai","$RepoPath/src/modules/rag" -Recurse -Include "*.ts","*.py" -ErrorAction SilentlyContinue

# Check provenance fields
$provFields = @("source","url","date","version","hash","statut")
foreach($f in $provFields){
  $found = Select-String -Path "$RepoPath/**/*.ts" -Pattern $f -ErrorAction SilentlyContinue | Measure-Object
  if($found.Count -eq 0){ Write-Host "WARNING: Provenance field '$f' not found in code" -ForegroundColor Yellow }
}

# Check prompt injection tests
$injTests = Get-ChildItem -Path $RepoPath/tests -Recurse -Include "*injection*","*ai*security*" -ErrorAction SilentlyContinue
if(!$injTests){ Write-Host "FAIL: No AI security tests (prompt injection) - mandatory §15" -ForegroundColor Red } else { Write-Host "PASS: AI security tests found" -ForegroundColor Green }

# Check least privilege
$toolAbuse = Select-String -Path "$RepoPath/**/*.ts" -Pattern "tool.*privilege|allow.*all|dangerously" -ErrorAction SilentlyContinue
if($toolAbuse){ Write-Host "WARNING: Potential excessive agency" -ForegroundColor Yellow; $toolAbuse | Select-Object -First 5 | Format-Table }

# Dataset regression
if(!(Test-Path "$RepoPath/tests/ai/regression_dataset.json")){ Write-Host "FAIL: No AI regression dataset - mandatory §14" -ForegroundColor Red }

Write-Host "AI/RAG BASELINE DONE"
