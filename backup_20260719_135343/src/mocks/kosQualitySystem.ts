export interface agentKPI {
  label: string;
  current: string;
  target: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
}

export interface detectedError {
  id: string;
  severity: 'critical' | 'major' | 'minor';
  description: string;
  location: string;
  detectedAt: string;
  status: 'open' | 'fixed' | 'in_progress';
}

export interface correctiveAction {
  id: string;
  description: string;
  agent: string;
  status: 'pending' | 'done' | 'in_progress';
  priority: 'critical' | 'major' | 'minor';
  autoApplied: boolean;
}

export interface agent {
  id: string;
  number: string;
  name: string;
  mission: string;
  icon: string;
  color: string;
  status: 'active' | 'partial' | 'gap';
  score: number;
  lastScan: string;
  kpis: agentKPI[];
  errors: detectedError[];
  actions: correctiveAction[];
}

export interface globalReport {
  generatedAt: string;
  globalScore: number;
  targetScore: number;
  totalErrors: number;
  criticalErrors: number;
  majorErrors: number;
  minorErrors: number;
  errorsFixed: number;
  linksScanned: number;
  linksValid: number;
  linksBroken: number;
  pagesIndexed: number;
  pagesTarget: number;
  coreWebVitals: {
    lcp: { value: string; target: string; status: 'pass' | 'warn' | 'fail' };
    cls: { value: string; target: string; status: 'pass' | 'warn' | 'fail' };
    inp: { value: string; target: string; status: 'pass' | 'warn' | 'fail' };
  };
  contentQualityScore: number;
  legalRisksDetected: number;
  socialLinksValid: number;
  socialLinksTotal: number;
}

export const KOS_GLOBAL_REPORT: globalReport = {
  generatedAt: '2026-06-13T06:15:00Z',
  globalScore: 9.8,
  targetScore: 9.5,
  totalErrors: 2,
  criticalErrors: 0,
  majorErrors: 0,
  minorErrors: 2,
  errorsFixed: 49,
  linksScanned: 2468,
  linksValid: 2468,
  linksBroken: 0,
  pagesIndexed: 208,
  pagesTarget: 300,
  coreWebVitals: {
    lcp: { value: '1.8s', target: '2.5s', status: 'pass' },
    cls: { value: '0.03', target: '0.1', status: 'pass' },
    inp: { value: '118ms', target: '200ms', status: 'pass' },
  },
  contentQualityScore: 9.6,
  legalRisksDetected: 0,
  socialLinksValid: 48,
  socialLinksTotal: 48,
};

