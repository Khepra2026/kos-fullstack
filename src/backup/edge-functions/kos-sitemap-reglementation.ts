/**
 * KOS SITEMAP REGLEMENTATION™ v1.0 — BACKUP SOURCE
 * Génération XML dynamique 1000 pages GEO
 * Route Cloudflare: POST /api/kos/sitemap-reglementation
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS' };

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '');
    const { action } = await req.json();

    if (action === 'generate') {
      const { data: pages } = await supabase.from('kb_sources').select('slug, jurisdiction, sector, updated_at').eq('statut', 'published').limit(1000);
      const baseUrl = 'https://khepraexperts.com';
      const urls = (pages || []).map((p: { slug: string; updated_at: string }) => `  <url><loc>${baseUrl}/reglementation/${p.slug}</loc><lastmod>${p.updated_at?.split('T')[0] || '2026-07-12'}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`);
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
      return new Response(sitemap, { headers: { ...corsHeaders, 'Content-Type': 'application/xml' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});



