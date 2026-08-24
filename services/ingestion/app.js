// ═══════════════════════════════════════════════════════════════
// KOS INGESTION SERVICE — Acquisition données réglementaires
// Port 3000
// ═══════════════════════════════════════════════════════════════

const express = require('express');
const { Pool } = require('pg');
const { createClient } = require('redis');

const app = express();
app.use(express.json({ limit: '10mb' }));

// ── PostgreSQL ──────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || 'postgresql://kos:changeme@postgres:5432/kos_analytics',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// ── Redis ──────────────────────────────────────────────────
const redis = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' });
redis.on('error', (err) => console.error('Redis error:', err.message));
redis.connect().catch(() => console.warn('Redis not available, continuing without queue'));

// ── Health ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kos-ingestion', version: '1.0.0', uptime: process.uptime() });
});

// ── Store single document ──────────────────────────────────
app.post('/store', async (req, res) => {
  try {
    const { regulator, reference, title, content, source_url } = req.body;
    if (!regulator) {
      return res.status(400).json({ error: 'regulator is required' });
    }

    const batchId = `ingest-${Date.now()}`;
    const { rows } = await pool.query(
      `INSERT INTO datalake_raw (batch_id, zone, format, regulator, payload, source_url)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, batch_id, ingested_at`,
      [batchId, 'raw', 'json', regulator.toLowerCase().trim(), JSON.stringify(req.body), source_url || '']
    );

    // Publier l'événement dans Redis pour le transform service
    try {
      await redis.publish('ingestion-events', JSON.stringify({
        type: 'document_ingested',
        raw_id: rows[0].id,
        batch_id: batchId,
        regulator: regulator.toLowerCase().trim(),
        timestamp: new Date().toISOString(),
      }));
    } catch (e) { /* Redis peut être down, continue */ }

    res.status(201).json({
      status: 'stored',
      id: rows[0].id,
      batch_id: batchId,
      ingested_at: rows[0].ingested_at,
    });
  } catch (err) {
    console.error('Store error:', err.message);
    res.status(500).json({ error: 'store_failed', detail: err.message });
  }
});

// ── Store batch to Data Lake ───────────────────────────────
app.post('/datalake/batch', async (req, res) => {
  try {
    const { batch_id, timestamp, zone, regulator, payload } = req.body;
    if (!batch_id || !payload) {
      return res.status(400).json({ error: 'batch_id and payload are required' });
    }

    const { rows } = await pool.query(
      `INSERT INTO datalake_raw (batch_id, zone, format, regulator, payload)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, ingested_at`,
      [batch_id, zone || 'raw', 'jsonl', regulator || '', JSON.stringify(payload)]
    );

    // Queue to transform
    try {
      await redis.lPush('transform-queue', JSON.stringify({
        raw_id: rows[0].id,
        batch_id,
        timestamp: new Date().toISOString(),
      }));
    } catch (e) { /* ok */ }

    res.status(201).json({
      status: 'batched',
      id: rows[0].id,
      batch_id,
      ingested_at: rows[0].ingested_at,
    });
  } catch (err) {
    console.error('Batch error:', err.message);
    res.status(500).json({ error: 'batch_failed', detail: err.message });
  }
});

// ── Metrics endpoint ───────────────────────────────────────
app.get('/metrics', async (_req, res) => {
  try {
    const { rows: raw } = await pool.query('SELECT COUNT(*) as count FROM datalake_raw');
    const { rows: recent } = await pool.query(
      "SELECT COUNT(*) as count FROM datalake_raw WHERE ingested_at > NOW() - INTERVAL '1 hour'"
    );
    res.json({
      service: 'ingestion',
      total_documents: parseInt(raw[0]?.count || '0'),
      documents_last_hour: parseInt(recent[0]?.count || '0'),
      uptime: process.uptime(),
    });
  } catch (err) {
    res.json({ service: 'ingestion', error: err.message });
  }
});

// ── Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`KOS Ingestion Service running on port ${PORT}`);
});