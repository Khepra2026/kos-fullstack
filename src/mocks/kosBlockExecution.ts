// ============================================================
// KOS BLOC EXECUTION SYSTEM™ — Exécution en Bloc 100% KPO
// 13 familles, 333 agents, 99 gaps, déploiement massif
// Bouton unique d'exécution totale → standard Big Four
// ============================================================

export interface blockTask {
  id: string;
  agent_id: string;
  agent_name: string;
  family_id: string;
  family_name: string;
  task_type: 'deploy' | 'auto_enable' | 'validate' | 'optimize' | 'sync';
  task_label: string;
  current_status: 'partial' | 'pending' | 'disabled';
  target_status: 'deployed' | 'enabled' | 'validated';
  estimated_duration_seconds: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
  kpi_impact: { dimension: string; before: string; after: string }[];
}

export interface blockFamily {
  id: string;
  name: string;
  icon: string;
  color: string;
  route: string | null;
  domain: string;
  agents_total: number;
  deployed: number;
  partial: number;
  pending: number;
  auto_enabled: number;
  tasks_pending: number;
  estimated_duration_minutes: number;
  priority_order: number;
  kpo_before: number;
  kpo_target: number;
  blockers: string[];
}

export interface blockExecutionGlobal {
  total_families: number;
  total_agents: number;
  deployed_before: number;
  deployed_target: number;
  gaps_total: number;
  tasks_total: number;
  total_estimated_minutes: number;
  execution_phases: number;
  kpo_before: number;
  kpo_target: number;
  revenue_before: number;
  revenue_target: number;
}

export interface blockExecutionPhase {
  phase_number: number;
  label: string;
  icon: string;
  families: string[];
  task_count: number;
  agent_count: number;
  duration_minutes: number;
  kpo_after_phase: number;
  description: string;
}

export interface blockExecutionLog {
  id: string;
  timestamp: string;
  agent_name: string;
  family_name: string;
  action: string;
  status: 'completed' | 'in_progress' | 'queued' | 'failed';
  detail: string;
}

