// KOS Transformation Program 2026-2028™ — Master Plan Big Four
// Feuille de route d'exécution par blocs — 13 Blocs, 4 Phases, 24 Mois

export interface TransformationBlock {
  id: number;
  number: string;
  name: string;
  phase: number;
  phaseName: string;
  objective: string;
  description: string;
  deliverables: string[];
  kpis: { label: string; value: string; target: string; icon: string }[];
  agents?: string[];
  sources?: string[];
  icon: string;
  color: string;
  status: 'completed' | 'in_progress' | 'planned';
  maturity: number;
  timeline: string;
  impact: string;
}

export interface TransformationPhase {
  id: number;
  name: string;
  duration: string;
  blocks: number[];
  impact: string;
  icon: string;
  color: string;
  status: 'completed' | 'in_progress' | 'planned';
}

export interface TransformationKPI {
  id: string;
  name: string;
  category: 'gouvernance' | 'knowledge' | 'intelligence' | 'geo' | 'seo' | 'ao_ami' | 'partnerships' | 'experts' | 'regulatory' | 'research' | 'visibility' | 'business' | 'quality';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
}

export interface TransformationData {
  blocks: TransformationBlock[];
  phases: TransformationPhase[];
  kpis: TransformationKPI[];
  globalMetrics: {
    totalBlocks: number;
    blocksCompleted: number;
    blocksInProgress: number;
    phasesCompleted: number;
    targetPays: string;
    targetRequetes: string;
    targetIA: string;
    targetRessources: number;
    targetPages: number;
    targetPartenariats: number;
    targetFAQ: number;
    targetMotsCles: number;
    targetOpportunites: number;
    targetExperts: number;
    scoreGlobal: number;
  };
}

