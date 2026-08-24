import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://khepraexperts.com";
const FETCH_TIMEOUT_MS = 20000;
const BATCH_SIZE = 3;

const PRIORITY_PAGES = [
  "/", "/about", "/contact", "/expertises", "/services", "/blog",
  "/case-studies", "/insights", "/resources", "/tools", "/decideurs",
  "/investisseurs", "/sfd-conformite", "/regulation-financiere",
  "/prix-de-transfert", "/gouvernance-risques", "/compliance-management",
  "/bceao", "/cobac", "/ohada", "/gafi", "/knowledge-hub", "/geo-hub",
  "/think-tank", "/khepra-os-2", "/offre-commerciale", "/board-report",
  "/diagnostic-flash", "/strategie-digitale", "/formations", "/webinars",
  "/services/conseil-strategique", "/services/regtech-regulatory-engineering",
  "/services/audit-pre-inspection-bceao", "/services/levee-de-fonds",
  "/services/due-diligence-acquisition", "/services/gouvernance-fiscalite-internationale",
  "/services/family-office-afrique", "/services/agrement-fintech-etablissement-paiement",
  "/services/controle-interne-bancaire", "/services/defense-fiscale-prix-transfert",
  "/services/ceo-advisory-board",
];

async function fetchPage(url: string): Promise<{ response: Response; body: string } | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const start = Date.now();
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "User-Agent": "KhepraExperts-SEOAudit/1.0" },
    });
    const body = await response.text();
    return { response, body };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractHn(html: string): { h1: string[]; h2: string[]; h3: string[] } {
  const h1: string[] = [];
  const h2: string[] = [];
  const h3: string[] = [];

  const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
  const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/gi;
  const h3Regex = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;

  let m;
  while ((m = h1Regex.exec(html)) !== null) h1.push(m[1].replace(/<[^>]+>/g, "").trim());
  while ((m = h2Regex.exec(html)) !== null) h2.push(m[1].replace(/<[^>]+>/g, "").trim());
  while ((m = h3Regex.exec(html)) !== null) h3.push(m[1].replace(/<[^>]+>/g, "").trim());

  return { h1, h2, h3 };
}

function extractMeta(html: string): { title: string; description: string; descriptionLength: number; canonical: string; hasOg: boolean; hasTwitter: boolean; robotsNoindex: boolean } {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)
    || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i);
  const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  const hasOg = html.includes("og:title") && html.includes("og:description");
  const hasTwitter = html.includes("twitter:card");
  const robotsNoindex = html.includes("noindex");

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    description: descMatch ? descMatch[1].trim() : "",
    descriptionLength: descMatch ? descMatch[1].trim().length : 0,
    canonical: canonicalMatch ? canonicalMatch[1] : "",
    hasOg,
    hasTwitter,
    robotsNoindex,
  };
}

function extractImages(html: string): { total: number; withoutAlt: number; brokenUrls: string[] } {
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const withoutAlt: string[] = [];
  const brokenUrls: string[] = [];
  let total = 0;

  let m;
  while ((m = imgRegex.exec(html)) !== null) {
    total++;
    const fullTag = m[0];
    if (!fullTag.includes("alt=") || fullTag.includes('alt=""')) {
      withoutAlt.push(m[1]);
    }
  }

  return { total, withoutAlt: withoutAlt.length, brokenUrls };
}

