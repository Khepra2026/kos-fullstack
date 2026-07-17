-- ============================================================================
-- KHEPRA — KOS Big Four End-to-End Pipeline v1.0
-- Adaptation complète du snippet Meta AI : test SLA <60s
-- ============================================================================
-- Ce migration consolide TOUT ce qui manquait des migrations précédentes
-- (non exécutées) et ajoute le pipeline orchestrateur complet.
-- ============================================================================

-- ════════════════════════════════════════════════════════════════════════════
-- 1. SCHEMA — Colonnes manquantes sur circulars et kb_pages
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.circulars
  ADD COLUMN IF NOT EXISTS crawled boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS articles_cles jsonb,
  ADD COLUMN IF NOT EXISTS bigfour_impact int DEFAULT 100;

CREATE INDEX IF NOT EXISTS idx_circulars_crawled ON public.circulars(crawled) WHERE crawled = true;
CREATE INDEX IF NOT EXISTS idx_circulars_source_authority ON public.circulars(source_authority);

ALTER TABLE public.kb_pages
  ADD COLUMN IF NOT EXISTS last_updated timestamptz,
  ADD COLUMN IF NOT EXISTS bigfour_metadata jsonb;

CREATE INDEX IF NOT EXISTS idx_kb_pages_last_updated ON public.kb_pages(last_updated);
CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour ON public.kb_pages(bigfour_metadata) WHERE bigfour_metadata IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour_gin ON public.kb_pages USING GIN (bigfour_metadata);

-- ════════════════════════════════════════════════════════════════════════════
-- 2. TABLES — circular_page_map, webhooks, pipeline log, GSC queue
-- ════════════════════════════════════════════════════════════════════════════

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

