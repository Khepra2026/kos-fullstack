// ============================================================
// KOS COMMANDEMENT OPÉRATIONNEL UNIFIÉ™
// Cockpit Big Four — 11 familles d'automates, 261+ agents
// Cadre opérationnel & KPIs niveau cabinet international
// ============================================================

export interface KOSAutomateFamily {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string | null;
  table_name: string;
  description: string;
  agents_total: number;
  deployed: number;
  partial: number;
  critical: number;
  auto_enabled: number;
  success_rate: number;
  tasks_completed: number;
  revenue_influenced: number;
  domain: 'front-office' | 'production' | 'qualite' | 'croissance' | 'technique';
  kpis: { label: string; value: string; icon: string }[];
}

export interface KOSUnifiedGlobalKPIs {
  total_families: number;
  total_agents: number;
  deployed: number;
  partial: number;
  critical: number;
  auto_enabled: number;
  total_tasks: number;
  avg_success_rate: number;
  total_revenue_influenced: number;
  total_leads_generated: number;
  total_deals_closed: number;
  total_campaigns: number;
  total_audits: number;
  total_quality_score: number;
  total_certifications: number;
  active_families: number;
  fully_deployed_families: number;
  languages: number;
  avg_uptime: number;
}

export interface KOSOperationalChain {
  id: string;
  phase: string;
  name: string;
  icon: string;
  color: string;
  families: string[];
  description: string;
}

