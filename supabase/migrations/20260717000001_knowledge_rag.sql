-- ============================================================================
-- KOS KNOWLEDGE RAG DATABASE
-- Migration : 20260717000001_knowledge_rag.sql
-- Version : Production Idempotent Supabase
-- Objectif : Base documentaire réglementaire IA / RAG
-- Rétention : 10 ans COBAC
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS vector;


-- ============================================================================
-- TABLE KNOWLEDGE BASE
-- ============================================================================

CREATE TABLE IF NOT EXISTS knowledge_base (

    id BIGSERIAL PRIMARY KEY,

    title TEXT NOT NULL,

    content TEXT NOT NULL,

    article_ref TEXT,

    authority TEXT NOT NULL
    CHECK (
        authority IN (
            'COBAC',
            'OHADA',
            'BEAC',
            'BCEAO',
            'CEMAC',
            'GIABA',
            'UMOA'
        )
    ),

    agent_name TEXT NOT NULL,

    embedding VECTOR(1024),

    data_residency TEXT
        DEFAULT 'CEMAC'
        NOT NULL,

    document_type TEXT DEFAULT 'REGULATION',

    language TEXT DEFAULT 'FR',

    version TEXT DEFAULT '1.0',

    source_url TEXT,

    document_hash TEXT,

    effective_date DATE,

    expiry_date DATE,

    retention_years INTEGER DEFAULT 10,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    updated_at TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT sovereignty_check
    CHECK (data_residency = 'CEMAC')
);


-- ============================================================================
-- COMPATIBILITE TABLE EXISTANTE
-- ============================================================================

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS article_ref TEXT;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS agent_name TEXT;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS embedding VECTOR(1024);

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS data_residency TEXT DEFAULT 'CEMAC';

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS document_type TEXT DEFAULT 'REGULATION';

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'FR';

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS version TEXT DEFAULT '1.0';

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS source_url TEXT;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS document_hash TEXT;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS effective_date DATE;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS expiry_date DATE;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS retention_years INTEGER DEFAULT 10;

ALTER TABLE knowledge_base
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();


-- ============================================================================
-- INDEX DOCUMENTAIRE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_knowledge_authority
ON knowledge_base(authority);

CREATE INDEX IF NOT EXISTS idx_knowledge_agent
ON knowledge_base(agent_name);

CREATE INDEX IF NOT EXISTS idx_knowledge_hash
ON knowledge_base(document_hash);

CREATE INDEX IF NOT EXISTS idx_knowledge_created
ON knowledge_base(created_at);


-- ============================================================================
-- INDEX VECTORIEL RAG
-- Correction Supabase :
-- maintenance_work_mem 32MB incompatible avec lists=100
-- ============================================================================

DROP INDEX IF EXISTS idx_knowledge_embedding;


SET maintenance_work_mem = '64MB';


CREATE INDEX idx_knowledge_embedding
ON knowledge_base
USING ivfflat (embedding vector_cosine_ops)
WITH (
    lists = 50
);


-- ============================================================================
-- UPDATED TIMESTAMP
-- ============================================================================

CREATE OR REPLACE FUNCTION update_knowledge_base_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS trg_knowledge_base_updated
ON knowledge_base;


CREATE TRIGGER trg_knowledge_base_updated
BEFORE UPDATE ON knowledge_base
FOR EACH ROW
EXECUTE FUNCTION update_knowledge_base_timestamp();


-- ============================================================================
-- RLS SUPABASE
-- ============================================================================

ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;


DROP POLICY IF EXISTS knowledge_base_read_authenticated
ON knowledge_base;


CREATE POLICY knowledge_base_read_authenticated
ON knowledge_base
FOR SELECT
TO authenticated
USING (true);


-- ============================================================================
-- FIN MIGRATION
-- ============================================================================