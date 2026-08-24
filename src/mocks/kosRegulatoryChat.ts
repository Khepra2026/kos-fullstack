export const regulators = [
  { code: 'BCEAO', name: "Banque Centrale des États de l'Afrique de l'Ouest", zone: 'UEMOA', flag: 'ri-bank-line' },
  { code: 'COBAC', name: "Commission Bancaire de l'Afrique Centrale", zone: 'CEMAC', flag: 'ri-building-2-line' },
  { code: 'CIMA', name: 'Conférence Interafricaine des Marchés d\'Assurances', zone: 'UEMOA/CEMAC', flag: 'ri-umbrella-line' },
  { code: 'GAFI', name: "Groupe d'Action Financière", zone: 'International', flag: 'ri-global-line' },
  { code: 'OHADA', name: "Organisation pour l'Harmonisation du Droit des Affaires en Afrique", zone: 'Afrique', flag: 'ri-scales-3-line' },
  { code: 'GIABA', name: "Groupe Intergouvernemental d'Action contre le Blanchiment", zone: 'CEDEAO', flag: 'ri-shield-check-line' },
  { code: 'AMF-UEMOA', name: 'Autorité des Marchés Financiers UEMOA', zone: 'UEMOA', flag: 'ri-line-chart-line' },
  { code: 'COSUMAF', name: 'Commission de Surveillance du Marché Financier', zone: 'CEMAC', flag: 'ri-funds-line' },
];

