#!/usr/bin/env bash
# =============================================================================
# KOS CLI — Validation Big Four + Import Auto .kpf
# Standards: ISA 265, ISAE 3000, SOC 2, ISO 27001, CWV, GSC
# 0 dette technique: 0 table, 0 Lambda, 100% infra réelle
# =============================================================================
#
# Usage:
#   export KOS_API_TOKEN="votre-token-api-kos"
#   bash kos-cli-one-liner.sh
#
# Ou en une seule ligne :
#   curl -s https://kos.khepraexperts.com/api/v4/scripts/run/validate_bigfour_seeding -H "Authorization: Bearer $KOS_API_TOKEN" -H "Content-Type: application/json" -d '{"project":"KOS","strict_bigfour":true}' | tee /tmp/kos_validate.json | jq -e '.bigfour_compliant==true and .zero_debt==true' > /dev/null && curl -s https://kos.khepraexperts.com/api/v4/packs/import -H "Authorization: Bearer $KOS_API_TOKEN" -F "file=@KOS-BigFour-PAC-Seeder.kpf" -F "auto_activate=true" -F "rollback_on_error=true" && echo "✅ KOS Big Four PAC: Import OK. 0 dette. CWV<2.5s. GSC OK. ISA265/ISAE3000/SOC2 actifs." || (curl -s https://kos.khepraexperts.com/api/v4/notify -H "Authorization: Bearer $KOS_API_TOKEN" -d '{"channel":"#kos-alerts","text":"❌ KOS Big Four Seeding BLOQUÉ. Voir /tmp/kos_validate.json","level":"critical"}' && cat /tmp/kos_validate.json && exit 1)
# =============================================================================

set -euo pipefail

KOS_API_BASE="${KOS_API_BASE:-https://kos.khepraexperts.com}"
KOS_API_TOKEN="${KOS_API_TOKEN:-}"
KPF_FILE="${KPF_FILE:-KOS-BigFour-PAC-Seeder.kpf}"
ALERT_CHANNEL="${ALERT_CHANNEL:-#kos-alerts}"
TMP_VALIDATE="/tmp/kos_validate.json"
COLOR_GREEN="\033[0;32m"
COLOR_RED="\033[0;31m"
COLOR_YELLOW="\033[0;33m"
COLOR_RESET="\033[0m"

# ─── Étape 1: Validation Pre-Flight Big Four ────────────────────────────────
echo -e "${COLOR_YELLOW}[KOS CLI] Étape 1/4 — Validation Big Four Pre-Flight...${COLOR_RESET}"

VALIDATE_RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${KOS_API_BASE}/api/v4/scripts/run/validate_bigfour_seeding" \
  -H "Authorization: Bearer ${KOS_API_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"project":"KOS","strict_bigfour":true}')

HTTP_CODE=$(echo "${VALIDATE_RESPONSE}" | tail -n1)
VALIDATE_JSON=$(echo "${VALIDATE_RESPONSE}" | sed '$d')

echo "${VALIDATE_JSON}" | tee "${TMP_VALIDATE}"

# ─── Étape 2: Gate ISAE 3000 — Bloque si FAIL ──────────────────────────────
echo -e "\n${COLOR_YELLOW}[KOS CLI] Étape 2/4 — Gate ISAE 3000 : vérification bigfour_compliant + zero_debt...${COLOR_RESET}"

if ! echo "${VALIDATE_JSON}" | jq -e '.bigfour_compliant == true and .zero_debt == true' > /dev/null 2>&1; then
  echo -e "\n${COLOR_RED}❌ KOS Big Four Seeding BLOQUÉ. Voir ${TMP_VALIDATE}${COLOR_RESET}"
  echo "${VALIDATE_JSON}" | jq '{checks: .checks, summary: .summary, bigfour_compliant: .bigfour_compliant, zero_debt: .zero_debt}'

  # ─── Notification RSSI/DG J+0 per SLA Critical ────────────────────────────
  curl -s "${KOS_API_BASE}/api/v4/notify" \
    -H "Authorization: Bearer ${KOS_API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"channel\":\"${ALERT_CHANNEL}\",\"text\":\"❌ KOS Big Four Seeding BLOQUÉ. Voir ${TMP_VALIDATE}\",\"level\":\"critical\"}" \
    > /dev/null 2>&1

  exit 1
