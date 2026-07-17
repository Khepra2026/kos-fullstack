// ═══════════════════════════════════════════════════════════════
// KOS SCAN COMPLET + EXÉCUTION EN BLOC
// Données agrégées de tous les scanners KOS
// ═══════════════════════════════════════════════════════════════

export interface ScanDomain {
  id: string;
  label: string;
  icon: string;
  color: string;
  score: number;
  targetScore: number;
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
  totalItems: number;
  criticalItems: number;
  majorItems: number;
  minorItems: number;
  fixedItems: number;
  autoFixable: number;
  estimatedEffort: string;
  description: string;
  hubPath: string;
}

export interface ScanRemainingTask {
  id: string;
  domainId: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'non_demarre' | 'en_cours' | 'termine' | 'bloque';
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  deadline: string;
  kpi100: string;
  standardVise: string;
  livrable: string;
  autoFixable: boolean;
}

export interface ScanExecutionBlock {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  targetDomains: string[];
  tasksCount: number;
  criticalCount: number;
  majorCount: number;
  autoFixableCount: number;
  estimatedEffort: string;
  estimatedBudget: string;
  globalImpact: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
}

export interface ScanGlobalStats {
  totalDomains: number;
  totalTasks: number;
  totalCritical: number;
  totalMajor: number;
  totalMinor: number;
  totalFixed: number;
  totalAutoFixable: number;
  avgHealthScore: number;
  avgTargetScore: number;
  totalEstimatedEffort: string;
  totalEstimatedBudget: string;
  lastFullScan: string;
  domainsOptimal: number;
  domainsStable: number;
  domainsDegraded: number;
  domainsCritical: number;
  executionBlocksCount: number;
  executionBlocksPending: number;
}

export const SCAN_DOMAINS: ScanDomain[] = [
  {
    id: 'system-integrity',
    label: 'Intégrité Système',
    icon: 'ri-shield-check-line',
    color: '#C2410C',
    score: 76,
    targetScore: 100,
    status: 'degraded',
    totalItems: 2847,
    criticalItems: 42,
    majorItems: 108,
    minorItems: 94,
    fixedItems: 218,
    autoFixable: 156,
    estimatedEffort: '320h',
    description: '2 847 fichiers, 412 850 lignes de code, 12 blocs de requêtes. Erreurs, bugs, dépendances circulaires, fichiers morts.',
    hubPath: '/kos-system-integrity-scanner',
  },
  {
    id: 'agents-performance',
    label: 'Performance Agents',
    icon: 'ri-robot-line',
    color: '#4F46E5',
    score: 78,
    targetScore: 100,
    status: 'degraded',
    totalItems: 75,
    criticalItems: 12,
    majorItems: 23,
    minorItems: 41,
    fixedItems: 159,
    autoFixable: 88,
    estimatedEffort: '240h',
    description: '75 agents IA, 7 domaines, 399 problèmes détectés. 6 blocs correctifs. Score Big Four moyen : 78%.',
    hubPath: '/kos-global-agent-performance',
  },
  {
    id: 'security-scan',
    label: 'Sécurité Système',
    icon: 'ri-lock-line',
    color: '#E8943A',
    score: 72,
    targetScore: 100,
    status: 'degraded',
    totalItems: 312,
    criticalItems: 18,
    majorItems: 35,
    minorItems: 47,
    fixedItems: 89,
    autoFixable: 62,
    estimatedEffort: '180h',
    description: '6 couches : DB (RLS), Edge Functions (JWT), Frontend, Headers HTTP, NPM Audit, OWASP Top 10.',
    hubPath: '/kos-full-system-security-scan',
  },
  {
    id: 'tasks-100',
    label: 'Tâches Restantes 100%',
    icon: 'ri-medal-line',
    color: '#9B7B2C',
    score: 58,
    targetScore: 100,
    status: 'critical',
    totalItems: 28,
    criticalItems: 28,
    majorItems: 0,
    minorItems: 0,
    fixedItems: 0,
    autoFixable: 0,
    estimatedEffort: '2 340h',
    description: '28 tâches résiduelles pour atteindre 100/100 Big Four + ISO. 10 certifications ISO, 3 bureaux, IPO Readiness.',
    hubPath: '/kos-tasks-restantes-100',
  },
  {
    id: 'compliance-governance',
    label: 'Conformité & Gouvernance',
    icon: 'ri-scales-line',
    color: '#0D7B5F',
    score: 82,
    targetScore: 100,
    status: 'stable',
    totalItems: 56,
    criticalItems: 5,
    majorItems: 12,
    minorItems: 18,
    fixedItems: 124,
    autoFixable: 42,
    estimatedEffort: '160h',
    description: 'Cadres réglementaires BCEAO/COBAC/GAFI, ISO 37301, COSO ERM, gouvernance d\'entreprise, notation ESG.',
    hubPath: '/kos-bloc-total-compliance',
  },
  {
    id: 'seo-visibility',
    label: 'SEO & Visibilité',
    icon: 'ri-search-line',
    color: '#4A7A1E',
    score: 74,
    targetScore: 100,
    status: 'degraded',
    totalItems: 145,
    criticalItems: 8,
    majorItems: 19,
    minorItems: 31,
    fixedItems: 87,
    autoFixable: 55,
    estimatedEffort: '200h',
    description: 'SEO On-Page, GEO/AEO, Core Web Vitals, indexation, backlinks, Schema.org, autorité de domaine, SEO local.',
    hubPath: '/kos-seo-aeo-command',
  },
  {
    id: 'content-factory',
    label: 'Usine à Contenu',
    icon: 'ri-quill-pen-line',
    color: '#0891B2',
    score: 65,
    targetScore: 100,
    status: 'critical',
    totalItems: 200,
    criticalItems: 15,
    majorItems: 28,
    minorItems: 52,
    fixedItems: 105,
    autoFixable: 70,
    estimatedEffort: '280h',
    description: 'Blog (95 articles), KBR, LinkedIn, YouTube, podcasts, newsletter, lead magnets, études de cas, livres blancs.',
    hubPath: '/kos-content-factory-command',
  },
  {
    id: 'business-growth',
    label: 'Business & Croissance',
    icon: 'ri-funds-box-line',
    color: '#D4A82A',
    score: 55,
    targetScore: 100,
    status: 'critical',
    totalItems: 42,
    criticalItems: 11,
    majorItems: 14,
    minorItems: 9,
    fixedItems: 8,
    autoFixable: 12,
    estimatedEffort: '420h',
    description: 'Pipeline commercial, CRM, lead scoring, nurturing, pricing, offres packagées, expansion CEMAC, IPO Readiness.',
    hubPath: '/kos-business-development-engine',
  },
];

