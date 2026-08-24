// ============================================================
// KOS FRANCOPHONE AFRICA STRATEGIC INTELLIGENCE CENTER™
// Centre d'Intelligence Stratégique pour l'Afrique Francophone
// Mandat Big Four — Prospective Économique
// ============================================================

// ----------------------------------------------------------
// SECTION 1 : ÉVALUATION DES CAPACITÉS ACTUELLES DE KOS
// ----------------------------------------------------------
export const capacitiesAssessment = {
  globalMaturityScore: 78,
  globalMaturityTarget: 95,
  assessmentDate: "2026-06-19",
  assessor: "Consortium PwC · Deloitte · EY · KPMG — Practice Prospective Économique",
  executiveSummary: "KOS dispose d'une infrastructure d'intelligence stratégique solide (78/100) avec des piliers d'excellence en veille réglementaire (92) et analyse financière (85). Les gaps critiques sont la prospective macroéconomique (62), la modélisation économétrique (55) et la diffusion multilingue (58). Le plan de transformation proposé vise à faire de KOS le centre d'intelligence stratégique de référence pour l'Afrique francophone d'ici Q4 2027.",
  pillars: [
    {
      id: "pillar-1",
      name: "Veille Réglementaire & Conformité",
      icon: "ri-shield-check-line",
      color: "emerald",
      score: 92,
      target: 98,
      trend: "+4",
      strengths: [
        "Couverture exhaustive BCEAO, COBAC, OHADA, GAFI, GIABA, GABAC",
        "RAG vectoriel 98% précision sur corpus réglementaire",
        "Agents autonomes de crawling réglementaire (A3 Strategic Intelligence)",
        "Base de données : 179 documents, 58 240 embeddings"
      ],
      gaps: [
        "Absence de modélisation prédictive d'impact réglementaire",
        "Pas de scoring automatisé d'impact client"
      ],
      maturityLabel: "Excellence"
    },
    {
      id: "pillar-2",
      name: "Analyse Financière & Due Diligence",
      icon: "ri-funds-box-line",
      color: "teal",
      score: 85,
      target: 93,
      trend: "+3",
      strengths: [
        "Modèles financiers avancés (business plans, stress tests, valorisations)",
        "Couverture UEMOA + CEMAC + OHADA",
        "7 templates de livrables standardisés niveau Big Four",
        "Pipeline 18,2 Md FCFA d'opportunités commerciales"
      ],
      gaps: [
        "Pas de modèle macroéconomique propriétaire (dépendance FMI/BM)",
        "Absence de prévision de séries temporelles automatisée"
      ],
      maturityLabel: "Avancé"
    },
    {
      id: "pillar-3",
      name: "Intelligence Économique & Marchés",
      icon: "ri-line-chart-line",
      color: "amber",
      score: 72,
      target: 88,
      trend: "+5",
      strengths: [
        "Veille économique 16 sources actives (banques centrales, IFI, médias)",
        "Publication Baromètre PME Afrique (6 éditions, 3 180 backlinks)",
        "Benchmarks sectoriels (FinTech, SFD, ESG)"
      ],
      gaps: [
        "Pas de modèle de prévision de croissance pays (PIB, inflation, IDE)",
        "Absence d'indice composite propriétaire Khepra",
        "Pas d'intégration données alternatives (satellite, mobile money, IoT)"
      ],
      maturityLabel: "Intermédiaire"
    },
    {
      id: "pillar-4",
      name: "Prospective Stratégique & Scénarios",
      icon: "ri-magic-line",
      color: "rose",
      score: 62,
      target: 82,
      trend: "+7",
      strengths: [
        "Analyses SWOT et PESTEL qualitatives",
        "Publications think tank : 8 Livres Blancs, 6 baromètres",
        "Partenariat académique embryonnaire"
      ],
      gaps: [
        "Pas d'exercice de scénarios prospectifs formalisé",
        "Absence de modèle de simulation Monte Carlo",
        "Pas de capacity building en foresight stratégique",
        "Zéro publication prospective labellisée"
      ],
      maturityLabel: "Émergent"
    },
    {
      id: "pillar-5",
      name: "Modélisation Économétrique",
      icon: "ri-function-line",
      color: "violet",
      score: 55,
      target: 78,
      trend: "+2",
      strengths: [
        "Compétences internes en analyse quantitative (Excel, Python embryonnaire)",
        "Accès aux données FMI, Banque Mondiale, BCEAO"
      ],
      gaps: [
        "Pas d'équipe data science dédiée",
        "Absence de modèles économétriques (VAR, ARIMA, DSGE)",
        "Pas de plateforme de modélisation intégrée",
        "Zéro publication avec modélisation quantitative avancée"
      ],
      maturityLabel: "Insuffisant"
    },
    {
      id: "pillar-6",
      name: "Diffusion & Influence Multilingue",
      icon: "ri-global-line",
      color: "cyan",
      score: 58,
      target: 85,
      trend: "+8",
      strengths: [
        "Site web performant : 68 500 sessions/mois",
        "SEO multilingue initié (FR 312 pages, EN 78, PT 12)",
        "Réseau LinkedIn : +12 000 abonnés",
        "105,2k téléchargements publications"
      ],
      gaps: [
        "Contenu EN très limité (78 pages vs 312 FR)",
        "Contenu PT quasi inexistant (12 pages)",
        "Pas de newsletter économique dédiée",
        "Pas de dashboard public d'indicateurs",
        "Pas de stratégie podcast / vidéo / webinaire"
      ],
      maturityLabel: "Émergent"
    },
    {
      id: "pillar-7",
      name: "Gouvernance des Insights",
      icon: "ri-organization-chart",
      color: "indigo",
      score: 65,
      target: 85,
      trend: "+4",
      strengths: [
        "Hub KOS existant avec 9 agents autonomes",
        "RAG vectoriel structuré",
        "Alertes stratégiques automatisées (16 déclenchées)"
      ],
      gaps: [
        "Pas de comité éditorial formalisé",
        "Absence de processus de validation par les pairs",
        "Pas de calendrier de diffusion structuré",
        "Pas de politique de confidentialité / embargo"
      ],
      maturityLabel: "Intermédiaire"
    },
    {
      id: "pillar-8",
      name: "Partenariats & Écosystème",
      icon: "ri-team-line",
      color: "orange",
      score: 68,
      target: 82,
      trend: "+6",
      strengths: [
        "Partenariats institutionnels : BCEAO, BOAD, IFC, UNCDF",
        "Couverture média : Jeune Afrique, Bloomberg, Financial Afrik",
        "Réseau d'experts : 45 consultants"
      ],
      gaps: [
        "Pas de partenariat universitaire structuré (chaire, labo)",
        "Absence de consortium de recherche africain",
        "Pas de représentation dans les conférences économiques majeures"
      ],
      maturityLabel: "Intermédiaire"
    }
  ],
  globalStats: {
    totalSources: 66,
    activeSources: 66,
    countriesMonitored: 23,
    regionsCovered: ["UEMOA", "CEMAC", "CEDEAO", "OHADA", "CIMA"],
    publicationsProduced: 64,
    totalDownloads: 105200,
    citationsMedias: 1428,
    backlinksGenerated: 3180,
    consultantsAvailable: 45,
    revenueCurrentFCFA: 2850000000,
    revenueTargetFCFA: 8500000000
  }
};

