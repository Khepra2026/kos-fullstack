export interface BigFourKPI {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  iso: string;
  isoArticle: string;
  bigFourRef: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  status: 'conforme' | 'surveillance' | 'action';
  description: string;
}

export interface ISOChecklistItem {
  id: string;
  label: string;
  article: string;
  status: 'completed' | 'in-progress' | 'pending';
  evidence: string;
  owner: string;
}

export interface BigFourReference {
  firm: string;
  framework: string;
  score: number;
  status: 'aligned' | 'gap' | 'exceeds';
}

export const KOS_AI_UPGRADE_KPIS: BigFourKPI[] = [
  {
    id: 'kpi-001',
    name: 'Précision Résumés BCEAO',
    target: 99.5,
    current: 92.1,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 6.1 — Gouvernance AI',
    bigFourRef: 'PwC Responsible AI Framework',
    trend: 'up',
    trendValue: '+3.2% vs Q1',
    status: 'surveillance',
    description: 'Précision des résumés réglementaires BCEAO générés par IA — cible Big Four PwC',
  },
  {
    id: 'kpi-002',
    name: 'Traçabilité Source',
    target: 100,
    current: 87.0,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 8.2 — Traçabilité',
    bigFourRef: 'EY AI Assurance & Traceability',
    trend: 'up',
    trendValue: '+5.1% vs Q1',
    status: 'surveillance',
    description: 'Taux de citations sourcées et traçables dans les livrables IA — cible EY',
  },
  {
    id: 'kpi-003',
    name: 'Temps Réponse P95',
    target: 200,
    current: 430,
    unit: 'ms',
    iso: 'ISO 9001:2015',
    isoArticle: 'Art. 8.5 — Performance',
    bigFourRef: 'KPMG Performance Excellence',
    trend: 'down',
    trendValue: '-12% vs Q1',
    status: 'action',
    description: 'Temps de réponse au 95e percentile — cible KPMG 200ms, actuellement dégradé',
  },
  {
    id: 'kpi-004',
    name: 'Explainability Score',
    target: 95,
    current: 70.0,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 9.3 — Explainability',
    bigFourRef: 'Deloitte Explainable AI Protocol',
    trend: 'up',
    trendValue: '+8.7% vs Q1',
    status: 'surveillance',
    description: 'Score d\'explicabilité des décisions IA — cible Deloitte 95%',
  },
  {
    id: 'kpi-005',
    name: 'Hallucination Rate',
    target: 0.1,
    current: 2.3,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 8.4 — Red Teaming',
    bigFourRef: 'Big Four Consensus < 0.5%',
    trend: 'down',
    trendValue: '-0.8pp vs Q1',
    status: 'action',
    description: 'Taux d\'hallucination détecté — cible Big Four 0.1%, actuellement 2.3%',
  },
  {
    id: 'kpi-006',
    name: 'Conformité ISO 27001',
    target: 100,
    current: 94.2,
    unit: '%',
    iso: 'ISO 27001:2022',
    isoArticle: 'Annex A.8.5 — Sécurité',
    bigFourRef: 'EY Cybersecurity Framework',
    trend: 'up',
    trendValue: '+2.1% vs Q1',
    status: 'surveillance',
    description: 'Score de conformité SIEM et sécurité informationnelle — cible EY',
  },
  {
    id: 'kpi-007',
    name: 'Data Governance Score',
    target: 98,
    current: 89.5,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 7.4 — Data Lineage',
    bigFourRef: 'PwC Data Governance Model',
    trend: 'up',
    trendValue: '+4.3% vs Q1',
    status: 'surveillance',
    description: 'Gouvernance des données BCEAO/COBAC — traçabilité complète requise',
  },
  {
    id: 'kpi-008',
    name: 'Human-in-the-Loop',
    target: 100,
    current: 100,
    unit: '%',
    iso: 'ISO 42001:2023',
    isoArticle: 'Art. 6.1.3 — HITL',
    bigFourRef: 'Deloitte Trustworthy AI',
    trend: 'stable',
    trendValue: '0.0% vs Q1',
    status: 'conforme',
    description: 'Taux de validation humaine sur résumés CA et livrables critiques — 100%',
  },
];

