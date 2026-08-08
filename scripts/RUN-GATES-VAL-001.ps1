Write-Host "=== KOS BIG FOUR - EXECUTION 30 GATES VAL-001 ===" -ForegroundColor Yellow
Write-Host "evidence_id: 04288af8-5153-4fb5-bdfa-0fb0541707dd`n"

$steps=@(
 @{id="GATE0-BASELINE"; file="GATE0-BASELINE.ps1"; poids=5},
 @{id="GATE2-API"; file="GATE2-API.ps1"; poids=10},
 @{id="GATE5-DB"; file="GATE5-DB.ps1"; poids=10},
 @{id="GATE7-RAG"; file="GATE7-RAG.ps1"; poids=15}
)

$score=0; $total=0
foreach($s in $steps){
 Write-Host "→ $($s.id) ..." -ForegroundColor Cyan
 try{pwsh -File ".\gates\$($s.file)" -ErrorAction Stop; $score+=$s.poids; Write-Host "✅ $($s.id) PASS" -ForegroundColor Green}catch{Write-Host "❌ $($s.id) FAIL $($_.Exception.Message)" -ForegroundColor Red}
 $total+=$s.poids
}
Write-Host "`nSCORE PARTIEL: $score / $total - Les 26 autres gates à implémenter selon même modèle" -ForegroundColor Yellow
Write-Host "Dossier de preuves: .\evidence\GATE*\*.txt"
