Param([string]$ApiBase="https://api.khepraexperts.com")
$trusted="https://kos.khepraexperts.com"
$evil="https://evil.com"

function Test-Cors($origin,$shouldAllow){
  $r = Invoke-WebRequest -Uri "$ApiBase/health" -Headers @{Origin=$origin} -UseBasicParsing -SkipHttpErrorCheck -TimeoutSec 15
  $acao = $r.Headers["Access-Control-Allow-Origin"]
  if($acao -is [array]){ $acao = $acao[0] }
  Write-Host "Testing Origin=$origin => ACAO=$acao"
  if($shouldAllow){
    if($acao -eq $origin){ Write-Host "CORS-ALLOWED-ORIGIN = PASS" -ForegroundColor Green; return $true }
    else { Write-Host "CORS-ALLOWED-ORIGIN = FAIL expected $origin got $acao" -ForegroundColor Red; return $false }
  } else {
    if([string]::IsNullOrEmpty($acao) -or $acao -ne $origin){
      Write-Host "CORS-EVIL-ORIGIN = PASS (correctly rejected)" -ForegroundColor Green; return $true
    } else {
      Write-Host "CORS-EVIL-ORIGIN = FAIL CRITICAL - evil allowed!" -ForegroundColor Red; return $false
    }
  }
}
$ok1 = Test-Cors $trusted $true
$ok2 = Test-Cors $evil $false
if(-not ($ok1 -and $ok2)){ exit 1 }
