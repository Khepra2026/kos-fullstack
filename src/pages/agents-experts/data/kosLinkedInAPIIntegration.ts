// KOS LINKEDIN API INTEGRATION & SOCIAL CONNECTIVITY ENGINE™ — API Credential Intelligence System

export const linkedInAPIIntro = {
  title: 'LinkedIn API Integration & Social Connectivity Engine™',
  subtitle: 'API Credential Intelligence Platform — OAuth Management · Scope Auditing · Token Lifecycle · Permission Engineering',
  version: 'VERSION ENTERPRISE — REAL-TIME API DIAGNOSTICS · SCOPE UPGRADE PATH · MULTI-CHANNEL MONITORING',
  role: 'KOS LinkedIn API Integration Engine™ — agent spécialisé dans la gestion, l\'audit et l\'optimisation des connexions API sociales. Sa mission : diagnostiquer l\'état des intégrations API (LinkedIn, Twitter/X, Meta), auditer les scopes OAuth disponibles vs requis, tracer la feuille de route d\'upgrade vers le Marketing Developer Platform, monitorer la santé des tokens en continu, et garantir que chaque canal social est pleinement opérationnel en mode live. Il est le gardien de la connectivité sociale KOS — celui qui transforme les tokens mock en connexions live.',
  tagline: 'Le diplomate API qui négocie avec les plateformes sociales pour débloquer chaque scope, chaque permission, chaque donnée.',
  objective: 'Transformer l\'infrastructure de connectivité sociale KOS d\'un patchwork de tokens partiels en une Architecture API Enterprise : tokens OAuth 2.0 full-scope, rotation automatique, monitoring 24/7, et fallback intelligent mock→live.',
};

