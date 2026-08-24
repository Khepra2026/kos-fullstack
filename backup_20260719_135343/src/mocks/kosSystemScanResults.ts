export interface SystemScanPhase {
  phaseId: string;
  phaseName: string;
  icon: string;
  color: string;
  duration: string;
  systemsCount: number;
  status: 'pending' | 'scanning' | 'completed' | 'error';
  progress: number;
  findings: SystemScanFinding[];
}

export interface SystemScanFinding {
  findingId: string;
  system: string;
  severity: 'critical' | 'major' | 'minor' | 'info';
  title: string;
  description: string;
  metric: string;
  currentValue: string;
  targetValue: string;
  agentAssigned: string;
  autoFixAvailable: boolean;
}

export interface SystemScanSummary {
  scanId: string;
  startedAt: string;
  completedAt: string;
  totalDuration: string;
  totalSystems: number;
  systemsScanned: number;
  systemsHealthy: number;
  systemsWarning: number;
  systemsCritical: number;
  totalFindings: number;
  criticalFindings: number;
  majorFindings: number;
  minorFindings: number;
  autoFixableFindings: number;
  overallHealthScore: number;
  overallBigFourScore: number;
}

export const SYSTEM_SCAN_SUMMARY: SystemScanSummary = {
  scanId: 'KOS-FULLSCAN-2026-06-17-1656',
  startedAt: '2026-06-17T16:56:14Z',
  completedAt: '2026-06-17T16:59:47Z',
  totalDuration: '3 min 33 sec',
  totalSystems: 59,
  systemsScanned: 59,
  systemsHealthy: 37,
  systemsWarning: 15,
  systemsCritical: 7,
  totalFindings: 284,
  criticalFindings: 18,
  majorFindings: 67,
  minorFindings: 199,
  autoFixableFindings: 156,
  overallHealthScore: 83.2,
  overallBigFourScore: 85.7,
};

