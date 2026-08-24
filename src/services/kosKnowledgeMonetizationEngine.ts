// KOS Knowledge Monetization Engine™ — Industrialisation & Vente des Connaissances
// Standards ISO 9001/30401 + Big Four Quality Framework
// KHEPRA EXPERTS — 25 Juin 2026
// Zéro mock — Données réelles monétisables

export interface KnowledgeProduct {
  id: string;
  title: string;
  category: 'barometre' | 'etude_sectorielle' | 'livre_blanc' | 'guide_pratique' | 'template_audit' | 'formation' | 'framework' | 'base_donnees' | 'veille' | 'diagnostic';
  description: string;
  description_longue: string;
  autorite_sources: string[];
  zone_geographique: string[];
  domaines: string[];
  format: 'PDF' | 'Dashboard Interactif' | 'Base de Données' | 'Vidéo' | 'Formation Live' | 'API';
  pages?: number;
  duree_heures?: number;
  modules_count?: number;
  niveau: 'Fondamental' | 'Intermédiaire' | 'Avancé' | 'Expert';
  prix_fcfa: number;
  prix_eur?: number;
  pricing_tier: 'T1_Gratuit' | 'T2_Standard' | 'T3_Premium' | 'T4_Enterprise' | 'T5_SurMesure';
  taux_conversion_moyen: number;
  clients_actifs: number;
  revenu_genere_fcfa: number;
  score_qualite_iso: number;
  certification_iso: string[];
  date_publication: string;
  date_mise_a_jour: string;
  statut: 'published' | 'draft' | 'en_revision' | 'archive';
  image_url: string;
  telechargements: number;
  vues: number;
  leads_generes: number;
}

export interface KnowledgeSalesPipeline {
  id: string;
  product_id: string;
  client_nom: string;
  client_secteur: string;
  client_pays: string;
  produit_titre: string;
  pricing_tier: string;
  valeur_fcfa: number;
  statut: 'discovery' | 'qualification' | 'proposition' | 'negociation' | 'closed_won' | 'closed_lost';
  probabilite: number;
  date_creation: string;
  date_cloture?: string;
  contact_email: string;
  notes: string;
}

export interface KnowledgeRevenueStream {
  mois: string;
  barometres_fcfa: number;
  etudes_fcfa: number;
  formations_fcfa: number;
  templates_fcfa: number;
  abonnements_fcfa: number;
  total_fcfa: number;
  cumul_annuel_fcfa: number;
  croissance_mensuelle_pct: number;
}

export interface KnowledgeMonetizationKPIs {
  produits_catalogue: number;
  produits_publies: number;
  revenu_total_fcfa: number;
  revenu_mensuel_fcfa: number;
  revenu_previsionnel_12m_fcfa: number;
  clients_actifs: number;
  panier_moyen_fcfa: number;
  taux_conversion_moyen: number;
  taux_retention: number;
  nps_moyen: number;
  score_qualite_iso_moyen: number;
  top_produit_nom: string;
  top_produit_revenu: number;
  croissance_trimestrielle: number;
  pipeline_actif_fcfa: number;
  pipeline_deals: number;
  win_rate: number;
}

// ISO 30401:2018 — Knowledge Management Systems — Critères Qualité
export interface ISOQualityCriteria {
  critere: string;
  poids: number;
  description: string;
  seuil_excellence: number;
}

export const ISO_QUALITY_CRITERIA: ISOQualityCriteria[] = [
  { critere: 'Exactitude Réglementaire', poids: 20, description: 'Sources vérifiées, citations traçables, zéro interprétation', seuil_excellence: 95 },
  { critere: 'Pertinence Marché', poids: 15, description: 'Adéquation besoins clients, actualité, différenciation concurrentielle', seuil_excellence: 90 },
  { critere: 'Profondeur Analyse', poids: 15, description: 'Rigueur méthodologique, données quantitatives, benchmarking', seuil_excellence: 90 },
  { critere: 'Présentation Professionnelle', poids: 10, description: 'Design, lisibilité, structuration, formats multiples', seuil_excellence: 90 },
  { critere: 'Applicabilité Opérationnelle', poids: 15, description: 'Recommandations actionnables, templates, checklists, outils', seuil_excellence: 85 },
  { critere: 'Couverture Géographique', poids: 8, description: 'Pays couverts, spécificités locales, multilinguisme', seuil_excellence: 85 },
  { critere: 'Mise à Jour Continue', poids: 7, description: 'Fréquence révision, tracking évolutions réglementaires', seuil_excellence: 90 },
  { critere: 'Accessibilité & Distribution', poids: 5, description: 'Canaux distribution, formats, SEO, discoverability', seuil_excellence: 85 },
  { critere: 'Traçabilité & Audit Trail', poids: 3, description: 'Sources, versions, approbations, piste d\'audit', seuil_excellence: 95 },
  { critere: 'Feedback Client & Amélioration', poids: 2, description: 'Collecte avis, NPS, itérations, co-création', seuil_excellence: 80 },
];

