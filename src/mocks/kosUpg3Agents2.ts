// BLOC 10 UPG-3 — KOS Agents 2.0 & Automatisation Anticipative
// 150 agents, taux anticipation 85%, cockpit d'exécution live

export interface Agent2Profile {
  id: string;
  agentCode: string;
  name: string;
  domain: string;
  category: string;
  generation: '1.0' | '2.0';
  status: 'supra_optimal' | 'optimal' | 'stable' | 'degraded' | 'critical';
  anticipationScore: number; // 0-100 — capacité à agir avant l'événement
  executionScore: number;    // qualité d'exécution
  autonomyLevel: 'L1' | 'L2' | 'L3' | 'L4' | 'L5'; // L5 = full autonomous
  tasksThisMonth: number;
  avgLatencyMs: number;
  errorRate: number; // %
  anticipativeActionsThisWeek: number;
  lastUpgrade: string;
  upgradeStatus: 'upgraded' | 'in_progress' | 'scheduled' | 'pending';
  capabilities: string[];
}

export interface AnticipativeAutomation {
  id: string;
  automationName: string;
  trigger: string;
  domain: string;
  anticipationWindow: string; // "8h avant", "48h avant", etc.
  actionsCount: number;
  successRate: number;
  lastTriggered: string;
  status: 'active' | 'paused' | 'testing';
  agentsInvolved: string[];
  impactScore: number; // 1-10
  category: 'regulatory' | 'commercial' | 'quality' | 'security' | 'knowledge' | 'growth';
}

export interface UpgradeExecution {
  id: string;
  upgradeRef: string;
  phase: string;
  agentsUpgraded: number;
  agentsTarget: number;
  completionPercent: number;
  status: 'completed' | 'in_progress' | 'scheduled';
  startDate: string;
  expectedEnd: string;
  gains: string[];
  blockers: string[];
}

export interface Upg3KPI {
  label: string;
  value: string | number;
  target: string | number;
  unit: string;
  delta: string;
  status: 'above' | 'at' | 'below';
  icon: string;
}

// ============================================================
// 150 AGENTS 2.0 — 10 domains × 15 agents
// ============================================================
const AGENT_DOMAINS = [
  { domain: 'Régulation & Conformité', color: 'primary', prefix: 'RC' },
  { domain: 'Intelligence Marché', color: 'accent', prefix: 'IM' },
  { domain: 'Qualité & Production', color: 'secondary', prefix: 'QP' },
  { domain: 'Sécurité & Cyber', color: 'primary', prefix: 'SC' },
  { domain: 'SEO & Visibilité', color: 'accent', prefix: 'SV' },
  { domain: 'Croissance & CRM', color: 'secondary', prefix: 'CC' },
  { domain: 'Gouvernance IA', color: 'primary', prefix: 'GI' },
  { domain: 'Knowledge & Research', color: 'accent', prefix: 'KR' },
  { domain: 'Automatisation Ops', color: 'secondary', prefix: 'AO' },
  { domain: 'Direction Stratégique', color: 'primary', prefix: 'DS' },
];

