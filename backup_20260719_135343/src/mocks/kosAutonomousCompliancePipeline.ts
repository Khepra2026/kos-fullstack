// KOS Autonomous Compliance Pipeline™ — Full Automation from Input to Final Audit Report
// 9-step fully automated compliance pipeline — Zero human intervention
// Inputs: Institution data → Outputs: Audit report + Recommendations + Lead trigger

export interface PipelineScenario {
  id: string;
  nom_institution: string;
  type_institution: 'Banque' | 'EMF' | 'FinTech' | 'Multi-Entité';
  zone: string;
  actif_total_fcfa: string;
  effectif: number;
  scope_reglementaire: string[];
  description: string;
  maturite: 'Faible' | 'Moyen' | 'Élevé';
}

export interface InputIntake {
  date_soumission: string;
  canal: 'API' | 'Portail Web' | 'Upload CSV' | 'Email Parsing';
  documents_fournis: string[];
  validation_auto: {
    completude: number;
    erreurs_detectees: number;
    statut: 'Valide' | 'Partiel' | 'Rejeté';
    temps_traitement_ms: number;
  };
  extraction_donnees: Record<string, string>;
}

export interface RegulatoryInterpretation {
  textes_applicables: RegulatoryText[];
  obligations_identifiees: Obligation[];
  matrice_applicabilite: ApplicabilityMatrix[];
  alertes_reglementaires: RegulatoryAlert[];
  score_interpretation: number;
}

export interface RegulatoryText {
  reference: string;
  intitule: string;
  emetteur: string;
  date_effet: string;
  articles_pertinents: string[];
  niveau_impact: 'Critique' | 'Élevé' | 'Modéré';
}

export interface Obligation {
  id: string;
  description: string;
  source: string;
  echeance: string;
  statut: 'Conforme' | 'Partiellement Conforme' | 'Non Conforme' | 'Non Applicable';
  preuve_requise: string;
  criticite: number;
}

export interface ApplicabilityMatrix {
  texte: string;
  articles: { ref: string; applicable: boolean; justification: string }[];
}

export interface RegulatoryAlert {
  type: 'alerte' | 'information' | 'urgence';
  message: string;
  date: string;
  source: string;
}

export interface RiskScoring {
  score_brut: number;
  score_residuel: number;
  seuil_critique: number;
  classification: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
  breakdown: RiskBreakdown[];
  heatmap_data: RiskHeatmapEntry[];
  tendances: RiskTrend[];
}

export interface RiskBreakdown {
  axe: string;
  poids_pct: number;
  score: number;
  niveau: string;
  observations: string;
}

export interface RiskHeatmapEntry {
  risque: string;
  probabilite: number;
  impact: number;
  score: number;
  quadrant: string;
}

export interface RiskTrend {
  periode: string;
  score: number;
  variation_pct: number;
  direction: 'up' | 'down' | 'stable';
}

export interface GapDetection {
  gaps_identifies: Gap[];
  score_conformite_actuel: number;
  score_conformite_cible: number;
  ecart_total: number;
  gaps_par_priorite: { p0: number; p1: number; p2: number; p3: number };
}

export interface Gap {
  id: string;
  domaine: string;
  description: string;
  situation_actuelle: string;
  situation_requise: string;
  reference_reglementaire: string;
  severite: 'Critique' | 'Élevé' | 'Modéré' | 'Faible';
  impact_potentiel: string;
  preuve_absence: string;
}

export interface WorkflowGeneration {
  workflows: N8nWorkflow[];
  score_automatisation: number;
  temps_generation_secondes: number;
  workflow_count: number;
  couverture_processus_pct: number;
}

export interface N8nWorkflow {
  id: string;
  nom: string;
  description: string;
  declencheur: string;
  nombre_noeuds: number;
  score_automatisation: number;
  temps_execution_moyen_s: number;
  dependances: string[];
  json_export: string;
}

export interface AIAuditSimulation {
  date_simulation: string;
  auditeur_virtuel: string;
  score_inspection_simule: number;
  constats: SimulatedFinding[];
  points_fort: string[];
  zones_exposition: string[];
  probabilite_sanction_pct: number;
  duree_simulation_s: number;
}

export interface SimulatedFinding {
  id: string;
  gravite: string;
  description: string;
  article_viole: string;
  sanction_potentielle: string;
  montant_risque_fcfa: string;
  probabilite_detection_pct: number;
}

export interface ReportGeneration {
  rapport_id: string;
  date_generation: string;
  format: 'PDF' | 'JSON' | 'HTML' | 'Word';
  pages: number;
  sections: ReportSection[];
  score_conformite_global: number;
  temps_generation_s: number;
  taille_fichier: string;
}

export interface ReportSection {
  numero: number;
  titre: string;
  pages: string;
  contenu_resume: string;
  graphiques_inclus: string[];
}

export interface RecommendationEngine {
  recommandations: Recommendation[];
  priorisation: string;
  plan_action: ActionPlan;
  cout_total_estime_fcfa: string;
  delai_mise_conformite_jours: number;
}

export interface Recommendation {
  id: string;
  priorite: 'P0' | 'P1' | 'P2' | 'P3';
  action: string;
  justification: string;
  cout_estime_fcfa: string;
  delai: string;
  responsable: string;
  indicateur_succes: string;
  dependances: string[];
}

export interface ActionPlan {
  phases: ActionPhase[];
  jalons_cles: Milestone[];
}

export interface ActionPhase {
  phase: string;
  duree: string;
  actions: string[];
  livrables: string[];
}

export interface Milestone {
  jalon: string;
  date: string;
  critere_succes: string;
}

export interface LeadConversionTrigger {
  score_lead: number;
  classification: 'Chaud' | 'Tiède' | 'Froid';
  actions_auto: ConversionAction[];
  donnees_crm: CRMData;
  taux_conversion_estime: number;
}

export interface ConversionAction {
  etape: number;
  action_type: 'email' | 'sms' | 'notification' | 'webhook' | 'rdv';
  description: string;
  declencheur: string;
  delai: string;
  contenu: string;
}

export interface CRMData {
  entreprise: string;
  contact_principal: string;
  telephone: string;
  email: string;
  opportunite_fcfa: string;
  probabilite_close_pct: number;
  date_close_prevue: string;
}

// ═══════════════ Pipeline Deliverable ═══════════════

export interface PipelineDeliverable {
  scenario: PipelineScenario;
  input_intake: InputIntake;
  regulatory_interpretation: RegulatoryInterpretation;
  risk_scoring: RiskScoring;
  gap_detection: GapDetection;
  workflow_generation: WorkflowGeneration;
  ai_audit_simulation: AIAuditSimulation;
  report_generation: ReportGeneration;
  recommendation_engine: RecommendationEngine;
  lead_conversion_trigger: LeadConversionTrigger;
  metadata: PipelineMetadata;
}

export interface PipelineMetadata {
  pipeline_id: string;
  date_execution: string;
  duree_totale_s: number;
  score_efficacite_automatisation: number;
  interventions_humaines: number;
  mode: string;
  version_pipeline: string;
}

// ═══════════════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════════════

export const PIPELINE_SCENARIOS: PipelineScenario[] = [
  {
    id: 'ACP-001',
    nom_institution: 'Banque Atlantique Cameroun',
    type_institution: 'Banque',
    zone: 'CEMAC — Cameroun',
    actif_total_fcfa: '750 000 000 000',
    effectif: 1200,
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026', 'LBC/FT GAFI 40 Recommandations'],
    description: 'Banque commerciale de premier plan en zone CEMAC avec 3 observations critiques COBAC non résolues depuis 2024. Besoin urgent d\'audit complet et plan de remédiation automatisé.',
    maturite: 'Moyen',
  },
  {
    id: 'ACP-002',
    nom_institution: 'CREC Gabon — EMF Catégorie 1',
    type_institution: 'EMF',
    zone: 'CEMAC — Gabon',
    actif_total_fcfa: '35 000 000 000',
    effectif: 180,
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07', 'GABAC n°01/2026'],
    description: 'Établissement de microfinance de 1ère catégorie avec défaillances critiques : absence de politique LBC/FT documentée, CA non statutaire depuis 2023, registre BE inexistant.',
    maturite: 'Faible',
  },
  {
    id: 'ACP-003',
    nom_institution: 'PayCEMAC SA — FinTech Paiement',
    type_institution: 'FinTech',
    zone: 'CEMAC — Congo',
    actif_total_fcfa: '42 000 000 000',
    effectif: 85,
    scope_reglementaire: ['COBAC R-2026/03', 'Sécurité SI CEMAC', 'GAFI 2026 FinTech'],
    description: 'FinTech de paiement innovante avec infrastructure technique solide mais lacunes documentaires réglementaires. Scoring automatique KYC en place, gouvernance à formaliser.',
    maturite: 'Moyen',
  },
  {
    id: 'ACP-004',
    nom_institution: 'Groupe Bancaire Panafricain — Holding Multi-Filiales',
    type_institution: 'Multi-Entité',
    zone: 'CEMAC + UEMOA',
    actif_total_fcfa: '3 200 000 000 000',
    effectif: 8500,
    scope_reglementaire: ['COBAC R-2026/03', 'BCEAO', 'BEAC', 'GABAC', 'OHADA', 'ISO 31000', 'GAFI'],
    description: 'Groupe bancaire panafricain avec 12 filiales dans 10 pays. Consolidation conformité multi-juridictionnelle complexe. Programme d\'harmonisation en cours, audit consolidé requis.',
    maturite: 'Élevé',
  },
];

// ═══════════════════════════════════════════════
// FULL PIPELINE DELIVERABLES
// ═══════════════════════════════════════════════

