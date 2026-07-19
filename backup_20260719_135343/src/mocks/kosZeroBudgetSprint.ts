// ============================================================
// KOS ZERO BUDGET SPRINT — Exécution Immédiate
// 10 premières actions d'optimisation du Plan Qualité 120%
// Mandat Managing Partner — 23 Juin 2026 — 0 FCFA
// ============================================================

export interface ZeroBudgetAction {
  id: string;
  title: string;
  category: 'security' | 'performance' | 'compliance' | 'quality' | 'infrastructure' | 'growth' | 'data' | 'code';
  block: string;
  originalBudget: string;
  budgetStatus: 'zero_cost' | 'internal_effort' | 'blocked_budget' | 'creative_workaround';
  executionStatus: 'executed' | 'in_progress' | 'pending' | 'blocked';
  progress: number;
  timeSpent: string;
  timeEstimate: string;
  workaround: string;
  impact: string;
  kpiBefore: string;
  kpiAfter: string;
  actualKpi: string;
  constraints: string[];
  breakthrough: string;
  assigned: string;
  startedAt: string;
  estimatedCompletion: string;
  icon: string;
}

export interface ZeroBudgetSprintKPIs {
  totalActions: number;
  executed: number;
  inProgress: number;
  pending: number;
  blocked: number;
  totalBudgetAvoided: string;
  totalTimeSpent: string;
  totalTimeEstimated: string;
  actionsZeroCost: number;
  actionsInternalEffort: number;
  actionsBlockedBudget: number;
  actionsCreativeWorkaround: number;
  globalImpactScore: number;
  sprintStart: string;
  sprintTarget: string;
  mandateRef: string;
}

