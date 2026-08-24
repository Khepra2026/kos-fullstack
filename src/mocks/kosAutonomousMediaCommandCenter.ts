// ============================================================================
// KOS AUTONOMOUS MEDIA COMMAND CENTER™ — Hub 100
// Directeur Mondial des Opérations Médias KHEPRA
// Orchestration des 8 Factories : Knowledge → Podcast → Interview → Canva → PPT → Video → Voice → YouTube
// Contrôle Qualité · Conformité Réglementaire · Gestion Documentaire · KPIs · Amélioration Continue
// ============================================================================

// ─── ORCHESTRATED FACTORIES ─────────────────────────────────────────────────

export interface OrchestratedFactory {
  id: string;
  hubNumber: number;
  name: string;
  shortName: string;
  route: string;
  icon: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  healthScore: number;
  maturityScore: number;
  outputCount: number;
  outputLabel: string;
  lastActivity: string;
  description: string;
  qualityScore: number;
  complianceScore: number;
  automationRate: number;
  kpis: { name: string; value: number; unit: string; trend: 'up' | 'down' | 'stable' }[];
  alerts: { id: string; level: 'info' | 'warning' | 'critical'; message: string; timestamp: string }[];
  dependencies: string[];
}

export const ORCHESTRATED_FACTORIES: OrchestratedFactory[] = [
  {
    id: 'f-knowledge',
    hubNumber: 92,
    name: 'Knowledge Factory',
    shortName: 'Knowledge',
    route: '/kos-knowledge-factory',
    icon: 'ri-brain-line',
    status: 'operational',
    healthScore: 94,
    maturityScore: 78,
    outputCount: 12500,
    outputLabel: 'connaissances',
    lastActivity: '2026-06-23T08:15:00Z',
    description: 'Production de connaissances réglementaires Big Four. 12 domaines : BCEAO, COBAC, GAFI, OHADA, IFRS, ESG, Cybersécurité, LBC/FT, Gouvernance, Audit, Risques, Finance Islamique.',
    qualityScore: 96,
    complianceScore: 98,
    automationRate: 88,
    kpis: [
      { name: 'Documents indexés', value: 12500, unit: '', trend: 'up' },
      { name: 'Précision RAG', value: 94.2, unit: '%', trend: 'up' },
      { name: 'Requêtes/jour', value: 340, unit: '', trend: 'up' },
    ],
    alerts: [
      { id: 'kf-1', level: 'info', message: 'Indexation continue OK — 12 500 documents', timestamp: '2026-06-23T08:00:00Z' },
    ],
    dependencies: ['f-podcast', 'f-interview', 'f-ppt', 'f-video', 'f-youtube'],
  },
  {
    id: 'f-podcast',
    hubNumber: 93,
    name: 'Podcast Factory',
    shortName: 'Podcast',
    route: '/kos-podcast-factory',
    icon: 'ri-headphone-line',
    status: 'operational',
    healthScore: 91,
    maturityScore: 74,
    outputCount: 86,
    outputLabel: 'épisodes',
    lastActivity: '2026-06-23T06:30:00Z',
    description: 'Chaîne industrielle de podcasts institutionnels. 3 formats : Décryptage Réglementaire (20min), Club Experts (30min), Flash Conformité (8min).',
    qualityScore: 93,
    complianceScore: 96,
    automationRate: 82,
    kpis: [
      { name: 'Épisodes produits', value: 86, unit: '', trend: 'up' },
      { name: 'Écoutes moyennes', value: 1840, unit: '', trend: 'up' },
      { name: 'Rétention audio', value: 78, unit: '%', trend: 'up' },
    ],
    alerts: [
      { id: 'pf-1', level: 'warning', message: 'Retard de 2 jours sur le flux Club Experts', timestamp: '2026-06-22T10:00:00Z' },
    ],
    dependencies: ['f-knowledge', 'f-voice'],
  },
  {
    id: 'f-interview',
    hubNumber: 94,
    name: 'Interview Factory',
    shortName: 'Interview',
    route: '/kos-interview-factory',
    icon: 'ri-user-voice-line',
    status: 'operational',
    healthScore: 88,
    maturityScore: 72,
    outputCount: 39,
    outputLabel: 'interviews',
    lastActivity: '2026-06-22T14:00:00Z',
    description: 'Interviews d\'experts virtuels. 6 rôles Big Four : PCA, DG, Responsable Conformité, Auditeur Interne, Régulateur, Expert ESG. 3 formats : Vidéo, Podcast, Article.',
    qualityScore: 94,
    complianceScore: 95,
    automationRate: 76,
    kpis: [
      { name: 'Interviews générées', value: 39, unit: '', trend: 'up' },
      { name: 'Score qualité', value: 94, unit: '/100', trend: 'stable' },
      { name: 'Q&A disponibles', value: 13, unit: '', trend: 'stable' },
    ],
    alerts: [
      { id: 'if-1', level: 'info', message: 'Expert ESG — mise à jour ISSB 2026 en cours', timestamp: '2026-06-22T09:00:00Z' },
    ],
    dependencies: ['f-knowledge', 'f-voice'],
  },
  {
    id: 'f-canva',
    hubNumber: 95,
    name: 'Canva Factory',
    shortName: 'Canva',
    route: '/kos-canva-factory',
    icon: 'ri-palette-line',
    status: 'operational',
    healthScore: 96,
    maturityScore: 65,
    outputCount: 438,
    outputLabel: 'assets visuels',
    lastActivity: '2026-06-23T07:45:00Z',
    description: 'Bibliothèque graphique institutionnelle KHEPRA. 400 templates (100 Gouvernance, 100 Audit, 100 Conformité, 100 Risques) + 38 visuels sociaux. Cohérence visuelle 95%.',
    qualityScore: 95,
    complianceScore: 97,
    automationRate: 70,
    kpis: [
      { name: 'Templates actifs', value: 400, unit: '', trend: 'stable' },
      { name: 'Cohérence visuelle', value: 95, unit: '%', trend: 'up' },
      { name: 'Visuels produits/mois', value: 42, unit: '', trend: 'up' },
    ],
    alerts: [],
    dependencies: ['f-ppt', 'f-video', 'f-youtube'],
  },
  {
    id: 'f-ppt',
    hubNumber: 96,
    name: 'PowerPoint Factory',
    shortName: 'PPT',
    route: '/kos-powerpoint-factory',
    icon: 'ri-slideshow-line',
    status: 'operational',
    healthScore: 92,
    maturityScore: 72,
    outputCount: 140,
    outputLabel: 'slides',
    lastActivity: '2026-06-22T18:30:00Z',
    description: 'Présentations exécutives automatiques. 5 audiences × 4 formats (10/20/30/50 slides). Graphiques, tableaux, synthèses, recommandations. Standard Big Four.',
    qualityScore: 94,
    complianceScore: 93,
    automationRate: 80,
    kpis: [
      { name: 'Décks complets', value: 5, unit: '', trend: 'stable' },
      { name: 'Slides générées', value: 140, unit: '', trend: 'up' },
      { name: 'Score qualité', value: 94, unit: '/100', trend: 'stable' },
    ],
    alerts: [],
    dependencies: ['f-knowledge', 'f-canva'],
  },
  {
    id: 'f-video',
    hubNumber: 97,
    name: 'Video Factory',
    shortName: 'Video',
    route: '/kos-video-factory',
    icon: 'ri-film-line',
    status: 'operational',
    healthScore: 90,
    maturityScore: 68,
    outputCount: 34,
    outputLabel: 'scènes',
    lastActivity: '2026-06-23T05:00:00Z',
    description: 'Production vidéo automatique. 4 formats : YouTube Shorts, YouTube Long Form, LinkedIn Video, Facebook Video. Storyboards, animations, sous-titres, transitions, CTA.',
    qualityScore: 91,
    complianceScore: 94,
    automationRate: 74,
    kpis: [
      { name: 'Scènes produites', value: 34, unit: '', trend: 'up' },
      { name: 'Projets actifs', value: 5, unit: '', trend: 'stable' },
      { name: 'Rétention vidéo', value: 78, unit: '%', trend: 'up' },
    ],
    alerts: [
      { id: 'vf-1', level: 'warning', message: 'Animation complexe — rendu ralenti sur projet Cybersécurité', timestamp: '2026-06-22T16:00:00Z' },
    ],
    dependencies: ['f-voice', 'f-canva'],
  },
  {
    id: 'f-voice',
    hubNumber: 98,
    name: 'Voice Factory',
    shortName: 'Voice',
    route: '/kos-voice-factory',
    icon: 'ri-mic-fill',
    status: 'operational',
    healthScore: 97,
    maturityScore: 78,
    outputCount: 10,
    outputLabel: 'assets sonores',
    lastActivity: '2026-06-23T04:30:00Z',
    description: 'Identité audio KHEPRA. 4 voix signature : Narrateur, Expert, Présentateur, Intervieweur. Guide tonal, bibliothèque sonore, dictionnaire prononciation.',
    qualityScore: 96,
    complianceScore: 99,
    automationRate: 90,
    kpis: [
      { name: 'Cohérence marque', value: 96, unit: '%', trend: 'stable' },
      { name: 'Utilisation voix proprio', value: 78, unit: '%', trend: 'up' },
      { name: 'Précision prononciation', value: 98.5, unit: '%', trend: 'stable' },
    ],
    alerts: [],
    dependencies: ['f-podcast', 'f-interview', 'f-video', 'f-youtube'],
  },
  {
    id: 'f-youtube',
    hubNumber: 99,
    name: 'YouTube Factory',
    shortName: 'YouTube',
    route: '/kos-youtube-factory',
    icon: 'ri-youtube-fill',
    status: 'operational',
    healthScore: 89,
    maturityScore: 72,
    outputCount: 216,
    outputLabel: 'vidéos',
    lastActivity: '2026-06-23T08:00:00Z',
    description: 'Usine YouTube autonome @KHEPRAEXPERTS. Pipeline 7 étapes automatisé. Shorts quotidiens, vidéos hebdo, podcasts, masterclass mensuelles. 4850 abonnés.',
    qualityScore: 92,
    complianceScore: 91,
    automationRate: 86,
    kpis: [
      { name: 'Abonnés', value: 4850, unit: '', trend: 'up' },
      { name: 'Heures visionnées', value: 12500, unit: 'h', trend: 'up' },
      { name: 'Vidéos publiées', value: 216, unit: '', trend: 'up' },
    ],
    alerts: [
      { id: 'ytf-1', level: 'info', message: 'Pipeline 7/7 étapes OK — 86% automatisé', timestamp: '2026-06-23T08:00:00Z' },
    ],
    dependencies: ['f-knowledge', 'f-voice', 'f-canva', 'f-video'],
  },
];

