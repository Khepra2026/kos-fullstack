import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ═══════════════════════════════════════════════════
// KOS GEO VISIBILITY ENGINE v3
// Scanner multi-couche : llms.txt + AI Crawlers + Schema.org
// v3 : JWT + Admin obligatoire
// ═══════════════════════════════════════════════════

async function authenticate(req: Request): Promise<{ isAdmin: boolean; isServiceRole: boolean }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { isAdmin: false, isServiceRole: false };
  }

  const token = authHeader.replace("Bearer ", "");
  if (token === serviceRoleKey) return { isAdmin: true, isServiceRole: true };

  try {
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    if (error || !user) return { isAdmin: false, isServiceRole: false };
    const { data: profile } = await supabaseAdmin.from("profiles").select("system_role").eq("id", user.id).maybeSingle();
    const isAdmin = profile?.system_role === "admin" || profile?.system_role === "superadmin" || profile?.system_role === "owner";
    return { isAdmin, isServiceRole: false };
  } catch {
    return { isAdmin: false, isServiceRole: false };
  }
}

interface GeoScanRequest {
  target_url?: string;
  mode?: "full" | "quick" | "llms-only" | "crawlers-only" | "schema-only";
  store_results?: boolean;
}

interface AICrawlerCheck {
  bot_name: string;
  user_agent: string;
  allowed: boolean;
  llms_txt_discovered: boolean;
  robots_txt_section: boolean;
  status: "ok" | "warning" | "error";
  last_activity: string | null;
}

interface LlmsCheck {
  url: string;
  exists: boolean;
  size_bytes: number;
  sections_count: number;
  last_modified: string | null;
  cache_headers_ok: boolean;
  content_type_ok: boolean;
  completeness_score: number;
  issues: string[];
}

interface SchemaOrgCheck {
  page_url: string;
  schema_types_found: string[];
  total_schemas: number;
  validation_errors: number;
  rich_results_eligible: boolean;
}

interface GeoScanResult {
  timestamp: string;
  target_url: string;
  overall_score: number;
  llms_check: LlmsCheck;
  crawlers_checks: AICrawlerCheck[];
  schema_checks: SchemaOrgCheck[];
  recommendations: string[];
  metrics: {
    ai_crawlers_allowed: number;
    ai_crawlers_blocked: number;
    llms_completeness_pct: number;
    schema_rich_results_pct: number;
    geo_readiness: "excellent" | "good" | "needs_work" | "critical";
  };
}

const AI_CRAWLERS: { bot_name: string; user_agent: string }[] = [
  { bot_name: "GPTBot (OpenAI)", user_agent: "GPTBot" },
  { bot_name: "ChatGPT-User (OpenAI)", user_agent: "ChatGPT-User" },
  { bot_name: "Claude-Web (Anthropic)", user_agent: "Claude-Web" },
  { bot_name: "ClaudeBot (Anthropic)", user_agent: "ClaudeBot" },
  { bot_name: "PerplexityBot", user_agent: "PerplexityBot" },
  { bot_name: "Google-Extended (Gemini)", user_agent: "Google-Extended" },
  { bot_name: "Applebot-Extended", user_agent: "Applebot-Extended" },
  { bot_name: "cohere-ai", user_agent: "cohere-ai" },
  { bot_name: "Amazonbot", user_agent: "Amazonbot" },
  { bot_name: "meta-externalagent", user_agent: "meta-externalagent" },
  { bot_name: "OAI-SearchBot (OpenAI Search)", user_agent: "OAI-SearchBot" },
];

const SCHEMA_PAGES = [
  "/", "/about/", "/services/", "/blog/", "/case-studies/", "/contact/",
  "/think-tank/", "/regulation-financiere/", "/prix-de-transfert/", "/gouvernance-risques/",
];

