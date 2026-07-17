/**
 * KOS OG ENGINE™ v1.0 — BACKUP SOURCE
 * Social Preview + Image Proxy v4
 * Route Cloudflare: POST /api/kos/og-engine
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action, title, description, image_url, url } = await req.json();

    if (action === 'generate_preview') {
      const ogData = { 'og:title': title || 'KHEPRA EXPERTS', 'og:description': description || 'Intelligence Reglementaire Africaine', 'og:image': image_url || 'https://khepraexperts.com/images/og-default.jpg', 'og:url': url || 'https://khepraexperts.com', 'og:type': 'website', 'twitter:card': 'summary_large_image' };
      return new Response(JSON.stringify({ success: true, og_data: ogData }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});