// ARCHITECTURE — 5 Diagnostic Layers
export const linkedInAPILayers = [
  {
    id: 'token-inventory',
    label: 'A.',
    title: 'Token Inventory & Health Audit',
    subtitle: 'COUCHE A — INVENTAIRE DES TOKENS',
    icon: 'ri-key-2-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Audit exhaustif de tous les tokens OAuth et clés API sociales enregistrés dans le système. Vérification de la validité, des dates d\'expiration, des scopes associés et du niveau de privilège de chaque credential.',
    items: [
      { name: 'LinkedIn Access Token', icon: 'ri-linkedin-box-line', desc: 'Token OAuth 2.0 principal — validité, expiration (18 août 2026), scopes actifs (email, openid, profile, w_member_social), refresh token disponible' },
      { name: 'LinkedIn Page Token', icon: 'ri-building-line', desc: 'Token pour l\'API Organization — STATUT : NON DISPONIBLE. Scope requis : r_organization_social ou MDP (Marketing Developer Platform)' },
      { name: 'Twitter/X API Keys', icon: 'ri-twitter-x-line', desc: 'Clés API Twitter/X — statut de connexion, niveau d\'accès (Free/Basic/Pro/Enterprise), rate limits' },
      { name: 'Meta Business Token', icon: 'ri-facebook-box-line', desc: 'Token Meta Business Suite — pages connectées, permissions Instagram/Facebook, statut de vérification' },
      { name: 'Token Rotation Status', icon: 'ri-refresh-line', desc: 'Mécanisme de rotation automatique — actif/inactif, fréquence, historique des renouvellements' },
      { name: 'Fallback Chain', icon: 'ri-git-branch-line', desc: 'Chaîne de fallback configurée — ordre de priorité (secret Supabase → table social_api_tokens → mock data)' },
      { name: 'Expiration Calendar', icon: 'ri-calendar-check-line', desc: 'Calendrier des expirations — alertes à J-30, J-14, J-7, J-1 avant expiration de chaque token' },
    ],
  },
  {
    id: 'scope-analysis',
    label: 'B.',
    title: 'OAuth Scope Analysis & Gap Detection',
    subtitle: 'COUCHE B — ANALYSE DES SCOPES',
    icon: 'ri-scan-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Analyse différentielle entre les scopes OAuth actuellement disponibles et les scopes requis pour chaque fonctionnalité KOS. Identification des gaps bloquants, classification par criticité et recommandation de la feuille de route d\'upgrade.',
    items: [
      { name: 'Scope Available vs Required', icon: 'ri-contrast-line', desc: 'Matrice de comparaison — pour chaque endpoint LinkedIn, quels scopes sont nécessaires vs quels scopes sont disponibles' },
      { name: 'r_organization_social Gap', icon: 'ri-close-circle-line', desc: 'GAP CRITIQUE : scope requis pour /v2/organizations/{id} et /v2/organizationalEntityShareStatistics — nécessaire pour les données de la page entreprise KHEPRA EXPERTS' },
      { name: 'Marketing Developer Platform Path', icon: 'ri-road-map-line', desc: 'Parcours de candidature au MDP — prérequis (app vérifiée, business verification, use case documentation), délai estimé, documentation à fournir' },
      { name: 'w_member_social Utilization', icon: 'ri-check-line', desc: 'Scope déjà actif et fonctionnel — utilisé pour /v2/me, /v2/userinfo, /v2/shares (profil personnel du fondateur)' },
      { name: 'r_basicprofile Status', icon: 'ri-profile-line', desc: 'Scope de base — vérification du bon fonctionnement, données retournées, limites d\'utilisation' },
      { name: 'r_emailaddress Status', icon: 'ri-mail-line', desc: 'Scope email — utilisé pour la vérification d\'identité, cross-référencement CRM, conformité' },
      { name: 'Scope Upgrade Simulator', icon: 'ri-magic-line', desc: 'Simulation de l\'impact de chaque scope additionnel — données débloquées, fonctionnalités activées, valeur business générée' },
    ],
  },
  {
    id: 'permission-engineering',
    label: 'C.',
    title: 'Permission Engineering & Upgrade Execution',
    subtitle: 'COUCHE C — INGÉNIERIE DES PERMISSIONS',
    icon: 'ri-tools-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Exécution de la feuille de route d\'upgrade des permissions : préparation des dossiers de candidature, génération des documents justificatifs, suivi des demandes, tests de validation post-upgrade et documentation des nouvelles capacités.',
    items: [
      { name: 'App Verification Package', icon: 'ri-file-list-3-line', desc: 'Génération du dossier de vérification d\'application LinkedIn — description du use case, captures d\'écran, politique de confidentialité, URL de l\'app' },
      { name: 'Business Verification', icon: 'ri-building-2-line', desc: 'Préparation des documents de vérification d\'entreprise — Kbis, statuts, adresse, site web, description des services' },
      { name: 'MDP Application Draft', icon: 'ri-draft-line', desc: 'Rédaction de la candidature Marketing Developer Platform — use case détaillé, endpoints nécessaires, volume estimé, justification business' },
      { name: 'Scope Request Generator', icon: 'ri-add-circle-line', desc: 'Génération automatique des demandes de scope additionnel avec justification réglementaire et business validée' },
      { name: 'Testing Sandbox', icon: 'ri-test-tube-line', desc: 'Environnement de test pour valider les nouveaux scopes avant déploiement — requêtes mock, validation de la réponse, vérification des données' },
      { name: 'Post-Upgrade Validation', icon: 'ri-check-double-line', desc: 'Checklist de validation post-upgrade — tous les endpoints cibles répondent correctement, les données sont cohérentes, aucun breaking change' },
      { name: 'Rollback Plan', icon: 'ri-rewind-line', desc: 'Plan de rollback en cas d\'échec d\'upgrade — restauration des tokens précédents, fallback mock, communication aux parties prenantes' },
    ],
  },
  {
    id: 'live-monitoring',
    label: 'D.',
    title: 'Live Connectivity Monitoring & Health Dashboard',
    subtitle: 'COUCHE D — MONITORING LIVE',
    icon: 'ri-pulse-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Surveillance continue 24/7 de la santé des connexions API sociales. Détection proactive des dégradations, des expirations imminentes, des erreurs 401/403, et des rate limits. Dashboard temps réel avec code couleur (vert connecté, jaune partiel, rouge déconnecté).',
    items: [
      { name: 'Real-Time Status Dashboard', icon: 'ri-dashboard-line', desc: 'Dashboard temps réel — statut de chaque connexion API avec code couleur (🟢 live, 🟡 partial, 🔴 down), latence, taux d\'erreur' },
      { name: '401/403 Error Detector', icon: 'ri-alert-line', desc: 'Détection immédiate des erreurs d\'authentification — token expiré, scope insuffisant, accès révoqué, app suspendue' },
      { name: 'Rate Limit Monitor', icon: 'ri-speed-line', desc: 'Monitoring des rate limits — consommation quotidienne/mensuelle, alertes à 80%, 90%, 95%, recommandations d\'optimisation' },
      { name: 'Data Freshness Score', icon: 'ri-timer-line', desc: 'Score de fraîcheur des données par endpoint — âge des dernières données live, fréquence de rafraîchissement, fraîcheur vs mock' },
      { name: 'Health Check Schedule', icon: 'ri-calendar-check-line', desc: 'Planification des health checks — toutes les heures pour les tokens critiques, toutes les 6h pour les tokens standards, quotidien pour les fallbacks' },
      { name: 'Incident Response Playbook', icon: 'ri-shield-flash-line', desc: 'Procédure d\'incident automatisée — détection → diagnostic → fallback → notification → correction → validation → rétablissement' },
      { name: 'SLA Tracking', icon: 'ri-contract-line', desc: 'Suivi des SLA par API — uptime, temps de réponse, taux de succès, comparaison avec les SLA LinkedIn/Meta/Twitter officiels' },
    ],
  },
  {
    id: 'intelligence-fallback',
    label: 'E.',
    title: 'Intelligent Data Fallback & Hybrid Mode Orchestration',
    subtitle: 'COUCHE E — ORCHESTRATION HYBRIDE',
    icon: 'ri-git-branch-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Orchestration intelligente du mode hybride live+mock : quand une API est partiellement disponible (ex: profil fondateur OK, page entreprise KO), le système combine automatiquement les données live disponibles avec des données mock enrichies pour les endpoints bloqués, garantissant une expérience utilisateur complète et transparente.',
    items: [
      { name: 'Hybrid Mode Engine', icon: 'ri-cpu-line', desc: 'Moteur de fusion live+mock — par endpoint, détection de la disponibilité, basculement automatique, transparence utilisateur' },
      { name: 'Data Source Transparency', icon: 'ri-eye-line', desc: 'Affichage clair de la source de chaque donnée dans le dashboard — badge 🟢 LIVE, 🟡 MOCK ENRICHED, 🔴 MOCK BASELINE' },
      { name: 'Mock Data Enrichment', icon: 'ri-database-2-line', desc: 'Enrichissement des données mock avec les dernières données live disponibles — croisement, extrapolation, cohérence statistique' },
      { name: 'Partial Availability Optimizer', icon: 'ri-pie-chart-line', desc: 'Optimisation des endpoints partiellement disponibles — extraction maximale de valeur des scopes actuels en attendant l\'upgrade complet' },
      { name: 'Graceful Degradation', icon: 'ri-arrow-down-circle-line', desc: 'Dégradation gracieuse — quand un endpoint live devient indisponible, basculement instantané vers mock sans interruption de service' },
      { name: 'Upgrade Trigger', icon: 'ri-rocket-line', desc: 'Déclencheur automatique de la procédure d\'upgrade quand un nouveau scope est détecté comme disponible — notification + exécution' },
      { name: 'Fallback Quality Score', icon: 'ri-award-line', desc: 'Score de qualité du fallback — évalue la proximité des données mock enrichies avec les données live potentielles (basé sur l\'historique)' },
    ],
  },
];