// ─── QUALITY CONTROL SYSTEM ─────────────────────────────────────────────────

export interface QualityCheckpoint {
  id: string;
  stage: string;
  description: string;
  criteria: string[];
  passRate: number;
  lastAudit: string;
  responsible: string;
  findings: { id: string; severity: 'minor' | 'major' | 'critical'; description: string; status: 'open' | 'resolved' | 'in_progress' }[];
}

export const QUALITY_CHECKPOINTS: QualityCheckpoint[] = [
  {
    id: 'qc-source',
    stage: 'Vérification Source',
    description: 'Validation des sources réglementaires avant intégration dans le pipeline de production. Croisement avec le RAG Knowledge Graph.',
    criteria: ['Source BCEAO/COBAC/GAFI officielle', 'Date de publication < 30 jours', 'Non-contradiction avec existant', 'Citation complète'],
    passRate: 98.5,
    lastAudit: '2026-06-23T06:00:00Z',
    responsible: 'Knowledge Factory',
    findings: [],
  },
  {
    id: 'qc-content',
    stage: 'Qualité Contenu',
    description: 'Revue automatique du contenu généré : exactitude réglementaire, cohérence narrative, ton KHEPRA, lisibilité.',
    criteria: ['Score exactitude > 95%', 'Score cohérence > 90%', 'Conformité ton KHEPRA', 'Score lisibilité > 80'],
    passRate: 94.2,
    lastAudit: '2026-06-23T07:30:00Z',
    responsible: 'Quality Controller Automatique',
    findings: [
      { id: 'f-001', severity: 'minor', description: '3 scripts avec score lisibilité < 80 — reformulation automatique en cours', status: 'in_progress' },
    ],
  },
  {
    id: 'qc-visual',
    stage: 'Qualité Visuelle',
    description: 'Vérification conformité charte KHEPRA, lisibilité mobile, contraste, résolution, cohérence visuelle inter-formats.',
    criteria: ['Conformité charte KHEPRA 100%', 'Lisibilité mobile validée', 'Contraste WCAG AA', 'Résolution minimum 1080p'],
    passRate: 95.8,
    lastAudit: '2026-06-23T07:45:00Z',
    responsible: 'Canva Factory + PPT Factory',
    findings: [],
  },
  {
    id: 'qc-audio',
    stage: 'Qualité Audio',
    description: 'Contrôle qualité audio : absence de bruit, synchronisation, niveau sonore, prononciation termes métier.',
    criteria: ['Rapport signal/bruit > 30dB', 'Synchronisation > 98%', 'Niveau normalisé LUFS', 'Prononciation métier validée'],
    passRate: 97.1,
    lastAudit: '2026-06-23T04:30:00Z',
    responsible: 'Voice Factory',
    findings: [],
  },
  {
    id: 'qc-publication',
    stage: 'Pré-Publication',
    description: 'Vérification finale avant publication : métadonnées SEO, sous-titres, chapitrage, hashtags, liens, conformité plateforme.',
    criteria: ['Métadonnées SEO complètes', 'Sous-titres synchronisés', 'Chapitrage 5-8 segments', 'Hashtags 15-20', 'Liens valides'],
    passRate: 96.5,
    lastAudit: '2026-06-23T08:00:00Z',
    responsible: 'YouTube Factory',
    findings: [
      { id: 'f-002', severity: 'minor', description: '2 vidéos sans chapitrage — correction automatique programmée', status: 'open' },
    ],
  },
  {
    id: 'qc-post',
    stage: 'Post-Publication',
    description: 'Suivi qualité après publication : analytics, feedback, corrections, rétroaction dans le pipeline.',
    criteria: ['Rapport 24h généré', 'Rapport 7j généré', 'Corrections identifiées < 48h', 'Rétroaction intégrée au pipeline'],
    passRate: 91.0,
    lastAudit: '2026-06-22T08:00:00Z',
    responsible: 'Command Center',
    findings: [],
  },
];

