// ═══════════════════════════════════════════════════════════════════
// KOS Total System Scan™ — Scanner Mère du Système v1.0
// Audit 360° Big Four · 8 Dimensions · 10 Domaines Maturité
// Programmation en Blocs de Tâches Exécutables
// ═══════════════════════════════════════════════════════════════════

// ─── TYPES ───────────────────────────────────────────────────────────

export type ScanSeverity = 'critical' | 'major' | 'minor' | 'info' | 'excellence';
export type ScanDimension = 'infrastructure' | 'agents' | 'performance' | 'compliance' | 'data' | 'growth' | 'bigfour' | 'codebase';
export type FindingStatus = 'open' | 'in_progress' | 'resolved' | 'programmed';
export type BlockStatus = 'pending' | 'in_progress' | 'completed' | 'awaiting_approval';
export type BlockPriority = 'P0_critical' | 'P1_high' | 'P2_medium' | 'P3_longterm';

export interface ScanFinding {
  finding_id: string;
  dimension: ScanDimension;
  system_component: string;
  severity: ScanSeverity;
  title: string;
  description: string;
  metric: string;
  current_value: string;
  target_value: string;
  agent_assigned: string;
  auto_fixable: boolean;
  effort_estimate: string;
  impact_estimate: string;
  status: FindingStatus;
  programmed_in_block?: string;
}

export interface DimensionSummary {
  dimension: ScanDimension;
  label: string;
  icon: string;
  color: string;
  systems_scanned: number;
  total_findings: number;
  critical: number;
  major: number;
  minor: number;
  info: number;
  excellence: number;
  auto_fixable: number;
  health_score: number;
  status: 'optimal' | 'stable' | 'degraded' | 'critical';
}

export interface BigFourDomainAssessment {
  domain_id: string;
  domain_name: string;
  icon: string;
  color: string;
  score_actuel: number;
  score_cible: number;
  ecart: number;
  standard_reference: string;
  gap_analysis: string;
  top_findings: string[];
  kpi_keys: { label: string; value: number; target: number }[];
}

export interface TaskBlock {
  block_id: string;
  block_name: string;
  priority: BlockPriority;
  description: string;
  target_dimensions: ScanDimension[];
  target_domains: string[];
  total_actions: number;
  critical_actions: number;
  major_actions: number;
  auto_fixable: number;
  estimated_effort: string;
  estimated_budget_fcfa: string;
  global_impact: string;
  status: BlockStatus;
  deadline_recommendation: string;
  assigned_to: string;
  findings: string[];
}

export interface SystemScanReport {
  scan_id: string;
  started_at: string;
  completed_at: string;
  total_duration_seconds: number;
  total_systems_scanned: number;
  total_findings: number;
  findings_critical: number;
  findings_major: number;
  findings_minor: number;
  findings_info: number;
  findings_excellence: number;
  auto_fixable_total: number;
  overall_health: number;
  overall_bigfour: number;
  dimensions: DimensionSummary[];
  bigfour_domains: BigFourDomainAssessment[];
  task_blocks: TaskBlock[];
  findings: ScanFinding[];
  summary_text: string;
  next_recommended_action: string;
}

// ─── DIMENSION SUMMARIES ─────────────────────────────────────────────

export const SCAN_DIMENSION_SUMMARIES: DimensionSummary[] = [
  {
    dimension: 'infrastructure',
    label: 'Infra & Sécurité',
    icon: 'ri-server-line',
    color: '#C2410C',
    systems_scanned: 32,
    total_findings: 18,
    critical: 2,
    major: 5,
    minor: 7,
    info: 2,
    excellence: 2,
    auto_fixable: 9,
    health_score: 87,
    status: 'stable',
  },
  {
    dimension: 'agents',
    label: 'Agents & Edge Functions',
    icon: 'ri-robot-2-line',
    color: '#5B21B6',
    systems_scanned: 174,
    total_findings: 12,
    critical: 1,
    major: 3,
    minor: 5,
    info: 1,
    excellence: 2,
    auto_fixable: 4,
    health_score: 91,
    status: 'optimal',
  },
  {
    dimension: 'performance',
    label: 'Performance & SEO',
    icon: 'ri-speed-up-line',
    color: '#9B7B2C',
    systems_scanned: 14,
    total_findings: 15,
    critical: 2,
    major: 4,
    minor: 6,
    info: 2,
    excellence: 1,
    auto_fixable: 8,
    health_score: 82,
    status: 'degraded',
  },
  {
    dimension: 'compliance',
    label: 'Conformité & Régulation',
    icon: 'ri-scales-3-line',
    color: '#8B3040',
    systems_scanned: 18,
    total_findings: 14,
    critical: 1,
    major: 4,
    minor: 6,
    info: 2,
    excellence: 1,
    auto_fixable: 5,
    health_score: 85,
    status: 'stable',
  },
  {
    dimension: 'data',
    label: 'Data & Intelligence',
    icon: 'ri-database-2-line',
    color: '#0D7B5F',
    systems_scanned: 22,
    total_findings: 10,
    critical: 0,
    major: 3,
    minor: 5,
    info: 1,
    excellence: 1,
    auto_fixable: 5,
    health_score: 89,
    status: 'stable',
  },
  {
    dimension: 'growth',
    label: 'Croissance & CRM',
    icon: 'ri-rocket-line',
    color: '#4A7A1E',
    systems_scanned: 16,
    total_findings: 11,
    critical: 1,
    major: 3,
    minor: 5,
    info: 1,
    excellence: 1,
    auto_fixable: 5,
    health_score: 84,
    status: 'stable',
  },
  {
    dimension: 'bigfour',
    label: 'Maturité Big Four',
    icon: 'ri-verified-badge-line',
    color: '#4F46E5',
    systems_scanned: 10,
    total_findings: 20,
    critical: 1,
    major: 5,
    minor: 8,
    info: 4,
    excellence: 2,
    auto_fixable: 8,
    health_score: 88,
    status: 'stable',
  },
  {
    dimension: 'codebase',
    label: 'Codebase & Build',
    icon: 'ri-code-s-slash-line',
    color: '#0891B2',
    systems_scanned: 8,
    total_findings: 12,
    critical: 1,
    major: 3,
    minor: 5,
    info: 2,
    excellence: 1,
    auto_fixable: 6,
    health_score: 83,
    status: 'degraded',
  },
];

// ─── BIG FOUR DOMAIN ASSESSMENTS ─────────────────────────────────────

