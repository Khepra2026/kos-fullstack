
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS TREND ENGINE™ — Pipeline Étape 1
// 1. Google Trends API (optionnel si clé configurée)
// 2. RSS BCEAO/COBAC
// 3. LLM Scorer (template KOS ou OpenAI si configuré)
// 4. Filter >80 → Insert khepra_topics
// ============================================================

const BCEAO_RSS = "https://www.bceao.int/fr/rss.xml"
const COBAC_RSS = "https://www.sgcobac.org/fr/rss.xml"
const TRENDS_GEO = "TG,SN,CI,CM"

const HIGH_VALUE_KEYWORDS = [
  "conformité", "agrément", "BCEAO", "COBAC", "LBC/FT", "gouvernance",
  "solvabilité", "ratio prudentiel", "IFRS", "SFD", "microfinance",
  "directive", "instruction", "circulaire", "ESG", "audit", "inspection",
  "reporting", "fond propre", "provision", "risque", "contrôle interne",
  "résilience opérationnelle", "protection données", "lanceur alerte",
  "finance islamique", "digitalisation", "fintech", "inclusion financière",
]

function scoreTopic(title: string, description: string): { score: number; angle: string; keywords: string[] } {
  const text = `${title} ${description}`.toLowerCase()
  let score = 30 // base

  // Keyword matching
  const matchedKeywords: string[] = []
  for (const kw of HIGH_VALUE_KEYWORDS) {
    if (text.includes(kw.toLowerCase())) {
      score += 8
      matchedKeywords.push(kw)
      if (kw.length > 8) score += 3 // bonus long-tail
    }
  }

  // Title quality signals
  if (title.length > 20 && title.length < 120) score += 5
  if (/[0-9]{4}/.test(title)) score += 4 // has year reference
  if (/obligatoire|obligation|exigence|nouveau|révision|modification|alerte/i.test(title)) score += 7
  if (/article|instruction n°|circulaire n°|décision n°/i.test(title)) score += 6
  if (/PME|banque|SFD|EMF|microfinance|établissement/i.test(text)) score += 5

  // Cap at 100
  score = Math.min(score, 100)

  // Generate angle
  let angle = title
  if (matchedKeywords.length > 0) {
    angle = `${title} — Impact ${matchedKeywords.slice(0, 2).join(" & ")} pour dirigeants PME Afrique`
  }
  if (angle.length > 200) angle = angle.substring(0, 197) + "..."

  return { score, angle, keywords: matchedKeywords.slice(0, 6) }
}

async function fetchRSS(url: string, source: string): Promise<Array<{ title: string; description: string; link: string }>> {
  try {
    const resp = await fetch(url, { headers: { "User-Agent": "KOS-Trend-Engine/1.0" } })
    if (!resp.ok) {
      console.log(`[TREND] RSS ${source}: HTTP ${resp.status}`)
      return []
    }
    const xml = await resp.text()

    // Simple XML parsing for RSS
    const items: Array<{ title: string; description: string; link: string }> = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi
    let match
    while ((match = itemRegex.exec(xml)) !== null) {
      const content = match[1]
      const titleMatch = content.match(/<title>(?:<!\[CDATA\[)?([^<\]\[]*)/)
      const descMatch = content.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:]]>)?<\/description>/)
      const linkMatch = content.match(/<link>(.*?)<\/link>/)

      if (titleMatch) {
        items.push({
          title: titleMatch[1].trim(),
          description: descMatch ? descMatch[1].replace(/<[^>]+>/g, "").trim().substring(0, 500) : "",
          link: linkMatch ? linkMatch[1].trim() : "",
        })
      }
    }

    console.log(`[TREND] RSS ${source}: parsed ${items.length} items`)
    return items.slice(0, 20)
  } catch (e) {
    console.error(`[TREND] RSS ${source} error:`, e)
    return []
  }
}

