export interface QuestionOption {
  value: number;
  labelFr: string;
  labelEn: string;
}

export interface StrategicQuestion {
  id: string;
  axisId: string;
  questionFr: string;
  questionEn: string;
  options: QuestionOption[];
}

export interface StrategicAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: StrategicQuestion[];
}

export const STRATEGIC_AXES: StrategicAxis[] = [
  {
    id: 'vision',
    titleFr: 'Vision & Direction Stratégique',
    titleEn: 'Vision & Strategic Direction',
    descriptionFr: 'Clarté de la vision, plan stratégique, objectifs mesurables et culture d\'innovation.',
    descriptionEn: 'Clarity of vision, strategic plan, measurable objectives and innovation culture.',
    icon: 'ri-compass-3-line',
    color: '#0f766e',
    questions: [
      {
        id: 'vis-1',
        axisId: 'vision',
        questionFr: 'Votre organisation dispose-t-elle d\'une vision claire, partagée et documentée à horizon 3-5 ans ?',
        questionEn: 'Does your organization have a clear, shared and documented vision with a 3-5 year horizon?',
        options: [
          { value: 100, labelFr: 'Oui — Vision claire, documentée, communiquée à tous les collaborateurs', labelEn: 'Yes — Clear vision, documented, communicated to all employees' },
          { value: 50, labelFr: 'Partiellement — Vision implicite mais non formalisée', labelEn: 'Partially — Implicit vision but not formalized' },
          { value: 0, labelFr: 'Non — Aucune vision stratégique définie', labelEn: 'No — No strategic vision defined' },
          { value: -1, labelFr: 'N/A — Structure trop récente (< 1 an)', labelEn: 'N/A — Very recent structure (< 1 year)' },
        ],
      },
      {
        id: 'vis-2',
        axisId: 'vision',
        questionFr: 'Un plan stratégique opérationnel (avec objectifs, initiatives et budgets) est-il élaboré et suivi annuellement ?',
        questionEn: 'Is an operational strategic plan (with objectives, initiatives and budgets) developed and tracked annually?',
        options: [
          { value: 100, labelFr: 'Oui — Plan stratégique annuel, revue trimestrielle, indicateurs de suivi', labelEn: 'Yes — Annual strategic plan, quarterly review, tracking indicators' },
          { value: 50, labelFr: 'Partiellement — Plan existant mais suivi irrégulier', labelEn: 'Partially — Plan exists but irregular follow-up' },
          { value: 0, labelFr: 'Non — Aucun plan stratégique formalisé', labelEn: 'No — No formalized strategic plan' },
          { value: -1, labelFr: 'N/A — Activité purement réactive sans planification', labelEn: 'N/A — Purely reactive activity without planning' },
        ],
      },
      {
        id: 'vis-3',
        axisId: 'vision',
        questionFr: 'Les objectifs stratégiques sont-ils SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporellement définis) ?',
        questionEn: 'Are strategic objectives SMART (Specific, Measurable, Achievable, Realistic, Time-bound)?',
        options: [
          { value: 100, labelFr: 'Oui — Tous les objectifs sont SMART avec KPIs associés', labelEn: 'Yes — All objectives are SMART with associated KPIs' },
          { value: 50, labelFr: 'Partiellement — Quelques objectifs mesurables mais pas systématique', labelEn: 'Partially — Some measurable objectives but not systematic' },
          { value: 0, labelFr: 'Non — Objectifs vagues ou non mesurables', labelEn: 'No — Vague or non-measurable objectives' },
          { value: -1, labelFr: 'N/A — Pas d\'objectifs formalisés', labelEn: 'N/A — No formalized objectives' },
        ],
      },
      {
        id: 'vis-4',
        axisId: 'vision',
        questionFr: 'Votre organisation cultive-t-elle une culture d\'innovation et d\'amélioration continue (processus, produits, services) ?',
        questionEn: 'Does your organization cultivate a culture of innovation and continuous improvement (processes, products, services)?',
        options: [
          { value: 100, labelFr: 'Oui — Programme d\'innovation, suggestion box, budget R&D, veille technologique', labelEn: 'Yes — Innovation program, suggestion box, R&D budget, technology watch' },
          { value: 50, labelFr: 'Partiellement — Quelques initiatives ponctuelles d\'innovation', labelEn: 'Partially — Some occasional innovation initiatives' },
          { value: 0, labelFr: 'Non — Culture statique, résistance au changement', labelEn: 'No — Static culture, resistance to change' },
          { value: -1, labelFr: 'N/A — Secteur traditionnel sans besoin d\'innovation', labelEn: 'N/A — Traditional sector without innovation need' },
        ],
      },
      {
        id: 'vis-5',
        axisId: 'vision',
        questionFr: 'La direction est-elle capable d\'adapter rapidement la stratégie face aux changements de marché ou réglementaires ?',
        questionEn: 'Is management able to quickly adapt strategy in response to market or regulatory changes?',
        options: [
          { value: 100, labelFr: 'Oui — Processus d\'ajustement stratégique agile, revues mensuelles', labelEn: 'Yes — Agile strategic adjustment process, monthly reviews' },
          { value: 50, labelFr: 'Partiellement — Ajustements possibles mais lents', labelEn: 'Partially — Adjustments possible but slow' },
          { value: 0, labelFr: 'Non — Stratégie rigide, incapacité d\'adaptation', labelEn: 'No — Rigid strategy, inability to adapt' },
          { value: -1, labelFr: 'N/A — Environnement très stable', labelEn: 'N/A — Very stable environment' },
        ],
      },
    ],
  },
  {
    id: 'marche',
    titleFr: 'Positionnement & Marché',
    titleEn: 'Market Positioning',
    descriptionFr: 'Connaissance des clients, différenciation concurrentielle, veille et stratégie de croissance.',
    descriptionEn: 'Customer knowledge, competitive differentiation, intelligence and growth strategy.',
    icon: 'ri-global-line',
    color: '#d97706',
    questions: [
      {
        id: 'mar-1',
        axisId: 'marche',
        questionFr: 'Votre organisation dispose-t-elle d\'une connaissance approfondie de sa clientèle cible (besoins, comportements, segments) ?',
        questionEn: 'Does your organization have in-depth knowledge of its target clientele (needs, behaviors, segments)?',
        options: [
          { value: 100, labelFr: 'Oui — Études de marché régulières, personas clients, analyse de données', labelEn: 'Yes — Regular market studies, customer personas, data analysis' },
          { value: 50, labelFr: 'Partiellement — Connaissance empirique sans études formalisées', labelEn: 'Partially — Empirical knowledge without formalized studies' },
          { value: 0, labelFr: 'Non — Aucune connaissance structurée de la clientèle', labelEn: 'No — No structured knowledge of clientele' },
          { value: -1, labelFr: 'N/A — Clientèle unique et captive', labelEn: 'N/A — Single and captive clientele' },
        ],
      },
      {
        id: 'mar-2',
        axisId: 'marche',
        questionFr: 'Disposez-vous d\'un avantage concurrentiel clair et différenciant par rapport à vos concurrents directs ?',
        questionEn: 'Do you have a clear and differentiating competitive advantage over your direct competitors?',
        options: [
          { value: 100, labelFr: 'Oui — Avantage différenciant mesurable, protégé ou difficile à imiter', labelEn: 'Yes — Measurable differentiating advantage, protected or hard to imitate' },
          { value: 50, labelFr: 'Partiellement — Quelques différences mais non structurantes', labelEn: 'Partially — Some differences but not structural' },
          { value: 0, labelFr: 'Non — Aucun avantage concurrentiel identifiable', labelEn: 'No — No identifiable competitive advantage' },
          { value: -1, labelFr: 'N/A — Monopole local ou absence de concurrence', labelEn: 'N/A — Local monopoly or no competition' },
        ],
      },
      {
        id: 'mar-3',
        axisId: 'marche',
        questionFr: 'Une veille concurrentielle et sectorielle est-elle organisée régulièrement pour anticiper les évolutions ?',
        questionEn: 'Is competitive and sector intelligence organized regularly to anticipate changes?',
        options: [
          { value: 100, labelFr: 'Oui — Veille structurée, rapports mensuels, alertes concurrentielles', labelEn: 'Yes — Structured intelligence, monthly reports, competitive alerts' },
          { value: 50, labelFr: 'Partiellement — Veille informelle via réseau personnel', labelEn: 'Partially — Informal intelligence via personal network' },
          { value: 0, labelFr: 'Non — Aucune veille concurrentielle organisée', labelEn: 'No — No organized competitive intelligence' },
          { value: -1, labelFr: 'N/A — Secteur stable sans évolution significative', labelEn: 'N/A — Stable sector without significant evolution' },
        ],
      },
      {
        id: 'mar-4',
        axisId: 'marche',
        questionFr: 'Votre stratégie marketing et commerciale est-elle formalisée avec des canaux définis et un budget alloué ?',
        questionEn: 'Is your marketing and sales strategy formalized with defined channels and an allocated budget?',
        options: [
          { value: 100, labelFr: 'Oui — Plan marketing annuel, canaux définis, budget, KPIs de conversion', labelEn: 'Yes — Annual marketing plan, defined channels, budget, conversion KPIs' },
          { value: 50, labelFr: 'Partiellement — Actions marketing ponctuelles sans plan', labelEn: 'Partially — Occasional marketing actions without plan' },
          { value: 0, labelFr: 'Non — Aucune stratégie marketing formalisée', labelEn: 'No — No formalized marketing strategy' },
          { value: -1, labelFr: 'N/A — Croissance organique sans besoin marketing', labelEn: 'N/A — Organic growth without marketing need' },
        ],
      },
      {
        id: 'mar-5',
        axisId: 'marche',
        questionFr: 'Une stratégie de croissance (organique, acquisition, partenariat, nouveaux marchés) est-elle définie et mise en œuvre ?',
        questionEn: 'Is a growth strategy (organic, acquisition, partnership, new markets) defined and implemented?',
        options: [
          { value: 100, labelFr: 'Oui — Stratégie de croissance claire, pipeline de projets, partenariats actifs', labelEn: 'Yes — Clear growth strategy, project pipeline, active partnerships' },
          { value: 50, labelFr: 'Partiellement — Opportunités saisies mais sans stratégie formalisée', labelEn: 'Partially — Opportunities seized but without formalized strategy' },
          { value: 0, labelFr: 'Non — Aucune stratégie de croissance, stagnation', labelEn: 'No — No growth strategy, stagnation' },
          { value: -1, labelFr: 'N/A — Objectif de maintien plutôt que croissance', labelEn: 'N/A — Maintenance objective rather than growth' },
        ],
      },
    ],
  },
  {
    id: 'modele',
    titleFr: 'Modèle Économique & Performance',
    titleEn: 'Business Model & Performance',
    descriptionFr: 'Viabilité financière, diversification des revenus, rentabilité et structure des coûts.',
    descriptionEn: 'Financial viability, revenue diversification, profitability and cost structure.',
    icon: 'ri-line-chart-line',
    color: '#be185d',
    questions: [
      {
        id: 'mod-1',
        axisId: 'modele',
        questionFr: 'Votre modèle économique est-il clairement défini avec des flux de revenus identifiables et stables ?',
        questionEn: 'Is your business model clearly defined with identifiable and stable revenue streams?',
        options: [
          { value: 100, labelFr: 'Oui — Modèle clair, revenus récurrents, prévisibilité > 80%', labelEn: 'Yes — Clear model, recurring revenue, > 80% predictability' },
          { value: 50, labelFr: 'Partiellement — Revenus identifiables mais volatils', labelEn: 'Partially — Identifiable but volatile revenues' },
          { value: 0, labelFr: 'Non — Modèle économique confus ou non viable', labelEn: 'No — Confused or non-viable business model' },
          { value: -1, labelFr: 'N/A — Organisation à but non lucratif', labelEn: 'N/A — Non-profit organization' },
        ],
      },
      {
        id: 'mod-2',
        axisId: 'modele',
        questionFr: 'Les revenus sont-ils diversifiés (plusieurs sources, segments clients, produits/services) ?',
        questionEn: 'Are revenues diversified (multiple sources, customer segments, products/services)?',
        options: [
          { value: 100, labelFr: 'Oui — 3+ sources de revenus, aucune ne représente > 50%', labelEn: 'Yes — 3+ revenue sources, none representing > 50%' },
          { value: 50, labelFr: 'Partiellement — 2 sources de revenus, dépendance modérée', labelEn: 'Partially — 2 revenue sources, moderate dependency' },
          { value: 0, labelFr: 'Non — Dépendance totale à une seule source de revenus', labelEn: 'No — Total dependency on a single revenue source' },
          { value: -1, labelFr: 'N/A — Modèle mono-produit obligatoire', labelEn: 'N/A — Mandatory single-product model' },
        ],
      },
      {
        id: 'mod-3',
        axisId: 'modele',
        questionFr: 'Votre organisation est-elle rentable (ou sur une trajectoire de rentabilité clairement définie) ?',
        questionEn: 'Is your organization profitable (or on a clearly defined profitability trajectory)?',
        options: [
          { value: 100, labelFr: 'Oui — Rentable depuis 2+ ans, marge nette positive, croissance des bénéfices', labelEn: 'Yes — Profitable for 2+ years, positive net margin, profit growth' },
          { value: 50, labelFr: 'Partiellement — Seuil de rentabilité atteint mais marge faible', labelEn: 'Partially — Break-even reached but low margin' },
          { value: 0, labelFr: 'Non — Pertes récurrentes, pas de visibilité sur la rentabilité', labelEn: 'No — Recurring losses, no visibility on profitability' },
          { value: -1, labelFr: 'N/A — Startup en phase d\'amorçage (< 2 ans)', labelEn: 'N/A — Startup in seed phase (< 2 years)' },
        ],
      },
      {
        id: 'mod-4',
        axisId: 'modele',
        questionFr: 'La structure des coûts est-elle optimisée avec un contrôle régulier des dépenses et des indicateurs de productivité ?',
        questionEn: 'Is the cost structure optimized with regular expense control and productivity indicators?',
        options: [
          { value: 100, labelFr: 'Oui — Budget contrôlé mensuellement, indicateurs de productivité, optimisation continue', labelEn: 'Yes — Budget controlled monthly, productivity indicators, continuous optimization' },
          { value: 50, labelFr: 'Partiellement — Contrôle des coûts ponctuel sans indicateurs', labelEn: 'Partially — Occasional cost control without indicators' },
          { value: 0, labelFr: 'Non — Aucun contrôle des coûts, dépenses non maîtrisées', labelEn: 'No — No cost control, uncontrolled expenses' },
          { value: -1, labelFr: 'N/A — Structure très légère sans coûts significatifs', labelEn: 'N/A — Very light structure without significant costs' },
        ],
      },
      {
        id: 'mod-5',
        axisId: 'modele',
        questionFr: 'Votre organisation dispose-t-elle d\'un financement adapté à ses besoins (fonds propres, dette, subventions) ?',
        questionEn: 'Does your organization have financing suited to its needs (equity, debt, grants)?',
        options: [
          { value: 100, labelFr: 'Oui — Mix de financement équilibré, trésorerie saine, accès au crédit', labelEn: 'Yes — Balanced financing mix, healthy cash flow, credit access' },
          { value: 50, labelFr: 'Partiellement — Financement insuffisant mais relations bancaires existantes', labelEn: 'Partially — Insufficient financing but existing banking relationships' },
          { value: 0, labelFr: 'Non — Sous-financement chronique, difficultés de trésorerie', labelEn: 'No — Chronic underfunding, cash flow difficulties' },
          { value: -1, labelFr: 'N/A — Financement entièrement assuré par la maison mère', labelEn: 'N/A — Financing fully provided by parent company' },
        ],
      },
    ],
  },
];

