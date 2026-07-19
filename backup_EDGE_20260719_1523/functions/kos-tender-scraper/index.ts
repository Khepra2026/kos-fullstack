import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts";

interface TenderSource {
  id: string;
  name: string;
  region: string;
  url: string;
  rss_url: string | null;
  source_type: string;
  keywords: string[];
}

const KHEPRA_KEYWORDS = [
  "audit", "conseil", "gouvernance", "conformite", "fiscal", "risque", "financier",
  "microfinance", "banque", "fintech", "prix de transfert", "BEPS", "BCEAO", "COBAC",
  "BEAC", "LBC/FT", "ESG", "COSO", "ERM", "due diligence", "levee de fonds",
  "inspection", "controle interne", "fiscalite internationale",
  "reglementaire", "regulation", "bancaire", "agrement", "SFD", "EMF",
  "consultant", "expert", "advisory", "formation", "capacity building",
  "assistance technique", "evaluation", "strategie", "transformation",
  "inclusion financiere", "digital", "IFRS", "provisionnement", "solvabilite",
  "reporting", "dispositif prudentiel", "gestion des risques", "compliance",
  "blanchiment", "KYC", "LAB/FT", "protection donnees", "cybersecurite",
  "resilience", "continuite", "PCA", "PRA", "plan strategique", "business plan",
  "etude de faisabilite", "etude dimpact", "due diligence", "data"
];

function scoreRelevance(title: string, description: string, sourceKeywords: string[]): number {
  const text = `${title} ${description}`.toLowerCase();
  let score = 0;
  const allKeywords = [...new Set([...sourceKeywords, ...KHEPRA_KEYWORDS])];
  for (const kw of allKeywords) {
    if (text.includes(kw.toLowerCase())) score += 1;
  }
  return score;
}

function classifyTender(score: number): "high" | "medium" | "low" {
  if (score >= 4) return "high";
  if (score >= 2) return "medium";
  return "low";
}

function extractDeadline(text: string): string | null {
  const patterns = [
    /(?:date limite|deadline|cloture|limite|echeance|date de remise)[:\s]+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i,
    /(?:date limite|deadline|cloture|limite|echeance|date de remise)[:\s]+(\d{1,2}\s+(?:janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s+\d{4})/i,
    /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\s*(?:à|at|avant|before)/i,
    /(\d{1,2}\s+(?:janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre)\s+\d{4})/i,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) return m[1].trim();
  }
  return null;
}

function extractBudget(text: string): number | null {
  const patterns = [
    /(?:budget|montant|enveloppe|cout estime)[:\s]+(\d[\d\s]*)\s*(?:FCFA|F CFA|XOF|francs|€|EUR|USD|\$)/i,
    /(\d[\d\s]*)\s*(?:FCFA|F CFA|XOF)/i,
  ];
  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      const num = parseInt(m[1].replace(/\s/g, ""), 10);
      if (num > 100000) return num;
    }
  }
  return null;
}

function detectCountry(text: string, region: string): string | null {
  const countries = [
    "Benin", "Burkina Faso", "Cameroun", "Cote d'Ivoire", "Côte d'Ivoire",
    "Gabon", "Guinee", "Guinée", "Mali", "Niger", "Senegal", "Sénégal",
    "Togo", "RDC", "Congo", "Tchad", "Centrafrique", "Guinee Bissau",
    "Guinée Bissau", "Mauritanie", "Ghana", "Nigeria", "Liberia",
    "Sierra Leone", "Gambie", "Cap Vert", "Guinee Equatoriale",
    "Sao Tome", "Burundi", "Rwanda", "Kenya", "Tanzanie", "Ouganda",
    "Madagascar", "Maurice", "Comores", "Seychelles", "Djibouti",
    "Ethiopie", "Soudan", "Soudan du Sud", "Maroc", "Algerie", "Tunisie",
    "Libye", "Egypte", "Afrique du Sud", "Angola", "Mozambique",
    "Namibie", "Botswana", "Zambie", "Zimbabwe", "Malawi"
  ];
  const t = text.toLowerCase();
  for (const c of countries) {
    if (t.includes(c.toLowerCase()) || t.includes(c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())) return c;
  }
  return region || null;
}

