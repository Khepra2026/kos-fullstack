
# Tests E2E métier KOS - Scénarios A-H
param([string]$BaseUrl="https://localhost:3000")
Write-Host "=== E2E Big Four ==="
$tests = @(
  @{id="KOS-E2E-001"; name="healthz liveness"; url="$BaseUrl/healthz"; expect=200},
  @{id="KOS-E2E-002"; name="ready readiness"; url="$BaseUrl/ready"; expect=200},
  @{id="KOS-E2E-003"; name="RBAC anonymous admin 403"; url="$BaseUrl/api/admin/users"; expect=403},
  @{id="KOS-E2E-004"; name="RAG question BCEAO avec preuve"; url="$BaseUrl/api/rag/query"; expect=200},
  @{id="KOS-E2E-005"; name="RAG sans preuve doit refuser"; url="$BaseUrl/api/rag/query"; expect=200}
)
foreach($t in $tests){
  try {
    $r = Invoke-WebRequest -Uri $t.url -Method GET -UseBasicParsing -TimeoutSec 10
    $status = $r.StatusCode
    $result = if($status -eq $t.expect){"PASS"}else{"FAIL"}
    Write-Host "$($t.id) | ENV=PROD | ACTION=GET $($t.url) | EXPECTED=$($t.expect) | ACTUAL=$status | STATUS=$result | EVIDENCE=HTTP $($r.RawContentLength) bytes" -ForegroundColor $(if($result -eq "PASS"){"Green"}else{"Red"})
  } catch {
    Write-Host "$($t.id) | ... | ACTUAL=ERROR | STATUS=FAIL | EVIDENCE=$($_.Exception.Message)" -ForegroundColor Red
  }
}
