import type { DiagnosticToolConfig } from '';

const FORM_URL = 'https://readdy.ai/api/form/d7o8h0n10h3ggjn1df60';

function getScoreColor(score: number): string {
  if (score >= 71) return '#059669';
  if (score >= 41) return '#d97706';
  return '#dc2626';
}

function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Prêt pour la levée de fonds' : 'Ready for fundraising';
  if (score >= 41) return isFr ? 'Préparation intermédiaire' : 'Intermediate preparation';
  return isFr ? 'Préparation insuffisante' : 'Insufficient preparation';
}

function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Avancé' : 'Advanced';
  if (score >= 41) return isFr ? 'Intermédiaire' : 'Intermediate';
  return isFr ? 'Critique' : 'Critical';
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Profil très attractif pour les investisseurs' : 'Very attractive profile for investors';
  if (score >= 60) return isFr ? 'Profil intéressant avec quelques points à renforcer' : 'Interesting profile with some areas to strengthen';
  if (score >= 40) return isFr ? 'Profil potentiel mais travail de préparation nécessaire' : 'Potential profile but preparation work needed';
  return isFr ? 'Profil non prêt pour une levée de fonds' : 'Profile not ready for fundraising';
}

function getRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = !lang.startsWith('en');
  if (globalScore >= 71) {
    return isFr
      ? ['Valorisation potentiellement trop élevée', 'Dilution excessive des fondateurs à négocier']
      : ['Potentially excessive valuation', 'Excessive founder dilution to negotiate'];
  }
  if (globalScore >= 41) {
    return isFr
      ? ['Gouvernance à formaliser avant la levée', 'Documentation financière à compléter', 'Business plan à structurer']
      : ['Governance to formalize before fundraising', 'Financial documentation to complete', 'Business plan to structure'];
  }
  return isFr
    ? ['Santé financière insuffisante pour attirer des investisseurs', 'Absence de différenciation concurrentielle', 'Équipe dirigeante trop petite ou inexpérimentée', 'Aucune préparation à la due diligence']
    : ['Insufficient financial health to attract investors', 'No competitive differentiation', 'Leadership team too small or inexperienced', 'No due diligence preparation'];
}

function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  const finScore = perAxis['financial-health'] ?? 0;
  const govScore = perAxis['governance'] ?? 0;
  const mktScore = perAxis['market-position'] ?? 0;
  const scaScore = perAxis['scalability'] ?? 0;
  const invScore = perAxis['investor-readiness'] ?? 0;

  if (finScore < 60) {
    recs.push({
      title: isFr ? 'Renforcer la santé financière' : 'Strengthen financial health',
      items: isFr
        ? ['Améliorer la rentabilité avant la levée', 'Réduire le ratio dette/EBITDA', 'Diversifier les sources de revenus']
        : ['Improve profitability before fundraising', 'Reduce debt/EBITDA ratio', 'Diversify revenue sources'],
    });
  }
  if (govScore < 60) {
    recs.push({
      title: isFr ? 'Structurer la gouvernance' : 'Structure governance',
      items: isFr
        ? ['Constituer un conseil d\'administration indépendant', 'Faire auditer les états financiers', 'Formaliser les rôles de l\'équipe dirigeante']
        : ['Form an independent board of directors', 'Have financial statements audited', 'Formalize leadership team roles'],
    });
  }
  if (mktScore < 60) {
    recs.push({
      title: isFr ? 'Renforcer le positionnement marché' : 'Strengthen market positioning',
      items: isFr
        ? ['Développer un avantage concurrentiel protégé', 'Diversifier la base clients', 'Documenter la stratégie de croissance']
        : ['Develop a protected competitive advantage', 'Diversify client base', 'Document growth strategy'],
    });
  }
  if (scaScore < 60) {
    recs.push({
      title: isFr ? 'Améliorer la scalabilité' : 'Improve scalability',
      items: isFr
        ? ['Investir dans l\'automatisation des processus', 'Développer des revenus récurrents', 'Préparer un plan de déploiement géographique']
        : ['Invest in process automation', 'Develop recurring revenue', 'Prepare geographic deployment plan'],
    });
  }
  if (invScore < 60) {
    recs.push({
      title: isFr ? 'Préparer la documentation investisseurs' : 'Prepare investor documentation',
      items: isFr
        ? ['Constituer une data room structurée', 'Élaborer un business plan 3-5 ans', 'Préparer un pitch deck professionnel']
        : ['Build a structured data room', 'Develop a 3-5 year business plan', 'Prepare a professional pitch deck'],
    });
  }
  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Préparer la levée de fonds' : 'Prepare fundraising',
      items: isFr
        ? ['Identifier les investisseurs cibles (VC, PE, banques)', 'Préparer le roadshow', 'Négocier les termes avec un conseil juridique']
        : ['Identify target investors (VC, PE, banks)', 'Prepare the roadshow', 'Negotiate terms with legal counsel'],
    });
  }
  return recs;
}

