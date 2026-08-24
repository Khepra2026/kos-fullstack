#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# KOS SOVEREIGN STACK — Docker Deploy Master Script v6.0
# KHEPRA EXPERTS — Architecture Big Four Infrastructure Souveraine
# 10 Conteneurs + Qdrant 5 Collections + Prometheus/Grafana + n8n
# Usage : bash docker-deploy.sh [up|down|restart|status|logs|clean|qdrant-init]
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# ═══════════════════════════════════════════════════════════════
# COULEURS
# ═══════════════════════════════════════════════════════════════
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

# ═══════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════
ENV_FILE=".env.docker"
COMPOSE_FILE="docker-compose.yml"
COMPOSE_CMD="docker compose"

# Détection Docker Compose (plugin v2 vs standalone v1)
if docker compose version &>/dev/null 2>&1; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose &>/dev/null 2>&1; then
  COMPOSE_CMD="docker-compose"
else
  echo -e "${RED}[ERREUR]${NC} Docker Compose non trouvé. Installez-le : https://docs.docker.com/compose/install/"
  exit 1
fi

# ═══════════════════════════════════════════════════════════════
# CONTENEURS CORE (10 principaux pour le déploiement physique)
# ═══════════════════════════════════════════════════════════════
CORE_CONTAINERS=(
  "kos-api-gateway"           # 1. NGINX — Point d'entrée unifié
  "kos-n8n-orchestrator"      # 2. N8N — Orchestration Brain
  "kos-qdrant-vector"         # 3. QDRANT — Vector Intelligence
  "kos-postgres-analytics"    # 4. POSTGRESQL — Analytical Mirror (pgvector)
  "kos-redis-queue"           # 5. REDIS — Event Queue & Caching
  "kos-minio-storage"         # 6. MINIO — Object Storage S3
  "kos-ingestion-service"     # 7. INGESTION — Acquisition données
  "kos-audit-service"         # 8. AUDIT — Traçabilité ISAE 3402
  "kos-memory-engine"         # 9. MEMORY — Mémoire Stratégique
  "kos-governance-engine"     # 10. GOVERNANCE — Qualité ISO 27001
)

# Conteneurs étendus (optionnels mais recommandés)
EXTENDED_CONTAINERS=(
  "kos-prometheus"            # Monitoring
  "kos-grafana"               # Dashboards
  "kos-transform-service"     # Transform/Validation
  "kos-queue-worker"          # Worker asynchrone
  "kos-redis-audit-isae3402"  # Redis Audit ISAE 3402
  "kos-compliance-seeder-v52" # RAG Seeder
  "kos-audit-universal-v51"   # Audit Engine
  "kos-embedder-rag-v20"      # Embedding Local
)

ALL_CONTAINERS=("${CORE_CONTAINERS[@]}" "${EXTENDED_CONTAINERS[@]}")

# ═══════════════════════════════════════════════════════════════
# FONCTIONS UTILITAIRES
# ═══════════════════════════════════════════════════════════════

banner() {
  echo ""
  echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}  ${BOLD}KOS SOVEREIGN STACK — Déploiement Infrastructure${NC}           ${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}  ${GREEN}KHEPRA EXPERTS — Big Four Architecture Technique${NC}          ${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}  ${BLUE}10 Conteneurs Core + 8 Extended + ISAE 3402${NC}              ${CYAN}║${NC}"
  echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

check_env() {
  if [ ! -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}[INFO]${NC} .env.docker absent — création depuis .env..."
    if [ -f ".env" ]; then
      cp .env "$ENV_FILE"
      echo -e "${GREEN}✓${NC} .env.docker créé depuis .env"
    else
      echo -e "${RED}[ERREUR]${NC} Aucun fichier .env trouvé. Créez .env.docker avec les variables requises."
      echo ""
      echo "Variables minimales requises :"
      echo "  POSTGRES_USER=kos"
      echo "  POSTGRES_PASSWORD=<votre_mdp>"
      echo "  N8N_ENCRYPTION_KEY=<clé_32_caractères>"
      echo "  N8N_ADMIN_PASSWORD=<votre_mdp>"
      echo "  MINIO_ROOT_PASSWORD=<votre_mdp>"
      echo "  GRAFANA_ADMIN_PASSWORD=<votre_mdp>"
      echo "  VITE_PUBLIC_SUPABASE_URL=https://xxx.supabase.co"
      echo "  VITE_PUBLIC_SUPABASE_ANON_KEY=eyJ..."
      exit 1
    fi
  fi
}

