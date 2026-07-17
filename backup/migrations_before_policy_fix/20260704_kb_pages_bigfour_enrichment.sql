-- ============================================================================
-- KHEPRA KB_PAGES BIG FOUR ENRICHMENT
-- Snippet original : Meta AI (Next.js + OpenAI gpt-4o batch regen)
-- Objectif : Ajouter les colonnes nécessaires à kb_pages pour le batch regen
--            par régulateur (BCEAO / COBAC / OHADA)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. COLONNES MANQUANTES — kb_pages enrichment
-- ----------------------------------------------------------------------------
ALTER TABLE public.kb_pages
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS doc_ids uuid[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS bigfour_metadata jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS content_html text,
  ADD COLUMN IF NOT EXISTS faq_json jsonb DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS last_updated timestamptz;

-- ----------------------------------------------------------------------------
-- 2. CONTRAINTES & INDEXES
-- ----------------------------------------------------------------------------
-- Slug unique pour le routage des pages et le revalidate ISR
ALTER TABLE public.kb_pages
  ADD CONSTRAINT IF NOT EXISTS uq_kb_pages_slug UNIQUE (slug);

-- Index GIN sur bigfour_metadata pour le filtre .contains(regulator)
CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour_metadata
  ON public.kb_pages USING gin(bigfour_metadata);

-- Index sur slug pour les lookups rapides
CREATE INDEX IF NOT EXISTS idx_kb_pages_slug
  ON public.kb_pages(slug);

-- Index sur doc_ids (GIN) pour les jointures kb_docs
CREATE INDEX IF NOT EXISTS idx_kb_pages_doc_ids
  ON public.kb_pages USING gin(doc_ids);

-- Index sur last_updated pour le tri et les checks
CREATE INDEX IF NOT EXISTS idx_kb_pages_last_updated
  ON public.kb_pages(last_updated DESC);

-- ----------------------------------------------------------------------------
-- 3. TRIGGER : Mise à jour auto de updated_at + last_updated
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.trg_kb_pages_update_timestamp()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.last_updated = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_kb_pages_auto_timestamp ON public.kb_pages;

CREATE TRIGGER trg_kb_pages_auto_timestamp
  BEFORE UPDATE ON public.kb_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_kb_pages_update_timestamp();

-- ----------------------------------------------------------------------------
-- 4. TRIGGER : Auto-purge cache Netlify sur update kb_pages (si pas déjà)
-- ----------------------------------------------------------------------------
-- Ce trigger appelle pg_net pour purger le cache Netlify/Cloudflare
-- dès qu'une page est mise à jour (content_html, faq_json, last_updated)
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.trg_purge_on_kb_pages_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  edge_url TEXT := 'https://pgfwhahiwqvqeahpirjx.supabase.co/functions/v1/cache-purge-handler';
  edge_token TEXT;
BEGIN
  -- Token depuis les settings DB
  edge_token := COALESCE(
    current_setting('app.edge_service_token', true),
    current_setting('app.supabase_service_key', true),
    ''
  );

  -- Ne déclencher que si content_html ou bigfour_metadata change
  IF NEW.content_html IS DISTINCT FROM OLD.content_html
     OR NEW.bigfour_metadata IS DISTINCT FROM OLD.bigfour_metadata THEN
    BEGIN
      PERFORM net.http_post(
        url := edge_url,
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || edge_token
        ),
        body := jsonb_build_object(
          'slug', COALESCE(NEW.slug, NEW.id::text),
          'table', 'kb_pages',
          'operation', 'update',
          'cache_tags', jsonb_build_array('khepra', 'kos-ai', 'page', COALESCE(NEW.slug, 'unknown'))
        ),
        timeout_milliseconds := 15000
      );
    EXCEPTION WHEN OTHERS THEN
      -- Cache purge non bloquant — log silencieux
      RAISE WARNING 'KB pages cache purge failed: %', SQLERRM;
    END;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_purge_kb_pages ON public.kb_pages;

CREATE TRIGGER trg_purge_kb_pages
  AFTER UPDATE ON public.kb_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.trg_purge_on_kb_pages_update();

