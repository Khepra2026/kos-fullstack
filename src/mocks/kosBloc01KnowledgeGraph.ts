// KOS Bloc 01 — KHEPRA Knowledge Graph™
// Master Plan Big Four 2026-2028 — Phase 1 Fondations

export interface KGSource {
  id: string;
  nom: string;
  type: 'regulateur' | 'international' | 'developpement' | 'standard';
  documents_indexes: number;
  couverture: number;
  derniere_sync: string;
  frequence: string;
  icon: string;
  description: string;
}

export interface KGAgent {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  actions_24h: number;
  documents_traites: number;
  precision: number;
  icon: string;
  taches: string[];
}

export interface KGDocument {
  id: string;
  titre: string;
  source: string;
  type: 'Instruction' | 'Circulaire' | 'Règlement' | 'Décision' | 'Avis' | 'Directive' | 'Norme' | 'Rapport';
  date: string;
  statut: 'En vigueur' | 'Abrogé' | 'En projet';
  langue: 'FR' | 'EN';
  mots_cles: string[];
  pertinence: number;
}

export interface KGData {
  sources: KGSource[];
  agents: KGAgent[];
  documents: KGDocument[];
  globalMetrics: {
    total_documents: number;
    total_embeddings: number;
    total_categories: number;
    couverture_regions: string;
    couverture_thematique: string;
    rafraichissement_quotidien: string;
    score_exhaustivite: number;
    score_precision: number;
    certification: string;
  };
}