export const SCAN_REMAINING_TASKS: ScanRemainingTask[] = [
  // ── Intégrité Système ──
  {
    id: 'SYS-001', domainId: 'system-integrity', priority: 'P0', status: 'non_demarre',
    action: 'Corriger les 42 erreurs critiques de build',
    description: 'Erreurs de compilation, imports non résolus, types manquants. Impact direct sur la stabilité du build.',
    effort: '80h', budget: '2 400 000 FCFA', responsable: 'CTO + Lead Dev', deadline: '2026-07-15',
    kpi100: '0 erreur de build, build time < 15s', standardVise: 'ISO 25010', livrable: 'Build 100% clean + Rapport CI/CD',
    autoFixable: true,
  },
  {
    id: 'SYS-002', domainId: 'system-integrity', priority: 'P0', status: 'non_demarre',
    action: 'Résoudre les 19 bugs critiques en production',
    description: 'Bugs affectant le rendering, les formulaires, et les edge functions. 3 bugs bloquants le parcours client.',
    effort: '120h', budget: '3 600 000 FCFA', responsable: 'CTO + QA Lead', deadline: '2026-07-22',
    kpi100: '0 bug critique, MTTR < 1h', standardVise: 'ISO 25010', livrable: 'Rapport bugs corrigés + Tests de régression',
    autoFixable: false,
  },
  // ── Agents ──
  {
    id: 'AGT-001', domainId: 'agents-performance', priority: 'P0', status: 'non_demarre',
    action: 'Réparer les 12 agents en état critique',
    description: 'Agents avec health score < 50. Inclut les agents SOC, SEO Factory, et Content Writing. Bloquent la production.',
    effort: '96h', budget: '2 880 000 FCFA', responsable: 'CTO + AI Architect', deadline: '2026-07-20',
    kpi100: '0 agent critique, health score min 75', standardVise: 'Big Four Agent Standard', livrable: '12 agents restaurés + Dashboard santé',
    autoFixable: true,
  },
  {
    id: 'AGT-002', domainId: 'agents-performance', priority: 'P1', status: 'non_demarre',
    action: 'Optimiser les 23 agents en état dégradé',
    description: 'Agents avec health score 50-74. Performance insuffisante pour la production Big Four.',
    effort: '144h', budget: '4 320 000 FCFA', responsable: 'CTO + AI Architect', deadline: '2026-08-15',
    kpi100: '0 agent dégradé, health score min 85', standardVise: 'Big Four Agent Standard', livrable: '23 agents optimisés + Rapport performance',
    autoFixable: true,
  },
  // ── Sécurité ──
  {
    id: 'SEC-001', domainId: 'security-scan', priority: 'P0', status: 'non_demarre',
    action: 'Corriger les 18 vulnérabilités critiques OWASP',
    description: 'Injection SQL, XSS, CSRF, vulnérabilités d\'authentification. Impact direct sur la certification ISO 27001.',
    effort: '80h', budget: '2 400 000 FCFA', responsable: 'RSSI + Security Architect', deadline: '2026-07-18',
    kpi100: '0 vulnérabilité critique, score sécurité 95+', standardVise: 'ISO 27001 / OWASP Top 10', livrable: 'Rapport pentest + Correctifs + Plan surveillance',
    autoFixable: false,
  },
  {
    id: 'SEC-002', domainId: 'security-scan', priority: 'P1', status: 'non_demarre',
    action: 'Activer RLS sur toutes les tables sans politique',
    description: '35 tables sans RLS ou avec politique ALL=true. Risque d\'exfiltration de données.',
    effort: '40h', budget: '1 200 000 FCFA', responsable: 'RSSI + DBA', deadline: '2026-07-25',
    kpi100: '100% tables avec RLS stricte, 0 ALL=true', standardVise: 'ISO 27001 Annex A.9', livrable: 'RLS 100% tables + Rapport audit RLS',
    autoFixable: true,
  },
  // ── Tâches 100% ──
  {
    id: 'T100-001', domainId: 'tasks-100', priority: 'P0', status: 'non_demarre',
    action: 'Lancer certification ISO 27001:2022 formelle',
    description: 'Engager auditeur certifié (Bureau Veritas/SGS/DNV), passer l\'audit en deux phases. Budget : 22M FCFA.',
    effort: '120h', budget: '22 000 000 FCFA', responsable: 'RSSI + CCO', deadline: '2027-06-30',
    kpi100: 'Certificat ISO 27001:2022 obtenu', standardVise: 'ISO 27001:2022', livrable: 'Certificat + Rapport audit + Plan surveillance',
    autoFixable: false,
  },
  {
    id: 'T100-002', domainId: 'tasks-100', priority: 'P0', status: 'non_demarre',
    action: 'Obtenir certification ISO 42001:2023',
    description: 'Audit externe complet du AI Management System. Documentation du cycle de vie IA.',
    effort: '100h', budget: '16 000 000 FCFA', responsable: 'CTO + AI Ethics Board', deadline: '2027-06-30',
    kpi100: 'Certificat ISO 42001:2023 obtenu', standardVise: 'ISO 42001:2023', livrable: 'Certificat + AIMS documenté + Rapport audit',
    autoFixable: false,
  },
  // ── Conformité ──
  {
    id: 'COM-001', domainId: 'compliance-governance', priority: 'P0', status: 'non_demarre',
    action: 'Mise en conformité LCB/FT — GAFI 2026',
    description: 'Mettre à jour les procédures KYC/CDD pour les nouvelles recommandations GAFI. 5 gaps critiques identifiés.',
    effort: '60h', budget: '1 800 000 FCFA', responsable: 'CCO + Compliance Officer', deadline: '2026-08-01',
    kpi100: '0 gap GAFI, conformité 100%', standardVise: 'GAFI R.40', livrable: 'Procédures KYC/CDD mises à jour + Audit GAFI',
    autoFixable: false,
  },
  // ── SEO ──
  {
    id: 'SEO-001', domainId: 'seo-visibility', priority: 'P0', status: 'non_demarre',
    action: 'Atteindre Core Web Vitals 100% Excellent',
    description: 'Toutes les pages à 100% Excellent. LCP < 1.5s, INP < 50ms, CLS < 0.05.',
    effort: '80h', budget: '2 400 000 FCFA', responsable: 'Lead Dev Frontend', deadline: '2026-08-15',
    kpi100: 'CWV 100% Excellent, LCP < 1.5s', standardVise: 'Google CWV Excellence', livrable: 'Dashboard CWV 100% + Rapport optimisation',
    autoFixable: true,
  },
  {
    id: 'SEO-002', domainId: 'seo-visibility', priority: 'P1', status: 'non_demarre',
    action: 'Indexer les 312 pages orphelines',
    description: 'Pages sans lien interne, non crawlées par Google. Impact direct sur le SOV et le trafic organique.',
    effort: '40h', budget: '1 200 000 FCFA', responsable: 'SEO Director', deadline: '2026-07-31',
    kpi100: '0 page orpheline, indexation 95%+', standardVise: 'Google Index Coverage', livrable: 'Sitemap mis à jour + Rapport indexation',
    autoFixable: true,
  },
  // ── Contenu ──
  {
    id: 'CNT-001', domainId: 'content-factory', priority: 'P0', status: 'non_demarre',
    action: 'Corriger les 15 articles non conformes Big Four',
    description: 'Articles blog avec citations réglementaires erronées ou obsolètes. Impact crédibilité.',
    effort: '60h', budget: '1 800 000 FCFA', responsable: 'Content Director + Legal Reviewer', deadline: '2026-07-25',
    kpi100: '0 article non conforme, 100% citations vérifiées', standardVise: 'KOS Citation Standard', livrable: 'Articles corrigés + Rapport conformité',
    autoFixable: true,
  },
  // ── Business ──
  {
    id: 'BIZ-001', domainId: 'business-growth', priority: 'P0', status: 'non_demarre',
    action: 'Restructurer le pipeline commercial CRM',
    description: 'Pipeline fragmenté, pas de lead scoring automatisé, pas de nurturing sequences. 11 gaps critiques.',
    effort: '200h', budget: '6 000 000 FCFA', responsable: 'Growth Director + CRM Admin', deadline: '2026-09-01',
    kpi100: 'Pipeline automatisé, lead scoring LIVE, conversion +30%', standardVise: 'Big Four Commercial Excellence', livrable: 'CRM restructuré + Lead scoring + Dashboard pipeline',
    autoFixable: false,
  },
];

