// ============================================================================
// KOS AUTONOMOUS KNOWLEDGE PIPELINE™
// [CRAWL] → 500+ centres → [NORMALIZE] → [SEED] → [KOS-MEMEX]
//     ↑                                                    ↓
//     └────────── [KOS-FLOW] ← [EVAL] ← [KOS-SWARM-100] ←┘
// ============================================================================

// ─── PIPELINE STAGES ────────────────────────────────────────────────

export interface PipelineStage {
  id: string;
  name: string;
  icon: string;
  phase: number;
  color: string;
  description: string;
  status: 'active' | 'idle' | 'processing';
  throughput: string;
  latency: string;
  uptime: string;
  metrics: { label: string; value: string; trend: 'up' | 'down' | 'stable' }[];
}

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'crawl',
    name: 'CRAWL',
    icon: 'ri-radar-line',
    phase: 1,
    color: '#D97706',
    description: 'Moteur universel de crawling — 500+ centres de ressources réglementaires, académiques, institutionnels et techniques scannés en continu.',
    status: 'active',
    throughput: '12 450 req/h',
    latency: '187ms p95',
    uptime: '99.93%',
    metrics: [
      { label: 'Centres actifs', value: '512', trend: 'up' },
      { label: 'Documents crawlés/jour', value: '84 200', trend: 'up' },
      { label: 'Taux découverte', value: '3.8', trend: 'up' },
      { label: 'Sources nouvelles/sem', value: '8', trend: 'up' },
    ],
  },
  {
    id: 'normalize',
    name: 'NORMALIZE',
    icon: 'ri-equalizer-line',
    phase: 2,
    color: '#0891B2',
    description: 'Pipeline de normalisation sémantique — Nettoyage, déduplication, extraction entités, structuration JSON-LD, alignement ontologique.',
    status: 'active',
    throughput: '8 900 docs/h',
    latency: '42ms p95',
    uptime: '99.97%',
    metrics: [
      { label: 'Docs normalisés/jour', value: '78 500', trend: 'up' },
      { label: 'Taux déduplication', value: '12.4', trend: 'down' },
      { label: 'Entités extraites/jour', value: '2.1M', trend: 'up' },
      { label: 'Précision NER', value: '96.8', trend: 'up' },
    ],
  },
  {
    id: 'seed',
    name: 'SEED',
    icon: 'ri-database-2-line',
    phase: 3,
    color: '#7C3AED',
    description: 'Moteur de seeding vectoriel — Injection dans Qdrant (5 collections), Supabase (rag_documents, rag_chunks), IndexedDB local. Triple persistance.',
    status: 'active',
    throughput: '5 200 docs/h',
    latency: '28ms p95',
    uptime: '99.99%',
    metrics: [
      { label: 'Embeddings générés/jour', value: '680K', trend: 'up' },
      { label: 'Documents seedés', value: '2.78M', trend: 'up' },
      { label: 'Collections Qdrant', value: '5', trend: 'stable' },
      { label: 'Taux persistance', value: '100', trend: 'stable' },
    ],
  },
  {
    id: 'memex',
    name: 'KOS-MEMEX',
    icon: 'ri-brain-line',
    phase: 4,
    color: '#10A37F',
    description: 'Memory Extender — Index de connaissance central. 2.78M embeddings, 15 domaines, 54 sources. Recherche sémantique cross-collection, raisonnement multi-sauts, inférence.',
    status: 'active',
    throughput: '3 400 requêtes/h',
    latency: '15ms p95',
    uptime: '99.995%',
    metrics: [
      { label: 'Embeddings totaux', value: '2.78M', trend: 'up' },
      { label: 'Domaines couverts', value: '15', trend: 'stable' },
      { label: 'Précision recherche', value: '94.2', trend: 'up' },
      { label: 'Rappel sémantique', value: '91.7', trend: 'up' },
    ],
  },
  {
    id: 'swarm',
    name: 'KOS-SWARM-100',
    icon: 'ri-group-line',
    phase: 5,
    color: '#E11D48',
    description: 'Essaim de 100 agents IA spécialisés — Analyse, scoring, validation, enrichissement, cross-référencement. Chaque agent a un domaine d\'expertise et un protocole de vérification.',
    status: 'processing',
    throughput: '1 200 tâches/h',
    latency: '340ms p95',
    uptime: '99.82%',
    metrics: [
      { label: 'Agents actifs', value: '100', trend: 'stable' },
      { label: 'Tâches/jour', value: '28 800', trend: 'up' },
      { label: 'Score qualité moyen', value: '9.4', trend: 'up' },
      { label: 'Auto-corrections/jour', value: '340', trend: 'down' },
    ],
  },
  {
    id: 'eval',
    name: 'EVAL',
    icon: 'ri-check-double-line',
    phase: 6,
    color: '#059669',
    description: 'Moteur d\'évaluation continue — Scoring Big Four 9 dimensions, détection hallucinations, validation croisée, boucle qualité fermée.',
    status: 'active',
    throughput: '2 800 évaluations/h',
    latency: '85ms p95',
    uptime: '99.95%',
    metrics: [
      { label: 'Évaluations/jour', value: '67 200', trend: 'up' },
      { label: 'Score conformité', value: '96.4', trend: 'up' },
      { label: 'Taux hallucination', value: '0.8', trend: 'down' },
      { label: 'Validation croisée', value: '100', trend: 'stable' },
    ],
  },
  {
    id: 'flow',
    name: 'KOS-FLOW',
    icon: 'ri-loop-left-line',
    phase: 7,
    color: '#2563EB',
    description: 'Boucle de feedback fermée — Les évaluations nourrissent le ré-entraînement, qui ajuste les règles de crawl, affine la normalisation, et réoriente le seeding. Auto-amélioration continue.',
    status: 'active',
    throughput: 'Cycle 24h',
    latency: 'Feedback 4.8h',
    uptime: '99.99%',
    metrics: [
      { label: 'Cycles complétés', value: '147', trend: 'up' },
      { label: 'Règles ajustées', value: '2 340', trend: 'up' },
      { label: 'Gain précision/cycle', value: '+0.12', trend: 'up' },
      { label: 'Sources réorientées', value: '85', trend: 'up' },
    ],
  },
];

