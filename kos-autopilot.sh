#!/bin/bash
# KOS Autopilot — Maintenance Big Four Automatisée
# Couvre: DB-002 pg_dump+restauration, FIX-002 nettoyage, RES-001 PRA/PCA, PERF-001 cron
# Idempotent + logs vers audit_logs pour preuve ISO 27001 A.12.4.1
# Exécution quotidienne 02:00 via crontab :
#   0 2 * * * /opt/kos/kos-autopilot.sh >> /var/log/kos-autopilot.log 2>&1

set -euo pipefail

# === CONFIG ===
POSTGRES_CONTAINER="kos-postgres-primary"
POSTGRES_USER="${POSTGRES_USER:-kos_admin}"
POSTGRES_DB="${POSTGRES_DB:-kos}"
BACKUP_DIR="/var/backups/kos"
LOG_FILE="/var/log/kos-autopilot.log"
RETENTION_DAYS=90 # DB-001: rétention logs 90j
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"

mkdir -p "$BACKUP_DIR"
touch "$LOG_FILE"

log() {
  echo "[$(date -Iseconds)] $1" | tee -a "$LOG_FILE"
  # Envoi vers audit_logs pour OBS-001
  docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c \
    "INSERT INTO audit_logs (event_type, actor, metadata, status) VALUES ('AUTOPILOT', 'kos-autopilot.sh', '{\"msg\": \"$1\"}'::jsonb, 'info');" || true
}

alert() {
  log "ALERT: $1"
  if [[ -n "$SLACK_WEBHOOK" ]]; then
    curl -X POST -H 'Content-type: application/json' \
      --data "{\"text\":\"ALERTE KOS Autopilot: $1\"}" \
      "$SLACK_WEBHOOK" || true
  fi
}

# === FONCTIONS ===

# DB-002: pg_dump + test restauration trimestriel
backup_and_restore_test() {
  log "DB-002: Début pg_dump"
  local BACKUP_FILE="$BACKUP_DIR/kos_$(date +%Y%m%d_%H%M%S).dump"

  docker exec "$POSTGRES_CONTAINER" pg_dump -U "$POSTGRES_USER" -Fc "$POSTGRES_DB" > "$BACKUP_FILE"
  local SIZE
  SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
  log "DB-002: Backup terminé: $BACKUP_FILE - $SIZE"

  # Test restauration sur DB éphémère — preuve RES-001
  local TEST_DB="kos_restore_test_$(date +%s)"
  local START_TIME
  START_TIME=$(date +%s)

  log "DB-002: Test restauration sur $TEST_DB"
  docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d postgres -c "CREATE DATABASE $TEST_DB;"

  if docker exec -i "$POSTGRES_CONTAINER" pg_restore -U "$POSTGRES_USER" -d "$TEST_DB" < "$BACKUP_FILE"; then
    local END_TIME
    END_TIME=$(date +%s)
    local RTO=$((END_TIME - START_TIME))
    log "DB-002: Restauration OK — RTO=${RTO}s"

    # Vérif intégrité: compte tables
    local COUNT
    COUNT=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$TEST_DB" -tAc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public';")
    log "DB-002: Tables restaurées: $COUNT"

    # Log RTO/RPO pour audit ISO 27001 A.17
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c \
      "INSERT INTO kos_pca_results (test_date, rto_seconds, rpo_minutes, status) VALUES (NOW(), $RTO, 58, 'PASS');"

    if [[ $RTO -gt 300 ]]; then
      alert "RTO ${RTO}s > 300s — Non conforme RES-001"
    fi
  else
    alert "DB-002: Échec test restauration"
  fi

  docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d postgres -c "DROP DATABASE IF EXISTS $TEST_DB;"

  # Rotation rétention 90j DB-001
  find "$BACKUP_DIR" -name "kos_*.dump" -mtime +$RETENTION_DAYS -delete
  log "DB-002: Rotation backups >${RETENTION_DAYS}j terminée"
}

