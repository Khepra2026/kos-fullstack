// ═══════════════════════════════════════════════════════════════
// KOS DLQ WORKER — Auto-recovery Dead Letter Queue v1.0
// FIX-003 : Retraitement auto des jobs échoués
// Supabase pgmq → retry exponentiel → max 3 tentatives → DLQ final
// Health check HTTP + métriques Prometheus
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE") || "";
const REDIS_URL = Deno.env.get("REDIS_URL") || "redis://localhost:6379";
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 300000; // 5 minutes
const SCAN_INTERVAL_MS = 60000; // 1 minute
const DLQ_QUEUE = "kos_bigfour_dlq";
const HEALTH_PORT = 9091;

interface DeadJob {
  id: string;
  queue_name: string;
  payload: Record<string, unknown>;
  retry_count: number;
  last_error: string;
  created_at: string;
}

function parseRedisUrl(url: string): { host: string; port: number; password: string } {
  try {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: parseInt(u.port || "6379"),
      password: decodeURIComponent(u.password || ""),
    };
  } catch {
    return { host: "localhost", port: 6379, password: "" };
  }
}

async function connectRedis(): Promise<Deno.TcpConn | null> {
  const { host, port } = parseRedisUrl(REDIS_URL);
  try {
    const conn = await Deno.connect({ hostname: host, port, transport: "tcp" });
    return conn;
  } catch (err) {
    console.error(`[DLQ] Redis connection failed: ${err}`);
    return null;
  }
}

async function redisCommand(conn: Deno.TcpConn, ...args: string[]): Promise<string> {
  const cmd = `*${args.length}\r\n${args.map((a) => `$${a.length}\r\n${a}`).join("\r\n")}\r\n`;
  const encoder = new TextEncoder();
  await conn.write(encoder.encode(cmd));

  const buf = new Uint8Array(4096);
  const n = await conn.read(buf);
  if (n === null) throw new Error("Redis connection closed");
  return new TextDecoder().decode(buf.subarray(0, n));
}

async function fetchDeadJobs(): Promise<DeadJob[]> {
  try {
    const resp = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/get_dead_letter_jobs?queue_name=${DLQ_QUEUE}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_SERVICE_ROLE,
          authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        },
      },
    );
    if (!resp.ok) {
      console.error(`[DLQ] Failed to fetch dead jobs: ${resp.status}`);
      return [];
    }
    return await resp.json();
  } catch (err) {
    console.error(`[DLQ] Error fetching dead jobs: ${err}`);
    return [];
  }
}

async function requeueJob(job: DeadJob): Promise<boolean> {
  const newRetryCount = job.retry_count + 1;

  if (newRetryCount > MAX_RETRIES) {
    console.log(`[DLQ] Job ${job.id} exceeded max retries (${MAX_RETRIES}), moved to permanent DLQ`);
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/rpc/mark_job_permanent_dlq`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_SERVICE_ROLE,
          authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
        },
        body: JSON.stringify({ job_id: job.id }),
      });
    } catch (err) {
      console.error(`[DLQ] Failed to mark job as permanent DLQ: ${err}`);
    }
    return false;
  }

  const delay = Math.min(RETRY_DELAY_MS * Math.pow(2, newRetryCount - 1), 3600000);

  try {
    await fetch(`${SUPABASE_URL}/rest/v1/rpc/requeue_dead_letter_job`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_SERVICE_ROLE,
        authorization: `Bearer ${SUPABASE_SERVICE_ROLE}`,
      },
      body: JSON.stringify({
        job_id: job.id,
        retry_count: newRetryCount,
        delay_ms: delay,
      }),
    });
    console.log(`[DLQ] Job ${job.id} requeued — attempt ${newRetryCount}/${MAX_RETRIES}, delay ${delay}ms`);
    return true;
  } catch (err) {
    console.error(`[DLQ] Failed to requeue job ${job.id}: ${err}`);
    return false;
  }
}

async function processDeadLetterQueue(): Promise<{ processed: number; requeued: number; failed: number }> {
  const jobs = await fetchDeadJobs();
  let requeued = 0;
  let failed = 0;

  for (const job of jobs) {
    const success = await requeueJob(job);
    if (success) requeued++;
    else failed++;
  }

  console.log(`[DLQ] Cycle complete — ${jobs.length} jobs scanned, ${requeued} requeued, ${failed} moved to permanent DLQ`);
  return { processed: jobs.length, requeued, failed };
}

// ── Health check HTTP server ──────────────────────────────────
async function startHealthServer(): Promise<void> {
  const listener = Deno.listen({ port: HEALTH_PORT });
  console.log(`[DLQ] Health server listening on port ${HEALTH_PORT}`);

  for await (const conn of listener) {
    const httpConn = Deno.serveHttp(conn);
    (async () => {
      for await (const requestEvent of httpConn) {
        const url = new URL(requestEvent.request.url);
        if (url.pathname === "/health") {
          await requestEvent.respondWith(
            new Response(JSON.stringify({ status: "healthy", service: "kos-dlq-worker", timestamp: new Date().toISOString() }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }),
          );
        } else if (url.pathname === "/metrics") {
          await requestEvent.respondWith(
            new Response("# KOS DLQ Worker Metrics\ndlq_worker_health 1\n", {
              status: 200,
              headers: { "Content-Type": "text/plain" },
            }),
          );
        } else {
          await requestEvent.respondWith(new Response("Not Found", { status: 404 }));
        }
      }
    })();
  }
}

// ── Main loop ─────────────────────────────────────────────────
async function main(): Promise<void> {
  console.log("[DLQ] KOS DLQ Worker v1.0 — Starting...");
  console.log(`[DLQ] Supabase: ${SUPABASE_URL ? "configured" : "MISSING"}`);
  console.log(`[DLQ] Redis: ${REDIS_URL}`);

  // Start health server in parallel
  startHealthServer();

  // Connect to Redis
  const redis = await connectRedis();
  if (redis) {
    console.log("[DLQ] Redis connected");
  }

  // Main processing loop
  while (true) {
    try {
      await processDeadLetterQueue();
    } catch (err) {
      console.error(`[DLQ] Error in processing loop: ${err}`);
    }
    await new Promise((resolve) => setTimeout(resolve, SCAN_INTERVAL_MS));
  }
}

main();