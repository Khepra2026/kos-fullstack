$report=@()
$report+="=== GATE 15 BACKUP RESTORE $(Get-Date) ==="
$report+="Supabase Project: pgfwhahiwqvqeahpirjx"
$report+="1. Backup automatique Supabase: Dashboard -> Database -> Backups -> Vérifier daily backup activé"
$report+="2. Preuve: pg_dump via CLI"
$report+="   supabase db dump -f evidence/GATE15-BACKUP/backup-$(Get-Date -Format yyyyMMdd).sql --project-ref pgfwhahiwqvqeahpirjx"
$report+="3. Restore test: Créer projet isolé pgfwhahiwqvqeahpirjx-restore-test et restaurer"
$report+="4. RPO/RTO: RPO 24h (Supabase daily), RTO < 1h documenté"
$report+="Status: À EXÉCUTER MANUELLEMENT - Preuve requise pour GO"
$report | Set-Content ..\evidence\GATE15-BACKUP\GATE15-REPORT.txt -Encoding utf8
cat ..\evidence\GATE15-BACKUP\GATE15-REPORT.txt
