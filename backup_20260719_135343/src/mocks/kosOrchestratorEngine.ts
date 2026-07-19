export interface OrchestratorAgent {
  id: string;
  number: string;
  name: string;
  mission: string;
  icon: string;
  color: string;
  status: 'active' | 'partial' | 'gap';
  score: number;
  responsibilities: string[];
  controls: string[];
  deliverables: string[];
  kpis: { label: string; current: string; target: string; unit: string; icon: string }[];
}

export interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  status: 'completed' | 'in_progress' | 'pending';
  duration: string;
  agents: string[];
  output: string;
}

export interface ScoringCriteria {
  id: string;
  name: string;
  weight: number;
  description: string;
  icon: string;
  color: string;
}

export interface ScoringThreshold {
  range: string;
  label: string;
  action: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  description: string;
}

export interface SampleMission {
  id: string;
  type: string;
  title: string;
  description: string;
  agentsAssigned: string[];
  scores: { criteriaId: string; score: number }[];
  globalScore: number;
  decision: 'approved' | 'to_correct' | 'rejected';
  risks: string[];
  actions: string[];
  date: string;
}

export const ORCHESTRATOR_AGENTS: OrchestratorAgent[] = [
  {
    id: 'governance',
    number: '01',
    name: 'KOS Governance Agent',
    mission: 'Supervision globale, arbitrage, KPI et reporting exécutif. Gestion du portefeuille projets et priorisation stratégique.',
    icon: 'ri-government-line',
    color: '#4F46E5',
    status: 'active',
    score: 9.2,
    responsibilities: [
      'Supervision globale de tous les agents KOS',
      'Arbitrage des conflits inter-agents',
      'Suivi des KPI et production de rapports exécutifs',
      'Gestion du portefeuille de projets',
    ],
    controls: [
      'Cohérence inter-agents',
      'Alignement stratégique',
      'Respect des délais',
    ],
    deliverables: [
      'Rapport exécutif hebdomadaire',
      'Dashboard KPI consolidé',
      'Plan de priorisation trimestriel',
    ],
    kpis: [
      { label: 'Taux de complétion', current: '94', target: '95', unit: '%', icon: 'ri-check-double-line' },
      { label: 'Délai moyen décision', current: '4.2', target: '3', unit: 'h', icon: 'ri-time-line' },
      { label: 'Satisfaction', current: '9.1', target: '9.5', unit: '/10', icon: 'ri-star-line' },
    ],
  },
  {
    id: 'seo',
    number: '02',
    name: 'KOS SEO Agent',
    mission: 'Audit SEO technique, analyse du maillage interne, sitemap, robots.txt, indexation et détection des erreurs 404.',
    icon: 'ri-search-line',
    color: '#0D7B5F',
    status: 'active',
    score: 7.8,
    responsibilities: [
      'Audit SEO technique complet',
      'Analyse et optimisation du maillage interne',
      'Gestion sitemap.xml et robots.txt',
      'Détection et correction des erreurs 404',
    ],
    controls: [
      'Indexation Google Search Console',
      'Structure Hn cohérente',
      'Canonical tags valides',
    ],
    deliverables: [
      'Rapport SEO technique',
      'Plan de correction priorisé',
      'Backlog d\'optimisation SEO',
    ],
    kpis: [
      { label: 'Pages indexées', current: '312', target: '350', unit: '', icon: 'ri-pages-line' },
      { label: 'Erreurs crawl', current: '14', target: '0', unit: '', icon: 'ri-error-warning-line' },
      { label: 'Score SEO', current: '87', target: '95', unit: '/100', icon: 'ri-bar-chart-line' },
    ],
  },
  {
    id: 'geo',
    number: '03',
    name: 'KOS GEO Agent',
    mission: 'Optimisation de la visibilité dans les IA génératives (ChatGPT, Perplexity, Gemini). Structuration en entités et FAQ optimisées.',
    icon: 'ri-globe-line',
    color: '#0891B2',
    status: 'active',
    score: 10.0,
    responsibilities: [
      'Optimisation pour moteurs IA (ChatGPT, Perplexity, Gemini)',
      'Structuration du contenu en entités',
      'Création de FAQ optimisées IA',
      'Suivi des citations IA',
    ],
    controls: [
      'Présence dans les réponses IA',
      'Qualité des extraits',
      'Cohérence des entités',
    ],
    deliverables: [
      'GEO Score mensuel',
      'AI Visibility Report',
      'Plan d\'optimisation GEO',
    ],
    kpis: [
      { label: 'Citations IA', current: '23', target: '100', unit: '', icon: 'ri-robot-line' },
      { label: 'Pages GEO-optimisées', current: '34', target: '80', unit: '', icon: 'ri-file-text-line' },
      { label: 'GEO Score', current: '42', target: '75', unit: '/100', icon: 'ri-radar-line' },
    ],
  },
  {
    id: 'content',
    number: '04',
    name: 'KOS Content Agent',
    mission: 'Génération, réécriture et amélioration de la qualité des contenus. Harmonisation du ton institutionnel et contrôle grammatical.',
    icon: 'ri-quill-pen-line',
    color: '#4A7A1E',
    status: 'active',
    score: 7.5,
    responsibilities: [
      'Génération de contenus (articles, posts, rapports)',
      'Réécriture et amélioration qualité',
      'Harmonisation du ton institutionnel',
      'Contrôle grammatical et stylistique',
    ],
    controls: [
      'Grammaire et orthographe',
      'Style et cohérence éditoriale',
      'Lisibilité et clarté',
    ],
    deliverables: [
      'Articles optimisés',
      'Posts réseaux sociaux',
      'Rapports de qualité rédactionnelle',
    ],
    kpis: [
      { label: 'Score qualité', current: '7.8', target: '9.0', unit: '/10', icon: 'ri-star-line' },
      { label: 'Articles/mois', current: '18', target: '24', unit: '', icon: 'ri-article-line' },
      { label: 'Taux conformité ton', current: '82', target: '95', unit: '%', icon: 'ri-check-line' },
    ],
  },
  {
    id: 'thinktank',
    number: '05',
    name: 'KOS Think Tank Agent',
    mission: 'Production de rapports sectoriels, études, livres blancs et notes stratégiques. Contrôle des citations et de la méthodologie.',
    icon: 'ri-lightbulb-line',
    color: '#9B7B2C',
    status: 'active',
    score: 10.0,
    responsibilities: [
      'Production de rapports sectoriels',
      'Études et analyses stratégiques',
      'Livres blancs et notes stratégiques',
      'Contrôle qualité analytique',
    ],
    controls: [
      'Citations et sources vérifiables',
      'Méthodologie rigoureuse',
      'Qualité analytique',
    ],
    deliverables: [
      'Rapports sectoriels trimestriels',
      'Livres blancs thématiques',
      'Notes stratégiques mensuelles',
    ],
    kpis: [
      { label: 'Publications/mois', current: '4', target: '8', unit: '', icon: 'ri-file-text-line' },
      { label: 'Citations vérifiées', current: '96', target: '100', unit: '%', icon: 'ri-double-quotes-l' },
      { label: 'Score méthodo', current: '7.5', target: '9.0', unit: '/10', icon: 'ri-flask-line' },
    ],
  },
  {
    id: 'legal',
    number: '06',
    name: 'KOS Legal Compliance Agent',
    mission: 'Vérification des risques juridiques, conformité des marques, droits d\'auteur et allégations marketing. Détection des affirmations non vérifiées.',
    icon: 'ri-scales-3-line',
    color: '#8B3040',
    status: 'active',
    score: 8.8,
    responsibilities: [
      'Vérification des risques juridiques',
      'Conformité des marques et droits d\'auteur',
      'Contrôle des allégations marketing',
      'Détection des affirmations non vérifiées',
    ],
    controls: [
      'Usage non autorisé de marques',
      'Fausses affiliations',
      'Promesses commerciales trompeuses',
      'Auto-certification sans preuve',
    ],
    deliverables: [
      'Rapport de conformité juridique',
      'Alertes risques légaux',
      'Plan de mise en conformité',
    ],
    kpis: [
      { label: 'Conformité', current: '97', target: '100', unit: '%', icon: 'ri-shield-check-line' },
      { label: 'Risques détectés', current: '2', target: '0', unit: '', icon: 'ri-alert-line' },
      { label: 'Temps résolution', current: '3.5', target: '2', unit: 'h', icon: 'ri-time-line' },
    ],
  },
  {
    id: 'reputation',
    number: '07',
    name: 'KOS Reputation Agent',
    mission: 'Contrôle de la cohérence institutionnelle, image de marque et cohérence éditoriale. Protection de la crédibilité KHEPRA EXPERTS.',
    icon: 'ri-shield-star-line',
    color: '#6B4A3A',
    status: 'active',
    score: 10.0,
    responsibilities: [
      'Cohérence institutionnelle cross-canal',
      'Contrôle image de marque',
      'Cohérence éditoriale',
      'Protection de la crédibilité',
    ],
    controls: [
      'Uniformité du ton',
      'Cohérence visuelle',
      'Alignement brand messaging',
    ],
    deliverables: [
      'Rapport cohérence branding',
      'Audit réputationnel trimestriel',
      'Recommandations image de marque',
    ],
    kpis: [
      { label: 'Cohérence branding', current: '78', target: '95', unit: '%', icon: 'ri-palette-line' },
      { label: 'Liens sociaux valides', current: '91', target: '99', unit: '%', icon: 'ri-link' },
      { label: 'Score réputation', current: '84', target: '92', unit: '/100', icon: 'ri-heart-line' },
    ],
  },
  {
    id: 'security',
    number: '08',
    name: 'KOS Security Agent',
    mission: 'Audit cybersécurité, scan OWASP Top 10, revue de configuration serveur et recommandations de sécurité. Conformité OWASP.',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    status: 'active',
    score: 8.5,
    responsibilities: [
      'Audit cybersécurité complet',
      'Scan OWASP Top 10 (XSS, SQLi, CSRF)',
      'Revue configuration serveur et headers',
      'Recommandations sécurité',
    ],
    controls: [
      'Vulnérabilités OWASP',
      'Headers HTTP sécurité',
      'HTTPS/HSTS',
      'Configurations serveur',
    ],
    deliverables: [
      'Rapport cybersécurité',
      'Plan de remédiation',
      'Score sécurité global',
    ],
    kpis: [
      { label: 'Score sécurité', current: '87', target: '95', unit: '/100', icon: 'ri-shield-check-line' },
      { label: 'Vulns critiques', current: '0', target: '0', unit: '', icon: 'ri-close-circle-line' },
      { label: 'Headers conformes', current: '8', target: '9', unit: '/9', icon: 'ri-list-check' },
    ],
  },
  {
    id: 'quality',
    number: '09',
    name: 'KOS Quality Agent',
    mission: 'Validation finale des livrables, scoring qualité, vérification de la conformité des livrables et approbation avant publication.',
    icon: 'ri-verified-badge-line',
    color: '#5B21B6',
    status: 'active',
    score: 9.0,
    responsibilities: [
      'Validation finale de tous les livrables',
      'Scoring qualité global',
      'Vérification conformité des livrables',
      'Approbation ou rejet avant publication',
    ],
    controls: [
      'Checklist qualité exhaustive',
      'Double vérification conformité',
      'Validation croisée inter-agents',
    ],
    deliverables: [
      'Rapport de validation qualité',
      'Certificat de conformité',
      'Tableau de bord qualité',
    ],
    kpis: [
      { label: 'Taux approbation', current: '92', target: '98', unit: '%', icon: 'ri-check-double-line' },
      { label: 'Délai validation', current: '2.1', target: '1.5', unit: 'h', icon: 'ri-time-line' },
      { label: 'Score qualité moyen', current: '8.3', target: '9.0', unit: '/10', icon: 'ri-medal-line' },
    ],
  },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    name: 'Réception de la Mission',
    description: 'Réception et enregistrement de la mission. Analyse préliminaire du contexte, des objectifs et des contraintes. Attribution d\'un identifiant unique de mission.',
    icon: 'ri-inbox-line',
    color: '#4F46E5',
    status: 'completed',
    duration: '~2 min (auto)',
    agents: ['Governance'],
    output: 'Mission enregistrée avec ID unique et méta-données',
  },
  {
    step: 2,
    name: 'Classification de la Mission',
    description: 'Catégorisation automatique de la mission par domaine : SEO, contenu, juridique, cybersécurité, stratégie, marketing. Détermination du niveau de criticité.',
    icon: 'ri-price-tag-3-line',
    color: '#0D7B5F',
    status: 'completed',
    duration: '~1 min (auto)',
    agents: ['Governance'],
    output: 'Classification établie : domaine, criticité, priorité',
  },
  {
    step: 3,
    name: 'Création du Plan d\'Exécution',
    description: 'Élaboration du plan d\'exécution détaillé avec jalons, dépendances, ressources nécessaires et calendrier prévisionnel.',
    icon: 'ri-treasure-map-line',
    color: '#0891B2',
    status: 'completed',
    duration: '~5 min (semi-auto)',
    agents: ['Governance'],
    output: 'Plan d\'exécution avec jalons et calendrier',
  },
  {
    step: 4,
    name: 'Sélection des Agents',
    description: 'Sélection et activation des agents KOS concernés par la mission. Configuration des paramètres spécifiques et des règles d\'interaction inter-agents.',
    icon: 'ri-user-settings-line',
    color: '#4A7A1E',
    status: 'completed',
    duration: '~3 min (auto)',
    agents: ['Governance'],
    output: 'Agents sélectionnés et configurés',
  },
  {
    step: 5,
    name: 'Exécution des Analyses',
    description: 'Exécution parallèle des analyses par chaque agent sélectionné. Chaque agent applique ses algorithmes et produit ses résultats selon ses responsabilités.',
    icon: 'ri-cpu-line',
    color: '#9B7B2C',
    status: 'completed',
    duration: '~15-45 min (varie selon mission)',
    agents: ['SEO', 'GEO', 'Content', 'Security', 'Legal', 'ThinkTank'],
    output: 'Résultats bruts de chaque agent',
  },
  {
    step: 6,
    name: 'Consolidation des Résultats',
    description: 'Agrégation et consolidation des résultats de tous les agents. Détection des conflits, incohérences ou redondances entre les analyses.',
    icon: 'ri-puzzle-line',
    color: '#8B3040',
    status: 'completed',
    duration: '~5 min (auto)',
    agents: ['Governance'],
    output: 'Rapport consolidé multi-agents',
  },
  {
    step: 7,
    name: 'Contrôle Qualité',
    description: 'Vérification de la qualité de chaque livrable intermédiaire. Application du scoring qualité par le Quality Agent sur tous les résultats.',
    icon: 'ri-check-double-line',
    color: '#5B21B6',
    status: 'completed',
    duration: '~8 min (semi-auto)',
    agents: ['Quality'],
    output: 'Rapport de contrôle qualité avec scores',
  },
  {
    step: 8,
    name: 'Contrôle Conformité',
    description: 'Vérification de la conformité juridique, éditoriale et réputationnelle. Application des règles strictes (Règle Absolue N°1 et N°2).',
    icon: 'ri-scales-3-line',
    color: '#6B4A3A',
    status: 'completed',
    duration: '~10 min (semi-auto)',
    agents: ['Legal', 'Reputation'],
    output: 'Rapport de conformité avec alertes',
  },
  {
    step: 9,
    name: 'Calcul du Score Final',
    description: 'Calcul du score global selon les 5 critères pondérés (Exactitude 25%, Conformité 20%, Qualité 20%, Utilité 20%, Risque 15%). Application des seuils de décision.',
    icon: 'ri-bar-chart-box-line',
    color: '#C2410C',
    status: 'completed',
    duration: '~2 min (auto)',
    agents: ['Governance', 'Quality'],
    output: 'Score global et décision (Approuvé/À corriger/Rejeté)',
  },
  {
    step: 10,
    name: 'Production du Rapport Exécutif',
    description: 'Génération du rapport exécutif complet incluant : résumé, analyse détaillée, risques, actions correctives, KPIs, score global et décision.',
    icon: 'ri-file-chart-line',
    color: '#86BC25',
    status: 'completed',
    duration: '~3 min (auto)',
    agents: ['Governance', 'Content'],
    output: 'Rapport exécutif PDF + dashboard interactif',
  },
];

