/**
 * ═══ KNOWLEDGE INSTITUTE — KHEPRA THINK TANK™ ═══
 * Indice de Fiabilité KOS : 94/100
 * 
 * Aligné sur :
 * — ISO 30401:2018 — Knowledge Management (95/100, N3)
 * — ISO 9001:2015 — Management Qualité (99/100, N3)
 * — ISO 20700:2017 — Services Conseil (95/100, N3)
 * — COSO ICIF 2013 — Contrôle Interne (99/100, N3)
 * 
 * 64 publications, 105 200 téléchargements, 1 428 citations médias
 * 5 axes de recherche, 189 citations vérifiées, 20 autorités
 * 
 * Dernière mise à jour : 27 Juin 2026
 */

export const knowledgeInstituteKPIs = {
  totalPublications: 64,
  totalDownloads: 105200,
  totalCitationsMedias: 1428,
  totalBacklinks: 3280,
  totalLeads: 3080,
  axesCount: 5,
  publicationsPerYear: 24,
  averageQualityScore: 9.4,
  globalReachCountries: 18,
  _totalCitationsVerified: 189,
  _totalAuthorities: 20,
  _kosReliabilityScore: 94,
  _lastVerification: '2026-06-27',
};

export const researchAxes = [
  {
    id: 'regulation', name: 'Régulation Financière', icon: 'ri-bank-line', publications: 18, focus: 'BCEAO, COBAC, OHADA, GAFI',
    description: 'Analyse approfondie des évolutions réglementaires dans les zones UEMOA et CEMAC. Veille continue sur les circulaires, instructions et décisions des autorités de régulation. Études d\'impact des nouvelles normes sur les institutions financières.',
    topics: ['Ratios prudentiels', 'Gouvernance bancaire', 'LBC/FT', 'Agréments', 'Contrôle interne', 'Reporting réglementaire', 'Protection des consommateurs', 'Résilience opérationnelle'],
    _sources: ['BCEAO (136 textes regulations)', 'COBAC (50+ textes)', 'GAFI (40 Recommandations)', 'OHADA (10 Actes Uniformes)'],
  },
  {
    id: 'governance', name: 'Gouvernance & Conformité', icon: 'ri-government-line', publications: 14, focus: 'COSO, IIA, ISO 37000, OHADA AUSCGIE',
    description: 'Recherche sur les meilleures pratiques de gouvernance adaptées au contexte africain. Évaluation de l\'effectivité des conseils d\'administration, indépendance des administrateurs, comités spécialisés.',
    topics: ['Effectivité CA', 'Administrateurs indépendants', 'Comités spécialisés', 'Gestion des conflits d\'intérêts', 'Rémunération des dirigeants', 'Transparence financière'],
    _sources: ['COSO ICIF 2013 (99/100, N3)', 'ISO 37000:2021 (96/100, N3)', 'BCEAO Circulaire 001-2017 (97/100, N3)'],
  },
  {
    id: 'fintech', name: 'FinTech & Innovation', icon: 'ri-smartphone-line', publications: 12, focus: 'Mobile Money, Open Banking, IA, Blockchain',
    description: 'Analyse prospective des innovations technologiques dans le secteur financier africain. Impact des fintechs sur l\'inclusion financière, modèles d\'affaires émergents, cadres réglementaires adaptés.',
    topics: ['Mobile Money', 'Établissements de paiement', 'Open Banking', 'IA & Credit Scoring', 'Blockchain & Actifs numériques', 'RegTech & SupTech'],
    _sources: ['BCEAO Instruction 008-05-2015 (97/100, N3)', 'BCEAO Instruction 006-2019 (94/100, N3)', 'COBAC R-2023/05 (85/100)'],
  },
  {
    id: 'esg', name: 'ESG & Durabilité', icon: 'ri-seedling-line', publications: 10, focus: 'ISSB, GRI, IFRS S1/S2, Taxonomie verte',
    description: 'Recherche sur l\'intégration des critères ESG dans les stratégies d\'entreprise en Afrique. Adaptation des standards internationaux au contexte local, finance durable, reporting extra-financier.',
    topics: ['Finance climat', 'Taxonomie verte UEMOA', 'Reporting ISSB', 'Stress tests climatiques', 'Obligations vertes', 'Impact investing'],
    _sources: ['IFRS S1 (97/100, N3)', 'IFRS S2 (96/100, N3)', 'BCEAO Circulaire 005-2020 (91/100, N2)'],
  },
  {
    id: 'investment', name: 'Investissement & Croissance', icon: 'ri-funds-box-line', publications: 10, focus: 'Capital-investissement, PPP, Levée de fonds',
    description: 'Études sur les dynamiques d\'investissement en Afrique francophone. Analyse des flux de capitaux, préparation à l\'investissement des PME, partenariats public-privé, financement de projets.',
    topics: ['Capital-investissement', 'PPP', 'Levée de fonds PME', 'Due diligence', 'Valorisation', 'Stratégies de sortie'],
    _sources: ['OCDE BEPS Action 13 (99/100, N3)', 'OHADA AUSCGIE 2014 (99/100, N3)'],
  },
];

