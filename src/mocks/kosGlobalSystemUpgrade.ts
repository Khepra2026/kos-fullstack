// ============================================================
// KOS Global System Upgrade Command™ — Mock Data
// 3 Axes : Capacités Agents/Automates, GSC URL Booster, LinkedIn Fix
// ============================================================

// ═══ AXE 1 : CAPABILITY UPGRADES — AGENTS & AUTOMATES ═══

export interface AgentCapabilityGap {
  agentId: string;
  agentName: string;
  domain: string;
  icon: string;
  currentCapabilities: string[];
  missingCapabilities: string[];
  recommendedUpgrades: string[];
  severity: 'critical' | 'major' | 'minor';
  estimatedEffort: string;
  expectedImpact: string;
  upgradeStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
}

export interface AutomateUpgrade {
  automateId: string;
  automateName: string;
  category: string;
  icon: string;
  currentVersion: string;
  targetVersion: string;
  newAbilities: string[];
  upgradeSteps: string[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedDuration: string;
  dependencies: string[];
}

export const AGENT_CAPABILITY_GAPS: AgentCapabilityGap[] = [
  {
    agentId: 'kos-social-content-generator',
    agentName: 'Social Content Generator',
    domain: 'Social Media',
    icon: 'ri-share-line',
    currentCapabilities: ['Génération posts LinkedIn', 'Génération posts X', 'Hashtags stratégiques'],
    missingCapabilities: ['Publication directe LinkedIn API', 'Planification multi-plateforme', 'A/B testing posts', 'Analyse engagement prédictive'],
    recommendedUpgrades: ['Intégration OAuth LinkedIn', 'Module planification cross-platform', 'Moteur A/B testing', 'Prédicteur engagement IA'],
    severity: 'critical',
    estimatedEffort: '4h',
    expectedImpact: '+300% reach, publication automatique LinkedIn/X/YouTube',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-youtube-publisher',
    agentName: 'YouTube Publisher',
    domain: 'YouTube',
    icon: 'ri-youtube-line',
    currentCapabilities: ['Génération scripts', 'Métadonnées SEO YouTube', 'Miniatures concept'],
    missingCapabilities: ['Upload direct YouTube API', 'Programmation playlist auto', 'Analyse retention audience', 'Sous-titres automatiques'],
    recommendedUpgrades: ['Activation YouTube Data API v3', 'Module programmation éditoriale', 'Analyseur retention', 'Générateur sous-titres FR'],
    severity: 'critical',
    estimatedEffort: '6h',
    expectedImpact: 'Publication 100% autonome YouTube, +50% watch time',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-community-manager',
    agentName: 'Community Manager',
    domain: 'Social Media',
    icon: 'ri-chat-3-line',
    currentCapabilities: ['Réponses template', 'Suivi commentaires'],
    missingCapabilities: ['Réponses contextuelles IA', 'Détection leads commentaires', 'Escalade automatique', 'Rapport engagement hebdo'],
    recommendedUpgrades: ['Moteur NLP contextuel', 'Détecteur leads conversations', 'Système escalade', 'Rapporteur automatique'],
    severity: 'major',
    estimatedEffort: '3h',
    expectedImpact: 'Temps réponse divisé par 10, +25% conversion commentaires → leads',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-blog-writing-automate',
    agentName: 'Blog Writing Automate',
    domain: 'Content',
    icon: 'ri-article-line',
    currentCapabilities: ['Génération articles', 'Optimisation SEO on-page', 'Structure Big Four'],
    missingCapabilities: ['Recherche sources automatique', 'Citation tracking', 'Mise à jour articles obsolètes', 'Génération assets visuels'],
    recommendedUpgrades: ['Moteur recherche académique', 'Tracker citations réglementaires', 'Module refresh contenu', 'Générateur assets DALL-E/StableDiffusion'],
    severity: 'major',
    estimatedEffort: '5h',
    expectedImpact: '+200 articles/mois, actualisation automatique contenu',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-seo-autopilot',
    agentName: 'SEO Autopilot',
    domain: 'SEO',
    icon: 'ri-search-line',
    currentCapabilities: ['Analyse mots-clés', 'Suivi positions', 'Maillage interne'],
    missingCapabilities: ['Soumission GSC automatique', 'Détection Featured Snippets', 'Optimisation AEO continue', 'Régénération sitemap dynamique'],
    recommendedUpgrades: ['Module soumission GSC API', 'Tracker Featured Snippets', 'Optimiseur AEO permanent', 'Sitemap dynamique temps réel'],
    severity: 'critical',
    estimatedEffort: '4h',
    expectedImpact: '+40% pages indexées, +15 Featured Snippets, indexation 24h',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-lead-scoring-engine',
    agentName: 'Lead Scoring Engine',
    domain: 'CRM',
    icon: 'ri-user-star-line',
    currentCapabilities: ['Scoring comportemental', 'Segmentation leads', 'Alertes hot leads'],
    missingCapabilities: ['Prédiction conversion IA', 'Nurturing automatique personnalisé', 'Attribution multi-touch', 'Rapport ROI par lead source'],
    recommendedUpgrades: ['Prédicteur ML conversion', 'Séquence nurturing adaptative', 'Modèle attribution multi-touch', 'Dashboard ROI temps réel'],
    severity: 'major',
    estimatedEffort: '5h',
    expectedImpact: '+35% conversion leads, nurturing 100% autonome',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-regulatory-scanner',
    agentName: 'Regulatory Auto-Scanner',
    domain: 'Compliance',
    icon: 'ri-scales-line',
    currentCapabilities: ['Veille BCEAO/COBAC', 'Alertes réglementaires', 'Résumés conformité'],
    missingCapabilities: ['Analyse impact automatique', 'Génération plan d\'action', 'Tracking échéances réglementaires', 'Comparaison multi-juridiction'],
    recommendedUpgrades: ['Analyseur impact réglementaire IA', 'Générateur plan conformité', 'Calendrier échéances auto', 'Comparateur UEMOA/CEMAC/OHADA'],
    severity: 'critical',
    estimatedEffort: '4h',
    expectedImpact: 'Conformité proactive, zéro échéance manquée, couverture 3 juridictions',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-linkedin-bridge',
    agentName: 'LinkedIn Bridge',
    domain: 'Social Media',
    icon: 'ri-linkedin-line',
    currentCapabilities: ['Agrégation données page', 'OEmbed + OpenGraph', 'Snapshots manuels'],
    missingCapabilities: ['Publication API LinkedIn', 'Analytics page entreprise', 'Détection blocages/rate-limits', 'Rotation User-Agent anti-blocage'],
    recommendedUpgrades: ['Module anti-blocage (User-Agent rotation, délais adaptatifs)', 'API LinkedIn Marketing (posts, stats)', 'Détecteur rate-limit', 'Fallback publication manuelle'],
    severity: 'critical',
    estimatedEffort: '6h',
    expectedImpact: 'Zéro blocage LinkedIn, publication automatique, analytics temps réel',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-knowledge-graph-builder',
    agentName: 'Knowledge Graph Builder',
    domain: 'Knowledge',
    icon: 'ri-mind-map',
    currentCapabilities: ['Extraction entités', 'Relations documents', 'Requêtes RAG'],
    missingCapabilities: ['Enrichissement auto depuis sources officielles', 'Détection contradictions', 'Mise à jour temps réel', 'Export graphe connaissance'],
    recommendedUpgrades: ['Connecteur sources officielles (BCEAO, COBAC, GAFI)', 'Détecteur incohérences', 'Module rafraîchissement continu', 'Exporteur JSON-LD Knowledge Graph'],
    severity: 'major',
    estimatedEffort: '5h',
    expectedImpact: 'Base connaissance toujours à jour, zéro contradiction, SEO Knowledge Graph',
    upgradeStatus: 'pending',
  },
  {
    agentId: 'kos-thumbnail-factory',
    agentName: 'Thumbnail Factory',
    domain: 'YouTube',
    icon: 'ri-image-edit-line',
    currentCapabilities: ['Concepts miniatures', 'Génération prompts SD'],
    missingCapabilities: ['Génération directe miniatures', 'A/B testing CTR', 'Template branding KHEPRA', 'Export multi-format'],
    recommendedUpgrades: ['Pipeline génération SD → retouche → export', 'Module A/B testing miniatures', 'Système template branding', 'Export PNG/JPG/WebP'],
    severity: 'major',
    estimatedEffort: '3h',
    expectedImpact: 'Miniatures 100% auto-générées, +40% CTR YouTube',
    upgradeStatus: 'pending',
  },
];

export const AUTOMATE_UPGRADES: AutomateUpgrade[] = [
  {
    automateId: 'automate-social',
    automateName: 'Social Automation Suite',
    category: 'Social Media',
    icon: 'ri-share-forward-line',
    currentVersion: 'v2.1',
    targetVersion: 'v3.0',
    newAbilities: ['Publication cross-platform', 'Détection anti-blocage', 'A/B testing', 'Analytics unifié'],
    upgradeSteps: ['Mise à jour edge functions social', 'Ajout module anti-blocage', 'Intégration analytics', 'Tests cross-platform'],
    status: 'pending',
    estimatedDuration: '4h',
    dependencies: ['kos-linkedin-bridge', 'kos-social-content-generator'],
  },
  {
    automateId: 'automate-content',
    automateName: 'Content Factory',
    category: 'Content',
    icon: 'ri-file-copy-2-line',
    currentVersion: 'v2.0',
    targetVersion: 'v3.0',
    newAbilities: ['Recherche sources auto', 'Assets visuels', 'Mise à jour articles', 'Multi-format (blog, LI, vidéo)'],
    upgradeSteps: ['Module recherche académique', 'Intégration génération assets', 'Système refresh contenu', 'Pipeline multi-format'],
    status: 'pending',
    estimatedDuration: '5h',
    dependencies: ['kos-blog-writing-automate', 'kos-thumbnail-factory'],
  },
  {
    automateId: 'automate-seo',
    automateName: 'SEO Growth Engine',
    category: 'SEO',
    icon: 'ri-search-eye-line',
    currentVersion: 'v2.0',
    targetVersion: 'v3.0',
    newAbilities: ['Soumission GSC auto', 'Featured Snippets tracking', 'AEO optimization', 'Sitemap dynamique'],
    upgradeSteps: ['Module GSC API', 'Tracker Featured Snippets', 'Optimiseur AEO', 'Sitemap temps réel'],
    status: 'pending',
    estimatedDuration: '4h',
    dependencies: ['kos-seo-autopilot'],
  },
  {
    automateId: 'automate-youtube',
    automateName: 'YouTube Automation Suite',
    category: 'YouTube',
    icon: 'ri-youtube-line',
    currentVersion: 'v1.5',
    targetVersion: 'v2.0',
    newAbilities: ['Upload direct API', 'Sous-titres auto', 'Playlist management', 'Analytics retention'],
    upgradeSteps: ['Activation YouTube Data API', 'Module sous-titres FR', 'Gestion playlists', 'Dashboard analytics'],
    status: 'pending',
    estimatedDuration: '6h',
    dependencies: ['kos-youtube-publisher', 'kos-thumbnail-factory'],
  },
  {
    automateId: 'automate-compliance',
    automateName: 'Compliance Automation Suite',
    category: 'Compliance',
    icon: 'ri-shield-check-line',
    currentVersion: 'v1.8',
    targetVersion: 'v2.5',
    newAbilities: ['Analyse impact auto', 'Plans conformité', 'Multi-juridiction', 'Échéances tracking'],
    upgradeSteps: ['Analyseur impact IA', 'Générateur plans', 'Comparateur juridictions', 'Calendrier échéances'],
    status: 'pending',
    estimatedDuration: '4h',
    dependencies: ['kos-regulatory-scanner'],
  },
];

// ═══ AXE 2 : GSC URL BOOSTER — INDEXATION GOOGLE ═══

export interface GSCBoosterUrl {
  url: string;
  title: string;
  category: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  currentStatus: 'not_indexed' | 'indexed_but_low' | 'crawled_not_indexed' | 'discovered_not_crawled';
  estimatedTraffic: number;
  action: string;
  indexStatus: 'pending' | 'submitted' | 'indexed' | 'failed';
  submittedAt?: string;
}

export const GSC_BOOSTER_URLS: GSCBoosterUrl[] = [
  // Pages critiques non indexées
  { url: '/kos-total-governance-regulatory-excellence', title: 'KOS Total Governance & Regulatory Excellence', category: 'KOS Command Center', priority: 'critical', currentStatus: 'discovered_not_crawled', estimatedTraffic: 850, action: 'Soumettre manuellement + backlink interne depuis dashboard KOS', indexStatus: 'pending' },
  { url: '/kos-hybrid-youtube-studio', title: 'KOS Hybrid YouTube Studio™', category: 'KOS Command Center', priority: 'critical', currentStatus: 'not_indexed', estimatedTraffic: 620, action: 'Soumettre + ajouter au sitemap-news', indexStatus: 'pending' },
  { url: '/kos-global-system-upgrade', title: 'KOS Global System Upgrade Command', category: 'KOS Command Center', priority: 'critical', currentStatus: 'not_indexed', estimatedTraffic: 450, action: 'Soumettre + lien depuis homepage', indexStatus: 'pending' },
  { url: '/kos-seo-autopilot', title: 'KOS SEO Autopilot™', category: 'SEO', priority: 'critical', currentStatus: 'indexed_but_low', estimatedTraffic: 1200, action: 'Optimiser meta + ajouter FAQ Schema', indexStatus: 'pending' },
  
  // Pages haute priorité
  { url: '/youtube-download-center', title: 'YouTube Download Center KOS', category: 'YouTube Tools', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 380, action: 'Soumettre + internal linking depuis Hybrid Studio', indexStatus: 'pending' },
  { url: '/youtube-pending', title: 'YouTube Publication Queue KOS', category: 'YouTube Tools', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 290, action: 'Soumettre + backlink depuis Download Center', indexStatus: 'pending' },
  { url: '/kos-global-agent-performance', title: 'KOS Global Agent Performance Scan', category: 'KOS Command Center', priority: 'high', currentStatus: 'discovered_not_crawled', estimatedTraffic: 550, action: 'Backlink depuis agents-experts + soumettre', indexStatus: 'pending' },
  { url: '/kos-linkedin-distribution-program', title: 'LinkedIn Distribution Program', category: 'LinkedIn', priority: 'high', currentStatus: 'indexed_but_low', estimatedTraffic: 480, action: 'Optimiser title tag + soumettre', indexStatus: 'pending' },
  
  // Nouvelles pages
  { url: '/blog/gouvernance-sfd-7-piliers-bceao-attirer-investisseurs-uemoa-2026', title: 'Gouvernance SFD — 7 Piliers BCEAO', category: 'Blog', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 720, action: 'Soumettre + indexation prioritaire', indexStatus: 'pending' },
  { url: '/blog/protection-donnees-personnelles-secteur-financier-uemoa-rgpd-bceao-2026', title: 'Protection Données Personnelles UEMOA', category: 'Blog', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 650, action: 'Soumettre + sitemap-news', indexStatus: 'pending' },
  { url: '/blog/finance-islamique-uemoa-guide-strategique-banques-sfd-fintechs-sharia-compliant-2026', title: 'Finance Islamique UEMOA Guide Stratégique', category: 'Blog', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 580, action: 'Soumettre + internal linking', indexStatus: 'pending' },
  { url: '/blog/reforme-ratio-solvabilite-uemoa-2026', title: 'Réforme Ratio Solvabilité UEMOA 2026', category: 'Blog', priority: 'high', currentStatus: 'discovered_not_crawled', estimatedTraffic: 890, action: 'Backlink depuis page BCEAO + soumettre', indexStatus: 'pending' },
  { url: '/blog/regulation-fintech-uemoa-2026-2027', title: 'Régulation Fintech UEMOA 2026-2027', category: 'Blog', priority: 'high', currentStatus: 'not_indexed', estimatedTraffic: 750, action: 'Soumettre + sitemap-news', indexStatus: 'pending' },
  
  // Pages medium priorité
  { url: '/kos-quality-excellence-command', title: 'KOS Quality Excellence Command', category: 'KOS Command Center', priority: 'medium', currentStatus: 'indexed_but_low', estimatedTraffic: 340, action: 'Refresh contenu + soumettre', indexStatus: 'pending' },
  { url: '/kos-regulatory-compliance-engine', title: 'KOS Regulatory Compliance Engine', category: 'Compliance', priority: 'medium', currentStatus: 'crawled_not_indexed', estimatedTraffic: 410, action: 'Optimiser balisage + soumettre', indexStatus: 'pending' },
  { url: '/kos-ai-governance-ethics', title: 'KOS AI Governance & Ethics', category: 'AI', priority: 'medium', currentStatus: 'discovered_not_crawled', estimatedTraffic: 280, action: 'Soumettre + internal linking', indexStatus: 'pending' },
  { url: '/lead-magnets/guide-bceao-2026', title: 'Guide BCEAO 2026 — Lead Magnet', category: 'Lead Magnet', priority: 'medium', currentStatus: 'not_indexed', estimatedTraffic: 920, action: 'Soumettre + lien depuis homepage', indexStatus: 'pending' },
  { url: '/lead-magnets/checklist-conformite-bceao-cobac', title: 'Checklist Conformité BCEAO/COBAC', category: 'Lead Magnet', priority: 'medium', currentStatus: 'not_indexed', estimatedTraffic: 780, action: 'Soumettre + lien depuis blog', indexStatus: 'pending' },
  { url: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026', title: 'Diagnostic Flash Conformité 2026', category: 'Lead Magnet', priority: 'medium', currentStatus: 'not_indexed', estimatedTraffic: 650, action: 'Soumettre + lien depuis page services', indexStatus: 'pending' },
  { url: '/lead-magnets/guide-levee-fonds-afrique', title: 'Guide Levée de Fonds Afrique', category: 'Lead Magnet', priority: 'medium', currentStatus: 'not_indexed', estimatedTraffic: 550, action: 'Soumettre + lien depuis blog finance', indexStatus: 'pending' },
];

export interface GSCBoosterStats {
  totalUrlsToSubmit: number;
  criticalUrls: number;
  highPriorityUrls: number;
  estimatedTotalTraffic: number;
  currentIndexedRate: string;
  targetIndexedRate: string;
  lastSitemapSubmission: string;
  sitemapUrlCount: number;
  totalSitePages: number;
}

export const GSC_BOOSTER_STATS: GSCBoosterStats = {
  totalUrlsToSubmit: GSC_BOOSTER_URLS.length,
  criticalUrls: GSC_BOOSTER_URLS.filter(u => u.priority === 'critical').length,
  highPriorityUrls: GSC_BOOSTER_URLS.filter(u => u.priority === 'high').length,
  estimatedTotalTraffic: GSC_BOOSTER_URLS.reduce((sum, u) => sum + u.estimatedTraffic, 0),
  currentIndexedRate: '68%',
  targetIndexedRate: '95%',
  lastSitemapSubmission: '2026-06-15T08:00:00Z',
  sitemapUrlCount: 175,
  totalSitePages: 268,
};

// ═══ AXE 3 : LINKEDIN FIX — DIAGNOSTIC & RESOLUTION ═══

export interface LinkedInBlockDiagnostic {
  diagnosticId: string;
  issue: string;
  category: 'blocking' | 'rate_limit' | 'auth' | 'scraping' | 'api';
  severity: 'critical' | 'high' | 'medium';
  description: string;
  rootCause: string;
  solution: string;
  implementationSteps: string[];
  status: 'detected' | 'diagnosing' | 'fixing' | 'resolved' | 'monitoring';
  autoFixable: boolean;
  estimatedFixTime: string;
}

export const LINKEDIN_BLOCK_DIAGNOSTICS: LinkedInBlockDiagnostic[] = [
  {
    diagnosticId: 'LI-BLOCK-001',
    issue: 'Blocage scraping LinkedIn — HTTP 429 / 999',
    category: 'blocking',
    severity: 'critical',
    description: "LinkedIn bloque les requêtes automatisées sans User-Agent légitime et sans délais entre requêtes, retournant des codes HTTP 429 (Too Many Requests) ou 999 (LinkedIn bloqueur propriétaire).",
    rootCause: "Absence de rotation User-Agent, absence de délais adaptatifs entre requêtes, pattern d'accès détecté comme bot.",
    solution: "Implémenter un module anti-blocage avec rotation User-Agent, délais exponentiels (backoff), et fallback vers mode manuel quand bloqué.",
    implementationSteps: [
      "Ajouter rotation User-Agent (5-10 agents desktop/mobile réalistes)",
      "Implémenter délais adaptatifs : 3s base, +2s par requête successive, max 30s",
      "Détecter les réponses 429/999 et basculer en mode backoff exponentiel",
      "Stocker le statut de blocage dans Supabase pour UI temps réel",
      "Ajouter fallback mode manuel : générer le post, le copier dans le presse-papier, ouvrir LinkedIn",
    ],
    status: 'detected',
    autoFixable: true,
    estimatedFixTime: '3h',
  },
  {
    diagnosticId: 'LI-BLOCK-002',
    issue: 'Absence OAuth LinkedIn — Publication impossible via API',
    category: 'auth',
    severity: 'critical',
    description: "La publication automatique sur LinkedIn nécessite OAuth 2.0 avec les scopes w_member_social, r_organization_social. Sans token, impossible de publier via l'API.",
    rootCause: "Pas de token OAuth LinkedIn configuré. L'application KHEPRA EXPERTS doit être enregistrée sur LinkedIn Developers et les tokens stockés dans Supabase.",
    solution: "Guider la connexion OAuth LinkedIn via le flow standard et stocker les tokens de manière sécurisée dans Supabase Edge Function secrets.",
    implementationSteps: [
      "Enregistrer l'application sur LinkedIn Developers (https://www.linkedin.com/developers/apps)",
      "Configurer les scopes : w_member_social, r_organization_social, r_organization_admin",
      "Stocker CLIENT_ID et CLIENT_SECRET dans les secrets Supabase",
      "Implémenter le flow OAuth 2.0 (Authorization Code Grant) dans kos-linkedin-bridge",
      "Stocker access_token + refresh_token dans Supabase",
      "Implémenter le rafraîchissement automatique des tokens",
    ],
    status: 'detected',
    autoFixable: false,
    estimatedFixTime: '4h',
  },
  {
    diagnosticId: 'LI-BLOCK-003',
    issue: 'Rate limiting — Trop de requêtes en court laps de temps',
    category: 'rate_limit',
    severity: 'high',
    description: "LinkedIn impose des limites strictes : ~100 requêtes/15min pour les endpoints publics, ~50 posts/jour pour l'API. Le dépassement déclenche un blocage temporaire.",
    rootCause: "Pas de système de queue/rate limiting dans le bridge LinkedIn. Les requêtes sont envoyées sans contrôle de cadence.",
    solution: "Implémenter un rate limiter avec queue de requêtes, espacement minimum de 30s entre chaque appel, et circuit breaker en cas de blocage.",
    implementationSteps: [
      "Ajouter file d'attente de requêtes avec espacement configurable",
      "Implémenter circuit breaker : 3 échecs → pause 15min",
      "Stocker le compteur de requêtes/15min dans Supabase",
      "Afficher le statut rate-limit dans l'UI",
      "Ajouter notification quand le quota approche de la limite",
    ],
    status: 'detected',
    autoFixable: true,
    estimatedFixTime: '2h',
  },
  {
    diagnosticId: 'LI-BLOCK-004',
    issue: 'Données page entreprise incomplètes — Fallback multi-source insuffisant',
    category: 'scraping',
    severity: 'medium',
    description: "Le bridge LinkedIn actuel agrège OEmbed + OpenGraph + Snapshots, mais le scraping OpenGraph échoue souvent (blocage). Les données followers/employés sont donc souvent null.",
    rootCause: "La couche OpenGraph est bloquée par LinkedIn car les requêtes sans cookie valide sont rejetées. Le fallback Google Cache ne suffit pas toujours.",
    solution: "Ajouter une couche cache persistant + capture périodique (1x/jour) avec délais pour éviter le blocage, et enrichir avec les données API une fois OAuth activé.",
    implementationSteps: [
      "Réduire la fréquence de scraping à 1x/jour",
      "Ajouter cache 24h dans Supabase pour les données page entreprise",
      "Enrichir automatiquement les données via l'API LinkedIn (Organization Lookup)",
      "Ajouter fallback statique (données saisies manuellement dans Supabase)",
    ],
    status: 'detected',
    autoFixable: true,
    estimatedFixTime: '1.5h',
  },
  {
    diagnosticId: 'LI-BLOCK-005',
    issue: 'Pas de monitoring blocage — Aucune visibilité temps réel',
    category: 'monitoring',
    severity: 'medium',
    description: "Quand LinkedIn bloque, l'application ne le détecte pas proactivement et continue d'essayer, aggravant le blocage. Aucun dashboard de monitoring.",
    rootCause: "Absence de système de monitoring et de logging des erreurs LinkedIn.",
    solution: "Ajouter un dashboard de monitoring LinkedIn avec statut live, historique des blocages, alertes, et mode dégradé automatique.",
    implementationSteps: [
      "Créer table Supabase linkedin_health_logs",
      "Logger chaque tentative de requête avec statut (success/blocked/rate_limited)",
      "Dashboard monitoring en temps réel dans le Global System Upgrade",
      "Alerte automatique quand 3+ blocages consécutifs détectés",
      "Basculement automatique en mode dégradé (posts manuels uniquement)",
    ],
    status: 'detected',
    autoFixable: true,
    estimatedFixTime: '2h',
  },
];

export interface LinkedInHealthSnapshot {
  timestamp: string;
  bridgeStatus: 'operational' | 'degraded' | 'blocked' | 'offline';
  requestsLastHour: number;
  blockedRequestsLastHour: number;
  successfulPostsLast7d: number;
  failedPostsLast7d: number;
  rateLimitRemaining: string;
  oauthStatus: 'configured' | 'not_configured';
  lastSuccessfulScrape: string;
}

export const LINKEDIN_HEALTH_SNAPSHOT: LinkedInHealthSnapshot = {
  timestamp: new Date().toISOString(),
  bridgeStatus: 'degraded',
  requestsLastHour: 12,
  blockedRequestsLastHour: 8,
  successfulPostsLast7d: 0,
  failedPostsLast7d: 17,
  rateLimitRemaining: 'inconnu — pas de tracking',
  oauthStatus: 'not_configured',
  lastSuccessfulScrape: '2026-06-15T08:30:00Z',
};

// ═══ GLOBAL UPGRADE SUMMARY ═══

export interface GlobalUpgradeSummary {
  totalUpgrades: number;
  criticalUpgrades: number;
  majorUpgrades: number;
  minorUpgrades: number;
  autoFixableUpgrades: number;
  manualUpgrades: number;
  estimatedTotalEffort: string;
  estimatedTrafficGain: number;
  estimatedReachGain: number;
  targetCompletionDate: string;
}

export const GLOBAL_UPGRADE_SUMMARY: GlobalUpgradeSummary = {
  totalUpgrades: AGENT_CAPABILITY_GAPS.length + AUTOMATE_UPGRADES.length + GSC_BOOSTER_URLS.length + LINKEDIN_BLOCK_DIAGNOSTICS.length,
  criticalUpgrades: AGENT_CAPABILITY_GAPS.filter(a => a.severity === 'critical').length + LINKEDIN_BLOCK_DIAGNOSTICS.filter(d => d.severity === 'critical').length,
  majorUpgrades: AGENT_CAPABILITY_GAPS.filter(a => a.severity === 'major').length + AUTOMATE_UPGRADES.length,
  minorUpgrades: AGENT_CAPABILITY_GAPS.filter(a => a.severity === 'minor').length,
  autoFixableUpgrades: AGENT_CAPABILITY_GAPS.length + AUTOMATE_UPGRADES.length - LINKEDIN_BLOCK_DIAGNOSTICS.filter(d => !d.autoFixable).length,
  manualUpgrades: LINKEDIN_BLOCK_DIAGNOSTICS.filter(d => !d.autoFixable).length,
  estimatedTotalEffort: '~52h (6.5 jours)',
  estimatedTrafficGain: GSC_BOOSTER_URLS.reduce((sum, u) => sum + u.estimatedTraffic, 0),
  estimatedReachGain: 46000,
  targetCompletionDate: '2026-06-28',
};





