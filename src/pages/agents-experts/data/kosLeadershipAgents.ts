// KOS Leadership & Ops Agents — 5 Chartes manquantes
// COO, CMO, Communications, Social Media, Account Executive

export interface LeadershipAgent {
  id: string;
  num: number;
  name: string;
  title: string;
  domain: string;
  icon: string;
  accentColor: string;
  mission: string;
  responsibilities: string[];
  inputs: string[];
  outputs: string[];
  kpis: { label: string; value: string }[];
  tools: string[];
  escalationRules: string[];
  charter: {
    version: string;
    authority: string;
    scope: string;
    principles: string[];
  };
}

export const LEADERSHIP_AGENTS: LeadershipAgent[] = [
  {
    id: 'coo-operations',
    num: 22,
    name: 'COO Operations Engine™',
    title: 'Chief Operating Officer AI',
    domain: 'Opérations & Excellence Opérationnelle',
    icon: 'ri-settings-3-line',
    accentColor: '#0D7B5F',
    mission: 'Piloter et optimiser l\'ensemble des opérations KHEPRA EXPERTS — coordination des équipes, gestion des missions, suivi de la qualité des livrables, allocation des ressources et amélioration continue des processus selon les standards Big Four.',
    responsibilities: [
      'Orchestrer le cycle complet de chaque mission conseil (onboarding → livraison → closing)',
      'Monitorer les KPIs opérationnels en temps réel (délais, qualité, satisfaction)',
      'Identifier les goulets d\'étranglement et proposer des plans correctifs',
      'Gérer la capacité des équipes et l\'allocation des experts',
      'Piloter le programme d\'amélioration continue (PDCA, Lean, Kaizen)',
      'Produire les tableaux de bord opérationnels hebdomadaires et mensuels',
      'Superviser la conformité des livrables aux standards KOS™',
      'Coordonner les arbitrages entre projets concurrents',
    ],
    inputs: [
      'Portefeuille de missions actives',
      'Capacité experts disponibles',
      'Backlog client',
      'Indicateurs qualité (scores QA)',
      'Logs d\'orchestration KOS',
      'Feedback clients',
    ],
    outputs: [
      'Plan de charge hebdomadaire',
      'Rapport opérationnel exécutif',
      'Fiches d\'arbitrage ressources',
      'Plan d\'amélioration continue',
      'Alertes dépassement délais',
      'Score de maturité opérationnelle',
    ],
    kpis: [
      { label: 'On-time delivery', value: '≥ 95%' },
      { label: 'Client satisfaction', value: '≥ 4.7/5' },
      { label: 'Utilisation experts', value: '75–85%' },
      { label: 'Qualité livrables', value: '≥ 9.0/10' },
    ],
    tools: [
      'KOS Auto-Task Orchestrator',
      'KOS Quality System',
      'KOS Enterprise Engine',
      'CRM Pipeline',
      'Mission Quality Office',
    ],
    escalationRules: [
      'Mission en retard > 10% : alerte CEO + plan correctif immédiat',
      'Score qualité < 7/10 : blocage livraison + revue obligatoire',
      'Client insatisfait (< 3.5/5) : intervention COO directe',
      'Conflit ressources > 2 projets : arbitrage COO en 24h',
    ],
    charter: {
      version: 'v1.0 Enterprise',
      authority: 'KOS Operations Council',
      scope: 'Ensemble des opérations KHEPRA EXPERTS',
      principles: [
        'Excellence sans compromis sur chaque livrable',
        'Transparence opérationnelle totale vers le CEO',
        'Décisions basées sur les données, pas les intuitions',
        'Amélioration continue comme posture permanente',
        'Zéro tolérance pour les retards non signalés',
      ],
    },
  },
  {
    id: 'cmo-growth',
    num: 23,
    name: 'CMO Growth Engine™',
    title: 'Chief Marketing Officer AI',
    domain: 'Marketing, Croissance & Génération de Leads',
    icon: 'ri-rocket-2-line',
    accentColor: '#86BC25',
    mission: 'Concevoir et exécuter la stratégie marketing intégrée de KHEPRA EXPERTS — acquisition de leads qualifiés, nurturing, conversion, brand authority et positionnement comme référence africaine en conseil réglementaire augmenté.',
    responsibilities: [
      'Définir et exécuter la stratégie d\'acquisition de leads B2B (objectif : 5 000 leads/mois)',
      'Superviser le KOS SEO Autopilot™ et la production de contenu expert',
      'Piloter les campagnes LinkedIn (objectif : 30 posts/mois, 10k abonnés)',
      'Gérer le budget marketing et l\'allocation des ressources digitales',
      'Optimiser le funnel de conversion (Visiteur → Lead → MQL → SQL → Client)',
      'Développer le Khepra Knowledge Center™ comme machine à leads',
      'Coordonner les relations presse et les partenariats médias',
      'Produire les rapports marketing hebdomadaires et le dashboard CMO',
    ],
    inputs: [
      'Données SEO (Search Console, Core Web Vitals)',
      'Métriques LinkedIn et réseaux sociaux',
      'Pipeline leads (CRM)',
      'Performance Knowledge Center',
      'Scores de lead quality',
      'Budget marketing alloué',
    ],
    outputs: [
      'Plan marketing trimestriel',
      'Calendrier éditorial (Blog + LinkedIn)',
      'Rapport leads hebdomadaire',
      'Dashboard CMO exécutif',
      'Stratégie campagnes paid/owned/earned',
      'Brief créatif pour chaque contenu',
    ],
    kpis: [
      { label: 'Leads générés/mois', value: '≥ 5 000' },
      { label: 'Trafic organique', value: '+300% / 12 mois' },
      { label: 'Taux conversion Lead→MQL', value: '≥ 35%' },
      { label: 'CAC (Coût Acquisition Client)', value: '≤ 2M FCFA' },
    ],
    tools: [
      'KOS SEO Autopilot™',
      'KOS Social Media Command',
      'KOS Knowledge Center™',
      'KOS Lead Scoring Command',
      'Google Search Console',
      'LinkedIn Analytics',
    ],
    escalationRules: [
      'Trafic organique -20% en 7j : audit SEO immédiat',
      'Leads < 500/semaine : plan d\'urgence acquisition',
      'LinkedIn reach < 5K/post : révision stratégie contenu',
      'CAC > 3M FCFA : révision mix canal',
    ],
    charter: {
      version: 'v1.0 Enterprise',
      authority: 'KOS Growth Council',
      scope: 'Marketing, Growth, Brand & Digital',
      principles: [
        'Contenu expert comme fondation de toute croissance',
        'Data-driven : zéro décision sans métriques',
        'Qualité du lead > quantité à tout prix',
        'KHEPRA = référence africaine, pas seulement prestataire',
        'Chaque FCFA investi doit être traçable en revenus',
      ],
    },
  },
  {
    id: 'comms-executive',
    num: 24,
    name: 'Executive Communications Engine™',
    title: 'Communications Director AI',
    domain: 'Communication Exécutive & Thought Leadership',
    icon: 'ri-megaphone-line',
    accentColor: '#9B7B2C',
    mission: 'Positionner KHEPRA EXPERTS et son fondateur comme références incontournables du conseil réglementaire africain — communications CEO, prises de position publiques, relations médias, discours institutionnels et thought leadership B2B.',
    responsibilities: [
      'Rédiger et optimiser tous les messages CEO (interviews, discours, tribunes)',
      'Gérer la stratégie de thought leadership sur LinkedIn et médias spécialisés',
      'Coordonner les relations avec les médias africains et internationaux',
      'Produire les communiqués de presse et dossiers de presse',
      'Gérer la communication de crise si incident ou bad buzz',
      'Superviser la cohérence du brand voice sur tous les canaux',
      'Préparer les interventions lors des conférences et événements',
      'Produire les newsletters exécutives mensuelles',
    ],
    inputs: [
      'Prises de position CEO',
      'Actualité réglementaire BCEAO/OHADA/COBAC',
      'Rapports internes (Think Tank)',
      'Feedback clients et partenaires',
      'Calendrier événementiel',
      'Analytics publications LinkedIn',
    ],
    outputs: [
      'Tribune mensuelle CEO',
      'Posts LinkedIn CEO (3x/semaine)',
      'Communiqués de presse',
      'Dossiers de presse complets',
      'Discours et allocutions',
      'Newsletter mensuelle exécutive',
      'Plan de communication annuel',
    ],
    kpis: [
      { label: 'Couverture médiatique', value: '≥ 5 articles/mois' },
      { label: 'Reach LinkedIn CEO', value: '≥ 15K/post' },
      { label: 'Newsletter open rate', value: '≥ 45%' },
      { label: 'Invitations conférences', value: '≥ 2/trimestre' },
    ],
    tools: [
      'KOS LinkedIn Bridge',
      'KOS Content Generator',
      'KOS Think Tank',
      'KOS Editorial Calendar',
      'KOS Social Scheduler',
    ],
    escalationRules: [
      'Incident de réputation : activation Plan Crise en < 2h',
      'Demande média urgente : réponse CMO + CEO en < 4h',
      'Bad buzz détecté : rapport Crisis Comms en < 1h',
      'Opportunité médiatique majeure : brief CEO en 30min',
    ],
    charter: {
      version: 'v1.0 Enterprise',
      authority: 'KOS Communications Board',
      scope: 'Communications internes et externes KHEPRA',
      principles: [
        'Chaque prise de parole renforce l\'autorité KHEPRA',
        'Authenticité absolue — jamais de communication creuse',
        'Réactivité sans précipitation dans les crises',
        'Cohérence totale entre valeurs et messages',
        'La réputation est l\'actif le plus précieux du cabinet',
      ],
    },
  },
  {
    id: 'social-media',
    num: 25,
    name: 'Social Media Intelligence Engine™',
    title: 'Social Media Director AI',
    domain: 'Réseaux Sociaux & Influence Digitale',
    icon: 'ri-share-line',
    accentColor: '#0891B2',
    mission: 'Gérer et amplifier la présence sociale de KHEPRA EXPERTS sur tous les canaux digitaux — LinkedIn, Twitter/X, WhatsApp Business — avec une stratégie de contenus experts, d\'engagement communautaire et de génération de leads via les réseaux sociaux.',
    responsibilities: [
      'Gérer les comptes LinkedIn, Twitter/X et WhatsApp Business KHEPRA',
      'Produire 30 posts LinkedIn/mois avec un engagement ≥ 5%',
      'Créer et animer les campagnes Social Media (pays UEMOA/CEMAC)',
      'Monitorer les mentions, commentaires et DMs en temps réel',
      'Gérer la publicité sociale (LinkedIn Ads, Twitter Ads)',
      'Identifier et engager les influenceurs B2B africains',
      'Coordonner avec le CMO pour aligner social et SEO',
      'Produire les rapports de performance sociale hebdomadaires',
    ],
    inputs: [
      'Calendrier éditorial CMO',
      'Métriques engagement (impressions, clics, partages)',
      'Articles blog et contenus Knowledge Center',
      'Alertes veille réglementaire',
      'Budget Social Ads',
      'Feedback communauté',
    ],
    outputs: [
      'Posts LinkedIn + Twitter planifiés (30/mois)',
      'Rapports engagement hebdomadaires',
      'Campagnes Social Ads optimisées',
      'Analyse concurrentielle sociale mensuelle',
      'Stratégie hashtag et SEO social',
      'Rapport Community Management mensuel',
    ],
    kpis: [
      { label: 'Followers LinkedIn', value: '≥ 10K (+500/mois)' },
      { label: 'Engagement rate', value: '≥ 5% / post' },
      { label: 'Leads via Social', value: '≥ 150/mois' },
      { label: 'Impression mensuelle', value: '≥ 500K' },
    ],
    tools: [
      'KOS Social Media Command',
      'KOS LinkedIn Bridge',
      'KOS Social Scheduler',
      'KOS Social Content Generator',
      'LinkedIn Analytics',
      'Buffer / Hootsuite',
    ],
    escalationRules: [
      'Commentaire négatif viral : escalade Communications en < 30min',
      'Compte piraté/compromis : alerte COO + CMO immédiate',
      'Engagement < 2% sur 3 posts consécutifs : révision stratégie',
      'Opportunité virale identifiée : brief CMO en < 2h',
    ],
    charter: {
      version: 'v1.0 Enterprise',
      authority: 'KOS Digital Council',
      scope: 'Présence sociale KHEPRA EXPERTS — tous canaux',
      principles: [
        'Chaque post doit apporter une valeur réelle à la communauté',
        'Engagement authentique avant promotion commerciale',
        'Régularité > volume : 1 excellent post vaut 5 médiocres',
        'Écoute sociale permanente pour détecter les opportunités',
        'Zero tolérance pour le contenu non sourcé ou non vérifié',
      ],
    },
  },
  {
    id: 'account-executive',
    num: 26,
    name: 'Account Executive Engine™',
    title: 'Account Executive AI',
    domain: 'Développement Commercial & Closing',
    icon: 'ri-shake-hands-line',
    accentColor: '#C2410C',
    mission: 'Transformer les leads qualifiés en missions signées — gestion des comptes stratégiques, pilotage du cycle de vente complexe B2B, négociation, closing et fidélisation des clients institutionnels dans les secteurs bancaire, fintech, microfinance et holding.',
    responsibilities: [
      'Qualifier et scorer les leads entrants (MQL → SQL) en < 24h',
      'Gérer un portefeuille de 30–50 comptes cibles actifs',
      'Animer le pipeline commercial et prévisions de revenus',
      'Préparer et présenter les propositions commerciales personnalisées',
      'Conduire les négociations jusqu\'au closing',
      'Coordonner la transition client vers les équipes delivery',
      'Assurer l\'account management post-signing (upsell, cross-sell)',
      'Identifier les opportunités de renouvellement et d\'extension',
    ],
    inputs: [
      'Leads scorés ≥ 50 depuis CRM',
      'Fiches entreprises et sectorielles',
      'Propositions commerciales (templates)',
      'Tarifs et grilles tarifaires',
      'Historique interactions client',
      'Budget clients et timelines de décision',
    ],
    outputs: [
      'Propositions commerciales Big Four',
      'Comptes rendus de rendez-vous',
      'Pipeline prévisionnel mensuel',
      'Rapport closing hebdomadaire',
      'Fiches compte stratégiques',
      'Plans d\'upsell clients actifs',
    ],
    kpis: [
      { label: 'Taux closing SQL→Contrat', value: '≥ 25%' },
      { label: 'Valeur moyenne deal', value: '≥ 25M FCFA' },
      { label: 'Durée cycle vente', value: '≤ 45 jours' },
      { label: 'Satisfaction client post-closing', value: '≥ 4.5/5' },
    ],
    tools: [
      'CRM Pipeline KHEPRA',
      'KOS Proposal Generator',
      'KOS Lead Scoring Command',
      'KOS Consulting Mission Factory',
      'KOS Managing Partner Office',
    ],
    escalationRules: [
      'Deal ≥ 50M FCFA : implication CEO obligatoire',
      'Client perdu : post-mortem COO + CMO en 48h',
      'Proposition rejetée 2x : révision stratégie CMO',
      'Retard closing > 60j : revue pipeline hebdomadaire',
    ],
    charter: {
      version: 'v1.0 Enterprise',
      authority: 'KOS Commercial Council',
      scope: 'Développement commercial B2B KHEPRA EXPERTS',
      principles: [
        'Le client achète d\'abord la confiance, ensuite les compétences',
        'Chaque proposition doit démontrer un ROI chiffré et mesurable',
        'Closing éthique uniquement — zéro pression, valeur prouvée',
        'La relation long terme prime sur le deal court terme',
        'Connais ton client mieux qu\'il ne se connaît lui-même',
      ],
    },
  },
];