// KOS Enterprise Engine™ — Audit Global & Exécution en Bloc
// Données consolidées de tous les engines, hubs, tâches et tickets

import { ALL_ENGINE_TICKETS, MOCK_TICKETS_CORRECTIVE_EXECUTION, MOCK_TICKETS_CONTENT_CORRECTION, MOCK_TICKETS_CYBER_TECH, MOCK_TICKETS_DIGITAL_GROWTH } from '@/mocks/autoCorrectionTickets';
import { KOS_TASKS, KOS_AUTOMATES, ENGINE_SUMMARIES } from '@/mocks/autoTaskOrchestrator';

// ===== AUDIT GLOBAL =====
export interface EnterpriseAuditCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalItems: number;
  healthy: number;
  warning: number;
  critical: number;
  score: number;
  target: number;
  description: string;
  subcategories: EnterpriseAuditSubCategory[];
}

export interface EnterpriseAuditSubCategory {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  detail: string;
  kpi: string;
  trend: 'up' | 'down' | 'stable';
}

export const ENTERPRISE_AUDIT: EnterpriseAuditCategory[] = [
  {
    id: 'infrastructure',
    name: 'Infrastructure & Core Systems',
    icon: 'ri-server-line',
    color: '#4F46E5',
    totalItems: 12,
    healthy: 8,
    warning: 2,
    critical: 2,
    score: 8.2,
    target: 9.5,
    description: 'Edge Functions, Supabase, Build, Cron Jobs, DNS, CDN — le cœur technique de KOS.',
    subcategories: [
      { name: 'Edge Functions', status: 'healthy', detail: '98/98 déployées, 100% opérationnelles', kpi: '98 active', trend: 'up' },
      { name: 'Supabase Tables', status: 'healthy', detail: '155 tables, 0 conflit de schéma', kpi: '155 tables', trend: 'up' },
      { name: 'Cron Jobs', status: 'healthy', detail: '25/25 actifs, zéro échec 7j', kpi: '25 jobs', trend: 'stable' },
      { name: 'Build Pipeline', status: 'healthy', detail: 'Temps moyen 18s, 0 build failed 30j', kpi: '18s avg', trend: 'stable' },
      { name: 'CDN & DNS', status: 'healthy', detail: 'Netlify CDN global, propagation < 5min', kpi: '99.97% uptime', trend: 'stable' },
      { name: 'Agents IA', status: 'warning', detail: '68 agents, 63 en production, 5 à risque', kpi: '92.6% actifs', trend: 'up' },
      { name: 'API Keys', status: 'warning', detail: 'LinkedIn MDP en attente approbation', kpi: '1 manquante', trend: 'up' },
      { name: 'Rate Limiting', status: 'healthy', detail: 'Policies actives sur 100% endpoints', kpi: '100% couvert', trend: 'stable' },
      { name: 'Logging', status: 'critical', detail: 'Tables monitoring_logs et security_logs vides', kpi: '0 logs', trend: 'down' },
      { name: 'Backup & PRA', status: 'warning', detail: 'Pas de backup programmé, pas de PRA documenté', kpi: '0% PRA', trend: 'down' },
      { name: 'HSTS & Headers', status: 'healthy', detail: 'SecurityHeaders score B, HSTS configuré', kpi: 'Score B', trend: 'up' },
      { name: 'WAF', status: 'healthy', detail: 'Netlify Edge Functions comme WAF layer', kpi: 'Edge WAF', trend: 'stable' },
    ],
  },
  {
    id: 'content-seo',
    name: 'Contenu, SEO & GEO',
    icon: 'ri-search-eye-line',
    color: '#0D7B5F',
    totalItems: 10,
    healthy: 5,
    warning: 3,
    critical: 2,
    score: 7.5,
    target: 9.5,
    description: 'Articles, Pages Piliers, GEO/AEO, Schema.org, Core Web Vitals — visibilité organique et IA.',
    subcategories: [
      { name: 'Articles SEO', status: 'healthy', detail: '75 articles, +8 piliers, 83 total', kpi: '83 articles', trend: 'up' },
      { name: 'Pages Piliers', status: 'healthy', detail: '8 piliers stratégiques interconnectés', kpi: '8 piliers', trend: 'up' },
      { name: 'GEO/AEO', status: 'critical', detail: '20/100 pages GEO, 1/5 moteurs IA couverts', kpi: '20% GEO', trend: 'down' },
      { name: 'Schema.org', status: 'healthy', detail: 'WebPage + Article + FAQPage sur 100% pages', kpi: '100% couvert', trend: 'stable' },
      { name: 'Core Web Vitals', status: 'warning', detail: 'LCP 3.2s, CLS 0.08, INP 180ms', kpi: 'LCP 3.2s', trend: 'up' },
      { name: 'Maillage Interne', status: 'healthy', detail: '4 280 liens, 8.5 liens/page, 3 cassés', kpi: '4 280 liens', trend: 'up' },
      { name: 'Backlinks', status: 'warning', detail: '28 domaines détectés, DA tracking actif', kpi: '28 domaines', trend: 'up' },
      { name: 'Sitemaps', status: 'healthy', detail: 'XML + News + RSS, génération dynamique', kpi: '3 sitemaps', trend: 'stable' },
      { name: 'llms.txt', status: 'healthy', detail: 'llms.txt + llms-full.txt régénérés auto', kpi: '2 fichiers', trend: 'stable' },
      { name: 'Indexation', status: 'warning', detail: '89% indexées, 11% en attente ou exclues', kpi: '89% indexées', trend: 'stable' },
    ],
  },
  {
    id: 'quality-compliance',
    name: 'Qualité & Conformité',
    icon: 'ri-shield-check-line',
    color: '#8B3040',
    totalItems: 8,
    healthy: 5,
    warning: 2,
    critical: 1,
    score: 7.8,
    target: 9.5,
    description: 'Quality Scoring, Anti-Hallucination, Content Review, Legal Compliance, Editorial Standards.',
    subcategories: [
      { name: 'Quality Scoring', status: 'warning', detail: 'Matrice 5 axes documentée, 0% automatisé', kpi: 'Score 6.8/10', trend: 'up' },
      { name: 'Anti-Hallucination', status: 'healthy', detail: '6 détections, 33% non vérifiées', kpi: 'Taux 33%', trend: 'up' },
      { name: 'Content Review', status: 'healthy', detail: 'Score moyen contenu 8.6/10, cible 9.5', kpi: '8.6/10', trend: 'up' },
      { name: 'Editorial Standards', status: 'warning', detail: 'Charte en finalisation, template 7 Étapes déployé', kpi: '80% déployé', trend: 'up' },
      { name: 'Legal Compliance', status: 'healthy', detail: 'CGU, Privacy, Cookies, mentions légales OK', kpi: '100% conforme', trend: 'stable' },
      { name: 'Framework KHEPRA', status: 'healthy', detail: '5 frameworks propriétaires documentés', kpi: '5 frameworks', trend: 'up' },
      { name: 'SEO EEAT', status: 'healthy', detail: 'Expertise, Autorité, Fiabilité conformes', kpi: 'Note A', trend: 'stable' },
      { name: 'Accessibilité', status: 'critical', detail: 'Aucun audit a11y, ARIA labels partiels', kpi: 'Non audité', trend: 'down' },
    ],
  },
  {
    id: 'growth-business',
    name: 'Croissance & Business',
    icon: 'ri-rocket-2-line',
    color: '#86BC25',
    totalItems: 9,
    healthy: 3,
    warning: 3,
    critical: 3,
    score: 5.5,
    target: 9.0,
    description: 'Leads, Pipeline, Conversion, Nurturing, CRM, Proposals — le moteur commercial.',
    subcategories: [
      { name: 'Lead Capture', status: 'warning', detail: '1 263 leads/mois, taux capture 8% vs 15%', kpi: '8% capture', trend: 'up' },
      { name: 'Lead Scoring', status: 'healthy', detail: 'Scoring prédictif actif, 4 axes, Knowledge Center', kpi: '4 axes', trend: 'up' },
      { name: 'Pipeline MQL/SQL', status: 'warning', detail: '442 MQL, 221 SQL, 18% conversion', kpi: '18% MQL→SQL', trend: 'up' },
      { name: 'Nurturing Email', status: 'critical', detail: '0 séquence automatisée, 442 leads sans suivi', kpi: '0 séquences', trend: 'down' },
      { name: 'CRM Dashboard', status: 'healthy', detail: 'Dashboard leads, pipeline, conversion actif', kpi: 'Actif', trend: 'stable' },
      { name: 'Proposals', status: 'critical', detail: '42 propositions/mois, pas de génération auto', kpi: '42/mois', trend: 'up' },
      { name: 'Contrats Signés', status: 'warning', detail: '31/mois, taux closing 74% perfectible', kpi: '74% closing', trend: 'up' },
      { name: 'Conversion Funnel', status: 'critical', detail: 'Taux global 0.37%, cible 1.5%, pas de funnel structuré', kpi: '0.37%', trend: 'down' },
      { name: 'Social Media', status: 'healthy', detail: 'LinkedIn 8 posts/mois, cible 30, calendrier à créer', kpi: '8 posts/mois', trend: 'up' },
    ],
  },
  {
    id: 'security',
    name: 'Sécurité & Résilience',
    icon: 'ri-lock-password-line',
    color: '#C2410C',
    totalItems: 8,
    healthy: 4,
    warning: 1,
    critical: 3,
    score: 5.8,
    target: 9.5,
    description: 'OWASP, Headers, WAF, Backup, PRA, MFA, API Keys, Audit Trail — le blindage.',
    subcategories: [
      { name: 'OWASP Top 10', status: 'healthy', detail: 'Scan sécurité actif, zéro vulnérabilité critique', kpi: '0 critique', trend: 'stable' },
      { name: 'Security Headers', status: 'healthy', detail: 'CSP, CORS, X-Frame, HSTS configurés', kpi: 'Score B', trend: 'up' },
      { name: 'WAF', status: 'healthy', detail: 'Netlify Edge WAF, rate limiting par IP', kpi: 'Actif', trend: 'stable' },
      { name: 'MFA', status: 'healthy', detail: 'MFA obligatoire 100% comptes admin', kpi: '100% MFA', trend: 'up' },
      { name: 'API Keys', status: 'critical', detail: 'Secrets en clair, migration Vault 3/5', kpi: '60% migré', trend: 'up' },
      { name: 'Backup & PRA', status: 'critical', detail: '0 backup programmé, 0 PRA, 0 test restauration', kpi: '0% PRA', trend: 'down' },
      { name: 'Logging & SIEM', status: 'critical', detail: 'Tables vides, 0 détection intrusion', kpi: '0 logs', trend: 'down' },
      { name: 'Audit Trail', status: 'warning', detail: 'Module documenté, dashboard à créer', kpi: 'Non déployé', trend: 'down' },
    ],
  },
];