// ─── 500+ CENTRES DE RESSOURCES ────────────────────────────────────

export interface KnowledgeCenter {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  url: string;
  country: string;
  documentsCrawled: number;
  lastCrawl: string;
  status: 'active' | 'degraded' | 'blocked' | 'new';
  priority: 'critical' | 'high' | 'medium' | 'low';
  crawlFrequency: string;
  relevanceScore: number;
}

export const KNOWLEDGE_CENTERS: KnowledgeCenter[] = [
  // RÉGULATEURS (80 centres)
  { id: 'bc-001', name: 'BCEAO — Banque Centrale des États de l\'Afrique de l\'Ouest', category: 'Régulateurs', subcategory: 'Banques Centrales', url: 'www.bceao.int', country: 'UEMOA', documentsCrawled: 4520, lastCrawl: '2026-07-05T04:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 6h', relevanceScore: 98 },
  { id: 'bc-002', name: 'BEAC — Banque des États de l\'Afrique Centrale', category: 'Régulateurs', subcategory: 'Banques Centrales', url: 'www.beac.int', country: 'CEMAC', documentsCrawled: 2840, lastCrawl: '2026-07-05T04:15:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 6h', relevanceScore: 96 },
  { id: 'rg-001', name: 'COBAC — Commission Bancaire de l\'Afrique Centrale', category: 'Régulateurs', subcategory: 'Commissions Bancaires', url: 'www.cobac-beac.org', country: 'CEMAC', documentsCrawled: 1890, lastCrawl: '2026-07-05T04:30:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 4h', relevanceScore: 97 },
  { id: 'rg-002', name: 'AMF-UMOA — Autorité des Marchés Financiers UEMOA', category: 'Régulateurs', subcategory: 'Marchés Financiers', url: 'www.amf-umoa.org', country: 'UEMOA', documentsCrawled: 1200, lastCrawl: '2026-07-05T05:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 92 },
  { id: 'rg-003', name: 'COSUMAF — Commission de Surveillance du Marché Financier CEMAC', category: 'Régulateurs', subcategory: 'Marchés Financiers', url: 'www.cosumaf.org', country: 'CEMAC', documentsCrawled: 890, lastCrawl: '2026-07-05T05:15:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 90 },
  { id: 'rg-004', name: 'CIMA — Conférence Interafricaine des Marchés d\'Assurance', category: 'Régulateurs', subcategory: 'Assurance', url: 'www.cima-afrique.org', country: 'Afrique', documentsCrawled: 1560, lastCrawl: '2026-07-05T05:30:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 91 },
  { id: 'rg-005', name: 'OHADA — Organisation pour l\'Harmonisation du Droit des Affaires', category: 'Régulateurs', subcategory: 'Droit des Affaires', url: 'www.ohada.org', country: 'Afrique', documentsCrawled: 3240, lastCrawl: '2026-07-05T04:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 8h', relevanceScore: 95 },
  { id: 'rg-006', name: 'GAFI — Groupe d\'Action Financière', category: 'Régulateurs', subcategory: 'LCB-FT', url: 'www.fatf-gafi.org', country: 'International', documentsCrawled: 2780, lastCrawl: '2026-07-05T06:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 96 },
  { id: 'rg-007', name: 'GIABA — Groupe Intergouvernemental d\'Action contre le Blanchiment', category: 'Régulateurs', subcategory: 'LCB-FT', url: 'www.giaba.org', country: 'Afrique de l\'Ouest', documentsCrawled: 1120, lastCrawl: '2026-07-05T06:30:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 93 },
  { id: 'rg-008', name: 'GABAC — Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale', category: 'Régulateurs', subcategory: 'LCB-FT', url: 'www.gabac.org', country: 'CEMAC', documentsCrawled: 980, lastCrawl: '2026-07-05T06:45:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 92 },

  // NORMALISATEURS (60 centres)
  { id: 'nm-001', name: 'ISO — International Organization for Standardization', category: 'Normalisateurs', subcategory: 'Standards Internationaux', url: 'www.iso.org', country: 'International', documentsCrawled: 12500, lastCrawl: '2026-07-05T03:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 24h', relevanceScore: 94 },
  { id: 'nm-002', name: 'IASB — International Accounting Standards Board (IFRS)', category: 'Normalisateurs', subcategory: 'Comptabilité', url: 'www.ifrs.org', country: 'International', documentsCrawled: 8900, lastCrawl: '2026-07-05T03:30:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 24h', relevanceScore: 93 },
  { id: 'nm-003', name: 'COSO — Committee of Sponsoring Organizations', category: 'Normalisateurs', subcategory: 'Contrôle Interne', url: 'www.coso.org', country: 'USA', documentsCrawled: 3400, lastCrawl: '2026-07-05T04:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Hebdomadaire', relevanceScore: 91 },
  { id: 'nm-004', name: 'NIST — National Institute of Standards and Technology', category: 'Normalisateurs', subcategory: 'Cybersécurité', url: 'www.nist.gov', country: 'USA', documentsCrawled: 15200, lastCrawl: '2026-07-05T05:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Quotidienne', relevanceScore: 92 },
  { id: 'nm-005', name: 'ISACA — Information Systems Audit and Control Association (COBIT)', category: 'Normalisateurs', subcategory: 'Gouvernance IT', url: 'www.isaca.org', country: 'USA', documentsCrawled: 4200, lastCrawl: '2026-07-04T10:00:00Z', status: 'active', priority: 'medium', crawlFrequency: 'Hebdomadaire', relevanceScore: 87 },
  { id: 'nm-006', name: 'GRI — Global Reporting Initiative', category: 'Normalisateurs', subcategory: 'ESG', url: 'www.globalreporting.org', country: 'International', documentsCrawled: 5600, lastCrawl: '2026-07-04T12:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 90 },
  { id: 'nm-007', name: 'ISSB — International Sustainability Standards Board', category: 'Normalisateurs', subcategory: 'ESG', url: 'www.ifrs.org/issb', country: 'International', documentsCrawled: 2800, lastCrawl: '2026-07-05T06:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Quotidienne', relevanceScore: 94 },

  // PARTENAIRES TECHNIQUES & FINANCIERS (90 centres)
  { id: 'pt-001', name: 'FMI — Fonds Monétaire International', category: 'Partenaires Techniques', subcategory: 'Institutions Financières', url: 'www.imf.org', country: 'International', documentsCrawled: 24500, lastCrawl: '2026-07-05T02:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 95 },
  { id: 'pt-002', name: 'Banque Mondiale — Groupe Banque Mondiale (IDA/IBRD)', category: 'Partenaires Techniques', subcategory: 'Institutions Financières', url: 'www.worldbank.org', country: 'International', documentsCrawled: 31200, lastCrawl: '2026-07-05T02:30:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 97 },
  { id: 'pt-003', name: 'BAD — Banque Africaine de Développement', category: 'Partenaires Techniques', subcategory: 'Institutions Financières', url: 'www.afdb.org', country: 'Afrique', documentsCrawled: 18500, lastCrawl: '2026-07-05T03:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 96 },
  { id: 'pt-004', name: 'AFD — Agence Française de Développement', category: 'Partenaires Techniques', subcategory: 'Agences de Développement', url: 'www.afd.fr', country: 'France', documentsCrawled: 12400, lastCrawl: '2026-07-05T04:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 92 },
  { id: 'pt-005', name: 'PNUD — Programme des Nations Unies pour le Développement', category: 'Partenaires Techniques', subcategory: 'ONU', url: 'www.undp.org', country: 'International', documentsCrawled: 18700, lastCrawl: '2026-07-04T14:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 89 },
  { id: 'pt-006', name: 'OCDE — Organisation de Coopération et de Développement Économiques', category: 'Partenaires Techniques', subcategory: 'Institutions Internationales', url: 'www.oecd.org', country: 'International', documentsCrawled: 28900, lastCrawl: '2026-07-05T01:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 94 },
  { id: 'pt-007', name: 'BRI — Banque des Règlements Internationaux (Bâle)', category: 'Partenaires Techniques', subcategory: 'Institutions Financières', url: 'www.bis.org', country: 'International', documentsCrawled: 9800, lastCrawl: '2026-07-05T07:00:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 12h', relevanceScore: 93 },
  { id: 'pt-008', name: 'OMC — Organisation Mondiale du Commerce', category: 'Partenaires Techniques', subcategory: 'Institutions Internationales', url: 'www.wto.org', country: 'International', documentsCrawled: 16400, lastCrawl: '2026-07-04T08:00:00Z', status: 'active', priority: 'medium', crawlFrequency: 'Hebdomadaire', relevanceScore: 82 },

  // INSTITUTIONS INTERNATIONALES & DÉVELOPPEMENT (80 centres)
  { id: 'ii-001', name: 'CEDEAO — Communauté Économique des États de l\'Afrique de l\'Ouest', category: 'Institutions', subcategory: 'Organisations Régionales', url: 'www.ecowas.int', country: 'Afrique de l\'Ouest', documentsCrawled: 8900, lastCrawl: '2026-07-05T08:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 91 },
  { id: 'ii-002', name: 'CEMAC — Communauté Économique et Monétaire de l\'Afrique Centrale', category: 'Institutions', subcategory: 'Organisations Régionales', url: 'www.cemac.int', country: 'CEMAC', documentsCrawled: 6700, lastCrawl: '2026-07-05T08:15:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 93 },
  { id: 'ii-003', name: 'UEMOA — Union Économique et Monétaire Ouest-Africaine', category: 'Institutions', subcategory: 'Organisations Régionales', url: 'www.uemoa.int', country: 'UEMOA', documentsCrawled: 9800, lastCrawl: '2026-07-05T08:30:00Z', status: 'active', priority: 'critical', crawlFrequency: 'Toutes les 8h', relevanceScore: 95 },
  { id: 'ii-004', name: 'UA — Union Africaine', category: 'Institutions', subcategory: 'Organisations Continentales', url: 'www.au.int', country: 'Afrique', documentsCrawled: 12300, lastCrawl: '2026-07-05T09:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 88 },
  { id: 'ii-005', name: 'BOAD — Banque Ouest-Africaine de Développement', category: 'Institutions', subcategory: 'Banques de Développement', url: 'www.boad.org', country: 'UEMOA', documentsCrawled: 4500, lastCrawl: '2026-07-05T04:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 90 },

  // 200 UNIVERSITÉS (échantillon représentatif)
  { id: 'un-001', name: 'Harvard University — Kennedy School', category: 'Universités', subcategory: 'Top 20 Mondial', url: 'www.hks.harvard.edu', country: 'USA', documentsCrawled: 45600, lastCrawl: '2026-07-05T10:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Hebdomadaire', relevanceScore: 85 },
  { id: 'un-002', name: 'London School of Economics (LSE)', category: 'Universités', subcategory: 'Top 20 Mondial', url: 'www.lse.ac.uk', country: 'UK', documentsCrawled: 38900, lastCrawl: '2026-07-05T10:15:00Z', status: 'active', priority: 'high', crawlFrequency: 'Hebdomadaire', relevanceScore: 87 },
  { id: 'un-003', name: 'Sciences Po Paris — École de Droit', category: 'Universités', subcategory: 'Top 20 Mondial', url: 'www.sciencespo.fr', country: 'France', documentsCrawled: 23400, lastCrawl: '2026-07-05T10:30:00Z', status: 'active', priority: 'high', crawlFrequency: 'Hebdomadaire', relevanceScore: 84 },
  { id: 'un-004', name: 'MIT — Sloan School of Management', category: 'Universités', subcategory: 'Top 20 Mondial', url: 'mitsloan.mit.edu', country: 'USA', documentsCrawled: 31200, lastCrawl: '2026-07-05T11:00:00Z', status: 'active', priority: 'medium', crawlFrequency: 'Hebdomadaire', relevanceScore: 82 },
  { id: 'un-005', name: 'UCAD — Université Cheikh Anta Diop (FASEG)', category: 'Universités', subcategory: 'Afrique', url: 'www.ucad.sn', country: 'Sénégal', documentsCrawled: 8900, lastCrawl: '2026-07-05T12:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Hebdomadaire', relevanceScore: 88 },
  { id: 'un-006', name: 'HEC Paris — Research', category: 'Universités', subcategory: 'Top 20 Mondial', url: 'www.hec.edu', country: 'France', documentsCrawled: 15600, lastCrawl: '2026-07-05T11:30:00Z', status: 'active', priority: 'medium', crawlFrequency: 'Hebdomadaire', relevanceScore: 81 },

  // MÉDIAS ÉCONOMIQUES (40 centres)
  { id: 'md-001', name: 'Financial Times — Africa Desk', category: 'Médias', subcategory: 'Finance Internationale', url: 'www.ft.com', country: 'UK', documentsCrawled: 28900, lastCrawl: '2026-07-05T07:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 85 },
  { id: 'md-002', name: 'Reuters — Africa Finance', category: 'Médias', subcategory: 'Finance Internationale', url: 'www.reuters.com', country: 'International', documentsCrawled: 45200, lastCrawl: '2026-07-05T07:15:00Z', status: 'active', priority: 'high', crawlFrequency: 'Toutes les 4h', relevanceScore: 88 },
  { id: 'md-003', name: 'Jeune Afrique — Business & Finance', category: 'Médias', subcategory: 'Afrique Francophone', url: 'www.jeuneafrique.com', country: 'Afrique', documentsCrawled: 34500, lastCrawl: '2026-07-05T07:30:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 90 },
  { id: 'md-004', name: 'Financial Afrik', category: 'Médias', subcategory: 'Afrique Francophone', url: 'www.financialafrik.com', country: 'Afrique', documentsCrawled: 12800, lastCrawl: '2026-07-05T08:00:00Z', status: 'active', priority: 'high', crawlFrequency: 'Quotidienne', relevanceScore: 89 },
  { id: 'md-005', name: 'Ecofin — Agence d\'Information Financière', category: 'Médias', subcategory: 'Afrique Francophone', url: 'www.ecofinagency.com', country: 'Afrique', documentsCrawled: 9800, lastCrawl: '2026-07-05T08:15:00Z', status: 'active', priority: 'medium', crawlFrequency: 'Quotidienne', relevanceScore: 87 },
];

// ─── SWARM-100 AGENTS ──────────────────────────────────────────────

export interface SwarmAgent {
  id: string;
  name: string;
  domain: string;
  icon: string;
  status: 'optimal' | 'active' | 'idle';
  tasksProcessed: number;
  accuracy: number;
  specialization: string;
  outputs: string;
  lastActive: string;
}

export const SWARM_AGENTS: SwarmAgent[] = [
  { id: 'SW-001', name: 'Regulatory Text Classifier', domain: 'Classification', icon: 'ri-price-tag-3-line', status: 'optimal', tasksProcessed: 892400, accuracy: 98.7, specialization: 'Classification multi-label textes réglementaires (BCEAO, COBAC, OHADA, GAFI)', outputs: 'Tags réglementaires + Métadonnées structurées', lastActive: '2026-07-05T14:30:00Z' },
  { id: 'SW-002', name: 'Entity Extraction Engine', domain: 'NER', icon: 'ri-text-spacing', status: 'optimal', tasksProcessed: 2100000, accuracy: 96.8, specialization: 'Extraction entités nommées : régulateurs, articles, dates, sanctions, seuils prudentiels', outputs: 'Entités JSON-LD + Graphe de relations', lastActive: '2026-07-05T14:31:00Z' },
  { id: 'SW-003', name: 'Cross-Reference Validator', domain: 'Validation', icon: 'ri-arrow-left-right-line', status: 'optimal', tasksProcessed: 1567800, accuracy: 97.2, specialization: 'Vérification croisée des citations inter-textes réglementaires', outputs: 'Matrice de cohérence + Alertes contradiction', lastActive: '2026-07-05T14:32:00Z' },
  { id: 'SW-004', name: 'Prudential Ratio Analyzer', domain: 'Finance', icon: 'ri-bar-chart-2-line', status: 'optimal', tasksProcessed: 342000, accuracy: 95.4, specialization: 'Analyse ratios prudentiels BCEAO/COBAC (solvabilité, liquidité, division risques)', outputs: 'Dashboards ratios + Alertes seuils', lastActive: '2026-07-05T14:28:00Z' },
  { id: 'SW-005', name: 'AML/CFT Compliance Scanner', domain: 'Compliance', icon: 'ri-shield-user-line', status: 'optimal', tasksProcessed: 567800, accuracy: 96.1, specialization: 'Scan conformité LBC-FT GAFI/GIABA/GABAC + détection gaps', outputs: 'Rapports conformité + Plans remédiation', lastActive: '2026-07-05T14:29:00Z' },
  { id: 'SW-006', name: 'Semantic Deduplicator', domain: 'Qualité', icon: 'ri-contrast-drop-2-line', status: 'optimal', tasksProcessed: 3456000, accuracy: 99.1, specialization: 'Déduplication sémantique — détection paraphrases, doublons inter-sources', outputs: 'Corpus dédupliqué + Rapport redondances', lastActive: '2026-07-05T14:33:00Z' },
  { id: 'SW-007', name: 'Ontology Aligner', domain: 'Sémantique', icon: 'ri-link-m', status: 'active', tasksProcessed: 890000, accuracy: 92.8, specialization: 'Alignement ontologique inter-juridictions (UEMOA vs CEMAC vs OHADA vs GAFI)', outputs: 'Mappings ontologiques + Glossaire unifié', lastActive: '2026-07-05T14:27:00Z' },
  { id: 'SW-008', name: 'Legal Citation Verifier', domain: 'Validation', icon: 'ri-scales-3-line', status: 'optimal', tasksProcessed: 1240000, accuracy: 98.4, specialization: 'Vérification juridique — existence, validité, non-abrogation des textes cités', outputs: 'Rapport fiabilité juridique + Indice KOS', lastActive: '2026-07-05T14:34:00Z' },
  { id: 'SW-009', name: 'ESG Taxonomy Tagger', domain: 'ESG', icon: 'ri-leaf-line', status: 'active', tasksProcessed: 456000, accuracy: 93.2, specialization: 'Tagging ESG — alignement GRI, ISSB, Taxonomie Verte UEMOA', outputs: 'Métadonnées ESG + Score durabilité', lastActive: '2026-07-05T14:25:00Z' },
  { id: 'SW-010', name: 'Risk Matrix Builder', domain: 'Risques', icon: 'ri-alert-line', status: 'optimal', tasksProcessed: 678000, accuracy: 94.8, specialization: 'Construction automatique matrices de risques (probabilité × impact × mitigation)', outputs: 'Matrices de risques interactives', lastActive: '2026-07-05T14:35:00Z' },
  { id: 'SW-011', name: 'Multilingual Translator', domain: 'Traduction', icon: 'ri-translate-2', status: 'optimal', tasksProcessed: 2340000, accuracy: 95.6, specialization: 'Traduction automatique FR↔EN↔PT des textes réglementaires africains', outputs: 'Corpus multilingue aligné', lastActive: '2026-07-05T14:30:00Z' },
  { id: 'SW-012', name: 'Knowledge Graph Linker', domain: 'Knowledge', icon: 'ri-node-tree', status: 'optimal', tasksProcessed: 890000, accuracy: 97.8, specialization: 'Création liens sémantiques entre entités du Knowledge Graph (2 847 nœuds)', outputs: 'Graphe de connaissances enrichi', lastActive: '2026-07-05T14:31:00Z' },
  { id: 'SW-013', name: 'Hallucination Detector', domain: 'Qualité', icon: 'ri-eye-off-line', status: 'optimal', tasksProcessed: 3450000, accuracy: 99.3, specialization: 'Détection hallucinations — assertions non sourcées, contradictions, anachronismes', outputs: 'Rapport hallucinations + Blocage', lastActive: '2026-07-05T14:32:00Z' },
  { id: 'SW-014', name: 'Content Freshness Monitor', domain: 'Qualité', icon: 'ri-time-line', status: 'active', tasksProcessed: 1560000, accuracy: 98.9, specialization: 'Monitoring fraîcheur — détection textes obsolètes, nouvelles versions, abrogations', outputs: 'Alertes obsolescence + Plan mise à jour', lastActive: '2026-07-05T14:28:00Z' },
  { id: 'SW-015', name: 'Source Authority Scorer', domain: 'Évaluation', icon: 'ri-medal-line', status: 'optimal', tasksProcessed: 2340000, accuracy: 96.7, specialization: 'Scoring autorité des sources — officielle, académique, média, think tank, Big Four', outputs: 'Score autorité par source + Poids', lastActive: '2026-07-05T14:33:00Z' },
];

// ─── MEMEX INDEX ────────────────────────────────────────────────────

export interface MemexDomain {
  id: string;
  name: string;
  icon: string;
  embeddings: number;
  documents: number;
  sources: number;
  searchAccuracy: number;
  lastUpdated: string;
  topEntities: string[];
}

export const MEMEX_DOMAINS: MemexDomain[] = [
  { id: 'mx-rg', name: 'Régulation Bancaire', icon: 'ri-bank-line', embeddings: 520000, documents: 45200, sources: 85, searchAccuracy: 96.8, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['BCEAO', 'COBAC', 'Bâle III', 'Ratio Solvabilité', 'IFRS 9'] },
  { id: 'mx-lb', name: 'LCB-FT & Conformité', icon: 'ri-shield-check-line', embeddings: 380000, documents: 28900, sources: 62, searchAccuracy: 95.4, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['GAFI', 'GIABA', 'GABAC', '40 Recommandations', 'KYC/CDD'] },
  { id: 'mx-gv', name: 'Gouvernance & Audit', icon: 'ri-building-2-line', embeddings: 410000, documents: 31200, sources: 58, searchAccuracy: 94.1, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['COSO', 'OHADA', 'ISO 37000', 'Conseil Administration', 'Audit Interne'] },
  { id: 'mx-es', name: 'ESG & Finance Durable', icon: 'ri-leaf-line', embeddings: 290000, documents: 18500, sources: 42, searchAccuracy: 92.8, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['ISSB', 'GRI', 'Taxonomie Verte', 'IFRS S1/S2', 'NGFS'] },
  { id: 'mx-pt', name: 'Prix de Transfert & Fiscalité', icon: 'ri-money-dollar-circle-line', embeddings: 210000, documents: 12400, sources: 35, searchAccuracy: 93.5, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['BEPS', 'OCDE', 'Action 13', 'Master File', 'CUP'] },
  { id: 'mx-cy', name: 'Cybersécurité & Résilience', icon: 'ri-shield-flash-line', embeddings: 340000, documents: 22300, sources: 48, searchAccuracy: 94.7, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['NIST CSF', 'ISO 27001', 'DORA', 'COBAC R-2025', 'OWASP'] },
  { id: 'mx-mf', name: 'Microfinance & Inclusion', icon: 'ri-hand-heart-line', embeddings: 250000, documents: 15600, sources: 38, searchAccuracy: 93.2, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['SFD', 'Instruction BCEAO', 'Ratios Prudentiels', 'Agrément', 'EMF'] },
  { id: 'mx-fi', name: 'Finance Islamique', icon: 'ri-moon-line', embeddings: 120000, documents: 7800, sources: 22, searchAccuracy: 91.8, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['BCEAO 003-2018', 'BCEAO 004-2018', 'BCEAO 005-2018', 'Sharia', 'Murabaha'] },
  { id: 'mx-fn', name: 'FinTech & Innovation', icon: 'ri-smartphone-line', embeddings: 180000, documents: 11200, sources: 34, searchAccuracy: 92.4, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['AMF-UEMOA', 'Sandbox', 'PSP', 'EME', 'Open Banking'] },
  { id: 'mx-rd', name: 'Recherche & Think Tank', icon: 'ri-book-open-line', embeddings: 280000, documents: 22400, sources: 65, searchAccuracy: 94.5, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['Brookings', 'Chatham House', 'NBER', 'SSRN', 'Policy Brief'] },
  { id: 'mx-ac', name: 'Académique & Universitaire', icon: 'ri-graduation-cap-line', embeddings: 190000, documents: 15200, sources: 200, searchAccuracy: 90.2, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['Harvard', 'LSE', 'Sciences Po', 'MIT', 'UCAD'] },
  { id: 'mx-ec', name: 'Économie & Statistiques', icon: 'ri-line-chart-line', embeddings: 310000, documents: 34500, sources: 45, searchAccuracy: 95.1, lastUpdated: '2026-07-05T14:00:00Z', topEntities: ['FMI', 'Banque Mondiale', 'BAD', 'OCDE', 'PIB'] },
];

// ─── FEEDBACK LOOP METRICS ──────────────────────────────────────────

export interface FeedbackCycle {
  cycle: number;
  date: string;
  crawlQuality: number;
  normalizationPrecision: number;
  seedEfficiency: number;
  memexRecall: number;
  swarmAccuracy: number;
  evalScore: number;
  improvements: number;
  newSources: number;
  rulesAdjusted: number;
}

export const FEEDBACK_CYCLES: FeedbackCycle[] = [
  { cycle: 140, date: '2026-06-28', crawlQuality: 92.4, normalizationPrecision: 94.8, seedEfficiency: 91.2, memexRecall: 89.7, swarmAccuracy: 91.5, evalScore: 88.2, improvements: 12, newSources: 5, rulesAdjusted: 18 },
  { cycle: 141, date: '2026-06-29', crawlQuality: 92.8, normalizationPrecision: 95.1, seedEfficiency: 91.8, memexRecall: 90.2, swarmAccuracy: 92.0, evalScore: 88.9, improvements: 10, newSources: 6, rulesAdjusted: 15 },
  { cycle: 142, date: '2026-06-30', crawlQuality: 93.2, normalizationPrecision: 95.5, seedEfficiency: 92.4, memexRecall: 90.8, swarmAccuracy: 92.6, evalScore: 89.5, improvements: 14, newSources: 4, rulesAdjusted: 22 },
  { cycle: 143, date: '2026-07-01', crawlQuality: 93.7, normalizationPrecision: 95.8, seedEfficiency: 92.9, memexRecall: 91.3, swarmAccuracy: 93.1, evalScore: 90.2, improvements: 11, newSources: 7, rulesAdjusted: 19 },
  { cycle: 144, date: '2026-07-02', crawlQuality: 94.1, normalizationPrecision: 96.0, seedEfficiency: 93.5, memexRecall: 91.8, swarmAccuracy: 93.7, evalScore: 91.0, improvements: 13, newSources: 5, rulesAdjusted: 24 },
  { cycle: 145, date: '2026-07-03', crawlQuality: 94.5, normalizationPrecision: 96.2, seedEfficiency: 94.0, memexRecall: 92.3, swarmAccuracy: 94.2, evalScore: 91.8, improvements: 9, newSources: 8, rulesAdjusted: 16 },
  { cycle: 146, date: '2026-07-04', crawlQuality: 94.8, normalizationPrecision: 96.5, seedEfficiency: 94.5, memexRecall: 92.8, swarmAccuracy: 94.6, evalScore: 92.5, improvements: 15, newSources: 6, rulesAdjusted: 20 },
  { cycle: 147, date: '2026-07-05', crawlQuality: 95.2, normalizationPrecision: 96.8, seedEfficiency: 95.0, memexRecall: 93.4, swarmAccuracy: 95.0, evalScore: 93.2, improvements: 8, newSources: 4, rulesAdjusted: 14 },
];

// ─── PIPELINE GLOBAL STATS ──────────────────────────────────────────

export const PIPELINE_GLOBAL_STATS = {
  pipelineName: 'KOS Autonomous Knowledge Pipeline™',
  version: 'v2.0 — Full Closed Loop',
  status: 'ACTIVE',
  totalCentersCrawled: 512,
  totalCentersActive: 498,
  totalCentersDegraded: 8,
  totalCentersBlocked: 4,
  totalCentersNew: 2,
  totalDocumentsIndexed: '2.78M',
  totalEmbeddings: '2.78M',
  totalSwarmAgents: 100,
  totalSwarmTasksToday: 28720,
  totalCyclesCompleted: 147,
  globalAccuracy: 95.8,
  globalRecall: 93.4,
  globalHallucinationRate: 0.8,
  avgLatencyMs: 72,
  uptime: '99.97%',
  lastFullCycle: '2026-07-05T14:30:00Z',
  nextFullCycle: '2026-07-06T00:00:00Z',
  categoriesBreakdown: [
    { category: 'Régulateurs', count: 80, percent: 15.6 },
    { category: 'Normalisateurs', count: 60, percent: 11.7 },
    { category: 'Partenaires Techniques', count: 90, percent: 17.6 },
    { category: 'Institutions', count: 80, percent: 15.6 },
    { category: 'Universités', count: 200, percent: 39.1 },
    { category: 'Médias', count: 40, percent: 7.8 },
    { category: 'Big Four & Conseil', count: 30, percent: 5.9 },
    { category: 'Think Tanks', count: 42, percent: 8.2 },
  ],
  throughputByStage: [
    { stage: 'CRAWL', value: 12450, unit: 'req/h' },
    { stage: 'NORMALIZE', value: 8900, unit: 'docs/h' },
    { stage: 'SEED', value: 5200, unit: 'docs/h' },
    { stage: 'MEMEX', value: 3400, unit: 'queries/h' },
    { stage: 'SWARM', value: 1200, unit: 'tasks/h' },
    { stage: 'EVAL', value: 2800, unit: 'evals/h' },
    { stage: 'FLOW', value: 1, unit: 'cycle/24h' },
  ],
};



