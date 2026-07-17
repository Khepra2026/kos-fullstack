import type { DiagnosticToolConfig } from '../components/types';

// ---- Inline data since diagnostic-risques has no data.ts ----

interface RiskCategory {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: {
    id: string;
    questionFr: string;
    questionEn: string;
    options: { value: number; labelFr: string; labelEn: string }[];
  }[];
}

const RISK_CATEGORIES: RiskCategory[] = [
  {
    id: 'strategic-risk', titleFr: 'Risques Stratégiques', titleEn: 'Strategic Risks',
    descriptionFr: 'Vision, marché, concurrence, modèle économique', descriptionEn: 'Vision, market, competition, business model',
    icon: 'ri-compass-3-line', color: '#7c3aed',
    questions: [
      { id: 'str-1', questionFr: 'Votre organisation dispose-t-elle d\'une cartographie formelle des risques stratégiques ?', questionEn: 'Does your organization have a formal strategic risk mapping?', options: [{ value: 100, labelFr: 'Cartographie complète, revue annuellement', labelEn: 'Complete mapping, reviewed annually' }, { value: 60, labelFr: 'Cartographie partielle', labelEn: 'Partial mapping' }, { value: 30, labelFr: 'Identification informelle', labelEn: 'Informal identification' }, { value: 0, labelFr: 'Aucune cartographie', labelEn: 'No mapping' }] },
      { id: 'str-2', questionFr: 'Avez-vous un processus de veille concurrentielle et sectorielle actif ?', questionEn: 'Do you have an active competitive and sector intelligence process?', options: [{ value: 100, labelFr: 'Veille structurée avec reporting mensuel', labelEn: 'Structured monitoring with monthly reporting' }, { value: 60, labelFr: 'Veille ponctuelle', labelEn: 'Occasional monitoring' }, { value: 30, labelFr: 'Informelle et réactive', labelEn: 'Informal and reactive' }, { value: 0, labelFr: 'Aucune veille', labelEn: 'No monitoring' }] },
      { id: 'str-3', questionFr: 'Votre plan stratégique intègre-t-il des scénarios de risque ?', questionEn: 'Does your strategic plan incorporate risk scenarios?', options: [{ value: 100, labelFr: 'Scénarios optimiste/base/pessimiste documentés', labelEn: 'Optimistic/base/pessimistic scenarios documented' }, { value: 60, labelFr: 'Quelques scénarios identifiés', labelEn: 'Some scenarios identified' }, { value: 30, labelFr: 'Plan unique sans scénarios', labelEn: 'Single plan without scenarios' }, { value: 0, labelFr: 'Aucun plan stratégique', labelEn: 'No strategic plan' }] },
    ],
  },
  {
    id: 'operational-risk', titleFr: 'Risques Opérationnels', titleEn: 'Operational Risks',
    descriptionFr: 'Processus, systèmes, ressources humaines, fraude', descriptionEn: 'Processes, systems, human resources, fraud',
    icon: 'ri-settings-3-line', color: '#d97706',
    questions: [
      { id: 'ops-1', questionFr: 'Vos processus critiques sont-ils documentés et contrôlés ?', questionEn: 'Are your critical processes documented and controlled?', options: [{ value: 100, labelFr: 'Tous documentés avec contrôles internes', labelEn: 'All documented with internal controls' }, { value: 60, labelFr: 'Principaux processus documentés', labelEn: 'Main processes documented' }, { value: 30, labelFr: 'Documentation partielle', labelEn: 'Partial documentation' }, { value: 0, labelFr: 'Aucune documentation', labelEn: 'No documentation' }] },
      { id: 'ops-2', questionFr: 'Disposez-vous d\'un dispositif de contrôle interne et d\'audit interne ?', questionEn: 'Do you have an internal control and internal audit system?', options: [{ value: 100, labelFr: 'Audit interne indépendant + comité d\'audit', labelEn: 'Independent internal audit + audit committee' }, { value: 60, labelFr: 'Contrôle interne structuré', labelEn: 'Structured internal control' }, { value: 30, labelFr: 'Contrôles ponctuels', labelEn: 'Occasional controls' }, { value: 0, labelFr: 'Aucun contrôle interne', labelEn: 'No internal control' }] },
      { id: 'ops-3', questionFr: 'Avez-vous un plan de succession pour les postes clés ?', questionEn: 'Do you have a succession plan for key positions?', options: [{ value: 100, labelFr: 'Plan de succession formalisé pour tous les postes clés', labelEn: 'Formalized succession plan for all key positions' }, { value: 60, labelFr: 'Plan pour les postes critiques', labelEn: 'Plan for critical positions' }, { value: 30, labelFr: 'Identification informelle des successeurs', labelEn: 'Informal identification of successors' }, { value: 0, labelFr: 'Aucun plan de succession', labelEn: 'No succession plan' }] },
    ],
  },
  {
    id: 'financial-risk', titleFr: 'Risques Financiers', titleEn: 'Financial Risks',
    descriptionFr: 'Liquidité, crédit, marché, change', descriptionEn: 'Liquidity, credit, market, currency',
    icon: 'ri-money-dollar-circle-line', color: '#dc2626',
    questions: [
      { id: 'fin-1', questionFr: 'Avez-vous un système de gestion des risques de crédit clients ?', questionEn: 'Do you have a customer credit risk management system?', options: [{ value: 100, labelFr: 'Scoring crédit + limites + suivi hebdomadaire', labelEn: 'Credit scoring + limits + weekly monitoring' }, { value: 60, labelFr: 'Limites de crédit définies', labelEn: 'Credit limits defined' }, { value: 30, labelFr: 'Suivi informel', labelEn: 'Informal monitoring' }, { value: 0, labelFr: 'Aucune gestion du risque crédit', labelEn: 'No credit risk management' }] },
      { id: 'fin-2', questionFr: 'Votre exposition aux risques de change est-elle couverte ?', questionEn: 'Is your foreign exchange risk exposure hedged?', options: [{ value: 100, labelFr: 'Couverture systématique (forwards, options)', labelEn: 'Systematic hedging (forwards, options)' }, { value: 60, labelFr: 'Couverture partielle', labelEn: 'Partial hedging' }, { value: 30, labelFr: 'Exposition identifiée mais non couverte', labelEn: 'Exposure identified but not hedged' }, { value: 0, labelFr: 'Aucune gestion du risque de change', labelEn: 'No currency risk management' }] },
      { id: 'fin-3', questionFr: 'Disposez-vous d\'un tableau de bord financier avec indicateurs de risque ?', questionEn: 'Do you have a financial dashboard with risk indicators?', options: [{ value: 100, labelFr: 'Dashboard temps réel avec alertes automatiques', labelEn: 'Real-time dashboard with automatic alerts' }, { value: 60, labelFr: 'Reporting mensuel structuré', labelEn: 'Structured monthly reporting' }, { value: 30, labelFr: 'Reporting trimestriel basique', labelEn: 'Basic quarterly reporting' }, { value: 0, labelFr: 'Aucun tableau de bord', labelEn: 'No dashboard' }] },
    ],
  },
  {
    id: 'compliance-risk', titleFr: 'Risques de Conformité', titleEn: 'Compliance Risks',
    descriptionFr: 'Réglementaire, juridique, éthique, réputation', descriptionEn: 'Regulatory, legal, ethical, reputational',
    icon: 'ri-shield-check-line', color: '#0f766e',
    questions: [
      { id: 'com-1', questionFr: 'Avez-vous un responsable conformité (Compliance Officer) dédié ?', questionEn: 'Do you have a dedicated Compliance Officer?', options: [{ value: 100, labelFr: 'Compliance Officer dédié + comité de conformité', labelEn: 'Dedicated Compliance Officer + compliance committee' }, { value: 60, labelFr: 'Responsable conformité à temps partiel', labelEn: 'Part-time compliance officer' }, { value: 30, labelFr: 'Conformité gérée par la direction', labelEn: 'Compliance managed by management' }, { value: 0, labelFr: 'Aucune fonction conformité', labelEn: 'No compliance function' }] },
      { id: 'com-2', questionFr: 'Votre organisation dispose-t-elle d\'un code d\'éthique et d\'une politique anti-corruption ?', questionEn: 'Does your organization have a code of ethics and anti-corruption policy?', options: [{ value: 100, labelFr: 'Code d\'éthique + formation annuelle + canal de signalement', labelEn: 'Code of ethics + annual training + reporting channel' }, { value: 60, labelFr: 'Code d\'éthique documenté', labelEn: 'Documented code of ethics' }, { value: 30, labelFr: 'Politique informelle', labelEn: 'Informal policy' }, { value: 0, labelFr: 'Aucune politique', labelEn: 'No policy' }] },
      { id: 'com-3', questionFr: 'Effectuez-vous des audits de conformité réglementaire réguliers ?', questionEn: 'Do you conduct regular regulatory compliance audits?', options: [{ value: 100, labelFr: 'Audit annuel externe + revue trimestrielle interne', labelEn: 'Annual external audit + quarterly internal review' }, { value: 60, labelFr: 'Audit annuel', labelEn: 'Annual audit' }, { value: 30, labelFr: 'Audit ponctuel', labelEn: 'Occasional audit' }, { value: 0, labelFr: 'Aucun audit de conformité', labelEn: 'No compliance audit' }] },
    ],
  },
];

