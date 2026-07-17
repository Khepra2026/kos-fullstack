// ============================================================
// KOS TESTS PAR BLOC — COCKPIT UNIFIÉ 150% BIG FOUR
// 10 Blocs de Test : Conformité, Harmonie, Qualité Ressources,
// SEO, GEO, AI Visibility, FAQ, Backlink, Nurturing, 150% Big Four
// Consortium PwC · Deloitte · EY · KPMG — Quality Assurance
// Version 2026.06.24 — LIVE
// ============================================================

export interface TestFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  detectedDate: string;
  autoFixable: boolean;
  status: 'open' | 'in_progress' | 'fixed';
}

export interface CorrectifAction {
  id: string;
  title: string;
  type: 'auto' | 'manual' | 'semi-auto';
  effort: string;
  impact: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'pending' | 'running' | 'completed' | 'blocked';
  progress: number;
  assignedAgent: string;
}

export interface TestSubBloc {
  name: string;
  score: number;
  tests: number;
  passed: number;
  failed: number;
}

export interface TestBloc {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  category: 'conformite' | 'harmonie' | 'qualite-ressources' | 'seo' | 'geo' | 'ai-visibility' | 'faq' | 'backlink' | 'nurturing' | 'big-four-150';
  color: string;
  score: number;
  targetScore: number;
  status: 'optimal' | 'conforme' | 'surveillance' | 'critique';
  trend: 'up' | 'stable' | 'down';
  trendValue: number;
  lastScan: string;
  frequency: string;
  testsExecution: number;
  testsPassed: number;
  testsFailed: number;
  testsBlocked: number;
  subBlocs: TestSubBloc[];
  findings: TestFinding[];
  correctifs: CorrectifAction[];
  agents: number;
  bigFourAlignment: number;
  keyInsight: string;
  recommendation: string;
}

export interface TestBlocKPIs {
  globalScore: number;
  globalTarget: number;
  blocsTotal: number;
  blocsOptimal: number;
  blocsConforme: number;
  blocsSurveillance: number;
  blocsCritique: number;
  totalTests: number;
  testsPassed: number;
  testsFailed: number;
  testsBlocked: number;
  totalFindings: number;
  findingsCritical: number;
  findingsHigh: number;
  findingsMedium: number;
  findingsLow: number;
  totalCorrectifs: number;
  correctifsCompleted: number;
  correctifsRunning: number;
  correctifsPending: number;
  correctifsAuto: number;
  correctifsSemiAuto: number;
  correctifsManual: number;
  totalAgents: number;
  averageBigFourAlignment: number;
  lastFullScan: string;
  nextScheduledScan: string;
}

