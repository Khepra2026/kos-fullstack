-- ============================================================================
-- KHEPRA — BCEAO Circulars Scraper Cron + pg_net Integration
-- ============================================================================
-- Objectif : Executer quotidiennement kos-bceao-circulars-scraper via pg_cron
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. FONCTION — Declencher le scraper BCEAO via pg_net (HTTP POST)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.trigger_bceao_scraper()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_project_ref text;
  v_url text;
  v_token text;
  v_result int;
BEGIN
  -- Recuperer le project ref depuis la config
  v_project_ref := COALESCE(
    current_setting('app.supabase_project_ref', true),
    'pgfwhahiwqvqeahpirjx'
  );

  v_url := 'https://' || v_project_ref || '.supabase.co/functions/v1/kos-bceao-circulars-scraper';
  v_token := current_setting('app.supabase_service_role', true);

  IF v_token IS NULL OR v_token = '' THEN
    RAISE NOTICE '[BCEAO-CRON] Service role token non configure. Scraper non declenche.';
    RETURN;
  END IF;

  -- Appel HTTP vers l'Edge Function via pg_net
  SELECT net.http_post(
    v_url,
    '{}',
    NULL,
    jsonb_build_object(
      'Authorization', 'Bearer ' || v_token,
      'Content-Type', 'application/json'
    ),
    30000
  ) INTO v_result;

  RAISE NOTICE '[BCEAO-CRON] Scraper declenche. Request ID: %', v_result;
END;
$$;

-- ----------------------------------------------------------------------------
-- 2. FONCTION — Declencher le scraper BCEAO via pg_net (version alternative JWT)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.trigger_bceao_scraper_jwt(p_jwt_token text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_project_ref text;
  v_url text;
  v_token text;
  v_result int;
BEGIN
  v_project_ref := COALESCE(
    current_setting('app.supabase_project_ref', true),
    'pgfwhahiwqvqeahpirjx'
  );

  v_url := 'https://' || v_project_ref || '.supabase.co/functions/v1/kos-bceao-circulars-scraper';
  v_token := COALESCE(p_jwt_token, current_setting('app.supabase_service_role', true));

  IF v_token IS NULL OR v_token = '' THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'JWT token requis. Passez le token en argument ou configurez app.supabase_service_role'
    );
  END IF;

  SELECT net.http_post(
    v_url,
    '{}',
    NULL,
    jsonb_build_object(
      'Authorization', 'Bearer ' || v_token,
      'Content-Type', 'application/json'
    ),
    30000
  ) INTO v_result;

  RETURN jsonb_build_object(
    'success', true,
    'request_id', v_result,
    'url', v_url,
    'triggered_at', now()
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 3. CONFIGURATION GUC — app.supabase_project_ref
-- ----------------------------------------------------------------------------

DO $$
BEGIN
  PERFORM set_config('app.supabase_project_ref', 'pgfwhahiwqvqeahpirjx', false);
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'GUC app.supabase_project_ref deja configure ou non supporte';
END;
$$;

-- ----------------------------------------------------------------------------
-- 4. CRON JOB — Execution quotidienne 6h UTC
-- ----------------------------------------------------------------------------

SELECT cron.schedule(
  'bceao-circulars-daily-scrape',
  '0 6 * * *',
  'SELECT public.trigger_bceao_scraper_jwt(NULL)'
);

-- ----------------------------------------------------------------------------
-- 5. CRON JOB — Execution manuelle (test) toutes les 5 minutes (desactive par defaut)
--    Decommenter pour test, puis supprimer apres validation
-- ----------------------------------------------------------------------------

-- SELECT cron.schedule(
--   'bceao-circulars-test-scrape',
--   '*/5 * * * *',
--   'SELECT public.trigger_bceao_scraper_jwt(NULL)'
-- );

-- ----------------------------------------------------------------------------
-- 6. VIEW — Monitoring des executions du scraper
-- ----------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.v_bceao_scraper_monitor AS
SELECT
  run_id,
  source,
  url,
  status,
  records_count,
  error_count,
  created_at,
  CASE
    WHEN status = 'success' THEN 'Vert'
    WHEN status = 'partial' THEN 'Orange'
    ELSE 'Rouge'
  END AS health_indicator
FROM public.kos_compliance_crawl_logs
WHERE source = 'bceao.int'
ORDER BY created_at DESC;

-- ----------------------------------------------------------------------------
-- 7. COMMENTAIRES DOCUMENTATION
-- ----------------------------------------------------------------------------

COMMENT ON FUNCTION public.trigger_bceao_scraper IS
  'Declenche le scraper BCEAO via pg_net HTTP POST vers l Edge Function kos-bceao-circulars-scraper. Requiert app.supabase_service_role.';

COMMENT ON FUNCTION public.trigger_bceao_scraper_jwt IS
  'Version avec JWT explicite. Retourne JSON avec request_id et status. Recommande pour tests manuels.';

COMMENT ON VIEW public.v_bceao_scraper_monitor IS
  'Dashboard monitoring des executions du scraper BCEAO avec code couleur santé.';

-- ----------------------------------------------------------------------------
-- 8. VERIFICATION
-- ----------------------------------------------------------------------------

SELECT
  jobname,
  schedule,
  active,
  command
FROM cron.job
WHERE jobname LIKE '%bceao%'
ORDER BY jobname;