// KPI BIG FOUR — 5 Piliers
export const linkedInAPIKPIs = [
  {
    id: 'connectivity',
    label: 'A. API Connectivity',
    subtitle: 'CONNECTIVITY SCORE',
    icon: 'ri-plug-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Mesure de la connectivité globale des APIs sociales — taux de disponibilité, temps de réponse, taux de succès des requêtes.',
    metrics: [
      { name: 'APIs en mode Live', target: '> 80%', icon: 'ri-check-double-line' },
      { name: 'Uptime global', target: '> 99.5%', icon: 'ri-timer-flash-line' },
      { name: 'Taux de succès requêtes', target: '> 98%', icon: 'ri-check-line' },
      { name: 'Latence moyenne', target: '< 500ms', icon: 'ri-speed-line' },
      { name: 'Endpoints couverts', target: '> 70%', icon: 'ri-radar-line' },
    ],
  },
  {
    id: 'scope-coverage',
    label: 'B. Scope Coverage',
    subtitle: 'SCOPE SCORE',
    icon: 'ri-key-2-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Taux de couverture des scopes OAuth requis — pour chaque capability KOS, quel pourcentage des scopes nécessaires est effectivement disponible.',
    metrics: [
      { name: 'Scopes LinkedIn disponibles', target: '4/5', icon: 'ri-linkedin-box-line' },
      { name: 'Gap r_organization_social', target: 'Résolu', icon: 'ri-close-circle-line' },
      { name: 'MDP Status', target: 'Applied', icon: 'ri-file-list-3-line' },
      { name: 'Permissions Twitter/X', target: '2/3', icon: 'ri-twitter-x-line' },
      { name: 'Permissions Meta', target: '0/3', icon: 'ri-facebook-box-line' },
    ],
  },
  {
    id: 'token-health',
    label: 'C. Token Health & Security',
    subtitle: 'TOKEN HEALTH SCORE',
    icon: 'ri-shield-check-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Santé et sécurité des tokens — validité, rotation, stockage sécurisé, absence de fuite, conformité OAuth 2.0 best practices.',
    metrics: [
      { name: 'Tokens valides', target: '100%', icon: 'ri-check-double-line' },
      { name: 'Rotation automatique', target: 'Activée', icon: 'ri-refresh-line' },
      { name: 'Stockage sécurisé', target: 'Edge Secrets', icon: 'ri-lock-line' },
      { name: 'Jours avant expiration', target: '> 60j', icon: 'ri-calendar-check-line' },
      { name: 'Historique de rotation', target: 'Complet', icon: 'ri-file-history-line' },
    ],
  },
  {
    id: 'data-quality',
    label: 'D. Data Quality & Freshness',
    subtitle: 'DATA QUALITY SCORE',
    icon: 'ri-database-2-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Qualité et fraîcheur des données sociales — âge des données, complétude, cohérence entre endpoints, enrichissement mock.',
    metrics: [
      { name: 'Données live', target: '> 60%', icon: 'ri-database-line' },
      { name: 'Fraîcheur moyenne', target: '< 1h', icon: 'ri-timer-line' },
      { name: 'Complétude profil', target: '> 90%', icon: 'ri-checkbox-circle-line' },
      { name: 'Cohérence cross-endpoint', target: '> 95%', icon: 'ri-git-branch-line' },
      { name: 'Taux d\'erreur parsing', target: '< 1%', icon: 'ri-bug-line' },
    ],
  },
  {
    id: 'upgrade-progress',
    label: 'E. Upgrade Progress',
    subtitle: 'UPGRADE PROGRESS',
    icon: 'ri-rocket-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Progression de la feuille de route d\'upgrade — étapes complétées, jalons atteints, délais estimés, blocages identifiés.',
    metrics: [
      { name: 'Business Verification', target: 'Complété', icon: 'ri-building-2-line' },
      { name: 'App Verification', target: 'En cours', icon: 'ri-smartphone-line' },
      { name: 'MDP Application', target: 'À soumettre', icon: 'ri-file-list-3-line' },
      { name: 'r_organization_social', target: 'En attente', icon: 'ri-hourglass-line' },
      { name: 'Timeline estimée MDP', target: '4-6 semaines', icon: 'ri-calendar-line' },
    ],
  },
];

