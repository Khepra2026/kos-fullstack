export const correctionEngineManifest = [
  { id: "A", name: "Performance Engine", icon: "ri-speed-up-line", description: "Compression AVIF/WebP, lazy loading, preload LCP, defer scripts, code splitting, réduction payload < 2 Mo", colorToken: "primary", fixesTotal: 47, fixesToday: 3, healthScore: 94 },
  { id: "B", name: "LCP Fix Engine", icon: "ri-image-line", description: "Identification et correction du Largest Contentful Paint — hero images, vidéos, backgrounds", colorToken: "accent", fixesTotal: 23, fixesToday: 1, healthScore: 91 },
  { id: "C", name: "Compression Engine", icon: "ri-hard-drive-2-line", description: "Activation gzip + brotli, Cache-Control, ETag, Immutable Assets, CDN Edge Cache", colorToken: "primary", fixesTotal: 12, fixesToday: 0, healthScore: 97 },
  { id: "D", name: "SEO Engine", icon: "ri-search-eye-line", description: "Title ≤ 60 car, meta description, H1 unique, structure H2/H3, schema.org, internal linking", colorToken: "secondary", fixesTotal: 89, fixesToday: 5, healthScore: 95 },
  { id: "E", name: "JavaScript Optimizer", icon: "ri-braces-line", description: "Tree shaking, dynamic imports, remove unused deps, split bundles, defer execution — réduction ≥ 40%", colorToken: "accent", fixesTotal: 31, fixesToday: 2, healthScore: 83 },
  { id: "F", name: "CSS Optimizer", icon: "ri-palette-line", description: "Purge CSS inutilisé, critical CSS inline, split styles non critiques — unused < 5%", colorToken: "primary", fixesTotal: 18, fixesToday: 1, healthScore: 88 },
  { id: "G", name: "Image Governance", icon: "ri-gallery-line", description: "PNG > 300 Ko interdits, JPG > 500 Ko interdits, conversion AVIF/WebP obligatoire, responsive images", colorToken: "secondary", fixesTotal: 56, fixesToday: 4, healthScore: 89 },
  { id: "H", name: "Security Hardening", icon: "ri-shield-check-line", description: "CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, Trusted Types", colorToken: "accent", fixesTotal: 9, fixesToday: 0, healthScore: 93 },
  { id: "I", name: "Accessibility Engine", icon: "ri-wheelchair-line", description: "aria-label, alt attributes, contrast ratio ≥ 4.5:1, focus state, keyboard navigation", colorToken: "primary", fixesTotal: 34, fixesToday: 3, healthScore: 96 },
];

export const correctionLoopStatus = {
  currentPhase: "Scan",
  phaseIndex: 2,
  lastFullScan: "2026-06-14T08:15:00Z",
  lastFixApplied: "2026-06-14T07:42:00Z",
  lastVerification: "2026-06-14T08:00:00Z",
  totalIssuesDetected: 247,
  totalIssuesFixed: 198,
  totalIssuesPending: 49,
  autoFixEnabled: true,
  loopIntervalMinutes: 60,
  uptimePercent: 99.97,
  nextScheduledScan: "2026-06-14T09:00:00Z",
};

