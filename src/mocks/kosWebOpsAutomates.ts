// ============================================================
// KOS Web Operations Automates — 3 catégories, 12 agents
// Administration des ressources, mises à jour, upgrades du site
// ============================================================

export interface KOSWebOpsAutomate {
  id: string;
  name: string;
  category: string;
  tech_stack: string[];
  status: 'deployed' | 'partial' | 'mock';
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

export interface WebOpsAutomateCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  agents_count: number;
}

// 3 catégories
export const WEB_OPS_AUTOMATE_CATEGORIES: WebOpsAutomateCategory[] = [
  {
    id: 'resource-admin',
    name: 'Administration des Ressources',
    icon: 'ri-server-line',
    color: '#0D7B5F',
    description: 'Gestion automatisée des assets, documents, médias, stockage et CDN du site KOS.',
    agents_count: 4,
  },
  {
    id: 'site-updates',
    name: 'Mises à Jour du Site',
    icon: 'ri-refresh-line',
    color: '#C05A3A',
    description: 'Orchestration des mises à jour de contenu, patches sécurité, dépendances et configurations.',
    agents_count: 4,
  },
  {
    id: 'site-upgrades',
    name: 'Upgrade du Site',
    icon: 'ri-arrow-up-circle-line',
    color: '#8B3040',
    description: 'Planification et exécution des upgrades majeurs : framework, architecture, versions, feature flags.',
    agents_count: 4,
  },
];

