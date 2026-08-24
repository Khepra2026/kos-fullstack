export const seoAeoPublicDashboard = {
  title: "KOS SEO/AEO Public Command™",
  subtitle: "Tableau de bord public — Performance SEO, AEO, Core Web Vitals & Schema.org",
  globalScore: 91,
  targetScore: 97,
  lastUpdated: "2026-06-24T08:00:00Z",
  coreWebVitals: {
    score: 87,
    target: 98,
    pagesTotal: 211,
    pagesPass: 184,
    pagesPoor: 9,
    pagesNeedImprovement: 18,
    metrics: [
      { name: "LCP (Largest Contentful Paint)", value: "2.1s", threshold: "2.5s", status: "pass", score: 92 },
      { name: "INP (Interaction to Next Paint)", value: "148ms", threshold: "200ms", status: "pass", score: 88 },
      { name: "CLS (Cumulative Layout Shift)", value: "0.08", threshold: "0.1", status: "pass", score: 90 },
      { name: "TTFB (Time to First Byte)", value: "380ms", threshold: "800ms", status: "pass", score: 85 },
      { name: "FCP (First Contentful Paint)", value: "1.4s", threshold: "1.8s", status: "pass", score: 86 }
    ],
    poorPages: [
      { url: "/blog/provisionnement-ifrs9-creances-souffrance", lcp: "4.2s", cls: "0.15", issue: "Images non optimisées" },
      { url: "/blog/gestion-actif-passif-alm-bancaire-uemoa", lcp: "3.8s", cls: "0.12", issue: "Tableaux larges non responsives" },
      { url: "/services/detail/diagnostic-organisationnel", lcp: "3.5s", cls: "0.11", issue: "JavaScript non différé" },
      { url: "/tools/diagnostic-risques", lcp: "4.1s", cls: "0.14", issue: "Polices Google non optimisées" },
      { url: "/tools/simulateur-financier", lcp: "3.9s", cls: "0.10", issue: "Scripts bloquants" },
      { url: "/blog/stress-tests-climatiques-pilier-2-bceao-cobac", lcp: "3.6s", cls: "0.13", issue: "Images lourdes" },
      { url: "/blog/esg-banques-africaines-standards-issb", lcp: "4.0s", cls: "0.09", issue: "CSS non critique" },
      { url: "/blog/cybersecurite-bancaire-directive-cobac-2027", lcp: "3.3s", cls: "0.11", issue: "Ressources externes lentes" },
      { url: "/blog/digitalisation-sfd-modele-bceao-inclusion-financiere", lcp: "3.7s", cls: "0.12", issue: "WebFonts bloquantes" }
    ]
  },
  aeo: {
    score: 78,
    target: 95,
    engines: [
      { name: "ChatGPT", score: 72, citations: 45, queries: "conformité BCEAO, régulation bancaire UEMOA, agrément SFD", status: "improving" },
      { name: "Claude", score: 68, citations: 32, queries: "prix de transfert Afrique, documentation BEPS, Master File Local File", status: "critical" },
      { name: "Gemini", score: 75, citations: 28, queries: "gouvernance OHADA, audit interne COSO, cartographie risques", status: "improving" },
      { name: "Perplexity", score: 82, citations: 67, queries: "microfinance SFD ratios prudentiels, LBC/FT GAFI 2026", status: "good" },
      { name: "Copilot", score: 70, citations: 19, queries: "ESG Afrique, due diligence PME, levée de fonds CEDAO", status: "critical" },
      { name: "DeepSeek", score: 85, citations: 53, queries: "instruction BCEAO, circulaire COBAC, normes IFRS 9", status: "good" }
    ],
    llmsTxt: {
      status: "active",
      lastGenerated: "2026-06-24T06:00:00Z",
      size: "llms.txt: 47 Ko, llms-full.txt: 1.2 Mo",
      pagesIndexed: 175
    }
  },
  schema: {
    score: 88,
    target: 100,
    coverage: 88,
    types: [
      { type: "Organization", pages: 211, status: "complete" },
      { type: "WebPage", pages: 211, status: "complete" },
      { type: "BreadcrumbList", pages: 211, status: "complete" },
      { type: "FAQPage", pages: 34, status: "complete" },
      { type: "Article", pages: 45, status: "complete" },
      { type: "Person", pages: 12, status: "complete" },
      { type: "LocalBusiness", pages: 3, status: "complete" },
      { type: "OfferCatalog", pages: 8, status: "complete" },
      { type: "HowTo", pages: 0, status: "missing", priority: "medium" },
      { type: "ScholarlyArticle", pages: 0, status: "missing", priority: "high" },
      { type: "Dataset", pages: 0, status: "missing", priority: "medium" },
      { type: "VideoObject", pages: 0, status: "missing", priority: "high" }
    ]
  },
  seo: {
    pagesExpertes: 211,
    targetPages: 1000,
    backlinks: 328,
    targetBacklinks: 5000,
    top3Google: 4,
    targetTop3: 15,
    keywordsTracked: 285,
    avgPosition: 8.2,
    trafficOrganic: "32 400 visites/mois",
    topKeywords: [
      { keyword: "conformité BCEAO", position: 1, volume: 5400, trend: "up" },
      { keyword: "agrément SFD", position: 2, volume: 3200, trend: "up" },
      { keyword: "prix de transfert Afrique", position: 3, volume: 2800, trend: "stable" },
      { keyword: "gouvernance OHADA", position: 1, volume: 3800, trend: "up" },
      { keyword: "audit interne COSO", position: 5, volume: 2100, trend: "up" },
      { keyword: "LBC/FT GAFI", position: 4, volume: 1900, trend: "stable" },
      { keyword: "microfinance SFD", position: 3, volume: 3500, trend: "up" },
      { keyword: "ESG banques africaines", position: 7, volume: 1600, trend: "up" },
      { keyword: "due diligence PME", position: 6, volume: 2400, trend: "stable" },
      { keyword: "cybersécurité bancaire COBAC", position: 2, volume: 1800, trend: "up" },
      { keyword: "cartographie risques COSO ERM", position: 4, volume: 1500, trend: "up" },
      { keyword: "levée de fonds CEDAO", position: 8, volume: 1200, trend: "stable" }
    ],
    backlinksRecent: [
      { domain: "bceao.int", dr: 91, page: "Liens utiles — Cabinets agréés", date: "2026-06-20" },
      { domain: "banquemondiale.org", dr: 93, page: "Rapport Doing Business — Partenaires techniques", date: "2026-06-18" },
      { domain: "ohada.org", dr: 78, page: "Annuaire des experts OHADA", date: "2026-06-15" },
      { domain: "jeuneafrique.com", dr: 85, page: "Interview — Régulation financière en Afrique", date: "2026-06-12" },
      { domain: "financialafrik.com", dr: 62, page: "Citation — Analyse BCEAO 2026", date: "2026-06-10" },
      { domain: "afdb.org", dr: 88, page: "Partenaires consulting — Secteur financier", date: "2026-06-08" },
      { domain: "gafi.org", dr: 95, page: "Références — Cabinets d'audit LBC/FT", date: "2026-06-05" },
      { domain: "cobac.org", dr: 72, page: "Publications — Analyses externes", date: "2026-06-01" },
      { domain: "linkedin.com", dr: 99, page: "Partage article KHEPRA — 1 247 interactions", date: "2026-05-28" },
      { domain: "ecofinagency.com", dr: 58, page: "Reprise communiqué — Baromètre BCEAO", date: "2026-05-25" }
    ],
    cannibalization: [
      { pair: ["/services/conformite", "/pillar/conformite-reglementaire-afrique"], overlap: "72%", action: "Consolidation en cours" },
      { pair: ["/blog/gouvernance-sfd", "/pillar/gouvernance-entreprise-afrique"], overlap: "65%", action: "Différenciation par mot-clé" },
      { pair: ["/services/audit", "/tools/diagnostic-pre-inspection"], overlap: "58%", action: "Canonicalisation planifiée" },
      { pair: ["/blog/regulation-fintech", "/pillar/fintech-advisory-africa"], overlap: "52%", action: "Différenciation par audience" }
    ]
  },
  geoVisibility: {
    score: 82,
    target: 95,
    regions: [
      { region: "UEMOA", score: 94, queries: 1280, improvement: "+12% MoM" },
      { region: "CEMAC", score: 88, queries: 890, improvement: "+8% MoM" },
      { region: "CEDEAO", score: 85, queries: 1450, improvement: "+15% MoM" },
      { region: "Afrique Centrale", score: 82, queries: 720, improvement: "+10% MoM" },
      { region: "Afrique de l'Est", score: 65, queries: 340, improvement: "+5% MoM" },
      { region: "Afrique du Nord", score: 58, queries: 210, improvement: "+3% MoM" },
      { region: "Europe (Diaspora)", score: 72, queries: 560, improvement: "+7% MoM" },
      { region: "International", score: 55, queries: 890, improvement: "+4% MoM" }
    ]
  },
  actionPlan: [
    { action: "Performance fix — 9 pages CWV Poor", priority: "critical", deadline: "J+7", impact: "+5 pts CWV", status: "in_progress" },
    { action: "Génération 70 pages expertes SEO", priority: "critical", deadline: "J+14", impact: "+8 pts pages expertes", status: "planned" },
    { action: "Campagne backlinks — 28 domaines cibles", priority: "critical", deadline: "J+21", impact: "+172 backlinks", status: "planned" },
    { action: "AEO Optimization — Claude/Copilot", priority: "high", deadline: "J+21", impact: "+10 pts AEO", status: "planned" },
    { action: "Schema.org HowTo + ScholarlyArticle + VideoObject", priority: "high", deadline: "J+30", impact: "+12 pts Schema", status: "planned" },
    { action: "Cannibalisation fix — 4 paires", priority: "medium", deadline: "J+30", impact: "+3 pts ranking", status: "planned" },
    { action: "GEO Afrique du Nord/Est — Pages localisées", priority: "medium", deadline: "J+60", impact: "+15 pts GEO régional", status: "planned" }
  ]
};





