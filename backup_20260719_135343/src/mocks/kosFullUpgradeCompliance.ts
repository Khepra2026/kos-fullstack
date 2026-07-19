// ============================================================
// KOS Full Upgrade & Regulatory Compliance Correction — Mock Data
// 15 Gaps · 14 Tickets · 8 Engines Upgraded · 3 Vagues
// ============================================================

export interface UpgradeGap {
  id: string;
  componentType: string;
  componentName: string;
  description: string;
  currentState: string;
  targetState: string;
  rootCause: string;
  impactedSystems: string;
  strategy: string;
  status: 'open' | 'in_progress' | 'resolved';
  resolutionSteps: string;
  kpiImpact: string;
  category: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
  vague: number;
  eta: string;
  progress: number;
}

export interface CorrectionTicket {
  id: string;
  moduleId: string;
  title: string;
  rootCause: string;
  impact: string;
  seoImpact: string;
  businessImpact: string;
  status: 'open' | 'in_progress' | 'done';
  eta: string;
  correction: string;
  validationMethod: string;
  estimatedGain: string;
  ticketId: string;
  priority: 'critical' | 'high' | 'medium';
  vague: number;
  progress: number;
}

export interface UpgradeEngine {
  id: string;
  name: string;
  path: string;
  icon: string;
  color: string;
  agentsCount: number;
  activeAgents: number;
  partialAgents: number;
  gapAgents: number;
  cpuUsage: number;
  memoryUsage: number;
  status: 'healthy' | 'degraded' | 'critical';
  upgradeTarget: string;
}

export interface UpgradeWave {
  id: number;
  name: string;
  deadline: string;
  gapsCount: number;
  ticketsCount: number;
  status: 'pending' | 'active' | 'done';
  description: string;
}

export interface UpgradeStats {
  totalGaps: number;
  criticalGaps: number;
  highGaps: number;
  mediumGaps: number;
  resolvedGaps: number;
  totalTickets: number;
  criticalTickets: number;
  highTickets: number;
  mediumTickets: number;
  doneTickets: number;
  totalEngines: number;
  healthyEngines: number;
  degradedEngines: number;
  criticalEngines: number;
  globalScore: number;
  targetScore: number;
  complianceScore: number;
  targetComplianceScore: number;
  totalEta: string;
  totalGain: string;
}

