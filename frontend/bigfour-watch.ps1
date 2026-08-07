param([int]$Loop=0)
while($true){
  $h = curl.exe -s https://api.khepraexperts.com/health | ConvertFrom-Json
  $r = curl.exe -s https://api.khepraexperts.com/ready | ConvertFrom-Json
  Write-Host "$(Get-Date -Format 'HH:mm:ss') BIGFOUR=$($h.bigfour) HSTS=$($h.checks.hsts) READY=$($r.ready) EVIDENCE=$($h.evidence -join ',')" -ForegroundColor Green
  if($h.bigfour -ne 100 -or $r.ready -ne $true){ Write-Host "❌ ALERTE BIGFOUR" -ForegroundColor Red; break }
  if($Loop -eq 0){ break }
  Start-Sleep 60
}
