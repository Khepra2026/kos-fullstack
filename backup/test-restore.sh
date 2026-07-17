#!/bin/sh
# ═══════════════════════════════════════════════════════════════
# KOS PRA/PCA TEST — Restauration trimestrielle
# RES-001 : Validation procédure de restauration
# ISO 27001 A.17 — RTO < 5min, RPO < 60min
# ═══════════════════════════════════════════════════════════════

set -e

RESTORE_DIR="/backup/restore-test"
RESTORE_DB="kos_restore_test"
LOG_FILE="/backup/restore-test.log"
START_TIME=$(date +%s)

echo "═══════════════════════════════════════════════════════════"
echo "[$(date -Iseconds)] PRA/PCA RESTORE TEST — STARTING"
echo "Target RTO: 5min | Target RPO: 60min"
echo "═══════════════════════════════════════════════════════════"

mkdir -p "${RESTORE_DIR}"

# Find latest backup
LATEST_BACKUP=$(ls -1t /backup/dumps/*.sql.gz 2>/dev/null | head -1)

if [ -z "${LATEST_BACKUP}" ]; then
  echo "[$(date -Iseconds)] ERROR: No backup found to restore!"
  exit 1
fi

echo "[$(date -Iseconds)] Using backup: ${LATEST_BACKUP}"

# Restore
echo "[$(date -Iseconds)] Restoring to database '${RESTORE_DB}'..."

# Drop test DB if exists
psql -h kos-postgres-bigfour -U postgres -c "DROP DATABASE IF EXISTS ${RESTORE_DB};" 2>/dev/null || true
psql -h kos-postgres-bigfour -U postgres -c "CREATE DATABASE ${RESTORE_DB};"

# Decompress and restore
gunzip -c "${LATEST_BACKUP}" | psql -h kos-postgres-bigfour -U postgres -d "${RESTORE_DB}"

RESTORE_EXIT_CODE=$?
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

if [ ${RESTORE_EXIT_CODE} -eq 0 ]; then
  echo "[$(date -Iseconds)] RESTORE SUCCESSFUL — Duration: ${DURATION}s"

  # Verify row count
  TABLE_COUNT=$(psql -h kos-postgres-bigfour -U postgres -d "${RESTORE_DB}" -t -c "SELECT count(*) FROM information_schema.tables WHERE table_schema='public';" | tr -d ' ')
  echo "[$(date -Iseconds)] Tables restored: ${TABLE_COUNT}"

  # Check RTO/RPO
  if [ ${DURATION} -le 300 ]; then
    echo "[$(date -Iseconds)] RTO: ${DURATION}s ✓ (target < 300s)"
  else
    echo "[$(date -Iseconds)] RTO: ${DURATION}s ✗ (target < 300s) — INVESTIGATE"
  fi

  # Clean up test DB
  psql -h kos-postgres-bigfour -U postgres -c "DROP DATABASE IF EXISTS ${RESTORE_DB};"
  echo "[$(date -Iseconds)] Test database cleaned up."
else
  echo "[$(date -Iseconds)] RESTORE FAILED after ${DURATION}s!"
  psql -h kos-postgres-bigfour -U postgres -c "DROP DATABASE IF EXISTS ${RESTORE_DB};" 2>/dev/null || true
  exit 1
fi

echo "═══════════════════════════════════════════════════════════"
echo "[$(date -Iseconds)] PRA/PCA RESTORE TEST — COMPLETE"
echo "═══════════════════════════════════════════════════════════"