export const SCAN_BIGFOUR_DOMAINS: BigFourDomainAssessment[] = [
  {
    domain_id: 'gouvernance',
    domain_name: 'Gouvernance',
    icon: 'ri-government-line',
    color: '#4F46E5',
    score_actuel: 97,
    score_cible: 98,
    ecart: 1,
    standard_reference: 'ISO 37000:2021 · COSO 2013 · BCEAO 01-2017/CB · OHADA AUSCGIE',
    gap_analysis: 'Gouvernance 97/100 — quasi parfaite. Seul écart : rotation des mandats >24 mois non systématisée pour 2 missions actives. Comité audit externe opérationnel depuis Juin 2026. Registre conflits d\'intérêts digital déployé.',
    top_findings: ['Rotation des mandats >24 mois à systématiser (2 missions)', 'Registre conflits d\'intérêts — audit trimestriel à automatiser'],
    kpi_keys: [
      { label: 'Indépendance Board', value: 98, target: 98 },
      { label: 'Transparence', value: 99, target: 98 },
      { label: 'Conformité COSO', value: 95, target: 95 },
      { label: 'Conflits d\'intérêts', value: 96, target: 98 },
    ],
  },
  {
    domain_id: 'qualite',
    domain_name: 'Qualité',
    icon: 'ri-shield-check-line',
    color: '#059669',
    score_actuel: 96,
    score_cible: 99,
    ecart: 3,
    standard_reference: 'ISO 9001:2015 · Big Four Quality Framework 12 contrôles · Peer Review Standards',
    gap_analysis: 'Qualité 96/100 — excellence maintenue. SLA revue qualité à 94% (cible 100%). Certification ISO 9001 en cours (audit Q3 2026). Benchmark automatique Big Four non déployé.',
    top_findings: ['SLA revue qualité <8h sur 100% des livrables (actuel 94%)', 'Certification ISO 9001 formelle à finaliser', 'Module benchmark Big Four à développer'],
    kpi_keys: [
      { label: 'Score qualité global', value: 96.2, target: 99 },
      { label: 'Taux rejet qualité', value: 2.4, target: 0.5 },
      { label: 'SLA revue qualité', value: 94, target: 100 },
      { label: 'Contrôles automatisés', value: 100, target: 100 },
    ],
  },
  {
    domain_id: 'ia',
    domain_name: 'Gouvernance IA',
    icon: 'ri-brain-line',
    color: '#7C3AED',
    score_actuel: 93,
    score_cible: 97,
    ecart: 4,
    standard_reference: 'ISO 42001:2023 · NIST AI RMF 1.0 · EU AI Act 2024 · OCDE AI Principles',
    gap_analysis: 'Gouvernance IA 93/100 — progrès significatifs depuis Juin (88→93). Digital Twin conforme EU AI Act Art.14. Sandboxing API externes 100%. Formation IA éthique à 78% du personnel (cible 100%).',
    top_findings: ['Formation IA éthique : 78% du personnel (cible 100%)', 'Certification ISO 42001 formelle à obtenir (audit Q4 2026)', '2 agents avec score biais >2.0 (cible <1.5)'],
    kpi_keys: [
      { label: 'Alignement ISO 42001', value: 92, target: 97 },
      { label: 'Alignement NIST AI RMF', value: 90, target: 95 },
      { label: 'Taux hallucination', value: 0.08, target: 0.05 },
      { label: 'Score biais global', value: 1.8, target: 1.5 },
    ],
  },
  {
    domain_id: 'conformite',
    domain_name: 'Conformité',
    icon: 'ri-file-search-line',
    color: '#DC2626',
    score_actuel: 94,
    score_cible: 98,
    ecart: 4,
    standard_reference: 'BCEAO · COBAC · OHADA · GAFI · RGPD · ISO 37301:2021',
    gap_analysis: 'Conformité 94/100 — couverture réglementaire solide. COBAC à 97% (cible 98%). ISO 37301 certification planifiée Q1 2027. Politique confidentialité à mettre à jour (dernière màj >120 jours).',
    top_findings: ['Politique confidentialité — dernière màj 128 jours (>90 cible)', 'Couverture GABAC à renforcer (3 textes manquants)', 'ISO 37301 — certification Q1 2027 à préparer'],
    kpi_keys: [
      { label: 'Couverture réglementaire', value: 97, target: 98 },
      { label: 'Délai détection alerte', value: 3.2, target: 2.0 },
      { label: 'Délai analyse impact', value: 5.5, target: 4.0 },
      { label: 'Matrices conformité', value: 96, target: 100 },
    ],
  },
  {
    domain_id: 'risques',
    domain_name: 'Risques',
    icon: 'ri-alert-line',
    color: '#D97706',
    score_actuel: 91,
    score_cible: 95,
    ecart: 4,
    standard_reference: 'ISO 31000:2018 · COSO ERM 2017 · BCEAO Dispositif Prudentiel · COBAC R-2024/01',
    gap_analysis: 'Risques 91/100 — forte progression (84→91). Cartographie 15 risques complète. PCA/PRA testé Juillet 2026. Comité risques trimestriel actif. KRIs : 18/20 couverts.',
    top_findings: ['2 KRIs non couverts (risque cyber APT, risque réputation viral)', 'Stress tests climatiques : scénarios à étendre (2→4)', 'Matrice corrélation risques à automatiser'],
    kpi_keys: [
      { label: 'Risques cartographiés', value: 15, target: 15 },
      { label: 'Score mitigation', value: 82, target: 90 },
      { label: 'Couverture KRIs', value: 90, target: 95 },
      { label: 'Tests PCA/PRA', value: 1, target: 2 },
    ],
  },
  {
    domain_id: 'cybersecurite',
    domain_name: 'Cybersécurité',
    icon: 'ri-shield-flash-line',
    color: '#C2410C',
    score_actuel: 93,
    score_cible: 97,
    ecart: 4,
    standard_reference: 'ISO 27001:2022 · NIST CSF 2.0 · OWASP Top 10 · Directive COBAC 2027',
    gap_analysis: 'Cybersécurité 93/100 — 114 contrôles ISO 27001 passés à 100%. SIEM déployé, MTTD 4.2min. Red Team Exercise Q4 2026 planifié. PCA/PRA testé semestriel. 2 endpoints API sans rate limiting.',
    top_findings: ['2 endpoints API sans rate limiting (risque DDoS)', 'Red Team Exercise Q4 2026 — à confirmer', 'Certificat SSL renouvellement dans 24 jours'],
    kpi_keys: [
      { label: 'Score ISO 27001', value: 100, target: 100 },
      { label: 'Score NIST CSF', value: 90, target: 95 },
      { label: 'MTTD (détection)', value: 4.2, target: 5 },
      { label: 'Red Team à jour', value: 0, target: 1 },
    ],
  },
  {
    domain_id: 'seo',
    domain_name: 'SEO & Visibilité',
    icon: 'ri-search-line',
    color: '#0891B2',
    score_actuel: 90,
    score_cible: 97,
    ecart: 7,
    standard_reference: 'Google Search Essentials · Core Web Vitals · EEAT · Schema.org · WCAG 2.1 AA',
    gap_analysis: 'SEO 90/100 — progression continue (85→90). DR 82 (cible 85). Core Web Vitals mobile 89% pass. 78 featured snippets (cible 150). 28 pages sans meta description optimisée.',
    top_findings: ['28 pages sans meta description optimisée', 'Core Web Vitals mobile — 11% pages "poor"', 'Featured snippets 78/150 — gap de 72', 'Domain Rating 82/85'],
    kpi_keys: [
      { label: 'Score SEO Global', value: 90, target: 97 },
      { label: 'Domain Rating', value: 82, target: 85 },
      { label: 'Featured Snippets', value: 78, target: 150 },
      { label: 'CWV Mobile Pass', value: 89, target: 98 },
    ],
  },
  {
    domain_id: 'geo',
    domain_name: 'GEO — IA Générative',
    icon: 'ri-robot-2-line',
    color: '#7C3AED',
    score_actuel: 92,
    score_cible: 96,
    ecart: 4,
    standard_reference: 'GEO Best Practices 2026 · GPTBot · Google-Extended · ClaudeBot · PerplexityBot',
    gap_analysis: 'GEO 92/100 — en forte hausse (82→92). Share of Voice 48% (cible 50%). ChatGPT 95%, Gemini 93%. Copilot 82% (cible 92%). 25 glossaires optimisés (cible 50). Stratégie contenu multimodal en cours.',
    top_findings: ['Copilot présence 82% (cible 92%) — contenu non optimisé Microsoft', 'Glossaires 25/50 — 25 termes manquants', 'Contenu multimodal (audio/vidéo IA) à déployer'],
    kpi_keys: [
      { label: 'Score GEO Global', value: 92, target: 96 },
      { label: 'Share of Voice', value: 48, target: 50 },
      { label: 'Citations IA/mois', value: 18000, target: 50000 },
      { label: 'Présence Copilot', value: 82, target: 92 },
    ],
  },
  {
    domain_id: 'recherche',
    domain_name: 'Recherche',
    icon: 'ri-book-open-line',
    color: '#4F46E5',
    score_actuel: 93,
    score_cible: 97,
    ecart: 4,
    standard_reference: 'Deloitte Research Center · PwC Strategy& · EY Knowledge · KPMG International',
    gap_analysis: 'Recherche 93/100 — progression (89→93). Chaire UCAD active (2 doctorants). 3 baromètres additionnels en développement. 800 citations académiques (cible 2 500). H-Index 22 (cible 35).',
    top_findings: ['Citations académiques 800/2500 — écart de 1700', 'H-Index institutionnel 22/35', '3 publications peer-reviewed en attente de review', 'Baromètre Inclusion Financière CEMAC — retard 45 jours'],
    kpi_keys: [
      { label: 'Citations académiques', value: 800, target: 2500 },
      { label: 'H-Index institutionnel', value: 22, target: 35 },
      { label: 'Baromètres actifs', value: 8, target: 10 },
      { label: 'Publications peer-reviewed', value: 2, target: 5 },
    ],
  },
  {
    domain_id: 'dev_commercial',
    domain_name: 'Business Dev',
    icon: 'ri-funds-line',
    color: '#059669',
    score_actuel: 87,
    score_cible: 95,
    ecart: 8,
    standard_reference: 'Big Four BD Standards · MEDDICC · Challenger Sale · Pipeline Best Practices',
    gap_analysis: 'Business Dev 87/100 — progression (81→87). Win rate 48% (cible 60%). Pipeline 4.1 Md FCFA (15 deals). Cycle vente 3.8 mois (cible 2.5). Programme cross-sell BU1→BU2/BU3 en déploiement. 2 deals sans MEDDICC complet.',
    top_findings: ['Win rate 48% vs 60% cible — MEDDICC à renforcer', 'Cycle vente 3.8 mois (cible 2.5)', '2 deals sans MEDDICC complet', 'Cross-sell BU2 : 0 mission Prix de Transfert depuis BU1'],
    kpi_keys: [
      { label: 'Pipeline total (Md FCFA)', value: 4.1, target: 7.5 },
      { label: 'Win rate', value: 48, target: 60 },
      { label: 'Deals actifs', value: 15, target: 25 },
      { label: 'Cycle de vente (mois)', value: 3.8, target: 2.5 },
    ],
  },
];

// ─── ALL SCAN FINDINGS (112 total) ───────────────────────────────────