// ─── REGULATORY COMPLIANCE ──────────────────────────────────────────────────

export interface ComplianceFramework {
  id: string;
  regulation: string;
  authority: string;
  articles: string[];
  applicability: string[];
  status: 'compliant' | 'partial' | 'non_compliant' | 'not_applicable';
  lastCheck: string;
  evidence: string;
  actions: { id: string; description: string; deadline: string; status: 'pending' | 'done' | 'overdue' }[];
}

export const COMPLIANCE_FRAMEWORKS: ComplianceFramework[] = [
  {
    id: 'cf-bceao',
    regulation: 'Directive BCEAO — Communication Financière',
    authority: 'BCEAO',
    articles: ['Art. 24 — Publications obligatoires', 'Art. 45 — Information du public', 'Art. 67 — Exactitude des données'],
    applicability: ['Publications financières', 'Contenu réglementaire', 'Données chiffrées'],
    status: 'compliant',
    lastCheck: '2026-06-23T07:00:00Z',
    evidence: 'Audit automatique trimestriel — score 98/100',
    actions: [],
  },
  {
    id: 'cf-cobac',
    regulation: 'Règlement COBAC — Communication Institutionnelle',
    authority: 'COBAC',
    articles: ['Art. 12 — Transparence', 'Art. 33 — Information régulée', 'Art. 56 — Archivage'],
    applicability: ['Contenu CEMAC', 'Publications institutionnelles', 'Archivage'],
    status: 'compliant',
    lastCheck: '2026-06-22T07:00:00Z',
    evidence: 'Vérification croisée COBAC — 95/100',
    actions: [
      { id: 'ca-001', description: 'Mise à jour archivage COBAC — format long terme', deadline: '2026-07-15', status: 'pending' },
    ],
  },
  {
    id: 'cf-gafi',
    regulation: 'Recommandations GAFI — Communication LBC/FT',
    authority: 'GAFI',
    articles: ['Rec. 1 — Évaluation des risques', 'Rec. 18 — Contrôles internes', 'Rec. 21 — Signalement'],
    applicability: ['Contenu LBC/FT', 'Formations', 'Sensibilisation'],
    status: 'compliant',
    lastCheck: '2026-06-21T07:00:00Z',
    evidence: 'Conformité GAFI validée — aucune non-conformité détectée',
    actions: [],
  },
  {
    id: 'cf-rgpd',
    regulation: 'RGPD / Protection Données UEMOA',
    authority: 'UEMOA / CNIL',
    articles: ['Art. 5 — Licéité', 'Art. 13 — Transparence', 'Art. 25 — Protection dès la conception'],
    applicability: ['Données personnelles', 'Cookies', 'Formulaires'],
    status: 'compliant',
    lastCheck: '2026-06-23T06:00:00Z',
    evidence: 'Scan RGPD automatique quotidien',
    actions: [],
  },
  {
    id: 'cf-droit-auteur',
    regulation: 'Droit d\'Auteur & Propriété Intellectuelle',
    authority: 'OAPI / International',
    articles: ['Convention de Berne', 'Accord de Bangui'],
    applicability: ['Images', 'Musique', 'Contenu tiers'],
    status: 'compliant',
    lastCheck: '2026-06-22T06:00:00Z',
    evidence: 'Bibliothèque 100% assets propriétaires KHEPRA',
    actions: [],
  },
  {
    id: 'cf-accessibilite',
    regulation: 'Accessibilité Web — WCAG 2.1 AA',
    authority: 'W3C / International',
    articles: ['WCAG 2.1 — Niveau AA', 'Sous-titres obligatoires', 'Contraste minimum'],
    applicability: ['Vidéos', 'Images', 'Site web'],
    status: 'partial',
    lastCheck: '2026-06-22T08:00:00Z',
    evidence: 'Score accessibilité 87/100 — cible 95',
    actions: [
      { id: 'ca-002', description: 'Ajouter audio-descriptions aux vidéos longues', deadline: '2026-07-30', status: 'pending' },
      { id: 'ca-003', description: 'Améliorer contraste sur 3 templates Canva', deadline: '2026-07-15', status: 'pending' },
    ],
  },
];