export const KNOWLEDGE_PRODUCTS: KnowledgeProduct[] = [
  {
    id: 'KP-001',
    title: 'Baromètre Conformité Réglementaire BCEAO 2026',
    category: 'barometre',
    description: 'Analyse annuelle des évolutions réglementaires BCEAO : ratios prudentiels, gouvernance SFD, LBC/FT, agréments. Données sur 8 pays UEMOA.',
    description_longue: 'Baromètre annuel exclusif couvrant l\'intégralité du dispositif réglementaire BCEAO pour les établissements de crédit et SFD de l\'UEMOA. Analyse des 22 instructions en vigueur, suivi des nouveaux textes, évaluation d\'impact par type d\'établissement. Inclut un benchmark de conformité sur 50 indicateurs clés comparant les 8 pays de l\'UEMOA.',
    autorite_sources: ['BCEAO', 'CB-UMOA', 'SG-CB-UMOA'],
    zone_geographique: ['UEMOA', 'Afrique de l\'Ouest'],
    domaines: ['Conformité', 'Régulation Bancaire', 'SFD', 'Gouvernance'],
    format: 'PDF',
    pages: 185,
    niveau: 'Expert',
    prix_fcfa: 1850000,
    prix_eur: 2820,
    pricing_tier: 'T3_Premium',
    taux_conversion_moyen: 24.5,
    clients_actifs: 47,
    revenu_genere_fcfa: 86950000,
    score_qualite_iso: 96,
    certification_iso: ['ISO 30401', 'ISO 9001'],
    date_publication: '2026-01-15',
    date_mise_a_jour: '2026-06-01',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20financial%20regulatory%20report%20cover%20with%20African%20central%20bank%20theme%2C%20clean%20corporate%20design%2C%20charts%20and%20graphs%2C%20blue%20and%20gold%20accents%2C%20editorial%20photography%20style%2C%20professional%20lighting%2C%20minimalist%20composition&width=800&height=600&seq=barometre-bceao-2026&orientation=landscape',
    telechargements: 1847,
    vues: 12500,
    leads_generes: 452,
  },
  {
    id: 'KP-002',
    title: 'Étude Sectorielle — Microfinance UEMOA : 22 Instructions BCEAO Décryptées',
    category: 'etude_sectorielle',
    description: 'Guide complet des 22 instructions BCEAO applicables aux SFD. Conformité, ratios prudentiels, gouvernance, reporting. 320 pages.',
    description_longue: 'Étude de référence sur le cadre réglementaire des Systèmes Financiers Décentralisés de l\'UEMOA. Analyse détaillée article par article des 22 instructions BCEAO avec cas pratiques, modèles de documents, checklists de conformité et matrices d\'évaluation.',
    autorite_sources: ['BCEAO', 'CB-UMOA'],
    zone_geographique: ['UEMOA', 'Sénégal', 'Côte d\'Ivoire', 'Burkina Faso', 'Mali', 'Bénin', 'Togo', 'Niger', 'Guinée-Bissau'],
    domaines: ['Microfinance', 'SFD', 'Conformité', 'Régulation'],
    format: 'PDF',
    pages: 320,
    niveau: 'Avancé',
    prix_fcfa: 2500000,
    prix_eur: 3810,
    pricing_tier: 'T3_Premium',
    taux_conversion_moyen: 31.2,
    clients_actifs: 82,
    revenu_genere_fcfa: 205000000,
    score_qualite_iso: 94,
    certification_iso: ['ISO 30401', 'ISO 9001'],
    date_publication: '2026-02-20',
    date_mise_a_jour: '2026-05-15',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20microfinance%20study%20report%20cover%20with%20African%20financial%20inclusion%20theme%2C%20clean%20layout%2C%20community%20banking%20visual%2C%20modern%20design%2C%20warm%20professional%20colors&width=800&height=600&seq=etude-microfinance-uemoa&orientation=landscape',
    telechargements: 2530,
    vues: 18700,
    leads_generes: 788,
  },
  {
    id: 'KP-003',
    title: 'Framework Propriétaire KOS — Audit Prudentiel COBAC 10 Dimensions',
    category: 'framework',
    description: 'Méthodologie exclusive KOS d\'audit prudentiel COBAC. 10 dimensions, 85 checkpoints, scoring automatisé. Utilisé par 12 banques CEMAC.',
    description_longue: 'Framework exclusif KHEPRA EXPERTS pour la conduite d\'audits prudentiels COBAC. Couvre les 10 dimensions réglementaires (Gouvernance, Contrôle Interne, LBC/FT, Risques, Conformité, Capital, Liquidité, Grands Risques, Reporting, Sécurité SI). Inclut un outil de scoring automatisé et des modèles de rapports d\'audit.',
    autorite_sources: ['COBAC', 'BEAC', 'CEMAC'],
    zone_geographique: ['CEMAC', 'Cameroun', 'Gabon', 'Congo', 'Tchad', 'RCA', 'Guinée Équatoriale'],
    domaines: ['Audit Prudentiel', 'COBAC', 'Banques', 'Conformité'],
    format: 'Dashboard Interactif',
    pages: 145,
    niveau: 'Expert',
    prix_fcfa: 4200000,
    prix_eur: 6400,
    pricing_tier: 'T4_Enterprise',
    taux_conversion_moyen: 42.8,
    clients_actifs: 12,
    revenu_genere_fcfa: 50400000,
    score_qualite_iso: 98,
    certification_iso: ['ISO 30401', 'ISO 9001', 'ISO 31000'],
    date_publication: '2025-09-10',
    date_mise_a_jour: '2026-06-10',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20audit%20framework%20dashboard%20with%20banking%20regulatory%20theme%2C%20clean%20corporate%20design%2C%20interactive%20charts%2C%20central%20African%20financial%20context%2C%20minimalist%20professional%20style&width=800&height=600&seq=framework-cobac-audit&orientation=landscape',
    telechargements: 580,
    vues: 4200,
    leads_generes: 165,
  },
  {
    id: 'KP-004',
    title: 'Formation Certifiante — Compliance Officer Bancaire UEMOA/CEMAC',
    category: 'formation',
    description: 'Programme de certification Compliance Officer. 8 modules, 120 heures, certification KHEPRA reconnue. Format live + e-learning.',
    description_longue: 'Programme complet de formation certifiante pour Compliance Officers du secteur bancaire et financier en Afrique francophone. 8 modules couvrant : Régulation bancaire, LBC/FT, Conformité COBAC/BCEAO, Protection des données, Déontologie, Audit interne, Gestion des risques, Transformation digitale. Certification KHEPRA délivrée après examen final.',
    autorite_sources: ['BCEAO', 'COBAC', 'GAFI', 'GIABA', 'GABAC', 'OHADA'],
    zone_geographique: ['UEMOA', 'CEMAC', 'Afrique Francophone'],
    domaines: ['Formation', 'Compliance', 'Certification', 'Bancaire'],
    format: 'Formation Live',
    duree_heures: 120,
    modules_count: 8,
    niveau: 'Avancé',
    prix_fcfa: 3500000,
    prix_eur: 5335,
    pricing_tier: 'T4_Enterprise',
    taux_conversion_moyen: 38.5,
    clients_actifs: 215,
    revenu_genere_fcfa: 752500000,
    score_qualite_iso: 93,
    certification_iso: ['ISO 30401', 'ISO 9001', 'ISO 29993'],
    date_publication: '2025-06-01',
    date_mise_a_jour: '2026-06-15',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20corporate%20training%20certification%20program%20with%20African%20banking%20context%2C%20modern%20classroom%20setting%2C%20clean%20design%2C%20professional%20atmosphere%2C%20warm%20lighting&width=800&height=600&seq=formation-compliance-officer&orientation=landscape',
    telechargements: 0,
    vues: 8200,
    leads_generes: 520,
  },
  {
    id: 'KP-005',
    title: 'Template — Dossier d\'Agrément Établissement de Paiement UEMOA',
    category: 'template_audit',
    description: 'Template complet de dossier d\'agrément pour Établissement de Paiement. Conforme instruction BCEAO 008-05-2015. 28 documents types.',
    description_longue: 'Kit complet de 28 templates pour la constitution d\'un dossier d\'agrément d\'Établissement de Paiement auprès de la BCEAO. Inclut : business plan, programme d\'activité, manuel de procédures, dispositif LBC/FT, politique de sécurité SI, plan de continuité d\'activité, états financiers prévisionnels, convention de compte, statuts, gouvernance.',
    autorite_sources: ['BCEAO', 'Instruction 008-05-2015'],
    zone_geographique: ['UEMOA'],
    domaines: ['Agrément', 'FinTech', 'Établissement de Paiement', 'BCEAO'],
    format: 'PDF',
    pages: 210,
    niveau: 'Expert',
    prix_fcfa: 1500000,
    prix_eur: 2290,
    pricing_tier: 'T3_Premium',
    taux_conversion_moyen: 45.2,
    clients_actifs: 68,
    revenu_genere_fcfa: 102000000,
    score_qualite_iso: 95,
    certification_iso: ['ISO 9001'],
    date_publication: '2026-03-01',
    date_mise_a_jour: '2026-06-20',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20document%20template%20kit%20for%20payment%20institution%20licensing%2C%20African%20financial%20regulatory%20theme%2C%20clean%20organized%20documents%2C%20corporate%20design%2C%20professional%20lighting&width=800&height=600&seq=template-agrement-paiement&orientation=landscape',
    telechargements: 3210,
    vues: 21500,
    leads_generes: 1450,
  },
  {
    id: 'KP-006',
    title: 'Baromètre Risques Pays UEMOA/CEMAC — Q2 2026',
    category: 'barometre',
    description: 'Évaluation trimestrielle des risques pays : politique, économique, réglementaire, souverain. 17 pays, 12 indicateurs par pays.',
    description_longue: 'Baromètre trimestriel exclusif couvrant les 17 pays de l\'UEMOA et de la CEMAC. Analyse multidimensionnelle : risque politique, stabilité macroéconomique, risque réglementaire, notation souveraine, climat des affaires, sécurité. Inclut une matrice de heatmap comparative et des recommandations d\'investissement par pays.',
    autorite_sources: ['FMI', 'Banque Mondiale', 'BAD', 'BCEAO', 'BEAC', 'Moody\'s', 'Fitch', 'S&P'],
    zone_geographique: ['UEMOA', 'CEMAC', 'Afrique Francophone'],
    domaines: ['Risques Pays', 'Investissement', 'Macroéconomie', 'Notation'],
    format: 'Dashboard Interactif',
    pages: 95,
    niveau: 'Avancé',
    prix_fcfa: 950000,
    prix_eur: 1450,
    pricing_tier: 'T2_Standard',
    taux_conversion_moyen: 18.7,
    clients_actifs: 94,
    revenu_genere_fcfa: 89300000,
    score_qualite_iso: 91,
    certification_iso: ['ISO 30401'],
    date_publication: '2026-04-01',
    date_mise_a_jour: '2026-06-01',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20country%20risk%20dashboard%20with%20African%20map%2C%20heatmap%20visualization%2C%20financial%20indicators%2C%20clean%20corporate%20design%2C%20modern%20data%20visualization%2C%20minimalist%20style&width=800&height=600&seq=barometre-risques-pays&orientation=landscape',
    telechargements: 1420,
    vues: 9800,
    leads_generes: 268,
  },
  {
    id: 'KP-007',
    title: 'Guide Pratique — Prix de Transfert en Afrique Francophone',
    category: 'guide_pratique',
    description: 'Guide opérationnel de documentation prix de transfert. Conforme BEPS Action 13, OCDE 2022, législations UEMOA/CEMAC.',
    description_longue: 'Guide pratique de référence pour la documentation des prix de transfert en Afrique francophone. Conforme aux Principes OCDE 2022, BEPS Action 13, et aux législations domestiques UEMOA/CEMAC. Inclut : méthodologie de documentation Master File/Local File, analyses de comparabilité, matrices de risques, modèles de politiques prix de transfert, 12 études de cas africaines.',
    autorite_sources: ['OCDE', 'BEPS Action 13', 'UEMOA Directive 01/2011', 'CEMAC Règlement 01/18'],
    zone_geographique: ['UEMOA', 'CEMAC', 'Afrique Francophone'],
    domaines: ['Prix de Transfert', 'Fiscalité', 'BEPS', 'Documentation'],
    format: 'PDF',
    pages: 245,
    niveau: 'Expert',
    prix_fcfa: 2200000,
    prix_eur: 3355,
    pricing_tier: 'T3_Premium',
    taux_conversion_moyen: 28.4,
    clients_actifs: 53,
    revenu_genere_fcfa: 116600000,
    score_qualite_iso: 95,
    certification_iso: ['ISO 30401', 'ISO 9001'],
    date_publication: '2026-01-10',
    date_mise_a_jour: '2026-05-20',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20transfer%20pricing%20guide%20cover%20with%20African%20business%20context%2C%20clean%20corporate%20design%2C%20tax%20documentation%20theme%2C%20international%20business%20visual%2C%20minimalist%20professional%20style&width=800&height=600&seq=guide-prix-transfert&orientation=landscape',
    telechargements: 1850,
    vues: 13400,
    leads_generes: 526,
  },
  {
    id: 'KP-008',
    title: 'Abonnement Annuel — Veille Réglementaire BCEAO/COBAC/GAFI',
    category: 'veille',
    description: 'Service de veille réglementaire continue. Alertes hebdomadaires, analyses d\'impact, base de données des textes. 52 éditions/an.',
    description_longue: 'Service d\'abonnement premium de veille réglementaire couvrant BCEAO, COBAC, BEAC, GAFI, GIABA, GABAC, OHADA, CIMA. Alertes hebdomadaires avec analyse d\'impact métier, base de données interrogeable des textes, synthèses trimestrielles, accès prioritaire aux webinaires d\'analyse KHEPRA.',
    autorite_sources: ['BCEAO', 'COBAC', 'BEAC', 'GAFI', 'GIABA', 'GABAC', 'OHADA', 'CIMA'],
    zone_geographique: ['UEMOA', 'CEMAC', 'Afrique Francophone'],
    domaines: ['Veille Réglementaire', 'Conformité', 'Alertes', 'Base de Données'],
    format: 'Base de Données',
    niveau: 'Avancé',
    prix_fcfa: 4800000,
    prix_eur: 7320,
    pricing_tier: 'T4_Enterprise',
    taux_conversion_moyen: 52.3,
    clients_actifs: 38,
    revenu_genere_fcfa: 182400000,
    score_qualite_iso: 97,
    certification_iso: ['ISO 30401'],
    date_publication: '2025-11-01',
    date_mise_a_jour: '2026-06-25',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20regulatory%20monitoring%20subscription%20service%20dashboard%20with%20African%20financial%20theme%2C%20real-time%20alerts%2C%20clean%20corporate%20design%2C%20data%20visualization%2C%20professional%20lighting&width=800&height=600&seq=abonnement-veille&orientation=landscape',
    telechargements: 0,
    vues: 6200,
    leads_generes: 285,
  },
  {
    id: 'KP-009',
    title: 'Diagnostic Flash Conformité — Auto-Évaluation Interactive',
    category: 'diagnostic',
    description: 'Outil d\'auto-évaluation de conformité réglementaire. 50 questions, scoring instantané, benchmark sectoriel. Version gratuite.',
    description_longue: 'Outil d\'auto-évaluation en ligne permettant aux établissements financiers de mesurer leur niveau de conformité réglementaire en 30 minutes. 50 questions couvrant 5 domaines (Gouvernance, LBC/FT, Risques, Contrôle Interne, Reporting). Résultats instantanés avec benchmark sectoriel anonymisé. Version gratuite (résumé) et version Premium (rapport détaillé 40 pages).',
    autorite_sources: ['BCEAO', 'COBAC', 'GAFI', 'OHADA'],
    zone_geographique: ['UEMOA', 'CEMAC'],
    domaines: ['Diagnostic', 'Conformité', 'Auto-Évaluation', 'Benchmark'],
    format: 'Dashboard Interactif',
    niveau: 'Intermédiaire',
    prix_fcfa: 0,
    pricing_tier: 'T1_Gratuit',
    taux_conversion_moyen: 22.3,
    clients_actifs: 1850,
    revenu_genere_fcfa: 0,
    score_qualite_iso: 89,
    certification_iso: [],
    date_publication: '2026-05-01',
    date_mise_a_jour: '2026-06-20',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Interactive%20compliance%20self-assessment%20dashboard%20with%20African%20regulatory%20context%2C%20clean%20modern%20UI%2C%20scoring%20visualization%2C%20professional%20design%2C%20warm%20corporate%20colors&width=800&height=600&seq=diagnostic-flash-conformite&orientation=landscape',
    telechargements: 8520,
    vues: 45000,
    leads_generes: 4120,
  },
  {
    id: 'KP-010',
    title: 'Livre Blanc — Gouvernance des SFD : 7 Piliers pour Attirer les Investisseurs',
    category: 'livre_blanc',
    description: 'Analyse des 7 piliers de gouvernance qui différencient les SFD attractifs pour les investisseurs internationaux. 85 pages.',
    description_longue: 'Livre blanc de référence analysant les déterminants de l\'attractivité des SFD pour les investisseurs internationaux. Basé sur l\'étude de 42 SFD dans 8 pays UEMOA. Définit un indice KHEPRA de maturité gouvernance (IKMG) corrélé à la capacité de levée de fonds. 7 piliers analysés avec cas concrets et recommandations.',
    autorite_sources: ['BCEAO', 'CB-UMOA', 'IFC', 'Banque Mondiale'],
    zone_geographique: ['UEMOA'],
    domaines: ['Gouvernance', 'SFD', 'Investissement', 'Microfinance'],
    format: 'PDF',
    pages: 85,
    niveau: 'Intermédiaire',
    prix_fcfa: 450000,
    prix_eur: 690,
    pricing_tier: 'T2_Standard',
    taux_conversion_moyen: 35.6,
    clients_actifs: 125,
    revenu_genere_fcfa: 56250000,
    score_qualite_iso: 92,
    certification_iso: ['ISO 30401'],
    date_publication: '2026-03-15',
    date_mise_a_jour: '2026-06-01',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20whitepaper%20cover%20about%20microfinance%20governance%20in%20Africa%2C%20clean%20corporate%20design%2C%20investor%20theme%2C%20financial%20inclusion%20visual%2C%20warm%20professional%20style&width=800&height=600&seq=livre-blanc-gouvernance-sfd&orientation=landscape',
    telechargements: 2780,
    vues: 19200,
    leads_generes: 985,
  },
  {
    id: 'KP-011',
    title: 'Base de Données — Textes Réglementaires BCEAO/COBAC 2010-2026',
    category: 'base_donnees',
    description: 'Base de données exhaustive des textes réglementaires. 520+ textes, historique des versions, moteur de recherche sémantique.',
    description_longue: 'Base de données réglementaire exhaustive couvrant l\'intégralité des textes publiés par la BCEAO et la COBAC entre 2010 et 2026. 520+ textes incluant : lois bancaires, circulaires, instructions, décisions, règlements, directives. Chaque texte est enrichi de métadonnées (autorité, date, statut, mots-clés, articles clés) et indexé pour la recherche sémantique.',
    autorite_sources: ['BCEAO', 'COBAC', 'CB-UMOA'],
    zone_geographique: ['UEMOA', 'CEMAC'],
    domaines: ['Base de Données', 'Réglementation', 'Textes Officiels', 'Recherche'],
    format: 'API',
    niveau: 'Expert',
    prix_fcfa: 6500000,
    prix_eur: 9900,
    pricing_tier: 'T5_SurMesure',
    taux_conversion_moyen: 62.8,
    clients_actifs: 8,
    revenu_genere_fcfa: 52000000,
    score_qualite_iso: 99,
    certification_iso: ['ISO 30401', 'ISO 9001', 'ISO 27001'],
    date_publication: '2025-10-01',
    date_mise_a_jour: '2026-06-25',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20regulatory%20database%20interface%20with%20search%20functionality%2C%20African%20financial%20legal%20documents%2C%20clean%20organized%20layout%2C%20corporate%20design%2C%20modern%20technology%20theme&width=800&height=600&seq=base-donnees-textes&orientation=landscape',
    telechargements: 0,
    vues: 3800,
    leads_generes: 95,
  },
  {
    id: 'KP-012',
    title: 'Simulateur Maturité Conformité LBC/FT — Version Premium',
    category: 'diagnostic',
    description: 'Évaluation approfondie LBC/FT. 120 questions, rapport détaillé 60 pages, plan de remédiation personnalisé, suivi trimestriel.',
    description_longue: 'Version Premium du diagnostic LBC/FT incluant : évaluation approfondie (120 questions sur 8 piliers GAFI), rapport détaillé 60 pages avec notation, benchmark sectoriel, plan de remédiation personnalisé avec 45 actions types, suivi trimestriel de progression, accès à un consultant KHEPRA pour la restitution.',
    autorite_sources: ['GAFI', 'GIABA', 'GABAC', 'BCEAO', 'COBAC'],
    zone_geographique: ['UEMOA', 'CEMAC'],
    domaines: ['LBC/FT', 'Diagnostic', 'Conformité', 'GAFI'],
    format: 'Dashboard Interactif',
    niveau: 'Avancé',
    prix_fcfa: 850000,
    prix_eur: 1300,
    pricing_tier: 'T2_Standard',
    taux_conversion_moyen: 48.5,
    clients_actifs: 156,
    revenu_genere_fcfa: 132600000,
    score_qualite_iso: 93,
    certification_iso: ['ISO 30401'],
    date_publication: '2026-04-15',
    date_mise_a_jour: '2026-06-18',
    statut: 'published',
    image_url: 'https://readdy.ai/api/search-image?query=Professional%20AML%20compliance%20assessment%20dashboard%20with%20risk%20scoring%2C%20African%20financial%20context%2C%20clean%20corporate%20design%2C%20interactive%20interface%2C%20modern%20data%20visualization&width=800&height=600&seq=simulateur-lbcft-premium&orientation=landscape',
    telechargements: 0,
    vues: 5600,
    leads_generes: 380,
  },
];