// ============================================================
// 15 REGULATORY & COMPLIANCE GAPS
// ============================================================
export const UPGRADE_GAPS: UpgradeGap[] = [
  {
    id: 'GAP-REG-001', componentType: 'seo', componentName: 'Meta Descriptions Manquantes',
    description: '42 pages sans meta description conforme aux standards SEO — CTR dégradé, pages mal présentées dans les SERP.',
    currentState: '42 pages sans description', targetState: '100% pages avec meta description optimisée',
    rootCause: 'Absence de génération automatique lors du déploiement', impactedSystems: 'SEO, Indexation, CTR',
    strategy: 'Activer Content Agent + déploiement automatique meta', status: 'open',
    resolutionSteps: '1. Scanner toutes les pages\n2. Générer meta descriptions optimisées\n3. Déployer via correction engine',
    kpiImpact: '+35% CTR estimé', category: 'SEO', criticality: 'critical', vague: 1, eta: '3h', progress: 0,
  },
  {
    id: 'GAP-REG-002', componentType: 'security', componentName: 'CSP Header Absent',
    description: 'Content-Security-Policy manquant sur 175 pages — exposition XSS, score OWASP bloqué à 82/100.',
    currentState: 'CSP absent', targetState: 'CSP strict avec nonces',
    rootCause: 'Configuration Netlify incomplète', impactedSystems: 'Sécurité, OWASP, Conformité ISO 27001',
    strategy: 'Déployer CSP via _headers + edge function', status: 'in_progress',
    resolutionSteps: '1. Définir politique CSP\n2. Tester sur staging\n3. Déployer production',
    kpiImpact: '+13 pts score OWASP', category: 'Sécurité', criticality: 'critical', vague: 1, eta: '4h', progress: 25,
  },
  {
    id: 'GAP-REG-003', componentType: 'seo', componentName: 'Pages Orphelines',
    description: '12 pages sans lien interne entrant — gaspillage crawl budget, indexation bloquée.',
    currentState: '12 orphelines', targetState: '0 page orpheline',
    rootCause: 'Croissance non coordonnée du contenu', impactedSystems: 'SEO, Crawl Budget, Indexation',
    strategy: 'Maillage interne automatique', status: 'open',
    resolutionSteps: '1. Identifier pages mères\n2. Ajouter liens contextuels\n3. Vérifier indexation',
    kpiImpact: '+8% trafic organique', category: 'SEO', criticality: 'high', vague: 2, eta: '4h', progress: 0,
  },
  {
    id: 'GAP-REG-004', componentType: 'compliance', componentName: 'Regulatory Citations Non Vérifiées',
    description: '18 articles avec citations réglementaires non vérifiées par le Regulatory Scout — risque juridique, perte crédibilité.',
    currentState: '18 citations non vérifiées', targetState: '100% citations vérifiées',
    rootCause: 'Regulatory Scout non activé en continu', impactedSystems: 'Conformité, Crédibilité, Risque juridique',
    strategy: 'Activation Regulatory Scout hebdomadaire', status: 'open',
    resolutionSteps: '1. Lancer scan rétroactif\n2. Corriger citations obsolètes\n3. Activer vérification continue',
    kpiImpact: 'Risque juridique éliminé', category: 'Conformité', criticality: 'critical', vague: 1, eta: '3h', progress: 0,
  },
  {
    id: 'GAP-REG-005', componentType: 'accessibility', componentName: 'Contraste Insuffisant',
    description: '24 pages avec ratio de contraste inférieur à WCAG AA — non-conformité accessibilité.',
    currentState: '24 pages non conformes', targetState: '100% WCAG AA',
    rootCause: 'Palette de couleurs non auditée', impactedSystems: 'Accessibilité, SEO, UX',
    strategy: 'Ajustement palette + audit automatique', status: 'open',
    resolutionSteps: '1. Audit contraste global\n2. Ajuster tokens CSS\n3. Validation automatique',
    kpiImpact: '+5 pts score accessibilité', category: 'Accessibilité', criticality: 'high', vague: 2, eta: '5h', progress: 0,
  },
  {
    id: 'GAP-REG-006', componentType: 'security', componentName: 'Referrer-Policy Unsafe',
    description: 'Referrer-Policy configuré à unsafe-url — fuite de données de référencement.',
    currentState: 'unsafe-url', targetState: 'strict-origin-when-cross-origin',
    rootCause: 'Configuration par défaut non modifiée', impactedSystems: 'Sécurité, Privacy, Conformité',
    strategy: 'Correction header _headers', status: 'open',
    resolutionSteps: '1. Modifier _headers\n2. Tester leakage\n3. Déployer',
    kpiImpact: 'Fuite données stoppée', category: 'Sécurité', criticality: 'critical', vague: 1, eta: '1h', progress: 0,
  },
  {
    id: 'GAP-REG-007', componentType: 'compliance', componentName: 'Mentions Légales Incomplètes',
    description: '8 pages sans mentions légales complètes (RGPD/OHADA) — non-conformité juridique.',
    currentState: '8 pages incomplètes', targetState: '100% conformes',
    rootCause: 'Template non mis à jour', impactedSystems: 'Juridique, Conformité, Confiance',
    strategy: 'Mise à jour template + déploiement', status: 'open',
    resolutionSteps: '1. Audit mentions légales\n2. Compléter template\n3. Déployer globalement',
    kpiImpact: 'Conformité RGPD/OHADA', category: 'Conformité', criticality: 'high', vague: 2, eta: '2h', progress: 0,
  },
  {
    id: 'GAP-REG-008', componentType: 'performance', componentName: 'Core Web Vitals Dégradés',
    description: 'LCP > 3s sur 15 pages outils interactifs — scripts lourds non optimisés.',
    currentState: 'LCP 3.2s', targetState: 'LCP < 2.5s',
    rootCause: 'Scripts lourds non optimisés', impactedSystems: 'Performance, SEO, UX',
    strategy: 'Optimisation lazy loading + code splitting', status: 'open',
    resolutionSteps: '1. Audit performance\n2. Implémenter lazy loading\n3. Code splitting',
    kpiImpact: '+15 pts PageSpeed', category: 'Performance', criticality: 'high', vague: 3, eta: '6h', progress: 0,
  },
  {
    id: 'GAP-REG-009', componentType: 'seo', componentName: 'Sitemap Non Exhaustif',
    description: 'Sitemap manque 35 pages récentes — pages non découvertes par les moteurs.',
    currentState: '312 pages indexées', targetState: '350 pages indexées',
    rootCause: 'Génération sitemap non automatisée', impactedSystems: 'SEO, Indexation, Découverte',
    strategy: 'Automatisation sitemap dynamique', status: 'open',
    resolutionSteps: '1. Scanner nouvelles pages\n2. Régénérer sitemap\n3. Soumettre GSC',
    kpiImpact: '+38 pages indexées', category: 'SEO', criticality: 'medium', vague: 3, eta: '1h', progress: 0,
  },
  {
    id: 'GAP-REG-010', componentType: 'compliance', componentName: 'Cookie Consent Non Conforme',
    description: 'Bannière cookie sans refus granulaire — non-conformité RGPD.',
    currentState: 'Consentement binaire', targetState: 'Consentement granulaire par catégorie',
    rootCause: 'Solution cookie basique', impactedSystems: 'Conformité, RGPD, Confiance',
    strategy: 'Mise à jour Cookie Consent', status: 'open',
    resolutionSteps: '1. Implémenter catégories\n2. Ajouter refus granulaire\n3. Tester conformité',
    kpiImpact: 'Conformité RGPD', category: 'Conformité', criticality: 'high', vague: 3, eta: '3h', progress: 0,
  },
  {
    id: 'GAP-REG-011', componentType: 'content', componentName: 'FAQ Schema Manquant',
    description: '60 articles sans FAQ Schema.org — Featured Snippets manqués, visibilité GEO réduite.',
    currentState: '15 FAQs balisées', targetState: '60 FAQs balisées',
    rootCause: 'Génération manuelle non scalable', impactedSystems: 'SEO, GEO, Featured Snippets',
    strategy: 'Auto-génération FAQ Schema', status: 'open',
    resolutionSteps: '1. Scanner articles\n2. Générer FAQ Schema\n3. Injecter automatiquement',
    kpiImpact: '+25 Featured Snippets', category: 'Contenu', criticality: 'high', vague: 2, eta: '4h', progress: 15,
  },
  {
    id: 'GAP-REG-012', componentType: 'security', componentName: 'HSTS Manquant',
    description: 'Header Strict-Transport-Security absent — downgrade attack possible.',
    currentState: 'HSTS absent', targetState: 'HSTS max-age=31536000',
    rootCause: 'Configuration serveur incomplète', impactedSystems: 'Sécurité, HTTPS, Conformité',
    strategy: 'Ajout HSTS header', status: 'open',
    resolutionSteps: '1. Ajouter HSTS\n2. Tester redirect HTTPS\n3. Valider',
    kpiImpact: '+3 pts score sécurité', category: 'Sécurité', criticality: 'critical', vague: 1, eta: '30m', progress: 0,
  },
  {
    id: 'GAP-REG-013', componentType: 'seo', componentName: 'Canonical Manquantes',
    description: '15 pages sans balise canonical — risque duplicate content.',
    currentState: '15 sans canonical', targetState: '100% canonical présentes',
    rootCause: 'Génération page non standardisée', impactedSystems: 'SEO, Duplicate Content',
    strategy: 'Génération automatique canonical', status: 'in_progress',
    resolutionSteps: '1. Identifier pages\n2. Générer canonicals\n3. Déployer',
    kpiImpact: 'Élimination duplicate content', category: 'SEO', criticality: 'high', vague: 2, eta: '2h', progress: 40,
  },
  {
    id: 'GAP-REG-014', componentType: 'compliance', componentName: 'Regulatory Register Non À Jour',
    description: 'Regulatory Register avec 12 textes réglementaires obsolètes — non-conformité audits régulateurs.',
    currentState: '12 textes obsolètes', targetState: '100% textes à jour',
    rootCause: 'Veille réglementaire manuelle', impactedSystems: 'Conformité, Risque, Autorité',
    strategy: 'Activation veille automatisée', status: 'open',
    resolutionSteps: '1. Mettre à jour textes\n2. Activer veille auto\n3. Validation croisée',
    kpiImpact: 'Conformité réglementaire 100%', category: 'Conformité', criticality: 'critical', vague: 1, eta: '2h', progress: 0,
  },
  {
    id: 'GAP-REG-015', componentType: 'performance', componentName: 'Images Non Optimisées',
    description: '89 images > 500KB sans compression WebP — pages lourdes, LCP dégradé.',
    currentState: '89 images lourdes', targetState: '100% WebP < 200KB',
    rootCause: 'Pipeline image non activé', impactedSystems: 'Performance, Bande passante, SEO',
    strategy: 'Compression automatique WebP', status: 'open',
    resolutionSteps: '1. Scanner images\n2. Convertir WebP\n3. Mettre à jour references',
    kpiImpact: '-60% bande passante', category: 'Performance', criticality: 'medium', vague: 3, eta: '4h', progress: 0,
  },
];

