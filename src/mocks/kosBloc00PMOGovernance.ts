// KOS Bloc 00 — PMO & Gouvernance KOS™
// Master Plan Big Four 2026-2028 — Phase 1 Fondations

export interface PMOProcess {
  id: string;
  nom: string;
  categorie: 'gouvernance' | 'qualite' | 'kpi' | 'catalogue';
  statut: 'Terminé' | 'En cours' | 'Planifié';
  maturite: number;
  responsable: string;
  documents: string[];
  derniere_maj: string;
  description: string;
}

export interface PMOAgent {
  id: string;
  nom: string;
  type: 'agent' | 'automate';
  statut: 'Actif' | 'En déploiement';
  modules: number;
  kpis_traites: number;
  derniere_execution: string;
  icon: string;
}

export interface PMOKPI {
  id: string;
  nom: string;
  categorie: string;
  valeur: string;
  cible: string;
  tendance: 'up' | 'stable' | 'down';
  icon: string;
}

export interface PMODashboardData {
  processus: PMOProcess[];
  agents: PMOAgent[];
  kpis: PMOKPI[];
  globalMetrics: {
    processus_documentes: string;
    agents_cartographies: string;
    workflows_audites: string;
    charte_enterprise: string;
    catalogue_agents: string;
    catalogue_automates: string;
    matrice_raci: string;
    kpi_strategiques: string;
    tableau_bord_executif: string;
    score_gouvernance: number;
    certification: string;
  };
}

export const PMO_PROCESSUS: PMOProcess[] = [
  {
    id: 'proc-001',
    nom: 'Charte KOS Enterprise',
    categorie: 'gouvernance',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Managing Partner Office',
    documents: ['KHEPRA_CONSTITUTION.md', 'KOS_ENTERPRISE_CHARTER.md', 'GOVERNANCE_FLOW_v2.0.md'],
    derniere_maj: '2026-06-18',
    description: 'Document fondateur définissant la vision, la mission, les principes de gouvernance et l\'architecture décisionnelle de l\'écosystème KOS. Aligné sur les standards Deloitte, PwC, EY, KPMG.',
  },
  {
    id: 'proc-002',
    nom: 'Catalogue des Agents IA',
    categorie: 'catalogue',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'KOS PMO Engine™',
    documents: ['KOS_AGENT_CATALOG.md', 'AGENT_REGISTRY.md', 'AI_GOVERNANCE.md'],
    derniere_maj: '2026-06-17',
    description: 'Registre exhaustif des 75 agents IA KOS : type, domaine, compétences, KPIs, état de déploiement, dépendances et matrice de couverture fonctionnelle.',
  },
  {
    id: 'proc-003',
    nom: 'Catalogue des Automates',
    categorie: 'catalogue',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'KOS Automation Factory™',
    documents: ['AUTOMATON_CATALOG.md', 'EDGE_FUNCTIONS_REGISTRY.md', 'CRON_JOBS_CATALOG.md'],
    derniere_maj: '2026-06-16',
    description: 'Inventaire complet des 98 edge functions, 32 cron jobs et 248 tables Supabase, avec mapping fonctionnel, SLAs et dépendances techniques.',
  },
  {
    id: 'proc-004',
    nom: 'Matrice RACI',
    categorie: 'gouvernance',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Enterprise Governance Command',
    documents: ['RACI_MATRIX_KOS.md', 'RESPONSIBILITY_CHART.md'],
    derniere_maj: '2026-06-15',
    description: 'Matrice RACI couvrant 376 modules, 75 agents et 13 blocs du Master Plan. Responsabilités clairement attribuées pour chaque activité critique.',
  },
  {
    id: 'proc-005',
    nom: 'KPI Stratégiques',
    categorie: 'kpi',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Enterprise KPI Tower',
    documents: ['KPI_DICTIONARY.md', 'PERFORMANCE_DASHBOARD.md'],
    derniere_maj: '2026-06-14',
    description: 'Dictionnaire des 280 KPIs couvrant 15 domaines. Chaque KPI documenté avec définition, méthode de calcul, source de données, fréquence et seuils d\'alerte.',
  },
  {
    id: 'proc-006',
    nom: 'Tableau de Bord Exécutif',
    categorie: 'kpi',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Executive Command Center',
    documents: ['EXECUTIVE_DASHBOARD.md', 'KPI_TOWER.md'],
    derniere_maj: '2026-06-18',
    description: 'Tableau de bord exécutif unifié : score global 10.0/10, 0 alerte, 67 hubs, 98 edge functions, 248 tables, 75 agents. Certification AAAA Big Four Supreme.',
  },
  {
    id: 'proc-007',
    nom: 'Audit des Workflows',
    categorie: 'qualite',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Quality Excellence Command',
    documents: ['WORKFLOW_AUDIT.md', 'QUALITY_GATES.md'],
    derniere_maj: '2026-06-13',
    description: 'Audit complet des 376 workflows KOS : vérification des gates qualité, contrôles anti-hallucination, validation croisée multi-IA, traçabilité des décisions.',
  },
  {
    id: 'proc-008',
    nom: 'Politique de Sécurité Enterprise',
    categorie: 'gouvernance',
    statut: 'Terminé',
    maturite: 100,
    responsable: 'Enterprise Security Engine',
    documents: ['SECURITY_POLICY.md', 'ISO27001_FRAMEWORK.md', 'ACCESS_CONTROL.md'],
    derniere_maj: '2026-06-12',
    description: 'Politique globale de sécurité alignée ISO 27001, NIST CSF et exigences BCEAO/COBAC. RLS sur 100% des tables, JWT verification sur 100% des edge functions.',
  },
  {
    id: 'proc-009',
    nom: 'Comité de Gouvernance IA',
    categorie: 'gouvernance',
    statut: 'En cours',
    maturite: 92,
    responsable: 'AI Governance Council',
    documents: ['AI_GOVERNANCE_COUNCIL.md', 'ETHICS_BOARD.md', 'AI_REGISTRY.md'],
    derniere_maj: '2026-06-10',
    description: 'Conseil de gouvernance IA : revue trimestrielle des performances agents, validation éthique, contrôle des biais, suivi des incidents et amélioration continue.',
  },
  {
    id: 'proc-010',
    nom: 'Plan de Continuité d\'Activité',
    categorie: 'qualite',
    statut: 'En cours',
    maturite: 88,
    responsable: 'Enterprise Security Engine',
    documents: ['BCP_KOS.md', 'DISASTER_RECOVERY.md', 'RTO_RPO_MATRIX.md'],
    derniere_maj: '2026-06-08',
    description: 'PCA complet : RTO < 4h, RPO < 1h, backup automatique quotidien, procédures de rollback documentées, tests trimestriels de reprise.',
  },
];