export const sampleChats = [
  {
    id: 'chat-1',
    title: 'Ratio de solvabilité UEMOA 2026',
    mode: 'search' as const,
    regulator: 'BCEAO',
    messages: [
      { role: 'user' as const, content: 'Quel est le ratio de solvabilité minimum exigé par la BCEAO pour les banques en 2026 ?' },
      {
        role: 'assistant' as const,
        content: "Selon le **Dispositif Prudentiel applicable aux établissements de crédit de l'UMOA** (Instruction BCEAO n° 011-12-2016/RB, révisée 2024), le ratio minimum de solvabilité exigé est de **9,5%** depuis le 1er janvier 2025, contre 8% auparavant.\n\nCe ratio est calculé comme suit :\n\n**Ratio = Fonds Propres Nets / (Risque de Crédit + Risque Opérationnel + Risque de Marché) × 100**\n\nLes fonds propres sont décomposés en :\n- **Tier 1 (CET1 + AT1)** : minimum 7,5%\n- **Tier 2** : maximum 2% (plafonné à 33% du Tier 1)\n\nUn **coussin de conservation de 2,5%** s'applique en sus, portant l'exigence totale effective à **12%**.",
        sources: [
          { title: 'Instruction BCEAO n° 011-12-2016/RB — Dispositif Prudentiel', regulator: 'BCEAO', confidence: 98, citation: 'Titre III, Chapitre 1, Article 12' },
          { title: 'Circulaire BCEAO n° 004-2024/RB — Révision Ratio Solvabilité', regulator: 'BCEAO', confidence: 95, citation: 'Article 3 — Entrée en vigueur 01/01/2025' },
          { title: 'Rapport Annuel Commission Bancaire UMOA 2025', regulator: 'BCEAO', confidence: 87, citation: 'Section 4.2 — État de la solvabilité' },
        ],
      },
    ],
  },
  {
    id: 'chat-2',
    title: 'Obligations LBC/FT COBAC',
    mode: 'obligations' as const,
    regulator: 'COBAC',
    messages: [
      { role: 'user' as const, content: 'Liste toutes les obligations déclaratives LBC/FT pour les banques sous COBAC' },
      {
        role: 'assistant' as const,
        content: "Voici les **obligations déclaratives LBC/FT** pour les établissements assujettis COBAC (Règlement COBAC R-2018/01 modifié par R-2023/02) :\n\n### 1. Déclarations Périodiques\n\n| Obligation | Périodicité | Échéance | Référence |\n|-----------|------------|----------|----------|\n| **Rapport Annuel LBC/FT** | Annuelle | 31 mars N+1 | Art. 42 |\n| **Déclaration de Soupçon (DS)** | Immédiate | Sans délai | Art. 28 |\n| **Rapport Trimestriel Transactions en Espèces** | Trimestrielle | 15 du mois suivant | Art. 45 |\n| **Déclaration des PPE** | Annuelle | 31 janvier | Art. 33 |\n| **Rapport Semestriel Contrôle Interne LBC/FT** | Semestrielle | 30 jours après fin semestre | Art. 38 |\n\n### 2. Obligations Permanentes\n\n- **Vigilance constante** (CDD approfondi) — Articles 15-22\n- **Conservation des documents** 10 ans minimum — Article 49\n- **Formation du personnel** (obligatoire, tracée) — Article 39\n- **Audit externe LBC/FT** annuel — Article 40\n\n### 3. Sanctions (Art. 52-58)\n\n- Retard > 30 jours : 5-50M FCFA\n- Non-déclaration de soupçon : retrait d'agrément possible\n- Défaut de CDD : 10-100M FCFA",
        sources: [
          { title: 'Règlement COBAC R-2018/01 — Organisation du Dispositif LBC/FT', regulator: 'COBAC', confidence: 98, citation: 'Articles 15-58' },
          { title: 'Règlement COBAC R-2023/02 — Renforcement LBC/FT', regulator: 'COBAC', confidence: 96, citation: 'Modifications Articles 28, 33, 42' },
          { title: 'Guide Pratique COBAC — Reporting LBC/FT 2025', regulator: 'COBAC', confidence: 90, citation: 'Annexe 3 — Calendrier déclaratif' },
        ],
      },
    ],
  },
  {
    id: 'chat-3',
    title: 'Agrément FinTech UEMOA',
    mode: 'search' as const,
    regulator: 'BCEAO',
    messages: [
      { role: 'user' as const, content: "Quelles sont les étapes d'agrément pour un établissement de monnaie électronique (EME) dans l'UEMOA ?" },
      {
        role: 'assistant' as const,
        content: "La procédure d'agrément des Émetteurs de Monnaie Électronique (EME) dans l'UEMOA est régie par l'**Instruction BCEAO n° 008-05-2015** (modifiée par l'Instruction n° 003-06-2023).\n\n### Les 5 Étapes d'Agrément\n\n**Étape 1 — Dossier de Demande (J+0)**\n- Capital minimum : **500 millions FCFA** libérés\n- Business plan 3 ans, organigramme, actionnariat\n- Description technique de la plateforme\n- Politique LBC/FT\n- Convention de cantonnement des fonds\n\n**Étape 2 — Instruction par la BCEAO (J+0 à J+90)**\n- Analyse du dossier par la Direction de la Stabilité Financière\n- Enquête de moralité sur les dirigeants\n- Audit technique de la plateforme\n\n**Étape 3 — Avis de la Commission Bancaire (J+90 à J+120)**\n- Délibération en session\n- Possibilité d'audition des dirigeants\n\n**Étape 4 — Décision du Gouverneur (J+120 à J+150)**\n- Agrément formel par décision du Gouverneur\n- Publication au Journal Officiel\n\n**Étape 5 — Mise en Activité (J+150 à J+180)**\n- Démarrage dans les 6 mois suivant l'agrément\n- Contrôle sur place dans les 12 premiers mois\n- Reporting mensuel obligatoire\n\n**Délai total moyen** : 5 à 6 mois.",
        sources: [
          { title: "Instruction BCEAO n° 008-05-2015 — Émetteurs de Monnaie Électronique", regulator: 'BCEAO', confidence: 99, citation: "Titre II — Procédure d'agrément, Articles 5-15" },
          { title: 'Instruction BCEAO n° 003-06-2023 — Modification EME', regulator: 'BCEAO', confidence: 95, citation: 'Article 2 — Capital minimum porté à 500M FCFA' },
          { title: 'Rapport Annuel FinTech UEMOA 2025', regulator: 'BCEAO', confidence: 82, citation: 'Section 3 — Agréments accordés' },
        ],
      },
    ],
  },
  {
    id: 'chat-4',
    title: 'Obligations déclaratives CIMA',
    mode: 'obligations' as const,
    regulator: 'CIMA',
    messages: [
      { role: 'user' as const, content: "Liste toutes les obligations déclaratives pour les compagnies d'assurance sous CIMA" },
      {
        role: 'assistant' as const,
        content: "Voici les **obligations déclaratives** des sociétés d'assurance agréées CIMA (Code CIMA, Livre V — Surveillance) :\n\n### 1. États Financiers & Prudentiels\n\n| Obligation | Périodicité | Échéance | Texte |\n|-----------|------------|----------|------|\n| **États financiers annuels certifiés** | Annuelle | 30 juin N+1 | Art. 310 |\n| **États C1 à C20 (reporting prudentiel)** | Trimestrielle | 45 jours fin trimestre | Art. 312 |\n| **Rapport de solvabilité (SCR)** | Annuelle | 30 avril | Art. 335 |\n| **Rapport ORSA** | Annuelle | 31 mars | Art. 342 |\n| **Déclaration des participations** | Annuelle | 31 janvier | Art. 328 |\n\n### 2. Obligations de Gestion\n\n- **Marge de solvabilité** : couverture permanente (Art. 335-340)\n- **Provisions techniques** : calcul trimestriel avec rapport commissaire aux comptes\n- **Ratio de couverture des engagements réglementés** : 100% minimum permanent\n- **Placements autorisés** : respect de la liste limitative (Art. 341)\n\n### 3. Obligations Spécifiques\n\n- **Lutte anti-blanchiment** : déclaration de soupçon (Art. 360)\n- **Protection des consommateurs** : rapport annuel réclamations (Art. 370)\n- **Gouvernance** : rapport annuel sur le contrôle interne (Art. 352)",
        sources: [
          { title: "Code CIMA — Livre V, Titre II — Surveillance des sociétés d'assurance", regulator: 'CIMA', confidence: 97, citation: 'Articles 310-370' },
          { title: 'Circulaire CIMA n° 002-2023 — Reporting prudentiel', regulator: 'CIMA', confidence: 93, citation: 'Annexe I — États C1 à C20' },
        ],
      },
    ],
  },
];

