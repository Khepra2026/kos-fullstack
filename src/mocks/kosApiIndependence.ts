export const apiIndependenceProviders = [
  {
    id: 'openai',
    name: 'OpenAI (GPT-4o, GPT-4, Embeddings)',
    category: 'LLM & NLP',
    currentDependency: 12,
    targetDependency: 0,
    independenceScore: 88,
    strategy: 'KOS Automaton Engine™ — NLP 100% autonome (TF-IDF, TextRank, Cosine Similarity). Résumé extractif, scoring qualité, recherche sémantique, extraction mots-clés. Zéro appel OpenAI pour les tâches critiques.',
    fallbackChain: ['kos-automaton-engine (primaire)', 'kos-llm-content-generator (fallback)', 'GPT-4o-mini (last resort)'],
    endpoints: ['/v1/chat/completions', '/v1/embeddings'],
    monthlyCost: 0,
    status: 'optimal',
    replacedBy: 'KOS Automaton Engine™ v3.0',
    migrationDate: '15 Juin 2026',
    criticalPaths: ['Résumé article', 'Scoring qualité', 'Recherche sémantique', 'Extraction entités'],
    autonomousPaths: 4,
    totalPaths: 4
  },
  {
    id: 'claude',
    name: 'Anthropic Claude (Opus, Sonnet)',
    category: 'LLM & NLP',
    currentDependency: 8,
    targetDependency: 2,
    independenceScore: 75,
    strategy: 'KOS Strategic Reasoning Engine™ + KOS Executive Research Engine™. Maintien Claude Opus pour analyses stratégiques complexes uniquement. Tout le reste → Automaton.',
    fallbackChain: ['claude-opus (stratégique)', 'kos-strategic-intelligence', 'kos-automaton-engine'],
    endpoints: ['/v1/messages'],
    monthlyCost: 0,
    status: 'stable',
    replacedBy: 'KOS Strategic Intelligence™ (partiel)',
    migrationDate: 'En cours — cible Sept 2026',
    criticalPaths: ['Analyse stratégique COMEX', 'Due Diligence complexe', 'Board advisory'],
    autonomousPaths: 1,
    totalPaths: 3
  },
  {
    id: 'supabase',
    name: 'Supabase (Database, Auth, Storage, Edge Functions)',
    category: 'Infrastructure',
    currentDependency: 98,
    targetDependency: 80,
    independenceScore: 18,
    strategy: 'Infrastructure cœur — irremplaçable à court terme. Stratégie : cache local agressif, IndexedDB fallback pour lectures, Service Worker offline. 261 tables → données critiques dupliquées en localStorage + Cache Storage.',
    fallbackChain: ['supabase-live (primaire)', 'indexeddb-cache', 'localstorage-fallback', 'mock-data (dernier recours)'],
    endpoints: ['rest/v1/*', 'storage/v1/*', 'auth/v1/*'],
    monthlyCost: 0,
    status: 'critical',
    replacedBy: 'Cache local + IndexedDB (partiel)',
    migrationDate: 'Long terme — dépendance structurelle',
    criticalPaths: ['Stockage données', 'Authentification', 'Edge Functions', 'RLS'],
    autonomousPaths: 0,
    totalPaths: 4
  },
  {
    id: 'readdy',
    name: 'Readdy.ai (Forms, Hosting, Build, Analytics)',
    category: 'Plateforme',
    currentDependency: 15,
    targetDependency: 8,
    independenceScore: 47,
    strategy: 'Formulaires → Readdy Forms conservé (conformité RGPD). Build → Vite autonome (via Readdy). Analytics → KOS Analytics interne. Hosting → Netlify edge.',
    fallbackChain: ['readdy-forms (primaire)', 'supabase-forms (fallback)', 'netlify-forms (tertiaire)'],
    endpoints: ['/api/forms/*', '/api/build/*'],
    monthlyCost: 0,
    status: 'stable',
    replacedBy: 'KOS Analytics + Netlify Edge (partiel)',
    migrationDate: 'Progressif — Q3-Q4 2026',
    criticalPaths: ['Formulaires lead', 'Build & déploiement', 'Hébergement'],
    autonomousPaths: 1,
    totalPaths: 3
  },
  {
    id: 'google',
    name: 'Google (GSC, Analytics, YouTube API, Maps, Fonts)',
    category: 'Écosystème',
    currentDependency: 22,
    targetDependency: 10,
    independenceScore: 55,
    strategy: 'GSC → KOS GSC Monitor (edge function autonome). Analytics → KOS Analytics (Supabase). YouTube API → OAuth conservé (pas d\'alternative). Maps → Cartes statiques SVG AfricaMapInteractive. Fonts → Google Fonts conservé (CDN gratuit).',
    fallbackChain: ['google-apis (primaire)', 'kos-gsc-monitor', 'kos-analytics', 'static-maps'],
    endpoints: ['/webmasters/v3/*', '/analytics/v3/*', '/youtube/v3/*', '/maps/*'],
    monthlyCost: 0,
    status: 'stable',
    replacedBy: 'KOS GSC Monitor + KOS Analytics (partiel)',
    migrationDate: 'Progressif — 60% déjà migré',
    criticalPaths: ['YouTube OAuth', 'Google Search Console', 'Analytics', 'Maps', 'Fonts'],
    autonomousPaths: 3,
    totalPaths: 5
  },
  {
    id: 'n8n',
    name: 'n8n (Workflow Automation)',
    category: 'Automatisation',
    currentDependency: 0,
    targetDependency: 0,
    independenceScore: 100,
    strategy: '✅ TOTALEMENT REMPLACÉ. KOS Orchestrator Engine™ (16 actions) + 32 cron jobs Supabase + 99 Edge Functions = équivalent n8n 100% interne. State Machine, Circuit Breaker, DLQ, Retry Exponentiel.',
    fallbackChain: ['kos-orchestrator-engine (unique)'],
    endpoints: [],
    monthlyCost: 0,
    status: 'optimal',
    replacedBy: 'KOS Orchestrator Engine™ + Cron Jobs',
    migrationDate: '21 Juin 2026 — Complété',
    criticalPaths: [],
    autonomousPaths: 8,
    totalPaths: 8
  },
  {
    id: 'linkedin',
    name: 'LinkedIn API (Social Selling, MDP)',
    category: 'Social Media',
    currentDependency: 6,
    targetDependency: 3,
    independenceScore: 50,
    strategy: 'LinkedIn Bridge → agrégation multi-source (OEmbed + OpenGraph + Snapshots Supabase). MDP remplacé pour les métriques Page. API Marketing conservée pour Social Selling (pas d\'alternative).',
    fallbackChain: ['linkedin-api', 'kos-linkedin-bridge', 'social-metrics-fallback'],
    endpoints: ['/v2/*', '/rest/posts'],
    monthlyCost: 0,
    status: 'stable',
    replacedBy: 'KOS LinkedIn Bridge™ (partiel)',
    migrationDate: '13 Juin 2026 — MDP remplacé',
    criticalPaths: ['Social Selling Engine', 'Page metrics', 'Content publishing'],
    autonomousPaths: 1,
    totalPaths: 3
  },
  {
    id: 'stripe',
    name: 'Stripe (Payments)',
    category: 'Monétisation',
    currentDependency: 0,
    targetDependency: 0,
    independenceScore: 100,
    strategy: 'Non connecté. Si besoin futur → Edge Function kos-platform-credentials avec secret Supabase. Circuit Breaker + fallback manuel.',
    fallbackChain: [],
    endpoints: [],
    monthlyCost: 0,
    status: 'idle',
    replacedBy: 'N/A',
    migrationDate: 'N/A',
    criticalPaths: [],
    autonomousPaths: 0,
    totalPaths: 0
  }
];