check_docker() {
  if ! docker info &>/dev/null 2>&1; then
    echo -e "${RED}[ERREUR]${NC} Docker n'est pas accessible. Démarrez Docker :"
    echo "  sudo systemctl start docker"
    exit 1
  fi
  echo -e "  ${GREEN}✓${NC} Docker : $(docker --version)"
  echo -e "  ${GREEN}✓${NC} Compose : $($COMPOSE_CMD version --short 2>/dev/null || echo 'standalone')"
}

# ═══════════════════════════════════════════════════════════════
# COMMANDES
# ═══════════════════════════════════════════════════════════════

cmd_up() {
  banner
  check_docker
  check_env

  echo ""
  echo -e "${BOLD}${CYAN}[DÉPLOIEMENT]${NC} Démarrage des 10 conteneurs CORE KOS..."
  echo ""

  # Build + Up détaché
  $COMPOSE_CMD --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d --build --remove-orphans

  echo ""
  echo -e "${YELLOW}[ATTENTE]${NC} Stabilisation des conteneurs (max 120s)..."
  
  local MAX_WAIT=120
  local WAITED=0
  
  while [ $WAITED -lt $MAX_WAIT ]; do
    local TOTAL=$($COMPOSE_CMD --env-file "$ENV_FILE" ps -q 2>/dev/null | wc -l)
    local RUNNING=$(docker ps --filter "status=running" --format '{{.Names}}' | grep -c "kos-" || echo 0)
    local HEALTHY=$($COMPOSE_CMD --env-file "$ENV_FILE" ps 2>/dev/null | grep -c "healthy" || echo 0)
    
    echo -ne "  ${YELLOW}⏳${NC} ${RUNNING} running, ${HEALTHY}/${TOTAL} healthy... (${WAITED}s)\r"
    
    if [ "$TOTAL" -ge 10 ] && [ "$HEALTHY" -ge 10 ]; then
      echo ""
      echo ""
      echo -e "${BOLD}${GREEN}╔═══════════════════════════════════════════════════════════╗${NC}"
      echo -e "${BOLD}${GREEN}║  ✅ KOS SOVEREIGN STACK — 10/10+ CONTENEURS HEALTHY     ║${NC}"
      echo -e "${BOLD}${GREEN}╚═══════════════════════════════════════════════════════════╝${NC}"
      echo ""
      cmd_status_summary
      return 0
    fi
    
    sleep 5
    WAITED=$((WAITED + 5))
  done

  echo ""
  echo -e "${YELLOW}[ATTENTION]${NC} Timeout — certains conteneurs peuvent encore démarrer."
  echo -e "  Vérifiez avec : bash docker-deploy.sh status"
  cmd_status_summary
}

cmd_down() {
  banner
  echo -e "${BOLD}${RED}[ARRÊT]${NC} Arrêt de la stack KOS..."
  $COMPOSE_CMD --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down --remove-orphans
  echo -e "${GREEN}✓${NC} Stack arrêtée. Volumes préservés."
}

cmd_restart() {
  banner
  echo -e "${BOLD}${YELLOW}[REDÉMARRAGE]${NC} Redémarrage de la stack KOS..."
  $COMPOSE_CMD --env-file "$ENV_FILE" -f "$COMPOSE_FILE" restart
  echo -e "${GREEN}✓${NC} Stack redémarrée."
}

