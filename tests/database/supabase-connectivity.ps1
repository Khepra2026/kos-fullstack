param(
  [string]$OutJson="reports/KOS-SUPABASE.json"
)
$results=@()
# Check env vars
$supaUrl=$env:SUPABASE_URL
$supaAnon=$env:SUPABASE_ANON_KEY
if(-not $supaUrl){
  $results+=[PSCustomObject]@{id="SUPABASE-CONFIG";result="SKIP";details="DATABASE NOT CONFIGURED - SUPABASE_URL not present";severity="INFO";timestamp=(Get-Date -Format o)}
} else {
  $results+=[PSCustomObject]@{id="SUPABASE-CONFIG";result="PASS";details="SUPABASE_URL present (redacted)";host=([uri]$supaUrl).Host;timestamp=(Get-Date -Format o)}
  # DNS
  try {
    $hostName=([uri]$supaUrl).Host
    $dns=Resolve-DnsName -Name $hostName -ErrorAction Stop
    $results+=[PSCustomObject]@{id="SUPABASE-DNS";result="PASS";host=$hostName;records=$dns.Count;timestamp=(Get-Date -Format o)}
  } catch {
    $results+=[PSCustomObject]@{id="SUPABASE-DNS";result="FAIL";error=$_.Exception.Message;timestamp=(Get-Date -Format o)}
  }
  # HTTPS
  try {
    $r=Invoke-WebRequest -Uri "$supaUrl/rest/v1/" -Method GET -Headers @{apikey=$supaAnon} -TimeoutSec 10 -SkipHttpErrorCheck -ErrorAction Stop
    $code=[int]$r.StatusCode
    if($code -in @(200,401,403,404)){
      $results+=[PSCustomObject]@{id="SUPABASE-HTTPS";result="PASS";http_status=$code;details="Supabase API reachable";timestamp=(Get-Date -Format o)}
    } else {
      $results+=[PSCustomObject]@{id="SUPABASE-HTTPS";result="FAIL";http_status=$code;timestamp=(Get-Date -Format o)}
    }
  } catch {
    $results+=[PSCustomObject]@{id="SUPABASE-HTTPS";result="FAIL";error=$_.Exception.Message;classification="DATABASE UNAVAILABLE or DATABASE ACCESS DENIED";timestamp=(Get-Date -Format o)}
  }
}

$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$results|ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8
$results|Format-Table
