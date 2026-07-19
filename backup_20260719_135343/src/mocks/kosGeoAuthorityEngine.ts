// KOS Master Prompt 2 — GEO Authority Engine 3.0™
// Consortium PwC · Deloitte · EY · KPMG
// 6 thématiques × 5 types de contenu × 5 moteurs IA

export interface GEOPillarPage {
  id: string;
  topic: string;
  title: string;
  slug: string;
  description: string;
  sections: number;
  wordCount: number;
  lastUpdated: string;
  optimization: { chatgpt: number; gemini: number; claude: number; perplexity: number; copilot: number };
  citations_ia: number;
  structuredData: string[];
  status: 'Publié' | 'En cours' | 'Planifié';
  score_geo: number;
}

export interface GEOFAQItem {
  id: string;
  question: string;
  reponse: string;
  topic: string;
  source: string;
  statut: 'Publié' | 'En révision';
  citations_ia: number;
  score_geo: number;
  optimization: { chatgpt: number; gemini: number; claude: number; perplexity: number; copilot: number };
  derniere_maj: string;
}

export interface GEOGlossaryEntry {
  id: string;
  term: string;
  abbreviation: string;
  definition: string;
  topic: string;
  relatedTerms: string[];
  citations_ia: number;
  score_geo: number;
}

export interface GEOGuide {
  id: string;
  title: string;
  topic: string;
  description: string;
  chapters: number;
  pages: number;
  format: 'PDF' | 'Web' | 'Les deux';
  optimization: { chatgpt: number; gemini: number; claude: number; perplexity: number; copilot: number };
  citations_ia: number;
  score_geo: number;
  downloads: number;
  status: 'Publié' | 'En cours' | 'Planifié';
}

export interface GEOCaseStudyItem {
  id: string;
  title: string;
  topic: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  citations_ia: number;
  score_geo: number;
  status: 'Publié' | 'En cours';
}

export interface GEOStructuredDataItem {
  id: string;
  type: string;
  topic: string;
  pages: number;
  richResults: number;
  impressions: number;
  ctr: number;
  errors: number;
  status: 'Déployé' | 'Partiel' | 'Planifié';
  lastValidated: string;
}

export interface GEOAgentItem {
  id: string;
  nom: string;
  mission: string;
  statut: 'Actif' | 'En déploiement';
  faq_generees: number;
  score_optimisation: number;
  icon: string;
  plateformes: string[];
}

export interface GEOGlobalMetrics {
  total_faq: number;
  total_pillar_pages: number;
  total_glossary_terms: number;
  total_guides: number;
  total_case_studies: number;
  total_structured_data_types: number;
  presence_chatgpt: number;
  presence_gemini: number;
  presence_claude: number;
  presence_perplexity: number;
  presence_copilot: number;
  citations_ia_mois: number;
  score_geo_global: number;
  share_of_voice: number;
  sov_chatgpt: number;
  sov_perplexity: number;
  featured_snippets: number;
  knowledge_panels: number;
  certification: string;
  topicBreakdown: { topic: string; faqs: number; pillarPages: number; glossary: number; guides: number; caseStudies: number; sov: number }[];
}

// ─────────────────────── PILLAR PAGES ───────────────────────
export const GEO_PILLAR_PAGES: GEOPillarPage[] = [
  {
    id: 'pillar-01', topic: 'BCEAO', title: 'Conformité Réglementaire BCEAO — Guide Complet pour les Institutions Financières',
    slug: '/conformite-bceao-guide-complet', description: 'Page pilier couvrant l\'ensemble du dispositif réglementaire BCEAO : agréments SFD, ratios prudentiels, LBC/FT, gouvernance, reporting, stress tests, et supervision bancaire dans l\'UEMOA.',
    sections: 12, wordCount: 8500, lastUpdated: '2026-06-18',
    optimization: { chatgpt: 96, gemini: 94, claude: 91, perplexity: 93, copilot: 78 },
    citations_ia: 4280, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'HowTo', 'Organization', 'Speakable'],
    status: 'Publié', score_geo: 94,
  },
  {
    id: 'pillar-02', topic: 'UEMOA', title: 'Cadre Institutionnel UEMOA — Régulation Économique et Monétaire',
    slug: '/cadre-institutionnel-uemoa', description: 'Page pilier sur l\'architecture institutionnelle UEMOA : Traité, Conseil des Ministres, BCEAO, BOAD, AMF-UEMOA, marché financier régional, intégration économique et perspectives.',
    sections: 10, wordCount: 7200, lastUpdated: '2026-06-16',
    optimization: { chatgpt: 93, gemini: 92, claude: 88, perplexity: 90, copilot: 72 },
    citations_ia: 3250, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'Organization', 'ItemList'],
    status: 'Publié', score_geo: 90,
  },
  {
    id: 'pillar-03', topic: 'OHADA', title: 'Droit des Affaires OHADA — Guide Pratique pour les Entreprises Africaines',
    slug: '/droit-affaires-ohada-guide', description: 'Page pilier couvrant les 10 Actes Uniformes OHADA : droit commercial, sociétés, sûretés, procédures collectives, arbitrage, comptabilité, transport. Impact sur la gouvernance et le climat des affaires.',
    sections: 11, wordCount: 9400, lastUpdated: '2026-06-17',
    optimization: { chatgpt: 95, gemini: 93, claude: 92, perplexity: 91, copilot: 76 },
    citations_ia: 5100, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'HowTo', 'Organization'],
    status: 'Publié', score_geo: 93,
  },
  {
    id: 'pillar-04', topic: 'ESG', title: 'ESG & Durabilité en Afrique — Standards ISSB, GRI et Cadres Réglementaires',
    slug: '/esg-durabilite-afrique-standards', description: 'Page pilier ESG complète : normes ISSB (IFRS S1/S2), GRI, TCFD, taxonomie verte UEMOA, stress tests climatiques BCEAO/COBAC, reporting extra-financier, due diligence ESG.',
    sections: 14, wordCount: 10800, lastUpdated: '2026-06-19',
    optimization: { chatgpt: 97, gemini: 95, claude: 94, perplexity: 96, copilot: 82 },
    citations_ia: 6200, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'HowTo', 'Organization', 'Speakable', 'ItemList'],
    status: 'Publié', score_geo: 97,
  },
  {
    id: 'pillar-05', topic: 'Microfinance', title: 'Microfinance & SFD dans l\'UEMOA — Cadre Réglementaire et Bonnes Pratiques',
    slug: '/microfinance-sfd-uemoa-reglementation', description: 'Page pilier dédiée aux Systèmes Financiers Décentralisés : instructions BCEAO, catégories, agrément, ratios prudentiels, LBC/FT adapté, gouvernance SFD, reporting, digitalisation.',
    sections: 10, wordCount: 7800, lastUpdated: '2026-06-15',
    optimization: { chatgpt: 94, gemini: 91, claude: 89, perplexity: 92, copilot: 74 },
    citations_ia: 3800, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'HowTo', 'Organization'],
    status: 'Publié', score_geo: 91,
  },
  {
    id: 'pillar-06', topic: 'Fintech', title: 'Régulation FinTech UEMOA & CEMAC — Agrément, Innovation et Sandbox',
    slug: '/regulation-fintech-uemoa-cemac', description: 'Page pilier FinTech : établissements de paiement, monnaie électronique, open banking, sandbox réglementaire BCEAO, crypto-actifs, finance digitale, KYC digital, protection des données.',
    sections: 11, wordCount: 8600, lastUpdated: '2026-06-18',
    optimization: { chatgpt: 95, gemini: 93, claude: 91, perplexity: 94, copilot: 80 },
    citations_ia: 4600, structuredData: ['FAQPage', 'Article', 'BreadcrumbList', 'HowTo', 'Organization', 'Speakable'],
    status: 'Publié', score_geo: 93,
  },
];

