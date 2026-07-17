// KOS SEO AUTOPILOT ENGINE™ — Big Four SEO + Think Tank + AI Growth System

export interface SEOAutopilotPhase {
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
}

export interface SEOIntelligentRule {
  num: number;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface SEOKPI {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export const seoAutopilotIntro = {
  title: 'KOS SEO AUTOPILOT ENGINE™',
  subtitle: 'Big Four SEO + Think Tank + AI Growth System',
  version: 'VERSION PRODUCTION – BIG FOUR SEO + THINK TANK + AI GROWTH SYSTEM',
  role: 'Tu es le KOS SEO Autopilot Engine™, un système autonome de stratégie SEO avancée capable d\'analyser les performances SEO (Google Search Console, analytics, crawl data), détecter les opportunités de ranking, optimiser les pages pour le CTR et les positions Google, générer des contenus SEO Big Four, corriger automatiquement les faiblesses techniques et sémantiques, transformer le trafic en leads qualifiés, et améliorer en continu la performance organique.',
  objective: 'Transformer un site web en machine d\'acquisition organique, autorité thématique Google, plateforme de conversion business et système SEO auto-optimisé en continu.',
  tagline: 'Le moteur qui transforme le SEO en machine d\'acquisition autonome niveau cabinet de conseil international',
  modeOfOperation: 'Le système fonctionne en 6 phases automatiques, de l\'ingestion des données SEO à la boucle d\'autopilotage continu. Chaque phase produit des livrables actionnables qui alimentent la suivante dans un cycle d\'amélioration perpétuel.',
};

export const seoAutopilotPhases: SEOAutopilotPhase[] = [
  {
    num: 1,
    title: 'SEO Data Ingestion',
    icon: 'ri-database-2-line',
    description: 'Analyse des sources de données SEO disponibles : Google Search Console, Google Analytics (si connecté), pages du site, structure des URLs, backlinks (si disponibles) et intentions SERP. Extraction et consolidation de toutes les données exploitables pour le diagnostic.',
    color: 'from-sky-600 to-sky-700',
    details: [
      'Connexion à Google Search Console pour extraction des données d\'indexation',
      'Récupération des métriques : impressions, clics, CTR, positions moyennes',
      'Analyse de la structure d\'URLs et de l\'arborescence du site',
      'Identification des pages indexées vs non-indexées',
      'Extraction des requêtes principales par page',
      'Analyse des intentions de recherche (informationnelle, navigationnelle, transactionnelle)',
      'Évaluation du profil de backlinks si disponible',
      'Cartographie des pages sous-performantes (position > 20)',
    ],
    deliverables: [
      'Liste complète des pages indexées avec métriques',
      'Top 100 requêtes génératrices de trafic',
      'Tableau impressions / clics / CTR par page',
      'Distribution des positions moyennes',
      'Identification des pages sous-performantes',
      'Cartographie des intentions SERP par page',
      'Rapport d\'indexation (pages dans/sans l\'index)',
    ],
    subSections: [
      {
        title: 'Sources analysées',
        icon: 'ri-folder-open-line',
        items: [
          'Google Search Console (API)',
          'Google Analytics (si disponible)',
          'Crawl complet du site (pages, URLs, structure)',
          'Données de backlinks (si disponibles)',
          'Intention de recherche SERP par mot-clé',
        ],
      },
    ],
  },
  {
    num: 2,
    title: 'Diagnostic SEO Big Four™',
    icon: 'ri-stethoscope-line',
    description: 'Évaluation complète de la performance SEO selon les standards des cabinets de conseil internationaux. Analyse de la visibilité, de l\'autorité et de la pertinence, identification des problèmes critiques et des opportunités de croissance immédiates.',
    color: 'from-blue-600 to-blue-700',
    details: [
      'Évaluation de la visibilité organique globale et par segment',
      'Mesure de l\'autorité de domaine et de page',
      'Analyse de la pertinence sémantique : cohérence mots-clés, couverture thématique',
      'Détection des problèmes de cannibalisation SEO entre pages',
      'Identification des pages à faible CTR malgré de bonnes positions',
      'Repérage des pages au contenu trop générique ou non optimisé',
      'Diagnostic technique : vitesse, mobile-friendly, Core Web Vitals',
      'Analyse des mauvaises intentions de recherche (pages ciblant le mauvais intent)',
    ],
    deliverables: [
      'Score global de santé SEO (0–100)',
      'Rapport de cannibalisation SEO',
      'Liste des pages à CTR faible (CTR < 2%)',
      'Cartographie des problèmes techniques prioritaires',
      'Matrice visibilité / autorité / pertinence',
      'Identification des quick wins SEO',
      'Comparaison benchmarking concurrentiel',
    ],
    subSections: [
      {
        title: 'Évaluation 3 axes',
        icon: 'ri-radar-line',
        items: [
          'Visibilité — Part de marché organique, impressions, ranking distribution',
          'Autorité — Domain Rating, backlinks, E-E-A-T signals',
          'Pertinence — Couverture sémantique, alignement intent, qualité contenu',
        ],
      },
      {
        title: 'Problèmes critiques détectés',
        icon: 'ri-alert-line',
        items: [
          'CTR faible malgré bonnes positions',
          'Cannibalisation SEO (pages concurrentes sur mêmes mots-clés)',
          'Inadéquation intention de recherche / contenu',
          'Pages sans optimisation on-page',
          'Contenu trop générique, non différenciant',
        ],
      },
      {
        title: 'Opportunités identifiées',
        icon: 'ri-lightbulb-flash-line',
        items: [
          'Pages en position 8–20 (quick wins à fort potentiel)',
          'Requêtes à fort volume non ciblées',
          'Keywords à intention business / transactionnelle',
          'Featured snippets accessibles',
        ],
      },
    ],
  },
  {
    num: 3,
    title: 'SEO Gap Analysis™',
    icon: 'ri-scales-3-line',
    description: 'Comparaison systématique de la performance actuelle du site avec les standards SEO des leaders du marché, les cabinets Big Four digital advisory et le top 10 SERP. Identification des écarts critiques, des quick wins immédiats et des contenus manquants.',
    color: 'from-emerald-600 to-emerald-700',
    details: [
      'Benchmark vs SERP Top 10 sur les mots-clés stratégiques',
      'Comparaison vs standards SEO des Big Four digital advisory',
      'Analyse des écarts de contenu vs concurrents directs',
      'Identification des mots-clés non couverts',
      'Évaluation du gap d\'autorité (backlinks, E-E-A-T)',
      'Cartographie des opportunités de featured snippets',
      'Analyse des lacunes sémantiques par thématique',
      'Priorisation des gaps par impact business estimé',
    ],
    deliverables: [
      'Matrice de gap analysis multi-dimensionnelle',
      'Liste des gaps critiques avec impact estimé',
      'Plan de quick wins prioritaires (semaine 1–2)',
      'Cartographie des contenus manquants par thématique',
      'Tableau de bord d\'optimisations prioritaires',
    ],
  },
  {
    num: 4,
    title: 'SEO Optimization Engine™',
    icon: 'ri-tools-line',
    description: 'Génération automatique des optimisations on-page, sémantiques et de conversion. Chaque page reçoit des recommandations actionnables : title SEO optimisé, meta description CTR-driven, restructuration H1/H2, stratégie d\'internal linking, enrichissement mots-clés, clustering thématique et optimisation de l\'intention de recherche.',
    color: 'from-amber-600 to-amber-700',
    details: [
      'Génération de titles SEO optimisés (50–60 caractères, keyword principal en début)',
      'Création de meta descriptions CTR-driven (120–160 caractères, call-to-action)',
      'Restructuration H1/H2 pour hiérarchie sémantique optimale',
      'Stratégie d\'internal linking : maillage thématique, ancres optimisées',
      'Enrichissement sémantique : mots-clés LSI, co-occurrences naturelles',
      'Clustering thématique : regroupement des pages par topic cluster',
      'Optimisation intention de recherche pour chaque page',
      'Ajout de CTA contextuels pour transformation trafic → lead',
    ],
    deliverables: [
      'Recommandations on-page par page (title, meta, H1/H2)',
      'Plan d\'internal linking avec ancres',
      'Enrichissement sémantique par cluster thématique',
      'Optimisations CTR par page',
      'CTAs et éléments de conversion intégrés',
    ],
    subSections: [
      {
        title: 'Optimisation On-Page',
        icon: 'ri-file-text-line',
        items: [
          'Title SEO optimisé avec mot-clé principal',
          'Meta description CTR-driven avec CTA',
          'H1/H2 restructurés selon hiérarchie sémantique',
          'Internal linking strategy contextuelle',
          'URLs optimisées (courtes, descriptives)',
        ],
      },
      {
        title: 'Optimisation Sémantique',
        icon: 'ri-text-spacing',
        items: [
          'Enrichissement mots-clés LSI et co-occurrences',
          'Clustering thématique par topic cluster',
          'Optimisation intention de recherche (informational → transactional)',
          'Balisage sémantique (Schema.org, FAQ, HowTo)',
        ],
      },
      {
        title: 'Optimisation Conversion',
        icon: 'ri-user-heart-line',
        items: [
          'Ajout de CTA contextuels sur pages à fort trafic',
          'Transformation trafic → lead (formulaires, lead magnets)',
          'Renforcement pages services avec preuve sociale',
          'Optimisation landing pages pour conversion',
        ],
      },
    ],
  },
  {
    num: 5,
    title: 'Content Generation Engine™',
    icon: 'ri-quill-pen-line',
    description: 'Production automatique de contenus SEO optimisés selon les standards Big Four. Génération de pages service, articles d\'autorité, landing pages de conversion, contenus thought leadership et FAQs SEO enrichies. Chaque contenu inclut contexte marché, analyse, insights stratégiques, recommandations actionnables et orientation business.',
    color: 'from-violet-600 to-violet-700',
    details: [
      'Génération de pages service SEO optimisées avec structure Big Four',
      'Création d\'articles d\'autorité (2000+ mots, sources, citations)',
      'Landing pages de conversion optimisées pour mots-clés transactionnels',
      'Contenus thought leadership : analyses sectorielles, livres blancs',
      'FAQs SEO enrichies avec Schema.org FAQPage',
      'Intégration automatique du maillage interne dans chaque contenu',
      'Optimisation E-E-A-T : sources, auteur, dates, certifications',
      'Balises sémantiques intégrées (Article, FAQ, HowTo, BreadcrumbList)',
    ],
    deliverables: [
      'Calendrier éditorial SEO priorisé',
      'Pages service générées et optimisées',
      'Articles d\'autorité prêts à publier',
      'Landing pages de conversion',
      'FAQs enrichies Schema.org',
      'Contenus thought leadership',
    ],
    subSections: [
      {
        title: 'Standard Big Four par contenu',
        icon: 'ri-award-line',
        items: [
          'Contexte marché — Analyse du secteur et des tendances',
          'Analyse — Décryptage structuré de la problématique',
          'Insights stratégiques — Conclusions différenciantes',
          'Recommandations actionnables — Plan d\'action concret',
          'Orientation business — Impact quantifié, ROI estimé',
          'Optimisation SEO intégrée — Mots-clés, structure, balisage',
        ],
      },
    ],
  },
  {
    num: 6,
    title: 'SEO Autopilot Loop™',
    icon: 'ri-loop-left-line',
    description: 'Boucle d\'autopilotage continu qui monitorе les performances SEO en temps réel, apprend de ce qui fonctionne et de ce qui échoue, ajuste les optimisations automatiquement et déclenche des mises à jour de contenu. Cette phase est le cœur battant de l\'autonomie SEO — elle ne s\'arrête jamais.',
    color: 'from-rose-600 to-rose-700',
    details: [
      'Monitoring 24/7 des positions Google sur les mots-clés stratégiques',
      'Suivi en temps réel du CTR, des impressions et du trafic organique',
      'Détection automatique des baisses de ranking et alertes',
      'Analyse continue de ce qui fonctionne vs ce qui ne fonctionne pas',
      'Ajustement automatique des titles et meta descriptions sous-performants',
      'Renforcement des pages en perte de positions',
      'Mise à jour des contenus existants pour maintenir la fraîcheur',
      'Boucle de feedback complète qui réalimente la Phase 1',
    ],
    deliverables: [
      'Dashboard SEO temps réel',
      'Alertes automatiques sur baisses de ranking',
      'Rapport hebdomadaire de performance SEO',
      'Registre des optimisations appliquées automatiquement',
      'Plan d\'amélioration continue N+1',
      'Benchmark concurrentiel mis à jour',
    ],
    subSections: [
      {
        title: 'Cycle Autopilot',
        icon: 'ri-refresh-line',
        items: [
          'Monitoring — Positions, CTR, impressions 24/7',
          'Learning — Identification patterns succès/échec',
          'Optimization — Mise à jour contenus et balises automatique',
          'Renforcement — Pages en perte de vitesse boostées',
          'Feedback — Cycle complet → Phase 1 réalimentée',
        ],
      },
    ],
  },
];

export const seoIntelligentRules: SEOIntelligentRule[] = [
  {
    num: 1,
    title: 'No Fake Data',
    icon: 'ri-shield-check-line',
    description: 'Aucune donnée SEO ne doit être inventée. Si une information n\'est pas disponible (Google Search Console non connecté, Analytics absent), le système doit explicitement indiquer « Je ne sais pas » plutôt que de générer des données fictives qui fausseraient l\'analyse.',
    color: 'from-red-600 to-red-700',
  },
  {
    num: 2,
    title: 'Business Intent First',
    icon: 'ri-briefcase-line',
    description: 'Priorité absolue aux requêtes commerciales, transactionnelles et décisionnelles. Le SEO n\'est pas une fin en soi — chaque optimisation doit servir un objectif business mesurable : lead, rendez-vous, vente.',
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    num: 3,
    title: 'CTR Optimization Rule',
    icon: 'ri-cursor-line',
    description: 'Chaque page doit être optimisée pour le clic (CTR), l\'intention (pertinence du contenu par rapport à la requête) et la conversion (transformation du visiteur en prospect). Les trois dimensions sont indissociables.',
    color: 'from-amber-600 to-amber-700',
  },
  {
    num: 4,
    title: 'Top 20 Priority Rule',
    icon: 'ri-arrow-up-circle-line',
    description: 'Priorité maximale aux pages positionnées entre la 8ème et la 20ème position — les « quick wins SEO ». Une amélioration de quelques positions sur ces pages génère le meilleur retour sur effort.',
    color: 'from-sky-600 to-sky-700',
  },
  {
    num: 5,
    title: 'Big Four SEO Standard',
    icon: 'ri-building-2-line',
    description: 'Chaque recommandation doit respecter les standards de clarté, structure, justification et impact business des cabinets de conseil internationaux. Pas de recommandation sans démonstration de la valeur ajoutée.',
    color: 'from-violet-600 to-violet-700',
  },
];

export const seoKPIs: SEOKPI[] = [
  { label: 'CTR Improvement', value: '+30%', icon: 'ri-cursor-line', color: 'from-sky-600 to-sky-700' },
  { label: 'Ranking (Pages 8–20)', value: '+50%', icon: 'ri-arrow-up-circle-line', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Organic Traffic', value: 'x2', icon: 'ri-line-chart-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Lead Conversion', value: '↑ significative', icon: 'ri-user-heart-line', color: 'from-violet-600 to-violet-700' },
  { label: 'Bounce Rate', value: '-40%', icon: 'ri-arrow-down-circle-line', color: 'from-rose-600 to-rose-700' },
];

export const seoOutputFormat = [
  { step: '01', label: 'SEO Audit Summary', icon: 'ri-file-search-line', desc: 'Synthèse exécutive de la performance SEO actuelle' },
  { step: '02', label: 'Critical Issues', icon: 'ri-alert-line', desc: 'Problèmes bloquants nécessitant action immédiate' },
  { step: '03', label: 'Growth Opportunities', icon: 'ri-lightbulb-flash-line', desc: 'Quick wins et opportunités de croissance' },
  { step: '04', label: 'Action Plan', icon: 'ri-task-line', desc: 'Plan d\'action priorisé avec timeline' },
  { step: '05', label: 'Content Roadmap', icon: 'ri-quill-pen-line', desc: 'Contenus à créer ou optimiser en priorité' },
  { step: '06', label: 'Expected Impact', icon: 'ri-bar-chart-2-line', desc: 'Projections de trafic, CTR et conversions' },
];

export const seoNextLevelExtensions = [
  { name: 'AI Backlink Strategy Engine', icon: 'ri-link-m', desc: 'Stratégie de netlinking automatisée : identification des cibles, outreach, suivi des liens acquis.' },
  { name: 'Programmatic SEO Generator', icon: 'ri-code-s-slash-line', desc: 'Génération automatique de pages SEO à grande échelle à partir de bases de données structurées.' },
  { name: 'SERP Domination System', icon: 'ri-trophy-line', desc: 'Stratégie multi-positions : featured snippet, People Also Ask, Images, Videos sur une même requête.' },
  { name: 'Competitor Reverse Engineering', icon: 'ri-eye-2-line', desc: 'Ingénierie inverse des stratégies SEO des concurrents : mots-clés, backlinks, architecture de contenu.' },
  { name: 'Google E-E-A-T Authority Builder', icon: 'ri-shield-star-line', desc: 'Construction automatisée de l\'autorité thématique selon les signaux Experience, Expertise, Authoritativeness, Trustworthiness.' },
];

export const seoAutopilotConclusion = {
  title: 'Le Moteur SEO Autonome de Niveau Cabinet International',
  body: 'Le KOS SEO Autopilot Engine™ transforme le SEO d\'une discipline technique morcelée en une machine d\'acquisition organique intégrée, autonome et alignée sur les standards des cabinets de conseil internationaux. Il ne se contente pas d\'analyser — il diagnostique, planifie, optimise, génère du contenu et s\'auto-améliore en continu. Avec lui, le SEO n\'est plus une charge opérationnelle mais un actif stratégique qui génère du trafic qualifié, des leads et du business — 24 heures sur 24, 7 jours sur 7, sans intervention humaine.',
  finalStatement: 'Le KOS SEO Autopilot Engine™ est la réponse KHEPRA à la question : comment rivaliser avec les meilleures agences SEO et cabinets Big Four digital advisory — de manière autonome, industrialisée et continue.',
};