// ================================================================
// KOS GLOBAL VISIBILITY COMMAND™
// Centre de Commandement Unifié de la Visibilité Globale
// Mandat Big Four — SEO & Communication Digitale
// Piliers : SEO Multilingue · Publications Académiques · Partenariats Médias · IA Génératives
// Consortium PwC · Deloitte · EY · KPMG — Practice Digital Visibility
// ================================================================

// ----------------------------------------------------------
// SECTION 1 : MÉTRIQUES GLOBALES DE VISIBILITÉ
// ----------------------------------------------------------
export interface GlobalVisibilityMetric {
  category: string;
  score: number;
  target: number;
  trend: number;
  status: 'excellence' | 'avance' | 'intermediaire' | 'emergent' | 'critique';
  icon: string;
}

export const globalVisibilityMetrics: GlobalVisibilityMetric[] = [
  { category: 'SEO Multilingue (FR/EN/PT)', score: 65, target: 92, trend: 12, status: 'intermediaire', icon: 'ri-global-line' },
  { category: 'Publications Académiques & White Papers', score: 48, target: 85, trend: 8, status: 'emergent', icon: 'ri-book-open-line' },
  { category: 'Partenariats Médias Internationaux', score: 52, target: 80, trend: 15, status: 'emergent', icon: 'ri-newspaper-line' },
  { category: 'Visibilité IA Génératives (AEO/GEO)', score: 58, target: 85, trend: 22, status: 'intermediaire', icon: 'ri-robot-2-line' },
];

export const globalVisibilityScore = {
  overall: 56,
  target: 88,
  trend: 14,
  assessmentDate: '2026-06-19',
  assessor: 'Consortium PwC · Deloitte · EY · KPMG — Practice Digital Visibility',
  executiveSummary: "KOS atteint un score de visibilité globale de 56/100, avec une cible ambitieuse de 88/100 d'ici Q2 2027. Le SEO multilingue est le pilier le plus mature (65/100) grâce aux 312 pages FR bien positionnées, mais les 3 autres piliers restent émergents. L'urgence absolue : accélérer les publications académiques (48/100) qui sont le socle de crédibilité pour les partenariats médias et la visibilité IA. Le plan propose 20 actions correctives sur 12 mois pour un budget total de 215,8 M FCFA.",
  quickStats: {
    totalPagesIndexed: 402,
    totalBacklinks: 2850,
    domainRating: 85,
    domainAuthority: 72,
    organicTrafficMonthly: 68500,
    whitepapersPublished: 8,
    academicCitations: 142,
    mediaPartnershipsActive: 5,
    mediaMentionsMonthly: 42,
    geoScore: 58,
    aiPlatformsMonitored: 5,
  },
};

// ----------------------------------------------------------
// SECTION 2 : SEO MULTILINGUE (FR/EN/PT)
// ----------------------------------------------------------
export interface LanguageSEOStats {
  langue: 'FR' | 'EN' | 'PT';
  pages: number;
  targetPages: number;
  trafic: number;
  targetTrafic: number;
  motsClesTop3: number;
  motsClesTop10: number;
  featuredSnippets: number;
  scoreSEO: number;
  hreflangOK: boolean;
  contenuOriginal: number;
  contenuTraduit: number;
  gapPages: number;
  tendances: { label: string; valeur: number; evolution: number }[];
  topKeywords: { kw: string; position: number; volume: number; evolution: number }[];
}

export const multilingualSEOStats: LanguageSEOStats[] = [
  {
    langue: 'FR',
    pages: 312,
    targetPages: 420,
    trafic: 58500,
    targetTrafic: 85000,
    motsClesTop3: 612,
    motsClesTop10: 847,
    featuredSnippets: 47,
    scoreSEO: 95,
    hreflangOK: true,
    contenuOriginal: 312,
    contenuTraduit: 0,
    gapPages: 108,
    tendances: [
      { label: 'Trafic Organique', valeur: 58500, evolution: 12 },
      { label: 'Mots-Clés Top 10', valeur: 847, evolution: 8 },
      { label: 'Featured Snippets', valeur: 47, evolution: 15 },
    ],
    topKeywords: [
      { kw: 'conformité BCEAO banque', position: 1, volume: 8800, evolution: 1 },
      { kw: 'gouvernance OHADA entreprise', position: 1, volume: 7200, evolution: 0 },
      { kw: 'consultant conformité UEMOA', position: 1, volume: 6500, evolution: 0 },
      { kw: 'due diligence Afrique francophone', position: 1, volume: 5600, evolution: 0 },
      { kw: 'cabinet audit CEMAC', position: 2, volume: 4800, evolution: 0 },
    ],
  },
  {
    langue: 'EN',
    pages: 78,
    targetPages: 250,
    trafic: 8200,
    targetTrafic: 35000,
    motsClesTop3: 42,
    motsClesTop10: 142,
    featuredSnippets: 3,
    scoreSEO: 72,
    hreflangOK: true,
    contenuOriginal: 48,
    contenuTraduit: 30,
    gapPages: 172,
    tendances: [
      { label: 'Trafic Organique', valeur: 8200, evolution: 35 },
      { label: 'Mots-Clés Top 10', valeur: 142, evolution: 28 },
      { label: 'Featured Snippets', valeur: 3, evolution: 50 },
    ],
    topKeywords: [
      { kw: 'African banking compliance', position: 8, volume: 4500, evolution: 4 },
      { kw: 'OHADA corporate governance', position: 5, volume: 3800, evolution: 4 },
      { kw: 'BCEAO regulatory framework 2026', position: 6, volume: 5200, evolution: 5 },
      { kw: 'African fintech regulation 2026', position: 10, volume: 4200, evolution: 9 },
      { kw: 'AML compliance francophone Africa', position: 9, volume: 3500, evolution: 7 },
    ],
  },
  {
    langue: 'PT',
    pages: 12,
    targetPages: 120,
    trafic: 1800,
    targetTrafic: 12000,
    motsClesTop3: 0,
    motsClesTop10: 8,
    featuredSnippets: 0,
    scoreSEO: 28,
    hreflangOK: false,
    contenuOriginal: 6,
    contenuTraduit: 6,
    gapPages: 108,
    tendances: [
      { label: 'Trafic Organique', valeur: 1800, evolution: 45 },
      { label: 'Mots-Clés Top 10', valeur: 8, evolution: 60 },
      { label: 'Featured Snippets', valeur: 0, evolution: 0 },
    ],
    topKeywords: [
      { kw: 'conformidade BCEAO SFD', position: 22, volume: 1200, evolution: 13 },
      { kw: 'governança OHADA Africa', position: 18, volume: 1500, evolution: 10 },
      { kw: 'auditoria COBAC bancos', position: 25, volume: 900, evolution: 15 },
      { kw: 'formação conformidade bancária África', position: 28, volume: 800, evolution: 14 },
      { kw: 'regulação financeira PALOP', position: 32, volume: 600, evolution: 18 },
    ],
  },
];

