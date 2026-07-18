
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS REPLY BOT IA™ — Pipeline Étape 4
// 1. Webhook commentaire (YouTube, Facebook, Instagram)
// 2. Classification intention: question | objection | lead | spam
// 3. Réponse contextuelle (SIMDA — Expert BCEAO)
// 4. Si lead → Zapier CRM
// ============================================================

const REPLY_TEMPLATES: Record<string, Record<string, string>> = {
  question: {
    default: "Merci pour votre question ! La réponse détaillée est dans notre diagnostic gratuit. Lien en bio 🔗",
    BCEAO: "Excellente question sur la réglementation BCEAO. Le détail est dans notre note d'analyse complète — lien en description 📋",
    COBAC: "Bonne question sur la COBAC. Téléchargez notre guide complet de mise en conformité CEMAC — lien en bio 📊",
  },
  objection: {
    default: "Je comprends votre point de vue. C'est justement pour clarifier ces sujets complexes que nous proposons un diagnostic gratuit. Testez-le ! ✅",
  },
  lead: {
    default: "Parfait ! Pour recevoir votre diagnostic personnalisé gratuit, laissez votre email en commentaire ou contactez-nous via le lien en bio. Notre équipe vous répond sous 24h ⚡",
  },
  spam: {
    default: "",
  },
}

const LEAD_KEYWORDS = [
  "intéressé", "contact", "email", "diagnostic", "gratuit", "prix", "tarif",
  "devis", "accompagnement", "besoin", "mission", "projet", "intéressant",
  "comment faire", "comment obtenir", "je veux", "je souhaite",
  "interested", "contact me", "how to get", "I need", "pricing",
]

const SPAM_KEYWORDS = [
  "crypto", "bitcoin", "forex", "gagner argent", "investissement",
  "buy followers", "acheter abonnés", "gagner rapidement",
]

function classifyIntent(comment: string): "question" | "objection" | "lead" | "spam" {
  const lower = comment.toLowerCase()

  // Spam check first
  for (const kw of SPAM_KEYWORDS) {
    if (lower.includes(kw)) return "spam"
  }

  // Lead check
  let leadScore = 0
  for (const kw of LEAD_KEYWORDS) {
    if (lower.includes(kw)) leadScore++
  }
  if (leadScore >= 2) return "lead"

  // Contains email pattern → lead
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(comment)) return "lead"

  // Question check
  if (/[?？]/.test(comment) ||
    /\b(comment|pourquoi|quand|où|qui|quoi|quel|quelle|quels|quelles|how|why|when|where|what|which|who)\b/i.test(comment)) {
    return "question"
  }

  // Objection check
  if (/\b(mais|cependant|par contre|pas d'accord|faux|incorrect|trop|cher|pas vrai)\b/i.test(comment) ||
    comment.length > 100) {
    return "objection"
  }

  // Default: treat longer comments as questions
  if (comment.length > 30) return "question"

  return "question" // default fallback
}

function extractEmail(text: string): string | null {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)
  return match ? match[0] : null
}

function generateReply(comment: string, intent: string, regulators: string[]): string {
  const templates = REPLY_TEMPLATES[intent] || REPLY_TEMPLATES.question

  // Try regulator-specific template
  for (const reg of regulators) {
    if (templates[reg]) return templates[reg]
  }

  return templates.default || ""
}

