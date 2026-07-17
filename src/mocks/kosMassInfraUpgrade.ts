// KOS Mass Infrastructure & Visibility Upgrade™ — Mock Data
// Agrégation 5 domaines : Infrastructure · GEO · SEO · AI Visibility · Lead Magnets
// v2 — Connecté aux véritables Edge Functions Supabase

export interface MassTask {
  id: string;
  domain: 'infrastructure' | 'geo' | 'seo' | 'ai_visibility' | 'lead_magnets';
  priority: 'critical' | 'high' | 'medium';
  title: string;
  description: string;
  sourceSystem: string;
  effort: string;
  impact: string;
  autoFixable: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  kpiBefore: string;
  kpiAfter: string;
  assignedAgent: string;
  /** Supabase Edge Function slug to invoke for real execution */
  supabaseFunction?: string;
  /** Payload to send to the edge function */
  functionPayload?: Record<string, unknown>;
  /** True if this task is a code-level / config change (not an edge function call) */
  mockOnly?: boolean;
}

export interface DomainSummary {
  domain: 'infrastructure' | 'geo' | 'seo' | 'ai_visibility' | 'lead_magnets';
  label: string;
  icon: string;
  color: string;
  hexColor: string;
  totalTasks: number;
  critical: number;
  high: number;
  medium: number;
  completed: number;
  autoFixable: number;
  progressPct: number;
}

export interface MassUpgradeStats {
  totalTasks: number;
  totalCritical: number;
  totalHigh: number;
  totalCompleted: number;
  totalAutoFixable: number;
  overallProgress: number;
  estimatedTotalEffort: string;
  estimatedTrafficGain: number;
  estimatedReachGain: number;
  estimatedLeadGain: number;
  targetDate: string;
}

