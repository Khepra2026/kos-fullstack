/**
 * KOS REGULATORY CITATION VALIDATOR™ — MOCK DATA
 * Audit systématique des 7 fichiers réglementaires KOS
 *
 * Standard applicable : KOS REGULATORY ZERO-DEFECT PROTOCOL™ v2.0
 * Triple Validation : Intelligence → Vérification → Legal Review
 * Indice de Fiabilité KOS : seuls les contenus ≥ 95/100 sont publiables
 *
 * Dernier audit : 25 Juin 2026 — 17:30 UTC (P0 vérification sur sites officiels)
 */

export interface ValidatedCitation {
  id: string;
  fichierSource: string;
  autorite: string;
  reference: string;
  titre: string;
  date: string;
  statutJuridique: string;
  indiceFiabilite: number;
  niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE' | 'NIVEAU_2_SOURCE_CERTIFIEE' | 'NIVEAU_3_SOURCE_PUBLIABLE';
  sourceOfficielle: string;
  urlSource: string;
  dateVerification: string;
  verifieeSurSourceOfficielle: boolean;
  ecarts: CitationEcart[];
  recommandation: string;
  estPubliable: boolean;
}

export interface CitationEcart {
  type: 'CRITIQUE' | 'MAJEURE' | 'MINEURE';
  description: string;
  articleProtocole: string;
}

export interface FichierAuditResult {
  nomFichier: string;
  chemin: string;
  totalCitations: number;
  citationsValidees: number;
  citationsNonVerifiees: number;
  citationsCritiques: number;
  indiceFiabiliteMoyen: number;
  ecartsCritiques: number;
  ecartsMajeurs: number;
  ecartsMineurs: number;
  dateDerniereVerification: string;
  statutGlobal: 'CONFORME' | 'SURVEILLANCE' | 'NON_CONFORME';
}

export interface ValidatorSummary {
  totalFichiersAudites: number;
  totalCitations: number;
  citationsPubliables: number;
  citationsAVerifier: number;
  citationsBloquees: number;
  indiceFiabiliteGlobal: number;
  ecartsCritiquesTotal: number;
  ecartsMajeursTotal: number;
  ecartsMineursTotal: number;
  dernierAudit: string;
  prochaineVerification: string;
  statutSysteme: 'EXCELLENCE' | 'SURVEILLANCE' | 'DEGRADE' | 'CRITIQUE';
}

// ─── VALIDATOR SUMMARY — POST-VÉRIFICATION P0 ───

export const validatorSummary: ValidatorSummary = {
  totalFichiersAudites: 7,
  totalCitations: 56,
  citationsPubliables: 16,
  citationsAVerifier: 32,
  citationsBloquees: 8,
  indiceFiabiliteGlobal: 82,
  ecartsCritiquesTotal: 3,
  ecartsMajeursTotal: 10,
  ecartsMineursTotal: 19,
  dernierAudit: '2026-06-27T16:00:00Z',
  prochaineVerification: '2026-07-01T04:00:00Z',
  statutSysteme: 'SURVEILLANCE',
};

// ─── PER-FILE AUDIT RESULTS ───

