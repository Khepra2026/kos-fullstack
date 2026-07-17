export const regtechCountries = [
  { code: 'BJ', name: 'Bénin', currency: 'FCFA', regulatorFiscal: 'DGI Bénin', regulatorSocial: 'CNSS Bénin', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'BF', name: 'Burkina Faso', currency: 'FCFA', regulatorFiscal: 'DGI Burkina', regulatorSocial: 'CNSS Burkina', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'CM', name: 'Cameroun', currency: 'FCFA', regulatorFiscal: 'DGI Cameroun', regulatorSocial: 'CNPS Cameroun', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'CF', name: 'Centrafrique', currency: 'FCFA', regulatorFiscal: 'DGI RCA', regulatorSocial: 'CNSS RCA', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'KM', name: 'Comores', currency: 'KMF', regulatorFiscal: 'DGI Comores', regulatorSocial: 'Caisse Retraite Comores', regulatorBanking: 'BCC', ohadaZone: 'OHADA' },
  { code: 'CG', name: 'Congo', currency: 'FCFA', regulatorFiscal: 'DGI Congo', regulatorSocial: 'CNSS Congo', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'CI', name: 'Côte d\'Ivoire', currency: 'FCFA', regulatorFiscal: 'DGI Côte d\'Ivoire', regulatorSocial: 'CNPS Côte d\'Ivoire', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'GA', name: 'Gabon', currency: 'FCFA', regulatorFiscal: 'DGI Gabon', regulatorSocial: 'CNSS Gabon', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'GW', name: 'Guinée-Bissau', currency: 'FCFA', regulatorFiscal: 'DGI Guinée-Bissau', regulatorSocial: 'INSS Guinée-Bissau', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'GQ', name: 'Guinée Équatoriale', currency: 'FCFA', regulatorFiscal: 'DGI Guinée Éq.', regulatorSocial: 'INSS Guinée Éq.', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'ML', name: 'Mali', currency: 'FCFA', regulatorFiscal: 'DGI Mali', regulatorSocial: 'INPS Mali', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'NE', name: 'Niger', currency: 'FCFA', regulatorFiscal: 'DGI Niger', regulatorSocial: 'CNSS Niger', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'SN', name: 'Sénégal', currency: 'FCFA', regulatorFiscal: 'DGI Sénégal', regulatorSocial: 'CSS Sénégal', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
  { code: 'TD', name: 'Tchad', currency: 'FCFA', regulatorFiscal: 'DGI Tchad', regulatorSocial: 'CNPS Tchad', regulatorBanking: 'BEAC', ohadaZone: 'CEMAC' },
  { code: 'TG', name: 'Togo', currency: 'FCFA', regulatorFiscal: 'DGI Togo', regulatorSocial: 'CNSS Togo', regulatorBanking: 'BCEAO', ohadaZone: 'UEMOA' },
];

export const regtechSectors = [
  { code: 'COMMERCE', name: 'Commerce/Distribution', category: 'Commerce' },
  { code: 'SERVICES_B2B', name: 'Services B2B', category: 'Services' },
  { code: 'SERVICES_B2C', name: 'Services B2C', category: 'Services' },
  { code: 'INDUSTRIE', name: 'Industrie', category: 'Industrie' },
  { code: 'AGRO', name: 'Agriculture/Agri-business', category: 'Agriculture' },
  { code: 'FINTECH', name: 'FinTech/Paiement', category: 'Finance' },
  { code: 'SANTE', name: 'Santé', category: 'Services' },
  { code: 'EDUCATION', name: 'Éducation', category: 'Services' },
  { code: 'TRANSPORT', name: 'Transport/Logistique', category: 'Transport' },
  { code: 'AUTRE', name: 'Autre', category: 'Autre' },
];

export const revenueRanges = [
  { value: 'lt_10m', label: '< 10M FCFA', min: 0, max: 10000000 },
  { value: '10m_50m', label: '10-50M FCFA', min: 10000000, max: 50000000 },
  { value: '50m_250m', label: '50-250M FCFA', min: 50000000, max: 250000000 },
  { value: '250m_1md', label: '250M-1Md FCFA', min: 250000000, max: 1000000000 },
  { value: 'gt_1md', label: '> 1Md FCFA', min: 1000000000, max: null },
];

export const employeeRanges = [
  { value: '1_5', label: '1-5', min: 1, max: 5 },
  { value: '6_20', label: '6-20', min: 6, max: 20 },
  { value: '21_50', label: '21-50', min: 21, max: 50 },
  { value: '51_200', label: '51-200', min: 51, max: 200 },
  { value: 'gt_200', label: '>200', min: 201, max: null },
];

export const creationYearRanges = [
  { value: '2024_2026', label: '2024-2026', min: 2024, max: 2026 },
  { value: '2020_2023', label: '2020-2023', min: 2020, max: 2023 },
  { value: '2015_2019', label: '2015-2019', min: 2015, max: 2019 },
  { value: '2010_2014', label: '2010-2014', min: 2010, max: 2014 },
  { value: 'before_2010', label: 'Avant 2010', min: 1900, max: 2010 },
];

export const diagnosticQuestions = {
  section1: {
    title: 'Votre entreprise',
    questions: [
      {
        id: 'country',
        label: 'Pays d\'immatriculation',
        type: 'select',
        options: regtechCountries.map(c => ({ value: c.code, label: c.name })),
      },
      {
        id: 'sector',
        label: 'Secteur principal',
        type: 'select',
        options: regtechSectors.map(s => ({ value: s.code, label: s.name })),
      },
      {
        id: 'revenue',
        label: 'Chiffre d\'affaires 2025',
        type: 'select',
        options: revenueRanges.map(r => ({ value: r.value, label: r.label })),
      },
      {
        id: 'employees',
        label: 'Effectif salarié actuel',
        type: 'select',
        options: employeeRanges.map(e => ({ value: e.value, label: e.label })),
      },
      {
        id: 'creationYear',
        label: 'Année de création',
        type: 'select',
        options: creationYearRanges.map(y => ({ value: y.value, label: y.label })),
      },
    ],
  },
  section2: {
    title: 'Trésorerie & Financement',
    questions: [
      { id: 'paymentDelay', label: 'Délai moyen encaissement client', type: 'select', options: [{ value: 'lt_30', label: '< 30 jours' }, { value: '30_60', label: '30-60 jours' }, { value: '60_90', label: '60-90 jours' }, { value: 'gt_90', label: '> 90 jours' }] },
      { id: 'cashReserve', label: 'Disposez-vous de 3 mois de charges en trésorerie ?', type: 'select', options: [{ value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' }, { value: 'dont_know', label: 'Je ne sais pas calculer' }] },
      { id: 'creditAccess', label: 'Accès au crédit bancaire sur 12 derniers mois', type: 'select', options: [{ value: 'obtained', label: 'Crédit obtenu' }, { value: 'refused', label: 'Demande refusée' }, { value: 'no_need', label: 'Pas demandé car pas besoin' }, { value: 'discouraged', label: 'Pas demandé car découragé' }] },
      { id: 'financingBarrier', label: 'Principal frein au financement', type: 'select', options: [{ value: 'guarantees', label: 'Garanties demandées' }, { value: 'rates', label: 'Taux d\'intérêt' }, { value: 'paperwork', label: 'Lourdeur dossier' }, { value: 'compliance', label: 'Exigences conformité' }, { value: 'no_need', label: 'Pas besoin financement' }] },
      { id: 'fundraising', label: 'Avez-vous levé des fonds auprès d\'investisseurs ?', type: 'select', options: [{ value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' }, { value: 'in_progress', label: 'Négociations en cours' }] },
    ],
  },
  section3: {
    title: 'Conformité & Gouvernance',
    questions: [
      { id: 'rccmStatus', label: 'Statut immatriculation RCCM', type: 'select', options: [{ value: 'uptodate', label: 'À jour' }, { value: 'regularizing', label: 'En cours de régularisation' }, { value: 'not_registered', label: 'Non immatriculé' }] },
      { id: 'taxDeclarations', label: 'Déclarations fiscales 2025', type: 'select', options: [{ value: 'uptodate', label: 'À jour' }, { value: 'delay_lt_3m', label: 'Retard < 3 mois' }, { value: 'delay_gt_3m', label: 'Retard > 3 mois' }, { value: 'never', label: 'Jamais déclaré' }] },
      { id: 'socialDeclarations', label: 'Déclarations sociales CNSS/CNPS/IPRES', type: 'select', options: [{ value: 'uptodate', label: 'À jour' }, { value: 'delayed', label: 'Retard' }, { value: 'na', label: 'Non applicable' }, { value: 'dont_know', label: 'Je ne sais pas' }] },
      { id: 'financialStatements', label: 'États financiers SYSCOHADA 2024 certifiés ?', type: 'select', options: [{ value: 'yes_certified', label: 'Oui certifiés' }, { value: 'yes_uncertified', label: 'Oui non certifiés' }, { value: 'in_progress', label: 'En cours' }, { value: 'no', label: 'Non' }] },
      { id: 'board', label: 'Existence Conseil d\'Administration ou CODIR formel ?', type: 'select', options: [{ value: 'yes_pv', label: 'Oui avec PV' }, { value: 'yes_informal', label: 'Oui informel' }, { value: 'no', label: 'Non' }] },
      { id: 'rbe', label: 'Registre bénéficiaires effectifs déposé ?', type: 'select', options: [{ value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' }, { value: 'dont_know', label: 'Je ne connais pas cette obligation' }] },
      { id: 'lbft', label: 'Procédures écrites LBC/FT', type: 'select', options: [{ value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' }, { value: 'na', label: 'Non concerné par mon activité' }] },
      { id: 'contracts', label: 'Contrats de travail écrits pour tous salariés ?', type: 'select', options: [{ value: 'yes_100', label: 'Oui 100%' }, { value: 'partial', label: 'Partiellement' }, { value: 'no', label: 'Non' }] },
    ],
  },
  section4: {
    title: 'Barrières Réglementaires',
    questions: [
      { id: 'irritants', label: 'Top 3 irritants réglementaires aujourd\'hui', type: 'checkbox', max: 3, options: [{ value: 'fiscalite', label: 'Fiscalité' }, { value: 'charges_sociales', label: 'Charges sociales' }, { value: 'douane', label: 'Douane/Import' }, { value: 'agrement', label: 'Agrément/Licence' }, { value: 'paiement', label: 'Paiement/Change' }, { value: 'foncier', label: 'Droit foncier' }, { value: 'travail', label: 'Droit du travail' }, { value: 'marches_publics', label: 'Marchés publics' }, { value: 'autre', label: 'Autre' }] },
      { id: 'lastAdminInteraction', label: 'Dernière interaction avec administration', type: 'select', options: [{ value: 'lt_1m', label: '< 1 mois' }, { value: '1_6m', label: '1-6 mois' }, { value: 'gt_6m', label: '> 6 mois' }, { value: 'never', label: 'Jamais' }] },
      { id: 'adminComplexity', label: 'Complexité administrative globale', type: 'scale', min: 1, max: 5, labels: { 1: 'Très simple', 5: 'Bloquante pour business' } },
      { id: 'fiscalControl', label: 'Contrôle fiscal/social sur 12 derniers mois ?', type: 'select', options: [{ value: 'yes_no_adjustment', label: 'Oui sans redressement' }, { value: 'yes_adjustment', label: 'Oui avec redressement' }, { value: 'no', label: 'Non' }] },
    ],
  },
  section5: {
    title: 'Contact & Score',
    questions: [
      { id: 'email', label: 'Email pour recevoir votre score + benchmark', type: 'text', validation: 'email' },
      { id: 'companyName', label: 'Nom entreprise', type: 'text' },
      { id: 'contactConsent', label: 'Acceptez-vous d\'être contacté par des investisseurs si score >70 ?', type: 'select', options: [{ value: 'yes', label: 'Oui' }, { value: 'no', label: 'Non' }] },
    ],
  },
};

export const mockDiagnosticResult = {
  profile: { country_code: 'SN', sector_code: 'COMMERCE', revenue: 150000000, employees: 35, creation_year: 2018 },
  rules: [
    { rule_code: 'SN-COMMERCE-50M', description: 'Commerce Sénégal CA 50-250M FCFA : Régime réel, TVA mensuelle, CNSS, états financiers certifiés', priority: 'high', country_name: 'Sénégal', sector_name: 'Commerce/Distribution' },
    { rule_code: 'ALL-PME-50-200', description: 'PME CA 50-250M, 21-50 salariés : obligations PME standard', priority: 'high', country_name: 'Tous pays', sector_name: null },
  ],
  obligations: [
    { code: 'FISC-DF-50M', domain: 'Fiscalité', title: 'Déclaration Fiscale Annuelle CA>50M', description: 'Dépôt de la déclaration fiscale annuelle avec états financiers certifiés', legal_reference: 'CGI Art. 123 (régime réel)', authority: 'DGI Nationale', urgency: 'annuelle', deadline_type: 'date_fixe', sanction_risk: 'Redressement fiscal + Pénalités 25%' },
    { code: 'FISC-TVA', domain: 'Fiscalité', title: 'Déclaration TVA Mensuelle', description: 'Déclaration et reversement de la TVA collectée', legal_reference: 'CGI Art. 345 (TVA)', authority: 'DGI Nationale', urgency: 'mensuelle', deadline_type: 'date_fixe', sanction_risk: 'Pénalités 10% + Intérêts de retard' },
    { code: 'SOC-CNSS', domain: 'Social', title: 'Déclaration CNSS/CNPS Mensuelle', description: 'Déclaration et paiement des cotisations sociales', legal_reference: 'Code du Travail + Loi Sécurité Sociale', authority: 'CNSS/CNPS Nationale', urgency: 'mensuelle', deadline_type: 'date_fixe', sanction_risk: 'Pénalités 5% + contentieux' },
    { code: 'SOC-CONTRAT', domain: 'Social', title: 'Contrats de Travail Écrits', description: 'Contrat écrit obligatoire pour tous les salariés', legal_reference: 'Code du Travail Art. L.30', authority: 'Inspection du Travail', urgency: 'obligatoire', deadline_type: 'continue', sanction_risk: 'Amende par salarié' },
    { code: 'SOC-BILAN', domain: 'Social', title: 'Bilan Social Annuel', description: 'Dépôt du bilan social annuel (>50 salariés)', legal_reference: 'Code du Travail Art. L.250', authority: 'Inspection du Travail', urgency: 'annuelle', deadline_type: 'date_fixe', sanction_risk: 'Amende + Mise en demeure' },
    { code: 'GOV-EF-CERT', domain: 'Gouvernance', title: 'États Financiers Certifiés SYSCOHADA', description: 'États financiers annuels selon normes SYSCOHADA, certifiés par CAC', legal_reference: 'Acte Uniforme OHADA Comptabilité', authority: 'OHADA', urgency: 'annuelle', deadline_type: 'date_fixe', sanction_risk: 'Rejet comptable + Risque bancaire' },
    { code: 'GOV-RBE', domain: 'Gouvernance', title: 'Registre des Bénéficiaires Effectifs', description: 'Déclaration des bénéficiaires effectifs au RCCM', legal_reference: 'Directive UEMOA LBC/FT + GAFI R.24', authority: 'RCCM + CENTIF', urgency: 'obligatoire', deadline_type: 'ponctuelle', sanction_risk: 'Sanctions pénales + Gel avoirs' },
    { code: 'SOC-HYGIENE', domain: 'Social', title: 'Conformité Hygiène et Sécurité', description: 'Respect des normes d\'hygiène et sécurité au travail', legal_reference: 'Code du Travail Art. L.200', authority: 'Inspection du Travail', urgency: 'obligatoire', deadline_type: 'continue', sanction_risk: 'Amende + Fermeture' },
  ],
  documents: [
    { code: 'DOC-DF-SN', title: 'Modèle Déclaration Fiscale Sénégal', document_type: 'declaration', domain: 'Fiscalité' },
    { code: 'DOC-TVA', title: 'Modèle Déclaration TVA UEMOA', document_type: 'declaration', domain: 'Fiscalité' },
    { code: 'DOC-PME', title: 'Checklist Obligations PME', document_type: 'checklist', domain: 'Général' },
    { code: 'DOC-BILAN-SOCIAL', title: 'Modèle Bilan Social', document_type: 'declaration', domain: 'Social' },
  ],
  summary: { total_rules: 2, critical_count: 0, compliance_score: 55 },
};