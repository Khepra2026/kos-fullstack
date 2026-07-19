export interface deploymentEngine {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  status: 'deployed' | 'partial' | 'offline' | 'mock';
  version: string;
  lastDeployed: string;
  scanFrequency: string;
  coverage: number;
  score: number;
  targetScore: number;
  kpis: { label: string; current: string; target: string; icon: string; trend: 'up' | 'down' | 'stable' }[];
  monitors: { label: string; status: 'pass' | 'warn' | 'fail' | 'pending'; lastCheck: string; icon: string }[];
  recentScans: { date: string; score: number; type: string }[];
  path: string;
}

export interface complianceStandard {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  currentScore: number;
  targetScore: number;
  controls: { label: string; status: 'pass' | 'warn' | 'fail'; description: string; evidence: string }[];
  lastAudit: string;
}

export interface qualityGate {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  threshold: number;
  currentScore: number;
  status: 'active' | 'disabled' | 'error';
  recentBlocks: { date: string; reason: string; content: string }[];
  isAutomatic: boolean;
}

export interface deploymentPipeline {
  stage: number;
  name: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending' | 'failed';
  icon: string;
  color: string;
  duration: string;
  completedAt: string | null;
}

export const KOS_ENGINES_DEPLOYED: deploymentEngine[] = [
  {
    id: 'quality-system',
    name: 'Quality & Compliance System',
    shortName: 'Quality',
    description: '6 agents autonomes : URL Integrity, SEO Indexing, Core Web Vitals, Content Quality, Legal Compliance, Reputation.',
    icon: 'ri-shield-check-line',
    color: '#86BC25',
    status: 'deployed',
    version: 'v2.4.1',
    lastDeployed: '2026-06-13T03:00:00Z',
    scanFrequency: 'Toutes les 24h',
    coverage: 100,
    score: 9.8,
    targetScore: 9.5,
    kpis: [
      { label: 'URLs scannées', current: '241', target: '241', icon: 'ri-link', trend: 'stable' },
      { label: 'Liens cassés', current: '0', target: '0', icon: 'ri-link-unlink', trend: 'stable' },
      { label: 'Pages indexées', current: '205', target: '241', icon: 'ri-global-line', trend: 'up' },
      { label: 'Score contenu', current: '9.6', target: '9.5', icon: 'ri-quill-pen-line', trend: 'up' },
      { label: 'Risques légaux', current: '0', target: '0', icon: 'ri-scales-line', trend: 'stable' },
      { label: 'Liens sociaux', current: '48/48', target: '48/48', icon: 'ri-share-circle-line', trend: 'stable' },
    ],
    monitors: [
      { label: 'URL Integrity', status: 'pass', lastCheck: '2026-06-13T03:01:00Z', icon: 'ri-link' },
      { label: 'SEO Indexing', status: 'pass', lastCheck: '2026-06-13T03:02:00Z', icon: 'ri-global-line' },
      { label: 'Core Web Vitals', status: 'pass', lastCheck: '2026-06-13T03:00:00Z', icon: 'ri-speed-up-line' },
      { label: 'Content Quality', status: 'pass', lastCheck: '2026-06-13T03:03:00Z', icon: 'ri-quill-pen-line' },
      { label: 'Legal Compliance', status: 'pass', lastCheck: '2026-06-13T03:04:00Z', icon: 'ri-scales-line' },
      { label: 'Reputation', status: 'pass', lastCheck: '2026-06-13T03:05:00Z', icon: 'ri-share-circle-line' },
    ],
    recentScans: [
      { date: '2026-06-13', score: 9.8, type: 'Complet' },
      { date: '2026-06-12', score: 9.7, type: 'Complet' },
      { date: '2026-06-11', score: 9.6, type: 'Complet' },
      { date: '2026-06-10', score: 9.5, type: 'Complet' },
      { date: '2026-06-09', score: 9.4, type: 'Complet' },
    ],
    path: '/kos-autonomous-quality-system',
  },
  {
    id: 'content-correction',
    name: 'Content Correction Engine',
    shortName: 'Content',
    description: 'Audit qualité Big Four, restructuration intellectuelle, frameworks propriétaires, optimisation conversion.',
    icon: 'ri-quill-pen-line',
    color: '#0D7B5F',
    status: 'partial',
    version: 'v1.8.0',
    lastDeployed: '2026-06-12T18:00:00Z',
    scanFrequency: 'Sur demande + hebdomadaire',
    coverage: 65,
    score: 7.8,
    targetScore: 9.5,
    kpis: [
      { label: 'Articles audités', current: '6', target: '75', icon: 'ri-article-line', trend: 'up' },
      { label: 'Score moyen contenu', current: '6.8', target: '9.5', icon: 'ri-bar-chart-line', trend: 'up' },
      { label: 'Frameworks propriétaires', current: '5', target: '12', icon: 'ri-trademark-line', trend: 'up' },
      { label: 'CTA optimisés', current: '35%', target: '100%', icon: 'ri-download-2-line', trend: 'up' },
    ],
    monitors: [
      { label: 'Blog Content', status: 'warn', lastCheck: '2026-06-12T18:00:00Z', icon: 'ri-article-line' },
      { label: 'White Papers', status: 'warn', lastCheck: '2026-06-12T18:00:00Z', icon: 'ri-book-2-line' },
      { label: 'Landing Pages', status: 'fail', lastCheck: '2026-06-12T18:00:00Z', icon: 'ri-pages-line' },
      { label: 'Case Studies', status: 'warn', lastCheck: '2026-06-12T18:00:00Z', icon: 'ri-file-text-line' },
    ],
    recentScans: [
      { date: '2026-06-12', score: 7.8, type: 'Audit manuel' },
      { date: '2026-06-10', score: 7.5, type: 'Partiel' },
      { date: '2026-06-05', score: 7.2, type: 'Initial' },
    ],
    path: '/kos-content-correction-engine',
  },
  {
    id: 'corrective-execution',
    name: 'Corrective Execution Engine',
    shortName: 'Execution',
    description: 'Transformation des écarts en actions correctives, roadmap 7/30/90 jours, KPI tracking, priorisation business.',
    icon: 'ri-tools-line',
    color: '#E8C547',
    status: 'partial',
    version: 'v1.5.0',
    lastDeployed: '2026-06-12T20:00:00Z',
    scanFrequency: 'Continue (tracking temps réel)',
    coverage: 40,
    score: 6.8,
    targetScore: 9.5,
    kpis: [
      { label: 'Actions planifiées', current: '8', target: '25', icon: 'ri-list-check', trend: 'stable' },
      { label: 'Actions terminées', current: '2', target: '8', icon: 'ri-check-double-line', trend: 'up' },
      { label: 'Gaps critiques', current: '5', target: '0', icon: 'ri-error-warning-line', trend: 'down' },
      { label: 'Progression roadmap', current: '20%', target: '100%', icon: 'ri-road-map-line', trend: 'up' },
    ],
    monitors: [
      { label: 'Quick Wins J+7', status: 'pending', lastCheck: '2026-06-12T20:00:00Z', icon: 'ri-flashlight-line' },
      { label: 'Build System J+30', status: 'pending', lastCheck: '2026-06-12T20:00:00Z', icon: 'ri-settings-line' },
      { label: 'Scale System J+90', status: 'pending', lastCheck: '2026-06-12T20:00:00Z', icon: 'ri-rocket-line' },
    ],
    recentScans: [
      { date: '2026-06-12', score: 6.8, type: 'Audit' },
      { date: '2026-06-10', score: 6.5, type: 'Audit' },
    ],
    path: '/kos-corrective-execution-engine',
  },
  {
    id: 'cyber-tech',
    name: 'Cyber & Technical Engine',
    shortName: 'CyberSec',
    description: 'Correction des failles techniques, durcissement cybersécurité, alignement ISO 27001 & NIST CSF.',
    icon: 'ri-shield-flash-line',
    color: '#C05A3A',
    status: 'partial',
    version: 'v1.3.0',
    lastDeployed: '2026-06-12T22:00:00Z',
    scanFrequency: 'Toutes les 6h (critiques) + quotidien',
    coverage: 35,
    score: 5.2,
    targetScore: 9.5,
    kpis: [
      { label: 'Vulns critiques', current: '5', target: '0', icon: 'ri-error-warning-line', trend: 'stable' },
      { label: 'ISO 27001 readiness', current: '42%', target: '90%', icon: 'ri-file-check-line', trend: 'up' },
      { label: 'Score SecurityHeaders', current: 'D', target: 'A+', icon: 'ri-global-line', trend: 'up' },
      { label: 'Sauvegardes (30j)', current: '0', target: '30', icon: 'ri-cloud-line', trend: 'stable' },
    ],
    monitors: [
      { label: 'Headers HTTP', status: 'fail', lastCheck: '2026-06-13T00:00:00Z', icon: 'ri-global-line' },
      { label: 'WAF Protection', status: 'fail', lastCheck: '2026-06-13T00:00:00Z', icon: 'ri-shield-flash-line' },
      { label: 'Monitoring & Logs', status: 'fail', lastCheck: '2026-06-13T00:00:00Z', icon: 'ri-radar-line' },
      { label: 'Backup Strategy', status: 'fail', lastCheck: '2026-06-13T00:00:00Z', icon: 'ri-cloud-off-line' },
      { label: 'API Rate Limiting', status: 'warn', lastCheck: '2026-06-13T00:00:00Z', icon: 'ri-terminal-box-line' },
    ],
    recentScans: [
      { date: '2026-06-13', score: 5.2, type: 'Complet' },
      { date: '2026-06-11', score: 5.0, type: 'Partiel' },
    ],
    path: '/kos-cyber-tech-correction-engine',
  },
  {
    id: 'digital-growth',
    name: 'Digital Growth Engine',
    shortName: 'Growth',
    description: 'SEO/GEO/AEO, content intelligence, community management, lead generation, funnel conversion.',
    icon: 'ri-line-chart-line',
    color: '#9B7B2C',
    status: 'partial',
    version: 'v1.4.0',
    lastDeployed: '2026-06-12T21:00:00Z',
    scanFrequency: 'Quotidien (KPIs) + hebdomadaire (audit)',
    coverage: 45,
    score: 5.5,
    targetScore: 9.5,
    kpis: [
      { label: 'Trafic organique', current: '8,420', target: '15,000', icon: 'ri-global-line', trend: 'up' },
      { label: 'Taux de capture', current: '8%', target: '15%', icon: 'ri-download-2-line', trend: 'up' },
      { label: 'Leads qualifiés/mois', current: '674', target: '1,263', icon: 'ri-user-star-line', trend: 'up' },
      { label: 'Pages GEO', current: '20', target: '100', icon: 'ri-brain-line', trend: 'up' },
    ],
    monitors: [
      { label: 'SEO Audit', status: 'warn', lastCheck: '2026-06-12T21:00:00Z', icon: 'ri-search-line' },
      { label: 'GEO Visibility', status: 'fail', lastCheck: '2026-06-12T21:00:00Z', icon: 'ri-brain-line' },
      { label: 'LinkedIn Engagement', status: 'warn', lastCheck: '2026-06-12T21:00:00Z', icon: 'ri-linkedin-box-line' },
      { label: 'Conversion Funnel', status: 'fail', lastCheck: '2026-06-12T21:00:00Z', icon: 'ri-filter-3-line' },
    ],
    recentScans: [
      { date: '2026-06-12', score: 5.5, type: 'Audit' },
      { date: '2026-06-08', score: 5.2, type: 'Audit' },
    ],
    path: '/kos-digital-growth-correction-engine',
  },
  {
    id: 'site-health',
    name: 'Site Health Monitor',
    shortName: 'Health',
    description: 'Scan temps réel : headers HTTP, robots.txt, sitemap, performance, SEO technique. Edge Function kos-site-health-check.',
    icon: 'ri-heart-pulse-line',
    color: '#2D7A3A',
    status: 'deployed',
    version: 'v1.0.0',
    lastDeployed: '2026-06-13T10:00:00Z',
    scanFrequency: 'Toutes les heures + à la demande',
    coverage: 100,
    score: 8.5,
    targetScore: 9.5,
    kpis: [
      { label: 'Uptime (30j)', current: '99.95%', target: '99.99%', icon: 'ri-line-chart-line', trend: 'up' },
      { label: 'Headers sécurité', current: '3/5', target: '5/5', icon: 'ri-shield-line', trend: 'stable' },
      { label: 'robots.txt', current: 'OK', target: 'OK', icon: 'ri-file-text-line', trend: 'stable' },
      { label: 'Sitemap URLs', current: '241', target: '250+', icon: 'ri-node-tree', trend: 'up' },
      { label: 'Temps réponse', current: '320ms', target: '<200ms', icon: 'ri-timer-line', trend: 'down' },
    ],
    monitors: [
      { label: 'HTTP Headers', status: 'warn', lastCheck: '2026-06-13T10:00:00Z', icon: 'ri-global-line' },
      { label: 'robots.txt', status: 'pass', lastCheck: '2026-06-13T10:00:00Z', icon: 'ri-file-text-line' },
      { label: 'sitemap.xml', status: 'pass', lastCheck: '2026-06-13T10:00:00Z', icon: 'ri-node-tree' },
      { label: 'Page Speed', status: 'warn', lastCheck: '2026-06-13T10:00:00Z', icon: 'ri-speed-line' },
      { label: 'SEO On-Page', status: 'pass', lastCheck: '2026-06-13T10:00:00Z', icon: 'ri-search-line' },
    ],
    recentScans: [
      { date: '2026-06-13', score: 8.5, type: 'Complet' },
      { date: '2026-06-13', score: 8.3, type: 'Headers' },
      { date: '2026-06-12', score: 8.0, type: 'Complet' },
    ],
    path: '/kos-web-operations-deployment',
  },
];

