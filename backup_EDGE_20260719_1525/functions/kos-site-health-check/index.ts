import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface HealthCheckResult {
  scan_type: string;
  endpoint: string;
  status: string;
  score: number;
  details: Record<string, unknown>;
  errors: string[];
  recommendations: string[];
  duration_ms: number;
}

// Critical URLs to monitor for 200/301/404 status
const CRITICAL_URLS = [
  { path: "/", priority: "P0" },
  { path: "/services", priority: "P0" },
  { path: "/about", priority: "P0" },
  { path: "/contact", priority: "P0" },
  { path: "/blog", priority: "P0" },
  { path: "/lead-magnets", priority: "P1" },
  { path: "/lead-magnets/barometre-regtech-uemoa-2026", priority: "P1" },
  { path: "/lead-magnets/compliance-ohada-kos-ai", priority: "P1" },
  { path: "/lead-magnets/cartographie-risques-bancaires-afrique", priority: "P1" },
  { path: "/lead-magnets/checklist-conformite-bceao-cobac", priority: "P1" },
  { path: "/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026", priority: "P1" },
  { path: "/case-studies", priority: "P1" },
  { path: "/think-tank", priority: "P1" },
  { path: "/tools", priority: "P1" },
  { path: "/industries", priority: "P2" },
  { path: "/regions/uemoa-cemac", priority: "P2" },
  { path: "/geo-hub", priority: "P2" },
  { path: "/knowledge-hub", priority: "P2" },
  { path: "/sitemap", priority: "P2" },
  { path: "/diagnostic-flash", priority: "P2" },
  { path: "/offre-commerciale", priority: "P2" },
  { path: "/strategie-digitale", priority: "P3" },
  { path: "/guide-bceao-2026", priority: "P3" },
  { path: "/pourquoi-khepra", priority: "P3" },
  { path: "/decideurs", priority: "P3" },
  { path: "/investisseurs", priority: "P3" },
  { path: "/projets-industriels", priority: "P3" },
  { path: "/equipe", priority: "P3" },
  { path: "/expertises", priority: "P3" },
];

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const target = url.searchParams.get("url") || "https://khepraexperts.com";
    const action = url.searchParams.get("action") || "full";
    
    const results: HealthCheckResult[] = [];
    const startTime = Date.now();

    // === SCAN 0: URL Status Monitoring (200/301/404) ===
    if (action === "full" || action === "urls") {
      const urlsStart = Date.now();
      const urlResults: Record<string, unknown>[] = [];
      let urlsOk = 0;
      let urlsWarn = 0;
      let urlsFail = 0;
      const urlErrors: string[] = [];
      const urlRecs: string[] = [];

      for (const criticalUrl of CRITICAL_URLS) {
        try {
          const fullUrl = `${target}${criticalUrl.path}`;
          const resp = await fetch(fullUrl, { 
            method: "HEAD", 
            redirect: "manual"
          });
          const status = resp.status;
          const redirected = resp.headers.get("location") || "";
          const isOk = status === 200;
          const isRedirect = status === 301 || status === 302 || status === 307 || status === 308;
          const isNotFound = status === 404;
          const isError = status >= 500;

          if (isOk) urlsOk++;
          else if (isRedirect) urlsWarn++;
          else if (isNotFound || isError) urlsFail++;

          urlResults.push({
            path: criticalUrl.path,
            priority: criticalUrl.priority,
            status,
            redirected_to: redirected || null,
            is_ok: isOk,
            is_redirect: isRedirect,
            is_not_found: isNotFound,
            is_server_error: isError,
          });

          if (isNotFound) {
            urlErrors.push(`404 sur ${criticalUrl.path} [${criticalUrl.priority}]`);
            urlRecs.push(`Vérifier que la page ${criticalUrl.path} existe et est déployée`);
          } else if (isError) {
            urlErrors.push(`${status} sur ${criticalUrl.path} [${criticalUrl.priority}]`);
            urlRecs.push(`Erreur serveur sur ${criticalUrl.path} — investigation requise`);
          } else if (isRedirect && criticalUrl.priority === "P0") {
            urlRecs.push(`${criticalUrl.path} redirige vers ${redirected} — vérifier si c'est intentionnel`);
          }
        } catch (_e) {
          urlsFail++;
          urlErrors.push(`Échec de connexion sur ${criticalUrl.path} [${criticalUrl.priority}]`);
          urlRecs.push(`Vérifier que le site est en ligne et que ${criticalUrl.path} est accessible`);
          urlResults.push({
            path: criticalUrl.path,
            priority: criticalUrl.priority,
            status: 0,
            redirected_to: null,
            is_ok: false,
            is_redirect: false,
            is_not_found: false,
            is_server_error: false,
            error: "Connection failed",
          });
        }
      }

      const urlScore = urlsFail === 0 ? (urlsWarn === 0 ? 10 : 8) : urlsFail > 3 ? 3 : 5;
      results.push({
        scan_type: "url_status_monitor",
        endpoint: target,
        status: urlScore >= 8 ? "pass" : urlScore >= 5 ? "warn" : "fail",
        score: urlScore,
        details: {
          total_urls: CRITICAL_URLS.length,
          ok: urlsOk,
          redirects: urlsWarn,
          not_found: urlsFail,
          urls: urlResults,
        },
        errors: urlErrors,
        recommendations: urlRecs,
        duration_ms: Date.now() - urlsStart,
      });
    }

    // === SCAN 1: HTTP Security Headers ===
    try {
      const headersStart = Date.now();
      const resp = await fetch(target, { method: "HEAD", redirect: "follow" });
      const respHeaders = resp.headers;
      const headerChecks: Record<string, boolean> = {
        "Strict-Transport-Security": respHeaders.has("strict-transport-security"),
        "Content-Security-Policy": respHeaders.has("content-security-policy"),
        "X-Frame-Options": respHeaders.has("x-frame-options"),
        "X-Content-Type-Options": respHeaders.has("x-content-type-options"),
        "Referrer-Policy": respHeaders.has("referrer-policy"),
      };
      const passed = Object.values(headerChecks).filter(Boolean).length;
      const total = Object.keys(headerChecks).length;
      const headerScore = Math.round((passed / total) * 10);
      const headerErrors: string[] = [];
      const headerRecs: string[] = [];
      for (const [h, ok] of Object.entries(headerChecks)) {
        if (!ok) {
          headerErrors.push(`Header ${h} manquant`);
          headerRecs.push(`Ajouter ${h} dans netlify.toml ou _headers`);
        }
      }
      results.push({
        scan_type: "http_headers",
        endpoint: target,
        status: headerScore >= 8 ? "pass" : headerScore >= 5 ? "warn" : "fail",
        score: headerScore,
        details: { headers_found: passed, headers_total: total, checks: headerChecks },
        errors: headerErrors,
        recommendations: headerRecs,
        duration_ms: Date.now() - headersStart,
      });
    } catch (e) {
      results.push({
        scan_type: "http_headers",
        endpoint: target,
        status: "error",
        score: 0,
        details: { error: String(e) },
        errors: ["Impossible de scanner les headers HTTP"],
        recommendations: ["Vérifier que le site est accessible"],
        duration_ms: Date.now() - startTime,
      });
    }

    // === SCAN 2: robots.txt ===
    try {
      const robotsStart = Date.now();
      const robotsResp = await fetch(`${target}/robots.txt`);
      const robotsText = await robotsResp.text();
      const hasSitemap = robotsText.includes("Sitemap:");
      const hasDisallowAdmin = robotsText.includes("Disallow: /administrateur") || robotsText.includes("Disallow: /admin");
      const robotsErrors: string[] = [];
      const robotsRecs: string[] = [];
      if (!hasSitemap) { robotsErrors.push("Pas de Sitemap dans robots.txt"); robotsRecs.push("Ajouter Sitemap: https://khepraexperts.com/sitemap.xml"); }
      if (!hasDisallowAdmin) { robotsRecs.push("Ajouter Disallow pour les pages admin sensibles"); }
      const robotsScore = hasSitemap ? (hasDisallowAdmin ? 10 : 8) : 5;
      results.push({
        scan_type: "robots_txt",
        endpoint: `${target}/robots.txt`,
        status: robotsScore >= 8 ? "pass" : "warn",
        score: robotsScore,
        details: { has_sitemap: hasSitemap, has_disallow_admin: hasDisallowAdmin, line_count: robotsText.split("\n").length },
        errors: robotsErrors,
        recommendations: robotsRecs,
        duration_ms: Date.now() - robotsStart,
      });
    } catch (e) {
      results.push({
        scan_type: "robots_txt",
        endpoint: `${target}/robots.txt`,
        status: "error",
        score: 0,
        details: { error: String(e) },
        errors: ["robots.txt inaccessible"],
        recommendations: ["Vérifier que robots.txt est accessible"],
        duration_ms: 0,
      });
    }

    // === SCAN 3: sitemap.xml ===
    try {
      const sitemapStart = Date.now();
      const sitemapResp = await fetch(`${target}/sitemap.xml`);
      const sitemapText = await sitemapResp.text();
      const urlCount = (sitemapText.match(/<loc>/g) || []).length;
      const hasHreflang = sitemapText.includes('hreflang="fr"') || sitemapText.includes('hreflang="en"');
      const sitemapErrors: string[] = [];
      const sitemapRecs: string[] = [];
      if (urlCount < 50) { sitemapErrors.push(`Seulement ${urlCount} URLs dans le sitemap`); sitemapRecs.push("Vérifier que le sitemap inclut toutes les pages"); }
      if (!hasHreflang) { sitemapRecs.push("Ajouter les annotations hreflang multilingues dans le sitemap"); }
      const sitemapScore = urlCount >= 100 ? 10 : urlCount >= 50 ? 7 : 4;
      results.push({
        scan_type: "sitemap_xml",
        endpoint: `${target}/sitemap.xml`,
        status: sitemapScore >= 7 ? "pass" : "warn",
        score: sitemapScore,
        details: { url_count: urlCount, size_bytes: sitemapText.length, has_hreflang: hasHreflang },
        errors: sitemapErrors,
        recommendations: sitemapRecs,
        duration_ms: Date.now() - sitemapStart,
      });
    } catch (e) {
      results.push({
        scan_type: "sitemap_xml",
        endpoint: `${target}/sitemap.xml`,
        status: "error",
        score: 0,
        details: { error: String(e) },
        errors: ["Sitemap inaccessible"],
        recommendations: ["Vérifier que sitemap.xml est accessible"],
        duration_ms: 0,
      });
    }

    // === SCAN 4: Page load performance + SEO ===
    try {
      const perfStart = Date.now();
      const pageResp = await fetch(target);
      const html = await pageResp.text();
      const hasCanonical = html.includes('rel="canonical"') || html.includes("rel=canonical");
      const hasH1 = (html.match(/<h1[^>]*>/gi) || []).length > 0;
      const hasMetaDesc = html.includes('name="description"');
      const hasOgTags = html.includes('og:title') && html.includes('og:description');
      const hasSchemaOrg = html.includes('application/ld+json') || html.includes('itemscope');
      const hasHreflangTags = html.includes('hreflang="fr"');
      const perfChecks = { canonical: hasCanonical, h1: hasH1, meta_description: hasMetaDesc, og_tags: hasOgTags, schema_org: hasSchemaOrg, hreflang_tags: hasHreflangTags };
      const passed = Object.values(perfChecks).filter(Boolean).length;
      const perfScore = Math.round((passed / 6) * 10);
      const perfErrors: string[] = [];
      const perfRecs: string[] = [];
      if (!hasCanonical) { perfErrors.push("Canonical URL manquant"); perfRecs.push("Ajouter <link rel=canonical> dans <head>"); }
      if (!hasH1) { perfErrors.push("Balise H1 manquante"); perfRecs.push("Ajouter un H1 sur la page"); }
      if (!hasMetaDesc) { perfErrors.push("Meta description manquante"); perfRecs.push("Ajouter <meta name=description>"); }
      if (!hasOgTags) { perfErrors.push("Open Graph tags incomplets"); perfRecs.push("Compléter og:title et og:description"); }
      if (!hasSchemaOrg) { perfErrors.push("Schema.org absent"); perfRecs.push("Ajouter structured data JSON-LD"); }
      if (!hasHreflangTags) { perfRecs.push("Ajouter les balises hreflang pour les 12 langues"); }
      results.push({
        scan_type: "page_seo",
        endpoint: target,
        status: perfScore >= 8 ? "pass" : perfScore >= 5 ? "warn" : "fail",
        score: perfScore,
        details: { ...perfChecks, html_size_bytes: html.length, load_time_ms: Date.now() - perfStart },
        errors: perfErrors,
        recommendations: perfRecs,
        duration_ms: Date.now() - perfStart,
      });
    } catch (e) {
      results.push({
        scan_type: "page_seo",
        endpoint: target,
        status: "error",
        score: 0,
        details: { error: String(e) },
        errors: ["Impossible de charger la page"],
        recommendations: ["Vérifier que le site est en ligne"],
        duration_ms: 0,
      });
    }

    // === STORE RESULTS IN SUPABASE ===
    for (const r of results) {
      try {
        await supabase.from("site_health_checks").insert({
          scan_type: r.scan_type,
          endpoint: r.endpoint,
          status: r.status,
          score: r.score,
          details: r.details,
          errors: r.errors,
          recommendations: r.recommendations,
          duration_ms: r.duration_ms,
        });
      } catch (_) {
        // silent insert failure - edge function still returns results
      }
    }

    const avgScore = results.reduce((s, r) => s + r.score, 0) / (results.length || 1);
    const totalDuration = Date.now() - startTime;

    const totalUrlsScanned = CRITICAL_URLS.length;
    const urlsOk = action === "full" || action === "urls"
      ? ((results[0]?.details as Record<string, unknown>)?.ok as number) || 0
      : 0;
    const urlsFail = action === "full" || action === "urls"
      ? ((results[0]?.details as Record<string, unknown>)?.not_found as number) || 0
      : 0;

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        target_url: target,
        scan_count: results.length,
        average_score: Math.round(avgScore * 10) / 10,
        total_duration_ms: totalDuration,
        url_monitoring: {
          total: totalUrlsScanned,
          ok: urlsOk,
          fail: urlsFail,
          coverage_pct: totalUrlsScanned > 0 ? Math.round((urlsOk / totalUrlsScanned) * 100) : 0,
        },
        results,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
