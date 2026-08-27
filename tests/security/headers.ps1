param(
  [string]$Frontend="https://kos.khepraexperts.com",
  [string]$Api="https://api.khepraexperts.com",
  [string]$OutJson="reports/KOS-HEADERS.json"
)
function Check-Headers {
  param($Url,$Id)
  try {
    $r=Invoke-WebRequest -Uri $Url -Method HEAD -TimeoutSec 15 -SkipHttpErrorCheck -ErrorAction Stop
    $h=$r.Headers
    $checks=@()
    $checks+=[PSCustomObject]@{header="Strict-Transport-Security";present=($h.ContainsKey("Strict-Transport-Security") -or $h["Strict-Transport-Security"]);severity=($(if($h.ContainsKey("Strict-Transport-Security")){"PASS"}else{"WARN"}))}
    $checks+=[PSCustomObject]@{header="X-Content-Type-Options";present=$h.ContainsKey("X-Content-Type-Options");severity=($(if($h["X-Content-Type-Options"] -eq "nosniff"){"PASS"}else{"WARN"}))}
    $checks+=[PSCustomObject]@{header="Content-Security-Policy";present=$h.ContainsKey("Content-Security-Policy");severity=($(if($h.ContainsKey("Content-Security-Policy")){"PASS"}else{"WARN"}))}
    $checks+=[PSCustomObject]@{header="Referrer-Policy";present=$h.ContainsKey("Referrer-Policy");severity=($(if($h.ContainsKey("Referrer-Policy")){"PASS"}else{"WARN"}))}
    $checks+=[PSCustomObject]@{header="X-Frame-Options";present=$h.ContainsKey("X-Frame-Options");severity=($(if($h.ContainsKey("X-Frame-Options")){"PASS"}else{"WARN"}))}
    [PSCustomObject]@{id=$Id;target=$Url;result="PASS";headers=$h;checks=$checks;timestamp=(Get-Date -Format o)}
  } catch {
    [PSCustomObject]@{id=$Id;target=$Url;result="FAIL";error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$tests=@()
$tests+=Check-Headers -Url $Frontend -Id "HEADERS-FRONTEND"
$tests+=Check-Headers -Url $Api -Id "HEADERS-API"
$tests+=Check-Headers -Url "$Api/health" -Id "HEADERS-API-HEALTH"
$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 8 | Set-Content $OutJson -Encoding utf8
$tests|Format-List
