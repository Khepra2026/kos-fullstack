// ============================================================
// KOS SPRINT 2 ZÉRO BUDGET — Exécution Immédiate
// 10 tâches restantes OPT-011 à OPT-020 du Plan Qualité 120%
// Mandat Managing Partner — 23 Juin 2026 — 0 FCFA
// Suite du Sprint 1 (OPT-001 à OPT-010)
// ============================================================

export interface ZeroBudgetAction2 {
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

export interface ZeroBudgetSprint2KPIs {
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
  parentSprint: string;
}

export const SPRINT2_ACTIONS: ZeroBudgetAction2[] = [
  {
    id: 'OPT-011',
    title: 'Réduire bundle JS 1.8MB→500KB — tree shaking + code splitting + lazy routes',
    category: 'code',
    block: 'Architecture Code',
    originalBudget: '6 000 000 FCFA',
    budgetStatus: 'internal_effort',
    executionStatus: 'in_progress',
    progress: 38,
    timeSpent: '9h',
    timeEstimate: '20h',
    workaround: 'Lead Dev Frontend fait le tree shaking manuel + code splitting via React.lazy() + dynamic imports. Outillage 100% gratuit (Rollup analyzer, Chrome Coverage DevTools). Aucun consultant externe.',
    impact: 'Bundle JS -65%, LCP -1.2s, TBT < 200ms',
    kpiBefore: 'Bundle JS 1.8 MB gzip 520 KB — TBT 380ms',
    kpiAfter: 'Bundle JS ≤800 KB gzip ≤250 KB — TBT < 200ms',
    actualKpi: 'Bundle 1.2 MB gzip 380 KB — 12 routes lazy-loadées ✅ — 3 chunks critiques identifiés 🔄',
    constraints: ['Pas de budget consultant Webpack/Vite expert', 'Risque régression fonctionnelle'],
    breakthrough: 'Chrome Coverage DevTools a révélé 62% de code mort — suppression en 3h, gain 350 KB instantané',
    assigned: 'Lead Dev Frontend',
    startedAt: '2026-06-23T08:30:00Z',
    estimatedCompletion: '2026-06-24T16:00:00Z',
    icon: 'ri-code-s-slash-line',
  },
  {
    id: 'OPT-012',
    title: 'Finaliser documents SMSI PCA + SDLC sécurisé — certification ISO 27001',
    category: 'compliance',
    block: 'Conformité & Certification',
    originalBudget: '4 500 000 FCFA',
    budgetStatus: 'internal_effort',
    executionStatus: 'in_progress',
    progress: 45,
    timeSpent: '7h30',
    timeEstimate: '14h',
    workaround: 'RSSI finalise PCA + SDLC en interne avec KOS Policy Engine comme assistant. Templates ISO 27001 gratuits de l\'ANSSI. Pas d\'auditeur externe pour la rédaction.',
    impact: '114→116 contrôles ISO 27001 documentés — certification atteignable',
    kpiBefore: '2 docs SMSI brouillon — 114/116 contrôles',
    kpiAfter: '2 docs SMSI validés COMEX — 116/116 contrôles',
    actualKpi: 'PCA 70% rédigé ✅ — SDLC sécurisé 40% 🔄 — Revue COMEX planifiée 26/06',
    constraints: ['Auditeur ISO 27001 externe toujours nécessaire pour certification finale'],
    breakthrough: 'Template ANSSI PCA réutilisé à 60% — gain 5h vs rédaction from scratch',
    assigned: 'RSSI + DPO',
    startedAt: '2026-06-23T09:00:00Z',
    estimatedCompletion: '2026-06-25T12:00:00Z',
    icon: 'ri-file-shield-2-line',
  },
  {
    id: 'OPT-013',
    title: 'EcoVadis — collecter 4 preuves Achats Responsables (score 30→70)',
    category: 'compliance',
    block: 'ESG & Durabilité',
    originalBudget: '4 200 000 FCFA',
    budgetStatus: 'creative_workaround',
    executionStatus: 'in_progress',
    progress: 62,
    timeSpent: '3h10',
    timeEstimate: '5h',
    workaround: 'ESG Officer collecte preuves depuis archives internes existantes (factures fournisseurs locaux, contrats, charte achats). Aucun consultant EcoVadis. Score Argent→Or sans dépense.',
    impact: 'EcoVadis Achats Responsables 30→70 — débloque score Gold',
    kpiBefore: 'EcoVadis Achats Responsables 30/68',
    kpiAfter: 'EcoVadis Achats Responsables 70/68',
    actualKpi: '4/4 preuves identifiées ✅ — 3 uploadées ✅ — 1 en attente signature fournisseur 🔄',
    constraints: ['1 preuve nécessite signature fournisseur externe — délai 48h'],
    breakthrough: 'Charte Achats Responsables déjà rédigée en interne — preuve #3 réutilisée, 0 FCFA',
    assigned: 'ESG Officer + Procurement',
    startedAt: '2026-06-23T10:00:00Z',
    estimatedCompletion: '2026-06-24T15:00:00Z',
    icon: 'ri-leaf-line',
  },
  {
    id: 'OPT-014',
    title: 'Contacter 3 clients corporate sans contact Q2 — risque churn 185M FCFA',
    category: 'growth',
    block: 'Croissance & CRM',
    originalBudget: '0 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '45 min',
    timeEstimate: '15 min',
    workaround: 'Client Success Manager passe 3 appels directs. Aucun coût — relation existante. Communication transparente sur les livrables Q2.',
    impact: 'Rétention 3 clients — 185M FCFA sécurisés',
    kpiBefore: '3 clients sans contact Q2 — risque churn 185M',
    kpiAfter: '3 clients recontactés — feedback positif',
    actualKpi: '3/3 clients contactés ✅ — 2 OK, 1 demande rdv approfondi ✅ — Pipeline sécurisé 185M',
    constraints: ['Aucun — clients existants, relation établie'],
    breakthrough: 'Appel proactif avant que le client ne remarque le silence — transformation risque en opportunité',
    assigned: 'Client Success Manager',
    startedAt: '2026-06-23T13:00:00Z',
    estimatedCompletion: '2026-06-23T13:45:00Z',
    icon: 'ri-phone-line',
  },
  {
    id: 'OPT-015',
    title: 'npm audit fix — résoudre 15 vulnérabilités (12 high + 3 critical)',
    category: 'security',
    block: 'Performance Digitale',
    originalBudget: '1 200 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '1h50',
    timeEstimate: '3h',
    workaround: 'Lead Dev exécute npm audit fix + tests de non-régression. Outil natif npm gratuit. Vérification via npm audit --production.',
    impact: '0 vulnérabilités npm — supply chain clean',
    kpiBefore: '15 vulns npm (3 critical, 12 high)',
    kpiAfter: '0 vuln npm',
    actualKpi: '0 vulnérabilités ✅ — 15/15 corrigées — Tests régression passés ✅',
    constraints: ['Compatibilité React 19 avec certaines libs — résolu via overrides'],
    breakthrough: 'npm audit fix --force a résolu 12/15 en une commande — les 3 restantes via overrides manuels',
    assigned: 'Lead Dev Frontend',
    startedAt: '2026-06-23T14:00:00Z',
    estimatedCompletion: '2026-06-23T15:50:00Z',
    icon: 'ri-bug-line',
  },
  {
    id: 'OPT-016',
    title: 'Ajouter JWT verification sur 7 edge functions non protégées',
    category: 'security',
    block: 'Opérations & Production',
    originalBudget: '1 500 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'in_progress',
    progress: 65,
    timeSpent: '2h',
    timeEstimate: '3h',
    workaround: 'Lead Dev Backend active verifyJWT: true sur 7 edge functions. Fonctionnalité native Supabase — 0 FCFA, 0 outil externe. Déploiement via CLI Supabase gratuit.',
    impact: '100% edge functions protégées JWT',
    kpiBefore: '91/98 edge functions JWT',
    kpiAfter: '98/98 edge functions JWT',
    actualKpi: '5/7 fonctions JWT activées ✅ — 2 en attente déploiement 🔄 — Tests endpoints OK ✅',
    constraints: ['2 fonctions ont des callbacks externes sans JWT — nécessite webhook handler séparé'],
    breakthrough: 'Supabase native JWT — pas de code à écrire, juste un flag à passer dans deploy_edge_function',
    assigned: 'Lead Dev Backend',
    startedAt: '2026-06-23T15:00:00Z',
    estimatedCompletion: '2026-06-23T18:00:00Z',
    icon: 'ri-shield-keyhole-line',
  },
  {
    id: 'OPT-017',
    title: 'Activer RLS sur 3 tables Supabase non protégées',
    category: 'security',
    block: 'Opérations & Production',
    originalBudget: '500 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'in_progress',
    progress: 78,
    timeSpent: '45 min',
    timeEstimate: '1h',
    workaround: 'Lead Dev Backend active Row Level Security sur les 3 tables via SQL. Fonctionnalité native Supabase gratuite. Politiques basées sur auth.uid().',
    impact: '100% tables RLS activée — 0 table exposée',
    kpiBefore: '3 tables sans RLS (monitoring_logs, url_check_results, social_api_tokens)',
    kpiAfter: '0 tables sans RLS',
    actualKpi: '2/3 tables RLS activées ✅ — social_api_tokens en test 🔄 — Politiques testées sur staging ✅',
    constraints: ['social_api_tokens nécessite politique read pour cron jobs — en cours de test'],
    breakthrough: 'RLS policy template réutilisé depuis les 95 autres tables — copier-coller adapté en 15 min',
    assigned: 'Lead Dev Backend',
    startedAt: '2026-06-23T16:00:00Z',
    estimatedCompletion: '2026-06-23T17:00:00Z',
    icon: 'ri-database-2-line',
  },
  {
    id: 'OPT-018',
    title: 'Corriger cron tender-scraper — 3 échecs silencieux + alerting Slack',
    category: 'infrastructure',
    block: 'Opérations & Production',
    originalBudget: '800 000 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '1h20',
    timeEstimate: '2h',
    workaround: 'DevOps corrige le cron en interne. Alerting via Slack webhook gratuit. Monitoring via Supabase cron job logs natif. Aucun outil externe payant.',
    impact: 'Cron 100% fiabilité + alerting temps réel — 15 AO récupérés',
    kpiBefore: 'Cron tender-scraper 57% fiabilité — 3 échecs silencieux',
    kpiAfter: 'Cron 100% fiabilité — alerting Slack temps réel',
    actualKpi: 'Cron 100% fiabilité ✅ — Alerting Slack configuré ✅ — 15 AO historiques récupérés ✅',
    constraints: ['Cause racine : timeout HTTP 30s sur 2 sources — résolu via retry + timeout 60s'],
    breakthrough: 'Slack webhook gratuit + try/catch robuste = solution complète en 1h20, 0 FCFA',
    assigned: 'DevOps',
    startedAt: '2026-06-23T15:30:00Z',
    estimatedCompletion: '2026-06-23T16:50:00Z',
    icon: 'ri-timer-line',
  },
  {
    id: 'OPT-019',
    title: 'Refonte pricing — TJM 2025→2026 dans 8 templates propositions',
    category: 'quality',
    block: 'Qualité & Production',
    originalBudget: '0 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'executed',
    progress: 100,
    timeSpent: '18 min',
    timeEstimate: '20 min',
    workaround: 'Quality Lead met à jour les TJM dans les 8 templates. Simple édition de constantes. Nouvelle grille tarifaire 2026 déjà validée par COMEX.',
    impact: 'TJM 2026 sur 100% templates — +12% CA propositions',
    kpiBefore: 'TJM 2025 sur 8 templates — sous-facturation 12%',
    kpiAfter: 'TJM 2026 sur 8 templates — facturation correcte',
    actualKpi: '8/8 templates mis à jour ✅ — Grille 2026 appliquée ✅ — Vérification croisée OK ✅',
    constraints: ['Aucun — TJM 2026 déjà approuvé COMEX'],
    breakthrough: '8 templates mis à jour en 18 minutes — record de vitesse d\'exécution du sprint',
    assigned: 'Quality Lead',
    startedAt: '2026-06-23T16:30:00Z',
    estimatedCompletion: '2026-06-23T16:48:00Z',
    icon: 'ri-money-dollar-circle-line',
  },
  {
    id: 'OPT-020',
    title: 'Ajouter Google-Extended bot + sections OHADA dans llms-full.txt',
    category: 'growth',
    block: 'SEO, GEO & Visibilité',
    originalBudget: '0 FCFA',
    budgetStatus: 'zero_cost',
    executionStatus: 'in_progress',
    progress: 72,
    timeSpent: '25 min',
    timeEstimate: '35 min',
    workaround: 'SEO Lead édite robots.txt + netlify.toml + régénère llms-full.txt via KOS LLMs Generator (edge function existante). 100% outillage interne gratuit.',
    impact: 'Couverture Gemini 100% + OHADA visible sur ChatGPT/Claude/Perplexity',
    kpiBefore: 'Google-Extended absent — 3 pages non crawlées — OHADA invisible LLMs',
    kpiAfter: 'Google-Extended présent — 100% pages crawlées — OHADA indexé LLMs',
    actualKpi: 'Google-Extended ajouté robots.txt ✅ — netlify.toml mis à jour ✅ — llms-full.txt regénération en cours 🔄',
    constraints: ['llms-full.txt regénération prend ~10 min — tâche asynchrone en cours'],
    breakthrough: 'KOS LLMs Generator regénère automatiquement — pas de rédaction manuelle, 0 FCFA',
    assigned: 'SEO Lead',
    startedAt: '2026-06-23T17:00:00Z',
    estimatedCompletion: '2026-06-23T17:35:00Z',
    icon: 'ri-robot-3-line',
  },
];

export function computeZeroBudget2KPIs(): ZeroBudgetSprint2KPIs {
  const actions = SPRINT2_ACTIONS;
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
    totalTimeSpent: '26h18',
    totalTimeEstimated: '48h55',
    actionsZeroCost: actions.filter(a => a.budgetStatus === 'zero_cost').length,
    actionsInternalEffort: actions.filter(a => a.budgetStatus === 'internal_effort').length,
    actionsBlockedBudget: actions.filter(a => a.budgetStatus === 'blocked_budget').length,
    actionsCreativeWorkaround: actions.filter(a => a.budgetStatus === 'creative_workaround').length,
    globalImpactScore: 71,
    sprintStart: '2026-06-23T08:30:00Z',
    sprintTarget: '2026-06-25T18:00:00Z',
    mandateRef: 'MP-2026-06-23-ZERO-BUDGET-SPRINT2',
    parentSprint: 'KOS-ZBS-2026-06-23-001',
  };
}

export const SPRINT2_META = {
  sprintId: 'KOS-ZBS2-2026-06-23-001',
  sprintName: 'Sprint 2 Zéro Budget — Les 10 Tâches Restantes',
  mandate: 'Managing Partner — 23 Juin 2026 — 0 FCFA',
  philosophy: 'Ce qui n\'a pas été exécuté au Sprint 1 doit l\'être maintenant. Même doctrine : tout ce qui peut être fait gratuitement est fait immédiatement.',
  totalBudgetAvoided: '22 700 000 FCFA',
  totalValueCreated: 'Estimé 385M FCFA (sécurité + conformité + rétention + croissance)',
  parentSprint: 'Sprint 1 (OPT-001 à OPT-010)',
  combinedBudgetAvoided: '79 000 000 FCFA',
  combinedValueCreated: 'Estimé 1 070M FCFA',
  status: 'IN_PROGRESS',
};