async function fetchGoogleTrends(): Promise<Array<{ title: string; description: string; link: string }>> {
  // Google Trends unofficial API requires no auth for daily trends
  try {
    const resp = await fetch(
      `https://trends.google.com/trends/api/dailytrends?hl=fr&geo=${TRENDS_GEO}&tz=-60`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    )
    if (!resp.ok) return []

    const text = await resp.text()
    // Response starts with ")]}'," so strip that
    const jsonStr = text.replace(/^\)\]\}\'\,/, "")
    const data = JSON.parse(jsonStr)

    const items: Array<{ title: string; description: string; link: string }> = []
    const stories = data?.default?.trendingSearchesDays?.[0]?.trendingSearches || []
    for (const story of stories.slice(0, 15)) {
      const title = story?.title?.query || ""
      const desc = (story?.articles || [])[0]?.title || ""
      const link = (story?.articles || [])[0]?.url || ""
      if (title) {
        // Only keep finance/business relevant trends
        const isRelevant = HIGH_VALUE_KEYWORDS.some(kw =>
          title.toLowerCase().includes(kw.toLowerCase()) ||
          desc.toLowerCase().includes(kw.toLowerCase())
        )
        if (isRelevant) {
          items.push({ title: `${title} — Tendance Google Afrique`, description: desc, link })
        }
      }
    }
    return items
  } catch (e) {
    console.error("[TREND] Google Trends error:", e)
    return []
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false }
    })

    const url = new URL(req.url)
    const action = url.searchParams.get("action") || "run"

    if (action === "health") {
      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-trend-engine-v1",
        sources: ["google_trends", "rss_bceao", "rss_cobac"],
        keywords: HIGH_VALUE_KEYWORDS.length,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "run" || action === "scan") {
      console.log("[TREND] Starting full trend scan...")

      // Step 1: Fetch from all sources
      const [trendsItems, bceaoItems, cobacItems] = await Promise.all([
        fetchGoogleTrends(),
        fetchRSS(BCEAO_RSS, "bceao"),
        fetchRSS(COBAC_RSS, "cobac"),
      ])

      // Tag sources
      const trendFeed: Array<{ title: string; description: string; link: string; source: string }> = [
        ...trendsItems.map(i => ({ ...i, source: "google_trends" })),
        ...bceaoItems.map(i => ({ ...i, source: "rss_bceao" })),
        ...cobacItems.map(i => ({ ...i, source: "rss_cobac" })),
      ]

      console.log(`[TREND] Total feed: ${trendFeed.length} items (${trendsItems.length} trends + ${bceaoItems.length} BCEAO + ${cobacItems.length} COBAC)`)

      // Step 2: Score all items
      const scored = trendFeed.map(item => {
        const { score, angle, keywords } = scoreTopic(item.title, item.description)
        return { ...item, score, angle, keywords }
      })

      // Step 3: Filter >80
      const highValue = scored.filter(i => i.score >= 80)
      console.log(`[TREND] Scored: ${scored.length} total, ${highValue.length} high-value (>80)`)

      // Step 4: Insert into khepra_topics
      let inserted = 0
      for (const item of highValue) {
        // Check for duplicates
        const { data: existing } = await supabase
          .from("khepra_topics")
          .select("id")
          .eq("title", item.title)
          .limit(1)

        if (existing && existing.length > 0) continue

        const { error } = await supabase.from("khepra_topics").insert({
          title: item.title,
          angle: item.angle,
          keywords: item.keywords,
          score: item.score,
          source: item.source,
          source_url: item.link,
          languages: ["fr", "wo", "ee", "ln", "ha"],
          status: "scored",
        })

        if (!error) inserted++
      }

      // Also log all scored items (even <80) for analytics
      const scoredSummary = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 50)
        .map(i => ({ title: i.title, score: i.score, source: i.source }))

      return new Response(JSON.stringify({
        status: "ok",
        total_fetched: trendFeed.length,
        total_scored: scored.length,
        high_value_count: highValue.length,
        inserted,
        top_10: scoredSummary.slice(0, 10),
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // List stored topics
    if (action === "list") {
      const limit = parseInt(url.searchParams.get("limit") || "20")
      const status = url.searchParams.get("status")

      let query = supabase.from("khepra_topics").select("*").order("score", { ascending: false }).limit(limit)
      if (status) query = query.eq("status", status)

      const { data, error } = await query
      if (error) throw new Error(error.message)

      return new Response(JSON.stringify({
        status: "ok",
        count: data?.length || 0,
        topics: data || [],
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({ error: "Invalid action", available: ["health", "run", "scan", "list"] }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })

  } catch (err) {
    console.error("[TREND] Error:", err)
    return new Response(JSON.stringify({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