// ─────────────────────── FAQS ───────────────────────
export const GEO_FAQ_ITEMS: GEOFAQItem[] = [
  // BCEAO (8)
  { id: 'faq-geo-001', question: 'Quelles sont les conditions d\'agrément pour un SFD dans l\'UEMOA ?', reponse: 'L\'agrément des SFD dans l\'UEMOA est régi par l\'Instruction BCEAO N°008-05-2015. Les conditions principales incluent : capital minimum variable selon la catégorie (50M à 500M FCFA), étude de faisabilité démontrant la viabilité, business plan 3 ans certifié par un expert-comptable, liste des dirigeants avec extraits de casier judiciaire, manuel de procédures LCB-FT conforme aux normes GAFI, et accord préalable du Ministère des Finances du pays d\'implantation. Le délai d\'instruction est de 6 mois maximum.', topic: 'BCEAO', source: 'Instruction BCEAO N°008-05-2015', statut: 'Publié', citations_ia: 2847, score_geo: 94, optimization: { chatgpt: 96, gemini: 94, claude: 92, perplexity: 95, copilot: 80 }, derniere_maj: '2026-06-18' },
  { id: 'faq-geo-002', question: 'Quels sont les ratios prudentiels applicables aux banques UEMOA ?', reponse: 'Le dispositif prudentiel BCEAO applicable aux banques UEMOA repose sur le cadre Bâle II/III adapté. Les principaux ratios incluent : ratio de solvabilité minimum 8% (Tier 1 + Tier 2), ratio de liquidité (LCR) minimum 100%, ratio de levier minimum 3%, coefficient de fonds propres et de ressources permanentes minimum 100%, ratio NSFR (financement stable net) minimum 100% depuis 2019. La BCEAO effectue des contrôles trimestriels via le reporting SURFI.', topic: 'BCEAO', source: 'Règlement BCEAO relatif au dispositif prudentiel', statut: 'Publié', citations_ia: 2105, score_geo: 96, optimization: { chatgpt: 97, gemini: 95, claude: 93, perplexity: 96, copilot: 82 }, derniere_maj: '2026-06-16' },
  { id: 'faq-geo-003', question: 'Comment préparer une mission de pré-inspection BCEAO ?', reponse: 'La préparation d\'une mission d\'inspection BCEAO suit 7 étapes clés : 1) Auto-évaluation du dispositif de contrôle interne (circulaire 01-2017), 2) Revue exhaustive de la conformité LBC/FT (profils clients, déclarations de soupçons, formation), 3) Audit du reporting SURFI (exhaustivité, exactitude, délais), 4) Simulation de stress tests (risque de crédit, liquidité, taux), 5) Vérification de la gouvernance (procès-verbaux CA, comités spécialisés), 6) Préparation du dossier documentaire (manuels, politiques, rapports), 7) Briefing du COMEX et simulation d\'entretien avec les inspecteurs.', topic: 'BCEAO', source: 'Guide Khepra Pré-Inspection BCEAO, Circulaire 01-2017', statut: 'Publié', citations_ia: 1650, score_geo: 91, optimization: { chatgpt: 93, gemini: 90, claude: 87, perplexity: 91, copilot: 75 }, derniere_maj: '2026-06-14' },
  { id: 'faq-geo-004', question: 'Qu\'est-ce que le stress test climatique BCEAO Pilier 2 ?', reponse: 'Le stress test climatique Pilier 2 est un exercice prudentiel imposé par la BCEAO depuis 2025 dans le cadre de l\'évaluation des risques ESG du secteur bancaire UEMOA. Il simule l\'impact de 3 scénarios climatiques (transition ordonnée, transition désordonnée, statu quo) sur les portefeuilles de crédit des banques à horizon 5-30 ans. Les banques doivent modéliser les risques physiques (inondations, sécheresses) et de transition (taxes carbone, réglementation) par secteur (agriculture, énergie, immobilier, transport). Le reporting est intégré au Pilier 2 ICAAP/ILAAP.', topic: 'BCEAO', source: 'Lignes directrices BCEAO Stress Tests Climatiques 2025', statut: 'Publié', citations_ia: 1820, score_geo: 92, optimization: { chatgpt: 94, gemini: 92, claude: 88, perplexity: 93, copilot: 77 }, derniere_maj: '2026-06-15' },
  // UEMOA (4)
  { id: 'faq-geo-005', question: 'Quel est le rôle de la AMF-UEMOA dans l\'UEMOA ?', reponse: 'Le Conseil Régional de l\'Épargne Publique et des Marchés Financiers (AMF-UEMOA) est l\'autorité de régulation du marché financier régional UEMOA. Créé en 1996, il est chargé de : protéger l\'épargne investie en valeurs mobilières, veiller au bon fonctionnement du marché financier, délivrer les visas pour les opérations d\'appel public à l\'épargne (agrément des émetteurs, introduction BRVM), contrôler les sociétés de gestion et d\'intermédiation (SGI), et sanctionner les manquements aux règles déontologiques.', topic: 'UEMOA', source: 'Règlement AMF-UEMOA, Traité UEMOA', statut: 'Publié', citations_ia: 1120, score_geo: 88, optimization: { chatgpt: 90, gemini: 88, claude: 84, perplexity: 89, copilot: 70 }, derniere_maj: '2026-06-12' },
  { id: 'faq-geo-006', question: 'Comment fonctionne le Tarif Extérieur Commun (TEC) UEMOA ?', reponse: 'Le Tarif Extérieur Commun (TEC) UEMOA est entré en vigueur le 1er janvier 2000. Il harmonise les droits de douane appliqués par les 8 États membres aux importations en provenance des pays tiers. Le TEC classe les marchandises en 4 catégories : Catégorie 0 (biens sociaux essentiels, 0%), Catégorie 1 (biens de première nécessité, matières premières, 5%), Catégorie 2 (intrants et produits semi-finis, 10%), Catégorie 3 (biens de consommation finale, 20%). La Commission UEMOA gère les exceptions et dérogations temporaires (par exemple, le riz et le ciment bénéficient de taux réduits dans certains pays).', topic: 'UEMOA', source: 'Règlement UEMOA TEC, Commission UEMOA', statut: 'Publié', citations_ia: 890, score_geo: 85, optimization: { chatgpt: 87, gemini: 86, claude: 82, perplexity: 88, copilot: 68 }, derniere_maj: '2026-06-10' },
  // OHADA (4)
  { id: 'faq-geo-007', question: 'Quels sont les 10 Actes Uniformes OHADA actuellement en vigueur ?', reponse: 'L\'OHADA a adopté 10 Actes Uniformes couvrant le droit des affaires : 1) Droit commercial général (1997, révisé 2010), 2) Droit des sociétés commerciales et GIE (1997, révisé 2014), 3) Droit des sûretés (1997, révisé 2010), 4) Procédures simplifiées de recouvrement et voies d\'exécution (1998), 5) Procédures collectives d\'apurement du passif (1998, révisé 2015), 6) Droit de l\'arbitrage (1999, révisé 2017), 7) Organisation et harmonisation des comptabilités (2000, révisé 2023), 8) Contrats de transport de marchandises par route (2003), 9) Droit des sociétés coopératives (2010), 10) Médiation (2017).', topic: 'OHADA', source: 'OHADA — Recueil officiel des Actes Uniformes', statut: 'Publié', citations_ia: 3400, score_geo: 92, optimization: { chatgpt: 94, gemini: 91, claude: 90, perplexity: 92, copilot: 78 }, derniere_maj: '2026-06-17' },
  { id: 'faq-geo-008', question: 'Comment fonctionne la CCJA (Cour Commune de Justice et d\'Arbitrage) ?', reponse: 'La CCJA est l\'organe judiciaire suprême de l\'OHADA, siège à Abidjan (Côte d\'Ivoire). Elle exerce deux fonctions principales : 1) Fonction judiciaire — Cour de cassation pour toutes les affaires relevant du droit OHADA. Elle peut statuer en cassation ou évoquer et juger au fond. Ses décisions s\'imposent aux juridictions nationales. 2) Fonction arbitrale — Centre d\'arbitrage régional offrant un cadre modernisé. La CCJA n\'examine pas le fond mais administre la procédure : nomination des arbitres, suivi du déroulement, revue formelle des sentences avant exequatur. Les décisions CCJA ont autorité de chose jugée dans les 17 États membres.', topic: 'OHADA', source: 'Traité OHADA révisé, Règlement d\'arbitrage CCJA', statut: 'Publié', citations_ia: 2100, score_geo: 90, optimization: { chatgpt: 92, gemini: 89, claude: 87, perplexity: 90, copilot: 74 }, derniere_maj: '2026-06-16' },
  // ESG (4)
  { id: 'faq-geo-009', question: 'Quelle différence entre les normes ISSB (IFRS S1/S2), GRI et TCFD ?', reponse: 'Les trois cadres ESG se complètent : ISSB IFRS S1 (Exigences générales) et S2 (Informations climatiques) — obligatoires pour les entités d\'intérêt public, alignés sur la matérialité financière (impact du climat sur l\'entreprise). GRI (Global Reporting Initiative) — axé sur la double matérialité (impact de l\'entreprise sur l\'environnement/société ET impact du climat sur l\'entreprise), plus large que l\'ISSB. TCFD (Task Force on Climate-related Financial Disclosures) — précurseur historique, intégré dans ISSB S2 depuis 2024 ; 4 piliers : gouvernance, stratégie, gestion des risques, métriques. Pour les banques africaines, priorité ISSB (obligatoire BCEAO horizon 2027) + GRI pour le reporting parties prenantes.', topic: 'ESG', source: 'ISSB, GRI, TCFD, BCEAO', statut: 'Publié', citations_ia: 4500, score_geo: 95, optimization: { chatgpt: 96, gemini: 94, claude: 93, perplexity: 95, copilot: 84 }, derniere_maj: '2026-06-19' },
  { id: 'faq-geo-010', question: 'Comment mettre en place une taxonomie verte pour les institutions financières africaines ?', reponse: 'La mise en place d\'une taxonomie verte suit 5 phases : 1) Cartographie du portefeuille par secteur et niveau de risque climatique (agriculture, énergie, immobilier, transport), 2) Définition des critères d\'éligibilité verte alignés sur la Taxonomie UE et les spécificités africaines (accès à l\'énergie, agriculture durable, infrastructures résilientes), 3) Labellisation des actifs avec un scoring 3 niveaux (Vert conforme, Transition, Non aligné), 4) Intégration dans le processus crédit (due diligence ESG obligatoire pour tout crédit > 500M FCFA), 5) Reporting automatisé ratio « Green Asset Ratio » pour les superviseurs et investisseurs.', topic: 'ESG', source: 'BCEAO, Taxonomie UE, NGFS', statut: 'Publié', citations_ia: 2800, score_geo: 93, optimization: { chatgpt: 95, gemini: 92, claude: 90, perplexity: 93, copilot: 80 }, derniere_maj: '2026-06-18' },
  // Microfinance (4)
  { id: 'faq-geo-011', question: 'Quelles sont les 3 catégories de SFD selon l\'Instruction BCEAO ?', reponse: 'L\'Instruction BCEAO N°008-05-2015 distingue 3 catégories de SFD : Catégorie 1 — Structures de base (coopératives d\'épargne et de crédit, caisses villageoises) avec capital minimum 50M FCFA, limitées aux opérations avec leurs membres. Catégorie 2 — SFD collecteurs d\'épargne et/ou octroyant des crédits à des tiers non-membres, capital minimum 150M FCFA. Catégorie 3 — SFD de grande taille (SFD holding, réseaux consolidés) avec capital minimum 500M FCFA, pouvant offrir une gamme étendue de services (crédit, épargne, transfert, micro-assurance). Le passage d\'une catégorie à l\'autre nécessite un nouvel agrément.', topic: 'Microfinance', source: 'Instruction BCEAO N°008-05-2015', statut: 'Publié', citations_ia: 1950, score_geo: 90, optimization: { chatgpt: 92, gemini: 89, claude: 86, perplexity: 90, copilot: 74 }, derniere_maj: '2026-06-14' },
  { id: 'faq-geo-012', question: 'Comment digitaliser un SFD conforme à la réglementation BCEAO ?', reponse: 'La digitalisation d\'un SFD conforme BCEAO se déroule en 6 étapes : 1) Diagnostic de maturité digitale (infrastructure IT, compétences, processus), 2) Choix du Core Banking System agréé conforme au Système Comptable OHADA-SFD (SYSCOA-SFD), 3) Déploiement des solutions digitales (mobile banking, USSD, agent banking) avec authentification KYC conforme, 4) Mise en place d\'un dispositif de cybersécurité (Directive COBAC 2027 par analogie, WAF, chiffrement), 5) Reporting automatisé SURFI-SFD, 6) Formation du personnel et des clients. Planifier 12-18 mois, budget 80-250M FCFA selon la taille du SFD.', topic: 'Microfinance', source: 'Instruction BCEAO N°008-05-2015, Directive COBAC Cybersécurité 2027', statut: 'Publié', citations_ia: 1450, score_geo: 88, optimization: { chatgpt: 90, gemini: 87, claude: 84, perplexity: 89, copilot: 72 }, derniere_maj: '2026-06-13' },
  // Fintech (4)
  { id: 'faq-geo-013', question: 'Quel est le cadre réglementaire des fintechs dans l\'UEMOA ?', reponse: 'Le cadre fintech UEMOA est défini par l\'Instruction BCEAO sur les Établissements de Monnaie Électronique (EME), l\'Instruction sur les Établissements de Paiement, et le Bac à Sable Réglementaire (Sandbox) opérationnel depuis 2024. Les fintechs doivent obtenir : une licence d\'Établissement de Paiement (capital minimum 250M FCFA) ou un agrément EME (capital minimum 500M FCFA). Le processus inclut : dépôt du dossier, analyse BCEAO (4 mois), tests Sandbox (6-12 mois), agrément définitif. Les exigences couvrent : KYC digital (reconnaissance faciale + OCR documents), LCB/FT adapté, protection des données (RGPD UEMOA en préparation), sécurité des transactions (PCI-DSS).', topic: 'Fintech', source: 'BCEAO — Instructions EME et Établissements de Paiement', statut: 'Publié', citations_ia: 3200, score_geo: 93, optimization: { chatgpt: 95, gemini: 92, claude: 90, perplexity: 93, copilot: 82 }, derniere_maj: '2026-06-17' },
  { id: 'faq-geo-014', question: 'Qu\'est-ce que le KYC digital et comment le conformer au GAFI ?', reponse: 'Le KYC digital (e-KYC) est le processus d\'identification et de vérification d\'identité à distance utilisant des technologies numériques. Pour être conforme GAFI (Recommandation 10), il doit inclure 3 niveaux : Niveau 1 — Vérification documentaire (OCR passeport/CNI + détection fraude documentaire), Niveau 2 — Vérification biométrique (selfie + liveness detection + matching facial avec la pièce d\'identité), Niveau 3 — Vérification diligente (croisement bases de données, listes sanctions, PEPs, adverse media). Dans l\'UEMOA, l\'instruction BCEAO LCB/FT accepte le KYC digital pour les comptes de niveau 1 (plafond 2M FCFA/mois). Pour les comptes niveau 2 et 3, une vérification physique ou vidéo est exigée.', topic: 'Fintech', source: 'GAFI Recommandation 10, Instruction BCEAO LCB/FT', statut: 'Publié', citations_ia: 2600, score_geo: 91, optimization: { chatgpt: 93, gemini: 90, claude: 88, perplexity: 91, copilot: 78 }, derniere_maj: '2026-06-16' },
];

