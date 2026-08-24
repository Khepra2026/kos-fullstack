// KOS Regulatory, Legal & Compliance Excellence Program™ — Master Prompt Big Four
// Renforcement des capacités des agents et automates KOS en conformité réglementaire, droit des affaires, fiscalité, gouvernance, régulation financière et veille juridique

export interface RegulatoryLegalAgent {
  id: number;
  number: string;
  name: string;
  mission: string;
  description: string;
  referentiels: string[];
  tools: string[];
  deliverables: string[];
  kpis: { label: string; value: string; target: string; icon: string }[];
  icon: string;
  color: string;
  status: 'deployed' | 'in_progress' | 'planned';
  maturity: number;
}

export interface ComplianceMethodologyPhase {
  level: number;
  name: string;
  description: string;
  action: string;
  icon: string;
  color: string;
}

export interface AntiHallucinationRule {
  type: 'interdiction' | 'obligation';
  label: string;
  icon: string;
  color: string;
}

export interface ComplianceKPI {
  id: string;
  name: string;
  category: 'conformity' | 'veille' | 'juridique' | 'lcbfa';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
  subMetrics?: { label: string; value: number; target: number }[];
}

export interface RegulatoryLegalData {
  agents: RegulatoryLegalAgent[];
  methodologyPhases: ComplianceMethodologyPhase[];
  antiHallucinationRules: AntiHallucinationRule[];
  complianceKPIs: ComplianceKPI[];
  globalMetrics: {
    totalAgents: number;
    agentsDeployed: number;
    avgMaturity: number;
    textsMonitored: number;
    alertsGenerated: number;
    reformsDetected: number;
    analysesCompleted: number;
    risksIdentified: number;
    contractsReviewed: number;
    lcbftRisks: number;
    anomalyRate: number;
  };
  livrableStandards: { icon: string; label: string; color: string }[];
}

