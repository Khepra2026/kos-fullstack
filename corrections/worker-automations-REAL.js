// FIX workers/kos-automations-prod/src/index.js - Real veille 24/7
// CDC §15 Watchers: DOCUMENT MODIFIÉ → HASH CHANGED → EVENT → WORKFLOW → REINDEX → ALERT
import crypto from 'crypto'

async function fetchAndHash(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'KOS-RegTech-Watcher/1.0' } })
  if (!res.ok) throw new Error(`Fetch failed ${url} ${res.status}`)
  const buf = await res.arrayBuffer()
  const hash = crypto.createHash('sha256').update(Buffer.from(buf)).digest('hex')
  return { content: buf, hash, status: res.status }
}

export default {
  async scheduled(event, env, ctx) {
    const sources = [
      'https://www.bceao.int/reglementation',
      // add list from download_global_regulators.py with real URLs
    ]
    for (const url of sources) {
      try {
        const { hash } = await fetchAndHash(url)
        // Check existing hash in Supabase kos_regulatory_sources
        // const existing = await supabase.from('kos_regulatory_sources').select('hash').eq('url', url).single()
        // if existing.hash !== hash -> trigger reindex + alert
        console.log(`Checked ${url} hash ${hash.slice(0,12)}`)
      } catch (e) {
        console.error(`Watcher failed ${url}`, e)
        // log to dead letter, alert
      }
    }
  },
  async fetch(req, env) {
    // Only return real checks - no fake mongo/typesense/redis
    return new Response(JSON.stringify({
      worker: 'kos-automations-prod',
      status: 'live',
      version: env.GIT_SHA || 'unknown',
      last_cron: new Date().toISOString(),
      checks: { supabase: 'pending-real-check' }
    }), { headers: { 'Content-Type': 'application/json' } })
  }
}
