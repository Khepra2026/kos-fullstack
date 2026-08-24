// KOS Transformation Office™ — Hub 116
// 7-Phase Strategic Redesign: Consulting → Francophone African Regulatory Intelligence Platform
// 4 Business Units: Regulatory Intelligence, Due Diligence, RegTech SaaS, African Observatory

export interface TransformationScenario {
  id: string;
  nom_institution: string;
  type_institution: 'Banque' | 'EMF' | 'FinTech' | 'Groupe Panafricain';
  zone: string;
  description: string;
  complexite: 'Haute' | 'Très Haute' | 'Maximale';
  bus_actives: string[];
  score_transformation: number;
  revenu_recurrent_cible_pct: number;
}

// ═══════════ PHASE 1 — STRATEGIC REPOSITIONING ═══════════
export interface Phase1Data {
  positionnement: string;
  mission: string;
  vision: string;
  proposition_valeur: string;
  narration_marche: string;
  activites_eliminees: string[];
  ressources_reallouees: { depuis: string; vers: string; pct: number }[];
}

// ═══════════ BU1 — REGULATORY INTELLIGENCE ═══════════
export interface BU1Product {
  id: string;
  nom: string;
  description: string;
  marche_cible: string;
  modele_tarification: string;
  modele_abonnement: string;
  exigences_automatisation: string[];
  exigences_donnees: string[];
  rentabilite_attendue: string;
  prix_mensuel_eur: number;
}

export interface BU1Data {
  mission: string;
  produits: BU1Product[];
  revenu_projete_mensuel_eur: number;
  marge_operationnelle_pct: number;
}

// ═══════════ BU2 — REGULATORY DUE DILIGENCE ═══════════
export interface BU2Product {
  id: string;
  nom: string;
  description: string;
  clients_cibles: string[];
  prix_engagement_eur: number;
  duree_jours: number;
  livrables: string[];
  score_inclus: boolean;
}

export interface BU2Data {
  mission: string;
  produits: BU2Product[];
  methodology: string[];
  scoring_model: { nom: string; axes: { nom: string; poids_pct: number }[]; seuils: { min: number; max: number; label: string }[] };
  revenu_projete_annuel_eur: number;
}

// ═══════════ BU3 — REGTECH SaaS PLATFORM ═══════════
export interface BU3Tier {
  nom: string;
  prix_mensuel_eur: number;
  produits_inclus: string[];
  limites: Record<string, string>;
  onboarding_temps_jours: number;
  support: string;
  cta: string;
}

export interface BU3Product {
  id: string;
  nom: string;
  description: string;
  fonctionnalites: string[];
  architecture: string[];
  automatisation_pct: number;
}

export interface BU3Data {
  mission: string;
  produits: BU3Product[];
  tiers: BU3Tier[];
  mrr_projete_6mois_eur: number;
  mrr_projete_12mois_eur: number;
  arpu_cible_eur: number;
}

// ═══════════ BU4 — AFRICAN REGULATORY OBSERVATORY ═══════════
export interface BU4Observatory {
  id: string;
  nom: string;
  description: string;
  publications: { type: string; frequence: string; prix_eur: number }[];
  indices: string[];
  benchmarks: string[];
}

export interface BU4Data {
  mission: string;
  observatoires: BU4Observatory[];
  calendrier_publication: Record<string, string[]>;
  modele_collecte_donnees: string;
  strategie_monetisation: string[];
  revenu_projete_annuel_eur: number;
}

// ═══════════ PHASE 2 — TECHNOLOGY REORGANIZATION ═══════════
export interface TechLayer {
  nom: string;
  description: string;
  technologies: string[];
  responsabilites: string[];
}

export interface Phase2Data {
  principe: string;
  couches: TechLayer[];
  flux_donnees: string[];
}

// ═══════════ PHASE 3 — KNOWLEDGE GRAPH UPGRADE ═══════════
export interface Phase3Data {
  chaine_tracabilite: string[];
  schema_relations: { source: string; relation: string; cible: string }[];
  regle_fondamentale: string;
}

// ═══════════ PHASE 4 — AI AGENT REORGANIZATION ═══════════
export interface AgentReduit {
  id: string;
  nom: string;
  mission: string;
  inputs: string[];
  outputs: string[];
  kpis: string[];
  confidence_min: number;
}

export interface Phase4Data {
  agents: AgentReduit[];
  agents_elimines: number;
}

// ═══════════ PHASE 5 — WEBSITE REORGANIZATION ═══════════
export interface WebsiteSection {
  nom: string;
  pages: string[];
  fonction_conversion: string;
  lead_magnet: string;
}

export interface Phase5Data {
  sections: WebsiteSection[];
  strategie_contenu: string[];
}

// ═══════════ PHASE 6 — MONETIZATION ENGINE ═══════════
export interface RevenueStream {
  priorite: number;
  type: string;
  description: string;
  prix_mensuel_eur: number;
  abonnes_cibles: number;
  revenu_mensuel_projete_eur: number;
  marge_pct: number;
}

export interface Phase6Data {
  hierarchie_revenus: string[];
  flux: RevenueStream[];
  revenu_total_mensuel_projete_eur: number;
}

// ═══════════ PHASE 7 — EXECUTION ROADMAP ═══════════
export interface RoadmapPhase {
  periode: string;
  objectifs: string[];
  livrables: string[];
  kpis: string[];
  risques: string[];
  ressources: string;
}

export interface Phase7Data {
  phases: RoadmapPhase[];
}

// ═══════════ TRANSFORMATION DELIVERABLE ═══════════
export interface TransformationDeliverable {
  scenario: TransformationScenario;
  phase1: Phase1Data;
  bu1: BU1Data;
  bu2: BU2Data;
  bu3: BU3Data;
  bu4: BU4Data;
  phase2: Phase2Data;
  phase3: Phase3Data;
  phase4: Phase4Data;
  phase5: Phase5Data;
  phase6: Phase6Data;
  phase7: Phase7Data;
  metadata: { to_id: string; date_transformation: string; version: string; score_transformation: number };
}

// ═══════════════════════ SCENARIOS ═══════════════════════

