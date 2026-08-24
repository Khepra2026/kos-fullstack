// KOS ULTIMATE COCKPIT™ — Données Consolidées Big Four
// Fusion de : KOS Dashboard + Executive Dashboard + Media Command Center + Executive Command
// Single Pane of Glass — Un seul cockpit pour tout piloter

export interface SystemOverview {
  totalHubs: number;
  activeHubs: number;
  totalModules: number;
  totalTables: number;
  totalEdgeFunctions: number;
  totalCronJobs: number;
  totalAgents: number;
  globalHealthScore: number;
  activeAlerts: number;
  certification: string;
  uptimeLast30Days: number;
  deploymentsLast7Days: number;
  avgBuildTime: string;
  isModeReel: boolean;
}

export interface ExecutiveKPI {
  id: string;
  label: string;
  value: string;
  variation: string;
  variationPos: boolean;
  icon: string;
}

export interface PipelineEntry {
  mois: string;
  suspects: number;
  leads: number;
  opportunites: number;
  missions: number;
}

export interface ActiveMission {
  id: string;
  client: string;
  secteur: string;
  mission: string;
  statut: string;
  progression: number;
  deadline: string;
  agentLead: string;
}

export interface CriticalAlert {
  id: string;
  niveau: string;
  message: string;
  date: string;
  source: string;
  action: string;
}

export interface AgentScore {
  agent: string;
  score: number;
  livrables: number;
  delais: number;
}

export interface CommandDimensionSummary {
  id: string;
  name: string;
  icon: string;
  status: 'conforme' | 'surveillance' | 'action';
  score: number;
  target: number;
  trend: string;
  trendValue: string;
  alertsCount: number;
  description: string;
}

export interface MediaFactorySummary {
  id: string;
  hubNumber: number;
  name: string;
  shortName: string;
  icon: string;
  status: string;
  healthScore: number;
  qualityScore: number;
  complianceScore: number;
  automationRate: number;
  outputCount: number;
  outputLabel: string;
  alertsCount: number;
  route: string;
  description: string;
}

export interface ComplianceSummary {
  frameworks: { name: string; authority: string; status: string; score: number }[];
  globalRate: number;
  pendingActions: number;
  compliant: number;
  total: number;
}

export interface SystemHealth {
  edgeFunctionsActive: number;
  edgeFunctionsTotal: number;
  cronJobsActive: number;
  cronJobsTotal: number;
  tablesTotal: number;
  agentsDeployed: number;
  agentsInProduction: number;
  uptime30d: number;
  deployments7d: number;
}

export interface CommanderIntent {
  date: string;
  summary: string;
  priorityActions: string[];
  decisionsRequired: string[];
  author: string;
}

// ─── SYSTEM OVERVIEW ───
export const SYSTEM_OVERVIEW: SystemOverview = {
  totalHubs: 78,
  activeHubs: 78,
  totalModules: 452,
  totalTables: 248,
  totalEdgeFunctions: 98,
  totalCronJobs: 32,
  totalAgents: 75,
  globalHealthScore: 10.0,
  activeAlerts: 0,
  certification: 'AAAA — Big Four Supreme 100%',
  uptimeLast30Days: 99.99,
  deploymentsLast7Days: 22,
  avgBuildTime: '12s',
  isModeReel: true,
};

// ─── EXECUTIVE KPIs ───
export const EXECUTIVE_KPIS: ExecutiveKPI[] = [
  { id: 'ca', label: 'CA Mensuel (Juin)', value: '187 500 €', variation: '+12.4%', variationPos: true, icon: 'ri-money-euro-circle-line' },
  { id: 'pipeline', label: 'Pipeline Pondéré', value: '645 000 €', variation: '+18.7%', variationPos: true, icon: 'ri-filter-3-line' },
  { id: 'nps', label: 'NPS Global', value: '74', variation: '+5 pts', variationPos: true, icon: 'ri-star-line' },
  { id: 'qualite', label: 'Score Qualité Moyen', value: '94.2/100', variation: '+1.3', variationPos: true, icon: 'ri-shield-check-line' },
  { id: 'missions', label: 'Missions Actives', value: '12', variation: '2 en alerte', variationPos: false, icon: 'ri-briefcase-line' },
  { id: 'retard', label: 'Taux de Retard', value: '8.3%', variation: '-2.1%', variationPos: true, icon: 'ri-timer-line' },
];

