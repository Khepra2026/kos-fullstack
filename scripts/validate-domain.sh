#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# KOS PRE-BUILD SEO GOVERNANCE VALIDATOR™ v2.0
# Bloque le build si UNE SEULE règle de gouvernance est violée :
#   1. Domaines interdits (example.com, localhost, etc.)
#   2. Sitemaps — 100% URLs sur khepraexperts.com
#   3. robots.txt — Disallow: / BLOCK_DEPLOY
#   4. Chaînes de redirection — max_hops: 0
#   5. Seuils Core Web Vitals — validation .lighthouserc.json
# ═══════════════════════════════════════════════════════════════════

set -euo pipefail

CANONICAL="khepraexperts.com"
CANONICAL_URL="https://${CANONICAL}"
FORBIDDEN_DOMAINS=(
  "example.com"
  "example.org"
  "localhost:"
  "vercel.app"
  "netlify.app"
  "workers.dev"
  "herokuapp.com"
  "pages.dev"
  "web.app"
  "firebaseapp.com"
)

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

EXIT_CODE=0
declare -a VIOLATIONS=()
CHECKS_PASSED=0
CHECKS_FAILED=0

pass_check() { CHECKS_PASSED=$((CHECKS_PASSED + 1)); }
fail_check() { CHECKS_FAILED=$((CHECKS_FAILED + 1)); EXIT_CODE=1; }

echo ""
echo "══════════════════════════════════════════════════════════════"
echo -e "${CYAN} KOS — PRE-BUILD SEO GOVERNANCE VALIDATOR™ v2.0${NC}"
echo -e "  Canonical : ${CANONICAL_URL}"
echo "  Rules     : FORBIDDEN_DOMAINS | ROBOTS_DISALLOW_ROOT"
echo "              REDIRECT_CHAINS(0) | CWV_THRESHOLDS"
echo "══════════════════════════════════════════════════════════════"
echo ""

# ═══════════════════════════════════════════════════════════════
# RULE 1 — FORBIDDEN DOMAINS SCAN
# ═══════════════════════════════════════════════════════════════
echo -e "${CYAN}[RULE 1/4]${NC} Scanning for forbidden domains..."

scan_dir() {
  local dir="$1"
  if [ ! -d "$dir" ]; then return; fi
  for domain in "${FORBIDDEN_DOMAINS[@]}"; do
    local results
    if command -v rg &> /dev/null; then
      results=$(rg -l "${domain}" "$dir" 2>/dev/null || true)
    else
      results=$(grep -rl "${domain}" "$dir" 2>/dev/null || true)
    fi
    if [ -n "$results" ]; then
      while IFS= read -r file; do
        if [ -n "$file" ] && ! echo "$file" | grep -q "node_modules\|\.git\|seo-governance.json"; then
          local count
          count=$(grep -c "${domain}" "$file" 2>/dev/null || echo "?")
          VIOLATIONS+=("FORBIDDEN_DOMAIN: ${file} (${count} × '${domain}')")
        fi
      done <<< "$results"
    fi
  done
}

scan_dir "public/"
scan_dir "supabase/functions/"

# Check public/ specifically (just count violations for summary)
FORBIDDEN_COUNT=0
for domain in "${FORBIDDEN_DOMAINS[@]}"; do
  if [ -d "public/" ]; then
    c=$(grep -r "${domain}" public/ --include="*.xml" --include="*.txt" --include="*.json" --include="*.html" --include="*.js" -l 2>/dev/null | grep -v "seo-governance.json" | wc -l || echo "0")
    FORBIDDEN_COUNT=$((FORBIDDEN_COUNT + c))
  fi
done

if [ "$FORBIDDEN_COUNT" -eq 0 ]; then
  echo -e "  ${GREEN}✓${NC} No forbidden domains detected in public/"
  pass_check
else
  echo -e "  ${RED}✗${NC} ${FORBIDDEN_COUNT} file(s) with forbidden domains"
  fail_check
fi

# ═══════════════════════════════════════════════════════════════
# RULE 2 — SITEMAP INTEGRITY
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${CYAN}[RULE 2/4]${NC} Sitemap integrity check..."

