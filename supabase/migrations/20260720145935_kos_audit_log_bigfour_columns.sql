BEGIN;
-- Ajoute les colonnes ISO27001/COBAC si absentes
ALTER TABLE public.kos_audit_log ADD COLUMN IF NOT EXISTS agent text;
ALTER TABLE public.kos_audit_log ADD COLUMN IF NOT EXISTS org_id text;
ALTER TABLE public.kos_audit_log ADD COLUMN IF NOT EXISTS action text;
ALTER TABLE public.kos_audit_log ADD COLUMN IF NOT EXISTS payload_hash text;
ALTER TABLE public.kos_audit_log ADD COLUMN IF NOT EXISTS ts timestamptz DEFAULT now();

-- Index Big Four pour audit rapide
CREATE INDEX IF NOT EXISTS idx_kos_audit_log_ts ON public.kos_audit_log (ts DESC);
CREATE INDEX IF NOT EXISTS idx_kos_audit_log_org ON public.kos_audit_log (org_id);
CREATE INDEX IF NOT EXISTS idx_kos_audit_log_agent ON public.kos_audit_log (agent);

-- RLS Final Big Four
ALTER TABLE public.kos_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kos_audit_log FORCE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS audit_read_anon ON public.kos_audit_log;
DROP POLICY IF EXISTS audit_insert_service ON public.kos_audit_log;

CREATE POLICY audit_read_anon ON public.kos_audit_log
FOR SELECT TO anon
USING (true);

CREATE POLICY audit_insert_service ON public.kos_audit_log
FOR INSERT TO service_role
WITH CHECK (true);

GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.kos_audit_log TO anon;
GRANT ALL ON public.kos_audit_log TO service_role;

COMMIT;
