
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const SITE_URL = "https://khepraexperts.com";
const BATCH_SIZE = 6;
const FETCH_TIMEOUT_MS = 15000;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isInternalUrl(url: string): boolean {
  try {
    const parsed = new URL(url, SITE_URL);
    return parsed.hostname === "khepraexperts.com" || parsed.hostname.endsWith(".khepraexperts.com");
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "KhepraExperts-LinkChecker/1.0" },
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchPageWithTimeout(url: string, timeoutMs: number): Promise<{ response: Response; body: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "KhepraExperts-LinkChecker/1.0" },
    });
    const body = await response.text();
    return { response, body };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractInternalLinks(html: string, sourceUrl: string): string[] {
  const links: string[] = [];
  const hrefRegex = /<a\s[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(html)) !== null) {
    let href = match[1];
    if (!href) continue;

    if (href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }

    try {
      const resolved = new URL(href, SITE_URL);
      if (isInternalUrl(resolved.toString())) {
        links.push(resolveToKnownPath(resolved.pathname));
      }
    } catch {
      continue;
    }
  }

  return [...new Set(links)];
}

function resolveToKnownPath(pathname: string): string {
  let path = pathname;
  if (path !== "/" && path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  return path || "/";
}

const SITEMAP_PATHS = [
  "/", "/about", "/contact", "/approche", "/equipe", "/experts", "/agents-experts",
  "/expertises", "/partenaires", "/publications", "/careers", "/pourquoi-khepra",
  "/decideurs", "/investisseurs", "/projets-industriels", "/solutions",
  "/case-studies", "/case-studies/regtech-conformite-uemoa-cemac",
  "/case-studies/gouvernance-board-advisory-uemoa",
  "/case-studies/agrement-multinational-sfd-uemoa-cemac",
  "/case-studies/ingenierie-financiere-projet-industriel-cedao",
  "/case-studies/prix-transfert-microfinance-groupe-panafricain",
  "/case-studies/pre-inspection-bceao-banque-uemoa",
  "/webinars", "/formations",
  "/legal", "/privacy", "/cgu", "/cookies", "/charte-deontologique", "/securite-conformite",
  "/services", "/services/conseil-strategique", "/services/gestion-de-projets",
  "/services/developpement-organisationnel", "/services/renforcement-capacites",
  "/services/diagnostic-organisationnel", "/services/audit-social",
  "/services/ressources-humaines", "/services/transformation-digitale",
  "/services/communication-strategique", "/services/levee-de-fonds",
  "/services/due-diligence-acquisition", "/services/regtech-regulatory-engineering",
  "/services/gouvernance-fiscalite-internationale", "/services/audit-pre-inspection-bceao",
  "/services/agrement-fintech-etablissement-paiement", "/services/ceo-advisory-board",
  "/services/family-office-afrique", "/services/regulatory-intelligence",
  "/services/controle-interne-bancaire", "/services/defense-fiscale-prix-transfert",
  "/pillar/conseil-strategique-pme-afrique", "/pillar/transformation-digitale-ohada",
  "/pillar/levee-de-fonds-afrique", "/pillar/digital-transformation-africa",
  "/pillar/financial-inclusion-africa", "/pillar/fintech-advisory-africa",
  "/pillar/microfinance-transformation-africa", "/pillar/sme-development-africa",
  "/audit-financier-afrique", "/due-diligence-pme-afrique", "/gouvernance-ohada",
  "/sfd-conformite", "/regulation-financiere", "/prix-de-transfert", "/gouvernance-risques",
  "/guide-seo-ia-afrique",
  "/knowledge-hub/due-diligence", "/knowledge-hub/esg", "/knowledge-hub/bceao", "/knowledge-hub/cobac",
  "/guide-due-diligence-afrique", "/guide-esg-afrique", "/guide-investment-readiness",
  "/guide-gouvernance-imf", "/guide-bceao-2026",
  "/geo-hub", "/geo-hub/reussir-due-diligence-afrique", "/geo-hub/mise-en-conformite-bceao",
  "/geo-hub/preparer-levee-fonds-afrique", "/geo-hub/agrement-sfd-bceao-cobac",
  "/geo-hub/cartographie-risques-entreprise", "/geo-hub/preparer-mission-bceao",
  "/geo-hub/mise-en-oeuvre-esg-afrique", "/geo-hub/renforcer-gouvernance-entreprise",
  "/think-tank", "/khepra-os-2", "/regulatory-intelligence", "/cobac", "/bceao",
  "/gafi", "/ohada", "/knowledge-hub", "/compliance-management", "/transfer-pricing",
  "/inspection-cobac", "/conformite-cemac", "/agrement-beac", "/conformite-gabac",
  "/offre-commerciale", "/board-report", "/diagnostic-flash", "/strategie-digitale",
  "/blog",
  "/blog/daf-externalise-pilotage-financier-pme-afrique",
  "/blog/controle-interne-tresorerie",
  "/blog/controle-interne-tresorerie-pme-afrique-syscohada",
  "/blog/bceao-ohada-conformite", "/blog/conformite-cobac-cemac",
  "/blog/esg-afrique-entreprises", "/blog/serie-gouvernance-bancaire-uemoa",
  "/blog/3-lignes-defense-circulaire-03-2017",
  "/blog/comites-specialises-circulaire-01-2017",
  "/blog/independance-administrateurs-circulaire-01-2017",
  "/blog/verrou-nationalite-competences-executives-circulaire-02-2017",
  "/blog/protection-lanceurs-alerte-circulaire-01-2017",
  "/blog/plans-preventifs-redressement-circulaire-001-2020",
  "/blog/protection-consommateurs-financiers-uemoa-cemac",
  "/blog/conformite-bceao-cobac-2025-ratios-bale-iii-coussins-conservation",
  "/blog/lbcft-sfd-emf-sanctions-onu-centif-anif-abr",
  "/blog/microfinance-ratios-prudentiels-sfd-emf-bceao-cobac",
  "/blog/systemes-paiement-uemoa-cemac-star-sygma-iso-20022",
  "/blog/protection-consommateurs-services-financiers-bceao-cobac-lbcft",
  "/blog/monnaie-electronique-uemoa-cemac-agrement-cantonnement",
  "/blog/cadres-concertation-financiere-uemoa-cemac",
  "/blog/financement-agrobusiness-uemoa-cemac-boad-bdeac-ohada",
  "/blog/direction-financiere-externalisee-daf-ohada-pme",
  "/blog/controle-interne-tresorerie-obligations-reglementaires",
  "/blog/erreurs-architecture-reglementaire-regtech-due-diligence-banques-uemoa-cemac",
  "/blog/gouvernance-fiscalite-internationale-khepra-360",
  "/blog/25-constats-sanctions-bceao-cobac",
  "/blog/prix-transfert-risque-fiscal-cache-groupes-africains",
  "/blog/gestion-ressources-humaines-ohada-cadre-juridique",
  "/blog/bien-etre-travail-performance-organisationnelle",
  "/blog/culture-organisationnelle-gouvernance-ohada",
  "/blog/management-qualite-totale-tqm-cobac-r-2001-07",
  "/blog/fonds-propres-reglementaires-bale-iii",
  "/blog/icaap-ilaap-bale-banques-uemoa",
  "/blog/controle-interne-coso-2013-banques-uemoa",
  "/blog/due-diligence-acquisition-pme-afrique",
  "/blog/reglementation-fintech-afrique-2026",
  "/blog/fiscalite-transfrontaliere-afrique-conventions",
  "/blog/reporting-esg-ifc-gri-afrique",
  "/blog/digitalisation-conformite-regtech-afrique",
  "/blog/stress-testing-portefeuille-credit-uemoa",
  "/blog/evaluation-conseil-administration-uemoa",
  "/blog/due-diligence-acquisition-afrique-ohada-guide",
  "/blog/agrement-imf-emf-bceao-cobac-procedure-prudentielle",
  "/blog/conformite-esg-bceao-cobac-ifc-gri-afrique",
  "/blog/levee-fonds-investor-readiness-valorisation-dcf-afrique",
  "/blog/diagnostic-organisationnel-gouvernance-bceao-cobac-ocde",
  "/blog/risques-financiers-pme-afrique-francophone-bceao-cobac",
  "/blog/alm-microfinance-uemoa-risque-liquidite-sfd",
  "/blog/alm-microfinance-cemac-risque-liquidite-emf",
  "/blog/bilan-bancaire-uemoa-ratios-bceao-solvabilite",
  "/blog/bilan-bancaire-cemac-ratios-cobac-solvabilite",
  "/blog/lbcft-sfd-uemoa-directive-02-2015-centif-kyc",
  "/blog/lbcft-emf-cemac-reglement-01-03-anif-kyc",
  "/blog/bilan-bancaire-afrique-ratios-risques-regulateur",
  "/blog/tresorerie-pme-africaines-bfr-decalage-actif-passif",
  "/blog/pilotage-financier-pme-ohada-indicateurs-performance",
  "/blog/resultat-comptable-tresorerie-distincts-syscohada-tft",
  "/blog/conformite-bceao-exigences-prudentielles-sfd-uemoa",
  "/blog/plan-strategique-pme-africaine-smart-swot-guide",
  "/blog/startups-ohada-unit-economics-financement-institutionnel",
  "/blog/levee-de-fonds-afrique-criteres-evaluation-investisseurs",
  "/blog/gouvernance-pme-ohada-ausc-investisseurs",
  "/blog/entrepreneuriat-impact-ohada-viabilite-financiere",
  "/blog/transformation-digitale-financiere-bceao-cobac-alm",
  "/blog/modelisation-financiere-pme-africaines-syscohada",
  "/blog/controle-interne-pme-africaines-obligations-reglementaires",
  "/blog/direction-financiere-externalisee",
  "/blog/pillar-inspection-bceao-guide-complet",
  "/blog/pillar-inspection-cobac-guide-complet",
  "/blog/pillar-conformite-banque-uemoa",
  "/blog/pillar-ratios-prudentiels-bceao",
  "/blog/pillar-agrement-sfd-bceao",
  "/blog/pillar-audit-pre-inspection-bceao",
  "/blog/pillar-lbcft-afrique-francophone",
  "/blog/pillar-prix-transfert-afrique",
  "/blog/pillar-prix-transfert-uemoa",
  "/blog/pillar-documentation-beps-afrique",
  "/blog/pillar-master-file-afrique",
  "/blog/pillar-controle-fiscal-prix-transfert",
  "/blog/pillar-defense-fiscale-afrique",
  "/blog/pillar-fiscalite-internationale-afrique",
  "/blog/pillar-gouvernance-groupes-familiaux-afrique",
  "/blog/pillar-cartographie-risques-entreprise",
  "/blog/pillar-erm-afrique",
  "/blog/pillar-audit-interne-coso-afrique",
  "/blog/pillar-conformite-fintech-afrique",
  "/blog/pillar-protection-donnees-personnelles-afrique",
  "/insights", "/resources", "/whitepapers",
  "/tools", "/tools/diagnostic-organisationnel", "/tools/maturite-digitale",
  "/tools/evaluation-gouvernance", "/tools/diagnostic-transformation-digitale",
  "/tools/evaluation-maturite-fintech", "/tools/audit-inclusion-financiere",
  "/tools/evaluation-cybersecurite", "/tools/evaluation-conformite-reglementaire",
  "/tools/diagnostic-strategique", "/tools/simulateur-financier",
  "/tools/stress-test-financier", "/tools/investment-readiness",
  "/tools/diagnostic-risques", "/tools/performance-commerciale",
  "/tools/benchmark-sectoriel", "/tools/simulateur-roi-marketing",
  "/tools/generateur-roadmap-innovation", "/tools/tableau-kpi-qualite",
  "/tools/diagnostic-rh-strategique", "/tools/diagnostic-esg-impact",
  "/tools/diagnostic-prix-transfert", "/tools/diagnostic-pre-inspection-bceao-cobac",
  "/tools/diagnostic-perennite-familiale", "/tools/diagnostic-maturite-pilotage-strategique",
  "/tools/diagnostic-bancabilite",
  "/industries", "/industries/microfinance", "/industries/fintech",
  "/industries/pme", "/industries/public-sector", "/industries/cemac-beac",
  "/lead-magnets", "/lead-magnets/checklist-conformite-bceao-cobac",
  "/lead-magnets/guide-levee-fonds-afrique", "/lead-magnets/simulation-risque-reglementaire",
  "/lead-magnets/template-audit-gouvernance", "/lead-magnets/mini-rapport-due-diligence",
  "/lead-magnets/diagnostic-esg-maturite",
  "/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026",
  "/regions/afrique", "/regions/afrique-francophone", "/regions/uemoa-cemac",
  "/regions/africa", "/regions/west-africa",
  "/agent-console", "/executive-dashboard", "/methodologies",
  "/audit-final-kos", "/revue-conformite-qualite", "/deploiement-final-kos",
  "/registre-traitements", "/barometre-bceao-2026", "/campagne-backlinks",
  "/kos-growth-orchestrator", "/kos-corrective-execution-engine",
  "/kos-content-correction-engine", "/kos-cyber-tech-correction-engine",
  "/kos-digital-growth-correction-engine", "/kos-autonomous-quality-system",
  "/kos-unified-autopilot", "/kos-orchestrator-engine", "/kos-resource-command-center",
  "/sitemap",
];

const DEEP_CRAWL_PATHS = [
  // Core pages (high traffic entry points)
  "/",
  "/about",
  "/contact",
  "/equipe",
  "/experts",
  "/expertises",
  "/publications",
  "/partenaires",
  // Service & solution hubs
  "/services",
  "/services/regtech-regulatory-engineering",
  "/services/gouvernance-fiscalite-internationale",
  "/services/levee-de-fonds",
  "/services/audit-pre-inspection-bceao",
  "/services/due-diligence-acquisition",
  "/solutions",
  // Industry & regulatory hubs
  "/industries",
  "/regulation-financiere",
  "/prix-de-transfert",
  "/gouvernance-risques",
  "/compliance-management",
  "/bceao",
  "/cobac",
  "/ohada",
  "/gafi",
  // Content & marketing hubs
  "/blog",
  "/insights",
  "/resources",
  "/tools",
  "/case-studies",
  "/decideurs",
  "/investisseurs",
  "/sfd-conformite",
  "/offre-commerciale",
  "/board-report",
  "/diagnostic-flash",
  // Knowledge & thought leadership
  "/knowledge-hub",
  "/geo-hub",
  "/think-tank",
  "/khepra-os-2",
  "/guide-seo-ia-afrique",
  "/guide-due-diligence-afrique",
  "/guide-gouvernance-imf",
  "/guide-bceao-2026",
  "/guide-esg-afrique",
  "/guide-investment-readiness",
  "/strategie-digitale",
];

interface CheckResult {
  source_url: string | null;
  target_url: string;
  status_code: number | null;
  is_internal: boolean;
  is_broken: boolean;
  error_message: string | null;
  content_type: string | null;
  redirect_url: string | null;
  check_type: string;
}

async function checkUrl(url: string, checkType: string, sourceUrl: string | null = null): Promise<CheckResult> {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  const result: CheckResult = {
    source_url: sourceUrl,
    target_url: url,
    status_code: null,
    is_internal: isInternalUrl(fullUrl),
    is_broken: false,
    error_message: null,
    content_type: null,
    redirect_url: null,
    check_type: checkType,
  };

  try {
    const response = await fetchWithTimeout(fullUrl, FETCH_TIMEOUT_MS);
    result.status_code = response.status;
    result.content_type = response.headers.get("content-type") || null;

    const location = response.headers.get("location");
    if (location) {
      result.redirect_url = location;
    }

    if (response.status >= 400) {
      result.is_broken = true;
      if (response.status === 404) {
        result.error_message = "404 Not Found";
      } else if (response.status === 410) {
        result.error_message = "410 Gone";
      } else if (response.status >= 500) {
        result.error_message = `Server Error ${response.status}`;
      } else {
        result.error_message = `HTTP ${response.status}`;
      }
    } else if (response.status >= 300 && response.status < 400) {
      if (!location || location === url || location === fullUrl) {
        result.is_broken = true;
        result.error_message = `Redirect loop or self-redirect (${response.status})`;
      }
    }
  } catch (err) {
    result.is_broken = true;
    result.error_message = err instanceof Error ? err.message : "Unknown fetch error";
  }

  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "full";

    const checkRunId = `crawl-${Date.now()}`;
    const results: CheckResult[] = [];
    const stats = {
      total_checked: 0,
      broken: 0,
      redirected: 0,
      ok: 0,
      internal_links_found: 0,
      start_time: new Date().toISOString(),
    };

    // Phase 1: Check all sitemap page statuses
    for (let i = 0; i < SITEMAP_PATHS.length; i += BATCH_SIZE) {
      const batch = SITEMAP_PATHS.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map((path) => checkUrl(path, "page_status"))
      );
      results.push(...batchResults);
    }

    stats.total_checked += results.filter((r) => r.check_type === "page_status").length;
    stats.broken += results.filter((r) => r.is_broken).length;
    stats.ok += results.filter((r) => !r.is_broken && r.status_code && r.status_code < 400).length;

    // Phase 2: Deep crawl — extract and check internal links from the 30 most trafficked pages
    if (mode === "full" || mode === "deep") {
      const seenLinks = new Set<string>();

      for (const path of DEEP_CRAWL_PATHS) {
        const fullUrl = `${SITE_URL}${path}`;
        const pageResult = await fetchPageWithTimeout(fullUrl, FETCH_TIMEOUT_MS);
        if (!pageResult || pageResult.response.status >= 400) continue;

        const links = extractInternalLinks(pageResult.body, fullUrl);
        stats.internal_links_found += links.length;

        for (let i = 0; i < links.length; i += BATCH_SIZE) {
          const batch = links.slice(i, i + BATCH_SIZE).filter((l) => !seenLinks.has(l));
          batch.forEach((l) => seenLinks.add(l));
          if (batch.length === 0) continue;

          const batchResults = await Promise.all(
            batch.map((link) => checkUrl(link, "internal_link", path))
          );
          results.push(...batchResults);
        }
      }

      stats.total_checked = results.length;
      stats.broken = results.filter((r) => r.is_broken).length;
      stats.ok = results.filter((r) => !r.is_broken && r.status_code && r.status_code < 400).length;
    }

    // Store results
    const rows = results.map((r) => ({
      check_run_id: checkRunId,
      source_url: r.source_url,
      target_url: r.target_url,
      status_code: r.status_code,
      is_internal: r.is_internal,
      is_broken: r.is_broken,
      error_message: r.error_message,
      content_type: r.content_type,
      redirect_url: r.redirect_url,
      check_type: r.check_type,
      checked_at: new Date().toISOString(),
    }));

    for (let i = 0; i < rows.length; i += 100) {
      const batch = rows.slice(i, i + 100);
      const { error } = await supabase.from("url_check_results").insert(batch);
      if (error) console.error("Insert error:", error.message);
    }

    // Cleanup: keep max 5 runs
    const { data: allRuns } = await supabase
      .from("url_check_results")
      .select("check_run_id")
      .order("checked_at", { ascending: false })
      .limit(5000);

    if (allRuns) {
      const runIds = [...new Set(allRuns.map((r) => r.check_run_id))];
      if (runIds.length > 5) {
        const idsToDelete = runIds.slice(5);
        for (const rid of idsToDelete) {
          await supabase.from("url_check_results").delete().eq("check_run_id", rid);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        check_run_id: checkRunId,
        stats,
        broken_count: stats.broken,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Crawl error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
