export interface InstrumentPreQualification {
  id: string;
  name: string;
  domaine: string;
  format: string;
  enjeu: string;
  approche: string;
  publicCible: string;
  typeInstrument: 'diagnostic' | 'simulation' | 'benchmark' | 'observatoire';
  thematiques: string[];
  landingPageSlug: string;
  visibilite: 'public' | 'interne';
}

export const instrumentsPreQualification: InstrumentPreQualification[] = [
  {
    id: 'ipq-01',
    name: 'Évaluation de Conformité BCEAO 360°',
    domaine: 'Intelligence Réglementaire',
    format: 'Questionnaire structuré + Note d\'orientation personnalisée',
    enjeu: '48% des établissements assujettis présentent des lacunes lors de leur première inspection BCEAO. Le délai moyen de mise en conformité post-inspection est de 14 mois.',
    approche: 'Questionnaire structuré en 8 dimensions → analyse des écarts → note d\'orientation avec axes de remédiation priorisés et calendrier indicatif.',
    publicCible: 'Directions Générales, Directions Financières, Responsables Conformité — Banques, SFD, Établissements de Paiement UEMOA',
    typeInstrument: 'diagnostic',
    thematiques: ['conformité BCEAO', 'pré-inspection', 'gouvernance prudentielle', 'ratios réglementaires'],
    landingPageSlug: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
    visibilite: 'public'
  },
  {
    id: 'ipq-02',
    name: 'Analyse Prix de Transfert — Exposition BEPS',
    domaine: 'Due Diligence & Fiscalité',
    format: 'Analyse structurée + Note d\'exposition fiscale',
    enjeu: '82% des groupes multinationaux en Afrique n\'ont pas de documentation Prix de Transfert conforme BEPS Action 13. Le risque de redressement est significatif.',
    approche: 'Analyse structurée → identification des transactions à risque → estimation du gap documentaire → recommandations de sécurisation.',
    publicCible: 'Directions Financières, Directeurs Fiscaux, CFO Groupes — Multinationales, Holdings, Groupes Panafricains',
    typeInstrument: 'simulation',
    thematiques: ['prix de transfert', 'documentation BEPS', 'OCDE', 'fiscalité internationale'],
    landingPageSlug: '/lead-magnets/simulation-risque-reglementaire',
    visibilite: 'public'
  },
  {
    id: 'ipq-03',
    name: 'Évaluation Gouvernance Conseil d\'Administration',
    domaine: 'Gouvernance & Risques',
    format: 'Grille d\'évaluation structurée + Note de positionnement',
    enjeu: 'La Circulaire COBAC R-2017/01 et les exigences OHADA imposent des standards de gouvernance élevés. De nombreux conseils ne sont pas alignés.',
    approche: 'Auto-évaluation 7 piliers → positionnement vs référentiels applicables → axes de renforcement de la gouvernance.',
    publicCible: 'Présidents de CA, Administrateurs, Secrétaires de Conseil — Banques, Groupes OHADA, Entreprises régulées',
    typeInstrument: 'diagnostic',
    thematiques: ['gouvernance CA', 'COBAC', 'OHADA', 'comités spécialisés'],
    landingPageSlug: '/lead-magnets/template-audit-gouvernance',
    visibilite: 'public'
  },
  {
    id: 'ipq-04',
    name: 'Analyse Double Matérialité ESG — Référentiel ISSB',
    domaine: 'ESG & Durabilité',
    format: 'Analyse structurée + Note d\'orientation ISSB',
    enjeu: 'Les normes ISSB S1/S2 entrent en vigueur. Plus de 78% des entreprises africaines n\'ont pas initié leur diagnostic double matérialité.',
    approche: 'Analyse 6 dimensions → identification des enjeux matériels → gap analysis ISSB/GRI → feuille de route reporting ESG.',
    publicCible: 'Directeurs RSE, Directions Financières, Directions Générales — Groupes cotés, Industries, Banques, Télécoms',
    typeInstrument: 'diagnostic',
    thematiques: ['ESG Afrique', 'double matérialité', 'ISSB', 'reporting durabilité'],
    landingPageSlug: '/lead-magnets/diagnostic-esg-maturite',
    visibilite: 'public'
  },
  {
    id: 'ipq-05',
    name: 'Évaluation Pré-Agrément FinTech — Zone UEMOA',
    domaine: 'Intelligence Réglementaire',
    format: 'Analyse de recevabilité + Note d\'orientation réglementaire',
    enjeu: 'Le taux de rejet des dossiers d\'agrément FinTech UEMOA est élevé au premier passage. Le processus nécessite une préparation rigoureuse.',
    approche: 'Analyse de recevabilité → identification des gaps → recommandations structurées pour le dossier d\'agrément.',
    publicCible: 'CEO FinTech, COO, Responsables Conformité — Établissements de Paiement, Établissements de Monnaie Électronique',
    typeInstrument: 'diagnostic',
    thematiques: ['agrément fintech', 'UEMOA', 'conformité établissement paiement', 'dossier réglementaire'],
    landingPageSlug: '/lead-magnets/checklist-conformite-bceao-cobac',
    visibilite: 'public'
  },
  {
    id: 'ipq-06',
    name: 'Évaluation LBC/FT — Alignement GAFI',
    domaine: 'Intelligence Réglementaire',
    format: 'Questionnaire structuré + Note d\'alignement GAFI',
    enjeu: 'Le GAFI a renforcé ses standards. De nombreuses banques africaines doivent mettre à jour leur dispositif LBC/FT pour éviter le risque de grey-listing.',
    approche: 'Évaluation structurée → mapping 40 Recommandations GAFI → identification des gaps critiques → recommandations.',
    publicCible: 'Responsables Conformité, Directions Financières, Secrétaires Généraux — Banques, Assurances, SFD, FinTechs',
    typeInstrument: 'diagnostic',
    thematiques: ['LBC/FT', 'GAFI', 'lutte blanchiment', 'conformité'],
    landingPageSlug: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
    visibilite: 'public'
  },
  {
    id: 'ipq-07',
    name: 'Analyse IFRS 9 — Impact Provisions Créances',
    domaine: 'Due Diligence & Fiscalité',
    format: 'Analyse paramétrable + Note méthodologique',
    enjeu: 'La BCEAO impose l\'IFRS 9. De nombreuses banques doivent recalibrer leurs provisions pour refléter les pertes de crédit attendues.',
    approche: 'Analyse paramétrable → segmentation Stage 1/2/3 → calcul ECL → estimation impact bilan.',
    publicCible: 'Directions Financières, Risk Managers, Commissaires aux Comptes — Banques, SFD, Établissements Financiers UEMOA/CEMAC',
    typeInstrument: 'simulation',
    thematiques: ['IFRS 9', 'provisions', 'créances', 'BCEAO', 'normes prudentielles'],
    landingPageSlug: '/lead-magnets/checklist-conformite-bceao-cobac',
    visibilite: 'interne'
  },
  {
    id: 'ipq-08',
    name: 'Plan de Préparation Inspection COBAC — 90 Jours',
    domaine: 'Gouvernance & Risques',
    format: 'Analyse structurée + Plan d\'action indicatif',
    enjeu: 'Le calendrier d\'inspection COBAC est annoncé 45 jours avant. De nombreux établissements ne sont pas prêts.',
    approche: 'Analyse éclair → gap analysis 12 domaines COBAC → plan 90 jours phasé avec livrables recommandés.',
    publicCible: 'Directions Générales, Secrétaires Généraux, Responsables Conformité — Banques, Établissements Financiers CEMAC',
    typeInstrument: 'simulation',
    thematiques: ['pré-inspection COBAC', 'conformité CEMAC', 'plan 90 jours', 'checklist COBAC'],
    landingPageSlug: '/lead-magnets/template-audit-gouvernance',
    visibilite: 'interne'
  },
  {
    id: 'ipq-09',
    name: 'Évaluation Cyber-Résilience — Directive COBAC',
    domaine: 'Gouvernance & Risques',
    format: 'Auto-évaluation structurée + Note de positionnement',
    enjeu: 'La Directive COBAC sur la résilience opérationnelle impose 5 piliers. La maturité cyber des banques reste perfectible.',
    approche: 'Auto-évaluation 5 piliers → positionnement vs référentiel → identification des gaps → recommandations.',
    publicCible: 'DSI, RSSI, Directions Générales, Directeurs Risques — Banques, Assurances, Établissements Financiers CEMAC',
    typeInstrument: 'diagnostic',
    thematiques: ['cyber résilience', 'COBAC', 'DORA Afrique', 'sécurité'],
    landingPageSlug: '/lead-magnets/simulation-risque-reglementaire',
    visibilite: 'public'
  },
  {
    id: 'ipq-10',
    name: 'Analyse Investment Readiness — Levée de Fonds',
    domaine: 'Observatoire & Benchmarks',
    format: 'Analyse structurée + Note d\'orientation investisseurs',
    enjeu: 'De nombreux dossiers de levée de fonds en Afrique sont rejetés pour documentation incomplète. Les investisseurs exigent conformité réglementaire et viabilité financière.',
    approche: 'Analyse structurée → conformité BCEAO/COBAC → modèle financier → checklist due diligence → recommandations.',
    publicCible: 'CEO, CFO Startups — FinTechs, Agritech, HealthTech, Logistique — Afrique Francophone',
    typeInstrument: 'benchmark',
    thematiques: ['levée de fonds', 'business plan', 'due diligence', 'modèle financier'],
    landingPageSlug: '/lead-magnets/guide-levee-fonds-afrique',
    visibilite: 'public'
  },
  {
    id: 'ipq-11',
    name: 'Évaluation Protection des Données — Conformité UEMOA',
    domaine: 'Gouvernance & Risques',
    format: 'Questionnaire structuré + Note de conformité',
    enjeu: 'La directive UEMOA sur la protection des données entre en vigueur. De nombreuses entreprises n\'ont pas de registre de traitements.',
    approche: 'Auto-évaluation → mapping exigences → identification des écarts → plan de mise en conformité.',
    publicCible: 'DPO, DSI, Directions Générales — Toutes entreprises traitant des données personnelles en zone UEMOA',
    typeInstrument: 'diagnostic',
    thematiques: ['RGPD UEMOA', 'protection données', 'registre traitements', 'conformité'],
    landingPageSlug: '/lead-magnets/simulation-risque-reglementaire',
    visibilite: 'interne'
  },
  {
    id: 'ipq-12',
    name: 'Benchmark Sectoriel SFD — Zone UEMOA',
    domaine: 'Intelligence Réglementaire',
    format: 'Analyse comparative + Note de positionnement sectoriel',
    enjeu: 'Les SFD UEMOA opèrent sans visibilité sur leur positionnement concurrentiel. Beaucoup ne connaissent pas leurs ratios prudentiels vs moyenne sectorielle.',
    approche: 'Analyse 12 ratios prudentiels → comparaison vs base SFD → positionnement par décile → recommandations.',
    publicCible: 'Directions Générales, Directions Financières SFD — MicroFinance, Coopec, Établissements de Crédit UEMOA',
    typeInstrument: 'benchmark',
    thematiques: ['benchmark SFD', 'ratios prudentiels', 'microfinance', 'BCEAO'],
    landingPageSlug: '/lead-magnets/mini-rapport-due-diligence',
    visibilite: 'interne'
  }
];

