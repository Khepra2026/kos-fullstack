export const intlSeoOverview = {
  globalScore: 54,
  targetScore: 85,
  languages: 3,
  activeLanguages: 3,
  countries: 14,
  activeCountries: 9,
  hreflangTags: 342,
  hreflangErrors: 28,
  translatedPages: 187,
  totalPages: 247,
  translationCoverage: 76,
  duplicateContentRisk: 12,
  canonicalErrors: 8,
  geoPerformanceScore: 61,
};

export const hreflangAudit = [
  { id: 'HRF-01', page: '/services/audit-pre-inspection-bceao', languages: 3, status: '✅ Valide', errors: 0, lastVerified: '2026-06-14', priority: 'Haute', traffic: 1240 },
  { id: 'HRF-02', page: '/services/conformite-cobac-cemac', languages: 2, status: '⚠️ Partiel', errors: 2, lastVerified: '2026-06-14', priority: 'Haute', traffic: 890, issue: 'EN manquant pour COBAC spécialisé' },
  { id: 'HRF-03', page: '/services/prix-de-transfert', languages: 3, status: '✅ Valide', errors: 0, lastVerified: '2026-06-13', priority: 'Critique', traffic: 2150 },
  { id: 'HRF-04', page: '/blog/controle-interne-tresorerie', languages: 2, status: '❌ Erreurs', errors: 4, lastVerified: '2026-06-11', priority: 'Moyenne', traffic: 340, issue: 'x-default mal configuré, self-referencing manquant' },
  { id: 'HRF-05', page: '/guide-bceao-2026', languages: 2, status: '⚠️ Partiel', errors: 1, lastVerified: '2026-06-12', priority: 'Haute', traffic: 1580, issue: 'EN canonical pointe vers FR au lieu de EN' },
  { id: 'HRF-06', page: '/expertises', languages: 3, status: '✅ Valide', errors: 0, lastVerified: '2026-06-15', priority: 'Haute', traffic: 920 },
  { id: 'HRF-07', page: '/services/gouvernance-risques', languages: 2, status: '❌ Erreurs', errors: 3, lastVerified: '2026-06-10', priority: 'Moyenne', traffic: 450, issue: 'Hreflang conflit FR/FR-CA' },
  { id: 'HRF-08', page: '/blog/bceao-ohada-conformite', languages: 2, status: '✅ Valide', errors: 0, lastVerified: '2026-06-14', priority: 'Haute', traffic: 1120 },
  { id: 'HRF-09', page: '/services/due-diligence-acquisition', languages: 1, status: '⚠️ Manquant', errors: 2, lastVerified: '2026-06-09', priority: 'Haute', traffic: 680, issue: 'Pas de hreflang — page FR uniquement' },
  { id: 'HRF-10', page: '/services/regtech-regulatory-engineering', languages: 3, status: '✅ Valide', errors: 0, lastVerified: '2026-06-15', priority: 'Critique', traffic: 1890 },
];

export const countryPerformance = [
  { id: 'CP-01', country: 'Côte d\'Ivoire', code: 'CI', language: 'FR', organicTraffic: 4850, topKeywords: 78, avgPosition: 8.2, marketShare: 28.5, geoPages: 4, growth: '+12%', region: 'UEMOA' },
  { id: 'CP-02', country: 'Sénégal', code: 'SN', language: 'FR', organicTraffic: 3200, topKeywords: 62, avgPosition: 9.8, marketShare: 18.8, geoPages: 3, growth: '+8%', region: 'UEMOA' },
  { id: 'CP-03', country: 'Bénin', code: 'BJ', language: 'FR', organicTraffic: 1850, topKeywords: 38, avgPosition: 11.2, marketShare: 10.9, geoPages: 2, growth: '+15%', region: 'UEMOA' },
  { id: 'CP-04', country: 'Cameroun', code: 'CM', language: 'FR/EN', organicTraffic: 2780, topKeywords: 52, avgPosition: 10.5, marketShare: 16.3, geoPages: 3, growth: '+6%', region: 'CEMAC' },
  { id: 'CP-05', country: 'Gabon', code: 'GA', language: 'FR', organicTraffic: 920, topKeywords: 24, avgPosition: 14.8, marketShare: 5.4, geoPages: 1, growth: '-3%', region: 'CEMAC' },
  { id: 'CP-06', country: 'Burkina Faso', code: 'BF', language: 'FR', organicTraffic: 1480, topKeywords: 32, avgPosition: 12.5, marketShare: 8.7, geoPages: 2, growth: '+18%', region: 'UEMOA' },
  { id: 'CP-07', country: 'Mali', code: 'ML', language: 'FR', organicTraffic: 1120, topKeywords: 28, avgPosition: 13.1, marketShare: 6.6, geoPages: 1, growth: '+5%', region: 'UEMOA' },
  { id: 'CP-08', country: 'Togo', code: 'TG', language: 'FR', organicTraffic: 1050, topKeywords: 25, avgPosition: 12.8, marketShare: 6.2, geoPages: 2, growth: '+10%', region: 'UEMOA' },
  { id: 'CP-09', country: 'Congo', code: 'CG', language: 'FR', organicTraffic: 680, topKeywords: 18, avgPosition: 16.2, marketShare: 4.0, geoPages: 1, growth: '-5%', region: 'CEMAC' },
  { id: 'CP-10', country: 'Niger', code: 'NE', language: 'FR', organicTraffic: 780, topKeywords: 20, avgPosition: 15.5, marketShare: 4.6, geoPages: 1, growth: '+7%', region: 'UEMOA' },
  { id: 'CP-11', country: 'France', code: 'FR', language: 'FR', organicTraffic: 620, topKeywords: 15, avgPosition: 18.2, marketShare: 3.6, geoPages: 0, growth: '+4%', region: 'EU' },
  { id: 'CP-12', country: 'UK', code: 'GB', language: 'EN', organicTraffic: 340, topKeywords: 10, avgPosition: 22.1, marketShare: 2.0, geoPages: 0, growth: '+9%', region: 'EU' },
];

