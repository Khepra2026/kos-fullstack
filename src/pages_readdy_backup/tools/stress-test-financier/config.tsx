import type { DiagnosticToolConfig } from '';

const FORM_URL = 'https://readdy.ai/api/form/d7o8h0n10h3ggjn1df60';

function getScoreColor(score: number): string {
  if (score >= 71) return '#059669';
  if (score >= 41) return '#d97706';
  return '#dc2626';
}

function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Résilience Avancée' : 'Advanced Resilience';
  if (score >= 41) return isFr ? 'Résilience Intermédiaire' : 'Intermediate Resilience';
  return isFr ? 'Résilience Critique' : 'Critical Resilience';
}

function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Avancé' : 'Advanced';
  if (score >= 41) return isFr ? 'Intermédiaire' : 'Intermediate';
  return isFr ? 'Critique' : 'Critical';
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Organisation résiliente face aux chocs majeurs' : 'Organization resilient to major shocks';
  if (score >= 41) return isFr ? 'Résilience modérée, des améliorations ciblées renforceront votre stabilité' : 'Moderate resilience, targeted improvements will strengthen your stability';
  return isFr ? 'Organisation vulnérable, une action immédiate est nécessaire' : 'Vulnerable organization, immediate action is required';
}

function getRisks(score: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = !lang.startsWith('en');
  if (score >= 71) {
    return isFr
      ? ['Vulnérabilité aux chocs systémiques majeurs', 'Dépendance potentielle à un petit nombre de clients']
      : ['Vulnerability to major systemic shocks', 'Potential dependence on a small number of clients'];
  }
  if (score >= 41) {
    return isFr
      ? ['Risque de tension de trésorerie en cas de crise prolongée', 'Difficulté à absorber une hausse brutale des coûts', 'Faible capacité de réaction aux disruptions de marché']
      : ['Risk of cash flow tension in case of prolonged crisis', 'Difficulty absorbing a sudden cost increase', 'Low ability to react to market disruptions'];
  }
  return isFr
    ? ['Risque élevé de cessation de paiement', 'Structure de coûts trop rigide', 'Absence de plan de continuité', 'Dépendance critique à un canal de revenus unique']
    : ['High risk of insolvency', 'Cost structure too rigid', 'No continuity plan', 'Critical dependence on a single revenue channel'];
}

function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  const revScore = perAxis['revenue-drop'] ?? 0;
  const costScore = perAxis['cost-surge'] ?? 0;
  const liqScore = perAxis['liquidity-crisis'] ?? 0;
  const mktScore = perAxis['market-shock'] ?? 0;

  if (revScore < 50) {
    recs.push({
      title: isFr ? 'Diversifier les sources de revenus' : 'Diversify revenue sources',
      items: isFr
        ? ['Identifier 2-3 nouveaux segments de clientèle', 'Développer des offres récurrentes / abonnements', 'Explorer des partenariats de distribution']
        : ['Identify 2-3 new customer segments', 'Develop recurring/subscription offers', 'Explore distribution partnerships'],
    });
  }
  if (costScore < 50) {
    recs.push({
      title: isFr ? 'Optimiser la structure de coûts' : 'Optimize cost structure',
      items: isFr
        ? ['Négocier des clauses d\'indexation dans les contrats', 'Identifier les leviers de réduction rapide des coûts', 'Diversifier la base fournisseurs']
        : ['Negotiate indexation clauses in contracts', 'Identify rapid cost reduction levers', 'Diversify supplier base'],
    });
  }
  if (liqScore < 50) {
    recs.push({
      title: isFr ? 'Renforcer la liquidité' : 'Strengthen liquidity',
      items: isFr
        ? ['Négocier une ligne de crédit de trésorerie', 'Mettre en place un suivi hebdomadaire du BFR', 'Réduire le DSO par des incitations au paiement rapide']
        : ['Negotiate a cash credit line', 'Implement weekly WCR tracking', 'Reduce DSO through early payment incentives'],
    });
  }
  if (mktScore < 50) {
    recs.push({
      title: isFr ? 'Améliorer l\'agilité commerciale' : 'Improve commercial agility',
      items: isFr
        ? ['Créer une cellule veille réglementaire et concurrentielle', 'Développer un plan de communication de crise', 'Investir dans la différenciation de l\'offre']
        : ['Create a regulatory and competitive intelligence unit', 'Develop a crisis communication plan', 'Invest in offer differentiation'],
    });
  }
  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence' : 'Maintain excellence',
      items: isFr
        ? ['Tester annuellement le plan de continuité', 'Maintenir la diversification des revenus', 'Surveiller les indicateurs de résilience']
        : ['Test the continuity plan annually', 'Maintain revenue diversification', 'Monitor resilience indicators'],
    });
  }
  return recs;
}