export const priorityQueue = [
  { id: "FIX-001", priority: "P0", module: "B", title: "LCP > 3s sur /services — Hero JPEG 520 Ko", rootCause: "JPEG non compressé utilisé comme hero image sans fetchpriority", impact: "LCP 3.1s → cible 2.5s", seoImpact: "Core Web Vitals mobile dégradé", businessImpact: "Taux de rebond +12% estimé", status: "in_progress", eta: "2h", correction: "Convertir JPEG → AVIF 140 Ko + ajouter fetchpriority=high + dimensions responsives + preload link", validationMethod: "Lighthouse re-run + CrUX report", estimatedGain: "LCP -0.6s, Mobile Lighthouse +3 points" },
  { id: "FIX-002", priority: "P0", module: "G", title: "PNG 680 Ko — /images/home/hero-bg.png", rootCause: "PNG non optimisé utilisé comme background hero, pas de version AVIF", impact: "Page weight +680 Ko, LCP indirectement impacté", seoImpact: "Page weight > 2 Mo au total", businessImpact: "Classement mobile dégradé", status: "open", eta: "24h", correction: "Convertir PNG → AVIF 180 Ko + générer WebP fallback + responsive srcset", validationMethod: "Page weight audit + WebPageTest waterfall", estimatedGain: "Page weight -500 Ko, LCP -0.4s" },
  { id: "FIX-003", priority: "P1", module: "E", title: "icon-library.chunk.js — 78% unused (140 Ko gaspillés)", rootCause: "Import complet icônes, seules 22% sont utilisées dans le code", impact: "JS bundle 180 Ko → cible 40 Ko", seoImpact: "TBT +45ms", businessImpact: "Temps de chargement mobile dégradé", status: "open", eta: "48h", correction: "Tree shaking icônes + import dynamique par page + suppression icônes non référencées", validationMethod: "Bundle analyzer + Lighthouse JS audit", estimatedGain: "TBT -45ms, JS -140 Ko" },
  { id: "FIX-004", priority: "P1", module: "D", title: "15 pages avec meta description > 160 caractères", rootCause: "Descriptions longues non tronquées, héritage template", impact: "SERP truncation, CTR réduit", seoImpact: "CTR estimé -3%", businessImpact: "Trafic organique -5%", status: "open", eta: "4h", correction: "Réécriture automatique 15 metas en 140-160 car + validation preview SERP", validationMethod: "SERP simulator + GSC CTR monitoring", estimatedGain: "CTR +3%, trafic +8%" },
  { id: "FIX-005", priority: "P1", module: "D", title: "12 pages manquent hreflang fr/en", rootCause: "Hreflang non configuré sur pages bilingues", impact: "Duplicate content risque, ciblage langue incorrect", seoImpact: "Indexation langue erronée", businessImpact: "Trafic international non optimisé", status: "open", eta: "3h", correction: "Ajout hreflang tags + x-default + validation Search Console", validationMethod: "GSC International Targeting report", estimatedGain: "Trafic EN +15%" },
  { id: "FIX-006", priority: "P2", module: "I", title: "11 images sans attribut alt", rootCause: "Images décoratives sans alt, certaines informatives manquantes", impact: "Accessibilité WCAG 2.2 AA dégradée", seoImpact: "Image SEO non optimisé", businessImpact: "Score accessibilité Lighthouse -4 points", status: "open", eta: "2h", correction: "Ajout alt descriptif sur images informatives + alt='' sur décoratives", validationMethod: "Lighthouse Accessibility audit + axe DevTools", estimatedGain: "Accessibilité +4 points Lighthouse" },
  { id: "FIX-007", priority: "P2", module: "F", title: "animations.css — 44% CSS inutilisé (14 Ko)", rootCause: "Animations définies globalement, non utilisées sur toutes les pages", impact: "CSS payload +14 Ko inutile", seoImpact: "FCP +0.1s", businessImpact: "Performance mobile marginale", status: "open", eta: "24h", correction: "Purge animations non utilisées + critical CSS inline + chargement asynchrone reste", validationMethod: "Coverage DevTools + PurgeCSS report", estimatedGain: "FCP -0.1s, CSS -14 Ko" },
  { id: "FIX-008", priority: "P2", module: "I", title: "5 éléments interactifs sans aria-label", rootCause: "Icônes boutons sans texte ni aria-label", impact: "Utilisateurs lecteurs d'écran bloqués", seoImpact: "N/A", businessImpact: "Conformité WCAG partielle", status: "open", eta: "1h", correction: "Ajout aria-label sur 5 éléments + vérification tab order", validationMethod: "Screen reader testing + axe DevTools", estimatedGain: "Accessibilité +2 points" },
];