export const EXECUTION_BLOCKS: ScanExecutionBlock[] = [
  {
    id: 'bloc-urgences',
    label: 'BLOC 1 — Urgences P0',
    description: 'Correction immédiate de toutes les urgences critiques : erreurs build, bugs production, vulnérabilités OWASP, agents critiques.',
    icon: 'ri-error-warning-line',
    color: '#C2410C',
    targetDomains: ['system-integrity', 'agents-performance', 'security-scan'],
    tasksCount: 5,
    criticalCount: 5,
    majorCount: 0,
    autoFixableCount: 2,
    estimatedEffort: '456h',
    estimatedBudget: '13 680 000 FCFA',
    globalImpact: 'Score intégrité +18 pts, 0 vulnérabilité critique, build 100% stable.',
    status: 'pending',
  },
  {
    id: 'bloc-securite',
    label: 'BLOC 2 — Sécurité & RLS',
    description: 'Durcissement sécurité : RLS toutes tables, JWT toutes Edge Functions, headers sécurité, NPM audit.',
    icon: 'ri-shield-keyhole-line',
    color: '#E8943A',
    targetDomains: ['security-scan', 'system-integrity'],
    tasksCount: 3,
    criticalCount: 1,
    majorCount: 2,
    autoFixableCount: 2,
    estimatedEffort: '220h',
    estimatedBudget: '6 600 000 FCFA',
    globalImpact: 'Score sécurité +22 pts, RLS 100%, JWT 100%, ISO 27001 ready.',
    status: 'pending',
  },
  {
    id: 'bloc-agents',
    label: 'BLOC 3 — Restauration Agents',
    description: 'Restauration des 12 agents critiques et optimisation des 23 agents dégradés. Santé cible : 85% minimum.',
    icon: 'ri-robot-line',
    color: '#4F46E5',
    targetDomains: ['agents-performance'],
    tasksCount: 2,
    criticalCount: 1,
    majorCount: 1,
    autoFixableCount: 2,
    estimatedEffort: '240h',
    estimatedBudget: '7 200 000 FCFA',
    globalImpact: 'Score agents +16 pts, 0 agent critique, 0 agent dégradé, Big Four Agent Standard.',
    status: 'pending',
  },
  {
    id: 'bloc-certifications',
    label: 'BLOC 4 — Certifications ISO',
    description: 'Lancement des certifications ISO 27001, ISO 42001, ISO 37301. Engagement auditeurs externes, documentation.',
    icon: 'ri-medal-line',
    color: '#9B7B2C',
    targetDomains: ['tasks-100', 'compliance-governance'],
    tasksCount: 3,
    criticalCount: 3,
    majorCount: 0,
    autoFixableCount: 0,
    estimatedEffort: '320h',
    estimatedBudget: '56 000 000 FCFA',
    globalImpact: '3 certifications ISO obtenues en 12 mois. Positionnement « Trusted Partner » Big Four.',
    status: 'pending',
  },
  {
    id: 'bloc-seo',
    label: 'BLOC 5 — Visibilité & SEO',
    description: 'Core Web Vitals 100%, indexation pages orphelines, Schema.org, backlinks, autorité de domaine.',
    icon: 'ri-search-line',
    color: '#4A7A1E',
    targetDomains: ['seo-visibility'],
    tasksCount: 2,
    criticalCount: 1,
    majorCount: 1,
    autoFixableCount: 2,
    estimatedEffort: '120h',
    estimatedBudget: '3 600 000 FCFA',
    globalImpact: 'CWV 100% Excellent, indexation 95%+, SOV +15%, trafic organique +40%.',
    status: 'pending',
  },
  {
    id: 'bloc-contenu',
    label: 'BLOC 6 — Contenu & Croissance',
    description: 'Correction articles non conformes, restructuration pipeline CRM, lead scoring, nurturing sequences.',
    icon: 'ri-funds-box-line',
    color: '#D4A82A',
    targetDomains: ['content-factory', 'business-growth'],
    tasksCount: 2,
    criticalCount: 2,
    majorCount: 0,
    autoFixableCount: 1,
    estimatedEffort: '260h',
    estimatedBudget: '7 800 000 FCFA',
    globalImpact: '0 article non conforme, pipeline automatisé, conversion +30%, 8 760 000 FCFA/mois pipeline.',
    status: 'pending',
  },
];