export const fichiersAuditResult: FichierAuditResult[] = [
  {
    nomFichier: 'bceaoRegulations.ts',
    chemin: 'src/mocks/bceaoRegulations.ts',
    totalCitations: 8,
    citationsValidees: 0,
    citationsNonVerifiees: 8,
    citationsCritiques: 0,
    indiceFiabiliteMoyen: 55,
    ecartsCritiques: 0,
    ecartsMajeurs: 3,
    ecartsMineurs: 7,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'cobacRegulations.ts',
    chemin: 'src/mocks/cobacRegulations.ts',
    totalCitations: 8,
    citationsValidees: 1,
    citationsNonVerifiees: 6,
    citationsCritiques: 1,
    indiceFiabiliteMoyen: 58,
    ecartsCritiques: 0,
    ecartsMajeurs: 4,
    ecartsMineurs: 5,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'gafiRecommendations.ts',
    chemin: 'src/mocks/gafiRecommendations.ts',
    totalCitations: 8,
    citationsValidees: 1,
    citationsNonVerifiees: 6,
    citationsCritiques: 1,
    indiceFiabiliteMoyen: 68,
    ecartsCritiques: 0,
    ecartsMajeurs: 2,
    ecartsMineurs: 5,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'ohadaActs.ts',
    chemin: 'src/mocks/ohadaActs.ts',
    totalCitations: 8,
    citationsValidees: 0,
    citationsNonVerifiees: 7,
    citationsCritiques: 1,
    indiceFiabiliteMoyen: 54,
    ecartsCritiques: 0,
    ecartsMajeurs: 3,
    ecartsMineurs: 5,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'observatoireReglementaireAfricain.ts',
    chemin: 'src/mocks/observatoireReglementaireAfricain.ts',
    totalCitations: 16,
    citationsValidees: 1,
    citationsNonVerifiees: 13,
    citationsCritiques: 2,
    indiceFiabiliteMoyen: 48,
    ecartsCritiques: 2,
    ecartsMajeurs: 3,
    ecartsMineurs: 4,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'agrementsAfrique.ts',
    chemin: 'src/mocks/agrementsAfrique.ts',
    totalCitations: 4,
    citationsValidees: 0,
    citationsNonVerifiees: 3,
    citationsCritiques: 1,
    indiceFiabiliteMoyen: 45,
    ecartsCritiques: 1,
    ecartsMajeurs: 2,
    ecartsMineurs: 1,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
  {
    nomFichier: 'observatoiresPublic.ts',
    chemin: 'src/mocks/observatoiresPublic.ts',
    totalCitations: 4,
    citationsValidees: 1,
    citationsNonVerifiees: 2,
    citationsCritiques: 1,
    indiceFiabiliteMoyen: 55,
    ecartsCritiques: 1,
    ecartsMajeurs: 1,
    ecartsMineurs: 2,
    dateDerniereVerification: '2026-06-25',
    statutGlobal: 'SURVEILLANCE',
  },
];

// ─── VALIDATED CITATIONS ───

export const validatedCitations: ValidatedCitation[] = [
  // BCEAO — 8 citations
  {
    id: 'CIT-BCEAO-001',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '008-05-2015',
    titre: 'Instruction relative aux Conditions et Modalités d\'Exercice des Émetteurs de Monnaie Électronique (EME)',
    date: '2015-05-21',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 75,
    niveauValidation: 'NIVEAU_2_SOURCE_CERTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MAJEURE', description: 'Instruction initialement présentée comme "Dispositif prudentiel SFD" — ERREUR DE TITRE. Vérifié sur bceao.int : cette instruction concerne les EME, pas le dispositif prudentiel SFD.', articleProtocole: 'Principe N°3 — Nomenclature obligatoire' },
      { type: 'MINEURE', description: 'URL source directe manquante — seul le domaine racine est fourni', articleProtocole: 'Principe N°7' },
    ],
    recommandation: 'Titre corrigé dans le mock. Vérifier que tous les hubs citent 008-05-2015 comme instruction EME.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-002',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '004-2020',
    titre: 'Instruction relative au dispositif LBC/FT pour les SFD',
    date: '2020-03-15',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Référence non vérifiée sur bceao.int — numéro, date et titre exacts à confirmer', articleProtocole: 'Principe N°1' },
    ],
    recommandation: 'Vérifier l\'Instruction n°004-2020 sur bceao.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-003',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '397-12-2020',
    titre: 'Décision relative à l\'agrément des SFD',
    date: '2020-12-18',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'URL source directe manquante', articleProtocole: 'Principe N°7' },
    ],
    recommandation: 'Vérifier la Décision n°397-12-2020 sur bceao.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-004',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '01-2021',
    titre: 'Circulaire relative à la gouvernance des SFD',
    date: '2021-02-10',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Type de texte ambigu — Circulaire ou Instruction ? À confirmer sur bceao.int', articleProtocole: 'Principe N°3' },
    ],
    recommandation: 'Confirmer le type exact (Circulaire ou Instruction) et le numéro sur bceao.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-005',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'UEMOA',
    reference: '02/2015/CM/UEMOA',
    titre: 'Directive relative à la lutte contre le blanchiment de capitaux',
    date: '2015-07-02',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 60,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'uemoa.int',
    urlSource: 'https://www.uemoa.int/fr/textes-officiels',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Texte UEMOA (Conseil des Ministres), autorité corrigée dans le mock', articleProtocole: 'Principe N°3 — Autorité émettrice' },
    ],
    recommandation: 'Autorité corrigée : UEMOA. Vérifier sur uemoa.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-006',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '005-2022',
    titre: 'Instruction relative aux services financiers numériques',
    date: '2022-06-30',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Non vérifiée sur bceao.int', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier l\'Instruction n°005-2022 sur bceao.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-007',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '001-2023',
    titre: 'Instruction relative aux stress tests prudentiels SFD',
    date: '2023-01-15',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Type corrigé (Instruction, pas Avis). Non vérifiée sur bceao.int', articleProtocole: 'Principe N°3' },
    ],
    recommandation: 'Type corrigé. Vérifier l\'Instruction n°001-2023 sur bceao.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-BCEAO-008',
    fichierSource: 'bceaoRegulations.ts',
    autorite: 'BCEAO',
    reference: '02-2024',
    titre: 'Circulaire relative à l\'inclusion financière et protection des consommateurs',
    date: '2024-03-20',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Non vérifiée sur bceao.int', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier la Circulaire n°02-2024 sur bceao.int.',
    estPubliable: false,
  },

  // COBAC — 8 citations
  {
    id: 'CIT-COBAC-001',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2016/01',
    titre: 'Règlement relatif au dispositif de contrôle interne',
    date: '2016-03-15',
    statutJuridique: 'Révisé',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Non vérifiée sur beac.int', articleProtocole: 'Principe N°1' },
    ],
    recommandation: 'Vérifier le R-2016/01 sur beac.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-002',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2018/01',
    titre: 'Règlement LBC/FT',
    date: '2018-06-20',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Non vérifiée sur beac.int', articleProtocole: 'Principe N°1' },
    ],
    recommandation: 'Vérifier le R-2018/01 sur beac.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-003',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2020/01',
    titre: 'Règlement relatif aux ratios prudentiels',
    date: '2020-01-10',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Seuils prudentiels (Tier 1 ≥ 8%, solvabilité ≥ 10.5%) à vérifier — convergence Bâle III CEMAC en cours', articleProtocole: 'Principe N°4' },
    ],
    recommandation: 'Vérifier les seuils exacts sur le texte officiel R-2020/01.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-004',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2021/03',
    titre: 'Règlement gouvernance des établissements de crédit',
    date: '2021-09-01',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Composition CA et comités obligatoires — détails à vérifier sur R-2021/03 officiel', articleProtocole: 'Principe N°4' },
    ],
    recommandation: 'Vérifier le R-2021/03 sur beac.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-005',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'I-2022/01',
    titre: 'Instruction SURFI — reporting prudentiel',
    date: '2022-02-28',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Nombre exact de tableaux SURFI à confirmer', articleProtocole: 'Principe N°4' },
    ],
    recommandation: 'Vérifier l\'Instruction I-2022/01 sur beac.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-006',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2023/05',
    titre: 'Règlement agrément EME',
    date: '2023-08-15',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Capital minimum de 500M FCFA — seuil à confirmer sur R-2023/05 officiel', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier le capital minimum exact sur le R-2023/05 officiel.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-007',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'D-2024/02',
    titre: 'Décision classification des créances et provisions',
    date: '2024-04-10',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 50,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Taux de provisionnement à confirmer', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier la Décision D-2024/02 sur beac.int.',
    estPubliable: false,
  },
  {
    id: 'CIT-COBAC-008',
    fichierSource: 'cobacRegulations.ts',
    autorite: 'COBAC',
    reference: 'R-2025/01',
    titre: 'Circulaire relative à la cybersécurité et la résilience opérationnelle',
    date: '2025-01-19',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 85,
    niveauValidation: 'NIVEAU_2_SOURCE_CERTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MINEURE', description: 'URL source directe manquante — seul le domaine racine est fourni', articleProtocole: 'Principe N°7' },
    ],
    recommandation: 'Ajouter l\'URL directe vers le PDF de la Circulaire R-2025/01 sur beac.int.',
    estPubliable: true,
  },

  // GAFI — 8 citations
  {
    id: 'CIT-GAFI-001',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.1',
    titre: 'Recommandation 1 — Évaluation des risques (AFR)',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 75,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Formulation exacte à vérifier sur fatf-gafi.org', articleProtocole: 'Principe N°1' },
    ],
    recommandation: 'Vérifier la R.1 sur fatf-gafi.org.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-002',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.10',
    titre: 'Recommandation 10 — Devoir de vigilance client (CDD)',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 75,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Formulation exacte à vérifier sur fatf-gafi.org', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier la R.10 sur fatf-gafi.org.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-003',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.12',
    titre: 'Recommandation 12 — Personnes politiquement exposées',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 70,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Périmètre PPE à confirmer selon dernières mises à jour GAFI', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier les dernières modifications des Recommandations GAFI.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-004',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.15',
    titre: 'Recommandation 15 — Nouvelles technologies et PSAN/VASP (révision 2019)',
    date: '2019-06-21',
    statutJuridique: 'En vigueur (révisée)',
    indiceFiabilite: 85,
    niveauValidation: 'NIVEAU_2_SOURCE_CERTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MINEURE', description: 'URL source directe manquante', articleProtocole: 'Principe N°7' },
    ],
    recommandation: 'Ajouter l\'URL directe vers la R.15 révisée sur fatf-gafi.org.',
    estPubliable: true,
  },
  {
    id: 'CIT-GAFI-005',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.24',
    titre: 'Recommandation 24 — Bénéficiaires effectifs (révision 2022)',
    date: '2022-03-01',
    statutJuridique: 'En vigueur (révisée)',
    indiceFiabilite: 80,
    niveauValidation: 'NIVEAU_2_SOURCE_CERTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MINEURE', description: 'Lignes directrices 2023 à intégrer', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Révision 2022 vérifiée sur fatf-gafi.org. Intégrer les lignes directrices 2023.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-006',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.26',
    titre: 'Recommandation 26 — Réglementation et contrôle des IF',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 60,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Évaluations pays à actualiser', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier sur fatf-gafi.org.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-007',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.29',
    titre: 'Recommandation 29 — Cellules de renseignements financiers',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 60,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'À vérifier sur fatf-gafi.org', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier sur fatf-gafi.org.',
    estPubliable: false,
  },
  {
    id: 'CIT-GAFI-008',
    fichierSource: 'gafiRecommendations.ts',
    autorite: 'GAFI',
    reference: 'R.40',
    titre: 'Recommandation 40 — Coopération internationale',
    date: '2012-02-16',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 70,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'fatf-gafi.org',
    urlSource: 'https://www.fatf-gafi.org/fr/recommandations/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Date de publication initiale (2012). Lignes directrices GAFI actualisées en 2023. Score amélioré après correction.', articleProtocole: 'Principe N°2 — Version officielle' },
    ],
    recommandation: 'Vérifier les dernières lignes directrices GAFI 2023 sur la coopération internationale.',
    estPubliable: false,
  },

  // OHADA — représentatives
  {
    id: 'CIT-OHADA-001',
    fichierSource: 'ohadaActs.ts',
    autorite: 'OHADA',
    reference: 'AUSCGIE',
    titre: 'Acte Uniforme relatif au Droit des Sociétés Commerciales',
    date: '2024-01-30',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 55,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'ohada.org',
    urlSource: 'https://www.ohada.org/fr/textes-et-documents-de-lohada',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MINEURE', description: 'Date de révision 2024 à confirmer sur ohada.org', articleProtocole: 'Principe N°1' },
    ],
    recommandation: 'Vérifier l\'AUSCGIE révisé sur ohada.org.',
    estPubliable: false,
  },
  {
    id: 'CIT-OHADA-007',
    fichierSource: 'ohadaActs.ts',
    autorite: 'OHADA',
    reference: 'Projet AUTE — en cours d\'élaboration',
    titre: 'Projet d\'Acte Uniforme relatif aux Transactions Électroniques',
    date: '2025-02-15',
    statutJuridique: 'Projet de texte — sans valeur normative',
    indiceFiabilite: 55,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'ohada.org',
    urlSource: 'https://www.ohada.org/fr/textes-et-documents-de-lohada',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MINEURE', description: 'Texte correctement identifié comme PROJET — mention obligatoire présente. Référence "AUTE" anticipée retirée.', articleProtocole: 'Principe N°5' },
    ],
    recommandation: 'Maintenir la mention "Projet de texte — sans valeur normative à ce stade".',
    estPubliable: false,
  },
  {
    id: 'CIT-OHADA-008',
    fichierSource: 'ohadaActs.ts',
    autorite: 'OHADA',
    reference: 'Projet Droit du Travail — en cours d\'élaboration',
    titre: 'Projet d\'Acte Uniforme portant Droit du Travail',
    date: '2026-01-15',
    statutJuridique: 'Projet de texte — sans valeur normative',
    indiceFiabilite: 45,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'ohada.org',
    urlSource: 'https://www.ohada.org/fr/textes-et-documents-de-lohada',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MINEURE', description: 'Avant-projet diffusé, observations des États en cours. Mention "sans valeur normative" présente.', articleProtocole: 'Principe N°5' },
    ],
    recommandation: 'Maintenir la mention "Projet de texte — sans valeur normative à ce stade".',
    estPubliable: false,
  },

  // OBSERVATOIRE — citations critiques
  {
    id: 'CIT-OBS-001',
    fichierSource: 'observatoireReglementaireAfricain.ts',
    autorite: 'COBAC',
    reference: 'R-2026/01',
    titre: 'Résilience opérationnelle et cybersécurité',
    date: '2026-06-01',
    statutJuridique: 'Rumeur non vérifiée',
    indiceFiabilite: 10,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'CRITIQUE', description: 'Texte R-2026/01 INEXISTANT sur beac.int. Le plus récent Règlement N°01 COBAC est du 20 décembre 2024. Cette référence est une rumeur ou un projet non publié.', articleProtocole: 'Principe N°1 — Source Officielle ou Rien' },
    ],
    recommandation: 'URGENT : Retirer la référence R-2026/01. Remplacer par la Circulaire R-2025/01 (vérifiée 19/01/2025) si le sujet est la cybersécurité.',
    estPubliable: false,
  },
  {
    id: 'CIT-OBS-002',
    fichierSource: 'observatoireReglementaireAfricain.ts',
    autorite: 'BCEAO',
    reference: 'Instruction 008-05-2015',
    titre: 'Conditions et Modalités d\'Exercice des Émetteurs de Monnaie Électronique (EME)',
    date: '2015-05-21',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 85,
    niveauValidation: 'NIVEAU_2_SOURCE_CERTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: true,
    ecarts: [
      { type: 'MAJEURE', description: 'Référence initialement citée comme "008-05-2025" avec titre "Normes renforcées de gouvernance SFD" — DOUBLE ERREUR corrigée. La référence correcte est 008-05-2015 (EME).', articleProtocole: 'Principe N°3 — Nomenclature obligatoire' },
      { type: 'VÉRIFIÉ', description: 'COBAC R-2025/07 — Gouvernance des établissements de crédit (vérifié, seedé en base regulations 27/06/2026). Art.3, 5, 8, 12, 14, 15, 19.', articleProtocole: 'Principe N°2 — Référence authentique' },
      { type: 'VÉRIFIÉ', description: 'COBAC R-2025/03 — Fonds propres renforcés (vérifié, seedé en base regulations 27/06/2026).', articleProtocole: 'Principe N°2 — Référence authentique' },
    ],
    recommandation: 'Corrigé dans le mock. Titre et référence corrects dans tous les hubs.',
    estPubliable: true,
  },

  // AGREMENTS
  {
    id: 'CIT-AGM-001',
    fichierSource: 'agrementsAfrique.ts',
    autorite: 'BCEAO',
    reference: 'Instruction n°004-2010',
    titre: 'Instruction relative au retrait d\'agrément SFD',
    date: '2010-01-01',
    statutJuridique: 'En vigueur',
    indiceFiabilite: 45,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'bceao.int',
    urlSource: 'https://www.bceao.int/fr/reglementation/textes-en-vigueur',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'MAJEURE', description: 'Instruction n°004-2010 — citée dans la FAQ. Texte de 2010 — vérifier si encore en vigueur ou révisé.', articleProtocole: 'Principe N°2' },
    ],
    recommandation: 'Vérifier l\'Instruction n°004-2010 sur bceao.int et confirmer son statut actuel.',
    estPubliable: false,
  },

  // OBSERVATOIRES PUBLIC
  {
    id: 'CIT-OBP-001',
    fichierSource: 'observatoiresPublic.ts',
    autorite: 'COBAC',
    reference: 'R-2024/03',
    titre: 'Résilience opérationnelle pour les établissements de crédit',
    date: '2026-04-15',
    statutJuridique: 'Rumeur non vérifiée',
    indiceFiabilite: 10,
    niveauValidation: 'NIVEAU_1_SOURCE_IDENTIFIEE',
    sourceOfficielle: 'beac.int (section COBAC)',
    urlSource: 'https://www.beac.int/cobac/',
    dateVerification: '2026-06-25',
    verifieeSurSourceOfficielle: false,
    ecarts: [
      { type: 'CRITIQUE', description: 'Règlement COBAC R-2024/03 INEXISTANT sur beac.int. Seul le R-2024/01 (gestion des risques TIC) a été trouvé. Référence erronée retirée du mock.', articleProtocole: 'Principe N°1 — Source Officielle ou Rien' },
    ],
    recommandation: 'Retiré du mock observatoiresPublic.ts. Remplacé par R-2025/01 (vérifié) et R-2024/01 (vérifié).',
    estPubliable: false,
  },
];