// ============================================================
// 14 CORRECTION TICKETS
// ============================================================
export const UPGRADE_TICKETS: CorrectionTicket[] = [
  {
    id: 'TKT-UPG-001', moduleId: 'SEC-HEADERS', title: 'Déploiement CSP + HSTS + Referrer-Policy',
    rootCause: 'Configuration serveur incomplète', impact: '175 pages exposées XSS, fuite données referrer',
    seoImpact: '+13 pts OWASP, +3 pts sécurité', businessImpact: 'Réduction risque cyber, conformité ISO 27001',
    status: 'in_progress', eta: '4h',
    correction: 'Déploiement CSP strict via _headers Netlify + HSTS + Referrer-Policy strict-origin',
    validationMethod: 'Scan OWASP + headers check automatisé', estimatedGain: '+16 pts score sécurité global',
    ticketId: 'TKT-UPG-001', priority: 'critical', vague: 1, progress: 30,
  },
  {
    id: 'TKT-UPG-002', moduleId: 'REG-CITATIONS', title: 'Vérification 18 citations réglementaires',
    rootCause: 'Regulatory Scout non activé en continu', impact: 'Risque juridique, perte crédibilité',
    seoImpact: 'Autorité réglementaire renforcée', businessImpact: 'Confiance client, conformité audits',
    status: 'open', eta: '3h',
    correction: 'Lancer scan rétroactif + correction + activation continue',
    validationMethod: 'Regulatory Quality Assurance validation', estimatedGain: 'Risque juridique éliminé',
    ticketId: 'TKT-UPG-002', priority: 'critical', vague: 1, progress: 0,
  },
  {
    id: 'TKT-UPG-003', moduleId: 'REG-REGISTER', title: 'Mise à jour Regulatory Register',
    rootCause: 'Veille réglementaire manuelle', impact: '12 textes obsolètes, non-conformité',
    seoImpact: 'Autorité réglementaire', businessImpact: 'Conformité audits régulateurs',
    status: 'open', eta: '2h',
    correction: 'Mise à jour 12 textes + activation veille automatisée',
    validationMethod: 'Cross-check BCEAO/COBAC/OHADA', estimatedGain: 'Regulatory Register 100% à jour',
    ticketId: 'TKT-UPG-003', priority: 'critical', vague: 1, progress: 0,
  },
  {
    id: 'TKT-UPG-004', moduleId: 'GEO-ACTIVATION', title: 'Activation 5 agents GEO (ChatGPT/Claude/Gemini/Perplexity/Copilot)',
    rootCause: 'Agents non déployés — chartes manquantes', impact: 'Invisibilité sur moteurs IA (300M+ utilisateurs)',
    seoImpact: '+250% couverture IA générative', businessImpact: 'Acquisition trafic IA, autorité digitale',
    status: 'open', eta: '16h',
    correction: 'Créer chartes + déployer 5 agents + activer auto-deploy',
    validationMethod: 'GEO Visibility scan multi-moteurs', estimatedGain: '+350% citations IA',
    ticketId: 'TKT-UPG-004', priority: 'critical', vague: 2, progress: 0,
  },
  {
    id: 'TKT-UPG-005', moduleId: 'SEO-ORPHELINS', title: 'Correction 12 pages orphelines',
    rootCause: 'Croissance non coordonnée du contenu', impact: 'Crawl budget gaspillé, indexation bloquée',
    seoImpact: '+12 pages indexables, +8% trafic', businessImpact: 'Visibilité organique accrue',
    status: 'open', eta: '4h',
    correction: 'Identifier pages mères + ajouter liens contextuels',
    validationMethod: 'Crawl internal links check', estimatedGain: '+8% trafic organique estimé',
    ticketId: 'TKT-UPG-005', priority: 'high', vague: 2, progress: 0,
  },
  {
    id: 'TKT-UPG-006', moduleId: 'SEO-META', title: 'Génération 42 meta descriptions',
    rootCause: 'Absence de génération automatique', impact: 'CTR réduit, pages mal présentées',
    seoImpact: '+35% CTR estimé', businessImpact: 'Trafic organique qualifié',
    status: 'open', eta: '3h',
    correction: 'Scanner + générer + déployer meta descriptions optimisées',
    validationMethod: 'SEO audit check', estimatedGain: '+35% CTR',
    ticketId: 'TKT-UPG-006', priority: 'high', vague: 1, progress: 0,
  },
  {
    id: 'TKT-UPG-007', moduleId: 'A11Y-CONTRASTE', title: 'Correction contraste 24 pages',
    rootCause: 'Palette non auditée', impact: 'Non-conformité WCAG AA',
    seoImpact: '+5 pts accessibilité', businessImpact: 'Inclusion, conformité',
    status: 'open', eta: '5h',
    correction: 'Ajustement tokens CSS + audit automatique',
    validationMethod: 'WCAG AA validator', estimatedGain: '+5 pts score accessibilité',
    ticketId: 'TKT-UPG-007', priority: 'high', vague: 2, progress: 0,
  },
  {
    id: 'TKT-UPG-008', moduleId: 'LEGAL-MENTIONS', title: 'Complétion 8 pages mentions légales',
    rootCause: 'Template non mis à jour', impact: 'Non-conformité RGPD/OHADA',
    seoImpact: 'Conformité juridique', businessImpact: 'Confiance, conformité auditeurs',
    status: 'open', eta: '2h',
    correction: 'Audit + complétion template + déploiement global',
    validationMethod: 'Revue juridique', estimatedGain: 'Conformité RGPD/OHADA 100%',
    ticketId: 'TKT-UPG-008', priority: 'high', vague: 2, progress: 0,
  },
  {
    id: 'TKT-UPG-009', moduleId: 'CWV-OPTIM', title: 'Optimisation Core Web Vitals 15 pages',
    rootCause: 'Scripts lourds non optimisés', impact: 'LCP > 3s, INP dégradé',
    seoImpact: '+15 pts PageSpeed', businessImpact: 'UX améliorée, SEO boost',
    status: 'open', eta: '6h',
    correction: 'Lazy loading + code splitting + compression',
    validationMethod: 'Core Web Vitals check', estimatedGain: '+15 pts PageSpeed',
    ticketId: 'TKT-UPG-009', priority: 'high', vague: 3, progress: 0,
  },
  {
    id: 'TKT-UPG-010', moduleId: 'COOKIE-CONSENT', title: 'Mise à jour Cookie Consent granulaire',
    rootCause: 'Solution cookie basique', impact: 'Non-conformité RGPD',
    seoImpact: 'Conformité privacy', businessImpact: 'Confiance utilisateur',
    status: 'open', eta: '3h',
    correction: 'Implémentation catégories + refus granulaire',
    validationMethod: 'Test conformité RGPD', estimatedGain: 'Conformité RGPD',
    ticketId: 'TKT-UPG-010', priority: 'high', vague: 3, progress: 0,
  },
  {
    id: 'TKT-UPG-011', moduleId: 'FAQ-SCHEMA', title: 'Déploiement FAQ Schema 45 articles',
    rootCause: 'Génération manuelle', impact: 'Featured Snippets manqués',
    seoImpact: '+25 Featured Snippets', businessImpact: 'Visibilité SERP',
    status: 'open', eta: '4h',
    correction: 'Scan + génération FAQ Schema + injection',
    validationMethod: 'Schema.org validator', estimatedGain: '+25 Featured Snippets',
    ticketId: 'TKT-UPG-011', priority: 'high', vague: 2, progress: 15,
  },
  {
    id: 'TKT-UPG-012', moduleId: 'CANONICAL', title: 'Correction 15 canonical manquantes',
    rootCause: 'Génération page non standardisée', impact: 'Duplicate content risk',
    seoImpact: 'Élimination duplicate content', businessImpact: 'SEO santé',
    status: 'in_progress', eta: '2h',
    correction: 'Génération automatique canonicals + déploiement',
    validationMethod: 'Crawl validation', estimatedGain: 'Duplicate content éliminé',
    ticketId: 'TKT-UPG-012', priority: 'high', vague: 2, progress: 45,
  },
  {
    id: 'TKT-UPG-013', moduleId: 'SITEMAP', title: 'Complétion sitemap 35 pages',
    rootCause: 'Génération non automatisée', impact: 'Pages non découvertes',
    seoImpact: '+38 pages indexées', businessImpact: 'Indexation complète',
    status: 'open', eta: '1h',
    correction: 'Scan + régénération sitemap + soumission GSC',
    validationMethod: 'GSC validation', estimatedGain: '+38 pages indexées',
    ticketId: 'TKT-UPG-013', priority: 'medium', vague: 3, progress: 0,
  },
  {
    id: 'TKT-UPG-014', moduleId: 'IMAGES-OPTIM', title: 'Optimisation 89 images > 500KB',
    rootCause: 'Pipeline image non activé', impact: 'Pages lourdes, LCP dégradé',
    seoImpact: '-60% bande passante', businessImpact: 'Performance, UX',
    status: 'open', eta: '4h',
    correction: 'Scan + conversion WebP + mise à jour references',
    validationMethod: 'Performance audit', estimatedGain: '-60% bande passante',
    ticketId: 'TKT-UPG-014', priority: 'medium', vague: 3, progress: 0,
  },
];

