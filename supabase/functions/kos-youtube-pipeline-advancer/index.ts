import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STAGE_ORDER = ["draft", "script_generated", "script_validated", "voice_generated", "video_rendering", "ready", "scheduled", "published"];

function getNextStage(current: string): string | null {
  const idx = STAGE_ORDER.indexOf(current);
  if (idx === -1 || idx >= STAGE_ORDER.length - 1) return null;
  return STAGE_ORDER[idx + 1];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });

    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "advance_all";
    const dryRun = url.searchParams.get("dry_run") === "true";

    if (action === "status" && req.method === "GET") {
      const { data: stuck } = await supabase.from("kos_youtube_content_pipeline").select("id, content_title, stage, updated_at").not("stage", "in", "('published','failed')").order("updated_at", { ascending: false });

      const stages: Record<string, number> = {};
      stuck?.forEach((v: any) => { stages[v.stage] = (stages[v.stage] || 0) + 1; });

      return new Response(JSON.stringify({ total_stuck: stuck?.length || 0, by_stage: stages, items: stuck || [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "advance_one" && req.method === "POST") {
      const body = await req.json();
      const pipelineId = body.pipeline_id;
      if (!pipelineId) return new Response(JSON.stringify({ success: false, error: "pipeline_id requis" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });

      const { data: item, error: fetchErr } = await supabase.from("kos_youtube_content_pipeline").select("*").eq("id", pipelineId).maybeSingle();
      if (fetchErr || !item) return new Response(JSON.stringify({ success: false, error: "Pipeline item introuvable" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });

      const nextStage = getNextStage(item.stage);
      if (!nextStage) return new Response(JSON.stringify({ success: false, error: `Stage terminal: ${item.stage}`, current_stage: item.stage }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });

      if (dryRun) {
        return new Response(JSON.stringify({ dry_run: true, pipeline_id: item.id, title: item.content_title, current_stage: item.stage, next_stage: nextStage }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Si on arrive à "ready" ou "scheduled", on peut déclencher la publication
      if (nextStage === "ready" || nextStage === "scheduled") {
        const { error: updateErr } = await supabase.from("kos_youtube_content_pipeline").update({ stage: nextStage, updated_at: new Date().toISOString() }).eq("id", item.id);
        if (updateErr) throw updateErr;
        return new Response(JSON.stringify({ success: true, pipeline_id: item.id, title: item.content_title, from: item.stage, to: nextStage, note: "Prêt pour publication — le CRON kos-publish-youtube-cron s'en chargera" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      // Pour les autres stages, on avance simplement
      const { error: updateErr } = await supabase.from("kos_youtube_content_pipeline").update({ stage: nextStage, updated_at: new Date().toISOString() }).eq("id", item.id);
      if (updateErr) throw updateErr;

      return new Response(JSON.stringify({ success: true, pipeline_id: item.id, title: item.content_title, from: item.stage, to: nextStage }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (action === "advance_all" && req.method === "POST") {
      const { data: stuck } = await supabase.from("kos_youtube_content_pipeline").select("id, content_title, stage").not("stage", "in", "('published','failed')").order("updated_at");

      if (!stuck?.length) {
        return new Response(JSON.stringify({ success: true, advanced: 0, message: "Aucune vidéo bloquée" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (dryRun) {
        const plan = stuck.map((v: any) => ({ id: v.id, title: v.content_title, from: v.stage, to: getNextStage(v.stage) }));
        return new Response(JSON.stringify({ dry_run: true, count: stuck.length, plan }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      const results: any[] = [];
      for (const item of stuck) {
        const nextStage = getNextStage(item.stage);
        if (!nextStage) {
          results.push({ pipeline_id: item.id, title: item.content_title, from: item.stage, to: null, status: "terminal" });
          continue;
        }

        const { error: updErr } = await supabase.from("kos_youtube_content_pipeline").update({ stage: nextStage, updated_at: new Date().toISOString() }).eq("id", item.id);
        results.push({ pipeline_id: item.id, title: item.content_title, from: item.stage, to: nextStage, status: updErr ? "failed" : "advanced", error: updErr?.message });
      }

      return new Response(JSON.stringify({ success: true, advanced: results.filter((r) => r.status === "advanced").length, total: results.length, results }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ success: false, error: "Action inconnue" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[YT-ADVANCER]", err);
    return new Response(JSON.stringify({ success: false, error: err instanceof Error ? err.message : "Erreur interne" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