export const investmentReadinessConfig: DiagnosticToolConfig = {
  toolId: 'investment-readiness',
  toolNameFr: 'Investment Readiness',
  toolNameEn: 'Investment Readiness',
  toolSubtitleFr: 'Évaluez votre préparation à la levée de fonds : santé financière, gouvernance, positionnement, scalabilité et documentation investisseurs.',
  toolSubtitleEn: 'Assess your fundraising readiness: financial health, governance, positioning, scalability and investor documentation.',

  seoTitleFr: 'Investment Readiness Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Investment Readiness | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez votre préparation à la levée de fonds : santé financière, gouvernance, positionnement marché, scalabilité. Score /100, rapport PDF.',
  seoDescriptionEn: 'Assess your fundraising readiness: financial health, governance, market positioning, scalability. Score /100, PDF report.',
  seoKeywordsFr: 'investment readiness, levée de fonds, préparation investisseurs, due diligence, startup Afrique, private equity',
  seoKeywordsEn: 'investment readiness, fundraising, investor preparation, due diligence, Africa startup, private equity',
  canonicalPath: '/tools/investment-readiness',

  axes: [
    {
      id: 'financial-health',
      titleFr: 'Santé Financière',
      titleEn: 'Financial Health',
      descriptionFr: 'Croissance, rentabilité, structure du bilan',
      descriptionEn: 'Growth, profitability, balance sheet structure',
      icon: 'ri-line-chart-line',
      color: '#059669',
      weight: 25,
      questions: [
        {
          id: 'fin-1',
          axisId: 'financial-health',
          questionFr: 'Quel est le taux de croissance annuel de votre chiffre d\'affaires sur les 3 dernières années ?',
          questionEn: 'What is your annual revenue growth rate over the last 3 years?',
          options: [
            { value: 100, labelFr: '+30% par an en moyenne', labelEn: '+30% per year on average' },
            { value: 70, labelFr: '+15-30% par an', labelEn: '+15-30% per year' },
            { value: 40, labelFr: '0-15% par an', labelEn: '0-15% per year' },
            { value: 0, labelFr: 'Déclin ou stagnation', labelEn: 'Decline or stagnation' },
          ],
        },
        {
          id: 'fin-2',
          axisId: 'financial-health',
          questionFr: 'Quelle est votre marge nette (résultat net / CA) ?',
          questionEn: 'What is your net margin (net profit / revenue)?',
          options: [
            { value: 100, labelFr: '+20%', labelEn: '+20%' },
            { value: 70, labelFr: '10-20%', labelEn: '10-20%' },
            { value: 40, labelFr: '5-10%', labelEn: '5-10%' },
            { value: 0, labelFr: 'Moins de 5% ou déficitaire', labelEn: 'Less than 5% or loss-making' },
          ],
        },
        {
          id: 'fin-3',
          axisId: 'financial-health',
          questionFr: 'Votre dette nette / EBITDA est-elle inférieure à 3x ?',
          questionEn: 'Is your net debt / EBITDA below 3x?',
          options: [
            { value: 100, labelFr: 'Oui, inférieure à 1.5x', labelEn: 'Yes, below 1.5x' },
            { value: 70, labelFr: 'Entre 1.5x et 3x', labelEn: 'Between 1.5x and 3x' },
            { value: 40, labelFr: 'Entre 3x et 5x', labelEn: 'Between 3x and 5x' },
            { value: 0, labelFr: 'Supérieure à 5x', labelEn: 'Above 5x' },
          ],
        },
      ],
    },
    {
      id: 'governance',
      titleFr: 'Gouvernance & Équipe',
      titleEn: 'Governance & Team',
      descriptionFr: 'Structure de gouvernance, équipe dirigeante, transparence',
      descriptionEn: 'Governance structure, leadership team, transparency',
      icon: 'ri-team-line',
      color: '#0e7490',
      weight: 20,
      questions: [
        {
          id: 'gov-1',
          axisId: 'governance',
          questionFr: 'Disposez-vous d\'un conseil d\'administration ou d\'un comité de surveillance actif ?',
          questionEn: 'Do you have an active board of directors or supervisory committee?',
          options: [
            { value: 100, labelFr: 'CA indépendant avec 3+ membres externes', labelEn: 'Independent board with 3+ external members' },
            { value: 70, labelFr: 'CA avec membres internes et externes', labelEn: 'Board with internal and external members' },
            { value: 40, labelFr: 'CA familial / fondateurs uniquement', labelEn: 'Family / founder-only board' },
            { value: 0, labelFr: 'Aucun CA formel', labelEn: 'No formal board' },
          ],
        },
        {
          id: 'gov-2',
          axisId: 'governance',
          questionFr: 'Vos états financiers sont-ils audités par un cabinet externe ?',
          questionEn: 'Are your financial statements audited by an external firm?',
          options: [
            { value: 100, labelFr: 'Audit annuel par Big 4 ou équivalent', labelEn: 'Annual audit by Big 4 or equivalent' },
            { value: 70, labelFr: 'Audit annuel par cabinet local', labelEn: 'Annual audit by local firm' },
            { value: 40, labelFr: 'Révision comptable occasionnelle', labelEn: 'Occasional accounting review' },
            { value: 0, labelFr: 'Aucun audit externe', labelEn: 'No external audit' },
          ],
        },
        {
          id: 'gov-3',
          axisId: 'governance',
          questionFr: 'L\'équipe dirigeante dispose-t-elle d\'une expérience sectorielle significative ?',
          questionEn: 'Does the leadership team have significant sector experience?',
          options: [
            { value: 100, labelFr: '10+ ans d\'expérience moyenne par dirigeant', labelEn: '10+ years average experience per leader' },
            { value: 70, labelFr: '5-10 ans d\'expérience', labelEn: '5-10 years experience' },
            { value: 40, labelFr: '2-5 ans d\'expérience', labelEn: '2-5 years experience' },
            { value: 0, labelFr: 'Équipe novice', labelEn: 'Novice team' },
          ],
        },
      ],
    },
    {
      id: 'market-position',
      titleFr: 'Positionnement Marché',
      titleEn: 'Market Position',
      descriptionFr: 'Part de marché, différenciation, barrières à l\'entrée',
      descriptionEn: 'Market share, differentiation, barriers to entry',
      icon: 'ri-global-line',
      color: '#d97706',
      weight: 20,
      questions: [
        {
          id: 'mkt-1',
          axisId: 'market-position',
          questionFr: 'Quelle est votre part de marché estimée dans votre segment principal ?',
          questionEn: 'What is your estimated market share in your main segment?',
          options: [
            { value: 100, labelFr: 'Leader (>30%)', labelEn: 'Leader (>30%)' },
            { value: 70, labelFr: 'Top 3 (10-30%)', labelEn: 'Top 3 (10-30%)' },
            { value: 40, labelFr: 'Joueur moyen (3-10%)', labelEn: 'Mid player (3-10%)' },
            { value: 0, labelFr: 'Nouvel entrant (<3%)', labelEn: 'New entrant (<3%)' },
          ],
        },
        {
          id: 'mkt-2',
          axisId: 'market-position',
          questionFr: 'Votre offre dispose-t-elle d\'un avantage concurrentiel durable ?',
          questionEn: 'Does your offering have a sustainable competitive advantage?',
          options: [
            { value: 100, labelFr: 'Avantage protégé (brevet, licence, exclusivité)', labelEn: 'Protected advantage (patent, license, exclusivity)' },
            { value: 70, labelFr: 'Différenciation forte et reconnue', labelEn: 'Strong and recognized differentiation' },
            { value: 40, labelFr: 'Légère différenciation', labelEn: 'Slight differentiation' },
            { value: 0, labelFr: 'Aucune différenciation', labelEn: 'No differentiation' },
          ],
        },
        {
          id: 'mkt-3',
          axisId: 'market-position',
          questionFr: 'Quelle est la concentration de votre portefeuille clients ?',
          questionEn: 'What is the concentration of your client portfolio?',
          options: [
            { value: 100, labelFr: 'Top 5 clients <30% du CA', labelEn: 'Top 5 clients <30% of revenue' },
            { value: 70, labelFr: 'Top 5 clients 30-50% du CA', labelEn: 'Top 5 clients 30-50% of revenue' },
            { value: 40, labelFr: 'Top 5 clients 50-70% du CA', labelEn: 'Top 5 clients 50-70% of revenue' },
            { value: 0, labelFr: 'Top 5 clients >70% du CA', labelEn: 'Top 5 clients >70% of revenue' },
          ],
        },
      ],
    },
    {
      id: 'scalability',
      titleFr: 'Scalabilité & Innovation',
      titleEn: 'Scalability & Innovation',
      descriptionFr: 'Capacité à croître, modèle reproductible, innovation',
      descriptionEn: 'Growth capacity, replicable model, innovation',
      icon: 'ri-rocket-line',
      color: '#7c3aed',
      weight: 20,
      questions: [
        {
          id: 'sca-1',
          axisId: 'scalability',
          questionFr: 'Votre modèle économique est-il reproductible dans d\'autres zones géographiques ?',
          questionEn: 'Is your business model replicable in other geographic areas?',
          options: [
            { value: 100, labelFr: 'Déjà déployé dans 3+ zones', labelEn: 'Already deployed in 3+ areas' },
            { value: 70, labelFr: '1-2 zones supplémentaires identifiées', labelEn: '1-2 additional areas identified' },
            { value: 40, labelFr: 'Potentiel de réplication théorique', labelEn: 'Theoretical replication potential' },
            { value: 0, labelFr: 'Modèle local uniquement', labelEn: 'Local model only' },
          ],
        },
        {
          id: 'sca-2',
          axisId: 'scalability',
          questionFr: 'Quel est le taux de récurrence / renouvellement de vos revenus ?',
          questionEn: 'What is your revenue recurrence / renewal rate?',
          options: [
            { value: 100, labelFr: '+80% récurrent / renouvelé', labelEn: '80%+ recurring / renewed' },
            { value: 70, labelFr: '50-80% récurrent', labelEn: '50-80% recurring' },
            { value: 40, labelFr: '20-50% récurrent', labelEn: '20-50% recurring' },
            { value: 0, labelFr: 'Moins de 20% récurrent', labelEn: 'Less than 20% recurring' },
          ],
        },
        {
          id: 'sca-3',
          axisId: 'scalability',
          questionFr: 'Investissez-vous significativement en R&D ou en innovation ?',
          questionEn: 'Do you invest significantly in R&D or innovation?',
          options: [
            { value: 100, labelFr: '+10% du CA en R&D', labelEn: '10%+ of revenue in R&D' },
            { value: 70, labelFr: '5-10% du CA', labelEn: '5-10% of revenue' },
            { value: 40, labelFr: '1-5% du CA', labelEn: '1-5% of revenue' },
            { value: 0, labelFr: 'Moins de 1%', labelEn: 'Less than 1%' },
          ],
        },
      ],
    },
    {
      id: 'investor-readiness',
      titleFr: 'Préparation Investisseurs',
      titleEn: 'Investor Readiness',
      descriptionFr: 'Documentation, pitch, due diligence, valuation',
      descriptionEn: 'Documentation, pitch, due diligence, valuation',
      icon: 'ri-briefcase-4-line',
      color: '#be123c',
      weight: 15,
      questions: [
        {
          id: 'inv-1',
          axisId: 'investor-readiness',
          questionFr: 'Disposez-vous d\'un data room structurée pour la due diligence ?',
          questionEn: 'Do you have a structured data room for due diligence?',
          options: [
            { value: 100, labelFr: 'Data room complète et à jour', labelEn: 'Complete and up-to-date data room' },
            { value: 70, labelFr: 'Documents clés organisés', labelEn: 'Key documents organized' },
            { value: 40, labelFr: 'Documents dispersés', labelEn: 'Scattered documents' },
            { value: 0, labelFr: 'Aucune préparation', labelEn: 'No preparation' },
          ],
        },
        {
          id: 'inv-2',
          axisId: 'investor-readiness',
          questionFr: 'Avez-vous un business plan / financial model à 3-5 ans ?',
          questionEn: 'Do you have a 3-5 year business plan / financial model?',
          options: [
            { value: 100, labelFr: 'BP détaillé avec scénarios optimiste/base/pessimiste', labelEn: 'Detailed BP with optimistic/base/pessimistic scenarios' },
            { value: 70, labelFr: 'BP avec projections 3 ans', labelEn: 'BP with 3-year projections' },
            { value: 40, labelFr: 'Projections simples 1-2 ans', labelEn: 'Simple 1-2 year projections' },
            { value: 0, labelFr: 'Aucune projection formalisée', labelEn: 'No formal projections' },
          ],
        },
        {
          id: 'inv-3',
          axisId: 'investor-readiness',
          questionFr: 'Avez-vous déjà rencontré des investisseurs ou des banques pour discuter de financement ?',
          questionEn: 'Have you already met with investors or banks to discuss financing?',
          options: [
            { value: 100, labelFr: 'Plusieurs discussions avancées en cours', labelEn: 'Several advanced discussions ongoing' },
            { value: 70, labelFr: 'Premiers contacts établis', labelEn: 'First contacts established' },
            { value: 40, labelFr: 'Intérêt exprimé mais pas de contact', labelEn: 'Interest expressed but no contact' },
            { value: 0, labelFr: 'Jamais abordé le sujet', labelEn: 'Never addressed the topic' },
          ],
        },
      ],
    },
  ],

  howToNameFr: 'Investment Readiness KHEPRA™',
  howToNameEn: 'Investment Readiness KHEPRA™',
  howToDescriptionFr: 'Évaluez votre préparation à la levée de fonds en 15 questions sur 5 dimensions : santé financière, gouvernance, positionnement marché, scalabilité et préparation investisseurs. Score /100.',
  howToDescriptionEn: 'Assess your fundraising readiness in 15 questions across 5 dimensions: financial health, governance, market positioning, scalability and investor readiness. Score /100.',
  howToTotalTime: '6M',
  howToSteps: [
    { name: 'Santé Financière', text: 'Analysez votre croissance, rentabilité, structure du bilan et ratio dette/EBITDA.' },
    { name: 'Gouvernance & Équipe', text: 'Évaluez votre conseil d\'administration, l\'audit externe et l\'expérience sectorielle de l\'équipe dirigeante.' },
    { name: 'Positionnement Marché', text: 'Mesurez votre part de marché, votre avantage concurrentiel et la diversification de votre portefeuille clients.' },
    { name: 'Scalabilité & Innovation', text: 'Examinez la reproductibilité de votre modèle, la récurrence des revenus et l\'investissement en R&D.' },
    { name: 'Préparation Investisseurs', text: 'Vérifiez votre data room, votre business plan 3-5 ans et vos contacts investisseurs existants.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 70) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 40) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 70) return 'ri-check-line';
    if (value === 40) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 70) return 'text-accent-600';
    if (value === 40) return 'text-orange-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['InvestmentReadiness', 'LeveeDeFonds', 'StartupAfrique', 'PrivateEquity'],

  showRadarChart: false,

  badgeIcon: 'ri-briefcase-4-line',
  badgeTextFr: '5 dimensions · 15 questions · 6 min',
  badgeTextEn: '5 dimensions · 15 questions · 6 min',

  expertCTA: {
    titleFr: 'Transformez votre projet en opportunité d\'investissement irresistible',
    titleEn: 'Transform your project into an irresistible investment opportunity',
    descriptionFr: 'Nos experts en levée de fonds vous accompagnent dans la structuration de votre data room, la préparation de votre pitch et la négociation avec les investisseurs.',
    descriptionEn: 'Our fundraising experts support you in structuring your data room, preparing your pitch and negotiating with investors.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};