export const KOS_UNIFIED_FAMILIES: KOSAutomateFamily[] = [
  {
    id: 'referents-metiers',
    name: 'Référents Métiers',
    icon: 'ri-robot-line',
    color: '#5B8C2A',
    route: '/kos-referents-metiers-automates',
    table_name: 'kos_referents_metiers_automates',
    description: 'Agents conversationnels qui accueillent, diagnostiquent, conseillent et closent les deals avec les visiteurs. Force de vente automatisée 24/7.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 10,
    auto_enabled: 19,
    success_rate: 88.1,
    tasks_completed: 128440,
    revenue_influenced: 14250000,
    domain: 'front-office',
    kpis: [
      { label: 'Interactions', value: '168K', icon: 'ri-chat-3-line' },
      { label: 'Deals closés', value: '19.3K', icon: 'ri-hand-coin-line' },
      { label: 'Taux conversion', value: '12.4%', icon: 'ri-line-chart-line' },
    ],
  },
  {
    id: 'commercial-marketing',
    name: 'Commercial & Marketing',
    icon: 'ri-rocket-line',
    color: '#EA580C',
    route: '/kos-commercial-marketing-automates',
    table_name: 'kos_commercial_marketing_automates',
    description: 'Force de frappe commerciale : prospection, inbound, campagnes, branding, partenariats, événements, sales enablement et analytics.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 10,
    auto_enabled: 18,
    success_rate: 87.2,
    tasks_completed: 132400,
    revenue_influenced: 34840000,
    domain: 'croissance',
    kpis: [
      { label: 'Leads générés', value: '72K', icon: 'ri-user-search-line' },
      { label: 'Campagnes', value: '3,904', icon: 'ri-rocket-line' },
      { label: 'ROI moyen', value: '14.2x', icon: 'ri-arrow-up-line' },
    ],
  },
  {
    id: 'organisation-qualite',
    name: 'Organisation & Qualité',
    icon: 'ri-shield-check-line',
    color: '#6366F1',
    route: '/kos-organisation-qualite-automates',
    table_name: 'kos_organisation_qualite_automates',
    description: 'Gardiens de l\'excellence : processus, TQM, audits qualité, contrôle livrables, amélioration continue, certifications ISO.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 10,
    auto_enabled: 16,
    success_rate: 89.8,
    tasks_completed: 157890,
    revenue_influenced: 0,
    domain: 'qualite',
    kpis: [
      { label: 'Audits', value: '40.9K', icon: 'ri-search-eye-line' },
      { label: 'Score qualité', value: '93.2/100', icon: 'ri-medal-line' },
      { label: 'Certifications', value: '9', icon: 'ri-award-line' },
    ],
  },
  {
    id: 'blog-writing',
    name: 'Blog Writing',
    icon: 'ri-article-line',
    color: '#0D7B5F',
    route: '/kos-blog-writing-automates',
    table_name: 'kos_blog_writing_automates',
    description: 'Rédaction automatisée d\'articles, éditoriaux, white papers et contenus premium avec ton Big Four et expertise réglementaire UEMOA/CEMAC.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 8,
    auto_enabled: 20,
    success_rate: 91.4,
    tasks_completed: 98400,
    revenue_influenced: 8200000,
    domain: 'production',
    kpis: [
      { label: 'Articles/mois', value: '84', icon: 'ri-file-text-line' },
      { label: 'Trafic SEO', value: '+142%', icon: 'ri-line-chart-line' },
      { label: 'Featured snippets', value: '184', icon: 'ri-star-line' },
    ],
  },
  {
    id: 'fullstack-dev',
    name: 'Fullstack Dev',
    icon: 'ri-code-s-slash-line',
    color: '#BE123C',
    route: '/kos-fullstack-dev-automates',
    table_name: 'kos_dev_automates',
    description: 'Développement fullstack automatisé : frontend, backend, APIs, bases de données, déploiement continu. L\'usine logicielle du KOS.',
    agents_total: 33,
    deployed: 22,
    partial: 11,
    critical: 12,
    auto_enabled: 28,
    success_rate: 86.4,
    tasks_completed: 242000,
    revenue_influenced: 0,
    domain: 'technique',
    kpis: [
      { label: 'Deploys/jour', value: '24', icon: 'ri-rocket-2-line' },
      { label: 'PRs merged', value: '18.4K', icon: 'ri-git-pull-request-line' },
      { label: 'Uptime', value: '99.97%', icon: 'ri-server-line' },
    ],
  },
  {
    id: 'web-ops',
    name: 'Web Operations',
    icon: 'ri-global-line',
    color: '#14B8A6',
    route: '/kos-web-ops-automates',
    table_name: 'kos_web_ops_automates',
    description: 'Opérations web automatisées : CDN, caching, monitoring, sécurité réseau, DNS, certificats, optimisation des performances.',
    agents_total: 12,
    deployed: 8,
    partial: 4,
    critical: 6,
    auto_enabled: 10,
    success_rate: 92.8,
    tasks_completed: 86400,
    revenue_influenced: 0,
    domain: 'technique',
    kpis: [
      { label: 'Performance Score', value: '98/100', icon: 'ri-speed-up-line' },
      { label: 'CDN hit ratio', value: '97.4%', icon: 'ri-cloud-line' },
      { label: 'Incidents/an', value: '3', icon: 'ri-alert-line' },
    ],
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    icon: 'ri-shield-keyhole-line',
    color: '#DC2626',
    route: '/kos-cyber-security-automates',
    table_name: 'kos_cyber_security_automates',
    description: 'Sécurité automatisée : scans OWASP, pentesting, détection d\'intrusion, gestion des vulnérabilités, conformité sécurité, SOC 24/7.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 14,
    auto_enabled: 22,
    success_rate: 90.2,
    tasks_completed: 112400,
    revenue_influenced: 0,
    domain: 'technique',
    kpis: [
      { label: 'Vulns corrigées', value: '12.4K', icon: 'ri-bug-line' },
      { label: 'Score sécurité', value: 'A+', icon: 'ri-shield-check-line' },
      { label: 'Menaces bloquées', value: '842K', icon: 'ri-shield-flash-line' },
    ],
  },
  {
    id: 'think-tank',
    name: 'Think Tank',
    icon: 'ri-lightbulb-flash-line',
    color: '#8B5CF6',
    route: '/kos-think-tank-automates',
    table_name: 'kos_think_tank_automates',
    description: 'Recherche et production intellectuelle : études sectorielles, notes de conjoncture, rapports prospectifs, position papers pour le marché UEMOA/CEMAC.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 8,
    auto_enabled: 18,
    success_rate: 89.6,
    tasks_completed: 68400,
    revenue_influenced: 5600000,
    domain: 'production',
    kpis: [
      { label: 'Publications', value: '48', icon: 'ri-book-open-line' },
      { label: 'Citations', value: '+320%', icon: 'ri-quote-text' },
      { label: 'Pays couverts', value: '16', icon: 'ri-earth-line' },
    ],
  },
  {
    id: 'regulatory-compliance',
    name: 'Conformité Réglementaire',
    icon: 'ri-scales-3-line',
    color: '#EC4899',
    route: '/kos-regulatory-compliance-automates',
    table_name: 'kos_regulatory_compliance_automates',
    description: 'Veille et conformité réglementaire automatisée : BCEAO, COBAC, OHADA, GAFI, ISO. Alertes, analyses d\'impact, plans de mise en conformité.',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    critical: 14,
    auto_enabled: 22,
    success_rate: 91.8,
    tasks_completed: 98400,
    revenue_influenced: 4200000,
    domain: 'qualite',
    kpis: [
      { label: 'Textes suivis', value: '842', icon: 'ri-book-2-line' },
      { label: 'Alertes/mois', value: '124', icon: 'ri-notification-line' },
      { label: 'Conformité', value: '97.2%', icon: 'ri-check-double-line' },
    ],
  },
  {
    id: 'community-manager',
    name: 'Community Manager',
    icon: 'ri-share-forward-line',
    color: '#F59E0B',
    route: null,
    table_name: 'kos_community_manager_automates',
    description: 'Animation des communautés sociales : LinkedIn, Twitter, Facebook. Création de contenu, engagement, modération, croissance d\'audience.',
    agents_total: 24,
    deployed: 12,
    partial: 12,
    critical: 8,
    auto_enabled: 16,
    success_rate: 84.6,
    tasks_completed: 68400,
    revenue_influenced: 1800000,
    domain: 'croissance',
    kpis: [
      { label: 'Posts/mois', value: '248', icon: 'ri-chat-1-line' },
      { label: 'Engagement', value: '4.8%', icon: 'ri-heart-line' },
      { label: 'Followers', value: '48.2K', icon: 'ri-user-add-line' },
    ],
  },
  {
    id: 'designer-infographe',
    name: 'Designer Infographe',
    icon: 'ri-brush-line',
    color: '#0EA5E9',
    route: null,
    table_name: 'kos_designer_infographe_automates',
    description: 'Design graphique et infographie automatisée : identité visuelle, rapports, présentations, datavisualisation, supports marketing.',
    agents_total: 24,
    deployed: 12,
    partial: 12,
    critical: 6,
    auto_enabled: 14,
    success_rate: 86.8,
    tasks_completed: 52400,
    revenue_influenced: 0,
    domain: 'production',
    kpis: [
      { label: 'Assets/mois', value: '640', icon: 'ri-image-line' },
      { label: 'Templates', value: '284', icon: 'ri-layout-line' },
      { label: 'Consistance marque', value: '96.4%', icon: 'ri-palette-line' },
    ],
  },
];

