// KOS BACKLINK AUTOMATION SYSTEM™ — Anti-Spam & Safe Growth Engine

export const backlinkIntro = {
  title: 'BACKLINK AUTOMATION SYSTEM™',
  subtitle: 'Anti-Spam & Safe Growth Engine',
  version: 'VERSION ENTERPRISE — RULE ZERO : TOUT BACKLINK DOIT SEMBLER ÉDITORIAL, NATUREL ET CONTEXTUEL',
  concept: 'Le Backlink Automation System ne « crée pas des liens en masse ». Il identifie des opportunités, qualifie des sources, propose des placements, automatise uniquement les étapes sûres et garde une validation humaine sur les zones à risque. La philosophie est simple : si un backlink ne semble pas 100% naturel à l\'œil nu d\'un évaluateur Google, il est rejeté.',
  tagline: 'Le système qui construit des backlinks que Google ne peut pas distinguer de liens naturels — parce qu\'ils le sont',
  objective: 'Construire un profil de backlinks qui ressemble à un écosystème organique — pas à une campagne SEO. Chaque lien doit passer le test de l\'éditeur : « Est-ce que je linkerais cette page même sans contrepartie SEO ? »',
};

export const backlinkRuleZero = {
  principle: 'Rule Zero — Principe Fondamental',
  description: 'Tout backlink doit sembler éditorial, naturel et contextuel. Le système ne crée pas des liens en masse. Il identifie, qualifie, propose, automatise les étapes sûres et garde une validation humaine sur les zones à risque.',
  actions: [
    'Identifier les opportunités réelles de backlinks',
    'Qualifier les sources par scoring multi-dimensionnel',
    'Proposer des placements contextuels naturels',
    'Automatiser uniquement les étapes sans risque',
    'Garder validation humaine sur zones sensibles',
  ],
};

export interface LinkIntelligenceSource {
  name: string;
  icon: string;
  description: string;
  filters: string[];
}

export interface BacklinkAcquisitionMode {
  title: string;
  icon: string;
  description: string;
  color: string;
  level: string;
  automationRate: string;
  channels: string[];
  workflow?: string[];
  note?: string;
}

export const linkIntelligenceSources: LinkIntelligenceSource[] = [
  {
    name: 'Blogs Niche',
    icon: 'ri-article-line',
    description: 'Blogs spécialisés dans le domaine cible avec une audience réelle et un contenu de qualité — pas de blogs généralistes fourre-tout.',
    filters: ['Trafic organique > 500/mois', 'DR/DA > 30', 'Contenu original', 'Indexé Google'],
  },
  {
    name: 'Médias Thématiques',
    icon: 'ri-newspaper-line',
    description: 'Publications sectorielles, magazines en ligne, pure players avec une ligne éditoriale claire et une réputation établie.',
    filters: ['Publication régulière', 'Auteur·es identifié·es', 'Pas de sponsored content massif', 'Trust Score > 70'],
  },
  {
    name: 'Forums Haute Qualité',
    icon: 'ri-chat-quote-line',
    description: 'Forums actifs avec modération stricte, communauté engagée et discussions approfondies — uniquement les top 5% qualitatifs.',
    filters: ['Modération humaine', 'Pas de spam', 'Communauté active', 'Discussions longues'],
  },
  {
    name: 'Sites Partenaires',
    icon: 'ri-team-line',
    description: 'Sites partenaires pré-validés avec relation de confiance établie et audience complémentaire — synergie naturelle, pas échange artificiel.',
    filters: ['Relation préexistante', 'Audience complémentaire', 'Pas de link scheme', 'Historique propre'],
  },
  {
    name: 'Pages Ressources',
    icon: 'ri-bookmark-line',
    description: 'Pages « best tools », « useful links », « ressources recommandées » — des listes éditoriales légitimes où un backlink a du sens.',
    filters: ['Page éditée manuellement', 'Liste qualifiée (< 50 liens)', 'Mise à jour récente', 'Contexte thématique'],
  },
];

