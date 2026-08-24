// KOS CDO Innovation Command Center™ — Mock Data
// Seeding des capacités avancées Claude dans l'infrastructure KOS
// 4 Piliers : Workflows Agentiques · Interopérabilité · Gouvernance & Trust · Auto-Apprentissage

export interface MultiStepWorkflow {
  id: string;
  name: string;
  category: 'content_production' | 'compliance_audit' | 'growth_automation' | 'data_engineering';
  description: string;
  steps: WorkflowStep[];
  triggers: string[];
  qualityGates: QualityGate[];
  estimatedDuration: string;
  connectedFunctions: string[];
  status: 'active' | 'testing' | 'planned';
  successRate: number;
  totalExecutions: number;
  avgDuration: string;
  lastExecuted: string;
}

export interface WorkflowStep {
  id: string;
  order: number;
  name: string;
  description: string;
  agent: string;
  inputs: string[];
  outputs: string[];
  acceptableDeviation: string;
  retryPolicy: 'none' | 'once' | 'adaptive';
  validationRule: string;
}

export interface QualityGate {
  stepId: string;
  metric: string;
  threshold: string;
  action: 'pass' | 'retry' | 'escalate';
  description: string;
}

export interface InteroperabilityConnection {
  id: string;
  name: string;
  tier: 'crm' | 'erp' | 'analytics' | 'compliance' | 'communication';
  provider: string;
  status: 'connected' | 'configured' | 'planned';
  dataFlows: DataFlow[];
  securityLevel: 'standard' | 'elevated' | 'maximum';
  authMethod: 'oauth2' | 'api_key' | 'mutual_tls';
  lastSync: string;
  syncFrequency: string;
  edgeFunctionSlug: string;
}

export interface DataFlow {
  id: string;
  direction: 'inbound' | 'outbound' | 'bidirectional';
  dataCategory: 'pii' | 'financial' | 'operational' | 'regulatory' | 'public';
  fields: string[];
  purpose: string;
  retentionPolicy: string;
  encryptionAtRest: boolean;
  encryptionInTransit: boolean;
  minimalRequired: boolean;
}

export interface GovernancePolicy {
  id: string;
  pillar: 'non_training' | 'legal_framework' | 'kyc_identity' | 'data_sovereignty' | 'audit_trail';
  title: string;
  description: string;
  standard: string;
  implementationStatus: 'implemented' | 'in_progress' | 'planned';
  evidenceCount: number;
  lastAudited: string;
  nextAudit: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  controls: GovernanceControl[];
}

export interface GovernanceControl {
  id: string;
  name: string;
  type: 'preventive' | 'detective' | 'corrective';
  status: 'active' | 'testing' | 'planned';
  automationLevel: 'manual' | 'semi_automated' | 'fully_automated';
  evidenceId: string;
}

export interface connectArtifact {
  id: string;
  tag: string;
  domain: string;
  description: string;
  connectionSchema: ConnectionSchema;
  reusableBy: string[];
  createdAt: string;
  version: string;
  usageCount: number;
  dependencies: string[];
}

export interface ConnectionSchema {
  inputSchema: Record<string, string>;
  outputSchema: Record<string, string>;
  errorHandling: string;
  rateLimit: string;
  cachingStrategy: string;
  fallbackBehavior: string;
}

// ============================================================
// PILIER 1 : INGÉNIERIE DES TÂCHES MULTI-ÉTAPES
// ============================================================

