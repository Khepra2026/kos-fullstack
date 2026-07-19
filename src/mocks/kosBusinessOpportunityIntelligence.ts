// KOS Business Opportunity Intelligence Program™ — Master Prompt Big Four
// Renforcement des capacités des Agents et Automates KOS avec les meilleures IA spécialisées en développement d'affaires

export interface BusinessIntelAgent {
  id: number;
  number: string;
  name: string;
  mission: string;
  description: string;
  sources: string[];
  tools: string[];
  deliverables: string[];
  kpis: { label: string; value: string; target: string; icon: string }[];
  icon: string;
  color: string;
  status: 'deployed' | 'in_progress' | 'planned';
  maturity: number;
}

export interface ValidationLevel {
  level: number;
  name: string;
  description: string;
  action: string;
  icon: string;
  color: string;
}

export interface BusinessIntelKPI {
  id: string;
  name: string;
  category: 'opportunites' | 'partenariats' | 'marketing' | 'geo' | 'dev_commercial';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
  subMetrics?: { label: string; value: number; target: number }[];
}

export interface MonitoredEntity {
  type: string;
  count: number;
  icon: string;
  color: string;
}

export interface BusinessOpportunityData {
  agents: BusinessIntelAgent[];
  monitoredEntities: MonitoredEntity[];
  validationLevels: ValidationLevel[];
  businessKPIs: BusinessIntelKPI[];
  globalMetrics: {
    totalAgents: number;
    agentsDeployed: number;
    avgMaturity: number;
    opportunitiesDetected: number;
    partnersQualified: number;
    leadsGenerated: number;
    proposalsSubmitted: number;
    contractsWon: number;
    revenueGenerated: number;
    geoCitations: number;
    organizationsMonitored: number;
  };
  livrableStandards: { icon: string; label: string; color: string }[];
}