export const KOS_BLOCK_FAMILIES: blockFamily[] = [
  {
    id: 'fullstack-dev',
    name: 'Fullstack Dev',
    icon: 'ri-code-s-slash-line',
    color: '#BE123C',
    route: '/kos-fullstack-dev-automates',
    domain: 'technique',
    agents_total: 33,
    deployed: 19,
    partial: 12,
    pending: 2,
    auto_enabled: 19,
    tasks_pending: 14,
    estimated_duration_minutes: 42,
    priority_order: 1,
    kpo_before: 58,
    kpo_target: 100,
    blockers: ['Pipeline CI/CD instable', '5 agents sans tests validation', 'Documentation API lacunaire', '2 agents en attente de credentials'],
  },
  {
    id: 'llm-experts',
    name: 'Experts LLM',
    icon: 'ri-brain-line',
    color: '#F59E0B',
    route: '/kos-llm-experts-automates',
    domain: 'intelligence',
    agents_total: 48,
    deployed: 33,
    partial: 15,
    pending: 0,
    auto_enabled: 33,
    tasks_pending: 15,
    estimated_duration_minutes: 36,
    priority_order: 2,
    kpo_before: 69,
    kpo_target: 100,
    blockers: ['4 agents en fine-tuning GPT-5', 'Cache sémantique non déployé', '2 agents coûts tokens excessifs'],
  },
  {
    id: 'referents-metiers',
    name: 'Référents Métiers',
    icon: 'ri-robot-line',
    color: '#5B8C2A',
    route: '/kos-referents-metiers-automates',
    domain: 'front-office',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 17,
    tasks_pending: 8,
    estimated_duration_minutes: 24,
    priority_order: 3,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['2 agents en validation métier', 'Scripts conversationnels à charger'],
  },
  {
    id: 'commercial-marketing',
    name: 'Commercial & Marketing',
    icon: 'ri-rocket-line',
    color: '#EA580C',
    route: '/kos-commercial-marketing-automates',
    domain: 'croissance',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 16,
    tasks_pending: 8,
    estimated_duration_minutes: 24,
    priority_order: 4,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['Campagnes Q3 en attente', 'Intégration CRM incomplète'],
  },
  {
    id: 'organisation-qualite',
    name: 'Organisation & Qualité',
    icon: 'ri-shield-check-line',
    color: '#6366F1',
    route: '/kos-organisation-qualite-automates',
    domain: 'qualite',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 16,
    tasks_pending: 8,
    estimated_duration_minutes: 20,
    priority_order: 5,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['ISO 9001:2026 update pending', 'Processus BPMN à valider'],
  },
  {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    icon: 'ri-bar-chart-box-line',
    color: '#059669',
    route: null,
    domain: 'intelligence',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 16,
    tasks_pending: 8,
    estimated_duration_minutes: 28,
    priority_order: 6,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['Dashboard UEMOA non finalisé', 'Modèle stress-test à valider', 'Connexion flux BCEAO'],
  },
  {
    id: 'community-manager',
    name: 'Community Manager',
    icon: 'ri-share-forward-line',
    color: '#F59E0B',
    route: '/kos-community-manager-automates',
    domain: 'croissance',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 17,
    tasks_pending: 7,
    estimated_duration_minutes: 18,
    priority_order: 7,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['Intégration TikTok API', 'Calendrier Q3 en validation'],
  },
  {
    id: 'designer-infographe',
    name: 'Designer Infographe',
    icon: 'ri-brush-line',
    color: '#0EA5E9',
    route: '/kos-designer-infographe-automates',
    domain: 'creation',
    agents_total: 24,
    deployed: 16,
    partial: 8,
    pending: 0,
    auto_enabled: 16,
    tasks_pending: 8,
    estimated_duration_minutes: 20,
    priority_order: 8,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['Intégration Figma API', 'Templates corporate incomplets'],
  },
  {
    id: 'think-tank',
    name: 'Think Tank',
    icon: 'ri-lightbulb-flash-line',
    color: '#8B5CF6',
    route: '/kos-think-tank-automates',
    domain: 'production',
    agents_total: 24,
    deployed: 18,
    partial: 6,
    pending: 0,
    auto_enabled: 18,
    tasks_pending: 6,
    estimated_duration_minutes: 16,
    priority_order: 9,
    kpo_before: 75,
    kpo_target: 100,
    blockers: ['Étude UEMOA en relecture', '2 agents datasets incomplets'],
  },
  {
    id: 'blog-writing',
    name: 'Blog Writing',
    icon: 'ri-article-line',
    color: '#0D7B5F',
    route: '/kos-blog-writing-automates',
    domain: 'production',
    agents_total: 24,
    deployed: 19,
    partial: 5,
    pending: 0,
    auto_enabled: 19,
    tasks_pending: 5,
    estimated_duration_minutes: 14,
    priority_order: 10,
    kpo_before: 79,
    kpo_target: 100,
    blockers: ['Templates contenu à charger', '1 agent SEO prompt tuning'],
  },
  {
    id: 'regulatory-compliance',
    name: 'Conformité Réglementaire',
    icon: 'ri-scales-3-line',
    color: '#EC4899',
    route: '/kos-regulatory-compliance-automates',
    domain: 'qualite',
    agents_total: 24,
    deployed: 19,
    partial: 5,
    pending: 0,
    auto_enabled: 19,
    tasks_pending: 5,
    estimated_duration_minutes: 12,
    priority_order: 11,
    kpo_before: 79,
    kpo_target: 100,
    blockers: ['Veille COBAC à activer', 'Alertes GAFI en attente'],
  },
  {
    id: 'cyber-security',
    name: 'Cyber Security',
    icon: 'ri-shield-keyhole-line',
    color: '#DC2626',
    route: '/kos-cyber-security-automates',
    domain: 'technique',
    agents_total: 24,
    deployed: 20,
    partial: 4,
    pending: 0,
    auto_enabled: 20,
    tasks_pending: 4,
    estimated_duration_minutes: 10,
    priority_order: 12,
    kpo_before: 83,
    kpo_target: 100,
    blockers: ['OWASP Top 10 2026 signatures', 'Pentest validation finale'],
  },
  {
    id: 'web-ops',
    name: 'Web Operations',
    icon: 'ri-global-line',
    color: '#14B8A6',
    route: '/kos-web-ops-automates',
    domain: 'technique',
    agents_total: 12,
    deployed: 8,
    partial: 4,
    pending: 0,
    auto_enabled: 8,
    tasks_pending: 4,
    estimated_duration_minutes: 10,
    priority_order: 13,
    kpo_before: 67,
    kpo_target: 100,
    blockers: ['CDN multi-région upgrade', 'DNS failover configuration'],
  },
];