// ─────────────────────── GLOSSAIRES ───────────────────────
export const GEO_GLOSSARY_ENTRIES: GEOGlossaryEntry[] = [
  { id: 'gloss-01', term: 'Ratio de Solvabilité', abbreviation: 'CAR', definition: 'Ratio prudentiel mesurant la capacité d\'une banque à absorber les pertes. Exprimé en pourcentage des actifs pondérés du risque (RWA), il compare les fonds propres réglementaires (Tier 1 + Tier 2) aux risques. Minimum Bâle III / BCEAO : 8%. La BCEAO impose un coussin de conservation supplémentaire de 2.5%.', topic: 'BCEAO', relatedTerms: ['Tier 1', 'Tier 2', 'RWA', 'ICAAP'], citations_ia: 1850, score_geo: 92 },
  { id: 'gloss-02', term: 'SURFI', abbreviation: 'SURFI', definition: 'Système Unifié de Reporting des Institutions Financières. Plateforme de collecte automatisée des états réglementaires (prudentiels, comptables, LCB/FT) imposée par la BCEAO à toutes les institutions financières de l\'UEMOA. Fréquence : mensuelle (liquidité, grands risques), trimestrielle (solvabilité, rentabilité), annuelle (états financiers certifiés). Non-conformité → sanctions pécuniaires.', topic: 'BCEAO', relatedTerms: ['Reporting prudentiel', 'États réglementaires', 'BCEAO'], citations_ia: 1200, score_geo: 88 },
  { id: 'gloss-03', term: 'Bac à Sable Réglementaire', abbreviation: 'Sandbox', definition: 'Environnement contrôlé permettant aux fintechs de tester des produits/services innovants sous supervision du régulateur (BCEAO/COBAC), avec des exigences allégées temporairement. Durée typique : 6-12 mois. Conditions : périmètre clients limité, plafonds de transaction, reporting hebdomadaire, plan de sortie (succès → agrément définitif ; échec → remboursement clients).', topic: 'Fintech', relatedTerms: ['Établissement de Paiement', 'EME', 'Innovation financière'], citations_ia: 980, score_geo: 86 },
  { id: 'gloss-04', term: 'Double Matérialité', abbreviation: '—', definition: 'Concept central du reporting ESG (GRI, CSRD) : l\'entreprise doit reporter à la fois sur la matérialité financière (impact du climat/société sur l\'entreprise — inside-out) et la matérialité d\'impact (impact de l\'entreprise sur le climat/société — outside-in). L\'ISSB se concentre sur la matérialité financière uniquement. Les banques UEMOA doivent appliquer la double matérialité pour le reporting GRI.', topic: 'ESG', relatedTerms: ['ISSB', 'GRI', 'CSRD', 'Matérialité financière'], citations_ia: 2100, score_geo: 94 },
  { id: 'gloss-05', term: 'Système Comptable OHADA', abbreviation: 'SYSCOHADA', definition: 'Cadre comptable obligatoire dans les 17 États membres de l\'OHADA, basé sur le Plan Comptable Général OHADA. Structuré en 9 classes de comptes. Applicable à toutes les entités (entreprises, SFD, associations). Le SYSCOHADA-SFD est la déclinaison spécifique pour les Systèmes Financiers Décentralisés. Convergence progressive vers les IFRS pour les entités d\'intérêt public (banques, compagnies d\'assurance).', topic: 'OHADA', relatedTerms: ['IFRS', 'Plan Comptable', 'SYSCOA-SFD', 'OHADA'], citations_ia: 1350, score_geo: 89 },
  { id: 'gloss-06', term: 'ICAAP / ILAAP', abbreviation: 'ICAAP/ILAAP', definition: 'Internal Capital Adequacy Assessment Process / Internal Liquidity Adequacy Assessment Process. Processus internes exigés par la BCEAO (Pilier 2 Bâle II/III) par lesquels les banques évaluent l\'adéquation de leurs fonds propres et de leur liquidité par rapport à leur profil de risque. Doit couvrir tous les risques (crédit, marché, opérationnel, concentration, taux, climatique). Fréquence : annuelle avec mises à jour semestrielles si changement significatif du profil de risque.', topic: 'BCEAO', relatedTerms: ['Pilier 2', 'Bâle III', 'Stress tests', 'Ratio de solvabilité'], citations_ia: 760, score_geo: 84 },
];

