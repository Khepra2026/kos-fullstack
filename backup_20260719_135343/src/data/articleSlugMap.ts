/**
 * Mapping bidirectionnel : slug SEO sémantique ↔ ID numérique d'article
 * Permet de résoudre les URLs /blog/:slug vers l'article correspondant
 * et d'exposer des URLs sémantiques à la place des IDs numériques.
 *
 * AJOUT : toujours s'assurer que la canonical pointe vers le slug sémantique.
 */

export interface ArticleSlugEntry {
  id: string;
  slug: string;
  /** Titre SEO court pour le sitemap */
  seoTitle?: string;
  /** Priorité sitemap */
  priority?: number;
  /** Date de dernière modification ISO */
  lastmod?: string;
}

export const ARTICLE_SLUG_MAP: ArticleSlugEntry[] = [
  // ── Articles Policy (IDs 9-23) ──────────────────────────────────
  {
    id: '9',
    slug: 'cadres-concertation-financiere-uemoa-cemac',
    seoTitle: 'Cadres de concertation financière UEMOA/CEMAC',
    priority: 0.78,
    lastmod: '2025-01-20',
  },
  {
    id: '10',
    slug: 'protection-consommateurs-financiers-uemoa-cemac',
    seoTitle: 'Protection consommateurs financiers UEMOA/CEMAC 2026',
    priority: 0.90,
    lastmod: '2026-01-10',
  },
  {
    id: '11',
    slug: 'monnaie-electronique-uemoa-cemac-agrement-cantonnement',
    seoTitle: 'Monnaie électronique UEMOA/CEMAC — agrément et cantonnement',
    priority: 0.82,
    lastmod: '2025-01-02',
  },
  {
    id: '12',
    slug: 'protection-consommateurs-services-financiers-bceao-cobac-lbcft',
    seoTitle: 'Protection consommateurs BCEAO/COBAC LBC/FT cybersécurité',
    priority: 0.82,
    lastmod: '2026-05-12',
  },
  {
    id: '13',
    slug: 'financement-agrobusiness-uemoa-cemac-boad-bdeac-ohada',
    seoTitle: 'Financement agrobusiness UEMOA/CEMAC — BOAD/BDEAC/OHADA',
    priority: 0.78,
    lastmod: '2024-12-10',
  },
  {
    id: '14',
    slug: 'systemes-paiement-uemoa-cemac-star-sygma-iso-20022',
    seoTitle: 'Systèmes de paiement UEMOA/CEMAC — STAR/SYGMA/ISO 20022',
    priority: 0.82,
    lastmod: '2024-02-10',
  },
  {
    id: '15',
    slug: 'microfinance-ratios-prudentiels-sfd-emf-bceao-cobac',
    seoTitle: 'Microfinance UEMOA/CEMAC : Ratios prudentiels SFD/EMF, Gouvernance, AML/CFT et Cybersécurité — Guide Big Four BCEAO/COBAC 2026',
    priority: 0.92,
    lastmod: '2026-06-24',
  },
  {
    id: '16',
    slug: 'gestion-ressources-humaines-ohada-cadre-juridique',
    seoTitle: 'Gestion RH zone OHADA — cadre juridique',
    priority: 0.75,
    lastmod: '2025-03-10',
  },
  {
    id: '17',
    slug: 'bien-etre-travail-performance-organisationnelle',
    seoTitle: 'Bien-être au travail et performance organisationnelle',
    priority: 0.75,
    lastmod: '2025-03-05',
  },
  {
    id: '18',
    slug: 'culture-organisationnelle-gouvernance-ohada',
    seoTitle: 'Culture organisationnelle et gouvernance OHADA',
    priority: 0.75,
    lastmod: '2025-02-20',
  },
  {
    id: '19',
    slug: 'management-qualite-totale-tqm-cobac-r-2001-07',
    seoTitle: 'Management Qualité Totale TQM — cadre COBAC R-2001/07',
    priority: 0.75,
    lastmod: '2025-02-20',
  },
  {
    id: '20',
    slug: 'conformite-bceao-cobac-2025-ratios-bale-iii-coussins-conservation',
    seoTitle: 'Conformité BCEAO/COBAC 2025 — ratios Bâle III',
    priority: 0.84,
    lastmod: '2025-04-10',
  },
  {
    id: '21',
    slug: 'lbcft-sfd-emf-sanctions-onu-centif-anif-abr',
    seoTitle: 'LBC/FT SFD/EMF — sanctions ONU/CENTIF/ANIF/ABR',
    priority: 0.84,
    lastmod: '2025-04-25',
  },
  {
    id: '22',
    slug: 'direction-financiere-externalisee-daf-ohada-pme',
    seoTitle: 'DAF externalisé — cadre OHADA et valeur ajoutée PME',
    priority: 0.78,
    lastmod: '2025-04-20',
  },
  {
    id: '23',
    slug: 'controle-interne-tresorerie-obligations-reglementaires',
    seoTitle: 'Contrôle interne et trésorerie — obligations réglementaires',
    priority: 0.78,
    lastmod: '2025-04-20',
  },

  // ── Articles Legacy (IDs 1-8) ────────────────────────────────────
  {
    id: '1',
    slug: 'gouvernance-pme-ohada-ausc-investisseurs',
    seoTitle: 'Gouvernance PME zone OHADA — AUSC et investisseurs',
    priority: 0.75,
    lastmod: '2024-03-15',
  },
  {
    id: '2',
    slug: 'levee-de-fonds-afrique-criteres-evaluation-investisseurs',
    seoTitle: 'Levée de fonds Afrique — critères évaluation investisseurs',
    priority: 0.78,
    lastmod: '2024-03-10',
  },
  {
    id: '3',
    slug: 'entrepreneuriat-impact-ohada-viabilite-financiere',
    seoTitle: 'Entrepreneuriat à impact OHADA — viabilité financière',
    priority: 0.75,
    lastmod: '2024-03-05',
  },
  {
    id: '4',
    slug: 'transformation-digitale-financiere-bceao-cobac-alm',
    seoTitle: 'Transformation digitale financière BCEAO/COBAC/ALM',
    priority: 0.75,
    lastmod: '2024-02-28',
  },
  {
    id: '5',
    slug: 'risques-financiers-pme-afrique-francophone-bceao-cobac',
    seoTitle: 'Risques financiers PME Afrique francophone BCEAO/COBAC',
    priority: 0.82,
    lastmod: '2026-05-06',
  },
  {
    id: '6',
    slug: 'modelisation-financiere-pme-africaines-syscohada',
    seoTitle: 'Modélisation financière PME africaines — SYSCOHADA',
    priority: 0.75,
    lastmod: '2024-02-15',
  },
  {
    id: '7',
    slug: 'startups-ohada-unit-economics-financement-institutionnel',
    seoTitle: 'Startups zone OHADA — unit economics et financement',
    priority: 0.80,
    lastmod: '2024-02-10',
  },
  {
    id: '8',
    slug: 'controle-interne-pme-africaines-obligations-reglementaires',
    seoTitle: 'Contrôle interne PME africaines — obligations réglementaires',
    priority: 0.75,
    lastmod: '2024-02-05',
  },

  // ── Articles Premium ─────────────────────────────────────────────
  {
    id: 'premium-gouvernance-fiscalite-internationale-khepra-360',
    slug: 'gouvernance-fiscalite-internationale-khepra-360',
    seoTitle: 'Gouvernance & Fiscalité Internationale — KHEPRA 360° | KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-05',
  },
  {
    id: 'premium-25-constats-sanctions-bceao-cobac',
    slug: '25-constats-sanctions-bceao-cobac',
    seoTitle: '25 constats sanctions BCEAO COBAC — Diagnostic Pré-Inspection | KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-12',
  },
  {
    id: 'premium-prix-transfert-fiscalite-internationale',
    slug: 'prix-transfert-risque-fiscal-cache-groupes-africains',
    seoTitle: 'Prix de transfert : risque fiscal caché des groupes africains — KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-05',
  },
  {
    id: 'premium-groupes-africains-cibles-controles-prix-transfert',
    slug: 'groupes-africains-cibles-controles-fiscaux-prix-transfert',
    seoTitle: 'Groupes africains cibles contrôles fiscaux prix de transfert — KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-10',
  },
  {
    id: 'premium-due-diligence-acquisition-afrique',
    slug: 'due-diligence-acquisition-afrique-ohada-guide',
    seoTitle: 'Due diligence acquisition Afrique — guide OHADA complet',
    priority: 0.87,
    lastmod: '2026-04-28',
  },
  {
    id: 'premium-agrement-imf-emf-bceao-cobac',
    slug: 'agrement-imf-emf-bceao-cobac-procedure-prudentielle',
    seoTitle: 'Agrément IMF/EMF BCEAO/COBAC — procédure prudentielle',
    priority: 0.87,
    lastmod: '2026-05-12',
  },
  {
    id: 'premium-esg-conformite-afrique',
    slug: 'conformite-esg-bceao-cobac-ifc-gri-afrique',
    seoTitle: 'Conformité ESG BCEAO/COBAC — IFC, GRI, Afrique francophone',
    priority: 0.87,
    lastmod: '2026-04-28',
  },
  {
    id: 'premium-levee-fonds-investisseur-readiness-afrique',
    slug: 'levee-fonds-investor-readiness-valorisation-dcf-afrique',
    seoTitle: 'Levée de fonds Afrique — investor readiness et valorisation DCF',
    priority: 0.87,
    lastmod: '2026-04-28',
  },
  {
    id: 'premium-diagnostic-organisationnel-gouvernance',
    slug: 'diagnostic-organisationnel-gouvernance-bceao-cobac-ocde',
    seoTitle: 'Diagnostic organisationnel gouvernance BCEAO/COBAC/OCDE',
    priority: 0.87,
    lastmod: '2026-04-28',
  },
  {
    id: 'premium-regtech-vendor-due-diligence-banks',
    slug: 'erreurs-architecture-reglementaire-regtech-due-diligence-banques-uemoa-cemac',
    seoTitle: 'Erreurs architecture réglementaire RegTech — due diligence banques UEMOA/CEMAC',
    priority: 0.90,
    lastmod: '2026-06-04',
  },
  {
    id: 'premium-gouvernance-groupes-familiaux',
    slug: 'entreprises-familiales-africaines-deuxieme-generation',
    seoTitle: 'Entreprises familiales africaines — Pérennité à la 2e génération | KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-15',
  },
  {
    id: 'premium-ceo-advisory-board-erreurs-strategiques-dirigeants',
    slug: 'erreurs-strategiques-dirigeants-africains-ceo-advisory-board',
    seoTitle: 'Erreurs stratégiques dirigeants africains — CEO Advisory Board | KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-20',
  },
  {
    id: 'premium-bancabilite-due-diligence-investisseur',
    slug: 'projets-africains-bancabilite-due-diligence-investisseur',
    seoTitle: 'Projets africains — Bancabilité et Due Diligence Investisseur | KHEPRA EXPERTS',
    priority: 0.90,
    lastmod: '2026-06-25',
  },

  // ── Articles ALM / Bilan / LBC/FT / PME ─────────────────────────
  {
    id: 'alm-microfinance-uemoa',
    slug: 'alm-microfinance-uemoa-risque-liquidite-sfd',
    seoTitle: 'ALM microfinance UEMOA — risque de liquidité SFD BCEAO',
    priority: 0.85,
    lastmod: '2026-04-22',
  },
  {
    id: 'alm-microfinance-cemac',
    slug: 'alm-microfinance-cemac-risque-liquidite-emf',
    seoTitle: 'ALM microfinance CEMAC — risque de liquidité EMF COBAC',
    priority: 0.85,
    lastmod: '2026-04-22',
  },
  {
    id: 'bilan-bancaire-uemoa',
    slug: 'bilan-bancaire-uemoa-ratios-bceao-solvabilite',
    seoTitle: 'Bilan bancaire UEMOA — ratios BCEAO solvabilité NPL',
    priority: 0.85,
    lastmod: '2026-04-22',
  },
  {
    id: 'bilan-bancaire-cemac',
    slug: 'bilan-bancaire-cemac-ratios-cobac-solvabilite',
    seoTitle: 'Bilan bancaire CEMAC — ratios COBAC solvabilité NPL',
    priority: 0.85,
    lastmod: '2026-04-22',
  },
  {
    id: 'lbcft-sfd-uemoa',
    slug: 'lbcft-sfd-uemoa-directive-02-2015-centif-kyc',
    seoTitle: 'LBC/FT SFD UEMOA — Directive 02/2015, CENTIF, KYC, GIABA',
    priority: 0.85,
    lastmod: '2026-04-25',
  },
  {
    id: 'lbcft-emf-cemac',
    slug: 'lbcft-emf-cemac-reglement-01-03-anif-kyc',
    seoTitle: 'LBC/FT EMF CEMAC — Règlement 01/03, ANIF, KYC, GABAC',
    priority: 0.85,
    lastmod: '2026-04-25',
  },
  {
    id: 'pme-africaines-tresorerie-70-pourcent',
    slug: 'tresorerie-pme-africaines-bfr-decalage-actif-passif',
    seoTitle: 'Trésorerie PME africaines — BFR et décalage actif-passif',
    priority: 0.83,
    lastmod: '2026-04-22',
  },
  {
    id: 'pilotage-financier-vs-intuition',
    slug: 'pilotage-financier-pme-ohada-indicateurs-performance',
    seoTitle: 'Pilotage financier PME OHADA — indicateurs de performance',
    priority: 0.83,
    lastmod: '2026-04-22',
  },
  {
    id: 'cash-flow-vs-chiffre-affaires',
    slug: 'resultat-comptable-tresorerie-distincts-syscohada-tft',
    seoTitle: 'Résultat comptable vs trésorerie — SYSCOHADA et TFT',
    priority: 0.83,
    lastmod: '2026-04-22',
  },
  {
    id: 'conformite-bceao-2026-nouvelles-exigences-sfd',
    slug: 'conformite-bceao-exigences-prudentielles-sfd-uemoa',
    seoTitle: 'Conformité BCEAO — exigences prudentielles SFD zone UEMOA',
    priority: 0.83,
    lastmod: '2026-04-22',
  },
  {
    id: 'plan-strategique-pme-africaine-guide-complet',
    slug: 'plan-strategique-pme-africaine-smart-swot-guide',
    seoTitle: 'Plan stratégique PME africaine — méthode SMART et SWOT',
    priority: 0.83,
    lastmod: '2026-04-15',
  },
  // ── Articles ALM supplémentaires (accès par ID direct, pas de slug distinct) ──
  {
    id: 'structuration-bilan-bancaire-afrique',
    slug: 'bilan-bancaire-afrique-ratios-risques-regulateur',
    seoTitle: 'Bilan bancaire Afrique — ce que le régulateur voit',
    priority: 0.82,
    lastmod: '2026-04-22',
  },
  // ── Articles DAF / Contrôle interne standalone ──────────────────────
  {
    id: 'direction-financiere-externalisee',
    slug: 'daf-externalise-pilotage-financier-pme-afrique',
    seoTitle: 'DAF externalisé Afrique — pilotage financier PME',
    priority: 0.80,
    lastmod: '2026-04-21',
  },
  {
    id: 'controle-interne-tresorerie',
    slug: 'controle-interne-tresorerie-pme-afrique-syscohada',
    seoTitle: 'Contrôle interne trésorerie PME Afrique — SYSCOHADA',
    priority: 0.80,
    lastmod: '2026-04-21',
  },
  // ── Articles Sprint 2 (Bâle III, ICAAP, COSO, Fintech, etc.) ──────
  {
    id: 'fonds-propres-reglementaires-bale-iii',
    slug: 'fonds-propres-reglementaires-bale-iii',
    seoTitle: 'Fonds Propres Réglementaires Bâle III — CET1 AT1 T2 | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-05-30',
  },
  {
    id: 'icaap-ilaap-bale-banques-uemoa',
    slug: 'icaap-ilaap-bale-banques-uemoa',
    seoTitle: 'ICAAP/ILAAP Bâle II/III — Guide Banques UEMOA | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-05',
  },
  {
    id: 'controle-interne-coso-2013-banques-uemoa',
    slug: 'controle-interne-coso-2013-banques-uemoa',
    seoTitle: 'Contrôle Interne COSO 2013 Banques UEMOA — Circulaire 03-2017 | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-04',
  },
  {
    id: 'due-diligence-acquisition-pme-afrique',
    slug: 'due-diligence-acquisition-pme-afrique',
    seoTitle: 'Due Diligence Acquisition PME Afrique — Guide OHADA | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-03',
  },
  {
    id: 'reglementation-fintech-afrique-2026',
    slug: 'reglementation-fintech-afrique-2026',
    seoTitle: 'Réglementation Fintech Afrique 2026 — BCEAO COBAC BEAC | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-02',
  },
  {
    id: 'fiscalite-transfrontaliere-afrique-conventions',
    slug: 'fiscalite-transfrontaliere-afrique-conventions',
    seoTitle: 'Fiscalité Transfrontalière Afrique — Conventions Fiscales | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-01',
  },
  {
    id: 'reporting-esg-ifc-gri-afrique',
    slug: 'reporting-esg-ifc-gri-afrique',
    seoTitle: 'Reporting ESG Afrique — IFC GRI ISSB | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-05-31',
  },
  {
    id: 'digitalisation-conformite-regtech-afrique',
    slug: 'digitalisation-conformite-regtech-afrique',
    seoTitle: 'Digitalisation Conformité Afrique — RegTech SupTech | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-05-29',
  },
  {
    id: 'stress-testing-portefeuille-credit-uemoa',
    slug: 'stress-testing-portefeuille-credit-uemoa',
    seoTitle: 'Stress Testing Portefeuille Crédit Banques UEMOA | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-05-28',
  },
  {
    id: 'evaluation-conseil-administration-uemoa',
    slug: 'evaluation-conseil-administration-uemoa',
    seoTitle: 'Évaluation Conseil Administration UEMOA — Circulaire 01-2017 | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-05-27',
  },
  // ── Articles Pillar BU1/BU2/BU3 (20 articles KOS 2) ──────────────────
  {
    id: 'pillar-inspection-bceao-guide-complet',
    slug: 'pillar-inspection-bceao-guide-complet',
    seoTitle: 'Inspection BCEAO : Guide Complet de Préparation pour Banques, SFD et IMF en Zone UEMOA | KHEPRA EXPERTS',
    priority: 0.88,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-inspection-cobac-guide-complet',
    slug: 'pillar-inspection-cobac-guide-complet',
    seoTitle: 'Inspection COBAC : Guide Pratique de Préparation pour les Établissements de Crédit et EMF en Zone CEMAC | KHEPRA EXPERTS',
    priority: 0.88,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-conformite-banque-uemoa',
    slug: 'pillar-conformite-banque-uemoa',
    seoTitle: 'Conformité Bancaire UEMOA : Cadre Réglementaire Complet pour les Banques et Établissements Financiers | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-ratios-prudentiels-bceao',
    slug: 'pillar-ratios-prudentiels-bceao',
    seoTitle: 'Ratios Prudentiels BCEAO : Calcul, Interprétation et Conformité pour Banques et SFD UEMOA | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-agrement-sfd-bceao',
    slug: 'pillar-agrement-sfd-bceao',
    seoTitle: 'Agrément SFD BCEAO : Procédure Complète, Conditions et Délais pour les SFD UEMOA | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-audit-pre-inspection-bceao',
    slug: 'pillar-audit-pre-inspection-bceao',
    seoTitle: 'Audit Pré-Inspection BCEAO : Méthodologie, Outils et Bénéfices du Diagnostic Avant Inspection | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-lbcft-afrique-francophone',
    slug: 'pillar-lbcft-afrique-francophone',
    seoTitle: 'LBC/FT en Afrique Francophone : Cadre Réglementaire, Obligations et Bonnes Pratiques | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-prix-transfert-afrique',
    slug: 'pillar-prix-transfert-afrique',
    seoTitle: 'Prix de Transfert en Afrique : Enjeux, Réglementation et Stratégies de Conformité | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-prix-transfert-uemoa',
    slug: 'pillar-prix-transfert-uemoa',
    seoTitle: 'Prix de Transfert en Zone UEMOA : Directive 01/2011, Obligations Documentaires et Jurisprudence Fiscale | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-documentation-beps-afrique',
    slug: 'pillar-documentation-beps-afrique',
    seoTitle: 'Documentation BEPS en Afrique : Guide Pratique du Master File, Local File et CbCR | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-master-file-afrique',
    slug: 'pillar-master-file-afrique',
    seoTitle: 'Master File Afrique : Structuration de la Documentation Globale de Prix de Transfert | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-controle-fiscal-prix-transfert',
    slug: 'pillar-controle-fiscal-prix-transfert',
    seoTitle: 'Contrôle Fiscal Prix de Transfert en Afrique : Anticiper, Préparer et Défendre Votre Dossier | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-defense-fiscale-afrique',
    slug: 'pillar-defense-fiscale-afrique',
    seoTitle: 'Défense Fiscale en Afrique : Stratégies Avancées pour Protéger Votre Entreprise | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-fiscalite-internationale-afrique',
    slug: 'pillar-fiscalite-internationale-afrique',
    seoTitle: 'Fiscalité Internationale en Afrique : Conventions Fiscales, Retenues à la Source et Structuration Optimale | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-gouvernance-groupes-familiaux-afrique',
    slug: 'pillar-gouvernance-groupes-familiaux-afrique',
    seoTitle: 'Gouvernance des Groupes Familiaux en Afrique : Structuration, Transmission et Pérennité | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-cartographie-risques-entreprise',
    slug: 'pillar-cartographie-risques-entreprise',
    seoTitle: 'Cartographie des Risques d\'Entreprise : Méthodologie Complète pour les Organisations Africaines | KHEPRA EXPERTS',
    priority: 0.87,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-erm-afrique',
    slug: 'pillar-erm-afrique',
    seoTitle: 'ERM (Enterprise Risk Management) en Afrique : Déploiement, Gouvernance et Alignement Stratégique | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-audit-interne-coso-afrique',
    slug: 'pillar-audit-interne-coso-afrique',
    seoTitle: 'Audit Interne en Afrique : Mise en Œuvre du Cadre COSO et Conformité aux Exigences BCEAO/COBAC | KHEPRA EXPERTS',
    priority: 0.86,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-conformite-fintech-afrique',
    slug: 'pillar-conformite-fintech-afrique',
    seoTitle: 'Conformité Fintech en Afrique : Agrément, Réglementation et Enjeux pour les Établissements de Paiement | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-08',
  },
  {
    id: 'pillar-protection-donnees-personnelles-afrique',
    slug: 'pillar-protection-donnees-personnelles-afrique',
    seoTitle: 'Protection des Données Personnelles en Afrique : Cadre Juridique, Obligations et Mise en Conformité | KHEPRA EXPERTS',
    priority: 0.85,
    lastmod: '2026-06-08',
  },
];

