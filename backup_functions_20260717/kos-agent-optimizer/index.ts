import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ═══════════════════════════════════════════════════════════════════════════
// KOS AGENT OPTIMIZER — Auto-optimisation 4 Agents
// ═══════════════════════════════════════════════════════════════════════════

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const startTime = Date.now();

  try {
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "");
    const results: Record<string, any> = {};
    const actions: string[] = [];

    // 1. Agent Trend
    try {
      const { data: topics } = await supabase.from("khepra_topics").select("id, score").gte("score", 80).gte("created_at", new Date(Date.now() - 86400000).toISOString());
      const count = topics?.length || 0;
      results.trend_engine = { high_score_topics_24h: count, threshold: 5 };
      actions.push(count < 5 ? `Trend: ${count} topics >80 — elargir sources` : `Trend: ${count} topics — OK`);
    } catch (e) { results.trend_engine = { error: String(e) }; }

    // 2. Agent Redaction
    try {
      const { data: stats } = await supabase.from("khepra_stats").select("ctr").gte("updated_at", new Date(Date.now() - 604800000).toISOString());
      const ctrs = (stats || []).map((s: any) => typeof s.ctr === 'number' ? s.ctr : 0).filter((c: number) => c > 0);
      const avgCtr = ctrs.length > 0 ? ctrs.reduce((a: number, b: number) => a + b, 0) / ctrs.length : 0;
      results.redaction = { avg_ctr_7d: Math.round(avgCtr * 10000) / 100, samples: ctrs.length, threshold: 0.03 };
      actions.push(avgCtr < 0.03 && ctrs.length > 0 ? `Redaction: CTR ${Math.round(avgCtr * 10000) / 100}% <3% — changer prompt` : ctrs.length === 0 ? "Redaction: Pas assez de donnees" : `Redaction: CTR ${Math.round(avgCtr * 10000) / 100}% — OK`);
    } catch (e) { results.redaction = { error: String(e) }; }

    // 3. Agent Traduction
    try {
      const { data: contents } = await supabase.from("khepra_contents").select("locale, status").not("status", "eq", "draft");
      const total = contents?.length || 0;
      const localLocales = ['wo', 'ee', 'ln', 'ha', 'bm', 'dy', 'sg', 'ff', 'yo', 'am'];
      const local = (contents || []).filter((c: any) => localLocales.includes(c.locale)).length;
      const pct = total > 0 ? (local / total) * 100 : 0;
      results.translation = { total, local, local_pct: Math.round(pct), threshold: 20 };
      actions.push(pct < 20 && total > 0 ? `Traduction: ${Math.round(pct)}% locales <20% — ajouter proverbes` : total === 0 ? "Traduction: Aucun contenu — lancer pipeline" : `Traduction: ${Math.round(pct)}% locales — OK`);
    } catch (e) { results.translation = { error: String(e) }; }

    // 4. Agent Publication
    try {
      const { data: logs } = await supabase.from("logs_health").select("service, status").eq("service", "YouTube OAuth").eq("status", "error").gte("timestamp", new Date(Date.now() - 3600000).toISOString());
      const errors = logs?.length || 0;
      results.publisher = { oauth_errors_1h: errors };
      if (errors > 0) {
        actions.push(`Publication: ${errors} erreurs OAuth — rotation compte`);
        try {
          await supabase.from("yt_tokens").update({ active: false }).eq("active", true);
          const { data: backup } = await supabase.from("yt_tokens").select("id").eq("active", false).limit(1);
          if (backup?.length) { await supabase.from("yt_tokens").update({ active: true }).eq("id", backup[0].id); results.publisher.rotated = true; }
        } catch { /* non-blocking */ }
      } else { actions.push("Publication: 0 erreur — OK"); }
    } catch (e) { results.publisher = { error: String(e) }; }

    const totalLatency = Date.now() - startTime;
    const needsOptimization = actions.some(a => a.includes("elargir") || a.includes("changer") || a.includes("ajouter") || a.includes("rotation"));

    try {
      await supabase.from("logs_health").insert({ service: "Agent Optimizer", status: needsOptimization ? "healed" : "ok", message: actions.join(" | "), timestamp: new Date().toISOString() });
    } catch { /* non-blocking */ }

    return new Response(JSON.stringify({
      status: needsOptimization ? "optimized" : "nominal", agents: results, actions,
      recommendations: actions.filter(a => a.includes("elargir") || a.includes("changer") || a.includes("ajouter") || a.includes("rotation")),
      latency_ms: totalLatency,
      pipeline: "KOS Agent Optimizer → 4 Agents → Auto-healing",
    }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: errorMessage, latency_ms: Date.now() - startTime }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});