// 12 automates web operations
export const KOS_WEB_OPS_AUTOMATES: KOSWebOpsAutomate[] = [
  // ============ CATÉGORIE 1 : Administration des Ressources (4 agents) ============
  {
    id: 'res-cdn',
    name: 'Asset CDN Manager',
    category: 'resource-admin',
    tech_stack: ['Netlify CDN', 'Supabase Storage', 'Cache-Control', 'Brotli'],
    status: 'deployed',
    version: 'v2.3.1',
    description: 'Gère le CDN du site : purge cache intelligente, invalidation sélective, distribution géo-optimisée des assets statiques. Compression Brotli et cache headers automatiques.',
    capabilities: ['Cache purge auto', 'Invalidation sélective', 'Brotli compression', 'Geo-distribution', 'Cache warming', 'TTL dynamique'],
    success_rate: 96.8,
    tasks_completed: 3840,
    auto_enabled: true,
    icon: 'ri-cloud-line',
    color: '#0D7B5F',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Purges cache', current: '3,840', target: '5,000', icon: 'ri-delete-back-line' },
      { label: 'Cache hit ratio', current: '94.2%', target: '98%', icon: 'ri-pie-chart-line' },
      { label: 'Temps réponse CDN', current: '42ms', target: '30ms', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'res-docs',
    name: 'Document Library Curator',
    category: 'resource-admin',
    tech_stack: ['Supabase Storage', 'PDF Generator', 'Versioning', 'Metadata'],
    status: 'deployed',
    version: 'v1.9.0',
    description: 'Catalogue, versionne et distribue les documents du site : PDF, whitepapers, guides, rapports. Gère les métadonnées, le versioning et les permissions d\'accès.',
    capabilities: ['Versioning docs', 'Metadata mgmt', 'Access control', 'PDF optimization', 'Search indexing', 'Download tracking'],
    success_rate: 92.4,
    tasks_completed: 2150,
    auto_enabled: true,
    icon: 'ri-file-text-line',
    color: '#0D7B5F',
    last_execution: '2026-06-15T07:30:00Z',
    priority: 'high',
    kpis: [
      { label: 'Documents gérés', current: '2,150', target: '3,000', icon: 'ri-file-line' },
      { label: 'Taux disponibilité', current: '99.7%', target: '99.9%', icon: 'ri-check-double-line' },
      { label: 'Téléchargements', current: '45,230', target: '60,000', icon: 'ri-download-line' },
    ],
  },
  {
    id: 'res-media',
    name: 'Media Optimization Pipeline',
    category: 'resource-admin',
    tech_stack: ['Sharp', 'WebP', 'AVIF', 'Responsive Images', 'Lazy Loading'],
    status: 'deployed',
    version: 'v2.1.0',
    description: 'Pipeline automatisé d\'optimisation média : conversion WebP/AVIF, redimensionnement responsive, génération srcset, lazy loading natif. Réduction moyenne de 62% du poids des images.',
    capabilities: ['WebP/AVIF convert', 'Responsive sizing', 'SrcSet generation', 'Lazy loading', 'Blur placeholder', 'Compression lossless'],
    success_rate: 89.5,
    tasks_completed: 6720,
    auto_enabled: true,
    icon: 'ri-image-edit-line',
    color: '#0D7B5F',
    last_execution: '2026-06-15T06:45:00Z',
    priority: 'high',
    kpis: [
      { label: 'Images optimisées', current: '6,720', target: '10,000', icon: 'ri-image-line' },
      { label: 'Réduction poids', current: '-62%', target: '-70%', icon: 'ri-scissors-line' },
      { label: 'WebP couverture', current: '88%', target: '100%', icon: 'ri-check-double-line' },
    ],
  },
  {
    id: 'res-storage',
    name: 'Storage & Cache Governor',
    category: 'resource-admin',
    tech_stack: ['Supabase Storage', 'IndexedDB', 'Cache API', 'SWR'],
    status: 'partial',
    version: 'v1.4.0',
    description: 'Gouverne le stockage et les stratégies de cache : quotas Supabase Storage, politiques de rétention, Cache API frontend, IndexedDB pour données persistantes. Nettoie les assets orphelins.',
    capabilities: ['Quota management', 'Retention policies', 'Cache API', 'IndexedDB', 'Orphan cleanup', 'Storage analytics'],
    success_rate: 81.2,
    tasks_completed: 940,
    auto_enabled: false,
    icon: 'ri-hard-drive-2-line',
    color: '#0D7B5F',
    last_execution: '2026-06-14T22:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Quota utilisé', current: '62%', target: '80%', icon: 'ri-pie-chart-line' },
      { label: 'Assets orphelins', current: '34', target: '0', icon: 'ri-delete-bin-line' },
      { label: 'Cache efficiency', current: '87%', target: '95%', icon: 'ri-speed-line' },
    ],
  },

  // ============ CATÉGORIE 2 : Mises à Jour du Site (4 agents) ============
  {
    id: 'update-content',
    name: 'Content Update Scheduler',
    category: 'site-updates',
    tech_stack: ['CMS Headless', 'Markdown', 'Git-based CMS', 'Scheduled Publishing'],
    status: 'deployed',
    version: 'v2.4.0',
    description: 'Planifie et exécute les mises à jour de contenu : articles blog, pages services, landing pages. Publication programmée, révisions, rollback contenu. Intégration Git-based CMS.',
    capabilities: ['Scheduled publish', 'Content revision', 'Rollback content', 'Draft preview', 'Bulk update', 'SEO meta sync'],
    success_rate: 94.7,
    tasks_completed: 1280,
    auto_enabled: true,
    icon: 'ri-calendar-check-line',
    color: '#C05A3A',
    last_execution: '2026-06-15T08:15:00Z',
    priority: 'high',
    kpis: [
      { label: 'MàJ contenu', current: '1,280', target: '2,000', icon: 'ri-file-edit-line' },
      { label: 'Publiées à l\'heure', current: '97.3%', target: '99%', icon: 'ri-timer-line' },
      { label: 'Rollbacks', current: '12', target: 'N/A', icon: 'ri-arrow-go-back-line' },
    ],
  },
  {
    id: 'update-security',
    name: 'Security Patch Orchestrator',
    category: 'site-updates',
    tech_stack: ['npm audit', 'Dependabot', 'Snyk', 'GitHub Security Advisories'],
    status: 'deployed',
    version: 'v2.6.1',
    description: 'Orchestre l\'application des patches de sécurité : détection des vulnérabilités npm, génération de PR automatiques, tests de non-régression, déploiement sécurisé. Alertes critiques en temps réel.',
    capabilities: ['Vuln detection', 'Auto PR patches', 'Regression tests', 'Secure deploy', 'Critical alerts', 'CVE tracking'],
    success_rate: 95.1,
    tasks_completed: 890,
    auto_enabled: true,
    icon: 'ri-shield-flash-line',
    color: '#C05A3A',
    last_execution: '2026-06-15T07:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Patches appliqués', current: '890', target: '1,200', icon: 'ri-shield-check-line' },
      { label: 'Vulns critiques', current: '0', target: '0', icon: 'ri-error-warning-line' },
      { label: 'Temps patch', current: '4.2h', target: '2h', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'update-deps',
    name: 'Dependency Update Engine',
    category: 'site-updates',
    tech_stack: ['npm', 'Renovate', 'Semver', 'Lockfile Analysis'],
    status: 'deployed',
    version: 'v2.2.0',
    description: 'Maintient les dépendances à jour automatiquement : analyse semver, tests de compatibilité, mise à jour par lots, rollback si échec. Couvre React, Vite, Tailwind et 200+ packages.',
    capabilities: ['Semver analysis', 'Compat testing', 'Batch updates', 'Auto rollback', 'Lockfile diff', 'Changelog gen'],
    success_rate: 91.3,
    tasks_completed: 2340,
    auto_enabled: true,
    icon: 'ri-archive-line',
    color: '#C05A3A',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Deps mises à jour', current: '2,340', target: '3,000', icon: 'ri-arrow-up-line' },
      { label: 'Build success', current: '91.3%', target: '97%', icon: 'ri-check-double-line' },
      { label: 'Deps obsolètes', current: '8', target: '0', icon: 'ri-alert-line' },
    ],
  },
  {
    id: 'update-config',
    name: 'Configuration Sync Manager',
    category: 'site-updates',
    tech_stack: ['Netlify TOML', 'Environment Variables', 'Vite Config', 'Tailwind Config'],
    status: 'partial',
    version: 'v1.3.0',
    description: 'Synchronise les configurations entre environnements (dev, preview, prod) : variables d\'environnement, netlify.toml, vite.config, tailwind.config. Détecte les dérives et les corrige.',
    capabilities: ['Env sync', 'Config diff', 'Drift detection', 'Auto-correction', 'Secret rotation', 'Audit log'],
    success_rate: 78.5,
    tasks_completed: 560,
    auto_enabled: false,
    icon: 'ri-settings-4-line',
    color: '#C05A3A',
    last_execution: '2026-06-14T19:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Configs sync', current: '560', target: '1,000', icon: 'ri-refresh-line' },
      { label: 'Drifts détectés', current: '47', target: 'N/A', icon: 'ri-git-branch-line' },
      { label: 'Correction auto', current: '78.5%', target: '95%', icon: 'ri-magic-line' },
    ],
  },

  // ============ CATÉGORIE 3 : Upgrade du Site (4 agents) ============
  {
    id: 'upgrade-mass',
    name: 'Mass System Upgrader',
    category: 'site-upgrades',
    tech_stack: ['React 19', 'Vite 6', 'Tailwind CSS 4', 'TypeScript 5.7'],
    status: 'deployed',
    version: 'v3.0.0',
    description: 'Exécute les upgrades massifs du système : migration React 18→19, Vite 4→6, Tailwind 3→4. Planification, dry-run, rollback automatique si échec. 340+ pages migrées avec succès.',
    capabilities: ['React migration', 'Vite upgrade', 'Tailwind migration', 'Dry-run mode', 'Auto rollback', 'Impact analysis'],
    success_rate: 93.2,
    tasks_completed: 340,
    auto_enabled: true,
    icon: 'ri-rocket-2-line',
    color: '#8B3040',
    last_execution: '2026-06-10T14:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Pages migrées', current: '340', target: '400', icon: 'ri-pages-line' },
      { label: 'Taux succès', current: '93.2%', target: '99%', icon: 'ri-check-double-line' },
      { label: 'Temps migration', current: '48h', target: '24h', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'upgrade-framework',
    name: 'Framework Migration Engine',
    category: 'site-upgrades',
    tech_stack: ['AST Analysis', 'Codemods', 'jscodeshift', 'TS Morph'],
    status: 'partial',
    version: 'v1.7.0',
    description: 'Migre automatiquement le code entre versions majeures de frameworks via AST transformations et codemods. Supporte React, TypeScript, Tailwind. Génère des rapports de breaking changes.',
    capabilities: ['AST transforms', 'Codemods', 'Breaking changes', 'Impact report', 'Auto-fix patterns', 'Regression suite'],
    success_rate: 76.4,
    tasks_completed: 195,
    auto_enabled: false,
    icon: 'ri-git-branch-line',
    color: '#8B3040',
    last_execution: '2026-06-12T10:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Migrations auto', current: '195', target: '500', icon: 'ri-code-box-line' },
      { label: 'Breaking changes', current: '28', target: 'N/A', icon: 'ri-error-warning-line' },
      { label: 'Auto-fix rate', current: '68%', target: '90%', icon: 'ri-magic-line' },
    ],
  },
  {
    id: 'upgrade-arch',
    name: 'Architecture Evolution Planner',
    category: 'site-upgrades',
    tech_stack: ['Architecture Decision Records', 'Dependency Graph', 'Component Analysis'],
    status: 'partial',
    version: 'v1.5.0',
    description: 'Planifie les évolutions d\'architecture du site : analyse du graphe de dépendances, identification des composants à refactorer, recommandations de patterns, estimation d\'effort. ADR (Architecture Decision Records) automatisés.',
    capabilities: ['Dep graph analysis', 'Refactor targets', 'Pattern recommend', 'Effort estimation', 'ADR generation', 'Impact scoring'],
    success_rate: 72.8,
    tasks_completed: 85,
    auto_enabled: false,
    icon: 'ri-organization-chart',
    color: '#8B3040',
    last_execution: '2026-06-08T16:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'ADRs générés', current: '85', target: '200', icon: 'ri-file-list-line' },
      { label: 'Refactos identifiés', current: '42', target: 'N/A', icon: 'ri-tools-line' },
      { label: 'Précision effort', current: '±18%', target: '±10%', icon: 'ri-focus-2-line' },
    ],
  },
  {
    id: 'upgrade-feature',
    name: 'Feature Flag & Rollout Manager',
    category: 'site-upgrades',
    tech_stack: ['Feature Flags', 'A/B Testing', 'Canary Deploy', 'Supabase'],
    status: 'deployed',
    version: 'v2.0.1',
    description: 'Gère les feature flags et les déploiements progressifs : activation par pourcentage, A/B testing, canary releases, rollback instantané par flag. Intégré au pipeline CI/CD Netlify.',
    capabilities: ['Feature flags', '% rollout', 'A/B testing', 'Canary deploy', 'Instant rollback', 'Audience targeting'],
    success_rate: 90.2,
    tasks_completed: 1240,
    auto_enabled: true,
    icon: 'ri-toggle-line',
    color: '#8B3040',
    last_execution: '2026-06-15T08:30:00Z',
    priority: 'high',
    kpis: [
      { label: 'Flags actifs', current: '1,240', target: '2,000', icon: 'ri-flag-line' },
      { label: 'Rollouts réussis', current: '96.8%', target: '99%', icon: 'ri-check-double-line' },
      { label: 'Rollback < 30s', current: '100%', target: '100%', icon: 'ri-timer-flash-line' },
    ],
  },
];

export const WEB_OPS_AUTOMATES_KPIS = {
  total_agents: 12,
  deployed: 7,
  partial: 5,
  auto_enabled: 8,
  total_tasks: 20385,
  avg_success_rate: 87.6,
  critical_agents: 3,
  high_priority: 8,
  categories: 3,
  resources_optimized: 10560,
  updates_applied: 5070,
  upgrades_executed: 1860,
};