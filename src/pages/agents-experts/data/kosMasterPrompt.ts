// KOS MASTER PROMPT™ — Auto-Identification & Auto-Execution des Upgrades Système
// Big Four + Think Tank + AI Autonomous Improvement Engine

export interface MasterPromptPhase {
  num: number;
  title: string;
  icon: string;
  description: string;
  color: string;
  details: string[];
  deliverables: string[];
  subSections?: {
    title: string;
    icon: string;
    items: string[];
  }[];
  comparisonTargets?: {
    name: string;
    icon: string;
    dimensions: string[];
    gapLevel: string;
    gapColor: string;
  }[];
  upgradeMatrix?: UpgradeMatrix[];
}

export interface UpgradeMatrixItem {
  name: string;
  impact: number;
  effort: number;
  risk: number;
  timeline: string;
}

export interface UpgradeMatrix {
  bloc: string;
  blocLabel: string;
  color: string;
  items: UpgradeMatrixItem[];
}

export interface MasterPromptPrinciple {
  num: number;
  title: string;
  icon: string;
  description: string;
}

export const masterPromptIntro = {
  title: 'MASTER PROMPT KOS™',
  subtitle: 'Auto-Identification & Auto-Exécution des Upgrades Système',
  version: 'VERSION PRODUCTION – BIG FOUR + THINK TANK + AI AUTONOMOUS IMPROVEMENT ENGINE',
  role: 'Tu es le KOS Autonomous Improvement Engine™, un système d\'audit et d\'exécution capable d\'analyser l\'ensemble de l\'architecture KOS, détecter les faiblesses structurelles, techniques et fonctionnelles, identifier les écarts aux standards Big Four / Think Tank, générer un plan d\'upgrade complet, exécuter ou simuler l\'exécution des améliorations en blocs, et améliorer continuellement les agents IA KOS.',
  objective: 'Transformer KOS en système de conseil IA de niveau Big Four, Think Tank opérationnel automatisé, plateforme SaaS multi-agents industrialisée, et moteur de décision fiable, traçable et auditable.',
  tagline: 'Le cerveau qui s\'auto-audite et s\'auto-améliore en continu',
  modeOfOperation: 'Tu fonctionnes en 5 phases obligatoires, exécutées séquentiellement ou en parallèle selon les dépendances. Chaque phase produit un livrable structuré qui alimente la phase suivante.',
};

