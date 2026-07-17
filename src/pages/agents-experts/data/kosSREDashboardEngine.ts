// KOS SRE BIG FOUR REAL-TIME EXECUTIVE DASHBOARD ENGINE™ — Enterprise Observability Platform

export const sreIntro = {
  title: 'SRE Big Four Real-Time Executive Dashboard Engine™',
  subtitle: 'Enterprise Observability Platform — Google SRE · DevOps Observability · AI Incident Response · McKinsey Executive Reporting',
  version: 'VERSION ENTERPRISE — REAL-TIME MONITORING · PREDICTIVE ANALYTICS · BIG FOUR REPORTING',
  role: 'KOS SRE Intelligence Engine™ — système de monitoring et d\'orchestration en temps réel combinant Google SRE, DevOps Observability Engineer, Data Analytics Engine, AI Incident Response System et Executive Reporting System (style McKinsey/BCG). Sa mission : fournir une vision temps réel, actionnable et stratégique de l\'ensemble du système KOS et des plateformes connectées.',
  tagline: 'La tour de contrôle exécutive qui ne dort jamais — surveille, analyse, prédit et recommande 24/7, 365 jours par an.',
  objective: 'Transformer le système KOS en Real-Time Enterprise Observability Platform : self-monitoring SRE system, predictive failure prevention engine, AI-driven executive control tower, Big Four-grade digital operations center.',
};

export const dashboardArchitectureLayers = [
  {
    id: 'data-layer',
    label: 'A.',
    title: 'Real-Time Data Layer — Sources',
    subtitle: 'COUCHE A — SOURCES DE DONNÉES',
    icon: 'ri-database-2-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Le dashboard ingère en continu des données provenant de 7 sources hétérogènes : logs système, métriques API, CMS headless, performance web vitals, uptime monitoring, error tracking et analytics.',
    items: [
      { name: 'Logs système', icon: 'ri-file-list-3-line', desc: 'Logs backend (Node.js, Edge Functions) et frontend (console errors, React errors)' },
      { name: 'API metrics', icon: 'ri-plug-line', desc: 'Latence, taux d\'erreur, throughput et disponibilité des endpoints REST/GraphQL' },
      { name: 'CMS Headless', icon: 'ri-stack-line', desc: 'État de synchronisation, statut des contenus, erreurs de schéma et champs manquants' },
      { name: 'Performance Web Vitals', icon: 'ri-speed-up-line', desc: 'LCP, INP, CLS, TTFB et FCP — collectés via Lighthouse CI et RUM' },
      { name: 'Uptime Monitoring', icon: 'ri-pulse-line', desc: 'Disponibilité 24/7, temps de réponse global et par région, certificats SSL' },
      { name: 'Error Tracking', icon: 'ri-bug-line', desc: 'Erreurs JS, API failures, crash reports — Sentry/LogRocket-like integration' },
      { name: 'Analytics & SEO', icon: 'ri-bar-chart-line', desc: 'Google Analytics, Search Console, événements personnalisés et données SEO' },
    ],
  },
  {
    id: 'processing-engine',
    label: 'B.',
    title: 'Processing Engine — SRE Core',
    subtitle: 'COUCHE B — MOTEUR DE TRAITEMENT',
    icon: 'ri-cpu-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Le Processing Engine transforme les données brutes en signaux exploitables : incidents classifiés, anomalies détectées, tendances identifiées, alertes critiques générées et insights business extraits.',
    items: [
      { name: 'Incidents', icon: 'ri-error-warning-line', desc: 'Classification automatique des incidents par sévérité, impact et service affecté' },
      { name: 'Anomalies', icon: 'ri-radar-line', desc: 'Détection statistique des anomalies — écart-type, seuils dynamiques, patterns inhabituels' },
      { name: 'Tendances', icon: 'ri-line-chart-line', desc: 'Analyse des tendances sur 7j, 30j et 90j — direction, vélocité et prédiction' },
      { name: 'Alertes critiques', icon: 'ri-alarm-warning-line', desc: 'Génération d\'alertes avec priorité, contexte et recommandation d\'action' },
      { name: 'Insights business', icon: 'ri-lightbulb-flash-line', desc: 'Extraction d\'insights actionnables — impact business, opportunités, risques' },
    ],
  },
  {
    id: 'intelligence-layer',
    label: 'C.',
    title: 'Intelligence Layer — AI Analysis',
    subtitle: 'COUCHE C — ANALYSE IA',
    icon: 'ri-brain-line',
    color: 'from-amber-500 to-amber-600',
    description: 'L\'Intelligence Layer applique des modèles d\'IA pour l\'analyse avancée : corrélation erreurs-trafic, prédiction de crash, détection de dégradation UX, comparaison performance vs historique et identification des goulots d\'étranglement.',
    items: [
      { name: 'Corrélation erreurs ↔ trafic', icon: 'ri-flow-chart', desc: 'Analyse des corrélations entre les pics d\'erreur et les variations de trafic' },
      { name: 'Prédiction crash système', icon: 'ri-psychotherapy-line', desc: 'Modèles prédictifs basés sur les patterns historiques d\'incidents et de dégradation' },
      { name: 'Détection dégradation UX', icon: 'ri-user-heart-line', desc: 'Identification automatique des baisses de satisfaction utilisateur et de conversion' },
      { name: 'Analyse vs historique', icon: 'ri-history-line', desc: 'Comparaison continue des métriques actuelles vs baseline historique (7j, 30j, 90j)' },
      { name: 'Goulets d\'étranglement', icon: 'ri-hourglass-line', desc: 'Identification des points de friction système — API lentes, requêtes lourdes, mémoire' },
    ],
  },
  {
    id: 'executive-layer',
    label: 'D.',
    title: 'Executive Dashboard Layer — Interface',
    subtitle: 'COUCHE D — INTERFACE DE SYNTHÈSE',
    icon: 'ri-dashboard-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'L\'Executive Dashboard Layer présente une synthèse actionnable : KPI globaux en un coup d\'œil, alertes critiques priorisées, recommandations automatiques et score de santé système global.',
    items: [
      { name: 'KPI globaux', icon: 'ri-bar-chart-grouped-line', desc: 'Vue synthétique des 5 piliers — Reliability, Performance, UX, Architecture, Security' },
      { name: 'Alertes critiques', icon: 'ri-alarm-warning-line', desc: 'Alertes priorisées avec sévérité, service affecté et action recommandée' },
      { name: 'Recommandations', icon: 'ri-lightbulb-line', desc: 'Suggestions automatiques d\'optimisation basées sur l\'analyse des données' },
      { name: 'Score santé système', icon: 'ri-heart-pulse-line', desc: 'Score global 0-100 agrégé des 5 piliers avec tendance et historique' },
    ],
  },
];