export const defaultObligations: Record<string, string[]> = {
  BCEAO: [
    'Ratio de solvabilité — Reporting trimestriel (Instruction 011-12-2016)',
    'Déclaration des grands risques — Trimestrielle (Art. 28)',
    'Rapport LBC/FT — Annuel (Art. 42, Circulaire 01-2017)',
    'Déclaration des états financiers certifiés — Annuelle',
    'Reporting des indicateurs d\'inclusion financière — Annuel',
    'Déclaration des Participations — Annuelle 31 janvier',
    'Rapport Semestriel Contrôle Interne — J+30 fin semestre',
    'Déclaration des Fonds Propres — Trimestrielle',
    'Rapport Stress Test Pilier 2 — Annuel 30 juin',
    'Reporting ESG / Climat (nouveau 2026) — Annuel',
  ],
  COBAC: [
    'Déclaration de Soupçon LBC/FT — Immédiate (R-2018/01)',
    'Rapport Annuel LBC/FT — 31 mars (R-2023/02)',
    'Rapport Trimestriel Transactions en Espèces — J+15 (Art. 45)',
    'Déclaration des PPE — 31 janvier (Art. 33)',
    'Rapport Semestriel Contrôle Interne — J+30 (Art. 38)',
    'Ratio de Solvabilité — Reporting trimestriel (Art. R-2016)',
    'Rapport Annuel Audit Externe LBC/FT — Art. 40',
    'Déclaration des Grands Risques — Trimestrielle (Art. R-2016)',
    'Reporting IFRS 9 Provisions — Trimestriel (Art. R-2021)',
    'Déclaration Gouvernance CA — Annuelle 31 mars',
  ],
  CIMA: [
    'États financiers annuels certifiés — 30 juin N+1 (Art. 310)',
    'États C1 à C20 reporting prudentiel — Trimestriel (Art. 312)',
    'Rapport de solvabilité SCR — 30 avril (Art. 335)',
    'Rapport ORSA — 31 mars (Art. 342)',
    'Déclaration des participations — 31 janvier (Art. 328)',
    'Rapport Annuel LBC/FT — Art. 360',
    'Rapport Réclamations Consommateurs — Annuel (Art. 370)',
    'Déclaration Provisions Techniques — Trimestrielle',
    'Rapport Contrôle Interne — Annuel (Art. 352)',
    'Reporting Marge de Solvabilité — Permanent (Art. 335-340)',
  ],
  GAFI: [
    "Rapport d'Évaluation Mutuelle — Cycle 5 ans",
    'Déclaration des actifs virtuels / PSAN — Permanente',
    "Rapport National d'Évaluation des Risques — Biennale",
    'Rapport de suivi des recommandations techniques — Annuel',
    'Notification des sanctions financières ciblées — Immédiate',
    'Déclaration Bénéficiaires Effectifs — Permanente',
    'Rapport Coopération Internationale — Annuel',
    'Rapport Statistiques LBC/FT — Annuel',
    'Déclaration des PPE Étrangères — Continue',
    'Rapport Supervision Basée sur les Risques — Biennale',
  ],
  OHADA: [
    'Dépôt des comptes annuels au RCCM — Annuel (AUSCGIE)',
    'Déclaration de modification statutaire — J+30 (AUSCGIE)',
    'Rapport du Commissaire aux Comptes — Annuel (AUSCGIE)',
    'Déclaration des sûretés mobilières — Au fil de l\'eau (AUS)',
    'Déclaration de cessation des paiements — 15 jours (AUPC)',
    'Déclaration des conventions réglementées — Annuelle',
    'Rapport de gestion du Conseil — Annuel',
    'Déclaration de fusion/scission — J+30 (AUSCGIE)',
    'Déclaration de dissolution — J+30 (AUSCGIE)',
    'Rapport du Liquidateur — À la clôture de liquidation',
  ],
  GIABA: [
    'Rapport Annuel LBC/FT — 31 mars',
    'Déclaration de Soupçon — Immédiate',
    'Rapport Trimestriel Transactions en Espèces — J+15',
    'Déclaration des PPE — 31 janvier',
    'Rapport Semestriel Contrôle Interne LBC/FT — J+30',
    'Rapport Évaluation Nationale des Risques — Biennale',
    'Déclaration des Bénéficiaires Effectifs — Permanente',
    'Rapport Coopération Transfrontalière — Annuel',
    'Rapport Formation du Personnel LBC/FT — Annuel',
    'Déclaration des Gel d\'Avoirs — Immédiate',
  ],
  'AMF-UEMOA': [
    "Rapport Annuel d'Activité — 31 mars N+1",
    'États financiers trimestriels — J+45 fin trimestre',
    'Déclaration des franchissements de seuils — J+5',
    "Rapport Semestriel d'Activité — J+60 fin semestre",
    "Déclaration des opérations d'initiés — Immédiate",
    'Rapport de Gouvernance — Annuel',
    'Reporting des OPCVM — Hebdomadaire/Mensuel',
    'Déclaration des Conventions Réglementées — Annuelle',
    'Rapport Contrôle Interne SGI — Annuel',
    'Reporting des Fonds Communs de Titrisation — Trimestriel',
  ],
  COSUMAF: [
    "Rapport Annuel d'Activité — 31 mars N+1",
    'États Financiers Trimestriels — J+45 fin trimestre',
    'Déclaration de Franchissements de Seuils — J+5',
    'Rapport Semestriel — J+60 fin semestre',
    'Reporting OPCVM — Hebdomadaire/Mensuel',
    'Déclaration des Conventions Réglementées — Annuelle',
    'Rapport Gouvernance SGI — Annuel',
    "Déclaration des Opérations d'Initiés — Immédiate",
    'Rapport Contrôle Interne PSG — Annuel',
    'Reporting des Fonds Communs de Placement — Trimestriel',
  ],
};

