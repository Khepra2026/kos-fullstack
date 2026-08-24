// ═══════════════════════════════════════════════════════════════
// KOS TRANSFORM SERVICE — Validation & normalisation
// Port 3001
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
redis.connect().catch(() => console.warn('Redis not available'));

// ── Health ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kos-transform', version: '1.0.0', uptime: process.uptime() });
});

// ── Cleanse / Validate batch ───────────────────────────────
app.post('/datalake/cleanse', async (req, res) => {
  try {
    const { batch_id, source } = req.body;
    if (!batch_id) {
      return res.status(400).json({ error: 'batch_id is required' });
    }

    // Récupérer les données RAW
    const { rows: rawRows } = await pool.query(
      'SELECT id, payload FROM datalake_raw WHERE batch_id = $1',
      [batch_id]
    );

    if (rawRows.length === 0) {
      return res.status(404).json({ error: 'batch not found', batch_id });
    }

    const sourceRow = rawRows[0];
    const payload = sourceRow.payload;
    const anomalies = [];

    // Validation basique
    if (payload.regulations) {
      const regs = payload.regulations.data || [];
      for (const reg of regs) {
        if (!reg.reference) anomalies.push({ field: 'reference', issue: 'missing', item: reg.title || 'unknown' });
        if (!reg.regulator) anomalies.push({ field: 'regulator', issue: 'missing', item: reg.reference || 'unknown' });
      }
    }

    const qualityScore = anomalies.length === 0 ? 1.0 : Math.max(0, 1.0 - (anomalies.length * 0.1));
    const { rows: cleanRows } = await pool.query(
      `INSERT INTO datalake_clean (batch_id, source_raw_id, quality_score, anomalies)
       VALUES ($1, $2, $3, $4) RETURNING id, validated_at`,
      [batch_id, sourceRow.id, qualityScore, JSON.stringify(anomalies)]
    );

    // Queue to govern
    try {
      await redis.lPush('govern-queue', JSON.stringify({
        clean_id: cleanRows[0].id,
        batch_id,
        timestamp: new Date().toISOString(),
      }));
    } catch (e) { /* ok */ }

    res.status(201).json({
      status: 'cleansed',
      clean_id: cleanRows[0].id,
      batch_id,
      quality_score: qualityScore,
      anomalies_count: anomalies.length,
      validated_at: cleanRows[0].validated_at,
    });
  } catch (err) {
    console.error('Cleanse error:', err.message);
    res.status(500).json({ error: 'cleanse_failed', detail: err.message });
  }
});

// ── Validate single document ───────────────────────────────
app.post('/validate', async (req, res) => {
  try {
    const { document_id, regulator } = req.body;
    if (!document_id) {
      return res.status(400).json({ error: 'document_id is required' });
    }

    // Log de validation
    await pool.query(
      `INSERT INTO audit_trail (event, service, payload, severity)
       VALUES ($1, $2, $3, $4)`,
      ['validation_triggered', 'transform', JSON.stringify({ document_id, regulator }), 'info']
    );

    res.json({
      status: 'validated',
      document_id,
      regulator: regulator || 'unknown',
      validated_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Validate error:', err.message);
    res.status(500).json({ error: 'validate_failed', detail: err.message });
  }
});

// ── Metrics ────────────────────────────────────────────────
app.get('/metrics', async (_req, res) => {
  try {
    const { rows: clean } = await pool.query('SELECT COUNT(*) as count FROM datalake_clean');
    const { rows: quality } = await pool.query(
      'SELECT AVG(quality_score)::numeric(3,2) as avg_quality FROM datalake_clean'
    );
    res.json({
      service: 'transform',
      total_cleansed: parseInt(clean[0]?.count || '0'),
      avg_quality_score: parseFloat(quality[0]?.avg_quality || '0'),
      uptime: process.uptime(),
    });
  } catch (err) {
    res.json({ service: 'transform', error: err.message });
  }
});

// ── Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`KOS Transform Service running on port ${PORT}`);
});