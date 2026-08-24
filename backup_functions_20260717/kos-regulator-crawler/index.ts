
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") ?? "";

const BATCH_SIZE = 3;
const MAX_URLS = 10;
const REQUEST_TIMEOUT_MS = 15000;
const CRAWL_INTERVAL_HOURS = 1;

interface RegulatorRow {
  id: number;
  regulator: string;
  url: string;
  lang: string;
  content_hash: string | null;
  title?: string | null;
}

interface CrawlResult {
  id: number;
  regulator: string;
  url: string;
  lang: string;
  old_hash: string | null;
  new_hash: string;
  changed: boolean;
  status_code: number | null;
  content_length: number;
  error?: string;
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(), "Content-Type": "application/json" },
  });
}

async function computeMD5(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<{ body: string; status: number }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "KOS-Regulator-Crawler/1.0 (KHEPRA OS; +https://khepra.ai)",
        "Accept": "text/html, application/json, text/plain, */*",
        "Accept-Language": "fr, en;q=0.9",
      },
      redirect: "follow",
    });

    const body = await response.text();
    return { body, status: response.status };
  } finally {
    clearTimeout(timer);
  }
}

async function notifyChange(
  supabase: ReturnType<typeof createClient>,
  result: CrawlResult
): Promise<void> {
  const logEntry = {
    event_type: "regulator_update",
    payload: {
      event: "regulator_update",
      regulator: result.regulator,
      url: result.url,
      lang: result.lang,
      content_length: result.content_length,
      old_hash: result.old_hash,
      new_hash: result.new_hash,
      status_code: result.status_code,
    },
    pg_net_request_id: `crawler-${result.id}-${Date.now()}`,
  };

  await supabase.from("webhook_notification_log").insert(logEntry).then(({ error }) => {
    if (error) console.error(`[kos-regulator-crawler] Log insert failed for id=${result.id}:`, error.message);
  });

  if (SLACK_WEBHOOK_URL) {
    try {
      await fetch(SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `📡 *${result.regulator}* — Nouveau contenu détecté\n> URL: ${result.url}\n> Lang: ${result.lang}\n> Content-Length: ${result.content_length} octets\n> Status: ${result.status_code}`,
        }),
      });
    } catch (slackErr) {
      console.error(`[kos-regulator-crawler] Slack notify failed for id=${result.id}:`, slackErr);
    }
  }
}

