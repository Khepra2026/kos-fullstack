// KOS AUTO-DEV + SECURE AUTO-DEPLOY ENGINE™ — Zero-Downtime DevOps System

export const devOpsIntro = {
  title: 'Auto-Dev + Secure Auto-Deploy Engine™',
  subtitle: 'Zero-Downtime DevOps System — Senior SWE · DevOps SRE · QA Automation · Security · Release Manager',
  version: 'VERSION PRODUCTION — CONTINUOUS AUTO-DEV + AUTO-DEPLOY · ZERO DOWNTIME',
  role: 'KOS Autonomous DevOps Engine™ — système d\'ingénierie logicielle autonome combinant Senior Software Engineer, DevOps SRE, QA Automation Engineer, Security Engineer et Release Manager. Sa mission : transformer le système KOS et la plateforme cible en un système auto-développé et auto-déployé, sécurisé, testé et monitoré en continu.',
  tagline: 'Le DevOps qui ne dort jamais — code, test, déploie et rollback automatiquement, sans downtime, 24/7.',
  objective: 'Transformer le système KOS en Autonomous Software Factory : self-healing production system, zero-downtime deployment engine, secure AI DevOps platform, Big Four-grade engineering system.',
};

export interface PipelineStep {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  items: { name: string; icon: string; desc: string }[];
  note?: string;
}

