param(
  [string]$Frontend="https://kos.khepraexperts.com",
  [string]$Api="https://api.khepraexperts.com",
  [string]$OutJson="reports/KOS-ENDPOINTS.json"
)
$ErrorActionPreference="Continue"
function Test-Http {
  param($Url,$Id,$Expected=200)
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $r=Invoke-WebRequest -Uri $Url -Method GET -TimeoutSec 15 -SkipHttpErrorCheck -ErrorAction Stop
    $sw.Stop()
    $status=[int]$r.StatusCode
    $pass = if($Expected -eq $null){ $status -lt 400 } else { $status -eq $Expected -or ($Expected -eq 200 -and $status -in @(200,301,302,304)) }
    [PSCustomObject]@{id=$Id;target=$Url;method="GET";result=($(if($pass){"PASS"}else{"FAIL"}));latency_ms=$sw.ElapsedMilliseconds;http_status=$status;expected=$Expected;body_snippet=($r.Content.Substring(0,[Math]::Min(500,$r.Content.Length)));error=$null;timestamp=(Get-Date -Format o)}
  } catch {
    $sw.Stop()
    [PSCustomObject]@{id=$Id;target=$Url;method="GET";result="FAIL";latency_ms=$sw.ElapsedMilliseconds;http_status=$null;expected=$Expected;body_snippet=$null;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$tests=@()
$tests+=Test-Http -Url "$Frontend/" -Id "FRONTEND-ROOT" -Expected 200
$tests+=Test-Http -Url "$Api/health" -Id "API-HEALTH" -Expected 200
$tests+=Test-Http -Url "$Api/ready" -Id "API-READY" -Expected 200
$tests+=Test-Http -Url "$Api/version" -Id "API-VERSION" -Expected 200
$tests+=Test-Http -Url "$Api/openapi.json" -Id "API-OPENAPI" -Expected 200
$tests+=Test-Http -Url "$Api/docs" -Id "API-DOCS" -Expected $null
$tests+=Test-Http -Url "$Api/" -Id "API-ROOT" -Expected $null
$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8
$tests|Format-Table id,result,http_status,latency_ms