export const ISO_42001_CHECKLIST: ISOChecklistItem[] = [
  {
    id: 'iso-001',
    label: 'Logs prompts/réponses archivés 7 ans',
    article: 'Art. 8.2 — Audit Trail',
    status: 'completed',
    evidence: 'Supabase audit_logs + cron_job_logs — 14 mois d\'historique',
    owner: 'KOS Security Logger',
  },
  {
    id: 'iso-002',
    label: 'Human-in-the-Loop sur résumés Conseil d\'Administration',
    article: 'Art. 6.1.3 — Oversight',
    status: 'completed',
    evidence: 'Workflow validation à 2 étapes — KOS Chief Agentic Architect',
    owner: 'Managing Partner Office',
  },
  {
    id: 'iso-003',
    label: 'Red teaming trimestriel anti-hallucination',
    article: 'Art. 8.4 — Robustness Testing',
    status: 'in-progress',
    evidence: 'Q2 2026 en cours — 47 scénarios de stress test définis',
    owner: 'KOS Quality Monitor',
  },
  {
    id: 'iso-004',
    label: 'Data lineage BCEAO/COBAC traçable end-to-end',
    article: 'Art. 7.4 — Data Governance',
    status: 'in-progress',
    evidence: 'KOS ODSKE Dashboard — 78% des flux traçables',
    owner: 'KOS Regulatory Data Architect',
  },
  {
    id: 'iso-005',
    label: 'Model card versionnée + SBOM complet',
    article: 'Art. 9.2 — Documentation',
    status: 'completed',
    evidence: 'Model Card v3.2 publiée — 12 modèles documentés',
    owner: 'KOS Scientific Director',
  },
  {
    id: 'iso-006',
    label: 'Risk assessment AI mise à jour trimestrielle',
    article: 'Art. 6.1 — Risk Management',
    status: 'completed',
    evidence: 'Q2 2026 validé — 23 risques identifiés, 0 critique',
    owner: 'KOS Risk Diligence Command',
  },
  {
    id: 'iso-007',
    label: 'Formation AI ethics 100% équipe technique',
    article: 'Art. 7.2 — Competence',
    status: 'in-progress',
    evidence: '87% formés — cible 100% avant Q3 2026',
    owner: 'KOS Learning Engine',
  },
  {
    id: 'iso-008',
    label: 'DPO désigné et registre des traitements AI',
    article: 'Art. 5.2 — Roles & Responsibilities',
    status: 'completed',
    evidence: 'DPO KHEPRA nommé — registre 47 traitements documentés',
    owner: 'KHEPRA Compliance Office',
  },
];

export const BIG_FOUR_REFERENCES: BigFourReference[] = [
  { firm: 'PwC', framework: 'Responsible AI Framework', score: 92.1, status: 'gap' },
  { firm: 'EY', framework: 'AI Assurance & Traceability', score: 87.0, status: 'gap' },
  { firm: 'KPMG', framework: 'Performance Excellence', score: 46.5, status: 'gap' },
  { firm: 'Deloitte', framework: 'Explainable AI Protocol', score: 70.0, status: 'gap' },
  { firm: 'Big Four Consensus', framework: 'Hallucination < 0.5%', score: 78.3, status: 'gap' },
];

export const KOS_UPGRADE_STATUS = {
  version: 'KOS AI v4.2 → v5.0',
  targetDate: '2026-09-30',
  overallProgress: 78.4,
  phases: [
    { name: 'Phase 1 — Fine-tuning RAG', progress: 100, status: 'completed' as const },
    { name: 'Phase 2 — Guardrails ISO', progress: 85, status: 'in-progress' as const },
    { name: 'Phase 3 — Explainability Engine', progress: 62, status: 'in-progress' as const },
    { name: 'Phase 4 — Performance P95 < 200ms', progress: 35, status: 'in-progress' as const },
    { name: 'Phase 5 — Red Teaming & Validation', progress: 47, status: 'in-progress' as const },
    { name: 'Phase 6 — Certification ISO 42001', progress: 12, status: 'pending' as const },
  ],
  lastScan: '2026-07-04T03:00:00Z',
  nextScheduled: '2026-07-05T03:00:00Z',
};



