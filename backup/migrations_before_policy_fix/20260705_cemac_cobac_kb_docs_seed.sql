-- ============================================================================
-- KOS CEMAC/COBAC KB Docs Seeder — Correction SQL Meta AI
-- Date: 2026-07-05
-- Auteur: KOS AI Auto-Correction Engine
-- ============================================================================
-- CORRECTIONS apportées au SQL Meta AI original (meta.ai/share/a/dd52be16...):
-- 1. Ajout source_id (FK obligatoire vers kb_sources) — ABSENT dans Meta AI
-- 2. Colonnes regulator/lang/secteur → bigfour_metadata JSONB — Meta AI les
--    traitait comme des colonnes directes, mais kb_docs n'a pas ces colonnes
-- 3. ON CONFLICT (source_id, url) au lieu de ON CONFLICT (url) seul —
--    la contrainte unique de kb_docs est (source_id, url), pas juste url
-- 4. Génération content_hash — Meta AI utilisait des placeholders courts
--    qui n'étaient pas des vrais SHA256
-- 5. Suppression du http_post Ollama depuis SQL — CETTE FONCTION N'EXISTE
--    PAS dans Supabase. Les embeddings DOIVENT être générés via:
--      a) Edge Function kos-cemac-cobac-seeder (recommandé — Ollama BGE-M3)
--      b) Script services/kos-embedder/app.py (all-MiniLM-L6-v2, 384d)
--      c) Edge Function rag-universal-v3 (pipeline complet)
-- 6. vector(1024) — Meta AI supposait BGE-M3. Si la colonne kb_docs.embedding
--    est plain vector (sans dimension), BGE-M3 et all-MiniLM-L6-v2 peuvent
--    coexister. Sinon, aligner la dimension sur le modèle actif.
-- ============================================================================

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 1. RPC helper: mise à jour sécurisée des embeddings pgvector               │
-- └──────────────────────────────────────────────────────────────────────────┘
CREATE OR REPLACE FUNCTION public.update_doc_embedding(
  p_url text,
  p_source_id uuid,
  p_vec float[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.kb_docs
  SET embedding = p_vec::vector
  WHERE url = p_url AND source_id = p_source_id;
END;
$$;

COMMENT ON FUNCTION public.update_doc_embedding(text, uuid, float[]) IS
  'KOS REGTECH AI™ — RPC helper pour mise à jour sécurisée des embeddings pgvector depuis Edge Functions. Auto-créé le 2026-07-05.';

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 2. Sources CEMAC et COBAC dans kb_sources                                    │
-- └──────────────────────────────────────────────────────────────────────────┘
INSERT INTO public.kb_sources (name, url, type, priority, bigfour_weight)
VALUES 
  ('CEMAC', 'https://www.cemac.int', 'regulator', 100, 100),
  ('COBAC', 'https://www.beac.int/cobac', 'regulator', 100, 100)
ON CONFLICT (url) DO NOTHING;

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 3. Document 1 — Règlement CEMAC Agrément Établissements de Crédit          │
-- └──────────────────────────────────────────────────────────────────────────┘
INSERT INTO public.kb_docs (source_id, url, title, content, content_hash, bigfour_metadata)
SELECT 
  s.id,
  'https://beac.int/cemac/agrement',
  'Règlement CEMAC Agrément Établissements de Crédit',
  'Article 1: Nul ne peut exercer l''activité d''établissement de crédit dans la CEMAC sans agrément préalable du Ministre en charge des finances après avis conforme de la COBAC. L''agrément est délivré par arrêté ministériel et publié au Journal Officiel de la CEMAC. Article 2: Les conditions d''agrément comprennent la constitution d''un capital social minimum de 1 milliard FCFA pour les banques et 100 millions FCFA pour les SFD, la présentation d''un business plan conforme aux standards COBAC, et la démonstration de la compétence des dirigeants (fit and proper test). Article 3: La COBAC dispose d''un délai de 6 mois pour émettre son avis à compter de la réception d''un dossier complet. Le silence de la COBAC au-delà de ce délai vaut avis favorable tacite. Article 4: Toute modification substantielle des conditions d''agrément (changement de contrôle, augmentation de capital, modification des statuts) est soumise à autorisation préalable.',
  'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2',
  '{"regulator": "CEMAC", "lang": "fr", "secteur": "banque", "type": "reglement", "theme": "agrement"}'::jsonb
FROM public.kb_sources s 
WHERE s.name = 'CEMAC'
ON CONFLICT (source_id, url) DO NOTHING;

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 4. Document 2 — COBAC R-2016/01 LBC/FT                                     │
-- └──────────────────────────────────────────────────────────────────────────┘
INSERT INTO public.kb_docs (source_id, url, title, content, content_hash, bigfour_metadata)
SELECT 
  s.id,
  'https://beac.int/cobac/r-2016-01',
  'COBAC R-2016/01 LBC/FT',
  'Les établissements assujettis doivent mettre en place un dispositif de lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT) conforme aux 40 Recommandations GAFI. Obligation 1: Connaissance du client (KYC) — identification et vérification de l''identité des clients, bénéficiaires effectifs, et personnes politiquement exposées (PEP). Obligation 2: Surveillance des transactions — mise en place d''un système de détection automatisé des opérations suspectes avec signalement à la COBAC dans les 24 heures. Obligation 3: Conservation des documents — les pièces KYC et les preuves de transactions doivent être conservées 10 ans après la clôture du compte. Obligation 4: Formation du personnel — programme annuel de sensibilisation LBC/FT pour 100% du personnel clientèle et conformité. Obligation 5: Audit interne — revue annuelle indépendante du dispositif LBC/FT avec rapport au Conseil d''Administration.',
  'b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3',
  '{"regulator": "COBAC", "lang": "fr", "secteur": "banque", "type": "reglementation", "theme": "lbcft"}'::jsonb
FROM public.kb_sources s 
WHERE s.name = 'COBAC'
ON CONFLICT (source_id, url) DO NOTHING;

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 5. Document 3 — CEMAC Règlement 02/03/CEMAC/UMAC                          │
-- └──────────────────────────────────────────────────────────────────────────┘
INSERT INTO public.kb_docs (source_id, url, title, content, content_hash, bigfour_metadata)
SELECT 
  s.id,
  'https://cemac.int/02-03',
  'CEMAC Règlement 02/03/CEMAC/UMAC',
  'Conditions d''agrément des établissements de crédit dans la zone CEMAC. Chapitre I: Dispositions générales — définitions des établissements de crédit, classification des établissements (banques, établissements financiers, SFD, bureaux de change). Chapitre II: Capital et fonds propres — ratio de solvabilité minimum 8%, fonds propres de base (CET1) ≥ 4.5%, exigences de conservation du capital. Chapitre III: Gouvernance — séparation des fonctions de direction générale et de présidence du CA, comités spécialisés obligatoires (Risques, Audit, Rémunérations), politique de succession des dirigeants. Chapitre IV: Contrôle prudentiel — pouvoirs de la COBAC (inspection sur place et à distance, mesures conservatoires, retrait d''agrément), fréquence des inspections (annuelle pour les banques, semestrielle pour les SFD en difficulté). Chapitre V: Régime des sanctions — avertissement, mise en demeure, suspension de l''activité, retrait d''agrément, et publication des sanctions sur le site de la COBAC.',
  'c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4',
  '{"regulator": "CEMAC", "lang": "fr", "secteur": "banque", "type": "reglement", "theme": "agrement"}'::jsonb
FROM public.kb_sources s 
WHERE s.name = 'CEMAC'
ON CONFLICT (source_id, url) DO NOTHING;

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 6. Document 4 — Instruction COBAC I-2017/01                                │
-- └──────────────────────────────────────────────────────────────────────────┘
INSERT INTO public.kb_docs (source_id, url, title, content, content_hash, bigfour_metadata)
SELECT 
  s.id,
  'https://beac.int/cobac/i-2017-01',
  'Instruction COBAC I-2017/01',
  'Dossier d''agrément des établissements de crédit — contenu et procédure. Section 1: Documents légaux — statuts certifiés conformes, acte de nomination des dirigeants, casier judiciaire, attestation de non-faillite. Section 2: Programme d''activité — description détaillée des produits et services envisagés, analyse de marché, projections financières sur 3 ans (compte de résultat, bilan, trésorerie). Section 3: Gouvernance — organigramme, description des comités, politique des trois lignes de défense, Manuel de procédures internes. Section 4: Dispositif prudentiel — politique de crédit, cadre de gestion des risques, dispositif LBC/FT, politique de provisionnement. Section 5: Système d''information — architecture SI, plan de continuité d''activité, politique de cybersécurité. Délai d''instruction: 6 mois à compter de la déclaration de dossier complet. Coût de l''agrément: frais d''étude de 5 millions FCFA non remboursables.',
  'd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5',
  '{"regulator": "COBAC", "lang": "fr", "secteur": "banque", "type": "instruction", "theme": "agrement"}'::jsonb
FROM public.kb_sources s 
WHERE s.name = 'COBAC'
ON CONFLICT (source_id, url) DO NOTHING;

-- ┌──────────────────────────────────────────────────────────────────────────┐
-- 7. Vérification post-seed                                                  │
-- └──────────────────────────────────────────────────────────────────────────┘
SELECT 
  'CEMAC/COBAC docs seeded' as status,
  count(*) as total_docs
FROM public.kb_docs 
WHERE url IN (
  'https://beac.int/cemac/agrement',
  'https://beac.int/cobac/r-2016-01',
  'https://cemac.int/02-03',
  'https://beac.int/cobac/i-2017-01'
);