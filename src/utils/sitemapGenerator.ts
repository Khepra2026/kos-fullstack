/**
 * Sitemap Generator — complet et synchronisé avec public/sitemap.xml
 * Inclut toutes les pages statiques publiques + tous les slugs d'articles canoniques.
 *
 * ⛔ CRITICAL: SITE_URL est verrouillé à khepraexperts.com.
 *    Toute modification doit être validée par KOS Domain Validator.
 *    Le build échouera si ce domaine n'est pas le domaine canonique.
 */

import { getDomainStatus, CANONICAL_DOMAIN } from '@/utils/domainValidator';

// ═══════════════════════════════════════════════════════════════
// ASSERTION RUNTIME — Bloque l'exécution si le domaine est corrompu
// ═══════════════════════════════════════════════════════════════
const status = getDomainStatus();
if (!status.isCanonical || status.currentDomain !== CANONICAL_DOMAIN) {
  throw new Error(
    `⛔ KOS DOMAIN VIOLATION: SITE_URL must be "${CANONICAL_DOMAIN}" but got "${status.currentDomain}". ` +
    'Build blocked. All sitemap/SEO files must use the canonical domain.'
  );
}

const SITE_URL = status.canonicalUrl;
const today = new Date().toISOString().split('T')[0];

export interface SitemapEntry {
  path: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const sitemapEntries: SitemapEntry[] = [
  // ── Pages principales ──────────────────────────────────────────────
  { path: '/', lastmod: today, changefreq: 'daily', priority: 1.0 },
  { path: '/about', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/contact', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/approche', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/equipe', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/experts', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/expertises', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/partenaires', lastmod: today, changefreq: 'monthly', priority: 0.7 },
  { path: '/publications', lastmod: today, changefreq: 'weekly', priority: 0.75 },
  { path: '/careers', lastmod: today, changefreq: 'weekly', priority: 0.75 },
  { path: '/decideurs', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/investisseurs', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/projets-industriels', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/solutions', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  // NOTE: /dashboard, /mon-espace, /administrateur, /thank-you, /strategic-report, /monitoring
  // sont exclus du sitemap (pages noindex ou privées)
  { path: '/charte-deontologique', lastmod: today, changefreq: 'yearly', priority: 0.65 },
  { path: '/legal', lastmod: today, changefreq: 'yearly', priority: 0.55 },
  { path: '/privacy/', lastmod: today, changefreq: 'yearly', priority: 0.55 },
  { path: '/cgu', lastmod: today, changefreq: 'yearly', priority: 0.55 },
  { path: '/cookies', lastmod: today, changefreq: 'yearly', priority: 0.50 },
  { path: '/securite-conformite', lastmod: today, changefreq: 'monthly', priority: 0.70 },
  { path: '/case-studies', lastmod: today, changefreq: 'weekly', priority: 0.85 },

  // ── Services ───────────────────────────────────────────────────────
  { path: '/services', lastmod: today, changefreq: 'weekly', priority: 0.95 },
  { path: '/services/conseil-strategique', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/gestion-de-projets', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/developpement-organisationnel', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/renforcement-capacites', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/diagnostic-organisationnel', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/audit-social', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/ressources-humaines', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/transformation-digitale', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/communication-strategique', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/levee-de-fonds', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/due-diligence-acquisition', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/gouvernance-fiscalite-internationale', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/regtech-regulatory-engineering', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/services/audit-pre-inspection-bceao', lastmod: today, changefreq: 'monthly', priority: 0.92 },
  { path: '/services/agrement-fintech-etablissement-paiement', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/services/ceo-advisory-board', lastmod: today, changefreq: 'monthly', priority: 0.92 },
  { path: '/services/family-office-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/services/regulatory-intelligence', lastmod: today, changefreq: 'monthly', priority: 0.85 },

  // ── Blog ────────────────────────────────────────────────────────────
  { path: '/blog', lastmod: today, changefreq: 'daily', priority: 0.95 },
  { path: '/blog/daf-externalise-pilotage-financier-pme-afrique/', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/blog/controle-interne-tresorerie-pme-afrique-syscohada/', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/blog/bceao-ohada-conformite/', lastmod: today, changefreq: 'monthly', priority: 0.88 },

  // ── Série Gouvernance Bancaire UEMOA (pages statiques dédiées) ─────────────
  { path: '/blog/plans-preventifs-redressement-circulaire-001-2020/', lastmod: '2026-05-29', changefreq: 'monthly', priority: 0.93 },
  { path: '/blog/comites-specialises-circulaire-01-2017/', lastmod: '2026-06-02', changefreq: 'monthly', priority: 0.92 },
  { path: '/blog/serie-gouvernance-bancaire-uemoa/', lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.90 },
  { path: '/blog/protection-lanceurs-alerte-circulaire-01-2017/', lastmod: '2026-06-01', changefreq: 'monthly', priority: 0.92 },
  { path: '/blog/verrou-nationalite-competences-executives-circulaire-02-2017/', lastmod: '2026-05-31', changefreq: 'monthly', priority: 0.92 },
  { path: '/blog/independance-administrateurs-circulaire-01-2017/', lastmod: '2026-05-30', changefreq: 'monthly', priority: 0.92 },
  { path: '/blog/3-lignes-defense-circulaire-03-2017/', lastmod: '2026-05-29', changefreq: 'monthly', priority: 0.92 },

  // ── Articles sémantiques canoniques ─────────────────────────────────
  { path: '/blog/cadres-concertation-financiere-uemoa-cemac/', lastmod: '2025-01-20', changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/protection-consommateurs-financiers-uemoa-cemac/', lastmod: '2026-01-10', changefreq: 'monthly', priority: 0.9 },
  { path: '/blog/monnaie-electronique-uemoa-cemac-agrement-cantonnement/', lastmod: '2025-01-02', changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/protection-consommateurs-services-financiers-bceao-cobac-lbcft/', lastmod: '2026-05-12', changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/financement-agrobusiness-uemoa-cemac-boad-bdeac-ohada/', lastmod: '2024-12-10', changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/systemes-paiement-uemoa-cemac-star-sygma-iso-20022/', lastmod: '2024-02-10', changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/microfinance-ratios-prudentiels-sfd-emf-bceao-cobac/', lastmod: '2026-06-24', changefreq: 'weekly', priority: 0.92 },
  { path: '/blog/gestion-ressources-humaines-ohada-cadre-juridique/', lastmod: '2025-03-10', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/bien-etre-travail-performance-organisationnelle/', lastmod: '2025-03-05', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/culture-organisationnelle-gouvernance-ohada/', lastmod: '2025-02-20', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/management-qualite-totale-tqm-cobac-r-2001-07/', lastmod: '2025-02-20', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/conformite-bceao-cobac-2025-ratios-bale-iii-coussins-conservation/', lastmod: '2025-04-10', changefreq: 'monthly', priority: 0.84 },
  { path: '/blog/lbcft-sfd-emf-sanctions-onu-centif-anif-abr/', lastmod: '2025-04-25', changefreq: 'monthly', priority: 0.84 },
  { path: '/blog/direction-financiere-externalisee-daf-ohada-pme/', lastmod: '2025-04-20', changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/controle-interne-tresorerie-obligations-reglementaires/', lastmod: '2025-04-20', changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/gouvernance-pme-ohada-ausc-investisseurs/', lastmod: '2024-03-15', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/levee-de-fonds-afrique-criteres-evaluation-investisseurs/', lastmod: '2024-03-10', changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/entrepreneuriat-impact-ohada-viabilite-financiere/', lastmod: '2024-03-05', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/transformation-digitale-financiere-bceao-cobac-alm/', lastmod: '2024-02-28', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/risques-financiers-pme-afrique-francophone-bceao-cobac/', lastmod: '2026-05-06', changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/modelisation-financiere-pme-africaines-syscohada/', lastmod: '2024-02-15', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/startups-ohada-unit-economics-financement-institutionnel/', lastmod: '2024-02-10', changefreq: 'monthly', priority: 0.8 },
  { path: '/blog/controle-interne-pme-africaines-obligations-reglementaires/', lastmod: '2024-02-05', changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/due-diligence-acquisition-afrique-ohada-guide/', lastmod: '2026-04-28', changefreq: 'monthly', priority: 0.87 },
  { path: '/blog/agrement-imf-emf-bceao-cobac-procedure-prudentielle/', lastmod: '2026-05-12', changefreq: 'monthly', priority: 0.87 },
  { path: '/blog/conformite-esg-bceao-cobac-ifc-gri-afrique/', lastmod: '2026-04-28', changefreq: 'monthly', priority: 0.87 },
  { path: '/blog/levee-fonds-investor-readiness-valorisation-dcf-afrique/', lastmod: '2026-04-28', changefreq: 'monthly', priority: 0.87 },
  { path: '/blog/diagnostic-organisationnel-gouvernance-bceao-cobac-ocde/', lastmod: '2026-04-28', changefreq: 'monthly', priority: 0.87 },
  { path: '/blog/tresorerie-pme-africaines-bfr-decalage-actif-passif/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.83 },
  { path: '/blog/pilotage-financier-pme-ohada-indicateurs-performance/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.83 },
  { path: '/blog/resultat-comptable-tresorerie-distincts-syscohada-tft/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.83 },
  { path: '/blog/conformite-bceao-exigences-prudentielles-sfd-uemoa/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.83 },
  { path: '/blog/plan-strategique-pme-africaine-smart-swot-guide/', lastmod: '2026-04-15', changefreq: 'monthly', priority: 0.83 },
  { path: '/blog/bilan-bancaire-afrique-ratios-risques-regulateur/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/alm-microfinance-uemoa-risque-liquidite-sfd/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/alm-microfinance-cemac-risque-liquidite-emf/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/bilan-bancaire-uemoa-ratios-bceao-solvabilite/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/bilan-bancaire-cemac-ratios-cobac-solvabilite/', lastmod: '2026-04-22', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/lbcft-sfd-uemoa-directive-02-2015-centif-kyc/', lastmod: '2026-04-25', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/lbcft-emf-cemac-reglement-01-03-anif-kyc/', lastmod: '2026-04-25', changefreq: 'monthly', priority: 0.85 },
  { path: '/blog/daf-externalise-pilotage-financier-pme-afrique/', lastmod: '2026-04-21', changefreq: 'monthly', priority: 0.8 },
  { path: '/blog/controle-interne-tresorerie-pme-afrique-syscohada/', lastmod: '2026-04-21', changefreq: 'monthly', priority: 0.8 },

  // ── Insights & Resources ────────────────────────────────────────────
  // ── Knowledge Hub ──────────────────────────────────────────
  { path: '/knowledge-hub/due-diligence', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/knowledge-hub/esg', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/knowledge-hub/bceao', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/knowledge-hub/cobac', lastmod: today, changefreq: 'monthly', priority: 0.85 },

  // ── Guides ───────────────────────────────────────────────────
  { path: '/guide-due-diligence-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/guide-esg-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/guide-investment-readiness', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/guide-gouvernance-imf', lastmod: today, changefreq: 'monthly', priority: 0.88 },

  // ── Guides supplémentaires ──────────────────────────────────────
  { path: '/guide-bceao-2026', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/guide-seo-ia-afrique', lastmod: today, changefreq: 'weekly', priority: 0.88 },

  // ── Insights & Resources ───────────────────────────────────
  { path: '/insights', lastmod: today, changefreq: 'weekly', priority: 0.85 },
  { path: '/resources', lastmod: today, changefreq: 'weekly', priority: 0.8 },
  { path: '/whitepapers', lastmod: today, changefreq: 'weekly', priority: 0.8 },
  // Désactivé temporairement — page /formations non publique
  // { path: '/formations', lastmod: today, changefreq: 'weekly', priority: 0.8 },

  // ── Tools ───────────────────────────────────────────────────────────
  { path: '/tools', lastmod: today, changefreq: 'weekly', priority: 0.85 },
  { path: '/tools/diagnostic-organisationnel', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/tools/maturite-digitale', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/tools/evaluation-gouvernance', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/tools/diagnostic-transformation-digitale', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/evaluation-maturite-fintech', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/audit-inclusion-financiere', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/evaluation-cybersecurite', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/evaluation-conformite-reglementaire', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/diagnostic-strategique', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/simulateur-financier', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/stress-test-financier', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/investment-readiness', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/diagnostic-risques', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/performance-commerciale', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/benchmark-sectoriel', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/simulateur-roi-marketing', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/generateur-roadmap-innovation', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/tableau-kpi-qualite', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/diagnostic-rh-strategique', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/tools/diagnostic-esg-impact', lastmod: today, changefreq: 'monthly', priority: 0.75 },

  // ── Industries ──────────────────────────────────────────────────────
  { path: '/industries', lastmod: today, changefreq: 'weekly', priority: 0.85 },
  { path: '/industries/microfinance', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/industries/fintech', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/industries/pme', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/industries/public-sector', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/industries/cemac-beac', lastmod: today, changefreq: 'monthly', priority: 0.9 },

  // ── Regions ─────────────────────────────────────────────────────────
  { path: '/regions/afrique', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/regions/afrique-francophone', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/regions/uemoa-cemac', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/regions/africa', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/regions/west-africa', lastmod: today, changefreq: 'monthly', priority: 0.8 },

  // ── Pillar pages ────────────────────────────────────────────────────
  { path: '/pillar/digital-transformation-africa', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/pillar/financial-inclusion-africa', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/pillar/fintech-advisory-africa', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/pillar/microfinance-transformation-africa', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/pillar/sme-development-africa', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/conseil-strategique-pme-afrique', lastmod: today, changefreq: 'weekly', priority: 0.95 },
  { path: '/transformation-digitale-ohada', lastmod: today, changefreq: 'weekly', priority: 0.95 },
  { path: '/levee-de-fonds-afrique', lastmod: today, changefreq: 'weekly', priority: 0.95 },

  // ── Landing pages ───────────────────────────────────────────────────
  { path: '/sfd-conformite', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/offre-commerciale', lastmod: today, changefreq: 'weekly', priority: 0.85 },
  { path: '/board-report', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/diagnostic-flash', lastmod: today, changefreq: 'monthly', priority: 0.85 },
  { path: '/strategie-digitale', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/audit-financier-afrique', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/due-diligence-pme-afrique', lastmod: today, changefreq: 'monthly', priority: 0.9 },
  { path: '/gouvernance-ohada', lastmod: today, changefreq: 'monthly', priority: 0.9 },

  // ── 3 Business Units (Refonte 2026) ───────────────────────────────
  { path: '/regulation-financiere', lastmod: today, changefreq: 'weekly', priority: 0.93 },
  { path: '/prix-de-transfert', lastmod: today, changefreq: 'weekly', priority: 0.93 },
  { path: '/gouvernance-risques', lastmod: today, changefreq: 'weekly', priority: 0.93 },

  // ── Pourquoi Khepra ──────────────────────────────────────────────
  { path: '/pourquoi-khepra', lastmod: today, changefreq: 'monthly', priority: 0.92 },

  // ── GEO Hub ──────────────────────────────────────────────────────
  { path: '/geo-hub', lastmod: today, changefreq: 'weekly', priority: 0.92 },
  { path: '/geo-hub/reussir-due-diligence-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/mise-en-conformite-bceao', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/preparer-levee-fonds-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/agrement-sfd-bceao-cobac', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/cartographie-risques-entreprise', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/preparer-mission-bceao', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/mise-en-oeuvre-esg-afrique', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/geo-hub/renforcer-gouvernance-entreprise', lastmod: today, changefreq: 'monthly', priority: 0.88 },

  // ── Lead Magnets ─────────────────────────────────────────────────
  { path: '/lead-magnets', lastmod: today, changefreq: 'weekly', priority: 0.85 },
  { path: '/lead-magnets/checklist-conformite-bceao-cobac', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/lead-magnets/guide-levee-fonds-afrique', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/lead-magnets/simulation-risque-reglementaire', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/lead-magnets/template-audit-gouvernance', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/lead-magnets/mini-rapport-due-diligence', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/lead-magnets/diagnostic-esg-maturite', lastmod: today, changefreq: 'monthly', priority: 0.8 },

  // ── Articles Conformité & Régulation (pages dédiées) ──────────
  { path: '/blog/conformite-cobac-cemac/', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/blog/esg-afrique-entreprises/', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/blog/erreurs-architecture-reglementaire-regtech-due-diligence-banques-uemoa-cemac/', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/gouvernance-fiscalite-internationale-khepra-360/', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/25-constats-sanctions-bceao-cobac/', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/prix-transfert-risque-fiscal-cache-groupes-africains/', lastmod: today, changefreq: 'monthly', priority: 0.82 },
  { path: '/blog/cadres-concertation-financiere-uemoa-cemac/', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/financement-agrobusiness-uemoa-cemac-boad-bdeac-ohada/', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/direction-financiere-externalisee-daf-ohada-pme/', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/controle-interne-tresorerie-obligations-reglementaires/', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/blog/gestion-ressources-humaines-ohada-cadre-juridique/', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/bien-etre-travail-performance-organisationnelle/', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/culture-organisationnelle-gouvernance-ohada/', lastmod: today, changefreq: 'monthly', priority: 0.75 },
  { path: '/blog/management-qualite-totale-tqm-cobac-r-2001-07/', lastmod: today, changefreq: 'monthly', priority: 0.75 },

  // ── Outils de diagnostic supplémentaires ─────────────────────────
  { path: '/tools/diagnostic-prix-transfert', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/tools/diagnostic-pre-inspection-bceao-cobac', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/tools/diagnostic-perennite-familiale', lastmod: today, changefreq: 'monthly', priority: 0.78 },
  { path: '/tools/diagnostic-maturite-pilotage-strategique', lastmod: today, changefreq: 'monthly', priority: 0.8 },
  { path: '/tools/diagnostic-bancabilite', lastmod: today, changefreq: 'monthly', priority: 0.78 },

  // ── Case Studies detail pages ────────────────────────────────────
  { path: '/case-studies/regtech-conformite-uemoa-cemac', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/case-studies/gouvernance-board-advisory-uemoa', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/case-studies/agrement-multinational-sfd-uemoa-cemac', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/case-studies/ingenierie-financiere-projet-industriel-cedao', lastmod: today, changefreq: 'monthly', priority: 0.88 },
  { path: '/case-studies/prix-transfert-microfinance-groupe-panafricain', lastmod: today, changefreq: 'monthly', priority: 0.88 },
];

/**
 * Génère le contenu XML du sitemap
 */
export function generateSitemapXml(): string {
  const urlNodes = sitemapEntries
    .map((entry) => {
      // Slash final obligatoire sur toutes les URLs (sauf homepage qui a déjà /)
      const loc = entry.path === '/'
        ? `${SITE_URL}/`
        : `${SITE_URL}${entry.path.endsWith('/') ? entry.path : entry.path + '/'}`;
      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(2)}</priority>
  </url>`;
    })
    .join('\n\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urlNodes}

</urlset>`;
}

/**
 * Retourne les statistiques du sitemap
 */
export function getSitemapStats() {
  return {
    total: sitemapEntries.length,
    highPriority: sitemapEntries.filter((e) => e.priority >= 0.9).length,
    weekly: sitemapEntries.filter((e) => e.changefreq === 'weekly').length,
    lastUpdated: today,
  };
}