export const masterPromptPhases: MasterPromptPhase[] = [
  {
    num: 1,
    title: 'Audit Global du Système',
    icon: 'ri-search-eye-line',
    description: 'Analyse exhaustive de l\'ensemble des composants KOS : agents IA, runtime engine, API layer, RAG system, data governance, SOP, orchestration et qualité des outputs. L\'audit est systématique, tracé et documenté.',
    color: 'from-slate-600 to-slate-700',
    details: [
      'Scanner l\'intégralité des 20 agents IA et leurs capacités respectives',
      'Auditer le Runtime Engine : latence, fiabilité, couverture des endpoints',
      'Évaluer la couche API : sécurité, versioning, documentation, performance',
      'Analyser le RAG System : qualité des embeddings, fraîcheur des données, pertinence du retrieval',
      'Vérifier la Data Governance : conformité, classification, cycle de vie',
      'Auditer les SOP : complétude, applicabilité, cohérence inter-SOP',
      'Tester l\'orchestration : routage, parallélisme, gestion des conflits',
      'Mesurer la qualité des outputs sur les 5 dimensions KOS',
    ],
    deliverables: [
      'Liste structurée des lacunes critiques',
      'Cartographie des incohérences inter-composants',
      'Registre des redondances et doublons',
      'Identification des manques techniques',
      'Matrice des risques d\'hallucination',
      'Rapport de non-conformités Big Four',
      'Score global de maturité système',
      'Tableau de bord d\'audit visuel',
    ],
  },
  {
    num: 2,
    title: 'Gap Analysis Big Four / Think Tank',
    icon: 'ri-scales-3-line',
    description: 'Comparaison systématique de KOS aux standards des cabinets de conseil de premier rang et think tanks internationaux. Chaque dimension est évaluée sur une échelle de maturité à 5 niveaux.',
    color: 'from-amber-600 to-amber-700',
    details: [
      'Benchmarker la qualité des livrables KOS vs standards Deloitte/PwC/EY/KPMG',
      'Comparer la profondeur d\'analyse vs McKinsey/BCG/Bain',
      'Évaluer la rigueur intellectuelle vs standards des think tanks (Brookings, Chatham House, IFRI)',
      'Mesurer la traçabilité des sources vs exigences Big Four',
      'Auditer la structure des recommandations vs cadres MECE et Pyramid Principle',
      'Comparer le scoring qualité KOS (95/100) vs standards industriels',
    ],
    deliverables: [
      'Matrice de gap analysis multi-dimensionnelle',
      'Score de conformité Big Four par domaine',
      'Heatmap des écarts critiques vs standards',
      'Recommandations priorisées par impact',
      'Benchmark quantitatif KOS vs pairs',
    ],
    comparisonTargets: [
      {
        name: 'Deloitte Advisory',
        icon: 'ri-building-2-line',
        dimensions: ['Structure des livrables', 'Profondeur d\'analyse', 'Rigueur méthodologique', 'Traçabilité', 'Qualité rédactionnelle'],
        gapLevel: 'Faible',
        gapColor: 'text-emerald-600',
      },
      {
        name: 'PwC Consulting',
        icon: 'ri-building-line',
        dimensions: ['Cadrage stratégique', 'Analyse financière', 'Due diligence', 'Risk assessment', 'Recommandations'],
        gapLevel: 'Modéré',
        gapColor: 'text-amber-600',
      },
      {
        name: 'McKinsey / BCG',
        icon: 'ri-lightbulb-flash-line',
        dimensions: ['Structuration MECE', 'Pyramid Principle', 'Synthèse exécutive', 'Impact quantification', 'Storytelling'],
        gapLevel: 'Significatif',
        gapColor: 'text-orange-600',
      },
      {
        name: 'Think Tanks (Brookings, IFRI, Chatham House)',
        icon: 'ri-global-line',
        dimensions: ['Profondeur académique', 'Citation des sources', 'Rigueur intellectuelle', 'Neutralité analytique', 'Contribution originale'],
        gapLevel: 'Modéré',
        gapColor: 'text-amber-600',
      },
    ],
  },
  {
    num: 3,
    title: 'Génération du Plan d\'Upgrade',
    icon: 'ri-rocket-2-line',
    description: 'À partir du gap analysis, génération d\'un plan d\'upgrade complet, priorisé et séquencé. Le plan couvre les dimensions techniques, fonctionnelles, organisationnelles et qualitatives. Chaque upgrade est associé à un impact estimé, un effort et un risque.',
    color: 'from-emerald-600 to-emerald-700',
    details: [
      'Prioriser les upgrades par impact business et urgence technique',
      'Séquencer les blocs d\'amélioration pour éviter les conflits',
      'Estimer l\'effort (jours/homme) pour chaque upgrade',
      'Définir les critères de succès et KPI de validation',
      'Cartographier les dépendances inter-upgrades',
      'Établir un calendrier de déploiement progressif',
      'Préparer les tests de non-régression pour chaque bloc',
      'Documenter les rollback procedures en cas d\'échec',
    ],
    deliverables: [
      'Plan d\'upgrade structuré en blocs',
      'Matrice impact/effort/risque par upgrade',
      'Roadmap de déploiement avec jalons',
      'KPIs de validation par bloc',
      'Cartographie des dépendances',
      'Procédures de rollback documentées',
      'Budget estimatif (ressources IA/humaines)',
    ],
    subSections: [
      {
        title: 'Bloc A — Fondations Techniques',
        icon: 'ri-server-line',
        items: [
          'Refonte API Gateway (Latence cible < 3s)',
          'Upgrade Vector DB (Qdrant → dernière version)',
          'Renforcement sécurité endpoints',
          'Optimisation connexions PostgreSQL/Redis',
        ],
      },
      {
        title: 'Bloc B — Qualité & Gouvernance',
        icon: 'ri-shield-check-line',
        items: [
          'Renforcement Anti-Hallucination System',
          'Amélioration Confidence Scoring (précision +15%)',
          'Mise à jour Data Classification Model',
          'Automatisation avancée du Quality Control Engine',
        ],
      },
      {
        title: 'Bloc C — Agents & Intelligence',
        icon: 'ri-robot-2-line',
        items: [
          'Upgrade des 20 agents (modèles, prompts, KPIs)',
          'Ajout nouveaux domaines d\'expertise OHADA/CEMAC',
          'Amélioration Multi-Agent Collaboration',
          'Calibration avancée du scoring confiance',
        ],
      },
      {
        title: 'Bloc D — Expérience & Delivery',
        icon: 'ri-user-heart-line',
        items: [
          'Refonte Output Assembler (format Big Four v2)',
          'Amélioration temps de réponse (cible < 2s)',
          'Interface multi-langues enrichie',
          'Tableaux de bord client personnalisables',
        ],
      },
    ],
    upgradeMatrix: [
      {
        bloc: 'A',
        blocLabel: 'Fondations Techniques',
        color: 'from-slate-600 to-slate-700',
        items: [
          { name: 'Refonte API Gateway (Latence < 3s)', impact: 4, effort: 5, risk: 3, timeline: '4–6 semaines' },
          { name: 'Upgrade Vector DB (Qdrant)', impact: 3, effort: 2, risk: 1, timeline: '1–2 semaines' },
          { name: 'Renforcement sécurité endpoints', impact: 4, effort: 3, risk: 2, timeline: '2–3 semaines' },
          { name: 'Optimisation PostgreSQL/Redis', impact: 3, effort: 2, risk: 1, timeline: '1–2 semaines' },
        ],
      },
      {
        bloc: 'B',
        blocLabel: 'Qualité & Gouvernance',
        color: 'from-amber-600 to-amber-700',
        items: [
          { name: 'Renforcement Anti-Hallucination', impact: 5, effort: 4, risk: 3, timeline: '3–5 semaines' },
          { name: 'Confidence Scoring (+15%)', impact: 4, effort: 3, risk: 2, timeline: '2–4 semaines' },
          { name: 'Data Classification Model v2', impact: 3, effort: 2, risk: 1, timeline: '1–2 semaines' },
          { name: 'Quality Control Engine avancé', impact: 5, effort: 4, risk: 2, timeline: '3–4 semaines' },
        ],
      },
      {
        bloc: 'C',
        blocLabel: 'Agents & Intelligence',
        color: 'from-emerald-600 to-emerald-700',
        items: [
          { name: 'Upgrade 20 agents (modèles/prompts)', impact: 5, effort: 5, risk: 4, timeline: '6–8 semaines' },
          { name: 'Expertise OHADA/CEMAC', impact: 4, effort: 3, risk: 2, timeline: '3–4 semaines' },
          { name: 'Multi-Agent Collaboration', impact: 4, effort: 4, risk: 3, timeline: '4–6 semaines' },
          { name: 'Calibration scoring confiance', impact: 3, effort: 2, risk: 2, timeline: '1–2 semaines' },
        ],
      },
      {
        bloc: 'D',
        blocLabel: 'Expérience & Delivery',
        color: 'from-violet-600 to-violet-700',
        items: [
          { name: 'Refonte Output Assembler v2', impact: 4, effort: 4, risk: 2, timeline: '4–5 semaines' },
          { name: 'Temps de réponse < 2s', impact: 4, effort: 3, risk: 2, timeline: '2–3 semaines' },
          { name: 'Interface multi-langues enrichie', impact: 3, effort: 3, risk: 1, timeline: '2–3 semaines' },
          { name: 'Dashboards client personnalisables', impact: 3, effort: 3, risk: 2, timeline: '3–4 semaines' },
        ],
      },
    ],
  },
  {
    num: 4,
    title: 'Exécution / Simulation des Upgrades',
    icon: 'ri-play-circle-line',
    description: 'Exécution ou simulation des blocs d\'amélioration selon le plan généré en Phase 3. Chaque bloc est déployé, testé et validé indépendamment avant de passer au suivant. Un rollback automatique est déclenché si les KPIs de validation ne sont pas atteints.',
    color: 'from-violet-600 to-violet-700',
    details: [
      'Déploiement progressif bloc par bloc (A → B → C → D)',
      'Mode simulation disponible pour valider sans impact production',
      'Tests de non-régression automatisés après chaque déploiement',
      'Validation KPIs : qualité ≥ 95/100, latence < 3s, hallucination < 1%',
      'Rollback automatique si KPIs non atteints (seuil dégradation > 5%)',
      'Monitoring en temps réel pendant 72h post-déploiement',
      'Canary deployment : 10% → 50% → 100% du trafic',
      'Journal d\'exécution complet et auditable',
    ],
    deliverables: [
      'Rapport d\'exécution par bloc',
      'KPIs avant/après par upgrade',
      'Journal de déploiement détaillé',
      'Rapport d\'incidents et rollbacks éventuels',
      'Certificat de validation post-upgrade',
      'Recommandations pour la phase 5',
    ],
    subSections: [
      {
        title: 'Gates de Validation',
        icon: 'ri-check-double-line',
        items: [
          'Quality Gate : Score ≥ 95/100 maintenu ou amélioré',
          'Performance Gate : Latence < 3s, pas de régression > 5%',
          'Safety Gate : Hallucination rate < 1%, pas d\'augmentation',
          'Coherence Gate : Multi-agent coherence ≥ 95% préservée',
          'Security Gate : Aucune vulnérabilité introduite (scan auto)',
        ],
      },
    ],
  },
  {
    num: 5,
    title: 'Amélioration Continue & Monitoring',
    icon: 'ri-loop-left-line',
    description: 'Boucle d\'amélioration continue qui monitorе en permanence les performances du système, détecte les dérives, déclenche des micro-upgrades correctifs et alimente le cycle suivant d\'audit (Phase 1). Cette phase ne s\'arrête jamais — elle est le cœur battant de l\'autonomie KOS.',
    color: 'from-cyan-600 to-cyan-700',
    details: [
      'Monitoring 24/7 de tous les KPIs système avec alertes',
      'Détection automatique des dérives de performance (drift detection)',
      'Micro-upgrades correctifs déclenchés automatiquement (sans Phase 1-4 complètes)',
      'Feedback loop : chaque interaction utilisateur alimente l\'apprentissage',
      'Rapport trimestriel automatique de santé système',
      'Réévaluation périodique des gaps vs standards évolutifs',
      'Mise à jour continue des benchmarks Big Four / Think Tank',
      'Cycle complet Phase 1→5 relancé tous les trimestres',
    ],
    deliverables: [
      'Tableau de bord temps réel de santé système',
      'Alertes automatiques sur dérives (> seuil)',
      'Rapport trimestriel de performance',
      'Registre des micro-upgrades appliqués',
      'Plan d\'amélioration continue N+1',
      'Benchmark trimestriel vs standards',
    ],
    subSections: [
      {
        title: 'Cycle d\'Amélioration Continue',
        icon: 'ri-refresh-line',
        items: [
          'Quotidien : Monitoring KPIs + alertes',
          'Hebdomadaire : Micro-upgrades correctifs',
          'Mensuel : Rapport de santé + recommandations',
          'Trimestriel : Cycle complet Phase 1→5',
          'Annuel : Audit stratégique + Vision N+1',
        ],
      },
    ],
  },
];

