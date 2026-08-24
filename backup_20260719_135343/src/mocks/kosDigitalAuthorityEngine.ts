// KOS Digital Authority Engine™ — Mock Data
// 5 Centres d'Excellence · Référentiels · Méthodologies · Frameworks Propriétaires
// Backlinks Institutionnels · Citations Académiques · Partenariats · KPIs Big Four

// ============================================================
// CENTRES D'EXCELLENCE — 5 Domaines Réglementaires
// ============================================================

export interface Referentiel {
  id: string;
  nom: string;
  description: string;
  version: string;
  date_publication: string;
  pages: number;
  telechargements: number;
  citations: number;
  statut: 'Publié' | 'En révision' | 'En développement';
  score_qualite: number;
}

export interface Methodologie {
  id: string;
  nom: string;
  description: string;
  application: string;
  etapes: number;
  outils: string[];
  cas_usage: string[];
  score_maturite: number;
}

export interface FrameworkProprietaire {
  id: string;
  nom: string;
  acronyme: string;
  description: string;
  composants: string[];
  adoption: number;
  statut: 'Déployé' | 'En déploiement' | 'En conception';
  score_innovation: number;
}

export interface CentreExcellence {
  id: string;
  nom: string;
  acronyme: string;
  description: string;
  icon: string;
  couleur: 'primary' | 'accent' | 'secondary';
  referentiels: Referentiel[];
  methodologies: Methodologie[];
  frameworks: FrameworkProprietaire[];
  stats: {
    total_publications: number;
    total_telechargements: number;
    total_citations: number;
    couverture_reglementaire: number;
    score_autorite: number;
  };
}

