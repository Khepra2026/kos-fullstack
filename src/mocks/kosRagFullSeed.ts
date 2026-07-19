// KOS RAG Full Seeding Command Center™ — Mock Data
// Seed massif du RAG réglementaire Khepra Experts
// 8 Batchs · 100+ Documents · BCEAO / COBAC / OHADA / GAFI / CIMA / ISO / IFRS / Bâle / RGPD / BEAC / BEPS / COSO / NIST / GIABA / CEDEAO / OCDE / FMI

export interface RagSeedBatch {
  id: string;
  name: string;
  description: string;
  domaine: string;
  documentCount: number;
  status: 'pending' | 'seeding' | 'completed' | 'failed' | 'partial';
  lastRun?: string;
  inserted: number;
  updated: number;
  failed: number;
  totalInBatch: number;
  color: string;
  icon: string;
  sampleTitles: string[];
}

export interface RagSeedStats {
  totalBatches: number;
  batchesCompleted: number;
  batchesInProgress: number;
  batchesPending: number;
  totalDocumentsSeeded: number;
  totalDocumentsInBase: number;
  totalBeforeSeed: number;
  delta: number;
  domainsCovered: number;
  organisationsCovered: number;
  paysCovered: number;
  lastFullSeed?: string;
  edgeFunction: string;
}

export interface RagSeedLog {
  id: string;
  timestamp: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  detail: string;
  batch?: string;
  documentId?: string;
}

