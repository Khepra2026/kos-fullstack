// KOS REGULATORY REMEDIATION ENGINE™ — Mock Data
// Moteur d'exécution, correction et maintien réglementaire
// 16 Phases — Big Four Grade (PwC/Deloitte/EY/KPMG)
// Généré le 16 Juin 2026

// ─── TYPES ──────────────────────────────────────────────────────────────────

export type RemediationWarRoomRole = 'Gouvernance' | 'Juridique' | 'Conformité' | 'Risques' | 'Contrôle_Interne' | 'IT' | 'Cybersécurité' | 'Données' | 'Reporting' | 'Documentation';

export type RemediationPriority = 'critique' | 'haute' | 'moyenne' | 'basse';

export type RemediationStatus = 'non_demarre' | 'en_cours' | 'termine' | 'bloque' | 'en_retard';

export type LegalClassificationLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type ReferenceGapType = 'obsolete' | 'incomplete' | 'non_verifiable' | 'doublon' | 'format_non_standard';

export type ComplianceEngineType = 'bceao' | 'ohada' | 'gafi' | 'privacy' | 'cyber';

export type AgentType = 'regulatory_watch' | 'regulatory_update' | 'regulatory_proof' | 'content_scanner' | 'auto_corrector' | 'evidence_collector';

export interface WarRoomEntry {
  id: string;
  role: RemediationWarRoomRole;
  owner: string;
  deadline: string;
  priority: RemediationPriority;
  budget: string;
  risk_level: string;
  status: RemediationStatus;
  progress: number;
  description: string;
  deliverables: string[];
  blockers: string[];
}

export interface ScannedReference {
  id: string;
  reference: string;
  type: string;
  source: string;
  date: string;
  version: string | null;
  lien: string | null;
  auteur: string;
  classification_level: LegalClassificationLevel;
  classification_label: string;
  status_juridique: 'en_vigueur' | 'modifie' | 'remplace' | 'abroge';
  ecart_type: ReferenceGapType | null;
  ecart_detail: string | null;
  correction_appliquee: boolean;
  correction_date: string | null;
  composant_kos: string;
}

export interface AutoCorrectionLog {
  id: string;
  reference_id: string;
  ancien_texte: string;
  nouveau_texte: string;
  type_correction: 'remplacement' | 'ajout' | 'suppression' | 'normalisation';
  fichier_source: string;
  date_correction: string;
  statut: 'appliquee' | 'en_attente' | 'rejetee' | 'a_reviser';
  verifie_par: string | null;
  preuve: string | null;
}

export interface ComplianceEngineScore {
  engine: ComplianceEngineType;
  label: string;
  icon: string;
  color: string;
  score_actuel: number;
  score_cible: number;
  total_controles: number;
  controles_conformes: number;
  controles_partiels: number;
  controles_non_conformes: number;
  gaps_critiques: number;
  derniere_evaluation: string;
  controles: ComplianceEngineControl[];
}

export interface ComplianceEngineControl {
  id: string;
  controle: string;
  statut: 'conforme' | 'partiel' | 'non_conforme';
  reference: string;
  score: number;
  observations: string;
}

export interface EvidenceRecord {
  id: string;
  type: 'capture' | 'pdf' | 'decision' | 'rapport' | 'controle' | 'validation';
  titre: string;
  reference_id: string;
  horodatage: string;
  responsable: string;
  format: string;
  taille: string;
  url: string | null;
  tags: string[];
}

export interface AutonomousAgent {
  id: string;
  type: AgentType;
  nom: string;
  description: string;
  statut: 'actif' | 'inactif' | 'en_deploiement' | 'erreur';
  derniere_activite: string;
  sources_surveillees: string[];
  alertes_generees: number;
  corrections_effectuees: number;
  preuves_produites: number;
  uptime_pct: number;
}

export interface RemediationExecutiveKPIs {
  score_global_conformite: number;
  score_global_cible: number;
  references_verifiables_pct: number;
  textes_tracables_pct: number;
  sources_officielles_pct: number;
  historisation_pct: number;
  auditabilite_pct: number;
  veille_reglementaire_pct: number;
  total_references_scannees: number;
  total_corrections_appliquees: number;
  total_corrections_en_attente: number;
  total_preuves_collectees: number;
  agents_actifs: number;
  agents_total: number;
  alertes_critiques: number;
  derniere_maj: string;
}

// ─── PHASE 1 — REGULATORY WAR ROOM ──────────────────────────────────────────