const AGENT_NAMES_BY_DOMAIN: Record<string, string[]> = {
  'RC': ['Regulatory Scout 2.0', 'BCEAO Compliance Monitor', 'COBAC Directive Tracker', 'GAFI AML Sentinel', 'OHADA Legal Watcher', 'SFD Prudential Agent', 'Sanctions Screener', 'LBC/FT Auto-Classifier', 'Audit Evidence Collector', 'Compliance Gap Detector', 'Regulatory Citation Verifier', 'Supervision Calendar Manager', 'Circular Auto-Parser', 'Fintech Agrement Tracker', 'CEMAC Regulator Bot'],
  'IM': ['Market Signal Detector', 'Competitor Intel Agent', 'Tender Discovery Bot', 'Donor Opportunity Scanner', 'Pipeline Velocity Monitor', 'Lead Intent Predictor', 'Cross-sell Opportunity Finder', 'Sector Trend Analyst', 'Client Health Monitor', 'Win/Loss Pattern Analyzer', 'Proposal Success Predictor', 'Pricing Intelligence Agent', 'Geographic Expansion Scout', 'Partnership Fit Scorer', 'Revenue Forecast Updater'],
  'QP': ['Deliverable Quality Gatekeeper', 'Big Four Standard Enforcer', 'Peer Review Scheduler', 'Executive Summary Generator', 'Citation Validator', 'Editorial Calendar Manager', 'Blog Factory Driver', 'White Paper Producer', 'Case Study Extractor', 'Framework Builder', 'Content Humanizer', 'SEO Content Optimizer', 'Translation Quality Checker', 'Visual Asset Generator', 'Publication Gate Agent'],
  'SC': ['OWASP Continuous Scanner', 'SOC L1 Alert Monitor', 'Threat Intelligence Feeder', 'ISO 27001 Control Checker', 'Zero Trust Policy Enforcer', 'Incident Response Trigger', 'WAF Rule Optimizer', 'PCA/PRA Test Scheduler', 'Certificate Renewal Monitor', 'DDoS Pattern Detector', 'Access Anomaly Detector', 'SIEM Alert Correlator', 'Forensic Log Collector', 'Vulnerability Patch Prioritizer', 'Security KPI Reporter'],
  'SV': ['Core Web Vitals Optimizer', 'Featured Snippet Harvester', 'Schema Markup Validator', 'AEO Question Generator', 'Backlink Prospector', 'GSC Opportunity Miner', 'Sitemap Auto-Refresher', 'Internal Link Optimizer', 'Keyword Cannibalization Fixer', 'GEO Citation Tracker', 'AI Crawler Visibility Agent', 'Local SEO Geo Booster', 'EEAT Authority Builder', 'Multilingual SEO Expander', 'CTR Optimization Agent'],
  'CC': ['Lead Score Auto-Updater', 'Deal Stage Advancer', 'Churn Risk Predictor', 'Nurturing Sequence Optimizer', 'Email Open Rate Analyzer', 'CTA Performance Tracker', 'Onboarding Journey Manager', 'NPS Survey Trigger', 'Cross-sell Recommendation Bot', 'Client Retention Alert', 'Revenue Gap Hunter', 'Proposal Follow-up Scheduler', 'Meeting Prep Agent', 'Contract Renewal Alerter', 'Account Health Scorer'],
  'GI': ['AI Model Auditor', 'Hallucination Detector 2.0', 'Prompt Quality Scorer', 'Bias Assessment Agent', 'Explainability Reporter', 'ISO 42001 Tracker', 'EU AI Act Monitor', 'Model Drift Detector', 'Training Data Verifier', 'AI Risk Classifier', 'Ethics Board Agenda Manager', 'AI Incident Logger', 'Sovereignty Level Tracker', 'Knowledge Validation Agent', 'Source Verification Bot'],
  'KR': ['RAG Document Indexer', 'Knowledge Graph Expander', 'Regulatory Memory Curator', 'Best Practice Capturer', 'Lesson Learned Extractor', 'Think Tank Publisher', 'Research Synthesis Agent', 'Citation Impact Tracker', 'Embedding Quality Monitor', 'Semantic Search Optimizer', 'Knowledge Gap Identifier', 'Expert Profile Updater', 'Academic Partner Liaison', 'Thought Leadership Scorer', 'Content Lifecycle Manager'],
  'AO': ['Workflow Auto-Optimizer', 'SOP Version Sync Agent', 'Cron Job Health Monitor', 'Dead Letter Queue Handler', 'Circuit Breaker Manager', 'API Latency Watchdog', 'Pipeline State Machine', 'Auto-Recovery Trigger', 'Deployment Validation Bot', 'Infrastructure Health Scanner', 'Log Aggregation Agent', 'Cost Optimization Monitor', 'Capacity Planner Bot', 'Backup Orchestrator', 'Performance Benchmark Runner'],
  'DS': ['CEO Briefing Composer', 'Board Pack Generator', 'Strategic Alert Synthesizer', 'KPI Dashboard Updater', 'Scenario Planning Agent', 'Resource Allocation Optimizer', 'Expansion Scout (54 pays)', 'Partner Ecosystem Manager 2.0', 'Brand Authority Monitor', 'Executive Communication Drafter', 'COMEX Reporting Automator', 'Investor Relations Agent', 'Talent Intelligence Scout', 'Legacy Knowledge Preserver', 'Vision Alignment Validator'],
};

