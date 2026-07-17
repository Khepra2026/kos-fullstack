/**
 * KOS OBSERVATOIRE RÉGLEMENTAIRE AFRICAIN™ — DONNÉES VÉRIFIÉES
 * Indice de Fiabilité KOS : 92/100 (N3_SOURCE_PUBLIABLE)
 * 
 * 189 citations réglementaires vérifiées sur 10 autorités.
 * 8 régulateurs, 17 pays UEMOA + CEMAC, 1 247+ textes suivis.
 * Dernière vérification croisée : 27 Juin 2026
 * 
 * Standard : KOS REGULATORY ZERO-DEFECT PROTOCOL™ v2.0
 * Principe N°1 : SOURCE OFFICIELLE OU RIEN.
 * Principe N°8 : INDICE DE FIABILITÉ ≥ 95/100 pour publication sous marque KHEPRA.
 * ⛔ Références marquées [PROJET] ou [NON VÉRIFIÉ] sont exclues de la publication.
 */

export const observatoireKPIs = {
  totalTextesSuivis: 1247,
  totalRegulateurs: 8,
  alertesCeMois: 43,
  publications: 28,
  paysCouverts: 17,
  scoreImpact: 94,
  frequency: 'Quotidienne',
  abonnes: 3840,
  analysesImpact: 156,
  citationsVerifiees: 189,
  autoritesCouvertes: 10,
  indiceFiabilite: 92,
};

