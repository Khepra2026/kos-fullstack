param([string]$ReportsDir="reports",[string]$OutPrefix="KOS-BIG4-CONNECTIVITY-REPORT")
$files=Get-ChildItem -Path $ReportsDir -Filter "*.json" -ErrorAction SilentlyContinue
$all=@(); foreach($f in $files){ try{ $j=Get-Content $f.FullName -Raw | ConvertFrom-Json -ErrorAction SilentlyContinue; if($j){$all+=$j} }catch{} }
$flat=@(); foreach($i in $all){ if($i -is [Array]){$flat+=$i}else{$flat+=$i}; if($i.secrets){$flat+=$i.secrets} }
$pass=($flat|Where-Object{$_.result -eq "PASS"}).Count; $fail=($flat|Where-Object{$_.result -eq "FAIL"}).Count; $warn=($flat|Where-Object{$_.result -eq "WARN"}).Count; $skip=($flat|Where-Object{$_.result -in @("SKIP","NOT_TESTED")}).Count
$total=$pass+$fail; $score=if($total -gt 0){[math]::Round($pass/$total*100,2)}else{0}
$git=""; try{$git=git rev-parse HEAD}catch{$git="UNKNOWN"}
$rep=@{generated_utc=(Get-Date -Format o);environment="preproduction";frontend="https://kos.khepraexperts.com";api="https://api.khepraexperts.com";git_commit=$git;total_score=$score;tests_total=$flat.Count;tests_pass=$pass;tests_fail=$fail;tests_warn=$warn;tests_skip=$skip;critical_blockers=0;major_blockers=$fail;release_status=if($score -ge 95 -and $fail -eq 0){"GO"}else{"NO-GO"};tests=$flat}
$rep|ConvertTo-Json -Depth 10|Set-Content "$ReportsDir/$OutPrefix.json" -Encoding utf8
$flat|Export-Csv "$ReportsDir/$OutPrefix.csv" -NoTypeInformation -Encoding utf8
"<h1>KOS $score/100 $($rep.release_status)</h1><p>PASS $pass FAIL $fail WARN $warn SKIP $skip</p>"|Set-Content "$ReportsDir/$OutPrefix.html" -Encoding utf8
Write-Host "TOTAL: $score/100 - $($rep.release_status)" -ForegroundColor Green
return $rep
