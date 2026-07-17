#!/bin/sh
# ═══════════════════════════════════════════════════════════════
# KOS BACKUP SCRIPT — pg_dump compressé
# DB-002 : Sauvegarde quotidienne PostgreSQL
# ═══════════════════════════════════════════════════════════════

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/dumps"
BACKUP_FILE="${BACKUP_DIR}/kos_backup_${TIMESTAMP}.sql.gz"
LOG_FILE="/backup/backup.log"

mkdir -p "${BACKUP_DIR}"

echo "[$(date -Iseconds)] Starting backup..."

pg_dump \
  -h kos-postgres-bigfour \
  -U postgres \
  -d postgres \
  --no-owner \
  --no-acl \
  --compress=9 \
  > "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
  FILE_SIZE=$(du -h "${BACKUP_FILE}" | cut -f1)
  echo "[$(date -Iseconds)] Backup successful — ${BACKUP_FILE} (${FILE_SIZE})"

  # Garder les 30 derniers backups
  BACKUP_COUNT=$(ls -1 "${BACKUP_DIR}"/*.sql.gz 2>/dev/null | wc -l)
  if [ "${BACKUP_COUNT}" -gt 30 ]; then
    ls -1t "${BACKUP_DIR}"/*.sql.gz | tail -n +31 | xargs rm -f
    echo "[$(date -Iseconds)] Cleaned old backups, keeping last 30"
  fi
else
  echo "[$(date -Iseconds)] BACKUP FAILED!"
  exit 1
fi

echo "[$(date -Iseconds)] Backup complete."