export const centresExcellence: CentreExcellence[] = [
  // ============================================================
  // CENTRE 1 : BCEAO
  // ============================================================
  {
    id: 'coe-bceao',
    nom: 'Centre d\'Excellence BCEAO',
    acronyme: 'CE-BCEAO',
    description: 'Référentiels, méthodologies et frameworks propriétaires sur la régulation bancaire, la supervision prudentielle et la conformité réglementaire dans l\'espace UEMOA. Couvre les circulaires, instructions, décisions et avis de la BCEAO applicables aux banques, SFD et établissements financiers.',
    icon: 'ri-bank-line',
    couleur: 'primary',
    referentiels: [
      {
        id: 'ref-bceao-001',
        nom: 'Référentiel Conformité Bancaire UEMOA — BCEAO 2026',
        description: 'Compilation exhaustive de l\'ensemble des textes BCEAO applicables aux banques : ratios prudentiels, gouvernance, contrôle interne, LBC/FT, reporting. 48 textes consolidés, 156 obligations tracées.',
        version: 'v3.2',
        date_publication: '2026-05-15',
        pages: 285,
        telechargements: 2340,
        citations: 67,
        statut: 'Publié',
        score_qualite: 9.6,
      },
      {
        id: 'ref-bceao-002',
        nom: 'Référentiel Conformité SFD — 22 Instructions BCEAO',
        description: 'Catalogue structuré des 22 instructions BCEAO applicables aux Systèmes Financiers Décentralisés : agrément, gouvernance, reporting, fonds propres, LBC/FT. 89 obligations tracées avec matrices de conformité.',
        version: 'v2.8',
        date_publication: '2026-04-20',
        pages: 178,
        telechargements: 1850,
        citations: 42,
        statut: 'Publié',
        score_qualite: 9.4,
      },
      {
        id: 'ref-bceao-003',
        nom: 'Référentiel Reporting prudentiel BCEAO — États périodiques',
        description: 'Guide complet des obligations de reporting : SURFI, BILAN, DEC, RAPRO, états statistiques. Calendrier, formats, contrôles de cohérence, checklist de validation.',
        version: 'v1.5',
        date_publication: '2026-03-10',
        pages: 142,
        telechargements: 1560,
        citations: 28,
        statut: 'Publié',
        score_qualite: 9.2,
      },
      {
        id: 'ref-bceao-004',
        nom: 'Référentiel Bâle III UEMOA — Transposition et impacts',
        description: 'Analyse détaillée de la transposition de Bâle III dans la réglementation BCEAO : ratio de solvabilité, LCR, NSFR, levier, coussins de fonds propres. Impact par pilier.',
        version: 'v2.0',
        date_publication: '2026-06-01',
        pages: 210,
        telechargements: 980,
        citations: 34,
        statut: 'Publié',
        score_qualite: 9.5,
      },
    ],
    methodologies: [
      {
        id: 'meth-bceao-001',
        nom: 'Méthodologie Pré-Inspection BCEAO — Préparation & Simulation',
        description: 'Méthodologie en 6 phases pour préparer une institution financière à une mission d\'inspection BCEAO : diagnostic initial, gap analysis, remédiation, simulation, accompagnement, suivi post-inspection.',
        application: 'Banques, SFD, Établissements financiers UEMOA',
        etapes: 6,
        outils: ['Matrice de gaps', 'Simulateur d\'inspection', 'Checklist 360°', 'Générateur de preuves'],
        cas_usage: ['Banque commerciale — 98% conformité post-mission', 'SFD — Certification sans réserve', 'Établissement de paiement — Agrément accéléré'],
        score_maturite: 9.5,
      },
      {
        id: 'meth-bceao-002',
        nom: 'Méthodologie Audit ICAAP/ILAAP — Pilier 2 BCEAO',
        description: 'Cadre méthodologique pour l\'évaluation de l\'adéquation du capital interne (ICAAP) et de la liquidité (ILAAP) conforme aux exigences du Pilier 2 BCEAO.',
        application: 'Banques UEMOA',
        etapes: 5,
        outils: ['Modèle ICAAP', 'Stress test engine', 'Matrice risques', 'Rapport-type'],
        cas_usage: ['Banque panafricaine — Validation ICAAP 2025', 'Filiale bancaire — ILAAP conforme'],
        score_maturite: 9.2,
      },
      {
        id: 'meth-bceao-003',
        nom: 'Méthodologie Due Diligence LBC/FT — Conformité GAFI-BCEAO',
        description: 'Méthodologie complète de due diligence LBC/FT alignée sur les 40 recommandations GAFI et la réglementation BCEAO : KYC, transaction monitoring, déclaration de soupçon, gel des avoirs.',
        application: 'Banques, SFD, Fintech, Assurances UEMOA',
        etapes: 8,
        outils: ['Matrice conformité 40+11', 'Générateur procédures', 'Modèle évaluation risques'],
        cas_usage: ['Banque — Remediation LBC/FT 12 mois', 'Fintech — Cadre LBC/FT from scratch'],
        score_maturite: 9.4,
      },
    ],
    frameworks: [
      {
        id: 'fw-bceao-001',
        nom: 'KHEPRA Compliance Framework™ — BCEAO',
        acronyme: 'KCF-BCEAO',
        description: 'Framework propriétaire de gestion de la conformité réglementaire BCEAO. Architecture modulaire couvrant l\'ensemble du cycle de vie réglementaire : veille, analyse d\'impact, implémentation, contrôle, reporting.',
        composants: ['Veille réglementaire automatisée', 'Matrice de conformité dynamique', 'Générateur de plans d\'action', 'Dashboard conformité temps réel', 'Module reporting régulateur'],
        adoption: 24,
        statut: 'Déployé',
        score_innovation: 9.6,
      },
      {
        id: 'fw-bceao-002',
        nom: 'KHEPRA Risk & Control Matrix™ — UEMOA',
        acronyme: 'KRCM-UEMOA',
        description: 'Matrice risques et contrôles alignée sur le dispositif prudentiel BCEAO. Cartographie des risques, contrôles clés, évaluation de l\'efficacité, plans de remédiation.',
        composants: ['Cartographie risques (12 catégories)', 'Bibliothèque contrôles (248 contrôles)', 'Évaluation RCS (Risk Control Self-Assessment)', 'Heat map risques résiduels', 'Tableau de bord risques'],
        adoption: 18,
        statut: 'Déployé',
        score_innovation: 9.3,
      },
    ],
    stats: {
      total_publications: 8,
      total_telechargements: 6730,
      total_citations: 171,
      couverture_reglementaire: 94,
      score_autorite: 92,
    },
  },

  // ============================================================
  // CENTRE 2 : OHADA
  // ============================================================
  {
    id: 'coe-ohada',
    nom: 'Centre d\'Excellence OHADA',
    acronyme: 'CE-OHADA',
    description: 'Référentiels, méthodologies et frameworks propriétaires sur le droit des affaires OHADA : Actes Uniformes, droit des sociétés, sûretés, procédures collectives, arbitrage, médiation. Couvre les 17 États membres OHADA.',
    icon: 'ri-scales-3-line',
    couleur: 'accent',
    referentiels: [
      {
        id: 'ref-ohada-001',
        nom: 'Référentiel Droit des Sociétés OHADA — AUSCGIE 2026',
        description: 'Analyse exhaustive de l\'Acte Uniforme relatif au Droit des Sociétés Commerciales et GIE révisé. 942 articles commentés, jurisprudence CCJA intégrée, modèles de statuts, checklists de conformité.',
        version: 'v4.1',
        date_publication: '2026-04-01',
        pages: 420,
        telechargements: 3120,
        citations: 89,
        statut: 'Publié',
        score_qualite: 9.7,
      },
      {
        id: 'ref-ohada-002',
        nom: 'Référentiel Sûretés OHADA — AUS 2026',
        description: 'Guide complet de l\'Acte Uniforme portant organisation des Sûretés révisé : sûretés personnelles, sûretés réelles mobilières et immobilières, registre des sûretés, formalités.',
        version: 'v3.0',
        date_publication: '2026-03-15',
        pages: 185,
        telechargements: 1680,
        citations: 45,
        statut: 'Publié',
        score_qualite: 9.4,
      },
      {
        id: 'ref-ohada-003',
        nom: 'Référentiel Procédures Collectives OHADA — AUPCAP 2026',
        description: 'Analyse de l\'Acte Uniforme portant organisation des Procédures Collectives d\'Apurement du Passif : prévention, règlement préventif, redressement judiciaire, liquidation des biens.',
        version: 'v2.5',
        date_publication: '2026-05-10',
        pages: 195,
        telechargements: 1240,
        citations: 31,
        statut: 'Publié',
        score_qualite: 9.3,
      },
    ],
    methodologies: [
      {
        id: 'meth-ohada-001',
        nom: 'Méthodologie Audit Juridique OHADA — Due Diligence Sociétés',
        description: 'Cadre méthodologique pour les audits juridiques de sociétés dans l\'espace OHADA : vérification statutaire, gouvernance, conventions réglementées, registres obligatoires, contentieux.',
        application: 'Sociétés commerciales, Groupes, Filiales OHADA',
        etapes: 7,
        outils: ['Checklist 120 points', 'Matrice risques juridiques', 'Générateur rapport audit'],
        cas_usage: ['Due diligence acquisition — 3 pays', 'Audit gouvernance groupe bancaire', 'Mise en conformité filiales'],
        score_maturite: 9.3,
      },
      {
        id: 'meth-ohada-002',
        nom: 'Méthodologie Constitution Société OHADA — Guide Pratique',
        description: 'Processus complet de constitution de société dans l\'espace OHADA : choix de la forme, rédaction statuts, formalités RCCM, immatriculation fiscale, CNSS, publication journal officiel.',
        application: 'SA, SARL, SAS, GIE — 17 États OHADA',
        etapes: 9,
        outils: ['Modèles statuts (6 formes)', 'Simulateur capital', 'Checklist formalités par pays'],
        cas_usage: ['Constitution SA — 48h', 'Transformation SARL en SA', 'Constitution SAS multi-pays'],
        score_maturite: 9.1,
      },
    ],
    frameworks: [
      {
        id: 'fw-ohada-001',
        nom: 'KHEPRA Corporate Governance Framework™ — OHADA',
        acronyme: 'KCGF-OHADA',
        description: 'Framework propriétaire de gouvernance d\'entreprise aligné sur l\'AUSCGIE OHADA et les meilleures pratiques internationales (OCDE, G20). Structure de gouvernance, comités spécialisés, évaluation du board.',
        composants: ['Architecture gouvernance cible', 'Charte board & comités', 'Matrice délégations pouvoirs', 'Évaluation 360° administrateurs', 'Indicateurs gouvernance'],
        adoption: 15,
        statut: 'Déployé',
        score_innovation: 9.4,
      },
    ],
    stats: {
      total_publications: 6,
      total_telechargements: 6040,
      total_citations: 165,
      couverture_reglementaire: 88,
      score_autorite: 89,
    },
  },

  // ============================================================
  // CENTRE 3 : GOUVERNANCE
  // ============================================================
  {
    id: 'coe-gouvernance',
    nom: 'Centre d\'Excellence Gouvernance',
    acronyme: 'CE-GOUV',
    description: 'Référentiels, méthodologies et frameworks propriétaires sur la gouvernance d\'entreprise, le contrôle interne, la gestion des risques et la conformité. Aligné sur COSO, ISO 37000, G20/OCDE et les circulaires BCEAO/COBAC.',
    icon: 'ri-government-line',
    couleur: 'secondary',
    referentiels: [
      {
        id: 'ref-gouv-001',
        nom: 'Référentiel Gouvernance Bancaire UEMOA — Circulaires 01-2017 & 02-2017',
        description: 'Analyse approfondie des circulaires BCEAO sur la gouvernance des établissements de crédit : composition du CA, comités spécialisés, indépendance, cumul de mandats, évaluation, lanceurs d\'alerte.',
        version: 'v3.0',
        date_publication: '2026-02-20',
        pages: 165,
        telechargements: 2100,
        citations: 52,
        statut: 'Publié',
        score_qualite: 9.5,
      },
      {
        id: 'ref-gouv-002',
        nom: 'Référentiel COSO 2013 — Implémentation Afrique Francophone',
        description: 'Guide d\'implémentation du COSO Internal Control — Integrated Framework (2013) adapté au contexte africain francophone : 17 principes, 87 points de focus, exemples pratiques.',
        version: 'v2.1',
        date_publication: '2026-01-15',
        pages: 230,
        telechargements: 1980,
        citations: 41,
        statut: 'Publié',
        score_qualite: 9.3,
      },
      {
        id: 'ref-gouv-003',
        nom: 'Référentiel ISO 37000 — Gouvernance des Organismes',
        description: 'Guide de mise en œuvre de la norme ISO 37000:2021 — Gouvernance des organismes : principes, pratiques, indicateurs. Adapté PME, ETI, grands groupes.',
        version: 'v1.5',
        date_publication: '2026-04-10',
        pages: 142,
        telechargements: 1250,
        citations: 22,
        statut: 'Publié',
        score_qualite: 9.1,
      },
    ],
    methodologies: [
      {
        id: 'meth-gouv-001',
        nom: 'Méthodologie Diagnostic Gouvernance 360°',
        description: 'Évaluation complète de la gouvernance d\'entreprise : board, comités, contrôle interne, gestion des risques, conformité, audit interne. Score sur 100 avec benchmark sectoriel.',
        application: 'Banques, SFD, PME, Grandes Entreprises',
        etapes: 5,
        outils: ['Questionnaire 360° (180 questions)', 'Matrice maturité gouvernance', 'Benchmark sectoriel', 'Roadmap amélioration'],
        cas_usage: ['Banque — Passage score 42 à 87/100', 'SFD — Diagnostic pré-agrément', 'PME — Structuration board'],
        score_maturite: 9.4,
      },
      {
        id: 'meth-gouv-002',
        nom: 'Méthodologie Mise en Place Contrôle Interne — COSO',
        description: 'Méthodologie structurée de conception et déploiement du dispositif de contrôle interne selon COSO 2013 : environnement de contrôle, évaluation des risques, activités de contrôle, information & communication, pilotage.',
        application: 'Toutes organisations',
        etapes: 6,
        outils: ['Cartographie processus', 'Matrice risques-contrôles', 'Générateur manuel CI', 'Plan de tests'],
        cas_usage: ['Établissement financier — CI from scratch', 'Industrie — Remediation CI'],
        score_maturite: 9.2,
      },
    ],
    frameworks: [
      {
        id: 'fw-gouv-001',
        nom: 'KHEPRA Governance Excellence Model™',
        acronyme: 'KGEM',
        description: 'Modèle d\'excellence en gouvernance développé par KHEPRA. 5 piliers, 25 principes, 100 indicateurs. Framework d\'évaluation et d\'amélioration continue de la gouvernance.',
        composants: ['Évaluation maturité (5 niveaux)', 'Roadmap transformation', 'Tableau de bord gouvernance', 'Best practices library', 'Certification KGEM'],
        adoption: 12,
        statut: 'Déployé',
        score_innovation: 9.5,
      },
    ],
    stats: {
      total_publications: 6,
      total_telechargements: 5330,
      total_citations: 115,
      couverture_reglementaire: 91,
      score_autorite: 90,
    },
  },

  // ============================================================
  // CENTRE 4 : FINTECH
  // ============================================================
  {
    id: 'coe-fintech',
    nom: 'Centre d\'Excellence FinTech',
    acronyme: 'CE-FINTECH',
    description: 'Référentiels, méthodologies et frameworks propriétaires sur la régulation FinTech en Afrique francophone : agrément établissement de paiement, mobile money, open banking, cryptomonnaies, sandbox réglementaire.',
    icon: 'ri-smartphone-line',
    couleur: 'primary',
    referentiels: [
      {
        id: 'ref-fintech-001',
        nom: 'Référentiel Régulation FinTech UEMOA — 2026-2027',
        description: 'Analyse complète du cadre réglementaire FinTech UEMOA : instruction BCEAO établissement de paiement, directive services financiers numériques, sandbox, interoperability, data protection.',
        version: 'v2.0',
        date_publication: '2026-05-01',
        pages: 198,
        telechargements: 2890,
        citations: 56,
        statut: 'Publié',
        score_qualite: 9.5,
      },
      {
        id: 'ref-fintech-002',
        nom: 'Référentiel Agrément Établissement de Paiement — BCEAO',
        description: 'Guide pas-à-pas du processus d\'agrément d\'un établissement de paiement auprès de la BCEAO : dossier type, business plan, programme d\'activité, infrastructure technique, capital minimum.',
        version: 'v1.8',
        date_publication: '2026-04-25',
        pages: 156,
        telechargements: 2240,
        citations: 38,
        statut: 'Publié',
        score_qualite: 9.6,
      },
    ],
    methodologies: [
      {
        id: 'meth-fintech-001',
        nom: 'Méthodologie Montage Dossier Agrément Établissement de Paiement',
        description: 'Processus complet de préparation du dossier d\'agrément : due diligence préalable, business plan réglementaire, programme d\'activité, infrastructure technique, capital, conformité.',
        application: 'Fintech, Telco, Banques — UEMOA',
        etapes: 8,
        outils: ['Modèle Business Plan réglementaire', 'Checklist dossier agrément', 'Modèle programme activité', 'Simulateur capital'],
        cas_usage: ['Fintech — Agrément en 9 mois', 'Telco — Licence établissement paiement', 'Startup — Passage sandbox → agrément'],
        score_maturite: 9.3,
      },
    ],
    frameworks: [
      {
        id: 'fw-fintech-001',
        nom: 'KHEPRA FinTech Compliance Stack™',
        acronyme: 'KFCS',
        description: 'Stack de conformité modulaire pour FinTechs : KYC/AML digital, transaction monitoring, reporting réglementaire, data privacy. Conçu pour l\'agilité des startups avec la rigueur réglementaire.',
        composants: ['KYC Digital (e-KYC)', 'Transaction Monitoring AI', 'Reporting Régulateur Auto', 'Data Privacy Toolkit', 'API Conformité'],
        adoption: 8,
        statut: 'En déploiement',
        score_innovation: 9.7,
      },
    ],
    stats: {
      total_publications: 4,
      total_telechargements: 5130,
      total_citations: 94,
      couverture_reglementaire: 82,
      score_autorite: 87,
    },
  },

  // ============================================================
  // CENTRE 5 : SFD
  // ============================================================
  {
    id: 'coe-sfd',
    nom: 'Centre d\'Excellence SFD & Inclusion Financière',
    acronyme: 'CE-SFD',
    description: 'Référentiels, méthodologies et frameworks propriétaires sur la microfinance et l\'inclusion financière en zone UEMOA : régulation SFD, gouvernance, gestion des risques, digitalisation, inclusion financière.',
    icon: 'ri-hand-heart-line',
    couleur: 'accent',
    referentiels: [
      {
        id: 'ref-sfd-001',
        nom: 'Référentiel Microfinance UEMOA — 22 Instructions BCEAO',
        description: 'Compilation et analyse des 22 instructions BCEAO applicables aux SFD : agrément, gouvernance, fonds propres, normes de gestion, reporting, LBC/FT, contrôle interne. Matrice de conformité intégrée.',
        version: 'v3.5',
        date_publication: '2026-05-20',
        pages: 245,
        telechargements: 3120,
        citations: 78,
        statut: 'Publié',
        score_qualite: 9.7,
      },
      {
        id: 'ref-sfd-002',
        nom: 'Référentiel Inclusion Financière UEMOA — Stratégie Régionale',
        description: 'Analyse de la stratégie régionale d\'inclusion financière UEMOA : indicateurs, cibles, mécanismes, coordination. Benchmark pays UEMOA, bonnes pratiques internationales.',
        version: 'v2.0',
        date_publication: '2026-03-30',
        pages: 168,
        telechargements: 2150,
        citations: 45,
        statut: 'Publié',
        score_qualite: 9.4,
      },
    ],
    methodologies: [
      {
        id: 'meth-sfd-001',
        nom: 'Méthodologie Diagnostic Conformité SFD — BCEAO',
        description: 'Diagnostic complet de conformité SFD couvrant l\'ensemble du dispositif réglementaire BCEAO : 22 instructions, 89 obligations, scoring automatisé, plan de remédiation priorisé.',
        application: 'SFD de base, SFD intermédiaires, Faîtières',
        etapes: 5,
        outils: ['Matrice 89 obligations', 'Scoring automatique', 'Plan remédiation', 'Dashboard conformité'],
        cas_usage: ['Réseau SFD — Passage score 38 à 94/100', 'SFD individuel — Mise en conformité 6 mois', 'Faîtière — Diagnostic 150 caisses'],
        score_maturite: 9.6,
      },
      {
        id: 'meth-sfd-002',
        nom: 'Méthodologie Transformation Digitale SFD',
        description: 'Cadre méthodologique pour la digitalisation des SFD : diagnostic maturité digitale, architecture cible, choix solutions, gestion du changement, accompagnement terrain.',
        application: 'SFD — UEMOA, CEMAC',
        etapes: 6,
        outils: ['Diagnostic maturité digitale', 'Matrice solutions Core Banking', 'Plan déploiement', 'KPIs transformation'],
        cas_usage: ['Réseau 80 caisses — Digitalisation 18 mois', 'SFD — Migration CBS'],
        score_maturite: 9.1,
      },
    ],
    frameworks: [
      {
        id: 'fw-sfd-001',
        nom: 'KHEPRA SFD Excellence Framework™',
        acronyme: 'KSEF',
        description: 'Framework intégré d\'excellence opérationnelle pour SFD : gouvernance, gestion des risques, performance sociale, performance financière, conformité. 5 piliers, 20 dimensions, 120 indicateurs.',
        composants: ['Gouvernance SFD', 'Gestion risques', 'Performance sociale (SPI4)', 'Performance financière', 'Conformité réglementaire'],
        adoption: 22,
        statut: 'Déployé',
        score_innovation: 9.5,
      },
    ],
    stats: {
      total_publications: 5,
      total_telechargements: 5270,
      total_citations: 123,
      couverture_reglementaire: 96,
      score_autorite: 93,
    },
  },
];

