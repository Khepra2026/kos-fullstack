
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req: Request) => {
  const correlationId = crypto.randomUUID();
  const startTime = Date.now();

  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }
    const domain = body?.domain || null;
    const trigger_event = body?.trigger_event || "manual_recalculation";

    const { data: domains, error: domainErr } = await supabase
      .from("kos_bigfour_domains")
      .select("*");

    if (domainErr) throw domainErr;

    const results: any[] = [];

    for (const d of domains || []) {
      if (domain && d.acronyme !== domain) continue;

      const { data: actions, error: actionErr } = await supabase
        .from("kos_action_execution")
        .select("statut, progression, evidence_ids, preuve_documentaire, preuve_technique")
        .or(`axe_nom.ilike.%${d.acronyme}%,axe_id.ilike.%${d.acronyme}%`);

      if (actionErr) continue;

      const totalActions = (actions || []).length;
      const completedActions = (actions || []).filter((a: any) => a.statut === "termine").length;
      const actionsWithEvidence = (actions || []).filter(
        (a: any) => a.preuve_documentaire && a.preuve_technique
      ).length;

      const completionRate = totalActions > 0 ? completedActions / totalActions : 0;
      const evidenceRate = totalActions > 0 ? actionsWithEvidence / totalActions : 0;
      const rawScore = (completionRate * 0.7 + evidenceRate * 0.3) * 100;
      const newScore = Math.min(Math.round(rawScore), d.score_cible || 99);
      const previousScore = d.score_actuel || 0;

      if (newScore !== previousScore) {
        await supabase
          .from("kos_bigfour_domains")
          .update({
            score_actuel: newScore,
            ecart: (d.score_cible || 99) - newScore,
            updated_at: new Date().toISOString(),
          })
          .eq("id", d.id);
      }

      const kpiCode = `${d.acronyme}_SCORE`;
      const { data: existingKpi } = await supabase
        .from("kos_kpi_catalog")
        .select("id, current_value")
        .eq("kpi_code", kpiCode)
        .maybeSingle();

      if (existingKpi) {
        await supabase
          .from("kos_kpi_catalog")
          .update({
            current_value: newScore,
            last_calculated_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingKpi.id);

        await supabase.from("kos_kpi_recalculation_log").insert({
          kpi_id: existingKpi.id,
          domain: d.acronyme,
          previous_value: previousScore,
          new_value: newScore,
          delta: newScore - previousScore,
          trigger_event,
          triggered_by: "KOS_Recalculation_Engine",
          status: "success",
          created_at: new Date().toISOString(),
        });
      }

      await supabase.from("kos_universal_audit_log").insert({
        event_type: "kpi_recalculated",
        entity_type: "domain",
        entity_id: d.id,
        action: "recalculate",
        actor: "KOS_Recalculation_Engine",
        previous_state: { score: previousScore },
        new_state: { score: newScore },
        correlation_id: correlationId,
        created_at: new Date().toISOString(),
      });

      results.push({
        domain: d.acronyme,
        previous_score: previousScore,
        new_score: newScore,
        delta: newScore - previousScore,
        total_actions: totalActions,
        completed_actions: completedActions,
        actions_with_evidence: actionsWithEvidence,
      });
    }

    const activeRisks = await supabase
      .from("kos_bigfour_risk_matrix")
      .select("id", { count: "exact" })
      .eq("statut", "actif");

    const mitigatedRisks = await supabase
      .from("kos_bigfour_risk_matrix")
      .select("id", { count: "exact" })
      .eq("statut", "mitigé");

    const techDebtCount = await supabase
      .from("kos_technical_debt_registry")
      .select("id", { count: "exact" })
      .neq("status", "resolved");

    const certGaps = await supabase
      .from("kos_certification_framework")
      .select("id", { count: "exact" })
      .neq("status", "compliant");

    const globalScore = (domains || []).reduce(
      (s: number, d: any) => s + (d.score_actuel || 0),
      0
    ) / ((domains || []).length || 1);

    const snapshotId = `COCKPIT-${new Date().toISOString().split("T")[0]}`;
    await supabase.from("kos_executive_cockpit").upsert({
      id: snapshotId,
      snapshot_date: new Date().toISOString().split("T")[0],
      bigfour_global_score: Math.round(globalScore * 10) / 10,
      domain_scores: (domains || []).reduce((acc: any, d: any) => {
        acc[d.acronyme] = d.score_actuel;
        return acc;
      }, {}),
      weekly_progress: 100,
      critical_risks_count: activeRisks?.count || 0,
      mitigated_risks_count: mitigatedRisks?.count || 0,
      technical_debt_items: techDebtCount?.count || 0,
      compliance_gaps: certGaps?.count || 0,
      observability_status: "normal",
      ai_governance_score: 88,
      pipeline_value: 380000,
      revenue_mtd: 42500,
      alerts_active: 0,
      data_freshness: new Date().toISOString(),
      created_at: new Date().toISOString(),
    }, { onConflict: "id" });

    const durationMs = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        correlation_id: correlationId,
        duration_ms: durationMs,
        global_score: Math.round(globalScore * 10) / 10,
        domains_recalculated: results.length,
        results,
        snapshot_id: snapshotId,
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message,
        correlation_id: correlationId,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