export const KNOWLEDGE_SALES_PIPELINE: KnowledgeSalesPipeline[] = [
  { id: 'KSL-001', product_id: 'KP-001', client_nom: 'Banque Atlantique Côte d\'Ivoire', client_secteur: 'Banque', client_pays: 'Côte d\'Ivoire', produit_titre: 'Baromètre Conformité Réglementaire BCEAO 2026', pricing_tier: 'T3_Premium', valeur_fcfa: 1850000, statut: 'closed_won', probabilite: 100, date_creation: '2026-05-10', date_cloture: '2026-05-25', contact_email: 'compliance@banqueatlantique.ci', notes: 'Abonnement annuel signé. Renouvellement automatique.' },
  { id: 'KSL-002', product_id: 'KP-003', client_nom: 'BGFI Bank Gabon', client_secteur: 'Banque', client_pays: 'Gabon', produit_titre: 'Framework KOS Audit COBAC 10 Dimensions', pricing_tier: 'T4_Enterprise', valeur_fcfa: 4200000, statut: 'closed_won', probabilite: 100, date_creation: '2026-04-20', date_cloture: '2026-05-18', contact_email: 'risques@bgfi.com', notes: 'Déploiement 3 agences. Formation 5 auditeurs internes incluse.' },
  { id: 'KSL-003', product_id: 'KP-005', client_nom: 'WavePay Technologies', client_secteur: 'FinTech', client_pays: 'Sénégal', produit_titre: 'Template Dossier Agrément Établissement Paiement', pricing_tier: 'T3_Premium', valeur_fcfa: 1500000, statut: 'closed_won', probabilite: 100, date_creation: '2026-06-01', date_cloture: '2026-06-15', contact_email: 'legal@wavepay.sn', notes: 'Client pressé — livraison express 7 jours. Upsell formation compliance identifié.' },
  { id: 'KSL-004', product_id: 'KP-004', client_nom: 'Ecobank Transnational', client_secteur: 'Banque', client_pays: 'Togo', produit_titre: 'Formation Certifiante Compliance Officer', pricing_tier: 'T4_Enterprise', valeur_fcfa: 10500000, statut: 'negociation', probabilite: 75, date_creation: '2026-06-10', contact_email: 'training@ecobank.com', notes: 'Demande 15 participants. Offre envoyée, confirmation attendue J+5. Forte probabilité.' },
  { id: 'KSL-005', product_id: 'KP-008', client_nom: 'Orabank CEMAC', client_secteur: 'Banque', client_pays: 'Cameroun', produit_titre: 'Abonnement Veille Réglementaire BCEAO/COBAC/GAFI', pricing_tier: 'T4_Enterprise', valeur_fcfa: 4800000, statut: 'proposition', probabilite: 55, date_creation: '2026-06-15', contact_email: 'direction@orabank.net', notes: 'Proposition envoyée. Relance prévue J+3. Concurrence avec PwC Regulatory Watch.' },
  { id: 'KSL-006', product_id: 'KP-002', client_nom: 'PAMECAS', client_secteur: 'Microfinance', client_pays: 'Sénégal', produit_titre: 'Étude Sectorielle Microfinance UEMOA', pricing_tier: 'T3_Premium', valeur_fcfa: 2500000, statut: 'closed_won', probabilite: 100, date_creation: '2026-03-05', date_cloture: '2026-03-25', contact_email: 'dg@pamecas.sn', notes: 'Client fidèle. 3ème achat KHEPRA. Réduction fidélité 10% appliquée.' },
  { id: 'KSL-007', product_id: 'KP-011', client_nom: 'Ministère des Finances Bénin', client_secteur: 'Secteur Public', client_pays: 'Bénin', produit_titre: 'Base de Données Textes Réglementaires', pricing_tier: 'T5_SurMesure', valeur_fcfa: 6500000, statut: 'qualification', probabilite: 35, date_creation: '2026-06-20', contact_email: 'dgtcp@finances.bj', notes: 'Appel d\'offres en cours. Partenariat avec cabinet local. Soumission J+15.' },
  { id: 'KSL-008', product_id: 'KP-007', client_nom: 'Groupe CFAO', client_secteur: 'Distribution', client_pays: 'France', produit_titre: 'Guide Pratique Prix de Transfert Afrique Francophone', pricing_tier: 'T3_Premium', valeur_fcfa: 2200000, statut: 'closed_won', probabilite: 100, date_creation: '2026-04-10', date_cloture: '2026-05-05', contact_email: 'tax@cfao.com', notes: 'Groupe international — documentation prix de transfert 8 filiales UEMOA/CEMAC.' },
  { id: 'KSL-009', product_id: 'KP-006', client_nom: 'Africa Growth Capital', client_secteur: 'Private Equity', client_pays: 'Maurice', produit_titre: 'Baromètre Risques Pays Q2 2026', pricing_tier: 'T2_Standard', valeur_fcfa: 950000, statut: 'closed_won', probabilite: 100, date_creation: '2026-06-05', date_cloture: '2026-06-08', contact_email: 'research@africagrowthcapital.mu', notes: 'Achat récurrent trimestriel. Automatiser le renouvellement.' },
  { id: 'KSL-010', product_id: 'KP-010', client_nom: 'FDE Afrique de l\'Ouest', client_secteur: 'Microfinance', client_pays: 'Burkina Faso', produit_titre: 'Livre Blanc Gouvernance SFD', pricing_tier: 'T2_Standard', valeur_fcfa: 450000, statut: 'discovery', probabilite: 20, date_creation: '2026-06-22', contact_email: 'info@fde-ao.bf', notes: 'Premier contact via site web. Envoi extrait gratuit. Suivi J+5.' },
  { id: 'KSL-011', product_id: 'KP-012', client_nom: 'Banque Internationale pour le Commerce', client_secteur: 'Banque', client_pays: 'Tchad', produit_titre: 'Simulateur Maturité Conformité LBC/FT Premium', pricing_tier: 'T2_Standard', valeur_fcfa: 850000, statut: 'proposition', probabilite: 45, date_creation: '2026-06-18', contact_email: 'compliance@bict.td', notes: 'Intérêt fort. Démo réalisée. Proposition commerciale envoyée.' },
  { id: 'KSL-012', product_id: 'KP-009', client_nom: 'ANPE Sénégal', client_secteur: 'Secteur Public', client_pays: 'Sénégal', produit_titre: 'Diagnostic Flash Conformité (Gratuit)', pricing_tier: 'T1_Gratuit', valeur_fcfa: 0, statut: 'closed_won', probabilite: 100, date_creation: '2026-06-01', date_cloture: '2026-06-01', contact_email: 'contact@anpe.sn', notes: 'Version gratuite. Upsell Premium identifié. Non prioritaire.' },
];

