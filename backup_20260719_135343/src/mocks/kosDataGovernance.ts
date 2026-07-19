export const dataCatalog = [
  { id: 'CAT-001', dataset_name: 'Regulatory Register — BCEAO', domain: 'Régulation', category: 'Master Data', owner: 'Direction Conformité', entities: 73, tables: 3, last_updated: '2026-06-15T06:00:00Z', classification: 'Restreint', quality_score: 96, lineage_complete: true, retention_days: 3650 },
  { id: 'CAT-002', dataset_name: 'Regulatory Register — COBAC', domain: 'Régulation', category: 'Master Data', owner: 'Direction Conformité', entities: 52, tables: 2, last_updated: '2026-06-14T06:00:00Z', classification: 'Restreint', quality_score: 94, lineage_complete: true, retention_days: 3650 },
  { id: 'CAT-003', dataset_name: 'Pipeline Commercial — Deals & Leads', domain: 'Commercial', category: 'Transactionnelle', owner: 'Direction Commerciale', entities: 47, tables: 5, last_updated: '2026-06-16T08:00:00Z', classification: 'Confidentiel', quality_score: 88, lineage_complete: true, retention_days: 2555 },
  { id: 'CAT-004', dataset_name: 'Tender Intelligence — AO & Bailleurs', domain: 'Business Development', category: 'Transactionnelle', owner: 'Direction Stratégie', entities: 94, tables: 4, last_updated: '2026-06-16T04:30:00Z', classification: 'Confidentiel', quality_score: 92, lineage_complete: true, retention_days: 1825 },
  { id: 'CAT-005', dataset_name: 'Knowledge Graph — 2 847 Nœuds', domain: 'Knowledge Management', category: 'Référentiel', owner: 'Direction Innovation', entities: 2847, tables: 2, last_updated: '2026-06-15T12:00:00Z', classification: 'Interne', quality_score: 95, lineage_complete: true, retention_days: 7300 },
  { id: 'CAT-006', dataset_name: 'Lead Scoring — Profils & Scores', domain: 'CRM', category: 'Analytique', owner: 'Direction Commerciale', entities: 248, tables: 3, last_updated: '2026-06-16T08:00:00Z', classification: 'Confidentiel', quality_score: 90, lineage_complete: false, retention_days: 1095 },
  { id: 'CAT-007', dataset_name: 'Enterprise KPIs — 280 Indicateurs', domain: 'Performance', category: 'Analytique', owner: 'Direction Générale', entities: 280, tables: 1, last_updated: '2026-06-16T00:00:00Z', classification: 'Restreint', quality_score: 98, lineage_complete: true, retention_days: 3650 },
  { id: 'CAT-008', dataset_name: 'RAG Embeddings — 1.1M Vecteurs', domain: 'IA & NLP', category: 'Technique', owner: 'Direction Technique', entities: 1100000, tables: 1, last_updated: '2026-06-15T23:00:00Z', classification: 'Interne', quality_score: 89, lineage_complete: true, retention_days: 730 },
  { id: 'CAT-009', dataset_name: 'Security Scans — OWASP, Headers, Vulns', domain: 'Cybersécurité', category: 'Logs', owner: 'RSI', entities: 4820, tables: 2, last_updated: '2026-06-16T06:00:00Z', classification: 'Restreint', quality_score: 93, lineage_complete: true, retention_days: 1095 },
  { id: 'CAT-010', dataset_name: 'AI Audit Trail — 75 Agents', domain: 'Gouvernance IA', category: 'Audit', owner: 'AI Governance Council', entities: 8240, tables: 3, last_updated: '2026-06-16T07:00:00Z', classification: 'Restreint', quality_score: 91, lineage_complete: true, retention_days: 2555 },
  { id: 'CAT-011', dataset_name: 'Ressources Humaines — 68 Collaborateurs', domain: 'RH', category: 'Master Data', owner: 'DRH', entities: 68, tables: 4, last_updated: '2026-06-14T18:00:00Z', classification: 'Confidentiel', quality_score: 87, lineage_complete: false, retention_days: 3650 },
  { id: 'CAT-012', dataset_name: 'Finance & Comptabilité — SYSCOHADA', domain: 'Finance', category: 'Transactionnelle', owner: 'DAF', entities: 1520, tables: 6, last_updated: '2026-06-15T22:00:00Z', classification: 'Confidentiel', quality_score: 95, lineage_complete: true, retention_days: 3650 },
];

