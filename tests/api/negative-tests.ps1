param(
  [string]$Api="https://api.khepraexperts.com",
  [string]$OutJson="reports/KOS-NEGATIVE.json"
)
function Test-Neg {
  param($Path,$Id,$Method="POST",$Body,$ContentType="application/json")
  $url="$Api$Path"
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $p=@{Uri=$url;Method=$Method;TimeoutSec=15;SkipHttpErrorCheck=$true;ContentType=$ContentType}
    if($null -ne $Body){ if($Body -is [string]){$p.Body=$Body}else{$p.Body=($Body|ConvertTo-Json)} }
    $r=Invoke-WebRequest @p -ErrorAction Stop
    $sw.Stop()
    $code=[int]$r.StatusCode
    $expectedPass = $code -in @(400,401,403,404,405,422)
    [PSCustomObject]@{id=$Id;target=$url;method=$Method;result=($(if($expectedPass){"PASS"}else{"WARN"}));http_status=$code;latency_ms=$sw.ElapsedMilliseconds;body_snippet=$r.Content.Substring(0,[Math]::Min(500,$r.Content.Length));timestamp=(Get-Date -Format o)}
  } catch {
    $sw.Stop()
    [PSCustomObject]@{id=$Id;target=$url;method=$Method;result="FAIL";http_status=$null;latency_ms=$sw.ElapsedMilliseconds;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$tests=@()
$tests+=Test-Neg -Path "/api/v1/rag/query" -Id "NEG-RAG-EMPTY" -Body @{}
$tests+=Test-Neg -Path "/api/v1/rag/query" -Id "NEG-RAG-INVALID-JSON" -Body "not json" 
$tests+=Test-Neg -Path "/api/v1/rag/query" -Id "NEG-RAG-HUGE" -Body @{query="A"*10000}
$tests+=Test-Neg -Path "/api/v1/rag/query" -Id "NEG-RAG-WRONG-TYPE" -Body @{query=12345}
$tests+=Test-Neg -Path "/api/v1/rag/query" -Id "NEG-RAG-UNKNOWN-PARAM" -Body @{query="test"; unknown_param="xxx"}
$tests+=Test-Neg -Path "/nonexistent-route-xyz" -Id "NEG-404" -Method GET -Body $null
$tests+=Test-Neg -Path "/api/v1/crawlers" -Id "NEG-CRAWLERS-INJECTION" -Method GET

$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8
$tests|Format-Table
