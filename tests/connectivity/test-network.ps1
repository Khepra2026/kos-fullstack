param([string]$OutJson="reports/KOS-NETWORK.json")
$targets=@("kos.khepraexperts.com","api.khepraexperts.com","8.8.8.8","1.1.1.1")
$results=@()
foreach($t in $targets){
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $ping=Test-Connection -ComputerName $t -Count 2 -ErrorAction Stop
    $sw.Stop()
    $avg=($ping | Measure-Object -Property Latency -Average).Average
    $results+=[PSCustomObject]@{id="NET-PING-$t";target=$t;result="PASS";latency_ms=[int]$avg;error=$null;timestamp=(Get-Date -Format o)}
  } catch {
    $sw.Stop()
    $results+=[PSCustomObject]@{id="NET-PING-$t";target=$t;result="FAIL";latency_ms=$sw.ElapsedMilliseconds;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
# TCP 443 check
foreach($t in @("kos.khepraexperts.com","api.khepraexperts.com")){
  try {
    $sw=[Diagnostics.Stopwatch]::StartNew()
    $c=New-Object Net.Sockets.TcpClient
    $iar=$c.BeginConnect($t,443,$null,$null)
    $wait=$iar.AsyncWaitHandle.WaitOne(5000,$false)
    $sw.Stop()
    if($wait -and $c.Connected){ $c.Close(); $results+=[PSCustomObject]@{id="NET-TCP-443-$t";target=$t;result="PASS";latency_ms=$sw.ElapsedMilliseconds;error=$null;timestamp=(Get-Date -Format o)} } else { throw "Timeout TCP 443"}
  } catch {
    $results+=[PSCustomObject]@{id="NET-TCP-443-$t";target=$t;result="FAIL";latency_ms=$sw.ElapsedMilliseconds;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$results|ConvertTo-Json -Depth 4 | Set-Content $OutJson -Encoding utf8
$results|Format-Table
