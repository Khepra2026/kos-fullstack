export const aiFraudDetection = {
  engine_status: 'ACTIVE — 24/7 Real-Time Monitoring',
  version: 'v3.2.1 — KOS FraudShield™',
  last_model_update: '2026-06-18T08:00:00Z',
  total_transactions_monitored: 1487230,
  alerts_generated_30d: 127,
  confirmed_frauds_30d: 4,
  false_positive_rate: 3.1,
  mean_time_to_detect: '4.7 secondes',
  mean_time_to_respond: '2.3 minutes',
  algorithms: [
    { id: 'algo-1', name: 'KOS AnomalyNet™ — Deep Autoencoder', type: 'Non-Supervisé', description: 'Réseau neuronal profond à 7 couches entraîné sur 18 mois de transactions normales. Détecte les déviations comportementales sans étiquetage préalable.', precision: 94.2, recall: 91.8, f1_score: 93.0, latency_ms: 380, status: 'production' },
    { id: 'algo-2', name: 'KOS GraphFraud™ — Graph Neural Network', type: 'Semi-Supervisé', description: 'GNN analysant les relations transactionnelles en graphe. Détection de réseaux de fraude organisée, collusion, blanchiment par structuration (smurfing).', precision: 96.7, recall: 94.3, f1_score: 95.5, latency_ms: 620, status: 'production' },
    { id: 'algo-3', name: 'KOS RuleEngine™ — Moteur de Règles Expert', type: 'Déterministe', description: '217 règles métier alignées GAFI/BCEAO/COBAC : seuils transactionnels, patterns LBC/FT, listes de sanctions (ONU, OFAC, UE, UA), PPE screening.', precision: 99.1, recall: 88.2, f1_score: 93.3, latency_ms: 45, status: 'production' },
    { id: 'algo-4', name: 'KOS BehavioRisk™ — Behavioral Scoring', type: 'Supervisé', description: 'XGBoost sur 142 features comportementales. Score de risque temps réel par utilisateur/entité. Réentraînement hebdomadaire sur données fraîches.', precision: 92.8, recall: 89.5, f1_score: 91.1, latency_ms: 120, status: 'production' },
    { id: 'algo-5', name: 'KOS NLPFraud™ — NLP Documentaire', type: 'Supervisé', description: 'Analyse NLP des justificatifs, contrats, factures. Détection d\'anomalies documentaires, incohérences textuelles, faux documents.', precision: 88.5, recall: 82.1, f1_score: 85.2, latency_ms: 850, status: 'staging' }
  ],
  fraud_categories: [
    { id: 'cat-1', nom: 'Fraude Documentaire', incidents_30j: 2, volume_estime: '45M FCFA', patterns: ['Fausses factures', 'Documents falsifiés', 'Doubles emplois'], statut: 'sous_surveillance' },
    { id: 'cat-2', nom: 'Blanchiment — Structuration', incidents_30j: 1, volume_estime: '120M FCFA', patterns: ['Dépôts fractionnés < seuil', 'Schéma en éventail', 'Virements transfrontaliers suspects'], statut: 'alerte_elevee' },
    { id: 'cat-3', nom: 'Fraude Interne', incidents_30j: 1, volume_estime: '28M FCFA', patterns: ['Conflit d\'intérêts', 'Contournement des seuils d\'approbation', 'Modifications non autorisées'], statut: 'sous_surveillance' },
    { id: 'cat-4', nom: 'Fraude Cyber — Phishing/Spoofing', incidents_30j: 0, volume_estime: '0 FCFA', patterns: ['Tentatives bloquées par WAF', 'Alertes préventives'], statut: 'maitrise' },
    { id: 'cat-5', nom: 'Fraude au Crédit', incidents_30j: 0, volume_estime: '0 FCFA', patterns: ['Dossiers de prêt suspects', 'Incohérences déclaratives'], statut: 'maitrise' }
  ],
  recent_alerts: [
    { alert_id: 'FRD-2026-06-19-014', timestamp: '2026-06-19T15:42:18Z', score_risque: 96, categorie: 'Blanchiment — Structuration', description: '12 dépôts fractionnés (1.8M FCFA chacun) sur 72h — même origine, 8 bénéficiaires différents.', action: 'Blocage automatique + notification CENTIF', statut: 'investigation', analyste: 'Cdt. Amara Diop' },
    { alert_id: 'FRD-2026-06-19-012', timestamp: '2026-06-19T11:15:42Z', score_risque: 88, categorie: 'Fraude Documentaire', description: '3 factures fournisseur avec incohérences SIRET/NINE/RCCM détectées par NLPFraud™.', action: 'Suspension paiement + vérification humaine', statut: 'resolu', analyste: 'Fatou Badiane' },
    { alert_id: 'FRD-2026-06-18-009', timestamp: '2026-06-18T21:03:05Z', score_risque: 94, categorie: 'Fraude Interne', description: 'Tentative de modification non autorisée des seuils d\'approbation — détectée par AnomalyNet™.', action: 'Blocage session + escalation RSSI', statut: 'investigation', analyste: 'Cdt. Amara Diop' },
    { alert_id: 'FRD-2026-06-18-008', timestamp: '2026-06-18T16:30:00Z', score_risque: 74, categorie: 'Fraude au Crédit', description: 'Dossier crédit PME — déclarations bilancielles incohérentes avec données fiscales.', action: 'Suspension instruction + due diligence renforcée', statut: 'resolu', analyste: 'Fatou Badiane' }
  ]
};

