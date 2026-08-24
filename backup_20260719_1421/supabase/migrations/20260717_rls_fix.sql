-- Ajouter policy INSERT manquante
CREATE POLICY "service_role_insert" ON knowledge_base
FOR INSERT
TO service_role
WITH CHECK (true);

-- Ou désactiver RLS temporairement pour debug
ALTER TABLE knowledge_base DISABLE ROW LEVEL SECURITY;
