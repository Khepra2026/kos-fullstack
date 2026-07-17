// ═══════════════════════════════════════════════════════════════════════════
// KOS TOTAL GOVERNANCE & REGULATORY EXCELLENCE™
// Autorité Suprême — Contrôle Qualité, Conformité & Gouvernance
// Écosystème KHEPRA EXPERTS — Juin 2026
// ═══════════════════════════════════════════════════════════════════════════

// ─── TYPES ──────────────────────────────────────────────────────────────────

export interface ContentVerificationRecord {
  id: string;
  content_type: 'article' | 'livre_blanc' | 'etude' | 'newsletter' | 'video' | 'podcast' | 'proposition' | 'rapport' | 'post_linkedin' | 'post_social';
  title: string;
  author: string;
  published_at: string;
  verification_status: 'VALIDÉE' | 'À_CONFIRMER' | 'NON_VÉRIFIÉE';
  fact_check_score: number;
  regulatory_compliance_score: number;
  source_count: number;
  verified_sources_count: number;
  issues: string[];
  last_reviewed: string;
  reviewer: string;
  auto_blocked: boolean;
}

export interface AgentGovernanceRecord {
  id: string;
  agent_name: string;
  hub: string;
  precision: number;
  coherence: number;
  conformite: number;
  taux_erreur: number;
  cout_mensuel_fcfa: number;
  productivite: number;
  incidents_30j: number;
  dernier_audit: string;
  score_qualite: number;
  status: 'excellent' | 'bon' | 'acceptable' | 'surveillance' | 'critique';
  recommandations: string[];
}

export interface WebsiteAuditRecord {
  id: string;
  site: string;
  url: string;
  score_conformite: number;
  liens_casses: number;
  liens_total: number;
  pages_verifiees: number;
  pages_total: number;
  certificat_ssl: boolean;
  headers_securite: boolean;
  derniere_verification: string;
  issues: string[];
  score_global: number;
}

export interface SocialMediaCheckRecord {
  id: string;
  platform: 'linkedin' | 'youtube' | 'facebook' | 'x';
  post_title: string;
  author: string;
  scheduled_at: string;
  verification_status: 'VALIDÉE' | 'À_CONFIRMER' | 'NON_VÉRIFIÉE';
  url_active: boolean;
  image_valide: boolean;
  rattachement_entreprise: boolean;
  hashtags_conformes: boolean;
  conformite_reglementaire: boolean;
  bloquée: boolean;
  motif_blocage: string | null;
  reviewed_by: string;
}

export interface KnowledgeSourceRecord {
  id: string;
  source_name: string;
  category: 'regulateur' | 'standard_international' | 'institution_financiere' | 'academique' | 'media';
  authority_level: 'primaire' | 'secondaire' | 'tertiaire';
  last_updated: string;
  documents_count: number;
  access_status: 'actif' | 'restreint' | 'expiré';
  priority_score: number;
  integration_kos: boolean;
  description: string;
}

export interface ComplianceFrameworkAssessment {
  id: string;
  framework: string;
  category: 'reglementation_financiere' | 'gouvernance' | 'securite' | 'protection_donnees' | 'lbc_ft' | 'fiscalite';
  authority: string;
  applicable_zone: 'UEMOA' | 'CEMAC' | 'International' | 'OHADA';
  current_score: number;
  target_score: number;
  gaps_count: number;
  critical_gaps: number;
  last_assessment: string;
  next_assessment: string;
  status: 'conforme' | 'partiellement_conforme' | 'non_conforme';
}

export interface GovernanceAlert {
  id: string;
  type: 'information_contradictoire' | 'lien_casse' | 'reference_obsolete' | 'contenu_non_revise' | 'erreur_critique' | 'non_conformite' | 'hallucination';
  severity: 'critique' | 'haute' | 'moyenne' | 'basse';
  title: string;
  description: string;
  source: string;
  detected_at: string;
  status: 'active' | 'en_cours' | 'resolue';
  assigned_to: string;
  resolution_deadline: string | null;
}

export interface GovernanceKPI {
  id: string;
  name: string;
  category: 'conformite' | 'exactitude' | 'qualite' | 'disponibilite' | 'verification' | 'reputation';
  current_value: number;
  target_value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trend_pct: number;
  period: string;
  status: 'ok' | 'warning' | 'critical';
}

// ─── CONTENT VERIFICATION ───────────────────────────────────────────────────