export const riskScoringEngine = {
  title: 'Risk Scoring Engine — Anti-Spam Core',
  description: 'Chaque domaine reçoit un double score : un Spam Risk Score (risque de pénalité) et un Trust Score (niveau de confiance). La règle est stricte : autorisé uniquement si Trust > 60 ET Risk < 35. Sinon, rejet ou review humaine obligatoire.',
  spamRiskFactors: [
    { factor: 'Ratio outbound links / contenu', icon: 'ri-link-unlink-m', desc: 'Trop de liens sortants par rapport au contenu = red flag immédiat' },
    { factor: 'Répétition d\'anchors', icon: 'ri-repeat-line', desc: 'Ancres identiques sur plusieurs pages = pattern SEO détectable' },
    { factor: 'Historique de spam', icon: 'ri-spam-line', desc: 'Présence sur blacklists, pénalités Google antérieures, drops de trafic' },
    { factor: 'Faible diversité sémantique', icon: 'ri-text-spacing', desc: 'Contenu pauvre, peu de vocabulaire, pages générées automatiquement' },
    { factor: 'Pages auto-générées', icon: 'ri-robot-line', desc: 'Détection de patterns de génération automatique de contenu' },
  ],
  trustFactors: [
    { factor: 'Trafic organique stable', icon: 'ri-line-chart-line', desc: 'Courbe de trafic stable ou croissante, pas de drops suspects' },
    { factor: 'Backlinks entrants naturels', icon: 'ri-links-line', desc: 'Profil de backlinks diversifié, croissance progressive, ancres naturelles' },
    { factor: 'Ancienneté domaine', icon: 'ri-calendar-line', desc: 'Domaine âgé de plus de 2 ans avec historique d\'indexation continu' },
    { factor: 'Mentions brandées', icon: 'ri-at-line', desc: 'Présence de mentions de marque naturelles sur d\'autres sites' },
    { factor: 'Présence sociale', icon: 'ri-share-line', desc: 'Activité sur les réseaux sociaux, partages organiques, engagement réel' },
  ],
  rule: 'Règle de filtrage : Trust > 60 ET Risk < 35 → Autorisé. Sinon → Rejet automatique ou review humaine obligatoire.',
  scoringVisual: 'Chaque domaine est scoré en temps réel. Les scores sont mis à jour quotidiennement via le monitoring continu.',
};

export const opportunityEngine = {
  title: 'Opportunity Engine — Link Matching AI',
  description: 'Ce module associe automatiquement le contenu du site, les pages cibles et les opportunités détectées pour proposer des placements contextuels naturels. L\'IA ne propose un backlink que si le lien a du sens éditorialement.',
  examples: [
    {
      content: 'Article : « SEO Autopilot v2 »',
      opportunity: 'Blog marketing SaaS',
      match: '« Guide automation SEO » ou « AI marketing tools list »',
      result: 'Placement contextuel naturel dans un article existant, pas un guest post forcé',
    },
    {
      content: 'Étude : « Baromètre BCEAO 2026 »',
      opportunity: 'Média finance africaine',
      match: '« Analyse du secteur bancaire UEMOA » ou « Ressources régulation financière »',
      result: 'Citation naturelle de l\'étude comme source dans un article d\'analyse',
    },
    {
      content: 'Tool : « Diagnostic Flash Conformité »',
      opportunity: 'Blog compliance & risk management',
      match: '« Outils de diagnostic réglementaire » ou « Compliance checklist tools »',
      result: 'Inclusion dans une liste d\'outils recommandés pour compliance officers',
    },
  ],
  matchingCriteria: [
    'Correspondance thématique NLP > 85%',
    'Page cible pertinente pour le contexte de l\'article',
    'Anchor text naturel dans le flux de lecture',
    'Pas de concurrence directe avec le site hôte',
  ],
};

