export interface AuditJournalEntry {
  entry_id: string;
  timestamp: string;
  event_type: 'prompt_ia' | 'reponse_ia' | 'decision_humaine' | 'correction_auto' | 'validation_qualite' | 'execution_bloc' | 'alerte_securite' | 'modification_donnees';
  source_system: string;
  agent_id?: string;
  user_id?: string;
  description: string;
  details: string;
  severity: 'info' | 'warning' | 'critical' | 'blocker';
  status: 'logged' | 'reviewed' | 'escalated' | 'resolved';
  hash_verification: string;
  raci_role: 'R' | 'A' | 'C' | 'I';
}

export interface RACIMatrixEntry {
  activity_id: string;
  activity_name: string;
  category: 'gouvernance' | 'qualite' | 'securite' | 'ia' | 'donnees' | 'operations' | 'conformite';
  description: string;
  responsible: string;
  accountable: string;
  consulted: string[];
  informed: string[];
  frequency: string;
  evidence_type: string;
}

export interface AuditTrailLink {
  link_id: string;
  source_entry: string;
  target_entry: string;
  relationship: 'triggered_by' | 'validates' | 'corrected_by' | 'escalated_to' | 'depends_on';
  description: string;
}

export interface ComplianceCheckpoint {
  checkpoint_id: string;
  checkpoint_name: string;
  standard_ref: string;
  requirement: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  evidence: string;
  last_audit: string;
  next_audit: string;
  score: number;
}

export interface KOSAuditLedger {
  bloc_id: string;
  bloc_name: string;
  version: string;
  executive_summary: string;
  current_maturity: number;
  target_maturity: number;
  certification_target: string;
  standards: string[];
  total_entries: number;
  entries_last_30_days: number;
  entries_by_type: { type: string; count: number; icon: string }[];
  avg_severity: number;
  unresolved_critical: number;
  raci_categories: number;
  compliance_checkpoints: number;
  compliant_pct: number;
  journal_entries: AuditJournalEntry[];
  raci_matrix: RACIMatrixEntry[];
  audit_trail_links: AuditTrailLink[];
  compliance_checkpoints_list: ComplianceCheckpoint[];
}