// ----------------------------------------------------------
// SECTION 2 : MODULES DE RECHERCHE PROSPECTIVE
// ----------------------------------------------------------
export const prospectiveResearchModules = [
  {
    id: "mod-1",
    name: "Observatoire Macroéconomique UEMOA-CEMAC",
    icon: "ri-global-line",
    color: "emerald",
    priority: "P0",
    status: "Planifié — Lancement Q3 2026",
    description: "Module de suivi et prévision des agrégats macroéconomiques des 14 pays UEMOA+CEMAC. Production trimestrielle d'un tableau de bord avec prévisions PIB, inflation, balance des paiements, dette publique, IDE.",
    deliverables: [
      { name: "Baromètre Macroéconomique Trimestriel", format: "PDF + Dashboard interactif", frequency: "Trimestriel" },
      { name: "Flash Conjoncture Mensuel", format: "Note 4 pages", frequency: "Mensuel" },
      { name: "Prévisions PIB 12 mois glissant", format: "Tableau de bord Excel + API", frequency: "Mensuel" },
      { name: "Rapport Annuel — Perspectives Économiques Afrique Francophone", format: "Livre 120 pages", frequency: "Annuel" }
    ],
    dataSources: ["BCEAO", "BEAC", "FMI WEO", "Banque Mondiale", "INSEED/ANSDE nationaux", "Bloomberg Terminal"],
    team: { lead: "Économiste Senior — Recrutement Q3 2026", analysts: 2, dataEngineers: 1 },
    budgetFCFA: 48000000,
    kpis: ["Précision prévisionnelle > 90%", "4 baromètres/an", "50+ citations médias/an", "200+ téléchargements/édition"],
    expectedImpact: "Positionnement KOS comme source de référence macroéconomique pour l'Afrique francophone"
  },
  {
    id: "mod-2",
    name: "Centre de Prospective Réglementaire",
    icon: "ri-scales-3-line",
    color: "teal",
    priority: "P0",
    status: "En construction — Lancement Q4 2026",
    description: "Module d'analyse prospective des évolutions réglementaires bancaires et financières UEMOA/CEMAC. Modélisation de scénarios d'impact réglementaire sur les institutions financières. Anticipation des transpositions Bâle III/IV, directives ISSB, normes GAFI.",
    deliverables: [
      { name: "Revue Prospective Réglementaire Semestrielle", format: "PDF 80 pages", frequency: "Semestriel" },
      { name: "Regulatory Impact Assessment (RIA)", format: "Rapport sur mesure", frequency: "Sur demande" },
      { name: "Scénarios d'évolution réglementaire 3-5 ans", format: "Présentation + Dashboard", frequency: "Annuel" },
      { name: "Alertes réglementaires avec scoring d'impact prospectif", format: "Email + Telegram", frequency: "Temps réel" }
    ],
    dataSources: ["BCEAO", "COBAC", "OHADA", "GAFI", "GIABA", "GABAC", "Bâle Committee", "ISSB", "OCDE"],
    team: { lead: "Directeur Conformité KOS existant", analysts: 3, legalResearchers: 2 },
    budgetFCFA: 35000000,
    kpis: ["6 RIA livrés/an", "95% précision anticipation réglementaire", "100+ décideurs touchés/semestre"],
    expectedImpact: "KOS devient le partenaire privilégié des institutions financières pour l'anticipation réglementaire"
  },
  {
    id: "mod-3",
    name: "Indice Composite de Compétitivité — Afrique Francophone (ICCAF™)",
    icon: "ri-medal-line",
    color: "amber",
    priority: "P1",
    status: "Conceptualisation — Lancement Q1 2027",
    description: "Création d'un indice composite propriétaire KHEPRA mesurant la compétitivité des 14 économies de l'Afrique francophone (UEMOA+CEMAC). 6 dimensions : environnement des affaires, capital humain, infrastructures, inclusion financière, stabilité macroéconomique, innovation. Publication annuelle avec classement.",
    deliverables: [
      { name: "Rapport ICCAF™ Annuel", format: "Livre 150 pages + Dashboard", frequency: "Annuel" },
      { name: "Classement Interactif ICCAF™", format: "Site web interactif + API", frequency: "Annuel avec mises à jour" },
      { name: "Fiches Pays ICCAF™", format: "PDF 8 pages/pays", frequency: "Annuel" },
      { name: "Événement Lancement ICCAF™", format: "Conférence hybride", frequency: "Annuel" }
    ],
    dataSources: ["FMI WEO", "Banque Mondiale WDI", "BCEAO", "BEAC", "UIT", "PNUD IDH", "Enquêtes terrain KOS"],
    team: { lead: "Research Director — Recrutement", analysts: 4, econometrician: 1, designer: 1 },
    budgetFCFA: 72000000,
    kpis: ["ICCAF™ cité par 5+ médias internationaux/an", "1 000+ téléchargements/an", "Influence sur politiques publiques (2+ citations gouvernementales)"],
    expectedImpact: "KOS devient la référence incontournable en notation de compétitivité Afrique francophone — effet levier commercial massif"
  },
  {
    id: "mod-4",
    name: "Observatoire des Secteurs Stratégiques",
    icon: "ri-building-4-line",
    color: "rose",
    priority: "P1",
    status: "En développement — Lancement Q1 2027",
    description: "Module d'analyse prospective sectorielle couvrant 8 secteurs clés : Banque & Assurance, Microfinance, FinTech, Industries Extractives, Agriculture & Agro-industrie, Énergie, Télécommunications, Transport & Logistique. Chaque secteur bénéficie d'un rapport semestriel avec prévisions 3 ans.",
    deliverables: [
      { name: "Rapports Sectoriels Semestriels (×8)", format: "PDF 60 pages/secteur", frequency: "Semestriel" },
      { name: "Synthèse Exécutive Intersectorielle", format: "PDF 20 pages", frequency: "Semestriel" },
      { name: "Webinaires Sectoriels", format: "Live + Replay", frequency: "Trimestriel" }
    ],
    dataSources: ["Rapports sectoriels IFI", "Données BCEAO/BEAC", "Bloomberg", "McKinsey GI", "Entretiens experts terrain"],
    team: { lead: "Head of Sector Research — Recrutement", analysts: 5, sectorSpecialists: "Pool consultants KOS existants" },
    budgetFCFA: 58000000,
    kpis: ["16 rapports sectoriels/an", "500+ téléchargements/rapport", "5+ missions commerciales dérivées/an"],
    expectedImpact: "Monétisation directe via leads qualifiés — chaque rapport génère 3-5 opportunités commerciales"
  },
  {
    id: "mod-5",
    name: "Laboratoire FinTech & Innovation Financière",
    icon: "ri-cpu-line",
    color: "violet",
    priority: "P2",
    status: "Étude de faisabilité — Lancement Q2 2027",
    description: "Module de veille et analyse prospective des innovations financières en Afrique francophone : mobile money, blockchain, CBDC, open banking, embedded finance, IA en finance. Cartographie de l'écosystème, analyse des business models, scénarios de disruption.",
    deliverables: [
      { name: "Rapport FinTech Afrique Francophone", format: "Livre 100 pages", frequency: "Annuel" },
      { name: "Veille Innovation Financière", format: "Newsletter bi-mensuelle", frequency: "Bi-mensuel" },
      { name: "Cartographie Écosystème FinTech", format: "Dashboard interactif", frequency: "Mise à jour continue" }
    ],
    dataSources: ["Crunchbase", "CB Insights", "GSMA Mobile Money", "Rapports FinTech locaux", "Entretiens startups"],
    team: { lead: "FinTech Analyst — Recrutement", analysts: 2, techScout: 1 },
    budgetFCFA: 38000000,
    kpis: ["200+ FinTechs cartographiées", "2 000+ abonnés newsletter", "5+ missions due diligence FinTech/an"],
    expectedImpact: "Positionnement KOS comme expert incontournable de l'écosystème FinTech francophone"
  },
  {
    id: "mod-6",
    name: "Programme de Modélisation Économétrique Avancée",
    icon: "ri-bar-chart-grouped-line",
    color: "cyan",
    priority: "P1",
    status: "Recrutement — Lancement Q4 2026",
    description: "Développement d'une plateforme de modélisation économétrique propriétaire : modèles VAR structurels, projections DSGE adaptées aux économies francophones, stress tests macroéconomiques, simulations Monte Carlo pour évaluation de politiques publiques.",
    deliverables: [
      { name: "KHEPRA Macro Model™ — Modèle macroéconomique propriétaire", format: "Plateforme Python + API", frequency: "Mise à jour continue" },
      { name: "Simulations de Politiques Publiques", format: "Rapport sur mesure", frequency: "Sur demande" },
      { name: "Stress Tests Macro — Secteur Financier", format: "Rapport technique", frequency: "Annuel" }
    ],
    dataSources: ["Séries temporelles BCEAO/BEAC", "FMI IFS", "Banque Mondiale WDI", "Données alternatives"],
    team: { lead: "Chief Econometrician — Recrutement urgent", economists: 2, dataEngineers: 2 },
    budgetFCFA: 95000000,
    kpis: ["Modèle opérationnel Q4 2026", "Précision prévisionnelle > 92%", "3+ clients institutionnels/an pour simulations"],
    expectedImpact: "Barrière à l'entrée technologique — différenciation définitive vs Big Four"
  }
];