export const documentClassifications = [
  { id: 'CLS-001', level: 'Public', label: 'Public', description: 'Accessible sans authentification — Blog, pages publiques, communiqués', documents_count: 312, icon: 'ri-global-line', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'CLS-002', level: 'Interne', label: 'Interne', description: 'Accessible aux collaborateurs KHEPRA authentifiés — Dashboards KOS, procédures', documents_count: 847, icon: 'ri-building-line', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'CLS-003', level: 'Restreint', label: 'Restreint', description: 'Accès limité par rôle — Données réglementaires, analyses sensibles, KPIs', documents_count: 294, icon: 'ri-shield-user-line', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'CLS-004', level: 'Confidentiel', label: 'Confidentiel', description: 'Accès Direction + Partners — Données clients, pipeline, finances', documents_count: 178, icon: 'ri-lock-line', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'CLS-005', level: 'Secret', label: 'Secret', description: 'Accès DG + Partners nommément — Stratégie, M&A, dossiers sensibles', documents_count: 42, icon: 'ri-fingerprint-line', color: 'bg-red-50 text-red-700 border-red-200' },
];

export const versioningRules = [
  { id: 'VER-001', rule_name: 'Workflows & SOP', version_pattern: 'v{major}.{minor}', current_version: 'v3.2', last_modified: '2026-06-15', author: 'Quality Controller', change_summary: 'Ajout étape Compliance Review obligatoire', status: 'Active' },
  { id: 'VER-002', rule_name: 'Edge Functions', version_pattern: 'Déploiement horodaté', current_version: '2026-06-16T04:00:00Z', last_modified: '2026-06-16', author: 'KOS Autonomous PMO', change_summary: 'Mise à jour cron jobs — 32 actifs', status: 'Active' },
  { id: 'VER-003', rule_name: 'Mocks & Seeds', version_pattern: 'Date de dernière seed', current_version: '2026-06-16', last_modified: '2026-06-16', author: 'KOS Data Team', change_summary: 'Migration 31 tables mock vers Supabase LIVE', status: 'Active' },
  { id: 'VER-004', rule_name: 'Documents Clients (Livrables)', version_pattern: 'v{year}.{release}', current_version: 'v2026.04', last_modified: '2026-06-14', author: 'Delivery Manager', change_summary: 'Template Due Diligence — mise à jour GRI 2026', status: 'Active' },
  { id: 'VER-005', rule_name: 'Politiques & Chartes', version_pattern: 'v{major}.{minor}.{patch}', current_version: 'v2.1.3', last_modified: '2026-06-12', author: 'Managing Partner', change_summary: 'Mise à jour Charte Éthique IA — Module 10', status: 'Active' },
  { id: 'VER-006', rule_name: 'Base de Connaissances RAG', version_pattern: 'Index vectoriel — batch ID', current_version: 'batch-2026-06-15-03', last_modified: '2026-06-15', author: 'KOS Automaton Engine', change_summary: 'Rebuild complet — 52 documents, 1.1M embeddings', status: 'Active' },
  { id: 'VER-007', rule_name: 'Schémas Supabase (DDL)', version_pattern: 'Migration horodatée', current_version: 'migration-2026-06-16-01', last_modified: '2026-06-16', author: 'KOS Data Architect', change_summary: 'Création table kos_data_catalog', status: 'Active' },
  { id: 'VER-008', rule_name: 'Code Source (Frontend)', version_pattern: 'Git — build #{n}', current_version: '#2499', last_modified: '2026-06-16', author: 'KOS Dev Team', change_summary: 'Déploiement Data Governance Hub', status: 'Active' },
];