export const fixHistory = [
  { id: "HIST-042", timestamp: "2026-06-14T07:42:00Z", module: "D", title: "3 Soft 404 corrigés — redirections 301 ajoutées", status: "verified", before: "404 → perte trafic", after: "301 → /blog actif", gain: "+120 visites/mois estimé" },
  { id: "HIST-041", timestamp: "2026-06-14T07:15:00Z", module: "G", title: "5 PNG convertis en WebP sur /blog", status: "verified", before: "1 280 Ko PNG", after: "320 Ko WebP", gain: "Page weight -960 Ko" },
  { id: "HIST-040", timestamp: "2026-06-14T06:30:00Z", module: "E", title: "Tree shaking sur vendor-react.chunk.js", status: "verified", before: "185 Ko", after: "95 Ko", gain: "JS -90 Ko, TBT -25ms" },
  { id: "HIST-039", timestamp: "2026-06-14T05:45:00Z", module: "A", title: "Preload LCP hero image homepage", status: "verified", before: "LCP 2.4s", after: "LCP 1.9s", gain: "LCP -0.5s" },
  { id: "HIST-038", timestamp: "2026-06-14T04:20:00Z", module: "D", title: "Schema.org FAQPage ajouté sur 12 articles", status: "verified", before: "0 FAQ rich results", after: "12 pages éligibles", gain: "CTR +8% estimé" },
  { id: "HIST-037", timestamp: "2026-06-13T22:10:00Z", module: "B", title: "LCP /case-studies — banner PNG→AVIF + preload", status: "verified", before: "LCP 2.9s", after: "LCP 2.1s", gain: "LCP -0.8s" },
  { id: "HIST-036", timestamp: "2026-06-13T18:00:00Z", module: "G", title: "Conversion AVIF sur 8 images services", status: "verified", before: "1 860 Ko JPEG", after: "520 Ko AVIF", gain: "Page weight -1 340 Ko" },
  { id: "HIST-035", timestamp: "2026-06-13T14:30:00Z", module: "A", title: "Defer scripts non critiques sur 15 pages", status: "verified", before: "TBT 180ms", after: "TBT 98ms", gain: "TBT -82ms" },
  { id: "HIST-034", timestamp: "2026-06-13T11:00:00Z", module: "I", title: "Contraste corrigé sur 8 éléments", status: "verified", before: "Ratio 3.8:1", after: "Ratio 5.2:1", gain: "Accessibilité +6 points" },
  { id: "HIST-033", timestamp: "2026-06-13T08:15:00Z", module: "H", title: "Trusted Types activé en mode report-only", status: "monitoring", before: "Non configuré", after: "Report-Only", gain: "Sécurité B → A-" },
];

export const beforeAfterMetrics = {
  lighthouseMobile: { before: 82, after: 94, delta: 12 },
  lighthouseDesktop: { before: 90, after: 98, delta: 8 },
  lcpMobile: { before: "3.2s", after: "2.1s", delta: "-1.1s" },
  fcpMobile: { before: "2.1s", after: "1.6s", delta: "-0.5s" },
  clsMobile: { before: "0.14", after: "0.06", delta: "-0.08" },
  tbtMobile: { before: "210ms", after: "98ms", delta: "-112ms" },
  pageWeight: { before: "2.8 Mo", after: "1.7 Mo", delta: "-1.1 Mo" },
  accessibilityScore: { before: 82, after: 96, delta: 14 },
  seoScore: { before: 85, after: 95, delta: 10 },
  securityGrade: { before: "B+", after: "A+", delta: "+3" },
};

export const scanResults = [
  { page: "/", lcp: 1.9, fcp: 1.3, cls: 0.04, tbt: 72, weightKB: 1450, status: "optimal", issuesFound: 1 },
  { page: "/services", lcp: 3.1, fcp: 1.9, cls: 0.09, tbt: 145, weightKB: 2240, status: "critical", issuesFound: 5 },
  { page: "/blog", lcp: 2.8, fcp: 1.7, cls: 0.07, tbt: 120, weightKB: 1980, status: "warning", issuesFound: 3 },
  { page: "/about", lcp: 2.4, fcp: 1.5, cls: 0.05, tbt: 95, weightKB: 1680, status: "ok", issuesFound: 2 },
  { page: "/case-studies", lcp: 2.9, fcp: 1.8, cls: 0.08, tbt: 130, weightKB: 2100, status: "critical", issuesFound: 4 },
  { page: "/contact", lcp: 1.7, fcp: 1.2, cls: 0.04, tbt: 55, weightKB: 980, status: "optimal", issuesFound: 0 },
  { page: "/tools/diagnostic", lcp: 2.2, fcp: 1.5, cls: 0.06, tbt: 88, weightKB: 1620, status: "ok", issuesFound: 2 },
  { page: "/insights", lcp: 2.6, fcp: 1.6, cls: 0.07, tbt: 110, weightKB: 1850, status: "warning", issuesFound: 3 },
  { page: "/regions/uemoa-cemac", lcp: 2.3, fcp: 1.4, cls: 0.05, tbt: 82, weightKB: 1520, status: "ok", issuesFound: 1 },
  { page: "/expertises", lcp: 2.7, fcp: 1.8, cls: 0.08, tbt: 125, weightKB: 2050, status: "warning", issuesFound: 4 },
];