export const iso27001SOC2Compliance = {
  iso27001: {
    version: 'ISO 27001:2022',
    readiness_score: 78,
    certification_target: '2027-06-30',
    controls_total: 114,
    controls_conformes: 89,
    controls_partiels: 18,
    controls_non_conformes: 7,
    annex_a_mapping: {
      'A.5 — Politiques Sécurité': { total: 2, conformes: 2, score: 100 },
      'A.6 — Organisation': { total: 2, conformes: 2, score: 100 },
      'A.7 — Personnel': { total: 5, conformes: 4, score: 80 },
      'A.8 — Gestion Actifs': { total: 10, conformes: 7, score: 70 },
      'A.9 — Contrôle Accès': { total: 10, conformes: 9, score: 90 },
      'A.10 — Cryptographie': { total: 2, conformes: 2, score: 100 },
      'A.11 — Sécurité Physique': { total: 15, conformes: 8, score: 53 },
      'A.12 — Sécurité Opérations': { total: 16, conformes: 12, score: 75 },
      'A.13 — Communications': { total: 5, conformes: 5, score: 100 },
      'A.14 — Développement': { total: 13, conformes: 9, score: 69 },
      'A.15 — Fournisseurs': { total: 3, conformes: 2, score: 67 },
      'A.16 — Incidents': { total: 4, conformes: 3, score: 75 },
      'A.17 — Continuité': { total: 4, conformes: 4, score: 100 },
      'A.18 — Conformité': { total: 5, conformes: 4, score: 80 }
    },
    critical_gaps: [
      { gap_id: 'ISO-GAP-001', controle: 'A.11.1.4 — Sécurité physique des bureaux', description: 'Contrôle d\'accès biométrique non déployé sur 3 sites. Badges RFID sans PIN.', severity: 'critique', remediation: 'Déploiement biométrique multisite — budget 8.5M FCFA', deadline: '2026-09-30' },
      { gap_id: 'ISO-GAP-002', controle: 'A.14.2.1 — Politique de développement sécurisé', description: 'SDLC documenté mais non audité depuis 18 mois. Pas de SAST intégré à la CI/CD.', severity: 'elevee', remediation: 'Audit SDLC + intégration SonarQube/Snyk — budget 4.2M FCFA', deadline: '2026-10-31' },
      { gap_id: 'ISO-GAP-003', controle: 'A.15.1.2 — Exigences sécurité fournisseurs', description: '12 fournisseurs SaaS sans clause sécurité contractuelle. 3 sans SOC 2/ISO 27001.', severity: 'elevee', remediation: 'Audit fournisseurs + mise à jour contrats — budget 3.8M FCFA', deadline: '2026-11-15' },
      { gap_id: 'ISO-GAP-004', controle: 'A.7.2.2 — Formation sécurité obligatoire', description: 'Taux de complétion formation sécurité : 76%. Objectif 100%.', severity: 'moyenne', remediation: 'Programme formation obligatoire + suivi LMS — budget 2.1M FCFA', deadline: '2026-12-01' },
      { gap_id: 'ISO-GAP-005', controle: 'A.12.6.1 — Gestion des vulnérabilités techniques', description: 'Scan vulnérabilités mensuel. Cible : continu automatisé. Correctif moyen : 12 jours.', severity: 'elevee', remediation: 'Vulnerability Management continu + SLA correction < 48h — budget 5.5M FCFA', deadline: '2026-10-15' }
    ]
  },
  soc2: {
    type: 'SOC 2 Type II',
    readiness_score: 62,
    certification_target: '2027-12-31',
    trust_services: [
      { criterion: 'Security (CC1-CC9)', score: 78, status: 'partiel', description: 'Contrôles sécurité raisonnables. Gaps : monitoring continu (CC7), gestion changements (CC8).' },
      { criterion: 'Availability (A1-A2)', score: 85, status: 'conforme', description: 'SLA 99.95%. PCA/PRA documenté. Gaps : test PRA semestriel non réalisé.' },
      { criterion: 'Confidentiality (C1-C2)', score: 72, status: 'partiel', description: 'Chiffrement données OK. Classification données incomplète. Suppression sécurisée non standardisée.' },
      { criterion: 'Processing Integrity (PI1-PI2)', score: 68, status: 'partiel', description: 'Validation entrées/sorties OK. Contrôle qualité batch en cours. Monitoring intégrité à renforcer.' },
      { criterion: 'Privacy (P1-P8)', score: 70, status: 'partiel', description: 'Privacy notice OK. Registre traitements partiel. DPO externe nommé. Data subject requests : procédure en cours.' }
    ],
    control_testing: {
      total_controls: 85,
      tested_30d: 42,
      passed: 38,
      failed: 4,
      next_testing_cycle: '2026-07-15',
      deviations: [
        { dev_id: 'SOC-DEV-001', control: 'CC7.2 — Monitoring des anomalies', description: 'Fenêtre de monitoring non couverte : 02h00-04h00 UTC.', severity: 'moyenne', remediation: 'Shift SOC 24/7 complet — déjà en déploiement', deadline: '2026-07-30' },
        { dev_id: 'SOC-DEV-002', control: 'CC8.1 — Gestion des changements', description: '3 déploiements sans revue de sécurité préalable en juin.', severity: 'elevee', remediation: 'Gate de sécurité obligatoire dans CI/CD', deadline: '2026-08-15' }
      ]
    }
  },
  compliance_roadmap: [
    { phase: 'Phase 1 — Diagnostic', period: 'Juillet 2026', actions: ['Gap analysis complet ISO 27001:2022 (114 contrôles)', 'SOC 2 readiness assessment', 'Cartographie exhaustive des actifs', 'Analyse d\'impact DPIA'], deliverables: ['Rapport gap analysis', 'Registre des actifs', 'Matrice des risques résiduels'], budget: '6.2M FCFA' },
    { phase: 'Phase 2 — Remédiation Prioritaire', period: 'Août—Oct 2026', actions: ['Résolution 7 gaps ISO 27001 critiques', 'Déploiement MFA universel', 'SIEM/SOC 24/7', 'Formation sécurité 100%', 'Sécurisation SDLC (SAST/DAST)'], deliverables: ['Preuves de conformité (93 contrôles)', 'Rapports tests pénétration', 'Documentation SMSI'], budget: '24.5M FCFA' },
    { phase: 'Phase 3 — Audit Interne', period: 'Nov—Déc 2026', actions: ['Audit interne ISO 27001 complet', 'SOC 2 Type II — test period (6 mois)', 'Revue indépendante des contrôles', 'Correction des écarts'], deliverables: ['Rapport audit interne', 'Plan d\'actions correctives', 'Dossier de certification préliminaire'], budget: '8.8M FCFA' },
    { phase: 'Phase 4 — Certification', period: 'Jan—Juin 2027', actions: ['Audit de certification ISO 27001 (organisme accrédité)', 'Audit SOC 2 Type II (firme Big Four)', 'Correction des non-conformités', 'Obtention des certificats'], deliverables: ['Certificat ISO 27001:2022', 'Rapport SOC 2 Type II', 'Plan de surveillance continue'], budget: '18.5M FCFA' }
  ]
};

