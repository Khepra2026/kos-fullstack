-- ============================================================================
-- KHEPRA REGULATOR FEED MONITOR — Veille Big Four automatisée
-- Snippet original : Meta AI (Cloudflare + Vercel ISR)
-- Adaptation KHEPRA : Supabase pg_net + pg_cron + Netlify Cache Purge
-- ============================================================================
-- Sources monitorées : BCEAO, COBAC, OHADA
-- SLA Big Four : check toutes les 5 minutes
-- Détection : SHA256 hash du contenu — si changement → crawl → regen → purge
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. TABLE REGULATOR_FEED — Sources réglementaires Big Four
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.regulator_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,                     -- 'BCEAO', 'COBAC', 'OHADA'
  feed_url text NOT NULL,                 -- URL page à scraper
  last_hash text,                         -- SHA256 du dernier contenu
  last_check timestamptz DEFAULT now(),
  check_interval interval DEFAULT '5 minutes',  -- SLA Big Four
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_regulator_feed_name ON public.regulator_feed(name);
CREATE INDEX IF NOT EXISTS idx_regulator_feed_active ON public.regulator_feed(is_active) WHERE is_active = true;

-- RLS : lecture publique, écriture service_role
ALTER TABLE public.regulator_feed ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "regulator_feed_select_all"
  ON public.regulator_feed FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "regulator_feed_insert_service"
  ON public.regulator_feed FOR INSERT
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

CREATE POLICY IF NOT EXISTS "regulator_feed_update_service"
  ON public.regulator_feed FOR UPDATE
  USING (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- ----------------------------------------------------------------------------
-- 2. SEED — Sources régulateurs Big Four
-- ----------------------------------------------------------------------------
INSERT INTO public.regulator_feed (name, feed_url) VALUES
  ('BCEAO', 'https://www.bceao.int/fr/reglementations'),
  ('COBAC', 'https://www.beac.int/cobac/reglementation/'),
  ('OHADA', 'https://www.ohada.org/actualites/')
ON CONFLICT DO NOTHING;

-- Alimenter kb_sources si pas déjà présent (pour le crawler existant)
INSERT INTO public.kb_sources (id, name, url, type, priority, bigfour_weight, created_at, updated_at)
SELECT gen_random_uuid(), 'BCEAO — Réglementations officielles', 'https://www.bceao.int/fr/reglementations',
       'regulator', 100, 100, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM public.kb_sources WHERE url = 'https://www.bceao.int/fr/reglementations');

INSERT INTO public.kb_sources (id, name, url, type, priority, bigfour_weight, created_at, updated_at)
SELECT gen_random_uuid(), 'COBAC — Réglementation bancaire CEMAC', 'https://www.beac.int/cobac/reglementation/',
       'regulator', 100, 100, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM public.kb_sources WHERE url = 'https://www.beac.int/cobac/reglementation/');

INSERT INTO public.kb_sources (id, name, url, type, priority, bigfour_weight, created_at, updated_at)
SELECT gen_random_uuid(), 'OHADA — Actualités droit des affaires', 'https://www.ohada.org/actualites/',
       'regulator', 100, 100, now(), now()
WHERE NOT EXISTS (SELECT 1 FROM public.kb_sources WHERE url = 'https://www.ohada.org/actualites/');