export const contentVerificationRecords: ContentVerificationRecord[] = [
  {
    id: 'cv-001',
    content_type: 'article',
    title: 'Gouvernance Bancaire UEMOA — Les 4 Piliers de la Circulaire 01-2017',
    author: 'Dr. Amadou Sow',
    published_at: '2026-06-15T08:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 98,
    regulatory_compliance_score: 96,
    source_count: 24,
    verified_sources_count: 24,
    issues: [],
    last_reviewed: '2026-06-15T10:00:00Z',
    reviewer: 'Compliance Officer — Ancien BCEAO',
    auto_blocked: false,
  },
  {
    id: 'cv-002',
    content_type: 'livre_blanc',
    title: 'Guide Pratique LBC/FT pour les SFD UEMOA — Édition 2026',
    author: 'Fatoumata Diallo',
    published_at: '2026-06-12T14:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 94,
    regulatory_compliance_score: 91,
    source_count: 42,
    verified_sources_count: 40,
    issues: ['GAFI R.15 couverture partielle FinTech', '2 seuils déclaratifs à actualiser'],
    last_reviewed: '2026-06-14T09:00:00Z',
    reviewer: 'Dr. Fatoumata Diarra — Ancienne COBAC',
    auto_blocked: false,
  },
  {
    id: 'cv-003',
    content_type: 'etude',
    title: 'Baromètre Inclusion Financière UEMOA 2026',
    author: 'Aminata Bah',
    published_at: '2026-06-10T16:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 97,
    regulatory_compliance_score: 95,
    source_count: 38,
    verified_sources_count: 38,
    issues: [],
    last_reviewed: '2026-06-10T18:00:00Z',
    reviewer: 'Comité Qualité KHEPRA',
    auto_blocked: false,
  },
  {
    id: 'cv-004',
    content_type: 'post_linkedin',
    title: 'KHEPRA obtient l\'agrément CEMAC — nouveau bureau Douala',
    author: 'M. Olivier Tchamaké',
    published_at: '2026-06-16T07:30:00Z',
    verification_status: 'À_CONFIRMER',
    fact_check_score: 72,
    regulatory_compliance_score: 65,
    source_count: 3,
    verified_sources_count: 1,
    issues: ['Référence agrément CEMAC non vérifiée — JO CEMAC non confirmé', 'Statistique parts de marché non sourcée'],
    last_reviewed: '2026-06-16T07:35:00Z',
    reviewer: 'Social Media Compliance Agent',
    auto_blocked: true,
  },
  {
    id: 'cv-005',
    content_type: 'proposition',
    title: 'Mission Pré-Inspection BCEAO — Banque Atlantique',
    author: 'Dr. Amadou Sow',
    published_at: '2026-06-16T10:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 96,
    regulatory_compliance_score: 98,
    source_count: 35,
    verified_sources_count: 35,
    issues: [],
    last_reviewed: '2026-06-16T14:00:00Z',
    reviewer: 'Managing Partner',
    auto_blocked: false,
  },
  {
    id: 'cv-006',
    content_type: 'article',
    title: 'Prix de Transfert en Afrique — 7 Pièges BEPS à Éviter',
    author: 'Ibrahim Koné',
    published_at: '2026-06-14T09:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 92,
    regulatory_compliance_score: 88,
    source_count: 18,
    verified_sources_count: 17,
    issues: ['Référence OCDE 2022 Amount B non sourcée'],
    last_reviewed: '2026-06-14T16:00:00Z',
    reviewer: 'Compliance Review Officer',
    auto_blocked: false,
  },
  {
    id: 'cv-007',
    content_type: 'newsletter',
    title: 'KHEPRA Insights — Veille Réglementaire Juin 2026',
    author: 'Think Tank Team',
    published_at: '2026-06-16T06:00:00Z',
    verification_status: 'À_CONFIRMER',
    fact_check_score: 78,
    regulatory_compliance_score: 74,
    source_count: 15,
    verified_sources_count: 9,
    issues: ['Nouvelle circulaire BCEAO ESG non intégrée', 'Chiffre FinTech +22% CAGR non sourcé'],
    last_reviewed: '2026-06-16T06:15:00Z',
    reviewer: 'Editorial Quality Agent',
    auto_blocked: true,
  },
  {
    id: 'cv-008',
    content_type: 'video',
    title: 'YouTube — Comprendre la Circulaire COBAC R-2024/01 en 10 minutes',
    author: 'KOS YouTube Studio',
    published_at: '2026-06-13T12:00:00Z',
    verification_status: 'VALIDÉE',
    fact_check_score: 90,
    regulatory_compliance_score: 87,
    source_count: 12,
    verified_sources_count: 11,
    issues: ['Miniature contraste insuffisant — lisibilité mobile'],
    last_reviewed: '2026-06-13T18:00:00Z',
    reviewer: 'YouTube Quality Control Agent',
    auto_blocked: false,
  },
  {
    id: 'cv-009',
    content_type: 'rapport',
    title: 'Stress Tests Climatiques — Impact Stabilité Financière UEMOA',
    author: 'Dr. Célestine Koffi',
    published_at: '2026-06-11T15:00:00Z',
    verification_status: 'À_CONFIRMER',
    fact_check_score: 81,
    regulatory_compliance_score: 76,
    source_count: 28,
    verified_sources_count: 18,
    issues: ['Données NGFS Phase V non vérifiées', 'Scénarios climatiques BCEAO en projet — incertains'],
    last_reviewed: '2026-06-11T17:00:00Z',
    reviewer: 'ESG Compliance Officer',
    auto_blocked: false,
  },
  {
    id: 'cv-010',
    content_type: 'post_linkedin',
    title: 'KHEPRA classé N°1 Conseil Conformité UEMOA 2026',
    author: 'Marketing Team',
    published_at: '2026-06-15T09:00:00Z',
    verification_status: 'NON_VÉRIFIÉE',
    fact_check_score: 45,
    regulatory_compliance_score: 30,
    source_count: 2,
    verified_sources_count: 0,
    issues: ['Classement non sourcé — aucun organisme certificateur cité', 'Publicité potentiellement trompeuse — risque réputationnel'],
    last_reviewed: '2026-06-15T09:05:00Z',
    reviewer: 'Réputation Guard Agent',
    auto_blocked: true,
  },
];