export const MULTI_STEP_WORKFLOWS: MultiStepWorkflow[] = [
  {
    id: 'wf-001',
    name: 'Note de Plaidoyer Réglementaire — BCEAO/COBAC',
    category: 'content_production',
    description: "Workflow complet de production d'une note de plaidoyer réglementaire : collecte sources → analyse comparative ISO/Normative → synthèse Minto → livrable KBR. Auto-correction à chaque étape.",
    triggers: ['Nouvelle circulaire publiée', 'Demande client Grand Compte', 'Veille réglementaire hebdomadaire'],
    steps: [
      {
        id: 'wf-001-step-1', order: 1,
        name: 'Collecte & Filtrage des Sources',
        description: "Scraping des textes officiels BCEAO/COBAC, filtrage par pertinence, extraction des articles clés, enrichissement via RAG réglementaire.",
        agent: 'KOS Regulatory Scout',
        inputs: ['Texte réglementaire brut', 'Contexte sectoriel client', 'Historique KBR'],
        outputs: ['Corpus filtré (JSON)', 'Index des articles pertinents', 'Score de pertinence par article'],
        acceptableDeviation: '±5% exhaustivité sources',
        retryPolicy: 'adaptive',
        validationRule: 'Exhaustivité > 90% des articles citables détectés',
      },
      {
        id: 'wf-001-step-2', order: 2,
        name: 'Analyse Comparative ISO/Normative',
        description: "Benchmarking du texte contre les standards ISO 37301, COSO, Bâle III/IV. Identification des écarts et points d'attention.",
        agent: 'KOS Compliance Factory Engine',
        inputs: ['Corpus filtré (JSON)', 'Référentiel ISO 37301', 'Référentiel COSO', 'Référentiel Bâle IV'],
        outputs: ['Matrice de conformité', 'Écarts identifiés (gap analysis)', 'Score de conformité'],
        acceptableDeviation: '±3% scoring',
        retryPolicy: 'once',
        validationRule: 'Matrice de conformité couvre > 85% des exigences applicables',
      },
      {
        id: 'wf-001-step-3', order: 3,
        name: 'Synthèse Stratégique — Méthode Minto',
        description: 'Application de la pyramide de Minto : situation → complication → question → réponse. Rédaction exécutive Big Four.',
        agent: 'KOS LLM Excellence Engine',
        inputs: ['Matrice de conformité', 'Gap analysis', 'Profil client'],
        outputs: ['Synthèse exécutive (PDF)', 'Recommandations prioritaires', 'Plan d\'action 90 jours'],
        acceptableDeviation: 'Conformité stricte Minto (pas de tolérance)',
        retryPolicy: 'adaptive',
        validationRule: 'Structure Minto validée + citations réglementaires exactes',
      },
      {
        id: 'wf-001-step-4', order: 4,
        name: 'Formulation Livrable KBR — QA Final',
        description: "Mise en forme Khepra Business Review, contrôle qualité éditorial, validation citations, génération PDF signé.",
        agent: 'KOS Blog Regulatory Correction Engine',
        inputs: ['Synthèse exécutive (PDF)', 'Recommandations', 'Plan d\'action'],
        outputs: ['Livrable KBR final (PDF/HTML)', 'Métadonnées SEO', 'Résumé LinkedIn'],
        acceptableDeviation: '0% erreur citations (tolérance zéro)',
        retryPolicy: 'none',
        validationRule: '0 erreur citations + 0 coquille + score lisibilité > 75',
      },
    ],
    qualityGates: [
      { stepId: 'wf-001-step-1', metric: 'Exhaustivité', threshold: '>90%', action: 'pass', description: 'Au moins 90% des articles citables détectés' },
      { stepId: 'wf-001-step-1', metric: 'Exhaustivité', threshold: '75-90%', action: 'retry', description: 'Relance avec paramètres élargis' },
      { stepId: 'wf-001-step-1', metric: 'Exhaustivité', threshold: '<75%', action: 'escalate', description: 'Escalade au Senior Compliance Auditor' },
      { stepId: 'wf-001-step-2', metric: 'Couverture ISO', threshold: '>85%', action: 'pass', description: 'Matrice couvre >85% exigences' },
      { stepId: 'wf-001-step-4', metric: 'Erreurs citations', threshold: '=0', action: 'pass', description: 'Zéro erreur tolérée' },
    ],
    estimatedDuration: '45 minutes',
    connectedFunctions: ['kos-regulatory-scout', 'kos-compliance-factory-engine', 'kos-llm-excellence-engine', 'kos-blog-regulatory-correction'],
    status: 'active',
    successRate: 94.2,
    totalExecutions: 187,
    avgDuration: '38 min',
    lastExecuted: '2026-06-26T14:30:00Z',
  },
  {
    id: 'wf-002',
    name: 'Audit Conformité COBAC — Full Auto',
    category: 'compliance_audit',
    description: "Pipeline automatisé d'audit COBAC complet : scan réglementaire → gap analysis → rapport d'audit → plan de remédiation → suivi trimestriel.",
    triggers: ['Inspection COBAC annoncée', 'Revue trimestrielle', 'Nouvelle circulaire COBAC'],
    steps: [
      {
        id: 'wf-002-step-1', order: 1,
        name: 'Scan Réglementaire COBAC',
        description: "Collecte exhaustive des textes COBAC applicables selon le périmètre client (banque/SFD/fintech). Croisement avec le registre des risques.",
        agent: 'KOS Regulatory Intelligence Engine',
        inputs: ['Périmètre client', 'Registre des risques', 'Historique inspections'],
        outputs: ['Cartographie réglementaire', 'Liste textes applicables', 'Score de criticité par texte'],
        acceptableDeviation: '±2 textes',
        retryPolicy: 'adaptive',
        validationRule: 'Couverture > 95% textes COBAC en vigueur',
      },
      {
        id: 'wf-002-step-2', order: 2,
        name: 'Gap Analysis & Diagnostic',
        description: "Analyse des écarts entre la situation actuelle et les exigences COBAC. Scoring par domaine (gouvernance, risque, conformité, LCB/FT).",
        agent: 'KOS Senior Compliance Auditor',
        inputs: ['Cartographie réglementaire', 'Documents internes client', 'Rapports précédents'],
        outputs: ['Rapport de gap analysis', 'Heatmap des risques', 'Score conformité par domaine'],
        acceptableDeviation: '±5% scoring',
        retryPolicy: 'once',
        validationRule: 'Tous les domaines COBAC couverts avec justificatifs',
      },
      {
        id: 'wf-002-step-3', order: 3,
        name: 'Génération Rapport d\'Audit',
        description: "Rédaction du rapport d'audit au format COBAC standard. Inclut les constats, les non-conformités classées (majeure/significative/mineure), et les recommandations.",
        agent: 'KOS Compliance Factory Engine',
        inputs: ['Gap analysis', 'Heatmap risques', 'Éléments probants'],
        outputs: ['Rapport d\'audit PDF', 'Annexes justificatives', 'Synthèse COMEX'],
        acceptableDeviation: '0% sur classification NC',
        retryPolicy: 'none',
        validationRule: 'Classification NC conforme nomenclature COBAC + justificatifs chaînés',
      },
      {
        id: 'wf-002-step-4', order: 4,
        name: 'Plan de Remédiation + Suivi',
        description: "Génération du plan de remédiation avec priorisation, échéancier, responsables. Mise en place du suivi trimestriel automatisé.",
        agent: 'KOS Regulatory Remediation Engine',
        inputs: ['Rapport d\'audit', 'Classification NC', 'Ressources client'],
        outputs: ['Plan de remédiation', 'Calendrier actions', 'Tableau de bord suivi'],
        acceptableDeviation: 'Délais cohérents avec criticité',
        retryPolicy: 'once',
        validationRule: 'Toutes les NC majeures ont un plan < 30 jours',
      },
    ],
    qualityGates: [
      { stepId: 'wf-002-step-1', metric: 'Couverture textes', threshold: '>95%', action: 'pass', description: 'Couverture exhaustive COBAC' },
      { stepId: 'wf-002-step-3', metric: 'Classification NC', threshold: '=standard', action: 'pass', description: 'Nomenclature COBAC respectée' },
    ],
    estimatedDuration: '2 heures',
    connectedFunctions: ['kos-regulatory-intelligence-engine', 'kos-senior-compliance-auditor', 'kos-compliance-factory-engine', 'kos-regulatory-remediation-engine'],
    status: 'active',
    successRate: 91.7,
    totalExecutions: 94,
    avgDuration: '1h 52min',
    lastExecuted: '2026-06-25T09:00:00Z',
  },
  {
    id: 'wf-003',
    name: 'Pipeline Lead → Closing — Full Growth Automation',
    category: 'growth_automation',
    description: "Workflow agentique complet : capture lead magnet → scoring → nurturing personnalisé → proposition commerciale → closing. Auto-optimisation continue.",
    triggers: ['Nouveau lead qualifié', 'Lead inactif 14 jours', 'Demande de proposition'],
    steps: [
      {
        id: 'wf-003-step-1', order: 1,
        name: 'Capture & Qualification Lead',
        description: "Capture via Lead Magnet, enrichissement profil (LinkedIn, secteur, CA estimé), scoring Big Four prédictif.",
        agent: 'KOS Lead Scoring Engine',
        inputs: ['Données formulaire', 'Enrichissement LinkedIn', 'Historique interactions'],
        outputs: ['Profil lead enrichi', 'Score de qualification', 'Segmentation (P0/P1/P2)'],
        acceptableDeviation: '±10% scoring',
        retryPolicy: 'adaptive',
        validationRule: 'Score calculé avec > 80% confiance',
      },
      {
        id: 'wf-003-step-2', order: 2,
        name: 'Nurturing Personnalisé — High Touch Afrique',
        description: "Séquence nurturing adaptée au cycle de décision africain. Alignement institutionnel, PoC locales, ancrage perte d'opportunité.",
        agent: 'KOS Growth Orchestrator',
        inputs: ['Profil lead', 'Score qualification', 'Secteur/Pays'],
        outputs: ['Séquence email personnalisée', 'Contenu nurturing contextualisé', 'Triggers de relance'],
        acceptableDeviation: 'Personnalisation > 90%',
        retryPolicy: 'once',
        validationRule: 'Au moins 3 touches personnalisées sur 14 jours',
      },
      {
        id: 'wf-003-step-3', order: 3,
        name: 'Génération Proposition Commerciale',
        description: "Architecture offre 3 niveaux (Gold/Premium/Enterprise). Tarification à la valeur avec ROI documenté. Inclut cas clients locaux.",
        agent: 'KOS Closing Growth Engine',
        inputs: ['Profil lead enrichi', 'Historique nurturing', 'Cas clients similaires'],
        outputs: ['Proposition commerciale PDF', 'ROI calculator', 'Script de closing'],
        acceptableDeviation: 'Prix ancrés sur valeur, pas TJM',
        retryPolicy: 'none',
        validationRule: 'Offre 3 niveaux avec ROI > 5x documenté',
      },
    ],
    qualityGates: [
      { stepId: 'wf-003-step-1', metric: 'Confiance scoring', threshold: '>80%', action: 'pass', description: 'Score prédictif fiable' },
      { stepId: 'wf-003-step-3', metric: 'ROI documenté', threshold: '>5x', action: 'pass', description: 'ROI minimum démontré' },
    ],
    estimatedDuration: '30 minutes (hors séquence nurturing)',
    connectedFunctions: ['kos-lead-scoring', 'kos-growth-orchestrator', 'kos-closing-growth-engine', 'email-funnel-sequence'],
    status: 'active',
    successRate: 88.5,
    totalExecutions: 312,
    avgDuration: '28 min',
    lastExecuted: '2026-06-27T08:15:00Z',
  },
  {
    id: 'wf-004',
    name: 'Data Engineering — ETL Réglementaire Africa',
    category: 'data_engineering',
    description: "Pipeline ETL automatisé : ingestion textes réglementaires (BCEAO/COBAC/OHADA/GAFI) → structuration → enrichissement RAG → diffusion aux agents KOS.",
    triggers: ['Nouveau texte publié', 'Mise à jour journal officiel', 'Alerte réglementaire'],
    steps: [
      {
        id: 'wf-004-step-1', order: 1,
        name: 'Ingestion & Parsing',
        description: "Détection nouvelle publication, téléchargement, OCR si nécessaire, parsing structuré (articles, annexes, références).",
        agent: 'KOS Regulatory Data Architect',
        inputs: ['URL publication', 'Format document', 'Métadonnées JO'],
        outputs: ['Texte parsé (JSON)', 'Articles indexés', 'Références croisées extraites'],
        acceptableDeviation: '±1% erreur OCR',
        retryPolicy: 'adaptive',
        validationRule: 'Parsing > 99% articles détectés correctement',
      },
      {
        id: 'wf-004-step-2', order: 2,
        name: 'Enrichissement Sémantique & RAG',
        description: 'Vectorisation du texte, enrichissement avec métadonnées réglementaires, indexation dans le Knowledge Graph KOS.',
        agent: 'KOS Knowledge Manager',
        inputs: ['Texte parsé (JSON)', 'Knowledge Graph existant', 'Glossaire réglementaire'],
        outputs: ['Embeddings vectoriels', 'Entités KG enrichies', 'Index RAG mis à jour'],
        acceptableDeviation: '±2% entités manquantes',
        retryPolicy: 'once',
        validationRule: 'Toutes les entités réglementaires majeures indexées',
      },
      {
        id: 'wf-004-step-3', order: 3,
        name: 'Diffusion aux Agents KOS',
        description: "Notification des agents concernés, mise à jour des bases de connaissances, régénération des réponses RAG si nécessaire.",
        agent: 'KOS Multi-Agent Orchestrator',
        inputs: ['Index RAG mis à jour', 'Registre agents KOS', 'Règles de diffusion'],
        outputs: ['Notifications agents', 'Logs de diffusion', 'Métriques de mise à jour'],
        acceptableDeviation: '0% omission agents critiques',
        retryPolicy: 'none',
        validationRule: '100% agents concernés notifiés dans les 5 minutes',
      },
    ],
    qualityGates: [
      { stepId: 'wf-004-step-1', metric: 'Précision parsing', threshold: '>99%', action: 'pass', description: 'Parsing quasi-parfait' },
      { stepId: 'wf-004-step-2', metric: 'Entités majeures', threshold: '100%', action: 'pass', description: 'Aucune entité critique manquante' },
    ],
    estimatedDuration: '15 minutes',
    connectedFunctions: ['kos-regulatory-data-architect', 'kos-knowledge-manager', 'kos-multi-agent-orchestrator', 'kos-rag-source-enricher'],
    status: 'active',
    successRate: 97.1,
    totalExecutions: 456,
    avgDuration: '12 min',
    lastExecuted: '2026-06-27T06:00:00Z',
  },
];

