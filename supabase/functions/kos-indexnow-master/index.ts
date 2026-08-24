import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const DEPLOY_HOOK_SECRET = Deno.env.get('DEPLOY_HOOK_SECRET')
const INDEXNOW_KEY = 'e8f9c2d3a4b5f6e7d8c9b0a1f2e3d4c5'
const SITE_URL = 'https://khepraexperts.com'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

const corsHeaders = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' }

function chunkArray<T>(arr: T[], size: number): T[][] { const chunks: T[][] = []; for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size)); return chunks }

async function submitToIndexNow(urls: string[]): Promise<{ submitted: number; failed: number }> {
  const batches = chunkArray(urls, 10000); let submitted = 0, failed = 0
  for (const batch of batches) {
    try {
      const res = await fetch(INDEXNOW_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ host: 'khepraexperts.com', key: INDEXNOW_KEY, keyLocation: `https://khepraexperts.com/${INDEXNOW_KEY}.txt`, urlList: batch }) })
      if (res.ok || res.status === 202) submitted += batch.length; else { failed += batch.length; console.error(`IndexNow batch failed: ${res.status}`) }
    } catch (e) { failed += batch.length; console.error(`IndexNow batch error: ${e}`) }
    if (batches.length > 1) await new Promise(r => setTimeout(r, 1000))
  }
  return { submitted, failed }
}

async function pingGoogleSitemaps(): Promise<{ pinged: number; failed: number }> {
  const sitemaps = [`${SITE_URL}/sitemap.xml`,`${SITE_URL}/sitemap-blog.xml`,`${SITE_URL}/sitemap-news.xml`,`${SITE_URL}/sitemap-reglementation.xml`,`${SITE_URL}/sitemap-conformite.xml`,`${SITE_URL}/sitemap-tags.xml`,`${SITE_URL}/sitemap-pdf.xml`,`${SITE_URL}/sitemapindex.xml`]
  let pinged = 0, failed = 0
  for (const sm of sitemaps) {
    try { const res = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sm)}`); if (res.ok) pinged++; else failed++ } catch { failed++ }
  }
  return { pinged, failed }
}

async function fetchAllSitemapUrls(): Promise<string[]> {
  const sitemaps = [`${SITE_URL}/sitemap.xml`,`${SITE_URL}/sitemap-blog.xml`,`${SITE_URL}/sitemap-news.xml`,`${SITE_URL}/sitemap-reglementation.xml`,`${SITE_URL}/sitemap-conformite.xml`,`${SITE_URL}/sitemap-tags.xml`,`${SITE_URL}/sitemap-pdf.xml`]
  const allUrls: string[] = []
  for (const sm of sitemaps) {
    try { const res = await fetch(sm, { headers: { 'Accept': 'application/xml, text/xml' } }); if (!res.ok) continue; const xml = await res.text(); const locRegex = /<loc>(.*?)<\/loc>/g; let match; while ((match = locRegex.exec(xml)) !== null) allUrls.push(match[1]) } catch (e) { console.error(`Failed to parse ${sm}: ${e}`) }
  }
  return [...new Set(allUrls)].filter(u => u.includes('khepraexperts.com'))
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'submit'

  if (action === 'health') {
    return new Response(JSON.stringify({ status: 'ok', engine: 'kos-indexnow-master-v1', actions: ['health','submit','force_index','deploy_hook'], indexNowEndpoint: INDEXNOW_ENDPOINT, keyLocation: `https://khepraexperts.com/${INDEXNOW_KEY}.txt` }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  }

  // ─── DEPLOY_HOOK ───
  if (action === 'deploy_hook' && req.method === 'POST') {
    if (DEPLOY_HOOK_SECRET) {
      const authHeader = req.headers.get('Authorization') || ''
      if (authHeader !== `Bearer ${DEPLOY_HOOK_SECRET}`) return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    }
    try {
      const body = await req.json().catch(() => null)
      const isProduction = body?.deployment?.target === 'production' || body?.status === 'ready' || body?.type === 'deploy-succeeded'
      if (!isProduction) return new Response(JSON.stringify({ ok: true, triggered: false, reason: 'not_production' }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const urls = await fetchAllSitemapUrls()
      const indexNowResult = await submitToIndexNow(urls)
      const googleResult = await pingGoogleSitemaps()
      return new Response(JSON.stringify({ ok: true, triggered: true, indexNow: indexNowResult, googlePings: googleResult, urlCount: urls.length, timestamp: new Date().toISOString() }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    } catch (e) { return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }) }
  }

  // ─── FORCE_INDEX ───
  if (action === 'force_index') {
    const startTime = Date.now()
    const urls = await fetchAllSitemapUrls()
    const indexNowResult = await submitToIndexNow(urls)
    const googleResult = await pingGoogleSitemaps()
    const durationMs = Date.now() - startTime
    return new Response(JSON.stringify({ success: true, totalUrls: urls.length, indexNowSubmitted: indexNowResult.submitted, indexNowFailed: indexNowResult.failed, googleSitemapsPinged: googleResult.pinged, googleSitemapsFailed: googleResult.failed, durationMs, timestamp: new Date().toISOString() }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } })
  }

  // ─── SUBMIT (default) ───
  if (req.method === 'POST') {
    try {
      const body = await req.json(); const urls: string[] = body.urls || []
      if (!Array.isArray(urls) || urls.length === 0) return new Response(JSON.stringify({ error: 'No URLs provided' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const validUrls = urls.filter(u => u.startsWith(SITE_URL))
      if (validUrls.length === 0) return new Response(JSON.stringify({ error: `No valid URLs matching ${SITE_URL}` }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
      const indexNowResult = await submitToIndexNow(validUrls)
      const googleResult = await pingGoogleSitemaps()
      return new Response(JSON.stringify({ success: true, submitted: indexNowResult.submitted, failed: indexNowResult.failed, indexNow: indexNowResult, googlePings: googleResult, urlCount: validUrls.length }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
    } catch (e) { return new Response(JSON.stringify({ error: 'Invalid request', message: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }) }
  }

  // GET — soumet tous les sitemaps
  const urls = await fetchAllSitemapUrls()
  if (urls.length === 0) return new Response(JSON.stringify({ error: 'No URLs found' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  const indexNowResult = await submitToIndexNow(urls)
  const googleResult = await pingGoogleSitemaps()
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) { try { const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY); await sb.from('kos_public_sitemap').upsert({ url: `${SITE_URL}/indexnow-last-submit`, updated_at: new Date().toISOString() }, { onConflict: 'url' }) } catch {} }
  return new Response(JSON.stringify({ success: true, totalSitemapUrls: urls.length, submitted: indexNowResult.submitted, failed: indexNowResult.failed, indexNow: indexNowResult, googlePings: googleResult, timestamp: new Date().toISOString() }), { headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } })
})