// ============================================================
// BACKLINKS INSTITUTIONNELS
// ============================================================
export interface BacklinkInstitutionnel {
  id: string;
  source: string;
  domaine: string;
  type: 'gouvernement' | 'education' | 'organisation' | 'regulateur' | 'media';
  url: string;
  anchor_text: string;
  domain_authority: number;
  dofollow: boolean;
  date_detection: string;
  page_cible: string;
  statut: 'Actif' | 'Perdu' | 'En attente';
}

export const backlinksInstitutionnels: BacklinkInstitutionnel[] = [
  { id: 'bl-001', source: 'BCEAO — Publication officielle', domaine: 'bceao.int', type: 'regulateur', url: 'https://www.bceao.int/fr/publications/etudes', anchor_text: 'KHEPRA EXPERTS — Étude impact Bâle III', domain_authority: 78, dofollow: true, date_detection: '2026-05-20', page_cible: '/guide-bceao-2026', statut: 'Actif' },
  { id: 'bl-002', source: 'OHADA — Base de données doctrinale', domaine: 'ohada.org', type: 'organisation', url: 'https://www.ohada.org/doctrine', anchor_text: 'Analyse AUSCGIE révisé — KHEPRA EXPERTS', domain_authority: 72, dofollow: true, date_detection: '2026-04-15', page_cible: '/gouvernance-ohada', statut: 'Actif' },
  { id: 'bl-003', source: 'Commission UEMOA — Bibliothèque', domaine: 'uemoa.int', type: 'organisation', url: 'https://www.uemoa.int/bibliotheque', anchor_text: 'Rapport Convergence Réglementaire — KHEPRA', domain_authority: 74, dofollow: true, date_detection: '2026-05-10', page_cible: '/regions/uemoa-cemac', statut: 'Actif' },
  { id: 'bl-004', source: 'Banque Mondiale — Documents & Reports', domaine: 'worldbank.org', type: 'organisation', url: 'https://documents.worldbank.org/', anchor_text: 'Microfinance regulation UEMOA — KHEPRA study', domain_authority: 92, dofollow: true, date_detection: '2026-06-01', page_cible: '/industries/microfinance', statut: 'Actif' },
  { id: 'bl-005', source: 'FMI — eLibrary', domaine: 'imf.org', type: 'organisation', url: 'https://www.imf.org/en/Publications', anchor_text: 'Financial stability UEMOA — KHEPRA contribution', domain_authority: 93, dofollow: true, date_detection: '2026-05-25', page_cible: '/guide-gouvernance-imf', statut: 'Actif' },
  { id: 'bl-006', source: 'Gouvernement Côte d\'Ivoire — Ministère Finances', domaine: 'finances.gouv.ci', type: 'gouvernement', url: 'https://www.finances.gouv.ci/', anchor_text: 'Étude gouvernance fiscale — KHEPRA EXPERTS', domain_authority: 65, dofollow: true, date_detection: '2026-04-28', page_cible: '/prix-de-transfert', statut: 'Actif' },
  { id: 'bl-007', source: 'Gouvernement Sénégal — Ministère Économie', domaine: 'economie.gouv.sn', type: 'gouvernement', url: 'https://www.economie.gouv.sn/', anchor_text: 'Rapport inclusion financière — KHEPRA', domain_authority: 62, dofollow: true, date_detection: '2026-05-05', page_cible: '/sfd-conformite', statut: 'Actif' },
  { id: 'bl-008', source: 'BAD — Publications', domaine: 'afdb.org', type: 'organisation', url: 'https://www.afdb.org/fr/documents', anchor_text: 'FinTech regulation — KHEPRA EXPERTS analysis', domain_authority: 85, dofollow: true, date_detection: '2026-05-18', page_cible: '/industries/fintech', statut: 'Actif' },
  { id: 'bl-009', source: 'Université Cheikh Anta Diop — Publication', domaine: 'ucad.edu.sn', type: 'education', url: 'https://www.ucad.sn/', anchor_text: 'Référence : KHEPRA EXPERTS — OHADA analysis', domain_authority: 68, dofollow: true, date_detection: '2026-04-08', page_cible: '/ohada', statut: 'Actif' },
  { id: 'bl-010', source: 'Université Félix Houphouët-Boigny', domaine: 'ufhb.edu.ci', type: 'education', url: 'https://www.ufhb.edu.ci/', anchor_text: 'Source : Baromètre Conformité 2026 — KHEPRA', domain_authority: 63, dofollow: false, date_detection: '2026-05-30', page_cible: '/barometre-bceao-2026', statut: 'Actif' },
  { id: 'bl-011', source: 'COBAC — Espace documentation', domaine: 'cobac.cm', type: 'regulateur', url: 'https://www.cobac.cm/', anchor_text: 'Guide supervision bancaire — KHEPRA EXPERTS', domain_authority: 58, dofollow: true, date_detection: '2026-05-12', page_cible: '/conformite-cemac', statut: 'Actif' },
  { id: 'bl-012', source: 'GAFI — Références', domaine: 'fatf-gafi.org', type: 'organisation', url: 'https://www.fatf-gafi.org/', anchor_text: 'LBC/FT implementation — KHEPRA case study', domain_authority: 88, dofollow: true, date_detection: '2026-06-05', page_cible: '/gafi', statut: 'En attente' },
  { id: 'bl-013', source: 'AFD — Centre de ressources', domaine: 'afd.fr', type: 'organisation', url: 'https://www.afd.fr/fr/ressources', anchor_text: 'Étude SFD UEMOA — KHEPRA EXPERTS', domain_authority: 81, dofollow: true, date_detection: '2026-04-20', page_cible: '/industries/microfinance', statut: 'Actif' },
  { id: 'bl-014', source: 'CESAG — Centre Africain d\'Études Supérieures', domaine: 'cesag.edu.sn', type: 'education', url: 'https://www.cesag.edu.sn/', anchor_text: 'Référence académique — KHEPRA EXPERTS', domain_authority: 55, dofollow: false, date_detection: '2026-03-15', page_cible: '/publications', statut: 'Actif' },
  { id: 'bl-015', source: 'PNUD — Africa Knowledge Hub', domaine: 'undp.org', type: 'organisation', url: 'https://www.undp.org/africa', anchor_text: 'Financial governance — KHEPRA advisory', domain_authority: 90, dofollow: true, date_detection: '2026-06-08', page_cible: '/regions/afrique', statut: 'Actif' },
  { id: 'bl-016', source: 'Ministère Économie Burkina Faso', domaine: 'finances.gov.bf', type: 'gouvernement', url: 'https://www.finances.gov.bf/', anchor_text: 'Diagnostic gouvernance — KHEPRA EXPERTS', domain_authority: 58, dofollow: true, date_detection: '2026-04-12', page_cible: '/gouvernance-risques', statut: 'Actif' },
];

