// ============================================================================
// KOS AUTONOMOUS GROWTH ORCHESTRATOR™
// 9 Agents Manquants activés : COO, CMO, Social Media, LLMO x5, Account Executive
// ============================================================================

export interface GrowthAgent {
  id: string;
  code: string;
  name: string;
  role: string;
  category: 'leadership' | 'marketing' | 'social' | 'llm' | 'sales';
  icon: string;
  color: string;
  status: 'active' | 'initializing' | 'standby';
  autonomyLevel: number; // /100
  tasksCompleted: number;
  tasksActive: number;
  nextAction: string;
  kpis: { label: string; value: string; trend: 'up' | 'down' | 'stable'; unit: string }[];
  capabilities: string[];
  lastActive: string;
  activationDate: string;
}

export const GROWTH_AGENTS: GrowthAgent[] = [
  {
    id: 'agent-coo',
    code: 'COO-01',
    name: 'KOS Chief Operating Officer Agent',
    role: 'Orchestration opérationnelle globale, pilotage exécution, coordination inter-agents, reporting COMEX',
    category: 'leadership',
    icon: 'ri-briefcase-4-line',
    color: '#1e3a5f',
    status: 'active',
    autonomyLevel: 91,
    tasksCompleted: 248,
    tasksActive: 7,
    nextAction: 'Génération rapport opérationnel hebdomadaire — Lundi 06:00',
    kpis: [
      { label: 'Projets coordonnés', value: '18', trend: 'up', unit: '' },
      { label: 'Délai livraison', value: '94', trend: 'up', unit: '%' },
      { label: 'Taux blocage résolu', value: '97', trend: 'up', unit: '%' },
      { label: 'Score opérationnel', value: '9.1', trend: 'up', unit: '/10' },
    ],
    capabilities: [
      'Coordination opérationnelle de tous les agents KOS',
      'Pilotage du backlog missions et priorisation',
      'Reporting exécutif automatique (hebdomadaire)',
      'Détection et résolution des blocages inter-agents',
      'Gestion des ressources et allocation capacité',
      'Escalade automatique vers Managing Partner si besoin',
    ],
    lastActive: '2026-06-24T05:30:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-cmo',
    code: 'CMO-01',
    name: 'KOS Chief Marketing Officer Agent',
    role: 'Stratégie marketing globale, pilotage acquisition, brand positioning, pipeline génération, ROI marketing',
    category: 'marketing',
    icon: 'ri-megaphone-line',
    color: '#7c3aed',
    status: 'active',
    autonomyLevel: 88,
    tasksCompleted: 193,
    tasksActive: 9,
    nextAction: 'Analyse performance campagne Lead Magnet BU2 Prix de Transfert — J+7',
    kpis: [
      { label: 'Leads générés/mois', value: '875', trend: 'up', unit: '' },
      { label: 'CAC moyen', value: '12 500', trend: 'down', unit: 'FCFA' },
      { label: 'Taux conversion MQL→SQL', value: '18', trend: 'up', unit: '%' },
      { label: 'ROI marketing global', value: '410', trend: 'up', unit: '%' },
    ],
    capabilities: [
      'Stratégie marketing omnicanal (SEO, LinkedIn, Email, Events)',
      'Planification et pilotage des campagnes de génération de leads',
      'Brand positioning BU1/BU2/BU3/BU4 et cross-sell',
      'Analyse ROI par canal et optimisation budgétaire',
      'Coordination contenu éditorial x KOS Content Factory',
      'Reporting marketing mensuel avec recommandations',
    ],
    lastActive: '2026-06-24T06:15:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-social-media',
    code: 'SOCIAL-01',
    name: 'KOS Social Media Intelligence Agent',
    role: 'Publication automatisée, engagement LinkedIn/Twitter, veille e-réputation, amplification contenu Think Tank',
    category: 'social',
    icon: 'ri-share-circle-line',
    color: '#0891b2',
    status: 'active',
    autonomyLevel: 85,
    tasksCompleted: 312,
    tasksActive: 12,
    nextAction: 'Publication tribune LinkedIn Dr. Simda — Gestion prédictive risques réglementaires',
    kpis: [
      { label: 'Portée LinkedIn/semaine', value: '48 500', trend: 'up', unit: '' },
      { label: 'Taux engagement', value: '8.4', trend: 'up', unit: '%' },
      { label: 'Followers gagnés/mois', value: '1 240', trend: 'up', unit: '' },
      { label: 'Publications/semaine', value: '5', trend: 'stable', unit: '' },
    ],
    capabilities: [
      'Publication automatisée LinkedIn (tribunes, articles, posts)',
      'Amplification des publications Think Tank (10+ publications)',
      'Veille e-réputation et monitoring mentions KHEPRA',
      'Engagement automatique (réponses, interactions qualifiées)',
      'Analyse hashtags réglementaires et tendances BCEAO/COBAC',
      'Planification calendrier éditorial social media',
    ],
    lastActive: '2026-06-24T07:00:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-llmo-compliance',
    code: 'LLMO-01',
    name: 'KOS LLMO Compliance Intelligence',
    role: 'Optimisation LLM pour contenu conformité BCEAO/COBAC — génération, vérification, enrichissement réglementaire',
    category: 'llm',
    icon: 'ri-brain-line',
    color: '#10A37F',
    status: 'active',
    autonomyLevel: 94,
    tasksCompleted: 487,
    tasksActive: 23,
    nextAction: 'Enrichissement base RAG — 15 nouvelles circulaires BCEAO 2026',
    kpis: [
      { label: 'Articles générés/mois', value: '18', trend: 'up', unit: '' },
      { label: 'Score conformité', value: '96', trend: 'up', unit: '/100' },
      { label: 'Références sourcées', value: '100', trend: 'stable', unit: '%' },
      { label: 'Temps génération', value: '4.2', trend: 'down', unit: 'min' },
    ],
    capabilities: [
      'Génération contenu conformité réglementaire BCEAO/COBAC/OHADA',
      'Vérification factuelle des affirmations réglementaires',
      'Enrichissement du Knowledge Graph réglementaire',
      'Mise à jour automatique des articles lors de nouvelles circulaires',
      'Synthèse exécutive des textes réglementaires complexes',
      'Détection des contradictions et incohérences réglementaires',
    ],
    lastActive: '2026-06-24T05:45:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-llmo-audit',
    code: 'LLMO-02',
    name: 'KOS LLMO Audit Intelligence',
    role: 'Optimisation LLM pour livrables audit Big Four — programmes audit, due diligences, cartographie risques',
    category: 'llm',
    icon: 'ri-microscope-line',
    color: '#4F46E5',
    status: 'active',
    autonomyLevel: 92,
    tasksCompleted: 364,
    tasksActive: 15,
    nextAction: 'Génération programme audit interne ESG — Client Cimenterie Ouest-Africaine',
    kpis: [
      { label: 'Livrables audit/mois', value: '12', trend: 'up', unit: '' },
      { label: 'Score qualité Big Four', value: '94', trend: 'up', unit: '/100' },
      { label: 'Taux auto-approbation', value: '87', trend: 'up', unit: '%' },
      { label: 'Réduction temps livrable', value: '68', trend: 'up', unit: '%' },
    ],
    capabilities: [
      'Génération automatique de programmes d\'audit (ISA, IIA)',
      'Cartographie des risques avec scoring prédictif',
      'Due diligence accéléré (28j vs 45j standard)',
      'Rédaction de rapports d\'audit interne Big Four',
      'Analyse de contrôle interne et recommandations',
      'Benchmarking sectoriel automatique',
    ],
    lastActive: '2026-06-24T04:30:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-llmo-thinktank',
    code: 'LLMO-03',
    name: 'KOS LLMO Think Tank Research',
    role: 'Optimisation LLM pour la recherche académique — position papers, policy briefs, études sectorielles, prospective',
    category: 'llm',
    icon: 'ri-book-2-line',
    color: '#9B7B2C',
    status: 'active',
    autonomyLevel: 89,
    tasksCompleted: 156,
    tasksActive: 8,
    nextAction: 'Draft Étude Sectorielle Bancassurance CEMAC 2027 — Section 4 Modèles',
    kpis: [
      { label: 'Publications/trimestre', value: '11', trend: 'up', unit: '' },
      { label: 'Score méthodologique', value: '91', trend: 'up', unit: '/100' },
      { label: 'Citations vérifiées', value: '98', trend: 'up', unit: '%' },
      { label: 'Téléchargements/pub', value: '245', trend: 'up', unit: '' },
    ],
    capabilities: [
      'Rédaction de Position Papers et Policy Briefs (niveau PhD)',
      'Études sectorielles avec analyse empirique structurée',
      'Prospectives réglementaires avec 4 scénarios probabilisés',
      'Vérification systématique des citations et références',
      'Analyse comparative multi-juridictions (12 pays)',
      'Génération de résumés exécutifs et abstracts',
    ],
    lastActive: '2026-06-24T03:20:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-llmo-executive',
    code: 'LLMO-04',
    name: 'KOS LLMO Executive Intelligence',
    role: 'Optimisation LLM pour livrables exécutifs — rapports COMEX, synthèses stratégiques, board memos, keynotes',
    category: 'llm',
    icon: 'ri-dashboard-3-line',
    color: '#7C3AED',
    status: 'active',
    autonomyLevel: 90,
    tasksCompleted: 201,
    tasksActive: 11,
    nextAction: 'Board Memo Q2 2026 — Agenda Réglementaire Banques Systémiques UEMOA',
    kpis: [
      { label: 'Livrables exécutifs/mois', value: '14', trend: 'up', unit: '' },
      { label: 'Score clarté', value: '9.3', trend: 'up', unit: '/10' },
      { label: 'Satisfaction dirigeants', value: '94', trend: 'up', unit: '%' },
      { label: 'Temps rédaction', value: '22', trend: 'down', unit: 'min' },
    ],
    capabilities: [
      'Génération de rapports COMEX et board presentations',
      'Synthèses stratégiques adaptées au niveau C-Suite',
      'Board memos réglementaires avec grading priorité',
      'Keynotes et discours avec positionnement thought leadership',
      'Briefings exécutifs de veille réglementaire',
      'Adaption du ton selon l\'audience (CA, investisseurs, régulateurs)',
    ],
    lastActive: '2026-06-24T06:00:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-llmo-media',
    code: 'LLMO-05',
    name: 'KOS LLMO Media Production',
    role: 'Optimisation LLM pour production multimédia — scripts YouTube/podcast, captions LinkedIn, newsletters premium',
    category: 'llm',
    icon: 'ri-video-line',
    color: '#E11D48',
    status: 'active',
    autonomyLevel: 91,
    tasksCompleted: 428,
    tasksActive: 18,
    nextAction: 'Scripts 4 vidéos YouTube Q3 2026 — Série Conformité UEMOA 2026',
    kpis: [
      { label: 'Scripts produits/mois', value: '8', trend: 'up', unit: '' },
      { label: 'Taux approbation contenu', value: '92', trend: 'up', unit: '%' },
      { label: 'Newsletters rédigées/mois', value: '2', trend: 'stable', unit: '' },
      { label: 'Score humanisation', value: '8.7', trend: 'up', unit: '/10' },
    ],
    capabilities: [
      'Rédaction de scripts YouTube et podcasts (8 min à 45 min)',
      'Génération de captions et légendes LinkedIn optimisées',
      'Newsletters premium KHEPRA Regulatory Pulse',
      'Adaptation contenu multiformat (long → court → social)',
      'Voix narrative KOS cohérente avec charte éditoriale',
      'Optimisation SEO des titres, descriptions et tags',
    ],
    lastActive: '2026-06-24T05:15:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
  {
    id: 'agent-account-executive',
    code: 'AE-01',
    name: 'KOS Account Executive Agent',
    role: 'Closing et nurturing commercial, suivi pipeline, rédaction propositions, relances intelligentes, CRM automation',
    category: 'sales',
    icon: 'ri-user-star-line',
    color: '#D97706',
    status: 'active',
    autonomyLevel: 86,
    tasksCompleted: 147,
    tasksActive: 14,
    nextAction: 'Relance pipeline FinTech Mobile Money — Signature mandat J+2',
    kpis: [
      { label: 'Propositions rédigées/mois', value: '12', trend: 'up', unit: '' },
      { label: 'Taux conversion pipeline', value: '34', trend: 'up', unit: '%' },
      { label: 'Pipeline value suivi', value: '1.86 Mds', trend: 'up', unit: 'FCFA' },
      { label: 'Relances automatisées', value: '100', trend: 'stable', unit: '%' },
    ],
    capabilities: [
      'Rédaction automatique de propositions commerciales Big Four',
      'Suivi du pipeline CRM et relances intelligentes',
      'Scoring des leads et priorisation des opportunités',
      'Séquences de nurturing personnalisées par segment',
      'Préparation des pitches et documents de closing',
      'Analyse post-mortem des deals gagnés et perdus',
    ],
    lastActive: '2026-06-24T07:30:00Z',
    activationDate: '2026-06-24T00:00:00Z',
  },
];

export interface OrchestratorKPI {
  id: string;
  label: string;
  value: string;
  previousValue: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description: string;
}

export const ORCHESTRATOR_GLOBAL_KPIS: OrchestratorKPI[] = [
  {
    id: 'agents-total',
    label: 'Agents Actifs',
    value: '9',
    previousValue: '0',
    unit: '',
    trend: 'up',
    icon: 'ri-robot-2-line',
    color: 'primary',
    description: 'Agents Growth Orchestrator activés — COO, CMO, Social Media, LLMO x5, Account Executive',
  },
  {
    id: 'autonomy-score',
    label: 'Autonomie Opérationnelle',
    value: '90',
    previousValue: '0',
    unit: '/100',
    trend: 'up',
    icon: 'ri-medal-line',
    color: 'accent',
    description: 'Score moyen d\'autonomie des 9 agents du Growth Orchestrator',
  },
  {
    id: 'tasks-active',
    label: 'Tâches en cours',
    value: '117',
    previousValue: '0',
    unit: '',
    trend: 'up',
    icon: 'ri-task-line',
    color: 'secondary',
    description: 'Tâches actives distribuées sur les 9 agents en temps réel',
  },
  {
    id: 'pipeline-value',
    label: 'Pipeline Commercial',
    value: '1.86 Mds',
    previousValue: '0',
    unit: 'FCFA',
    trend: 'up',
    icon: 'ri-money-dollar-circle-line',
    color: 'primary',
    description: 'Valeur totale du pipeline commercial suivi par le KOS Account Executive Agent',
  },
  {
    id: 'leads-month',
    label: 'Leads générés / mois',
    value: '875',
    previousValue: '0',
    unit: '',
    trend: 'up',
    icon: 'ri-user-received-line',
    color: 'accent',
    description: 'Leads MQL générés par les actions combinées CMO + Social Media + LLMO Media',
  },
  {
    id: 'content-month',
    label: 'Contenus produits / mois',
    value: '52',
    previousValue: '0',
    unit: '',
    trend: 'up',
    icon: 'ri-article-line',
    color: 'secondary',
    description: 'Articles, scripts, newsletters, posts LinkedIn, publications Think Tank produits',
  },
];

export interface GrowthWorkflow {
  id: string;
  name: string;
  description: string;
  agents: string[];
  trigger: string;
  frequency: string;
  lastRun: string;
  nextRun: string;
  status: 'running' | 'scheduled' | 'completed';
  outputType: string;
}

export const GROWTH_WORKFLOWS: GrowthWorkflow[] = [
  {
    id: 'wf-weekly-ops',
    name: 'Rapport Opérationnel Hebdomadaire',
    description: 'Le COO Agent consolide toutes les activités de la semaine, génère le rapport exécutif, identifie les blocages et propose les actions prioritaires pour la semaine suivante.',
    agents: ['COO-01', 'LLMO-04'],
    trigger: 'Automatique — Chaque lundi 06:00',
    frequency: 'Hebdomadaire',
    lastRun: '2026-06-17T06:00:00Z',
    nextRun: '2026-06-24T06:00:00Z',
    status: 'scheduled',
    outputType: 'Rapport PDF + Dashboard exécutif',
  },
  {
    id: 'wf-lead-nurturing',
    name: 'Nurturing Automatique Pipeline',
    description: 'L\'Account Executive Agent scanne le CRM, identifie les leads inactifs depuis 72h, génère des relances personnalisées et les soumet pour validation avant envoi.',
    agents: ['AE-01', 'LLMO-04'],
    trigger: 'Automatique — Quotidien 08:00',
    frequency: 'Quotidien',
    lastRun: '2026-06-23T08:00:00Z',
    nextRun: '2026-06-24T08:00:00Z',
    status: 'scheduled',
    outputType: 'Emails de relance + Mise à jour CRM',
  },
  {
    id: 'wf-content-linkedin',
    name: 'Pipeline Publication LinkedIn',
    description: 'Le CMO Agent planifie, le Social Media Agent publie, le LLMO Media génère les captions — 5 publications/semaine automatisées.',
    agents: ['CMO-01', 'SOCIAL-01', 'LLMO-05'],
    trigger: 'Automatique — Lu/Me/Ve 09:00, Ma/Je 14:00',
    frequency: '5 fois/semaine',
    lastRun: '2026-06-23T14:00:00Z',
    nextRun: '2026-06-24T09:00:00Z',
    status: 'scheduled',
    outputType: 'Publications LinkedIn publiées',
  },
  {
    id: 'wf-regulatory-watch',
    name: 'Veille Réglementaire Automatique',
    description: 'LLMO Compliance scanne les sources BCEAO/COBAC/GAFI, détecte les nouvelles circulaires, met à jour le Knowledge Graph et alerte si impact sur les articles publiés.',
    agents: ['LLMO-01', 'COO-01'],
    trigger: 'Automatique — Quotidien 05:00',
    frequency: 'Quotidien',
    lastRun: '2026-06-24T05:00:00Z',
    nextRun: '2026-06-25T05:00:00Z',
    status: 'completed',
    outputType: 'Alerte réglementaire + Mise à jour base RAG',
  },
  {
    id: 'wf-think-tank-amplify',
    name: 'Amplification Publications Think Tank',
    description: 'À chaque nouvelle publication Think Tank, le Social Media Agent et LLMO Think Tank génèrent automatiquement 5 posts LinkedIn, 1 newsletter extract et 1 thread Twitter.',
    agents: ['SOCIAL-01', 'LLMO-03', 'CMO-01'],
    trigger: 'Événementiel — Nouvelle publication Think Tank',
    frequency: 'À chaque publication',
    lastRun: '2026-06-12T10:00:00Z',
    nextRun: 'Lors de la prochaine publication',
    status: 'scheduled',
    outputType: '5 posts LinkedIn + newsletter extract + thread',
  },
  {
    id: 'wf-proposal-factory',
    name: 'Factory Proposition Commerciale',
    description: 'Dès qualification d\'un lead SQL par l\'Account Executive, LLMO Executive et LLMO Audit génèrent automatiquement une proposition commerciale Big Four personnalisée.',
    agents: ['AE-01', 'LLMO-02', 'LLMO-04'],
    trigger: 'Événementiel — Lead qualifié SQL',
    frequency: 'À la demande',
    lastRun: '2026-06-20T14:00:00Z',
    nextRun: 'Prochain lead SQL',
    status: 'scheduled',
    outputType: 'Proposition commerciale PDF + One-pager',
  },
];

export const ORCHESTRATOR_STATS = {
  version: 'KOS Autonomous Growth Orchestrator v1.0',
  activationDate: '2026-06-24',
  totalAgentsActive: 9,
  agentCategories: 5,
  totalCapabilities: 54,
  totalWorkflows: 6,
  globalAutonomyScore: 90,
  totalTasksCompleted: 2536,
  totalTasksActive: 117,
  missionStatement: 'Transformer KHEPRA en machine de croissance autonome — 9 agents spécialisés opérant en coordination pour maximiser la génération de leads, la production de valeur et le pipeline commercial en zone UEMOA/CEMAC.',
};