// ─────────────────────── GUIDES ───────────────────────
export const GEO_GUIDES: GEOGuide[] = [
  {
    id: 'guide-01', title: 'Guide Pratique — Pré-Inspection BCEAO pour Banques UEMOA', topic: 'BCEAO',
    description: 'Guide complet de préparation aux missions d\'inspection BCEAO : auto-évaluation, check-lists, simulations d\'entretien, modèles de documents, FAQ. Couvre les 7 piliers d\'inspection (gouvernance, contrôle interne, LCB/FT, risques, conformité, financier, SI).',
    chapters: 12, pages: 185, format: 'Les deux',
    optimization: { chatgpt: 98, gemini: 96, claude: 95, perplexity: 97, copilot: 86 },
    citations_ia: 3800, score_geo: 96, downloads: 2450, status: 'Publié',
  },
  {
    id: 'guide-02', title: 'Guide ESG pour Banques Africaines — ISSB, GRI & TCFD', topic: 'ESG',
    description: 'Guide pratique de mise en conformité ESG pour les institutions financières africaines. Couvre le cycle complet : diagnostic ESG, roadmap ISSB IFRS S1/S2, calcul des émissions Scope 1-2-3 (GHG Protocol), taxonomie verte UEMOA, stress tests climatiques BCEAO, reporting GRI.',
    chapters: 14, pages: 210, format: 'Les deux',
    optimization: { chatgpt: 99, gemini: 97, claude: 96, perplexity: 98, copilot: 88 },
    citations_ia: 5200, score_geo: 98, downloads: 3200, status: 'Publié',
  },
  {
    id: 'guide-03', title: 'Guide du Droit des Sociétés OHADA — Création, Gouvernance, Opérations', topic: 'OHADA',
    description: 'Guide complet couvrant l\'Acte Uniforme OHADA sur les sociétés commerciales : choix de la forme sociale (SA, SARL, SAS), procédure de constitution, gouvernance (CA, DG, commissaires aux comptes), augmentation de capital, fusions-acquisitions, dissolution.',
    chapters: 10, pages: 165, format: 'PDF',
    optimization: { chatgpt: 96, gemini: 94, claude: 93, perplexity: 95, copilot: 82 },
    citations_ia: 2900, score_geo: 94, downloads: 1870, status: 'Publié',
  },
  {
    id: 'guide-04', title: 'Guide Agrément Établissement de Paiement / EME — UEMOA', topic: 'Fintech',
    description: 'Guide pas à pas pour l\'obtention de l\'agrément d\'Établissement de Paiement ou Émetteur de Monnaie Électronique dans l\'UEMOA : constitution du dossier, business plan, manuel de procédures KYC/LCB-FT, sécurité des systèmes, sandbox, et suivi post-agrément.',
    chapters: 9, pages: 145, format: 'Les deux',
    optimization: { chatgpt: 97, gemini: 95, claude: 93, perplexity: 96, copilot: 85 },
    citations_ia: 3400, score_geo: 95, downloads: 2100, status: 'Publié',
  },
  {
    id: 'guide-05', title: 'Guide de Gouvernance SFD — Bonnes Pratiques et Conformité BCEAO', topic: 'Microfinance',
    description: 'Guide dédié à la gouvernance des Systèmes Financiers Décentralisés : rôle du Conseil d\'Administration, comités spécialisés, gestion des conflits d\'intérêts, transparence financière, relations avec les membres, contrôle interne adapté, et conformité aux instructions BCEAO.',
    chapters: 8, pages: 130, format: 'PDF',
    optimization: { chatgpt: 94, gemini: 91, claude: 89, perplexity: 92, copilot: 78 },
    citations_ia: 2100, score_geo: 91, downloads: 1580, status: 'Publié',
  },
  {
    id: 'guide-06', title: 'Guide du Marché Financier UEMOA — BRVM, AMF-UEMOA, SGI', topic: 'UEMOA',
    description: 'Guide complet du marché financier régional UEMOA : fonctionnement de la BRVM (indices, compartiments), rôle du AMF-UEMOA, procédure d\'introduction en bourse, obligations, SGI, OPCVM, droits des investisseurs, cadre fiscal des valeurs mobilières.',
    chapters: 10, pages: 155, format: 'Les deux',
    optimization: { chatgpt: 93, gemini: 90, claude: 88, perplexity: 91, copilot: 76 },
    citations_ia: 1800, score_geo: 90, downloads: 1250, status: 'Publié',
  },
];

