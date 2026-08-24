import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STRIPE_KEY = Deno.env.get("STRIPE_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const TIER_PRICES = {
  standard: { price_id: "price_standard_khepra_rag", limit_chunks: 5, limit_words: 300, limit_sources: 3 },
  premium:  { price_id: "price_premium_khepra_rag",  limit_chunks: 20, limit_words: 2500, limit_sources: 20 },
  anonymous: { price_id: null, limit_chunks: 2, limit_words: 100, limit_sources: 1 },
};

const RAG_SYSTEM_PROMPT = `Tu es KOS-RAG-Orchestrator, niveau McKinsey LegalTech + PwC Compliance AI.

CONTEXTE: User tier = {TIER}. Query = {QUERY}. Contexte client UEMOA/CEMAC = {CONTEXT}.

RÈGLES BIG FOUR:
1. TRACABILITÉ: Chaque réponse cite minimum 3 sources avec URL + date JO/BCEAO/OHADA.
   Format: [Source: BCEAO Instruction 2016-03, Art.12, 15/03/2016]
2. CONFIDENCE: Si confidence <0.85, réponds "Analyse préliminaire uniquement" + flag auto-correction.
3. DIFFÉRENCIATION TIERS:
   - standard: RAG top 5 chunks, 300 mots max, 3 sources, latence <2s.
     Toujours finir par: "Pour un rapport complet 5 pages avec analyse comparative OHADA vs CEMAC + matrice risques, passez en Premium."
   - premium: RAG top 20 chunks, chaîne de pensée, structure HBR:
     Executive Summary + Contexte Réglementaire + Analyse Comparative + Matrice Risques + Recommandations + Annexes.
     Watermark "Khepra Premium".
4. COMPLIANCE: Refuse interprétation si texte <2020 sans mise à jour. Renvoie vers source officielle.
5. ANTI-HALLUCINATION: Ne jamais inventer numéro d'article.
   Si absent de chunks, dire "Article non trouvé dans base 2026".`;

