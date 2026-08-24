// =============================================================================
// KHEPRA EXPERTS — 3 BUSINESS UNITS — Constitution v1.0
// Phase: Alignement Constitutionnel 2026 — Comité de Direction Stratégique Big Four
// BU1 — Régulation Financière (REGULATORY & FINANCIAL SERVICES)
// BU2 — Prix de Transfert et Fiscalité Internationale (TRANSFER PRICING & TAX)
// BU3 — Gouvernance, Risques et Conformité (GOVERNANCE, RISK & COMPLIANCE)
// Référence : KHEPRA_CONSTITUTION.md Article 2
// =============================================================================

export interface MainOffer {
  id: string;
  slug: string;
  nameFr: string;
  nameEn: string;
  taglineFr: string;
  taglineEn: string;
  targetFr: string;
  targetEn: string;
  problemFr: string;
  problemEn: string;
  solutionFr: string;
  solutionEn: string;
  resultFr: string;
  resultEn: string;
  benefitsFr: string[];
  benefitsEn: string[];
  deliverablesFr: string[];
  deliverablesEn: string[];
  metricValue: string;
  metricLabelFr: string;
  metricLabelEn: string;
  icon: string;
  accentColor: string;
  imagePrompt: string;
}

export const MAIN_OFFERS: MainOffer[] = [
  // OFFRE 1 — TRANSFER PRICING & TAX GOVERNANCE AFRICA (Rang #1 — Score 7.95/10)
  {
    id: 'transfer-pricing',
    slug: '/services/gouvernance-fiscalite-internationale',
    nameFr: 'Transfer Pricing & Tax Governance Africa\u2122',
    nameEn: 'Transfer Pricing & Tax Governance Africa\u2122',
    taglineFr: 'Vos transactions intragroupe document\u00e9es et d\u00e9fendables en 30 jours',
    taglineEn: 'Your intragroup transactions documented and defendable in 30 days',
    targetFr: 'Groupes panafricains, multinationales, banques, IMF, fintechs, holdings familiales',
    targetEn: 'Pan-African groups, multinationals, banks, MFIs, fintechs, family holdings',
    problemFr: 'Vos transactions intragroupe ne sont pas document\u00e9es conform\u00e9ment aux standards OCDE BEPS. Risque de redressement fiscal de 500M \u00e0 2 000M FCFA, m\u00eame sans intention frauduleuse. Le simple d\u00e9faut de documentation est sanctionnable.',
    problemEn: 'Your intragroup transactions are not documented in compliance with OECD BEPS standards. Tax reassessment risk of \u20ac0.8M-\u20ac3M, even without fraudulent intent. Simple lack of documentation is sanctionable.',
    solutionFr: 'M\u00e9thodologie OCDE BEPS Action 13 en 5 phases : cartographie exhaustive des flux intragroupe, analyse fonctionnelle FAR, analyse \u00e9conomique, documentation Local File + Master File, renforcement des capacit\u00e9s.',
    solutionEn: 'OECD BEPS Action 13 methodology in 5 phases: exhaustive intragroup flow mapping, FAR functional analysis, economic analysis, Local File + Master File documentation, capacity building.',
    resultFr: 'Documentation BEPS compl\u00e8te et d\u00e9fendable, politique interne de prix de transfert formalis\u00e9e, \u00e9quipes form\u00e9es. Risque de redressement r\u00e9duit de 80%.',
    resultEn: 'Complete and defendable BEPS documentation, formalized internal transfer pricing policy, trained teams. Reassessment risk reduced by 80%.',
    benefitsFr: ['Score de conformit\u00e9 OCDE BEPS sur 100 en 8 minutes', 'Cartographie exhaustive des flux intragroupe', 'Analyse fonctionnelle FAR document\u00e9e', 'Master File + Local File conforme BEPS', 'Assistance contr\u00f4le fiscal et d\u00e9fense'],
    benefitsEn: ['OECD BEPS compliance score out of 100 in 8 minutes', 'Exhaustive intragroup flow mapping', 'Documented FAR functional analysis', 'BEPS-compliant Master File + Local File', 'Tax audit assistance and defense'],
    deliverablesFr: ['Cartographie compl\u00e8te des transactions intragroupe', 'Analyse fonctionnelle FAR document\u00e9e', 'Dossier Local File + Master File conforme OCDE BEPS', '\u00c9tude de benchmarking et analyse \u00e9conomique', 'Politique interne de prix de transfert', 'Formation des \u00e9quipes Finance, Fiscalit\u00e9, Conformit\u00e9'],
    deliverablesEn: ['Complete intragroup transaction mapping', 'Documented FAR functional analysis', 'OECD BEPS-compliant Local File + Master File', 'Benchmarking study and economic analysis', 'Internal transfer pricing policy', 'Training for Finance, Tax, Compliance teams'],
    metricValue: '80%',
    metricLabelFr: 'de r\u00e9duction du risque de redressement fiscal BEPS \u00b7 Diagnostic gratuit 8 min',
    metricLabelEn: 'reduction in BEPS tax reassessment risk \u00b7 Free 8-min diagnostic',
    icon: 'ri-scales-3-line',
    accentColor: '#b45309',
    imagePrompt: 'african financial executives reviewing transfer pricing documentation OECD BEPS compliance in modern boardroom with intra-group transaction flowcharts and tax governance frameworks on large screen warm amber lighting sophisticated professional atmosphere Lom\u00e9 Togo West Africa',
  },
  // OFFRE 2 — BCEAO & COBAC INSPECTION READINESS (Rang #0 — Score 8.05/10)
  {
    id: 'bceao-cobac-inspection',
    slug: '/services/audit-pre-inspection-bceao',
    nameFr: 'BCEAO & COBAC Inspection Readiness\u2122',
    nameEn: 'BCEAO & COBAC Inspection Readiness\u2122',
    taglineFr: 'Soyez pr\u00eat avant que le r\u00e9gulateur n\'arrive',
    taglineEn: 'Be ready before the regulator arrives',
    targetFr: 'Banques, SFD/EMF, fintechs, \u00e9tablissements de paiement en zone UEMOA/CEMAC',
    targetEn: 'Banks, MFIs, fintechs, payment institutions in WAEMU/CEMAC',
    problemFr: 'Une inspection BCEAO/COBAC peut entra\u00eener : mise en demeure publique, suspension d\'activit\u00e9, amende jusqu\'\u00e0 500M FCFA, r\u00e9vocation de dirigeants. D\u00e9lai typique de 2-4 semaines entre annonce et inspection \u2014 insuffisant pour combler des lacunes structurelles.',
    problemEn: 'A BCEAO/COBAC inspection can result in: public formal notice, activity suspension, fines up to \u20ac750,000, executive dismissal. Typical 2-4 week window between announcement and inspection \u2014 insufficient to fix structural gaps.',
    solutionFr: 'Simulation compl\u00e8te d\'inspection : audit \u00e0 blanc des 25 constats les plus sanctionn\u00e9s, diagnostic de pr\u00e9paration, plan de rem\u00e9diation, et assistance pendant l\'inspection r\u00e9elle.',
    solutionEn: 'Complete inspection simulation: mock audit of the 25 most sanctioned findings, readiness diagnostic, remediation plan, and support during the actual inspection.',
    resultFr: 'Institution pr\u00eate pour l\'inspection, constats critiques corrig\u00e9s en amont, \u00e9quipe form\u00e9e \u00e0 la gestion de l\'inspection. 0 sanction \u00e9vitable.',
    resultEn: 'Institution ready for inspection, critical findings corrected in advance, team trained in inspection management. 0 avoidable sanctions.',
    benefitsFr: ['Base de donn\u00e9es des 25 constats de sanction les plus fr\u00e9quents', 'Audit \u00e0 blanc simulant une vraie inspection', 'Double comp\u00e9tence BCEAO + COBAC (UEMOA + CEMAC)', 'Plan de rem\u00e9diation cl\u00e9-en-main', 'Assistance pendant l\'inspection r\u00e9elle'],
    benefitsEn: ['Database of the 25 most frequent sanction findings', 'Mock audit simulating a real inspection', 'Dual BCEAO + COBAC expertise (WAEMU + CEMAC)', 'Turnkey remediation plan', 'Support during actual inspection'],
    deliverablesFr: ['Rapport d\'audit \u00e0 blanc complet', 'Matrice des constats avec criticit\u00e9', 'Plan de rem\u00e9diation prioris\u00e9', 'Dossier de preuves organis\u00e9', 'Formation des \u00e9quipes \u00e0 l\'inspection', 'Assistance pendant l\'inspection r\u00e9elle'],
    deliverablesEn: ['Complete mock audit report', 'Findings matrix with criticality', 'Prioritized remediation plan', 'Organized evidence file', 'Team inspection training', 'Support during actual inspection'],
    metricValue: '100%',
    metricLabelFr: 'des clients pr\u00eats avant l\'inspection \u00b7 47 constats r\u00e9solus en 90 jours en moyenne',
    metricLabelEn: 'of clients ready before inspection \u00b7 47 findings resolved in 90 days on average',
    icon: 'ri-shield-flash-line',
    accentColor: '#0891b2',
    imagePrompt: 'african banking compliance officers and regulators in formal inspection meeting with regulatory documents compliance checklists and governance frameworks on screens, cyan accent lighting, serious regulatory atmosphere, Lom\u00e9 Togo West Africa institutional setting',
  },
  // OFFRE 3 — DUE DILIGENCE & INVESTMENT READINESS EXCELLENCE (Rang #2 — Score 7.35/10)
  {
    id: 'due-diligence',
    slug: '/services/due-diligence-acquisition',
    nameFr: 'Investment Readiness & Due Diligence Excellence\u2122',
    nameEn: 'Investment Readiness & Due Diligence Excellence\u2122',
    taglineFr: '9 projets sur 10 \u00e9chouent avant la 1\u00e8re r\u00e9union investisseur \u2014 pas le v\u00f4tre',
    taglineEn: '9 out of 10 projects fail before the 1st investor meeting \u2014 not yours',
    targetFr: 'Investisseurs PE/VC, fonds d\'impact, acqu\u00e9reurs, banques, DFI, startups et PME en lev\u00e9e',
    targetEn: 'PE/VC investors, impact funds, acquirers, banks, DFIs, startups and fundraising SMEs',
    problemFr: '70% des dossiers de lev\u00e9e sont rejet\u00e9s au premier screening. Dossier non investor-grade, gouvernance insuffisante, valorisation non document\u00e9e. 9 projets africains sur 10 \u00e9chouent avant m\u00eame la premi\u00e8re r\u00e9union.',
    problemEn: '70% of fundraising applications are rejected at first screening. Non investor-grade file, insufficient governance, undocumented valuation. 9 out of 10 African projects fail before the first meeting.',
    solutionFr: 'Due diligence pluridisciplinaire (financi\u00e8re, juridique, technique, ESG) m\u00e9thodologie Big Four adapt\u00e9e UEMOA/CEMAC + pr\u00e9paration compl\u00e8te investor-grade (pitch deck, IM, data room, valorisation).',
    solutionEn: 'Multidisciplinary due diligence (financial, legal, technical, ESG) with Big Four methodology adapted to WAEMU/CEMAC + complete investor-grade preparation (pitch deck, IM, data room, valuation).',
    resultFr: 'Dossier investisseur irr\u00e9prochable, 97% des red flags d\u00e9tect\u00e9s avant closing, acc\u00e8s r\u00e9seau 20+ investisseurs, +60% taux de succ\u00e8s en lev\u00e9e.',
    resultEn: 'Flawless investor package, 97% red flags detected before closing, access to 20+ investor network, +60% fundraising success rate.',
    benefitsFr: ['Due diligence pluridisciplinaire (finance, droit, technique, ESG)', 'Ind\u00e9pendance totale et confidentialit\u00e9 absolue (NDA syst\u00e9matique)', 'M\u00e9thodologie Big Four adapt\u00e9e au contexte africain', 'R\u00e9seau 20+ investisseurs PE/VC, DFI, fonds impact'],
    benefitsEn: ['Multidisciplinary due diligence (finance, law, technical, ESG)', 'Total independence and absolute confidentiality (systematic NDA)', 'Big Four methodology adapted to the African context', '20+ PE/VC, DFI, impact fund investor network'],
    deliverablesFr: ['Rapport de due diligence financi\u00e8re, juridique, technique, ESG', 'Matrice des risques et recommandations de n\u00e9gociation', 'Pitch deck investisseurs (20 slides)', 'M\u00e9morandum d\'information (40-80 pages)', 'Mod\u00e8le financier 5 ans audit\u00e9 + Data Room structur\u00e9e', 'Shortlist investisseurs qualifi\u00e9s + scoring'],
    deliverablesEn: ['Financial, legal, technical, ESG due diligence report', 'Risk matrix and negotiation recommendations', 'Investor pitch deck (20 slides)', 'Information memorandum (40-80 pages)', 'Audited 5-year financial model + Structured Data Room', 'Qualified investor shortlist + scoring'],
    metricValue: '\u20ac500M+',
    metricLabelFr: 'de transactions pass\u00e9es en revue \u00b7 97% red flags d\u00e9tect\u00e9s \u00b7 +60% succ\u00e8s en lev\u00e9e',
    metricLabelEn: 'in transactions reviewed \u00b7 97% red flags detected \u00b7 +60% fundraising success',
    icon: 'ri-search-eye-line',
    accentColor: '#0f766e',
    imagePrompt: 'african investment professionals conducting due diligence analysis with multiple screens showing financial data and risk matrices, dark premium office setting with teal accent lighting, professional corporate atmosphere Lom\u00e9 Togo',
  },
  // OFFRE 4 — FAMILY BUSINESS GOVERNANCE & CEO ADVISORY BOARD (Rang #4 — Score 7.05/10)
  {
    id: 'family-governance-ceo-board',
    slug: '/services/ceo-advisory-board',
    nameFr: 'Family Business Governance & CEO Advisory Board Africa\u2122',
    nameEn: 'Family Business Governance & CEO Advisory Board Africa\u2122',
    taglineFr: 'De la transmission familiale au pilotage strat\u00e9gique du dirigeant',
    taglineEn: 'From family succession to the leader\'s strategic steering',
    targetFr: 'Groupes familiaux, DG, PCA, holdings familiales, dirigeants de groupes en Afrique francophone',
    targetEn: 'Family groups, CEOs, Board Chairs, family holdings, group leaders in Francophone Africa',
    problemFr: '70% des entreprises familiales africaines ne survivent pas \u00e0 la 2e g\u00e9n\u00e9ration. La solitude du dirigeant co\u00fbte des centaines de millions FCFA en erreurs strat\u00e9giques. Pas de Conseil de Famille, pas de plan de succession, pas de gouvernance structur\u00e9e.',
    problemEn: '70% of African family businesses don\'t survive the 2nd generation. CEO isolation costs hundreds of millions in strategic errors. No Family Council, no succession plan, no structured governance.',
    solutionFr: 'Structuration de la gouvernance familiale (Conseil de Famille, Constitution, succession) ET CEO Advisory Board mensuel (2-3 experts seniors qui challengent vos d\u00e9cisions strat\u00e9giques sur 4 piliers).',
    solutionEn: 'Family governance structuring (Family Council, Constitution, succession) AND monthly CEO Advisory Board (2-3 senior experts challenging your strategic decisions across 4 pillars).',
    resultFr: 'Groupe familial p\u00e9renne au-del\u00e0 de la 2e g\u00e9n\u00e9ration, dirigeant qui ne navigue plus seul. Transmission s\u00e9curis\u00e9e, d\u00e9cisions challeng\u00e9es, performance pilot\u00e9e.',
    resultEn: 'Family group sustainable beyond the 2nd generation, leader who no longer navigates alone. Secured succession, challenged decisions, monitored performance.',
    benefitsFr: ['Indice de P\u00e9rennit\u00e9 Familiale sur 100 en 8 minutes', 'Score de Maturit\u00e9 du Pilotage Strat\u00e9gique en 8 minutes', 'Conseil de Famille + Constitution Familiale + Plan de succession', 'CEO Advisory Board : 12 sessions/an, 2-3 experts, 4 piliers mensuels'],
    benefitsEn: ['Family Sustainability Index out of 100 in 8 minutes', 'Strategic Steering Maturity Score in 8 minutes', 'Family Council + Family Constitution + Succession plan', 'CEO Advisory Board: 12 sessions/year, 2-3 experts, 4 monthly pillars'],
    deliverablesFr: ['Conseil de Famille constitu\u00e9 et anim\u00e9', 'Constitution Familiale r\u00e9dig\u00e9e', 'Plan de succession formalis\u00e9', 'Pacte d\'actionnaires familial', 'CEO Advisory Board : 12 sessions/an', 'Tableau de bord performance + risques + d\u00e9cisions'],
    deliverablesEn: ['Constituted and animated Family Council', 'Drafted Family Constitution', 'Formalized succession plan', 'Family shareholders\' agreement', 'CEO Advisory Board: 12 sessions/year', 'Performance + risk + decision dashboard'],
    metricValue: '12',
    metricLabelFr: 'sessions CEO Advisory Board/an \u00b7 5 axes de p\u00e9rennit\u00e9 familiale',
    metricLabelEn: 'CEO Advisory Board sessions/year \u00b7 5 family sustainability axes',
    icon: 'ri-shield-star-line',
    accentColor: '#7c3aed',
    imagePrompt: 'african family business leaders in multi-generational governance meeting, warm boardroom with deep purple and gold accents, family constitution documents and succession planning frameworks on display, sophisticated premium atmosphere, Lom\u00e9 Togo West Africa, editorial photography',
  },
  // OFFRE 5 — \u00c9TUDES DE FAISABILIT\u00c9 INT\u00c9GR\u00c9ES
  {
    id: 'feasibility-studies',
    slug: '/services/etudes-faisabilite',
    nameFr: '\u00c9tudes de Faisabilit\u00e9 Int\u00e9gr\u00e9es',
    nameEn: 'Integrated Feasibility Studies',
    taglineFr: 'Dossier cl\u00e9-en-main pour comit\u00e9 de cr\u00e9dit',
    taglineEn: 'Turnkey package for credit committee',
    targetFr: 'Investisseurs, fonds d\'impact, promoteurs de projets industriels',
    targetEn: 'Investors, impact funds, industrial project developers',
    problemFr: 'Vous avez un projet mais vous ne savez pas s\'il est viable. Les banques et les investisseurs refusent de financer faute d\'\u00e9tude rigoureuse.',
    problemEn: 'You have a project but don\'t know if it\'s viable. Banks and investors refuse to finance without a rigorous study.',
    solutionFr: 'Nous produisons une \u00e9tude de faisabilit\u00e9 int\u00e9gr\u00e9e (technique, march\u00e9, financi\u00e8re, ESG) conforme aux standards BAD, BIDC et IFC.',
    solutionEn: 'We produce an integrated feasibility study (technical, market, financial, ESG) compliant with AfDB, BIDC and IFC standards.',
    resultFr: 'Un dossier bankable, pr\u00eat pour le comit\u00e9 de cr\u00e9dit, qui s\u00e9curise votre financement et r\u00e9duit le risque investisseur.',
    resultEn: 'A bankable document, ready for the credit committee, that secures your financing and reduces investor risk.',
    benefitsFr: ['\u00c9tude technique + march\u00e9 + financi\u00e8re + ESG en un seul livrable', 'Conformit\u00e9 aux standards internationaux (BAD, BIDC, IFC)', 'Mod\u00e9lisation financi\u00e8re 10 ans avec sensibilit\u00e9', 'Rapport cl\u00e9-en-main pour comit\u00e9 de cr\u00e9dit'],
    benefitsEn: ['Technical + market + financial + ESG study in a single deliverable', 'Compliance with international standards (AfDB, BIDC, IFC)', '10-year financial modeling with sensitivity analysis', 'Turnkey report for credit committee'],
    deliverablesFr: ['\u00c9tude technique et dimensionnement', '\u00c9tude de march\u00e9 et positionnement', 'Mod\u00e9lisation financi\u00e8re (VAN, TRI, DSCR)', '\u00c9tude d\'impact ESG et PGES', 'Rapport synth\u00e9tique conforme standards BAD/IFC'],
    deliverablesEn: ['Technical study and sizing', 'Market study and positioning', 'Financial modeling (NPV, IRR, DSCR)', 'ESG impact study and ESMP', 'Synthesis report compliant with AfDB/IFC standards'],
    metricValue: '100%',
    metricLabelFr: 'des \u00e9tudes accept\u00e9es par les comit\u00e9s de cr\u00e9dit',
    metricLabelEn: 'of studies accepted by credit committees',
    icon: 'ri-file-chart-line',
    accentColor: '#c9a227',
    imagePrompt: 'professional african business team reviewing feasibility study documents in modern boardroom with charts and maps of africa on screens professional lighting premium consulting atmosphere deloitte green and dark navy color tones',
  },
];