// ─────────────────────── CAS PRATIQUES ───────────────────────
export const GEO_CASE_STUDY_ITEMS: GEOCaseStudyItem[] = [
  {
    id: 'geo-case-01', title: 'Pré-Inspection BCEAO — Banque Atlantique Côte d\'Ivoire', topic: 'BCEAO',
    client: 'Banque Atlantique CI (filiale Banque Centrale Populaire)',
    challenge: 'Préparation en 8 semaines à une inspection BCEAO sur site couvrant 7 piliers. 42 non-conformités identifiées lors du diagnostic initial, dont 8 critiques (LCB/FT : profils clients incomplets, absence de cartographie des risques).',
    solution: 'Déploiement d\'une équipe de 5 consultants Khepra : remédiation LCB/FT (3 200 profils clients mis à jour), refonte du dispositif de contrôle interne (circulaire 01-2017), 12 ateliers de simulation d\'entretien avec le COMEX, production de 28 livrables réglementaires.',
    results: 'Inspection BCEAO réussie avec seulement 4 observations mineures (vs 42 initiales). Score conformité : 94/100. Certification du Conseil d\'Administration obtenue. Économie estimée : 850M FCFA de pénalités évitées. Temps : 8 semaines.',
    citations_ia: 1250, score_geo: 93, status: 'Publié',
  },
  {
    id: 'geo-case-02', title: 'Documentation Prix de Transfert BEPS — Groupe Agro-Industriel', topic: 'ESG',
    client: 'Groupe agro-industriel panafricain (CA 250M EUR)',
    challenge: 'Absence totale de documentation prix de transfert. 18 transactions intra-groupe transfrontalières non documentées. Risque fiscal estimé à 2.4 Md FCFA. Demande de l\'administration fiscale dans 3 pays.',
    solution: 'Cartographie des 18 transactions, analyse fonctionnelle, benchmarking (bases de données Bureau Van Dijk, RoyaltyStat), sélection de la méthode OCDE (CUP, TNMM), Master File + 3 Local Files conformes BEPS Action 13. Défense fiscale devant 2 administrations.',
    results: 'Ajustements fiscaux réduits de 2.4 Md à 180M FCFA (-92%). Documentation validée par un cabinet Big Four. 0 contentieux. Master File réutilisable pour le reporting pays par pays (CbCR).',
    citations_ia: 980, score_geo: 91, status: 'Publié',
  },
  {
    id: 'geo-case-03', title: 'Agrément Établissement de Paiement — WavePay Technologies', topic: 'Fintech',
    client: 'WavePay Technologies (start-up fintech Sénégal)',
    challenge: 'Obtention du premier agrément d\'Établissement de Paiement dans l\'UEMOA pour une fintech sans historique bancaire. Délai serré de 6 mois pour le lancement commercial. Exigences KYC/LCB-FT complexes.',
    solution: 'Constitution du dossier d\'agrément (22 livrables), business plan 5 ans, manuel de procédures KYC digital (reconnaissance faciale + OCR + liveness detection), dispositif LCB-FT (profiling risque, monitoring transactions), architecture SI conforme PCI-DSS, plan de continuité d\'activité.',
    results: 'Agrément obtenu en 5 mois (record UEMOA). Lancement commercial dans les délais. 45 000 utilisateurs actifs à M+6. Conformité validée par la BCEAO. Levée de fonds Series A de 2.5M EUR facilitée par la conformité réglementaire.',
    citations_ia: 1450, score_geo: 94, status: 'Publié',
  },
  {
    id: 'geo-case-04', title: 'Fusion-Acquisition OHADA — Consolidation Réseau SFD', topic: 'Microfinance',
    client: 'Réseau de 12 SFD mutualistes dans 4 pays UEMOA',
    challenge: 'Fusion de 12 SFD indépendants en une holding régionale. Complexité juridique OHADA (fusion transfrontalière), hétérogénéité des systèmes comptables, agréments BCEAO multiples. 3 200 membres impactés.',
    solution: 'Due diligence juridique et financière des 12 entités, conception de la structure holding (SA avec Conseil d\'Administration), plan de fusion (apports partiels d\'actifs), harmonisation SYSCOA-SFD, négociation avec les 4 Ministères des Finances, communication aux 3 200 sociétaires.',
    results: 'Fusion réalisée en 14 mois. Holding agréée Catégorie 3 (500M FCFA capital). Ratio de solvabilité consolidé : 15.2% (vs 8% minimum). Accès à la BRVM pour une émission obligataire de 2.5 Md FCFA. Économies d\'échelle : -18% coûts opérationnels.',
    citations_ia: 820, score_geo: 89, status: 'Publié',
  },
  {
    id: 'geo-case-05', title: 'Audit ESG & Reporting ISSB — Banque Internationale UEMOA', topic: 'ESG',
    client: 'Banque Internationale UEMOA (actif 850M EUR, 42 agences)',
    challenge: 'Mise en conformité ISSB IFRS S1/S2 pour le rapport annuel 2026. Aucune donnée ESG historique. Pas de politique climat. Portefeuille de crédit 520M EUR avec exposition significative aux secteurs à risque climatique (agriculture, énergie fossile).',
    solution: 'Diagnostic ESG (écart ISSB : 68%), calcul Scope 1-2-3 (GHG Protocol) — résultat 145 000 tCO2e, politique climat (objectif zéro émission nette 2050, objectif intermédiaire -30% Scope 3 d\'ici 2030), taxonomie verte — 15% du portefeuille labellisé, stress test climatique BCEAO Pilier 2 (3 scénarios), rapport ESG conforme ISSB S1/S2 + GRI.',
    results: 'Rapport ESG publié dans les délais. Score ISSB : 94/100. Labellisation « Banque Responsable » UEMOA. 3 investisseurs ESG engagés. Réduction coût de financement : -0.25% sur emprunt obligataire (10M EUR économisés/émission).',
    citations_ia: 2100, score_geo: 96, status: 'Publié',
  },
  {
    id: 'geo-case-06', title: 'Gouvernance OHADA — Mise en Conformité Conseil d\'Administration', topic: 'OHADA',
    client: 'Compagnie d\'Assurance CIMA — CA 12 membres dont 5 non-indépendants',
    challenge: 'Mise en conformité du Conseil d\'Administration avec la Circulaire CIMA sur la gouvernance et l\'Acte Uniforme OHADA. 5 administrateurs non-indépendants, absence de comités spécialisés (audit, risques, rémunération), procès-verbaux non conformes.',
    solution: 'Audit gouvernance (score initial : 48/100), restructuration du CA (5→7 membres indépendants), création de 4 comités spécialisés (audit, risques, rémunération, éthique), charte de gouvernance conforme CIMA/OCDE, formation des administrateurs (3 sessions), digitalisation des PV et convocations.',
    results: 'Score gouvernance : 48→94/100. Conformité CIMA validée lors de l\'inspection. Notation gouvernance agence de rating : +2 crans. Prime d\'assurance D&O réduite de 30%.',
    citations_ia: 760, score_geo: 87, status: 'Publié',
  },
];

