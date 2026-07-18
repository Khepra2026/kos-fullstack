import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

const INDEXNOW_KEY = 'e8f9c2d3a4b5f6e7d8c9b0a1f2e3d4c5'
const SITE_URL = 'https://khepraexperts.com'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

async function submitToIndexNow(urls: string[]): Promise<{ submitted: number; failed: number }> {
  const batches = chunkArray(urls, 10000)
  let submitted = 0
  let failed = 0

  for (const batch of batches) {
    const payload: IndexNowPayload = {
      host: 'khepraexperts.com',
      key: INDEXNOW_KEY,
      keyLocation: `https://khepraexperts.com/${INDEXNOW_KEY}.txt`,
      urlList: batch,
    }

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok || res.status === 202) {
        submitted += batch.length
      } else {
        failed += batch.length
        console.error(`IndexNow batch failed: ${res.status} ${await res.text()}`)
      }
    } catch (e) {
      failed += batch.length
      console.error(`IndexNow batch error: ${e}`)
    }

    if (batches.length > 1) await new Promise(r => setTimeout(r, 1000))
  }

  return { submitted, failed }
}

async function submitToGoogleIndexing(urls: string[]): Promise<{ submitted: number; failed: number }> {
  const sitemaps = [
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-blog.xml`,
    `${SITE_URL}/sitemap-news.xml`,
    `${SITE_URL}/sitemap-reglementation.xml`,
    `${SITE_URL}/sitemap-conformite.xml`,
    `${SITE_URL}/sitemap-tags.xml`,
    `${SITE_URL}/sitemap-pdf.xml`,
  ]

  let submitted = 0
  let failed = 0

  for (const sitemap of sitemaps) {
    try {
      const encodedSitemap = encodeURIComponent(sitemap)
      const res = await fetch(
        `https://www.google.com/ping?sitemap=${encodedSitemap}`
      )
      if (res.ok) {
        submitted += urls.length
        console.log(`Google ping OK: ${sitemap}`)
      } else {
        failed += urls.length
        console.error(`Google ping failed: ${res.status}`)
      }
    } catch (e) {
      failed += urls.length
      console.error(`Google ping error: ${e}`)
    }
  }

  return { submitted, failed }
}

async function fetchAllSitemapUrls(): Promise<{ urls: string[]; total: number }> {
  const sitemaps = [
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-blog.xml`,
    `${SITE_URL}/sitemap-news.xml`,
    `${SITE_URL}/sitemap-reglementation.xml`,
    `${SITE_URL}/sitemap-conformite.xml`,
    `${SITE_URL}/sitemap-tags.xml`,
    `${SITE_URL}/sitemap-pdf.xml`,
  ]

  const allUrls: string[] = []

  for (const sitemap of sitemaps) {
    try {
      const res = await fetch(sitemap, {
        headers: { 'Accept': 'application/xml, text/xml' }
      })
      if (!res.ok) continue

      const xml = await res.text()
      const locRegex = /<loc>(.*?)<\/loc>/g
      let match
      while ((match = locRegex.exec(xml)) !== null) {
        allUrls.push(match[1])
      }
    } catch (e) {
      console.error(`Failed to parse sitemap ${sitemap}: ${e}`)
    }
  }

  const uniqueUrls = [...new Set(allUrls)]
  return { urls: uniqueUrls, total: uniqueUrls.length }
}

async function logSubmission(sb: any, urls: string[], results: any) {
  try {
    const { error } = await sb.from('kos_public_sitemap').upsert({
      url: `${SITE_URL}/indexnow-last-submit`,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'url' })

    if (error) console.warn('Log submission warning:', error.message)
  } catch (e) {
    console.warn('Log submission failed:', e)
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  const url = new URL(req.url)
  const action = url.searchParams.get('action') || 'submit'

  if (action === 'health') {
    return new Response(JSON.stringify({
      status: 'ok',
      indexNowEndpoint: INDEXNOW_ENDPOINT,
      keyLocation: `https://khepraexperts.com/${INDEXNOW_KEY}.txt`,
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
      },
    })
  }

  if (req.method === 'POST') {
    try {
      const body = await req.json()
      const urls: string[] = body.urls || []

      if (!Array.isArray(urls) || urls.length === 0) {
        return new Response(JSON.stringify({ error: 'No URLs provided', submitted: 0 }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
      }

      const validUrls = urls.filter(u => u.startsWith(SITE_URL))
      if (validUrls.length === 0) {
        return new Response(JSON.stringify({ error: `No valid URLs matching ${SITE_URL}`, submitted: 0 }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
      }

      const indexNowResult = await submitToIndexNow(validUrls)
      const googleResult = await submitToGoogleIndexing(validUrls)

      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
        await logSubmission(sb, validUrls, { indexNowResult, googleResult })
      }

      return new Response(JSON.stringify({
        success: true,
        submitted: indexNowResult.submitted + googleResult.submitted,
        failed: indexNowResult.failed + googleResult.failed,
        indexNow: indexNowResult,
        google: googleResult,
        urlCount: validUrls.length,
      }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    } catch (e) {
      return new Response(JSON.stringify({
        error: 'Invalid request body',
        message: e instanceof Error ? e.message : String(e),
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }
  }

  // GET — soumet toutes les URLs des 7 sitemaps
  const { urls, total } = await fetchAllSitemapUrls()

  if (urls.length === 0) {
    return new Response(JSON.stringify({ error: 'No URLs found in sitemaps', submitted: 0 }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  const indexNowResult = await submitToIndexNow(urls)
  const googleResult = await submitToGoogleIndexing(urls)

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    const sb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    await logSubmission(sb, urls, { indexNowResult, googleResult })
  }

  return new Response(JSON.stringify({
    success: true,
    totalSitemapUrls: total,
    submitted: indexNowResult.submitted + googleResult.submitted,
    failed: indexNowResult.failed + googleResult.failed,
    indexNow: indexNowResult,
    google: googleResult,
    timestamp: new Date().toISOString(),
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
  })
})