CREATE TABLE IF NOT EXISTS public.webhook_endpoints (
  id serial PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL,
  type text CHECK (type IN ('slack','discord','generic')),
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

INSERT INTO public.webhook_endpoints (name, url, type) VALUES
  ('Slack Ops', 'https://hooks.slack.com/services/T000/B000/XXXX', 'slack'),
  ('Discord KOS', 'https://discord.com/api/webhooks/123/abc', 'discord')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.webhook_notification_log (
  id bigserial PRIMARY KEY,
  endpoint_id int REFERENCES public.webhook_endpoints(id),
  event_type text NOT NULL,
  payload jsonb,
  regulator text,
  pages_count int,
  duration_seconds int,
  sla_status text,
  pg_net_request_id bigint,
  sent_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_wnl_sent_at ON public.webhook_notification_log(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_wnl_regulator ON public.webhook_notification_log(regulator);

CREATE TABLE IF NOT EXISTS public.bigfour_pipeline_log (
  id bigserial PRIMARY KEY,
  regulator text,
  circular_number text,
  pages_count int,
  duration_seconds int,
  cache_purge_results jsonb,
  datadog_result jsonb,
  gsc_result jsonb,
  ran_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bpl_ran_at ON public.bigfour_pipeline_log(ran_at DESC);
CREATE INDEX IF NOT EXISTS idx_bpl_regulator ON public.bigfour_pipeline_log(regulator);

CREATE TABLE IF NOT EXISTS public.gsc_ping_queue (
  id bigserial PRIMARY KEY,
  url text NOT NULL,
  slug text,
  regulator text,
  circular_number text,
  status text DEFAULT 'pending',
  attempts int DEFAULT 0,
  last_attempt_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_gscq_status ON public.gsc_ping_queue(status) WHERE status = 'pending';

-- ════════════════════════════════════════════════════════════════════════════
-- 3. FONCTION : generate_pages_from_circular() — avec last_updated
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.generate_pages_from_circular()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  m record;
  v_regulator_name text;
BEGIN
  IF NEW.crawled = true AND OLD.crawled = false THEN

    SELECT r.name INTO v_regulator_name
    FROM public.regulators r
    WHERE r.id = NEW.regulator_id;

    IF v_regulator_name IS NULL THEN
      v_regulator_name := NEW.source_authority;
    END IF;

    FOR m IN
      SELECT * FROM public.circular_page_map
      WHERE circular_id = NEW.id
    LOOP
      INSERT INTO public.kb_pages (
        slug, title, meta_desc, h1, content_html,
        bigfour_metadata, sitemap_priority, last_updated
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

DROP TRIGGER IF EXISTS trg_gen_pages_on_crawl ON public.circulars;
CREATE TRIGGER trg_gen_pages_on_crawl
  AFTER UPDATE OF crawled ON public.circulars
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_pages_from_circular();

-- ════════════════════════════════════════════════════════════════════════════
-- 4. FONCTION : generate_circular_page_map()
-- ════════════════════════════════════════════════════════════════════════════

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

SELECT generate_circular_page_map('BCEAO');

-- ════════════════════════════════════════════════════════════════════════════
-- 5. FONCTION : mark_circular_crawled()
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.mark_circular_crawled(p_circular_number text)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_result jsonb;
  v_count int;
BEGIN
  UPDATE public.circulars
  SET crawled = true, updated_at = now()
  WHERE circular_number = p_circular_number AND crawled = false;
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

-- ════════════════════════════════════════════════════════════════════════════
-- 6. FONCTION PRINCIPALE : notify_kos_update() — Slack + Discord + Pipeline
-- ════════════════════════════════════════════════════════════════════════════

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
  v_pipeline_request_id bigint;
  v_sla_status text;
  v_slugs text[];
  v_circ_num text;
BEGIN
  -- ── Stats pages BCEAO mises à jour dans les 2 dernières minutes ──
  SELECT count(*), min(last_updated)
  INTO updated_count, start_time
  FROM public.kb_pages
  WHERE last_updated > now() - interval '2 minutes'
    AND (bigfour_metadata->>'regulator') = 'BCEAO';

  IF updated_count = 0 OR start_time IS NULL THEN
    RETURN NULL;
  END IF;

  duration := extract(epoch from now() - start_time)::int;
  v_sla_status := CASE WHEN duration < 60 THEN 'OK' ELSE 'ALERTE' END;

  -- ── Collecte des slugs pour le pipeline ──
  SELECT array_agg(slug)
  INTO v_slugs
  FROM public.kb_pages
  WHERE last_updated > now() - interval '2 minutes'
    AND (bigfour_metadata->>'regulator') = 'BCEAO';

  SELECT (bigfour_metadata->>'circular_number')
  INTO v_circ_num
  FROM public.kb_pages
  WHERE last_updated > now() - interval '2 minutes'
    AND (bigfour_metadata->>'regulator') = 'BCEAO'
  LIMIT 1;

  -- ── Webhooks Slack / Discord ──
  FOR wh IN SELECT * FROM public.webhook_endpoints WHERE active LOOP
    payload := CASE wh.type
      WHEN 'slack' THEN jsonb_build_object(
        'text', format(':white_check_mark: KOS AI Big Four : %s pages BCEAO mises à jour en %ss', updated_count, duration),
        'blocks', jsonb_build_array(
          jsonb_build_object(
            'type', 'section',
            'text', jsonb_build_object(
              'type', 'mrkdwn',
              'text', format(
                '*KOS AI a mis à jour %s pages BCEAO en %s secondes*\n*SLA Big Four <60s : %s*\n*Circulaire : %s*\n*Audit :* https://khepraexperts.com/admin/audit',
                updated_count, duration, v_sla_status, COALESCE(v_circ_num, 'N/A')
              )
            )
          ),
          jsonb_build_object(
            'type', 'actions',
            'elements', jsonb_build_array(
              jsonb_build_object('type', 'button', 'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir GSC'), 'url', 'https://search.google.com/search-console'),
              jsonb_build_object('type', 'button', 'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir Datadog'), 'url', 'https://app.datadoghq.com/dashboard'),
              jsonb_build_object('type', 'button', 'text', jsonb_build_object('type', 'plain_text', 'text', 'Voir Pipeline Log'), 'url', 'https://khepraexperts.com/kos-ultimate-cockpit')
            )
          )
        )
      )
      WHEN 'discord' THEN jsonb_build_object(
        'content', format('✅ KOS AI : %s pages BCEAO mises à jour en %ss. SLA Big Four %s.', updated_count, duration, v_sla_status),
        'embeds', jsonb_build_array(
          jsonb_build_object(
            'title', 'Rapport KOS AI — Big Four Engine',
            'color', CASE WHEN v_sla_status = 'OK' THEN 3066993 ELSE 15158332 END,
            'fields', jsonb_build_array(
              jsonb_build_object('name', 'Pages', 'value', updated_count, 'inline', true),
              jsonb_build_object('name', 'Durée', 'value', duration || 's', 'inline', true),
              jsonb_build_object('name', 'SLA Big Four', 'value', v_sla_status, 'inline', true),
              jsonb_build_object('name', 'Circulaire', 'value', COALESCE(v_circ_num, 'N/A'), 'inline', true)
            ),
            'timestamp', now()::text
          )
        )
      )
      ELSE jsonb_build_object(
        'event', 'kos_bigfour_update', 'regulator', 'BCEAO',
        'pages_updated', updated_count, 'duration_seconds', duration,
        'sla_status', v_sla_status, 'timestamp', now()
      )
    END;

    SELECT net.http_post(
      wh.url, payload, '{}'::jsonb,
      jsonb_build_object('Content-Type', 'application/json'), 5000
    ) INTO v_request_id;

    INSERT INTO public.webhook_notification_log (
      endpoint_id, event_type, payload, regulator,
      pages_count, duration_seconds, sla_status, pg_net_request_id
    ) VALUES (
      wh.id, 'kb_pages_update', payload, 'BCEAO',
      updated_count, duration, v_sla_status, v_request_id
    );
  END LOOP;

  -- ── Appel pipeline orchestrateur (cache purge + Datadog + GSC) ──
  IF v_slugs IS NOT NULL AND array_length(v_slugs, 1) > 0 THEN
    SELECT net.http_post(
      'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/kos-bigfour-pipeline',
      jsonb_build_object(
        'slugs', v_slugs,
        'regulator', 'BCEAO',
        'duration_seconds', duration,
        'pages_count', updated_count,
        'circular_number', COALESCE(v_circ_num, '')
      ),
      '{}'::jsonb,
      jsonb_build_object('Content-Type', 'application/json'),
      15000
    ) INTO v_pipeline_request_id;
  END IF;

  RETURN NULL;
END;
$$;

-- ════════════════════════════════════════════════════════════════════════════
-- 7. TRIGGERS
-- ════════════════════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trg_notify ON public.kb_pages;
CREATE TRIGGER trg_notify
  AFTER UPDATE OF last_updated ON public.kb_pages
  FOR EACH STATEMENT
  EXECUTE FUNCTION public.notify_kos_update();

-- ════════════════════════════════════════════════════════════════════════════
-- 8. FONCTION TEST : test_bigfour_sla() — Adaptation snippet Meta AI
-- ════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.test_bigfour_sla()
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
  v_regulator_id uuid;
  v_exists uuid;
  v_result jsonb;
BEGIN
  -- Récupérer régulateur BCEAO
  SELECT id INTO v_regulator_id FROM public.regulators WHERE code = 'BCEAO' LIMIT 1;

  -- Vérifier si circulaire test existe déjà
  SELECT id INTO v_exists FROM public.circulars WHERE circular_number = '13-2026/CB/C' LIMIT 1;

  -- Insérer si absente
  IF v_exists IS NULL THEN
    INSERT INTO public.circulars (
      reference, title, circular_number, date_issued, official_url,
      keywords, source_authority, regulator_id, status, summary,
      articles_cles, bigfour_impact, metadata
    )
    VALUES (
      'Circulaire 13-2026/CB/C — Test SLA Big Four Pipeline',
      'Test SLA <60s — KOS Big Four Pipeline',
      '13-2026/CB/C',
      '2026-07-04',
      'https://www.bceao.int/fr/reglementations/circulaire-13-2026',
      ARRAY['test','sla','bigfour','pipeline','bceao'],
      'BCEAO',
      v_regulator_id,
      'in_force',
      'Circulaire de test pour valider le pipeline end-to-end Big Four <60s. Génère 5 pages SEO/GEO automatiquement.',
      '{"1": "Test article SLA pipeline", "2": "Validation end-to-end"}'::jsonb,
      100,
      '{"test": true, "source_snippet": "meta-ai-e2e-test"}'::jsonb
    );
  ELSE
    -- Reset pour re-test
    UPDATE public.circulars
    SET crawled = false, updated_at = now()
    WHERE circular_number = '13-2026/CB/C';
  END IF;

  -- Générer le mapping des 5 pages SEO/GEO
  PERFORM public.generate_circular_page_map('BCEAO');

  -- Étape 2 : Marquer comme crawled → déclenche TOUT
  UPDATE public.circulars
  SET crawled = true, updated_at = now()
  WHERE circular_number = '13-2026/CB/C';

  v_result := jsonb_build_object(
    'test', 'bigfour_sla',
    'circular_number', '13-2026/CB/C',
    'circular_inserted', v_exists IS NULL,
    'message', 'Circulaire 13-2026/CB/C marquée crawled=true. Pipeline déclenché : génération kb_pages → trigger notify → Slack/Discord + cache purge + Datadog + GSC ping.',
    'expected', jsonb_build_array(
      '5 pages kb_pages insérées/mises à jour avec last_updated = now()',
      'Trigger trg_notify déclenché sur kb_pages',
      'Webhook Slack : "KOS AI Big Four : 5 pages BCEAO mises à jour en Xs. SLA Big Four <60s : OK"',
      'Webhook Discord : embed coloré avec stats',
      'Pipeline kos-bigfour-pipeline appelé : cache purgé + Datadog push + GSC ping',
      'Log dans bigfour_pipeline_log et webhook_notification_log'
    ),
    'verify_queries', jsonb_build_array(
      'SELECT * FROM public.kb_pages WHERE bigfour_metadata->>"circular_number" = ''13-2026/CB/C'';',
      'SELECT * FROM public.webhook_notification_log ORDER BY sent_at DESC LIMIT 5;',
      'SELECT * FROM public.bigfour_pipeline_log ORDER BY ran_at DESC LIMIT 5;',
      'SELECT * FROM public.v_bigfour_pipeline_status LIMIT 5;'
    )
  );

  RETURN v_result;
END;
$$;

-- ════════════════════════════════════════════════════════════════════════════
-- 9. VUES — Monitoring dashboard
-- ════════════════════════════════════════════════════════════════════════════

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
    'slug', cpm.slug, 'type', cpm.type,
    'intent', cpm.intent, 'generated', (kp.slug IS NOT NULL)
  )) FILTER (WHERE cpm.id IS NOT NULL) AS page_map
FROM public.circulars c
LEFT JOIN public.circular_page_map cpm ON cpm.circular_id = c.id
LEFT JOIN public.kb_pages kp ON kp.slug = cpm.slug
WHERE c.source_authority = 'BCEAO'
GROUP BY c.id, c.circular_number, c.title, c.date_issued, c.crawled, c.bigfour_impact, c.source_authority
ORDER BY c.date_issued DESC;

CREATE OR REPLACE VIEW public.v_bigfour_pipeline_status AS
SELECT
  bpl.regulator,
  bpl.circular_number,
  bpl.pages_count,
  bpl.duration_seconds,
  bpl.cache_purge_results,
  bpl.datadog_result,
  bpl.gsc_result,
  bpl.ran_at,
  CASE WHEN bpl.duration_seconds < 60 THEN 'OK' ELSE 'ALERTE' END AS sla_status
FROM public.bigfour_pipeline_log bpl
ORDER BY bpl.ran_at DESC;

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
  'webhook_logs',
  COUNT(*) FILTER (WHERE sent_at > now() - interval '2 minutes')::int,
  COUNT(*)::int,
  COUNT(*) FILTER (WHERE regulator = 'BCEAO')::int,
  COUNT(*) FILTER (WHERE regulator = 'COBAC')::int,
  COUNT(*) FILTER (WHERE regulator = 'OHADA')::int,
  COUNT(*) FILTER (WHERE regulator = 'GAFI')::int
FROM public.webhook_notification_log;

-- ════════════════════════════════════════════════════════════════════════════
-- 10. MISE À JOUR des circulars BCEAO existants (articles_cles + keywords)
-- ════════════════════════════════════════════════════════════════════════════

UPDATE public.circulars SET
  articles_cles = '{"3": "Administrateurs indépendants", "8": "Comité audit", "12": "Conseil administration"}'::jsonb,
  bigfour_impact = 100,
  keywords = ARRAY['gouvernance','conseil_administration','administrateurs_independants','bceao']
WHERE circular_number = '01-2017/CB/C';

UPDATE public.circulars SET
  articles_cles = '{"15": "Cartographie risques", "49": "Plan audit fondé risques", "51": "3 lignes défense", "22": "Conformité LBC/FT"}'::jsonb,
  bigfour_impact = 100,
  keywords = ARRAY['controle_interne','3_lignes_defense','LBC/FT','audit_interne','cartographie_risques','bceao']
WHERE circular_number = '03-2017/CB/C';

UPDATE public.circulars SET
  articles_cles = '{"8": "Seuil déclenchement", "12": "Plan préventif", "15": "Redressement"}'::jsonb,
  bigfour_impact = 95,
  keywords = ARRAY['ppr','plan_preventif_redressement','resolution','bale_iii','bceao']
WHERE circular_number = '001-2020/CB/C';

UPDATE public.circulars SET
  articles_cles = '{"1": "PCA exigences minimales", "5": "RTO RPO SFD"}'::jsonb,
  bigfour_impact = 90,
  keywords = ARRAY['PCA','RTO','RPO','SFD','continuite_activite','bceao']
WHERE circular_number = 'CIRC-004-2025';

UPDATE public.circulars SET
  articles_cles = '{"1": "Format XBRL", "3": "Reporting trimestriel", "8": "Prudentiel SFD"}'::jsonb,
  bigfour_impact = 85,
  keywords = ARRAY['XBRL','reporting','prudentiel','SFD','bceao']
WHERE circular_number = 'CIRC-003-2025';

UPDATE public.circulars SET
  articles_cles = '{"1": "Conformité LBC/FT SFD", "5": "STR", "12": "Vigilance renforcée"}'::jsonb,
  bigfour_impact = 95,
  keywords = ARRAY['LBC/FT','SFD','STR','conformite','bceao']
WHERE circular_number = 'CIRC-001-2025';

-- ════════════════════════════════════════════════════════════════════════════
-- 11. RLS
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.circular_page_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_notification_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bigfour_pipeline_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gsc_ping_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "public_read_cpm" ON public.circular_page_map FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY IF NOT EXISTS "admin_manage_cpm" ON public.circular_page_map FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY IF NOT EXISTS "admin_read_webhook_endpoints" ON public.webhook_endpoints FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY IF NOT EXISTS "admin_manage_webhook_endpoints" ON public.webhook_endpoints FOR ALL TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY IF NOT EXISTS "admin_read_webhook_log" ON public.webhook_notification_log FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY IF NOT EXISTS "admin_read_pipeline_log" ON public.bigfour_pipeline_log FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY IF NOT EXISTS "admin_read_gsc_queue" ON public.gsc_ping_queue FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ============================================================================
-- FIN MIGRATION
-- ============================================================================
-- SCRIPT DE TEST ADAPTÉ (Meta AI → KHEPRA) :
--
--   -- 1. Simule nouvelle circulaire
--   INSERT INTO public.circulars (reference, title, circular_number, date_issued, official_url, keywords, source_authority, regulator_id, status, summary)
--   VALUES ('Test SLA','Test SLA <60s','13-2026/CB/C','2026-07-04','https://bceao.int/test.pdf',ARRAY['test'],'BCEAO',
--     (SELECT id FROM public.regulators WHERE code='BCEAO'),'in_force','Test');
--
--   -- 2. Marque comme crawled -> déclenche tout
--   UPDATE public.circulars SET crawled = true WHERE circular_number = '13-2026/CB/C';
--
--   -- OU exécute directement :
--   SELECT test_bigfour_sla();
--
--   -- 3. Résultat attendu <60s :
--   -- Slack : "✅ KOS AI Big Four : 5 pages BCEAO mises à jour en Xs. SLA Big Four <60s : OK"
--   -- Datadog : custom.regulator.to.live = X (via kos-regulator-sla-monitor/push-datadog)
--   -- Cloudflare : Cache purgé (via cache-purge-handler)
--   -- GSC : Ping envoyé (best-effort via sitemap ping)
-- ============================================================================