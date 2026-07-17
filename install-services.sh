#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
# KOS SYSTEMD INSTALLER — Pose les services uniquement
# Usage : sudo bash install-services.sh
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SYSTEMD_DIR="/etc/systemd/system"
KOS_DIR="/opt/kos-stack"

echo -e "${CYAN}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║  KOS SYSTEMD INSTALLER — Services Auto-Start + Auto-Repair║${NC}"
echo -e "${CYAN}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

# Vérifier les prérequis
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERREUR]${NC} Ce script doit être exécuté en root (sudo)."
  echo "  sudo bash install-services.sh"
  exit 1
fi

# Créer le dossier KOS si nécessaire
mkdir -p "$KOS_DIR"

# Copier les fichiers du projet vers /opt/kos-stack si on n'y est pas déjà
if [ "$SCRIPT_DIR" != "$KOS_DIR" ]; then
  echo -e "${YELLOW}[COPY]${NC} Copie des fichiers vers $KOS_DIR..."

  ESSENTIALS=(
    "docker-compose.yml"
    "docker-deploy.sh"
    ".env.docker"
    "kos-health-check.sh"
    "kos-autopilot.sh"
    "config/"
    "services/"
  )

  for item in "${ESSENTIALS[@]}"; do
    if [ -e "$SCRIPT_DIR/$item" ]; then
      cp -r "$SCRIPT_DIR/$item" "$KOS_DIR/"
      echo -e "  ${GREEN}✓${NC} $item"
    fi
  done
fi

# Rendre les scripts exécutables
chmod +x "$KOS_DIR/docker-deploy.sh" 2>/dev/null || true
chmod +x "$KOS_DIR/kos-health-check.sh" 2>/dev/null || true
chmod +x "$KOS_DIR/kos-autopilot.sh" 2>/dev/null || true

# Installer les fichiers systemd
echo ""
echo -e "${CYAN}[INSTALL]${NC} Installation des services systemd..."

declare -A UNIT_FILES=(
  ["kos-stack.service"]="Service principal (démarrage stack au boot)"
  ["kos-health.service"]="Service d'auto-réparation (health check)"
  ["kos-health.timer"]="Timer d'auto-réparation (toutes les 5 min)"
)

for unit in "${!UNIT_FILES[@]}"; do
  desc="${UNIT_FILES[$unit]}"
  if [ -f "$SCRIPT_DIR/$unit" ]; then
    cp "$SCRIPT_DIR/$unit" "$SYSTEMD_DIR/$unit"
    echo -e "  ${GREEN}✓${NC} $unit → $desc"
  elif [ -f "$KOS_DIR/$unit" ]; then
    cp "$KOS_DIR/$unit" "$SYSTEMD_DIR/$unit"
    echo -e "  ${GREEN}✓${NC} $unit → $desc"
  else
    echo -e "  ${RED}✗${NC} $unit introuvable"
  fi
done

# Créer le fichier de log
touch /var/log/kos-health.log
chmod 644 /var/log/kos-health.log

# Recharger systemd
systemctl daemon-reload
echo ""
echo -e "  ${GREEN}✓${NC} Systemd rechargé."

# Activer les services
echo ""
echo -e "${CYAN}[ENABLE]${NC} Activation des services au boot..."

systemctl enable kos-stack.service 2>/dev/null && \
  echo -e "  ${GREEN}✓${NC} kos-stack.service → activé au boot" || \
  echo -e "  ${YELLOW}⚠${NC} kos-stack.service → échec activation"

systemctl enable kos-health.timer 2>/dev/null && \
  echo -e "  ${GREEN}✓${NC} kos-health.timer → activé au boot" || \
  echo -e "  ${YELLOW}⚠${NC} kos-health.timer → échec activation"

echo ""
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo -e "${BOLD}${GREEN}  SERVICES INSTALLÉS !${NC}"
echo -e "${BOLD}${GREEN}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${CYAN}Pour démarrer maintenant :${NC}"
echo -e "  sudo systemctl start kos-stack.service"
echo -e "  sudo systemctl start kos-health.timer"
echo ""
echo -e "  ${CYAN}Pour voir le statut :${NC}"
echo -e "  sudo systemctl status kos-stack.service"
echo -e "  sudo systemctl status kos-health.timer"
echo ""
echo -e "  ${CYAN}Pour les logs :${NC}"
echo -e "  sudo journalctl -u kos-stack -f"
echo -e "  sudo journalctl -u kos-health -f"
echo -e "  tail -f /var/log/kos-health.log"
echo ""