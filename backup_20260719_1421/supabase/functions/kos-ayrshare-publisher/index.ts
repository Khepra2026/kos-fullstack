
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS AYRSHARE PUBLISHER™ — Pipeline Étape 3
// Multi-plateforme: YouTube, LinkedIn, Facebook, Instagram, TikTok, Threads
// + locales (fr, wo, ee, ln, ha)
// ============================================================

const PLATFORMS = ["youtube", "linkedin", "facebook", "instagram", "tiktok", "threads"] as const

const LOCALE_CONFIGS: Record<string, { title_prefix: string; hashtags: string[] }> = {
  fr: { title_prefix: "", hashtags: ["#BCEAO", "#Conformité", "#PMEAfrique"] },
  wo: { title_prefix: "[Wolof] ", hashtags: ["#BCEAO", "#Senegal", "#KHEPRA"] },
  ee: { title_prefix: "[Éwé] ", hashtags: ["#BCEAO", "#Togo", "#KHEPRA"] },
  ln: { title_prefix: "[Lingala] ", hashtags: ["#COBAC", "#RDC", "#KHEPRA"] },
  ha: { title_prefix: "[Haoussa] ", hashtags: ["#BCEAO", "#Nigeria", "#KHEPRA"] },
}

async function getAyrshareKey(supabase: any): Promise<string | null> {
  try {
    const { data } = await supabase.from("social_api_tokens").select("token_value").eq("provider", "ayrshare").eq("is_active", true).maybeSingle()
    return data?.token_value || Deno.env.get("AYRSHARE_KEY") || null
  } catch {
    return Deno.env.get("AYRSHARE_KEY") || null
  }
}