// ─── AGENT GOVERNANCE REGISTRY ──────────────────────────────────────────────

export const agentGovernanceRecords: AgentGovernanceRecord[] = [
  {
    id: 'ag-001',
    agent_name: 'KOS Automaton Engine',
    hub: 'Hub 1 — Core NLP',
    precision: 94.0,
    coherence: 9.5,
    conformite: 98,
    taux_erreur: 0.6,
    cout_mensuel_fcfa: 0,
    productivite: 9.8,
    incidents_30j: 0,
    dernier_audit: '2026-06-10',
    score_qualite: 9.6,
    status: 'excellent',
    recommandations: ['Documentation open source à finaliser', 'Performance cache à optimiser'],
  },
  {
    id: 'ag-002',
    agent_name: 'KOS Lead Scoring Engine',
    hub: 'Hub 2 — CRM Intelligence',
    precision: 91.0,
    coherence: 8.5,
    conformite: 92,
    taux_erreur: 2.2,
    cout_mensuel_fcfa: 0,
    productivite: 9.0,
    incidents_30j: 1,
    dernier_audit: '2026-06-01',
    score_qualite: 8.8,
    status: 'bon',
    recommandations: ['Débiaisage géographique Dakar', 'Feature diversité sectorielle'],
  },
  {
    id: 'ag-003',
    agent_name: 'KOS Regulatory Intelligence Engine',
    hub: 'Hub 3 — Think Tank',
    precision: 99.7,
    coherence: 9.4,
    conformite: 97,
    taux_erreur: 0.3,
    cout_mensuel_fcfa: 0,
    productivite: 9.5,
    incidents_30j: 0,
    dernier_audit: '2026-05-15',
    score_qualite: 9.4,
    status: 'excellent',
    recommandations: ['Extension à 50 sources', 'Alertes COBAC temps réel'],
  },
  {
    id: 'ag-004',
    agent_name: 'KOS Quality Assurance Authority',
    hub: 'Hub 4 — Quality',
    precision: 91.0,
    coherence: 9.3,
    conformite: 95,
    taux_erreur: 2.5,
    cout_mensuel_fcfa: 0,
    productivite: 9.2,
    incidents_30j: 0,
    dernier_audit: '2026-06-12',
    score_qualite: 9.2,
    status: 'excellent',
    recommandations: ['Dimension Innovation/Originalité', 'Calibration trimestrielle'],
  },
  {
    id: 'ag-005',
    agent_name: 'KOS Digital Twin',
    hub: 'Hub 5 — Predictive Analytics',
    precision: 83.0,
    coherence: 7.0,
    conformite: 65,
    taux_erreur: 12.5,
    cout_mensuel_fcfa: 0,
    productivite: 7.5,
    incidents_30j: 4,
    dernier_audit: '2026-06-13',
    score_qualite: 6.8,
    status: 'critique',
    recommandations: ['URGENT : Validation humaine formalisée', 'Réentraînement drift détecté', 'Correctifs sécurité Jira DT-442'],
  },
  {
    id: 'ag-006',
    agent_name: 'KOS Executive Dashboard Engine',
    hub: 'Hub 6 — COMEX',
    precision: 98.5,
    coherence: 9.0,
    conformite: 94,
    taux_erreur: 2.1,
    cout_mensuel_fcfa: 0,
    productivite: 9.3,
    incidents_30j: 0,
    dernier_audit: '2026-06-08',
    score_qualite: 9.1,
    status: 'excellent',
    recommandations: ['Piste d\'audit consultation rapports', 'Signature électronique COMEX'],
  },
  {
    id: 'ag-007',
    agent_name: 'KOS Due Diligence Engine',
    hub: 'Hub 7 — Régulation',
    precision: 98.2,
    coherence: 8.8,
    conformite: 82,
    taux_erreur: 4.5,
    cout_mensuel_fcfa: 0,
    productivite: 8.8,
    incidents_30j: 2,
    dernier_audit: '2026-05-20',
    score_qualite: 8.5,
    status: 'bon',
    recommandations: ['Module explainabilité EU AI Act Art.13', 'Double revue Partner obligatoire'],
  },
  {
    id: 'ag-008',
    agent_name: 'KOS Enterprise Risk Engine',
    hub: 'Hub 8 — GRC',
    precision: 92.0,
    coherence: 9.1,
    conformite: 90,
    taux_erreur: 3.1,
    cout_mensuel_fcfa: 0,
    productivite: 9.0,
    incidents_30j: 1,
    dernier_audit: '2026-06-05',
    score_qualite: 9.0,
    status: 'bon',
    recommandations: ['Scénarios climatiques BCEAO', 'Benchmark sectoriel enrichi'],
  },
  {
    id: 'ag-009',
    agent_name: 'KOS Social Media Command Engine',
    hub: 'Hub 9 — Social',
    precision: 87.0,
    coherence: 8.2,
    conformite: 78,
    taux_erreur: 7.8,
    cout_mensuel_fcfa: 150000,
    productivite: 8.5,
    incidents_30j: 3,
    dernier_audit: '2026-06-14',
    score_qualite: 7.8,
    status: 'surveillance',
    recommandations: ['Contrôle conformité posts renforcé', 'URL validation automatique'],
  },
  {
    id: 'ag-010',
    agent_name: 'KOS YouTube Studio Engine',
    hub: 'Hub 10 — Média',
    precision: 85.0,
    coherence: 8.0,
    conformite: 75,
    taux_erreur: 8.5,
    cout_mensuel_fcfa: 500000,
    productivite: 8.2,
    incidents_30j: 5,
    dernier_audit: '2026-06-13',
    score_qualite: 7.5,
    status: 'surveillance',
    recommandations: ['Qualité script 95% cible', 'Miniature lisibilité mobile', 'OAuth Google migration'],
  },
];