export const blockchainTraceability = {
  architecture: 'KOS TrustChain™ — Blockchain Hybride (Hyperledger Fabric + Ethereum L2)',
  status: 'Phase Pilote — Déploiement Progressif',
  components: [
    { id: 'bc-1', name: 'Audit Ledger Immutable', chain: 'Hyperledger Fabric (Permissioned)', description: 'Journal infalsifiable des opérations critiques : connexions admin, modifications RLS, déploiements edge functions, accès données sensibles. Hachage SHA3-512 + signature EdDSA.', tps: 3500, nodes: 5, status: 'production' },
    { id: 'bc-2', name: 'Smart Contracts — Conformité Automatique', chain: 'Hyperledger Fabric', description: '34 smart contracts auto-exécutants : validation règles LBC/FT, vérification listes sanctions, contrôle seuils prudentiels, déclenchement alertes. Exécution déterministe et traçable.', tps: 1200, nodes: 5, status: 'production' },
    { id: 'bc-3', name: 'Regulatory Proof Vault™', chain: 'Ethereum L2 (Polygon zkEVM)', description: 'Preuves cryptographiques de conformité ancrées sur Ethereum L2. ZK-Proofs pour démontrer conformité sans révéler données sensibles. Vérifiable publiquement par les régulateurs.', tps: 200, nodes: 3, status: 'staging' },
    { id: 'bc-4', name: 'Asset Tokenization Tracker', chain: 'Ethereum L2 (Polygon zkEVM)', description: 'Traçabilité des actifs tokenisés et instruments financiers structurés. Historique complet on-chain : émission, transferts, détenteurs, événements corporate.', tps: 150, nodes: 3, status: 'development' }
  ],
  smart_contracts_deployed: 34,
  total_transactions_on_chain: 1247560,
  average_block_time_ms: 420,
  data_privacy_mechanism: 'ZK-SNARKs + Canaux privés Hyperledger + Chiffrement homomorphe partiel',
  regulatory_nodes: [
    { regulator: 'BCEAO — Commission Bancaire UMOA', node_type: 'Full Validator', access_level: 'Audit Read-Only', status: 'planned', deployment_date: '2026-09-01' },
    { regulator: 'COBAC — BEAC', node_type: 'Full Validator', access_level: 'Audit Read-Only', status: 'planned', deployment_date: '2026-10-01' },
    { regulator: 'CENTIF (Sénégal)', node_type: 'Light Node', access_level: 'Alertes LBC/FT', status: 'planned', deployment_date: '2026-11-01' }
  ]
};

