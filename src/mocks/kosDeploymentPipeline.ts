// ============================================================
// KOS Deployment Pipeline Command™ — CI/CD & DevOps
// Pipeline auto-build, quality gates, rapports post-déploiement
// ============================================================

export interface BuildRecord {
  id: string;
  version: string;
  status: 'success' | 'failed' | 'running' | 'cancelled';
  duration_seconds: number;
  triggered_by: string;
  triggered_at: string;
  commit_hash: string;
  branch: string;
  build_errors: number;
  build_warnings: number;
  bundle_size_kb: number;
  bundle_size_delta_kb: number;
  typecheck_errors: number;
  eslint_errors: number;
  eslint_warnings: number;
}

export interface PipelineStage {
  id: string;
  name: string;
  icon: string;
  description: string;
  status: 'success' | 'failed' | 'running' | 'pending' | 'skipped';
  avg_duration_seconds: number;
  last_run_duration_seconds: number;
  success_rate: number;
  auto_fix_enabled: boolean;
  critical: boolean;
}

export interface QualityGate {
  id: string;
  name: string;
  icon: string;
  category: 'typescript' | 'linting' | 'bundle' | 'performance' | 'security' | 'seo';
  threshold: string;
  current_value: string;
  status: 'pass' | 'warn' | 'fail';
  last_checked: string;
  auto_fix: boolean;
}

export interface DeploymentRecord {
  id: string;
  version: string;
  environment: 'production' | 'staging' | 'preview';
  status: 'success' | 'failed' | 'in_progress' | 'rolled_back';
  deployed_at: string;
  deployed_by: string;
  build_id: string;
  rollback_version: string | null;
  duration_seconds: number;
  release_notes: string;
  impact_score: number;
}

export interface PostDeployReport {
  id: string;
  deployment_id: string;
  version: string;
  generated_at: string;
  cvw_score: number;
  cvw_delta: number;
  seo_score: number;
  seo_delta: number;
  broken_links: number;
  broken_links_delta: number;
  page_count: number;
  bundle_size_kb: number;
  errors_24h: number;
  uptime_pct: number;
  summary: string;
  recommendations: string[];
}

export interface PipelineOverview {
  total_builds: number;
  success_rate: number;
  avg_build_time_seconds: number;
  total_deployments: number;
  deploy_frequency: string;
  last_deploy_version: string;
  uptime_30d: number;
  cvw_score: number;
  seo_score: number;
  quality_gate_pass_rate: number;
}

