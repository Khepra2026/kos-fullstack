/**
 * SEO SILO ARCHITECTURE — KHEPRA EXPERTS
 * =========================================
 * Structure de siloing sémantique pour les piliers "Audit" et "Conseil"
 * Conforme aux meilleures pratiques SEO technique (zone OHADA/UEMOA/CEMAC)
 *
 * Principe du silo :
 * - Chaque silo regroupe des pages thématiquement liées
 * - Les liens internes restent dans le silo (pas de liens croisés entre silos)
 * - La page pilier concentre le PageRank des pages satellites
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface SiloPage {
  title: string;
  titleEn: string;
  path: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  keywords: string[];
  keywordsEn: string[];
  type: 'pillar' | 'satellite' | 'article';
  priority: number; // 0.0 – 1.0 pour sitemap
}

export interface SiloStructure {
  id: string;
  name: string;
  nameEn: string;
  pillarPath: string;
  color: string;
  icon: string;
  pages: SiloPage[];
}

export interface HighPotentialArticle {
  slug: string;
  titleFr: string;
  titleEn: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaDescriptionFr: string;
  metaDescriptionEn: string;
  keywordsFr: string[];
  keywordsEn: string[];
  category: string;
  searchVolumePotential: 'high' | 'very-high' | 'medium';
  intent: 'informational' | 'commercial' | 'transactional';
  siloId: string;
  rationale: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SILO 1 — AUDIT (Audit Social, Audit Financier, Conformité)
// ─────────────────────────────────────────────────────────────────────────────

export const SILO_AUDIT: SiloStructure = {
  id: 'audit',
  name: 'Audit & Conformité',
  nameEn: 'Audit & Compliance',
  pillarPath: '/services/audit-social',
  color: '#d4a82a',
  icon: 'ri-shield-check-line',
  pages: [
    {
      title: 'Audit Social — Conformité OHADA & UEMOA',
      titleEn: 'Social Audit — OHADA & UEMOA Compliance',
      path: '/services/audit-social',
      metaTitle: 'Audit Social OHADA Afrique | Conformité RH & Risques Sociaux | KHEPRA EXPERTS',
      metaTitleEn: 'Social Audit OHADA Africa | HR Compliance & Social Risks | KHEPRA EXPERTS',
      metaDescription: 'Audit social certifié OHADA pour entreprises africaines. Cartographie des risques RH, conformité UEMOA/CEMAC, plan correctif actionnable. Cabinet expert Lomé, Togo. Résultats en 3–6 semaines.',
      metaDescriptionEn: 'OHADA-certified social audit for African businesses. HR risk mapping, UEMOA/CEMAC compliance, actionable remediation plan. Expert firm Lomé, Togo. Results in 3–6 weeks.',
      keywords: ['audit social OHADA', 'conformité RH Afrique', 'risques sociaux UEMOA', 'audit travail Togo', 'conformité BCEAO entreprise'],
      keywordsEn: ['OHADA social audit', 'HR compliance Africa', 'UEMOA social risks', 'labor audit Togo', 'BCEAO business compliance'],
      type: 'pillar',
      priority: 0.9,
    },
    {
      title: 'Conformité BCEAO — Guide Complet 2026',
      titleEn: 'BCEAO Compliance — Complete Guide 2026',
      path: '/blog/bceao-ohada-conformite/',
      metaTitle: 'Conformité BCEAO 2026 : Guide Complet pour SFD & Banques | KHEPRA EXPERTS',
      metaTitleEn: 'BCEAO Compliance 2026: Complete Guide for MFIs & Banks | KHEPRA EXPERTS',
      metaDescription: 'Tout ce que les SFD, banques et EMF doivent savoir sur la conformité BCEAO 2026. Nouvelles exigences, sanctions, plan de mise en conformité. Expert UEMOA Lomé.',
      metaDescriptionEn: 'Everything MFIs, banks and EMFs need to know about BCEAO 2026 compliance. New requirements, penalties, compliance roadmap. UEMOA expert Lomé.',
      keywords: ['conformité BCEAO 2026', 'réglementation SFD UEMOA', 'audit microfinance Afrique', 'normes prudentielles BCEAO'],
      keywordsEn: ['BCEAO compliance 2026', 'MFI UEMOA regulation', 'microfinance audit Africa', 'BCEAO prudential standards'],
      type: 'satellite',
      priority: 0.8,
    },
    {
      title: 'Contrôle Interne & Trésorerie',
      titleEn: 'Internal Control & Treasury',
      path: '/blog/controle-interne-tresorerie-pme-afrique-syscohada/',
      metaTitle: 'Contrôle Interne Trésorerie PME Afrique | Audit Financier OHADA | KHEPRA',
      metaTitleEn: 'Internal Control Treasury SME Africa | OHADA Financial Audit | KHEPRA',
      metaDescription: 'Renforcez le contrôle interne de votre trésorerie selon les normes OHADA. Procédures, outils et indicateurs pour PME et institutions financières africaines.',
      metaDescriptionEn: 'Strengthen your treasury internal control per OHADA standards. Procedures, tools and KPIs for African SMEs and financial institutions.',
      keywords: ['contrôle interne trésorerie', 'audit financier OHADA', 'gestion trésorerie PME Afrique', 'procédures comptables SYSCOHADA'],
      keywordsEn: ['treasury internal control', 'OHADA financial audit', 'SME treasury management Africa', 'SYSCOHADA accounting procedures'],
      type: 'satellite',
      priority: 0.8,
    },
    {
      title: 'Diagnostic Organisationnel',
      titleEn: 'Organizational Diagnosis',
      path: '/services/diagnostic-organisationnel',
      metaTitle: 'Diagnostic Organisationnel Entreprise Afrique | Audit Structure | KHEPRA',
      metaTitleEn: 'Organizational Diagnosis Africa | Structure Audit | KHEPRA EXPERTS',
      metaDescription: 'Diagnostic organisationnel complet pour entreprises africaines. Analyse de structure, processus, gouvernance et performance. Rapport en 4 semaines. Lomé, Togo.',
      metaDescriptionEn: 'Complete organizational diagnosis for African businesses. Structure, process, governance and performance analysis. Report in 4 weeks. Lomé, Togo.',
      keywords: ['diagnostic organisationnel Afrique', 'audit structure entreprise', 'analyse gouvernance PME', 'diagnostic performance Togo'],
      keywordsEn: ['organizational diagnosis Africa', 'business structure audit', 'SME governance analysis', 'performance diagnosis Togo'],
      type: 'satellite',
      priority: 0.8,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SILO 2 — CONSEIL STRATÉGIQUE (Stratégie, Transformation, Financement)
// ─────────────────────────────────────────────────────────────────────────────

export const SILO_CONSEIL: SiloStructure = {
  id: 'conseil',
  name: 'Conseil Stratégique',
  nameEn: 'Strategic Advisory',
  pillarPath: '/services/conseil-strategique',
  color: '#10b981',
  icon: 'ri-compass-3-line',
  pages: [
    {
      title: 'Conseil Stratégique — Plan de Croissance Afrique',
      titleEn: 'Strategic Advisory — Africa Growth Plan',
      path: '/services/conseil-strategique',
      metaTitle: 'Conseil Stratégique Afrique | Plan Croissance PME & Institutions | KHEPRA',
      metaTitleEn: 'Strategic Advisory Africa | SME & Institution Growth Plan | KHEPRA',
      metaDescription: 'Cabinet de conseil stratégique spécialisé Afrique francophone. Plan stratégique 3–5 ans, diagnostic SWOT, feuille de route croissance. +25% de croissance observée. Lomé, Togo.',
      metaDescriptionEn: 'Strategic advisory firm specialized in Francophone Africa. 3–5 year strategic plan, SWOT diagnosis, growth roadmap. +25% growth observed. Lomé, Togo.',
      keywords: ['conseil stratégique Afrique', 'plan croissance PME Afrique', 'cabinet conseil Togo', 'stratégie entreprise UEMOA', 'conseil gouvernance Afrique'],
      keywordsEn: ['strategic advisory Africa', 'SME growth plan Africa', 'consulting firm Togo', 'UEMOA business strategy', 'Africa governance advisory'],
      type: 'pillar',
      priority: 0.9,
    },
    {
      title: 'Transformation Digitale PME Afrique',
      titleEn: 'Digital Transformation SME Africa',
      path: '/services/transformation-digitale',
      metaTitle: 'Transformation Digitale PME Afrique | Stratégie Digital UEMOA | KHEPRA',
      metaTitleEn: 'Digital Transformation SME Africa | UEMOA Digital Strategy | KHEPRA',
      metaDescription: 'Accompagnement transformation digitale pour PME et institutions africaines. Stratégie digitale, outils ERP/CRM, formation équipes. Résultats mesurables en 6 mois.',
      metaDescriptionEn: 'Digital transformation support for African SMEs and institutions. Digital strategy, ERP/CRM tools, team training. Measurable results in 6 months.',
      keywords: ['transformation digitale PME Afrique', 'stratégie digitale UEMOA', 'ERP Afrique francophone', 'digitalisation entreprise Togo'],
      keywordsEn: ['digital transformation SME Africa', 'UEMOA digital strategy', 'ERP Francophone Africa', 'business digitalization Togo'],
      type: 'satellite',
      priority: 0.8,
    },
    {
      title: 'Levée de Fonds & Financement',
      titleEn: 'Fundraising & Financing',
      path: '/services/levee-de-fonds',
      metaTitle: 'Levée de Fonds Afrique | Financement PME UEMOA | Conseil KHEPRA EXPERTS',
      metaTitleEn: 'Fundraising Africa | SME Financing UEMOA | KHEPRA EXPERTS Advisory',
      metaDescription: 'Structuration de dossiers de financement pour PME et institutions africaines. Accès aux bailleurs, fonds d\'investissement, banques de développement. Taux de succès 78%.',
      metaDescriptionEn: 'Financing file structuring for African SMEs and institutions. Access to donors, investment funds, development banks. 78% success rate.',
      keywords: ['levée de fonds Afrique', 'financement PME UEMOA', 'dossier investissement Afrique', 'bailleurs fonds Afrique francophone'],
      keywordsEn: ['fundraising Africa', 'SME financing UEMOA', 'investment file Africa', 'donors Francophone Africa'],
      type: 'satellite',
      priority: 0.8,
    },
    {
      title: 'Développement Organisationnel',
      titleEn: 'Organizational Development',
      path: '/services/developpement-organisationnel',
      metaTitle: 'Développement Organisationnel Afrique | Restructuration Entreprise | KHEPRA',
      metaTitleEn: 'Organizational Development Africa | Business Restructuring | KHEPRA',
      metaDescription: 'Développement organisationnel pour entreprises africaines en croissance. Restructuration, optimisation des processus, gouvernance et management. Cabinet expert Lomé.',
      metaDescriptionEn: 'Organizational development for growing African businesses. Restructuring, process optimization, governance and management. Expert firm Lomé.',
      keywords: ['développement organisationnel Afrique', 'restructuration entreprise Togo', 'optimisation processus PME', 'gouvernance entreprise OHADA'],
      keywordsEn: ['organizational development Africa', 'business restructuring Togo', 'SME process optimization', 'OHADA corporate governance'],
      type: 'satellite',
      priority: 0.8,
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 5 ARTICLES À FORT POTENTIEL DE TRAFIC
// Thématiques : Conformité BCEAO, Normes OHADA 2026, Digitalisation CA Afrique
// ─────────────────────────────────────────────────────────────────────────────

export const HIGH_POTENTIAL_ARTICLES: HighPotentialArticle[] = [
  {
    slug: 'conformite-bceao-2026-nouvelles-exigences-sfd',
    titleFr: 'Conformité BCEAO 2026 : Les 7 Nouvelles Exigences que Chaque SFD Doit Connaître',
    titleEn: 'BCEAO Compliance 2026: The 7 New Requirements Every MFI Must Know',
    metaTitleFr: 'Conformité BCEAO 2026 : 7 Exigences Clés pour SFD & Banques | KHEPRA EXPERTS',
    metaTitleEn: 'BCEAO Compliance 2026: 7 Key Requirements for MFIs & Banks | KHEPRA EXPERTS',
    metaDescriptionFr: 'La BCEAO a renforcé ses exigences prudentielles en 2026. Découvrez les 7 nouvelles obligations pour les SFD, EMF et banques de la zone UEMOA. Plan de mise en conformité inclus.',
    metaDescriptionEn: 'BCEAO has strengthened its prudential requirements in 2026. Discover the 7 new obligations for MFIs, EMFs and banks in the UEMOA zone. Compliance roadmap included.',
    keywordsFr: ['conformité BCEAO 2026', 'nouvelles exigences SFD UEMOA', 'réglementation microfinance 2026', 'normes prudentielles BCEAO', 'mise en conformité SFD'],
    keywordsEn: ['BCEAO compliance 2026', 'new MFI UEMOA requirements', 'microfinance regulation 2026', 'BCEAO prudential standards', 'MFI compliance roadmap'],
    category: 'Conformité & Réglementation',
    searchVolumePotential: 'very-high',
    intent: 'informational',
    siloId: 'audit',
    rationale: 'Requête à très fort volume — chaque SFD de la zone UEMOA (8 pays, 700+ institutions) cherche ces informations. Positionnement naturel pour KHEPRA comme référence BCEAO.',
  },
  {
    slug: 'normes-ohada-2026-reformes-droit-societes',
    titleFr: 'Normes OHADA 2026 : Ce que les Réformes du Droit des Sociétés Changent pour Votre Entreprise',
    titleEn: 'OHADA Standards 2026: What Corporate Law Reforms Change for Your Business',
    metaTitleFr: 'Normes OHADA 2026 : Réformes Droit des Sociétés & Impact Entreprises | KHEPRA',
    metaTitleEn: 'OHADA Standards 2026: Corporate Law Reforms & Business Impact | KHEPRA',
    metaDescriptionFr: 'Les réformes OHADA 2026 modifient profondément le droit des sociétés en Afrique. Nouvelles obligations de gouvernance, SYSCOHADA révisé, responsabilité des dirigeants. Analyse experte.',
    metaDescriptionEn: 'OHADA 2026 reforms deeply modify corporate law in Africa. New governance obligations, revised SYSCOHADA, director liability. Expert analysis.',
    keywordsFr: ['normes OHADA 2026', 'réforme droit sociétés Afrique', 'SYSCOHADA 2026', 'gouvernance entreprise OHADA', 'obligations dirigeants OHADA'],
    keywordsEn: ['OHADA standards 2026', 'Africa corporate law reform', 'SYSCOHADA 2026', 'OHADA corporate governance', 'OHADA director obligations'],
    category: 'Gouvernance & Droit',
    searchVolumePotential: 'very-high',
    intent: 'informational',
    siloId: 'audit',
    rationale: 'OHADA couvre 17 pays africains. Toute entreprise formelle est concernée. Requête à très fort potentiel avec peu de contenu expert disponible en français.',
  },
  {
    slug: 'digitalisation-conseil-administration-afrique-outils',
    titleFr: 'Digitalisation des Conseils d\'Administration en Afrique : Outils, Enjeux et Meilleures Pratiques 2026',
    titleEn: 'Digitalization of Boards of Directors in Africa: Tools, Challenges and Best Practices 2026',
    metaTitleFr: 'Digitalisation CA Afrique 2026 | Outils Gouvernance Numérique | KHEPRA EXPERTS',
    metaTitleEn: 'Board Digitalization Africa 2026 | Digital Governance Tools | KHEPRA EXPERTS',
    metaDescriptionFr: 'Comment les conseils d\'administration africains adoptent les outils digitaux : board portals, vote électronique, reporting en temps réel. Guide pratique pour DG et administrateurs.',
    metaDescriptionEn: 'How African boards of directors adopt digital tools: board portals, electronic voting, real-time reporting. Practical guide for CEOs and directors.',
    keywordsFr: ['digitalisation conseil administration Afrique', 'gouvernance numérique CA', 'board portal Afrique', 'outils gouvernance digitale PME', 'transformation digitale gouvernance'],
    keywordsEn: ['board digitalization Africa', 'digital governance CA', 'board portal Africa', 'digital governance tools SME', 'digital transformation governance'],
    category: 'Transformation Digitale',
    searchVolumePotential: 'high',
    intent: 'informational',
    siloId: 'conseil',
    rationale: 'Thématique émergente à fort potentiel. Les DG et administrateurs cherchent activement ces informations. Positionnement différenciant pour KHEPRA sur la gouvernance digitale.',
  },
  {
    slug: 'plan-strategique-pme-africaine-guide-complet',
    titleFr: 'Comment Construire un Plan Stratégique pour une PME Africaine : Guide Complet 2026',
    titleEn: 'How to Build a Strategic Plan for an African SME: Complete Guide 2026',
    metaTitleFr: 'Plan Stratégique PME Africaine 2026 | Guide Complet Étape par Étape | KHEPRA',
    metaTitleEn: 'African SME Strategic Plan 2026 | Complete Step-by-Step Guide | KHEPRA',
    metaDescriptionFr: 'Guide complet pour construire un plan stratégique adapté aux PME africaines. Diagnostic SWOT, vision, objectifs SMART, feuille de route et KPI. Méthode éprouvée en zone UEMOA/CEMAC.',
    metaDescriptionEn: 'Complete guide to building a strategic plan for African SMEs. SWOT diagnosis, vision, SMART objectives, roadmap and KPIs. Proven method in UEMOA/CEMAC zone.',
    keywordsFr: ['plan stratégique PME africaine', 'comment faire plan stratégique Afrique', 'guide stratégie entreprise UEMOA', 'feuille de route PME Afrique', 'objectifs SMART entreprise africaine'],
    keywordsEn: ['African SME strategic plan', 'how to make strategic plan Africa', 'UEMOA business strategy guide', 'SME roadmap Africa', 'SMART objectives African business'],
    category: 'Stratégie & Croissance',
    searchVolumePotential: 'very-high',
    intent: 'informational',
    siloId: 'conseil',
    rationale: 'Requête à très fort volume de recherche. Les dirigeants de PME africaines cherchent des guides pratiques. Article pilier qui peut générer des leads qualifiés vers le service Conseil Stratégique.',
  },
  {
    slug: 'inclusion-financiere-fintech-afrique-ouest-2026',
    titleFr: 'Inclusion Financière & Fintech en Afrique de l\'Ouest 2026 : État des Lieux et Opportunités',
    titleEn: 'Financial Inclusion & Fintech in West Africa 2026: State of Play and Opportunities',
    metaTitleFr: 'Inclusion Financière Fintech Afrique Ouest 2026 | Analyse & Opportunités | KHEPRA',
    metaTitleEn: 'Financial Inclusion Fintech West Africa 2026 | Analysis & Opportunities | KHEPRA',
    metaDescriptionFr: 'État des lieux de l\'inclusion financière et du fintech en Afrique de l\'Ouest en 2026. Mobile money, réglementation BCEAO, opportunités pour SFD et startups. Analyse experte KHEPRA.',
    metaDescriptionEn: 'State of financial inclusion and fintech in West Africa in 2026. Mobile money, BCEAO regulation, opportunities for MFIs and startups. KHEPRA expert analysis.',
    keywordsFr: ['inclusion financière Afrique Ouest 2026', 'fintech UEMOA 2026', 'mobile money Afrique francophone', 'réglementation fintech BCEAO', 'opportunités fintech Afrique'],
    keywordsEn: ['financial inclusion West Africa 2026', 'UEMOA fintech 2026', 'mobile money Francophone Africa', 'BCEAO fintech regulation', 'fintech opportunities Africa'],
    category: 'Finance & Inclusion',
    searchVolumePotential: 'very-high',
    intent: 'informational',
    siloId: 'conseil',
    rationale: 'Thématique à très fort potentiel de trafic organique. Positionnement naturel de KHEPRA comme référence sur l\'inclusion financière en Afrique de l\'Ouest. Attire bailleurs, investisseurs et institutions.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT CONSOLIDÉ
// ─────────────────────────────────────────────────────────────────────────────

export const ALL_SILOS: SiloStructure[] = [SILO_AUDIT, SILO_CONSEIL];

/**
 * Retourne les pages du silo d'une page donnée (pour les liens internes)
 */
export function getSiloLinksForPath(currentPath: string): SiloPage[] {
  for (const silo of ALL_SILOS) {
    const isInSilo = silo.pages.some((p) => p.path === currentPath);
    if (isInSilo) {
      return silo.pages.filter((p) => p.path !== currentPath);
    }
  }
  return [];
}

/**
 * Retourne le silo d'une page donnée
 */
export function getSiloForPath(currentPath: string): SiloStructure | null {
  return ALL_SILOS.find((s) => s.pages.some((p) => p.path === currentPath)) ?? null;
}

/**
 * Retourne les meta tags premium pour une page donnée
 */
export function getMetaTagsForPath(
  currentPath: string,
  lang: 'fr' | 'en' = 'fr'
): { title: string; description: string; keywords: string[] } | null {
  for (const silo of ALL_SILOS) {
    const page = silo.pages.find((p) => p.path === currentPath);
    if (page) {
      return {
        title: lang === 'en' ? page.metaTitleEn : page.metaTitle,
        description: lang === 'en' ? page.metaDescriptionEn : page.metaDescription,
        keywords: lang === 'en' ? page.keywordsEn : page.keywords,
      };
    }
  }
  return null;
}