export const PIPELINE_DELIVERABLES: PipelineDeliverable[] = [
  // ─── ACP-001 : Banque Atlantique Cameroun ───
  {
    scenario: PIPELINE_SCENARIOS[0],
    input_intake: {
      date_soumission: '2026-06-24T08:00:00Z',
      canal: 'Portail Web',
      documents_fournis: [
        'Statuts constitutifs (PDF)',
        'Rapport annuel 2025 (PDF)',
        'Organigramme fonctionnel (PDF)',
        'Politique LBC/FT v2024 (PDF)',
        'Rapport audit interne 2025 (PDF)',
        'Registre Bénéficiaires Effectifs (XLSX)',
        'Déclarations de soupçons 2025 (CSV)',
        'Rapports BEAC trimestriels 2025 (PDF ×4)',
      ],
      validation_auto: {
        completude: 87,
        erreurs_detectees: 2,
        statut: 'Partiel',
        temps_traitement_ms: 2300,
      },
      extraction_donnees: {
        'raison_sociale': 'Banque Atlantique Cameroun SA',
        'agrement_cobac': 'AGR-2010-CM-045',
        'date_constitution': '2010-03-15',
        'capital_social_fcfa': '25 000 000 000',
        'siege_social': 'Douala — Bonanjo',
        'president_ca': 'Jean-Marc EBANGA',
        'dg': 'Marie-Claire OYONO',
        'cco': 'Pierre ESSOMBA (par intérim)',
        'nb_administrateurs': 12,
        'nb_independants': 3,
        'comites_specialises': '4 (Audit, Risques, Rémunération, Nominations)',
        'derniere_inspection_cobac': '2024-09-12',
        'observations_critiques': '3 non résolues',
      },
    },
    regulatory_interpretation: {
      textes_applicables: [
        { reference: 'COBAC R-2026/03', intitule: 'Règlement COBAC relatif au dispositif LBC/FT', emetteur: 'COBAC', date_effet: '2026-01-01', articles_pertinents: ['Art. 7 — Classification risques', 'Art. 12 — Registre BE', 'Art. 15 — DS', 'Art. 22 — Formation'], niveau_impact: 'Critique' },
        { reference: 'COBAC R-2025/07', intitule: 'Règlement gouvernance des établissements de crédit', emetteur: 'COBAC', date_effet: '2025-07-01', articles_pertinents: ['Art. 5 — Indépendance CA', 'Art. 8 — Comités spécialisés', 'Art. 14 — Lignes de défense'], niveau_impact: 'Critique' },
        { reference: 'BEAC n°008-2026', intitule: 'Instruction relative au reporting prudentiel', emetteur: 'BEAC', date_effet: '2026-03-01', articles_pertinents: ['Art. 3 — NSFR', 'Art. 7 — LCR', 'Art. 11 — Grands risques'], niveau_impact: 'Élevé' },
        { reference: 'GABAC n°01/2026', intitule: 'Directive GABAC sur les déclarations de soupçons', emetteur: 'GABAC', date_effet: '2026-02-15', articles_pertinents: ['Art. 4 — Délais DS', 'Art. 9 — Contenu DS'], niveau_impact: 'Élevé' },
        { reference: 'GAFI 40 Recommandations', intitule: 'Normes internationales LBC/FT', emetteur: 'GAFI', date_effet: '2025-10-01', articles_pertinents: ['Rec. 10 — CDD', 'Rec. 24 — BE', 'Rec. 28 — Supervision'], niveau_impact: 'Modéré' },
      ],
      obligations_identifiees: [
        { id: 'OBL-001', description: 'Mettre en place un dispositif de classification des risques LBC/FT documenté', source: 'COBAC R-2026/03 Art.7', echeance: '2026-06-30', statut: 'Partiellement Conforme', preuve_requise: 'Matrice de risques + procédure écrite', criticite: 95 },
        { id: 'OBL-002', description: 'Maintenir un registre des bénéficiaires effectifs à jour', source: 'COBAC R-2026/03 Art.12', echeance: 'Continu', statut: 'Conforme', preuve_requise: 'Registre BE en ligne avec attestations', criticite: 90 },
        { id: 'OBL-003', description: 'Déclarer les soupçons LBC/FT dans un délai de 5 jours ouvrés', source: 'GABAC n°01/2026 Art.4', echeance: 'Continu', statut: 'Non Conforme', preuve_requise: 'Procédure DS + registre DS', criticite: 98 },
        { id: 'OBL-004', description: 'Assurer un minimum de 33% d\'administrateurs indépendants au CA', source: 'COBAC R-2025/07 Art.5', echeance: '2026-01-01', statut: 'Non Conforme', preuve_requise: 'PV nomination + déclarations indépendance', criticite: 85 },
        { id: 'OBL-005', description: 'Produire le reporting NSFR trimestriel conforme BEAC', source: 'BEAC n°008-2026 Art.3', echeance: 'Trimestriel', statut: 'Partiellement Conforme', preuve_requise: 'Rapports trimestriels 2026', criticite: 80 },
        { id: 'OBL-006', description: 'Assurer une formation LBC/FT annuelle pour tout le personnel', source: 'COBAC R-2026/03 Art.22', echeance: '2026-12-31', statut: 'Partiellement Conforme', preuve_requise: 'Plan formation + attestations', criticite: 75 },
      ],
      matrice_applicabilite: [
        { texte: 'COBAC R-2026/03', articles: [
          { ref: 'Art.7', applicable: true, justification: 'Établissement de crédit — obligation de classification risques clients' },
          { ref: 'Art.12', applicable: true, justification: 'Tenue registre BE obligatoire pour tous les établissements COBAC' },
          { ref: 'Art.30', applicable: false, justification: 'Article spécifique aux EMF — non applicable aux banques' },
        ]},
      ],
      alertes_reglementaires: [
        { type: 'alerte', message: 'Nouveau texte COBAC attendu Q3 2026 sur la résilience opérationnelle (DORA Afrique)', date: '2026-06-15', source: 'Veille COBAC' },
        { type: 'urgence', message: 'Date butoir mise en conformité Art.5 Gouvernance : déjà dépassée depuis le 01/01/2026', date: '2026-01-01', source: 'COBAC R-2025/07' },
        { type: 'information', message: 'GABAC a publié un guide pratique DS — recommandé pour mise à jour procédure', date: '2026-05-20', source: 'Site GABAC' },
      ],
      score_interpretation: 94,
    },
    risk_scoring: {
      score_brut: 68,
      score_residuel: 42,
      seuil_critique: 50,
      classification: 'Élevé',
      breakdown: [
        { axe: 'Gouvernance', poids_pct: 20, score: 45, niveau: 'Insuffisant', observations: 'CA non conforme (25% indépendants vs 33% requis), CCO par intérim depuis 8 mois' },
        { axe: 'LBC/FT', poids_pct: 30, score: 38, niveau: 'Défaillant', observations: 'Procédure DS non conforme aux délais GABAC, classification risques incomplète' },
        { axe: 'Contrôle Interne', poids_pct: 25, score: 52, niveau: 'Partiel', observations: 'Audit interne fonctionnel mais plan 2025 non couvert à 100%' },
        { axe: 'Reporting', poids_pct: 25, score: 62, niveau: 'Partiel', observations: 'NSFR OK, LCR en retard de 15j, grands risques non déclarés T1 2026' },
      ],
      heatmap_data: [
        { risque: 'Sanction COBAC — Gouvernance', probabilite: 85, impact: 95, score: 80.75, quadrant: 'Rouge' },
        { risque: 'Amende GABAC — Retard DS', probabilite: 90, impact: 90, score: 81, quadrant: 'Rouge' },
        { risque: 'Retrait agrément partiel', probabilite: 30, impact: 100, score: 30, quadrant: 'Orange' },
        { risque: 'Risque réputationnel', probabilite: 70, impact: 75, score: 52.5, quadrant: 'Orange' },
        { risque: 'Blocage BEAC reporting', probabilite: 50, impact: 60, score: 30, quadrant: 'Jaune' },
      ],
      tendances: [
        { periode: 'T1 2025', score: 55, variation_pct: 0, direction: 'stable' },
        { periode: 'T2 2025', score: 48, variation_pct: -12.7, direction: 'down' },
        { periode: 'T3 2025', score: 42, variation_pct: -12.5, direction: 'down' },
        { periode: 'T4 2025', score: 44, variation_pct: +4.8, direction: 'up' },
        { periode: 'T1 2026', score: 42, variation_pct: -4.5, direction: 'down' },
      ],
    },
    gap_detection: {
      gaps_identifies: [
        { id: 'GAP-001', domaine: 'Gouvernance — CA', description: 'Pourcentage d\'administrateurs indépendants insuffisant', situation_actuelle: '3/12 = 25%', situation_requise: '4/12 = 33% minimum', reference_reglementaire: 'COBAC R-2025/07 Art.5', severite: 'Critique', impact_potentiel: 'Injonction COBAC + astreinte journalière + risque pénal dirigeants', preuve_absence: 'PV AG 2024 — 3 administrateurs classés indépendants sur 12' },
        { id: 'GAP-002', domaine: 'LBC/FT — DS', description: 'Délai moyen de déclaration de soupçons : 12 jours (limite : 5 jours ouvrés)', situation_actuelle: 'Délai moyen DS : 12 jours', situation_requise: '5 jours ouvrés maximum', reference_reglementaire: 'GABAC n°01/2026 Art.4', severite: 'Critique', impact_potentiel: 'Amende GABAC jusqu\'à 5% CA annuel + signalement COBAC', preuve_absence: 'Registre DS 2025 : 8 déclarations, délai moyen 12j, max 28j' },
        { id: 'GAP-003', domaine: 'Reporting BEAC', description: 'Rapport grands risques T1 2026 non soumis', situation_actuelle: 'Non soumis au 15/04/2026', situation_requise: 'Soumission trimestrielle J+15', reference_reglementaire: 'BEAC n°008-2026 Art.11', severite: 'Élevé', impact_potentiel: 'Pénalité BEAC + restriction opérations interbancaires', preuve_absence: 'Confirmation BEAC : absence rapport T1 2026' },
        { id: 'GAP-004', domaine: 'LBC/FT — Formation', description: 'Taux de formation LBC/FT : 62% du personnel formé en 2025', situation_actuelle: '744/1200 formés', situation_requise: '100% du personnel concerné formé annuellement', reference_reglementaire: 'COBAC R-2026/03 Art.22', severite: 'Élevé', impact_potentiel: 'Observation inspection COBAC + obligation plan rattrapage', preuve_absence: 'Rapport formation 2025 : 62% uniquement, guichetiers non formés' },
        { id: 'GAP-005', domaine: 'Gouvernance — CCO', description: 'Poste de Chief Compliance Officer vacant depuis 8 mois', situation_actuelle: 'CCO par intérim (DG Adjoint)', situation_requise: 'CCO permanent nommé, reporting direct CA', reference_reglementaire: 'COBAC R-2025/07 Art.14', severite: 'Modéré', impact_potentiel: 'Fragilité dispositif conformité, risque inspection défavorable', preuve_absence: 'Organigramme — poste CCO vacant, intérim DG Adjoint' },
      ],
      score_conformite_actuel: 62,
      score_conformite_cible: 100,
      ecart_total: 38,
      gaps_par_priorite: { p0: 3, p1: 4, p2: 2, p3: 1 },
    },
    workflow_generation: {
      workflows: [
        {
          id: 'WF-001', nom: 'Pipeline Classification Risques LBC/FT', description: 'Workflow automatisé de classification des risques clients selon COBAC R-2026/03', declencheur: 'Cron quotidien 06:00 UTC+1',
          nombre_noeuds: 18, score_automatisation: 94, temps_execution_moyen_s: 12, dependances: ['API KYC', 'Base Clients', 'Listes Sanctions'],
          json_export: '{"name":"KOS-LBCFT-Classification","nodes":[{"id":"cron","type":"scheduleTrigger"},{"id":"fetchClients","type":"supabase"},{"id":"kycCheck","type":"httpRequest"},{"id":"scoreRisk","type":"function"},{"id":"updateCRM","type":"supabase"},{"id":"notify","type":"email"}]}',
        },
        {
          id: 'WF-002', nom: 'Pipeline Automatisation DS GABAC', description: 'Détection automatique des opérations suspectes + génération DS pré-remplie', declencheur: 'Event — Transaction > seuil',
          nombre_noeuds: 22, score_automatisation: 88, temps_execution_moyen_s: 8, dependances: ['Moteur règles', 'Registre DS', 'API GABAC'],
          json_export: '{"name":"KOS-DS-Auto","nodes":[{"id":"monitorTx","type":"webhook"},{"id":"checkRules","type":"switch"},{"id":"generateDS","type":"function"},{"id":"submitGABAC","type":"httpRequest"},{"id":"logDS","type":"supabase"}]}',
        },
        {
          id: 'WF-003', nom: 'Pipeline Reporting BEAC Trimestriel', description: 'Génération et soumission automatique des rapports prudentiels BEAC', declencheur: 'Cron J+10 trimestre',
          nombre_noeuds: 25, score_automatisation: 91, temps_execution_moyen_s: 45, dependances: ['ERP Core Banking', 'BEAC API', 'Data Warehouse'],
          json_export: '{"name":"KOS-BEAC-Reporting","nodes":[{"id":"scheduleT","type":"scheduleTrigger"},{"id":"extractData","type":"supabase"},{"id":"computeNSFR","type":"function"},{"id":"computeLCR","type":"function"},{"id":"generateXML","type":"function"},{"id":"submitBEAC","type":"httpRequest"}]}',
        },
        {
          id: 'WF-004', nom: 'Pipeline Formation LBC/FT Automatique', description: 'Affectation automatique des formations LBC/FT + suivi complétion', declencheur: 'Cron mensuel + Onboarding nouveau collaborateur',
          nombre_noeuds: 12, score_automatisation: 96, temps_execution_moyen_s: 3, dependances: ['LMS', 'RH', 'Registre Formation COBAC'],
          json_export: '{"name":"KOS-Formation-LBCFT","nodes":[{"id":"onboard","type":"webhook"},{"id":"assignCourse","type":"httpRequest"},{"id":"trackProgress","type":"supabase"},{"id":"remind","type":"email"},{"id":"certify","type":"function"}]}',
        },
      ],
      score_automatisation: 92,
      temps_generation_secondes: 3.8,
      workflow_count: 4,
      couverture_processus_pct: 88,
    },
    ai_audit_simulation: {
      date_simulation: '2026-06-24T08:02:00Z',
      auditeur_virtuel: 'KOS Senior Compliance Auditor™ v3.2 — Spécialisé Banques CEMAC',
      score_inspection_simule: 41,
      constats: [
        { id: 'F-001', gravite: 'Critique', description: 'CA non conforme — 25% d\'administrateurs indépendants (seuil 33%). Absence de preuve d\'indépendance pour 2 des 3 administrateurs déclarés.', article_viole: 'COBAC R-2025/07 Art.5', sanction_potentielle: 'Injonction sous 60 jours + astreinte 500 000 FCFA/jour', montant_risque_fcfa: '90 000 000 FCFA/an', probabilite_detection_pct: 100 },
        { id: 'F-002', gravite: 'Critique', description: 'Délai moyen déclarations de soupçons 12 jours — violation de l\'obligation GABAC de 5 jours ouvrés. Une DS critique (montant 850M FCFA) transmise avec 28 jours de retard.', article_viole: 'GABAC n°01/2026 Art.4', sanction_potentielle: 'Amende GABAC + signalement COBAC + risque retrait agrément partiel', montant_risque_fcfa: '175 000 000 FCFA', probabilite_detection_pct: 95 },
        { id: 'F-003', gravite: 'Élevé', description: 'Rapport grands risques T1 2026 non soumis à BEAC. Dépassement délai de 70 jours.', article_viole: 'BEAC n°008-2026 Art.11', sanction_potentielle: 'Pénalité BEAC + blocage temporaire opérations', montant_risque_fcfa: '50 000 000 FCFA', probabilite_detection_pct: 90 },
        { id: 'F-004', gravite: 'Modéré', description: 'Taux de formation LBC/FT à 62% — 456 collaborateurs non formés dont les guichetiers (ligne de défense 1).', article_viole: 'COBAC R-2026/03 Art.22', sanction_potentielle: 'Observation inspection — plan de rattrapage obligatoire', montant_risque_fcfa: '25 000 000 FCFA', probabilite_detection_pct: 85 },
      ],
      points_fort: ['Registre BE à jour et conforme', 'Audit interne opérationnel', 'Dispositif KYC digitalisé satisfaisant', 'Système Core Banking moderne'],
      zones_exposition: ['Gouvernance CA non conforme depuis 2024', 'Procédure DS défaillante — risque juridique majeur', 'Reporting BEAC lacunaire — exposition régulateur', 'Formation LBC/FT insuffisante — risque opérationnel'],
      probabilite_sanction_pct: 88,
      duree_simulation_s: 4.2,
    },
    report_generation: {
      rapport_id: 'RPT-2026-ACP001-0624',
      date_generation: '2026-06-24T08:03:00Z',
      format: 'PDF',
      pages: 48,
      sections: [
        { numero: 1, titre: 'Résumé Exécutif', pages: '1-4', contenu_resume: 'Score global 41/100 — INSUFFISANT. 3 observations critiques COBAC non résolues. Recommandation : plan de remédiation urgent.', graphiques_inclus: ['Score radar 4 axes', 'Jauge conformité'] },
        { numero: 2, titre: 'Analyse du Dispositif de Gouvernance', pages: '5-12', contenu_resume: 'CA non conforme (25% vs 33% requis), CCO intérimaire depuis 8 mois. 3 recommandations P0.', graphiques_inclus: ['Structure CA', 'Timeline vacance CCO'] },
        { numero: 3, titre: 'Évaluation LBC/FT', pages: '13-22', contenu_resume: 'Classification risques incomplète, délai DS non conforme (12j vs 5j), formation 62%. 5 gaps critiques.', graphiques_inclus: ['Heatmap risques LBC/FT', 'Graphique délais DS vs seuil'] },
        { numero: 4, titre: 'Contrôle Interne & Reporting', pages: '23-32', contenu_resume: 'Audit interne couverture 2025 à 85%. Reporting BEAC : NSFR OK, LCR retard 15j, grands risques non soumis.', graphiques_inclus: ['Radar reporting', 'Timeline soumissions BEAC'] },
        { numero: 5, titre: 'Simulation Inspection COBAC', pages: '33-40', contenu_resume: 'Probabilité sanction 88%. Montant risque estimé : 340M FCFA. 4 constats simulés dont 2 critiques.', graphiques_inclus: ['Matrice sanctions probables', 'Arbre décisionnel inspection'] },
        { numero: 6, titre: 'Plan de Remédiation & Recommandations', pages: '41-46', contenu_resume: '10 recommandations priorisées P0-P3. Budget estimé : 185M FCFA. Délai mise en conformité : 180 jours.', graphiques_inclus: ['Roadmap 180j', 'Budget par priorité'] },
        { numero: 7, titre: 'Annexes & Références', pages: '47-48', contenu_resume: 'Références réglementaires COBAC, BEAC, GABAC, GAFI. Glossaire. Méthodologie d\'audit.', graphiques_inclus: [] },
      ],
      score_conformite_global: 41,
      temps_generation_s: 5.1,
      taille_fichier: '4.2 Mo',
    },
    recommendation_engine: {
      recommandations: [
        { id: 'REC-001', priorite: 'P0', action: 'Nommer un 4ème administrateur indépendant + formaliser les déclarations d\'indépendance', justification: 'Non-conformité COBAC R-2025/07 Art.5 — exposition à injonction et astreinte', cout_estime_fcfa: '15 000 000', delai: '30 jours', responsable: 'Président CA + Secrétaire Général', indicateur_succes: '4 administrateurs indépendants attestés, déclarations signées', dependances: ['Disponibilité candidats qualifiés'] },
        { id: 'REC-002', priorite: 'P0', action: 'Mettre en place la procédure de déclaration de soupçons automatisée (Workflow DS GABAC)', justification: 'Délai moyen DS 12 jours vs 5 requis — risque amende GABAC immédiat', cout_estime_fcfa: '45 000 000', delai: '45 jours', responsable: 'CCO (intérim) + DSI', indicateur_succes: 'Délai moyen DS < 5 jours ouvrés, workflow n8n actif', dependances: ['Workflow n8n DS', 'Formation équipe compliance'] },
        { id: 'REC-003', priorite: 'P0', action: 'Soumettre le rapport grands risques T1 2026 à la BEAC sous 5 jours', justification: 'Retard de 70 jours — pénalité BEAC imminente', cout_estime_fcfa: '5 000 000', delai: '5 jours', responsable: 'DFC + Responsable Reporting', indicateur_succes: 'Accusé réception BEAC reçu', dependances: ['Extraction données Core Banking'] },
        { id: 'REC-004', priorite: 'P1', action: 'Recruter un Chief Compliance Officer permanent', justification: 'Vacance poste CCO depuis 8 mois — fragilité structurelle conformité', cout_estime_fcfa: '35 000 000', delai: '60 jours', responsable: 'DRH + DG', indicateur_succes: 'CCO nommé, fiche de poste validée CA, reporting direct CA', dependances: ['Process recrutement', 'Validation COBAC profil'] },
        { id: 'REC-005', priorite: 'P1', action: 'Déployer le plan de formation LBC/FT pour les 456 collaborateurs non formés', justification: 'Taux de formation 62% — obligation COBAC 100%', cout_estime_fcfa: '30 000 000', delai: '90 jours', responsable: 'CCO + DRH', indicateur_succes: 'Taux formation > 95%, attestations archivées', dependances: ['Plateforme LMS', 'Créneaux formation'] },
        { id: 'REC-006', priorite: 'P2', action: 'Mettre en place le reporting BEAC automatisé (Workflow Reporting BEAC)', justification: 'Retards récurrents — risque pénalités cumulatives', cout_estime_fcfa: '25 000 000', delai: '60 jours', responsable: 'DFC + DSI', indicateur_succes: '3 rapports trimestriels soumis à J+15 sans retard', dependances: ['Workflow n8n Reporting BEAC'] },
        { id: 'REC-007', priorite: 'P2', action: 'Renforcer la classification des risques LBC/FT avec matrices clients/produits/zones', justification: 'Classification incomplète — exigence COBAC R-2026/03 Art.7', cout_estime_fcfa: '20 000 000', delai: '60 jours', responsable: 'CCO + Risk Manager', indicateur_succes: 'Matrice risques couvrant 100% clients/produits/zones', dependances: ['Workflow n8n Classification'] },
        { id: 'REC-008', priorite: 'P3', action: 'Étendre la couverture d\'audit interne à 100% du plan annuel', justification: 'Couverture 2025 à 85% — objectif COBAC 100%', cout_estime_fcfa: '10 000 000', delai: '120 jours', responsable: 'Responsable Audit Interne', indicateur_succes: 'Plan 2026 couvert à 100%', dependances: ['Recrutement auditeur supplémentaire'] },
      ],
      priorisation: 'Matrice Impact × Urgence × Coût — Score pondéré automatisé',
      plan_action: {
        phases: [
          { phase: 'Phase 0 — Urgence Immédiate (J0-J5)', duree: '5 jours', actions: ['Soumettre rapport grands risques BEAC', 'Activer cellule crise conformité'], livrables: ['Accusé réception BEAC', 'PV cellule crise'] },
          { phase: 'Phase 1 — Remédiation Critique (J5-J45)', duree: '40 jours', actions: ['Nommer 4ème administrateur indépendant', 'Déployer workflow DS GABAC', 'Lancer recrutement CCO'], livrables: ['CA conforme', 'Workflow DS opérationnel', 'Fiche poste CCO publiée'] },
          { phase: 'Phase 2 — Rattrapage (J45-J90)', duree: '45 jours', actions: ['Déployer formation LBC/FT', 'Déployer workflow Reporting BEAC', 'Renforcer classification risques'], livrables: ['Taux formation > 95%', '3 rapports BEAC soumis', 'Matrice risques complète'] },
          { phase: 'Phase 3 — Consolidation (J90-J180)', duree: '90 jours', actions: ['Audit interne 100% couverture', 'Revue annuelle dispositif', 'Préparation prochaine inspection COBAC'], livrables: ['Plan audit 100% couvert', 'Rapport conformité consolidé', 'Dossier inspection prêt'] },
        ],
        jalons_cles: [
          { jalon: 'J+5 : BEAC conforme', date: '2026-07-01', critere_succes: 'Rapport grands risques accepté BEAC' },
          { jalon: 'J+30 : CA conforme', date: '2026-07-26', critere_succes: '4 administrateurs indépendants attestés' },
          { jalon: 'J+45 : DS conforme', date: '2026-08-10', critere_succes: 'Workflow DS actif, délai < 5 jours' },
          { jalon: 'J+90 : Formation OK', date: '2026-09-24', critere_succes: 'Taux formation LBC/FT > 95%' },
          { jalon: 'J+180 : Conformité globale', date: '2026-12-23', critere_succes: 'Score conformité > 75/100' },
        ],
      },
      cout_total_estime_fcfa: '185 000 000',
      delai_mise_conformite_jours: 180,
    },
    lead_conversion_trigger: {
      score_lead: 92,
      classification: 'Chaud',
      actions_auto: [
        { etape: 1, action_type: 'notification', description: 'Alerte immédiate équipe commerciale', declencheur: 'Score pipeline > 85 + P0 >= 3', delai: 'Immédiat', contenu: 'Lead chaud — 3 gaps P0 — Score inspection 41/100 — Opportunité 185M FCFA' },
        { etape: 2, action_type: 'email', description: 'Email personnalisé au DG avec résumé exécutif', declencheur: 'Pipeline complété', delai: 'J+0', contenu: 'Objet : Votre diagnostic conformité automatisé — 3 urgences critiques' },
        { etape: 3, action_type: 'rdv', description: 'Proposition automatique de rendez-vous avec Senior Partner', declencheur: 'Email ouvert', delai: 'J+1', contenu: 'Calendly embed — créneau 45min avec Senior Partner Conformité' },
        { etape: 4, action_type: 'sms', description: 'SMS de rappel si pas de réponse sous 48h', declencheur: 'RDV non pris après 48h', delai: 'J+3', contenu: 'KHEPRA EXPERTS — Votre audit conformité est prêt. Plan de remédiation 180 jours. Prenez RDV : [lien]' },
        { etape: 5, action_type: 'webhook', description: 'Création automatique opportunité CRM', declencheur: 'Pipeline complété', delai: 'Immédiat', contenu: 'POST CRM — Opportunité 185M FCFA, close date J+180, probabilité 65%' },
      ],
      donnees_crm: {
        entreprise: 'Banque Atlantique Cameroun SA',
        contact_principal: 'Jean-Marc EBANGA — Président CA',
        telephone: '+237 6XX XXX XXX',
        email: 'jm.ebanga@banque-atlantique.cm',
        opportunite_fcfa: '185 000 000',
        probabilite_close_pct: 65,
        date_close_prevue: '2026-07-15',
      },
      taux_conversion_estime: 65,
    },
    metadata: {
      pipeline_id: 'ACP-2026-0624-001',
      date_execution: '2026-06-24T08:03:30Z',
      duree_totale_s: 45.2,
      score_efficacite_automatisation: 94,
      interventions_humaines: 0,
      mode: 'MOCK — Démo Interactive Autonomous Pipeline',
      version_pipeline: 'v1.0',
    },
  },

  // ─── ACP-002 : CREC Gabon ───
  {
    scenario: PIPELINE_SCENARIOS[1],
    input_intake: {
      date_soumission: '2026-06-24T08:10:00Z',
      canal: 'Upload CSV',
      documents_fournis: ['Rapport annuel 2025 (PDF)', 'Statuts (PDF)', 'Registre membres CA (XLSX)'],
      validation_auto: { completude: 45, erreurs_detectees: 5, statut: 'Partiel', temps_traitement_ms: 1800 },
      extraction_donnees: {
        'raison_sociale': 'CREC Gabon',
        'agrement_cobac': 'AGR-2015-GA-078',
        'date_constitution': '2015-06-01',
        'capital_social_fcfa': '1 200 000 000',
        'siege_social': 'Libreville — Akanda',
        'president_ca': 'Poste vacant (démission 2023)',
      },
    },
    regulatory_interpretation: {
      textes_applicables: [
        { reference: 'COBAC R-2026/03', intitule: 'Règlement LBC/FT', emetteur: 'COBAC', date_effet: '2026-01-01', articles_pertinents: ['Art.7', 'Art.12', 'Art.22'], niveau_impact: 'Critique' },
        { reference: 'COBAC R-2025/07', intitule: 'Gouvernance', emetteur: 'COBAC', date_effet: '2025-07-01', articles_pertinents: ['Art.5', 'Art.14'], niveau_impact: 'Critique' },
        { reference: 'GABAC n°01/2026', intitule: 'Directive DS', emetteur: 'GABAC', date_effet: '2026-02-15', articles_pertinents: ['Art.4'], niveau_impact: 'Élevé' },
      ],
      obligations_identifiees: [
        { id: 'OBL-101', description: 'Rédiger et adopter une politique LBC/FT documentée', source: 'COBAC R-2026/03 Art.7', echeance: 'Immédiat', statut: 'Non Conforme', preuve_requise: 'Politique LBC/FT signée CA', criticite: 100 },
        { id: 'OBL-102', description: 'Constituer un registre des bénéficiaires effectifs', source: 'COBAC R-2026/03 Art.12', echeance: 'Immédiat', statut: 'Non Conforme', preuve_requise: 'Registre BE avec pièces justificatives', criticite: 100 },
        { id: 'OBL-103', description: 'Régulariser la composition du CA (président + membres)', source: 'COBAC R-2025/07 Art.5', echeance: 'Dépassée', statut: 'Non Conforme', preuve_requise: 'PV AG nomination', criticite: 100 },
      ],
      matrice_applicabilite: [
        { texte: 'COBAC R-2026/03', articles: [{ ref: 'Art.7', applicable: true, justification: 'EMF catégorie 1 — obligation complète' }] },
      ],
      alertes_reglementaires: [
        { type: 'urgence', message: 'Absence politique LBC/FT — violation flagrante COBAC R-2026/03 Art.7', date: '2026-06-24', source: 'KOS Pipeline' },
        { type: 'alerte', message: 'CA non statutaire depuis 2023 — plus de 3 ans de non-conformité', date: '2026-06-24', source: 'KOS Pipeline' },
      ],
      score_interpretation: 88,
    },
    risk_scoring: {
      score_brut: 28,
      score_residuel: 12,
      seuil_critique: 50,
      classification: 'Critique',
      breakdown: [
        { axe: 'Gouvernance', poids_pct: 30, score: 10, niveau: 'Défaillance critique', observations: 'CA non statutaire depuis 2023. Aucun comité spécialisé fonctionnel.' },
        { axe: 'LBC/FT', poids_pct: 40, score: 5, niveau: 'Défaillance critique', observations: 'Absence totale de politique LBC/FT, registre BE, procédure DS.' },
        { axe: 'Contrôle Interne', poids_pct: 30, score: 20, niveau: 'Défaillant', observations: 'Pas de fonction audit interne formalisée. Contrôle caisse manuel uniquement.' },
      ],
      heatmap_data: [
        { risque: 'Retrait agrément COBAC', probabilite: 70, impact: 100, score: 70, quadrant: 'Rouge' },
        { risque: 'Sanction pénale dirigeants LBC/FT', probabilite: 60, impact: 100, score: 60, quadrant: 'Rouge' },
        { risque: 'Fermeture administrative', probabilite: 50, impact: 100, score: 50, quadrant: 'Orange' },
      ],
      tendances: [
        { periode: 'T1 2025', score: 20, variation_pct: 0, direction: 'stable' },
        { periode: 'T4 2025', score: 15, variation_pct: -25, direction: 'down' },
        { periode: 'T1 2026', score: 12, variation_pct: -20, direction: 'down' },
      ],
    },
    gap_detection: {
      gaps_identifies: [
        { id: 'GAP-101', domaine: 'LBC/FT — Politique', description: 'Absence totale de politique LBC/FT documentée', situation_actuelle: 'Aucun document', situation_requise: 'Politique LBC/FT écrite, adoptée CA, diffusée', reference_reglementaire: 'COBAC R-2026/03 Art.7', severite: 'Critique', impact_potentiel: 'Retrait agrément + sanctions pénales', preuve_absence: 'Aucun document fourni, confirmé par DG' },
        { id: 'GAP-102', domaine: 'Gouvernance — CA', description: 'CA sans président depuis 2023, non statutaire', situation_actuelle: 'CA incomplet, pas de président', situation_requise: 'CA complet avec président nommé', reference_reglementaire: 'COBAC R-2025/07 Art.5', severite: 'Critique', impact_potentiel: 'Injonction COBAC + mise sous administration provisoire', preuve_absence: 'PV AG 2023 constatant démission président, jamais remplacé' },
      ],
      score_conformite_actuel: 22,
      score_conformite_cible: 100,
      ecart_total: 78,
      gaps_par_priorite: { p0: 5, p1: 3, p2: 2, p3: 0 },
    },
    workflow_generation: {
      workflows: [
        { id: 'WF-101', nom: 'Création Politique LBC/FT Assistée', description: 'Génération automatique politique LBC/FT EMF', declencheur: 'Manuel — Validation DG', nombre_noeuds: 8, score_automatisation: 85, temps_execution_moyen_s: 5, dependances: ['Template EMF', 'COBAC R-2026/03'], json_export: '{"name":"KOS-LBCFT-Policy-Gen","nodes":[...]}' },
        { id: 'WF-102', nom: 'Onboarding Registre BE', description: 'Workflow de collecte et validation BE', declencheur: 'Nouveau client ou revue annuelle', nombre_noeuds: 14, score_automatisation: 88, temps_execution_moyen_s: 7, dependances: ['KYC Form', 'Base Clients'], json_export: '{"name":"KOS-BE-Registry","nodes":[...]}' },
      ],
      score_automatisation: 86, temps_generation_secondes: 2.1, workflow_count: 2, couverture_processus_pct: 65,
    },
    ai_audit_simulation: {
      date_simulation: '2026-06-24T08:11:00Z',
      auditeur_virtuel: 'KOS Senior Compliance Auditor™ v3.2 — Spécialisé EMF CEMAC',
      score_inspection_simule: 18,
      constats: [
        { id: 'F-101', gravite: 'Critique', description: 'Absence totale de dispositif LBC/FT — violation COBAC R-2026/03', article_viole: 'COBAC R-2026/03 Art.7', sanction_potentielle: 'Retrait agrément + sanctions pénales dirigeants', montant_risque_fcfa: '500 000 000 FCFA', probabilite_detection_pct: 100 },
        { id: 'F-102', gravite: 'Critique', description: 'CA non constitué depuis 2023 — violation gouvernance', article_viole: 'COBAC R-2025/07 Art.5', sanction_potentielle: 'Mise sous administration provisoire COBAC', montant_risque_fcfa: '200 000 000 FCFA', probabilite_detection_pct: 100 },
      ],
      points_fort: ['Équipe terrain motivée', 'Présence locale reconnue'],
      zones_exposition: ['Risque existentiel — retrait agrément possible', 'Responsabilité pénale dirigeants', 'Perte de confiance bailleurs et clients'],
      probabilite_sanction_pct: 95,
      duree_simulation_s: 2.8,
    },
    report_generation: {
      rapport_id: 'RPT-2026-ACP002-0624', date_generation: '2026-06-24T08:12:00Z', format: 'PDF', pages: 28,
      sections: [
        { numero: 1, titre: 'Résumé Exécutif — Alerte Rouge', pages: '1-3', contenu_resume: 'Score 18/100 — DÉFAILLANCE CRITIQUE. Risque existentiel. Plan de sauvetage urgent requis.', graphiques_inclus: ['Jauge conformité critique'] },
        { numero: 2, titre: 'Gouvernance — État des Lieux', pages: '4-10', contenu_resume: 'CA inexistant depuis 2023. Aucun comité. Aucune ligne de défense.', graphiques_inclus: ['Organigramme vide'] },
        { numero: 3, titre: 'LBC/FT — Désert Conformité', pages: '11-18', contenu_resume: 'Zéro politique, zéro registre BE, zéro procédure DS.', graphiques_inclus: ['Checklist 0/10'] },
        { numero: 4, titre: 'Plan de Sauvetage — 90 Jours', pages: '19-26', contenu_resume: 'Budget 95M FCFA. 8 actions P0. Survie de l\'institution en jeu.', graphiques_inclus: ['Roadmap survie 90j'] },
        { numero: 5, titre: 'Annexes', pages: '27-28', contenu_resume: 'Références COBAC, modèles documents.', graphiques_inclus: [] },
      ],
      score_conformite_global: 18, temps_generation_s: 4.2, taille_fichier: '2.1 Mo',
    },
    recommendation_engine: {
      recommandations: [
        { id: 'REC-101', priorite: 'P0', action: 'Convoquer AG extraordinaire pour reconstituer le CA', justification: 'CA inexistant depuis 2023 — urgence absolue', cout_estime_fcfa: '5 000 000', delai: '15 jours', responsable: 'Actionnaires + DG', indicateur_succes: 'CA constitué, PV AG transmis COBAC', dependances: ['Disponibilité actionnaires'] },
        { id: 'REC-102', priorite: 'P0', action: 'Rédiger et adopter la politique LBC/FT avec template automatisé', justification: 'Absence totale — violation COBAC R-2026/03', cout_estime_fcfa: '15 000 000', delai: '30 jours', responsable: 'DG + Consultant externe', indicateur_succes: 'Politique LBC/FT signée, diffusée', dependances: ['CA constitué'] },
        { id: 'REC-103', priorite: 'P0', action: 'Mettre en place le registre BE via workflow automatisé', justification: 'Obligation COBAC immédiate', cout_estime_fcfa: '25 000 000', delai: '45 jours', responsable: 'Responsable Conformité', indicateur_succes: 'Registre BE complet', dependances: ['Workflow BE'] },
      ],
      priorisation: 'Survie institutionnelle — Tout est P0',
      plan_action: {
        phases: [
          { phase: 'Phase Survie (J0-J30)', duree: '30 jours', actions: ['Reconstituer CA', 'Adopter politique LBC/FT', 'Notifier COBAC du plan'], livrables: ['CA fonctionnel', 'Politique LBC/FT'] },
          { phase: 'Phase Rattrapage (J30-J90)', duree: '60 jours', actions: ['Registre BE', 'Procédure DS', 'Formation LBC/FT', 'Audit interne'], livrables: ['Registre BE', 'Procédure DS', 'Plan formation'] },
        ],
        jalons_cles: [
          { jalon: 'CA reconstitué', date: '2026-07-10', critere_succes: 'PV AG transmis COBAC' },
          { jalon: 'Politique LBC/FT adoptée', date: '2026-07-25', critere_succes: 'Document signé CA' },
          { jalon: 'Conformité minimale', date: '2026-09-24', critere_succes: 'Score > 50/100' },
        ],
      },
      cout_total_estime_fcfa: '95 000 000', delai_mise_conformite_jours: 90,
    },
    lead_conversion_trigger: {
      score_lead: 98, classification: 'Chaud',
      actions_auto: [
        { etape: 1, action_type: 'notification', description: 'Alerte URGENCE Partner COBAC', declencheur: 'Score < 25', delai: 'Immédiat', contenu: 'URGENCE — CREC Gabon — Score 18/100 — Risque retrait agrément' },
        { etape: 2, action_type: 'sms', description: 'SMS DG KHEPRA', declencheur: 'Pipeline complété', delai: 'Immédiat', contenu: 'URGENCE COBAC — CREC Gabon score 18/100. Contact DG [tel]' },
        { etape: 3, action_type: 'rdv', description: 'RDV urgent Partner', declencheur: 'J+0', delai: 'J+0', contenu: 'Créneau urgence 60min — Président KHEPRA' },
      ],
      donnees_crm: { entreprise: 'CREC Gabon', contact_principal: 'DG CREC Gabon', telephone: '+241 XX XX XX XX', email: 'dg@crec-gabon.ga', opportunite_fcfa: '95 000 000', probabilite_close_pct: 85, date_close_prevue: '2026-07-05' },
      taux_conversion_estime: 85,
    },
    metadata: { pipeline_id: 'ACP-2026-0624-002', date_execution: '2026-06-24T08:12:30Z', duree_totale_s: 32.1, score_efficacite_automatisation: 91, interventions_humaines: 0, mode: 'MOCK', version_pipeline: 'v1.0' },
  },

  // ─── ACP-003 : PayCEMAC SA ───
  {
    scenario: PIPELINE_SCENARIOS[2],
    input_intake: {
      date_soumission: '2026-06-24T08:20:00Z', canal: 'API', documents_fournis: ['Technical Architecture Doc (PDF)', 'API Docs (JSON)', 'Politique KYC (PDF)', 'Registre BE (CSV)'], validation_auto: { completude: 78, erreurs_detectees: 1, statut: 'Partiel', temps_traitement_ms: 950 }, extraction_donnees: { 'raison_sociale': 'PayCEMAC SA', 'agrement_cobac': 'AGR-2022-CG-112', 'date_constitution': '2022-01-20', 'capital_social_fcfa': '800 000 000', 'siege_social': 'Brazzaville — Centre-Ville' },
    },
    regulatory_interpretation: {
      textes_applicables: [
        { reference: 'COBAC R-2026/03', intitule: 'Règlement LBC/FT', emetteur: 'COBAC', date_effet: '2026-01-01', articles_pertinents: ['Art.7', 'Art.12', 'Art.15'], niveau_impact: 'Critique' },
        { reference: 'Sécurité SI CEMAC', intitule: 'Directive Cybersécurité', emetteur: 'COBAC/BEAC', date_effet: '2026-04-01', articles_pertinents: ['Pentest annuel', 'PCA/PRA', 'RBAC'], niveau_impact: 'Élevé' },
        { reference: 'GAFI 2026 FinTech', intitule: 'Guide GAFI FinTech & Nouveaux Paiements', emetteur: 'GAFI', date_effet: '2026-03-15', articles_pertinents: ['KYC digital', 'Screening temps réel'], niveau_impact: 'Modéré' },
      ],
      obligations_identifiees: [
        { id: 'OBL-201', description: 'Documenter la gouvernance : CA, comités, lignes de défense', source: 'COBAC R-2025/07', echeance: '2026-09-30', statut: 'Non Conforme', preuve_requise: 'PV CA, chartes comités', criticite: 90 },
        { id: 'OBL-202', description: 'Réaliser un pentest annuel certifié', source: 'Sécurité SI CEMAC', echeance: '2026-12-31', statut: 'Partiellement Conforme', preuve_requise: 'Rapport pentest externe', criticite: 85 },
        { id: 'OBL-203', description: 'Maintenir le registre BE à jour', source: 'COBAC R-2026/03 Art.12', echeance: 'Continu', statut: 'Conforme', preuve_requise: 'Registre BE + API vérification', criticite: 90 },
      ],
      matrice_applicabilite: [{ texte: 'COBAC R-2026/03', articles: [{ ref: 'Art.7', applicable: true, justification: 'FinTech de paiement — obligation KYC/CDD digital' }] }],
      alertes_reglementaires: [{ type: 'information', message: 'COBAC prépare un cadre FinTech spécifique — veille recommandée', date: '2026-06-20', source: 'Veille COBAC' }],
      score_interpretation: 92,
    },
    risk_scoring: {
      score_brut: 45, score_residuel: 38, seuil_critique: 50, classification: 'Modéré',
      breakdown: [
        { axe: 'Gouvernance', poids_pct: 25, score: 30, niveau: 'Insuffisant', observations: 'CA informel, pas de comités formalisés, pas de CCO nommé' },
        { axe: 'LBC/FT', poids_pct: 30, score: 55, niveau: 'Partiel', observations: 'KYC digital OK, BE OK, mais politique non documentée et pas de procédure DS' },
        { axe: 'Sécurité SI', poids_pct: 25, score: 45, niveau: 'Partiel', observations: 'Infrastructure solide mais pentest non réalisé en 2026' },
        { axe: 'Reporting', poids_pct: 20, score: 50, niveau: 'Partiel', observations: 'API analytics OK, reporting réglementaire non formalisé' },
      ],
      heatmap_data: [
        { risque: 'Sanction gouvernance', probabilite: 75, impact: 85, score: 63.75, quadrant: 'Orange' },
        { risque: 'Faille cybersécurité', probabilite: 40, impact: 90, score: 36, quadrant: 'Jaune' },
        { risque: 'Conformité LBC/FT documentaire', probabilite: 60, impact: 70, score: 42, quadrant: 'Orange' },
      ],
      tendances: [{ periode: 'T1 2026', score: 42, variation_pct: 0, direction: 'stable' }, { periode: 'T2 2026', score: 38, variation_pct: -9.5, direction: 'down' }],
    },
    gap_detection: {
      gaps_identifies: [
        { id: 'GAP-201', domaine: 'Gouvernance', description: 'Absence de CA formel, comités spécialisés, lignes de défense', situation_actuelle: 'DG + CTO seuls décideurs', situation_requise: 'CA constitué, comités (audit, risques), 3 lignes défense', reference_reglementaire: 'COBAC R-2025/07', severite: 'Élevé', impact_potentiel: 'Injonction COBAC, blocage expansion', preuve_absence: 'Aucun PV CA, aucun comité' },
        { id: 'GAP-202', domaine: 'Sécurité SI', description: 'Pentest 2026 non réalisé', situation_actuelle: 'Dernier pentest : T3 2025', situation_requise: 'Pentest annuel certifié', reference_reglementaire: 'Sécurité SI CEMAC', severite: 'Élevé', impact_potentiel: 'Non-conformité SI, risque cyber', preuve_absence: 'Pas de rapport pentest 2026' },
        { id: 'GAP-203', domaine: 'LBC/FT — Documentation', description: 'Politique LBC/FT non documentée', situation_actuelle: 'Process KYC digital mais non documenté', situation_requise: 'Politique LBC/FT écrite, approuvée CA', reference_reglementaire: 'COBAC R-2026/03 Art.7', severite: 'Modéré', impact_potentiel: 'Observation inspection', preuve_absence: 'Pas de document politique LBC/FT' },
      ],
      score_conformite_actuel: 48, score_conformite_cible: 100, ecart_total: 52, gaps_par_priorite: { p0: 1, p1: 3, p2: 2, p3: 1 },
    },
    workflow_generation: {
      workflows: [
        { id: 'WF-201', nom: 'Formalisation Gouvernance FinTech', description: 'Génération automatique chartes CA, comités, lignes de défense', declencheur: 'Validation DG', nombre_noeuds: 12, score_automatisation: 90, temps_execution_moyen_s: 4, dependances: ['Template FinTech'], json_export: '{"name":"KOS-FinTech-Gov","nodes":[...]}' },
        { id: 'WF-202', nom: 'Rappel Pentest Annuel', description: 'Workflow planification et validation pentest', declencheur: 'Cron annuel + 6 mois avant échéance', nombre_noeuds: 8, score_automatisation: 95, temps_execution_moyen_s: 2, dependances: ['Calendrier'], json_export: '{"name":"KOS-Pentest-Reminder","nodes":[...]}' },
      ],
      score_automatisation: 93, temps_generation_secondes: 1.8, workflow_count: 2, couverture_processus_pct: 72,
    },
    ai_audit_simulation: {
      date_simulation: '2026-06-24T08:21:00Z', auditeur_virtuel: 'KOS Senior Auditor FinTech™ v3.2', score_inspection_simule: 42,
      constats: [
        { id: 'F-201', gravite: 'Élevé', description: 'Gouvernance inexistante formellement', article_viole: 'COBAC R-2025/07', sanction_potentielle: 'Injonction + restriction activités', montant_risque_fcfa: '75 000 000 FCFA', probabilite_detection_pct: 85 },
        { id: 'F-202', gravite: 'Modéré', description: 'Pentest 2026 non planifié', article_viole: 'Sécurité SI CEMAC', sanction_potentielle: 'Observation inspection', montant_risque_fcfa: '30 000 000 FCFA', probabilite_detection_pct: 70 },
      ],
      points_fort: ['KYC digital robuste', 'API sécurisée', 'Registre BE conforme', 'Équipe tech compétente'], zones_exposition: ['Gouvernance formelle à construire', 'Documentation réglementaire lacunaire', 'Reporting COBAC non structuré'],
      probabilite_sanction_pct: 60, duree_simulation_s: 3.1,
    },
    report_generation: {
      rapport_id: 'RPT-2026-ACP003-0624', date_generation: '2026-06-24T08:22:00Z', format: 'PDF', pages: 32,
      sections: [
        { numero: 1, titre: 'Résumé Exécutif', pages: '1-3', contenu_resume: 'Score 42/100 — INSUFFISANT. Atouts tech réels, gouvernance à bâtir. Plan 120 jours.', graphiques_inclus: ['Score radar'] },
        { numero: 2, titre: 'Gouvernance FinTech', pages: '4-10', contenu_resume: 'De zéro à conforme : roadmap gouvernance complète', graphiques_inclus: ['Architecture cible'] },
        { numero: 3, titre: 'Infrastructure Technique & KYC', pages: '11-18', contenu_resume: 'Points forts tech, lacunes documentaires', graphiques_inclus: ['Architecture API'] },
        { numero: 4, titre: 'Plan d\'Action 120 Jours', pages: '19-30', contenu_resume: 'Budget 95M FCFA, 7 actions priorisées', graphiques_inclus: ['Roadmap', 'Budget'] },
        { numero: 5, titre: 'Annexes', pages: '31-32', contenu_resume: 'Références COBAC FinTech', graphiques_inclus: [] },
      ],
      score_conformite_global: 42, temps_generation_s: 4.8, taille_fichier: '2.8 Mo',
    },
    recommendation_engine: {
      recommandations: [
        { id: 'REC-201', priorite: 'P0', action: 'Constituer le CA formel avec 3 administrateurs indépendants', justification: 'Exigence COBAC — prérequis à toute autre action', cout_estime_fcfa: '10 000 000', delai: '30 jours', responsable: 'Fondateurs', indicateur_succes: 'CA constitué, PV AG', dependances: ['Identification administrateurs qualifiés'] },
        { id: 'REC-202', priorite: 'P1', action: 'Documenter la politique LBC/FT et le dispositif KYC', justification: 'Process KYC existe mais non documenté', cout_estime_fcfa: '20 000 000', delai: '45 jours', responsable: 'CCO (à nommer)', indicateur_succes: 'Politique LBC/FT signée', dependances: ['CA constitué'] },
        { id: 'REC-203', priorite: 'P1', action: 'Planifier et exécuter le pentest annuel 2026', justification: 'Obligation réglementaire SI CEMAC', cout_estime_fcfa: '35 000 000', delai: '60 jours', responsable: 'CTO', indicateur_succes: 'Rapport pentest externe reçu', dependances: ['Sélection prestataire'] },
        { id: 'REC-204', priorite: 'P2', action: 'Mettre en place le reporting COBAC trimestriel automatisé', justification: 'Reporting non structuré actuellement', cout_estime_fcfa: '15 000 000', delai: '90 jours', responsable: 'CCO + CTO', indicateur_succes: 'Premier rapport trimestriel soumis', dependances: ['Workflow n8n'] },
      ],
      priorisation: 'Build governance first, then document, then automate',
      plan_action: {
        phases: [
          { phase: 'Phase 1 — Fondations (J0-J30)', duree: '30 jours', actions: ['Constituer CA', 'Nommer CCO', 'Lancer recrutement auditeurs'], livrables: ['CA formel', 'CCO nommé'] },
          { phase: 'Phase 2 — Documentation (J30-J75)', duree: '45 jours', actions: ['Politique LBC/FT', 'Chartes comités', 'Pentest'], livrables: ['Politiques signées', 'Rapport pentest'] },
          { phase: 'Phase 3 — Automatisation (J75-J120)', duree: '45 jours', actions: ['Workflow reporting', 'Automatisation KYC', 'Dashboard conformité'], livrables: ['Reporting automatisé', 'Dashboard live'] },
        ],
        jalons_cles: [
          { jalon: 'CA constitué', date: '2026-07-25', critere_succes: 'PV AG transmis COBAC' },
          { jalon: 'Politiques documentées', date: '2026-09-08', critere_succes: 'Politique LBC/FT signée' },
          { jalon: 'Conformité > 75%', date: '2026-10-24', critere_succes: 'Score conformité > 75/100' },
        ],
      },
      cout_total_estime_fcfa: '95 000 000', delai_mise_conformite_jours: 120,
    },
    lead_conversion_trigger: {
      score_lead: 78, classification: 'Chaud',
      actions_auto: [
        { etape: 1, action_type: 'notification', description: 'Alerte équipe FinTech', declencheur: 'Pipeline complété', delai: 'Immédiat', contenu: 'PayCEMAC — Score 48/100 — Opportunité 95M FCFA' },
        { etape: 2, action_type: 'email', description: 'Email personnalisé CTO + DG', declencheur: 'J+0', delai: 'J+0', contenu: 'Objet : Votre roadmap conformité FinTech COBAC' },
        { etape: 3, action_type: 'rdv', description: 'Proposition RDV technique', declencheur: 'Email ouvert', delai: 'J+1', contenu: 'Calendly — 45min Partner FinTech' },
      ],
      donnees_crm: { entreprise: 'PayCEMAC SA', contact_principal: 'CTO PayCEMAC', telephone: '+242 XX XXX XX', email: 'cto@paycemac.cg', opportunite_fcfa: '95 000 000', probabilite_close_pct: 55, date_close_prevue: '2026-07-20' },
      taux_conversion_estime: 55,
    },
    metadata: { pipeline_id: 'ACP-2026-0624-003', date_execution: '2026-06-24T08:22:30Z', duree_totale_s: 28.5, score_efficacite_automatisation: 93, interventions_humaines: 0, mode: 'MOCK', version_pipeline: 'v1.0' },
  },

  // ─── ACP-004 : Groupe Bancaire Panafricain ───
  {
    scenario: PIPELINE_SCENARIOS[3],
    input_intake: {
      date_soumission: '2026-06-24T08:30:00Z', canal: 'Portail Web', documents_fournis: ['Rapports annuels consolidés 2025 (PDF ×12)', 'Organigrammes filiales (PDF ×12)', 'Politiques LBC/FT groupe (PDF)', 'Registres BE consolidés (CSV)', 'Rapports BEAC trimestriels 2025 (PDF ×4 par filiale)', 'Rapports BCEAO semestriels 2025 (PDF ×2 par filiale)', 'Rapports audit interne consolidés (PDF)'], validation_auto: { completude: 92, erreurs_detectees: 0, statut: 'Valide', temps_traitement_ms: 5600 }, extraction_donnees: { 'raison_sociale': 'Groupe Bancaire Panafricain Holding SA', 'agrement': 'Multi-juridictionnel COBAC + BCEAO', 'filiales': '12 dans 10 pays', 'actif_consolide_fcfa': '3 200 000 000 000', 'effectif_total': 8500 },
    },
    regulatory_interpretation: {
      textes_applicables: [
        { reference: 'COBAC R-2026/03', intitule: 'LBC/FT', emetteur: 'COBAC', date_effet: '2026-01-01', articles_pertinents: ['Art.7', 'Art.12', 'Art.15', 'Art.22'], niveau_impact: 'Critique' },
        { reference: 'BCEAO Instruction n°008-05-2015', intitule: 'Émetteurs de Monnaie Électronique (EME) UEMOA', emetteur: 'BCEAO', date_effet: '2015-05-01', articles_pertinents: ['Art.3', 'Art.7'], niveau_impact: 'Critique' },
        { reference: 'BEAC n°008-2026', intitule: 'Reporting prudentiel', emetteur: 'BEAC', date_effet: '2026-03-01', articles_pertinents: ['Art.3', 'Art.7'], niveau_impact: 'Critique' },
        { reference: 'GABAC n°01/2026', intitule: 'Directive DS', emetteur: 'GABAC', date_effet: '2026-02-15', articles_pertinents: ['Art.4'], niveau_impact: 'Élevé' },
        { reference: 'OHADA AUSCGIE', intitule: 'Acte Uniforme Sociétés Commerciales', emetteur: 'OHADA', date_effet: '2014-05-01', articles_pertinents: ['Art.414-450', 'Art.531-553'], niveau_impact: 'Modéré' },
        { reference: 'ISO 31000', intitule: 'Management du risque', emetteur: 'ISO', date_effet: '2018-02-01', articles_pertinents: ['Cadre risque groupe'], niveau_impact: 'Modéré' },
      ],
      obligations_identifiees: [
        { id: 'OBL-301', description: 'Harmoniser les politiques LBC/FT dans toutes les filiales', source: 'COBAC R-2026/03 + BCEAO', echeance: '2026-12-31', statut: 'Partiellement Conforme', preuve_requise: 'Politiques harmonisées signées par chaque CA filiale', criticite: 95 },
        { id: 'OBL-302', description: 'Consolider le reporting prudentiel multi-juridictionnel', source: 'BEAC + BCEAO', echeance: 'Trimestriel', statut: 'Partiellement Conforme', preuve_requise: 'Tableau de bord consolidé', criticite: 90 },
        { id: 'OBL-303', description: 'Assurer l\'indépendance des CA dans chaque filiale', source: 'COBAC R-2025/07 + OHADA', echeance: '2026-06-30', statut: 'Partiellement Conforme', preuve_requise: 'Déclarations d\'indépendance par filiale', criticite: 85 },
        { id: 'OBL-304', description: 'Déployer un cadre de gestion des risques groupe (ISO 31000)', source: 'COBAC + ISO 31000', echeance: '2026-12-31', statut: 'Partiellement Conforme', preuve_requise: 'Cadre risque groupe documenté', criticite: 80 },
      ],
      matrice_applicabilite: [
        { texte: 'COBAC R-2026/03', articles: [{ ref: 'Art.7', applicable: true, justification: 'Toutes filiales CEMAC concernées' }, { ref: 'Art.30', applicable: false, justification: 'Article EMF spécifique' }] },
      ],
      alertes_reglementaires: [
        { type: 'information', message: 'Harmonisation COBAC/BCEAO en discussion — impact prévu 2027', date: '2026-06-10', source: 'BEAC/BCEAO communiqué conjoint' },
        { type: 'alerte', message: '3 filiales en retard reporting BEAC T1 2026', date: '2026-06-24', source: 'KOS Pipeline multi-juridictionnel' },
      ],
      score_interpretation: 96,
    },
    risk_scoring: {
      score_brut: 72, score_residuel: 58, seuil_critique: 50, classification: 'Modéré',
      breakdown: [
        { axe: 'Gouvernance Groupe', poids_pct: 20, score: 75, niveau: 'Bon', observations: 'Structure holding solide, politiques groupe cohérentes. Indépendance variable par filiale.' },
        { axe: 'LBC/FT Multi-Juridictionnel', poids_pct: 25, score: 65, niveau: 'Partiel', observations: 'Politique groupe OK mais application hétérogène. 3 filiales non conformes.' },
        { axe: 'Reporting Consolidé', poids_pct: 20, score: 60, niveau: 'Partiel', observations: 'Reporting existe mais non harmonisé entre zones CEMAC et UEMOA.' },
        { axe: 'Contrôle Interne Groupe', poids_pct: 20, score: 70, niveau: 'Bon', observations: 'Audit interne groupe fonctionnel. Couverture 2025 à 90%.' },
        { axe: 'Sécurité SI Groupe', poids_pct: 15, score: 80, niveau: 'Bon', observations: 'Infrastructure SSI solide, PCA/PRA testé en 2025.' },
      ],
      heatmap_data: [
        { risque: 'Sanction multi-juridictionnelle', probabilite: 45, impact: 90, score: 40.5, quadrant: 'Orange' },
        { risque: 'Divergence réglementaire', probabilite: 55, impact: 75, score: 41.25, quadrant: 'Orange' },
        { risque: 'Risque réputationnel groupe', probabilite: 35, impact: 95, score: 33.25, quadrant: 'Jaune' },
      ],
      tendances: [
        { periode: 'T1 2025', score: 55, variation_pct: 0, direction: 'stable' },
        { periode: 'T4 2025', score: 62, variation_pct: +12.7, direction: 'up' },
        { periode: 'T1 2026', score: 58, variation_pct: -6.5, direction: 'down' },
      ],
    },
    gap_detection: {
      gaps_identifies: [
        { id: 'GAP-301', domaine: 'Harmonisation LBC/FT', description: 'Application hétérogène de la politique LBC/FT groupe dans les filiales', situation_actuelle: '9/12 filiales conformes, 3 en retard', situation_requise: '12/12 filiales appliquant politique groupe', reference_reglementaire: 'COBAC R-2026/03 + BCEAO', severite: 'Élevé', impact_potentiel: 'Exposition différenciée par filiale, risque inspection ciblée', preuve_absence: 'Audit interne T1 2026 : 3 filiales non conformes' },
        { id: 'GAP-302', domaine: 'Reporting Consolidé', description: 'Absence de dashboard consolidé unique multi-juridictionnel', situation_actuelle: '2 formats distincts CEMAC/UEMOA', situation_requise: 'Dashboard consolidé unique', reference_reglementaire: 'BEAC + BCEAO', severite: 'Modéré', impact_potentiel: 'Délai consolidation, risque d\'erreur', preuve_absence: 'Pas de dashboard unique existant' },
        { id: 'GAP-303', domaine: 'Indépendance CA Filiales', description: '4 filiales en dessous du seuil d\'indépendance CA', situation_actuelle: '8/12 filiales > 33%', situation_requise: '12/12 filiales > 33%', reference_reglementaire: 'COBAC R-2025/07', severite: 'Modéré', impact_potentiel: 'Observation par filiale, injonctions localisées', preuve_absence: 'PV AG filiales 2025' },
      ],
      score_conformite_actuel: 71, score_conformite_cible: 100, ecart_total: 29, gaps_par_priorite: { p0: 0, p1: 3, p2: 4, p3: 2 },
    },
    workflow_generation: {
      workflows: [
        { id: 'WF-301', nom: 'Harmonisation LBC/FT Groupe', description: 'Déploiement automatique des politiques LBC/FT dans filiales', declencheur: 'Cron trimestriel + Mise à jour politique', nombre_noeuds: 22, score_automatisation: 88, temps_execution_moyen_s: 15, dependances: ['Base documentaire groupe', 'API filiales'], json_export: '{"name":"KOS-Harmonisation-LBCFT","nodes":[...]}' },
        { id: 'WF-302', nom: 'Dashboard Consolidé Multi-Juridictionnel', description: 'Agrégation automatique reporting BEAC + BCEAO', declencheur: 'Cron J+15 post-trimestre', nombre_noeuds: 28, score_automatisation: 85, temps_execution_moyen_s: 60, dependances: ['BEAC API', 'BCEAO API', 'Data Lake groupe'], json_export: '{"name":"KOS-Consolidated-Reporting","nodes":[...]}' },
      ],
      score_automatisation: 87, temps_generation_secondes: 4.2, workflow_count: 2, couverture_processus_pct: 82,
    },
    ai_audit_simulation: {
      date_simulation: '2026-06-24T08:31:00Z', auditeur_virtuel: 'KOS Senior Auditor Groupe™ v3.2', score_inspection_simule: 68,
      constats: [
        { id: 'F-301', gravite: 'Élevé', description: '3 filiales non conformes LBC/FT — risque différencié', article_viole: 'COBAC R-2026/03', sanction_potentielle: 'Inspections ciblées COBAC filiales', montant_risque_fcfa: '250 000 000 FCFA', probabilite_detection_pct: 75 },
        { id: 'F-302', gravite: 'Modéré', description: 'Absence de dashboard consolidé — risque opérationnel', article_viole: 'BEAC/BCEAO', sanction_potentielle: 'Observation + demande mise en conformité', montant_risque_fcfa: '100 000 000 FCFA', probabilite_detection_pct: 60 },
      ],
      points_fort: ['Gouvernance holding robuste', 'Audit interne groupe mature', 'SSI groupe certifiée', 'Équipe conformité groupe experte'], zones_exposition: ['Harmonisation filiales incomplète', 'Dashboard multi-juridictionnel manquant', 'Délais reporting variables par zone'],
      probabilite_sanction_pct: 45, duree_simulation_s: 5.5,
    },
    report_generation: {
      rapport_id: 'RPT-2026-ACP004-0624', date_generation: '2026-06-24T08:32:00Z', format: 'PDF', pages: 65,
      sections: [
        { numero: 1, titre: 'Résumé Exécutif Groupe', pages: '1-5', contenu_resume: 'Score consolidé 68/100 — BON niveau mais harmonisation à finaliser. Budget 310M FCFA.', graphiques_inclus: ['Score radar groupe', 'Carte filiales'] },
        { numero: 2, titre: 'Analyse par Filiale', pages: '6-25', contenu_resume: '12 fiches filiales : gouvernance, LBC/FT, risques, reporting', graphiques_inclus: ['Heatmap 12 filiales', 'Tableaux comparatifs'] },
        { numero: 3, titre: 'Harmonisation LBC/FT', pages: '26-38', contenu_resume: 'Plan d\'harmonisation groupe avec calendrier par filiale', graphiques_inclus: ['Timeline harmonisation', 'Matrice conformité'] },
        { numero: 4, titre: 'Reporting Consolidé Multi-Juridictionnel', pages: '39-48', contenu_resume: 'Spécifications dashboard unique + workflow automatisation', graphiques_inclus: ['Architecture dashboard', 'Flux données'] },
        { numero: 5, titre: 'Gouvernance Groupe', pages: '49-56', contenu_resume: 'Indépendance CA par filiale, comités groupe, lignes de défense', graphiques_inclus: ['Structure gouvernance groupe'] },
        { numero: 6, titre: 'Plan d\'Action 180 Jours', pages: '57-63', contenu_resume: 'Budget 310M FCFA, 8 actions priorisées, 12 filiales', graphiques_inclus: ['Roadmap 180j', 'Budget par filiale'] },
        { numero: 7, titre: 'Annexes', pages: '64-65', contenu_resume: 'Références COBAC, BCEAO, BEAC, OHADA, ISO', graphiques_inclus: [] },
      ],
      score_conformite_global: 68, temps_generation_s: 8.2, taille_fichier: '6.5 Mo',
    },
    recommendation_engine: {
      recommandations: [
        { id: 'REC-301', priorite: 'P0', action: 'Lancer un plan d\'harmonisation LBC/FT dans les 3 filiales non conformes', justification: 'Risque inspection ciblée COBAC — urgence pour 3 filiales', cout_estime_fcfa: '120 000 000', delai: '90 jours', responsable: 'CCO Groupe + CCO Filiales', indicateur_succes: 'Audit interne confirme conformité 12/12 filiales', dependances: ['Budget filiales', 'Équipes locales'] },
        { id: 'REC-301b', priorite: 'P1', action: 'Déployer le dashboard consolidé multi-juridictionnel automatisé', justification: 'Gain de temps, réduction erreurs, exigence régulateurs', cout_estime_fcfa: '85 000 000', delai: '120 jours', responsable: 'DSI Groupe + DFC Groupe', indicateur_succes: 'Dashboard live, 1er rapport trimestriel consolidé', dependances: ['Workflow n8n', 'API BEAC/BCEAO'] },
        { id: 'REC-302', priorite: 'P1', action: 'Régulariser l\'indépendance CA dans les 4 filiales concernées', justification: 'Seuil COBAC 33% non atteint', cout_estime_fcfa: '60 000 000', delai: '90 jours', responsable: 'Secrétariat Général Groupe', indicateur_succes: '12/12 filiales > 33% administrateurs indépendants', dependances: ['Identification candidats'] },
        { id: 'REC-303', priorite: 'P2', action: 'Formaliser le cadre de gestion des risques groupe ISO 31000', justification: 'Alignement standards internationaux', cout_estime_fcfa: '45 000 000', delai: '180 jours', responsable: 'CRO Groupe', indicateur_succes: 'Cadre risque groupe documenté, approuvé CA', dependances: ['Consultant ISO 31000'] },
      ],
      priorisation: 'Méthode Groupe — Priorisation par criticité × nombre filiales impactées',
      plan_action: {
        phases: [
          { phase: 'Phase 1 — Urgences Filiales (J0-J30)', duree: '30 jours', actions: ['Déployer équipes conformité dans 3 filiales critiques', 'Audit initial filiales'], livrables: ['Rapport initial par filiale', 'Plan d\'action filiale'] },
          { phase: 'Phase 2 — Harmonisation (J30-J90)', duree: '60 jours', actions: ['Politiques LBC/FT harmonisées', 'Indépendance CA filiales', 'Dashboard prototype'], livrables: ['Politiques signées 12/12', 'CA conformes', 'Dashboard MVP'] },
          { phase: 'Phase 3 — Consolidation (J90-J180)', duree: '90 jours', actions: ['Dashboard production', 'Cadre risque ISO 31000', 'Audit conformité consolidé'], livrables: ['Dashboard live', 'Cadre risque groupe', 'Rapport conformité consolidé'] },
        ],
        jalons_cles: [
          { jalon: 'Filiales critiques conformes', date: '2026-07-24', critere_succes: '3 filiales auditées, plan approuvé' },
          { jalon: 'Harmonisation 12/12 filiales', date: '2026-09-22', critere_succes: 'Politiques LBC/FT signées 12/12' },
          { jalon: 'Dashboard consolidé live', date: '2026-10-22', critere_succes: 'Premier rapport trimestriel consolidé' },
          { jalon: 'Conformité groupe > 85%', date: '2026-12-22', critere_succes: 'Score consolidé > 85/100' },
        ],
      },
      cout_total_estime_fcfa: '310 000 000', delai_mise_conformite_jours: 180,
    },
    lead_conversion_trigger: {
      score_lead: 85, classification: 'Chaud',
      actions_auto: [
        { etape: 1, action_type: 'notification', description: 'Alerte Managing Partner', declencheur: 'Pipeline complété', delai: 'Immédiat', contenu: 'Groupe Panafricain — Score 71/100 — Opportunité 310M FCFA' },
        { etape: 2, action_type: 'email', description: 'Email exécutif Président Holding', declencheur: 'J+0', delai: 'J+0', contenu: 'Objet : Audit conformité consolidé — 12 filiales, 10 pays' },
        { etape: 3, action_type: 'rdv', description: 'RDV Managing Partner', declencheur: 'J+1', delai: 'J+1', contenu: 'Calendly — 90min Managing Partner + Senior Partner Conformité' },
        { etape: 4, action_type: 'webhook', description: 'Création opportunité CRM', declencheur: 'J+0', delai: 'Immédiat', contenu: 'Opportunité 310M FCFA, 12 filiales, close prévue J+30' },
      ],
      donnees_crm: { entreprise: 'Groupe Bancaire Panafricain Holding SA', contact_principal: 'Président Directeur Général', telephone: '+225 XX XX XX XX', email: 'pdg@gbp-holding.com', opportunite_fcfa: '310 000 000', probabilite_close_pct: 70, date_close_prevue: '2026-07-24' },
      taux_conversion_estime: 70,
    },
    metadata: { pipeline_id: 'ACP-2026-0624-004', date_execution: '2026-06-24T08:33:00Z', duree_totale_s: 68.4, score_efficacite_automatisation: 90, interventions_humaines: 0, mode: 'MOCK', version_pipeline: 'v1.0' },
  },
];

