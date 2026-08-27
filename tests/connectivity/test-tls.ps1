param(
  [string]$Frontend="https://kos.khepraexperts.com",
  [string]$Api="https://api.khepraexperts.com",
  [string]$OutJson="reports/KOS-TLS.json"
)
function Test-TlsEndpoint {
  param($Url,$Id)
  $sw=[Diagnostics.Stopwatch]::StartNew()
  try {
    $req=[System.Net.HttpWebRequest]::Create($Url)
    $req.Method="HEAD"
    $req.Timeout=15000
    $resp=$req.GetResponse()
    $cert=$req.ServicePoint.Certificate
    $sw.Stop()
    $cert2=$null
    try {
      # Try to get X509 details via TcpClient for expiration
      $uri=[uri]$Url
      $tcp=New-Object Net.Sockets.TcpClient($uri.Host,443)
      $ssl=New-Object Net.Security.SslStream($tcp.GetStream(),$false,{$true})
      $ssl.AuthenticateAsClient($uri.Host)
      $cert2=$ssl.RemoteCertificate
      $x509=New-Object Security.Cryptography.X509Certificates.X509Certificate2($cert2)
      $notAfter=$x509.NotAfter
      $notBefore=$x509.NotBefore
      $subject=$x509.Subject
      $issuer=$x509.Issuer
      $days=($notAfter - (Get-Date)).Days
      $ssl.Dispose(); $tcp.Dispose()
    } catch { $notAfter=$null; $days=$null; $subject=$null; $issuer=$null }
    [PSCustomObject]@{
      id=$Id; target=$Url; result="PASS"; latency_ms=$sw.ElapsedMilliseconds;
      http_status=[int]$resp.StatusCode; tls_valid=$true; cert_notAfter=$notAfter; cert_days_left=$days;
      cert_subject=$subject; cert_issuer=$issuer; error=$null; timestamp=(Get-Date -Format o)
    }
  } catch {
    $sw.Stop()
    [PSCustomObject]@{
      id=$Id; target=$Url; result="FAIL"; latency_ms=$sw.ElapsedMilliseconds;
      http_status=$null; tls_valid=$false; cert_notAfter=$null; cert_days_left=$null;
      cert_subject=$null; cert_issuer=$null; error=$_.Exception.Message; timestamp=(Get-Date -Format o)
    }
  }
}
$tests=@()
$tests+=Test-TlsEndpoint -Url $Frontend -Id "TLS-FRONTEND"
$tests+=Test-TlsEndpoint -Url $Api -Id "TLS-API"
# Also check bare
$tests+=Test-TlsEndpoint -Url "$Api/health" -Id "TLS-API-HEALTH"
$dir=Split-Path $OutJson -Parent; if($dir -and !(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$tests|ConvertTo-Json -Depth 6 | Set-Content $OutJson -Encoding utf8
$tests|Format-Table
