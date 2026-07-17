#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# KOS SELF-HEALING DAEMON™ — Auto-réparation des conteneurs
# Appelé par le timer systemd kos-health.timer toutes les 5 min
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

STACK_DIR="/opt/kos-stack"
LOG_FILE="/var/log/kos-health.log"
MAX_RETRIES=3
CONTAINERS=(
  "kos-api-gateway"
  "kos-n8n-orchestrator"
  "kos-qdrant-vector"
  "kos-postgres-analytics"
  "kos-redis-queue"
  "kos-minio-storage"
  "kos-ingestion-service"
  "kos-transform-service"
  "kos-audit-service"
  "kos-queue-worker"
  "kos-memory-engine"
  "kos-governance-engine"
  "kos-prometheus"
  "kos-grafana"
)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

# Vérifier que Docker tourne
if ! docker info &>/dev/null; then
  log "${RED}[FATAL]${NC} Docker daemon n'est pas actif. Abandon auto-réparation."
  exit 1
fi

UNHEALTHY_COUNT=0
RESTARTED_COUNT=0
FAILED_COUNT=0

for CONTAINER in "${CONTAINERS[@]}"; do
  # Vérifier si le conteneur tourne
  if ! docker ps -q --filter "name=${CONTAINER}" | grep -q .; then
    log "${RED}[DOWN]${NC} ${CONTAINER} n'est pas en cours d'exécution — tentative de démarrage..."
    cd "$STACK_DIR"
    docker compose --env-file .env.docker up -d --no-deps "$CONTAINER" 2>&1 | tee -a "$LOG_FILE" || true
    ((FAILED_COUNT++)) || true
    continue
  fi

  # Vérifier le statut health
  HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo "unknown")

  case "$HEALTH" in
    healthy)
      # Tout va bien, rien à faire
      ;;
    unhealthy)
      log "${RED}[UNHEALTHY]${NC} ${CONTAINER} est unhealthy. Tentative d'auto-réparation..."
      ((UNHEALTHY_COUNT++))

      # Tentative N°1 : redémarrer le conteneur
      docker restart "$CONTAINER" &>/dev/null || true
      sleep 10

      # Vérifier après redémarrage
      HEALTH2=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo "unknown")

      if [ "$HEALTH2" = "healthy" ]; then
        log "  ${GREEN}✓${NC} ${CONTAINER} réparé après restart simple."
        ((RESTARTED_COUNT++))
      else
        # Tentative N°2 : recréer le conteneur from scratch
        log "  ${YELLOW}⟳${NC} ${CONTAINER} toujours unhealthy — recréation complète..."
        cd "$STACK_DIR"
        docker compose --env-file .env.docker up -d --force-recreate --no-deps "$CONTAINER" 2>&1 | tee -a "$LOG_FILE" || true
        sleep 15

        HEALTH3=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo "unknown")
        if [ "$HEALTH3" = "healthy" ]; then
          log "  ${GREEN}✓${NC} ${CONTAINER} réparé après recréation."
          ((RESTARTED_COUNT++))
        else
          log "  ${RED}✗${NC} ${CONTAINER} ÉCHEC après 3 tentatives — intervention manuelle requise."
          ((FAILED_COUNT++))
        fi
      fi
      ;;
    starting)
      log "  ${YELLOW}●${NC} ${CONTAINER} encore en cours de démarrage — sera vérifié au prochain cycle."
      ;;
    *)
      log "  ${YELLOW}?${NC} ${CONTAINER} statut inconnu : $HEALTH"
      ;;
  esac
done

# Résumé du cycle
echo ""
log "${BOLD}═══════════════════════════════════════════════════════════${NC}"
log "  Cycle auto-réparation terminé."
log "  ${GREEN}✓ Restartés :${NC} ${RESTARTED_COUNT}"
log "  ${RED}✗ Échecs   :${NC} ${FAILED_COUNT}"
log "  ${YELLOW}⚠ Unhealthy :${NC} ${UNHEALTHY_COUNT}"
log "${BOLD}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Si des conteneurs sont toujours en échec, envoyer une alerte (webhook/email)
if [ "$FAILED_COUNT" -gt 0 ]; then
  log "${RED}[ALERTE]${NC} ${FAILED_COUNT} conteneur(s) en échec critique — envoi alerte."
  # TODO: Intégrer webhook d'alerte (Slack/Email) via n8n
  # curl -X POST ... &>/dev/null || true
fi

exit 0