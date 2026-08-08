Write-Host "== NPM Audit ==" -ForegroundColor Cyan
npm audit --audit-level=high
Write-Host "`n== Python pip-audit ==" -ForegroundColor Cyan
pip install pip-audit -q
pip-audit
Write-Host "`n== RLS Check Supabase ==" -ForegroundColor Cyan
Get-Content evidence\GATE5-DB\GATE5-FULL-RLS.sql | Select-String "ENABLE ROW LEVEL SECURITY" | Measure-Object