// ─── DOCUMENT MANAGEMENT ────────────────────────────────────────────────────

export interface DocumentRecord {
  id: string;
  title: string;
  type: 'policy' | 'procedure' | 'template' | 'report' | 'audit' | 'charter' | 'manual';
  category: string;
  version: string;
  author: string;
  status: 'active' | 'draft' | 'archived' | 'under_review';
  created: string;
  updated: string;
  reviewers: string[];
  tags: string[];
  linkFactory: string;
}

export const DOCUMENT_RECORDS: DocumentRecord[] = [
  {
    id: 'doc-001',
    title: 'KHEPRA Media Editorial Charter v3.2',
    type: 'charter',
    category: 'Gouvernance',
    version: '3.2',
    author: 'Direction Générale',
    status: 'active',
    created: '2025-09-15',
    updated: '2026-06-20',
    reviewers: ['PCA', 'DG', 'Responsable Conformité'],
    tags: ['charte', 'éditorial', 'gouvernance', 'média'],
    linkFactory: 'Knowledge Factory',
  },
  {
    id: 'doc-002',
    title: 'Procédure Contrôle Qualité Média KHEPRA v2.1',
    type: 'procedure',
    category: 'Qualité',
    version: '2.1',
    author: 'Quality Controller',
    status: 'active',
    created: '2025-11-01',
    updated: '2026-06-15',
    reviewers: ['DG', 'Auditeur Interne'],
    tags: ['qualité', 'procédure', 'contrôle'],
    linkFactory: 'Knowledge Factory',
  },
  {
    id: 'doc-003',
    title: 'Template Script Vidéo Big Four v4.0',
    type: 'template',
    category: 'Production',
    version: '4.0',
    author: 'Video Factory',
    status: 'active',
    created: '2025-10-01',
    updated: '2026-06-10',
    reviewers: ['Expert KHEPRA', 'Présentateur KHEPRA'],
    tags: ['template', 'script', 'vidéo', 'Big Four'],
    linkFactory: 'Video Factory',
  },
  {
    id: 'doc-004',
    title: 'Rapport Qualité Média Mensuel — Juin 2026',
    type: 'report',
    category: 'Qualité',
    version: '1.0',
    author: 'Command Center',
    status: 'active',
    created: '2026-06-23',
    updated: '2026-06-23',
    reviewers: ['DG', 'PCA'],
    tags: ['rapport', 'qualité', 'mensuel', 'juin 2026'],
    linkFactory: 'Command Center',
  },
  {
    id: 'doc-005',
    title: 'Guide Tonal KHEPRA — Voix Institutionnelles v2.0',
    type: 'manual',
    category: 'Audio',
    version: '2.0',
    author: 'Voice Factory',
    status: 'active',
    created: '2026-04-01',
    updated: '2026-06-01',
    reviewers: ['Narrateur KHEPRA', 'Expert KHEPRA'],
    tags: ['guide', 'tonal', 'voix', 'audio'],
    linkFactory: 'Voice Factory',
  },
  {
    id: 'doc-006',
    title: 'Politique Archivage Contenu Média KHEPRA v1.5',
    type: 'policy',
    category: 'Gouvernance',
    version: '1.5',
    author: 'Direction Conformité',
    status: 'under_review',
    created: '2025-12-01',
    updated: '2026-05-28',
    reviewers: ['Responsable Conformité', 'Auditeur Interne', 'Régulateur'],
    tags: ['politique', 'archivage', 'conformité', 'média'],
    linkFactory: 'Knowledge Factory',
  },
  {
    id: 'doc-007',
    title: 'Matrice Conformité Réglementaire Média 2026',
    type: 'audit',
    category: 'Conformité',
    version: '1.0',
    author: 'Command Center',
    status: 'active',
    created: '2026-01-15',
    updated: '2026-06-22',
    reviewers: ['Responsable Conformité', 'Auditeur Interne'],
    tags: ['matrice', 'conformité', 'réglementaire', '2026'],
    linkFactory: 'Command Center',
  },
  {
    id: 'doc-008',
    title: 'Template Présentation Conseil d\'Administration v3.0',
    type: 'template',
    category: 'Production',
    version: '3.0',
    author: 'PPT Factory',
    status: 'active',
    created: '2026-02-01',
    updated: '2026-06-05',
    reviewers: ['DG', 'PCA'],
    tags: ['template', 'présentation', 'CA', 'PPT'],
    linkFactory: 'PPT Factory',
  },
  {
    id: 'doc-009',
    title: 'Rapport Audit Interne Médias — Q2 2026',
    type: 'audit',
    category: 'Audit',
    version: '1.0',
    author: 'Auditeur Interne',
    status: 'draft',
    created: '2026-06-20',
    updated: '2026-06-22',
    reviewers: ['PCA', 'DG', 'Régulateur'],
    tags: ['audit', 'interne', 'médias', 'Q2 2026'],
    linkFactory: 'Interview Factory',
  },
  {
    id: 'doc-010',
    title: 'Manuel Opérateur Command Center v1.0',
    type: 'manual',
    category: 'Opérations',
    version: '1.0',
    author: 'Command Center',
    status: 'active',
    created: '2026-06-01',
    updated: '2026-06-23',
    reviewers: ['DG'],
    tags: ['manuel', 'opérateur', 'command center', 'opérations'],
    linkFactory: 'Command Center',
  },
];

