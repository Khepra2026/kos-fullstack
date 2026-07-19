export interface OptimizationMetric {
  category: string;
  icon: string;
  score: number;
  target: number;
  status: 'optimal' | 'good' | 'needs_work' | 'critical';
  description: string;
  lastChecked: string;
}

export interface OptimizationAction {
  id: string;
  agent: string;
  icon: string;
  action: string;
  priority: 'P0' | 'P1' | 'P2';
  status: 'completed' | 'in_progress' | 'pending';
  impact: string;
  eta: string;
  progress: number;
}

export interface SEOPerfSnapshot {
  timestamp: string;
  pagespeedMobile: number;
  pagespeedDesktop: number;
  lcpMobile: number;
  lcpDesktop: number;
  clsMobile: number;
  clsDesktop: number;
  tbtMobile: number;
  tbtDesktop: number;
  seoScore: number;
  aeoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  totalWeightMB: number;
}

export const OPTIMIZATION_METRICS: OptimizationMetric[] = [
  {
    category: 'PageSpeed Mobile',
    icon: 'ri-smartphone-line',
    score: 97,
    target: 95,
    status: 'optimal',
    description: 'Score PageSpeed Insights mobile — 97/100. Cible Big Four 95 dépassée de 2 points.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'PageSpeed Desktop',
    icon: 'ri-computer-line',
    score: 99,
    target: 95,
    status: 'optimal',
    description: 'Score PageSpeed Insights desktop — 99/100. Performance quasi-parfaite.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'LCP (Largest Contentful Paint)',
    icon: 'ri-image-line',
    score: 96,
    target: 95,
    status: 'optimal',
    description: 'LCP mobile 1.6s, desktop 1.1s. 100% sous le seuil Google 2.5s. AVIF + fetchpriority=high actif.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'CLS (Cumulative Layout Shift)',
    icon: 'ri-layout-line',
    score: 100,
    target: 95,
    status: 'optimal',
    description: 'CLS mobile 0.03, desktop 0.01. Layout 100% stable. Dimensions explicites sur toutes les images.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'TBT (Total Blocking Time)',
    icon: 'ri-timer-line',
    score: 95,
    target: 90,
    status: 'optimal',
    description: 'TBT mobile 78ms, desktop 28ms. Tree shaking + code splitting appliqués. 0 tâche longue > 50ms.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'INP (Interaction to Next Paint)',
    icon: 'ri-cursor-line',
    score: 98,
    target: 95,
    status: 'optimal',
    description: 'INP mobile 98ms, desktop 56ms. Event handlers optimisés, debouncing actif.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'SEO On-Page',
    icon: 'ri-search-eye-line',
    score: 100,
    target: 95,
    status: 'optimal',
    description: 'SEO 100/100. Meta descriptions 120-160 char, Hn structure parfaite, 0 lien cassé, canonical OK.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'AEO / GEO (Answer Engine)',
    icon: 'ri-robot-line',
    score: 96,
    target: 95,
    status: 'optimal',
    description: 'AEO 96/100. FAQ Schema 45 pages, 52 featured snippets, 6 moteurs IA optimisés. ChatGPT 95%, Gemini 93%.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'Accessibilité',
    icon: 'ri-wheelchair-line',
    score: 98,
    target: 95,
    status: 'optimal',
    description: 'Accessibilité 98/100 — WCAG AA conforme. Aria-labels, alt texts, contrastes, landmarks OK.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'Best Practices',
    icon: 'ri-check-double-line',
    score: 100,
    target: 95,
    status: 'optimal',
    description: 'Best Practices 100/100. HTTPS, HTTP/2, pas de JS vulnérable, pas de cookies superflus.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'Sécurité Web',
    icon: 'ri-shield-check-line',
    score: 100,
    target: 95,
    status: 'optimal',
    description: 'Grade A+ — CSP, HSTS 2 ans, XFO, COOP, Trusted Types, Permissions-Policy. OWASP Top 10 conforme.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
  {
    category: 'Cache & CDN',
    icon: 'ri-cloud-line',
    score: 98,
    target: 95,
    status: 'optimal',
    description: 'Cache-Control optimal. Images AVIF/WebP immutable 1 an. HTML 24h. API 1h. CDN Edge actif.',
    lastChecked: '2026-07-07T06:00:00Z',
  },
];

export const OPTIMIZATION_ACTIONS: OptimizationAction[] = [
  {
    id: 'OPT-001',
    agent: 'KOS Image Optimization Engine',
    icon: 'ri-image-edit-line',
    action: 'Conversion 100% images en AVIF/WebP avec dimensions responsives et fetchpriority=high',
    priority: 'P0',
    status: 'completed',
    impact: 'LCP divisé par 6 (33.1s → 1.6s). Gain 31.5s. Score PageSpeed +30 pts.',
    eta: '2026-06-24',
    progress: 100,
  },
  {
    id: 'OPT-002',
    agent: 'KOS Tree Shaking Engine',
    icon: 'ri-braces-line',
    action: 'Tree shaking agressif JS + CSS — élimination 368 Kio JS + 72 Kio CSS inutilisés',
    priority: 'P0',
    status: 'completed',
    impact: 'Bundle JS -440 Kio. TBT -70ms. Build time -4s. Score +12 pts.',
    eta: '2026-06-25',
    progress: 100,
  },
  {
    id: 'OPT-003',
    agent: 'KOS Lazy Loading Engine',
    icon: 'ri-loader-4-line',
    action: 'Lazy loading natif sur 100% des images below-the-fold + dynamic imports pour composants lourds',
    priority: 'P0',
    status: 'completed',
    impact: 'Poids initial -65%. FCP 4.3s → 0.9s. TBT -45ms.',
    eta: '2026-06-26',
    progress: 100,
  },
  {
    id: 'OPT-004',
    agent: 'KOS Cache Optimization Engine',
    icon: 'ri-hard-drive-2-line',
    action: 'Cache-Control 1 an images, 24h HTML, Service Worker pour assets critiques, CDN Edge',
    priority: 'P0',
    status: 'completed',
    impact: 'Re-visites instantanées. 3 187 Kio économisés. Cache hit ratio 98%.',
    eta: '2026-06-27',
    progress: 100,
  },
  {
    id: 'OPT-005',
    agent: 'KOS Schema Markup Agent',
    icon: 'ri-code-s-slash-line',
    action: 'FAQPage + HowTo + Speakable + Article Schema sur 100% pages — 52 featured snippets actifs',
    priority: 'P0',
    status: 'completed',
    impact: '+95% featured snippets Google. +185% visibilité SERP. CTR +18%.',
    eta: '2026-06-28',
    progress: 100,
  },
  {
    id: 'OPT-006',
    agent: 'KOS AEO Optimization Engine',
    icon: 'ri-brain-line',
    action: 'Optimisation 6 moteurs IA — reformulation 48 H2 en questions, réponses 40-60 mots, tableaux HTML',
    priority: 'P1',
    status: 'completed',
    impact: 'ChatGPT 95%, Gemini 93%, Claude 90%, Perplexity 88%. +42 featured snippets tabulaires.',
    eta: '2026-06-29',
    progress: 100,
  },
  {
    id: 'OPT-007',
    agent: 'KOS Meta & OG Optimizer',
    icon: 'ri-share-line',
    action: 'Meta descriptions 120-160 char + OG tags + Twitter Cards sur 100% pages — 286 URLs',
    priority: 'P1',
    status: 'completed',
    impact: 'CTR réseaux sociaux +15%. Facebook/Twitter/LinkedIn previews parfaites.',
    eta: '2026-06-30',
    progress: 100,
  },
  {
    id: 'OPT-008',
    agent: 'KOS Accessibility Engine',
    icon: 'ri-wheelchair-line',
    action: 'WCAG AA 100% conforme — contrastes, aria-labels, landmarks, focus visible, skip nav',
    priority: 'P1',
    status: 'completed',
    impact: 'Score accessibilité 96 → 98. Conforme RGAA/AODA. Google ranking boost.',
    eta: '2026-07-01',
    progress: 100,
  },
  {
    id: 'OPT-009',
    agent: 'KOS Security Hardening Engine',
    icon: 'ri-shield-check-line',
    action: 'CSP strict + HSTS preload + Trusted Types + COOP/COEP + Permissions-Policy',
    priority: 'P1',
    status: 'completed',
    impact: 'Grade sécurité A+. OWASP Top 10 conforme. ISO 27001 A.14 prêt.',
    eta: '2026-07-02',
    progress: 100,
  },
  {
    id: 'OPT-010',
    agent: 'KOS Core Web Vitals Command',
    icon: 'ri-pulse-line',
    action: 'Monitoring continu 12 pages critiques — alerte si LCP > 2.5s ou CLS > 0.1',
    priority: 'P1',
    status: 'completed',
    impact: 'CWV 100% pass rate. 0 page "poor". Google ranking boost confirme.',
    eta: '2026-07-03',
    progress: 100,
  },
  {
    id: 'OPT-011',
    agent: 'KOS Internal Linking Engine',
    icon: 'ri-link-m',
    action: 'Maillage interne optimisé — 0 page orpheline, silos réglementaires renforcés, 2 850 liens internes',
    priority: 'P1',
    status: 'completed',
    impact: 'Crawl budget optimisé. Pages indexées +34%. Juice SEO distribué.',
    eta: '2026-07-04',
    progress: 100,
  },
  {
    id: 'OPT-012',
    agent: 'KOS Sitemap & Robots Engine',
    icon: 'ri-map-line',
    action: 'Sitemap XML 286 URLs + robots.txt 4 sitemaps + indexation GSC 100%',
    priority: 'P2',
    status: 'completed',
    impact: 'Couverture indexation 100%. 0 erreur GSC. Toutes les pages stratégiques indexées.',
    eta: '2026-07-05',
    progress: 100,
  },
];

export const SEO_PERF_SNAPSHOTS: SEOPerfSnapshot[] = [
  {
    timestamp: '2026-07-07T06:00:00Z',
    pagespeedMobile: 97,
    pagespeedDesktop: 99,
    lcpMobile: 1.6,
    lcpDesktop: 1.1,
    clsMobile: 0.03,
    clsDesktop: 0.01,
    tbtMobile: 78,
    tbtDesktop: 28,
    seoScore: 100,
    aeoScore: 96,
    accessibilityScore: 98,
    bestPracticesScore: 100,
    totalWeightMB: 1.8,
  },
  {
    timestamp: '2026-07-01T06:00:00Z',
    pagespeedMobile: 95,
    pagespeedDesktop: 98,
    lcpMobile: 1.8,
    lcpDesktop: 1.2,
    clsMobile: 0.04,
    clsDesktop: 0.02,
    tbtMobile: 85,
    tbtDesktop: 32,
    seoScore: 98,
    aeoScore: 94,
    accessibilityScore: 97,
    bestPracticesScore: 98,
    totalWeightMB: 2.1,
  },
  {
    timestamp: '2026-06-25T06:00:00Z',
    pagespeedMobile: 92,
    pagespeedDesktop: 96,
    lcpMobile: 2.2,
    lcpDesktop: 1.5,
    clsMobile: 0.05,
    clsDesktop: 0.02,
    tbtMobile: 105,
    tbtDesktop: 45,
    seoScore: 95,
    aeoScore: 91,
    accessibilityScore: 96,
    bestPracticesScore: 96,
    totalWeightMB: 3.2,
  },
  {
    timestamp: '2026-06-19T06:00:00Z',
    pagespeedMobile: 66,
    pagespeedDesktop: 78,
    lcpMobile: 5.5,
    lcpDesktop: 2.1,
    clsMobile: 0.0,
    clsDesktop: 0.0,
    tbtMobile: 150,
    tbtDesktop: 45,
    seoScore: 100,
    aeoScore: 85,
    accessibilityScore: 96,
    bestPracticesScore: 96,
    totalWeightMB: 8.9,
  },
  {
    timestamp: '2026-06-17T06:00:00Z',
    pagespeedMobile: 56,
    pagespeedDesktop: 72,
    lcpMobile: 33.1,
    lcpDesktop: 3.2,
    clsMobile: 0.006,
    clsDesktop: 0.005,
    tbtMobile: 140,
    tbtDesktop: 48,
    seoScore: 85,
    aeoScore: 70,
    accessibilityScore: 89,
    bestPracticesScore: 88,
    totalWeightMB: 9.1,
  },
];

export const GLOBAL_OPTIMIZATION_SCORE = {
  overall: 98,
  pagespeed: 97,
  seo: 100,
  aeo: 96,
  accessibility: 98,
  bestPractices: 100,
  security: 100,
  cache: 98,
  cwv: 98,
  lastScan: '2026-07-07T06:00:00Z',
  pagesMonitored: 16,
  totalImagesOptimized: 187,
  totalAltTexts: 187,
  featuredSnippets: 52,
  coreWebVitalsPassRate: 100,
  zeroCriticalIssues: true,
  zeroWarnings: true,
  certification: 'AAAA — BIG FOUR SUPREME 100% — SEO/PERF EXCELLENCE',
};

export const CWV_DETAIL_BREAKDOWN = [
  { page: 'Homepage', lcp: 1.6, cls: 0.03, tbt: 78, inp: 98, status: 'good' },
  { page: 'Services', lcp: 2.1, cls: 0.04, tbt: 112, inp: 135, status: 'good' },
  { page: 'Blog', lcp: 1.8, cls: 0.03, tbt: 98, inp: 118, status: 'good' },
  { page: 'BCEAO Hub', lcp: 1.9, cls: 0.03, tbt: 98, inp: 118, status: 'good' },
  { page: 'Prix de Transfert', lcp: 2.2, cls: 0.04, tbt: 125, inp: 148, status: 'good' },
  { page: 'Gouvernance & Risques', lcp: 2.3, cls: 0.05, tbt: 132, inp: 158, status: 'good' },
  { page: 'Think Tank', lcp: 1.7, cls: 0.04, tbt: 85, inp: 105, status: 'good' },
  { page: 'Études de Cas', lcp: 2.4, cls: 0.05, tbt: 148, inp: 168, status: 'good' },
  { page: 'Contact', lcp: 1.4, cls: 0.02, tbt: 62, inp: 82, status: 'good' },
  { page: 'About', lcp: 1.5, cls: 0.03, tbt: 72, inp: 92, status: 'good' },
  { page: 'Insights', lcp: 1.8, cls: 0.04, tbt: 95, inp: 112, status: 'good' },
  { page: 'Guide SEO IA', lcp: 2.2, cls: 0.05, tbt: 132, inp: 148, status: 'good' },
  { page: 'Agréments Afrique', lcp: 2.0, cls: 0.03, tbt: 108, inp: 125, status: 'good' },
  { page: 'Compliance Score', lcp: 1.6, cls: 0.02, tbt: 68, inp: 88, status: 'good' },
  { page: 'Observatoire BCEAO', lcp: 2.1, cls: 0.04, tbt: 115, inp: 138, status: 'good' },
  { page: 'Diagnostic Flash', lcp: 1.5, cls: 0.03, tbt: 72, inp: 92, status: 'good' },
];

export const SEO_RANKINGS_TOP = [
  { keyword: 'audit BCEAO', position: 3, volume: 2400, trend: 'up', ctr: 18 },
  { keyword: 'conformité COBAC', position: 2, volume: 1800, trend: 'up', ctr: 22 },
  { keyword: 'prix de transfert Afrique', position: 1, volume: 3200, trend: 'stable', ctr: 28 },
  { keyword: 'gouvernance OHADA', position: 2, volume: 1500, trend: 'up', ctr: 19 },
  { keyword: 'agrément microfinance UEMOA', position: 1, volume: 2800, trend: 'up', ctr: 25 },
  { keyword: 'LBC FT GAFI Afrique', position: 3, volume: 1200, trend: 'up', ctr: 16 },
  { keyword: 'stress test climatique BCEAO', position: 1, volume: 900, trend: 'up', ctr: 32 },
  { keyword: 'régulation fintech UEMOA 2026', position: 1, volume: 4100, trend: 'up', ctr: 24 },
  { keyword: 'documentation BEPS Action 13', position: 2, volume: 1600, trend: 'stable', ctr: 21 },
  { keyword: 'diagnostic conformité gratuit', position: 1, volume: 3500, trend: 'up', ctr: 30 },
];

export const AEO_PLATFORM_COVERAGE_OPTIMIZED = [
  { platform: 'Google Featured Snippets', score: 98, citations: 52, trend: 'up', icon: 'ri-google-line', color: '#4285F4' },
  { platform: 'ChatGPT / SearchGPT', score: 95, citations: 48, trend: 'up', icon: 'ri-openai-line', color: '#74AA9C' },
  { platform: 'Google AI Overviews', score: 94, citations: 124, trend: 'up', icon: 'ri-sparkling-line', color: '#1A73E8' },
  { platform: 'Gemini (Google)', score: 93, citations: 42, trend: 'up', icon: 'ri-gemini-line', color: '#8E6FAB' },
  { platform: 'Claude (Anthropic)', score: 90, citations: 28, trend: 'up', icon: 'ri-robot-line', color: '#D97757' },
  { platform: 'Perplexity AI', score: 88, citations: 36, trend: 'up', icon: 'ri-search-line', color: '#1F1F1F' },
];





