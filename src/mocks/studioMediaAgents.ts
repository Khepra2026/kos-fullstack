// ============================================================
// KHEPRA EXPERTS — Studio Média — Agents IA Spécialisés
// Community Manager · Designer Infographiste · Expert LLM
// Production Dashboard Data
// ============================================================

// ─── AGENT 1 : COMMUNITY MANAGER ───
export interface CmCalendarEntry {
  day: number;
  platform: string;
  post_type: string;
  content: string;
  best_time: string;
  hashtags: string[];
  engagement_tip: string;
}

export const communityManagerFramework = {
  id: 'community-manager',
  title: 'Community Manager IA',
  subtitle: 'Calendrier éditorial · Stratégie d\'engagement · Croissance de communauté',
  icon: 'ri-chat-smile-2-line',
  description: 'Planification automatisée de contenu social media cross-plateforme. Génération de calendriers éditoriaux, stratégies d\'engagement, templates de réponses et plans de croissance de communauté pour LinkedIn, X, Instagram et YouTube.',
  deliverables: [
    { icon: 'ri-calendar-line', label: 'Calendrier éditorial', desc: 'Planification jour par jour sur 7-30 jours' },
    { icon: 'ri-file-text-line', label: 'Templates de posts', desc: '5 formats par plateforme, prêts à publier' },
    { icon: 'ri-question-answer-line', label: 'Templates de réponses', desc: 'Réponses types aux commentaires' },
    { icon: 'ri-line-chart-line', label: 'Plan de croissance', desc: 'Actions quotidiennes pour développer la communauté' },
    { icon: 'ri-hashtag', label: 'Hashtags optimisés', desc: 'Hashtags sectoriels et géographiques' },
    { icon: 'ri-timer-line', label: 'Best times', desc: 'Créneaux optimaux par plateforme' },
  ],
};

// ─── AGENT 2 : DESIGNER INFOGRAPHISTE ───
export interface DesignerBrief {
  title: string;
  concept: string;
  color_palette: string[];
  typography: string;
  layout_description: string;
  data_visualization: string;
  image_direction: string;
  technical_specs: string;
}

export const designerInfographisteFramework = {
  id: 'designer-infographiste',
  title: 'Designer Infographiste IA',
  subtitle: 'Briefs visuels · Direction artistique · Déclinaisons sociales',
  icon: 'ri-palette-line',
  description: 'Génération de briefs de conception visuelle complets pour infographies, carrousels LinkedIn, rapports visuels, mini-vidéos et présentations exécutives. Palette de couleurs, typographie, mise en page et spécifications techniques inclus.',
  deliverables: [
    { icon: 'ri-paint-brush-line', label: 'Brief visuel complet', desc: 'Concept, couleurs, typographie, mise en page' },
    { icon: 'ri-stack-line', label: '2 variations', desc: 'Styles alternatifs pour A/B testing' },
    { icon: 'ri-smartphone-line', label: 'Déclinaisons sociales', desc: 'LinkedIn, Instagram, X, YouTube' },
    { icon: 'ri-palette-line', label: 'Palette de couleurs', desc: '5 couleurs avec codes hexadécimaux' },
    { icon: 'ri-tools-line', label: 'Outils recommandés', desc: 'Canva Pro, Figma, Adobe Suite' },
    { icon: 'ri-file-list-3-line', label: 'Spécifications techniques', desc: 'Ratio, résolution, formats de fichiers' },
  ],
};

// ─── AGENT 3 : EXPERT LLM ───
export interface LLMContentBlock {
  type: string;
  title: string;
  content: string;
  word_count: number;
  seo_keywords: string[];
  prompts_for_llm: string[];
}

