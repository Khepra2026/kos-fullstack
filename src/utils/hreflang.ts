/**
 * Utilitaire centralisé pour les balises hreflang FR/EN
 * Améliore le référencement international (Google, Bing, etc.)
 *
 * NOTE SEO — 28 JUIN 2026 : Le site est désormais bilingue avec
 * URLs distinctes FR/EN pour les 4 Business Units KOS.
 * Les hreflang bidirectionnels (fr ↔ en + x-default) sont gérés par :
 *   - BULanguageSwitcher (rendu React dans chaque page BU)
 *   - src/data/buHreflangMap.ts (mapping centralisé)
 *
 * Pour les autres pages (monolingues) : fr + x-default uniquement.
 * Google considère comme erreur les hreflang pointant vers la même URL.
 */

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://khepraexperts.com';

export interface HreflangLink {
  lang: string;
  url: string;
}

/**
 * Génère les balises hreflang standard pour une page monolingue FR.
 *
 * SEO : on ne génère PAS de hreflang 'en' identique à 'fr' — Google
 * signale cette configuration comme erreur. Seuls fr et x-default.
 */
export function buildHreflang(path: string): HreflangLink[] {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // No trailing slash — canonical URLs are slash-free to prevent redirect loops
  const fullUrl = `${SITE_URL}${cleanPath}`;
  return [
    { lang: 'fr', url: fullUrl },
    { lang: 'x-default', url: fullUrl },
  ];
}

/**
 * Génère les balises hreflang pour une page bilingue avec URLs distinctes.
 * À utiliser pour les pages ayant une version FR et une version EN séparées.
 *
 * Retourne 3 liens : fr, en, x-default (fr comme langue par défaut).
 */
export function buildBilingualHreflang(pathFr: string, pathEn: string): HreflangLink[] {
  const normalize = (p: string) => {
    const clean = p.startsWith('/') ? p : `/${p}`;
    // No trailing slash — canonical URLs are slash-free
    return clean;
  };
  return [
    { lang: 'fr', url: `${SITE_URL}${normalize(pathFr)}` },
    { lang: 'en', url: `${SITE_URL}${normalize(pathEn)}` },
    { lang: 'x-default', url: `${SITE_URL}${normalize(pathFr)}` },
  ];
}

/**
 * Hreflang pour les articles de blog (une seule langue par article).
 * Utilise le slug sémantique quand disponible, sinon l'ID en fallback.
 * Si l'article existe dans les deux langues, on pointe vers la même URL.
 */
