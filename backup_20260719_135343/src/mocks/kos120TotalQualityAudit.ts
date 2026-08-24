// ============================================================
// KOS AUDIT QUALITÉ TOTALE 120% BIG FOUR + OPTIMISATION SYSTÈME
// Cockpit Unifié — Tous les blocs, tous les automates, tous les axes
// Consortium PwC · Deloitte · EY · KPMG — Quality Assurance Practice
// Version 2026.06.23 — LIVE
// ============================================================

export interface TotalQualityBlockAudit {
  blockId: string;
  blockName: string;
  icon: string;
  color: string;
  agents: number;
  integrityScore: number;
  qualityScore: number;
  complianceScore: number;
  performanceScore: number;
  bigFourAlignment: number;
  overallScore: number;
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
  findings: { critical: number; major: number; minor: number };
  fixed: number;
  autoFixable: number;
  keyIssue: string;
  recommendation: string;
}

export interface QualityAutomateAudit {
  id: string;
  name: string;
  system: 'regulatory' | 'quality';
  category: string;
  status: 'deployed' | 'partial' | 'mock';
  score: number;
  bigFourScore: number;
  auditsCompleted: number;
  nonConformities: number;
  gap: string;
  optimization: string;
  effort: string;
  impact: string;
}

export interface SystemOptimizationAction {
  id: string;
  title: string;
  category: 'security' | 'performance' | 'compliance' | 'quality' | 'infrastructure' | 'growth' | 'data' | 'code';
  block: string;
  priority: 'P0' | 'P1' | 'P2';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'in_progress' | 'completed';
  description: string;
  effort: string;
  budget: string;
  impact: string;
  roi: string;
  kpiBefore: string;
  kpiAfter: string;
  deadline: string;
  assigned: string;
  dependencies: string[];
}

export interface CertificationProgress {
  certificationId: string;
  name: string;
  issuer: string;
  currentScore: number;
  targetScore: number;
  status: 'certified' | 'in_progress' | 'planned' | 'blocked';
  gaps: number;
  resolved: number;
  deadline: string;
  icon: string;
}

export interface TotalQualityKPIs {
  globalQualityScore: number;
  globalQualityTarget: number;
  blocksScanned: number;
  blocksOptimal: number;
  blocksStable: number;
  blocksDegraded: number;
  blocksCritical: number;
  totalFindings: number;
  criticalOpen: number;
  majorOpen: number;
  minorOpen: number;
  totalFixed: number;
  totalAutoFixable: number;
  automatesAudited: number;
  automatesDeployed: number;
  automatesPartial: number;
  certificationsTotal: number;
  certificationsAchieved: number;
  optimizationsIdentified: number;
  optimizationsInProgress: number;
  optimizationsCompleted: number;
  estimatedTotalEffort: string;
  estimatedTotalBudget: string;
  projectedCompletion: string;
}

