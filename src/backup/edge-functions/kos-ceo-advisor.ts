/**
 * ═══════════════════════════════════════════════════════════════
 * KOS CEO ADVISOR™ v1.0 — BACKUP SOURCE
 * Briefing Strategique pour Due Diligence
 * ═══════════════════════════════════════════════════════════════
 * ⚠️ Backup — Deploiement bloque par limite plan Supabase
 * Route Cloudflare: POST /api/kos/ceo-advisor
 * Table: ceo_advisories
 * ═══════════════════════════════════════════════════════════════
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, deal_id } = await req.json();

    if (action === 'generate_briefing') {
      const { data: deal } = await supabase.from('due_diligence_reports').select('*').eq('id', deal_id).maybeSingle();
      const briefing = {
        deal_id, generated_at: new Date().toISOString(),
        executive_summary: `Analyse strategique KHEPRA - ${deal?.target_name || 'Cible'}`,
        risk_assessment: deal?.alert_triggered ? 'ELEVE' : 'MODERE',
        key_recommendations: ['Validation data room J0-J15', 'Audit AUSCGIE J15-J45', 'Closing J45-J60'],
      };
      await supabase.from('ceo_advisories').insert({ deal_id, briefing, generated_at: briefing.generated_at });
      return new Response(JSON.stringify({ success: true, briefing }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'list') {
      const { data } = await supabase.from('ceo_advisories').select('*').order('generated_at', { ascending: false }).limit(20);
      return new Response(JSON.stringify({ success: true, advisories: data || [] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});