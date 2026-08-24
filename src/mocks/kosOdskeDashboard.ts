export interface ODSKEMetric {
  id: string;
  metric_name: string;
  metric_value: number;
  metric_target: number;
  metric_unit: string;
  domain: string;
  trend: string;
  last_updated: string;
  details: Record<string, unknown>;
  created_at: string;
}

export interface ODSKEDomainCatalog {
  domain: string;
  tables_count: number;
}

export interface ODSKESourceRegistry {
  id: string;
  source_code: string;
  source_name: string;
  source_type: string;
  trust_level: number;
  organization: string;
  country: string;
  url: string;
  description: string;
  last_verified: string;
  is_active: boolean;
}

export interface ODSKEProvenanceLog {
  id: string;
  table_name: string;
  record_count: number;
  source_name: string;
  source_trust_level: number;
  last_collected: string;
  verification_status: string;
}

export interface ODSKEValidationRule {
  id: string;
  rule_name: string;
  rule_type: string;
  target_table: string;
  severity: string;
  description: string;
  is_active: boolean;
  last_checked: string;
}

export interface ODSKEQualityReport {
  id: string;
  report_type: string;
  report_title: string;
  coverage_pct: number;
  total_records: number;
  valid_records: number;
  issues_found: number;
  generated_at: string;
  domain: string;
}

export interface ODSKEAgentActivity {
  id: string;
  agent_name: string;
  operation_type: string;
  target_table: string;
  records_processed: number;
  status: string;
  started_at: string;
  completed_at: string | null;
  details: Record<string, unknown>;
}

export interface ODSKEKnowledgeRegulatory {
  id: string;
  text_reference: string;
  title: string;
  authority: string;
  domain: string;
  status: string;
  publication_date: string;
  source_url: string;
}

export interface ODSKEWatchlist {
  id: string;
  source_name: string;
  source_url: string;
  check_frequency: string;
  last_checked: string;
  is_active: boolean;
  trust_level: number;
}

export interface ODSKEGovernanceLog {
  id: string;
  operation: string;
  target_table: string;
  performed_by: string;
  details: string;
  created_at: string;
}