export const compressionAudit = [
  { assetType: "text/html", currentCompression: "brotli", ratio: "78%", status: "optimal", sizeBeforeKB: 95, sizeAfterKB: 21 },
  { assetType: "text/css", currentCompression: "brotli", ratio: "82%", status: "optimal", sizeBeforeKB: 180, sizeAfterKB: 32 },
  { assetType: "application/javascript", currentCompression: "brotli", ratio: "76%", status: "optimal", sizeBeforeKB: 520, sizeAfterKB: 125 },
  { assetType: "image/svg+xml", currentCompression: "gzip", ratio: "65%", status: "ok", sizeBeforeKB: 48, sizeAfterKB: 17 },
  { assetType: "font/woff2", currentCompression: "none", ratio: "0%", status: "warning", sizeBeforeKB: 160, sizeAfterKB: 160 },
  { assetType: "application/json (API)", currentCompression: "gzip", ratio: "88%", status: "optimal", sizeBeforeKB: 245, sizeAfterKB: 29 },
];

export const seoFixQueue = [
  { page: "/services/audit-pre-inspection-bceao", issue: "Title tag > 60 caractères", current: "Audit Pré-Inspection BCEAO — Services de Conformité Bancaire et Préparation aux Missions de Contrôle | Khepra Experts (92 car)", suggested: "Audit Pré-Inspection BCEAO — Conformité Bancaire | Khepra Experts (57 car)", severity: "high" },
  { page: "/blog/daf", issue: "Meta description manquante", current: "", suggested: "Découvrez comment structurer une Direction Administrative et Financière performante en Afrique. Guide complet pour DAF, contrôle interne et pilotage financier. Khepra Experts.", severity: "critical" },
  { page: "/services/conseil-strategique", issue: "H1 dupliqué avec title", current: "<h1>Conseil Stratégique</h1> — identique au title", suggested: "<h1>Conseil Stratégique pour Dirigeants — UEMOA & CEMAC</h1>", severity: "medium" },
  { page: "/case-studies/gouvernance-board-advisory-uemoa", issue: "Structure H2/H3 incorrecte", current: "H2 → H4 (skip H3)", suggested: "H2 → H3 → H3 (hiérarchie correcte)", severity: "medium" },
  { page: "/industries/microfinance", issue: "Absence Schema.org Organization", current: "Aucun markup structuré", suggested: "Ajout JSON-LD Organization + WebPage", severity: "high" },
  { page: "/tools/diagnostic-bancabilite", issue: "Canonical manquant", current: "", suggested: '<link rel="canonical" href="https://khepraexperts.com/tools/diagnostic-bancabilite">', severity: "high" },
  { page: "/publications", issue: "Meta description > 160 caractères", current: "185 caractères", suggested: "Tronquer à 158 caractères", severity: "medium" },
];

export const jsOptimizationPlan = [
  { bundle: "chart-library.chunk.js", currentKB: 320, targetKB: 120, action: "Remplacer par lightweight chart lib + dynamic import", strategy: "dynamic_import", priority: "P0", progress: 35 },
  { bundle: "icon-library.chunk.js", currentKB: 180, targetKB: 40, action: "Tree shaking — ne garder que les 45 icônes utilisées", strategy: "tree_shaking", priority: "P1", progress: 60 },
  { bundle: "vendor-react.chunk.js", currentKB: 185, targetKB: 95, action: "Tree shaking react-dom/server + lazy load routes", strategy: "tree_shaking", priority: "P1", progress: 100 },
  { bundle: "pdf-generator.chunk.js", currentKB: 245, targetKB: 155, action: "Lazy load — import dynamique sur CTA uniquement", strategy: "lazy_load", priority: "P1", progress: 0 },
  { bundle: "animation-lib.chunk.js", currentKB: 95, targetKB: 45, action: "Remplacer animations JS par CSS animations + transitions", strategy: "replace", priority: "P2", progress: 0 },
  { bundle: "analytics-tracker.chunk.js", currentKB: 45, targetKB: 30, action: "Minifier + async load", strategy: "minify", priority: "P2", progress: 100 },
];