export const pipelineSteps: PipelineStep[] = [
  {
    id: 'detect-need',
    step: '01',
    title: 'DETECT NEED',
    subtitle: 'STEP 1 — DÉTECTION',
    icon: 'ri-radar-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Le système scanne en continu les signaux — bugs remontés, métriques de performance, feedback utilisateur, dette technique accumulée, et demandes fonctionnelles — pour identifier automatiquement ce qui doit être corrigé ou amélioré.',
    items: [
      { name: 'Bug detection', icon: 'ri-bug-line', desc: 'Capture automatique des erreurs JS, API failures, anomalies UX et régressions visuelles' },
      { name: 'Amélioration UX', icon: 'ri-user-heart-line', desc: 'Détection des points de friction utilisateur via heatmaps, taux de rebond et durée de session' },
      { name: 'Optimisation performance', icon: 'ri-speed-up-line', desc: 'Surveillance continue des Core Web Vitals — LCP, INP, CLS — avec alertes automatiques' },
      { name: 'Demande fonctionnelle', icon: 'ri-lightbulb-line', desc: 'Analyse des demandes utilisateurs et identification des patterns récurrents' },
      { name: 'Dette technique', icon: 'ri-braces-line', desc: 'Détection proactive du code obsolète, des dépendances dépréciées et des patterns anti-performants' },
    ],
    note: 'Toute détection est horodatée, catégorisée et injectée dans le backlog de développement automatique.',
  },
  {
    id: 'generate-solution',
    step: '02',
    title: 'GENERATE SOLUTION',
    subtitle: 'STEP 2 — AI DEV',
    icon: 'ri-code-s-slash-line',
    color: 'from-violet-500 to-violet-600',
    description: 'L\'AI Dev Engine génère automatiquement la solution la plus appropriée : code patch pour les bugs, refactor complet pour la dette technique, nouvelle feature pour les demandes fonctionnelles, ou optimisation algorithmique. Le principe est le diff-first design — toujours l\'impact minimal.',
    items: [
      { name: 'Code patch', icon: 'ri-sticky-note-line', desc: 'Correction ciblée avec le minimum de lignes modifiées — diff minimal, impact contrôlé' },
      { name: 'Refactor complet', icon: 'ri-tools-line', desc: 'Restructuration du code pour éliminer la dette technique tout en préservant le comportement' },
      { name: 'Nouvelle feature', icon: 'ri-add-circle-line', desc: 'Génération de fonctionnalités complètes avec tests, documentation et configuration' },
      { name: 'Optimisation algorithmique', icon: 'ri-rocket-line', desc: 'Remplacement des algorithmes sous-optimaux par des versions plus performantes' },
    ],
    note: 'Toujours minimal impact change — le diff-first design garantit que chaque modification est la plus petite possible pour résoudre le problème.',
  },
  {
    id: 'static-validation',
    step: '03',
    title: 'STATIC VALIDATION',
    subtitle: 'STEP 3 — VALIDATION STATIQUE',
    icon: 'ri-shield-check-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Avant toute exécution, le code généré est soumis à une batterie de validations statiques : analyse syntaxique, détection des breaking changes, vérification de compatibilité des dépendances, scan de sécurité OWASP, et revue logique automatisée.',
    items: [
      { name: 'Analyse syntaxique', icon: 'ri-braces-line', desc: 'Validation TypeScript/ESLint — aucune erreur de compilation tolérée' },
      { name: 'Détection breaking changes', icon: 'ri-error-warning-line', desc: 'Analyse des signatures de fonctions, des props de composants et des APIs exposées' },
      { name: 'Compatibilité dépendances', icon: 'ri-puzzle-line', desc: 'Vérification que les nouvelles dépendances n\'entrent pas en conflit avec l\'existant' },
      { name: 'Scan sécurité OWASP', icon: 'ri-lock-line', desc: 'Analyse des 10 risques OWASP — injection, XSS, authentification, exposition de données' },
      { name: 'Revue logique', icon: 'ri-brain-line', desc: 'Analyse de la logique métier — le code fait-il vraiment ce qui est attendu ?' },
    ],
  },
  {
    id: 'testing-layer',
    step: '04',
    title: 'TESTING LAYER',
    subtitle: 'STEP 4 — TESTS AUTOMATISÉS',
    icon: 'ri-test-tube-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Batterie complète de tests automatiques : unitaires, intégration, UI, performance et régression. Si un seul test échoue, le pipeline retourne à l\'étape 2 pour correction. Aucun code ne passe cette étape sans 100% de succès.',
    items: [
      { name: 'Unit tests', icon: 'ri-checkbox-circle-line', desc: 'Tests unitaires sur chaque fonction et composant — couverture minimale 90%' },
      { name: 'Integration tests', icon: 'ri-git-branch-line', desc: 'Tests d\'intégration entre composants, APIs et services externes' },
      { name: 'UI tests', icon: 'ri-layout-line', desc: 'Tests visuels et fonctionnels de l\'interface utilisateur — desktop et mobile' },
      { name: 'Performance tests', icon: 'ri-speed-up-line', desc: 'Tests de charge, de stress et de régression de performance — aucun ralentissement toléré' },
      { name: 'Regression tests', icon: 'ri-rewind-line', desc: 'Tests de non-régression sur l\'ensemble des fonctionnalités existantes' },
    ],
    note: 'Si échec → retour automatique à STEP 2 pour correction. Le pipeline ne progresse jamais avec un test rouge.',
  },
  {
    id: 'staging-deployment',
    step: '05',
    title: 'STAGING DEPLOYMENT',
    subtitle: 'STEP 5 — DÉPLOIEMENT STAGING',
    icon: 'ri-server-line',
    color: 'from-indigo-500 to-indigo-600',
    description: 'Déploiement en environnement staging isolé avec simulation de trafic, monitoring des erreurs et validation UX. Le staging est un clone exact de la production — mêmes données (anonymisées), même configuration, même échelle.',
    items: [
      { name: 'Sandbox isolé', icon: 'ri-box-3-line', desc: 'Environnement complètement isolé de la production — zéro risque de contamination' },
      { name: 'Simulation trafic', icon: 'ri-traffic-light-line', desc: 'Génération de trafic synthétique reproduisant les patterns d\'utilisation réels' },
      { name: 'Monitoring erreurs', icon: 'ri-pulse-line', desc: 'Surveillance en temps réel des erreurs, des timeouts et des anomalies' },
      { name: 'Validation UX', icon: 'ri-user-heart-line', desc: 'Vérification que l\'expérience utilisateur n\'est pas dégradée par le changement' },
    ],
  },
  {
    id: 'auto-approval',
    step: '06',
    title: 'AUTO APPROVAL ENGINE',
    subtitle: 'STEP 6 — APPROBATION AUTOMATIQUE',
    icon: 'ri-check-double-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Décision automatique basée sur les résultats des étapes précédentes. Trois verdicts possibles : SAFE DEPLOY (déploiement automatique), CONDITIONAL DEPLOY (déploiement partiel avec feature flag), ou BLOCKED (blocage avec rapport d\'erreur).',
    items: [
      { name: '🟢 SAFE DEPLOY', icon: 'ri-checkbox-circle-fill', desc: 'Aucun bug critique, performance stable, tous les tests OK — déploiement automatique immédiat' },
      { name: '🟡 CONDITIONAL DEPLOY', icon: 'ri-alert-line', desc: 'Déploiement partiel avec feature flag activé, rollback ready — validation progressive' },
      { name: '🔴 BLOCKED', icon: 'ri-close-circle-fill', desc: 'Erreurs détectées, sécurité non conforme, performance dégradée — blocage avec rapport détaillé' },
    ],
  },
  {
    id: 'production-deploy',
    step: '07',
    title: 'PRODUCTION DEPLOY',
    subtitle: 'STEP 7 — DÉPLOIEMENT ZERO DOWNTIME',
    icon: 'ri-rocket-2-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Déploiement en production avec stratégie zero-downtime : blue/green deployment ou canary release. Rollout progressif (5% → 25% → 100%) avec monitoring temps réel. Si une anomalie est détectée, rollback automatique en moins de 30 secondes.',
    items: [
      { name: 'Blue/Green Deployment', icon: 'ri-contrast-2-line', desc: 'Deux environnements identiques — basculement instantané du trafic sans interruption' },
      { name: 'Canary Release', icon: 'ri-flight-takeoff-line', desc: 'Déploiement progressif par paliers — 5%, 25%, 50%, 100% du trafic' },
      { name: 'Rollout progressif', icon: 'ri-line-chart-line', desc: 'Augmentation graduelle du trafic avec validation à chaque palier' },
      { name: 'Monitoring temps réel', icon: 'ri-pulse-line', desc: 'Surveillance continue des métriques pendant le rollout — alerte immédiate si anomalie' },
    ],
    note: 'Rollback instantané disponible à chaque palier. Si une anomalie est détectée, retour à la version précédente en < 30 secondes.',
  },
  {
    id: 'post-deploy-monitoring',
    step: '08',
    title: 'POST-DEPLOY MONITORING',
    subtitle: 'STEP 8 — SURVEILLANCE POST-DÉPLOIEMENT',
    icon: 'ri-pulse-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Pendant 24 à 72 heures après le déploiement, le système surveille en continu : le taux d\'erreur, les performances, le comportement utilisateur et les logs. Cette période de quarantaine garantit qu\'aucune régression silencieuse ne passe inaperçue.',
    items: [
      { name: 'Error rate monitoring', icon: 'ri-error-warning-line', desc: 'Surveillance du taux d\'erreur — seuil d\'alerte à 0.5%, rollback auto à 1%' },
      { name: 'Performance tracking', icon: 'ri-speed-up-line', desc: 'Comparaison continue des Core Web Vitals vs baseline pré-déploiement' },
      { name: 'User behavior analysis', icon: 'ri-user-line', desc: 'Analyse des parcours utilisateurs pour détecter les changements de comportement' },
      { name: 'Logs inspection', icon: 'ri-file-search-line', desc: 'Analyse automatisée des logs pour détecter les patterns d\'erreur émergents' },
    ],
  },
  {
    id: 'auto-rollback',
    step: '09',
    title: 'AUTO ROLLBACK ENGINE',
    subtitle: 'STEP 9 — ROLLBACK INTELLIGENT',
    icon: 'ri-rewind-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Si une anomalie est détectée pendant la phase de monitoring, le rollback est déclenché automatiquement : restauration de la version précédente en moins de 30 secondes, log automatique de l\'incident, et root cause analysis pour éviter la répétition.',
    items: [
      { name: 'Rollback instantané', icon: 'ri-timer-flash-line', desc: 'Restauration de la version précédente en moins de 30 secondes — zéro downtime additionnel' },
      { name: 'Restauration version précédente', icon: 'ri-history-line', desc: 'Basculement vers le dernier snapshot stable — toutes les données préservées' },
      { name: 'Incident log automatique', icon: 'ri-article-line', desc: 'Documentation automatique de l\'incident — timestamp, cause, impact, durée' },
      { name: 'Root cause analysis', icon: 'ri-search-eye-line', desc: 'Analyse automatisée de la cause racine pour éviter la répétition du même incident' },
    ],
  },
];