// ═══ BUILDS ═══
export const MOCK_BUILDS: BuildRecord[] = [
  {
    id: 'build-2524',
    version: 'v2524',
    status: 'success',
    duration_seconds: 18.4,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-17T14:32:00Z',
    commit_hash: 'c8f3a91',
    branch: 'main',
    build_errors: 0,
    build_warnings: 0,
    bundle_size_kb: 2847,
    bundle_size_delta_kb: 12,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 0,
  },
  {
    id: 'build-2523',
    version: 'v2523',
    status: 'success',
    duration_seconds: 16.8,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-17T12:15:00Z',
    commit_hash: 'a7b2c44',
    branch: 'main',
    build_errors: 0,
    build_warnings: 0,
    bundle_size_kb: 2835,
    bundle_size_delta_kb: -8,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 2,
  },
  {
    id: 'build-2522',
    version: 'v2522',
    status: 'failed',
    duration_seconds: 22.1,
    triggered_by: 'Readdy Agent',
    triggered_at: '2026-06-17T10:02:00Z',
    commit_hash: 'd4e5f77',
    branch: 'main',
    build_errors: 3,
    build_warnings: 1,
    bundle_size_kb: 0,
    bundle_size_delta_kb: 0,
    typecheck_errors: 3,
    eslint_errors: 1,
    eslint_warnings: 4,
  },
  {
    id: 'build-2521',
    version: 'v2521',
    status: 'success',
    duration_seconds: 15.2,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-17T09:48:00Z',
    commit_hash: 'b1c8d33',
    branch: 'main',
    build_errors: 0,
    build_warnings: 0,
    bundle_size_kb: 2845,
    bundle_size_delta_kb: 22,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 0,
  },
  {
    id: 'build-2520',
    version: 'v2520',
    status: 'success',
    duration_seconds: 19.7,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-17T07:20:00Z',
    commit_hash: 'e9f1a55',
    branch: 'main',
    build_errors: 0,
    build_warnings: 1,
    bundle_size_kb: 2823,
    bundle_size_delta_kb: 45,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 1,
  },
  {
    id: 'build-2519',
    version: 'v2519',
    status: 'failed',
    duration_seconds: 34.5,
    triggered_by: 'Readdy Agent',
    triggered_at: '2026-06-16T23:45:00Z',
    commit_hash: 'f2a3b66',
    branch: 'main',
    build_errors: 7,
    build_warnings: 3,
    bundle_size_kb: 0,
    bundle_size_delta_kb: 0,
    typecheck_errors: 5,
    eslint_errors: 2,
    eslint_warnings: 8,
  },
  {
    id: 'build-2518',
    version: 'v2518',
    status: 'success',
    duration_seconds: 15.1,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-16T22:30:00Z',
    commit_hash: 'a1b2c33',
    branch: 'main',
    build_errors: 0,
    build_warnings: 0,
    bundle_size_kb: 2810,
    bundle_size_delta_kb: -15,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 0,
  },
  {
    id: 'build-2517',
    version: 'v2517',
    status: 'success',
    duration_seconds: 14.8,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-16T20:00:00Z',
    commit_hash: 'd4e5f88',
    branch: 'main',
    build_errors: 0,
    build_warnings: 1,
    bundle_size_kb: 2825,
    bundle_size_delta_kb: 18,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 3,
  },
  {
    id: 'build-2516',
    version: 'v2516',
    status: 'success',
    duration_seconds: 17.2,
    triggered_by: 'KOS Auto-Build Engine™',
    triggered_at: '2026-06-16T18:00:00Z',
    commit_hash: 'c8f3a99',
    branch: 'main',
    build_errors: 0,
    build_warnings: 0,
    bundle_size_kb: 2807,
    bundle_size_delta_kb: 32,
    typecheck_errors: 0,
    eslint_errors: 0,
    eslint_warnings: 0,
  },
  {
    id: 'build-2515',
    version: 'v2515',
    status: 'failed',
    duration_seconds: 28.3,
    triggered_by: 'Readdy Agent',
    triggered_at: '2026-06-16T15:30:00Z',
    commit_hash: 'b1c8d22',
    branch: 'main',
    build_errors: 4,
    build_warnings: 2,
    bundle_size_kb: 0,
    bundle_size_delta_kb: 0,
    typecheck_errors: 4,
    eslint_errors: 0,
    eslint_warnings: 5,
  },
];

// ═══ PIPELINE STAGES ═══
export const MOCK_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'stage-lint',
    name: 'Lint & Format',
    icon: 'ri-braces-line',
    description: 'ESLint + Prettier — Vérification du style de code et formatage automatique',
    status: 'success',
    avg_duration_seconds: 1.2,
    last_run_duration_seconds: 0.9,
    success_rate: 98.5,
    auto_fix_enabled: true,
    critical: false,
  },
  {
    id: 'stage-typecheck',
    name: 'TypeScript Check',
    icon: 'ri-code-s-slash-line',
    description: 'tsc --noEmit — Vérification stricte des types TypeScript sur tout le projet',
    status: 'success',
    avg_duration_seconds: 4.8,
    last_run_duration_seconds: 4.5,
    success_rate: 94.2,
    auto_fix_enabled: false,
    critical: true,
  },
  {
    id: 'stage-build',
    name: 'Vite Build',
    icon: 'ri-hammer-line',
    description: 'vite build — Compilation du bundle de production, tree-shaking, minification',
    status: 'success',
    avg_duration_seconds: 8.5,
    last_run_duration_seconds: 7.2,
    success_rate: 96.8,
    auto_fix_enabled: false,
    critical: true,
  },
  {
    id: 'stage-bundle-audit',
    name: 'Bundle Audit',
    icon: 'ri-pie-chart-line',
    description: 'Analyse de la taille du bundle — détection des modules lourds et dépendances inutilisées',
    status: 'success',
    avg_duration_seconds: 2.1,
    last_run_duration_seconds: 1.8,
    success_rate: 95.5,
    auto_fix_enabled: true,
    critical: false,
  },
  {
    id: 'stage-quality',
    name: 'Quality Gates',
    icon: 'ri-shield-check-line',
    description: '12 contrôles qualité Big Four — TypeScript, ESLint, Bundle, CWV, SEO, Sécurité',
    status: 'success',
    avg_duration_seconds: 5.4,
    last_run_duration_seconds: 4.8,
    success_rate: 92.0,
    auto_fix_enabled: true,
    critical: true,
  },
  {
    id: 'stage-deploy',
    name: 'Déploiement',
    icon: 'ri-rocket-line',
    description: 'Déploiement automatique sur Netlify — CDN, cache invalidation, rollback si échec',
    status: 'success',
    avg_duration_seconds: 12.0,
    last_run_duration_seconds: 10.5,
    success_rate: 99.2,
    auto_fix_enabled: false,
    critical: true,
  },
  {
    id: 'stage-verify',
    name: 'Post-Deploy Verify',
    icon: 'ri-check-double-line',
    description: 'Vérification post-déploiement — liens cassés, CWV, SEO, uptime, erreurs 24h',
    status: 'success',
    avg_duration_seconds: 6.5,
    last_run_duration_seconds: 5.2,
    success_rate: 97.8,
    auto_fix_enabled: true,
    critical: true,
  },
];

