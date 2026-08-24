#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# KHEPRA DEPLOY PLAYBOOK™ v2.0
# Stack : Readdy.ai (Build) → Netlify (CDN) → Supabase (DB + Edge)
# Usage: bash scripts/deploy-khepra.sh [local|staging|prod|health]
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

# ─── Couleurs ───
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

DEPLOY_MODE="${1:-local}"
START_TIME=$(date +%s)
EXIT_CODE=0

declare -a DEPLOY_STEPS=()
declare -a DEPLOY_ERRORS=()

banner() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}  ${BOLD}KHEPRA DEPLOY PLAYBOOK™ v2.0${NC}                                  ${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}  Mode: ${BOLD}${DEPLOY_MODE}${NC} | Target: ${BOLD}Netlify + Supabase${NC}                  ${CYAN}║${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

log_step() {
  local step="$1"
  DEPLOY_STEPS+=("$step")
  echo ""
  echo -e "${CYAN}[$(printf '%02d' ${#DEPLOY_STEPS[@]})]${NC} ${BOLD}$step${NC}"
}

log_ok() {
  echo -e "  ${GREEN}✓${NC} $1"
}

log_warn() {
  echo -e "  ${YELLOW}⚠${NC} $1"
}

log_err() {
  echo -e "  ${RED}✗${NC} $1"
  DEPLOY_ERRORS+=("$1")
  EXIT_CODE=1
}

elapsed() {
  local now=$(date +%s)
  echo $((now - START_TIME))
}

# ─════════════════════════════════════════════════════════════════
# PHASE 0 — PRÉREQUIS
# ─════════════════════════════════════════════════════════════════
phase_prereqs() {
  log_step "Phase 0 — Vérification des prérequis"

  # Node.js ≥ 20
  if command -v node &>/dev/null; then
    NODE_VERSION=$(node -v | sed 's/v//')
    MAJOR=$(echo "$NODE_VERSION" | cut -d. -f1)
    if [ "$MAJOR" -ge 20 ]; then
      log_ok "Node.js v${NODE_VERSION}"
    else
      log_err "Node.js v${NODE_VERSION} — minimum v20 requis"
      return 1
    fi
  else
    log_err "Node.js non installé"
    return 1
  fi

  # npm
  if command -v npm &>/dev/null; then
    log_ok "npm $(npm -v)"
  else
    log_err "npm non disponible"
    return 1
  fi

  # Supabase CLI (optionnel — pour migrations & edge functions)
  if command -v supabase &>/dev/null; then
    log_ok "Supabase CLI $(supabase -v 2>/dev/null | awk '{print $3}')"
  else
    log_warn "Supabase CLI non installé — sauter les migrations DB"
  fi

  # Netlify CLI (optionnel — pour deploy manuel)
  if command -v netlify &>/dev/null; then
    log_ok "Netlify CLI"
  else
    log_warn "Netlify CLI non installé — deploy via Readdy.ai recommandé"
  fi

  # Vérifier .env
  if [ -f ".env" ]; then
    log_ok ".env présent"
  else
    log_warn ".env manquant — copiez .env.example vers .env"
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 1 — INSTALL DÉPENDANCES
# ─════════════════════════════════════════════════════════════════
phase_install() {
  log_step "Phase 1 — Installation des dépendances"

  if [ -d "node_modules" ]; then
    log_warn "node_modules existe déjà — skip npm ci (utilisez --clean pour forcer)"
  else
    npm ci --prefer-offline --no-audit 2>&1 | tail -n 3
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
      log_ok "npm ci terminé"
    else
      log_err "npm ci a échoué"
      return 1
    fi
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 2 — QUALITÉ PRÉ-BUILD (SEO Governance + TypeCheck + Lint)
# ─════════════════════════════════════════════════════════════════
phase_quality() {
  log_step "Phase 2 — Qualité & Gouvernance SEO"

  # 2.1 — SEO Governance Validator
  if [ -f "scripts/validate-domain.sh" ]; then
    bash scripts/validate-domain.sh
    if [ $? -eq 0 ]; then
      log_ok "SEO Governance Validator — PASSED"
    else
      log_err "SEO Governance Validator — FAILED (voir ci-dessus)"
      return 1
    fi
  else
    log_warn "scripts/validate-domain.sh introuvable — skip"
  fi

  # 2.2 — TypeScript type check
  if npm run type-check > /tmp/type-check.log 2>&1; then
    log_ok "TypeScript type-check — PASSED"
  else
    log_err "TypeScript type-check — FAILED"
    echo ""
    tail -n 20 /tmp/type-check.log | sed 's/^/    /'
    return 1
  fi

  # 2.3 — ESLint
  if npm run lint > /tmp/lint.log 2>&1; then
    log_ok "ESLint — PASSED"
  else
    log_warn "ESLint — WARNINGS (non bloquant)"
    tail -n 10 /tmp/lint.log | sed 's/^/    /'
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 3 — BUILD FRONTEND (Vite → dist/)
# ─════════════════════════════════════════════════════════════════
phase_build() {
  log_step "Phase 3 — Build frontend Vite"

  rm -rf dist/

  if npm run build > /tmp/build.log 2>&1; then
    log_ok "Build Vite terminé"
  else
    log_err "Build Vite a échoué"
    echo ""
    tail -n 30 /tmp/build.log | sed 's/^/    /'
    return 1
  fi

  # Vérifier que dist/ existe et contient index.html
  if [ -f "dist/index.html" ]; then
    log_ok "dist/index.html présent"
  else
    log_err "dist/index.html manquant — build incomplet"
    return 1
  fi

  # Taille du build
  BUILD_SIZE=$(du -sh dist/ 2>/dev/null | cut -f1)
  log_ok "Taille build: ${BUILD_SIZE}"

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 4 — SUPABASE MIGRATIONS
# ─════════════════════════════════════════════════════════════════
phase_supabase_migrations() {
  log_step "Phase 4 — Supabase DB Migrations"

  if ! command -v supabase &>/dev/null; then
    log_warn "Supabase CLI non disponible — skip migrations"
    return 0
  fi

  # Vérifier connexion
  if supabase status > /tmp/supabase-status.log 2>&1; then
    log_ok "Supabase connecté"
  else
    log_warn "Supabase non connecté localement — migrations manuelles via SQL Editor"
    return 0
  fi

  # Lister les migrations
  MIGRATIONS=$(ls supabase/migrations/*.sql 2>/dev/null || true)
  if [ -z "$MIGRATIONS" ]; then
    log_warn "Aucune migration SQL trouvée dans supabase/migrations/"
    return 0
  fi

  MIGRATION_COUNT=$(echo "$MIGRATIONS" | wc -l | tr -d ' ')
  log_ok "${MIGRATION_COUNT} migration(s) détectée(s)"

  # Pour le mode prod/staging, faire un db push
  if [ "$DEPLOY_MODE" = "prod" ] || [ "$DEPLOY_MODE" = "staging" ]; then
    log_warn "Migration auto désactivée — exécutez manuellement dans Supabase SQL Editor:"
    for m in $MIGRATIONS; do
      echo -e "  ${YELLOW}→${NC} $m"
    done
  else
    log_ok "Mode local — migrations non appliquées (utilisez SQL Editor pour prod)"
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 5 — SUPABASE EDGE FUNCTIONS
# ─════════════════════════════════════════════════════════════════
phase_supabase_edge_functions() {
  log_step "Phase 5 — Supabase Edge Functions"

  if ! command -v supabase &>/dev/null; then
    log_warn "Supabase CLI non disponible — skip Edge Functions"
    return 0
  fi

  FUNCTIONS=$(ls supabase/functions/*/index.ts 2>/dev/null | wc -l | tr -d ' ')
  log_ok "${FUNCTIONS} Edge Function(s) détectée(s)"

  if [ "$DEPLOY_MODE" = "prod" ] || [ "$DEPLOY_MODE" = "staging" ]; then
    log_warn "Deploy Edge Functions via Supabase Dashboard ou CLI:"
    echo -e "  ${YELLOW}→${NC} supabase functions deploy"
    echo -e "  ${YELLOW}→${NC} supabase secrets set OPENAI_API_KEY=xxx"
  else
    log_ok "Mode local — Edge Functions non déployées"
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 6 — NETLIFY EDGE FUNCTIONS
# ─════════════════════════════════════════════════════════════════
phase_netlify_edge() {
  log_step "Phase 6 — Netlify Edge Functions"

  EDGE_COUNT=$(ls netlify/edge-functions/*.ts 2>/dev/null | wc -l | tr -d ' ')
  log_ok "${EDGE_COUNT} Edge Function(s) Netlify détectée(s)"

  # Vérifier que netlify.toml pointe vers les bonnes fonctions
  if [ -f "netlify.toml" ]; then
    CONFIGURED=$(grep -c 'function = ' netlify.toml 2>/dev/null || echo "0")
    log_ok "${CONFIGURED} fonctions configurées dans netlify.toml"
  else
    log_err "netlify.toml manquant"
    return 1
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 7 — LIGHTHOUSE CI (Build local)
# ─════════════════════════════════════════════════════════════════
phase_lighthouse() {
  log_step "Phase 7 — Lighthouse CI (build local)"

  if ! command -v lhci &>/dev/null; then
    log_warn "Lighthouse CI non installé — skip"
    return 0
  fi

  if lhci autorun --config=.lighthouserc.json > /tmp/lhci.log 2>&1; then
    log_ok "Lighthouse CI — PASSED"
  else
    log_warn "Lighthouse CI — WARNINGS (voir /tmp/lhci.log)"
    tail -n 10 /tmp/lhci.log | sed 's/^/    /'
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 8 — DÉPLOIEMENT NETLIFY
# ─════════════════════════════════════════════════════════════════
phase_netlify_deploy() {
  log_step "Phase 8 — Déploiement Netlify"

  if [ "$DEPLOY_MODE" = "local" ]; then
    log_ok "Mode local — pas de deploy Netlify"
    log_ok "Utilisez Readdy.ai 'Publish' pour deploy, ou:"
    echo -e "  ${YELLOW}→${NC} netlify deploy --prod --dir=dist"
    return 0
  fi

  if ! command -v netlify &>/dev/null; then
    log_warn "Netlify CLI non disponible — deploy manuel via Readdy.ai"
    return 0
  fi

  if [ "$DEPLOY_MODE" = "staging" ]; then
    netlify deploy --dir=dist --json > /tmp/netlify-deploy.json 2>&1
    if [ $? -eq 0 ]; then
      PREVIEW_URL=$(cat /tmp/netlify-deploy.json | grep -o '"deploy_url":"[^"]*"' | cut -d'"' -f4)
      log_ok "Staging deploy: ${PREVIEW_URL}"
    else
      log_err "Netlify staging deploy failed"
      return 1
    fi
  elif [ "$DEPLOY_MODE" = "prod" ]; then
    netlify deploy --prod --dir=dist --json > /tmp/netlify-deploy.json 2>&1
    if [ $? -eq 0 ]; then
      LIVE_URL=$(cat /tmp/netlify-deploy.json | grep -o '"url":"[^"]*"' | head -1 | cut -d'"' -f4)
      log_ok "Production deploy: ${LIVE_URL}"
    else
      log_err "Netlify production deploy failed"
      return 1
    fi
  fi

  return 0
}

# ─════════════════════════════════════════════════════════════════
# PHASE 9 — HEALTH CHECK POST-DÉPLOIEMENT
# ─════════════════════════════════════════════════════════════════
phase_health_check() {
  log_step "Phase 9 — Health Check post-déploiement"

  local target_url
  if [ "$DEPLOY_MODE" = "prod" ]; then
    target_url="https://khepraexperts.com"
  elif [ "$DEPLOY_MODE" = "staging" ]; then
    target_url="${PREVIEW_URL:-https://deploy-preview--khepraexperts.netlify.app}"
  else
    target_url="http://localhost:4173"
    log_warn "Mode local — health check sur $target_url (npm run preview d'abord)"
  fi

  bash "$SCRIPT_DIR/health-check.sh" "$target_url"

  return $?
}

# ─════════════════════════════════════════════════════════════════
# RAPPORT FINAL
# ─════════════════════════════════════════════════════════════════
report() {
  local duration=$(elapsed)
  echo ""
  echo -e "${CYAN}══════════════════════════════════════════════════════════════════${NC}"

  if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}  ██████  KHEPRA DEPLOY — SUCCESS  ██████${NC}"
  else
    echo -e "${RED}  ██████  KHEPRA DEPLOY — PARTIAL/FAILURE  ██████${NC}"
  fi

  echo -e "${CYAN}══════════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "  ${BOLD}Durée:${NC} ${duration}s"
  echo -e "  ${BOLD}Étapes:${NC} ${#DEPLOY_STEPS[@]}"
  echo -e "  ${BOLD}Erreurs:${NC} ${#DEPLOY_ERRORS[@]}"
  echo ""

  if [ ${#DEPLOY_ERRORS[@]} -gt 0 ]; then
    echo "  ${RED}Erreurs rencontrées:${NC}"
    for e in "${DEPLOY_ERRORS[@]}"; do
      echo -e "  ${RED}✗${NC} $e"
    done
    echo ""
  fi

  if [ $EXIT_CODE -eq 0 ]; then
    echo -e "  ${GREEN}Stack:${NC} Supabase + Netlify (Readdy.ai)"
    echo -e "  ${GREEN}Edge Functions:${NC} Supabase + Netlify"
    echo -e "  ${GREEN}KOS Headers:${NC} X-KOS-AI-Version v2.1"
    echo ""
    echo -e "  ${YELLOW}Prochaines étapes:${NC}"
    echo -e "  ${YELLOW}→${NC} Vérifier le site: https://khepraexperts.com"
    echo -e "  ${YELLOW}→${NC} Vérifier GSC: https://search.google.com/search-console"
    echo -e "  ${YELLOW}→${NC} Vérifier Supabase Dashboard"
    echo ""
  fi

  exit $EXIT_CODE
}

# ─════════════════════════════════════════════════════════════════
# MAIN
# ─════════════════════════════════════════════════════════════════
main() {
  banner

  case "$DEPLOY_MODE" in
    local|staging|prod)
      phase_prereqs   || { report; }
      phase_install   || { report; }
      phase_quality   || { report; }
      phase_build     || { report; }
      phase_supabase_migrations || true
      phase_supabase_edge_functions || true
      phase_netlify_edge || true
      phase_lighthouse || true
      phase_netlify_deploy || true
      phase_health_check || true
      report
      ;;
    health)
      # Mode health check uniquement
      local url="${2:-https://khepraexperts.com}"
      bash "$SCRIPT_DIR/health-check.sh" "$url"
      exit $?
      ;;
    *)
      echo "Usage: bash scripts/deploy-khepra.sh [local|staging|prod|health]"
      echo ""
      echo "  local   → Build + qualité locale (pas de deploy)"
      echo "  staging → Build + deploy staging + health check"
      echo "  prod    → Build + deploy production + health check"
      echo "  health  → Health check uniquement (URL optionnelle)"
      echo ""
      echo "Exemples:"
      echo "  bash scripts/deploy-khepra.sh local"
      echo "  bash scripts/deploy-khepra.sh health https://khepraexperts.com"
      exit 1
      ;;
  esac
}

main "$@"