// ─── WEBSITE AUDIT ──────────────────────────────────────────────────────────

export const websiteAuditRecords: WebsiteAuditRecord[] = [
  {
    id: 'ws-001',
    site: 'khepraexperts.com',
    url: 'https://khepraexperts.com',
    score_conformite: 94,
    liens_casses: 3,
    liens_total: 1247,
    pages_verifiees: 384,
    pages_total: 392,
    certificat_ssl: true,
    headers_securite: true,
    derniere_verification: '2026-06-16T08:00:00Z',
    issues: ['3 liens internes cassés — redirections manquantes', '8 pages non indexées (noindex involontaire)'],
    score_global: 92,
  },
  {
    id: 'ws-002',
    site: 'KOS Platform',
    url: '/kos-dashboard',
    score_conformite: 88,
    liens_casses: 12,
    liens_total: 456,
    pages_verifiees: 215,
    pages_total: 230,
    certificat_ssl: true,
    headers_securite: true,
    derniere_verification: '2026-06-16T07:00:00Z',
    issues: ['12 liens internes KOS cassés — pages non créées', 'Temps de chargement > 3s sur 15 pages'],
    score_global: 85,
  },
  {
    id: 'ws-003',
    site: 'KHEPRA TV',
    url: '/kos-youtube-download',
    score_conformite: 78,
    liens_casses: 5,
    liens_total: 89,
    pages_verifiees: 28,
    pages_total: 32,
    certificat_ssl: true,
    headers_securite: false,
    derniere_verification: '2026-06-15T14:00:00Z',
    issues: ['Headers sécurité manquants (CSP, HSTS)', '5 liens médias cassés', 'OAuth Google non validé'],
    score_global: 74,
  },
  {
    id: 'ws-004',
    site: 'KHEPRA Academy',
    url: '/formations',
    score_conformite: 82,
    liens_casses: 7,
    liens_total: 156,
    pages_verifiees: 42,
    pages_total: 48,
    certificat_ssl: true,
    headers_securite: true,
    derniere_verification: '2026-06-14T10:00:00Z',
    issues: ['7 liens ressources externes cassés', 'Certificats de formation non numérisés'],
    score_global: 80,
  },
  {
    id: 'ws-005',
    site: 'Sous-domaines KHEPRA',
    url: '*.khepraexperts.com',
    score_conformite: 72,
    liens_casses: 23,
    liens_total: 312,
    pages_verifiees: 89,
    pages_total: 120,
    certificat_ssl: true,
    headers_securite: false,
    derniere_verification: '2026-06-13T09:00:00Z',
    issues: ['23 liens croisés cassés entre sous-domaines', 'Headers sécurité inconsistants', 'Cookies tiers non documentés'],
    score_global: 68,
  },
];

// ─── SOCIAL MEDIA CHECKS ────────────────────────────────────────────────────

export const socialMediaChecks: SocialMediaCheckRecord[] = [
  {
    id: 'sm-001',
    platform: 'linkedin',
    post_title: 'KOS AI Governance — ISO 42001 Alignment Complete',
    author: 'M. Olivier Tchamaké',
    scheduled_at: '2026-06-16T07:00:00Z',
    verification_status: 'VALIDÉE',
    url_active: true,
    image_valide: true,
    rattachement_entreprise: true,
    hashtags_conformes: true,
    conformite_reglementaire: true,
    bloquée: false,
    motif_blocage: null,
    reviewed_by: 'Social Media Compliance Agent',
  },
  {
    id: 'sm-002',
    platform: 'linkedin',
    post_title: 'KHEPRA N°1 Conseil Conformité UEMOA 2026',
    author: 'Marketing Team',
    scheduled_at: '2026-06-15T09:00:00Z',
    verification_status: 'NON_VÉRIFIÉE',
    url_active: false,
    image_valide: true,
    rattachement_entreprise: true,
    hashtags_conformes: false,
    conformite_reglementaire: false,
    bloquée: true,
    motif_blocage: 'Affirmation non vérifiée — classement non sourcé. Risque publicité trompeuse.',
    reviewed_by: 'Réputation Guard Agent',
  },
  {
    id: 'sm-003',
    platform: 'youtube',
    post_title: 'Comprendre COBAC R-2024/01 en 10 minutes',
    author: 'KOS YouTube Studio',
    scheduled_at: '2026-06-13T12:00:00Z',
    verification_status: 'VALIDÉE',
    url_active: true,
    image_valide: true,
    rattachement_entreprise: true,
    hashtags_conformes: true,
    conformite_reglementaire: true,
    bloquée: false,
    motif_blocage: null,
    reviewed_by: 'YouTube Quality Control Agent',
  },
  {
    id: 'sm-004',
    platform: 'linkedin',
    post_title: 'Nouveau bureau CEMAC — agrément obtenu',
    author: 'M. Olivier Tchamaké',
    scheduled_at: '2026-06-16T07:30:00Z',
    verification_status: 'À_CONFIRMER',
    url_active: true,
    image_valide: true,
    rattachement_entreprise: false,
    hashtags_conformes: true,
    conformite_reglementaire: false,
    bloquée: true,
    motif_blocage: 'Référence agrément CEMAC non vérifiée. Rattachement page entreprise manquant.',
    reviewed_by: 'Social Media Compliance Agent',
  },
  {
    id: 'sm-005',
    platform: 'x',
    post_title: 'Thread — 5 tendances réglementaires UEMOA 2026',
    author: 'Think Tank Team',
    scheduled_at: '2026-06-16T08:00:00Z',
    verification_status: 'VALIDÉE',
    url_active: true,
    image_valide: true,
    rattachement_entreprise: true,
    hashtags_conformes: true,
    conformite_reglementaire: true,
    bloquée: false,
    motif_blocage: null,
    reviewed_by: 'Social Media Compliance Agent',
  },
  {
    id: 'sm-006',
    platform: 'facebook',
    post_title: 'Webinar — Préparer son Inspection COBAC 2026',
    author: 'Events Team',
    scheduled_at: '2026-06-14T10:00:00Z',
    verification_status: 'VALIDÉE',
    url_active: true,
    image_valide: false,
    rattachement_entreprise: true,
    hashtags_conformes: true,
    conformite_reglementaire: true,
    bloquée: false,
    motif_blocage: null,
    reviewed_by: 'Social Media Compliance Agent',
  },
];

