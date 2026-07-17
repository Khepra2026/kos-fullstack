export interface CatalogAgent {
  num: number;
  name: string;
  mission: string;
  domain: string;
  icon: string;
  inputs?: string[];
  process?: string[];
  outputs: string[];
  kpis?: { label: string; value: string }[];
  limits?: string[];
  confidence?: string;
}

export const catalogIntro = {
  title: 'KOS Agent Catalog™',
  subtitle: 'Bibliothèque des Agents Experts',
  version: 'VERSION EXECUTABLE – BIG FOUR AI ADVISORY SYSTEM',
  preamble: 'Ce document définit l\'ensemble des agents KOS, leur rôle, leurs limites, leurs inputs, leurs outputs et leur logique opérationnelle. Chaque agent est une unité autonome d\'expertise augmentée par IA.',
};

export const catalogAgents: CatalogAgent[] = [
  {
    num: 1,
    name: 'Strategy Advisor™',
    mission: 'Définir et analyser les stratégies d\'entreprise',
    domain: 'Stratégie d\'Entreprise',
    icon: 'ri-lightbulb-flash-line',
    inputs: ['Modèle économique', 'Marché', 'Objectifs', 'Concurrence'],
    process: ['Analyse SWOT', 'Benchmarking', 'Scénarios stratégiques', 'Gap analysis'],
    outputs: ['Plan stratégique', 'Recommandations', 'Risques identifiés'],
    kpis: [
      { label: 'Pertinence stratégique', value: '≥ 95' },
      { label: 'Clarté', value: '≥ 95' },
    ],
  },
  {
    num: 2,
    name: 'Financial Analyst™',
    mission: 'Analyser la performance financière',
    domain: 'Analyse Financière',
    icon: 'ri-line-chart-line',
    inputs: ['États financiers', 'Cashflow', 'Budget'],
    process: ['Ratios financiers', 'Analyse liquidité', 'Rentabilité', 'Solvabilité'],
    outputs: ['Diagnostic financier', 'Alertes', 'Recommandations'],
  },
  {
    num: 3,
    name: 'Tax & Compliance Advisor™',
    mission: 'Analyser fiscalité et conformité',
    domain: 'Fiscalité & Conformité',
    icon: 'ri-file-list-3-line',
    inputs: ['Structure juridique', 'Pays', 'Opérations'],
    outputs: ['Risques fiscaux', 'Optimisation', 'Conformité OHADA / international'],
  },
  {
    num: 4,
    name: 'Legal & Contracts Advisor™',
    mission: 'Analyse juridique',
    domain: 'Droit des Affaires',
    icon: 'ri-scales-line',
    outputs: ['Risques contractuels', 'Conformité légale', 'Recommandations juridiques'],
  },
  {
    num: 5,
    name: 'HR & Organization Advisor™',
    mission: 'Optimisation organisationnelle',
    domain: 'Ressources Humaines',
    icon: 'ri-team-line',
    outputs: ['Structure RH', 'Performance organisationnelle', 'Gouvernance interne'],
  },
  {
    num: 6,
    name: 'ESG Advisor™',
    mission: 'Analyse ESG',
    domain: 'Environnement, Social & Gouvernance',
    icon: 'ri-leaf-line',
    outputs: ['Score ESG', 'Risques ESG', 'Plan de conformité'],
  },
  {
    num: 7,
    name: 'Digital Transformation Advisor™',
    mission: 'Transformation digitale',
    domain: 'Transformation Digitale',
    icon: 'ri-smartphone-line',
    outputs: ['Roadmap digitale', 'Architecture IT', 'Automatisation'],
  },
  {
    num: 8,
    name: 'Cyber Risk Advisor™',
    mission: 'Sécurité informatique',
    domain: 'Cybersécurité',
    icon: 'ri-shield-keyhole-line',
    outputs: ['Vulnérabilités', 'Plan de mitigation', 'Conformité ISO 27001'],
  },
  {
    num: 9,
    name: 'OHADA Legal Expert™',
    mission: 'Expertise OHADA',
    domain: 'Droit OHADA',
    icon: 'ri-building-2-line',
    outputs: ['Conformité juridique OHADA', 'Structuration sociétés', 'Audit légal'],
  },
  {
    num: 10,
    name: 'Africa Market Intelligence™',
    mission: 'Analyse marchés africains',
    domain: 'Intelligence Économique',
    icon: 'ri-earth-line',
    outputs: ['Opportunités marché', 'Risques pays', 'Analyse macro'],
  },
  {
    num: 11,
    name: 'Investment Readiness Advisor™',
    mission: 'Préparation levée de fonds',
    domain: 'Investment Readiness',
    icon: 'ri-funds-line',
    outputs: ['Pitch deck analysis', 'Valuation guidance', 'Due diligence readiness'],
  },
  {
    num: 12,
    name: 'M&A Advisor™',
    mission: 'Fusions & acquisitions',
    domain: 'M&A',
    icon: 'ri-git-merge-line',
    outputs: ['Synergies', 'Valorisation', 'Risques transactionnels'],
  },
  {
    num: 13,
    name: 'Risk Manager™',
    mission: 'Gestion globale des risques',
    domain: 'Risk Management',
    icon: 'ri-alert-line',
    outputs: ['Risk map', 'Mitigation plan', 'Scoring'],
  },
  {
    num: 14,
    name: 'ESG Reporting Specialist™',
    mission: 'Reporting ESG structuré',
    domain: 'Reporting ESG',
    icon: 'ri-file-chart-line',
    outputs: ['Rapports ESG', 'Conformité GRI / ISSB'],
  },
  {
    num: 15,
    name: 'Board Advisor™',
    mission: 'Conseil Conseil d\'Administration',
    domain: 'Gouvernance Board',
    icon: 'ri-vip-crown-line',
    outputs: ['Brief stratégique', 'Decision support', 'Risk summary'],
  },
  {
    num: 16,
    name: 'Document Intelligence Engine™',
    mission: 'Analyse documentaire',
    domain: 'Intelligence Documentaire',
    icon: 'ri-file-search-line',
    outputs: ['Extraction données', 'Résumé', 'Classification'],
  },
  {
    num: 17,
    name: 'Lead Qualification Engine™',
    mission: 'Qualifier prospects',
    domain: 'Lead Qualification',
    icon: 'ri-user-search-line',
    outputs: ['Score lead', 'Classification cold/warm/hot'],
  },
  {
    num: 18,
    name: 'Conversion Engine™',
    mission: 'Transformer intérêt en RDV',
    domain: 'Conversion',
    icon: 'ri-hand-heart-line',
    outputs: ['Proposition audit', 'CTA consultation'],
  },
  {
    num: 19,
    name: 'Knowledge Validation Engine™',
    mission: 'Vérification information',
    domain: 'Validation des Connaissances',
    icon: 'ri-check-double-line',
    outputs: ['Validation sources', 'Score fiabilité'],
  },
  {
    num: 20,
    name: 'Content Strategy Engine™',
    mission: 'Production de contenu expert',
    domain: 'Stratégie de Contenu',
    icon: 'ri-article-line',
    outputs: ['Articles', 'Posts', 'Rapports'],
  },
  {
    num: 21,
    name: 'API Connectivity Engineer™',
    mission: 'Auditer, gérer et optimiser les connexions API sociales — OAuth 2.0, tokens, scopes, MDP',
    domain: 'API Social Connectivity',
    icon: 'ri-plug-line',
    inputs: ['Tokens OAuth', 'Scopes disponibles', 'Endpoints cibles', 'Logs d\'erreur'],
    process: ['Audit de connectivité', 'Gap analysis des scopes', 'Feuille de route MDP', 'Monitoring 24/7', 'Rotation automatique'],
    outputs: ['Token Health Report', 'Scope Upgrade Roadmap', 'MDP Application Package', 'Hybrid Mode Status', 'Incident Reports'],
    kpis: [
      { label: 'APIs Live', value: '≥ 80%' },
      { label: 'Token Validity', value: '100%' },
    ],
  },
];

