import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS SOCIAL DAILY GENERATION — CRON JOB
// Planning multilingue 11 → 25 Juillet 2026
// 20 langues × 1-2 posts/jour
// Appelé par pg_cron chaque jour à 06:00 UTC
// ============================================================

const LANGUAGE_QUEUE: Record<string, { name: string; country: string; region: string; topic: string }> = {
  wo:  { name: "Wolof", country: "Sénégal", region: "Afrique de l'Ouest", topic: "BCEAO — Toftali ak yoonu nguur" },
  sw:  { name: "Swahili", country: "Tanzanie/Kenya", region: "Afrique de l'Est", topic: "BCEAO/COBAC — Uzingatiaji wa kanuni" },
  ha:  { name: "Haoussa", country: "Nigeria/Niger", region: "Afrique de l'Ouest", topic: "BCEAO — Shawarar Dabarun Kudi" },
  ln:  { name: "Lingala", country: "RDC/Congo", region: "Afrique Centrale", topic: "COBAC — Botosi ya mibeko" },
  am:  { name: "Amharique", country: "Éthiopie", region: "Afrique de l'Est", topic: "Gouvernance — የፋይናንስ ምክር" },
  pt:  { name: "Portugais", country: "Mozambique/Angola", region: "Afrique Australe", topic: "BCEAO/COBAC — Conformidade Bancária" },
  ar:  { name: "Arabe", country: "Afrique du Nord", region: "Afrique du Nord", topic: "BCEAO — الامتثال المصرفي" },
  ig:  { name: "Igbo", country: "Nigeria", region: "Afrique de l'Ouest", topic: "Gouvernance — Ọchịchị na Africa" },
  yo:  { name: "Yoruba", country: "Nigeria", region: "Afrique de l'Ouest", topic: "Finance — Ìmọ̀ràn Ìṣúná" },
  mos: { name: "Mooré", country: "Burkina Faso", region: "Afrique de l'Ouest", topic: "BCEAO — Ligd rog-mikã Afriki" },
  en:  { name: "Anglais", country: "Nigeria/Ghana", region: "Afrique de l'Ouest", topic: "Governance & Compliance in Africa" },
  fr:  { name: "Français", country: "Cameroun/Gabon/Congo", region: "Afrique Centrale", topic: "COBAC — Exigences 2026" },
  dua: { name: "Duala", country: "Cameroun", region: "Afrique Centrale", topic: "BCEAO/COBAC — Bolane̱ la mbako" },
  xh:  { name: "Xhosa", country: "Afrique du Sud", region: "Afrique Australe", topic: "Governance — Ingcebiso ngeZimali" },
  zu:  { name: "Zoulou", country: "Afrique du Sud", region: "Afrique Australe", topic: "Finance — Iseluleko seZimali" },
  fmp: { name: "Fulfulde", country: "Sahel", region: "Afrique de l'Ouest", topic: "BCEAO — Wasiyaaji kaalis" },
  ewo: { name: "Ewondo", country: "Cameroun", region: "Afrique Centrale", topic: "COBAC — Mvông é bingilan" },
  om:  { name: "Oromo", country: "Éthiopie/Kenya", region: "Afrique de l'Est", topic: "Finance — Gorsa Faayinaansii" },
  sn:  { name: "Shona", country: "Zimbabwe", region: "Afrique Australe", topic: "Governance — Mazano eHurongwa" },
  zh:  { name: "Chinois", country: "Chine/Afrique", region: "International", topic: "BCEAO — 金融合规咨询" },
  de:  { name: "Allemand", country: "Allemagne/UE", region: "International", topic: "ESG — Strategische Beratung" },
  es:  { name: "Espagnol", country: "Guinée Éq./Espagne", region: "International", topic: "BCEAO — Consultoría Financiera" },
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })

  try {
    const url = new URL(req.url)
    const forceDate = url.searchParams.get("date") // optional: YYYY-MM-DD
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })

    // Health check
    if (url.searchParams.get("action") === "health") {
      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-social-daily-generation-v1",
        languages: Object.keys(LANGUAGE_QUEUE).length,
        period: "2026-07-11 → 2026-07-25",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    const today = forceDate || new Date().toISOString().slice(0, 10)
    const todayStart = `${today}T00:00:00Z`
    const todayEnd = `${today}T23:59:59Z`

    console.log(`[KOS-SOCIAL-DAILY] Running for date: ${today}`)

    // ─── Step 1: Fetch posts scheduled for today ───
    const { data: scheduledPosts, error: fetchErr } = await supabase
      .from("social_automation_queue")
      .select("*")
      .gte("scheduled_for", todayStart)
      .lte("scheduled_for", todayEnd)
      .in("status", ["draft"])
      .order("scheduled_for", { ascending: true })

    if (fetchErr) {
      console.error(`[KOS-SOCIAL-DAILY] Fetch error:`, fetchErr)
      return new Response(JSON.stringify({ status: "error", error: fetchErr.message, date: today, posts_found: 0 }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      })
    }

    if (!scheduledPosts || scheduledPosts.length === 0) {
      console.log(`[KOS-SOCIAL-DAILY] No posts scheduled for ${today}`)
      return new Response(JSON.stringify({
        status: "ok",
        date: today,
        posts_found: 0,
        posts_published: 0,
        message: "No posts scheduled for today"
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    console.log(`[KOS-SOCIAL-DAILY] Found ${scheduledPosts.length} posts for ${today}`)

    // ─── Step 2: Update posts to "scheduled" status ───
    let publishedCount = 0
    const results: Record<string, unknown>[] = []

    for (const post of scheduledPosts) {
      try {
        const { error: updateErr } = await supabase
          .from("social_automation_queue")
          .update({
            status: "scheduled",
            updated_at: new Date().toISOString(),
          })
          .eq("id", post.id)

        if (updateErr) {
          console.error(`[KOS-SOCIAL-DAILY] Update error for post ${post.id}:`, updateErr)
          results.push({ id: post.id, status: "error", error: updateErr.message })
        } else {
          publishedCount++
          const lang = (post.metadata as Record<string, string>)?.["language"] || "unknown"
          results.push({
            id: post.id,
            status: "scheduled",
            language: lang,
            platform: post.platform,
            scheduled_for: post.scheduled_for,
          })
          console.log(`[KOS-SOCIAL-DAILY] Post #${post.id} scheduled — ${lang} — ${post.platform}`)
        }
      } catch (e) {
        console.error(`[KOS-SOCIAL-DAILY] Exception for post ${post.id}:`, e)
        results.push({ id: post.id, status: "error", error: String(e) })
      }
    }

    // ─── Step 3: Log the run ───
    try {
      await supabase.from("kos_execution_logs").insert({
        agent: "kos-social-daily-generation",
        action: "daily_publish",
        status: "completed",
        metadata: {
          date: today,
          posts_found: scheduledPosts.length,
          posts_published: publishedCount,
          results,
        },
        created_at: new Date().toISOString(),
      })
    } catch (_) { /* non-blocking */ }

    return new Response(JSON.stringify({
      status: "ok",
      date: today,
      posts_found: scheduledPosts.length,
      posts_published: publishedCount,
      results,
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

  } catch (err) {
    console.error(`[KOS-SOCIAL-DAILY] Fatal error:`, err)
    return new Response(JSON.stringify({ status: "error", error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    })
  }
})