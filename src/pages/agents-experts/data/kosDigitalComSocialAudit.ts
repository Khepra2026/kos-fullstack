// KOS DIGITAL COMMUNICATION & SOCIAL NETWORKS PERFORMANCE AUDIT ENGINE™ — Digital Growth Intelligence Platform

export const digitalComIntro = {
  title: 'Digital Communication & Social Networks Performance Audit Engine™',
  subtitle: 'Digital Growth Intelligence Platform — Social Media Analytics · Email Automation · Content Distribution · Brand Reputation',
  version: 'VERSION ENTERPRISE — REAL-TIME AUDIT · MULTI-CHANNEL · PREDICTIVE ENGAGEMENT',
  role: 'KOS Digital Communication Audit Engine™ — système d\'audit et d\'optimisation en continu des automates de communication digitale et réseaux sociaux. Combine Social Media Analytics, Email Marketing Intelligence, Content Distribution Strategy, Brand Reputation Monitoring et LinkedIn Growth Engineering. Sa mission : auditer en permanence les performances des canaux digitaux, détecter les opportunités d\'engagement, optimiser la distribution de contenu et maximiser l\'impact de chaque point de contact digital.',
  tagline: 'L\'auditeur digital qui ne dort jamais — scanne, mesure, optimise et amplifie chaque signal, chaque canal, chaque audience.',
  objective: 'Transformer l\'écosystème de communication digitale KOS en Digital Growth Intelligence Platform : performance scoring multi-canal, prédiction d\'engagement, optimisation automatique des campagnes, et pilotage exécutif de la présence digitale.',
};