function buildAgents(): Agent2Profile[] {
  const agents: Agent2Profile[] = [];
  let idx = 1;
  AGENT_DOMAINS.forEach(({ domain, prefix }) => {
    const names = AGENT_NAMES_BY_DOMAIN[prefix];
    names.forEach((name, i) => {
      const isGen2 = true; // UPG-3.3 ✅ — tous les 150 agents Gen 2.0
      const anticipation = 72 + Math.floor(i * 2.5);
      const execution = 88 + Math.floor(i * 1.2);
      agents.push({
        id: `agent-${idx}`,
        agentCode: `KOS-${prefix}-${String(idx).padStart(3, '0')}`,
        name,
        domain,
        category: prefix === 'RC' ? 'Conformité' : prefix === 'IM' ? 'Intelligence' : prefix === 'QP' ? 'Qualité' : prefix === 'SC' ? 'Sécurité' : prefix === 'SV' ? 'SEO/GEO' : prefix === 'CC' ? 'CRM' : prefix === 'GI' ? 'Gouvernance IA' : prefix === 'KR' ? 'Connaissance' : prefix === 'AO' ? 'Opérations' : 'Direction',
        generation: '2.0',
        status: anticipation > 90 ? 'supra_optimal' : 'optimal',
        anticipationScore: Math.min(100, anticipation),
        executionScore: Math.min(100, execution),
        autonomyLevel: i < 5 ? 'L5' : 'L4',
        tasksThisMonth: 1200 + i * 85,
        avgLatencyMs: 45 + i * 8,
        errorRate: 0.1 + i * 0.05,
        anticipativeActionsThisWeek: 28 + i * 3,
        lastUpgrade: '2026-06-25',
        upgradeStatus: 'upgraded',
        capabilities: i < 5
          ? ['Anticipation T-8h', 'Auto-correction', 'Feedback Loop', 'Apprentissage continu', 'Collaboration multi-agents', 'Autonomie L5']
          : ['Anticipation T-8h', 'Auto-correction', 'Feedback Loop', 'Apprentissage continu', 'Collaboration multi-agents'],
      });
      idx++;
    });
  });
  return agents;
}

export const agents2Profiles: Agent2Profile[] = buildAgents();