export const ZERO_BUDGET_ACTIONS: ZeroBudgetAction[] = [
  {
    id: 'OPT-001',
    title: 'Corriger 3 vulnérabilités OWASP critiques (IDOR API, SQL injection, XSS reflété)',
    category: 'security',
    block: 'Performance Digitale',
    originalBudget: '6 800 000 FCFA',
    budgetStatus: 'internal_effort',
    executionStatus: 'in_progress',
    progress: 72,
    timeSpent: '10h30',
    timeEstimate: '15h',
    workaround: 'Lead Dev Backend exécute lui-même les correctifs OWASP — 0 FCFA externe. IDOR corrigé via UUID validation, SQLi via paramétrisation, XSS via DOMPurify.',
    impact: '0 vulnérabilités Critical/High — score OWASP 55→82',
    kpiBefore: 'OWASP 55/100 — 3 vulns critiques',
    kpiAfter: 'OWASP 82/100 — 0 vuln critique',
    actualKpi: 'OWASP 68/100 — IDOR ✅, SQLi 🔄, XSS 🔄',
    constraints: ['Compétence interne OWASP disponible', 'Aucun budget pentest externe'],
    breakthrough: 'Fix IDOR en 3h via UUID validation au lieu de réécriture complète — gain 5h vs estimation',
    assigned: 'RSSI + Lead Dev Backend',
    startedAt: '2026-06-23T07:15:00Z',
    estimatedCompletion: '2026-06-24T18:00:00Z',
    icon: 'ri-bug-line',
  },
  {
    id: 'OPT-002',
    title: 'Déployer CSP strict + Permissions-Policy + HSTS preload sur toutes les routes',
    category: 'security',
    block: 'Sécurité & Conformité',
    originalBudget: '2 800 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '2h15',
    timeEstimate: '3h',
    workaround: 'Configuration Netlify headers gratuite. CSP généré automatiquement via script interne. Aucun coût externe.',
    impact: 'Score Mozilla Observatory 0→95/100',
    kpiBefore: 'Observatory 0/100 — 0 header sécurité',
    kpiAfter: 'Observatory 95/100 — CSP+A+B',
    actualKpi: 'Observatory 92/100 — CSP A+ ✅, HSTS ✅, Permissions-Policy ⚠️ 2 APIs à restreindre',
    constraints: ['Dépend de OPT-001 pour les inline scripts'],
    breakthrough: 'CSP en mode report-only d\'abord, puis enforce après validation — déploiement safe en 2h',
    assigned: 'RSSI + Lead Dev Frontend',
    startedAt: '2026-06-23T13:00:00Z',
    estimatedCompletion: '2026-06-23T15:15:00Z',
    icon: 'ri-shield-flash-line',
  },
  {
    id: 'OPT-003',
    title: 'Migrer template COBAC R-2016/01→R-2024/01 + créer module formation',
    category: 'compliance',
    block: 'Qualité & Production',
    originalBudget: '5 000 000 FCFA',
    budgetStatus: 'creative_workaround',
    executionStatus: 'in_progress',
    progress: 48,
    timeSpent: '4h30',
    timeEstimate: '9h30',
    workaround: 'Quality Lead migre template lui-même — pas de consultant externe. Formation interne via KOS Knowledge Factory au lieu de formateur externe.',
    impact: '100% templates conformes COBAC 2024',
    kpiBefore: 'Templates COBAC 0% conformes 2024',
    kpiAfter: 'Templates COBAC 100% conformes 2024',
    actualKpi: 'Template R-2024/01 créé ✅ — 8/12 sections migrées 🔄 — Module formation en cours',
    constraints: ['Pas de budget formateur externe', '12 consultants à former'],
    breakthrough: 'KOS Knowledge Factory génère le module formation automatiquement — économie 3,5M FCFA',
    assigned: 'Quality Lead + Compliance + Training',
    startedAt: '2026-06-23T08:00:00Z',
    estimatedCompletion: '2026-06-24T12:00:00Z',
    icon: 'ri-file-text-line',
  },
  {
    id: 'OPT-004',
    title: 'Améliorer KYC/CDD #4 — détection PPE 65%→90% (GAFI R.12)',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '2 500 000 FCFA',
    budgetStatus: 'internal_effort',
    executionStatus: 'in_progress',
    progress: 55,
    timeSpent: '1h40',
    timeEstimate: '3h',
    workaround: 'Compliance Officer enrichit base PPE manuellement via sources publiques gratuites (ONU, UE, OFAC). Script grep amélioré en interne.',
    impact: 'Conformité GAFI R.12 = 100%',
    kpiBefore: 'Détection PPE 65%',
    kpiAfter: 'Détection PPE 90%+',
    actualKpi: 'Détection PPE 78% — +13% via ajout liste OFAC + ONU en 1h40',
    constraints: ['Pas de licence World-Check/Refinitiv'],
    breakthrough: 'Agrégation 4 listes sanctions gratuites (ONU, UE, OFAC, UK HMT) — couverture PPE 78% déjà atteinte',
    assigned: 'Compliance Officer',
    startedAt: '2026-06-23T09:30:00Z',
    estimatedCompletion: '2026-06-23T16:00:00Z',
    icon: 'ri-user-search-line',
  },
  {
    id: 'OPT-005',
    title: 'Cartographie LCB/FT CEMAC — intégrer COBAC R-2023/05 + score 58→85',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '4 800 000 FCFA',
    budgetStatus: 'blocked_budget',
    executionStatus: 'in_progress',
    progress: 32,
    timeSpent: '1h35',
    timeEstimate: '5h',
    workaround: 'Partiellement débloqué — cartographie interne sans consultant CEMAC. Mais validation externe COBAC impossible à 0 FCFA.',
    impact: 'Score CEMAC 58→85/100',
    kpiBefore: 'Cartographie CEMAC 58/100',
    kpiAfter: 'Cartographie CEMAC 85/100',
    actualKpi: 'Cartographie 70/100 — COBAC R-2023/05 intégré ✅ — 3/5 axes cartographiés 🔄 — Validation externe BLOQUÉE',
    constraints: ['Validation externe COBAC nécessite consultant agréé CEMAC — 2,8M FCFA incompressible'],
    breakthrough: 'Cartographie interne 70% atteignable à 0 FCFA — 85% nécessite validation externe',
    assigned: 'Compliance Officer + Juridique',
    startedAt: '2026-06-23T11:00:00Z',
    estimatedCompletion: '2026-06-24T18:00:00Z',
    icon: 'ri-map-pin-line',
  },
  {
    id: 'OPT-006',
    title: 'Convertir 89 images en WebP + responsive + lazy loading — LCP 4.8s→2.5s',
    category: 'performance',
    block: 'Performance Digitale',
    originalBudget: '4 200 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '8h',
    timeEstimate: '12h',
    workaround: 'Script bash interne de conversion WebP + Imgix gratuit (plan starter). Lazy loading via attribut loading="lazy" natif. 0 FCFA.',
    impact: 'LCP 4.8s→2.5s — Google "Good"',
    kpiBefore: 'LCP 4.8s — Poor',
    kpiAfter: 'LCP ≤2.5s — Good',
    actualKpi: 'LCP 2.3s — Good ✅ — 89/89 images converties ✅ — lazy loading activé ✅',
    constraints: ['Aucun — tout l\'outillage est gratuit'],
    breakthrough: 'Script shell `for f in *.png *.jpg; do cwebp -q 85 "$f" -o "${f%.*}.webp"; done` — 89 images en 8h, 0 FCFA',
    assigned: 'Lead Dev Frontend + DevOps',
    startedAt: '2026-06-23T06:00:00Z',
    estimatedCompletion: '2026-06-23T14:00:00Z',
    icon: 'ri-image-line',
  },
  {
    id: 'OPT-007',
    title: 'Rédiger et faire adopter 25 politiques SOC 2 par le COMEX',
    category: 'compliance',
    block: 'Performance Digitale',
    originalBudget: '18 000 000 FCFA',
    budgetStatus: 'blocked_budget',
    executionStatus: 'in_progress',
    progress: 18,
    timeSpent: '3h',
    timeEstimate: '40h',
    workaround: 'RSSI rédige les 5 politiques prioritaires gratuitement. 20 politiques restantes nécessitent auditeur SOC 2 externe certifié AICPA.',
    impact: 'SOC 2 Readiness 42→80/100',
    kpiBefore: 'SOC 2 Readiness 42/100',
    kpiAfter: 'SOC 2 Readiness 80/100',
    actualKpi: 'SOC 2 Readiness 52/100 — 5/25 politiques rédigées ✅ — 20 politiques BLOQUÉES (auditeur AICPA obligatoire)',
    constraints: ['20 politiques nécessitent auditeur SOC 2 certifié AICPA — coût incompressible 15M FCFA'],
    breakthrough: '5 politiques prioritaires auto-rédigées via KOS Policy Engine — gain 10 points readiness à 0 FCFA',
    assigned: 'RSSI + DPO + Juridique',
    startedAt: '2026-06-23T14:00:00Z',
    estimatedCompletion: '2026-06-27T18:00:00Z',
    icon: 'ri-file-shield-2-line',
  },
  {
    id: 'OPT-008',
    title: 'ProcessMining — optimiser goulot Revue Associé 48h→24h',
    category: 'data',
    block: 'Data & Intelligence',
    originalBudget: '5 200 000 FCFA',
    budgetStatus: 'creative_workaround',
    executionStatus: 'in_progress',
    progress: 62,
    timeSpent: '9h45',
    timeEstimate: '16h',
    workaround: 'Lead Data Engineer optimise workflow KOS ProcessMining en interne. Automatisation des relances via cron + Slack webhook gratuit. Pas de consultant BPM.',
    impact: '100% propositions on-time',
    kpiBefore: 'Délai Revue Associé 48h',
    kpiAfter: 'Délai Revue Associé ≤24h',
    actualKpi: 'Délai Revue 30h — -37% ✅ — Relance auto Slack ✅ — Escalade auto si >24h ✅',
    constraints: ['Pas de licence Celonis/ProcessGold'],
    breakthrough: 'KOS ProcessMining Engine interne + Slack webhook gratuit = automatisation sans licence externe',
    assigned: 'Lead Data Engineer + COO',
    startedAt: '2026-06-23T07:30:00Z',
    estimatedCompletion: '2026-06-24T10:00:00Z',
    icon: 'ri-git-merge-line',
  },
  {
    id: 'OPT-009',
    title: 'Publier Baromètre Inclusion Financière — 15 jours de retard',
    category: 'growth',
    block: 'Data & Intelligence',
    originalBudget: '3 500 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '42h',
    timeEstimate: '40h',
    workaround: 'Research Director finalise en interne. Publication organique LinkedIn + site Khepra + mailing SFD gratuit via Resend plan starter.',
    impact: 'Publication effective + communiqué BCEAO',
    kpiBefore: 'Baromètre non publié — 15j retard',
    kpiAfter: 'Baromètre publié + presse',
    actualKpi: 'Baromètre publié ✅ — 8 420 vues LinkedIn ✅ — 32 leads SFD qualifiés ✅ — Couverture presse Ecofin ✅',
    constraints: ['Aucun — contenu interne, distribution organique gratuite'],
    breakthrough: 'Publication 100% organique — LinkedIn post + site + newsletter — 32 leads à 0 FCFA d\'acquisition',
    assigned: 'Research Director',
    startedAt: '2026-06-22T06:00:00Z',
    estimatedCompletion: '2026-06-23T17:00:00Z',
    icon: 'ri-bar-chart-box-line',
  },
  {
    id: 'OPT-010',
    title: 'Débloquer LinkedIn MDP — approbation en attente depuis 60 jours',
    category: 'growth',
    block: 'Croissance & CRM',
    originalBudget: '500 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'in_progress',
    progress: 85,
    timeSpent: 'Suivi continu',
    timeEstimate: 'Suivi LinkedIn',
    workaround: 'Marketing Director relance LinkedIn Partner Support (gratuit). Vérification domaine + privacy policy URL mises à jour. Aucun coût.',
    impact: '30 posts/mois LinkedIn actifs',
    kpiBefore: '0 posts LinkedIn programmables',
    kpiAfter: '30 posts/mois programmés',
    actualKpi: 'Approbation LinkedIn reçue ✅ — API activée ✅ — 12 posts en file d\'attente 🔄 — Premier post programmé 24/06',
    constraints: ['Délai LinkedIn Partner Review — hors contrôle Khepra'],
    breakthrough: 'Mise à jour privacy policy URL + vérification domaine — approbation débloquée en 48h après 60 jours',
    assigned: 'Marketing Director',
    startedAt: '2026-06-23T08:00:00Z',
    estimatedCompletion: '2026-06-24T09:00:00Z',
    icon: 'ri-linkedin-fill',
  },
];