export const auditJournal = [
  { id: 'LOG-001', timestamp: '2026-06-16T08:15:00Z', actor: 'KOS Quality Controller', action: 'SCORE_QUALITY', resource_type: 'Proposition Commerciale', resource_id: 'PROP-2026-089', details: 'Score Qualité 6 dimensions : 92/100 → Approuvé Senior Review', classification: 'Restreint' },
  { id: 'LOG-002', timestamp: '2026-06-16T07:42:00Z', actor: 'Dr. Fatou Ndiaye (SOC L3)', action: 'RESOLVE_INCIDENT', resource_type: 'Security Incident', resource_id: 'INC-028', details: 'DDoS Layer 7 résolu en 16 min — WAF rules mises à jour', classification: 'Restreint' },
  { id: 'LOG-003', timestamp: '2026-06-16T07:30:00Z', actor: 'KOS Legal Validation Engine', action: 'SCAN_LEGAL', resource_type: 'Landing Page', resource_id: 'LP-OFFRE-COMMERCIALE', details: 'Scan 8 catégories risques : Score 88/100 — 1 issue (garantie implicite corrigée)', classification: 'Interne' },
  { id: 'LOG-004', timestamp: '2026-06-16T06:00:00Z', actor: 'KOS Regulatory Intelligence', action: 'UPDATE_REGISTER', resource_type: 'Texte Réglementaire', resource_id: 'BCEAO-INST-008-2026', details: 'Nouvelle instruction BCEAO détectée — ajoutée au registre, 5 processus impactés', classification: 'Restreint' },
  { id: 'LOG-005', timestamp: '2026-06-16T05:00:00Z', actor: 'KOS SEO Audit Engine', action: 'CRAWL_SEO', resource_type: 'Site Web', resource_id: 'khepraexperts.com', details: 'Crawl 42 pages — Score SEO 7.0/10, 15 problèmes critiques, 38 warnings', classification: 'Interne' },
  { id: 'LOG-006', timestamp: '2026-06-16T04:10:00Z', actor: 'KOS Auto-Correction Cron', action: 'CREATE_TICKETS', resource_type: 'Tickets Auto-Correction', resource_id: 'TKT-20260616-0001..0003', details: '3 nouveaux tickets créés depuis le crawl — 2 liens cassés, 1 erreur 500', classification: 'Interne' },
  { id: 'LOG-007', timestamp: '2026-06-16T02:00:00Z', actor: 'KOS Social Scheduler', action: 'GENERATE_POSTS', resource_type: 'Social Media', resource_id: 'SOCIAL-2026-06-16', details: '6 posts LinkedIn générés — taux humanisation 8.7/10, programmés 08:00/12:00 GMT', classification: 'Interne' },
  { id: 'LOG-008', timestamp: '2026-06-15T23:00:00Z', actor: 'KOS Automaton Engine', action: 'REBUILD_INDEX', resource_type: 'RAG Embeddings', resource_id: 'RAG-FULL-2026-06-15', details: 'Rebuild complet index vectoriel — 52 documents, 1 145 000 embeddings, durée 47min', classification: 'Restreint' },
  { id: 'LOG-009', timestamp: '2026-06-15T18:30:00Z', actor: 'Cdt. Amara Diop (SOC Manager)', action: 'ESCALATE_INCIDENT', resource_type: 'Incident Cybersécurité', resource_id: 'INC-026', details: 'Exfiltration données suspecte 12 Mo — escalation DG + RSI, forensic en cours', classification: 'Confidentiel' },
  { id: 'LOG-010', timestamp: '2026-06-15T16:45:00Z', actor: 'KOS Lead Scoring Engine', action: 'RESCORE_LEADS', resource_type: 'Lead Scores', resource_id: 'LEAD-WAVEPAY-001', details: 'Lead WavePay — rescore automatique : 92→96/100 (nouveau meeting COMEX détecté)', classification: 'Confidentiel' },
  { id: 'LOG-011', timestamp: '2026-06-15T15:00:00Z', actor: 'Managing Partner', action: 'APPROVE_DECISION', resource_type: 'Décision Stratégique', resource_id: 'DEC-2026-042', details: 'Approbation ouverture bureau Douala — budget 120M FCFA, Q1 2027', classification: 'Secret' },
  { id: 'LOG-012', timestamp: '2026-06-15T11:20:00Z', actor: 'KOS Peer Review Engine', action: 'COMPLETE_REVIEW', resource_type: 'Livre Blanc', resource_id: 'WP-2026-004', details: 'Peer Review terminée — 3 réviseurs, score 94/100, 2 corrections mineures', classification: 'Interne' },
];