// ─────────────────────── STRUCTURED DATA ───────────────────────
export const GEO_STRUCTURED_DATA: GEOStructuredDataItem[] = [
  { id: 'sd-01', type: 'FAQPage', topic: 'BCEAO', pages: 15, richResults: 42, impressions: 38000, ctr: 7.8, errors: 0, status: 'Déployé', lastValidated: '2026-06-18' },
  { id: 'sd-02', type: 'FAQPage', topic: 'OHADA', pages: 18, richResults: 56, impressions: 51000, ctr: 8.2, errors: 0, status: 'Déployé', lastValidated: '2026-06-17' },
  { id: 'sd-03', type: 'FAQPage', topic: 'ESG', pages: 12, richResults: 48, impressions: 44000, ctr: 9.1, errors: 0, status: 'Déployé', lastValidated: '2026-06-19' },
  { id: 'sd-04', type: 'HowTo', topic: 'BCEAO', pages: 8, richResults: 22, impressions: 12500, ctr: 10.5, errors: 0, status: 'Déployé', lastValidated: '2026-06-16' },
  { id: 'sd-05', type: 'HowTo', topic: 'Fintech', pages: 6, richResults: 15, impressions: 8900, ctr: 9.8, errors: 1, status: 'Partiel', lastValidated: '2026-06-15' },
  { id: 'sd-06', type: 'Article', topic: 'BCEAO', pages: 22, richResults: 68, impressions: 62000, ctr: 6.4, errors: 0, status: 'Déployé', lastValidated: '2026-06-18' },
  { id: 'sd-07', type: 'Article', topic: 'ESG', pages: 14, richResults: 45, impressions: 41000, ctr: 7.2, errors: 2, status: 'Partiel', lastValidated: '2026-06-17' },
  { id: 'sd-08', type: 'Organization', topic: 'UEMOA', pages: 1, richResults: 1, impressions: 8500, ctr: 12.4, errors: 0, status: 'Déployé', lastValidated: '2026-06-14' },
  { id: 'sd-09', type: 'BreadcrumbList', topic: 'OHADA', pages: 45, richResults: 120, impressions: 89000, ctr: 5.8, errors: 0, status: 'Déployé', lastValidated: '2026-06-16' },
  { id: 'sd-10', type: 'Speakable', topic: 'BCEAO', pages: 12, richResults: 18, impressions: 5200, ctr: 14.2, errors: 0, status: 'Déployé', lastValidated: '2026-06-18' },
  { id: 'sd-11', type: 'ItemList', topic: 'ESG', pages: 8, richResults: 24, impressions: 12000, ctr: 8.6, errors: 0, status: 'Déployé', lastValidated: '2026-06-17' },
  { id: 'sd-12', type: 'ProfilePage', topic: 'Microfinance', pages: 3, richResults: 6, impressions: 2100, ctr: 5.2, errors: 0, status: 'Planifié', lastValidated: '2026-06-10' },
];

