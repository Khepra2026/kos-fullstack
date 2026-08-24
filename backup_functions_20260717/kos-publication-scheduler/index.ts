// ═══ KOS PUBLICATION SCHEDULER — Automatisation Publications Programmées ═══
// Orchestrateur de publication automatique des articles thématiques
// Lit kos_publications (status = 'scheduled'), publie selon planning éditorial
// Exclut les réseaux sociaux (en attente de validation)

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "status";

    // ─── STATUS ───
    if (action === "status") {
      const { data: scheduled, error: sErr } = await supabase
        .from("kos_publications")
        .select("id, title, pub_type, publication_date, status")
        .eq("status", "scheduled")
        .order("publication_date", { ascending: true });

      const { data: published, error: pErr } = await supabase
        .from("kos_publications")
        .select("id, title, pub_type, publication_date")
        .eq("status", "published")
        .order("publication_date", { ascending: false })
        .limit(10);

      return new Response(JSON.stringify({
        service: "KOS Publication Scheduler™",
        version: "1.0.0",
        scheduled: scheduled || [],
        scheduled_count: scheduled?.length || 0,
        recent_published: published || [],
        next_publication: scheduled?.[0] || null,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── SCHEDULE — Planifie les articles pour publication ───
    if (action === "schedule") {
      const body = await req.json();
      const { article_ids, start_date, interval_days } = body;

      if (!article_ids || !Array.isArray(article_ids)) {
        return new Response(JSON.stringify({ error: "article_ids (array) requis" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const baseDate = start_date ? new Date(start_date) : new Date();
      const interval = interval_days || 2; // 1 article tous les 2 jours par défaut

      const results = [];
      for (let i = 0; i < article_ids.length; i++) {
        const pubDate = new Date(baseDate);
        pubDate.setDate(pubDate.getDate() + i * interval);

        const { data, error } = await supabase
          .from("kos_publications")
          .update({
            status: "scheduled",
            publication_date: pubDate.toISOString().split("T")[0],
          })
          .eq("id", article_ids[i])
          .select("id, title, publication_date");

        results.push({ id: article_ids[i], date: pubDate.toISOString().split("T")[0], success: !error, error: error?.message });
      }

      return new Response(JSON.stringify({
        scheduled: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── PUBLISH — Publie les articles dont la date est atteinte ───
    if (action === "publish") {
      const today = new Date().toISOString().split("T")[0];

      const { data: toPublish, error: fErr } = await supabase
        .from("kos_publications")
        .select("id, title, pub_type, slug, publication_date, keywords")
        .eq("status", "scheduled")
        .lte("publication_date", today)
        .order("publication_date", { ascending: true });

      if (fErr || !toPublish?.length) {
        return new Response(JSON.stringify({
          published: 0,
          message: "Aucun article à publier aujourd'hui",
          next_check: new Date(Date.now() + 86400000).toISOString(),
        }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const results = [];
      for (const article of toPublish) {
        const { error } = await supabase
          .from("kos_publications")
          .update({ status: "published", updated_at: new Date().toISOString() })
          .eq("id", article.id);

        results.push({
          id: article.id,
          title: article.title,
          type: article.pub_type,
          slug: article.slug,
          published: !error,
          error: error?.message,
        });
      }

      // Log dans l'audit trail
      await supabase.from("kos_audit_trail").insert({
        action: "publication_batch_published",
        actor_id: "system",
        metadata: { count: results.filter(r => r.published).length, articles: results.map(r => r.title) },
        timestamp: new Date().toISOString(),
      });

      return new Response(JSON.stringify({
        published: results.filter(r => r.published).length,
        total: results.length,
        results,
        timestamp: new Date().toISOString(),
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // ─── AUTO-SCHEDULE — Planifie automatiquement tous les articles 'draft' ───
    if (action === "auto-schedule") {
      const { data: drafts, error } = await supabase
        .from("kos_publications")
        .select("id, title, pub_type, keywords")
        .eq("status", "draft")
        .order("created_at", { ascending: true })
        .limit(60);

      if (!drafts?.length) {
        return new Response(JSON.stringify({ message: "Aucun brouillon à planifier", count: 0 }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const today = new Date();
      const results = [];
      for (let i = 0; i < drafts.length; i++) {
        const pubDate = new Date(today);
        pubDate.setDate(pubDate.getDate() + (i + 1) * 2);

        await supabase
          .from("kos_publications")
          .update({
            status: "scheduled",
            publication_date: pubDate.toISOString().split("T")[0],
          })
          .eq("id", drafts[i].id);

        results.push({ id: drafts[i].id, title: drafts[i].title, date: pubDate.toISOString().split("T")[0] });
      }

      return new Response(JSON.stringify({
        scheduled: results.length,
        first_date: results[0]?.date,
        last_date: results[results.length - 1]?.date,
        results,
      }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: "Action inconnue", valid_actions: ["status","schedule","publish","auto-schedule"] }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Erreur interne", detail: err instanceof Error ? err.message : String(err) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