export const REGULATORY_LEGAL_AGENTS: RegulatoryLegalAgent[] = [
  {
    id: 1,
    number: '01',
    name: 'Conformité Réglementaire™',
    mission: 'Assurer la conformité des organisations aux exigences réglementaires, prudentielles, sectorielles et institutionnelles.',
    description: 'Agent dédié à l\'évaluation systématique de la conformité des établissements financiers, SFD et entreprises aux référentiels BCEAO, UEMOA, OHADA et normes sectorielles. Production de matrices de conformité exhaustives, gap analysis multi-référentiels, plans de remédiation priorisés et cartographies réglementaires dynamiques. Intégration Harvey AI pour l\'analyse juridique avancée.',
    referentiels: ['BCEAO — Instructions & Circulaires', 'UEMOA — Règlements & Directives', 'OHADA — Actes Uniformes', 'Autorités nationales — Réglementations sectorielles', 'Normes sectorielles — COSO, ISO 37301'],
    tools: ['Claude — Analyse réglementaire approfondie', 'ChatGPT — Synthèse et scoring', 'Harvey AI — Recherche juridique IA', 'Perplexity — Veille contextuelle'],
    deliverables: ['Matrices de conformité multi-référentiels', 'Gap analysis complet avec scoring', 'Plans de remédiation priorisés', 'Cartographies réglementaires dynamiques'],
    kpis: [
      { label: 'Référentiels couverts', value: '47', target: '80', icon: 'ri-book-open-line' },
      { label: 'Gap analyses/mois', value: '28', target: '50', icon: 'ri-contrast-2-line' },
      { label: 'Taux conformité moyen', value: '76%', target: '95%', icon: 'ri-check-double-line' },
      { label: 'Plans remédiation actifs', value: '34', target: '60', icon: 'ri-tools-line' },
    ],
    icon: 'ri-scales-3-line',
    color: '#E07B39',
    status: 'deployed',
    maturity: 88,
  },
  {
    id: 2,
    number: '02',
    name: 'Droit Bancaire et Financier™',
    mission: 'Surveiller et interpréter la réglementation bancaire, des SFD, fintech, moyens de paiement, marchés financiers et gouvernance prudentielle.',
    description: 'Expertise pointue du droit bancaire UMOA et CEMAC. Suivi des instructions BCEAO, décisions de la Commission Bancaire, normes Bâle III/IV. Analyse d\'impact des nouvelles réglementations sur les business models bancaires, SFD et fintech. Notes juridiques exécutives pour dirigeants et conseils d\'administration.',
    referentiels: ['BCEAO — Loi Bancaire & Instructions', 'Commission Bancaire UMOA — Décisions', 'Bâle III/IV — Standards prudentiels', 'COBAC — Règlements CEMAC', 'Directives sur les services de paiement'],
    tools: ['Claude — Analyse réglementaire longue', 'ChatGPT — Rédaction notes juridiques', 'Harvey AI — Recherche jurisprudentielle', 'Gemini — Veille textes officiels'],
    deliverables: ['Notes juridiques exécutives', 'Analyses d\'impact réglementaire', 'Diagnostics prudentiels complets', 'Briefings Conseil d\'Administration'],
    kpis: [
      { label: 'Textes bancaires suivis', value: '312', target: '500', icon: 'ri-file-text-line' },
      { label: 'Notes juridiques/mois', value: '42', target: '80', icon: 'ri-article-line' },
      { label: 'Analyses d\'impact/mois', value: '18', target: '35', icon: 'ri-line-chart-line' },
      { label: 'Délai analyse', value: '8.5h', target: '4h', icon: 'ri-timer-line' },
    ],
    icon: 'ri-bank-line',
    color: '#0EA5E9',
    status: 'deployed',
    maturity: 85,
  },
  {
    id: 3,
    number: '03',
    name: 'Fiscalité Internationale™',
    mission: 'Analyser la fiscalité transfrontalière, les conventions fiscales, les prix de transfert, la fiscalité des groupes et les normes BEPS.',
    description: 'Expertise fiscale internationale alignée sur les standards OCDE et Nations Unies. Analyse des conventions fiscales bilatérales, documentation prix de transfert conforme BEPS 2.0, structuration fiscale des groupes panafricains. Cartographie des risques fiscaux par juridiction et stratégies de conformité sur-mesure.',
    referentiels: ['OCDE — BEPS 2.0 & Pillar 1/2', 'Nations Unies — Modèle convention fiscale', 'UEMOA — Directives fiscales', 'CEMAC — Réglementation fiscale', 'Conventions fiscales bilatérales'],
    tools: ['Claude — Analyse fiscale complexe', 'ChatGPT — Modélisation fiscale', 'Harvey AI — Recherche fiscale IA'],
    deliverables: ['Analyses fiscales transfrontalières', 'Cartographies des risques fiscaux', 'Stratégies de conformité BEPS', 'Documentation prix de transfert'],
    kpis: [
      { label: 'Analyses fiscales/mois', value: '24', target: '45', icon: 'ri-file-chart-line' },
      { label: 'Risques fiscaux identifiés', value: '186', target: '350', icon: 'ri-error-warning-line' },
      { label: 'Documentations PT/mois', value: '12', target: '25', icon: 'ri-file-list-3-line' },
      { label: 'Juridictions couvertes', value: '22', target: '40', icon: 'ri-global-line' },
    ],
    icon: 'ri-money-dollar-circle-line',
    color: '#8B5CF6',
    status: 'deployed',
    maturity: 82,
  },
  {
    id: 4,
    number: '04',
    name: 'Gouvernance et Contrôle Interne™',
    mission: 'Évaluer la gouvernance, le contrôle interne, la gestion des risques, l\'éthique et la conformité institutionnelle.',
    description: 'Évaluation complète des dispositifs de gouvernance selon les standards COSO 2013, IIA et codes de gouvernance UEMOA/CEMAC. Cartographie des risques opérationnels, matrices de contrôle interne, évaluations de maturité des comités spécialisés (audit, risques, nominations). Recommandations alignées Circulaires BCEAO 01/2017 et 02/2017.',
    referentiels: ['COSO 2013 — Internal Control Framework', 'IIA — International Professional Practices', 'BCEAO — Circulaires 01/2017 & 02/2017', 'OHADA — Acte Uniforme Sociétés Commerciales', 'ISO 37000 — Gouvernance des organisations'],
    tools: ['Claude — Analyse gouvernance approfondie', 'ChatGPT — Scoring maturité', 'Harvey AI — Benchmark réglementaire'],
    deliverables: ['Cartographies des risques opérationnels', 'Matrices de contrôle interne', 'Évaluations de maturité gouvernance', 'Plans d\'amélioration continue'],
    kpis: [
      { label: 'Évaluations/mois', value: '16', target: '30', icon: 'ri-survey-line' },
      { label: 'Risques cartographiés', value: '1 247', target: '3 000', icon: 'ri-radar-line' },
      { label: 'Maturité moyenne clients', value: '62/100', target: '85/100', icon: 'ri-bar-chart-2-line' },
      { label: 'Recommandations émises', value: '834', target: '2 000', icon: 'ri-lightbulb-line' },
    ],
    icon: 'ri-shield-check-line',
    color: '#10B981',
    status: 'deployed',
    maturity: 90,
  },
  {
    id: 5,
    number: '05',
    name: 'Veille BCEAO/UEMOA/OHADA™',
    mission: 'Surveiller quotidiennement les instructions, circulaires, règlements, décisions, avis et jurisprudence.',
    description: 'Veille réglementaire automatisée 24/7 sur les sites officiels de la BCEAO, UEMOA, OHADA, Commission Bancaire et COBAC. Détection précoce des nouveaux textes, alertes en temps réel, synthèses exécutives et analyses d\'impact pour les clients. Base de données réglementaire enrichie en continu avec 15 000+ textes indexés.',
    sources: ['BCEAO — Site officiel & Journal Officiel', 'UEMOA — Portail officiel', 'OHADA — Journal Officiel', 'Commission Bancaire UMOA — Décisions', 'COBAC — Règlements & Instructions'],
    tools: ['Gemini — Veille web continue', 'Perplexity — Alertes temps réel', 'Claude — Synthèse réglementaire', 'ChatGPT — Analyse d\'impact'],
    deliverables: ['Alertes réglementaires quotidiennes', 'Synthèses exécutives hebdomadaires', 'Analyses d\'impact sectorielles', 'Base documentaire 15 000+ textes'],
    kpis: [
      { label: 'Textes monitorés', value: '15 247', target: '25 000', icon: 'ri-article-line' },
      { label: 'Alertes générées/mois', value: '328', target: '500', icon: 'ri-notification-3-line' },
      { label: 'Réformes détectées', value: '47/an', target: '80/an', icon: 'ri-search-eye-line' },
      { label: 'Délai alerte', value: '2.8h', target: '30min', icon: 'ri-timer-flash-line' },
    ],
    icon: 'ri-search-eye-line',
    color: '#F59E0B',
    status: 'deployed',
    maturity: 94,
  },
  {
    id: 6,
    number: '06',
    name: 'ESG et Développement Durable™',
    mission: 'Évaluer les risques ESG, le reporting durable, la finance durable et la gouvernance responsable.',
    description: 'Diagnostic ESG complet aligné sur les standards ISSB (IFRS S1/S2), GRI Standards 2026 et TCFD. Matrices de matérialité, analyse double matérialité, feuilles de route ESG, reporting conforme aux exigences des bailleurs internationaux et investisseurs ESG. Spécialisation finance durable UEMOA/CEMAC.',
    referentiels: ['ISSB — IFRS S1 & S2', 'GRI Standards 2026', 'TCFD — Recommandations climat', 'BCEAO — Instructions ESG', 'EU Taxonomy — Alignement'],
    tools: ['Claude — Analyse ESG complexe', 'ChatGPT — Reporting ESG', 'Consensus — Recherche académique ESG'],
    deliverables: ['Diagnostics ESG complets', 'Matrices de matérialité double', 'Feuilles de route ESG 3 ans', 'Rapports conformes TCFD/ISSB'],
    kpis: [
      { label: 'Diagnostics ESG/mois', value: '14', target: '30', icon: 'ri-plant-line' },
      { label: 'Matrices matérialité', value: '38', target: '80', icon: 'ri-grid-line' },
      { label: 'Score ESG moyen clients', value: '58/100', target: '80/100', icon: 'ri-bar-chart-2-line' },
      { label: 'Rapports TCFD produits', value: '22', target: '50', icon: 'ri-file-chart-line' },
    ],
    icon: 'ri-plant-line',
    color: '#059669',
    status: 'deployed',
    maturity: 81,
  },
  {
    id: 7,
    number: '07',
    name: 'Jurisprudence et Contentieux™',
    mission: 'Analyser la jurisprudence, la doctrine, les précédents et le contentieux réglementaire.',
    description: 'Recherche jurisprudentielle avancée couvrant les juridictions UEMOA, CEMAC, OHADA (CCJA) et internationales. Analyse doctrinale, identification des précédents, synthèses jurisprudentielles et mémorandums juridiques. Veille sur l\'évolution des positions des juges et autorités de régulation.',
    referentiels: ['CCJA — OHADA — Arrêts', 'Cours suprêmes nationales — Jurisprudence', 'Commission Bancaire — Décisions contentieuses', 'Westlaw — Base internationale', 'Lexis+ / vLex — Recherche juridique'],
    tools: ['Westlaw — Recherche jurisprudentielle', 'Lexis+ — Analyse juridique', 'vLex — Base internationale', 'Claude — Synthèse comparative'],
    deliverables: ['Mémorandums juridiques', 'Synthèses jurisprudentielles trimestrielles', 'Analyses comparatives multi-juridictions', 'Alertes contentieux stratégiques'],
    kpis: [
      { label: 'Arrêts analysés/mois', value: '186', target: '350', icon: 'ri-hammer-line' },
      { label: 'Mémorandums produits', value: '64', target: '120', icon: 'ri-file-text-line' },
      { label: 'Juridictions couvertes', value: '18', target: '30', icon: 'ri-earth-line' },
      { label: 'Précédents identifiés', value: '842', target: '2 000', icon: 'ri-link-m' },
    ],
    icon: 'ri-hammer-line',
    color: '#DC2626',
    status: 'deployed',
    maturity: 87,
  },
  {
    id: 8,
    number: '08',
    name: 'Contrats et Droit des Affaires™',
    mission: 'Examiner les contrats, pactes, conventions, statuts et accords de partenariat.',
    description: 'Revue contractuelle automatisée avec IA : analyse des clauses critiques, détection des risques juridiques, vérification de conformité OHADA et droit national. Matrices de risques contractuels, identification des clauses abusives ou déséquilibrées, recommandations de renégociation. Couverture de 12 types de contrats d\'affaires.',
    referentiels: ['OHADA — Acte Uniforme Droit Commercial Général', 'OHADA — Acte Uniforme Sociétés Commerciales', 'OHADA — Acte Uniforme Sûretés', 'Principes UNIDROIT', 'CCI — Incoterms 2020 & Force Majeure'],
    tools: ['Claude — Analyse contractuelle', 'ChatGPT — Drafting & révision', 'Harvey AI — Benchmark clauses', 'Gemini — Veille jurisprudentielle'],
    deliverables: ['Revues contractuelles détaillées', 'Matrices de risques contractuels', 'Recommandations de renégociation', 'Clausiers conformes OHADA'],
    kpis: [
      { label: 'Contrats revus/mois', value: '94', target: '200', icon: 'ri-file-copy-line' },
      { label: 'Risques contractuels détectés', value: '1 568', target: '3 000', icon: 'ri-error-warning-line' },
      { label: 'Types contrats couverts', value: '12', target: '20', icon: 'ri-stack-line' },
      { label: 'Délai revue/contrat', value: '3.2h', target: '1h', icon: 'ri-timer-line' },
    ],
    icon: 'ri-file-copy-line',
    color: '#6366F1',
    status: 'deployed',
    maturity: 84,
  },
  {
    id: 9,
    number: '09',
    name: 'LCB-FT™',
    mission: 'Évaluer la lutte contre le blanchiment, le financement du terrorisme, les sanctions, la corruption et la vigilance clientèle.',
    description: 'Expertise LCB-FT alignée sur les 40 Recommandations GAFI, le dispositif GIABA et les réglementations nationales UEMOA/CEMAC. Cartographie des risques BC/FT, programmes de conformité, dispositifs KYC/KYE, contrôles AML/CFT automatisés. Scoring de risque client, détection d\'anomalies et PEP screening.',
    referentiels: ['GAFI — 40 Recommandations révisées', 'GIABA — Évaluations mutuelles', 'BCEAO — Instructions LCB-FT', 'COBAC — Règlement CEMAC', 'ONU — Résolutions sanctions', 'OFAC/UE — Listes sanctions'],
    tools: ['Claude — Analyse LCB-FT', 'ChatGPT — Scoring risque', 'Gemini — Veille sanctions', 'Harvey AI — Recherche réglementaire'],
    deliverables: ['Cartographies des risques BC/FT', 'Programmes de conformité LCB-FT', 'Dispositifs KYC/KYE complets', 'Contrôles AML/CFT automatisés'],
    kpis: [
      { label: 'Risques BC/FT évalués', value: '3 247', target: '8 000', icon: 'ri-shield-flash-line' },
      { label: 'Anomalies détectées/mois', value: '486', target: '800', icon: 'ri-alert-line' },
      { label: 'PEP identifiés', value: '1 284', target: '3 000', icon: 'ri-user-search-line' },
      { label: 'Score conformité GAFI', value: '72/100', target: '95/100', icon: 'ri-check-double-line' },
    ],
    icon: 'ri-lock-line',
    color: '#EF4444',
    status: 'deployed',
    maturity: 89,
  },
  {
    id: 10,
    number: '10',
    name: 'Réformes et Veille Législative™',
    mission: 'Détecter les projets de lois, projets de règlements, nouvelles normes et tendances réglementaires.',
    description: 'Veille prospective sur les réformes législatives et réglementaires en Afrique de l\'Ouest et centrale. Détection précoce des projets de textes, analyse d\'impact économique et sectoriel, modélisation de scénarios et recommandations stratégiques pour les dirigeants. Cartographie des tendances réglementaires par pays et secteur.',
    referentiels: ['Parlements nationaux — Projets de lois', 'BCEAO — Projets d\'instructions', 'UEMOA/OHADA — Projets de textes', 'GAFI — Projets de recommandations', 'OCDE — Standards émergents'],
    tools: ['Gemini — Veille législative continue', 'Claude — Analyse prospective', 'ChatGPT — Modélisation de scénarios', 'Perplexity — Veille contextuelle'],
    deliverables: ['Notes de prospective réglementaire', 'Scénarios d\'impact — 3 horizons', 'Recommandations stratégiques', 'Cartographie des tendances'],
    kpis: [
      { label: 'Projets détectés', value: '86/an', target: '150/an', icon: 'ri-search-eye-line' },
      { label: 'Notes prospectives/mois', value: '12', target: '25', icon: 'ri-lightbulb-flash-line' },
      { label: 'Scénarios modélisés', value: '47', target: '100', icon: 'ri-git-branch-line' },
      { label: 'Délai détection', value: '18h', target: '6h', icon: 'ri-timer-flash-line' },
    ],
    icon: 'ri-lightbulb-flash-line',
    color: '#EC4899',
    status: 'in_progress',
    maturity: 76,
  },
];

