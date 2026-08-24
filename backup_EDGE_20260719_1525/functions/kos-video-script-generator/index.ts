
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
}

// ============================================================
// KOS VIDEO SCRIPT GENERATOR™ — Pipeline Étape 2
// 1. Récupère les topics à scorer dans khepra_topics
// 2. Génère script vidéo 60s (template KOS ou LLM externe)
// 3. Traduit en langues locales (DeepL si configuré, sinon glossaire KOS)
// 4. Génère SEO Meta + VideoObject schema
// 5. Met à jour khepra_topics avec scripts + meta
// ============================================================

const LANGUAGES: Record<string, { name: string; code: string; region: string }> = {
  fr: { name: "Français", code: "FR", region: "Afrique de l'Ouest & Centrale" },
  wo: { name: "Wolof", code: "WO", region: "Sénégal" },
  ee: { name: "Éwé", code: "EE", region: "Togo" },
  ln: { name: "Lingala", code: "LN", region: "RDC/Congo" },
  ha: { name: "Haoussa", code: "HA", region: "Nigeria/Niger" },
}

// Glossaire KOS local — fallback si pas de DeepL
const LOCAL_GLOSSARY: Record<string, Record<string, string>> = {
  wo: {
    "Bonjour": "Salaam aleekum",
    "conformité": "toftali",
    "BCEAO": "BCEAO",
    "PME": "PME",
    "diagnostic": "saytu",
    "gratuit": "teey",
    "gouvernance": "nguur",
    "risque": "metti",
    "audit": "kont",
    "directive": "yoon",
    "banque": "bank",
    "finance": "khalis",
    "réglementation": "yoonu nguur",
    "stratégie": "pexe",
    "expert": "xam-xam",
    "cliquez": "dëppal",
    "lien": "link",
    "vidéo": "video",
    "KHEPRA": "KHEPRA",
    "abonnez-vous": "binduleen",
  },
  ee: {
    "Bonjour": "Miawoe zɔ",
    "conformité": "dziɖuɖu",
    "BCEAO": "BCEAO",
    "PME": "PME",
    "diagnostic": "dzikpɔkpɔ",
    "gratuit": "magbemagbe",
    "gouvernance": "dziɖuɖu",
    "risque": "ŋɔdzidoname",
    "audit": "dzikpɔkpɔ",
    "directive": "mɔfiame",
    "banque": "gadzraɖoƒe",
    "finance": "ga",
    "stratégie": "ɖoɖo",
    "expert": "ɖokala",
    "KHEPRA": "KHEPRA",
  },
  ln: {
    "Bonjour": "Mbote",
    "conformité": "botosi",
    "BCEAO": "BCEAO",
    "PME": "PME",
    "diagnostic": "bokengi",
    "gratuit": "ya mabele",
    "gouvernance": "boyangeli",
    "risque": "likama",
    "audit": "bokengi",
    "directive": "mibeko",
    "banque": "banki",
    "finance": "mbongo",
    "stratégie": "mwango",
    "expert": "moto ya mayele",
    "KHEPRA": "KHEPRA",
  },
  ha: {
    "Bonjour": "Sannu",
    "conformité": "biyayya",
    "BCEAO": "BCEAO",
    "PME": "PME",
    "diagnostic": "bincike",
    "gratuit": "kyauta",
    "gouvernance": "mulki",
    "risque": "hadari",
    "audit": "bincike",
    "directive": "umarni",
    "banque": "banki",
    "finance": "kudi",
    "stratégie": "dabara",
    "expert": "gwani",
    "KHEPRA": "KHEPRA",
  },
}

function generateScriptFR(topic: { title: string; angle: string; keywords: string[] }): string {
  const hook = `🚨 ${topic.angle.substring(0, 80)}`
  const point1 = topic.keywords.length > 0
    ? `Point 1 — ${topic.keywords[0]}: Ce qui change concrètement pour votre organisation en 2026. Les régulateurs (BCEAO/COBAC) renforcent les exigences. Voici les 3 implications directes.`
    : `Point 1 — Analyse réglementaire: ce qui change pour votre organisation.`
  const point2 = `Point 2 — Impact opérationnel: quelles actions mettre en place dès maintenant pour être en conformité. Méthodologie KHEPRA en 3 étapes.`
  const point3 = `Point 3 — Opportunité stratégique: transformez cette contrainte en avantage concurrentiel. Les dirigeants qui anticipent gagnent des parts de marché.`
  const cta = `🔗 Diagnostic gratuit KHEPRA EXPERTS — Lien en description. Abonnez-vous pour plus d'analyses réglementaires Afrique.`

  return `${hook}\n\n${point1}\n\n${point2}\n\n${point3}\n\n${cta}`
}

function translateLocal(text: string, lang: string): string {
  const glossary = LOCAL_GLOSSARY[lang]
  if (!glossary) return `[${LANGUAGES[lang]?.name || lang}] ${text.substring(0, 200)}`

  let result = text
  // Replace known terms
  for (const [fr, local] of Object.entries(glossary)) {
    const regex = new RegExp(fr.replace(/[-\/\\^$*+?.()|[\]]/g, '\\$&'), 'gi')
    result = result.replace(regex, local)
  }

  // Add language tag
  const langName = LANGUAGES[lang]?.name || lang
  return `[${langName}] ${result.substring(0, 1500)}`
}