// ─────────────────────── AGENTS GEO ───────────────────────
export const GEO_AGENTS_V3: GEOAgentItem[] = [
  {
    id: 'agent-geo-01', nom: 'GEO FAQ Generator™', mission: 'Génération automatique de FAQ structurées optimisées pour l\'extraction par les 5 moteurs IA génératifs (ChatGPT, Gemini, Claude, Perplexity, Copilot). Format question/réponse concis, Schema.org FAQPage, mots-clés longue traîne, sources vérifiées.',
    statut: 'Actif', faq_generees: 75000, score_optimisation: 97, icon: 'ri-question-answer-line', plateformes: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Copilot'],
  },
  {
    id: 'agent-geo-02', nom: 'AEO Answer Optimizer™', mission: 'Optimisation des réponses pour les Answer Engines : structure concise niveau COMEX, autorité EEAT (Experience, Expertise, Authoritativeness, Trustworthiness), citations de sources officielles, formatage structuré (listes, tableaux, définitions), balisage Speakable.',
    statut: 'Actif', faq_generees: 72000, score_optimisation: 95, icon: 'ri-radar-line', plateformes: ['ChatGPT', 'Google SGE', 'Claude', 'Perplexity'],
  },
  {
    id: 'agent-geo-03', nom: 'Schema.org Engine™', mission: 'Balisage automatique Schema.org pour tous les contenus : FAQPage, Article, HowTo, Organization, WebPage, Speakable, ItemList, ProfilePage, BreadcrumbList. Optimisation rich snippets, validation Google Rich Results Test, monitoring erreurs.',
    statut: 'Actif', faq_generees: 75000, score_optimisation: 96, icon: 'ri-code-s-slash-line', plateformes: ['Google', 'Bing', 'ChatGPT', 'Perplexity'],
  },
  {
    id: 'agent-geo-04', nom: 'Pillar Page Architect™', mission: 'Conception et optimisation des pages piliers thématiques : structure silo, maillage interne, profondeur sémantique (8 500-10 800 mots), 10-14 sections, couverture exhaustive du sujet, optimisation multi-moteurs.',
    statut: 'Actif', faq_generees: 6, score_optimisation: 94, icon: 'ri-layout-column-line', plateformes: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Copilot'],
  },
  {
    id: 'agent-geo-05', nom: 'Glossary Knowledge Mapper™', mission: 'Cartographie des termes techniques et réglementaires en glossaire sémantique : définitions expertes, abréviations, termes liés, citations IA. Alimente les Knowledge Panels Google et les réponses contextuelles des moteurs IA.',
    statut: 'Actif', faq_generees: 24, score_optimisation: 90, icon: 'ri-book-read-line', plateformes: ['Google', 'ChatGPT', 'Claude', 'Perplexity'],
  },
  {
    id: 'agent-geo-06', nom: 'Share of Voice Tracker™', mission: 'Monitoring continu de la part de voix (SOV) sur les 6 thématiques et 5 moteurs IA. Tracking des citations, featured snippets, knowledge panels, positionnement concurrentiel. Alertes si SOV < seuil critique.',
    statut: 'Actif', faq_generees: 0, score_optimisation: 88, icon: 'ri-pie-chart-2-line', plateformes: ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'Copilot'],
  },
];

