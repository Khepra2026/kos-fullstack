export interface LegalRiskCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  score: number;
  maxScore: number;
  issues: number;
  description: string;
}

export interface LegalContentScan {
  id: string;
  title: string;
  type: 'landing' | 'proposal' | 'whitepaper' | 'tool' | 'blog' | 'case_study' | 'social';
  url: string;
  riskScore: number;
  maxScore: number;
  category: string;
  status: 'approved' | 'review' | 'blocked';
  issues: { before: string; after: string; severity: 'critical' | 'major' | 'minor'; explanation: string; category: string }[];
}

export interface LegalReviewStage {
  id: string;
  name: string;
  icon: string;
  color: string;
  threshold: string;
  description: string;
  approver: string;
}

export const LEGAL_RISK_CATEGORIES: LegalRiskCategory[] = [
  { id: 'promises', name: 'Promesses Non Démontrables', icon: 'ri-error-warning-line', color: '#C2410C', score: 78, maxScore: 100, issues: 4, description: 'Affirmations de résultats, garanties implicites, promesses commerciales non étayées par des preuves.' },
  { id: 'absolute', name: 'Affirmations Absolues', icon: 'ri-forbid-line', color: '#D97738', score: 82, maxScore: 100, issues: 3, description: 'Superlatifs non vérifiables, positionnement concurrentiel non documenté, prétentions d\'exclusivité.' },
  { id: 'guarantees', name: 'Garanties Abusives', icon: 'ri-shield-cross-line', color: '#C2410C', score: 85, maxScore: 100, issues: 2, description: 'Garanties contractuelles excessives, engagement de résultat sans conditions, clauses déséquilibrées.' },
  { id: 'reputation', name: 'Risques Réputationnels', icon: 'ri-alert-line', color: '#E8C547', score: 80, maxScore: 100, issues: 3, description: 'Ton inapproprié, confusion institutionnelle, associations risquées, contenus polémiques.' },
  { id: 'rgpd', name: 'Conformité RGPD & Données', icon: 'ri-lock-2-line', color: '#86BC25', score: 88, maxScore: 100, issues: 1, description: 'Formulaires de collecte, mentions légales, cookies, conservation des données, transferts hors UE.' },
  { id: 'ip', name: 'Propriété Intellectuelle', icon: 'ri-copyright-line', color: '#5B8C2A', score: 90, maxScore: 100, issues: 1, description: 'Droits d\'auteur, marques déposées, licences images, citations, plagiat, contenus tiers.' },
  { id: 'ohada', name: 'Droit des Affaires OHADA', icon: 'ri-scales-3-line', color: '#9B7B2C', score: 84, maxScore: 100, issues: 2, description: 'CGV, contrats types, mentions obligatoires, droit commercial uniforme, clauses abusives.' },
  { id: 'banking', name: 'Droit Bancaire & Financier', icon: 'ri-bank-line', color: '#0D7B5F', score: 92, maxScore: 100, issues: 0, description: 'Analyses réglementaires publiées, interprétation des textes, conseil juridique déguisé, disclaimer.' },
];

export const LEGAL_REVIEW_STAGES: LegalReviewStage[] = [
  { id: 'approved', name: 'Approuvé', icon: 'ri-checkbox-circle-line', color: '#86BC25', threshold: '90-100', description: 'Aucun risque détecté. Contenu publiable sans restriction.', approver: 'Système Automatique' },
  { id: 'senior', name: 'Revue Senior Requise', icon: 'ri-user-star-line', color: '#E8C547', threshold: '75-89', description: 'Risques mineurs identifiés. Revue par un Senior Partner avant publication.', approver: 'Senior Partner' },
  { id: 'legal', name: 'Revue Legal Partner', icon: 'ri-scales-3-line', color: '#D97738', threshold: '60-74', description: 'Risques significatifs. Revue obligatoire par le Legal Partner avant toute diffusion.', approver: 'Legal Partner' },
  { id: 'blocked', name: 'Bloqué', icon: 'ri-lock-2-line', color: '#C2410C', threshold: '< 60', description: 'Risques critiques détectés. Contenu automatiquement bloqué. Correction obligatoire.', approver: 'Système Automatique' },
];