export const acquisitionModes: BacklinkAcquisitionMode[] = [
  {
    title: 'Safe Mode — Fully Automated',
    icon: 'ri-shield-check-line',
    description: 'Uniquement des backlinks low-risk dans des environnements contrôlés : citations d\'annuaires qualité, profils entreprise Web 2.0 propres, listings SaaS, plateformes type Crunchbase, blogs partenaires pré-validés. 100% automatisable sans risque.',
    color: 'from-emerald-600 to-emerald-700',
    level: '🟢 Safe',
    automationRate: '100% automatisé',
    channels: [
      'Citations dans annuaires qualité (niche-specific, pas génériques)',
      'Profils entreprise (Web 2.0 propre — About.me, Medium, LinkedIn Company)',
      'Listings SaaS (ProductHunt, G2, Capterra, AlternativeTo)',
      'Plateformes type Crunchbase, AngelList, Owler',
      'Blogs partenaires pré-validés avec relation de confiance',
    ],
  },
  {
    title: 'Hybrid Mode — AI + Human Approval',
    icon: 'ri-user-shared-line',
    description: 'Guest posts, échanges de contenu, insertions dans articles existants, outreach email automatique. L\'AI rédige le pitch, propose le placement, l\'humain valide, le système publie ou négocie.',
    color: 'from-amber-600 to-amber-700',
    level: '🟡 Hybrid',
    automationRate: '70% automatisé — 30% validation humaine',
    channels: [
      'Guest posts sur sites thématiques',
      'Échanges de contenu (content swap)',
      'Insertions dans articles existants (link insertion)',
      'Outreach email automatisé avec personalisation IA',
    ],
    workflow: [
      'AI rédige le pitch personnalisé',
      'AI propose le placement contextuel optimal',
      'Humain valide le pitch et le placement',
      'Système publie ou négocie automatiquement',
    ],
  },
  {
    title: 'Authority Mode — Manual Only, AI Assisted',
    icon: 'ri-vip-crown-line',
    description: 'Médias, gros sites niche, publications éditoriales, PR backlinks. L\'AI assiste la recherche et la préparation, mais ne publie jamais seule. Chaque action est validée par un expert humain.',
    color: 'from-rose-600 to-rose-700',
    level: '🔴 Authority',
    automationRate: '20% assisté par IA — 80% manuel expert',
    channels: [
      'Médias grand public et spécialisés',
      'Gros sites niche avec forte autorité',
      'Publications éditoriales (journaux, magazines)',
      'PR backlinks (relations presse digitales)',
    ],
    note: 'L\'AI aide à la recherche d\'opportunités et à la préparation des dossiers de presse, mais chaque action — du pitch à la publication — est pilotée par un expert humain.',
  },
];

export const anchorTextSafety = {
  title: 'Anchor Text Safety System',
  subtitle: 'Anti-Over-Optimization Engine',
  description: 'Le système impose une distribution stricte des ancres pour éviter toute sur-optimisation détectable par Google. Les ratios sont bloquants : si la distribution sort des clous, le backlink est automatiquement rejeté.',
  distribution: [
    { type: 'Ancres Naturelles', icon: 'ri-check-line', percentage: '60-80%', color: 'from-emerald-500 to-emerald-600', examples: 'Brand name, URL nue, « cliquez ici », « cet outil », « en savoir plus », « site web »' },
    { type: 'Semi-Optimisées', icon: 'ri-equalizer-line', percentage: '10-25%', color: 'from-amber-500 to-amber-600', examples: 'Variations naturelles avec mots-clés partiels, « guide SEO », « outil d\'automatisation »' },
    { type: 'Exact Match Keywords', icon: 'ri-alert-line', percentage: '5-10% max', color: 'from-rose-500 to-rose-600', examples: 'Uniquement si l\'ancre exacte est la façon la plus naturelle de linker — strictement limité' },
  ],
  blockingRule: 'Si la distribution d\'ancres dépasse les seuils autorisés → blocage automatique du backlink. Aucune exception.',
};

