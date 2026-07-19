// ============================================================
// KOS COMPLETE PERFORMANCE, VISIBILITY, MARKETING DIGITAL,
// LEAD MAGNETS, AMI/AO DETECTION & 120% BIG FOUR UPGRADE
// Cockpit Unifié — Analyse, Diagnostic, Actions & Upgrade
// Consortium PwC · Deloitte · EY · KPMG — Supreme Practice
// Version 2026.06.23 — LIVE
// ============================================================

// ==========================================
// SECTION 1: MÉTRIQUES GLOBALES
// ==========================================
export interface UnifiedDomainScore {
  domainId: string;
  domainName: string;
  icon: string;
  score: number;
  target: number;
  status: 'excellence' | 'avance' | 'intermediaire' | 'emergent' | 'critique';
  trend: number;
  agents: number;
  actions: number;
  completed: number;
  criticalFindings: number;
  budget: string;
  deadline: string;
}

export const UNIFIED_DOMAINS: UnifiedDomainScore[] = [
  {
    domainId: 'perf-digitale',
    domainName: 'Performance & Visibilité Publique',
    icon: 'ri-speed-line',
    score: 48,
    target: 95,
    status: 'critique',
    trend: 14,
    agents: 7,
    actions: 24,
    completed: 5,
    criticalFindings: 3,
    budget: '217 600 000 FCFA',
    deadline: 'Q2 2027',
  },
  {
    domainId: 'marketing-digital',
    domainName: 'Marketing Digital & Social Selling',
    icon: 'ri-megaphone-line',
    score: 62,
    target: 92,
    status: 'emergent',
    trend: 18,
    agents: 8,
    actions: 18,
    completed: 7,
    criticalFindings: 2,
    budget: '85 400 000 FCFA',
    deadline: 'Q1 2027',
  },
  {
    domainId: 'lead-magnets',
    domainName: 'Lead Magnets & Conversion',
    icon: 'ri-magnet-line',
    score: 58,
    target: 90,
    status: 'emergent',
    trend: 22,
    agents: 5,
    actions: 12,
    completed: 4,
    criticalFindings: 1,
    budget: '42 800 000 FCFA',
    deadline: 'Q4 2026',
  },
  {
    domainId: 'ami-ao',
    domainName: 'Détection & Notifications AMI/AO',
    icon: 'ri-radar-line',
    score: 68,
    target: 95,
    status: 'intermediaire',
    trend: 12,
    agents: 6,
    actions: 15,
    completed: 8,
    criticalFindings: 1,
    budget: '68 200 000 FCFA',
    deadline: 'Q1 2027',
  },
  {
    domainId: 'upgrade-120',
    domainName: 'Upgrade 120% Standards Big Four',
    icon: 'ri-rocket-2-line',
    score: 56,
    target: 120,
    status: 'emergent',
    trend: 20,
    agents: 12,
    actions: 24,
    completed: 3,
    criticalFindings: 4,
    budget: '385 000 000 FCFA',
    deadline: 'Q2 2027',
  },
];

export const UNIFIED_GLOBAL_KPIS = {
  globalScore: 58,
  globalTarget: 98,
  globalTrend: 17,
  totalDomains: 5,
  totalAgents: 38,
  totalActions: 93,
  totalCompleted: 27,
  totalCriticalFindings: 11,
  totalBudget: '798 000 000 FCFA',
  roiProjected: '1.85 Md FCFA',
  projectedCompletion: '2027-06-30',
  assessor: 'Consortium PwC · Deloitte · EY · KPMG — Supreme Practice',
  auditDate: '2026-06-23',
  methodology: 'Big Four Supreme Quality Framework + ISO 9001:2026 + EFQM Excellence Model',
  mandate: 'Managing Partner — 23 Juin 2026',
};

// ==========================================
// SECTION 2: PERFORMANCE DIGITALE DÉTAILLÉE
// ==========================================
export interface PerfMetric {
  metric: string;
  current: string;
  target: string;
  score: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  icon: string;
  detail: string;
  action: string;
  deadline: string;
}