export const LEGAL_CONTENT_SCANS: LegalContentScan[] = [
  {
    id: 'legal-1', title: 'Page Service — Contrôle Interne Bancaire', type: 'landing',
    url: '/services/controle-interne-bancaire', riskScore: 62, maxScore: 100, category: 'guarantees', status: 'review',
    issues: [
      { before: 'Nous garantissons l\'obtention de votre agrément dans les délais les plus courts.', after: 'Nous vous accompagnons dans la préparation de votre dossier d\'agrément avec une méthodologie éprouvée.', severity: 'critical', explanation: 'Aucun cabinet ne peut garantir l\'obtention d\'un agrément administratif. La formulation originale crée un risque juridique d\'engagement de résultat.', category: 'guarantees' },
      { before: 'KHEPRA est le leader incontesté du conseil réglementaire en Afrique.', after: 'KHEPRA est un cabinet de référence en intelligence réglementaire africaine.', severity: 'major', explanation: 'L\'affirmation de leadership sans source vérifiable constitue une pratique commerciale trompeuse au sens du droit OHADA.', category: 'absolute' },
    ],
  },
  {
    id: 'legal-2', title: 'Landing Page — Due Diligence Acquisition', type: 'landing',
    url: '/services/due-diligence-acquisition', riskScore: 78, maxScore: 100, category: 'promises', status: 'review',
    issues: [
      { before: 'Notre due diligence élimine 100% des risques cachés.', after: 'Notre due diligence identifie et documente les risques matériels selon les standards ISA 200-700.', severity: 'critical', explanation: 'Aucune due diligence ne peut garantir l\'élimination totale des risques. La formulation originale engage la responsabilité professionnelle du cabinet.', category: 'promises' },
      { before: 'Les dossiers les plus complexes résolus en 5 jours.', after: 'Notre méthodologie accélérée permet de livrer un rapport préliminaire sous 10 jours ouvrés.', severity: 'major', explanation: 'Le délai de 5 jours n\'est pas réaliste pour une due diligence complète et crée une attente impossible à satisfaire systématiquement.', category: 'promises' },
    ],
  },
  {
    id: 'legal-3', title: 'Proposition Technique — Audit BCEAO', type: 'proposal',
    url: '/proposals (interne)', riskScore: 72, maxScore: 100, category: 'absolute', status: 'review',
    issues: [
      { before: 'Seul KHEPRA maîtrise l\'intégralité du corpus réglementaire UEMOA.', after: 'KHEPRA dispose d\'une connaissance approfondie du corpus réglementaire UEMOA, documentée par 52 textes intégrés à notre base RAG.', severity: 'major', explanation: 'L\'affirmation d\'exclusivité est invérifiable et potentiellement trompeuse. La version corrigée apporte une preuve concrète (52 textes RAG).', category: 'absolute' },
    ],
  },
  {
    id: 'legal-4', title: 'Livre Blanc — Agrément SFD BCEAO', type: 'whitepaper',
    url: '/whitepapers (téléchargement)', riskScore: 85, maxScore: 100, category: 'banking', status: 'review',
    issues: [
      { before: 'La BCEAO exige systématiquement un business plan à 5 ans.', after: 'L\'Instruction BCEAO N° 008-2011 recommande un business plan à 5 ans pour les dossiers d\'agrément. Consultez notre framework MFI Business Plan UEMOA pour le format standardisé.', severity: 'minor', explanation: 'La formulation originale transforme une recommandation en exigence absolue. Précision ajoutée avec référence réglementaire exacte.', category: 'banking' },
    ],
  },
  {
    id: 'legal-5', title: 'Page Service — Prix de Transfert', type: 'landing',
    url: '/services/defense-fiscale-prix-transfert', riskScore: 68, maxScore: 100, category: 'promises', status: 'review',
    issues: [
      { before: 'Protection garantie contre tout redressement fiscal.', after: 'Nous renforçons votre documentation prix de transfert pour réduire significativement le risque de redressement.', severity: 'critical', explanation: 'Aucun cabinet ne peut garantir une protection totale contre le risque fiscal. La version corrigée reflète la réalité du conseil professionnel.', category: 'promises' },
    ],
  },
  {
    id: 'legal-6', title: 'Boîte à Outils — Diagnostic Pré-Inspection', type: 'tool',
    url: '/tools/diagnostic-pre-inspection-bceao-cobac', riskScore: 92, maxScore: 100, category: 'rgpd', status: 'approved',
    issues: [],
  },
  {
    id: 'legal-7', title: 'Article Blog — Conformité GAFI 40 Recommandations', type: 'blog',
    url: '/blog/conformite-cobac-cemac', riskScore: 88, maxScore: 100, category: 'banking', status: 'review',
    issues: [
      { before: 'Le GAFI sanctionne les pays non conformes.', after: 'Le GAFI peut inscrire les juridictions non conformes sur sa liste de surveillance renforcée (grey list) ou, dans les cas les plus graves, sur sa liste noire, avec des conséquences sur l\'accès au système financier international.', severity: 'minor', explanation: 'La formulation originale est trop simpliste et pourrait induire en erreur sur le mécanisme gradué du GAFI (grey list vs black list).', category: 'banking' },
    ],
  },
  {
    id: 'legal-8', title: 'Formation — LBC/FT Niveau 1', type: 'social',
    url: '/formations (page description)', riskScore: 75, maxScore: 100, category: 'guarantees', status: 'review',
    issues: [
      { before: 'Formation certifiante reconnue par toutes les banques centrales.', after: 'Formation conçue selon les standards GAFI/GIABA/GABAC, alignée sur les exigences de formation LBC/FT des régulateurs bancaires.', severity: 'major', explanation: 'Aucune formation privée n\'est officiellement certifiée par l\'ensemble des banques centrales. La version corrigée est précise sans être trompeuse.', category: 'guarantees' },
    ],
  },
  {
    id: 'legal-9', title: 'Case Study — RegTech Conformité UEMOA/CEMAC', type: 'case_study',
    url: '/case-studies/regtech-conformite-uemoa-cemac', riskScore: 90, maxScore: 100, category: 'reputation', status: 'approved',
    issues: [],
  },
  {
    id: 'legal-10', title: 'Proposition Commerciale — Conseil en Gouvernance', type: 'proposal',
    url: '/proposals (interne)', riskScore: 58, maxScore: 100, category: 'ohada', status: 'blocked',
    issues: [
      { before: 'Notre méthodologie remplace intégralement votre dispositif de contrôle interne.', after: 'Notre méthodologie complète et renforce votre dispositif de contrôle interne existant selon le référentiel COSO 2013.', severity: 'critical', explanation: 'Proposer de remplacer le dispositif de contrôle interne d\'un établissement peut être interprété comme une ingérence dans la gouvernance, contraire aux principes COSO et aux circulaires COBAC.', category: 'ohada' },
      { before: 'Nous prenons en charge l\'intégralité de votre conformité réglementaire.', after: 'Nous vous accompagnons dans le renforcement de votre conformité réglementaire et le transfert de compétences vers vos équipes.', severity: 'major', explanation: 'La prise en charge totale de la conformité crée une dépendance et pourrait engager la responsabilité du cabinet en cas de défaillance. Le conseil doit renforcer les capacités internes.', category: 'ohada' },
    ],
  },
  {
    id: 'legal-11', title: 'Page Contact — Formulaire', type: 'landing',
    url: '/contact', riskScore: 95, maxScore: 100, category: 'rgpd', status: 'approved',
    issues: [],
  },
  {
    id: 'legal-12', title: 'Newsletter — Regulatory Pulse', type: 'social',
    url: '/ (inscription newsletter)', riskScore: 91, maxScore: 100, category: 'rgpd', status: 'approved',
    issues: [],
  },
  {
    id: 'legal-13', title: 'Post LinkedIn — Analyse COBAC R-2018/01', type: 'social',
    url: '/social (LinkedIn)', riskScore: 82, maxScore: 100, category: 'reputation', status: 'review',
    issues: [
      { before: 'La COBAC impose des exigences absurdes aux EMF.', after: 'La COBAC a renforcé ses exigences pour les EMF avec le Règlement R-2018/01. Notre analyse décrypte les implications opérationnelles.', severity: 'major', explanation: 'Qualifier des exigences réglementaires d\'absurdes constitue un risque réputationnel majeur vis-à-vis du régulateur et des clients établissements assujettis.', category: 'reputation' },
    ],
  },
  {
    id: 'legal-14', title: 'Livre Blanc — Cartographie des Risques COSO ERM', type: 'whitepaper',
    url: '/whitepapers (téléchargement)', riskScore: 87, maxScore: 100, category: 'ip', status: 'review',
    issues: [
      { before: 'Le COSO ERM 2017 préconise une approche en 5 composantes.', after: 'Le COSO ERM 2017 (© Committee of Sponsoring Organizations of the Treadway Commission) structure la gestion des risques en 5 composantes interdépendantes.', severity: 'minor', explanation: 'Ajout de l\'attribution de copyright COSO et précision du caractère interdépendant des composantes (pas séquentielles).', category: 'ip' },
    ],
  },
  {
    id: 'legal-15', title: 'Page CGU — Conditions Générales', type: 'landing',
    url: '/cgu', riskScore: 94, maxScore: 100, category: 'ohada', status: 'approved',
    issues: [],
  },
  {
    id: 'legal-16', title: 'Guide — Due Diligence Afrique', type: 'whitepaper',
    url: '/guide-due-diligence-afrique', riskScore: 79, maxScore: 100, category: 'promises', status: 'review',
    issues: [
      { before: 'Notre guide vous permet d\'éviter tous les pièges des acquisitions en Afrique.', after: 'Notre guide identifie 12 risques clés et fournit une checklist actionnable pour sécuriser vos acquisitions en Afrique francophone.', severity: 'major', explanation: 'Promettre d\'éviter tous les pièges est une promesse non démontrable. La version corrigée est spécifique (12 risques) et concrète (checklist).', category: 'promises' },
    ],
  },
];

