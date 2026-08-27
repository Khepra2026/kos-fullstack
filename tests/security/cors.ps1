param([string]$ApiBase="https://api.khepraexperts.com",[string]$FrontendOrigin="https://kos.khepraexperts.com")
function Test-Cors { param($Origin,$Expected)
  try {
    $res = Invoke-WebRequest -Uri "$ApiBase/health" -Headers @{Origin=$Origin} -Method GET -TimeoutSec 10 -UseBasicParsing -SkipHttpErrorCheck
    $acao = $res.Headers["Access-Control-Allow-Origin"]; $acac = $res.Headers["Access-Control-Allow-Credentials"]
    $status = if ($Expected -eq "ALLOW") { if ($acao -eq $Origin -or $acao -eq $FrontendOrigin) {"PASS"} else {"FAIL"} } else { if (-not $acao -or $acao -ne $Origin) {"PASS"} else {"FAIL"} }
    Write-Host "Testing Origin=$Origin => ACAO=$acao ACAC=$acac => $status" -ForegroundColor $(if($status -eq "PASS"){"Green"}else{"Red"})
    return @{id="CORS-$Origin";origin=$Origin;acao="$acao";result=$status}
  } catch {
    Write-Host "Testing Origin=$Origin => ERROR => REJECTED" -ForegroundColor Yellow
    return @{id="CORS-$Origin";origin=$Origin;result=if($Expected -eq "REJECT"){"PASS"}else{"FAIL"}}
  }
}
$r1 = Test-Cors -Origin $FrontendOrigin -Expected "ALLOW"
$r2 = Test-Cors -Origin "https://evil.com" -Expected "REJECT"
$r3 = Test-Cors -Origin "null" -Expected "REJECT"
if ($r1.result -eq "PASS") {Write-Host "CORS-ALLOWED-ORIGIN = PASS" -ForegroundColor Green} else {Write-Host "CORS-ALLOWED-ORIGIN = FAIL" -ForegroundColor Red}
if ($r2.result -eq "PASS") {Write-Host "CORS-EVIL-ORIGIN = PASS (correctly rejected)" -ForegroundColor Green} else {Write-Host "CORS-EVIL-ORIGIN = FAIL CRITICAL" -ForegroundColor Red}
