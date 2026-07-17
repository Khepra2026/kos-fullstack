-- ============================================================================
-- KHEPRA — KOS Webhook Big Four Notifications v1.0 (Slack + Discord)
-- Adaptation du snippet Meta AI vers la stack KHEPRA
-- Corrections appliquées :
--   1. pg_net.http_post positionnel (pas nommé)
--   2. bigfour_metadata->>'regulator' = 'BCEAO' (pas -> ?)
--   3. RETURN NULL dans statement trigger (pas RETURN NEW)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. AJOUT COLONNES MANQUANTES à kb_pages
-- ----------------------------------------------------------------------------

ALTER TABLE public.kb_pages
  ADD COLUMN IF NOT EXISTS last_updated timestamptz,
  ADD COLUMN IF NOT EXISTS bigfour_metadata jsonb;

CREATE INDEX IF NOT EXISTS idx_kb_pages_last_updated
  ON public.kb_pages(last_updated);

CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour
  ON public.kb_pages(bigfour_metadata)
  WHERE bigfour_metadata IS NOT NULL;

-- Index GIN pour recherches rapides dans bigfour_metadata
CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour_gin
  ON public.kb_pages USING GIN (bigfour_metadata);

-- ----------------------------------------------------------------------------
-- 2. TABLE circular_page_map (fallback si migration 05c non exécutée)
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.circular_page_map (
  id bigserial PRIMARY KEY,
  circular_id uuid NOT NULL REFERENCES public.circulars(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('Resume','Article_Explique','Checklist','FAQ','Cas_Pratique')),
  intent text,
  priority numeric(2,1) DEFAULT 0.9,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cpm_circular_id ON public.circular_page_map(circular_id);
CREATE INDEX IF NOT EXISTS idx_cpm_type ON public.circular_page_map(type);

-- ----------------------------------------------------------------------------
-- 3. TABLE webhook_endpoints — configuration des webhooks
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.webhook_endpoints (
  id serial PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  type text CHECK (type IN ('slack','discord','generic')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Seed avec placeholders (à remplacer par les vraies URLs)
INSERT INTO public.webhook_endpoints (name, url, type) VALUES
  ('Slack Ops', 'https://hooks.slack.com/services/T000/B000/XXXX', 'slack'),
  ('Discord KOS', 'https://discord.com/api/webhooks/123/abc', 'discord')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4. TABLE webhook_notification_log — traçabilité des envois
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.webhook_notification_log (
  id bigserial PRIMARY KEY,
  endpoint_id int REFERENCES public.webhook_endpoints(id),
  event_type text NOT NULL, -- 'kb_pages_update', 'sla_violation', 'manual'
  payload jsonb,
  regulator text,
  pages_count int,
  duration_seconds int,
  sla_status text, -- 'OK', 'ALERTE', 'N/A'
  pg_net_request_id bigint,
  sent_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wnl_sent_at ON public.webhook_notification_log(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_wnl_regulator ON public.webhook_notification_log(regulator);

-- ----------------------------------------------------------------------------
-- 5. FONCTION : generate_pages_from_circular() — REGÉNÉRÉE avec last_updated
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.generate_pages_from_circular()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  m record;
  v_regulator_name text;
  v_base_slug text;
BEGIN
  -- Seulement si crawled passe de false à true
  IF NEW.crawled = true AND OLD.crawled = false THEN

    -- Récupérer le nom du régulateur
    SELECT r.name INTO v_regulator_name
    FROM public.regulators r
    WHERE r.id = NEW.regulator_id;

    -- Fallback
    IF v_regulator_name IS NULL THEN
      v_regulator_name := NEW.source_authority;
    END IF;

    -- Pour chaque mapping lié à cette circulaire
    FOR m IN
      SELECT * FROM public.circular_page_map
      WHERE circular_id = NEW.id
    LOOP
      INSERT INTO public.kb_pages (
        slug,
        title,
        meta_desc,
        h1,
        content_html,
        bigfour_metadata,
        sitemap_priority,
        last_updated
      )
      VALUES (
        m.slug,
        NEW.title || ' — ' || m.type || ' | Khepra Experts',
        'Décryptage Big Four ' || NEW.title || ' (' || v_regulator_name || ' ' || NEW.circular_number || ') — Guide ' || m.type || ' par Khepra.',
        NEW.title || ' : ' || m.type,
        '<p class="kos-placeholder">Contenu en cours de génération par KOS AI — Big Four Engine v4.0</p>' ||
        '<div class="kos-meta">' ||
          '<span data-regulator="' || v_regulator_name || '"></span>' ||
          '<span data-circulaire="' || NEW.circular_number || '"></span>' ||
          '<span data-page-type="' || m.type || '"></span>' ||
        '</div>',
        jsonb_build_object(
          'regulator', v_regulator_name,
          'regulator_id', NEW.regulator_id,
          'circular_number', NEW.circular_number,
          'circular_title', NEW.title,
          'circular_date', NEW.date_issued,
          'official_url', NEW.official_url,
          'page_type', m.type,
          'intent', m.intent,
          'priority', m.priority,
          'themes', NEW.keywords,
          'articles_cles', NEW.articles_cles
        ),
        COALESCE(m.priority, 0.9),
        now()
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_desc = EXCLUDED.meta_desc,
        h1 = EXCLUDED.h1,
        bigfour_metadata = EXCLUDED.bigfour_metadata,
        updated_at = now(),
        last_updated = now();
    END LOOP;

  END IF;

  RETURN NEW;
END;
$$;

-- Trigger sur UPDATE de crawled (s'il existe déjà, le recréer)
DROP TRIGGER IF EXISTS trg_gen_pages_on_crawl ON public.circulars;
CREATE TRIGGER trg_gen_pages_on_crawl
  AFTER UPDATE OF crawled ON public.circulars
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_pages_from_circular();

-- ----------------------------------------------------------------------------
-- 6. FONCTION : generate_circular_page_map()
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.generate_circular_page_map(p_regulator_code text DEFAULT 'BCEAO')
RETURNS int
LANGUAGE plpgsql
AS $$
DECLARE
  c record;
  v_count int := 0;
  v_base_slug text;
  v_suffixes text[][] := ARRAY[
    ['resume', 'Resume', 'informationnel'],
    ['guide-complet', 'Article_Explique', 'informationnel'],
    ['checklist-conformite', 'Checklist', 'transactionnel'],
    ['faq', 'FAQ', 'informationnel'],
    ['cas-pratique-sfd', 'Cas_Pratique', 'transactionnel']
  ];
BEGIN
  FOR c IN
    SELECT id, circular_number, title
    FROM public.circulars
    WHERE source_authority = p_regulator_code
      AND NOT EXISTS (
        SELECT 1 FROM public.circular_page_map
        WHERE circular_id = circulars.id
      )
  LOOP
    v_base_slug := 'bigfour/' || lower(regexp_replace(c.circular_number, '[^a-zA-Z0-9]', '-', 'g'));

    FOR i IN 1..array_length(v_suffixes, 1) LOOP
      INSERT INTO public.circular_page_map (circular_id, slug, type, intent, priority)
      VALUES (
        c.id,
        v_base_slug || '-' || v_suffixes[i][1],
        v_suffixes[i][2],
        v_suffixes[i][3],
        CASE v_suffixes[i][2]
          WHEN 'Checklist' THEN 1.0
          WHEN 'Cas_Pratique' THEN 0.95
          WHEN 'Article_Explique' THEN 0.9
          WHEN 'FAQ' THEN 0.85
          ELSE 0.8
        END
      )
      ON CONFLICT (slug) DO NOTHING;

      v_count := v_count + 1;
    END LOOP;
  END LOOP;

  RETURN v_count;
END;
$$;

-- Exécution auto des mappings
SELECT generate_circular_page_map('BCEAO');

-- ----------------------------------------------------------------------------
-- 7. FONCTION : mark_circular_crawled()
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.mark_circular_crawled(p_circular_number text)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_result jsonb;
  v_count int;
BEGIN
  UPDATE public.circulars
  SET crawled = true,
      updated_at = now()
  WHERE circular_number = p_circular_number
    AND crawled = false;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  SELECT jsonb_build_object(
    'circular_number', p_circular_number,
    'rows_updated', v_count,
    'pages_in_kb', COUNT(*)
  )
  INTO v_result
  FROM public.kb_pages kp
  JOIN public.circular_page_map cpm ON cpm.slug = kp.slug
  JOIN public.circulars c ON c.id = cpm.circular_id
  WHERE c.circular_number = p_circular_number;

  RETURN v_result;
END;
$$;

-- ----------------------------------------------------------------------------
-- 8. FONCTION PRINCIPALE : notify_kos_update() — CORRIGÉE POUR KHEPRA
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.notify_kos_update()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  wh record;
  payload jsonb;
  updated_count int;
  duration int;
  start_time timestamptz;
  v_request_id bigint;
  v_sla_status text;
BEGIN
  -- ── Calcul : pages BCEAO mises à jour dans les 2 dernières minutes ──
  SELECT count(*), min(last_updated)
  INTO updated_count, start_time
  FROM public.kb_pages
  WHERE last_updated > now() - interval '2 minutes'
    AND (bigfour_metadata->>'regulator') = 'BCEAO';

  -- Si aucune page récente, on ne notifie pas (évite le bruit)
  IF updated_count = 0 OR start_time IS NULL THEN
    RETURN NULL;
  END IF;

  duration := extract(epoch from now() - start_time)::int;
  v_sla_status := CASE WHEN duration < 60 THEN 'OK' ELSE 'ALERTE' END;

  -- ── Boucle sur chaque webhook actif ──
  FOR wh IN SELECT * FROM public.webhook_endpoints WHERE active LOOP

    payload := CASE wh.type
      -- ═══════ SLACK ═══════
      WHEN 'slack' THEN jsonb_build_object(
        'text', format(
          ':white_check_mark: KOS AI Big Four : %s pages BCEAO mises à jour en %ss',
          updated_count, duration
        ),
        'blocks', jsonb_build_array(
          jsonb_build_object(
            'type', 'section',
            'text', jsonb_build_object(
              'type', 'mrkdwn',
              'text', format(
                '*KOS AI a mis à jour %s pages BCEAO en %s secondes*\n*SLA Big Four <60s : %s*\n*Audit :* https://khepraexperts.com/admin/audit',
                updated_count, duration, v_sla_status
              )
            )
          ),
          jsonb_build_object(
            'type', 'actions',
            'elements', jsonb_build_array(
              jsonb_build_object(
                'type', 'button',
                'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir GSC'),
                'url', 'https://search.google.com/search-console'
              ),
              jsonb_build_object(
                'type', 'button',
                'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir Datadog'),
                'url', 'https://app.datadoghq.com/dashboard'
              ),
              jsonb_build_object(
                'type', 'button',
                'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir KOS Dashboard'),
                'url', 'https://khepraexperts.com/kos-ultimate-cockpit'
              )
            )
          )
        )
      )

      -- ═══════ DISCORD ═══════
      WHEN 'discord' THEN jsonb_build_object(
        'content', format(
          '✅ KOS AI : %s pages BCEAO mises à jour en %ss. SLA Big Four %s.',
          updated_count, duration, v_sla_status
        ),
        'embeds', jsonb_build_array(
          jsonb_build_object(
            'title', 'Rapport KOS AI — Big Four Engine',
            'color', CASE WHEN v_sla_status = 'OK' THEN 3066993 ELSE 15158332 END,
            'fields', jsonb_build_array(
              jsonb_build_object('name', 'Pages', 'value', updated_count, 'inline', true),
              jsonb_build_object('name', 'Durée', 'value', duration || 's', 'inline', true),
              jsonb_build_object('name', 'SLA Big Four', 'value', v_sla_status, 'inline', true)
            ),
            'timestamp', now()::text
          )
        )
      )

      -- ═══════ GENERIC ═══════
      ELSE jsonb_build_object(
        'event', 'kos_bigfour_update',
        'regulator', 'BCEAO',
        'pages_updated', updated_count,
        'duration_seconds', duration,
        'sla_status', v_sla_status,
        'timestamp', now()
      )
    END;

    -- ═══════════════════════════════════════════════════════════════════
    -- CORRECTION KHEPRA : pg_net.http_post est POSITIONNEL
    -- Signature : net.http_post(url, body, params, headers, timeout_ms)
    -- Le snippet Meta AI faisait : net.http_post(url := ..., body := ...)
    -- → Corrigé en positionnel ci-dessous
    -- ═══════════════════════════════════════════════════════════════════
    SELECT net.http_post(
      wh.url,
      payload,
      '{}'::jsonb,
      jsonb_build_object('Content-Type', 'application/json'),
      5000
    ) INTO v_request_id;

    -- Log de l'envoi
    INSERT INTO public.webhook_notification_log (
      endpoint_id, event_type, payload, regulator,
      pages_count, duration_seconds, sla_status, pg_net_request_id
    ) VALUES (
      wh.id, 'kb_pages_update', payload, 'BCEAO',
      updated_count, duration, v_sla_status, v_request_id
    );

  END LOOP;

  -- ── Statement trigger : pas de NEW, on retourne NULL ──
  RETURN NULL;
END;
$$;

-- ----------------------------------------------------------------------------
-- 9. TRIGGER : trg_notify sur kb_pages (STATEMENT-LEVEL)
-- ----------------------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_notify ON public.kb_pages;
CREATE TRIGGER trg_notify
  AFTER UPDATE OF last_updated ON public.kb_pages
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.notify_kos_update();

-- ----------------------------------------------------------------------------
-- 10. FONCTION : test_webhook_notify() — déclenchement manuel pour test
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.test_webhook_notify()
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_count int;
  v_result jsonb;
BEGIN
  -- Force une mise à jour last_updated sur les pages BCEAO pour trigger
  UPDATE public.kb_pages
  SET last_updated = now()
  WHERE (bigfour_metadata->>'regulator') = 'BCEAO'
    AND last_updated IS NOT NULL;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN jsonb_build_object(
    'triggered', v_count > 0,
    'pages_touched', v_count,
    'message', 'Trigger trg_notify déclenché. Vérifie webhook_notification_log et vos canaux Slack/Discord.'
  );
END;
$$;

-- ----------------------------------------------------------------------------
-- 11. VUE : v_kos_webhook_notifications — dashboard monitoring
-- ----------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.v_kos_webhook_notifications AS
SELECT
  'kb_pages' AS source_table,
  COUNT(*) FILTER (WHERE last_updated > now() - interval '2 minutes') AS updated_recently,
  COUNT(*) FILTER (WHERE bigfour_metadata IS NOT NULL) AS bigfour_pages,
  COUNT(*) FILTER (WHERE (bigfour_metadata->>'regulator') = 'BCEAO') AS bceao_pages,
  COUNT(*) FILTER (WHERE (bigfour_metadata->>'regulator') = 'COBAC') AS cobac_pages,
  COUNT(*) FILTER (WHERE (bigfour_metadata->>'regulator') = 'OHADA') AS ohada_pages,
  COUNT(*) FILTER (WHERE (bigfour_metadata->>'regulator') = 'GAFI') AS gafi_pages
FROM public.kb_pages

UNION ALL

SELECT
  'webhook_logs' AS source_table,
  COUNT(*) FILTER (WHERE sent_at > now() - interval '2 minutes')::int AS updated_recently,
  COUNT(*)::int AS bigfour_pages,
  COUNT(*) FILTER (WHERE regulator = 'BCEAO')::int AS bceao_pages,
  COUNT(*) FILTER (WHERE regulator = 'COBAC')::int AS cobac_pages,
  COUNT(*) FILTER (WHERE regulator = 'OHADA')::int AS ohada_pages,
  COUNT(*) FILTER (WHERE regulator = 'GAFI')::int AS gafi_pages
FROM public.webhook_notification_log;

-- ----------------------------------------------------------------------------
-- 12. VUE : v_bigfour_circular_pages (fallback si migration 05c non exécutée)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE VIEW public.v_bigfour_circular_pages AS
SELECT
  c.id AS circular_id,
  c.circular_number,
  c.title AS circular_title,
  c.date_issued,
  c.crawled,
  c.bigfour_impact,
  c.source_authority AS regulator,
  COUNT(cpm.id) AS mapped_pages,
  COUNT(kp.slug) AS generated_pages,
  jsonb_agg(DISTINCT jsonb_build_object(
    'slug', cpm.slug,
    'type', cpm.type,
    'intent', cpm.intent,
    'generated', (kp.slug IS NOT NULL)
  )) FILTER (WHERE cpm.id IS NOT NULL) AS page_map
FROM public.circulars c
LEFT JOIN public.circular_page_map cpm ON cpm.circular_id = c.id
LEFT JOIN public.kb_pages kp ON kp.slug = cpm.slug
WHERE c.source_authority = 'BCEAO'
GROUP BY c.id, c.circular_number, c.title, c.date_issued, c.crawled, c.bigfour_impact, c.source_authority
ORDER BY c.date_issued DESC;

-- ----------------------------------------------------------------------------
-- 13. RLS — webhook_endpoints et webhook_notification_log
-- ----------------------------------------------------------------------------

ALTER TABLE public.webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow admin read webhook_endpoints"
  ON public.webhook_endpoints
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY IF NOT EXISTS "Allow admin manage webhook_endpoints"
  ON public.webhook_endpoints
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY IF NOT EXISTS "Allow admin read webhook_notification_log"
  ON public.webhook_notification_log
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Anon ne voit rien (sensible)

-- ----------------------------------------------------------------------------
-- 14. RLS — circular_page_map (fallback si migration 05c non exécutée)
-- ----------------------------------------------------------------------------

ALTER TABLE public.circular_page_map ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read circular_page_map"
  ON public.circular_page_map
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY IF NOT EXISTS "Allow admin manage circular_page_map"
  ON public.circular_page_map
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================================================
-- FIN MIGRATION
-- ============================================================================