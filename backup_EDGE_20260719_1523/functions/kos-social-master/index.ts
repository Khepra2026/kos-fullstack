import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "GET, POST, OPTIONS" }
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY")
const META_WEBHOOK_VERIFY_TOKEN = Deno.env.get("META_WEBHOOK_VERIFY_TOKEN") || "khepra_bigfour_2026"
const KHEPRA_EXPERTS_HANDLE = "KhepraExperts"
const LINKEDIN_COMPANY = "khepra-experts"

function getMockMetrics() {
  return {
    twitter: { followers: 847, following: 312, tweets: 526, engagement_rate: 3.8, impressions_30d: 42000, likes_30d: 890, retweets_30d: 245, top_tweet: { text: "La BCEAO renforce le dispositif prudentiel 2026 — notre analyse complète.", likes: 47, retweets: 18, date: "2026-06-10T08:30:00Z" } },
    linkedin_company: { followers: 2840, employee_count: 25, description: "Cabinet de conseil de référence en Afrique francophone.", industry: "Business Consulting and Services" },
    linkedin_founder: { connections: 15000, followers: 4200, headline: "Managing Partner @ KHEPRA EXPERTS | 22+ ans d'expertise" },
    meta: { source: "mock", twitter_available: false, linkedin_company_available: false, linkedin_founder_available: false, bridge_used: false, last_updated: new Date().toISOString() }
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  try {
    const url = new URL(req.url)
    const action = url.searchParams.get("action") || "metrics"
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })

    if (action === "health") return new Response(JSON.stringify({ status: "ok", engine: "kos-social-master-v1", actions: ["health","metrics","generate_copy","webhook","meta_verify"] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

    // ─── META WEBHOOK ───
    if (action === "webhook" || action === "meta_verify") {
      if (req.method === "GET") {
        const mode = url.searchParams.get("hub.mode"); const token = url.searchParams.get("hub.verify_token"); const challenge = url.searchParams.get("hub.challenge")
        if (mode === "subscribe" && token === META_WEBHOOK_VERIFY_TOKEN && challenge) return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } })
        return new Response("Verification failed", { status: 403 })
      }
      if (req.method === "POST") {
        try {
          const body = await req.json()
          const entries = body?.entry || []
          for (const entry of entries) {
            for (const change of (entry?.changes || [])) {
              const value = change?.value || {}
              const postId = value?.post_id || value?.id
              if (!postId) continue
              const metrics: Record<string,number> = {}
              if (typeof value.likes === "number") metrics.likes = value.likes
              if (typeof value.shares === "number") metrics.shares = value.shares
              if (typeof value.comments === "number") metrics.comments = value.comments
              if (typeof value.impressions === "number") metrics.impressions = value.impressions
              if (Object.keys(metrics).length > 0) {
                try { await supabase.from("kos_publications").update({ metrics }).eq("external_id", postId) } catch {}
              }
            }
          }
          return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
        } catch (e) { return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }) }
      }
    }

    // ─── METRICS ───
    if (action === "metrics") {
      const mock = getMockMetrics()
      // Try LinkedIn bridge
      try {
        const bridgeRes = await fetch(`${supabaseUrl}/functions/v1/kos-linkedin-master?action=fetch`, { headers: { "Authorization": `Bearer ${serviceRoleKey}` } })
        if (bridgeRes.ok) {
          const bridgeData = await bridgeRes.json()
          if (bridgeData.followers) mock.linkedin_company.followers = bridgeData.followers
          if (bridgeData.description) mock.linkedin_company.description = bridgeData.description
          mock.meta.linkedin_company_available = true; mock.meta.bridge_used = true
        }
      } catch {}
      mock.meta.source = mock.meta.bridge_used ? "bridge" : "mock"
      mock.meta.last_updated = new Date().toISOString()
      return new Response(JSON.stringify(mock), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // ─── GENERATE_COPY ───
    if (action === "generate_copy" && req.method === "POST") {
      const body = await req.json(); const slug = body?.slug
      if (!slug) return new Response(JSON.stringify({ error: "slug required", hook: "", body: "", hashtags: ["BCEAO","OHADA","Gouvernance","KOSAI"] }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

      try {
        const { data: page } = await supabase.from("kb_pages").select("title, content_html, h1, meta_desc").eq("slug", slug).single()
        if (!page) return new Response(JSON.stringify({ error: "Page not found", hook: page?.meta_desc?.slice(0,100) || "Analyse experte KHEPRA", body: page?.title || "", hashtags: ["BCEAO","OHADA","Gouvernance","KOSAI"] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

        if (!OPENAI_API_KEY) {
          const firstLine = (page.content_html || "").replace(/<[^>]*>/g,"").split(".").slice(0,2).join(". ")
          return new Response(JSON.stringify({ hook: page.meta_desc?.slice(0,100) || page.title?.slice(0,100) || "", body: firstLine.slice(0,500) || page.title || "", hashtags: ["BCEAO","OHADA","Gouvernance","KOSAI"], source: "fallback" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
        }

        const contentSnippet = (page.content_html||"").replace(/<[^>]*>/g,"").slice(0,2000)
        const completion = await fetch("https://api.openai.com/v1/chat/completions", { method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${OPENAI_API_KEY}`}, body: JSON.stringify({ model:"gpt-4o", messages:[{role:"user",content:`Tu es CM Big Four Khepra Experts. Genere 1 post social pour: Titre: ${page.title} Contenu: ${contentSnippet}. Format JSON: {"hook":"max 100 car, chiffre choc","body":"200-500 car, ton expert","hashtags":["BCEAO","OHADA","Gouvernance","KOSAI"]}`}], response_format:{type:"json_object"}, temperature:0.7, max_tokens:500 }) })
        if (!completion.ok) throw new Error(`OpenAI error: ${completion.status}`)
        const result = await completion.json(); const generated = JSON.parse(result.choices[0].message.content)
        return new Response(JSON.stringify({ hook: generated.hook||"", body: generated.body||"", hashtags: generated.hashtags||["BCEAO","OHADA","Gouvernance","KOSAI"], source: "gpt-4o" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
      } catch (e) { return new Response(JSON.stringify({ error: String(e), hook: "", body: "", hashtags: ["BCEAO","OHADA","Gouvernance","KOSAI"] }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }) }
    }

    return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  } catch (err) { return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }) }
})