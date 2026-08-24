import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const DEPLOY_HOOK_SECRET = Deno.env.get('DEPLOY_HOOK_SECRET');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ ok: false, error: 'Method not allowed. Use POST.' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  // Auth check — skip if secret not yet configured (graceful dev mode)
  if (DEPLOY_HOOK_SECRET) {
    const authHeader = req.headers.get('Authorization') || '';
    const expected = `Bearer ${DEPLOY_HOOK_SECRET}`;
    if (authHeader !== expected) {
      console.warn('[kos-deploy-hook] Unauthorized request — bad or missing secret');
      return new Response(
        JSON.stringify({ ok: false, error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } else {
    console.warn('[kos-deploy-hook] No DEPLOY_HOOK_SECRET set — accepting all requests (insecure). Set it in Supabase Secrets.');
  }

  try {
    let body: Record<string, unknown> | null = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    const isProduction =
      body?.deployment?.target === 'production' ||
      body?.deployment?.context === 'production' ||
      body?.deploy?.context === 'production' ||
      body?.status === 'ready' ||
      body?.type === 'deploy-succeeded';

    if (!isProduction) {
      console.log('[kos-deploy-hook] Skipped — not a production deployment');
      return new Response(
        JSON.stringify({ ok: true, triggered: false, reason: 'not_production', payload: body }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('[kos-deploy-hook] Production deploy detected — triggering kos-force-index');

    // Call kos-force-index internally with service_role
    const forceIndexUrl = `${SUPABASE_URL}/functions/v1/kos-force-index`;
    const indexRes = await fetch(forceIndexUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const indexText = await indexRes.text();
    console.log(`[kos-deploy-hook] kos-force-index responded: ${indexRes.status} — ${indexText.substring(0, 300)}`);

    // Also ping Google/Bing sitemaps directly as a fast signal
    const sitemaps = [
      'https://khepraexperts.com/sitemapindex.xml',
      'https://khepraexperts.com/sitemap.xml',
    ];
    const pingResults = await Promise.allSettled(
      sitemaps.flatMap(sm => [
        fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sm)}`),
        fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sm)}`),
      ])
    );
    const pingsOk = pingResults.filter(r => r.status === 'fulfilled').length;

    return new Response(
      JSON.stringify({
        ok: true,
        triggered: true,
        forceIndexStatus: indexRes.status,
        pingsSent: pingsOk,
        totalPings: pingResults.length,
        timestamp: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[kos-deploy-hook] Error:', error);
    return new Response(
      JSON.stringify({ ok: false, error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});