// ============================================================
// PILIER 2 : INTEROPÉRABILITÉ & ÉCHANGE DE DONNÉES TIERS
// ============================================================

export const INTEROPERABILITY_CONNECTIONS: InteroperabilityConnection[] = [
  {
    id: 'conn-001',
    name: 'HubSpot CRM — Synchronisation Leads Corporate',
    tier: 'crm',
    provider: 'HubSpot',
    status: 'connected',
    dataFlows: [
      {
        id: 'flow-001a', direction: 'bidirectional', dataCategory: 'pii',
        fields: ['nom', 'email', 'entreprise', 'poste'],
        purpose: 'Synchronisation contacts qualifiés KBR → CRM',
        retentionPolicy: 'Durée relation commerciale + 3 ans',
        encryptionAtRest: true, encryptionInTransit: true, minimalRequired: true,
      },
      {
        id: 'flow-001b', direction: 'outbound', dataCategory: 'financial',
        fields: ['chiffre_affaires_estime', 'budget_mission', 'pipeline_value_fcfa'],
        purpose: 'Pipeline commercial KOS → CRM pour reporting COMEX',
        retentionPolicy: '5 ans (obligation fiscale UEMOA)',
        encryptionAtRest: true, encryptionInTransit: true, minimalRequired: true,
      },
      {
        id: 'flow-001c', direction: 'inbound', dataCategory: 'operational',
        fields: ['deal_stage', 'last_contact_date', 'next_action'],
        purpose: 'Statut commercial CRM → KOS pour synchronisation nurturing',
        retentionPolicy: 'Aligné sur politique CRM',
        encryptionAtRest: true, encryptionInTransit: true, minimalRequired: true,
      },
    ],
    securityLevel: 'maximum',
    authMethod: 'oauth2',
    lastSync: '2026-06-27T07:00:00Z',
    syncFrequency: 'Toutes les 15 minutes',
    edgeFunctionSlug: 'kos-platform-credentials',
  },
  {
    id: 'conn-002',
    name: 'Google Analytics 4 — Intelligence Trafic',
    tier: 'analytics',
    provider: 'Google Analytics',
    status: 'connected',
    dataFlows: [
      {
        id: 'flow-002a', direction: 'inbound', dataCategory: 'operational',
        fields: ['page_views', 'sessions', 'bounce_rate', 'avg_engagement_time', 'traffic_source'],
        purpose: 'Analyse trafic KOS → optimisation contenu et SEO',
        retentionPolicy: '26 mois (standard GA4)',
        encryptionAtRest: false, encryptionInTransit: true, minimalRequired: true,
      },
      {
        id: 'flow-002b', direction: 'inbound', dataCategory: 'public',
        fields: ['geo_location_aggregated', 'device_category', 'browser'],
        purpose: 'Segmentation audience pour GEO targeting',
        retentionPolicy: '14 mois',
        encryptionAtRest: false, encryptionInTransit: true, minimalRequired: true,
      },
    ],
    securityLevel: 'standard',
    authMethod: 'oauth2',
    lastSync: '2026-06-27T06:30:00Z',
    syncFrequency: 'Toutes les heures',
    edgeFunctionSlug: 'kos-gsc-monitor',
  },
  {
    id: 'conn-003',
    name: 'Qdrant Vector DB — RAG Réglementaire',
    tier: 'compliance',
    provider: 'Qdrant Cloud',
    status: 'connected',
    dataFlows: [
      {
        id: 'flow-003a', direction: 'bidirectional', dataCategory: 'regulatory',
        fields: ['embeddings_vector', 'text_chunks', 'metadata_regulatory', 'source_document_hash'],
        purpose: 'Stockage et recherche sémantique des textes réglementaires africains',
        retentionPolicy: 'Permanent (archive réglementaire)',
        encryptionAtRest: true, encryptionInTransit: true, minimalRequired: true,
      },
    ],
    securityLevel: 'maximum',
    authMethod: 'api_key',
    lastSync: '2026-06-27T08:00:00Z',
    syncFrequency: 'Continu (event-driven)',
    edgeFunctionSlug: 'rag-semantic-search',
  },
  {
    id: 'conn-004',
    name: 'Resend — Email Transactionnel Premium',
    tier: 'communication',
    provider: 'Resend',
    status: 'configured',
    dataFlows: [
      {
        id: 'flow-004a', direction: 'outbound', dataCategory: 'pii',
        fields: ['email', 'nom', 'entreprise'],
        purpose: 'Envoi emails transactionnels (KBR, propositions, alertes)',
        retentionPolicy: '90 jours (logs d\'envoi uniquement)',
        encryptionAtRest: false, encryptionInTransit: true, minimalRequired: true,
      },
      {
        id: 'flow-004b', direction: 'outbound', dataCategory: 'financial',
        fields: ['montant_proposition_fcfa', 'resume_offre'],
        purpose: 'Envoi propositions commerciales chiffrées',
        retentionPolicy: '30 jours',
        encryptionAtRest: false, encryptionInTransit: true, minimalRequired: true,
      },
    ],
    securityLevel: 'elevated',
    authMethod: 'api_key',
    lastSync: '2026-06-26T18:00:00Z',
    syncFrequency: 'On-demand',
    edgeFunctionSlug: 'email-funnel-sequence',
  },
  {
    id: 'conn-005',
    name: 'n8n Workflow Engine — Orchestration Process',
    tier: 'erp',
    provider: 'n8n (Self-Hosted)',
    status: 'planned',
    dataFlows: [
      {
        id: 'flow-005a', direction: 'bidirectional', dataCategory: 'operational',
        fields: ['workflow_id', 'execution_status', 'node_outputs', 'error_logs'],
        purpose: 'Orchestration processus métier conformité',
        retentionPolicy: '90 jours logs + 1 an snapshots',
        encryptionAtRest: true, encryptionInTransit: true, minimalRequired: true,
      },
    ],
    securityLevel: 'elevated',
    authMethod: 'api_key',
    lastSync: '—',
    syncFrequency: 'Temps réel',
    edgeFunctionSlug: 'kos-orchestrator-engine',
  },
];