export const TRANSFORMATION_SCENARIOS: TransformationScenario[] = [
  {
    id: 'TFO-001',
    nom_institution: 'Banque Commerciale CEMAC — Transformation Full Stack',
    type_institution: 'Banque',
    zone: 'CEMAC — Cameroun, Gabon, Congo, RCA, Tchad, Guinée Équatoriale',
    description: 'Transformation d\'un cabinet de conseil traditionnel en plateforme d\'intelligence réglementaire pour une banque commerciale CEMAC. Activation des 4 BUs avec focus sur le RegTech SaaS et l\'Observatory. Migration des revenus consultatifs (80%) vers le recurring (70%).',
    complexite: 'Maximale',
    bus_actives: ['BU1 — Regulatory Intelligence', 'BU2 — Regulatory Due Diligence', 'BU3 — RegTech SaaS', 'BU4 — African Observatory'],
    score_transformation: 94,
    revenu_recurrent_cible_pct: 70,
  },
  {
    id: 'TFO-002',
    nom_institution: 'EMF UEMOA — Leapfrog RegTech + Observatory',
    type_institution: 'EMF',
    zone: 'UEMOA — 8 pays, Sénégal, Côte d\'Ivoire, Burkina Faso, Mali, Niger, Togo, Bénin, Guinée-Bissau',
    description: 'Transformation d\'un EMF vers un modèle hybride : RegTech SaaS (BU3) pour la conformité automatisée + Observatory (BU4) pour le benchmarking sectoriel. Abandon du conseil générique, focus intelligence réglementaire.',
    complexite: 'Haute',
    bus_actives: ['BU1 — Regulatory Intelligence', 'BU3 — RegTech SaaS', 'BU4 — African Observatory'],
    score_transformation: 85,
    revenu_recurrent_cible_pct: 65,
  },
  {
    id: 'TFO-003',
    nom_institution: 'FinTech Paiement CEMAC — Due Diligence + Scoring',
    type_institution: 'FinTech',
    zone: 'CEMAC — Congo, Gabon, Cameroun',
    description: 'Transformation pour une FinTech de paiement : BU2 (Due Diligence) pour les investisseurs + BU3 (RegTech SaaS) pour le compliance scoring automatisé. Positionnement "Regulatory Investability Score™" pour attirer les VC/PE.',
    complexite: 'Haute',
    bus_actives: ['BU2 — Regulatory Due Diligence', 'BU3 — RegTech SaaS'],
    score_transformation: 88,
    revenu_recurrent_cible_pct: 60,
  },
  {
    id: 'TFO-004',
    nom_institution: 'Groupe Panafricain — Platform Complète Multi-Juridictionnelle',
    type_institution: 'Groupe Panafricain',
    zone: 'CEMAC + UEMOA — 12 filiales, 10 pays, 3200 Mds FCFA',
    description: 'Transformation totale : les 4 BUs activées en mode plateforme. Intelligence réglementaire multi-juridictionnelle, due diligence investisseurs, SaaS RegTech, et Observatory panafricain. Objectif : devenir la référence de l\'intelligence réglementaire en Afrique Francophone.',
    complexite: 'Maximale',
    bus_actives: ['BU1 — Regulatory Intelligence', 'BU2 — Regulatory Due Diligence', 'BU3 — RegTech SaaS', 'BU4 — African Observatory'],
    score_transformation: 97,
    revenu_recurrent_cible_pct: 75,
  },
];

// ═══════════ PHASE 1 — STRATEGIC REPOSITIONING (per scenario) ═══════════

const PHASE1_PER_SCENARIO: Record<string, Phase1Data> = {
  'TFO-001': {
    positionnement: 'Francophone Africa Regulatory Intelligence Platform™ — La plateforme qui transforme la complexité réglementaire CEMAC en intelligence exécutive actionnable pour les banques commerciales.',
    mission: 'Équiper les institutions financières africaines d\'intelligence réglementaire temps réel, de scoring de conformité automatisé et de due diligence investisseur, pour transformer la contrainte réglementaire en avantage compétitif.',
    vision: 'Devenir la référence incontestée de l\'intelligence réglementaire en Afrique Francophone d\'ici 2028, avec 1000 institutions abonnées, 10M€ de revenu récurrent annuel, et une autorité de benchmark reconnue par les régulateurs eux-mêmes.',
    proposition_valeur: 'Nous ne vendons pas des réglementations. Nous vendons l\'interprétation, le scoring, le benchmarking, les alertes, l\'intelligence et le support décisionnel qui permettent aux dirigeants de dormir tranquilles la veille d\'une inspection COBAC.',
    narration_marche: 'Chaque année, les banques africaines perdent 500M€ en amendes, provisions et coûts de mise en conformité réactive. KOS transforme ce chaos réglementaire en flux d\'intelligence structurée, réduisant le risque de non-conformité de 70% et le coût de la conformité de 40%.',
    activites_eliminees: ['Conseil générique non spécialisé', 'Formations catalogue standard', 'Audit one-off low-margin (<15k€)', 'Rapports ponctuels sans suite', 'Veille manuelle non outillée'],
    ressources_reallouees: [
      { depuis: 'Conseil générique (40% du CA)', vers: 'BU3 — RegTech SaaS Platform', pct: 40 },
      { depuis: 'Formations standard (15% du CA)', vers: 'BU1 — Regulatory Intelligence', pct: 25 },
      { depuis: 'Rapports one-off (20% du CA)', vers: 'BU4 — African Observatory', pct: 20 },
      { depuis: 'Marketing traditionnel (10% du CA)', vers: 'BU2 — Due Diligence Engine', pct: 15 },
    ],
  },
  'TFO-002': {
    positionnement: 'RegTech SaaS pour EMF UEMOA — La conformité automatisée au service des microfinances africaines.',
    mission: 'Démocratiser l\'accès à l\'intelligence réglementaire BCEAO pour les 500+ EMF de l\'UEMOA via une plateforme SaaS abordable et un observatoire sectoriel.',
    vision: 'Devenir le standard de conformité pour le secteur de la microfinance en Afrique de l\'Ouest, avec 200 EMF abonnés et un observatoire BCEAO de référence.',
    proposition_valeur: 'Pour le prix d\'un demi-journée de consultant, accédez à une année complète d\'intelligence réglementaire automatisée.',
    narration_marche: 'Les EMF de l\'UEMOA gèrent 2000 Mds FCFA d\'encours avec des équipes conformité sous-dimensionnées. KOS leur apporte l\'intelligence d\'un Big Four au prix d\'un SaaS.',
    activites_eliminees: ['Conseil ponctuel EMF', 'Formations non digitalisées', 'Diagnostics manuels'],
    ressources_reallouees: [
      { depuis: 'Conseil EMF (50% du CA)', vers: 'BU3 — RegTech SaaS', pct: 35 },
      { depuis: 'Formations (20% du CA)', vers: 'BU4 — Observatory BCEAO', pct: 20 },
      { depuis: 'Diagnostics (30% du CA)', vers: 'BU1 — Intelligence BCEAO', pct: 25 },
    ],
  },
  'TFO-003': {
    positionnement: 'Regulatory Investability Score™ — Le score qui rassure les investisseurs avant d\'investir dans une FinTech africaine.',
    mission: 'Créer le standard de due diligence réglementaire pour les investisseurs en FinTech africaines, couplé à une plateforme SaaS de compliance scoring continu.',
    vision: 'Devenir le "Moody\'s de la conformité réglementaire" pour l\'écosystème FinTech africain.',
    proposition_valeur: 'Un investissement de 15k€ en due diligence réglementaire peut éviter une perte de 5M€ en cas de retrait d\'agrément post-investissement.',
    narration_marche: '70% des FinTechs africaines échouent leur due diligence réglementaire lors des levées de fonds. KOS transforme ce risque en opportunité avec un score standardisé reconnu par les investisseurs.',
    activites_eliminees: ['Conseil IT générique', 'Audit SI non réglementaire', 'Formations tech'],
    ressources_reallouees: [
      { depuis: 'Conseil IT (35% du CA)', vers: 'BU3 — RegTech SaaS', pct: 30 },
      { depuis: 'Audit SI (40% du CA)', vers: 'BU2 — Due Diligence', pct: 35 },
      { depuis: 'Formations (25% du CA)', vers: 'BU1 — Intelligence FinTech', pct: 15 },
    ],
  },
  'TFO-004': {
    positionnement: 'Francophone Africa Regulatory Intelligence Platform™ — La plateforme de référence pour l\'intelligence réglementaire panafricaine.',
    mission: 'Unifier l\'intelligence réglementaire CEMAC et UEMOA en une plateforme unique, servir les 100 plus grandes institutions financières africaines et créer l\'observatoire de référence du marché.',
    vision: 'Être cotée comme la source d\'intelligence réglementaire n°1 pour toute l\'Afrique Francophone, utilisée par les régulateurs, les banques, les investisseurs et les gouvernements.',
    proposition_valeur: 'Une plateforme, deux zones monétaires, 14 pays, 100% de la réglementation financière africaine en un seul abonnement.',
    narration_marche: 'L\'Afrique Francophone représente 1500 institutions financières, 5000+ textes réglementaires actifs, et aucun leader d\'intelligence réglementaire. KOS capte ce marché avant l\'arrivée des acteurs internationaux.',
    activites_eliminees: ['Tout conseil non-plateforme', 'Toute formation non-digitalisée', 'Tout rapport non-automatisé'],
    ressources_reallouees: [
      { depuis: 'Conseil (50% du CA)', vers: 'BU3 — RegTech SaaS', pct: 30 },
      { depuis: 'Formations (15% du CA)', vers: 'BU1 — Intelligence', pct: 20 },
      { depuis: 'Audit (25% du CA)', vers: 'BU2 — Due Diligence', pct: 25 },
      { depuis: 'Divers (10% du CA)', vers: 'BU4 — Observatory', pct: 15 },
    ],
  },
};