export const TOTAL_QUALITY_BLOCK_AUDITS: TotalQualityBlockAudit[] = [
  {
    blockId: 'block-gouvernance',
    blockName: 'Gouvernance & Direction',
    icon: 'ri-government-line',
    color: '#4F46E5',
    agents: 11,
    integrityScore: 92,
    qualityScore: 94,
    complianceScore: 96,
    performanceScore: 90,
    bigFourAlignment: 95,
    overallScore: 93.4,
    status: 'optimal',
    findings: { critical: 0, major: 0, minor: 2 },
    fixed: 68,
    autoFixable: 2,
    keyIssue: '2 imports circulaires — useManagingPartnerOffice.ts ⇄ useStrategicPlanning.ts',
    recommendation: 'Extraire logique partagée dans useGovernanceCore.ts — 30 min',
  },
  {
    blockId: 'block-qualite-production',
    blockName: 'Qualité & Production',
    icon: 'ri-verified-badge-line',
    color: '#5B21B6',
    agents: 12,
    integrityScore: 85,
    qualityScore: 91,
    complianceScore: 82,
    performanceScore: 84,
    bigFourAlignment: 86,
    overallScore: 85.6,
    status: 'stable',
    findings: { critical: 1, major: 2, minor: 2 },
    fixed: 88,
    autoFixable: 3,
    keyIssue: 'Template COBAC R-2016/01 obsolète — non-conformité réglementaire CEMAC',
    recommendation: 'Migrer vers COBAC R-2024/01 + créer module formation — 9h30',
  },
  {
    blockId: 'block-seo-visibilite',
    blockName: 'SEO, GEO & Visibilité',
    icon: 'ri-globe-line',
    color: '#0891B2',
    agents: 11,
    integrityScore: 90,
    qualityScore: 95,
    complianceScore: 88,
    performanceScore: 92,
    bigFourAlignment: 94,
    overallScore: 91.8,
    status: 'optimal',
    findings: { critical: 0, major: 1, minor: 3 },
    fixed: 142,
    autoFixable: 4,
    keyIssue: '3 pages non crawlées par Google-Extended — invisibles sur Gemini',
    recommendation: 'Ajouter Google-Extended dans robots.txt + sections OHADA llms.txt — 35 min',
  },
  {
    blockId: 'block-securite-conformite',
    blockName: 'Sécurité & Conformité',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    agents: 10,
    integrityScore: 72,
    qualityScore: 78,
    complianceScore: 68,
    performanceScore: 65,
    bigFourAlignment: 70,
    overallScore: 70.6,
    status: 'critical',
    findings: { critical: 3, major: 2, minor: 3 },
    fixed: 74,
    autoFixable: 3,
    keyIssue: 'CSP + Permissions-Policy headers absents — 0 protection XSS/OWASP',
    recommendation: 'Déployer CSP strict + Permissions-Policy + HSTS preload — 3h15',
  },
  {
    blockId: 'block-data-intelligence',
    blockName: 'Data & Intelligence',
    icon: 'ri-bar-chart-box-line',
    color: '#9B7B2C',
    agents: 11,
    integrityScore: 78,
    qualityScore: 82,
    complianceScore: 85,
    performanceScore: 76,
    bigFourAlignment: 80,
    overallScore: 80.2,
    status: 'stable',
    findings: { critical: 2, major: 1, minor: 3 },
    fixed: 66,
    autoFixable: 2,
    keyIssue: 'ProcessMining : goulot Revue Associé 48h — 60% propositions retardées',
    recommendation: 'Optimiser workflow Revue Associé 48h→24h + Baromètre Inclusion Financière — 56h',
  },
  {
    blockId: 'block-croissance-crm',
    blockName: 'Croissance & CRM',
    icon: 'ri-rocket-line',
    color: '#4A7A1E',
    agents: 10,
    integrityScore: 74,
    qualityScore: 80,
    complianceScore: 82,
    performanceScore: 72,
    bigFourAlignment: 78,
    overallScore: 77.2,
    status: 'stable',
    findings: { critical: 1, major: 2, minor: 2 },
    fixed: 96,
    autoFixable: 3,
    keyIssue: 'LinkedIn MDP bloqué depuis 60j — 0 posts programmables',
    recommendation: 'Débloquer approbation LinkedIn MDP + contacter 3 clients sans contact Q2 — suivi',
  },
  {
    blockId: 'block-infrastructure',
    blockName: 'Infrastructure & Automatisation',
    icon: 'ri-cpu-line',
    color: '#86BC25',
    agents: 10,
    integrityScore: 82,
    qualityScore: 86,
    complianceScore: 84,
    performanceScore: 80,
    bigFourAlignment: 85,
    overallScore: 83.4,
    status: 'stable',
    findings: { critical: 0, major: 2, minor: 3 },
    fixed: 68,
    autoFixable: 3,
    keyIssue: 'Sous-utilisation consultants 77% — perte marge 32M FCFA/trimestre',
    recommendation: 'Analyser allocation + planifier recrutement Director BU1 — 9h',
  },
  {
    blockId: 'block-compliance-certification',
    blockName: 'Conformité & Certification (KYC/LCB/FT/ISO)',
    icon: 'ri-scales-3-line',
    color: '#8B3040',
    agents: 7,
    integrityScore: 65,
    qualityScore: 70,
    complianceScore: 58,
    performanceScore: 62,
    bigFourAlignment: 64,
    overallScore: 63.8,
    status: 'critical',
    findings: { critical: 2, major: 2, minor: 3 },
    fixed: 52,
    autoFixable: 1,
    keyIssue: 'KYC/CDD #4 détection PPE 65% vs 90% GAFI + Cartographie CEMAC 58/100',
    recommendation: 'Améliorer détection PPE 65%→90% + intégrer COBAC R-2023/05 + ISO 27001 SMSI — 24h',
  },
  {
    blockId: 'block-esg-sustainability',
    blockName: 'ESG & Durabilité',
    icon: 'ri-leaf-line',
    color: '#4A7A1E',
    agents: 5,
    integrityScore: 80,
    qualityScore: 84,
    complianceScore: 78,
    performanceScore: 76,
    bigFourAlignment: 82,
    overallScore: 80.0,
    status: 'stable',
    findings: { critical: 0, major: 2, minor: 2 },
    fixed: 38,
    autoFixable: 1,
    keyIssue: 'EcoVadis Achats Responsables 30/68 — 4 preuves manquantes',
    recommendation: 'Collecter 4 preuves Achats Responsables + actualiser Scope 3 — 8h',
  },
  {
    blockId: 'block-digital-performance',
    blockName: 'Performance Digitale (CWV/OWASP/SOC2)',
    icon: 'ri-speed-line',
    color: '#9B7B2C',
    agents: 4,
    integrityScore: 48,
    qualityScore: 52,
    complianceScore: 42,
    performanceScore: 38,
    bigFourAlignment: 45,
    overallScore: 45.0,
    status: 'critical',
    findings: { critical: 3, major: 3, minor: 2 },
    fixed: 28,
    autoFixable: 2,
    keyIssue: 'LCP 4.8s + 3 vulns OWASP critiques + SOC 2 42/100 + 89 images non optimisées',
    recommendation: 'Convertir 89 images WebP + corriger IDOR/XSS/SQLi + 25 politiques SOC 2 — 67h',
  },
  {
    blockId: 'block-code-architecture',
    blockName: 'Architecture Code & Dépendances',
    icon: 'ri-code-s-slash-line',
    color: '#6B4A3A',
    agents: 3,
    integrityScore: 88,
    qualityScore: 90,
    complianceScore: 92,
    performanceScore: 72,
    bigFourAlignment: 85,
    overallScore: 85.4,
    status: 'optimal',
    findings: { critical: 0, major: 1, minor: 3 },
    fixed: 32,
    autoFixable: 4,
    keyIssue: 'Bundle JS 1.8 MB — 3× seuil acceptable + 12 routes sans prefetch',
    recommendation: 'Tree shaking agressif + code splitting + prefetch routes — 28h',
  },
  {
    blockId: 'block-operations-production',
    blockName: 'Opérations & Production Go-Live',
    icon: 'ri-server-line',
    color: '#C2410C',
    agents: 4,
    integrityScore: 68,
    qualityScore: 72,
    complianceScore: 60,
    performanceScore: 74,
    bigFourAlignment: 70,
    overallScore: 68.8,
    status: 'stable',
    findings: { critical: 0, major: 3, minor: 2 },
    fixed: 24,
    autoFixable: 3,
    keyIssue: '7 edge functions sans JWT + RLS manquante 3 tables + cron tender silencieux',
    recommendation: 'JWT sur 7 endpoints + RLS 3 tables + alerting cron — 6h',
  },
];

