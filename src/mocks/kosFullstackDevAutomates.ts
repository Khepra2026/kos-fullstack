// ============================================================
// KOS Fullstack Developer Automates — 10 catégories, 33 agents
// Automatisation complète du cycle de développement fullstack
// ============================================================

export interface devAutomate {
  id: string;
  name: string;
  category: string;
  tech_stack: string[];
  status: 'deployed' | 'partial' | 'mock' | 'offline';
  version: string;
  description: string;
  capabilities: string[];
  success_rate: number;
  tasks_completed: number;
  auto_enabled: boolean;
  icon: string;
  color: string;
  last_execution: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  kpis: { label: string; current: string; target: string; icon: string }[];
}

export interface DevAutomateCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  agents_count: number;
}

// 10 catégories
export const DEV_AUTOMATE_CATEGORIES: DevAutomateCategory[] = [
  { id: 'code-generation', name: 'Code Generation', icon: 'ri-code-box-line', color: '#4F46E5', description: 'Génération automatique de code frontend (React, TS, Tailwind) et backend (Edge Functions)', agents_count: 4 },
  { id: 'automated-testing', name: 'Automated Testing', icon: 'ri-bug-line', color: '#C2410C', description: 'Tests unitaires, intégration, e2e, snapshots, coverage', agents_count: 3 },
  { id: 'cicd-pipeline', name: 'CI/CD Pipeline', icon: 'ri-rocket-2-line', color: '#0D7B5F', description: 'Build, déploiement, rollback, Netlify, preview deploys', agents_count: 3 },
  { id: 'code-review', name: 'Code Review & Quality', icon: 'ri-git-pull-request-line', color: '#8B3040', description: 'Review automatique, linting, SonarQube, complexité cyclomatique', agents_count: 3 },
  { id: 'performance', name: 'Performance Optimization', icon: 'ri-flashlight-line', color: '#E8C547', description: 'Bundle size, lazy loading, code splitting, Core Web Vitals', agents_count: 3 },
  { id: 'security', name: 'Security Hardening', icon: 'ri-shield-flash-line', color: '#C05A3A', description: 'OWASP, CSP, CORS, dépendances, audit sécurité', agents_count: 3 },
  { id: 'database-backend', name: 'Database & Backend', icon: 'ri-database-2-line', color: '#0891B2', description: 'Migrations SQL, RLS policies, Supabase schema, indexes', agents_count: 3 },
  { id: 'api-edge', name: 'API & Edge Functions', icon: 'ri-cloud-line', color: '#6B4A3A', description: 'Edge Functions, REST APIs, webhooks, rate limiting', agents_count: 3 },
  { id: 'accessibility', name: 'Accessibility (a11y)', icon: 'ri-wheelchair-line', color: '#9B7B2C', description: 'ARIA, keyboard nav, contrast, WCAG 2.1 AA', agents_count: 3 },
  { id: 'seo-technical', name: 'SEO Technical', icon: 'ri-search-line', color: '#4A7A1E', description: 'Meta, structured data, sitemaps, canonical, hreflang', agents_count: 3 },
];

