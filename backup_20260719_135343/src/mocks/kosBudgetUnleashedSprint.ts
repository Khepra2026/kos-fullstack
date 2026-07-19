// ============================================================
// KOS BUDGET UNLEASHED SPRINT — Toutes les actions bloquées budget sont débloquées
// Exécution immédiate par les automates et agents KOS
// OPT-005 Cartographie CEMAC + OPT-007 Politiques SOC 2
// + actions résiduelles du plan 120% qui nécessitaient validation COMEX
// Mandat Managing Partner — 23 Juin 2026 — Budget débloqué
// ============================================================

export interface BudgetUnleashedAction {
  id: string;
  title: string;
  category: 'security' | 'performance' | 'compliance' | 'quality' | 'infrastructure' | 'growth' | 'data' | 'code';
  block: string;
  originalBudget: string;
  allocatedBudget: string;
  budgetSource: string;
  previousStatus: 'blocked_budget' | 'pending_approval' | 'waiting_comex';
  executionStatus: 'executed' | 'in_progress' | 'pending' | 'validating';
  progress: number;
  timeSpent: string;
  timeEstimate: string;
  unlockTrigger: string;
  impact: string;
  kpiBefore: string;
  kpiAfter: string;
  actualKpi: string;
  automatesInvolved: string[];
  agentsInvolved: string[];
  externalPartners: string[];
  startedAt: string;
  estimatedCompletion: string;
  icon: string;
  milestones: { label: string; done: boolean; timestamp: string }[];
}

export interface BudgetUnleashedKPIs {
  totalActions: number;
  executed: number;
  inProgress: number;
  pending: number;
  validating: number;
  totalBudgetAllocated: string;
  totalBudgetPreviouslyBlocked: string;
  totalTimeSpent: string;
  totalTimeEstimated: string;
  automatesDeployed: number;
  agentsActivated: number;
  externalPartnersEngaged: number;
  globalImpactScore: number;
  sprintStart: string;
  sprintTarget: string;
  mandateRef: string;
  comexDecisionRef: string;
}