// ----------------------------------------------------------
// SECTION 3 : PUBLICATIONS ACADÉMIQUES & WHITE PAPERS
// ----------------------------------------------------------
export interface AcademicPublication {
  id: string;
  titre: string;
  type: 'white_paper' | 'research_report' | 'barometer' | 'policy_paper' | 'academic_article';
  langue: 'FR' | 'EN' | 'PT';
  datePublication: string;
  pages: number;
  citations: number;
  telechargements: number;
  backlinksGeneres: number;
  thematique: string;
  statut: 'publié' | 'en_cours' | 'planifié';
  scoreQualite: number;
  auteurs: string[];
  abstract: string;
  journal?: string;
  doi?: string;
}

export const academicPublications: AcademicPublication[] = [
  {
    id: 'pub-001',
    titre: 'Baromètre Conformité BCEAO 2026 — État des lieux et perspectives réglementaires',
    type: 'barometer',
    langue: 'FR',
    datePublication: '2026-06-01',
    pages: 85,
    citations: 28,
    telechargements: 4200,
    backlinksGeneres: 185,
    thematique: 'Conformité Réglementaire',
    statut: 'publié',
    scoreQualite: 92,
    auteurs: ['Dr. Amadou Koné', 'Marie Bamba', 'KOS Research Institute'],
    abstract: 'Analyse exhaustive du cadre réglementaire BCEAO 2026 couvrant les 22 instructions en vigueur. Évaluation de la maturité de conformité de 45 institutions financières UEMOA. Identification de 12 gaps critiques et recommandations priorisées.',
  },
  {
    id: 'pub-002',
    titre: 'Gouvernance des SFD en zone UEMOA — Guide pratique de mise en conformité',
    type: 'white_paper',
    langue: 'FR',
    datePublication: '2026-04-15',
    pages: 120,
    citations: 35,
    telechargements: 6800,
    backlinksGeneres: 245,
    thematique: 'Gouvernance Microfinance',
    statut: 'publié',
    scoreQualite: 88,
    auteurs: ['Prof. Fatoumata Diallo', 'KOS Research Institute'],
    abstract: 'Guide exhaustif couvrant les 14 exigences de gouvernance de la circulaire BCEAO 01-2017. 45 études de cas, matrices de conformité, modèles de chartes et checklists opérationnelles pour les conseils dadministration de SFD.',
  },
  {
    id: 'pub-003',
    titre: 'ESG Reporting Standards for African Financial Institutions — ISSB Alignment Roadmap',
    type: 'white_paper',
    langue: 'EN',
    datePublication: '2026-03-20',
    pages: 95,
    citations: 18,
    telechargements: 3100,
    backlinksGeneres: 128,
    thematique: 'ESG & Durabilité',
    statut: 'publié',
    scoreQualite: 85,
    auteurs: ['Dr. Sarah Mensah', 'KOS ESG Practice'],
    abstract: 'Comprehensive roadmap for African banks and microfinance institutions to align with ISSB S1/S2 standards. Gap analysis for 28 institutions across UEMOA and CEMAC. Practical implementation toolkit with 90-day quick-start guide.',
  },
  {
    id: 'pub-004',
    titre: 'LCB-FT Compliance in Francophone Africa — GAFI 2026 Standards Applied',
    type: 'research_report',
    langue: 'EN',
    datePublication: '2026-02-10',
    pages: 110,
    citations: 22,
    telechargements: 2800,
    backlinksGeneres: 95,
    thematique: 'LCB-FT',
    statut: 'publié',
    scoreQualite: 82,
    auteurs: ['KOS Compliance Practice', 'GIABA Research Unit'],
    abstract: 'In-depth analysis of the 2026 GAFI recommendations impact on Francophone African financial systems. Covers 11 immediate outcomes, risk-based approach implementation, and cross-border cooperation mechanisms. Benchmark of 18 countries.',
  },
  {
    id: 'pub-005',
    titre: 'Stress Tests Climatiques — Pilier 2 Bâle pour les Banques UEMOA/CEMAC',
    type: 'white_paper',
    langue: 'FR',
    datePublication: '2026-01-15',
    pages: 75,
    citations: 15,
    telechargements: 2500,
    backlinksGeneres: 72,
    thematique: 'Risques Climatiques',
    statut: 'publié',
    scoreQualite: 78,
    auteurs: ['KOS Risk Advisory', 'BCEAO Direction Stabilité Financière'],
    abstract: 'Premier guide méthodologique complet pour les stress tests climatiques adapté au contexte UEMOA/CEMAC. Scénarios de transition et physiques calibrés sur les données régionales. Templates Excel et scripts Python open source.',
  },
  {
    id: 'pub-006',
    titre: 'Baromètre PME Afrique Francophone — Édition 2026',
    type: 'barometer',
    langue: 'FR',
    datePublication: '2025-12-01',
    pages: 140,
    citations: 42,
    telechargements: 8500,
    backlinksGeneres: 380,
    thematique: 'PME & Entrepreneuriat',
    statut: 'publié',
    scoreQualite: 90,
    auteurs: ['KOS SME Transformation Center'],
    abstract: '6ème édition du baromètre de référence. Enquête auprès de 580 PME dans 14 pays. Indice composite de santé des PME, analyse sectorielle (agro-industrie, services, tech), perspectives de croissance et accès au financement.',
  },
  {
    id: 'pub-007',
    titre: 'Transfer Pricing in Africa — BEPS 2.0 Implementation Roadmap',
    type: 'policy_paper',
    langue: 'EN',
    datePublication: '2025-11-10',
    pages: 65,
    citations: 12,
    telechargements: 1800,
    backlinksGeneres: 58,
    thematique: 'Prix de Transfert',
    statut: 'publié',
    scoreQualite: 80,
    auteurs: ['KOS Transfer Pricing Practice', 'OECD Regional Advisor'],
    abstract: 'Practical roadmap for African tax administrations and multinationals on BEPS 2.0 Pillar One and Two implementation. Country-by-country analysis of readiness levels. Model documentation templates compliant with OECD 2025 guidelines.',
  },
  {
    id: 'pub-008',
    titre: 'Digitalisation des SFD — Modèle BCEAO pour lInclusion Financière',
    type: 'research_report',
    langue: 'FR',
    datePublication: '2025-09-05',
    pages: 90,
    citations: 25,
    telechargements: 3900,
    backlinksGeneres: 165,
    thematique: 'Digitalisation',
    statut: 'publié',
    scoreQualite: 87,
    auteurs: ['KOS Digital Transformation Practice'],
    abstract: 'Analyse du cadre BCEAO pour la digitalisation des SFD. Benchmark de 35 institutions, cartographie des solutions technologiques, analyse coûts-bénéfices, étude dimpact sur linclusion financière des populations non bancarisées.',
  },
  {
    id: 'pub-009',
    titre: 'ICCAF™ — Indice Composite de Compétitivité Afrique Francophone (Preview)',
    type: 'research_report',
    langue: 'FR',
    datePublication: '2026-09-01',
    pages: 150,
    citations: 0,
    telechargements: 0,
    backlinksGeneres: 0,
    thematique: 'Compétitivité',
    statut: 'planifié',
    scoreQualite: 0,
    auteurs: ['KOS Francophone Africa Strategic Center'],
    abstract: 'Premier indice composite propriétaire KHEPRA mesurant la compétitivité des 14 économies UEMOA+CEMAC sur 6 dimensions : environnement des affaires, capital humain, infrastructures, inclusion financière, stabilité macro, innovation.',
  },
  {
    id: 'pub-010',
    titre: 'African Microfinance Digital Transformation — A 5-Year Outlook',
    type: 'white_paper',
    langue: 'EN',
    datePublication: '2026-10-01',
    pages: 100,
    citations: 0,
    telechargements: 0,
    backlinksGeneres: 0,
    thematique: 'Microfinance',
    statut: 'planifié',
    scoreQualite: 0,
    auteurs: ['KOS Microfinance Practice'],
    abstract: '5-year strategic outlook for microfinance digitalization in Sub-Saharan Africa. Covers mobile money integration, AI-driven credit scoring, blockchain for transparency, and regulatory sandbox models across 8 jurisdictions.',
  },
  {
    id: 'pub-011',
    titre: 'Regulação Financeira PALOP — Guia Comparativo UEMOA/CEMAC',
    type: 'white_paper',
    langue: 'PT',
    datePublication: '2026-12-01',
    pages: 85,
    citations: 0,
    telechargements: 0,
    backlinksGeneres: 0,
    thematique: 'Conformité',
    statut: 'planifié',
    scoreQualite: 0,
    auteurs: ['KOS Lusophone Africa Desk'],
    abstract: 'Primeiro guia comparativo completo entre regulação financeira UEMOA, CEMAC e PALOP. Análise de convergência regulatória, oportunidades de harmonização e recomendações para instituições financeiras multi-jurisdição.',
  },
  {
    id: 'pub-012',
    titre: 'Cybersecurity Governance for African Banks — ISO 27001 & COBAC Compliance',
    type: 'white_paper',
    langue: 'EN',
    datePublication: '2026-11-01',
    pages: 95,
    citations: 0,
    telechargements: 0,
    backlinksGeneres: 0,
    thematique: 'Cybersécurité',
    statut: 'planifié',
    scoreQualite: 0,
    auteurs: ['KOS Cyber Security Practice'],
    abstract: 'Comprehensive framework aligning ISO/IEC 27001:2022 with COBAC cybersecurity directives for CEMAC banks. Implementation roadmap, control mapping, audit checklist, and board-level reporting templates.',
  },
];