// ═══════════════════════════════════════════════
// PIPELINE AGENTS
// ═══════════════════════════════════════════════

export const PIPELINE_AGENTS = [
  { id: 'pipe-01', nom: 'Input Intake Engine™', mission: 'Ingestion et validation automatique des documents institutionnels : API, portail web, CSV, email parsing', statut: 'active', documents_traites: 48, precision: 99.2, icon: 'ri-upload-cloud-2-line' },
  { id: 'pipe-02', nom: 'Regulatory Interpreter™', mission: 'Interprétation automatique des textes COBAC, BEAC, GABAC, BCEAO, GAFI — extraction des obligations applicables', statut: 'active', textes_analyses: 24, precision: 97.8, icon: 'ri-scales-3-line' },
  { id: 'pipe-03', nom: 'Risk Scoring Engine™', mission: 'Scoring automatique des risques : brut, résiduel, heatmap 5×5, tendances historiques', statut: 'active', scores_calcules: 16, precision: 98.5, icon: 'ri-bar-chart-grouped-line' },
  { id: 'pipe-04', nom: 'Gap Detection AI™', mission: 'Détection automatique des écarts conformité : situation actuelle vs requise, preuves d\'absence, sévérité', statut: 'active', gaps_detectes: 38, precision: 98.0, icon: 'ri-contrast-drop-2-line' },
  { id: 'pipe-05', nom: 'n8n Workflow Generator™', mission: 'Génération automatique de workflows n8n exécutables : JSON prêt à importer, score automatisation, couverture processus', statut: 'active', workflows_generees: 12, precision: 96.5, icon: 'ri-node-tree' },
  { id: 'pipe-06', nom: 'AI Audit Simulator™', mission: 'Simulation d\'inspection COBAC : constats simulés, sanctions potentielles, probabilité détection, montants risque', statut: 'active', audits_simules: 4, precision: 97.2, icon: 'ri-shield-flash-line' },
  { id: 'pipe-07', nom: 'Report Generator™', mission: 'Génération automatique du rapport d\'audit final : PDF 28-65 pages, 5-7 sections, graphiques, annexes', statut: 'active', rapports_generees: 4, precision: 99.0, icon: 'ri-file-pdf-2-line' },
  { id: 'pipe-08', nom: 'Recommendation Engine™', mission: 'Moteur de recommandations priorisées P0-P3 avec plan d\'action phasé, jalons, budget, responsables', statut: 'active', recommandations_generees: 38, precision: 97.5, icon: 'ri-lightbulb-flash-line' },
  { id: 'pipe-09', nom: 'Lead Conversion Trigger™', mission: 'Déclenchement automatique du processus commercial : scoring lead, email, SMS, RDV, création opportunité CRM', statut: 'active', leads_qualifies: 4, precision: 98.8, icon: 'ri-user-received-2-line' },
];

export const PIPELINE_KPIS = {
  scenarios_disponibles: 4,
  etapes_pipeline: 9,
  livrables_par_scenario: 9,
  total_obligations_identifiees: 29,
  total_gaps_detectes: 38,
  total_workflows_generees: 12,
  total_recommandations: 38,
  score_efficacite_moyen: 92,
  duree_totale_moyenne_secondes: 43.6,
  interventions_humaines: 0,
  mode: 'MOCK — Démo Interactive Autonomous Compliance Pipeline',
};