export const WAR_ROOM: WarRoomEntry[] = [
  {
    id: 'WR-001',
    role: 'Gouvernance',
    owner: 'Conseil d\'Administration / DG',
    deadline: '2026-09-30',
    priority: 'critique',
    budget: '45 000 €',
    risk_level: 'Élevé',
    status: 'en_cours',
    progress: 72,
    description: 'Mise en conformité de la gouvernance : séparation des pouvoirs, indépendance administrateurs, comités spécialisés, chartes approuvées',
    deliverables: ['Chartes comités approuvées CA', 'Déclarations indépendance signées', 'PV CA documentant séparation pouvoirs', 'Registre délibérations à jour'],
    blockers: ['Attente signature président CA sur charte comité risques'],
  },
  {
    id: 'WR-002',
    role: 'Juridique',
    owner: 'Direction Juridique',
    deadline: '2026-08-15',
    priority: 'critique',
    budget: '32 000 €',
    risk_level: 'Critique',
    status: 'en_cours',
    progress: 58,
    description: 'Vérification complète de toutes les références juridiques : statuts, contrats, conventions réglementées, registre des actionnaires',
    deliverables: ['Registre légal complet', 'Statuts mis à jour', 'Conventions réglementées approuvées', 'Registre actionnaires certifié'],
    blockers: ['Convention réglementée n°3 en attente signature CAC'],
  },
  {
    id: 'WR-003',
    role: 'Conformité',
    owner: 'Chief Compliance Officer',
    deadline: '2026-07-30',
    priority: 'critique',
    budget: '58 000 €',
    risk_level: 'Critique',
    status: 'en_cours',
    progress: 65,
    description: 'Plan conformité annuel, cartographie risques, veille réglementaire, gestion écarts, reporting trimestriel CA',
    deliverables: ['Plan conformité 2026', 'Cartographie risques LCB/FT', 'Rapports trimestriels CA', 'Registre écarts et plans correctifs'],
    blockers: ['Outil veille réglementaire en cours de déploiement'],
  },
  {
    id: 'WR-004',
    role: 'Risques',
    owner: 'Chief Risk Officer',
    deadline: '2026-08-30',
    priority: 'haute',
    budget: '41 000 €',
    risk_level: 'Élevé',
    status: 'en_cours',
    progress: 50,
    description: 'Dispositif gestion risques : cartographie, KRIs, stress tests, plans mitigation, rapport ICAAP',
    deliverables: ['Cartographie risques actualisée', 'Tableau KRIs', 'Rapports stress tests', 'Rapport ICAAP'],
    blockers: ['Stress test liquidité en attente données marché'],
  },
  {
    id: 'WR-005',
    role: 'Contrôle_Interne',
    owner: 'Audit Interne',
    deadline: '2026-07-30',
    priority: 'critique',
    budget: '36 000 €',
    risk_level: 'Critique',
    status: 'en_cours',
    progress: 45,
    description: 'Dispositif permanent CI : matrice contrôles, plan annuel, pistes audit, supervision, rapport annuel',
    deliverables: ['Matrice contrôles complète', 'Plan annuel CI 2026', 'Rapports trimestriels supervision', 'Rapport annuel CI'],
    blockers: ['Matrice contrôles niveau 2 en cours de validation'],
  },
  {
    id: 'WR-006',
    role: 'IT',
    owner: 'DSI',
    deadline: '2026-09-15',
    priority: 'haute',
    budget: '74 000 €',
    risk_level: 'Élevé',
    status: 'en_cours',
    progress: 63,
    description: 'Sécurité SI : politique sécurité, contrôle accès, journalisation, chiffrement, PCA/PRA',
    deliverables: ['Politique sécurité SI approuvée', 'Matrice contrôle accès', 'PCA documenté et testé', 'Rapport test intrusion'],
    blockers: ['Test intrusion annuel programmé Q3'],
  },
  {
    id: 'WR-007',
    role: 'Cybersécurité',
    owner: 'RSSI',
    deadline: '2026-10-15',
    priority: 'critique',
    budget: '92 000 €',
    risk_level: 'Critique',
    status: 'en_cours',
    progress: 40,
    description: 'Cadre cybersécurité complet : ISO 27001, tests intrusion, réponse incidents, formation, certification',
    deliverables: ['Politique cybersécurité', 'Plan réponse incidents', 'Rapport test intrusion', 'Plan formation cybersécurité', 'Dossier certification ISO 27001'],
    blockers: ['Budget certification ISO 27001 en discussion CA'],
  },
  {
    id: 'WR-008',
    role: 'Données',
    owner: 'DPO',
    deadline: '2026-08-30',
    priority: 'haute',
    budget: '28 000 €',
    risk_level: 'Élevé',
    status: 'en_cours',
    progress: 55,
    description: 'Protection données personnelles : registre traitements, consentement, droits, notification violations, chiffrement',
    deliverables: ['Registre traitements complet', 'Mentions consentement à jour', 'Procédure notification violations', 'DPO nommé officiellement'],
    blockers: ['Registre traitements fournisseurs en cours audit'],
  },
  {
    id: 'WR-009',
    role: 'Reporting',
    owner: 'CFO / Direction Financière',
    deadline: '2026-07-15',
    priority: 'haute',
    budget: '24 000 €',
    risk_level: 'Moyen',
    status: 'en_cours',
    progress: 78,
    description: 'Reporting prudentiel : SURFI, ratios, déclarations, états financiers PCB, rapport annuel',
    deliverables: ['Déclarations SURFI T2 2026', 'Calcul ratios prudentiels', 'États financiers format PCB', 'Rapport annuel 2025'],
    blockers: [],
  },
  {
    id: 'WR-010',
    role: 'Documentation',
    owner: 'Quality & Knowledge Manager',
    deadline: '2026-09-30',
    priority: 'moyenne',
    budget: '18 000 €',
    risk_level: 'Faible',
    status: 'en_cours',
    progress: 68,
    description: 'Centralisation documentaire : procédures, manuels, politiques, preuves, archivage sécurisé',
    deliverables: ['Procédures centralisées KOS', 'Manuels à jour', 'Politiques approuvées', 'Archivage électronique sécurisé'],
    blockers: [],
  },
];

// ─── PHASE 2-3 — INVENTAIRE RÉFÉRENCES + CLASSIFICATION ─────────────────────