export const LEGAL_VALIDATION_STATS = {
  totalScans: 16,
  approved: 5,
  reviewRequired: 10,
  blocked: 1,
  avgRiskScore: 81.6,
  criticalIssues: 4,
  totalIssues: 16,
  targetScore: 90,
};

export const LEGAL_CORRECTIONS_EXAMPLES = [
  { before: 'conformité garantie à 100 %', after: 'accompagnement visant l\'atteinte du plus haut niveau de conformité selon les exigences applicables', category: 'Garanties Abusives' },
  { before: 'leader incontesté du conseil en Afrique', after: 'cabinet de référence en intelligence réglementaire africaine', category: 'Affirmations Absolues' },
  { before: 'zéro risque de sanction', after: 'réduction significative du risque de non-conformité', category: 'Promesses Non Démontrables' },
  { before: 'nous garantissons l\'obtention de l\'agrément', after: 'nous vous accompagnons dans la préparation de votre dossier d\'agrément', category: 'Garanties Abusives' },
  { before: 'élimine 100% des risques', after: 'identifie et documente les risques matériels selon ISA 200-700', category: 'Promesses Non Démontrables' },
];

export const SCORING_12_BLOCS = [
  { id: 1, name: 'Regulatory Compliance', icon: 'ri-shield-check-line', color: '#0D7B5F', score: 91, target: 97, status: 'proche' as const, hub: '/kos-regulatory-compliance-engine', modules: 5, agents: 4 },
  { id: 2, name: 'Legal Validation', icon: 'ri-scales-3-line', color: '#C2410C', score: 85, target: 95, status: 'progression' as const, hub: '/kos-content-correction-engine', modules: 3, agents: 2 },
  { id: 3, name: 'Big Four Quality', icon: 'ri-medal-line', color: '#D97738', score: 83, target: 95, status: 'progression' as const, hub: '/kos-quality-excellence-command', modules: 6, agents: 3 },
  { id: 4, name: 'Knowledge Authority', icon: 'ri-book-open-line', color: '#9B7B2C', score: 85, target: 95, status: 'progression' as const, hub: '/kos-research-institute', modules: 6, agents: 5 },
  { id: 5, name: 'SEO Autopilot', icon: 'ri-search-line', color: '#5B8C2A', score: 88, target: 97, status: 'proche' as const, hub: '/kos-seo-autopilot', modules: 9, agents: 8 },
  { id: 6, name: 'Thought Leadership', icon: 'ri-lightbulb-flash-line', color: '#C05A3A', score: 88, target: 95, status: 'proche' as const, hub: '/kos-think-tank-automates', modules: 5, agents: 3 },
  { id: 7, name: 'Governance', icon: 'ri-government-line', color: '#6B4A3A', score: 90, target: 96, status: 'proche' as const, hub: '/kos-enterprise-governance-command', modules: 5, agents: 4 },
  { id: 8, name: 'Client Trust', icon: 'ri-heart-line', color: '#8B3040', score: 86, target: 95, status: 'progression' as const, hub: '/case-studies', modules: 4, agents: 2 },
  { id: 9, name: 'Risk Management', icon: 'ri-alert-line', color: '#E8C547', score: 90, target: 96, status: 'proche' as const, hub: '/kos-risk-diligence-command', modules: 4, agents: 3 },
  { id: 10, name: 'AI Governance', icon: 'ri-robot-line', color: '#4A7A1E', score: 87, target: 96, status: 'proche' as const, hub: '/kos-ai-governance-ethics', modules: 9, agents: 5 },
  { id: 11, name: 'Institutional Visibility', icon: 'ri-building-2-line', color: '#2D7A3A', score: 93, target: 97, status: 'proche' as const, hub: '/kos-institutional-visibility', modules: 9, agents: 9 },
  { id: 12, name: 'Executive Control Tower', icon: 'ri-dashboard-line', color: '#C2410C', score: 88, target: 98, status: 'proche' as const, hub: '/kos-control-tower-automation', modules: 6, agents: 5 },
];

export const ROADMAP_30_90_180_365 = [
  { phase: '30 jours', target: 91, actions: ['Legal Validation — 3 issues critiques', 'Peer Review Workflow', 'Blog Writing Pipeline', 'CWV Performance Fix', '20 KRIs définis', 'Quality Gates IA renforcés'] },
  { phase: '90 jours', target: 95, actions: ['Heatmap Compliance Matrix', 'Agents COBAC/OHADA/ESG actifs', '500 pages expertes, 1500 backlinks', 'Trust Center™ complet', '8/14 bailleurs accrédités', 'Préparation ISO 42001'] },
  { phase: '180 jours', target: 97, actions: ['Score conformité 97%', 'Score Qualité Big Four 95/100', '750 pages expertes, 3000 backlinks', 'Advisory Board 5/7 membres', '10/14 bailleurs accrédités'] },
  { phase: '365 jours', target: 99, actions: ['1000 pages expertes, 5000 backlinks', 'Advisory Board + Scientific Committee complets', 'Certification ISO 42001', '11/14 bailleurs accrédités', 'Score Global 99/100'] },
];