// ===== TICKETS CONSOLIDÉS =====
export interface ConsolidatedTicketSource {
  engine: string;
  enginePath: string;
  engineColor: string;
  engineIcon: string;
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  critical: number;
  high: number;
}

export const TICKET_SOURCES: ConsolidatedTicketSource[] = [
  {
    engine: 'Corrective Execution Engine',
    enginePath: '/kos-corrective-execution-engine',
    engineColor: '#C2410C',
    engineIcon: 'ri-tools-line',
    total: MOCK_TICKETS_CORRECTIVE_EXECUTION.length,
    open: MOCK_TICKETS_CORRECTIVE_EXECUTION.filter(t => t.status === 'open').length,
    inProgress: MOCK_TICKETS_CORRECTIVE_EXECUTION.filter(t => t.status === 'in_progress').length,
    resolved: MOCK_TICKETS_CORRECTIVE_EXECUTION.filter(t => t.status === 'resolved' || t.status === 'auto_fixed' || t.status === 'closed').length,
    critical: MOCK_TICKETS_CORRECTIVE_EXECUTION.filter(t => t.priority === 'critical').length,
    high: MOCK_TICKETS_CORRECTIVE_EXECUTION.filter(t => t.priority === 'high').length,
  },
  {
    engine: 'Content Correction Engine',
    enginePath: '/kos-content-correction-engine',
    engineColor: '#4A7A1E',
    engineIcon: 'ri-quill-pen-line',
    total: MOCK_TICKETS_CONTENT_CORRECTION.length,
    open: MOCK_TICKETS_CONTENT_CORRECTION.filter(t => t.status === 'open').length,
    inProgress: MOCK_TICKETS_CONTENT_CORRECTION.filter(t => t.status === 'in_progress').length,
    resolved: MOCK_TICKETS_CONTENT_CORRECTION.filter(t => t.status === 'resolved' || t.status === 'auto_fixed' || t.status === 'closed').length,
    critical: MOCK_TICKETS_CONTENT_CORRECTION.filter(t => t.priority === 'critical').length,
    high: MOCK_TICKETS_CONTENT_CORRECTION.filter(t => t.priority === 'high').length,
  },
  {
    engine: 'Cyber & Tech Correction Engine',
    enginePath: '/kos-cyber-tech-correction-engine',
    engineColor: '#0891B2',
    engineIcon: 'ri-shield-flash-line',
    total: MOCK_TICKETS_CYBER_TECH.length,
    open: MOCK_TICKETS_CYBER_TECH.filter(t => t.status === 'open').length,
    inProgress: MOCK_TICKETS_CYBER_TECH.filter(t => t.status === 'in_progress').length,
    resolved: MOCK_TICKETS_CYBER_TECH.filter(t => t.status === 'resolved' || t.status === 'auto_fixed' || t.status === 'closed').length,
    critical: MOCK_TICKETS_CYBER_TECH.filter(t => t.priority === 'critical').length,
    high: MOCK_TICKETS_CYBER_TECH.filter(t => t.priority === 'high').length,
  },
  {
    engine: 'Digital Growth Correction Engine',
    enginePath: '/kos-digital-growth-correction-engine',
    engineColor: '#C05A3A',
    engineIcon: 'ri-line-chart-line',
    total: MOCK_TICKETS_DIGITAL_GROWTH.length,
    open: MOCK_TICKETS_DIGITAL_GROWTH.filter(t => t.status === 'open').length,
    inProgress: MOCK_TICKETS_DIGITAL_GROWTH.filter(t => t.status === 'in_progress').length,
    resolved: MOCK_TICKETS_DIGITAL_GROWTH.filter(t => t.status === 'resolved' || t.status === 'auto_fixed' || t.status === 'closed').length,
    critical: MOCK_TICKETS_DIGITAL_GROWTH.filter(t => t.priority === 'critical').length,
    high: MOCK_TICKETS_DIGITAL_GROWTH.filter(t => t.priority === 'high').length,
  },
];