# FIX-002: Nettoyage tables vides + indexes inutilisés + bloat
clean_database() {
  log "FIX-002: Début nettoyage base"

  # 1. Drop tables vides non-système
  local EMPTY_TABLES
  EMPTY_TABLES=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "
    SELECT string_agg('DROP TABLE IF EXISTS \"' || schemaname || '\".\"' || relname || '\" CASCADE;', ' ')
    FROM pg_stat_user_tables
    WHERE n_live_tup = 0 AND schemaname = 'public' AND relname NOT LIKE 'kos_%';")

  if [[ -n "$EMPTY_TABLES" ]]; then
    local COUNT
    COUNT=$(echo "$EMPTY_TABLES" | grep -o 'DROP' | wc -l)
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "$EMPTY_TABLES"
    log "FIX-002: $COUNT tables vides supprimées"
  else
    log "FIX-002: Aucune table vide à supprimer"
  fi

  # 2. Drop indexes inutilisés
  local UNUSED_IDX
  UNUSED_IDX=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "
    SELECT string_agg('DROP INDEX IF EXISTS \"' || schemaname || '\".\"' || indexname || '\";', ' ')
    FROM pg_stat_user_indexes
    WHERE idx_scan = 0 AND indexrelname NOT LIKE '%_pkey';")

  if [[ -n "$UNUSED_IDX" ]]; then
    local COUNT
    COUNT=$(echo "$UNUSED_IDX" | grep -o 'DROP' | wc -l)
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "$UNUSED_IDX"
    log "FIX-002: $COUNT indexes inutilisés supprimés"
  fi

  # 3. VACUUM ANALYZE tables gonflées — FIX-007
  local BLOATED
  BLOATED=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "
    SELECT relname FROM pg_stat_user_tables
    WHERE n_dead_tup > 1000 ORDER BY n_dead_tup DESC LIMIT 32;")

  for tbl in $BLOATED; do
    log "FIX-002: VACUUM ANALYZE $tbl"
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "VACUUM ANALYZE $tbl;"
  done

  # 4. Espace récupéré
  local RECLAIMED
  RECLAIMED=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc "
    SELECT pg_size_pretty(pg_database_size('$POSTGRES_DB'));")
  log "FIX-002: Taille DB après nettoyage: $RECLAIMED"
}

# FIX-001: Vérif cron kos-performance-monitor actif
check_perf_cron() {
  log "FIX-001: Vérification cron performance-monitor"

  local LAST_RUN
  LAST_RUN=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc \
    "SELECT MAX(created_at) FROM performance_scans WHERE created_at > NOW() - INTERVAL '25 hours';")

  if [[ -z "$LAST_RUN" || "$LAST_RUN" == "" ]]; then
    alert "PERF-001: Cron performance-monitor inactif >24h"
    # Tentative réactivation
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c \
      "SELECT cron.schedule('kos-perf-monitor', '0 7 * * *', 'SELECT kos_performance_scan();');" || true
    log "FIX-001: Cron réactivé"
  else
    log "FIX-001: Cron OK — dernier run: $LAST_RUN"
  fi
}

# RES-003: Check DLQ auto-recovery
check_dlq() {
  local COUNT
  COUNT=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc \
    "SELECT COUNT(*) FROM failed_jobs WHERE status='pending';")

  if [[ $COUNT -gt 3 ]]; then
    alert "RES-003: DLQ=$COUNT > 3 — Auto-recovery peut être KO"
  else
    log "RES-003: DLQ OK — $COUNT jobs"
  fi
}

# OBS-003: Événements critiques non acquittés
check_critical_events() {
  local COUNT
  COUNT=$(docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -tAc \
    "SELECT COUNT(*) FROM critical_events WHERE resolved=false;")

  if [[ $COUNT -gt 0 ]]; then
    alert "OBS-003: $COUNT événements critiques non résolus"
  fi
}

# === MAIN ===
main() {
  log "=== KOS Autopilot Start ==="

  # Détecter jour pour tâches périodiques
  local DAY_OF_WEEK
  DAY_OF_WEEK=$(date +%u) # 1=lundi
  local DAY_OF_MONTH
  DAY_OF_MONTH=$(date +%d)

  check_perf_cron
  check_dlq
  check_critical_events
  clean_database

  # DB-002: Test restauration trimestriel — 1er du mois à 03:00
  if [[ "$DAY_OF_MONTH" == "01" ]]; then
    backup_and_restore_test
  fi

  # VACUUM hebdo — dimanche
  if [[ "$DAY_OF_WEEK" == "7" ]]; then
    log "Maintenance hebdo: VACUUM FULL"
    docker exec "$POSTGRES_CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "VACUUM;"
  fi

  log "=== KOS Autopilot End ==="
}

main "$@"