// UPGRADE ROADMAP — 6 Étapes
export const upgradeRoadmap = {
  title: 'LinkedIn API Upgrade Roadmap — Du Token Partiel au Full-Scope Enterprise',
  description: 'Feuille de route en 6 étapes pour passer de l\'état actuel (profil fondateur live, page entreprise mock) à un état cible full-scope avec Marketing Developer Platform et r_organization_social. Chaque étape est actionnable, documentée et traçable.',
  steps: [
    {
      step: '01',
      title: 'Audit & Inventory',
      icon: 'ri-search-eye-line',
      color: 'from-sky-500 to-sky-600',
      description: 'Audit exhaustif de la configuration actuelle : token OAuth 2.0, scopes disponibles (email, openid, profile, w_member_social), endpoints accessibles (/v2/me, /v2/userinfo), endpoints bloqués (/v2/organizations/*, /v2/organizationalEntityShareStatistics), fallback configuré.',
      deliverables: ['Token Inventory Report', 'Scope Gap Analysis', 'Endpoint Accessibility Matrix', 'Fallback Configuration Audit'],
      duration: '1 jour',
      status: 'completed',
    },
    {
      step: '02',
      title: 'Documentation Preparation',
      icon: 'ri-file-list-3-line',
      color: 'from-violet-500 to-violet-600',
      description: 'Préparation du dossier de candidature LinkedIn : description détaillée du use case KHEPRA EXPERTS, captures d\'écran de l\'intégration existante, politique de confidentialité, URL de l\'application, documentation des endpoints nécessaires et justification business.',
      deliverables: ['Use Case Document', 'App Screenshots', 'Privacy Policy URL', 'Business Justification Letter', 'Endpoint Requirements List'],
      duration: '3-5 jours',
      status: 'in_progress',
    },
    {
      step: '03',
      title: 'Business Verification',
      icon: 'ri-building-2-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Procédure de vérification d\'entreprise LinkedIn : soumission des documents officiels (Kbis, statuts, adresse), vérification du site web khepraexperts.com, validation du domaine, confirmation de l\'identité de l\'entreprise.',
      deliverables: ['Business Registration Proof', 'Domain Verification', 'Company Address Validation', 'LinkedIn Business Profile Link'],
      duration: '2-3 semaines (LinkedIn)',
      status: 'pending',
    },
    {
      step: '04',
      title: 'MDP Application Submission',
      icon: 'ri-rocket-line',
      color: 'from-rose-500 to-rose-600',
      description: 'Soumission de la candidature au Marketing Developer Platform de LinkedIn : formulaire complet, use case détaillé, endpoints requis (r_organization_social, r_1st_connections_size, r_ads_reporting), volume estimé d\'appels API, engagement de conformité.',
      deliverables: ['MDP Application Form', 'API Usage Forecast', 'Compliance Statement', 'Data Processing Agreement'],
      duration: '30-60 jours (review LinkedIn)',
      status: 'pending',
    },
    {
      step: '05',
      title: 'Scope Activation & Testing',
      icon: 'ri-test-tube-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Activation des nouveaux scopes (r_organization_social, etc.), regénération du token OAuth 2.0, tests exhaustifs de tous les endpoints, validation de la cohérence des données, vérification du bon fonctionnement du fallback et mise à jour de la table social_api_tokens.',
      deliverables: ['New Token with Full Scopes', 'Endpoint Test Results', 'Data Validation Report', 'Updated social_api_tokens Row'],
      duration: '2-3 jours',
      status: 'pending',
    },
    {
      step: '06',
      title: 'Full Live Activation & Monitoring',
      icon: 'ri-check-double-line',
      color: 'from-indigo-500 to-indigo-600',
      description: 'Activation complète du mode live pour la page entreprise KHEPRA EXPERTS, mise à jour du bandeau SocialMetricsLiveBanner (🟢 Live), monitoring 24/7, configuration des alertes d\'expiration, documentation finale et capitalisation.',
      deliverables: ['100% Live Dashboard', 'Monitoring Configuration', 'Alert Rules', 'Final Documentation & Capitalization'],
      duration: '1 jour + monitoring continu',
      status: 'pending',
    },
  ],
};

