-- supabase/migrations/20260827_rls_hardening_production.sql
ALTER TABLE public.kos_documents ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "read all" ON public.kos_documents;
CREATE POLICY "authenticated_read" ON public.kos_documents FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
CREATE POLICY "service_role_all" ON public.kos_documents FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
ALTER TABLE public.kos_regulatory_sources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "public_read_sources" ON public.kos_regulatory_sources;
CREATE POLICY "public_read_sources" ON public.kos_regulatory_sources FOR SELECT USING (true);
DROP POLICY IF EXISTS "service_write_sources" ON public.kos_regulatory_sources;
CREATE POLICY "service_write_sources" ON public.kos_regulatory_sources FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');