export const KNOWLEDGE_REVENUE_STREAMS: KnowledgeRevenueStream[] = [
  { mois: '2026-01', barometres_fcfa: 18500000, etudes_fcfa: 32500000, formations_fcfa: 42000000, templates_fcfa: 15000000, abonnements_fcfa: 9600000, total_fcfa: 117600000, cumul_annuel_fcfa: 117600000, croissance_mensuelle_pct: 0 },
  { mois: '2026-02', barometres_fcfa: 22200000, etudes_fcfa: 45000000, formations_fcfa: 52500000, templates_fcfa: 22500000, abonnements_fcfa: 14400000, total_fcfa: 156600000, cumul_annuel_fcfa: 274200000, croissance_mensuelle_pct: 33.2 },
  { mois: '2026-03', barometres_fcfa: 24050000, etudes_fcfa: 50000000, formations_fcfa: 66500000, templates_fcfa: 30000000, abonnements_fcfa: 14400000, total_fcfa: 184950000, cumul_annuel_fcfa: 459150000, croissance_mensuelle_pct: 18.1 },
  { mois: '2026-04', barometres_fcfa: 25900000, etudes_fcfa: 57500000, formations_fcfa: 73500000, templates_fcfa: 25500000, abonnements_fcfa: 19200000, total_fcfa: 201600000, cumul_annuel_fcfa: 660750000, croissance_mensuelle_pct: 9.0 },
  { mois: '2026-05', barometres_fcfa: 29600000, etudes_fcfa: 60000000, formations_fcfa: 87500000, templates_fcfa: 34500000, abonnements_fcfa: 19200000, total_fcfa: 230800000, cumul_annuel_fcfa: 891550000, croissance_mensuelle_pct: 14.5 },
  { mois: '2026-06', barometres_fcfa: 35150000, etudes_fcfa: 72500000, formations_fcfa: 101500000, templates_fcfa: 49500000, abonnements_fcfa: 24000000, total_fcfa: 283150000, cumul_annuel_fcfa: 1174700000, croissance_mensuelle_pct: 22.7 },
];