// TOKEN LIFECYCLE MANAGEMENT
export const tokenLifecycle = {
  title: 'Token Lifecycle Management — Gestion Automatisée du Cycle de Vie',
  description: 'Le moteur gère automatiquement le cycle de vie complet de chaque token OAuth : création, stockage, utilisation, monitoring, rotation et révocation. Chaque étape est journalisée et auditée.',
  phases: [
    { phase: '01', title: 'Provisioning', icon: 'ri-key-2-line', desc: 'Création ou réception d\'un nouveau token OAuth 2.0 via le flux 3-legged LinkedIn. Stockage sécurisé immédiat dans social_api_tokens.', color: 'from-sky-500 to-sky-600' },
    { phase: '02', title: 'Validation', icon: 'ri-check-line', desc: 'Vérification immédiate de la validité du token — test call à /v2/me, vérification des scopes, enregistrement de la date d\'expiration.', color: 'from-violet-500 to-violet-600' },
    { phase: '03', title: 'Distribution', icon: 'ri-git-branch-line', desc: 'Distribution sécurisée du token aux Edge Functions autorisées via service_role key. Fallback chain configurée (secret → DB → mock).', color: 'from-amber-500 to-amber-600' },
    { phase: '04', title: 'Utilisation', icon: 'ri-play-circle-line', desc: 'Utilisation du token par les Edge Functions — rate limiting, retry logic, circuit breaker, logging de chaque appel API.', color: 'from-emerald-500 to-emerald-600' },
    { phase: '05', title: 'Monitoring', icon: 'ri-pulse-line', desc: 'Surveillance continue — taux d\'erreur, latence, expiration imminente (alertes J-30, J-14, J-7, J-1), scope drift detection.', color: 'from-rose-500 to-rose-600' },
    { phase: '06', title: 'Rotation', icon: 'ri-refresh-line', desc: 'Rotation automatique avant expiration — génération d\'un nouveau refresh token, mise à jour de social_api_tokens, vérification post-rotation.', color: 'from-indigo-500 to-indigo-600' },
    { phase: '07', title: 'Révocation', icon: 'ri-close-circle-line', desc: 'Révocation sécurisée en cas de compromission — invalidation côté LinkedIn, suppression de la DB, activation du fallback mock, alerte sécurité.', color: 'from-red-500 to-red-600' },
  ],
};

