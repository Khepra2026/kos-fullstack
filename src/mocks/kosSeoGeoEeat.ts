// P3 — KOS SEO GEO EEAT — 100k Pages Indexables
// Ferme Gap P11 — DA 2→40 — GSC 100k pages J+60

export const SEO_GEO_STATS = {
  pages_indexees_gsc: 924,
  pages_indexables_target: 100000,
  pages_programmatiques_deployed: 924,
  da_current: 28,
  da_target: 40,
  traffic_organic_monthly: 24800,
  traffic_target_monthly: 100000,
  keywords_top10: 1800,
  keywords_target: 5000,
  featured_snippets: 52,
  featured_snippets_target: 200,
  backlinks_active: 89,
  backlinks_target_tier1: 25,
  gsc_impressions_7d: 142000,
  gsc_clicks_7d: 4800,
  gsc_ctr_avg: 3.4,
  gsc_position_avg: 18.2,
};

export const SEO_PROGRAMMATIC_TEMPLATES = [
  {
    id: 'tpl01',
    slug_pattern: '/reglementation/{pays}/{secteur}/{texte}/{article}',
    exemple: '/reglementation/togo/banque/instruction-bceao-2016-03/article-12',
    description: 'Page programmatique par article réglementaire — niveau article',
    pages_potentielles: 45000,
    pages_deployees: 312,
    schema_types: ['Article', 'FAQPage', 'BreadcrumbList'],
    avg_impressions: 120,
    revalidate_hours: 24,
  },
  {
    id: 'tpl02',
    slug_pattern: '/guide/{pays}/{theme}',
    exemple: '/guide/senegal/conformite-bceao-2026',
    description: 'Guides pratiques par pays et thème',
    pages_potentielles: 8000,
    pages_deployees: 187,
    schema_types: ['HowTo', 'FAQPage', 'Article'],
    avg_impressions: 340,
    revalidate_hours: 48,
  },
  {
    id: 'tpl03',
    slug_pattern: '/observatoire/{pays}/{secteur}',
    exemple: '/observatoire/uemoa/microfinance',
    description: 'Observatoires sectoriels par pays',
    pages_potentielles: 3400,
    pages_deployees: 68,
    schema_types: ['WebPage', 'FAQPage', 'BreadcrumbList'],
    avg_impressions: 520,
    revalidate_hours: 12,
  },
  {
    id: 'tpl04',
    slug_pattern: '/glossaire/{terme}',
    exemple: '/glossaire/ratio-de-solvabilite',
    description: 'Glossaire réglementaire — chaque terme avec définition + sources officielles',
    pages_potentielles: 12000,
    pages_deployees: 357,
    schema_types: ['DefinedTerm', 'FAQPage'],
    avg_impressions: 89,
    revalidate_hours: 168,
  },
];

export const SEO_KEYWORDS_CLUSTERS = [
  {
    cluster: 'BCEAO / Banque UEMOA',
    keywords: 1247,
    keywords_top10: 487,
    traffic_monthly: 8900,
    pages: 89,
    competition: 'faible',
    opportunity_score: 9.2,
    exemples: ['conformité BCEAO 2026', 'dispositif prudentiel UEMOA', 'instruction BCEAO microfinance'],
  },
  {
    cluster: 'COBAC / Banque CEMAC',
    keywords: 534,
    keywords_top10: 189,
    traffic_monthly: 4200,
    pages: 45,
    competition: 'faible',
    opportunity_score: 8.8,
    exemples: ['règlement COBAC 2026', 'inspection COBAC Cameroun', 'risques bancaires CEMAC'],
  },
  {
    cluster: 'LBC/FT / GAFI Afrique',
    keywords: 892,
    keywords_top10: 312,
    traffic_monthly: 5600,
    pages: 67,
    competition: 'moyenne',
    opportunity_score: 8.5,
    exemples: ['recommandations GAFI 2026', 'conformité LCB-FT banque', 'évaluation mutuelle UEMOA'],
  },
  {
    cluster: 'OHADA / Droit Affaires',
    keywords: 1456,
    keywords_top10: 623,
    traffic_monthly: 12300,
    pages: 123,
    competition: 'faible',
    opportunity_score: 9.5,
    exemples: ['acte uniforme OHADA 2024', 'droit des sociétés OHADA', 'SYSCOHADA révisé'],
  },
  {
    cluster: 'FinTech / Agrément',
    keywords: 678,
    keywords_top10: 234,
    traffic_monthly: 6700,
    pages: 56,
    competition: 'moyenne',
    opportunity_score: 8.7,
    exemples: ['agrément fintech BCEAO 2026', 'établissement paiement UEMOA', 'monnaie électronique EME'],
  },
];

