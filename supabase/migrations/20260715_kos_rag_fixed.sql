-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. DOCUMENTS CRAWLED
CREATE TABLE IF NOT EXISTS public.kos_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid,
  url text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  content_hash text,
  lang_code text DEFAULT 'fr',
  doc_type text,
  pub_date date,
  embedding vector(1024),
  bigfour_metadata jsonb,
  iso_tags text[],
  created_at timestamptz DEFAULT now(),
  UNIQUE(url)
);

-- 3. KNOWLEDGE BASE RAG
CREATE TABLE IF NOT EXISTS public.knowledge_base (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  article_ref TEXT,
  authority TEXT NOT NULL CHECK (authority IN ('COBAC','OHADA','BEAC','BCEAO','CEMAC')),
  agent_name TEXT NOT NULL,
  embedding VECTOR(1024),
  data_residency TEXT DEFAULT 'CEMAC' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT sovereignty_check CHECK (data_residency = 'CEMAC')
);

-- 4. INDEX HNSW
CREATE INDEX IF NOT EXISTS idx_kb_embedding ON knowledge_base USING hnsw (embedding vector_cosine_ops);

-- 5. FONCTION RAG MATCH
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

-- 6. RLS SOUVERAIN
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sovereign_read" ON knowledge_base;
CREATE POLICY "sovereign_read" ON knowledge_base FOR SELECT USING (data_residency = 'CEMAC');

-- 7. AUDIT TRAIL 10 ANS COBAC
CREATE TABLE IF NOT EXISTS public.knowledge_audit (
  id BIGSERIAL PRIMARY KEY,
  document_id BIGINT REFERENCES knowledge_base(id),
  accessed_by TEXT,
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);