export const BUSINESS_INTEL_AGENTS: BusinessIntelAgent[] = [
  {
    id: 1,
    number: '01',
    name: 'AO / AMI Intelligence™',
    mission: 'Détection automatique des appels d\'offres, manifestations d\'intérêt, demandes de propositions, consultations, marchés publics et missions de conseil.',
    description: 'Agent de veille permanente connecté aux principales plateformes d\'appels d\'offres internationales et africaines. Scoring automatique des opportunités selon 12 critères pondérés, matrice Go/No-Go et préqualification documentaire. Alerte quotidienne aux Dirigeants et Partners.',
    sources: ['UNGM — United Nations Global Marketplace', 'DevelopmentAid', 'World Bank Procurement', 'African Development Bank', 'European TED', 'Marchés publics nationaux UEMOA/CEMAC'],
    tools: ['Gemini — Veille web avancée', 'Perplexity — Recherche temps réel', 'ChatGPT — Analyse & scoring'],
    deliverables: ['Alertes quotidiennes personnalisées', 'Scoring automatisé des opportunités', 'Matrice Go / No Go multicritère', 'Dossier de préqualification automatique'],
    kpis: [
      { label: 'AO détectés/mois', value: '347', target: '500', icon: 'ri-file-search-line' },
      { label: 'AMI détectés/mois', value: '128', target: '200', icon: 'ri-megaphone-line' },
      { label: 'Taux scoring Go', value: '34%', target: '50%', icon: 'ri-percent-line' },
      { label: 'Délai alerte', value: '4.2h', target: '1h', icon: 'ri-timer-line' },
    ],
    icon: 'ri-file-search-line',
    color: '#E07B39',
    status: 'deployed',
    maturity: 89,
  },
  {
    id: 2,
    number: '02',
    name: 'Partenariats Stratégiques™',
    mission: 'Identifier les cabinets partenaires, banques, fonds, assureurs, fintechs, ONG, multinationales et institutions publiques.',
    description: 'Cartographie dynamique de l\'écosystème des partenaires stratégiques sur 18 pays africains. Notation multicritère, stratégie d\'approche personnalisée et suivi du pipeline partenarial. Intégration LinkedIn Sales Navigator, Apollo.io et Clay pour l\'enrichissement des données.',
    sources: ['LinkedIn Sales Navigator', 'Apollo.io — Base B2B', 'Clay — Enrichissement données', 'Crunchbase', 'Dealroom'],
    tools: ['LinkedIn Sales Navigator API', 'Apollo.io — Prospecting', 'Clay — Data enrichment'],
    deliverables: ['Cartographie interactive des partenaires', 'Classement par priorité stratégique', 'Stratégie d\'approche séquencée', 'Argumentaires personnalisés par segment'],
    kpis: [
      { label: 'Partenaires qualifiés', value: '284', target: '500', icon: 'ri-team-line' },
      { label: 'Partenariats signés', value: '47', target: '100', icon: 'ri-file-text-line' },
      { label: 'Pays couverts', value: '18', target: '26', icon: 'ri-global-line' },
      { label: 'Taux conversion', value: '16.5%', target: '25%', icon: 'ri-line-chart-line' },
    ],
    icon: 'ri-team-line',
    color: '#3B82F6',
    status: 'deployed',
    maturity: 84,
  },
  {
    id: 3,
    number: '03',
    name: 'Recrutement Experts™',
    mission: 'Identifier consultants, experts sectoriels, économistes, financiers, actuaires, spécialistes ESG et experts BCEAO.',
    description: 'Moteur de sourcing expert connecté aux plateformes LinkedIn Recruiter, SeekOut et HireEZ. Notation automatique des profils selon adéquation mission, disponibilité, expérience sectorielle et tarifs. Vivier permanent de 4 200+ experts qualifiés.',
    sources: ['LinkedIn Recruiter', 'SeekOut — Diversité & expertise', 'HireEZ — Sourcing AI', 'CVthèques partenaires'],
    tools: ['LinkedIn Recruiter — Sourcing', 'SeekOut — Analyse compétences', 'HireEZ — CRM recrutement'],
    deliverables: ['Vivier d\'experts permanent (4 200+)', 'Notation automatique profil/mission', 'Matrice disponibilité temps réel', 'Shortlist en moins de 4 heures'],
    kpis: [
      { label: 'Experts au vivier', value: '4 283', target: '10 000', icon: 'ri-user-star-line' },
      { label: 'Délai shortlist', value: '3.8h', target: '2h', icon: 'ri-timer-flash-line' },
      { label: 'Score adéquation moyen', value: '87/100', target: '95/100', icon: 'ri-check-double-line' },
      { label: 'Experts déployés/mois', value: '34', target: '80', icon: 'ri-user-follow-line' },
    ],
    icon: 'ri-user-search-line',
    color: '#8B5CF6',
    status: 'in_progress',
    maturity: 78,
  },
  {
    id: 4,
    number: '04',
    name: 'Marketing Digital™',
    mission: 'Accroître le trafic, les leads, les conversions et la notoriété de KHEPRA Experts.',
    description: 'Pilotage complet de la stratégie marketing digital : SEO, content marketing, campagnes LinkedIn, email nurturing, lead magnets. Intégration Semrush, Ahrefs, Surfer SEO et MarketMuse pour l\'optimisation continue du contenu.',
    sources: ['Semrush — SEO & Competitive', 'Ahrefs — Backlinks & Keywords', 'Surfer SEO — Content optimization', 'MarketMuse — Content strategy'],
    tools: ['Semrush — Suite complète', 'Ahrefs — Backlink intelligence', 'Surfer SEO — NLP optimization', 'MarketMuse — AI content planning'],
    deliverables: ['Plans éditoriaux SEO mensuels', 'Campagnes LinkedIn automatisées', 'Lead magnets et landing pages', 'Tableau de bord acquisition'],
    kpis: [
      { label: 'Trafic organique/mois', value: '48 500', target: '150 000', icon: 'ri-global-line' },
      { label: 'Taux conversion', value: '3.2%', target: '7%', icon: 'ri-percent-line' },
      { label: 'Coût acquisition lead', value: '18 400 FCFA', target: '8 000 FCFA', icon: 'ri-money-dollar-circle-line' },
      { label: 'DR Ahrefs', value: '54', target: '75', icon: 'ri-bar-chart-2-line' },
    ],
    icon: 'ri-megaphone-line',
    color: '#EC4899',
    status: 'deployed',
    maturity: 82,
  },
  {
    id: 5,
    number: '05',
    name: 'GEO & IA Visibility™',
    mission: 'Optimiser la visibilité de KHEPRA dans ChatGPT, Gemini, Claude et Perplexity.',
    description: 'Stratégie GEO (Generative Engine Optimization) dédiée à l\'émergence de KHEPRA Experts dans les réponses des IA génératives. FAQ expertes, données structurées avancées, Knowledge Graph enrichi et contenus scientifiques citables.',
    sources: ['Profound — GEO analytics', 'Scrunch AI — Brand tracking IA', 'Google Search Console — LLM referrers'],
    tools: ['Profound — GEO dashboard', 'Scrunch AI — AI visibility', 'Schema.org — Structured data'],
    deliverables: ['Rapport GEO mensuel', 'FAQ optimisées pour IA', 'Knowledge Graph KHEPRA', 'Contenus citables par les LLM'],
    kpis: [
      { label: 'Citations IA/mois', value: '2 847', target: '10 000', icon: 'ri-robot-2-line' },
      { label: 'Score GEO général', value: '78/100', target: '95/100', icon: 'ri-radar-line' },
      { label: 'Présence ChatGPT', value: '68%', target: '90%', icon: 'ri-openai-line' },
      { label: 'FAQ optimisées', value: '124', target: '500', icon: 'ri-question-answer-line' },
    ],
    icon: 'ri-robot-2-line',
    color: '#10A37F',
    status: 'in_progress',
    maturity: 71,
  },
  {
    id: 6,
    number: '06',
    name: 'Social Intelligence™',
    mission: 'Surveiller la réputation, l\'influence, les concurrents et les tendances.',
    description: 'Veille sociale automatisée couvrant LinkedIn, Twitter/X et les médias spécialisés. Alertes réputationnelles, détection des signaux faibles, benchmark concurrentiel continu et identification des influenceurs clés par secteur.',
    sources: ['Brandwatch — Social listening', 'Sprout Social — Engagement', 'Hootsuite — Gestion multi-plateformes', 'LinkedIn Analytics'],
    tools: ['Brandwatch — Intelligence consommateur', 'Sprout Social — Analytics', 'Hootsuite — Publishing & monitoring'],
    deliverables: ['Tableau de bord réputationnel', 'Alertes d\'opportunités', 'Veille concurrentielle hebdomadaire', 'Rapport d\'influence trimestriel'],
    kpis: [
      { label: 'Mentions/mois', value: '1 842', target: '5 000', icon: 'ri-chat-3-line' },
      { label: 'Sentiment positif', value: '87%', target: '95%', icon: 'ri-emotion-happy-line' },
      { label: 'Share of voice', value: '32%', target: '50%', icon: 'ri-speaker-line' },
      { label: 'Influenceurs suivis', value: '156', target: '300', icon: 'ri-star-line' },
    ],
    icon: 'ri-share-line',
    color: '#06B6D4',
    status: 'deployed',
    maturity: 86,
  },
  {
    id: 7,
    number: '07',
    name: 'Financial Institution Watch™',
    mission: 'Surveiller BCEAO, Banque Africaine de Développement, Banque Mondiale, FMI.',
    description: 'Veille réglementaire et financière continue sur les institutions de Bretton Woods et les banques centrales africaines. Détection des projets financés, réformes en cours, financements disponibles et consultations publiques.',
    sources: ['BCEAO — Publications officielles', 'BAD — Projets & financements', 'Banque Mondiale — Procurement', 'FMI — Rapports pays'],
    tools: ['Gemini — Recherche web continue', 'ChatGPT — Synthèse documentaire', 'Claude — Analyse réglementaire'],
    deliverables: ['Projets financés — Alertes', 'Réformes réglementaires — Synthèses', 'Financements disponibles — Cartographie', 'Consultations publiques — Échéancier'],
    kpis: [
      { label: 'Projets suivis', value: '412', target: '1 000', icon: 'ri-building-2-line' },
      { label: 'Financements détectés', value: '87 Md FCFA', target: '250 Md', icon: 'ri-funds-line' },
      { label: 'Réformes monitorées', value: '38', target: '60', icon: 'ri-scales-3-line' },
      { label: 'Délai alerte', value: '6.5h', target: '2h', icon: 'ri-timer-line' },
    ],
    icon: 'ri-bank-line',
    color: '#059669',
    status: 'deployed',
    maturity: 91,
  },
  {
    id: 8,
    number: '08',
    name: 'Investors & Funds™',
    mission: 'Identifier fonds d\'investissement, family offices, banques d\'investissement, fonds ESG, fonds d\'impact.',
    description: 'Cartographie exhaustive du paysage des investisseurs actifs en Afrique. Profiling des family offices, identification des critères d\'investissement, scoring de probabilité d\'intérêt et matching automatique avec les missions KHEPRA.',
    sources: ['PitchBook — Private markets', 'Crunchbase — Startup & investors', 'Preqin — Alternative assets', 'AVCA — Africa VC Association'],
    tools: ['PitchBook — Deal & fund data', 'Crunchbase — Company intelligence', 'Preqin — LP & GP profiles'],
    deliverables: ['Cartographie investisseurs dynamique', 'Critères d\'investissement par fonds', 'Scoring probabilité d\'intérêt', 'Matching mission/investisseur'],
    kpis: [
      { label: 'Investisseurs suivis', value: '1 247', target: '5 000', icon: 'ri-funds-box-line' },
      { label: 'Family offices identifiés', value: '89', target: '200', icon: 'ri-home-3-line' },
      { label: 'Fonds ESG/Impact', value: '156', target: '400', icon: 'ri-plant-line' },
      { label: 'Matchings générés/mois', value: '28', target: '100', icon: 'ri-link-m' },
    ],
    icon: 'ri-funds-box-line',
    color: '#D97706',
    status: 'in_progress',
    maturity: 74,
  },
  {
    id: 9,
    number: '09',
    name: 'ONU et Bailleurs™',
    mission: 'Surveiller PNUD, UNICEF, PAM, Union Européenne et autres bailleurs multilatéraux.',
    description: 'Veille permanente sur les programmes des Nations Unies et de l\'Union Européenne en Afrique. Détection des projets, subventions, appels à propositions et missions d\'assistance technique. Préqualification automatique selon l\'expertise KHEPRA.',
    sources: ['UNDP — Procurement notices', 'UNICEF — Supply & procurement', 'WFP — Business opportunities', 'EU — TED & EuropeAid', 'Global Affairs Canada', 'AFD — Agence Française de Développement'],
    tools: ['Gemini — Veille multilatérale', 'Perplexity — Alertes temps réel', 'ChatGPT — Analyse et matching'],
    deliverables: ['Projets multilatéraux — Alertes', 'Subventions disponibles — Cartographie', 'Appels à propositions — Scoring', 'Missions AT — Préqualification'],
    kpis: [
      { label: 'Bailleurs suivis', value: '68', target: '150', icon: 'ri-node-tree' },
      { label: 'Projets détectés/mois', value: '234', target: '500', icon: 'ri-search-line' },
      { label: 'Subventions identifiées', value: '42 Md FCFA', target: '150 Md', icon: 'ri-hand-heart-line' },
      { label: 'Préqualifications', value: '18/mois', target: '50/mois', icon: 'ri-check-double-line' },
    ],
    icon: 'ri-global-line',
    color: '#2563EB',
    status: 'deployed',
    maturity: 83,
  },
  {
    id: 10,
    number: '10',
    name: 'International Business Development™',
    mission: 'Identifier nouveaux marchés, clients institutionnels, filières prioritaires et opportunités d\'expansion.',
    description: 'Analyse systématique des marchés émergents pour l\'expansion de KHEPRA Experts. Études d\'attractivité pays, analyse de la concurrence, identification des filières prioritaires et élaboration de plans de pénétration complets.',
    sources: ['World Bank Doing Business', 'IMF Country Reports', 'AfCFTA Secretariat', 'Chambres de commerce africaines'],
    tools: ['ChatGPT — Analyse marché', 'Claude — Études sectorielles', 'Gemini — Veille concurrentielle'],
    deliverables: ['Plans de pénétration par pays', 'Feuilles de route expansion', 'Matrice attractivité/risque', 'Priorisation pays — Scoring'],
    kpis: [
      { label: 'Pays analysés', value: '26', target: '54', icon: 'ri-flag-line' },
      { label: 'Plans de pénétration', value: '8', target: '20', icon: 'ri-road-map-line' },
      { label: 'Nouveaux marchés ouverts', value: '3', target: '12', icon: 'ri-door-line' },
      { label: 'Pipeline international', value: '47 missions', target: '150', icon: 'ri-flight-takeoff-line' },
    ],
    icon: 'ri-flight-takeoff-line',
    color: '#DC2626',
    status: 'in_progress',
    maturity: 69,
  },
];