export const RAG_SEED_BATCHES: RagSeedBatch[] = [
  {
    id: 'bceao',
    name: 'BCEAO — Régulation Bancaire UEMOA',
    description: 'Circulaires, instructions et règlements BCEAO : gouvernance, contrôle interne, LBC/FT, microfinance, systèmes de paiement, finance islamique.',
    domaine: 'Régulation bancaire UEMOA',
    documentCount: 18,
    status: 'completed',
    inserted: 18,
    updated: 0,
    failed: 0,
    totalInBatch: 18,
    color: '#D97706',
    icon: 'ri-bank-line',
    sampleTitles: [
      'Circulaire BCEAO n°03-2017/CB/C — Gouvernance des établissements de crédit',
      'Instruction BCEAO n°008-05-2015 — Dispositif de contrôle interne',
      'Dispositif prudentiel Bâle II/III — Règlement BCEAO',
      'Directive UEMOA n°02/2015 — Lutte contre le blanchiment',
      'Instruction BCEAO n°005-05-2018 — Finance Islamique SFD',
      'Circulaire BCEAO n°01-2020/CB/C — Plans préventifs et redressement',
      'Instruction BCEAO n°010-05-2014 — Conformité anti-corruption',
      'Circulaire BCEAO n°02-2017/CB/C — Protection des lanceurs d\'alerte',
      'Instruction BCEAO n°006-05-2019 — Systèmes de paiement électronique',
    ],
  },
  {
    id: 'cobac',
    name: 'COBAC — Régulation Bancaire CEMAC',
    description: 'Règlements et instructions COBAC : gouvernance, contrôle interne, solvabilité, LBC/FT, résilience opérationnelle DORA Afrique, microfinance CEMAC.',
    domaine: 'Régulation bancaire CEMAC',
    documentCount: 10,
    status: 'completed',
    inserted: 10,
    updated: 0,
    failed: 0,
    totalInBatch: 10,
    color: '#DC2626',
    icon: 'ri-building-2-line',
    sampleTitles: [
      'Règlement COBAC R-2016/01 — Gouvernement d\'entreprise CEMAC',
      'Directive COBAC 2027 — Résilience opérationnelle bancaire (DORA Afrique)',
      'Règlement COBAC R-2019/04 — LBC/FT dans la CEMAC',
      'Instruction COBAC I-2020/02 — Contrôle interne bancaire',
      'Règlement COBAC R-2018/03 — Microfinance et EMF CEMAC',
      'Directive COBAC 2025 — Conformité et éthique bancaire',
    ],
  },
  {
    id: 'ohada',
    name: 'OHADA — Droit des Affaires Africain',
    description: 'Actes Uniformes OHADA : droit commercial général, sociétés commerciales, sûretés, comptabilité SYSCOHADA, procédures collectives, arbitrage, droit coopératif.',
    domaine: 'Droit des affaires africain',
    documentCount: 12,
    status: 'completed',
    inserted: 12,
    updated: 0,
    failed: 0,
    totalInBatch: 12,
    color: '#0D9488',
    icon: 'ri-scales-3-line',
    sampleTitles: [
      'Acte Uniforme OHADA — Droit Commercial Général',
      'Acte Uniforme OHADA — Droit des Sociétés Commerciales et GIE',
      'Acte Uniforme OHADA — Sûretés',
      'Acte Uniforme OHADA — Comptabilité et Information Financière (SYSCOHADA)',
      'Acte Uniforme OHADA — Procédures Collectives',
      'Acte Uniforme OHADA — Droit Coopératif',
    ],
  },
  {
    id: 'gafi',
    name: 'GAFI — Normes Internationales LBC/FT',
    description: '40 Recommandations GAFI, guides méthodologiques, évaluation des risques, bénéficiaires effectifs, nouvelles technologies et actifs virtuels, GIABA, GABAC.',
    domaine: 'LBC/FT — Normes internationales',
    documentCount: 12,
    status: 'completed',
    inserted: 12,
    updated: 0,
    failed: 0,
    totalInBatch: 12,
    color: '#7C3AED',
    icon: 'ri-global-line',
    sampleTitles: [
      'GAFI — Les 40 Recommandations (version consolidée)',
      'GAFI — Recommandation 10 : Devoir de vigilance (CDD)',
      'GAFI — Recommandation 12 : Personnes Politiquement Exposées',
      'GAFI — Recommandation 15 : Actifs Virtuels et VASP',
      'GIABA — Rapport d\'Évaluation Mutuelle Régional',
      'GABAC — Cadre stratégique LBC/FT Afrique Centrale',
    ],
  },
  {
    id: 'cima',
    name: 'CIMA — Régulation des Assurances',
    description: 'Code CIMA : contrat d\'assurance, entreprises d\'assurance, microassurance — 14 États membres.',
    domaine: 'Régulation des assurances',
    documentCount: 6,
    status: 'completed',
    inserted: 6,
    updated: 0,
    failed: 0,
    totalInBatch: 6,
    color: '#0891B2',
    icon: 'ri-umbrella-line',
    sampleTitles: [
      'Code CIMA — Livre I : Le Contrat d\'Assurance',
      'Code CIMA — Livre III : Les Entreprises d\'Assurance',
      'Code CIMA — Livre V : La Microassurance',
      'Code CIMA — Livre II : Les Opérations d\'Assurance',
      'Code CIMA — Livre IV : Les Intermédiaires d\'Assurance',
    ],
  },
  {
    id: 'international',
    name: 'Normes Internationales (ISO, IFRS, Bâle, COSO, NIST, BEPS)',
    description: 'ISO 27001, ISO 31000, COSO ERM, COSO IC, Bâle III, IFRS 9, NIST CSF, NIST AI RMF, BEPS OCDE, IFC Performance Standards, ISSB Sustainability.',
    domaine: 'Normes internationales',
    documentCount: 18,
    status: 'completed',
    inserted: 18,
    updated: 0,
    failed: 0,
    totalInBatch: 18,
    color: '#2563EB',
    icon: 'ri-earth-line',
    sampleTitles: [
      'ISO/IEC 27001:2022 — Système de Management de la Sécurité de l\'Information',
      'COSO Enterprise Risk Management (ERM) 2017',
      'Bâle III — Dispositif réglementaire mondial',
      'IFRS 9 — Instruments financiers : Classification, Évaluation, Dépréciation',
      'NIST Cybersecurity Framework v2.0',
      'NIST AI Risk Management Framework (AI RMF 1.0)',
      'OCDE BEPS — 15 Actions contre l\'érosion de la base fiscale',
      'IFC Performance Standards — Standards de performance environnementale et sociale',
      'ISSB IFRS S1 & S2 — Normes de durabilité et climat',
    ],
  },
  {
    id: 'national',
    name: 'Lois Nationales (Sénégal, Côte d\'Ivoire, Bénin, Gabon, RGPD)',
    description: 'CDP Sénégal, APDP Bénin, ARTCI Côte d\'Ivoire, Loi Gabon Cybercriminalité, RGPD Européen — cadres nationaux et régionaux de protection des données.',
    domaine: 'Protection des données',
    documentCount: 10,
    status: 'completed',
    inserted: 10,
    updated: 0,
    failed: 0,
    totalInBatch: 10,
    color: '#059669',
    icon: 'ri-shield-keyhole-line',
    sampleTitles: [
      'Loi n°2008-12 — Protection des données personnelles (Sénégal)',
      'Loi n°2017-20 — Code du Numérique (Bénin)',
      'RGPD — Règlement Général sur la Protection des Données (UE) 2016/679',
      'Loi n°2018-07 — Cybercriminalité et protection des données (Gabon)',
      'Loi n°2013-450 — Liberté de communication électronique (Côte d\'Ivoire)',
    ],
  },
  {
    id: 'regional',
    name: 'Organismes Régionaux (GIABA, AMF-UEMOA, AMF-UMOA, CEDEAO, BEAC)',
    description: 'GIABA évaluations mutuelles, AMF-UEMOA agréments marchés financiers, AMF-UMOA LBC/FT marchés financiers, CEDEAO directives économiques, BEAC politique monétaire.',
    domaine: 'Marchés financiers',
    documentCount: 14,
    status: 'completed',
    inserted: 14,
    updated: 0,
    failed: 0,
    totalInBatch: 14,
    color: '#A855F7',
    icon: 'ri-organization-chart',
    sampleTitles: [
      'GIABA — Rapport d\'Évaluation Mutuelle — Procédures et Méthodologie',
      'AMF-UEMOA — Règlement Général relatif à l\'agrément des acteurs du marché financier',
      'AMF-UMOA — Instruction relative à la prévention du blanchiment sur les marchés financiers',
      'CEDEAO — Traité révisé et protocoles économiques',
      'BEAC — Instruction relative à la politique monétaire et de change CEMAC',
    ],
  },
];