export const KOS_AGENTS: agent[] = [
  {
    id: 'url-integrity',
    number: '01',
    name: 'URL Integrity Agent',
    mission: 'Scanner tous les liens internes et externes, détecter 404/500/redirections cassées, corriger automatiquement les URLs internes, proposer redirections 301.',
    icon: 'ri-link',
    color: '#0D7B5F',
    status: 'active',
    score: 9.9,
    lastScan: '2026-06-13T06:00:00Z',
    kpis: [
      { label: 'Liens valides', current: '100', target: '99.5', unit: '%', trend: 'up', icon: 'ri-check-double-line' },
      { label: '404 détectés', current: '0', target: '0', unit: 'erreurs', trend: 'stable', icon: 'ri-error-warning-line' },
      { label: 'Temps correction', current: '0.5', target: '1', unit: 'heures', trend: 'down', icon: 'ri-time-line' },
      { label: 'Redirections 301', current: '25', target: '25', unit: 'actives', trend: 'up', icon: 'ri-share-forward-line' },
    ],
    errors: [
      { id: 'url-err-1', severity: 'critical', description: 'Lien cassé vers /ancien-service-conseil — 404 détecté depuis 14 jours', location: 'Footer > Services', detectedAt: '2026-05-29T10:15:00Z', status: 'fixed' },
      { id: 'url-err-2', severity: 'major', description: 'Redirection chaînée /blog → /insights → /blog (boucle)', location: 'Navigation principale', detectedAt: '2026-06-08T14:22:00Z', status: 'fixed' },
      { id: 'url-err-3', severity: 'major', description: '12 liens externes vers sites .gouv en timeout (5s+)', location: 'Pages réglementaires', detectedAt: '2026-06-10T09:00:00Z', status: 'fixed' },
      { id: 'url-err-4', severity: 'minor', description: 'URLs avec paramètres UTM en double dans 8 articles blog', location: 'Blog > Articles', detectedAt: '2026-06-11T16:45:00Z', status: 'fixed' },
      { id: 'url-err-5', severity: 'minor', description: 'URLs sitemap pointaient vers example.com au lieu de khepraexperts.com', location: 'Sitemap > 241 URLs', detectedAt: '2026-06-12T13:00:00Z', status: 'fixed' },
      { id: 'url-err-6', severity: 'minor', description: 'Lien externe lent (3.2s) vers banque-centrale.bf — à monitorer', location: 'Page BCEAO > Références', detectedAt: '2026-06-13T06:02:00Z', status: 'open' },
    ],
    actions: [
      { id: 'url-act-1', description: 'Configurer redirections 301 pour les 18 URLs obsolètes identifiées', agent: 'URL Integrity Agent', status: 'done', priority: 'critical', autoApplied: false },
      { id: 'url-act-2', description: 'Corriger la boucle de redirection Navigation → Blog', agent: 'URL Integrity Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'url-act-3', description: 'Remplacer liens externes timeout par versions archivées', agent: 'URL Integrity Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'url-act-4', description: 'Corriger les 241 URLs sitemap example.com → khepraexperts.com (correction auto)', agent: 'URL Integrity Agent', status: 'done', priority: 'critical', autoApplied: true },
    ],
  },
  {
    id: 'seo-indexing',
    number: '02',
    name: 'SEO & Indexing Compliance Agent',
    mission: 'Vérifier robots.txt, analyser sitemap.xml, contrôler indexation Google Search Console, détecter pages non indexables, optimiser balisage sémantique.',
    icon: 'ri-search-eye-line',
    color: '#9B7B2C',
    status: 'active',
    score: 9.6,
    lastScan: '2026-06-13T06:05:00Z',
    kpis: [
      { label: 'Pages indexées', current: '208', target: '300', unit: 'pages', trend: 'up', icon: 'ri-global-line' },
      { label: 'Erreurs exploration', current: '0', target: '0', unit: 'erreurs', trend: 'stable', icon: 'ri-bug-line' },
      { label: 'Couverture SEO', current: '95', target: '95', unit: '%', trend: 'up', icon: 'ri-radar-line' },
      { label: 'Pages orphelines', current: '0', target: '0', unit: 'pages', trend: 'stable', icon: 'ri-link-unlink' },
    ],
    errors: [
      { id: 'seo-err-1', severity: 'critical', description: '12 pages orphelines sans lien interne entrant — non indexables', location: 'Anciennes landing pages', detectedAt: '2026-06-05T08:00:00Z', status: 'fixed' },
      { id: 'seo-err-2', severity: 'major', description: '8 articles avec meta description > 160 caractères', location: 'Blog', detectedAt: '2026-06-08T10:00:00Z', status: 'fixed' },
      { id: 'seo-err-3', severity: 'major', description: '15 pages sans balise canonical', location: 'Pages outils + services', detectedAt: '2026-06-09T12:00:00Z', status: 'fixed' },
      { id: 'seo-err-4', severity: 'minor', description: '5 images sans attribut alt dans les articles récents', location: 'Blog > Articles Sprint 2', detectedAt: '2026-06-11T09:00:00Z', status: 'fixed' },
      { id: 'seo-err-5', severity: 'minor', description: 'sitemap.xml — URLs non canoniques (example.com)', location: 'Sitemap', detectedAt: '2026-06-10T15:00:00Z', status: 'fixed' },
      { id: 'seo-err-6', severity: 'minor', description: '2 articles récents avec balise H1 > 70 caractères', location: 'Blog > Sprint 2', detectedAt: '2026-06-13T06:06:00Z', status: 'open' },
    ],
    actions: [
      { id: 'seo-act-1', description: 'Ajouter liens internes vers les 12 pages orphelines', agent: 'SEO & Indexing Agent', status: 'done', priority: 'critical', autoApplied: false },
      { id: 'seo-act-2', description: 'Optimiser meta descriptions des 8 articles hors limite', agent: 'SEO & Indexing Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'seo-act-3', description: 'Ajouter balises canonical sur les 15 pages manquantes', agent: 'SEO & Indexing Agent', status: 'done', priority: 'major', autoApplied: false },
    ],
  },
  {
    id: 'core-web-vitals',
    number: '03',
    name: 'Core Web Vitals Optimization Agent',
    mission: 'Analyser LCP, CLS, INP, détecter scripts bloquants, optimiser performance front-end, proposer corrections techniques, monitorer temps de chargement.',
    icon: 'ri-speed-up-line',
    color: '#C05A3A',
    status: 'active',
    score: 9.6,
    lastScan: '2026-06-13T06:08:00Z',
    kpis: [
      { label: 'Score PageSpeed', current: '96', target: '95', unit: '/100', trend: 'up', icon: 'ri-flashlight-line' },
      { label: 'LCP', current: '1.8', target: '2.5', unit: 'secondes', trend: 'down', icon: 'ri-timer-line' },
      { label: 'CLS', current: '0.03', target: '0.1', unit: '', trend: 'down', icon: 'ri-layout-line' },
      { label: 'Temps réponse', current: '175', target: '200', unit: 'ms', trend: 'down', icon: 'ri-server-line' },
    ],
    errors: [
      { id: 'cwv-err-1', severity: 'major', description: 'LCP à 2.8s — image Hero 1.2MB non optimisée pour mobile', location: 'Homepage > Hero', detectedAt: '2026-06-08T08:00:00Z', status: 'fixed' },
      { id: 'cwv-err-2', severity: 'major', description: 'TBT 450ms sur page /tools — 3 scripts analytics bloquants', location: 'Page Tools', detectedAt: '2026-06-09T10:00:00Z', status: 'fixed' },
      { id: 'cwv-err-3', severity: 'minor', description: '5 polices Google Fonts chargées — 2 non utilisées', location: 'Global', detectedAt: '2026-06-10T14:00:00Z', status: 'fixed' },
      { id: 'cwv-err-4', severity: 'minor', description: 'Cache-Control manquant sur 8 assets statiques', location: 'public/images', detectedAt: '2026-06-11T09:00:00Z', status: 'fixed' },
    ],
    actions: [
      { id: 'cwv-act-1', description: 'Compresser image Hero (WebP, responsive srcSet)', agent: 'Core Web Vitals Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'cwv-act-2', description: 'Defer scripts analytics non-critiques', agent: 'Core Web Vitals Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'cwv-act-3', description: 'Supprimer 2 polices Google Fonts inutilisées (correction auto)', agent: 'Core Web Vitals Agent', status: 'done', priority: 'minor', autoApplied: true },
    ],
  },
  {
    id: 'content-quality',
    number: '04',
    name: 'Content Quality & Grammar Compliance Agent',
    mission: 'Corriger fautes grammaticales, détecter incohérences éditoriales, supprimer contenu non professionnel, harmoniser ton institutionnel, scorer chaque contenu.',
    icon: 'ri-quill-pen-line',
    color: '#6B4A3A',
    status: 'active',
    score: 9.6,
    lastScan: '2026-06-13T06:10:00Z',
    kpis: [
      { label: 'Score qualité', current: '9.6', target: '9.5', unit: '/10', trend: 'up', icon: 'ri-file-check-line' },
      { label: 'Erreurs gramma.', current: '0', target: '0', unit: 'erreurs', trend: 'stable', icon: 'ri-edit-line' },
      { label: 'Contenus scorés', current: '122', target: '120', unit: 'contenus', trend: 'up', icon: 'ri-file-list-line' },
      { label: 'Ton conforme', current: '100', target: '100', unit: '%', trend: 'stable', icon: 'ri-contrast-2-line' },
    ],
    errors: [
      { id: 'cq-err-1', severity: 'critical', description: 'Article prix-transfert : ton trop académique, 0 insight actionnable', location: 'Blog > Prix de Transfert', detectedAt: '2026-06-05T09:00:00Z', status: 'fixed' },
      { id: 'cq-err-2', severity: 'major', description: '12 coquilles orthographiques dans les 3 derniers articles', location: 'Blog > Sprint 2', detectedAt: '2026-06-08T11:00:00Z', status: 'fixed' },
      { id: 'cq-err-3', severity: 'major', description: '5 articles utilisent le terme "révolutionnaire" (interdit Big Four)', location: 'Blog > Articles piliers', detectedAt: '2026-06-09T14:00:00Z', status: 'fixed' },
      { id: 'cq-err-4', severity: 'minor', description: 'Incohérence : alternance "KHEPRA EXPERTS" / "Khepra Experts"', location: 'Global', detectedAt: '2026-06-10T16:00:00Z', status: 'fixed' },
      { id: 'cq-err-5', severity: 'minor', description: 'Article "Due Diligence PME" — ton trop conversationnel, 3 passages à reformaliser', location: 'Blog > Due Diligence PME', detectedAt: '2026-06-13T06:11:00Z', status: 'open' },
    ],
    actions: [
      { id: 'cq-act-1', description: 'Restructurer article prix-transfert avec POV + framework KHEPRA Transfer Pricing Risk Matrix™', agent: 'Content Quality Agent', status: 'done', priority: 'critical', autoApplied: false },
      { id: 'cq-act-2', description: 'Remplacer "révolutionnaire" par des alternatives conformes (correction auto)', agent: 'Content Quality Agent', status: 'done', priority: 'major', autoApplied: true },
      { id: 'cq-act-3', description: 'Uniformiser branding "KHEPRA EXPERTS" sur tous les contenus', agent: 'Content Quality Agent', status: 'done', priority: 'minor', autoApplied: true },
    ],
  },
  {
    id: 'legal-compliance',
    number: '05',
    name: 'Legal & Brand Compliance Agent',
    mission: 'Détecter usage non autorisé de marques, vérifier absence de fausses affirmations, supprimer promesses non vérifiables, garantir neutralité juridique.',
    icon: 'ri-scales-line',
    color: '#8B3040',
    status: 'active',
    score: 10.0,
    lastScan: '2026-06-13T06:12:00Z',
    kpis: [
      { label: 'Conformité légale', current: '100', target: '100', unit: '%', trend: 'up', icon: 'ri-shield-check-line' },
      { label: 'Contenus à risque', current: '0', target: '0', unit: 'contenus', trend: 'stable', icon: 'ri-error-warning-line' },
      { label: 'Fausses claims', current: '0', target: '0', unit: 'détectées', trend: 'stable', icon: 'ri-forbid-line' },
      { label: 'Marques protégées', current: '0', target: '0', unit: 'violations', trend: 'stable', icon: 'ri-trademark-line' },
    ],
    errors: [
      { id: 'legal-err-1', severity: 'critical', description: 'Mention "partenaire Deloitte" dans ancien article — fausse affiliation', location: 'Blog > Article 2019 archivé', detectedAt: '2026-06-03T08:00:00Z', status: 'fixed' },
      { id: 'legal-err-2', severity: 'major', description: 'Claim "100% de réussite" sans donnée vérifiable — 3 pages', location: 'Landing pages services', detectedAt: '2026-06-07T10:00:00Z', status: 'fixed' },
      { id: 'legal-err-3', severity: 'minor', description: 'Mention "certifié ISO 9001" sans numéro de certificat', location: 'Page À propos', detectedAt: '2026-06-09T11:00:00Z', status: 'fixed' },
    ],
    actions: [
      { id: 'legal-act-1', description: 'Supprimer référence "partenaire Deloitte" (correction auto)', agent: 'Legal Compliance Agent', status: 'done', priority: 'critical', autoApplied: true },
      { id: 'legal-act-2', description: 'Remplacer "100% de réussite" par données vérifiables', agent: 'Legal Compliance Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'legal-act-3', description: 'Ajouter numéro certificat ISO ou supprimer la mention', agent: 'Legal Compliance Agent', status: 'done', priority: 'minor', autoApplied: false },
    ],
  },
  {
    id: 'reputation-social',
    number: '06',
    name: 'Reputation & Social Link Integrity Agent',
    mission: 'Analyser liens partagés sur réseaux sociaux, vérifier cohérence URLs, éviter liens cassés ou obsolètes, assurer cohérence branding cross-platform.',
    icon: 'ri-share-circle-line',
    color: '#5B8C2A',
    status: 'active',
    score: 10.0,
    lastScan: '2026-06-13T06:10:00Z',
    kpis: [
      { label: 'Liens sociaux valides', current: '100', target: '100', unit: '%', trend: 'up', icon: 'ri-check-double-line' },
      { label: 'Cohérence branding', current: '100', target: '100', unit: '%', trend: 'up', icon: 'ri-palette-line' },
      { label: 'OG images valides', current: '50', target: '50', unit: 'pages', trend: 'up', icon: 'ri-image-line' },
      { label: 'Profils actifs', current: '4', target: '4', unit: '/4', trend: 'stable', icon: 'ri-user-shared-line' },
    ],
    errors: [
      { id: 'rep-err-1', severity: 'major', description: '6 articles partagent URL canonique incorrecte sur LinkedIn', location: 'LinkedIn > Articles partagés', detectedAt: '2026-06-06T12:00:00Z', status: 'fixed' },
      { id: 'rep-err-2', severity: 'major', description: 'OG image manquante sur 15 pages de services', location: 'Pages services', detectedAt: '2026-06-08T09:00:00Z', status: 'fixed' },
      { id: 'rep-err-3', severity: 'minor', description: 'Logo KHEPRA pixellisé sur preview Facebook (ancienne version)', location: 'Facebook > Link preview', detectedAt: '2026-06-10T08:00:00Z', status: 'fixed' },
      { id: 'rep-err-4', severity: 'minor', description: 'Description LinkedIn page entreprise non mise à jour depuis 90 jours', location: 'LinkedIn Company Page', detectedAt: '2026-06-11T15:00:00Z', status: 'fixed' },
    ],
    actions: [
      { id: 'rep-act-1', description: 'Mettre à jour URLs canoniques sur les 6 posts LinkedIn', agent: 'Reputation Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'rep-act-2', description: 'Générer OG images pour les 15 pages services', agent: 'Reputation Agent', status: 'done', priority: 'major', autoApplied: false },
      { id: 'rep-act-3', description: 'Mettre à jour logo Facebook preview (correction auto)', agent: 'Reputation Agent', status: 'done', priority: 'minor', autoApplied: true },
    ],
  },
];

export const SCAN_PHASES = [
  { phase: 1, name: 'Scan Global', description: 'Crawl complet du site — 2 468 liens analysés, 208 pages indexées, 48 assets vérifiés, sitemap & robots.txt validés. +18 URLs vs scan précédent.', icon: 'ri-radar-line', color: '#0D7B5F', duration: '11 min', status: 'completed' },
  { phase: 2, name: 'Détection Erreurs', description: 'Classification automatique — 0 critique, 0 majeure, 2 mineures résiduelles. Lien externe lent BCEAO + 2 H1 longs blog. Tendance : AMÉLIORATION.', icon: 'ri-search-eye-line', color: '#c2410c', duration: '2 min', status: 'completed' },
  { phase: 3, name: 'Correction Auto', description: '49 erreurs totales résolues depuis le début du monitoring. Les 2 mineures détectées aujourd\'hui sont en file d\'attente (non bloquantes).', icon: 'ri-tools-line', color: '#e8c547', duration: 'En attente', status: 'in_progress' },
  { phase: 4, name: 'Validation Qualité', description: 'Re-scan post-correction validé — conformité standards Big Four maintenue. Score 9.8/10. CWV en amélioration (LCP 1.8s, CLS 0.03).', icon: 'ri-shield-check-line', color: '#9B7B2C', duration: 'Validé', status: 'completed' },
  { phase: 5, name: 'Reporting', description: 'Rapport KPI généré — dashboard exécutif mis à jour. Zéro problème technique. 2 recommandations cosmétiques mineures.', icon: 'ri-file-chart-line', color: '#86BC25', duration: 'Généré', status: 'completed' },
];

export const REPORT_SECTIONS = [
  { id: 'global', title: 'Rapport Global de Santé — 13 Juin 2026', icon: 'ri-heart-pulse-line', description: 'Score 9.8/10 — maintenu vs 12 Juin. 0 critique, 0 majeure. 2 mineures (lien BCEAO lent + 2 H1 longs). LCP 1.8s (-0.1s), CLS 0.03, INP 118ms. Tendance : STABLE EXCELLENT.' },
  { id: 'critical', title: 'Erreurs — Scan du 13 Juin', icon: 'ri-check-double-line', description: '0 erreur critique. 0 erreur majeure. 2 erreurs mineures (cosmétiques, non bloquantes). 49 erreurs totales résolues depuis le lancement du monitoring. 208 pages indexées (+3 vs 12 Juin).' },
  { id: 'corrective', title: 'Actions Correctives — Suivi', icon: 'ri-check-line', description: '18 actions planifiées depuis le début — 18 exécutées. 2 nouvelles actions mineures en file d\'attente. Sitemap, robots.txt, Core Web Vitals, SEO, contenu, légal, réputation : TOUT maintenu au vert.' },
  { id: 'technical', title: 'Plan Technique — 100% OK', icon: 'ri-cpu-line', description: 'LCP 1.8s (cible <2.5s, -0.1s vs hier). CLS 0.03 (cible <0.1). INP 118ms (cible <200ms). PageSpeed 96/100. Brotli + Gzip. 120+ routes lazy loading. Amélioration continue des métriques.' },
  { id: 'seo-plan', title: 'Plan SEO — 100% OK', icon: 'ri-search-line', description: '208 pages indexées (+3). 0 page orpheline. Sitemap valide. Robots.txt optimisé. 2 H1 à raccourcir (<70 car.). Canonical OK. Meta descriptions validées. AI crawlers allowlist.' },
  { id: 'compliance-plan', title: 'Plan Conformité — 100% OK', icon: 'ri-shield-check-line', description: '0 contenu à risque. Branding uniformisé. Aucune fausse claim. Références réglementaires vérifiées. RGPD, cookies, mentions légales conformes. ZÉRO biais. Scan juridique clean.' },
];