// ─── KNOWLEDGE SOURCES ──────────────────────────────────────────────────────

export const knowledgeSources: KnowledgeSourceRecord[] = [
  {
    id: 'ks-001',
    source_name: 'BCEAO — Journal Officiel UEMOA',
    category: 'regulateur',
    authority_level: 'primaire',
    last_updated: '2026-06-16',
    documents_count: 52,
    access_status: 'actif',
    priority_score: 10,
    integration_kos: true,
    description: 'Source réglementaire primaire UEMOA. Toutes les circulaires, instructions, décisions et avis. Intégration RAG temps réel.',
  },
  {
    id: 'ks-002',
    source_name: 'COBAC — Commission Bancaire Afrique Centrale',
    category: 'regulateur',
    authority_level: 'primaire',
    last_updated: '2026-06-14',
    documents_count: 38,
    access_status: 'actif',
    priority_score: 10,
    integration_kos: true,
    description: 'Règlements COBAC, décisions, circulaires CEMAC. Couverture 83% des textes officiels (15/18).',
  },
  {
    id: 'ks-003',
    source_name: 'OHADA — Actes Uniformes',
    category: 'regulateur',
    authority_level: 'primaire',
    last_updated: '2026-05-20',
    documents_count: 12,
    access_status: 'actif',
    priority_score: 9,
    integration_kos: true,
    description: '10 Actes Uniformes en vigueur dans 17 États. Droit des sociétés, sûretés, procédures collectives.',
  },
  {
    id: 'ks-004',
    source_name: 'GAFI — FATF',
    category: 'standard_international',
    authority_level: 'primaire',
    last_updated: '2026-03-15',
    documents_count: 55,
    access_status: 'actif',
    priority_score: 9,
    integration_kos: true,
    description: '40+9 Recommandations GAFI. Rapports d\'évaluation mutuelle. Guides sectoriels LBC/FT.',
  },
  {
    id: 'ks-005',
    source_name: 'FMI — eLibrary',
    category: 'institution_financiere',
    authority_level: 'secondaire',
    last_updated: '2026-06-10',
    documents_count: 28,
    access_status: 'restreint',
    priority_score: 7,
    integration_kos: false,
    description: 'Rapports FMI Article IV, FSSA, assistance technique UEMOA/CEMAC. Accès partiel (paywall).',
  },
  {
    id: 'ks-006',
    source_name: 'Banque Mondiale — Open Knowledge',
    category: 'institution_financiere',
    authority_level: 'secondaire',
    last_updated: '2026-06-08',
    documents_count: 45,
    access_status: 'actif',
    priority_score: 8,
    integration_kos: true,
    description: 'Doing Business, CPIA, rapports sectoriels Afrique. Intégration RAG données macroéconomiques.',
  },
  {
    id: 'ks-007',
    source_name: 'IFC — Governance Framework',
    category: 'standard_international',
    authority_level: 'secondaire',
    last_updated: '2026-04-22',
    documents_count: 18,
    access_status: 'actif',
    priority_score: 8,
    integration_kos: true,
    description: 'IFC Corporate Governance Methodology. Grilles d\'évaluation gouvernance. Progression Matrix.',
  },
  {
  id: 'ks-008',
    source_name: 'ISO — Standards',
    category: 'standard_international',
    authority_level: 'secondaire',
    last_updated: '2026-06-01',
    documents_count: 8,
    access_status: 'restreint',
    priority_score: 8,
    integration_kos: false,
    description: 'ISO 31000, ISO 37000, ISO 37301, ISO 27001, ISO 42001. Paywall ISO — accès via abonnement.',
  },
  {
    id: 'ks-009',
    source_name: 'OCDE — iLibrary',
    category: 'standard_international',
    authority_level: 'secondaire',
    last_updated: '2026-05-28',
    documents_count: 22,
    access_status: 'actif',
    priority_score: 8,
    integration_kos: true,
    description: 'BEPS Actions, Prix de Transfert, Gouvernance. Intégration via API OCDE.',
  },
  {
    id: 'ks-010',
    source_name: 'BRI — Bank for International Settlements',
    category: 'institution_financiere',
    authority_level: 'secondaire',
    last_updated: '2026-06-05',
    documents_count: 35,
    access_status: 'actif',
    priority_score: 7,
    integration_kos: false,
    description: 'Bâle III/IV, stabilité financière, statistiques bancaires. Intégration planifiée Q3 2026.',
  },
  {
    id: 'ks-011',
    source_name: 'GIABA — Groupe Intergouvernemental d\'Action',
    category: 'regulateur',
    authority_level: 'primaire',
    last_updated: '2026-04-10',
    documents_count: 15,
    access_status: 'actif',
    priority_score: 8,
    integration_kos: true,
    description: 'Évaluations mutuelles UEMOA. Rapports LBC/FT régionaux. Typologies blanchiment.',
  },
  {
    id: 'ks-012',
    source_name: 'IOSCO — International Organization of Securities Commissions',
    category: 'standard_international',
    authority_level: 'secondaire',
    last_updated: '2026-03-20',
    documents_count: 12,
    access_status: 'actif',
    priority_score: 6,
    integration_kos: false,
    description: 'Standards marchés financiers. Intégration planifiée pour expansion services financiers.',
  },
];