async function checkLlmsTxt(baseUrl: string): Promise<LlmsCheck> {
  const llmsUrl = `${baseUrl}/llms.txt`;
  const llmsFullUrl = `${baseUrl}/llms-full.txt`;
  const issues: string[] = [];
  let exists = false, sizeBytes = 0, sectionsCount = 0;
  let lastModified: string | null = null, cacheOk = false, contentTypeOk = false;

  try {
    const resp = await fetch(llmsUrl, { method: "GET", headers: { "User-Agent": "KOS-GEO-Scanner/3.0" }, signal: AbortSignal.timeout(10000) });
    if (resp.ok) {
      exists = true;
      const text = await resp.text();
      sizeBytes = new TextEncoder().encode(text).length;
      sectionsCount = (text.match(/^## /gm) || []).length + (text.match(/^### /gm) || []).length;
      const ct = resp.headers.get("content-type") || "";
      contentTypeOk = ct.includes("text/plain");
      const cc = resp.headers.get("cache-control") || "";
      cacheOk = cc.includes("max-age") || cc.includes("public");
      lastModified = resp.headers.get("last-modified") || null;

      if (!text.includes("KHEPRA EXPERTS")) issues.push("Brand name missing from llms.txt");
      if (sizeBytes < 5000) issues.push(`llms.txt too small (${sizeBytes}B), likely incomplete`);
      if (sectionsCount < 10) issues.push(`Only ${sectionsCount} sections found, should have 15+`);
      if (!text.includes("https://khepraexperts.com")) issues.push("Missing canonical URLs in llms.txt");

      const dateMatch = text.match(/Dernière mise à jour : (\d{4}-\d{2}-\d{2})/);
      if (dateMatch) {
        const daysSince = Math.floor((Date.now() - new Date(dateMatch[1]).getTime()) / 86400000);
        if (daysSince > 3) issues.push(`llms.txt is ${daysSince} days stale`);
      }

      try {
        const fullResp = await fetch(llmsFullUrl, { method: "HEAD", headers: { "User-Agent": "KOS-GEO-Scanner/3.0" }, signal: AbortSignal.timeout(5000) });
        if (!fullResp.ok) issues.push("llms-full.txt not accessible");
        else { const fullSize = parseInt(fullResp.headers.get("content-length") || "0"); if (fullSize < 20000) issues.push(`llms-full.txt too small (${fullSize}B)`); }
      } catch { issues.push("llms-full.txt check failed"); }
    } else { issues.push(`llms.txt returned HTTP ${resp.status}`); }
  } catch (e) { issues.push(`llms.txt fetch failed: ${e instanceof Error ? e.message : String(e)}`); }

  const completenessScore = exists ? Math.max(0, 100 - (issues.length * 12)) : 0;
  return { url: llmsUrl, exists, size_bytes: sizeBytes, sections_count: sectionsCount, last_modified: lastModified, cache_headers_ok: cacheOk, content_type_ok: contentTypeOk, completeness_score: completenessScore, issues };
}

async function checkAICrawlers(baseUrl: string): Promise<AICrawlerCheck[]> {
  const results: AICrawlerCheck[] = [];
  let robotsContent = "";
  try {
    const resp = await fetch(`${baseUrl}/robots.txt`, { headers: { "User-Agent": "KOS-GEO-Scanner/3.0" }, signal: AbortSignal.timeout(10000) });
    if (resp.ok) robotsContent = await resp.text();
  } catch { /* flag as error for all */ }

  for (const crawler of AI_CRAWLERS) {
    const hasSection = robotsContent.includes(`User-agent: ${crawler.user_agent}`);
    const sectionBlock = hasSection ? robotsContent.split(`User-agent: ${crawler.user_agent}`)[1]?.split(/\nUser-agent:/)[0] || "" : "";
    const isAllowed = hasSection ? !sectionBlock.match(/Disallow:\s*\/\s*$/) : false;
    const llmsDiscovered = robotsContent.includes("llms.txt");
    let status: "ok" | "warning" | "error" = "ok";
    if (!hasSection) status = "warning";
    if (!isAllowed && hasSection) status = "error";
    results.push({ bot_name: crawler.bot_name, user_agent: crawler.user_agent, allowed: isAllowed, llms_txt_discovered: llmsDiscovered, robots_txt_section: hasSection, status, last_activity: hasSection && isAllowed ? new Date().toISOString() : null });
  }
  return results;
}

async function checkSchemaOrg(baseUrl: string): Promise<SchemaOrgCheck[]> {
  const results: SchemaOrgCheck[] = [];
  for (const page of SCHEMA_PAGES) {
    try {
      const resp = await fetch(`${baseUrl}${page}`, { headers: { "User-Agent": "KOS-GEO-Scanner/3.0" }, signal: AbortSignal.timeout(15000) });
      if (!resp.ok) { results.push({ page_url: `${baseUrl}${page}`, schema_types_found: [], total_schemas: 0, validation_errors: 1, rich_results_eligible: false }); continue; }
      const html = await resp.text();
      const ldJsonMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];
      const typesFound: string[] = [];
      let errors = 0;
      for (const match of ldJsonMatches) {
        const jsonStr = match.replace(/<script type="application\/ld\+json">/, "").replace(/<\/script>/, "");
        try {
          const parsed = JSON.parse(jsonStr);
          if (parsed["@type"]) { if (Array.isArray(parsed["@type"])) typesFound.push(...parsed["@type"]); else typesFound.push(parsed["@type"]); }
          if (!parsed["@context"]) errors++;
        } catch { errors++; }
      }
      const hasRichResultMarkup = ldJsonMatches.length > 0 && (typesFound.includes("FAQPage") || typesFound.includes("HowTo") || typesFound.includes("Article") || typesFound.includes("BreadcrumbList") || typesFound.includes("Organization") || typesFound.includes("ProfessionalService") || typesFound.includes("WebPage") || typesFound.includes("Person"));
      results.push({ page_url: `${baseUrl}${page}`, schema_types_found: typesFound, total_schemas: ldJsonMatches.length, validation_errors: errors, rich_results_eligible: hasRichResultMarkup });
    } catch {
      results.push({ page_url: `${baseUrl}${page}`, schema_types_found: [], total_schemas: 0, validation_errors: 1, rich_results_eligible: false });
    }
  }
  return results;
}

function generateRecommendations(llms: LlmsCheck, crawlers: AICrawlerCheck[], schemas: SchemaOrgCheck[]): string[] {
  const recs: string[] = [];
  if (!llms.exists) recs.push("CRITICAL: llms.txt is missing — create it immediately for AI crawler ingestion");
  if (llms.completeness_score < 70) recs.push(`llms.txt completeness is ${llms.completeness_score}/100 — needs expansion`);
  if (llms.completeness_score < 90 && llms.exists) recs.push(`llms.txt completeness could be improved (${llms.completeness_score}/100)`);
  if (!llms.cache_headers_ok) recs.push("Add Cache-Control headers to llms.txt");
  if (!llms.content_type_ok) recs.push("Set Content-Type: text/plain; charset=utf-8 for llms.txt");
  const missingCrawlers = crawlers.filter(c => !c.robots_txt_section);
  if (missingCrawlers.length > 0) recs.push(`${missingCrawlers.length} AI crawlers missing from robots.txt: ${missingCrawlers.map(c => c.user_agent).join(", ")}`);
  const blockedCrawlers = crawlers.filter(c => c.robots_txt_section && !c.allowed);
  if (blockedCrawlers.length > 0) recs.push(`${blockedCrawlers.length} AI crawlers have access restrictions`);
  const pagesNoSchema = schemas.filter(s => s.total_schemas === 0);
  if (pagesNoSchema.length > 2) recs.push(`${pagesNoSchema.length} pages have zero Schema.org markup`);
  if (!schemas.some(s => s.schema_types_found.includes("FAQPage"))) recs.push("No FAQPage schema detected — add FAQ structured data");
  return recs;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // ─── JWT + Admin Gate ───
  const { isAdmin, isServiceRole } = await authenticate(req);
  if (!isAdmin && !isServiceRole) {
    return new Response(JSON.stringify({ success: false, error: "Accès non autorisé — JWT Admin requis", error_code: "UNAUTHORIZED", engine: "kos-geo-visibility-v3" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const startTime = Date.now();

  try {
    const body: GeoScanRequest = await req.json();
    const targetUrl = body.target_url || "https://khepraexperts.com";
    const mode = body.mode || "full";
    const storeResults = body.store_results !== false;

    console.log(`[KOS-GEO v3] Starting ${mode} scan on ${targetUrl} — auth: ${isServiceRole ? "service_role" : "jwt_admin"}`);

    const [llmsCheck, crawlersChecks, schemaChecks] = await Promise.all([
      (mode === "full" || mode === "llms-only") ? checkLlmsTxt(targetUrl) : Promise.resolve(null as unknown as LlmsCheck),
      (mode === "full" || mode === "crawlers-only") ? checkAICrawlers(targetUrl) : Promise.resolve([] as AICrawlerCheck[]),
      (mode === "full" || mode === "schema-only") ? checkSchemaOrg(targetUrl) : Promise.resolve([] as SchemaOrgCheck[]),
    ]);

    const recommendations = generateRecommendations(llmsCheck, crawlersChecks, schemaChecks);
    const allowedCrawlers = crawlersChecks.filter(c => c.allowed).length;
    const richPages = schemaChecks.filter(s => s.rich_results_eligible).length;
    const schemaRichPct = schemaChecks.length > 0 ? Math.round((richPages / schemaChecks.length) * 100) : 0;
    const llmsScore = llmsCheck?.completeness_score || 0;
    const crawlerScore = crawlersChecks.length > 0 ? Math.round((allowedCrawlers / crawlersChecks.length) * 100) : 0;
    const overallScore = Math.round((llmsScore * 0.35) + (crawlerScore * 0.30) + (schemaRichPct * 0.35));

    let geoReadiness: "excellent" | "good" | "needs_work" | "critical" = "critical";
    if (overallScore >= 90) geoReadiness = "excellent";
    else if (overallScore >= 70) geoReadiness = "good";
    else if (overallScore >= 40) geoReadiness = "needs_work";

    const result: GeoScanResult = {
      timestamp: new Date().toISOString(), target_url: targetUrl, overall_score: overallScore,
      llms_check: llmsCheck, crawlers_checks: crawlersChecks, schema_checks: schemaChecks, recommendations,
      metrics: { ai_crawlers_allowed: allowedCrawlers, ai_crawlers_blocked: crawlersChecks.length - allowedCrawlers, llms_completeness_pct: llmsCheck?.completeness_score || 0, schema_rich_results_pct: schemaRichPct, geo_readiness: geoReadiness },
    };

    if (storeResults) {
      try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
        const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
        const supabase = createClient(supabaseUrl, supabaseKey, { auth: { autoRefreshToken: false, persistSession: false } });
        await supabase.from("geo_visibility_logs").insert({ log_type: "geo_scan", target_url: targetUrl, score: overallScore, status: overallScore >= 70 ? "pass" : "fail", details: result, recommendations, errors: llmsCheck?.issues || [], duration_ms: Date.now() - startTime, triggered_by: "kos-geo-visibility-engine-v3" });
        console.log("[KOS-GEO v3] Results stored in geo_visibility_logs");
      } catch (storeErr) { console.error("[KOS-GEO v3] Failed to store results:", storeErr); }
    }

    return new Response(JSON.stringify({ ...result, engine: "kos-geo-visibility-v3", auth_mode: isServiceRole ? "service_role" : "jwt_admin" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 });
  } catch (err) {
    console.error("[KOS-GEO v3] Scan failed:", err);
    return new Response(JSON.stringify({ error: err instanceof Error ? err.message : String(err), timestamp: new Date().toISOString(), engine: "kos-geo-visibility-v3" }), { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 });
  }
});