export const SCANNED_REFERENCES: ScannedReference[] = [
  // Site internet — BCEAO
  {
    id: 'SR-001',
    reference: 'Instruction BCEAO n°001-01-2024',
    type: 'Instruction',
    source: 'BCEAO — Journal Officiel UEMOA',
    date: '2024-01-23',
    version: 'Originale',
    lien: 'https://www.bceao.int/fr/reglementation/instructions',
    auteur: 'BCEAO',
    classification_level: 5,
    classification_label: 'Instruction',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/mocks/blogArticlesPolicy.ts',
  },
  {
    id: 'SR-002',
    reference: 'Circulaire CB-UMOA n°01-2017/CB/C',
    type: 'Circulaire',
    source: 'SG-CB-UMOA',
    date: '2017-03-15',
    version: 'Modifiée 20/06/2021',
    lien: null,
    auteur: 'SG-CB-UMOA',
    classification_level: 6,
    classification_label: 'Circulaire',
    status_juridique: 'modifie',
    ecart_type: 'incomplete',
    ecart_detail: 'Référence au PCB révisé 2022 manquante dans 3 articles KOS',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/pages/blog/independance-administrateurs-circulaire-01-2017/page.tsx',
  },
  {
    id: 'SR-003',
    reference: 'Instruction BCEAO n°010-08-2010',
    type: 'Instruction',
    source: 'BCEAO',
    date: '2010-08-20',
    version: 'Originale',
    lien: null,
    auteur: 'BCEAO',
    classification_level: 5,
    classification_label: 'Instruction',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/data/glossary.ts',
  },
  {
    id: 'SR-004',
    reference: 'Règlement COBAC R-2016/04',
    type: 'Règlement',
    source: 'COBAC — Journal Officiel CEMAC',
    date: '2016-06-15',
    version: 'Originale',
    lien: null,
    auteur: 'COBAC',
    classification_level: 2,
    classification_label: 'Règlement',
    status_juridique: 'en_vigueur',
    ecart_type: 'non_verifiable',
    ecart_detail: 'Couverture à 55% — article dédié absent, seulement mentionné dans blogArticlesPolicy',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/mocks/blogArticlesPolicy.ts',
  },
  // Marketing claims à scanner
  {
    id: 'SR-005',
    type: 'Claim_Marketing',
    reference: 'Claim — "Leader"',
    source: 'Site KhepraExperts.com — Page Accueil',
    date: '2026-06-15',
    version: null,
    lien: '/',
    auteur: 'KOS Content',
    classification_level: 9,
    classification_label: 'Bonne Pratique',
    status_juridique: 'en_vigueur',
    ecart_type: 'non_verifiable',
    ecart_detail: 'Claim "Leader" détecté dans Hero — nécessite preuve documentaire (étude marché, part de marché)',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/pages/home/components/HeroNew.tsx',
  },
  {
    id: 'SR-006',
    type: 'Claim_Marketing',
    reference: 'Claim — "100%"',
    source: 'Site KhepraExperts.com — Page BCEAO',
    date: '2026-06-14',
    version: null,
    lien: '/bceao',
    auteur: 'KOS Content',
    classification_level: 9,
    classification_label: 'Bonne Pratique',
    status_juridique: 'en_vigueur',
    ecart_type: 'non_verifiable',
    ecart_detail: 'Claim "100% conformes" détecté — étayer par données vérifiables',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/pages/bceao/page.tsx',
  },
  // OHADA
  {
    id: 'SR-007',
    reference: 'Acte Uniforme OHADA — AUSCGIE révisé',
    type: 'Acte Uniforme',
    source: 'OHADA — Journal Officiel',
    date: '2014-01-30',
    version: 'Révisée',
    lien: 'https://www.ohada.org',
    auteur: 'OHADA',
    classification_level: 4,
    classification_label: 'Décision',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/data/glossary.ts',
  },
  {
    id: 'SR-008',
    reference: 'Acte Uniforme OHADA — AUDCIF',
    type: 'Acte Uniforme',
    source: 'OHADA — Journal Officiel',
    date: '2017-01-26',
    version: 'Révisée',
    lien: 'https://www.ohada.org',
    auteur: 'OHADA',
    classification_level: 4,
    classification_label: 'Décision',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/utils/financialModelCGI/syscohadaSheets.ts',
  },
  // GAFI
  {
    id: 'SR-009',
    reference: 'Recommandation GAFI n°10 — Vigilance client',
    type: 'Recommandation',
    source: 'GAFI — FATF-GAFI.org',
    date: '2012-02-16',
    version: 'Révisée 02/2023',
    lien: 'https://www.fatf-gafi.org',
    auteur: 'GAFI',
    classification_level: 8,
    classification_label: 'Recommandation',
    status_juridique: 'modifie',
    ecart_type: 'incomplete',
    ecart_detail: 'Version révisée 02/2023 non reflétée — B.25 bénéficiaires effectifs ajoutée',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/pages/gafi/page.tsx',
  },
  // Références obsolètes détectées
  {
    id: 'SR-010',
    reference: 'Directive UEMOA n°08/2012/CM/UEMOA',
    type: 'Directive',
    source: 'UEMOA',
    date: '2012-07-02',
    version: 'Abrogée',
    lien: null,
    auteur: 'UEMOA',
    classification_level: 3,
    classification_label: 'Directive',
    status_juridique: 'abroge',
    ecart_type: 'obsolete',
    ecart_detail: 'Texte abrogé par Directive n°02/2015 — encore cité dans articles legacy',
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/mocks/blogArticlesLegacy.ts',
  },
  // COSO / IFRS / ISA
  {
    id: 'SR-011',
    reference: 'COSO 2013 — Internal Control Framework',
    type: 'Norme',
    source: 'COSO.org',
    date: '2013-05-14',
    version: '2013',
    lien: 'https://www.coso.org',
    auteur: 'COSO',
    classification_level: 7,
    classification_label: 'Norme',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/data/glossary.ts',
  },
  {
    id: 'SR-012',
    reference: 'IFRS 9 — Instruments financiers',
    type: 'Norme',
    source: 'IFRS Foundation',
    date: '2014-07-24',
    version: '2014 (amendée)',
    lien: 'https://www.ifrs.org',
    auteur: 'IFRS Foundation',
    classification_level: 7,
    classification_label: 'Norme',
    status_juridique: 'en_vigueur',
    ecart_type: null,
    ecart_detail: null,
    correction_appliquee: false,
    correction_date: null,
    composant_kos: 'src/utils/khepraCalculParProvisions.ts',
  },
];

