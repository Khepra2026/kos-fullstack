-- ============================================================================
-- KOS RLS FIX
-- Migration : 20260717_rls_fix.sql
-- Objectif : Correction policies Supabase Knowledge Base
-- Mode : Production / Idempotent
-- Sécurité : RLS activé
-- ============================================================================


-- Vérification activation RLS
ALTER TABLE public.knowledge_base
ENABLE ROW LEVEL SECURITY;


-- ============================================================================
-- POLICY INSERT SERVICE ROLE
-- ============================================================================

DROP POLICY IF EXISTS "service_role_insert"
ON public.knowledge_base;


CREATE POLICY "service_role_insert"
ON public.knowledge_base
FOR INSERT
TO service_role
WITH CHECK (true);



-- ============================================================================
-- POLICY SELECT SERVICE ROLE
-- ============================================================================

DROP POLICY IF EXISTS "service_role_select"
ON public.knowledge_base;


CREATE POLICY "service_role_select"
ON public.knowledge_base
FOR SELECT
TO service_role
USING (true);



-- ============================================================================
-- POLICY UPDATE SERVICE ROLE
-- ============================================================================

DROP POLICY IF EXISTS "service_role_update"
ON public.knowledge_base;


CREATE POLICY "service_role_update"
ON public.knowledge_base
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);



-- ============================================================================
-- AUDIT
-- ============================================================================

COMMENT ON TABLE public.knowledge_base IS
'KOS Regulatory RAG Knowledge Base - COBAC/OHADA/BEAC/BCEAO - RLS Protected';