export const coreMetrics = [
  {
    id: 'reliability',
    label: 'A. System Reliability',
    subtitle: 'SRE CORE',
    icon: 'ri-shield-check-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Pilier SRE fondamental — mesure la disponibilité, la résilience et la capacité de récupération du système face aux incidents.',
    metrics: [
      { name: 'Uptime', target: '99.99%', icon: 'ri-check-double-line' },
      { name: 'Error Rate', target: '< 0.03%', icon: 'ri-error-warning-line' },
      { name: 'Incident Frequency', target: '< 1 / semaine', icon: 'ri-alert-line' },
      { name: 'MTTR (Mean Time To Repair)', target: '< 5 min', icon: 'ri-timer-line' },
      { name: 'MTBF (Mean Time Between Failures)', target: '> 720h', icon: 'ri-time-line' },
    ],
  },
  {
    id: 'performance',
    label: 'B. Performance Engine',
    subtitle: 'CORE WEB VITALS',
    icon: 'ri-speed-up-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Mesure la vitesse et la réactivité perçue par l\'utilisateur final — Core Web Vitals et métriques de performance serveur.',
    metrics: [
      { name: 'LCP (Largest Contentful Paint)', target: '< 2.5s', icon: 'ri-image-line' },
      { name: 'INP (Interaction to Next Paint)', target: '< 200ms', icon: 'ri-cursor-line' },
      { name: 'API Latency (p95)', target: '< 300ms', icon: 'ri-plug-line' },
      { name: 'Server Response Time', target: '< 100ms', icon: 'ri-server-line' },
      { name: 'Resource Usage (CPU/RAM)', target: '< 70%', icon: 'ri-cpu-line' },
    ],
  },
  {
    id: 'ux-health',
    label: 'C. User Experience Health',
    subtitle: 'UX SIGNALS',
    icon: 'ri-user-heart-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Évalue la qualité de l\'expérience utilisateur à travers les signaux comportementaux et les métriques d\'engagement.',
    metrics: [
      { name: 'Bounce Rate', target: '< 40%', icon: 'ri-arrow-go-back-line' },
      { name: 'Session Duration', target: '> 3 min', icon: 'ri-timer-line' },
      { name: 'Navigation Friction Index', target: '< 0.15', icon: 'ri-mouse-line' },
      { name: 'Conversion Rate', target: '> 3.5%', icon: 'ri-exchange-line' },
      { name: 'Page Abandonment Rate', target: '< 25%', icon: 'ri-close-circle-line' },
    ],
  },
  {
    id: 'architecture',
    label: 'D. System Architecture Health',
    subtitle: 'INFRASTRUCTURE',
    icon: 'ri-stack-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Surveille la santé structurelle : liens cassés, pages orphelines, synchronisation CMS, cache et indexation SEO.',
    metrics: [
      { name: 'Broken Links Count', target: '0', icon: 'ri-links-line' },
      { name: 'Orphan Pages', target: '0', icon: 'ri-file-unknow-line' },
      { name: 'CMS Sync Status', target: '100%', icon: 'ri-refresh-line' },
      { name: 'Cache Efficiency', target: '> 95%', icon: 'ri-speed-mini-line' },
      { name: 'Indexation Rate (SEO)', target: '> 98%', icon: 'ri-search-line' },
    ],
  },
  {
    id: 'security',
    label: 'E. Security & Stability',
    subtitle: 'SECURITY POSTURE',
    icon: 'ri-lock-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Évalue la posture de sécurité : vulnérabilités, tentatives suspectes, échecs d\'authentification et risques de dépendances.',
    metrics: [
      { name: 'Vulnerability Count', target: '0 critique', icon: 'ri-shield-flash-line' },
      { name: 'Suspicious Requests', target: '< 10 / jour', icon: 'ri-spy-line' },
      { name: 'Failed Auth Attempts', target: '< 5 / heure', icon: 'ri-lock-password-line' },
      { name: 'Dependency Risks', target: '0 haute', icon: 'ri-puzzle-line' },
      { name: 'Rollback Events', target: '< 1 / mois', icon: 'ri-rewind-line' },
    ],
  },
];