export const SCORING_CRITERIA: ScoringCriteria[] = [
  {
    id: 'exactitude',
    name: 'Exactitude',
    weight: 25,
    description: 'Précision factuelle, véracité des données, absence d\'erreurs. Les informations doivent être vérifiables et sourcées.',
    icon: 'ri-focus-3-line',
    color: '#4F46E5',
  },
  {
    id: 'conformite',
    name: 'Conformité',
    weight: 20,
    description: 'Respect des règles strictes KOS (Règle Absolue N°1 et N°2), conformité juridique, éditoriale et réputationnelle.',
    icon: 'ri-scales-3-line',
    color: '#8B3040',
  },
  {
    id: 'qualite',
    name: 'Qualité',
    weight: 20,
    description: 'Qualité rédactionnelle, grammaticale et stylistique. Lisibilité, clarté, cohérence éditoriale et ton institutionnel.',
    icon: 'ri-medal-line',
    color: '#5B21B6',
  },
  {
    id: 'utilite',
    name: 'Utilité',
    weight: 20,
    description: 'Valeur ajoutée pour le destinataire, pertinence stratégique, applicabilité des recommandations.',
    icon: 'ri-lightbulb-line',
    color: '#9B7B2C',
  },
  {
    id: 'risque',
    name: 'Risque',
    weight: 15,
    description: 'Évaluation des risques résiduels : juridiques, réputationnels, techniques. Impact potentiel négatif.',
    icon: 'ri-alert-line',
    color: '#C2410C',
  },
];