export const compareDescriptions: Record<string, string> = {
  BCEAO: 'Banque Centrale — UEMOA (8 pays). Régulateur bancaire, microfinance, systèmes de paiement. Dispositif prudentiel Bâle II/III adapté.',
  COBAC: "Commission Bancaire — CEMAC (6 pays). Régulateur bancaire unique pour l'Afrique Centrale. Règlements COBAC R-2016 à R-2024.",
  CIMA: "Conférence des Marchés d'Assurances — 14 pays (UEMOA+CEMAC). Régulateur unique du secteur assurantiel africain francophone.",
  GAFI: "Groupe d'Action Financière — Organisation intergouvernementale. 40 Recommandations LBC/FT. Évaluations mutuelles.",
  OHADA: "Organisation pour l'Harmonisation du Droit des Affaires — 17 pays. 10 Actes Uniformes. Droit des sociétés, sûretés, procédures.",
  GIABA: "Groupe Intergouvernemental d'Action contre le Blanchiment — CEDEAO (15 pays). Évaluations mutuelles LBC/FT.",
  'AMF-UEMOA': 'Autorité des Marchés Financiers — UEMOA (8 pays). Régulateur boursier : BRVM, SGI, OPCVM, titrisation.',
  COSUMAF: 'Commission de Surveillance du Marché Financier — CEMAC (6 pays). Régulateur boursier : BVMAC, SGI, OPCVM.',
};

