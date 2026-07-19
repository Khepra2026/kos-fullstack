import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

Deno.serve(async (req: Request) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const slug = body?.slug;

    if (!slug || typeof slug !== "string") {
      return new Response(
        JSON.stringify({ error: "Le paramètre slug est requis" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. Récupère la page KB
    const { data: page, error: pageError } = await supabase
      .from("kb_pages")
      .select("title, content_html, h1, meta_desc")
      .eq("slug", slug)
      .single();

    if (pageError || !page) {
      return new Response(
        JSON.stringify({
          error: "Page KB introuvable",
          hook: "",
          body: "",
          hashtags: ["BCEAO", "OHADA", "Gouvernance", "KOSAI"],
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. Si pas de clé OpenAI, retourne un fallback structuré
    if (!OPENAI_API_KEY) {
      const firstLine = page.content_html
        ?.replace(/<[^>]*>/g, "")
        ?.split(".")
        ?.slice(0, 2)
        ?.join(". ") || "";

      return new Response(
        JSON.stringify({
          hook: page.meta_desc?.slice(0, 100) || page.title?.slice(0, 100) || "Découvrez notre analyse experte",
          body: firstLine.slice(0, 500) || page.title || "Article KHEPRA Experts — Gouvernance, conformité, risque.",
          hashtags: ["BCEAO", "OHADA", "Gouvernance", "KOSAI"],
          source: "fallback",
        }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Génération via OpenAI GPT-4o
    const contentSnippet = (page.content_html || "")
      .replace(/<[^>]*>/g, "")
      .slice(0, 2000);

    const prompt = `Tu es Community Manager Big Four pour Khepra Experts, cabinet de conseil en gouvernance, conformité réglementaire et risque en Afrique (UEMOA, CEMAC).

Génère 1 post social media optimisé pour:
Titre: ${page.title}
Contenu: ${contentSnippet}

Format JSON:
{
  "hook": "max 100 caractères, chiffre choc ou question provocante",
  "body": "200-500 caractères, ton expert pas vendeur, cite une donnée du contenu, CTA discret vers diagnostic gratuit",
  "hashtags": ["BCEAO", "OHADA", "Gouvernance", "KOSAI"]
}

Ton: Expert, institutionnel, pas commercial. Apporte de la valeur.`;

    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!completion.ok) {
      const errBody = await completion.text();
      console.error("OpenAI error:", completion.status, errBody);
      throw new Error(`OpenAI API error: ${completion.status}`);
    }

    const result = await completion.json();
    const generated = JSON.parse(result.choices[0].message.content);

    return new Response(
      JSON.stringify({
        hook: generated.hook || "",
        body: generated.body || "",
        hashtags: generated.hashtags || ["BCEAO", "OHADA", "Gouvernance", "KOSAI"],
        source: "gpt-4o",
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("kos-social-copy error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Erreur interne",
        hook: "",
        body: "",
        hashtags: ["BCEAO", "OHADA", "Gouvernance", "KOSAI"],
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