// ============================================================
// 8 UPGRADE ENGINES
// ============================================================
export const UPGRADE_ENGINES: UpgradeEngine[] = [
  { id: 'orchestrator-engine', name: 'Orchestrator Engine™', path: '/kos-orchestrator-engine', icon: 'ri-git-branch-line', color: '#4F46E5', agentsCount: 9, activeAgents: 7, partialAgents: 2, gapAgents: 0, cpuUsage: 38, memoryUsage: 32, status: 'healthy', upgradeTarget: 'Activation GEO Agent + Think Tank Agent' },
  { id: 'unified-autopilot', name: 'Unified Autopilot™', path: '/kos-unified-autopilot', icon: 'ri-cpu-line', color: '#86BC25', agentsCount: 9, activeAgents: 5, partialAgents: 4, gapAgents: 0, cpuUsage: 58, memoryUsage: 62, status: 'degraded', upgradeTarget: 'Activation GEO Visibility + AEO + Content Strategy' },
  { id: 'quality-system', name: 'Quality System™', path: '/kos-autonomous-quality-system', icon: 'ri-shield-check-line', color: '#8B3040', agentsCount: 6, activeAgents: 5, partialAgents: 1, gapAgents: 0, cpuUsage: 30, memoryUsage: 25, status: 'healthy', upgradeTarget: 'Activation Content Quality + Reputation agents' },
  { id: 'growth-orchestrator', name: 'Growth Orchestrator™', path: '/kos-growth-orchestrator', icon: 'ri-radar-line', color: '#0D7B5F', agentsCount: 24, activeAgents: 7, partialAgents: 9, gapAgents: 8, cpuUsage: 48, memoryUsage: 52, status: 'critical', upgradeTarget: 'Déploiement 8 agents GAP + activation auto-deploy' },
  { id: 'content-correction', name: 'Content Correction™', path: '/kos-content-correction-engine', icon: 'ri-quill-pen-line', color: '#4A7A1E', agentsCount: 3, activeAgents: 2, partialAgents: 1, gapAgents: 0, cpuUsage: 24, memoryUsage: 28, status: 'healthy', upgradeTarget: 'Activation Conversion Optimizer' },
  { id: 'corrective-execution', name: 'Corrective Execution™', path: '/kos-corrective-execution-engine', icon: 'ri-tools-line', color: '#E8C547', agentsCount: 3, activeAgents: 2, partialAgents: 1, gapAgents: 0, cpuUsage: 20, memoryUsage: 22, status: 'healthy', upgradeTarget: 'Activation Post-Correction Validator' },
  { id: 'cyber-tech', name: 'Cyber & Tech Correction™', path: '/kos-cyber-tech-correction-engine', icon: 'ri-shield-flash-line', color: '#C05A3A', agentsCount: 3, activeAgents: 2, partialAgents: 1, gapAgents: 0, cpuUsage: 40, memoryUsage: 44, status: 'degraded', upgradeTarget: 'Activation Headers Compliance + Threat Monitor' },
  { id: 'digital-growth', name: 'Digital Growth™', path: '/kos-digital-growth-correction-engine', icon: 'ri-line-chart-line', color: '#9B7B2C', agentsCount: 3, activeAgents: 2, partialAgents: 1, gapAgents: 0, cpuUsage: 26, memoryUsage: 30, status: 'degraded', upgradeTarget: 'Activation GEO Corrector + Analytics Optimizer' },
];

