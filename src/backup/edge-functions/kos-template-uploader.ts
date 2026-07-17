/**
 * KOS TEMPLATE UPLOADER™ v1.0 — BACKUP SOURCE
 * Upload templates HTML dans Storage R2
 * Route Cloudflare: POST /api/kos/template-uploader
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, template_name, template_type } = await req.json();

    if (action === 'upload') {
      await supabase.from('templates').insert({ name: template_name, type: template_type, uploaded_at: new Date().toISOString() });
      return new Response(JSON.stringify({ success: true, message: 'Template registered' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'list') {
      const { data } = await supabase.from('templates').select('*').order('uploaded_at', { ascending: false }).limit(50);
      return new Response(JSON.stringify({ success: true, templates: data || [] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});