export function buildArticleHreflang(articleId: string, lang: 'fr' | 'en'): HreflangLink[] {
  const cleanId = articleId.startsWith('/') ? articleId.replace(/^\/blog\//, '').replace(/\/$/, '') : articleId;
  const url = `${SITE_URL}/blog/${cleanId}`;
  return [
    { lang, url },
    { lang: 'x-default', url },
  ];
}

/**
 * Hreflang pour les pages de détail de service.
 */
export function buildServiceDetailHreflang(slug: string): HreflangLink[] {
  return buildHreflang(`/services/${slug}`);
}

/**
 * Carte des hreflang par route statique du site.
 * Les URLs sont sans trailing slash — format canonique du site.
 */
export const STATIC_HREFLANG_MAP: Record<string, HreflangLink[]> = {
  // Pages principales
  '/': buildHreflang(''),
  '/about/': buildHreflang('/about'),
  '/expertises/': buildHreflang('/expertises'),
  '/approche/': buildHreflang('/approche'),
  '/partenaires/': buildHreflang('/partenaires'),
  '/equipe/': buildHreflang('/equipe'),
  '/services/': buildHreflang('/services'),
  '/blog/': buildHreflang('/blog'),
  '/resources/': buildHreflang('/resources'),
  '/case-studies/': buildHreflang('/case-studies'),
  '/case-studies/regtech-conformite-uemoa-cemac/': buildHreflang('/case-studies/regtech-conformite-uemoa-cemac'),
  '/case-studies/gouvernance-board-advisory-uemoa/': buildHreflang('/case-studies/gouvernance-board-advisory-uemoa'),
  '/case-studies/agrement-multinational-sfd-uemoa-cemac/': buildHreflang('/case-studies/agrement-multinational-sfd-uemoa-cemac'),
  '/case-studies/ingenierie-financiere-projet-industriel-cedao/': buildHreflang('/case-studies/ingenierie-financiere-projet-industriel-cedao'),
  '/decideurs/': buildHreflang('/decideurs'),
  '/sfd-conformite/': buildHreflang('/sfd-conformite'),
  '/sitemap/': buildHreflang('/sitemap'),
  '/experts/': buildHreflang('/experts'),
  '/careers/': buildHreflang('/careers'),
  '/solutions/': buildHreflang('/solutions'),
  '/insights/': buildHreflang('/insights'),
  '/whitepapers/': buildHreflang('/whitepapers'),
  '/publications/': buildHreflang('/publications'),
  '/contact/': buildHreflang('/contact'),

  // Pages de services individuelles
  '/services/conseil-strategique/': buildHreflang('/services/conseil-strategique'),
  '/services/gestion-de-projets/': buildHreflang('/services/gestion-de-projets'),
  '/services/developpement-organisationnel/': buildHreflang('/services/developpement-organisationnel'),
  '/services/renforcement-capacites/': buildHreflang('/services/renforcement-capacites'),
  '/services/diagnostic-organisationnel/': buildHreflang('/services/diagnostic-organisationnel'),
  '/services/audit-social/': buildHreflang('/services/audit-social'),
  '/services/ressources-humaines/': buildHreflang('/services/ressources-humaines'),
  '/services/transformation-digitale/': buildHreflang('/services/transformation-digitale'),
  '/services/communication-strategique/': buildHreflang('/services/communication-strategique'),
  '/services/levee-de-fonds/': buildHreflang('/services/levee-de-fonds'),
  '/agents-experts/': buildHreflang('/agents-experts'),

  // Services détaillés (anciennes URLs - compatibilité)
  '/conseil-strategique/': buildHreflang('/conseil-strategique'),
  '/gouvernance-entreprise/': buildHreflang('/gouvernance-entreprise'),
  '/inclusion-financiere-digitale/': buildHreflang('/inclusion-financiere-digitale'),
  '/gestion-risques-entreprise/': buildHreflang('/gestion-risques-entreprise'),

  // Industries
  '/industries/': buildHreflang('/industries'),
  '/industries/microfinance/': buildHreflang('/industries/microfinance'),
  '/industries/fintech/': buildHreflang('/industries/fintech'),
  '/industries/pme/': buildHreflang('/industries/pme'),
  '/industries/public-sector/': buildHreflang('/industries/public-sector'),

  // Régions
  '/regions/afrique/': buildHreflang('/regions/afrique'),
  '/regions/afrique-francophone/': buildHreflang('/regions/afrique-francophone'),
  '/regions/uemoa-cemac/': buildHreflang('/regions/uemoa-cemac'),
  '/regions/africa/': buildHreflang('/regions/africa'),
  '/regions/west-africa/': buildHreflang('/regions/west-africa'),

  // Pages piliers (SEO longue traîne)
  '/pillar/digital-transformation-africa/': buildHreflang('/pillar/digital-transformation-africa'),
  '/pillar/financial-inclusion-africa/': buildHreflang('/pillar/financial-inclusion-africa'),
  '/pillar/fintech-advisory-africa/': buildHreflang('/pillar/fintech-advisory-africa'),
  '/pillar/microfinance-transformation-africa/': buildHreflang('/pillar/microfinance-transformation-africa'),
  '/pillar/sme-development-africa/': buildHreflang('/pillar/sme-development-africa'),

  // Outils interactifs
  '/tools/': buildHreflang('/tools'),
  '/tools/diagnostic-organisationnel/': buildHreflang('/tools/diagnostic-organisationnel'),
  '/tools/maturite-digitale/': buildHreflang('/tools/maturite-digitale'),
  '/tools/evaluation-gouvernance/': buildHreflang('/tools/evaluation-gouvernance'),
  '/tools/diagnostic-transformation-digitale/': buildHreflang('/tools/diagnostic-transformation-digitale'),
  '/tools/evaluation-maturite-fintech/': buildHreflang('/tools/evaluation-maturite-fintech'),
  '/tools/audit-inclusion-financiere/': buildHreflang('/tools/audit-inclusion-financiere'),
  '/tools/evaluation-cybersecurite/': buildHreflang('/tools/evaluation-cybersecurite'),
  '/tools/evaluation-conformite-reglementaire/': buildHreflang('/tools/evaluation-conformite-reglementaire'),
  '/tools/diagnostic-strategique/': buildHreflang('/tools/diagnostic-strategique'),
  '/tools/simulateur-financier/': buildHreflang('/tools/simulateur-financier'),
  '/tools/stress-test-financier/': buildHreflang('/tools/stress-test-financier'),
  '/tools/investment-readiness/': buildHreflang('/tools/investment-readiness'),
  '/tools/diagnostic-risques/': buildHreflang('/tools/diagnostic-risques'),
  '/tools/performance-commerciale/': buildHreflang('/tools/performance-commerciale'),
  '/tools/benchmark-sectoriel/': buildHreflang('/tools/benchmark-sectoriel'),
  '/tools/simulateur-roi-marketing/': buildHreflang('/tools/simulateur-roi-marketing'),
  '/tools/generateur-roadmap-innovation/': buildHreflang('/tools/generateur-roadmap-innovation'),
  '/tools/tableau-kpi-qualite/': buildHreflang('/tools/tableau-kpi-qualite'),
  '/tools/diagnostic-rh-strategique/': buildHreflang('/tools/diagnostic-rh-strategique'),
  '/tools/diagnostic-esg-impact/': buildHreflang('/tools/diagnostic-esg-impact'),
  '/diagnostic-flash/': buildHreflang('/diagnostic-flash'),

  // Services individuels supplémentaires
  '/services/due-diligence-acquisition/': buildHreflang('/services/due-diligence-acquisition'),

  // Pages spécialisées
  '/investisseurs/': buildHreflang('/investisseurs'),
  '/projets-industriels/': buildHreflang('/projets-industriels'),
  '/strategie-digitale/': buildHreflang('/strategie-digitale'),

  // Lead Magnets
  '/lead-magnets/': buildHreflang('/lead-magnets'),
  '/lead-magnets/checklist-conformite-bceao-cobac/': buildHreflang('/lead-magnets/checklist-conformite-bceao-cobac'),
  '/lead-magnets/guide-levee-fonds-afrique/': buildHreflang('/lead-magnets/guide-levee-fonds-afrique'),
  '/lead-magnets/simulation-risque-reglementaire/': buildHreflang('/lead-magnets/simulation-risque-reglementaire'),
  '/lead-magnets/template-audit-gouvernance/': buildHreflang('/lead-magnets/template-audit-gouvernance'),
  '/lead-magnets/mini-rapport-due-diligence/': buildHreflang('/lead-magnets/mini-rapport-due-diligence'),
  '/lead-magnets/diagnostic-esg-maturite/': buildHreflang('/lead-magnets/diagnostic-esg-maturite'),

  // Knowledge Hub
  '/knowledge-hub/due-diligence/': buildHreflang('/knowledge-hub/due-diligence'),
  '/knowledge-hub/esg/': buildHreflang('/knowledge-hub/esg'),
  '/knowledge-hub/bceao/': buildHreflang('/knowledge-hub/bceao'),
  '/knowledge-hub/cobac/': buildHreflang('/knowledge-hub/cobac'),

  // Phases 5-7 (brand-guide, reporting, notifications) — pages noindex, pas de hreflang

  // Guides
  '/guide-due-diligence-afrique/': buildHreflang('/guide-due-diligence-afrique'),
  '/guide-esg-afrique/': buildHreflang('/guide-esg-afrique'),
  '/guide-investment-readiness/': buildHreflang('/guide-investment-readiness'),
  '/guide-gouvernance-imf/': buildHreflang('/guide-gouvernance-imf'),

  // Pages piliers FR
  '/pillar/conseil-strategique-pme-afrique/': buildHreflang('/pillar/conseil-strategique-pme-afrique'),
  '/pillar/transformation-digitale-ohada/': buildHreflang('/pillar/transformation-digitale-ohada'),
  '/pillar/levee-de-fonds-afrique/': buildHreflang('/pillar/levee-de-fonds-afrique'),

  // Pages légales et utilitaires
  '/legal/': buildHreflang('/legal'),
  '/privacy/': buildHreflang('/privacy'),
  '/cgu/': buildHreflang('/cgu'),
  '/cookies/': buildHreflang('/cookies'),
  '/securite-conformite/': buildHreflang('/securite-conformite'),
  '/charte-deontologique/': buildHreflang('/charte-deontologique'),

  // Articles de blog statiques (langue fr explicite)
  '/blog/conformite-cobac-cemac/': buildHreflang('/blog/conformite-cobac-cemac'),
  '/blog/bceao-ohada-conformite/': buildHreflang('/blog/bceao-ohada-conformite'),
  '/blog/3-lignes-defense-circulaire-03-2017/': buildHreflang('/blog/3-lignes-defense-circulaire-03-2017'),
  '/blog/esg-afrique-entreprises/': buildHreflang('/blog/esg-afrique-entreprises'),
  '/blog/daf-externalise-pilotage-financier-pme-afrique/': buildHreflang('/blog/daf-externalise-pilotage-financier-pme-afrique'),
  '/blog/controle-interne-tresorerie-pme-afrique-syscohada/': buildHreflang('/blog/controle-interne-tresorerie-pme-afrique-syscohada'),
  '/blog/comites-specialises-circulaire-01-2017/': buildHreflang('/blog/comites-specialises-circulaire-01-2017'),
  '/blog/independance-administrateurs-circulaire-01-2017/': buildHreflang('/blog/independance-administrateurs-circulaire-01-2017'),
  '/blog/plans-preventifs-redressement-circulaire-001-2020/': buildHreflang('/blog/plans-preventifs-redressement-circulaire-001-2020'),
  '/blog/protection-lanceurs-alerte-circulaire-01-2017/': buildHreflang('/blog/protection-lanceurs-alerte-circulaire-01-2017'),
  '/blog/serie-gouvernance-bancaire-uemoa/': buildHreflang('/blog/serie-gouvernance-bancaire-uemoa'),
  '/blog/verrou-nationalite-competences-executives-circulaire-02-2017/': buildHreflang('/blog/verrou-nationalite-competences-executives-circulaire-02-2017'),

  // ── 4 Business Units — Refonte Big Four 2026 (BILINGUE FR/EN) ──────
  '/kos-bu1-financial-regulation/': buildBilingualHreflang('/kos-bu1-financial-regulation', '/kos-bu1-financial-regulation-en'),
  '/kos-bu1-financial-regulation-en/': buildBilingualHreflang('/kos-bu1-financial-regulation', '/kos-bu1-financial-regulation-en'),
  '/kos-bu2-governance-due-diligence/': buildBilingualHreflang('/kos-bu2-governance-due-diligence', '/kos-bu2-governance-due-diligence-en'),
  '/kos-bu2-governance-due-diligence-en/': buildBilingualHreflang('/kos-bu2-governance-due-diligence', '/kos-bu2-governance-due-diligence-en'),
  '/kos-bu3-climate-esg/': buildBilingualHreflang('/kos-bu3-climate-esg', '/kos-bu3-climate-esg-en'),
  '/kos-bu3-climate-esg-en/': buildBilingualHreflang('/kos-bu3-climate-esg', '/kos-bu3-climate-esg-en'),
  '/kos-bu4-kbr-model/': buildBilingualHreflang('/kos-bu4-kbr-model', '/kos-bu4-kbr-model-en'),
  '/kos-bu4-kbr-model-en/': buildBilingualHreflang('/kos-bu4-kbr-model', '/kos-bu4-kbr-model-en'),

  // ── Anciennes URLs BU (redirections vers les nouvelles) ──────────────
  '/regulation-financiere/': buildHreflang('/regulation-financiere'),
  '/prix-de-transfert/': buildHreflang('/prix-de-transfert'),
  '/gouvernance-risques/': buildHreflang('/gouvernance-risques'),

  // ── Pourquoi Khepra ────────────────────────────────────────────────────
  '/pourquoi-khepra/': buildHreflang('/pourquoi-khepra'),

  // ── GEO Hub ────────────────────────────────────────────────────────────
  '/geo-hub/': buildHreflang('/geo-hub'),
  '/geo-hub/reussir-due-diligence-afrique/': buildHreflang('/geo-hub/reussir-due-diligence-afrique'),
  '/geo-hub/mise-en-conformite-bceao/': buildHreflang('/geo-hub/mise-en-conformite-bceao'),
  '/geo-hub/preparer-levee-fonds-afrique/': buildHreflang('/geo-hub/preparer-levee-fonds-afrique'),
  '/geo-hub/agrement-sfd-bceao-cobac/': buildHreflang('/geo-hub/agrement-sfd-bceao-cobac'),
  '/geo-hub/cartographie-risques-entreprise/': buildHreflang('/geo-hub/cartographie-risques-entreprise'),
  '/geo-hub/preparer-mission-bceao/': buildHreflang('/geo-hub/preparer-mission-bceao'),
  '/geo-hub/mise-en-oeuvre-esg-afrique/': buildHreflang('/geo-hub/mise-en-oeuvre-esg-afrique'),
  '/geo-hub/renforcer-gouvernance-entreprise/': buildHreflang('/geo-hub/renforcer-gouvernance-entreprise'),

  // ── Services premium ───────────────────────────────────────────────────
  '/services/gouvernance-fiscalite-internationale/': buildHreflang('/services/gouvernance-fiscalite-internationale'),
  '/services/regtech-regulatory-engineering/': buildHreflang('/services/regtech-regulatory-engineering'),
  '/services/audit-pre-inspection-bceao/': buildHreflang('/services/audit-pre-inspection-bceao'),
  '/services/agrement-fintech-etablissement-paiement/': buildHreflang('/services/agrement-fintech-etablissement-paiement'),
  '/services/ceo-advisory-board/': buildHreflang('/services/ceo-advisory-board'),
  '/services/family-office-afrique/': buildHreflang('/services/family-office-afrique'),
  '/services/regulatory-intelligence/': buildHreflang('/services/regulatory-intelligence'),

  // ── Outils de diagnostic premium ───────────────────────────────────────
  '/tools/diagnostic-prix-transfert/': buildHreflang('/tools/diagnostic-prix-transfert'),
  '/tools/diagnostic-pre-inspection-bceao-cobac/': buildHreflang('/tools/diagnostic-pre-inspection-bceao-cobac'),
  '/tools/diagnostic-perennite-familiale/': buildHreflang('/tools/diagnostic-perennite-familiale'),
  '/tools/diagnostic-maturite-pilotage-strategique/': buildHreflang('/tools/diagnostic-maturite-pilotage-strategique'),
  '/tools/diagnostic-bancabilite/': buildHreflang('/tools/diagnostic-bancabilite'),

  // ── Guides ─────────────────────────────────────────────────────────────
  '/guide-bceao-2026/': buildHreflang('/guide-bceao-2026'),
  '/guide-seo-ia-afrique/': buildHreflang('/guide-seo-ia-afrique'),

  // ── Formations — Désactivé temporairement ─────────────────────────────────
  // '/formations/': buildHreflang('/formations'),

  // ── Demande de Devis ─────────────────────────────────────────────────
  '/devis/': buildHreflang('/devis'),
  '/pricing/': buildBilingualHreflang('/pricing', '/pricing'),

  // ── Index — toutes les pages stratégiques déjà couvertes ci-dessus ─────
};