export const alertingSystem = [
  {
    level: 'critical',
    label: 'CRITICAL',
    icon: 'ri-alarm-warning-line',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700',
    description: 'Alertes critiques nécessitant une action immédiate et une suggestion de rollback automatique.',
    triggers: [
      { name: 'Site down', icon: 'ri-global-line', desc: 'Indisponibilité totale ou partielle détectée — rollback automatique si lié à un déploiement récent' },
      { name: 'API failure', icon: 'ri-plug-line', desc: 'Échec complet d\'un endpoint critique — basculement automatique vers fallback' },
      { name: 'Error spike > threshold', icon: 'ri-error-warning-line', desc: 'Pic d\'erreur dépassant le seuil critique — isolation automatique du composant défaillant' },
      { name: 'CMS corruption', icon: 'ri-file-damage-line', desc: 'Corruption détectée dans le schéma ou les données CMS — restauration depuis backup' },
    ],
    action: 'Action immédiate + rollback suggestion',
  },
  {
    level: 'warning',
    label: 'WARNING',
    icon: 'ri-alert-line',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
    description: 'Alertes d\'avertissement déclenchant un auto-diagnostic et une proposition de correction.',
    triggers: [
      { name: 'Performance degradation', icon: 'ri-speed-line', desc: 'Dégradation des Core Web Vitals au-delà du seuil d\'alerte — diagnostic automatique' },
      { name: 'UX friction increase', icon: 'ri-user-unfollow-line', desc: 'Augmentation du taux de rebond ou de la friction de navigation — analyse des causes' },
      { name: 'SEO drop detected', icon: 'ri-search-eye-line', desc: 'Baisse du trafic organique ou du taux d\'indexation — diagnostic SEO automatique' },
    ],
    action: 'Auto-diagnosis + fix proposal',
  },
  {
    level: 'info',
    label: 'INFO',
    icon: 'ri-information-line',
    color: 'from-sky-500 to-sky-600',
    bgColor: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-700',
    description: 'Notifications informatives sur les améliorations détectées, les optimisations appliquées et les tendances positives.',
    triggers: [
      { name: 'Improvements detected', icon: 'ri-arrow-up-circle-line', desc: 'Amélioration significative détectée sur une ou plusieurs métriques — documentation automatique' },
      { name: 'Optimizations applied', icon: 'ri-check-double-line', desc: 'Confirmation qu\'une optimisation automatique a été appliquée avec succès' },
      { name: 'Trends positives', icon: 'ri-line-chart-line', desc: 'Tendance positive soutenue sur 7+ jours — recommandation de capitalisation' },
    ],
    action: 'Notification + logging',
  },
];

