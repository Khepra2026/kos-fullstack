-- ============================================================
-- Migration : RLS Strict kb_docs + kos_agents — Auto-Deploy
-- Date: 2026-07-05
-- Auteur: KOS AI Security Layer
-- ============================================================
-- Cette migration corrige le hardening du 2026-07-04 qui etait
-- en commentaire "manuel obligatoire". Ici tout s'execute
-- automatiquement via supabase db push.
-- ============================================================

-- ============================================================
-- 1. RLS STRICT : kb_docs — Read-only pour authenticated
-- ============================================================

ALTER TABLE public.kb_docs ENABLE ROW LEVEL SECURITY;

-- Supprimer anciennes policies si existantes
DROP POLICY IF EXISTS "kb_docs_authenticated_select" ON public.kb_docs;
DROP POLICY IF EXISTS "kb_docs_service_all" ON public.kb_docs;
DROP POLICY IF EXISTS "kos_read_only" ON public.kb_docs;
DROP POLICY IF EXISTS "kb_docs_anon_select" ON public.kb_docs;

-- Policy : authenticated = SELECT uniquement
CREATE POLICY "kb_docs_authenticated_select"
  ON public.kb_docs
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy : service_role = ALL (pour Edge Functions, embedder, etc.)
CREATE POLICY "kb_docs_service_all"
  ON public.kb_docs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Revoke explicite : authenticated ne peut PAS modifier
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON public.kb_docs
  FROM authenticated;

-- Revoke total pour anon
REVOKE ALL ON public.kb_docs FROM anon;

COMMENT ON TABLE public.kb_docs IS
  'Documents RAG Big Four — Acces lecture seule authenticated, service_role total, anon bloque.';

-- ============================================================
-- 2. RLS STRICT : kos_agents — Read-only pour authenticated
-- ============================================================

ALTER TABLE public.kos_agents ENABLE ROW LEVEL SECURITY;

-- Supprimer anciennes policies si existantes
DROP POLICY IF EXISTS "kos_agents_authenticated_select" ON public.kos_agents;
DROP POLICY IF EXISTS "kos_agents_service_all" ON public.kos_agents;
DROP POLICY IF EXISTS "kos_agents_anon_select" ON public.kos_agents;

-- Policy : authenticated = SELECT uniquement
CREATE POLICY "kos_agents_authenticated_select"
  ON public.kos_agents
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy : service_role = ALL (pour Edge Functions de retrain, update version, etc.)
CREATE POLICY "kos_agents_service_all"
  ON public.kos_agents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Revoke explicite : authenticated ne peut PAS modifier
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON public.kos_agents
  FROM authenticated;

-- Revoke total pour anon
REVOKE ALL ON public.kos_agents FROM anon;

COMMENT ON TABLE public.kos_agents IS
  'Configuration agents KOS AI — Acces lecture seule authenticated, service_role total (retrain/update), anon bloque.';

-- ============================================================
-- 3. Log securite : enregistrer l'activation RLS
-- ============================================================

INSERT INTO public.security_log (event, details)
VALUES (
  'rls_activated',
  jsonb_build_object(
    'tables', jsonb_build_array('kb_docs', 'kos_agents'),
    'timestamp', now(),
    'migration', '20260705_rls_kb_docs_kos_agents'
  )
)
ON CONFLICT DO NOTHING;