export const flagshipPublications = [
  { id: 'barometre-pme', title: 'Baromètre PME Afrique', description: 'Analyse annuelle de la santé financière et de la maturité de gouvernance de 500 PME dans 12 pays africains.', editions: 4, frequency: 'Annuel', downloads: 28500, citations: 320, sampleSize: '500 PME', icon: 'ri-store-2-line', color: 'amber' },
  { id: 'fintech-risk', title: 'FinTech Risk Report', description: 'Cartographie des risques et opportunités du secteur FinTech en zone UEMOA et CEMAC.', editions: 3, frequency: 'Semestriel', downloads: 18200, citations: 245, sampleSize: '120 FinTechs', icon: 'ri-shield-flash-line', color: 'teal' },
  { id: 'esg-africa', title: 'ESG Africa Report', description: 'État des lieux de l\'intégration ESG dans les stratégies d\'entreprise en Afrique francophone.', editions: 2, frequency: 'Annuel', downloads: 12100, citations: 180, sampleSize: '200 entreprises', icon: 'ri-seedling-line', color: 'emerald' },
  { id: 'governance-index', title: 'Governance Index UEMOA', description: 'Indice composite de gouvernance des institutions financières — benchmark par pays et par type d\'établissement.', editions: 2, frequency: 'Annuel', downloads: 9500, citations: 145, sampleSize: '85 institutions', icon: 'ri-government-line', color: 'violet' },
  { id: 'investment-readiness', title: 'Investment Readiness Index', description: 'Notation de la maturité d\'investissement des PME et ETI africaines sur 6 critères.', editions: 3, frequency: 'Semestriel', downloads: 11200, citations: 195, sampleSize: '350 entreprises', icon: 'ri-funds-box-line', color: 'teal' },
  { id: 'sfd-inclusion', title: 'Baromètre SFD & Inclusion Financière', description: 'Analyse de la performance et de la résilience des SFD en zone UEMOA — ratios prudentiels, inclusion, digitalisation.', editions: 2, frequency: 'Annuel', downloads: 8500, citations: 120, sampleSize: '200 SFD', icon: 'ri-hand-heart-line', color: 'rose' },
];

export const institutionalPartners = [
  { id: 'bceao', name: 'BCEAO', type: 'Banque Centrale', icon: 'ri-building-line' },
  { id: 'cobac', name: 'COBAC', type: 'Régulateur', icon: 'ri-bank-line' },
  { id: 'bad', name: 'BAD', type: 'Banque Développement', icon: 'ri-funds-line' },
  { id: 'banque-mondiale', name: 'Banque Mondiale', type: 'IFI', icon: 'ri-global-line' },
  { id: 'ifc', name: 'IFC', type: 'IFI', icon: 'ri-building-4-line' },
  { id: 'boad', name: 'BOAD', type: 'Banque Développement', icon: 'ri-funds-box-line' },
  { id: 'ohada', name: 'OHADA', type: 'Organisation', icon: 'ri-scales-line' },
  { id: 'gafi', name: 'GAFI/GIABA', type: 'Organisation', icon: 'ri-shield-check-line' },
  { id: 'afd', name: 'AFD', type: 'Agence', icon: 'ri-flag-line' },
  { id: 'ue', name: 'Union Européenne', type: 'Institution', icon: 'ri-flag-2-line' },
  { id: 'pnud', name: 'PNUD', type: 'ONU', icon: 'ri-earth-line' },
  { id: 'bceao-cb', name: 'CB-UMOA', type: 'Régulateur', icon: 'ri-building-2-line' },
];