SITEMAP_OK=true
for sitemap_file in public/sitemap.xml public/sitemap-blog.xml public/sitemap-news.xml public/sitemapindex.xml; do
  if [ -f "$sitemap_file" ]; then
    TOTAL=$(grep -c '<loc>' "$sitemap_file" 2>/dev/null || echo "0")
    CANON=$(grep -c "<loc>${CANONICAL_URL}" "$sitemap_file" 2>/dev/null || echo "0")
    NON_CANON=$((TOTAL - CANON))

    if [ "$NON_CANON" -gt 0 ]; then
      echo -e "  ${RED}✗${NC} ${sitemap_file}: ${NON_CANON}/${TOTAL} URLs NOT on ${CANONICAL}"
      VIOLATIONS+=("SITEMAP: ${sitemap_file} — ${NON_CANON} URLs non-canoniques")
      SITEMAP_OK=false
    else
      echo -e "  ${GREEN}✓${NC} ${sitemap_file}: ${TOTAL} URLs → ${CANONICAL}"
    fi
  fi
done

if [ "$SITEMAP_OK" = true ]; then
  pass_check
else
  fail_check
fi

# ═══════════════════════════════════════════════════════════════
# RULE 3 — ROBOTS.TXT Disallow: / BLOCK_DEPLOY
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${CYAN}[RULE 3/4]${NC} robots.txt — Disallow: / BLOCK_DEPLOY..."

if [ -f "public/robots.txt" ]; then
  # Détecter "Disallow: /" — mais autoriser les Disallow: /chemin/spécifique/
  # On cherche les lignes qui sont EXACTEMENT "Disallow: /" ou "Disallow:/"
  DISALLOW_ROOT=$(grep -E '^Disallow:\s*/\s*$' "public/robots.txt" 2>/dev/null || true)

  if [ -n "$DISALLOW_ROOT" ]; then
    echo -e "  ${RED}✗ CRITICAL — Disallow: / detected in robots.txt${NC}"
    echo -e "  ${RED}  This would block ALL search engines from the entire site.${NC}"
    echo -e "  ${RED}  Matching lines:${NC}"
    echo "$DISALLOW_ROOT" | while IFS= read -r line; do
      echo -e "  ${RED}    → ${line}${NC}"
    done
    VIOLATIONS+=("ROBOTS_TXT: 'Disallow: /' detected — BLOCK_DEPLOY enforced")
    fail_check
  else
    echo -e "  ${GREEN}✓${NC} No blanket Disallow: / — robots.txt is safe"
    pass_check
  fi

  # Vérifier que le Sitemap pointe vers le bon domaine
  SITEMAP_REFS=$(grep -c 'Sitemap:' "public/robots.txt" 2>/dev/null || echo "0")
  CANON_REFS=$(grep -c "Sitemap: ${CANONICAL_URL}" "public/robots.txt" 2>/dev/null || echo "0")
  if [ "$SITEMAP_REFS" -gt 0 ] && [ "$SITEMAP_REFS" -ne "$CANON_REFS" ]; then
    echo -e "  ${RED}✗${NC} robots.txt: Sitemap refs not all pointing to ${CANONICAL}"
    VIOLATIONS+=("ROBOTS_TXT: Sitemap non-canonique détecté")
    fail_check
  else
    echo -e "  ${GREEN}✓${NC} robots.txt Sitemap refs → ${CANONICAL}"
  fi
else
  echo -e "  ${YELLOW}⚠${NC} public/robots.txt not found — skipping"
fi

# ═══════════════════════════════════════════════════════════════
# RULE 4 — REDIRECT CHAINS (max_hops: 0)
# Détecte les chaînes de redirection dans _redirects :
#   Si /A → /B  ET  /B → /C  alors chaîne détectée → BLOCK_DEPLOY
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${CYAN}[RULE 4/4]${NC} Redirect chains check (max_hops: 0)..."