export const statistiquesPortail = {
  totalInstruments: 12,
  domainesCouverture: 'Intelligence Réglementaire (4), Due Diligence & Fiscalité (2), Gouvernance & Risques (5), Observatoire & Benchmarks (1)',
  repartitionParType: {
    diagnostic: 7,
    simulation: 3,
    benchmark: 2,
    observatoire: 0
  },
  zonesCouvertes: 'UEMOA, CEMAC, OHADA — Afrique Francophone'
};

export const parcoursQualification = {
  etapes: [
    { etape: 'Sélection d\'un instrument', description: 'Identifiez l\'instrument de pré-qualification adapté à votre contexte réglementaire et sectoriel.' },
    { etape: 'Complétion de l\'analyse', description: 'Renseignez les informations structurées. Analyse confidentielle, aucune donnée partagée.' },
    { etape: 'Revue par un expert', description: 'Un expert senior KHEPRA examine votre situation et prépare une restitution.' },
    { etape: 'Entretien de qualification', description: 'Restitution confidentielle de 30 minutes. Identification des priorités et des axes d\'accompagnement.' },
    { etape: 'Proposition de mission', description: 'Sur la base de l\'analyse, une proposition de mission contractuelle vous est transmise — devis confidentiel, sans engagement.' }
  ]
};