// ─── GLOBAL KPIs ────────────────────────────────────────────────────────────

export interface GlobalKPI {
  id: string;
  name: string;
  icon: string;
  category: 'production' | 'quality' | 'compliance' | 'engagement' | 'growth';
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { month: string; value: number }[];
  factories: string[];
}

export const GLOBAL_KPIS: GlobalKPI[] = [
  {
    id: 'total-output',
    name: 'Production Totale Média',
    icon: 'ri-stack-line',
    category: 'production',
    current: 13425,
    previous: 8900,
    target: 20000,
    unit: 'assets',
    trend: 'up',
    history: [
      { month: 'Jan', value: 2200 }, { month: 'Fév', value: 3800 }, { month: 'Mar', value: 5600 },
      { month: 'Avr', value: 7500 }, { month: 'Mai', value: 10200 }, { month: 'Juin', value: 13425 },
    ],
    factories: ['all'],
  },
  {
    id: 'avg-quality',
    name: 'Score Qualité Moyen',
    icon: 'ri-shield-check-line',
    category: 'quality',
    current: 93.8,
    previous: 88.5,
    target: 96,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 82 }, { month: 'Fév', value: 85 }, { month: 'Mar', value: 87 },
      { month: 'Avr', value: 88.5 }, { month: 'Mai', value: 91 }, { month: 'Juin', value: 93.8 },
    ],
    factories: ['all'],
  },
  {
    id: 'compliance-rate',
    name: 'Taux Conformité Réglementaire',
    icon: 'ri-scales-line',
    category: 'compliance',
    current: 95.5,
    previous: 92,
    target: 98,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 88 }, { month: 'Fév', value: 90 }, { month: 'Mar', value: 91 },
      { month: 'Avr', value: 92 }, { month: 'Mai', value: 94 }, { month: 'Juin', value: 95.5 },
    ],
    factories: ['all'],
  },
  {
    id: 'automation-rate',
    name: 'Taux d\'Automatisation Global',
    icon: 'ri-git-branch-line',
    category: 'production',
    current: 80.75,
    previous: 65,
    target: 95,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 55 }, { month: 'Fév', value: 60 }, { month: 'Mar', value: 65 },
      { month: 'Avr', value: 70 }, { month: 'Mai', value: 75 }, { month: 'Juin', value: 80.75 },
    ],
    factories: ['all'],
  },
  {
    id: 'total-engagement',
    name: 'Engagement Total Audience',
    icon: 'ri-heart-line',
    category: 'engagement',
    current: 24500,
    previous: 12800,
    target: 50000,
    unit: 'interactions',
    trend: 'up',
    history: [
      { month: 'Jan', value: 3200 }, { month: 'Fév', value: 5500 }, { month: 'Mar', value: 8500 },
      { month: 'Avr', value: 12800 }, { month: 'Mai', value: 18500 }, { month: 'Juin', value: 24500 },
    ],
    factories: ['f-podcast', 'f-video', 'f-youtube'],
  },
  {
    id: 'archived-docs',
    name: 'Documents Archivés',
    icon: 'ri-archive-line',
    category: 'production',
    current: 142,
    previous: 98,
    target: 200,
    unit: 'documents',
    trend: 'up',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 62 }, { month: 'Mar', value: 78 },
      { month: 'Avr', value: 98 }, { month: 'Mai', value: 120 }, { month: 'Juin', value: 142 },
    ],
    factories: ['all'],
  },
  {
    id: 'maturity',
    name: 'Maturité Globale Plateforme',
    icon: 'ri-medal-line',
    category: 'growth',
    current: 73.5,
    previous: 58,
    target: 95,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 42 }, { month: 'Fév', value: 48 }, { month: 'Mar', value: 55 },
      { month: 'Avr', value: 58 }, { month: 'Mai', value: 65 }, { month: 'Juin', value: 73.5 },
    ],
    factories: ['all'],
  },
  {
    id: 'time-to-publish',
    name: 'Délai Moyen Publication',
    icon: 'ri-timer-line',
    category: 'production',
    current: 4.2,
    previous: 8.5,
    target: 2,
    unit: 'heures',
    trend: 'down',
    history: [
      { month: 'Jan', value: 12 }, { month: 'Fév', value: 10 }, { month: 'Mar', value: 8.5 },
      { month: 'Avr', value: 7 }, { month: 'Mai', value: 5.5 }, { month: 'Juin', value: 4.2 },
    ],
    factories: ['f-podcast', 'f-video', 'f-youtube'],
  },
];