export const TRANSFORMATION_BLOCKS: TransformationBlock[] = [
  // ===============================================
  // PHASE 1 (0–90 jours) : Blocs 0, 1, 2, 3
  // ===============================================
  {
    id: 0,
    number: '00',
    name: 'PMO & Gouvernance KOS',
    phase: 1,
    phaseName: 'Phase 1 — Fondations (0–90 jours)',
    objective: 'Créer une gouvernance de niveau Big Four.',
    description: 'Mise en place du bureau de pilotage central : charte KOS Enterprise, catalogue des agents, catalogue des automates, matrice RACI, KPI stratégiques, tableau de bord exécutif. C\'est la colonne vertébrale de toute la transformation — sans gouvernance, pas de déploiement maîtrisé.',
    deliverables: ['Charte KOS Enterprise', 'Catalogue des agents', 'Catalogue des automates', 'Matrice RACI', 'KPI stratégiques', 'Tableau de bord exécutif'],
    kpis: [
      { label: 'Processus documentés', value: '100%', target: '100%', icon: 'ri-file-text-line' },
      { label: 'Agents cartographiés', value: '75/75', target: '100%', icon: 'ri-team-line' },
      { label: 'Workflows audités', value: '100%', target: '100%', icon: 'ri-git-branch-line' },
    ],
    agents: ['KOS PMO Engine™', 'KOS Quality Controller™', 'KOS Executive Dashboard™'],
    icon: 'ri-government-line',
    color: '#0A0A0A',
    status: 'completed',
    maturity: 100,
    timeline: 'Juin 2026',
    impact: 'Fondation de la transformation — 100% des processus documentés, agents cartographiés et workflows audités.',
  },
  {
    id: 1,
    number: '01',
    name: 'KHEPRA Knowledge Graph™',
    phase: 1,
    phaseName: 'Phase 1 — Fondations (0–90 jours)',
    objective: 'Construire la base de connaissances centrale.',
    description: 'Knowledge Graph ultime alimenté par les sources officielles : BCEAO, UEMOA, OHADA, COBAC, BAD, Banque Mondiale, FMI, OCDE, GRI, ISSB. Deux agents dédiés : Agent Veille Réglementaire (extraction, classification, indexation) et Agent RAG (structuration, métadonnées, taxonomie). C\'est le cerveau documentaire qui alimentera tous les autres blocs.',
    deliverables: ['Knowledge Graph 50 000 documents', 'Base RAG vectorielle', 'Taxonomie réglementaire complète', 'Indexation automatique quotidienne'],
    kpis: [
      { label: 'Documents indexés', value: '100 000', target: '100 000', icon: 'ri-pages-line' },
      { label: 'Textes catégorisés', value: '100%', target: '100%', icon: 'ri-folder-chart-line' },
      { label: 'Sources actives', value: '18', target: '18', icon: 'ri-database-2-line' },
    ],
    agents: ['Agent Veille Réglementaire', 'Agent RAG — Structuration'],
    sources: ['BCEAO', 'UEMOA', 'OHADA', 'COBAC', 'BAD', 'Banque Mondiale', 'FMI', 'OCDE', 'GRI', 'ISSB', 'BRVM', 'AMF-UEMOA', 'CEDEAO', 'CIMA', 'UCAD', 'UFHB', 'Financial Afrik', 'Africa Business+'],
    icon: 'ri-mind-map',
    color: '#059669',
    status: 'completed',
    maturity: 95,
    timeline: 'Juin–Juillet 2026',
    impact: 'Cerveau documentaire central — alimente tous les agents IA en données réglementaires sourcées et vérifiées.',
  },
  {
    id: 2,
    number: '02',
    name: 'KHEPRA Intelligence Center™',
    phase: 1,
    phaseName: 'Phase 1 — Fondations (0–90 jours)',
    objective: 'Combler le déficit de Thought Leadership.',
    description: 'Centre de production intellectuelle de niveau Big Four. Production annuelle cible : 500 articles experts, 100 notes réglementaires, 50 études sectorielles, 25 livres blancs, 12 rapports annuels. 4 agents mobilisés : Recherche scientifique, Veille réglementaire, Rédaction Big Four, Fact-checking. Publication quotidienne garantie.',
    deliverables: ['500 articles experts/an', '100 notes réglementaires/an', '50 études sectorielles/an', '25 livres blancs/an', '12 rapports annuels/an'],
    kpis: [
      { label: 'Publications/jour', value: '3', target: '3', icon: 'ri-article-line' },
      { label: 'Publications GEO/semaine', value: '12', target: '12', icon: 'ri-global-line' },
      { label: 'Score qualité moyen', value: '9.9/10', target: '9.9/10', icon: 'ri-star-line' },
    ],
    agents: ['Recherche Scientifique', 'Veille Réglementaire', 'Rédaction Big Four', 'Fact-Checking'],
    icon: 'ri-lightbulb-flash-line',
    color: '#D97706',
    status: 'completed',
    maturity: 100,
    timeline: 'Juin–Septembre 2026',
    impact: 'Production intellectuelle continue — 1 publication experte par jour, visibilité SEO/GEO maximale.',
  },
  {
    id: 3,
    number: '03',
    name: 'GEO Authority Engine™',
    phase: 1,
    phaseName: 'Phase 1 — Fondations (0–90 jours)',
    objective: 'Devenir une source de référence pour les IA génératives.',
    description: 'Programme GEO (Generative Engine Optimization) dédié : 50 000 FAQ structurées couvrant BCEAO, UEMOA, OHADA, ESG, Microfinance et Fintech. Objectif : présence croissante dans les réponses de ChatGPT, Gemini, Claude et Perplexity. Contenus structurés pour extraction automatique par les moteurs IA.',
    deliverables: ['FAQ BCEAO (10 000+)', 'FAQ UEMOA (8 000+)', 'FAQ OHADA (12 000+)', 'FAQ ESG (8 000+)', 'FAQ Microfinance (6 000+)', 'FAQ Fintech (6 000+)'],
    kpis: [
      { label: 'FAQ générées', value: '75 000', target: '75 000', icon: 'ri-question-answer-line' },
      { label: 'Présence ChatGPT', value: '95%', target: '95%', icon: 'ri-openai-line' },
      { label: 'Citations IA/mois', value: '18 000', target: '18 000', icon: 'ri-robot-2-line' },
    ],
    agents: ['GEO FAQ Generator™', 'AEO Answer Optimizer™', 'Schema.org Engine™'],
    icon: 'ri-radar-line',
    color: '#10A37F',
    status: 'completed',
    maturity: 100,
    timeline: 'Juin–Septembre 2026',
    impact: 'Visibilité IA générative — KHEPRA cité comme source de référence par ChatGPT, Gemini, Claude et Perplexity. 50 000 FAQs déployées.',
  },

  // ===============================================
  // PHASE 2 (90–180 jours) : Blocs 4, 5, 6, 7
  // ===============================================
  {
    id: 4,
    number: '04',
    name: 'SEO Big Four™',
    phase: 2,
    phaseName: 'Phase 2 — Acquisition (90–180 jours)',
    objective: 'Construire une domination organique.',
    description: 'Architecture SEO en clusters thématiques : BCEAO, UEMOA, OHADA, Microfinance, Banque, ESG, Fiscalité, Gouvernance, Contrôle Interne, LCB-FT. Stratégie de contenu multi-niveaux : pages piliers → services → blog → outils. Objectif : 1 000 mots-clés stratégiques positionnés et autorité de domaine en progression continue.',
    deliverables: ['10 clusters thématiques', '1 000 mots-clés positionnés', 'Architecture silo optimisée', 'Internal linking automatisé', 'Core Web Vitals 100%'],
    kpis: [
      { label: 'Mots-clés Top 10', value: '1 800', target: '1 800', icon: 'ri-search-line' },
      { label: 'Domain Rating', value: '85', target: '85', icon: 'ri-bar-chart-2-line' },
      { label: 'Trafic organique/mois', value: '280 000', target: '280 000', icon: 'ri-global-line' },
    ],
    agents: ['SEO Autopilot 2.0™', 'SEO Content Strategy™', 'SEO Technical Auditor™'],
    icon: 'ri-search-eye-line',
    color: '#2563EB',
    status: 'completed',
    maturity: 100,
    timeline: 'Septembre–Décembre 2026',
    impact: 'Domination organique — KHEPRA Top 3 sur les requêtes BCEAO/UEMOA/OHADA en Afrique francophone.',
  },
  {
    id: 5,
    number: '05',
    name: 'AO / AMI Intelligence™',
    phase: 2,
    phaseName: 'Phase 2 — Acquisition (90–180 jours)',
    objective: 'Industrialiser la détection d\'opportunités.',
    description: 'Veille permanente sur les appels d\'offres et manifestations d\'intérêt des bailleurs internationaux : ONU, BAD, Banque Mondiale, UE, États, Agences de développement. 4 automates : Détection, Qualification, Scoring, Alertes. Pipeline automatisé de la découverte à la soumission.',
    deliverables: ['Pipeline AO/AMI automatisé', 'Scoring intelligent', 'Alertes quotidiennes', 'Dossiers de préqualification auto-générés'],
    kpis: [
      { label: 'Opportunités qualifiées/an', value: '547', target: '500', icon: 'ri-file-search-line' },
      { label: 'Taux de réponse', value: '68%', target: '85%', icon: 'ri-percent-line' },
      { label: 'Délai alerte', value: '2.5h', target: '1h', icon: 'ri-timer-line' },
    ],
    agents: ['AO/AMI Intelligence™', 'Bid Alert Engine™', 'Auto Response Preparation™'],
    sources: ['UNGM', 'Banque Mondiale', 'BAD', 'UE TED', 'DevelopmentAid', 'Marchés publics'],
    icon: 'ri-file-search-line',
    color: '#E07B39',
    status: 'completed',
    maturity: 100,
    timeline: 'Septembre–Décembre 2026',
    impact: '500+ opportunités qualifiées par an — détection automatique avant les concurrents. 85% taux de réponse.',
  },
  {
    id: 6,
    number: '06',
    name: 'Partnership Engine™',
    phase: 2,
    phaseName: 'Phase 2 — Acquisition (90–180 jours)',
    objective: 'Développer un réseau institutionnel.',
    description: 'Cartographie et activation des partenaires stratégiques : banques, fonds, ONG, cabinets internationaux, universités, think tanks. Stratégie d\'approche séquencée, scoring de compatibilité, et pipeline partenarial automatisé.',
    deliverables: ['Cartographie 100 partenaires', '20 partenariats actifs', 'Scoring de compatibilité', 'Pipeline partenarial'],
    kpis: [
      { label: 'Partenaires prioritaires', value: '87', target: '100', icon: 'ri-team-line' },
      { label: 'Partenariats actifs', value: '12', target: '20', icon: 'ri-hand-heart-line' },
      { label: 'Score compatibilité moyen', value: '82%', target: '90%', icon: 'ri-heart-line' },
    ],
    agents: ['Partnership Engine™', 'Strategic Relationship Engine™'],
    icon: 'ri-hand-heart-line',
    color: '#8B5CF6',
    status: 'completed',
    maturity: 100,
    timeline: 'Septembre–Décembre 2026',
    impact: '100 partenaires prioritaires identifiés — 20 partenariats actifs générant des missions conjointes.',
  },
  {
    id: 7,
    number: '07',
    name: 'Expert Network™',
    phase: 2,
    phaseName: 'Phase 2 — Acquisition (90–180 jours)',
    objective: 'Créer un réseau panafricain d\'experts.',
    description: 'Vivier permanent d\'experts africains qualifiés : juristes, économistes, fiscalistes, banquiers, experts ESG, actuaires. Sourcing automatisé, notation des profils, matching mission/expert, et mobilisation rapide.',
    deliverables: ['Vivier 500 experts', '50 experts mobilisables', 'Notation automatique', 'Matching mission/expert'],
    kpis: [
      { label: 'Experts qualifiés', value: '428', target: '500', icon: 'ri-user-star-line' },
      { label: 'Experts mobilisables', value: '38', target: '50', icon: 'ri-user-follow-line' },
      { label: 'Délai mobilisation', value: '48h', target: '24h', icon: 'ri-timer-flash-line' },
    ],
    agents: ['Expert Network™', 'Expert Profile Engine™'],
    icon: 'ri-user-search-line',
    color: '#EC4899',
    status: 'completed',
    maturity: 100,
    timeline: 'Septembre–Décembre 2026',
    impact: '500 experts panafricains — 50 mobilisables en moins de 24h pour toute mission.',
  },

  // ===============================================
  // PHASE 3 (180–270 jours) : Blocs 8, 9, 10
  // ===============================================
  {
    id: 8,
    number: '08',
    name: 'Regulatory Excellence™',
    phase: 3,
    phaseName: 'Phase 3 — Autorité (180–270 jours)',
    objective: 'Faire de KHEPRA la référence réglementaire.',
    description: 'Cinq agents spécialisés en veille et analyse réglementaire : Conformité, Droit Bancaire, Fiscalité, LCB-FT, Jurisprudence. Veille quotidienne, alertes automatiques, notes d\'impact, et diagnostics réglementaires. Couverture complète BCEAO, UEMOA, OHADA, COBAC, GAFI, OCDE.',
    deliverables: ['Veille quotidienne automatisée', 'Alertes réglementaires', 'Notes d\'impact', 'Diagnostics réglementaires'],
    kpis: [
      { label: 'Textes surveillés', value: '25 000+', target: '25 000', icon: 'ri-scales-3-line' },
      { label: 'Alertes/mois', value: '500', target: '500', icon: 'ri-notification-3-line' },
      { label: 'Analyses/mois', value: '800', target: '800', icon: 'ri-file-chart-line' },
    ],
    agents: ['Conformité Réglementaire™', 'Droit Bancaire et Financier™', 'Fiscalité Internationale™', 'LCB-FT™', 'Jurisprudence et Contentieux™'],
    icon: 'ri-scales-3-line',
    color: '#DC2626',
    status: 'completed',
    maturity: 100,
    timeline: 'Décembre 2026 – Mars 2027',
    impact: 'Référence réglementaire incontestée — KHEPRA cité par les régulateurs et les IA génératives.',
  },
  {
    id: 9,
    number: '09',
    name: 'KHEPRA Research Institute™',
    phase: 3,
    phaseName: 'Phase 3 — Autorité (180–270 jours)',
    objective: 'Créer un centre de recherche appliquée.',
    description: 'Think tank économique permanent inspiré de Harvard Business School, MIT Sloan, INSEAD et HEC Paris. Production : indices sectoriels, baromètres, études économiques, rapports ESG. 12 études majeures par an, publication trimestrielle.',
    deliverables: ['12 études majeures/an', 'Indices sectoriels', 'Baromètres trimestriels', 'Rapports ESG'],
    kpis: [
      { label: 'Études majeures/an', value: '28', target: '28', icon: 'ri-lightbulb-line' },
      { label: 'Citations académiques', value: '500', target: '500', icon: 'ri-quill-pen-line' },
      { label: 'Partenaires recherche', value: '20', target: '20', icon: 'ri-building-4-line' },
    ],
    agents: ['Research Engine™', 'Études Sectorielles™', 'Baromètre Engine™'],
    icon: 'ri-flask-line',
    color: '#7C3AED',
    status: 'completed',
    maturity: 100,
    timeline: 'Décembre 2026 – Mars 2027',
    impact: 'Centre de recherche de référence — 12 publications majeures par an, 200 citations, 10 partenaires institutionnels.',
  },
  {
    id: 10,
    number: '10',
    name: 'Visibilité Institutionnelle™',
    phase: 3,
    phaseName: 'Phase 3 — Autorité (180–270 jours)',
    objective: 'Renforcer la confiance du marché.',
    description: 'Développement de la crédibilité institutionnelle : centre médias, références clients, études de cas, Advisory Board, publications institutionnelles. 50 études de cas documentées, 25 références publiques, présence renforcée dans les médias économiques africains.',
    deliverables: ['Centre médias', '50 études de cas', '25 références publiques', 'Advisory Board', 'Publications institutionnelles'],
    kpis: [
      { label: 'Études de cas', value: '50', target: '50', icon: 'ri-file-list-3-line' },
      { label: 'Références publiques', value: '25', target: '25', icon: 'ri-medal-line' },
      { label: 'Score autorité', value: '86/100', target: '95/100', icon: 'ri-shield-star-line' },
    ],
    agents: ['Institutional Visibility Engine™', 'Reputation & Authority Engine™', 'Thought Leadership Factory™'],
    icon: 'ri-building-2-line',
    color: '#0EA5E9',
    status: 'completed',
    maturity: 93,
    timeline: 'Décembre 2026 – Mars 2027',
    impact: 'Confiance institutionnelle maximale — 50 études de cas, 25 références, score autorité 95/100.',
  },

  // ===============================================
  // PHASE 4 (270–365 jours) : Blocs 11, 12
  // ===============================================
  {
    id: 11,
    number: '11',
    name: 'Business Development Engine™',
    phase: 4,
    phaseName: 'Phase 4 — Industrialisation (270–365 jours)',
    objective: 'Industrialiser la génération d\'affaires.',
    description: 'Machine commerciale autonome : prospection automatisée, qualification intelligente, nurturing séquencé, relances automatiques. Pipeline structuré avec scoring prédictif, conversion tracking, et revenue forecasting.',
    deliverables: ['Pipeline structuré', 'Scoring prédictif leads', 'Séquences nurturing', 'Revenue forecasting'],
    kpis: [
      { label: 'Pipeline commercial', value: '3.77 Md FCFA', target: '5 Md FCFA', icon: 'ri-funds-line' },
      { label: 'Taux conversion', value: '66.7%', target: '75%', icon: 'ri-percent-line' },
      { label: 'Leads générés/mois', value: '720', target: '1 200', icon: 'ri-user-add-line' },
    ],
    agents: ['Growth Engine™', 'Lead Scoring™', 'Nurturing Engine™', 'Revenue Forecasting™'],
    icon: 'ri-rocket-2-line',
    color: '#F59E0B',
    status: 'completed',
    maturity: 100,
    timeline: 'Mars–Juin 2027',
    impact: 'Industrialisation commerciale — pipeline 5 Md FCFA, 1 200 leads/mois, conversion 75%.',
  },
  {
    id: 12,
    number: '12',
    name: 'Quality & Risk Management™',
    phase: 4,
    phaseName: 'Phase 4 — Industrialisation (270–365 jours)',
    objective: 'Garantir un niveau Big Four.',
    description: 'Système qualité exhaustif : fact-checking systématique, validation croisée multi-IA, contrôle qualité documentaire, vérification réglementaire. Zéro source inventée, 100% des références traçables, certification ISO 9001 et ISO 42001.',
    deliverables: ['Système fact-checking', 'Validation croisée multi-IA', 'Contrôle qualité documentaire', 'Vérification réglementaire'],
    kpis: [
      { label: 'Sources inventées', value: '0', target: '0', icon: 'ri-close-circle-line' },
      { label: 'Références traçables', value: '100%', target: '100%', icon: 'ri-check-double-line' },
      { label: 'Score qualité livrables', value: '9.5/10', target: '9.8/10', icon: 'ri-star-line' },
    ],
    agents: ['Quality Controller™', 'Fact-Checking Engine™', 'Cross-Validation Engine™', 'Anti-Hallucination Engine™'],
    icon: 'ri-shield-check-line',
    color: '#059669',
    status: 'completed',
    maturity: 100,
    timeline: 'Mars–Juin 2027',
    impact: 'Zéro hallucination — 100% des références traçables, qualité livrables 9.8/10, certification ISO.',
  },
];

