-- KOS Big Four FIX - RLS Permissive USING true -> tenant isolation
-- CDC §12-14: Multi-tenant RLS obligatoire
-- A exécuter dans Supabase SQL Editor

-- 1. Drop policies permissives dangereuses
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN 
    SELECT schemaname, tablename, policyname 
    FROM pg_policies 
    WHERE qual = '(true)' OR with_check = '(true)'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
    RAISE NOTICE 'Dropped permissive policy % on %.%', r.policyname, r.schemaname, r.tablename;
  END LOOP;
END $$;

-- 2. Exemple FIX pour table documents (adapte à tes tables)
-- Remplace par tenant_id = auth.uid() ou tenant_id = current_setting('app.tenant_id')

-- Pour chaque table sensible, crée policy isolée:
-- CREATE POLICY "tenant_isolation" ON public.documents
-- FOR ALL USING (tenant_id = auth.uid()::text) WITH CHECK (tenant_id = auth.uid()::text);

-- 3. Active RLS sur toutes les tables
-- ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Vérifie qu'il ne reste plus de USING true
SELECT schemaname, tablename, policyname, qual, with_check 
FROM pg_policies 
WHERE qual = '(true)' OR with_check = '(true)';
-- Doit retourner 0 lignes après fix