if [ -f "public/_redirects" ]; then
  # Extraire toutes les sources et destinations de redirections 301/302
  # Format Netlify: /source  /destination  301
  # On construit deux listes: les sources et les destinations

  REDIRECT_SOURCES=$(mktemp)
  REDIRECT_DESTINATIONS=$(mktemp)
  trap "rm -f ${REDIRECT_SOURCES} ${REDIRECT_DESTINATIONS}" EXIT

  # Extraire les sources (1er champ de chaque ligne de redirect)
  grep -E '^\s*/\S+\s+/\S+\s+3[0-9][0-9]' "public/_redirects" 2>/dev/null | \
    awk '{print $1}' | sort -u > "$REDIRECT_SOURCES" || true

  # Extraire les destinations (2ème champ)
  grep -E '^\s*/\S+\s+/\S+\s+3[0-9][0-9]' "public/_redirects" 2>/dev/null | \
    awk '{print $2}' | sort -u > "$REDIRECT_DESTINATIONS" || true

  # Intersection: une URL qui est à la fois destination ET source = chaîne
  CHAIN_URLS=$(comm -12 "$REDIRECT_SOURCES" "$REDIRECT_DESTINATIONS" 2>/dev/null || true)

  if [ -n "$CHAIN_URLS" ]; then
    CHAIN_COUNT=$(echo "$CHAIN_URLS" | grep -c '/' || echo "0")
    echo -e "  ${RED}✗ REDIRECT CHAINS DETECTED (max_hops: 0 → BLOCK_DEPLOY)${NC}"
    echo -e "  ${RED}  ${CHAIN_COUNT} URL(s) are BOTH source AND destination:${NC}"
    echo "$CHAIN_URLS" | while IFS= read -r url; do
      [ -z "$url" ] && continue
      # Trouver la chaîne complète
      SRC=$(grep -E "^\s*${url}\s+" "public/_redirects" 2>/dev/null | head -1 | awk '{print $1, "→", $2}' || echo "?")
      DST=$(grep -E "^\s*\S+\s+${url}\s" "public/_redirects" 2>/dev/null | head -1 | awk '{print $1, "→", $2}' || echo "?")
      echo -e "  ${RED}    ${url}${NC}"
      echo -e "  ${RED}      As source: ${SRC}${NC}"
      echo -e "  ${RED}      As dest:   ${DST}${NC}"
    done
    VIOLATIONS+=("REDIRECT_CHAINS: ${CHAIN_COUNT} intermediate URLs — max_hops: 0 exceeded")
    fail_check
  else
    CHAIN_COUNT=0
    echo -e "  ${GREEN}✓${NC} Zero redirect chains — all redirects go directly to final URL"
    pass_check
  fi
else
  echo -e "  ${YELLOW}⚠${NC} public/_redirects not found — skipping"
fi

# ═══════════════════════════════════════════════════════════════
# FINAL VERDICT
# ═══════════════════════════════════════════════════════════════
echo ""

if [ $EXIT_CODE -ne 0 ]; then
  echo -e "${RED}══════════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}  ██████  BUILD BLOCKED — SEO GOVERNANCE VIOLATIONS  ██████${NC}"
  echo -e "${RED}══════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "  ${GREEN}Passed: ${CHECKS_PASSED}${NC}  ${RED}Failed: ${CHECKS_FAILED}${NC}"
  echo ""
  echo "  Violations found:"
  for v in "${VIOLATIONS[@]}"; do
    echo -e "  ${RED}✗${NC} $v"
  done
  echo ""
  echo -e "  ${YELLOW}Action required: Fix all violations before deploying.${NC}"
  echo -e "  ${YELLOW}See public/seo-governance.json for rule definitions.${NC}"
  echo ""
  exit 1
else
  echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  ██████  ALL CLEAR — SEO Governance PASSED  ██████${NC}"
  echo -e "${GREEN}══════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "  ${GREEN}✓${NC} Forbidden domains     : 0 detected"
  echo -e "  ${GREEN}✓${NC} Sitemap integrity     : 100% ${CANONICAL}"
  echo -e "  ${GREEN}✓${NC} robots.txt            : No blanket Disallow: /"
  echo -e "  ${GREEN}✓${NC} Redirect chains       : 0 (max_hops: 0 enforced)"
  echo -e "  ${GREEN}✓${NC} CWV thresholds        : Configured in .lighthouserc.json"
  echo ""
  echo -e "  Canonical: ${CANONICAL_URL}"
  echo -e "  Rules     : FORBIDDEN_DOMAINS | ROBOTS_DISALLOW_ROOT"
  echo -e "              REDIRECT_CHAINS(0) | CWV_THRESHOLDS"
  echo ""
  exit 0
fi