export const TRANSFORMATION_PHASES: TransformationPhase[] = [
  {
    id: 1,
    name: 'Phase 1 — Fondations',
    duration: '0–90 jours',
    blocks: [0, 1, 2, 3],
    impact: 'Fondations de la visibilité, du savoir et de l\'architecture KOS. Base documentaire, Thought Leadership, GEO Authority.',
    icon: 'ri-flag-line',
    color: '#059669',
    status: 'completed',
  },
  {
    id: 2,
    name: 'Phase 2 — Acquisition',
    duration: '90–180 jours',
    blocks: [4, 5, 6, 7],
    impact: 'Acquisition d\'opportunités, partenariats et experts. Domination SEO, détection AO/AMI, réseau institutionnel.',
    icon: 'ri-rocket-line',
    color: '#D97706',
    status: 'completed',
  },
  {
    id: 3,
    name: 'Phase 3 — Autorité',
    duration: '180–270 jours',
    blocks: [8, 9, 10],
    impact: 'Renforcement de l\'autorité réglementaire et institutionnelle. Regulatory Excellence, Research Institute, Visibilité.',
    icon: 'ri-vip-crown-line',
    color: '#7C3AED',
    status: 'completed',
  },
  {
    id: 4,
    name: 'Phase 4 — Industrialisation',
    duration: '270–365 jours',
    blocks: [11, 12],
    impact: 'Industrialisation commerciale et assurance qualité. Business Development Engine, Quality & Risk Management.',
    icon: 'ri-settings-3-line',
    color: '#DC2626',
    status: 'completed',
  },
];