function resolveUrl(raw: string, base: string): string {
  if (!raw) return base;
  const r = raw.trim();
  if (r.startsWith("http")) return r;
  if (r.startsWith("#") || r.startsWith("javascript") || r.startsWith("mailto")) return base;
  try { return new URL(r, base).href; } catch { return base; }
}

interface ScrapedTender {
  title: string; description: string; source: string; region: string; url: string;
  published_at: string | null; deadline: string | null; relevance_score: number;
  relevance_class: "high" | "medium" | "low"; expertise_tags: string[];
  country: string | null; estimated_budget_fcfa: number | null; tender_type: string;
}

async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; KOS-TenderBot/5.0; +https://khepraexperts.com)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      },
    });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

function determineTenderType(sourceName: string, title: string, desc: string): string {
  const t = `${title} ${desc}`.toLowerCase();
  if (t.includes("consultant individuel") || t.includes("individual consultant") || t.includes("ic ")) return "Consultant Individuel";
  if (t.includes("manifestation d'interet") || t.includes("manifestation d'intérêt") || t.includes("ami") || t.includes("eoi")) return "AMI";
  if (t.includes("appel d'offres") || t.includes("ao ") || t.includes("tender") || t.includes("rfp")) return "AO";
  if (t.includes("recrutement") || t.includes("recruitment")) return "Recrutement";
  if (sourceName.toLowerCase().includes("consultant") || sourceName.toLowerCase().includes("econsultant")) return "Consultant Individuel";
  return "AO/AMI";
}

async function scrapeHtmlSource(source: TenderSource): Promise<ScrapedTender[]> {
  try {
    if (!source.url) return [];
    const res = await fetchWithTimeout(source.url, 5000);
    if (!res.ok) return [];
    const html = await res.text();
    if (!html || html.length < 200) return [];

    const doc = new DOMParser().parseFromString(html, "text/html");
    if (!doc) return [];

    const candidates: { title: string; url: string; context: string }[] = [];
    const seenUrls = new Set<string>();
    const seenTitles = new Set<string>();

    const allLinks = doc.querySelectorAll("a[href]");
    for (const link of allLinks) {
      const href = link.getAttribute("href") || "";
      const text = (link.textContent || "").trim().replace(/\s+/g, " ");
      if (!text || text.length < 15 || text.length > 300) continue;
      const fullUrl = resolveUrl(href, source.url);
      if (seenUrls.has(fullUrl)) continue;
      const lowText = text.toLowerCase();
      if (lowText.includes("accueil") || lowText.includes("home") || lowText.includes("login") ||
          lowText.includes("contact") || lowText.includes("facebook") || lowText.includes("twitter") ||
          lowText.includes("linkedin") || lowText.includes("menu") || lowText.includes("fermer") ||
          lowText.includes("close") || lowText.includes("copyright") || lowText.includes("politique") ||
          lowText.includes("cookies") || lowText.includes("mentions") || lowText.includes("rgpd")) continue;
      const parent = link.parentElement;
      const context = parent ? (parent.textContent || "").trim().replace(/\s+/g, " ").slice(0, 500) : text;
      seenUrls.add(fullUrl);
      candidates.push({ title: text, url: fullUrl, context });
    }

    const containers = doc.querySelectorAll("article, .article, .post, .tender, .ao-item, .listing-item, .views-row, .card, .item, [class*='tender'], [class*='appel'], [class*='offer'], [class*='procurement'], li");
    for (const container of containers) {
      const containerText = (container.textContent || "").trim().replace(/\s+/g, " ");
      if (!containerText || containerText.length < 30) continue;
      const links = container.querySelectorAll("a[href]");
      for (const link of links) {
        const href = link.getAttribute("href") || "";
        const linkText = (link.textContent || "").trim().replace(/\s+/g, " ");
        if (!linkText || linkText.length < 10) continue;
        const fullUrl = resolveUrl(href, source.url);
        if (seenUrls.has(fullUrl)) continue;
        seenUrls.add(fullUrl);
        candidates.push({ title: linkText, url: fullUrl, context: containerText });
      }
    }

    const tenders: ScrapedTender[] = [];
    for (const c of candidates) {
      const relevance = scoreRelevance(c.title, c.context, source.keywords);
      if (relevance < 1) continue;
      const combinedText = `${c.title} ${c.context}`;
      const allKws = [...new Set([...source.keywords, ...KHEPRA_KEYWORDS])];
      const expertiseTags = [...new Set(allKws.filter(kw => combinedText.toLowerCase().includes(kw.toLowerCase())))];
      const titleKey = c.title.slice(0, 60).toLowerCase();
      if (seenTitles.has(titleKey)) continue;
      seenTitles.add(titleKey);
      tenders.push({
        title: c.title.slice(0, 250), description: c.context.slice(0, 1000),
        source: source.name, region: source.region, url: c.url,
        published_at: null, deadline: extractDeadline(combinedText),
        relevance_score: relevance, relevance_class: classifyTender(relevance),
        expertise_tags: expertiseTags.slice(0, 8),
        country: detectCountry(combinedText, source.region),
        estimated_budget_fcfa: extractBudget(combinedText),
        tender_type: determineTenderType(source.name, c.title, c.context),
      });
    }
    return tenders.slice(0, 8);
  } catch (e: any) {
    console.log(`[Scraper] HTML ${source.name}: ${e.message}`);
    return [];
  }
}

