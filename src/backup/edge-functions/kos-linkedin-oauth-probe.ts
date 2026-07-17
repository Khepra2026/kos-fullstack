/**
 * KOS LINKEDIN OAUTH PROBE™ v1.0 — BACKUP SOURCE
 * Sonde de validite des tokens OAuth LinkedIn
 * Table: social_api_tokens
 * Route Cloudflare: POST /api/kos/linkedin-oauth-probe
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action } = await req.json();

    if (action === 'probe') {
      const { data: tokens } = await supabase.from('social_api_tokens').select('*').eq('platform', 'linkedin').order('updated_at', { ascending: false }).limit(5);
      const results = (tokens || []).map((t: { id: string; access_token?: string; expires_at?: string; updated_at?: string }) => ({ token_id: t.id, has_token: !!t.access_token, is_expired: t.expires_at ? new Date(t.expires_at) < new Date() : true, last_updated: t.updated_at }));
      return new Response(JSON.stringify({ success: true, probe_results: results, total: results.length }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});