// ============================================================
// KOS Blog Writing Automates — 8 catégories, 24 agents
// Rédaction niveau Big Four : recherche, stratégie,
// rédaction, SEO, relecture, visuels, distribution, analytics
// ============================================================

export interface KOSBlogWritingAutomate {
  id: string;
  name: string;
  category: string;
  tech_stack: string[];
  status: 'deployed' | 'partial' | 'mock';
  version: string;
  description: string;
  capabilities: string[];
  success_rate: number;
  tasks_completed: number;
  auto_enabled: boolean;
  icon: string;
  color: string;
  last_execution: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  kpis: { label: string; current: string; target: string; icon: string }[];
}

export interface BlogWritingAutomateCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  agents_count: number;
}

export const BLOG_WRITING_CATEGORIES: BlogWritingAutomateCategory[] = [
  {
    id: 'recherche-discovery',
    name: 'Recherche & Topic Discovery',
    icon: 'ri-search-eye-line',
    color: '#059669',
    description: 'Recherche automatisée de sujets à fort potentiel : analyse des tendances sectorielles, veille concurrentielle éditoriale, identification des gaps de contenu, scoring de pertinence par persona. Big Four grade research methodology.',
    agents_count: 3,
  },
  {
    id: 'strategie-editoriale',
    name: 'Stratégie Éditoriale & Planning',
    icon: 'ri-calendar-check-line',
    color: '#EA580C',
    description: 'Planification stratégique du calendrier éditorial : alignement thématique Big Four, priorisation par impact business, équilibrage formats/article, séquençage pillier-cluster. Roadmap trimestrielle automatisée.',
    agents_count: 3,
  },
  {
    id: 'redaction-bigfour',
    name: 'Rédaction Niveau Big Four',
    icon: 'ri-quill-pen-line',
    color: '#BE123C',
    description: 'Rédaction de contenu de qualité consulting : articles de fond, rapports de recherche, analyses sectorielles, thought leadership. Ton institutionnel, rigueur analytique, citations réglementaires, structuration exécutive.',
    agents_count: 3,
  },
  {
    id: 'seo-optimisation',
    name: 'SEO & AEO Optimisation',
    icon: 'ri-search-line',
    color: '#86BC25',
    description: 'Optimisation SEO et AEO (Answer Engine Optimization) : keyword research avancé, structuration sémantique, balisage Schema.org, optimisation featured snippets, maillage interne intelligent. Positionnement Google Discover & AI Overviews.',
    agents_count: 3,
  },
  {
    id: 'relecture-qualite',
    name: 'Relecture & Contrôle Qualité',
    icon: 'ri-check-double-line',
    color: '#9B7B2C',
    description: 'Contrôle qualité multi-niveaux : vérification factuelle, cohérence réglementaire, conformité éditoriale, scoring de rigueur analytique, détection plagiat. Revue à 4 yeux automatisée niveau Big Four.',
    agents_count: 3,
  },
  {
    id: 'enrichissement-visuel',
    name: 'Enrichissement Visuel & Data',
    icon: 'ri-image-edit-line',
    color: '#0D7B5F',
    description: 'Enrichissement visuel des articles : génération de data visualisations, infographies réglementaires, schémas d\'architecture, graphiques comparatifs. Cohérence charte graphique KHEPRA EXPERTS, accessibilité WCAG AA.',
    agents_count: 3,
  },
  {
    id: 'distribution-syndication',
    name: 'Distribution & Syndication',
    icon: 'ri-share-forward-line',
    color: '#DC2626',
    description: 'Distribution multicanal automatisée : LinkedIn (articles + posts), newsletter email, syndication RSS, partage Twitter/X, republication Medium/Substack. Adaptation du format par canal, tracking UTM.',
    agents_count: 3,
  },
  {
    id: 'analytics-performance',
    name: 'Analytics & Performance Éditoriale',
    icon: 'ri-bar-chart-grouped-line',
    color: '#8B3040',
    description: 'Analyse de performance du contenu : tracking SEO (GSC), engagement social, taux de conversion, attribution de leads, heatmaps de lecture. Dashboards exécutifs, recommandations d\'optimisation continue.',
    agents_count: 3,
  },
];

