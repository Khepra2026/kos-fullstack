export const aiSovereigntyOverview = {
  globalScore: 89,
  agentsRegistered: 75,
  agentsSupraOptimaux: 75,
  agentsCritiques: 0,
  iso42001Maturity: 84,
  euAiActCompliance: 78,
  localEmbeddings: 9,
  sovereignIndex: 72,
  hallucinationsDetected: 6,
  hallucinationsResolved: 6,
  activeLearningLoops: 8,
};

export const aiAgentsGovernance = [
  { id: 'AG-001', name: 'KOS Automaton Engine', type: 'NLP', risk: 'Faible', complianceScore: 97, ethicsScore: 95, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-24' },
  { id: 'AG-002', name: 'KOS CEO Advisor', type: 'Stratégique', risk: 'Moyen', complianceScore: 90, ethicsScore: 88, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-23' },
  { id: 'AG-003', name: 'KOS Quality Controller', type: 'Qualité', risk: 'Faible', complianceScore: 93, ethicsScore: 92, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-24' },
  { id: 'AG-004', name: 'KOS Digital Twin', type: 'Prédictif', risk: 'Élevé', complianceScore: 71, ethicsScore: 74, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-22' },
  { id: 'AG-005', name: 'KOS Lead Scoring', type: 'Prédictif', risk: 'Moyen', complianceScore: 85, ethicsScore: 82, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-23' },
  { id: 'AG-006', name: 'KOS Tender Intelligence', type: 'Analyse', risk: 'Faible', complianceScore: 82, ethicsScore: 80, sovereignty: 'Hybride', status: 'Optimal', lastAudit: '2026-06-22' },
  { id: 'AG-007', name: 'KOS Regulatory Scout', type: 'Veille', risk: 'Faible', complianceScore: 95, ethicsScore: 93, sovereignty: 'Hybride', status: 'Optimal', lastAudit: '2026-06-24' },
  { id: 'AG-008', name: 'KOS Knowledge Graph Agent', type: 'Base de connaissances', risk: 'Faible', complianceScore: 94, ethicsScore: 91, sovereignty: 'Locale', status: 'Optimal', lastAudit: '2026-06-24' },
];

export const ethicsReviews = [
  { id: 'ETH-001', agent: 'KOS Lead Scoring', reviewType: 'Équité', score: 82, issue: 'Biais sectoriel potentiel — surpondération secteur bancaire', action: 'Recalibration pondérations — 4 secteurs équilibrés', status: 'En cours', reviewer: 'AI Ethics Board' },
  { id: 'ETH-002', agent: 'KOS Digital Twin', reviewType: 'Explicabilité', score: 68, issue: 'Décisions insuffisamment explicables — boîte noire', action: 'Couche SHAP/LIME ajoutée — rapport explicabilité', status: 'Complété', reviewer: 'AI Ethics Board' },
  { id: 'ETH-003', agent: 'KOS CEO Advisor', reviewType: 'Transparence', score: 88, issue: 'Recommandations sans disclaimer "généré par IA"', action: 'Disclaimer automatique ajouté en préambule', status: 'Complété', reviewer: 'AI Ethics Board' },
  { id: 'ETH-004', agent: 'KOS Content Generator', reviewType: 'Propriété intellectuelle', score: 85, issue: 'Risque reproduction involontaire contenu protégé', action: 'Filtre anti-plagiat + vérification sources', status: 'En cours', reviewer: 'Legal & Compliance' },
  { id: 'ETH-005', agent: 'KOS Fraud Detection', reviewType: 'Privacy', score: 78, issue: 'Données personnelles dans logs AML — RGPD', action: 'Anonymisation + pseudonymisation + data retention 5 ans', status: 'Complété', reviewer: 'DPO' },
  { id: 'ETH-006', agent: 'KOS ESG Assessment', reviewType: 'Fiabilité', score: 90, issue: 'Scores ESG basés sur données publiques uniquement', action: 'Ajout disclaimer + méthodologie transparente documentée', status: 'Complété', reviewer: 'AI Ethics Board' },
];

export const localSovereigntyMetrics = {
  embeddingsLocaux: 9,
  embeddingsSupabase: 2780000,
  pourcentageLocal: 0.0003,
  cibleLocal: 100,
  documentsLocaux: 0,
  documentsSupabase: 100000,
  vectorStoreLocal: 'TF-IDF + Cosine Similarity',
  vectorStoreSupabase: 'pgvector + IVFFlat',
  rechercheLocale: 'Active',
  fallbackSupabase: 'Actif',
  resilienceTested: true,
  rpoLocal: 'Instantané',
  rpoSupabase: '< 1 heure',
};

export const hallucinationTracking = [
  { id: 'HAL-001', source: 'KOS Content Generator', claim: 'La BCEAO exige un ratio de solvabilité de 12%', status: 'Partiellement vérifié', correction: 'Ratio ≥ 8% selon Dispositif Prudentiel. Le 12% est un coussin interne recommandé.', correctedAt: '2026-06-20', severity: 'Moyenne' },
  { id: 'HAL-002', source: 'KOS Digital Twin', claim: 'Le marché fintech UEMOA pèse 2.5 Mds USD', status: 'Non vérifié', correction: 'Chiffre non sourçable. Estimations entre 800M et 1.2 Mds USD.', correctedAt: '2026-06-18', severity: 'Haute' },
  { id: 'HAL-003', source: 'KOS CEO Advisor', claim: 'Taux de croissance secteur bancaire 12% en 2026', status: 'Partiellement vérifié', correction: 'Croissance 8.5% selon BCEAO Rapport Annuel 2025. 12% était une projection.', correctedAt: '2026-06-15', severity: 'Moyenne' },
  { id: 'HAL-004', source: 'KOS Tender Intelligence', claim: 'AO Banque Mondiale — Audit 50 banques', status: 'Partiellement vérifié', correction: 'AO réel mais scope = 15 banques pilotes, pas 50.', correctedAt: '2026-06-12', severity: 'Faible' },
  { id: 'HAL-005', source: 'KOS Research Agent', claim: 'Toutes les banques UEMOA sont IFRS 9 compliant', status: 'Non vérifié', correction: '~65% conformes. Les autres en période de transition.', correctedAt: '2026-06-10', severity: 'Haute' },
  { id: 'HAL-006', source: 'KOS Market Intelligence', claim: '5 nouveaux agréments fintech délivrés en 2026', status: 'Partiellement vérifié', correction: '3 agréments confirmés. 2 en instruction.', correctedAt: '2026-06-08', severity: 'Faible' },
];

export const sovereigntyRoadmap = [
  { id: 'SOV-001', milestone: 'Vector Store Local — 6 Régulateurs', progress: 100, deadline: '2026-06-25', status: 'Complété' },
  { id: 'SOV-002', milestone: 'Logs Locaux — Migration 95%', progress: 45, deadline: '2026-07-09', status: 'En cours' },
  { id: 'SOV-003', milestone: 'RAG Local — Migration Catégorie C', progress: 20, deadline: '2026-07-25', status: 'En cours' },
  { id: 'SOV-004', milestone: 'Réplication Connaissances — Catégorie B', progress: 10, deadline: '2026-08-09', status: 'Planifié' },
  { id: 'SOV-005', milestone: 'Sync Engine Bidirectionnel', progress: 35, deadline: '2026-08-24', status: 'En cours' },
  { id: 'SOV-006', milestone: 'Resilience Engine — Exports Quotidiens', progress: 60, deadline: '2026-09-08', status: 'En cours' },
  { id: 'SOV-007', milestone: 'Tests Résilience — Coupure Supabase', progress: 0, deadline: '2026-09-23', status: 'Planifié' },
  { id: 'SOV-008', milestone: 'Souveraineté Totale — 100% Local', progress: 5, deadline: '2026-12-31', status: 'Planifié' },
];

export const aiGovernanceKPIs = {
  agentsOptimal: 75,
  agentsCritiques: 0,
  iso42001Progress: 84,
  euAiActGaps: 3,
  ethicsReviewsCompleted: 4,
  ethicsReviewsPending: 2,
  hallucinations36m: 0,
  meanTimeToCorrect: 2.5,
  verificationRate: 99.7,
  sovereigntyProgress: 35,
  localBackupSize: 0,
  resilienceRPO: 60,
};