export interface IntelligenceLayer {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  capabilities: { name: string; icon: string; desc: string }[];
}

export const intelligenceLayers: IntelligenceLayer[] = [
  {
    id: 'code-optimization',
    title: 'A. Code Optimization AI',
    icon: 'ri-code-s-slash-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Analyse et optimisation automatique du code source : refactor intelligent, suppression du code mort, optimisation algorithmique et simplification logique. L\'IA identifie les patterns anti-performants et propose des alternatives plus efficaces.',
    capabilities: [
      { name: 'Refactor automatique', icon: 'ri-tools-line', desc: 'Restructuration du code pour améliorer la lisibilité, la maintenabilité et les performances' },
      { name: 'Suppression code mort', icon: 'ri-delete-back-2-line', desc: 'Détection et élimination du code inutilisé — imports, fonctions, variables jamais appelées' },
      { name: 'Optimisation algorithmique', icon: 'ri-function-line', desc: 'Remplacement des algorithmes O(n²) par O(n log n) ou mieux quand c\'est possible' },
      { name: 'Simplification logique', icon: 'ri-braces-line', desc: 'Réduction de la complexité cyclomatique — code plus simple, plus testable, plus fiable' },
    ],
  },
  {
    id: 'feature-generator',
    title: 'B. Feature Generator AI',
    icon: 'ri-add-circle-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Génération automatique de nouvelles fonctionnalités : modules complets, endpoints API, composants UI et scripts d\'automatisation. Chaque feature est générée avec ses tests, sa documentation et sa configuration de déploiement.',
    capabilities: [
      { name: 'Création modules', icon: 'ri-stack-line', desc: 'Génération de modules complets avec architecture propre, types, et interfaces' },
      { name: 'Génération API endpoints', icon: 'ri-plug-line', desc: 'Création d\'endpoints REST/GraphQL avec validation, gestion d\'erreurs et documentation' },
      { name: 'UI components', icon: 'ri-layout-line', desc: 'Génération de composants React réutilisables avec Tailwind, états de chargement et d\'erreur' },
      { name: 'Automation scripts', icon: 'ri-terminal-line', desc: 'Scripts d\'automatisation pour le build, le déploiement, les tests et la maintenance' },
    ],
  },
  {
    id: 'tech-debt-cleaner',
    title: 'C. Technical Debt Cleaner',
    icon: 'ri-delete-back-2-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Détection et élimination proactive de la dette technique : code dupliqué, complexité excessive, dépendances obsolètes et patterns dépréciés. La dette technique est quantifiée, priorisée et résolue automatiquement.',
    capabilities: [
      { name: 'Détection duplication code', icon: 'ri-file-copy-line', desc: 'Identification des blocs de code dupliqués et refactor en composants/fonctions partagés' },
      { name: 'Réduction complexité', icon: 'ri-bar-chart-line', desc: 'Ciblage des fonctions à haute complexité cyclomatique et simplification itérative' },
      { name: 'Modernisation stack', icon: 'ri-arrow-up-circle-line', desc: 'Mise à jour automatique des dépendances avec tests de compatibilité' },
    ],
  },
  {
    id: 'security-guardian',
    title: 'D. Security Guardian AI',
    icon: 'ri-shield-flash-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Scanner de vulnérabilités continu : détection d\'injection, validation d\'authentification, analyse des risques de dépendances et audit de sécurité automatisé. Chaque vulnérabilité est classifiée, priorisée et patchée automatiquement.',
    capabilities: [
      { name: 'Scan vulnérabilités', icon: 'ri-radar-line', desc: 'Scan continu des vulnérabilités connues — CVE, OWASP Top 10, SANS Top 25' },
      { name: 'Injection detection', icon: 'ri-syringe-line', desc: 'Détection des failles d\'injection SQL, XSS, CSRF, command injection' },
      { name: 'Auth validation', icon: 'ri-lock-line', desc: 'Vérification des flux d\'authentification — tokens, sessions, permissions, rôles' },
      { name: 'Dependency risk analysis', icon: 'ri-puzzle-line', desc: 'Analyse des dépendances — vulnérabilités connues, licences, maintenance, popularité' },
    ],
  },
];

