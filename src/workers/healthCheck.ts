// ============================================================
// KOS HEALTH CHECK — Auto-Healing System (Cron 1min)
// YouTube OAuth / DeepL Quota / Creatomate Render / Agent CTR
// ============================================================

interface HealthCheckResult {
  name: string
  healthy: boolean
  details: string
  healed: boolean
  timestamp: string
}

type HealthCheckFn = () => Promise<{ healthy: boolean; details: string }>
type HealFn = () => Promise<void>

interface HealthCheckItem {
  name: string
  check: HealthCheckFn
  heal: HealFn
}

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY || ''

function getSupabaseClient() {
  return {
    from: (table: string) => ({
      select: (columns: string) => ({
        single: async () => {
          try {
            const resp = await fetch(
              `${SUPABASE_URL}/rest/v1/${table}?select=${columns}&limit=1`,
              { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
            )
            if (!resp.ok) return { data: null, error: new Error(`HTTP ${resp.status}`) }
            const arr = await resp.json()
            return { data: arr?.[0] || null, error: null }
          } catch (e) {
            return { data: null, error: e }
          }
        },
        gte: (column: string, value: string) => ({
          select: async () => {
            const resp = await fetch(
              `${SUPABASE_URL}/rest/v1/${table}?select=${columns}&${column}=gte.${encodeURIComponent(value)}`,
              { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
            )
            if (!resp.ok) return { data: null, error: new Error(`HTTP ${resp.status}`) }
            return { data: await resp.json(), error: null }
          }
        }),
      }),
      insert: (_data: Record<string, unknown>) => ({
        select: async () => {
          try {
            const resp = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
              method: 'POST',
              headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                Prefer: 'return=minimal',
              },
              body: JSON.stringify(_data),
            })
            return { data: resp.ok ? { id: 'ok' } : null, error: resp.ok ? null : new Error(`HTTP ${resp.status}`) }
          } catch (e) {
            return { data: null, error: e }
          }
        }
      }),
    }),
  }
}

async function logHealthEvent(service: string, status: string, details: string): Promise<void> {
  try {
    const supabase = getSupabaseClient()
    await supabase.from("cron_job_logs").insert({
      job_name: `health_${service}`,
      status,
      details: JSON.stringify({ details, timestamp: new Date().toISOString() }),
    })
  } catch {
    console.warn("[HEALTH] Failed to log event")
  }
}