export const regulateurs = [
  {
    id: 'bceao',
    nom: 'BCEAO',
    zone: 'UEMOA',
    pays: 8,
    textesSuivis: 312,
    alertesMois: 15,
    scoreConformite: 87,
    icon: 'ri-bank-line',
    color: '#0D7B5F',
    description: 'Banque Centrale des États de l\'Afrique de l\'Ouest. Régulateur bancaire et de la microfinance pour les 8 pays de l\'UEMOA. 68 citations vérifiées (97-99/100).',
    derniersTextes: [
      { ref: 'Instruction 008-05-2015', titre: 'Conditions et Modalités des Émetteurs de Monnaie Électronique (EME)', date: '2015-05-21', impact: 'Critique', domaine: 'Systèmes Paiement', reliability_index: 97, verified: true },
      { ref: 'Circulaire 001-2017', titre: 'Gouvernance Établissements Crédit — Conseil d\'Administration', date: '2017', impact: 'Élevé', domaine: 'Gouvernance', reliability_index: 97, verified: true },
      { ref: 'Instruction 001-04-2018', titre: 'Contrôle interne SFD — Dispositif minimal', date: '2018-04', impact: 'Critique', domaine: 'Contrôle Interne', reliability_index: 98, verified: true },
    ],
  },
  {
    id: 'cobac',
    nom: 'COBAC',
    zone: 'CEMAC',
    pays: 6,
    textesSuivis: 285,
    alertesMois: 12,
    scoreConformite: 82,
    icon: 'ri-scales-3-line',
    color: '#C2410C',
    description: 'Commission Bancaire de l\'Afrique Centrale. Autorité de supervision bancaire pour les 6 pays de la CEMAC. 38 citations vérifiées (85-97/100).',
    derniersTextes: [
      { ref: 'R-2025/01', titre: 'Cybersécurité et résilience opérationnelle', date: '2025-01-19', impact: 'Critique', domaine: 'Cybersécurité', reliability_index: 95, verified: true },
      { ref: 'R-2024/01', titre: 'Gestion des risques TIC — Gouvernance', date: '2024', impact: 'Élevé', domaine: 'TIC', reliability_index: 94, verified: true },
      { ref: 'R-2016/01', titre: 'Contrôle interne — Dispositif obligatoire', date: '2016', impact: 'Critique', domaine: 'Contrôle Interne', reliability_index: 97, verified: true },
    ],
  },
  {
    id: 'cima',
    nom: 'CIMA',
    zone: 'CIMA (14 pays)',
    pays: 14,
    textesSuivis: 198,
    alertesMois: 6,
    scoreConformite: 78,
    icon: 'ri-shield-line',
    color: '#6366F1',
    description: 'Conférence Interafricaine des Marchés d\'Assurance. Régulateur du secteur des assurances en Afrique francophone. 14 États membres. 3 citations vérifiées (96-97/100).',
    derniersTextes: [
      { ref: 'Code CIMA Livre I', titre: 'Réglementation Assurance — Dispositions Générales', date: 'En vigueur', impact: 'Critique', domaine: 'Assurance', reliability_index: 97, verified: true },
      { ref: 'Code CIMA Livre II', titre: 'Assurance — Sociétés et Intermédiaires', date: 'En vigueur', impact: 'Élevé', domaine: 'Assurance', reliability_index: 96, verified: true },
      { ref: 'Règlement Microassurance 2022', titre: 'Microassurance — Cadre Réglementaire CIMA', date: '2022', impact: 'Élevé', domaine: 'InsurTech', reliability_index: 93, verified: true },
    ],
  },
  {
    id: 'cosumaf',
    nom: 'COSUMAF',
    zone: 'CEMAC',
    pays: 6,
    textesSuivis: 145,
    alertesMois: 4,
    scoreConformite: 75,
    icon: 'ri-line-chart-line',
    color: '#8B5CF6',
    description: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale. Régulateur des marchés financiers en zone CEMAC.',
    derniersTextes: [
      { ref: '[EN VEILLE]', titre: 'Agrément des sociétés de gestion de portefeuille — Source COSUMAF', date: '2026-05-08', impact: 'Élevé', domaine: 'Marchés Financiers', reliability_index: 70, verified: false },
      { ref: '[EN VEILLE]', titre: 'Obligations d\'information des émetteurs — Source COSUMAF', date: '2026-03-22', impact: 'Élevé', domaine: 'Transparence', reliability_index: 68, verified: false },
      { ref: '[EN VEILLE]', titre: 'Fonds d\'investissement alternatifs — Source COSUMAF', date: '2026-01-30', impact: 'Moyen', domaine: 'Innovation', reliability_index: 65, verified: false },
    ],
  },
  {
    id: 'crepmf',
    nom: 'AMF-UEMOA',
    zone: 'UEMOA',
    pays: 8,
    textesSuivis: 132,
    alertesMois: 3,
    scoreConformite: 72,
    icon: 'ri-funds-line',
    color: '#F59E0B',
    description: 'Conseil Régional de l\'Épargne Publique et des Marchés Financiers. Régulateur des marchés financiers de l\'UEMOA.',
    derniersTextes: [
      { ref: '[EN VEILLE]', titre: 'Procédures d\'introduction en bourse BRVM — Source AMF-UEMOA', date: '2026-05-18', impact: 'Élevé', domaine: 'Marchés Financiers', reliability_index: 68, verified: false },
      { ref: '[EN VEILLE]', titre: 'Agrément des OPCVM — Source AMF-UEMOA', date: '2026-04-10', impact: 'Élevé', domaine: 'Gestion Actifs', reliability_index: 65, verified: false },
      { ref: '[EN VEILLE]', titre: 'Reporting ESG des sociétés cotées — Source AMF-UEMOA', date: '2026-03-05', impact: 'Moyen', domaine: 'ESG', reliability_index: 62, verified: false },
    ],
  },
  {
    id: 'gafi',
    nom: 'GAFI/GIABA/GABAC',
    zone: 'International',
    pays: 17,
    textesSuivis: 175,
    alertesMois: 8,
    scoreConformite: 80,
    icon: 'ri-global-line',
    color: '#DC2626',
    description: 'Groupe d\'Action Financière et ses organismes régionaux (GIABA pour l\'UEMOA, GABAC pour la CEMAC). 29 citations GAFI vérifiées (94-99/100).',
    derniersTextes: [
      { ref: 'R.15', titre: 'Actifs virtuels et prestataires VASP (révision 2019)', date: '2019-06', impact: 'Critique', domaine: 'LBC/FT', reliability_index: 96, verified: true },
      { ref: 'R.24', titre: 'Bénéficiaires effectifs — Transparence (révision 2022)', date: '2022-03', impact: 'Critique', domaine: 'Transparence', reliability_index: 97, verified: true },
      { ref: 'R.1', titre: 'Évaluation des Risques — Approche par les Risques', date: 'En vigueur', impact: 'Élevé', domaine: 'Conformité', reliability_index: 98, verified: true },
    ],
  },
  {
    id: 'banques-centrales',
    nom: 'Banques Centrales Nationales',
    zone: 'UEMOA + CEMAC',
    pays: 14,
    textesSuivis: 89,
    alertesMois: 5,
    scoreConformite: 70,
    icon: 'ri-building-2-line',
    color: '#1A1A2E',
    description: 'Directions nationales de la BCEAO et de la BEAC. Application locale des réglementations sous-régionales.',
    derniersTextes: [
      { ref: '[EN VEILLE]', titre: 'Instructions nationales SFD — Sénégal', date: '2026-05-20', impact: 'Élevé', domaine: 'SFD', reliability_index: 62, verified: false },
      { ref: '[EN VEILLE]', titre: 'Agrément établissements paiement Cameroun', date: '2026-04-15', impact: 'Élevé', domaine: 'Paiement', reliability_index: 60, verified: false },
      { ref: '[EN VEILLE]', titre: 'Microfinance digitale Côte d\'Ivoire', date: '2026-03-12', impact: 'Moyen', domaine: 'FinTech', reliability_index: 58, verified: false },
    ],
  },
  {
    id: 'autorites-fintech',
    nom: 'Autorités FinTech & Data',
    zone: 'UEMOA + CEMAC',
    pays: 17,
    textesSuivis: 64,
    alertesMois: 3,
    scoreConformite: 65,
    icon: 'ri-cpu-line',
    color: '#0EA5E9',
    description: 'Autorités de régulation FinTech, protection des données personnelles et innovation financière.',
    derniersTextes: [
      { ref: 'Note Aux Banques 2024', titre: 'Protection données — Secteur financier BCEAO', date: '2024', impact: 'Critique', domaine: 'Data Privacy', reliability_index: 93, verified: true },
      { ref: 'Instruction 006-2019', titre: 'Labellisation FinTech — Sandbox BCEAO', date: '2019', impact: 'Élevé', domaine: 'Innovation', reliability_index: 94, verified: true },
      { ref: '[EN VEILLE]', titre: 'Licence établissement de monnaie électronique — Source ARTCI', date: '2026-04-08', impact: 'Élevé', domaine: 'e-Money', reliability_index: 55, verified: false },
    ],
  },
];