export const apiIndependenceKPIs = {
  totalProviders: 8,
  fullyIndependent: 3,
  partiallyIndependent: 4,
  structurallyDependent: 1,
  globalIndependenceScore: 67,
  targetIndependenceScore: 85,
  monthlyExternalCost: 0,
  endpointsExternal: 18,
  endpointsInternal: 94,
  fallbackStrategies: 8,
  autonomousPaths: 18,
  totalPaths: 30,
  autonomyRate: 60,
  criticalDependencies: ['Supabase (infrastructure)', 'YouTube OAuth (pas d\'alternative)', 'Google Fonts CDN'],
  migrationCompleted: ['n8n → KOS Orchestrator', 'OpenAI → KOS Automaton (critique)', 'LinkedIn MDP → Bridge'],
  migrationInProgress: ['Claude → KOS Strategic Intelligence', 'Google GSC → KOS GSC Monitor', 'Readdy Analytics → KOS Analytics'],
  migrationPlanned: ['Supabase partial cache', 'Google Maps → SVG statique']
};

export const automatonCapabilities = [
  { name: 'Résumé Extractif (TextRank)', type: 'NLP', replaces: 'OpenAI GPT-4o', latency: '<50ms', cost: 0, status: 'production' },
  { name: 'Scoring Qualité 6 Dimensions', type: 'Quality', replaces: 'OpenAI + Claude', latency: '<100ms', cost: 0, status: 'production' },
  { name: 'Recherche Sémantique (TF-IDF + Cosine)', type: 'Search', replaces: 'OpenAI Embeddings', latency: '<200ms', cost: 0, status: 'production' },
  { name: 'Recommandations (Jaccard Similarity)', type: 'ML', replaces: 'OpenAI GPT-4o', latency: '<80ms', cost: 0, status: 'production' },
  { name: 'Extraction Mots-Clés', type: 'NLP', replaces: 'OpenAI GPT-4o', latency: '<30ms', cost: 0, status: 'production' },
  { name: 'Quality Gates Déterministes', type: 'Quality', replaces: 'Claude Opus', latency: '<10ms', cost: 0, status: 'production' },
  { name: 'Tokenisation + Stopwords FR/EN', type: 'NLP', replaces: 'OpenAI', latency: '<5ms', cost: 0, status: 'production' },
  { name: 'RAG Vectoriel (pgvector)', type: 'Search', replaces: 'Pinecone/Weaviate', latency: '<150ms', cost: 0, status: 'production' }
];