// ═══ QUALITY GATES ═══
export const MOCK_QUALITY_GATES: QualityGate[] = [
  {
    id: 'qg-ts-errors',
    name: 'TypeScript Errors',
    icon: 'ri-code-s-slash-line',
    category: 'typescript',
    threshold: '0 erreurs',
    current_value: '0 erreurs',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: false,
  },
  {
    id: 'qg-ts-warnings',
    name: 'TypeScript Warnings',
    icon: 'ri-error-warning-line',
    category: 'typescript',
    threshold: '< 5 warnings',
    current_value: '0 warnings',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-eslint-errors',
    name: 'ESLint Errors',
    icon: 'ri-braces-line',
    category: 'linting',
    threshold: '0 erreurs',
    current_value: '0 erreurs',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-eslint-warnings',
    name: 'ESLint Warnings',
    icon: 'ri-alert-line',
    category: 'linting',
    threshold: '< 10 warnings',
    current_value: '0 warnings',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-bundle-size',
    name: 'Bundle Size',
    icon: 'ri-pie-chart-line',
    category: 'bundle',
    threshold: '< 3.0 MB',
    current_value: '2.78 MB',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-bundle-delta',
    name: 'Bundle Delta',
    icon: 'ri-arrow-up-down-line',
    category: 'bundle',
    threshold: '< +50 KB',
    current_value: '+12 KB',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: false,
  },
  {
    id: 'qg-cwv-lcp',
    name: 'LCP (Largest Contentful Paint)',
    icon: 'ri-speed-line',
    category: 'performance',
    threshold: '< 2.5s',
    current_value: '1.8s',
    status: 'pass',
    last_checked: '2026-06-17T14:35:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-cwv-cls',
    name: 'CLS (Cumulative Layout Shift)',
    icon: 'ri-layout-line',
    category: 'performance',
    threshold: '< 0.1',
    current_value: '0.04',
    status: 'pass',
    last_checked: '2026-06-17T14:35:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-cwv-inp',
    name: 'INP (Interaction to Next Paint)',
    icon: 'ri-cursor-line',
    category: 'performance',
    threshold: '< 200ms',
    current_value: '142ms',
    status: 'pass',
    last_checked: '2026-06-17T14:35:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-csp-headers',
    name: 'CSP Headers',
    icon: 'ri-shield-keyhole-line',
    category: 'security',
    threshold: 'Aucun missing header',
    current_value: 'Tous OK',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-https-redirect',
    name: 'HTTPS Redirect',
    icon: 'ri-lock-line',
    category: 'security',
    threshold: '100% HTTPS',
    current_value: '100%',
    status: 'pass',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
  {
    id: 'qg-seo-meta',
    name: 'SEO Meta Tags',
    icon: 'ri-search-line',
    category: 'seo',
    threshold: '100% pages OK',
    current_value: '98.5%',
    status: 'warn',
    last_checked: '2026-06-17T14:32:00Z',
    auto_fix: true,
  },
];

// ═══ DEPLOYMENTS ═══
export const MOCK_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: 'deploy-20260617-3',
    version: 'v2524',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-17T14:40:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2524',
    rollback_version: null,
    duration_seconds: 10.5,
    release_notes: 'KOS Deployment Pipeline Command™ — Hub #65. Pipeline CI/CD, quality gates, rapports post-déploiement.',
    impact_score: 92,
  },
  {
    id: 'deploy-20260617-2',
    version: 'v2523',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-17T12:22:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2523',
    rollback_version: null,
    duration_seconds: 8.2,
    release_notes: 'Content Factory Command LIVE DB fix — agrégation directe 15 queries Supabase.',
    impact_score: 88,
  },
  {
    id: 'deploy-20260617-1',
    version: 'v2521',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-17T09:55:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2521',
    rollback_version: null,
    duration_seconds: 7.8,
    release_notes: 'KOS Content Factory Command™ — Hub #64. 13 blocs, 8 onglets, Supabase LIVE.',
    impact_score: 95,
  },
  {
    id: 'deploy-20260616-5',
    version: 'v2518',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-16T22:35:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2518',
    rollback_version: null,
    duration_seconds: 6.5,
    release_notes: 'Blog Master Prompt — Article #9 Régulation FinTech UEMOA. Agent #25 intégré.',
    impact_score: 90,
  },
  {
    id: 'deploy-20260616-4',
    version: 'v2517',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-16T20:05:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2517',
    rollback_version: null,
    duration_seconds: 7.1,
    release_notes: 'Khepra Growth Engine™ — Bloc 12 LIVE DB. Pipeline deals, lead scoring realtime.',
    impact_score: 93,
  },
  {
    id: 'deploy-20260616-3',
    version: 'v2516',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-16T18:05:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2516',
    rollback_version: null,
    duration_seconds: 8.0,
    release_notes: 'Big Four Remediation Complete — 10/10 phases Excellence, score 96.3/100.',
    impact_score: 97,
  },
  {
    id: 'deploy-20260616-2',
    version: 'v2515b',
    environment: 'production',
    status: 'success',
    deployed_at: '2026-06-16T15:52:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2515',
    rollback_version: null,
    duration_seconds: 6.8,
    release_notes: 'Retry après échec build-2515 — corrigé TypeScript errors.',
    impact_score: 75,
  },
  {
    id: 'deploy-20260616-1',
    version: 'v2514',
    environment: 'production',
    status: 'rolled_back',
    deployed_at: '2026-06-16T14:30:00Z',
    deployed_by: 'KOS Auto-Deploy Engine™',
    build_id: 'build-2514',
    rollback_version: 'v2513',
    duration_seconds: 5.5,
    release_notes: 'Déploiement rollback — CWV dégradé (LCP 4.2s). Retour à v2513.',
    impact_score: 40,
  },
];