// ─── COMPLIANCE FRAMEWORKS ──────────────────────────────────────────────────

export const complianceFrameworkAssessments: ComplianceFrameworkAssessment[] = [
  {
    id: 'cf-001',
    framework: 'BCEAO — Dispositif Prudentiel',
    category: 'reglementation_financiere',
    authority: 'BCEAO / CB-UMOA',
    applicable_zone: 'UEMOA',
    current_score: 96,
    target_score: 98,
    gaps_count: 3,
    critical_gaps: 0,
    last_assessment: '2026-06-15',
    next_assessment: '2026-09-15',
    status: 'conforme',
  },
  {
    id: 'cf-002',
    framework: 'COBAC — Règlements CEMAC',
    category: 'reglementation_financiere',
    authority: 'COBAC / BEAC',
    applicable_zone: 'CEMAC',
    current_score: 83,
    target_score: 95,
    gaps_count: 8,
    critical_gaps: 2,
    last_assessment: '2026-06-10',
    next_assessment: '2026-09-10',
    status: 'partiellement_conforme',
  },
  {
    id: 'cf-003',
    framework: 'COSO ERM 2017',
    category: 'gouvernance',
    authority: 'COSO',
    applicable_zone: 'International',
    current_score: 88,
    target_score: 95,
    gaps_count: 4,
    critical_gaps: 0,
    last_assessment: '2026-05-20',
    next_assessment: '2026-08-20',
    status: 'conforme',
  },
  {
    id: 'cf-004',
    framework: 'ISO 37301 — Compliance Management',
    category: 'gouvernance',
    authority: 'ISO',
    applicable_zone: 'International',
    current_score: 79,
    target_score: 95,
    gaps_count: 9,
    critical_gaps: 2,
    last_assessment: '2026-06-01',
    next_assessment: '2026-09-01',
    status: 'partiellement_conforme',
  },
  {
    id: 'cf-005',
    framework: 'ISO 37000 — Governance of Organizations',
    category: 'gouvernance',
    authority: 'ISO',
    applicable_zone: 'International',
    current_score: 85,
    target_score: 95,
    gaps_count: 5,
    critical_gaps: 1,
    last_assessment: '2026-06-08',
    next_assessment: '2026-09-08',
    status: 'partiellement_conforme',
  },
  {
    id: 'cf-006',
    framework: 'ISO 27001 — Sécurité de l\'Information',
    category: 'securite',
    authority: 'ISO',
    applicable_zone: 'International',
    current_score: 82,
    target_score: 95,
    gaps_count: 7,
    critical_gaps: 1,
    last_assessment: '2026-06-12',
    next_assessment: '2026-09-12',
    status: 'partiellement_conforme',
  },
  {
    id: 'cf-007',
    framework: 'NIST Cybersecurity Framework',
    category: 'securite',
    authority: 'NIST',
    applicable_zone: 'International',
    current_score: 87,
    target_score: 95,
    gaps_count: 4,
    critical_gaps: 0,
    last_assessment: '2026-06-05',
    next_assessment: '2026-09-05',
    status: 'conforme',
  },
  {
    id: 'cf-008',
    framework: 'RGPD / UEMOA Data Protection',
    category: 'protection_donnees',
    authority: 'UE / UEMOA',
    applicable_zone: 'UEMOA',
    current_score: 90,
    target_score: 98,
    gaps_count: 3,
    critical_gaps: 0,
    last_assessment: '2026-06-13',
    next_assessment: '2026-09-13',
    status: 'conforme',
  },
  {
    id: 'cf-009',
    framework: 'GAFI 40+9 Recommandations',
    category: 'lbc_ft',
    authority: 'GAFI / GIABA / GABAC',
    applicable_zone: 'International',
    current_score: 88,
    target_score: 98,
    gaps_count: 5,
    critical_gaps: 1,
    last_assessment: '2026-05-25',
    next_assessment: '2026-08-25',
    status: 'partiellement_conforme',
  },
  {
    id: 'cf-010',
    framework: 'OCDE BEPS — Action 13',
    category: 'fiscalite',
    authority: 'OCDE',
    applicable_zone: 'International',
    current_score: 86,
    target_score: 95,
    gaps_count: 4,
    critical_gaps: 1,
    last_assessment: '2026-06-02',
    next_assessment: '2026-09-02',
    status: 'partiellement_conforme',
  },
];