export const llmContentGeneratorFramework = {
  id: 'llm-content-generator',
  title: 'Expert LLM — Contenu 100% Original',
  subtitle: 'Chaînes de prompts · Structure éditoriale · Optimisation SEO',
  icon: 'ri-brain-2-line',
  description: 'Génération de contenu 100% original via des chaînes de prompts LLM optimisées. 6 formats de contenu (article expert, livre blanc, étude de cas, post LinkedIn, newsletter, rapport sectoriel), structure éditoriale complète, score d\'originalité et prompts prêts pour Claude, GPT-4 ou Gemini.',
  deliverables: [
    { icon: 'ri-file-text-line', label: 'Contenu structuré', desc: '6-8 sections avec contenu et word count' },
    { icon: 'ri-pages-line', label: 'Prompts LLM prêts', desc: 'Chaîne de prompts complète par section' },
    { icon: 'ri-sparkling-2-line', label: 'Score d\'originalité', desc: 'Indice d\'unicité du contenu généré' },
    { icon: 'ri-search-line', label: 'Optimisation SEO', desc: 'Mots-clés intégrés, densité cible' },
    { icon: 'ri-rocket-line', label: 'LLM recommandé', desc: 'Claude 3, GPT-4 ou Gemini selon le volume' },
    { icon: 'ri-timer-line', label: 'Temps estimé', desc: '15-90 secondes selon le format' },
  ],
};

// ─── PRODUCTION DASHBOARD DATA ───
export interface ProductionEntry {
  id: string;
  agent_id: string;
  agent_name: string;
  agent_icon: string;
  framework: string;
  topic: string;
  status: 'completed' | 'in_progress' | 'failed' | 'queued';
  sections_count: number;
  generated_at: string;
  duration: string;
  quality_score: number;
  originality_score?: number;
  platform?: string;
  format?: string;
}

export const productionHistory: ProductionEntry[] = [
  {
    id: 'prod-001',
    agent_id: 'community-manager',
    agent_name: 'Community Manager IA',
    agent_icon: 'ri-chat-smile-2-line',
    framework: 'community',
    topic: 'Gouvernance SFD UEMOA — Réformes 2026',
    status: 'completed',
    sections_count: 42,
    generated_at: '2026-06-20T08:15:00Z',
    duration: '28s',
    quality_score: 94,
    platform: 'linkedin',
  },
  {
    id: 'prod-002',
    agent_id: 'designer-infographiste',
    agent_name: 'Designer Infographiste IA',
    agent_icon: 'ri-palette-line',
    framework: 'designer',
    topic: 'Cartographie des Risques COSO — Infographie',
    status: 'completed',
    sections_count: 1,
    generated_at: '2026-06-20T09:30:00Z',
    duration: '18s',
    quality_score: 91,
    format: 'infographie',
  },
  {
    id: 'prod-003',
    agent_id: 'llm-content-generator',
    agent_name: 'Expert LLM',
    agent_icon: 'ri-brain-2-line',
    framework: 'llm',
    topic: 'Conformité LCB/FT — Nouvelles Exigences GAFI 2026',
    status: 'completed',
    sections_count: 7,
    generated_at: '2026-06-20T10:45:00Z',
    duration: '42s',
    quality_score: 96,
    originality_score: 89,
  },
  {
    id: 'prod-004',
    agent_id: 'studio-media-orchestrator',
    agent_name: 'Studio Média Orchestrator',
    agent_icon: 'ri-robot-2-line',
    framework: 'podcast',
    topic: 'Transformation Digitale des Banques Africaines',
    status: 'completed',
    sections_count: 6,
    generated_at: '2026-06-19T14:20:00Z',
    duration: '35s',
    quality_score: 88,
  },
  {
    id: 'prod-005',
    agent_id: 'studio-media-orchestrator',
    agent_name: 'Studio Média Orchestrator',
    agent_icon: 'ri-robot-2-line',
    framework: 'youtube',
    topic: 'Préparer une Inspection COBAC — Guide Vidéo',
    status: 'completed',
    sections_count: 6,
    generated_at: '2026-06-19T11:00:00Z',
    duration: '31s',
    quality_score: 90,
  },
  {
    id: 'prod-006',
    agent_id: 'community-manager',
    agent_name: 'Community Manager IA',
    agent_icon: 'ri-chat-smile-2-line',
    framework: 'community',
    topic: 'ESG et Compétitivité — Campagne LinkedIn',
    status: 'completed',
    sections_count: 28,
    generated_at: '2026-06-19T09:00:00Z',
    duration: '22s',
    quality_score: 92,
    platform: 'linkedin',
  },
  {
    id: 'prod-007',
    agent_id: 'llm-content-generator',
    agent_name: 'Expert LLM',
    agent_icon: 'ri-brain-2-line',
    framework: 'llm',
    topic: 'Due Diligence Acquisition en Afrique — Guide Complet',
    status: 'completed',
    sections_count: 7,
    generated_at: '2026-06-18T16:30:00Z',
    duration: '55s',
    quality_score: 93,
    originality_score: 91,
  },
  {
    id: 'prod-008',
    agent_id: 'designer-infographiste',
    agent_name: 'Designer Infographiste IA',
    agent_icon: 'ri-palette-line',
    framework: 'designer',
    topic: 'Benchmark Sectoriel Microfinance UEMOA — Rapport Visuel',
    status: 'completed',
    sections_count: 1,
    generated_at: '2026-06-18T13:15:00Z',
    duration: '25s',
    quality_score: 87,
    format: 'rapport_visuel',
  },
  {
    id: 'prod-009',
    agent_id: 'studio-media-orchestrator',
    agent_name: 'Studio Média Orchestrator',
    agent_icon: 'ri-robot-2-line',
    framework: 'geo',
    topic: 'Optimisation GEO — Visibilité IA KHEPRA EXPERTS',
    status: 'completed',
    sections_count: 6,
    generated_at: '2026-06-18T10:00:00Z',
    duration: '38s',
    quality_score: 89,
  },
  {
    id: 'prod-010',
    agent_id: 'community-manager',
    agent_name: 'Community Manager IA',
    agent_icon: 'ri-chat-smile-2-line',
    framework: 'community',
    topic: 'Prix de Transfert BEPS — Campagne X/Twitter',
    status: 'in_progress',
    sections_count: 14,
    generated_at: '2026-06-20T11:30:00Z',
    duration: 'en cours...',
    quality_score: 0,
    platform: 'x',
  },
  {
    id: 'prod-011',
    agent_id: 'llm-content-generator',
    agent_name: 'Expert LLM',
    agent_icon: 'ri-brain-2-line',
    framework: 'llm',
    topic: 'Rapport Sectoriel — Fintech en Zone UEMOA 2026',
    status: 'queued',
    sections_count: 0,
    generated_at: '2026-06-20T12:00:00Z',
    duration: 'en attente...',
    quality_score: 0,
  },
  {
    id: 'prod-012',
    agent_id: 'designer-infographiste',
    agent_name: 'Designer Infographiste IA',
    agent_icon: 'ri-palette-line',
    framework: 'designer',
    topic: 'Stratégie ESG — Carrousel LinkedIn Exécutif',
    status: 'completed',
    sections_count: 1,
    generated_at: '2026-06-17T15:45:00Z',
    duration: '20s',
    quality_score: 95,
    format: 'carousel_linkedin',
  },
];