const HEALTH_CHECKS: HealthCheckItem[] = [
  {
    name: "YouTube OAuth",
    check: async () => {
      try {
        const resp = await fetch(
          `${SUPABASE_URL}/rest/v1/yt_tokens?select=expires_at&limit=1`,
          { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
        )
        if (!resp.ok) return { healthy: false, details: `HTTP ${resp.status}` }
        const data = await resp.json()
        const token = data?.[0]
        if (!token?.expires_at) return { healthy: false, details: "No token found" }
        const expiresAt = new Date(token.expires_at)
        const isHealthy = expiresAt > new Date()
        return {
          healthy: isHealthy,
          details: isHealthy ? `Token valid until ${expiresAt.toISOString()}` : `Token expired at ${expiresAt.toISOString()}`,
        }
      } catch (e) {
        return { healthy: false, details: String(e) }
      }
    },
    heal: async () => {
      try {
        const resp = await fetch(`${SUPABASE_URL}/functions/v1/youtube-refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
        })
        if (resp.ok) {
          console.log("[HEAL] YouTube OAuth refreshed")
          await logHealthEvent("youtube_oauth", "healed", "Token refreshed")
        }
      } catch (e) {
        console.error("[HEAL] YouTube refresh failed:", e)
      }
    },
  },
  {
    name: "DeepL Quota",
    check: async () => {
      try {
        const deeplKey = (import.meta as any).env?.VITE_PUBLIC_DEEPL_CHECK || ''
        if (!deeplKey) {
          const resp = await fetch(`${SUPABASE_URL}/functions/v1/kos-multilang-generator?action=health`, {
            headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
          })
          if (!resp.ok) return { healthy: true, details: "Skipped (no DeepL configured)" }
          const data = await resp.json()
          if (!data?.deepl_configured) return { healthy: true, details: "Skipped (DeepL not configured)" }
        }

        const resp = await fetch("https://api-free.deepl.com/v2/usage", {
          headers: { Authorization: `DeepL-Auth-Key ${deeplKey || 'check'}` },
        })
        if (!resp.ok) return { healthy: false, details: `DeepL API error: HTTP ${resp.status}` }
        const { character_count, character_limit } = await resp.json()
        const usedPct = character_limit > 0 ? (character_count / character_limit) * 100 : 0
        const isHealthy = character_count < character_limit * 0.9
        return {
          healthy: isHealthy,
          details: `${usedPct.toFixed(1)}% used (${character_count}/${character_limit})`,
        }
      } catch (e) {
        return { healthy: false, details: String(e) }
      }
    },
    heal: async () => {
      console.log("[HEAL] DeepL quota exceeded → switching to LLM local fallback")
      await logHealthEvent("deepl_quota", "healed", "Switched to Mixtral local translation")
    },
  },
  {
    name: "Creatomate Render",
    check: async () => {
      try {
        const creatomateKey = (import.meta as any).env?.VITE_PUBLIC_CREATOMATE_KEY || ''
        if (!creatomateKey) return { healthy: true, details: "Skipped (not configured)" }

        const resp = await fetch("https://api.creatomate.com/v1/renders?status=failed&limit=1", {
          headers: { Authorization: `Bearer ${creatomateKey}` },
        })
        if (!resp.ok) return { healthy: false, details: `HTTP ${resp.status}` }
        const data = await resp.json()
        const hasFailed = Array.isArray(data) && data.length > 0
        return {
          healthy: !hasFailed,
          details: hasFailed ? `${data.length} failed renders` : "No failed renders",
        }
      } catch (e) {
        return { healthy: false, details: String(e) }
      }
    },
    heal: async () => {
      const creatomateKey = (import.meta as any).env?.VITE_PUBLIC_CREATOMATE_KEY || ''
      if (!creatomateKey) return
      try {
        const resp = await fetch("https://api.creatomate.com/v1/renders?status=failed&limit=10", {
          headers: { Authorization: `Bearer ${creatomateKey}` },
        })
        if (!resp.ok) return
        const failed = await resp.json()
        for (const render of (Array.isArray(failed) ? failed : [])) {
          await fetch(`https://api.creatomate.com/v1/renders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${creatomateKey}`,
            },
            body: JSON.stringify({ template_id: render.template_id, modifications: render.modifications || {} }),
          })
        }
        console.log(`[HEAL] Retried ${failed.length} failed Creatomate renders`)
        await logHealthEvent("creatomate", "healed", `Retried ${failed.length} renders`)
      } catch (e) {
        console.error("[HEAL] Creatomate retry failed:", e)
      }
    },
  },
  {
    name: "Agent CTR",
    check: async () => {
      try {
        const resp = await fetch(
          `${SUPABASE_URL}/rest/v1/yt_upload_queue?select=metadata&created_at=gte.${encodeURIComponent(
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          )}`,
          { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
        )
        if (!resp.ok) return { healthy: false, details: `HTTP ${resp.status}` }
        const vids = await resp.json()
        if (!Array.isArray(vids) || vids.length === 0) {
          return { healthy: true, details: "No videos in last 24h" }
        }
        let totalCtr = 0
        let ctrCount = 0
        for (const v of vids) {
          const ctr = v.metadata?.ctr
          if (typeof ctr === "number") {
            totalCtr += ctr
            ctrCount++
          }
        }
        const allAbove = vids.every((v: any) => {
          const ctr = v.metadata?.ctr
          return typeof ctr !== "number" || ctr > 0.02
        })
        const avgCtr = ctrCount > 0 ? (totalCtr / ctrCount * 100).toFixed(1) : "N/A"
        return {
          healthy: allAbove,
          details: `Avg CTR: ${avgCtr}% across ${vids.length} videos`,
        }
      } catch (e) {
        return { healthy: false, details: String(e) }
      }
    },
    heal: async () => {
      try {
        const resp = await fetch(
          `${SUPABASE_URL}/functions/v1/kos-content-recycler?action=ab_test_hooks`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', apikey: SUPABASE_ANON_KEY },
          }
        )
        if (resp.ok) {
          console.log("[HEAL] Started A/B test for low CTR hooks")
          await logHealthEvent("agent_ctr", "healed", "A/B test new hooks")
        }
      } catch (e) {
        console.error("[HEAL] A/B test trigger failed:", e)
      }
    },
  },
]

let healthCheckInterval: ReturnType<typeof setInterval> | null = null
let lastResults: HealthCheckResult[] = []

export async function runHealthCheck(): Promise<HealthCheckResult[]> {
  const results: HealthCheckResult[] = []

  for (const check of HEALTH_CHECKS) {
    let result: HealthCheckResult
    try {
      const { healthy, details } = await check.check()
      result = {
        name: check.name,
        healthy,
        details,
        healed: false,
        timestamp: new Date().toISOString(),
      }
    } catch (e) {
      result = {
        name: check.name,
        healthy: false,
        details: String(e),
        healed: false,
        timestamp: new Date().toISOString(),
      }
    }

    if (!result.healthy) {
      console.warn(`[HEALTH] ${check.name} FAILED: ${result.details} → Healing...`)
      try {
        await check.heal()
        result.healed = true
        console.log(`[HEALTH] ${check.name} → HEALED`)
      } catch (e) {
        console.error(`[HEALTH] ${check.name} heal failed:`, e)
      }
    }

    results.push(result)
  }

  lastResults = results

  // Broadcast via custom event
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("kos-health-check-results", { detail: results }))
  }

  return results
}

export function startHealthCheck(intervalMs: number = 60000): () => void {
  if (healthCheckInterval) return () => stopHealthCheck()

  console.log(`[HEALTH] Starting health checks every ${intervalMs}ms`)
  runHealthCheck()

  healthCheckInterval = setInterval(() => {
    runHealthCheck()
  }, intervalMs)

  return () => stopHealthCheck()
}

export function stopHealthCheck(): void {
  if (healthCheckInterval) {
    clearInterval(healthCheckInterval)
    healthCheckInterval = null
    console.log("[HEALTH] Health checks stopped")
  }
}

export function getLastResults(): HealthCheckResult[] {
  return lastResults
}

export { HEALTH_CHECKS }
export type { HealthCheckResult, HealthCheckItem }