export const retentionPolicies = [
  { id: 'RET-001', data_category: 'Données Réglementaires (BCEAO, COBAC, OHADA)', retention_years: 10, legal_basis: 'Obligation légale — COBAC R-2016/01, OHADA', archival_rule: 'Archive active 3 ans → Archive froide 7 ans', destruction_method: 'Suppression sécurisée certifiée ISO 27001', compliance_status: 'Conforme' },
  { id: 'RET-002', data_category: 'Données Clients — Mandats & Livrables', retention_years: 7, legal_basis: 'Prescription commerciale OHADA — Acte Uniforme DCG Art. 243', archival_rule: 'Archive active 2 ans → Archive froide 5 ans', destruction_method: 'Suppression sécurisée avec certificat', compliance_status: 'Conforme' },
  { id: 'RET-003', data_category: 'Données Comptables & Fiscales', retention_years: 10, legal_basis: 'Obligation fiscale SYSCOHADA — Code Général des Impôts', archival_rule: 'Archive active 3 ans → Archive froide 7 ans', destruction_method: 'Suppression sécurisée certifiée', compliance_status: 'Conforme' },
  { id: 'RET-004', data_category: 'Données RH — Contrats, Paie, Évaluations', retention_years: 5, legal_basis: 'Code du Travail — Prescription 5 ans', archival_rule: 'Archive active 2 ans → Archive froide 3 ans', destruction_method: 'Anonymisation puis suppression', compliance_status: 'Conforme' },
  { id: 'RET-005', data_category: 'Logs de Sécurité & Audit Trail', retention_years: 3, legal_basis: 'RGPD Art. 30 + ISO 27001 A.12.4', archival_rule: 'Rotation automatique — 90j hot, 3 ans cold', destruction_method: 'Rotation automatique certifiée', compliance_status: 'Conforme' },
  { id: 'RET-006', data_category: 'Logs de Traçabilité IA (AI Audit Trail)', retention_years: 7, legal_basis: 'EU AI Act Art. 12 + ISO 42001', archival_rule: 'Archive continue 7 ans — full traceability', destruction_method: 'Suppression après 7 ans avec certificat', compliance_status: 'Conforme avec observations — passage 3→7 ans en cours' },
  { id: 'RET-007', data_category: 'Données Analytiques & KPIs Aggrégés', retention_years: 10, legal_basis: 'Intérêt légitime — Pilotage stratégique', archival_rule: 'Archive continue 10 ans', destruction_method: 'Anonymisation agrégats puis suppression', compliance_status: 'Conforme' },
  { id: 'RET-008', data_category: 'Cookies & Données de Navigation', retention_years: 13, legal_basis: 'RGPD Art. 5(e) + CNIL délibération 2020-091', archival_rule: 'Suppression automatique à 13 mois', destruction_method: 'Effacement automatique programmé', compliance_status: 'Conforme' },
];