// ============================================================
// CITATIONS ACADÉMIQUES
// ============================================================
export interface CitationAcademique {
  id: string;
  titre: string;
  auteurs: string;
  publication: string;
  type: 'Article' | 'Thèse' | 'Mémoire' | 'Working Paper' | 'Rapport';
  institution: string;
  date: string;
  citations_count: number;
  domaine: string;
  lien: string;
}

export const citationsAcademiques: CitationAcademique[] = [
  { id: 'cit-001', titre: 'Régulation bancaire et inclusion financière : analyse du cadre UEMOA', auteurs: 'Dr. A. Ndiaye, Pr. M. Sow', publication: 'Revue Africaine de Droit Bancaire', type: 'Article', institution: 'Université Cheikh Anta Diop', date: '2026-03', citations_count: 12, domaine: 'BCEAO', lien: 'https://scholar.google.com/' },
  { id: 'cit-002', titre: 'L\'impact de Bâle III sur les banques africaines : une analyse comparative UEMOA-CEMAC', auteurs: 'Dr. K. Mensah', publication: 'Journal of Banking Regulation', type: 'Article', institution: 'CESAG Dakar', date: '2026-02', citations_count: 8, domaine: 'BCEAO', lien: 'https://scholar.google.com/' },
  { id: 'cit-003', titre: 'Gouvernance des entreprises familiales dans l\'espace OHADA : pratiques et perspectives', auteurs: 'Pr. F. Koné, Dr. C. Traoré', publication: 'Revue OHADA de Droit des Affaires', type: 'Article', institution: 'Université Félix Houphouët-Boigny', date: '2026-04', citations_count: 6, domaine: 'OHADA', lien: 'https://scholar.google.com/' },
  { id: 'cit-004', titre: 'L\'efficacité des mécanismes de contrôle interne dans les SFD : cas de l\'UEMOA', auteurs: 'Dr. R. Ouédraogo', publication: 'Thèse de Doctorat', type: 'Thèse', institution: 'Université Ouaga II', date: '2026-01', citations_count: 3, domaine: 'SFD', lien: 'https://scholar.google.com/' },
  { id: 'cit-005', titre: 'FinTech et régulation en Afrique : le défi de l\'innovation responsable', auteurs: 'Pr. A. Diallo, Dr. S. Barry', publication: 'African Journal of Innovation & Technology', type: 'Article', institution: 'Université Gaston Berger', date: '2026-05', citations_count: 15, domaine: 'FinTech', lien: 'https://scholar.google.com/' },
  { id: 'cit-006', titre: 'Conformité LBC/FT dans les institutions financières africaines : défis et solutions', auteurs: 'Dr. L. Tchana', publication: 'Cahiers de la Finance Islamique et Régulation', type: 'Article', institution: 'Université de Douala', date: '2026-03', citations_count: 9, domaine: 'Gouvernance', lien: 'https://scholar.google.com/' },
  { id: 'cit-007', titre: 'Le dispositif prudentiel des SFD en zone UEMOA : analyse critique et propositions', auteurs: 'Dr. H. Zongo', publication: 'Mémoire de Master Recherche', type: 'Mémoire', institution: 'Université de Lomé', date: '2026-02', citations_count: 2, domaine: 'SFD', lien: 'https://scholar.google.com/' },
  { id: 'cit-008', titre: 'Digitalisation des services financiers et inclusion : quelles leçons pour l\'Afrique ?', auteurs: 'Pr. N. Fall, Dr. B. Kane', publication: 'Revue Internationale de Développement', type: 'Article', institution: 'Université Gaston Berger', date: '2026-04', citations_count: 11, domaine: 'FinTech', lien: 'https://scholar.google.com/' },
  { id: 'cit-009', titre: 'L\'Acte Uniforme OHADA sur les sociétés commerciales : 10 ans de révision, quel bilan ?', auteurs: 'Pr. Y. Kouassi', publication: 'Penant — Revue de Droit Africain', type: 'Article', institution: 'Université Félix Houphouët-Boigny', date: '2026-01', citations_count: 7, domaine: 'OHADA', lien: 'https://scholar.google.com/' },
  { id: 'cit-010', titre: 'Cyber-résilience des banques africaines face aux exigences réglementaires émergentes', auteurs: 'Dr. P. Ekomie', publication: 'Working Paper Series', type: 'Working Paper', institution: 'BEAC — Centre de Recherche', date: '2026-05', citations_count: 4, domaine: 'Gouvernance', lien: 'https://scholar.google.com/' },
  { id: 'cit-011', titre: 'Prix de transfert en Afrique subsaharienne : enjeux et perspectives post-BEPS', auteurs: 'Dr. T. Gakou', publication: 'Revue de Droit Fiscal Africain', type: 'Article', institution: 'Université Cheikh Anta Diop', date: '2026-02', citations_count: 5, domaine: 'Gouvernance', lien: 'https://scholar.google.com/' },
  { id: 'cit-012', titre: 'Microfinance et performance sociale : évaluation SPI4 des SFD UEMOA', auteurs: 'Pr. R. Bamba, Dr. K. Sidibé', publication: 'Journal of Microfinance & Development', type: 'Article', institution: 'Université de Bamako', date: '2026-03', citations_count: 10, domaine: 'SFD', lien: 'https://scholar.google.com/' },
];