export const TOTAL_QUESTIONS = STRATEGIC_AXES.reduce(
  (sum, a) => sum + a.questions.length,
  0
);

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22a05a';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

export function getScoreLabel(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Maturité Stratégique Avancée';
    if (score >= 50) return 'Maturité Stratégique Intermédiaire';
    return 'Maturité Stratégique Faible';
  }
  if (score >= 80) return 'Advanced Strategic Maturity';
  if (score >= 50) return 'Intermediate Strategic Maturity';
  return 'Low Strategic Maturity';
}

export function getMaturityLevel(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Avancé';
    if (score >= 50) return 'Intermédiaire';
    return 'Faible';
  }
  if (score >= 80) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  return 'Low';
}

export function getReadinessIndicator(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Prêt pour la croissance accélérée et la levée de fonds';
    if (score >= 60) return 'Préparation recommandée avant expansion significative';
    return 'Accompagnement stratégique prioritaire nécessaire';
  }
  if (score >= 80) return 'Ready for accelerated growth and fundraising';
  if (score >= 60) return 'Preparation recommended before significant expansion';
  return 'Priority strategic support needed';
}

export function getRecommendations(
  axisScores: Record<string, number>,
  globalScore: number,
  lang: string
): Array<{ title: string; items: string[] }> {
  const recs: Array<{ title: string; items: string[] }> = [];

  if (lang === 'fr') {
    if (globalScore < 50) {
      recs.push({
        title: 'Urgent — Fondations stratégiques à construire',
        items: [
          'Formaliser une vision claire à 3-5 ans avec les parties prenantes clés',
          'Élaborer un plan stratégique opérationnel avec objectifs SMART et budget',
          'Réaliser une étude de marché pour comprendre la clientèle et la concurrence',
          'Structurer le modèle économique et sécuriser le financement de base',
        ],
      });
    } else if (globalScore < 80) {
      recs.push({
        title: 'Renforcement — Optimisation de la maturité stratégique',
        items: [
          'Renforcer la culture d\'innovation avec un programme structuré et un budget dédié',
          'Développer une stratégie marketing formalisée avec canaux et indicateurs de performance',
          'Diversifier les sources de revenus pour réduire les dépendances',
          'Mettre en place un tableau de bord stratégique avec revue mensuelle',
        ],
      });
    } else {
      recs.push({
        title: 'Excellence — Accélération et leadership',
        items: [
          'Anticiper les disruptions sectorielles et préparer des scénarios stratégiques',
          'Développer des partenariats stratégiques pour accélérer la croissance',
          'Envisager une levée de fonds ou une expansion géographique structurée',
          'Institutionnaliser les bonnes pratiques et former les futurs leaders',
        ],
      });
    }

    const weakAxes = Object.entries(axisScores).filter(([, s]) => s < 50);
    if (weakAxes.length > 0) {
      const axisNames = weakAxes
        .map(([id]) => STRATEGIC_AXES.find((a) => a.id === id)?.titleFr)
        .filter(Boolean)
        .join(', ');
      recs.push({
        title: `Axes à renforcer : ${axisNames}`,
        items: weakAxes.map(([id]) => {
          const axis = STRATEGIC_AXES.find((a) => a.id === id);
          return `Prioriser les actions dans l\'axe "${axis?.titleFr}" — score actuel : ${axisScores[id]}/100`;
        }),
      });
    }
  } else {
    if (globalScore < 50) {
      recs.push({
        title: 'Urgent — Strategic Foundations to Build',
        items: [
          'Formalize a clear 3-5 year vision with key stakeholders',
          'Develop an operational strategic plan with SMART objectives and budget',
          'Conduct a market study to understand clientele and competition',
          'Structure the business model and secure basic financing',
        ],
      });
    } else if (globalScore < 80) {
      recs.push({
        title: 'Strengthening — Strategic Maturity Optimization',
        items: [
          'Strengthen innovation culture with a structured program and dedicated budget',
          'Develop a formalized marketing strategy with channels and performance indicators',
          'Diversify revenue sources to reduce dependencies',
          'Set up a strategic dashboard with monthly review',
        ],
      });
    } else {
      recs.push({
        title: 'Excellence — Acceleration and Leadership',
        items: [
          'Anticipate sector disruptions and prepare strategic scenarios',
          'Develop strategic partnerships to accelerate growth',
          'Consider fundraising or structured geographic expansion',
          'Institutionalize best practices and train future leaders',
        ],
      });
    }

    const weakAxes = Object.entries(axisScores).filter(([, s]) => s < 50);
    if (weakAxes.length > 0) {
      const axisNames = weakAxes
        .map(([id]) => STRATEGIC_AXES.find((a) => a.id === id)?.titleEn)
        .filter(Boolean)
        .join(', ');
      recs.push({
        title: `Axes to strengthen: ${axisNames}`,
        items: weakAxes.map(([id]) => {
          const axis = STRATEGIC_AXES.find((a) => a.id === id);
          return `Prioritize actions in the "${axis?.titleEn}" axis — current score: ${axisScores[id]}/100`;
        }),
      });
    }
  }

  return recs;
}