// -----------------------------------------------------------------------------
// 7 SERVICES D'APPEL (LEAD GENERATION)
// -----------------------------------------------------------------------------

export interface LeadService {
  id: string;
  slug: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  priceFr: string;
  priceEn: string;
  durationFr: string;
  durationEn: string;
  targetFr: string;
  targetEn: string;
  conversionOfferId: string;
  icon: string;
  accentColor: string;
  ctaFr: string;
  ctaEn: string;
  formUrl?: string;
}

export const LEAD_SERVICES: LeadService[] = [
  {
    id: 'transfer-pricing-diagnostic', slug: '/tools/diagnostic-prix-transfert', nameFr: 'Diagnostic Prix de Transfert', nameEn: 'Transfer Pricing Diagnostic',
    descriptionFr: '\u00c9valuez votre conformit\u00e9 BEPS OCDE en 8 minutes. Score sur 100, cartographie des risques, plan d\'action prioritaire.',
    descriptionEn: 'Assess your OECD BEPS compliance in 8 minutes. Score out of 100, risk mapping, priority action plan.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '8 min', durationEn: '8 min', targetFr: 'Groupes, holdings, banques, IMF', targetEn: 'Groups, holdings, banks, MFIs',
    conversionOfferId: 'transfer-pricing', icon: 'ri-scales-3-line', accentColor: '#b45309', ctaFr: '\u00c9valuer mon risque fiscal', ctaEn: 'Assess my tax risk',
    formUrl: 'https://readdy.ai/api/form/d8h91dtiodfui947ttd0',
  },
  {
    id: 'pre-inspection', slug: '/tools/diagnostic-pre-inspection-bceao-cobac', nameFr: 'Diagnostic Pr\u00e9-Inspection', nameEn: 'Pre-Inspection Diagnostic',
    descriptionFr: 'Les 25 constats qui conduisent aux sanctions. \u00c9valuez votre pr\u00e9paration en 8 minutes. Score /100, classification de risque.',
    descriptionEn: 'The 25 findings that lead to sanctions. Assess your readiness in 8 minutes. Score /100, risk classification.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '8 min', durationEn: '8 min', targetFr: 'Banques, SFD, fintechs UEMOA/CEMAC', targetEn: 'Banks, MFIs, WAEMU/CEMAC fintechs',
    conversionOfferId: 'bceao-cobac-inspection', icon: 'ri-search-eye-line', accentColor: '#0891b2', ctaFr: 'Tester ma pr\u00e9paration', ctaEn: 'Test my readiness',
    formUrl: 'https://readdy.ai/api/form/d8h99escl43d0bibeia0',
  },
  {
    id: 'bankability-index', slug: '/tools/diagnostic-bancabilite', nameFr: 'Indice de Bancabilit\u00e9', nameEn: 'Bankability Index',
    descriptionFr: 'Mesurez la bancabilit\u00e9 de votre projet. 25 questions, 5 niveaux de bancabilit\u00e9, recommandations pour s\u00e9duire les investisseurs.',
    descriptionEn: 'Measure your project\'s bankability. 25 questions, 5 bankability levels, recommendations to attract investors.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '8 min', durationEn: '8 min', targetFr: 'Startups, PME en lev\u00e9e', targetEn: 'Startups, fundraising SMEs',
    conversionOfferId: 'due-diligence', icon: 'ri-hand-coin-line', accentColor: '#0f766e', ctaFr: 'Mesurer ma bancabilit\u00e9', ctaEn: 'Measure my bankability',
    formUrl: 'https://readdy.ai/api/form/d8ha061hmtkvo7bfqhvg',
  },
  {
    id: 'family-sustainability', slug: '/tools/diagnostic-perennite-familiale', nameFr: 'Indice de P\u00e9rennit\u00e9 Familiale', nameEn: 'Family Sustainability Index',
    descriptionFr: 'Mesurez la p\u00e9rennit\u00e9 de votre groupe familial. 25 questions, notation sur 100, classification et recommandations.',
    descriptionEn: 'Measure your family group sustainability. 25 questions, 100-point rating, classification and recommendations.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '8 min', durationEn: '8 min', targetFr: 'Groupes familiaux, holdings', targetEn: 'Family groups, holdings',
    conversionOfferId: 'family-governance-ceo-board', icon: 'ri-shield-star-line', accentColor: '#7c3aed', ctaFr: 'Mesurer ma p\u00e9rennit\u00e9', ctaEn: 'Measure my sustainability',
    formUrl: 'https://readdy.ai/api/form/d8h9esjfkflngh85cak0',
  },
  {
    id: 'strategic-maturity', slug: '/tools/diagnostic-maturite-pilotage-strategique', nameFr: 'Score de Maturit\u00e9 Strat\u00e9gique', nameEn: 'Strategic Maturity Score',
    descriptionFr: 'Mesurez la maturit\u00e9 du pilotage strat\u00e9gique. 25 questions, 5 niveaux de maturit\u00e9, recommandations personnalis\u00e9es.',
    descriptionEn: 'Measure your strategic steering maturity. 25 questions, 5 maturity levels, personalized recommendations.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '8 min', durationEn: '8 min', targetFr: 'DG, PCA, dirigeants', targetEn: 'CEOs, Board Chairs, leaders',
    conversionOfferId: 'family-governance-ceo-board', icon: 'ri-lightbulb-flash-line', accentColor: '#7c3aed', ctaFr: '\u00c9valuer ma maturit\u00e9', ctaEn: 'Assess my maturity',
    formUrl: 'https://readdy.ai/api/form/d8h9l3scl43d0bibeieg',
  },
  {
    id: 'conformity-scorecard', slug: '/tools/evaluation-conformite-reglementaire', nameFr: 'Conformity Scorecard', nameEn: 'Conformity Scorecard',
    descriptionFr: '\u00c9valuez votre conformit\u00e9 BCEAO, BEAC, COBAC et OHADA en 10 minutes. Score imm\u00e9diat avec \u00e9cart de conformit\u00e9.',
    descriptionEn: 'Evaluate your BCEAO, BEAC, COBAC and OHADA compliance in 10 minutes. Instant score with compliance gap.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '10 min', durationEn: '10 min', targetFr: 'SFD, banques, fintechs', targetEn: 'MFIs, banks, fintechs',
    conversionOfferId: 'bceao-cobac-inspection', icon: 'ri-shield-check-line', accentColor: '#0891b2', ctaFr: '\u00c9valuer ma conformit\u00e9', ctaEn: 'Evaluate my compliance',
    formUrl: 'https://readdy.ai/api/form/d7rj1nvb5ro7pimqgto0',
  },
  {
    id: 'flash-diagnostic', slug: '/tools/diagnostic-strategique', nameFr: 'Flash Diagnostic', nameEn: 'Flash Diagnostic',
    descriptionFr: 'Diagnostic express de 15 minutes. Identifiez vos forces, faiblesses et leviers de croissance. Rapport avec 3 priorit\u00e9s actionnables.',
    descriptionEn: '15-minute express diagnostic. Identify your strengths, weaknesses and growth levers. Report with 3 actionable priorities.',
    priceFr: 'Gratuit', priceEn: 'Free', durationFr: '15 min', durationEn: '15 min', targetFr: 'Tous profils', targetEn: 'All profiles',
    conversionOfferId: 'feasibility-studies', icon: 'ri-flashlight-line', accentColor: '#c9a227', ctaFr: 'D\u00e9marrer mon diagnostic', ctaEn: 'Start my diagnostic',
    formUrl: 'https://readdy.ai/api/form/d7rj1nvb5ro7pimqgtng',
  },
];