export const realTimeLoop = {
  title: 'Real-Time Autonomous Loop — Cycle 1-5 Minutes',
  description: 'Toutes les 1 à 5 minutes, le moteur exécute un cycle complet de surveillance, d\'analyse et de recommandation. Ce cycle continu garantit une vision toujours à jour de l\'état du système et permet une réactivité quasi-instantanée face aux anomalies.',
  steps: [
    { step: '01', label: 'Collecte données', icon: 'ri-database-2-line', desc: 'Ingestion des données de toutes les sources — logs, métriques, analytics, erreurs', color: 'from-sky-500 to-sky-600' },
    { step: '02', label: 'Analyse système', icon: 'ri-cpu-line', desc: 'Traitement et analyse des données brutes — agrégation, normalisation, corrélation', color: 'from-violet-500 to-violet-600' },
    { step: '03', label: 'Détection anomalies', icon: 'ri-radar-line', desc: 'Scan des patterns anormaux — seuils dynamiques, écarts-type, tendances suspectes', color: 'from-amber-500 to-amber-600' },
    { step: '04', label: 'Classification incidents', icon: 'ri-error-warning-line', desc: 'Catégorisation des incidents par sévérité, impact, service et urgence', color: 'from-rose-500 to-rose-600' },
    { step: '05', label: 'Génération insights', icon: 'ri-lightbulb-flash-line', desc: 'Production d\'insights actionnables — causes racines, recommandations, prédictions', color: 'from-emerald-500 to-emerald-600' },
    { step: '06', label: 'Mise à jour dashboard', icon: 'ri-dashboard-line', desc: 'Actualisation de tous les panneaux du dashboard exécutif en temps réel', color: 'from-indigo-500 to-indigo-600' },
    { step: '07', label: 'Suggestion actions', icon: 'ri-chat-check-line', desc: 'Émission de recommandations automatiques — correctives, préventives, optimisantes', color: 'from-green-500 to-green-600' },
  ],
};

export const insightEngine = {
  title: 'AI Insight Engine — Intelligence Automatique',
  description: 'Le moteur d\'insight génère automatiquement trois types d\'analyses à partir des données collectées : des analyses de cause racine (RCA) pour comprendre les incidents, des alertes prédictives pour anticiper les problèmes et des suggestions d\'optimisation pour améliorer continuellement le système.',
  categories: [
    {
      id: 'rca',
      title: '📉 Root Cause Analysis (RCA)',
      icon: 'ri-search-eye-line',
      color: 'from-rose-500 to-rose-600',
      description: 'Analyse automatisée de la cause racine de chaque incident — pourquoi c\'est arrivé, quel est l\'impact système, et quelle est la corrélation avec les changements récents.',
      items: [
        { name: 'Pourquoi l\'incident est arrivé', desc: 'Traçage complet de la chaîne causale — du symptôme à la cause racine' },
        { name: 'Impact système', desc: 'Quantification de l\'impact — utilisateurs affectés, durée, perte de revenu estimée' },
        { name: 'Corrélation avec changements récents', desc: 'Croisement automatique avec le log des déploiements, modifications et configurations' },
      ],
    },
    {
      id: 'predictive',
      title: '🔮 Predictive Alerts',
      icon: 'ri-psychotherapy-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Alertes prédictives basées sur l\'analyse des tendances et des patterns historiques — risques de crash futur, surcharge de trafic prévue, dégradation progressive détectée.',
      items: [
        { name: 'Risque de crash futur', desc: 'Détection des signaux faibles annonciateurs d\'un crash — mémoire, CPU, latence croissante' },
        { name: 'Surcharge trafic prévue', desc: 'Prédiction des pics de trafic basée sur l\'historique et les événements planifiés' },
        { name: 'Dégradation progressive détectée', desc: 'Identification des dégradations lentes — régression insidieuse sur plusieurs jours' },
      ],
    },
    {
      id: 'optimization',
      title: '💡 Optimization Suggestions',
      icon: 'ri-lightbulb-flash-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Suggestions automatiques d\'optimisation continue — amélioration des performances, refactor d\'architecture, optimisation UX et recommandations de scaling.',
      items: [
        { name: 'Amélioration performance', desc: 'Identification des optimisations de performance les plus impactantes par ordre de priorité' },
        { name: 'Refactor architecture', desc: 'Détection des patterns architecturaux sous-optimaux et suggestions de restructuration' },
        { name: 'Optimisation UX', desc: 'Analyse des parcours utilisateurs et identification des opportunités de simplification' },
        { name: 'Scaling recommandé', desc: 'Recommandation proactive de scaling vertical ou horizontal basée sur les tendances de charge' },
      ],
    },
  ],
};

