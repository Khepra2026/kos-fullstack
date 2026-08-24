# ============================================================
# KOS MASTER HARDENING AUTOMATION
# Big Four Security + Backup + Migration + Audit
# Version : 2026-07-14
# ============================================================


$ErrorActionPreference = "Stop"


$PROJECT="C:\KOS DEV PLATEFORM\project-11940621"

$BACKUP_ROOT="C:\KOS BACKUPS"

$DATE=Get-Date -Format "yyyy-MM-dd_HHmm"

$REPORT="$BACKUP_ROOT\hardening_$DATE"


New-Item -ItemType Directory -Force -Path $REPORT | Out-Null


Start-Transcript `
-Path "$REPORT\execution.log"



Write-Host "
=========================================
 KOS MASTER HARDENING START
 $DATE
=========================================
"



# ============================================================
# 1. VERIFICATION ENVIRONNEMENT
# ============================================================


Write-Host "[1] Vérification outils"


docker --version

supabase --version

node --version

npm --version



# ============================================================
# 2. BACKUP COMPLET LOCAL
# ============================================================


Write-Host "[2] Backup projet"



$BACKUP="$BACKUP_ROOT\daily\$DATE"


New-Item `
-ItemType Directory `
-Force `
-Path $BACKUP | Out-Null



Write-Host "Export migrations..."

Copy-Item `
"$PROJECT\supabase\migrations" `
"$BACKUP\migrations" `
-Recurse `
-Force



Write-Host "Export source..."

Copy-Item `
"$PROJECT\src" `
"$BACKUP\src" `
-Recurse `
-Force



Write-Host "Export configuration..."

Copy-Item `
"$PROJECT\package.json" `
"$BACKUP\" `
-Force



# ============================================================
# 3. BACKUP DATABASE SCHEMA
# ============================================================


Write-Host "[3] Backup schema Supabase"


cd $PROJECT


supabase db dump `
--schema public `
-f "$BACKUP\schema.sql"



# ============================================================
# 4. VERIFICATION MIGRATIONS
# ============================================================


Write-Host "[4] Vérification migrations"


Get-ChildItem `
"$PROJECT\supabase\migrations" |
Select Name |
Out-File "$REPORT\migration_list.txt"



# Recherche fichiers invalides

Write-Host "Recherche migrations mal nommées"


Get-ChildItem `
"$PROJECT\supabase\migrations" |
Where-Object {
$_.Name -notmatch "^\d{8,}_.+\.sql$"
} |
Out-File "$REPORT\invalid_migrations.txt"



# ============================================================
# 5. APPLICATION MIGRATIONS
# ============================================================


Write-Host "[5] Push migrations"



supabase db push --include-all



# ============================================================
# 6. EXECUTION NETTOYAGE SQL SECURISE
# ============================================================


$CLEAN_SQL=
"$PROJECT\supabase\migrations\20260714_kos_cleanup_verified_safe.sql"



if(Test-Path $CLEAN_SQL)
{

Write-Host "[6] Application cleanup SQL"


supabase db execute `
-f $CLEAN_SQL

}
else
{

Write-Host "Cleanup SQL absent - étape ignorée"

}




# ============================================================
# 7. AUDIT RLS
# ============================================================


Write-Host "[7] Audit RLS"



supabase db execute `
--sql "
SELECT
tablename,
policyname,
roles,
qual,
with_check
FROM pg_policies
ORDER BY tablename;
" `
> "$REPORT\rls_audit.txt"




# ============================================================
# 8. AUDIT INDEX
# ============================================================


Write-Host "[8] Audit index PostgreSQL"



supabase db execute `
--sql "
SELECT
schemaname,
tablename,
indexname,
idx_scan,
pg_size_pretty(pg_relation_size(indexrelid))
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
" `
> "$REPORT\index_audit.txt"




# ============================================================
# 9. BUILD FRONTEND
# ============================================================


Write-Host "[9] Build frontend"



cd $PROJECT


npm install


npm run build



# ============================================================
# 10. ZIP RAPPORT
# ============================================================


Write-Host "[10] Compression rapport"



Compress-Archive `
-Path "$REPORT\*" `
-DestinationPath "$BACKUP_ROOT\kos_hardening_$DATE.zip" `
-Force



Write-Host "

=========================================
 KOS MASTER HARDENING COMPLETE
 Rapport :
 $REPORT
=========================================

"



Stop-Transcript