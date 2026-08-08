-- KHEpra BigFour RLS - Toutes tables public - J3-J14
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP
    EXECUTE 'ALTER TABLE public.'||quote_ident(r.tablename)||' ENABLE ROW LEVEL SECURITY;';
    RAISE NOTICE 'RLS enabled on %', r.tablename;
  END LOOP;
END $$;

-- Verif
SELECT tablename, rowsecurity, count(*) OVER () as total_tables 
FROM pg_tables 
WHERE schemaname='public';

-- Politique tenant isolation exemple (à adapter)
-- CREATE POLICY tenant_isolation ON kos_documents FOR ALL USING (tenant_id = auth.jwt()->>'tenant_id');