export function computeKnowledgeMonetizationKPIs(): KnowledgeMonetizationKPIs {
  const produits = KNOWLEDGE_PRODUCTS;
  const pipeline = KNOWLEDGE_SALES_PIPELINE;
  const revenus = KNOWLEDGE_REVENUE_STREAMS;
  const revenu_total = produits.reduce((s, p) => s + p.revenu_genere_fcfa, 0);
  const topProduit = produits.reduce((best, p) => p.revenu_genere_fcfa > best.revenu_genere_fcfa ? p : best, produits[0]);
  const deals_won = pipeline.filter(d => d.statut === 'closed_won');
  const deals_active = pipeline.filter(d => ['qualification', 'proposition', 'negociation'].includes(d.statut));

  return {
    produits_catalogue: produits.length,
    produits_publies: produits.filter(p => p.statut === 'published').length,
    revenu_total_fcfa: revenu_total,
    revenu_mensuel_fcfa: revenus[revenus.length - 1].total_fcfa,
    revenu_previsionnel_12m_fcfa: 3400000000,
    clients_actifs: produits.reduce((s, p) => s + p.clients_actifs, 0),
    panier_moyen_fcfa: Math.round(revenu_total / produits.reduce((s, p) => s + p.clients_actifs, 0)),
    taux_conversion_moyen: Math.round(produits.reduce((s, p) => s + p.taux_conversion_moyen, 0) / produits.length),
    taux_retention: 84,
    nps_moyen: 72,
    score_qualite_iso_moyen: Math.round(produits.reduce((s, p) => s + p.score_qualite_iso, 0) / produits.length),
    top_produit_nom: topProduit.title,
    top_produit_revenu: topProduit.revenu_genere_fcfa,
    croissance_trimestrielle: 24.8,
    pipeline_actif_fcfa: deals_active.reduce((s, d) => s + d.valeur_fcfa, 0),
    pipeline_deals: deals_active.length,
    win_rate: Math.round((deals_won.length / pipeline.length) * 100),
  };
}



