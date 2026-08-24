import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || ""
const corsHeaders = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, GET, OPTIONS" }

const KHEPRA_KEYWORDS = ["audit","conseil","gouvernance","conformite","fiscal","risque","financier","microfinance","banque","fintech","BCEAO","COBAC","BEAC","LBC/FT","ESG","due diligence","inspection","controle interne","reglementaire","regulation","agrement","SFD","EMF","consultant","expert","advisory","formation","assistance technique","evaluation","strategie","IFRS","provisionnement","solvabilite","reporting","KYC","LAB/FT","cybersecurite","resilience","PCA","PRA","business plan"]

function scoreRelevance(title: string, description: string): number {
  const text = `${title} ${description}`.toLowerCase(); let score = 0
  for (const kw of KHEPRA_KEYWORDS) { if (text.includes(kw.toLowerCase())) score++ }
  return score
}

function classifyTender(score: number): "high" | "medium" | "low" {
  if (score >= 4) return "high"; if (score >= 2) return "medium"; return "low"
}

function extractDeadline(text: string): string | null {
  const m = text.match(/(?:date limite|deadline|cloture|limite)[:\s]+(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i) || text.match(/(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/i)
  return m ? m[1].trim() : null
}

function extractBudget(text: string): number | null {
  const m = text.match(/(\d[\d\s]*)\s*(?:FCFA|F CFA|XOF)/i)
  if (m) { const num = parseInt(m[1].replace(/\s/g,""),10); if (num > 100000) return num }
  return null
}

function formatFCFA(val: number): string {
  if (!val) return "—"; if (val >= 1_000_000_000) return `${(val/1_000_000_000).toFixed(1)} Md`; if (val >= 1_000_000) return `${(val/1_000_000).toFixed(0)} M`; return val.toLocaleString("fr-FR")
}

function escapeHtml(s: string): string { return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;") }

function buildEmailHtml(tenders: any[], countByClass: Record<string,number>, totalBudget: number): string {
  const now = new Date(); const dateStr = now.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})
  const cards = tenders.map(t => {
    const deadline = t.deadline ? new Date(t.deadline).toLocaleDateString("fr-FR",{day:"numeric",month:"short"}) : "N/A"
    const relevanceColor = t.relevance_class === "high" ? "#dc2626" : t.relevance_class === "medium" ? "#d97706" : "#6b7280"
    const tags = (t.expertise_tags||[]).slice(0,5).map((tag: string) => `<span style="display:inline-block;padding:3px 8px;border-radius:4px;font-size:10px;background:#f3f2ef;color:#4a4a4a;margin:2px 3px 2px 0">${escapeHtml(tag)}</span>`).join(" ")
    return `<div style="border:1px solid #e5e3df;border-left:4px solid ${relevanceColor};border-radius:8px;padding:16px 18px;margin-bottom:14px;background:#fff">
<div style="font-size:14px;font-weight:700;margin-bottom:6px">${escapeHtml(t.title||"Sans titre")}</div>
<div style="font-size:11px;color:#6b6b6b;margin-bottom:8px"><strong style="color:${relevanceColor}">Score ${t.relevance_score||0}/10</strong> · ${escapeHtml(t.source_name||"—")} · ${escapeHtml(t.country||t.region||"—")}${t.tender_type?" · "+escapeHtml(t.tender_type):""}</div>
${t.description?`<div style="font-size:12px;color:#4a4a4a;margin-bottom:8px">${escapeHtml((t.description||"").slice(0,260))}…</div>`:""}
<div style="margin-bottom:8px">${tags}</div>
<table style="width:100%;font-size:11px;color:#6b6b6b"><tr><td><strong>Budget:</strong> ${formatFCFA(t.estimated_budget_fcfa||0)} FCFA</td><td style="text-align:right"><strong style="color:#dc2626">Deadline:</strong> ${deadline}</td></tr></table>
</div>`
  }).join("")
  return `<!DOCTYPE html><html lang="fr"><body style="margin:0;padding:0;background:#faf9f7;font-family:Helvetica,Arial,sans-serif">
<div style="max-width:700px;margin:0 auto;padding:20px">
<div style="background:#faf9f7;border:1px solid #e5e3df;border-radius:8px;overflow:hidden">
<div style="padding:24px 28px;border-bottom:3px solid #c19a6b;text-align:center;background:#1a1a1a">
<div style="font-size:20px;font-weight:800;color:#c19a6b;letter-spacing:2px">KOS TENDER INTELLIGENCE</div>
<div style="font-size:11px;color:#9a9a9a;margin-top:4px">Notification automatique — ${dateStr}</div></div>
<div style="padding:28px"><h2 style="margin:0 0 6px;font-size:18px;color:#1a1a1a">${tenders.length} AO/AMI détecté(s)</h2>
<p style="margin:0 0 20px;font-size:13px;color:#6b6b6b"><strong>${countByClass["high"]||0} haute pertinence</strong> · Budget cumulé: <strong>${formatFCFA(totalBudget)} FCFA</strong></p>
${cards}</div>
<div style="padding:20px 28px;background:#1a1a1a;color:#9a9a9a;text-align:center;font-size:11px">KHEPRA EXPERTS · contact@khepraexperts.com · Dashboard: khepraexperts.com/kos-tender-intelligence</div></div></div></body></html>`
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders })
  const url = new URL(req.url)
  const action = url.searchParams.get("action") || "scrape"

  if (action === "health") return new Response(JSON.stringify({ status: "ok", engine: "kos-tender-master-v1", actions: ["health","scrape","notify","full"] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || ""
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  // ─── SCRAPE ───
  if (action === "scrape" || action === "full") {
    let body: any = {}; try { body = await req.json() } catch {}
    const dryRun = body.dry_run === true || url.searchParams.get("dry_run") === "true"
    const autoNotify = body.auto_notify !== false
    const startTime = Date.now()

    let sources: any[] = []
    try {
      const { data } = await supabase.from("tender_sources").select("id, name, region, url, rss_url, source_type, keywords").eq("status","active")
      sources = (data || []).map((s:any) => ({ ...s, keywords: Array.isArray(s.keywords) ? s.keywords : [] }))
    } catch {}

    const allTenders: any[] = []
    const sourceResults: any[] = []

    for (const src of sources) {
      try {
        const res = await fetch(src.url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; KOS-TenderBot/1.0)", "Accept": "text/html" }, signal: AbortSignal.timeout(8000) })
        if (!res.ok) { sourceResults.push({ source: src.name, count: 0, status: `HTTP ${res.status}` }); continue }
        const html = await res.text()
        const titleRegex = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/gi
        let titleMatch; const seen: Set<string> = new Set()
        while ((titleMatch = titleRegex.exec(html)) !== null) {
          const title = titleMatch[1].replace(/<[^>]*>/g,"").trim()
          if (title.length < 15 || title.length > 250 || seen.has(title.slice(0,60))) continue
          seen.add(title.slice(0,60))
          const relevance = scoreRelevance(title, html.slice(titleMatch.index, titleMatch.index+2000))
          if (relevance < 1) continue
          const combinedText = html.slice(titleMatch.index, titleMatch.index+2000)
          allTenders.push({ title: title.slice(0,250), description: combinedText.slice(0,500).replace(/<[^>]*>/g," ").replace(/\s+/g," "), source: src.name, region: src.region, url: src.url, published_at: null, deadline: extractDeadline(combinedText), relevance_score: relevance, relevance_class: classifyTender(relevance), expertise_tags: KHEPRA_KEYWORDS.filter(kw => combinedText.toLowerCase().includes(kw.toLowerCase())).slice(0,8), country: src.region, estimated_budget_fcfa: extractBudget(combinedText), tender_type: "AO/AMI" })
        }
        sourceResults.push({ source: src.name, count: allTenders.filter(t => t.source === src.name).length, status: "ok" })
      } catch (e: any) { sourceResults.push({ source: src.name, count: 0, status: `error: ${e.message}` }) }
    }

    allTenders.sort((a,b) => b.relevance_score - a.relevance_score)

    let insertedAlerts = 0
    if (!dryRun) {
      for (const t of allTenders.slice(0,60)) {
        try { await supabase.from("tender_alerts").upsert({ title: t.title.slice(0,255), description: t.description.slice(0,1000), source_name: t.source, region: t.region, source_url: t.url, relevance_score: t.relevance_score, relevance_class: t.relevance_class, expertise_tags: t.expertise_tags, tender_type: t.tender_type, country: t.country, estimated_budget_fcfa: t.estimated_budget_fcfa, notified: false }, { onConflict: "title,source_name" }); insertedAlerts++ } catch {}
      }
    }

    const duration = ((Date.now()-startTime)/1000).toFixed(1)
    const result = { scanned_at: new Date().toISOString(), duration_seconds: parseFloat(duration), sources_scanned: sources.length, total_found: allTenders.length, high_relevance: allTenders.filter(t=>t.relevance_class==="high").length, inserted_alerts: dryRun?0:insertedAlerts, source_breakdown: sourceResults, top_tenders: allTenders.slice(0,10).map(t=>({title:t.title.slice(0,120),source:t.source,relevance:t.relevance_class,score:t.relevance_score,deadline:t.deadline})) }

    // Auto-notify
    let notifyResult: any = null
    if (!dryRun && autoNotify && allTenders.filter(t=>t.relevance_class==="high").length > 0) {
      try {
        const notifyRes = await fetch(`${supabaseUrl}/functions/v1/kos-tender-master?action=notify`, { method: "POST", headers: { "Content-Type":"application/json","Authorization":`Bearer ${supabaseServiceKey}` }, body: JSON.stringify({ min_relevance:"high",limit:20 }) })
        notifyResult = await notifyRes.json()
      } catch {}
    }

    return new Response(JSON.stringify({ ...result, auto_notify: notifyResult }, null, 2), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }

  // ─── NOTIFY ───
  if (action === "notify" && req.method === "POST") {
    if (!RESEND_API_KEY) return new Response(JSON.stringify({ sent: false, error: "RESEND_API_KEY not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
    let body: any = {}; try { body = await req.json() } catch {}
    const minRelevance = body.min_relevance || "high"; const limit = body.limit || 20

    let query = supabase.from("tender_alerts").select("*").eq("notified",false).not("title","is",null).order("relevance_score",{ascending:false}).limit(limit)
    if (minRelevance === "high") query = query.eq("relevance_class","high")
    else if (minRelevance === "medium") query = query.in("relevance_class",["high","medium"])

    const { data: tenders } = await query
    const tenderList = tenders || []
    if (tenderList.length === 0) return new Response(JSON.stringify({ sent: false, message: "Aucune nouvelle alerte", count: 0 }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

    const countByClass: Record<string,number> = {}; let totalBudget = 0
    for (const t of tenderList) { countByClass[t.relevance_class] = (countByClass[t.relevance_class]||0)+1; totalBudget += t.estimated_budget_fcfa||0 }

    const htmlBody = buildEmailHtml(tenderList, countByClass, totalBudget)
    const dateLabel = new Date().toLocaleDateString("fr-FR",{day:"numeric",month:"long"})
    const subject = `KOS Tender Intelligence — ${tenderList.length} AO/AMI (${countByClass["high"]||0} haute pertinence) — ${dateLabel}`

    let emailSent = false
    try {
      const resendRes = await fetch("https://api.resend.com/emails", { method:"POST", headers:{"Content-Type":"application/json","Authorization":`Bearer ${RESEND_API_KEY}`}, body: JSON.stringify({ from: "KOS Tender <notifications@khepraexperts.com>", to:["contact@khepraexperts.com"], subject, html: htmlBody }) })
      emailSent = resendRes.ok
    } catch {}

    if (emailSent) {
      const notifiedIds = tenderList.map((t:any) => t.id)
      try { await supabase.from("tender_alerts").update({ notified: true, notified_at: new Date().toISOString() }).in("id",notifiedIds) } catch {}
    }

    return new Response(JSON.stringify({ sent: emailSent, count: tenderList.length, high_count: countByClass["high"]||0, total_budget_fcfa: totalBudget, preview_titles: tenderList.slice(0,5).map((t:any)=>({title:(t.title||"").slice(0,100),relevance:t.relevance_score,source:t.source_name})) }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }

  return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
})