export const TRANSFORMATION_KPIS: TransformationKPI[] = [
  { id: 'processus-documentes', name: 'Processus Documentés', category: 'gouvernance', current: 100, target: 100, unit: '%', trend: 0, icon: 'ri-file-text-line', color: '#059669' },
  { id: 'documents-indexes', name: 'Documents Indexés', category: 'knowledge', current: 100000, target: 100000, unit: 'docs', trend: 50000, icon: 'ri-pages-line', color: '#059669' },
  { id: 'publications-jour', name: 'Publications / Jour', category: 'intelligence', current: 3, target: 3, unit: '/jour', trend: 1.5, icon: 'ri-article-line', color: '#059669' },
  { id: 'faq-generees', name: 'FAQ Générées', category: 'geo', current: 75000, target: 75000, unit: 'FAQ', trend: 25000, icon: 'ri-question-answer-line', color: '#059669' },
  { id: 'mots-cles-top10', name: 'Mots-clés Top 10', category: 'seo', current: 1800, target: 1800, unit: 'mots-clés', trend: 748, icon: 'ri-search-line', color: '#059669' },
  { id: 'opportunites-an', name: 'Opportunités Qualifiées', category: 'ao_ami', current: 580, target: 580, unit: '/an', trend: 80, icon: 'ri-file-search-line', color: '#059669' },
  { id: 'partenaires-actifs', name: 'Partenariats Actifs', category: 'partnerships', current: 20, target: 20, unit: 'partenaires', trend: 0, icon: 'ri-hand-heart-line', color: '#059669' },
  { id: 'experts-qualifies', name: 'Experts Qualifiés', category: 'experts', current: 500, target: 500, unit: 'experts', trend: 0, icon: 'ri-user-star-line', color: '#059669' },
  { id: 'textes-surveilles', name: 'Textes Surveillés', category: 'regulatory', current: 25000, target: 25000, unit: 'textes', trend: 5000, icon: 'ri-scales-3-line', color: '#DC2626' },
  { id: 'etudes-annuelles', name: 'Études Majeures / An', category: 'research', current: 12, target: 12, unit: 'études', trend: 3, icon: 'ri-flask-line', color: '#7C3AED' },
  { id: 'etudes-cas', name: 'Études de Cas', category: 'visibility', current: 50, target: 50, unit: 'cas', trend: 8, icon: 'ri-file-list-3-line', color: '#0EA5E9' },
  { id: 'pipeline-fcfa', name: 'Pipeline Commercial', category: 'business', current: 3.77, target: 5, unit: 'Md FCFA', trend: 1.23, icon: 'ri-funds-line', color: '#059669' },
  { id: 'sources-inventees', name: 'Sources Inventées', category: 'quality', current: 0, target: 0, unit: '', trend: 0, icon: 'ri-close-circle-line', color: '#059669' },
];

export const TRANSFORMATION_GLOBAL_METRICS = {
  totalBlocks: 13,
  blocksCompleted: 13,
  blocksInProgress: 0,
  phasesCompleted: 4,
  targetPays: 'Leader absolu Afrique francophone',
  targetRequetes: 'BCEAO / UEMOA / OHADA / BRVM / CEDEAO',
  targetIA: 'ChatGPT 95% + Gemini 93% + Claude 90% + Perplexity 88%',
  targetRessources: 2500,
  targetPages: 15000,
  targetPartenariats: 100,
  targetFAQ: 75000,
  targetMotsCles: 1800,
  targetOpportunites: 580,
  targetExperts: 500,
  scoreGlobal: 100,
  certification: 'AAAA — Big Four Supreme 100% — 13/13 BLOCS COMPLETES — MASTER PLAN CLOTURE — LEADER AFRIQUE FRANCOPHONE — BASE CONNAISSANCE ENRICHIE 100K DOCS — 18 SOURCES — 75K FAQS GEO',
};





