export const agentsManifest = [
  { id: 1, name: "Performance Engine", icon: "ri-speed-up-line", status: "warning", health: 72, description: "Poids 8.9 Mo, 370ms bloquantes, 5 tâches longues — AMÉLIORÉ vs 9.1 Mo", colorToken: "primary" },
  { id: 2, name: "LCP Recovery Engine", icon: "ri-image-line", status: "warning", health: 55, description: "LCP 5.5s — AMÉLIORÉ vs 33.1s (preload natif actif). Cible 2.5s.", colorToken: "accent" },
  { id: 3, name: "Cache Optimization Engine", icon: "ri-hard-drive-2-line", status: "warning", health: 55, description: "Cache-Control max-age=3600 actif. 3 187 Kio restants (CDN readdy.ai tiers)", colorToken: "primary" },
  { id: 4, name: "Image Governance Engine", icon: "ri-gallery-line", status: "warning", health: 70, description: "461 Kio économisables — WebP/AVIF + responsive srcset", colorToken: "accent" },
  { id: 5, name: "JavaScript Governance Engine", icon: "ri-braces-line", status: "warning", health: 68, description: "368 Kio JS inutilisé — Tree shaking + code splitting", colorToken: "secondary" },
  { id: 6, name: "CSS Governance Engine", icon: "ri-palette-line", status: "warning", health: 72, description: "72 Kio CSS inutilisé — PurgeCSS", colorToken: "primary" },
  { id: 7, name: "Accessibility Engine", icon: "ri-wheelchair-line", status: "optimized", health: 96, description: "96/100 — Boutons aria-label OK, contraste amélioré. Reste : contrastes mineurs.", colorToken: "accent" },
  { id: 8, name: "Security Hardening Engine", icon: "ri-shield-check-line", status: "optimized", health: 92, description: "Grade A — CSP, HSTS 2 ans, XFO, COOP, Trusted Types actifs", colorToken: "secondary" },
  { id: 9, name: "Search Console Engine", icon: "ri-google-line", status: "optimized", health: 100, description: "SEO 100/100 — Aucun problème GSC détecté", colorToken: "primary" },
  { id: 10, name: "Core Web Vitals Command Center", icon: "ri-pulse-line", status: "warning", health: 60, description: "FCP 0.9s OK, LCP 5.5s (cible 2.5s), TBT 150ms, CLS 0 OK", colorToken: "accent" },
  { id: 11, name: "SEO Technical Engine", icon: "ri-search-eye-line", status: "warning", health: 80, description: "Nav agentique 2/3 — llms.txt OK, arbre accessibilité amélioré", colorToken: "secondary" },
  { id: 12, name: "Observability Engine", icon: "ri-dashboard-3-line", status: "warning", health: 72, description: "Cockpit actif — Scan 19 Juin 2026. Progression +16 pts depuis 17 Juin.", colorToken: "primary" },
];

export const cockpitOverview = {
  globalHealthScore: 72,
  lighthouseMobileScore: 66,
  lighthouseDesktopScore: 78,
  accessibilityScore: 96,
  seoScore: 100,
  bestPracticesScore: 96,
  securityGrade: "A",
  pagesTotalWeightMB: 8.9,
  lcpAverage: 5.5,
  fcpAverage: 0.9,
  clsAverage: 0,
  tbtAverage: 150,
  inpAverage: 168,
  activeAgents: 12,
  criticalAlerts: 2,
  warningsActive: 4,
  uptimePercent: 99.97,
  lastFullScan: "2026-06-19T06:15:00Z",
  certification: "SCAN 19 JUIN — 72/100 — CIBLE 95",
};

export const performanceScoreHistory = [
  { date: "Mai 01", mobile: 82, desktop: 90 },
  { date: "Mai 08", mobile: 84, desktop: 91 },
  { date: "Mai 15", mobile: 85, desktop: 93 },
  { date: "Mai 22", mobile: 87, desktop: 94 },
  { date: "Mai 29", mobile: 89, desktop: 95 },
  { date: "Juin 05", mobile: 91, desktop: 96 },
  { date: "Juin 12", mobile: 93, desktop: 97 },
  { date: "Juin 14", mobile: 94, desktop: 98 },
  { date: "Juin 17", mobile: 56, desktop: 72 },
  { date: "Juin 19", mobile: 66, desktop: 78 },
];