export const QUALITY_AUTOMATES_AUDIT: QualityAutomateAudit[] = [
  { id: 'automate-reg-01', name: 'Veille BCEAO Automatique', system: 'regulatory', category: 'veille-reglementaire', status: 'deployed', score: 92, bigFourScore: 95, auditsCompleted: 18200, nonConformities: 42, gap: 'Alertes hebdomadaires au lieu de temps réel', optimization: 'Passer en streaming temps réel BCEAO', effort: '3h', impact: 'MTTD réglementaire 24h→<1h' },
  { id: 'automate-reg-02', name: 'Analyse Impact COBAC', system: 'regulatory', category: 'impact-analysis', status: 'deployed', score: 88, bigFourScore: 92, auditsCompleted: 6400, nonConformities: 28, gap: 'Scoring impact manuel sur 40% des textes', optimization: 'ML auto-scoring 100% textes COBAC', effort: '8h', impact: 'Couverture analyse +40%' },
  { id: 'automate-reg-03', name: 'Cartographie LCB/FT GAFI', system: 'regulatory', category: 'compliance-documentaire', status: 'partial', score: 65, bigFourScore: 68, auditsCompleted: 2800, nonConformities: 156, gap: 'CEMAC — COBAC R-2023/05 non intégré', optimization: 'Intégrer COBAC R-2023/05 + GAFI R.15', effort: '5h', impact: 'Score CEMAC 58→85' },
  { id: 'automate-reg-04', name: 'Audit Pré-Inspection', system: 'regulatory', category: 'audit-inspection', status: 'deployed', score: 90, bigFourScore: 94, auditsCompleted: 4200, nonConformities: 18, gap: 'Checklist statique — non adaptative au profil', optimization: 'Checklist dynamique profil-adaptative IA', effort: '6h', impact: 'Précision inspection +25%' },
  { id: 'automate-reg-05', name: 'Reporting COBAC Trimestriel', system: 'regulatory', category: 'reporting-reglementaire', status: 'partial', score: 78, bigFourScore: 82, auditsCompleted: 3400, nonConformities: 65, gap: 'Templates 2024 — COBAC a publié format 2026', optimization: 'Mettre à jour templates COBAC 2026', effort: '4h', impact: 'Conformité reporting 100%' },
  { id: 'automate-qual-01', name: 'Quality Assurance Authority™', system: 'quality', category: 'revue-qualite-totale-tqm', status: 'deployed', score: 94, bigFourScore: 96, auditsCompleted: 12500, nonConformities: 8, gap: 'Détection jardon OHADA manquante', optimization: 'Ajouter module NLP jargon juridique', effort: '3h', impact: 'Score humanisation +12%' },
  { id: 'automate-qual-02', name: 'Expert Reviewer Big Four', system: 'quality', category: 'audit-qualite-interne', status: 'deployed', score: 91, bigFourScore: 94, auditsCompleted: 8400, nonConformities: 14, gap: '3 perspectives Big Four simulées — cible 5', optimization: 'Ajouter KPMG + EY perspectives', effort: '6h', impact: 'Couverture Big Four 60%→100%' },
  { id: 'automate-qual-03', name: 'Peer Review Workflow', system: 'quality', category: 'controle-qualite-livrables', status: 'deployed', score: 86, bigFourScore: 90, auditsCompleted: 6200, nonConformities: 32, gap: 'Délai revue 48h vs cible 24h', optimization: 'Optimiser workflow assignation + SLA auto', effort: '4h', impact: 'Délai revue -50%' },
  { id: 'automate-qual-04', name: 'Compliance Review Engine', system: 'quality', category: 'controle-qualite-livrables', status: 'deployed', score: 90, bigFourScore: 93, auditsCompleted: 5800, nonConformities: 12, gap: 'Pas de couverture ISSB S1/S2 ESG', optimization: 'Ajouter ISSB S1/S2 dans checklist', effort: '2h', impact: 'Conformité ESG +100%' },
  { id: 'automate-qual-05', name: 'Executive Approval Workflow', system: 'quality', category: 'organisation-processus', status: 'deployed', score: 88, bigFourScore: 92, auditsCompleted: 4200, nonConformities: 9, gap: 'Délai approbation 8h — cible Big Four 4h', optimization: 'Circuit approval accéléré COMEX', effort: '2h', impact: 'Time-to-approval -50%' },
  { id: 'automate-qual-06', name: 'TQM — Amélioration Continue', system: 'quality', category: 'amelioration-continue', status: 'partial', score: 76, bigFourScore: 80, auditsCompleted: 3800, nonConformities: 45, gap: 'Boucle feedback 72h — cible 24h', optimization: 'Feedback loop temps réel + auto-priorisation', effort: '8h', impact: 'Cycle amélioration 72h→24h' },
];