export const correctivePlan = {
  score_global_actuel: 67,
  score_cible_12mois: 96,
  modules: [
    {
      id: 'mod-1', titre: 'Module P0 — Détection Fraude IA Temps Réel', priorite: 'P0 — Critique', score_actuel: 55, score_cible: 95,
      description: 'Déploiement complet des 5 algorithmes KOS FraudShield™ en production. Intégration SIEM/SOC. Automatisation blocage transactions suspectes. Connecteurs API régulateurs (CENTIF/ANIF).',
      actions: [
        { action_id: 'M1-A1', action: 'Passage NLPFraud™ en production', responsable: 'Lead Data Scientist', budget: '4.8M FCFA', delai: '2026-07-31', kpi: 'Précision NLPFraud > 92%' },
        { action_id: 'M1-A2', action: 'Intégration SIEM — Correlation Engine', responsable: 'RSSI', budget: '6.2M FCFA', delai: '2026-08-31', kpi: 'MTTD < 60 secondes' },
        { action_id: 'M1-A3', action: 'API CENTIF/ANIF — Déclaration automatique', responsable: 'Compliance Officer', budget: '3.5M FCFA', delai: '2026-09-30', kpi: 'Délai déclaration < 15min' },
        { action_id: 'M1-A4', action: 'Behavioural Biometrics — Intégration', responsable: 'Lead Data Scientist', budget: '5.5M FCFA', delai: '2026-10-31', kpi: 'False Positive Rate < 1.5%' }
      ]
    },
    {
      id: 'mod-2', titre: 'Module P0 — Certification ISO 27001:2022', priorite: 'P0 — Critique', score_actuel: 78, score_cible: 100,
      description: 'Résolution des 7 gaps critiques ISO 27001. Déploiement SMSI complet. Audit interne puis certification par organisme accrédité (AFNOR/Bureau Veritas).',
      actions: [
        { action_id: 'M2-A1', action: 'Résolution 7 gaps critiques', responsable: 'RSSI + DAF', budget: '24.5M FCFA (total 4 phases)', delai: '2026-10-31', kpi: 'ISO 27001: 114/114 contrôles conformes' },
        { action_id: 'M2-A2', action: 'Audit interne complet', responsable: 'Quality Office', budget: '3.5M FCFA', delai: '2026-11-30', kpi: 'Rapport audit interne — zéro non-conformité majeure' },
        { action_id: 'M2-A3', action: 'Audit de certification externe', responsable: 'Managing Partner', budget: '8.5M FCFA', delai: '2027-03-31', kpi: 'Certificat ISO 27001:2022 obtenu' }
      ]
    },
    {
      id: 'mod-3', titre: 'Module P1 — Certificat SOC 2 Type II', priorite: 'P1 — Haute', score_actuel: 62, score_cible: 95,
      description: 'Préparation et obtention certification SOC 2 Type II. Période de test 6 mois. Revue indépendante des 5 Trust Services Criteria par firme Big Four.',
      actions: [
        { action_id: 'M3-A1', action: 'SOC 2 readiness — Remediation gaps', responsable: 'Compliance Officer', budget: '6.8M FCFA', delai: '2026-12-31', kpi: 'SOC 2 readiness > 90%' },
        { action_id: 'M3-A2', action: 'Test period 6 mois — monitoring continu', responsable: 'RSSI', budget: '4.5M FCFA', delai: '2027-06-30', kpi: 'Evidence collection automatisée' },
        { action_id: 'M3-A3', action: 'Audit SOC 2 Type II — Big Four Firm', responsable: 'Managing Partner', budget: '12.5M FCFA', delai: '2027-09-30', kpi: 'Rapport SOC 2 Type II — opinion favorable' }
      ]
    },
    {
      id: 'mod-4', titre: 'Module P1 — Blockchain TrustChain™ Full Deployment', priorite: 'P1 — Haute', score_actuel: 40, score_cible: 90,
      description: 'Déploiement complet des 4 composants TrustChain™. Intégration nœuds régulateurs (BCEAO, COBAC, CENTIF). Généralisation ZK-Proofs pour preuves de conformité.',
      actions: [
        { action_id: 'M4-A1', action: 'Regulatory Proof Vault™ en production', responsable: 'Blockchain Architect', budget: '7.5M FCFA', delai: '2026-09-30', kpi: 'ZK-Proof generation < 5 secondes' },
        { action_id: 'M4-A2', action: 'Déploiement nœuds régulateurs', responsable: 'Compliance Officer', budget: '4.2M FCFA', delai: '2026-11-30', kpi: '3 nœuds régulateurs opérationnels' },
        { action_id: 'M4-A3', action: 'Smart Contracts — Batch 2 (18 contrats)', responsable: 'Blockchain Architect', budget: '5.8M FCFA', delai: '2026-12-31', kpi: '52 smart contracts — full coverage' }
      ]
    },
    {
      id: 'mod-5', titre: 'Module P2 — Interactive Reporting Dashboard', priorite: 'P2 — Moyenne', score_actuel: 70, score_cible: 95,
      description: 'Tableau de bord exécutif unifié : fraude, conformité ISO/SOC, blockchain. Reporting régulateur automatisé. Drill-down interactif jusqu\'à la transaction unitaire.',
      actions: [
        { action_id: 'M5-A1', action: 'Unified Executive Dashboard', responsable: 'Lead Developer', budget: '3.2M FCFA', delai: '2026-08-31', kpi: 'Dashboard temps réel < 500ms' },
        { action_id: 'M5-A2', action: 'Automated Regulatory Reports', responsable: 'Compliance Officer', budget: '2.8M FCFA', delai: '2026-10-31', kpi: 'Rapports BCEAO/COBAC/CENTIF auto-générés' }
      ]
    }
  ],
  budget_total_12mois: '95.8M FCFA',
  roi_projete: 'Évitement fraude estimé 450M FCFA/an + Certification ouvre marchés régulés (potentiel CA additionnel 2.5 Md FCFA)'
};

