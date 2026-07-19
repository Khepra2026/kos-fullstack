// KOS Compliance Factory Engine™ — Industrial-Grade Compliance Automation System
// Generates 7 full compliance deliverables automatically
// Inputs: Institution type (Bank/EMF/Fintech), Regulatory scope (COBAC/LBC-FT/SI/Risk), Maturity level

export interface ComplianceScenario {
  id: string;
  nom: string;
  type_institution: 'Banque' | 'EMF' | 'FinTech' | 'Multi-entité';
  zone: string;
  scope_reglementaire: string[];
  niveau_maturite: 'Faible' | 'Moyen' | 'Élevé';
  actif_milliards_fcfa: number;
  description: string;
  collaborateurs: number;
}

export interface GovernanceFramework {
  version: string;
  date_generation: string;
  structure: {
    organes: { nom: string; composition: string; frequence_reunion: string; attributions: string[]; membres_requis: number }[];
    comites_specialises: { nom: string; president: string; membres: string; frequence: string; missions: string[] }[];
    lignes_reporting: { niveau: string; rapporte_a: string; responsabilites: string[] }[];
  };
  chartes: { titre: string; reference: string; derniere_revision: string; articles_cles: number; statut: string }[];
  matrice_rci: { risque: string; controle: string; responsable: string; periodicite: string }[];
}

export interface RiskMap {
  date_evaluation: string;
  methode: string;
  risques: {
    id: string;
    categorie: string;
    risque: string;
    probabilite: number;
    impact_financier: number;
    impact_operationnel: number;
    impact_reputationnel: number;
    score_brut: number;
    controles_existants: string;
    score_residuel: number;
    tendance: 'stable' | 'hausse' | 'baisse';
    proprietaire: string;
  }[];
  heatmap_data: { x: number; y: number; label: string; count: number }[];
}

export interface PolicyDocument {
  id: string;
  titre: string;
  reference: string;
  categorie: string;
  version: string;
  date_approbation: string;
  date_prochaine_revision: string;
  proprietaire: string;
  articles: number;
  pages: number;
  statut: 'Actif' | 'En révision' | 'À créer';
  resume: string;
  destinataires: string[];
}

export interface ControlMatrix {
  norme_reference: string;
  domaines: {
    domaine: string;
    controles: {
      id: string;
      controle: string;
      type: 'Préventif' | 'Détectif' | 'Correctif';
      frequence: string;
      automatise: boolean;
      responsable: string;
      description: string;
      preuve: string;
      kpi: string;
      seuil_alerte: string;
    }[];
  }[];
}

export interface AuditReadinessPack {
  score_global: number;
  checklist_inspection: { item: string; statut: 'OK' | 'Partiel' | 'Non'; priorite: string; action: string }[];
  documents_requis: { document: string; disponible: boolean; localisation: string; format: string }[];
  entretiens_preparation: { interlocuteur: string; role: string; points_cles: string[]; documents_a_maitriser: string[] }[];
  scenarios_test: { scenario: string; resultat_attendu: string; procedure_test: string }[];
  calendrier_preparation: { etape: string; echeance: string; responsable: string; livrable: string }[];
}

export interface N8nWorkflow {
  id: string;
  nom: string;
  declencheur: { type: string; config: string };
  noeuds: { nom: string; type: string; action: string; parametres: Record<string, string> }[];
  json_import: string;
  score_automatisation: number;
}

export interface ClientReport {
  titre: string;
  structure_pdf: {
    section: string;
    contenu: string;
    sous_sections?: { titre: string; contenu: string }[];
  }[];
  annexes: string[];
  resume_executif: string;
  recommandations_prioritaires: string[];
  destinataire: string;
}

export interface ComplianceDeliverable {
  scenario: ComplianceScenario;
  governance_framework: GovernanceFramework;
  risk_map: RiskMap;
  policies_pack: PolicyDocument[];
  control_matrix: ControlMatrix;
  audit_readiness_pack: AuditReadinessPack;
  n8n_workflows: N8nWorkflow[];
  client_report: ClientReport;
  metadata: {
    generateur: string;
    date_generation: string;
    duree_generation_secondes: number;
    normes_appliquees: string[];
    mode: string;
  };
}

// ═══════════════════════════════════════════════════════
// SCENARIOS
// ═══════════════════════════════════════════════════════

export const SCENARIOS: ComplianceScenario[] = [
  {
    id: 'CF-001',
    nom: 'Banque Commerciale CEMAC — Full Scope COBAC',
    type_institution: 'Banque',
    zone: 'CEMAC — Cameroun',
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026'],
    niveau_maturite: 'Moyen',
    actif_milliards_fcfa: 750,
    description: 'Banque universelle avec 15 agences. Dispositif LBC/FT partiellement mature, gouvernance en cours de renforcement. Scope complet COBAC + BEAC.',
    collaborateurs: 450,
  },
  {
    id: 'CF-002',
    nom: 'Établissement de Microfinance — LBC/FT + Gouvernance',
    type_institution: 'EMF',
    zone: 'CEMAC — Gabon',
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07'],
    niveau_maturite: 'Faible',
    actif_milliards_fcfa: 35,
    description: 'EMF catégorie 2 avec 6 caisses. Maturité faible : processus manuels, gouvernance embryonnaire. Focus LBC/FT et gouvernance.',
    collaborateurs: 85,
  },
  {
    id: 'CF-003',
    nom: 'FinTech Paiement — SI + LBC/FT Agile',
    type_institution: 'FinTech',
    zone: 'CEMAC — Congo',
    scope_reglementaire: ['COBAC R-2026/03', 'Sécurité SI', 'GAFI 2026'],
    niveau_maturite: 'Moyen',
    actif_milliards_fcfa: 42,
    description: 'Établissement de paiement agréé 2025. Stack nativement digital, maturité SI élevée mais conformité LBC/FT en construction.',
    collaborateurs: 60,
  },
  {
    id: 'CF-004',
    nom: 'Groupe Bancaire Panafricain — Multi-entités',
    type_institution: 'Multi-entité',
    zone: 'CEMAC + UEMOA',
    scope_reglementaire: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BCEAO', 'GABAC n°01/2026', 'BEAC n°008-2026', 'GAFI 2026'],
    niveau_maturite: 'Élevé',
    actif_milliards_fcfa: 3200,
    description: 'Groupe bancaire avec filiales dans 6 pays CEMAC+UEMOA. Maturité élevée mais complexité multi-juridictionnelle nécessitant une usine de conformité industrialisée.',
    collaborateurs: 2800,
  },
];

// ═══════════════════════════════════════════════════════
// DELIVERABLES
// ═══════════════════════════════════════════════════════