export const SYSTEM_OPTIMIZATION_ACTIONS: SystemOptimizationAction[] = [
  {
    id: 'OPT-001', title: 'Corriger 3 vulnérabilités OWASP critiques (IDOR API, SQL injection, XSS reflété)',
    category: 'security', block: 'Performance Digitale', priority: 'P0', severity: 'critical', status: 'in_progress',
    description: '3 vulnérabilités OWASP Top 10 détectées — exposition critique de données clients et edge functions non protégées. CVSS moyen 8.6.',
    effort: '15h', budget: '6 800 000 FCFA', impact: '0 vulnérabilités Critical/High — score OWASP 55→82', roi: 'Évite brèche sécurité coût estimé 250M FCFA',
    kpiBefore: 'OWASP 55/100 — 3 vulns critiques', kpiAfter: 'OWASP 82/100 — 0 vuln critique', deadline: '2026-07-15', assigned: 'RSSI + Lead Dev Backend', dependencies: [],
  },
  {
    id: 'OPT-002', title: 'Déployer CSP strict + Permissions-Policy + HSTS preload sur toutes les routes',
    category: 'security', block: 'Sécurité & Conformité', priority: 'P0', severity: 'critical', status: 'open',
    description: 'Headers de sécurité absents sur 100% des pages. CSP = protection XSS zero. Permissions-Policy non configuré = APIs navigateur non restreintes.',
    effort: '3h', budget: '2 800 000 FCFA', impact: 'Score Mozilla Observatory 0→95/100', roi: 'Protection XSS + clickjacking + sniffing — coût quasi nul',
    kpiBefore: 'Observatory 0/100 — 0 header sécurité', kpiAfter: 'Observatory 95/100 — CSP+A+B', deadline: '2026-07-31', assigned: 'RSSI + Lead Dev Frontend', dependencies: ['OPT-001'],
  },
  {
    id: 'OPT-003', title: 'Migrer template COBAC R-2016/01→R-2024/01 + créer module formation',
    category: 'compliance', block: 'Qualité & Production', priority: 'P0', severity: 'critical', status: 'in_progress',
    description: 'Template COBAC utilise circulaire obsolète depuis 2024. Toutes les propositions CEMAC non conformes. 12 consultants non formés COBAC 2024.',
    effort: '9h30', budget: '5 000 000 FCFA', impact: '100% templates conformes COBAC 2024', roi: 'Évite rejet COBAC — coût moyen rejet 45M FCFA/dossier',
    kpiBefore: 'Templates COBAC 0% conformes 2024', kpiAfter: 'Templates COBAC 100% conformes 2024', deadline: '2026-07-15', assigned: 'Quality Lead + Compliance + Training', dependencies: [],
  },
  {
    id: 'OPT-004', title: 'Améliorer KYC/CDD #4 — détection PPE 65%→90% (GAFI R.12)',
    category: 'compliance', block: 'Conformité & Certification', priority: 'P0', severity: 'critical', status: 'open',
    description: 'Détection Personnes Politiquement Exposées à 65% — seuil GAFI minimum 90%. Risque LCB/FT non-conformité GAFI Recommandation 12.',
    effort: '3h', budget: '2 500 000 FCFA', impact: 'Conformité GAFI R.12 = 100%', roi: 'Évite sanction GAFI — amendes jusqu\'à 5% CA',
    kpiBefore: 'Détection PPE 65%', kpiAfter: 'Détection PPE 90%+', deadline: '2026-07-01', assigned: 'Compliance Officer', dependencies: [],
  },
  {
    id: 'OPT-005', title: 'Cartographie LCB/FT CEMAC — intégrer COBAC R-2023/05 + score 58→85',
    category: 'compliance', block: 'Conformité & Certification', priority: 'P0', severity: 'critical', status: 'open',
    description: 'Cartographie risques CEMAC score 58/100 — gap réglementaire majeur COBAC R-2023/05 non couvert. Risque de sanction en cas d\'inspection.',
    effort: '5h', budget: '4 800 000 FCFA', impact: 'Score CEMAC 58→85/100', roi: 'Évite sanction COBAC — gel activités possible',
    kpiBefore: 'Cartographie CEMAC 58/100', kpiAfter: 'Cartographie CEMAC 85/100', deadline: '2026-07-15', assigned: 'Compliance Officer + Juridique', dependencies: [],
  },
  {
    id: 'OPT-006', title: 'Convertir 89 images en WebP + responsive + lazy loading — LCP 4.8s→2.5s',
    category: 'performance', block: 'Performance Digitale', priority: 'P0', severity: 'critical', status: 'in_progress',
    description: '89 images non optimisées (PNG/JPEG >500 KB) sur le site. LCP 4.8s (Google "Poor"). Impact direct SEO + taux de rebond +35%.',
    effort: '12h', budget: '4 200 000 FCFA', impact: 'LCP 4.8s→2.5s — Google "Good"', roi: '+15% trafic organique estimé, -25% taux rebond',
    kpiBefore: 'LCP 4.8s — Poor', kpiAfter: 'LCP ≤2.5s — Good', deadline: '2026-07-21', assigned: 'Lead Dev Frontend + DevOps', dependencies: [],
  },
  {
    id: 'OPT-007', title: 'Rédiger et faire adopter 25 politiques SOC 2 par le COMEX',
    category: 'compliance', block: 'Performance Digitale', priority: 'P0', severity: 'critical', status: 'open',
    description: 'SOC 2 Readiness 42/100 — 25 politiques non rédigées. Bloque certification SOC 2 Type II. Exigence contractuelle 3 clients corporate.',
    effort: '40h', budget: '18 000 000 FCFA', impact: 'SOC 2 Readiness 42→80/100', roi: 'Débloque 3 contrats corporate — 450M FCFA pipeline',
    kpiBefore: 'SOC 2 Readiness 42/100', kpiAfter: 'SOC 2 Readiness 80/100', deadline: '2026-12-31', assigned: 'RSSI + DPO + Juridique', dependencies: [],
  },
  {
    id: 'OPT-008', title: 'ProcessMining — optimiser goulot Revue Associé 48h→24h',
    category: 'data', block: 'Data & Intelligence', priority: 'P0', severity: 'critical', status: 'open',
    description: 'Workflow Proposition : goulot Revue Associé à 48h vs cible Big Four 24h. 60% des propositions retardées. Perte de deals estimée 280M FCFA.',
    effort: '16h', budget: '5 200 000 FCFA', impact: '100% propositions on-time', roi: 'Récupération 280M FCFA deals retardés',
    kpiBefore: 'Délai Revue Associé 48h', kpiAfter: 'Délai Revue Associé ≤24h', deadline: '2026-07-15', assigned: 'Lead Data Engineer + COO', dependencies: [],
  },
  {
    id: 'OPT-009', title: 'Publier Baromètre Inclusion Financière — 15 jours de retard',
    category: 'growth', block: 'Data & Intelligence', priority: 'P0', severity: 'critical', status: 'in_progress',
    description: 'Publication flagship BCEAO attendue par 450+ SFD UEMOA. Retard de 15 jours — crédibilité institutionnelle en jeu.',
    effort: '40h', budget: '3 500 000 FCFA', impact: 'Publication effective + communiqué BCEAO', roi: 'Génération 25-40 leads qualifiés SFD',
    kpiBefore: 'Baromètre non publié — 15j retard', kpiAfter: 'Baromètre publié + presse', deadline: '2026-07-07', assigned: 'Research Director', dependencies: [],
  },
  {
    id: 'OPT-010', title: 'Débloquer LinkedIn MDP — approbation en attente depuis 60 jours',
    category: 'growth', block: 'Croissance & CRM', priority: 'P0', severity: 'critical', status: 'open',
    description: 'Marketing Developer Platform LinkedIn bloquée. 0 posts programmables. Pipeline éditorial à l\'arrêt pour juillet.',
    effort: 'Suivi LinkedIn', budget: '500 000 FCFA', impact: '30 posts/mois LinkedIn actifs', roi: 'Visibilité DG restaurée — 250K impressions/mois',
    kpiBefore: '0 posts LinkedIn programmables', kpiAfter: '30 posts/mois programmés', deadline: '2026-07-01', assigned: 'Marketing Director', dependencies: [],
  },
  {
    id: 'OPT-011', title: 'Réduire bundle JS 1.8MB→500KB — tree shaking + code splitting',
    category: 'code', block: 'Architecture Code', priority: 'P1', severity: 'high', status: 'open',
    description: 'Bundle principal 1.8 MB (gzip 520 KB) — 3× seuil acceptable. LCP +2s sur mobile 3G, TBT > 300ms.',
    effort: '24h', budget: '6 000 000 FCFA', impact: 'Bundle JS -72%, LCP -1.5s', roi: 'Amélioration SEO directe — toutes les pages',
    kpiBefore: 'Bundle JS 1.8 MB gzip 520 KB', kpiAfter: 'Bundle JS ≤800 KB gzip ≤250 KB', deadline: '2026-08-31', assigned: 'Lead Dev Frontend', dependencies: [],
  },
  {
    id: 'OPT-012', title: 'Finaliser documents SMSI PCA + SDLC sécurisé — certification ISO 27001',
    category: 'compliance', block: 'Conformité & Certification', priority: 'P1', severity: 'high', status: 'in_progress',
    description: '2 documents SMSI critiques à l\'état brouillon. Bloquent certification ISO 27001:2022. 114/114 contrôles prêts sauf ces 2 documents.',
    effort: '16h', budget: '4 500 000 FCFA', impact: 'Certification ISO 27001:2022 possible', roi: 'Prérequis contrats institutions financières',
    kpiBefore: '2 docs SMSI brouillon', kpiAfter: '2 docs SMSI validés COMEX', deadline: '2026-08-15', assigned: 'RSSI + DPO', dependencies: [],
  },
  {
    id: 'OPT-013', title: 'EcoVadis — collecter 4 preuves Achats Responsables (score 30→70)',
    category: 'compliance', block: 'ESG & Durabilité', priority: 'P1', severity: 'high', status: 'open',
    description: 'Domaine Achats Responsables EcoVadis score 30/68 — 4 preuves manquantes sur 10. Plafonne score global à Argent (42) au lieu de Gold (75).',
    effort: '5h', budget: '4 200 000 FCFA', impact: 'Score Achats Responsables 30→70/100', roi: 'Score EcoVadis Argent→Gold — avantage compétitif',
    kpiBefore: 'EcoVadis Achats 30/68', kpiAfter: 'EcoVadis Achats 70/68', deadline: '2026-08-15', assigned: 'ESG Officer + Procurement', dependencies: [],
  },
  {
    id: 'OPT-014', title: 'Contacter 3 clients corporate sans contact Q2 — risque churn 185M FCFA',
    category: 'growth', block: 'Croissance & CRM', priority: 'P1', severity: 'high', status: 'open',
    description: '3 clients corporate sans contact depuis Q2 2026. Risque de churn estimé à 185M FCFA de CA annuel.',
    effort: '15 min', budget: '0 FCFA', impact: 'Rétention 3 clients — 185M FCFA sécurisés', roi: 'ROI infini — 15 min vs 185M FCFA',
    kpiBefore: '3 clients sans contact Q2', kpiAfter: '3 clients recontactés', deadline: '2026-06-25', assigned: 'Client Success Manager', dependencies: [],
  },
  {
    id: 'OPT-015', title: 'npm audit fix — résoudre 15 vulnérabilités (12 high + 3 critical)',
    category: 'security', block: 'Performance Digitale', priority: 'P1', severity: 'high', status: 'open',
    description: 'Dépendances npm avec 15 vulnérabilités connues. Supply chain attack surface élargie. 3 critiques dans des libs de production.',
    effort: '3h', budget: '1 200 000 FCFA', impact: '0 vulnérabilités npm', roi: 'Protection supply chain — risque zero',
    kpiBefore: '15 vulns npm (3 critical)', kpiAfter: '0 vuln npm', deadline: '2026-07-15', assigned: 'Lead Dev Frontend', dependencies: [],
  },
  {
    id: 'OPT-016', title: 'Ajouter JWT verification sur 7 edge functions non protégées',
    category: 'security', block: 'Opérations & Production', priority: 'P1', severity: 'high', status: 'open',
    description: '7 edge functions sur 98 sans JWT verification. Endpoints exposés sans authentification. Risque d\'accès non autorisé.',
    effort: '3h', budget: '1 500 000 FCFA', impact: '100% edge functions protégées', roi: 'Zéro endpoint non authentifié',
    kpiBefore: '91/98 edge functions JWT', kpiAfter: '98/98 edge functions JWT', deadline: '2026-07-15', assigned: 'Lead Dev Backend', dependencies: [],
  },
  {
    id: 'OPT-017', title: 'Activer RLS sur 3 tables Supabase non protégées',
    category: 'security', block: 'Opérations & Production', priority: 'P1', severity: 'high', status: 'open',
    description: 'Tables monitoring_logs, url_check_results, social_api_tokens sans Row Level Security. Données exposées sans contrôle d\'accès.',
    effort: '1h', budget: '500 000 FCFA', impact: '100% tables RLS activée', roi: 'Zéro table non protégée',
    kpiBefore: '3 tables sans RLS', kpiAfter: '0 tables sans RLS', deadline: '2026-07-15', assigned: 'Lead Dev Backend', dependencies: [],
  },
  {
    id: 'OPT-018', title: 'Corriger cron tender-scraper — 3 échecs silencieux + alerting',
    category: 'infrastructure', block: 'Opérations & Production', priority: 'P1', severity: 'high', status: 'in_progress',
    description: 'Cron job tender-scraper avec 3 échecs silencieux sur 7 jours. Aucun alerting configuré. Perte de 15 AO potentiels.',
    effort: '2h', budget: '800 000 FCFA', impact: 'Cron 100% fiabilité + alerting', roi: 'Détection 100% AO — 15 AO récupérés',
    kpiBefore: 'Cron 57% fiabilité 7j', kpiAfter: 'Cron 100% fiabilité + alerting', deadline: '2026-07-01', assigned: 'DevOps', dependencies: [],
  },
  {
    id: 'OPT-019', title: 'Refonte pricing — TJM 2025→2026 dans 8 templates propositions',
    category: 'quality', block: 'Qualité & Production', priority: 'P1', severity: 'high', status: 'open',
    description: '8 templates de propositions utilisent TJM 2025. Sous-facturation potentielle de 12% — perte estimée 68M FCFA/an.',
    effort: '20 min', budget: '0 FCFA', impact: 'TJM 2026 sur 100% templates', roi: '+12% CA sur nouvelles propositions',
    kpiBefore: 'TJM 2025 sur 8 templates', kpiAfter: 'TJM 2026 sur 8 templates', deadline: '2026-06-25', assigned: 'Quality Lead', dependencies: [],
  },
  {
    id: 'OPT-020', title: 'Ajouter Google-Extended bot + sections OHADA dans llms-full.txt',
    category: 'growth', block: 'SEO, GEO & Visibilité', priority: 'P1', severity: 'high', status: 'open',
    description: '3 pages non crawlées par Google-Extended (Gemini). 800+ lignes OHADA absentes de llms-full.txt. Invisibles pour ChatGPT/Claude/Perplexity.',
    effort: '35 min', budget: '0 FCFA', impact: 'Couverture AI search +20%', roi: 'Visibilité LLMs — coût zero',
    kpiBefore: 'Couverture Gemini 0%, OHADA LLM 0%', kpiAfter: 'Couverture Gemini 100%, OHADA LLM 100%', deadline: '2026-06-25', assigned: 'SEO Lead', dependencies: [],
  },
];

