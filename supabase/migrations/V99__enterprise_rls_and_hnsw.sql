ALTER TABLE IF EXISTS public.client_workspaces ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS tenant_isolation_policy ON public.client_workspaces;
CREATE POLICY tenant_isolation_policy ON public.client_workspaces
    FOR ALL
    USING (auth.uid() = tenant_id OR current_setting('request.jwt.claim.role', true) = 'service_role');
CREATE INDEX IF NOT EXISTS idx_vector_store_hnsw ON public.vector_store USING hnsw (embedding vector_cosine_ops);