export const COMPLIANCE_METHODOLOGY_PHASES: ComplianceMethodologyPhase[] = [
  { level: 1, name: 'Collecte Documentaire', description: 'Rassemblement exhaustif des textes applicables : lois, règlements, instructions, circulaires, décisions, jurisprudence, doctrine.', action: 'Gemini + Perplexity — Scan multi-sources', icon: 'ri-folder-open-line', color: '#0EA5E9' },
  { level: 2, name: 'Recherche Réglementaire', description: 'Analyse croisée des référentiels. Identification des textes en vigueur, abrogés, modifiés. Hiérarchie des normes.', action: 'Claude + Harvey AI — Deep dive réglementaire', icon: 'ri-book-read-line', color: '#8B5CF6' },
  { level: 3, name: 'Analyse Juridique', description: 'Interprétation juridique approfondie. Qualification des obligations, identification des zones grises, analyse de la jurisprudence associée.', action: 'Claude + ChatGPT — Analyse & qualification', icon: 'ri-scales-3-line', color: '#F59E0B' },
  { level: 4, name: 'Validation Croisée Multi-IA', description: 'Chaque analyse est vérifiée par au moins 2 IA indépendantes. Confrontation des interprétations et résolution des divergences.', action: 'ChatGPT vs Claude vs Harvey — Cross-check', icon: 'ri-arrow-left-right-line', color: '#E07B39' },
  { level: 5, name: 'Contradiction Systématique', description: 'Un agent Contradicteur dédié teste chaque conclusion. Vérification proactive des angles morts et des biais d\'interprétation.', action: 'Agent Contradicteur IA — Devil\'s Advocate juridique', icon: 'ri-contrast-2-line', color: '#DC2626' },
  { level: 6, name: 'Contrôle Qualité Big Four', description: 'Revue systématique par le Quality Controller : cohérence juridique, sourcing, format, conformité aux standards internationaux.', action: 'KOS Quality Controller — 14 critères qualité', icon: 'ri-shield-check-line', color: '#10B981' },
  { level: 7, name: 'Validation Finale', description: 'Décision et signature du Managing Partner Office. Validation de l\'alignement stratégique et de la conformité déontologique.', action: 'Managing Partner Office — Validation exécutive', icon: 'ri-vip-crown-line', color: '#6366F1' },
];

