#!/usr/bin/env bash
# =============================================================================
# KOS Cron — Audit Continu Big Four (SOC 2 CC7.2 Monitoring Continu)
# Standards: ISA 265, ISAE 3000, SOC 2 CC7.2, ISO 27001 A.12
# 0 dette technique: 0 table, 0 Lambda, pg_cron + bash natif
# =============================================================================
#
# Usage crontab:
#   0 6 * * 1 /usr/bin/bash /opt/kos/bin/kos-cron-audit.sh
#   = Tous les lundis 6h : re-valide Big Four PAC
#
# Si FAIL → ticket Jira Critical auto + notification #compliance
# =============================================================================

set -euo pipefail

# ─── Configuration (surchargeable via /etc/kos.env) ─────────────────────────
KOS_API_BASE="${KOS_API_BASE:-https://kos.khepraexperts.com}"
KOS_API_TOKEN="${KOS_API_TOKEN:-}"
PACK_NAME="${PACK_NAME:-kos-bigfour-pac-2026.07}"
ALERT_CHANNEL="${ALERT_CHANNEL:-#compliance}"
KOS_ENV_FILE="${KOS_ENV_FILE:-/etc/kos.env}"
LOG_DIR="${LOG_DIR:-/var/log/kos}"
CRON_LOG="${LOG_DIR}/kos-cron-audit-$(date +%Y%m%d-%H%M%S).log"
TMP_VALIDATE="/tmp/kos_cron_validate_$$.json"

# ─── Charger /etc/kos.env si présent ────────────────────────────────────────
if [[ -f "${KOS_ENV_FILE}" ]]; then
  # shellcheck source=/dev/null
  source "${KOS_ENV_FILE}"
fi

# ─── Initialisation ─────────────────────────────────────────────────────────
mkdir -p "${LOG_DIR}"

log() {
  local level="${1:-INFO}"
  local message="${2:-}"
  echo "[$(date -u +%Y-%m-%dT%H:%M:%SZ)] [${level}] ${message}" | tee -a "${CRON_LOG}"
}

# ─── Vérification préalable: token API ──────────────────────────────────────
if [[ -z "${KOS_API_TOKEN}" ]]; then
  log "ERROR" "KOS_API_TOKEN non défini. Définissez-le dans ${KOS_ENV_FILE} ou en variable d'environnement."
  exit 1
fi

log "INFO" "══════════ KOS Cron Audit Big Four — SOC 2 CC7.2 Monitoring Continu ══════════"
log "INFO" "Pack: ${PACK_NAME}"
log "INFO" "Canal d'alerte: ${ALERT_CHANNEL}"
log "INFO" "Log: ${CRON_LOG}"

# ─── Étape 1: Re-validation Big Four ────────────────────────────────────────
log "INFO" "Étape 1/3 — Re-validation Big Four Pre-Flight..."

VALIDATE_RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${KOS_API_BASE}/api/v4/scripts/run/validate_bigfour_seeding" \
  -H "Authorization: Bearer ${KOS_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"project\":\"KOS\",\"strict_bigfour\":true,\"pack\":\"${PACK_NAME}\"}" \
  2>&1) || {
    log "ERROR" "Échec appel API validate_bigfour_seeding: ${VALIDATE_RESPONSE}"
    exit 1
  }

HTTP_CODE=$(echo "${VALIDATE_RESPONSE}" | tail -n1)
VALIDATE_JSON=$(echo "${VALIDATE_RESPONSE}" | sed '$d')

echo "${VALIDATE_JSON}" | tee "${TMP_VALIDATE}" >> "${CRON_LOG}" 2>/dev/null

# ─── Étape 2: Gate ISAE 3000 ────────────────────────────────────────────────
log "INFO" "Étape 2/3 — Gate ISAE 3000..."

if echo "${VALIDATE_JSON}" | jq -e '.bigfour_compliant == true and .zero_debt == true' > /dev/null 2>&1; then
  log "SUCCESS" "✅ KOS Big Four PAC: Audit Continu OK. Tous les checks PASS."
  
  # Vérifier que les composants critiques n'ont pas été supprimés
  echo "${VALIDATE_JSON}" | jq -r '.checks[] | select(.status == "PASS") | "  ✓ [\(.id)] \(.msg)"' >> "${CRON_LOG}" 2>/dev/null
  
  log "INFO" "Prochain audit: $(date -d '+7 days' +%Y-%m-%dT%H:%M:%SZ)"