export const KOS_BLOG_WRITING_AUTOMATES: KOSBlogWritingAutomate[] = [
  // ============ CATÉGORIE 1 : Recherche & Topic Discovery (3 agents) ============
  {
    id: 'blog-topic-scout',
    name: 'Topic Scout — Trend Intelligence',
    category: 'recherche-discovery',
    tech_stack: ['Google Trends API', 'GSC Query Mining', 'Semrush API', 'BuzzSumo', 'Competitor NLP', 'Topic Clustering'],
    status: 'deployed',
    version: 'v3.1.0',
    description: 'Scout automatisé de sujets à fort potentiel : croisement Google Trends, requêtes GSC, analyse BuzzSumo des contenus viraux, mining NLP des publications concurrents. Scoring multicritère (volume, difficulté, pertinence business, alignement expertise KHEPRA). Génération de fiches sujet prêtes à rédiger.',
    capabilities: ['Trend detection', 'Competitor content mining', 'Topic scoring', 'Query gap analysis', 'Seasonal prediction', 'Fiche sujet auto'],
    success_rate: 93.8,
    tasks_completed: 5840,
    auto_enabled: true,
    icon: 'ri-radar-line',
    color: '#059669',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Sujets découverts', current: '5,840', target: '8,000', icon: 'ri-lightbulb-line' },
      { label: 'Score pertinence moy', current: '87.3%', target: '92%', icon: 'ri-bar-chart-line' },
      { label: 'Topics viraux prédits', current: '342', target: '500', icon: 'ri-fire-line' },
    ],
  },
  {
    id: 'blog-keyword-intel',
    name: 'Keyword Intelligence Engine',
    category: 'recherche-discovery',
    tech_stack: ['Semrush KW Magic', 'GSC API', 'Ahrefs KW Explorer', 'NLP Entity Extraction', 'Semantic Clustering'],
    status: 'deployed',
    version: 'v3.3.0',
    description: 'Moteur d\'intelligence keywords : extraction d\'entités nommées réglementaires, clustering sémantique par intention, analyse de la SERP (types de résultats, features), scoring de difficulté x volume x intent. Génération de matrices mot-clé x page pour le maillage interne.',
    capabilities: ['KW extraction', 'Semantic clustering', 'SERP analysis', 'Intent classification', 'KW matrix generation', 'Long-tail discovery'],
    success_rate: 94.5,
    tasks_completed: 12870,
    auto_enabled: true,
    icon: 'ri-key-2-line',
    color: '#059669',
    last_execution: '2026-06-15T08:30:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Mots-clés analysés', current: '12,870', target: '20,000', icon: 'ri-file-list-3-line' },
      { label: 'Clusters sémantiques', current: '847', target: '1,200', icon: 'ri-stack-line' },
      { label: 'Précision intent', current: '92.1%', target: '96%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 'blog-competitor-watch',
    name: 'Competitive Content Intelligence',
    category: 'recherche-discovery',
    tech_stack: ['Competitor URL Monitor', 'Content Gap Analyzer', 'Diff Engine', 'Backlink Content Audit', 'Share of Voice'],
    status: 'deployed',
    version: 'v2.8.0',
    description: 'Veille concurrentielle éditoriale : monitoring des publications Big Four (Deloitte, PwC, EY, KPMG) + cabinets spécialisés, analyse des gaps de contenu, audit des contenus les plus backlinkés, calcul du Share of Voice éditorial. Alertes sur nouveaux contenus concurrents.',
    capabilities: ['Competitor monitoring', 'Content gap analysis', 'Backlink audit', 'Share of Voice', 'Big Four tracking', 'New content alerts'],
    success_rate: 91.2,
    tasks_completed: 3450,
    auto_enabled: true,
    icon: 'ri-eye-2-line',
    color: '#059669',
    last_execution: '2026-06-15T07:30:00Z',
    priority: 'high',
    kpis: [
      { label: 'Concurrents suivis', current: '24', target: '36', icon: 'ri-building-line' },
      { label: 'Gaps détectés', current: '3,450', target: '5,000', icon: 'ri-contrast-2-line' },
      { label: 'SoV éditorial', current: '18.4%', target: '25%', icon: 'ri-pie-chart-line' },
    ],
  },

  // ============ CATÉGORIE 2 : Stratégie Éditoriale & Planning (3 agents) ============
  {
    id: 'blog-calendar-orch',
    name: 'Editorial Calendar Orchestrator',
    category: 'strategie-editoriale',
    tech_stack: ['Calendar Engine', 'Pillar-Cluster Mapper', 'Resource Allocator', 'Deadline Optimizer', 'Seasonal Scheduler'],
    status: 'deployed',
    version: 'v3.0.0',
    description: 'Orchestrateur du calendrier éditorial : mapping pillier-cluster automatique, allocation des ressources rédactionnelles, optimisation des deadlines par capacité, intégration des saisonnalités réglementaires (échéances BCEAO, COBAC, GAFI). Roadmap trimestrielle avec vues Kanban et Gantt.',
    capabilities: ['Calendar generation', 'Pillar-cluster mapping', 'Resource allocation', 'Deadline optimization', 'Regulatory seasonality', 'Kanban/Gantt views'],
    success_rate: 92.7,
    tasks_completed: 2180,
    auto_enabled: true,
    icon: 'ri-calendar-check-line',
    color: '#EA580C',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Roadmaps générées', current: '2,180', target: '3,000', icon: 'ri-road-map-line' },
      { label: 'Respect deadlines', current: '94.2%', target: '98%', icon: 'ri-check-double-line' },
      { label: 'Cohérence pillier', current: '96.5%', target: '99%', icon: 'ri-links-line' },
    ],
  },
  {
    id: 'blog-format-mixer',
    name: 'Format Mix Optimizer',
    category: 'strategie-editoriale',
    tech_stack: ['Format Taxonomy', 'Engagement Predictor', 'Audience Segmenter', 'A/B Test Planner', 'ROI Projection'],
    status: 'deployed',
    version: 'v2.6.0',
    description: 'Optimiseur du mix de formats : détermination du ratio optimal articles longs/reports/études de cas/guides/checklists par segment d\'audience. Prédiction de l\'engagement par format, planification des A/B tests de formats, projection du ROI éditorial par type de contenu.',
    capabilities: ['Format optimization', 'Engagement prediction', 'Audience segmentation', 'A/B test planning', 'ROI projection', 'Format calendar'],
    success_rate: 89.4,
    tasks_completed: 1640,
    auto_enabled: true,
    icon: 'ri-stack-line',
    color: '#EA580C',
    last_execution: '2026-06-15T07:00:00Z',
    priority: 'medium',
    kpis: [
      { label: 'Formats optimisés', current: '12', target: '18', icon: 'ri-stack-line' },
      { label: 'Engagement +', current: '+34%', target: '+50%', icon: 'ri-arrow-up-line' },
      { label: 'Précision prédiction', current: '84.7%', target: '90%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 'blog-master-prompt',
    name: 'Master Prompt Template — Structure Big Four',
    category: 'strategie-editoriale',
    tech_stack: ['GPT-4o + KOS Fine-tune', '9-Section Framework Engine', 'Executive Insight Generator', 'Framework Proprietary Builder', 'SEO/GEO/EEAT Integrator', 'Lead Magnet PDF Converter'],
    status: 'deployed',
    version: 'v1.0.0',
    description: 'Template maître de génération d\'articles niveau McKinsey/Deloitte/PwC. Structure obligatoire en 9 sections : Executive Insight (150-200 mots niveau COMEX), Contexte Macroéconomique & Réglementaire (BCEAO/OHADA/COBAC), Diagnostic du Problème, Analyse Experte Big Four, Solutions Stratégiques Khepra Experts, Framework Exclusif Propriétaire (lead magnet), Cas d\'Usage Afrique Réelle, Implications Stratégiques, Call-to-Action Premium. Optimisation SEO + GEO + EEAT intégrée. 5 articles générés en S24 via ce template (score SEO moyen 90.8/100).',
    capabilities: ['9-section Big Four structure', 'Executive Insight drafting', 'Framework proprietary generation', 'SEO/GEO/EEAT optimization', 'Regulatory citation injection', 'Lead magnet conversion', 'Multi-format export (blog/PDF/white paper)'],
    success_rate: 94.2,
    tasks_completed: 3250,
    auto_enabled: true,
    icon: 'ri-file-code-line',
    color: '#BE123C',
    last_execution: '2026-06-16T08:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Articles générés', current: '3,250', target: '5,000', icon: 'ri-article-line' },
      { label: 'Score SEO moyen', current: '90.8/100', target: '95/100', icon: 'ri-search-line' },
      { label: 'Frameworks propriétaires', current: '9', target: '15', icon: 'ri-lightbulb-line' },
    ],
  },
  {
    id: 'blog-persona-mapper',
    name: 'Persona Content Mapper',
    category: 'strategie-editoriale',
    tech_stack: ['Persona Profiler', 'Intent Mapping', 'Journey Stage Aligner', 'Content Gap by Persona', 'Attribution Model'],
    status: 'partial',
    version: 'v1.9.0',
    description: 'Mapping de contenu par persona : alignement de chaque article avec les personas KHEPRA (DG, DAF, Risk Manager, Compliance Officer, Board Member), mapping d\'intention par étape du parcours (awareness, consideration, decision), détection des gaps de contenu par persona.',
    capabilities: ['Persona profiling', 'Intent mapping', 'Journey alignment', 'Gap detection', 'Attribution modeling', 'Content personalization'],
    success_rate: 81.5,
    tasks_completed: 920,
    auto_enabled: false,
    icon: 'ri-user-smile-line',
    color: '#EA580C',
    last_execution: '2026-06-14T19:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Personas mappés', current: '7', target: '10', icon: 'ri-user-line' },
      { label: 'Gaps persona', current: '124', target: '<50', icon: 'ri-contrast-2-line' },
      { label: 'Score alignement', current: '78.4%', target: '90%', icon: 'ri-bar-chart-line' },
    ],
  },

  // ============ CATÉGORIE 3 : Rédaction Niveau Big Four (3 agents) ============
  {
    id: 'blog-longform-writer',
    name: 'Long-Form Thought Leadership Writer',
    category: 'redaction-bigfour',
    tech_stack: ['GPT-4o + KOS Fine-tune', 'Research Synthesizer', 'Regulatory Citation DB', 'Executive Structure', 'Tone Calibrator'],
    status: 'deployed',
    version: 'v3.4.0',
    description: 'Rédacteur d\'articles de fond niveau Big Four : synthèse de multiples sources de recherche, insertion automatique de citations réglementaires (BCEAO, COBAC, OHADA, GAFI), structuration exécutive (executive summary, problématique, analyse, recommandations, conclusion). Ton institutionnel calibré KHEPRA.',
    capabilities: ['Long-form drafting', 'Research synthesis', 'Regulatory citations', 'Executive structure', 'Tone calibration', '2,000-5,000 mots'],
    success_rate: 91.8,
    tasks_completed: 2840,
    auto_enabled: true,
    icon: 'ri-quill-pen-line',
    color: '#BE123C',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Articles rédigés', current: '2,840', target: '4,000', icon: 'ri-file-text-line' },
      { label: 'Citations / article', current: '8.4', target: '10+', icon: 'ri-double-quotes-l' },
      { label: 'Score qualité édito', current: '4.4/5', target: '4.7/5', icon: 'ri-star-line' },
    ],
  },
  {
    id: 'blog-case-study',
    name: 'Case Study & Success Story Composer',
    category: 'redaction-bigfour',
    tech_stack: ['Case Study Framework', 'Data Storytelling Engine', 'Client Anonymizer', 'ROI Calculator', 'Quote Generator'],
    status: 'deployed',
    version: 'v2.9.0',
    description: 'Compositeur d\'études de cas et success stories : structuration problème-solution-résultats, data storytelling avec métriques chiffrées, anonymisation automatique des données clients sensibles, calculateur de ROI intégré, génération de citations exécutives percutantes.',
    capabilities: ['Case study composition', 'Data storytelling', 'Client anonymization', 'ROI calculation', 'Quote generation', 'Multi-industry'],
    success_rate: 90.2,
    tasks_completed: 1670,
    auto_enabled: true,
    icon: 'ri-file-chart-line',
    color: '#BE123C',
    last_execution: '2026-06-15T07:30:00Z',
    priority: 'high',
    kpis: [
      { label: 'Case studies', current: '1,670', target: '2,500', icon: 'ri-file-text-line' },
      { label: 'ROI démontré moy', current: '3.2x', target: 'N/A', icon: 'ri-line-chart-line' },
      { label: 'Taux conversion CS', current: '8.4%', target: '12%', icon: 'ri-percent-line' },
    ],
  },
  {
    id: 'blog-regulatory-brief',
    name: 'Regulatory Brief & Decoder Writer',
    category: 'redaction-bigfour',
    tech_stack: ['Regulatory Text Parser', 'Impact Summarizer', 'Layman Translator', 'Compliance Action Checklist', 'Multi-jurisdiction'],
    status: 'deployed',
    version: 'v3.2.0',
    description: 'Rédacteur de briefs réglementaires et décodages : transformation des textes réglementaires complexes en analyses accessibles, résumé des impacts opérationnels, checklists d\'actions de mise en conformité, traduction "plain language" pour dirigeants non-juristes.',
    capabilities: ['Regulatory decoding', 'Impact summarization', 'Plain language translation', 'Action checklists', 'Multi-jurisdiction', 'DG-ready format'],
    success_rate: 93.5,
    tasks_completed: 4120,
    auto_enabled: true,
    icon: 'ri-auction-line',
    color: '#BE123C',
    last_execution: '2026-06-15T08:15:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Briefs réglementaires', current: '4,120', target: '6,000', icon: 'ri-file-shield-2-line' },
      { label: 'Juridictions couvertes', current: '14', target: '20', icon: 'ri-global-line' },
      { label: 'Score clarté DG', current: '4.6/5', target: '4.8/5', icon: 'ri-star-line' },
    ],
  },

  // ============ CATÉGORIE 4 : SEO & AEO Optimisation (3 agents) ============
  {
    id: 'blog-seo-onpage',
    name: 'On-Page SEO Optimizer',
    category: 'seo-optimisation',
    tech_stack: ['Title Generator', 'Meta Desc Optimizer', 'Hn Structure Engine', 'Internal Link Suggester', 'Schema Markup'],
    status: 'deployed',
    version: 'v3.5.0',
    description: 'Optimiseur SEO on-page automatisé : génération de titres optimisés (H1, title tag), méta-descriptions à fort CTR, structuration Hn sémantique, suggestions de liens internes contextuels, balisage Schema.org (Article, FAQ, HowTo, BreadcrumbList). Score SEO on-page en temps réel.',
    capabilities: ['Title optimization', 'Meta description', 'Hn structure', 'Internal linking', 'Schema markup', 'Real-time SEO score'],
    success_rate: 95.2,
    tasks_completed: 8970,
    auto_enabled: true,
    icon: 'ri-search-line',
    color: '#86BC25',
    last_execution: '2026-06-15T08:30:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Pages optimisées', current: '8,970', target: '12,000', icon: 'ri-file-text-line' },
      { label: 'Score SEO moyen', current: '94/100', target: '98/100', icon: 'ri-bar-chart-line' },
      { label: '+CTR organique', current: '+28%', target: '+40%', icon: 'ri-arrow-up-line' },
    ],
  },
  {
    id: 'blog-aeo-snippets',
    name: 'AEO — Answer Engine Optimizer',
    category: 'seo-optimisation',
    tech_stack: ['Featured Snippet Optimizer', 'People Also Ask Miner', 'AI Overview Targeter', 'FAQ Schema', 'Structured Answer'],
    status: 'deployed',
    version: 'v2.7.0',
    description: 'Optimiseur pour Answer Engines (Google AI Overviews, ChatGPT, Perplexity) : structuration des réponses pour featured snippets, mining des "People Also Ask", ciblage des AI Overviews, génération FAQ Schema, formatage en "question-réponse structurée" pour les moteurs de réponse.',
    capabilities: ['Featured snippet targeting', 'PAA mining', 'AI Overview optimization', 'FAQ Schema generation', 'Structured answers', 'AEO scoring'],
    success_rate: 88.9,
    tasks_completed: 5430,
    auto_enabled: true,
    icon: 'ri-robot-line',
    color: '#86BC25',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Featured snippets', current: '1,247', target: '2,000', icon: 'ri-star-line' },
      { label: 'AI Overviews captés', current: '684', target: '1,000', icon: 'ri-robot-line' },
      { label: 'Taux capture PAA', current: '42.3%', target: '55%', icon: 'ri-question-answer-line' },
    ],
  },
  {
    id: 'blog-semantic-struct',
    name: 'Semantic Content Structurer',
    category: 'seo-optimisation',
    tech_stack: ['Entity Recognition', 'Knowledge Graph Aligner', 'Topical Authority Builder', 'Content Depth Scorer', 'E-E-A-T Optimizer'],
    status: 'partial',
    version: 'v2.0.0',
    description: 'Structureur sémantique de contenu : reconnaissance d\'entités et alignement Knowledge Graph Google, construction d\'autorité topique par couverture exhaustive des sous-thèmes, scoring de profondeur de contenu, optimisation E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) pour les niches YMYL.',
    capabilities: ['Entity recognition', 'KG alignment', 'Topical authority', 'Content depth scoring', 'E-E-A-T optimization', 'YMYL compliance'],
    success_rate: 82.4,
    tasks_completed: 1860,
    auto_enabled: false,
    icon: 'ri-git-branch-line',
    color: '#86BC25',
    last_execution: '2026-06-14T20:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Entités reconnues', current: '24,580', target: 'N/A', icon: 'ri-node-tree' },
      { label: 'Score autorité topique', current: '76/100', target: '90/100', icon: 'ri-bar-chart-line' },
      { label: 'E-E-A-T score', current: '82/100', target: '92/100', icon: 'ri-shield-check-line' },
    ],
  },

  // ============ CATÉGORIE 5 : Relecture & Contrôle Qualité (3 agents) ============
  {
    id: 'blog-fact-checker',
    name: 'Fact-Check & Regulatory Verifier',
    category: 'relecture-qualite',
    tech_stack: ['Claim Extractor', 'Regulatory Cross-Ref', 'Source Validator', 'Date Currency Check', 'Correction Suggester'],
    status: 'deployed',
    version: 'v3.0.0',
    description: 'Vérificateur factuel automatisé : extraction de toutes les affirmations factuelles, cross-référencement avec les textes réglementaires en vigueur, validation des sources et dates de publication, vérification de l\'actualité des références, suggestion de corrections avec justification.',
    capabilities: ['Claim extraction', 'Regulatory cross-ref', 'Source validation', 'Currency check', 'Correction suggestions', 'Audit trail'],
    success_rate: 92.8,
    tasks_completed: 7640,
    auto_enabled: true,
    icon: 'ri-check-double-line',
    color: '#9B7B2C',
    last_execution: '2026-06-15T08:30:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Vérifications menées', current: '7,640', target: '10,000', icon: 'ri-checkbox-circle-line' },
      { label: 'Erreurs détectées', current: '1,847', target: 'N/A', icon: 'ri-error-warning-line' },
      { label: 'Précision vérif', current: '97.2%', target: '99%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 'blog-plagiarism',
    name: 'Plagiarism & Originality Guard',
    category: 'relecture-qualite',
    tech_stack: ['Plagiarism Detection', 'Similarity Scoring', 'Citation Completeness', 'Originality Report', 'Paraphrase Suggester'],
    status: 'deployed',
    version: 'v2.5.0',
    description: 'Garde de l\'originalité éditoriale : détection de similarité multi-sources (web, publications académiques, bases réglementaires), scoring de plagiat, vérification de l\'exhaustivité des citations, rapport d\'originalité, suggestions de paraphrase pour les passages trop proches des sources.',
    capabilities: ['Plagiarism detection', 'Similarity scoring', 'Citation check', 'Originality report', 'Paraphrase suggestions', 'Multi-source scan'],
    success_rate: 94.1,
    tasks_completed: 5620,
    auto_enabled: true,
    icon: 'ri-file-copy-line',
    color: '#9B7B2C',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Scans effectués', current: '5,620', target: '8,000', icon: 'ri-scan-line' },
      { label: 'Score originalité', current: '96.4%', target: '98%', icon: 'ri-star-line' },
      { label: 'Faux positifs', current: '1.8%', target: '<1%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 'blog-tone-consistency',
    name: 'Tone & Consistency Auditor',
    category: 'relecture-qualite',
    tech_stack: ['Tone Analyzer', 'Style Guide Engine', 'Consistency Checker', 'Terminology Validator', 'Readability Scorer'],
    status: 'deployed',
    version: 'v2.8.0',
    description: 'Auditeur de cohérence tonale et stylistique : analyse du ton (institutionnel, expert, accessible), vérification de la conformité au guide de style KHEPRA, contrôle de la cohérence terminologique (termes réglementaires, acronymes), scoring de lisibilité Flesch adapté au public cible.',
    capabilities: ['Tone analysis', 'Style guide compliance', 'Terminology consistency', 'Readability scoring', 'Brand voice alignment', 'Multi-audience calibration'],
    success_rate: 90.5,
    tasks_completed: 4890,
    auto_enabled: true,
    icon: 'ri-voiceprint-line',
    color: '#9B7B2C',
    last_execution: '2026-06-15T07:45:00Z',
    priority: 'medium',
    kpis: [
      { label: 'Audits tonals', current: '4,890', target: '7,000', icon: 'ri-equalizer-line' },
      { label: 'Conformité style', current: '94.7%', target: '98%', icon: 'ri-check-double-line' },
      { label: 'Score lisibilité', current: '62/100', target: '55-65', icon: 'ri-book-open-line' },
    ],
  },

  // ============ CATÉGORIE 6 : Enrichissement Visuel & Data (3 agents) ============
  {
    id: 'blog-infographic-gen',
    name: 'Infographic & Data Visualization Generator',
    category: 'enrichissement-visuel',
    tech_stack: ['Chart.js/D3.js', 'Data Extractor', 'Template Engine', 'Brand KIT', 'SVG Optimizer', 'Alt-text Generator'],
    status: 'deployed',
    version: 'v2.9.0',
    description: 'Générateur d\'infographies et data visualisations : extraction automatique des données chiffrées de l\'article, sélection du type de visualisation optimal (barres, lignes, radar, heatmap), application de la charte graphique KHEPRA, optimisation SVG, génération d\'alt-text accessible WCAG.',
    capabilities: ['Chart generation', 'Data extraction', 'Template selection', 'Brand compliance', 'SVG optimization', 'Accessibility alt-text'],
    success_rate: 89.7,
    tasks_completed: 3240,
    auto_enabled: true,
    icon: 'ri-image-edit-line',
    color: '#0D7B5F',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Visualisations créées', current: '3,240', target: '5,000', icon: 'ri-bar-chart-line' },
      { label: 'Score accessibilité', current: '91/100', target: '98/100', icon: 'ri-wheelchair-line' },
      { label: 'Engagement visuel', current: '+42%', target: '+60%', icon: 'ri-eye-line' },
    ],
  },
  {
    id: 'blog-schema-visual',
    name: 'Architecture & Process Diagrammer',
    category: 'enrichissement-visuel',
    tech_stack: ['Mermaid.js', 'Flowchart Engine', 'Architecture Template', 'Process Mapper', 'Hierarchy Builder'],
    status: 'deployed',
    version: 'v2.4.0',
    description: 'Diagrammeur d\'architecture et processus : transformation des descriptions textuelles de processus, flux, architectures en diagrammes Mermaid.js, application des templates standards (organigrammes, flux de conformité, architecture système, chaîne de valeur). Export PNG/SVG haute résolution.',
    capabilities: ['Process diagramming', 'Architecture visualization', 'Flowchart generation', 'Hierarchy building', 'Multi-format export', 'Text-to-diagram'],
    success_rate: 87.6,
    tasks_completed: 2180,
    auto_enabled: true,
    icon: 'ri-shapes-line',
    color: '#0D7B5F',
    last_execution: '2026-06-15T07:30:00Z',
    priority: 'medium',
    kpis: [
      { label: 'Diagrammes générés', current: '2,180', target: '3,500', icon: 'ri-shapes-line' },
      { label: 'Précision extraction', current: '85.4%', target: '92%', icon: 'ri-focus-line' },
      { label: 'Temps génération', current: '3.2s', target: '<2s', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'blog-image-curator',
    name: 'AI Image Curator & Prompt Engineer',
    category: 'enrichissement-visuel',
    tech_stack: ['Stable Diffusion API', 'Prompt Constructor', 'Style Consistency Guard', 'Resolution Optimizer', 'WebP Converter'],
    status: 'partial',
    version: 'v1.8.0',
    description: 'Curateur d\'images IA pour articles : analyse du contenu pour déterminer les besoins en illustrations, construction de prompts optimisés pour la génération d\'images cohérentes avec la charte KHEPRA, vérification de la cohérence stylistique entre images d\'un même article, optimisation résolution et conversion WebP.',
    capabilities: ['Image prompt engineering', 'Style consistency', 'Resolution optimization', 'WebP conversion', 'Article-image matching', 'Batch generation'],
    success_rate: 79.8,
    tasks_completed: 1870,
    auto_enabled: false,
    icon: 'ri-image-line',
    color: '#0D7B5F',
    last_execution: '2026-06-14T18:00:00Z',
    priority: 'medium',
    kpis: [
      { label: 'Images générées', current: '1,870', target: '3,000', icon: 'ri-image-line' },
      { label: 'Score cohérence', current: '82.4%', target: '92%', icon: 'ri-check-double-line' },
      { label: 'Rejets éditoriaux', current: '12.3%', target: '<5%', icon: 'ri-close-line' },
    ],
  },

  // ============ CATÉGORIE 7 : Distribution & Syndication (3 agents) ============
  {
    id: 'blog-linkedin-distrib',
    name: 'LinkedIn Article & Post Publisher',
    category: 'distribution-syndication',
    tech_stack: ['LinkedIn API', 'Article Formatter', 'Post Generator', 'Hashtag Optimizer', 'Best-Time Scheduler'],
    status: 'deployed',
    version: 'v3.4.0',
    description: 'Publisher LinkedIn automatisé : adaptation des articles en posts LinkedIn (résumé exécutif + hook + CTA), formatage des articles LinkedIn natifs, optimisation des hashtags par secteur, planification aux créneaux optimaux d\'engagement, tag des personnes/entreprises pertinentes. Programme de distribution actif : Articles #8 (Cybersécurité COBAC), #9 (Régulation FinTech UEMOA), #10 (ALM Bancaire) — 9 posts, 33 500+ reach estimé.',
    capabilities: ['LinkedIn publishing', 'Article adaptation', 'Hashtag optimization', 'Best-time scheduling', 'Tag suggestions', 'Multi-format', 'Distribution program'],
    success_rate: 93.8,
    tasks_completed: 6430,
    auto_enabled: true,
    icon: 'ri-linkedin-line',
    color: '#DC2626',
    last_execution: '2026-06-16T09:00:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Posts publiés', current: '6,420', target: '10,000', icon: 'ri-send-plane-line' },
      { label: 'Engagement moyen', current: '187', target: '300', icon: 'ri-thumb-up-line' },
      { label: 'Best-time précision', current: '89.2%', target: '95%', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'blog-newsletter-gen',
    name: 'Newsletter Composer & Sender',
    category: 'distribution-syndication',
    tech_stack: ['Email Template Engine', 'Personalization Engine', 'A/B Subject Tester', 'SendGrid/Mailchimp', 'UTM Builder'],
    status: 'deployed',
    version: 'v3.0.0',
    description: 'Compositeur de newsletters automatisé : sélection des articles les plus performants, rédaction des résumés et accroches, personnalisation par segment d\'abonnés, A/B testing des sujets, génération UTM pour tracking, envoi programmé. Templates responsive email optimisés.',
    capabilities: ['Newsletter composition', 'Article curation', 'Personalization', 'A/B testing', 'UTM tracking', 'Responsive templates'],
    success_rate: 91.7,
    tasks_completed: 4870,
    auto_enabled: true,
    icon: 'ri-mail-send-line',
    color: '#DC2626',
    last_execution: '2026-06-15T08:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Newsletters envoyées', current: '4,870', target: '7,000', icon: 'ri-mail-line' },
      { label: 'Taux ouverture', current: '34.2%', target: '40%', icon: 'ri-eye-line' },
      { label: 'Taux clic', current: '8.7%', target: '12%', icon: 'ri-cursor-line' },
    ],
  },
  {
    id: 'blog-cross-channel',
    name: 'Cross-Channel Syndication Engine',
    category: 'distribution-syndication',
    tech_stack: ['RSS Syndicator', 'Medium API', 'Substack Bridge', 'Twitter/X API', 'Content Atomizer', 'Canonical Manager'],
    status: 'partial',
    version: 'v2.1.0',
    description: 'Moteur de syndication cross-canal : republication automatisée sur Medium et Substack avec canonical correct, atomisation des articles longs en threads Twitter/X, gestion des URLs canoniques pour éviter le duplicate content, synchronisation du planning de publication cross-plateforme.',
    capabilities: ['RSS syndication', 'Medium republication', 'Twitter/X threading', 'Canonical management', 'Cross-platform sync', 'Content atomization'],
    success_rate: 84.6,
    tasks_completed: 2150,
    auto_enabled: false,
    icon: 'ri-share-forward-line',
    color: '#DC2626',
    last_execution: '2026-06-14T21:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Canaux syndiqués', current: '5', target: '8', icon: 'ri-global-line' },
      { label: 'Reach additionnel', current: '+24K', target: '+50K', icon: 'ri-user-add-line' },
      { label: 'Canonical errors', current: '0.3%', target: '0%', icon: 'ri-error-warning-line' },
    ],
  },

  // ============ CATÉGORIE 8 : Analytics & Performance Éditoriale (3 agents) ============
  {
    id: 'blog-seo-analytics',
    name: 'SEO Content Performance Tracker',
    category: 'analytics-performance',
    tech_stack: ['GSC API', 'GA4 API', 'Position Tracker', 'Click-Through Analyzer', 'Content Decay Detector'],
    status: 'deployed',
    version: 'v3.2.0',
    description: 'Tracker de performance SEO du contenu : suivi des positions Google, analyse du CTR par position, détection de la décroissance de contenu (content decay), identification des pages à rafraîchir, corrélation mises à jour Google x trafic. Dashboard exécutif hebdomadaire automatisé.',
    capabilities: ['Position tracking', 'CTR analysis', 'Content decay detection', 'Refresh prioritization', 'Google update correlation', 'Weekly dashboard'],
    success_rate: 92.8,
    tasks_completed: 9840,
    auto_enabled: true,
    icon: 'ri-line-chart-line',
    color: '#8B3040',
    last_execution: '2026-06-15T08:30:00Z',
    priority: 'critical',
    kpis: [
      { label: 'Pages trackées', current: '9,840', target: '15,000', icon: 'ri-file-text-line' },
      { label: 'Content decay alerts', current: '247', target: 'N/A', icon: 'ri-alert-line' },
      { label: 'Précision prédiction', current: '88.4%', target: '93%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 'blog-conversion-attr',
    name: 'Content Attribution & ROI Engine',
    category: 'analytics-performance',
    tech_stack: ['Multi-touch Attribution', 'Lead Source Tracker', 'Content- Opportunity Funnel', 'Revenue Attribution', 'CPL Calculator'],
    status: 'deployed',
    version: 'v2.6.0',
    description: 'Moteur d\'attribution et ROI du contenu : attribution multi-touch des leads et opportunités aux articles, funnel contenu-to-opportunity, attribution de revenu par article/catégorie, calcul du Coût Par Lead (CPL) éditorial, ROI comparatif par format et par auteur.',
    capabilities: ['Multi-touch attribution', 'Lead tracking', 'Revenue attribution', 'CPL calculation', 'ROI by format', 'Author performance'],
    success_rate: 87.9,
    tasks_completed: 4560,
    auto_enabled: true,
    icon: 'ri-funds-line',
    color: '#8B3040',
    last_execution: '2026-06-15T07:00:00Z',
    priority: 'high',
    kpis: [
      { label: 'Leads attribués', current: '4,560', target: '7,000', icon: 'ri-user-add-line' },
      { label: 'ROI éditorial', current: '4.7x', target: '6x', icon: 'ri-money-dollar-circle-line' },
      { label: 'CPL moyen', current: '14.20', target: '<10', icon: 'ri-coin-line' },
    ],
  },
  {
    id: 'blog-optimization-rec',
    name: 'Content Optimization Recommender',
    category: 'analytics-performance',
    tech_stack: ['Performance Analyzer', 'Refresh Prioritizer', 'Update Suggester', 'Merge/Archive Detector', 'A/B Test Engine'],
    status: 'partial',
    version: 'v2.0.0',
    description: 'Recommandeur d\'optimisation continue : analyse des performances pour identifier les articles à rafraîchir, suggérer des mises à jour ciblées (nouveaux chiffres, réglementation récente), détecter les contenus à fusionner ou archiver, proposer des A/B tests de titres/méta-descriptions.',
    capabilities: ['Refresh recommendation', 'Update suggestions', 'Merge/archive detection', 'A/B test proposals', 'Impact estimation', 'Automated refresh'],
    success_rate: 80.5,
    tasks_completed: 2340,
    auto_enabled: false,
    icon: 'ri-lightbulb-flash-line',
    color: '#8B3040',
    last_execution: '2026-06-14T17:00:00Z',
    priority: 'medium',
    kpis: [
      { label: 'Recommandations', current: '2,340', target: '4,000', icon: 'ri-lightbulb-line' },
      { label: 'Refresh uplift moy', current: '+47%', target: '+60%', icon: 'ri-arrow-up-line' },
      { label: 'Taux adoption recos', current: '68.4%', target: '85%', icon: 'ri-check-line' },
    ],
  },
];

export const BLOG_WRITING_AUTOMATES_KPIS = {
  total_agents: 25,
  deployed: 23,
  partial: 2,
  mock: 0,
  auto_enabled: 23,
  total_tasks: 124500,
  avg_success_rate: 93.8,
  critical_agents: 10,
  high_priority: 12,
  medium_priority: 3,
  categories: 8,
  articles_published: 9420,
  seo_optimizations: 12450,
  visual_assets: 10580,
  pipeline_active: true,
  master_prompt_active: true,
  streak_days: 14,
  simda_clusters_deployed: 3,
  simda_articles_total: 45,
  simda_integration_pct: 100,
  certification: 'Blog Writing Automates — 25 Agents — 23 Deployes — Pipeline 100% Actif — 45 Articles Simda Integres',
};

// ============================================================
// BLOC 4 — Blog Writing Pipeline Quotidien
// Suivi de la production quotidienne — objectif 10 articles/semaine
// ============================================================
export interface DailyArticleEntry {
  date: string;
  day: string;
  title: string;
  author: string;
  category: string;
  status: 'published' | 'scheduled' | 'draft' | 'in_review';
  word_count: number;
  seo_score: number;
  quality_score: number;
  estimated_traffic: number;
}

export interface WeeklyPipelineStats {
  week_start: string;
  week_label: string;
  target: number;
  published: number;
  scheduled: number;
  in_review: number;
  drafted: number;
  total_production: number;
  avg_seo_score: number;
  avg_quality_score: number;
}

export const dailyPipeline: DailyArticleEntry[] = [
  { date: '2026-06-16', day: 'Mardi', title: 'Réforme du Ratio de Solvabilité UEMOA : Analyse d\'Impact 2026', author: 'Dr. Célestine Koffi', category: 'Régulation', status: 'published', word_count: 2500, seo_score: 94, quality_score: 9.2, estimated_traffic: 1250 },
  { date: '2026-06-17', day: 'Mercredi', title: 'Prix de Transfert : Les 5 Erreurs Fatales dans votre Documentation BEPS', author: 'Ibrahim Kone', category: 'Fiscalité', status: 'published', word_count: 2800, seo_score: 92, quality_score: 9.4, estimated_traffic: 980 },
  { date: '2026-06-18', day: 'Jeudi', title: 'Guide Pratique : Préparer son Conseil d\'Administration à l\'Inspection COBAC', author: 'Fatoumata Diallo', category: 'Gouvernance', status: 'published', word_count: 3000, seo_score: 89, quality_score: 8.9, estimated_traffic: 2100 },
  { date: '2026-06-19', day: 'Vendredi', title: 'Coopétition Banque-Fintech en Afrique Francophone : Les 12 Modèles qui Redéfinissent l\'Écosystème Financier', author: 'Dr. Simda Padagnassou', category: 'FinTech & Régulation', status: 'published', word_count: 3800, seo_score: 94, quality_score: 9.4, estimated_traffic: 2850 },
  { date: '2026-06-20', day: 'Samedi', title: 'Regulatory Sandbox UEMOA/CEMAC : Le Guide Pratique pour Accélérer votre Innovation Financière', author: 'Dr. Simda Padagnassou', category: 'RegTech & Innovation', status: 'published', word_count: 3400, seo_score: 92, quality_score: 9.3, estimated_traffic: 2350 },
  { date: '2026-06-22', day: 'Lundi', title: 'Anticiper pour ne pas Subir : La Gestion Prédictive des Risques Réglementaires dans les Banques Africaines', author: 'Dr. Simda Padagnassou', category: 'Risk Management & Conformité', status: 'published', word_count: 4200, seo_score: 95, quality_score: 9.5, estimated_traffic: 3100 },
  { date: '2026-06-23', day: 'Mardi', title: 'Big Tech en Finance Africaine Horizon 2030 : Les 3 Scénarios qui Vont Redéfinir le Secteur Bancaire', author: 'Dr. Simda Padagnassou', category: 'Prospective Stratégique', status: 'published', word_count: 4500, seo_score: 95, quality_score: 9.5, estimated_traffic: 3400 },
  { date: '2026-06-24', day: 'Mercredi', title: 'DMA-Afrique : Pourquoi l\'Afrique Francophone a Besoin de son Propre Digital Markets Act', author: 'Dr. Simda Padagnassou', category: 'Régulation & Souveraineté Numérique', status: 'published', word_count: 3900, seo_score: 93, quality_score: 9.4, estimated_traffic: 2750 },
  { date: '2026-06-25', day: 'Jeudi', title: 'LBC/FT : Nouvelles Exigences GAFI 2026 — Guide de Conformité pour les Institutions Financières Africaines', author: 'Dr. Amadou Sow', category: 'LBC/FT', status: 'published', word_count: 2800, seo_score: 95, quality_score: 9.5, estimated_traffic: 3200 },
  { date: '2026-06-29', day: 'Lundi', title: 'Cybersécurité Bancaire : Anticiper la Directive COBAC 2027 sur la Résilience Opérationnelle', author: 'Ibrahim Kone', category: 'Cybersécurité', status: 'published', word_count: 5200, seo_score: 94, quality_score: 9.4, estimated_traffic: 1950 },
  { date: '2026-06-30', day: 'Mardi', title: 'Régulation FinTech UEMOA 2026-2027 : Guide Complet de Conformité pour Établissements de Paiement, PSAN et Services Financiers Numériques', author: 'Dr. Jean-Marc Boka', category: 'FinTech', status: 'published', word_count: 3200, seo_score: 92, quality_score: 9.3, estimated_traffic: 2650 },
  { date: '2026-07-01', day: 'Mercredi', title: 'Gestion Actif-Passif (ALM) Bancaire UEMOA : Guide Complet du Pilier Trésorerie — Gouvernance ALCO, GAP Analysis, Risques de Taux, de Change et de Liquidité', author: 'Dr. Abdoulaye Sangaré', category: 'ALM & Trésorerie', status: 'published', word_count: 3800, seo_score: 93, quality_score: 9.3, estimated_traffic: 2150 },
];

export const weeklyPipelineStats: WeeklyPipelineStats[] = [
  { week_start: '2026-06-08', week_label: 'S23 (8-14 Juin)', target: 10, published: 9, scheduled: 0, in_review: 0, drafted: 0, total_production: 9, avg_seo_score: 87, avg_quality_score: 8.8 },
  { week_start: '2026-06-15', week_label: 'S24 (15-21 Juin)', target: 10, published: 6, scheduled: 0, in_review: 0, drafted: 4, total_production: 10, avg_seo_score: 91.5, avg_quality_score: 9.15 },
  { week_start: '2026-06-22', week_label: 'S25 (22-28 Juin)', target: 10, published: 3, scheduled: 1, in_review: 0, drafted: 2, total_production: 6, avg_seo_score: 93.2, avg_quality_score: 9.25 },
];

export const pipelineKPIs = {
  articles_this_week: 18,
  articles_last_week: 12,
  target_weekly: 15,
  completion_rate: 120,
  avg_daily_output: 3.6,
  articles_in_pipeline: 8,
  drafts_ready: 5,
  reviews_pending: 3,
  estimated_weekly_traffic: 58500,
  streak_days: 14,
  generated_via_master_prompt: true,
  simda_articles_published: 45,
  simda_clusters_active: ['Coopétition Fintech & Regulatory Sandbox', 'Gestion Prédictive Risques Réglementaires', 'Big Tech & Souveraineté Numérique Africaine'],
  simda_articles_per_cluster: 15,
  simda_total_traffic_30d: 24800,
  simda_featured_snippets: 26,
  certification: 'Pipeline 100% Actif — 45 Articles Dr. Simda Padagnassou — 3 Clusters — Score SEO 95.2 — Qualite 9.42 — Trafic +45%',
};