// ─── PIPELINE ───
export const PIPELINE_DATA: PipelineEntry[] = [
  { mois: 'Jan', suspects: 180, leads: 72, opportunites: 18, missions: 5 },
  { mois: 'Fév', suspects: 195, leads: 78, opportunites: 22, missions: 6 },
  { mois: 'Mar', suspects: 210, leads: 85, opportunites: 25, missions: 7 },
  { mois: 'Avr', suspects: 225, leads: 90, opportunites: 28, missions: 8 },
  { mois: 'Mai', suspects: 240, leads: 95, opportunites: 30, missions: 9 },
  { mois: 'Juin', suspects: 260, leads: 105, opportunites: 35, missions: 12 },
];

// ─── ACTIVE MISSIONS ───
export const ACTIVE_MISSIONS: ActiveMission[] = [
  { id: 'm1', client: 'Banque Atlantique', secteur: 'Banque', mission: 'Audit Pré-Inspection COBAC', statut: 'Dans les délais', progression: 75, deadline: '2026-07-15', agentLead: 'AG7 (Audit AI)' },
  { id: 'm2', client: 'MicroFin Afrique', secteur: 'Microfinance', mission: 'Diagnostic LBC/FT /32', statut: 'En retard', progression: 45, deadline: '2026-06-01', agentLead: 'AG4 (AML AI)' },
  { id: 'm3', client: 'Groupe Industriel Sahélien', secteur: 'Industrie', mission: 'Documentation Prix de Transfert BEPS', statut: 'Dans les délais', progression: 60, deadline: '2026-07-30', agentLead: 'AG5 (TP AI)' },
  { id: 'm4', client: 'FinTech PayAfrik', secteur: 'FinTech', mission: 'Agrément Établissement de Paiement', statut: 'Dans les délais', progression: 30, deadline: '2026-09-15', agentLead: 'AG3 (Compliance AI)' },
  { id: 'm5', client: 'Assurances CIMA Plus', secteur: 'Assurance', mission: 'Due Diligence Réglementaire', statut: 'En retard', progression: 20, deadline: '2026-05-20', agentLead: 'AG7 (Audit AI)' },
  { id: 'm6', client: 'Holding Familiale Koumassi', secteur: 'Holding', mission: 'Structuration Fiscale UEMOA', statut: 'Dans les délais', progression: 85, deadline: '2026-06-20', agentLead: 'AG6 (Tax AI)' },
  { id: 'm7', client: 'BCEAO — Projet SFD', secteur: 'Public', mission: 'Révision Ratios Prudentiels SFD', statut: 'Dans les délais', progression: 50, deadline: '2026-08-01', agentLead: 'AG2 (Risk AI)' },
  { id: 'm8', client: 'Banque Centrale Populaire', secteur: 'Banque', mission: 'Gouvernance Board Advisory', statut: 'Terminé', progression: 100, deadline: '2026-05-30', agentLead: 'AG1 (Strategy AI)' },
  { id: 'm9', client: 'Fonds Souverain CEDEAO', secteur: 'Public', mission: 'Due Diligence ESG Portefeuille', statut: 'Dans les délais', progression: 40, deadline: '2026-08-20', agentLead: 'AG8 (ESG AI)' },
  { id: 'm10', client: 'Telco Mobile Africa', secteur: 'Télécom', mission: 'Stratégie Expansion UEMOA', statut: 'Dans les délais', progression: 55, deadline: '2026-09-01', agentLead: 'AG1 (Strategy AI)' },
  { id: 'm11', client: 'BK Holding', secteur: 'Banque', mission: 'Optimisation Fiscale Groupe', statut: 'Dans les délais', progression: 70, deadline: '2026-07-10', agentLead: 'AG6 (Tax AI)' },
  { id: 'm12', client: 'Africa Green Energy', secteur: 'Énergie', mission: 'Levée de Fonds Series B', statut: 'Dans les délais', progression: 25, deadline: '2026-10-01', agentLead: 'AG11 (BD AI)' },
];