-- ----------------------------------------------------------------------------
-- 3. TABLE LOG — Traçabilité Big Four (audit trail)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.regulator_feed_log (
  id BIGSERIAL PRIMARY KEY,
  regulator_name text NOT NULL,
  feed_url text NOT NULL,
  old_hash text,
  new_hash text,
  content_changed boolean DEFAULT false,
  crawl_triggered boolean DEFAULT false,
  regen_triggered boolean DEFAULT false,
  cache_purged boolean DEFAULT false,
  response_ms integer,
  error_message text,
  checked_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_regulator_feed_log_checked_at ON public.regulator_feed_log(checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_regulator_feed_log_changed ON public.regulator_feed_log(content_changed, checked_at DESC);

ALTER TABLE public.regulator_feed_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "regulator_feed_log_select_all"
  ON public.regulator_feed_log FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "regulator_feed_log_insert_service"
  ON public.regulator_feed_log FOR INSERT
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- ----------------------------------------------------------------------------
-- 4. FONCTION check_regulator_updates()
-- Adaptée à notre stack : Supabase pg_net (HTTP) + Netlify (cache purge)
-- Remplace : Vercel ISR revalidate + Cloudflare purge du snippet original
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.check_regulator_updates()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  reg RECORD;
  res RECORD;
  new_hash TEXT;
  source_id UUID;
  crawl_edge_url TEXT := 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-compliance-daily-crawler';
  regen_edge_url TEXT := 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-page-regenerator';
  purge_edge_url TEXT := 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/cache-purge-handler';
  edge_token TEXT;
  start_ts TIMESTAMPTZ;
BEGIN
  -- Récupérer le token de service depuis vault ou app settings
  edge_token := COALESCE(
    current_setting('app.edge_service_token', true),
    current_setting('app.supabase_service_key', true),
    ''
  );

  FOR reg IN SELECT * FROM public.regulator_feed WHERE is_active = true
  LOOP
    start_ts := clock_timestamp();

    -- ═══════════════════════════════════════════════════
    -- ÉTAPE 1 : GET page régulateur via pg_net
    -- ═══════════════════════════════════════════════════
    BEGIN
      SELECT status_code, content INTO res.status_code, res.content
      FROM net.http_get(
        url := reg.feed_url,
        headers := jsonb_build_object(
          'User-Agent', 'KHEPRA-Regulatory-Monitor/2.0 (Big Four; +https://khepraexperts.com)',
          'Accept', 'text/html,application/xhtml+xml'
        ),
        timeout_milliseconds := 30000
      );
    EXCEPTION WHEN OTHERS THEN
      -- Log l'erreur et passe au régulateur suivant
      INSERT INTO public.regulator_feed_log(regulator_name, feed_url, content_changed, error_message, checked_at)
      VALUES (reg.name, reg.feed_url, false, SQLERRM, now());

      -- Log cron aussi
      INSERT INTO public.cron_job_logs(job_name, triggered_at, status, notes)
      VALUES ('check_regulator_updates', start_ts, 'error', reg.name || ': ' || SQLERRM);
      CONTINUE;
    END;

    -- ═══════════════════════════════════════════════════
    -- ÉTAPE 2 : Comparer le hash SHA256
    -- ═══════════════════════════════════════════════════
    IF res.status_code = 200 AND res.content IS NOT NULL THEN
      new_hash := encode(digest(res.content, 'sha256'), 'hex');

      IF new_hash IS DISTINCT FROM reg.last_hash THEN
        -- ═══════════════════════════════════════════════════
        -- ÉTAPE 3 : Nouveau contenu → Crawler la source
        -- ═══════════════════════════════════════════════════
        BEGIN
          -- Trouver le kb_source correspondant
          SELECT id INTO source_id FROM public.kb_sources
          WHERE url = reg.feed_url
          LIMIT 1;

          IF source_id IS NOT NULL THEN
            -- Appeler le crawler existant KOS Compliance Daily Crawler
            SELECT status_code INTO res.status_code
            FROM net.http_post(
              url := crawl_edge_url,
              headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', 'Bearer ' || edge_token,
                'X-KOS-Source', 'regulator-feed-monitor'
              ),
              body := jsonb_build_object(
                'source_id', source_id,
                'regulator', reg.name,
                'priority', 'high'
              ),
              timeout_milliseconds := 60000
            );
          END IF;

          -- ═══════════════════════════════════════════════════
          -- ÉTAPE 4 : KOS AI regen pages impactées
          -- ═══════════════════════════════════════════════════
          BEGIN
            PERFORM net.http_post(
              url := regen_edge_url,
              headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', 'Bearer ' || edge_token
              ),
              body := jsonb_build_object(
                'regulator', reg.name,
                'source_hash', new_hash
              ),
              timeout_milliseconds := 120000
            );
          EXCEPTION WHEN OTHERS THEN
            -- Regen failure is non-blocking — le contenu est déjà crawlé
            NULL;
          END;

          -- ═══════════════════════════════════════════════════
          -- ÉTAPE 5 : Purge cache Netlify par Cache-Tag
          -- Appelle notre Edge Function cache-purge-handler
          -- qui purge Netlify (et Cloudflare si configuré)
          -- ═══════════════════════════════════════════════════
          BEGIN
            PERFORM net.http_post(
              url := purge_edge_url,
              headers := jsonb_build_object(
                'Content-Type', 'application/json',
                'Authorization', 'Bearer ' || edge_token
              ),
              body := jsonb_build_object(
                'slug', 'regulatory',
                'table', 'regulator_feed',
                'operation', 'bulk_purge',
                'cache_tags', jsonb_build_array('khepra', 'kos-ai', 'page', 'regulatory', reg.name)
              ),
              timeout_milliseconds := 30000
            );
          EXCEPTION WHEN OTHERS THEN
            -- Cache purge failure is non-blocking
            NULL;
          END;

          -- Log succès avec changement détecté
          INSERT INTO public.regulator_feed_log(
            regulator_name, feed_url, old_hash, new_hash,
            content_changed, crawl_triggered, regen_triggered, cache_purged,
            response_ms, checked_at
          ) VALUES (
            reg.name, reg.feed_url, reg.last_hash, new_hash,
            true, true, true, true,
            EXTRACT(MILLISECONDS FROM (clock_timestamp() - start_ts))::integer,
            now()
          );

          -- Mettre à jour le hash et le timestamp
          UPDATE public.regulator_feed
          SET last_hash = new_hash, last_check = now()
          WHERE id = reg.id;

        EXCEPTION WHEN OTHERS THEN
          INSERT INTO public.regulator_feed_log(
            regulator_name, feed_url, old_hash, new_hash,
            content_changed, crawl_triggered, error_message, checked_at
          ) VALUES (
            reg.name, reg.feed_url, reg.last_hash, new_hash,
            true, false, SQLERRM, now()
          );
        END;

      ELSE
        -- Pas de changement — log léger
        INSERT INTO public.regulator_feed_log(
          regulator_name, feed_url, old_hash, new_hash,
          content_changed, checked_at, response_ms
        ) VALUES (
          reg.name, reg.feed_url, reg.last_hash, new_hash,
          false, now(),
          EXTRACT(MILLISECONDS FROM (clock_timestamp() - start_ts))::integer
        );

        -- Mettre à jour last_check même sans changement
        UPDATE public.regulator_feed
        SET last_check = now()
        WHERE id = reg.id;
      END IF;

    ELSE
      -- HTTP non-200
      INSERT INTO public.regulator_feed_log(
        regulator_name, feed_url, content_changed, error_message, checked_at
      ) VALUES (
        reg.name, reg.feed_url, false,
        'HTTP ' || res.status_code,
        now()
      );
    END IF;

  END LOOP;

  -- Log cron succès global
  INSERT INTO public.cron_job_logs(job_name, triggered_at, status, notes)
  VALUES ('check_regulator_updates', start_ts, 'success', 'All regulators checked');
