export interface RuntimeComponent {
  id: string;
  num: string;
  title: string;
  role: string;
  description: string;
  icon: string;
  technology?: string;
  endpoints?: string[];
  details?: string[];
  subLayers?: { title: string; description: string; icon: string; items: string[] }[];
  scoringRules?: { label: string; threshold: string; color: string; action: string }[];
  stack?: { category: string; items: string[] }[];
}

export interface ArchitectureStep {
  step: string;
  label: string;
  icon: string;
  description: string;
}

export interface RuntimeKPI {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const runtimeIntro = {
  title: 'KOS Runtime Engine™',
  subtitle: 'Core Execution System · Big Four AI Operating Layer',
  version: 'VERSION PRODUCTION – BIG FOUR AI STANDARD',
  role: 'Le KOS Runtime Engine™ est le noyau opérationnel qui reçoit les requêtes utilisateurs, orchestre les agents IA, exécute les workflows, interagit avec le RAG, applique les règles de gouvernance, produit les livrables et trace/audite chaque action.',
  tagline: 'C\'est le « CPU du système KOS »',
  conclusion: 'Le KOS Runtime Engine™ est le noyau technique qui transforme KOS de système conceptuel en plateforme logicielle réelle. C\'est lui qui fait passer de l\'architecture d\'agents à une plateforme exécutable.',
};

export const architectureFlow: ArchitectureStep[] = [
  { step: '01', label: 'USER / API REQUEST', icon: 'ri-user-line', description: 'Requête entrante utilisateur ou API externe' },
  { step: '02', label: 'API GATEWAY (FastAPI)', icon: 'ri-router-line', description: 'Réception, authentification, routage' },
  { step: '03', label: 'INTENT CLASSIFIER', icon: 'ri-brain-line', description: 'Classification du type de demande' },
  { step: '04', label: 'ORCHESTRATOR (LangGraph)', icon: 'ri-cpu-line', description: 'Planification du workflow' },
  { step: '05', label: 'AGENT ROUTER', icon: 'ri-git-branch-line', description: 'Attribution aux agents spécialisés' },
  { step: '06', label: 'MULTI-AGENT EXECUTION LAYER', icon: 'ri-team-line', description: 'Analyse parallèle multi-agents' },
  { step: '07', label: 'RAG ENGINE', icon: 'ri-database-2-line', description: 'Vector DB + Knowledge Graph' },
  { step: '08', label: 'REASONING LAYER', icon: 'ri-lightbulb-flash-line', description: 'LLM + Rules Engine' },
  { step: '09', label: 'OUTPUT ASSEMBLER', icon: 'ri-file-list-3-line', description: 'Structuration Big Four' },
  { step: '10', label: 'QUALITY CONTROL ENGINE', icon: 'ri-shield-check-line', description: 'Vérification ≥ 95/100' },
  { step: '11', label: 'RESPONSE / REPORT / ACTION', icon: 'ri-send-plane-line', description: 'Livraison finale' },
];

export const runtimeComponents: RuntimeComponent[] = [
  {
    id: 'api-gateway',
    num: '3.1',
    title: 'API Gateway Layer',
    role: 'Recevoir toutes les requêtes, authentifier, router vers le runtime',
    description: 'Point d\'entrée unique de toutes les requêtes KOS. FastAPI (Python) assure la réception, l\'authentification et le routage vers les composants internes.',
    icon: 'ri-router-line',
    technology: 'FastAPI (Python)',
    endpoints: ['/query', '/diagnostic', '/lead-score', '/report/generate', '/agent/execute'],
  },
  {
    id: 'intent-classifier',
    num: '3.2',
    title: 'Intent Classifier Engine™',
    role: 'Identifier le type de demande : stratégie, finance, juridique, audit, ESG, lead, support',
    description: 'Analyse la requête entrante et la classifie pour déterminer quels agents et workflows activer.',
    icon: 'ri-brain-line',
    details: ['Stratégie', 'Finance', 'Juridique', 'Audit', 'ESG', 'Lead Qualification', 'Support'],
  },
  {
    id: 'orchestrator-core',
    num: '3.3',
    title: 'KOS Orchestrator Core™',
    role: 'Cœur décisionnel : planifie les agents, construit le workflow dynamique, gère les dépendances',
    description: 'Le composant central qui orchestre l\'ensemble de l\'exécution. Il décide quels agents activer, dans quel ordre, et comment consolider leurs résultats.',
    icon: 'ri-cpu-line',
    technology: 'LangGraph (recommandé) ou State Machine custom (Python)',
  },
  {
    id: 'agent-router',
    num: '3.4',
    title: 'Agent Router™',
    role: 'Attribuer les tâches aux bons agents : Strategy, Finance, Legal, ESG, Risk',
    description: 'Route intelligemment chaque sous-tâche vers l\'agent spécialisé le plus pertinent, avec une logique conditionnelle avancée.',
    icon: 'ri-git-branch-line',
    details: ['Strategy Agent', 'Finance Agent', 'Legal Agent', 'ESG Agent', 'Risk Agent'],
  },
  {
    id: 'multi-agent-execution',
    num: '3.5',
    title: 'Multi-Agent Execution Layer™',
    role: 'Exécution parallèle : agents indépendants, analyses simultanées, consolidation finale',
    description: 'La couche d\'exécution qui lance les agents en parallèle (mode parallel), séquentiel ou hybride selon la complexité de la requête.',
    icon: 'ri-team-line',
    details: ['Mode Parallel', 'Mode Sequential', 'Mode Hybrid'],
  },
  {
    id: 'rag-engine',
    num: '3.6',
    title: 'RAG Engine™',
    role: 'Sous-systèmes : Vector DB (Qdrant), Knowledge Graph (Neo4j/RDF), Retriever (semantic, hybrid, reranking)',
    description: 'Le moteur de Retrieval Augmented Generation qui alimente les agents en données vérifiées.',
    icon: 'ri-database-2-line',
    subLayers: [
      {
        title: 'Vector DB',
        description: 'Qdrant (recommandé) — embedding et recherche sémantique',
        icon: 'ri-database-2-line',
        items: ['Embedding documents', 'Recherche sémantique', 'Ranking contextuel'],
      },
      {
        title: 'Knowledge Graph',
        description: 'Neo4j ou RDF store — relations structurées',
        icon: 'ri-git-branch-line',
        items: ['Entités métier', 'Relations transverses', 'Inférence contextuelle'],
      },
      {
        title: 'Retriever',
        description: 'Recherche hybride multi-méthodes',
        icon: 'ri-search-line',
        items: ['Semantic search', 'Hybrid search', 'Reranking'],
      },
    ],
  },
  {
    id: 'reasoning-engine',
    num: '3.7',
    title: 'Reasoning Engine™',
    role: 'Fusion : données RAG, outputs agents, règles métier',
    description: 'Combine les données du RAG, les outputs des agents et les règles métier pour produire un raisonnement cohérent et fondé.',
    icon: 'ri-lightbulb-flash-line',
    details: ['LLM reasoning (GPT/Claude)', 'Rules engine (Python)', 'Constraint validation'],
  },
  {
    id: 'output-assembler',
    num: '3.8',
    title: 'Output Assembler™',
    role: 'Transformer les résultats en diagnostic structuré, rapport Big Four, recommandation, plan d\'action',
    description: 'Structure les résultats bruts en livrables professionnels au format Big Four.',
    icon: 'ri-file-list-3-line',
    details: ['Executive Summary', 'Situation Analysis', 'Key Risks', 'Opportunities', 'Recommendations', 'Action Plan', 'Confidence Score'],
  },
  {
    id: 'quality-control-engine',
    num: '3.9',
    title: 'Quality Control Engine™',
    role: 'Rôle critique : vérifie les hallucinations, incohérences, sources et logique. Score minimal 95/100.',
    description: 'Le dernier rempart avant diffusion. Vérifie chaque réponse sur 4 dimensions critiques.',
    icon: 'ri-shield-check-line',
    scoringRules: [
      { label: 'Score ≥ 95', threshold: '95+', color: 'bg-emerald-500', action: 'Diffusion autorisée' },
      { label: 'Score < 95', threshold: '< 95', color: 'bg-rose-500', action: 'trigger_revision() → Correction automatique' },
    ],
    details: ['Détection hallucinations', 'Vérification incohérences', 'Traçabilité sources', 'Validation logique'],
  },
  {
    id: 'memory-state-engine',
    num: '3.10',
    title: 'Memory & State Engine™',
    role: 'Stocker : conversations, diagnostics, décisions, leads, clients',
    description: 'La couche de persistance qui conserve la mémoire du système sur 3 niveaux.',
    icon: 'ri-hard-drive-2-line',
    subLayers: [
      {
        title: 'PostgreSQL',
        description: 'Données structurées',
        icon: 'ri-database-2-line',
        items: ['Conversations', 'Diagnostics', 'Décisions', 'Leads', 'Clients'],
      },
      {
        title: 'Redis',
        description: 'Cache et état',
        icon: 'ri-flashlight-line',
        items: ['Cache state', 'Session data', 'Real-time context'],
      },
      {
        title: 'Vector DB',
        description: 'Mémoire sémantique',
        icon: 'ri-brain-line',
        items: ['Semantic memory', 'Historical patterns', 'Knowledge embeddings'],
      },
    ],
  },
];

export const executionExample = {
  input: 'Audit financier de mon entreprise',
  steps: [
    { agent: 'API Gateway', action: 'Reçoit la requête', icon: 'ri-router-line' },
    { agent: 'Intent Classifier', action: '→ "financial_audit"', icon: 'ri-brain-line' },
    { agent: 'Orchestrator', action: 'Crée le workflow', icon: 'ri-cpu-line' },
    { agent: 'Agents activés', action: 'Finance Agent + Risk Agent + Audit Agent', icon: 'ri-team-line' },
    { agent: 'RAG Engine', action: 'Récupère les données', icon: 'ri-database-2-line' },
    { agent: 'Reasoning Engine', action: 'Analyse', icon: 'ri-lightbulb-flash-line' },
    { agent: 'Output Assembler', action: 'Génère le rapport', icon: 'ri-file-list-3-line' },
    { agent: 'Quality Engine', action: 'Vérifie ≥ 95/100', icon: 'ri-shield-check-line' },
    { agent: 'Response', action: 'Retourne le diagnostic', icon: 'ri-send-plane-line' },
  ],
};

export const technicalStack = [
  {
    category: 'Backend Core',
    items: ['FastAPI', 'Python 3.11+'],
    icon: 'ri-server-line',
  },
  {
    category: 'Orchestration',
    items: ['LangGraph', 'CrewAI (optionnel)'],
    icon: 'ri-cpu-line',
  },
  {
    category: 'RAG',
    items: ['Qdrant (Vector DB)', 'Neo4j (Graph)'],
    icon: 'ri-database-2-line',
  },
  {
    category: 'Data',
    items: ['PostgreSQL', 'Redis'],
    icon: 'ri-hard-drive-2-line',
  },
  {
    category: 'LLM Layer',
    items: ['GPT-5', 'Claude', 'Mix routing'],
    icon: 'ri-brain-line',
  },
  {
    category: 'Observability',
    items: ['Prometheus', 'Grafana', 'OpenTelemetry'],
    icon: 'ri-bar-chart-2-line',
  },
  {
    category: 'Event System',
    items: ['Kafka ou NATS'],
    icon: 'ri-exchange-line',
  },
];

export const runtimeKPIs: RuntimeKPI[] = [
  { label: 'Latence', value: '< 3–5s', icon: 'ri-timer-line', color: 'from-sky-600 to-sky-700' },
  { label: 'Accuracy', value: '≥ 95%', icon: 'ri-crosshair-line', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Hallucination rate', value: '< 1%', icon: 'ri-shield-check-line', color: 'from-rose-600 to-rose-700' },
  { label: 'Multi-agent coherence', value: '≥ 95%', icon: 'ri-team-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Conversion RDV', value: '25–40%', icon: 'ri-calendar-check-line', color: 'from-violet-600 to-violet-700' },
];

export const bigFourDiff = [
  { title: 'Orchestration réelle', description: 'Pas du prompt — des workflows exécutables avec état et traçabilité.', icon: 'ri-cpu-line', color: 'from-deloitte-600 to-deloitte-700' },
  { title: 'RAG industrialisé', description: 'Vector DB + Knowledge Graph + Reranking, pas une simple recherche.', icon: 'ri-database-2-line', color: 'from-emerald-600 to-emerald-700' },
  { title: 'Quality gate obligatoire', description: 'Aucune réponse ne passe sans score ≥ 95/100. Veto qualité contraignant.', icon: 'ri-shield-check-line', color: 'from-amber-600 to-amber-700' },
];

export const limitations = [
  'Il faut implémenter le code réel',
  'Connecter les données réelles',
  'Structurer l\'API réelle',
  'Définir les schémas DB',
];

export const nextStep = 'KOS API SPECIFICATION LAYER™ — Endpoints complets (100% SaaS), schémas JSON, base de données, architecture multi-tenant, auth + billing, architecture AWS/Azure déployable.';