// ----------------------------------------------------------
// SECTION 4 : PARTENARIATS MÉDIAS INTERNATIONAUX
// ----------------------------------------------------------
export interface MediaPartnership {
  id: string;
  media: string;
  logo: string;
  type: 'presse_eco' | 'agence' | 'broadcast' | 'digital' | 'academic';
  region: string;
  audience: number;
  statut: 'actif' | 'negociation' | 'cible';
  niveau: 'premium' | 'standard' | 'emerging';
  mentionsMensuelles: number;
  derniereMention: string;
  typeContenu: string;
  valeurFCFA: number;
  contactStatus: string;
}

export const mediaPartnerships: MediaPartnership[] = [
  { id: 'med-001', media: 'Jeune Afrique', logo: 'ri-newspaper-line', type: 'presse_eco', region: 'Panafricain', audience: 2500000, statut: 'actif', niveau: 'premium', mentionsMensuelles: 8, derniereMention: '2026-06-15', typeContenu: 'Tribunes expertes + Interviews CEO', valeurFCFA: 15000000, contactStatus: 'Contact éditorial direct' },
  { id: 'med-002', media: 'Bloomberg Africa', logo: 'ri-global-line', type: 'agence', region: 'International', audience: 5000000, statut: 'actif', niveau: 'premium', mentionsMensuelles: 3, derniereMention: '2026-05-28', typeContenu: 'Citations analyses marchés', valeurFCFA: 25000000, contactStatus: 'Terminal Bloomberg + desk Afrique' },
  { id: 'med-003', media: 'Financial Afrik', logo: 'ri-newspaper-line', type: 'digital', region: 'Afrique Francophone', audience: 800000, statut: 'actif', niveau: 'standard', mentionsMensuelles: 12, derniereMention: '2026-06-18', typeContenu: 'Articles réguliers + communiqués', valeurFCFA: 3500000, contactStatus: 'Partenariat éditorial actif' },
  { id: 'med-004', media: 'Ecofin', logo: 'ri-line-chart-line', type: 'digital', region: 'Afrique Francophone', audience: 600000, statut: 'actif', niveau: 'standard', mentionsMensuelles: 6, derniereMention: '2026-06-10', typeContenu: 'Analyses sectorielles', valeurFCFA: 2500000, contactStatus: 'Syndication automatique' },
  { id: 'med-005', media: 'The Africa Report', logo: 'ri-global-line', type: 'presse_eco', region: 'International', audience: 1200000, statut: 'actif', niveau: 'standard', mentionsMensuelles: 4, derniereMention: '2026-05-15', typeContenu: 'Interviews + classements', valeurFCFA: 8000000, contactStatus: 'Correspondant Afrique Ouest' },
  { id: 'med-006', media: 'Reuters Africa', logo: 'ri-global-line', type: 'agence', region: 'International', audience: 15000000, statut: 'negociation', niveau: 'premium', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Fil info + analyses', valeurFCFA: 30000000, contactStatus: 'Négociation accréditation presse' },
  { id: 'med-007', media: 'BBC Africa Business', logo: 'ri-broadcast-line', type: 'broadcast', region: 'International', audience: 8000000, statut: 'cible', niveau: 'premium', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Interviews TV + Radio', valeurFCFA: 20000000, contactStatus: 'À approcher via bureau Lagos' },
  { id: 'med-008', media: 'CNBC Africa', logo: 'ri-broadcast-line', type: 'broadcast', region: 'Afrique Anglophone', audience: 3500000, statut: 'cible', niveau: 'premium', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Market updates + CEO interviews', valeurFCFA: 18000000, contactStatus: 'Contact Johannesbourg identifié' },
  { id: 'med-009', media: 'Revista Negócios (Angola)', logo: 'ri-newspaper-line', type: 'presse_eco', region: 'PALOP', audience: 400000, statut: 'cible', niveau: 'emerging', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Articles PT + analyses PALOP', valeurFCFA: 3000000, contactStatus: 'À prospecter — desk Luanda' },
  { id: 'med-010', media: 'African Business Magazine', logo: 'ri-book-open-line', type: 'presse_eco', region: 'International', audience: 900000, statut: 'cible', niveau: 'standard', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Contributions mensuelles', valeurFCFA: 6000000, contactStatus: 'Editorial board identifié' },
  { id: 'med-011', media: 'Le Monde Afrique', logo: 'ri-newspaper-line', type: 'presse_eco', region: 'International', audience: 3000000, statut: 'negociation', niveau: 'premium', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Tribunes + interviews', valeurFCFA: 12000000, contactStatus: 'Chef desk Afrique contacté Q2' },
  { id: 'med-012', media: 'Harvard Business Review Africa', logo: 'ri-book-open-line', type: 'academic', region: 'International', audience: 500000, statut: 'cible', niveau: 'premium', mentionsMensuelles: 0, derniereMention: '—', typeContenu: 'Articles académiques business', valeurFCFA: 10000000, contactStatus: 'Soumission éditoriale nécessaire' },
];

// ----------------------------------------------------------
// SECTION 5 : VISIBILITÉ IA GÉNÉRATIVES (AEO/GEO)
// ----------------------------------------------------------
export interface AIPlatformVisibility {
  plateforme: string;
  logo: string;
  scoreVisibilite: number;
  targetScore: number;
  citations: number;
  featuredSnippets: number;
  tendances: number;
  statut: 'optimisé' | 'bon' | 'ameliorer' | 'critique';
  pointsForts: string[];
  pointsFaibles: string[];
  actionsRecommandees: string[];
  dernierScan: string;
}

export const aiPlatformVisibility: AIPlatformVisibility[] = [
  {
    plateforme: 'ChatGPT / OpenAI',
    logo: 'ri-openai-line',
    scoreVisibilite: 52,
    targetScore: 80,
    citations: 98,
    featuredSnippets: 0,
    tendances: 22,
    statut: 'bon',
    pointsForts: ['llms.txt actif (23 KB)', 'llms-full.txt structuré', 'Citations sur requêtes réglementaires BCEAO/OHADA'],
    pointsFaibles: ['Pas de contenu structuré Q&A optimisé ChatGPT', 'Faible couverture EN/PT', 'Absence de knowledge graph exploitable'],
    actionsRecommandees: ['Créer FAQ structurée 200 questions', 'Optimiser contenu format Q&A naturel', 'Enrichir llms.txt avec sections EN/PT'],
    dernierScan: '2026-06-18',
  },
  {
    plateforme: 'Google Gemini',
    logo: 'ri-google-line',
    scoreVisibilite: 62,
    targetScore: 85,
    citations: 115,
    featuredSnippets: 42,
    tendances: 15,
    statut: 'bon',
    pointsForts: ['Schema.org complet sur 10 pages clés', '47 featured snippets dans Google SERP', 'Knowledge panels actifs (3)'],
    pointsFaibles: ['Faible présence EN dans les AI Overviews', 'Peu de contenu structuré pour Gemini Deep Research'],
    actionsRecommandees: ['Amplifier Schema.org aux 50 pages principales', 'Créer des synthèses exécutives format Gemini', 'Optimiser les données structurées FAQPage'],
    dernierScan: '2026-06-18',
  },
  {
    plateforme: 'Microsoft Copilot / Bing',
    logo: 'ri-microsoft-line',
    scoreVisibilite: 48,
    targetScore: 78,
    citations: 72,
    featuredSnippets: 0,
    tendances: 18,
    statut: 'ameliorer',
    pointsForts: ['Indexation Bing correcte', 'Présence sur requêtes professionnelles'],
    pointsFaibles: ['Pas de Bing Webmaster Tools actif', 'Faible optimisation spécifique Copilot', 'Indexation inférieure à Google'],
    actionsRecommandees: ['Activer Bing Webmaster Tools', 'Soumettre sitemaps multilingues à Bing', 'Vérifier indexation Bing des pages EN/PT'],
    dernierScan: '2026-06-18',
  },
  {
    plateforme: 'Perplexity AI',
    logo: 'ri-search-line',
    scoreVisibilite: 45,
    targetScore: 75,
    citations: 76,
    featuredSnippets: 0,
    tendances: 28,
    statut: 'ameliorer',
    pointsForts: ['Forte croissance des citations (+28%)', 'Bon référencement sur requêtes techniques BCEAO'],
    pointsFaibles: ['Pas doptimisation spécifique Perplexity', 'Sources non attribuées sur 30% des citations'],
    actionsRecommandees: ['Soumettre site à Perplexity index', 'Créer pages informatives structurées', 'Vérifier attribution correcte des sources'],
    dernierScan: '2026-06-18',
  },
  {
    plateforme: 'Claude / Anthropic',
    logo: 'ri-robot-2-line',
    scoreVisibilite: 38,
    targetScore: 72,
    citations: 52,
    featuredSnippets: 0,
    tendances: 35,
    statut: 'ameliorer',
    pointsForts: ['Plus forte croissance (+35%)', 'llms-full.txt bien structuré pour ingestion'],
    pointsFaibles: ['Score absolu le plus bas', 'Très peu de contenu EN indexé', 'Manque de contenu deep research long format'],
    actionsRecommandees: ['Produire des rapports longs format EN', 'Optimiser llms-full.txt pour Claude context window', 'Créer un knowledge hub structuré accessible'],
    dernierScan: '2026-06-18',
  },
];

// ----------------------------------------------------------
// SECTION 6 : PLAN DE VISIBILITÉ — OBJECTIFS MENSUELS
// ----------------------------------------------------------
export interface MonthlyVisibilityObjective {
  mois: string;
  label: string;
  axePrincipal: string;
  objectifs: string[];
  kpis: { nom: string; actuel: number; cible: number; unite: string }[];
  actions: string[];
  budgetFCFA: number;
  responsable: string;
  livrables: string[];
}

export const monthlyVisibilityPlan: MonthlyVisibilityObjective[] = [
  {
    mois: '2026-07',
    label: 'Juillet 2026 — Fondations',
    axePrincipal: 'SEO Multilingue + Audit IA',
    objectifs: ['Corriger 100% des erreurs hreflang', 'Audit complet visibilité IA génératives', 'Lancer production contenu EN (×15 pages)'],
    kpis: [
      { nom: 'Erreurs hreflang', actuel: 28, cible: 0, unite: 'erreurs' },
      { nom: 'Pages EN indexées', actuel: 78, cible: 93, unite: 'pages' },
      { nom: 'Score GEO global', actuel: 58, cible: 62, unite: '/100' },
      { nom: 'Mentions médias', actuel: 42, cible: 50, unite: 'mentions' },
    ],
    actions: ['Audit hreflang 402 pages', 'Déploiement correctif canoniques', 'Brief créatif contenu EN', 'Contact 3 nouveaux médias'],
    budgetFCFA: 12500000,
    responsable: 'Équipe SEO + Content',
    livrables: ['Rapport correction hreflang', '15 articles EN publiés', '3 nouveaux contacts médias', 'Rapport audit IA génératives'],
  },
  {
    mois: '2026-08',
    label: 'Août 2026 — Accélération EN',
    axePrincipal: 'SEO Anglophone + Publications',
    objectifs: ['Publier 20 pages EN', 'Lancer production White Paper Q3', 'Négocier partenariat Reuters Africa'],
    kpis: [
      { nom: 'Pages EN indexées', actuel: 93, cible: 113, unite: 'pages' },
      { nom: 'Trafic EN', actuel: 8200, cible: 10500, unite: 'sessions' },
      { nom: 'White Papers en production', actuel: 0, cible: 2, unite: 'papers' },
      { nom: 'Partenariats médias actifs', actuel: 5, cible: 6, unite: 'partenariats' },
    ],
    actions: ['Production 20 articles EN ciblés', 'Démarrage White Paper Cybersécurité ISO 27001', 'Négociation Reuters', 'Optimisation contenu pour AI Overviews'],
    budgetFCFA: 18500000,
    responsable: 'Content Factory + Media Relations',
    livrables: ['20 pages EN publiées', 'Draft White Paper Cybersécurité', 'Reuters NDA signé', '20 articles optimisés FAQ Schema'],
  },
  {
    mois: '2026-09',
    label: 'Septembre 2026 — Publications Flagship',
    axePrincipal: 'White Papers + Médias',
    objectifs: ['Publier White Paper Cybersécurité', 'Publier ICCAF™ v1', 'Lancer newsletter Africonomics™ EN', 'Début contenu PT'],
    kpis: [
      { nom: 'White Papers publiés (cumul)', actuel: 8, cible: 10, unite: 'papers' },
      { nom: 'Citations académiques', actuel: 142, cible: 200, unite: 'citations' },
      { nom: 'Pages PT indexées', actuel: 12, cible: 24, unite: 'pages' },
      { nom: 'Score GEO', actuel: 62, cible: 66, unite: '/100' },
    ],
    actions: ['Publication + promotion White Paper Cyber', 'Lancement ICCAF™ avec communiqué presse', 'Création newsletter template EN', 'Production 12 pages PT'],
    budgetFCFA: 24500000,
    responsable: 'Research Institute + Communication',
    livrables: ['White Paper Cybersécurité publié', 'ICCAF™ v1 publié', 'Newsletter EN #1 envoyée', '12 pages PT publiées'],
  },
  {
    mois: '2026-10',
    label: 'Octobre 2026 — Médias Panafricains',
    axePrincipal: 'Partenariats Médias + EN',
    objectifs: ['Finaliser partenariat Reuters', 'Publier 25 pages EN', 'Intervention BBC Africa Business', 'Lancer podcast Khepra Economic Briefing'],
    kpis: [
      { nom: 'Partenariats médias actifs', actuel: 6, cible: 8, unite: 'partenariats' },
      { nom: 'Pages EN indexées', actuel: 113, cible: 138, unite: 'pages' },
      { nom: 'Mentions médias mensuelles', actuel: 50, cible: 75, unite: 'mentions' },
      { nom: 'Abonnés newsletter', actuel: 4200, cible: 8000, unite: 'abonnés' },
    ],
    actions: ['Finalisation Reuters + 1er article', 'Production 25 articles EN', 'Préparation intervention BBC', 'Studio podcast setup'],
    budgetFCFA: 22500000,
    responsable: 'Media Relations + Content Factory',
    livrables: ['Reuters actif', '25 pages EN', 'Interview BBC enregistrée', 'Podcast épisode pilote'],
  },
  {
    mois: '2026-11',
    label: 'Novembre 2026 — PT & PALOP',
    axePrincipal: 'SEO Lusophone + Académique',
    objectifs: ['Publier 20 pages PT', 'White Paper Microfinance EN', 'Soumettre article Harvard Business Review', 'Contacter Le Monde Afrique'],
    kpis: [
      { nom: 'Pages PT indexées', actuel: 24, cible: 44, unite: 'pages' },
      { nom: 'Trafic PT', actuel: 1800, cible: 3500, unite: 'sessions' },
      { nom: 'White Papers EN publiés', actuel: 8, cible: 10, unite: 'papers' },
      { nom: 'Backlinks .edu/.org', actuel: 8, cible: 25, unite: 'backlinks' },
    ],
    actions: ['Production 20 pages PT', 'Rédaction White Paper Microfinance EN', 'Préparation soumission HBR', 'Contact Le Monde Afrique'],
    budgetFCFA: 20500000,
    responsable: 'Lusophone Desk + Research',
    livrables: ['20 pages PT', 'White Paper Microfinance publié', 'Article HBR soumis', 'Contact Le Monde établi'],
  },
  {
    mois: '2026-12',
    label: 'Décembre 2026 — Bilan Semestriel',
    axePrincipal: 'Synthèse + IA',
    objectifs: ['Publier White Paper PALOP PT', 'Atteindre 250 pages EN cumulées', 'Score GEO > 70', 'Bilan semestriel visibilité globale'],
    kpis: [
      { nom: 'Score visibilité global', actuel: 56, cible: 72, unite: '/100' },
      { nom: 'Pages EN cumulées', actuel: 138, cible: 172, unite: 'pages' },
      { nom: 'Pages PT cumulées', actuel: 44, cible: 60, unite: 'pages' },
      { nom: 'Citations IA génératives', actuel: 413, cible: 650, unite: 'citations' },
    ],
    actions: ['Publication White Paper PALOP PT', 'Push final contenu EN', 'Optimisation GEO sur 100 pages clés', 'Rapport semestriel Big Four'],
    budgetFCFA: 18500000,
    responsable: 'Direction Research + SEO',
    livrables: ['White Paper PALOP', '172 pages EN', 'Score GEO 72', 'Rapport H1 2026'],
  },
  {
    mois: '2027-01',
    label: 'Janvier 2027 — Scaling',
    axePrincipal: 'Scale EN/PT + Médias',
    objectifs: ['200 pages EN', '80 pages PT', 'Lancement partenariat HBR Africa', 'Baromètre Conformité BCEAO 2027'],
    kpis: [
      { nom: 'Pages EN', actuel: 172, cible: 200, unite: 'pages' },
      { nom: 'Pages PT', actuel: 60, cible: 80, unite: 'pages' },
      { nom: 'Partenariats médias actifs', actuel: 8, cible: 10, unite: 'partenariats' },
      { nom: 'Trafic organique total', actuel: 68500, cible: 80000, unite: 'sessions' },
    ],
    actions: ['Production 28 pages EN', 'Production 20 pages PT', 'Activation HBR Africa', 'Collecte données Baromètre BCEAO'],
    budgetFCFA: 22500000,
    responsable: 'Global Content + Media',
    livrables: ['200 EN / 80 PT', 'HBR Africa actif', 'Data Baromètre BCEAO collectée'],
  },
  {
    mois: '2027-02',
    label: 'Février 2027 — Excellence IA',
    axePrincipal: 'IA Génératives + Académique',
    objectifs: ['Score GEO > 78', 'White Paper ESG Africa EN', 'Intervention CNBC Africa', 'FAQ 200 questions IA optimisées'],
    kpis: [
      { nom: 'Score GEO', actuel: 72, cible: 78, unite: '/100' },
      { nom: 'Citations ChatGPT', actuel: 98, cible: 180, unite: 'citations' },
      { nom: 'Citations Gemini', actuel: 115, cible: 200, unite: 'citations' },
      { nom: 'White Papers EN cumulés', actuel: 10, cible: 12, unite: 'papers' },
    ],
    actions: ['Production FAQ 200 Q&A optimisées IA', 'Publication White Paper ESG EN', 'Intervention CNBC Africa', 'Optimisation llms-full.txt v3'],
    budgetFCFA: 19500000,
    responsable: 'SEO GEO + Research',
    livrables: ['FAQ 200 publiée', 'White Paper ESG', 'Interview CNBC diffusée', 'llms-full.txt v3'],
  },
  {
    mois: '2027-03',
    label: 'Mars 2027 — Conférence & Lancement',
    axePrincipal: 'Événementiel + PT',
    objectifs: ['Forum Économique Khepra inaugural', '100 pages PT', 'Lancement podcast saison 2', 'Partenariat CNBC Africa actif'],
    kpis: [
      { nom: 'Score visibilité global', actuel: 72, cible: 80, unite: '/100' },
      { nom: 'Pages PT', actuel: 80, cible: 100, unite: 'pages' },
      { nom: 'Participants Forum', actuel: 0, cible: 300, unite: 'participants' },
      { nom: 'Audience podcast mensuelle', actuel: 0, cible: 5000, unite: 'écoutes' },
    ],
    actions: ['Organisation Forum Économique', 'Production 20 pages PT', 'Production podcast S2 ×4 épisodes', 'Activation CNBC Africa'],
    budgetFCFA: 42000000,
    responsable: 'Events + Lusophone Desk + Media',
    livrables: ['Forum tenu (300 participants)', '100 pages PT', 'Podcast S2 lancé', 'CNBC Africa partnership live'],
  },
  {
    mois: '2027-04',
    label: 'Avril 2027 — Consécration Académique',
    axePrincipal: 'Publications + Influence',
    objectifs: ['Soumission papier académique Journal of African Economies', 'White Paper FinTech Africa EN', 'Baromètre PME Afrique 2027', 'Score visibilité > 83'],
    kpis: [
      { nom: 'Score visibilité global', actuel: 80, cible: 83, unite: '/100' },
      { nom: 'Publications académiques', actuel: 0, cible: 1, unite: 'papiers' },
      { nom: 'Baromètres publiés (cumul)', actuel: 2, cible: 4, unite: 'baromètres' },
      { nom: 'Citations Google Scholar', actuel: 0, cible: 15, unite: 'citations' },
    ],
    actions: ['Rédaction papier académique', 'Publication White Paper FinTech', 'Enquête PME 2027 terrain', 'Outreach universitaire (5 universités)'],
    budgetFCFA: 18500000,
    responsable: 'Research Institute',
    livrables: ['Papier JAE soumis', 'White Paper FinTech', 'Baromètre PME 2027', '5 partenariats universitaires initiés'],
  },
  {
    mois: '2027-05',
    label: 'Mai 2027 — Domination Multilingue',
    axePrincipal: 'Full Stack Multilingue',
    objectifs: ['250 pages EN', '120 pages PT', 'Score GEO > 82', 'Partenariat académique formalisé (Chaire)'],
    kpis: [
      { nom: 'Pages EN', actuel: 200, cible: 250, unite: 'pages' },
      { nom: 'Pages PT', actuel: 100, cible: 120, unite: 'pages' },
      { nom: 'Score GEO', actuel: 78, cible: 82, unite: '/100' },
      { nom: 'Partenariats académiques', actuel: 0, cible: 2, unite: 'chaires' },
    ],
    actions: ['Production 50 pages EN', 'Production 20 pages PT', 'Optimisation GEO finale', 'Signature convention chaire universitaire'],
    budgetFCFA: 16500000,
    responsable: 'Global Content + Academic Relations',
    livrables: ['250 EN / 120 PT', 'Score GEO 82', 'Chaire universitaire signée'],
  },
  {
    mois: '2027-06',
    label: 'Juin 2027 — Cible Atteinte',
    axePrincipal: 'Bilan Final + Certification',
    objectifs: ['Score visibilité global > 88', '12 partenariats médias actifs', 'Certification qualité publications', 'Bilan annuel Big Four'],
    kpis: [
      { nom: 'Score visibilité global', actuel: 83, cible: 88, unite: '/100' },
      { nom: 'Partenariats médias', actuel: 10, cible: 12, unite: 'partenariats' },
      { nom: 'Trafic organique total', actuel: 80000, cible: 105000, unite: 'sessions' },
      { nom: 'ROI Visibilité', actuel: 0, cible: 450000000, unite: 'FCFA' },
    ],
    actions: ['Audit final visibilité Big Four', 'Certification qualité ISO pour publications', 'Rapport annuel impact visibilité', 'Célébration équipe'],
    budgetFCFA: 12000000,
    responsable: 'Managing Partner Office',
    livrables: ['Score 88/100 atteint', '12 partenariats médias', 'Rapport ROI visibilité', 'Certification qualité'],
  },
];

// ----------------------------------------------------------
// SECTION 7 : KPIs MENSUELS — TABLEAU DE BORD
// ----------------------------------------------------------
export interface MonthlyVisibilityKPI {
  mois: string;
  scoreGlobal: number;
  seoMultilingue: number;
  publications: number;
  medias: number;
  iaGeneratives: number;
  sessionsOrganiques: number;
  backlinks: number;
  mentions: number;
  citationsIA: number;
  whitepapersCumul: number;
  partenariatsActifs: number;
  budgetCumulFCFA: number;
  commentaire: string;
}

export const monthlyVisibilityKPIs: MonthlyVisibilityKPI[] = [
  { mois: '2026-06', scoreGlobal: 56, seoMultilingue: 65, publications: 48, medias: 52, iaGeneratives: 58, sessionsOrganiques: 68500, backlinks: 2850, mentions: 42, citationsIA: 413, whitepapersCumul: 8, partenariatsActifs: 5, budgetCumulFCFA: 0, commentaire: 'Baseline — diagnostic Big Four terminé' },
  { mois: '2026-07', scoreGlobal: 60, seoMultilingue: 70, publications: 52, medias: 55, iaGeneratives: 62, sessionsOrganiques: 71000, backlinks: 2920, mentions: 50, citationsIA: 450, whitepapersCumul: 8, partenariatsActifs: 5, budgetCumulFCFA: 12500000, commentaire: 'Correction hreflang + démarrage EN' },
  { mois: '2026-08', scoreGlobal: 64, seoMultilingue: 75, publications: 56, medias: 58, iaGeneratives: 64, sessionsOrganiques: 72500, backlinks: 2980, mentions: 58, citationsIA: 490, whitepapersCumul: 8, partenariatsActifs: 6, budgetCumulFCFA: 31000000, commentaire: '+20 pages EN, Reuters négociation' },
  { mois: '2026-09', scoreGlobal: 68, seoMultilingue: 78, publications: 62, medias: 62, iaGeneratives: 66, sessionsOrganiques: 74500, backlinks: 3100, mentions: 65, citationsIA: 540, whitepapersCumul: 10, partenariatsActifs: 6, budgetCumulFCFA: 55500000, commentaire: 'ICCAF™ + WP Cyber publiés' },
  { mois: '2026-10', scoreGlobal: 70, seoMultilingue: 80, publications: 65, medias: 66, iaGeneratives: 68, sessionsOrganiques: 76500, backlinks: 3250, mentions: 75, citationsIA: 580, whitepapersCumul: 10, partenariatsActifs: 8, budgetCumulFCFA: 78000000, commentaire: 'Reuters actif, Podcast lancé' },
  { mois: '2026-11', scoreGlobal: 72, seoMultilingue: 82, publications: 68, medias: 68, iaGeneratives: 70, sessionsOrganiques: 78500, backlinks: 3400, mentions: 82, citationsIA: 620, whitepapersCumul: 11, partenariatsActifs: 9, budgetCumulFCFA: 98500000, commentaire: 'WP Microfinance EN, HBR soumis' },
  { mois: '2026-12', scoreGlobal: 75, seoMultilingue: 84, publications: 72, medias: 70, iaGeneratives: 72, sessionsOrganiques: 81000, backlinks: 3580, mentions: 90, citationsIA: 650, whitepapersCumul: 12, partenariatsActifs: 9, budgetCumulFCFA: 117000000, commentaire: 'Bilan H1 — 172 EN, 60 PT, GEO 72' },
  { mois: '2027-01', scoreGlobal: 77, seoMultilingue: 86, publications: 74, medias: 72, iaGeneratives: 74, sessionsOrganiques: 83500, backlinks: 3750, mentions: 95, citationsIA: 700, whitepapersCumul: 12, partenariatsActifs: 10, budgetCumulFCFA: 139500000, commentaire: 'Baromètre BCEAO 2027 lancé' },
  { mois: '2027-02', scoreGlobal: 79, seoMultilingue: 88, publications: 76, medias: 74, iaGeneratives: 78, sessionsOrganiques: 86000, backlinks: 3950, mentions: 105, citationsIA: 800, whitepapersCumul: 13, partenariatsActifs: 10, budgetCumulFCFA: 159000000, commentaire: 'FAQ 200 IA + WP ESG EN, GEO 78' },
  { mois: '2027-03', scoreGlobal: 82, seoMultilingue: 89, publications: 78, medias: 78, iaGeneratives: 80, sessionsOrganiques: 89000, backlinks: 4150, mentions: 120, citationsIA: 880, whitepapersCumul: 13, partenariatsActifs: 11, budgetCumulFCFA: 201000000, commentaire: 'Forum Économique — 300 participants' },
  { mois: '2027-04', scoreGlobal: 84, seoMultilingue: 90, publications: 82, medias: 80, iaGeneratives: 82, sessionsOrganiques: 92000, backlinks: 4350, mentions: 130, citationsIA: 950, whitepapersCumul: 14, partenariatsActifs: 11, budgetCumulFCFA: 219500000, commentaire: 'Papier JAE soumis, WP FinTech' },
  { mois: '2027-05', scoreGlobal: 86, seoMultilingue: 91, publications: 84, medias: 82, iaGeneratives: 84, sessionsOrganiques: 98000, backlinks: 4600, mentions: 142, citationsIA: 1050, whitepapersCumul: 14, partenariatsActifs: 12, budgetCumulFCFA: 236000000, commentaire: '250 EN, 120 PT, GEO 82, Chaire signée' },
  { mois: '2027-06', scoreGlobal: 88, seoMultilingue: 92, publications: 85, medias: 84, iaGeneratives: 85, sessionsOrganiques: 105000, backlinks: 4900, mentions: 155, citationsIA: 1200, whitepapersCumul: 14, partenariatsActifs: 12, budgetCumulFCFA: 248000000, commentaire: 'CIBLE ATTEINTE — 88/100 — Leader visibilité Afrique' },
];

// ----------------------------------------------------------
// SECTION 8 : STATISTIQUES AGRÉGÉES
// ----------------------------------------------------------
export const globalVisibilityAggregatedStats = {
  scoreGlobal: 56,
  targetGlobal: 88,
  budgetTotalFCFA: 248000000,
  dureeMois: 12,
  actionsCorrectives: 48,
  partenariatsCibles: 12,
  publicationsPlanifiees: 6,
  pagesMultilinguesCible: 790,
  traficOrganiqueCible: 105000,
  roiProjete: '×6 — 1,49 Md FCFA de revenus additionnels générés par la visibilité accrue',
  certificationVisee: 'KOS Global Visibility Leader — Big Four Certified 88/100',
};



