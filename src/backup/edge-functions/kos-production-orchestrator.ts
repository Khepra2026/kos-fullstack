/**
 * ═══════════════════════════════════════════════════════════════
 * KOS PRODUCTION ORCHESTRATOR™ v1.0 — BACKUP SOURCE
 * Pipeline Chain — Orchestration des déploiements production
 * ═══════════════════════════════════════════════════════════════
 * Chaîne de production complète :
 * Crawl → Enrich → Validate → Publish → Monitor
 * ⚠️ Backup — Déploiement bloqué par limite plan Supabase
 * ═══════════════════════════════════════════════════════════════
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

const PIPELINE_STAGES = ['crawl', 'enrich', 'validate', 'quality_review', 'publish', 'monitor'] as const;

async function executeStage(supabase: any, stage: string, payload: any) {
  const stageFunctions: Record<string, string> = {
    crawl: 'kos-compliance-daily-crawler',
    enrich: 'kos-ai-translate',
    validate: 'kos-regulatory-quality-assurance',
    quality_review: 'kos-bigfour-quality-review',
    publish: 'kos-publication-scheduler',
    monitor: 'kos-site-health-check',
  };

  const fnName = stageFunctions[stage];
  if (!fnName) throw new Error(`Unknown stage: ${stage}`);

  const { data, error } = await supabase.functions.invoke(fnName, { body: payload });
  if (error) throw new Error(error.message);
  return data;
}

async function runPipeline(supabase: any, pipelineId: string, startStage: number = 0) {
  const results: Array<{ stage: string; success: boolean; data?: any; error?: string; duration_ms: number }> = [];
  
  for (let i = startStage; i < PIPELINE_STAGES.length; i++) {
    const stage = PIPELINE_STAGES[i];
    const start = Date.now();
    try {
      const data = await executeStage(supabase, stage, { pipeline_id: pipelineId, stage });
      results.push({ stage, success: true, data, duration_ms: Date.now() - start });
    } catch (err) {
      results.push({ stage, success: false, error: (err as Error).message, duration_ms: Date.now() - start });
      // Log failure and stop pipeline if critical stage fails
      if (['crawl', 'validate'].includes(stage)) break;
    }
  }

  // Log pipeline execution
  await supabase.from('kos_universal_audit_log').insert({
    event_type: 'production_pipeline',
    entity_type: 'pipeline',
    entity_id: pipelineId,
    action: 'PIPELINE_COMPLETED',
    actor: 'kos-production-orchestrator',
    new_state: { stages: results, total_stages: results.length },
    correlation_id: pipelineId,
  });

  return { pipeline_id: pipelineId, results, completed_stages: results.filter(r => r.success).length, total_stages: PIPELINE_STAGES.length };
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const body = await req.json();
    const { action, pipeline_id, start_stage } = body;

    if (action === 'run') {
      const result = await runPipeline(supabase, pipeline_id || crypto.randomUUID(), start_stage || 0);
      return new Response(JSON.stringify({ success: true, ...result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (action === 'health') {
      return new Response(JSON.stringify({ success: true, stages: PIPELINE_STAGES, status: 'ready' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid action. Use: run, health' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});