async function publishToAyrshare(
  apiKey: string,
  content: string,
  platforms: string[],
  videoUrl: string,
  title: string,
  lang: string,
  scheduleDate?: string,
): Promise<{ success: boolean; postId?: string; error?: string }> {
  try {
    const localeConfig = LOCALE_CONFIGS[lang] || LOCALE_CONFIGS.fr

    const body: Record<string, unknown> = {
      post: content.substring(0, 3000),
      platforms,
      hashtags: localeConfig.hashtags,
    }

    if (videoUrl) {
      body.mediaUrls = [videoUrl]
    }

    // YouTube-specific options
    if (platforms.includes("youtube")) {
      body.youTubeOptions = {
        title: `${localeConfig.title_prefix}${title}`.substring(0, 100),
        description: content.substring(0, 5000),
        categoryId: "27", // Education
        privacyStatus: "public",
      }
    }

    // Instagram-specific
    if (platforms.includes("instagram")) {
      body.instagramOptions = {
        hashtags: localeConfig.hashtags.slice(0, 10),
      }
    }

    if (scheduleDate) {
      body.scheduleDate = scheduleDate
    }

    console.log(`[AYRSHARE] Publishing to ${platforms.join(", ")} — lang: ${lang} — title: ${title.substring(0, 60)}`)

    const resp = await fetch("https://api.ayrshare.com/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    const data = await resp.json()

    if (!resp.ok) {
      console.error(`[AYRSHARE] API error:`, data)
      return { success: false, error: data?.message || `HTTP ${resp.status}` }
    }

    return { success: true, postId: data?.id || data?.postId || "published" }
  } catch (e) {
    console.error("[AYRSHARE] Exception:", e)
    return { success: false, error: String(e) }
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
    const action = url.searchParams.get("action") || "publish_all"

    if (action === "health") {
      const apiKey = await getAyrshareKey(supabase)
      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-ayrshare-publisher-v1",
        platforms: PLATFORMS,
        locales: Object.keys(LOCALE_CONFIGS),
        ayrshare_configured: !!apiKey,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "publish_all" || action === "publish") {
      const apiKey = await getAyrshareKey(supabase)
      if (!apiKey) {
        return new Response(JSON.stringify({
          status: "error",
          error: "Ayrshare API key not configured. Add AYRSHARE_KEY to Supabase secrets or social_api_tokens table.",
          code: "AYRSHARE_NOT_CONFIGURED",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      const topicId = url.searchParams.get("topic_id")
      const limit = parseInt(url.searchParams.get("limit") || "3")

      // Fetch topics ready for publishing
      let query = supabase.from("khepra_topics").select("*").in("status", ["scripted", "video_generated"]).order("score", { ascending: false }).limit(limit)
      if (topicId) query = supabase.from("khepra_topics").select("*").eq("id", topicId).limit(1)

      const { data: topics, error: fetchErr } = await query
      if (fetchErr) throw new Error(fetchErr.message)
      if (!topics || topics.length === 0) {
        return new Response(JSON.stringify({
          status: "ok",
          message: "No topics ready for publishing",
          topics_processed: 0,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      console.log(`[AYRSHARE] Publishing ${topics.length} topics...`)

      const results: Array<Record<string, unknown>> = []

      for (const topic of topics) {
        try {
          const scripts = topic.scripts as Record<string, string> || {}
          const videoUrl = (topic.video_url as string) || ""
          const thumbnailUrl = (topic.thumbnail_url as string) || ""

          const postIds: Record<string, string> = {}

          // Publish in each language
          for (const lang of Object.keys(scripts)) {
            if (!scripts[lang]) continue

            const platformsForLang = [...PLATFORMS]
            // YouTube only for FR initially (avoid quota issues)
            if (lang !== "fr") {
              const idx = platformsForLang.indexOf("youtube")
              if (idx > -1) platformsForLang.splice(idx, 1)
            }

            const title = `${topic.angle || topic.title}`.substring(0, 100)
            const result = await publishToAyrshare(
              apiKey,
              scripts[lang],
              platformsForLang,
              videoUrl,
              title,
              lang,
            )

            if (result.success && result.postId) {
              postIds[lang] = result.postId
              console.log(`[AYRSHARE] ✅ ${lang} → ${platformsForLang.join(", ")}`)
            } else {
              console.error(`[AYRSHARE] ❌ ${lang}: ${result.error}`)
            }

            // Rate limit: small delay between languages
            if (Object.keys(scripts).length > 1) {
              await new Promise(r => setTimeout(r, 1000))
            }
          }

          // Update topic with post IDs
          const { error: updateErr } = await supabase.from("khepra_topics").update({
            post_ids: postIds,
            status: "published",
            published_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }).eq("id", topic.id)

          if (updateErr) {
            results.push({ id: topic.id, status: "partial", error: updateErr.message, posts: postIds })
          } else {
            results.push({
              id: topic.id,
              title: topic.title?.substring(0, 80),
              status: "published",
              languages: Object.keys(postIds),
              posts: postIds,
            })
          }

          // Also log in social_automation_queue for analytics
          try {
            await supabase.from("social_automation_queue").insert({
              platform: "multi",
              post_type: "video",
              title: topic.title?.substring(0, 200),
              content: (scripts?.fr as string || "").substring(0, 2000),
              status: "published",
              agent_generated: "kos-ayrshare-publisher-v1",
              metadata: {
                topic_id: topic.id,
                languages: Object.keys(postIds),
                platforms: PLATFORMS,
                post_ids: postIds,
                score: topic.score,
              },
            })
          } catch { /* non-blocking */ }

        } catch (e) {
          console.error(`[AYRSHARE] Error processing topic ${topic.id}:`, e)
          results.push({ id: topic.id, status: "error", error: String(e) })
        }
      }

      return new Response(JSON.stringify({
        status: "ok",
        topics_processed: results.length,
        results,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })

    }

    return new Response(JSON.stringify({
      error: "Invalid action",
      available: ["health", "publish_all", "publish"],
    }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

  } catch (err) {
    console.error("[AYRSHARE] Error:", err)
    return new Response(JSON.stringify({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