function extractLinks(html: string, baseUrl: string): { internal: number; external: number; brokenHint: string[] } {
  const hrefRegex = /<a\s[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let internal = 0;
  let external = 0;
  const potentialBroken: string[] = [];

  let m;
  while ((m = hrefRegex.exec(html)) !== null) {
    const href = m[1];
    if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    try {
      const resolved = new URL(href, baseUrl);
      if (resolved.hostname === "khepraexperts.com" || resolved.hostname.endsWith(".khepraexperts.com")) {
        internal++;
      } else {
        external++;
      }
    } catch {
      potentialBroken.push(href);
    }
  }

  return { internal, external, brokenHint: potentialBroken };
}

function extractSchema(html: string): { hasSchema: boolean; types: string[]; hasFaq: boolean; hasHowto: boolean; hasSpeakable: boolean } {
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types: string[] = [];
  let hasSchema = false;
  let hasFaq = false;
  let hasHowto = false;
  let hasSpeakable = false;

  let m;
  while ((m = jsonLdRegex.exec(html)) !== null) {
    hasSchema = true;
    const json = m[1];
    if (json.includes('"@type"') && json.includes("FAQPage")) { hasFaq = true; types.push("FAQPage"); }
    if (json.includes('"@type"') && json.includes("HowTo")) { hasHowto = true; types.push("HowTo"); }
    if (json.includes('"@type"') && json.includes("SpeakableSpecification")) { hasSpeakable = true; types.push("SpeakableSpecification"); }
    if (json.includes('"@type"') && json.includes("WebPage")) types.push("WebPage");
    if (json.includes('"@type"') && json.includes("Organization")) types.push("Organization");
    if (json.includes('"@type"') && json.includes("BreadcrumbList")) types.push("BreadcrumbList");
    if (json.includes('"@type"') && json.includes("Article")) types.push("Article");
    if (json.includes('"@type"') && json.includes("ProfessionalService")) types.push("ProfessionalService");
  }

  if (html.includes("itemscope")) {
    hasSchema = true;
    if (!types.includes("Microdata")) types.push("Microdata");
  }

  return { hasSchema, types: [...new Set(types)], hasFaq, hasHowto, hasSpeakable };
}

function analyzeAEO(html: string, title: string): {
  featuredSnippetScore: number;
  questionsDetected: number;
  answersDetected: number;
  recs: string[];
} {
  const recs: string[] = [];
  let questionsDetected = 0;
  let answersDetected = 0;

  // Detect question-like H2s and H3s (indicators for featured snippets)
  const h2Match = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  const h3Match = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
  const allHeaders = [...h2Match, ...h3Match];

  const questionPatterns = /\b(comment|pourquoi|qu'est-ce que|qui|quand|où|quel|quelle|quels|quelles|combien|comment faire|guide|définition)\b/gi;

  for (const h of allHeaders) {
    const text = h.replace(/<[^>]+>/g, "").trim();
    if (text.match(questionPatterns) || text.endsWith("?")) {
      questionsDetected++;
    }
  }

  // Detect if there are actual answer-like paragraphs after questions
  const pAfterH2 = (html.match(/<\/h2>\s*<p[^>]*>([\s\S]{50,})<\/p>/gi) || []).length;
  const listAfterH2 = (html.match(/<\/h2>\s*<(ul|ol)[^>]*>/gi) || []).length;
  answersDetected = pAfterH2 + listAfterH2;

  // Featured snippet optimization
  let featuredSnippetScore = 5;

  // Check for definition-style content
  if (html.includes("<dl") || html.includes("<dt")) featuredSnippetScore += 1;

  // Check for list-based answers (good for bulleted snippets)
  if (listAfterH2 >= 2) featuredSnippetScore += 1;

  // Check for table data (good for table snippets)
  if (html.includes("<table")) featuredSnippetScore += 0.5;

  // Check if title is question-like (good for featured snippet CTR)
  if (title.match(questionPatterns)) featuredSnippetScore += 0.5;

  // Recommendations
  if (questionsDetected === 0) recs.push("Ajouter des H2/H3 sous forme de questions pour cibler les featured snippets");
  if (answersDetected < 3) recs.push("Ajouter des réponses concises (40-60 mots) après chaque H2 pour optimiser les extraits optimisés");
  if (!html.includes("<dl") && !html.includes("<dt")) recs.push("Ajouter des listes de définitions (dl/dt/dd) pour les featured snippets de type définition");
  if (!html.includes("<table")) recs.push("Envisager des tableaux structurés pour les featured snippets tabulaires");

  featuredSnippetScore = Math.min(10, Math.max(1, featuredSnippetScore));

  return { featuredSnippetScore, questionsDetected, answersDetected, recs };
}

function computeScores(
  hn: { h1: string[]; h2: string[]; h3: string[] },
  meta: ReturnType<typeof extractMeta>,
  images: ReturnType<typeof extractImages>,
  schema: ReturnType<typeof extractSchema>,
  wordCount: number,
): { hnScore: number; contentScore: number; seoScore: number } {
  // Hn structure score
  let hnScore = 5;
  if (hn.h1.length === 1) hnScore += 2;
  else if (hn.h1.length > 1) hnScore += 0; // multiple H1 is bad
  else hnScore -= 2; // no H1 at all
  if (hn.h2.length >= 2) hnScore += 1.5;
  if (hn.h3.length >= 3) hnScore += 0.5;
  if (hn.h2.length === 0 && wordCount > 300) hnScore -= 1;
  hnScore = Math.min(10, Math.max(1, hnScore));

  // Content quality score
  let contentScore = 5;
  if (wordCount >= 800) contentScore += 2;
  else if (wordCount >= 400) contentScore += 1;
  else if (wordCount < 200) contentScore -= 1;
  if (images.total >= 2) contentScore += 1;
  if (images.withoutAlt === 0 && images.total > 0) contentScore += 1;
  else if (images.withoutAlt > 0) contentScore -= 0.5;
  if (meta.descriptionLength >= 120 && meta.descriptionLength <= 160) contentScore += 1;
  contentScore = Math.min(10, Math.max(1, contentScore));

  // SEO Score
  let seoScore = 5;
  if (meta.title.length >= 30 && meta.title.length <= 60) seoScore += 1;
  if (meta.descriptionLength >= 120 && meta.descriptionLength <= 160) seoScore += 1;
  if (hn.h1.length === 1) seoScore += 1;
  if (meta.hasOg) seoScore += 0.5;
  if (meta.hasTwitter) seoScore += 0.5;
  if (schema.hasSchema) seoScore += 1;
  seoScore = Math.min(10, Math.max(1, seoScore));

  return { hnScore, contentScore, seoScore };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const mode = url.searchParams.get("mode") || "priority";
    const targetUrl = url.searchParams.get("url");

    const auditRunId = `seo-audit-${Date.now()}`;
    const pagesToCrawl: string[] = targetUrl
      ? [targetUrl]
      : mode === "full"
        ? PRIORITY_PAGES
        : PRIORITY_PAGES.slice(0, 15);

    const results: Array<Record<string, unknown>> = [];
    let totalCritical = 0;
    let totalWarnings = 0;

    for (let i = 0; i < pagesToCrawl.length; i += BATCH_SIZE) {
      const batch = pagesToCrawl.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.all(
        batch.map(async (path) => {
          const fullUrl = path.startsWith("http") ? path : `${SITE_URL}${path}`;
          const fetchStart = Date.now();
          const pageResult = await fetchPage(fullUrl);

          if (!pageResult) {
            return {
              audit_run_id: auditRunId,
              page_url: path,
              status_code: 0,
              page_title: "",
              overall_score: 0,
              critical_issues: ["Page inaccessible — impossible de crawler"],
              checked_at: new Date().toISOString(),
            };
          }

          const { response, body: html } = pageResult;
          const loadTimeMs = Date.now() - fetchStart;
          const pageSizeKb = Math.round(html.length / 1024);

          const hn = extractHn(html);
          const meta = extractMeta(html);
          const images = extractImages(html);
          const links = extractLinks(html, fullUrl);
          const schema = extractSchema(html);
          const wordCount = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(/\s+/).length;
          const aeo = analyzeAEO(html, meta.title);

          const { hnScore, contentScore, seoScore } = computeScores(hn, meta, images, schema, wordCount);

          // Broken links check
          const brokenLinksList: string[] = [];
          if (links.brokenHint.length > 0) {
            brokenLinksList.push(...links.brokenHint.map((l) => `Format URL invalide: ${l}`));
          }

          // AEO Score
          const aeoScore = Math.round(((aeo.featuredSnippetScore + (schema.hasFaq ? 3 : 0) + (schema.hasHowto ? 2 : 0) + (schema.hasSpeakable ? 1 : 0)) / 16) * 10 * 10) / 10;
          const aeoFinalScore = Math.min(10, aeoScore + (aeo.questionsDetected > 2 ? 1.5 : 0));

          // Overall
          const overallScore = Math.round(((seoScore * 0.35 + hnScore * 0.15 + contentScore * 0.20 + aeoFinalScore * 0.30)) * 10) / 10;

          // Collect issues
          const criticalIssues: string[] = [];
          const warnings: string[] = [];
          const recommendations: string[] = [];

          if (hn.h1.length === 0) criticalIssues.push("H1 manquant — critique pour le SEO");
          if (hn.h1.length > 1) warnings.push(`${hn.h1.length} H1 détectés — un seul recommandé`);
          if (meta.descriptionLength === 0) criticalIssues.push("Meta description absente");
          if (meta.descriptionLength > 0 && meta.descriptionLength < 120) warnings.push(`Meta description trop courte (${meta.descriptionLength} car.) — viser 120-160`);
          if (meta.descriptionLength > 160) warnings.push(`Meta description trop longue (${meta.descriptionLength} car.) — viser 120-160`);
          if (meta.title.length < 30) warnings.push(`Title trop court (${meta.title.length} car.) — viser 30-60`);
          if (meta.title.length > 60) warnings.push(`Title trop long (${meta.title.length} car.) — viser 30-60`);
          if (!meta.hasOg) warnings.push("Open Graph tags incomplets");
          if (!meta.hasTwitter) recommendations.push("Ajouter Twitter Card");
          if (!schema.hasSchema) criticalIssues.push("Aucun Schema.org détecté");
          if (images.withoutAlt > 0) warnings.push(`${images.withoutAlt}/${images.total} images sans attribut alt`);
          if (images.total === 0 && wordCount > 300) recommendations.push("Aucune image — ajouter au moins 1 image pertinente");
          if (wordCount < 300) warnings.push(`Contenu faible (${wordCount} mots) — viser 800+`);
          if (meta.robotsNoindex) warnings.push("Page marquée noindex");
          if (!schema.hasFaq && wordCount > 500) recommendations.push("Ajouter FAQPage Schema pour l'AEO");
          if (aeo.questionsDetected < 2) recommendations.push("Ajouter des questions en H2/H3 pour les featured snippets");

          recommendations.push(...aeo.recs);

          return {
            audit_run_id: auditRunId,
            page_url: path,
            page_title: meta.title,
            meta_description: meta.description,
            meta_description_length: meta.descriptionLength,
            h1_count: hn.h1.length,
            h1_texts: hn.h1,
            h2_count: hn.h2.length,
            h2_texts: hn.h2,
            h3_count: hn.h3.length,
            hn_structure_score: hnScore,
            word_count: wordCount,
            content_quality_score: contentScore,
            images_count: images.total,
            images_without_alt: images.withoutAlt,
            images_broken: images.brokenUrls.length,
            broken_links_count: brokenLinksList.length,
            broken_links: brokenLinksList,
            internal_links_count: links.internal,
            external_links_count: links.external,
            canonical_url: meta.canonical,
            canonical_valid: !!meta.canonical,
            has_og_tags: meta.hasOg,
            has_twitter_card: meta.hasTwitter,
            has_schema_org: schema.hasSchema,
            schema_types: schema.types,
            load_time_ms: loadTimeMs,
            page_size_kb: pageSizeKb,
            status_code: response.status,
            is_indexable: !meta.robotsNoindex,
            has_robots_noindex: meta.robotsNoindex,
            has_faq_schema: schema.hasFaq,
            has_howto_schema: schema.hasHowto,
            has_speakable_schema: schema.hasSpeakable,
            aeo_featured_snippet_score: aeo.featuredSnippetScore,
            aeo_questions_detected: aeo.questionsDetected,
            aeo_answers_detected: aeo.answersDetected,
            seo_score: seoScore,
            aeo_score: aeoFinalScore,
            overall_score: overallScore,
            recommendations: recommendations,
            critical_issues: criticalIssues,
            warnings: warnings,
            checked_at: new Date().toISOString(),
          };
        })
      );

      for (const r of batchResults) {
        if (r.critical_issues && Array.isArray(r.critical_issues)) {
          totalCritical += (r.critical_issues as string[]).length;
        }
        if (r.warnings && Array.isArray(r.warnings)) {
          totalWarnings += (r.warnings as string[]).length;
        }
      }
      results.push(...batchResults);
    }

    // Store in Supabase
    for (const row of results) {
      try {
        await supabase.from("seo_audit_results").insert(row);
      } catch (e) {
        console.error("Insert error:", e);
      }
    }

    // Cleanup: keep max 5 runs
    const { data: allRuns } = await supabase
      .from("seo_audit_results")
      .select("audit_run_id")
      .order("checked_at", { ascending: false })
      .limit(5000);

    if (allRuns) {
      const runIds = [...new Set(allRuns.map((r: { audit_run_id: string }) => r.audit_run_id))];
      if (runIds.length > 5) {
        const idsToDelete = runIds.slice(5);
        for (const rid of idsToDelete) {
          await supabase.from("seo_audit_results").delete().eq("audit_run_id", rid);
        }
      }
    }

    const avgOverall = results.length > 0
      ? Math.round((results.reduce((s, r) => s + (Number(r.overall_score) || 0), 0) / results.length) * 10) / 10
      : 0;

    return new Response(
      JSON.stringify({
        success: true,
        audit_run_id: auditRunId,
        pages_crawled: results.length,
        average_seo_score: Math.round((results.reduce((s, r) => s + (Number(r.seo_score) || 0), 0) / (results.length || 1)) * 10) / 10,
        average_aeo_score: Math.round((results.reduce((s, r) => s + (Number(r.aeo_score) || 0), 0) / (results.length || 1)) * 10) / 10,
        average_overall_score: avgOverall,
        critical_issues: totalCritical,
        warnings: totalWarnings,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("SEO Audit error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