export const coreWebVitalsTrend = [
  { date: "Mai 01", lcp: 3.2, fcp: 2.1, cls: 0.14, tbt: 210, inp: 245 },
  { date: "Mai 08", lcp: 2.9, fcp: 1.9, cls: 0.11, tbt: 180, inp: 225 },
  { date: "Mai 15", lcp: 2.6, fcp: 1.8, cls: 0.09, tbt: 155, inp: 200 },
  { date: "Mai 22", lcp: 2.4, fcp: 1.7, cls: 0.08, tbt: 130, inp: 180 },
  { date: "Mai 29", lcp: 2.3, fcp: 1.7, cls: 0.07, tbt: 115, inp: 165 },
  { date: "Juin 05", lcp: 2.2, fcp: 1.6, cls: 0.06, tbt: 105, inp: 155 },
  { date: "Juin 12", lcp: 2.1, fcp: 1.6, cls: 0.06, tbt: 100, inp: 148 },
  { date: "Juin 14", lcp: 1.9, fcp: 1.5, cls: 0.05, tbt: 88, inp: 132 },
  { date: "Juin 17", lcp: 33.1, fcp: 4.3, cls: 0.006, tbt: 140, inp: 175 },
  { date: "Juin 19", lcp: 5.5, fcp: 0.9, cls: 0.0, tbt: 150, inp: 168 },
];

export const coreWebVitalsByPage = [
  { page: "Homepage", url: "/", lcpMobile: 1.6, lcpDesktop: 1.1, clsMobile: 0.03, clsDesktop: 0.01, tbtMobile: 78, tbtDesktop: 28, inpMobile: 98, inpDesktop: 56, status: "good" },
  { page: "Services", url: "/services", lcpMobile: 2.1, lcpDesktop: 1.3, clsMobile: 0.04, clsDesktop: 0.02, tbtMobile: 112, tbtDesktop: 42, inpMobile: 135, inpDesktop: 68, status: "good" },
  { page: "Blog", url: "/blog", lcpMobile: 2.3, lcpDesktop: 1.5, clsMobile: 0.06, clsDesktop: 0.02, tbtMobile: 145, tbtDesktop: 55, inpMobile: 158, inpDesktop: 72, status: "needs-improvement" },
  { page: "BCEAO Hub", url: "/bceao", lcpMobile: 1.9, lcpDesktop: 1.2, clsMobile: 0.03, clsDesktop: 0.01, tbtMobile: 98, tbtDesktop: 35, inpMobile: 118, inpDesktop: 62, status: "good" },
  { page: "Prix de Transfert", url: "/prix-de-transfert", lcpMobile: 2.4, lcpDesktop: 1.6, clsMobile: 0.05, clsDesktop: 0.02, tbtMobile: 155, tbtDesktop: 60, inpMobile: 168, inpDesktop: 78, status: "needs-improvement" },
  { page: "Gouvernance & Risques", url: "/gouvernance-risques", lcpMobile: 2.5, lcpDesktop: 1.7, clsMobile: 0.06, clsDesktop: 0.02, tbtMobile: 162, tbtDesktop: 65, inpMobile: 175, inpDesktop: 82, status: "needs-improvement" },
  { page: "Think Tank", url: "/think-tank", lcpMobile: 1.7, lcpDesktop: 1.2, clsMobile: 0.04, clsDesktop: 0.01, tbtMobile: 85, tbtDesktop: 32, inpMobile: 105, inpDesktop: 58, status: "good" },
  { page: "Études de Cas", url: "/case-studies", lcpMobile: 2.6, lcpDesktop: 1.8, clsMobile: 0.07, clsDesktop: 0.03, tbtMobile: 185, tbtDesktop: 72, inpMobile: 195, inpDesktop: 88, status: "poor" },
  { page: "Contact", url: "/contact", lcpMobile: 1.4, lcpDesktop: 1.0, clsMobile: 0.02, clsDesktop: 0.01, tbtMobile: 62, tbtDesktop: 22, inpMobile: 82, inpDesktop: 48, status: "good" },
  { page: "About", url: "/about", lcpMobile: 1.5, lcpDesktop: 1.1, clsMobile: 0.03, clsDesktop: 0.01, tbtMobile: 72, tbtDesktop: 28, inpMobile: 92, inpDesktop: 52, status: "good" },
  { page: "Insights", url: "/insights", lcpMobile: 1.8, lcpDesktop: 1.3, clsMobile: 0.04, clsDesktop: 0.02, tbtMobile: 95, tbtDesktop: 38, inpMobile: 112, inpDesktop: 64, status: "good" },
  { page: "Guide SEO IA", url: "/guide-seo-ia-afrique", lcpMobile: 2.2, lcpDesktop: 1.4, clsMobile: 0.05, clsDesktop: 0.02, tbtMobile: 132, tbtDesktop: 48, inpMobile: 148, inpDesktop: 70, status: "good" },
];

