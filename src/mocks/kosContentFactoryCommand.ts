// ============================================================
// KOS Content Factory Command™ — Orchestration des 13 Blocs
// Hub central de la production de contenu Big Four
// ============================================================

export interface ContentBlock {
  id: number;
  name: string;
  short_name: string;
  icon: string;
  description: string;
  status: 'active' | 'in_progress' | 'planned' | 'standby';
  priority: 'critical' | 'high' | 'medium' | 'low';
  color: string;
  hub_url: string;
  hub_name: string;
  production_pipeline: {
    total: number;
    in_progress: number;
    completed: number;
    scheduled: number;
  };
  kpis: {
    name: string;
    value: string;
    target: string;
    icon: string;
  }[];
  recent_activity: {
    date: string;
    description: string;
    type: 'production' | 'alert' | 'milestone' | 'update';
  }[];
  auto_generated: boolean;
  agent_name: string;
}

export interface ContentFactoryOverview {
  blocks: ContentBlock[];
  global_kpis: {
    name: string;
    value: string;
    target: string;
    progress: number;
    icon: string;
  }[];
  production_velocity: {
    daily: number;
    weekly: number;
    monthly: number;
    trend: number;
  };
  quality_gate: {
    threshold: number;
    current_avg: number;
    passed: number;
    failed: number;
  };
  cross_canal_pipeline: {
    blog: number;
    linkedin: number;
    x: number;
    newsletter: number;
    lead_magnets: number;
  };
  alerts: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const CONTENT_FACTORY_BLOCKS: ContentBlock[] = [
  {
    id: 1,
    name: 'Veille Stratégique',
    short_name: 'Veille',
    icon: 'ri-radar-line',
    description: 'Analyse quotidienne BCEAO, UEMOA, OHADA, GAFI, COBAC, BAD, FMI, Banque Mondiale, OCDE, ISO, COSO. Détection des nouvelles réglementations, consultations publiques, évolutions normatives.',
    status: 'active',
    priority: 'critical',
    color: '#DC2626',
    hub_url: '/kos-regulatory-compliance-automates',
    hub_name: 'Regulatory Compliance Automates',
    production_pipeline: { total: 12, in_progress: 3, completed: 8, scheduled: 1 },
    kpis: [
      { name: 'Autorités surveillées', value: '14', target: '14', icon: 'ri-building-2-line' },
      { name: 'Alertes ce mois', value: '12', target: '20', icon: 'ri-notification-3-line' },
      { name: 'Impact Élevé+', value: '5', target: '—', icon: 'ri-alert-line' },
      { name: 'Rapports générés', value: '24', target: '30', icon: 'ri-file-chart-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: 'Alerte ROUGE — Nouvelle circulaire COBAC contrôle interne', type: 'alert' },
      { date: '2026-06-16', description: 'Rapport de veille hebdomadaire généré (12 textes analysés)', type: 'production' },
      { date: '2026-06-14', description: 'Détection consultation publique UEMOA Open Banking', type: 'alert' },
    ],
    auto_generated: true,
    agent_name: 'KOS Regulatory Auto-Scanner™',
  },
  {
    id: 2,
    name: 'Opportunités SEO',
    short_name: 'SEO',
    icon: 'ri-search-line',
    description: 'Analyse des mots-clés stratégiques, questions fréquentes, tendances sectorielles, requêtes longue traîne, lacunes de contenu. Classification Priorité A/B/C.',
    status: 'active',
    priority: 'critical',
    color: '#86BC25',
    hub_url: '/kos-seo-aeo-command',
    hub_name: 'SEO & AEO Command Center',
    production_pipeline: { total: 28, in_progress: 5, completed: 18, scheduled: 5 },
    kpis: [
      { name: 'Mots-clés trackés', value: '280', target: '500', icon: 'ri-key-2-line' },
      { name: 'Priorité A', value: '12', target: '20', icon: 'ri-star-fill' },
      { name: 'Top 3 Google', value: '47', target: '100', icon: 'ri-trophy-line' },
      { name: 'Score SEO moyen', value: '92.1', target: '95', icon: 'ri-bar-chart-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: '3 nouveaux mots-clés Priorité A détectés', type: 'production' },
      { date: '2026-06-15', description: 'Article #9 positionné Top 3 — « Régulation FinTech UEMOA 2026 »', type: 'milestone' },
      { date: '2026-06-12', description: 'Audit SEO technique — 15 pages analysées, score 7.0/10', type: 'update' },
    ],
    auto_generated: true,
    agent_name: 'KOS SEO Intelligence Agent™',
  },
  {
    id: 3,
    name: 'Opportunités GEO',
    short_name: 'GEO',
    icon: 'ri-robot-line',
    description: 'Analyse des requêtes IA : ChatGPT, Gemini, Claude, Perplexity, Copilot. Identification des questions pour lesquelles Khepra peut devenir référence. Base GEO : question → réponse cible → page.',
    status: 'active',
    priority: 'high',
    color: '#EA580C',
    hub_url: '/kos-ai-visibility-command',
    hub_name: 'AI Visibility Command',
    production_pipeline: { total: 45, in_progress: 8, completed: 30, scheduled: 7 },
    kpis: [
      { name: 'Questions GEO', value: '45', target: '100', icon: 'ri-question-line' },
      { name: 'Citations IA/mois', value: '340', target: '500', icon: 'ri-chat-3-line' },
      { name: 'Score GEO', value: '78', target: '95', icon: 'ri-brain-line' },
      { name: 'Featured Snippets', value: '47', target: '80', icon: 'ri-file-text-line' },
    ],
    recent_activity: [
      { date: '2026-06-16', description: '8 nouvelles questions GEO identifiées — Perplexity + ChatGPT', type: 'production' },
      { date: '2026-06-14', description: 'Citation Khepra dans réponse ChatGPT — « Conformité BCEAO SFD »', type: 'milestone' },
      { date: '2026-06-10', description: 'llms.txt régénéré — 52 documents indexés', type: 'update' },
    ],
    auto_generated: true,
    agent_name: 'KOS GEO Visibility Engine™',
  },
  {
    id: 4,
    name: 'Planification Automatique',
    short_name: 'Planning',
    icon: 'ri-calendar-todo-line',
    description: 'Calendrier éditorial automatisé : quotidien (LinkedIn/X), hebdomadaire (2 articles), mensuel (1 étude), trimestriel (1 livre blanc), semestriel (1 référentiel), annuel (1 rapport de prospective).',
    status: 'active',
    priority: 'high',
    color: '#0891B2',
    hub_url: '/kos-social-media-command',
    hub_name: 'Social Media Command',
    production_pipeline: { total: 36, in_progress: 4, completed: 28, scheduled: 4 },
    kpis: [
      { name: 'Posts LinkedIn/sem.', value: '6', target: '7', icon: 'ri-linkedin-fill' },
      { name: 'Posts X/sem.', value: '4', target: '5', icon: 'ri-twitter-x-fill' },
      { name: 'Articles/sem.', value: '2', target: '2', icon: 'ri-article-line' },
      { name: 'Streak jours', value: '9', target: '30', icon: 'ri-fire-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: 'Planning S26 généré — 10 posts LinkedIn + 8 posts X', type: 'production' },
      { date: '2026-06-16', description: 'Article #9 programmé — Régulation FinTech UEMOA', type: 'update' },
      { date: '2026-06-13', description: 'Auto-générateur LinkedIn activé — 21 posts articles #1-7', type: 'milestone' },
    ],
    auto_generated: true,
    agent_name: 'KOS Social Scheduler™',
  },
  {
    id: 5,
    name: 'Rédaction Big Four',
    short_name: 'Articles',
    icon: 'ri-quill-pen-line',
    description: 'Production d\'articles niveau McKinsey/Deloitte/PwC. 2 500 à 5 000 mots. Structure 9 sections : Executive Insight, Contexte, Diagnostic, Analyse, Solutions, Framework, Cas d\'Usage, Implications, CTA.',
    status: 'active',
    priority: 'critical',
    color: '#BE123C',
    hub_url: '/kos-blog-writing-automates',
    hub_name: 'Blog Writing Automates',
    production_pipeline: { total: 12, in_progress: 3, completed: 9, scheduled: 0 },
    kpis: [
      { name: 'Articles publiés', value: '10', target: '500', icon: 'ri-article-line' },
      { name: 'Score SEO moyen', value: '92.1', target: '95', icon: 'ri-search-line' },
      { name: 'Qualité moyenne', value: '9.2', target: '9.5', icon: 'ri-star-fill' },
      { name: 'Total mots', value: '31K', target: '1M', icon: 'ri-file-text-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: 'Article #9 publié — Régulation FinTech UEMOA 2026-2027 (3 200 mots)', type: 'production' },
      { date: '2026-06-16', description: 'Article #8 publié — Cybersécurité Bancaire COBAC 2027 (5 200 mots)', type: 'production' },
      { date: '2026-06-15', description: 'Master Prompt Agent #25 intégré — 9 articles pipeline S24-S25', type: 'milestone' },
    ],
    auto_generated: true,
    agent_name: 'KOS Blog Writing Automates™ (25 agents)',
  },
  {
    id: 6,
    name: 'Lead Magnets',
    short_name: 'Leads',
    icon: 'ri-download-line',
    description: 'Création systématique de checklists, guides, questionnaires, outils d\'auto-évaluation, matrices et scorecards. Conversion visiteurs → prospects qualifiés.',
    status: 'active',
    priority: 'high',
    color: '#7C3AED',
    hub_url: '/lead-magnets',
    hub_name: 'Lead Magnets',
    production_pipeline: { total: 15, in_progress: 5, completed: 8, scheduled: 2 },
    kpis: [
      { name: 'Lead Magnets', value: '8', target: '100', icon: 'ri-file-download-line' },
      { name: 'Téléchargements', value: '2.3K', target: '10K', icon: 'ri-download-cloud-line' },
      { name: 'Taux conversion', value: '15%', target: '25%', icon: 'ri-percent-line' },
      { name: 'Leads qualifiés', value: '345', target: '2.5K', icon: 'ri-user-star-line' },
    ],
    recent_activity: [
      { date: '2026-06-16', description: 'Lead Magnet généré — Checklist Conformité LBC/FT 127 points', type: 'production' },
      { date: '2026-06-12', description: 'Diagnostic Flash BCEAO/COBAC — 487 téléchargements ce mois', type: 'milestone' },
      { date: '2026-06-08', description: 'Nouveau template — Scorecard ESG Auto-évaluation', type: 'production' },
    ],
    auto_generated: true,
    agent_name: 'KOS Lead Magnet Converter™',
  },
  {
    id: 7,
    name: 'Études de Cas',
    short_name: 'Cas',
    icon: 'ri-folder-chart-line',
    description: 'Cas réels ou pédagogiques. Structure : contexte, problème, diagnostic, méthodologie Khepra, résultats, enseignements. Niveau HBR Case Study.',
    status: 'active',
    priority: 'medium',
    color: '#0D7B5F',
    hub_url: '/case-studies',
    hub_name: 'Case Studies',
    production_pipeline: { total: 8, in_progress: 3, completed: 5, scheduled: 0 },
    kpis: [
      { name: 'Études publiées', value: '5', target: '50', icon: 'ri-folder-line' },
      { name: 'Cas en pipeline', value: '3', target: '10', icon: 'ri-timer-line' },
      { name: 'Vues moyennes', value: '1.2K', target: '5K', icon: 'ri-eye-line' },
      { name: 'Conversion', value: '22%', target: '35%', icon: 'ri-user-add-line' },
    ],
    recent_activity: [
      { date: '2026-06-14', description: 'Nouveau cas en rédaction — Agrément SFD Multinational UEMOA/CEMAC', type: 'production' },
      { date: '2026-06-05', description: 'Cas publié — Gouvernance Board Advisory UEMOA', type: 'production' },
      { date: '2026-05-20', description: 'Cas publié — RegTech Conformité UEMOA/CEMAC', type: 'production' },
    ],
    auto_generated: false,
    agent_name: 'KOS Case Study Factory™ (supervisé)',
  },
  {
    id: 8,
    name: 'Livres Blancs',
    short_name: 'Whitepapers',
    icon: 'ri-book-open-line',
    description: 'Format 20 à 50 pages. Benchmark international, analyse Afrique francophone, impacts réglementaires, méthodologie Khepra, recommandations.',
    status: 'in_progress',
    priority: 'high',
    color: '#9B7B2C',
    hub_url: '/kos-research-institute',
    hub_name: 'Research Institute',
    production_pipeline: { total: 6, in_progress: 4, completed: 2, scheduled: 0 },
    kpis: [
      { name: 'Livres blancs', value: '2', target: '30', icon: 'ri-book-line' },
      { name: 'Pages moyennes', value: '35', target: '40', icon: 'ri-pages-line' },
      { name: 'Téléchargements', value: '1.8K', target: '15K', icon: 'ri-download-2-line' },
      { name: 'Citations externes', value: '56', target: '500', icon: 'ri-quote-text' },
    ],
    recent_activity: [
      { date: '2026-06-10', description: 'Livre blanc en cours — Baromètre Inclusion Financière UEMOA 2026', type: 'production' },
      { date: '2026-05-28', description: 'Livre blanc publié — Gouvernance des Banques face Bâle III en Afrique', type: 'production' },
      { date: '2026-05-15', description: 'Livre blanc publié — Due Diligence ESG en Afrique (42 pages)', type: 'production' },
    ],
    auto_generated: false,
    agent_name: 'KOS Research Institute™ (supervisé)',
  },
  {
    id: 9,
    name: 'Méthodologies KHEPRA',
    short_name: 'Frameworks',
    icon: 'ri-lightbulb-line',
    description: 'Création de frameworks propriétaires : KHEPRA RISK™, KHEPRA ESG™, KHEPRA GOVERNANCE™, KHEPRA INTERNAL CONTROL™, KHEPRA COMPLIANCE™, KHEPRA DIGITAL RISK™.',
    status: 'active',
    priority: 'high',
    color: '#D97706',
    hub_url: '/kos-knowledge-graph',
    hub_name: 'Knowledge Graph',
    production_pipeline: { total: 12, in_progress: 4, completed: 8, scheduled: 0 },
    kpis: [
      { name: 'Frameworks actifs', value: '8', target: '50', icon: 'ri-stack-line' },
      { name: 'Scores intégrés', value: '48', target: '300', icon: 'ri-bar-chart-grouped-line' },
      { name: 'Utilisations', value: '3.2K', target: '50K', icon: 'ri-flashlight-line' },
      { name: 'Maturité moyenne', value: '85%', target: '95%', icon: 'ri-trophy-line' },
    ],
    recent_activity: [
      { date: '2026-06-16', description: 'KOS Cyber Resilience Score™ intégré — Article #8', type: 'production' },
      { date: '2026-06-15', description: 'KOS FinTech Regulatory Readiness Score™ déployé — Article #9', type: 'production' },
      { date: '2026-06-10', description: 'KOS ALM Resilience Score™ — 38 banques auditées', type: 'milestone' },
    ],
    auto_generated: true,
    agent_name: 'KOS Methodology Factory™',
  },
  {
    id: 10,
    name: 'SEO Avancé',
    short_name: 'SEO+',
    icon: 'ri-search-eye-line',
    description: 'Pour chaque contenu : mot-clé principal, secondaires, title tag, meta description, slug, FAQ, schéma de maillage interne, liens externes institutionnels. Objectif Top 3 Google.',
    status: 'active',
    priority: 'critical',
    color: '#059669',
    hub_url: '/kos-seo-autopilot',
    hub_name: 'SEO Autopilot 2.0',
    production_pipeline: { total: 15, in_progress: 5, completed: 10, scheduled: 0 },
    kpis: [
      { name: 'Pages optimisées', value: '42', target: '200', icon: 'ri-pages-line' },
      { name: 'Schema.org', value: '12 types', target: '20', icon: 'ri-code-line' },
      { name: 'Core Web Vitals', value: '87%', target: '98%', icon: 'ri-speed-line' },
      { name: 'Rich Results', value: '104', target: '300', icon: 'ri-star-smile-line' },
    ],
    recent_activity: [
      { date: '2026-06-16', description: 'CWV — 87% pass rate, +35pts depuis Janvier', type: 'update' },
      { date: '2026-06-14', description: 'Schema.org — 14 erreurs corrigées, 4 opportunités manquantes', type: 'alert' },
      { date: '2026-06-10', description: 'SEO Autopilot 2.0 — 9 onglets, score 93/100', type: 'milestone' },
    ],
    auto_generated: true,
    agent_name: 'KOS SEO Autopilot 2.0™',
  },
  {
    id: 11,
    name: 'GEO Avancé',
    short_name: 'GEO+',
    icon: 'ri-global-line',
    description: 'Optimisation pour ChatGPT, Gemini, Claude, Perplexity, Copilot. Définitions, réponses courtes/détaillées, tableaux comparatifs, FAQ conversationnelles. Citation Khepra dans les réponses IA.',
    status: 'active',
    priority: 'high',
    color: '#2563EB',
    hub_url: '/kos-ai-visibility-command',
    hub_name: 'AI Visibility Command',
    production_pipeline: { total: 22, in_progress: 6, completed: 14, scheduled: 2 },
    kpis: [
      { name: 'Moteurs IA couverts', value: '6', target: '8', icon: 'ri-global-line' },
      { name: 'Score AEO', value: '78', target: '95', icon: 'ri-radar-line' },
      { name: 'Pages GEO-optimisées', value: '25', target: '100', icon: 'ri-file-list-3-line' },
      { name: 'llms.txt', value: '52 docs', target: '200', icon: 'ri-file-code-line' },
    ],
    recent_activity: [
      { date: '2026-06-15', description: 'Perplexity citations +93 ce mois — tendance ▲', type: 'milestone' },
      { date: '2026-06-12', description: 'FAQ Schema déployé sur 5 nouvelles pages', type: 'production' },
      { date: '2026-06-08', description: 'Copilot visibilité 45/100 — plan d\'amélioration activé', type: 'alert' },
    ],
    auto_generated: true,
    agent_name: 'KOS GEO Visibility Engine™',
  },
  {
    id: 12,
    name: 'Contrôle Qualité',
    short_name: 'Qualité',
    icon: 'ri-check-double-line',
    description: 'Vérification 8 points avant publication : exactitude factuelle, conformité réglementaire, qualité rédactionnelle, cohérence méthodologique, optimisation SEO, optimisation GEO, cohérence offre Khepra, potentiel commercial. Score ≥ 95/100 requis.',
    status: 'active',
    priority: 'critical',
    color: '#BE123C',
    hub_url: '/kos-quality-excellence-command',
    hub_name: 'Quality Excellence Command',
    production_pipeline: { total: 10, in_progress: 2, completed: 7, scheduled: 1 },
    kpis: [
      { name: 'Score qualité moyen', value: '9.2', target: '9.5', icon: 'ri-star-fill' },
      { name: 'Score ≥ 95', value: '7/10', target: '10/10', icon: 'ri-check-line' },
      { name: 'Contrôles auto', value: '12', target: '12', icon: 'ri-shield-check-line' },
      { name: 'Rejets qualité', value: '3', target: '0', icon: 'ri-close-circle-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: 'Article #9 validé — Score 92/100, 8/8 contrôles OK', type: 'production' },
      { date: '2026-06-15', description: 'Article #7 validé — Score 95/100, CIEL ATTEINT', type: 'milestone' },
      { date: '2026-06-12', description: 'Contrôle qualité automatisé — 12/12 Big Four actifs', type: 'update' },
    ],
    auto_generated: true,
    agent_name: 'KOS Quality Assurance Authority™',
  },
  {
    id: 13,
    name: 'Auto-Validation',
    short_name: 'Validation',
    icon: 'ri-sparkling-line',
    description: 'Si conformité atteinte + score ≥ 95 + sources vérifiées + SEO/GEO validé → APPROUVÉ PUBLICATION. Sinon, génération automatique des actions correctives jusqu\'à validation.',
    status: 'active',
    priority: 'critical',
    color: '#059669',
    hub_url: '/kos-corrective-execution-engine',
    hub_name: 'Corrective Execution Engine',
    production_pipeline: { total: 8, in_progress: 3, completed: 4, scheduled: 1 },
    kpis: [
      { name: 'Approbations auto', value: '7/10', target: '10/10', icon: 'ri-check-double-line' },
      { name: 'Corrections générées', value: '24', target: '—', icon: 'ri-tools-line' },
      { name: 'Temps moyen validation', value: '4.2h', target: '< 1h', icon: 'ri-timer-line' },
      { name: 'Boucles feedback', value: '6', target: '6', icon: 'ri-loop-left-line' },
    ],
    recent_activity: [
      { date: '2026-06-17', description: 'Auto-validation — Articles #1-9 tous validés', type: 'milestone' },
      { date: '2026-06-15', description: '3 corrections générées — Articles #5 (SEO) + #6 (références)', type: 'alert' },
      { date: '2026-06-10', description: 'Self-Improvement Engine v2 — 6 boucles actives', type: 'update' },
    ],
    auto_generated: true,
    agent_name: 'KOS Self-Improvement Engine™',
  },
];

export const CONTENT_FACTORY_OVERVIEW: ContentFactoryOverview = {
  blocks: CONTENT_FACTORY_BLOCKS,
  global_kpis: [
    { name: 'Articles experts (cible 1 000)', value: '10', target: '1 000', progress: 1, icon: 'ri-article-line' },
    { name: 'Études de cas (cible 200)', value: '5', target: '200', progress: 2.5, icon: 'ri-folder-chart-line' },
    { name: 'Livres blancs (cible 100)', value: '2', target: '100', progress: 2, icon: 'ri-book-open-line' },
    { name: 'Lead Magnets (cible 500)', value: '8', target: '500', progress: 1.6, icon: 'ri-download-line' },
    { name: 'Référentiels (cible 50)', value: '8', target: '50', progress: 16, icon: 'ri-lightbulb-line' },
    { name: 'Mots-clés Top 3 (cible 10K)', value: '47', target: '10 000', progress: 0.5, icon: 'ri-key-2-line' },
  ],
  production_velocity: {
    daily: 2.3,
    weekly: 9,
    monthly: 38,
    trend: 24,
  },
  quality_gate: {
    threshold: 95,
    current_avg: 92.4,
    passed: 7,
    failed: 3,
  },
  cross_canal_pipeline: {
    blog: 12,
    linkedin: 36,
    x: 18,
    newsletter: 4,
    lead_magnets: 6,
  },
  alerts: {
    critical: 2,
    high: 5,
    medium: 8,
    low: 3,
  },
};

export const BLOCK_STATUS_COLORS: Record<string, string> = {
  active: '#059669',
  in_progress: '#D97706',
  planned: '#6B7280',
  standby: '#9CA3AF',
};

export const BLOCK_PRIORITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  high: '#EA580C',
  medium: '#D97706',
  low: '#6B7280',
};

export const ACTIVITY_TYPE_ICONS: Record<string, string> = {
  production: 'ri-file-add-line',
  alert: 'ri-alert-line',
  milestone: 'ri-flag-line',
  update: 'ri-loop-left-line',
};

export const ACTIVITY_TYPE_COLORS: Record<string, string> = {
  production: '#059669',
  alert: '#DC2626',
  milestone: '#D97706',
  update: '#2563EB',
};

export const KPI_TARGETS_2026_2030 = {
  articles_experts: { current: 10, target: 1000, unit: 'articles' },
  etudes_cas: { current: 5, target: 200, unit: 'études' },
  livres_blancs: { current: 2, target: 100, unit: 'whitepapers' },
  lead_magnets: { current: 8, target: 500, unit: 'lead magnets' },
  referentiels: { current: 8, target: 50, unit: 'référentiels' },
  mots_cles_top3: { current: 47, target: 10000, unit: 'mots-clés' },
  domaine_autorite: { current: 72, target: 95, unit: 'score' },
  visibilite_ia: { current: 78, target: 98, unit: 'score' },
};