export const PERFORMANCE_METRICS: PerfMetric[] = [
  {
    metric: 'LCP (Largest Contentful Paint)',
    current: '4.8s',
    target: '≤ 2.5s',
    score: 32,
    severity: 'critical',
    icon: 'ri-image-line',
    detail: '89 images non optimisées, CSS bloquant, TTFB 1.2s — 2× le seuil Google Good',
    action: 'WebP + CDN + Critical CSS + Lazy loading — 12h',
    deadline: '2026-07-15',
  },
  {
    metric: 'CLS (Cumulative Layout Shift)',
    current: '0.22',
    target: '≤ 0.1',
    score: 48,
    severity: 'high',
    icon: 'ri-layout-masonry-line',
    detail: 'Polices web sans fallback, images sans dimensions explicites, iframes YouTube',
    action: 'Aspect-ratio CSS + width/height + font-display swap — 3h',
    deadline: '2026-08-15',
  },
  {
    metric: 'INP (Interaction to Next Paint)',
    current: '280ms',
    target: '≤ 200ms',
    score: 52,
    severity: 'medium',
    icon: 'ri-cursor-line',
    detail: 'JavaScript long tasks >50ms, event handlers lourds, re-renders React excessifs',
    action: 'Code splitting + debouncing + React.memo + Web Workers — 6h',
    deadline: '2026-09-15',
  },
  {
    metric: 'Score OWASP Global',
    current: '55/100',
    target: '95/100',
    score: 55,
    severity: 'critical',
    icon: 'ri-shield-flash-line',
    detail: '3 vulnérabilités critiques (IDOR, SQLi, XSS), CSP unsafe-inline, 4 headers manquants',
    action: 'Correction IDOR/SQLi/XSS + CSP strict + WAF — 15h',
    deadline: '2026-07-31',
  },
  {
    metric: 'Score SOC 2 Readiness',
    current: '42/100',
    target: '92/100',
    score: 42,
    severity: 'critical',
    icon: 'ri-lock-line',
    detail: '25 politiques non rédigées, MFA non déployé, PCA non testé, Privacy non conforme',
    action: '25 politiques + MFA + PCA + Privacy Policy — 18 mois',
    deadline: 'Q4 2027',
  },
  {
    metric: 'Lighthouse Performance',
    current: '48/100',
    target: '92/100',
    score: 48,
    severity: 'high',
    icon: 'ri-flashlight-line',
    detail: 'Bundle JS 1.8 MB, TTFB 1.2s, Speed Index 5.2s, PWA 45/100',
    action: 'Tree shaking + Edge caching + Brotli + Prefetch — 28h',
    deadline: '2026-10-31',
  },
];

// ==========================================
// SECTION 3: MARKETING DIGITAL
// ==========================================
export interface DigitalMarketingChannel {
  channel: string;
  icon: string;
  score: number;
  target: number;
  audience: number;
  targetAudience: number;
  postsPerMonth: number;
  engagement: number;
  status: 'actif' | 'partiel' | 'bloque' | 'planifie';
  keyIssue: string;
  recommendation: string;
  budget: string;
}