// ═══════════ BU1 — REGULATORY INTELLIGENCE (common) ═══════════

const BU1_COMMON: BU1Data = {
  mission: 'Transformer la complexité réglementaire en intelligence exécutive actionnable. Chaque nouveau texte, chaque amendement, chaque circulaire est automatiquement ingéré, interprété et distribué sous forme d\'alertes, briefs et notes d\'interprétation.',
  produits: [
    {
      id: 'BU1-P1', nom: 'Regulatory Watch™',
      description: 'Veille réglementaire automatisée 24/7 couvrant COBAC, BEAC, BCEAO, GABAC, GAFI, GIABA, OHADA. Détection des nouveaux textes en moins de 2h après publication officielle.',
      marche_cible: 'Toutes institutions financières régulées CEMAC/UEMOA — 1500+ institutions',
      modele_tarification: 'Freemium → 3 textes/mois gratuits, puis abonnement',
      modele_abonnement: 'Mensuel ou annuel (-20%)',
      exigences_automatisation: ['RSS/Scraping journaux officiels', 'NLP extraction texte', 'Classification automatique par domaine', 'Notification email/Slack/Teams'],
      exigences_donnees: ['Sources officielles COBAC/BEAC/BCEAO', 'Journaux officiels numérisés', 'Base historique 10 ans'],
      rentabilite_attendue: 'Marge 85% — Coût marginal quasi nul après ingestion',
      prix_mensuel_eur: 490,
    },
    {
      id: 'BU1-P2', nom: 'Executive Regulatory Briefs™',
      description: 'Synthèses exécutives trimestrielles par domaine et par juridiction. Format board-ready, 5-7 pages, incluant analyse d\'impact et recommandations.',
      marche_cible: 'COMEX, CA, DG, DAF — 5000+ décideurs',
      modele_tarification: 'Abonnement annuel uniquement',
      modele_abonnement: 'Annuel — 4 briefs trimestriels + 1 rapport annuel',
      exigences_automatisation: ['RAG pgVector', 'GPT-4o synthèse', 'Template automatique', 'Graphiques générés'],
      exigences_donnees: ['Base réglementaire complète', 'Données sectorielles', 'Historique conformité'],
      rentabilite_attendue: 'Marge 75% — Rédaction AI + validation expert 1h',
      prix_mensuel_eur: 1200,
    },
    {
      id: 'BU1-P3', nom: 'Compliance Radar™',
      description: 'Dashboard interactif de heatmap réglementaire par juridiction, domaine et criticité. Visualisation des textes à venir, des deadlines et des zones de risque.',
      marche_cible: 'CCO, Risk Managers, Auditeurs internes — 3000+ professionnels',
      modele_tarification: 'Abonnement mensuel par utilisateur',
      modele_abonnement: 'Mensuel — prix par seat, minimum 3 seats',
      exigences_automatisation: ['Dashboard temps réel', 'Heatmap interactive', 'Filtres multi-critères', 'Export PDF/Excel'],
      exigences_donnees: ['Base réglementaire', 'Profil institution', 'Matrice risques'],
      rentabilite_attendue: 'Marge 80% — Plateforme SaaS multi-tenant',
      prix_mensuel_eur: 790,
    },
    {
      id: 'BU1-P4', nom: 'Regulatory Interpretation Notes™',
      description: 'Notes d\'interprétation juridique détaillées sur les textes complexes. Rédigées par AI + validées par des juristes senior. Format : analyse article par article, implications pratiques, jurisprudence.',
      marche_cible: 'Directions juridiques, CCO, cabinets d\'avocats — 2000+ acheteurs',
      modele_tarification: 'A la carte — prix par note',
      modele_abonnement: 'Pack de 12 notes/an ou achat unitaire',
      exigences_automatisation: ['GPT-4o + RAG', 'Template juridique', 'Validation workflow', 'Versioning'],
      exigences_donnees: ['Texte intégral réglementation', 'Historique amendements', 'Jurisprudence'],
      rentabilite_attendue: 'Marge 65% — Validation humaine obligatoire',
      prix_mensuel_eur: 290,
    },
  ],
  revenu_projete_mensuel_eur: 145000,
  marge_operationnelle_pct: 78,
};

// ═══════════ BU2 — REGULATORY DUE DILIGENCE (common) ═══════════

