-- ============================================================================
-- KHEPRA CACHE PURGE SYSTEM — Adaptation Netlify du snippet Meta AI
-- Snippet original: Cloudflare + pg_net + Datadog
-- Adaptation KHEPRA: Netlify/Cloudflare hybride + Supabase Edge Function
-- ============================================================================

-- ----------------------------------------------------------------------------
-- ETAPE 0: Activer pg_net (extension Supabase pour HTTP depuis PostgreSQL)
-- ----------------------------------------------------------------------------
-- NOTE: Si pg_net n'est pas activé sur ton projet, exécute d'abord :
-- CREATE EXTENSION IF NOT EXISTS pg_net;
-- Si pg_net n'est PAS disponible, utilise plutôt Supabase Database Webhooks
-- (configurables dans le dashboard Supabase → Database → Webhooks)
-- ----------------------------------------------------------------------------

-- ----------------------------------------------------------------------------
-- 1. TABLE LOG POUR AUDIT BIG FOUR
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cache_purge_log (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL,
  table_source TEXT DEFAULT 'kb_pages',
  operation TEXT DEFAULT 'update',
  provider TEXT DEFAULT 'unknown',
  status INT,
  success BOOLEAN DEFAULT FALSE,
  cf_ray TEXT,
  triggered_by TEXT DEFAULT COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', 'system'),
  purged_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche rapide par slug
CREATE INDEX IF NOT EXISTS idx_cache_purge_log_slug ON public.cache_purge_log(slug);
CREATE INDEX IF NOT EXISTS idx_cache_purge_log_purged_at ON public.cache_purge_log(purged_at DESC);

-- RLS: tout le monde peut lire (pour monitoring), insertion via trigger/service only
ALTER TABLE public.cache_purge_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "purge_log_select_all" ON public.purge_logs;

CREATE POLICY "purge_log_select_all"
ON public.purge_logs
FOR SELECT
USING (true);
-- Seul le service_role ou les admins peuvent insérer
CREATE POLICY IF NOT EXISTS "purge_log_insert_service"
  ON public.cache_purge_log FOR INSERT
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- ----------------------------------------------------------------------------
-- 2. FONCTION DE PURGE VIA EDGE FUNCTION (adaptation Netlify)
-- ----------------------------------------------------------------------------
-- Au lieu d'appeler Cloudflare directement, on appelle notre Edge Function
-- cache-purge-handler qui gère Cloudflare ET Netlify selon les secrets dispos.
-- URL de l'edge function (à adapter avec ton project ref Supabase)
-- ----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.purge_khepra_cache()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER -- Exécute avec les privilèges du créateur
AS $$
DECLARE
  edge_url TEXT;
  edge_token TEXT;
  payload JSONB;
  res RECORD;
  slug_val TEXT;
BEGIN
  -- Détermine le slug depuis la ligne modifiée
  -- kb_pages a probablement une colonne slug, sinon on utilise id
  slug_val := COALESCE(
    NEW.slug,
    NEW.url_slug,
    NEW.page_slug,
    NEW.id::TEXT
  );

  IF slug_val IS NULL OR slug_val = '' THEN
    RETURN NEW;
  END IF;

  -- URL de l'Edge Function (déployée et active)
  edge_url := 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/cache-purge-handler';

  -- Token JWT de service pour authentifier l'appel vers l'edge function
  edge_token := current_setting('app.edge_service_token', true);

  -- Construction du payload
  payload := jsonb_build_object(
    'slug', slug_val,
    'table', TG_TABLE_NAME,
    'operation', TG_OP,
    'triggered_by', COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', 'system')
  );

  -- Appel HTTP vers l'Edge Function via pg_net
  -- Si pg_net n'est pas disponible, cette partie échouera — voir fallback ci-dessous
  BEGIN
    SELECT * INTO res
    FROM net.http_post(
      url := edge_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || COALESCE(edge_token, ''),
        'X-KOS-Source', 'supabase-trigger'
      ),
      body := payload
    );

    -- Log local immédiat (même si l'edge function est async)
    INSERT INTO public.cache_purge_log(slug, table_source, operation, provider, status, success, triggered_by)
    VALUES (slug_val, TG_TABLE_NAME, TG_OP, 'edge_function', res.status_code, res.status_code BETWEEN 200 AND 299, COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', 'system'));

  EXCEPTION WHEN OTHERS THEN
    -- Fallback: log l'échec sans bloquer la transaction
    INSERT INTO public.cache_purge_log(slug, table_source, operation, provider, status, success, triggered_by)
    VALUES (slug_val, TG_TABLE_NAME, TG_OP, 'edge_function_error', 0, FALSE, COALESCE(current_setting('request.jwt.claims', true)::jsonb->>'email', 'system'));
  END;

  RETURN NEW;
END;
$$;

-- ----------------------------------------------------------------------------
-- 3. TRIGGER: dès que kb_pages est modifié → purge
-- ----------------------------------------------------------------------------
-- Adapter les colonnes selon ta structure réelle de kb_pages
-- Ici on suppose que kb_pages a: content_html, last_updated, slug
-- ----------------------------------------------------------------------------

DROP TRIGGER IF EXISTS trg_purge_on_kb_pages_update ON public.kb_pages;

CREATE TRIGGER trg_purge_on_kb_pages_update
AFTER INSERT OR UPDATE OF content_html, last_updated, title, slug
ON public.kb_pages
FOR EACH ROW
EXECUTE FUNCTION public.purge_khepra_cache();

-- ----------------------------------------------------------------------------
-- 4. SECRETS & CONFIGURATION
-- ----------------------------------------------------------------------------
-- Ces valeurs doivent être remplacées par tes vrais secrets.
-- Ne JAMAIS commiter de vrais secrets dans ce fichier.
-- Utilise plutôt Supabase Vault (pgcrypto) ou Edge Function Secrets.
-- ----------------------------------------------------------------------------

-- Configuration de l'Edge Function
-- ALTER DATABASE postgres SET app.supabase_project_ref = 'TON_PROJECT_REF';
-- ALTER DATABASE postgres SET app.purge_edge_url = 'https://TON_REF.supabase.co/functions/v1/cache-purge-handler';

-- Token pour authentifier les appels inter-services (génère un JWT fort)
-- ALTER DATABASE postgres SET app.edge_service_token = 'TON_TOKEN_JWT';

-- Cloudflare (optionnel — si tu as Cloudflare devant Netlify)
-- ALTER DATABASE postgres SET app.cf_zone_id = 'xxx';
-- ALTER DATABASE postgres SET app.cf_api_token = 'xxx';

-- Datadog (optionnel)
-- ALTER DATABASE postgres SET app.dd_api_key = 'xxx';

-- ----------------------------------------------------------------------------
-- 5. ALTERNATIVE SANS pg_net: Supabase Database Webhooks
-- ----------------------------------------------------------------------------
-- Si pg_net n'est PAS disponible sur ton projet Supabase,
-- configure un Webhook dans Supabase Dashboard:
--
-- 1. Va dans Supabase Dashboard → Database → Webhooks
-- 2. Crée un nouveau webhook:
--    - Table: kb_pages
--    - Events: INSERT, UPDATE
--    - Columns: content_html, last_updated, title, slug
--    - URL: https://<PROJECT_REF>.supabase.co/functions/v1/cache-purge-handler
--    - Headers: Content-Type: application/json
-- 3. Le payload JSON sera envoyé automatiquement
-- 4. L'Edge Function cache-purge-handler recevra les events
--
-- Avantage: pas besoin de pg_net, plus simple à maintenir
-- Inconvénient: dépend du dashboard Supabase, pas versionnable en SQL pur
-- ----------------------------------------------------------------------------

-- ----------------------------------------------------------------------------
-- 6. VÉRIFICATION POST-INSTALL
-- ----------------------------------------------------------------------------
-- Teste le système avec:
-- SELECT * FROM public.cache_purge_log ORDER BY purged_at DESC LIMIT 10;
--
-- Pour forcer un test manuel:
-- UPDATE public.kb_pages SET last_updated = NOW() WHERE slug = 'test-page';
-- Puis vérifie les logs:
-- SELECT * FROM public.cache_purge_log WHERE slug = 'test-page';
-- ----------------------------------------------------------------------------