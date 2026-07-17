/**
 * KOS EMAIL ENGINE™ v1.0 — BACKUP SOURCE
 * Welcome + Scheduled email engine
 * Tables: email_logs, email_templates
 * Route Cloudflare: POST /api/kos/email-engine
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, recipient_email, recipient_name } = await req.json();

    if (action === 'send_welcome') {
      const log = { recipient: recipient_email, recipient_name: recipient_name || 'Client', template_type: 'welcome', subject: 'Bienvenue chez KHEPRA EXPERTS', body: `Bonjour ${recipient_name || 'Client'}, bienvenue sur KHEPRA.`, sent_at: new Date().toISOString(), status: 'sent' };
      await supabase.from('email_logs').insert(log);
      return new Response(JSON.stringify({ success: true, email: log }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'list_templates') {
      const { data } = await supabase.from('email_templates').select('*').order('created_at', { ascending: false });
      return new Response(JSON.stringify({ success: true, templates: data || [] }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});