export const ODSKE_DASHBOARD_METRICS: ODSKEMetric[] = [
  { id: '1', metric_name: 'Tables alimentées', metric_value: 56, metric_target: 56, metric_unit: 'tables', domain: 'Data Catalog', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { domaines: 8, couverture: '100%', total_tables: 56 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '2', metric_name: 'Sources officielles niveau 1', metric_value: 18, metric_target: 25, metric_unit: 'sources', domain: 'Source Registry', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { pays: ['FR', 'EU', 'INTL', 'UEMOA', 'CEMAC'], actives: 18, candidates: 7 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '3', metric_name: 'Sources niveau 2', metric_value: 13, metric_target: 15, metric_unit: 'sources', domain: 'Source Registry', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { actives: 13, candidates: 2 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '4', metric_name: 'Sources niveau 3', metric_value: 8, metric_target: 10, metric_unit: 'sources', domain: 'Source Registry', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { actives: 8, candidates: 2 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '5', metric_name: 'Règles de validation actives', metric_value: 31, metric_target: 40, metric_unit: 'règles', domain: 'Validation', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { types: ['unicité', 'cohérence', 'complétude', 'référence', 'date'], actives: 31, obsoletes: 2 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '6', metric_name: 'Données avec provenance documentée', metric_value: 98.2, metric_target: 100, metric_unit: '%', domain: 'Traçabilité', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { total: 3332, manquantes: 57, avec_provenance: 3275 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '7', metric_name: 'Volume données validées', metric_value: 3332, metric_target: 5000, metric_unit: 'enregistrements', domain: 'Qualité', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { validés: 3332, en_attente: 0, rejetés_cumulés: 28 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '8', metric_name: 'Données en attente de validation', metric_value: 57, metric_target: 0, metric_unit: 'enregistrements', domain: 'Qualité', trend: 'down', last_updated: '2026-06-25T22:44:43Z', details: { bloquées: 'contrôle qualité en cours', prochain_batch: '2026-06-26' }, created_at: '2026-06-25T22:44:43Z' },
  { id: '9', metric_name: 'Couverture des référentiels', metric_value: 100, metric_target: 100, metric_unit: '%', domain: 'Knowledge Engine', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { regulatory: 150, documentary: 92, methodology: 24 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '10', metric_name: 'Watchlists actives', metric_value: 43, metric_target: 50, metric_unit: 'watchlists', domain: 'Veille', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { daily: 18, weekly: 13, monthly: 8, inactives: 4 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '11', metric_name: 'Rapports de qualité générés', metric_value: 10, metric_target: 12, metric_unit: 'rapports', domain: 'Livrables', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { types: ['couverture', 'gouvernance', 'traçabilité', 'qualité'], dernier: '2026-06-25T16:00:00Z' }, created_at: '2026-06-25T22:44:43Z' },
  { id: '12', metric_name: 'Agents spécialisés actifs', metric_value: 7, metric_target: 7, metric_unit: 'agents', domain: 'Automatisation', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { agents: ['Source Qualifier', 'Document Validator', 'Quality Controller', 'Normalizer', 'Dedup Scanner', 'Update Tracker', 'Report Generator'] }, created_at: '2026-06-25T22:44:43Z' },
  { id: '13', metric_name: 'Opérations agents (24h)', metric_value: 14, metric_target: 20, metric_unit: 'opérations', domain: 'Automatisation', trend: 'up', last_updated: '2026-06-25T22:44:43Z', details: { failed: 0, completed: 13, in_progress: 1 }, created_at: '2026-06-25T22:44:43Z' },
  { id: '14', metric_name: 'Taux de disponibilité système', metric_value: 99.8, metric_target: 99.9, metric_unit: '%', domain: 'Infrastructure', trend: 'stable', last_updated: '2026-06-25T22:44:43Z', details: { incidents: 0, uptime_24h: '99.8%' }, created_at: '2026-06-25T22:44:43Z' },
];

export const ODSKE_DOMAIN_CATALOG: ODSKEDomainCatalog[] = [
  { domain: 'Compliance & Evidence', tables_count: 11 },
  { domain: 'Strategic Intelligence', tables_count: 9 },
  { domain: 'KOS Core Engine', tables_count: 9 },
  { domain: 'Regulatory', tables_count: 8 },
  { domain: 'AI Governance', tables_count: 6 },
  { domain: 'Audit & Control', tables_count: 5 },
  { domain: 'Tender Intelligence', tables_count: 5 },
  { domain: 'Risk Management', tables_count: 3 },
];

export const ODSKE_SOURCES_MOCK: ODSKESourceRegistry[] = [
  { id: '1', source_code: 'SRC-001', source_name: 'BCEAO — Banque Centrale des États de l\'Afrique de l\'Ouest', source_type: 'Banque Centrale', trust_level: 1, organization: 'BCEAO', country: 'UEMOA', url: 'https://www.bceao.int', description: 'Régulateur bancaire principal UEMOA', last_verified: '2026-06-25', is_active: true },
  { id: '2', source_code: 'SRC-002', source_name: 'COBAC — Commission Bancaire de l\'Afrique Centrale', source_type: 'Régulateur Bancaire', trust_level: 1, organization: 'COBAC', country: 'CEMAC', url: 'https://www.beac.int', description: 'Régulateur bancaire CEMAC', last_verified: '2026-06-25', is_active: true },
  { id: '3', source_code: 'SRC-003', source_name: 'AMF — Autorité des Marchés Financiers', source_type: 'Régulateur Financier', trust_level: 1, organization: 'AMF France', country: 'FR', url: 'https://www.amf-france.org', description: 'Régulateur des marchés financiers français', last_verified: '2026-06-25', is_active: true },
];

export const ODSKE_PROVENANCE_MOCK: ODSKEProvenanceLog[] = [
  { id: '1', table_name: 'regulatory_register', record_count: 100, source_name: 'BCEAO', source_trust_level: 1, last_collected: '2026-06-25', verification_status: 'verified' },
  { id: '2', table_name: 'regulations', record_count: 50, source_name: 'COBAC', source_trust_level: 1, last_collected: '2026-06-25', verification_status: 'verified' },
  { id: '3', table_name: 'regulatory_sources', record_count: 100, source_name: 'GAFI', source_trust_level: 1, last_collected: '2026-06-25', verification_status: 'verified' },
];

export const ODSKE_VALIDATION_RULES_MOCK: ODSKEValidationRule[] = [
  { id: '1', rule_name: 'Unicité référence réglementaire', rule_type: 'unicité', target_table: 'regulatory_register', severity: 'critical', description: 'Chaque texte réglementaire doit avoir une référence unique', is_active: true, last_checked: '2026-06-25' },
  { id: '2', rule_name: 'Cohérence dates publication', rule_type: 'cohérence', target_table: 'regulations', severity: 'error', description: 'La date de publication doit être antérieure à la date d\'entrée en vigueur', is_active: true, last_checked: '2026-06-25' },
  { id: '3', rule_name: 'Complétude métadonnées sources', rule_type: 'complétude', target_table: 'regulatory_sources', severity: 'warning', description: 'Chaque source doit avoir URL, autorité, et date de dernière vérification', is_active: true, last_checked: '2026-06-25' },
];

export const ODSKE_QUALITY_REPORTS_MOCK: ODSKEQualityReport[] = [
  { id: '1', report_type: 'coverage', report_title: 'Couverture Data Catalog — Juin 2026', coverage_pct: 100, total_records: 56, valid_records: 56, issues_found: 0, generated_at: '2026-06-25T16:00:00Z', domain: 'Data Catalog' },
  { id: '2', report_type: 'governance', report_title: 'Rapport Gouvernance ODSKE — Juin 2026', coverage_pct: 100, total_records: 12, valid_records: 12, issues_found: 0, generated_at: '2026-06-25T16:00:00Z', domain: 'Gouvernance' },
  { id: '3', report_type: 'traceability', report_title: 'Traçabilité des données — Juin 2026', coverage_pct: 98.2, total_records: 3332, valid_records: 3275, issues_found: 57, generated_at: '2026-06-25T16:00:00Z', domain: 'Traçabilité' },
];

export const ODSKE_AGENT_ACTIVITY_MOCK: ODSKEAgentActivity[] = [
  { id: '1', agent_name: 'Source Qualifier', operation_type: 'qualification', target_table: 'kos_odske_source_registry', records_processed: 50, status: 'completed', started_at: '2026-06-25T08:00:00Z', completed_at: '2026-06-25T08:15:00Z', details: { new_sources: 0, updated: 3, deactivated: 1 } },
  { id: '2', agent_name: 'Document Validator', operation_type: 'validation', target_table: 'kos_odske_knowledge_regulatory', records_processed: 150, status: 'completed', started_at: '2026-06-25T09:00:00Z', completed_at: '2026-06-25T09:45:00Z', details: { validated: 148, flagged: 2 } },
  { id: '3', agent_name: 'Quality Controller', operation_type: 'quality_check', target_table: 'kos_odske_validation_rules', records_processed: 33, status: 'completed', started_at: '2026-06-25T10:00:00Z', completed_at: '2026-06-25T10:30:00Z', details: { passed: 31, failed: 2 } },
];

export const ODSKE_KNOWLEDGE_REGULATORY_MOCK: ODSKEKnowledgeRegulatory[] = [
  { id: '1', text_reference: 'BCEAO-008-05-2015', title: 'Instruction relative aux conditions d\'exercice des établissements de monnaie électronique', authority: 'BCEAO', domain: 'FinTech', status: 'active', publication_date: '2015-05-08', source_url: 'https://www.bceao.int' },
  { id: '2', text_reference: 'COBAC R-2025/01', title: 'Règlement relatif à la cybersécurité des établissements de crédit', authority: 'COBAC', domain: 'Cybersécurité', status: 'active', publication_date: '2025-01-19', source_url: 'https://www.beac.int' },
  { id: '3', text_reference: 'GAFI-R15', title: 'Recommandation 15 — Nouvelles technologies', authority: 'GAFI', domain: 'LBC/FT', status: 'active', publication_date: '2019-06-21', source_url: 'https://www.fatf-gafi.org' },
];

export const ODSKE_WATCHLIST_MOCK: ODSKEWatchlist[] = [
  { id: '1', source_name: 'BCEAO — Textes officiels', source_url: 'https://www.bceao.int/fr/textes-officiels', check_frequency: 'daily', last_checked: '2026-06-25', is_active: true, trust_level: 1 },
  { id: '2', source_name: 'COBAC — Réglementation', source_url: 'https://www.beac.int/reglementation', check_frequency: 'daily', last_checked: '2026-06-25', is_active: true, trust_level: 1 },
  { id: '3', source_name: 'GAFI — Publications', source_url: 'https://www.fatf-gafi.org/publications', check_frequency: 'weekly', last_checked: '2026-06-24', is_active: true, trust_level: 1 },
];

export const ODSKE_GOVERNANCE_LOG_MOCK: ODSKEGovernanceLog[] = [
  { id: '1', operation: 'source_verification', target_table: 'kos_odske_source_registry', performed_by: 'Source Qualifier Agent', details: 'Vérification périodique de 50 sources — 47 OK, 2 URL inaccessibles, 1 périmée', created_at: '2026-06-25T08:00:00Z' },
  { id: '2', operation: 'data_validation', target_table: 'kos_odske_knowledge_regulatory', performed_by: 'Document Validator Agent', details: 'Validation de 150 textes réglementaires — 148 conformes, 2 anomalies détectées', created_at: '2026-06-25T09:45:00Z' },
  { id: '3', operation: 'quality_audit', target_table: 'kos_odske_quality_reports', performed_by: 'Quality Controller Agent', details: 'Génération rapport qualité — Score global 91/100, 57 enregistrements en attente', created_at: '2026-06-25T16:00:00Z' },
];