async function translateWithDeepL(text: string, targetLang: string): Promise<string | null> {
  const apiKey = Deno.env.get("DEEPL_API_KEY")
  if (!apiKey) return null

  try {
    const resp = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", "Authorization": `DeepL-Auth-Key ${apiKey}` },
      body: new URLSearchParams({ text: text.substring(0, 1000), target_lang: targetLang.toUpperCase() }),
    })
    if (!resp.ok) return null
    const data = await resp.json()
    return data?.translations?.[0]?.text || null
  } catch {
    return null
  }
}

function generateSEOMeta(topic: { title: string; angle: string; keywords: string[] }, scriptFR: string): Record<string, unknown> {
  const title = `${topic.angle} | KHEPRA EXPERTS`
  const description = scriptFR.substring(0, 155).replace(/\n/g, " ")
  const tags = [...topic.keywords, "BCEAO", "OHADA", "PME Afrique", "KHEPRA EXPERTS", "Conformité"]

  return {
    title: title.substring(0, 60),
    description,
    tags: tags.slice(0, 10),
    schema: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: topic.angle.substring(0, 100),
      description: description,
      thumbnailUrl: "{{thumbnail}}",
      uploadDate: new Date().toISOString(),
      inLanguage: Object.keys(LANGUAGES),
      author: { "@type": "Organization", name: "KHEPRA EXPERTS" },
      potentialAction: {
        "@type": "SeekToAction",
        target: "https://khepraexperts.com/diagnostic"
      }
    }
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
    const action = url.searchParams.get("action") || "generate_all"

    if (action === "health") {
      return new Response(JSON.stringify({
        status: "ok",
        engine: "kos-video-script-generator-v1",
        languages: Object.keys(LANGUAGES).length,
        has_deepl: !!Deno.env.get("DEEPL_API_KEY"),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    if (action === "generate_all" || action === "generate") {
      // Fetch topics that need scripts
      const limit = parseInt(url.searchParams.get("limit") || "5")
      const topicId = url.searchParams.get("topic_id")

      let query = supabase.from("khepra_topics").select("*").eq("status", "scored").order("score", { ascending: false }).limit(limit)
      if (topicId) query = supabase.from("khepra_topics").select("*").eq("id", topicId).limit(1)

      const { data: topics, error: fetchErr } = await query
      if (fetchErr) throw new Error(fetchErr.message)
      if (!topics || topics.length === 0) {
        return new Response(JSON.stringify({
          status: "ok",
          message: "No topics awaiting script generation",
          topics_processed: 0,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
      }

      console.log(`[SCRIPT-GEN] Processing ${topics.length} topics...`)

      const results: Array<Record<string, unknown>> = []

      for (const topic of topics) {
        try {
          // Step 1: Generate French script
          const scriptFR = generateScriptFR(topic)
          console.log(`[SCRIPT-GEN] Topic "${topic.title.substring(0, 60)}" — FR script: ${scriptFR.length} chars`)

          // Step 2: Translate to local languages
          const scripts: Record<string, string> = { fr: scriptFR }
          for (const lang of Object.keys(LANGUAGES)) {
            if (lang === "fr") continue

            // Try DeepL first, fallback to local glossary
            const deepLResult = await translateWithDeepL(scriptFR, lang)
            if (deepLResult) {
              scripts[lang] = deepLResult
            } else {
              scripts[lang] = translateLocal(scriptFR, lang)
            }
            console.log(`[SCRIPT-GEN]   → ${LANGUAGES[lang]?.name}: ${scripts[lang].length} chars`)
          }

          // Step 3: Generate SEO Meta
          const seoMeta = generateSEOMeta(topic, scriptFR)

          // Step 4: Update topic in DB
          const { error: updateErr } = await supabase.from("khepra_topics").update({
            scripts,
            seo_meta: seoMeta,
            status: "scripted",
            updated_at: new Date().toISOString(),
          }).eq("id", topic.id)

          if (updateErr) {
            console.error(`[SCRIPT-GEN] Update error for ${topic.id}:`, updateErr)
            results.push({ id: topic.id, status: "error", error: updateErr.message })
          } else {
            results.push({
              id: topic.id,
              title: topic.title.substring(0, 80),
              status: "scripted",
              languages: Object.keys(scripts),
              fr_chars: scriptFR.length,
            })
          }
        } catch (e) {
          console.error(`[SCRIPT-GEN] Error processing topic ${topic.id}:`, e)
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

    // List scripted topics
    if (action === "list") {
      const { data, error } = await supabase.from("khepra_topics").select("id, title, score, status, scripts->fr").in("status", ["scripted", "video_generated", "published"]).order("score", { ascending: false }).limit(20)
      if (error) throw new Error(error.message)

      return new Response(JSON.stringify({
        status: "ok",
        count: data?.length || 0,
        topics: (data || []).map(t => ({
          id: t.id,
          title: t.title,
          score: t.score,
          status: t.status,
          script_preview: typeof t.fr === 'string' ? t.fr.substring(0, 150) : "",
        })),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } })
    }

    return new Response(JSON.stringify({
      error: "Invalid action",
      available: ["health", "generate_all", "generate", "list"],
    }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } })

  } catch (err) {
    console.error("[SCRIPT-GEN] Error:", err)
    return new Response(JSON.stringify({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } })
  }
})
