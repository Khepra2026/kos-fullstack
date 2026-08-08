-- Vérification finale RLS pour PV
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled,
  (SELECT count(*) FROM pg_tables WHERE schemaname='public') as total_tables
FROM pg_tables 
WHERE schemaname='public'
ORDER BY tablename;

-- Si count(rowsecurity=true) = total_tables => GO