export function computeZeroBudgetKPIs(): ZeroBudgetSprintKPIs {
  const actions = ZERO_BUDGET_ACTIONS;
  const totalBudget = actions.reduce((sum, a) => {
    const num = parseInt(a.originalBudget.replace(/[^0-9]/g, ''), 10);
    return sum + num;
  }, 0);

  return {
    totalActions: actions.length,
    executed: actions.filter(a => a.executionStatus === 'executed').length,
    inProgress: actions.filter(a => a.executionStatus === 'in_progress').length,
    pending: actions.filter(a => a.executionStatus === 'pending').length,
    blocked: 0,
    totalBudgetAvoided: `${(totalBudget / 1000000).toFixed(1)}M FCFA`,
    totalTimeSpent: '83h15',
    totalTimeEstimated: '143h30',
    actionsZeroCost: actions.filter(a => a.budgetStatus === 'zero_cost').length,
    actionsInternalEffort: actions.filter(a => a.budgetStatus === 'internal_effort').length,
    actionsBlockedBudget: actions.filter(a => a.budgetStatus === 'blocked_budget').length,
    actionsCreativeWorkaround: actions.filter(a => a.budgetStatus === 'creative_workaround').length,
    globalImpactScore: 74,
    sprintStart: '2026-06-23T06:00:00Z',
    sprintTarget: '2026-06-27T18:00:00Z',
    mandateRef: 'MP-2026-06-23-ZERO-BUDGET',
  };
}

export const ZERO_BUDGET_SPRINT_META = {
  sprintId: 'KOS-ZBS-2026-06-23-001',
  sprintName: 'Sprint Zéro Budget — Exécution Immédiate',
  mandate: 'Managing Partner — 23 Juin 2026 — 0 FCFA',
  philosophy: 'Tout ce qui peut être fait gratuitement doit être fait immédiatement. Ce qui est bloqué par budget est documenté pour décision COMEX.',
  totalBudgetAvoided: '56 300 000 FCFA',
  totalValueCreated: 'Estimé 685M FCFA (impact combiné sécurité + conformité + croissance)',
  status: 'IN_PROGRESS',
};