// ARCHITECTURE — 5 Audit Layers
export const auditArchitectureLayers = [
  {
    id: 'social-media',
    label: 'A.',
    title: 'Social Media Performance Audit',
    subtitle: 'COUCHE A — AUDIT RÉSEAUX SOCIAUX',
    icon: 'ri-share-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Audit continu des performances sur l\'ensemble des plateformes sociales : LinkedIn (canal prioritaire B2B), Twitter/X, Facebook, Instagram. Mesure de l\'engagement, de la portée organique, du taux de conversion et de l\'autorité de marque par plateforme.',
    items: [
      { name: 'LinkedIn Corporate Page', icon: 'ri-linkedin-box-line', desc: 'Impressions, CTR, engagement rate, follower growth, SSI (Social Selling Index), taux de conversion InMail' },
      { name: 'LinkedIn Personal Profiles', icon: 'ri-user-star-line', desc: 'Analyse des profils exécutifs — vues, apparitions recherche, recommandations, engagement contenu' },
      { name: 'Twitter/X Analytics', icon: 'ri-twitter-x-line', desc: 'Tweets, impressions, retweets, mentions, followers, engagement rate, top tweets' },
      { name: 'Content Performance', icon: 'ri-article-line', desc: 'Meilleurs formats (carrousel, article, vidéo, infographie), meilleurs jours/heures, viralité' },
      { name: 'Audience Insights', icon: 'ri-user-heart-line', desc: 'Démographie, secteurs, fonctions, localisation, intérêts des audiences par plateforme' },
      { name: 'Competitor Benchmarking', icon: 'ri-line-chart-line', desc: 'Comparaison engagement, croissance followers, fréquence publication vs concurrents directs' },
      { name: 'Hashtag & Topic Analysis', icon: 'ri-hashtag', desc: 'Performance des hashtags sectoriels, trending topics réglementaires, reach thématique' },
    ],
  },
  {
    id: 'email-automation',
    label: 'B.',
    title: 'Email & Marketing Automation Audit',
    subtitle: 'COUCHE B — AUDIT EMAIL & AUTOMATION',
    icon: 'ri-mail-send-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Audit des séquences email automatisées, des campagnes nurturing et des workflows de conversion. Analyse des taux d\'ouverture, de clic, de conversion et de désabonnement par séquence et par segment.',
    items: [
      { name: 'Welcome Sequence', icon: 'ri-user-add-line', desc: 'Taux ouverture, taux clic, taux conversion, délai premier clic, drop-off par étape' },
      { name: 'Nurturing Campaigns', icon: 'ri-seedling-line', desc: 'Engagement par segment, lead scoring, vitesse de progression tunnel, contenu le plus engageant' },
      { name: 'Newsletter Performance', icon: 'ri-newspaper-line', desc: 'Open rate, CTR, partage, forward rate, meilleurs sujets, jours/heures optimaux' },
      { name: 'Transactional Emails', icon: 'ri-mail-check-line', desc: 'Délivrabilité, taux de bounce, temps de remise, taux de complétion, conversion post-transaction' },
      { name: 'Re-engagement Flows', icon: 'ri-refresh-line', desc: 'Taux de réactivation, win-back conversion, délai de réponse, sunset policy efficiency' },
      { name: 'A/B Testing Results', icon: 'ri-test-tube-line', desc: 'Gagnants par variable (sujet, CTA, design, timing), uplift incrémental, insights actionnables' },
      { name: 'Deliverability Health', icon: 'ri-shield-check-line', desc: 'Bounce rate, spam rate, blacklist monitoring, SPF/DKIM/DMARC status, sender reputation' },
    ],
  },
  {
    id: 'content-distribution',
    label: 'C.',
    title: 'Content Distribution & Amplification Audit',
    subtitle: 'COUCHE C — AUDIT DISTRIBUTION CONTENU',
    icon: 'ri-broadcast-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Audit de la distribution omnicanale du contenu : blog, LinkedIn articles, newsletters, webinaires, livres blancs, podcasts. Mesure de la portée, de l\'amplification et du ROI par canal de distribution.',
    items: [
      { name: 'Blog Content Reach', icon: 'ri-global-line', desc: 'Trafic organique, temps de lecture, scroll depth, partages, backlinks générés, conversions' },
      { name: 'LinkedIn Articles', icon: 'ri-linkedin-box-line', desc: 'Vues, likes, commentaires, reposts, featured status, conversion en leads qualifiés' },
      { name: 'Newsletter Distribution', icon: 'ri-mail-line', desc: 'Cross-posting vers Slack, Teams, agrégateurs, réutilisation contenu newsletter sur blog/LinkedIn' },
      { name: 'Webinar & Event Content', icon: 'ri-live-line', desc: 'Inscriptions, participants live, replay views, slides téléchargées, leads générés post-event' },
      { name: 'White Paper Downloads', icon: 'ri-file-text-line', desc: 'Taux de téléchargement, taux de lecture complète, partages, leads qualifiés, ROI par livre blanc' },
      { name: 'Cross-Channel Attribution', icon: 'ri-node-tree', desc: 'Parcours multi-touchpoint, attribution premier/dernier clic, influence relative de chaque canal' },
      { name: 'Content Decay Analysis', icon: 'ri-timer-line', desc: 'Demi-vie du contenu par format et canal, opportunités de refresh, evergreen vs trending' },
    ],
  },
  {
    id: 'brand-reputation',
    label: 'D.',
    title: 'Brand Reputation & Sentiment Audit',
    subtitle: 'COUCHE D — AUDIT RÉPUTATION & SENTIMENT',
    icon: 'ri-emotion-happy-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Surveillance continue de la réputation de marque, du sentiment des audiences, des mentions et des conversations sectorielles. Analyse des avis, commentaires, et signaux faibles.',
    items: [
      { name: 'Brand Mentions', icon: 'ri-chat-1-line', desc: 'Volume de mentions, sentiment analysis (positif/neutre/négatif), tendance, pics d\'activité' },
      { name: 'Social Listening', icon: 'ri-radar-line', desc: 'Conversations sectorielles, émergence de sujets, signaux faibles réglementaires, crises potentielles' },
      { name: 'Comment Analysis', icon: 'ri-message-2-line', desc: 'Qualité des commentaires, taux de réponse, délai de réponse moyen, ratio expert/promotionnel' },
      { name: 'Review & Testimonial Score', icon: 'ri-star-line', desc: 'Note moyenne, volume d\'avis, répartition par note, verbatims clés, tendance trimestrielle' },
      { name: 'Influencer & Expert Signals', icon: 'ri-user-voice-line', desc: 'Mentions par leaders d\'opinion, reposts de régulateurs, citations académiques, invitations conférences' },
      { name: 'Crisis Detection', icon: 'ri-alert-line', desc: 'Détection précoce de crise réputationnelle, analyse de viralité négative, plan de réponse activable' },
      { name: 'Share of Voice', icon: 'ri-megaphone-line', desc: 'Part de voix vs concurrents, évolution, domination thématique, émergence de nouveaux acteurs' },
    ],
  },
  {
    id: 'linkedin-growth',
    label: 'E.',
    title: 'LinkedIn Growth & Authority Engineering',
    subtitle: 'COUCHE E — INGÉNIERIE DE CROISSANCE LINKEDIN',
    icon: 'ri-linkedin-box-fill',
    color: 'from-blue-500 to-blue-600',
    description: 'Module spécialisé LinkedIn (canal prioritaire B2B) : optimisation des profils exécutifs, stratégie de contenu, croissance du réseau, Social Selling Index (SSI), et conversion en leads qualifiés.',
    items: [
      { name: 'Executive Profile Optimization', icon: 'ri-user-star-line', desc: 'Score de complétion, SEO LinkedIn, title optimisation, featured section, recommendations reçues' },
      { name: 'Content Strategy Score', icon: 'ri-quill-pen-line', desc: 'Cadence de publication, mix de formats, taux d\'engagement moyen, top 10 posts, viralité' },
      { name: 'Network Growth', icon: 'ri-user-add-line', desc: 'Croissance hebdomadaire, qualité des connexions (seniority, secteur, géographie), taux d\'acceptation' },
      { name: 'Social Selling Index (SSI)', icon: 'ri-bar-chart-line', desc: 'Score SSI global, brand, find, engage, build relationships — comparaison secteur et réseau' },
      { name: 'InMail & Outreach', icon: 'ri-message-3-line', desc: 'Taux d\'acceptation InMail, taux de réponse, conversion en rendez-vous, templates gagnants' },
      { name: 'LinkedIn Ads Integration', icon: 'ri-advertisement-line', desc: 'Sponsored content CTR, lead gen forms conversion, retargeting efficiency, CPL par format' },
      { name: 'Thought Leadership Score', icon: 'ri-lightbulb-line', desc: 'Partages par leaders d\'opinion, invitations panels, citations, featured dans newsletters LinkedIn' },
    ],
  },
];