async function scrapeRssSource(rssUrl: string, source: TenderSource): Promise<ScrapedTender[]> {
  try {
    const res = await fetchWithTimeout(rssUrl, 8000);
    if (!res.ok) return [];
    const xml = await res.text();
    if (!xml || xml.length < 100) return [];

    const doc = new DOMParser().parseFromString(xml, "text/xml");
    if (!doc) return [];

    const items = doc.querySelectorAll("item, entry");
    const tenders: ScrapedTender[] = [];
    const seenTitles = new Set<string>();

    for (const item of items) {
      const titleEl = item.querySelector("title");
      const descEl = item.querySelector("description, summary, content");
      const linkEl = item.querySelector("link");
      const pubDateEl = item.querySelector("pubDate, published, updated");

      const title = (titleEl?.textContent || "").trim();
      if (!title || title.length < 15) continue;
      const description = (descEl?.textContent || "").trim().replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
      const linkHref = linkEl?.getAttribute("href") || linkEl?.textContent?.trim() || source.url;
      const pubDate = pubDateEl?.textContent?.trim() || null;

      const relevance = scoreRelevance(title, description, source.keywords);
      if (relevance < 1) continue;

      const combinedText = `${title} ${description}`;
      const allKws = [...new Set([...source.keywords, ...KHEPRA_KEYWORDS])];
      const expertiseTags = [...new Set(allKws.filter(kw => combinedText.toLowerCase().includes(kw.toLowerCase())))];
      const titleKey = title.slice(0, 60).toLowerCase();
      if (seenTitles.has(titleKey)) continue;
      seenTitles.add(titleKey);

      tenders.push({
        title: title.slice(0, 250), description: description.slice(0, 1000),
        source: source.name, region: source.region, url: resolveUrl(linkHref, source.url),
        published_at: pubDate, deadline: extractDeadline(combinedText),
        relevance_score: relevance, relevance_class: classifyTender(relevance),
        expertise_tags: expertiseTags.slice(0, 8),
        country: detectCountry(combinedText, source.region),
        estimated_budget_fcfa: extractBudget(combinedText),
        tender_type: determineTenderType(source.name, title, description),
      });
    }
    return tenders.slice(0, 10);
  } catch (e: any) {
    console.log(`[Scraper] RSS ${source.name}: ${e.message}`);
    return [];
  }
}