export function getRisks(globalScore: number, lang: string): string[] {
  if (lang === 'fr') {
    if (globalScore < 50) {
      return [
        'Risque de dérive stratégique : perte de direction et d\'objectifs clairs',
        'Risque de perte de compétitivité face à des concurrents plus structurés',
        'Risque financier : difficultés de trésorerie liées à un modèle économique fragile',
        'Risque de stagnation : incapacité à capter de nouvelles opportunités de marché',
        'Risque de démotivation : absence de vision partagée impactant l\'engagement des équipes',
      ];
    }
    if (globalScore < 80) {
      return [
        'Risque de croissance limitée par un positionnement marché insuffisamment différencié',
        'Risque de dépendance à une source de revenus unique',
        'Risque de retard stratégique face aux évolutions du marché africain',
        'Risque de sous-performance financière lié à un contrôle des coûts perfectible',
      ];
    }
    return [
      'Risque résiduel lié à l\'évolution rapide du contexte économique africain',
      'Risque de complaisance : maintenir la vigilance malgré la bonne performance',
      'Risque de scalabilité : adapter les processus en cas de croissance rapide',
    ];
  }
  if (globalScore < 50) {
    return [
      'Risk of strategic drift: loss of clear direction and objectives',
      'Risk of loss of competitiveness against more structured competitors',
      'Financial risk: cash flow difficulties linked to a fragile business model',
      'Risk of stagnation: inability to capture new market opportunities',
      'Risk of demotivation: lack of shared vision impacting team engagement',
    ];
  }
  if (globalScore < 80) {
    return [
      'Risk of limited growth due to insufficiently differentiated market positioning',
      'Risk of dependency on a single revenue source',
      'Risk of strategic lag behind African market evolutions',
      'Risk of financial underperformance linked to improvable cost control',
    ];
  }
  return [
    'Residual risk linked to the rapid evolution of the African economic context',
    'Risk of complacency: maintain vigilance despite good performance',
    'Scalability risk: adapt processes in case of rapid growth',
  ];
}