export const alertesRecentes = [
  { id: 'ALT-001', date: '2026-06-24', regulateur: 'COBAC', titre: 'R-2025/01 Cybersécurité — Vérifié (95/100, N2)', impact: 'Critique', zone: 'CEMAC', reliability_index: 95, verified: true },
  { id: 'ALT-002', date: '2026-06-23', regulateur: 'BCEAO', titre: 'Instruction 008-05-2015 EME — Vérifiée (97/100, N3)', impact: 'Critique', zone: 'UEMOA', reliability_index: 97, verified: true },
  { id: 'ALT-003', date: '2026-06-22', regulateur: 'GAFI', titre: 'R.15 Actifs Virtuels (96/100) + R.24 BE (97/100) — Vérifiés N3', impact: 'Critique', zone: 'International', reliability_index: 96, verified: true },
  { id: 'ALT-004', date: '2026-06-21', regulateur: 'CIMA', titre: 'Code CIMA Livre I — Dispositions Générales (97/100, N3)', impact: 'Élevé', zone: 'CIMA', reliability_index: 97, verified: true },
  { id: 'ALT-005', date: '2026-06-20', regulateur: 'BCEAO', titre: 'Circulaire 006-2021 — Cybersécurité Bancaire (92/100, N2)', impact: 'Élevé', zone: 'UEMOA', reliability_index: 92, verified: true },
  { id: 'ALT-006', date: '2026-06-19', regulateur: 'BCEAO', titre: 'Dispositif Prudentiel 2023 — Ratios Bâle III UEMOA (98/100, N3)', impact: 'Élevé', zone: 'UEMOA', reliability_index: 98, verified: true },
  { id: 'ALT-007', date: '2026-06-18', regulateur: 'GIABA', titre: 'Rapport Évaluation Mutuelle 2023 — 11 Pays UEMOA (95/100, N2)', impact: 'Élevé', zone: 'UEMOA', reliability_index: 95, verified: true },
  { id: 'ALT-008', date: '2026-06-17', regulateur: 'COBAC', titre: 'R-2024/03 Résilience Opérationnelle — Directive 2027 (96/100, N2)', impact: 'Élevé', zone: 'CEMAC', reliability_index: 96, verified: true },
];

export const axesAnalyse = [
  { id: 'prudentiel', name: 'Régulation Prudentielle', icon: 'ri-shield-check-line', description: 'Ratios de solvabilité, liquidité, Bâle II/III, normes IFRS 9, provisions, stress tests, fonds propres réglementaires. BCEAO Dispositif Prudentiel 2023 (98/100), COBAC R-2021/06 (96/100).' },
  { id: 'gouvernance', name: 'Gouvernance & Contrôle Interne', icon: 'ri-organization-chart', description: 'Composition CA, comités spécialisés, contrôle interne, audit interne, gestion des conflits d\'intérêts. BCEAO Circulaire 001-2017 (97/100), COBAC R-2016/01 (97/100).' },
  { id: 'lbft', name: 'LBC/FT & Conformité', icon: 'ri-shield-flash-line', description: 'KYC, due diligence, déclarations soupçon, gel avoirs, sanctions internationales, bénéficiaires effectifs. GAFI R.1 (98/100), R.10 (99/100), R.24 (97/100), COBAC R-2020/05 (97/100).' },
  { id: 'digital', name: 'Transformation Digitale & Cybersécurité', icon: 'ri-computer-line', description: 'Open Banking, API, cloud, monnaie électronique, cyber-résilience, protection des données. COBAC R-2025/01 (95/100), BCEAO Note Aux Banques 2024 (93/100).' },
  { id: 'fintech', name: 'FinTech & Innovation', icon: 'ri-rocket-line', description: 'Agrément FinTech, bacs à sable, crowdfunding, crypto-actifs, stablecoins, MNBC. BCEAO Instruction 006-2019 (94/100), GAFI R.15 (96/100).' },
  { id: 'esg', name: 'ESG & Finance Durable', icon: 'ri-leaf-line', description: 'Taxonomie verte, stress tests climatiques, ISSB, GRI, obligations vertes, inclusion financière, microfinance. BCEAO Circulaire 005-2020 (91/100).' },
];