export const fallbackStrategies = [
  { name: 'Cache Local Aggressif', layer: 'Frontend', pattern: 'IndexedDB + Cache Storage + Service Worker', coverage: 'Lectures Supabase', hitRate: 94 },
  { name: 'Circuit Breaker', layer: 'Edge Functions', pattern: '5 échecs → circuit ouvert 60s', coverage: 'Toutes les Edge Functions', hitRate: 100 },
  { name: 'Retry Exponentiel', layer: 'Edge Functions', pattern: '1s → 4s → 16s → DLQ', coverage: 'Appels API externes', hitRate: 97 },
  { name: 'Dead Letter Queue', layer: 'Edge Functions', pattern: 'Stockage jobs échoués avec retry programmé', coverage: 'Tous les workflows', hitRate: 100 },
  { name: 'Mock Data Fallback', layer: 'Frontend', pattern: 'Fallback automatique si Supabase down', coverage: 'Tous les hubs', hitRate: 100 },
  { name: 'Graceful Degradation', layer: 'Frontend', pattern: 'Dégradation fonctionnelle sans interruption UX', coverage: 'Pages publiques', hitRate: 100 },
  { name: 'Service Worker Offline', layer: 'Frontend', pattern: 'Cache pages critiques pour offline', coverage: 'Home, Blog, Services', hitRate: 85 },
  { name: 'Multi-Source Aggregation', layer: 'Edge Functions', pattern: 'OEmbed + OpenGraph + Snapshots', coverage: 'LinkedIn content', hitRate: 92 }
];

export const independenceRoadmap = [
  { phase: 'Phase 1 — Fondations', date: 'Juin 2026', progress: 100, achievements: ['Automaton Engine remplace OpenAI', 'n8n remplacé par Orchestrator', 'MDP LinkedIn remplacé par Bridge', 'RAG 100% autonome'] },
  { phase: 'Phase 2 — Indépendance LLM', date: 'Juillet-Août 2026', progress: 60, achievements: ['Claude → Strategic Intelligence (75%)', 'LLM Gateway avec rotation modèles', 'Cost tracking unifié'] },
  { phase: 'Phase 3 — Indépendance Infra', date: 'Septembre-Octobre 2026', progress: 30, achievements: ['Cache local IndexedDB lectures Supabase', 'Service Worker offline pages critiques', 'Analytics interne remplace Google Analytics'] },
  { phase: 'Phase 4 — Indépendance Totale', date: 'Novembre-Décembre 2026', progress: 10, achievements: ['Supabase partial cache 80%+', 'GSC Monitor autonome 100%', 'Score indépendance global 85/100'] }
];

export const independenceAlerts = [
  { id: 'ALERT-001', provider: 'supabase', severity: 'critical', message: 'Dépendance structurelle — 261 tables. Cache local à 18%.', action: 'Accélérer Phase 3 IndexedDB caching.' },
  { id: 'ALERT-002', provider: 'claude', severity: 'high', message: '8 appels stratégiques encore sur Claude. Migration Strategic Intelligence à 75%.', action: 'Terminer migration J+30.' },
  { id: 'ALERT-003', provider: 'google', severity: 'medium', message: 'YouTube OAuth irremplaçable. Acceptation stratégique.', action: 'Monitorer quota API YouTube.' },
  { id: 'ALERT-004', provider: 'readdy', severity: 'low', message: 'Readdy Forms conservé pour conformité RGPD. Pas de plan migration.', action: 'Aucun — choix stratégique validé.' }
];