export const globalAgentRules: { num: number; rule: string; icon: string }[] = [
  { num: 1, rule: 'Aucun agent ne doit inventer de données.', icon: 'ri-forbid-line' },
  { num: 2, rule: 'Toute affirmation doit être justifiable.', icon: 'ri-file-search-line' },
  { num: 3, rule: 'Les agents peuvent collaborer.', icon: 'ri-git-branch-line' },
  { num: 4, rule: 'Les décisions critiques passent par validation multi-agents.', icon: 'ri-team-line' },
  { num: 5, rule: 'La qualité minimale est 95/100.', icon: 'ri-check-double-line' },
];

export const orchestrationModel: string[] = [
  'Utilisateur',
  'Orchestrateur',
  'Agents spécialisés',
  'Synthèse',
  'Validation',
  'Livraison',
];

export const systemKPIs: { label: string; value: string; icon: string; color: string }[] = [
  { label: 'Précision', value: '≥ 98%', icon: 'ri-crosshair-line', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Satisfaction', value: '≥ 95%', icon: 'ri-heart-line', color: 'from-amber-600 to-amber-700' },
  { label: 'Conversion', value: '≥ 30%', icon: 'ri-line-chart-line', color: 'from-deloitte-600 to-deloitte-700' },
  { label: 'Hallucination', value: '≈ 0%', icon: 'ri-shield-check-line', color: 'from-rose-600 to-rose-700' },
  { label: 'Cohérence multi-agents', value: '≥ 95%', icon: 'ri-git-branch-line', color: 'from-teal-600 to-teal-700' },
];

export const catalogFinalObjective = 'Transformer chaque agent en consultant virtuel spécialisé, expert Big Four augmenté, analyste sectoriel, générateur de valeur et accélérateur de décision.';