-- Fonctions RPC: quotas AI + RAG local KOS Automaton
-- Deployed: 2026-07-06

-- Reset quotidien des quotas AI
CREATE OR REPLACE FUNCTION reset_ai_quotas_daily()
RETURNS void AS $$
BEGIN
  UPDATE public.ai_providers
  SET used_today = 0, last_reset = CURRENT_DATE
  WHERE last_reset < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RAG local 100% autonome pour fallback kos-automaton
-- Utilise la recherche full-text sur rag_documents (tsvector) - zero API externe
CREATE OR REPLACE FUNCTION kos_local_rag(query text)
RETURNS jsonb AS $$
DECLARE
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'answer', COALESCE(d.content, d.title),
    'source', COALESCE(d.url, d.source_id::text),
    'title', d.title,
    'confidence', ts_rank(d.search_vector, websearch_to_tsquery('french', query))
  ) INTO result
  FROM rag_documents d
  WHERE d.is_active = true
    AND d.search_vector IS NOT NULL
    AND websearch_to_tsquery('french', query) @@ d.search_vector
  ORDER BY ts_rank(d.search_vector, websearch_to_tsquery('french', query)) DESC
  LIMIT 1;

  RETURN COALESCE(result, '{"answer":"Donnee non disponible dans KOS local"}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;