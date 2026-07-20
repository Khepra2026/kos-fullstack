BEGIN;
-- Force RLS
ALTER TABLE public.kos_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kos_audit_log FORCE ROW LEVEL SECURITY;

-- Supprime toutes les policies existantes pour repartir clean
DROP POLICY IF EXISTS audit_read_anon ON public.kos_audit_log;
DROP POLICY IF EXISTS audit_insert_service ON public.kos_audit_log;
DROP POLICY IF EXISTS anon_read_audit ON public.kos_audit_log;

-- Policy SELECT pour auditeurs externes Big Four
CREATE POLICY audit_read_anon ON public.kos_audit_log
FOR SELECT TO anon
USING (true);

-- Policy INSERT backend only
CREATE POLICY audit_insert_service ON public.kos_audit_log
FOR INSERT TO service_role
WITH CHECK (true);

-- Grants explicites Big Four COBAC
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.kos_audit_log TO anon;
GRANT ALL ON public.kos_audit_log TO service_role;

COMMIT;