export const DIGITAL_MARKETING_CHANNELS: DigitalMarketingChannel[] = [
  {
    channel: 'LinkedIn (Page Entreprise)',
    icon: 'ri-linkedin-fill',
    score: 68,
    target: 92,
    audience: 12500,
    targetAudience: 50000,
    postsPerMonth: 8,
    engagement: 4.2,
    status: 'partiel',
    keyIssue: 'MDP bloqué depuis 60j — 0 posts programmables, pipeline éditorial à l\'arrêt',
    recommendation: 'Débloquer approbation LinkedIn MDP + activer Social Selling Engine (audit 7 points)',
    budget: '500 000 FCFA',
  },
  {
    channel: 'Content Marketing (Blog)',
    icon: 'ri-article-line',
    score: 82,
    target: 95,
    audience: 58500,
    targetAudience: 85000,
    postsPerMonth: 25,
    engagement: 7.8,
    status: 'actif',
    keyIssue: 'Pipeline 25 articles/mois — cible 30. Lead magnets intégrés à 60% des articles',
    recommendation: 'Accélérer cadence à 30/mois + 100% articles avec CTA contextuel Big Four',
    budget: '18 500 000 FCFA',
  },
  {
    channel: 'Email Nurturing',
    icon: 'ri-mail-line',
    score: 58,
    target: 88,
    audience: 4200,
    targetAudience: 15000,
    postsPerMonth: 12,
    engagement: 3.5,
    status: 'partiel',
    keyIssue: 'Séquences nurturing 5/8 actives, taux ouverture 22% (cible 35%), conversion MQL→SQL 8%',
    recommendation: 'A/B testing objets, segmentation leads, séquences onboarding + réactivation',
    budget: '12 400 000 FCFA',
  },
  {
    channel: 'Social Media (Cross-Platform)',
    icon: 'ri-share-line',
    score: 48,
    target: 85,
    audience: 8200,
    targetAudience: 35000,
    postsPerMonth: 18,
    engagement: 2.8,
    status: 'partiel',
    keyIssue: 'Twitter/X + YouTube sous-exploités, 0 contenu vidéo short-form, calendrier éditorial manuel',
    recommendation: 'Activer KOS Autonomous Media Command Center + template 10 livrables/article',
    budget: '22 000 000 FCFA',
  },
  {
    channel: 'SEO / GEO / AEO',
    icon: 'ri-search-line',
    score: 72,
    target: 95,
    audience: 68500,
    targetAudience: 105000,
    postsPerMonth: 0,
    engagement: 0,
    status: 'actif',
    keyIssue: 'SEO FR solide (95/100) mais EN 72/100 et PT 28/100. GEO 58/100 — invisibilité ChatGPT/Claude',
    recommendation: 'Plan multilingue 12 mois : 250 EN + 120 PT + FAQ 200 questions IA optimisées',
    budget: '248 000 000 FCFA',
  },
];

// ==========================================
// SECTION 4: LEAD MAGNETS PERFORMANCE
// ==========================================
export interface LeadMagnetPerf {
  id: string;
  name: string;
  category: string;
  icon: string;
  downloads: number;
  targetDownloads: number;
  conversionRate: number;
  targetConversion: number;
  leadsGenerated: number;
  qualifiedLeads: number;
  pipelineValue: string;
  score: number;
  status: 'optimal' | 'stable' | 'ameliorer' | 'critique';
  gap: string;
  optimization: string;
}