export const quarterlyKPIs = {
  trimestres: [
    {
      trimestre: 'Q3 2026 (Juil—Sep)',
      objectif_principal: 'Fondations : Fraude IA + ISO 27001 gaps',
      kpis: [
        { kpi: 'Score Global IA Compliance & Fraud', valeur: '67 → 78', cible: 78, icone: 'ri-speed-line' },
        { kpi: 'Algorithmes FraudShield en production', valeur: '4/5 → 5/5', cible: '5/5', icone: 'ri-shield-check-line' },
        { kpi: 'ISO 27001 Readiness', valeur: '78% → 88%', cible: '88%', icone: 'ri-file-check-line' },
        { kpi: 'SOC 2 Readiness', valeur: '62% → 72%', cible: '72%', icone: 'ri-award-line' },
        { kpi: 'MTTD (Mean Time To Detect)', valeur: '4.7s → 1.2s', cible: '< 2s', icone: 'ri-timer-line' },
        { kpi: 'False Positive Rate', valeur: '3.1% → 1.8%', cible: '< 2%', icone: 'ri-error-warning-line' },
        { kpi: 'Gaps ISO 27001 critiques résolus', valeur: '0/7 → 5/7', cible: '5/7', icone: 'ri-tools-line' },
        { kpi: 'TrustChain Components en production', valeur: '2/4 → 3/4', cible: '3/4', icone: 'ri-link' },
        { kpi: 'Smart Contracts déployés', valeur: '34 → 42', cible: 42, icone: 'ri-file-code-line' },
        { kpi: 'Reporting Dashboard — Phase 1', valeur: 'Lancé', cible: 'Opérationnel', icone: 'ri-dashboard-line' }
      ],
      livrables: ['FraudShield™ v4.0 en production', '5/7 gaps ISO 27001 résolus', 'Regulatory Proof Vault™ en staging', 'Dashboard v1 live'],
      budget: '32.5M FCFA'
    },
    {
      trimestre: 'Q4 2026 (Oct—Déc)',
      objectif_principal: 'Consolidation : ISO 27001 prêt certification + SOC 2 test period',
      kpis: [
        { kpi: 'Score Global IA Compliance & Fraud', valeur: '78 → 86', cible: 86, icone: 'ri-speed-line' },
        { kpi: 'ISO 27001 Readiness', valeur: '88% → 98%', cible: '98%', icone: 'ri-file-check-line' },
        { kpi: 'SOC 2 Readiness', valeur: '72% → 85%', cible: '85%', icone: 'ri-award-line' },
        { kpi: 'Audit interne ISO 27001', valeur: 'Complété', cible: 'Zéro non-conformité majeure', icone: 'ri-search-eye-line' },
        { kpi: 'MTTR (Mean Time To Respond)', valeur: '2.3min → 45s', cible: '< 60s', icone: 'ri-speed-line' },
        { kpi: 'Nœuds régulateurs TrustChain', valeur: '0/3 → 2/3', cible: '2/3', icone: 'ri-node-tree' },
        { kpi: 'Smart Contracts totaux', valeur: '42 → 52', cible: 52, icone: 'ri-file-code-line' },
        { kpi: 'Rapports régulateurs automatisés', valeur: '0 → 3 types', cible: '3 types', icone: 'ri-file-text-line' },
        { kpi: 'SOC 2 Test Period', valeur: 'Démarré', cible: '3 mois complétés', icone: 'ri-calendar-check-line' }
      ],
      livrables: ['Dossier certification ISO 27001 prêt', 'SOC 2 test period — mois 1-3', 'TrustChain nœuds BCEAO + COBAC', '52 smart contracts déployés'],
      budget: '28.6M FCFA'
    },
    {
      trimestre: 'Q1 2027 (Jan—Mar)',
      objectif_principal: 'Certification ISO 27001 + Blockchain complète',
      kpis: [
        { kpi: 'Score Global IA Compliance & Fraud', valeur: '86 → 92', cible: 92, icone: 'ri-speed-line' },
        { kpi: 'Certification ISO 27001:2022', valeur: 'En cours', cible: 'OBTENUE', icone: 'ri-verified-badge-line' },
        { kpi: 'SOC 2 Readiness', valeur: '85% → 92%', cible: '92%', icone: 'ri-award-line' },
        { kpi: 'SOC 2 Test Period', valeur: '4-6 mois', cible: '6 mois complétés', icone: 'ri-calendar-check-line' },
        { kpi: 'TrustChain composants production', valeur: '3/4 → 4/4', cible: '4/4', icone: 'ri-link' },
        { kpi: 'Nœuds régulateurs', valeur: '2/3 → 3/3', cible: '3/3', icone: 'ri-node-tree' },
        { kpi: 'ZK-Proofs livrées', valeur: '12 → 30', cible: 30, icone: 'ri-lock-line' },
        { kpi: 'Fraude détectée — volume évité', valeur: '120M → 200M', cible: '200M FCFA', icone: 'ri-money-dollar-circle-line' },
        { kpi: 'Sessions formation sécurité complétées', valeur: '76% → 98%', cible: '> 95%', icone: 'ri-graduation-cap-line' }
      ],
      livrables: ['Certificat ISO 27001:2022', 'TrustChain full deployment', 'SOC 2 test period complété', '30 ZK-Proofs'],
      budget: '22.7M FCFA'
    },
    {
      trimestre: 'Q2 2027 (Avr—Juin)',
      objectif_principal: 'Certification SOC 2 + Excellence Opérationnelle',
      kpis: [
        { kpi: 'Score Global IA Compliance & Fraud', valeur: '92 → 96', cible: 96, icone: 'ri-speed-line' },
        { kpi: 'Certification SOC 2 Type II', valeur: 'En cours', cible: 'OBTENUE', icone: 'ri-verified-badge-line' },
        { kpi: 'MTTD', valeur: '< 1s', cible: '< 1s', icone: 'ri-timer-line' },
        { kpi: 'False Positive Rate', valeur: '< 1%', cible: '< 1%', icone: 'ri-error-warning-line' },
        { kpi: 'Fraude détectée — cumul annuel évité', valeur: '320M', cible: '450M FCFA', icone: 'ri-money-dollar-circle-line' },
        { kpi: 'Taux complétion formation sécurité', valeur: '100%', cible: '100%', icone: 'ri-graduation-cap-line' },
        { kpi: 'Rapports régulateurs automatisés', valeur: '6 types', cible: '6 types', icone: 'ri-file-text-line' },
        { kpi: 'Smart Contracts actifs', valeur: 52, cible: '52 — stable', icone: 'ri-file-code-line' },
        { kpi: 'ZK-Proofs livrées', valeur: '30 → 45', cible: 45, icone: 'ri-lock-line' }
      ],
      livrables: ['Rapport SOC 2 Type II — opinion favorable', 'Dashboard exécutif v2', 'Programme formation sécurité 100%', '45 ZK-Proofs'],
      budget: '12.0M FCFA'
    }
  ]
};