// ─── NOUVEAU : Alertes Réglementaires (GET /v1/alerts) ───

export interface RegulatoryAlert {
  id: string;
  title: string;
  regulator: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  date: string;
  summary: string;
  text_reference: string;
  link?: string;
  category: 'nouveau_texte' | 'modification' | 'echeance' | 'sanction' | 'consultation';
}

export const mockAlerts: RegulatoryAlert[] = [
  {
    id: 'alert-001',
    title: 'Nouvelle Instruction BCEAO — Ratio de solvabilité porté à 11,5%',
    regulator: 'BCEAO',
    severity: 'critical',
    date: '2026-07-08',
    summary: "La BCEAO vient de publier l'Instruction n° 005-07-2026/RB relevant le ratio minimum de solvabilité de 9,5% à 11,5% pour les établissements de crédit. Entrée en vigueur : 1er janvier 2027. Les banques disposent de 6 mois pour se conformer.",
    text_reference: 'Instruction BCEAO n° 005-07-2026/RB',
    category: 'nouveau_texte',
  },
  {
    id: 'alert-002',
    title: 'COBAC — Modification R-2023/02 : Renforcement des sanctions LBC/FT',
    regulator: 'COBAC',
    severity: 'high',
    date: '2026-07-05',
    summary: "Le règlement COBAC R-2023/02 modifié introduit des sanctions renforcées pour les manquements LBC/FT : amendes portées à 500M FCFA maximum (contre 100M), et possibilité de suspension d'agrément pour les récidivistes.",
    text_reference: 'Règlement COBAC R-2023/02 modifié — Art. 52-58',
    category: 'modification',
  },
  {
    id: 'alert-003',
    title: 'GAFI — Publication du Rapport d\'Évaluation Mutuelle UEMOA 2026',
    regulator: 'GAFI',
    severity: 'high',
    date: '2026-07-03',
    summary: "Le GAFI a publié son rapport d'évaluation mutuelle de l'UEMOA. Note globale : Partiellement Conforme sur 28 des 40 recommandations. 12 recommandations notées Non Conformes, dont les Recommandations 6 (sanctions financières ciblées) et 24 (transparence des personnes morales).",
    text_reference: 'Rapport Évaluation Mutuelle GAFI-UEMOA — Juillet 2026',
    category: 'consultation',
  },
  {
    id: 'alert-004',
    title: 'CIMA — Nouvelle Circulaire Solvabilité Basée sur les Risques (SBR)',
    regulator: 'CIMA',
    severity: 'high',
    date: '2026-07-02',
    summary: "La CIMA a adopté la Circulaire n° 004-2026 introduisant le régime Solvabilité Basée sur les Risques (SBR), inspiré de Solvabilité II européen. Les assureurs devront calculer leur SCR (Solvency Capital Requirement) selon la formule standard ou un modèle interne agréé. Entrée en vigueur progressive : 2027-2029.",
    text_reference: 'Circulaire CIMA n° 004-2026 — Solvabilité Basée sur les Risques',
    category: 'nouveau_texte',
  },
  {
    id: 'alert-005',
    title: 'BCEAO — Échéance Rapport Annuel LBC/FT au 31 juillet 2026',
    regulator: 'BCEAO',
    severity: 'medium',
    date: '2026-07-06',
    summary: "Rappel : la date limite de transmission du Rapport Annuel LBC/FT 2025 auprès de la BCEAO est fixée au 31 juillet 2026. Les établissements en retard s'exposent à des pénalités de 5 à 50 millions FCFA selon la Circulaire 01-2017/CB.",
    text_reference: 'Circulaire BCEAO n° 01-2017/CB — Art. 42',
    category: 'echeance',
  },
  {
    id: 'alert-006',
    title: 'OHADA — Révision de l\'Acte Uniforme sur le Droit des Sociétés Commerciales',
    regulator: 'OHADA',
    severity: 'medium',
    date: '2026-06-28',
    summary: "Le Conseil des Ministres de l'OHADA a adopté la révision de l'AUSCGIE introduisant la possibilité de création de sociétés par actions simplifiées (SAS) et le renforcement des obligations de transparence des bénéficiaires effectifs.",
    text_reference: 'AUSCGIE révisé — Juin 2026, Art. 853-1 à 853-15',
    category: 'modification',
  },
  {
    id: 'alert-007',
    title: 'AMF-UEMOA — Consultation publique sur les PSAN (Crypto-actifs)',
    regulator: 'AMF-UEMOA',
    severity: 'medium',
    date: '2026-07-01',
    summary: "L\u2019AMF-UEMOA a lanc\u00e9 une consultation publique jusqu\u2019au 15 septembre 2026 sur le projet de R\u00e8glement relatif aux Prestataires de Services sur Actifs Num\u00e9riques (PSAN). Le texte propose un cadre d\u2019agr\u00e9ment et de supervision des plateformes crypto.",
    text_reference: 'Consultation AMF-UEMOA — Projet Règlement PSAN, 2026',
    category: 'consultation',
  },
  {
    id: 'alert-008',
    title: 'COSUMAF — Suspension de 3 SGI pour manquements aux obligations déclaratives',
    regulator: 'COSUMAF',
    severity: 'critical',
    date: '2026-07-07',
    summary: "La COSUMAF a prononcé la suspension temporaire d'agrément de trois Sociétés de Gestion et d'Intermédiation (SGI) pour défaut répété de transmission des états financiers trimestriels et non-respect des ratios de couverture des fonds clients.",
    text_reference: 'Décision COSUMAF n° 2026-014/DG — Suspensions SGI',
    category: 'sanction',
  },
];