export const linkVelocityController = {
  title: 'Link Velocity Controller',
  subtitle: 'Régulation de Croissance',
  description: 'Google détecte les pics de backlinks comme un signal de manipulation. Le système impose une croissance logistique — progressive, non linéaire, avec randomisation des dates et variation des sources.',
  velocityCurve: [
    { month: 'Mois 1', range: '5–10', icon: 'ri-speed-mini-line', desc: 'Phase de démarrage — liens fondationnels uniquement' },
    { month: 'Mois 2', range: '10–20', icon: 'ri-speed-line', desc: 'Première accélération — diversification des sources' },
    { month: 'Mois 3', range: '20–40', icon: 'ri-speed-up-line', desc: 'Montée en puissance — contenu attractif de liens publié' },
    { month: 'Mois 4–6', range: '40–70', icon: 'ri-rocket-line', desc: 'Régime de croisière — croissance organique simulée' },
  ],
  controlMechanisms: [
    'Randomisation des dates de publication (±3 jours)',
    'Variation obligatoire des sources (pas plus de 2 liens du même domaine par mois)',
    'Croissance logistique — pas linéaire — avec phases de plateau naturelles',
    'Détection automatique des bursts anormaux → gel immédiat',
  ],
};

export const naturalFootprint = {
  title: 'Natural Footprint Generator',
  subtitle: 'Camouflage Anti-Détection',
  description: 'Pour éviter les patterns SEO artificiels, le système génère délibérément un « écosystème » de liens qui imite la croissance organique : diversité des domaines, des IPs, des ancres, des pages cibles, mix dofollow/nofollow et mentions sans lien.',
  footprintDimensions: [
    { dimension: 'Diversité des domaines', icon: 'ri-global-line', desc: 'Pas de concentration sur un seul TLD ou une seule zone géographique. Mix .com, .org, .fr, .io, etc.' },
    { dimension: 'Diversité des IPs', icon: 'ri-server-line', desc: 'Hébergements variés : AWS, GCP, OVH, DigitalOcean, hébergeurs locaux — pas de mêmes blocs IP' },
    { dimension: 'Variation des ancres', icon: 'ri-font-size', desc: 'Distribution naturelle avec ancres longues, courtes, brandées, génériques, URL — pas de pattern' },
    { dimension: 'Variation des pages cibles', icon: 'ri-pages-line', desc: 'Liens vers homepage, pages services, articles, outils — pas de concentration sur une seule page' },
    { dimension: 'Mix dofollow / nofollow', icon: 'ri-git-branch-line', desc: 'Ratio 70/30 dofollow/nofollow pour simuler un profil naturel  — pas 100% dofollow' },
    { dimension: 'Mentions sans lien', icon: 'ri-chat-quote-line', desc: 'Brand mentions non linkées sur des sites d\'autorité — Google les compte comme signaux implicites' },
  ],
  philosophy: 'Google voit un « écosystème » de liens organiques, pas une campagne SEO. La diversité est la meilleure protection contre la détection algorithmique.',
};

export const contentBasedInjection = {
  title: 'Content-Based Link Injection',
  subtitle: 'La méthode la plus puissante et la plus sûre',
  description: 'Au lieu de « poser des backlinks », le système crée du contenu qui attire naturellement les liens. C\'est la stratégie la plus durable et la plus respectée par Google — le link baiting éthique et value-driven.',
  contentTypes: [
    { type: 'Études de données originales', icon: 'ri-bar-chart-box-line', desc: 'Recherche exclusive, données propriétaires, analyses inédites que les autres sites veulent citer', example: 'Baromètre BCEAO, indices sectoriels, benchmarks' },
    { type: 'Benchmarks sectoriels', icon: 'ri-scales-line', desc: 'Comparatifs chiffrés que les médias et blogs adorent référencer comme source', example: 'Classement des banques UEMOA, top outils compliance' },
    { type: 'Outils gratuits', icon: 'ri-tools-line', desc: 'Calculateurs, simulateurs, diagnostics — des ressources que les sites recommandent naturellement', example: 'Diagnostic Flash Conformité, Simulateur ROI' },
    { type: 'Statistiques originales', icon: 'ri-pie-chart-line', desc: 'Chiffres exclusifs issus de données internes ou d\'enquêtes — citables et linkables', example: '« 73% des IMF en Afrique n\'ont pas de dispositif LCB-FT conforme »' },
    { type: 'Rapports sectoriels', icon: 'ri-file-text-line', desc: 'Rapports annuels, livres blancs, études approfondies — le contenu evergreen qui accumule des liens sur la durée', example: 'Guide Due Diligence Afrique, Rapport ESG Annuel' },
  ],
  advantage: 'Ces backlinks sont les plus sûrs et les plus durables car ils sont 100% mérités. Google ne peut pas pénaliser un lien que vous avez gagné en créant de la valeur.',
};