// ============================================================
// PILIER 3 : GOUVERNANCE, COMPLIANCE & CONFIANCE PREMIUM
// ============================================================

export const GOVERNANCE_POLICIES: GovernancePolicy[] = [
  {
    id: 'gov-001',
    pillar: 'non_training',
    title: 'Non-Entraînement des Modèles — Opt-Out Strict',
    description: "Garantie absolue que les données propriétaires de Khepra Experts et de ses clients ne sont JAMAIS utilisées pour l'entraînement des modèles d'IA génériques (Anthropic, OpenAI, Google). Paramétrage strict de l'Opt-Out via les Conditions Commerciales et les API headers.",
    standard: 'Anthropic Commercial Terms §5.3 + ISO 27001 A.8.1',
    implementationStatus: 'implemented',
    evidenceCount: 12,
    lastAudited: '2026-06-15',
    nextAudit: '2026-09-15',
    riskLevel: 'critical',
    controls: [
      { id: 'ctrl-001a', name: 'Header x-anthropic-opt-out', type: 'preventive', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0451' },
      { id: 'ctrl-001b', name: 'Audit trimestriel usage API', type: 'detective', status: 'active', automationLevel: 'semi_automated', evidenceId: 'EVID-2026-0452' },
      { id: 'ctrl-001c', name: 'Clause contractuelle client', type: 'preventive', status: 'active', automationLevel: 'manual', evidenceId: 'EVID-2026-0453' },
    ],
  },
  {
    id: 'gov-002',
    pillar: 'legal_framework',
    title: 'Cadre Juridique Africain & RGPD — Convergence',
    description: "Intégration des bases juridiques de traitement des données en faisant converger les règles d'Anthropic, le RGPD et les législations nationales sur la protection des données personnelles en Afrique francophone (CDP Sénégal, APDP Bénin, ARTCI Côte d'Ivoire, etc.).",
    standard: 'RGPD Art. 6, 28 / CDP Sénégal Loi 2008-12 / APDP Bénin Loi 2017-20',
    implementationStatus: 'in_progress',
    evidenceCount: 8,
    lastAudited: '2026-05-20',
    nextAudit: '2026-08-20',
    riskLevel: 'high',
    controls: [
      { id: 'ctrl-002a', name: 'Registre traitements (12 pays)', type: 'preventive', status: 'active', automationLevel: 'semi_automated', evidenceId: 'EVID-2026-0460' },
      { id: 'ctrl-002b', name: 'DPIA — Analyse impact (5 traitements)', type: 'preventive', status: 'testing', automationLevel: 'manual', evidenceId: 'EVID-2026-0461' },
      { id: 'ctrl-002c', name: 'Mentions légales localisées', type: 'preventive', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0462' },
      { id: 'ctrl-002d', name: 'Consentement cookie (pays UEMOA)', type: 'preventive', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0463' },
    ],
  },
  {
    id: 'gov-003',
    pillar: 'kyc_identity',
    title: 'Robustesse Identité — Protocole KYC/KYB Fintech',
    description: "Préparation de l'infrastructure cognitive de KOS à intégrer et valider des protocoles de vérification d'âge et d'identité (Données de vérification/KYC), indispensables pour le déploiement futur de services financiers ou d'inclusion financière.",
    standard: 'GAFI Recommandation 10 / BCEAO Instruction 008-05-2015 / COBAC Règlement 01/09-CEMAC',
    implementationStatus: 'planned',
    evidenceCount: 3,
    lastAudited: '2026-04-10',
    nextAudit: '2026-10-10',
    riskLevel: 'high',
    controls: [
      { id: 'ctrl-003a', name: 'Schéma données KYC (BCEAO)', type: 'preventive', status: 'testing', automationLevel: 'manual', evidenceId: 'EVID-2026-0470' },
      { id: 'ctrl-003b', name: 'Validation CNI/Passeport OCR', type: 'detective', status: 'planned', automationLevel: 'semi_automated', evidenceId: 'EVID-2026-0471' },
      { id: 'ctrl-003c', name: 'Vérification PEP/Listes sanctions', type: 'detective', status: 'planned', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0472' },
    ],
  },
  {
    id: 'gov-004',
    pillar: 'data_sovereignty',
    title: 'Souveraineté des Données — Stockage Localisé Afrique',
    description: "Garantie que les données clients stratégiques (financières, KYC, stratégiques) sont stockées et traitées exclusivement dans des data centers situés en Afrique ou dans des juridictions reconnues comme adéquates par les régulateurs africains.",
    standard: 'BCEAO Avis 008-05-2015 / RGPD Art. 44-49 / Cloud Act',
    implementationStatus: 'in_progress',
    evidenceCount: 6,
    lastAudited: '2026-06-01',
    nextAudit: '2026-09-01',
    riskLevel: 'medium',
    controls: [
      { id: 'ctrl-004a', name: 'Supabase région Europe (adéquat RGPD)', type: 'preventive', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0480' },
      { id: 'ctrl-004b', name: 'Chiffrement AES-256 at-rest', type: 'preventive', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0481' },
      { id: 'ctrl-004c', name: 'Plan migration Afrique 2027', type: 'corrective', status: 'planned', automationLevel: 'manual', evidenceId: 'EVID-2026-0482' },
    ],
  },
  {
    id: 'gov-005',
    pillar: 'audit_trail',
    title: 'Traçabilité Complète — Audit Trail ISO 27001',
    description: "Enregistrement horodaté et immuable de toutes les actions des agents IA KOS : qui a fait quoi, quand, avec quelles données, quel résultat. Chaîne de custody pour audits réglementaires.",
    standard: 'ISO 27001 A.12.4 / COSO Principle 12 / BCEAO Dispositif de Contrôle Interne',
    implementationStatus: 'implemented',
    evidenceCount: 24,
    lastAudited: '2026-06-20',
    nextAudit: '2026-09-20',
    riskLevel: 'low',
    controls: [
      { id: 'ctrl-005a', name: 'kos_universal_audit_log', type: 'detective', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0490' },
      { id: 'ctrl-005b', name: 'kos_ai_decision_log', type: 'detective', status: 'active', automationLevel: 'fully_automated', evidenceId: 'EVID-2026-0491' },
      { id: 'ctrl-005c', name: 'Rapport trimestriel audit trail', type: 'detective', status: 'active', automationLevel: 'semi_automated', evidenceId: 'EVID-2026-0492' },
    ],
  },
];

// ============================================================
// PILIER 4 : AUTO-APPRENTISSAGE APPLICATIF — [KOS-CONNECT]
// ============================================================

export const KOS_CONNECT_ARTIFACTS: connectArtifact[] = [
  {
    id: 'c-001',
    tag: 'KOS-CONNECT',
    domain: 'Interopérabilité CRM',
    description: "Schéma standard de connexion bidirectionnelle KOS ↔ CRM externe (HubSpot, Salesforce, Zoho). Gère la synchronisation leads, pipeline, et la minimisation des données échangées.",
    connectionSchema: {
      inputSchema: {
        leads: 'Données leads KOS (nom, email, entreprise, score)',
        pipeline: 'État pipeline (deal_stage, value_fcfa, probability)',
        interactions: 'Historique nurturing (emails, téléchargements, webinars)',
      },
      outputSchema: {
        contacts: 'Profil enrichi CRM (dernière interaction, statut client)',
        deals: 'Opportunités CRM associées',
        activities: 'Activités commerciales CRM',
      },
      errorHandling: 'Retry 3x avec backoff exponentiel (15s, 60s, 240s). Fallback: file d\'attente Redis.',
      rateLimit: '100 req/min — lissage via token bucket',
      cachingStrategy: 'Cache 5 minutes pour les lectures CRM. Invalidation au push.',
      fallbackBehavior: 'Si CRM down > 5min → mode dégradé (stockage local + synchro différée automatique)',
    },
    reusableBy: ['KOS Growth Orchestrator', 'KOS Closing Growth Engine', 'KOS Lead Scoring Engine', 'KOS CRM Dashboard'],
    createdAt: '2026-06-01',
    version: '2.1.0',
    usageCount: 894,
    dependencies: ['kos-platform-credentials', 'supabase-edge-functions'],
  },
  {
    id: 'c-002',
    tag: 'KOS-CONNECT',
    domain: 'Pipeline ETL Réglementaire',
    description: "Schéma d'ingestion automatisée des textes réglementaires africains : scraping → parsing → vectorisation → indexation RAG. Optimisé pour les formats JO UEMOA/CEMAC.",
    connectionSchema: {
      inputSchema: {
        source_url: 'URL du texte réglementaire (JO, site BCEAO, site COBAC)',
        metadata: 'Type, date, juridiction, articles concernés',
        format: 'PDF/HTML natif ou scanné (OCR automatique)',
      },
      outputSchema: {
        parsed_text: 'Texte structuré JSON avec articles, annexes, références',
        embeddings: 'Vecteurs 1536d pour recherche sémantique',
        knowledge_graph_nodes: 'Entités KG extraites et liées',
      },
      errorHandling: 'OCR failure → requeue avec paramètres améliorés. Parsing failure → escalade manuelle.',
      rateLimit: '10 textes/min — file d\'attente priorisée par criticité',
      cachingStrategy: 'Hash SHA-256 du texte pour déduplication. Cache permanent des embeddings.',
      fallbackBehavior: 'Mode dégradé: parsing basique sans enrichissement sémantique. File d\'attente persistante PostgreSQL.',
    },
    reusableBy: ['KOS Regulatory Brain', 'KOS Knowledge Graph', 'KOS RAG Orchestrator', 'KOS Compliance Factory'],
    createdAt: '2026-05-15',
    version: '1.8.0',
    usageCount: 2103,
    dependencies: ['kos-regulatory-data-architect', 'kos-knowledge-manager', 'rag-semantic-search', 'qdrant-vector-db'],
  },
  {
    id: 'c-003',
    tag: 'KOS-CONNECT',
    domain: 'Boucle Auto-Correction Workflows',
    description: "Mécanisme universel d'auto-correction pour tous les workflows multi-étapes KOS. Évalue la qualité à chaque gate, ré-exécute si écart détecté, escalade si échec répété.",
    connectionSchema: {
      inputSchema: {
        step_output: 'Sortie de l\'étape en cours',
        quality_metrics: 'Métriques de qualité collectées',
        validation_rules: 'Règles de validation définies pour cette étape',
      },
      outputSchema: {
        pass_fail: 'Décision: pass, retry, ou escalate',
        correction_instructions: 'Instructions de correction si retry',
        escalation_context: 'Contexte complet si escalade',
      },
      errorHandling: 'Max 3 retries adaptatifs. Après 3 échecs → escalade automatique au Senior Compliance Auditor.',
      rateLimit: 'Pas de limite (interne)',
      cachingStrategy: 'Cache des résultats de validation par hash d\'input pour éviter re-calculs',
      fallbackBehavior: 'Si boucle d\'auto-correction bloquée → pause workflow + notification Slack/Email',
    },
    reusableBy: ['TOUS les workflows multi-étapes KOS', 'KOS Quality Assurance Authority', 'KOS Expert Reviewer'],
    createdAt: '2026-04-20',
    version: '3.0.0',
    usageCount: 5471,
    dependencies: ['kos-orchestrator-engine', 'kos-quality-assurance-authority', 'kos-expert-reviewer'],
  },
  {
    id: 'c-004',
    tag: 'KOS-CONNECT',
    domain: 'Gateway API Tiers — Sécurité par Design',
    description: "Protocole standard de connexion API tiers avec principe du privilège minimum. Chaque connexion est isolée, auditable, avec scope de données minimal.",
    connectionSchema: {
      inputSchema: {
        service: 'Identifiant du service tiers',
        scope: 'Scope de données requis (minimum nécessaire)',
        credentials: 'Référence credentials (jamais en clair)',
      },
      outputSchema: {
        connection_id: 'ID unique de connexion',
        allowed_fields: 'Liste exacte des champs autorisés',
        audit_session: 'Token de session d\'audit',
      },
      errorHandling: 'Toute tentative d\'accès hors scope → blocage + alerte sécurité. Rate limit par service.',
      rateLimit: 'Variable par service — défini dans kos_external_api_config',
      cachingStrategy: 'Aucun cache pour les données PII/financières. Cache 1 minute pour opérationnel.',
      fallbackBehavior: 'Circuit breaker: après 5 échecs → désactivation temporaire (5 min) + notification.',
    },
    reusableBy: ['KOS External API Config', 'KOS Platform Credentials', 'KOS Security Logger', 'KOS SysOps Health'],
    createdAt: '2026-06-10',
    version: '1.2.0',
    usageCount: 342,
    dependencies: ['kos-platform-credentials', 'kos-security-logger', 'kos-external-api-config'],
  },
  {
    id: 'c-005',
    tag: 'KOS-CONNECT',
    domain: 'Protocole Non-Entraînement IA — Header Injection',
    description: "Injection automatique des headers d'opt-out dans TOUS les appels API vers les fournisseurs d'IA (Anthropic, OpenAI, Google). Garantit contractuellement la non-utilisation des données pour l'entraînement.",
    connectionSchema: {
      inputSchema: {
        provider: 'Fournisseur IA (anthropic, openai, google)',
        endpoint: 'Endpoint API appelé',
        payload: 'Données envoyées',
      },
      outputSchema: {
        modified_request: 'Requête avec headers opt-out injectés',
        opt_out_confirmed: 'Confirmation opt-out (basé sur réponse API)',
      },
      errorHandling: 'Si opt-out non supporté par le fournisseur → bloquer l\'appel + alerter CDO.',
      rateLimit: 'Pas de limite (injection automatique)',
      cachingStrategy: 'Cache des capacités opt-out par fournisseur (rafraîchi mensuellement)',
      fallbackBehavior: 'Aucun fallback — bloquer l\'appel si opt-out impossible. Zéro compromis.',
    },
    reusableBy: ['TOUS les agents KOS utilisant des API IA externes', 'KOS AI Governance Council', 'KOS Legal AI Governance'],
    createdAt: '2026-05-01',
    version: '1.0.0',
    usageCount: 12890,
    dependencies: ['kos-ai-governance-council', 'kos-legal-ai-governance'],
  },
  {
    id: 'c-006',
    tag: 'KOS-CONNECT',
    domain: 'Data Flow Cartography — FCFA Financial Data',
    description: "Cartographie automatisée des flux de données financières en FCFA. Traçabilité complète : qui envoie quoi, à quel tiers, pour quelle finalité, avec quelle base légale.",
    connectionSchema: {
      inputSchema: {
        data_element: 'Élément de données financières',
        source_system: 'Système source KOS',
        destination: 'Tiers destinataire',
        purpose: 'Finalité du transfert',
      },
      outputSchema: {
        data_flow_map: 'Cartographie visuelle du flux',
        legal_basis: 'Base légale applicable (consentement, obligation légale, intérêt légitime)',
        risk_assessment: 'Évaluation risque (DPIA score)',
        regulator_notification: 'Notification régulateur si nécessaire',
      },
      errorHandling: 'Flux non documenté → quarantaine automatique + alerte DPO.',
      rateLimit: 'N/A (outil de cartographie, pas de rate limit)',
      cachingStrategy: 'Mise en cache 24h de la cartographie. Invalidation sur nouveau flux.',
      fallbackBehavior: 'Mode manuel possible si automatisation indisponible.',
    },
    reusableBy: ['KOS Data Governance', 'KOS Compliance Factory', 'KOS Trust Center', 'KOS Regulatory Observatory'],
    createdAt: '2026-06-20',
    version: '1.0.0',
    usageCount: 56,
    dependencies: ['kos-data-governance', 'kos-trust-center', 'kos-compliance-factory-engine'],
  },
];

// ============================================================
// STATISTIQUES GLOBALES
// ============================================================

export interface CdoInnovationStats {
  totalWorkflows: number;
  activeWorkflows: number;
  totalExecutions: number;
  avgSuccessRate: number;
  totalConnections: number;
  connectedServices: number;
  totalPolicies: number;
  policiesImplemented: number;
  policiesInProgress: number;
  totalControls: number;
  controlsAutomated: number;
  totalKosConnectArtifacts: number;
  totalReuses: number;
  estimatedEfficiencyGain: string;
  orgChartCdo: CdoTeamMember[];
}

export interface CdoTeamMember {
  id: string;
  role: string;
  name: string;
  responsibilities: string[];
  reportsTo: string;
  icon: string;
}

export const CDO_INNOVATION_STATS: CdoInnovationStats = {
  totalWorkflows: 4,
  activeWorkflows: 4,
  totalExecutions: 1049,
  avgSuccessRate: 92.9,
  totalConnections: 5,
  connectedServices: 3,
  totalPolicies: 5,
  policiesImplemented: 2,
  policiesInProgress: 2,
  totalControls: 17,
  controlsAutomated: 9,
  totalKosConnectArtifacts: 6,
  totalReuses: 21756,
  estimatedEfficiencyGain: '+340% productivité agents, -85% erreurs manuelles, +12M FCFA/mois économisés',
  orgChartCdo: [
    {
      id: 'cdo-001', role: 'Chief Data & Innovation Officer', name: 'Dr. Koffi E. (CDO)',
      responsibilities: ['Stratégie data & IA', 'Gouvernance données', 'Innovation technologique', 'Architecture systèmes', 'Sécurité & conformité'],
      reportsTo: 'Managing Partner KHEPRA', icon: 'ri-vip-crown-line',
    },
    {
      id: 'cdo-002', role: 'Lead Data Architect', name: 'Agent KOS — Regulatory Data Architect',
      responsibilities: ['Modélisation données réglementaires', 'Pipeline ETL', 'Qualité données'],
      reportsTo: 'CDO', icon: 'ri-database-2-line',
    },
    {
      id: 'cdo-003', role: 'AI/ML Engineering Lead', name: 'Agent KOS — Multi-Agent Orchestrator',
      responsibilities: ['Workflows agentiques', 'Fine-tuning modèles', 'Prompt engineering'],
      reportsTo: 'CDO', icon: 'ri-brain-line',
    },
    {
      id: 'cdo-004', role: 'Data Privacy & Compliance Officer', name: 'Agent KOS — Regulatory Citation Validator',
      responsibilities: ['RGPD & Lois africaines', 'Opt-out IA', 'KYC/KYB', 'Audit trail'],
      reportsTo: 'CDO', icon: 'ri-shield-check-line',
    },
    {
      id: 'cdo-005', role: 'Integration & API Engineer', name: 'Agent KOS — External API Config',
      responsibilities: ['Interopérabilité', 'Sécurité API', 'Gateway management'],
      reportsTo: 'CDO', icon: 'ri-plug-line',
    },
  ],
};

// ============================================================
// LOGS D'EXÉCUTION INITIAUX
// ============================================================

export interface CdoExecutionLog {
  id: string;
  timestamp: string;
  domain: string;
  action: string;
  status: 'success' | 'warning' | 'error' | 'info';
  detail: string;
  edgeFunction?: string;
  connect?: string;
}

export const INITIAL_CDO_LOGS: CdoExecutionLog[] = [
  {
    id: 'log-cdo-001', timestamp: '2026-06-27T08:00:00Z', domain: 'Workflows',
    action: 'WF-001 Exécution', status: 'success',
    detail: '[KOS-CONNECT] WF-001: Note de plaidoyer BCEAO — 4/4 étapes OK en 34 min. Score qualité 96%. Livrable KBR généré.',
    edgeFunction: 'kos-orchestrator-engine',
  },
  {
    id: 'log-cdo-002', timestamp: '2026-06-27T07:45:00Z', domain: 'Interopérabilité',
    action: 'HubSpot Sync Bidirectionnel', status: 'success',
    detail: '[KOS-CONNECT] Synchronisation CRM: 23 leads mis à jour, 2 nouveaux deals (42M FCFA pipeline). Principe min. données respecté.',
    edgeFunction: 'kos-platform-credentials',
  },
  {
    id: 'log-cdo-003', timestamp: '2026-06-27T07:30:00Z', domain: 'Gouvernance',
    action: 'Contrôle Opt-Out API Anthropic', status: 'success',
    detail: '[KOS-CONNECT] Vérification opt-out: 100% appels API Anthropic avec header x-anthropic-opt-out. 0 violation détectée.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'log-cdo-004', timestamp: '2026-06-27T07:15:00Z', domain: 'ETL Réglementaire',
    action: 'Nouvelle circulaire COBAC détectée', status: 'info',
    detail: '[KOS-CONNECT] ETL déclenché: Circulaire COBAC 2026-05 parsée, 12 articles, 3 annexes. Indexation RAG en cours.',
    edgeFunction: 'kos-regulatory-data-architect',
  },
  {
    id: 'log-cdo-005', timestamp: '2026-06-27T07:00:00Z', domain: 'Gouvernance',
    action: 'Audit Trail Trimestriel', status: 'warning',
    detail: '3 anomalies mineures détectées dans kos_ai_decision_log: 2 timeouts edge function + 1 payload non standard. Correction automatique en cours.',
    edgeFunction: 'kos-security-logger',
  },
  {
    id: 'log-cdo-006', timestamp: '2026-06-27T06:00:00Z', domain: 'Auto-Apprentissage',
    action: '[KOS-CONNECT] Artifact c-003 réutilisé', status: 'info',
    detail: 'Boucle auto-correction réutilisée 23 fois en 24h par 7 agents différents. Taux de succès retry: 87%.',
  },
];