export const MONITORED_ENTITIES: MonitoredEntity[] = [
  { type: 'Organisations', count: 50000, icon: 'ri-building-4-line', color: '#F59E0B' },
  { type: 'Bailleurs', count: 10000, icon: 'ri-hand-heart-line', color: '#8B5CF6' },
  { type: 'Investisseurs', count: 5000, icon: 'ri-funds-box-line', color: '#10B981' },
  { type: 'Entreprises', count: 20000, icon: 'ri-building-2-line', color: '#0EA5E9' },
  { type: 'Banques & IF', count: 1000, icon: 'ri-bank-line', color: '#EC4899' },
  { type: 'Plateformes AO', count: 500, icon: 'ri-file-search-line', color: '#F97316' },
];

export const VALIDATION_LEVELS: ValidationLevel[] = [
  { level: 1, name: 'Recherche Automatisée', description: 'Scan multi-source par les 10 agents. Couverture exhaustive des bases AO, bailleurs, investisseurs et institutions.', action: 'Gemini + Perplexity + base UNGM/DevAid/BAD', icon: 'ri-search-eye-line', color: '#0EA5E9' },
  { level: 2, name: 'Validation Croisée Multi-IA', description: 'Chaque opportunité est vérifiée par au moins 2 IA indépendantes. Confrontation des analyses et détection des divergences.', action: 'ChatGPT vs Claude vs Gemini', icon: 'ri-arrow-left-right-line', color: '#8B5CF6' },
  { level: 3, name: 'Contradiction Systématique', description: 'Un agent dédié à la contradiction teste chaque hypothèse. Identification proactive des angles morts et des biais.', action: 'Agent Contradicteur dédié — Devil\'s Advocate IA', icon: 'ri-contrast-2-line', color: '#EF4444' },
  { level: 4, name: 'Contrôle Qualité', description: 'Revue systématique par le Quality Controller : cohérence, sourcing, format, conformité aux standards Big Four.', action: 'KOS Quality Controller — 14 critères qualité', icon: 'ri-shield-check-line', color: '#F59E0B' },
  { level: 5, name: 'Validation Stratégique', description: 'Décision finale du Managing Partner Office. Alignement avec la stratégie KHEPRA, évaluation du ROI et arbitrage.', action: 'Managing Partner Office — Décision finale', icon: 'ri-vip-crown-line', color: '#10B981' },
];