// ─── PHASE 5 — AUTO-CORRECTION LOG ──────────────────────────────────────────

export const AUTO_CORRECTION_LOG: AutoCorrectionLog[] = [
  {
    id: 'ACL-001',
    reference_id: 'SR-010',
    ancien_texte: 'Directive UEMOA n°08/2012/CM/UEMOA relative à la LBC/FT',
    nouveau_texte: 'Directive UEMOA n°02/2015/CM/UEMOA relative à la LBC/FT (remplace la Directive n°08/2012 abrogée)',
    type_correction: 'remplacement',
    fichier_source: 'src/mocks/blogArticlesLegacy.ts',
    date_correction: '2026-06-16',
    statut: 'appliquee',
    verifie_par: 'KOS Auto-Correction Engine',
    preuve: 'https://www.uemoa.int/sites/default/files/bibliotheque/directive_02-2015_lbcft.pdf',
  },
  {
    id: 'ACL-002',
    reference_id: 'SR-002',
    ancien_texte: 'Plan Comptable Bancaire UEMOA (2016)',
    nouveau_texte: 'Plan Comptable Bancaire Révisé UEMOA (PCB 2022 — modification du 20 mars 2022)',
    type_correction: 'remplacement',
    fichier_source: 'src/pages/blog/independance-administrateurs-circulaire-01-2017/page.tsx',
    date_correction: '2026-06-16',
    statut: 'en_attente',
    verifie_par: null,
    preuve: null,
  },
  {
    id: 'ACL-003',
    reference_id: 'SR-009',
    ancien_texte: 'Recommandations GAFI (2012)',
    nouveau_texte: 'Recommandations GAFI révisées (février 2023) — incluant amendement B.25 bénéficiaires effectifs',
    type_correction: 'remplacement',
    fichier_source: 'src/pages/gafi/page.tsx',
    date_correction: '2026-06-16',
    statut: 'en_attente',
    verifie_par: null,
    preuve: null,
  },
  {
    id: 'ACL-004',
    reference_id: 'SR-005',
    ancien_texte: 'Khepra Experts est le leader du conseil réglementaire en Afrique francophone',
    nouveau_texte: 'Khepra Experts figure parmi les cabinets de référence en conseil réglementaire en Afrique francophone',
    type_correction: 'remplacement',
    fichier_source: 'src/pages/home/components/HeroNew.tsx',
    date_correction: '2026-06-16',
    statut: 'a_reviser',
    verifie_par: null,
    preuve: 'En attente validation Direction Marketing — étude de marché requise',
  },
  {
    id: 'ACL-005',
    reference_id: 'SR-004',
    ancien_texte: '(référence absente)',
    nouveau_texte: 'Règlement COBAC R-2016/04 — Contrôle interne actualisé des établissements de crédit (remplace R-2001/07 depuis juin 2016)',
    type_correction: 'ajout',
    fichier_source: 'src/mocks/blogArticlesPolicy.ts',
    date_correction: '2026-06-16',
    statut: 'appliquee',
    verifie_par: 'KOS Auto-Correction Engine',
    preuve: 'https://www.sgcobac.org/reglementation',
  },
  {
    id: 'ACL-006',
    reference_id: 'SR-012',
    ancien_texte: 'Calcul provisions selon normes prudentielles UMOA',
    nouveau_texte: 'Calcul provisions selon normes prudentielles UMOA (convergence IFRS 9 — dépréciation ECL)',
    type_correction: 'ajout',
    fichier_source: 'src/utils/khepraCalculParProvisions.ts',
    date_correction: '2026-06-16',
    statut: 'appliquee',
    verifie_par: 'KOS Auto-Correction Engine',
    preuve: null,
  },
];

// ─── PHASE 8-12 — COMPLIANCE ENGINES SCORES ─────────────────────────────────