export const KOS_AUDIT_LEDGER: KOSAuditLedger = {
  bloc_id: 'BLOC-003',
  bloc_name: 'KOS Audit Ledger™',
  version: 'v1.0',
  executive_summary: 'Système de traçabilité totale du KOS Enterprise Intelligence OS™. Journalisation exhaustive de tous les prompts IA, réponses, décisions, validations humaines, corrections automatiques et actions sensibles. Matrice RACI complète couvrant 7 domaines de gouvernance. Piste d\'audit infalsifiable avec 18 tables de logs interconnectées. Conforme ISO 27001, COSO, COBIT, NIST, SOC 2 et EU AI Act.',
  current_maturity: 95,
  target_maturity: 95,
  certification_target: 'ISO 27001 (A.12.4) + COSO ERM + COBIT 2019 (MEA02) + NIST CSF 2.0 + SOC 2 Type II + EU AI Act Art.12',
  standards: ['ISO 27001:2022', 'COSO ERM 2017', 'COBIT 2019', 'NIST CSF 2.0', 'SOC 2 Type II', 'EU AI Act', 'RGPD Art.30', 'ISO 42001'],
  total_entries: 24580,
  entries_last_30_days: 3842,
  entries_by_type: [
    { type: 'Prompts IA', count: 8420, icon: 'ri-robot-2-line' },
    { type: 'Réponses IA', count: 8420, icon: 'ri-chat-3-line' },
    { type: 'Décisions Humaines', count: 1850, icon: 'ri-user-star-line' },
    { type: 'Corrections Auto', count: 3120, icon: 'ri-tools-line' },
    { type: 'Validations Qualité', count: 1450, icon: 'ri-shield-check-line' },
    { type: 'Exécutions Blocs', count: 980, icon: 'ri-play-circle-line' },
    { type: 'Alertes Sécurité', count: 240, icon: 'ri-alert-line' },
    { type: 'Modifications Données', count: 100, icon: 'ri-database-2-line' },
  ],
  avg_severity: 1.8,
  unresolved_critical: 0,
  raci_categories: 16,
  compliance_checkpoints: 12,
  compliant_pct: 100,
  journal_entries: [
    { entry_id: 'AUD-2026-06-16-001', timestamp: '2026-06-16T08:42:15Z', event_type: 'prompt_ia', source_system: 'KOS Strategic Reasoning Engine', agent_id: 'AG-042', description: 'Prompt : Analyse du risque réglementaire BCEAO Circulaire 03-2017 pour la banque cliente BGFI', details: 'Prompt envoyé au Strategic Reasoning Engine pour analyse multi-angle (conformité, gouvernance, risque). Paramètres : profondeur=4, agents=4, validation=auto.', severity: 'info', status: 'logged', hash_verification: 'SHA256-a3f8c9d1e2b4', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-16-002', timestamp: '2026-06-16T08:43:02Z', event_type: 'reponse_ia', source_system: 'KOS Strategic Reasoning Engine', agent_id: 'AG-042', description: 'Réponse IA : Analyse BCEAO Circulaire 03-2017 — 12 risques identifiés, 5 non-conformités', details: 'Réponse multi-agent générée en 47 secondes. 4 agents contributeurs : AG-042 (lead), AG-018 (réglementaire), AG-055 (risque), AG-012 (gouvernance). Score de confiance : 94/100. 2 hallucinations potentielles détectées et filtrées par Hallucination Detection Engine.', severity: 'info', status: 'logged', hash_verification: 'SHA256-b9c4e7f2a1d3', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-16-003', timestamp: '2026-06-16T08:45:30Z', event_type: 'validation_qualite', source_system: 'KOS Quality Controller', agent_id: 'AG-099', description: 'Validation qualité : Score 96/100 — Publication autorisée', details: 'Quality Controller a validé la réponse. Score 5 axes : Exactitude Réglementaire (98%), Conformité (95%), Valeur Client (96%), Réutilisabilité (94%), Innovation (93%). Seuil de publication 95/100 franchi. Aucune hallucination résiduelle.', severity: 'info', status: 'logged', hash_verification: 'SHA256-c7d1e5f8a2b9', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-16-004', timestamp: '2026-06-16T08:47:12Z', event_type: 'decision_humaine', source_system: 'KOS Managing Partner Office', user_id: 'USR-001', description: 'Décision : Approbation de la proposition stratégique BGFI v3.2', details: 'Le Managing Partner a validé la proposition après revue. Décision enregistrée avec signature électronique. Niveau d\'approbation : Niveau 4 (Stratégique). Conformité validée par le Virtual Board.', severity: 'info', status: 'logged', hash_verification: 'SHA256-d4e8f2a7b1c6', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-16-005', timestamp: '2026-06-16T09:15:44Z', event_type: 'execution_bloc', source_system: 'KOS Global Agent Performance', agent_id: 'AG-088', description: 'Exécution Bloc CORR-012 : Correction de 8 agents du domaine SEO', details: 'Bloc correctif exécuté en 2.3 secondes. 8 agents mis à jour. 3 corrective_actions fixées. Health Score moyen passé de 72 à 89. Statut bloc : completed.', severity: 'info', status: 'logged', hash_verification: 'SHA256-e5f9a3c8d2b7', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-15-018', timestamp: '2026-06-15T14:22:33Z', event_type: 'correction_auto', source_system: 'KOS Correction Engine', agent_id: 'AG-077', description: 'Correction automatique : Fix de 12 liens cassés sur le blog BCEAO', details: 'Correction Engine a détecté 12 liens 404 sur /blog/bceao-ohada-conformite. Correction automatique appliquée : 8 redirections 301, 4 mises à jour de liens. Avant/Après vérifié : 0 liens cassés résiduels.', severity: 'info', status: 'logged', hash_verification: 'SHA256-f6a1b4d9e3c8', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-15-022', timestamp: '2026-06-15T16:08:51Z', event_type: 'alerte_securite', source_system: 'KOS Security Command', agent_id: 'AG-033', description: 'Alerte sécurité : Tentative d\'accès non autorisé à la table leads (IP 192.168.x.x)', details: 'Security Scan a détecté 3 tentatives d\'accès non autorisé à la table leads depuis une IP non reconnue. Blocage automatique déclenché. IP ajoutée à la blacklist. Notification envoyée au Security Officer.', severity: 'critical', status: 'escalated', hash_verification: 'SHA256-a7c2e5f8d1b4', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-15-025', timestamp: '2026-06-15T17:45:10Z', event_type: 'modification_donnees', source_system: 'KOS Enterprise Data Hub', user_id: 'USR-003', description: 'Modification données : Mise à jour du scoring lead L-089 (Premium → Enterprise)', details: 'Data Architect a modifié le scoring du lead L-089 après validation du pipeline commercial. Ancien score : 78 (Premium), Nouveau score : 92 (Enterprise). Modification tracée avec justification.', severity: 'warning', status: 'reviewed', hash_verification: 'SHA256-b8d3f6a1e2c5', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-14-042', timestamp: '2026-06-14T11:30:22Z', event_type: 'prompt_ia', source_system: 'KOS Due Diligence Engine', agent_id: 'AG-019', description: 'Prompt : Due Diligence complète — Acquisition FinTech Sénégal', details: 'Prompt multi-phase envoyé au Due Diligence Engine. 6 dimensions : financière, juridique, réglementaire, fiscale, RH, ESG. Profondeur=5, agents=6, validation=multi-niveau.', severity: 'info', status: 'logged', hash_verification: 'SHA256-c9e4f7b2a3d6', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-14-043', timestamp: '2026-06-14T11:34:58Z', event_type: 'reponse_ia', source_system: 'KOS Due Diligence Engine', agent_id: 'AG-019', description: 'Réponse IA : Rapport Due Diligence 98 pages — 28 risques, 15 recommandations', details: 'Rapport généré en 4 minutes 36 secondes par 6 agents. Score de confiance global : 91/100. 4 risques critiques identifiés (conformité BCEAO, fiscaux, gouvernance, cybersécurité). 15 recommandations classées par priorité.', severity: 'warning', status: 'logged', hash_verification: 'SHA256-d1f5a8c3b6e9', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-14-044', timestamp: '2026-06-14T11:38:15Z', event_type: 'decision_humaine', source_system: 'KOS Engagement Risk Office', user_id: 'USR-002', description: 'Décision : GO conditionnel — Acquisition FinTech Sénégal (sous réserve 4 prérequis)', details: 'Engagement Risk Office a émis un GO conditionnel. 4 prérequis avant signature : audit cybersécurité externe, vérification conformité BCEAO, due diligence fiscale complémentaire, garantie bancaire. Délai : 15 jours.', severity: 'warning', status: 'logged', hash_verification: 'SHA256-e2f6b9c4d7a1', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-13-031', timestamp: '2026-06-13T10:05:40Z', event_type: 'execution_bloc', source_system: 'KOS Global Agent Performance', agent_id: 'AG-088', description: 'Exécution Bloc CORR-008 : Correction agents Compliance — Échec partiel', details: 'Bloc exécuté mais 2 agents sur 12 ont échoué (AG-045, AG-067). Erreur : corrective_actions non trouvées dans le JSONB. Bloc marqué failed. Ticket d\'escalade créé : TKT-2026-0892.', severity: 'critical', status: 'escalated', hash_verification: 'SHA256-f3a7c1d5e8b2', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-13-035', timestamp: '2026-06-13T14:22:08Z', event_type: 'correction_auto', source_system: 'KOS Digital Growth Correction Engine', agent_id: 'AG-066', description: 'Correction automatique : Optimisation Core Web Vitals — 14 pages', details: 'Digital Growth Correction Engine a optimisé les CWV de 14 pages. LCP moyen : 4.2s → 2.1s. CLS : 0.15 → 0.02. FID : 85ms → 28ms. Score Lighthouse moyen : 62 → 91.', severity: 'info', status: 'logged', hash_verification: 'SHA256-a4b8d2e6f1c3', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-12-019', timestamp: '2026-06-12T09:18:33Z', event_type: 'alerte_securite', source_system: 'KOS Security Command', agent_id: 'AG-033', description: 'Alerte sécurité : Certificat SSL expirant dans 7 jours (kos.khepra.expert)', details: 'Security Command a détecté l\'expiration imminente du certificat SSL du domaine kos.khepra.expert. Alerte de niveau warning. Renouvellement automatique programmé. Vérification effectuée.', severity: 'warning', status: 'resolved', hash_verification: 'SHA256-b5c9e3f7a2d4', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-11-008', timestamp: '2026-06-11T15:42:55Z', event_type: 'validation_qualite', source_system: 'KOS Quality Assurance Authority', agent_id: 'AG-099', description: 'Validation qualité refusée : Score 88/100 — Publication bloquée', details: 'Quality Controller a bloqué la publication du rapport ESG Côte d\'Ivoire. Score : Exactitude (85%), Conformité (90%), Valeur Client (92%), Réutilisabilité (87%), Innovation (86%). 2 sections doivent être révisées. Réassigné à AG-031.', severity: 'warning', status: 'logged', hash_verification: 'SHA256-c6d1f4a8e3b5', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-10-055', timestamp: '2026-06-10T18:05:12Z', event_type: 'modification_donnees', source_system: 'Supabase Admin API', user_id: 'USR-001', description: 'Modification données : Ajout RLS policy sur kos_corrective_blocks', details: 'Managing Partner a approuvé l\'ajout de la policy RLS UPDATE sur kos_corrective_blocks. Policy : authenticated + anon peuvent UPDATE. Journalisé pour conformité SOC 2.', severity: 'info', status: 'logged', hash_verification: 'SHA256-d7e2f5b9c4a6', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-09-041', timestamp: '2026-06-09T11:20:44Z', event_type: 'prompt_ia', source_system: 'KOS Proposal Generator', agent_id: 'AG-023', description: 'Prompt : Génération proposition commerciale — Accompagnement BCEAO Banque Atlantique', details: 'Prompt structuré envoyé au Proposal Generator. Template : Proposition Stratégique Niveau 3. Paramètres : mission_type=accompagnement_reglementaire, duree=6_mois, equipe=5, budget_indicatif=45M_FCFA.', severity: 'info', status: 'logged', hash_verification: 'SHA256-e8f3a6b1d5c7', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-09-042', timestamp: '2026-06-09T11:22:18Z', event_type: 'reponse_ia', source_system: 'KOS Proposal Generator', agent_id: 'AG-023', description: 'Réponse IA : Proposition 42 pages — Score qualité 97/100', details: 'Proposition générée en 1 minute 52 secondes. Inclut : synthèse exécutive, méthodologie, équipe, planning 6 mois, budget détaillé, KPI, références. Score qualité : 97/100. Prête pour revue humaine.', severity: 'info', status: 'logged', hash_verification: 'SHA256-f9a4b7c2d6e1', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-08-012', timestamp: '2026-06-08T08:55:30Z', event_type: 'decision_humaine', source_system: 'KOS Virtual Board', user_id: 'USR-001', description: 'Décision stratégique : Approbation Roadmap KOS 2026-2029 Phase 1', details: 'Virtual Board a approuvé la Roadmap 36 mois Phase 1 (0-6 mois). Quick Wins identifiés : 12. Budget alloué : 0 FCFA (100% interne). Jalons : J+30 Agent Registry, J+60 API Gateway, J+90 Control Tower unifiée.', severity: 'info', status: 'logged', hash_verification: 'SHA256-a1c5e9f3d7b2', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-07-028', timestamp: '2026-06-07T13:15:22Z', event_type: 'correction_auto', source_system: 'KOS SEO AEO Command', agent_id: 'AG-007', description: 'Correction SEO : Optimisation meta-descriptions — 35 pages', details: 'SEO Command a optimisé 35 meta-descriptions. Longueur moyenne : 98 → 148 caractères. Inclusion mots-clés : 45% → 92%. CTR estimé : +15%. Pages ciblées : blog, services, geo-hub.', severity: 'info', status: 'logged', hash_verification: 'SHA256-b2d6f1a4e8c3', raci_role: 'R' },
    { entry_id: 'AUD-2026-06-05-003', timestamp: '2026-06-05T07:30:00Z', event_type: 'alerte_securite', source_system: 'KOS Security Command', agent_id: 'AG-033', description: 'Alerte critique : Détection intrusion — tentative SQL injection sur /api/form-submit', details: 'Security Command a détecté et bloqué une tentative d\'injection SQL sur l\'endpoint /api/form-submit. Pattern détecté : UNION SELECT. IP bannie automatiquement. Logs transmis au SOC. Score de menace : 9.2/10.', severity: 'blocker', status: 'escalated', hash_verification: 'SHA256-c3e7f2b5a1d9', raci_role: 'A' },
    { entry_id: 'AUD-2026-06-04-017', timestamp: '2026-06-04T16:40:08Z', event_type: 'execution_bloc', source_system: 'KOS Global Agent Performance', agent_id: 'AG-088', description: 'Exécution Bloc CORR-015 : Correction agents Knowledge — Succès complet', details: 'Bloc exécuté avec succès. 15 agents Knowledge mis à jour. 7 corrective_actions fixées. Health Score moyen Knowledge : 78 → 92. Big Four Score : 81 → 94. Temps : 1.8 secondes.', severity: 'info', status: 'logged', hash_verification: 'SHA256-d4f8a3c6b2e1', raci_role: 'R' },
  ],
  raci_matrix: [
    { activity_id: 'RACI-001', activity_name: 'Validation des prompts IA critiques', category: 'ia', description: 'Tout prompt IA destiné à un livrable stratégique (Niveau 4) doit être validé par le Managing Partner avant exécution.', responsible: 'Agent IA Lead', accountable: 'Managing Partner', consulted: ['AI Governance Council', 'Quality Controller'], informed: ['Virtual Board', 'Client Partner'], frequency: 'À chaque livrable stratégique', evidence_type: 'Journal prompt + hash SHA256' },
    { activity_id: 'RACI-002', activity_name: 'Revue qualité des réponses IA', category: 'qualite', description: 'Toute réponse IA avec score de confiance < 90% doit être revue par le Quality Controller et un Expert Reviewer humain.', responsible: 'Quality Controller (AG-099)', accountable: 'Quality Assurance Authority', consulted: ['Expert Reviewer (AG-088)', 'Humanization Engine (AG-044)'], informed: ['Managing Partner', 'Client Partner'], frequency: 'Continue (automatique)', evidence_type: 'Score qualité + rapport revue' },
    { activity_id: 'RACI-003', activity_name: 'Gestion des incidents de sécurité', category: 'securite', description: 'Tout incident de sécurité détecté par le Security Command doit suivre le processus : détection → confinement → analyse → résolution → post-mortem.', responsible: 'Security Command (AG-033)', accountable: 'Enterprise Security Engine', consulted: ['AI Governance Council', 'Legal & Compliance'], informed: ['Managing Partner', 'Virtual Board', 'Clients affectés'], frequency: 'À chaque incident', evidence_type: 'Rapport incident + RCA' },
    { activity_id: 'RACI-004', activity_name: 'Approbation des modifications de schéma DB', category: 'donnees', description: 'Toute modification du schéma de base de données (CREATE/ALTER table) doit être approuvée par le Data Architect et le Managing Partner.', responsible: 'Data Architect', accountable: 'Managing Partner', consulted: ['Enterprise Data Hub', 'Security Command'], informed: ['Tous les leads de domaine'], frequency: 'À chaque modification', evidence_type: 'Migration script + approbation' },
    { activity_id: 'RACI-005', activity_name: 'Exécution des blocs correctifs', category: 'operations', description: 'Les blocs correctifs KOS sont déclenchés automatiquement par le Global Agent Performance Scanner, avec escalade au Managing Partner si échec.', responsible: 'Global Agent Performance (AG-088)', accountable: 'Managing Partner', consulted: ['Quality Controller', 'Domain Leads'], informed: ['Virtual Board'], frequency: 'Après chaque scan (hebdomadaire)', evidence_type: 'Rapport exécution bloc' },
    { activity_id: 'RACI-006', activity_name: 'Validation des propositions commerciales', category: 'gouvernance', description: 'Les propositions > 25M FCFA nécessitent validation par le Managing Partner et le Virtual Board. Les propositions < 25M FCFA : validation Partner.', responsible: 'Proposal Generator (AG-023)', accountable: 'Managing Partner (si > 25M)', consulted: ['Engagement Risk Office', 'Financial Advisory'], informed: ['Client Partner', 'Consulting Factory'], frequency: 'À chaque proposition', evidence_type: 'Proposition signée' },
    { activity_id: 'RACI-007', activity_name: 'Due Diligence — Validation des risques', category: 'conformite', description: 'Les rapports de due diligence avec score de risque global > 7/10 doivent être escaladés au Virtual Board pour décision GO/NO-GO.', responsible: 'Due Diligence Engine (AG-019)', accountable: 'Engagement Risk Office', consulted: ['Regulatory Intelligence', 'Financial Advisory'], informed: ['Managing Partner', 'Client Partner'], frequency: 'À chaque due diligence', evidence_type: 'Rapport DD + matrice risques' },
    { activity_id: 'RACI-008', activity_name: 'Mise à jour des politiques KOS', category: 'gouvernance', description: 'Toute modification des 10 politiques de la KOS Constitution doit être approuvée par le Virtual Board (unanimité requise pour les articles 1-5).', responsible: 'Policy & Governance Engine', accountable: 'Virtual Board', consulted: ['AI Governance Council', 'Enterprise Risk Engine'], informed: ['Tous les agents KOS', 'Tous les hubs'], frequency: 'Revue trimestrielle', evidence_type: 'Politique versionnée + PV Virtual Board' },
    { activity_id: 'RACI-009', activity_name: 'Surveillance conformité réglementaire', category: 'conformite', description: 'Veille continue sur 15 bibliothèques RAG. Toute nouvelle réglementation doit être indexée et notifiée dans les 24h.', responsible: 'Regulatory Intelligence Engine', accountable: 'Compliance Officer', consulted: ['RAG System', 'Knowledge Graph'], informed: ['Tous les agents compliance', 'Managing Partner'], frequency: 'Continue 24/7', evidence_type: 'Alerte réglementaire + indexation' },
    { activity_id: 'RACI-010', activity_name: 'Revue des hallucinations IA', category: 'ia', description: 'Toute hallucination détectée par le Hallucination Detection Engine doit être corrigée dans l\'heure et documentée pour amélioration continue.', responsible: 'Hallucination Detection Engine', accountable: 'AI Governance Council', consulted: ['Source Verification Engine', 'Prompt Quality Office'], informed: ['Quality Controller', 'Knowledge Manager'], frequency: 'Continue (automatique)', evidence_type: 'Rapport hallucination + correction' },
    { activity_id: 'RACI-011', activity_name: 'Déploiement edge functions', category: 'operations', description: 'Tout déploiement d\'edge function en production nécessite validation du Security Command et tests de non-régression.', responsible: 'Web Operations Lead', accountable: 'CTO / Managing Partner', consulted: ['Security Command', 'Performance Monitor'], informed: ['Tous les agents concernés'], frequency: 'À chaque déploiement', evidence_type: 'Log déploiement + tests' },
    { activity_id: 'RACI-012', activity_name: 'Gestion des accès et permissions', category: 'securite', description: 'Toute création/modification/suppression de compte utilisateur avec rôle Admin ou Partner nécessite validation du Managing Partner.', responsible: 'IAM Administrator', accountable: 'Managing Partner', consulted: ['Security Command', 'Enterprise Security Engine'], informed: ['Virtual Board'], frequency: 'À chaque demande', evidence_type: 'Log IAM + approbation' },
    { activity_id: 'RACI-013', activity_name: 'Publication de contenu public', category: 'qualite', description: 'Tout contenu destiné à la publication publique (blog, whitepaper, social media) doit passer le Quality Controller avec score ≥ 95/100.', responsible: 'Content Studio / Agent IA', accountable: 'Quality Assurance Authority', consulted: ['Humanization Engine', 'Expert Reviewer'], informed: ['Marketing Lead', 'Managing Partner'], frequency: 'À chaque publication', evidence_type: 'Score qualité + approbation' },
    { activity_id: 'RACI-014', activity_name: 'Audit de conformité interne', category: 'conformite', description: 'Audit interne trimestriel de tous les processus KOS contre les standards ISO/COSO/COBIT. Rapport présenté au Virtual Board.', responsible: 'Audit Intelligence Engine', accountable: 'Managing Partner', consulted: ['Enterprise Risk Engine', 'AI Governance Council'], informed: ['Virtual Board', 'Compliance Officer'], frequency: 'Trimestriel', evidence_type: 'Rapport d\'audit interne' },
    { activity_id: 'RACI-015', activity_name: 'Gestion de la performance des agents IA', category: 'ia', description: 'Scan hebdomadaire des 75 agents KOS. Les agents avec Health Score < 70 déclenchent un bloc correctif automatique.', responsible: 'Global Agent Performance Scanner', accountable: 'AI Governance Council', consulted: ['Quality Controller', 'Domain Leads'], informed: ['Managing Partner', 'Virtual Board'], frequency: 'Hebdomadaire', evidence_type: 'Rapport scan agents' },
    { activity_id: 'RACI-016', activity_name: 'Backup et reprise après sinistre', category: 'operations', description: 'Backups quotidiens avec PITR. Test PRA/PCA semestriel. Tout incident de perte de données doit être escaladé immédiatement.', responsible: 'KOS Resource Command Center', accountable: 'CTO / Managing Partner', consulted: ['Enterprise Security Engine', 'Infrastructure Lead'], informed: ['Virtual Board', 'Clients affectés'], frequency: 'Quotidien (backup) / Semestriel (test)', evidence_type: 'Log backup + rapport test PRA' },
  ],
  audit_trail_links: [
    { link_id: 'LINK-001', source_entry: 'AUD-2026-06-16-001', target_entry: 'AUD-2026-06-16-002', relationship: 'triggered_by', description: 'Le prompt BCEAO a déclenché la réponse multi-agent' },
    { link_id: 'LINK-002', source_entry: 'AUD-2026-06-16-002', target_entry: 'AUD-2026-06-16-003', relationship: 'validates', description: 'La réponse IA a été validée par le Quality Controller' },
    { link_id: 'LINK-003', source_entry: 'AUD-2026-06-16-003', target_entry: 'AUD-2026-06-16-004', relationship: 'triggered_by', description: 'La validation qualité a permis la décision humaine d\'approbation' },
    { link_id: 'LINK-004', source_entry: 'AUD-2026-06-13-031', target_entry: 'AUD-2026-06-13-031', relationship: 'escalated_to', description: 'L\'échec du bloc CORR-008 a créé un ticket d\'escalade TKT-2026-0892' },
    { link_id: 'LINK-005', source_entry: 'AUD-2026-06-14-042', target_entry: 'AUD-2026-06-14-043', relationship: 'triggered_by', description: 'Le prompt Due Diligence a généré le rapport 98 pages' },
    { link_id: 'LINK-006', source_entry: 'AUD-2026-06-14-043', target_entry: 'AUD-2026-06-14-044', relationship: 'triggered_by', description: 'Le rapport Due Diligence a permis la décision GO conditionnel' },
    { link_id: 'LINK-007', source_entry: 'AUD-2026-06-09-041', target_entry: 'AUD-2026-06-09-042', relationship: 'triggered_by', description: 'Le prompt de génération a produit la proposition 42 pages' },
    { link_id: 'LINK-008', source_entry: 'AUD-2026-06-11-008', target_entry: 'AUD-2026-06-11-008', relationship: 'corrected_by', description: 'La validation refusée a déclenché une révision (actuellement en cours)' },
    { link_id: 'LINK-009', source_entry: 'AUD-2026-06-07-028', target_entry: 'AUD-2026-06-15-018', relationship: 'depends_on', description: 'La correction SEO du 7 juin et la correction liens du 15 juin font partie du même cycle d\'optimisation' },
    { link_id: 'LINK-010', source_entry: 'AUD-2026-06-05-003', target_entry: 'AUD-2026-06-05-003', relationship: 'escalated_to', description: 'La tentative d\'injection SQL a été escaladée au SOC externe' },
    { link_id: 'LINK-011', source_entry: 'AUD-2026-06-12-019', target_entry: 'AUD-2026-06-12-019', relationship: 'validates', description: 'L\'alerte SSL a été automatiquement résolue par le renouvellement programmé' },
    { link_id: 'LINK-012', source_entry: 'AUD-2026-06-16-005', target_entry: 'AUD-2026-06-16-005', relationship: 'validates', description: 'L\'exécution du bloc CORR-012 est validée (Health Score 72→89)' },
  ],
  compliance_checkpoints_list: [
    { checkpoint_id: 'CP-001', checkpoint_name: 'Journalisation des prompts IA', standard_ref: 'EU AI Act Art.12', requirement: 'Tout prompt envoyé à un agent IA doit être journalisé avec : timestamp, ID agent, contenu hashé, utilisateur émetteur.', status: 'compliant', evidence: 'ai_audit_trail + journal_entries', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 95 },
    { checkpoint_id: 'CP-002', checkpoint_name: 'Journalisation des réponses IA', standard_ref: 'EU AI Act Art.12 / ISO 42001', requirement: 'Toute réponse d\'agent IA doit être journalisée avec : timestamp, ID agent, score de confiance, hallucinations détectées.', status: 'compliant', evidence: 'ai_audit_trail + hallucination_detection_engine', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 90 },
    { checkpoint_id: 'CP-003', checkpoint_name: 'Traçabilité des décisions humaines', standard_ref: 'COSO ERM 2017 / COBIT MEA02', requirement: 'Toute décision humaine sur un livrable IA doit être tracée avec : identité, rôle, justification, signature électronique.', status: 'compliant', evidence: 'managing_partner_office logs + signature électronique', last_audit: '2026-06-18', next_audit: '2026-09-18', score: 95 },
    { checkpoint_id: 'CP-004', checkpoint_name: 'Piste d\'audit infalsifiable', standard_ref: 'ISO 27001 A.12.4.1', requirement: 'Les logs d\'audit doivent être protégés contre la modification et la suppression. Hashing SHA256 obligatoire.', status: 'compliant', evidence: 'SHA256 sur tous les logs', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 98 },
    { checkpoint_id: 'CP-005', checkpoint_name: 'Journalisation des corrections automatiques', standard_ref: 'ISO 9001 §9.1 / ITIL CSI', requirement: 'Toute correction automatique doit être journalisée avec : avant/après, ID agent correcteur, score avant/après.', status: 'compliant', evidence: 'kos_correction_before_after + execution_logs', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 92 },
    { checkpoint_id: 'CP-006', checkpoint_name: 'Matrice RACI documentée', standard_ref: 'COBIT 2019 EDM01 / COSO', requirement: 'Une matrice RACI complète doit exister pour tous les processus critiques, revue trimestriellement.', status: 'compliant', evidence: 'RACI matrix — 16 activités documentées et validées', last_audit: '2026-06-18', next_audit: '2026-09-18', score: 95 },
    { checkpoint_id: 'CP-007', checkpoint_name: 'Gestion des incidents de sécurité', standard_ref: 'ISO 27001 A.16 / NIST CSF RS', requirement: 'Processus documenté : détection < 5 min, réponse < 30 min, résolution < 4h critique. Post-mortem obligatoire.', status: 'compliant', evidence: 'security_logs + security_scans', last_audit: '2026-06-12', next_audit: '2026-09-12', score: 85 },
    { checkpoint_id: 'CP-008', checkpoint_name: 'Protection des données personnelles', standard_ref: 'RGPD Art.30 / ISO 27701', requirement: 'Registre des traitements tenu à jour. Toute journalisation de données personnelles doit être minimisée et justifiée.', status: 'compliant', evidence: 'registre-traitements + RLS policies + DPO audit externe', last_audit: '2026-06-18', next_audit: '2026-09-18', score: 93 },
    { checkpoint_id: 'CP-009', checkpoint_name: 'Rétention des logs', standard_ref: 'SOC 2 CC7.2 / ISO 27001 A.12.4.3', requirement: 'Logs conservés minimum 90 jours pour les logs opérationnels, 1 an pour les logs de sécurité, 10 ans pour les logs réglementaires.', status: 'compliant', evidence: 'Supabase PITR 7j + backup secondaire mensuel + archivage S3', last_audit: '2026-06-18', next_audit: '2026-09-18', score: 95 },
    { checkpoint_id: 'CP-010', checkpoint_name: 'Contrôle d\'accès aux logs', standard_ref: 'ISO 27001 A.9.4 / SOC 2 CC6.1', requirement: 'Accès aux logs restreint par RBAC. Admin uniquement pour logs sensibles. Toute consultation de log est elle-même journalisée.', status: 'compliant', evidence: 'RBAC 5 niveaux + activity_logs', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 88 },
    { checkpoint_id: 'CP-011', checkpoint_name: 'Revue périodique des logs', standard_ref: 'COBIT 2019 MEA02 / ISO 27001 A.12.4.3', requirement: 'Revue trimestrielle des logs par le Virtual Board. Analyse des tendances, anomalies, patterns de risque.', status: 'compliant', evidence: 'Revue Q2 2026 documentée — Virtual Board 15 Juin 2026', last_audit: '2026-06-15', next_audit: '2026-09-15', score: 93 },
    { checkpoint_id: 'CP-012', checkpoint_name: 'Notification des violations de données', standard_ref: 'RGPD Art.33-34 / NIST CSF RS.CO-2', requirement: 'Processus de notification aux autorités (CNIL/CDP) dans les 72h en cas de violation de données personnelles.', status: 'compliant', evidence: 'Procédure documentée + test annuel validé + DPO désigné', last_audit: '2026-06-18', next_audit: '2026-09-18', score: 92 },
  ],
};