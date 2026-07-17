export const aiVisibilitySupremacy = {
  aiEngines: [
    { name: 'ChatGPT (GPT-4o)', visibility: 95, citations: 48, trend: 'up', strategy: 'FAQ Schema + Structured Answers + llms.txt optimisé' },
    { name: 'Google AI Overviews', visibility: 81, citations: 124, trend: 'up', strategy: 'Featured Snippets + PAA dominance + HowTo Schema' },
    { name: 'Perplexity AI', visibility: 85, citations: 93, trend: 'up', strategy: 'Citations académiques + sources vérifiables' },
    { name: 'Claude (Anthropic)', visibility: 72, citations: 22, trend: 'up', strategy: 'Long-form content + structured data' },
    { name: 'Google Gemini', visibility: 67, citations: 38, trend: 'up', strategy: 'Multimodal content + YouTube SEO' },
    { name: 'Microsoft Copilot', visibility: 58, citations: 15, trend: 'up', strategy: 'Bing Webmaster Tools + Schema' },
  ],
  geoScore: 96,
  aeoScore: 92,
  featuredSnippets: 52,
  paaPositions: 78,
  llmsTxtStatus: 'régénéré automatiquement quotidiennement',
  aiCrawlersTracked: 11,
  schemaOrgCoverage: 96,
  richResults: 142,
  totalCitations: 340,
  monthlyCitations: 18000
};

export const youtubeAutopilot = {
  workflows: [
    { id: 'wf-topic', name: 'Génération Sujets', status: 'running', success: 98, executions: 340 },
    { id: 'wf-script', name: 'Rédaction Scripts', status: 'running', success: 96, executions: 285 },
    { id: 'wf-voice', name: 'Voice-Over IA', status: 'running', success: 99, executions: 270 },
    { id: 'wf-video', name: 'Montage Vidéo', status: 'running', success: 92, executions: 245 },
    { id: 'wf-publish', name: 'Publication YouTube', status: 'running', success: 95, executions: 120 },
    { id: 'wf-seo', name: 'SEO YouTube', status: 'running', success: 94, executions: 200 },
    { id: 'wf-analytics', name: 'Analytics Auto', status: 'running', success: 99, executions: 365 },
    { id: 'wf-social', name: 'Distribution Sociale', status: 'running', success: 97, executions: 520 },
    { id: 'wf-optimize', name: 'Optimisation Continue', status: 'running', success: 93, executions: 180 },
  ],
  agents: 20,
  videosPublished: 28,
  totalViews: 184500,
  watchHours: 5230,
  avgQualityScore: 9.3,
  pipeline: '12 published · 8 in production · 8 planned',
  cronJobs: 5,
  edgeFunctions: 6,
  infrastructureHealth: 99.7
};

export const llmApiGateway = {
  models: [
    { provider: 'KOS Automaton', model: 'TextRank + TF-IDF + Cosine', type: 'NLP Autonome', costPer1k: 0, latency: '<50ms', status: 'primary', coverage: 'Résumé, Scoring, Recherche, Extraction' },
    { provider: 'KOS RAG Enterprise', model: 'pgvector + Cosine Similarity', type: 'Recherche Sémantique', costPer1k: 0, latency: '<150ms', status: 'primary', coverage: 'Base documentaire réglementaire' },
    { provider: 'Claude Opus', model: 'claude-3-opus', type: 'LLM Externe', costPer1k: 0, latency: '<2s', status: 'fallback', coverage: 'Analyses stratégiques complexes uniquement' },
    { provider: 'GPT-4o', model: 'gpt-4o', type: 'LLM Externe', costPer1k: 0, latency: '<1.5s', status: 'fallback', coverage: 'Contenu créatif longue forme (rare)' },
    { provider: 'KOS Voice AI', model: 'ElevenLabs TTS', type: 'Audio IA', costPer1k: 0, latency: '<3s', status: 'primary', coverage: 'Voice-over podcasts et vidéos' },
  ],
  routingStrategy: 'Automaton-first, LLM externes en fallback uniquement',
  costOptimization: '95% des requêtes servies par Automaton (zéro coût). 5% LLM externes pour cas complexes.',
  totalRequestsDay: 12500,
  automatonRequests: 11875,
  externalRequests: 625,
  averageLatency: '87ms',
  uptime: '99.97%',
  circuitBreakerActive: false,
  dlqSize: 0,
  fallbackChains: [
    { name: 'Summarization', primary: 'Automaton TextRank', fallback: 'GPT-4o-mini', lastResort: 'GPT-4o' },
    { name: 'Quality Scoring', primary: 'Automaton 6-dim', fallback: 'Claude Opus', lastResort: 'GPT-4o' },
    { name: 'Semantic Search', primary: 'RAG pgvector', fallback: 'Automaton TF-IDF', lastResort: 'GPT-4o embeddings' },
    { name: 'Content Generation', primary: 'Automaton Template', fallback: 'Claude Sonnet', lastResort: 'GPT-4o' },
    { name: 'Strategic Analysis', primary: 'Claude Opus', fallback: 'Automaton TextRank', lastResort: 'GPT-4o' },
  ]
};