export const riskMatrix = [
  { id: 'RM-01', risque: 'Faux négatifs — Fraude non détectée', probabilite: 35, impact: 95, score: 33, mitigation: 'Ensemble modeling 5 algorithmes + review humaine', statut: 'sous_surveillance' },
  { id: 'RM-02', risque: 'Non-obtention certification ISO 27001', probabilite: 20, impact: 90, score: 18, mitigation: 'Audit interne préalable + correction proactive', statut: 'maitrise' },
  { id: 'RM-03', risque: 'Échec audit SOC 2 Type II', probabilite: 30, impact: 85, score: 26, mitigation: 'Test period 6 mois + revue Big Four intermédiaire', statut: 'sous_surveillance' },
  { id: 'RM-04', risque: 'Attaque cyber sur infrastructure blockchain', probabilite: 25, impact: 90, score: 23, mitigation: 'Architecture hybride + ZK-Proofs + pentest annuel', statut: 'maitrise' },
  { id: 'RM-05', risque: 'Non-conformité réglementaire blockchain', probabilite: 15, impact: 80, score: 12, mitigation: 'Nœuds régulateurs + sandbox BCEAO/COBAC', statut: 'maitrise' },
  { id: 'RM-06', risque: 'Fuite données sensibles via preuves on-chain', probabilite: 10, impact: 95, score: 10, mitigation: 'ZK-Proofs + chiffrement homomorphe', statut: 'maitrise' },
  { id: 'RM-07', risque: 'Résistance régulateurs à la blockchain', probabilite: 40, impact: 60, score: 24, mitigation: 'Nœuds régulateurs en lecture seule + formation', statut: 'sous_surveillance' },
  { id: 'RM-08', risque: 'Budget insuffisant — retard programme', probabilite: 35, impact: 70, score: 25, mitigation: 'Phasage priorisé P0 → P1 → P2 + revue trimestrielle', statut: 'sous_surveillance' }
];