export interface DevOpsKpi {
  label: string;
  value: string;
  color: string;
  icon: string;
  desc: string;
  subMetrics: { name: string; target: string }[];
}

export const devOpsKpis: DevOpsKpi[] = [
  {
    label: 'Delivery Performance',
    value: '99.5%',
    color: 'from-sky-500 to-sky-600',
    icon: 'ri-rocket-2-line',
    desc: 'Performance de livraison — fréquence, rapidité et fiabilité des déploiements en production.',
    subMetrics: [
      { name: 'Fréquence de déploiement', target: 'Multiple par jour' },
      { name: 'Lead time change', target: '< 2 heures' },
      { name: 'Time-to-fix', target: '< 30 minutes' },
      { name: 'Change failure rate', target: '< 1%' },
    ],
  },
  {
    label: 'System Stability',
    value: '99.99%',
    color: 'from-emerald-500 to-emerald-600',
    icon: 'ri-shield-check-line',
    desc: 'Stabilité système — disponibilité, taux de crash, taux de rollback et temps de récupération.',
    subMetrics: [
      { name: 'Crash rate', target: '< 0.01%' },
      { name: 'Rollback rate', target: '< 0.5%' },
      { name: 'Uptime', target: '≥ 99.99%' },
      { name: 'MTTR', target: '< 5 minutes' },
    ],
  },
  {
    label: 'Engineering Efficiency',
    value: '94/100',
    color: 'from-violet-500 to-violet-600',
    icon: 'ri-robot-2-line',
    desc: 'Efficacité de l\'ingénierie — niveau d\'automatisation du développement, de la correction et des tests.',
    subMetrics: [
      { name: '% code auto-généré', target: '≥ 60%' },
      { name: '% bugs auto-fixés', target: '≥ 90%' },
      { name: 'Dev time saved', target: '≥ 70%' },
      { name: 'Test coverage auto', target: '≥ 90%' },
    ],
  },
  {
    label: 'Security Compliance',
    value: '98/100',
    color: 'from-rose-500 to-rose-600',
    icon: 'ri-lock-line',
    desc: 'Conformité sécurité — détection, classification et résolution des vulnérabilités.',
    subMetrics: [
      { name: 'Vulnérabilités détectées', target: '100% des CVE connues' },
      { name: 'Patch time', target: '< 24h (critique), < 7j (haute)' },
      { name: 'Risk score global', target: '< 5/100' },
      { name: 'OWASP compliance', target: '100%' },
    ],
  },
];