export const MASS_TASKS: MassTask[] = [
  // === INFRASTRUCTURE (from Global System Upgrade) ===
  {
    id: 'infra-001', domain: 'infrastructure', priority: 'critical',
    title: 'Upgrade Agent Orchestrator — Ajout capacités multi-bloc',
    description: "L'orchestrateur ne gère pas les dépendances cross-blocs. Ajout du parallel pipeline executor.",
    sourceSystem: 'KOS Global System Upgrade', effort: '45 min', impact: '+3 blocs parallélisables',
    autoFixable: true, status: 'pending',
    kpiBefore: '1 bloc à la fois', kpiAfter: '7 blocs parallèles',
    assignedAgent: 'Master Synchronizer',
    supabaseFunction: 'kos-orchestrator-engine',
    functionPayload: { action: 'health_check', scope: 'cross_block_parallel' },
  },
  {
    id: 'infra-002', domain: 'infrastructure', priority: 'critical',
    title: 'Corriger fuite mémoire Edge Function SEO Audit',
    description: "L'edge function kos-seo-audit leak 120MB/run sur les sites >500 pages.",
    sourceSystem: 'SysOps Health Command', effort: '60 min', impact: 'Stabilité production',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Crash après 3 runs', kpiAfter: 'Stable 100+ runs',
    assignedAgent: 'Web Ops Automate',
    supabaseFunction: 'kos-performance-monitor',
    functionPayload: { action: 'health_check', target: 'kos-seo-audit', metric: 'memory' },
  },
  {
    id: 'infra-003', domain: 'infrastructure', priority: 'high',
    title: 'Mise à jour dépendances — 14 packages vulnérables',
    description: 'npm audit révèle 14 vulnérabilités dont 3 critiques. Mise à jour React 19.x patch.',
    sourceSystem: 'Security Scan', effort: '90 min', impact: 'Score sécurité +12pts',
    autoFixable: false, status: 'pending',
    kpiBefore: 'Score 72/100', kpiAfter: 'Score 84/100',
    assignedAgent: 'Cyber Sec Automate',
    mockOnly: true,
  },
  {
    id: 'infra-004', domain: 'infrastructure', priority: 'high',
    title: 'Optimisation bundle — Réduire main.js de 2.4MB à 800KB',
    description: 'Code splitting dynamique, lazy loading des pages KOS, tree shaking config.',
    sourceSystem: 'Performance SEO Command', effort: '120 min', impact: 'LCP -1.2s mobile',
    autoFixable: false, status: 'pending',
    kpiBefore: 'LCP 3.8s mobile', kpiAfter: 'LCP 2.6s mobile',
    assignedAgent: 'Fullstack Dev Automate',
    mockOnly: true,
  },
  {
    id: 'infra-005', domain: 'infrastructure', priority: 'medium',
    title: 'Activer Brotli compression sur Netlify',
    description: "Netlify supporte Brotli mais pas activé par défaut. Ajout headers _headers.",
    sourceSystem: 'CDO Engineering Command', effort: '15 min', impact: '-22% taille assets',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Gzip only', kpiAfter: 'Brotli + Gzip',
    assignedAgent: 'Web Ops Automate',
    mockOnly: true,
  },
  {
    id: 'infra-006', domain: 'infrastructure', priority: 'medium',
    title: 'Cache-Control headers uniformes — 47 pages sans cache',
    description: 'Audit headers montre 47 pages sans Cache-Control. Standardiser à 1h stale-while-revalidate.',
    sourceSystem: 'CDO Engineering Command', effort: '20 min', impact: 'TTFB -40%',
    autoFixable: true, status: 'pending',
    kpiBefore: 'TTFB 420ms', kpiAfter: 'TTFB 250ms',
    assignedAgent: 'Web Ops Automate',
    mockOnly: true,
  },

  // === GEO (from GEO Authority Engine) ===
  {
    id: 'geo-001', domain: 'geo', priority: 'critical',
    title: 'Régénération llms-full.txt — Contenu expiré',
    description: 'llms-full.txt date de 15 jours. Mise à jour avec nouveaux articles blog + case studies.',
    sourceSystem: 'GEO Authority Engine', effort: '10 min', impact: 'Fraîcheur citations IA',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Fraîcheur 72%', kpiAfter: 'Fraîcheur 98%',
    assignedAgent: 'LLMs Generator',
    supabaseFunction: 'kos-llms-generator',
    functionPayload: { action: 'regenerate', scope: 'full', includeBlog: true },
  },
  {
    id: 'geo-002', domain: 'geo', priority: 'critical',
    title: 'Ajout FAQ Schema.org — 6 pages piliers manquantes',
    description: "Les 6 pages piliers n'ont pas de FAQPage schema. Ajout LD+JSON automatique.",
    sourceSystem: 'GEO Authority Engine', effort: '30 min', impact: '+24 rich results',
    autoFixable: true, status: 'pending',
    kpiBefore: '0 FAQ rich results', kpiAfter: '24 FAQ rich results',
    assignedAgent: 'Schema Validator',
    mockOnly: true,
  },
  {
    id: 'geo-003', domain: 'geo', priority: 'high',
    title: 'Optimisation citations Perplexity — SOV 18% → 28%',
    description: 'Perplexity sous-performant vs ChatGPT. Ajout structured snippets spécifiques Perplexity.',
    sourceSystem: 'GEO Authority Engine', effort: '45 min', impact: 'SOV +10% Perplexity',
    autoFixable: false, status: 'pending',
    kpiBefore: 'SOV Perplexity 18%', kpiAfter: 'SOV Perplexity 28%',
    assignedAgent: 'GEO Scout',
    supabaseFunction: 'kos-geo-visibility-engine',
    functionPayload: { action: 'optimize', target: 'perplexity', sovTarget: 28 },
  },
  {
    id: 'geo-004', domain: 'geo', priority: 'high',
    title: 'Mise à jour glossaire — 12 nouveaux termes BCEAO/CEMAC',
    description: '12 termes réglementaires non encore indexés dans le glossaire GEO.',
    sourceSystem: 'Knowledge Graph', effort: '40 min', impact: '+12 entités KG',
    autoFixable: true, status: 'pending',
    kpiBefore: '84 termes glossaire', kpiAfter: '96 termes glossaire',
    assignedAgent: 'Knowledge Manager',
    supabaseFunction: 'kos-knowledge-manager',
    functionPayload: { action: 'enrich', type: 'glossary', count: 12, scope: 'BCEAO_CEMAC' },
  },
  {
    id: 'geo-005', domain: 'geo', priority: 'medium',
    title: 'Optimisation Knowledge Graph — 3 entités non claimées',
    description: 'Google KG montre 3 entités non claimées (KHEPRA EXPERTS, KOS, KBR).',
    sourceSystem: 'GEO Authority Engine', effort: '20 min', impact: 'Claim 3/3 entités',
    autoFixable: false, status: 'pending',
    kpiBefore: '6/9 entités claimées', kpiAfter: '9/9 entités claimées',
    assignedAgent: 'Digital Authority',
    mockOnly: true,
  },

  // === SEO (from SEO Autopilot) ===
  {
    id: 'seo-001', domain: 'seo', priority: 'critical',
    title: 'Soumettre 47 URLs orphelines à Google Indexing API',
    description: '47 pages publiées non indexées car non linkées depuis le sitemap principal.',
    sourceSystem: 'URL Indexation Command', effort: '15 min', impact: '+47 pages indexées',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Taux indexation 89%', kpiAfter: 'Taux indexation 95%',
    assignedAgent: 'GSC Booster',
    supabaseFunction: 'kos-gsc-monitor',
    functionPayload: { action: 'submit_urls', count: 47 },
  },
  {
    id: 'seo-002', domain: 'seo', priority: 'critical',
    title: 'Corriger 23 liens cassés — erreurs 404 internes',
    description: 'Crawl interne révèle 23 liens cassés pointant vers des slugs renommés.',
    sourceSystem: 'Internal Linking Engine', effort: '30 min', impact: 'Link equity restaurée',
    autoFixable: true, status: 'pending',
    kpiBefore: '23 broken links', kpiAfter: '0 broken links',
    assignedAgent: 'Link Crawler',
    supabaseFunction: 'crawl-internal-links',
    functionPayload: { action: 'fix_broken', count: 23 },
  },
  {
    id: 'seo-003', domain: 'seo', priority: 'high',
    title: 'Optimisation meta descriptions — 18 pages sans meta',
    description: '18 pages publiées sans meta description. Génération IA + validation humaine.',
    sourceSystem: 'SEO On-Page Content', effort: '25 min', impact: 'CTR +1.5% estimé',
    autoFixable: true, status: 'pending',
    kpiBefore: 'CTR 3.8%', kpiAfter: 'CTR 5.3%',
    assignedAgent: 'Content Generator',
    supabaseFunction: 'kos-llm-content-generator',
    functionPayload: { action: 'generate_meta', type: 'meta_description', count: 18 },
  },
  {
    id: 'seo-004', domain: 'seo', priority: 'high',
    title: 'Maillage interne — 12 pages orphelines à connecter',
    description: '12 pages de contenu sans lien entrant. Ajout depuis pages mères des silos.',
    sourceSystem: 'Internal Linking Engine', effort: '20 min', impact: 'Crawl budget optimisé',
    autoFixable: true, status: 'pending',
    kpiBefore: '12 orphelines', kpiAfter: '0 orphelines',
    assignedAgent: 'Link Crawler',
    supabaseFunction: 'crawl-internal-links',
    functionPayload: { action: 'analyze_orphans', count: 12 },
  },
  {
    id: 'seo-005', domain: 'seo', priority: 'high',
    title: 'Mise à jour sitemap.xml — 8 nouveaux articles blog',
    description: '8 articles publiés en juin non inclus dans sitemap.xml.',
    sourceSystem: 'Sitemap Generator', effort: '5 min', impact: 'Découvrabilité +8',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Sitemap 512 URLs', kpiAfter: 'Sitemap 520 URLs',
    assignedAgent: 'Sitemap Generator',
    supabaseFunction: 'sitemap-xml-dynamic',
    functionPayload: { action: 'regenerate', includeNew: true },
  },
  {
    id: 'seo-006', domain: 'seo', priority: 'medium',
    title: 'Optimisation images — 34 images >500KB sans lazy load',
    description: 'Audit images montre 34 images lourdes sans loading=lazy ni dimensions explicites.',
    sourceSystem: 'Performance SEO Command', effort: '40 min', impact: 'LCP -0.8s',
    autoFixable: true, status: 'pending',
    kpiBefore: '34 images lourdes', kpiAfter: '0 images non optimisées',
    assignedAgent: 'Image Optimizer',
    mockOnly: true,
  },

  // === AI VISIBILITY (from AI Visibility Command) ===
  {
    id: 'ai-001', domain: 'ai_visibility', priority: 'critical',
    title: 'Ajout User-Agent ClaudeBot dans robots.txt',
    description: 'ClaudeBot non explicitement autorisé dans robots.txt. Ajout directive Allow.',
    sourceSystem: 'AI Visibility Command', effort: '5 min', impact: 'Visibilité Claude AI',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Claude non crawlable', kpiAfter: 'Claude crawlable',
    assignedAgent: 'Web Ops Automate',
    mockOnly: true,
  },
  {
    id: 'ai-002', domain: 'ai_visibility', priority: 'critical',
    title: 'Mise à jour structured data — 3 pages manquent Organization schema',
    description: 'Pages régionales sans Organization schema. Ajout LD+JSON avec sameAs socials.',
    sourceSystem: 'Schema.org Audit', effort: '15 min', impact: 'Rich cards Google',
    autoFixable: true, status: 'pending',
    kpiBefore: '7/10 pages schema', kpiAfter: '10/10 pages schema',
    assignedAgent: 'Schema Validator',
    mockOnly: true,
  },
  {
    id: 'ai-003', domain: 'ai_visibility', priority: 'high',
    title: 'Création llms.txt pour sous-domaine blog',
    description: "Le blog n'a pas son propre llms.txt. Création avec les 50 derniers articles.",
    sourceSystem: 'LLMs Generator', effort: '15 min', impact: 'Citations blog IA',
    autoFixable: true, status: 'pending',
    kpiBefore: '0 citations blog', kpiAfter: '~200 citations/mois',
    assignedAgent: 'LLMs Generator',
    supabaseFunction: 'kos-llms-generator',
    functionPayload: { action: 'generate_blog_llms', articleCount: 50 },
  },
  {
    id: 'ai-004', domain: 'ai_visibility', priority: 'high',
    title: 'Optimisation presence Copilot — Score 52/100 → 75/100',
    description: 'Microsoft Copilot sous-performant. Ajout markdown sémantique spécifique Bing.',
    sourceSystem: 'AI Visibility Command', effort: '30 min', impact: '+23 pts Copilot',
    autoFixable: false, status: 'pending',
    kpiBefore: 'Score Copilot 52', kpiAfter: 'Score Copilot 75',
    assignedAgent: 'GEO Scout',
    supabaseFunction: 'kos-geo-visibility-engine',
    functionPayload: { action: 'optimize', target: 'copilot', scoreTarget: 75 },
  },

  // === LEAD MAGNETS (from Growth Commercial Strategy + Ultra Lead Magnets) ===
  {
    id: 'lm-001', domain: 'lead_magnets', priority: 'critical',
    title: 'Déploiement landing page — Simulateur Agrément Microfinance CEMAC',
    description: 'Page créée mais non publiée (statut brouillon). Mise en ligne + SEO.',
    sourceSystem: 'Ultra Lead Magnets', effort: '20 min', impact: '+15 leads/mois estimé',
    autoFixable: true, status: 'pending',
    kpiBefore: '0 leads CEMAC', kpiAfter: '15 leads/mois',
    assignedAgent: 'Growth Automate',
    mockOnly: true,
  },
  {
    id: 'lm-002', domain: 'lead_magnets', priority: 'critical',
    title: 'Activer Lead Magnet — Checklist Conformité BCEAO/COBAC 2026',
    description: 'Lead magnet le plus demandé mais formulaire cassé. Fix honeypot + validation.',
    sourceSystem: 'Growth Commercial Strategy', effort: '15 min', impact: '+25 leads/mois',
    autoFixable: true, status: 'pending',
    kpiBefore: 'Formulaire cassé', kpiAfter: 'Formulaire OK — 25 leads/mois',
    assignedAgent: 'Growth Automate',
    mockOnly: true,
  },
  {
    id: 'lm-003', domain: 'lead_magnets', priority: 'high',
    title: 'Campagne nurturing — Relance leads froids Q1 2026',
    description: '47 leads qualifiés non convertis Q1. Séquence email 3 touches + invitation webinar.',
    sourceSystem: 'Growth Commercial Strategy', effort: '60 min', impact: 'Pipeline +94M FCFA',
    autoFixable: false, status: 'pending',
    kpiBefore: '0 relances', kpiAfter: '47 leads réactivés',
    assignedAgent: 'Nurturing Engine',
    supabaseFunction: 'email-funnel-sequence',
    functionPayload: { action: 'reactivate', audience: 'cold_leads_q1_2026', count: 47, touches: 3 },
  },
  {
    id: 'lm-004', domain: 'lead_magnets', priority: 'high',
    title: 'A/B test CTA — Diagnostic Flash Conformité',
    description: 'CTA actuel convertit 3.2%. Variante B avec urgence réglementaire à tester.',
    sourceSystem: 'Growth Commercial Strategy', effort: '30 min', impact: 'Conversion 3.2→5.5%',
    autoFixable: false, status: 'pending',
    kpiBefore: 'CR 3.2%', kpiAfter: 'CR 5.5%',
    assignedAgent: 'CRO Engine',
    mockOnly: true,
  },
  {
    id: 'lm-005', domain: 'lead_magnets', priority: 'medium',
    title: 'Lead Scoring — Recalibration modèle Q2 2026',
    description: 'Modèle de scoring basé sur Q1. Recalibration avec données Q2 + nouveaux signaux.',
    sourceSystem: 'Lead Scoring Command', effort: '45 min', impact: 'Précision +12%',
    autoFixable: false, status: 'pending',
    kpiBefore: 'Précision 78%', kpiAfter: 'Précision 90%',
    assignedAgent: 'Lead Scorer',
    supabaseFunction: 'kos-lead-scoring',
    functionPayload: { action: 'recalibrate', quarter: 'Q2_2026' },
  },
];