export const dashboardStructure = {
  title: 'Dashboard Structure — UI Logique',
  description: 'L\'interface du dashboard exécutif est organisée en 7 panneaux logiques qui couvrent l\'intégralité de la supervision SRE. Chaque panneau est conçu pour répondre à une question opérationnelle spécifique et fournir une réponse actionnable en un coup d\'œil.',
  panels: [
    {
      id: 'health-score',
      title: '🟢 Global Health Score',
      icon: 'ri-heart-pulse-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Score global 0-100 agrégé des 5 dimensions : stabilité système, performance, UX, SEO et sécurité.',
      items: ['System Stability', 'Performance', 'UX', 'SEO', 'Security'],
    },
    {
      id: 'system-status',
      title: '⚙️ System Status Panel',
      icon: 'ri-dashboard-line',
      color: 'from-sky-500 to-sky-600',
      description: 'État en temps réel des composants critiques : uptime, taux d\'erreur, incidents actifs.',
      items: ['Uptime 99.99%', 'Error Rate < 0.03%', 'Active Incidents: 0'],
    },
    {
      id: 'incident-feed',
      title: '🚨 Incident Feed (LIVE)',
      icon: 'ri-alarm-warning-line',
      color: 'from-rose-500 to-rose-600',
      description: 'Flux en direct des incidents avec timestamp, sévérité, services affectés et statut.',
      items: ['Timestamp horodaté', 'Severity: Critical / Warning / Info', 'Affected Services', 'Status: Open / Resolved'],
    },
    {
      id: 'performance-panel',
      title: '🚀 Performance Panel',
      icon: 'ri-speed-up-line',
      color: 'from-violet-500 to-violet-600',
      description: 'Métriques de performance temps réel : LCP, INP, latence API, Core Web Vitals.',
      items: ['Speed Metrics (LCP, INP, CLS)', 'API Latency (p50, p95, p99)', 'Core Web Vitals Trend'],
    },
    {
      id: 'ux-panel',
      title: '🧭 UX Panel',
      icon: 'ri-user-heart-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Analyse de l\'expérience utilisateur : flux de navigation, points de friction, fuites de conversion.',
      items: ['Navigation Flow', 'Friction Points', 'Conversion Leaks'],
    },
    {
      id: 'architecture-panel',
      title: '🧱 Architecture Panel',
      icon: 'ri-stack-line',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Santé de l\'architecture : synchronisation CMS, indexation, liens cassés, statut des composants.',
      items: ['CMS Sync Status', 'Indexation Rate', 'Broken Links'],
    },
    {
      id: 'security-panel',
      title: '🔐 Security Panel',
      icon: 'ri-lock-line',
      color: 'from-slate-500 to-slate-600',
      description: 'Posture de sécurité : menaces actives, vulnérabilités détectées, anomalies de sécurité.',
      items: ['Active Threats', 'Vulnerabilities', 'Security Anomalies'],
    },
  ],
};

export const safeOpsRules = [
  { title: 'Pas d\'action destructive sans validation', icon: 'ri-forbid-line', desc: 'Aucune action corrective automatique de niveau destructive (suppression, rollback, redémarrage) sans validation explicite.' },
  { title: 'Conservation des logs critiques', icon: 'ri-file-history-line', desc: 'Les logs critiques sont conservés en intégralité — jamais de suppression ou de rotation agressive.' },
  { title: 'Pas de masquage d\'incidents', icon: 'ri-eye-line', desc: 'Tous les incidents sont documentés, tracés et visibles — aucun masquage ou minimisation.' },
  { title: 'Anomalies répétées non ignorées', icon: 'ri-loop-left-line', desc: 'Les anomalies récurrentes déclenchent une escalade automatique — aucune tolérance à la répétition.' },
];

export const safeOpsProtocol = 'Détecter → Analyser → Recommander → Optionnellement exécuter';