export const KOS_COMPLIANCE_STANDARDS: complianceStandard[] = [
  {
    id: 'big-four-quality',
    name: 'Big Four Quality Framework',
    description: 'Alignement sur les standards McKinsey, BCG, Bain, Deloitte, PwC, EY. 6 critères : Clarté, Thèse, Structure, Profondeur, Insights, Actionnabilité.',
    icon: 'ri-building-line',
    color: '#86BC25',
    currentScore: 7.8,
    targetScore: 9.5,
    controls: [
      { label: 'Clarté du problème business', status: 'warn', description: 'Problème identifié mais pas systématiquement contextualisé UEMOA/CEMAC.', evidence: '75% des articles sans contexte régional explicite' },
      { label: 'Force de la thèse (POV)', status: 'fail', description: 'Thèses descriptives sans positionnement différenciant.', evidence: '0 article avec POV tranché vs concurrents' },
      { label: 'Structure logique (Framework)', status: 'warn', description: 'Structure existante mais pas de framework propriétaire KHEPRA.', evidence: '5 frameworks définis, 7 restants à créer' },
      { label: 'Profondeur analytique', status: 'warn', description: 'Analyse présente mais manque de données chiffrées et cas réels.', evidence: 'Ratio descriptif/analytique 80/20, cible 20/80' },
      { label: 'Qualité des insights', status: 'fail', description: 'Insights non triviaux quasi inexistants hors articles piliers.', evidence: 'Moins de 15% des contenus génèrent un "aha moment"' },
      { label: 'Actionnabilité', status: 'warn', description: 'CTA présents mais non contextuels, non connectés au funnel.', evidence: '60% des articles sans CTA' },
    ],
    lastAudit: '2026-06-12',
  },
  {
    id: 'iso-27001',
    name: 'ISO 27001:2022 — Sécurité',
    description: 'Système de management de la sécurité de l\'information. 93 contrôles dans les catégories A.5 à A.18.',
    icon: 'ri-shield-keyhole-line',
    color: '#0D7B5F',
    currentScore: 4.2,
    targetScore: 9.0,
    controls: [
      { label: 'HSTS + CSP déployés', status: 'fail', description: 'Headers de sécurité absents ou incomplets.', evidence: 'Score securityheaders.com: D' },
      { label: 'WAF applicatif', status: 'fail', description: 'Aucun WAF au-delà des protections edge par défaut.', evidence: '0 règle WAF personnalisée' },
      { label: 'MFA obligatoire', status: 'warn', description: 'Disponible via Supabase mais non obligatoire.', evidence: 'Comptes admin sans MFA' },
      { label: 'Logging & Monitoring', status: 'fail', description: 'Aucun SIEM, pas de logs centralisés.', evidence: 'Tables monitoring_logs vides' },
      { label: 'Backup & PRA', status: 'fail', description: 'Pas de stratégie de sauvegarde documentée.', evidence: '0 backup automatisé' },
    ],
    lastAudit: '2026-06-12',
  },
  {
    id: 'rgpd',
    name: 'RGPD & Data Protection',
    description: 'Règlement Général sur la Protection des Données. Conformité traitement, sécurité, droits des personnes.',
    icon: 'ri-lock-line',
    color: '#6B4A3A',
    currentScore: 5.8,
    targetScore: 9.0,
    controls: [
      { label: 'Cookie consent', status: 'pass', description: 'Bannière cookie consent déployée et fonctionnelle.', evidence: 'CookieConsent.tsx actif' },
      { label: 'Mentions légales', status: 'pass', description: 'Pages CGU, Privacy, Cookies, Legal conformes.', evidence: '4 pages légales publiées' },
      { label: 'Registre traitements', status: 'warn', description: 'Page registre-traitements existante mais partielle.', evidence: '/registre-traitements' },
      { label: 'AIPD (Analyse Impact)', status: 'fail', description: 'Aucune analyse d\'impact sur la protection des données réalisée.', evidence: 'Documentation inexistante' },
      { label: 'Droit des personnes', status: 'warn', description: 'Procédure partiellement documentée, pas de formulaire dédié.', evidence: 'Pas de portail DSAR' },
    ],
    lastAudit: '2026-06-10',
  },
  {
    id: 'seo-compliance',
    name: 'SEO & Indexation Compliance',
    description: 'Respect des guidelines Google Search, schema.org, Core Web Vitals, indexation optimale.',
    icon: 'ri-search-line',
    color: '#9B7B2C',
    currentScore: 8.5,
    targetScore: 9.5,
    controls: [
      { label: 'Sitemap XML', status: 'pass', description: 'Sitemap dynamique avec 241 URLs, soumis à Google.', evidence: '/sitemap.xml' },
      { label: 'robots.txt', status: 'pass', description: 'Configuré avec AI crawlers allowlist et pages admin disallow.', evidence: '/robots.txt validé' },
      { label: 'Canonical URLs', status: 'pass', description: '100% des URLs avec canonical correct.', evidence: 'khepraexperts.com partout' },
      { label: 'Core Web Vitals', status: 'pass', description: 'LCP 1.9s, CLS 0.04, INP 120ms.', evidence: 'PageSpeed 96/100' },
      { label: 'Schema.org', status: 'warn', description: 'Présent mais pas sur toutes les pages. FAQ schema à enrichir.', evidence: 'SeoHead couvre 70% des pages' },
    ],
    lastAudit: '2026-06-13',
  },
];

