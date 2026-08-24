// KOS Workflow Orchestrator™ — Compliance Process → n8n Automated Workflows
// Built on n8n Automation Engine — Big Four Compliance Intelligence

export interface ComplianceScenario {
  id: string;
  autorite: string;
  secteur: 'Banque' | 'EMF' | 'Régulateur' | 'Fintech';
  contexte: string;
  titre: string;
  description: string;
  compliance_requirement: string;
  processus_source: string;
  complexite: 'faible' | 'moyenne' | 'elevee' | 'critique';
  date_creation: string;
}

export interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  node_type: string;
  action: string;
  depends_on: number[];
  critical: boolean;
}

export interface N8nNodeStructure {
  nodes: Array<{
    id: string;
    name: string;
    type: string;
    position: [number, number];
    parameters: Record<string, unknown>;
  }>;
  connections: Record<string, { main: Array<Array<{ node: string; type: string; index: number }>> }>;
}

export interface TriggerConfig {
  type: 'cron' | 'webhook' | 'form_submit' | 'event' | 'api_call' | 'manual';
  config: string;
  payload_sample?: Record<string, unknown>;
  schedule?: string;
  description: string;
}

export interface NodeIO {
  node_name: string;
  node_type: string;
  inputs: Array<{ field: string; type: string; source: string; required: boolean; description: string }>;
  outputs: Array<{ field: string; type: string; destination: string; format: string; description: string }>;
}

export interface ErrorHandling {
  node_name: string;
  error_type: string;
  probability: 'elevee' | 'moyenne' | 'faible';
  detection: string;
  recovery: string;
  retry_strategy: string;
  fallback_action: string;
  alert_target: string;
}

export interface AutomationScore {
  overall: number;
  categories: {
    integrite_processus: number;
    reduction_manuelle: number;
    auditabilite: number;
    resilience: number;
    conformite_normative: number;
    scalabilite: number;
  };
  benchmark: string;
  recommandation: string;
}

export interface GeneratedWorkflow {
  scenario: ComplianceScenario;
  steps: WorkflowStep[];
  n8n_structure: N8nNodeStructure;
  trigger: TriggerConfig;
  node_io: NodeIO[];
  error_handling: ErrorHandling[];
  automation_score: AutomationScore;
  processing: {
    agent: string;
    generation_time_ms: number;
    nb_nodes: number;
    nb_steps: number;
    estimated_runtime_ms: number;
    estimated_monthly_executions: number;
    complexity_score: number;
    last_generated: string;
  };
}

// ═══════════════════════════════════════════════════════
// COMPLIANCE SCENARIOS
// ═══════════════════════════════════════════════════════

export const COMPLIANCE_SCENARIOS: ComplianceScenario[] = [
  {
    id: 'WF-001',
    autorite: 'COBAC',
    secteur: 'Banque',
    contexte: 'Banque commerciale CEMAC — 50 000 comptes, 200 transactions suspectes/mois en moyenne',
    titre: 'LBC/FT — Automatisation du Screening Transactions & Déclarations de Soupçons',
    description: 'Orchestration complète du filtrage des transactions, détection des opérations atypiques, blocage automatique et transmission des déclarations de soupçons à la GABAC dans le délai réglementaire de 48h.',
    compliance_requirement: 'COBAC R-2026/03 Art.7, 12, 15 — Vigilance VASP, Déclaration de Soupçons 48h, Sanctions screening',
    processus_source: 'Actuellement semi-manuel : extraction quotidienne TXT → Excel → vérification manuelle analyste → DS papier → transmission GABAC. Délai moyen actuel : 96h (non conforme).',
    complexite: 'critique',
    date_creation: '2026-06-20',
  },
  {
    id: 'WF-002',
    autorite: 'COBAC',
    secteur: 'Banque',
    contexte: 'Banque régionale CEMAC — 200 employés, Active Directory + CRM + Core Banking System intégrés',
    titre: 'SI Governance — Contrôle des Accès & Révocation Automatique',
    description: 'Workflow de gouvernance des accès SI : détection des comptes inactifs, révocation automatique, revue trimestrielle des habilitations avec validation managériale, logging conforme COBAC.',
    compliance_requirement: 'COBAC R-2025/07 Art.8, 15 — Contrôle Interne documenté, Rapport annuel CI',
    processus_source: 'Processus actuel : revue manuelle Excel trimestrielle par le RSSI, provisioning AD manuel. 45% des comptes orphelins non détectés.',
    complexite: 'elevee',
    date_creation: '2026-06-20',
  },
  {
    id: 'WF-003',
    autorite: 'BEAC',
    secteur: 'Banque',
    contexte: 'Banque d\'investissement CEMAC — bilan 500 Mds FCFA, équipe ALM 3 personnes',
    titre: 'Reporting NSFR Trimestriel BEAC — Collecte, Calcul, Validation & Transmission',
    description: 'Pipeline automatisé de collecte des données de bilan, calcul du NSFR, validation des seuils réglementaires, génération du rapport au format BEAC et transmission automatique.',
    compliance_requirement: 'BEAC Instruction n°008-2026 Art.5 — NSFR ≥ 100%, transmission trimestrielle sous 15 jours',
    processus_source: 'Extraction manuelle Core Banking → Excel → Calcul macro → Email CFO → Saisie portail BEAC. Délai moyen : 12 jours ouvrés. Risque d\'erreur de saisie : 8%.',
    complexite: 'elevee',
    date_creation: '2026-06-20',
  },
  {
    id: 'WF-004',
    autorite: 'GABAC',
    secteur: 'EMF',
    contexte: 'Microfinance CEMAC — 15 000 clients, 80% en zone rurale, connectivité intermittente',
    titre: 'GABAC — Classification des Risques Clients & Revue Périodique Automatisée',
    description: 'Classification automatique des clients en 3 niveaux de risque LBC/FT (faible/moyen/élevé) basée sur 12 critères réglementaires, revue trimestrielle automatique, alerte si changement de niveau.',
    compliance_requirement: 'GABAC Règlement n°01/2026 Art.11 + COBAC R-2026/03 Art.22 — Classification 3 niveaux, Revue trimestrielle',
    processus_source: 'Aucun processus formel. Classification inexistante dans 65% des EMF. Revue trimestrielle non réalisée. Conformité estimée à 12%.',
    complexite: 'moyenne',
    date_creation: '2026-06-20',
  },
];

// ═══════════════════════════════════════════════════════
// GENERATED WORKFLOWS
// ═══════════════════════════════════════════════════════