export const KOS_UNIFIED_GLOBAL_KPIS: KOSUnifiedGlobalKPIs = {
  total_families: 11,
  total_agents: 261,
  deployed: 166,
  partial: 95,
  critical: 106,
  auto_enabled: 203,
  total_tasks: 1255430,
  avg_success_rate: 88.9,
  total_revenue_influenced: 69470000,
  total_leads_generated: 72000,
  total_deals_closed: 19280,
  total_campaigns: 3904,
  total_audits: 40942,
  total_quality_score: 93,
  total_certifications: 9,
  active_families: 11,
  fully_deployed_families: 0,
  languages: 4,
  avg_uptime: 99.94,
};

export const KOS_OPERATIONAL_CHAIN: KOSOperationalChain[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    name: 'Acquisition & Attraction',
    icon: 'ri-radar-line',
    color: '#EA580C',
    families: ['commercial-marketing', 'community-manager', 'blog-writing'],
    description: 'Prospection, marketing digital, content marketing, réseaux sociaux. Les automates trouvent les clients, les attirent et génèrent du pipe qualifié.',
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    name: 'Conversion & Closing',
    icon: 'ri-hand-coin-line',
    color: '#5B8C2A',
    families: ['referents-metiers'],
    description: 'Accueil, diagnostic, expertise sectorielle, démonstration, gestion des objections, closing et contractualisation. La chaîne de vente automatisée.',
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    name: 'Production & Delivery',
    icon: 'ri-briefcase-line',
    color: '#BE123C',
    families: ['fullstack-dev', 'think-tank', 'designer-infographe', 'blog-writing'],
    description: 'Développement, recherche, design, rédaction. Les automates produisent les livrables avec une qualité constante.',
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    name: 'Qualité & Conformité',
    icon: 'ri-shield-check-line',
    color: '#6366F1',
    families: ['organisation-qualite', 'regulatory-compliance'],
    description: 'Audits, TQM, contrôle qualité, conformité réglementaire, certifications. L\'excellence opérationnelle systématisée.',
  },
  {
    id: 'phase-5',
    phase: 'Phase 5',
    name: 'Infrastructure & Sécurité',
    icon: 'ri-server-line',
    color: '#14B8A6',
    families: ['web-ops', 'cyber-security'],
    description: 'Ops, performance, sécurité, monitoring. L\'infrastructure qui garantit la disponibilité, la rapidité et la sécurité.',
  },
];

export const KOS_BIGFOUR_KPI_BENCHMARKS = {
  revenue_per_agent: 266000,
  tasks_per_agent: 4810,
  success_rate_target: 95,
  deployment_target: 100,
  auto_enablement_target: 100,
  family_readiness: [
    { family: 'referents-metiers', readiness: 67, label: 'Opérationnel' },
    { family: 'commercial-marketing', readiness: 67, label: 'Opérationnel' },
    { family: 'organisation-qualite', readiness: 67, label: 'Opérationnel' },
    { family: 'blog-writing', readiness: 67, label: 'Opérationnel' },
    { family: 'fullstack-dev', readiness: 67, label: 'Opérationnel' },
    { family: 'web-ops', readiness: 67, label: 'Opérationnel' },
    { family: 'cyber-security', readiness: 67, label: 'Opérationnel' },
    { family: 'think-tank', readiness: 67, label: 'Opérationnel' },
    { family: 'regulatory-compliance', readiness: 67, label: 'Opérationnel' },
    { family: 'community-manager', readiness: 50, label: 'Partiel' },
    { family: 'designer-infographe', readiness: 50, label: 'Partiel' },
  ],
};