/** Index slug → entry */
const slugToEntry: Record<string, ArticleSlugEntry> = {};
/** Index id → entry */
const idToEntry: Record<string, ArticleSlugEntry> = {};

ARTICLE_SLUG_MAP.forEach((entry) => {
  slugToEntry[entry.slug] = entry;
  idToEntry[entry.id] = entry;
});

/** Résoudre un slug SEO → ID d'article */
export function resolveSlugToId(slug: string): string | null {
  return slugToEntry[slug]?.id ?? null;
}

/** Résoudre un ID d'article → slug SEO */
export function resolveIdToSlug(id: string): string | null {
  return idToEntry[id]?.slug ?? null;
}

/** Retourner l'entrée complète par slug */
export function getEntryBySlug(slug: string): ArticleSlugEntry | null {
  return slugToEntry[slug] ?? null;
}

/** Retourner l'entrée complète par ID */
export function getEntryById(id: string): ArticleSlugEntry | null {
  return idToEntry[id] ?? null;
}

/** Construire l'URL canonique sémantique d'un article */
export function buildCanonicalUrl(idOrSlug: string, siteUrl = 'https://khepraexperts.com'): string {
  // Si c'est un slug connu, utiliser directement
  if (slugToEntry[idOrSlug]) {
    return `${siteUrl}/blog/${idOrSlug}/`;
  }
  // Si c'est un ID connu avec un slug, pointer vers le slug
  const entry = idToEntry[idOrSlug];
  if (entry) {
    return `${siteUrl}/blog/${entry.slug}/`;
  }
  // Fallback : URL avec l'ID/slug tel quel
  return `${siteUrl}/blog/${idOrSlug}/`;
}