export const COMPLIANCE_DELIVERABLES: ComplianceDeliverable[] = [
  // ─── CF-001 : Banque Commerciale CEMAC ───
  {
    scenario: SCENARIOS[0],
    governance_framework: {
      version: 'GF-2026-001-v1.0',
      date_generation: '2026-06-24',
      structure: {
        organes: [
          { nom: 'Conseil d\'Administration', composition: '12 membres dont 4 indépendants', frequence_reunion: 'Trimestrielle (4/an minimum)', attributions: ['Stratégie globale', 'Approbation budgets', 'Nomination DG/DGA', 'Validation politiques LBC/FT'], membres_requis: 12 },
          { nom: 'Direction Générale', composition: 'DG + 3 DGA', frequence_reunion: 'Hebdomadaire (Comité de Direction)', attributions: ['Exécution stratégie', 'Gestion opérationnelle', 'Reporting CA'], membres_requis: 4 },
        ],
        comites_specialises: [
          { nom: 'Comité d\'Audit', president: 'Administrateur Indépendant #1', membres: '3 administrateurs (2 indépendants)', frequence: 'Trimestrielle', missions: ['Supervision audit interne/externe', 'Examen états financiers', 'Suivi recommandations COBAC'] },
          { nom: 'Comité des Risques', president: 'Administrateur Indépendant #2', membres: '3 administrateurs + CRO', frequence: 'Mensuelle', missions: ['Cartographie risques', 'Suivi LCR/NSFR', 'Validation stress tests'] },
          { nom: 'Comité de Conformité', president: 'Administrateur Indépendant #3', membres: '3 administrateurs + CCO', frequence: 'Mensuelle', missions: ['Veille réglementaire COBAC/GABAC', 'Suivi LBC/FT', 'Classification risques clients'] },
          { nom: 'Comité de Rémunération', president: 'Administrateur Indépendant #4', membres: '3 administrateurs', frequence: 'Semestrielle', missions: ['Politique de rémunération', 'Évaluation DG/DGA', 'Conformité COBAC R-2025/07 Art.15'] },
        ],
        lignes_reporting: [
          { niveau: 'Niveau 1 — Opérationnel', rapporte_a: 'Niveau 2', responsabilites: ['Exécution contrôles 1er niveau', 'KYC/CDD', 'Déclarations de soupçons', 'Reporting réglementaire'] },
          { niveau: 'Niveau 2 — Surveillance', rapporte_a: 'Niveau 3', responsabilites: ['Contrôle permanent', 'Conformité', 'Gestion des risques'] },
          { niveau: 'Niveau 3 — Audit', rapporte_a: 'Conseil d\'Administration', responsabilites: ['Audit interne', 'Audit externe', 'Inspection COBAC'] },
        ],
      },
      chartes: [
        { titre: 'Charte du Conseil d\'Administration', reference: 'CHA-CA-2026-v3', derniere_revision: '2026-01-15', articles_cles: 18, statut: 'Actif' },
        { titre: 'Charte du Comité d\'Audit', reference: 'CHA-CAUD-2026-v2', derniere_revision: '2026-02-20', articles_cles: 12, statut: 'Actif' },
        { titre: 'Charte du Comité des Risques', reference: 'CHA-CRISQ-2026-v1', derniere_revision: '2026-03-10', articles_cles: 14, statut: 'Actif' },
        { titre: 'Charte du Comité de Conformité', reference: 'CHA-CCONF-2026-v1', derniere_revision: '2026-06-01', articles_cles: 15, statut: 'En révision' },
        { titre: 'Charte de l\'Audit Interne', reference: 'CHA-AI-2026-v2', derniere_revision: '2025-11-30', articles_cles: 22, statut: 'Actif' },
      ],
      matrice_rci: [
        { risque: 'Non-conformité LBC/FT', controle: 'Revue trimestrielle classification risques + screening automatique', responsable: 'CCO', periodicite: 'Trimestrielle' },
        { risque: 'Dépassement ratio LCR', controle: 'Monitoring quotidien LCR avec alerte à 110%', responsable: 'CRO', periodicite: 'Quotidienne' },
        { risque: 'Fraude interne', controle: 'Séparation des tâches + double validation > 50M FCFA', responsable: 'Audit Interne', periodicite: 'Continue' },
      ],
    },
    risk_map: {
      date_evaluation: '2026-06-20',
      methode: 'ISO 31000:2018 — COBAC adapté',
      risques: [
        { id: 'R-001', categorie: 'Conformité', risque: 'Non-conformité LBC/FT — registre BE incomplet', probabilite: 85, impact_financier: 90, impact_operationnel: 70, impact_reputationnel: 85, score_brut: 82, controles_existants: 'Processus KYC semi-automatisé', score_residuel: 52, tendance: 'baisse', proprietaire: 'CCO' },
        { id: 'R-002', categorie: 'Liquidité', risque: 'Dépassement seuil LCR en période de stress', probabilite: 35, impact_financier: 75, impact_operationnel: 60, impact_reputationnel: 50, score_brut: 55, controles_existants: 'PFU documenté, ALM actif', score_residuel: 28, tendance: 'stable', proprietaire: 'CRO' },
        { id: 'R-003', categorie: 'Opérationnel', risque: 'Fraude interne — collusion', probabilite: 20, impact_financier: 60, impact_operationnel: 45, impact_reputationnel: 80, score_brut: 51, controles_existants: 'Double validation, rotation postes', score_residuel: 22, tendance: 'stable', proprietaire: 'Audit Interne' },
        { id: 'R-004', categorie: 'Gouvernance', risque: 'CA non statutaire (mandats expirés)', probabilite: 15, impact_financier: 55, impact_operationnel: 80, impact_reputationnel: 95, score_brut: 61, controles_existants: 'Suivi agenda CA', score_residuel: 15, tendance: 'baisse', proprietaire: 'Secrétaire CA' },
        { id: 'R-005', categorie: 'SI/Sécurité', risque: 'Cyberattaque — ransomware', probabilite: 30, impact_financier: 85, impact_operationnel: 95, impact_reputationnel: 70, score_brut: 70, controles_existants: 'WAF, EDR, sauvegardes offline', score_residuel: 35, tendance: 'hausse', proprietaire: 'DSI' },
        { id: 'R-006', categorie: 'Conformité', risque: 'Transmission DS > 48h', probabilite: 60, impact_financier: 65, impact_operationnel: 40, impact_reputationnel: 75, score_brut: 60, controles_existants: 'Procédure DS documentée', score_residuel: 40, tendance: 'stable', proprietaire: 'Resp. LBC/FT' },
      ],
      heatmap_data: [
        { x: 5, y: 5, label: 'Non-conformité LBC/FT', count: 2 },
        { x: 3, y: 4, label: 'Risque liquidité', count: 1 },
        { x: 4, y: 4, label: 'Cyber', count: 1 },
        { x: 2, y: 3, label: 'Fraude/Gouv', count: 2 },
      ],
    },
    policies_pack: [
      { id: 'POL-001', titre: 'Politique LBC/FT — Dispositif Complet', reference: 'POL-LBCFT-2026-v4', categorie: 'LBC/FT', version: 'v4.0', date_approbation: '2026-03-15', date_prochaine_revision: '2027-03-15', proprietaire: 'CCO', articles: 45, pages: 78, statut: 'Actif', resume: 'Politique globale LBC/FT couvrant KYC, CDD, BE, classification risques, déclaration de soupçons, gel des avoirs, formation, audit.', destinataires: ['Tout le personnel', 'Conseil d\'Administration', 'COBAC'] },
      { id: 'POL-002', titre: 'Procédure KYC / Customer Due Diligence', reference: 'PRO-KYC-2026-v3', categorie: 'LBC/FT', version: 'v3.2', date_approbation: '2026-02-01', date_prochaine_revision: '2027-02-01', proprietaire: 'Resp. LBC/FT', articles: 28, pages: 45, statut: 'Actif', resume: 'Procédure détaillée KYC/CDD standard et renforcé. Critères PEP, listes sanctions, bénéficiaires effectifs.', destinataires: ['Front Office', 'Compliance', 'Juridique'] },
      { id: 'POL-003', titre: 'Politique de Gestion des Risques', reference: 'POL-RISK-2026-v2', categorie: 'Risques', version: 'v2.0', date_approbation: '2026-01-20', date_prochaine_revision: '2027-01-20', proprietaire: 'CRO', articles: 35, pages: 62, statut: 'Actif', resume: 'Cadre global de gestion des risques : crédit, marché, liquidité, opérationnel, conformité. Appétit au risque, limites, stress tests.', destinataires: ['Comité des Risques', 'Direction Générale', 'BEAC'] },
      { id: 'POL-004', titre: 'Charte de Contrôle Interne', reference: 'POL-CI-2026-v3', categorie: 'Contrôle Interne', version: 'v3.0', date_approbation: '2026-04-10', date_prochaine_revision: '2027-04-10', proprietaire: 'Audit Interne', articles: 40, pages: 70, statut: 'Actif', resume: 'Dispositif de contrôle interne 3 niveaux. Cartographie des processus, matrice RACI, contrôles clés, reporting.', destinataires: ['Tout le personnel', 'COBAC'] },
      { id: 'POL-005', titre: 'Politique de Sécurité des Systèmes d\'Information', reference: 'POL-SSI-2026-v2', categorie: 'SI/Sécurité', version: 'v2.1', date_approbation: '2026-05-05', date_prochaine_revision: '2027-05-05', proprietaire: 'DSI', articles: 32, pages: 55, statut: 'Actif', resume: 'Politique SSI : contrôle d\'accès, sauvegarde, PCA/PRA, gestion incidents, sensibilisation.', destinataires: ['DSI', 'Tout le personnel'] },
      { id: 'POL-006', titre: 'Code de Déontologie et d\'Éthique', reference: 'POL-ETH-2026-v3', categorie: 'Gouvernance', version: 'v3.0', date_approbation: '2026-01-10', date_prochaine_revision: '2027-01-10', proprietaire: 'DRH', articles: 20, pages: 30, statut: 'Actif', resume: 'Code de conduite, conflits d\'intérêts, confidentialité, cadeaux, whistleblowing.', destinataires: ['Tout le personnel', 'Administrateurs'] },
      { id: 'POL-007', titre: 'Politique de Rémunération', reference: 'POL-REM-2026-v1', categorie: 'Gouvernance', version: 'v1.0', date_approbation: '2026-06-15', date_prochaine_revision: '2027-06-15', proprietaire: 'Comité Rémunération', articles: 18, pages: 28, statut: 'En révision', resume: 'Politique de rémunération alignée COBAC R-2025/07. Proportion fixe/variable, différé, malus, indicateurs.', destinataires: ['Preneurs de risques', 'Direction Générale', 'CA'] },
      { id: 'POL-008', titre: 'Procédure Déclaration de Soupçons GABAC', reference: 'PRO-DS-2026-v3', categorie: 'LBC/FT', version: 'v3.0', date_approbation: '2026-03-01', date_prochaine_revision: '2027-03-01', proprietaire: 'Resp. LBC/FT', articles: 15, pages: 22, statut: 'Actif', resume: 'Procédure de détection, analyse, validation et transmission des déclarations de soupçons à la GABAC sous 48h.', destinataires: ['Compliance', 'Direction Générale'] },
      { id: 'POL-009', titre: 'Plan de Continuité d\'Activité (PCA)', reference: 'POL-PCA-2026-v2', categorie: 'SI/Sécurité', version: 'v2.0', date_approbation: '2025-12-01', date_prochaine_revision: '2026-12-01', proprietaire: 'DSI', articles: 25, pages: 48, statut: 'À créer', resume: 'PCA complet avec RTO/RPO, scénarios de crise, cellules de crise, tests annuels.', destinataires: ['Direction Générale', 'Tous les départements'] },
      { id: 'POL-010', titre: 'Politique ESG et Durabilité', reference: 'POL-ESG-2026-v1', categorie: 'ESG', version: 'v1.0', date_approbation: '2026-06-01', date_prochaine_revision: '2027-06-01', proprietaire: 'DG Adjoint', articles: 22, pages: 35, statut: 'En révision', resume: 'Stratégie ESG, risques climatiques, taxonomie verte, reporting GRI/ISSB.', destinataires: ['Conseil d\'Administration', 'Investisseurs'] },
    ],
    control_matrix: {
      norme_reference: 'ISO 31000:2018 / COBAC R-2025/07 Art.8 / COSO 2013',
      domaines: [
        {
          domaine: 'Gouvernance & Supervision',
          controles: [
            { id: 'CTRL-001', controle: 'Vérification indépendance administrateurs', type: 'Préventif', frequence: 'Annuelle', automatise: false, responsable: 'Secrétaire CA', description: 'Vérification annuelle de l\'indépendance des administrateurs conformément aux critères COBAC R-2025/07 Art.3', preuve: 'Déclarations d\'indépendance signées', kpi: '% administrateurs indépendants ≥ 33%', seuil_alerte: '< 33%' },
            { id: 'CTRL-002', controle: 'Revue trimestrielle PV Comités spécialisés', type: 'Détectif', frequence: 'Trimestrielle', automatise: false, responsable: 'Audit Interne', description: 'Revue de la tenue régulière des 4 comités spécialisés et de la qualité des PV', preuve: 'Rapport de revue trimestrielle', kpi: '100% comités tenus dans les délais', seuil_alerte: '< 90%' },
            { id: 'CTRL-003', controle: 'Double validation des décisions CA > 100M FCFA', type: 'Préventif', frequence: 'À chaque CA', automatise: false, responsable: 'Secrétaire CA', description: 'Toute décision CA engageant > 100M FCFA nécessite une double validation et un avis juridique', preuve: 'PV CA avec visa juridique', kpi: '100% décisions > 100M avec double validation', seuil_alerte: '< 100%' },
          ],
        },
        {
          domaine: 'LBC/FT',
          controles: [
            { id: 'CTRL-004', controle: 'Screening automatique listes sanctions', type: 'Préventif', frequence: 'Temps réel', automatise: true, responsable: 'DSI + CCO', description: 'Screening automatique des clients et transactions contre les listes sanctions ONU, OFAC, UE, GABAC', preuve: 'Logs moteur de filtrage', kpi: '100% transactions screenées', seuil_alerte: '< 99.5%' },
            { id: 'CTRL-005', controle: 'Revue trimestrielle classification risques clients', type: 'Détectif', frequence: 'Trimestrielle', automatise: true, responsable: 'CCO', description: 'Reclassification automatique des clients selon matrice 3 niveaux avec facteurs de risque objectifs', preuve: 'Rapport de classification trimestrielle', kpi: 'Revue effectuée dans les 15 jours post-trimestre', seuil_alerte: 'Délai > 30 jours' },
            { id: 'CTRL-006', controle: 'Contrôle exhaustivité registre BE', type: 'Détectif', frequence: 'Mensuelle', automatise: true, responsable: 'Resp. LBC/FT', description: 'Vérification mensuelle que 100% des clients actifs ont un BE documenté et vérifié', preuve: 'Rapport couverture BE', kpi: 'Taux couverture BE ≥ 98%', seuil_alerte: '< 95%' },
            { id: 'CTRL-007', controle: 'Formation LBC/FT obligatoire', type: 'Préventif', frequence: 'Annuelle', automatise: false, responsable: 'CCO + DRH', description: 'Formation annuelle obligatoire de tout le personnel sur les obligations LBC/FT avec test de connaissances', preuve: 'Feuilles d\'émargement + résultats tests', kpi: '100% personnel formé', seuil_alerte: '< 95%' },
          ],
        },
        {
          domaine: 'Sécurité SI',
          controles: [
            { id: 'CTRL-008', controle: 'Test d\'intrusion annuel', type: 'Détectif', frequence: 'Annuelle', automatise: false, responsable: 'DSI', description: 'Pentest externe annuel par cabinet certifié avec remédiation des vulnérabilités critiques sous 30 jours', preuve: 'Rapport de pentest + plan de remédiation', kpi: '0 vulnérabilité critique non corrigée > 30j', seuil_alerte: '> 0' },
            { id: 'CTRL-009', controle: 'Sauvegarde quotidienne avec test de restauration', type: 'Correctif', frequence: 'Quotidienne (sauvegarde) / Mensuelle (test)', automatise: true, responsable: 'DSI', description: 'Sauvegarde quotidienne automatisée avec test de restauration mensuel pour garantir la récupérabilité', preuve: 'Logs sauvegarde + rapport test restauration', kpi: 'RPO ≤ 1h, RTO ≤ 4h', seuil_alerte: 'RPO > 4h' },
          ],
        },
      ],
    },
    audit_readiness_pack: {
      score_global: 68,
      checklist_inspection: [
        { item: 'Registre BE exhaustif et digitalisé', statut: 'Partiel', priorite: 'P0', action: 'Finaliser la digitalisation du registre (actuellement 85% digitalisé)' },
        { item: 'PV CA et Comités à jour (12 derniers mois)', statut: 'OK', priorite: 'P1', action: 'Maintenir la rigueur documentaire' },
        { item: 'Rapport annuel LBC/FT transmis COBAC', statut: 'OK', priorite: 'P0', action: 'Déjà transmis le 31/03/2026' },
        { item: 'Manuel de contrôle interne à jour (v2026)', statut: 'Partiel', priorite: 'P0', action: 'Mettre à jour le manuel CI avec volet VASP et actifs virtuels' },
        { item: 'Dossier du personnel (organigramme, fiches de poste)', statut: 'OK', priorite: 'P2', action: 'Organigramme validé par le CA en mars 2026' },
        { item: 'Preuves de formation LBC/FT annuelle', statut: 'Partiel', priorite: 'P1', action: '88% du personnel formé en 2026 — compléter les 12% restants' },
        { item: 'Rapports d\'audit externe LBC/FT', statut: 'OK', priorite: 'P0', action: 'Audit 2025 disponible' },
        { item: 'Plan de Financement d\'Urgence testé', statut: 'Partiel', priorite: 'P1', action: 'PFU documenté mais dernier test > 12 mois' },
        { item: 'Charte des 4 comités spécialisés approuvée', statut: 'OK', priorite: 'P0', action: '4 chartes approuvées par le CA' },
        { item: 'Procédure VASP / Crypto-actifs documentée', statut: 'Non', priorite: 'P0', action: 'Rédiger et approuver la procédure VASP conformément au R-2026/03 Art.7' },
      ],
      documents_requis: [
        { document: 'Statuts de la banque', disponible: true, localisation: 'Secrétariat CA — Classeur 1', format: 'PDF' },
        { document: 'Registre des procès-verbaux CA (3 ans)', disponible: true, localisation: 'Secrétariat CA — Classeur 2', format: 'Papier + PDF' },
        { document: 'Manuel de Contrôle Interne v2026', disponible: false, localisation: 'À créer', format: 'PDF' },
        { document: 'Politique LBC/FT + Procédures KYC, DS, BE', disponible: true, localisation: 'SharePoint Compliance', format: 'PDF' },
        { document: 'Rapports d\'audit externe (3 ans)', disponible: true, localisation: 'Audit Interne — Dossier A-03', format: 'PDF' },
        { document: 'Organigramme nominatif à jour', disponible: true, localisation: 'DRH — Sharepoint', format: 'PDF' },
        { document: 'Registre des bénéficiaires effectifs', disponible: true, localisation: 'Système BE — Export CSV', format: 'CSV/PDF' },
        { document: 'Plan de Financement d\'Urgence', disponible: true, localisation: 'Direction Financière — ALM', format: 'PDF' },
        { document: 'Preuves de formation LBC/FT 2026', disponible: true, localisation: 'DRH — LMS', format: 'PDF' },
        { document: 'Procédure VASP / Crypto-actifs', disponible: false, localisation: 'À créer', format: 'PDF' },
      ],
      entretiens_preparation: [
        { interlocuteur: 'Directeur Général', role: 'DG', points_cles: ['Stratégie globale', 'Gouvernance', 'Indépendance vis-à-vis actionnaires', 'Relations COBAC'], documents_a_maitriser: ['Statuts', 'PV CA 12 mois', 'Business Plan 2026-2028'] },
        { interlocuteur: 'Chief Compliance Officer', role: 'CCO', points_cles: ['Dispositif LBC/FT', 'Classification risques', 'Déclarations de soupçons', 'Registre BE', 'Formation'], documents_a_maitriser: ['Politique LBC/FT', 'Rapport classification', 'Registre DS', 'Registre BE'] },
        { interlocuteur: 'Chief Risk Officer', role: 'CRO', points_cles: ['Cartographie risques', 'LCR/NSFR', 'Stress tests', 'PFU', 'Appétit au risque'], documents_a_maitriser: ['Politique risques', 'Rapport LCR/NSFR', 'Rapports stress tests', 'PFU'] },
        { interlocuteur: 'Directeur Audit Interne', role: 'DAI', points_cles: ['Plan d\'audit', 'Recommandations COBAC', 'Suivi plans d\'action', 'Indépendance'], documents_a_maitriser: ['Plan d\'audit 2026', 'Rapports d\'audit', 'Suivi recommandations'] },
      ],
      scenarios_test: [
        { scenario: 'Détection client PEP non déclaré', resultat_attendu: 'Alerte automatique, blocage compte, escalade CCO sous 4h', procedure_test: 'Créer un profil client PEP fictif sans déclaration PEP' },
        { scenario: 'Transaction > seuil avec pays à haut risque GAFI', resultat_attendu: 'Blocage automatique, analyse CCO, DS si soupçon', procedure_test: 'Simuler virement 50M FCFA vers juridiction liste grise GAFI' },
        { scenario: 'Chute LCR sous 100%', resultat_attendu: 'Alerte immédiate CRO, activation cellule ALM, plan d\'action sous 24h', procedure_test: 'Simuler sortie massive de dépôts (20% en 5 jours)' },
      ],
      calendrier_preparation: [
        { etape: 'J-60 : Audit à blanc interne', echeance: '2026-08-01', responsable: 'Audit Interne', livrable: 'Rapport d\'audit à blanc avec gaps identifiés' },
        { etape: 'J-45 : Finalisation manuel CI & procédure VASP', echeance: '2026-08-15', responsable: 'CCO + DAI', livrable: 'Manuel CI v2026 + Procédure VASP approuvée' },
        { etape: 'J-30 : Test PFU 2026', echeance: '2026-09-01', responsable: 'CRO', livrable: 'Rapport test PFU 2026' },
        { etape: 'J-15 : Briefing CA — Préparation inspection', echeance: '2026-09-15', responsable: 'DG + CCO', livrable: 'Dossier inspection remis au CA' },
        { etape: 'J-7 : Simulation entretiens inspecteurs', echeance: '2026-09-22', responsable: 'CCO', livrable: 'Compte-rendu simulation avec points d\'amélioration' },
        { etape: 'J-1 : Vérification finale salle inspection', echeance: '2026-09-29', responsable: 'Secrétaire CA', livrable: 'Dossier physique + digital prêt' },
      ],
    },
    n8n_workflows: [
      {
        id: 'WF-CF001-01',
        nom: 'LBC/FT — Screening Transactions & Déclaration de Soupçons Automatisée',
        declencheur: { type: 'Webhook — POST /new-transaction', config: 'Déclenché à chaque transaction > 5M FCFA' },
        noeuds: [
          { nom: 'Webhook Trigger', type: 'trigger', action: 'Réception payload transaction', parametres: { method: 'POST', path: '/new-transaction' } },
          { nom: 'Extract Transaction Data', type: 'function', action: 'Extraction données transaction', parametres: { fields: 'montant, beneficiaire, origine, pays' } },
          { nom: 'Screening Sanctions API', type: 'http', action: 'Appel API listes sanctions', parametres: { endpoint: 'POST /api/compliance/screen', timeout: '5000ms' } },
          { nom: 'Risk Scoring Engine', type: 'function', action: 'Calcul score de risque transaction', parametres: { thresholds: 'Faible<30, Moyen 30-70, Élevé>70' } },
          { nom: 'Router — Risk Decision', type: 'switch', action: 'Routage selon score risque', parametres: { routes: 'Faible→Approve, Moyen→Review, Élevé→Block+DS' } },
          { nom: 'Generate DS (Suspicion)', type: 'function', action: 'Génération automatique déclaration soupçons', parametres: { template: 'DS-GABAC-TEMPLATE-v3' } },
          { nom: 'Transmit to GABAC', type: 'http', action: 'Transmission électronique GABAC', parametres: { endpoint: 'POST /api/gabac/ds', deadline: '48h' } },
          { nom: 'Log & Audit Trail', type: 'database', action: 'Enregistrement piste d\'audit', parametres: { table: 'compliance_audit_trail', retention: '10 ans' } },
        ],
        json_import: '{"name":"LBC/FT Screening DS","nodes":[...8 nodes...],"connections":{...}}',
        score_automatisation: 94,
      },
      {
        id: 'WF-CF001-02',
        nom: 'Reporting NSFR Trimestriel BEAC — Collecte → Calcul → Transmission',
        declencheur: { type: 'Cron', config: '0 6 1 */3 * — Le 1er de chaque trimestre à 06:00' },
        noeuds: [
          { nom: 'Cron Trigger', type: 'trigger', action: 'Déclenchement trimestriel', parametres: { cron: '0 6 1 */3 *' } },
          { nom: 'Collect Data Sources', type: 'function', action: 'Collecte données ASF/RSF', parametres: { sources: 'Core Banking, ALM System, Excel' } },
          { nom: 'Calculate NSFR', type: 'function', action: 'Calcul NSFR selon BEAC n°008-2026', parametres: { formula: 'ASF disponible / RSF requis' } },
          { nom: 'Validate Thresholds', type: 'function', action: 'Validation NSFR ≥ 100%', parametres: { min_threshold: '100%' } },
          { nom: 'Generate BEAC Report', type: 'function', action: 'Génération rapport format BEAC', parametres: { template: 'BEAC-NSFR-TEMPLATE' } },
          { nom: 'Transmit to BEAC', type: 'http', action: 'Transmission portail BEAC', parametres: { endpoint: 'POST /api/beac/reporting/nsfr' } },
          { nom: 'Notify CRO & DG', type: 'email', action: 'Notification validation', parametres: { to: 'cro@banque.cm, dg@banque.cm' } },
        ],
        json_import: '{"name":"NSFR BEAC Reporting","nodes":[...7 nodes...],"connections":{...}}',
        score_automatisation: 88,
      },
    ],
    client_report: {
      titre: 'Rapport de Conformité — Exercice 2026 — Banque Commerciale CEMAC',
      structure_pdf: [
        { section: 'Page de Garde', contenu: 'Logo établissement, titre, date, classification CONFIDENTIEL, destinataire CA', sous_sections: [] },
        { section: 'Résumé Exécutif', contenu: 'Score de conformité global 68/100. Progrès significatifs depuis 2025 (+12 pts). Points d\'attention : registre BE (85% digitalisé), procédure VASP à créer. Prochaine inspection estimée Q4 2026.', sous_sections: [] },
        { section: '1. Gouvernance', contenu: 'Cadre de gouvernance complet avec 4 comités spécialisés opérationnels. CA composé de 12 membres dont 4 indépendants (33%).', sous_sections: [
          { titre: '1.1 Conseil d\'Administration', contenu: '12 membres, 33% indépendants. 4 réunions ordinaires/an. PV complets et signés.' },
          { titre: '1.2 Comités Spécialisés', contenu: 'Audit, Risques, Conformité, Rémunération — tous opérationnels avec chartes approuvées.' },
          { titre: '1.3 Lignes de Défense', contenu: 'Dispositif 3 niveaux conforme COBAC R-2025/07. Contrôle permanent, conformité, audit interne.' },
        ]},
        { section: '2. Cartographie des Risques', contenu: '6 risques majeurs identifiés selon méthodologie ISO 31000. Score résiduel moyen : 32/100. Risque #1 : Non-conformité LBC/FT (résiduel 52). Heatmap 5x5 générée.', sous_sections: [] },
        { section: '3. Politiques et Procédures', contenu: '10 documents de gouvernance. 8 actifs, 2 en révision, 1 à créer (PCA). Pack complet LBC/FT, risques, CI, SSI, ESG.', sous_sections: [] },
        { section: '4. Matrice de Contrôle', contenu: '9 contrôles clés dans 3 domaines : Gouvernance, LBC/FT, Sécurité SI. 4 contrôles préventifs, 3 détectifs, 2 correctifs. Taux d\'automatisation : 44%.', sous_sections: [] },
        { section: '5. Préparation Inspection COBAC', contenu: 'Score inspection readiness : 68/100. 10 points checklist : 5 OK, 4 Partiel, 1 Non. Calendrier J-60 à J-1 documenté.', sous_sections: [] },
        { section: '6. Automatisation n8n', contenu: '2 workflows déployés : Screening LBC/FT (94% automatisé) et Reporting NSFR BEAC (88% automatisé). Gain estimé : 120h/mois.', sous_sections: [] },
      ],
      annexes: ['Annexe A — Organigramme nominatif', 'Annexe B — Registre BE (version anonymisée)', 'Annexe C — Matrice de contrôle détaillée', 'Annexe D — Calendrier inspection détaillé', 'Annexe E — Workflows n8n JSON'],
      resume_executif: 'Le dispositif de conformité de la Banque Commerciale CEMAC atteint un score global de 68/100, en progression de 12 points par rapport à 2025. Les 4 comités spécialisés sont opérationnels, le cadre LBC/FT est documenté et l\'audit externe 2025 est conforme. Les axes d\'amélioration prioritaires sont la digitalisation complète du registre BE et la création de la procédure VASP.',
      recommandations_prioritaires: ['Digitaliser 100% du registre BE avant Q3 2026', 'Créer et approuver la procédure VASP/Crypto-actifs', 'Réaliser le test PFU 2026', 'Compléter la formation LBC/FT pour 100% du personnel', 'Mettre à jour le manuel CI avec volet actifs virtuels'],
      destinataire: 'Conseil d\'Administration — Banque Commerciale CEMAC',
    },
    metadata: {
      generateur: 'KOS Compliance Factory Engine™ — Industrial Grade v1.0',
      date_generation: '2026-06-24T10:30:00Z',
      duree_generation_secondes: 8.4,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026', 'ISO 31000:2018', 'COSO 2013', 'GAFI 40 Recommandations 2026'],
      mode: 'MOCK — Démo Interactive Compliance Factory',
    },
  },

  // ─── CF-002 : EMF Gabon ───
  {
    scenario: SCENARIOS[1],
    governance_framework: {
      version: 'GF-2026-002-v1.0',
      date_generation: '2026-06-24',
      structure: {
        organes: [
          { nom: 'Conseil d\'Administration', composition: '7 membres dont 2 indépendants', frequence_reunion: 'Trimestrielle', attributions: ['Stratégie', 'Budgets', 'Nomination DG', 'Politiques LBC/FT'], membres_requis: 7 },
          { nom: 'Direction Générale', composition: 'DG', frequence_reunion: 'Hebdomadaire (Point DG)', attributions: ['Exécution', 'Gestion opérationnelle', 'Reporting CA'], membres_requis: 1 },
        ],
        comites_specialises: [
          { nom: 'Comité d\'Audit', president: 'Administrateur Indépendant #1', membres: '3 administrateurs', frequence: 'Trimestrielle', missions: ['Audit interne/externe', 'États financiers', 'Suivi recommandations'] },
          { nom: 'Comité des Risques & Conformité', president: 'Administrateur Indépendant #2', membres: '3 administrateurs', frequence: 'Trimestrielle', missions: ['Risques', 'LBC/FT', 'Conformité'] },
        ],
        lignes_reporting: [
          { niveau: 'Niveau 1 — Opérationnel', rapporte_a: 'DG', responsabilites: ['KYC manuel', 'Opérations caisse', 'Reporting'] },
          { niveau: 'Niveau 2 — Surveillance', rapporte_a: 'Comité Risques & Conformité', responsabilites: ['Conformité externalisée', 'Contrôle permanent'] },
        ],
      },
      chartes: [
        { titre: 'Charte du Conseil d\'Administration', reference: 'CHA-CA-EMF-2026-v1', derniere_revision: '2026-05-20', articles_cles: 14, statut: 'Actif' },
        { titre: 'Charte du Comité d\'Audit', reference: 'CHA-CAUD-EMF-2026-v1', derniere_revision: '2026-06-01', articles_cles: 10, statut: 'En révision' },
        { titre: 'Charte du Comité Risques & Conformité', reference: 'CHA-CRC-EMF-2026-v1', derniere_revision: '2026-06-15', articles_cles: 12, statut: 'Actif' },
      ],
      matrice_rci: [
        { risque: 'Défaut remboursement crédit', controle: 'Analyse crédit + comité crédit hebdo', responsable: 'DG', periodicite: 'Hebdomadaire' },
        { risque: 'Fraude caisse', controle: 'Double comptage caisse + rapprochement quotidien', responsable: 'Chef d\'agence', periodicite: 'Quotidienne' },
      ],
    },
    risk_map: {
      date_evaluation: '2026-06-18',
      methode: 'ISO 31000:2018 simplifié',
      risques: [
        { id: 'R-101', categorie: 'Crédit', risque: 'Défaut remboursement portefeuille crédit', probabilite: 70, impact_financier: 80, impact_operationnel: 45, impact_reputationnel: 40, score_brut: 59, controles_existants: 'Comité crédit hebdomadaire', score_residuel: 42, tendance: 'hausse', proprietaire: 'DG' },
        { id: 'R-102', categorie: 'Conformité', risque: 'Classification risques clients inexistante', probabilite: 90, impact_financier: 55, impact_operationnel: 35, impact_reputationnel: 70, score_brut: 63, controles_existants: 'Aucun — processus 100% manuel', score_residuel: 58, tendance: 'stable', proprietaire: 'Resp. Conformité (ext.)' },
        { id: 'R-103', categorie: 'Opérationnel', risque: 'Fraude interne caisse', probabilite: 25, impact_financier: 45, impact_operationnel: 30, impact_reputationnel: 55, score_brut: 39, controles_existants: 'Double comptage caisse', score_residuel: 18, tendance: 'stable', proprietaire: 'Chef d\'agence' },
      ],
      heatmap_data: [
        { x: 4, y: 4, label: 'Crédit', count: 1 },
        { x: 5, y: 3, label: 'Conformité', count: 1 },
        { x: 2, y: 2, label: 'Fraude', count: 1 },
      ],
    },
    policies_pack: [
      { id: 'POL-101', titre: 'Politique LBC/FT — EMF', reference: 'POL-LBCFT-EMF-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-06-15', date_prochaine_revision: '2027-06-15', proprietaire: 'Resp. Conformité', articles: 20, pages: 35, statut: 'À créer', resume: 'Politique LBC/FT adaptée EMF catégorie 2. KYC simplifié, CDD, BE, classification risques, DS.', destinataires: ['Tout le personnel', 'COBAC'] },
      { id: 'POL-102', titre: 'Procédure KYC Simplifié', reference: 'PRO-KYC-EMF-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-06-20', date_prochaine_revision: '2027-06-20', proprietaire: 'Resp. Conformité', articles: 12, pages: 20, statut: 'À créer', resume: 'Procédure KYC simplifiée pour clientèle EMF : identification, vérification identité, BE, liste sanctions.', destinataires: ['Front Office'] },
      { id: 'POL-103', titre: 'Code de Déontologie', reference: 'POL-ETH-EMF-2026-v1', categorie: 'Gouvernance', version: 'v1.0', date_approbation: '2026-05-01', date_prochaine_revision: '2027-05-01', proprietaire: 'DG', articles: 12, pages: 18, statut: 'Actif', resume: 'Code de conduite EMF : confidentialité, conflits d\'intérêts, intégrité.', destinataires: ['Tout le personnel'] },
      { id: 'POL-104', titre: 'Procédure Déclaration de Soupçons', reference: 'PRO-DS-EMF-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-06-20', date_prochaine_revision: '2027-06-20', proprietaire: 'Resp. Conformité', articles: 10, pages: 15, statut: 'À créer', resume: 'Procédure simplifiée DS pour EMF — détection, analyse, transmission GABAC.', destinataires: ['DG', 'Resp. Conformité'] },
    ],
    control_matrix: {
      norme_reference: 'ISO 31000:2018 / COBAC R-2025/07',
      domaines: [
        {
          domaine: 'Gouvernance',
          controles: [
            { id: 'CTRL-101', controle: 'Tenue trimestrielle des comités', type: 'Détectif', frequence: 'Trimestrielle', automatise: false, responsable: 'Secrétaire CA', description: 'Vérification que les comités d\'audit et risques/conformité se réunissent trimestriellement', preuve: 'PV signés', kpi: '2 comités × 4 réunions/an', seuil_alerte: '< 6 réunions/an' },
          ],
        },
        {
          domaine: 'LBC/FT',
          controles: [
            { id: 'CTRL-102', controle: 'Vérification identité avant ouverture compte', type: 'Préventif', frequence: 'À chaque ouverture', automatise: false, responsable: 'Agent caisse', description: 'Vérification pièce d\'identité valide avant toute ouverture de compte', preuve: 'Copie CNI au dossier', kpi: '100% dossiers avec CNI', seuil_alerte: '< 100%' },
            { id: 'CTRL-103', controle: 'Vérification registre BE', type: 'Détectif', frequence: 'Mensuelle', automatise: false, responsable: 'Resp. Conformité', description: 'Vérification mensuelle registre BE papier', preuve: 'Registre BE émargé', kpi: '100% clients avec BE', seuil_alerte: '< 90%' },
          ],
        },
      ],
    },
    audit_readiness_pack: {
      score_global: 32,
      checklist_inspection: [
        { item: 'Registre BE documenté', statut: 'Non', priorite: 'P0', action: 'Créer le registre BE — urgence absolue' },
        { item: 'Politique LBC/FT documentée', statut: 'Non', priorite: 'P0', action: 'Rédiger et approuver la politique LBC/FT' },
        { item: 'PV CA et Comités à jour', statut: 'Partiel', priorite: 'P1', action: 'Compléter les PV manquants (T4 2025, T1 2026)' },
        { item: 'Organigramme à jour', statut: 'OK', priorite: 'P2', action: 'Déjà à jour' },
        { item: 'Dossier du personnel complet', statut: 'Partiel', priorite: 'P2', action: 'Compléter les fiches de poste' },
      ],
      documents_requis: [
        { document: 'Politique LBC/FT', disponible: false, localisation: 'À créer', format: 'PDF' },
        { document: 'Registre BE', disponible: false, localisation: 'À créer', format: 'Papier' },
        { document: 'PV CA (12 mois)', disponible: true, localisation: 'Secrétariat CA', format: 'Papier' },
        { document: 'Code de déontologie', disponible: true, localisation: 'DG', format: 'PDF' },
      ],
      entretiens_preparation: [
        { interlocuteur: 'Directeur Général', role: 'DG', points_cles: ['Gouvernance', 'Stratégie EMF', 'Relation COBAC'], documents_a_maitriser: ['PV CA', 'Business Plan'] },
        { interlocuteur: 'Responsable Conformité (externalisé)', role: 'CCO externe', points_cles: ['Dispositif LBC/FT', 'Registre BE', 'Plan d\'action conformité'], documents_a_maitriser: ['Contrat prestation', 'Planning intervention'] },
      ],
      scenarios_test: [
        { scenario: 'Ouverture compte sans CNI valide', resultat_attendu: 'Refus d\'ouverture', procedure_test: 'Tenter ouverture compte avec CNI expirée' },
      ],
      calendrier_preparation: [
        { etape: 'J-60 : Rédaction politique LBC/FT', echeance: '2026-08-01', responsable: 'Resp. Conformité', livrable: 'Politique LBC/FT v1.0' },
        { etape: 'J-45 : Création registre BE', echeance: '2026-08-15', responsable: 'Resp. Conformité', livrable: 'Registre BE initié' },
        { etape: 'J-30 : Régularisation PV manquants', echeance: '2026-09-01', responsable: 'Secrétaire CA', livrable: 'PV T4 2025 + T1 2026' },
      ],
    },
    n8n_workflows: [
      {
        id: 'WF-CF002-01',
        nom: 'Classification Risques Clients EMF — Rappel Trimestriel',
        declencheur: { type: 'Cron', config: '0 8 1 */3 * — Trimestriel' },
        noeuds: [
          { nom: 'Cron Trigger', type: 'trigger', action: 'Déclenchement trimestriel', parametres: { cron: '0 8 1 */3 *' } },
          { nom: 'Send Reminder Email', type: 'email', action: 'Rappel classification risques', parametres: { to: 'conformite@emf.ga', template: 'classification-rappel' } },
          { nom: 'Create Task', type: 'function', action: 'Création tâche dans outil gestion', parametres: { priority: 'Haute' } },
        ],
        json_import: '{"name":"Classification Risques EMF","nodes":[...3 nodes...]}',
        score_automatisation: 45,
      },
    ],
    client_report: {
      titre: 'Rapport de Conformité Initial — CREC Gabon — 2026',
      structure_pdf: [
        { section: 'Résumé Exécutif', contenu: 'Score 32/100 — URGENCE. L\'EMF ne dispose pas des fondamentaux de conformité (politique LBC/FT, registre BE). Plan d\'action prioritaire sur 90 jours.', sous_sections: [] },
        { section: '1. État des Lieux', contenu: 'Gouvernance embryonnaire, conformité externalisée, processus 100% manuels.', sous_sections: [] },
        { section: '2. Plan d\'Action Prioritaire', contenu: '3 livrables P0 à créer : politique LBC/FT, registre BE, procédure KYC.', sous_sections: [] },
      ],
      annexes: ['Annexe A — Modèle politique LBC/FT EMF', 'Annexe B — Template registre BE'],
      resume_executif: 'L\'EMF présente un retard critique en matière de conformité. Le score de 32/100 reflète l\'absence de documents fondamentaux. Un plan d\'action 90 jours est proposé avec 3 livrables prioritaires.',
      recommandations_prioritaires: ['Rédiger la politique LBC/FT — J+30', 'Créer le registre BE — J+45', 'Former le personnel LBC/FT — J+60'],
      destinataire: 'Conseil d\'Administration — CREC Gabon',
    },
    metadata: {
      generateur: 'KOS Compliance Factory Engine™ — Industrial Grade v1.0',
      date_generation: '2026-06-24T10:31:00Z',
      duree_generation_secondes: 4.2,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07'],
      mode: 'MOCK — Démo Interactive Compliance Factory',
    },
  },

  // ─── CF-003 : FinTech Paiement ───
  {
    scenario: SCENARIOS[2],
    governance_framework: {
      version: 'GF-2026-003-v1.0',
      date_generation: '2026-06-24',
      structure: {
        organes: [
          { nom: 'Conseil d\'Administration', composition: '7 membres dont 3 indépendants', frequence_reunion: 'Trimestrielle', attributions: ['Stratégie', 'Budgets', 'Nomination DG', 'Validation roadmap produit'], membres_requis: 7 },
          { nom: 'Direction Générale', composition: 'CEO + CTO + CCO', frequence_reunion: 'Hebdomadaire', attributions: ['Exécution', 'Développement produit', 'Conformité'], membres_requis: 3 },
        ],
        comites_specialises: [
          { nom: 'Comité d\'Audit & Risques', president: 'Administrateur Indépendant #1', membres: '3 administrateurs', frequence: 'Trimestrielle', missions: ['Audit', 'Risques SI', 'Conformité LBC/FT'] },
        ],
        lignes_reporting: [
          { niveau: 'Niveau 1 — Équipe Produit', rapporte_a: 'CTO', responsabilites: ['KYC API', 'Screening automatique', 'Monitoring transactions'] },
          { niveau: 'Niveau 2 — Conformité', rapporte_a: 'CA', responsabilites: ['Politiques', 'Audit', 'Reporting COBAC'] },
        ],
      },
      chartes: [
        { titre: 'Charte du Conseil d\'Administration', reference: 'CHA-CA-FT-2026-v1', derniere_revision: '2026-04-01', articles_cles: 14, statut: 'Actif' },
        { titre: 'Charte Comité Audit & Risques', reference: 'CHA-CAR-FT-2026-v1', derniere_revision: '2026-05-15', articles_cles: 12, statut: 'Actif' },
      ],
      matrice_rci: [
        { risque: 'Fraude transactionnelle', controle: 'ML scoring + règles métier + review manuelle', responsable: 'CCO', periodicite: 'Temps réel' },
        { risque: 'Violation données personnelles', controle: 'Chiffrement AES-256 + RBAC + audit trail', responsable: 'CTO', periodicite: 'Continue' },
      ],
    },
    risk_map: {
      date_evaluation: '2026-06-22',
      methode: 'ISO 31000:2018',
      risques: [
        { id: 'R-201', categorie: 'Fraude', risque: 'Fraude transactionnelle — compte mule', probabilite: 55, impact_financier: 70, impact_operationnel: 50, impact_reputationnel: 85, score_brut: 65, controles_existants: 'ML scoring + règles métier', score_residuel: 28, tendance: 'hausse', proprietaire: 'CCO' },
        { id: 'R-202', categorie: 'SI', risque: 'Indisponibilité plateforme de paiement', probabilite: 20, impact_financier: 85, impact_operationnel: 95, impact_reputationnel: 80, score_brut: 70, controles_existants: 'AWS multi-AZ, auto-scaling, DRP', score_residuel: 18, tendance: 'stable', proprietaire: 'CTO' },
        { id: 'R-203', categorie: 'Conformité', risque: 'Non-détection client PEP', probabilite: 35, impact_financier: 50, impact_operationnel: 30, impact_reputationnel: 60, score_brut: 44, controles_existants: 'API screening listes sanctions', score_residuel: 22, tendance: 'baisse', proprietaire: 'CCO' },
      ],
      heatmap_data: [
        { x: 4, y: 4, label: 'Fraude/SI', count: 2 },
        { x: 3, y: 3, label: 'Conformité', count: 1 },
      ],
    },
    policies_pack: [
      { id: 'POL-201', titre: 'Politique LBC/FT — Établissement de Paiement', reference: 'POL-LBCFT-FT-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-03-01', date_prochaine_revision: '2027-03-01', proprietaire: 'CCO', articles: 30, pages: 50, statut: 'En révision', resume: 'Politique LBC/FT adaptée aux établissements de paiement : KYC digital, scoring automatisé, BE, DS, gel avoirs.', destinataires: ['Tout le personnel', 'COBAC'] },
      { id: 'POL-202', titre: 'Politique de Sécurité SI — ISO 27001', reference: 'POL-SSI-FT-2026-v2', categorie: 'SI/Sécurité', version: 'v2.0', date_approbation: '2026-02-15', date_prochaine_revision: '2027-02-15', proprietaire: 'CTO', articles: 35, pages: 60, statut: 'Actif', resume: 'Politique SSI complète : gestion accès, chiffrement, PCA/PRA, pentest, incident response.', destinataires: ['Équipe Tech', 'Direction'] },
      { id: 'POL-203', titre: 'Procédure KYC Digital — API-First', reference: 'PRO-KYC-FT-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-04-10', date_prochaine_revision: '2027-04-10', proprietaire: 'CCO', articles: 18, pages: 28, statut: 'Actif', resume: 'KYC 100% digital via API : OCR CNI, vérification biométrique, screening automatique listes sanctions, scoring risque.', destinataires: ['Équipe Tech', 'Compliance'] },
      { id: 'POL-204', titre: 'Procédure Déclaration de Soupçons Automatisée', reference: 'PRO-DS-FT-2026-v1', categorie: 'LBC/FT', version: 'v1.0', date_approbation: '2026-05-01', date_prochaine_revision: '2027-05-01', proprietaire: 'CCO', articles: 12, pages: 20, statut: 'Actif', resume: 'DS automatisée via API GABAC avec circuit validation CCO < 24h.', destinataires: ['CCO', 'DG'] },
    ],
    control_matrix: {
      norme_reference: 'ISO 27001:2022 / COBAC R-2026/03 / COSO 2013',
      domaines: [
        {
          domaine: 'Sécurité SI',
          controles: [
            { id: 'CTRL-201', controle: 'Pentest annuel + correction vulnérabilités critiques', type: 'Détectif', frequence: 'Annuelle', automatise: false, responsable: 'CTO', description: 'Pentest externe annuel avec SLA de correction : critiques < 7j, hautes < 30j', preuve: 'Rapport pentest + tickets Jira', kpi: '0 vulnérabilité critique > 7j', seuil_alerte: '> 0' },
            { id: 'CTRL-202', controle: 'Sauvegarde chiffrée quotidienne multi-région', type: 'Correctif', frequence: 'Quotidienne', automatise: true, responsable: 'CTO', description: 'Sauvegarde automatique multi-région avec chiffrement AES-256', preuve: 'Logs AWS Backup', kpi: 'RPO ≤ 15min, RTO ≤ 1h', seuil_alerte: 'RPO > 1h' },
            { id: 'CTRL-203', controle: 'RBAC — Revue trimestrielle des accès', type: 'Préventif', frequence: 'Trimestrielle', automatise: true, responsable: 'CTO', description: 'Revue automatique des droits d\'accès, détection privilèges excessifs', preuve: 'Rapport IAM review', kpi: '0 compte avec privilèges non justifiés', seuil_alerte: '> 0' },
          ],
        },
        {
          domaine: 'LBC/FT',
          controles: [
            { id: 'CTRL-204', controle: 'Screening temps réel transactions', type: 'Préventif', frequence: 'Temps réel', automatise: true, responsable: 'CCO', description: 'Screening 100% automatisé des transactions contre listes sanctions + scoring ML fraude', preuve: 'Logs Elasticsearch', kpi: '100% transactions screenées < 200ms', seuil_alerte: '< 99.9%' },
          ],
        },
      ],
    },
    audit_readiness_pack: {
      score_global: 62,
      checklist_inspection: [
        { item: 'Politique LBC/FT à jour', statut: 'Partiel', priorite: 'P0', action: 'Finaliser la politique LBC/FT v1.0' },
        { item: 'KYC digital opérationnel', statut: 'OK', priorite: 'P0', action: 'KYC API fonctionnel depuis Q1 2026' },
        { item: 'Procédure DS automatisée', statut: 'OK', priorite: 'P1', action: 'Workflow n8n déployé' },
        { item: 'Registre BE digitalisé', statut: 'OK', priorite: 'P0', action: '92% digitalisé via KYC API' },
        { item: 'Pentest annuel réalisé', statut: 'OK', priorite: 'P1', action: 'Pentest Q1 2026, 0 critique restante' },
        { item: 'PCA/PRA documenté', statut: 'Partiel', priorite: 'P1', action: 'PCA documenté, PRA à finaliser' },
      ],
      documents_requis: [
        { document: 'Politique LBC/FT', disponible: true, localisation: 'Notion — Compliance', format: 'PDF' },
        { document: 'Rapport pentest 2026', disponible: true, localisation: 'Jira — Security', format: 'PDF' },
        { document: 'Registre BE', disponible: true, localisation: 'Base de données — export CSV', format: 'CSV' },
        { document: 'PCA/PRA', disponible: true, localisation: 'Confluence — SRE', format: 'PDF' },
      ],
      entretiens_preparation: [
        { interlocuteur: 'CEO', role: 'CEO', points_cles: ['Stratégie FinTech', 'Modèle économique', 'Gouvernance'], documents_a_maitriser: ['Business Plan', 'Pitch Deck'] },
        { interlocuteur: 'CTO', role: 'CTO', points_cles: ['Architecture SI', 'Sécurité', 'PCA/PRA', 'KYC API'], documents_a_maitriser: ['Architecture diagram', 'Pentest report', 'DRP'] },
        { interlocuteur: 'CCO', role: 'CCO', points_cles: ['LBC/FT', 'KYC', 'DS', 'Registre BE'], documents_a_maitriser: ['Politique LBC/FT', 'Registre BE', 'Procédure DS'] },
      ],
      scenarios_test: [
        { scenario: 'Tentative création compte avec CNI falsifiée', resultat_attendu: 'Rejet automatique par OCR + alerte CCO', procedure_test: 'Soumettre CNI avec incohérences OCR détectables' },
        { scenario: 'Transaction > 10M FCFA vers pays liste grise', resultat_attendu: 'Blocage automatique + alerte CCO + vérification manuelle', procedure_test: 'Simuler transaction 15M FCFA vers juridiction GAFI' },
      ],
      calendrier_preparation: [
        { etape: 'J-45 : Finaliser politique LBC/FT v1.0', echeance: '2026-08-10', responsable: 'CCO', livrable: 'Politique LBC/FT approuvée CA' },
        { etape: 'J-30 : Finaliser PRA', echeance: '2026-08-25', responsable: 'CTO', livrable: 'PRA documenté et testé' },
        { etape: 'J-15 : Briefing inspection', echeance: '2026-09-10', responsable: 'CEO + CCO + CTO', livrable: 'Dossier inspection complet' },
      ],
    },
    n8n_workflows: [
      {
        id: 'WF-CF003-01',
        nom: 'KYC Digital Onboarding — Full Auto',
        declencheur: { type: 'Webhook', config: 'POST /api/v1/kyc/onboard' },
        noeuds: [
          { nom: 'Webhook', type: 'trigger', action: 'Réception données KYC', parametres: { method: 'POST', path: '/api/v1/kyc/onboard' } },
          { nom: 'OCR Identity', type: 'http', action: 'Extraction OCR CNI', parametres: { endpoint: 'POST /api/ocr/identity', confidence: '95%' } },
          { nom: 'Face Match', type: 'http', action: 'Vérification biométrique', parametres: { endpoint: 'POST /api/biometric/face-match' } },
          { nom: 'Sanctions Screening', type: 'http', action: 'Screening listes sanctions', parametres: { endpoint: 'POST /api/compliance/screen' } },
          { nom: 'Risk Score', type: 'function', action: 'Calcul score risque', parametres: { model: 'v2.1' } },
          { nom: 'Decision Router', type: 'switch', action: 'Approve / Review / Reject', parametres: { routes: 'score<30→Approve, 30-70→Review, >70→Reject' } },
        ],
        json_import: '{"name":"KYC Digital Onboarding","nodes":[...6 nodes...]}',
        score_automatisation: 97,
      },
    ],
    client_report: {
      titre: 'Rapport de Conformité — PayCEMAC SA — 2026',
      structure_pdf: [
        { section: 'Résumé Exécutif', contenu: 'Score 62/100. Avantage clé : architecture nativement digitale. KYC 100% API-first, scoring ML, screening automatique. Points d\'amélioration : politique LBC/FT à finaliser, PRA à compléter.', sous_sections: [] },
        { section: '1. Avantage Digital', contenu: 'KYC API, scoring ML, screening temps réel, RBAC automatisé — la plateforme est un atout différenciant.', sous_sections: [] },
        { section: '2. Sécurité SI', contenu: 'Pentest 2026 clean, AWS multi-AZ, sauvegardes chiffrées, PCA documenté.', sous_sections: [] },
      ],
      annexes: ['Annexe A — Architecture SI', 'Annexe B — Résultats pentest 2026'],
      resume_executif: 'PayCEMAC SA bénéficie d\'une architecture digitale de pointe qui facilite la conformité. Score 62/100 avec un potentiel d\'atteindre 80+ après finalisation des documents.',
      recommandations_prioritaires: ['Finaliser politique LBC/FT', 'Finaliser PRA', 'Maintenir le rythme des pentests annuels'],
      destinataire: 'Conseil d\'Administration — PayCEMAC SA',
    },
    metadata: {
      generateur: 'KOS Compliance Factory Engine™ — Industrial Grade v1.0',
      date_generation: '2026-06-24T10:32:00Z',
      duree_generation_secondes: 5.1,
      normes_appliquees: ['COBAC R-2026/03', 'ISO 27001:2022', 'GAFI 2026'],
      mode: 'MOCK — Démo Interactive Compliance Factory',
    },
  },

  // ─── CF-004 : Groupe Bancaire Panafricain ───
  {
    scenario: SCENARIOS[3],
    governance_framework: {
      version: 'GF-2026-004-v2.0',
      date_generation: '2026-06-24',
      structure: {
        organes: [
          { nom: 'Conseil d\'Administration Groupe', composition: '15 membres dont 6 indépendants', frequence_reunion: 'Trimestrielle', attributions: ['Stratégie groupe', 'Allocation capital', 'Fusions/acquisitions', 'Politiques groupe'], membres_requis: 15 },
          { nom: 'Comité Exécutif Groupe', composition: 'CEO + CFO + CRO + CCO + CIO + 6 Country Heads', frequence_reunion: 'Mensuelle', attributions: ['Exécution stratégie', 'Coordination cross-frontières', 'Allocation ressources'], membres_requis: 11 },
        ],
        comites_specialises: [
          { nom: 'Comité d\'Audit Groupe', president: 'Admin. Indépendant Senior', membres: '4 administrateurs (3 indép.)', frequence: 'Trimestrielle', missions: ['Audit consolidé', 'IFRS', 'Contrôle interne groupe', 'Relations régulateurs'] },
          { nom: 'Comité des Risques Groupe', president: 'Admin. Indépendant', membres: '4 administrateurs + CRO Groupe', frequence: 'Mensuelle', missions: ['Cartographie risques consolidée', 'Stress tests groupe', 'Risques transfrontaliers'] },
          { nom: 'Comité de Conformité Groupe', president: 'Admin. Indépendant', membres: '4 administrateurs + CCO Groupe', frequence: 'Mensuelle', missions: ['Harmonisation LBC/FT multi-juridictions', 'Veille COBAC+BCEAO', 'Formation groupe'] },
        ],
        lignes_reporting: [
          { niveau: 'Niveau 1 — Filiales', rapporte_a: 'Country Head', responsabilites: ['Opérations locales', 'KYC/CDD local', 'Reporting régulateur local'] },
          { niveau: 'Niveau 2 — Groupe', rapporte_a: 'Comité Exécutif', responsabilites: ['Politiques groupe', 'Contrôle permanent consolidé', 'Conformité groupe'] },
          { niveau: 'Niveau 3 — Audit Groupe', rapporte_a: 'Comité d\'Audit', responsabilites: ['Audit interne consolidé', 'Audit externe groupe', 'Inspections multi-régulateurs'] },
        ],
      },
      chartes: [
        { titre: 'Charte du Conseil d\'Administration Groupe', reference: 'CHA-CA-GRP-2026-v3', derniere_revision: '2026-03-01', articles_cles: 22, statut: 'Actif' },
        { titre: 'Charte du Comité d\'Audit Groupe', reference: 'CHA-CAUD-GRP-2026-v3', derniere_revision: '2026-03-15', articles_cles: 16, statut: 'Actif' },
        { titre: 'Charte du Comité des Risques Groupe', reference: 'CHA-CRIS-GRP-2026-v2', derniere_revision: '2026-04-01', articles_cles: 18, statut: 'Actif' },
        { titre: 'Charte du Comité de Conformité Groupe', reference: 'CHA-CCONF-GRP-2026-v2', derniere_revision: '2026-05-01', articles_cles: 20, statut: 'Actif' },
        { titre: 'Politique de Gouvernance des Filiales', reference: 'POL-GOV-FIL-2026-v2', derniere_revision: '2026-02-01', articles_cles: 30, statut: 'Actif' },
      ],
      matrice_rci: [
        { risque: 'Non-conformité multi-juridictionnelle', controle: 'Harmonisation politiques + audits croisés', responsable: 'CCO Groupe', periodicite: 'Trimestrielle' },
        { risque: 'Risque de change UEMOA/CEMAC', controle: 'Couverture forward + limites par devise', responsable: 'CRO Groupe', periodicite: 'Quotidienne' },
        { risque: 'Cyberattaque sur filiale faible', controle: 'SOC groupe + pentest filiales + standard minimal SSI', responsable: 'CIO Groupe', periodicite: 'Continue' },
      ],
    },
    risk_map: {
      date_evaluation: '2026-06-15',
      methode: 'ISO 31000:2018 — Multi-entités consolidé',
      risques: [
        { id: 'R-301', categorie: 'Conformité', risque: 'Divergence réglementaire CEMAC vs UEMOA', probabilite: 60, impact_financier: 70, impact_operationnel: 55, impact_reputationnel: 80, score_brut: 66, controles_existants: 'Veille réglementaire groupe, CCO par zone', score_residuel: 32, tendance: 'stable', proprietaire: 'CCO Groupe' },
        { id: 'R-302', categorie: 'Crédit', risque: 'Concentration portefeuille corporate (>25% sur 3 clients)', probabilite: 40, impact_financier: 90, impact_operationnel: 50, impact_reputationnel: 45, score_brut: 56, controles_existants: 'Limites grands risques, suivi sectoriel', score_residuel: 30, tendance: 'hausse', proprietaire: 'CRO Groupe' },
        { id: 'R-303', categorie: 'Opérationnel', risque: 'Défaillance core banking filiale', probabilite: 15, impact_financier: 65, impact_operationnel: 90, impact_reputationnel: 70, score_brut: 60, controles_existants: 'DRP groupe, backup site secondaire', score_residuel: 20, tendance: 'stable', proprietaire: 'CIO Groupe' },
        { id: 'R-304', categorie: 'Liquidité', risque: 'Asymétrie liquidité entre filiales', probabilite: 30, impact_financier: 60, impact_operationnel: 70, impact_reputationnel: 50, score_brut: 53, controles_existants: 'ALM consolidé, pool de liquidité groupe', score_residuel: 25, tendance: 'baisse', proprietaire: 'CFO Groupe' },
      ],
      heatmap_data: [
        { x: 4, y: 4, label: 'Conformité/Crédit', count: 2 },
        { x: 3, y: 4, label: 'Liquidité', count: 1 },
        { x: 2, y: 4, label: 'Opérationnel', count: 1 },
      ],
    },
    policies_pack: [
      { id: 'POL-301', titre: 'Politique LBC/FT Groupe — Multi-juridictionnelle', reference: 'POL-LBCFT-GRP-2026-v3', categorie: 'LBC/FT', version: 'v3.0', date_approbation: '2026-01-15', date_prochaine_revision: '2027-01-15', proprietaire: 'CCO Groupe', articles: 55, pages: 95, statut: 'Actif', resume: 'Politique LBC/FT consolidée couvrant CEMAC et UEMOA. Harmonisation KYC, CDD, BE, DS, formation. Standards minimaux par filiale.', destinataires: ['Toutes filiales', 'CA Groupe', 'COBAC', 'BCEAO'] },
      { id: 'POL-302', titre: 'Politique de Gestion des Risques Groupe', reference: 'POL-RISK-GRP-2026-v2', categorie: 'Risques', version: 'v2.0', date_approbation: '2026-02-01', date_prochaine_revision: '2027-02-01', proprietaire: 'CRO Groupe', articles: 45, pages: 80, statut: 'Actif', resume: 'Cadre de gestion des risques consolidé : crédit, marché, liquidité, opérationnel, conformité, change, pays.', destinataires: ['Toutes filiales', 'Comité Risques'] },
      { id: 'POL-303', titre: 'Politique de Sécurité SI Groupe', reference: 'POL-SSI-GRP-2026-v2', categorie: 'SI/Sécurité', version: 'v2.0', date_approbation: '2026-03-01', date_prochaine_revision: '2027-03-01', proprietaire: 'CIO Groupe', articles: 40, pages: 70, statut: 'Actif', resume: 'Politique SSI groupe avec standards minimaux par filiale : pentest, SOC, PCA/PRA, chiffrement.', destinataires: ['DSI filiales', 'CIO Groupe'] },
      { id: 'POL-304', titre: 'Code de Conduite Groupe', reference: 'POL-ETH-GRP-2026-v3', categorie: 'Gouvernance', version: 'v3.0', date_approbation: '2026-01-01', date_prochaine_revision: '2027-01-01', proprietaire: 'DRH Groupe', articles: 25, pages: 40, statut: 'Actif', resume: 'Code de conduite applicable à toutes les filiales. Conflits d\'intérêts, confidentialité, anti-corruption.', destinataires: ['Tous les collaborateurs groupe'] },
    ],
    control_matrix: {
      norme_reference: 'ISO 31000:2018 / COBAC R-2025/07 / BCEAO / COSO 2013',
      domaines: [
        {
          domaine: 'Gouvernance Groupe',
          controles: [
            { id: 'CTRL-301', controle: 'Audit croisé filiales (peer review)', type: 'Détectif', frequence: 'Annuelle', automatise: false, responsable: 'Audit Interne Groupe', description: 'Audit croisé annuel entre filiales pour détecter les écarts de pratiques', preuve: 'Rapport peer review', kpi: '100% filiales auditées/an', seuil_alerte: '< 90%' },
            { id: 'CTRL-302', controle: 'Reporting consolidé LBC/FT mensuel', type: 'Détectif', frequence: 'Mensuelle', automatise: true, responsable: 'CCO Groupe', description: 'Consolidation mensuelle des indicateurs LBC/FT de toutes les filiales', preuve: 'Tableau de bord consolidé', kpi: 'Rapport transmis au Comité Conformité sous 10 jours', seuil_alerte: 'Délai > 15 jours' },
          ],
        },
        {
          domaine: 'Risques Transfrontaliers',
          controles: [
            { id: 'CTRL-303', controle: 'Limites grands risques consolidées', type: 'Préventif', frequence: 'Continue', automatise: true, responsable: 'CRO Groupe', description: 'Monitoring consolidé des grands risques avec agrégation automatique trans-filiales', preuve: 'Dashboard consolidé', kpi: '0 dépassement limite grands risques', seuil_alerte: '> 0' },
          ],
        },
      ],
    },
    audit_readiness_pack: {
      score_global: 85,
      checklist_inspection: [
        { item: 'Harmonisation LBC/FT entre filiales CEMAC et UEMOA', statut: 'OK', priorite: 'P1', action: 'Politique groupe v3 déployée dans 6/6 filiales' },
        { item: 'Registre BE consolidé', statut: 'OK', priorite: 'P0', action: 'Registre BE groupe à 97%' },
        { item: 'Audits externes à jour toutes filiales', statut: 'Partiel', priorite: 'P0', action: '5/6 filiales à jour — Filiale RCA en retard (audit planifié Q3)' },
        { item: 'Stress tests groupe documentés', statut: 'OK', priorite: 'P1', action: 'Stress tests 2026 complétés et présentés au CA' },
        { item: 'Formation LBC/FT groupe', statut: 'OK', priorite: 'P2', action: '96% collaborateurs formés en 2026' },
        { item: 'PCA/PRA groupe testé', statut: 'OK', priorite: 'P1', action: 'Test PCA groupe réalisé en mars 2026' },
      ],
      documents_requis: [
        { document: 'Politique LBC/FT Groupe v3', disponible: true, localisation: 'SharePoint Groupe — Compliance', format: 'PDF' },
        { document: 'Rapports d\'audit externe (6 filiales)', disponible: true, localisation: 'Audit Interne Groupe — Dossiers A-01 à A-06', format: 'PDF' },
        { document: 'Cartographie risques consolidée', disponible: true, localisation: 'CRO Groupe — GRC Tool', format: 'PDF/Excel' },
        { document: 'Tableau de bord conformité consolidé', disponible: true, localisation: 'Power BI Groupe', format: 'Power BI' },
      ],
      entretiens_preparation: [
        { interlocuteur: 'CEO Groupe', role: 'CEO', points_cles: ['Stratégie panafricaine', 'Gouvernance groupe', 'Relations régulateurs'], documents_a_maitriser: ['Stratégie 2026-2030', 'Rapport annuel 2025'] },
        { interlocuteur: 'CCO Groupe', role: 'CCO Groupe', points_cles: ['Harmonisation LBC/FT', 'Registre BE', 'Formation', 'Divergences CEMAC/UEMOA'], documents_a_maitriser: ['Politique LBC/FT Groupe', 'Dashboard conformité', 'Plan formation 2026'] },
      ],
      scenarios_test: [
        { scenario: 'Transaction transfrontalière CEMAC→UEMOA client à haut risque', resultat_attendu: 'Blocage automatique + escalade CCO zone + CCO Groupe', procedure_test: 'Simuler transfert 50M FCFA client高风险 → pays UEMOA' },
      ],
      calendrier_preparation: [
        { etape: 'J-60 : Audit externe filiale RCA', echeance: '2026-08-01', responsable: 'Audit Interne Groupe', livrable: 'Rapport d\'audit RCA' },
        { etape: 'J-30 : Simulation inspection multi-régulateurs', echeance: '2026-09-01', responsable: 'CCO Groupe', livrable: 'Rapport simulation' },
        { etape: 'J-7 : Briefing CA Groupe', echeance: '2026-09-24', responsable: 'CEO + CCO', livrable: 'Dossier inspection complet' },
      ],
    },
    n8n_workflows: [
      {
        id: 'WF-CF004-01',
        nom: 'Consolidation Mensuelle LBC/FT — 6 Filiales → Dashboard Groupe',
        declencheur: { type: 'Cron', config: '0 6 5 * * — Le 5 de chaque mois à 06:00' },
        noeuds: [
          { nom: 'Cron Trigger', type: 'trigger', action: 'Déclenchement mensuel', parametres: { cron: '0 6 5 * *' } },
          { nom: 'Collect Filiale 1', type: 'http', action: 'API filiale Cameroun', parametres: { endpoint: 'GET /api/filiale-cm/reporting/lbcft' } },
          { nom: 'Collect Filiale 2', type: 'http', action: 'API filiale Gabon', parametres: { endpoint: 'GET /api/filiale-ga/reporting/lbcft' } },
          { nom: 'Collect Filiale 3-6', type: 'http', action: 'API 4 autres filiales (parallèle)', parametres: { endpoints: 'filiales CG, GQ, CI, SN' } },
          { nom: 'Aggregate & Normalize', type: 'function', action: 'Agrégation données multi-juridictions', parametres: { normalize: 'COBAC↔BCEAO mapping' } },
          { nom: 'Generate Dashboard', type: 'function', action: 'Génération dashboard Power BI', parametres: { refresh: 'dataset' } },
          { nom: 'Notify CCO Groupe', type: 'email', action: 'Notification dashboard disponible', parametres: { to: 'cco@groupe.cm', attachment: 'PDF dashboard' } },
        ],
        json_import: '{"name":"Consolidation LBC/FT Groupe","nodes":[...7 nodes...]}',
        score_automatisation: 92,
      },
    ],
    client_report: {
      titre: 'Rapport de Conformité Consolidé — Groupe Bancaire Panafricain — 2026',
      structure_pdf: [
        { section: 'Résumé Exécutif', contenu: 'Score consolidé 85/100. Le Groupe démontre une maturité élevée avec une politique LBC/FT harmonisée sur 6 juridictions. Seul point d\'attention : audit externe filiale RCA en retard (planifié Q3 2026).', sous_sections: [] },
        { section: '1. Gouvernance Groupe', contenu: 'CA 15 membres (40% indépendants), 3 comités groupe, 6 Country Heads. Politique de gouvernance des filiales robuste.', sous_sections: [] },
        { section: '2. Cartographie Risques Consolidée', contenu: '4 risques majeurs identifiés. Divergence réglementaire CEMAC/UEMOA : risque principal. Score résiduel moyen : 27/100.', sous_sections: [] },
        { section: '3. Politiques Groupe', contenu: '4 politiques groupe harmonisées. Déploiement 100% dans 6 filiales.', sous_sections: [] },
        { section: '4. Matrice de Contrôle', contenu: 'Contrôles consolidés : peer review annuel, reporting mensuel LBC/FT, limites grands risques.', sous_sections: [] },
        { section: '5. Préparation Inspection', contenu: 'Score inspection readiness : 85/100. Filiale RCA : point d\'attention unique.', sous_sections: [] },
      ],
      annexes: ['Annexe A — Organigramme Groupe', 'Annexe B — Cartographie risques consolidée', 'Annexe C — Dashboard conformité (extrait)', 'Annexe D — Plan d\'audit 2026-2027'],
      resume_executif: 'Le Groupe Bancaire Panafricain atteint un score de conformité consolidé de 85/100, démontrant une maturité élevée de son dispositif. L\'harmonisation LBC/FT multi-juridictionnelle est un succès. La filiale RCA nécessite un rattrapage avant Q3 2026.',
      recommandations_prioritaires: ['Finaliser l\'audit externe filiale RCA avant Q3 2026', 'Renforcer le monitoring consolidé des risques transfrontaliers', 'Maintenir le rythme des formations LBC/FT (>95% annuel)', 'Anticiper les évolutions GAFI 2027'],
      destinataire: 'Conseil d\'Administration — Groupe Bancaire Panafricain',
    },
    metadata: {
      generateur: 'KOS Compliance Factory Engine™ — Industrial Grade v1.0',
      date_generation: '2026-06-24T10:33:00Z',
      duree_generation_secondes: 12.7,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BCEAO', 'BEAC n°008-2026', 'GABAC n°01/2026', 'ISO 31000:2018', 'COSO 2013', 'GAFI 2026'],
      mode: 'MOCK — Démo Interactive Compliance Factory',
    },
  },
];