async function scrapeOneSource(source: TenderSource): Promise<{ source: string; tenders: ScrapedTender[]; status: string; method: string }> {
  let tenders: ScrapedTender[] = [];
  let method = "html";
  let status = "ok";

  try {
    if (source.rss_url) {
      method = "rss";
      tenders = await scrapeRssSource(source.rss_url, source);
      if (tenders.length < 2) {
        const htmlResults = await scrapeHtmlSource(source);
        const existingTitles = new Set(tenders.map(t => t.title.slice(0, 60).toLowerCase()));
        for (const t of htmlResults) {
          if (!existingTitles.has(t.title.slice(0, 60).toLowerCase())) {
            tenders.push(t);
            existingTitles.add(t.title.slice(0, 60).toLowerCase());
          }
        }
        method = "rss+html";
      }
    } else {
      method = "html";
      tenders = await scrapeHtmlSource(source);
    }
    return { source: source.name, tenders, status, method };
  } catch (e: any) {
    return { source: source.name, tenders: [], status: `error: ${e.message || "unknown"}`, method };
  }
}

async function processBatch(sources: TenderSource[], batchSize = 10): Promise<{ source: string; tenders: ScrapedTender[]; status: string; method: string }[]> {
  const results: { source: string; tenders: ScrapedTender[]; status: string; method: string }[] = [];
  for (let i = 0; i < sources.length; i += batchSize) {
    const batch = sources.slice(i, i + batchSize);
    const batchResults = await Promise.allSettled(batch.map(s => scrapeOneSource(s)));
    for (const r of batchResults) {
      if (r.status === "fulfilled") results.push(r.value);
      else results.push({ source: "unknown", tenders: [], status: `rejected: ${r.reason}`, method: "html" });
    }
  }
  return results;
}