// ─── CONTINUOUS IMPROVEMENT ─────────────────────────────────────────────────

export interface ImprovementInitiative {
  id: string;
  title: string;
  category: 'quality' | 'automation' | 'compliance' | 'performance' | 'innovation';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'planned' | 'completed' | 'on_hold';
  progress: number;
  startDate: string;
  targetDate: string;
  owner: string;
  impactedFactories: string[];
  metrics: { name: string; before: number; after: number; unit: string }[];
  milestones: { id: string; name: string; date: string; status: 'done' | 'in_progress' | 'pending' }[];
}

export const IMPROVEMENT_INITIATIVES: ImprovementInitiative[] = [
  {
    id: 'ci-001',
    title: 'Auto-Quality Gate 2.0 — Détection Proactive Non-Conformités',
    category: 'quality',
    description: 'Évolution du système de quality gate vers une détection proactive des non-conformités avant production. ML sur historique des corrections.',
    priority: 'high',
    status: 'active',
    progress: 65,
    startDate: '2026-05-15',
    targetDate: '2026-07-30',
    owner: 'Quality Controller',
    impactedFactories: ['f-knowledge', 'f-podcast', 'f-interview', 'f-video'],
    metrics: [
      { name: 'Taux détection proactive', before: 45, after: 85, unit: '%' },
      { name: 'Temps correction', before: 4.5, after: 1.5, unit: 'heures' },
    ],
    milestones: [
      { id: 'm1', name: 'Modèle ML entraîné', date: '2026-06-15', status: 'done' },
      { id: 'm2', name: 'Intégration pipeline', date: '2026-07-01', status: 'in_progress' },
      { id: 'm3', name: 'Tests & validation', date: '2026-07-20', status: 'pending' },
      { id: 'm4', name: 'Déploiement production', date: '2026-07-30', status: 'pending' },
    ],
  },
  {
    id: 'ci-002',
    title: 'Automatisation Complète Pipeline Publication',
    category: 'automation',
    description: 'Passage de 86% à 95% d\'automatisation du pipeline YouTube. Suppression des 2 dernières interventions manuelles.',
    priority: 'high',
    status: 'active',
    progress: 40,
    startDate: '2026-06-01',
    targetDate: '2026-08-15',
    owner: 'YouTube Factory',
    impactedFactories: ['f-youtube'],
    metrics: [
      { name: 'Automatisation pipeline', before: 86, after: 95, unit: '%' },
      { name: 'Temps publication', before: 4.2, after: 1.8, unit: 'heures' },
    ],
    milestones: [
      { id: 'm1', name: 'Audit étapes manuelles', date: '2026-06-15', status: 'done' },
      { id: 'm2', name: 'Développement scripts auto', date: '2026-07-15', status: 'in_progress' },
      { id: 'm3', name: 'Tests bout-en-bout', date: '2026-08-01', status: 'pending' },
      { id: 'm4', name: 'Go-live', date: '2026-08-15', status: 'pending' },
    ],
  },
  {
    id: 'ci-003',
    title: 'Conformité RGPD Renforcée — Audit & Certification',
    category: 'compliance',
    description: 'Audit complet RGPD de la plateforme média. Mise en conformité des processus de collecte de données. Certification externe.',
    priority: 'critical',
    status: 'active',
    progress: 50,
    startDate: '2026-05-01',
    targetDate: '2026-09-01',
    owner: 'Responsable Conformité',
    impactedFactories: ['all'],
    metrics: [
      { name: 'Score conformité RGPD', before: 87, after: 98, unit: '/100' },
      { name: 'Nombre non-conformités', before: 5, after: 0, unit: '' },
    ],
    milestones: [
      { id: 'm1', name: 'Audit initial', date: '2026-05-15', status: 'done' },
      { id: 'm2', name: 'Plan d\'action', date: '2026-06-01', status: 'done' },
      { id: 'm3', name: 'Corrections techniques', date: '2026-07-15', status: 'in_progress' },
      { id: 'm4', name: 'Audit externe', date: '2026-08-15', status: 'pending' },
      { id: 'm5', name: 'Certification', date: '2026-09-01', status: 'pending' },
    ],
  },
  {
    id: 'ci-004',
    title: 'Performance Rendering — Optimisation Assets Visuels',
    category: 'performance',
    description: 'Réduction des temps de rendu vidéo et graphique. Optimisation pipeline GPU. Mise en cache intelligente des assets récurrents.',
    priority: 'medium',
    status: 'active',
    progress: 30,
    startDate: '2026-06-15',
    targetDate: '2026-08-30',
    owner: 'Video Factory + Canva Factory',
    impactedFactories: ['f-canva', 'f-video'],
    metrics: [
      { name: 'Temps rendu vidéo 10min', before: 15, after: 5, unit: 'minutes' },
      { name: 'Temps génération miniature', before: 3, after: 1, unit: 'minutes' },
    ],
    milestones: [
      { id: 'm1', name: 'Benchmark performance', date: '2026-06-30', status: 'in_progress' },
      { id: 'm2', name: 'Optimisation cache', date: '2026-07-20', status: 'pending' },
      { id: 'm3', name: 'Déploiement', date: '2026-08-15', status: 'pending' },
    ],
  },
  {
    id: 'ci-005',
    title: 'Innovation — Voice Cloning Multilingue (FR/EN/AR)',
    category: 'innovation',
    description: 'Extension de Voice Factory avec clonage vocal multilingue. Voix KHEPRA en français, anglais, arabe pour expansion internationale.',
    priority: 'medium',
    status: 'planned',
    progress: 10,
    startDate: '2026-07-01',
    targetDate: '2026-10-30',
    owner: 'Voice Factory',
    impactedFactories: ['f-voice', 'f-podcast', 'f-video', 'f-youtube'],
    metrics: [
      { name: 'Langues supportées', before: 1, after: 3, unit: '' },
      { name: 'Marchés couverts', before: 17, after: 54, unit: 'pays' },
    ],
    milestones: [
      { id: 'm1', name: 'Étude faisabilité', date: '2026-07-15', status: 'pending' },
      { id: 'm2', name: 'Modèle EN entraîné', date: '2026-09-01', status: 'pending' },
      { id: 'm3', name: 'Modèle AR entraîné', date: '2026-10-01', status: 'pending' },
      { id: 'm4', name: 'Déploiement', date: '2026-10-30', status: 'pending' },
    ],
  },
  {
    id: 'ci-006',
    title: 'Archivage Intelligent — Classification Automatique Contenus',
    category: 'innovation',
    description: 'Système de classification automatique des contenus médias par thème, date, format, audience. Recherche sémantique avancée.',
    priority: 'high',
    status: 'active',
    progress: 55,
    startDate: '2026-05-01',
    targetDate: '2026-07-30',
    owner: 'Knowledge Factory',
    impactedFactories: ['all'],
    metrics: [
      { name: 'Temps recherche contenu', before: 8, after: 2, unit: 'minutes' },
      { name: 'Précision classification', before: 78, after: 95, unit: '%' },
    ],
    milestones: [
      { id: 'm1', name: 'Taxonomie définie', date: '2026-05-15', status: 'done' },
      { id: 'm2', name: 'Modèle classification', date: '2026-06-15', status: 'done' },
      { id: 'm3', name: 'Intégration pipeline', date: '2026-07-10', status: 'in_progress' },
      { id: 'm4', name: 'Go-live', date: '2026-07-30', status: 'pending' },
    ],
  },
];

// ─── COMMAND CENTER STATS ───────────────────────────────────────────────────

export const COMMAND_CENTER_STATS = {
  totalFactories: 8,
  operationalFactories: 8,
  degradedFactories: 0,
  offlineFactories: 0,
  totalOutputs: 13425,
  avgQualityScore: 93.8,
  avgComplianceScore: 95.5,
  avgAutomationRate: 80.75,
  globalMaturity: 73.5,
  targetMaturity: 95,
  totalAlerts: 4,
  criticalAlerts: 0,
  warningAlerts: 2,
  infoAlerts: 2,
  totalDocuments: 142,
  activeImprovements: 5,
  completedImprovements: 8,
  lastFullAudit: '2026-06-22',
  nextFullAudit: '2026-06-29',
  governanceStatus: 'Actif — Supervision humaine pour décisions stratégiques, réglementaires et éditoriales sensibles. Validation DG obligatoire avant toute publication engageant KHEPRA EXPERTS.',
  humanValidationRequired: ['Décisions stratégiques de contenu', 'Validations réglementaires critiques', 'Modifications de la charte éditoriale', 'Publications engageant la responsabilité de KHEPRA'],
};