export const COMPLIANCE_ENGINES: ComplianceEngineScore[] = [
  {
    engine: 'bceao',
    label: 'BCEAO / UEMOA',
    icon: 'ri-bank-line',
    color: '#CA8A04',
    score_actuel: 88,
    score_cible: 98,
    total_controles: 22,
    controles_conformes: 17,
    controles_partiels: 4,
    controles_non_conformes: 1,
    gaps_critiques: 1,
    derniere_evaluation: '2026-06-16',
    controles: [
      { id: 'BCEAO-01', controle: 'Agréments SFD — Dossier complet', statut: 'conforme', reference: 'Instruction n°005-06-2010', score: 88, observations: 'Conforme — article dédié complet' },
      { id: 'BCEAO-02', controle: 'Gouvernance SFD — Séparation pouvoirs', statut: 'conforme', reference: 'Instruction n°017-12-2010', score: 90, observations: 'Conforme — 3 lignes défense documentées' },
      { id: 'BCEAO-03', controle: 'Contrôle Interne SFD', statut: 'conforme', reference: 'Circulaire 03-2017/CB/C', score: 85, observations: 'Conforme — gap résiduel sur normes minimales' },
      { id: 'BCEAO-04', controle: 'Ratios prudentiels SFD', statut: 'conforme', reference: 'Instruction n°010-08-2010', score: 92, observations: 'Conforme — tous ratios documentés' },
      { id: 'BCEAO-05', controle: 'Comptabilité RCS SFD', statut: 'conforme', reference: 'Instructions n°025-030-02-2009', score: 90, observations: 'Conforme — article RCS triptyque créé' },
      { id: 'BCEAO-06', controle: 'Reporting SFD', statut: 'conforme', reference: 'Instructions n°018-020-12-2010', score: 85, observations: 'Conforme — article reporting dédié' },
      { id: 'BCEAO-07', controle: 'Avoirs dormants SFD', statut: 'conforme', reference: 'Instructions n°05-07-06-2014', score: 88, observations: 'Conforme — article dédié complet' },
      { id: 'BCEAO-08', controle: 'Finance Islamique SFD', statut: 'conforme', reference: 'Instructions n°003-005-2018', score: 90, observations: 'Conforme — 2 articles dédiés' },
      { id: 'BCEAO-09', controle: 'Cybersécurité UEMOA', statut: 'partiel', reference: 'Circulaire LC-COB/04', score: 65, observations: 'Partiel — PCA/PRA à renforcer' },
      { id: 'BCEAO-10', controle: 'Services Paiement UEMOA', statut: 'conforme', reference: 'Instruction n°001-01-2024', score: 95, observations: 'Conforme — couverture excellente' },
    ],
  },
  {
    engine: 'ohada',
    label: 'OHADA',
    icon: 'ri-scales-line',
    color: '#86BC25',
    score_actuel: 85,
    score_cible: 95,
    total_controles: 8,
    controles_conformes: 6,
    controles_partiels: 2,
    controles_non_conformes: 0,
    gaps_critiques: 0,
    derniere_evaluation: '2026-06-16',
    controles: [
      { id: 'OHADA-01', controle: 'AUSCGIE — Droit sociétés commerciales', statut: 'conforme', reference: 'AUSCGIE 2014', score: 90, observations: 'Conforme — gouvernance OHADA documentée' },
      { id: 'OHADA-02', controle: 'AUDCIF — Droit comptable', statut: 'conforme', reference: 'AUDCIF 2017', score: 90, observations: 'Conforme — SYSCOHADA intégré' },
      { id: 'OHADA-03', controle: 'Acte Uniforme Sûretés', statut: 'conforme', reference: 'AUS 2010', score: 82, observations: 'Conforme — mentionné glossaire' },
      { id: 'OHADA-04', controle: 'Procédures collectives', statut: 'partiel', reference: 'AUPC 2015', score: 65, observations: 'Partiel — non documenté en détail' },
      { id: 'OHADA-05', controle: 'Arbitrage CCJA', statut: 'conforme', reference: 'AUA 2017', score: 80, observations: 'Conforme — CCJA référencée' },
      { id: 'OHADA-06', controle: 'Droit commercial général', statut: 'conforme', reference: 'AUDCG 2010', score: 85, observations: 'Conforme — contenu glossaire' },
      { id: 'OHADA-07', controle: 'Voies exécution', statut: 'partiel', reference: 'AUVE 1998', score: 60, observations: 'Partiel — mentionné une seule fois' },
      { id: 'OHADA-08', controle: 'Médiation', statut: 'conforme', reference: 'AUM 2017', score: 75, observations: 'Conforme' },
    ],
  },
  {
    engine: 'gafi',
    label: 'GAFI / LCB-FT',
    icon: 'ri-shield-flash-line',
    color: '#4285F4',
    score_actuel: 82,
    score_cible: 95,
    total_controles: 10,
    controles_conformes: 7,
    controles_partiels: 2,
    controles_non_conformes: 1,
    gaps_critiques: 1,
    derniere_evaluation: '2026-06-16',
    controles: [
      { id: 'GAFI-01', controle: 'KYC — Vigilance client', statut: 'conforme', reference: 'Recommandation 10', score: 85, observations: 'Conforme — procédures documentées' },
      { id: 'GAFI-02', controle: 'PPE — Personnes Politiquement Exposées', statut: 'conforme', reference: 'Recommandation 12', score: 82, observations: 'Conforme — article dédié' },
      { id: 'GAFI-03', controle: 'UBO — Bénéficiaires Effectifs', statut: 'partiel', reference: 'Recommandation 24-25', score: 65, observations: 'Partiel — amendement B.25/2023 non intégré' },
      { id: 'GAFI-04', controle: 'Filtrage sanctions', statut: 'conforme', reference: 'Recommandation 6-7', score: 80, observations: 'Conforme — procédure gel avoirs' },
      { id: 'GAFI-05', controle: 'Déclaration de soupçon', statut: 'conforme', reference: 'Recommandation 20', score: 88, observations: 'Conforme — DOS CENTIF/GABAC' },
      { id: 'GAFI-06', controle: 'Scoring risque LCB/FT', statut: 'partiel', reference: 'Recommandation 1', score: 60, observations: 'Partiel — scoring à automatiser' },
      { id: 'GAFI-07', controle: 'Formation LCB/FT', statut: 'conforme', reference: 'Recommandation 18', score: 85, observations: 'Conforme — programme documenté' },
      { id: 'GAFI-08', controle: 'Audit externe LCB/FT', statut: 'non_conforme', reference: 'Recommandation 27', score: 40, observations: 'Non conforme — audit non programmé' },
      { id: 'GAFI-09', controle: 'Coopération internationale', statut: 'conforme', reference: 'Recommandation 40', score: 82, observations: 'Conforme' },
      { id: 'GAFI-10', controle: 'Nouvelles technologies', statut: 'conforme', reference: 'Recommandation 15', score: 82, observations: 'Conforme' },
    ],
  },
  {
    engine: 'privacy',
    label: 'Protection Données',
    icon: 'ri-lock-line',
    color: '#059669',
    score_actuel: 72,
    score_cible: 90,
    total_controles: 8,
    controles_conformes: 4,
    controles_partiels: 3,
    controles_non_conformes: 1,
    gaps_critiques: 1,
    derniere_evaluation: '2026-06-16',
    controles: [
      { id: 'PRIV-01', controle: 'Registre traitements', statut: 'conforme', reference: 'APDP Togo / RGPD', score: 85, observations: 'Conforme — page registre-traitements existante' },
      { id: 'PRIV-02', controle: 'Consentement explicite', statut: 'conforme', reference: 'APDP Togo Art. 12', score: 82, observations: 'Conforme — cookie consent implémenté' },
      { id: 'PRIV-03', controle: 'Droits personnes concernées', statut: 'partiel', reference: 'APDP Togo Art. 15-20', score: 65, observations: 'Partiel — page privacy à enrichir' },
      { id: 'PRIV-04', controle: 'Notification violations', statut: 'non_conforme', reference: 'APDP Togo Art. 34', score: 40, observations: 'Non conforme — procédure absente' },
      { id: 'PRIV-05', controle: 'DPO nommé', statut: 'conforme', reference: 'APDP Togo Art. 37', score: 80, observations: 'Conforme — DPO identifié' },
      { id: 'PRIV-06', controle: 'Chiffrement données', statut: 'partiel', reference: 'APDP Togo Art. 32', score: 60, observations: 'Partiel — chiffrement partiel' },
      { id: 'PRIV-07', controle: 'Durée conservation', statut: 'partiel', reference: 'APDP Togo Art. 5.e', score: 65, observations: 'Partiel — politique conservation à formaliser' },
      { id: 'PRIV-08', controle: 'Transfert hors UEMOA', statut: 'conforme', reference: 'APDP Togo Art. 44', score: 78, observations: 'Conforme' },
    ],
  },
  {
    engine: 'cyber',
    label: 'Cybersécurité',
    icon: 'ri-shield-keyhole-line',
    color: '#C2410C',
    score_actuel: 70,
    score_cible: 90,
    total_controles: 8,
    controles_conformes: 4,
    controles_partiels: 3,
    controles_non_conformes: 1,
    gaps_critiques: 2,
    derniere_evaluation: '2026-06-16',
    controles: [
      { id: 'CYBER-01', controle: 'ISO 27001 — SMSI', statut: 'non_conforme', reference: 'ISO 27001:2022', score: 35, observations: 'Non conforme — certification non engagée' },
      { id: 'CYBER-02', controle: 'NIST CSF — Cadre cybersécurité', statut: 'partiel', reference: 'NIST CSF 2.0', score: 55, observations: 'Partiel — framework non documenté' },
      { id: 'CYBER-03', controle: 'PCA — Plan Continuité Activité', statut: 'partiel', reference: 'Circulaire LC-COB/04', score: 65, observations: 'Partiel — documenté mais non testé' },
      { id: 'CYBER-04', controle: 'PRA — Plan Reprise Activité', statut: 'partiel', reference: 'Circulaire LC-COB/04', score: 60, observations: 'Partiel — à formaliser' },
      { id: 'CYBER-05', controle: 'Tests intrusion annuels', statut: 'conforme', reference: 'R-2024/01 COBAC', score: 80, observations: 'Conforme — planifié Q3 2026' },
      { id: 'CYBER-06', controle: 'Journalisation accès', statut: 'conforme', reference: 'ISO 27001 A.12.4', score: 82, observations: 'Conforme — Supabase logging activé' },
      { id: 'CYBER-07', controle: 'Contrôle accès', statut: 'conforme', reference: 'ISO 27001 A.9', score: 85, observations: 'Conforme — Supabase Auth + RLS' },
      { id: 'CYBER-08', controle: 'Chiffrement données', statut: 'conforme', reference: 'ISO 27001 A.10', score: 80, observations: 'Conforme — HTTPS + chiffrement BDD' },
    ],
  },
];

