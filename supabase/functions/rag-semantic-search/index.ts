import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const AUTOMATON_URL = "https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-automaton-engine";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { query, domaine, limit = 5 } = await req.json();

    if (!query) {
      return new Response(
        JSON.stringify({ error: "Paramètre query requis" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ─── KOS AUTOMATON (100% autonome, zéro API externe) ───
    try {
      const autoResp = await fetch(AUTOMATON_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operation: "semantic_search",
          query,
          domaine,
          limit,
        }),
      });
      const autoData = await autoResp.json();

      if (autoData.success) {
        return new Response(JSON.stringify({
          results: autoData.results || [],
          query,
          method: "tfidf_cosine",
          engine: "kos-automaton",
          total_documents: autoData.total_documents || 0,
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    } catch {
      // L'Automaton est tombé ? Fallback text search direct
    }

    // ─── Fallback text search ───
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );
    const { data: fallbackData } = await supabaseClient
      .from("rag_documents")
      .select("id, titre, domaine, sous_domaine, pays, organisation, statut, description, mots_cles, type_document")
      .or(`titre.ilike.%${query}%,description.ilike.%${query}%`)
      .eq("est_public", true)
      .order("ordre_affichage", { ascending: true, nullsFirst: false })
      .limit(limit);

    return new Response(JSON.stringify({
      results: fallbackData || [],
      query,
      method: "text_fallback",
      engine: "kos-automaton-fallback",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Erreur interne", details: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
