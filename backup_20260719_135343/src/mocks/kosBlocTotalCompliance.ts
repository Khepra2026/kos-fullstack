// KOS Bloc Total Compliance — Scan Parallèle 10 Modules
// 100% Big Four · 100% ISO · Lancement en Bloc
// KHEPRA EXPERTS — 01 Juillet 2026

export interface BlocScanModule {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  itemsTotal: number;
  phase: 'pending' | 'scanning' | 'complete' | 'error';
  itemsScanned: number;
  score: number;
  scoreTarget: number;
  findings: Finding[];
  duration: string;
  status: 'PENDING' | 'RUNNING' | 'PASS' | 'FAIL' | 'WARNING';
}

export interface Finding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impactedItem: string;
  recommendation: string;
}

export interface BlocTotalSummary {
  totalModules: number;
  modulesPassed: number;
  modulesFailed: number;
  modulesWarning: number;
  globalScore: number;
  globalScoreTarget: number;
  totalFindingsCritical: number;
  totalFindingsHigh: number;
  totalFindingsMedium: number;
  totalFindingsLow: number;
  totalDuration: string;
  scanTimestamp: string;
}

export const BLOC_SCAN_MODULES: BlocScanModule[] = [
  {
    id: 'mod-iso',
    name: 'ISO Standards',
    icon: 'ri-global-line',
    description: '10 normes ISO — 9001, 27001, 31000, 22301, 37001, 37301, 27701, 42001, ISAE 3000, ISAE 3402',
    color: '#059669',
    itemsTotal: 10,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-bigfour',
    name: 'Big Four Dimensions',
    icon: 'ri-building-line',
    description: '10 dimensions Big Four — PwC/Deloitte/EY/KPMG Governance, Audit, Risk, Compliance, Cyber, ESG',
    color: '#6366F1',
    itemsTotal: 10,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-regulatory',
    name: 'Scanner Réglementaire',
    icon: 'ri-radar-line',
    description: '15 référentiels — BCEAO, COBAC, OHADA, GAFI, RGPD/UEMOA, IFRS 9/15/16, AML/KYC',
    color: '#D97757',
    itemsTotal: 15,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 98,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-security',
    name: 'Security Scan',
    icon: 'ri-shield-flash-line',
    description: 'OWASP Top 10, CSP Headers, CORS, SSL/TLS, Cookie Security, HSTS, X-Frame, XSS Protection',
    color: '#C2410C',
    itemsTotal: 12,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 98,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-seo',
    name: 'SEO & Technical Audit',
    icon: 'ri-search-line',
    description: 'Meta tags, Hn structure, Schema.org, Sitemap, Robots.txt, Core Web Vitals, Canonical URLs',
    color: '#0D7B5F',
    itemsTotal: 14,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-content',
    name: 'Content Verification',
    icon: 'ri-file-check-line',
    description: 'Fact-checking, citations réglementaires, exactitude technique, cohérence cross-pages, sources vérifiées',
    color: '#4A7A1E',
    itemsTotal: 20,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 98,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-agents',
    name: 'Agent Registry Compliance',
    icon: 'ri-robot-line',
    description: '48 agents IA — précision, conformité, hallucinations, traçabilité, gouvernance des prompts',
    color: '#8B5CF6',
    itemsTotal: 48,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-social',
    name: 'Social Media Compliance',
    icon: 'ri-share-line',
    description: 'Publications LinkedIn, X, YouTube — rattachement entreprise, URL validité, image intégrité, contenu conforme',
    color: '#EC4899',
    itemsTotal: 16,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-health',
    name: 'Site Health Check',
    icon: 'ri-heart-pulse-line',
    description: 'Disponibilité 99%+, liens cassés, redirects, 404, Edge Functions, Supabase health, certificats SSL',
    color: '#EA580C',
    itemsTotal: 10,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 99,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
  {
    id: 'mod-accessibility',
    name: 'Performance & Accessibilité',
    icon: 'ri-user-heart-line',
    description: 'WCAG 2.1 AA, LCP ≤ 2.5s, CLS < 0.1, TBT < 200ms, contrastes, aria-labels, keyboard nav',
    color: '#9B7B2C',
    itemsTotal: 12,
    phase: 'pending',
    itemsScanned: 0,
    score: 0,
    scoreTarget: 95,
    findings: [],
    duration: '—',
    status: 'PENDING',
  },
];

export function generateBlocSummary(modules: BlocScanModule[]): BlocTotalSummary {
  const completed = modules.filter(m => m.phase === 'complete');
  const passed = modules.filter(m => m.status === 'PASS');
  const failed = modules.filter(m => m.status === 'FAIL');
  const warning = modules.filter(m => m.status === 'WARNING');

  const allFindings = completed.flatMap(m => m.findings);
  const avgScore = completed.length > 0
    ? Math.round(completed.reduce((s, m) => s + m.score, 0) / completed.length)
    : 0;

  const totalSec = completed.reduce((s, m) => {
    const parts = m.duration.split('s')[0];
    return s + (parseFloat(parts) || 0);
  }, 0);

  return {
    totalModules: modules.length,
    modulesPassed: passed.length,
    modulesFailed: failed.length,
    modulesWarning: warning.length,
    globalScore: avgScore,
    globalScoreTarget: 95,
    totalFindingsCritical: allFindings.filter(f => f.severity === 'critical').length,
    totalFindingsHigh: allFindings.filter(f => f.severity === 'high').length,
    totalFindingsMedium: allFindings.filter(f => f.severity === 'medium').length,
    totalFindingsLow: allFindings.filter(f => f.severity === 'low').length,
    totalDuration: totalSec < 60 ? `${totalSec.toFixed(1)}s` : `${(totalSec / 60).toFixed(1)}min`,
    scanTimestamp: new Date().toISOString(),
  };
}

// Résultats simulés par module après scan
export function simulateModuleResults(module: BlocScanModule): BlocScanModule {
  const findings: Finding[] = [];
  const score = Math.floor(Math.random() * 15) + 80; // 80-94 range
  const criticalCount = score < 85 ? Math.floor(Math.random() * 3) + 1 : 0;
  const highCount = score < 90 ? Math.floor(Math.random() * 3) + 1 : 0;
  const mediumCount = Math.floor(Math.random() * 4) + 1;
  const lowCount = Math.floor(Math.random() * 3);

  // Critical findings
  for (let i = 0; i < criticalCount; i++) {
    findings.push({
      id: `${module.id}-crit-${i}`,
      severity: 'critical',
      title: `Écart Critique #${i + 1} — ${module.name}`,
      description: `Non-conformité majeure détectée sur ${module.name}. Action corrective immédiate requise.`,
      impactedItem: `${module.name} — Item ${i + 1}`,
      recommendation: `Déployer le correctif sous 72h. Escalader au COMEX Conformité.`,
    });
  }

  // High findings
  for (let i = 0; i < highCount; i++) {
    findings.push({
      id: `${module.id}-high-${i}`,
      severity: 'high',
      title: `Écart Prioritaire #${i + 1} — ${module.name}`,
      description: `Écart de conformité significatif nécessitant une action prioritaire.`,
      impactedItem: `${module.name} — Item ${i + 1 + criticalCount}`,
      recommendation: `Plan d'action sous 2 semaines. Responsable désigné avec suivi hebdomadaire.`,
    });
  }

  // Medium findings
  for (let i = 0; i < mediumCount; i++) {
    findings.push({
      id: `${module.id}-med-${i}`,
      severity: 'medium',
      title: `Amélioration Recommandée #${i + 1} — ${module.name}`,
      description: `Opportunité d'amélioration pour atteindre le niveau cible Big Four.`,
      impactedItem: `${module.name} — Item ${i + 1 + criticalCount + highCount}`,
      recommendation: `Intégrer au backlog d'amélioration continue. Sprint next.`,
    });
  }

  for (let i = 0; i < lowCount; i++) {
    findings.push({
      id: `${module.id}-low-${i}`,
      severity: 'low',
      title: `Optimisation Mineure #${i + 1} — ${module.name}`,
      description: `Ajustement mineur pour conformité optimale.`,
      impactedItem: `${module.name} — Item ${i + 1 + criticalCount + highCount + mediumCount}`,
      recommendation: `Corriger lors du prochain cycle de maintenance.`,
    });
  }

  let status: BlocScanModule['status'] = 'PASS';
  if (criticalCount > 0) status = 'FAIL';
  else if (highCount > 2 || score < 88) status = 'WARNING';

  return {
    ...module,
    phase: 'complete',
    itemsScanned: module.itemsTotal,
    score,
    findings,
    duration: `${(Math.random() * 5 + 1).toFixed(1)}s`,
    status,
  };
}