export const mockMonitoredTextsCount = 137;

// ─── NOUVEAU : Score de Conformité (POST /v1/score) ───

export interface ComplianceScoreResult {
  score: number;
  pdf_url: string;
  axes: {
    nom: string;
    score: number;
    max: number;
    commentaire: string;
  }[];
  recommandations: string[];
}

export function computeMockScore(payload: { etablissement: string; type: string; pays: string; taille: string }): ComplianceScoreResult {
  const baseScores: Record<string, number> = {
    banque: 72, sfd: 65, fintech: 48, assurance: 78,
  };
  const base = baseScores[payload.type] || 60;
  const variation = Math.floor(Math.random() * 12) - 4;

  return {
    score: Math.min(100, Math.max(0, base + variation)),
    pdf_url: '/mock/rapport-conformite-khepra-2026.pdf',
    axes: [
      { nom: 'Gouvernance & Conseil d\'Administration', score: Math.floor(base * 0.85 + Math.random() * 15), max: 20, commentaire: 'Composition du CA conforme aux exigences de l\'Instruction 01-2017/CB. Renforcer la fréquence des comités spécialisés.' },
      { nom: 'Dispositif LBC/FT', score: Math.floor(base * 0.7 + Math.random() * 18), max: 20, commentaire: 'Cartographie des risques LBC/FT à actualiser. Procédure de déclaration de soupçon conforme.' },
      { nom: 'Gestion des Risques', score: Math.floor(base * 0.78 + Math.random() * 12), max: 15, commentaire: 'Stress tests réalisés mais méthodologie à renforcer. Appétit au risque formalisé.' },
      { nom: 'Contrôle Interne & Audit', score: Math.floor(base * 0.75 + Math.random() * 10), max: 15, commentaire: 'Plan d\'audit annuel en place. Suivi des recommandations à systématiser.' },
      { nom: 'Sécurité SI & Data Privacy', score: Math.floor(base * 0.6 + Math.random() * 18), max: 15, commentaire: 'PSSI existant mais à mettre à jour. Pas de test d\'intrusion dans les 12 derniers mois.' },
      { nom: 'Reporting Réglementaire', score: Math.floor(base * 0.82 + Math.random() * 10), max: 15, commentaire: 'Reporting prudentiel trimestriel conforme. Retards occasionnels sur le reporting LBC/FT.' },
    ],
    recommandations: [
      'Mettre en place un comité risques distinct du comité d\'audit (Instruction 01-2017/CB)',
      'Actualiser la cartographie des risques LBC/FT avec approche basée sur les risques (GAFI Rec. 1)',
      'Réaliser un test d\'intrusion externe annuel (circulaire BCEAO cybersécurité)',
      'Automatiser la génération des états réglementaires via KOS RegTech™',
    ],
  };
}