// ─────────────────────── KPIs GLOBAUX ───────────────────────
export const GEO_GLOBAL_METRICS_V3 = {
  total_faq: 75000,
  total_pillar_pages: 6,
  total_glossary_terms: 24,
  total_guides: 6,
  total_case_studies: 6,
  total_structured_data_types: 12,
  presence_chatgpt: 96,
  presence_gemini: 94,
  presence_claude: 91,
  presence_perplexity: 93,
  presence_copilot: 78,
  citations_ia_mois: 24800,
  score_geo_global: 96,
  share_of_voice: 38,
  sov_chatgpt: 42,
  sov_perplexity: 35,
  featured_snippets: 52,
  knowledge_panels: 8,
  certification: 'AAAA — Big Four Supreme 100% — GEO Authority Enterprise 3.0 — 75K FAQs · 6 Piliers · 24 Glossaires · 6 Guides · 6 Cas Pratiques · 5 Moteurs IA — LEADER GEO AFRIQUE FRANCOPHONE',
  topicBreakdown: [
    { topic: 'BCEAO', faqs: 15000, pillarPages: 1, glossary: 3, guides: 1, caseStudies: 1, sov: 45 },
    { topic: 'UEMOA', faqs: 12000, pillarPages: 1, glossary: 1, guides: 1, caseStudies: 0, sov: 32 },
    { topic: 'OHADA', faqs: 18000, pillarPages: 1, glossary: 1, guides: 1, caseStudies: 1, sov: 40 },
    { topic: 'ESG', faqs: 12000, pillarPages: 1, glossary: 1, guides: 1, caseStudies: 1, sov: 48 },
    { topic: 'Microfinance', faqs: 9000, pillarPages: 1, glossary: 0, guides: 1, caseStudies: 1, sov: 35 },
    { topic: 'Fintech', faqs: 9000, pillarPages: 1, glossary: 1, guides: 1, caseStudies: 1, sov: 38 },
  ],
};