export const LEAD_MAGNET_PERFORMANCE: LeadMagnetPerf[] = [
  {
    id: 'lm-guide-bceao',
    name: 'Guide BCEAO 2026 — 7 Contrôles',
    category: 'Conformité',
    icon: 'ri-file-shield-line',
    downloads: 4200,
    targetDownloads: 8000,
    conversionRate: 12.5,
    targetConversion: 18,
    leadsGenerated: 525,
    qualifiedLeads: 145,
    pipelineValue: '425 M FCFA',
    score: 72,
    status: 'stable',
    gap: 'Taux conversion 12.5% vs 18% cible — CTA post-download faible',
    optimization: 'Ajouter CTA diagnostic personnalisé post-download + séquence nurturing 5 étapes',
  },
  {
    id: 'lm-checklist',
    name: 'Checklist Conformité BCEAO/COBAC',
    category: 'Conformité',
    icon: 'ri-shield-check-line',
    downloads: 6800,
    targetDownloads: 12000,
    conversionRate: 8.2,
    targetConversion: 15,
    leadsGenerated: 558,
    qualifiedLeads: 180,
    pipelineValue: '580 M FCFA',
    score: 68,
    status: 'ameliorer',
    gap: 'Conversion faible — checklist perçue comme trop technique, formulaire 6 champs dissuade',
    optimization: 'Simplifier formulaire à 3 champs + proposer vidéo explicative 2 min',
  },
  {
    id: 'lm-diag-flash',
    name: 'Diagnostic Flash Conformité 2026',
    category: 'Diagnostic',
    icon: 'ri-flashlight-line',
    downloads: 2800,
    targetDownloads: 10000,
    conversionRate: 18.5,
    targetConversion: 25,
    leadsGenerated: 518,
    qualifiedLeads: 210,
    pipelineValue: '720 M FCFA',
    score: 78,
    status: 'stable',
    gap: 'Peu de trafic vers la landing page — SEO insuffisant, pas de promotion LinkedIn',
    optimization: 'Campagne LinkedIn ciblée DRC/Compliance Officers + SEO landing page + Google Ads',
  },
  {
    id: 'lm-guide-fonds',
    name: 'Guide Levée de Fonds Afrique',
    category: 'Finance',
    icon: 'ri-funds-line',
    downloads: 1800,
    targetDownloads: 6000,
    conversionRate: 15.2,
    targetConversion: 22,
    leadsGenerated: 274,
    qualifiedLeads: 85,
    pipelineValue: '380 M FCFA',
    score: 62,
    status: 'ameliorer',
    gap: 'Audience trop large — cible diluée entre startups et PME, message pas assez segmenté',
    optimization: 'Créer 2 versions distinctes : Startup Seed vs PME Growth + landing pages séparées',
  },
  {
    id: 'lm-diagnostic-esg',
    name: 'Diagnostic Maturité ESG',
    category: 'ESG',
    icon: 'ri-leaf-line',
    downloads: 1200,
    targetDownloads: 5000,
    conversionRate: 22.8,
    targetConversion: 28,
    leadsGenerated: 274,
    qualifiedLeads: 95,
    pipelineValue: '320 M FCFA',
    score: 65,
    status: 'ameliorer',
    gap: 'ESG marché émergent en Afrique — éducation marché nécessaire, contenu trop avancé',
    optimization: 'Créer contenu pédagogique ESG 101 + infographies + benchmark sectoriel simplifié',
  },
  {
    id: 'lm-simulation-risque',
    name: 'Simulation Risque Réglementaire',
    category: 'Conformité',
    icon: 'ri-alert-line',
    downloads: 3500,
    targetDownloads: 7500,
    conversionRate: 11.8,
    targetConversion: 20,
    leadsGenerated: 413,
    qualifiedLeads: 125,
    pipelineValue: '480 M FCFA',
    score: 70,
    status: 'stable',
    gap: 'Outil interactif mais pas de rapport PDF automatique — expérience utilisateur incomplète',
    optimization: 'Générer rapport PDF personnalisé automatique + email automatique avec insights',
  },
];

export const LEAD_MAGNET_AGGREGATED = {
  totalDownloads: 20300,
  targetDownloads: 48500,
  totalLeads: 2562,
  targetLeads: 6000,
  qualifiedLeads: 840,
  pipelineValue: '2.905 Md FCFA',
  avgConversionRate: 14.8,
  targetConversionRate: 21,
  projectedRevenueImpact: '880 M FCFA',
  activeMagnets: 7,
  magnetsNeedingOptimization: 5,
  nextCampaign: 'Campagne Conformité Q3 2026 — Diagnostic Flash + Checklist',
};

// ==========================================
// SECTION 5: AMI/AO DETECTION & NOTIFICATIONS
// ==========================================
export interface TenderAlert {
  id: string;
  title: string;
  source: string;
  budget: string;
  deadline: string;
  score: number;
  status: 'critique' | 'elevee' | 'evaluer' | 'surveiller';
  notified: boolean;
  actions: string;
}

export const ACTIVE_TENDERS: TenderAlert[] = [
  {
    id: 'AO-2026-001',
    title: 'Audit Contrôle Interne — Banque Centrale',
    source: 'BCEAO',
    budget: '850 M FCFA',
    deadline: '2026-08-15',
    score: 96,
    status: 'critique',
    notified: true,
    actions: 'Dossier en préparation — Deadline J-53',
  },
  {
    id: 'AO-2026-002',
    title: 'Conformité LBC/FT — Groupe Bancaire Panafricain',
    source: 'GAFI/GIABA',
    budget: '620 M FCFA',
    deadline: '2026-09-01',
    score: 93,
    status: 'critique',
    notified: true,
    actions: 'Proposition soumise — En attente shortlist',
  },
  {
    id: 'AO-2026-007',
    title: 'Due Diligence ESG — Projet Minier',
    source: 'IFC/Banque Mondiale',
    budget: '950 M FCFA',
    deadline: '2026-09-30',
    score: 78,
    status: 'elevee',
    notified: true,
    actions: 'EOI en préparation — Partenaire ESG à identifier',
  },
  {
    id: 'AO-2026-009',
    title: 'Transformation Digitale OHADA',
    source: 'OHADA',
    budget: '1.2 Md FCFA',
    deadline: '2026-10-15',
    score: 72,
    status: 'evaluer',
    notified: false,
    actions: 'Veille active — Consortium à former',
  },
  {
    id: 'AMI-2026-001',
    title: 'Programme Inclusion Financière UEMOA',
    source: 'UEMOA/BOAD',
    budget: '2.8 Md FCFA',
    deadline: '2026-07-30',
    score: 88,
    status: 'critique',
    notified: true,
    actions: 'Manifestation d\'intérêt déposée — Présélection J+15',
  },
  {
    id: 'AO-2026-012',
    title: 'Audit Prudentiel COBAC — Congo',
    source: 'COBAC',
    budget: '410 M FCFA',
    deadline: '2026-08-31',
    score: 84,
    status: 'elevee',
    notified: true,
    actions: 'Consultant local identifié — Offre en cours',
  },
];