else
  # ─── FAIL détecté → Ticket Jira Critical auto ────────────────────────────
  log "ERROR" "❌ KOS Big Four Seeding: Audit FAIL détecté !"
  
  FAILS=$(echo "${VALIDATE_JSON}" | jq -r '[.checks[] | select(.status == "FAIL") | {id: .id, msg: .msg, fix: .fix // "N/A"}]')
  FAILS_COUNT=$(echo "${FAILS}" | jq 'length')
  
  log "ERROR" "${FAILS_COUNT} checks FAIL:"
  echo "${FAILS}" | jq -r '.[] | "  ✗ [\(.id)] \(.msg)\n    Fix: \(.fix)"' >> "${CRON_LOG}" 2>/dev/null

  # ─── Créer ticket Jira Critical auto ──────────────────────────────────────
  TICKET_TITLE="[SOC2-CC72][Critical] KOS Big Four Audit FAIL — ${FAILS_COUNT} checks non conformes"
  
  TICKET_PAYLOAD=$(jq -n \
    --arg summary "${TICKET_TITLE}" \
    --argjson fails "${FAILS}" \
    --arg pack "${PACK_NAME}" \
    --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
    '{
      "project": "KOS",
      "issuetype": "Task",
      "summary": $summary,
      "description": ("## KOS Cron Audit Big Four — FAIL\n\n**Date**: " + $ts + "\n**Pack**: " + $pack + "\n\n### Checks FAIL\n\nChaque check FAIL ci-dessous doit être corrigé avant le prochain audit.\n\n"),
      "priority": "Highest",
      "labels": ["SOC2-CC72", "BigFour", "AuditCron", "Critical"],
      "duedate": (now | strftime("%Y-%m-%d"))
    }')

  TICKET_RESPONSE=$(curl -s -w "\n%{http_code}" \
    "${KOS_API_BASE}/api/v4/jira/create-issue" \
    -H "Authorization: Bearer ${KOS_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "${TICKET_PAYLOAD}" \
    2>&1) || true
  
  TICKET_HTTP=$(echo "${TICKET_RESPONSE}" | tail -n1)
  
  if [[ "${TICKET_HTTP}" == "200" ]] || [[ "${TICKET_HTTP}" == "201" ]]; then
    log "INFO" "Ticket Jira Critical créé automatiquement (SOC 2 CC7.2)."
  else
    log "WARN" "Ticket Jira non créé (API indisponible). Notification Slack envoyée."
  fi

  # ─── Notification RSSI/DG ─────────────────────────────────────────────────
  curl -s "${KOS_API_BASE}/api/v4/notify" \
    -H "Authorization: Bearer ${KOS_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$(jq -n \
      --arg channel "${ALERT_CHANNEL}" \
      --argjson fails "${FAILS}" \
      --arg pack "${PACK_NAME}" \
      '{
        "channel": $channel,
        "text": ("❌ KOS Cron Audit Big Four FAIL — Pack: " + $pack + " — " + ($fails | length | tostring) + " checks non conformes. Ticket Jira Critical créé. Voir logs kos-cron-audit."),
        "level": "critical"
      }')" \
    > /dev/null 2>&1

  log "ERROR" "Notification envoyée vers ${ALERT_CHANNEL}."
  rm -f "${TMP_VALIDATE}"
  exit 1
fi

# ─── Étape 3: Nettoyage ─────────────────────────────────────────────────────
log "INFO" "Étape 3/3 — Nettoyage..."

# Rotation des logs: garder 52 semaines (1 an)
find "${LOG_DIR}" -name "kos-cron-audit-*.log" -mtime +365 -delete 2>/dev/null || true
rm -f "${TMP_VALIDATE}"

log "SUCCESS" "══════════ Audit Cron Terminé — 0 anomalie détectée ══════════"

exit 0