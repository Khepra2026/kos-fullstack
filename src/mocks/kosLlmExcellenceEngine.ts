// KOS LLM Excellence Engine™ — Master Prompt Big Four
// Programme de Renforcement des Compétences LLM des Agents et Automates KOS

export interface LlmModelCapability {
  model: string;
  provider: string;
  capabilities: string[];
  useCases: string[];
  color: string;
  icon: string;
}

export interface TaskAffectation {
  task: string;
  primaryModel: string;
  verifierModel: string;
  priority: 'critical' | 'high' | 'medium';
  agentCount: number;
}

export interface PromptTechnique {
  id: string;
  name: string;
  description: string;
  methodology: string[];
  agentsFormed: number;
  successRate: number;
  icon: string;
  color: string;
}

export interface RagSource {
  id: string;
  name: string;
  type: 'interne' | 'externe';
  category: string;
  documents: number;
  embeddings: number;
  lastSync: string;
  status: 'connected' | 'partial' | 'pending';
  icon: string;
}

export interface FactVerificationStep {
  step: number;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface SeoGeoSkill {
  id: string;
  name: string;
  type: 'SEO' | 'GEO';
  description: string;
  maturity: number;
  agentsFormed: number;
  icon: string;
  color: string;
}

export interface LearningLoop {
  phase: string;
  actions: string[];
  frequency: string;
  icon: string;
}

export interface BenchmarkInstitution {
  name: string;
  country: string;
  domain: string;
  icon: string;
  color: string;
}

export interface MaturityKPI {
  id: string;
  name: string;
  category: 'performance' | 'business';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
  subMetrics?: { label: string; value: number; target: number }[];
}

export interface LlmExcellenceBlock {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  status: 'deployed' | 'in_progress' | 'planned';
  maturity: number;
  agentsCovered: number;
  agentsTotal: number;
  metrics: { label: string; value: string; icon: string }[];
}

export interface LlmExcellenceData {
  blocks: LlmExcellenceBlock[];
  llmCapabilities: LlmModelCapability[];
  taskMatrix: TaskAffectation[];
  promptTechniques: PromptTechnique[];
  ragSources: RagSource[];
  factVerificationSteps: FactVerificationStep[];
  seoGeoSkills: SeoGeoSkill[];
  learningLoops: LearningLoop[];
  benchmarkInstitutions: BenchmarkInstitution[];
  maturityKPIs: MaturityKPI[];
  globalMetrics: {
    totalAgents: number;
    agentsFormed: number;
    avgMaturity: number;
    certificationsDelivered: number;
    crossValidationRate: number;
    hallucinationReduction: number;
    productionTimeReduction: number;
    lastCohort: string;
  };
}

export const LLM_EXCELLENCE_BLOCKS: LlmExcellenceBlock[] = [
  {
    id: 1,
    number: '01',
    title: 'Cartographie des Capacités LLM',
    subtitle: 'ChatGPT · Gemini · Claude',
    description: 'Analyse et documentation exhaustive des capacités de chaque grand modèle. Cartographie des forces, faiblesses et cas d\'usage optimaux pour le conseil Big Four. ChatGPT pour le raisonnement complexe et l\'analyse financière, Gemini pour la veille web et le multimodal, Claude pour les très longs documents et les synthèses institutionnelles.',
    icon: 'ri-map-pin-2-line',
    color: '#F59E0B',
    status: 'deployed',
    maturity: 94,
    agentsCovered: 75,
    agentsTotal: 75,
    metrics: [
      { label: 'Modèles cartographiés', value: '3', icon: 'ri-cpu-line' },
      { label: 'Cas d\'usage documentés', value: '18', icon: 'ri-file-list-3-line' },
      { label: 'Agents formés', value: '75/75', icon: 'ri-team-line' },
      { label: 'Score de complétude', value: '94%', icon: 'ri-check-double-line' },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'Matrice d\'Affectation des Tâches',
    subtitle: 'Modèle Principal · Modèle Vérificateur',
    description: 'Matrice décisionnelle complète assignant chaque type de tâche au meilleur modèle LLM, avec un second modèle dédié à la validation croisée. Audit réglementaire confié à Claude avec vérification ChatGPT, SEO/GEO à ChatGPT vérifié par Gemini, veille stratégique à Gemini vérifiée par Claude.',
    icon: 'ri-grid-fill',
    color: '#8B5CF6',
    status: 'deployed',
    maturity: 91,
    agentsCovered: 72,
    agentsTotal: 75,
    metrics: [
      { label: 'Paires Modèle/Vérificateur', value: '6', icon: 'ri-git-branch-line' },
      { label: 'Tâches couvertes', value: '6', icon: 'ri-task-line' },
      { label: 'Taux validation croisée', value: '96%', icon: 'ri-checkbox-circle-line' },
      { label: 'Agents conformes', value: '72/75', icon: 'ri-shield-check-line' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Prompt Engineering Avancé',
    subtitle: 'Chain of Thought · Tree of Thoughts · Self Reflection · Multi-Agent Debate',
    description: 'Formation intensive aux 4 techniques avancées de prompt engineering dignes des cabinets de conseil internationaux. Décomposition systématique du raisonnement, exploration multi-scénarios, auto-critique obligatoire et débat contradictoire entre agents avant toute recommandation stratégique.',
    icon: 'ri-chat-smile-3-line',
    color: '#10B981',
    status: 'deployed',
    maturity: 88,
    agentsCovered: 68,
    agentsTotal: 75,
    metrics: [
      { label: 'Techniques maîtrisées', value: '4', icon: 'ri-lightbulb-flash-line' },
      { label: 'Agents certifiés', value: '68/75', icon: 'ri-award-line' },
      { label: 'Taux succès prompt', value: '92%', icon: 'ri-percent-line' },
      { label: 'Réduction hallucinations', value: '-67%', icon: 'ri-arrow-down-circle-line' },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'RAG — Retrieval Augmented Generation',
    subtitle: 'Sources Internes · Sources Externes',
    description: 'Connexion systématique des LLM aux bases de connaissances KOS. Sources internes : référentiel KHEPRA, base réglementaire BCEAO, OHADA, UEMOA, lois nationales. Sources externes : BCEAO, OHADA, UEMOA, World Bank, IMF, OECD. 2.8M documents, 1.1M embeddings vectoriels.',
    icon: 'ri-search-eye-line',
    color: '#0EA5E9',
    status: 'in_progress',
    maturity: 82,
    agentsCovered: 58,
    agentsTotal: 75,
    metrics: [
      { label: 'Sources connectées', value: '12', icon: 'ri-link' },
      { label: 'Documents indexés', value: '2.8M', icon: 'ri-file-text-line' },
      { label: 'Embeddings générés', value: '1.1M', icon: 'ri-database-2-line' },
      { label: 'Précision RAG', value: '89%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Vérification Factuelle',
    subtitle: 'Zéro affirmation sans source · référence · date · lien',
    description: 'Processus impératif de validation documentaire en 4 étapes : Recherche, Validation, Recoupement, Citation. Aucune affirmation livrée aux clients sans source vérifiable, référence explicite, date de consultation et lien permanent. Traçabilité complète de la chaîne documentaire.',
    icon: 'ri-shield-check-line',
    color: '#EF4444',
    status: 'deployed',
    maturity: 95,
    agentsCovered: 74,
    agentsTotal: 75,
    metrics: [
      { label: 'Étapes vérification', value: '4', icon: 'ri-list-check-3' },
      { label: 'Agents conformes', value: '74/75', icon: 'ri-user-star-line' },
      { label: 'Sources par livrable', value: '12.4', icon: 'ri-bookmark-line' },
      { label: 'Score traçabilité', value: '98%', icon: 'ri-footprint-line' },
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'SEO/GEO Intelligence',
    subtitle: 'Search Engine Optimization · Generative Engine Optimization',
    description: 'Formation des agents à l\'optimisation double : SEO classique (mots-clés, cocons sémantiques, maillage interne, backlinks, données structurées) et GEO pour l\'émergence dans ChatGPT, Gemini, Claude et moteurs IA. Production systématique de FAQ, tableaux, entités nommées et schémas de connaissances.',
    icon: 'ri-globe-line',
    color: '#EC4899',
    status: 'in_progress',
    maturity: 79,
    agentsCovered: 52,
    agentsTotal: 75,
    metrics: [
      { label: 'Compétences SEO', value: '7', icon: 'ri-google-line' },
      { label: 'Compétences GEO', value: '4', icon: 'ri-robot-2-line' },
      { label: 'Score SEO moyen', value: '82/100', icon: 'ri-bar-chart-2-line' },
      { label: 'Score GEO moyen', value: '73/100', icon: 'ri-radar-line' },
    ],
  },
  {
    id: 7,
    number: '07',
    title: 'Apprentissage Continu',
    subtitle: 'Identifier · Documenter · Corriger · Améliorer',
    description: 'Mécanisme d\'amélioration continue en boucle fermée. Après chaque mission : identification des erreurs et succès, documentation des leçons apprises, mise à jour automatique des prompts et des bases de connaissances. Capitalisation systématique du savoir-faire opérationnel.',
    icon: 'ri-refresh-line',
    color: '#14B8A6',
    status: 'deployed',
    maturity: 86,
    agentsCovered: 65,
    agentsTotal: 75,
    metrics: [
      { label: 'Boucles d\'apprentissage', value: '4', icon: 'ri-loop-left-line' },
      { label: 'Leçons documentées', value: '847', icon: 'ri-book-open-line' },
      { label: 'Prompts mis à jour', value: '2.3K', icon: 'ri-edit-line' },
      { label: 'Fréquence moyenne', value: '72h', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 8,
    number: '08',
    title: 'Benchmark Mondial',
    subtitle: 'Harvard · HEC Paris · MIT Sloan · INSEAD · Oxford',
    description: 'Comparaison systématique des recommandations KOS avec les standards académiques mondiaux. Validation croisée des analyses, méthodologies et livrables contre les frameworks de Harvard Business School, HEC Paris, MIT Sloan School of Management, INSEAD et University of Oxford.',
    icon: 'ri-trophy-line',
    color: '#6366F1',
    status: 'in_progress',
    maturity: 76,
    agentsCovered: 48,
    agentsTotal: 75,
    metrics: [
      { label: 'Institutions benchmark', value: '5', icon: 'ri-building-4-line' },
      { label: 'Frameworks alignés', value: '18', icon: 'ri-stack-line' },
      { label: 'Score alignement', value: '87%', icon: 'ri-scales-3-line' },
      { label: 'Rapports comparatifs', value: '124', icon: 'ri-file-chart-line' },
    ],
  },
  {
    id: 9,
    number: '09',
    title: 'KPI de Maturité LLM',
    subtitle: 'Performance · Valeur Métier',
    description: 'Mesure continue de la maturité LLM sur deux axes : Performance (taux d\'exactitude, conformité, hallucinations, délai de production) et Valeur Métier (leads générés, missions obtenues, trafic SEO, visibilité IA, revenus attribuables). Dashboard temps réel avec projections.',
    icon: 'ri-dashboard-3-line',
    color: '#F97316',
    status: 'deployed',
    maturity: 90,
    agentsCovered: 75,
    agentsTotal: 75,
    metrics: [
      { label: 'KPIs performance', value: '5', icon: 'ri-speed-up-line' },
      { label: 'KPIs business', value: '5', icon: 'ri-money-dollar-circle-line' },
      { label: 'Score maturité global', value: '87/100', icon: 'ri-medal-line' },
      { label: 'Projection 90+', value: 'Août 2026', icon: 'ri-calendar-check-line' },
    ],
  },
];

export const LLM_MODEL_CAPABILITIES: LlmModelCapability[] = [
  {
    model: 'ChatGPT',
    provider: 'OpenAI',
    capabilities: ['Raisonnement complexe', 'Rédaction experte', 'Génération de code', 'Structuration documentaire', 'SEO/GEO', 'Analyse financière', 'Assistance juridique'],
    useCases: ['Rapports BCEAO', 'Audits réglementaires', 'Plans d\'affaires', 'Notes techniques', 'Appels d\'offres'],
    color: '#10A37F',
    icon: 'ri-openai-line',
  },
  {
    model: 'Gemini',
    provider: 'Google',
    capabilities: ['Recherche web avancée', 'Multimodal', 'Traitement vidéo', 'Analyse documentaire massive', 'Veille internet'],
    useCases: ['Veille réglementaire UEMOA', 'Surveillance marchés publics', 'Veille investisseurs', 'Veille bailleurs de fonds'],
    color: '#4285F4',
    icon: 'ri-google-line',
  },
  {
    model: 'Claude',
    provider: 'Anthropic',
    capabilities: ['Traitement longs documents', 'Synthèses complexes', 'Rédaction institutionnelle', 'Analyse comparative'],
    useCases: ['Analyse de lois', 'Rapports annuels', 'Études sectorielles', 'Politiques publiques'],
    color: '#D97706',
    icon: 'ri-brain-line',
  },
];

export const LLM_TASK_MATRIX: TaskAffectation[] = [
  { task: 'Audit réglementaire', primaryModel: 'Claude', verifierModel: 'ChatGPT', priority: 'critical', agentCount: 24 },
  { task: 'SEO/GEO', primaryModel: 'ChatGPT', verifierModel: 'Gemini', priority: 'high', agentCount: 18 },
  { task: 'Veille stratégique', primaryModel: 'Gemini', verifierModel: 'Claude', priority: 'critical', agentCount: 22 },
  { task: 'Analyse financière', primaryModel: 'ChatGPT', verifierModel: 'Claude', priority: 'high', agentCount: 20 },
  { task: 'Études sectorielles', primaryModel: 'Claude', verifierModel: 'Gemini', priority: 'medium', agentCount: 16 },
  { task: 'Recherche documentaire', primaryModel: 'Gemini', verifierModel: 'ChatGPT', priority: 'high', agentCount: 25 },
];

export const LLM_PROMPT_TECHNIQUES: PromptTechnique[] = [
  {
    id: 'chain-of-thought',
    name: 'Chain of Thought',
    description: 'Décomposition systématique : contexte → hypothèses → analyse → validation → conclusion. Chaque agent doit expliciter son raisonnement étape par étape avant de produire une recommandation.',
    methodology: ['Contexte', 'Hypothèses', 'Analyse', 'Validation', 'Conclusion'],
    agentsFormed: 72,
    successRate: 94,
    icon: 'ri-link-m',
    color: '#10B981',
  },
  {
    id: 'tree-of-thoughts',
    name: 'Tree of Thoughts',
    description: 'Exploration de plusieurs scénarios en parallèle : optimiste, prudent et critique. Comparaison systématique avant convergence vers la recommandation finale.',
    methodology: ['Scénario optimiste', 'Scénario prudent', 'Scénario critique', 'Comparaison', 'Convergence'],
    agentsFormed: 63,
    successRate: 89,
    icon: 'ri-git-branch-line',
    color: '#8B5CF6',
  },
  {
    id: 'self-reflection',
    name: 'Self Reflection',
    description: 'Auto-critique obligatoire. Chaque agent doit détecter ses propres erreurs, vérifier les incohérences et valider la robustesse de son analyse avant livraison.',
    methodology: ['Auto-critique', 'Détection d\'erreurs', 'Vérification incohérences', 'Correction', 'Validation'],
    agentsFormed: 68,
    successRate: 91,
    icon: 'ri-refresh-line',
    color: '#0EA5E9',
  },
  {
    id: 'multi-agent-debate',
    name: 'Multi-Agent Debate',
    description: 'Débat contradictoire entre 4 agents avant toute recommandation stratégique : Analyste, Contradicteur, Vérificateur et Décideur. Consensus obligatoire.',
    methodology: ['Agent Analyste', 'Agent Contradicteur', 'Agent Vérificateur', 'Agent Décideur', 'Consensus'],
    agentsFormed: 55,
    successRate: 85,
    icon: 'ri-team-line',
    color: '#EF4444',
  },
];

export const LLM_RAG_SOURCES: RagSource[] = [
  { id: 'khepra-referentiel', name: 'Référentiel KHEPRA', type: 'interne', category: 'Connaissances', documents: 450000, embeddings: 180000, lastSync: '2026-06-18T08:00:00', status: 'connected', icon: 'ri-folder-2-line' },
  { id: 'bceao-reg', name: 'Base Réglementaire BCEAO', type: 'interne', category: 'Régulation', documents: 8200, embeddings: 34000, lastSync: '2026-06-18T06:00:00', status: 'connected', icon: 'ri-bank-line' },
  { id: 'ohada', name: 'OHADA', type: 'interne', category: 'Droit', documents: 1500, embeddings: 6200, lastSync: '2026-06-17T22:00:00', status: 'connected', icon: 'ri-scales-3-line' },
  { id: 'uemoa', name: 'UEMOA', type: 'interne', category: 'Régulation', documents: 3200, embeddings: 12800, lastSync: '2026-06-18T04:00:00', status: 'connected', icon: 'ri-global-line' },
  { id: 'lois-nationales', name: 'Lois Nationales', type: 'interne', category: 'Droit', documents: 12400, embeddings: 49600, lastSync: '2026-06-17T18:00:00', status: 'partial', icon: 'ri-file-text-line' },
  { id: 'bceao-externe', name: 'BCEAO (Public)', type: 'externe', category: 'Banque Centrale', documents: 9500, embeddings: 38000, lastSync: '2026-06-18T07:00:00', status: 'connected', icon: 'ri-bank-card-line' },
  { id: 'ohada-externe', name: 'OHADA (Public)', type: 'externe', category: 'Droit', documents: 2200, embeddings: 8800, lastSync: '2026-06-17T20:00:00', status: 'connected', icon: 'ri-scales-line' },
  { id: 'uemoa-externe', name: 'UEMOA (Public)', type: 'externe', category: 'Régulation', documents: 4100, embeddings: 16400, lastSync: '2026-06-18T05:00:00', status: 'connected', icon: 'ri-earth-line' },
  { id: 'world-bank', name: 'World Bank', type: 'externe', category: 'Développement', documents: 180000, embeddings: 720000, lastSync: '2026-06-17T12:00:00', status: 'partial', icon: 'ri-building-2-line' },
  { id: 'imf', name: 'IMF', type: 'externe', category: 'Finance', documents: 95000, embeddings: 380000, lastSync: '2026-06-17T14:00:00', status: 'partial', icon: 'ri-funds-line' },
  { id: 'oecd', name: 'OECD', type: 'externe', category: 'Politiques', documents: 120000, embeddings: 480000, lastSync: '2026-06-17T10:00:00', status: 'pending', icon: 'ri-pie-chart-line' },
  { id: 'uemoa-officiel', name: 'UEMOA Officiel', type: 'externe', category: 'Régulation', documents: 5600, embeddings: 22400, lastSync: '2026-06-18T03:00:00', status: 'connected', icon: 'ri-flag-line' },
];

export const LLM_FACT_VERIFICATION: FactVerificationStep[] = [
  { step: 1, name: 'Recherche', description: 'Identification et collecte des sources primaires pertinentes. Consultation des bases documentaires internes et externes. Aucune limitation de périmètre.', icon: 'ri-search-line', color: '#0EA5E9' },
  { step: 2, name: 'Validation', description: 'Vérification croisée de chaque information sur au minimum 3 sources indépendantes. Confrontation des données quantitatives avec les séries statistiques officielles.', icon: 'ri-check-double-line', color: '#10B981' },
  { step: 3, name: 'Recoupement', description: 'Corrélation des sources primaires avec les analyses sectorielles, les rapports d\'institutions internationales et les publications académiques.', icon: 'ri-arrow-left-right-line', color: '#8B5CF6' },
  { step: 4, name: 'Citation', description: 'Référencement explicite de chaque source avec : auteur/organisation, titre, date, URL permanente. Format standardisé ISO 690.', icon: 'ri-double-quotes-l', color: '#F59E0B' },
];

export const LLM_SEO_GEO_SKILLS: SeoGeoSkill[] = [
  { id: 'keywords', name: 'Mots-clés & Intentions', type: 'SEO', description: 'Analyse sémantique et mapping intentionnel des requêtes à forte valeur ajoutée pour le conseil Big Four.', maturity: 85, agentsFormed: 60, icon: 'ri-key-2-line', color: '#10B981' },
  { id: 'cocons', name: 'Cocons Sémantiques', type: 'SEO', description: 'Architecture en silos thématiques interconnectés pour maximiser l\'autorité topique.', maturity: 78, agentsFormed: 52, icon: 'ri-mind-map', color: '#8B5CF6' },
  { id: 'maillage', name: 'Maillage Interne', type: 'SEO', description: 'Stratégie de liens internes basée sur la pertinence sémantique et le PageRank interne.', maturity: 82, agentsFormed: 58, icon: 'ri-link-m', color: '#0EA5E9' },
  { id: 'backlinks', name: 'Backlinks Authority', type: 'SEO', description: 'Détection d\'opportunités de backlinks depuis des domaines institutionnels et académiques de haute autorité.', maturity: 74, agentsFormed: 45, icon: 'ri-external-link-line', color: '#F59E0B' },
  { id: 'structured-data', name: 'Données Structurées', type: 'SEO', description: 'Balisage Schema.org exhaustif : Article, FAQ, HowTo, Organization, WebSite, BreadcrumbList.', maturity: 90, agentsFormed: 68, icon: 'ri-code-s-slash-line', color: '#14B8A6' },
  { id: 'chatgpt-geo', name: 'ChatGPT GEO', type: 'GEO', description: 'Optimisation du contenu pour être cité par ChatGPT : autorité source, exhaustivité, fraîcheur, citations inversées.', maturity: 72, agentsFormed: 42, icon: 'ri-openai-line', color: '#10A37F' },
  { id: 'gemini-geo', name: 'Gemini GEO', type: 'GEO', description: 'Structuration pour le crawl Google DeepMind : données actualisées, format Q&A, entités Knowledge Graph.', maturity: 68, agentsFormed: 38, icon: 'ri-google-line', color: '#4285F4' },
  { id: 'claude-geo', name: 'Claude GEO', type: 'GEO', description: 'Rédaction pour les synthèses Claude : documents longs structurés, raisonnement explicite, citations académiques.', maturity: 75, agentsFormed: 44, icon: 'ri-brain-line', color: '#D97706' },
  { id: 'faq', name: 'FAQ & HowTo', type: 'GEO', description: 'Production systématique de contenus FAQ et HowTo structurés pour l\'émergence dans les réponses des moteurs IA.', maturity: 81, agentsFormed: 56, icon: 'ri-question-answer-line', color: '#EC4899' },
  { id: 'entities', name: 'Entités Nommées', type: 'GEO', description: 'Enrichissement systématique avec entités nommées (organisations, personnes, lieux, réglementations) pour les graphes de connaissances.', maturity: 77, agentsFormed: 49, icon: 'ri-price-tag-3-line', color: '#6366F1' },
  { id: 'schemas-connaissance', name: 'Schémas de Connaissances', type: 'GEO', description: 'Création de graphes de connaissances exportables pour alimenter les bases des moteurs IA.', maturity: 65, agentsFormed: 35, icon: 'ri-node-tree', color: '#F97316' },
];

export const LLM_LEARNING_LOOPS: LearningLoop[] = [
  { phase: 'Identifier', actions: ['Analyse post-mission automatisée', 'Détection des écarts vs attendus', 'Classification erreurs/succès', 'Notation qualitative par le client'], frequency: 'Après chaque mission', icon: 'ri-search-eye-line' },
  { phase: 'Documenter', actions: ['Rédaction fiche leçon apprise', 'Capture des patterns récurrents', 'Enrichissement base de connaissance', 'Tagging et catégorisation'], frequency: '72h post-livraison', icon: 'ri-file-edit-line' },
  { phase: 'Corriger', actions: ['Mise à jour automatique des prompts', 'Ajustement des paramètres LLM', 'Recalibration des modèles', 'Déploiement des correctifs'], frequency: 'Hebdomadaire', icon: 'ri-tools-line' },
  { phase: 'Améliorer', actions: ['Optimisation continue des templates', 'Enrichissement RAG', 'Montée en compétence agents', 'Benchmarking vs standards'], frequency: 'Mensuelle', icon: 'ri-arrow-up-circle-line' },
];

export const LLM_BENCHMARK_INSTITUTIONS: BenchmarkInstitution[] = [
  { name: 'Harvard Business School', country: 'USA', domain: 'Stratégie & Leadership', icon: 'ri-graduation-cap-line', color: '#A51C30' },
  { name: 'HEC Paris', country: 'France', domain: 'Finance & Management', icon: 'ri-briefcase-line', color: '#1E3A5F' },
  { name: 'MIT Sloan School of Management', country: 'USA', domain: 'Innovation & Technologie', icon: 'ri-microscope-line', color: '#A31F34' },
  { name: 'INSEAD', country: 'France/Singapour', domain: 'Business International', icon: 'ri-global-line', color: '#005A8B' },
  { name: 'University of Oxford', country: 'UK', domain: 'Politiques Publiques', icon: 'ri-building-4-line', color: '#002147' },
];

export const LLM_MATURITY_KPIS: MaturityKPI[] = [
  { id: 'accuracy', name: 'Taux d\'Exactitude', category: 'performance', current: 93.2, target: 98, unit: '%', trend: 2.4, icon: 'ri-check-double-line', color: '#10B981', subMetrics: [{ label: 'Audit réglementaire', value: 95.1, target: 99 }, { label: 'Analyse financière', value: 91.8, target: 97 }, { label: 'Rédaction SEO/GEO', value: 92.7, target: 98 }] },
  { id: 'compliance', name: 'Taux de Conformité', category: 'performance', current: 96.8, target: 99, unit: '%', trend: 1.1, icon: 'ri-shield-check-line', color: '#8B5CF6', subMetrics: [{ label: 'Conformité BCEAO', value: 98.2, target: 99.5 }, { label: 'Conformité OHADA', value: 96.1, target: 99 }, { label: 'Standards ISO', value: 95.4, target: 98 }] },
  { id: 'hallucination', name: 'Taux d\'Hallucination', category: 'performance', current: 3.8, target: 0.5, unit: '%', trend: -1.3, icon: 'ri-alert-line', color: '#EF4444', subMetrics: [{ label: 'ChatGPT', value: 4.2, target: 0.5 }, { label: 'Gemini', value: 3.9, target: 0.5 }, { label: 'Claude', value: 2.1, target: 0.5 }] },
  { id: 'production', name: 'Délai de Production', category: 'performance', current: 4.2, target: 2, unit: 'heures', trend: -0.8, icon: 'ri-timer-line', color: '#F59E0B', subMetrics: [{ label: 'Rapports BCEAO', value: 5.1, target: 2.5 }, { label: 'Notes techniques', value: 3.2, target: 1.5 }, { label: 'Articles SEO/GEO', value: 2.8, target: 1 }] },
  { id: 'cross-validation', name: 'Validation Croisée', category: 'performance', current: 88.5, target: 100, unit: '%', trend: 5.2, icon: 'ri-arrow-left-right-line', color: '#0EA5E9' },
  { id: 'leads', name: 'Leads Générés', category: 'business', current: 247, target: 500, unit: 'leads/mois', trend: 15, icon: 'ri-user-add-line', color: '#10B981' },
  { id: 'missions', name: 'Missions Obtenues', category: 'business', current: 18, target: 30, unit: 'missions/mois', trend: 3, icon: 'ri-briefcase-line', color: '#8B5CF6' },
  { id: 'traffic', name: 'Trafic SEO', category: 'business', current: 48500, target: 100000, unit: 'visites/mois', trend: 8200, icon: 'ri-line-chart-line', color: '#0EA5E9' },
  { id: 'ai-visibility', name: 'Visibilité IA', category: 'business', current: 78, target: 95, unit: 'score/100', trend: 6, icon: 'ri-radar-line', color: '#EC4899' },
  { id: 'revenue', name: 'Revenus Attribuables', category: 'business', current: 425000000, target: 1500000000, unit: 'FCFA/mois', trend: 85000000, icon: 'ri-money-dollar-circle-line', color: '#F97316' },
];

export const LLM_EXCELLENCE_GLOBAL_METRICS = {
  totalAgents: 75,
  agentsFormed: 75,
  avgMaturity: 100,
  certificationsDelivered: 425,
  crossValidationRate: 100,
  hallucinationReduction: 100,
  productionTimeReduction: 82,
  lastCohort: '2026-06-18',
  consolidationComplete: true,
};