// ─── MAIN ────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const url = new URL(req.url);
  let dryRun = false;
  let autoNotify = true;
  let quickMode = false;
  let sourceIds: string[] = [];

  if (req.method === "POST") {
    try {
      const body = await req.json();
      dryRun = body.dry_run === true;
      autoNotify = body.auto_notify !== false;
      quickMode = body.quick_mode === true;
      sourceIds = body.source_ids || [];
    } catch { /* defaults */ }
  } else {
    dryRun = url.searchParams.get("dry_run") === "true";
    autoNotify = url.searchParams.get("auto_notify") !== "false";
    quickMode = url.searchParams.get("quick_mode") === "true";
  }

  const batchSize = quickMode ? 15 : 10;
  const startTime = Date.now();

  // Fetch sources - RSS first for faster processing
  let sources: TenderSource[] = [];
  if (supabaseUrl && supabaseServiceKey) {
    try {
      let query = supabase.from("tender_sources")
        .select("id, name, region, url, rss_url, source_type, keywords")
        .eq("status", "active");
      if (sourceIds.length > 0) query = query.in("id", sourceIds);
      const { data, error } = await query;
      if (error) {
        console.error("[KOS Scraper v5] DB error:", error.message);
      } else if (data) {
        sources = data.map((s: any) => ({
          id: s.id, name: s.name, region: s.region,
          url: s.url || "", rss_url: s.rss_url || null,
          source_type: s.source_type || "html",
          keywords: Array.isArray(s.keywords) ? s.keywords.filter((k: unknown) => typeof k === "string") : [],
        }));
        sources.sort((a, b) => (b.rss_url ? 1 : 0) - (a.rss_url ? 1 : 0));
        console.log(`[KOS Scraper v5] ${sources.length} sources (${sources.filter(s => s.rss_url).length} RSS, ${sources.filter(s => !s.rss_url).length} HTML)`);
      }
    } catch (e: any) {
      console.error("[KOS Scraper v5] Source load error:", e.message);
    }
  }

  const sourceResults = await processBatch(sources, batchSize);
  const allTenders = sourceResults.flatMap(r => r.tenders);
  allTenders.sort((a, b) => b.relevance_score - a.relevance_score);

  const highRelevance = allTenders.filter(t => t.relevance_class === "high");
  const icTenders = allTenders.filter(t => t.tender_type === "Consultant Individuel");

  let insertedAlerts = 0;
  let insertedAOAMI = 0;

  if (!dryRun && supabaseUrl && supabaseServiceKey) {
    // Update source last_scan
    for (const src of sources) {
      const count = allTenders.filter(t => t.source === src.name).length;
      try {
        await supabase.from("tender_sources").update({ last_scan: new Date().toISOString(), active_tenders: count }).eq("id", src.id);
      } catch { /* non-blocking */ }
    }

    // Insert tender_alerts
    for (const tender of allTenders.slice(0, 60)) {
      try {
        await supabase.from("tender_alerts").upsert({
          title: tender.title.slice(0, 255), description: tender.description.slice(0, 1000),
          source_name: tender.source, region: tender.region, source_url: tender.url,
          published_at: tender.published_at, deadline: tender.deadline,
          relevance_score: tender.relevance_score, relevance_class: tender.relevance_class,
          expertise_tags: tender.expertise_tags, tender_type: tender.tender_type,
          country: tender.country, estimated_budget_fcfa: tender.estimated_budget_fcfa,
          notified: false,
        }, { onConflict: "title,source_name" });
        insertedAlerts++;
      } catch { /* skip duplicates */ }
    }

    // Insert ao_ami for ao-watch CRON
    for (const tender of allTenders.slice(0, 40)) {
      try {
        await supabase.from("ao_ami").upsert({
          source: tender.source, titre: tender.title.slice(0, 255),
          pays: tender.country || tender.region, url: tender.url,
          deadline: tender.deadline ? new Date(tender.deadline).toISOString() : null,
          montant_usd: tender.estimated_budget_fcfa ? Math.round(tender.estimated_budget_fcfa / 600) : null,
          type: tender.tender_type, secteurs: tender.expertise_tags,
          notified: false, crawled_at: new Date().toISOString(),
        }, { onConflict: "titre,source" });
        insertedAOAMI++;
      } catch { /* skip */ }
    }
  }

  // Auto-notify high relevance
  let notifyResult: any = null;
  if (!dryRun && autoNotify && highRelevance.length > 0) {
    try {
      const notifyRes = await fetch(`${supabaseUrl}/functions/v1/kos-tender-email-notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${supabaseServiceKey}` },
        body: JSON.stringify({ min_relevance: "high", limit: 20 }),
      });
      notifyResult = await notifyRes.json();
    } catch (e: any) {
      notifyResult = { sent: false, error: e.message };
    }
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  return new Response(JSON.stringify({
    scanned_at: new Date().toISOString(),
    duration_seconds: parseFloat(duration),
    sources_scanned: sources.length,
    sources_ok: sourceResults.filter(r => r.status === "ok").length,
    sources_error: sourceResults.filter(r => r.status !== "ok").length,
    total_found: allTenders.length,
    high_relevance: highRelevance.length,
    consultant_individuel: icTenders.length,
    inserted_alerts: dryRun ? 0 : insertedAlerts,
    inserted_ao_ami: dryRun ? 0 : insertedAOAMI,
    auto_notify: notifyResult,
    source_breakdown: sourceResults.map(r => ({ source: r.source, count: r.tenders.length, status: r.status, method: r.method })),
    top_tenders: allTenders.slice(0, 10).map(t => ({
      title: t.title.slice(0, 120), source: t.source, type: t.tender_type,
      relevance: t.relevance_class, score: t.relevance_score, deadline: t.deadline,
    })),
  }, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    },
  });
});