export const TEST_BLOCS: TestBloc[] = [
  // ============================================================
  // BLOC 1 — CONFORMITÉ RÉGLEMENTAIRE
  // ============================================================
  {
    id: 'bloc-conformite',
    name: 'Conformité Réglementaire',
    shortName: 'Conformité',
    icon: 'ri-scales-3-line',
    category: 'conformite',
    color: '#8B3040',
    score: 72,
    targetScore: 95,
    status: 'surveillance',
    trend: 'up',
    trendValue: 3.5,
    lastScan: '2026-06-24T04:00:00Z',
    frequency: 'Quotidien (06:00 UTC)',
    testsExecution: 1247,
    testsPassed: 898,
    testsFailed: 286,
    testsBlocked: 63,
    subBlocs: [
      { name: 'BCEAO — Dispositif Prudentiel', score: 78, tests: 312, passed: 243, failed: 69 },
      { name: 'COBAC — Conformité CEMAC', score: 65, tests: 285, passed: 185, failed: 100 },
      { name: 'OHADA — Actes Uniformes', score: 85, tests: 198, passed: 168, failed: 30 },
      { name: 'GAFI — LCB/FT R.12-R.15', score: 62, tests: 156, passed: 97, failed: 59 },
      { name: 'RGPD/UEMOA — Données Personnelles', score: 70, tests: 178, passed: 125, failed: 53 },
      { name: 'ISO 27001:2022 — SMSI', score: 74, tests: 118, passed: 87, failed: 31 },
    ],
    findings: [
      { id: 'CF-001', severity: 'critical', title: 'COBAC R-2023/05 non intégré — Cartographie LCB/FT CEMAC inexacte', description: 'Le règlement COBAC R-2023/05 relatif à la LCB/FT n\'est pas intégré dans la cartographie des risques. 58% de conformité seulement. Risque de sanction COBAC en cas d\'inspection.', location: 'Templates COBAC — Cartographie Risques', detectedDate: '2026-06-22', autoFixable: false, status: 'open' },
      { id: 'CF-002', severity: 'critical', title: 'Détection PPE 65% — Seuil GAFI minimum 90%', description: 'Le module KYC/CDD #4 ne détecte que 65% des Personnes Politiquement Exposées. Le standard GAFI R.12 exige 90% minimum.', location: 'Module KYC/CDD — Détection PPE', detectedDate: '2026-06-20', autoFixable: false, status: 'in_progress' },
      { id: 'CF-003', severity: 'high', title: 'Templates COBAC R-2016/01 obsolètes — Migration vers R-2024/01 requise', description: '8 templates de propositions utilisent la circulaire COBAC R-2016/01, abrogée depuis 2024.', location: 'Templates Propositions — Lot CEMAC', detectedDate: '2026-06-18', autoFixable: true, status: 'open' },
      { id: 'CF-004', severity: 'high', title: 'Registre traitements RGPD incomplet — 12 sous-traitants non documentés', description: 'Le registre des activités de traitement ne couvre que 78% des sous-traitants. Article 30 RGPD non respecté.', location: 'Registre Traitements — Admin', detectedDate: '2026-06-15', autoFixable: false, status: 'open' },
      { id: 'CF-005', severity: 'medium', title: 'Politique cookies — Consentement non conforme ePrivacy', description: 'Le bandeau cookies ne permet pas le refus en un clic. Non-conforme aux guidelines CNIL/CEPD 2025.', location: 'CookieConsent.tsx', detectedDate: '2026-06-10', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-001', title: 'Intégrer COBAC R-2023/05 dans cartographie LCB/FT', type: 'manual', effort: '5h', impact: 'Score CEMAC 58→85', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'Compliance Officer + Juridique' },
      { id: 'CR-002', title: 'Améliorer détection PPE 65%→90% — GAFI R.12', type: 'semi-auto', effort: '3h', impact: 'Conformité GAFI R.12', priority: 'P0', status: 'running', progress: 45, assignedAgent: 'KOS Compliance Scanner' },
      { id: 'CR-003', title: 'Migrer 8 templates COBAC R-2016/01→R-2024/01', type: 'auto', effort: '20 min', impact: '100% templates à jour', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Template Updater' },
      { id: 'CR-004', title: 'Compléter registre traitements — 12 sous-traitants', type: 'manual', effort: '4h', impact: 'Conformité RGPD 100%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'DPO' },
      { id: 'CR-005', title: 'Mettre à jour bandeau cookies — refus en un clic', type: 'auto', effort: '30 min', impact: 'Conformité ePrivacy', priority: 'P2', status: 'pending', progress: 0, assignedAgent: 'KOS Cookie Manager' },
    ],
    agents: 7,
    bigFourAlignment: 68,
    keyInsight: 'La conformité CEMAC (COBAC) est le maillon faible — 65/100 vs 85/100 pour OHADA. Le gap GAFI R.12 (détection PPE) est le risque réglementaire le plus élevé.',
    recommendation: 'Prioriser l\'intégration COBAC R-2023/05 et l\'amélioration détection PPE avant toute inspection. Budget estimé : 12 500 000 FCFA.',
  },

  // ============================================================
  // BLOC 2 — HARMONIE & COHÉRENCE SYSTÈME
  // ============================================================
  {
    id: 'bloc-harmonie',
    name: 'Harmonie & Cohérence Système',
    shortName: 'Harmonie',
    icon: 'ri-puzzle-2-line',
    category: 'harmonie',
    color: '#4F46E5',
    score: 82,
    targetScore: 98,
    status: 'conforme',
    trend: 'stable',
    trendValue: 0.2,
    lastScan: '2026-06-24T03:30:00Z',
    frequency: 'Quotidien (03:30 UTC)',
    testsExecution: 892,
    testsPassed: 731,
    testsFailed: 112,
    testsBlocked: 49,
    subBlocs: [
      { name: 'Cohérence Design System', score: 88, tests: 245, passed: 216, failed: 29 },
      { name: 'Uniformité Ton & Vocabulaire', score: 85, tests: 198, passed: 168, failed: 30 },
      { name: 'Cohérence Navigation', score: 90, tests: 156, passed: 140, failed: 16 },
      { name: 'Hiérarchie Information', score: 78, tests: 165, passed: 129, failed: 36 },
      { name: 'Cohérence API & Contrats', score: 72, tests: 128, passed: 92, failed: 36 },
    ],
    findings: [
      { id: 'HM-001', severity: 'critical', title: '12 endpoints Edge Functions avec signatures de réponse différentes', description: 'Les edge functions n\'ont pas de contrat de réponse standardisé. 3 formats d\'erreur différents coexistent.', location: 'supabase/functions/*/index.ts', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
      { id: 'HM-002', severity: 'high', title: 'Incohérence vocabulaire — "Devis" vs "Proposition" vs "Offre"', description: '38 pages utilisent "Devis", 27 utilisent "Proposition", 15 utilisent "Offre" pour désigner le même concept.', location: 'Multi-pages — Recherche globale', detectedDate: '2026-06-21', autoFixable: true, status: 'open' },
      { id: 'HM-003', severity: 'medium', title: 'Breakpoints Tailwind non standardisés — 4 variantes de responsive', description: 'Coexistence de sm/md/lg, de valeurs arbitraires, et de breakpoints custom non documentés.', location: 'Fichiers CSS — tailwind.config.ts', detectedDate: '2026-06-19', autoFixable: true, status: 'open' },
      { id: 'HM-004', severity: 'medium', title: '2 systèmes de navigation parallèles — Navbar + Sidebar en conflit', description: 'Certaines pages affichent les deux simultanément, d\'autres un seul. Pas de règle documentée.', location: 'KOSHubLayout + Navigation.tsx', detectedDate: '2026-06-17', autoFixable: false, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-006', title: 'Standardiser contrats de réponse Edge Functions', type: 'manual', effort: '8h', impact: 'Cohérence API 100%', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'Lead Dev Backend' },
      { id: 'CR-007', title: 'Uniformiser vocabulaire — "Devis" partout', type: 'auto', effort: '2h', impact: 'Vocabulaire cohérent 100%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Vocabulary Harmonizer' },
      { id: 'CR-008', title: 'Documenter et standardiser breakpoints responsive', type: 'semi-auto', effort: '3h', impact: 'Design system cohérent', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'Lead Dev Frontend' },
    ],
    agents: 5,
    bigFourAlignment: 80,
    keyInsight: 'L\'harmonie globale est bonne (82) mais les contrats API et le vocabulaire métier créent de la friction dans l\'expérience utilisateur institutionnelle.',
    recommendation: 'Standardiser les contrats API Edge Functions en priorité. L\'uniformisation vocabulaire est automatisable à 90%.',
  },

  // ============================================================
  // BLOC 3 — QUALITÉ DES RESSOURCES
  // ============================================================
  {
    id: 'bloc-qualite-ressources',
    name: 'Qualité des Ressources',
    shortName: 'Qualité Ressources',
    icon: 'ri-database-2-line',
    category: 'qualite-ressources',
    color: '#9B7B2C',
    score: 80,
    targetScore: 96,
    status: 'conforme',
    trend: 'up',
    trendValue: 1.8,
    lastScan: '2026-06-24T02:00:00Z',
    frequency: 'Quotidien (02:00 UTC)',
    testsExecution: 2156,
    testsPassed: 1725,
    testsFailed: 312,
    testsBlocked: 119,
    subBlocs: [
      { name: 'Images — Optimisation & WebP', score: 62, tests: 456, passed: 283, failed: 173 },
      { name: 'Documents — Templates & Propositions', score: 85, tests: 348, passed: 296, failed: 52 },
      { name: 'Articles — Qualité Éditoriale', score: 88, tests: 412, passed: 363, failed: 49 },
      { name: 'Mocks & Données — Cohérence', score: 78, tests: 389, passed: 303, failed: 86 },
      { name: 'PDF & Exports — Qualité Livrables', score: 84, tests: 298, passed: 250, failed: 48 },
      { name: 'Vidéos & Médias — Qualité Production', score: 82, tests: 253, passed: 208, failed: 45 },
    ],
    findings: [
      { id: 'QR-001', severity: 'critical', title: '89 images non-WebP — 4.2 MB gaspillés par page', description: '89 images PNG/JPEG >500 KB impactent LCP de 2.3s. Google "Poor" sur mobile.', location: 'public/images/ — Scan complet', detectedDate: '2026-06-23', autoFixable: true, status: 'in_progress' },
      { id: 'QR-002', severity: 'high', title: '23 templates propositions avec TJM 2025 — Sous-facturation 12%', description: 'Les TJM dans les templates n\'ont pas été mis à jour pour 2026. Perte estimée 68M FCFA/an.', location: 'Templates Propositions — utils/generate*', detectedDate: '2026-06-22', autoFixable: true, status: 'open' },
      { id: 'QR-003', severity: 'high', title: '156 articles sans données structurées FAQ/HowTo', description: 'Articles réglementaires sans Schema.org FAQPage ou HowTo — opportunités rich snippets perdues.', location: 'Articles Blog — src/pages/blog/**', detectedDate: '2026-06-20', autoFixable: true, status: 'open' },
      { id: 'QR-004', severity: 'medium', title: '42 mocks avec données "Lorem ipsum" ou placeholders', description: 'Mocks non finalisés détectés dans les dashboards internes — crédibilité dégradée en démo.', location: 'src/mocks/ — Audit qualité', detectedDate: '2026-06-18', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-009', title: 'Convertir 89 images en WebP + responsive + lazy loading', type: 'auto', effort: '12h', impact: 'LCP 4.8s→2.5s', priority: 'P0', status: 'running', progress: 62, assignedAgent: 'KOS Image Optimizer' },
      { id: 'CR-010', title: 'Mettre à jour TJM 2025→2026 dans 23 templates', type: 'auto', effort: '20 min', impact: '+12% CA propositions', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'KOS Template Updater' },
      { id: 'CR-011', title: 'Ajouter Schema.org FAQ/HowTo sur 156 articles', type: 'semi-auto', effort: '8h', impact: '+25% rich snippets', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Schema Enricher' },
      { id: 'CR-012', title: 'Remplacer 42 placeholders par données réalistes', type: 'auto', effort: '3h', impact: 'Crédibilité démo 100%', priority: 'P2', status: 'pending', progress: 0, assignedAgent: 'KOS Mock Enhancer' },
    ],
    agents: 4,
    bigFourAlignment: 78,
    keyInsight: 'Le sous-bloc Images est le point noir (62/100). La conversion WebP en cours va remonter le score de 18 points. Les templates TJM obsolètes représentent un manque à gagner immédiat.',
    recommendation: 'Terminer la conversion WebP (62% fait). Corriger TJM en 20 minutes — ROI immédiat de 68M FCFA/an.',
  },

  // ============================================================
  // BLOC 4 — SEO
  // ============================================================
  {
    id: 'bloc-seo',
    name: 'SEO — Référencement Organique',
    shortName: 'SEO',
    icon: 'ri-search-eye-line',
    category: 'seo',
    color: '#0891B2',
    score: 87,
    targetScore: 98,
    status: 'optimal',
    trend: 'up',
    trendValue: 2.1,
    lastScan: '2026-06-24T01:00:00Z',
    frequency: 'Quotidien (01:00 UTC)',
    testsExecution: 3421,
    testsPassed: 2976,
    testsFailed: 325,
    testsBlocked: 120,
    subBlocs: [
      { name: 'SEO On-Page — 10 Clusters', score: 92, tests: 856, passed: 787, failed: 69 },
      { name: 'SEO Technique — Crawl & Index', score: 88, tests: 645, passed: 568, failed: 77 },
      { name: 'Core Web Vitals — Performance', score: 68, tests: 423, passed: 288, failed: 135 },
      { name: 'Backlinks — Domain Rating', score: 85, tests: 398, passed: 338, failed: 60 },
      { name: 'Schema.org — Données Structurées', score: 90, tests: 459, passed: 413, failed: 46 },
      { name: 'SEO Local & GEO — Afrique', score: 82, tests: 378, passed: 310, failed: 68 },
      { name: 'E-E-A-T — Authorité & Confiance', score: 86, tests: 262, passed: 225, failed: 37 },
    ],
    findings: [
      { id: 'SE-001', severity: 'critical', title: 'Core Web Vitals — LCP 4.8s (Poor) sur mobile', description: 'Le Largest Contentful Paint dépasse 4 secondes sur mobile 3G. Google classe le site "Poor". Impact direct ranking.', location: 'Toutes les pages — PageSpeed Insights', detectedDate: '2026-06-23', autoFixable: false, status: 'in_progress' },
      { id: 'SE-002', severity: 'high', title: '128 pages sans meta description — Opportunité CTR perdue', description: 'Pages de blog et outils sans meta description. Google génère auto-descriptions, CTR moyen -35%.', location: 'Blog + Outils — Audit crawl', detectedDate: '2026-06-22', autoFixable: true, status: 'open' },
      { id: 'SE-003', severity: 'high', title: '42 URLs avec canonical chain — Jusqu\'à 3 redirections canoniques', description: 'Chaînes de canonical créant de la confusion pour Googlebot. Perte de link equity estimée 15%.', location: 'Multi-pages — Crawl canonique', detectedDate: '2026-06-21', autoFixable: true, status: 'open' },
      { id: 'SE-004', severity: 'medium', title: 'Sitemap XML — 35 URLs orphelines non listées', description: 'Pages existantes mais absentes du sitemap. Google ne les découvre que par crawling interne.', location: 'sitemap.xml — Génération auto', detectedDate: '2026-06-19', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-013', title: 'Passer LCP sous 2.5s — Optimisation images + lazy loading', type: 'semi-auto', effort: '12h', impact: 'LCP Good → +15% trafic', priority: 'P0', status: 'running', progress: 62, assignedAgent: 'KOS Performance Optimizer' },
      { id: 'CR-014', title: 'Générer meta descriptions pour 128 pages', type: 'auto', effort: '2h', impact: 'CTR +15-35%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Meta Generator' },
      { id: 'CR-015', title: 'Corriger 42 chaînes canoniques', type: 'auto', effort: '1h', impact: 'Link equity +15%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Canonical Fixer' },
      { id: 'CR-016', title: 'Ajouter 35 URLs orphelines au sitemap', type: 'auto', effort: '15 min', impact: 'Couverture index 100%', priority: 'P2', status: 'pending', progress: 0, assignedAgent: 'KOS Sitemap Updater' },
    ],
    agents: 11,
    bigFourAlignment: 88,
    keyInsight: 'SEO On-Page excellent (92/100) mais CWV plombe le score global. 847 mots-clés Top 10, DR 62. La correction CWV débloquera +15% trafic.',
    recommendation: 'Terminer optimisation CWV. Les meta descriptions manquantes sont un quick win — 2h de traitement auto.',
  },

  // ============================================================
  // BLOC 5 — GEO (Generative Engine Optimization)
  // ============================================================
  {
    id: 'bloc-geo',
    name: 'GEO — Visibilité IA Générative',
    shortName: 'GEO',
    icon: 'ri-radar-line',
    category: 'geo',
    color: '#86BC25',
    score: 84,
    targetScore: 96,
    status: 'conforme',
    trend: 'up',
    trendValue: 4.2,
    lastScan: '2026-06-24T03:00:00Z',
    frequency: 'Quotidien (03:00 UTC)',
    testsExecution: 1856,
    testsPassed: 1559,
    testsFailed: 198,
    testsBlocked: 99,
    subBlocs: [
      { name: 'llms.txt — Qualité & Fraîcheur', score: 94, tests: 156, passed: 147, failed: 9 },
      { name: 'llms-full.txt — Exhaustivité', score: 88, tests: 134, passed: 118, failed: 16 },
      { name: 'FAQs GEO — 75 000 questions', score: 82, tests: 389, passed: 319, failed: 70 },
      { name: 'Glossaire — Termes Réglementaires', score: 86, tests: 267, passed: 230, failed: 37 },
      { name: 'Pages Piliers — 6 thématiques', score: 90, tests: 312, passed: 281, failed: 31 },
      { name: 'Citations IA/mois — 5 moteurs', score: 78, tests: 289, passed: 225, failed: 64 },
      { name: 'Guides & Cas Pratiques', score: 85, tests: 198, passed: 168, failed: 30 },
      { name: 'Schema.org GEO — Rich Results', score: 88, tests: 111, passed: 98, failed: 13 },
    ],
    findings: [
      { id: 'GE-001', severity: 'high', title: 'Couverture Gemini — 3 pages non crawlées par Google-Extended', description: 'Google-Extended bot non listé dans robots.txt. Pages UEMOA invisibles pour Gemini. Perte SOV estimée 15%.', location: 'robots.txt + llms.txt', detectedDate: '2026-06-23', autoFixable: true, status: 'open' },
      { id: 'GE-002', severity: 'high', title: 'Sections OHADA absentes de llms-full.txt — 800+ lignes manquantes', description: 'Le contexte réglementaire OHADA n\'est pas intégré dans llms-full.txt. ChatGPT/Claude ne peuvent citer KHEPRA sur ce domaine.', location: 'llms-full.txt — Génération auto', detectedDate: '2026-06-22', autoFixable: true, status: 'open' },
      { id: 'GE-003', severity: 'medium', title: '6 FAQs orphelines — Pages existantes mais non liées depuis hub GEO', description: 'FAQs générées par agents mais non connectées à la navigation GEO principale.', location: 'GEO Hub — Liens internes', detectedDate: '2026-06-19', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-017', title: 'Ajouter Google-Extended dans robots.txt', type: 'auto', effort: '5 min', impact: 'Visibilité Gemini +100%', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'KOS Robots Updater' },
      { id: 'CR-018', title: 'Injecter sections OHADA dans llms-full.txt', type: 'auto', effort: '30 min', impact: 'Citations OHADA LLM +100%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS LLMs Generator' },
      { id: 'CR-019', title: 'Connecter 6 FAQs orphelines au hub GEO', type: 'auto', effort: '10 min', impact: 'Cohérence GEO 100%', priority: 'P2', status: 'pending', progress: 0, assignedAgent: 'KOS Link Builder' },
    ],
    agents: 12,
    bigFourAlignment: 86,
    keyInsight: 'GEO en forte progression (+4.2/mois). 24 800+ citations IA/mois. Leader Afrique francophone sur ChatGPT (SOV 42%). Le gap Gemini est le plus urgent.',
    recommendation: 'Ajouter Google-Extended + sections OHADA. 35 minutes de travail pour +20% de couverture AI search.',
  },

  // ============================================================
  // BLOC 6 — AI VISIBILITY
  // ============================================================
  {
    id: 'bloc-ai-visibility',
    name: 'AI Visibility — Visibilité Agents IA',
    shortName: 'AI Visibility',
    icon: 'ri-robot-2-line',
    category: 'ai-visibility',
    color: '#5B21B6',
    score: 88,
    targetScore: 97,
    status: 'optimal',
    trend: 'up',
    trendValue: 1.5,
    lastScan: '2026-06-24T00:30:00Z',
    frequency: 'Quotidien (00:30 UTC)',
    testsExecution: 945,
    testsPassed: 832,
    testsFailed: 78,
    testsBlocked: 35,
    subBlocs: [
      { name: 'AI Crawlers — 11 Bots Monitorés', score: 95, tests: 198, passed: 188, failed: 10 },
      { name: 'Platformes AI — 10 Plateformes', score: 90, tests: 245, passed: 221, failed: 24 },
      { name: 'Schema.org AI-Ready', score: 88, tests: 178, passed: 157, failed: 21 },
      { name: 'GEO Score Global', score: 84, tests: 156, passed: 131, failed: 25 },
      { name: 'Opérations & Auto-Régénération', score: 92, tests: 168, passed: 155, failed: 13 },
    ],
    findings: [
      { id: 'AI-001', severity: 'medium', title: 'Perplexity Bot — Activité en baisse 22% depuis 7 jours', description: 'Le crawler PerplexityBot a réduit sa fréquence de crawl. Possible pénalité ou perte d\'intérêt algorithmique.', location: 'Crawler Logs — Monitoring', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
      { id: 'AI-002', severity: 'medium', title: 'Claude — Score optimisation 88 vs 94 pour ChatGPT', description: 'Les pages KHEPRA sont moins bien optimisées pour Claude (Anthropic) que pour ChatGPT.', location: 'Plateformes AI — Scoring', detectedDate: '2026-06-21', autoFixable: true, status: 'open' },
      { id: 'AI-003', severity: 'low', title: 'Copilot — Présence en croissance mais score 72 seulement', description: 'Microsoft Copilot découvre KHEPRA mais le score de pertinence reste faible. Optimisation Bing Webmaster recommandée.', location: 'Bing Webmaster Tools', detectedDate: '2026-06-18', autoFixable: false, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-020', title: 'Auditer baisse PerplexityBot — Vérifier robots.txt + contenu', type: 'manual', effort: '2h', impact: 'Restauration crawl Perplexity', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'SEO Lead' },
      { id: 'CR-021', title: 'Optimiser pages pour Claude — Métadonnées + formatage', type: 'semi-auto', effort: '4h', impact: 'Score Claude 88→94', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Claude Optimizer' },
    ],
    agents: 8,
    bigFourAlignment: 90,
    keyInsight: 'AI Visibility excellente (88/100). ChatGPT leader. Perplexity en recul suspect. Claude et Copilot sont les axes de progression.',
    recommendation: 'Investiguer la baisse PerplexityBot. Optimiser pour Claude — 4h pour +6 points.',
  },

  // ============================================================
  // BLOC 7 — FAQ
  // ============================================================
  {
    id: 'bloc-faq',
    name: 'FAQ — Qualité & Couverture',
    shortName: 'FAQ',
    icon: 'ri-question-answer-line',
    category: 'faq',
    color: '#EA580C',
    score: 78,
    targetScore: 94,
    status: 'surveillance',
    trend: 'up',
    trendValue: 3.8,
    lastScan: '2026-06-24T02:30:00Z',
    frequency: 'Quotidien (02:30 UTC)',
    testsExecution: 1589,
    testsPassed: 1240,
    testsFailed: 248,
    testsBlocked: 101,
    subBlocs: [
      { name: 'FAQs Blog — Qualité Réponses', score: 82, tests: 423, passed: 347, failed: 76 },
      { name: 'FAQs GEO — Optimisation LLMs', score: 76, tests: 389, passed: 295, failed: 94 },
      { name: 'FAQs Outils — Pertinence Métier', score: 74, tests: 312, passed: 231, failed: 81 },
      { name: 'Schema.org FAQPage — Rich Results', score: 88, tests: 198, passed: 174, failed: 24 },
      { name: 'Couverture Thématique — 6 Piliers', score: 72, tests: 267, passed: 192, failed: 75 },
    ],
    findings: [
      { id: 'FQ-001', severity: 'high', title: 'FAQ Couverture — Pilier CEMAC seulement 58 FAQs vs 340+ pour BCEAO', description: 'Déséquilibre thématique majeur. Le pilier CEMAC/COBAC a 6x moins de FAQs que BCEAO/UEMOA.', location: 'FAQs GEO — Distribution thématique', detectedDate: '2026-06-23', autoFixable: true, status: 'open' },
      { id: 'FQ-002', severity: 'high', title: '128 FAQs sans Schema.org FAQPage — Rich snippets perdus', description: 'FAQs de blog sans balisage structuré. Google ne peut pas les afficher en rich results. Perte CTR estimée 20%.', location: 'Articles Blog — Audit Schema', detectedDate: '2026-06-22', autoFixable: true, status: 'open' },
      { id: 'FQ-003', severity: 'medium', title: '34 FAQs avec réponses obsolètes — Textes réglementaires abrogés', description: 'FAQs référençant des circulaires BCEAO/COBAC abrogées. Risque de désinformation réglementaire.', location: 'FAQs — Vérification croisée', detectedDate: '2026-06-20', autoFixable: false, status: 'open' },
      { id: 'FQ-004', severity: 'medium', title: 'Qualité FAQ — 18% des réponses jugées "Insuffisantes" par QA Agent', description: 'L\'agent Quality Assurance a noté 18% des FAQs < 70/100. Manque de profondeur technique.', location: 'QA Scanner — Évaluation auto', detectedDate: '2026-06-18', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-022', title: 'Générer 280 FAQs CEMAC/COBAC supplémentaires', type: 'auto', effort: '6h', impact: 'Équilibre thématique BCEAO/CEMAC', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'KOS FAQ Generator' },
      { id: 'CR-023', title: 'Ajouter Schema.org FAQPage sur 128 FAQs blog', type: 'auto', effort: '1h', impact: '+20% CTR rich results', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Schema Enricher' },
      { id: 'CR-024', title: 'Mettre à jour 34 FAQs obsolètes — Nouveaux textes', type: 'semi-auto', effort: '8h', impact: 'Fiabilité réglementaire 100%', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'Compliance Officer + KOS FAQ Updater' },
      { id: 'CR-025', title: 'Améliorer 18% FAQs insuffisantes — Enrichissement auto', type: 'auto', effort: '3h', impact: 'Score qualité FAQ +15%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS FAQ Enhancer' },
    ],
    agents: 6,
    bigFourAlignment: 76,
    keyInsight: 'Le déséquilibre BCEAO vs CEMAC est critique pour la crédibilité réglementaire. Les FAQs obsolètes présentent un risque de désinformation.',
    recommendation: 'Générer 280 FAQs CEMAC en urgence. Mettre à jour les 34 FAQs obsolètes avant tout — risque réputationnel.',
  },

  // ============================================================
  // BLOC 8 — BACKLINK
  // ============================================================
  {
    id: 'bloc-backlink',
    name: 'Backlink — Netlinking & Autorité',
    shortName: 'Backlink',
    icon: 'ri-link-m',
    category: 'backlink',
    color: '#C2410C',
    score: 75,
    targetScore: 92,
    status: 'surveillance',
    trend: 'up',
    trendValue: 2.5,
    lastScan: '2026-06-24T01:30:00Z',
    frequency: 'Quotidien (01:30 UTC)',
    testsExecution: 1123,
    testsPassed: 843,
    testsFailed: 198,
    testsBlocked: 82,
    subBlocs: [
      { name: 'Domain Authority — DR Actuel', score: 72, tests: 189, passed: 136, failed: 53 },
      { name: 'Backlinks Acquis — Total', score: 78, tests: 256, passed: 200, failed: 56 },
      { name: 'Opportunités Détectées', score: 82, tests: 198, passed: 162, failed: 36 },
      { name: 'Contenu Linkable — Piliers', score: 85, tests: 167, passed: 142, failed: 25 },
      { name: 'Quick Wins — Actions Rapides', score: 76, tests: 156, passed: 119, failed: 37 },
      { name: 'Ancres — Diversité & Pertinence', score: 68, tests: 157, passed: 107, failed: 50 },
    ],
    findings: [
      { id: 'BK-001', severity: 'critical', title: 'Domain Rating 62 — Cible 75 — Gap de 13 points', description: 'Le DR stagne à 62 depuis 3 mois. La cible Big Four est 75. Concurrence directe à 68-72.', location: 'Ahrefs/Moz — Domain Rating', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
      { id: 'BK-002', severity: 'high', title: 'Ancres — 72% "KHEPRA EXPERTS" — Sur-optimisation détectée', description: 'Diversité d\'ancres insuffisante. Google Penguin risque de pénaliser le site pour sur-optimisation.', location: 'Profil Backlinks — Analyse ancres', detectedDate: '2026-06-22', autoFixable: false, status: 'open' },
      { id: 'BK-003', severity: 'high', title: '12 backlinks .edu/.gov africains manquants — Opportunité non saisie', description: 'Institutions académiques et gouvernementales africaines non contactées. Potentiel DR +5 points.', location: 'Opportunités — Institutions', detectedDate: '2026-06-21', autoFixable: false, status: 'open' },
      { id: 'BK-004', severity: 'medium', title: '28 backlinks cassés — Pages cibles 404', description: 'Backlinks pointant vers des URLs supprimées. Link equity perdue. Redirections 301 à créer.', location: 'Crawl — Liens cassés', detectedDate: '2026-06-20', autoFixable: true, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-026', title: 'Campagne netlinking — Cibler 25 sites réglementaires africains', type: 'manual', effort: '40h', impact: 'DR 62→72 (+10)', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'SEO Lead + Outreach' },
      { id: 'CR-027', title: 'Diversifier ancres — Réduire "KHEPRA EXPERTS" à 40%', type: 'manual', effort: '20h', impact: 'Risque Penguin neutralisé', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'SEO Lead' },
      { id: 'CR-028', title: 'Contacter 12 institutions .edu/.gov africaines', type: 'manual', effort: '15h', impact: 'DR +3-5 points', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'Outreach Manager' },
      { id: 'CR-029', title: 'Créer redirections 301 pour 28 backlinks cassés', type: 'auto', effort: '30 min', impact: 'Link equity restaurée', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Redirect Manager' },
    ],
    agents: 5,
    bigFourAlignment: 72,
    keyInsight: 'Le DR 62 est le plafond actuel. La sur-optimisation des ancres est un risque Google Penguin réel. Les .edu/.gov africains sont un levier sous-exploité.',
    recommendation: 'Lancer campagne netlinking 25 sites + diversifier ancres en priorité. Les redirections 301 sont un quick win (30 min).',
  },

  // ============================================================
  // BLOC 9 — NURTURING
  // ============================================================
  {
    id: 'bloc-nurturing',
    name: 'Nurturing — Maturation Leads',
    shortName: 'Nurturing',
    icon: 'ri-heart-pulse-line',
    category: 'nurturing',
    color: '#4A7A1E',
    score: 74,
    targetScore: 90,
    status: 'surveillance',
    trend: 'up',
    trendValue: 1.2,
    lastScan: '2026-06-24T00:00:00Z',
    frequency: 'Quotidien (00:00 UTC)',
    testsExecution: 867,
    testsPassed: 642,
    testsFailed: 156,
    testsBlocked: 69,
    subBlocs: [
      { name: 'Séquences Email — 12 Séquences', score: 78, tests: 234, passed: 183, failed: 51 },
      { name: 'Lead Scoring — Qualité Scoring', score: 72, tests: 189, passed: 136, failed: 53 },
      { name: 'Lead Magnets — Conversion', score: 76, tests: 198, passed: 150, failed: 48 },
      { name: 'CRM — Pipeline & Suivi', score: 70, tests: 156, passed: 109, failed: 47 },
      { name: 'Newsletter — Engagement', score: 82, tests: 90, passed: 74, failed: 16 },
    ],
    findings: [
      { id: 'NR-001', severity: 'critical', title: 'Taux conversion MQL→SQL 12% — Cible Big Four 25%', description: 'Le taux de conversion des leads qualifiés marketing vers leads qualifiés vente est 2x inférieur au standard Big Four.', location: 'Pipeline CRM — Entonnoir conversion', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
      { id: 'NR-002', severity: 'high', title: '3 séquences email sans déclencheur automatique — Opération manuelle', description: 'Les séquences "Post-Diagnostic", "Réactivation" et "Win-Back" nécessitent un déclenchement manuel.', location: 'Email Sequences — Automatisation', detectedDate: '2026-06-22', autoFixable: true, status: 'open' },
      { id: 'NR-003', severity: 'high', title: 'Lead Scoring — Modèle non calibré depuis 90 jours', description: 'Le modèle de scoring prédictif n\'a pas été recalibré. Dérive estimée à 18% de faux positifs.', location: 'Lead Scoring Engine', detectedDate: '2026-06-20', autoFixable: true, status: 'open' },
      { id: 'NR-004', severity: 'medium', title: 'Clients sans contact Q2 — 3 comptes corporate à risque', description: '3 clients corporate sans interaction depuis Q2 2026. Risque churn 185M FCFA.', location: 'CRM — Suivi Client', detectedDate: '2026-06-18', autoFixable: false, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-030', title: 'Optimiser entonnoir MQL→SQL — Qualification + Scoring', type: 'semi-auto', effort: '12h', impact: 'Conversion 12%→25%', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'Growth Lead + KOS Scoring' },
      { id: 'CR-031', title: 'Automatiser déclencheurs 3 séquences email', type: 'auto', effort: '4h', impact: 'Nurturing 100% automatisé', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Email Automator' },
      { id: 'CR-032', title: 'Recalibrer modèle Lead Scoring — Données Q1+Q2', type: 'auto', effort: '6h', impact: 'Faux positifs 18%→5%', priority: 'P1', status: 'pending', progress: 0, assignedAgent: 'KOS Scoring Calibrator' },
      { id: 'CR-033', title: 'Contacter 3 clients corporate sans contact Q2', type: 'manual', effort: '1h', impact: 'Rétention 185M FCFA', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'Client Success Manager' },
    ],
    agents: 6,
    bigFourAlignment: 70,
    keyInsight: 'Le nurturing est le maillon faible de la chaîne commerciale. Le gap MQL→SQL de 12% vs 25% (Big Four) est le problème structurant.',
    recommendation: 'Recalibrer le scoring en priorité. Contacter les 3 clients corporate — 1h pour sécuriser 185M FCFA.',
  },

  // ============================================================
  // BLOC 10 — 150% BIG FOUR SELF-DEVELOPMENT
  // ============================================================
  {
    id: 'bloc-big-four-150',
    name: '150% Big Four — Auto-Développement',
    shortName: '150% Big Four',
    icon: 'ri-rocket-2-line',
    category: 'big-four-150',
    color: '#4F46E5',
    score: 92,
    targetScore: 150,
    status: 'optimal',
    trend: 'up',
    trendValue: 3.2,
    lastScan: '2026-06-24T05:00:00Z',
    frequency: 'Quotidien (05:00 UTC)',
    testsExecution: 2341,
    testsPassed: 2154,
    testsFailed: 112,
    testsBlocked: 75,
    subBlocs: [
      { name: 'Matrice Maturité 12 Blocs', score: 96, tests: 456, passed: 437, failed: 19 },
      { name: 'Auto-Remédiation — File d\'Attente', score: 88, tests: 312, passed: 275, failed: 37 },
      { name: 'Self-Healing — Résilience Auto', score: 92, tests: 278, passed: 256, failed: 22 },
      { name: 'Trajectoire 150% — Projection', score: 94, tests: 245, passed: 230, failed: 15 },
      { name: 'Benchmark Big Four — Deloitte/PwC/EY/KPMG', score: 96, tests: 356, passed: 342, failed: 14 },
      { name: 'Auto-Upgrades — Ce Mois', score: 90, tests: 298, passed: 268, failed: 30 },
      { name: 'Certifications — 10 Standards', score: 78, tests: 396, passed: 309, failed: 87 },
    ],
    findings: [
      { id: 'BF-001', severity: 'critical', title: 'Certifications — SOC 2 Readiness 42/100 (25 politiques manquantes)', description: 'SOC 2 Type II bloque 3 contrats corporate. 25 politiques à créer. Pipeline 450M FCFA conditionné.', location: 'Certifications — SOC 2', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
      { id: 'BF-002', severity: 'high', title: 'Bloc Sécurité — OWASP 55/100 (3 vulns critiques)', description: 'IDOR API, SQL injection, XSS reflété — CVSS moyen 8.6. Score OWASP insuffisant pour certification.', location: 'Security Scan — OWASP Top 10', detectedDate: '2026-06-22', autoFixable: false, status: 'in_progress' },
      { id: 'BF-003', severity: 'high', title: 'Gap vers 150% — 12.8 points restants', description: 'Trajectoire actuelle : +3.2/mois. À ce rythme, 150% atteignable Q1 2027. Prochain pallier : 105 points Q3 2026.', location: 'Trajectoire 150%', detectedDate: '2026-06-23', autoFixable: false, status: 'open' },
    ],
    correctifs: [
      { id: 'CR-034', title: 'Rédiger 25 politiques SOC 2 — Certification Type II', type: 'manual', effort: '40h', impact: 'SOC 2 Readiness 42→80', priority: 'P0', status: 'pending', progress: 0, assignedAgent: 'RSSI + DPO + Juridique' },
      { id: 'CR-035', title: 'Corriger 3 vulnérabilités OWASP critiques', type: 'manual', effort: '15h', impact: 'OWASP 55→82', priority: 'P0', status: 'running', progress: 38, assignedAgent: 'RSSI + Lead Dev Backend' },
      { id: 'CR-036', title: 'Accélérer trajectoire 150% — +5.0/mois cible', type: 'semi-auto', effort: 'Continu', impact: '150% Q4 2026', priority: 'P1', status: 'running', progress: 65, assignedAgent: 'KOS Self-Development Engine' },
    ],
    agents: 15,
    bigFourAlignment: 96,
    keyInsight: 'KHEPRA domine le benchmark Big Four sur 4/5 dimensions (Knowledge 98, Client 97, Brand 96). Le gap SOC 2 et OWASP sont les deux freins à la certification complète.',
    recommendation: 'Terminer correction OWASP (38% fait). SOC 2 est le chantier prioritaire — 40h de rédaction pour débloquer 450M FCFA pipeline.',
  },
];

export function computeTestBlocKPIs(): TestBlocKPIs {
  const blocs = TEST_BLOCS;

  const totalTests = blocs.reduce((s, b) => s + b.testsExecution, 0);
  const passed = blocs.reduce((s, b) => s + b.testsPassed, 0);
  const failed = blocs.reduce((s, b) => s + b.testsFailed, 0);
  const blocked = blocs.reduce((s, b) => s + b.testsBlocked, 0);

  const allFindings = blocs.flatMap(b => b.findings);
  const allCorrectifs = blocs.flatMap(b => b.correctifs);

  const globalScore = Math.round(blocs.reduce((s, b) => s + b.score, 0) / blocs.length * 10) / 10;
  const avgBigFour = Math.round(blocs.reduce((s, b) => s + b.bigFourAlignment, 0) / blocs.length * 10) / 10;

  return {
    globalScore,
    globalTarget: 98,
    blocsTotal: blocs.length,
    blocsOptimal: blocs.filter(b => b.status === 'optimal').length,
    blocsConforme: blocs.filter(b => b.status === 'conforme').length,
    blocsSurveillance: blocs.filter(b => b.status === 'surveillance').length,
    blocsCritique: blocs.filter(b => b.status === 'critique').length,
    totalTests,
    testsPassed: passed,
    testsFailed: failed,
    testsBlocked: blocked,
    totalFindings: allFindings.length,
    findingsCritical: allFindings.filter(f => f.severity === 'critical').length,
    findingsHigh: allFindings.filter(f => f.severity === 'high').length,
    findingsMedium: allFindings.filter(f => f.severity === 'medium').length,
    findingsLow: allFindings.filter(f => f.severity === 'low').length,
    totalCorrectifs: allCorrectifs.length,
    correctifsCompleted: allCorrectifs.filter(c => c.status === 'completed').length,
    correctifsRunning: allCorrectifs.filter(c => c.status === 'running').length,
    correctifsPending: allCorrectifs.filter(c => c.status === 'pending').length,
    correctifsAuto: allCorrectifs.filter(c => c.type === 'auto').length,
    correctifsSemiAuto: allCorrectifs.filter(c => c.type === 'semi-auto').length,
    correctifsManual: allCorrectifs.filter(c => c.type === 'manual').length,
    totalAgents: blocs.reduce((s, b) => s + b.agents, 0),
    averageBigFourAlignment: avgBigFour,
    lastFullScan: '2026-06-24T06:00:00Z',
    nextScheduledScan: '2026-06-25T06:00:00Z',
  };
}

export const TEST_BLOC_META = {
  auditId: 'KOS-TPB-2026-06-24-001',
  auditDate: '2026-06-24T06:00:00Z',
  assessor: 'Consortium PwC · Deloitte · EY · KPMG — KOS Strategic Governance Office',
  scope: '10 blocs · 79 agents · 18 437 tests · 36 correctifs actifs',
  methodology: 'ISO 9001:2026 + EFQM Excellence Model + Big Four Quality Framework + GEO Authority 3.0',
  mandate: 'Managing Partner — 24 Juin 2026',
  status: 'IN_PROGRESS',
};