export const RAG_SEED_STATS: RagSeedStats = {
  totalBatches: 8,
  batchesCompleted: 8,
  batchesInProgress: 0,
  batchesPending: 0,
  totalDocumentsSeeded: 100,
  totalDocumentsInBase: 100,
  totalBeforeSeed: 0,
  delta: 100,
  domainsCovered: 8,
  organisationsCovered: 24,
  paysCovered: 28,
  edgeFunction: 'kos-rag-full-seed',
};

export const RAG_SEED_INITIAL_LOGS: RagSeedLog[] = [
  {
    id: 'rag-log-001',
    timestamp: '2026-06-27T12:00:00Z',
    action: 'Edge Function Déployée',
    status: 'success',
    detail: 'KOS RAG Full Seed Engine v1.0 déployé avec succès. 8 batchs exécutés : BCEAO, COBAC, OHADA, GAFI, CIMA, International, National, Régional. 100 documents réglementaires injectés.',
  },
  {
    id: 'rag-log-002',
    timestamp: '2026-06-27T12:00:01Z',
    action: 'Structure Validée',
    status: 'success',
    detail: 'Structure des documents conforme au schéma rag_documents : titre, domaine, sous_domaine, organisation, pays, type_document, content, mots_cles, bibliotheque, est_public.',
  },
  {
    id: 'rag-log-003',
    timestamp: '2026-06-27T12:00:02Z',
    action: 'Base Cible Prête',
    status: 'info',
    detail: 'Table rag_documents accessible. 100 documents injectés via upsert intelligent (insert/update par titre). Zéro conflit détecté.',
  },
  {
    id: 'rag-log-004',
    timestamp: '2026-06-27T12:00:03Z',
    action: 'Moteur KOS Automaton v3 — Prêt',
    status: 'info',
    detail: 'Moteur NLP déterministe synchronisé. TF-IDF cosine + bigrammes + BM25 prêt pour la recherche sémantique post-seed. Aucune API externe requise.',
  },
  {
    id: 'rag-log-005',
    timestamp: '2026-06-27T12:00:04Z',
    action: 'Dry-Run Disponible',
    status: 'info',
    detail: 'Mode dry-run activé : simule l\'injection sans modifier la base. Permet de prévisualiser les documents qui seront créés/mis à jour avant exécution réelle.',
  },
  {
    id: 'rag-log-006',
    timestamp: '2026-06-27T12:00:05Z',
    action: 'Distribution Domaines Confirmée',
    status: 'info',
    detail: 'Régulation bancaire UEMOA: 18 docs | Régulation CEMAC: 10 docs | Droit OHADA: 12 docs | LBC/FT: 12 docs | Assurances: 6 docs | Normes internationales: 18 docs | Protection données: 10 docs | Marchés financiers: 14 docs. Total: 100 documents.',
  },
];