export const TENDER_DETECTION_SYSTEM = {
  sourcesActive: 16,
  sourcesTarget: 24,
  tendersDetectedThisMonth: 51,
  tendersDetectedTarget: 80,
  alertsDelivered: 28,
  alertsDeliveryTarget: 50,
  notificationLatency: '4.2h',
  targetLatency: '< 1h',
  cronJobsActive: 3,
  cronJobsFailing: 1,
  scraperEngineScore: 72,
  donorIntelligenceScore: 68,
  kritikalGap: 'Cron tender-scraper avec 3 échecs silencieux sur 7 jours — alerting non configuré',
  fixAction: 'Corriger cron + alerting + monitoring — 2h',
  fixBudget: '800 000 FCFA',
  pipelineValue: '18.155 Md FCFA',
  winRate: '33%',
  winRateTarget: '50%',
};

// ==========================================
// SECTION 6: UPGRADE 120% BIG FOUR — PLAN
// ==========================================
export interface Upgrade120Action {
  id: string;
  axe: string;
  axeIcon: string;
  title: string;
  priority: 'P0' | 'P1' | 'P2';
  phase: number;
  progress: number;
  status: 'completed' | 'in_progress' | 'pending' | 'blocked';
  kpiBefore: string;
  kpiAfter: string;
  effort: string;
  budget: string;
  impact: string;
  deadline: string;
  agent: string;
}