export interface SafeDeployRule {
  title: string;
  icon: string;
  desc: string;
}

export const safeDeployRules: SafeDeployRule[] = [
  { title: 'Zero direct production write', icon: 'ri-forbid-line', desc: 'Aucune modification directe en production. Tout changement passe par le pipeline CI/CD complet.' },
  { title: 'Staging mandatory first', icon: 'ri-server-line', desc: 'Le staging est obligatoire avant toute promotion en production. Aucune exception.' },
  { title: 'Rollback always available', icon: 'ri-rewind-line', desc: 'Un plan de rollback est généré pour chaque déploiement. Restauration garantie en < 30 secondes.' },
  { title: 'Diff-based deployment only', icon: 'ri-git-branch-line', desc: 'Seul le delta (diff) est déployé — jamais l\'intégralité de l\'application.' },
  { title: 'No destructive overwrite', icon: 'ri-shield-flash-line', desc: 'Aucun écrasement destructif sans backup préalable. Le rollback doit toujours être possible.' },
];

export interface ImprovementStep {
  step: string;
  label: string;
  icon: string;
  desc: string;
}

export const improvementLoop: ImprovementStep[] = [
  { step: '01', label: 'SCAN CODEBASE + LOGS', icon: 'ri-radar-line', desc: 'Scan complet du code source, des logs d\'erreur, des métriques de performance et des signaux utilisateur' },
  { step: '02', label: 'DETECT ISSUE / OPPORTUNITY', icon: 'ri-search-eye-line', desc: 'Identification des anomalies et des opportunités d\'amélioration — bugs, perf, UX, sécurité' },
  { step: '03', label: 'GENERATE FIX OR FEATURE', icon: 'ri-code-s-slash-line', desc: 'Génération automatique du correctif ou de la nouvelle fonctionnalité par l\'AI Dev Engine' },
  { step: '04', label: 'TEST & VALIDATE', icon: 'ri-test-tube-line', desc: 'Batterie complète de tests — unitaires, intégration, UI, performance, sécurité' },
  { step: '05', label: 'DEPLOY SAFELY', icon: 'ri-rocket-line', desc: 'Déploiement progressif avec canary release ou blue/green — zero downtime garanti' },
  { step: '06', label: 'MONITOR IMPACT', icon: 'ri-pulse-line', desc: 'Surveillance post-déploiement 24-72h avec rollback automatique si anomalie' },
  { step: '07', label: 'LEARN & IMPROVE RULES', icon: 'ri-brain-line', desc: 'Apprentissage continu — les patterns de succès et d\'échec enrichissent les règles du système' },
];

