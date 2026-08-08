Write-Host "=== GATE 15 BACKUP / RESTORE ===" -ForegroundColor Yellow
$report=@()
$report+="Date: $(Get-Date)"
$report+="Project: pgfwhahiwqvqeahpirjx.supabase.co"
$report+="Evidence: 04288af8"
$report+=""
$report+="Preuve 1 - Backup automatique Supabase (Dashboard):"
$report+="  → https://supabase.com/dashboard/project/pgfwhahiwqvqeahpirjx/database/backups"
$report+="  → Screenshot daily backup enabled + PITR enabled = preuve P1"
$report+=""
$report+="Preuve 2 - Backup manuel via CLI (optionnel):"
$report+="  npx supabase login"
$report+="  npx supabase db dump --project-ref pgfwhahiwqvqeahpirjx -f evidence/GATE15-BACKUP/backup-`$(Get-Date -Format yyyyMMdd).sql"
$report+=""
$report+="Preuve 3 - Restore test:"
$report+="  - Créer projet vide: npx supabase projects create kos-restore-test"
$report+="  - Restore: psql backup.sql"
$report+="  - Vérifier count=3 dans kos_agents"
$report+=""
$report+="RPO: 24h (daily backup) RTO: <1h"
$report+="Status: MANUEL - Preuve screenshot requise"
$report | Set-Content evidence\GATE15-BACKUP\GATE15-MANUAL-STEPS.txt -Encoding utf8
cat evidence\GATE15-BACKUP\GATE15-MANUAL-STEPS.txt