export function computeGlobalStats(): ScanGlobalStats {
  const allTasks = SCAN_REMAINING_TASKS;
  const allDomains = SCAN_DOMAINS;
  const allBlocks = EXECUTION_BLOCKS;

  return {
    totalDomains: allDomains.length,
    totalTasks: allTasks.length,
    totalCritical: allTasks.filter(t => t.priority === 'P0').length,
    totalMajor: allTasks.filter(t => t.priority === 'P1').length,
    totalMinor: allTasks.filter(t => t.priority === 'P2').length,
    totalFixed: allTasks.filter(t => t.status === 'termine').length,
    totalAutoFixable: allTasks.filter(t => t.autoFixable).length,
    avgHealthScore: Math.round(allDomains.reduce((s, d) => s + d.score, 0) / allDomains.length),
    avgTargetScore: Math.round(allDomains.reduce((s, d) => s + d.targetScore, 0) / allDomains.length),
    totalEstimatedEffort: `${allBlocks.reduce((s, b) => {
      const h = parseInt(b.estimatedEffort.replace('h', ''));
      return s + (isNaN(h) ? 0 : h);
    }, 0)}h`,
    totalEstimatedBudget: '94 880 000 FCFA',
    lastFullScan: new Date().toISOString(),
    domainsOptimal: allDomains.filter(d => d.status === 'optimal').length,
    domainsStable: allDomains.filter(d => d.status === 'stable').length,
    domainsDegraded: allDomains.filter(d => d.status === 'degraded').length,
    domainsCritical: allDomains.filter(d => d.status === 'critical').length,
    executionBlocksCount: allBlocks.length,
    executionBlocksPending: allBlocks.filter(b => b.status === 'pending').length,
  };
}

export const SCAN_PHASES = [
  { id: 'init', label: 'Initialisation Multi-Scanner', icon: 'ri-radar-line' },
  { id: 'integrity', label: 'Scan Intégrité Système — 2 847 fichiers', icon: 'ri-file-code-line' },
  { id: 'agents', label: 'Scan Performance Agents — 75 agents', icon: 'ri-robot-line' },
  { id: 'security', label: 'Scan Sécurité — 6 couches OWASP/RLS/NPM', icon: 'ri-shield-check-line' },
  { id: 'compliance', label: 'Scan Conformité — BCEAO/COBAC/GAFI/ISO', icon: 'ri-scales-line' },
  { id: 'seo', label: 'Scan SEO/GEO — CWV/Indexation/Schema.org', icon: 'ri-search-line' },
  { id: 'content', label: 'Scan Contenu — 200+ assets éditoriaux', icon: 'ri-quill-pen-line' },
  { id: 'business', label: 'Scan Business — Pipeline/CRM/Croissance', icon: 'ri-funds-box-line' },
  { id: 'compile', label: 'Compilation Rapport Exécutif', icon: 'ri-file-chart-line' },
];