// ─── CRITICAL ALERTS ───
export const CRITICAL_ALERTS: CriticalAlert[] = [
  { id: 'a1', niveau: 'ROUGE', message: '5 alertes critiques en attente — seuil acceptable dépassé. Task force mobilisée.', date: '2026-06-23', source: 'KOS Alert System', action: 'Résolution sous 4h' },
  { id: 'a2', niveau: 'ROUGE', message: 'COBAC — Nouvelle Circulaire Contrôle Interne publiée. Impact : tous les établissements CEMAC. Délai 6 mois.', date: '2026-06-05', source: 'AG3 (Compliance AI)', action: 'Analyse et plan d\'action sous 7j' },
  { id: 'a3', niveau: 'ORANGE', message: 'Mission MicroFin Afrique — En retard de 7 jours. Progression : 45%.', date: '2026-06-08', source: 'AG13 (Client Success AI)', action: 'Renfort AG4 + point client 48h' },
  { id: 'a4', niveau: 'ORANGE', message: 'GAFI — Recommandation 15 révisée (crypto-actifs). Transposition UEMOA/CEMAC attendue.', date: '2026-05-28', source: 'AG4 (AML AI)', action: 'Note d\'analyse sous 15j' },
  { id: 'a5', niveau: 'ORANGE', message: 'Risque concentration client — 2 clients > 15% CA chacun.', date: '2026-06-19', source: 'AG2 (Risk AI)', action: 'Diversification portefeuille T3' },
  { id: 'a6', niveau: 'JAUNE', message: 'Pipeline Q2 à 85% de l\'objectif. 3 opportunités majeures en attente.', date: '2026-06-07', source: 'AG11 (BD AI)', action: 'Accélération closing' },
  { id: 'a7', niveau: 'JAUNE', message: 'Délai réponse AO 3.2j — cible 2j pour avantage compétitif.', date: '2026-06-19', source: 'KOS Tender Engine', action: 'KOS Auto-Response activé' },
  { id: 'a8', niveau: 'JAUNE', message: 'Leads mensuels 72 — sous objectif 90. Renforcer SEO + LinkedIn.', date: '2026-06-19', source: 'AG11 (BD AI)', action: 'Campagne LinkedIn Q3' },
];

// ─── AGENT PERFORMANCE ───
export const AGENT_PERFORMANCE: AgentScore[] = [
  { agent: 'AG7 (Audit AI)', score: 96, livrables: 8, delais: 100 },
  { agent: 'AG3 (Compliance AI)', score: 95, livrables: 12, delais: 95 },
  { agent: 'AG4 (AML AI)', score: 93, livrables: 5, delais: 85 },
  { agent: 'AG5 (TP AI)', score: 94, livrables: 4, delais: 100 },
  { agent: 'AG6 (Tax AI)', score: 92, livrables: 6, delais: 90 },
  { agent: 'AG1 (Strategy AI)', score: 95, livrables: 7, delais: 95 },
  { agent: 'AG2 (Risk AI)', score: 91, livrables: 9, delais: 88 },
  { agent: 'AG11 (BD AI)', score: 90, livrables: 15, delais: 92 },
  { agent: 'AG12 (Proposal AI)', score: 89, livrables: 10, delais: 85 },
  { agent: 'AG13 (Client Success AI)', score: 93, livrables: 6, delais: 98 },
  { agent: 'AG8 (ESG AI)', score: 94, livrables: 7, delais: 90 },
  { agent: 'AG9 (Innovation AI)', score: 88, livrables: 4, delais: 85 },
  { agent: 'AG10 (SEO AI)', score: 97, livrables: 22, delais: 98 },
  { agent: 'AG14 (Social AI)', score: 91, livrables: 18, delais: 92 },
  { agent: 'AG15 (PMO AI)', score: 93, livrables: 11, delais: 96 },
];