export const PMO_AGENTS: PMOAgent[] = [
  {
    id: 'agent-pmo-001',
    nom: 'KOS PMO Engine™',
    type: 'agent',
    statut: 'Actif',
    modules: 13,
    kpis_traites: 42,
    derniere_execution: '2026-06-18 08:00 UTC',
    icon: 'ri-government-line',
  },
  {
    id: 'agent-pmo-002',
    nom: 'KOS Quality Controller™',
    type: 'agent',
    statut: 'Actif',
    modules: 8,
    kpis_traites: 28,
    derniere_execution: '2026-06-18 06:00 UTC',
    icon: 'ri-shield-check-line',
  },
  {
    id: 'agent-pmo-003',
    nom: 'KOS Executive Dashboard™',
    type: 'agent',
    statut: 'Actif',
    modules: 6,
    kpis_traites: 15,
    derniere_execution: '2026-06-18 09:00 UTC',
    icon: 'ri-dashboard-3-line',
  },
  {
    id: 'agent-pmo-004',
    nom: 'KOS Audit Trail Engine™',
    type: 'automate',
    statut: 'Actif',
    modules: 4,
    kpis_traites: 12,
    derniere_execution: '2026-06-18 07:30 UTC',
    icon: 'ri-git-branch-line',
  },
  {
    id: 'agent-pmo-005',
    nom: 'KOS Compliance Monitor™',
    type: 'automate',
    statut: 'En déploiement',
    modules: 3,
    kpis_traites: 8,
    derniere_execution: '2026-06-17 22:00 UTC',
    icon: 'ri-scales-3-line',
  },
];

export const PMO_KPIS: PMOKPI[] = [
  { id: 'kpi-pmo-01', nom: 'Processus Documentés', categorie: 'Gouvernance', valeur: '100%', cible: '100%', tendance: 'stable', icon: 'ri-file-text-line' },
  { id: 'kpi-pmo-02', nom: 'Agents Cartographiés', categorie: 'Catalogue', valeur: '75/75', cible: '100%', tendance: 'stable', icon: 'ri-team-line' },
  { id: 'kpi-pmo-03', nom: 'Workflows Audités', categorie: 'Qualité', valeur: '100%', cible: '100%', tendance: 'stable', icon: 'ri-git-branch-line' },
  { id: 'kpi-pmo-04', nom: 'Score Gouvernance', categorie: 'Gouvernance', valeur: '10.0/10', cible: '10.0/10', tendance: 'stable', icon: 'ri-medal-line' },
  { id: 'kpi-pmo-05', nom: 'RLS Actif', categorie: 'Sécurité', valeur: '248/248', cible: '100%', tendance: 'stable', icon: 'ri-lock-line' },
  { id: 'kpi-pmo-06', nom: 'Edge Functions JWT', categorie: 'Sécurité', valeur: '98/98', cible: '100%', tendance: 'stable', icon: 'ri-shield-keyhole-line' },
  { id: 'kpi-pmo-07', nom: 'Modules Opérationnels', categorie: 'Déploiement', valeur: '389/389', cible: '100%', tendance: 'stable', icon: 'ri-cpu-line' },
  { id: 'kpi-pmo-08', nom: 'Alertes Actives', categorie: 'Monitoring', valeur: '0', cible: '0', tendance: 'stable', icon: 'ri-notification-3-line' },
  { id: 'kpi-pmo-09', nom: 'Uptime 30j', categorie: 'Infrastructure', valeur: '99.99%', cible: '99.95%', tendance: 'up', icon: 'ri-server-line' },
];

export const PMO_GLOBAL_METRICS = {
  processus_documentes: '10/10',
  agents_cartographies: '75/75',
  workflows_audites: '376/376',
  charte_enterprise: 'v6.0 — 18 Juin 2026',
  catalogue_agents: '75 agents — 100% documentés',
  catalogue_automates: '98 edge functions + 32 cron jobs',
  matrice_raci: '100% modules couverts',
  kpi_strategiques: '280 KPIs — 15 domaines',
  tableau_bord_executif: '67 hubs — Score 10.0/10',
  score_gouvernance: 10.0,
  certification: 'AAAA — Big Four Supreme 100% — PMO KOS Enterprise',
};