// ============================================================
// ANTICIPATIVE AUTOMATIONS — 20 automations proactives
// ============================================================
export const anticipativeAutomations: AnticipativeAutomation[] = [
  { id: 'aa-01', automationName: 'BCEAO Alert Pre-Compliance', trigger: 'Détection nouvelle instruction BCEAO → alerte conformité 30 jours avant deadline', domain: 'Conformité Réglementaire', anticipationWindow: '30 jours avant', actionsCount: 847, successRate: 97.2, lastTriggered: '2026-06-24', status: 'active', agentsInvolved: ['Regulatory Scout 2.0', 'BCEAO Compliance Monitor', 'Circular Auto-Parser'], impactScore: 9.8, category: 'regulatory' },
  { id: 'aa-02', automationName: 'Tender Intelligence Pre-Response', trigger: 'Score AO ≥ 80 → génération automatique dossier préliminaire 5 jours avant clôture', domain: 'Business Development', anticipationWindow: '5 jours avant', actionsCount: 312, successRate: 88.4, lastTriggered: '2026-06-23', status: 'active', agentsInvolved: ['Tender Discovery Bot', 'Proposal Success Predictor', 'Deal Stage Advancer'], impactScore: 9.5, category: 'commercial' },
  { id: 'aa-03', automationName: 'Lead Churn Prevention', trigger: 'Score churn > 65% → activation nurturing intensif 7 jours avant inactivité critique', domain: 'CRM & Growth', anticipationWindow: '7 jours avant', actionsCount: 1205, successRate: 91.8, lastTriggered: '2026-06-25', status: 'active', agentsInvolved: ['Churn Risk Predictor', 'Nurturing Sequence Optimizer', 'Client Retention Alert'], impactScore: 8.7, category: 'growth' },
  { id: 'aa-04', automationName: 'Quality Gate Pre-Publication', trigger: 'Contenu en file → vérification anti-hallucination 2h avant publication automatique', domain: 'Qualité Editorial', anticipationWindow: '2h avant', actionsCount: 4328, successRate: 99.7, lastTriggered: '2026-06-25', status: 'active', agentsInvolved: ['Deliverable Quality Gatekeeper', 'Citation Validator', 'Hallucination Detector 2.0'], impactScore: 10.0, category: 'quality' },
  { id: 'aa-05', automationName: 'Cyber Threat Pre-Mitigation', trigger: 'Signature attaque connue dans les logs → isolation préventive 30min avant impact', domain: 'Sécurité', anticipationWindow: '30 min avant', actionsCount: 189, successRate: 94.7, lastTriggered: '2026-06-22', status: 'active', agentsInvolved: ['Threat Intelligence Feeder', 'Incident Response Trigger', 'DDoS Pattern Detector'], impactScore: 9.9, category: 'security' },
  { id: 'aa-06', automationName: 'SEO Ranking Drop Prevention', trigger: 'Core Web Vitals dégradation → optimisation auto 24h avant impact ranking', domain: 'SEO Performance', anticipationWindow: '24h avant', actionsCount: 742, successRate: 86.3, lastTriggered: '2026-06-24', status: 'active', agentsInvolved: ['Core Web Vitals Optimizer', 'GSC Opportunity Miner', 'CTR Optimization Agent'], impactScore: 8.2, category: 'knowledge' },
  { id: 'aa-07', automationName: 'COBAC Inspection Pre-Preparation', trigger: 'Mission COBAC détectée dans les registres → checklist préparation 90 jours avant', domain: 'Audit & Inspection', anticipationWindow: '90 jours avant', actionsCount: 28, successRate: 100.0, lastTriggered: '2026-05-15', status: 'active', agentsInvolved: ['COBAC Directive Tracker', 'Audit Evidence Collector', 'Board Pack Generator'], impactScore: 10.0, category: 'regulatory' },
  { id: 'aa-08', automationName: 'Contract Renewal Alert Chain', trigger: 'Contrat mission à < 60 jours → déclenchement chain renouvellement multi-étapes', domain: 'Commercial', anticipationWindow: '60 jours avant', actionsCount: 156, successRate: 92.3, lastTriggered: '2026-06-18', status: 'active', agentsInvolved: ['Contract Renewal Alerter', 'Proposal Follow-up Scheduler', 'CEO Briefing Composer'], impactScore: 9.1, category: 'commercial' },
  { id: 'aa-09', automationName: 'Knowledge Drift Detection', trigger: 'Texte réglementaire modifié → re-indexation RAG et invalidation cache citations 1h après détection', domain: 'Knowledge Management', anticipationWindow: 'Réactif (1h)', actionsCount: 2104, successRate: 97.8, lastTriggered: '2026-06-25', status: 'active', agentsInvolved: ['RAG Document Indexer', 'Regulatory Memory Curator', 'Source Verification Bot'], impactScore: 9.6, category: 'knowledge' },
  { id: 'aa-10', automationName: 'AI Ethics Pre-Review', trigger: 'Nouvel agent à déployer → revue éthique automatique 5 jours avant mise en production', domain: 'Gouvernance IA', anticipationWindow: '5 jours avant', actionsCount: 48, successRate: 100.0, lastTriggered: '2026-06-20', status: 'active', agentsInvolved: ['AI Model Auditor', 'Bias Assessment Agent', 'ISO 42001 Tracker'], impactScore: 9.3, category: 'regulatory' },
  { id: 'aa-11', automationName: 'LinkedIn Peak Timing Optimizer', trigger: 'Score engagement prédit > 80% sur H+2 → publication automatique optimisée', domain: 'Social Selling', anticipationWindow: '2h avant', actionsCount: 628, successRate: 83.4, lastTriggered: '2026-06-25', status: 'active', agentsInvolved: ['LinkedIn Social Selling Engine', 'Brand Authority Monitor'], impactScore: 7.8, category: 'growth' },
  { id: 'aa-12', automationName: 'SFD Capital Warning Pre-Alert', trigger: 'Ratio capital SFD approchant seuil BCEAO → alerte 45 jours avant dépassement', domain: 'Surveillance Prudentielle', anticipationWindow: '45 jours avant', actionsCount: 94, successRate: 96.8, lastTriggered: '2026-06-10', status: 'active', agentsInvolved: ['SFD Prudential Agent', 'BCEAO Compliance Monitor', 'KPI Dashboard Updater'], impactScore: 9.7, category: 'regulatory' },
  { id: 'aa-13', automationName: 'Pipeline Stagnation Intervention', trigger: 'Deal sans activité depuis > 14 jours → déclenchement action commerciale automatique', domain: 'CRM Pipeline', anticipationWindow: '14 jours inactivité', actionsCount: 347, successRate: 79.6, lastTriggered: '2026-06-23', status: 'testing', agentsInvolved: ['Deal Stage Advancer', 'Meeting Prep Agent', 'Revenue Gap Hunter'], impactScore: 8.4, category: 'commercial' },
  { id: 'aa-14', automationName: 'Backlink Opportunity Pre-Capture', trigger: 'Domaine cible publiant article similaire → proposition de collaboration 48h après publication', domain: 'SEO Backlinks', anticipationWindow: '48h après trigger', actionsCount: 183, successRate: 71.2, lastTriggered: '2026-06-21', status: 'active', agentsInvolved: ['Backlink Prospector', 'Content Lifecycle Manager'], impactScore: 7.5, category: 'growth' },
  { id: 'aa-15', automationName: 'GAFI List Update Pre-Screening', trigger: 'Mise à jour listes GAFI détectée → re-screening portefeuille clients dans les 4h', domain: 'LBC/FT', anticipationWindow: '4h après mise à jour', actionsCount: 215, successRate: 99.1, lastTriggered: '2026-06-12', status: 'active', agentsInvolved: ['Sanctions Screener', 'LBC/FT Auto-Classifier', 'GAFI AML Sentinel'], impactScore: 10.0, category: 'regulatory' },
];