export const BUSINESS_INTEL_KPIS: BusinessIntelKPI[] = [
  { id: 'ao-detectes', name: 'AO Détectés', category: 'opportunites', current: 347, target: 500, unit: '/mois', trend: 28, icon: 'ri-file-search-line', color: '#E07B39' },
  { id: 'ami-detectes', name: 'AMI Détectés', category: 'opportunites', current: 128, target: 200, unit: '/mois', trend: 12, icon: 'ri-megaphone-line', color: '#F59E0B' },
  { id: 'leads-generes', name: 'Leads Générés', category: 'opportunites', current: 586, target: 1200, unit: '/mois', trend: 45, icon: 'ri-user-add-line', color: '#10B981' },
  { id: 'partenaires-qualifies', name: 'Partenaires Qualifiés', category: 'partenariats', current: 284, target: 500, unit: 'actifs', trend: 22, icon: 'ri-team-line', color: '#3B82F6', subMetrics: [{ label: 'Banques', value: 48, target: 80 }, { label: 'Fonds', value: 72, target: 120 }, { label: 'Cabinets', value: 89, target: 150 }] },
  { id: 'partenariats-signes', name: 'Partenariats Signés', category: 'partenariats', current: 47, target: 100, unit: 'cumul', trend: 5, icon: 'ri-file-text-line', color: '#8B5CF6' },
  { id: 'trafic-organique', name: 'Trafic Organique', category: 'marketing', current: 48500, target: 150000, unit: 'visites/mois', trend: 8200, icon: 'ri-global-line', color: '#0EA5E9', subMetrics: [{ label: 'SEO', value: 32400, target: 100000 }, { label: 'Direct', value: 9800, target: 30000 }, { label: 'Social', value: 6300, target: 20000 }] },
  { id: 'visibilite-ia', name: 'Citations IA', category: 'geo', current: 2847, target: 10000, unit: '/mois', trend: 340, icon: 'ri-robot-2-line', color: '#10A37F', subMetrics: [{ label: 'ChatGPT', value: 1240, target: 5000 }, { label: 'Gemini', value: 890, target: 3000 }, { label: 'Claude', value: 470, target: 1500 }, { label: 'Perplexity', value: 247, target: 500 }] },
  { id: 'presence-ia', name: 'Présence Réponses IA', category: 'geo', current: 68, target: 90, unit: '%', trend: 5, icon: 'ri-radar-line', color: '#EC4899' },
  { id: 'propositions-soumises', name: 'Propositions Soumises', category: 'dev_commercial', current: 42, target: 80, unit: '/mois', trend: 6, icon: 'ri-file-text-line', color: '#14B8A6' },
  { id: 'contrats-gagnes', name: 'Contrats Gagnés', category: 'dev_commercial', current: 18, target: 35, unit: '/mois', trend: 3, icon: 'ri-trophy-line', color: '#F97316', subMetrics: [{ label: 'Conseil', value: 12, target: 20 }, { label: 'Formation', value: 4, target: 10 }, { label: 'Assistance technique', value: 2, target: 5 }] },
  { id: 'ca-genere', name: 'CA Généré', category: 'dev_commercial', current: 487000000, target: 1200000000, unit: 'FCFA/mois', trend: 62000000, icon: 'ri-money-dollar-circle-line', color: '#059669' },
];