// CURRENT STATE DIAGNOSTIC
export const currentStateDiagnostic = {
  title: 'État Actuel — Diagnostic Temps Réel',
  description: 'Analyse de l\'état actuel de l\'intégration LinkedIn API au 13 juin 2026. Token OAuth 2.0 actif, 4 scopes disponibles, profil fondateur en live, page entreprise en mock enrichi.',
  components: [
    {
      name: 'LinkedIn Access Token',
      status: 'live',
      statusColor: 'text-emerald-600',
      statusBg: 'bg-emerald-50 border-emerald-200',
      icon: 'ri-check-double-line',
      details: [
        { label: 'Statut', value: 'Actif ✅', color: 'text-emerald-600' },
        { label: 'Expiration', value: '18 août 2026 (65 jours)', color: 'text-amber-600' },
        { label: 'Scopes', value: 'email, openid, profile, w_member_social', color: 'text-sky-600' },
        { label: 'Stockage', value: 'social_api_tokens (RLS)', color: 'text-emerald-600' },
        { label: 'Refresh Token', value: 'Disponible', color: 'text-emerald-600' },
      ],
    },
    {
      name: 'Profil Fondateur (/v2/me)',
      status: 'live',
      statusColor: 'text-emerald-600',
      statusBg: 'bg-emerald-50 border-emerald-200',
      icon: 'ri-user-star-line',
      details: [
        { label: 'Endpoint', value: '/v2/me + /v2/userinfo', color: 'text-emerald-600' },
        { label: 'Statut', value: '🟢 Live — Fonctionnel', color: 'text-emerald-600' },
        { label: 'Scope requis', value: 'profile, openid, email', color: 'text-emerald-600' },
        { label: 'Données', value: 'Nom, photo, headline, email', color: 'text-emerald-600' },
        { label: 'Fiabilité', value: '100% — Aucun échec', color: 'text-emerald-600' },
      ],
    },
    {
      name: 'Page Entreprise KHEPRA',
      status: 'blocked',
      statusColor: 'text-amber-600',
      statusBg: 'bg-amber-50 border-amber-200',
      icon: 'ri-building-line',
      details: [
        { label: 'Endpoint', value: '/v2/organizations/{id}', color: 'text-rose-600' },
        { label: 'Statut', value: '🟡 Mock Enrichi', color: 'text-amber-600' },
        { label: 'Erreur', value: '403 — Scope manquant', color: 'text-rose-600' },
        { label: 'Scope requis', value: 'r_organization_social', color: 'text-rose-600' },
        { label: 'Solution', value: 'MDP ou scope additionnel', color: 'text-amber-600' },
      ],
    },
    {
      name: 'Organizational Share Stats',
      status: 'blocked',
      statusColor: 'text-amber-600',
      statusBg: 'bg-amber-50 border-amber-200',
      icon: 'ri-bar-chart-line',
      details: [
        { label: 'Endpoint', value: '/v2/organizationalEntityShareStatistics', color: 'text-rose-600' },
        { label: 'Statut', value: '🟡 Mock Enrichi', color: 'text-amber-600' },
        { label: 'Erreur', value: '403 — Scope manquant', color: 'text-rose-600' },
        { label: 'Scope requis', value: 'r_organization_social', color: 'text-rose-600' },
        { label: 'Impact', value: 'Métriques d\'engagement indisponibles', color: 'text-amber-600' },
      ],
    },
  ],
  summary: '✅ 50% de la connectivité LinkedIn en mode Live (profil fondateur OK). ⚠️ 50% en mode Mock Enrichi (page entreprise, statistiques). Feuille de route d\'upgrade prête. Action prioritaire : candidature MDP LinkedIn.',
};