export interface DeploymentStack {
  category: string;
  icon: string;
  items: string[];
}

export const deploymentStack: DeploymentStack[] = [
  { category: 'GitOps', icon: 'ri-git-branch-line', items: ['GitHub', 'GitLab', 'ArgoCD', 'FluxCD'] },
  { category: 'CI/CD', icon: 'ri-loop-left-line', items: ['GitHub Actions', 'Jenkins', 'CircleCI', 'GitLab CI'] },
  { category: 'Containers', icon: 'ri-box-3-line', items: ['Docker', 'Kubernetes', 'Helm', 'Istio'] },
  { category: 'Serverless', icon: 'ri-cloud-line', items: ['Vercel', 'AWS Lambda', 'Cloudflare Workers', 'Netlify'] },
  { category: 'Feature Flags', icon: 'ri-toggle-line', items: ['LaunchDarkly', 'Flagsmith', 'Unleash', 'GrowthBook'] },
  { category: 'Monitoring', icon: 'ri-pulse-line', items: ['Sentry', 'Datadog', 'Grafana', 'OpenTelemetry'] },
];

export interface OutputItem {
  step: string;
  label: string;
  icon: string;
  desc: string;
}

export const outputItems: OutputItem[] = [
  { step: '01', label: 'Change Summary', icon: 'ri-file-list-3-line', desc: 'Résumé du changement — type (bug fix, feature, refactor, optimization), impact attendu et justification' },
  { step: '02', label: 'Code / Fix proposé', icon: 'ri-code-s-slash-line', desc: 'Diff complet du code modifié avec explication ligne par ligne des changements' },
  { step: '03', label: 'Test results', icon: 'ri-check-double-line', desc: 'Résultats complets de la batterie de tests — succès, échecs, couverture, régressions' },
  { step: '04', label: 'Deployment decision', icon: 'ri-scales-line', desc: 'Décision de déploiement — SAFE / CONDITIONAL / BLOCKED — avec justification détaillée' },
  { step: '05', label: 'Rollback plan', icon: 'ri-rewind-line', desc: 'Plan de rollback documenté — étapes, durée estimée, impact potentiel' },
  { step: '06', label: 'KPI impact estimé', icon: 'ri-bar-chart-grouped-line', desc: 'Projection de l\'impact sur les 4 KPI DevOps — Delivery, Stability, Efficiency, Security' },
  { step: '07', label: 'Next improvement cycle', icon: 'ri-calendar-check-line', desc: 'Recommandation pour le prochain cycle d\'amélioration — priorité et justification' },
];

