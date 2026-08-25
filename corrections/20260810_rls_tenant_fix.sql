-- 20260810_rls_tenant_fix.sql - Big Four Fix for RLS tenant isolation
-- Remplace policy permissive "read all" USING true par isolation tenant

-- Activer RLS (deja fait mais securise)
ALTER TABLE public.kos_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kos_regulatory_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kos_veille_reglementaire ENABLE ROW LEVEL SECURITY;

-- Supprimer ancienne policy permissive
DROP POLICY IF EXISTS "read all" ON public.kos_documents;
DROP POLICY IF EXISTS "read all" ON public.kos_regulatory_sources;
DROP POLICY IF EXISTS "read all" ON public.kos_veille_reglementaire;
DROP POLICY IF EXISTS "allow all" ON public.kos_documents;

-- Nouvelle policy tenant isolation - lecture
CREATE POLICY "tenant_isolation_read" ON public.kos_documents
FOR SELECT USING (
  tenant_id = auth.uid() OR 
  (auth.jwt() ->> 'role') = 'admin' OR
  (auth.jwt() ->> 'role') = 'super_admin'
);

CREATE POLICY "tenant_isolation_read_sources" ON public.kos_regulatory_sources
FOR SELECT USING (
  tenant_id = auth.uid() OR 
  (auth.jwt() ->> 'role') IN ('admin','manager','super_admin')
);

CREATE POLICY "tenant_isolation_read_veille" ON public.kos_veille_reglementaire
FOR SELECT USING (
  tenant_id = auth.uid() OR 
  (auth.jwt() ->> 'role') IN ('admin','manager','super_admin')
);

-- Insert tenant isolation
CREATE POLICY "tenant_isolation_insert" ON public.kos_documents
FOR INSERT WITH CHECK ( tenant_id = auth.uid() );

-- Tests RLS (a executer)
-- USER A -> DATA A = ALLOW
-- USER B -> DATA B = ALLOW  
-- USER A -> DATA B = DENY (critique)