// ─── DASHBOARD KPIS ───
export const productionKPIs = {
  totalProductions: 127,
  productionsThisWeek: 18,
  productionsToday: 5,
  successRate: 96.8,
  averageQualityScore: 91.2,
  averageGenerationTime: '32s',
  mostUsedAgent: 'Expert LLM',
  mostUsedFramework: 'Podcast',
  totalWordsGenerated: 284500,
  activeAgents: 4,
};

export const agentPerformance = [
  { agent: 'Expert LLM', productions: 38, quality: 93.5, icon: 'ri-brain-2-line', color: 'primary' },
  { agent: 'Community Manager', productions: 35, quality: 91.2, icon: 'ri-chat-smile-2-line', color: 'accent' },
  { agent: 'Studio Média Orchestrator', productions: 32, quality: 89.7, icon: 'ri-robot-2-line', color: 'secondary' },
  { agent: 'Designer Infographiste', productions: 22, quality: 90.8, icon: 'ri-palette-line', color: 'primary' },
];

export const frameworkDistribution = [
  { framework: 'Podcast', count: 28, percentage: 22 },
  { framework: 'YouTube', count: 22, percentage: 17 },
  { framework: 'GEO/SEO', count: 20, percentage: 16 },
  { framework: 'Business Dev', count: 18, percentage: 14 },
  { framework: 'Community Mgmt', count: 16, percentage: 13 },
  { framework: 'LLM Content', count: 15, percentage: 12 },
  { framework: 'Design Visuel', count: 8, percentage: 6 },
];