// ----------------------------------------------------------
// SECTION 3 : PLAN DE CONTENU MULTILINGUE (FR/EN/PT)
// ----------------------------------------------------------
export const multilingualContentPlan = {
  currentState: {
    fr: { pages: 312, monthlyTraffic: 58500, seoScore: 95, status: "Mature" },
    en: { pages: 78, monthlyTraffic: 8200, seoScore: 72, status: "Émergent" },
    pt: { pages: 12, monthlyTraffic: 1800, seoScore: 28, status: "Très faible" }
  },
  targetState: {
    fr: { pages: 400, monthlyTraffic: 85000, seoScore: 98, deadline: "Q4 2027" },
    en: { pages: 250, monthlyTraffic: 35000, seoScore: 88, deadline: "Q4 2027" },
    pt: { pages: 120, monthlyTraffic: 12000, seoScore: 75, deadline: "Q4 2027" }
  },
  contentBatches: [
    {
      id: "batch-fr-1",
      language: "FR",
      title: "Production Premium Francophone",
      priority: "P0",
      pagesTarget: 88,
      contentTypes: [
        { type: "Rapports de recherche prospective", count: 12, frequency: "Trimestriel", description: "Baromètres, indices composites, rapports sectoriels" },
        { type: "Notes de conjoncture", count: 24, frequency: "Bi-mensuel", description: "Flashs macro, alerts réglementaires, points marchés" },
        { type: "Livres Blancs & Policy Papers", count: 8, frequency: "Bi-annuel", description: "Analyses approfondies sur des thématiques structurantes" },
        { type: "Articles d'analyse SEO", count: 36, frequency: "3/mois", description: "Articles 2 500-5 000 mots optimisés pour mots-clés stratégiques" },
        { type: "Interviews & Tribunes", count: 8, frequency: "Bi-mensuel", description: "Contributions externes d'experts et décideurs" }
      ],
      budgetPerYearFCFA: 25000000,
      kpis: ["+88 pages FR/an", "+26 500 sessions/mois", "Score SEO 95 → 98"]
    },
    {
      id: "batch-en-1",
      language: "EN",
      title: "Accélération Anglophone",
      priority: "P1",
      pagesTarget: 172,
      contentTypes: [
        { type: "Traductions Premium FR→EN", count: 40, frequency: "3-4/mois", description: "Traduction des contenus phares français avec adaptation culturelle" },
        { type: "Contenu original EN", count: 48, frequency: "4/mois", description: "Articles originaux ciblant les marchés Nigeria, Ghana, Kenya, Afrique du Sud" },
        { type: "Research Papers (English)", count: 6, frequency: "Bi-annuel", description: "Publications académiques en anglais pour citations internationales" },
        { type: "Executive Briefs EN", count: 36, frequency: "3/mois", description: "Synthèses exécutives pour décideurs anglophones" },
        { type: "Newsletter Africonomics™", count: 42, frequency: "Hebdomadaire", description: "Newsletter économique hebdomadaire en anglais" }
      ],
      budgetPerYearFCFA: 35000000,
      kpis: ["+172 pages EN/an", "+26 800 sessions/mois", "Score SEO 72 → 88"]
    },
    {
      id: "batch-pt-1",
      language: "PT",
      title: "Ouverture Lusophone",
      priority: "P2",
      pagesTarget: 108,
      contentTypes: [
        { type: "Traductions FR→PT", count: 36, frequency: "3/mois", description: "Traduction des contenus phares avec adaptation au contexte PALOP" },
        { type: "Contenu original PT", count: 24, frequency: "2/mois", description: "Articles ciblant Angola, Mozambique, Cap-Vert, Guinée-Bissau, São Tomé" },
        { type: "Rapports PALOP", count: 6, frequency: "Semestriel", description: "Analyses dédiées aux économies lusophones africaines" },
        { type: "Newsletter Perspectiva PALOP™", count: 24, frequency: "Bi-mensuel", description: "Newsletter économique en portugais" },
        { type: "Fiches Pays PALOP", count: 18, frequency: "Mensuel", description: "Fiches économiques par pays lusophone" }
      ],
      budgetPerYearFCFA: 20000000,
      kpis: ["+108 pages PT/an", "+10 200 sessions/mois", "Score SEO 28 → 75"]
    }
  ],
  editorialCalendar: {
    quarters: [
      { quarter: "Q3 2026", milestones: ["Lancement Baromètre Macroéconomique", "Recrutement Économiste Senior", "Démarrage traduction EN des 20 contenus phares", "Première Newsletter Africonomics™ test"] },
      { quarter: "Q4 2026", milestones: ["Lancement Centre Prospective Réglementaire", "Recrutement Chief Econometrician", "+30 pages EN publiées", "Premiers articles PT (×6)"] },
      { quarter: "Q1 2027", milestones: ["Lancement ICCAF™ v1", "Lancement Observatoire Sectoriel", "+50 pages EN publiées", "Newsletter Perspectiva PALOP™ lancée"] },
      { quarter: "Q2 2027", milestones: ["Lancement Lab FinTech", "Modèle économétrique opérationnel", "Cap 250 pages EN", "Cap 120 pages PT"] }
    ]
  },
  languagesBreakdown: {
    france: { label: "Français (FR)", flag: "🇫🇷", icon: "ri-flag-line", countriesServed: ["Bénin", "Burkina Faso", "Côte d'Ivoire", "Guinée", "Mali", "Niger", "Sénégal", "Togo", "Cameroun", "Congo", "Gabon", "RCA", "RDC", "Tchad", "Guinée Équatoriale", "Madagascar", "Mauritanie", "Comores", "Burundi", "Djibouti"] },
    english: { label: "English (EN)", flag: "🇬🇧", icon: "ri-english-input", countriesServed: ["Nigeria", "Ghana", "Kenya", "South Africa", "Tanzania", "Uganda", "Ethiopia", "Rwanda", "Liberia", "Sierra Leone", "Gambia", "Zambia", "Zimbabwe"] },
    portuguese: { label: "Português (PT)", flag: "🇵🇹", icon: "ri-global-line", countriesServed: ["Angola", "Moçambique", "Cabo Verde", "Guiné-Bissau", "São Tomé e Príncipe"] }
  }
};