export const UPGRADE_120_ACTIONS: Upgrade120Action[] = [
  {
    id: 'U120-001',
    axe: 'Intelligence Réglementaire Prédictive',
    axeIcon: 'ri-scales-3-line',
    title: 'Regulatory Prediction Engine™ — Anticipation 8 mois',
    priority: 'P0',
    phase: 1,
    progress: 42,
    status: 'in_progress',
    kpiBefore: 'Alertes hebdomadaires réactives',
    kpiAfter: 'Prédictions temps réel, couverture 50K textes',
    effort: '180h',
    budget: '45 M FCFA',
    impact: 'MTTD réglementaire 24h → < 1h, anticipation 8 mois',
    deadline: '2026-08-15',
    agent: 'KOS Regulatory Intelligence Agent™',
  },
  {
    id: 'U120-002',
    axe: 'Qualité Big Four Prophétique',
    axeIcon: 'ri-verified-badge-line',
    title: 'Quality Prophet Engine™ — 24 contrôles Big Four',
    priority: 'P0',
    phase: 1,
    progress: 35,
    status: 'in_progress',
    kpiBefore: '12 contrôles qualité réactifs',
    kpiAfter: '24 contrôles prédictifs, détection préemptive 95%',
    effort: '120h',
    budget: '38 M FCFA',
    impact: 'Délai revue 48h → 24h, score qualité 9.2 → 9.8',
    deadline: '2026-08-31',
    agent: 'KOS Quality Controller Agent™',
  },
  {
    id: 'U120-003',
    axe: 'Sécurité Prédictive & Résilience',
    axeIcon: 'ri-shield-flash-line',
    title: 'Threat Prediction Engine™ — NIST CSF Tier 4',
    priority: 'P0',
    phase: 1,
    progress: 48,
    status: 'in_progress',
    kpiBefore: 'NIST CSF Tier 2, MTTD 18min',
    kpiAfter: 'NIST CSF Tier 4, MTTD < 1min, auto-remediation 85%',
    effort: '200h',
    budget: '52 M FCFA',
    impact: 'Score OWASP 55 → 98, SOC 2 42 → 90, zéro vulnérabilité critique',
    deadline: '2026-09-30',
    agent: 'KOS Security Agent™',
  },
  {
    id: 'U120-004',
    axe: 'Croissance Exponentielle & Expansion',
    axeIcon: 'ri-rocket-line',
    title: 'Expansion 54 pays africains — 8 bureaux',
    priority: 'P1',
    phase: 4,
    progress: 5,
    status: 'pending',
    kpiBefore: '17 pays UEMOA/CEMAC, 0 bureau',
    kpiAfter: '54 pays, 8 bureaux (Douala, Lagos, Nairobi, Johannesburg, Casablanca, Accra, Kigali, Luanda)',
    effort: '24 mois',
    budget: '180 M FCFA',
    impact: 'Pipeline 3.77 Md → 15 Md FCFA, couverture panafricaine',
    deadline: '2027-12-31',
    agent: 'KOS Growth Engine™',
  },
  {
    id: 'U120-005',
    axe: 'Knowledge Graph Universal™',
    axeIcon: 'ri-brain-2-line',
    title: 'Knowledge Graph 1M documents, 10M embeddings',
    priority: 'P0',
    phase: 2,
    progress: 22,
    status: 'in_progress',
    kpiBefore: '100K docs, 2.78M embeddings, 18 sources',
    kpiAfter: '1M docs, 10M embeddings, 54 sources, raisonnement sémantique',
    effort: '320h',
    budget: '62 M FCFA',
    impact: 'Couverture connaissance ×10, précision RAG 89% → 99%',
    deadline: '2027-02-28',
    agent: 'KOS Knowledge Graph Agent™',
  },
  {
    id: 'U120-006',
    axe: 'Automatisation Anticipative',
    axeIcon: 'ri-robot-3-line',
    title: '150 agents IA — Taux anticipation 85%',
    priority: 'P1',
    phase: 3,
    progress: 8,
    status: 'pending',
    kpiBefore: '75 agents optimaux, taux réaction 70%',
    kpiAfter: '150 agents auto-apprenants, taux anticipation 85%, collaboration inter-agents',
    effort: '480h',
    budget: '95 M FCFA',
    impact: 'Productivité IA ×2, temps réponse divisé par 4',
    deadline: '2027-06-30',
    agent: 'KOS Self-Improvement Engine™',
  },
  {
    id: 'U120-007',
    axe: 'Revenue Intelligence & Monétisation',
    axeIcon: 'ri-money-dollar-circle-line',
    title: 'Pipeline 15 Md, CA 6 Md/an, 7 Business Units',
    priority: 'P2',
    phase: 4,
    progress: 2,
    status: 'pending',
    kpiBefore: 'Pipeline 3.77 Md, CA 1.92 Md, 4 BUs',
    kpiAfter: 'Pipeline 15 Md, CA 6 Md, 7 BUs, KOS Compliance SaaS™',
    effort: '36 mois',
    budget: '250 M FCFA',
    impact: 'CA ×3, rentabilité ×2.5, diversification SaaS',
    deadline: '2028-12-31',
    agent: 'KOS Revenue Intelligence Agent™',
  },
  {
    id: 'U120-008',
    axe: 'Influence Globale & Thought Leadership',
    axeIcon: 'ri-global-line',
    title: 'Trafic 1M/mois, DR 95, 5 langues, 100K abonnés newsletter',
    priority: 'P2',
    phase: 5,
    progress: 0,
    status: 'pending',
    kpiBefore: 'Trafic 68.5K/mois, DR 85, 3 langues, 4.2K newsletter',
    kpiAfter: 'Trafic 1M/mois, DR 95, 5 langues (FR/EN/PT/AR/SW), 100K newsletter',
    effort: '24 mois',
    budget: '120 M FCFA',
    impact: 'Leader intellectuel panafricain incontesté, référence citations médias',
    deadline: '2028-06-30',
    agent: 'KOS Thought Leadership Agent™',
  },
];