export const knowledgeTimeline = [
  { date: 'Q3 2019', title: 'Lancement du KHEPRA Research Desk', description: 'Premières études sectorielles sur la régulation financière UEMOA. Publication du Guide Conformité BCEAO.' },
  { date: 'Q1 2021', title: '1er Baromètre PME Afrique', description: 'Enquête auprès de 200 PME dans 8 pays. Partenariat avec la BAD pour la diffusion.' },
  { date: 'Q2 2022', title: 'Création du KHEPRA Knowledge Institute™', description: 'Structuration en 5 axes de recherche alignés ISO 30401:2018 (95/100, N3). Recrutement d\'un Directeur de Recherche. Labellisation Think Tank.' },
  { date: 'Q4 2023', title: '1er FinTech Risk Report', description: 'Cartographie de 80 FinTechs UEMOA/CEMAC. Citation par la BCEAO dans son rapport annuel. Base : BCEAO Instruction 006-2019 (94/100, N3).' },
  { date: 'Q2 2024', title: 'Lancement du Governance Index UEMOA', description: 'Notation de 65 institutions financières sur 6 dimensions. Partenariat académique avec l\'Université de Lomé. Aligné COSO ICIF 2013 (99/100, N3).' },
  { date: 'Q1 2025', title: '1er ESG Africa Report', description: 'Enquête ESG auprès de 150 entreprises. Alignement ISSB/GRI. Webinaire avec 500+ participants. Réf : IFRS S1 (97/100, N3), IFRS S2 (96/100, N3).' },
  { date: 'Q3 2025', title: 'Baromètre SFD & Inclusion Financière', description: 'Analyse de 200 SFD UEMOA. Présentation au Forum Africain de la Microfinance. Base : BCEAO Instruction 001-04-2018 (98/100, N3).' },
  { date: 'Q2 2026', title: '64 publications — 105k téléchargements — 94/100', description: 'Le Knowledge Institute devient la référence intellectuelle du conseil réglementaire africain. 189 citations vérifiées, 20 autorités, 5 axes de recherche.' },
];

export const knowledgeFaqs = [
  { q: 'Qui peut accéder aux publications du Knowledge Institute ?', a: 'Toutes nos publications sont accessibles gratuitement sur simple inscription. Nous croyons à la démocratisation de la connaissance économique et réglementaire en Afrique. Les baromètres, indices et études sectorielles sont téléchargeables en PDF. Les données brutes sont disponibles pour les chercheurs sur demande. Aligné ISO 30401:2018 — Knowledge Management (95/100, N3).' },
  { q: 'Comment sont collectées les données de vos études ?', a: 'Nos données proviennent de sources multiples : enquêtes directes auprès des entreprises (questionnaires standardisés), données publiques des régulateurs (BCEAO, COBAC, OHADA — 136 textes dans regulations), bases de données internationales (FMI, Banque Mondiale, BAD), et entretiens qualitatifs avec des experts sectoriels. Chaque publication détaille sa méthodologie et ses sources. Processus conforme ISO 20252:2019 — Études de marché.' },
  { q: 'Puis-je contribuer à vos recherches ?', a: 'Absolument. Nous accueillons les contributions de chercheurs, praticiens et experts sectoriels. Vous pouvez participer à nos enquêtes annuelles, proposer des sujets de recherche, ou soumettre des working papers pour publication dans notre série "KHEPRA Scientific Series". Le Comité Scientifique (5 experts) valide les contributions avant publication.' },
  { q: 'Vos publications sont-elles citées par les régulateurs ?', a: 'Oui. Nos publications sont régulièrement citées par la BCEAO, la COBAC, la BAD, la Banque Mondiale et plusieurs ministères des Finances de la zone UEMOA. Le Baromètre PME Afrique et le Governance Index sont utilisés comme références dans plusieurs rapports institutionnels. 1 428 citations médias et 3 280 backlinks cumulés.' },
  { q: 'Proposez-vous des études sur mesure ?', a: 'Oui, dans le cadre de nos missions de conseil. Nous réalisons des études sectorielles, des benchmarks concurrentiels, des analyses d\'impact réglementaire et des due diligences approfondies pour le compte d\'institutions financières, de bailleurs et de régulateurs. Cadre contractuel ISO 20700:2017 (95/100, N3).' },
];