-- ----------------------------------------------------------------------------
-- 5. RLS — kb_pages (déjà activé probablement, s'assurer)
-- ----------------------------------------------------------------------------
ALTER TABLE public.kb_pages ENABLE ROW LEVEL SECURITY;

-- Politique lecture publique (pages Big Four publiques)
CREATE POLICY IF NOT EXISTS "kb_pages_select_public"
  ON public.kb_pages FOR SELECT USING (true);

-- Politique écriture service_role / admin
CREATE POLICY IF NOT EXISTS "kb_pages_insert_service"
  ON public.kb_pages FOR INSERT
  WITH CHECK (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

CREATE POLICY IF NOT EXISTS "kb_pages_update_service"
  ON public.kb_pages FOR UPDATE
  USING (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

CREATE POLICY IF NOT EXISTS "kb_pages_delete_service"
  ON public.kb_pages FOR DELETE
  USING (auth.role() = 'service_role' OR auth.role() = 'supabase_admin');

-- ----------------------------------------------------------------------------
-- 6. SEED EXEMPLE — 3 pages Big Four pour tester le batch regen
-- ----------------------------------------------------------------------------
INSERT INTO public.kb_pages (title, slug, content, source_id, type, url, doc_ids, bigfour_metadata, content_html, faq_json)
SELECT
  'Conformité BCEAO — Ratios Prudentiels SFD',
  'conformite-bceao-ratios-prudentiels-sfd',
  'Page analyse réglementaire BCEAO sur les ratios prudentiels applicables aux SFD en UEMOA.',
  (SELECT id FROM public.kb_sources WHERE url = 'https://www.bceao.int/fr/reglementations' LIMIT 1),
  'regulatory_page',
  'https://khepraexperts.com/knowledge/conformite-bceao-ratios-prudentiels-sfd',
  ARRAY[]::uuid[],
  '{"regulator": ["BCEAO"], "domain": "compliance", "pillar": "BU1"}',
  '<h1>Conformité BCEAO — Ratios Prudentiels SFD</h1><p>Contenu généré automatiquement par KOS AI.</p>',
  '[]'
WHERE NOT EXISTS (SELECT 1 FROM public.kb_pages WHERE slug = 'conformite-bceao-ratios-prudentiels-sfd');

INSERT INTO public.kb_pages (title, slug, content, source_id, type, url, doc_ids, bigfour_metadata, content_html, faq_json)
SELECT
  'Conformité COBAC — Directives Bancaires CEMAC',
  'conformite-cobac-directives-bancaires-cemac',
  'Page analyse réglementaire COBAC sur les directives bancaires applicables en zone CEMAC.',
  (SELECT id FROM public.kb_sources WHERE url = 'https://www.beac.int/cobac/reglementation/' LIMIT 1),
  'regulatory_page',
  'https://khepraexperts.com/knowledge/conformite-cobac-directives-bancaires-cemac',
  ARRAY[]::uuid[],
  '{"regulator": ["COBAC"], "domain": "compliance", "pillar": "BU1"}',
  '<h1>Conformité COBAC — Directives Bancaires CEMAC</h1><p>Contenu généré automatiquement par KOS AI.</p>',
  '[]'
WHERE NOT EXISTS (SELECT 1 FROM public.kb_pages WHERE slug = 'conformite-cobac-directives-bancaires-cemac');

INSERT INTO public.kb_pages (title, slug, content, source_id, type, url, doc_ids, bigfour_metadata, content_html, faq_json)
SELECT
  'OHADA — Réforme du Droit des Affaires',
  'ohada-reforme-droit-affaires',
  'Page analyse sur les réformes OHADA du droit des affaires en Afrique francophone.',
  (SELECT id FROM public.kb_sources WHERE url = 'https://www.ohada.org/actualites/' LIMIT 1),
  'regulatory_page',
  'https://khepraexperts.com/knowledge/ohada-reforme-droit-affaires',
  ARRAY[]::uuid[],
  '{"regulator": ["OHADA"], "domain": "governance", "pillar": "BU2"}',
  '<h1>OHADA — Réforme du Droit des Affaires</h1><p>Contenu généré automatiquement par KOS AI.</p>',
  '[]'
WHERE NOT EXISTS (SELECT 1 FROM public.kb_pages WHERE slug = 'ohada-reforme-droit-affaires');

-- ----------------------------------------------------------------------------
-- 7. VÉRIFICATION POST-INSTALL
-- ----------------------------------------------------------------------------
-- Voir la structure enrichie :
-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'kb_pages' ORDER BY ordinal_position;

-- Voir les pages Big Four :
-- SELECT slug, title, bigfour_metadata FROM public.kb_pages WHERE bigfour_metadata ? 'regulator';

-- Tester le filtre par régulateur (comme le snippet Next.js) :
-- SELECT slug, doc_ids, bigfour_metadata FROM public.kb_pages
-- WHERE bigfour_metadata @> '{"regulator": ["BCEAO"]}';

-- Compter les pages par régulateur :
-- SELECT jsonb_array_elements_text(bigfour_metadata->'regulator') AS regulator, COUNT(*) FROM public.kb_pages GROUP BY regulator;

-- ----------------------------------------------------------------------------
-- NOTE D'INSTALLATION
-- ----------------------------------------------------------------------------
-- Copie-colle ce fichier dans Supabase SQL Editor et exécute.
-- Puis configure le secret OpenAI dans Supabase Edge Functions :
--   OPENAI_API_KEY = sk-...
-- ----------------------------------------------------------------------------