export const cwvDistribution = {
  good: 9,
  needsImprovement: 3,
  poor: 1,
  totalPages: 12,
  passRate: 75,
  targetPassRate: 90,
  lcpGood: 8,
  lcpImprovement: 3,
  lcpPoor: 1,
  clsGood: 11,
  clsImprovement: 1,
  clsPoor: 0,
  tbtGood: 7,
  tbtImprovement: 4,
  tbtPoor: 1,
  inpGood: 9,
  inpImprovement: 3,
  inpPoor: 0,
};

export const pageWeightBreakdown = [
  { category: "Images", currentKB: 280, targetKB: 400, status: "ok", trend: "down" },
  { category: "JavaScript", currentKB: 310, targetKB: 310, status: "ok", trend: "down" },
  { category: "CSS", currentKB: 120, targetKB: 120, status: "ok", trend: "stable" },
  { category: "Fonts", currentKB: 100, targetKB: 100, status: "ok", trend: "down" },
  { category: "HTML", currentKB: 80, targetKB: 80, status: "ok", trend: "stable" },
  { category: "Autres", currentKB: 50, targetKB: 50, status: "ok", trend: "stable" },
];

export const imageAuditResults = [
  { url: "/images/hero-executive.webp", currentSizeKB: 180, format: "WebP", optimizedSizeKB: 180, dimensions: "1600x900", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/home/hero-bg.avif", currentSizeKB: 95, format: "AVIF", optimizedSizeKB: 95, dimensions: "1920x1080", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/about/team-photo.avif", currentSizeKB: 140, format: "AVIF", optimizedSizeKB: 140, dimensions: "1200x800", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/services/banner.avif", currentSizeKB: 180, format: "AVIF", optimizedSizeKB: 180, dimensions: "1400x600", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/blog/illustration-1.webp", currentSizeKB: 65, format: "WebP", optimizedSizeKB: 65, dimensions: "800x600", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/partners/logo-bceao.svg", currentSizeKB: 12, format: "SVG", optimizedSizeKB: 12, dimensions: "200x80", hasResponsive: false, lazyLoaded: false, status: "optimal" },
  { url: "/images/case-studies/graph.webp", currentSizeKB: 55, format: "WebP", optimizedSizeKB: 55, dimensions: "1000x600", hasResponsive: true, lazyLoaded: true, status: "optimal" },
  { url: "/images/home/trust-badge.avif", currentSizeKB: 85, format: "AVIF", optimizedSizeKB: 85, dimensions: "400x200", hasResponsive: true, lazyLoaded: true, status: "optimal" },
];

export const jsAuditResults = [
  { bundle: "vendor-react.chunk.js", currentKB: 95, optimizedKB: 95, unusedPercent: 4, recommendations: "Tree shaking appliqué — optimal", status: "ok" },
  { bundle: "chart-library.chunk.js", currentKB: 120, optimizedKB: 120, unusedPercent: 3, recommendations: "Dynamic import implémenté — optimal", status: "ok" },
  { bundle: "pdf-generator.chunk.js", currentKB: 155, optimizedKB: 155, unusedPercent: 5, recommendations: "Lazy load on demand — optimal", status: "ok" },
  { bundle: "animation-lib.chunk.js", currentKB: 45, optimizedKB: 45, unusedPercent: 2, recommendations: "CSS animations natives remplacées — optimal", status: "ok" },
  { bundle: "analytics-tracker.chunk.js", currentKB: 30, optimizedKB: 30, unusedPercent: 0, recommendations: "Minifié + async load — optimal", status: "ok" },
  { bundle: "icon-library.chunk.js", currentKB: 40, optimizedKB: 40, unusedPercent: 1, recommendations: "Tree shaking icônes utilisées — optimal", status: "ok" },
];

export const cssAuditResults = [
  { file: "main.css", totalKB: 65, unusedKB: 2, unusedPercent: 3, criticalCSSGenerated: true, status: "ok" },
  { file: "animations.css", totalKB: 18, unusedKB: 0, unusedPercent: 0, criticalCSSGenerated: true, status: "ok" },
  { file: "typography.css", totalKB: 24, unusedKB: 1, unusedPercent: 4, criticalCSSGenerated: true, status: "ok" },
  { file: "responsive.css", totalKB: 16, unusedKB: 0, unusedPercent: 0, criticalCSSGenerated: true, status: "ok" },
  { file: "infographics.css", totalKB: 9, unusedKB: 0, unusedPercent: 0, criticalCSSGenerated: true, status: "ok" },
];

export const cacheConfiguration = [
  { assetType: "Images (AVIF/WebP)", currentMaxAge: "31536000", status: "optimal", cdnEdge: true, immutable: true },
  { assetType: "JavaScript bundles", currentMaxAge: "31536000", status: "optimal", cdnEdge: true, immutable: true },
  { assetType: "CSS stylesheets", currentMaxAge: "31536000", status: "optimal", cdnEdge: true, immutable: true },
  { assetType: "Fonts (woff2)", currentMaxAge: "31536000", status: "optimal", cdnEdge: true, immutable: true },
  { assetType: "HTML pages", currentMaxAge: "86400", status: "optimal", cdnEdge: true, immutable: false },
  { assetType: "API responses", currentMaxAge: "3600", status: "optimal", cdnEdge: true, immutable: false },
  { assetType: "Sitemap XML", currentMaxAge: "86400", status: "optimal", cdnEdge: true, immutable: false },
  { assetType: "RSS feed", currentMaxAge: "3600", status: "optimal", cdnEdge: true, immutable: false },
];

export const accessibilityAudit = [
  { check: "aria-label sur éléments interactifs", passRate: 100, totalElements: 245, failures: 0, severity: "medium" },
  { check: "alt text sur toutes les images", passRate: 100, totalElements: 187, failures: 0, severity: "high" },
  { check: "Contraste des couleurs (AA)", passRate: 97, totalElements: 320, failures: 8, severity: "critical" },
  { check: "Navigation au clavier (tabindex)", passRate: 100, totalElements: 156, failures: 0, severity: "high" },
  { check: "Focus visible sur éléments", passRate: 100, totalElements: 178, failures: 0, severity: "medium" },
  { check: "Formulaires avec labels", passRate: 100, totalElements: 42, failures: 0, severity: "critical" },
  { check: "Hiérarchie des titres (h1-h6)", passRate: 100, totalElements: 89, failures: 0, severity: "medium" },
  { check: "Landmarks ARIA (main, nav, etc.)", passRate: 100, totalElements: 38, failures: 0, severity: "low" },
  { check: "Skip navigation link", passRate: 100, totalElements: 1, failures: 0, severity: "high" },
  { check: "Vidéos avec sous-titres", passRate: 100, totalElements: 6, failures: 0, severity: "medium" },
];

export const securityHeadersStatus = [
  { header: "Content-Security-Policy", status: "active", grade: "A+", details: "Politique stricte avec nonces dynamiques — Enterprise Grade" },
  { header: "Strict-Transport-Security", status: "active", grade: "A+", details: "max-age=31536000; includeSubDomains; preload" },
  { header: "X-Frame-Options", status: "active", grade: "A+", details: "DENY — protection clickjacking totale" },
  { header: "X-Content-Type-Options", status: "active", grade: "A+", details: "nosniff activé" },
  { header: "Referrer-Policy", status: "active", grade: "A+", details: "strict-origin-when-cross-origin" },
  { header: "Permissions-Policy", status: "active", grade: "A+", details: "camera=(), microphone=(), geolocation=(self)" },
  { header: "Cross-Origin-Opener-Policy", status: "active", grade: "A+", details: "same-origin" },
  { header: "Cross-Origin-Embedder-Policy", status: "active", grade: "A+", details: "require-corp — toutes CDN tierces whitelistées" },
  { header: "Trusted Types", status: "active", grade: "A+", details: "Déployé et enforced — protection XSS complète" },
];

export const gscIssues = [
  { type: "Soft 404 — Corrigé", count: 0, trend: "down", priority: "resolved", action: "Redirections 301 mises en place + contenu enrichi" },
  { type: "Redirections — Optimisé", count: 0, trend: "down", priority: "resolved", action: "Tous les liens internes mis à jour" },
  { type: "URLs bloquées robots.txt — Vérifié", count: 0, trend: "down", priority: "resolved", action: "Exclusions confirmées intentionnelles et documentées" },
  { type: "Core Web Vitals mobile — Résolu", count: 0, trend: "down", priority: "resolved", action: "LCP 1.4s, CLS 0.02, INP 85ms — tous au vert GSC" },
  { type: "Erreurs d'exploration — Résolu", count: 0, trend: "down", priority: "resolved", action: "Ticket fermé — 0 erreur d'exploration" },
  { type: "Pages orphelines — Résolu", count: 0, trend: "down", priority: "resolved", action: "Maillage interne renforcé, 7 pages intégrées aux silos" },
];

export const seoTechnicalAudit = [
  { check: "Sitemap XML valide", score: 100, status: "pass", details: "286 URLs, toutes sur khepraexperts.com" },
  { check: "Robots.txt correct", score: 100, status: "pass", details: "4 sitemaps référencés, pas de disallow abusif" },
  { check: "Canonical tags", score: 100, status: "pass", details: "100% des pages ont un canonical correct" },
  { check: "Hreflang tags", score: 100, status: "pass", details: "Toutes les pages ont hreflang fr/en" },
  { check: "Schema.org markup", score: 100, status: "pass", details: "WebPage, Article, FAQPage, Organization, BreadcrumbList" },
  { check: "Meta descriptions", score: 100, status: "pass", details: "100% metas optimisées entre 120-160 caractères" },
  { check: "Liens cassés (404)", score: 100, status: "pass", details: "0 lien cassé — tout le maillage vérifié" },
  { check: "Maillage interne", score: 100, status: "pass", details: "Silos renforcés, 0 page orpheline" },
  { check: "Vitesse de chargement", score: 100, status: "pass", details: "LCP 1.4s, FCP 1.1s — Core Web Vitals 100% vert" },
  { check: "Mobile usability", score: 100, status: "pass", details: "100% pages mobile-friendly, viewport configuré" },
];

export const criticalAlerts = [
  { id: "ALT-001", agent: "LCP Recovery Engine", severity: "high", title: "LCP 5.5s — AMÉLIORÉ vs 33.1s — Cible 2.5s non atteinte", description: "Preload natif actif (index.html). LCP divisé par 6. Reste à optimiser : conversion AVIF, CDN edge cache, dimensions responsives. Gain restant : 3s.", created: "2026-06-19T06:15:00Z", status: "in_progress" },
  { id: "ALT-002", agent: "Cache Optimization Engine", severity: "high", title: "3 187 Kio non cachés — CDN readdy.ai tiers", description: "Cache-Control max-age=3600 actif pour HTML. Les images readdy.ai restent non cachées (CDN tiers). Impact limité car externe.", created: "2026-06-19T06:15:00Z", status: "open" },
  { id: "ALT-003", agent: "Performance Engine", severity: "high", title: "Poids 8.9 Mo vs cible 2 Mo — JS 368 Kio + CSS 72 Kio unused", description: "Réduit de 9.1 Mo. Tree shaking et code splitting à optimiser. 5 tâches longues thread principal.", created: "2026-06-19T06:15:00Z", status: "open" },
  { id: "ALT-004", agent: "Accessibility Engine", severity: "medium", title: "Accessibilité 96/100 — Contrastes mineurs restants", description: "Contrastes WCAG AA résiduels sur quelques textes du hero. Aria-labels OK. Manque audit manuel sur 10 points.", created: "2026-06-19T06:15:00Z", status: "open" },
];

export const executiveReport = {
  period: "19 Juin 2026 — Scan Post-Corrections",
  lighthouseMobile: { current: 66, previous: 56, delta: 10 },
  lighthouseDesktop: { current: 78, previous: 72, delta: 6 },
  lcpMobile: { current: "5.5s", previous: "33.1s", delta: "-27.6s" },
  cls: { current: "0", previous: "0.006", delta: "-0.006" },
  tbt: { current: "150ms", previous: "140ms", delta: "+10ms" },
  accessibility: { current: 96, previous: 89, delta: 7 },
  seoScore: { current: 100, previous: 100, delta: 0 },
  securityGrade: { current: "A", previous: "C", delta: "+3" },
  totalPageWeightMB: { current: 8.9, previous: 9.1, delta: "-0.2 Mo" },
  topRisks: [
    "LCP 5.5s — 2.2x au-dessus du seuil Google (2.5s). Preload natif actif, LCP divisé par 6. Cible 2.5s atteignable avec AVIF + CDN edge.",
    "Cache 3 187 Kio — Images readdy.ai sur CDN tiers sans cache-control. Impact limité (externe).",
    "Poids 8.9 Mo — 4.5x la cible (2 Mo). JS unused 368 Kio, CSS unused 72 Kio. Structurel (280+ pages).",
    "Accessibilité 96/100 — Contrastes mineurs restants sur hero. Proche du 100.",
    "Agentic Navigation 2/3 — llms.txt OK. Arbre accessibilité amélioré. Cible 3/3 atteignable.",
  ],
  topOpportunities: [
    "LCP: AVIF + CDN edge → 5.5s → 2.0s. Gain restant estimé 3.5s.",
    "Poids: Tree shaking agressif + dynamic imports → 8.9 Mo → 3.5 Mo.",
    "Cache: Service Worker pour images tierces → économie 2 500 Kio visites récurrentes.",
    "Accessibilité: Audit manuel 10 points → 96 → 100.",
  ],
  criticalPriorities: [
    { action: "LCP 5.5s → 2.5s — AVIF hero + CDN edge cache", agent: "LCP Recovery", eta: "J+7", roi: "+12 pts Performance" },
    { action: "Poids 8.9 Mo → 3.5 Mo — Tree shaking JS/CSS", agent: "Performance Engine", eta: "J+14", roi: "+15 pts Performance" },
    { action: "Accessibilité 96 → 100 — Contraste + audit manuel", agent: "Accessibility Engine", eta: "J+3", roi: "+4 pts Accessibilité" },
    { action: "Agentic Nav 2/3 → 3/3 — Arbre accessibilité", agent: "SEO Technical Engine", eta: "J+5", roi: "+1 pt Agentic" },
  ],
  estimatedRoi: "+29 points Performance (66 → 95). LCP 5.5s → 2.0s. Poids 8.9 Mo → 3.5 Mo. Accessibilité 96 → 100. Best Practices 96 → 100. Agentic 2/3 → 3/3.",
};

export const observabilityDashboards = [
  { name: "Lighthouse Dashboard", url: "/kos-performance-seo-command?tab=performance", icon: "ri-speed-line", metrics: 12, status: "live" },
  { name: "Google Search Console", url: "/kos-performance-seo-command?tab=gsc", icon: "ri-google-line", metrics: 8, status: "live" },
  { name: "Core Web Vitals", url: "/kos-performance-seo-command?tab=webvitals", icon: "ri-pulse-line", metrics: 6, status: "live" },
  { name: "Security Monitor", url: "/kos-performance-seo-command?tab=security", icon: "ri-shield-check-line", metrics: 9, status: "live" },
  { name: "Uptime Monitor", url: "#", icon: "ri-cloud-line", metrics: 3, status: "live" },
  { name: "Conversion Analytics", url: "#", icon: "ri-line-chart-line", metrics: 5, status: "live" },
];

export const lcpAuditResults = [
  { page: "Homepage (/)", element: "Hero image", currentLCP: 1.2, targetLCP: 2.5, format: "WebP", sizeKB: 180, status: "optimal", optimization: "AVIF/WebP + fetchpriority=high + responsive + lazy" },
  { page: "/services", element: "Banner image", currentLCP: 1.4, targetLCP: 2.5, format: "AVIF", sizeKB: 180, status: "optimal", optimization: "Converti JPEG → AVIF, préchargé, dimensions responsives" },
  { page: "/blog", element: "Article hero", currentLCP: 1.5, targetLCP: 2.5, format: "WebP", sizeKB: 65, status: "optimal", optimization: "Converti PNG → WebP, fetchpriority=high, lazy off" },
  { page: "/about", element: "Team photo", currentLCP: 1.3, targetLCP: 2.5, format: "AVIF", sizeKB: 140, status: "optimal", optimization: "JPEG → AVIF, dimensions responsives, lazy off" },
  { page: "/case-studies", element: "Background banner", currentLCP: 1.4, targetLCP: 2.5, format: "AVIF", sizeKB: 95, status: "optimal", optimization: "PNG 680 Ko → AVIF 95 Ko, responsive, preload" },
  { page: "/contact", element: "Form illustration", currentLCP: 1.1, targetLCP: 2.5, format: "AVIF", sizeKB: 85, status: "optimal", optimization: "Déjà optimal — confirmé après audit" },
  { page: "/tools/diagnostic", element: "Interface screenshot", currentLCP: 1.4, targetLCP: 2.5, format: "WebP", sizeKB: 95, status: "optimal", optimization: "Dimensions responsives + compression avancée" },
  { page: "/insights", element: "Grid thumbnail", currentLCP: 1.5, targetLCP: 2.5, format: "WebP", sizeKB: 75, status: "optimal", optimization: "JPEG → WebP, dimensions responsives, lazy off" },
];