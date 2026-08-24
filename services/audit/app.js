// ═══════════════════════════════════════════════════════════════
// KOS AUDIT SERVICE — Traçabilité & compliance
// Port 3002
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

// Stockage en mémoire des alertes critiques (pour consultation rapide)
const criticalAlerts = [];
const MAX_ALERTS = 100;

// ── Health ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kos-audit', version: '1.0.0', uptime: process.uptime() });
});

// ── Govern (GOVERNED Zone) ─────────────────────────────────
app.post('/datalake/govern', async (req, res) => {
  try {
    const { batch_id, framework } = req.body;
    if (!batch_id) {
      return res.status(400).json({ error: 'batch_id is required' });
    }

    // Trouver le CLEAN correspondant
    const { rows: cleanRows } = await pool.query(
      'SELECT id, quality_score FROM datalake_clean WHERE batch_id = $1 ORDER BY validated_at DESC LIMIT 1',
      [batch_id]
    );

    if (cleanRows.length === 0) {
      return res.status(404).json({ error: 'clean batch not found', batch_id });
    }

    const cleanRow = cleanRows[0];
    const complianceScore = cleanRow.quality_score >= 0.8 ? cleanRow.quality_score : cleanRow.quality_score * 0.85;
    const frameworks = (framework || 'COBAC+CEMAC+OHADA').split('+');

    const { rows: govRows } = await pool.query(
      `INSERT INTO datalake_governed (batch_id, source_clean_id, framework, compliance_score, governance_tags)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, governed_at`,
      [batch_id, cleanRow.id, frameworks.join('+'), complianceScore, JSON.stringify(frameworks)]
    );

    // Log audit
    await pool.query(
      `INSERT INTO audit_trail (batch_id, event, service, payload, severity)
       VALUES ($1, $2, $3, $4, $5)`,
      [batch_id, 'governance_applied', 'audit', JSON.stringify({ framework, compliance_score: complianceScore }), 'info']
    );

    res.status(201).json({
      status: 'governed',
      governed_id: govRows[0].id,
      batch_id,
      framework: frameworks.join('+'),
      compliance_score: complianceScore,
      governed_at: govRows[0].governed_at,
    });
  } catch (err) {
    console.error('Govern error:', err.message);
    res.status(500).json({ error: 'govern_failed', detail: err.message });
  }
});

// ── ETL Complete ───────────────────────────────────────────
app.post('/audit/etl-complete', async (req, res) => {
  try {
    const { batch_id, records_synced, timestamp, zones_updated } = req.body;

    await pool.query(
      `INSERT INTO etl_sync_log (batch_id, records_synced, zones_updated, status)
       VALUES ($1, $2, $3, $4)`,
      [batch_id, records_synced || 0, zones_updated || ['raw', 'clean', 'governed'], 'completed']
    );

    await pool.query(
      `INSERT INTO audit_trail (batch_id, event, service, payload, severity)
       VALUES ($1, $2, $3, $4, $5)`,
      [batch_id, 'etl_sync_complete', 'audit', JSON.stringify({ records_synced, zones_updated }), 'info']
    );

    res.json({ status: 'logged', batch_id, event: 'etl_sync_complete' });
  } catch (err) {
    console.error('ETL complete error:', err.message);
    res.status(500).json({ error: 'etl_log_failed', detail: err.message });
  }
});

// ── Critical Alert ─────────────────────────────────────────
app.post('/alert/critical', async (req, res) => {
  try {
    const { alerts, triggered_by, timestamp } = req.body;
    const alertData = {
      id: `critical-${Date.now()}`,
      severity: 'critical',
      alerts: alerts || req.body,
      triggered_by: triggered_by || 'unknown',
      timestamp: timestamp || new Date().toISOString(),
    };

    criticalAlerts.unshift(alertData);
    if (criticalAlerts.length > MAX_ALERTS) criticalAlerts.length = MAX_ALERTS;

    await pool.query(
      `INSERT INTO audit_trail (event, service, payload, severity)
       VALUES ($1, $2, $3, $4)`,
      ['critical_alert', 'audit', JSON.stringify(alertData), 'critical']
    );

    console.error(`[CRITICAL] ${JSON.stringify(alertData)}`);
    res.json({ status: 'critical_alerted', alert_id: alertData.id });
  } catch (err) {
    console.error('Critical alert error:', err.message);
    res.status(500).json({ error: 'alert_failed', detail: err.message });
  }
});

// ── Warning Alert ──────────────────────────────────────────
app.post('/alert/warning', async (req, res) => {
  try {
    const { alerts, timestamp } = req.body;
    const alertData = {
      id: `warning-${Date.now()}`,
      severity: 'warning',
      alerts: alerts || req.body,
      timestamp: timestamp || new Date().toISOString(),
    };

    await pool.query(
      `INSERT INTO audit_trail (event, service, payload, severity)
       VALUES ($1, $2, $3, $4)`,
      ['warning_alert', 'audit', JSON.stringify(alertData), 'warning']
    );

    res.json({ status: 'warning_alerted', alert_id: alertData.id });
  } catch (err) {
    console.error('Warning alert error:', err.message);
    res.status(500).json({ error: 'alert_failed', detail: err.message });
  }
});

// ── Generic Alert ──────────────────────────────────────────
app.post('/alert', async (req, res) => {
  try {
    const { type, document_id, regulator, score } = req.body;

    await pool.query(
      `INSERT INTO audit_trail (event, service, payload, severity)
       VALUES ($1, $2, $3, $4)`,
      [type || 'generic_alert', 'audit', JSON.stringify(req.body), 'warning']
    );

    res.json({ status: 'alert_logged', type: type || 'generic' });
  } catch (err) {
    console.error('Alert error:', err.message);
    res.status(500).json({ error: 'alert_failed', detail: err.message });
  }
});

// ── Audit Log ──────────────────────────────────────────────
app.post('/log', async (req, res) => {
  try {
    const { event, regulator, reference, timestamp } = req.body;

    await pool.query(
      `INSERT INTO audit_trail (event, service, payload, severity)
       VALUES ($1, $2, $3, $4)`,
      [event || 'log_entry', 'audit', JSON.stringify(req.body), 'info']
    );

    res.json({ status: 'logged', event: event || 'log_entry' });
  } catch (err) {
    console.error('Log error:', err.message);
    res.status(500).json({ error: 'log_failed', detail: err.message });
  }
});

// ── List critical alerts ──────────────────────────────────
app.get('/alerts', (_req, res) => {
  res.json({ count: criticalAlerts.length, alerts: criticalAlerts.slice(0, 50) });
});

// ── Metrics ────────────────────────────────────────────────
app.get('/metrics', async (_req, res) => {
  try {
    const { rows: governed } = await pool.query('SELECT COUNT(*) as count FROM datalake_governed');
    const { rows: auditCount } = await pool.query('SELECT COUNT(*) as count FROM audit_trail');
    const { rows: recentCritical } = await pool.query(
      "SELECT COUNT(*) as count FROM audit_trail WHERE severity = 'critical' AND created_at > NOW() - INTERVAL '24 hours'"
    );
    res.json({
      service: 'audit',
      total_governed: parseInt(governed[0]?.count || '0'),
      total_audit_trail: parseInt(auditCount[0]?.count || '0'),
      critical_last_24h: parseInt(recentCritical[0]?.count || '0'),
      uptime: process.uptime(),
    });
  } catch (err) {
    res.json({ service: 'audit', error: err.message });
  }
});

// ── Start ──────────────────────────────────────────────────
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`KOS Audit Service running on port ${PORT}`);
});