// ─── PHASE 13 — EVIDENCE LIBRARY ────────────────────────────────────────────

export const EVIDENCE_LIBRARY: EvidenceRecord[] = [
  {
    id: 'EV-001',
    type: 'capture',
    titre: 'Capture registre BCEAO — Instruction n°025-02-2009',
    reference_id: 'REG-032',
    horodatage: '2026-06-16T08:15:00Z',
    responsable: 'Veille Réglementaire',
    format: 'PNG',
    taille: '1.2 MB',
    url: null,
    tags: ['BCEAO', 'RCS', 'SFD', 'Comptabilité'],
  },
  {
    id: 'EV-002',
    type: 'pdf',
    titre: 'Circulaire CB-UMOA n°01-2017/CB/C — Version officielle',
    reference_id: 'REG-001',
    horodatage: '2026-06-15T14:30:00Z',
    responsable: 'Conformité',
    format: 'PDF',
    taille: '3.8 MB',
    url: null,
    tags: ['CB-UMOA', 'Gouvernance', 'Administrateurs indépendants'],
  },
  {
    id: 'EV-003',
    type: 'decision',
    titre: 'Décision CB-UMOA — Agrément SFD modèle',
    reference_id: 'REG-030',
    horodatage: '2026-05-20T10:00:00Z',
    responsable: 'Juridique',
    format: 'PDF',
    taille: '2.1 MB',
    url: null,
    tags: ['BCEAO', 'Agrément', 'SFD'],
  },
  {
    id: 'EV-004',
    type: 'rapport',
    titre: 'Rapport ICAAP 2025 — Stress tests',
    reference_id: 'REG-026',
    horodatage: '2026-04-15T09:00:00Z',
    responsable: 'Risk Management',
    format: 'PDF',
    taille: '5.4 MB',
    url: null,
    tags: ['BCEAO', 'ICAAP', 'Stress Test', 'Risques'],
  },
  {
    id: 'EV-005',
    type: 'controle',
    titre: 'Matrice contrôle interne — Niveau 1 et 2',
    reference_id: 'REG-010',
    horodatage: '2026-06-10T11:45:00Z',
    responsable: 'Audit Interne',
    format: 'XLSX',
    taille: '0.8 MB',
    url: null,
    tags: ['Contrôle Interne', 'Matrice', 'CB-UMOA'],
  },
  {
    id: 'EV-006',
    type: 'validation',
    titre: 'Validation CA — Charte comité audit',
    reference_id: 'REG-003',
    horodatage: '2026-03-25T16:00:00Z',
    responsable: 'Président CA',
    format: 'PDF',
    taille: '1.5 MB',
    url: null,
    tags: ['Gouvernance', 'Comité Audit', 'Validation CA'],
  },
  {
    id: 'EV-007',
    type: 'capture',
    titre: 'Capture JO UEMOA — Instruction n°005-05-2018 Finance Islamique',
    reference_id: 'REG-034',
    horodatage: '2026-06-16T09:00:00Z',
    responsable: 'Veille Réglementaire',
    format: 'PNG',
    taille: '1.8 MB',
    url: null,
    tags: ['BCEAO', 'Finance Islamique', 'SFD'],
  },
  {
    id: 'EV-008',
    type: 'rapport',
    titre: 'Rapport annuel LCB/FT 2025 — CENTIF',
    reference_id: 'REG-025',
    horodatage: '2026-02-28T12:00:00Z',
    responsable: 'Chief Compliance Officer',
    format: 'PDF',
    taille: '4.2 MB',
    url: null,
    tags: ['LCB/FT', 'GAFI', 'CENTIF', 'Déclaration soupçon'],
  },
];

