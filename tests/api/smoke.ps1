param(
  [string]$Api="https://api.khepraexperts.com",
  [string]$OutJson="reports/KOS-API-SMOKE.json"
)
function Test-Api {
  param($Path,$Id,$Method="GET",$Body=$null)
  $url="$Api$Path"
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $params=@{Uri=$url; Method=$Method; TimeoutSec=20; SkipHttpErrorCheck=$true}
    if($Body){ $params.Body=($Body|ConvertTo-Json -Depth 5); $params.ContentType="application/json" }
    $r=Invoke-WebRequest @params -ErrorAction Stop
    $sw.Stop()
    $isJson=$false; try { $null=$r.Content|ConvertFrom-Json; $isJson=$true } catch {}
    [PSCustomObject]@{id=$Id;target=$url;method=$Method;result=($(if($r.StatusCode -lt 500){"PASS"}else{"FAIL"}));http_status=[int]$r.StatusCode;latency_ms=$sw.ElapsedMilliseconds;is_json=$isJson;body_snippet=$r.Content.Substring(0,[Math]::Min(800,$r.Content.Length));error=$null;timestamp=(Get-Date -Format o)}
  } catch {
    $sw.Stop()
    [PSCustomObject]@{id=$Id;target=$url;method=$Method;result="FAIL";http_status=$null;latency_ms=$sw.ElapsedMilliseconds;is_json=$false;body_snippet=$null;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$tests=@()
$tests+=Test-Api -Path "/health" -Id "SMOKE-HEALTH"
$tests+=Test-Api -Path "/ready" -Id "SMOKE-READY"
$tests+=Test-Api -Path "/version" -Id "SMOKE-VERSION"
$tests+=Test-Api -Path "/openapi.json" -Id "SMOKE-OPENAPI"
$tests+=Test-Api -Path "/api/v1/rag/query" -Id "SMOKE-RAG-GET-EXPECT-405" -Method GET
$tests+=Test-Api -Path "/api/v1/crawlers" -Id "SMOKE-CRAWLERS"
$tests+=Test-Api -Path "/api/v1/watchtower/alerts" -Id "SMOKE-WATCHTOWER"
$tests+=Test-Api -Path "/admin/certification" -Id "SMOKE-ADMIN-CERT"

$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8
$tests|Format-Table id,result,http_status,latency_ms