// KPI BIG FOUR — 5 Piliers
export const digitalComKPIs = [
  {
    id: 'engagement',
    label: 'A. Engagement & Reach',
    subtitle: 'ENGAGEMENT SCORE',
    icon: 'ri-heart-pulse-line',
    color: 'from-sky-500 to-sky-600',
    description: 'Mesure de l\'engagement généré sur l\'ensemble des canaux digitaux — interactions, portée, viralité et rétention d\'audience.',
    metrics: [
      { name: 'Taux d\'engagement LinkedIn', target: '> 4.5%', icon: 'ri-linkedin-box-line' },
      { name: 'Portée organique mensuelle', target: '> 50K', icon: 'ri-eye-line' },
      { name: 'Taux de clic newsletter', target: '> 8%', icon: 'ri-mail-line' },
      { name: 'Taux de complétion vidéo', target: '> 65%', icon: 'ri-play-circle-line' },
      { name: 'Partages par post', target: '> 25', icon: 'ri-share-forward-line' },
    ],
  },
  {
    id: 'conversion',
    label: 'B. Lead Generation & Conversion',
    subtitle: 'CONVERSION SCORE',
    icon: 'ri-exchange-dollar-line',
    color: 'from-emerald-500 to-emerald-600',
    description: 'Mesure de la performance de conversion — des impressions aux leads qualifiés en passant par l\'inscription aux événements et téléchargements.',
    metrics: [
      { name: 'Conversion visiteur → lead', target: '> 3.2%', icon: 'ri-user-add-line' },
      { name: 'Taux ouverture email automatique', target: '> 35%', icon: 'ri-mail-open-line' },
      { name: 'Leads LinkedIn / mois', target: '> 40', icon: 'ri-linkedin-box-line' },
      { name: 'Rendez-vous générés / mois', target: '> 15', icon: 'ri-calendar-check-line' },
      { name: 'Coût par lead qualifié (CPL)', target: '< 15 000 FCFA', icon: 'ri-money-dollar-circle-line' },
    ],
  },
  {
    id: 'content-quality',
    label: 'C. Content Quality & Authority',
    subtitle: 'AUTORITY SCORE',
    icon: 'ri-award-line',
    color: 'from-amber-500 to-amber-600',
    description: 'Évaluation de la qualité du contenu produit et de son impact sur l\'autorité de marque — profondeur, originalité, référencement.',
    metrics: [
      { name: 'Score de lisibilité moyen', target: '> 75/100', icon: 'ri-file-text-line' },
      { name: 'Articles cités par des tiers', target: '> 10 / mois', icon: 'ri-double-quotes-l' },
      { name: 'Backlinks générés par contenu', target: '> 30 / mois', icon: 'ri-links-line' },
      { name: 'Featured snippets gagnés', target: '> 12', icon: 'ri-search-eye-line' },
      { name: 'Temps lecture moyen blog', target: '> 4 min', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 'email-performance',
    label: 'D. Email & Automation Health',
    subtitle: 'AUTOMATION SCORE',
    icon: 'ri-mail-settings-line',
    color: 'from-violet-500 to-violet-600',
    description: 'Santé et performance de l\'infrastructure email automatisée — délivrabilité, engagement séquence, nurturing et rétention.',
    metrics: [
      { name: 'Délivrabilité globale', target: '> 99%', icon: 'ri-mail-check-line' },
      { name: 'Taux de désabonnement', target: '< 0.3%', icon: 'ri-user-unfollow-line' },
      { name: 'Taux de bounce', target: '< 0.5%', icon: 'ri-mail-close-line' },
      { name: 'Délai premier clic (nurturing)', target: '< 48h', icon: 'ri-timer-flash-line' },
      { name: 'Séquences actives sans erreur', target: '100%', icon: 'ri-check-double-line' },
    ],
  },
  {
    id: 'reputation',
    label: 'E. Brand Reputation & Sentiment',
    subtitle: 'REPUTATION SCORE',
    icon: 'ri-shield-star-line',
    color: 'from-rose-500 to-rose-600',
    description: 'Évaluation de la réputation digitale globale — sentiment, mentions positives, autorité sectorielle et signaux de confiance.',
    metrics: [
      { name: 'Sentiment positif global', target: '> 92%', icon: 'ri-emotion-happy-line' },
      { name: 'Mentions par leaders d\'opinion', target: '> 5 / trim.', icon: 'ri-user-voice-line' },
      { name: 'Délai réponse commentaires', target: '< 4h', icon: 'ri-timer-line' },
      { name: 'Share of Voice sectoriel', target: '> 25%', icon: 'ri-megaphone-line' },
      { name: 'Crises détectées et résolues', target: '< 1 / an', icon: 'ri-alert-line' },
    ],
  },
];

// ALERTING SYSTEM
export const alertingSystemDigital = [
  {
    level: 'critical',
    label: 'CRITICAL',
    icon: 'ri-alarm-warning-line',
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    textColor: 'text-rose-700',
    description: 'Alertes critiques nécessitant une action immédiate — crise réputationnelle, chute brutale d\'engagement, panne d\'infrastructure email.',
    triggers: [
      { name: 'Crise réputationnelle détectée', icon: 'ri-alert-line', desc: 'Volume anormal de mentions négatives, viralité négative, attaque coordonnée — activation cellule de crise' },
      { name: 'Chute brutale engagement (-50%)', icon: 'ri-arrow-down-circle-line', desc: 'Baisse soudaine du taux d\'engagement sur canal prioritaire — diagnostic immédiat et rollback contenu' },
      { name: 'Infrastructure email down', icon: 'ri-mail-close-line', desc: 'Échec d\'envoi massif, bounce rate anormal, blacklisting — basculement vers fallback et investigation' },
      { name: 'Fuite de données abonnés', icon: 'ri-lock-unlock-line', desc: 'Suspicion de compromission base abonnés — notification CNIL/RGPD, réinitialisation, audit forensique' },
    ],
    action: 'Action immédiate + rollback + notification direction',
  },
  {
    level: 'warning',
    label: 'WARNING',
    icon: 'ri-alert-line',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 border-amber-200',
    textColor: 'text-amber-700',
    description: 'Alertes d\'avertissement — dégradation progressive, opportunité manquée, sous-performance de campagne.',
    triggers: [
      { name: 'Dégradation taux d\'ouverture', icon: 'ri-mail-open-line', desc: 'Baisse progressive du taux d\'ouverture sur 3 envois consécutifs — diagnostic sujet, timing, audience' },
      { name: 'Baisse engagement LinkedIn', icon: 'ri-linkedin-box-line', desc: 'Diminution du taux d\'engagement sur 2 semaines — analyse format, fréquence, algorithme' },
      { name: 'Taux désabonnement en hausse', icon: 'ri-user-unfollow-line', desc: 'Augmentation du taux de désabonnement au-delà du seuil — analyse contenu, fréquence, pertinence' },
      { name: 'Opportunité trending manquée', icon: 'ri-flashlight-line', desc: 'Sujet sectoriel en forte croissance non couvert — alerte proactive de contenu à produire' },
    ],
    action: 'Auto-diagnosis + recommandation + ajustement',
  },
  {
    level: 'info',
    label: 'INFO',
    icon: 'ri-information-line',
    color: 'from-sky-500 to-sky-600',
    bgColor: 'bg-sky-50 border-sky-200',
    textColor: 'text-sky-700',
    description: 'Notifications informatives — records battus, optimisations appliquées, nouvelles opportunités identifiées.',
    triggers: [
      { name: 'Record d\'engagement battu', icon: 'ri-trophy-line', desc: 'Post, article ou newsletter avec performance record — documentation du pattern gagnant' },
      { name: 'Optimisation appliquée avec succès', icon: 'ri-check-double-line', desc: 'Confirmation qu\'une optimisation A/B test a produit un uplift significatif' },
      { name: 'Nouveau segment audience détecté', icon: 'ri-user-search-line', desc: 'Identification d\'un nouveau segment d\'audience engagé — recommandation de contenu ciblé' },
    ],
    action: 'Notification + documentation + capitalisation',
  },
];

// 7-DAY ROLLING AUDIT CYCLE
export const auditCycle = {
  title: 'Continuous Audit Cycle — Scan Automatique',
  description: 'Le moteur d\'audit exécute un cycle continu de surveillance, d\'analyse et d\'optimisation sur l\'ensemble des canaux digitaux. Les scans sont quotidiens pour les métriques temps réel (engagement, mentions, délivrabilité) et hebdomadaires pour les analyses approfondies (attribution cross-canal, sentiment, benchmarking).',
  dailyScans: [
    { time: '06:00', label: 'Morning Pulse', icon: 'ri-sun-line', desc: 'Scan des métriques overnight — engagement posts, mentions, erreurs email, pics trafic' },
    { time: '12:00', label: 'Midday Check', icon: 'ri-sun-fill', desc: 'Vérification mi-journée — performance des posts du matin, ajustements timing afternoon' },
    { time: '18:00', label: 'Evening Digest', icon: 'ri-moon-line', desc: 'Récapitulatif de la journée — top posts, conversions, alertes, tendances émergentes' },
    { time: '23:00', label: 'Night Audit', icon: 'ri-moon-fill', desc: 'Audit nocturne complet — consolidation, scoring multi-canal, génération du rapport quotidien' },
  ],
  weeklyScans: [
    { day: 'Lundi', label: 'Content Planning', icon: 'ri-calendar-line', desc: 'Analyse des meilleurs formats de la semaine précédente, recommandations éditoriales' },
    { day: 'Mercredi', label: 'Mid-Week Optimization', icon: 'ri-speed-line', desc: 'Ajustement des campagnes en cours, optimisation A/B, réallocation budget si ads' },
    { day: 'Vendredi', label: 'Weekly Executive Report', icon: 'ri-file-chart-line', desc: 'Rapport hebdomadaire complet — KPIs, alertes, insights, recommandations pour S+1' },
    { day: 'Dimanche', label: 'Benchmark & Strategy', icon: 'ri-compass-line', desc: 'Benchmark concurrentiel, analyse tendances sectorielles, recommandations stratégiques' },
  ],
};

// AI INSIGHT ENGINE
export const insightEngineDigital = {
  title: 'AI Insight Engine — Intelligence Digitale Automatique',
  description: 'Le moteur d\'insight génère automatiquement des analyses actionnables : identification des patterns de contenu gagnants, prédiction d\'engagement par format, recommandations de timing optimal, et détection des signaux faibles de crise réputationnelle.',
  categories: [
    {
      id: 'content-winners',
      title: '🏆 Content Winners Analysis',
      icon: 'ri-trophy-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Analyse automatisée des contenus les plus performants — identification des patterns gagnants par format, canal, audience et période.',
      items: [
        { name: 'Top Format Detector', desc: 'Identification automatique des formats les plus engageants : carrousel > article > vidéo > infographie, avec score de confiance' },
        { name: 'Timing Optimizer', desc: 'Analyse des jours et heures optimaux de publication par canal et par audience — recommandation de calendrier' },
        { name: 'Topic Trend Analyzer', desc: 'Détection des sujets émergents dans le secteur — régulation, LBC/FT, ESG, fintech — avec prédiction de viralité' },
        { name: 'Headline Effectiveness', desc: 'Analyse A/B des titres et accroches — longueur, ton, mots-clés, taux de clic prédit' },
      ],
    },
    {
      id: 'engagement-prediction',
      title: '📈 Engagement Prediction Engine',
      icon: 'ri-line-chart-line',
      color: 'from-sky-500 to-sky-600',
      description: 'Modèles prédictifs d\'engagement basés sur l\'historique — prédiction du reach, des interactions et du taux de conversion avant publication.',
      items: [
        { name: 'Pre-Publication Scoring', desc: 'Score prédictif d\'engagement (0-100) pour chaque contenu avant publication — validation éditoriale' },
        { name: 'Audience Fatigue Detection', desc: 'Détection de la saturation d\'audience — fréquence optimale, risque de désabonnement, diversification canaux' },
        { name: 'Viral Potential Score', desc: 'Prédiction de potentiel viral basé sur le sujet, le format, le timing et l\'audience cible' },
        { name: 'Conversion Probability', desc: 'Estimation du taux de conversion attendu — téléchargement, inscription, prise de rendez-vous' },
      ],
    },
    {
      id: 'sentiment-intelligence',
      title: '🧠 Sentiment & Reputation Intelligence',
      icon: 'ri-brain-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Analyse avancée du sentiment et de la réputation — NLP sur les commentaires, mentions et conversations sectorielles pour détecter les tendances et les risques.',
      items: [
        { name: 'NLP Sentiment Analysis', desc: 'Analyse du sentiment en langage naturel — classification positif/neutre/négatif avec nuances émotionnelles' },
        { name: 'Crisis Early Warning', desc: 'Détection précoce des signaux faibles de crise — volume mentions négatives, tonalité, vélocité, influenceurs impliqués' },
        { name: 'Brand Health Score', desc: 'Score de santé de marque composite — sentiment, reach, engagement, autorité, confiance — mis à jour quotidiennement' },
        { name: 'Competitor Sentiment Gap', desc: 'Analyse comparative du sentiment vs concurrents — opportunités de différenciation et de positionnement' },
      ],
    },
  ],
};

// AUTOMATION RULES ENGINE
export const automationRules = {
  title: 'Automation Rules Engine — Règles d\'Optimisation Automatique',
  description: 'Le moteur de règles définit les actions automatiques déclenchées en fonction des seuils de performance. Chaque règle est testée en environnement staging avant déploiement. Toute action critique nécessite une validation humaine.',
  rules: [
    {
      id: 'r1',
      title: 'Content Amplification Rule',
      icon: 'ri-megaphone-line',
      color: 'from-sky-500 to-sky-600',
      trigger: 'Post dépasse 2x l\'engagement moyen sur 4h',
      action: 'Amplification automatique : repost LinkedIn Company Page, tweet, ajout newsletter',
      approval: 'Automatique',
      safeguard: 'Max 3 amplifications / semaine pour éviter la saturation',
    },
    {
      id: 'r2',
      title: 'Email Subject Line Optimizer',
      icon: 'ri-mail-line',
      color: 'from-violet-500 to-violet-600',
      trigger: 'Taux d\'ouverture newsletter < 20% sur 2 envois',
      action: 'Génération automatique de 3 variantes de sujet A/B test, déploiement de la gagnante',
      approval: 'Automatique',
      safeguard: 'Test A/B limité à 20% de la liste, validation sur 2h avant full send',
    },
    {
      id: 'r3',
      title: 'Engagement Recovery',
      icon: 'ri-heart-pulse-line',
      color: 'from-emerald-500 to-emerald-600',
      trigger: 'Baisse d\'engagement > 30% sur 7 jours glissants',
      action: 'Analyse des causes, recommandation de pivot éditorial, proposition de 3 nouveaux formats',
      approval: 'Manuel (revue éditoriale)',
      safeguard: 'Changement progressif — test sur 1 semaine avant adoption complète',
    },
    {
      id: 'r4',
      title: 'Audience Re-engagement',
      icon: 'ri-user-heart-line',
      color: 'from-amber-500 to-amber-600',
      trigger: 'Abonné inactif > 60 jours (email) ou follower sans interaction > 90 jours (social)',
      action: 'Déclenchement séquence de ré-engagement personnalisée — contenu Best Of, sondage, offre exclusive',
      approval: 'Automatique (après validation initiale du template)',
      safeguard: 'Max 1 relance / 90 jours, désabonnement automatique après 2 tentatives sans réponse',
    },
    {
      id: 'r5',
      title: 'Crisis Containment Protocol',
      icon: 'ri-shield-flash-line',
      color: 'from-rose-500 to-rose-600',
      trigger: 'Volume mentions négatives > 3x la moyenne + tonalité agressive',
      action: 'Gel immédiat des publications programmées, alerte direction, proposition de communiqué',
      approval: 'Manuel obligatoire (direction + conseil)',
      safeguard: 'Gel automatique mais publication de réponse exclusivement manuelle',
    },
    {
      id: 'r6',
      title: 'Peak-Time Publishing',
      icon: 'ri-timer-flash-line',
      color: 'from-blue-500 to-blue-600',
      trigger: 'Analyse continue des heures de pic d\'engagement par audience',
      action: 'Ajustement automatique de l\'heure de publication pour maximiser le reach organique',
      approval: 'Automatique',
      safeguard: 'Fenêtre de publication flexible ±30 min, jamais hors business hours (6h-20h GMT)',
    },
  ],
};

// DASHBOARD STRUCTURE
export const dashboardStructureDigital = {
  title: 'Executive Digital Dashboard — 7 Panneaux',
  description: 'Interface de pilotage exécutif de la communication digitale — 7 panneaux couvrant l\'intégralité des canaux, des métriques et des insights. Design épuré, temps réel, recommandations actionnables.',
  panels: [
    {
      id: 'digital-health',
      title: '🟢 Digital Health Score',
      icon: 'ri-heart-pulse-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Score global 0-100 agrégé des 5 dimensions : Engagement, Conversion, Qualité Contenu, Email Performance, Réputation.',
      items: ['Engagement Score', 'Conversion Score', 'Content Quality', 'Email Health', 'Reputation'],
    },
    {
      id: 'realtime-pulse',
      title: '📡 Real-Time Pulse',
      icon: 'ri-pulse-line',
      color: 'from-sky-500 to-sky-600',
      description: 'Vue en direct de l\'activité digitale : derniers posts, engagement live, mentions récentes, alertes actives.',
      items: ['Posts Live Performance', 'Mentions (dernière heure)', 'Alertes Actives', 'Trafic Live Site'],
    },
    {
      id: 'channel-breakdown',
      title: '📊 Channel Performance Breakdown',
      icon: 'ri-bar-chart-grouped-line',
      color: 'from-violet-500 to-violet-600',
      description: 'Performance détaillée par canal : LinkedIn, Email, Blog, Webinaires, Livres Blancs — comparaison et tendances.',
      items: ['LinkedIn Score', 'Email Score', 'Blog Score', 'Webinar Score', 'White Paper Score'],
    },
    {
      id: 'content-feed',
      title: '📝 Content Performance Feed',
      icon: 'ri-article-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Top 10 contenus par engagement, portée et conversion — avec insights de réplication et recommandations.',
      items: ['Top Posts', 'Best Formats', 'Winning Topics', 'Conversion Leaders'],
    },
    {
      id: 'audience-insights',
      title: '👥 Audience Intelligence',
      icon: 'ri-user-heart-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Analyse des audiences : démographie, secteurs, fonctions, comportements — segmentation et opportunités.',
      items: ['Demographics', 'Industry Breakdown', 'Engagement by Segment', 'Growth Rate'],
    },
    {
      id: 'email-dashboard',
      title: '📧 Email & Automation Hub',
      icon: 'ri-mail-settings-line',
      color: 'from-rose-500 to-rose-600',
      description: 'Tableau de bord email : séquences actives, performances, délivrabilité, tests A/B, entonnoir de conversion.',
      items: ['Active Sequences', 'Performance Metrics', 'A/B Test Results', 'Conversion Funnel'],
    },
    {
      id: 'reputation-radar',
      title: '🛡️ Reputation Radar',
      icon: 'ri-radar-line',
      color: 'from-slate-500 to-slate-600',
      description: 'Surveillance de la réputation : mentions, sentiment, share of voice, risques détectés, actions recommandées.',
      items: ['Sentiment Trend', 'Mentions Volume', 'Share of Voice', 'Risk Alerts'],
    },
  ],
};

// AUTOMATED ACTIONS CATALOG
export const automatedActions = {
  title: 'Automated Actions Catalog — Ce que le moteur exécute automatiquement',
  description: 'Le moteur d\'audit ne se contente pas de mesurer — il agit. Voici le catalogue des actions automatisées que le système exécute en toute autonomie (après validation des règles de sécurité).',
  categories: [
    {
      id: 'content',
      title: 'Content Optimization',
      icon: 'ri-quill-pen-line',
      color: 'from-amber-500 to-amber-600',
      actions: [
        'Ajustement automatique des horaires de publication selon l\'engagement historique',
        'Repost intelligent des contenus evergreen performants (max 1/mois par contenu)',
        'Génération de variantes de titres A/B pour les newsletters à faible taux d\'ouverture',
        'Suggestion de reformatage — article long → carrousel LinkedIn, webinar → clips vidéo',
        'Détection des contenus en fin de vie et recommandation de refresh',
      ],
    },
    {
      id: 'distribution',
      title: 'Distribution & Amplification',
      icon: 'ri-broadcast-line',
      color: 'from-sky-500 to-sky-600',
      actions: [
        'Cross-posting automatique blog → LinkedIn article (avec adaptation du format)',
        'Ajout automatique des nouveaux articles à la newsletter hebdomadaire',
        'Programmation des posts sociaux basée sur le calendrier éditorial validé',
        'Amplification des posts performants via Company Page et profils exécutifs',
        'Soumission automatique aux agrégateurs et newsletters sectorielles',
      ],
    },
    {
      id: 'email',
      title: 'Email & Automation',
      icon: 'ri-mail-send-line',
      color: 'from-violet-500 to-violet-600',
      actions: [
        'Déclenchement des séquences de nurturing basé sur le lead scoring',
        'Nettoyage automatique des emails invalides et désabonnements (compliance RGPD)',
        'Optimisation du timing d\'envoi par segment (timezone, historique d\'ouverture)',
        'Réactivation automatique des abonnés dormants avec contenu Best Of',
        'Rapport hebdomadaire de performance email automatique aux équipes',
      ],
    },
    {
      id: 'monitoring',
      title: 'Monitoring & Alerts',
      icon: 'ri-radar-line',
      color: 'from-rose-500 to-rose-600',
      actions: [
        'Scan continu des mentions de marque et du sentiment (NLP)',
        'Détection précoce des crises réputationnelles — gel automatique des publications',
        'Alerte sur les pics anormaux de trafic, d\'engagement ou de désabonnement',
        'Benchmarking automatique vs 5 concurrents directs (engagement, contenu, croissance)',
        'Rapport exécutif hebdomadaire automatique — KPIs, insights, recommandations',
      ],
    },
  ],
};

// SAFE OPERATIONS RULES
export const safeOpsRulesDigital = [
  { title: 'Validation humaine pour toute communication externe de crise', icon: 'ri-shield-check-line', desc: 'Le moteur ne publie jamais de communiqué de crise sans validation explicite de la direction. Le gel des publications est automatique, la réponse est manuelle.' },
  { title: 'Respect strict du RGPD et des consentements', icon: 'ri-lock-line', desc: 'Toute action automatisée respecte les consentements collectés. Les désabonnements sont immédiats et irréversibles. Base de contacts régulièrement nettoyée.' },
  { title: 'Journalisation complète de toutes les actions automatisées', icon: 'ri-file-history-line', desc: 'Chaque action du moteur est journalisée avec timestamp, déclencheur, action exécutée et résultat. Piste d\'audit complète consultable.' },
  { title: 'Limitation de fréquence et anti-spam', icon: 'ri-speed-mini-line', desc: 'Des quotas stricts limitent le nombre d\'actions automatiques par jour et par canal pour éviter toute perception de spam ou de saturation.' },
  { title: 'Rollback immédiat disponible pour toute action', icon: 'ri-rewind-line', desc: 'Toute action automatisée peut être annulée en un clic. Les posts programmés peuvent être retirés, les emails stoppés, les amplifications annulées.' },
];

export const safeOpsProtocolDigital = 'Scanner → Analyser → Proposer → Valider (si requis) → Exécuter → Monitorer → Journaliser';

// OUTPUT FORMAT
export const outputFormatDigital = {
  title: 'Output Format Obligatoire — Rapport d\'Audit Digital',
  description: 'Chaque cycle d\'audit produit un rapport structuré en 7 sections. Le rapport est horodaté, versionné et conservé dans l\'historique pour analyse longitudinale des performances digitales.',
  items: [
    { step: '01', label: 'Digital Health Score', icon: 'ri-heart-pulse-line', desc: 'Score global 0-100 avec décomposition par canal et par pilier, tendance vs cycle précédent, comparaison benchmark.' },
    { step: '02', label: 'Channel Performance Breakdown', icon: 'ri-bar-chart-grouped-line', desc: 'Performance détaillée par canal (LinkedIn, Email, Blog, Webinaires, Livres Blancs) — métriques clés et tendances.' },
    { step: '03', label: 'Content Winners & Losers', icon: 'ri-trophy-line', desc: 'Top 10 contenus par engagement et conversion, bottom 5 avec analyse des causes, recommandations de réplication.' },
    { step: '04', label: 'Audience Insights', icon: 'ri-user-heart-line', desc: 'Évolution des audiences, nouveaux segments, comportements émergents, opportunités de ciblage.' },
    { step: '05', label: 'Sentiment & Reputation', icon: 'ri-emotion-happy-line', desc: 'Analyse du sentiment, mentions, share of voice, signaux de crise, recommandations réputationnelles.' },
    { step: '06', label: 'Automation Health', icon: 'ri-mail-settings-line', desc: 'Performance des séquences automatisées, délivrabilité, erreurs, optimisations appliquées, A/B test results.' },
    { step: '07', label: 'Actions & Recommendations', icon: 'ri-lightbulb-flash-line', desc: 'Actions exécutées automatiquement, actions recommandées pour validation humaine, prédictions pour le prochain cycle.' },
  ],
};

// TECH STACK
export const techStackDigital = {
  title: 'Stack Technologique — Digital Communication Intelligence',
  items: [
    { category: 'Social Media', icon: 'ri-share-line', technologies: ['LinkedIn API', 'Twitter/X API', 'Meta Business Suite', 'Hootsuite/Buffer API', 'Cron Scheduler'] },
    { category: 'Email', icon: 'ri-mail-line', technologies: ['Resend API', 'Supabase Edge Functions', 'Postmark', 'MJML Templates', 'DMARC Monitor'] },
    { category: 'Analytics', icon: 'ri-bar-chart-line', technologies: ['PostHog', 'Google Analytics 4', 'Plausible', 'Custom Event Tracking', 'UTM Builder'] },
    { category: 'Content AI', icon: 'ri-brain-line', technologies: ['KOS Automaton Engine', 'Claude API', 'LangChain', 'Vector Embeddings', 'RAG Pipeline'] },
    { category: 'Monitoring', icon: 'ri-radar-line', technologies: ['Brand24 API', 'Mention API', 'Google Alerts RSS', 'Custom Crawler', 'NLP Sentiment'] },
    { category: 'Automation', icon: 'ri-flow-chart', technologies: ['n8n/Zapier', 'Supabase Cron', 'Edge Functions', 'Webhook Handlers', 'Queue System'] },
  ],
};

// BIG FOUR DIGITAL GROWTH MODULES
export const bigFourDigitalModules = {
  title: 'Version « Big Four Digital Command Center » — 4 Modules',
  description: 'Si on pousse le concept au niveau cabinet de conseil de premier rang, on obtient un Command Center digital avec 4 modules intégrés couvrant toute la chaîne de valeur — de la stratégie de contenu au reporting exécutif.',
  modules: [
    {
      name: 'Digital Strategy Commander',
      icon: 'ri-compass-3-line',
      color: 'from-amber-500 to-amber-600',
      description: 'Définit la stratégie digitale globale : positionnement, calendrier éditorial, allocation canaux, budget, objectifs trimestriels.',
      components: ['Content Strategy', 'Channel Mix', 'Calendar Planning', 'Budget Allocation'],
    },
    {
      name: 'Content Factory AI',
      icon: 'ri-robot-2-line',
      color: 'from-sky-500 to-sky-600',
      description: 'Génère, optimise et adapte le contenu pour chaque canal : articles, posts, newsletters, scripts vidéo, livres blancs.',
      components: ['AI Content Gen', 'Format Adaptation', 'Quality Scoring', 'SEO Optimization'],
    },
    {
      name: 'Distribution & Amplification',
      icon: 'ri-broadcast-line',
      color: 'from-violet-500 to-violet-600',
      description: 'Orchestre la distribution omnicanale : programmation, cross-posting, amplification payante, partnerships.',
      components: ['Multi-Channel Posting', 'Paid Amplification', 'Influencer Outreach', 'Syndication'],
    },
    {
      name: 'Analytics & Command Center',
      icon: 'ri-dashboard-line',
      color: 'from-emerald-500 to-emerald-600',
      description: 'Tableau de bord exécutif temps réel : KPIs, alertes, insights, rapports automatiques, prédictions.',
      components: ['Real-Time Dashboard', 'Automated Reports', 'Predictive Alerts', 'Executive Briefings'],
    },
  ],
};

// CONCLUSION
export const digitalComConclusion = {
  title: 'Digital Communication Performance Audit Engine™ — L\'Auditeur Digital Autonome',
  body: 'Ce moteur est l\'auditeur permanent de la communication digitale KOS — celui qui scanne chaque canal, mesure chaque signal, optimise chaque point de contact, et alerte avant que les problèmes ne deviennent visibles. Il transforme la communication digitale d\'un centre de coût en un centre de profit mesurable, pilotable et prédictible.',
  pillars: [
    { label: 'Multi-Channel Intelligence', icon: 'ri-radar-line', desc: 'Audit unifié de tous les canaux — LinkedIn, Email, Blog, Webinaires, Livres Blancs, Réseaux Sociaux' },
    { label: 'Predictive Engagement', icon: 'ri-line-chart-line', desc: 'Prédiction de l\'engagement avant publication — optimisation proactive du contenu et du timing' },
    { label: 'Automated Optimization', icon: 'ri-settings-3-line', desc: 'Correction automatique des dérives — ajustement des horaires, sujets, formats et séquences' },
    { label: 'Reputation Guardian', icon: 'ri-shield-star-line', desc: 'Surveillance continue de la réputation — détection précoce des crises, protection de la marque' },
    { label: 'Executive Command Center', icon: 'ri-dashboard-line', desc: 'Pilotage exécutif temps réel — KPIs, insights, recommandations, rapports automatiques' },
  ],
  finalStatement: 'L\'auditeur digital qui transforme chaque signal en décision, chaque canal en levier de croissance, chaque contenu en actif stratégique. Le cockpit de la communication digitale KOS™.',
};

// Version Ultra
export const digitalComUltraMode = {
  title: '🔥 VERSION ULTRA — Activée',
  description: 'Lorsque le mode Ultra est activé, le Digital Communication Audit Engine déploie des capacités avancées :',
  features: [
    { name: 'AI Content Studio', icon: 'ri-robot-2-line', desc: 'Génération automatique de contenu multi-format optimisé pour chaque canal — articles, posts, newsletters, scripts vidéo' },
    { name: 'Predictive Viral Engine', icon: 'ri-rocket-2-line', desc: 'Modèle ML de prédiction de viralité — score de potentiel viral avant publication, recommandations d\'amplification' },
    { name: 'Cross-Channel Attribution AI', icon: 'ri-node-tree', desc: 'Attribution multi-touchpoint par IA — mesure de l\'influence relative de chaque canal sur la conversion' },
    { name: 'Competitor Digital Twin', icon: 'ri-user-settings-line', desc: 'Jumeau numérique des concurrents — simulation de leurs stratégies digitales, anticipation des mouvements' },
    { name: 'Sentiment Prediction Model', icon: 'ri-brain-line', desc: 'Modèle prédictif de sentiment — anticipation des réactions du public à un contenu avant publication' },
  ],
};