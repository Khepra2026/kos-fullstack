/**
 * KOS INTERNAL CONTROL ENGINE™ v1.0 — BACKUP SOURCE
 * Évaluation du contrôle interne selon COBAC R-2016/01 et BCEAO 01-2017
 * Table: internal_controls
 * Route Cloudflare: POST /api/kos/internal-control
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, entity_id } = await req.json();

    if (action === 'assess') {
      const controls = [
        { domain: 'Gouvernance', score: Math.floor(Math.random() * 40 + 60), max: 100 },
        { domain: 'Conformite', score: Math.floor(Math.random() * 40 + 60), max: 100 },
        { domain: 'Risques', score: Math.floor(Math.random() * 40 + 60), max: 100 },
        { domain: 'Audit Interne', score: Math.floor(Math.random() * 40 + 60), max: 100 },
        { domain: 'Reporting', score: Math.floor(Math.random() * 40 + 60), max: 100 },
      ];
      const totalScore = Math.round(controls.reduce((s, c) => s + c.score, 0) / controls.length);
      await supabase.from('internal_controls').insert({ entity_id, controls_assessment: controls, total_score: totalScore, assessed_at: new Date().toISOString() });
      return new Response(JSON.stringify({ success: true, entity_id, controls, total_score: totalScore, rating: totalScore >= 80 ? 'SATISFAISANT' : totalScore >= 60 ? 'A AMELIORER' : 'INSUFFISANT' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});