export const BUSINESS_INTEL_GLOBAL_METRICS = {
  totalAgents: 75,
  agentsDeployed: 75,
  avgMaturity: 100,
  opportunitiesDetected: 580,
  partnersQualified: 420,
  leadsGenerated: 720,
  proposalsSubmitted: 68,
  contractsWon: 32,
  revenueGenerated: 850000000,
  geoCitations: 5200,
  organizationsMonitored: 92000,
  consolidationComplete: true,
};

export const LIVRABLE_STANDARDS: { icon: string; label: string; color: string }[] = [
  { icon: 'ri-search-eye-line', label: 'Identifier les opportunités avant les concurrents', color: '#E07B39' },
  { icon: 'ri-user-star-line', label: 'Recruter rapidement les meilleurs experts', color: '#8B5CF6' },
  { icon: 'ri-team-line', label: 'Développer un réseau international de partenaires', color: '#3B82F6' },
  { icon: 'ri-building-4-line', label: 'Augmenter la visibilité institutionnelle de KHEPRA Experts', color: '#059669' },
  { icon: 'ri-robot-2-line', label: 'Être cité par les moteurs IA majeurs', color: '#10A37F' },
  { icon: 'ri-user-add-line', label: 'Générer un flux continu de leads qualifiés', color: '#10B981' },
  { icon: 'ri-file-search-line', label: 'Soutenir les réponses aux AO, AMI et consultations', color: '#F59E0B' },
  { icon: 'ri-money-dollar-circle-line', label: 'Accroître les revenus conseil, formation et AT', color: '#F97316' },
  { icon: 'ri-dashboard-3-line', label: 'Produire des tableaux de bord décisionnels en temps réel', color: '#0EA5E9' },
  { icon: 'ri-medal-line', label: 'Fonctionner au standard de qualité des meilleures organisations mondiales', color: '#DC2626' },
];





