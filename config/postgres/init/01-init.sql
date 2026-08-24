-- ═══════════════════════════════════════════════════════════════
-- KOS POSTGRESQL — Database Initialization
-- Création des bases pour n8n et analytics
-- ═══════════════════════════════════════════════════════════════

-- Créer la base n8n (si pas déjà existante)
SELECT 'CREATE DATABASE kos_n8n WITH ENCODING ''UTF8'' LC_COLLATE = ''en_US.utf8'' LC_CTYPE = ''en_US.utf8'' TEMPLATE template0'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kos_n8n')\gexec

-- Créer la base analytics (si pas déjà existante)
SELECT 'CREATE DATABASE kos_analytics WITH ENCODING ''UTF8'' LC_COLLATE = ''en_US.utf8'' LC_CTYPE = ''en_US.utf8'' TEMPLATE template0'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'kos_analytics')\gexec

-- ═══════════════════════════════════════════════
-- kos_analytics — Schema initial
-- ═══════════════════════════════════════════════
\c kos_analytics;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "vector";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

-- ── Data Lake Raw Zone ────────────────────────
CREATE TABLE IF NOT EXISTS datalake_raw (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT NOT NULL,
  zone TEXT NOT NULL DEFAULT 'raw',
  format TEXT NOT NULL DEFAULT 'jsonl',
  regulator TEXT,
  payload JSONB NOT NULL,
  source_url TEXT,
  ingested_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_raw_batch ON datalake_raw(batch_id);
CREATE INDEX idx_raw_regulator ON datalake_raw(regulator);
CREATE INDEX idx_raw_ingested ON datalake_raw(ingested_at DESC);

-- ── Data Lake Clean Zone ──────────────────────
CREATE TABLE IF NOT EXISTS datalake_clean (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT NOT NULL,
  source_raw_id UUID REFERENCES datalake_raw(id),
  validated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  quality_score NUMERIC(3,2) DEFAULT 0.0,
  anomalies JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_clean_batch ON datalake_clean(batch_id);

-- ── Data Lake Governed Zone ──────────────────
CREATE TABLE IF NOT EXISTS datalake_governed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT NOT NULL,
  source_clean_id UUID REFERENCES datalake_clean(id),
  framework TEXT NOT NULL,
  compliance_score NUMERIC(3,2) DEFAULT 0.0,
  governance_tags TEXT[] DEFAULT '',
  governed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Audit Trail ──────────────────────────────
CREATE TABLE IF NOT EXISTS audit_trail (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT,
  event TEXT NOT NULL,
  service TEXT NOT NULL,
  payload JSONB DEFAULT '',
  severity TEXT DEFAULT 'info',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_event ON audit_trail(event);
CREATE INDEX idx_audit_service ON audit_trail(service);
CREATE INDEX idx_audit_created ON audit_trail(created_at DESC);

-- ── ETL Sync Log ─────────────────────────────
CREATE TABLE IF NOT EXISTS etl_sync_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id TEXT NOT NULL,
  records_synced INTEGER DEFAULT 0,
  zones_updated TEXT[] DEFAULT '',
  duration_ms INTEGER,
  status TEXT DEFAULT 'completed',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Metrics Snapshots ────────────────────────
CREATE TABLE IF NOT EXISTS metrics_snapshots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  metric_value NUMERIC NOT NULL,
  labels JSONB DEFAULT '',
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_metrics_service ON metrics_snapshots(service);
CREATE INDEX idx_metrics_captured ON metrics_snapshots(captured_at DESC);

COMMENT ON TABLE datalake_raw IS 'Data Lake — Zone RAW : données brutes ingérées';
COMMENT ON TABLE datalake_clean IS 'Data Lake — Zone CLEAN : données validées et normalisées';
COMMENT ON TABLE datalake_governed IS 'Data Lake — Zone GOVERNED : données conformes et tracées';
COMMENT ON TABLE audit_trail IS 'Piste d audit complète pour conformité ISO 27001 / COBAC';