// TECH STACK
export const linkedInAPITechStack = {
  title: 'Stack Technique — LinkedIn API Integration Engine',
  items: [
    { category: 'OAuth & Auth', icon: 'ri-key-2-line', technologies: ['OAuth 2.0 3-Legged Flow', 'Refresh Token Rotation', 'Supabase Edge Secrets', 'social_api_tokens (RLS)', 'Service Role Key'] },
    { category: 'API Gateway', icon: 'ri-plug-line', technologies: ['Supabase Edge Functions', 'LinkedIn REST API v2', 'LinkedIn OIDC', 'Rate Limit Handler', 'Circuit Breaker'] },
    { category: 'Monitoring', icon: 'ri-pulse-line', technologies: ['Token Health Check (cron)', 'Expiration Alerts (J-30 à J-1)', 'Error Rate Tracking', 'Latency Monitoring', 'SLA Dashboard'] },
    { category: 'Fallback', icon: 'ri-git-branch-line', technologies: ['Hybrid Mode Engine', 'Mock Data Enrichment', 'Graceful Degradation', 'Source Transparency Badges'] },
    { category: 'Security', icon: 'ri-shield-check-line', technologies: ['RLS on social_api_tokens', 'Service Role Isolation', 'Edge Secrets Encryption', 'Audit Logging', 'Incident Response'] },
    { category: 'Dev Tools', icon: 'ri-code-s-slash-line', technologies: ['LinkedIn Dev Portal', 'API Playground', 'Scope Simulator', 'Postman Collections', 'CLI Token Manager'] },
  ],
};

// SAFE OPERATIONS
export const linkedInAPISafeOps = [
  { title: 'Aucun token n\'est jamais exposé côté client', icon: 'ri-lock-line', desc: 'Tous les tokens sont exclusivement manipulés par les Edge Functions avec le service role key. Le front-end ne reçoit que les données transformées.' },
  { title: 'Rotation automatique obligatoire', icon: 'ri-refresh-line', desc: 'Les tokens sont renouvelés automatiquement 7 jours avant expiration. Un échec de rotation déclenche une alerte critique immédiate.' },
  { title: 'Fallback automatique sans interruption de service', icon: 'ri-git-branch-line', desc: 'Si un endpoint live devient indisponible, le système bascule instantanément vers mock enrichi sans impact utilisateur visible.' },
  { title: 'Journalisation complète de tous les appels API', icon: 'ri-file-history-line', desc: 'Chaque appel à l\'API LinkedIn est journalisé — timestamp, endpoint, statut, latence, erreur éventuelle. Piste d\'audit complète.' },
  { title: 'Circuit breaker par endpoint', icon: 'ri-shield-flash-line', desc: 'Si un endpoint échoue > 5 fois en 5 minutes, il est automatiquement mis en circuit breaker et le fallback mock est activé.' },
];

export const linkedInAPISafeOpsProtocol = 'Détecter → Diagnostiquer → Fallback → Notifier → Corriger → Valider → Rétablir → Documenter';