async function sendToZapier(webhookUrl: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const resp = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return resp.ok
  } catch {
    return false
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
    const action = url.searchParams.get("action") || "process"

    if (action === "health") {
      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-reply-bot-v1",
        intents: Object.keys(REPLY_TEMPLATES),
        lead_keywords: LEAD_KEYWORDS.length,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "process" || action === "webhook") {
      const body = await req.json()
      const { comment, platform, post_id, comment_id, author_name, video_id } = body

      if (!comment || typeof comment !== "string") {
        return new Response(JSON.stringify({
          status: "error",
          error: "comment is required",
        }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      console.log(`[REPLY-BOT] Processing comment from ${platform}: "${comment.substring(0, 80)}..."`)

      // Step 1: Classify intent
      const intent = classifyIntent(comment)
      console.log(`[REPLY-BOT] Intent: ${intent}`)

      // Step 2: Determine regulators from context
      const regulators = ["BCEAO", "COBAC"]
      const lowerComment = comment.toLowerCase()
      if (lowerComment.includes("cobac") || lowerComment.includes("cemac")) regulators.unshift("COBAC")
      if (lowerComment.includes("bceao") || lowerComment.includes("uemoa")) regulators.unshift("BCEAO")

      // Step 3: Generate reply
      const reply = generateReply(comment, intent, regulators)

      // Step 4: Store comment
      let storedCommentId: string | null = null
      try {
        const { data: inserted } = await supabase.from("yt_comments").insert({
          comment_text: comment,
          author_name: author_name || "unknown",
          platform: platform || "unknown",
          intent,
          reply_text: reply || null,
          replied: intent !== "spam" && reply.length > 0,
          metadata: {
            post_id,
            comment_id,
            video_id,
            regulators,
            intent,
          },
        }).select("id").maybeSingle()
        if (inserted) storedCommentId = inserted.id
      } catch { /* non-blocking */ }

      // Step 5: If lead → send to CRM
      let crmSent = false
      if (intent === "lead") {
        const email = extractEmail(comment)
        const zapierWebhook = Deno.env.get("ZAPIER_WEBHOOK_URL") || ""
        if (zapierWebhook && email) {
          crmSent = await sendToZapier(zapierWebhook, {
            email,
            source: platform || "social",
            comment,
            author_name: author_name || "unknown",
            post_id,
            intent,
            timestamp: new Date().toISOString(),
          })
        }
      }

      // Step 6: Send reply if applicable
      let replySent = false
      if (intent !== "spam" && reply.length > 0) {
        const ayrshareKey = Deno.env.get("AYRSHARE_KEY") || ""
        if (ayrshareKey && post_id) {
          try {
            const resp = await fetch("https://api.ayrshare.com/api/comment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${ayrshareKey}`,
              },
              body: JSON.stringify({
                platform: platform || "youtube",
                postId: post_id,
                comment: reply,
              }),
            })
            replySent = resp.ok
          } catch {
            replySent = false
          }
        }

        // Log reply attempt
        if (storedCommentId) {
          try {
            await supabase.from("yt_comments").update({
              replied: replySent,
              reply_text: reply,
            }).eq("id", storedCommentId)
          } catch { /* non-blocking */ }
        }
      }

      return new Response(JSON.stringify({
        status: "ok",
        intent,
        reply: reply || null,
        reply_sent: replySent,
        lead_detected: intent === "lead",
        crm_sent: crmSent,
        stored_comment_id: storedCommentId,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    // Batch process pending comments
    if (action === "process_pending") {
      const { data: comments } = await supabase.from("yt_comments").select("*").eq("replied", false).order("created_at", { ascending: true }).limit(10)

      if (!comments || comments.length === 0) {
        return new Response(JSON.stringify({
          status: "ok",
          message: "No pending comments",
          processed: 0,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      let processed = 0
      for (const c of comments) {
        try {
          const intent = classifyIntent(c.comment_text || "")
          const reply = generateReply(c.comment_text || "", intent, ["BCEAO"])

          await supabase.from("yt_comments").update({
            intent,
            reply_text: reply,
            replied: intent !== "spam",
          }).eq("id", c.id)

          processed++
        } catch { /* continue */ }
      }

      return new Response(JSON.stringify({
        status: "ok",
        processed,
        total: comments.length,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({
      error: "Invalid action",
      available: ["health", "process", "webhook", "process_pending"],
    }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

  } catch (err) {
    console.error("[REPLY-BOT] Error:", err)
    return new Response(JSON.stringify({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