// ═══ POST-DEPLOY REPORTS ═══
export const MOCK_POST_DEPLOY_REPORTS: PostDeployReport[] = [
  {
    id: 'report-20260617-3',
    deployment_id: 'deploy-20260617-3',
    version: 'v2524',
    generated_at: '2026-06-17T14:45:00Z',
    cvw_score: 87,
    cvw_delta: 0,
    seo_score: 92,
    seo_delta: 0,
    broken_links: 0,
    broken_links_delta: 0,
    page_count: 442,
    bundle_size_kb: 2847,
    errors_24h: 0,
    uptime_pct: 99.97,
    summary: 'Déploiement nominal. Aucune régression détectée. CWV stable, SEO inchangé, 0 liens cassés. Hub #65 ajouté sans impact sur les performances.',
    recommendations: [],
  },
  {
    id: 'report-20260617-2',
    deployment_id: 'deploy-20260617-2',
    version: 'v2523',
    generated_at: '2026-06-17T12:28:00Z',
    cvw_score: 87,
    cvw_delta: 1,
    seo_score: 91,
    seo_delta: -1,
    broken_links: 0,
    broken_links_delta: 0,
    page_count: 440,
    bundle_size_kb: 2835,
    errors_24h: 0,
    uptime_pct: 99.97,
    summary: 'Déploiement nominal. Bundle réduit de 8 KB. SEO -1 pt dû à 1 page manquant OG image temporairement. Corrigé automatiquement.',
    recommendations: ['Vérifier OG image generation pour les nouvelles pages'],
  },
  {
    id: 'report-20260617-1',
    deployment_id: 'deploy-20260617-1',
    version: 'v2521',
    generated_at: '2026-06-17T10:00:00Z',
    cvw_score: 86,
    cvw_delta: -2,
    seo_score: 92,
    seo_delta: 1,
    broken_links: 0,
    broken_links_delta: 0,
    page_count: 438,
    bundle_size_kb: 2845,
    errors_24h: 0,
    uptime_pct: 99.97,
    summary: 'Déploiement nominal. CWV -2 pts (bundle +22 KB) — optimisation programmée pour prochain build. SEO +1 pt avec nouveau contenu Hub #64.',
    recommendations: ['Optimiser le bundle du Content Factory Command', 'Activer lazy loading sur les onglets secondaires'],
  },
  {
    id: 'report-20260616-5',
    deployment_id: 'deploy-20260616-5',
    version: 'v2518',
    generated_at: '2026-06-16T22:40:00Z',
    cvw_score: 88,
    cvw_delta: 2,
    seo_score: 91,
    seo_delta: 2,
    broken_links: 1,
    broken_links_delta: 1,
    page_count: 435,
    bundle_size_kb: 2810,
    errors_24h: 0,
    uptime_pct: 99.96,
    summary: 'Déploiement nominal. CWV +2 pts (bundle -15 KB). SEO +2 — nouvel article indexé en 4h. 1 lien cassé détecté et auto-corrigé.',
    recommendations: [],
  },
  {
    id: 'report-20260616-4',
    deployment_id: 'deploy-20260616-4',
    version: 'v2517',
    generated_at: '2026-06-16T20:10:00Z',
    cvw_score: 86,
    cvw_delta: -1,
    seo_score: 89,
    seo_delta: 0,
    broken_links: 0,
    broken_links_delta: -2,
    page_count: 434,
    bundle_size_kb: 2825,
    errors_24h: 0,
    uptime_pct: 99.97,
    summary: 'Déploiement nominal. 2 liens cassés résolus du déploiement précédent. Bundle +18 KB acceptable.',
    recommendations: [],
  },
  {
    id: 'report-20260616-3',
    deployment_id: 'deploy-20260616-3',
    version: 'v2516',
    generated_at: '2026-06-16T18:10:00Z',
    cvw_score: 87,
    cvw_delta: 5,
    seo_score: 89,
    seo_delta: 3,
    broken_links: 2,
    broken_links_delta: 2,
    page_count: 432,
    bundle_size_kb: 2807,
    errors_24h: 1,
    uptime_pct: 99.95,
    summary: 'Déploiement nominal. CWV +5 pts après optimisation images. SEO +3 — Big Four Remediation page. 2 liens cassés dans le blog (en cours de correction). 1 erreur 24h (timeout Edge Function) résolue.',
    recommendations: ['Corriger les 2 liens cassés dans /blog', 'Augmenter le timeout des Edge Functions à 30s'],
  },
];