export const ANTI_HALLUCINATION_RULES: AntiHallucinationRule[] = [
  { type: 'interdiction', label: 'Ne jamais inventer un texte réglementaire', icon: 'ri-forbid-line', color: '#DC2626' },
  { type: 'interdiction', label: 'Ne jamais inventer un article de loi', icon: 'ri-forbid-line', color: '#DC2626' },
  { type: 'interdiction', label: 'Ne jamais inventer une jurisprudence', icon: 'ri-forbid-line', color: '#DC2626' },
  { type: 'interdiction', label: 'Ne jamais inventer une instruction BCEAO', icon: 'ri-forbid-line', color: '#DC2626' },
  { type: 'interdiction', label: 'Ne jamais inventer une décision de justice', icon: 'ri-forbid-line', color: '#DC2626' },
  { type: 'obligation', label: 'Texte exact — citation littérale obligatoire', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', label: 'Référence officielle — numéro, date, publication', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', label: 'Date de vigueur et abrogation éventuelle', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', label: 'Source officielle vérifiable — lien URL', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', label: 'Niveau de confiance pour chaque affirmation', icon: 'ri-checkbox-circle-line', color: '#10B981' },
];

export const COMPLIANCE_KPIS: ComplianceKPI[] = [
  { id: 'taux-conformite', name: 'Taux de Conformité Global', category: 'conformity', current: 76, target: 95, unit: '%', trend: 4, icon: 'ri-check-double-line', color: '#E07B39', subMetrics: [{ label: 'BCEAO', value: 82, target: 95 }, { label: 'UEMOA', value: 78, target: 95 }, { label: 'OHADA', value: 74, target: 95 }, { label: 'GAFI', value: 72, target: 95 }] },
  { id: 'ecarts-identifies', name: 'Écarts de Conformité Identifiés', category: 'conformity', current: 2847, target: 5000, unit: 'cumul', trend: 186, icon: 'ri-error-warning-line', color: '#DC2626' },
  { id: 'actions-correctives', name: 'Actions Correctives Mises en Œuvre', category: 'conformity', current: 1864, target: 4000, unit: 'cumul', trend: 124, icon: 'ri-tools-line', color: '#0EA5E9' },
  { id: 'textes-surveilles', name: 'Textes Surveillés', category: 'veille', current: 15247, target: 25000, unit: 'cumul', trend: 820, icon: 'ri-article-line', color: '#F59E0B', subMetrics: [{ label: 'BCEAO', value: 4200, target: 7000 }, { label: 'UEMOA', value: 3100, target: 5000 }, { label: 'OHADA', value: 2800, target: 4500 }, { label: 'Autres', value: 5147, target: 8500 }] },
  { id: 'alertes-generees', name: 'Alertes Réglementaires Générées', category: 'veille', current: 328, target: 500, unit: '/mois', trend: 18, icon: 'ri-notification-3-line', color: '#8B5CF6' },
  { id: 'reformes-detectees', name: 'Réformes Détectées', category: 'veille', current: 47, target: 80, unit: '/an', trend: 5, icon: 'ri-search-eye-line', color: '#059669' },
  { id: 'analyses-realisees', name: 'Analyses Juridiques Réalisées', category: 'juridique', current: 486, target: 800, unit: '/mois', trend: 34, icon: 'ri-file-text-line', color: '#6366F1', subMetrics: [{ label: 'Droit bancaire', value: 128, target: 200 }, { label: 'Fiscalité', value: 96, target: 160 }, { label: 'Gouvernance', value: 84, target: 150 }, { label: 'Contrats', value: 94, target: 200 }, { label: 'Autres', value: 84, target: 90 }] },
  { id: 'risques-identifies', name: 'Risques Juridiques Identifiés', category: 'juridique', current: 4682, target: 8000, unit: 'cumul', trend: 312, icon: 'ri-radar-line', color: '#DC2626' },
  { id: 'litiges-anticipes', name: 'Litiges Anticipés/Évitables', category: 'juridique', current: 42, target: 100, unit: '/mois', trend: 6, icon: 'ri-shield-flash-line', color: '#EF4444' },
  { id: 'lcbft-risques', name: 'Risques LCB-FT Évalués', category: 'lcbfa', current: 3247, target: 8000, unit: 'cumul', trend: 245, icon: 'ri-lock-line', color: '#E07B39', subMetrics: [{ label: 'BC/FT', value: 1800, target: 4500 }, { label: 'Sanctions', value: 720, target: 1800 }, { label: 'Corruption', value: 427, target: 1000 }, { label: 'KYC', value: 300, target: 700 }] },
  { id: 'anomalies-detectees', name: 'Anomalies Détectées', category: 'lcbfa', current: 486, target: 800, unit: '/mois', trend: 38, icon: 'ri-alert-line', color: '#EF4444' },
];