const BU2_COMMON: BU2Data = {
  mission: 'Aider les investisseurs à évaluer le risque réglementaire avant d\'investir. Créer le KOS Regulatory Investability Score™, le standard de due diligence réglementaire pour l\'Afrique Francophone.',
  produits: [
    {
      id: 'BU2-P1', nom: 'Regulatory Due Diligence — Full Scope',
      description: 'Due diligence réglementaire complète : analyse de tous les textes applicables, scoring de conformité, gaps analysis détaillé, risques de sanction, historique d\'inspection.',
      clients_cibles: ['Private Equity (Actis, Amethis, I&P)', 'Venture Capital (Partech, Orange Ventures)', 'DFI (IFC, Proparco, BAD, BOAD)', 'Banques d\'investissement'],
      prix_engagement_eur: 35000,
      duree_jours: 20,
      livrables: ['Rapport DD 50-80 pages', 'KOS Investability Score™ (0-100)', 'Gap analysis priorisé P0-P3', 'Risk matrix 5×5', 'Executive summary 2 pages'],
      score_inclus: true,
    },
    {
      id: 'BU2-P2', nom: 'Compliance Due Diligence — Focus LBC/FT',
      description: 'Due diligence focalisée sur la conformité LBC/FT : KYC, CDD, bénéficiaires effectifs, déclarations de soupçons, screening sanctions, formation.',
      clients_cibles: ['Banques correspondantes', 'Investisseurs pré-acquisition', 'Fonds compliance'],
      prix_engagement_eur: 18000,
      duree_jours: 10,
      livrables: ['Rapport LBC/FT 30-40 pages', 'Score AML/CFT', 'Registre BE vérifié', 'Analyse DS 24 mois'],
      score_inclus: true,
    },
    {
      id: 'BU2-P3', nom: 'Governance Due Diligence',
      description: 'Évaluation de la gouvernance : CA, comités spécialisés, indépendance, lignes de défense, contrôle interne, audit interne, gestion des risques.',
      clients_cibles: ['Investisseurs activistes', 'Fonds ESG', 'DFI', 'Conseils d\'administration'],
      prix_engagement_eur: 15000,
      duree_jours: 12,
      livrables: ['Rapport gouvernance 25-35 pages', 'Score gouvernance', 'Analyse composition CA', 'Cartographie comités'],
      score_inclus: true,
    },
    {
      id: 'BU2-P4', nom: 'Regulatory Risk Report — Express',
      description: 'Rapport express de risque réglementaire pour décision rapide d\'investissement. Focus sur les 10 risques réglementaires les plus critiques.',
      clients_cibles: ['Business Angels', 'Family Offices', 'Petits fonds VC'],
      prix_engagement_eur: 5000,
      duree_jours: 5,
      livrables: ['Rapport express 10-15 pages', 'Top 10 risques', 'Score synthétique', 'Recommandation Go/No-Go'],
      score_inclus: true,
    },
  ],
  methodology: [
    'Phase 1 — Collecte documentaire (J1-J3) : Documents institutionnels, politiques, registres, PV, rapports',
    'Phase 2 — Analyse réglementaire (J4-J10) : Mapping textes applicables, obligations, contrôles',
    'Phase 3 — Vérification sur site (J11-J15) : Entretiens, tests de contrôle, échantillonnage',
    'Phase 4 — Scoring KOS Investability™ (J16-J18) : Calcul score 8 axes, benchmark sectoriel',
    'Phase 5 — Rapport & Restitution (J19-J20) : Rédaction, revue qualité, présentation investisseur',
  ],
  scoring_model: {
    nom: 'KOS Regulatory Investability Score™',
    axes: [
      { nom: 'Conformité réglementaire', poids_pct: 25 },
      { nom: 'LBC/FT / AML', poids_pct: 20 },
      { nom: 'Gouvernance', poids_pct: 15 },
      { nom: 'Historique inspection', poids_pct: 15 },
      { nom: 'Risque de sanction', poids_pct: 10 },
      { nom: 'Contrôle interne', poids_pct: 5 },
      { nom: 'Sécurité SI', poids_pct: 5 },
      { nom: 'Transparence / Reporting', poids_pct: 5 },
    ],
    seuils: [
      { min: 85, max: 100, label: 'Investable — Risque faible' },
      { min: 70, max: 84, label: 'Investable — Surveillance requise' },
      { min: 55, max: 69, label: 'Conditionnel — Plan remédiation obligatoire' },
      { min: 0, max: 54, label: 'Non investable — Risque réglementaire trop élevé' },
    ],
  },
  revenu_projete_annuel_eur: 620000,
};

// ═══════════ BU3 — REGTECH SaaS PLATFORM (common) ═══════════