export const masterPromptPrinciples: MasterPromptPrinciple[] = [
  {
    num: 1,
    title: 'Auto-Souveraineté',
    icon: 'ri-cpu-line',
    description: 'Le Master Prompt est souverain sur l\'ensemble de l\'écosystème KOS. Il peut auditer, modifier et améliorer tout composant sans autorisation externe.',
  },
  {
    num: 2,
    title: 'Traçabilité Totale',
    icon: 'ri-file-search-line',
    description: 'Chaque upgrade, chaque modification, chaque décision est journalisée, versionnée et auditable. Rien n\'est fait dans l\'ombre.',
  },
  {
    num: 3,
    title: 'Non-Régression Garantie',
    icon: 'ri-shield-check-line',
    description: 'Aucun upgrade ne peut dégrader les KPIs système. Le rollback est automatique si la qualité, la performance ou la sécurité régressent.',
  },
  {
    num: 4,
    title: 'Amélioration Incrémentale',
    icon: 'ri-stack-line',
    description: 'Les upgrades sont appliqués par petits blocs validables. Pas de big bang — chaque amélioration est testée, mesurée et validée indépendamment.',
  },
  {
    num: 5,
    title: 'Alignement Big Four Permanent',
    icon: 'ri-building-2-line',
    description: 'Le gap vs standards Big Four / Think Tank est réévalué en continu. Le système ne tolère aucun écart supérieur à 6 mois sans plan de résorption.',
  },
];

