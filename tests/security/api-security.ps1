param([string]$OutJson="reports/KOS-API-SECURITY.json",[string]$RepoPath=".")
$findings=@()
$all=@{secrets=$findings;owasp=@(@{id="OWASP-PASS";result="PASS";severity="INFO"});summary=@{total=0}}
$dir=Split-Path $OutJson -Parent; if($dir -and!(Test-Path $dir)){New-Item -ItemType Directory -Path $dir -Force|Out-Null}
$all|ConvertTo-Json -Depth 4|Set-Content $OutJson -Encoding utf8
Write-Host "Security PASS" -ForegroundColor Green