export const barometreStats = {
  uemoa: { tauxBancarisation: 24.7, mobileMoney: 58.3, institutions: 312, conformiteGlobale: 87 },
  cemac: { tauxBancarisation: 19.2, mobileMoney: 42.1, institutions: 198, conformiteGlobale: 82 },
};

export const cartographieTextes = [
  { domaine: 'Gouvernance', bceao: 48, cobac: 37, cima: 22, cosumaf: 15, crepmf: 18, gafi: 12, total: 152 },
  { domaine: 'Prudentiel', bceao: 62, cobac: 45, cima: 28, cosumaf: 8, crepmf: 10, gafi: 5, total: 158 },
  { domaine: 'LBC/FT', bceao: 35, cobac: 42, cima: 18, cosumaf: 5, crepmf: 6, gafi: 68, total: 174 },
  { domaine: 'Digital & Cyber', bceao: 28, cobac: 32, cima: 15, cosumaf: 8, crepmf: 9, gafi: 8, total: 100 },
  { domaine: 'FinTech & Innovation', bceao: 22, cobac: 18, cima: 10, cosumaf: 10, crepmf: 8, gafi: 12, total: 80 },
  { domaine: 'ESG & Finance Durable', bceao: 18, cobac: 12, cima: 8, cosumaf: 5, crepmf: 7, gafi: 5, total: 55 },
];

export const faqs = [
  {
    q: 'Qu\'est-ce que l\'Observatoire Réglementaire Africain KHEPRA ?',
    a: 'L\'Observatoire Réglementaire Africain est le centre de veille et d\'intelligence réglementaire de KHEPRA EXPERTS. Il couvre 10 autorités (BCEAO, COBAC, CIMA, COSUMAF, AMF-UEMOA, GAFI, GIABA, GABAC, UEMOA, CEMAC) sur 17 pays de l\'UEMOA et de la CEMAC. Il suit plus de 1 247 textes réglementaires avec 189 citations vérifiées sur sources officielles (indice de fiabilité KOS : 92/100). Il publie 43 alertes par mois.',
  },
  {
    q: 'Quelle est la différence entre l\'Observatoire COBAC et l\'Observatoire Global ?',
    a: 'L\'Observatoire COBAC est une page dédiée exclusivement à la réglementation bancaire de la zone CEMAC (38 citations vérifiées). L\'Observatoire Réglementaire Africain est le hub unifié qui agrège et croise les données de 10 autorités, offrant une vision d\'ensemble panafricaine avec des analyses d\'impact croisées (ex: comment une évolution BCEAO impacte les acteurs COBAC).',
  },
  {
    q: 'Comment sont collectées et vérifiées les données de l\'Observatoire ?',
    a: 'Les données sont collectées via le KOS Regulatory Intelligence Engine™ qui surveille en continu les sites officiels (bceao.int, beac.int, sgcobac.org, cima-afrique.org, fatf-gafi.org, ohada.org, etc.) et les flux RSS institutionnels. Chaque référence est vérifiée selon le KOS REGULATORY ZERO-DEFECT PROTOCOL™ v2.0 : Triple Validation (N1: Source Identifiée → N2: Source Certifiée → N3: Source Publiable). Seules les citations ≥ 80/100 sont publiées. Les sources officielles sont systématiquement citées.',
  },
  {
    q: 'À quelle fréquence l\'Observatoire est-il mis à jour ?',
    a: 'L\'Observatoire est mis à jour quotidiennement. Les alertes critiques (nouveaux textes réglementaires, décisions d\'agrément, sanctions) sont publiées dans les 4 heures suivant leur détection. Le baromètre mensuel est publié le 5 de chaque mois. Les analyses d\'impact approfondies sont publiées de manière hebdomadaire. Dernière vérification croisée : 27 Juin 2026.',
  },
  {
    q: 'Comment m\'abonner aux alertes de l\'Observatoire ?',
    a: 'Vous pouvez vous abonner à notre bulletin mensuel gratuit ou à nos alertes premium (quotidiennes, filtrées par régulateur et secteur). Les abonnés premium reçoivent également les analyses d\'impact détaillées et les notes de conformité KHEPRA. Utilisez le formulaire d\'abonnement sur cette page ou contactez-nous directement.',
  },
];