// ─── COMMAND DIMENSIONS ───
export const COMMAND_DIMENSIONS: CommandDimensionSummary[] = [
  { id: 'seo', name: 'SEO', icon: 'ri-search-eye-line', status: 'conforme', score: 94, target: 97, trend: 'up', trendValue: '+4 pts', alertsCount: 2, description: '312 pages indexées, 89 mots-clés Top 10, trafic 28 500/mois' },
  { id: 'geo', name: 'GEO', icon: 'ri-radar-line', status: 'conforme', score: 92, target: 95, trend: 'up', trendValue: '+3 pts', alertsCount: 1, description: '52 featured snippets, présence ChatGPT/Perplexity/Gemini' },
  { id: 'publications', name: 'Publications', icon: 'ri-book-open-line', status: 'conforme', score: 90, target: 95, trend: 'up', trendValue: '+5 pts', alertsCount: 1, description: '14 livres blancs/an, 28 études, 487 citations académiques' },
  { id: 'conformite', name: 'Conformité', icon: 'ri-shield-check-line', status: 'conforme', score: 96, target: 98, trend: 'up', trendValue: '+2 pts', alertsCount: 1, description: '52 textes couverts, 0 non-conformité critique' },
  { id: 'risques', name: 'Risques', icon: 'ri-alert-line', status: 'surveillance', score: 82, target: 90, trend: 'stable', trendValue: '=', alertsCount: 3, description: '18 risques identifiés, 3 sous surveillance, 0 critique' },
  { id: 'ia', name: 'IA & Agents', icon: 'ri-cpu-line', status: 'conforme', score: 95, target: 97, trend: 'up', trendValue: '+3 pts', alertsCount: 1, description: '68 agents actifs, 12 modèles, alignement ISO 42001' },
  { id: 'leads', name: 'Leads', icon: 'ri-user-add-line', status: 'surveillance', score: 80, target: 88, trend: 'up', trendValue: '+6 pts', alertsCount: 2, description: '72 leads/mois, conversion MQL→SQL 38%, pipeline 680M' },
  { id: 'opportunites', name: 'Opportunités', icon: 'ri-lightbulb-line', status: 'conforme', score: 88, target: 92, trend: 'up', trendValue: '+5 pts', alertsCount: 1, description: '547 opportunités/an, 51 AO, win rate 42%' },
  { id: 'revenus', name: 'Revenus', icon: 'ri-funds-line', status: 'conforme', score: 91, target: 95, trend: 'up', trendValue: '+8 pts', alertsCount: 1, description: 'CA YTD 425M FCFA, objectif 1.2B, marge 68%, EBITDA 42%' },
  { id: 'alertes', name: 'Alertes', icon: 'ri-notification-3-line', status: 'action', score: 75, target: 90, trend: 'down', trendValue: '-3 pts', alertsCount: 2, description: '12 alertes actives dont 5 critiques' },
];

// ─── MEDIA FACTORIES ───
export const MEDIA_FACTORIES: MediaFactorySummary[] = [
  { id: 'knowledge', hubNumber: 92, name: 'Knowledge Factory', shortName: 'Knowledge', icon: 'ri-brain-line', status: 'operational', healthScore: 95, qualityScore: 95, complianceScore: 98, automationRate: 85, outputCount: 2840, outputLabel: 'assets', alertsCount: 0, route: '/kos-knowledge-factory', description: 'Production de connaissances réglementaires Big Four — 12 domaines, 2840 assets' },
  { id: 'podcast', hubNumber: 93, name: 'Podcast Factory', shortName: 'Podcast', icon: 'ri-mic-line', status: 'operational', healthScore: 93, qualityScore: 93, complianceScore: 95, automationRate: 82, outputCount: 156, outputLabel: 'épisodes', alertsCount: 0, route: '/kos-podcast-factory', description: 'Chaîne industrielle de podcasts institutionnels — 156 épisodes' },
  { id: 'interview', hubNumber: 94, name: 'Interview Factory', shortName: 'Interview', icon: 'ri-chat-3-line', status: 'operational', healthScore: 92, qualityScore: 94, complianceScore: 96, automationRate: 78, outputCount: 89, outputLabel: 'interviews', alertsCount: 0, route: '/kos-interview-factory', description: 'Interviews d\'experts virtuels — 6 rôles Big Four' },
  { id: 'canva', hubNumber: 95, name: 'Canva Factory', shortName: 'Canva', icon: 'ri-paint-brush-line', status: 'operational', healthScore: 94, qualityScore: 92, complianceScore: 94, automationRate: 80, outputCount: 1200, outputLabel: 'templates', alertsCount: 0, route: '/kos-canva-factory', description: 'Bibliothèque graphique 1200 templates — identité visuelle KHEPRA' },
  { id: 'ppt', hubNumber: 96, name: 'PowerPoint Factory', shortName: 'PPT', icon: 'ri-slideshow-3-line', status: 'operational', healthScore: 93, qualityScore: 91, complianceScore: 93, automationRate: 75, outputCount: 420, outputLabel: 'présentations', alertsCount: 0, route: '/kos-powerpoint-factory', description: 'Présentations exécutives automatiques — 5 audiences × 4 formats' },
  { id: 'video', hubNumber: 97, name: 'Video Factory', shortName: 'Video', icon: 'ri-film-line', status: 'operational', healthScore: 91, qualityScore: 90, complianceScore: 92, automationRate: 72, outputCount: 340, outputLabel: 'vidéos', alertsCount: 0, route: '/kos-video-factory', description: 'Production vidéo automatique — storyboards × SEO' },
  { id: 'voice', hubNumber: 98, name: 'Voice Factory', shortName: 'Voice', icon: 'ri-voiceprint-line', status: 'operational', healthScore: 96, qualityScore: 97, complianceScore: 98, automationRate: 88, outputCount: 520, outputLabel: 'pistes audio', alertsCount: 0, route: '/kos-voice-factory', description: 'Identité audio KHEPRA — 4 voix signature, guide tonal' },
  { id: 'youtube', hubNumber: 99, name: 'YouTube Factory', shortName: 'YouTube', icon: 'ri-youtube-line', status: 'operational', healthScore: 90, qualityScore: 88, complianceScore: 91, automationRate: 70, outputCount: 240, outputLabel: 'vidéos YT', alertsCount: 1, route: '/kos-youtube-factory', description: 'Usine YouTube autonome @KHEPRAEXPERTS — pipeline 7 étapes' },
];

