-- BIG FOUR HARDENING AUTO
DO $$ DECLARE t text; BEGIN FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY; ALTER TABLE public.%I FORCE ROW LEVEL SECURITY;', t,t); END LOOP; END $$;
CREATE TABLE IF NOT EXISTS public.audit_log (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid, action text, payload jsonb, created_at timestamptz DEFAULT now());
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;
REVOKE UPDATE, DELETE ON public.audit_log FROM PUBLIC, anon, authenticated;
CREATE TABLE IF NOT EXISTS public.evidence_packs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), tenant_id uuid, pack_hash text, created_at timestamptz DEFAULT now());
ALTER TABLE public.documents ADD COLUMN IF NOT EXISTS human_review_required boolean DEFAULT true;