// AUTOMATED ACTIONS
export const linkedInAPIAutomatedActions = {
  title: 'Actions Automatisées — Ce que l\'agent exécute en autonomie',
  categories: [
    {
      id: 'diagnostic',
      title: 'Diagnostic Automatique',
      icon: 'ri-search-eye-line',
      color: 'from-sky-500 to-sky-600',
      actions: [
        'Scan quotidien de la validité de tous les tokens (J-30 à J-1 avant expiration)',
        'Vérification automatique des scopes disponibles vs endpoint accessibility matrix',
        'Détection des erreurs 401/403 et classification par cause (expiration, scope, révocation)',
        'Génération hebdomadaire du Token Health Report avec recommandations priorisées',
        'Comparaison automatique des données live vs mock pour détection de dérive',
      ],
    },
    {
      id: 'maintenance',
      title: 'Maintenance Préventive',
      icon: 'ri-tools-line',
      color: 'from-violet-500 to-violet-600',
      actions: [
        'Rotation automatique des tokens 7 jours avant expiration (avec fallback si échec)',
        'Nettoyage automatique des tokens expirés ou révoqués de social_api_tokens',
        'Mise à jour automatique des Edge Functions quand un nouveau token est disponible',
        'Rafraîchissement périodique de la documentation d\'intégration basée sur l\'état réel',
        'Test automatique des nouveaux endpoints dès qu\'un scope additionnel est détecté',
      ],
    },
    {
      id: 'alerting',
      title: 'Alertes & Notifications',
      icon: 'ri-alarm-warning-line',
      color: 'from-amber-500 to-amber-600',
      actions: [
        'Alerte J-30, J-14, J-7, J-1 avant expiration de chaque token',
        'Notification immédiate en cas d\'erreur 401/403 sur un endpoint critique',
        'Alerte quand un scope précédemment disponible devient indisponible (scope drift)',
        'Rapport hebdomadaire de santé des connexions API envoyé automatiquement',
        'Détection et alerte sur les anomalies de rate limit (approche des quotas)',
      ],
    },
    {
      id: 'documentation',
      title: 'Documentation Continue',
      icon: 'ri-article-line',
      color: 'from-emerald-500 to-emerald-600',
      actions: [
        'Génération automatique du dossier de candidature MDP LinkedIn',
        'Mise à jour continue de la matrice de couverture des endpoints',
        'Documentation automatique des procédures de résolution d\'incidents',
        'Capitalisation des leçons apprises à chaque résolution d\'incident API',
        'Mise à jour du guide d\'onboarding pour les nouveaux développeurs',
      ],
    },
  ],
};

// CONCLUSION
export const linkedInAPIConclusion = {
  title: 'LinkedIn API Integration & Social Connectivity Engine™ — Le Diplomate API KOS',
  body: 'Cet agent est le gardien de la connectivité sociale KOS — celui qui négocie avec les APIs des plateformes, qui audite chaque scope, qui prépare les dossiers de candidature, qui surveille la santé des tokens 24/7, et qui garantit que chaque canal social est aussi proche que possible du 100% live. Il ne se contente pas de constater les gaps — il les résout, méthodiquement, étape par étape, avec la rigueur d\'un auditeur Big Four et la ténacité d\'un diplomate.',
  pillars: [
    { label: 'Audit Continu', icon: 'ri-search-eye-line', desc: 'Scan permanent de la santé des tokens — validité, scopes, expiration, erreurs, rate limits' },
    { label: 'Upgrade Orchestrator', icon: 'ri-rocket-line', desc: 'Pilotage de la feuille de route d\'upgrade — MDP, scopes additionnels, business verification' },
    { label: 'Hybrid Mode Intelligence', icon: 'ri-git-branch-line', desc: 'Fusion intelligente live+mock — transparence, enrichissement, dégradation gracieuse' },
    { label: 'Security Guardian', icon: 'ri-shield-check-line', desc: 'Protection des credentials — stockage sécurisé, rotation automatique, zéro exposition client' },
    { label: 'Documentation Engine', icon: 'ri-article-line', desc: 'Production continue de la documentation — candidatures, rapports, procédures, capitalisation' },
  ],
  finalStatement: 'L\'agent qui transforme les « API keys not configured » en « All systems live ». Le diplomate qui obtient les permissions que les autres agents attendent.',
};

// QUICK STATUS CARD
export const quickStatusCards = [
  { label: 'Token LinkedIn', status: '🟢 Actif', detail: 'Expire 18/08/2026', icon: 'ri-key-2-line', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Profil Fondateur', status: '🟢 Live', detail: '/v2/me OK', icon: 'ri-user-star-line', color: 'from-emerald-500 to-emerald-600' },
  { label: 'Page Entreprise', status: '🟡 Mock', detail: 'MDP requis', icon: 'ri-building-line', color: 'from-amber-500 to-amber-600' },
  { label: 'MDP Application', status: '📋 En cours', detail: 'Étape 2/6', icon: 'ri-file-list-3-line', color: 'from-violet-500 to-violet-600' },
  { label: 'Rotation Auto', status: '⚙️ Activée', detail: 'J-7 avant expiration', icon: 'ri-refresh-line', color: 'from-sky-500 to-sky-600' },
  { label: 'Sécurité', status: '🔒 Conforme', detail: 'Zéro fuite', icon: 'ri-shield-check-line', color: 'from-emerald-500 to-emerald-600' },
];