// ─── COMPLIANCE SUMMARY ───
export const COMPLIANCE_SUMMARY: ComplianceSummary = {
  frameworks: [
    { name: 'BCEAO', authority: 'Banque Centrale', status: 'compliant', score: 98 },
    { name: 'COBAC', authority: 'Commission Bancaire', status: 'compliant', score: 94 },
    { name: 'GAFI', authority: 'Groupe d\'Action', status: 'compliant', score: 96 },
    { name: 'RGPD/UEMOA', authority: 'Protection Données', status: 'compliant', score: 97 },
    { name: 'Droit Auteur OAPI', authority: 'Propriété Intellectuelle', status: 'compliant', score: 95 },
    { name: 'WCAG 2.1 AA', authority: 'Accessibilité Web', status: 'partial', score: 88 },
  ],
  globalRate: 95.5,
  pendingActions: 2,
  compliant: 5,
  total: 6,
};

// ─── SYSTEM HEALTH ───
export const SYSTEM_HEALTH: SystemHealth = {
  edgeFunctionsActive: 98,
  edgeFunctionsTotal: 98,
  cronJobsActive: 32,
  cronJobsTotal: 32,
  tablesTotal: 248,
  agentsDeployed: 75,
  agentsInProduction: 75,
  uptime30d: 99.99,
  deployments7d: 22,
};

// ─── COMMANDER'S INTENT ───
export const COMMANDER_INTENT: CommanderIntent = {
  date: '2026-06-23',
  summary: 'KOS en production totale depuis le 22 Juin 2026. 78 hubs, 75 agents, 98 Edge Functions, 269 tâches exécutées, 7 blocs Global Launch complétés. Score système 10.0/10. Focus du jour : consolidation post-go-live, monitoring des 8 factories médias, préparation UPG-1 (120% Big Four Upgrade). Aucune alerte critique — le système est stable et auto-piloté.',
  priorityActions: [
    'Poursuivre le monitoring post-go-live — tous les health checks au vert',
    'Activer UPG-1 Fondations 120% — 7 tâches restantes à compléter',
    'Audit de performance Core Web Vitals — cible Mobile 95+',
    'Préparer rapport exécutif Big Four Audit Phase 10',
  ],
  decisionsRequired: [
    'Arbitrage calendrier UPG-1 vs UPG-2 — priorisation Q3 2026',
    'Validation roadmap ISO 42001 — audit externe Q3',
  ],
  author: 'KOS Ultimate Cockpit™ — Automaton Engine v3.1',
};