// ─── NOUVEAU : Extraction NLP d'obligations (GET /v1/obligations?text_id=X) ───

export interface ExtractedObligation {
  article: string;
  type: 'declarative' | 'prudentielle' | 'gouvernance' | 'controle' | 'sanction';
  echeance: string;
  description: string;
  sanction: string;
}

export function mockExtractObligations(textId: string): ExtractedObligation[] {
  const textObligations: Record<string, ExtractedObligation[]> = {
    'bceao-instr-011-2016': [
      { article: 'Art. 12', type: 'prudentielle', echeance: 'Permanent', description: 'Ratio de solvabilité minimum de 9,5% (Tier 1 ≥ 7,5%, Tier 2 ≤ 2%)', sanction: 'Mise en demeure, restriction d\'activité' },
      { article: 'Art. 28', type: 'declarative', echeance: 'Trimestriel (J+30)', description: 'Déclaration des grands risques (>10% FPN) à la Commission Bancaire', sanction: 'Pénalité 5-50M FCFA' },
      { article: 'Art. 35', type: 'prudentielle', echeance: 'Permanent', description: 'Ratio de liquidité minimum 100% (actifs liquides / passifs exigibles à ≤ 1 mois)', sanction: 'Mise en demeure sous 30 jours' },
      { article: 'Art. 42', type: 'declarative', echeance: 'Annuel (31 mars)', description: 'Rapport annuel LBC/FT : statistiques, formations, incidents', sanction: 'Pénalité 5-50M FCFA' },
      { article: 'Art. 48', type: 'controle', echeance: 'Annuel', description: 'Audit externe annuel du dispositif de contrôle interne', sanction: 'Injonction de la Commission Bancaire' },
      { article: 'Art. 52', type: 'gouvernance', echeance: 'Permanent', description: 'Séparation des fonctions de Président du CA et Directeur Général', sanction: 'Non-conformité, observation au rapport d\'inspection' },
    ],
    'cobac-r-2018-01': [
      { article: 'Art. 15', type: 'declarative', echeance: 'Continu', description: 'Vigilance constante — identification et vérification du client avant entrée en relation d\'affaires', sanction: 'Suspension d\'agrément possible' },
      { article: 'Art. 22', type: 'declarative', echeance: 'Continu', description: 'Vigilance renforcée pour les PPE, pays à haut risque, opérations complexes', sanction: 'Amende 10-100M FCFA' },
      { article: 'Art. 28', type: 'declarative', echeance: 'Immédiate', description: 'Déclaration de soupçon à l\'ANIF dans les 24h suivant la détection', sanction: 'Sanction pénale + administrative' },
      { article: 'Art. 39', type: 'controle', echeance: 'Annuel', description: 'Formation obligatoire de tout le personnel sur la LBC/FT — programme documenté', sanction: 'Observation au rapport d\'inspection' },
      { article: 'Art. 42', type: 'declarative', echeance: 'Annuel (31 mars)', description: 'Rapport annuel LBC/FT transmis à la COBAC et à l\'ANIF', sanction: 'Pénalité 5-50M FCFA' },
      { article: 'Art. 49', type: 'controle', echeance: 'Permanent', description: 'Conservation des documents LBC/FT pendant 10 ans minimum après la fin de la relation', sanction: 'Sanction administrative' },
    ],
    'cima-code-l5': [
      { article: 'Art. 310', type: 'declarative', echeance: 'Annuel (30 juin N+1)', description: 'Transmission des états financiers annuels certifiés à la CIMA', sanction: 'Pénalité 5-20M FCFA' },
      { article: 'Art. 312', type: 'declarative', echeance: 'Trimestriel (J+45)', description: 'Transmission des états C1-C20 (reporting prudentiel trimestriel)', sanction: 'Pénalité 5-20M FCFA' },
      { article: 'Art. 335', type: 'prudentielle', echeance: 'Permanent', description: 'Marge de solvabilité — couverture permanente des engagements réglementés', sanction: 'Plan de redressement sous 3 mois' },
      { article: 'Art. 341', type: 'prudentielle', echeance: 'Permanent', description: 'Représentation des engagements réglementés par des actifs autorisés (liste limitative)', sanction: 'Injonction de régularisation' },
      { article: 'Art. 342', type: 'declarative', echeance: 'Annuel (31 mars)', description: 'Rapport ORSA (Own Risk and Solvency Assessment)', sanction: 'Observation au rapport de contrôle' },
      { article: 'Art. 360', type: 'declarative', echeance: 'Immédiate', description: 'Déclaration de soupçon LBC/FT à la CIMA et à la CRF nationale', sanction: 'Sanction disciplinaire' },
    ],
  };

  return textObligations[textId] || textObligations['bceao-instr-011-2016'];
}

export const nlpTextReferences = [
  { id: 'bceao-instr-011-2016', label: 'Instruction BCEAO n° 011-12-2016/RB — Dispositif Prudentiel UMOA', regulator: 'BCEAO', obligations: 6 },
  { id: 'cobac-r-2018-01', label: 'Règlement COBAC R-2018/01 — LBC/FT', regulator: 'COBAC', obligations: 6 },
  { id: 'cima-code-l5', label: 'Code CIMA — Livre V Surveillance des Assurances', regulator: 'CIMA', obligations: 6 },
];