// ── MAPPING ANCIENS SLUGS → NOUVEAUX SLUGS CANONIQUES ─────────────
// Filet de sécurité côté client pour les anciens slugs non listés dans
// les redirects 301 côté serveur (Netlify _redirects / netlify.toml)

export const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  'direction-financiere-externalisee': 'daf-externalise-pilotage-financier-pme-afrique',
  'controle-interne-tresorerie': 'controle-interne-tresorerie-pme-afrique-syscohada',
  'gouvernance-ohada-bceao': 'bceao-ohada-conformite',
  'conformite-bceao-2026': 'conformite-bceao-exigences-prudentielles-sfd-uemoa',
  'pme-africaines-tresorerie': 'tresorerie-pme-africaines-bfr-decalage-actif-passif',
  'plan-strategique-pme': 'plan-strategique-pme-africaine-smart-swot-guide',
  'cash-flow-vs-chiffre-d-affaires': 'resultat-comptable-tresorerie-distincts-syscohada-tft',
  'cash-flow-vs-chiffre-affaires': 'resultat-comptable-tresorerie-distincts-syscohada-tft',
  'direction-financiere-externalisee-daf-ohada-pme': 'daf-externalise-pilotage-financier-pme-afrique',
  'controle-interne-tresorerie-obligations-reglementaires': 'controle-interne-tresorerie-pme-afrique-syscohada',
};

/** Résoudre un ancien slug blog → nouvelle URL canonique. Retourne null si inconnu. */
export function resolveLegacySlug(path: string): string | null {
  const slug = path.replace(/^\//, '').replace(/\/$/, '');
  const blogPrefix = 'blog/';
  if (!slug.startsWith(blogPrefix)) return null;
  const articleSlug = slug.slice(blogPrefix.length).replace(/\/$/, '');
  const target = LEGACY_SLUG_REDIRECTS[articleSlug];
  if (target) return `/blog/${target}/`;
  return null;
}