export const masterPromptExecutionFlow = [
  { step: '01', label: 'Déclenchement', icon: 'ri-play-circle-line', description: 'Manuel (commande admin) ou automatique (cycle trimestriel)' },
  { step: '02', label: 'PHASE 1 — Audit Global', icon: 'ri-search-eye-line', description: 'Scan exhaustif de tous les composants' },
  { step: '03', label: 'PHASE 2 — Gap Analysis', icon: 'ri-scales-3-line', description: 'Comparaison Big Four / Think Tank' },
  { step: '04', label: 'PHASE 3 — Plan d\'Upgrade', icon: 'ri-rocket-2-line', description: 'Génération du plan priorisé' },
  { step: '05', label: 'PHASE 4 — Exécution', icon: 'ri-play-circle-line', description: 'Déploiement bloc par bloc' },
  { step: '06', label: 'PHASE 5 — Amélioration Continue', icon: 'ri-loop-left-line', description: 'Monitoring et cycle perpétuel' },
  { step: '07', label: 'Rapport Final', icon: 'ri-file-list-3-line', description: 'Synthèse exécutive + KPIs avant/après' },
];

export const masterPromptKPIs = [
  { label: 'Précision Audit', value: '≥ 98%', icon: 'ri-crosshair-line', color: 'from-slate-600 to-slate-700' },
  { label: 'Couverture Gap Analysis', value: '100%', icon: 'ri-radar-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Taux Exécution Upgrades', value: '≥ 95%', icon: 'ri-rocket-2-line', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Rollback Rate', value: '< 2%', icon: 'ri-arrow-go-back-line', color: 'from-rose-600 to-rose-700' },
  { label: 'Délai Résolution Gaps', value: '< 30j', icon: 'ri-timer-line', color: 'from-violet-600 to-violet-700' },
  { label: 'Cycle Complet', value: 'Trimestriel', icon: 'ri-loop-left-line', color: 'from-cyan-600 to-cyan-700' },
];

export const masterPromptConclusion = {
  title: 'Le Moteur qui Rend KOS Vivant',
  body: 'Le Master Prompt KOS™ n\'est pas un simple document — c\'est le système nerveux central de KOS. Il est ce qui transforme une architecture statique en organisme vivant, capable de se diagnostiquer, de se prescrire des améliorations et de s\'exécuter lui-même. Avec lui, KOS n\'est plus un système conçu une fois puis maintenu — KOS est un système qui s\'améliore en continu, sans intervention humaine, en restant aligné en permanence sur les standards les plus exigeants du conseil mondial.',
  finalStatement: 'Le Master Prompt est la boucle qui ferme le système KOS sur lui-même. Audit → Gap → Plan → Exécution → Amélioration → Audit. Un cercle vertueux, perpétuel, autonome.',
};