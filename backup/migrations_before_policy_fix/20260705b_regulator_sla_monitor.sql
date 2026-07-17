-- ═══════════════════════════════════════════════════════════════════
-- MIGRATION : KOS REGULATOR SLA MONITOR + DATADOG PUSH v1.0
-- Adaptation du snippet Meta AI : net.http_post → Datadog
-- Stack KHEPRA : Supabase pg_net (disponible) + pg_cron
-- ═══════════════════════════════════════════════════════════════════
-- Tables créées : regulator_feed, regulator_feed_log, regulator_sla_violations
-- Fonctions : check_regulator_updates(), check_regulator_sla(),
--             push_regulator_metrics_to_datadog()
-- Cron jobs : check-regulator-updates (5min), check-regulator-sla (1min),
--             push-datadog-metrics (1min)
-- ═══════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────
-- 1. TABLE : monitoring_config (stockage sécurisé des credentials)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS monitoring_config (
    key         TEXT PRIMARY KEY,
    value       TEXT NOT NULL,
    description TEXT,
    updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────────────────────────
-- 2. TABLE : regulator_feed (régulateurs Big Four)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulator_feed (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    url         TEXT,
    is_active   BOOLEAN DEFAULT true,
    last_check  TIMESTAMPTZ,
    last_change_detected TIMESTAMPTZ,
    check_interval_minutes INTEGER DEFAULT 5,
    created_at  TIMESTAMPTZ DEFAULT now()
);

-- ───────────────────────────────────────────────────────────────────
-- 3. TABLE : regulator_feed_log (logs granulaires par check)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulator_feed_log (
    id              BIGSERIAL PRIMARY KEY,
    regulator_name  TEXT NOT NULL REFERENCES regulator_feed(name) ON DELETE CASCADE,
    checked_at      TIMESTAMPTZ DEFAULT now(),
    content_changed BOOLEAN DEFAULT false,
    new_urls        TEXT[],
    total_latency_ms INTEGER,
    sla_violation   BOOLEAN DEFAULT false,
    step_latencies  JSONB DEFAULT '{}',
    -- Timestamps granulaires pour chaque étape du pipeline
    detected_at     TIMESTAMPTZ,
    crawled_at      TIMESTAMPTZ,
    regen_at        TIMESTAMPTZ,
    purged_at       TIMESTAMPTZ,
    site_live_at    TIMESTAMPTZ,
    datadog_pushed  BOOLEAN DEFAULT false,
    datadog_push_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_reg_log_regulator ON regulator_feed_log(regulator_name);
CREATE INDEX IF NOT EXISTS idx_reg_log_checked_at ON regulator_feed_log(checked_at DESC);
CREATE INDEX IF NOT EXISTS idx_reg_log_sla ON regulator_feed_log(sla_violation) WHERE sla_violation = true;

-- ───────────────────────────────────────────────────────────────────
-- 4. TABLE : regulator_sla_violations (traçabilité violations)
-- ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS regulator_sla_violations (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    regulator_name      TEXT NOT NULL,
    latency_ms          INTEGER NOT NULL,
    latency_seconds     INTEGER GENERATED ALWAYS AS (latency_ms / 1000) STORED,
    severity            TEXT DEFAULT 'warning' CHECK (severity IN ('warning', 'critical')),
    steps               JSONB DEFAULT '{}',
    alert_sent          BOOLEAN DEFAULT false,
    alert_channel       TEXT DEFAULT 'slack',
    acknowledged_at     TIMESTAMPTZ,
    acknowledged_by     TEXT,
    resolution_notes    TEXT,
    created_at          TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sla_violations_regulator ON regulator_sla_violations(regulator_name);
CREATE INDEX IF NOT EXISTS idx_sla_violations_created ON regulator_sla_violations(created_at DESC);

-- ───────────────────────────────────────────────────────────────────
-- 5. VUES : agrégations temps réel
-- ───────────────────────────────────────────────────────────────────

-- Vue 5 minutes
CREATE OR REPLACE VIEW v_regulator_latency_5min AS
SELECT
    regulator_name,
    date_trunc('minute', checked_at) AS bucket,
    ROUND(AVG(total_latency_ms)::numeric, 0) AS avg_latency_ms,
    MAX(total_latency_ms) AS max_latency_ms,
    COUNT(*) FILTER (WHERE content_changed) AS changes_detected,
    COUNT(*) FILTER (WHERE sla_violation) AS sla_violations
FROM regulator_feed_log
WHERE checked_at >= now() - interval '5 minutes'
GROUP BY regulator_name, date_trunc('minute', checked_at)
ORDER BY bucket DESC;

-- Vue horaire
CREATE OR REPLACE VIEW v_regulator_latency_hourly AS
SELECT
    regulator_name,
    date_trunc('hour', checked_at) AS bucket,
    ROUND(AVG(total_latency_ms)::numeric, 0) AS avg_latency_ms,
    MAX(total_latency_ms) AS max_latency_ms,
    COUNT(*) FILTER (WHERE content_changed) AS changes_detected,
    COUNT(*) FILTER (WHERE sla_violation) AS sla_violations
FROM regulator_feed_log
WHERE checked_at >= now() - interval '24 hours'
GROUP BY regulator_name, date_trunc('hour', checked_at)
ORDER BY bucket DESC;

-- ───────────────────────────────────────────────────────────────────
-- 6. SEED : Régulateurs Big Four
-- ───────────────────────────────────────────────────────────────────
INSERT INTO regulator_feed (name, display_name, url, check_interval_minutes)
VALUES
    ('BCEAO',  'Banque Centrale des États de l''Afrique de l''Ouest', 'https://www.bceao.int', 5),
    ('COBAC',  'Commission Bancaire de l''Afrique Centrale',           'https://www.cobac.int', 5),
    ('OHADA',  'Organisation pour l''Harmonisation en Afrique',       'https://www.ohada.org', 5),
    ('GAFI',   'Groupe d''Action Financière',                           'https://www.fatf-gafi.org', 5)
ON CONFLICT (name) DO NOTHING;

-- ───────────────────────────────────────────────────────────────────
-- 7. FONCTION : check_regulator_updates() — veille réglementaire
-- ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION check_regulator_updates()
RETURNS TABLE (
    regulator_name  TEXT,
    content_changed BOOLEAN,
    new_urls        TEXT[],
    latency_ms      INTEGER,
    sla_violation   BOOLEAN
) AS $$
DECLARE
    reg RECORD;
    change_detected BOOLEAN := false;
    found_urls      TEXT[] := ARRAY[]::TEXT[];
    step_start      TIMESTAMPTZ;
    detect_lat      INTEGER;
    crawl_lat       INTEGER;
    total_lat       INTEGER;
    v_detected_at   TIMESTAMPTZ;
    v_crawled_at    TIMESTAMPTZ;
    v_regen_at      TIMESTAMPTZ;
    v_purged_at     TIMESTAMPTZ;
    v_site_live_at  TIMESTAMPTZ;
BEGIN
    FOR reg IN SELECT * FROM regulator_feed WHERE is_active = true LOOP
        step_start := clock_timestamp();
        v_detected_at := step_start;

        -- === ÉTAPE 1 : Détection (simulée ou réelle) ===
        -- Ici on simule la détection ; en production, remplacer par
        -- appel au crawler ou au feed RSS/API du régulateur
        PERFORM pg_sleep(0.05); -- simulation 50ms
        change_detected := (random() < 0.05); -- 5% chance de changement
        v_crawled_at := clock_timestamp();
        detect_lat := EXTRACT(MILLISECOND FROM (v_crawled_at - step_start))::INTEGER
                    + EXTRACT(SECOND FROM (v_crawled_at - step_start))::INTEGER * 1000;

        -- === ÉTAPE 2 : Crawl / extraction URLs ===
        IF change_detected THEN
            found_urls := ARRAY[
                reg.url || '/nouvelle-circulaire-' || to_char(now(), 'YYYY-MM-DD'),
                reg.url || '/communique-' || to_char(now(), 'YYYY-MM-DD')
            ];
        END IF;
        v_regen_at := clock_timestamp();
        crawl_lat := EXTRACT(MILLISECOND FROM (v_regen_at - v_crawled_at))::INTEGER
                   + EXTRACT(SECOND FROM (v_regen_at - v_crawled_at))::INTEGER * 1000;

        -- === ÉTAPE 3 : Regen pages kb_pages (simulée) ===
        PERFORM pg_sleep(0.02);
        v_purged_at := clock_timestamp();

        -- === ÉTAPE 4 : Purge cache CDN (simulée) ===
        PERFORM pg_sleep(0.03);
        v_site_live_at := clock_timestamp();

        total_lat := EXTRACT(MILLISECOND FROM (v_site_live_at - step_start))::INTEGER
                   + EXTRACT(SECOND FROM (v_site_live_at - step_start))::INTEGER * 1000;

        -- === ÉTAPE 5 : Mise à jour du feed parent ===
        UPDATE regulator_feed
        SET last_check = now(),
            last_change_detected = CASE WHEN change_detected THEN now() ELSE last_change_detected END
        WHERE id = reg.id;

        -- === ÉTAPE 6 : Log détaillé ===
        RETURN QUERY
        INSERT INTO regulator_feed_log (
            regulator_name, checked_at, content_changed, new_urls,
            total_latency_ms, sla_violation,
            detected_at, crawled_at, regen_at, purged_at, site_live_at,
            step_latencies
        )
        VALUES (
            reg.name, now(), change_detected, found_urls,
            GREATEST(total_lat, 0),
            (GREATEST(total_lat, 0) > 60000),
            v_detected_at, v_crawled_at, v_regen_at, v_purged_at, v_site_live_at,
            jsonb_build_object(
                'detect_ms', GREATEST(detect_lat, 0),
                'crawl_ms', GREATEST(crawl_lat, 0),
                'regen_ms', EXTRACT(MILLISECOND FROM (v_purged_at - v_regen_at))::INTEGER
                          + EXTRACT(SECOND FROM (v_purged_at - v_regen_at))::INTEGER * 1000,
                'purge_ms', EXTRACT(MILLISECOND FROM (v_site_live_at - v_purged_at))::INTEGER
                          + EXTRACT(SECOND FROM (v_site_live_at - v_purged_at))::INTEGER * 1000
            )
        )
        RETURNING
            regulator_feed_log.regulator_name,
            regulator_feed_log.content_changed,
            regulator_feed_log.new_urls,
            regulator_feed_log.total_latency_ms,
            regulator_feed_log.sla_violation;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- ───────────────────────────────────────────────────────────────────
-- 8. FONCTION : check_regulator_sla() — détection violations + alerting
-- ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION check_regulator_sla()
RETURNS TABLE (
    regulator_name  TEXT,
    avg_latency_ms  NUMERIC,
    max_latency_ms  INTEGER,
    violation_count BIGINT,
    alert_inserted  BOOLEAN
) AS $$
DECLARE
    reg RECORD;
    v_avg_ms NUMERIC;
    v_max_ms INTEGER;
    v_violations BIGINT;
BEGIN
    FOR reg IN SELECT DISTINCT name FROM regulator_feed WHERE is_active = true LOOP
        -- Agrégation sur les 5 dernières minutes
        SELECT
            COALESCE(ROUND(AVG(total_latency_ms)::numeric, 0), 0),
            COALESCE(MAX(total_latency_ms), 0),
            COUNT(*) FILTER (WHERE sla_violation)
        INTO v_avg_ms, v_max_ms, v_violations
        FROM regulator_feed_log
        WHERE regulator_name = reg.name
          AND checked_at >= now() - interval '5 minutes';

        -- Insertion des violations non encore alertées
        IF v_violations > 0 THEN
            INSERT INTO regulator_sla_violations (
                regulator_name, latency_ms, severity, steps, alert_sent
            )
            SELECT
                r.regulator_name,
                r.total_latency_ms,
                CASE WHEN r.total_latency_ms > 120000 THEN 'critical' ELSE 'warning' END,
                r.step_latencies,
                false
            FROM regulator_feed_log r
            WHERE r.regulator_name = reg.name
              AND r.sla_violation = true
              AND r.checked_at >= now() - interval '5 minutes'
              AND NOT EXISTS (
                  SELECT 1 FROM regulator_sla_violations v
                  WHERE v.regulator_name = reg.name
                    AND v.created_at > now() - interval '5 minutes'
                    AND v.latency_ms = r.total_latency_ms
              )
            ORDER BY r.checked_at DESC
            LIMIT 1;
        END IF;

        RETURN QUERY SELECT reg.name, v_avg_ms, v_max_ms, v_violations, (v_violations > 0);
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- ─────────────────══════════════════════════════════════════════════
-- 9. FONCTION : push_regulator_metrics_to_datadog()
--    ← ADAPTATION DIRECTE DU SNIPPET META AI
--    Original : perform net.http_post(url:=..., headers:=..., body:=...)
--    KHEPRA   : net.http_post(url, body::text, params, headers, timeout)
--    pg_net   : body en paramètre 2, headers en paramètre 4
-- ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION push_regulator_metrics_to_datadog()
RETURNS TABLE (
    regulator_name TEXT,
    latency_seconds NUMERIC,
    request_id BIGINT,
    pushed_at TIMESTAMPTZ
) AS $$
DECLARE
    reg RECORD;
    v_request_id BIGINT;
    v_latency_ms INTEGER;
    v_latency_sec NUMERIC;
    v_dd_api_key TEXT;
    v_body TEXT;
BEGIN
    -- Récupération clé Datadog depuis monitoring_config
    SELECT value INTO v_dd_api_key
    FROM monitoring_config
    WHERE key = 'dd_api_key';

    IF v_dd_api_key IS NULL THEN
        RAISE EXCEPTION 'Datadog API key not configured. Insert into monitoring_config(key, value) VALUES (''dd_api_key'', ''<your-key>'')';
    END IF;

    FOR reg IN
        SELECT f.name, f.last_check, MAX(l.total_latency_ms) AS latest_latency_ms
        FROM regulator_feed f
        LEFT JOIN regulator_feed_log l ON l.regulator_name = f.name
        WHERE f.is_active = true
          AND (l.checked_at IS NULL OR l.checked_at >= now() - interval '10 minutes')
        GROUP BY f.name, f.last_check
    LOOP
        v_latency_ms := COALESCE(reg.latest_latency_ms, 0);
        v_latency_sec := ROUND(v_latency_ms::numeric / 1000, 3);

        -- Construction du payload Datadog (équivalent exact du snippet)
        v_body := jsonb_build_object(
            'series', jsonb_build_array(
                jsonb_build_object(
                    'metric', 'custom.regulator.to.live',
                    'points', jsonb_build_array(
                        jsonb_build_array(
                            EXTRACT(EPOCH FROM now())::bigint,
                            EXTRACT(EPOCH FROM now() - COALESCE(reg.last_check, now()))::numeric
                        )
                    ),
                    'tags', jsonb_build_array('regulator:' || reg.name),
                    'type', 'gauge',
                    'interval', 60
                ),
                -- Métrique secondaire : latence totale en ms
                jsonb_build_object(
                    'metric', 'custom.regulator.total_latency_ms',
                    'points', jsonb_build_array(
                        jsonb_build_array(
                            EXTRACT(EPOCH FROM now())::bigint,
                            v_latency_ms
                        )
                    ),
                    'tags', jsonb_build_array('regulator:' || reg.name),
                    'type', 'gauge'
                )
            )
        )::text;

        -- ═══════════════════════════════════════════════════════════
        -- PUSH DATADOG via pg_net (équivalent du snippet Meta AI)
        -- ═══════════════════════════════════════════════════════════
        -- Note : pg_net utilise des paramètres positionnels :
        --   net.http_post(url, body, params, headers, timeout_ms)
        -- Contrairement au snippet qui utilise des paramètres nommés
        -- ───────────────────────────────────────────────────────────
        SELECT net.http_post(
            'https://api.datadoghq.com/api/v1/series',
            v_body,
            '{}'::jsonb,
            jsonb_build_object(
                'DD-API-KEY', v_dd_api_key
                -- Content-Type: application/json est auto-ajouté par pg_net
            ),
            5000
        ) INTO v_request_id;

        -- Marquer comme poussé
        UPDATE regulator_feed_log
        SET datadog_pushed = true,
            datadog_push_at = now()
        WHERE regulator_name = reg.name
          AND datadog_pushed = false;

        RETURN QUERY SELECT reg.name, v_latency_sec, v_request_id, now()::timestamptz;
    END LOOP;
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- ───────────────────────────────────────────────────────────────────
-- 10. FONCTION AIDE : set_datadog_api_key()
-- ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_datadog_api_key(api_key TEXT)
RETURNS void AS $$
BEGIN
    INSERT INTO monitoring_config (key, value, description)
    VALUES ('dd_api_key', api_key, 'Datadog API key for regulator metrics push')
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- ───────────────────────────────────────────────────────────────────
-- 11. CRON JOBS
-- ───────────────────────────────────────────────────────────────────

-- Supprimer d'anciens jobs avec le même nom pour éviter les doublons
DO $$
BEGIN
    PERFORM cron.unschedule('check-regulator-updates');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    PERFORM cron.unschedule('check-regulator-sla');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

DO $$
BEGIN
    PERFORM cron.unschedule('push-datadog-metrics');
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Veille réglementaire toutes les 5 minutes
SELECT cron.schedule(
    'check-regulator-updates',
    '*/5 * * * *',
    'SELECT * FROM check_regulator_updates();'
);

-- Check SLA toutes les minutes
SELECT cron.schedule(
    'check-regulator-sla',
    '* * * * *',
    'SELECT * FROM check_regulator_sla();'
);

-- Push Datadog toutes les minutes (équivalent du snippet)
SELECT cron.schedule(
    'push-datadog-metrics',
    '* * * * *',
    'SELECT * FROM push_regulator_metrics_to_datadog();'
);

-- ───────────────────────────────────────────────────────────────────
-- 12. TRIGGER : auto-alerte Slack lors d'insertion violation
-- ───────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION notify_sla_violation()
RETURNS TRIGGER AS $$
DECLARE
    v_webhook TEXT;
    payload   TEXT;
BEGIN
    SELECT value INTO v_webhook
    FROM monitoring_config WHERE key = 'slack_webhook_url';

    IF v_webhook IS NOT NULL THEN
        payload := jsonb_build_object(
            'text', format(
                '🚨 *SLA Big Four violé* — %s | Latence : %s secondes | %s',
                NEW.regulator_name,
                ROUND(NEW.latency_ms::numeric / 1000, 1),
                NEW.severity
            ),
            'blocks', jsonb_build_array(
                jsonb_build_object(
                    'type', 'section',
                    'text', jsonb_build_object(
                        'type', 'mrkdwn',
                        'text', format(
                            '*SLA Big Four violé*\n• Régulateur : `%s`\n• Latence : `%s s`\n• Seuil : `60 s`\n• Sévérité : `%s`\n• @slack-khepra-ops',
                            NEW.regulator_name,
                            ROUND(NEW.latency_ms::numeric / 1000, 1),
                            NEW.severity
                        )
                    )
                )
            )
        )::text;

        PERFORM net.http_post(
            v_webhook,
            payload,
            '{}'::jsonb,
            jsonb_build_object(),
            5000
        );

        NEW.alert_sent := true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sla_violation_alert ON regulator_sla_violations;
CREATE TRIGGER trg_sla_violation_alert
    BEFORE INSERT ON regulator_sla_violations
    FOR EACH ROW
    EXECUTE FUNCTION notify_sla_violation();

-- ───────────────────────────────────────────────────────────────────
-- 13. SEED : insérer un log initial pour chaque régulateur
--     (évite les résultats vides au premier appel)
-- ───────────────────────────────────────────────────────────────────
INSERT INTO regulator_feed_log (
    regulator_name, checked_at, content_changed,
    total_latency_ms, sla_violation, datadog_pushed,
    step_latencies
)
SELECT
    name,
    now() - interval '2 minutes',
    false,
    1500,
    false,
    true,
    jsonb_build_object('init', true)
FROM regulator_feed
WHERE is_active = true
  AND NOT EXISTS (
      SELECT 1 FROM regulator_feed_log l WHERE l.regulator_name = regulator_feed.name
  );