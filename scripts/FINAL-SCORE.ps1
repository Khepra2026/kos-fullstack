Write-Host "=== KOS FINAL 30 GATES - PV 65% -> 85% ===" -ForegroundColor Yellow
cat ..\evidence\PV-RECETTE-VAL-001-65PCT.txt
Write-Host "`n=== PREUVES DISPONIBLES ===" -ForegroundColor Cyan
Get-ChildItem ..\evidence -Recurse -File | Select Name,Length | Format-Table
Write-Host "`n=== PROCHAINS PASS ===" -ForegroundColor Green
Write-Host "1. Exécuter evidence\GATE5-DB\GATE5-RLS-TENANT-ISOLATION.sql dans Supabase -> Export CSV preuve"
Write-Host "2. Lancer Supabase Backup + Restore test -> evidence\GATE15-BACKUP\"
Write-Host "3. Étendre dataset 100 questions -> Tester chaque question dans /dashboard RAG -> Mesurer précision"
Write-Host "`nAprès ces 3: Score 85/100 -> GO WITH CONDITIONS"
