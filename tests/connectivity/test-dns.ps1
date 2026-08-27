# KOS REGTECH - DNS Tests
param(
  [string]$Frontend = "kos.khepraexperts.com",
  [string]$Api = "api.khepraexperts.com",
  [string]$OutJson = "reports/KOS-DNS.json"
)
$ErrorActionPreference="Continue"
function Test-DnsRecord {
  param($Name,$Type)
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $res=Resolve-DnsName -Name $Name -Type $Type -ErrorAction Stop
    $sw.Stop()
    [PSCustomObject]@{id="DNS-$Type-$Name";target=$Name;type=$Type;result="PASS";latency_ms=$sw.ElapsedMilliseconds;records=($res | Out-String);error=$null;timestamp=(Get-Date -Format o)}
  } catch {
    $sw.Stop()
    [PSCustomObject]@{id="DNS-$Type-$Name";target=$Name;type=$Type;result="FAIL";latency_ms=$sw.ElapsedMilliseconds;records=$null;error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
}
$tests=@()
$tests+=Test-DnsRecord -Name $Frontend -Type A
$tests+=Test-DnsRecord -Name $Frontend -Type AAAA
$tests+=Test-DnsRecord -Name $Frontend -Type CNAME
$tests+=Test-DnsRecord -Name $Api -Type A
$tests+=Test-DnsRecord -Name $Api -Type AAAA
$tests+=Test-DnsRecord -Name $Api -Type CNAME
$tests+=Test-DnsRecord -Name $Frontend -Type NS
# Supabase detection - try env
if($env:SUPABASE_URL){ try { $u=[uri]$env:SUPABASE_URL; $tests+=Test-DnsRecord -Name $u.Host -Type A } catch {} }

$dir=Split-Path $OutJson -Parent
if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 5 | Set-Content $OutJson -Encoding utf8
$tests | Format-Table -AutoSize