export const translationQuality = [
  { id: 'TQ-01', source: '/services/audit-pre-inspection-bceao', targetEN: '/en/services/bceao-pre-inspection-audit', qualityScore: 88, issues: 2, type: 'Professional translation', translator: 'KOS Translation Engine', lastUpdated: '2026-05-20', issue1: 'Minor terminology: "prudentiel" translated as "prudential" instead of "prudential supervision"', issue2: 'Tone: FR formel → EN slightly informal adjustment needed' },
  { id: 'TQ-02', source: '/services/prix-de-transfert', targetEN: '/en/services/transfer-pricing', qualityScore: 92, issues: 1, type: 'Professional translation', translator: 'KOS Translation Engine', lastUpdated: '2026-06-02', issue1: 'BEPS terminology 100% accurate, minor formatting issue on footnotes' },
  { id: 'TQ-03', source: '/blog/bceao-ohada-conformite', targetEN: '/en/blog/bceao-ohada-compliance', qualityScore: 78, issues: 4, type: 'Machine + Human Review', translator: 'KOS + Junior Reviewer', lastUpdated: '2026-04-15', issue1: '2 untranslated French regulatory terms (circulaire, agrément)', issue2: 'Sentence structure too French (long sentences with multiple clauses)' },
  { id: 'TQ-04', source: '/guide-bceao-2026', targetEN: '/en/guide-bceao-2026', qualityScore: 65, issues: 5, type: 'Machine translation', translator: 'KOS Translation Engine only', lastUpdated: '2026-03-28', issue1: 'No human review — 3 regulatory terms incorrectly translated', issue2: 'Cultural adaptation missing: Ivorian context unclear to English readers' },
  { id: 'TQ-05', source: '/expertises', targetEN: '/en/expertise', qualityScore: 85, issues: 2, type: 'Professional translation', translator: 'KOS Translation Engine', lastUpdated: '2026-05-10', issue1: 'Service names partially translated: some kept in French', issue2: 'CTA buttons not translated to EN' },
  { id: 'TQ-06', source: '/about', targetEN: '/en/about', qualityScore: 90, issues: 1, type: 'Professional translation', translator: 'Senior Reviewer + KOS', lastUpdated: '2026-06-08', issue1: 'Award names left in French — could add EN explanation in parentheses' },
  { id: 'TQ-07', source: '/services/regtech-regulatory-engineering', targetEN: '/en/services/regtech-regulatory-engineering', qualityScore: 94, issues: 0, type: 'Professional translation', translator: 'KOS Translation Engine', lastUpdated: '2026-06-12' },
  { id: 'TQ-08', source: '/services/gouvernance-risques', targetEN: '/en/services/governance-risk', qualityScore: 72, issues: 3, type: 'Machine translation', translator: 'KOS Translation Engine only', lastUpdated: '2026-02-10', issue1: 'Framework names inconsistent (COSO → sometimes COSO, sometimes COSO framework)', issue2: 'ISO references not translated consistently' },
];