export const imageCorrectionQueue = [
  { path: "/images/home/hero-bg.png", currentKB: 680, format: "PNG", targetKB: 180, targetFormat: "AVIF", action: "Convertir PNG → AVIF + WebP fallback + responsive srcset 1920w/1280w/768w", priority: "P0", status: "pending" },
  { path: "/images/about/team-photo.jpg", currentKB: 520, format: "JPEG", targetKB: 140, targetFormat: "AVIF", action: "Convertir JPEG → AVIF + dimensions 1200x800 max", priority: "P1", status: "pending" },
  { path: "/images/blog/illustration-1.png", currentKB: 340, format: "PNG", targetKB: 65, targetFormat: "WebP", action: "Convertir PNG → WebP + lazy loading", priority: "P1", status: "pending" },
  { path: "/images/case-studies/graph.png", currentKB: 290, format: "PNG", targetKB: 55, targetFormat: "WebP", action: "Convertir PNG → WebP + dimensions responsives", priority: "P2", status: "pending" },
  { path: "/images/services/banner.jpg", currentKB: 435, format: "JPEG", targetKB: 120, targetFormat: "AVIF", action: "Convertir JPEG → AVIF + preload pour page /services", priority: "P0", status: "in_progress" },
];

export const securityFixPlan = [
  { header: "Trusted Types", currentStatus: "Report-Only", targetStatus: "Enforced", action: "Activer 'require-trusted-types-for 'script'' après audit CSP", complexity: "high", priority: "P2", eta: "72h" },
  { header: "Permissions-Policy", currentStatus: "A-", targetStatus: "A+", action: "Restreindre geolocation=() + ajouter accelerometer=(), gyroscope=()", complexity: "low", priority: "P2", eta: "2h" },
  { header: "Cross-Origin-Embedder-Policy", currentStatus: "B+", targetStatus: "A", action: "Passer de require-corp à credentialless pour compatibilité CDN", complexity: "medium", priority: "P2", eta: "24h" },
  { header: "Server Signature", currentStatus: "Exposée", targetStatus: "Masquée", action: "Masquer version serveur dans _headers Netlify", complexity: "low", priority: "P1", eta: "1h" },
];

export const accessibilityFixQueue = [
  { element: "Bouton menu mobile", issue: "aria-label manquant", fix: 'aria-label="Ouvrir le menu de navigation"', wcagCriteria: "4.1.2 Name, Role, Value", severity: "high", status: "open" },
  { element: "Icône recherche header", issue: "aria-label manquant", fix: 'aria-label="Rechercher sur le site"', wcagCriteria: "4.1.2 Name, Role, Value", severity: "high", status: "open" },
  { element: "Image /images/about/team-photo.jpg", issue: "alt text vide sur image informative", fix: 'alt="Équipe Khepra Experts — Consultants Big Four réunis au bureau de Dakar"', wcagCriteria: "1.1.1 Non-text Content", severity: "high", status: "open" },
  { element: "Carrousel témoignages (3 flèches)", issue: "Focus state invisible sur flèches", fix: "Ajouter outline-2 outline-offset-2 sur focus-visible", wcagCriteria: "2.4.7 Focus Visible", severity: "medium", status: "open" },
  { element: "Tableau comparatif tarifs", issue: "Contraste 3.9:1 (minimum 4.5:1)", fix: "Passer texte de gray-400 à gray-600 sur fond blanc", wcagCriteria: "1.4.3 Contrast (Minimum)", severity: "critical", status: "open" },
  { element: "Formulaire contact (champ email)", issue: "Label non associé à l'input", fix: "Ajouter htmlFor sur label + id sur input", wcagCriteria: "1.3.1 Info and Relationships", severity: "high", status: "open" },
  { element: "Skip navigation link", issue: "Absent sur 3 pages (/tools/*)", fix: "Ajouter skip-link avec href='#main-content'", wcagCriteria: "2.4.1 Bypass Blocks", severity: "high", status: "open" },
];