export const GENERATED_WORKFLOWS: GeneratedWorkflow[] = [
  // ─── WF-001 : LBC/FT Screening ───
  {
    scenario: COMPLIANCE_SCENARIOS[0],
    steps: [
      { step: 1, name: 'Extraction Transactions Quotidiennes', description: 'Extraction des transactions de la veille depuis le Core Banking System via API REST sécurisée', node_type: 'HTTP Request', action: 'GET /api/cbs/transactions?date=yesterday', depends_on: [], critical: true },
      { step: 2, name: 'Enrichissement Données Client', description: 'Jointure avec le registre KYC pour récupérer profil de risque, PEP status, pays de résidence', node_type: 'PostgreSQL', action: 'SELECT * FROM kyc WHERE client_id IN (tx_client_ids)', depends_on: [1], critical: true },
      { step: 3, name: 'Filtrage Sanctions Internationales', description: 'Screening des noms, BIC/IBAN contre les listes OFAC, EU, UN, GAFI via API externe', node_type: 'HTTP Request', action: 'POST /api/sanctions/screen (batch 500)', depends_on: [2], critical: true },
      { step: 4, name: 'Détection Patterns Atypiques', description: 'Analyse comportementale : montant > seuil, pays GAFI HR, structuration (< seuil déclaratif), fréquence anormale', node_type: 'Function', action: 'Node.js custom function — riskScoringEngine()', depends_on: [2, 3], critical: true },
      { step: 5, name: 'Classification & Scoring', description: 'Attribution d\'un score de risque 0-100 par transaction. Score > 70 : blocage automatique', node_type: 'Switch', action: 'Route based on riskScore: LOW (<40), MEDIUM (40-70), HIGH (>70)', depends_on: [4], critical: true },
      { step: 6, name: 'Blocage Transaction Suspecte (HIGH)', description: 'Blocage automatique de la transaction dans le CBS via API + notification immédiate responsable LBC/FT', node_type: 'HTTP Request + Email', action: 'POST /api/cbs/block-transaction + email compliance@bank.com', depends_on: [5], critical: true },
      { step: 7, name: 'Génération Déclaration de Soupçons', description: 'Génération automatique du formulaire DS GABAC au format XML réglementaire avec pièces justificatives', node_type: 'Function', action: 'generateDSReport() → GABAC XML v3.2 format', depends_on: [6], critical: true },
      { step: 8, name: 'Transmission GABAC', description: 'Envoi de la DS au portail GABAC via API sécurisée avec accusé de réception', node_type: 'HTTP Request', action: 'POST https://gabac.org/api/ds/submit', depends_on: [7], critical: true },
      { step: 9, name: 'Journalisation & Piste d\'Audit', description: 'Enregistrement de toutes les étapes dans la table audit_trail avec horodatage et identifiant opérateur', node_type: 'PostgreSQL', action: 'INSERT INTO lbcft_audit_trail (workflow_id, step, result, timestamp)', depends_on: [5, 6, 8], critical: false },
      { step: 10, name: 'Rapport Quotidien Compliance', description: 'Génération et envoi du rapport quotidien au responsable LBC/FT : nb transactions traitées, bloquées, DS émises', node_type: 'Email', action: 'Send PDF report to compliance@bank.com', depends_on: [9], critical: false },
    ],
    n8n_structure: {
      nodes: [
        { id: 'cron-trigger', name: 'Daily Trigger 02:00 UTC', type: 'n8n-nodes-base.scheduleTrigger', position: [250, 300], parameters: { rule: { interval: [{ field: 'cronExpression', expression: '0 2 * * *' }] } } },
        { id: 'extract-tx', name: 'Extract Transactions CBS', type: 'n8n-nodes-base.httpRequest', position: [450, 300], parameters: { method: 'GET', url: '={{$env.CBS_API_URL}}/transactions?date=yesterday', authentication: 'genericCredentialType', genericAuthType: '={{$env.CBS_API_CREDENTIAL}}' } },
        { id: 'enrich-kyc', name: 'Enrich KYC Data', type: 'n8n-nodes-base.postgres', position: [650, 300], parameters: { operation: 'executeQuery', query: 'SELECT client_id, risk_level, pep_status, nationality, residence_country FROM kyc WHERE client_id IN ({{$json.tx_client_ids}})' } },
        { id: 'sanctions-api', name: 'Sanctions Screening API', type: 'n8n-nodes-base.httpRequest', position: [850, 250], parameters: { method: 'POST', url: '={{$env.SANCTIONS_API_URL}}/screen', bodyParameters: { parameters: [{ name: 'names', value: '={{$json.names}}' }, { name: 'countries', value: '={{$json.countries}}' }] } } },
        { id: 'risk-engine', name: 'Risk Scoring Engine', type: 'n8n-nodes-base.function', position: [850, 450], parameters: { functionCode: '// ... riskScoringEngine implementation' } },
        { id: 'risk-switch', name: 'Risk Level Router', type: 'n8n-nodes-base.switch', position: [1050, 350], parameters: { dataPropertyName: 'riskScore', rules: [{ value: 70, operation: 'greaterEqual', output: 0 }, { value: 40, operation: 'greaterEqual', output: 1 }, { value: 0, operation: 'greaterEqual', output: 2 }] } },
        { id: 'block-tx', name: 'Block Transaction CBS', type: 'n8n-nodes-base.httpRequest', position: [1250, 200], parameters: { method: 'POST', url: '={{$env.CBS_API_URL}}/transactions/block', bodyParameters: { parameters: [{ name: 'txId', value: '={{$json.transaction_id}}' }] } } },
        { id: 'alert-compliance', name: 'Alert Compliance Officer', type: 'n8n-nodes-base.emailSend', position: [1250, 380], parameters: { to: 'compliance@bank.com', subject: 'ALERTE CRITIQUE — Transaction suspecte bloquée', text: '={{$json.alert_message}}' } },
        { id: 'gen-ds', name: 'Generate DS Report', type: 'n8n-nodes-base.function', position: [1450, 250], parameters: { functionCode: '// ... generateDSReport()' } },
        { id: 'submit-gabac', name: 'Submit to GABAC', type: 'n8n-nodes-base.httpRequest', position: [1650, 250], parameters: { method: 'POST', url: 'https://gabac.org/api/ds/submit', headers: { parameters: [{ name: 'Authorization', value: 'Bearer {{$env.GABAC_API_KEY}}' }] } } },
        { id: 'audit-log', name: 'Audit Trail Logging', type: 'n8n-nodes-base.postgres', position: [1450, 500], parameters: { operation: 'executeQuery', query: 'INSERT INTO lbcft_audit_trail ...' } },
        { id: 'daily-report', name: 'Daily Compliance Report', type: 'n8n-nodes-base.emailSend', position: [1850, 350], parameters: { to: 'compliance@bank.com', subject: 'Rapport Quotidien LBC/FT', text: '={{$json.report_summary}}', attachments: '={{$json.report_pdf}}' } },
      ],
      connections: {
        'Cron Trigger': { main: [[{ node: 'Extract Transactions CBS', type: 'main', index: 0 }]] },
        'Extract Transactions CBS': { main: [[{ node: 'Enrich KYC Data', type: 'main', index: 0 }]] },
        'Enrich KYC Data': { main: [[{ node: 'Sanctions Screening API', type: 'main', index: 0 }, { node: 'Risk Scoring Engine', type: 'main', index: 0 }]] },
        'Sanctions Screening API': { main: [[{ node: 'Risk Scoring Engine', type: 'main', index: 0 }]] },
        'Risk Scoring Engine': { main: [[{ node: 'Risk Level Router', type: 'main', index: 0 }]] },
        'Risk Level Router': { main: [[{ node: 'Block Transaction CBS', type: 'main', index: 0 }], [{ node: 'Alert Compliance Officer', type: 'main', index: 0 }], [{ node: 'Audit Trail Logging', type: 'main', index: 0 }]] },
        'Block Transaction CBS': { main: [[{ node: 'Generate DS Report', type: 'main', index: 0 }]] },
        'Alert Compliance Officer': { main: [[{ node: 'Audit Trail Logging', type: 'main', index: 0 }]] },
        'Generate DS Report': { main: [[{ node: 'Submit to GABAC', type: 'main', index: 0 }]] },
        'Submit to GABAC': { main: [[{ node: 'Audit Trail Logging', type: 'main', index: 0 }]] },
        'Audit Trail Logging': { main: [[{ node: 'Daily Compliance Report', type: 'main', index: 0 }]] },
      },
    },
    trigger: {
      type: 'cron',
      config: 'cronExpression: "0 2 * * *" (quotidien 02:00 UTC)',
      schedule: 'Quotidien — exécution à 02:00 UTC (03:00 heure CEMAC)',
      description: 'Exécution automatique quotidienne en dehors des heures ouvrées pour traitement batch des transactions de la veille. Déclenchement possible manuellement via le bouton "Force Run" dans le dashboard n8n.',
    },
    node_io: [
      { node_name: 'Extract Transactions CBS', node_type: 'HTTP Request', inputs: [{ field: 'date', type: 'string (ISO 8601)', source: 'Paramètre calculé (yesterday)', required: true, description: 'Date des transactions à extraire' }], outputs: [{ field: 'transactions[]', type: 'JSON array', destination: 'Enrich KYC Data', format: '[{"tx_id": "string", "amount_fcfa": number, "sender_client_id": "string", "receiver_name": "string", "receiver_iban": "string", "country": "string", "purpose": "string"}]', description: 'Liste des transactions de la journée' }] },
      { node_name: 'Enrich KYC Data', node_type: 'PostgreSQL', inputs: [{ field: 'tx_client_ids', type: 'string[]', source: 'Extract Transactions CBS → sender_client_id', required: true, description: 'Liste des IDs clients à enrichir' }], outputs: [{ field: 'enriched_transactions[]', type: 'JSON array', destination: 'Sanctions Screening API + Risk Scoring Engine', format: 'Transaction + KYC fields: risk_level, pep_status, nationality, residence_country', description: 'Transactions enrichies avec données KYC' }] },
      { node_name: 'Sanctions Screening API', node_type: 'HTTP Request', inputs: [{ field: 'names', type: 'string[]', source: 'Enrich KYC → receiver_name', required: true, description: 'Noms à screener' }, { field: 'countries', type: 'string[]', source: 'Enrich KYC → country', required: true, description: 'Pays à vérifier' }], outputs: [{ field: 'sanctions_matches[]', type: 'JSON array', destination: 'Risk Scoring Engine', format: '[{"name": "string", "match_score": number, "list": "OFAC|EU|UN|GAFI"}]', description: 'Correspondances avec listes de sanctions' }] },
      { node_name: 'Risk Scoring Engine', node_type: 'Function', inputs: [{ field: 'transaction', type: 'object', source: 'Enrich KYC + Sanctions Screening', required: true, description: 'Transaction enrichie avec résultats sanctions' }], outputs: [{ field: 'riskScore', type: 'number (0-100)', destination: 'Risk Level Router', format: 'Integer 0-100', description: 'Score de risque calculé' }, { field: 'riskFactors[]', type: 'string[]', destination: 'Risk Level Router', format: '["MONTANT_ELEVE", "PAYS_GAFI_HR", "PEP", "SANCTIONS_MATCH", "STRUCTURATION"]', description: 'Facteurs de risque identifiés' }] },
      { node_name: 'Generate DS Report', node_type: 'Function', inputs: [{ field: 'transaction', type: 'object', source: 'Block Transaction CBS', required: true, description: 'Transaction bloquée avec détails' }], outputs: [{ field: 'ds_xml', type: 'string (XML)', destination: 'Submit to GABAC', format: 'GABAC DS XML v3.2 schema', description: 'Déclaration de soupçons format GABAC' }, { field: 'supporting_docs[]', type: 'binary[]', destination: 'Submit to GABAC', format: 'PDF attachments', description: 'Pièces justificatives' }] },
    ],
    error_handling: [
      { node_name: 'Extract Transactions CBS', error_type: 'API Connection Failed', probability: 'faible', detection: 'HTTP status != 200 → retry mechanism triggers', recovery: 'Automatic retry 3x with exponential backoff (30s, 60s, 120s)', retry_strategy: 'Exponential backoff 3 retries → escalate to Slack #ops-critical', fallback_action: 'Si CBS API down > 5min → envoyer alerte SMS au DSI + utiliser le backup flat file de la veille', alert_target: 'DSI + Responsable LBC/FT (Slack + SMS)' },
      { node_name: 'Sanctions Screening API', error_type: 'API Timeout / Rate Limit', probability: 'moyenne', detection: 'Timeout > 30s or HTTP 429', recovery: 'Reduce batch size to 100 → retry with 5s delay between batches', retry_strategy: 'Batch splitting + linear delay 5s → max 5 splits', fallback_action: 'Si API down > 15min → mode conservatif : flag TOUTES les transactions internationales pour revue manuelle', alert_target: 'Compliance Officer (Email)' },
      { node_name: 'Submit to GABAC', error_type: 'GABAC Portal Unavailable', probability: 'faible', detection: 'HTTP status != 200 or connection refused', recovery: 'Queue DS in pending table → retry every 30min until success', retry_strategy: 'Persistent retry with PostgreSQL queue — max 48h (limite réglementaire)', fallback_action: 'Si > 24h sans succès → escalade manuelle : impression DS + fax GABAC + appel téléphonique', alert_target: 'Responsable LBC/FT + DG (Email + SMS urgent)' },
      { node_name: 'Block Transaction CBS', error_type: 'CBS Block API Failed', probability: 'faible', detection: 'HTTP status != 200', recovery: 'Manual override flag in audit trail + immediate email to operations', retry_strategy: '3 retries → escalate to manual intervention', fallback_action: 'Créer ticket urgent opérations avec instructions de blocage manuel dans CBS', alert_target: 'Opérations bancaires + Compliance (Email + SMS)' },
    ],
    automation_score: {
      overall: 94,
      categories: { integrite_processus: 97, reduction_manuelle: 95, auditabilite: 98, resilience: 88, conformite_normative: 96, scalabilite: 90 },
      benchmark: 'Top 5% des banques CEMAC — Niveau Big Four',
      recommandation: 'Déploiement immédiat recommandé. ROI estimé : réduction de 96h à < 2h du délai DS, économie de 3 ETP, conformité réglementaire 100%.',
    },
    processing: {
      agent: 'KOS Workflow Orchestrator™ — LBC/FT Screening Engine v1.0',
      generation_time_ms: 1847,
      nb_nodes: 12,
      nb_steps: 10,
      estimated_runtime_ms: 45000,
      estimated_monthly_executions: 30,
      complexity_score: 8.7,
      last_generated: '2026-06-24T13:00:00Z',
    },
  },

  // ─── WF-002 : SI Governance Access Control ───
  {
    scenario: COMPLIANCE_SCENARIOS[1],
    steps: [
      { step: 1, name: 'Scan Comptes Active Directory', description: 'Extraction hebdomadaire des comptes AD : lastLogon, enabled status, group memberships, manager', node_type: 'LDAP / HTTP Request', action: 'GET /api/ad/accounts?attributes=lastLogon,enabled,memberOf,manager', depends_on: [], critical: true },
      { step: 2, name: 'Détection Comptes Orphelins', description: 'Identification des comptes sans lastLogon > 90 jours OU sans manager OU départ non répercuté dans AD', node_type: 'Function', action: 'orphanDetectionEngine() → filter lastLogon > 90d OR manager=null OR status=departed', depends_on: [1], critical: true },
      { step: 3, name: 'Cross-Reference RH', description: 'Croisement avec le SIRH pour vérifier statut employé (actif, départ, suspension, congé long)', node_type: 'HTTP Request', action: 'POST /api/hr/employee-status → batch query employee IDs', depends_on: [2], critical: true },
      { step: 4, name: 'Classification Action', description: 'Classification de chaque compte orphelin en 3 catégories : DÉSACTIVATION, REVUE MANAGER, CONSERVATION', node_type: 'Switch', action: 'Route based on status + lastLogon: DISABLE, REVIEW, KEEP', depends_on: [3], critical: true },
      { step: 5, name: 'Désactivation Automatique AD', description: 'Désactivation immédiate des comptes classés DÉSACTIVATION (départs confirmés + inactifs > 180j)', node_type: 'HTTP Request', action: 'PATCH /api/ad/accounts/{id}/disable', depends_on: [4], critical: true },
      { step: 6, name: 'Notification Manager (REVUE)', description: 'Envoi d\'un formulaire de validation au manager pour les comptes REVUE avec deadline 5 jours', node_type: 'Email + Webhook', action: 'Email avec lien formulaire validation → webhook de réception réponse', depends_on: [4], critical: false },
      { step: 7, name: 'Revue Trimestrielle Habilitations', description: 'Génération d\'une matrice des habilitations par employé/département pour revue trimestrielle RSSI', node_type: 'Function + Email', action: 'generateAccessMatrix() → PDF → email rssi@bank.com', depends_on: [1], critical: false },
      { step: 8, name: 'Journalisation SIEM', description: 'Envoi de tous les événements (détection, désactivation, validation) au SIEM central avec sévérité', node_type: 'HTTP Request', action: 'POST /api/siem/events → format CEF (Common Event Format)', depends_on: [5, 6, 7], critical: false },
    ],
    n8n_structure: {
      nodes: [
        { id: 'weekly-cron', name: 'Weekly Trigger Lundi 06:00', type: 'n8n-nodes-base.scheduleTrigger', position: [250, 300], parameters: { rule: { interval: [{ field: 'cronExpression', expression: '0 6 * * 1' }] } } },
        { id: 'scan-ad', name: 'Scan Active Directory', type: 'n8n-nodes-base.httpRequest', position: [450, 300], parameters: { method: 'GET', url: '={{$env.AD_API_URL}}/accounts', authentication: 'genericCredentialType' } },
        { id: 'detect-orphans', name: 'Orphan Detection Engine', type: 'n8n-nodes-base.function', position: [650, 300], parameters: { functionCode: '// ... orphanDetectionEngine()' } },
        { id: 'cross-hr', name: 'Cross-Reference SIRH', type: 'n8n-nodes-base.httpRequest', position: [850, 300], parameters: { method: 'POST', url: '={{$env.HR_API_URL}}/employee-status' } },
        { id: 'classify', name: 'Classification Router', type: 'n8n-nodes-base.switch', position: [1050, 300], parameters: { rules: [{ value: 'DESACTIVATION', operation: 'equals', output: 0 }, { value: 'REVUE', operation: 'equals', output: 1 }, { value: 'CONSERVATION', operation: 'equals', output: 2 }] } },
        { id: 'disable-ad', name: 'Disable AD Account', type: 'n8n-nodes-base.httpRequest', position: [1250, 150], parameters: { method: 'PATCH', url: '={{$env.AD_API_URL}}/accounts/{{$json.accountId}}/disable' } },
        { id: 'notify-manager', name: 'Notify Manager (Review)', type: 'n8n-nodes-base.emailSend', position: [1250, 380], parameters: { to: '={{$json.managerEmail}}', subject: 'Validation accès SI requise — deadline 5 jours', text: '={{$json.reviewMessage}}' } },
        { id: 'gen-matrix', name: 'Generate Access Matrix', type: 'n8n-nodes-base.function', position: [1250, 550], parameters: { functionCode: '// ... generateAccessMatrix()' } },
        { id: 'log-siem', name: 'SIEM Event Logging', type: 'n8n-nodes-base.httpRequest', position: [1450, 300], parameters: { method: 'POST', url: '={{$env.SIEM_API_URL}}/events', bodyParameters: { parameters: [{ name: 'events', value: '={{$json.events}}' }] } } },
      ],
      connections: {
        'Weekly Trigger': { main: [[{ node: 'Scan Active Directory', type: 'main', index: 0 }]] },
        'Scan Active Directory': { main: [[{ node: 'Orphan Detection Engine', type: 'main', index: 0 }]] },
        'Orphan Detection Engine': { main: [[{ node: 'Cross-Reference SIRH', type: 'main', index: 0 }]] },
        'Cross-Reference SIRH': { main: [[{ node: 'Classification Router', type: 'main', index: 0 }]] },
        'Classification Router': { main: [[{ node: 'Disable AD Account', type: 'main', index: 0 }], [{ node: 'Notify Manager (Review)', type: 'main', index: 0 }], [{ node: 'Generate Access Matrix', type: 'main', index: 0 }]] },
        'Disable AD Account': { main: [[{ node: 'SIEM Event Logging', type: 'main', index: 0 }]] },
        'Notify Manager (Review)': { main: [[{ node: 'SIEM Event Logging', type: 'main', index: 0 }]] },
        'Generate Access Matrix': { main: [[{ node: 'SIEM Event Logging', type: 'main', index: 0 }]] },
      },
    },
    trigger: {
      type: 'cron',
      config: 'cronExpression: "0 6 * * 1" (chaque lundi 06:00 UTC)',
      schedule: 'Hebdomadaire — exécution lundi 06:00 UTC',
      description: 'Scan hebdomadaire des accès Active Directory avec revue trimestrielle générée le premier lundi de chaque trimestre. Déclenchement manuel possible via webhook POST /webhook/si-governance/force-scan.',
    },
    node_io: [
      { node_name: 'Scan Active Directory', node_type: 'HTTP Request', inputs: [{ field: 'filter', type: 'string', source: 'Paramètre fixe', required: false, description: 'Filtre LDAP optionnel' }], outputs: [{ field: 'accounts[]', type: 'JSON array', destination: 'Orphan Detection Engine', format: '[{"accountId": "string", "lastLogon": "ISO8601", "enabled": boolean, "groups": "string[]", "manager": "string|null"}]', description: 'Liste complète des comptes AD' }] },
      { node_name: 'Cross-Reference SIRH', node_type: 'HTTP Request', inputs: [{ field: 'employeeIds', type: 'string[]', source: 'Orphan Detection → filtered accountIds', required: true, description: 'IDs employés à vérifier' }], outputs: [{ field: 'employeeStatuses[]', type: 'JSON array', destination: 'Classification Router', format: '[{"employeeId": "string", "status": "actif|depart|suspension|conge", "departDate": "ISO8601|null"}]', description: 'Statuts employés depuis le SIRH' }] },
      { node_name: 'SIEM Event Logging', node_type: 'HTTP Request', inputs: [{ field: 'events', type: 'CEF array', source: 'Tous les nœuds précédents', required: true, description: 'Événements à journaliser' }], outputs: [{ field: 'logStatus', type: 'object', destination: 'End node', format: '{"logged": number, "failed": number}', description: 'Statut de journalisation SIEM' }] },
    ],
    error_handling: [
      { node_name: 'Scan Active Directory', error_type: 'AD API Connection Failed', probability: 'faible', detection: 'HTTP status != 200', recovery: 'Retry 3x with 60s interval', retry_strategy: '3 retries → escalate to RSSI', fallback_action: 'Utiliser le dernier snapshot AD valide (max 7 jours) avec flag "stale data"', alert_target: 'RSSI (Email)' },
      { node_name: 'Cross-Reference SIRH', error_type: 'SIRH API Down', probability: 'moyenne', detection: 'HTTP timeout > 15s', recovery: 'Retry 2x → utiliser cache local SIRH (sync quotidien)', retry_strategy: '2 retries → fallback to cache', fallback_action: 'Si cache > 24h → flag ALL orphelins comme REVUE (conservatif)', alert_target: 'RSSI + RH (Email)' },
      { node_name: 'Disable AD Account', error_type: 'AD Write Permission Denied', probability: 'faible', detection: 'HTTP 403', recovery: 'Vérifier credential rotation → retry with refreshed token', retry_strategy: 'Token refresh → retry 1x', fallback_action: 'Créer ticket ITSM "Désactivation manuelle requise" avec détails compte', alert_target: 'Équipe IT Infrastructure (Ticket + Email)' },
    ],
    automation_score: {
      overall: 91,
      categories: { integrite_processus: 94, reduction_manuelle: 93, auditabilite: 96, resilience: 85, conformite_normative: 92, scalabilite: 88 },
      benchmark: 'Top 10% des institutions financières CEMAC — Conforme COBAC R-2025/07 Art.8',
      recommandation: 'Déploiement prioritaire. Élimine 93% des revues manuelles d\'accès. Piste d\'audit complète automatique pour les inspections COBAC.',
    },
    processing: {
      agent: 'KOS Workflow Orchestrator™ — SI Governance Engine v1.0',
      generation_time_ms: 1283,
      nb_nodes: 9,
      nb_steps: 8,
      estimated_runtime_ms: 28000,
      estimated_monthly_executions: 4,
      complexity_score: 6.4,
      last_generated: '2026-06-24T13:02:00Z',
    },
  },

  // ─── WF-003 : BEAC NSFR Reporting ───
  {
    scenario: COMPLIANCE_SCENARIOS[2],
    steps: [
      { step: 1, name: 'Extraction Données Bilan', description: 'Extraction des lignes de bilan réglementaire depuis le Core Banking System (actif/passif par maturité)', node_type: 'HTTP Request', action: 'GET /api/cbs/balance-sheet?asOf=quarterEnd', depends_on: [], critical: true },
      { step: 2, name: 'Classification ASF/RSF', description: 'Classification automatique des postes en Available Stable Funding et Required Stable Funding selon grille BEAC', node_type: 'Function', action: 'classifyASF_RSF() → mapping réglementaire BEAC v2026', depends_on: [1], critical: true },
      { step: 3, name: 'Application Coefficients BEAC', description: 'Application des coefficients de pondération ASF/RSF selon instruction BEAC n°008-2026', node_type: 'Function', action: 'applyWeights() → ASF_weighted, RSF_weighted', depends_on: [2], critical: true },
      { step: 4, name: 'Calcul NSFR', description: 'Calcul du ratio NSFR = ASF pondéré / RSF pondéré × 100', node_type: 'Function', action: 'nsfr = (totalASF / totalRSF) * 100', depends_on: [3], critical: true },
      { step: 5, name: 'Validation Seuils', description: 'Vérification NSFR ≥ 100%. Si < 105% → alerte précoce CFO. Si < 100% → alerte critique DG + BEAC', node_type: 'IF/Switch', action: 'nsfr >= 105 → OK, nsfr 100-105 → WARNING, nsfr < 100 → CRITICAL', depends_on: [4], critical: true },
      { step: 6, name: 'Génération Rapport BEAC XML', description: 'Génération du rapport au format XML BEAC (schéma NSFR v3.0) avec signature électronique', node_type: 'Function', action: 'generateBEACReport() → NSFR_Reporting_v3.0.xml', depends_on: [4], critical: true },
      { step: 7, name: 'Validation CFO', description: 'Envoi du rapport au CFO pour validation électronique. Si non validé sous 48h → escalade DG', node_type: 'Email + Webhook', action: 'Email CFO → lien validation → webhook callback', depends_on: [5, 6], critical: false },
      { step: 8, name: 'Soumission Portail BEAC', description: 'Transmission automatique du rapport validé au portail BEAC avec confirmation de dépôt', node_type: 'HTTP Request', action: 'POST https://portail.beac.int/api/nsfr/submit', depends_on: [7], critical: true },
      { step: 9, name: 'Archivage & Piste d\'Audit', description: 'Archivage du rapport, de la validation CFO, et de l\'accusé BEAC dans le registre réglementaire', node_type: 'PostgreSQL', action: 'INSERT INTO nsfr_archive (quarter, report_xml, cfo_validation, beac_receipt)', depends_on: [8], critical: false },
    ],
    n8n_structure: {
      nodes: [
        { id: 'quarterly-cron', name: 'Quarterly Trigger J+10 02:00', type: 'n8n-nodes-base.scheduleTrigger', position: [250, 300], parameters: { rule: { interval: [{ field: 'cronExpression', expression: '0 2 10 */3 *' }] } } },
        { id: 'extract-bs', name: 'Extract Balance Sheet', type: 'n8n-nodes-base.httpRequest', position: [450, 300], parameters: { method: 'GET', url: '={{$env.CBS_API_URL}}/balance-sheet-regulatory', authentication: 'genericCredentialType' } },
        { id: 'classify-asf-rsf', name: 'Classify ASF/RSF', type: 'n8n-nodes-base.function', position: [650, 250], parameters: { functionCode: '// ... classifyASF_RSF()' } },
        { id: 'apply-weights', name: 'Apply BEAC Coefficients', type: 'n8n-nodes-base.function', position: [650, 450], parameters: { functionCode: '// ... applyWeights()' } },
        { id: 'calc-nsfr', name: 'Calculate NSFR', type: 'n8n-nodes-base.function', position: [850, 350], parameters: { functionCode: '// ... calculate NSFR' } },
        { id: 'validate-threshold', name: 'Threshold Validation', type: 'n8n-nodes-base.switch', position: [1050, 350], parameters: { rules: [{ value: 105, operation: 'greaterEqual', output: 0 }, { value: 100, operation: 'greaterEqual', output: 1 }, { value: 0, operation: 'greaterEqual', output: 2 }] } },
        { id: 'gen-xml', name: 'Generate BEAC XML', type: 'n8n-nodes-base.function', position: [1250, 200], parameters: { functionCode: '// ... generateBEACReport()' } },
        { id: 'email-cfo', name: 'CFO Validation Request', type: 'n8n-nodes-base.emailSend', position: [1250, 400], parameters: { to: 'cfo@bank.com', subject: 'NSFR Q{{$json.quarter}} — Validation requise', text: '={{$json.validationMessage}}' } },
        { id: 'submit-beac', name: 'Submit BEAC Portal', type: 'n8n-nodes-base.httpRequest', position: [1450, 300], parameters: { method: 'POST', url: 'https://portail.beac.int/api/nsfr/submit', headers: { parameters: [{ name: 'Authorization', value: 'Bearer {{$env.BEAC_API_KEY}}' }] } } },
        { id: 'archive', name: 'Archive & Audit Trail', type: 'n8n-nodes-base.postgres', position: [1650, 300], parameters: { operation: 'executeQuery', query: 'INSERT INTO nsfr_archive ...' } },
      ],
      connections: {
        'Quarterly Trigger': { main: [[{ node: 'Extract Balance Sheet', type: 'main', index: 0 }]] },
        'Extract Balance Sheet': { main: [[{ node: 'Classify ASF/RSF', type: 'main', index: 0 }]] },
        'Classify ASF/RSF': { main: [[{ node: 'Apply BEAC Coefficients', type: 'main', index: 0 }]] },
        'Apply BEAC Coefficients': { main: [[{ node: 'Calculate NSFR', type: 'main', index: 0 }]] },
        'Calculate NSFR': { main: [[{ node: 'Threshold Validation', type: 'main', index: 0 }, { node: 'Generate BEAC XML', type: 'main', index: 0 }]] },
        'Threshold Validation': { main: [[{ node: 'CFO Validation Request', type: 'main', index: 0 }], [{ node: 'CFO Validation Request', type: 'main', index: 0 }], [{ node: 'CFO Validation Request', type: 'main', index: 0 }]] },
        'Generate BEAC XML': { main: [[{ node: 'CFO Validation Request', type: 'main', index: 0 }]] },
        'CFO Validation Request': { main: [[{ node: 'Submit BEAC Portal', type: 'main', index: 0 }]] },
        'Submit BEAC Portal': { main: [[{ node: 'Archive & Audit Trail', type: 'main', index: 0 }]] },
      },
    },
    trigger: {
      type: 'cron',
      config: 'cronExpression: "0 2 10 */3 *" (10ème jour de chaque trimestre 02:00 UTC)',
      schedule: 'Trimestriel — J+10 après fin de trimestre (conforme délai BEAC 15 jours)',
      description: 'Déclenchement automatique le 10ème jour de chaque trimestre à 02:00 UTC. Possibilité de run manuel anticipé via webhook POST /webhook/nsfr/run-early.',
    },
    node_io: [
      { node_name: 'Extract Balance Sheet', node_type: 'HTTP Request', inputs: [{ field: 'asOf', type: 'string (date)', source: 'Paramètre calculé (fin trimestre précédent)', required: true, description: 'Date d\'arrêté du bilan' }], outputs: [{ field: 'balanceSheet', type: 'JSON object', destination: 'Classify ASF/RSF', format: '{"assets": [{"line": "string", "amount": number, "maturity": "string"}], "liabilities": [...]}', description: 'Bilan réglementaire complet' }] },
      { node_name: 'Calculate NSFR', node_type: 'Function', inputs: [{ field: 'weightedASF', type: 'number', source: 'Apply BEAC Coefficients', required: true, description: 'ASF pondéré' }, { field: 'weightedRSF', type: 'number', source: 'Apply BEAC Coefficients', required: true, description: 'RSF pondéré' }], outputs: [{ field: 'nsfr', type: 'number', destination: 'Threshold Validation + Generate BEAC XML', format: 'Percentage (e.g. 112.45)', description: 'Ratio NSFR calculé' }, { field: 'components', type: 'object', destination: 'Generate BEAC XML', format: '{"asf_detail": [...], "rsf_detail": [...]}', description: 'Détail des composants NSFR' }] },
    ],
    error_handling: [
      { node_name: 'Extract Balance Sheet', error_type: 'CBS Data Incomplete', probability: 'moyenne', detection: 'Validation JSON schema → missing required fields', recovery: 'Log missing fields → retry extraction with extended date range', retry_strategy: 'Auto-fix + retry 1x → escalate to Finance', fallback_action: 'Flag report with "Données incomplètes" disclaimer → CFO review mandatory', alert_target: 'Direction Financière (Email)' },
      { node_name: 'Submit BEAC Portal', error_type: 'BEAC Portal Rejection', probability: 'faible', detection: 'HTTP 422 (schema validation failed)', recovery: 'Parse BEAC error response → auto-correct XML if known issue → resubmit', retry_strategy: 'Auto-correction retry 2x → escalate to CFO', fallback_action: 'Soumission manuelle via portail BEAC dans le délai réglementaire restant', alert_target: 'CFO + ALM Manager (Email urgent)' },
      { node_name: 'CFO Validation Request', error_type: 'CFO No Response (timeout 48h)', probability: 'moyenne', detection: 'Timer 48h without webhook callback', recovery: 'Rappel automatique à 24h → escalade DG à 48h', retry_strategy: 'Rappel + escalation → validation forcée DG', fallback_action: 'Validation par DG avec mention "CFO indisponible" dans le rapport', alert_target: 'CFO (Rappel 24h) → DG (Escalade 48h)' },
    ],
    automation_score: {
      overall: 89,
      categories: { integrite_processus: 92, reduction_manuelle: 88, auditabilite: 95, resilience: 82, conformite_normative: 91, scalabilite: 86 },
      benchmark: 'Top 15% des banques CEMAC — Automatisation complète NSFR conforme BEAC',
      recommandation: 'Déployer avec circuit de validation CFO. Réduit le risque d\'erreur de 8% à < 0.5%. Conforme Instruction BEAC 008-2026 Art.5.',
    },
    processing: {
      agent: 'KOS Workflow Orchestrator™ — BEAC NSFR Engine v1.0',
      generation_time_ms: 1521,
      nb_nodes: 10,
      nb_steps: 9,
      estimated_runtime_ms: 35000,
      estimated_monthly_executions: 1,
      complexity_score: 7.2,
      last_generated: '2026-06-24T13:04:00Z',
    },
  },

  // ─── WF-004 : GABAC Classification Risques EMF ───
  {
    scenario: COMPLIANCE_SCENARIOS[3],
    steps: [
      { step: 1, name: 'Extraction Base Clients', description: 'Extraction de la base clients complète depuis le système de gestion de la microfinance', node_type: 'HTTP Request', action: 'GET /api/cbs/clients?include=accounts,transactions', depends_on: [], critical: true },
      { step: 2, name: 'Enrichissement KYC', description: 'Récupération des données KYC : profession, revenus estimés, zone géographique, type de pièce d\'identité, nationalité', node_type: 'PostgreSQL', action: 'SELECT * FROM client_kyc WHERE client_id IN (...) AND status = active', depends_on: [1], critical: true },
      { step: 3, name: 'Calcul Score de Risque', description: 'Application des 12 critères réglementaires GABAC : profession, pays, PEP, montant transactions, fréquence, canal, zone géographique, type de compte, ancienneté, secteur d\'activité, cash intensity, source de fonds', node_type: 'Function', action: 'gabacRiskScoring() → score 0-100 avec breakdown par critère', depends_on: [2], critical: true },
      { step: 4, name: 'Classification 3 Niveaux', description: 'Mapping score → niveau : FAIBLE (0-25), MOYEN (26-60), ÉLEVÉ (61-100)', node_type: 'Switch', action: 'Route: LOW, MEDIUM, HIGH', depends_on: [3], critical: true },
      { step: 5, name: 'Mise à Jour Profils Clients', description: 'Écriture du niveau de risque dans le profil client du Core Banking System', node_type: 'HTTP Request', action: 'PATCH /api/cbs/clients/{id}/risk-level', depends_on: [4], critical: true },
      { step: 6, name: 'Génération Rapport Trimestriel', description: 'Génération du rapport de distribution des risques : nb clients par niveau, évolution vs trimestre précédent, clients promus/rétrogradés', node_type: 'Function', action: 'generateQuarterlyRiskReport() → PDF + CSV', depends_on: [5], critical: false },
      { step: 7, name: 'Envoi Rapport Direction', description: 'Envoi automatique du rapport au Directeur Général et au Responsable Conformité', node_type: 'Email', action: 'Email avec PDF attaché à dg@emf.com, conformite@emf.com', depends_on: [6], critical: false },
    ],
    n8n_structure: {
      nodes: [
        { id: 'quarterly-cron', name: 'Quarterly Trigger J+1 01:00', type: 'n8n-nodes-base.scheduleTrigger', position: [250, 300], parameters: { rule: { interval: [{ field: 'cronExpression', expression: '0 1 1 */3 *' }] } } },
        { id: 'extract-clients', name: 'Extract Client Base', type: 'n8n-nodes-base.httpRequest', position: [450, 300], parameters: { method: 'GET', url: '={{$env.CBS_API_URL}}/clients', authentication: 'genericCredentialType' } },
        { id: 'enrich-kyc', name: 'Enrich KYC Data', type: 'n8n-nodes-base.postgres', position: [650, 300], parameters: { operation: 'executeQuery', query: 'SELECT * FROM client_kyc WHERE client_id IN ({{$json.clientIds}})' } },
        { id: 'risk-score', name: 'GABAC Risk Scoring', type: 'n8n-nodes-base.function', position: [850, 300], parameters: { functionCode: '// ... gabacRiskScoring() — 12 criteria' } },
        { id: 'classify', name: 'Level Classification', type: 'n8n-nodes-base.switch', position: [1050, 300], parameters: { rules: [{ value: 61, operation: 'greaterEqual', output: 0 }, { value: 26, operation: 'greaterEqual', output: 1 }, { value: 0, operation: 'greaterEqual', output: 2 }] } },
        { id: 'update-profile', name: 'Update Client Profile', type: 'n8n-nodes-base.httpRequest', position: [1250, 300], parameters: { method: 'PATCH', url: '={{$env.CBS_API_URL}}/clients/{{$json.clientId}}/risk-level' } },
        { id: 'gen-report', name: 'Generate Quarterly Report', type: 'n8n-nodes-base.function', position: [1450, 300], parameters: { functionCode: '// ... generateQuarterlyRiskReport()' } },
        { id: 'email-report', name: 'Email Report to Direction', type: 'n8n-nodes-base.emailSend', position: [1650, 300], parameters: { to: 'dg@emf.com,conformite@emf.com', subject: 'Rapport Trimestriel Classification Risques LBC/FT', attachments: '={{$json.reportPdf}}' } },
      ],
      connections: {
        'Quarterly Trigger': { main: [[{ node: 'Extract Client Base', type: 'main', index: 0 }]] },
        'Extract Client Base': { main: [[{ node: 'Enrich KYC Data', type: 'main', index: 0 }]] },
        'Enrich KYC Data': { main: [[{ node: 'GABAC Risk Scoring', type: 'main', index: 0 }]] },
        'GABAC Risk Scoring': { main: [[{ node: 'Level Classification', type: 'main', index: 0 }]] },
        'Level Classification': { main: [[{ node: 'Update Client Profile', type: 'main', index: 0 }], [{ node: 'Update Client Profile', type: 'main', index: 0 }], [{ node: 'Update Client Profile', type: 'main', index: 0 }]] },
        'Update Client Profile': { main: [[{ node: 'Generate Quarterly Report', type: 'main', index: 0 }]] },
        'Generate Quarterly Report': { main: [[{ node: 'Email Report to Direction', type: 'main', index: 0 }]] },
      },
    },
    trigger: {
      type: 'cron',
      config: 'cronExpression: "0 1 1 */3 *" (1er jour de chaque trimestre 01:00 UTC)',
      schedule: 'Trimestriel — 1er jour du trimestre à 01:00 UTC',
      description: 'Reclassification automatique trimestrielle. Compatible zones à faible connectivité : le workflow est conçu avec des timeouts longs (120s) et une tolérance aux déconnexions. Possibilité de lancer manuellement depuis un téléphone via webhook simplifié.',
    },
    node_io: [
      { node_name: 'Extract Client Base', node_type: 'HTTP Request', inputs: [{ field: 'syncToken', type: 'string', source: 'Dernier token de synchronisation', required: false, description: 'Pour sync incrémentale (zones faible connectivité)' }], outputs: [{ field: 'clients[]', type: 'JSON array', destination: 'Enrich KYC Data', format: '[{"clientId": "string", "fullName": "string", "accountType": "string", "openingDate": "ISO8601", "monthlyVolume": number}]', description: 'Base clients active' }] },
      { node_name: 'GABAC Risk Scoring', node_type: 'Function', inputs: [{ field: 'client', type: 'object', source: 'Enrich KYC Data', required: true, description: 'Client avec KYC complet' }], outputs: [{ field: 'riskScore', type: 'number (0-100)', destination: 'Level Classification', format: 'Integer', description: 'Score GABAC 12 critères' }, { field: 'riskBreakdown', type: 'object', destination: 'Level Classification', format: '{"profession": number, "pays": number, ...}', description: 'Breakdown par critère' }] },
    ],
    error_handling: [
      { node_name: 'Extract Client Base', error_type: 'Connection Timeout (zone rurale)', probability: 'elevee', detection: 'Timeout > 120s', recovery: 'Auto-switch to offline batch mode → use last successful extract + incremental sync', retry_strategy: '2 retries with extended timeout 180s → fallback to offline mode', fallback_action: 'Mode offline : utiliser extrait CSV du mois précédent + notifier admin pour sync manuelle', alert_target: 'Admin EMF (SMS — canal bas débit)' },
      { node_name: 'GABAC Risk Scoring', error_type: 'Données KYC insuffisantes', probability: 'moyenne', detection: 'Required fields missing for > 30% of clients', recovery: 'Flag clients with "DONNÉES INCOMPLÈTES" → classify as "ÉLEVÉ" by default (conservative)', retry_strategy: 'No retry — conservative classification applied', fallback_action: 'Générer liste clients à compléter → envoyer aux agents terrain avec formulaire KYC', alert_target: 'Responsable Conformité + Agents Terrain (Email + SMS)' },
      { node_name: 'Update Client Profile', error_type: 'CBS Write Failed', probability: 'faible', detection: 'HTTP status != 200', recovery: 'Queue failed updates in local SQLite DB → retry with 15min interval', retry_strategy: 'Persistent local queue (SQLite) → retry every 15min until success', fallback_action: 'Si > 24h → rapport manuel des clients non mis à jour pour saisie directe CBS', alert_target: 'Admin EMF (Email)' },
    ],
    automation_score: {
      overall: 82,
      categories: { integrite_processus: 88, reduction_manuelle: 85, auditabilite: 90, resilience: 72, conformite_normative: 84, scalabilite: 75 },
      benchmark: 'Solution adaptée EMF — Conforme GABAC R-01/2026 Art.11 et COBAC R-2026/03 Art.22',
      recommandation: 'Déployer avec mode offline pour zones rurales. Augmente la conformité de 12% à > 90%. Prévoir renforcement KYC terrain pour améliorer la qualité des données d\'entrée.',
    },
    processing: {
      agent: 'KOS Workflow Orchestrator™ — EMF Risk Classification Engine v1.0',
      generation_time_ms: 1356,
      nb_nodes: 8,
      nb_steps: 7,
      estimated_runtime_ms: 120000,
      estimated_monthly_executions: 1,
      complexity_score: 5.1,
      last_generated: '2026-06-24T13:06:00Z',
    },
  },
];