// ============================================================
// 3 UPGRADE WAVES
// ============================================================
export const UPGRADE_WAVES: UpgradeWave[] = [
  { id: 1, name: 'Vague 1 — Corrections Critiques Immédiates', deadline: '72h', gapsCount: 6, ticketsCount: 4, status: 'active', description: 'Sécurité (CSP, HSTS, Referrer-Policy) + Conformité (Citations, Regulatory Register) + SEO (Meta Descriptions). Actions P0 critiques.' },
  { id: 2, name: 'Vague 2 — Upgrade Structurel', deadline: '2 semaines', gapsCount: 6, ticketsCount: 7, status: 'pending', description: 'Activation agents GEO + Orphelins + Accessibilité + Mentions légales + Canonical + FAQ Schema. Actions P1 prioritaires.' },
  { id: 3, name: 'Vague 3 — Optimisation Continue', deadline: '1 mois', gapsCount: 3, ticketsCount: 3, status: 'pending', description: 'Core Web Vitals + Cookie Consent + Sitemap + Images. Actions P2 stratégiques.' },
];

// ============================================================
// GLOBAL STATS
// ============================================================
export const UPGRADE_STATS: UpgradeStats = {
  totalGaps: 15,
  criticalGaps: 6,
  highGaps: 7,
  mediumGaps: 2,
  resolvedGaps: 0,
  totalTickets: 14,
  criticalTickets: 4,
  highTickets: 8,
  mediumTickets: 2,
  doneTickets: 0,
  totalEngines: 8,
  healthyEngines: 4,
  degradedEngines: 3,
  criticalEngines: 1,
  globalScore: 6.8,
  targetScore: 9.5,
  complianceScore: 62,
  targetComplianceScore: 98,
  totalEta: '52h',
  totalGain: 'Conformité 98% · +38 pages indexées · +350% couverture IA · Score global 9.5/10',
};



