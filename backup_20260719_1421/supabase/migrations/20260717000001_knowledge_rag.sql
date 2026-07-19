-- Enable pgvector pour embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Table knowledge_base - 10 ans rétention COBAC
CREATE TABLE knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  article_ref TEXT, -- Ex: "COBAC R-2016/04 Art. 12"
  authority TEXT NOT NULL CHECK (authority IN ('COBAC','OHADA','BEAC','BCEAO','CEMAC')),
  agent_name TEXT NOT NULL, -- Compliance_Auditor, Legal_Expert, etc.
  embedding VECTOR(1024), -- Jina embeddings v3
  data_residency TEXT DEFAULT 'CEMAC' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT sovereignty_check CHECK (data_residency = 'CEMAC')
);

-- Index HNSW pour recherche rapide
CREATE INDEX ON knowledge_base USING hnsw (embedding vector_cosine_ops);

-- Fonction RAG match
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1024),
  match_count INT DEFAULT 5,
  filter JSONB DEFAULT '{}'::jsonb
)
RETURNS TABLE (
  id BIGINT,
  title TEXT,
  content TEXT,
  article_ref TEXT,
  authority TEXT,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.title,
    kb.content,
    kb.article_ref,
    kb.authority,
    1 - (kb.embedding <=> query_embedding) AS similarity
  FROM knowledge_base kb
  WHERE kb.data_residency = 'CEMAC'
    AND (filter->>'agent_name' IS NULL OR kb.agent_name = filter->>'agent_name')
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS Souverain
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sovereign_read" ON knowledge_base FOR SELECT USING (data_residency = 'CEMAC');

-- Audit trail 10 ans
CREATE TABLE knowledge_audit (
  id BIGSERIAL PRIMARY KEY,
  document_id BIGINT REFERENCES knowledge_base(id),
  accessed_by TEXT, -- agent_name
  accessed_at TIMESTAMPTZ DEFAULT NOW()
) WITH (timescale.retention = '10 years');