export const monitoringProtection = {
  title: 'Monitoring & Protection Layer',
  subtitle: 'Surveillance Continue et Actions Automatiques',
  description: 'Le système surveille en continu le profil de backlinks : nouveaux liens détectés, alertes sur liens toxiques, statut d\'indexation, liens perdus. Des actions automatiques sont déclenchées — mais jamais de désaveu automatique sans validation.',
  monitoringPoints: [
    { action: 'Nouveaux backlinks détectés', icon: 'ri-eye-line', desc: 'Scan quotidien des nouveaux backlinks avec scoring immédiat' },
    { action: 'Toxic backlinks alerts', icon: 'ri-alert-line', desc: 'Alerte immédiate si un lien toxique est détecté dans le profil' },
    { action: 'Indexation status', icon: 'ri-check-double-line', desc: 'Vérification quotidienne que les backlinks acquis sont bien indexés' },
    { action: 'Lost links recovery', icon: 'ri-refresh-line', desc: 'Détection des liens perdus et tentative de récupération automatique' },
  ],
  automaticActions: [
    'Disavow suggestions (pas d\'auto-submit sans validation humaine)',
    'Replacement link building (si un lien est perdu, un nouveau est proposé)',
    'Outreach de récupération automatisé pour liens supprimés',
    'Rapport hebdomadaire de santé du profil de backlinks',
  ],
};

export const antiSpamGuardrails = {
  title: 'Anti-Spam Guardrails',
  subtitle: 'Blocages Automatiques',
  description: 'Le système bloque automatiquement — sans exception — les patterns de spam SEO identifiables. Ces blocages sont non-négociables et s\'appliquent quelle que soit l\'autorité apparente du domaine.',
  blockedPatterns: [
    { pattern: 'PBN détectés', icon: 'ri-forbid-line', desc: 'Private Blog Networks — réseaux de sites interconnectés artificiellement' },
    { pattern: 'Farms de liens', icon: 'ri-bug-line', desc: 'Sites dont la seule raison d\'être est de vendre ou échanger des liens' },
    { pattern: 'Sites sans trafic réel', icon: 'ri-signal-wifi-off-line', desc: 'Domaines avec 0 trafic organique — pas d\'audience = pas de valeur SEO' },
    { pattern: 'Pages générées automatiquement', icon: 'ri-robot-line', desc: 'Contenu auto-généré sans intervention éditoriale humaine' },
    { pattern: 'Anchor stuffing', icon: 'ri-text-spacing', desc: 'Surabondance de mots-clés dans les ancres d\'un même domaine' },
    { pattern: 'Link bursts anormaux', icon: 'ri-pulse-line', desc: 'Pic soudain de backlinks d\'un même domaine ou réseau' },
  ],
  enforcement: 'Blocage automatique, immédiat et irréversible. Aucune exception, aucun override manuel possible sans validation du KOS Governance Council.',
};

