export interface BlockScanResult {
  blockId: string;
  blockName: string;
  blockIcon: string;
  blockColor: string;
  description: string;
  lastScan: string;
  totalIssues: number;
  criticalIssues: number;
  majorIssues: number;
  minorIssues: number;
  fixedIssues: number;
  healthScore: number;
  agentAssignments: AgentAssignment[];
  detections: BlockDetection[];
}

export interface AgentAssignment {
  agentId: string;
  agentName: string;
  agentIcon: string;
  agentColor: string;
  role: 'primary' | 'secondary' | 'reviewer';
  status: 'active' | 'scanning' | 'executing' | 'idle';
  detectionsFound: number;
  fixesApplied: number;
}

export interface BlockDetection {
  id: string;
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  location: string;
  detectedBy: string;
  detectedAt: string;
  status: 'open' | 'in_progress' | 'fixed' | 'false_positive';
  autoFixAvailable: boolean;
  estimatedEffort: string;
  relatedBlocks: string[];
}

export interface ExecutionLog {
  id: string;
  blockId: string;
  blockName: string;
  agentId: string;
  agentName: string;
  action: string;
  detectionsFixed: number;
  timestamp: string;
  status: 'success' | 'partial' | 'failed';
  details: string;
}

export const BLOCK_SCAN_RESULTS: BlockScanResult[] = [
  {
    blockId: 'seo-technique',
    blockName: 'SEO Technique',
    blockIcon: 'ri-search-line',
    blockColor: '#0D7B5F',
    description: 'Audit SEO complet : balisage, indexation, sitemap, robots.txt, Core Web Vitals, maillage interne, canonical, hreflang.',
    lastScan: '2026-06-14T03:00:00Z',
    totalIssues: 18,
    criticalIssues: 1,
    majorIssues: 5,
    minorIssues: 12,
    fixedIssues: 7,
    healthScore: 76,
    agentAssignments: [
      { agentId: 'seo', agentName: 'KOS SEO Agent', agentIcon: 'ri-search-line', agentColor: '#0D7B5F', role: 'primary', status: 'active', detectionsFound: 12, fixesApplied: 5 },
      { agentId: 'geo', agentName: 'KOS GEO Agent', agentIcon: 'ri-globe-line', agentColor: '#0891B2', role: 'secondary', status: 'scanning', detectionsFound: 4, fixesApplied: 1 },
      { agentId: 'quality', agentName: 'KOS Quality Agent', agentIcon: 'ri-verified-badge-line', agentColor: '#5B21B6', role: 'reviewer', status: 'idle', detectionsFound: 2, fixesApplied: 1 },
    ],
    detections: [
      { id: 'SEO-001', severity: 'critical', title: '12 pages orphelines sans lien interne entrant', description: 'Ces pages ne reçoivent aucun link juice interne. Crawl budget gaspillé. Impact direct sur l\'indexation et le classement.', location: 'Pages outils + anciennes landing pages', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-12T08:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '45 min', relatedBlocks: ['content-blog', 'maillage-interne'] },
      { id: 'SEO-002', severity: 'major', title: '15 pages sans balise canonical', description: 'Risque de duplicate content. Google peut choisir la mauvaise URL comme canonique.', location: 'Pages outils + services', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-11T10:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '30 min', relatedBlocks: ['content-blog'] },
      { id: 'SEO-003', severity: 'major', title: '8 articles avec meta description > 160 caractères', description: 'Descriptions tronquées dans les SERP. Perte de CTR estimée à 15%.', location: 'Blog > Articles Sprint 2', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-10T14:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '20 min', relatedBlocks: [] },
      { id: 'SEO-004', severity: 'minor', title: 'Vitesse mobile PageSpeed 68/100', description: '12 points sous la cible de 80. LCP à 3.8s sur mobile (cible < 2.5s).', location: 'Pages outils + homepage', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-13T08:00:00Z', status: 'in_progress', autoFixAvailable: false, estimatedEffort: '4h', relatedBlocks: ['core-web-vitals', 'performance'] },
      { id: 'SEO-005', severity: 'minor', title: '5 images sans attribut alt', description: 'Accessibilité réduite et opportunité SEO manquée pour Google Images.', location: 'Blog > Articles récents', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-13T09:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '10 min', relatedBlocks: [] },
      { id: 'SEO-006', severity: 'minor', title: 'Sitemap non mis à jour depuis 5 jours', description: '3 nouveaux articles publiés non inclus dans le sitemap XML.', location: 'sitemap.xml', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-14T03:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '5 min', relatedBlocks: ['content-blog'] },
      { id: 'SEO-007', severity: 'minor', title: 'Hn hierarchy incorrecte sur 3 pages services', description: 'H3 utilisé avant H2 sur les pages Audit, Due Diligence et Conseil Stratégique.', location: 'Pages services', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-13T11:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '15 min', relatedBlocks: [] },
    ],
  },
  {
    blockId: 'securite-owasp',
    blockName: 'Sécurité OWASP & Headers',
    blockIcon: 'ri-shield-flash-line',
    blockColor: '#C2410C',
    description: 'Conformité OWASP Top 10, headers HTTP de sécurité, HTTPS/HSTS, Content-Security-Policy, CORS, X-Frame-Options, détection vulnérabilités.',
    lastScan: '2026-06-14T04:00:00Z',
    totalIssues: 12,
    criticalIssues: 0,
    majorIssues: 2,
    minorIssues: 10,
    fixedIssues: 9,
    healthScore: 92,
    agentAssignments: [
      { agentId: 'security', agentName: 'KOS Security Agent', agentIcon: 'ri-shield-flash-line', agentColor: '#C2410C', role: 'primary', status: 'active', detectionsFound: 8, fixesApplied: 7 },
      { agentId: 'legal', agentName: 'KOS Legal Compliance Agent', agentIcon: 'ri-scales-3-line', agentColor: '#8B3040', role: 'secondary', status: 'idle', detectionsFound: 3, fixesApplied: 2 },
      { agentId: 'quality', agentName: 'KOS Quality Agent', agentIcon: 'ri-verified-badge-line', agentColor: '#5B21B6', role: 'reviewer', status: 'idle', detectionsFound: 1, fixesApplied: 0 },
    ],
    detections: [
      { id: 'SEC-001', severity: 'major', title: 'Permissions-Policy header manquant', description: 'APIs navigateur non restreintes (caméra, micro, géolocalisation). Risque d\'abus par scripts tiers.', location: 'Headers HTTP globaux', detectedBy: 'KOS Security Agent', detectedAt: '2026-06-13T06:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '15 min', relatedBlocks: [] },
      { id: 'SEC-002', severity: 'major', title: 'Cache-Control manquant sur pages sensibles', description: 'Pages admin et dashboard sans directive Cache-Control. Risque de cache navigateur sur données sensibles.', location: '/administrateur, /dashboard', detectedBy: 'KOS Security Agent', detectedAt: '2026-06-12T09:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '20 min', relatedBlocks: ['admin'] },
      { id: 'SEC-003', severity: 'minor', title: 'Cookies sans attribut SameSite', description: '3 cookies de session sans SameSite=Strict. Vulnérabilité CSRF résiduelle.', location: 'Cookies de session', detectedBy: 'KOS Legal Compliance Agent', detectedAt: '2026-06-11T14:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '10 min', relatedBlocks: [] },
      { id: 'SEC-004', severity: 'minor', title: 'Subresource Integrity manquant sur 2 CDN', description: '2 scripts chargés depuis CDN externe sans attribut integrity. Risque de supply chain attack.', location: 'index.html > scripts CDN', detectedBy: 'KOS Security Agent', detectedAt: '2026-06-10T16:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '10 min', relatedBlocks: [] },
      { id: 'SEC-005', severity: 'minor', title: 'SSL/TLS : TLS 1.0 et 1.1 encore activés', description: 'Protocoles obsolètes. PCI DSS et RGPD exigent TLS 1.2 minimum.', location: 'Configuration serveur Netlify', detectedBy: 'KOS Security Agent', detectedAt: '2026-06-14T04:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '10 min', relatedBlocks: [] },
    ],
  },
  {
    blockId: 'content-blog',
    blockName: 'Qualité Contenu & Blog',
    blockIcon: 'ri-quill-pen-line',
    blockColor: '#4A7A1E',
    description: 'Qualité rédactionnelle, cohérence éditoriale, ton institutionnel, maillage sémantique, optimisation GEO, FAQ Schema.org, featured snippets.',
    lastScan: '2026-06-14T02:00:00Z',
    totalIssues: 25,
    criticalIssues: 2,
    majorIssues: 8,
    minorIssues: 15,
    fixedIssues: 5,
    healthScore: 62,
    agentAssignments: [
      { agentId: 'content', agentName: 'KOS Content Agent', agentIcon: 'ri-quill-pen-line', agentColor: '#4A7A1E', role: 'primary', status: 'scanning', detectionsFound: 15, fixesApplied: 3 },
      { agentId: 'thinktank', agentName: 'KOS Think Tank Agent', agentIcon: 'ri-lightbulb-line', agentColor: '#9B7B2C', role: 'secondary', status: 'active', detectionsFound: 5, fixesApplied: 1 },
      { agentId: 'reputation', agentName: 'KOS Reputation Agent', agentIcon: 'ri-shield-star-line', agentColor: '#6B4A3A', role: 'reviewer', status: 'idle', detectionsFound: 5, fixesApplied: 1 },
    ],
    detections: [
      { id: 'CNT-001', severity: 'critical', title: '60% des articles sans CTA contextuel', description: '75 articles sans aucun call-to-action. 5,000+ visiteurs/mois non convertis en leads. Perte de revenu estimée significative.', location: 'Blog > 75 articles', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-12T08:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '3h', relatedBlocks: ['conversion', 'lead-magnets'] },
      { id: 'CNT-002', severity: 'critical', title: '0 contenu optimisé pour moteurs IA (ChatGPT, Perplexity)', description: '300M+ utilisateurs IA inaccessibles. Aucun contenu avec résumés structurés pour extraction IA.', location: 'Tout le site', detectedBy: 'KOS GEO Agent', detectedAt: '2026-06-11T10:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '20h', relatedBlocks: ['geo-visibility', 'seo-technique'] },
      { id: 'CNT-003', severity: 'major', title: '75% des articles sans POV distinctif', description: 'Contenu interchangeable avec la concurrence. Pas de differentiation thought leadership.', location: 'Blog > Articles piliers', detectedBy: 'KOS Think Tank Agent', detectedAt: '2026-06-10T14:00:00Z', status: 'in_progress', autoFixAvailable: false, estimatedEffort: '15h', relatedBlocks: ['thought-leadership'] },
      { id: 'CNT-004', severity: 'major', title: 'Cadencement éditorial irrégulier', description: '12 articles/mois vs cible 25. Écarts de 8-15 jours entre publications.', location: 'Blog > Production', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-09T09:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: 'N/A (process)', relatedBlocks: ['social-media'] },
      { id: 'CNT-005', severity: 'major', title: '30% des articles avec CTA générique "Contactez-nous"', description: 'Taux de clic de 0.3% sur ces CTA. Aucune personnalisation contextuelle.', location: 'Blog > 22 articles', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-13T11:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '2h', relatedBlocks: ['conversion'] },
      { id: 'CNT-006', severity: 'minor', title: 'Ton institutionnel incohérent sur 30% des articles', description: 'Alternance formel/informel. Certains paragraphes trop conversationnels pour un cabinet Big Four.', location: 'Blog > Articles piliers', detectedBy: 'KOS Reputation Agent', detectedAt: '2026-06-08T15:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '3h', relatedBlocks: [] },
      { id: 'CNT-007', severity: 'minor', title: 'FAQ Schema.org absent sur 70 articles', description: 'Seulement 15 articles ont FAQ Schema.org sur 85. Opportunité Featured Snippets manquée.', location: 'Blog > 70 articles', detectedBy: 'KOS GEO Agent', detectedAt: '2026-06-12T12:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '5h', relatedBlocks: ['aeo-snippets'] },
    ],
  },
  {
    blockId: 'performance-core-web-vitals',
    blockName: 'Performance & Core Web Vitals',
    blockIcon: 'ri-speed-up-line',
    blockColor: '#9B7B2C',
    description: 'LCP, CLS, INP, PageSpeed score, optimisation images, lazy loading, compression, cache headers, CDN configuration.',
    lastScan: '2026-06-14T05:00:00Z',
    totalIssues: 10,
    criticalIssues: 0,
    majorIssues: 3,
    minorIssues: 7,
    fixedIssues: 6,
    healthScore: 85,
    agentAssignments: [
      { agentId: 'seo', agentName: 'KOS SEO Agent', agentIcon: 'ri-search-line', agentColor: '#0D7B5F', role: 'primary', status: 'active', detectionsFound: 6, fixesApplied: 4 },
      { agentId: 'security', agentName: 'KOS Security Agent', agentIcon: 'ri-shield-flash-line', agentColor: '#C2410C', role: 'secondary', status: 'idle', detectionsFound: 2, fixesApplied: 1 },
      { agentId: 'quality', agentName: 'KOS Quality Agent', agentIcon: 'ri-verified-badge-line', agentColor: '#5B21B6', role: 'reviewer', status: 'idle', detectionsFound: 2, fixesApplied: 1 },
    ],
    detections: [
      { id: 'PERF-001', severity: 'major', title: 'LCP à 3.1s sur desktop', description: '0.6s au-dessus de la cible Google (2.5s). Image hero non optimisée et lazy-loading mal configuré.', location: 'Homepage > Hero section', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-13T08:00:00Z', status: 'in_progress', autoFixAvailable: false, estimatedEffort: '3h', relatedBlocks: ['seo-technique'] },
      { id: 'PERF-002', severity: 'major', title: 'Images non converties en WebP sur 40% du site', description: '87 images en PNG/JPEG sans fallback WebP. Économie estimée : 12 Mo par chargement complet.', location: 'Toutes les pages', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-11T09:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '4h', relatedBlocks: [] },
      { id: 'PERF-003', severity: 'major', title: 'Cache-Control max-age absent sur assets statiques', description: 'CSS, JS et images sans cache longue durée. Re-téléchargement à chaque visite.', location: 'Headers HTTP > assets', detectedBy: 'KOS Security Agent', detectedAt: '2026-06-10T11:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '20 min', relatedBlocks: ['securite-owasp'] },
      { id: 'PERF-004', severity: 'minor', title: 'Fonts Google chargées sans preconnect', description: 'Ajouter <link rel="preconnect"> pour Google Fonts réduirait le temps de chargement des polices de 200ms.', location: 'index.html', detectedBy: 'KOS SEO Agent', detectedAt: '2026-06-14T05:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '5 min', relatedBlocks: [] },
      { id: 'PERF-005', severity: 'minor', title: 'JavaScript non utilisé : 340 Ko', description: 'Code mort dans le bundle principal. Tree-shaking améliorable.', location: 'Bundle JS principal', detectedBy: 'KOS Quality Agent', detectedAt: '2026-06-12T14:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '5h', relatedBlocks: [] },
    ],
  },
  {
    blockId: 'social-media-linkedin',
    blockName: 'Réseaux Sociaux & LinkedIn',
    blockIcon: 'ri-share-forward-line',
    blockColor: '#0077B5',
    description: 'Optimisation LinkedIn Company Page, Social Share (OG tags, Twitter Cards), LinkedIn Publishing Automation, Social Metrics, Stratégie de contenu social.',
    lastScan: '2026-06-13T18:00:00Z',
    totalIssues: 14,
    criticalIssues: 1,
    majorIssues: 4,
    minorIssues: 9,
    fixedIssues: 3,
    healthScore: 58,
    agentAssignments: [
      { agentId: 'content', agentName: 'KOS Content Agent', agentIcon: 'ri-quill-pen-line', agentColor: '#4A7A1E', role: 'primary', status: 'scanning', detectionsFound: 8, fixesApplied: 2 },
      { agentId: 'reputation', agentName: 'KOS Reputation Agent', agentIcon: 'ri-shield-star-line', agentColor: '#6B4A3A', role: 'secondary', status: 'active', detectionsFound: 4, fixesApplied: 1 },
      { agentId: 'governance', agentName: 'KOS Governance Agent', agentIcon: 'ri-government-line', agentColor: '#4F46E5', role: 'reviewer', status: 'idle', detectionsFound: 2, fixesApplied: 0 },
    ],
    detections: [
      { id: 'SOC-001', severity: 'critical', title: 'LinkedIn MDP non approuvé — Company Page API inaccessible', description: 'Sans approbation MDP (Marketing Developer Platform), pas d\'automatisation LinkedIn. Posts manuels requis.', location: 'LinkedIn API > MDP Approval', detectedBy: 'KOS Reputation Agent', detectedAt: '2026-06-10T09:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: 'Dépendance externe', relatedBlocks: [] },
      { id: 'SOC-002', severity: 'major', title: '8 posts LinkedIn/mois vs cible 30', description: 'Cadencement 3.75x sous la cible. Visibilité LinkedIn sous-exploitée.', location: 'LinkedIn Company Page', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-12T10:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: 'Process continu', relatedBlocks: ['content-blog'] },
      { id: 'SOC-003', severity: 'major', title: 'OG tags manquants ou incomplets sur 25 pages', description: 'Partage sur LinkedIn/Facebook/Twitter affiche des aperçus dégradés ou absents.', location: '25 pages (outils, services, blog)', detectedBy: 'KOS Reputation Agent', detectedAt: '2026-06-11T14:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '1h30', relatedBlocks: ['seo-technique'] },
      { id: 'SOC-004', severity: 'major', title: 'Aucun carrousel LinkedIn créé ce mois-ci', description: 'Format le plus engageant sur LinkedIn (CTR 2x supérieur aux posts simples). 0 produit.', location: 'LinkedIn Content Pipeline', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-13T10:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '2h/carrousel', relatedBlocks: [] },
      { id: 'SOC-005', severity: 'minor', title: 'Twitter Cards : summary_large_image manquant', description: 'Les tweets avec lien affichent une petite image au lieu d\'une large card.', location: 'Toutes les pages', detectedBy: 'KOS Reputation Agent', detectedAt: '2026-06-13T18:00:00Z', status: 'open', autoFixAvailable: true, estimatedEffort: '15 min', relatedBlocks: ['seo-technique'] },
      { id: 'SOC-006', severity: 'minor', title: 'Pas de stratégie de hashtags documentée', description: 'Hashtags utilisés de façon aléatoire. Aucune analyse de performance par hashtag.', location: 'Stratégie social media', detectedBy: 'KOS Content Agent', detectedAt: '2026-06-12T16:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '2h', relatedBlocks: [] },
    ],
  },
  {
    blockId: 'legal-compliance',
    blockName: 'Conformité Légale & Risques',
    blockIcon: 'ri-scales-3-line',
    blockColor: '#8B3040',
    description: 'Vérification juridique, conformité RGPD, mentions légales, cookies consent, allégations marketing, marques déposées, droits d\'auteur.',
    lastScan: '2026-06-13T22:00:00Z',
    totalIssues: 8,
    criticalIssues: 0,
    majorIssues: 2,
    minorIssues: 6,
    fixedIssues: 4,
    healthScore: 88,
    agentAssignments: [
      { agentId: 'legal', agentName: 'KOS Legal Compliance Agent', agentIcon: 'ri-scales-3-line', agentColor: '#8B3040', role: 'primary', status: 'active', detectionsFound: 6, fixesApplied: 3 },
      { agentId: 'reputation', agentName: 'KOS Reputation Agent', agentIcon: 'ri-shield-star-line', agentColor: '#6B4A3A', role: 'secondary', status: 'idle', detectionsFound: 2, fixesApplied: 1 },
      { agentId: 'governance', agentName: 'KOS Governance Agent', agentIcon: 'ri-government-line', agentColor: '#4F46E5', role: 'reviewer', status: 'idle', detectionsFound: 0, fixesApplied: 0 },
    ],
    detections: [
      { id: 'LEG-001', severity: 'major', title: 'Mentions "Big Four" sans disclaimer suffisant', description: '3 pages comparent Khepra aux Big Four sans le disclaimer "benchmark méthodologique uniquement".', location: 'Pages /pourquoi-khepra, /approche, /expertises', detectedBy: 'KOS Legal Compliance Agent', detectedAt: '2026-06-12T09:00:00Z', status: 'in_progress', autoFixAvailable: true, estimatedEffort: '30 min', relatedBlocks: ['content-blog'] },
      { id: 'LEG-002', severity: 'major', title: 'Formulaire de contact sans case à cocher consentement RGPD', description: '2 formulaires capturent des données personnelles sans consentement explicite RGPD.', location: '/contact, /diagnostic-flash', detectedBy: 'KOS Legal Compliance Agent', detectedAt: '2026-06-11T14:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '45 min', relatedBlocks: ['forms'] },
      { id: 'LEG-003', severity: 'minor', title: 'Politique de confidentialité non mise à jour depuis 3 mois', description: 'Dernière révision : mars 2026. La réglementation BCEAO a évolué depuis.', location: '/privacy', detectedBy: 'KOS Legal Compliance Agent', detectedAt: '2026-06-13T10:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '2h', relatedBlocks: [] },
      { id: 'LEG-004', severity: 'minor', title: 'Bannière cookies : pas de refus granulaire', description: 'Acceptation tout ou rien. Le RGPD exige un refus par catégorie (analytique, marketing, etc.)', location: 'CookieConsent component', detectedBy: 'KOS Legal Compliance Agent', detectedAt: '2026-06-12T16:00:00Z', status: 'fixed', autoFixAvailable: true, estimatedEffort: '2h', relatedBlocks: [] },
      { id: 'LEG-005', severity: 'minor', title: '2 affirmations non sourcées dans les white papers', description: 'Statistiques sans référence dans le white paper ESG 2026. Risque de contestation.', location: 'White Paper ESG Afrique', detectedBy: 'KOS Reputation Agent', detectedAt: '2026-06-13T22:00:00Z', status: 'open', autoFixAvailable: false, estimatedEffort: '1h', relatedBlocks: ['content-blog'] },
    ],
  },
];

export const AGENT_CATALOG = [
  { id: 'governance', name: 'KOS Governance Agent', icon: 'ri-government-line', color: '#4F46E5', status: 'active', blocksAssigned: 2, totalScans: 47, totalFixes: 38 },
  { id: 'seo', name: 'KOS SEO Agent', icon: 'ri-search-line', color: '#0D7B5F', status: 'active', blocksAssigned: 2, totalScans: 62, totalFixes: 45 },
  { id: 'geo', name: 'KOS GEO Agent', icon: 'ri-globe-line', color: '#0891B2', status: 'partial', blocksAssigned: 2, totalScans: 18, totalFixes: 7 },
  { id: 'content', name: 'KOS Content Agent', icon: 'ri-quill-pen-line', color: '#4A7A1E', status: 'active', blocksAssigned: 2, totalScans: 55, totalFixes: 32 },
  { id: 'thinktank', name: 'KOS Think Tank Agent', icon: 'ri-lightbulb-line', color: '#9B7B2C', status: 'partial', blocksAssigned: 1, totalScans: 15, totalFixes: 6 },
  { id: 'legal', name: 'KOS Legal Compliance Agent', icon: 'ri-scales-3-line', color: '#8B3040', status: 'active', blocksAssigned: 2, totalScans: 38, totalFixes: 31 },
  { id: 'reputation', name: 'KOS Reputation Agent', icon: 'ri-shield-star-line', color: '#6B4A3A', status: 'partial', blocksAssigned: 3, totalScans: 28, totalFixes: 14 },
  { id: 'security', name: 'KOS Security Agent', icon: 'ri-shield-flash-line', color: '#C2410C', status: 'active', blocksAssigned: 2, totalScans: 44, totalFixes: 40 },
  { id: 'quality', name: 'KOS Quality Agent', icon: 'ri-verified-badge-line', color: '#5B21B6', status: 'active', blocksAssigned: 4, totalScans: 72, totalFixes: 55 },
];

export const EXECUTION_LOGS: ExecutionLog[] = [
  { id: 'LOG-001', blockId: 'securite-owasp', blockName: 'Sécurité OWASP', agentId: 'security', agentName: 'KOS Security Agent', action: 'Déploiement Content-Security-Policy avec nonces', detectionsFixed: 3, timestamp: '2026-06-13T04:15:00Z', status: 'success', details: 'CSP déployé sur toutes les pages. Nonces générés automatiquement. Scripts inline validés.' },
  { id: 'LOG-002', blockId: 'seo-technique', blockName: 'SEO Technique', agentId: 'seo', agentName: 'KOS SEO Agent', action: 'Ajout balises canonical sur 12 pages', detectionsFixed: 12, timestamp: '2026-06-13T03:30:00Z', status: 'success', details: '12/15 canonical ajoutés. 3 pages restantes nécessitent validation manuelle (pages dynamiques outils).' },
  { id: 'LOG-003', blockId: 'content-blog', blockName: 'Qualité Contenu', agentId: 'content', agentName: 'KOS Content Agent', action: 'Uniformisation ton institutionnel', detectionsFixed: 8, timestamp: '2026-06-12T22:00:00Z', status: 'success', details: '30 articles corrigés. Ton aligné sur le standard Big Four. Expressions familières remplacées.' },
  { id: 'LOG-004', blockId: 'social-media-linkedin', blockName: 'Réseaux Sociaux', agentId: 'reputation', agentName: 'KOS Reputation Agent', action: 'Ajout OG tags sur 18 pages', detectionsFixed: 18, timestamp: '2026-06-12T18:30:00Z', status: 'partial', details: '18/25 pages corrigées. 7 pages utilisent des templates dynamiques nécessitant une refonte partielle.' },
  { id: 'LOG-005', blockId: 'legal-compliance', blockName: 'Conformité Légale', agentId: 'legal', agentName: 'KOS Legal Compliance Agent', action: 'Ajout disclaimer Big Four sur 3 pages', detectionsFixed: 3, timestamp: '2026-06-12T15:00:00Z', status: 'success', details: 'Disclaimers "benchmark méthodologique uniquement" ajoutés. Validation juridique interne effectuée.' },
  { id: 'LOG-006', blockId: 'performance-core-web-vitals', blockName: 'Core Web Vitals', agentId: 'seo', agentName: 'KOS SEO Agent', action: 'Cache-Control headers sur assets statiques', detectionsFixed: 2, timestamp: '2026-06-12T10:00:00Z', status: 'success', details: 'max-age=31536000 appliqué sur CSS/JS/images. Revalidation activée.' },
  { id: 'LOG-007', blockId: 'content-blog', blockName: 'Qualité Contenu', agentId: 'content', agentName: 'KOS Content Agent', action: 'Ajout CTA contextuels sur 15 articles', detectionsFixed: 15, timestamp: '2026-06-14T01:00:00Z', status: 'success', details: 'CTA personnalisés par thématique. Taux de clic estimé : 4.2% (vs 0.3% générique).' },
];

export const SCAN_STATS = {
  totalBlocks: 6,
  blocksHealthy: 2,
  blocksWarning: 3,
  blocksCritical: 1,
  totalDetections: 87,
  criticalOpen: 3,
  majorOpen: 16,
  minorOpen: 43,
  totalFixed: 34,
  totalAgents: 9,
  agentsActive: 6,
  agentsPartial: 3,
  autoFixable: 48,
  requireManual: 39,
  lastFullScan: '2026-06-14T05:00:00Z',
  nextFullScan: '2026-06-14T09:00:00Z',
  estimatedTotalEffort: '78h',
};