export const BUDGET_UNLEASHED_ACTIONS: BudgetUnleashedAction[] = [
  {
    id: 'OPT-005',
    title: 'Cartographie LCB/FT CEMAC — intégrer COBAC R-2023/05 + validation externe agréé + score 58→85',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '4 800 000 FCFA',
    allocatedBudget: '2 800 000 FCFA',
    budgetSource: 'COMEX — Autorisation spéciale n°2026-06-23-COMEX-005',
    previousStatus: 'blocked_budget',
    executionStatus: 'in_progress',
    progress: 68,
    timeSpent: '3h15',
    timeEstimate: '5h',
    unlockTrigger: 'Décision COMEX 11h00 — déblocage 2,8M FCFA pour validation externe COBAC. Consultant agréé CEMAC mandaté immédiatement.',
    impact: 'Score CEMAC 58→85/100 — Conformité COBAC R-2023/05 — Zéro risque inspection',
    kpiBefore: 'Cartographie CEMAC 58/100 — COBAC R-2023/05 non intégré',
    kpiAfter: 'Cartographie CEMAC 85/100 — COBAC R-2023/05 full coverage',
    actualKpi: 'Cartographie 70→78/100 en 3h15 — 4/5 axes cartographiés ✅ — Consultation externe COBAC en cours 🔄 — Validation attendue 24/06 14h',
    automatesInvolved: ['kos-regulatory-compliance-automates', 'kos-compliance-quality-max', 'kos-total-governance-regulatory-excellence'],
    agentsInvolved: ['Compliance Officer CEMAC', 'Juridique OHADA', 'KOS Regulatory Intelligence Engine'],
    externalPartners: ['Consultant agréé COBAC — Cabinet CEMAC Partner (mandaté 11h30)'],
    startedAt: '2026-06-23T11:00:00Z',
    estimatedCompletion: '2026-06-24T14:00:00Z',
    icon: 'ri-map-pin-line',
    milestones: [
      { label: 'Déblocage budget COMEX', done: true, timestamp: '2026-06-23T11:00:00Z' },
      { label: 'Mandat consultant agréé COBAC', done: true, timestamp: '2026-06-23T11:30:00Z' },
      { label: 'Intégration COBAC R-2023/05', done: true, timestamp: '2026-06-23T12:45:00Z' },
      { label: 'Cartographie 4/5 axes', done: true, timestamp: '2026-06-23T14:15:00Z' },
      { label: 'Review externe consultant', done: false, timestamp: '2026-06-24T10:00:00Z' },
      { label: 'Validation finale COBAC', done: false, timestamp: '2026-06-24T14:00:00Z' },
    ],
  },
  {
    id: 'OPT-007',
    title: 'Rédiger et faire adopter 25 politiques SOC 2 par le COMEX — auditeur AICPA mandaté',
    category: 'compliance',
    block: 'Performance Digitale',
    originalBudget: '18 000 000 FCFA',
    allocatedBudget: '15 000 000 FCFA',
    budgetSource: 'COMEX — Autorisation spéciale n°2026-06-23-COMEX-007 + partenariat AICPA',
    previousStatus: 'blocked_budget',
    executionStatus: 'in_progress',
    progress: 42,
    timeSpent: '6h30',
    timeEstimate: '40h',
    unlockTrigger: 'Décision COMEX 11h00 — déblocage 15M FCFA pour auditeur SOC 2 certifié AICPA. Cabinet d\'audit Big Four mandaté.',
    impact: 'SOC 2 Readiness 52→85/100 — Débloque certification SOC 2 Type II — Pipeline 450M FCFA',
    kpiBefore: 'SOC 2 Readiness 52/100 — 5/25 politiques rédigées',
    kpiAfter: 'SOC 2 Readiness 85/100 — 25/25 politiques rédigées + audit externe',
    actualKpi: 'SOC 2 Readiness 52→64/100 — 12/25 politiques rédigées ✅ — Auditeur AICPA onboarding 11h45 ✅ — 8 politiques en review 🔄 — 5 à lancer 🔄',
    automatesInvolved: ['kos-compliance-security-certification', 'kos-policy-documents', 'kos-quality-risk-management', 'kos-cyber-security-automates'],
    agentsInvolved: ['RSSI', 'DPO', 'Juridique', 'KOS Policy Engine', 'KOS Quality Assurance Authority'],
    externalPartners: ['Auditeur AICPA certifié — Big Four Firm (mandaté 11h45)', 'Cabinet juridique spécialisé SOC 2'],
    startedAt: '2026-06-23T11:00:00Z',
    estimatedCompletion: '2026-07-15T18:00:00Z',
    icon: 'ri-file-shield-2-line',
    milestones: [
      { label: 'Déblocage budget COMEX', done: true, timestamp: '2026-06-23T11:00:00Z' },
      { label: 'Onboarding auditeur AICPA', done: true, timestamp: '2026-06-23T11:45:00Z' },
      { label: 'Kick-off meeting auditeur', done: true, timestamp: '2026-06-23T12:30:00Z' },
      { label: 'Batch 1 — 12 politiques rédigées', done: true, timestamp: '2026-06-23T17:30:00Z' },
      { label: 'Batch 2 — 8 politiques en review', done: false, timestamp: '2026-06-25T18:00:00Z' },
      { label: 'Batch 3 — 5 politiques restantes', done: false, timestamp: '2026-07-01T18:00:00Z' },
      { label: 'Revue externe AICPA complète', done: false, timestamp: '2026-07-10T18:00:00Z' },
      { label: 'Adoption COMEX finale', done: false, timestamp: '2026-07-15T18:00:00Z' },
    ],
  },
  {
    id: 'OPT-005-BIS',
    title: 'Étendre cartographie LCB/FT aux 6 pays CEMAC — consolidation sous-régionale',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '3 500 000 FCFA',
    allocatedBudget: '3 500 000 FCFA',
    budgetSource: 'COMEX — Extension autorisée n°2026-06-23-COMEX-005BIS',
    previousStatus: 'pending_approval',
    executionStatus: 'in_progress',
    progress: 28,
    timeSpent: '1h20',
    timeEstimate: '8h',
    unlockTrigger: 'Effet domino OPT-005 — une fois le consultant COBAC mandaté, extension naturelle aux 5 autres pays CEMAC.',
    impact: 'Couverture CEMAC 17%→100% — Avantage compétitif unique',
    kpiBefore: 'Cartographie CEMAC limitée au Cameroun (17% CEMAC)',
    kpiAfter: 'Cartographie 6/6 pays CEMAC — couverture 100%',
    actualKpi: 'Cameroun 78% ✅ — Gabon 45% 🔄 — Congo 30% 🔄 — RCA 15% 🔄 — Tchad 10% 🔄 — Guinée Équatoriale 8% 🔄',
    automatesInvolved: ['kos-africa-observatories', 'kos-francophone-africa-strategic-center', 'kos-regulatory-compliance-audit'],
    agentsInvolved: ['Compliance Officer CEMAC', 'KOS Africa Observatories Engine', 'KOS Regulatory Intelligence'],
    externalPartners: ['Consultant agréé COBAC — Cabinet CEMAC Partner', 'Correspondants locaux Gabon, Congo, RCA, Tchad, GE'],
    startedAt: '2026-06-23T12:30:00Z',
    estimatedCompletion: '2026-06-27T18:00:00Z',
    icon: 'ri-earth-line',
    milestones: [
      { label: 'Extension autorisée COMEX', done: true, timestamp: '2026-06-23T12:30:00Z' },
      { label: 'Cameroun finalisé', done: true, timestamp: '2026-06-23T14:15:00Z' },
      { label: 'Correspondants locaux activés', done: true, timestamp: '2026-06-23T13:50:00Z' },
      { label: 'Gabon cartographie', done: false, timestamp: '2026-06-24T18:00:00Z' },
      { label: 'Congo cartographie', done: false, timestamp: '2026-06-25T18:00:00Z' },
      { label: 'RCA + Tchad + GE', done: false, timestamp: '2026-06-27T18:00:00Z' },
    ],
  },
  {
    id: 'OPT-007-BIS',
    title: 'Lancer pré-audit SOC 2 Type II — gap analysis complet avec auditeur AICPA',
    category: 'compliance',
    block: 'Performance Digitale',
    originalBudget: '8 500 000 FCFA',
    allocatedBudget: '8 500 000 FCFA',
    budgetSource: 'COMEX — Phase 2 SOC 2 n°2026-06-23-COMEX-007BIS',
    previousStatus: 'waiting_comex',
    executionStatus: 'in_progress',
    progress: 15,
    timeSpent: '2h',
    timeEstimate: '35h',
    unlockTrigger: 'Une fois l\'auditeur AICPA mandaté pour OPT-007, le pré-audit complet est déclenché automatiquement.',
    impact: 'Roadmap certifiée SOC 2 Type II — délai certification réduit de 6 mois',
    kpiBefore: 'SOC 2 gap analysis = 0% — inconnu total',
    kpiAfter: 'SOC 2 gap analysis = 100% — plan de remédiation chiffré',
    actualKpi: 'Kick-off auditeur ✅ — Questionnaire AICPA complété ✅ — 28/114 critères évalués 🔄 — Rapport intermédiaire 26/06',
    automatesInvolved: ['kos-compliance-security-certification', 'kos-enterprise-security-full', 'kos-correction-engine', 'kos-system-integrity-scanner'],
    agentsInvolved: ['RSSI', 'DPO', 'Lead DevOps', 'KOS Enterprise Security Engine', 'KOS System Integrity Scanner'],
    externalPartners: ['Auditeur AICPA certifié — Big Four Firm'],
    startedAt: '2026-06-23T13:00:00Z',
    estimatedCompletion: '2026-07-31T18:00:00Z',
    icon: 'ri-search-eye-line',
    milestones: [
      { label: 'Mandat auditeur AICPA', done: true, timestamp: '2026-06-23T13:00:00Z' },
      { label: 'Questionnaire AICPA', done: true, timestamp: '2026-06-23T15:00:00Z' },
      { label: 'Rapport intermédiaire', done: false, timestamp: '2026-06-26T18:00:00Z' },
      { label: 'Gap analysis complet', done: false, timestamp: '2026-07-15T18:00:00Z' },
      { label: 'Plan de remédiation', done: false, timestamp: '2026-07-31T18:00:00Z' },
    ],
  },
  {
    id: 'OPT-021',
    title: 'Déployer scanner OWASP automatisé hebdomadaire — ZAP DAST pipeline CI/CD',
    category: 'security',
    block: 'Performance Digitale',
    originalBudget: '2 200 000 FCFA',
    allocatedBudget: '2 200 000 FCFA',
    budgetSource: 'COMEX — Budget sécurité préventive n°2026-06-23-COMEX-021',
    previousStatus: 'pending_approval',
    executionStatus: 'in_progress',
    progress: 55,
    timeSpent: '3h',
    timeEstimate: '6h',
    unlockTrigger: 'Effet domino OPT-001/002 — les vulns OWASP corrigées, maintenant on automatise la détection continue.',
    impact: 'Détection OWASP continue — MTTD vulnérabilités 30j→<24h',
    kpiBefore: 'Scan OWASP manuel trimestriel — MTTD 30 jours',
    kpiAfter: 'Scan OWASP auto hebdomadaire — MTTD < 24h',
    actualKpi: 'ZAP DAST installé CI/CD ✅ — 3 règles custom configurées ✅ — Premier scan programmé 25/06 🔄',
    automatesInvolved: ['kos-security-scan', 'kos-cyber-security-automates', 'kos-system-integrity-scanner'],
    agentsInvolved: ['RSSI', 'Lead Dev Backend', 'DevOps', 'KOS Security Scan Engine'],
    externalPartners: [],
    startedAt: '2026-06-23T14:00:00Z',
    estimatedCompletion: '2026-06-25T18:00:00Z',
    icon: 'ri-radar-line',
    milestones: [
      { label: 'ZAP DAST installation', done: true, timestamp: '2026-06-23T14:00:00Z' },
      { label: 'Pipeline CI/CD intégré', done: true, timestamp: '2026-06-23T16:00:00Z' },
      { label: 'Règles OWASP Top 10 configurées', done: true, timestamp: '2026-06-23T17:00:00Z' },
      { label: 'Premier scan programmé', done: false, timestamp: '2026-06-25T06:00:00Z' },
      { label: 'Alerting Slack configuré', done: false, timestamp: '2026-06-25T18:00:00Z' },
    ],
  },
  {
    id: 'OPT-022',
    title: 'Audit de certification ISO 27001:2022 — phase 1 documentation',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '6 500 000 FCFA',
    allocatedBudget: '6 500 000 FCFA',
    budgetSource: 'COMEX — Certification ISO 27001 n°2026-06-23-COMEX-022',
    previousStatus: 'waiting_comex',
    executionStatus: 'in_progress',
    progress: 35,
    timeSpent: '2h30',
    timeEstimate: '18h',
    unlockTrigger: 'SMSI PCA + SDLC (OPT-012) finalisés en interne — maintenant l\'auditeur ISO 27001 externe peut intervenir.',
    impact: 'Certification ISO 27001:2022 déclenchée — avantage compétitif institutionnel',
    kpiBefore: 'ISO 27001 gap = 8 contrôles non documentés',
    kpiAfter: 'ISO 27001 phase 1 documentation = 100%',
    actualKpi: 'Auditeur ISO 27001 mandaté ✅ — 114/116 contrôles documentés ✅ — 2 en finalisation 🔄 — Audit phase 1 planifié 28/06',
    automatesInvolved: ['kos-compliance-security-certification', 'kos-policy-documents', 'kos-quality-risk-management'],
    agentsInvolved: ['RSSI', 'DPO', 'Quality Manager', 'KOS Policy Engine', 'KOS Quality Assurance Authority'],
    externalPartners: ['Auditeur ISO 27001 certifié — Organisme de certification'],
    startedAt: '2026-06-23T13:30:00Z',
    estimatedCompletion: '2026-07-15T18:00:00Z',
    icon: 'ri-shield-check-line',
    milestones: [
      { label: 'Mandat auditeur ISO 27001', done: true, timestamp: '2026-06-23T13:30:00Z' },
      { label: 'Documentation 114/116 contrôles', done: true, timestamp: '2026-06-23T16:00:00Z' },
      { label: 'Revue documentaire auditeur', done: false, timestamp: '2026-06-28T18:00:00Z' },
      { label: 'Audit phase 1', done: false, timestamp: '2026-07-05T18:00:00Z' },
      { label: 'Rapport phase 1', done: false, timestamp: '2026-07-15T18:00:00Z' },
    ],
  },
];

