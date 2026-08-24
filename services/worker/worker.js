// ═══════════════════════════════════════════════════════════════
// KOS QUEUE WORKER — Traitement asynchrone générique
// Consomme les queues Redis: transform-queue, govern-queue
// ═══════════════════════════════════════════════════════════════

const { createClient } = require('redis');

// ── Redis ──────────────────────────────────────────────────
const redis = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redis.on('error', (err) => console.error('Worker Redis error:', err.message));

const QUEUES = ['transform-queue', 'govern-queue'];
const TRANSFORM_URL = process.env.TRANSFORM_URL || 'http://transform-service:3001';
const AUDIT_URL = process.env.AUDIT_URL || 'http://audit-service:3002';

// ── Process a job ──────────────────────────────────────────
async function processJob(queueName, rawJob) {
  try {
    const job = JSON.parse(rawJob);
    console.log(`[WORKER] Processing ${queueName}: ${job.batch_id || job.id}`);

    if (queueName === 'transform-queue') {
      await fetch(`${TRANSFORM_URL}/datalake/cleanse`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_id: job.batch_id }),
      });
    } else if (queueName === 'govern-queue') {
      await fetch(`${AUDIT_URL}/datalake/govern`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_id: job.batch_id, framework: 'COBAC+CEMAC+OHADA' }),
      });
    }
  } catch (err) {
    console.error(`[WORKER] Error processing ${queueName}:`, err.message);
    // Re-queue on failure for retry
    try {
      await redis.lPush(queueName, rawJob);
    } catch (e) { /* ignore */ }
  }
}

// ── Main Loop ──────────────────────────────────────────────
async function start() {
  await redis.connect();
  console.log('[WORKER] Connected to Redis, watching queues:', QUEUES.join(', '));

  while (true) {
    try {
      for (const queue of QUEUES) {
        const job = await redis.rPop(queue);
        if (job) {
          await processJob(queue, job);
        }
      }
      // Petit délai pour éviter de saturer le CPU
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error('[WORKER] Main loop error:', err.message);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

start().catch((err) => {
  console.error('[WORKER] Fatal error:', err.message);
  process.exit(1);
});