export const TRIMESTRIEL_AUTHORITY_KPIS = [
  { name: 'Domain Authority (DA)', value: 38, target: 50, unit: '/100', trend: 'up', change: '+3', id: 'da' },
  { name: 'Backlinks qualifiés', value: 42, target: 80, unit: '', trend: 'up', change: '+8', id: 'backlinks' },
  { name: 'Domaines référents', value: 28, target: 50, unit: '', trend: 'up', change: '+5', id: 'domains' },
  { name: 'Pages indexées Google', value: 847, target: 1200, unit: '', trend: 'up', change: '+124', id: 'indexed' },
];

export const TRIMESTRIEL_SEO_VISIBILITY = [
  { name: 'Mots-clés Top 3', value: 156, target: 300, unit: '', trend: 'up', change: '+22', id: 'kw_top3' },
  { name: 'Mots-clés Top 10', value: 423, target: 800, unit: '', trend: 'up', change: '+58', id: 'kw_top10' },
  { name: 'Trafic organique/mois', value: '12 450', target: '25 000', unit: '', trend: 'up', change: '+18%', id: 'traffic' },
  { name: 'CTR moyen', value: '4.2', target: '6.0', unit: '%', trend: 'stable', change: '+0.3', id: 'ctr' },
  { name: 'Impressions/mois', value: '295 000', target: '500 000', unit: '', trend: 'up', change: '+12%', id: 'impressions' },
  { name: 'Position moyenne', value: '8.4', target: '5.0', unit: '', trend: 'down', change: '-0.8', id: 'position' },
];

export const TRIMESTRIEL_AI_PERFORMANCE = [
  { name: 'Articles générés/mois', value: 34, target: 50, unit: '', trend: 'up', change: '+6', id: 'articles' },
  { name: 'Score conformité IA', value: 87, target: 95, unit: '/100', trend: 'up', change: '+4', id: 'compliance_ia' },
  { name: 'Délai moyen publication', value: '3.2', target: '1.5', unit: 'jours', trend: 'down', change: '-0.5', id: 'pub_delay' },
  { name: 'Taux détection fraude', value: '94.7', target: '98.0', unit: '%', trend: 'up', change: '+2.1', id: 'fraud_detection' },
  { name: 'Précision scoring ESG', value: '91.2', target: '96.0', unit: '%', trend: 'up', change: '+1.8', id: 'esg_precision' },
  { name: 'Temps réponse cockpit', value: '420', target: '200', unit: 'ms', trend: 'down', change: '-80', id: 'response_time' },
];

export const TRIMESTRIEL_OBSERVATORY_PUBLICATIONS = [
  { secteur: 'Banques', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'FinTechs', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'PME & ETI', t1: '—', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Énergie', t1: '—', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Agriculture', t1: '—', t2: 'En cours', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'ESG', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
  { secteur: 'Microfinance', t1: '✓', t2: '✓', t3: 'Planifié', t4: 'Planifié' },
];

export const TRIMESTRIEL_BACKLINK_PROGRESS = [
  { pillar: 'Domaines .edu', t1: 4, t2: 9, t3Target: 12, t4Target: 15 },
  { pillar: 'Médias africains', t1: 8, t2: 14, t3Target: 20, t4Target: 25 },
  { pillar: 'Think Tanks .org', t1: 2, t2: 5, t3Target: 8, t4Target: 10 },
  { pillar: 'Institutions', t1: 1, t2: 2, t3Target: 5, t4Target: 8 },
  { pillar: 'Partenaires tech', t1: 6, t2: 8, t3Target: 10, t4Target: 12 },
  { pillar: 'Associations pro', t1: 1, t2: 3, t3Target: 6, t4Target: 10 },
];

export const TRIMESTRIEL_GLOBAL_SCORE = {
  authorityScore: 38,
  authorityTarget: 50,
  seoScore: 423,
  seoTarget: 800,
  aiScore: 87,
  aiTarget: 95,
  backlinksAcquired: 42,
  backlinksTarget: 80,
  publicationsDone: 12,
  publicationsTarget: 24,
  lastRefresh: '2026-06-29T08:00:00Z',
};



