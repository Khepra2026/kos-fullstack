BEGIN;
ALTER TABLE public.kos_audit_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS audit_read_anon ON public.kos_audit_log;
CREATE POLICY audit_read_anon ON public.kos_audit_log FOR SELECT TO anon USING (true);
DROP POLICY IF EXISTS audit_insert_service ON public.kos_audit_log;
CREATE POLICY audit_insert_service ON public.kos_audit_log FOR INSERT TO service_role WITH CHECK (true);
GRANT SELECT ON public.kos_audit_log TO anon;
GRANT ALL ON public.kos_audit_log TO service_role;
COMMIT;
