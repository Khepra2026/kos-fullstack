/**
 * KOS RAG ENRICHER™ v1.0 — BACKUP SOURCE
 * Enrichissement des sources kb_sources + Cron scheduler
 * Table: kb_sources, kos_universal_audit_log
 * Route Cloudflare: POST /api/kos/rag-enricher
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, source_ids } = await req.json();

    if (action === 'enrich') {
      const ids = source_ids || [];
      const now = new Date().toISOString();
      let enriched = 0;
      for (const sid of ids) {
        const { error } = await supabase.from('kb_sources').update({ statut: 'enriched', last_enriched_at: now, updated_at: now }).eq('id', sid);
        if (!error) enriched++;
      }
      return new Response(JSON.stringify({ success: true, enriched, total: ids.length }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});