const BU3_COMMON: BU3Data = {
  mission: 'Industrialiser la conformité et la veille réglementaire via une plateforme SaaS. Priorité absolue au revenu récurrent mensuel (MRR).',
  produits: [
    {
      id: 'BU3-P1', nom: 'KOS Regulatory Watch™ SaaS',
      description: 'Plateforme SaaS de veille réglementaire automatisée. Ingestion, classification, alerte et stockage de tous les textes réglementaires COBAC, BEAC, BCEAO, GABAC, GAFI en temps réel.',
      fonctionnalites: ['Alertes temps réel (email/Slack/Teams)', 'Base de données réglementaire full-text search', 'Classification automatique par domaine', 'Historique des amendements', 'Export PDF/Excel', 'API REST pour intégration'],
      architecture: ['Ingestion : Web Scraping + Flux RSS officiels', 'Processing : NLP pipeline extraction texte structuré', 'Storage : PostgreSQL + pgVector embeddings', 'Delivery : React Dashboard + API + Notifications'],
      automatisation_pct: 95,
    },
    {
      id: 'BU3-P2', nom: 'KOS Compliance Score™ SaaS',
      description: 'Plateforme de scoring de conformité continu. L\'institution connecte ses données, KOS calcule le score en temps réel avec alertes en cas de dégradation.',
      fonctionnalites: ['Score Global + 5 axes (Gouvernance, AML, Risque, IT, Audit)', 'Heatmap conformité interactive', 'Gap analysis automatique', 'Benchmark sectoriel anonymisé', 'Alertes dégradation score', 'Rapport board-ready automatique'],
      architecture: ['Data Input : API + CSV upload + connexion core banking', 'Scoring Engine : Formules pondérées + ML', 'Dashboard : React interactif temps réel', 'Reporting : Génération PDF automatique'],
      automatisation_pct: 88,
    },
    {
      id: 'BU3-P3', nom: 'KOS Inspection Simulator™ SaaS',
      description: 'Simulateur d\'inspection COBAC/BCEAO. L\'institution lance une simulation, KOS génère les questions, vérifie les réponses, identifie les gaps et produit un rapport complet.',
      fonctionnalites: ['Simulation inspection COBAC/BCEAO/Commission Bancaire', 'Questionnaire dynamique adapté au profil', 'Détection automatique des gaps', 'Génération plan de remédiation', 'Rapport d\'inspection simulée PDF', 'Scoring readiness pré-inspection'],
      architecture: ['Simulation Engine : RAG + GPT-4o question generation', 'Gap Detector : Matching preuves vs exigences', 'Report Generator : Template PDF automatisé'],
      automatisation_pct: 82,
    },
    {
      id: 'BU3-P4', nom: 'KOS Governance Monitor™ SaaS',
      description: 'Monitoring continu de la gouvernance : suivi des mandats, indépendance, comités, formations obligatoires, évaluations CA.',
      fonctionnalites: ['Tableau de bord gouvernance', 'Suivi mandats administrateurs', 'Calcul indépendance CA automatique', 'Calendrier comités + PV', 'Formations obligatoires tracking', 'Conformité Circulaire COBAC 01/2017'],
      architecture: ['Data Input : Portail administrateur sécurisé', 'Rule Engine : Règles COBAC/BCEAO codifiées', 'Dashboard : Vue CA + Vue CCO'],
      automatisation_pct: 75,
    },
  ],
  tiers: [
    {
      nom: 'Starter', prix_mensuel_eur: 490,
      produits_inclus: ['KOS Regulatory Watch™ — 1 juridiction', 'Base documentaire — 3 utilisateurs'],
      limites: { 'Textes/mois': 'Illimité', 'Juridictions': '1', 'Utilisateurs': '3', 'Stockage': '10 Go' },
      onboarding_temps_jours: 1, support: 'Email 48h', cta: 'Essai gratuit 14 jours',
    },
    {
      nom: 'Professional', prix_mensuel_eur: 1490,
      produits_inclus: ['KOS Regulatory Watch™ — Toutes juridictions', 'KOS Compliance Score™ — 1 entité', 'KOS Inspection Simulator™ — 2 simulations/an'],
      limites: { 'Juridictions': 'Illimité', 'Entités': '1', 'Utilisateurs': '10', 'Simulations': '2/an' },
      onboarding_temps_jours: 3, support: 'Email 4h + Chat', cta: 'Démo personnalisée',
    },
    {
      nom: 'Enterprise', prix_mensuel_eur: 3900,
      produits_inclus: ['Tous les produits KOS SaaS', 'Multi-entités', 'API illimitée', 'SSO/SAML'],
      limites: { 'Entités': 'Illimité', 'Utilisateurs': 'Illimité', 'API': 'Illimitée', 'Stockage': '1 To' },
      onboarding_temps_jours: 5, support: 'Dédié 24/7 + Account Manager', cta: 'Contacter Sales',
    },
    {
      nom: 'Observatory Partner', prix_mensuel_eur: 9900,
      produits_inclus: ['Tout Enterprise +', 'Observatory — Tous rapports', 'Données brutes exportables', 'Co-branding rapports'],
      limites: { 'Rapports Observatory': 'Illimité', 'Données brutes': 'Inclus', 'API Dataset': 'Inclus' },
      onboarding_temps_jours: 7, support: 'Partner Success Manager', cta: 'Partenariat Stratégique',
    },
  ],
  mrr_projete_6mois_eur: 85000,
  mrr_projete_12mois_eur: 210000,
  arpu_cible_eur: 1500,
};

// ═══════════ BU4 — AFRICAN REGULATORY OBSERVATORY (common) ═══════════

const BU4_COMMON: BU4Data = {
  mission: 'Devenir l\'autorité de référence pour l\'intelligence réglementaire en Afrique Francophone. Créer des observatoires sectoriels qui produisent des données propriétaires, des benchmarks et des indices de marché.',
  observatoires: [
    {
      id: 'OBS-COBAC', nom: 'Observatoire COBAC — Régulation Bancaire CEMAC',
      description: 'Observatoire de la régulation bancaire en zone CEMAC. Suivi des agréments, sanctions, ratios prudentiels, gouvernance et tendances réglementaires.',
      publications: [
        { type: 'Rapport Trimestriel — Conformité Bancaire CEMAC', frequence: 'Trimestrielle', prix_eur: 2500 },
        { type: 'Rapport Annuel — État de la Régulation CEMAC', frequence: 'Annuelle', prix_eur: 8000 },
        { type: 'Baromètre — Gouvernance Bancaire CEMAC', frequence: 'Semestrielle', prix_eur: 3500 },
      ],
      indices: ['KOS COBAC Compliance Index™', 'KOS Banking Governance Score™', 'KOS CEMAC Risk Barometer™'],
      benchmarks: ['Ratios prudentiels par pays', 'Composition CA par banque', 'Sanctions COBAC par typologie'],
    },
    {
      id: 'OBS-BCEAO', nom: 'Observatoire BCEAO — Microfinance & Inclusion Financière UEMOA',
      description: 'Observatoire du secteur de la microfinance en zone UEMOA. Suivi des agréments SFD, ratios prudentiels, inclusion financière et digitalisation.',
      publications: [
        { type: 'Rapport Trimestriel — Secteur SFD UEMOA', frequence: 'Trimestrielle', prix_eur: 1800 },
        { type: 'Rapport Annuel — Microfinance en Afrique de l\'Ouest', frequence: 'Annuelle', prix_eur: 5500 },
        { type: 'Benchmark — Performance SFD par pays', frequence: 'Semestrielle', prix_eur: 2200 },
      ],
      indices: ['KOS SFD Health Score™', 'KOS Financial Inclusion Index™', 'KOS Digital MFI Readiness™'],
      benchmarks: ['Top 50 SFD par encours', 'Ratios prudentiels moyens', 'Taux de digitalisation par pays'],
    },
    {
      id: 'OBS-FINTECH', nom: 'Observatoire FinTech — Régulation Innovation Afrique',
      description: 'Observatoire de la régulation FinTech en Afrique Francophone. Suivi des licenses, bacs à sable réglementaires, open banking et tendances.',
      publications: [
        { type: 'Rapport Semestriel — FinTech Regulatory Landscape', frequence: 'Semestrielle', prix_eur: 3000 },
        { type: 'Rapport Annuel — State of African FinTech Regulation', frequence: 'Annuelle', prix_eur: 6500 },
      ],
      indices: ['KOS FinTech Regulatory Maturity Index™', 'KOS Open Banking Readiness™'],
      benchmarks: ['FinTechs agréées par pays', 'Délais moyens d\'agrément', 'Sandboxes actifs'],
    },
    {
      id: 'OBS-GOV', nom: 'Observatoire Gouvernance — Standards CA & ESG',
      description: 'Observatoire des pratiques de gouvernance dans les institutions financières africaines. Composition CA, indépendance, diversité, ESG.',
      publications: [
        { type: 'Rapport Annuel — Gouvernance des Institutions Financières Africaines', frequence: 'Annuelle', prix_eur: 5000 },
        { type: 'Benchmark — Pratiques ESG secteur financier', frequence: 'Annuelle', prix_eur: 2800 },
      ],
      indices: ['KOS Governance Excellence Index™', 'KOS Board Diversity Score™'],
      benchmarks: ['% administrateurs indépendants', 'Taux de féminisation CA', 'Maturité ESG'],
    },
  ],
  calendrier_publication: {
    'T1': ['Rapport Trimestriel — Conformité Bancaire CEMAC', 'Rapport Trimestriel — Secteur SFD UEMOA'],
    'T2': ['Baromètre — Gouvernance Bancaire CEMAC', 'Benchmark — Performance SFD par pays', 'Rapport Semestriel — FinTech Regulatory Landscape'],
    'T3': ['Rapport Trimestriel — Conformité Bancaire CEMAC', 'Rapport Trimestriel — Secteur SFD UEMOA'],
    'T4': ['Rapport Annuel — État de la Régulation CEMAC', 'Rapport Annuel — Microfinance en Afrique de l\'Ouest', 'Rapport Annuel — State of African FinTech Regulation', 'Rapport Annuel — Gouvernance des Institutions Financières Africaines'],
  },
  modele_collecte_donnees: 'Automatisé via KOS Regulatory Watch™ + API institutions partenaires + Enquêtes annuelles standardisées + Données publiques régulateurs. Pipeline n8n de collecte → validation → agrégation → publication.',
  strategie_monetisation: [
    'Abonnement annuel Observatory (Accès à tous les rapports + données brutes)',
    'Vente à l\'unité des rapports (non-abonnés)',
    'Licence données brutes pour institutions financières et cabinets de conseil',
    'Co-branding rapports pour institutions partenaires',
    'Événements exclusifs (dîners-débats, conférences) pour abonnés Premium',
  ],
  revenu_projete_annuel_eur: 380000,
};

