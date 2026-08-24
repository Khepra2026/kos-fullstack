
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS CONTENT RECYCLER™ — Pipeline Étape 5
// 1. Tous les 30 jours : repère le top 10% des vidéos
// 2. Si CTR < 2% → A/B test nouveau hook
// 3. Republie les contenus performants
// 4. Nettoie les topics anciens → archived
// ============================================================

const TOP_PERCENT = 0.10 // top 10%
const CTR_THRESHOLD = 0.02 // 2%
const RECYCLE_DAYS = 30
const ARCHIVE_DAYS = 90

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
        engine: "kos-content-recycler-v1",
        recycle_days: RECYCLE_DAYS,
        archive_days: ARCHIVE_DAYS,
        ctr_threshold: CTR_THRESHOLD,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "run" || action === "recycle") {
      console.log("[RECYCLER] Starting content recycle scan...")

      const thirtyDaysAgo = new Date(Date.now() - RECYCLE_DAYS * 24 * 3600 * 1000).toISOString()
      const ninetyDaysAgo = new Date(Date.now() - ARCHIVE_DAYS * 24 * 3600 * 1000).toISOString()

      // Step 1: Find published topics from last 30 days
      const { data: recentTopics, error: fetchErr } = await supabase
        .from("khepra_topics")
        .select("*")
        .gte("published_at", thirtyDaysAgo)
        .in("status", ["published"])
        .order("score", { ascending: false })

      if (fetchErr) throw new Error(fetchErr.message)

      const totalTopics = recentTopics?.length || 0
      const topCount = Math.max(1, Math.ceil(totalTopics * TOP_PERCENT))

      console.log(`[RECYCLER] Found ${totalTopics} recent topics, top ${topCount} eligible for recycle`)

      let recycled = 0
      let abTested = 0
      let archived = 0

      // Step 2: Process top topics for recycling
      if (recentTopics && recentTopics.length > 0) {
        const topTopics = recentTopics.slice(0, topCount)

        for (const topic of topTopics) {
          try {
            // Check if we have analytics data
            const { data: analytics } = await supabase
              .from("social_automation_queue")
              .select("metadata")
              .eq("title", topic.title)
              .limit(1)

            const metadata = (analytics?.[0]?.metadata as Record<string, unknown>) || {}
            const ctr = (metadata.ctr as number) || 0

            if (ctr > 0 && ctr < CTR_THRESHOLD) {
              // A/B test: regenerate hook
              const oldAngle = topic.angle || topic.title
              const newAngle = `[V2] ${oldAngle} — NOUVEAU: ce que 90% des dirigeants ignorent`

              await supabase.from("khepra_topics").update({
                angle: newAngle,
                status: "scripted", // reset to trigger re-generation
                updated_at: new Date().toISOString(),
              }).eq("id", topic.id)

              abTested++
              console.log(`[RECYCLER] A/B test for topic "${topic.title?.substring(0, 60)}" CTR=${(ctr * 100).toFixed(1)}%`)
            } else {
              // Good performer → mark for recycling
              await supabase.from("khepra_topics").update({
                status: "scored", // reset pipeline
                score: Math.min(100, (topic.score || 80) + 5), // boost score for proven content
                updated_at: new Date().toISOString(),
              }).eq("id", topic.id)

              recycled++
              console.log(`[RECYCLER] Recycling topic "${topic.title?.substring(0, 60)}"`)
            }
          } catch (e) {
            console.error(`[RECYCLER] Error processing topic ${topic.id}:`, e)
          }
        }
      }

      // Step 3: Archive old topics
      const { data: oldTopics } = await supabase
        .from("khepra_topics")
        .select("id")
        .lt("published_at", ninetyDaysAgo)
        .not("status", "in", "(archived)")
        .limit(50)

      if (oldTopics && oldTopics.length > 0) {
        const { error: archiveErr } = await supabase
          .from("khepra_topics")
          .update({ status: "archived", updated_at: new Date().toISOString() })
          .in("id", oldTopics.map(t => t.id))

        if (!archiveErr) archived = oldTopics.length
      }

      console.log(`[RECYCLER] Done: ${recycled} recycled, ${abTested} A/B tested, ${archived} archived`)

      return new Response(JSON.stringify({
        status: "ok",
        total_recent: totalTopics,
        top_recycle_count: topCount,
        recycled,
        ab_tested: abTested,
        archived,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // Show stats
    if (action === "stats") {
      const thirtyDaysAgo = new Date(Date.now() - RECYCLE_DAYS * 24 * 3600 * 1000).toISOString()

      const { count: publishedCount } = await supabase
        .from("khepra_topics")
        .select("*", { count: "exact", head: true })
        .eq("status", "published")

      const { count: recentCount } = await supabase
        .from("khepra_topics")
        .select("*", { count: "exact", head: true })
        .eq("status", "published")
        .gte("published_at", thirtyDaysAgo)

      const { count: recycledCount } = await supabase
        .from("khepra_topics")
        .select("*", { count: "exact", head: true })
        .eq("status", "recycled")

      const { count: archivedCount } = await supabase
        .from("khepra_topics")
        .select("*", { count: "exact", head: true })
        .eq("status", "archived")

      return new Response(JSON.stringify({
        status: "ok",
        published_total: publishedCount || 0,
        published_recent: recentCount || 0,
        recycled: recycledCount || 0,
        archived: archivedCount || 0,
        recycle_days: RECYCLE_DAYS,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({
      error: "Invalid action",
      available: ["health", "run", "recycle", "stats"],
    }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

  } catch (err) {
    console.error("[RECYCLER] Error:", err)
    return new Response(JSON.stringify({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