export const CERTIFICATION_PROGRESS: CertificationProgress[] = [
  { certificationId: 'cert-iso-27001', name: 'ISO 27001:2022 — Sécurité de l\'Information', issuer: 'ISO', currentScore: 92, targetScore: 100, status: 'in_progress', gaps: 2, resolved: 114, deadline: '2026-09-30', icon: 'ri-shield-check-line' },
  { certificationId: 'cert-iso-42001', name: 'ISO 42001:2023 — Management de l\'IA', issuer: 'ISO', currentScore: 95, targetScore: 100, status: 'in_progress', gaps: 1, resolved: 95, deadline: '2026-10-31', icon: 'ri-robot-3-line' },
  { certificationId: 'cert-iso-30401', name: 'ISO 30401:2018 — Knowledge Management', issuer: 'ISO', currentScore: 100, targetScore: 100, status: 'certified', gaps: 0, resolved: 48, deadline: '2026-09-25', icon: 'ri-brain-2-line' },
  { certificationId: 'cert-iso-9001', name: 'ISO 9001:2026 — Qualité', issuer: 'ISO', currentScore: 88, targetScore: 100, status: 'in_progress', gaps: 3, resolved: 42, deadline: '2026-12-31', icon: 'ri-medal-line' },
  { certificationId: 'cert-soc2', name: 'SOC 2 Type II — Contrôles de Sécurité', issuer: 'AICPA', currentScore: 42, targetScore: 100, status: 'planned', gaps: 25, resolved: 15, deadline: '2027-06-30', icon: 'ri-lock-line' },
  { certificationId: 'cert-owasp', name: 'OWASP Top 10 — Zéro Vulnérabilité Critique', issuer: 'OWASP Foundation', currentScore: 55, targetScore: 98, status: 'in_progress', gaps: 3, resolved: 7, deadline: '2026-08-15', icon: 'ri-bug-line' },
  { certificationId: 'cert-gafi', name: 'GAFI R.12 — Conformité PPE 90%', issuer: 'GAFI', currentScore: 65, targetScore: 90, status: 'in_progress', gaps: 2, resolved: 3, deadline: '2026-07-15', icon: 'ri-scales-line' },
  { certificationId: 'cert-cobac', name: 'COBAC R-2024/01 — Conformité CEMAC', issuer: 'COBAC', currentScore: 58, targetScore: 95, status: 'in_progress', gaps: 5, resolved: 2, deadline: '2026-07-31', icon: 'ri-bank-line' },
  { certificationId: 'cert-ecovadis', name: 'EcoVadis Gold — Score ≥ 75', issuer: 'EcoVadis', currentScore: 62, targetScore: 75, status: 'in_progress', gaps: 4, resolved: 6, deadline: '2026-09-30', icon: 'ri-leaf-line' },
  { certificationId: 'cert-cwv', name: 'Core Web Vitals — Google Good', issuer: 'Google', currentScore: 48, targetScore: 90, status: 'in_progress', gaps: 3, resolved: 1, deadline: '2026-08-15', icon: 'ri-speed-line' },
];