export const SEO_GEO_AEO_METRICS = {
  chatgpt_visibility: 72,
  perplexity_visibility: 85,
  google_ai_overviews: 81,
  claude_visibility: 58,
  gemini_visibility: 67,
  copilot_visibility: 45,
  llms_txt_deployed: true,
  speakable_schema_pages: 34,
  faq_schema_pages: 287,
  howto_schema_pages: 12,
};

export const SEO_ROADMAP_PHASES = [
  {
    phase: 'Semaine 1 — Quick Wins',
    done: true,
    actions: [
      { action: 'GSC connecté + domaine vérifié', impact: 'Données SEO réelles', status: 'done' },
      { action: 'CSP + HSTS headers activés', impact: 'Score sécurité A+', status: 'done' },
      { action: 'FAQ Schema sur 50 pages piliers', impact: '+35% featured snippets', status: 'done' },
      { action: 'llms.txt mis à jour', impact: 'GEO visibilité +15%', status: 'done' },
    ],
  },
  {
    phase: 'Mois 1 — Content Authority',
    done: false,
    actions: [
      { action: '924 → 5000 pages programmatiques ISR', impact: '+400% pages indexées', status: 'in_progress' },
      { action: 'Preload LCP image sur 30 pages hero', impact: 'CWV vert 100%', status: 'in_progress' },
      { action: 'H2 reformulés en questions AEO (100 pages)', impact: '+40% extraction IA', status: 'pending' },
      { action: 'Backlinks SSRN — 3 articles soumis', impact: 'DA +5', status: 'done' },
    ],
  },
  {
    phase: 'Mois 2 — GSC 20k pages',
    done: false,
    actions: [
      { action: '20 000 pages programmatiques ISR', impact: 'GSC 20k pages', status: 'pending' },
      { action: 'AEO Score 78→92/100', impact: '+47 featured snippets', status: 'pending' },
      { action: '1 Tribune Jeune Afrique', impact: 'Backlink Tier-1', status: 'pending' },
      { action: 'DA mesuré Ahrefs — vérification réelle', impact: 'DA réel documenté', status: 'pending' },
    ],
  },
  {
    phase: 'J+60 — GSC 100k pages',
    done: false,
    actions: [
      { action: '100 000 pages ISR déployées', impact: 'GSC 100k target', status: 'pending' },
      { action: 'DA 28 → 40+', impact: 'Inbound leads Big Four', status: 'pending' },
      { action: 'Trafic 24k → 100k/mois', impact: '×4 trafic organique', status: 'pending' },
      { action: 'SGE / GEO Top 3 — 5 requêtes piliers', impact: 'Lead Generation +60%', status: 'pending' },
    ],
  },
];

export const SEO_BACKLINKS_OPPORTUNITIES = [
  { source: 'Jeune Afrique', dr: 84, type: 'Tribune mensuelle', status: 'in_progress', estimated_traffic: 4200 },
  { source: 'SSRN.com', dr: 91, type: 'Article académique', status: 'done', estimated_traffic: 890 },
  { source: 'Ecofin Agency', dr: 68, type: 'Communiqué presse', status: 'done', estimated_traffic: 1200 },
  { source: 'Africa CEO Forum', dr: 72, type: 'Position paper', status: 'planned', estimated_traffic: 2100 },
  { source: 'Financial Afrik', dr: 65, type: 'Article partenaire', status: 'done', estimated_traffic: 3400 },
  { source: 'Wikipedia BCEAO', dr: 93, type: 'Référence citée', status: 'in_progress', estimated_traffic: 5600 },
];

export const SEO_KPI_TARGETS = {
  gsc_pages_j60: { target: 100000, current: 924, unit: 'pages indexées' },
  da_target: { target: 40, current: 28, unit: 'Domain Authority' },
  traffic_target: { target: 100000, current: 24800, unit: 'visites/mois' },
  featured_snippets: { target: 200, current: 52, unit: 'featured snippets' },
  backlinks_tier1: { target: 25, current: 12, unit: 'backlinks DR>50' },
};