function getScoreColor(score: number): string {
  if (score >= 71) return '#059669';
  if (score >= 41) return '#d97706';
  return '#dc2626';
}

function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Gestion des Risques Avancée' : 'Advanced Risk Management';
  if (score >= 41) return isFr ? 'Gestion des Risques Intermédiaire' : 'Intermediate Risk Management';
  return isFr ? 'Gestion des Risques Critique' : 'Critical Risk Management';
}

function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Avancé' : 'Advanced';
  if (score >= 41) return isFr ? 'Intermédiaire' : 'Intermediate';
  return isFr ? 'Critique' : 'Critical';
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? 'Votre organisation démontre une gestion des risques mature et structurée.' : 'Your organization demonstrates mature and structured risk management.';
  if (score >= 41) return isFr ? 'Votre gestion des risques est partielle. Des améliorations ciblées renforceront votre résilience.' : 'Your risk management is partial. Targeted improvements will strengthen your resilience.';
  return isFr ? 'Votre organisation est exposée à des risques critiques non maîtrisés. Une action immédiate est requise.' : 'Your organization is exposed to uncontrolled critical risks. Immediate action is required.';
}

function getRisks(score: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  if (score >= 71) return isFr ? ['Risque résiduel de non-conformité sur certains aspects', 'Évolution réglementaire à surveiller'] : ['Residual non-compliance risk on some aspects', 'Regulatory evolution to monitor'];
  if (score >= 41) return isFr ? ['Cartographie des risques incomplète', 'Contrôle interne à renforcer', 'Succession des postes clés non planifiée'] : ['Incomplete risk mapping', 'Internal control to strengthen', 'Key position succession not planned'];
  return isFr ? ['Exposition critique aux risques opérationnels', 'Absence de contrôle interne', 'Risque de non-conformité réglementaire élevé', 'Aucune gestion proactive des risques financiers'] : ['Critical exposure to operational risks', 'No internal control', 'High regulatory non-compliance risk', 'No proactive financial risk management'];
}