// ============================================================
// PARTENARIATS
// ============================================================
export interface Partenariat {
  id: string;
  organisation: string;
  type: 'MoU' | 'Consortium' | 'Alliance' | 'Accréditation' | 'Panel' | 'Collaboration';
  description: string;
  date_signature: string;
  duree: string;
  portee: 'Régionale' | 'Nationale' | 'Internationale' | 'Panafricaine';
  statut: 'Actif' | 'En négociation' | 'Renouvellement' | 'Signé';
  valeur_strategique: number;
  domaines: string[];
}

export const partenariats: Partenariat[] = [
  { id: 'part-001', organisation: 'BCEAO — Panel Auditeurs Externes', type: 'Panel', description: 'Accréditation au panel des auditeurs externes agréés par la BCEAO pour les missions de pré-inspection et d\'audit des établissements de crédit UEMOA.', date_signature: '2025-03-15', duree: '3 ans renouvelable', portee: 'Régionale', statut: 'Actif', valeur_strategique: 98, domaines: ['BCEAO', 'Audit bancaire', 'Pré-inspection'] },
  { id: 'part-002', organisation: 'OHADA — Partenaire technique', type: 'Accréditation', description: 'Reconnaissance comme partenaire technique pour la diffusion et la formation sur les Actes Uniformes OHADA dans les États membres.', date_signature: '2024-11-20', duree: '5 ans', portee: 'Panafricaine', statut: 'Actif', valeur_strategique: 95, domaines: ['OHADA', 'Droit des affaires', 'Formation'] },
  { id: 'part-003', organisation: 'Université Cheikh Anta Diop — Collaboration recherche', type: 'MoU', description: 'Protocole d\'accord pour la collaboration en recherche sur la régulation financière, les échanges académiques et les publications conjointes.', date_signature: '2025-09-10', duree: '4 ans', portee: 'Nationale', statut: 'Actif', valeur_strategique: 85, domaines: ['Recherche', 'Publications', 'Gouvernance'] },
  { id: 'part-004', organisation: 'Groupe Ecobank — Partenaire conformité', type: 'Alliance', description: 'Partenariat stratégique pour le déploiement du KCF-BCEAO dans les filiales UEMOA du groupe, incluant formation et accompagnement.', date_signature: '2026-02-01', duree: '3 ans', portee: 'Régionale', statut: 'Actif', valeur_strategique: 92, domaines: ['BCEAO', 'Conformité', 'Gouvernance'] },
  { id: 'part-005', organisation: 'CESAG — Programme certifiant', type: 'MoU', description: 'Co-développement d\'un programme certifiant en régulation bancaire et conformité UEMOA, délivré conjointement.', date_signature: '2026-01-15', duree: '4 ans', portee: 'Régionale', statut: 'Actif', valeur_strategique: 88, domaines: ['Formation', 'BCEAO', 'Certification'] },
  { id: 'part-006', organisation: 'Fédération des SFD UEMOA — Partenaire technique', type: 'Collaboration', description: 'Accord de collaboration pour la diffusion du KSEF et l\'accompagnement des SFD membres dans leur mise en conformité BCEAO.', date_signature: '2026-04-22', duree: '3 ans', portee: 'Régionale', statut: 'Actif', valeur_strategique: 90, domaines: ['SFD', 'Conformité', 'Inclusion financière'] },
  { id: 'part-007', organisation: 'Banque Atlantique — Mission gouvernance', type: 'Alliance', description: 'Partenariat pour la refonte du dispositif de gouvernance groupe : board evaluation, comités spécialisés, chartes, formation administrateurs.', date_signature: '2025-06-10', duree: '2 ans', portee: 'Régionale', statut: 'Actif', valeur_strategique: 82, domaines: ['Gouvernance', 'COSO', 'Board Advisory'] },
  { id: 'part-008', organisation: 'CNC — Conseil National du Crédit Sénégal', type: 'Accréditation', description: 'Reconnaissance comme expert-conseil agréé pour les missions d\'audit et de conseil auprès des institutions financières sous supervision CNC.', date_signature: '2025-08-05', duree: '3 ans', portee: 'Nationale', statut: 'Actif', valeur_strategique: 75, domaines: ['Audit', 'Régulation', 'SFD'] },
  { id: 'part-009', organisation: 'Deloitte Afrique — Consortium projets BAD', type: 'Consortium', description: 'Accord de consortium pour répondre aux appels d\'offres BAD en gouvernance financière et développement institutionnel en Afrique de l\'Ouest.', date_signature: '2026-05-05', duree: '2 ans renouvelable', portee: 'Régionale', statut: 'Signé', valeur_strategique: 94, domaines: ['BAD', 'Gouvernance', 'Grands projets'] },
  { id: 'part-010', organisation: 'Orange Finances Mobiles — Conformité FinTech', type: 'Collaboration', description: 'Accompagnement stratégique pour la mise en conformité réglementaire des services financiers mobiles dans 8 pays UEMOA.', date_signature: '2026-06-01', duree: '18 mois', portee: 'Régionale', statut: 'Signé', valeur_strategique: 91, domaines: ['FinTech', 'Conformité', 'Mobile Money'] },
  { id: 'part-011', organisation: 'PNUD — Programme gouvernance Afrique', type: 'MoU', description: 'Partenariat pour le déploiement du KGEM dans les programmes de renforcement de la gouvernance des institutions publiques africaines.', date_signature: '2026-03-18', duree: '3 ans', portee: 'Panafricaine', statut: 'En négociation', valeur_strategique: 87, domaines: ['Gouvernance', 'Secteur public', 'KGEM'] },
  { id: 'part-012', organisation: 'GIZ — Programme PME Sahel', type: 'Collaboration', description: 'Partenariat pour le renforcement des capacités de gouvernance des PME sahéliennes via le diagnostic KGEM adapté PME.', date_signature: '2026-04-30', duree: '2 ans', portee: 'Régionale', statut: 'En négociation', valeur_strategique: 80, domaines: ['Gouvernance', 'PME', 'Formation'] },
];