cmd_status() {
  banner
  
  echo -e "${BOLD}${CYAN}═══ STATUT DÉTAILLÉ — 10 CONTENEURS CORE ═══${NC}"
  echo ""
  
  local ALL_OK=true
  
  for CONTAINER in "${CORE_CONTAINERS[@]}"; do
    local STATUS="DOWN"
    local HEALTH="N/A"
    local UPTIME=""
    local COLOR="$RED"
    
    if docker ps -q --filter "name=${CONTAINER}" | grep -q .; then
      STATUS="UP"
      HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo "starting")
      UPTIME=$(docker inspect --format='{{.State.StartedAt}}' "$CONTAINER" 2>/dev/null | cut -d'T' -f2 | cut -d'.' -f1 || echo "")
      
      case "$HEALTH" in
        healthy) COLOR="$GREEN" ;;
        unhealthy) COLOR="$RED"; ALL_OK=false ;;
        starting) COLOR="$YELLOW" ;;
        *) COLOR="$YELLOW" ;;
      esac
    else
      ALL_OK=false
    fi
    
    # Nom court sans le préfixe kos-
    local SHORT_NAME="${CONTAINER#kos-}"
    printf "  ${COLOR}%-8s${NC} | ${BOLD}%-30s${NC} | Health: ${COLOR}%-10s${NC} | Started: %s\n" \
      "$STATUS" "$SHORT_NAME" "$HEALTH" "$UPTIME"
  done
  
  echo ""
  echo -e "${BOLD}${CYAN}═══ CONTENEURS ÉTENDUS ═══${NC}"
  echo ""
  
  for CONTAINER in "${EXTENDED_CONTAINERS[@]}"; do
    if docker ps -q --filter "name=${CONTAINER}" | grep -q .; then
      local HEALTH=$(docker inspect --format='{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo "running")
      local SHORT_NAME="${CONTAINER#kos-}"
      local ICON="$GREEN✓$NC"
      
      case "$HEALTH" in
        healthy) ICON="$GREEN✓$NC" ;;
        unhealthy) ICON="$RED✗$NC" ;;
        *) ICON="$YELLOW●$NC" ;;
      esac
      
      printf "  ${ICON} %-35s | Health: %-10s\n" "$SHORT_NAME" "$HEALTH"
    else
      printf "  ${RED}✗${NC} %-35s | %s\n" "${CONTAINER#kos-}" "DOWN"
    fi
  done
  
  echo ""
  
  if [ "$ALL_OK" = true ]; then
    echo -e "${BOLD}${GREEN}✅ TOUS LES 10 CONTENEURS CORE SONT HEALTHY${NC}"
  else
    echo -e "${BOLD}${RED}⚠️  ATTENTION : Certains conteneurs sont en erreur${NC}"
    echo -e "  Lancez l'auto-réparation : bash kos-health-check.sh"
  fi
}

cmd_status_summary() {
  echo -e "${BOLD}${CYAN}═══ RÉSUMÉ RAPIDE ═══${NC}"
  local TOTAL=$(docker ps --filter "name=kos-" --format '{{.Names}}' | wc -l)
  local HEALTHY=$(docker ps --filter "health=healthy" --filter "name=kos-" --format '{{.Names}}' | wc -l)
  printf "  Conteneurs KOS : ${GREEN}%d${NC} total, ${GREEN}%d${NC} healthy\n" "$TOTAL" "$HEALTHY"
  
  echo ""
  echo -e "${CYAN}Accès rapide :${NC}"
  echo -e "  API Gateway : ${BLUE}http://localhost:8000/health${NC}"
  echo -e "  n8n         : ${BLUE}http://localhost:5678${NC}"
  echo -e "  Qdrant      : ${BLUE}http://localhost:6333/health${NC}"
  echo -e "  MinIO       : ${BLUE}http://localhost:9001${NC}"
  echo -e "  Prometheus  : ${BLUE}http://localhost:9090${NC}"
  echo -e "  Grafana     : ${BLUE}http://localhost:3000${NC}"
  echo -e "  Postgres    : ${BLUE}localhost:5433${NC}"
  echo -e "  Redis       : ${BLUE}localhost:6380${NC}"
  echo ""
  echo -e "${CYAN}Commandes utiles :${NC}"
  echo -e "  bash docker-deploy.sh status     → Statut détaillé"
  echo -e "  bash docker-deploy.sh logs       → Logs en direct"
  echo -e "  bash docker-deploy.sh qdrant-init → Init collections Qdrant"
  echo -e "  bash kos-health-check.sh         → Auto-réparation"
}