export const KOS_BLOCK_EXECUTION_GLOBAL: blockExecutionGlobal = {
  total_families: 13,
  total_agents: 333,
  deployed_before: 232,
  deployed_target: 333,
  gaps_total: 99,
  tasks_total: 100,
  total_estimated_minutes: 274,
  execution_phases: 5,
  kpo_before: 69,
  kpo_target: 100,
  revenue_before: 83500000,
  revenue_target: 112000000,
};

export const KOS_BLOCK_EXECUTION_PHASES: blockExecutionPhase[] = [
  {
    phase_number: 1,
    label: 'Préparation & Verification',
    icon: 'ri-check-double-line',
    families: ['fullstack-dev', 'llm-experts', 'business-intelligence'],
    task_count: 37,
    agent_count: 37,
    duration_minutes: 62,
    kpo_after_phase: 75,
    description: 'Vérification des prérequis techniques, credentials, pipelines CI/CD, connexions API. Activation des agents critiques prioritaires.',
  },
  {
    phase_number: 2,
    label: 'Déploiement Front Office & Croissance',
    icon: 'ri-rocket-2-line',
    families: ['referents-metiers', 'commercial-marketing', 'community-manager'],
    task_count: 23,
    agent_count: 26,
    duration_minutes: 56,
    kpo_after_phase: 82,
    description: 'Déploiement des agents de contact client : commerciaux, référents métiers, community managers. Activation des boucles de conversion.',
  },
  {
    phase_number: 3,
    label: 'Déploiement Production & Qualité',
    icon: 'ri-award-line',
    families: ['organisation-qualite', 'think-tank', 'blog-writing', 'regulatory-compliance', 'designer-infographe'],
    task_count: 33,
    agent_count: 32,
    duration_minutes: 82,
    kpo_after_phase: 92,
    description: 'Déploiement des agents de production intellectuelle et de contrôle qualité. Certification ISO, conformité réglementaire, création de contenu.',
  },
  {
    phase_number: 4,
    label: 'Déploiement Infrastructure & Sécurité',
    icon: 'ri-shield-flash-line',
    families: ['cyber-security', 'web-ops'],
    task_count: 8,
    agent_count: 8,
    duration_minutes: 20,
    kpo_after_phase: 97,
    description: 'Sécurisation finale : OWASP, CDN multi-région, DNS failover, pentest validation. Dernière couche infrastructure.',
  },
  {
    phase_number: 5,
    label: 'Validation Big Four & Go-Live',
    icon: 'ri-flag-line',
    families: ['fullstack-dev', 'llm-experts', 'referents-metiers', 'commercial-marketing', 'organisation-qualite', 'business-intelligence', 'community-manager', 'designer-infographe', 'think-tank', 'blog-writing', 'regulatory-compliance', 'cyber-security', 'web-ops'],
    task_count: 13,
    agent_count: 0,
    duration_minutes: 54,
    kpo_after_phase: 100,
    description: 'Cérémonie de validation croisée Big Four. Vérification des 6 dimensions KPO. Certification 100% et go-live officiel du KOS.',
  },
];

export const KOS_BLOCK_EXECUTION_LOGS: blockExecutionLog[] = [];