// ═══════════ PHASE 2 — TECHNOLOGY REORGANIZATION (common) ═══════════

const PHASE2_COMMON: Phase2Data = {
  principe: 'Regulation → Data → Intelligence → Decisions — Chaque réglementation est transformée en données structurées, enrichie par l\'IA, et délivrée comme intelligence actionnable.',
  couches: [
    {
      nom: 'Layer 1 — Regulatory Data Layer',
      description: 'Ingestion, stockage et indexation de toutes les sources réglementaires brutes dans PostgreSQL + pgVector.',
      technologies: ['PostgreSQL 16', 'pgVector', 'Supabase Storage', 'Redis Cache'],
      responsabilites: ['Ingestion automatisée (RSS, scraping, API)', 'Parsing PDF/HTML → texte structuré', 'Chunking + embedding vectoriel', 'Stockage versionné avec audit trail'],
    },
    {
      nom: 'Layer 2 — Knowledge Graph',
      description: 'Modélisation des relations entre réglementations, articles, obligations, contrôles, risques et preuves.',
      technologies: ['Neo4j (ou PostgreSQL JSONB graphe)', 'Apache TinkerPop', 'Cypher / Gremlin'],
      responsabilites: ['Modélisation entités réglementaires', 'Relations traçables (Autorité → Article → Contrôle)', 'Requêtes traversée multi-niveaux', 'Inférence règles automatiques'],
    },
    {
      nom: 'Layer 3 — AI Intelligence Layer',
      description: 'Traitement IA : interprétation, scoring, simulation, recommandations. Cœur de la proposition de valeur.',
      technologies: ['GPT-4o / Claude 3.5', 'RAG pgVector', 'ML scoring models', 'Agent orchestration'],
      responsabilites: ['Interprétation réglementaire automatique', 'Compliance scoring continu', 'Inspection simulation', 'Recommandations personnalisées', 'Confidence scoring'],
    },
    {
      nom: 'Layer 4 — Automation Layer (n8n)',
      description: 'Orchestration des workflows : ingestion → interprétation → alerte → rapport → distribution.',
      technologies: ['n8n', 'Supabase Edge Functions', 'Webhook system', 'Email/Slack/Teams connectors'],
      responsabilites: ['Workflow ingestion réglementaire', 'Pipeline scoring mensuel', 'Génération automatique rapports', 'Distribution multi-canal', 'Monitoring + retry'],
    },
    {
      nom: 'Layer 5 — Client Applications',
      description: 'Interfaces utilisateurs : dashboards, alertes, API, portails clients.',
      technologies: ['React 19 + TailwindCSS', 'Supabase Realtime', 'REST/GraphQL API', 'PWA / Mobile responsive'],
      responsabilites: ['Dashboard conformité', 'Portail client SaaS', 'Alertes & notifications', 'API publique', 'SSO / Authentification'],
    },
  ],
  flux_donnees: [
    'Sources officielles → Layer 1 (PostgreSQL + pgVector)',
    'Layer 1 → Layer 2 (Knowledge Graph) : Relations extraites',
    'Layer 1 + Layer 2 → Layer 3 (AI) : RAG + scoring',
    'Layer 3 → Layer 4 (n8n) : Déclenchement workflows',
    'Layer 4 → Layer 5 (Apps) : Distribution + dashboards',
  ],
};

// ═══════════ PHASE 3 — KNOWLEDGE GRAPH UPGRADE (common) ═══════════

const PHASE3_COMMON: Phase3Data = {
  chaine_tracabilite: ['Autorité', 'Réglementation', 'Article', 'Obligation', 'Contrôle', 'Preuve', 'Risque', 'Score'],
  schema_relations: [
    { source: 'AUTORITY', relation: 'EMITS', cible: 'REGULATION' },
    { source: 'REGULATION', relation: 'CONTAINS', cible: 'ARTICLE' },
    { source: 'ARTICLE', relation: 'CREATES', cible: 'OBLIGATION' },
    { source: 'OBLIGATION', relation: 'REQUIRES', cible: 'CONTROL' },
    { source: 'CONTROL', relation: 'NEEDS', cible: 'EVIDENCE' },
    { source: 'CONTROL', relation: 'MITIGATES', cible: 'RISK' },
    { source: 'EVIDENCE', relation: 'PROVES', cible: 'COMPLIANCE' },
    { source: 'COMPLIANCE', relation: 'GENERATES', cible: 'SCORE' },
  ],
  regle_fondamentale: 'Rien ne peut exister sans source traçable. Chaque score, conclusion ou recommandation doit pouvoir être remonté jusqu\'à l\'article réglementaire source. Si la source est indisponible, le système retourne "MISSING REGULATORY SOURCE" au lieu d\'inférer.',
};

// ═══════════ PHASE 4 — AI AGENT REORGANIZATION (common) ═══════════