// ==========================================
// SECTION 7: TIMELINE UNIFIÉE — JALONS
// ==========================================
export interface UnifiedMilestone {
  date: string;
  label: string;
  domain: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  description: string;
}

export const UNIFIED_MILESTONES: UnifiedMilestone[] = [
  { date: '2026-07-15', label: 'Images WebP + 3 vulns OWASP corrigées', domain: 'Performance', status: 'in_progress', description: 'LCP < 3.2s, 0 vulnérabilité critique OWASP' },
  { date: '2026-07-31', label: 'CSP strict + WAF + npm audit clean', domain: 'Performance', status: 'in_progress', description: 'Observatory 95/100, 0 vuln npm' },
  { date: '2026-07-30', label: 'Dépôt AMI Inclusion Financière UEMOA', domain: 'AMI/AO', status: 'upcoming', description: '2.8 Md FCFA — Présélection' },
  { date: '2026-08-15', label: 'CDN + Critical CSS + Dashboard CWV V1', domain: 'Performance', status: 'upcoming', description: 'TTFB < 0.8s, Speed Index < 3.5s' },
  { date: '2026-08-31', label: 'Quality Prophet Engine™ V1 livré', domain: '120% Upgrade', status: 'upcoming', description: '24 contrôles Big Four prédictifs' },
  { date: '2026-08-31', label: 'Déblocage LinkedIn MDP + 30 posts/mois', domain: 'Marketing Digital', status: 'upcoming', description: 'Social Selling Engine actif, 250K impressions' },
  { date: '2026-09-15', label: 'MFA + SSO déployés + bundle JS optimisé', domain: 'Performance', status: 'upcoming', description: 'SOC 2 Security 52→75, bundle < 800 KB' },
  { date: '2026-09-30', label: 'Threat Prediction Engine™ opérationnel', domain: '120% Upgrade', status: 'upcoming', description: 'NIST CSF Tier 3, MTTD < 5min' },
  { date: '2026-10-15', label: 'Lead magnets pipeline 5 Md FCFA', domain: 'Lead Magnets', status: 'upcoming', description: 'Conversion 14.8% → 21%, +880 leads qualifiés' },
  { date: '2026-10-31', label: 'ISO 27001 Phase 4/4 — certification ready', domain: 'Performance', status: 'upcoming', description: '114/114 contrôles conformes' },
  { date: '2026-12-31', label: '25 politiques SOC 2 adoptées COMEX', domain: 'Performance', status: 'upcoming', description: 'SOC 2 Readiness 42→80' },
  { date: '2027-02-28', label: 'Knowledge Graph 500K documents', domain: '120% Upgrade', status: 'upcoming', description: 'Raisonnement sémantique actif' },
  { date: '2027-06-30', label: 'Score Global Cible 98/100 — Certification AAAA+', domain: '120% Upgrade', status: 'upcoming', description: 'Transcendance 120% Big Four atteinte' },
];

// ==========================================
// SECTION 8: STATISTIQUES AGRÉGÉES
// ==========================================
export const UNIFIED_STATS = {
  scanId: 'KOS-CPVU-2026-0623-001',
  scanTimestamp: '2026-06-23T09:30:00Z',
  globalScore: 58,
  globalTarget: 98,
  totalFindings: 87,
  criticalOpen: 11,
  highOpen: 24,
  mediumOpen: 32,
  lowOpen: 20,
  totalFixed: 156,
  totalAutoFixable: 28,
  estimatedTotalEffort: '18 mois (5 840 heures)',
  estimatedTotalBudget: '798 000 000 FCFA',
  roiProjected: '1.85 Md FCFA (ROI 2.3×)',
  projectedCompletion: '2027-06-30',
  consortium: 'PwC · Deloitte · EY · KPMG — Supreme Practice',
  mandate: 'Managing Partner — KHEPRA EXPERTS',
  cockpitId: 'KOS-HUB-107',
  cockpitName: 'Complete Performance, Visibility, Marketing, Lead Magnets, AMI/AO & 120% Upgrade',
};