export const kpiDashboard = {
  title: 'KPI Dashboard — Pilotage Big Four Style',
  subtitle: '6 Indicateurs de Performance Clés',
  description: 'Le tableau de bord de pilotage du Backlink Automation System, conçu pour un reporting exécutif niveau conseil d\'administration. Chaque KPI est monitoré en temps réel et audité trimestriellement.',
  kpis: [
    { label: 'Trust Score Global', value: '> 75/100', icon: 'ri-shield-star-line', color: 'from-emerald-500 to-emerald-600', desc: 'Score de confiance moyen de tous les domaines du profil' },
    { label: 'Link Velocity Index', value: '+15-25%/mois', icon: 'ri-speed-line', color: 'from-sky-500 to-sky-600', desc: 'Taux de croissance des backlinks — doit rester dans la zone de sécurité' },
    { label: 'Toxicity Ratio', value: '< 5%', icon: 'ri-alert-line', color: 'from-rose-500 to-rose-600', desc: 'Pourcentage de backlinks toxiques dans le profil total — doit tendre vers 0' },
    { label: 'Domain Diversity Index', value: '> 0.85', icon: 'ri-global-line', color: 'from-violet-500 to-violet-600', desc: 'Indice de diversité des domaines référents (0-1, plus c\'est haut mieux c\'est)' },
    { label: 'Organic Lift / backlink', value: '+0.3 position', icon: 'ri-line-chart-line', color: 'from-amber-500 to-amber-600', desc: 'Gain moyen de position SERP par backlink acquis' },
    { label: 'SERP Movement Correlation', value: 'r > 0.7', icon: 'ri-bar-chart-grouped-line', color: 'from-indigo-500 to-indigo-600', desc: 'Corrélation entre nouveaux backlinks et mouvements de classement' },
  ],
};

export const saasModules = {
  title: 'Version SaaS — Industrialisation',
  subtitle: 'Modules Produits pour Externalisation',
  description: 'Le Backlink Automation System peut être transformé en produit SaaS modulaire, permettant à d\'autres entreprises de bénéficier de la même intelligence de backlinking sans avoir à construire l\'infrastructure.',
  modules: [
    { name: 'Link Intelligence API', icon: 'ri-radar-line', desc: 'API de découverte et scoring de domaines — whitelist dynamique en temps réel' },
    { name: 'Backlink Opportunity Finder', icon: 'ri-search-eye-line', desc: 'Moteur de matching contenu-opportunité avec scoring de pertinence' },
    { name: 'Risk Scoring Engine', icon: 'ri-shield-flash-line', desc: 'Double scoring Spam Risk + Trust avec API de consulting' },
    { name: 'Outreach AI Agent', icon: 'ri-chat-smile-line', desc: 'Agent autonome de négociation et suivi d\'outreach' },
    { name: 'Monitoring Dashboard', icon: 'ri-dashboard-line', desc: 'Tableau de bord temps réel avec alertes et rapports automatisés' },
  ],
};

export const backlinkConclusion = {
  title: 'Conclusion Stratégique',
  body: 'Un système de backlinks « 100% automatique » pur est dangereux et instable. Le modèle robuste — celui qui survit aux mises à jour d\'algorithme Google et construit une autorité durable — repose sur une architecture hybride : 70% d\'automatisation intelligente pour les tâches répétitives à faible risque, 20% de validation humaine pour les décisions à impact moyen, et 10% d\'outreach manuel de haute autorité pour les liens qui comptent vraiment. Ce n\'est pas le système qui crée le plus de liens qui gagne — c\'est celui qui crée les liens les plus indiscernables de liens naturels.',
  ratios: [
    { percentage: '70%', label: 'Automatisation Intelligente', color: 'from-sky-500 to-sky-600', icon: 'ri-cpu-line' },
    { percentage: '20%', label: 'Validation Humaine', color: 'from-amber-500 to-amber-600', icon: 'ri-user-shared-line' },
    { percentage: '10%', label: 'Authority / Manual Outreach', color: 'from-rose-500 to-rose-600', icon: 'ri-vip-crown-line' },
  ],
  finalStatement: 'Le Backlink Automation System n\'est pas un link builder — c\'est un écosystème de liens organiques qui se construit lui-même, sous supervision humaine, avec des garde-fous anti-spam non-négociables.',
};