// -----------------------------------------------------------------------------
// COPYWRITING & SLOGANS — Upgrade Premium 2026
// -----------------------------------------------------------------------------

export const SLOGANS = {
  primaryFr: 'Le conseil premium africain — 3 Business Units, 0 compromis.',
  primaryEn: 'Premium African advisory — 3 Business Units, 0 compromise.',
  secondaryFr: 'La référence francophone du conseil en régulation financière, prix de transfert, fiscalité internationale, gouvernance, risques et conformité.',
  secondaryEn: 'The francophone reference for financial regulation, transfer pricing, international taxation, governance, risk and compliance advisory.',
  ctaFr: 'Ne laissez pas un contrôle fiscal, une inspection ou une erreur stratégique décider de votre avenir.',
  ctaEn: 'Don\'t let a tax audit, an inspection, or a strategic error decide your future.',
  trustFr: '22 ans · 500+ missions · 15 pays UEMOA/CEMAC · 7 diagnostics gratuits',
  trustEn: '22 years · 500+ missions · 15 WAEMU/CEMAC countries · 7 free diagnostics',
};

export const HERO_COPY = {
  titleFr: 'Le conseil premium pour dirigeants, investisseurs et groupes familiaux en Afrique francophone',
  titleEn: 'Premium advisory for leaders, investors and family groups in Francophone Africa',
  subtitleFr: 'Régulation Financière · Prix de Transfert & Fiscalité Internationale · Gouvernance, Risques & Conformité. 3 Business Units à forte valeur ajoutée, méthodologie Big Four, résultats mesurables.',
  subtitleEn: 'Financial Regulation · Transfer Pricing & International Taxation · Governance, Risk & Compliance. 3 high-value Business Units, Big Four methodology, measurable results.',
  ctaPrimaryFr: 'Démarrer un diagnostic gratuit',
  ctaPrimaryEn: 'Start a free diagnostic',
  ctaSecondaryFr: 'Découvrir nos 3 Business Units',
  ctaSecondaryEn: 'Discover our 3 Business Units',
};