// ─── GOVERNANCE ALERTS ──────────────────────────────────────────────────────

export const governanceAlerts: GovernanceAlert[] = [
  {
    id: 'ga-001',
    type: 'non_conformite',
    severity: 'critique',
    title: 'Digital Twin — Non conformité EU AI Act Art.14',
    description: 'Circuit de validation humaine non formalisé pour les prévisions à écart > 20%. Procédure SOP-009 manquante. Risque réglementaire et réputationnel majeur.',
    source: 'AI Governance Council — Audit 13 Juin 2026',
    detected_at: '2026-06-13T11:00:00Z',
    status: 'active',
    assigned_to: 'KOS Data Science Team + Managing Partner',
    resolution_deadline: '2026-06-30',
  },
  {
    id: 'ga-002',
    type: 'erreur_critique',
    severity: 'haute',
    title: 'Référence fantôme BCEAO n°001-04-2018 — traces résiduelles EN',
    description: '14 occurrences résiduelles de la référence inexistante 001-04-2018 dans les versions anglaises. Quick Win QW-014 en cours.',
    source: 'Regulatory Compliance Audit — Scan 16 Juin 2026',
    detected_at: '2026-06-16T08:00:00Z',
    status: 'en_cours',
    assigned_to: 'Compliance Officer',
    resolution_deadline: '2026-06-17',
  },
  {
    id: 'ga-003',
    type: 'lien_casse',
    severity: 'moyenne',
    title: '23 liens cassés sous-domaines KHEPRA',
    description: 'Liens croisés entre sous-domaines non fonctionnels. Impact SEO et expérience utilisateur.',
    source: 'Website Audit — 13 Juin 2026',
    detected_at: '2026-06-13T09:00:00Z',
    status: 'active',
    assigned_to: 'WebOps Team',
    resolution_deadline: '2026-06-22',
  },
  {
    id: 'ga-004',
    type: 'reference_obsolete',
    severity: 'haute',
    title: 'Directive UEMOA n°08/2012 citée comme en vigueur',
    description: 'Directive abrogée par n°02/2015 toujours référencée dans certains articles. 8 fichiers concernés.',
    source: 'Content Compliance Scan — 15 Juin 2026',
    detected_at: '2026-06-15T14:00:00Z',
    status: 'en_cours',
    assigned_to: 'Editorial Team + Compliance Officer',
    resolution_deadline: '2026-06-30',
  },
  {
    id: 'ga-005',
    type: 'hallucination',
    severity: 'critique',
    title: 'Digital Twin — 3 hallucinations majeures détectées',
    description: 'Prévisions financières avec données inventées. Taux hallucination 12.5% (9/72 outputs). Plan d\'action urgence activé.',
    source: 'Hallucination Control Framework — 13 Juin 2026',
    detected_at: '2026-06-13T08:00:00Z',
    status: 'active',
    assigned_to: 'KOS Data Science Team',
    resolution_deadline: '2026-06-20',
  },
  {
    id: 'ga-006',
    type: 'contenu_non_revise',
    severity: 'moyenne',
    title: 'Newsletter Juin 2026 — contenu non révisé avant envoi',
    description: 'Newsletter KHEPRA Insights envoyée sans revue Compliance. 2 affirmations non vérifiées, 1 statistique non sourcée.',
    source: 'Content Verification System — 16 Juin 2026',
    detected_at: '2026-06-16T06:15:00Z',
    status: 'resolue',
    assigned_to: 'Editorial Quality Agent',
    resolution_deadline: null,
  },
  {
    id: 'ga-007',
    type: 'information_contradictoire',
    severity: 'haute',
    title: 'Articles BCEAO — contradiction seuils déclaratifs LBC/FT',
    description: 'Deux articles citent des seuils différents pour la déclaration de soupçon (5M vs 10M FCFA). Uniformisation requise.',
    source: 'Content Cross-Reference Scan — 14 Juin 2026',
    detected_at: '2026-06-14T16:00:00Z',
    status: 'active',
    assigned_to: 'Compliance Officer + Editorial',
    resolution_deadline: '2026-06-21',
  },
  {
    id: 'ga-008',
    type: 'non_conformite',
    severity: 'basse',
    title: 'Format référence non standardisé — 48 fichiers',
    description: 'Variations entre "Instruction n°", "N°", "n°", underscores vs tirets. Quick Win QW-004 en attente.',
    source: 'Regulatory Compliance Audit — 16 Juin 2026',
    detected_at: '2026-06-16T10:00:00Z',
    status: 'active',
    assigned_to: 'Editorial Team',
    resolution_deadline: '2026-06-30',
  },
];

// ─── GOVERNANCE KPIs ────────────────────────────────────────────────────────