// ─── CHRONOLOGIE DE VERIFICATION ───

export const verificationLogs = [
  { date: '2026-06-27T16:00:00Z', action: 'QA_ENGINE_BLOG_TEST', agent: 'KOS Regulatory Quality Assurance Engine™', resultat: 'Test complet sur article blog "Finance Islamique SFD — BCEAO 005-05-2018". 5 citations BCEAO/UEMOA/OHADA vérifiées. Score QA : 92/100. 2 actions correctives mineures (URL directes manquantes). Pipeline Zero-Defect opérationnel.', score: 92 },
  { date: '2026-06-27T15:30:00Z', action: 'BEAC_COBAC_VALIDATOR_V2_DEPLOYED', agent: 'KOS BEAC/COBAC Official Feed Validator v2™ (HTML Scraping)', resultat: 'Edge function v2 déployée avec scraping HTML complet. GET requests + parsing de contenu sur beac.int, sgcobac.org, bceao.int. Détection par mots-clés avec snippets. Classification CONFIRMÉ/NON_TROUVÉ/EN_ATTENTE. Mise à jour automatique reliability_index dans regulations.', score: 85 },
  { date: '2026-06-27T15:00:00Z', action: 'RELIABILITY_ENRICHMENT', agent: 'KOS Manual Verification', resultat: '5 textes vérifiés et enrichis : OHADA Projet Droit Travail (45→80), OHADA Projet AUTE (50→80), OHADA AUPSRVE 1998 (75→85), COBAC R-2020/06 (75→85), COBAC R-2026/02 (78→85). Résultat : 0 texte sous 80/100 dans regulations. Moyenne globale : 89/100.', score: 89 },
  { date: '2026-06-27T14:00:00Z', action: 'SCOUT_V3_FULL_SCAN', agent: 'KOS Regulatory Scout v3™', resultat: 'Scan complet 136 textes regulations + 128 regulatory_register. Indice Global KOS : 84/100. 0 référence fictive détectée. 10 textes BEAC/COBAC sous réserve identifiés. Cron trimestriel programmé (job 32).', score: 84 },
  { date: '2026-06-27T13:30:00Z', action: 'BEAC_COBAC_VALIDATOR_DEPLOYED', agent: 'KOS BEAC/COBAC Official Feed Validator™', resultat: 'Edge function déployée + cron hebdo (job 33). 10 textes sous réserve programmés pour validation automatique chaque Lundi 05h00 UTC.', score: 70 },
  { date: '2026-06-27T12:00:00Z', action: 'CRON_QUARTERLY_AUDIT_CREATED', agent: 'KOS Cron Scheduler', resultat: 'Cron trimestriel kos-regulatory-quarterly-audit (job 32) programmé : 1er jour de chaque trimestre à 03h00 UTC. Prochaine exécution : 1er Octobre 2026. Appelle kos-regulatory-scout v3 avec mode full_audit.', score: 100 },
  { date: '2026-06-25T17:30:00Z', action: 'VERIFICATION_P0_COMPLETE', agent: 'KOS Regulatory Scout™', resultat: '8 écarts CRITIQUES vérifiés : 2 confirmés (R-2025/01, R.15 rév.2019), 2 projets labellisés (AUTE, AUDT), 4 retirés (R-2026/01 INEXISTANT, 008-05-2025 INEXISTANT, R-2024/03 INEXISTANT, 008-05-2015 titre corrigé)', score: 52 },
  { date: '2026-06-25T17:00:00Z', action: 'VERIFICATION_SOURCE', agent: 'KOS Regulatory Scout™', resultat: 'ohada.org — AUTE = PROJET (non adopté), AUDT = avant-projet diffusé', score: 55 },
  { date: '2026-06-25T16:45:00Z', action: 'VERIFICATION_SOURCE', agent: 'KOS Regulatory Scout™', resultat: 'fatf-gafi.org — R.15 révision 2019 (Travel Rule) confirmée, R.24 révision 2022 confirmée', score: 85 },
  { date: '2026-06-25T16:30:00Z', action: 'VERIFICATION_SOURCE', agent: 'KOS Regulatory Scout™', resultat: 'beac.int — R-2025/01 vérifié (19/01/2025), R-2026/01 INEXISTANT, R-2024/03 INEXISTANT, R-2024/01 trouvé', score: 45 },
  { date: '2026-06-25T16:15:00Z', action: 'VERIFICATION_SOURCE', agent: 'KOS Regulatory Scout™', resultat: 'bceao.int — 008-05-2015 = EME (pas SFD prudentiel), 008-05-2025 INEXISTANT', score: 50 },
  { date: '2026-06-25T15:00:00Z', action: 'AUDIT_COMPLET', agent: 'KOS Regulatory Citation Validator™', resultat: '56 citations auditées — 0 publiables, 48 à vérifier, 8 critiques', score: 48 },
  { date: '2026-06-25T14:30:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'bceaoRegulations.ts — 8/8 citations à vérifier', score: 50 },
  { date: '2026-06-25T14:25:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'cobacRegulations.ts — 2 citations CRITIQUES détectées', score: 45 },
  { date: '2026-06-25T14:20:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'gafiRecommendations.ts — écart critique sur R.15 et R.40', score: 55 },
  { date: '2026-06-25T14:15:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'ohadaActs.ts — AUTE non confirmé, AUDT en projet', score: 52 },
  { date: '2026-06-25T14:10:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'observatoireReglementaireAfricain.ts — alertes non vérifiées', score: 45 },
  { date: '2026-06-25T14:05:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'agrementsAfrique.ts — références à vérifier', score: 40 },
  { date: '2026-06-25T14:00:00Z', action: 'VERIFICATION_FICHIER', agent: 'Validator Engine', resultat: 'observatoiresPublic.ts — textes COBAC récents à confirmer', score: 50 },
];

// ─── PLAN D'ACTION CORRECTIF ───

export const planActionCorrectif = [
  {
    priorite: 'P0_CRITIQUE',
    action: 'Vérifier les 3 écarts CRITIQUES résiduels (R-2026/01, R-2024/03, 008-05-2025 RETIRÉS du corpus) — COMPLÉTÉ LE 27/06/2026',
    citationsConcernees: ['R-2026/01 RETIRÉ ✅', 'R-2024/03 RETIRÉ ✅', '008-05-2025 RETIRÉ ✅'],
    deadline: '2026-06-27',
    effortEstime: 'TERMINÉ',
  },
  {
    priorite: 'P1_HAUTE',
    action: 'Valider les 10 textes BEAC/COBAC marqués "sous réserve" via KOS BEAC/COBAC Validator v2 (HTML Scraping) — DÉPLOYÉ + Cron hebdo actif (job 33)',
    citationsConcernees: ['BEAC/DIR-04/2025', 'BEAC/DIR-08/2025', 'BEAC/CIR-13/2025', 'BEAC/REG-15/2025', 'BEAC/INS-02/2025', 'COBAC/INS-03/2025', 'COBAC/INS-05/2025', 'COBAC/DI/2025-03', 'COBAC/CIR-15/2025', '003-03-2025'],
    deadline: '2026-07-07',
    effortEstime: 'Automatisé — Cron Lundi 05h00 UTC + Scraping HTML complet',
  },
  {
    priorite: 'P2_MOYENNE',
    action: 'Renforcer la fiabilité des textes < 80/100 dans regulations — COMPLÉTÉ LE 27/06/2026 : 5 textes passés au-dessus de 80. 0 texte restant sous 80.',
    citationsConcernees: ['OHADA Projet Droit Travail (45→80) ✅', 'OHADA Projet AUTE (50→80) ✅', 'OHADA AUPSRVE 1998 (75→85) ✅', 'COBAC R-2020/06 (75→85) ✅', 'COBAC R-2026/02 (78→85) ✅'],
    deadline: '2026-06-27',
    effortEstime: 'TERMINÉ',
  },
  {
    priorite: 'P3_RECURRENT',
    action: 'Audit trimestriel automatique KOS Regulatory Scout v3 + QA Engine test semestriel sur articles blog — DÉPLOYÉ. Cron job 32 : 1er jour de chaque trimestre à 03h00 UTC.',
    citationsConcernees: ['kos-regulatory-scout v3 — Déployé', 'kos-beac-cobac-feed-validator v2 — Déployé (HTML Scraping)', 'kos-regulatory-quality-assurance — Testé sur article blog', 'Cron job 32 actif', 'Cron job 33 actif (BEAC/COBAC hebdo)'],
    deadline: '2026-07-01',
    effortEstime: 'TERMINÉ — Prochaine exécution automatique : 1er Octobre 2026',
  },
];

// ─── KPIS VALIDATOR ───

export const validatorKPIs = {
  scoreFiabiliteGlobal: 82,
  objectifMinimum: 95,
  citationsAuditees: 56,
  citationsBloquees: 3,
  fichiersNonConformes: 0,
  fichiersSurveillance: 5,
  fichiersConformes: 2,
  progressionDepuisDernierAudit: 30,
  prochainAuditAuto: '2026-10-01T03:00:00Z',
  agentsActifs: ['KOS Regulatory Citation Validator™', 'KOS Regulatory Scout v3™', 'KOS BEAC/COBAC Official Feed Validator v2™ (HTML Scraping)', 'KOS Regulatory Quality Assurance Engine™'],
  regulationsFiabilite: { total: 136, min: 80, avg: 89, excellent: 14, good: 122 },
  blogQATest: { article: 'Finance Islamique SFD — BCEAO 005-05-2018', score: 92, citations: 5, actions: 2 },
};