// ─── PHASE 14 — AUTONOMOUS AGENTS ───────────────────────────────────────────

export const AUTONOMOUS_AGENTS: AutonomousAgent[] = [
  {
    id: 'AG-001',
    type: 'regulatory_watch',
    nom: 'KOS Regulatory Watch™',
    description: 'Surveillance continue des publications BCEAO, CB-UMOA, UEMOA, OHADA, APDP, GAFI, OCDE, COSO, IFRS Foundation, IAASB',
    statut: 'actif',
    derniere_activite: '2026-06-16T06:00:00Z',
    sources_surveillees: ['bceao.int', 'sgcb-umoa.org', 'uemoa.int', 'ohada.org', 'fatf-gafi.org', 'oecd.org', 'coso.org', 'ifrs.org', 'iaasb.org'],
    alertes_generees: 24,
    corrections_effectuees: 6,
    preuves_produites: 12,
    uptime_pct: 99.2,
  },
  {
    id: 'AG-002',
    type: 'regulatory_update',
    nom: 'KOS Regulatory Update™',
    description: 'Mise à jour automatique de la base réglementaire, procédures, contenus et workflows suite aux détections',
    statut: 'actif',
    derniere_activite: '2026-06-16T09:15:00Z',
    sources_surveillees: ['KOS Regulatory Register', 'KOS Content DB', 'KOS Workflows Engine'],
    alertes_generees: 8,
    corrections_effectuees: 18,
    preuves_produites: 18,
    uptime_pct: 98.5,
  },
  {
    id: 'AG-003',
    type: 'regulatory_proof',
    nom: 'KOS Regulatory Proof™',
    description: 'Production automatique de dossiers d\'audit, preuves réglementaires et rapports pour inspecteurs BCEAO/CB-UMOA',
    statut: 'actif',
    derniere_activite: '2026-06-15T18:00:00Z',
    sources_surveillees: ['Evidence Library', 'KOS Audit Ledger', 'KOS Compliance Engine'],
    alertes_generees: 3,
    corrections_effectuees: 0,
    preuves_produites: 8,
    uptime_pct: 97.8,
  },
  {
    id: 'AG-004',
    type: 'content_scanner',
    nom: 'KOS Content Scanner™',
    description: 'Scanner automatique de tout le contenu KOS : site, blog, knowledge hub, offres, propositions, rapports, workflows IA',
    statut: 'actif',
    derniere_activite: '2026-06-16T07:30:00Z',
    sources_surveillees: ['khepraexperts.com', 'KOS Blog Engine', 'KOS Knowledge Hub', 'KOS Proposals Engine'],
    alertes_generees: 42,
    corrections_effectuees: 12,
    preuves_produites: 0,
    uptime_pct: 99.5,
  },
  {
    id: 'AG-005',
    type: 'auto_corrector',
    nom: 'KOS Auto-Correction Engine™',
    description: 'Correction automatique des références obsolètes, incomplètes ou non vérifiables — remplacement par texte en vigueur',
    statut: 'actif',
    derniere_activite: '2026-06-16T08:45:00Z',
    sources_surveillees: ['KOS Content DB', 'Regulatory Register', 'Auto-Correction Log'],
    alertes_generees: 12,
    corrections_effectuees: 214,
    preuves_produites: 89,
    uptime_pct: 98.9,
  },
  {
    id: 'AG-006',
    type: 'evidence_collector',
    nom: 'KOS Evidence Collector™',
    description: 'Collecte, horodatage, tagging et archivage sécurisé des preuves de conformité par exigence réglementaire',
    statut: 'en_deploiement',
    derniere_activite: '2026-06-16T10:00:00Z',
    sources_surveillees: ['Evidence Library', 'KOS Document Store', 'KOS Audit Trail'],
    alertes_generees: 0,
    corrections_effectuees: 0,
    preuves_produites: 5,
    uptime_pct: 95.0,
  },
];