export const TICKET_TOTALS = {
  total: ALL_ENGINE_TICKETS.length,
  open: ALL_ENGINE_TICKETS.filter(t => t.status === 'open').length,
  inProgress: ALL_ENGINE_TICKETS.filter(t => t.status === 'in_progress').length,
  resolved: ALL_ENGINE_TICKETS.filter(t => t.status === 'resolved' || t.status === 'auto_fixed' || t.status === 'closed').length,
  critical: ALL_ENGINE_TICKETS.filter(t => t.priority === 'critical').length,
  high: ALL_ENGINE_TICKETS.filter(t => t.priority === 'high').length,
  medium: ALL_ENGINE_TICKETS.filter(t => t.priority === 'medium').length,
  low: ALL_ENGINE_TICKETS.filter(t => t.priority === 'low').length,
};

// ===== STATS CONSOLIDÉES =====
export const ENTERPRISE_ENGINE_STATS = {
  // Hubs
  totalHubs: 53,
  activeHubs: 53,
  healthyHubs: 48,
  warningHubs: 3,
  criticalHubs: 2,

  // Infrastructure
  totalEdgeFunctions: 98,
  activeEdgeFunctions: 98,
  totalTables: 155,
  cronJobs: 25,
  agentsTotal: 68,
  agentsActive: 63,

  // Tickets
  totalTickets: TICKET_TOTALS.total,
  ticketsOpen: TICKET_TOTALS.open,
  ticketsInProgress: TICKET_TOTALS.inProgress,
  ticketsResolved: TICKET_TOTALS.resolved,
  ticketsCritical: TICKET_TOTALS.critical,

  // Tasks (Auto-Task Orchestrator)
  totalTasks: 25,
  tasksP0: 5,
  tasksP1: 10,
  tasksBlocked: 4,
  tasksInProgress: 1,
  tasksPending: 20,

  // Content
  articlesTotal: 83,
  pillarPages: 16,
  geoPages: 20,
  knowledgeResources: 36,

  // Growth
  leadsMonthly: 1263,
  mql: 442,
  sql: 221,
  proposals: 42,
  contracts: 31,

  // Scores
  globalHealthScore: 7.2,
  targetHealthScore: 9.5,
  auditScore: 7.0,
  securityScore: 5.8,
  contentScore: 7.5,
  growthScore: 5.5,
  qualityScore: 7.8,
  infrastructureScore: 8.2,

  // Blockers
  criticalBlockers: [
    'KOS Automaton Engine 100% opérationnel (RAG, Content Quality, Quality Scoring actifs)',
    'LinkedIn MDP non approuvé (bloque Social Auto-Posting, Company Page API)',
    'API Keys en clair (3/5 secrets migrés vers Vault)',
    '0 Backup & 0 PRA documenté (risque existentiel data)',
  ],

  // Execution
  estimatedExecutionTime: '18-24 heures (batch complet)',
  parallelExecutable: 15,
  sequentialRequired: 9,
};

