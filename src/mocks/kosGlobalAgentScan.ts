export interface AgentPerformance {
  agentId: string;
  agentName: string;
  domainId: string;
  domainName: string;
  icon: string;
  color: string;
  healthScore: number;
  bigFourScore: number;
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  fixedIssues: number;
  autoFixable: number;
  lastScan: string;
  description: string;
  hubUrl: string;
  correctiveActions: CorrectiveAction[];
}

export interface CorrectiveAction {
  actionId: string;
  title: string;
  description: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'in_progress' | 'fixed' | 'pending_block';
  autoFixAvailable: boolean;
  estimatedEffort: string;
  impactEstimate: string;
  assignedAgent: string;
}

export interface DomainSummary {
  domainId: string;
  domainName: string;
  icon: string;
  color: string;
  agentCount: number;
  avgHealthScore: number;
  avgBigFourScore: number;
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  fixedIssues: number;
  autoFixable: number;
  agentsOptimal: number;
  agentsStable: number;
  agentsDegraded: number;
  agentsCritical: number;
}

export interface BlockCorrectiveManifest {
  blockId: string;
  blockName: string;
  description: string;
  targetDomains: string[];
  totalAgentsAffected: number;
  totalActions: number;
  criticalActions: number;
  majorActions: number;
  autoFixableActions: number;
  estimatedTotalEffort: string;
  globalImpact: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export const DOMAIN_SUMMARIES: DomainSummary[] = [
  { domainId: 'direction-strategie', domainName: 'Direction & Stratégie', icon: 'ri-government-line', color: '#4F46E5', agentCount: 11, avgHealthScore: 99, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 68, autoFixable: 0, agentsOptimal: 11, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'qualite-production', domainName: 'Qualité & Production', icon: 'ri-verified-badge-line', color: '#5B21B6', agentCount: 12, avgHealthScore: 99, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 88, autoFixable: 0, agentsOptimal: 12, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'seo-geo-visibilite', domainName: 'SEO, GEO & Visibilité', icon: 'ri-globe-line', color: '#0891B2', agentCount: 11, avgHealthScore: 99, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 142, autoFixable: 0, agentsOptimal: 11, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'securite-conformite', domainName: 'Sécurité & Conformité', icon: 'ri-shield-flash-line', color: '#C2410C', agentCount: 10, avgHealthScore: 100, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 74, autoFixable: 0, agentsOptimal: 10, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'data-intelligence', domainName: 'Data & Intelligence', icon: 'ri-bar-chart-box-line', color: '#9B7B2C', agentCount: 11, avgHealthScore: 99, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 66, autoFixable: 0, agentsOptimal: 11, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'croissance-crm', domainName: 'Croissance & CRM', icon: 'ri-rocket-line', color: '#4A7A1E', agentCount: 10, avgHealthScore: 99, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 96, autoFixable: 0, agentsOptimal: 10, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
  { domainId: 'infrastructure-automatisation', domainName: 'Infrastructure & Automatisation', icon: 'ri-cpu-line', color: '#86BC25', agentCount: 10, avgHealthScore: 100, avgBigFourScore: 100, totalIssues: 0, criticalIssues: 0, majorIssues: 0, fixedIssues: 68, autoFixable: 0, agentsOptimal: 10, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0 },
];

export const BLOCK_CORRECTIVE_MANIFESTS: BlockCorrectiveManifest[] = [
  {
    blockId: 'block-seo-aeo', blockName: 'Bloc SEO + AEO — Correction Urgente',
    description: 'CIELS ATTEINTS & DÉPASSÉS. FAQ Schema 100% (45 pages), 48 H2 AEO reformulés, 48 réponses concises, HowTo Schema 8 pages, 18 tableaux HTML, 185 images alt, 0 image sans alt. SEO 9.8/10, AEO 9.5/10.',
    targetDomains: ['seo-geo-visibilite'], totalAgentsAffected: 8, totalActions: 15, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'Score AEO 3.1 → 9.5, SEO 7.0 → 9.8, Featured Snippets ×3, 11/11 agents Optimaux', status: 'completed',
  },
  {
    blockId: 'block-qualite-contenu', blockName: 'Bloc Qualité Contenu — Standardisation Big Four',
    description: 'CIELS ATTEINTS & CONSOLIDÉS. 100% articles CTA Big Four, ton institutionnel certifié, 30 articles/mois (cible 25 dépassée), POV thought leadership 100%, 12 lead magnets actifs, nurturing MQL→SQL 15%.',
    targetDomains: ['qualite-production', 'croissance-crm'], totalAgentsAffected: 6, totalActions: 12, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'Conversion blog ×4, cadencement 30/mois, 250 leads/mois, MQL→SQL 15%', status: 'completed',
  },
  {
    blockId: 'block-conformite-reglementaire', blockName: 'Bloc Conformité Réglementaire — Mise à Niveau',
    description: 'CIELS ATTEINTS. ISO 27001:2022 100% conforme (114/114 contrôles), EU AI Act 100%, RGPD 100%, ISO 42001 certifié, COBAC R-2024/01 intégré, ESG Scope 3 conforme, WAF 100% A+, OWASP Top 10 100%.',
    targetDomains: ['securite-conformite'], totalAgentsAffected: 7, totalActions: 10, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'ISO 27001 certifié, EU AI Act Art.14 compliant, ISO 42001 certifié, COBAC 100%, RGPD 100%, WAF A+', status: 'completed',
  },
  {
    blockId: 'block-croissance-conversion', blockName: 'Bloc Croissance & Conversion — Accélération',
    description: 'CIELS ATTEINTS & DÉPASSÉS. Win rate 42% (cible Big Four 40%), MQL→SQL 16% (cible 15%), nurturing ouverture 28%, onboarding 100% NPS 9.4, pipeline 3.9 Md FCFA.',
    targetDomains: ['croissance-crm'], totalAgentsAffected: 6, totalActions: 14, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'Win rate 28→42%, MQL→SQL 8→16%, nurturing 12→28%, pipeline 3.9 Md FCFA', status: 'completed',
  },
  {
    blockId: 'block-infrastructure-resilience', blockName: 'Bloc Infrastructure & Résilience — Consolidation',
    description: 'CIELS ATTEINTS & DÉPASSÉS. WAF 100% A+, SOC 100% monitoring, cron 100% fiabilité zéro échec 30j, bundle JS -380 Ko, Twin CI 85% précision, consultants 85% utilisation.',
    targetDomains: ['infrastructure-automatisation', 'securite-conformite'], totalAgentsAffected: 6, totalActions: 8, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'WAF A+, SOC 100%, cron 100% 30j, JS -380 Ko, Twin CI 85%, consultants 85%', status: 'completed',
  },
  {
    blockId: 'block-visibilite-institutionnelle', blockName: 'Bloc Visibilité Institutionnelle — Accélération',
    description: 'CIELS ATTEINTS & DÉPASSÉS. DA 48 (cible Big Four 45+ dépassée), LinkedIn 35 posts/mois, backlinks 42 actifs, baromètre BCEAO flagship, 560 opportunités/an (cible 500 dépassée), 38 URLs indexées.',
    targetDomains: ['seo-geo-visibilite', 'croissance-crm'], totalAgentsAffected: 5, totalActions: 10, criticalActions: 0, majorActions: 0, autoFixableActions: 0,
    estimatedTotalEffort: 'Terminé', globalImpact: 'DA 28→48 (+20 pts), LinkedIn ×4, backlinks 18→42 (×2.3), 560 opportunités/an', status: 'completed',
  },
];

export const GLOBAL_SCAN_STATS = {
  totalAgents: 75, agentsScanned: 75,
  agentsOptimal: 75, agentsStable: 0, agentsDegraded: 0, agentsCritical: 0,
  totalIssues: 0, criticalOpen: 0, majorOpen: 0, minorOpen: 0,
  totalFixed: 716, autoFixable: 0, requireManual: 0,
  avgHealthScore: 100.0, avgBigFourScore: 100.0,
  domainsOptimal: 7, domainsStable: 0, domainsDegraded: 0,
  totalCorrectiveBlocks: 6, correctiveBlocksInProgress: 0, correctiveBlocksPending: 0,
  estimatedGlobalEffort: 'Terminé — Certification AAAA BIG FOUR SUPREME EXCELLENCE 100%',
  lastFullScan: '2026-06-19T19:00:00Z', nextFullScan: '2026-06-20T06:00:00Z',
};