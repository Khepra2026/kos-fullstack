#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# KHEPRA HEALTH CHECK™ v2.0
# Vérifie les headers KOS AI, SEO, sécurité, Core Web Vitals
# Usage: bash scripts/health-check.sh [URL]
# ═══════════════════════════════════════════════════════════════════

set -uo pipefail

TARGET_URL="${1:-https://khepraexperts.com}"
TARGET_HOST=$(echo "$TARGET_URL" | sed -E 's|https?://||' | cut -d/ -f1)

# ─── Couleurs ───
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

EXIT_CODE=0
CHECKS_PASSED=0
CHECKS_FAILED=0

pass() { CHECKS_PASSED=$((CHECKS_PASSED + 1)); }
fail() { CHECKS_FAILED=$((CHECKS_FAILED + 1)); EXIT_CODE=1; }

banner() {
  echo ""
  echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${CYAN}║${NC}  ${BOLD}KHEPRA HEALTH CHECK™ v2.0${NC}                                     ${CYAN}║${NC}"
  echo -e "${CYAN}║${NC}  Target: ${BOLD}${TARGET_URL}${NC}                                        ${CYAN}║${NC}"
  echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# ─── Helpers curl ───
fetch_headers() {
  curl -s -I -L --max-time 15 "$1" 2>/dev/null
}

fetch_body() {
  curl -s -L --max-time 15 "$1" 2>/dev/null
}

# ═════════════════════════════════════════════════════════════════
# CHECK 1 — Headers KOS AI (équivalent du snippet curl -I | grep)
# ═════════════════════════════════════════════════════════════════
check_kos_headers() {
  echo -e "${CYAN}[CHECK 1/9]${NC} ${BOLD}KOS AI Headers${NC}"

  HEADERS=$(fetch_headers "$TARGET_URL")

  if [ -z "$HEADERS" ]; then
    echo -e "  ${RED}✗${NC} Impossible de récupérer les headers (timeout ou unreachable)"
    fail
    return 1
  fi

  # X-KOS-AI-Version
  KOS_VERSION=$(echo "$HEADERS" | grep -i "X-KOS-AI-Version" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$KOS_VERSION" ]; then
    echo -e "  ${GREEN}✓${NC} X-KOS-AI-Version: ${BOLD}${KOS_VERSION}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} X-KOS-AI-Version: MANQUANT"
    fail
  fi

  # X-Khepra-Edge
  EDGE=$(echo "$HEADERS" | grep -i "X-Khepra-Edge" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$EDGE" ]; then
    echo -e "  ${GREEN}✓${NC} X-Khepra-Edge: ${BOLD}${EDGE}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} X-Khepra-Edge: MANQUANT"
    fail
  fi

  # X-Robots-Tag
  ROBOTS=$(echo "$HEADERS" | grep -i "X-Robots-Tag" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$ROBOTS" ]; then
    echo -e "  ${GREEN}✓${NC} X-Robots-Tag: ${BOLD}${ROBOTS}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} X-Robots-Tag: MANQUANT"
    fail
  fi

  # Cache-Tag
  CACHE_TAG=$(echo "$HEADERS" | grep -i "Cache-Tag" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$CACHE_TAG" ]; then
    echo -e "  ${GREEN}✓${NC} Cache-Tag: ${BOLD}${CACHE_TAG}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} Cache-Tag: MANQUANT"
    fail
  fi

  # Timing-Allow-Origin
  TIMING=$(echo "$HEADERS" | grep -i "Timing-Allow-Origin" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$TIMING" ]; then
    echo -e "  ${GREEN}✓${NC} Timing-Allow-Origin: ${BOLD}${TIMING}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} Timing-Allow-Origin: MANQUANT"
    fail
  fi

  # Link headers (Early Hints)
  LINK_COUNT=$(echo "$HEADERS" | grep -c "Link:" || echo "0")
  if [ "$LINK_COUNT" -gt 0 ]; then
    echo -e "  ${GREEN}✓${NC} Link headers (Early Hints): ${BOLD}${LINK_COUNT} found${NC}"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} Link headers (Early Hints): 0 found"
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 2 — Headers Sécurité Big Four
# ═════════════════════════════════════════════════════════════════
check_security_headers() {
  echo ""
  echo -e "${CYAN}[CHECK 2/9]${NC} ${BOLD}Security Headers (Big Four)${NC}"

  HEADERS=$(fetch_headers "$TARGET_URL")

  # HSTS
  HSTS=$(echo "$HEADERS" | grep -i "Strict-Transport-Security" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$HSTS" ]; then
    echo -e "  ${GREEN}✓${NC} Strict-Transport-Security: ${BOLD}${HSTS}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} HSTS manquant"
    fail
  fi

  # CSP
  CSP=$(echo "$HEADERS" | grep -i "Content-Security-Policy" | grep -v "Report-Only" | cut -d: -f2- | tr -d '\r')
  if [ -n "$CSP" ]; then
    echo -e "  ${GREEN}✓${NC} Content-Security-Policy: présent"
    pass
  else
    echo -e "  ${RED}✗${NC} CSP manquant"
    fail
  fi

  # X-Frame-Options
  XFO=$(echo "$HEADERS" | grep -i "X-Frame-Options" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$XFO" ]; then
    echo -e "  ${GREEN}✓${NC} X-Frame-Options: ${BOLD}${XFO}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} X-Frame-Options manquant"
    fail
  fi

  # X-Content-Type-Options
  XCTO=$(echo "$HEADERS" | grep -i "X-Content-Type-Options" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$XCTO" ]; then
    echo -e "  ${GREEN}✓${NC} X-Content-Type-Options: ${BOLD}${XCTO}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} X-Content-Type-Options manquant"
    fail
  fi

  # Referrer-Policy
  RP=$(echo "$HEADERS" | grep -i "Referrer-Policy" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$RP" ]; then
    echo -e "  ${GREEN}✓${NC} Referrer-Policy: ${BOLD}${RP}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} Referrer-Policy manquant"
    fail
  fi

  # COOP
  COOP=$(echo "$HEADERS" | grep -i "Cross-Origin-Opener-Policy" | cut -d: -f2 | tr -d ' \r')
  if [ -n "$COOP" ]; then
    echo -e "  ${GREEN}✓${NC} Cross-Origin-Opener-Policy: ${BOLD}${COOP}${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} COOP manquant"
    fail
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 3 — Sitemap & SEO Fondations
# ═════════════════════════════════════════════════════════════════
check_seo_foundation() {
  echo ""
  echo -e "${CYAN}[CHECK 3/9]${NC} ${BOLD}SEO Foundation${NC}"

  # robots.txt
  ROBOTS=$(curl -s -L --max-time 10 "${TARGET_URL}/robots.txt" 2>/dev/null)
  if [ -n "$ROBOTS" ] && echo "$ROBOTS" | grep -q "Sitemap:"; then
    SITEMAP_REFS=$(echo "$ROBOTS" | grep -c "Sitemap:" || echo "0")
    echo -e "  ${GREEN}✓${NC} robots.txt: ${SITEMAP_REFS} sitemap(s) référencé(s)"
    pass
  else
    echo -e "  ${RED}✗${NC} robots.txt: sitemap non référencé"
    fail
  fi

  # sitemap.xml accessible
  SITEMAP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${TARGET_URL}/sitemap.xml" 2>/dev/null)
  if [ "$SITEMAP_STATUS" = "200" ]; then
    SITEMAP_SIZE=$(curl -s -L --max-time 10 "${TARGET_URL}/sitemap.xml" 2>/dev/null | wc -c | tr -d ' ')
    echo -e "  ${GREEN}✓${NC} sitemap.xml: HTTP 200 (${SITEMAP_SIZE} bytes)"
    pass
  else
    echo -e "  ${RED}✗${NC} sitemap.xml: HTTP ${SITEMAP_STATUS}"
    fail
  fi

  # sitemapindex.xml
  SINDEX_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${TARGET_URL}/sitemapindex.xml" 2>/dev/null)
  if [ "$SINDEX_STATUS" = "200" ]; then
    echo -e "  ${GREEN}✓${NC} sitemapindex.xml: HTTP 200"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} sitemapindex.xml: HTTP ${SINDEX_STATUS}"
  fi

  # llms.txt (GEO)
  LLMS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 10 "${TARGET_URL}/llms.txt" 2>/dev/null)
  if [ "$LLMS_STATUS" = "200" ]; then
    LLMS_SIZE=$(curl -s -L --max-time 10 "${TARGET_URL}/llms.txt" 2>/dev/null | wc -c | tr -d ' ')
    echo -e "  ${GREEN}✓${NC} llms.txt: HTTP 200 (${LLMS_SIZE} bytes) — GEO signal"
    pass
  else
    echo -e "  ${RED}✗${NC} llms.txt: HTTP ${LLMS_STATUS} — GEO signal manquant!"
    fail
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 4 — PageSpeed Insights API (Core Web Vitals)
# ═════════════════════════════════════════════════════════════════
check_pagespeed() {
  echo ""
  echo -e "${CYAN}[CHECK 4/9]${NC} ${BOLD}Core Web Vitals (PageSpeed Insights API)${NC}"

  # Vérifier si jq est dispo
  if ! command -v jq &>/dev/null; then
    log_warn "  jq non installé — skip PageSpeed check"
    return 0
  fi

  PSI_URL="https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${TARGET_URL}&strategy=desktop&category=PERFORMANCE"

  PSI_RESPONSE=$(curl -s --max-time 30 "$PSI_URL" 2>/dev/null)

  if [ -z "$PSI_RESPONSE" ] || echo "$PSI_RESPONSE" | grep -q '"error"'; then
    echo -e "  ${YELLOW}⚠${NC} PageSpeed API indisponible ou quota exceeded"
    return 0
  fi

  # Extraire les métriques
  LCP=$(echo "$PSI_RESPONSE" | jq -r '.lighthouseResult.audits["largest-contentful-paint"].numericValue // 0')
  FCP=$(echo "$PSI_RESPONSE" | jq -r '.lighthouseResult.audits["first-contentful-paint"].numericValue // 0')
  CLS=$(echo "$PSI_RESPONSE" | jq -r '.lighthouseResult.audits["cumulative-layout-shift"].numericValue // 0')
  TBT=$(echo "$PSI_RESPONSE" | jq -r '.lighthouseResult.audits["total-blocking-time"].numericValue // 0')
  PERF_SCORE=$(echo "$PSI_RESPONSE" | jq -r '.lighthouseResult.categories.performance.score // 0')

  # Convertir scores
  PERF_PCT=$(echo "scale=0; $PERF_SCORE * 100 / 1" | bc 2>/dev/null || echo "0")

  echo -e "  Performance Score: ${BOLD}${PERF_PCT}%${NC}"
  echo -e "  LCP: ${BOLD}${LCP}ms${NC}"
  echo -e "  FCP: ${BOLD}${FCP}ms${NC}"
  echo -e "  CLS: ${BOLD}${CLS}${NC}"
  echo -e "  TBT: ${BOLD}${TBT}ms${NC}"

  # Evaluate against Big Four thresholds
  if [ "$PERF_SCORE" != "0" ]; then
    if (( $(echo "$LCP <= 1500" | bc -l 2>/dev/null || echo "0") )); then
      echo -e "  ${GREEN}✓${NC} LCP ≤ 1.5s (Big Four target)"
      pass
    elif (( $(echo "$LCP <= 2500" | bc -l 2>/dev/null || echo "0") )); then
      echo -e "  ${YELLOW}⚠${NC} LCP ≤ 2.5s (gate) mais > 1.5s (target)"
    else
      echo -e "  ${RED}✗${NC} LCP > 2.5s (gate failed)"
      fail
    fi

    if (( $(echo "$CLS <= 0.02" | bc -l 2>/dev/null || echo "0") )); then
      echo -e "  ${GREEN}✓${NC} CLS ≤ 0.02"
      pass
    else
      echo -e "  ${YELLOW}⚠${NC} CLS > 0.02"
    fi
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 5 — Canonical & Redirects
# ═════════════════════════════════════════════════════════════════
check_canonical() {
  echo ""
  echo -e "${CYAN}[CHECK 5/9]${NC} ${BOLD}Canonical & Redirects${NC}"

  # Test www → non-www
  WWW_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "https://www.${TARGET_HOST}/" 2>/dev/null)
  if [ "$WWW_STATUS" = "301" ]; then
    echo -e "  ${GREEN}✓${NC} www → non-www: HTTP ${WWW_STATUS}"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} www redirect: HTTP ${WWW_STATUS} (attendu: 301)"
  fi

  # Test HTTP → HTTPS
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://${TARGET_HOST}/" 2>/dev/null)
  if [ "$HTTP_STATUS" = "301" ] || [ "$HTTP_STATUS" = "308" ]; then
    echo -e "  ${GREEN}✓${NC} HTTP → HTTPS: HTTP ${HTTP_STATUS}"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} HTTP redirect: HTTP ${HTTP_STATUS}"
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 6 — HTML Meta Tags (EEAT pour bots IA)
# ═════════════════════════════════════════════════════════════════
check_html_meta() {
  echo ""
  echo -e "${CYAN}[CHECK 6/9]${NC} ${BOLD}HTML Meta Tags (EEAT / GEO)${NC}"

  # Simuler un bot IA avec user-agent
  BODY=$(curl -s -L --max-time 15 -A "Mozilla/5.0 (compatible; GPTBot/1.0)" "$TARGET_URL" 2>/dev/null)

  if [ -z "$BODY" ]; then
    echo -e "  ${RED}✗${NC} Impossible de récupérer le HTML"
    fail
    return 1
  fi

  # Vérifier les meta tags EEAT
  if echo "$BODY" | grep -q 'name="kos-ai"'; then
    echo -e "  ${GREEN}✓${NC} meta name=\"kos-ai\" — présent"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} meta name=\"kos-ai\" — absent (bot IA non détecté ou middleware inactif)"
  fi

  if echo "$BODY" | grep -q 'name="eeat"'; then
    echo -e "  ${GREEN}✓${NC} meta name=\"eeat\" — présent"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} meta name=\"eeat\" — absent"
  fi

  # Meta description
  if echo "$BODY" | grep -q 'name="description"'; then
    echo -e "  ${GREEN}✓${NC} meta description — présent"
    pass
  else
    echo -e "  ${RED}✗${NC} meta description — MANQUANT"
    fail
  fi

  # Canonical link
  if echo "$BODY" | grep -q 'rel="canonical"'; then
    echo -e "  ${GREEN}✓${NC} rel=canonical — présent"
    pass
  else
    echo -e "  ${RED}✗${NC} rel=canonical — MANQUANT"
    fail
  fi

  # Schema.org JSON-LD
  if echo "$BODY" | grep -q '"@context":"https://schema.org"'; then
    echo -e "  ${GREEN}✓${NC} Schema.org JSON-LD — présent"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} Schema.org JSON-LD — absent"
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 7 — Edge Functions Supabase (ping)
# ═════════════════════════════════════════════════════════════════
check_edge_functions() {
  echo ""
  echo -e "${CYAN}[CHECK 7/9]${NC} ${BOLD}Supabase Edge Functions (ping)${NC}"

  # On ne peut pas pinger sans JWT, mais on vérifie que les URLs sont construites
  SUPABASE_URL=$(grep "VITE_PUBLIC_SUPABASE_URL" .env 2>/dev/null | cut -d= -f2 | tr -d '"')

  if [ -z "$SUPABASE_URL" ]; then
    echo -e "  ${YELLOW}⚠${NC} VITE_PUBLIC_SUPABASE_URL non trouvé dans .env"
    return 0
  fi

  # Vérifier que les Edge Functions existent dans le projet
  EDGE_COUNT=$(ls supabase/functions/*/index.ts 2>/dev/null | wc -l | tr -d ' ')
  echo -e "  ${GREEN}✓${NC} ${EDGE_COUNT} Edge Functions dans supabase/functions/"
  pass

  # Vérifier la fonction sitemap dynamique (pas besoin d'auth)
  SITEMAP_DYN_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "${SUPABASE_URL}/functions/v1/sitemap-xml-dynamic" 2>/dev/null)
  if [ "$SITEMAP_DYN_STATUS" = "200" ] || [ "$SITEMAP_DYN_STATUS" = "401" ]; then
    echo -e "  ${GREEN}✓${NC} sitemap-xml-dynamic: HTTP ${SITEMAP_DYN_STATUS} (atteignable)"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} sitemap-xml-dynamic: HTTP ${SITEMAP_DYN_STATUS}"
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 8 — Assets & Cache Headers
# ═════════════════════════════════════════════════════════════════
check_assets_cache() {
  echo ""
  echo -e "${CYAN}[CHECK 8/9]${NC} ${BOLD}Assets & Cache Headers${NC}"

  # Récupérer un asset JS du build Vite
  BODY=$(fetch_body "$TARGET_URL")
  JS_PATH=$(echo "$BODY" | grep -oE '/assets/[^"]+\.js' | head -1)

  if [ -n "$JS_PATH" ]; then
    ASSET_HEADERS=$(fetch_headers "${TARGET_URL}${JS_PATH}")
    CACHE_CTRL=$(echo "$ASSET_HEADERS" | grep -i "Cache-Control" | cut -d: -f2 | tr -d ' \r')

    if echo "$CACHE_CTRL" | grep -q "immutable"; then
      echo -e "  ${GREEN}✓${NC} Assets JS: Cache-Control immutable"
      pass
    else
      echo -e "  ${YELLOW}⚠${NC} Assets JS: Cache-Control = ${CACHE_CTRL}"
    fi

    # Vérifier compression
    ENCODING=$(echo "$ASSET_HEADERS" | grep -i "Content-Encoding" | cut -d: -f2 | tr -d ' \r')
    if [ -n "$ENCODING" ]; then
      echo -e "  ${GREEN}✓${NC} Assets JS: Content-Encoding = ${ENCODING}"
      pass
    else
      echo -e "  ${YELLOW}⚠${NC} Assets JS: pas de compression détectée"
    fi
  else
    echo -e "  ${YELLOW}⚠${NC} Aucun asset JS trouvé dans le HTML"
  fi
}

# ═════════════════════════════════════════════════════════════════
# CHECK 9 — Response Status & Time
# ═════════════════════════════════════════════════════════════════
check_response_time() {
  echo ""
  echo -e "${CYAN}[CHECK 9/9]${NC} ${BOLD}Response Time & Status${NC}"

  TIMING=$(curl -s -o /dev/null -w "HTTP:%{http_code}\nTTFB:%{time_starttransfer}\nTotal:%{time_total}" --max-time 15 "$TARGET_URL" 2>/dev/null)

  HTTP_CODE=$(echo "$TIMING" | grep "HTTP:" | cut -d: -f2)
  TTFB=$(echo "$TIMING" | grep "TTFB:" | cut -d: -f2)
  TOTAL=$(echo "$TIMING" | grep "Total:" | cut -d: -f2)

  if [ "$HTTP_CODE" = "200" ]; then
    echo -e "  ${GREEN}✓${NC} HTTP Status: ${BOLD}200${NC}"
    pass
  else
    echo -e "  ${RED}✗${NC} HTTP Status: ${HTTP_CODE}"
    fail
  fi

  # TTFB en ms
  TTFB_MS=$(echo "scale=3; $TTFB * 1000" | bc 2>/dev/null || echo "0")
  echo -e "  TTFB: ${BOLD}${TTFB_MS}ms${NC}"

  if (( $(echo "$TTFB <= 0.3" | bc -l 2>/dev/null || echo "0") )); then
    echo -e "  ${GREEN}✓${NC} TTFB < 300ms"
    pass
  elif (( $(echo "$TTFB <= 0.6" | bc -l 2>/dev/null || echo "0") )); then
    echo -e "  ${GREEN}✓${NC} TTFB < 600ms (acceptable)"
    pass
  else
    echo -e "  ${YELLOW}⚠${NC} TTFB > 600ms"
  fi

  echo -e "  Total Load: ${BOLD}${TOTAL}s${NC}"
}

# ═════════════════════════════════════════════════════════════════
# RAPPORT FINAL
# ═════════════════════════════════════════════════════════════════
report() {
  echo ""
  echo -e "${CYAN}══════════════════════════════════════════════════════════════════${NC}"

  if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}  ██████  KHEPRA HEALTH CHECK — ALL GREEN  ██████${NC}"
  else
    echo -e "${YELLOW}  ██████  KHEPRA HEALTH CHECK — PARTIAL  ██████${NC}"
  fi

  echo -e "${CYAN}══════════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "  ${BOLD}Checks Passed:${NC} ${CHECKS_PASSED}"
  echo -e "  ${BOLD}Checks Failed:${NC} ${CHECKS_FAILED}"
  echo -e "  ${BOLD}Target:${NC} ${TARGET_URL}"
  echo ""

  if [ $EXIT_CODE -eq 0 ]; then
    echo -e "  ${GREEN}✓${NC} X-KOS-AI-Version injecté via Netlify Edge"
    echo -e "  ${GREEN}✓${NC} Headers sécurité Big Four actifs"
    echo -e "  ${GREEN}✓${NC} SEO Foundation validée"
    echo -e "  ${GREEN}✓${NC} KHEPRA stack opérationnelle"
  else
    echo -e "  ${YELLOW}⚠${NC} Certains checks ont échoué — voir détails ci-dessus"
  fi

  echo ""
  exit $EXIT_CODE
}

# ─════════════════════════════════════════════════════════════════
# MAIN
# ─════════════════════════════════════════════════════════════════
main() {
  banner

  check_kos_headers
  check_security_headers
  check_seo_foundation
  check_pagespeed
  check_canonical
  check_html_meta
  check_edge_functions
  check_assets_cache
  check_response_time

  report
}

main "$@"