export const executiveReportCorrection = {
  period: "08-14 Juin 2026",
  totalFixesApplied: 52,
  totalFixesVerified: 47,
  fixesInProgress: 5,
  fixesPending: 49,
  avgTimeToFix: "4.2h",
  avgTimeToVerify: "1.8h",
  successRate: "97.8%",
  rollbackRate: "2.2%",
  metricsImpact: [
    { metric: "Lighthouse Mobile", evolution: "82 → 94", trend: "up", gainPercent: 14.6 },
    { metric: "Lighthouse Desktop", evolution: "90 → 98", trend: "up", gainPercent: 8.9 },
    { metric: "LCP Mobile", evolution: "3.2s → 2.1s", trend: "up", gainPercent: 34.4 },
    { metric: "Page Weight", evolution: "2.8 Mo → 1.7 Mo", trend: "up", gainPercent: 39.3 },
    { metric: "Accessibilité", evolution: "82 → 96", trend: "up", gainPercent: 17.1 },
    { metric: "SEO Score", evolution: "85 → 95", trend: "up", gainPercent: 11.8 },
    { metric: "Security Grade", evolution: "B+ → A+", trend: "up", gainPercent: 0 },
    { metric: "TBT Mobile", evolution: "210ms → 98ms", trend: "up", gainPercent: 53.3 },
  ],
  topGains: [
    { module: "G", description: "Conversion PNG/JPEG → AVIF/WebP sur 28 images", gain: "Page weight -1.1 Mo, LCP global -0.6s" },
    { module: "E", description: "Tree shaking + lazy loading JS sur 6 bundles", gain: "JS payload -275 Ko, TBT -112ms" },
    { module: "D", description: "Correction metas, hreflang, schema.org sur 42 pages", gain: "CTR estimé +8%, trafic +15%" },
    { module: "B", description: "Preload + optimisation LCP sur 5 pages critiques", gain: "LCP -0.8s en moyenne" },
    { module: "I", description: "Corrections WCAG 2.2 AA — 34 fixes", gain: "Accessibilité +14 points Lighthouse" },
  ],
  roiEstimate: "ROI global : +18% performances, +15% trafic organique, +12% conversion, -40% poids pages. Estimation valeur business : +45 000 €/an en trafic additionnel.",
};

export const autonomousLoopLog = [
  { timestamp: "2026-06-14T08:15:00Z", phase: "Scan", status: "completed", details: "Scan 10 pages — 3 critical, 3 warning, 2 ok, 2 optimal", duration: "12s" },
  { timestamp: "2026-06-14T08:17:00Z", phase: "Diagnose", status: "completed", details: "RCA sur 8 issues — 2 P0, 3 P1, 3 P2", duration: "8s" },
  { timestamp: "2026-06-14T08:19:00Z", phase: "Plan", status: "completed", details: "Plan correction — 8 patches générés", duration: "5s" },
  { timestamp: "2026-06-14T08:20:00Z", phase: "Fix", status: "in_progress", details: "Application patch FIX-001 (LCP /services) en cours...", duration: "en cours" },
  { timestamp: "2026-06-14T07:45:00Z", phase: "Verify", status: "completed", details: "Validation FIX-042 — 3 Soft 404 → 301 OK, status 200 confirmé", duration: "22s" },
  { timestamp: "2026-06-14T07:20:00Z", phase: "Monitor", status: "completed", details: "Post-deploy monitoring FIX-041 — Page weight stable -960 Ko, LCP maintenu", duration: "5min" },
  { timestamp: "2026-06-14T06:35:00Z", phase: "Verify", status: "completed", details: "Validation FIX-040 — vendor-react.chunk.js 95 Ko, TBT 73ms confirmé", duration: "18s" },
  { timestamp: "2026-06-14T05:50:00Z", phase: "Verify", status: "completed", details: "Validation FIX-039 — LCP homepage 1.9s confirmé CrUX + Lighthouse", duration: "25s" },
];