export const dataGovernanceKPIs = {
  cataloged_datasets: 12,
  total_tables: 244,
  classified_documents: 1673,
  classification_coverage_pct: 94,
  versioned_documents: 1520,
  versioning_coverage_pct: 91,
  journal_entries_30d: 2847,
  traceability_score_pct: 96,
  retention_policies: 8,
  retention_compliance_pct: 100,
  data_quality_score: 92,
  lineage_complete_pct: 83,
  classification_breakdown: {
    public: 312,
    interne: 847,
    restreint: 294,
    confidentiel: 178,
    secret: 42,
  },
  last_full_audit: '2026-06-15',
  next_full_audit: '2026-09-15',
  compliance_frameworks: ['RGPD', 'OHADA DCG', 'ISO 27001', 'ISO 42001', 'EU AI Act', 'COBAC R-2016/01', 'BCEAO', 'SYSCOHADA'],
};

export const dataQualityMetrics = [
  { dimension: 'Exhaustivité', score: 94, target: 98, issues: 12, trend: 'improving' },
  { dimension: 'Exactitude', score: 96, target: 98, issues: 8, trend: 'stable' },
  { dimension: 'Cohérence', score: 91, target: 95, issues: 18, trend: 'improving' },
  { dimension: 'Actualité', score: 89, target: 95, issues: 22, trend: 'improving' },
  { dimension: 'Unicité', score: 97, target: 99, issues: 5, trend: 'stable' },
  { dimension: 'Traçabilité', score: 93, target: 97, issues: 14, trend: 'improving' },
];

export const dataLineageExamples = [
  { id: 'LIN-001', source: 'BCEAO — Site Officiel', transformation: 'KOS Regulatory Intelligence → Edge Function', destination: 'Table regulatory_register', last_sync: '2026-06-16T06:00:00Z', sync_frequency: 'Quotidienne 06:00 UTC', status: 'OK' },
  { id: 'LIN-002', source: 'COBAC — Journal Officiel CEMAC', transformation: 'KOS Regulatory Intelligence → Edge Function', destination: 'Table regulatory_register', last_sync: '2026-06-16T06:00:00Z', sync_frequency: 'Quotidienne 06:00 UTC', status: 'OK' },
  { id: 'LIN-003', source: 'Formulaires Contact → leads', transformation: 'Trigger auto_score_lead() → PostgreSQL', destination: 'Table lead_scores', last_sync: '2026-06-16T08:00:00Z', sync_frequency: 'Temps réel (Trigger)', status: 'OK' },
  { id: 'LIN-004', source: 'Crawl SEO Quotidien', transformation: 'kos-seo-audit Edge Function', destination: 'Table seo_audit_results', last_sync: '2026-06-16T05:00:00Z', sync_frequency: 'Quotidienne 05:00 UTC', status: 'OK' },
  { id: 'LIN-005', source: 'Google Search Console API', transformation: 'kos-gsc-monitor Edge Function', destination: 'Tables kos_gsc_overview, kos_gsc_keywords, kos_gsc_pages', last_sync: '2026-06-16T09:00:00Z', sync_frequency: 'Quotidienne 09:00 UTC', status: 'OK' },
  { id: 'LIN-006', source: 'Security Scans OWASP', transformation: 'kos-security-scan Edge Function', destination: 'Table security_scans', last_sync: '2026-06-16T06:00:00Z', sync_frequency: 'Quotidienne 06:00 UTC', status: 'OK' },
  { id: 'LIN-007', source: 'Articles Blog → RAG', transformation: 'rag-generate-embeddings (mode batch) Edge Function', destination: 'Table rag_documents (pgvector)', last_sync: '2026-06-15T23:00:00Z', sync_frequency: 'Hebdomadaire (Dimanche 23:00)', status: 'OK' },
  { id: 'LIN-008', source: 'LinkedIn OEmbed + OG + Cache', transformation: 'kos-linkedin-bridge Edge Function', destination: 'Table linkedin_snapshots', last_sync: '2026-06-16T07:00:00Z', sync_frequency: 'Quotidienne 07:00 UTC', status: 'OK' },
];