const PHASE4_COMMON: Phase4Data = {
  agents: [
    {
      id: 'TO-AGENT-01', nom: 'Regulatory Intelligence Agent™',
      mission: 'Veille, ingestion, interprétation et classification automatique de toute nouvelle réglementation.',
      inputs: ['Sources officielles (COBAC, BEAC, BCEAO, GABAC, GAFI)', 'Journaux officiels', 'Historique textes'],
      outputs: ['Alertes réglementaires classifiées', 'Notes d\'interprétation', 'Matrice applicabilité', 'Briefs exécutifs'],
      kpis: ['Délai détection < 2h', 'Précision classification > 95%', 'Couverture sources > 98%'],
      confidence_min: 92,
    },
    {
      id: 'TO-AGENT-02', nom: 'Due Diligence Agent™',
      mission: 'Analyse réglementaire complète pour due diligence investisseur : scoring, gaps, risques, recommandations.',
      inputs: ['Documents institutionnels', 'Registres réglementaires', 'Historique inspection', 'Politiques internes'],
      outputs: ['KOS Investability Score™', 'Gap analysis P0-P3', 'Risk matrix', 'Rapport DD board-ready'],
      kpis: ['Délai rapport < 5 jours', 'Exhaustivité > 90%', 'Satisfaction client > 4.5/5'],
      confidence_min: 88,
    },
    {
      id: 'TO-AGENT-03', nom: 'Compliance Scoring Agent™',
      mission: 'Calcul continu du score de conformité multi-axes avec alertes en cas de dégradation.',
      inputs: ['Données institution', 'Matrice contrôles', 'Preuves conformité', 'Historique scores'],
      outputs: ['Score Global + 5 axes', 'Tendances et alertes', 'Benchmark sectoriel', 'Recommendations'],
      kpis: ['Recalcul < 5min après changement', 'Précision vs audit humain > 90%', 'Disponibilité > 99.9%'],
      confidence_min: 90,
    },
    {
      id: 'TO-AGENT-04', nom: 'Observatory Research Agent™',
      mission: 'Collecte, agrégation et analyse des données sectorielles pour les observatoires. Production de rapports, indices et benchmarks.',
      inputs: ['Données publiques régulateurs', 'Données partenaires', 'Enquêtes standardisées', 'Historique observatoires'],
      outputs: ['Rapports trimestriels/annuels', 'Indices KOS', 'Benchmarks sectoriels', 'Data visualizations'],
      kpis: ['Rapports publiés à date > 98%', 'Qualité données > 95%', 'Citations médias > 20/an'],
      confidence_min: 85,
    },
    {
      id: 'TO-AGENT-05', nom: 'Executive Advisory Agent™',
      mission: 'Synthèse exécutive, recommandations board-ready et support décisionnel pour COMEX et CA.',
      inputs: ['Outputs tous agents', 'Profil institution', 'Objectifs stratégiques', 'Contexte marché'],
      outputs: ['Rapport board-ready PDF', 'Dashboard exécutif', 'Recommandations P0-P3', 'Roadmap 12-24 mois'],
      kpis: ['Délai rapport < 24h', 'Recommandations actionnables > 85%', 'Satisfaction DG > 4.7/5'],
      confidence_min: 85,
    },
  ],
  agents_elimines: 120,
};

// ═══════════ PHASE 5 — WEBSITE REORGANIZATION (common) ═══════════

const PHASE5_COMMON: Phase5Data = {
  sections: [
    {
      nom: 'Intelligence Center',
      pages: ['Regulatory Watch Dashboard', 'Executive Briefs', 'Compliance Radar', 'Interpretation Notes'],
      fonction_conversion: 'Abonnement freemium → Premium',
      lead_magnet: 'Essai gratuit Regulatory Watch 14 jours',
    },
    {
      nom: 'Regulatory Observatory',
      pages: ['COBAC Observatory', 'BCEAO Observatory', 'FinTech Observatory', 'Governance Observatory', 'AML/CFT Observatory'],
      fonction_conversion: 'Abonnement annuel observatoire',
      lead_magnet: 'Rapport trimestriel gratuit (édition précédente)',
    },
    {
      nom: 'Due Diligence Hub',
      pages: ['Regulatory Due Diligence', 'Compliance Due Diligence', 'Governance Due Diligence', 'KOS Investability Score™', 'Case Studies'],
      fonction_conversion: 'Demande de devis / Consultation gratuite',
      lead_magnet: 'Mini due diligence express gratuite (3 risques)',
    },
    {
      nom: 'SaaS Platform',
      pages: ['Regulatory Watch SaaS', 'Compliance Score SaaS', 'Inspection Simulator SaaS', 'Governance Monitor SaaS', 'Pricing', 'API Documentation'],
      fonction_conversion: 'Essai gratuit → Abonnement',
      lead_magnet: '14 jours d\'essai gratuit Professional',
    },
    {
      nom: 'Executive Insights',
      pages: ['Blog — Regulatory Intelligence', 'Whitepapers', 'Webinars', 'Events'],
      fonction_conversion: 'Téléchargement whitepaper → Lead nurturing',
      lead_magnet: 'Whitepaper annuel "State of African Financial Regulation"',
    },
    {
      nom: 'Subscription Portal',
      pages: ['Mon compte', 'Mes abonnements', 'Facturation', 'Gestion seats', 'API Keys'],
      fonction_conversion: 'Upgrade / Renouvellement',
      lead_magnet: 'Add-on gratuit 1 mois (parrainage)',
    },
  ],
  strategie_contenu: [
    'Blog : 2 articles/semaine — Interprétations réglementaires, analyses secteur',
    'Whitepaper annuel : "State of African Financial Regulation" — Lead magnet premium',
    'Webinar mensuel : Expert réglementaire + client témoignage',
    'Newsletter hebdomadaire : Top 5 alertes réglementaires de la semaine',
    'Réseaux sociaux : Extraits briefs, infographies réglementaires, citations experts',
    'SEO : Ciblage mots-clés "[pays] conformité [secteur]", "réglementation [autorité] 2026"',
  ],
};

// ═══════════ PHASE 6 — MONETIZATION ENGINE (common) ═══════════

const PHASE6_COMMON: Phase6Data = {
  hierarchie_revenus: [
    '1. SaaS subscriptions — MRR prioritaire (BU3)',
    '2. Observatory subscriptions — Revenu récurrent annuel (BU4)',
    '3. Due diligence engagements — Revenu transactionnel haute valeur (BU2)',
    '4. Intelligence subscriptions — MRR secondaire (BU1)',
  ],
  flux: [
    {
      priorite: 1, type: 'RegTech SaaS — Abonnements mensuels',
      description: 'Abonnements KOS Regulatory Watch™, Compliance Score™, Inspection Simulator™, Governance Monitor™',
      prix_mensuel_eur: 1490, abonnes_cibles: 150, revenu_mensuel_projete_eur: 223500, marge_pct: 82,
    },
    {
      priorite: 2, type: 'Observatory — Abonnements annuels',
      description: 'Accès aux 4 observatoires + rapports trimestriels + données brutes',
      prix_mensuel_eur: 2500, abonnes_cibles: 40, revenu_mensuel_projete_eur: 100000, marge_pct: 75,
    },
    {
      priorite: 3, type: 'Due Diligence — Engagements transactionnels',
      description: 'Due diligence réglementaire, LBC/FT, gouvernance, rapports express',
      prix_mensuel_eur: 17500, abonnes_cibles: 5, revenu_mensuel_projete_eur: 87500, marge_pct: 55,
    },
    {
      priorite: 4, type: 'Regulatory Intelligence — Abonnements',
      description: 'Regulatory Watch freemium, Executive Briefs, Compliance Radar, Interpretation Notes',
      prix_mensuel_eur: 490, abonnes_cibles: 80, revenu_mensuel_projete_eur: 39200, marge_pct: 78,
    },
  ],
  revenu_total_mensuel_projete_eur: 450200,
};