export const SCORING_THRESHOLDS: ScoringThreshold[] = [
  {
    range: '90-100',
    label: 'Excellence',
    action: 'Approuvé',
    color: '#86BC25',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    description: 'Livrable approuvé sans réserve. Publication immédiate autorisée.',
  },
  {
    range: '80-89',
    label: 'Acceptable',
    action: 'Approuvé avec notes',
    color: '#E8C547',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700',
    description: 'Livrable approuvé avec recommandations mineures. Publication autorisée.',
  },
  {
    range: '70-79',
    label: 'Révision Recommandée',
    action: 'À corriger',
    color: '#E8943A',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-200',
    badgeText: 'text-orange-700',
    description: 'Révisions nécessaires avant publication. Corrections obligatoires identifiées.',
  },
  {
    range: '< 70',
    label: 'Révision Obligatoire',
    action: 'Rejeté',
    color: '#C2410C',
    badgeBg: 'bg-red-50',
    badgeBorder: 'border-red-200',
    badgeText: 'text-red-700',
    description: 'Livrable rejeté. Révision complète obligatoire avant nouvelle soumission.',
  },
];

export const SAMPLE_MISSIONS: SampleMission[] = [
  {
    id: 'MIS-2026-042',
    type: 'Contenu + SEO',
    title: 'Article "Gouvernance Bancaire UEMOA — Guide Complet 2026"',
    description: 'Production d\'un article pilier de 2500 mots sur la gouvernance bancaire UEMOA, optimisé SEO et GEO, avec contrôle conformité complet.',
    agentsAssigned: ['seo', 'geo', 'content', 'legal', 'quality'],
    scores: [
      { criteriaId: 'exactitude', score: 9.2 },
      { criteriaId: 'conformite', score: 8.5 },
      { criteriaId: 'qualite', score: 8.8 },
      { criteriaId: 'utilite', score: 9.0 },
      { criteriaId: 'risque', score: 7.5 },
    ],
    globalScore: 8.7,
    decision: 'approved',
    risks: [
      'Référence à la Circulaire 01-2017 : vérifier version la plus récente',
      'Mention d\'un ratio prudentiel : validation BCEAO requise',
    ],
    actions: [
      'Annoter les références réglementaires avec date de dernière mise à jour',
      'Ajouter disclaimer : "Sous réserve des mises à jour réglementaires BCEAO"',
    ],
    date: '2026-06-08T14:30:00Z',
  },
  {
    id: 'MIS-2026-043',
    type: 'Juridique + Réputation',
    title: 'Benchmark Méthodologique vs Big Four — Page Institutionnelle',
    description: 'Révision complète de la page de comparaison méthodologique avec les cabinets de référence. Vérification conformité Règle Absolue N°2.',
    agentsAssigned: ['legal', 'reputation', 'content', 'quality'],
    scores: [
      { criteriaId: 'exactitude', score: 9.5 },
      { criteriaId: 'conformite', score: 9.8 },
      { criteriaId: 'qualite', score: 9.0 },
      { criteriaId: 'utilite', score: 8.2 },
      { criteriaId: 'risque', score: 8.5 },
    ],
    globalScore: 9.1,
    decision: 'approved',
    risks: [
      'Aucun risque détecté après révision',
    ],
    actions: [
      'Maintenir la formulation "benchmark méthodologique uniquement"',
      'Vérification trimestrielle automatique programmée',
    ],
    date: '2026-06-09T10:15:00Z',
  },
  {
    id: 'MIS-2026-044',
    type: 'Cybersécurité',
    title: 'Audit OWASP Trimestriel — khepraexperts.com',
    description: 'Scan complet OWASP Top 10 du site, analyse des headers HTTP, vérification HTTPS/HSTS et configurations serveur.',
    agentsAssigned: ['security', 'quality'],
    scores: [
      { criteriaId: 'exactitude', score: 9.0 },
      { criteriaId: 'conformite', score: 8.5 },
      { criteriaId: 'qualite', score: 8.0 },
      { criteriaId: 'utilite', score: 7.5 },
      { criteriaId: 'risque', score: 6.8 },
    ],
    globalScore: 7.96,
    decision: 'to_correct',
    risks: [
      'Header Content-Security-Policy manquant',
      'Deux bibliothèques JS avec vulnérabilités connues (CVE-2025-xxxx)',
    ],
    actions: [
      'Ajouter Content-Security-Policy header',
      'Mettre à jour les dépendances vulnérables',
      'Re-scanner après corrections',
    ],
    date: '2026-06-11T08:00:00Z',
  },
  {
    id: 'MIS-2026-045',
    type: 'Contenu + Think Tank',
    title: 'Livre Blanc "ESG en Afrique Francophone — Cadre Réglementaire 2026"',
    description: 'Production d\'un livre blanc de 40 pages sur le cadre ESG en zone UEMOA/CEMAC. Recherche, rédaction, citations et contrôle qualité.',
    agentsAssigned: ['thinktank', 'content', 'geo', 'legal', 'reputation', 'quality'],
    scores: [
      { criteriaId: 'exactitude', score: 6.5 },
      { criteriaId: 'conformite', score: 7.0 },
      { criteriaId: 'qualite', score: 6.2 },
      { criteriaId: 'utilite', score: 8.5 },
      { criteriaId: 'risque', score: 6.0 },
    ],
    globalScore: 6.84,
    decision: 'rejected',
    risks: [
      'Section 3.2 : données chiffrées non sourcées',
      'Section 5.1 : référence à une étude non publiée',
      'Citation incomplète d\'un rapport BCEAO (page manquante)',
    ],
    actions: [
      'Sourcer toutes les données chiffrées avec références vérifiables',
      'Supprimer la référence à l\'étude non publiée',
      'Compléter la citation BCEAO avec numéro de page exact',
      'Re-soumettre après corrections pour nouvelle évaluation',
    ],
    date: '2026-06-11T16:45:00Z',
  },
];

export const ORCHESTRATOR_STATS = {
  totalAgents: 9,
  activeAgents: 9,
  partialAgents: 0,
  totalSteps: 10,
  completedSteps: 10,
  inProgressSteps: 0,
  pendingSteps: 0,
  totalMissions: 47,
  approvedMissions: 47,
  toCorrectMissions: 0,
  rejectedMissions: 0,
  avgGlobalScore: 10.0,
  lastScanDate: '2026-06-22T06:00:00Z',
  nextScanDate: '2026-06-22T07:00:00Z',
};



