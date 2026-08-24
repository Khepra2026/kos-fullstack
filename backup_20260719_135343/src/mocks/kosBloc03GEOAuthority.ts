// KOS Bloc 03 — GEO Authority Engine™
// Master Plan Big Four 2026-2028 — Phase 1 Fondations

export interface GEOFAQ {
  id: string;
  question: string;
  reponse: string;
  theme: string;
  source: string;
  statut: 'Publié' | 'En révision';
  citations_ia: number;
  score_geo: number;
  derniere_maj: string;
}

export interface GEOAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  faq_generees: number;
  score_optimisation: number;
  icon: string;
  plateformes: string[];
}

export interface GEOData {
  faqs: GEOFAQ[];
  agents: GEOAgent[];
  globalMetrics: {
    total_faq: number;
    faq_bceao: number;
    faq_uemoa: number;
    faq_ohada: number;
    faq_esg: number;
    faq_microfinance: number;
    faq_fintech: number;
    presence_chatgpt: number;
    presence_gemini: number;
    presence_claude: number;
    presence_perplexity: number;
    citations_ia_mois: number;
    score_geo_global: number;
    certification: string;
  };
}

export const GEO_FAQS: GEOFAQ[] = [
  { id: 'faq-001', question: 'Quelles sont les conditions d\'agrément pour un SFD dans l\'UEMOA ?', reponse: 'L\'agrément des SFD dans l\'UEMOA est régi par l\'Instruction BCEAO N°008-05-2015. Les conditions principales incluent : capital minimum variable selon la catégorie, étude de faisabilité, business plan 3 ans, liste des dirigeants avec casier judiciaire, manuel de procédures LCB-FT, et accord préalable du Ministère des Finances.', theme: 'BCEAO', source: 'Instruction BCEAO N°008-05-2015', statut: 'Publié', citations_ia: 2847, score_geo: 94, derniere_maj: '2026-06-18' },
  { id: 'faq-002', question: 'Comment mettre en place un dispositif de contrôle interne conforme à la circulaire COBAC R-2017/01 ?', reponse: 'La Circulaire COBAC R-2017/01 exige : un comité d\'audit indépendant, une fonction conformité dédiée, un dispositif de contrôle permanent et périodique, une cartographie des risques actualisée annuellement, et un reporting trimestriel au Conseil d\'Administration.', theme: 'COBAC', source: 'Circulaire COBAC R-2017/01', statut: 'Publié', citations_ia: 1523, score_geo: 91, derniere_maj: '2026-06-15' },
  { id: 'faq-003', question: 'Quelles sont les obligations ESG pour les banques africaines en 2026 ?', reponse: 'Les banques africaines sont soumises à un cadre réglementaire ESG croissant : normes ISSB (IFRS S1/S2) pour le reporting, exigences BCEAO sur le risque climatique (Pilier 2), standards GRI pour la transparence, et recommandations TCFD. La BCEAO a publié des lignes directrices sur les stress tests climatiques en 2025.', theme: 'ESG', source: 'ISSB IFRS S1/S2, BCEAO, GRI, TCFD', statut: 'Publié', citations_ia: 2105, score_geo: 96, derniere_maj: '2026-06-16' },
  { id: 'faq-004', question: 'Quel est le cadre juridique des fintechs dans l\'UEMOA ?', reponse: 'Le cadre fintech UEMOA est défini par l\'Instruction BCEAO N°008-05-2015 relative aux conditions et modalités d\'exercice des activités des émetteurs de monnaie électronique et l\'Instruction sur les établissements de paiement. Il prévoit : une licence d\'établissement de paiement, un agrément pour les émetteurs de monnaie électronique, des exigences KYC digitales, et un bac à sable réglementaire (sandbox) opérationnel depuis 2024.', theme: 'Fintech', source: 'BCEAO, UEMOA', statut: 'Publié', citations_ia: 1892, score_geo: 92, derniere_maj: '2026-06-27' },
  { id: 'faq-005', question: 'Comment préparer un dossier de due diligence conforme aux standards OCDE ?', reponse: 'Un dossier de due diligence conforme OCDE doit inclure : analyse financière 5 ans, cartographie des risques (opérationnels, réglementaires, ESG, réputationnels), vérification LCB-FT, audit compliance, due diligence fiscale (prix de transfert), et évaluation des systèmes d\'information.', theme: 'OCDE', source: 'OCDE, GAFI, BCEAO', statut: 'Publié', citations_ia: 1634, score_geo: 89, derniere_maj: '2026-06-12' },
  { id: 'faq-006', question: 'Qu\'est-ce que l\'Acte Uniforme OHADA sur les sociétés commerciales ?', reponse: 'L\'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE, révisé en 2014, harmonise le droit des sociétés dans les 17 États membres. Il définit les formes sociales (SA, SARL, SAS, SNC, SCS), la gouvernance, les droits des actionnaires, et les procédures de fusion/acquisition.', theme: 'OHADA', source: 'Acte Uniforme OHADA 2014', statut: 'Publié', citations_ia: 978, score_geo: 87, derniere_maj: '2026-06-10' },
];

export const GEO_AGENTS: GEOAgent[] = [
  {
    id: 'agent-geo-01',
    nom: 'GEO FAQ Generator™',
    mission: 'Génération automatique de FAQ structurées optimisées pour l\'extraction par les IA génératives (ChatGPT, Gemini, Claude, Perplexity). Format question/réponse, Schema.org FAQPage, mots-clés longue traîne.',
    statut: 'Actif',
    faq_generees: 50000,
    score_optimisation: 97,
    icon: 'ri-question-answer-line',
    plateformes: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity'],
  },
  {
    id: 'agent-geo-02',
    nom: 'AEO Answer Optimizer™',
    mission: 'Optimisation des réponses pour les Answer Engines : structure concise, autorité EEAT, citations de sources officielles, formatage structuré (listes, tableaux, définitions).',
    statut: 'Actif',
    faq_generees: 45000,
    score_optimisation: 94,
    icon: 'ri-radar-line',
    plateformes: ['ChatGPT', 'Google SGE', 'Claude', 'Perplexity'],
  },
  {
    id: 'agent-geo-03',
    nom: 'Schema.org Engine™',
    mission: 'Balisage automatique Schema.org pour tous les contenus : FAQPage, Article, HowTo, Organization, WebPage. Optimisation pour les rich snippets et les featured snippets.',
    statut: 'Actif',
    faq_generees: 50000,
    score_optimisation: 95,
    icon: 'ri-code-s-slash-line',
    plateformes: ['Google', 'Bing', 'ChatGPT', 'Perplexity'],
  },
];

export const GEO_GLOBAL_METRICS = {
  total_faq: 75000,
  faq_bceao: 15000,
  faq_uemoa: 12000,
  faq_ohada: 18000,
  faq_esg: 12000,
  faq_microfinance: 9000,
  faq_fintech: 9000,
  presence_chatgpt: 95,
  presence_gemini: 93,
  presence_claude: 90,
  presence_perplexity: 88,
  citations_ia_mois: 18000,
  score_geo_global: 96,
  certification: 'AAAA — Big Four Supreme 100% — GEO Authority Enterprise — 75K FAQs DÉPLOYÉES — LEADER GEO AFRIQUE FRANCOPHONE',
};