// ═══════════════════════════════════════════════════════
// FACTORY AGENTS
// ═══════════════════════════════════════════════════════

export const FACTORY_AGENTS = [
  { id: 'cfe-01', nom: 'Governance Framework Generator™', mission: 'Génération automatique du cadre de gouvernance complet : organes, comités, chartes, lignes de reporting, matrice RCI', statut: 'active', frameworks_generes: 4, precision: 98.5, icon: 'ri-organization-chart' },
  { id: 'cfe-02', nom: 'Risk Map Builder™', mission: 'Cartographie des risques structurée ISO 31000 avec heatmap, scores brut/résiduel, tendances, propriétaires', statut: 'active', risques_cartographies: 16, precision: 97.8, icon: 'ri-radar-line' },
  { id: 'cfe-03', nom: 'Policies Pack Assembler™', mission: 'Génération du pack complet de politiques et procédures : LBC/FT, KYC, risques, CI, SSI, ESG, gouvernance', statut: 'active', documents_generes: 22, precision: 98.0, icon: 'ri-file-text-line' },
  { id: 'cfe-04', nom: 'Control Matrix Builder™', mission: 'Matrice de contrôle ISO/COSO : contrôles préventifs/détectifs/correctifs, KPI, seuils, responsables', statut: 'active', controles_definis: 35, precision: 98.2, icon: 'ri-table-line' },
  { id: 'cfe-05', nom: 'Audit Readiness Pack Generator™', mission: 'Pack complet de préparation à l\'inspection : checklist, documents requis, entretiens, scénarios, calendrier', statut: 'active', packs_generes: 4, precision: 97.5, icon: 'ri-clipboard-line' },
  { id: 'cfe-06', nom: 'n8n Workflow Architect™', mission: 'Génération de workflows n8n exécutables avec JSON d\'import : screening, reporting, consolidation, alertes', statut: 'active', workflows_generes: 5, precision: 96.0, icon: 'ri-flow-chart' },
  { id: 'cfe-07', nom: 'Client Report Writer™', mission: 'Rédaction du rapport client PDF : résumé exécutif, structure complète, annexes, recommandations prioritaires', statut: 'active', rapports_rediges: 4, precision: 99.0, icon: 'ri-article-line' },
];

export const FACTORY_KPIS = {
  scenarios_disponibles: 4,
  types_institutions: ['Banque', 'EMF', 'FinTech', 'Multi-entité'],
  livrables_par_scenario: 7,
  total_livrables_generes: 28,
  documents_politiques: 22,
  controles_definis: 35,
  workflows_n8n: 5,
  score_maturite_moyen: 61.8,
  temps_generation_moyen: '7.6 secondes',
  mode: 'MOCK — Démo Interactive Compliance Factory',
};





