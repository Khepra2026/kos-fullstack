-- ============================================================================
-- KHEPRA — BCEAO Circulars Big Four SEO/GEO Auto-Generation Engine
-- Adaptation du snippet Meta AI vers la stack KHEPRA existante
-- ============================================================================
-- Objectif : 1 circulaire BCEAO = 5 pages SEO/GEO cibles auto-générées dans kb_pages
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. ALTER TABLE circulars — ajout colonnes manquantes du snippet
-- ----------------------------------------------------------------------------

ALTER TABLE public.circulars
  ADD COLUMN IF NOT EXISTS crawled boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS articles_cles jsonb,
  ADD COLUMN IF NOT EXISTS bigfour_impact int DEFAULT 100;

-- Index pour le trigger sur crawled
CREATE INDEX IF NOT EXISTS idx_circulars_crawled ON public.circulars(crawled) WHERE crawled = true;
CREATE INDEX IF NOT EXISTS idx_circulars_source_authority ON public.circulars(source_authority);

-- ----------------------------------------------------------------------------
-- 2. ALTER TABLE kb_pages — ajout colonne bigfour_metadata
-- ----------------------------------------------------------------------------

ALTER TABLE public.kb_pages
  ADD COLUMN IF NOT EXISTS bigfour_metadata jsonb;

CREATE INDEX IF NOT EXISTS idx_kb_pages_bigfour ON public.kb_pages(bigfour_metadata) WHERE bigfour_metadata IS NOT NULL;