// ─── PHASE 15 — EXECUTIVE KPIs ──────────────────────────────────────────────

export const REMEDIATION_EXECUTIVE_KPIS: RemediationExecutiveKPIs = {
  score_global_conformite: 82,
  score_global_cible: 98,
  references_verifiables_pct: 76,
  textes_tracables_pct: 82,
  sources_officielles_pct: 71,
  historisation_pct: 68,
  auditabilite_pct: 65,
  veille_reglementaire_pct: 80,
  total_references_scannees: 312,
  total_corrections_appliquees: 214,
  total_corrections_en_attente: 38,
  total_preuves_collectees: 89,
  agents_actifs: 5,
  agents_total: 6,
  alertes_critiques: 4,
  derniere_maj: '2026-06-16T10:00:00Z',
};

// ─── PHASE 6 — REGULATORY KNOWLEDGE GRAPH NODES ────────────────────────────

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'autorite' | 'texte' | 'domaine' | 'norme' | 'composant_kos';
  size: number;
  color: string;
  connections: string[];
}

export const KNOWLEDGE_GRAPH_NODES: KnowledgeGraphNode[] = [
  { id: 'BCEAO', label: 'BCEAO', type: 'autorite', size: 45, color: '#CA8A04', connections: ['Instructions', 'Décisions', 'Circulaires', 'SFD', 'UEMOA'] },
  { id: 'CB-UMOA', label: 'SG-CB-UMOA', type: 'autorite', size: 35, color: '#D97757', connections: ['Circulaires', 'Supervision', 'Gouvernance'] },
  { id: 'COBAC', label: 'COBAC', type: 'autorite', size: 32, color: '#9B7B2C', connections: ['Règlements', 'CEMAC', 'Supervision'] },
  { id: 'OHADA', label: 'OHADA', type: 'autorite', size: 38, color: '#86BC25', connections: ['AUSCGIE', 'AUDCIF', 'SYSCOHADA', 'CCJA'] },
  { id: 'GAFI', label: 'GAFI', type: 'autorite', size: 30, color: '#4285F4', connections: ['Recommandations', 'LCB/FT', 'KYC', 'PPE'] },
  { id: 'OCDE', label: 'OCDE', type: 'autorite', size: 22, color: '#059669', connections: ['Prix Transfert', 'BEPS', 'Gouvernance'] },
  { id: 'COSO', label: 'COSO', type: 'norme', size: 20, color: '#7C3AED', connections: ['CI Framework', 'ERM', 'Gouvernance'] },
  { id: 'IFRS', label: 'IFRS Foundation', type: 'norme', size: 20, color: '#0891B2', connections: ['IFRS 9', 'Comptabilité', 'Provisions'] },
  { id: 'ISA', label: 'ISA / IAASB', type: 'norme', size: 18, color: '#DB2777', connections: ['Audit', 'CAC', 'Normes ISA'] },
  { id: 'SFD', label: 'SFD UEMOA/CEMAC', type: 'domaine', size: 28, color: '#EA580C', connections: ['Agrément', 'Prudentiel', 'RCS', 'Reporting'] },
  { id: 'Instructions', label: 'Instructions BCEAO', type: 'texte', size: 25, color: '#CA8A04', connections: ['SFD', 'BCEAO', 'Agrément', 'Prudentiel'] },
  { id: 'Circulaires', label: 'Circulaires CB-UMOA', type: 'texte', size: 22, color: '#D97757', connections: ['Gouvernance', 'CI', 'Risques', 'CB-UMOA'] },
  { id: 'KOS', label: 'KOS Engine', type: 'composant_kos', size: 40, color: '#DC2626', connections: ['BCEAO', 'COBAC', 'OHADA', 'GAFI', 'Agents'] },
];

// ─── PHASE 16 — TARGET TRACKING ─────────────────────────────────────────────

export interface TargetMetric {
  id: string;
  label: string;
  actuel: number;
  cible: number;
  unite: string;
  color: string;
  icon: string;
  description: string;
}

export const TARGET_METRICS: TargetMetric[] = [
  { id: 'TGT-001', label: 'Références Vérifiables', actuel: 76, cible: 100, unite: '%', color: '#86BC25', icon: 'ri-check-double-line', description: 'Chaque référence doit avoir une source officielle vérifiable' },
  { id: 'TGT-002', label: 'Textes Traçables', actuel: 82, cible: 100, unite: '%', color: '#CA8A04', icon: 'ri-link', description: 'Traçabilité complète : émission → modification → abrogation' },
  { id: 'TGT-003', label: 'Sources Officielles', actuel: 71, cible: 100, unite: '%', color: '#4285F4', icon: 'ri-file-text-line', description: '100% des sources doivent être officielles (JO, site autorité)' },
  { id: 'TGT-004', label: 'Historisation', actuel: 68, cible: 100, unite: '%', color: '#059669', icon: 'ri-history-line', description: 'Historique complet : création → modification → révision' },
  { id: 'TGT-005', label: 'Auditabilité', actuel: 65, cible: 100, unite: '%', color: '#C2410C', icon: 'ri-file-search-line', description: 'Chaque décision doit être auditable avec preuve' },
  { id: 'TGT-006', label: 'Veille Réglementaire', actuel: 80, cible: 100, unite: '%', color: '#7C3AED', icon: 'ri-radar-line', description: 'Couverture complète des sources de veille' },
];