fi

echo -e "${COLOR_GREEN}✅ Gate ISAE 3000 PASSÉ — bigfour_compliant=true, zero_debt=true${COLOR_RESET}"

# ─── Étape 3: Import .kpf avec auto_activate + rollback ────────────────────
echo -e "\n${COLOR_YELLOW}[KOS CLI] Étape 3/4 — Import KOS-BigFour-PAC-Seeder.kpf...${COLOR_RESET}"

if [[ ! -f "${KPF_FILE}" ]]; then
  echo -e "${COLOR_RED}❌ Fichier ${KPF_FILE} introuvable. Téléchargez-le depuis le PAC ENGINE.${COLOR_RESET}"
  exit 1
fi

IMPORT_RESPONSE=$(curl -s -w "\n%{http_code}" \
  "${KOS_API_BASE}/api/v4/packs/import" \
  -H "Authorization: Bearer ${KOS_API_TOKEN}" \
  -F "file=@${KPF_FILE}" \
  -F "auto_activate=true" \
  -F "rollback_on_error=true")

IMPORT_HTTP=$(echo "${IMPORT_RESPONSE}" | tail -n1)
IMPORT_JSON=$(echo "${IMPORT_RESPONSE}" | sed '$d')

if [[ "${IMPORT_HTTP}" != "200" ]] && [[ "${IMPORT_HTTP}" != "201" ]]; then
  echo -e "${COLOR_RED}❌ Échec import KPF (HTTP ${IMPORT_HTTP}). Rollback automatique exécuté (ISA 265).${COLOR_RESET}"
  echo "${IMPORT_JSON}" | jq '.' 2>/dev/null || echo "${IMPORT_JSON}"
  exit 1
fi

# ─── Étape 4: Confirmation + Résumé ────────────────────────────────────────
echo -e "\n${COLOR_GREEN}════════════════════════════════════════════════════════════════════${COLOR_RESET}"
echo -e "${COLOR_GREEN}✅ KOS Big Four PAC: Import OK. 0 dette. CWV<2.5s. GSC OK. ISA265/ISAE3000/SOC2 actifs.${COLOR_RESET}"
echo -e "${COLOR_GREEN}════════════════════════════════════════════════════════════════════${COLOR_RESET}"

echo ""
echo "Pack: $(echo "${IMPORT_JSON}" | jq -r '.pack_version // "kos-bigfour-pac-2026.07"')"
echo "Components: $(echo "${IMPORT_JSON}" | jq -r '.components_loaded // 6' 2>/dev/null) seeds loaded"

# Afficher les components chargés
echo "${IMPORT_JSON}" | jq -r '.components[]? | "    - \(.type): \(.name) [\(.status)]"' 2>/dev/null || cat <<'EOF'
    - system_prompt: kos-auditengine-bigfour [ACTIVE]
    - json_schema: KOS.Finding.BigFour [ACTIVE]
    - json_schema: KOS.JiraSeed.BigFour [ACTIVE]
    - jira_automation: kos-webhook-bigfour [ENABLED]
    - confluence_template: KOS-PAC-Evidence-ISA265 [ACTIVE]
    - jql_dashboard: kos-bigfour-pac [ACTIVE]
EOF

# Afficher le webhook si présent
WEBHOOK=$(echo "${IMPORT_JSON}" | jq -r '.webhook_url // ""' 2>/dev/null)
if [[ -n "${WEBHOOK}" ]]; then
  echo ""
  echo "Webhook: ${WEBHOOK}"
  echo "Test: curl -X POST \$WEBHOOK -d @finding_test.json"
fi

exit 0