export const DIFFERENTIATORS = [
  {
    icon: 'ri-focus-3-line',
    titleFr: '3 Business Units, pas généraliste',
    titleEn: '3 Business Units, not generalist',
    descFr: 'Nous ne faisons pas tout. Nous excellons sur 3 Business Units précises à forte valeur ajoutée, faible concurrence et forte récurrence. Résultat : une expertise pointue et des livrables de niveau Big Four.',
    descEn: 'We don\'t do everything. We excel in 3 precise high-value, low-competition, high-recurrence Business Units. Result: sharp expertise and Big Four-level deliverables.',
  },
  {
    icon: 'ri-globe-line',
    titleFr: 'Double r\u00e9alit\u00e9 UEMOA/CEMAC + standards internationaux',
    titleEn: 'Dual UEMOA/CEMAC reality + international standards',
    descFr: 'Nous ma\u00eetrisons les r\u00e9glementations BCEAO, COBAC, OHADA ET les standards OCDE BEPS, IFC, COSO, GRI. Le meilleur des deux mondes pour vos enjeux les plus critiques.',
    descEn: 'We master BCEAO, COBAC, OHADA regulations AND OECD BEPS, IFC, COSO, GRI standards. The best of both worlds for your most critical challenges.',
  },
  {
    icon: 'ri-vip-crown-line',
    titleFr: 'Partner-led, sans juniorisation',
    titleEn: 'Partner-led, no juniorization',
    descFr: 'Chaque mission est pilot\u00e9e par un Partner senior d\u00e9di\u00e9. Pas de couches de consultants juniors. Vous payez pour l\'expertise, pas pour la formation de nos \u00e9quipes.',
    descEn: 'Every mission is led by a dedicated senior Partner. No layers of junior consultants. You pay for expertise, not for training our teams.',
  },
  {
    icon: 'ri-smartphone-line',
    titleFr: '7 diagnostics gratuits en 8 minutes',
    titleEn: '7 free diagnostics in 8 minutes',
    descFr: 'Prix de Transfert, Pré-Inspection BCEAO/COBAC, Pérennité Familiale, Maturité Stratégique, Bancabilité, Conformité, Flash Diagnostic. Score immédiat, plan d\'action personnalisé.',
    descEn: 'Transfer Pricing, BCEAO/COBAC Pre-Inspection, Family Sustainability, Strategic Maturity, Bankability, Conformity, Flash Diagnostic. Instant score, personalized action plan.',
  },
];