export const KG_SOURCES: KGSource[] = [
  {
    id: 'src-bceao',
    nom: 'BCEAO',
    type: 'regulateur',
    documents_indexes: 12500,
    couverture: 100,
    derniere_sync: '2026-06-18 08:00 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-bank-line',
    description: 'Banque Centrale des États de l\'Afrique de l\'Ouest — Instructions, circulaires, règlements, décisions, avis, rapports annuels, notes de conjoncture.',
  },
  {
    id: 'src-uemoa',
    nom: 'UEMOA',
    type: 'regulateur',
    documents_indexes: 8200,
    couverture: 98,
    derniere_sync: '2026-06-18 07:30 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-global-line',
    description: 'Union Économique et Monétaire Ouest Africaine — Traités, règlements, directives, décisions, rapports économiques et financiers.',
  },
  {
    id: 'src-ohada',
    nom: 'OHADA',
    type: 'regulateur',
    documents_indexes: 10500,
    couverture: 100,
    derniere_sync: '2026-06-18 07:00 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-scales-3-line',
    description: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires — Actes uniformes, règlements, décisions CCJA, doctrine.',
  },
  {
    id: 'src-cobac',
    nom: 'COBAC',
    type: 'regulateur',
    documents_indexes: 3800,
    couverture: 95,
    derniere_sync: '2026-06-18 06:30 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-building-4-line',
    description: 'Commission Bancaire de l\'Afrique Centrale — Règlements, instructions, circulaires, rapports de supervision.',
  },
  {
    id: 'src-bad',
    nom: 'BAD — Banque Africaine de Développement',
    type: 'developpement',
    documents_indexes: 4200,
    couverture: 92,
    derniere_sync: '2026-06-18 05:00 UTC',
    frequence: 'Hebdomadaire',
    icon: 'ri-funds-line',
    description: 'Perspectives économiques, rapports pays, études sectorielles, stratégies régionales, évaluations de projets.',
  },
  {
    id: 'src-bm',
    nom: 'Banque Mondiale',
    type: 'international',
    documents_indexes: 3500,
    couverture: 88,
    derniere_sync: '2026-06-18 04:00 UTC',
    frequence: 'Hebdomadaire',
    icon: 'ri-earth-line',
    description: 'Doing Business, CPIA, rapports développement, diagnostics pays, études Doing Business.',
  },
  {
    id: 'src-fmi',
    nom: 'FMI — Fonds Monétaire International',
    type: 'international',
    documents_indexes: 2800,
    couverture: 90,
    derniere_sync: '2026-06-18 04:30 UTC',
    frequence: 'Hebdomadaire',
    icon: 'ri-money-dollar-circle-line',
    description: 'Article IV, rapports FSSA, perspectives économiques régionales, rapports stabilité financière, assistance technique.',
  },
  {
    id: 'src-ocde',
    nom: 'OCDE',
    type: 'standard',
    documents_indexes: 2200,
    couverture: 85,
    derniere_sync: '2026-06-18 03:00 UTC',
    frequence: 'Hebdomadaire',
    icon: 'ri-organization-chart',
    description: 'Principes gouvernance, BEPS, prix de transfert, lutte contre corruption, examens pays, statistiques.',
  },
  {
    id: 'src-gri',
    nom: 'GRI — Global Reporting Initiative',
    type: 'standard',
    documents_indexes: 1500,
    couverture: 82,
    derniere_sync: '2026-06-17 22:00 UTC',
    frequence: 'Mensuelle',
    icon: 'ri-seedling-line',
    description: 'Standards GRI, guides sectoriels, rapports développement durable, taxonomie ESG.',
  },
  {
    id: 'src-issb',
    nom: 'ISSB — International Sustainability Standards Board',
    type: 'standard',
    documents_indexes: 1300,
    couverture: 80,
    derniere_sync: '2026-06-17 20:00 UTC',
    frequence: 'Mensuelle',
    icon: 'ri-leaf-line',
    description: 'IFRS S1/S2, standards de durabilité, guidance sectorielle, taxonomie climat.',
  },
  {
    id: 'src-brvm',
    nom: 'BRVM — Bourse Régionale des Valeurs Mobilières',
    type: 'regulateur',
    documents_indexes: 1850,
    couverture: 92,
    derniere_sync: '2026-06-18 05:30 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-line-chart-line',
    description: 'Marché financier régional UEMOA — cotations, rapports annuels sociétés cotées, indicateurs BRVM Composite, BRVM 30, BRVM Prestige, communiqués financiers.',
  },
  {
    id: 'src-crepmf',
    nom: 'AMF-UEMOA — Conseil Régional de l\'Épargne Publique et des Marchés Financiers',
    type: 'regulateur',
    documents_indexes: 920,
    couverture: 88,
    derniere_sync: '2026-06-18 05:45 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-shield-check-line',
    description: 'Régulateur des marchés financiers UEMOA — agréments SGI, OPCVM, notes d\'information, contrôles, sanctions.',
  },
  {
    id: 'src-cedeao',
    nom: 'CEDEAO — Communauté Économique des États de l\'Afrique de l\'Ouest',
    type: 'international',
    documents_indexes: 2400,
    couverture: 86,
    derniere_sync: '2026-06-18 04:45 UTC',
    frequence: 'Hebdomadaire',
    icon: 'ri-global-line',
    description: 'Traités, protocoles, politiques commerciales (TEC CEDEAO), programmes régionaux, rapports économiques, intégration régionale.',
  },
  {
    id: 'src-cima',
    nom: 'CIMA — Conférence Interafricaine des Marchés d\'Assurance',
    type: 'regulateur',
    documents_indexes: 1050,
    couverture: 91,
    derniere_sync: '2026-06-18 06:15 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-umbrella-line',
    description: 'Code CIMA, réglementation assurance, agréments sociétés d\'assurance, règles prudentielles, contrôles sur pièces et sur place.',
  },
  {
    id: 'src-ucad',
    nom: 'Université Cheikh Anta Diop — FASEG/CREA',
    type: 'international',
    documents_indexes: 780,
    couverture: 75,
    derniere_sync: '2026-06-17 16:00 UTC',
    frequence: 'Mensuelle',
    icon: 'ri-graduation-cap-line',
    description: 'Recherche économique UEMOA — thèses, working papers, publications CREA, analyses macroéconomiques Afrique de l\'Ouest.',
  },
  {
    id: 'src-ufhb',
    nom: 'Université Félix Houphouët-Boigny — UFR SEG/CIRES',
    type: 'international',
    documents_indexes: 650,
    couverture: 72,
    derniere_sync: '2026-06-17 15:30 UTC',
    frequence: 'Mensuelle',
    icon: 'ri-graduation-cap-line',
    description: 'Centre Ivoirien de Recherches Économiques et Sociales — études sectorielles, analyses conjoncturelles, rapports développement Côte d\'Ivoire.',
  },
  {
    id: 'src-financial-afrik',
    nom: 'Financial Afrik — Média Économique Panafricain',
    type: 'international',
    documents_indexes: 3200,
    couverture: 94,
    derniere_sync: '2026-06-18 07:45 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-newspaper-line',
    description: 'Actualité économique et financière africaine — analyses, interviews décideurs, veille réglementaire, classements banques, rapports exclusifs.',
  },
  {
    id: 'src-africa-business',
    nom: 'Africa Business+ — Intelligence Économique',
    type: 'international',
    documents_indexes: 2100,
    couverture: 89,
    derniere_sync: '2026-06-18 07:30 UTC',
    frequence: 'Quotidienne',
    icon: 'ri-briefcase-line',
    description: 'Intelligence économique Afrique francophone — deals, nominations, marchés publics, secteurs régulés, analyses exclusives.',
  },
];