-- ----------------------------------------------------------------------------
-- 3. CREATE TABLE circular_page_map — mapping 1 circulaire = N pages SEO/GEO
-- ----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.circular_page_map (
  id bigserial PRIMARY KEY,
  circular_id uuid NOT NULL REFERENCES public.circulars(id) ON DELETE CASCADE,
  slug text NOT NULL UNIQUE,
  type text NOT NULL CHECK (type IN ('Resume','Article_Explique','Checklist','FAQ','Cas_Pratique')),
  intent text, -- 'informationnel', 'transactionnel', 'commercial'
  priority numeric(2,1) DEFAULT 0.9,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cpm_circular_id ON public.circular_page_map(circular_id);
CREATE INDEX IF NOT EXISTS idx_cpm_type ON public.circular_page_map(type);

-- ----------------------------------------------------------------------------
-- 4. TRIGGER FUNCTION — auto-génère kb_pages quand circulaire devient crawled
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

    -- Fallback si pas de régulateur lié
    IF v_regulator_name IS NULL THEN
      v_regulator_name := NEW.source_authority;
    END IF;

    -- Générer le base slug depuis le numéro de circulaire
    v_base_slug := lower(regexp_replace(NEW.circular_number, '[^a-zA-Z0-9]', '-', 'g'));

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
        sitemap_priority
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
        COALESCE(m.priority, 0.9)
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        meta_desc = EXCLUDED.meta_desc,
        h1 = EXCLUDED.h1,
        bigfour_metadata = EXCLUDED.bigfour_metadata,
        updated_at = now();

    END LOOP;

  END IF;

  RETURN NEW;
END;
$$;

-- Trigger sur UPDATE de la colonne crawled
DROP TRIGGER IF EXISTS trg_gen_pages_on_crawl ON public.circulars;
CREATE TRIGGER trg_gen_pages_on_crawl
  AFTER UPDATE OF crawled ON public.circulars
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_pages_from_circular();

-- ----------------------------------------------------------------------------
-- 5. MISE À JOUR des circulars BCEAO existants avec articles_cles + metadata
-- ----------------------------------------------------------------------------

UPDATE public.circulars
SET
  articles_cles = '{"3": "Administrateurs indépendants", "8": "Comité d\'audit", "12": "Conseil administration"}'::jsonb,
  bigfour_impact = 100,
  keywords = ARRAY['gouvernance','conseil_administration','administrateurs_independants','bceao']
WHERE circular_number = '01-2017/CB/C';

UPDATE public.circulars
SET
  articles_cles = '{"15": "Cartographie risques", "49": "Plan audit fondé risques", "51": "3 lignes défense", "22": "Conformité LBC/FT"}'::jsonb,
  bigfour_impact = 100,
  keywords = ARRAY['controle_interne','3_lignes_defense','LBC/FT','audit_interne','cartographie_risques','bceao']
WHERE circular_number = '03-2017/CB/C';

UPDATE public.circulars
SET
  articles_cles = '{"8": "Seuil déclenchement", "12": "Plan préventif", "15": "Redressement"}'::jsonb,
  bigfour_impact = 95,
  keywords = ARRAY['ppr','plan_preventif_redressement','resolution','bale_iii','bceao']
WHERE circular_number = '001-2020/CB/C';

-- Les 3 circulaires récentes (CIRC-xxx-2025) — données déjà en base
UPDATE public.circulars
SET
  articles_cles = '{"1": "PCA exigences minimales", "5": "RTO RPO SFD"}'::jsonb,
  bigfour_impact = 90,
  keywords = ARRAY['PCA','RTO','RPO','SFD','continuite_activite','bceao']
WHERE circular_number = 'CIRC-004-2025';

UPDATE public.circulars
SET
  articles_cles = '{"1": "Format XBRL", "3": "Reporting trimestriel", "8": "Prudentiel SFD"}'::jsonb,
  bigfour_impact = 85,
  keywords = ARRAY['XBRL','reporting','prudentiel','SFD','bceao']
WHERE circular_number = 'CIRC-003-2025';

UPDATE public.circulars
SET
  articles_cles = '{"1": "Conformité LBC/FT SFD", "5": "STR", "12": "Vigilance renforcée"}'::jsonb,
  bigfour_impact = 95,
  keywords = ARRAY['LBC/FT','SFD','STR','conformite','bceao']
WHERE circular_number = 'CIRC-001-2025';

-- ----------------------------------------------------------------------------
-- 6. SEED des circulaires BCEAO manquantes du snippet Meta AI
-- ----------------------------------------------------------------------------

INSERT INTO public.circulars (
  reference, title, circular_number, date_issued, official_url,
  keywords, source_authority, regulator_id, status, summary,
  articles_cles, bigfour_impact, metadata
)
VALUES
(
  'Circulaire 01-2010/CB/C — Gouvernance des établissements de crédit',
  'Gouvernance des établissements de crédit',
  '01-2010/CB/C',
  '2010-01-15',
  'https://www.bceao.int/fr/reglementations/circulaire-01-2010',
  ARRAY['gouvernance','conseil_administration','bceao','umoa'],
  'BCEAO',
  'f8518363-2bec-4099-a297-f3f03c76b33a',
  'in_force',
  'Première circulaire BCEAO structurant la gouvernance des établissements de crédit dans l\'UMOA. Fixe les règles d\'indépendance des administrateurs et les obligations du conseil d\'administration.',
  '{"3": "Administrateurs indépendants", "5": "Conseil administration"}'::jsonb,
  95,
  '{"historique": true, "source_snippet": "meta-ai-2026"}'::jsonb
)
ON CONFLICT (reference) DO NOTHING;

INSERT INTO public.circulars (
  reference, title, circular_number, date_issued, official_url,
  keywords, source_authority, regulator_id, status, summary,
  articles_cles, bigfour_impact, metadata
)
VALUES
(
  'Directive 02-2015/CM/UEMOA — Lutte contre le blanchiment de capitaux',
  'Lutte contre blanchiment',
  '02-2015/CM/UEMOA',
  '2015-07-02',
  'https://www.bceao.int/fr/reglementations/directive-02-2015',
  ARRAY['LBC/FT','vigilance','declaration_soupcon','bceao'],
  'BCEAO',
  'f8518363-2bec-4099-a297-f3f03c76b33a',
  'in_force',
  'Directive du Conseil des Ministres UEMOA renforçant la lutte contre le blanchiment et le financement du terrorisme. Obligations de vigilance et déclaration de soupçon.',
  '{"22": "Déclaration soupçon", "15": "Vigilance renforcée", "8": "KYC obligatoire"}'::jsonb,
  100,
  '{"historique": true, "source_snippet": "meta-ai-2026"}'::jsonb
)
ON CONFLICT (reference) DO NOTHING;

INSERT INTO public.circulars (
  reference, title, circular_number, date_issued, official_url,
  keywords, source_authority, regulator_id, status, summary,
  articles_cles, bigfour_impact, metadata
)
VALUES
(
  'Circulaire 12-2026/CB/C — Résilience opérationnelle DORA UMOA',
  'Résilience opérationnelle DORA UMOA',
  '12-2026/CB/C',
  '2026-06-30',
  'https://www.bceao.int/fr/reglementations/circulaire-12-2026',
  ARRAY['cyber','DORA','TIC','resilience_operationnelle','tests_intrusion','bceao'],
  'BCEAO',
  'f8518363-2bec-4099-a297-f3f03c76b33a',
  'in_force',
  'Circulaire transposant la directive DORA dans l\'UMOA. Exigences de résilience opérationnelle des TIC, tests d\'intrusion annuels et gouvernance cyber pour banques et SFD.',
  '{"5": "Tests intrusion", "8": "Gouvernance cyber", "12": "Cartographie systèmes TIC", "15": "Plan continuité numérique"}'::jsonb,
  100,
  '{"historique": false, "source_snippet": "meta-ai-2026", "upcoming": true}'::jsonb
)
ON CONFLICT (reference) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 7. FONCTION — Génère les 5 mappings SEO/GEO par circulaire BCEAO
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

-- ----------------------------------------------------------------------------
-- 8. EXÉCUTION — Génère les mappings pour toutes les circulaires BCEAO
-- ----------------------------------------------------------------------------

SELECT generate_circular_page_map('BCEAO');

-- ----------------------------------------------------------------------------
-- 9. VIEW — Dashboard Big Four : circulaires × pages générées
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
-- 10. FONCTION — Marquer une circulaire comme crawled et déclencher la génération
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
-- 11. ENABLE RLS sur circular_page_map (si pas déjà fait)
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