export const DOMAIN_SUMMARIES: DomainSummary[] = [
  {
    domain: 'infrastructure', label: 'Infrastructure', icon: 'ri-server-line', color: 'red', hexColor: '#DC2626',
    totalTasks: 6, critical: 2, high: 2, medium: 2, completed: 0, autoFixable: 4, progressPct: 0,
  },
  {
    domain: 'geo', label: 'GEO Authority', icon: 'ri-radar-line', color: 'emerald', hexColor: '#0D7B5F',
    totalTasks: 5, critical: 2, high: 2, medium: 1, completed: 0, autoFixable: 3, progressPct: 0,
  },
  {
    domain: 'seo', label: 'SEO / Indexation', icon: 'ri-search-line', color: 'amber', hexColor: '#9B7B2C',
    totalTasks: 6, critical: 2, high: 3, medium: 1, completed: 0, autoFixable: 5, progressPct: 0,
  },
  {
    domain: 'ai_visibility', label: 'AI Visibility', icon: 'ri-robot-2-line', color: 'teal', hexColor: '#0D9488',
    totalTasks: 4, critical: 2, high: 2, medium: 0, completed: 0, autoFixable: 3, progressPct: 0,
  },
  {
    domain: 'lead_magnets', label: 'Lead Magnets', icon: 'ri-user-star-line', color: 'violet', hexColor: '#7C3AED',
    totalTasks: 5, critical: 2, high: 2, medium: 1, completed: 0, autoFixable: 2, progressPct: 0,
  },
];

export const MASS_UPGRADE_STATS: MassUpgradeStats = {
  totalTasks: 26,
  totalCritical: 10,
  totalHigh: 11,
  totalCompleted: 0,
  totalAutoFixable: 17,
  overallProgress: 0,
  estimatedTotalEffort: '12h 30min',
  estimatedTrafficGain: 8500,
  estimatedReachGain: 45000,
  estimatedLeadGain: 65,
  targetDate: '2026-07-04',
};

// Execution log structure
export interface MassExecutionLog {
  id: string;
  taskId: string;
  domain: string;
  action: string;
  status: 'running' | 'completed' | 'failed';
  timestamp: string;
  detail: string;
  duration: string;
  /** Indicates whether this was a real edge function call or a mock-only simulation */
  executionType: 'edge_function' | 'mock_code_change';
  /** The edge function slug that was called (if applicable) */
  functionSlug?: string;
}

export const INITIAL_EXECUTION_LOGS: MassExecutionLog[] = [];