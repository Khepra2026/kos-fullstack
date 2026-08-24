export interface HnNode {
  tag: 'h1' | 'h2' | 'h3' | 'h4';
  text: string;
  issues: string[];
  children: HnNode[];
}

export interface HnStructurePage {
  page_url: string;
  page_title: string;
  tree: HnNode;
  hn_score: number;
  hn_issues: string[];
  hn_quick_wins: string[];
}

export interface MetaTagPage {
  page_url: string;
  page_title: string;
  title: string;
  title_length: number;
  title_ok: boolean;
  title_issue?: string;
  meta_description: string;
  meta_desc_length: number;
  meta_desc_ok: boolean;
  meta_desc_issue?: string;
  h1_text: string;
  h1_length: number;
  h1_ok: boolean;
  canonical_url: string;
  canonical_ok: boolean;
  og_title: boolean;
  og_description: boolean;
  og_image: boolean;
  twitter_card: boolean;
  robots_index: boolean;
  robots_follow: boolean;
  meta_score: number;
}

export interface KeywordPosition {
  keyword: string;
  url: string;
  position: number;
  previous_position: number;
  search_volume: number;
  difficulty: number;
  intent: 'informationnel' | 'transactionnel' | 'navigationnel' | 'commercial';
  ctr_estimate: number;
  in_title: boolean;
  in_h1: boolean;
  in_h2: boolean;
  in_meta: boolean;
  density_pct: number;
  trend: 'up' | 'down' | 'stable';
  featured_snippet: boolean;
}

export interface CannibalizationPair {
  keyword: string;
  pages: { url: string; position: number; title: string }[];
  severity: 'critique' | 'élevée' | 'modérée';
  recommendation: string;
}

export interface ContentQualityPage {
  page_url: string;
  page_title: string;
  word_count: number;
  word_count_ok: boolean;
  flesch_reading_ease: number;
  flesch_ok: boolean;
  content_freshness_days: number;
  freshness_ok: boolean;
  has_toc: boolean;
  has_images: boolean;
  has_video: boolean;
  has_tables: boolean;
  has_lists: boolean;
  has_cta: boolean;
  duplicate_risk_pct: number;
  duplicate_ok: boolean;
  thin_content: boolean;
  content_score: number;
  recommendations: string[];
}

export interface SEOOnPageOverview {
  total_pages_analyzed: number;
  overall_onpage_score: number;
  hn_average_score: number;
  meta_average_score: number;
  content_average_score: number;
  keywords_tracked: number;
  keywords_top3: number;
  keywords_top10: number;
  keywords_improved: number;
  keywords_declined: number;
  featured_snippets_won: number;
  meta_critical_issues: number;
  content_critical_issues: number;
  hn_critical_issues: number;
  thin_content_pages: number;
  cannibalization_pairs: number;
  duplicate_content_pages: number;
}

export interface QuickWin {
  id: string;
  category: 'hn' | 'meta' | 'keywords' | 'content';
  action: string;
  target: string;
  priority: 'critique' | 'haute' | 'moyenne';
  effort: string;
  impact: string;
  status: 'pending' | 'in_progress' | 'completed';
  kpi_impact: string;
}

export const SEO_ONPAGE_OVERVIEW: SEOOnPageOverview = {
  total_pages_analyzed: 45,
  overall_onpage_score: 96,
  hn_average_score: 9.5,
  meta_average_score: 9.3,
  content_average_score: 9.4,
  keywords_tracked: 628,
  keywords_top3: 132,
  keywords_top10: 485,
  keywords_improved: 287,
  keywords_declined: 2,
  featured_snippets_won: 78,
  meta_critical_issues: 0,
  content_critical_issues: 0,
  hn_critical_issues: 0,
  thin_content_pages: 0,
  cannibalization_pairs: 0,
  duplicate_content_pages: 0,
};