// ============================================================
// KPIs — DIGITAL AUTHORITY ENGINE
// ============================================================
export const digitalAuthorityKPIs = {
  // Centres d'Excellence
  total_centres_excellence: 5,
  total_referentiels: 16,
  total_methodologies: 9,
  total_frameworks_proprietaires: 6,
  total_publications: 29,
  total_telechargements_cumules: 28500,
  total_citations_cumulees: 668,
  couverture_reglementaire_moyenne: 90.2,

  // Backlinks
  total_backlinks_institutionnels: 328,
  backlinks_gouvernement: 47,
  backlinks_education: 38,
  backlinks_regulateur: 52,
  backlinks_organisation: 156,
  backlinks_media: 35,
  domain_authority_moyen: 74.5,
  backlinks_dofollow: 276,
  backlinks_perdus_30j: 4,
  croissance_backlinks: '+22%',

  // Citations Académiques
  total_citations_academiques: 487,
  citations_google_scholar: 312,
  citations_researchgate: 89,
  citations_these: 45,
  citations_working_paper: 41,
  h_index_institutionnel: 18,
  croissance_citations: '+34%',

  // Partenariats
  total_partenariats: 45,
  partenariats_actifs: 34,
  partenariats_negociation: 7,
  partenariats_signes: 4,
  partenariats_mou: 15,
  partenariats_consortium: 6,
  partenariats_accreditation: 8,
  valeur_strategique_moyenne: 87.5,

  // Scores
  score_autorite_numerique: 88,
  score_autorite_institutionnelle: 86,
  score_confiance_numerique: 84,
  score_eeat_global: 82,
  indice_visibilite_institutionnelle: 85,

  // Cibles
  target_referentiels: 25,
  target_methodologies: 15,
  target_frameworks: 10,
  target_backlinks: 500,
  target_citations: 1000,
  target_partenariats: 60,
  target_score_autorite: 95,
};



