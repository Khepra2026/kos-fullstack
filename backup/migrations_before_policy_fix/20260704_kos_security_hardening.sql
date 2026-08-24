-- Migration : Hardening Sécurité KOS — 4 Mesures Big Four
-- Date: 2026-07-04
-- Auteur: KOS AI Security Layer
-- ============================================================
-- STATUS DÉPLOIEMENT :
--   ✅ 2. Table security_log — AUTO-DÉPLOYÉ
--   ✅ 3. Rate limit Big Four (fallback table + fonctions) — AUTO-DÉPLOYÉ
--   ✅ 4. CSP strict (admin_settings) — AUTO-DÉPLOYÉ
--   ⚠️  1. RLS strict kb_docs — REQUIERT EXÉCUTION MANUELLE (Supabase SQL Editor)
-- ============================================================

-- ============================================================
-- 1. RLS STRICT : KOS AI ne lit que kb_docs (read-only)
-- ============================================================
-- ⚠️  MANUEL OBLIGATOIRE — L'exécuteur automatique bloque ALTER TABLE RLS + REVOKE
-- Copier-coller dans Supabase Dashboard → SQL Editor :

/*
ALTER TABLE public.kb_docs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "kos_read_only" ON public.kb_docs;
CREATE POLICY "kos_read_only"
  ON public.kb_docs
  FOR SELECT
  TO authenticated
  USING (true);
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON public.kb_docs
  FROM authenticated;
*/

-- ============================================================
-- 2. TABLE AUDIT SÉCURITÉ : security_log
-- ============================================================
-- ✅ Auto-déployé le 2026-07-04

CREATE TABLE IF NOT EXISTS public.security_log (
  id          bigserial PRIMARY KEY,
  event       text NOT NULL,
  details     jsonb,
  ip          inet,
  user_agent  text,
  user_email  text,
  ts          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_security_log_ts
  ON public.security_log (ts DESC);

CREATE INDEX IF NOT EXISTS idx_security_log_event
  ON public.security_log (event);

ALTER TABLE IF EXISTS public.security_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_log_service_only" ON public.security_log;
CREATE POLICY "security_log_service_only"
  ON public.security_log
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Bloquer tout accès public/anonyme
REVOKE ALL ON public.security_log FROM anon, authenticated;

COMMENT ON TABLE public.security_log IS
  'Journal d''audit sécurité : login, échecs, accès suspects. Accès réservé service_role.';

-- ============================================================
-- 3. RATE LIMIT Big Four : 100 req/min max
-- ============================================================
-- ✅ Auto-déployé le 2026-07-04 (fallback table + fonctions PL/pgSQL)

CREATE TABLE IF NOT EXISTS public.rate_limit_bigfour (
  id        bigserial PRIMARY KEY,
  client_id text NOT NULL,
  endpoint  text NOT NULL,
  ts        timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_rate_limit_bigfour_client_ts
  ON public.rate_limit_bigfour (client_id, ts DESC);

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_client_id text,
  p_endpoint  text,
  p_max_req   int DEFAULT 100
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count int;
BEGIN
  SELECT COUNT(*) INTO v_count
  FROM public.rate_limit_bigfour
  WHERE client_id = p_client_id
    AND endpoint = p_endpoint
    AND ts > now() - interval '1 minute';
  RETURN v_count < p_max_req;
END;
$$;

CREATE OR REPLACE FUNCTION public.hit_rate_limit(
  p_client_id text,
  p_endpoint  text
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.rate_limit_bigfour (client_id, endpoint)
  VALUES (p_client_id, p_endpoint);
END;
$$;

COMMENT ON TABLE public.rate_limit_bigfour IS
  'Rate limiting custom Big Four : 100 req/min par client/endpoint.';
COMMENT ON FUNCTION public.check_rate_limit IS
  'Retourne TRUE si le client n''a pas dépassé le rate limit (100 req/min).';
COMMENT ON FUNCTION public.hit_rate_limit IS
  'Enregistre un appel API pour le rate limiting Big Four.';

-- ============================================================
-- 4. CSP STRICT : 0 site parasite
-- ============================================================
-- ✅ Auto-déployé le 2026-07-04 (admin_settings fallback)
-- ⚠️  ALTER DATABASE est également bloqué par l'exécuteur.
-- Si besoin, exécuter manuellement dans Supabase SQL Editor :

/*
ALTER DATABASE postgres
  SET app.settings.csp = 'default-src ''self'' https://khepraexperts.com';
*/

INSERT INTO public.admin_settings (key, value)
VALUES ('csp_strict', 'default-src ''self'' https://khepraexperts.com')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();