export const executiveSummary = {
  titre: 'KOS Big Four AI Compliance & Fraud Intelligence™',
  mandat: 'Audit IA, Conformité ISO 27001/SOC 2, Traçabilité Blockchain — Big Four (PwC · Deloitte · EY · KPMG)',
  score_global: 67,
  score_cible: 96,
  delai_certification: '12 mois (Juin 2026 — Juin 2027)',
  budget_total: '95.8M FCFA',
  constats_cles: [
    'KOS dispose déjà de 4/5 algorithmes de détection fraude en production — precision 94.2%, rappel 91.8%. Le gap principal est l\'intégration SIEM et l\'automatisation des déclarations régulateurs.',
    'ISO 27001:2022 readiness à 78% (89/114 contrôles). 7 gaps critiques à résoudre. Certification ciblée Q1 2027.',
    'SOC 2 Type II readiness à 62%. Période de test 6 mois nécessaire. Certification ciblée Q2 2027.',
    'Blockchain TrustChain™ : 2 composants en production, 2 en développement. Architecture hybride Hyperledger Fabric + Ethereum L2 avec ZK-Proofs pour conformité confidentielle.',
    'ROI projeté : 450M FCFA/an évités en fraude + ouverture marchés régulés via certifications (CA potentiel +2.5 Md FCFA).'
  ],
  recommandations_immediates: [
    'Déploiement SIEM/SOC 24/7 — priorité absolue (Module P0)',
    'Résolution des 7 gaps ISO 27001 — engager budget 24.5M FCFA',
    'Lancement SOC 2 test period 6 mois — Q3 2026',
    'Validation réglementaire nœuds BCEAO/COBAC — Q3 2026',
    'Recrutement Blockchain Architect confirmé — Q3 2026'
  ]
};