END;
$$;

-- ----------------------------------------------------------------------------
-- 5. PLANIFICATION CRON — Toutes les 5 minutes (SLA Big Four)
-- ----------------------------------------------------------------------------
-- NOTE: pg_cron doit être activé. Si pas activé:
--   - Va dans Supabase Dashboard → Database → Extensions → active pg_cron
--   - Ou exécute: CREATE EXTENSION IF NOT EXISTS pg_cron;
-- ----------------------------------------------------------------------------
SELECT cron.schedule(
  'check-regulator-updates',    -- job name
  '*/5 * * * *',                -- every 5 minutes (SLA Big Four)
  'SELECT public.check_regulator_updates();'
);

-- ----------------------------------------------------------------------------
-- 6. CONFIGURATION SECRETS (à exécuter dans SQL Editor)
-- ----------------------------------------------------------------------------
-- ALTER DATABASE postgres SET app.edge_service_token = 'TON_SUPABASE_SERVICE_ROLE_KEY';
-- ALTER DATABASE postgres SET app.supabase_service_key = 'TON_SUPABASE_SERVICE_ROLE_KEY';

-- ----------------------------------------------------------------------------
-- 7. VÉRIFICATION POST-INSTALL
-- ----------------------------------------------------------------------------
-- Lister les régulateurs:
-- SELECT * FROM public.regulator_feed;

-- Voir l'historique des checks:
-- SELECT * FROM public.regulator_feed_log ORDER BY checked_at DESC LIMIT 20;

-- Voir les changements détectés uniquement:
-- SELECT * FROM public.regulator_feed_log WHERE content_changed = true ORDER BY checked_at DESC;

-- Voir le statut du cron job:
-- SELECT * FROM cron.job_run_details WHERE jobid = (SELECT jobid FROM cron.job WHERE jobname = 'check-regulator-updates') ORDER BY runid DESC LIMIT 5;

-- Forcer un check manuel:
-- SELECT public.check_regulator_updates();

-- Désactiver le cron job temporairement:
-- SELECT cron.unschedule('check-regulator-updates');

-- Réactiver:
-- SELECT cron.schedule('check-regulator-updates', '*/5 * * * *', 'SELECT public.check_regulator_updates();');
-- ----------------------------------------------------------------------------