export const KG_AGENTS: KGAgent[] = [
  {
    id: 'agent-kg-01',
    nom: 'Agent Veille Réglementaire™',
    mission: 'Extraction documentaire automatique, classification et indexation des textes officiels.',
    statut: 'Actif',
    actions_24h: 2847,
    documents_traites: 31500,
    precision: 99.2,
    icon: 'ri-radar-line',
    taches: ['Extraction quotidienne 10 sources', 'Classification automatique', 'Indexation vectorielle', 'Détection nouveautés', 'Alertes textes abrogés'],
  },
  {
    id: 'agent-kg-02',
    nom: 'Agent RAG — Structuration™',
    mission: 'Structuration sémantique, génération de métadonnées, construction de la taxonomie réglementaire.',
    statut: 'Actif',
    actions_24h: 1523,
    documents_traites: 18500,
    precision: 98.7,
    icon: 'ri-mind-map',
    taches: ['Structuration sémantique', 'Génération métadonnées', 'Taxonomie réglementaire', 'Liaisons inter-textes', 'Résumés automatiques'],
  },
];

export const KG_DOCUMENTS: KGDocument[] = [
  { id: 'doc-001', titre: 'Instruction BCEAO N°008-05-2015 relative aux conditions et modalités d\'exercice des SFD', source: 'BCEAO', type: 'Instruction', date: '2015-05-20', statut: 'En vigueur', langue: 'FR', mots_cles: ['SFD', 'Microfinance', 'Agrément', 'Gouvernance'], pertinence: 98 },
  { id: 'doc-002', titre: 'Circulaire COBAC R-2017/01 relative à la gouvernance des établissements de crédit', source: 'COBAC', type: 'Circulaire', date: '2017-03-15', statut: 'En vigueur', langue: 'FR', mots_cles: ['Gouvernance', 'Conseil', 'Comités', 'Administrateurs'], pertinence: 96 },
  { id: 'doc-003', titre: 'Acte Uniforme OHADA relatif au droit des sociétés commerciales et du GIE', source: 'OHADA', type: 'Règlement', date: '2014-01-30', statut: 'En vigueur', langue: 'FR', mots_cles: ['Sociétés', 'Commercial', 'GIE', 'Statuts'], pertinence: 94 },
  { id: 'doc-004', titre: 'Règlement UEMOA N°09/2010/CM/UEMOA relatif aux relations financières extérieures', source: 'UEMOA', type: 'Règlement', date: '2010-12-17', statut: 'En vigueur', langue: 'FR', mots_cles: ['Change', 'Extérieur', 'Capitaux', 'Transferts'], pertinence: 91 },
  { id: 'doc-005', titre: 'Directive BCEAO N°01/2023 relative à la lutte contre le blanchiment de capitaux', source: 'BCEAO', type: 'Directive', date: '2023-06-10', statut: 'En vigueur', langue: 'FR', mots_cles: ['LCB-FT', 'Blanchiment', 'KYC', 'Vigilance'], pertinence: 99 },
  { id: 'doc-006', titre: 'Circulaire BCEAO N°01-2017/CB/C relative à la gouvernance dans les établissements de crédit', source: 'BCEAO', type: 'Circulaire', date: '2017-04-03', statut: 'En vigueur', langue: 'FR', mots_cles: ['Gouvernance', 'Banque', 'Conseil', 'Comités'], pertinence: 97 },
  { id: 'doc-007', titre: 'Norme IFRS S1 — General Requirements for Disclosure of Sustainability-related Financial Information', source: 'ISSB', type: 'Norme', date: '2023-06-26', statut: 'En vigueur', langue: 'EN', mots_cles: ['ESG', 'Durabilité', 'Reporting', 'IFRS'], pertinence: 93 },
  { id: 'doc-008', titre: 'Principes de gouvernance d\'entreprise du G20 et de l\'OCDE', source: 'OCDE', type: 'Norme', date: '2023-09-11', statut: 'En vigueur', langue: 'FR', mots_cles: ['Gouvernance', 'G20', 'Actionnaires', 'Conseil'], pertinence: 90 },
  { id: 'doc-009', titre: 'Décision CCJA N°001/2020 portant interprétation de l\'Acte uniforme portant organisation des procédures collectives', source: 'OHADA', type: 'Décision', date: '2020-02-12', statut: 'En vigueur', langue: 'FR', mots_cles: ['Jurisprudence', 'CCJA', 'Procédures', 'Interprétation'], pertinence: 88 },
  { id: 'doc-010', titre: 'Rapport Perspectives économiques en Afrique 2026', source: 'BAD', type: 'Rapport', date: '2026-05-15', statut: 'En vigueur', langue: 'FR', mots_cles: ['Croissance', 'Afrique', 'Investissement', 'Projections'], pertinence: 95 },
  { id: 'doc-011', titre: 'Instruction BCEAO N°061-11-2011 relative au refinancement des SFD', source: 'BCEAO', type: 'Instruction', date: '2011-11-28', statut: 'En vigueur', langue: 'FR', mots_cles: ['Refinancement', 'SFD', 'Liquidité', 'BCEAO'], pertinence: 92 },
  { id: 'doc-012', titre: 'Rapport FMI N°26/156 — UEMOA : Consultations de 2026 au titre de l\'Article IV', source: 'FMI', type: 'Rapport', date: '2026-04-20', statut: 'En vigueur', langue: 'FR', mots_cles: ['Article IV', 'UEMOA', 'Macroéconomie', 'Stabilité'], pertinence: 94 },
];

export const KG_GLOBAL_METRICS = {
  total_documents: 100000,
  total_embeddings: 2780000,
  total_categories: 1200,
  couverture_regions: 'UEMOA + CEMAC + 54 pays africains + DOM-TOM Francophone',
  couverture_thematique: 'Régulation, Banque, Microfinance, Fintech, ESG, Fiscalité, Gouvernance, LCB-FT, Marchés Financiers, Droit Commercial, Inclusion Financière, Cybersécurité Bancaire, Finance Islamique, Assurance CIMA, Partenariats Public-Privé',
  rafraichissement_quotidien: '18 sources — 06:00 UTC',
  score_exhaustivite: 99,
  score_precision: 99.3,
  certification: 'AAAA — Big Four Supreme 100% — Knowledge Graph Enterprise — LEADER AFRIQUE FRANCOPHONE',
};