export const SCAN_FINDINGS: ScanFinding[] = [
  // ── INFRASTRUCTURE & SECURITY (18 findings) ──
  { finding_id: 'INF-001', dimension: 'infrastructure', system_component: 'API Gateway / Rate Limiting', severity: 'critical', title: '2 endpoints API sans rate limiting', description: 'Edge Functions kos-social-content-generator et kos-studio-media-generator exposées sans rate limiting. Risque DDoS Layer 7.', metric: 'Endpoints protégés', current_value: '97/99', target_value: '99/99', agent_assigned: 'KOS Enterprise Security Engine™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Élimination risque DDoS', status: 'open', programmed_in_block: 'BLOCK-INFRA-01' },
  { finding_id: 'INF-002', dimension: 'infrastructure', system_component: 'SSL/TLS Certificate', severity: 'critical', title: 'Certificat SSL : expiration dans 24 jours', description: 'Certificat Let\'s Encrypt expire le 16 Juillet 2026. Auto-renewal cron non vérifié depuis 45 jours.', metric: 'Jours avant expiration', current_value: '24 jours', target_value: '90 jours', agent_assigned: 'KOS Web Operations™', auto_fixable: true, effort_estimate: '30 min', impact_estimate: 'Éviter interruption TLS', status: 'open', programmed_in_block: 'BLOCK-INFRA-01' },
  { finding_id: 'INF-003', dimension: 'infrastructure', system_component: 'Supabase RLS Policies', severity: 'major', title: '2 tables sans RLS activée', description: 'Tables kos_youtube_security_logs et platform_credentials sans Row Level Security. Exposition potentielle en lecture.', metric: 'Tables protégées', current_value: '259/261', target_value: '261/261', agent_assigned: 'KOS Enterprise Security Engine™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'Sécurisation données sensibles', status: 'open', programmed_in_block: 'BLOCK-INFRA-01' },
  { finding_id: 'INF-004', dimension: 'infrastructure', system_component: 'Cron Job Monitoring', severity: 'major', title: 'Cron kos-youtube-thumbnail : 2 échecs en 7 jours', description: 'Timeout génération miniature (Chromium headless >30s). Impact : 2 vidéos sans thumbnail auto-généré.', metric: 'Fiabilité cron', current_value: '96.9%', target_value: '100%', agent_assigned: 'KOS Auto-Task Orchestrator™', auto_fixable: true, effort_estimate: '3h', impact_estimate: 'Pipeline YouTube 100% fiable', status: 'open', programmed_in_block: 'BLOCK-INFRA-01' },
  { finding_id: 'INF-005', dimension: 'infrastructure', system_component: 'Build Pipeline', severity: 'major', title: 'Build time moyen : 14.8s (cible <12s)', description: '340 Ko code mort résiduel. Tree-shaking améliorable. 3 chunks sans code splitting.', metric: 'Build time', current_value: '14.8s', target_value: '<12s', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '4h', impact_estimate: 'Build -20% plus rapide', status: 'open', programmed_in_block: 'BLOCK-INFRA-02' },
  { finding_id: 'INF-006', dimension: 'infrastructure', system_component: 'Cold Start Edge Functions', severity: 'major', title: '3 Edge Functions : cold start >800ms', description: 'kos-youtube-analytics (920ms), kos-rag-semantic-search (850ms), kos-automaton-engine (810ms). Bundle Deno >5 Mo.', metric: 'Cold start p95', current_value: '920ms', target_value: '<500ms', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '6h', impact_estimate: 'Latence API -45%', status: 'open', programmed_in_block: 'BLOCK-INFRA-02' },
  { finding_id: 'INF-007', dimension: 'infrastructure', system_component: 'Database Connection Pool', severity: 'major', title: 'Pool connexions Supabase : 18/20 actives en pic', description: 'Marge de seulement 2 connexions en heure de pointe (08:00-12:00 UTC). Risque saturation si nouveau cron.', metric: 'Connexions pic', current_value: '18/20', target_value: '<15/20', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: false, effort_estimate: '8h', impact_estimate: 'Éviter saturation BDD', status: 'open', programmed_in_block: 'BLOCK-INFRA-02' },
  { finding_id: 'INF-008', dimension: 'infrastructure', system_component: 'Dependency Audit', severity: 'minor', title: '12 dépendances npm avec vulnérabilités connues', description: 'npm audit : 3 modérées, 9 faibles. Aucune critique. Mise à jour recommandée.', metric: 'Vulnérabilités npm', current_value: '12', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Zéro vulnérabilité npm', status: 'open', programmed_in_block: 'BLOCK-INFRA-02' },
  { finding_id: 'INF-009', dimension: 'infrastructure', system_component: 'Edge Function Logs', severity: 'minor', title: 'Log retention : 7 jours (cible 30 jours)', description: 'Logs Supabase configurés à 7 jours. Insuffisant pour conformité ISO 27001 (exige 30 jours minimum).', metric: 'Rétention logs', current_value: '7 jours', target_value: '30 jours', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'Conformité ISO 27001 logs', status: 'open' },
  { finding_id: 'INF-010', dimension: 'infrastructure', system_component: 'WebP Image Conversion', severity: 'minor', title: '32 images non converties en WebP', description: 'Images legacy en PNG/JPG (taille moyenne 480 Ko vs 85 Ko en WebP). 12.6 Mo économisables.', metric: 'Images WebP', current_value: '89%', target_value: '100%', agent_assigned: 'KOS Image Governance Agent™', auto_fixable: true, effort_estimate: '3h', impact_estimate: 'Bande passante -12.6 Mo', status: 'open' },
  { finding_id: 'INF-011', dimension: 'infrastructure', system_component: 'CORS Headers', severity: 'minor', title: 'CORS : 4 origines non documentées', description: 'Headers Access-Control-Allow-Origin avec wildcard sur 2 endpoints. À restreindre.', metric: 'Origines CORS', current_value: '4 non documentées', target_value: '0', agent_assigned: 'KOS Enterprise Security Engine™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'Sécurité CORS renforcée', status: 'open' },
  { finding_id: 'INF-012', dimension: 'infrastructure', system_component: 'Google Fonts Self-Hosting', severity: 'minor', title: 'Google Fonts non self-hostées — requête externe', description: '2 polices chargées depuis fonts.googleapis.com. Impact : 1 requête externe + 180ms latence. RGPD : transfert données UE.', metric: 'Requêtes externes', current_value: '2 polices', target_value: '0', agent_assigned: 'KOS Web Operations™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'RGPD conforme + 180ms gagnés', status: 'open' },
  { finding_id: 'INF-013', dimension: 'infrastructure', system_component: 'Backup Strategy', severity: 'info', title: 'Backup automatique Supabase activé — vérifié', description: 'Point de restauration PITR 7 jours actif. Backup quotidien 03:00 UTC. Conforme.', metric: 'Fréquence backup', current_value: '24h', target_value: '24h', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Résilience données assurée', status: 'resolved' },
  { finding_id: 'INF-014', dimension: 'infrastructure', system_component: 'CDN Configuration', severity: 'info', title: 'CDN Netlify : cache-hit ratio 94%', description: 'Performance CDN excellente. 94% cache-hit. TTFB moyen 85ms. Aucune action requise.', metric: 'Cache-hit ratio', current_value: '94%', target_value: '90%', agent_assigned: 'KOS Performance Monitor™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Performance optimale', status: 'resolved' },
  { finding_id: 'INF-015', dimension: 'infrastructure', system_component: 'WAF Configuration', severity: 'excellence', title: 'WAF : 100% couverture OWASP Top 10', description: 'Toutes les règles OWASP déployées et actives. Zéro faux positif en 30 jours. Score A+.', metric: 'Couverture WAF', current_value: '100%', target_value: '100%', agent_assigned: 'KOS Cyber Security Automate™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'INF-016', dimension: 'infrastructure', system_component: 'SOC 24/7 Operations', severity: 'excellence', title: 'SOC 24/7 : MTTD 4.2min, MTTR 12min', description: 'Performance SOC exceptionnelle. 8 analystes, shifts 24/7 couverts. SIEM + SOAR actifs. Uptime monitoring 99.97%.', metric: 'MTTD / MTTR', current_value: '4.2 / 12 min', target_value: '<5 / <15 min', agent_assigned: 'KOS Enterprise Security Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'INF-017', dimension: 'infrastructure', system_component: 'Edge Function Deployment', severity: 'minor', title: '5 Edge Functions avec code mort >20%', description: 'Fonctions kos-lead-scoring, kos-social-scheduler, kos-youtube-publisher, kos-backlink-detect, kos-performance-monitor — imports inutilisés, variables mortes.', metric: 'Code mort EF', current_value: '5 fonctions', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '3h', impact_estimate: 'Cold start -15%', status: 'open' },
  { finding_id: 'INF-018', dimension: 'infrastructure', system_component: 'NPM Package.json', severity: 'minor', title: 'package.json : 8 dépendances en version non-latest', description: 'React 19.0.0 (latest 19.1.0), Tailwind 3.4.1 (latest 3.4.17), autres patches mineurs. Impact : bugfixes et optimisations manquantes.', metric: 'Dépendances outdated', current_value: '8', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Bugfixes + optimisations', status: 'open' },

  // ── AGENTS & EDGE FUNCTIONS (12 findings) ──
  { finding_id: 'AGT-001', dimension: 'agents', system_component: 'KOS Tender Scraper Engine', severity: 'critical', title: 'Scraper AFDB : 5 échecs consécutifs — source bloquée', description: 'Timeout scraping Banque Africaine de Développement depuis 5 jours. Circuit breaker ouvert. 8 AO potentiels non détectés.', metric: 'Sources actives', current_value: '15/16', target_value: '16/16', agent_assigned: 'KOS Tender Intelligence Engine™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Réactiver source AFDB (8 AO/mois)', status: 'open', programmed_in_block: 'BLOCK-AGT-01' },
  { finding_id: 'AGT-002', dimension: 'agents', system_component: 'KOS Email Funnel Automation™', severity: 'major', title: 'Taux ouverture nurturing : 22% stable (cible 28%)', description: 'Objets email sous-optimaux. Segmentation à améliorer. Pas d\'A/B testing actif depuis 30 jours.', metric: 'Taux ouverture', current_value: '22%', target_value: '28%', agent_assigned: 'KOS Email Funnel Automation™', auto_fixable: false, effort_estimate: '8h', impact_estimate: '+6% ouverture = +15% conversion', status: 'open', programmed_in_block: 'BLOCK-AGT-01' },
  { finding_id: 'AGT-003', dimension: 'agents', system_component: 'KOS Social Media Command™', severity: 'major', title: 'LinkedIn : 28 posts/mois (cible 35)', description: 'Cadencement 80% de la cible. 7 créneaux hebdomadaires non remplis. Pipeline contenu social insuffisant.', metric: 'Posts/mois', current_value: '28', target_value: '35', agent_assigned: 'KOS Social Media Command™', auto_fixable: false, effort_estimate: '4h/semaine', impact_estimate: 'Reach +25% LinkedIn', status: 'open', programmed_in_block: 'BLOCK-AGT-01' },
  { finding_id: 'AGT-004', dimension: 'agents', system_component: 'KOS YouTube Analytics Engine', severity: 'major', title: 'YouTube Analytics API : quota 78% utilisé (8 500/10 000)', description: 'Quota quotidien presque saturé. Risque dépassement si nouvelle requête analytics. Optimisation requise.', metric: 'Quota API', current_value: '78%', target_value: '<60%', agent_assigned: 'KOS YouTube Analytics Engine™', auto_fixable: true, effort_estimate: '4h', impact_estimate: 'Marge quota +40%', status: 'open', programmed_in_block: 'BLOCK-AGT-01' },
  { finding_id: 'AGT-005', dimension: 'agents', system_component: 'KOS Forecasting Engine™', severity: 'minor', title: 'Prévision CA Q3 2026 : confiance 76% (seuil 80%)', description: 'Données historiques insuffisantes pour 2 pays CEMAC (Gabon, Guinée Équatoriale).', metric: 'Confiance prévision', current_value: '76%', target_value: '80%', agent_assigned: 'KOS Forecasting Engine™', auto_fixable: false, effort_estimate: '12h', impact_estimate: 'Fiabilité prévisionnelle', status: 'open' },
  { finding_id: 'AGT-006', dimension: 'agents', system_component: 'KOS Humanization Engine™', severity: 'minor', title: 'Score humanisation : 8.7/10 (cible 9.0)', description: '2 articles générés avec ton trop technique. Ajustement du paramètre chaleur humaine.', metric: 'Score humanisation', current_value: '8.7', target_value: '9.0', agent_assigned: 'KOS Humanization Engine™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Qualité contenu +0.3', status: 'open' },
  { finding_id: 'AGT-007', dimension: 'agents', system_component: 'Edge Functions Health', severity: 'info', title: '99/99 Edge Functions actives — uptime 99.97%', description: 'Zéro fonction en statut dégradé. Taux succès moyen 99.2%. Surveillance continue active.', metric: 'Edge Functions up', current_value: '99/99', target_value: '99/99', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Opérationnel', status: 'resolved' },
  { finding_id: 'AGT-008', dimension: 'agents', system_component: 'Cron Jobs Health', severity: 'minor', title: '32/32 cron jobs actifs — 3 avec latence >120s', description: 'kos-youtube-thumbnail (145s), kos-social-daily-generation (128s), kos-rag-batch-generate (132s). Timeout acceptable mais à surveiller.', metric: 'Cron jobs', current_value: '32/32', target_value: '32/32 (<120s)', agent_assigned: 'KOS Auto-Task Orchestrator™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Latence cron optimisée', status: 'open' },
  { finding_id: 'AGT-009', dimension: 'agents', system_component: 'Agent Performance Trends', severity: 'excellence', title: '75/75 agents en production — 72 Optimaux, 3 Stables', description: 'Maturité agent IA exceptionnelle. Score moyen 97.2. Zéro agent critique ou dégradé.', metric: 'Agents', current_value: '75/75', target_value: '75/75', agent_assigned: 'KOS Autonomous PMO™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'AGT-010', dimension: 'agents', system_component: 'YouTube OAuth Health', severity: 'excellence', title: 'OAuth YouTube : tokens valides, rotation automatique active', description: 'Token rafraîchi le 20 Juin 2026. Expire le 20 Septembre 2026. Rotation automatique vérifiée.', metric: 'Token expiry', current_value: '89 jours', target_value: '>30 jours', agent_assigned: 'KOS YouTube OAuth Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'AGT-011', dimension: 'agents', system_component: 'KOS Studio Media Generator', severity: 'minor', title: 'Studio Media : 3 templates vidéo sans variante mobile', description: 'Templates Remotion desktop-only. Variantes 9:16 (YouTube Shorts) et 1:1 (LinkedIn) manquantes.', metric: 'Templates adaptatifs', current_value: '6/9', target_value: '9/9', agent_assigned: 'KOS Studio Media Generator™', auto_fixable: false, effort_estimate: '12h', impact_estimate: 'Couverture Shorts + Reels', status: 'open' },
  { finding_id: 'AGT-012', dimension: 'agents', system_component: 'KOS Self-Improvement Engine™', severity: 'minor', title: 'Boucle amélioration #4 : progression stallée à 85%', description: 'Boucle Qualité Propositions stagne depuis 15 jours. Aucune nouvelle optimisation détectée.', metric: 'Progression boucle', current_value: '85%', target_value: '95%', agent_assigned: 'KOS Self-Improvement Engine™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Reprise progression', status: 'open' },

  // ── PERFORMANCE & SEO (15 findings) ──
  { finding_id: 'PRF-001', dimension: 'performance', system_component: 'Core Web Vitals Mobile', severity: 'critical', title: 'CWV Mobile : 11% pages "poor" (LCP >4s)', description: '18 pages avec LCP mobile >4s. Principalement pages blog avec images hero non optimisées. Impact ranking Google.', metric: 'CWV Pass Rate Mobile', current_value: '89%', target_value: '98%', agent_assigned: 'KOS Performance SEO Command™', auto_fixable: true, effort_estimate: '6h', impact_estimate: 'Ranking +5 positions', status: 'open', programmed_in_block: 'BLOCK-PERF-01' },
  { finding_id: 'PRF-002', dimension: 'performance', system_component: 'Page Weight', severity: 'critical', title: 'Page blog moyenne : 2.4 Mo (cible <1.5 Mo)', description: 'Images non compressées, bundles JS non splittés, polices Google externes. 28 pages >2 Mo.', metric: 'Poids page', current_value: '2.4 Mo', target_value: '<1.5 Mo', agent_assigned: 'KOS Performance Accelerator™', auto_fixable: true, effort_estimate: '8h', impact_estimate: 'LCP -1.2s, TTI -2s', status: 'open', programmed_in_block: 'BLOCK-PERF-01' },
  { finding_id: 'PRF-003', dimension: 'performance', system_component: 'Meta Descriptions', severity: 'major', title: '28 pages sans meta description optimisée', description: 'Pages blog legacy sans meta description. Impact CTR Google (-15% estimé).', metric: 'Meta description', current_value: '252/280', target_value: '280/280', agent_assigned: 'KOS SEO Autopilot™', auto_fixable: true, effort_estimate: '3h', impact_estimate: 'CTR +12%', status: 'open', programmed_in_block: 'BLOCK-PERF-01' },
  { finding_id: 'PRF-004', dimension: 'performance', system_component: 'Image Alt Tags', severity: 'major', title: '18 images sans attribut alt', description: 'Images décoratives et illustrations sans alt text. Impact SEO on-page et accessibilité WCAG.', metric: 'Images avec alt', current_value: '94%', target_value: '100%', agent_assigned: 'KOS Image Alt Auto-Filler™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'SEO + accessibilité', status: 'open', programmed_in_block: 'BLOCK-PERF-01' },
  { finding_id: 'PRF-005', dimension: 'performance', system_component: 'Internal Linking', severity: 'major', title: '34 pages orphelines (0 lien interne entrant)', description: 'Pages outils et articles legacy sans lien depuis le reste du site. Indexation Google compromise.', metric: 'Pages orphelines', current_value: '34', target_value: '0', agent_assigned: 'KOS Internal Linking Strategy™', auto_fixable: false, effort_estimate: '5h', impact_estimate: 'Indexation +15%', status: 'open', programmed_in_block: 'BLOCK-PERF-02' },
  { finding_id: 'PRF-006', dimension: 'performance', system_component: 'Schema.org Coverage', severity: 'major', title: '28 pages sans Schema.org', description: 'Pages sans aucun balisage structuré. Perte de rich results potentiels.', metric: 'Pages avec Schema', current_value: '252/280', target_value: '280/280', agent_assigned: 'KOS Schema Markup Agent™', auto_fixable: true, effort_estimate: '4h', impact_estimate: '+28 rich results', status: 'open', programmed_in_block: 'BLOCK-PERF-02' },
  { finding_id: 'PRF-007', dimension: 'performance', system_component: 'Cache Strategy', severity: 'minor', title: 'Cache-Control : 45 assets sans max-age optimal', description: 'Assets statiques sans durée de cache explicite. Re-téléchargement inutile.', metric: 'Cache optimal', current_value: '82%', target_value: '100%', agent_assigned: 'KOS Cache Optimization Agent™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Bande passante -30%', status: 'open' },
  { finding_id: 'PRF-008', dimension: 'performance', system_component: 'Sitemap Freshness', severity: 'minor', title: 'Sitemap : dernière régénération il y a 5 jours', description: 'Nouvelles pages blog non incluses. 8 URLs manquantes.', metric: 'Sitemap fraîcheur', current_value: '5 jours', target_value: '<24h', agent_assigned: 'KOS SEO Autopilot™', auto_fixable: true, effort_estimate: '30 min', impact_estimate: 'Indexation rapide', status: 'open' },
  { finding_id: 'PRF-009', dimension: 'performance', system_component: 'Featured Snippets', severity: 'minor', title: 'Featured snippets : 78 actifs (cible 150)', description: '72 snippets manquants. Opportunités identifiées : pages FAQ, listes, tableaux.', metric: 'Featured snippets', current_value: '78', target_value: '150', agent_assigned: 'KOS AEO Question Reformatter™', auto_fixable: false, effort_estimate: '15h', impact_estimate: 'Trafic +35%', status: 'open' },
  { finding_id: 'PRF-010', dimension: 'performance', system_component: '404 Errors', severity: 'minor', title: '12 erreurs 404 sur 7 jours', description: 'Liens cassés depuis articles legacy. Redirections manquantes.', metric: 'Erreurs 404', current_value: '12', target_value: '0', agent_assigned: 'KOS Link Repair Agent™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'UX + SEO', status: 'open' },
  { finding_id: 'PRF-011', dimension: 'performance', system_component: 'Mobile Responsiveness', severity: 'info', title: 'Responsive design : 3 pages avec overflow horizontal mobile', description: 'Pages /kos-dashboard, /kos-enterprise-kpi-command, /services avec overflow-x sur mobile <375px.', metric: 'Pages conformes', current_value: '277/280', target_value: '280/280', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'UX mobile parfaite', status: 'open' },
  { finding_id: 'PRF-012', dimension: 'performance', system_component: 'Lazy Loading', severity: 'minor', title: 'Lazy loading : 15 images above-the-fold sans eager', description: 'Images dans le viewport initial sans loading="eager". Impact LCP.', metric: 'Images eager', current_value: '85%', target_value: '100%', agent_assigned: 'KOS Performance Accelerator™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'LCP -200ms', status: 'open' },
  { finding_id: 'PRF-013', dimension: 'performance', system_component: 'H1 Tags', severity: 'info', title: '4 pages avec H1 manquant ou multiple', description: 'Pages /cgu, /legal, /privacy, /cookies avec structure Hn à corriger.', metric: 'H1 valide', current_value: '276/280', target_value: '280/280', agent_assigned: 'KOS SEO Autopilot™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'SEO on-page parfait', status: 'open' },
  { finding_id: 'PRF-014', dimension: 'performance', system_component: 'SEO Score Global', severity: 'excellence', title: 'Score SEO global : 9.8/10 — Leader Afrique Francophone', description: 'Position dominante confirmée. DR 82, 1 800 KW Top 10, 280K trafic/mois.', metric: 'Score SEO', current_value: '9.8/10', target_value: '9.8/10', agent_assigned: 'KOS SEO + AEO Command Center™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'PRF-015', dimension: 'performance', system_component: 'Google Search Console', severity: 'minor', title: 'GSC : 5 pages avec "Crawled — currently not indexed"', description: 'Pages avec contenu dupliqué ou thin content. À enrichir ou consolider.', metric: 'Pages non indexées', current_value: '5', target_value: '0', agent_assigned: 'KOS GSC Command Center™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Indexation 100%', status: 'open' },

  // ── COMPLIANCE & REGULATORY (14 findings) ──
  { finding_id: 'CMP-001', dimension: 'compliance', system_component: 'Politique de Confidentialité', severity: 'critical', title: 'Politique confidentialité : non mise à jour depuis 128 jours', description: 'Dernière mise à jour le 14 Février 2026. Réglementation BCEAO et RGPD ont évolué. Mentions légales obsolètes.', metric: 'Jours sans màj', current_value: '128 jours', target_value: '<90 jours', agent_assigned: 'KOS Legal Compliance Agent™', auto_fixable: true, effort_estimate: '3h', impact_estimate: 'Conformité RGPD + BCEAO', status: 'open', programmed_in_block: 'BLOCK-CMPL-01' },
  { finding_id: 'CMP-002', dimension: 'compliance', system_component: 'GABAC Coverage', severity: 'major', title: 'Couverture GABAC : 3 textes manquants', description: 'Règlements GABAC n°01/2026, n°02/2026, n°03/2026 non intégrés dans la base RAG réglementaire.', metric: 'Textes GABAC', current_value: '24/27', target_value: '27/27', agent_assigned: 'KOS Regulatory Compliance Automate™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Couverture CEMAC 100%', status: 'open', programmed_in_block: 'BLOCK-CMPL-01' },
  { finding_id: 'CMP-003', dimension: 'compliance', system_component: 'RGPD Consent Forms', severity: 'major', title: '1 formulaire sans case consentement RGPD explicite', description: 'Formulaire diagnostic-flash : pas de case à cocher consentement. Collecte email + données entreprise.', metric: 'Formulaires conformes', current_value: '16/17', target_value: '17/17', agent_assigned: 'KOS Legal Compliance Agent™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'Conformité RGPD 100%', status: 'open', programmed_in_block: 'BLOCK-CMPL-01' },
  { finding_id: 'CMP-004', dimension: 'compliance', system_component: 'Cookie Consent Banner', severity: 'major', title: 'Bannière cookies : catégorisation à 3 niveaux (vs 4 requis)', description: 'CNIL exige 4 catégories. Actuellement : nécessaires, statistiques, marketing. Manque : préférences.', metric: 'Catégories cookies', current_value: '3/4', target_value: '4/4', agent_assigned: 'KOS Legal Compliance Agent™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Conformité CNIL 100%', status: 'open', programmed_in_block: 'BLOCK-CMPL-01' },
  { finding_id: 'CMP-005', dimension: 'compliance', system_component: 'EU AI Act Registry', severity: 'major', title: 'Registre IA : 3 agents sans documentation de risque complète', description: 'Agents KOS Forecasting Engine™, KOS Humanization Engine™, KOS Lead Scoring Engine™ : fiche risque EU AI Act incomplète (manque évaluation impact).', metric: 'Fiches risque IA', current_value: '72/75', target_value: '75/75', agent_assigned: 'KOS AI Governance Council™', auto_fixable: false, effort_estimate: '9h', impact_estimate: 'Conformité EU AI Act 100%', status: 'open', programmed_in_block: 'BLOCK-CMPL-02' },
  { finding_id: 'CMP-006', dimension: 'compliance', system_component: 'ISO 37301 Certification', severity: 'minor', title: 'ISO 37301 — audit à blanc non planifié', description: 'Certification Compliance Management Systems prévue Q1 2027. Audit à blanc devrait être planifié Q3 2026.', metric: 'Audit à blanc', current_value: 'Non planifié', target_value: 'Planifié Q3 2026', agent_assigned: 'KOS Compliance Quality Max™', auto_fixable: false, effort_estimate: '40h', impact_estimate: 'Certification ISO 37301', status: 'open' },
  { finding_id: 'CMP-007', dimension: 'compliance', system_component: 'BCEAO Regulatory Watch', severity: 'info', title: 'Veille BCEAO : 89 textes suivis, 0 alerte en retard', description: 'Couverture réglementaire UEMOA 100%. Délai détection alerte 3.2h.', metric: 'Textes BCEAO', current_value: '89/89', target_value: '89/89', agent_assigned: 'KOS Regulatory Intelligence Center™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Conforme', status: 'resolved' },
  { finding_id: 'CMP-008', dimension: 'compliance', system_component: 'COBAC Regulatory Watch', severity: 'info', title: 'Veille COBAC : 61 textes suivis, couverture 97%', description: '3 textes manquants (GABAC). Délai détection 4.1h.', metric: 'Textes COBAC', current_value: '58/61', target_value: '61/61', agent_assigned: 'KOS Regulatory Intelligence Center™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Couverture 100%', status: 'open' },
  { finding_id: 'CMP-009', dimension: 'compliance', system_component: 'Transfer Pricing Documentation', severity: 'minor', title: 'Template BEPS Action 13 : version 2022 (2024 disponible)', description: 'OCDE a publié lignes directrices 2024. Template Khepra à mettre à jour.', metric: 'Version BEPS', current_value: '2022', target_value: '2024', agent_assigned: 'KOS Transfer Pricing Engine™', auto_fixable: true, effort_estimate: '4h', impact_estimate: 'Conformité BEPS 2024', status: 'open' },
  { finding_id: 'CMP-010', dimension: 'compliance', system_component: 'Data Retention Policy', severity: 'minor', title: 'Politique rétention données : non documentée pour 3 types', description: 'Données analytics, logs sécurité, et transcripts chatbot sans durée de rétention définie.', metric: 'Types documentés', current_value: '12/15', target_value: '15/15', agent_assigned: 'KOS Data Governance Agent™', auto_fixable: false, effort_estimate: '3h', impact_estimate: 'Conformité RGPD Art.5', status: 'open' },
  { finding_id: 'CMP-011', dimension: 'compliance', system_component: 'Accessibility Audit', severity: 'minor', title: 'WCAG 2.1 AA : 8 critères non conformes sur 50', description: 'Contraste insuffisant sur 3 pages, focus indicators manquants sur 5 composants.', metric: 'Critères WCAG', current_value: '42/50', target_value: '50/50', agent_assigned: 'KOS Accessibility Agent™', auto_fixable: true, effort_estimate: '8h', impact_estimate: 'Accessibilité AA 100%', status: 'open' },
  { finding_id: 'CMP-012', dimension: 'compliance', system_component: 'ESG Reporting', severity: 'excellence', title: 'Reporting ESG : conforme GRI 2021 + ISSB S1/S2', description: 'Rapport ESG 2025 publié. Scope 1/2/3 couverts. Alignement Taxonomie Verte UEMOA.', metric: 'Standards ESG', current_value: 'GRI + ISSB', target_value: 'GRI + ISSB', agent_assigned: 'KOS ESG Sustainability Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'CMP-013', dimension: 'compliance', system_component: 'Anti-Money Laundering', severity: 'minor', title: 'LBC/FT : procédure mise à jour GAFI 2026 non déployée', description: 'Nouvelles recommandations GAFI Oct 2025 intégrées dans la doc mais procédure opérationnelle non mise à jour.', metric: 'Procédure LBC/FT', current_value: 'v2025', target_value: 'v2026', agent_assigned: 'KOS LBC/FT Compliance Agent™', auto_fixable: true, effort_estimate: '5h', impact_estimate: 'Conformité GAFI 2026', status: 'open' },
  { finding_id: 'CMP-014', dimension: 'compliance', system_component: 'Terms & Conditions', severity: 'minor', title: 'CGU/CGV : dernière màj 8 Mars 2026 (105 jours)', description: 'Nouvelles offres de service non reflétées. Clause limitative de responsabilité à revoir.', metric: 'Jours sans màj', current_value: '105 jours', target_value: '<90 jours', agent_assigned: 'KOS Legal Compliance Agent™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Protection juridique', status: 'open' },

  // ── DATA & INTELLIGENCE (10 findings) ──
  { finding_id: 'DAT-001', dimension: 'data', system_component: 'Knowledge Graph CEMAC', severity: 'major', title: 'Sous-graphe CEMAC : 127 nœuds (cible 250)', description: 'Déséquilibre UEMOA/CEMAC persistant. Ratio 1:5. Couverture insuffisante des textes COBAC/GABAC/CIMA.', metric: 'Nœuds CEMAC', current_value: '127', target_value: '250', agent_assigned: 'KOS Global Knowledge Graph™', auto_fixable: false, effort_estimate: '24h', impact_estimate: 'Couverture CEMAC ×2', status: 'open', programmed_in_block: 'BLOCK-DATA-01' },
  { finding_id: 'DAT-002', dimension: 'data', system_component: 'Lead Scoring Model', severity: 'major', title: 'Modèle scoring : drift 5% détecté (seuil 3%)', description: 'Recalibrage nécessaire. Dérive sur dimension Firmographique (marché CEMAC sous-pondéré).', metric: 'Drift modèle', current_value: '5%', target_value: '<3%', agent_assigned: 'KOS Model Evaluation Engine™', auto_fixable: true, effort_estimate: '6h', impact_estimate: 'Scoring précis +2%', status: 'open', programmed_in_block: 'BLOCK-DATA-01' },
  { finding_id: 'DAT-003', dimension: 'data', system_component: 'Enterprise KPI Tower', severity: 'major', title: 'KPIs ESG : 2 métriques sans données Q2 2026', description: 'KPIs #ESG-014 (empreinte carbone scope 3) et #ESG-018 (biodiversité) sans données Q2.', metric: 'KPIs complets', current_value: '278/280', target_value: '280/280', agent_assigned: 'KOS Enterprise KPI Tower™', auto_fixable: false, effort_estimate: '16h', impact_estimate: 'KPIs 100%', status: 'open', programmed_in_block: 'BLOCK-DATA-01' },
  { finding_id: 'DAT-004', dimension: 'data', system_component: 'RAG Embeddings Freshness', severity: 'minor', title: 'Embeddings RAG : 8 documents sans mise à jour >90 jours', description: 'Documents réglementaires avec versions obsolètes dans l\'index vectoriel.', metric: 'Documents frais', current_value: '44/52', target_value: '52/52', agent_assigned: 'KOS RAG Orchestrator™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'RAG précision +5%', status: 'open' },
  { finding_id: 'DAT-005', dimension: 'data', system_component: 'Database Indexes', severity: 'minor', title: '5 tables sans index sur les colonnes fréquemment requêtées', description: 'Tables kos_execution_logs, url_check_results, pipeline_events, lead_scores, social_automation_queue : colonnes timestamp/status sans index.', metric: 'Tables indexées', current_value: '256/261', target_value: '261/261', agent_assigned: 'KOS Data Analytics Center™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Requêtes +40% rapides', status: 'open' },
  { finding_id: 'DAT-006', dimension: 'data', system_component: 'Data Backup Verification', severity: 'info', title: 'Backup Supabase : dernier test de restauration il y a 45 jours', description: 'PITR activé mais test de restauration >30 jours. Bonne pratique : test mensuel.', metric: 'Dernier test', current_value: '45 jours', target_value: '<30 jours', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: false, effort_estimate: '3h', impact_estimate: 'Confiance backup', status: 'open' },
  { finding_id: 'DAT-007', dimension: 'data', system_component: 'Tender Intelligence DB', severity: 'excellence', title: 'Tender DB : 51 AO/AMI LIVE, 18.155 Md FCFA', description: 'Base appels d\'offres la plus complète d\'Afrique francophone. Mise à jour quotidienne. 16 sources actives.', metric: 'AO actifs', current_value: '51', target_value: '50', agent_assigned: 'KOS Tender Intelligence Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'DAT-008', dimension: 'data', system_component: 'Data Quality Score', severity: 'minor', title: 'Qualité données : 2.4% de valeurs manquantes', description: 'Tables kos_institutional_orgs et partner_ecosystem_manager avec colonnes optionnelles non remplies.', metric: 'Qualité données', current_value: '97.6%', target_value: '99%', agent_assigned: 'KOS Data Governance Agent™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Données complètes', status: 'open' },
  { finding_id: 'DAT-009', dimension: 'data', system_component: 'Analytics Dashboard', severity: 'minor', title: 'Dashboard analytics : données Plausible non intégrées', description: 'Métriques trafic non consolidées dans l\'Enterprise KPI Tower. Plausible API disponible.', metric: 'Sources analytics', current_value: '2/3', target_value: '3/3', agent_assigned: 'KOS Enterprise KPI Tower™', auto_fixable: true, effort_estimate: '4h', impact_estimate: 'Vue trafic unifiée', status: 'open' },
  { finding_id: 'DAT-010', dimension: 'data', system_component: 'Data Lake Architecture', severity: 'minor', title: 'Data Lake : schéma en étoile non documenté', description: '260+ tables sans schéma relationnel documenté. Impact onboarding data scientists.', metric: 'Documentation', current_value: 'Absente', target_value: 'Schéma ERD', agent_assigned: 'KOS Enterprise Data Model™', auto_fixable: false, effort_estimate: '12h', impact_estimate: 'Onboarding Data +50%', status: 'open' },

  // ── GROWTH & CRM (11 findings) ──
  { finding_id: 'GRW-001', dimension: 'growth', system_component: 'Pipeline Commercial', severity: 'critical', title: '2 deals sans suivi depuis >15 jours', description: 'Deal #PPL-005 (Stress Tests Climat, 680M FCFA) et #PPL-012 (Family Office, 175M FCFA) sans activité nurturing.', metric: 'Deals actifs suivis', current_value: '13/15', target_value: '15/15', agent_assigned: 'KOS Growth Engine™', auto_fixable: false, effort_estimate: '2h', impact_estimate: 'Réactiver 855M FCFA', status: 'open', programmed_in_block: 'BLOCK-GROW-01' },
  { finding_id: 'GRW-002', dimension: 'growth', system_component: 'Client Success', severity: 'major', title: 'NPS Q2 2026 : 8.8/10 (cible 9.0)', description: '3 clients avec score <7. Enquête satisfaction non envoyée à 5 clients S1 2026.', metric: 'NPS', current_value: '8.8', target_value: '9.0', agent_assigned: 'KOS Client Success Engine™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Rétention +5%', status: 'open', programmed_in_block: 'BLOCK-GROW-01' },
  { finding_id: 'GRW-003', dimension: 'growth', system_component: 'Lead Magnet Performance', severity: 'major', title: '2 lead magnets avec taux conversion <2%', description: 'Simulation Risque Réglementaire (1.8%) et Template Audit Gouvernance (1.5%). Contenu à optimiser.', metric: 'Taux conversion LM', current_value: '1.8% / 1.5%', target_value: '>3%', agent_assigned: 'KOS Lead Magnet Factory™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Leads +40%', status: 'open', programmed_in_block: 'BLOCK-GROW-01' },
  { finding_id: 'GRW-004', dimension: 'growth', system_component: 'Cross-sell BU Tracking', severity: 'major', title: 'Cross-sell BU1→BU2 : 0 mission Prix de Transfert', description: 'Programme cross-sell documenté mais non exécuté. BU1 (Régulation) ne génère pas de leads BU2.', metric: 'Cross-sell BU2', current_value: '0', target_value: '3/trimestre', agent_assigned: 'KOS Growth Engine™', auto_fixable: false, effort_estimate: '8h', impact_estimate: 'CA +300M FCFA/an', status: 'open', programmed_in_block: 'BLOCK-GROW-02' },
  { finding_id: 'GRW-005', dimension: 'growth', system_component: 'LinkedIn Company Page', severity: 'minor', title: 'LinkedIn Page : followers 8 450 (cible 10 000)', description: 'Croissance 320 followers/mois. À ce rythme, cible atteinte dans 5 mois.', metric: 'Followers LinkedIn', current_value: '8450', target_value: '10000', agent_assigned: 'KOS Social Media Command™', auto_fixable: false, effort_estimate: 'Permanent', impact_estimate: 'Reach +18%', status: 'open' },
  { finding_id: 'GRW-006', dimension: 'growth', system_component: 'Email Nurturing Sequences', severity: 'minor', title: 'Séquence nurturing MQL : étape 3 taux clic 8% (cible 15%)', description: 'Email #3 sous-performant. Objet et CTA à A/B tester.', metric: 'Taux clic étape 3', current_value: '8%', target_value: '15%', agent_assigned: 'KOS MQL Nurturing Engine™', auto_fixable: false, effort_estimate: '3h', impact_estimate: 'Conversion +25%', status: 'open' },
  { finding_id: 'GRW-007', dimension: 'growth', system_component: 'Sales Collateral', severity: 'info', title: '4 capability statements non mis à jour', description: 'Fiches BU2 (Prix de Transfert) et BU3 (GRC) avec études de cas 2024. À actualiser avec cas 2026.', metric: 'Fiches à jour', current_value: '8/12', target_value: '12/12', agent_assigned: 'KOS Executive Content Studio™', auto_fixable: false, effort_estimate: '6h', impact_estimate: 'Crédibilité commerciale', status: 'open' },
  { finding_id: 'GRW-008', dimension: 'growth', system_component: 'Partnership Pipeline', severity: 'excellence', title: 'Partenariats : 7 actifs, 54 collaborations cumulées', description: 'Écosystème partenarial solide. Grant Thornton, Banque Mondiale, AFD, BAD, IFC actifs.', metric: 'Partenaires', current_value: '7', target_value: '7', agent_assigned: 'KOS Partnership Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'GRW-009', dimension: 'growth', system_component: 'Website Conversion Rate', severity: 'minor', title: 'Taux conversion site : 3.2% (cible 4.5%)', description: '1.3 pts sous la cible. Pages services et outils avec CTA sous-optimaux.', metric: 'Conversion rate', current_value: '3.2%', target_value: '4.5%', agent_assigned: 'KOS Conversion Optimization™', auto_fixable: false, effort_estimate: '12h', impact_estimate: 'Leads +40%', status: 'open' },
  { finding_id: 'GRW-010', dimension: 'growth', system_component: 'Revenue S1 2026', severity: 'minor', title: 'CA S1 2026 : 1.51 Md FCFA (objectif 1.54 Md)', description: 'Écart de 30M FCFA (1.9%). Rattrapable au S2. Pipeline Q3 solide (forecast 520M).', metric: 'CA S1', current_value: '1.51 Md', target_value: '1.54 Md', agent_assigned: 'KOS Growth Engine™', auto_fixable: false, effort_estimate: 'Permanent', impact_estimate: 'Atteindre objectif S1', status: 'open' },
  { finding_id: 'GRW-011', dimension: 'growth', system_component: 'Market Expansion', severity: 'minor', title: 'Bureau Douala : étude de faisabilité non initiée', description: 'Expansion CEMAC prioritaire. Bureau physique recommandé. Business case à produire.', metric: 'Expansion CEMAC', current_value: 'Non initié', target_value: 'Business case Q3', agent_assigned: 'KOS Francophone Africa Strategic Center™', auto_fixable: false, effort_estimate: '40h', impact_estimate: 'Présence CEMAC', status: 'open' },

  // ── BIG FOUR MATURITY (20 findings) ──
  { finding_id: 'BF4-001', dimension: 'bigfour', system_component: 'Gouvernance — Rotation Mandats', severity: 'major', title: 'Rotation mandats >24 mois : 2 missions non conformes', description: 'Missions #BCEAO-2024-003 (28 mois) et #COBAC-2023-007 (31 mois) avec équipe inchangée. Risque indépendance.', metric: 'Missions conformes', current_value: '28/30', target_value: '30/30', agent_assigned: 'KOS Governance Formalization™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Indépendance COSO 2013', status: 'open', programmed_in_block: 'BLOCK-BF4-01' },
  { finding_id: 'BF4-002', dimension: 'bigfour', system_component: 'Qualité — Certification ISO 9001', severity: 'major', title: 'ISO 9001 — audit de certification Q3 2026 à planifier', description: 'Audit à blanc effectué. Certification formelle programmée mais dates non confirmées.', metric: 'Certification ISO 9001', current_value: 'En cours', target_value: 'Certifié Q4 2026', agent_assigned: 'KOS Quality Excellence Command™', auto_fixable: false, effort_estimate: '80h', impact_estimate: 'Certification ISO 9001', status: 'open', programmed_in_block: 'BLOCK-BF4-01' },
  { finding_id: 'BF4-003', dimension: 'bigfour', system_component: 'IA — ISO 42001 Certification', severity: 'major', title: 'ISO 42001 — pré-audit réussi, certification Q4 2026', description: 'Pré-audit validé à 92%. Écarts mineurs à corriger avant audit final.', metric: 'Pré-audit ISO 42001', current_value: '92%', target_value: '95%+', agent_assigned: 'KOS AI Governance Council™', auto_fixable: false, effort_estimate: '40h', impact_estimate: 'Certification ISO 42001', status: 'open', programmed_in_block: 'BLOCK-BF4-01' },
  { finding_id: 'BF4-004', dimension: 'bigfour', system_component: 'Risques — Stress Tests Climatiques', severity: 'major', title: 'Stress tests climatiques : 2 scénarios (cible 4)', description: 'Scénarios NGFS ajoutés (Orderly, Disorderly). Manquent : Hot House World, Too-little-too-late.', metric: 'Scénarios climat', current_value: '2/4', target_value: '4/4', agent_assigned: 'KOS ESG Sustainability Engine™', auto_fixable: false, effort_estimate: '24h', impact_estimate: 'Conformité BCEAO Pilier 2', status: 'open', programmed_in_block: 'BLOCK-BF4-02' },
  { finding_id: 'BF4-005', dimension: 'bigfour', system_component: 'Business Dev — MEDDICC Deployment', severity: 'major', title: 'MEDDICC : 2 deals sans qualification complète', description: 'Deals #PPL-007 (Ministère Finances) et #PPL-011 (Audit Cyber) sans Champion identifié ni Metrics quantifiées.', metric: 'Deals MEDDICC', current_value: '13/15', target_value: '15/15', agent_assigned: 'KOS Growth Engine™', auto_fixable: false, effort_estimate: '4h', impact_estimate: 'Win rate +12%', status: 'open', programmed_in_block: 'BLOCK-BF4-02' },
  { finding_id: 'BF4-006', dimension: 'bigfour', system_component: 'Recherche — Publications Peer-Reviewed', severity: 'minor', title: 'Publications peer-reviewed : 2 soumises, 0 acceptées', description: 'Articles soumis à African Development Review et Journal of African Business. En attente de review (3-6 mois).', metric: 'Publications/an', current_value: '2 soumises', target_value: '5/an', agent_assigned: 'KOS Research Institute™', auto_fixable: false, effort_estimate: 'Permanent', impact_estimate: 'Citations académiques', status: 'open' },
  { finding_id: 'BF4-007', dimension: 'bigfour', system_component: 'Cybersécurité — Red Team Exercise', severity: 'minor', title: 'Red Team Exercise : prestataire non sélectionné', description: 'Exercise Q4 2026 planifié mais cahier des charges non rédigé. 3 firmes à évaluer.', metric: 'Red Team', current_value: 'Non initié', target_value: 'Sélectionné Q3', agent_assigned: 'KOS Enterprise Security Engine™', auto_fixable: false, effort_estimate: '16h', impact_estimate: 'Résilience cyber', status: 'open' },
  { finding_id: 'BF4-008', dimension: 'bigfour', system_component: 'SEO — Domain Authority', severity: 'minor', title: 'DR 82 — cible 85 non atteinte', description: '3 pts sous la cible Big Four. Campagne backlinks en cours. +8 backlinks .gov/.edu ce trimestre.', metric: 'Domain Rating', current_value: '82', target_value: '85', agent_assigned: 'KOS Backlink Intelligence™', auto_fixable: false, effort_estimate: '3 mois', impact_estimate: 'Autorité domaine', status: 'open' },
  { finding_id: 'BF4-009', dimension: 'bigfour', system_component: 'GEO — Share of Voice', severity: 'minor', title: 'Share of Voice : 48% (cible 50%)', description: '2 pts sous la cible. Leader sur ChatGPT (95%), Gemini (93%). Copilot (82%) freine la moyenne.', metric: 'SOV', current_value: '48%', target_value: '50%', agent_assigned: 'KOS GEO Authority Engine™', auto_fixable: false, effort_estimate: '4 semaines', impact_estimate: 'Visibilité IA 50%+', status: 'open' },
  { finding_id: 'BF4-010', dimension: 'bigfour', system_component: 'Conformité — ISO 37301 Gap Analysis', severity: 'minor', title: 'ISO 37301 : gap analysis initiale à réaliser', description: 'Avant audit à blanc Q3 2026, gap analysis nécessaire. 45 critères à évaluer.', metric: 'Gap analysis', current_value: 'Non initiée', target_value: 'Complétée Q3', agent_assigned: 'KOS Regulatory Compliance Automate™', auto_fixable: false, effort_estimate: '24h', impact_estimate: 'Préparation certification', status: 'open' },
  { finding_id: 'BF4-011', dimension: 'bigfour', system_component: 'Research — Chaire Universitaire', severity: 'info', title: 'Chaire UCAD : 2 doctorants actifs, 1 séminaire planifié', description: 'Partenariat UCAD (Dakar) opérationnel. Financement 25M FCFA/an. Premières publications Q1 2027.', metric: 'Chaire UCAD', current_value: 'Active', target_value: 'Active', agent_assigned: 'KOS Research Institute™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Rayonnement académique', status: 'resolved' },
  { finding_id: 'BF4-012', dimension: 'bigfour', system_component: 'Qualité — SLA Revue Qualité', severity: 'minor', title: 'SLA qualité <8h : 94% (cible 100%)', description: '6% des livrables >100 pages dépassent le SLA. Revue qualité à paralléliser.', metric: 'SLA qualité', current_value: '94%', target_value: '100%', agent_assigned: 'KOS Quality Assurance Authority™', auto_fixable: false, effort_estimate: '16h', impact_estimate: 'SLA 100%', status: 'open' },
  { finding_id: 'BF4-013', dimension: 'bigfour', system_component: 'Business Dev — Cycle de Vente', severity: 'minor', title: 'Cycle de vente : 3.8 mois (cible 2.5 mois)', description: '1.3 mois au-dessus de la cible. Phase proposition trop longue. Templates à standardiser.', metric: 'Cycle vente', current_value: '3.8 mois', target_value: '2.5 mois', agent_assigned: 'KOS Growth Engine™', auto_fixable: false, effort_estimate: 'Permanent', impact_estimate: 'Vélocité commerciale', status: 'open' },
  { finding_id: 'BF4-014', dimension: 'bigfour', system_component: 'Audit — Revue Indépendante', severity: 'info', title: 'Revue indépendante trimestrielle : Q1 2026 effectuée', description: 'Cabinet externe (Grant Thornton) a validé les comptes et processus Q1. Prochaine revue : Q2 (Juillet 2026).', metric: 'Revue indépendante', current_value: 'À jour', target_value: 'Trimestrielle', agent_assigned: 'Managing Partner Office', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Confiance auditeurs', status: 'resolved' },
  { finding_id: 'BF4-015', dimension: 'bigfour', system_component: 'Formation Continue', severity: 'info', title: 'Formation continue : 42h/consultant/an (cible 40h)', description: 'Cible dépassée. Programme 2026 : ISO 42001, MEDDICC, GAFI 2026, EU AI Act.', metric: 'Heures formation', current_value: '42h', target_value: '40h', agent_assigned: 'KOS Learning Modules™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Compétences équipe', status: 'resolved' },
  { finding_id: 'BF4-016', dimension: 'bigfour', system_component: 'ESG — Taxonomie Verte UEMOA', severity: 'excellence', title: 'Taxonomie Verte UEMOA : alignement 100%', description: 'Portefeuille missions conforme taxonomie verte BCEAO. Rapports ESG alignés ISSB + GRI.', metric: 'Alignement taxonomie', current_value: '100%', target_value: '100%', agent_assigned: 'KOS ESG Sustainability Engine™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'BF4-017', dimension: 'bigfour', system_component: 'Innovation — Brevets Méthodologiques', severity: 'excellence', title: '3 brevets méthodologiques en cours de dépôt OAPI', description: 'KOS Solvency Resilience Score™, KOS BEPS Documentation Score™, KOS Cyber Resilience Maturity Model™.', metric: 'Brevets', current_value: '3 en cours', target_value: '3 déposés', agent_assigned: 'KOS Innovation Lab™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'EXCELLENCE', status: 'resolved' },
  { finding_id: 'BF4-018', dimension: 'bigfour', system_component: 'Compliance — GAFI 40 Recommandations', severity: 'critical', title: 'GAFI : Évaluation Mutuelle UEMOA 2026 — préparation requise', description: 'Cycle d\'évaluation mutuelle GAFI/GIABA pour les pays UEMOA en 2026. Opportunité de positionnement comme expert LBC/FT. Préparation : rapport benchmarking, offre de service dédiée, formation équipe.', metric: 'Préparation GAFI', current_value: 'Non initiée', target_value: 'Offre packagée Q3', agent_assigned: 'KOS LBC/FT Compliance Agent™', auto_fixable: false, effort_estimate: '80h', impact_estimate: 'Positionnement leader LBC/FT', status: 'open', programmed_in_block: 'BLOCK-BF4-02' },
  { finding_id: 'BF4-019', dimension: 'bigfour', system_component: 'Benchmark Big Four Trimestriel', severity: 'info', title: 'Benchmark Big Four : prochain rapport Q2 2026 (Juillet)', description: 'Comparaison Khepra vs Deloitte/PwC/EY/KPMG sur 10 domaines. Rapport trimestriel.', metric: 'Benchmark', current_value: 'Planifié Juillet', target_value: 'Trimestriel', agent_assigned: 'Managing Partner Office', auto_fixable: false, effort_estimate: '24h', impact_estimate: 'Positionnement concurrentiel', status: 'open' },
  { finding_id: 'BF4-020', dimension: 'bigfour', system_component: 'Score Global Big Four', severity: 'excellence', title: 'Score Global Big Four : 91.2/100 — EXCELLENCE', description: 'Score composite 10 domaines. Certification AAAA maintenue. 8/10 domaines ≥90. Objectif 95/100 Q4 2026.', metric: 'Score Big Four', current_value: '91.2/100', target_value: '95/100', agent_assigned: 'KOS Autonomous PMO™', auto_fixable: false, effort_estimate: 'Permanent', impact_estimate: 'EXCELLENCE — cible 95', status: 'resolved' },

  // ── CODEBASE & BUILD (12 findings) ──
  { finding_id: 'COD-001', dimension: 'codebase', system_component: 'TypeScript Strict Mode', severity: 'critical', title: 'tsconfig.json : strict mode non activé', description: '"strict": false dans tsconfig.json. 148 erreurs TS latentes. Risque bugs runtime non détectés.', metric: 'Strict mode', current_value: 'false', target_value: 'true', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '16h', impact_estimate: 'Qualité code + robustesse', status: 'open', programmed_in_block: 'BLOCK-CODE-01' },
  { finding_id: 'COD-002', dimension: 'codebase', system_component: 'ESLint Warnings', severity: 'major', title: 'ESLint : 47 warnings non résolus', description: 'React hooks exhaustive-deps (18), no-unused-vars (12), autres (17). Qualité code dégradée.', metric: 'ESLint warnings', current_value: '47', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '6h', impact_estimate: 'Qualité code impeccable', status: 'open', programmed_in_block: 'BLOCK-CODE-01' },
  { finding_id: 'COD-003', dimension: 'codebase', system_component: 'File Size Audit', severity: 'major', title: '3 fichiers >2000 lignes', description: 'project_plan.md (3401 lignes), kosIntelligentOrchestrator.ts (850 lignes), page.tsx (650 lignes). À splitter.', metric: 'Fichiers >2000 lignes', current_value: '3', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: false, effort_estimate: '12h', impact_estimate: 'Maintenabilité code', status: 'open', programmed_in_block: 'BLOCK-CODE-01' },
  { finding_id: 'COD-004', dimension: 'codebase', system_component: 'Dead Code Detection', severity: 'major', title: '~280 Ko de code mort estimé', description: 'Fonctions non utilisées, imports orphelins, composants non référencés. Tree-shaking insuffisant.', metric: 'Code mort', current_value: '~280 Ko', target_value: '<50 Ko', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '8h', impact_estimate: 'Bundle -15%', status: 'open', programmed_in_block: 'BLOCK-CODE-02' },
  { finding_id: 'COD-005', dimension: 'codebase', system_component: 'Mock Data Consistency', severity: 'minor', title: '8 mocks avec données contradictoires', description: 'KPIs divergents entre kosDashboard.ts, kosGlobalAgentScan.ts, kosEnterpriseKPITower.ts. À synchroniser.', metric: 'Mocks incohérents', current_value: '8', target_value: '0', agent_assigned: 'KOS Data Governance Agent™', auto_fixable: false, effort_estimate: '8h', impact_estimate: 'Données cohérentes', status: 'open' },
  { finding_id: 'COD-006', dimension: 'codebase', system_component: 'Route Lazy Loading', severity: 'minor', title: '28 routes sans lazy loading', description: 'Routes blog legacy avec import direct. Bundle principal alourdi de ~180 Ko.', metric: 'Routes lazy', current_value: '252/280', target_value: '280/280', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '4h', impact_estimate: 'Bundle initial -180 Ko', status: 'open' },
  { finding_id: 'COD-007', dimension: 'codebase', system_component: 'i18n Coverage', severity: 'minor', title: 'i18n : 32 pages sans traduction anglaise', description: 'Pages KOS hubs sans version EN. Marché anglophone africain (Nigeria, Ghana) non couvert.', metric: 'Pages i18n', current_value: '248/280', target_value: '280/280', agent_assigned: 'KOS Internationalization Agent™', auto_fixable: false, effort_estimate: '80h', impact_estimate: 'Marché anglophone', status: 'open' },
  { finding_id: 'COD-008', dimension: 'codebase', system_component: 'Tailwind Config Audit', severity: 'info', title: 'Tailwind : 18 classes custom non documentées', description: 'Classes utilitaires personnalisées sans commentaire. Impact maintenabilité.', metric: 'Classes custom', current_value: '18', target_value: 'Documentées', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: false, effort_estimate: '2h', impact_estimate: 'Documentation', status: 'open' },
  { finding_id: 'COD-009', dimension: 'codebase', system_component: 'Environment Variables', severity: 'excellence', title: '.env : 12 variables, toutes documentées et valides', description: 'Supabase URL, Anon Key, toutes les variables requises présentes et fonctionnelles.', metric: 'Variables .env', current_value: '12/12', target_value: '12/12', agent_assigned: 'KOS SysOps Health & Resiliency™', auto_fixable: false, effort_estimate: 'N/A', impact_estimate: 'Configuration saine', status: 'resolved' },
  { finding_id: 'COD-010', dimension: 'codebase', system_component: 'Test Coverage', severity: 'minor', title: 'Couverture de tests : 0%', description: 'Aucun test unitaire ou d\'intégration dans le projet. Risque régressions élevé.', metric: 'Test coverage', current_value: '0%', target_value: '>60%', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: false, effort_estimate: '160h', impact_estimate: 'Fiabilité code', status: 'open' },
  { finding_id: 'COD-011', dimension: 'codebase', system_component: 'Vite Config', severity: 'minor', title: 'Vite : 3 plugins non utilisés en production', description: 'Plugins de dev uniquement inclus dans le bundle production. +45 Ko.', metric: 'Plugins inutiles', current_value: '3', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '1h', impact_estimate: 'Bundle -45 Ko', status: 'open' },
  { finding_id: 'COD-012', dimension: 'codebase', system_component: 'Console Statements', severity: 'minor', title: '28 console.log résiduels dans le code', description: 'Déclarations de debug non nettoyées. Risque fuite de données en production.', metric: 'console.log', current_value: '28', target_value: '0', agent_assigned: 'KOS Fullstack Dev Automate™', auto_fixable: true, effort_estimate: '2h', impact_estimate: 'Propreté code', status: 'open' },
];

// ─── TASK BLOCKS (9 blocks) ──────────────────────────────────────────

export const SCAN_TASK_BLOCKS: TaskBlock[] = [
  {
    block_id: 'BLOCK-INFRA-01',
    block_name: 'Bloc Infrastructure Critique — Sécurité & Résilience',
    priority: 'P0_critical',
    description: 'Correction des 4 findings critiques et majeurs d\'infrastructure : rate limiting API, certificat SSL, RLS tables, cron YouTube. Impact direct sur la sécurité et la disponibilité.',
    target_dimensions: ['infrastructure'],
    target_domains: ['Cybersécurité', 'Infrastructure & Automatisation'],
    total_actions: 4,
    critical_actions: 2,
    major_actions: 2,
    auto_fixable: 4,
    estimated_effort: '6h30min',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Élimination risque DDoS + expiration SSL + sécurisation RLS + pipeline YouTube 100%',
    status: 'awaiting_approval',
    deadline_recommendation: '48h (urgence SSL J-24)',
    assigned_to: 'KOS Enterprise Security Engine™ + KOS Web Operations™',
    findings: ['INF-001', 'INF-002', 'INF-003', 'INF-004'],
  },
  {
    block_id: 'BLOCK-INFRA-02',
    block_name: 'Bloc Infrastructure — Optimisation Performance',
    priority: 'P1_high',
    description: 'Optimisation du build pipeline, cold start Edge Functions, pool connexions, dépendances npm, code mort EF. Amélioration continue de l\'infrastructure.',
    target_dimensions: ['infrastructure', 'codebase'],
    target_domains: ['Infrastructure & Automatisation'],
    total_actions: 6,
    critical_actions: 0,
    major_actions: 3,
    auto_fixable: 4,
    estimated_effort: '24h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Build -20% rapide, cold start -45%, pool BDD sécurisé, 0 vulnérabilité npm',
    status: 'pending',
    deadline_recommendation: '2 semaines',
    assigned_to: 'KOS Fullstack Dev Automate™ + KOS SysOps Health™',
    findings: ['INF-005', 'INF-006', 'INF-007', 'INF-008', 'INF-017', 'INF-018'],
  },
  {
    block_id: 'BLOCK-AGT-01',
    block_name: 'Bloc Agents — Correction & Optimisation',
    priority: 'P0_critical',
    description: 'Réactivation source AFDB (Tender Scraper), optimisation nurturing email, cadencement LinkedIn, quota YouTube Analytics. Impact direct sur la génération de leads et la visibilité.',
    target_dimensions: ['agents', 'growth'],
    target_domains: ['Croissance & CRM', 'SEO, GEO & Visibilité'],
    total_actions: 4,
    critical_actions: 1,
    major_actions: 3,
    auto_fixable: 1,
    estimated_effort: '22h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Source AFDB réactivée (+8 AO/mois), nurturing +6% ouverture, LinkedIn +7 posts/mois, marge quota YouTube',
    status: 'awaiting_approval',
    deadline_recommendation: '5 jours',
    assigned_to: 'KOS Tender Intelligence™ + KOS Email Funnel™ + KOS Social Media Command™',
    findings: ['AGT-001', 'AGT-002', 'AGT-003', 'AGT-004'],
  },
  {
    block_id: 'BLOCK-PERF-01',
    block_name: 'Bloc Performance SEO — Critique Mobile & Contenu',
    priority: 'P0_critical',
    description: 'Résolution CWV mobile "poor", réduction poids pages, meta descriptions manquantes, alt tags. Impact direct ranking Google et expérience utilisateur.',
    target_dimensions: ['performance'],
    target_domains: ['SEO & Visibilité'],
    total_actions: 4,
    critical_actions: 2,
    major_actions: 2,
    auto_fixable: 3,
    estimated_effort: '18h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'CWV mobile 89→98%, LCP -1.2s, CTR +12%, ranking +5 positions',
    status: 'awaiting_approval',
    deadline_recommendation: '7 jours',
    assigned_to: 'KOS Performance SEO Command™ + KOS SEO Autopilot™',
    findings: ['PRF-001', 'PRF-002', 'PRF-003', 'PRF-004'],
  },
  {
    block_id: 'BLOCK-PERF-02',
    block_name: 'Bloc SEO — Structure & Indexation',
    priority: 'P1_high',
    description: 'Résolution pages orphelines, Schema.org manquant, featured snippets, erreurs 404. Amélioration de l\'indexation et des rich results.',
    target_dimensions: ['performance'],
    target_domains: ['SEO & Visibilité', 'GEO — IA Générative'],
    total_actions: 5,
    critical_actions: 0,
    major_actions: 2,
    auto_fixable: 3,
    estimated_effort: '20h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: '0 page orpheline, +28 Schema.org, featured snippets 78→150, indexation +15%',
    status: 'pending',
    deadline_recommendation: '2 semaines',
    assigned_to: 'KOS SEO + AEO Command Center™ + KOS Schema Markup Agent™',
    findings: ['PRF-005', 'PRF-006', 'PRF-009', 'PRF-010', 'PRF-015'],
  },
  {
    block_id: 'BLOCK-CMPL-01',
    block_name: 'Bloc Conformité — Mise à Niveau Réglementaire',
    priority: 'P0_critical',
    description: 'Mise à jour politique confidentialité, couverture GABAC, formulaire RGPD, bannière cookies. Conformité réglementaire urgente.',
    target_dimensions: ['compliance', 'bigfour'],
    target_domains: ['Conformité', 'Gouvernance'],
    total_actions: 4,
    critical_actions: 1,
    major_actions: 3,
    auto_fixable: 3,
    estimated_effort: '12h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Conformité RGPD 100%, couverture GABAC 100%, CNIL conforme, politique à jour',
    status: 'awaiting_approval',
    deadline_recommendation: '72h (urgence privacy)',
    assigned_to: 'KOS Legal Compliance Agent™ + KOS Regulatory Compliance Automate™',
    findings: ['CMP-001', 'CMP-002', 'CMP-003', 'CMP-004'],
  },
  {
    block_id: 'BLOCK-CMPL-02',
    block_name: 'Bloc Conformité — Certifications & IA',
    priority: 'P1_high',
    description: 'Complétion fiches risque EU AI Act, planification audit ISO 37301, mise à jour BEPS 2024, procédure GAFI 2026, accessibilité WCAG.',
    target_dimensions: ['compliance', 'bigfour'],
    target_domains: ['Gouvernance IA', 'Conformité'],
    total_actions: 5,
    critical_actions: 0,
    major_actions: 1,
    auto_fixable: 2,
    estimated_effort: '38h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'EU AI Act 100%, ISO 37301 prêt, BEPS 2024, GAFI 2026, WCAG AA 100%',
    status: 'pending',
    deadline_recommendation: '4 semaines',
    assigned_to: 'KOS AI Governance Council™ + KOS Compliance Quality Max™',
    findings: ['CMP-005', 'CMP-006', 'CMP-009', 'CMP-011', 'CMP-013'],
  },
  {
    block_id: 'BLOCK-DATA-01',
    block_name: 'Bloc Data — Intelligence & Qualité',
    priority: 'P1_high',
    description: 'Expansion Knowledge Graph CEMAC, recalibrage modèle scoring, KPIs ESG manquants, indexation RAG. Amélioration de l\'intelligence data.',
    target_dimensions: ['data'],
    target_domains: ['Data & Intelligence'],
    total_actions: 4,
    critical_actions: 0,
    major_actions: 3,
    auto_fixable: 2,
    estimated_effort: '48h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Knowledge Graph CEMAC ×2, scoring +2% précision, KPIs 100%, RAG frais',
    status: 'pending',
    deadline_recommendation: '3 semaines',
    assigned_to: 'KOS Global Knowledge Graph™ + KOS Data Analytics Center™',
    findings: ['DAT-001', 'DAT-002', 'DAT-003', 'DAT-004'],
  },
  {
    block_id: 'BLOCK-GROW-01',
    block_name: 'Bloc Croissance — Pipeline & Conversion',
    priority: 'P0_critical',
    description: 'Réactivation deals sans suivi, amélioration NPS, optimisation lead magnets sous-performants. Impact direct sur le CA.',
    target_dimensions: ['growth', 'bigfour'],
    target_domains: ['Business Dev'],
    total_actions: 4,
    critical_actions: 1,
    major_actions: 3,
    auto_fixable: 0,
    estimated_effort: '16h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Réactivation 855M FCFA pipeline, NPS 9.0, lead magnets ×2 conversion',
    status: 'awaiting_approval',
    deadline_recommendation: '5 jours',
    assigned_to: 'KOS Growth Engine™ + KOS Client Success Engine™',
    findings: ['GRW-001', 'GRW-002', 'GRW-003', 'GRW-006'],
  },
  {
    block_id: 'BLOCK-GROW-02',
    block_name: 'Bloc Croissance — Expansion & Optimisation',
    priority: 'P2_medium',
    description: 'Programme cross-sell inter-BU, optimisation conversion site, capability statements, étude faisabilité Douala.',
    target_dimensions: ['growth'],
    target_domains: ['Business Dev'],
    total_actions: 4,
    critical_actions: 0,
    major_actions: 1,
    auto_fixable: 0,
    estimated_effort: '66h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Cross-sell +300M FCFA/an, conversion site 3.2→4.5%, présence CEMAC',
    status: 'pending',
    deadline_recommendation: '6 semaines',
    assigned_to: 'KOS Growth Engine™ + KOS Francophone Africa Strategic Center™',
    findings: ['GRW-004', 'GRW-005', 'GRW-007', 'GRW-009', 'GRW-011'],
  },
  {
    block_id: 'BLOCK-BF4-01',
    block_name: 'Bloc Big Four — Certifications & Gouvernance',
    priority: 'P1_high',
    description: 'Rotation mandats, certification ISO 9001, certification ISO 42001, SLA qualité. Atteindre les standards Big Four sur les certifications.',
    target_dimensions: ['bigfour'],
    target_domains: ['Gouvernance', 'Qualité', 'Gouvernance IA'],
    total_actions: 3,
    critical_actions: 0,
    major_actions: 3,
    auto_fixable: 0,
    estimated_effort: '124h',
    estimated_budget_fcfa: '12 500 000 FCFA (certification ISO 9001)',
    global_impact: 'ISO 9001 certifié, ISO 42001 certifié, rotation mandats 100% conforme',
    status: 'pending',
    deadline_recommendation: 'Q4 2026',
    assigned_to: 'KOS Quality Excellence Command™ + KOS AI Governance Council™',
    findings: ['BF4-001', 'BF4-002', 'BF4-003'],
  },
  {
    block_id: 'BLOCK-BF4-02',
    block_name: 'Bloc Big Four — Risques & Marché',
    priority: 'P1_high',
    description: 'Stress tests climatiques 4 scénarios, MEDDICC 100% deals, préparation GAFI 2026. Renforcement positionnement concurrentiel.',
    target_dimensions: ['bigfour', 'growth'],
    target_domains: ['Risques', 'Business Dev', 'Conformité'],
    total_actions: 3,
    critical_actions: 1,
    major_actions: 1,
    auto_fixable: 0,
    estimated_effort: '108h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Stress tests 4 scénarios, MEDDICC 100%, positionnement leader GAFI 2026',
    status: 'pending',
    deadline_recommendation: 'Q3 2026',
    assigned_to: 'KOS Enterprise Risk Engine™ + KOS Growth Engine™ + KOS LBC/FT Agent™',
    findings: ['BF4-004', 'BF4-005', 'BF4-018'],
  },
  {
    block_id: 'BLOCK-CODE-01',
    block_name: 'Bloc Codebase — Qualité & Maintenabilité',
    priority: 'P1_high',
    description: 'Activation strict mode TypeScript, nettoyage ESLint warnings, split fichiers >2000 lignes. Amélioration fondamentale de la qualité du code.',
    target_dimensions: ['codebase'],
    target_domains: ['Qualité'],
    total_actions: 3,
    critical_actions: 1,
    major_actions: 2,
    auto_fixable: 2,
    estimated_effort: '34h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'TypeScript strict, 0 ESLint warning, code modulaire <2000 lignes',
    status: 'pending',
    deadline_recommendation: '3 semaines',
    assigned_to: 'KOS Fullstack Dev Automate™',
    findings: ['COD-001', 'COD-002', 'COD-003'],
  },
  {
    block_id: 'BLOCK-CODE-02',
    block_name: 'Bloc Codebase — Performance & Nettoyage',
    priority: 'P2_medium',
    description: 'Élimination code mort, lazy loading routes, nettoyage console.log, plugins Vite, synchronisation mocks.',
    target_dimensions: ['codebase'],
    target_domains: ['Qualité'],
    total_actions: 5,
    critical_actions: 0,
    major_actions: 1,
    auto_fixable: 4,
    estimated_effort: '23h',
    estimated_budget_fcfa: '0 FCFA (100% interne KOS)',
    global_impact: 'Bundle -240 Ko, chargement initial +30% rapide, code propre',
    status: 'pending',
    deadline_recommendation: '4 semaines',
    assigned_to: 'KOS Fullstack Dev Automate™',
    findings: ['COD-004', 'COD-005', 'COD-006', 'COD-011', 'COD-012'],
  },
];

// ─── SCAN REPORT ─────────────────────────────────────────────────────

export const TOTAL_SYSTEM_SCAN_REPORT: SystemScanReport = {
  scan_id: 'KOS-TOTALSCAN-2026-06-22-0800',
  started_at: '2026-06-22T08:00:00Z',
  completed_at: '2026-06-22T08:04:12Z',
  total_duration_seconds: 252,
  total_systems_scanned: 294,
  total_findings: 112,
  findings_critical: 9,
  findings_major: 32,
  findings_minor: 45,
  findings_info: 12,
  findings_excellence: 14,
  auto_fixable_total: 52,
  overall_health: 88.4,
  overall_bigfour: 91.2,
  dimensions: SCAN_DIMENSION_SUMMARIES,
  bigfour_domains: SCAN_BIGFOUR_DOMAINS,
  task_blocks: SCAN_TASK_BLOCKS,
  findings: SCAN_FINDINGS,
  summary_text: 'Scan Total KOS terminé en 4 minutes 12 secondes. 294 systèmes scannés — 99 Edge Functions, 75 agents, 261 tables Supabase, 280 pages, 32 cron jobs, 66 hubs. 112 findings détectés : 9 critiques, 32 majeurs, 45 mineurs, 14 points d\'excellence. 52 auto-corrigeables. Score de santé global 88.4/100. Score Big Four 91.2/100. 14 blocs de tâches programmés pour exécution.',
  next_recommended_action: 'Exécuter les 4 blocs P0 en priorité : BLOCK-INFRA-01 (sécurité), BLOCK-AGT-01 (agents), BLOCK-PERF-01 (SEO), BLOCK-CMPL-01 (conformité), BLOCK-GROW-01 (croissance). Délai : 72h.',
};

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────

export function getFindingsByDimension(dimension: ScanDimension): ScanFinding[] {
  return SCAN_FINDINGS.filter((f) => f.dimension === dimension);
}

export function getFindingsBySeverity(severity: ScanSeverity): ScanFinding[] {
  return SCAN_FINDINGS.filter((f) => f.severity === severity);
}

export function getFindingsByBlock(blockId: string): ScanFinding[] {
  return SCAN_FINDINGS.filter((f) => f.programmed_in_block === blockId);
}

export function getBlockById(blockId: string): TaskBlock | undefined {
  return SCAN_TASK_BLOCKS.find((b) => b.block_id === blockId);
}

export function getBlocksByPriority(priority: BlockPriority): TaskBlock[] {
  return SCAN_TASK_BLOCKS.filter((b) => b.priority === priority);
}

export function getBigFourDomainById(domainId: string): BigFourDomainAssessment | undefined {
  return SCAN_BIGFOUR_DOMAINS.find((d) => d.domain_id === domainId);
}