export function computeBudgetUnleashedKPIs(): BudgetUnleashedKPIs {
  const actions = BUDGET_UNLEASHED_ACTIONS;
  const totalAllocated = actions.reduce((sum, a) => {
    const num = parseInt(a.allocatedBudget.replace(/[^0-9]/g, ''), 10);
    return sum + num;
  }, 0);
  const totalPreviouslyBlocked = actions.reduce((sum, a) => {
    const num = parseInt(a.originalBudget.replace(/[^0-9]/g, ''), 10);
    return sum + num;
  }, 0);

  const allAutomates = new Set<string>();
  const allAgents = new Set<string>();
  const allPartners = new Set<string>();
  actions.forEach(a => {
    a.automatesInvolved.forEach(x => allAutomates.add(x));
    a.agentsInvolved.forEach(x => allAgents.add(x));
    a.externalPartners.forEach(x => allPartners.add(x));
  });

  return {
    totalActions: actions.length,
    executed: actions.filter(a => a.executionStatus === 'executed').length,
    inProgress: actions.filter(a => a.executionStatus === 'in_progress').length,
    pending: actions.filter(a => a.executionStatus === 'pending').length,
    validating: actions.filter(a => a.executionStatus === 'validating').length,
    totalBudgetAllocated: `${(totalAllocated / 1000000).toFixed(1)}M FCFA`,
    totalBudgetPreviouslyBlocked: `${(totalPreviouslyBlocked / 1000000).toFixed(1)}M FCFA`,
    totalTimeSpent: '18h35',
    totalTimeEstimated: '112h',
    automatesDeployed: allAutomates.size,
    agentsActivated: allAgents.size,
    externalPartnersEngaged: allPartners.size,
    globalImpactScore: 82,
    sprintStart: '2026-06-23T11:00:00Z',
    sprintTarget: '2026-07-31T18:00:00Z',
    mandateRef: 'MP-2026-06-23-BUDGET-UNLEASHED',
    comexDecisionRef: 'COMEX-2026-06-23-SPECIAL',
  };
}

export const BUDGET_UNLEASHED_META = {
  sprintId: 'KOS-BUL-2026-06-23-001',
  sprintName: 'Sprint Budget Unleashed — Toutes les actions débloquées',
  mandate: 'Managing Partner — 23 Juin 2026 — Budget COMEX débloqué',
  philosophy: 'Ce qui était bloqué par absence de budget est maintenant exécuté immédiatement. Les automates KOS + partenaires externes sont mobilisés.',
  totalBudgetAllocated: '38 500 000 FCFA',
  totalValueCreated: 'Estimé 985M FCFA (conformité CEMAC + SOC 2 + ISO 27001 + sécurité continue)',
  decisionCOMEXX: 'Réunion extraordinaire 23 Juin 2026 — 11h00 — Déblocage immédiat tous budgets d\'optimisation',
  status: 'IN_PROGRESS',
  previouslyBlockedActions: 2,
  newlyApprovedActions: 4,
  totalActionsUnleashed: 6,
  combinedSprint1And2BudgetAvoided: '79 000 000 FCFA',
  budgetNowInvested: '38 500 000 FCFA',
  netBudgetEfficiency: '79M évités + 38,5M investis = ROI stratosphérique',
};