export const KOS_QUALITY_GATES: qualityGate[] = [
  {
    id: 'gate-content',
    name: 'Content Quality Gate',
    description: 'Bloque toute publication si score Big Four < 9.5/10. Vérifie les 6 critères automatiquement.',
    icon: 'ri-file-check-line',
    color: '#86BC25',
    threshold: 9.5,
    currentScore: 7.8,
    status: 'disabled',
    recentBlocks: [
      { date: '2026-06-12', reason: 'Score 5.8/10 — Thèse descriptive, pas de POV fort', content: 'Prix de Transfert — Documentation BEPS' },
      { date: '2026-06-11', reason: 'Score 5.2/10 — Pas de framework, CTA noyé', content: 'Page Service Contrôle Interne Bancaire' },
    ],
    isAutomatic: false,
  },
  {
    id: 'gate-security',
    name: 'Security Gate',
    description: 'Bloque tout déploiement si vulnérabilités critiques détectées. Vérifie headers, WAF, MFA.',
    icon: 'ri-shield-keyhole-line',
    color: '#C05A3A',
    threshold: 8.0,
    currentScore: 5.2,
    status: 'disabled',
    recentBlocks: [
      { date: '2026-06-13', reason: '5 vulns critiques : HSTS, CSP, WAF, Monitoring, Backup', content: 'Déploiement global' },
    ],
    isAutomatic: false,
  },
  {
    id: 'gate-legal',
    name: 'Legal Compliance Gate',
    description: 'Bloque toute publication avec claims non vérifiables ou non conformes RGPD.',
    icon: 'ri-scales-line',
    color: '#6B4A3A',
    threshold: 9.5,
    currentScore: 9.0,
    status: 'active',
    recentBlocks: [],
    isAutomatic: true,
  },
  {
    id: 'gate-url',
    name: 'URL Integrity Gate',
    description: 'Vérifie que toutes les URLs sont valides, pas de liens cassés, canonical correct.',
    icon: 'ri-link',
    color: '#0D7B5F',
    threshold: 9.8,
    currentScore: 9.8,
    status: 'active',
    recentBlocks: [],
    isAutomatic: true,
  },
];