export function computeTotalQualityKPIs(): TotalQualityKPIs {
  const blocks = TOTAL_QUALITY_BLOCK_AUDITS;
  const opts = SYSTEM_OPTIMIZATION_ACTIONS;
  const certs = CERTIFICATION_PROGRESS;

  const globalScore = Math.round(blocks.reduce((s, b) => s + b.overallScore, 0) / blocks.length * 10) / 10;
  const totalFindings = blocks.reduce((s, b) => s + b.findings.critical + b.findings.major + b.findings.minor, 0);
  const criticalOpen = blocks.reduce((s, b) => s + b.findings.critical, 0);
  const majorOpen = blocks.reduce((s, b) => s + b.findings.major, 0);
  const minorOpen = blocks.reduce((s, b) => s + b.findings.minor, 0);
  const totalFixed = blocks.reduce((s, b) => s + b.fixed, 0);
  const totalAutoFixable = blocks.reduce((s, b) => s + b.autoFixable, 0);

  return {
    globalQualityScore: globalScore,
    globalQualityTarget: 100,
    blocksScanned: blocks.length,
    blocksOptimal: blocks.filter(b => b.status === 'optimal').length,
    blocksStable: blocks.filter(b => b.status === 'stable').length,
    blocksDegraded: blocks.filter(b => b.status === 'degraded').length,
    blocksCritical: blocks.filter(b => b.status === 'critical').length,
    totalFindings,
    criticalOpen,
    majorOpen,
    minorOpen,
    totalFixed,
    totalAutoFixable,
    automatesAudited: QUALITY_AUTOMATES_AUDIT.length,
    automatesDeployed: QUALITY_AUTOMATES_AUDIT.filter(a => a.status === 'deployed').length,
    automatesPartial: QUALITY_AUTOMATES_AUDIT.filter(a => a.status === 'partial').length,
    certificationsTotal: certs.length,
    certificationsAchieved: certs.filter(c => c.status === 'certified').length,
    optimizationsIdentified: opts.length,
    optimizationsInProgress: opts.filter(o => o.status === 'in_progress').length,
    optimizationsCompleted: opts.filter(o => o.status === 'completed').length,
    estimatedTotalEffort: '286 heures (7 semaines)',
    estimatedTotalBudget: '72 200 000 FCFA',
    projectedCompletion: '2026-08-31',
  };
}

export const TOTAL_QUALITY_AUDIT_META = {
  auditId: 'KOS-TQA-2026-06-23-001',
  auditDate: '2026-06-23T06:00:00Z',
  auditType: 'Audit Qualité Totale 120% Big Four + Optimisation Système',
  assessor: 'Consortium PwC · Deloitte · EY · KPMG — Quality Assurance Practice',
  scope: '12 blocs · 75 agents · 48 automates · 10 certifications · 2 847 fichiers · 412 850 lignes',
  methodology: 'ISO 9001:2026 + EFQM Excellence Model + Big Four Quality Framework',
  mandate: 'Managing Partner — 23 Juin 2026',
  globalScore: 76.2,
  globalTarget: 100,
  status: 'IN_PROGRESS',
  nextAuditScheduled: '2026-07-23T06:00:00Z',
};