export const geoTargetingContent = [
  { id: 'GEO-01', country: 'Côte d\'Ivoire', pagesDeployed: 6, targetPages: 10, trafficByGeo: 4850, localKW: 34, mapPackPresence: '✅ Présent', gbpScore: 72, gapPages: 4, priority: 'Critique' },
  { id: 'GEO-02', country: 'Sénégal', pagesDeployed: 4, targetPages: 8, trafficByGeo: 3200, localKW: 28, mapPackPresence: '✅ Présent', gbpScore: 68, gapPages: 4, priority: 'Haute' },
  { id: 'GEO-03', country: 'Cameroun', pagesDeployed: 3, targetPages: 8, trafficByGeo: 2780, localKW: 22, mapPackPresence: '⚠️ Intermittent', gbpScore: 55, gapPages: 5, priority: 'Haute' },
  { id: 'GEO-04', country: 'Bénin', pagesDeployed: 2, targetPages: 6, trafficByGeo: 1850, localKW: 18, mapPackPresence: '❌ Absent', gbpScore: 38, gapPages: 4, priority: 'Critique' },
  { id: 'GEO-05', country: 'Burkina Faso', pagesDeployed: 2, targetPages: 6, trafficByGeo: 1480, localKW: 15, mapPackPresence: '❌ Absent', gbpScore: 32, gapPages: 4, priority: 'Haute' },
  { id: 'GEO-06', country: 'Togo', pagesDeployed: 2, targetPages: 5, trafficByGeo: 1050, localKW: 12, mapPackPresence: '⚠️ Intermittent', gbpScore: 45, gapPages: 3, priority: 'Moyenne' },
  { id: 'GEO-07', country: 'Mali', pagesDeployed: 1, targetPages: 5, trafficByGeo: 1120, localKW: 10, mapPackPresence: '❌ Absent', gbpScore: 28, gapPages: 4, priority: 'Haute' },
  { id: 'GEO-08', country: 'Gabon', pagesDeployed: 1, targetPages: 4, trafficByGeo: 920, localKW: 8, mapPackPresence: '❌ Absent', gbpScore: 22, gapPages: 3, priority: 'Moyenne' },
];

export const internationalQuickWins = [
  { id: 'IN-QW-01', action: 'Corriger les 28 erreurs hreflang — priorité pages critiques (Prix de Transfert, RegTech)', type: 'Hreflang', impact: 'Critique', effort: '8h', expectedImpact: '+18 pts score International SEO', detail: '4 pages avec erreurs bloquantes empêchant Google de servir la bonne version linguistique aux utilisateurs' },
  { id: 'IN-QW-02', action: 'Ajouter hreflang sur les 9 pages FR sans balisage international', type: 'Hreflang', impact: 'Critique', effort: '6h', expectedImpact: '+12 pts score International', detail: 'Pages orphelines linguistiquement — risque de contenu dupliqué détecté par Google' },
  { id: 'IN-QW-03', action: 'Faire relire les 3 traductions machine par un reviewer natif EN', type: 'Translation', impact: 'Haute', effort: '12h', expectedImpact: '+8 pts score Qualité Traduction', detail: 'Guide BCEAO 65/100, Gouvernance 72/100, Blog BCEAO 78/100 → besoin revue humaine native' },
  { id: 'IN-QW-04', action: 'Créer les 35 pages géo-ciblées manquantes (4 pays prioritaires)', type: 'GEO Content', impact: 'Critique', effort: '40h', expectedImpact: '+15 pts score GEO Visibility', detail: 'Bénin (4 pages), Côte d\'Ivoire (4), Cameroun (5), Burkina Faso (4) — chaque page = +200-350 sessions/mois' },
  { id: 'IN-QW-05', action: 'Uniformiser la structure URL multilingue : /en/ pour anglais, /fr/ pour français', type: 'Structure', impact: 'Haute', effort: '6h', expectedImpact: '+6 pts score technique', detail: 'Actuellement mix /en/ et / — standardiser pour cohérence crawling Googlebot' },
  { id: 'IN-QW-06', action: 'Créer sitemap hreflang dédié avec 342 entrées mises à jour automatiquement', type: 'Sitemap', impact: 'Haute', effort: '4h', expectedImpact: '+5 pts score indexation', detail: 'Sitemap hreflang dynamique via Edge Function — mise à jour quotidienne pour refléter nouvelles traductions' },
  { id: 'IN-QW-07', action: 'Créer 3 pages géo d\'atterrissage France, UK, USA pour trafic international', type: 'GEO Content', impact: 'Moyenne', effort: '10h', expectedImpact: '+3 pts score International', detail: 'France (620 sessions/mois), UK (340), USA (180) — pages en anglais ciblant investisseurs et bailleurs' },
  { id: 'IN-QW-08', action: 'Mettre en place Content-Language header sur toutes les pages', type: 'Technical', impact: 'Moyenne', effort: '3h', expectedImpact: '+2 pts score technique', detail: 'Header HTTP Content-Language: fr ou en selon la version — aide les moteurs à identifier la langue' },
];

export const multilingualKpis = {
  hreflangHealth: 72,
  translationQualityAvg: 85,
  geoPageCoverage: 38,
  countryMarketsActive: '9/14',
  organicTrafficIntl: '23,450/mois',
  topIntlKeywords: '290',
  avgPositionIntl: '12.4',
  bounceRateIntl: '58%',
};