// ============================================================
// UPGRADE EXECUTION TRACKER
// ============================================================
export const upg3Executions: UpgradeExecution[] = [
  { id: 'upg3-01', upgradeRef: 'UPG-3.1', phase: 'Anticipative Core Module', agentsUpgraded: 50, agentsTarget: 50, completionPercent: 100, status: 'completed', startDate: '2026-06-01', expectedEnd: '2026-06-15', gains: ['Anticipation average +42 pts', 'Latency -68%', 'Task volume ×2.6'], blockers: [] },
  { id: 'upg3-02', upgradeRef: 'UPG-3.2', phase: 'Collaboration Multi-Agent', agentsUpgraded: 50, agentsTarget: 50, completionPercent: 100, status: 'completed', startDate: '2026-06-16', expectedEnd: '2026-06-25', gains: ['Cross-agent pipelines ×3', 'Error reduction -85%'], blockers: [] },
  { id: 'upg3-03', upgradeRef: 'UPG-3.3', phase: 'Feedback Learning Loops', agentsUpgraded: 50, agentsTarget: 50, completionPercent: 100, status: 'completed', startDate: '2026-06-25', expectedEnd: '2026-06-25', gains: ['Self-improvement continuous', 'Autonomy L5 for 50 agents', '150/150 Gen 2.0'], blockers: [] },
];

// ============================================================
// KPIs GLOBAUX UPG-3
// ============================================================
export const upg3KPIs: Upg3KPI[] = [
  { label: 'Agents 2.0 déployés', value: 150, target: 150, unit: ' agents', delta: 'UPG-3.3 ✅ COMPLÉTÉ', status: 'at', icon: 'ri-robot-2-line' },
  { label: 'Taux Anticipation Moyen', value: 85, target: 85, unit: '%', delta: '+40 pts vs v1.0', status: 'at', icon: 'ri-eye-line' },
  { label: 'Automations Anticipatives', value: 15, target: 20, unit: ' actives', delta: '+15 ce mois', status: 'below', icon: 'ri-flashlight-line' },
  { label: 'Tâches/mois (total)', value: '284K', target: '350K', unit: '', delta: '+185K vs v1.0', status: 'below', icon: 'ri-todo-line' },
  { label: 'Latence Moyenne', value: 87, target: 50, unit: ' ms', delta: '-93ms vs v1.0', status: 'below', icon: 'ri-timer-line' },
  { label: 'Taux Erreur Global', value: 0.31, target: 0.1, unit: '%', delta: '-0.69 pts', status: 'below', icon: 'ri-error-warning-line' },
  { label: 'Agents Autonomie L4+', value: 150, target: 150, unit: '', delta: 'UPG-3.3 ✅', status: 'at', icon: 'ri-shield-star-line' },
  { label: 'Actions Anticipatives/sem', value: 2847, target: 5000, unit: '', delta: 'Peak cette semaine', status: 'below', icon: 'ri-pulse-line' },
];

export const upg3Overview = {
  totalAgents: 150,
  gen2Agents: 150,
  gen1Agents: 0,
  avgAnticipationScore: 85,
  avgExecutionScore: 91,
  anticipativeAutomationsActive: 15,
  totalTasksThisMonth: 284000,
  avgLatencyMs: 87,
  globalErrorRate: 0.31,
  autonomyL4Plus: 150,
  autonomyL5: 50,
  upgradePhases: 3,
  phasesCompleted: 3,
  certificationTarget: 'AAAA+ 150% Transcendant',
  lastUpgradeDate: '2026-06-25',
  nextMilestone: 'UPG-3.3 ✅ COMPLÉTÉ — 150/150 Agents Gen 2.0 Autonomie L4+ (25 Juin 2026)',
};