// ═══════════════════════════════════════════════════════
// ORCHESTRATOR AGENTS
// ═══════════════════════════════════════════════════════

export const ORCHESTRATOR_AGENTS = [
  { id: 'wo-01', nom: 'Process Analyzer™', mission: 'Analyse des processus de conformité existants — identification des étapes, goulots, risques et opportunités d\'automatisation', statut: 'active', workflows_analyses: 4, precision: 96.8, icon: 'ri-mind-map' },
  { id: 'wo-02', nom: 'n8n Node Architect™', mission: 'Génération de la structure n8n (nodes, connexions, paramètres) à partir des processus analysés — format JSON compatible n8n import', statut: 'active', structures_generees: 4, precision: 94.2, icon: 'ri-node-tree' },
  { id: 'wo-03', nom: 'Trigger Configurator™', mission: 'Configuration des triggers (cron, webhook, event, form submit) avec planification, payload samples et description', statut: 'active', triggers_configures: 4, precision: 98.5, icon: 'ri-flashlight-line' },
  { id: 'wo-04', nom: 'Data Flow Mapper™', mission: 'Cartographie des entrées/sorties de chaque nœud — types, formats, sources, destinations, validations', statut: 'active', flux_cartographies: 28, precision: 97.1, icon: 'ri-git-branch-line' },
  { id: 'wo-05', nom: 'Error Resilience Designer™', mission: 'Conception des stratégies de gestion d\'erreurs — détection, recovery, retry, fallback, alerting pour chaque nœud critique', statut: 'active', strategies_conçues: 14, precision: 93.5, icon: 'ri-shield-flash-line' },
  { id: 'wo-06', nom: 'Automation Scorer™', mission: 'Évaluation du score d\'automatisation (0-100) avec benchmark sectoriel et recommandations d\'amélioration', statut: 'active', scores_calcules: 4, precision: 96.0, icon: 'ri-bar-chart-2-line' },
];

export const ORCHESTRATOR_KPIS = {
  workflows_generes: 4,
  autorites_couvertes: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC Instruction 008-2026', 'GABAC Règlement 01/2026'],
  secteurs: ['Banque', 'Banque', 'Banque', 'EMF'],
  etapes_moyennes_par_workflow: 8.5,
  nodes_total: 39,
  score_automatisation_moyen: 89,
  temps_generation_moyen_ms: 1502,
  agents_actifs: 6,
  mode: 'MOCK — Démo Interactive (n8n-ready JSON)',
  n8n_compatibility: 'v1.0+ (import direct JSON)',
};