function getRecommendations(perCat: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];
  const strScore = perCat['strategic-risk'] ?? 0;
  const opsScore = perCat['operational-risk'] ?? 0;
  const finScore = perCat['financial-risk'] ?? 0;
  const comScore = perCat['compliance-risk'] ?? 0;

  if (strScore < 60) recs.push({ title: isFr ? 'Structurer la gestion des risques stratégiques' : 'Structure strategic risk management', items: isFr ? ['Réaliser une cartographie formelle des risques stratégiques', 'Mettre en place une veille concurrentielle structurée', 'Intégrer des scénarios de risque dans le plan stratégique'] : ['Conduct a formal strategic risk mapping', 'Set up structured competitive intelligence', 'Integrate risk scenarios into the strategic plan'] });
  if (opsScore < 60) recs.push({ title: isFr ? 'Renforcer le contrôle interne' : 'Strengthen internal control', items: isFr ? ['Documenter les processus critiques', 'Créer une fonction d\'audit interne', 'Élaborer des plans de succession pour les postes clés'] : ['Document critical processes', 'Create an internal audit function', 'Develop succession plans for key positions'] });
  if (finScore < 60) recs.push({ title: isFr ? 'Améliorer la gestion des risques financiers' : 'Improve financial risk management', items: isFr ? ['Mettre en place un scoring crédit clients', 'Couvrir les expositions au risque de change', 'Créer un tableau de bord financier avec alertes'] : ['Implement customer credit scoring', 'Hedge foreign exchange risk exposures', 'Create a financial dashboard with alerts'] });
  if (comScore < 60) recs.push({ title: isFr ? 'Renforcer la conformité' : 'Strengthen compliance', items: isFr ? ['Nommer un responsable conformité dédié', 'Formaliser le code d\'éthique et la politique anti-corruption', 'Planifier des audits de conformité réguliers'] : ['Appoint a dedicated compliance officer', 'Formalize the code of ethics and anti-corruption policy', 'Schedule regular compliance audits'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence en gestion des risques' : 'Maintain risk management excellence', items: isFr ? ['Réviser annuellement la cartographie des risques', 'Tester les plans de continuité', 'Benchmarker les pratiques avec les standards internationaux'] : ['Annually review risk mapping', 'Test continuity plans', 'Benchmark practices against international standards'] });
  return recs;
}

const FORM_URL = 'https://readdy.ai/api/form/d8m5s5ojb57qogjbh77g';

export const risquesConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-risques',
  toolNameFr: 'Diagnostic Gestion des Risques',
  toolNameEn: 'Risk Management Diagnostic',
  toolSubtitleFr: 'Cartographiez vos risques stratégiques, opérationnels, financiers et de conformité. Obtenez un score de maturité et un plan d\'action prioritaire.',
  toolSubtitleEn: 'Map your strategic, operational, financial and compliance risks. Get a maturity score and priority action plan.',

  seoTitleFr: 'Diagnostic Gestion des Risques | KHEPRA EXPERTS',
  seoTitleEn: 'Risk Management Diagnostic | KHEPRA EXPERTS',
  seoDescriptionFr: 'Cartographiez et évaluez vos risques stratégiques, opérationnels, financiers et de conformité. Score /100, rapport PDF, recommandations.',
  seoDescriptionEn: 'Map and assess your strategic, operational, financial and compliance risks. Score /100, PDF report, recommendations.',
  seoKeywordsFr: 'gestion des risques, cartographie risques, risque opérationnel, conformité, contrôle interne, Afrique',
  seoKeywordsEn: 'risk management, risk mapping, operational risk, compliance, internal control, Africa',
  canonicalPath: '/tools/diagnostic-risques',

  axes: RISK_CATEGORIES,

  howToNameFr: 'Diagnostic Gestion des Risques KHEPRA™',
  howToNameEn: 'Risk Management Diagnostic KHEPRA™',
  howToDescriptionFr: 'Cartographiez et évaluez vos risques en 12 questions sur 4 catégories : risques stratégiques, opérationnels, financiers et de conformité. Score de maturité /100 avec plan d\'action.',
  howToDescriptionEn: 'Map and assess your risks in 12 questions across 4 categories: strategic, operational, financial and compliance risks. Maturity score /100 with action plan.',
  howToTotalTime: '5M',
  howToSteps: [
    { name: 'Risques Stratégiques', text: 'Évaluez votre cartographie des risques, votre veille concurrentielle et l\'intégration de scénarios dans le plan stratégique.' },
    { name: 'Risques Opérationnels', text: 'Examinez la documentation des processus critiques, le contrôle interne et les plans de succession.' },
    { name: 'Risques Financiers', text: 'Analysez la gestion du risque crédit, l\'exposition au change et le tableau de bord financier.' },
    { name: 'Risques de Conformité', text: 'Vérifiez la fonction conformité, le code d\'éthique, la politique anti-corruption et les audits réguliers.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,
  getRisks: (_, globalScore, lang) => getRisks(globalScore, lang),
  getRecommendations: (perCat, globalScore, lang) => getRecommendations(perCat, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 60) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 30) return isSelected ? 'border-orange-500 bg-orange-50' : 'border-secondary-200 hover:border-orange-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 60) return 'ri-check-line';
    if (value === 30) return 'ri-subtract-line';
    if (value === 0) return 'ri-close-line';
    return 'ri-subtract-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 60) return 'text-accent-600';
    if (value === 30) return 'text-orange-600';
    if (value === 0) return 'text-red-600';
    return 'text-foreground-500';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['GestionDesRisques', 'RiskManagement', 'ControleInterne', 'ConformiteAfrique'],

  showRadarChart: false,

  badgeIcon: 'ri-radar-line',
  badgeTextFr: '4 catégories · 12 questions · 5 min',
  badgeTextEn: '4 categories · 12 questions · 5 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement en gestion des risques ?',
    titleEn: 'Need risk management support?',
    descriptionFr: 'Nos experts en gestion des risques vous accompagnent dans la mise en place d\'un dispositif complet de pilotage stratégique des risques.',
    descriptionEn: 'Our risk management experts support you in implementing a comprehensive strategic risk management system.',
    ctaFr: 'Planifier un rendez-vous',
    ctaEn: 'Schedule a meeting',
    ctaLink: '/contact',
  },
};