export const KOS_DEPLOYMENT_PIPELINE: deploymentPipeline[] = [
  {
    stage: 1, name: 'Code Audit',
    description: 'Analyse statique du code, vérification des dépendances, linting, TypeScript strict.',
    status: 'completed', icon: 'ri-code-line', color: '#86BC25', duration: '2 min', completedAt: '2026-06-13T10:00:00Z',
  },
  {
    stage: 2, name: 'Build & Bundle',
    description: 'Compilation Vite, code splitting, tree shaking, optimisation bundles.',
    status: 'completed', icon: 'ri-stack-line', color: '#0D7B5F', duration: '45 sec', completedAt: '2026-06-13T10:02:00Z',
  },
  {
    stage: 3, name: 'Quality Gates',
    description: 'Vérification des 4 gates : Content Score ≥ 9.5, Security Score ≥ 8.0, Legal OK, URLs OK.',
    status: 'in_progress', icon: 'ri-shield-check-line', color: '#E8C547', duration: 'En cours', completedAt: null,
  },
  {
    stage: 4, name: 'Tests Automatisés',
    description: 'Tests unitaires, tests d\'intégration, tests E2E, vérification liens.',
    status: 'pending', icon: 'ri-test-tube-line', color: '#4F46E5', duration: '—', completedAt: null,
  },
  {
    stage: 5, name: 'Health Check',
    description: 'Scan kos-site-health-check : headers, robots.txt, sitemap, SEO, performance.',
    status: 'pending', icon: 'ri-heart-pulse-line', color: '#C05A3A', duration: '—', completedAt: null,
  },
  {
    stage: 6, name: 'Deploy to Production',
    description: 'Déploiement Netlify, invalidation CDN, vérification post-deploy.',
    status: 'pending', icon: 'ri-rocket-2-line', color: '#2D7A3A', duration: '—', completedAt: null,
  },
  {
    stage: 7, name: 'Post-Deploy Monitoring',
    description: 'Surveillance 24h : uptime, erreurs, Core Web Vitals, rollback si anomalie.',
    status: 'pending', icon: 'ri-radar-line', color: '#8B3040', duration: '—', completedAt: null,
  },
];

export const KOS_OVERALL_HEALTH = {
  totalScore: 7.2,
  targetScore: 9.5,
  enginesDeployed: 6,
  enginesTotal: 6,
  enginesFullyOperational: 2,
  qualityGatesActive: 2,
  qualityGatesTotal: 4,
  complianceStandards: 4,
  avgComplianceScore: 6.6,
  lastFullScan: '2026-06-13T03:00:00Z',
  nextScheduledScan: '2026-06-14T03:00:00Z',
  criticalBlockers: [
    'KOS Automaton Engine — RAG, Content AI, Quality Scoring 100% autonomes',
    'LinkedIn MDP Approval — Bloque Company Page API, Social Auto-Posting',
  ],
  quickWins: [
    'Déployer HSTS + CSP → Score sécurité +40%',
    'Activer MFA obligatoire → ISO 27001 +15%',
    'Connecter CRM au Content OS → Conversion +30%',
    'Créer 10 pages piliers GEO → Visibilité IA +200%',
  ],
};