// Domains map for the distribution chart
export const RAG_DOMAIN_DISTRIBUTION = [
  { name: 'Normes Internationales', value: 18, color: '#2563EB' },
  { name: 'Régulation UEMOA', value: 18, color: '#D97706' },
  { name: 'Marchés Financiers', value: 14, color: '#A855F7' },
  { name: 'Droit OHADA', value: 12, color: '#0D9488' },
  { name: 'Régulation CEMAC', value: 10, color: '#DC2626' },
  { name: 'LBC/FT GAFI', value: 12, color: '#7C3AED' },
  { name: 'Protection Données', value: 10, color: '#059669' },
  { name: 'Assurance CIMA', value: 6, color: '#0891B2' },
];

// Organisation map
export const RAG_ORGANISATION_MAP = [
  { name: 'BCEAO', count: 18 },
  { name: 'COBAC', count: 10 },
  { name: 'OHADA', count: 12 },
  { name: 'GAFI', count: 6 },
  { name: 'ISO', count: 2 },
  { name: 'COSO', count: 2 },
  { name: 'CIMA', count: 6 },
  { name: 'IFRS Foundation', count: 1 },
  { name: 'Comité de Bâle', count: 1 },
  { name: 'NIST', count: 2 },
  { name: 'CDP Sénégal', count: 1 },
  { name: 'APDP Bénin', count: 1 },
  { name: 'ARTCI Côte d\'Ivoire', count: 1 },
  { name: 'Union Européenne', count: 1 },
  { name: 'GIABA', count: 2 },
  { name: 'AMF-UEMOA', count: 1 },
  { name: 'AMF-UMOA', count: 1 },
  { name: 'UEMOA', count: 1 },
  { name: 'BEAC', count: 1 },
  { name: 'CEDEAO', count: 1 },
  { name: 'OCDE', count: 1 },
  { name: 'IFC', count: 1 },
  { name: 'ISSB', count: 1 },
  { name: 'GABAC', count: 1 },
];

// Type documents
export const RAG_DOCUMENT_TYPES = [
  { type: 'Circulaire', count: 8 },
  { type: 'Instruction', count: 14 },
  { type: 'Règlement', count: 12 },
  { type: 'Acte Uniforme', count: 12 },
  { type: 'Recommandation', count: 6 },
  { type: 'Norme', count: 8 },
  { type: 'Cadre de référence', count: 6 },
  { type: 'Code', count: 6 },
  { type: 'Directive', count: 6 },
  { type: 'Guide', count: 4 },
  { type: 'Loi', count: 6 },
  { type: 'Rapport d\'évaluation', count: 4 },
  { type: 'Traité', count: 2 },
  { type: 'Protocole', count: 2 },
  { type: 'Standard', count: 4 },
];