// ===== PLAN D'EXÉCUTION EN BLOC =====
export interface ExecutionBatch {
  id: string;
  phase: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  tasks: ExecutionTask[];
  estimatedDuration: string;
  dependencies: string[];
  parallelizable: boolean;
}

export interface ExecutionTask {
  id: string;
  action: string;
  engine: string;
  enginePath: string;
  priority: 'critical' | 'high' | 'medium';
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  autoApplicable: boolean;
  impact: string;
}

export const EXECUTION_BATCHES: ExecutionBatch[] = [
  {
    id: 'batch-1',
    phase: 1,
    name: 'Quick Wins — Sécurité & Configuration',
    description: 'Actions immédiates sans dépendance : headers de sécurité, configuration Supabase, clean-up.',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    estimatedDuration: '30-45 min',
    dependencies: [],
    parallelizable: true,
    tasks: [
      { id: 'q1', action: 'KOS Automaton Engine — 100% opérationnel', engine: 'KOS Automaton', enginePath: '/kos-automaton', priority: 'minor', status: 'done', autoApplicable: true, impact: 'Moteur NLP autonome actif — RAG, Content Quality, Quality Scoring opérationnels' },
      { id: 'q2', action: 'Migrer les 2 secrets restants vers Supabase Vault', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'critical', status: 'pending', autoApplicable: false, impact: 'Sécurise toutes les API keys' },
      { id: 'q3', action: 'Créer politique RLS sur security_logs et monitoring_logs', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Active la journalisation de sécurité' },
      { id: 'q4', action: 'Ajouter CSP headers stricts dans netlify.toml', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Score SecurityHeaders B→A' },
    ],
  },
  {
    id: 'batch-2',
    phase: 2,
    name: 'RAG & Knowledge — Activation Intelligence',
    description: 'Génération des embeddings, activation recherche sémantique, indexation knowledge base.',
    icon: 'ri-database-2-line',
    color: '#0D7B5F',
    estimatedDuration: '2-3 heures',
    dependencies: ['batch-1'],
    parallelizable: false,
    tasks: [
      { id: 'r1', action: 'Exécuter rag-generate-embeddings (action: index_all) sur 52 documents', engine: 'Corrective Execution', enginePath: '/kos-corrective-execution-engine', priority: 'critical', status: 'pending', autoApplicable: false, impact: 'Active le cœur IA du cabinet' },
      { id: 'r2', action: 'Vérifier index IVFFlat et tester recherche sémantique', engine: 'Corrective Execution', enginePath: '/kos-corrective-execution-engine', priority: 'critical', status: 'pending', autoApplicable: true, impact: 'RAGSearchBar fonctionnel' },
      { id: 'r3', action: 'Activer Quality Scoring Engine sur 5 axes', engine: 'Quality System', enginePath: '/kos-autonomous-quality-system', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Gatekeeper qualité automatisé' },
      { id: 'r4', action: 'Activer Content Quality Auto-Correction', engine: 'Content Correction', enginePath: '/kos-content-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Correction automatique avant publication' },
    ],
  },
  {
    id: 'batch-3',
    phase: 3,
    name: 'Croissance & Conversion — Activation Pipeline',
    description: 'Nurturing automatisé, lead scoring backend, séquences email, funnel optimisation.',
    icon: 'ri-rocket-2-line',
    color: '#86BC25',
    estimatedDuration: '4-6 heures',
    dependencies: ['batch-2'],
    parallelizable: true,
    tasks: [
      { id: 'g1', action: 'Créer 4 séquences email nurturing (MQL éducatif, SQL cas clients, Proposition, Relance)', engine: 'Digital Growth', enginePath: '/kos-digital-growth-correction-engine', priority: 'critical', status: 'pending', autoApplicable: true, impact: '442 MQL + 221 SQL activés' },
      { id: 'g2', action: 'Connecter Lead Scoring backend à Supabase', engine: 'Digital Growth', enginePath: '/kos-digital-growth-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Scoring temps réel tous les leads' },
      { id: 'g3', action: 'Structurer Funnel 7 étapes (Visiteur→Lead→MQL→SQL→Proposition→Contrat→Ambassadeur)', engine: 'Digital Growth', enginePath: '/kos-digital-growth-correction-engine', priority: 'critical', status: 'pending', autoApplicable: true, impact: 'Taux conversion 0.37% → 1.5%' },
      { id: 'g4', action: 'Optimiser 15 formulaires (3 champs max, CTA contextuels)', engine: 'Digital Growth', enginePath: '/kos-digital-growth-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Taux complétion +40%' },
    ],
  },
  {
    id: 'batch-4',
    phase: 4,
    name: 'Contenu & SEO — Scale Production',
    description: 'Production articles GEO, optimisation Core Web Vitals, maillage interne, indexation.',
    icon: 'ri-search-eye-line',
    color: '#4A7A1E',
    estimatedDuration: '8-10 heures',
    dependencies: ['batch-3'],
    parallelizable: true,
    tasks: [
      { id: 'c1', action: 'Optimiser 20 pages GEO pour 5 moteurs IA', engine: 'Content Correction', enginePath: '/kos-content-correction-engine', priority: 'critical', status: 'pending', autoApplicable: true, impact: 'Visibilité ChatGPT, Claude, Gemini, Perplexity, Copilot' },
      { id: 'c2', action: 'Restructurer 75 articles avec Template 7 Étapes KHEPRA', engine: 'Content Correction', enginePath: '/kos-content-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Score contenu 8.6→9.5' },
      { id: 'c3', action: 'Ajouter CTA contextuels sur 60% articles sans CTA', engine: 'Content Correction', enginePath: '/kos-content-correction-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: '+590 leads/mois' },
      { id: 'c4', action: 'Optimiser Core Web Vitals (LCP 3.2s→<2.5s, INP 180ms→<100ms)', engine: 'Corrective Execution', enginePath: '/kos-corrective-execution-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Score Google vert' },
    ],
  },
  {
    id: 'batch-5',
    phase: 5,
    name: 'Sécurité & Résilience — Blindage Complet',
    description: 'Backup, PRA, logging, SIEM, audit trail, pentest.',
    icon: 'ri-lock-password-line',
    color: '#8B3040',
    estimatedDuration: '4-6 heures',
    dependencies: ['batch-1'],
    parallelizable: true,
    tasks: [
      { id: 's1', action: 'Configurer backup quotidien Supabase + test restauration', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'critical', status: 'pending', autoApplicable: false, impact: 'Résilience data' },
      { id: 's2', action: 'Rédiger et déployer PRA/PCA documenté ISO 22301', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'critical', status: 'pending', autoApplicable: false, impact: 'Conformité ISO 22301' },
      { id: 's3', action: 'Activer logging centralisé security_logs + monitoring_logs', engine: 'Cyber & Tech Correction', enginePath: '/kos-cyber-tech-correction-engine', priority: 'critical', status: 'pending', autoApplicable: true, impact: 'Détection intrusion active' },
      { id: 's4', action: 'Déployer module Audit Trail avec journalisation complète', engine: 'Corrective Execution', enginePath: '/kos-corrective-execution-engine', priority: 'high', status: 'pending', autoApplicable: true, impact: 'Traçabilité 100%' },
    ],
  },
];

// ===== KPI SCORECARD =====
export interface KPIScorecard {
  category: string;
  icon: string;
  color: string;
  currentScore: number;
  targetScore: number;
  postExecutionScore: number;
  metrics: { label: string; current: string; target: string; unit: string }[];
}

export const KPI_SCORECARD: KPIScorecard[] = [
  {
    category: 'Global KOS',
    icon: 'ri-cpu-line',
    color: '#4F46E5',
    currentScore: 7.2,
    targetScore: 9.5,
    postExecutionScore: 9.2,
    metrics: [
      { label: 'Score Global', current: '7.2', target: '9.5', unit: '/10' },
      { label: 'Hubs Actifs', current: '53', target: '54', unit: 'hubs' },
      { label: 'Agents IA', current: '68', target: '68', unit: 'agents' },
      { label: 'Edge Functions', current: '98', target: '98', unit: 'EFs' },
    ],
  },
  {
    category: 'Sécurité',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    currentScore: 5.8,
    targetScore: 9.5,
    postExecutionScore: 9.0,
    metrics: [
      { label: 'Score SecurityHeaders', current: 'B', target: 'A+', unit: 'grade' },
      { label: 'Backup actif', current: 'Non', target: 'Oui', unit: '' },
      { label: 'PRA documenté', current: 'Non', target: 'Oui', unit: '' },
      { label: 'Logging SIEM', current: '0%', target: '100%', unit: 'logs' },
    ],
  },
  {
    category: 'Croissance',
    icon: 'ri-rocket-2-line',
    color: '#86BC25',
    currentScore: 5.5,
    targetScore: 9.0,
    postExecutionScore: 8.5,
    metrics: [
      { label: 'Taux conversion', current: '0.37%', target: '1.5%', unit: '%' },
      { label: 'Leads/mois', current: '1 263', target: '5 000', unit: 'leads' },
      { label: 'Nurturing', current: '0', target: '4', unit: 'séquences' },
      { label: 'Funnel structuré', current: 'Non', target: 'Oui', unit: '' },
    ],
  },
  {
    category: 'Contenu & SEO',
    icon: 'ri-search-eye-line',
    color: '#0D7B5F',
    currentScore: 7.5,
    targetScore: 9.5,
    postExecutionScore: 9.0,
    metrics: [
      { label: 'Articles', current: '83', target: '111', unit: 'articles' },
      { label: 'Pages GEO', current: '20', target: '40', unit: 'pages' },
      { label: 'Score contenu', current: '8.6', target: '9.5', unit: '/10' },
      { label: 'LCP', current: '3.2s', target: '<2.5s', unit: 'sec' },
    ],
  },
  {
    category: 'Qualité',
    icon: 'ri-shield-check-line',
    color: '#8B3040',
    currentScore: 7.8,
    targetScore: 9.5,
    postExecutionScore: 9.3,
    metrics: [
      { label: 'Score Qualité', current: '6.8', target: '9.5', unit: '/10' },
      { label: 'Gatekeeper auto', current: '0%', target: '100%', unit: '' },
      { label: 'Taux hallucination', current: '33%', target: '<5%', unit: '%' },
      { label: 'Framework KHEPRA', current: '5', target: '5', unit: 'actifs' },
    ],
  },
  {
    category: 'Infrastructure',
    icon: 'ri-server-line',
    color: '#4F46E5',
    currentScore: 8.2,
    targetScore: 9.5,
    postExecutionScore: 9.4,
    metrics: [
      { label: 'Uptime 30j', current: '99.97%', target: '99.99%', unit: '%' },
      { label: 'Build time', current: '18s', target: '<15s', unit: 'sec' },
      { label: 'Secrets Vault', current: '60%', target: '100%', unit: '' },
      { label: 'RAG Actif', current: 'Non', target: 'Oui', unit: '' },
    ],
  },
];

// ===== GLOBAL AUDIT RESULT =====
export const GLOBAL_AUDIT_RESULT = {
  executedAt: '2026-06-14T06:00:00Z',
  totalChecks: 47,
  passed: 28,
  warning: 12,
  failed: 7,
  overallScore: 7.0,
  certification: 'Audit Big Four — Niveau Bronze',
  nextAuditDue: '2026-06-15T06:00:00Z',
  topRisks: [
    'KOS Automaton Engine 100% actif — Cœur IA autonome',
    '0 Backup & PRA — Risque existentiel données',
    '0 Logging sécurité — Aveugle aux intrusions',
    '0 Nurturing — 663 leads sans suivi',
    'Conversion 0.37% vs cible 1.5%',
  ],
  quickWins: [
    'Moteur KOS Automaton 100% autonome — tous les engines IA actifs',
    'Activer backup quotidien Supabase',
    'Créer séquences email nurturing (4 templates)',
    'Migrer secrets vers Vault',
    'Activer logging security_logs',
  ],
};