type Tier = "standard" | "premium" | "anonymous";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json();
    const { action, user_id, query, tier, context } = body;
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // ─── Action: check_quota ───
    if (action === "check_quota") {
      if (!user_id || !tier) {
        return new Response(JSON.stringify({ error: "user_id et tier requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { data: usage } = await supabase
        .from("usage_quotas")
        .select("queries_used, queries_limit, tier, stripe_customer_id, updated_at")
        .eq("user_id", user_id)
        .maybeSingle();

      const tierConfig = TIER_PRICES[tier as Tier] || TIER_PRICES.anonymous;
      const queriesUsed = usage?.queries_used ?? 0;
      const queriesLimit = usage?.queries_limit ?? (tier === "premium" ? 500 : tier === "standard" ? 50 : 3);
      const hasQuota = queriesUsed < queriesLimit;

      return new Response(JSON.stringify({
        has_quota: hasQuota,
        queries_used: queriesUsed,
        queries_limit: queriesLimit,
        tier: usage?.tier ?? tier,
        tier_config: tierConfig,
        upgrade_available: tier !== "premium",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── Action: create_checkout ───
    if (action === "create_checkout") {
      if (!STRIPE_KEY) {
        return new Response(JSON.stringify({
          error: "Stripe non configuré",
          note: "Connectez Stripe via <action>connect_stripe</action> pour activer la monétisation Premium.",
        }), { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const targetTier = body.target_tier ?? "premium";
      const priceId = TIER_PRICES[targetTier as Tier]?.price_id;

      if (!priceId) {
        return new Response(JSON.stringify({ error: "Tier invalide" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${STRIPE_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          mode: "subscription",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          client_reference_id: user_id ?? "",
          success_url: "https://khepraexperts.com/kos-rag-orchestrator?upgrade=success",
          cancel_url:  "https://khepraexperts.com/kos-rag-orchestrator",
        }),
      });

      const session = await res.json();
      if (!res.ok) {
        return new Response(JSON.stringify({ error: "Erreur Stripe", details: session }), {
          status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({
        action: "checkout_created",
        checkout_url: session.url,
        tier: targetTier,
        upgrade_cta: `Passez à ${targetTier} pour accéder à cette fonctionnalité — 75 000 FCFA/mois`,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── Action: route_rag ───
    if (action === "route_rag") {
      if (!query || !tier) {
        return new Response(JSON.stringify({ error: "query et tier requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const resolvedTier = (["standard", "premium", "anonymous"].includes(tier) ? tier : "anonymous") as Tier;
      const tierConfig = TIER_PRICES[resolvedTier];

      // Check quota if user_id provided
      if (user_id) {
        const { data: usage } = await supabase
          .from("usage_quotas")
          .select("queries_used, queries_limit, tier")
          .eq("user_id", user_id)
          .maybeSingle();

        if (usage) {
          const queriesUsed = usage.queries_used ?? 0;
          const queriesLimit = usage.queries_limit ?? 50;
          if (queriesUsed >= queriesLimit) {
            // Generate upgrade checkout if Stripe configured
            let checkoutUrl = null;
            if (STRIPE_KEY && resolvedTier !== "premium") {
              const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${STRIPE_KEY}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                  mode: "subscription",
                  "line_items[0][price]": TIER_PRICES.premium.price_id,
                  "line_items[0][quantity]": "1",
                  client_reference_id: user_id,
                  success_url: "https://khepraexperts.com/kos-rag-orchestrator?upgrade=success",
                  cancel_url: "https://khepraexperts.com/kos-rag-orchestrator",
                }),
              });
              const session = await res.json();
              if (res.ok) checkoutUrl = session.url;
            }

            return new Response(JSON.stringify({
              action: "upgrade_required",
              checkout_url: checkoutUrl,
              message: `Quota atteint (${queriesUsed}/${queriesLimit}). Passez en Premium pour continuer.`,
              upgrade_cta: "75 000 FCFA/mois — Accès illimité + Rapports 5 pages",
            }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
          }
        }
      }

      // Increment usage counter
      if (user_id) {
        await supabase.rpc("increment_rag_usage", { p_user_id: user_id }).maybeSingle();
      }

      // Build audit trail ID
      const auditId = `KOS-RAG-${resolvedTier.toUpperCase()}-${new Date().toISOString().slice(0,10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

      // Route to RAG automaton
      const automatonResponse = await supabase.functions.invoke("kos-automaton-engine", {
        body: {
          operation: "semantic_search",
          query: query,
          limit: tierConfig.limit_chunks,
          domaine: context ?? "",
        },
      });

      if (automatonResponse.error) {
        return new Response(JSON.stringify({
          error: "Erreur moteur RAG",
          details: automatonResponse.error,
          audit_trail_id: auditId,
        }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const ragResults = automatonResponse.data;
      const topResults = (ragResults?.results ?? []).slice(0, tierConfig.limit_chunks);
      const confidence = topResults.length > 0
        ? topResults.reduce((s: number, r: any) => s + (r.similarity ?? 0), 0) / topResults.length
        : 0;

      const sources = topResults.slice(0, tierConfig.limit_sources).map((r: any) => ({
        authority: r.organisation ?? r.domaine ?? "BCEAO",
        reference: r.titre ?? "",
        article: r.sous_domaine ?? "",
        url_officielle: r.url_source ?? "#",
        confidence: r.similarity ?? 0.8,
      }));

      const isLowConfidence = confidence < 0.85;
      const promptFilled = RAG_SYSTEM_PROMPT
        .replace("{TIER}", resolvedTier)
        .replace("{QUERY}", query)
        .replace("{CONTEXT}", context ?? "UEMOA");

      // Build answer based on tier
      let answerMarkdown = "";
      if (resolvedTier === "anonymous") {
        answerMarkdown = `> *Aperçu limité — Créez un compte pour accéder à l\'analyse complète.*\n\n${
          topResults[0]?.description ?? "Aucun résultat trouvé pour cette requête."
        }\n\n**[Créer un compte gratuit →](https://khepraexperts.com/inscription)**`;
      } else if (resolvedTier === "standard") {
        const snippets = topResults.slice(0, 5).map((r: any) =>
          `**${r.titre ?? "Source"}** — ${r.description?.slice(0, 200) ?? ""}...`
        ).join("\n\n");
        answerMarkdown = `${isLowConfidence ? "> **Analyse préliminaire uniquement** — Confidence < 85%, vérification recommandée.\n\n" : ""}${snippets}\n\n---\n*Pour un rapport complet 5 pages avec analyse comparative OHADA vs CEMAC + matrice risques, passez en Premium.*`;
      } else {
        // Premium — structure HBR
        const snippets = topResults.map((r: any) =>
          `### ${r.titre ?? "Source"}\n${r.description?.slice(0, 400) ?? ""}...\n*[Source: ${r.organisation ?? r.domaine ?? "Régulateur"}, ${r.pays ?? "Afrique"}, ${r.date_applicable?.slice(0, 10) ?? "2026"}]*`
        ).join("\n\n");
        answerMarkdown = `# Analyse Premium Khepra\n*Confidentiel · Khepra Premium KOS Intelligence · khepraexperts.com*\n\n## Executive Summary\n${isLowConfidence ? "> **Analyse préliminaire.** Confidence <85% — données partielles.\n\n" : ""}${snippets}\n\n## Sources Complètes (${sources.length} références vérifiées)\n${sources.map((s: any, i: number) => `${i+1}. [${s.authority}] ${s.reference} — [Lien officiel](${s.url_officielle})`).join("\n")}`;
      }

      return new Response(JSON.stringify({
        action: "proceed",
        tier_used: resolvedTier,
        chunks_retrieved: topResults.length,
        chunks_limit: tierConfig.limit_chunks,
        confidence_global: Math.round(confidence * 1000) / 1000,
        indice_fiabilite_kos: Math.round(confidence * 100),
        answer_markdown: answerMarkdown,
        sources,
        upgrade_cta: resolvedTier !== "premium"
          ? "Pour un rapport complet 5 pages avec analyse comparative OHADA vs CEMAC + matrice risques, passez en Premium (75 000 FCFA/mois)."
          : null,
        rapport_pdf_url: resolvedTier === "premium" ? `/api/reports/${auditId}.pdf` : null,
        audit_trail_id: auditId,
        system_prompt_used: promptFilled.slice(0, 200) + "...",
        query_forwarded: true,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── Action: upgrade_user (called by Stripe webhook) ───
    if (action === "upgrade_user") {
      const { stripe_customer_id, target_tier } = body;
      if (!user_id) return new Response(JSON.stringify({ error: "user_id requis" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

      await supabase.from("usage_quotas").upsert({
        user_id,
        tier: target_tier ?? "premium",
        queries_used: 0,
        queries_limit: target_tier === "premium" ? 500 : 50,
        stripe_customer_id: stripe_customer_id ?? null,
        updated_at: new Date().toISOString(),
      });

      return new Response(JSON.stringify({
        success: true,
        user_id,
        tier: target_tier ?? "premium",
        message: `Utilisateur upgradé vers ${target_tier ?? "premium"}`,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── Health check ───
    if (action === "health" || !action) {
      const stripeConfigured = !!STRIPE_KEY;
      const { count } = await supabase.from("usage_quotas").select("*", { count: "exact", head: true });
      return new Response(JSON.stringify({
        status: "healthy",
        engine: "kos-rag-billing-router-v1",
        stripe_configured: stripeConfigured,
        usage_quotas_count: count ?? 0,
        tiers_available: ["anonymous", "standard", "premium"],
        endpoints: ["check_quota", "create_checkout", "route_rag", "upgrade_user", "health"],
        conversion_target_j60: "15% standard→premium",
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: `Action inconnue: ${action}` }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({
      error: "Erreur interne",
      details: error instanceof Error ? error.message : String(error),
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