export const SPECIALIZED_SEO = {
  home: {
    titleFr: 'KHEPRA EXPERTS \u2014 Conseil Premium : Prix de Transfert, BCEAO/COBAC, Gouvernance Familiale, CEO Advisory, Due Diligence',
    titleEn: 'KHEPRA EXPERTS \u2014 Premium Advisory: Transfer Pricing, BCEAO/COBAC, Family Governance, CEO Advisory, Due Diligence',
    descriptionFr: 'Cabinet boutique premium : prix de transfert BEPS OCDE, inspection BCEAO/COBAC, gouvernance familiale, CEO Advisory Board, due diligence investisseur. 22 ans \u00b7 15 pays UEMOA/CEMAC \u00b7 5 diagnostics gratuits. Lom\u00e9, Togo.',
    descriptionEn: 'Premium boutique advisory: OECD BEPS transfer pricing, BCEAO/COBAC inspection, family governance, CEO Advisory Board, investor due diligence. 22 years \u00b7 15 WAEMU/CEMAC countries \u00b7 5 free diagnostics. Lom\u00e9, Togo.',
    keywordsFr: 'prix de transfert Afrique, inspection BCEAO COBAC, gouvernance familiale Afrique, CEO advisory board, due diligence investisseur, conseil premium Afrique, fiscalit\u00e9 internationale UEMOA, conformit\u00e9 prudentielle',
    keywordsEn: 'transfer pricing Africa, BCEAO COBAC inspection, family governance Africa, CEO advisory board, investor due diligence, premium advisory Africa, international tax WAEMU, prudential compliance',
  },
};