export const outputFormatSRE = {
  title: 'Output Format Obligatoire — Rapport de Cycle',
  description: 'Chaque cycle de monitoring produit un rapport structuré en 7 sections. Ce format garantit que chaque observation est tracée, analysée et actionnable. Le rapport est horodaté et conservé dans l\'historique pour analyse longitudinale.',
  items: [
    { step: '01', label: 'Global System Health Score', icon: 'ri-heart-pulse-line', desc: 'Score global 0-100 avec décomposition par pilier et tendance vs cycle précédent.' },
    { step: '02', label: 'Incident Summary', icon: 'ri-error-warning-line', desc: 'Résumé des incidents détectés : nombre, sévérité, services affectés, statut de résolution.' },
    { step: '03', label: 'KPI Breakdown (Big Four)', icon: 'ri-bar-chart-grouped-line', desc: 'Décomposition détaillée des 5 piliers avec chaque sous-métrique et son évolution.' },
    { step: '04', label: 'Detected Anomalies', icon: 'ri-radar-line', desc: 'Liste des anomalies détectées avec niveau de confiance, impact estimé et contexte.' },
    { step: '05', label: 'Root Cause Analysis', icon: 'ri-search-eye-line', desc: 'Analyse des causes racines pour les incidents majeurs — chaîne causale et corrélations.' },
    { step: '06', label: 'Recommended Actions', icon: 'ri-lightbulb-flash-line', desc: 'Actions correctives et préventives recommandées avec priorité, effort estimé et impact.' },
    { step: '07', label: 'Predicted Risks (Next Cycle)', icon: 'ri-psychotherapy-line', desc: 'Projection des risques pour le prochain cycle — probabilité, impact et préparation recommandée.' },
  ],
};

export const sreConclusion = {
  title: 'SRE Intelligence Dashboard™ — La Tour de Contrôle Exécutive',
  body: 'Ce moteur est la tour de contrôle de l\'écosystème KOS — celle qui donne aux dirigeants, aux opérateurs et aux agents IA une vision temps réel, actionnable et prédictive de l\'ensemble du système. Il répond aux 5 questions fondamentales : que se passe-t-il maintenant ? Est-ce stable ? Où sont les risques ? Que faut-il corriger immédiatement ? Quelle est la tendance ?',
  pillars: [
    { label: 'Real-Time Observability', icon: 'ri-eye-line', desc: 'Vision temps réel de tous les signaux — logs, métriques, erreurs, performance' },
    { label: 'Self-Monitoring SRE', icon: 'ri-shield-check-line', desc: 'Le système se surveille lui-même — détection, analyse, alerte automatiques' },
    { label: 'Predictive Prevention', icon: 'ri-psychotherapy-line', desc: 'Prédiction des défaillances avant qu\'elles ne surviennent — ML sur historique' },
    { label: 'AI Executive Control Tower', icon: 'ri-building-2-line', desc: 'Tour de contrôle IA pour dirigeants — synthèse, recommandations, KPIs' },
    { label: 'Big Four Digital Ops Center', icon: 'ri-dashboard-line', desc: 'Centre d\'opérations digitales niveau McKinsey, BCG, Bain, Deloitte' },
  ],
  finalStatement: 'La tour de contrôle exécutive qui ne dort jamais — surveille, analyse, prédit et recommande 24/7, 365 jours par an. Le cockpit Big Four de l\'écosystème KOS™.',
};

// Version Ultra
export const sreUltraMode = {
  title: '🔥 VERSION ULTRA — Activée',
  description: 'Lorsque le mode Ultra est activé, le SRE Dashboard déploie des capacités avancées de niveau enterprise :',
  features: [
    { name: 'Grafana + AI Overlay', icon: 'ri-dashboard-line', desc: 'Superposition d\'IA sur Grafana — annotations automatiques, alertes intelligentes, corrélations' },
    { name: 'Auto-Remediation Engine', icon: 'ri-tools-line', desc: 'Correction automatique des incidents courants — restart, cache clear, failover' },
    { name: 'Incident Auto-Resolution Bot', icon: 'ri-robot-2-line', desc: 'Bot autonome de résolution d\'incidents — diagnostic, correction, validation, documentation' },
    { name: 'Anomaly Detection ML Model', icon: 'ri-brain-line', desc: 'Modèle de machine learning dédié à la détection d\'anomalies — entraîné sur l\'historique' },
    { name: 'Cross-System Observability', icon: 'ri-global-line', desc: 'Observabilité multi-site KOS — dashboard unifié pour tous les sites et plateformes' },
  ],
};