cmd_logs() {
  local SERVICE="${1:-}"
  if [ -n "$SERVICE" ]; then
    echo -e "${CYAN}[LOGS]${NC} $SERVICE (Ctrl+C pour quitter)"
    $COMPOSE_CMD --env-file "$ENV_FILE" logs -f --tail=100 "$SERVICE"
  else
    echo -e "${CYAN}[LOGS]${NC} Tous les conteneurs (Ctrl+C pour quitter)"
    $COMPOSE_CMD --env-file "$ENV_FILE" logs -f --tail=50
  fi
}

cmd_clean() {
  banner
  echo -e "${BOLD}${RED}[NETTOYAGE COMPLET]${NC} Suppression de TOUS les conteneurs, volumes et réseaux KOS."
  echo -e "${RED}⚠️  Cette action est IRRÉVERSIBLE. Toutes les données locales seront perdues.${NC}"
  echo ""
  read -p "Tapez 'KOS-CLEAN' pour confirmer : " CONFIRM
  
  if [ "$CONFIRM" = "KOS-CLEAN" ]; then
    $COMPOSE_CMD --env-file "$ENV_FILE" -f "$COMPOSE_FILE" down -v --remove-orphans
    docker system prune -f --filter "label=kos.layer"
    echo -e "${GREEN}✓${NC} Nettoyage terminé."
  else
    echo -e "${YELLOW}Annulé.${NC}"
  fi
}

cmd_qdrant_init() {
  banner
  echo -e "${BOLD}${CYAN}[QDRANT]${NC} Initialisation des 5 collections vectorielles..."
  echo ""
  
  bash "${SCRIPT_DIR}/qdrant-init.sh"
}

cmd_health() {
  banner
  echo -e "${BOLD}${CYAN}[HEALTH CHECK]${NC} Vérification complète de l'infrastructure..."
  echo ""
  
  bash "${SCRIPT_DIR}/kos-health-check.sh"
}

# ═══════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════

show_help() {
  echo ""
  echo -e "${BOLD}KOS SOVEREIGN STACK — Commandes disponibles :${NC}"
  echo ""
  echo -e "  ${GREEN}up${NC}              Déployer tous les conteneurs (build + start)"
  echo -e "  ${RED}down${NC}            Arrêter tous les conteneurs (préserve les volumes)"
  echo -e "  ${YELLOW}restart${NC}        Redémarrer tous les conteneurs"
  echo -e "  ${CYAN}status${NC}          Afficher le statut détaillé de tous les conteneurs"
  echo -e "  ${BLUE}logs [service]${NC}  Afficher les logs (tous ou un service spécifique)"
  echo -e "  ${CYAN}qdrant-init${NC}     Initialiser les 5 collections Qdrant"
  echo -e "  ${GREEN}health${NC}          Lancer le check d'auto-réparation"
  echo -e "  ${RED}clean${NC}           Supprimer TOUT (conteneurs + volumes + données)"
  echo ""
  echo -e "${CYAN}Exemples :${NC}"
  echo -e "  bash docker-deploy.sh up"
  echo -e "  bash docker-deploy.sh logs n8n"
  echo -e "  bash docker-deploy.sh status"
  echo ""
}

case "${1:-help}" in
  up)
    cmd_up
    ;;
  down)
    cmd_down
    ;;
  restart)
    cmd_restart
    ;;
  status)
    check_docker
    cmd_status
    ;;
  status-summary)
    cmd_status_summary
    ;;
  logs)
    cmd_logs "${2:-}"
    ;;
  qdrant-init)
    cmd_qdrant_init
    ;;
  health)
    cmd_health
    ;;
  clean)
    cmd_clean
    ;;
  help|--help|-h)
    show_help
    ;;
  *)
    echo -e "${RED}Commande inconnue : $1${NC}"
    show_help
    exit 1
    ;;
esac