async function crawlBatch(
  supabase: ReturnType<typeof createClient>,
  rows: RegulatorRow[]
): Promise<CrawlResult[]> {
  const results: CrawlResult[] = [];

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);

    const batchPromises = batch.map(async (row): Promise<CrawlResult> => {
      const baseResult: CrawlResult = {
        id: row.id,
        regulator: row.regulator,
        url: row.url,
        lang: row.lang,
        old_hash: row.content_hash,
        new_hash: "",
        changed: false,
        status_code: null,
        content_length: 0,
      };

      try {
        const { body, status } = await fetchWithTimeout(row.url, REQUEST_TIMEOUT_MS);
        const newHash = await computeMD5(body);
        const changed = row.content_hash !== newHash;

        baseResult.new_hash = newHash;
        baseResult.changed = changed;
        baseResult.status_code = status;
        baseResult.content_length = body.length;

        const updateData: Record<string, unknown> = {
          content_hash: newHash,
          last_crawl: new Date().toISOString(),
          crawled_by: "kos-regulator-crawler-edge",
        };

        const { error: updateErr } = await supabase
          .from("regulator_feed")
          .update(updateData)
          .eq("id", row.id);

        if (updateErr) {
          console.error(`[kos-regulator-crawler] DB update failed for id=${row.id}:`, updateErr.message);
          baseResult.error = `DB update: ${updateErr.message}`;
        } else if (changed) {
          await notifyChange(supabase, baseResult);
        }
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Unknown error";
        console.error(`[kos-regulator-crawler] Crawl failed for ${row.url}:`, errMsg);
        baseResult.error = errMsg;

        await supabase
          .from("regulator_feed")
          .update({
            last_crawl: new Date().toISOString(),
            crawled_by: "kos-regulator-crawler-edge",
          })
          .eq("id", row.id);
      }

      return baseResult;
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════════
// MAIN HANDLER
// ═══════════════════════════════════════════════════════════════════
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders() });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/v1\/kos-regulator-crawler/, "");

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE, {
    auth: { persistSession: false },
  });

  // ── GET / — Health + stats ──
  if (req.method === "GET" && (path === "/" || path === "")) {
    const waitInterval = new Date(Date.now() - CRAWL_INTERVAL_HOURS * 3600 * 1000).toISOString();

    const { count } = await supabase
      .from("regulator_feed")
      .select("*", { count: "exact", head: true })
      .or(`last_crawl.is.null,last_crawl.lt.${waitInterval}`);

    const { data: recent } = await supabase
      .from("webhook_notification_log")
      .select("created_at, payload")
      .eq("event_type", "regulator_update")
      .order("created_at", { ascending: false })
      .limit(5);

    return jsonResponse({
      status: "READY",
      service: "kos-regulator-crawler",
      version: "1.1.0",
      config: { batch_size: BATCH_SIZE, max_urls: MAX_URLS, request_timeout_ms: REQUEST_TIMEOUT_MS, crawl_interval_hours: CRAWL_INTERVAL_HOURS },
      pending_urls: count ?? 0,
      recent_changes: (recent ?? []).map((r) => ({ at: r.created_at, regulator: (r.payload as Record<string, unknown>)?.regulator, url: (r.payload as Record<string, unknown>)?.url })),
      slack_configured: SLACK_WEBHOOK_URL.length > 0,
      endpoints: { health: "GET /", crawl: "POST /crawl", crawl_one: "POST /crawl?regulator=BCEAO&url=..." },
      generated_at: new Date().toISOString(),
    });
  }

  // ── POST /crawl — Lancement crawl ──
  if (req.method === "POST" && (path === "/crawl" || path === "")) {
    try {
      const params = url.searchParams;
      const specificRegulator = params.get("regulator");
      const specificUrl = params.get("url");

      let query = supabase
        .from("regulator_feed")
        .select("id, regulator, url, lang, content_hash, title")
        .order("impact_score", { ascending: false, nullsFirst: false })
        .limit(MAX_URLS);

      if (specificRegulator && specificUrl) {
        query = query.eq("regulator", specificRegulator.toUpperCase()).eq("url", specificUrl);
      } else if (specificRegulator) {
        query = query.eq("regulator", specificRegulator.toUpperCase());
      } else {
        const stale = new Date(Date.now() - CRAWL_INTERVAL_HOURS * 3600 * 1000).toISOString();
        query = query.or(`last_crawl.is.null,last_crawl.lt.${stale}`);
      }

      const { data: rows, error: fetchErr } = await query;

      if (fetchErr) {
        return jsonResponse({ error: "DB query failed", detail: fetchErr.message }, 500);
      }

      if (!rows || rows.length === 0) {
        return jsonResponse({
          crawled: 0,
          changed: 0,
          message: "No URLs to crawl — all up to date",
          generated_at: new Date().toISOString(),
        });
      }

      const results = await crawlBatch(supabase, rows as RegulatorRow[]);

      return jsonResponse({
        total_crawled: results.length,
        changed: results.filter((r) => r.changed).length,
        errors: results.filter((r) => r.error).length,
        status_codes: results.reduce((acc, r) => {
          const key = String(r.status_code ?? "error");
          acc[key] = (acc[key] ?? 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        details: results.map((r) => ({
          id: r.id,
          regulator: r.regulator,
          url: r.url,
          changed: r.changed,
          content_length: r.content_length,
          status_code: r.status_code,
          error: r.error,
        })),
        generated_at: new Date().toISOString(),
      });
    } catch (err) {
      console.error("[kos-regulator-crawler] Fatal:", err);
      return jsonResponse(
        { error: "Internal server error", detail: err instanceof Error ? err.message : "Unknown error" },
        500
      );
    }
  }

  return jsonResponse({ error: "Not found", available: ["GET /", "POST /crawl"] }, 404);
});