// ═══════════ PHASE 7 — EXECUTION ROADMAP (common) ═══════════

const PHASE7_COMMON: Phase7Data = {
  phases: [
    {
      periode: '90 Jours — Fondations & Quick Wins',
      objectifs: ['Lancement BU1 — Regulatory Watch™ MVP', 'Migration base réglementaire vers PostgreSQL + pgVector', '3 premiers clients SaaS (beta testers)', 'Site web transformé : landing page plateforme (plus cabinet)', 'Réallocation 50% ressources consulting → SaaS'],
      livrables: ['Regulatory Watch™ SaaS MVP (COBAC + BCEAO)', 'Knowledge Graph v1 (1000+ textes)', 'Nouveau site web plateforme', '3 lettres de mission SaaS signées', 'Plan de communication repositionnement'],
      kpis: ['3 clients SaaS beta', '1000 textes indexés', 'MRR > 3 000€', 'Trafic site +50%'],
      risques: ['Résistance interne équipe consulting', 'Retard ingestion données réglementaires', 'Clients beta insatisfaits'],
      ressources: 'Équipe tech 4 pers. + 2 experts réglementaires + 1 growth marketer. Budget : 80k€',
    },
    {
      periode: '180 Jours — Scale & Monetization',
      objectifs: ['BU3 full launch — 4 produits SaaS', 'BU2 — Lancement Due Diligence Engine', 'BU4 — Premier rapport Observatory', '20 clients SaaS payants', 'MRR > 25 000€'],
      livrables: ['4 produits SaaS en production', 'KOS Investability Score™ opérationnel', 'Premier rapport Observatory COBAC', 'Portail client SaaS (onboarding, billing, support)', 'API publique v1'],
      kpis: ['20 clients SaaS', 'MRR > 25 000€', '3 due diligences vendues', 'NPS > 50'],
      risques: ['Churn élevé premiers clients', 'Qualité due diligence insuffisante', 'Retard développements SaaS'],
      ressources: 'Équipe tech 8 pers. + 4 experts réglementaires + 2 sales + 1 CSM. Budget : 200k€',
    },
    {
      periode: '365 Jours — Domination & Profitabilité',
      objectifs: ['100 clients SaaS (tous tiers)', 'Observatory : 4 observatoires actifs, 15 rapports/an', 'Due Diligence : 20 engagements/an', 'MRR > 150 000€', 'Revenu récurrent > 70% du CA total', 'Reconnaissance : cité par COBAC/BCEAO comme référence'],
      livrables: ['Plateforme SaaS mature (99.9% uptime)', '4 observatoires avec publications régulières', 'KOS Investability Score™ reconnu par 10+ investisseurs', 'Équipe 25 personnes (tech, experts, sales, CS)', 'Bureau CEMAC + Bureau UEMOA'],
      kpis: ['100 clients SaaS', 'MRR > 150 000€', 'ARR > 1.8M€', '70% CA recurring', 'NPS > 60', '10 citations médias/an'],
      risques: ['Concurrence entrant sur le marché', 'Évolution réglementaire majeure non anticipée', 'Difficultés recrutement talents'],
      ressources: 'Équipe 25 pers. Budget annuel : 1.2M€. Série A envisagée.',
    },
  ],
};

// ═══════════════════════ BUILD DELIVERABLES ═══════════════════════

export const TRANSFORMATION_DELIVERABLES: TransformationDeliverable[] = TRANSFORMATION_SCENARIOS.map(scenario => {
  const p1 = PHASE1_PER_SCENARIO[scenario.id] || PHASE1_PER_SCENARIO['TFO-001'];

  return {
    scenario,
    phase1: p1,
    bu1: BU1_COMMON,
    bu2: BU2_COMMON,
    bu3: BU3_COMMON,
    bu4: BU4_COMMON,
    phase2: PHASE2_COMMON,
    phase3: PHASE3_COMMON,
    phase4: PHASE4_COMMON,
    phase5: PHASE5_COMMON,
    phase6: PHASE6_COMMON,
    phase7: PHASE7_COMMON,
    metadata: {
      to_id: `KOS-TO-${scenario.id}`,
      date_transformation: '2026-06-24',
      version: 'v1.0',
      score_transformation: scenario.score_transformation,
    },
  };
});

export const TRANSFORMATION_AGENTS = [
  { id: 'to-01', nom: 'Regulatory Intelligence Agent™', mission: 'Veille, ingestion et interprétation automatique de toute nouvelle réglementation COBAC, BEAC, BCEAO, GABAC, GAFI', statut: 'active', icon: 'ri-radar-line' },
  { id: 'to-02', nom: 'Due Diligence Agent™', mission: 'Analyse réglementaire complète pour due diligence investisseur — KOS Investability Score™', statut: 'active', icon: 'ri-search-eye-line' },
  { id: 'to-03', nom: 'Compliance Scoring Agent™', mission: 'Calcul continu du score de conformité multi-axes avec alertes dégradation', statut: 'active', icon: 'ri-bar-chart-2-line' },
  { id: 'to-04', nom: 'Observatory Research Agent™', mission: 'Collecte, agrégation et analyse données sectorielles — Rapports, indices, benchmarks', statut: 'active', icon: 'ri-line-chart-line' },
  { id: 'to-05', nom: 'Executive Advisory Agent™', mission: 'Synthèses exécutives board-ready et recommandations COMEX/CA', statut: 'active', icon: 'ri-briefcase-line' },
];

export const TRANSFORMATION_KPIS = {
  scenarios: 4,
  business_units: 4,
  produits_bu1: 4,
  produits_bu2: 4,
  produits_bu3: 4,
  observatoires: 4,
  phases_execution: 7,
  agents_essentiels: 5,
  agents_elimines: 120,
  couches_technologiques: 5,
  revenue_streams: 4,
  revenu_mensuel_projete_eur: 450200,
  mrr_cible_12mois_eur: 210000,
  revenu_recurrent_cible_pct: 70,
};