export const REGULATORY_LEGAL_GLOBAL_METRICS = {
  totalAgents: 75,
  agentsDeployed: 75,
  avgMaturity: 100,
  textsMonitored: 25000,
  alertsGenerated: 500,
  reformsDetected: 80,
  analysesCompleted: 800,
  risksIdentified: 8200,
  contractsReviewed: 220,
  lcbftRisks: 8500,
  anomalyRate: 0.5,
  consolidationComplete: true,
};

export const LIVRABLE_STANDARDS: { icon: string; label: string; color: string }[] = [
  { icon: 'ri-scales-3-line', label: 'Audits réglementaires complets multi-référentiels', color: '#E07B39' },
  { icon: 'ri-bank-line', label: 'Diagnostics de conformité BCEAO/UEMOA/OHADA', color: '#0EA5E9' },
  { icon: 'ri-file-chart-line', label: 'Analyses de droit bancaire et financier', color: '#8B5CF6' },
  { icon: 'ri-file-copy-line', label: 'Revues contractuelles avancées OHADA', color: '#6366F1' },
  { icon: 'ri-money-dollar-circle-line', label: 'Analyses de fiscalité internationale BEPS 2.0', color: '#F59E0B' },
  { icon: 'ri-lock-line', label: 'Programmes LCB-FT conformes GAFI/GIABA', color: '#EF4444' },
  { icon: 'ri-plant-line', label: 'Diagnostics ESG conformes ISSB/GRI/TCFD', color: '#059669' },
  { icon: 'ri-hammer-line', label: 'Analyses jurisprudentielles documentées CCJA', color: '#DC2626' },
  { icon: 'ri-lightbulb-flash-line', label: 'Notes d\'impact réglementaire et législatif', color: '#EC4899' },
  { icon: 'ri-medal-line', label: 'Recommandations stratégiques Big Four, sourcées et vérifiables', color: '#10B981' },
];