// ═══ OVERVIEW ═══
export const MOCK_PIPELINE_OVERVIEW: PipelineOverview = {
  total_builds: 2524,
  success_rate: 96.8,
  avg_build_time_seconds: 16.2,
  total_deployments: 1847,
  deploy_frequency: '8.4/jour',
  last_deploy_version: 'v2524',
  uptime_30d: 99.97,
  cvw_score: 87,
  seo_score: 92,
  quality_gate_pass_rate: 98.2,
};

export const STAGE_STATUS_COLORS: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  failed: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
  running: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500 animate-pulse' },
  pending: { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-500', dot: 'bg-gray-400' },
  skipped: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500', dot: 'bg-slate-400' },
};

export const BUILD_STATUS_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  success: { bg: 'bg-emerald-500/15 text-emerald-600', text: 'text-emerald-700', icon: 'ri-check-line' },
  failed: { bg: 'bg-red-500/15 text-red-600', text: 'text-red-700', icon: 'ri-close-line' },
  running: { bg: 'bg-amber-500/15 text-amber-600', text: 'text-amber-700', icon: 'ri-loader-4-line animate-spin' },
  cancelled: { bg: 'bg-gray-500/15 text-gray-600', text: 'text-gray-600', icon: 'ri-stop-circle-line' },
};

export const DEPLOY_STATUS_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  success: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', icon: 'ri-check-line' },
  failed: { bg: 'bg-red-50 border-red-200', text: 'text-red-700', icon: 'ri-close-line' },
  in_progress: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', icon: 'ri-loader-4-line animate-spin' },
  rolled_back: { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', icon: 'ri-arrow-go-back-line' },
};

export const GATE_CATEGORY_COLORS: Record<string, string> = {
  typescript: '#3178C6',
  linting: '#4B32C3',
  bundle: '#E44D26',
  performance: '#059669',
  security: '#DC2626',
  seo: '#86BC25',
};