export const devOpsConclusion = {
  title: 'Autonomous DevOps Engine™',
  body: 'Ce moteur est le système nerveux central de l\'écosystème KOS — celui qui garantit que chaque ligne de code, chaque déploiement, chaque rollback est exécuté avec la précision d\'un ingénieur Big Four, 24 heures sur 24, 7 jours sur 7, sans jamais fatiguer, sans jamais se tromper, sans jamais créer de downtime.',
  pillars: [
    { label: 'Autonomous Software Factory', icon: 'ri-robot-2-line', desc: 'Code généré, testé et déployé sans intervention humaine' },
    { label: 'Self-Healing Production', icon: 'ri-heart-pulse-line', desc: 'Détection et correction automatique des anomalies en production' },
    { label: 'Zero-Downtime Deployment', icon: 'ri-rocket-2-line', desc: 'Déploiements sans interruption — blue/green, canary, rollback < 30s' },
    { label: 'Secure AI DevOps', icon: 'ri-shield-check-line', desc: 'Sécurité intégrée à chaque étape du pipeline' },
    { label: 'Big Four Engineering', icon: 'ri-building-2-line', desc: 'Standards d\'excellence McKinsey, BCG, Bain, Deloitte' },
  ],
  finalStatement: 'Le DevOps Engineer qui ne dort jamais — code, test, déploie, monitor et rollback automatiquement. La machine qui transforme KOS en Autonomous Software Factory™.',
};

// Ultra Mode (optional)
export const ultraMode = {
  title: '🔥 VERSION ULTRA — Activée',
  description: 'Lorsque le mode Ultra est activé, le système déploie des capacités avancées de niveau entreprise :',
  features: [
    { name: 'Multi-Agent Dev Team', icon: 'ri-team-line', desc: 'Escouade d\'agents IA développeurs spécialisés — frontend, backend, DevOps, QA, sécurité' },
    { name: 'Auto PR Generation', icon: 'ri-git-pull-request-line', desc: 'Génération automatique de Pull Requests sur GitHub avec description, tests et screenshots' },
    { name: 'Autonomous Code Review AI', icon: 'ri-file-search-line', desc: 'Revue de code IA autonome — détection des anti-patterns, suggestions d\'amélioration' },
    { name: 'Production Observability Dashboard', icon: 'ri-dashboard-line', desc: 'Dashboard temps réel de tous les signaux de production — chaque métrique, chaque alerte' },
    { name: 'Predictive Failure Prevention', icon: 'ri-psychotherapy-line', desc: 'Prédiction des défaillances avant qu\'elles ne surviennent — machine learning sur l\'historique des incidents' },
  ],
};