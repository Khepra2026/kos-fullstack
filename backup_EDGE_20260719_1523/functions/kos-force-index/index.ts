import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const SITE_URL = 'https://khepraexperts.com'
const INDEXNOW_KEY = 'e8f9c2d3a4b5f6e7d8c9b0a1f2e3d4c5'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

interface SitemapResult {
  sitemap: string
  urls: string[]
  count: number
  error?: string
}

interface SubmissionBatch {
  batch: number
  urls: string[]
  indexNowStatus: 'ok' | 'failed'
  googlePingStatus: 'ok' | 'failed'
}

interface ForceIndexReport {
  timestamp: string
  totalUrlsFound: number
  totalUniqueUrls: number
  indexNowSubmitted: number
  indexNowFailed: number
  googleSitemapsPinged: number
  googleSitemapsFailed: number
  sitemapResults: SitemapResult[]
  batches: SubmissionBatch[]
  durationMs: number
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

async function fetchSitemapUrls(sitemapUrl: string): Promise<SitemapResult> {
  try {
    const res = await fetch(sitemapUrl, {
      headers: { 'Accept': 'application/xml, text/xml' }
    })
    if (!res.ok) {
      return { sitemap: sitemapUrl, urls: [], count: 0, error: `HTTP ${res.status}` }
    }

    const xml = await res.text()
    const urls: string[] = []
    const locRegex = /<loc>(.*?)<\/loc>/g
    let match
    while ((match = locRegex.exec(xml)) !== null) {
      const u = match[1].trim()
      if (u.startsWith('http')) {
        urls.push(u.replace('example.com', 'khepraexperts.com'))
      }
    }

    return { sitemap: sitemapUrl, urls, count: urls.length }
  } catch (e) {
    return {
      sitemap: sitemapUrl,
      urls: [],
      count: 0,
      error: e instanceof Error ? e.message : String(e),
    }
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

  const startTime = Date.now()

  // 1. Récupère toutes les URLs des 7 sitemaps
  const sitemapList = [
    `${SITE_URL}/sitemap.xml`,
    `${SITE_URL}/sitemap-blog.xml`,
    `${SITE_URL}/sitemap-news.xml`,
    `${SITE_URL}/sitemap-dynamic.xml`,
    `${SITE_URL}/sitemap-reglementation.xml`,
    `${SITE_URL}/sitemap-conformite.xml`,
    `${SITE_URL}/sitemap-tags.xml`,
    `${SITE_URL}/sitemap-pdf.xml`,
  ]

  const sitemapResults = await Promise.all(sitemapList.map(fetchSitemapUrls))

  const allUrls = sitemapResults.flatMap(r => r.urls)
  const uniqueUrls = [...new Set(allUrls)]

  // Filtre les URLs valides khepraexperts.com
  const validUrls = uniqueUrls.filter(u => u.includes('khepraexperts.com'))

  // 2. Soumet à IndexNow par batch de 10000
  const batches = chunkArray(validUrls, 10000)
  const batchResults: SubmissionBatch[] = []
  let indexNowSubmitted = 0
  let indexNowFailed = 0

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    let indexNowStatus: 'ok' | 'failed' = 'ok'

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: 'khepraexperts.com',
          key: INDEXNOW_KEY,
          keyLocation: `https://khepraexperts.com/${INDEXNOW_KEY}.txt`,
          urlList: batch,
        }),
      })

      if (res.ok || res.status === 202) {
        indexNowSubmitted += batch.length
      } else {
        indexNowFailed += batch.length
        indexNowStatus = 'failed'
      }
    } catch {
      indexNowFailed += batch.length
      indexNowStatus = 'failed'
    }

    batchResults.push({
      batch: i + 1,
      urls: batch.slice(0, 5),
      indexNowStatus,
      googlePingStatus: 'ok',
    })

    if (batches.length > 1) await new Promise(r => setTimeout(r, 500))
  }

  // 3. Ping Google via sitemap submission
  let googleSitemapsPinged = 0
  let googleSitemapsFailed = 0

  for (const sitemap of sitemapList) {
    try {
      const encoded = encodeURIComponent(sitemap)
      const res = await fetch(`https://www.google.com/ping?sitemap=${encoded}`)
      if (res.ok) {
        googleSitemapsPinged++
      } else {
        googleSitemapsFailed++
      }
    } catch {
      googleSitemapsFailed++
    }
  }

  const durationMs = Date.now() - startTime

  const report: ForceIndexReport = {
    timestamp: new Date().toISOString(),
    totalUrlsFound: allUrls.length,
    totalUniqueUrls: validUrls.length,
    indexNowSubmitted,
    indexNowFailed,
    googleSitemapsPinged,
    googleSitemapsFailed,
    sitemapResults: sitemapResults.map(r => ({
      sitemap: r.sitemap,
      urls: r.urls.slice(0, 3),
      count: r.count,
      error: r.error,
    })),
    batches: batchResults.slice(0, 10),
    durationMs,
  }

  return new Response(JSON.stringify(report, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    },
  })
})