export const HN_STRUCTURE_PAGES: HnStructurePage[] = [
  {
    page_url: '/',
    page_title: 'KHEPRA EXPERTS — Accueil',
    tree: {
      tag: 'h1', text: 'Régulation. Prix de Transfert. Gouvernance.', issues: [],
      children: [
        { tag: 'h2', text: 'Pourquoi Nous Faire Confiance', issues: [], children: [
          { tag: 'h3', text: '22 ans d\'expertise terrain', issues: ['Trop générique — pas de mot-clé'], children: [] },
          { tag: 'h3', text: 'Certifié ISO 9001', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Nos 4 Business Units', issues: [], children: [
          { tag: 'h3', text: 'Régulation Financière', issues: [], children: [] },
          { tag: 'h3', text: 'Prix de Transfert', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Cas Pratiques', issues: ['Pas de mot-clé dans le H2'], children: [] },
        { tag: 'h2', text: 'Ils Nous Font Confiance', issues: [], children: [] },
        { tag: 'h2', text: 'Diagnostic Flash', issues: ['Pas formulé en question pour AEO'], children: [] },
        { tag: 'h2', text: 'Articles & Analyses', issues: [], children: [] },
        { tag: 'h2', text: 'Think Tank', issues: ['Trop vague'], children: [] },
        { tag: 'h2', text: 'Prêt à transformer votre conformité ?', issues: [], children: [] },
      ],
    },
    hn_score: 8.5,
    hn_issues: ['3 H2 sans mot-clé stratégique', 'Pas de H2 en question AEO sauf le dernier', 'Structure H3 inégale (14 H3 dont certains trop génériques)'],
    hn_quick_wins: ['Reformuler "Cas Pratiques" → "Quels résultats concrets pour nos clients ?"', 'Reformuler "Diagnostic Flash" → "Comment obtenir un diagnostic gratuit en 4 minutes ?"', 'Ajouter mot-clé "conformité BCEAO" dans H2 "Think Tank"'],
  },
  {
    page_url: '/services/audit-pre-inspection-bceao',
    page_title: 'Audit Pré-Inspection BCEAO',
    tree: {
      tag: 'h1', text: 'Audit Pré-Inspection BCEAO', issues: [],
      children: [
        { tag: 'h2', text: 'Votre Enjeu', issues: ['Ne contient pas de mot-clé'], children: [] },
        { tag: 'h2', text: 'Notre Méthodologie', issues: ['Pas en question AEO'], children: [
          { tag: 'h3', text: 'Phase 1 : Revue Documentaire', issues: [], children: [] },
          { tag: 'h3', text: 'Phase 2 : Simulation', issues: [], children: [] },
          { tag: 'h3', text: 'Phase 3 : Recommandations', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Ce Que Nous Auditions', issues: [], children: [
          { tag: 'h3', text: 'Gouvernance & Conseil', issues: [], children: [] },
          { tag: 'h3', text: 'Gestion des Risques', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Planning Type', issues: [], children: [] },
        { tag: 'h2', text: 'Pourquoi KHEPRA', issues: [], children: [] },
        { tag: 'h2', text: 'Questions Fréquentes', issues: [], children: [] },
        { tag: 'h2', text: 'Diagnostic Flash', issues: ['Pas en question'], children: [] },
      ],
    },
    hn_score: 9.0,
    hn_issues: ['2 H2 génériques sans mot-clé', 'Seulement 1 H2 en question', 'Pas de H4 pour sous-sections détaillées'],
    hn_quick_wins: ['Reformuler "Votre Enjeu" → "Pourquoi préparer une inspection BCEAO en 2026 ?"', 'Reformuler "Notre Méthodologie" → "Comment se déroule notre audit pré-inspection ?"'],
  },
  {
    page_url: '/blog/daf',
    page_title: 'Directeur Administratif et Financier — Guide 2026',
    tree: {
      tag: 'h1', text: 'Directeur Administratif et Financier : Rôle, Missions et Enjeux 2026', issues: [],
      children: [
        { tag: 'h2', text: 'Qu\'est-ce qu\'un DAF ?', issues: [], children: [] },
        { tag: 'h2', text: 'Missions principales', issues: ['Pas en question'], children: [
          { tag: 'h3', text: 'Pilotage financier', issues: [], children: [] },
          { tag: 'h3', text: 'Contrôle de gestion', issues: [], children: [] },
          { tag: 'h3', text: 'Trésorerie', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Compétences requises', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'DAF vs CFO', issues: [], children: [] },
        { tag: 'h2', text: 'DAF en Afrique', issues: ['Pas en question'], children: [] },
      ],
    },
    hn_score: 6.5,
    hn_issues: ['3 H2 non formulés en questions', 'H3 "Pilotage financier" sans mot-clé longue traîne', 'Pas de H4 pour sous-sections'],
    hn_quick_wins: ['Reformuler "Missions principales" → "Quelles sont les 7 missions clés d\'un DAF en 2026 ?"', 'Reformuler "Compétences requises" → "Quelles compétences pour devenir DAF en Afrique ?"'],
  },
  {
    page_url: '/contact',
    page_title: 'Contactez KHEPRA EXPERTS',
    tree: {
      tag: 'h1', text: 'Contactez-Nous', issues: ['Trop court, pas de mot-clé'],
      children: [
        { tag: 'h2', text: 'Nos Bureaux', issues: ['Pas en question'], children: [
          { tag: 'h3', text: 'Dakar', issues: [], children: [] },
          { tag: 'h3', text: 'Abidjan', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Formulaire', issues: ['Pas informatif'], children: [] },
        { tag: 'h2', text: 'Informations', issues: ['Trop générique'], children: [] },
      ],
    },
    hn_score: 4.0,
    hn_issues: ['H1 trop court sans mot-clé (14 caractères)', 'Aucun H2 en question', 'Seulement 2 H3 sur une page importante', 'Structure Hn très pauvre (3 H2, 2 H3)'],
    hn_quick_wins: ['H1 → "Contactez KHEPRA EXPERTS — Conseil en Régulation & Gouvernance | Afrique"', 'Ajouter H2 question : "Où sont situés nos bureaux en Afrique ?"', 'Ajouter H2 question : "Quels sont nos délais de réponse ?"'],
  },
  {
    page_url: '/services',
    page_title: 'Nos Services — KHEPRA EXPERTS',
    tree: {
      tag: 'h1', text: 'Nos Services', issues: ['Trop court, manque mots-clés'],
      children: [
        { tag: 'h2', text: 'Régulation Financière', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Prix de Transfert', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Gouvernance & Risques', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Due Diligence', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Transformation', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Contact', issues: ['Non informatif'], children: [] },
      ],
    },
    hn_score: 6.0,
    hn_issues: ['H1 trop court (11 caractères)', '6 H2 purement nominatifs, aucun en question', 'Pas de H3 pour détailler les sous-services', 'Zéro optimisation AEO'],
    hn_quick_wins: ['H1 → "Services de Conseil — Régulation, Prix de Transfert & Gouvernance | KHEPRA EXPERTS"', 'H2 → "Quels services pour votre conformité BCEAO / COBAC ?"', 'H2 → "Comment optimiser votre prix de transfert en Afrique ?"'],
  },
  {
    page_url: '/blog',
    page_title: 'Blog & Analyses — KHEPRA EXPERTS',
    tree: {
      tag: 'h1', text: 'Blog & Analyses', issues: ['Court, manque mots-clés'],
      children: [
        { tag: 'h2', text: 'Derniers Articles', issues: [], children: [] },
        { tag: 'h2', text: 'Thématiques', issues: [], children: [
          { tag: 'h3', text: 'Régulation BCEAO', issues: [], children: [] },
          { tag: 'h3', text: 'Gouvernance OHADA', issues: [], children: [] },
          { tag: 'h3', text: 'ESG & Durabilité', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Guides Populaires', issues: [], children: [] },
        { tag: 'h2', text: 'Newsletter', issues: ['Pas en question'], children: [] },
      ],
    },
    hn_score: 5.5,
    hn_issues: ['H1 trop court et générique', 'Aucun H2 en question', 'Pas de H2 SEO pour l\'AEO', 'Page listing — manque de structure informative'],
    hn_quick_wins: ['H1 → "Blog — Analyses Réglementaires, Études & Guides Pratiques | KHEPRA EXPERTS"', 'Ajouter H2 question : "Quels sont les derniers guides conformité BCEAO ?"'],
  },
  {
    page_url: '/blog/preparer-inspection-bceao-banque-uemoa',
    page_title: 'Préparer une Inspection BCEAO — Guide Complet 2026',
    tree: {
      tag: 'h1', text: 'Préparer une Inspection BCEAO : Guide Complet 2026 pour les Banques UEMOA', issues: [],
      children: [
        { tag: 'h2', text: 'Qu\'est-ce qu\'une inspection BCEAO ?', issues: [], children: [] },
        { tag: 'h2', text: 'Comment se déroule une inspection ?', issues: [], children: [
          { tag: 'h3', text: 'Phase préparatoire', issues: [], children: [] },
          { tag: 'h3', text: 'Phase de contrôle sur site', issues: [], children: [] },
          { tag: 'h3', text: 'Phase de rapport', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Les 127 points de contrôle', issues: [], children: [] },
        { tag: 'h2', text: 'Quels documents préparer ?', issues: [], children: [] },
        { tag: 'h2', text: 'Erreurs fréquentes à éviter', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Planning de préparation recommandé', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'FAQ', issues: [], children: [] },
      ],
    },
    hn_score: 9.2,
    hn_issues: ['2 H2 non formulés en questions', 'Pas de H4 pour sous-sections de la checklist'],
    hn_quick_wins: ['Reformuler "Erreurs fréquentes" → "Quelles sont les 10 erreurs à éviter lors d\'une inspection BCEAO ?"'],
  },
  {
    page_url: '/services/prix-de-transfert',
    page_title: 'Prix de Transfert en Afrique — BEPS Action 13',
    tree: {
      tag: 'h1', text: 'Prix de Transfert & Fiscalité Internationale', issues: [],
      children: [
        { tag: 'h2', text: 'Votre Contexte', issues: ['Trop générique'], children: [] },
        { tag: 'h2', text: 'Documentation BEPS Action 13', issues: [], children: [
          { tag: 'h3', text: 'Master File', issues: [], children: [] },
          { tag: 'h3', text: 'Local File', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Notre Approche', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Cas Pratiques', issues: [], children: [] },
        { tag: 'h2', text: 'Contact', issues: [], children: [] },
      ],
    },
    hn_score: 7.0,
    hn_issues: ['2 H2 génériques', 'Structure Hn inégale (5 H2, 8 H3 irréguliers)', 'Manque H2 questions pour AEO'],
    hn_quick_wins: ['Reformuler "Votre Contexte" → "Pourquoi les prix de transfert sont-ils critiques en Afrique ?"', 'Ajouter H2 question sur les sanctions'],
  },
  {
    page_url: '/expertises',
    page_title: 'Expertises — KHEPRA EXPERTS',
    tree: {
      tag: 'h1', text: 'Nos Expertises', issues: ['Court, pas de mot-clé'],
      children: [
        { tag: 'h2', text: 'Audit & Contrôle', issues: [], children: [] },
        { tag: 'h2', text: 'Conseil Stratégique', issues: [], children: [] },
        { tag: 'h2', text: 'Formation', issues: [], children: [] },
        { tag: 'h2', text: 'Ingénierie Financière', issues: [], children: [] },
        { tag: 'h2', text: 'Accompagnement', issues: [], children: [] },
      ],
    },
    hn_score: 5.0,
    hn_issues: ['H1 trop court', '5 H2 purement nominatifs, aucun en question', 'Zéro H3', 'Structure plate sans profondeur'],
    hn_quick_wins: ['H1 → "Expertises KHEPRA — Audit, Conseil & Formation en Régulation Financière"', 'Ajouter H3 sous chaque H2 avec mots-clés longue traîne'],
  },
  {
    page_url: '/about',
    page_title: 'À Propos — KHEPRA EXPERTS',
    tree: {
      tag: 'h1', text: 'KHEPRA EXPERTS — Excellence & Confiance depuis 2004', issues: [],
      children: [
        { tag: 'h2', text: 'Notre Histoire', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Notre Mission', issues: [], children: [] },
        { tag: 'h2', text: 'Notre Équipe Dirigeante', issues: [], children: [
          { tag: 'h3', text: 'Direction Générale', issues: [], children: [] },
          { tag: 'h3', text: 'Experts Sectoriels', issues: [], children: [] },
        ]},
        { tag: 'h2', text: 'Nos Certifications', issues: ['Pas en question'], children: [] },
        { tag: 'h2', text: 'Notre Présence', issues: [], children: [] },
        { tag: 'h2', text: 'Nos Engagements ESG', issues: [], children: [] },
      ],
    },
    hn_score: 7.5,
    hn_issues: ['2 H2 non formulés en questions', 'Manque de mots-clés dans H2/H3'],
    hn_quick_wins: ['Reformuler "Notre Histoire" → "Quelle est l\'histoire de KHEPRA EXPERTS depuis 2004 ?"'],
  },
];

export const META_TAG_PAGES: MetaTagPage[] = [
  {
    page_url: '/',
    page_title: 'KHEPRA EXPERTS — Accueil',
    title: 'KHEPRA EXPERTS — Cabinet de Conseil Spécialisé en Régulation Financière, Prix de Transfert & Gouvernance | Afrique Francophone',
    title_length: 120,
    title_ok: false,
    title_issue: 'Titre trop long (120 car. au lieu de 60 max) — sera tronqué par Google',
    meta_description: 'KHEPRA EXPERTS, cabinet de référence en Afrique francophone. Régulation financière (BCEAO, COBAC, BEAC), prix de transfert (BEPS Action 13), gouvernance, risques & conformité. 22 ans d\'expertise terrain. Diagnostic gratuit.',
    meta_desc_length: 158,
    meta_desc_ok: true,
    h1_text: 'Régulation. Prix de Transfert. Gouvernance.',
    h1_length: 44,
    h1_ok: true,
    canonical_url: 'https://khepraexperts.com/',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: true,
    twitter_card: true,
    robots_index: true,
    robots_follow: true,
    meta_score: 8.2,
  },
  {
    page_url: '/services/audit-pre-inspection-bceao',
    page_title: 'Audit Pré-Inspection BCEAO',
    title: 'Audit Pré-Inspection BCEAO — Préparation Complète aux Missions de Contrôle | KHEPRA EXPERTS',
    title_length: 98,
    title_ok: false,
    title_issue: 'Titre trop long (98 car.) — couper après le pipe',
    meta_description: 'Préparez votre inspection BCEAO avec KHEPRA EXPERTS. Audit pré-inspection complet : revue documentaire, simulation de contrôle, cartographie des risques, plan d\'actions correctives.',
    meta_desc_length: 148,
    meta_desc_ok: true,
    h1_text: 'Audit Pré-Inspection BCEAO',
    h1_length: 27,
    h1_ok: true,
    canonical_url: 'https://khepraexperts.com/services/audit-pre-inspection-bceao',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: true,
    twitter_card: true,
    robots_index: true,
    robots_follow: true,
    meta_score: 9.0,
  },
  {
    page_url: '/contact',
    page_title: 'Contact — KHEPRA EXPERTS',
    title: 'Contactez KHEPRA EXPERTS — Cabinet de Conseil en Régulation & Gouvernance | Afrique Francophone',
    title_length: 100,
    title_ok: false,
    title_issue: 'Titre trop long (100 car.) — viser 55-60 caractères',
    meta_description: 'Contactez KHEPRA EXPERTS pour vos besoins en régulation financière, prix de transfert, gouvernance ou conformité. Diagnostic gratuit. Bureaux à Dakar, Abidjan.',
    meta_desc_length: 148,
    meta_desc_ok: true,
    h1_text: 'Contactez-Nous',
    h1_length: 14,
    h1_ok: false,
    h1_issue: 'H1 trop court (14 car.), pas de mot-clé principal',
    canonical_url: 'https://khepraexperts.com/contact',
    canonical_ok: true,
    og_title: false,
    og_description: false,
    og_image: false,
    twitter_card: false,
    robots_index: true,
    robots_follow: true,
    meta_score: 4.5,
  },
  {
    page_url: '/services/prix-de-transfert',
    page_title: 'Prix de Transfert — KHEPRA EXPERTS',
    title: 'Prix de Transfert en Afrique — Documentation BEPS Action 13 | KHEPRA EXPERTS',
    title_length: 83,
    title_ok: false,
    title_issue: 'Titre trop long (83 car.)',
    meta_description: 'Expertise prix de transfert en Afrique francophone. Documentation BEPS Action 13 complète : Master File, Local File, benchmarking, défense fiscale. Conforme OCDE, UEMOA, CEMAC.',
    meta_desc_length: 145,
    meta_desc_ok: true,
    h1_text: 'Prix de Transfert & Fiscalité Internationale',
    h1_length: 43,
    h1_ok: true,
    canonical_url: 'https://khepraexperts.com/services/prix-de-transfert',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: false,
    og_image_issue: 'OG Image manquante sur une page service critique',
    twitter_card: false,
    robots_index: true,
    robots_follow: true,
    meta_score: 6.8,
  },
  {
    page_url: '/services',
    page_title: 'Services — KHEPRA EXPERTS',
    title: 'Services — Régulation, Prix de Transfert, Gouvernance, Risques & Conformité | KHEPRA EXPERTS',
    title_length: 95,
    title_ok: false,
    title_issue: 'Titre trop long (95 car.)',
    meta_description: 'Découvrez nos services : régulation financière BCEAO/COBAC, prix de transfert BEPS, gouvernance d\'entreprise, due diligence, gestion des risques. Expertise Big Four en Afrique francophone.',
    meta_desc_length: 160,
    meta_desc_ok: true,
    h1_text: 'Nos Services',
    h1_length: 11,
    h1_ok: false,
    h1_issue: 'H1 trop court (11 car.), manque mots-clés principaux',
    canonical_url: 'https://khepraexperts.com/services',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: true,
    twitter_card: true,
    robots_index: true,
    robots_follow: true,
    meta_score: 7.2,
  },
  {
    page_url: '/blog',
    page_title: 'Blog — KHEPRA EXPERTS',
    title: 'Blog — Analyses Réglementaires, Études & Guides Pratiques | KHEPRA EXPERTS',
    title_length: 78,
    title_ok: false,
    title_issue: 'Titre trop long (78 car.)',
    meta_description: 'Blog KHEPRA EXPERTS : analyses BCEAO, COBAC, OHADA, prix de transfert, gouvernance, due diligence, ESG. Guides pratiques et checklists pour dirigeants et compliance officers.',
    meta_desc_length: 155,
    meta_desc_ok: true,
    h1_text: 'Blog & Analyses',
    h1_length: 15,
    h1_ok: false,
    h1_issue: 'H1 trop court (15 car.), manque mots-clés',
    canonical_url: 'https://khepraexperts.com/blog',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: true,
    twitter_card: true,
    robots_index: true,
    robots_follow: true,
    meta_score: 7.0,
  },
  {
    page_url: '/expertises',
    page_title: 'Expertises — KHEPRA EXPERTS',
    title: 'Expertises — Audit, Conseil, Formation | KHEPRA EXPERTS',
    title_length: 56,
    title_ok: true,
    meta_description: 'Les expertises KHEPRA EXPERTS : audit prudentiel, conseil en gouvernance, formation compliance, ingénierie financière. 22 ans d\'expérience en Afrique francophone.',
    meta_desc_length: 142,
    meta_desc_ok: true,
    h1_text: 'Nos Expertises',
    h1_length: 14,
    h1_ok: false,
    h1_issue: 'H1 trop court (14 car.), manque mots-clés',
    canonical_url: 'https://khepraexperts.com/expertises',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: false,
    twitter_card: false,
    robots_index: true,
    robots_follow: true,
    meta_score: 6.2,
  },
  {
    page_url: '/equipe',
    page_title: 'Équipe — KHEPRA EXPERTS',
    title: 'Équipe — Experts en Régulation, Fiscalité & Gouvernance | KHEPRA EXPERTS',
    title_length: 74,
    title_ok: false,
    title_issue: 'Titre trop long (74 car.)',
    meta_description: 'Rencontrez l\'équipe KHEPRA EXPERTS : experts en régulation financière, prix de transfert, gouvernance et conformité. Basés à Dakar, Abidjan, Douala.',
    meta_desc_length: 152,
    meta_desc_ok: true,
    h1_text: 'Notre Équipe',
    h1_length: 12,
    h1_ok: false,
    h1_issue: 'H1 trop court (12 car.), pas de mot-clé',
    canonical_url: 'https://khepraexperts.com/equipe',
    canonical_ok: true,
    og_title: true,
    og_description: true,
    og_image: true,
    twitter_card: true,
    robots_index: true,
    robots_follow: true,
    meta_score: 7.0,
  },
];

export const KEYWORD_POSITIONS: KeywordPosition[] = [
  { keyword: 'préparer inspection BCEAO', url: '/blog/preparer-inspection-bceao-banque-uemoa', position: 1, previous_position: 1, search_volume: 320, difficulty: 42, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 1.8, trend: 'stable', featured_snippet: true },
  { keyword: 'prix de transfert Afrique', url: '/services/prix-de-transfert', position: 3, previous_position: 5, search_volume: 480, difficulty: 55, intent: 'commercial', ctr_estimate: 9.5, in_title: true, in_h1: false, in_h2: true, in_meta: true, density_pct: 1.2, trend: 'up', featured_snippet: false },
  { keyword: 'circulaire BCEAO 01-2017', url: '/blog/comites-specialises-circulaire-01-2017', position: 2, previous_position: 1, search_volume: 180, difficulty: 35, intent: 'informationnel', ctr_estimate: 15.8, in_title: false, in_h1: true, in_h2: true, in_meta: false, density_pct: 2.1, trend: 'down', featured_snippet: true },
  { keyword: 'due diligence acquisition OHADA', url: '/blog/due-diligence-acquisition-afrique-ohada-guide', position: 4, previous_position: 7, search_volume: 220, difficulty: 48, intent: 'commercial', ctr_estimate: 6.0, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 1.5, trend: 'up', featured_snippet: false },
  { keyword: 'audit pré-inspection BCEAO', url: '/services/audit-pre-inspection-bceao', position: 1, previous_position: 2, search_volume: 260, difficulty: 40, intent: 'transactionnel', ctr_estimate: 28.5, in_title: true, in_h1: true, in_h2: false, in_meta: true, density_pct: 2.5, trend: 'up', featured_snippet: true },
  { keyword: 'ratios prudentiels BCEAO 2026', url: '/blog/bilan-bancaire-uemoa-ratios-bceao-solvabilite', position: 3, previous_position: 3, search_volume: 150, difficulty: 38, intent: 'informationnel', ctr_estimate: 9.5, in_title: false, in_h1: true, in_h2: true, in_meta: false, density_pct: 1.1, trend: 'stable', featured_snippet: false },
  { keyword: 'gouvernance bancaire UEMOA', url: '/blog/serie-gouvernance-bancaire-uemoa', position: 5, previous_position: 4, search_volume: 290, difficulty: 52, intent: 'informationnel', ctr_estimate: 4.5, in_title: true, in_h1: false, in_h2: true, in_meta: true, density_pct: 1.6, trend: 'down', featured_snippet: false },
  { keyword: 'regtech conformité CEMAC', url: '/services/regtech-regulatory-engineering', position: 6, previous_position: 8, search_volume: 110, difficulty: 30, intent: 'commercial', ctr_estimate: 3.2, in_title: false, in_h1: true, in_h2: true, in_meta: false, density_pct: 0.9, trend: 'up', featured_snippet: false },
  { keyword: '3 lignes de défense circulaire 03-2017', url: '/blog/3-lignes-defense-circulaire-03-2017', position: 1, previous_position: 1, search_volume: 90, difficulty: 25, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 3.2, trend: 'stable', featured_snippet: true },
  { keyword: 'cabinet conseil régulation Afrique', url: '/', position: 8, previous_position: 11, search_volume: 350, difficulty: 62, intent: 'transactionnel', ctr_estimate: 2.2, in_title: true, in_h1: false, in_h2: false, in_meta: false, density_pct: 0.3, trend: 'up', featured_snippet: false },
  { keyword: 'diagnostic conformité BCEAO gratuit', url: '/diagnostic-flash', position: 2, previous_position: 3, search_volume: 180, difficulty: 28, intent: 'transactionnel', ctr_estimate: 15.8, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.0, trend: 'up', featured_snippet: false },
  { keyword: 'conseil gouvernance OHADA', url: '/gouvernance-ohada', position: 7, previous_position: 9, search_volume: 130, difficulty: 45, intent: 'commercial', ctr_estimate: 2.8, in_title: true, in_h1: true, in_h2: false, in_meta: false, density_pct: 0.7, trend: 'up', featured_snippet: false },
  { keyword: 'KHEPRA EXPERTS avis', url: '/about', position: 9, previous_position: 6, search_volume: 200, difficulty: 35, intent: 'commercial', ctr_estimate: 1.8, in_title: false, in_h1: false, in_h2: false, in_meta: false, density_pct: 0.1, trend: 'down', featured_snippet: false },
  { keyword: 'ESG Afrique entreprises', url: '/blog/esg-afrique-entreprises', position: 4, previous_position: 3, search_volume: 280, difficulty: 50, intent: 'informationnel', ctr_estimate: 6.0, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 1.4, trend: 'down', featured_snippet: false },
  { keyword: 'lanceurs alerte circulaire BCEAO', url: '/blog/protection-lanceurs-alerte-circulaire-01-2017', position: 1, previous_position: 1, search_volume: 70, difficulty: 20, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.8, trend: 'stable', featured_snippet: true },
  { keyword: 'préparer mission COBAC', url: '/services/audit-pre-inspection-bceao', position: 11, previous_position: 15, search_volume: 95, difficulty: 32, intent: 'transactionnel', ctr_estimate: 0.8, in_title: false, in_h1: false, in_h2: false, in_meta: false, density_pct: 0.0, trend: 'up', featured_snippet: false },
  { keyword: 'indépendance administrateurs UEMOA', url: '/blog/independance-administrateurs-circulaire-01-2017', position: 2, previous_position: 2, search_volume: 60, difficulty: 22, intent: 'informationnel', ctr_estimate: 15.8, in_title: true, in_h1: true, in_h2: true, in_meta: false, density_pct: 1.9, trend: 'stable', featured_snippet: true },
  { keyword: 'plans préventifs redressement circulaire 001-2020', url: '/blog/plans-preventifs-redressement-circulaire-001-2020', position: 1, previous_position: 1, search_volume: 55, difficulty: 18, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 3.5, trend: 'stable', featured_snippet: true },
  { keyword: 'conformité COBAC CEMAC', url: '/conformite-cemac', position: 10, previous_position: 14, search_volume: 140, difficulty: 40, intent: 'commercial', ctr_estimate: 1.5, in_title: true, in_h1: true, in_h2: false, in_meta: false, density_pct: 0.5, trend: 'up', featured_snippet: false },
  { keyword: 'défense fiscale prix transfert', url: '/services/prix-de-transfert', position: 5, previous_position: 5, search_volume: 160, difficulty: 48, intent: 'commercial', ctr_estimate: 4.5, in_title: false, in_h1: false, in_h2: false, in_meta: false, density_pct: 0.0, trend: 'stable', featured_snippet: false },
  { keyword: 'verrou nationalité compétences executives', url: '/blog/verrou-nationalite-competences-executives-circulaire-02-2017', position: 1, previous_position: 1, search_volume: 45, difficulty: 15, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 3.0, trend: 'stable', featured_snippet: true },
  { keyword: 'ingénierie financière projet CEDEAO', url: '/case-studies/ingenierie-financiere-projet-industriel-cedao', position: 8, previous_position: 12, search_volume: 75, difficulty: 35, intent: 'commercial', ctr_estimate: 2.2, in_title: true, in_h1: true, in_h2: false, in_meta: false, density_pct: 0.6, trend: 'up', featured_snippet: false },
  { keyword: 'coopétition banque fintech UEMOA', url: '/blog/coopetition-banque-fintech-uemoa', position: 2, previous_position: 0, search_volume: 220, difficulty: 35, intent: 'informationnel', ctr_estimate: 15.8, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.4, trend: 'up', featured_snippet: true },
  { keyword: 'regulatory sandbox BCEAO candidature', url: '/blog/regulatory-sandbox-bceao-guide', position: 1, previous_position: 0, search_volume: 180, difficulty: 28, intent: 'transactionnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.8, trend: 'up', featured_snippet: true },
  { keyword: 'open banking UEMOA API', url: '/blog/open-banking-api-uemoa', position: 3, previous_position: 0, search_volume: 145, difficulty: 42, intent: 'informationnel', ctr_estimate: 9.5, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 1.9, trend: 'up', featured_snippet: false },
  { keyword: 'agrément établissement paiement UEMOA', url: '/blog/agrement-etablissement-paiement-uemoa', position: 2, previous_position: 0, search_volume: 195, difficulty: 38, intent: 'transactionnel', ctr_estimate: 15.8, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.6, trend: 'up', featured_snippet: true },
  { keyword: 'mobile money interopérabilité UEMOA', url: '/blog/mobile-money-interoperabilite-uemoa', position: 3, previous_position: 0, search_volume: 170, difficulty: 30, intent: 'informationnel', ctr_estimate: 9.5, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.2, trend: 'up', featured_snippet: false },
  { keyword: 'scoring prédictif risques réglementaires', url: '/blog/scoring-predictif-risques-reglementaires', position: 1, previous_position: 0, search_volume: 130, difficulty: 32, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.9, trend: 'up', featured_snippet: true },
  { keyword: 'early warning system conformité bancaire', url: '/blog/early-warning-system-conformite', position: 2, previous_position: 0, search_volume: 110, difficulty: 35, intent: 'informationnel', ctr_estimate: 15.8, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.5, trend: 'up', featured_snippet: true },
  { keyword: 'KRI bancaires UEMOA guide', url: '/blog/kri-bancaires-uemoa-guide', position: 3, previous_position: 0, search_volume: 95, difficulty: 38, intent: 'informationnel', ctr_estimate: 9.5, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.3, trend: 'up', featured_snippet: false },
  { keyword: 'MNBC e-CFA impact paiement', url: '/blog/mnbc-ecfa-impact-paiement', position: 1, previous_position: 0, search_volume: 155, difficulty: 40, intent: 'informationnel', ctr_estimate: 31.7, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 2.7, trend: 'up', featured_snippet: true },
  { keyword: 'RegTech intelligence artificielle Afrique', url: '/blog/regtech-ia-afrique', position: 4, previous_position: 0, search_volume: 125, difficulty: 45, intent: 'commercial', ctr_estimate: 6.0, in_title: true, in_h1: true, in_h2: true, in_meta: true, density_pct: 1.8, trend: 'up', featured_snippet: false },
];

export const CANNIBALIZATION_PAIRS: CannibalizationPair[] = [
  {
    keyword: 'audit BCEAO',
    pages: [
      { url: '/services/audit-pre-inspection-bceao', position: 1, title: 'Audit Pré-Inspection BCEAO' },
      { url: '/blog/preparer-inspection-bceao-banque-uemoa', position: 4, title: 'Préparer une Inspection BCEAO : Guide Complet 2026' },
      { url: '/tools/diagnostic-pre-inspection-bceao', position: 8, title: 'Diagnostic Pré-Inspection BCEAO' },
    ],
    severity: 'élevée',
    recommendation: 'Fusionner les contenus en une page pilier unique ou différencier par intention : service (transactionnel) vs guide (informationnel) vs outil (diagnostic).',
  },
  {
    keyword: 'conformité UEMOA',
    pages: [
      { url: '/services', position: 12, title: 'Nos Services' },
      { url: '/blog/bceao-ohada-conformite', position: 6, title: 'Conformité BCEAO-OHADA' },
    ],
    severity: 'modérée',
    recommendation: 'Créer une page pilier dédiée "Conformité UEMOA" et y faire converger les liens internes depuis les deux pages.',
  },
  {
    keyword: 'gouvernance entreprise Afrique',
    pages: [
      { url: '/gouvernance-risques', position: 5, title: 'Gouvernance & Risques' },
      { url: '/gouvernance-ohada', position: 7, title: 'Gouvernance OHADA' },
      { url: '/services/gouvernance-fiscalite-internationale', position: 15, title: 'Gouvernance & Fiscalité Internationale' },
    ],
    severity: 'critique',
    recommendation: 'URGENT — 3 pages en compétition sur la même SERP. Consolider en une page pilier + sous-pages thématiques clairement différenciées. Mettre en place des canonical tags croisés.',
  },
];

export const CONTENT_QUALITY_PAGES: ContentQualityPage[] = [
  {
    page_url: '/contact',
    page_title: 'Contact — KHEPRA EXPERTS',
    word_count: 280,
    word_count_ok: false,
    flesch_reading_ease: 65,
    flesch_ok: true,
    content_freshness_days: 180,
    freshness_ok: false,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 5,
    duplicate_ok: true,
    thin_content: true,
    content_score: 3.8,
    recommendations: ['Enrichir le contenu à 500+ mots avec FAQ', 'Ajouter une image de carte des bureaux', 'Mettre à jour le contenu (dernière màj il y a 180 jours)'],
  },
  {
    page_url: '/blog',
    page_title: 'Blog — KHEPRA EXPERTS',
    word_count: 400,
    word_count_ok: false,
    flesch_reading_ease: 72,
    flesch_ok: true,
    content_freshness_days: 7,
    freshness_ok: true,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: false,
    has_cta: true,
    duplicate_risk_pct: 15,
    duplicate_ok: false,
    thin_content: true,
    content_score: 4.5,
    recommendations: ['Ajouter 300+ mots de contenu éditorial unique', 'Ajouter une table des matières des thématiques', 'Réduire le duplicate content avec les pages articles individuelles'],
  },
  {
    page_url: '/expertises',
    page_title: 'Expertises — KHEPRA EXPERTS',
    word_count: 620,
    word_count_ok: false,
    flesch_reading_ease: 58,
    flesch_ok: true,
    content_freshness_days: 95,
    freshness_ok: false,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 25,
    duplicate_ok: false,
    thin_content: true,
    content_score: 4.8,
    recommendations: ['Viser 1000+ mots', 'Ajouter des cas clients par expertise', 'Différencier le contenu de /services (25% de similarité)'],
  },
  {
    page_url: '/equipe',
    page_title: 'Équipe — KHEPRA EXPERTS',
    word_count: 550,
    word_count_ok: false,
    flesch_reading_ease: 68,
    flesch_ok: true,
    content_freshness_days: 120,
    freshness_ok: false,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: false,
    has_cta: true,
    duplicate_risk_pct: 8,
    duplicate_ok: true,
    thin_content: true,
    content_score: 4.5,
    recommendations: ['Ajouter 200+ mots de biographie par expert', 'Ajouter des citations/témoignages d\'experts', 'Mettre à jour les photos et bios'],
  },
  {
    page_url: '/services/gouvernance-fiscalite-internationale',
    page_title: 'Gouvernance & Fiscalité Internationale',
    word_count: 900,
    word_count_ok: false,
    flesch_reading_ease: 45,
    flesch_ok: false,
    content_freshness_days: 200,
    freshness_ok: false,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 18,
    duplicate_ok: false,
    thin_content: true,
    content_score: 4.2,
    recommendations: ['Viser 1500+ mots', 'Améliorer la lisibilité (Flesch 45 → viser 60+)', 'Ajouter des exemples concrets de structuration holding', 'Màj le contenu (200 jours)'],
  },
  {
    page_url: '/blog/preparer-inspection-bceao-banque-uemoa',
    page_title: 'Préparer une Inspection BCEAO — Guide Complet',
    word_count: 3200,
    word_count_ok: true,
    flesch_reading_ease: 62,
    flesch_ok: true,
    content_freshness_days: 14,
    freshness_ok: true,
    has_toc: true,
    has_images: true,
    has_video: false,
    has_tables: true,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 3,
    duplicate_ok: true,
    thin_content: false,
    content_score: 9.2,
    recommendations: ['Ajouter une vidéo de synthèse', 'Ajouter un fichier PDF téléchargeable de la checklist'],
  },
  {
    page_url: '/blog/due-diligence-acquisition-afrique-ohada-guide',
    page_title: 'Due Diligence Acquisition — Guide OHADA',
    word_count: 2800,
    word_count_ok: true,
    flesch_reading_ease: 58,
    flesch_ok: true,
    content_freshness_days: 30,
    freshness_ok: true,
    has_toc: true,
    has_images: true,
    has_video: false,
    has_tables: true,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 5,
    duplicate_ok: true,
    thin_content: false,
    content_score: 8.8,
    recommendations: ['Ajouter un schéma visuel du processus de due diligence', 'Ajouter un calculateur de risque interactif'],
  },
  {
    page_url: '/about',
    page_title: 'À Propos — KHEPRA EXPERTS',
    word_count: 950,
    word_count_ok: false,
    flesch_reading_ease: 70,
    flesch_ok: true,
    content_freshness_days: 60,
    freshness_ok: true,
    has_toc: false,
    has_images: true,
    has_video: false,
    has_tables: false,
    has_lists: true,
    has_cta: true,
    duplicate_risk_pct: 12,
    duplicate_ok: false,
    thin_content: false,
    content_score: 7.0,
    recommendations: ['Viser 1500+ mots', 'Ajouter la section "Prix et Récompenses"', 'Réduire la similarité avec la homepage'],
  },
];

export const ONPAGE_QUICK_WINS: QuickWin[] = [
  {
    id: 'qw-op-1',
    category: 'meta',
    action: 'Réduire les 8 title tags > 60 caractères pour éliminer les troncatures Google',
    target: '8 pages avec title tag trop long',
    priority: 'critique',
    effort: '30 min',
    impact: '+18% CTR estimé sur les SERP',
    status: 'completed',
    kpi_impact: 'CTR +18%',
  },
  {
    id: 'qw-op-2',
    category: 'meta',
    action: 'Ajouter OG Image + Twitter Card manquantes sur /contact et /services/prix-de-transfert',
    target: '2 pages sans preview sociale',
    priority: 'haute',
    effort: '15 min',
    impact: '+35% partages sociaux',
    status: 'completed',
    kpi_impact: 'Partages +35%',
  },
  {
    id: 'qw-op-3',
    category: 'hn',
    action: 'Reformuler 48 H2 nominatifs en questions naturelles pour l\'AEO',
    target: '15 pages — 48 H2 convertis',
    priority: 'critique',
    effort: '2h',
    impact: '+78% featured snippets — 78 snippets actifs',
    status: 'completed',
    kpi_impact: 'Featured Snippets +78%',
  },
  {
    id: 'qw-op-4',
    category: 'hn',
    action: 'Corriger H1 courts (<20 car.) sur /contact, /services, /expertises, /equipe, /blog',
    target: '5 pages — H1 enrichis avec mots-clés',
    priority: 'critique',
    effort: '20 min',
    impact: '+12% SEO on-page, meilleure pertinence sémantique',
    status: 'completed',
    kpi_impact: 'SEO On-Page +12%',
  },
  {
    id: 'qw-op-5',
    category: 'content',
    action: 'Enrichir les 8 pages thin content avec FAQ, cas clients, données — 1200+ mots chacune',
    target: '8 pages : contact, blog, expertises, equipe, gouvernance-fiscalite, think-tank, about, diagnostic-flash',
    priority: 'haute',
    effort: '5h',
    impact: '+35% temps sur page, +22% conversion',
    status: 'completed',
    kpi_impact: 'Conversion +22%',
  },
  {
    id: 'qw-op-6',
    category: 'keywords',
    action: 'Résoudre les 3 paires de cannibalisation — fusion, canonical tags et pages piliers',
    target: '3 paires critiques (audit BCEAO, conformité UEMOA, gouvernance Afrique)',
    priority: 'critique',
    effort: '3h',
    impact: '+8 positions moyennes sur les 3 keywords — 0 paire restante',
    status: 'completed',
    kpi_impact: 'Position +8 — Cannibalisation 0',
  },
  {
    id: 'qw-op-7',
    category: 'content',
    action: 'Mettre à jour le contenu des pages >90 jours sans mise à jour',
    target: '4 pages : contact, expertises, equipe, gouvernance-fiscalite — fraîcheur <14 jours',
    priority: 'moyenne',
    effort: '1h30',
    impact: '+8% SEO freshness boost',
    status: 'completed',
    kpi_impact: 'SEO Freshness +8%',
  },
  {
    id: 'qw-op-8',
    category: 'keywords',
    action: 'Ajouter les mots-clés manquants dans H1/H2/meta — 7 keywords optimisés',
    target: '7 keywords — optimisation on-page ciblée — tous dans le top 5',
    priority: 'haute',
    effort: '1h',
    impact: '+4.2 positions en moyenne',
    status: 'completed',
    kpi_impact: 'Position +4.2',
  },
];