export const stressTestConfig: DiagnosticToolConfig = {
  toolId: 'stress-test-financier',
  toolNameFr: 'Stress Test Financier',
  toolNameEn: 'Financial Stress Test',
  toolSubtitleFr: 'Évaluez la résilience de votre organisation face à 4 scénarios de crise : chute de revenus, hausse des coûts, crise de liquidité, choc de marché.',
  toolSubtitleEn: 'Assess your organization\'s resilience against 4 crisis scenarios: revenue drop, cost surge, liquidity crisis, market shock.',

  seoTitleFr: 'Stress Test Financier Gratuit | KHEPRA EXPERTS',
  seoTitleEn: 'Free Financial Stress Test | KHEPRA EXPERTS',
  seoDescriptionFr: 'Testez la résilience financière de votre organisation face à 4 scénarios de crise. Score instantané, rapport PDF, recommandations.',
  seoDescriptionEn: 'Test your organization\'s financial resilience against 4 crisis scenarios. Instant score, PDF report, recommendations.',
  seoKeywordsFr: 'stress test financier, résilience entreprise, scénario crise, trésorerie, risque financier, Afrique',
  seoKeywordsEn: 'financial stress test, business resilience, crisis scenario, cash flow, financial risk, Africa',
  canonicalPath: '/tools/stress-test-financier',

  axes: [
    {
      id: 'revenue-drop',
      titleFr: 'Chute de Revenus',
      titleEn: 'Revenue Drop',
      descriptionFr: 'Résilience face à une baisse brutale des revenus',
      descriptionEn: 'Resilience against a sudden revenue drop',
      icon: 'ri-arrow-down-line',
      color: '#dc2626',
      questions: [
        {
          id: 'rev-1',
          axisId: 'revenue-drop',
          questionFr: 'Votre organisation dispose-t-elle de sources de revenus diversifiées (plus de 3 canaux) ?',
          questionEn: 'Does your organization have diversified revenue sources (more than 3 channels)?',
          options: [
            { value: 100, labelFr: 'Oui, 4+ canaux actifs', labelEn: 'Yes, 4+ active channels' },
            { value: 60, labelFr: '2-3 canaux', labelEn: '2-3 channels' },
            { value: 20, labelFr: '1 canal principal', labelEn: '1 main channel' },
            { value: 0, labelFr: 'Aucune diversification', labelEn: 'No diversification' },
          ],
        },
        {
          id: 'rev-2',
          axisId: 'revenue-drop',
          questionFr: 'Quelle est votre trésorerie de sécurité (mois de couverture des charges fixes) ?',
          questionEn: 'What is your safety cash reserve (months of fixed cost coverage)?',
          options: [
            { value: 100, labelFr: '+12 mois', labelEn: '+12 months' },
            { value: 70, labelFr: '6-12 mois', labelEn: '6-12 months' },
            { value: 40, labelFr: '3-6 mois', labelEn: '3-6 months' },
            { value: 0, labelFr: 'Moins de 3 mois', labelEn: 'Less than 3 months' },
          ],
        },
        {
          id: 'rev-3',
          axisId: 'revenue-drop',
          questionFr: 'Avez-vous des contrats récurrents / abonnements représentant plus de 50% du CA ?',
          questionEn: 'Do you have recurring/subscription contracts representing more than 50% of revenue?',
          options: [
            { value: 100, labelFr: 'Oui, +70% récurrent', labelEn: 'Yes, 70%+ recurring' },
            { value: 60, labelFr: '30-50% récurrent', labelEn: '30-50% recurring' },
            { value: 30, labelFr: '10-30% récurrent', labelEn: '10-30% recurring' },
            { value: 0, labelFr: 'Tous les revenus sont ponctuels', labelEn: 'All revenue is one-time' },
          ],
        },
        {
          id: 'rev-4',
          axisId: 'revenue-drop',
          questionFr: 'Disposez-vous d\'un plan de continuité d\'activité (PCA) testé ?',
          questionEn: 'Do you have a tested Business Continuity Plan (BCP)?',
          options: [
            { value: 100, labelFr: 'PCA testé annuellement', labelEn: 'BCP tested annually' },
            { value: 60, labelFr: 'PCA documenté, non testé', labelEn: 'BCP documented, not tested' },
            { value: 30, labelFr: 'PCA en cours de rédaction', labelEn: 'BCP being drafted' },
            { value: 0, labelFr: 'Aucun PCA', labelEn: 'No BCP' },
          ],
        },
      ],
    },
    {
      id: 'cost-surge',
      titleFr: 'Hausse des Coûts',
      titleEn: 'Cost Surge',
      descriptionFr: 'Capacité à absorber une inflation soudaine des coûts',
      descriptionEn: 'Ability to absorb sudden cost inflation',
      icon: 'ri-price-tag-3-line',
      color: '#d97706',
      questions: [
        {
          id: 'cost-1',
          axisId: 'cost-surge',
          questionFr: 'Quel est le poids des coûts fixes dans votre structure de coûts ?',
          questionEn: 'What is the weight of fixed costs in your cost structure?',
          options: [
            { value: 100, labelFr: 'Moins de 30% fixes', labelEn: 'Less than 30% fixed' },
            { value: 60, labelFr: '30-50% fixes', labelEn: '30-50% fixed' },
            { value: 30, labelFr: '50-70% fixes', labelEn: '50-70% fixed' },
            { value: 0, labelFr: 'Plus de 70% fixes', labelEn: 'More than 70% fixed' },
          ],
        },
        {
          id: 'cost-2',
          axisId: 'cost-surge',
          questionFr: 'Avez-vous des clauses d\'indexation / révision de prix dans vos contrats clients ?',
          questionEn: 'Do you have indexation/price revision clauses in your client contracts?',
          options: [
            { value: 100, labelFr: 'Tous les contrats sont indexés', labelEn: 'All contracts are indexed' },
            { value: 60, labelFr: 'Majorité indexée', labelEn: 'Majority indexed' },
            { value: 30, labelFr: 'Quelques contrats indexés', labelEn: 'Some contracts indexed' },
            { value: 0, labelFr: 'Aucune indexation', labelEn: 'No indexation' },
          ],
        },
        {
          id: 'cost-3',
          axisId: 'cost-surge',
          questionFr: 'Pouvez-vous réduire vos coûts opérationnels de 20% en moins de 30 jours ?',
          questionEn: 'Can you reduce your operating costs by 20% in less than 30 days?',
          options: [
            { value: 100, labelFr: 'Oui, plan déjà identifié', labelEn: 'Yes, plan already identified' },
            { value: 60, labelFr: 'Possible avec ajustements', labelEn: 'Possible with adjustments' },
            { value: 30, labelFr: 'Difficile mais faisable', labelEn: 'Difficult but feasible' },
            { value: 0, labelFr: 'Impossible sans fermeture', labelEn: 'Impossible without closure' },
          ],
        },
        {
          id: 'cost-4',
          axisId: 'cost-surge',
          questionFr: 'Avez-vous des fournisseurs alternatifs pour vos achats critiques ?',
          questionEn: 'Do you have alternative suppliers for your critical purchases?',
          options: [
            { value: 100, labelFr: '2+ fournisseurs par catégorie critique', labelEn: '2+ suppliers per critical category' },
            { value: 60, labelFr: 'Fournisseurs alternatifs identifiés', labelEn: 'Alternative suppliers identified' },
            { value: 30, labelFr: 'Quelques alternatives', labelEn: 'Some alternatives' },
            { value: 0, labelFr: 'Dépendance totale à 1 fournisseur', labelEn: 'Total dependence on 1 supplier' },
          ],
        },
      ],
    },
    {
      id: 'liquidity-crisis',
      titleFr: 'Crise de Liquidité',
      titleEn: 'Liquidity Crisis',
      descriptionFr: 'Résistance à un choc de trésorerie majeur',
      descriptionEn: 'Resistance to a major cash flow shock',
      icon: 'ri-water-flash-line',
      color: '#0e7490',
      questions: [
        {
          id: 'liq-1',
          axisId: 'liquidity-crisis',
          questionFr: 'Quel est votre délai moyen de recouvrement des créances clients (DSO) ?',
          questionEn: 'What is your average days sales outstanding (DSO)?',
          options: [
            { value: 100, labelFr: 'Moins de 30 jours', labelEn: 'Less than 30 days' },
            { value: 60, labelFr: '30-60 jours', labelEn: '30-60 days' },
            { value: 30, labelFr: '60-90 jours', labelEn: '60-90 days' },
            { value: 0, labelFr: 'Plus de 90 jours', labelEn: 'More than 90 days' },
          ],
        },
        {
          id: 'liq-2',
          axisId: 'liquidity-crisis',
          questionFr: 'Disposez-vous d\'une ligne de crédit de trésorerie non utilisée ?',
          questionEn: 'Do you have an unused cash credit line?',
          options: [
            { value: 100, labelFr: 'Ligne confirmée et disponible', labelEn: 'Confirmed and available line' },
            { value: 60, labelFr: 'Ligne en cours de négociation', labelEn: 'Line being negotiated' },
            { value: 30, labelFr: 'Relation bancaire mais pas de ligne', labelEn: 'Banking relationship but no line' },
            { value: 0, labelFr: 'Aucune relation bancaire', labelEn: 'No banking relationship' },
          ],
        },
        {
          id: 'liq-3',
          axisId: 'liquidity-crisis',
          questionFr: 'Quel est le délai de paiement moyen aux fournisseurs (DPO) ?',
          questionEn: 'What is your average days payable outstanding (DPO)?',
          options: [
            { value: 100, labelFr: '60+ jours avec bonnes relations', labelEn: '60+ days with good relations' },
            { value: 60, labelFr: '30-60 jours', labelEn: '30-60 days' },
            { value: 30, labelFr: '15-30 jours', labelEn: '15-30 days' },
            { value: 0, labelFr: 'Paiement immédiat / à l\'avance', labelEn: 'Immediate / advance payment' },
          ],
        },
        {
          id: 'liq-4',
          axisId: 'liquidity-crisis',
          questionFr: 'Avez-vous des actifs facilement mobilisables (caution, nantissement) ?',
          questionEn: 'Do you have easily mobilizable assets (guarantee, pledge)?',
          options: [
            { value: 100, labelFr: 'Actifs importants et documentés', labelEn: 'Significant and documented assets' },
            { value: 60, labelFr: 'Quelques actifs mobilisables', labelEn: 'Some mobilizable assets' },
            { value: 30, labelFr: 'Actifs limités', labelEn: 'Limited assets' },
            { value: 0, labelFr: 'Aucun actif mobilisable', labelEn: 'No mobilizable assets' },
          ],
        },
      ],
    },
    {
      id: 'market-shock',
      titleFr: 'Choc de Marché',
      titleEn: 'Market Shock',
      descriptionFr: 'Adaptation à une disruption concurrentielle ou réglementaire',
      descriptionEn: 'Adaptation to competitive or regulatory disruption',
      icon: 'ri-earthquake-line',
      color: '#7c3aed',
      questions: [
        {
          id: 'mkt-1',
          axisId: 'market-shock',
          questionFr: 'Quel est votre temps de réaction pour lancer un nouveau produit/service ?',
          questionEn: 'What is your reaction time to launch a new product/service?',
          options: [
            { value: 100, labelFr: 'Moins de 3 mois', labelEn: 'Less than 3 months' },
            { value: 60, labelFr: '3-6 mois', labelEn: '3-6 months' },
            { value: 30, labelFr: '6-12 mois', labelEn: '6-12 months' },
            { value: 0, labelFr: 'Plus de 12 mois', labelEn: 'More than 12 months' },
          ],
        },
        {
          id: 'mkt-2',
          axisId: 'market-shock',
          questionFr: 'Suivez-vous activement les évolutions réglementaires dans votre secteur ?',
          questionEn: 'Do you actively track regulatory developments in your sector?',
          options: [
            { value: 100, labelFr: 'Veille réglementaire proactive + veille juridique', labelEn: 'Proactive regulatory + legal monitoring' },
            { value: 60, labelFr: 'Veille ponctuelle', labelEn: 'Occasional monitoring' },
            { value: 30, labelFr: 'Réaction aux changements uniquement', labelEn: 'Reaction to changes only' },
            { value: 0, labelFr: 'Aucune veille', labelEn: 'No monitoring' },
          ],
        },
        {
          id: 'mkt-3',
          axisId: 'market-shock',
          questionFr: 'Votre offre est-elle différenciée face à la concurrence ?',
          questionEn: 'Is your offering differentiated from the competition?',
          options: [
            { value: 100, labelFr: 'Avantage concurrentiel durable et protégé', labelEn: 'Sustainable and protected competitive advantage' },
            { value: 60, labelFr: 'Différenciation claire', labelEn: 'Clear differentiation' },
            { value: 30, labelFr: 'Légère différenciation', labelEn: 'Slight differentiation' },
            { value: 0, labelFr: 'Produit commoditisé', labelEn: 'Commoditized product' },
          ],
        },
        {
          id: 'mkt-4',
          axisId: 'market-shock',
          questionFr: 'Avez-vous un plan de communication de crise défini ?',
          questionEn: 'Do you have a defined crisis communication plan?',
          options: [
            { value: 100, labelFr: 'Plan testé avec équipe et porte-parole désignés', labelEn: 'Tested plan with team and designated spokesperson' },
            { value: 60, labelFr: 'Plan documenté', labelEn: 'Documented plan' },
            { value: 30, labelFr: 'Ébauche de plan', labelEn: 'Plan draft' },
            { value: 0, labelFr: 'Aucun plan', labelEn: 'No plan' },
          ],
        },
      ],
    },
  ],

  howToNameFr: 'Stress Test Financier KHEPRA™',
  howToNameEn: 'Financial Stress Test KHEPRA™',
  howToDescriptionFr: 'Testez la résilience financière de votre organisation face à 4 scénarios de crise : chute de revenus, hausse des coûts, crise de liquidité et choc de marché. Score de résilience /100.',
  howToDescriptionEn: 'Test your organization\'s financial resilience against 4 crisis scenarios: revenue drop, cost surge, liquidity crisis and market shock. Resilience score /100.',
  howToTotalTime: '6M',
  howToSteps: [
    { name: 'Chute de Revenus', text: 'Évaluez votre diversification des revenus, votre trésorerie de sécurité, vos contrats récurrents et votre PCA.' },
    { name: 'Hausse des Coûts', text: 'Analysez votre structure de coûts fixes, les clauses d\'indexation, la capacité de réduction rapide des coûts et la diversification fournisseurs.' },
    { name: 'Crise de Liquidité', text: 'Mesurez votre DSO, vos lignes de crédit disponibles, votre DPO et vos actifs mobilisables.' },
    { name: 'Choc de Marché', text: 'Examinez votre agilité commerciale, votre veille réglementaire, votre différenciation concurrentielle et votre plan de communication de crise.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value >= 60) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value >= 30) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value >= 60) return 'ri-check-line';
    if (value >= 30) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value >= 60) return 'text-accent-600';
    if (value >= 30) return 'text-orange-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['StressTestFinancier', 'ResilienceFinanciere', 'GestionDesCrises', 'FinanceAfrique'],

  showRadarChart: false,

  badgeIcon: 'ri-shield-flash-line',
  badgeTextFr: '4 scénarios · 16 questions · 6 min',
  badgeTextEn: '4 scenarios · 16 questions · 6 min',

  expertCTA: {
    titleFr: 'Votre score indique un risque élevé ?',
    titleEn: 'Your score indicates high risk?',
    descriptionFr: 'Nos experts en restructuration financière peuvent vous accompagner dans la construction d\'un plan de résilience sur mesure.',
    descriptionEn: 'Our financial restructuring experts can support you in building a tailored resilience plan.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};