// ----------------------------------------------------------
// SECTION 4 : MODÈLE DE GOUVERNANCE & DIFFUSION DES INSIGHTS
// ----------------------------------------------------------
export const governanceAndDiffusion = {
  governanceModel: {
    name: "KOS Strategic Intelligence Governance Framework™",
    version: "v1.0",
    approvedBy: "Managing Partner Office — Khepra Experts",
    organizationalStructure: {
      strategicCommittee: {
        name: "Comité Stratégique d'Intelligence Économique (CSIE)",
        members: ["Managing Partner (Président)", "Directeur Research Institute", "Directeur BU1 Régulation", "Directeur BU2 Corporate Finance", "Directeur BU3 ESG & Innovation", "Chief Econometrician (recrutement)"],
        frequency: "Mensuel",
        responsibilities: ["Validation des priorités de recherche", "Allocation budgétaire", "Validation des publications flagship", "Décisions de partenariat stratégique", "Revue trimestrielle des KPIs"]
      },
      editorialBoard: {
        name: "Comité Éditorial (CE)",
        members: ["Rédacteur en Chef (recrutement)", "Économiste Senior", "Directeur Communication", "Digital Content Manager", "Traducteur EN Senior", "Traducteur PT Senior"],
        frequency: "Hebdomadaire",
        responsibilities: ["Planification éditoriale", "Revue qualité des publications", "Validation du calendrier de diffusion", "Cohérence multilingue", "Optimisation SEO/AEO"]
      },
      peerReviewPanel: {
        name: "Panel de Revue par les Pairs",
        members: ["3 experts académiques externes (Université de Lomé, FERDI, CERDI)", "2 experts institutionnels (BCEAO, BOAD)", "2 experts praticiens (anciens DG de banque)"],
        frequency: "Avant chaque publication majeure",
        responsibilities: ["Revue méthodologique", "Validation des conclusions", "Crédibilité académique", "Prévention des biais"]
      },
      regionalHubs: {
        name: "Hubs Régionaux d'Intelligence",
        hubs: [
          { region: "UEMOA", location: "Lomé, Togo (HQ)", coverage: "8 pays", team: 8 },
          { region: "CEMAC", location: "Douala, Cameroun", coverage: "6 pays", team: 5 },
          { region: "PALOP", location: "Luanda, Angola (virtuel)", coverage: "5 pays", team: 3 },
          { region: "East Africa", location: "Nairobi, Kenya (virtuel)", coverage: "7 pays", team: 3 }
        ]
      }
    }
  },
  diffusionChannels: [
    {
      id: "ch-1",
      name: "Khepra Insights Platform™",
      icon: "ri-dashboard-3-line",
      channel: "Plateforme Web Interactive",
      frequency: "Temps réel",
      audience: "Décideurs, investisseurs, régulateurs",
      features: ["Dashboard interactif d'indicateurs macroéconomiques", "Classement ICCAF™ interactif", "Cartographie FinTech live", "Accès API pour partenaires institutionnels"],
      status: "Planifié Q1 2027",
      budgetFCFA: 40000000
    },
    {
      id: "ch-2",
      name: "Newsletter Africonomics™ (FR/EN/PT)",
      icon: "ri-mail-send-line",
      channel: "Email Marketing",
      frequency: "Hebdomadaire",
      audience: "Professionnels de la finance et de la régulation",
      targetSubscribers: 25000,
      currentSubscribers: 4200,
      status: "En construction — Lancement Q3 2026",
      budgetFCFA: 8500000
    },
    {
      id: "ch-3",
      name: "Khepra Economic Briefing (Podcast + Vidéo)",
      icon: "ri-mic-line",
      channel: "Podcast + YouTube",
      frequency: "Bi-hebdomadaire",
      audience: "Grand public éclairé, étudiants, jeunes professionnels",
      expectedReach: "10 000 écoutes/mois d'ici Q4 2027",
      status: "Planifié Q1 2027",
      budgetFCFA: 12000000
    },
    {
      id: "ch-4",
      name: "Conférence Annuelle — Forum Économique Khepra",
      icon: "ri-calendar-event-line",
      channel: "Événement Hybride",
      frequency: "Annuel",
      audience: "300+ participants : DG de banques, régulateurs, investisseurs, médias",
      firstEdition: "Q1 2027 — Lomé, Togo",
      status: "En planification",
      budgetFCFA: 35000000
    },
    {
      id: "ch-5",
      name: "Réseaux Sociaux & Distribution Digitale",
      icon: "ri-share-line",
      channel: "LinkedIn, Twitter/X, WhatsApp Business",
      frequency: "Quotidien",
      audience: "Abonnés LinkedIn (cible 50k), Twitter (cible 15k)",
      expectedReach: "100 000 impressions/mois d'ici Q4 2027",
      status: "Actif — Scaling en cours",
      budgetFCFA: 5000000
    },
    {
      id: "ch-6",
      name: "Partenariats Médias & Syndication",
      icon: "ri-newspaper-line",
      channel: "Jeune Afrique, Bloomberg, Financial Afrik, Ecofin, The Africa Report",
      frequency: "Mensuel",
      audience: "Lecteurs médias économiques panafricains",
      expectedReach: "500 000+ lecteurs cumulés",
      status: "5 partenariats actifs — Extension à 10",
      budgetFCFA: 0
    }
  ],
  qualityControlProtocol: {
    name: "KOS Insight Quality Protocol (IQP)™",
    steps: [
      { step: 1, name: "Collecte & Vérification", description: "Sources primaires vérifiées, triangulation minimale 3 sources, datation précise" },
      { step: 2, name: "Analyse & Modélisation", description: "Méthodologie documentée et reproductible, hypothèses explicites, intervalles de confiance" },
      { step: 3, name: "Peer Review", description: "Double revue aveugle par panel externe pour publications flagship" },
      { step: 4, name: "Validation Éditoriale", description: "Conformité charte éditoriale Khepra, vérification factuelle, cohérence multilingue" },
      { step: 5, name: "Embargo & Diffusion", description: "Politique d'embargo strict, diffusion prioritaire clients, puis publique" },
      { step: 6, name: "Suivi & Correction", description: "Monitoring des citations, corrections si erreurs, traçabilité des versions" }
    ]
  },
  kpiDashboard: {
    quarters: [
      { quarter: "Q3 2026", milestones: ["Gouvernance CSIE opérationnelle", "Recrutement Rédacteur en Chef", "Lancement Newsletter Africonomics™", "20 contenus EN traduits"], targetScore: 82 },
      { quarter: "Q4 2026", milestones: ["Modèle économétrique v1", "Plateforme Insights interactive beta", "50 contenus EN publiés", "Premier Forum Économique teaser"], targetScore: 86 },
      { quarter: "Q1 2027", milestones: ["ICCAF™ publié", "Forum Économique inaugural", "Plateforme Insights live", "100 contenus EN"], targetScore: 90 },
      { quarter: "Q2 2027", milestones: ["Laboratoire FinTech opérationnel", "250 contenus EN — 120 PT", "Podcast 10k écoutes/mois", "Score maturité global 95"], targetScore: 95 }
    ]
  },
  budgetSummary: {
    totalAnnualFCFA: 278800000,
    breakdown: [
      { category: "Modules de Recherche (6 modules)", amountFCFA: 345000000, note: "Investissement pluriannuel" },
      { category: "Contenu Multilingue (FR/EN/PT)", amountFCFA: 80000000, note: "Production + traduction + SEO" },
      { category: "Plateforme & Diffusion", amountFCFA: 110500000, note: "Dev + Design + Hosting" },
      { category: "Recrutement (7 postes clés)", amountFCFA: 210000000, note: "Salaires annuels chargés" },
      { category: "Événementiel & Communication", amountFCFA: 52000000, note: "Forum + Conférences" }
    ],
    roiProjection: "ROI projeté ×6 en 24 mois — Chaque FCFA investi génère 6 FCFA de revenus additionnels via leads qualifiés et missions dérivées"
  }
};

// ----------------------------------------------------------
// SECTION 5 : STATISTIQUES AGRÉGÉES DU HUB
// ----------------------------------------------------------
export const francophoneAfricaStats = {
  globalScore: 78,
  globalTarget: 95,
  modulesTotal: 6,
  modulesP0: 2,
  modulesP1: 3,
  modulesP2: 1,
  triLingualPagesCurrent: 402,
  triLingualPagesTarget: 770,
  diffusionChannels: 6,
  governanceLayers: 4,
  quarterlyMilestones: 16,
  budgetAnnualFCFA: 278800000,
  revenueProjectionFCFA: 8500000000,
  countriesCovered: 23,
  languagesServed: 3,
  teamTargetSize: 65
};