export const governanceKPIs: GovernanceKPI[] = [
  {
    id: 'kpi-001',
    name: 'Taux de Conformité Réglementaire',
    category: 'conformite',
    current_value: 88.5,
    target_value: 95,
    unit: '%',
    trend: 'up',
    trend_pct: 3.2,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-002',
    name: 'Taux d\'Exactitude des Contenus',
    category: 'exactitude',
    current_value: 92.8,
    target_value: 98,
    unit: '%',
    trend: 'up',
    trend_pct: 1.5,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-003',
    name: 'Taux de Contenus Révisés',
    category: 'qualite',
    current_value: 86.4,
    target_value: 100,
    unit: '%',
    trend: 'up',
    trend_pct: 5.8,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-004',
    name: 'Taux de Liens Valides',
    category: 'qualite',
    current_value: 97.2,
    target_value: 99,
    unit: '%',
    trend: 'down',
    trend_pct: -0.8,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-005',
    name: 'Disponibilité des Systèmes',
    category: 'disponibilite',
    current_value: 98.7,
    target_value: 99,
    unit: '%',
    trend: 'stable',
    trend_pct: 0.1,
    period: 'Juin 2026',
    status: 'ok',
  },
  {
    id: 'kpi-006',
    name: 'Taux d\'Erreurs IA',
    category: 'qualite',
    current_value: 4.2,
    target_value: 1.0,
    unit: '%',
    trend: 'down',
    trend_pct: -1.3,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-007',
    name: 'Informations Vérifiées',
    category: 'verification',
    current_value: 88.3,
    target_value: 100,
    unit: '%',
    trend: 'up',
    trend_pct: 4.5,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-008',
    name: 'Taux d\'Hallucinations Tolérées',
    category: 'qualite',
    current_value: 3.4,
    target_value: 0,
    unit: '%',
    trend: 'down',
    trend_pct: -0.8,
    period: 'Juin 2026',
    status: 'critical',
  },
  {
    id: 'kpi-009',
    name: 'Score Réputation',
    category: 'reputation',
    current_value: 91,
    target_value: 98,
    unit: '/100',
    trend: 'up',
    trend_pct: 2.0,
    period: 'Juin 2026',
    status: 'ok',
  },
  {
    id: 'kpi-010',
    name: 'Coût Opérationnel Mensuel',
    category: 'qualite',
    current_value: 2650000,
    target_value: 2000000,
    unit: 'FCFA',
    trend: 'up',
    trend_pct: 8.2,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-011',
    name: 'Conformité Social Media Posts',
    category: 'conformite',
    current_value: 83.3,
    target_value: 100,
    unit: '%',
    trend: 'down',
    trend_pct: -5.5,
    period: 'Juin 2026',
    status: 'warning',
  },
  {
    id: 'kpi-012',
    name: 'Couverture Connaissances Réglementaires',
    category: 'verification',
    current_value: 78,
    target_value: 95,
    unit: '%',
    trend: 'up',
    trend_pct: 12.0,
    period: 'Juin 2026',
    status: 'warning',
  },
];

// ─── EXECUTIVE SUMMARY ──────────────────────────────────────────────────────

export const executiveSummary = {
  total_agents_audited: 10,
  agents_excellents: 4,
  agents_bons: 3,
  agents_surveillance: 2,
  agents_critiques: 1,
  total_contents_verified: 10,
  contents_validees: 5,
  contents_a_confirmer: 3,
  contents_non_verifiees: 2,
  total_websites_audited: 5,
  score_moyen_websites: 79.8,
  total_social_checks: 6,
  social_bloquees: 2,
  total_frameworks: 10,
  frameworks_conformes: 4,
  frameworks_partiels: 6,
  total_alerts: 8,
  alerts_critiques: 2,
  alerts_hautes: 3,
  alerts_actives: 5,
  alerts_en_cours: 2,
  alerts_resolues: 1,
  score_global_gouvernance: 87.2,
  score_cible: 95,
  regle_supreme_1: 'Conformité réglementaire',
  regle_supreme_2: 'Crédibilité KHEPRA EXPERTS',
  regle_supreme_3: 'Exactitude des informations',
  regle_supreme_4: 'Confiance des clients',
  regle_supreme_5: 'Pérennité de l\'écosystème',
};

export const priorityTargets = [
  { objective: 'Conformité', current: 88.5, target: 95, status: 'warning' },
  { objective: 'Exactitude', current: 92.8, target: 98, status: 'warning' },
  { objective: 'Liens valides', current: 97.2, target: 99, status: 'ok' },
  { objective: 'Disponibilité systèmes', current: 98.7, target: 99, status: 'ok' },
  { objective: 'Informations vérifiées', current: 88.3, target: 100, status: 'warning' },
  { objective: 'Hallucinations', current: 3.4, target: 0, status: 'critical' },
];

export const regleSupreme = [
  { priority: 1, rule: 'La conformité réglementaire prime sur toute autre considération.', icon: 'ri-shield-check-line' },
  { priority: 2, rule: 'La crédibilité de KHEPRA EXPERTS ne peut être compromise.', icon: 'ri-medal-line' },
  { priority: 3, rule: 'L\'exactitude des informations est non négociable.', icon: 'ri-check-double-line' },
  { priority: 4, rule: 'La confiance des clients est notre actif le plus précieux.', icon: 'ri-heart-line' },
  { priority: 5, rule: 'La pérennité de l\'écosystème guide chaque décision.', icon: 'ri-seedling-line' },
];