export const SYSTEM_SCAN_PHASES: SystemScanPhase[] = [
  {
    phaseId: 'phase-core-infra',
    phaseName: 'Infrastructure & Sécurité',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    duration: '42 sec',
    systemsCount: 12,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'INF-001', system: 'Supabase Core', severity: 'critical',
        title: 'RLS manquante sur 3 tables sensibles',
        description: 'Tables kos_critical_events, kos_unified_global_state, kos_enterprise_strategic_memory sans Row Level Security.',
        metric: 'Tables protégées', currentValue: '56/59', targetValue: '59/59',
        agentAssigned: 'KOS Enterprise Security Engine™', autoFixAvailable: true,
      },
      {
        findingId: 'INF-002', system: 'Edge Functions', severity: 'major',
        title: '3 Edge Functions sans JWT verification',
        description: 'Fonctions publiques exposées sans vérification de token.',
        metric: 'Fonctions sécurisées', currentValue: '95/98', targetValue: '98/98',
        agentAssigned: 'KOS Enterprise Security Engine™', autoFixAvailable: true,
      },
      {
        findingId: 'INF-003', system: 'Cron Jobs', severity: 'major',
        title: 'Cron tender-scraper : 3 échecs en 7 jours',
        description: 'Timeout source AFDB. Impact : couverture appels d\'offres réduite.',
        metric: 'Fiabilité cron', currentValue: '96.4%', targetValue: '100%',
        agentAssigned: 'KOS Auto-Task Orchestrator™', autoFixAvailable: false,
      },
      {
        findingId: 'INF-004', system: 'WAF Configuration', severity: 'critical',
        title: 'WAF : 3 règles non déployées',
        description: 'Couverture 91% au lieu de 100%. Règles OWASP Top 10 manquantes.',
        metric: 'Couverture WAF', currentValue: '91%', targetValue: '100%',
        agentAssigned: 'KOS Cyber Security Automate™', autoFixAvailable: true,
      },
      {
        findingId: 'INF-005', system: 'SSL/TLS', severity: 'minor',
        title: 'Certificat SSL : renouvellement dans 28 jours',
        description: 'Expire le 15 juillet 2026. Renouvellement automatique à vérifier.',
        metric: 'Jours avant expiration', currentValue: '28 jours', targetValue: '90 jours',
        agentAssigned: 'KOS Web Operations™', autoFixAvailable: true,
      },
      {
        findingId: 'INF-006', system: 'Build Pipeline', severity: 'minor',
        title: 'Build time moyen : 16s (cible 12s)',
        description: 'Tree-shaking améliorable. 340 Ko code mort dans le bundle principal.',
        metric: 'Build time', currentValue: '16s', targetValue: '12s',
        agentAssigned: 'KOS Fullstack Dev Automate™', autoFixAvailable: true,
      },
    ],
  },
  {
    phaseId: 'phase-agents',
    phaseName: 'Agents & Automates IA',
    icon: 'ri-robot-line',
    color: '#5B21B6',
    duration: '68 sec',
    systemsCount: 15,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'AGT-001', system: 'KOS SEO + AEO Command Center™', severity: 'critical',
        title: 'Score AEO 3.1/10 — Invisibilité IA',
        description: '15 pages auditées. 10 sans FAQ Schema. 45 H2 sans format question. Aucune réponse concise.',
        metric: 'Score AEO', currentValue: '3.1/10', targetValue: '8.0/10',
        agentAssigned: 'KOS Schema Markup Agent™', autoFixAvailable: true,
      },
      {
        findingId: 'AGT-002', system: 'KOS Blog Writing Automate™', severity: 'critical',
        title: 'Production 52% sous cible — 12 articles/mois vs 25',
        description: 'Cadencement éditorial critique. Pipeline contenu insuffisant.',
        metric: 'Articles/mois', currentValue: '12', targetValue: '25',
        agentAssigned: 'KOS Blog Writing Automate™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-003', system: 'KOS Email Funnel Automation™', severity: 'critical',
        title: 'Taux ouverture nurturing : 12% (cible 25%)',
        description: 'Objets email à optimiser. Onboarding nouveau client non déployé.',
        metric: 'Taux ouverture', currentValue: '12%', targetValue: '25%',
        agentAssigned: 'KOS Email Funnel Automation™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-004', system: 'KOS Knowledge Monetization Engine™', severity: 'critical',
        title: '0 souscripteurs premium en 3 mois',
        description: 'Pricing ou proposition de valeur à revoir. Livre Blanc ESG sans paywall.',
        metric: 'Souscripteurs', currentValue: '0', targetValue: '50',
        agentAssigned: 'KOS Knowledge Monetization Engine™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-005', system: 'KOS MQL Nurturing Engine™', severity: 'critical',
        title: 'MQL→SQL : 8% vs 15% cible',
        description: 'Conversion quasi 2× sous cible. 3 lead magnets Q2 non créés.',
        metric: 'Conversion MQL→SQL', currentValue: '8%', targetValue: '15%',
        agentAssigned: 'KOS MQL Nurturing Engine™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-006', system: 'KOS Pipeline Analytics™', severity: 'major',
        title: 'Win rate Q2 : 28% vs 40% cible Big Four',
        description: '12 points sous la cible. Analyse des causes requise.',
        metric: 'Win rate', currentValue: '28%', targetValue: '40%',
        agentAssigned: 'KOS Pipeline Analytics™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-007', system: 'KOS Backlink Intelligence™', severity: 'major',
        title: 'Domain Authority 28 — cible Big Four 45+',
        description: 'Programme 12 mois requis. 18 domaines sans contact éditeur.',
        metric: 'Domain Authority', currentValue: '28', targetValue: '45',
        agentAssigned: 'KOS Backlink Intelligence™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-008', system: 'KOS Social Media Command™', severity: 'major',
        title: 'LinkedIn MDP non approuvé — 0 posts programmables',
        description: 'Automatisation LinkedIn bloquée. 8 posts/mois vs 30 cible.',
        metric: 'Posts/mois', currentValue: '8', targetValue: '30',
        agentAssigned: 'KOS Social Media Command™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-009', system: 'KOS Digital Twin™', severity: 'major',
        title: 'Twin Contrôle Interne : précision 74%',
        description: 'Seuil Big Four 80%. Recalibration requise.',
        metric: 'Précision jumeau', currentValue: '74%', targetValue: '80%',
        agentAssigned: 'KOS Digital Twin™', autoFixAvailable: false,
      },
      {
        findingId: 'AGT-010', system: 'KOS Research Institute™', severity: 'critical',
        title: 'Baromètre Inclusion Financière : 15 jours de retard',
        description: 'Publication flagship prévue 1er juin. Impact réputationnel.',
        metric: 'Retard publication', currentValue: '15 jours', targetValue: '0 jour',
        agentAssigned: 'KOS Research Institute™', autoFixAvailable: false,
      },
    ],
  },
  {
    phaseId: 'phase-perf-seo',
    phaseName: 'Performance & SEO',
    icon: 'ri-speed-up-line',
    color: '#9B7B2C',
    duration: '51 sec',
    systemsCount: 8,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'PRF-001', system: 'Core Web Vitals', severity: 'critical',
        title: 'Performance Score : 56/100',
        description: 'LCP 33.1s (mobile), FCP 4.3s, TBT 140ms. Poids total 9 Mo. Cible 95/100.',
        metric: 'Performance Score', currentValue: '56/100', targetValue: '95/100',
        agentAssigned: 'KOS Performance SEO Command™', autoFixAvailable: true,
      },
      {
        findingId: 'PRF-002', system: 'Largest Contentful Paint', severity: 'critical',
        title: 'LCP 33.1s — 13× au-dessus de la cible 2.5s',
        description: 'Image hero non optimisée, render-blocking resources, cache inefficace.',
        metric: 'LCP', currentValue: '33.1s', targetValue: '2.5s',
        agentAssigned: 'KOS LCP Recovery Agent™', autoFixAvailable: false,
      },
      {
        findingId: 'PRF-003', system: 'Cache Strategy', severity: 'major',
        title: '3 200 Kio non mis en cache',
        description: 'Durées de cache inefficaces. Assets statiques sans Cache-Control optimal.',
        metric: 'Économies cache', currentValue: '0 Kio', targetValue: '3 200 Kio',
        agentAssigned: 'KOS Cache Optimization Agent™', autoFixAvailable: true,
      },
      {
        findingId: 'PRF-004', system: 'Image Optimization', severity: 'major',
        title: '87 images non WebP — 460 Kio économisables',
        description: 'Images non optimisées, pas de lazy loading sur 12 images, 5 images >5 Mo.',
        metric: 'Images optimisées', currentValue: '34/121', targetValue: '121/121',
        agentAssigned: 'KOS Image Governance Agent™', autoFixAvailable: true,
      },
      {
        findingId: 'PRF-005', system: 'JavaScript Bundle', severity: 'major',
        title: '375 Kio JS inutilisé + 340 Ko code mort',
        description: 'Tree-shaking à améliorer. Code splitting non appliqué sur 4 chunks.',
        metric: 'JS inutilisé', currentValue: '715 Kio', targetValue: '<200 Kio',
        agentAssigned: 'KOS Fullstack Dev Automate™', autoFixAvailable: true,
      },
      {
        findingId: 'PRF-006', system: 'CSS Optimization', severity: 'minor',
        title: '72 Kio CSS inutilisé',
        description: 'PurgeCSS à configurer. Styles Tailwind non purgés.',
        metric: 'CSS inutilisé', currentValue: '72 Kio', targetValue: '<10 Kio',
        agentAssigned: 'KOS Fullstack Dev Automate™', autoFixAvailable: true,
      },
    ],
  },
  {
    phaseId: 'phase-securite',
    phaseName: 'Conformité & Réglementaire',
    icon: 'ri-scales-3-line',
    color: '#8B3040',
    duration: '38 sec',
    systemsCount: 7,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'REG-001', system: 'EU AI Act Compliance', severity: 'critical',
        title: 'Digital Twin : EU AI Act Art.14 non conforme',
        description: 'Documentation d\'explicabilité manquante pour système à haut risque.',
        metric: 'Articles conformes', currentValue: '13/14', targetValue: '14/14',
        agentAssigned: 'KOS AI Governance Council™', autoFixAvailable: false,
      },
      {
        findingId: 'REG-002', system: 'RGPD Consentement', severity: 'major',
        title: '2 formulaires sans case consentement RGPD',
        description: 'Capture de données personnelles sans consentement explicite.',
        metric: 'Formulaires conformes', currentValue: '15/17', targetValue: '17/17',
        agentAssigned: 'KOS Legal Compliance Agent™', autoFixAvailable: false,
      },
      {
        findingId: 'REG-003', system: 'Politique Confidentialité', severity: 'major',
        title: 'Politique confidentialité : 3 mois sans mise à jour',
        description: 'Réglementation BCEAO a évolué. Mentions légales à actualiser.',
        metric: 'Jours depuis màj', currentValue: '94 jours', targetValue: '<30 jours',
        agentAssigned: 'KOS Legal Compliance Agent™', autoFixAvailable: true,
      },
      {
        findingId: 'REG-004', system: 'ISO 27001', severity: 'major',
        title: 'Plan mitigation cyber : ISO 27001:2013 obsolète',
        description: 'Version 2022 en vigueur. Migration documentée mais non exécutée.',
        metric: 'Version ISO', currentValue: '2013', targetValue: '2022',
        agentAssigned: 'KOS Enterprise Risk Engine™', autoFixAvailable: true,
      },
      {
        findingId: 'REG-005', system: 'COBAC R-2024/01', severity: 'major',
        title: 'Circulaire COBAC R-2024/01 : formation non planifiée',
        description: 'Nouvelle exigence réglementaire sans session de formation équipe.',
        metric: 'Formations planifiées', currentValue: '0/1', targetValue: '1/1',
        agentAssigned: 'KOS Regulatory Compliance Automate™', autoFixAvailable: true,
      },
    ],
  },
  {
    phaseId: 'phase-data',
    phaseName: 'Data & Intelligence',
    icon: 'ri-bar-chart-box-line',
    color: '#0D7B5F',
    duration: '35 sec',
    systemsCount: 8,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'DAT-001', system: 'Knowledge Graph', severity: 'major',
        title: 'Sous-graphe CEMAC : 12 nœuds vs 247 UEMOA',
        description: 'Déséquilibre de couverture réglementaire. Ratio 1:20.',
        metric: 'Nœuds CEMAC', currentValue: '12', targetValue: '100',
        agentAssigned: 'KOS Global Knowledge Graph™', autoFixAvailable: false,
      },
      {
        findingId: 'DAT-002', system: 'Lead Scoring Model', severity: 'major',
        title: 'Modèle scoring : drift 8% détecté',
        description: 'Recalibrage urgent. Impact direct sur qualification leads.',
        metric: 'Drift modèle', currentValue: '8%', targetValue: '<3%',
        agentAssigned: 'KOS Model Evaluation Engine™', autoFixAvailable: true,
      },
      {
        findingId: 'DAT-003', system: 'Enterprise KPI Tower', severity: 'minor',
        title: 'KPIs certification : 278/280 renseignés',
        description: '2 KPIs ESG sans données Q2 2026.',
        metric: 'KPIs complets', currentValue: '278/280', targetValue: '280/280',
        agentAssigned: 'KOS Enterprise KPI Tower™', autoFixAvailable: true,
      },
      {
        findingId: 'DAT-004', system: 'Forecasting Engine', severity: 'minor',
        title: 'Prévision CA Q3 : confiance 72% (seuil 80%)',
        description: 'Données historiques insuffisantes pour 3 pays CEMAC.',
        metric: 'Confiance prévision', currentValue: '72%', targetValue: '80%',
        agentAssigned: 'KOS Forecasting Engine™', autoFixAvailable: true,
      },
    ],
  },
  {
    phaseId: 'phase-croissance',
    phaseName: 'Croissance & Conversion',
    icon: 'ri-rocket-line',
    color: '#4A7A1E',
    duration: '29 sec',
    systemsCount: 9,
    status: 'completed',
    progress: 100,
    findings: [
      {
        findingId: 'CRW-001', system: 'Pipeline Commercial', severity: 'critical',
        title: '8 leads pipeline (185M-390M FCFA) — 3 sans suivi',
        description: 'Lead #GRW-007 : 285M FCFA, nurturing stallé 45 jours.',
        metric: 'Leads actifs', currentValue: '5/8', targetValue: '8/8',
        agentAssigned: 'KOS Growth Engine™', autoFixAvailable: true,
      },
      {
        findingId: 'CRW-002', system: 'Tender Intelligence', severity: 'major',
        title: '51 AO/AMI LIVE DB — source AFDB bloquée 3 jours',
        description: 'Timeout scraping Banque Africaine de Développement.',
        metric: 'Sources actives', currentValue: '8/9', targetValue: '9/9',
        agentAssigned: 'KOS Tender Intelligence Engine™', autoFixAvailable: false,
      },
      {
        findingId: 'CRW-003', system: 'Client Success', severity: 'minor',
        title: '3 clients sans contact Q2 2026',
        description: 'Risque de churn corporate. NPS actuel 9.8.',
        metric: 'Clients sans suivi', currentValue: '3', targetValue: '0',
        agentAssigned: 'KOS Client Success Engine™', autoFixAvailable: true,
      },
    ],
  },
];

export const SCAN_QUICK_STATS = {
  agentsScanned: 75,
  agentsHealthy: 37,
  agentsWarning: 23,
  agentsCritical: 15,
  edgeFunctionsScanned: 98,
  edgeFunctionsHealthy: 95,
  tablesScanned: 59,
  tablesRLSProtected: 56,
  cronJobsScanned: 32,
  cronJobsHealthy: 29,
  pagesScanned: 85,
  pagesIndexed: 51,
  securityScore: 88,
  complianceScore: 82,
  performanceScore: 56,
  seoScore: 78,
  aeoScore: 31,
};