// 33 automates fullstack
export const KOS_DEV_AUTOMATES: devAutomate[] = [
  // ============ CATÉGORIE 1 : Code Generation (4 agents) ============
  {
    id: 'code-gen-react', name: 'React Component Generator', category: 'code-generation', tech_stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Vite'], status: 'deployed', version: 'v2.5.1',
    description: 'Génère des composants React optimisés avec typage TypeScript strict, design Tailwind responsive et accessibilité intégrée. Supporte hooks, context, lazy loading.',
    capabilities: ['Composants fonctionnels', 'Hooks personnalisés', 'Typage strict', 'Responsive design', 'Accessibilité ARIA', 'Lazy loading'],
    success_rate: 94.2, tasks_completed: 1847, auto_enabled: true, icon: 'ri-reactjs-line', color: '#4F46E5', last_execution: '2026-06-15T08:00:00Z', priority: 'critical',
    kpis: [{ label: 'Composants générés', current: '1,847', target: '2,500', icon: 'ri-code-box-line' }, { label: 'Taux succès build', current: '94.2%', target: '98%', icon: 'ri-check-double-line' }, { label: 'Temps génération', current: '3.2s', target: '2s', icon: 'ri-timer-line' }],
  },
  {
    id: 'code-gen-edge', name: 'Edge Function Generator', category: 'code-generation', tech_stack: ['Deno', 'TypeScript', 'Supabase', 'Web APIs'], status: 'deployed', version: 'v1.8.3',
    description: 'Génère des Supabase Edge Functions avec validation JWT, rate limiting, gestion d\'erreurs et logging structuré. Template prêt pour production.',
    capabilities: ['Edge Functions Deno', 'JWT auth', 'Rate limiting', 'Error handling', 'Logging', 'CORS'],
    success_rate: 91.8, tasks_completed: 523, auto_enabled: true, icon: 'ri-cloud-line', color: '#0D7B5F', last_execution: '2026-06-14T22:00:00Z', priority: 'high',
    kpis: [{ label: 'Edge Functions', current: '523', target: '800', icon: 'ri-function-line' }, { label: 'Taux déploiement', current: '91.8%', target: '97%', icon: 'ri-rocket-line' }, { label: 'Temps moyen', current: '8.5s', target: '5s', icon: 'ri-timer-line' }],
  },
  {
    id: 'code-gen-migration', name: 'Database Migration Generator', category: 'code-generation', tech_stack: ['PostgreSQL', 'SQL', 'Supabase', 'RLS'], status: 'partial', version: 'v0.9.2',
    description: 'Analyse le schéma existant et génère des migrations SQL réversibles, avec RLS policies automatiques basées sur les rôles et relations.',
    capabilities: ['Migrations SQL', 'RLS policies', 'Index generation', 'Rollback scripts', 'Schema diff'],
    success_rate: 78.5, tasks_completed: 189, auto_enabled: false, icon: 'ri-database-2-line', color: '#0891B2', last_execution: '2026-06-13T18:00:00Z', priority: 'high',
    kpis: [{ label: 'Migrations générées', current: '189', target: '500', icon: 'ri-git-branch-line' }, { label: 'RLS coverage', current: '62%', target: '95%', icon: 'ri-shield-check-line' }, { label: 'Taux rollback OK', current: '85%', target: '99%', icon: 'ri-arrow-go-back-line' }],
  },
  {
    id: 'code-gen-page', name: 'Page Scaffolder', category: 'code-generation', tech_stack: ['React', 'React Router', 'Tailwind', 'i18n'], status: 'deployed', version: 'v2.3.0',
    description: 'Scaffolde des pages complètes avec routing, i18n, SEO head, layout KOS, et composants lazy-loadés. Structure projet standard Khepra Experts.',
    capabilities: ['Page scaffolding', 'Route config', 'i18n setup', 'SEO head', 'Layout KOS', 'Lazy loading'],
    success_rate: 96.5, tasks_completed: 312, auto_enabled: true, icon: 'ri-pages-line', color: '#5B21B6', last_execution: '2026-06-15T07:30:00Z', priority: 'medium',
    kpis: [{ label: 'Pages scaffoldées', current: '312', target: '500', icon: 'ri-pages-line' }, { label: 'Build success', current: '96.5%', target: '99%', icon: 'ri-check-line' }, { label: 'Temps scaffolding', current: '12s', target: '8s', icon: 'ri-timer-line' }],
  },
  // ============ CATÉGORIE 2 : Automated Testing (3 agents) ============
  {
    id: 'test-unit', name: 'Unit Test Generator', category: 'automated-testing', tech_stack: ['Vitest', 'React Testing Library', 'TypeScript', 'JSDOM'], status: 'deployed', version: 'v3.1.0',
    description: 'Génère automatiquement des tests unitaires pour composants React, hooks et utilitaires. Détecte les edge cases et génère des tests de régression.',
    capabilities: ['Tests composants', 'Tests hooks', 'Snapshot testing', 'Edge case detection', 'Coverage report', 'Mutation testing'],
    success_rate: 88.7, tasks_completed: 4520, auto_enabled: true, icon: 'ri-test-tube-line', color: '#C2410C', last_execution: '2026-06-15T06:00:00Z', priority: 'critical',
    kpis: [{ label: 'Tests générés', current: '4,520', target: '8,000', icon: 'ri-file-list-line' }, { label: 'Coverage', current: '78%', target: '90%', icon: 'ri-pie-chart-line' }, { label: 'Bugs détectés', current: '342', target: 'N/A', icon: 'ri-bug-line' }],
  },
  {
    id: 'test-e2e', name: 'E2E Test Runner', category: 'automated-testing', tech_stack: ['Playwright', 'TypeScript', 'CI/CD', 'Supabase'], status: 'partial', version: 'v1.5.2',
    description: 'Exécute des tests end-to-end sur les parcours utilisateur critiques : navigation, formulaires, téléchargements. Intégré au pipeline CI/CD.',
    capabilities: ['Tests navigation', 'Form validation', 'Download tests', 'Multi-browser', 'Visual regression', 'CI integration'],
    success_rate: 82.3, tasks_completed: 895, auto_enabled: false, icon: 'ri-global-line', color: '#E8C547', last_execution: '2026-06-14T20:00:00Z', priority: 'high',
    kpis: [{ label: 'Tests E2E', current: '895', target: '2,000', icon: 'ri-global-line' }, { label: 'Parcours couverts', current: '24', target: '50', icon: 'ri-route-line' }, { label: 'Temps exécution', current: '4m32s', target: '2m', icon: 'ri-timer-line' }],
  },
  {
    id: 'test-api', name: 'API Contract Tester', category: 'automated-testing', tech_stack: ['Supertest', 'OpenAPI', 'JSON Schema', 'TypeScript'], status: 'deployed', version: 'v2.0.1',
    description: 'Valide les contrats API REST et Edge Functions contre les schémas OpenAPI. Vérifie les codes HTTP, headers, formats de réponse et timeouts.',
    capabilities: ['OpenAPI validation', 'Schema testing', 'Status code checks', 'Header validation', 'Timeout testing', 'Load testing'],
    success_rate: 93.1, tasks_completed: 1240, auto_enabled: true, icon: 'ri-swap-box-line', color: '#0D7B5F', last_execution: '2026-06-15T05:30:00Z', priority: 'high',
    kpis: [{ label: 'Endpoints testés', current: '1,240', target: '2,000', icon: 'ri-link' }, { label: 'Conformité OpenAPI', current: '96%', target: '100%', icon: 'ri-file-check-line' }, { label: 'Faux négatifs', current: '2.1%', target: '0.5%', icon: 'ri-error-warning-line' }],
  },
  // ============ CATÉGORIE 3 : CI/CD Pipeline (3 agents) ============
  {
    id: 'cicd-build', name: 'Build Orchestrator', category: 'cicd-pipeline', tech_stack: ['Vite', 'ESBuild', 'TypeScript', 'Netlify'], status: 'deployed', version: 'v3.0.0',
    description: 'Orchestre le build frontend avec Vite/ESBuild, vérifie les types TypeScript, exécute le linting, et valide les assets avant déploiement.',
    capabilities: ['Vite build', 'TypeScript check', 'ESLint', 'Asset optimization', 'Bundle analysis', 'Build caching'],
    success_rate: 97.8, tasks_completed: 2340, auto_enabled: true, icon: 'ri-hammer-line', color: '#86BC25', last_execution: '2026-06-15T08:30:00Z', priority: 'critical',
    kpis: [{ label: 'Builds réussis', current: '2,340', target: '2,500', icon: 'ri-check-double-line' }, { label: 'Temps build', current: '42s', target: '30s', icon: 'ri-timer-line' }, { label: 'Bundle size', current: '385KB', target: '250KB', icon: 'ri-download-line' }],
  },
  {
    id: 'cicd-deploy', name: 'Deployment Manager', category: 'cicd-pipeline', tech_stack: ['Netlify', 'GitHub Actions', 'Supabase', 'CDN'], status: 'deployed', version: 'v2.8.1',
    description: 'Gère le déploiement automatique sur Netlify avec preview deploys, rollback instantané, invalidation CDN, et health checks post-déploiement.',
    capabilities: ['Auto deploy', 'Preview deploys', 'Instant rollback', 'CDN purge', 'Health checks', 'Deploy previews'],
    success_rate: 95.4, tasks_completed: 1870, auto_enabled: true, icon: 'ri-rocket-2-line', color: '#0D7B5F', last_execution: '2026-06-15T08:35:00Z', priority: 'critical',
    kpis: [{ label: 'Déploiements', current: '1,870', target: '2,500', icon: 'ri-rocket-line' }, { label: 'Rollback rate', current: '2.8%', target: '1%', icon: 'ri-arrow-go-back-line' }, { label: 'Deploy time', current: '28s', target: '15s', icon: 'ri-timer-line' }],
  },
  {
    id: 'cicd-artifact', name: 'Artifact Publisher', category: 'cicd-pipeline', tech_stack: ['Supabase Storage', 'CDN', 'WebP', 'Brotli'], status: 'partial', version: 'v1.2.0',
    description: 'Optimise et publie les assets statiques (images WebP, CSS minifié, JS chunké) sur Supabase Storage avec cache CDN et compression Brotli.',
    capabilities: ['Image optimization', 'CSS/JS minify', 'WebP conversion', 'Brotli compression', 'CDN cache', 'Asset versioning'],
    success_rate: 85.2, tasks_completed: 640, auto_enabled: false, icon: 'ri-archive-line', color: '#9B7B2C', last_execution: '2026-06-14T19:00:00Z', priority: 'medium',
    kpis: [{ label: 'Assets optimisés', current: '640', target: '1,200', icon: 'ri-image-line' }, { label: 'Taille réduite', current: '-42%', target: '-55%', icon: 'ri-scissors-line' }, { label: 'Cache hit', current: '88%', target: '95%', icon: 'ri-hard-drive-2-line' }],
  },
  // ============ CATÉGORIE 4 : Code Review & Quality (3 agents) ============
  {
    id: 'review-lint', name: 'Lint & Format Guardian', category: 'code-review', tech_stack: ['ESLint', 'Prettier', 'TypeScript ESLint', 'Husky'], status: 'deployed', version: 'v3.2.0',
    description: 'Applique les règles ESLint/Prettier configurées, bloque les commits non conformes via Husky pre-commit hooks, et génère des rapports de conformité.',
    capabilities: ['ESLint enforcement', 'Prettier format', 'Pre-commit hooks', 'TypeScript strict', 'Import sorting', 'Unused code detection'],
    success_rate: 99.1, tasks_completed: 8750, auto_enabled: true, icon: 'ri-braces-line', color: '#8B3040', last_execution: '2026-06-15T08:00:00Z', priority: 'high',
    kpis: [{ label: 'Lint checks', current: '8,750', target: '10,000', icon: 'ri-check-line' }, { label: 'Rules enforced', current: '142', target: '150', icon: 'ri-list-check' }, { label: 'Blocked commits', current: '89', target: 'N/A', icon: 'ri-forbid-line' }],
  },
  {
    id: 'review-sonar', name: 'Code Quality Analyzer', category: 'code-review', tech_stack: ['SonarQube', 'TypeScript', 'Complexity Metrics', 'Duplication'], status: 'partial', version: 'v1.4.0',
    description: 'Analyse la qualité du code : complexité cyclomatique, duplication, code smells, dette technique. Intégration SonarQube avec seuils de qualité.',
    capabilities: ['Complexity analysis', 'Duplication detection', 'Code smells', 'Tech debt metrics', 'Quality gates', 'Trend analysis'],
    success_rate: 76.8, tasks_completed: 420, auto_enabled: false, icon: 'ri-bar-chart-box-line', color: '#5B8C2A', last_execution: '2026-06-13T15:00:00Z', priority: 'high',
    kpis: [{ label: 'Analyses', current: '420', target: '1,000', icon: 'ri-line-chart-line' }, { label: 'Debt ratio', current: '3.2%', target: '1%', icon: 'ri-percent-line' }, { label: 'Code smells', current: '156', target: '50', icon: 'ri-emotion-unhappy-line' }],
  },
  {
    id: 'review-pr', name: 'AI PR Reviewer', category: 'code-review', tech_stack: ['LLM', 'GitHub API', 'TypeScript', 'Context Analysis'], status: 'partial', version: 'v0.8.0',
    description: 'Review automatique des Pull Requests : détection de bugs, suggestions d\'amélioration, vérification des best practices, analyse de l\'impact des changements.',
    capabilities: ['Bug detection', 'Best practices check', 'Impact analysis', 'Security review', 'Performance hints', 'Documentation check'],
    success_rate: 68.5, tasks_completed: 215, auto_enabled: false, icon: 'ri-git-pull-request-line', color: '#6B4A3A', last_execution: '2026-06-14T17:00:00Z', priority: 'high',
    kpis: [{ label: 'PRs reviewées', current: '215', target: '500', icon: 'ri-git-pull-request-line' }, { label: 'Suggestions acceptées', current: '62%', target: '80%', icon: 'ri-thumb-up-line' }, { label: 'Faux positifs', current: '18%', target: '5%', icon: 'ri-error-warning-line' }],
  },
  // ============ CATÉGORIE 5 : Performance Optimization (3 agents) ============
  {
    id: 'perf-bundle', name: 'Bundle Optimizer', category: 'performance', tech_stack: ['Rollup', 'ESBuild', 'Terser', 'CSSNano'], status: 'deployed', version: 'v2.6.0',
    description: 'Analyse et optimise le bundle JavaScript : tree shaking, code splitting, dead code elimination, minification avancée. Rapport d\'impact par chunk.',
    capabilities: ['Tree shaking', 'Code splitting', 'Dead code elimination', 'Advanced minification', 'Chunk analysis', 'Import optimization'],
    success_rate: 91.4, tasks_completed: 1560, auto_enabled: true, icon: 'ri-scissors-cut-line', color: '#E8C547', last_execution: '2026-06-15T07:00:00Z', priority: 'high',
    kpis: [{ label: 'Bundles optimisés', current: '1,560', target: '2,000', icon: 'ri-archive-line' }, { label: 'Réduction moyenne', current: '34%', target: '45%', icon: 'ri-arrow-down-line' }, { label: 'Chunks analysés', current: '89', target: '120', icon: 'ri-stack-line' }],
  },
  {
    id: 'perf-cwv', name: 'Core Web Vitals Monitor', category: 'performance', tech_stack: ['Lighthouse', 'Web Vitals API', 'CrUX', 'Supabase'], status: 'deployed', version: 'v2.3.1',
    description: 'Monitor continu des Core Web Vitals (LCP, INP, CLS) avec alertes automatiques. Intégration CrUX pour les données de terrain réelles.',
    capabilities: ['LCP monitoring', 'INP tracking', 'CLS detection', 'CrUX integration', 'Alert thresholds', 'Trend dashboard'],
    success_rate: 89.2, tasks_completed: 3240, auto_enabled: true, icon: 'ri-speed-up-line', color: '#C05A3A', last_execution: '2026-06-15T08:15:00Z', priority: 'critical',
    kpis: [{ label: 'Pages monitorées', current: '3,240', target: '5,000', icon: 'ri-pages-line' }, { label: 'LCP moyen', current: '2.4s', target: '2.0s', icon: 'ri-timer-line' }, { label: 'Score mobile', current: '78', target: '92', icon: 'ri-smartphone-line' }],
  },
  {
    id: 'perf-image', name: 'Image & Asset Optimizer', category: 'performance', tech_stack: ['Sharp', 'WebP', 'AVIF', 'Lazy Loading', 'CDN'], status: 'partial', version: 'v1.6.0',
    description: 'Convertit automatiquement les images en WebP/AVIF, redimensionne pour responsive, applique le lazy loading natif, et génère les srcset.',
    capabilities: ['WebP conversion', 'AVIF support', 'Responsive sizing', 'Lazy loading', 'SrcSet generation', 'Blur placeholders'],
    success_rate: 84.8, tasks_completed: 980, auto_enabled: false, icon: 'ri-image-edit-line', color: '#4A7A1E', last_execution: '2026-06-14T16:00:00Z', priority: 'high',
    kpis: [{ label: 'Images optimisées', current: '980', target: '2,000', icon: 'ri-image-line' }, { label: 'Taille réduite', current: '-58%', target: '-70%', icon: 'ri-arrow-down-line' }, { label: 'WebP couverture', current: '72%', target: '100%', icon: 'ri-check-double-line' }],
  },
  // ============ CATÉGORIE 6 : Security Hardening (3 agents) ============
  {
    id: 'sec-owasp', name: 'OWASP Top 10 Scanner', category: 'security', tech_stack: ['OWASP ZAP', 'Nuclei', 'Custom Rules', 'TypeScript'], status: 'deployed', version: 'v3.1.0',
    description: 'Scan OWASP Top 10 automatisé avec règles personnalisées pour React/SPA : XSS, injection, broken auth, sensitive data exposure, CSRF.',
    capabilities: ['XSS detection', 'CSRF checks', 'Auth bypass scan', 'Data exposure scan', 'Custom rules', 'Compliance report'],
    success_rate: 87.5, tasks_completed: 2180, auto_enabled: true, icon: 'ri-shield-flash-line', color: '#C05A3A', last_execution: '2026-06-15T06:30:00Z', priority: 'critical',
    kpis: [{ label: 'Scans effectués', current: '2,180', target: '3,000', icon: 'ri-radar-line' }, { label: 'Vulns critiques', current: '0', target: '0', icon: 'ri-close-circle-line' }, { label: 'Score OWASP', current: '91', target: '98', icon: 'ri-shield-line' }],
  },
  {
    id: 'sec-headers', name: 'Security Headers Guardian', category: 'security', tech_stack: ['Netlify _headers', 'Supabase', 'CSP', 'HSTS'], status: 'deployed', version: 'v2.4.0',
    description: 'Configure et valide les headers de sécurité HTTP : CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.',
    capabilities: ['CSP generation', 'HSTS enforcement', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy', 'Security score'],
    success_rate: 94.8, tasks_completed: 1340, auto_enabled: true, icon: 'ri-file-shield-2-line', color: '#8B3040', last_execution: '2026-06-14T23:00:00Z', priority: 'high',
    kpis: [{ label: 'Headers configurés', current: '1,340', target: '2,000', icon: 'ri-list-settings-line' }, { label: 'Security score', current: 'A', target: 'A+', icon: 'ri-graduation-cap-line' }, { label: 'CSP coverage', current: '95%', target: '100%', icon: 'ri-shield-check-line' }],
  },
  {
    id: 'sec-deps', name: 'Dependency Auditor', category: 'security', tech_stack: ['npm audit', 'Snyk', 'Dependabot', 'SBOM'], status: 'deployed', version: 'v2.1.0',
    description: 'Audit continu des dépendances npm : vulnérabilités connues, licences, versions obsolètes. Génération automatique de SBOM (Software Bill of Materials).',
    capabilities: ['npm audit', 'Vulnerability scan', 'License check', 'SBOM generation', 'Auto PR fixes', 'Deprecation alerts'],
    success_rate: 92.6, tasks_completed: 3670, auto_enabled: true, icon: 'ri-package-line', color: '#C2410C', last_execution: '2026-06-15T08:00:00Z', priority: 'high',
    kpis: [{ label: 'Audits npm', current: '3,670', target: '5,000', icon: 'ri-package-line' }, { label: 'Vulns patchées', current: '128', target: 'N/A', icon: 'ri-shield-check-line' }, { label: 'Deps à jour', current: '94%', target: '99%', icon: 'ri-refresh-line' }],
  },
  // ============ CATÉGORIE 7 : Database & Backend (3 agents) ============
  {
    id: 'db-migration', name: 'SQL Migration Manager', category: 'database-backend', tech_stack: ['PostgreSQL', 'Supabase', 'Migrations', 'Indexing'], status: 'deployed', version: 'v2.7.0',
    description: 'Gère les migrations SQL : création de tables, colonnes, indexes, contraintes. Versioning des schémas, rollback automatique, dry-run preview.',
    capabilities: ['Schema versioning', 'Auto rollback', 'Dry-run mode', 'Index optimization', 'Constraint checks', 'Migration history'],
    success_rate: 93.5, tasks_completed: 1120, auto_enabled: true, icon: 'ri-database-2-line', color: '#0891B2', last_execution: '2026-06-15T07:00:00Z', priority: 'high',
    kpis: [{ label: 'Migrations', current: '1,120', target: '2,000', icon: 'ri-git-branch-line' }, { label: 'Taux succès', current: '93.5%', target: '99%', icon: 'ri-check-double-line' }, { label: 'Rollbacks', current: '24', target: 'N/A', icon: 'ri-arrow-go-back-line' }],
  },
  {
    id: 'db-rls', name: 'RLS Policy Generator', category: 'database-backend', tech_stack: ['PostgreSQL RLS', 'Supabase Auth', 'JWT', 'Row-level security'], status: 'partial', version: 'v1.3.0',
    description: 'Analyse le modèle de données et génère automatiquement les RLS policies adaptées : select, insert, update, delete par rôle et ownership.',
    capabilities: ['RLS generation', 'Role-based policies', 'Ownership rules', 'Policy testing', 'Coverage report'],
    success_rate: 75.2, tasks_completed: 340, auto_enabled: false, icon: 'ri-lock-password-line', color: '#8B3040', last_execution: '2026-06-13T20:00:00Z', priority: 'high',
    kpis: [{ label: 'RLS policies', current: '340', target: '800', icon: 'ri-shield-keyhole-line' }, { label: 'Tables protégées', current: '68%', target: '100%', icon: 'ri-database-2-line' }, { label: 'Tests coverage', current: '55%', target: '90%', icon: 'ri-test-tube-line' }],
  },
  {
    id: 'db-query', name: 'Query Performance Optimizer', category: 'database-backend', tech_stack: ['PostgreSQL EXPLAIN', 'pg_stat_statements', 'Index Advisor'], status: 'partial', version: 'v1.1.0',
    description: 'Analyse les requêtes lentes via EXPLAIN ANALYZE, suggère des indexes, réécrit les queries problématiques, optimise les jointures.',
    capabilities: ['EXPLAIN analysis', 'Index suggestions', 'Query rewriting', 'Join optimization', 'EXPLAIN visualization'],
    success_rate: 72.8, tasks_completed: 195, auto_enabled: false, icon: 'ri-speed-up-line', color: '#9B7B2C', last_execution: '2026-06-12T22:00:00Z', priority: 'high',
    kpis: [{ label: 'Requêtes optimisées', current: '195', target: '500', icon: 'ri-code-line' }, { label: 'Gain moyen', current: '-62%', target: '-75%', icon: 'ri-arrow-down-line' }, { label: 'Index suggérés', current: '47', target: '100', icon: 'ri-stack-line' }],
  },
  // ============ CATÉGORIE 8 : API & Edge Functions (3 agents) ============
  {
    id: 'api-gateway', name: 'API Gateway Configurator', category: 'api-edge', tech_stack: ['Supabase', 'REST', 'JWT', 'Rate Limiting', 'CORS'], status: 'deployed', version: 'v2.2.0',
    description: 'Configure les endpoints API : routing, JWT authentication, rate limiting par IP/token, CORS policies, validation des payloads, logging.',
    capabilities: ['JWT auth', 'Rate limiting', 'CORS setup', 'Payload validation', 'Request logging', 'Error standardization'],
    success_rate: 90.8, tasks_completed: 780, auto_enabled: true, icon: 'ri-git-merge-line', color: '#6B4A3A', last_execution: '2026-06-15T07:00:00Z', priority: 'high',
    kpis: [{ label: 'Endpoints configurés', current: '780', target: '1,200', icon: 'ri-link' }, { label: 'Auth coverage', current: '92%', target: '100%', icon: 'ri-lock-line' }, { label: 'Rate limit hits', current: '1,240', target: 'N/A', icon: 'ri-speed-line' }],
  },
  {
    id: 'api-webhook', name: 'Webhook Manager', category: 'api-edge', tech_stack: ['Supabase Edge Functions', 'Webhooks', 'Retry Logic', 'Idempotency'], status: 'partial', version: 'v1.5.0',
    description: 'Gère les webhooks entrants et sortants : signature validation, retry avec backoff exponentiel, idempotency keys, logging et monitoring.',
    capabilities: ['Signature validation', 'Retry logic', 'Idempotency', 'Payload transformation', 'Webhook logging', 'Dead letter queue'],
    success_rate: 79.4, tasks_completed: 410, auto_enabled: false, icon: 'ri-webhook-line', color: '#4A7A1E', last_execution: '2026-06-14T18:00:00Z', priority: 'medium',
    kpis: [{ label: 'Webhooks gérés', current: '410', target: '800', icon: 'ri-webhook-line' }, { label: 'Delivery rate', current: '96.2%', target: '99.5%', icon: 'ri-check-double-line' }, { label: 'Retry success', current: '88%', target: '95%', icon: 'ri-refresh-line' }],
  },
  {
    id: 'api-doc', name: 'OpenAPI Doc Generator', category: 'api-edge', tech_stack: ['OpenAPI 3.1', 'Swagger', 'TypeScript', 'JSON Schema'], status: 'deployed', version: 'v2.0.0',
    description: 'Génère automatiquement la documentation OpenAPI 3.1 des Edge Functions et APIs REST. Swagger UI interactif, exemples de requêtes, schémas de validation.',
    capabilities: ['OpenAPI 3.1 spec', 'Swagger UI', 'Request examples', 'Schema generation', 'Authentication docs', 'Changelog'],
    success_rate: 95.2, tasks_completed: 560, auto_enabled: true, icon: 'ri-file-code-line', color: '#0D7B5F', last_execution: '2026-06-15T06:00:00Z', priority: 'medium',
    kpis: [{ label: 'APIs documentées', current: '560', target: '800', icon: 'ri-file-text-line' }, { label: 'Schémas validés', current: '98%', target: '100%', icon: 'ri-check-line' }, { label: 'MàJ auto', current: '12', target: '24', icon: 'ri-refresh-line' }],
  },
  // ============ CATÉGORIE 9 : Accessibility a11y (3 agents) ============
  {
    id: 'a11y-audit', name: 'WCAG 2.1 AA Auditor', category: 'accessibility', tech_stack: ['axe-core', 'Lighthouse a11y', 'WCAG 2.1', 'ARIA'], status: 'deployed', version: 'v2.5.0',
    description: 'Audit automatique WCAG 2.1 niveau AA : contraste, landmarks ARIA, navigation clavier, labels, alt text, focus management.',
    capabilities: ['Contrast check', 'ARIA landmarks', 'Keyboard nav', 'Alt text audit', 'Focus order', 'Screen reader test'],
    success_rate: 86.2, tasks_completed: 1920, auto_enabled: true, icon: 'ri-wheelchair-line', color: '#9B7B2C', last_execution: '2026-06-15T07:30:00Z', priority: 'high',
    kpis: [{ label: 'Pages auditées', current: '1,920', target: '3,000', icon: 'ri-pages-line' }, { label: 'Score a11y', current: '82', target: '95', icon: 'ri-check-double-line' }, { label: 'Violations', current: '67', target: '5', icon: 'ri-error-warning-line' }],
  },
  {
    id: 'a11y-aria', name: 'ARIA Label Injector', category: 'accessibility', tech_stack: ['ARIA', 'React', 'axe-core', 'DOM Analysis'], status: 'partial', version: 'v1.4.0',
    description: 'Analyse le DOM et injecte automatiquement les attributs ARIA manquants : aria-label, aria-describedby, role, aria-expanded, aria-hidden.',
    capabilities: ['ARIA injection', 'Role assignment', 'Label generation', 'Live regions', 'Focus management'],
    success_rate: 74.8, tasks_completed: 580, auto_enabled: false, icon: 'ri-file-code-line', color: '#5B8C2A', last_execution: '2026-06-14T15:00:00Z', priority: 'high',
    kpis: [{ label: 'ARIA injectés', current: '580', target: '1,500', icon: 'ri-code-box-line' }, { label: 'Précision', current: '74.8%', target: '90%', icon: 'ri-focus-2-line' }, { label: 'Éléments couverts', current: '58%', target: '85%', icon: 'ri-checkbox-circle-line' }],
  },
  {
    id: 'a11y-keyboard', name: 'Keyboard Navigation Tester', category: 'accessibility', tech_stack: ['Playwright', 'axe-core', 'TabIndex', 'Focus Trap'], status: 'partial', version: 'v1.2.0',
    description: 'Teste la navigation au clavier complète : tab order, focus traps, skip links, modales, menus déroulants. Détecte les keyboard traps.',
    capabilities: ['Tab order test', 'Focus trap detection', 'Skip links', 'Modal handling', 'Dropdown keyboard', 'Focus visible'],
    success_rate: 81.5, tasks_completed: 320, auto_enabled: false, icon: 'ri-keyboard-box-line', color: '#C05A3A', last_execution: '2026-06-13T14:00:00Z', priority: 'medium',
    kpis: [{ label: 'Pages testées', current: '320', target: '800', icon: 'ri-pages-line' }, { label: 'Traps détectés', current: '42', target: '0', icon: 'ri-emotion-unhappy-line' }, { label: 'Tab order OK', current: '85%', target: '98%', icon: 'ri-list-check' }],
  },
  // ============ CATÉGORIE 10 : SEO Technical (3 agents) ============
  {
    id: 'seo-meta', name: 'Meta & Structured Data Generator', category: 'seo-technical', tech_stack: ['Schema.org', 'JSON-LD', 'OpenGraph', 'Twitter Cards'], status: 'deployed', version: 'v2.9.0',
    description: 'Génère et valide les balises meta, Schema.org JSON-LD, OpenGraph, Twitter Cards. Vérifie la cohérence SEO on-page de toutes les pages.',
    capabilities: ['JSON-LD generation', 'OpenGraph tags', 'Twitter Cards', 'Meta validation', 'Canonical check', 'Hreflang validation'],
    success_rate: 93.8, tasks_completed: 2840, auto_enabled: true, icon: 'ri-code-s-slash-line', color: '#4A7A1E', last_execution: '2026-06-15T08:00:00Z', priority: 'critical',
    kpis: [{ label: 'Pages optimisées', current: '2,840', target: '5,000', icon: 'ri-pages-line' }, { label: 'Schema valid', current: '97%', target: '100%', icon: 'ri-check-line' }, { label: 'OG coverage', current: '94%', target: '100%', icon: 'ri-share-line' }],
  },
  {
    id: 'seo-sitemap', name: 'Sitemap & Robots Manager', category: 'seo-technical', tech_stack: ['XML Sitemap', 'Robots.txt', 'Google Search Console', 'Indexing API'], status: 'deployed', version: 'v2.2.1',
    description: 'Gère les sitemaps XML dynamiques, robots.txt, soumission automatique à Google Search Console via Indexing API, suivi du statut d\'indexation.',
    capabilities: ['Dynamic sitemap', 'Robots.txt', 'GSC submission', 'Indexing API', 'Crawl budget', 'Sitemap splitting'],
    success_rate: 96.1, tasks_completed: 2230, auto_enabled: true, icon: 'ri-map-2-line', color: '#0D7B5F', last_execution: '2026-06-15T07:00:00Z', priority: 'high',
    kpis: [{ label: 'URLs sitemap', current: '2,230', target: '3,000', icon: 'ri-link' }, { label: 'Indexées', current: '89%', target: '95%', icon: 'ri-check-double-line' }, { label: 'Crawl errors', current: '14', target: '0', icon: 'ri-error-warning-line' }],
  },
  {
    id: 'seo-links', name: 'Internal Link Optimizer', category: 'seo-technical', tech_stack: ['Crawl Analysis', 'PageRank', 'Link Graph', 'TypeScript'], status: 'partial', version: 'v1.7.0',
    description: 'Analyse le maillage interne, détecte les pages orphelines, optimise la distribution du link juice, suggère des liens contextuels pertinents.',
    capabilities: ['Orphan detection', 'Link juice analysis', 'Contextual suggestions', 'Anchor text optimization', 'Link graph visualization'],
    success_rate: 80.5, tasks_completed: 670, auto_enabled: false, icon: 'ri-git-branch-line', color: '#8B3040', last_execution: '2026-06-14T20:00:00Z', priority: 'high',
    kpis: [{ label: 'Liens analysés', current: '670', target: '2,000', icon: 'ri-git-branch-line' }, { label: 'Orphelines trouvées', current: '12', target: '0', icon: 'ri-link-unlink-m' }, { label: 'Suggestions', current: '342', target: '1,000', icon: 'ri-lightbulb-line' }],
  },
];

export const DEV_AUTOMATES_KPIS = {
  total_agents: 33,
  deployed: 17,
  partial: 13,
  mock: 3,
  auto_enabled: 16,
  total_tasks: 40915,
  avg_success_rate: 87.4,
  critical_agents: 7,
  high_priority: 15,
  categories: 10,
};





