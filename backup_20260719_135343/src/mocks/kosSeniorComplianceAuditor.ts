// KOS Senior Compliance Auditor™ — CEMAC Deep COBAC Compliance Analysis
// Big Four Senior Compliance Auditor Grade
// Performs: Executive Risk Summary, Gap Analysis, Severity Classification,
//           Regulatory References Mapping, Remediation Plan, Inspection Readiness Score

export interface AuditInstitution {
  id: string;
  nom: string;
  type: 'banque' | 'emf' | 'fintech';
  zone: string;
  actif_total_milliards_fcfa: number;
  derniere_inspection: string;
  score_conformite_actuel: number;
  description: string;
}

export interface ExecutiveRiskSummary {
  note_globale: string;
  constats_cles: string[];
  top_3_risques: { risque: string; criticite: 'Critique' | 'Élevé' | 'Modéré'; exposition: string }[];
  recommandation_globale: string;
}

export interface GapItem {
  id: string;
  domaine: string;
  etat_actuel: string;
  etat_requis: string;
  ecart: string;
  impact: string;
  preuve_absence: string;
}

export interface FindingItem {
  id: string;
  constat: string;
  severite: 'Critique' | 'Élevé' | 'Modéré' | 'Faible';
  reference_reglementaire: string;
  articles_violes: string[];
  description: string;
  delai_correction: string;
  risque_inspection: string;
}

export interface RegulatoryRef {
  id: string;
  texte: string;
  autorite: string;
  articles_applicables: string[];
  exigence: string;
  statut_conformite: 'conforme' | 'partiellement_conforme' | 'non_conforme' | 'non_applicable';
  preuve_conformite: string;
}

export interface RemediationStep {
  etape: number;
  action: string;
  responsable: string;
  delai: string;
  livrable: string;
  cout_estime_fcfa: string;
  priorite: 'P0' | 'P1' | 'P2' | 'P3';
  dependances: string[];
  critere_succes: string;
}

export interface InspectionReadinessScore {
  score_global: number;
  breakdown: {
    gouvernance: number;
    lbc_ft: number;
    controle_interne: number;
    gestion_risques: number;
    conformite_reglementaire: number;
    reporting: number;
  };
  benchmark: { label: string; score: number }[];
  interpretation: string;
  points_critiques_inspection: string[];
  recommandations_derniere_minute: string[];
}

export interface ComplianceAudit {
  institution: AuditInstitution;
  executive_summary: ExecutiveRiskSummary;
  gap_analysis: GapItem[];
  findings: FindingItem[];
  regulatory_references: RegulatoryRef[];
  remediation_plan: RemediationStep[];
  inspection_readiness: InspectionReadinessScore;
  metadata: {
    auditeur: string;
    date_audit: string;
    duree_mission_jours: number;
    normes_appliquees: string[];
    prochaine_inspection_estimee: string;
  };
}

// ═══════════════════════════════════════════════════════
// INSTITUTIONS AUDITÉES
// ═══════════════════════════════════════════════════════

export const INSTITUTIONS: AuditInstitution[] = [
  {
    id: 'INST-001',
    nom: 'Banque Atlantique Cameroun',
    type: 'banque',
    zone: 'CEMAC — Cameroun',
    actif_total_milliards_fcfa: 850,
    derniere_inspection: '2024-11-15',
    score_conformite_actuel: 62,
    description: 'Banque universelle de taille moyenne, 12 agences, portefeuille LBC/FT en cours de renforcement post-inspection COBAC 2024. 3 observations critiques non résolues.',
  },
  {
    id: 'INST-002',
    nom: 'Caisse Régionale d\'Épargne et de Crédit du Gabon',
    type: 'emf',
    zone: 'CEMAC — Gabon',
    actif_total_milliards_fcfa: 45,
    derniere_inspection: '2025-03-22',
    score_conformite_actuel: 48,
    description: 'Établissement de microfinance de catégorie 2, réseau de 8 caisses. Gouvernance fragile, absence de comité d\'audit, classification risques clients manuelle.',
  },
  {
    id: 'INST-003',
    nom: 'FinTech PayCEMAC SA',
    type: 'fintech',
    zone: 'CEMAC — Congo',
    actif_total_milliards_fcfa: 28,
    derniere_inspection: 'N/A — Premier audit',
    score_conformite_actuel: 35,
    description: 'Établissement de paiement nouvelle génération, agrément COBAC obtenu en 2025. Dispositif de conformité en construction, aucun audit externe LBC/FT réalisé.',
  },
  {
    id: 'INST-004',
    nom: 'Banque Commerciale de Guinée Équatoriale',
    type: 'banque',
    zone: 'CEMAC — Guinée Équatoriale',
    actif_total_milliards_fcfa: 1200,
    derniere_inspection: '2025-09-07',
    score_conformite_actuel: 73,
    description: 'Grande banque commerciale, 25 agences. Bon niveau de conformité global mais exposition significative aux transactions internationales avec pays à haut risque GAFI.',
  },
];

// ═══════════════════════════════════════════════════════
// AUDITS COMPLETS
// ═══════════════════════════════════════════════════════

export const COMPLIANCE_AUDITS: ComplianceAudit[] = [
  // ─── INST-001 : Banque Atlantique Cameroun ───
  {
    institution: INSTITUTIONS[0],
    executive_summary: {
      note_globale: 'La Banque Atlantique Cameroun présente un profil de risque ÉLEVÉ. Trois observations critiques de l\'inspection COBAC 2024 restent non résolues à ce jour. Le dispositif LBC/FT est partiellement documenté mais sa mise en œuvre opérationnelle est lacunaire. Le registre des bénéficiaires effectifs n\'est pas exhaustif (taux de couverture estimé à 72%). La fonction conformité est sous-dimensionnée (1 responsable pour 12 agences). La prochaine inspection est imminente — estimée Q3 2026.',
      constats_cles: [
        'Registre BE incomplet : seuls 72% des clients actifs ont un bénéficiaire effectif documenté',
        'Délai moyen de déclaration de soupçons GABAC : 5.2 jours (limite réglementaire : 48h)',
        'Classification risques clients non revue depuis 8 mois (exigence : trimestrielle)',
        'Absence de procédure VASP pour les transactions crypto-actifs',
        'Audit externe LBC/FT 2025 non réalisé — exigible avant le 30/06/2026',
      ],
      top_3_risques: [
        { risque: 'Registre BE non exhaustif (72%) — Art.4 COBAC R-2026/03', criticite: 'Critique', exposition: 'Sanction pécuniaire jusqu\'à 5% CA + mise sous administration' },
        { risque: 'Dépassement systématique du délai DS 48h (5.2j moyens)', criticite: 'Critique', exposition: 'Poursuites individuelles dirigeants + signalement GABAC public' },
        { risque: 'Fonction conformité sous-dimensionnée (ratio 1:12 agences)', criticite: 'Élevé', exposition: 'Incapacité à absorber les nouvelles exigences COBAC R-2026/03' },
      ],
      recommandation_globale: 'Mise en place urgente d\'un plan de remédiation prioritaire sur 90 jours ciblant les 3 observations critiques COBAC 2024 + alignement immédiat sur COBAC R-2026/03. Recrutement minimum 2 analystes conformité senior. Déploiement solution digitale BE.',
    },
    gap_analysis: [
      { id: 'GAP-001', domaine: 'Registre Bénéficiaires Effectifs', etat_actuel: '72% des clients actifs documentés, processus manuel sur Excel', etat_requis: '100% des clients avec BE vérifié, solution digitale traçable', ecart: '28% de couverture manquante, absence d\'outil de gestion', impact: 'Non-conformité Art.4 COBAC R-2026/03 — critique', preuve_absence: 'Extraction CRM du 15/06/2026 : 3 240 clients actifs, 2 333 avec BE documenté' },
      { id: 'GAP-002', domaine: 'Délai Déclaration de Soupçons', etat_actuel: '5.2 jours en moyenne, processus semi-manuel', etat_requis: '≤ 48h entre détection et transmission GABAC', ecart: 'Dépassement de 3.2 jours (x2.6 la limite)', impact: 'Non-conformité Art.15 COBAC R-2026/03 — critique', preuve_absence: 'Logs case management : 14 DS en 2026, délai moyen 124.8h' },
      { id: 'GAP-003', domaine: 'Classification Risques Clients', etat_actuel: 'Matrice à 2 niveaux (Faible/Élevé), dernière revue 10/2025', etat_requis: '3 niveaux minimum, revue trimestrielle obligatoire', ecart: 'Classification incomplète (2 vs 3 niveaux), non revue depuis 8 mois', impact: 'Non-conformité Art.22 COBAC R-2026/03 — élevé', preuve_absence: 'Rapport classification le plus récent daté du 15/10/2025' },
      { id: 'GAP-004', domaine: 'Audit Externe LBC/FT', etat_actuel: 'Pas d\'audit externe LBC/FT en 2025', etat_requis: 'Audit externe annuel par cabinet certifié GAFI', ecart: 'Exercice 2025 non audité', impact: 'Non-conformité Art.25 COBAC R-2026/03 — critique', preuve_absence: 'Aucun rapport d\'audit externe LBC/FT post-2024' },
      { id: 'GAP-005', domaine: 'Dimensionnement Fonction Conformité', etat_actuel: '1 responsable conformité + 0 analyste', etat_requis: 'Équipe proportionnée à la taille (benchmark COBAC : 1 analyste par 5 agences)', ecart: 'Ratio 1:12 agences vs benchmark 1:5', impact: 'Risque opérationnel — incapacité de traitement', preuve_absence: 'Organigramme au 01/06/2026 — Direction Conformité = 1 ETP' },
      { id: 'GAP-006', domaine: 'Procédure VASP / Crypto-actifs', etat_actuel: 'Aucune procédure documentée', etat_requis: 'Procédure de vigilance renforcée pour transactions actifs virtuels', ecart: 'Absence totale de procédure', impact: 'Non-conformité Art.7 COBAC R-2026/03 — critique', preuve_absence: 'Manuel de procédures LBC/FT v3.2 — section VASP inexistante' },
    ],
    findings: [
      { id: 'F-001', constat: 'Registre des bénéficiaires effectifs incomplet et non fiable', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.4'], description: 'Sur 3 240 clients actifs, seuls 2 333 (72%) ont un BE documenté. Le registre est tenu sur fichier Excel sans piste d\'audit ni validation. 18% des BE documentés ont des incohérences (nationalité manquante, % détention > 100%).', delai_correction: '90 jours', risque_inspection: 'Très élevé — Premier point vérifié par les inspecteurs COBAC. Sanction quasi-certaine si non corrigé.' },
      { id: 'F-002', constat: 'Délai de déclaration de soupçons systématiquement non respecté', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.15'], description: 'Le délai moyen entre détection et transmission GABAC est de 5.2 jours (124.8h), soit 2.6x la limite de 48h. Le processus est semi-manuel : détection par le système → validation responsable → transmission GABAC (souvent retardée par absence du responsable).', delai_correction: '30 jours', risque_inspection: 'Très élevé — Les inspecteurs COBAC vérifient systématiquement les horodatages des DS. Risque de poursuites individuelles contre le responsable LBC/FT.' },
      { id: 'F-003', constat: 'Classification risques clients non conforme (2 niveaux au lieu de 3)', severite: 'Élevé', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.22'], description: 'La matrice de classification utilise uniquement 2 niveaux (Faible/Élevé) au lieu des 3 minimum exigés (Faible/Moyen/Élevé). La dernière revue trimestrielle date d\'octobre 2025.', delai_correction: '60 jours', risque_inspection: 'Élevé — Point systématiquement audité. L\'absence de niveau « Moyen » empêche une granularité de surveillance requise.' },
      { id: 'F-004', constat: 'Absence de procédure VASP pour transactions crypto-actifs', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.7'], description: 'Aucune procédure documentée pour l\'identification et la vigilance renforcée des transactions impliquant des actifs virtuels. Le système de filtrage ne couvre pas les adresses blockchain.', delai_correction: '120 jours', risque_inspection: 'Très élevé — Nouvelle exigence GAFI 2026. Les inspecteurs vérifieront spécifiquement ce point.' },
      { id: 'F-005', constat: 'Audit externe LBC/FT 2025 non réalisé', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.25'], description: 'L\'établissement n\'a pas réalisé l\'audit externe annuel obligatoire pour l\'exercice 2025. Le dernier audit date de 2024 (cabinet non certifié GAFI).', delai_correction: '180 jours', risque_inspection: 'Très élevé — Obligation annuelle. L\'absence d\'audit 2025 sera un point de non-conformité automatique.' },
      { id: 'F-006', constat: 'Dispositif de contrôle interne non documenté conformément au R-2025/07', severite: 'Élevé', reference_reglementaire: 'COBAC R-2025/07', articles_violes: ['Art.8'], description: 'Le manuel de contrôle interne n\'a pas été mis à jour depuis 2023. Il ne couvre pas les risques liés aux actifs virtuels ni les nouvelles exigences de gouvernance.', delai_correction: '90 jours', risque_inspection: 'Élevé — Le manuel CI est un document de base systématiquement demandé par les inspecteurs.' },
      { id: 'F-007', constat: 'Comité de Conformité inexistant', severite: 'Élevé', reference_reglementaire: 'COBAC R-2025/07', articles_violes: ['Art.5'], description: 'Le Comité de Conformité obligatoire n\'a pas été constitué. Les questions de conformité sont traitées en Comité d\'Audit, ce qui est insuffisant.', delai_correction: '60 jours', risque_inspection: 'Élevé — Les 4 comités spécialisés sont une obligation structurante du R-2025/07.' },
    ],
    regulatory_references: [
      { id: 'REF-001', texte: 'COBAC R-2026/03 — Renforcement LBC/FT', autorite: 'COBAC', articles_applicables: ['Art.4', 'Art.7', 'Art.12', 'Art.15', 'Art.22', 'Art.25'], exigence: 'Dispositif LBC/FT complet aligné GAFI 2026', statut_conformite: 'non_conforme', preuve_conformite: 'Écarts documentés dans les findings F-001 à F-005' },
      { id: 'REF-002', texte: 'COBAC R-2025/07 — Gouvernance', autorite: 'COBAC', articles_applicables: ['Art.3', 'Art.5', 'Art.8', 'Art.12', 'Art.15', 'Art.19'], exigence: 'Gouvernance renforcée avec comités spécialisés', statut_conformite: 'partiellement_conforme', preuve_conformite: 'Comité d\'Audit existant, Comité des Risques existant, Comité de Conformité manquant, Comité de Rémunération manquant' },
      { id: 'REF-003', texte: 'Règlement GABAC n°01/2026 — ENR', autorite: 'GABAC', articles_applicables: ['Art.11'], exigence: 'Classification risques calibrée sur ENR nationale', statut_conformite: 'non_conforme', preuve_conformite: 'Classification actuelle non alignée sur l\'ENR Cameroun 2025' },
      { id: 'REF-004', texte: 'Instruction BEAC n°008-2026 — Liquidité', autorite: 'BEAC', articles_applicables: ['Art.2', 'Art.5', 'Art.8', 'Art.10', 'Art.14', 'Art.18'], exigence: 'Gestion risque liquidité avec LCR ≥ 100%, NSFR ≥ 100%', statut_conformite: 'conforme', preuve_conformite: 'LCR à 127%, NSFR à 112% au 31/05/2026. PFU documenté et testé en mars 2026.' },
      { id: 'REF-005', texte: 'COBAC R-2016/04 — Contrôle Interne', autorite: 'COBAC', articles_applicables: ['Art.6', 'Art.9', 'Art.14'], exigence: 'Dispositif de contrôle interne documenté et testé', statut_conformite: 'partiellement_conforme', preuve_conformite: 'Manuel CI v2023 uniquement, non couvert pour actifs virtuels' },
    ],
    remediation_plan: [
      { etape: 1, action: 'Déployer une solution digitale de gestion des Bénéficiaires Effectifs et lancer une campagne de collecte accélérée', responsable: 'Directeur Conformité + DSI', delai: 'J+90', livrable: 'Plateforme BE opérationnelle, 100% clients actifs documentés', cout_estime_fcfa: '45 000 000', priorite: 'P0', dependances: [], critere_succes: 'Taux couverture BE ≥ 98% avec piste d\'audit' },
      { etape: 2, action: 'Automatiser le circuit de déclaration de soupçons avec escalade automatique et back-up', responsable: 'DSI + Resp. LBC/FT', delai: 'J+30', livrable: 'Workflow DS automatisé avec SLA 48h monitoré', cout_estime_fcfa: '12 000 000', priorite: 'P0', dependances: [], critere_succes: '100% DS transmises sous 48h' },
      { etape: 3, action: 'Recruter 2 analystes conformité senior et 1 analyste LBC/FT junior', responsable: 'DRH + Directeur Conformité', delai: 'J+60', livrable: '3 ETP recrutés et opérationnels', cout_estime_fcfa: '60 000 000/an', priorite: 'P0', dependances: [], critere_succes: 'Équipe conformité à 4 ETP, ratio 1:3 agences' },
      { etape: 4, action: 'Mettre à jour la matrice de classification risques clients à 3 niveaux et établir le cycle de revue trimestrielle', responsable: 'Responsable LBC/FT', delai: 'J+60', livrable: 'Matrice 3 niveaux documentée, première revue trimestrielle complétée', cout_estime_fcfa: '5 000 000', priorite: 'P1', dependances: ['Étape 3'], critere_succes: 'Classification 3 niveaux opérationnelle, revue trimestrielle effective' },
      { etape: 5, action: 'Rédiger et implémenter la procédure VASP / Crypto-actifs', responsable: 'Responsable LBC/FT + DSI', delai: 'J+120', livrable: 'Procédure VASP documentée, outil blockchain analytics intégré', cout_estime_fcfa: '35 000 000', priorite: 'P1', dependances: ['Étape 3'], critere_succes: 'Procédure approuvée CA, outil déployé en production' },
      { etape: 6, action: 'Contracter un cabinet d\'audit certifié GAFI pour l\'audit LBC/FT 2025-2026', responsable: 'Comité d\'Audit', delai: 'J+180', livrable: 'Rapport d\'audit externe LBC/FT 2025-2026', cout_estime_fcfa: '25 000 000', priorite: 'P1', dependances: [], critere_succes: 'Rapport d\'audit livré et présenté au CA' },
      { etape: 7, action: 'Mettre à jour le manuel de contrôle interne (volet LBC/FT et risques émergents)', responsable: 'Audit Interne + Directeur Conformité', delai: 'J+90', livrable: 'Manuel CI v2026 couvrant tous les risques COBAC', cout_estime_fcfa: '8 000 000', priorite: 'P1', dependances: ['Étape 4', 'Étape 5'], critere_succes: 'Manuel CI approuvé par le CA' },
      { etape: 8, action: 'Constituer le Comité de Conformité avec président indépendant', responsable: 'Conseil d\'Administration', delai: 'J+60', livrable: 'Charte du Comité de Conformité signée, 1ère réunion tenue', cout_estime_fcfa: '2 000 000', priorite: 'P1', dependances: [], critere_succes: 'Comité constitué, charte approuvée, calendrier annuel établi' },
    ],
    inspection_readiness: {
      score_global: 41,
      breakdown: {
        gouvernance: 35,
        lbc_ft: 28,
        controle_interne: 42,
        gestion_risques: 45,
        conformite_reglementaire: 38,
        reporting: 58,
      },
      benchmark: [
        { label: 'Moyenne Banques CEMAC', score: 67 },
        { label: 'Top 5 Banques CEMAC', score: 85 },
        { label: 'Banque Atlantique Cameroun', score: 41 },
        { label: 'Seuil Inspection COBAC', score: 60 },
      ],
      interpretation: 'Score de 41/100 — PRÉPARATION INSUFFISANTE. L\'établissement est significativement en dessous du seuil de 60/100 généralement considéré comme le minimum pour une inspection sereine. Les 3 observations critiques COBAC 2024 non résolues pèsent lourdement. La probabilité de sanctions est ÉLEVÉE si l\'inspection a lieu avant J+90.',
      points_critiques_inspection: [
        'Registre BE : 1er document demandé — sera jugé non conforme en l\'état',
        'Délais DS : les horodatages révèleront immédiatement les dépassements',
        'Audit externe 2025 manquant : non-conformité automatique',
        'Procédure VASP absente : sera relevée comme lacune majeure',
        'Comité de Conformité inexistant : violation directe du R-2025/07',
      ],
      recommandations_derniere_minute: [
        'PRIORITÉ ABSOLUE : Lancer la collecte BE et le circuit DS automatisé avant J+30',
        'Documenter un plan de remédiation formel à présenter aux inspecteurs (démontre la bonne foi)',
        'Préparer le responsable LBC/FT à l\'entretien individuel (ses pouvoirs et son indépendance seront scrutés)',
        'Constituer a minima le Comité de Conformité sur papier avant l\'inspection (même si non opérationnel)',
        'Rassembler tous les PV CA et preuves de diligence dans un dossier unique « Inspection Readiness »',
      ],
    },
    metadata: {
      auditeur: 'KOS Senior Compliance Auditor™ — Big Four Grade v2.3',
      date_audit: '2026-06-24',
      duree_mission_jours: 15,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'GABAC n°01/2026', 'BEAC n°008-2026', 'GAFI 40 Recommandations 2026', 'Normes ISA 250 (Audit Conformité)'],
      prochaine_inspection_estimee: 'Q3 2026 (estimé Septembre 2026)',
    },
  },

  // ─── INST-002 : CREC Gabon ───
  {
    institution: INSTITUTIONS[1],
    executive_summary: {
      note_globale: 'La CREC Gabon présente un profil de risque TRÈS ÉLEVÉ. En tant qu\'EMF de catégorie 2, elle est soumise à des exigences proportionnées mais accuse un retard significatif sur l\'ensemble des piliers de conformité. La gouvernance est le maillon faible : absence de comité d\'audit, CA non renouvelé depuis 2023, fonction conformité externalisée à temps partiel. La classification risques clients est manuelle et non révisée.',
      constats_cles: [
        'Gouvernance inexistante : pas de comité d\'audit, CA avec mandats expirés depuis 2023',
        'Classification risques clients : processus 100% manuel, 0% de revue trimestrielle',
        'Registre BE : documenté pour 45% des clients, tenu sur registre papier',
        'Reporting BEAC : 2 trimestres de retard (NSFR T4 2025 et T1 2026 non transmis)',
        'Aucun test du Plan de Financement d\'Urgence depuis sa création (2024)',
      ],
      top_3_risques: [
        { risque: 'Gouvernance défaillante — CA non statutaire, absence comités', criticite: 'Critique', exposition: 'Mise sous administration provisoire COBAC + nullité des décisions CA' },
        { risque: 'Classification risques clients inexistante en pratique', criticite: 'Critique', exposition: 'Non-conformité Art.22 COBAC R-2026/03 — incapacité à détecter les clients à risque' },
        { risque: 'Retard reporting BEAC — NSFR manquants T4 2025 et T1 2026', criticite: 'Élevé', exposition: 'Avertissement BEAC + risque d\'injonction avec astreinte' },
      ],
      recommandation_globale: 'Plan de sauvetage gouvernance urgent : renouvellement du CA, constitution des comités obligatoires, recrutement d\'un responsable conformité permanent. La COBAC pourrait prononcer une mise sous administration si l\'inspection révèle l\'état réel de la gouvernance.',
    },
    gap_analysis: [
      { id: 'GAP-201', domaine: 'Gouvernance — Conseil d\'Administration', etat_actuel: 'CA avec mandats expirés depuis 2023, 0 administrateur indépendant', etat_requis: 'CA renouvelé, 1/3 indépendants minimum', ecart: 'CA non statutaire — nullité juridique potentielle des décisions', impact: 'Non-conformité Art.3 COBAC R-2025/07 — Critique', preuve_absence: 'Registre de commerce — dernier renouvellement CA : 02/2021' },
      { id: 'GAP-202', domaine: 'Classification Risques Clients', etat_actuel: 'Processus manuel, dernière classification : 06/2025', etat_requis: 'Classification automatisée 3 niveaux, revue trimestrielle', ecart: 'Processus manuel + non révisé depuis 12 mois', impact: 'Non-conformité Art.22 COBAC R-2026/03 — Critique', preuve_absence: 'Registre classification papier : dernière entrée 14/06/2025' },
      { id: 'GAP-203', domaine: 'Registre Bénéficiaires Effectifs', etat_actuel: '45% documenté sur registre papier', etat_requis: '100% documenté, solution digitale', ecart: '55% manquant + absence totale de digitalisation', impact: 'Non-conformité Art.4 COBAC R-2026/03 — Critique', preuve_absence: 'Registre BE physique : 890 clients, 401 fiches BE complétées' },
      { id: 'GAP-204', domaine: 'Reporting BEAC NSFR', etat_actuel: 'T4 2025 et T1 2026 non transmis', etat_requis: 'Transmission trimestrielle sous 15 jours', ecart: '2 trimestres de retard', impact: 'Non-conformité Art.5 BEAC n°008-2026 — Élevé', preuve_absence: 'Accusés de réception BEAC : dernier NSFR reçu T3 2025' },
    ],
    findings: [
      { id: 'F-201', constat: 'Conseil d\'Administration non statutaire — mandats expirés depuis 2023', severite: 'Critique', reference_reglementaire: 'COBAC R-2025/07', articles_violes: ['Art.3'], description: 'Les mandats des administrateurs ont expiré en février 2023 sans renouvellement. Aucun administrateur indépendant. Les décisions du CA depuis cette date sont juridiquement contestables.', delai_correction: '120 jours', risque_inspection: 'Très élevé — C\'est le premier point de contrôle gouvernance. La COBAC peut prononcer une mise sous administration.' },
      { id: 'F-202', constat: 'Classification risques clients manuelle et obsolète', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.22'], description: 'Classification tenue sur registre papier, dernière mise à jour juin 2025. Aucune révision trimestrielle. Seulement 2 niveaux (Faible/Élevé) sans critères documentés.', delai_correction: '60 jours', risque_inspection: 'Très élevé — Incapacité à démontrer une surveillance effective des risques clients.' },
      { id: 'F-203', constat: 'Fonction conformité externalisée à temps partiel', severite: 'Élevé', reference_reglementaire: 'COBAC R-2025/07', articles_violes: ['Art.12'], description: 'La fonction conformité est assurée par un consultant externe à raison de 2 jours par mois. Aucune présence permanente. Reporting direct au DG (pas d\'accès CA).', delai_correction: '90 jours', risque_inspection: 'Élevé — L\'externalisation de la conformité à temps partiel est inacceptable pour un EMF de catégorie 2.' },
    ],
    regulatory_references: [
      { id: 'REF-201', texte: 'COBAC R-2025/07 — Gouvernance', autorite: 'COBAC', articles_applicables: ['Art.3', 'Art.5', 'Art.8', 'Art.12'], exigence: 'CA renouvelé, comités constitués, fonction conformité permanente', statut_conformite: 'non_conforme', preuve_conformite: 'Aucune preuve de conformité sur les articles listés' },
      { id: 'REF-202', texte: 'COBAC R-2026/03 — LBC/FT', autorite: 'COBAC', articles_applicables: ['Art.4', 'Art.22'], exigence: 'Registre BE exhaustif, classification risques 3 niveaux', statut_conformite: 'non_conforme', preuve_conformite: 'Écarts documentés dans les findings F-201 à F-203' },
      { id: 'REF-203', texte: 'BEAC n°008-2026 — Liquidité', autorite: 'BEAC', articles_applicables: ['Art.5', 'Art.8'], exigence: 'Reporting NSFR trimestriel, PFU testé annuellement', statut_conformite: 'partiellement_conforme', preuve_conformite: 'NSFR T4 2025 et T1 2026 non transmis. PFU documenté mais jamais testé.' },
    ],
    remediation_plan: [
      { etape: 1, action: 'Convoquer une AGE pour renouveler le CA et nommer a minima 2 administrateurs indépendants', responsable: 'Président CA actuel + DG', delai: 'J+120', livrable: 'PV AGE avec nouveau CA conforme, déclarations d\'indépendance signées', cout_estime_fcfa: '3 500 000', priorite: 'P0', dependances: [], critere_succes: 'CA renouvelé avec ≥ 33% d\'indépendants' },
      { etape: 2, action: 'Recruter un responsable conformité permanent à temps plein', responsable: 'DG + DRH', delai: 'J+60', livrable: 'Contrat signé, responsable en poste', cout_estime_fcfa: '18 000 000/an', priorite: 'P0', dependances: [], critere_succes: 'Resp. Conformité opérationnel avec accès direct CA' },
      { etape: 3, action: 'Digitaliser le registre BE et lancer une campagne de collecte', responsable: 'Resp. Conformité (une fois recruté)', delai: 'J+120', livrable: 'Registre BE digitalisé, 95% clients documentés', cout_estime_fcfa: '8 000 000', priorite: 'P0', dependances: ['Étape 2'], critere_succes: 'Couverture BE ≥ 95%' },
      { etape: 4, action: 'Régulariser les reportings BEAC NSFR T4 2025 et T1 2026', responsable: 'Directeur Financier', delai: 'J+15', livrable: 'Transmissions BEAC effectuées avec accusés de réception', cout_estime_fcfa: '0', priorite: 'P0', dependances: [], critere_succes: 'Accusés de réception BEAC obtenus' },
    ],
    inspection_readiness: {
      score_global: 22,
      breakdown: { gouvernance: 10, lbc_ft: 18, controle_interne: 25, gestion_risques: 20, conformite_reglementaire: 15, reporting: 42 },
      benchmark: [
        { label: 'Moyenne EMF CEMAC', score: 55 },
        { label: 'CREC Gabon', score: 22 },
        { label: 'Seuil Alerte COBAC', score: 40 },
      ],
      interpretation: 'Score de 22/100 — DÉFAILLANCE CRITIQUE. La CREC Gabon est en situation de non-conformité systémique. L\'absence de gouvernance statutaire expose l\'établissement à une mise sous administration provisoire. Une inspection non annoncée serait catastrophique.',
      points_critiques_inspection: [
        'CA non statutaire : nullité juridique des décisions → risque de mise sous administration',
        'Registre BE papier et incomplet : incapacité totale à démontrer la conformité LBC/FT',
        'Classification risques non révisée depuis 12 mois : abandon manifeste de la surveillance',
        'Fonction conformité externalisée 2j/mois : inacceptable pour la COBAC',
      ],
      recommandations_derniere_minute: [
        'URGENCE ABSOLUE : Régulariser le CA avant toute inspection (J+120)',
        'Recruter le responsable conformité permanent et le présenter comme l\'interlocuteur unique',
        'Rassembler tous les documents disponibles dans un dossier « Inspection » pour démontrer la bonne foi',
        'Ne pas attendre l\'inspection pour lancer la collecte BE — chaque jour compte',
      ],
    },
    metadata: {
      auditeur: 'KOS Senior Compliance Auditor™ — Big Four Grade v2.3',
      date_audit: '2026-06-24',
      duree_mission_jours: 12,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'Normes ISA 250'],
      prochaine_inspection_estimee: 'Q1 2027 (estimé Février 2027)',
    },
  },

  // ─── INST-003 : PayCEMAC SA ───
  {
    institution: INSTITUTIONS[2],
    executive_summary: {
      note_globale: 'PayCEMAC SA, en tant que nouvel établissement de paiement agréé en 2025, présente un profil de risque ÉLEVÉ principalement dû à l\'immaturité de son dispositif de conformité. L\'essentiel des procédures est en cours d\'élaboration. Aucun audit externe LBC/FT n\'a jamais été réalisé. Cependant, l\'établissement bénéficie d\'un avantage : sa architecture est nativement digitale, ce qui facilitera le déploiement d\'outils de conformité automatisés.',
      constats_cles: [
        'Dispositif LBC/FT en construction : KYC partiellement digitalisé, pas de scoring risque automatisé',
        'Registre BE : 88% documenté via la solution KYC digitale — bon point',
        'Aucun audit externe LBC/FT réalisé — exigible dans les 12 mois de l\'agrément (échéance : 08/2026)',
        'Procédure VASP : inexistante',
        'Équipe conformité : 1 responsable, pas d\'analyste',
      ],
      top_3_risques: [
        { risque: 'Premier audit externe LBC/FT non planifié — échéance Août 2026', criticite: 'Critique', exposition: 'Non-conformité Art.25 COBAC R-2026/03 si dépassement échéance' },
        { risque: 'Absence de scoring risque automatisé — toute la classification est déclarative', criticite: 'Élevé', exposition: 'Classification risques invalide — non-conformité Art.22' },
        { risque: 'Pas de procédure VASP — pertinent pour une fintech de paiement', criticite: 'Élevé', exposition: 'Exposition non maîtrisée aux risques crypto-actifs' },
      ],
      recommandation_globale: 'Prioriser la finalisation du dispositif LBC/FT avant l\'échéance du premier audit externe (08/2026). La nature digitale de l\'établissement est un atout : déployer des solutions SaaS de conformité plutôt que des processus manuels.',
    },
    gap_analysis: [
      { id: 'GAP-301', domaine: 'Audit Externe LBC/FT', etat_actuel: 'Aucun audit externe réalisé', etat_requis: 'Audit externe annuel dans les 12 mois de l\'agrément', ecart: 'Échéance Août 2026 — pas de cabinet sélectionné', impact: 'Non-conformité Art.25 COBAC R-2026/03 à l\'échéance', preuve_absence: 'Aucune lettre de mission cabinet d\'audit' },
      { id: 'GAP-302', domaine: 'Scoring Risque Automatisé', etat_actuel: 'Classification déclarative (questionnaire client)', etat_requis: 'Scoring automatisé 3 niveaux avec facteurs objectifs', ecart: 'Absence d\'automatisation, dépendance aux déclarations clients', impact: 'Risque de sous-classification systématique', preuve_absence: 'Questionnaire KYC : pas de pondération automatique, seuils manuels' },
      { id: 'GAP-303', domaine: 'Procédure VASP', etat_actuel: 'Inexistante', etat_requis: 'Procédure documentée screening blockchain', ecart: 'Absence totale', impact: 'Non-conformité Art.7 COBAC R-2026/03', preuve_absence: 'Aucune documentation VASP' },
      { id: 'GAP-304', domaine: 'Équipe Conformité', etat_actuel: '1 responsable, 0 analyste', etat_requis: 'Équipe dimensionnée au volume de transactions', ecart: 'Sous-dimensionnement pour 50 000 transactions/mois', impact: 'Risque opérationnel — goulot d\'étranglement', preuve_absence: 'Organigramme — Direction Conformité = 1 ETP' },
    ],
    findings: [
      { id: 'F-301', constat: 'Premier audit externe LBC/FT non planifié à 2 mois de l\'échéance', severite: 'Critique', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.25'], description: 'L\'agrément COBAC datant d\'août 2025, le premier audit externe LBC/FT doit être réalisé avant août 2026. Aucun cabinet n\'a été sélectionné. Le délai de réalisation d\'un audit est de 2-3 mois.', delai_correction: '15 jours (sélection cabinet)', risque_inspection: 'Très élevé — Dépassement d\'échéance = non-conformité automatique' },
      { id: 'F-302', constat: 'Classification risques clients entièrement déclarative sans scoring automatisé', severite: 'Élevé', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.22'], description: 'Le niveau de risque est déterminé uniquement par les réponses du client au questionnaire KYC, sans croisement avec des sources externes (listes sanctions, médias négatifs, PEP).', delai_correction: '90 jours', risque_inspection: 'Élevé — La COBAC exige des critères objectifs et vérifiables de classification' },
    ],
    regulatory_references: [
      { id: 'REF-301', texte: 'COBAC R-2026/03 — LBC/FT', autorite: 'COBAC', articles_applicables: ['Art.4', 'Art.7', 'Art.22', 'Art.25'], exigence: 'Dispositif complet avant échéance premier audit', statut_conformite: 'partiellement_conforme', preuve_conformite: 'BE à 88% (bon), scoring non automatisé, VASP absent, audit non planifié' },
      { id: 'REF-302', texte: 'COBAC R-2025/07 — Gouvernance', autorite: 'COBAC', articles_applicables: ['Art.5', 'Art.8'], exigence: 'Comités constitués, CI documenté', statut_conformite: 'conforme', preuve_conformite: '4 comités constitués, manuel CI v1 documenté' },
    ],
    remediation_plan: [
      { etape: 1, action: 'Sélectionner et contracter un cabinet d\'audit certifié GAFI pour l\'audit LBC/FT inaugural', responsable: 'Comité d\'Audit + DG', delai: 'J+15', livrable: 'Lettre de mission signée avec cabinet certifié GAFI', cout_estime_fcfa: '20 000 000', priorite: 'P0', dependances: [], critere_succes: 'Contrat signé, audit planifié avant 08/2026' },
      { etape: 2, action: 'Déployer un module de scoring risque automatisé (SaaS compliance)', responsable: 'DSI + Resp. Conformité', delai: 'J+90', livrable: 'Scoring automatisé 3 niveaux intégré au KYC', cout_estime_fcfa: '15 000 000 + 6 000 000/an', priorite: 'P1', dependances: [], critere_succes: '100% clients scorés automatiquement, revue trimestrielle' },
    ],
    inspection_readiness: {
      score_global: 48,
      breakdown: { gouvernance: 60, lbc_ft: 35, controle_interne: 50, gestion_risques: 40, conformite_reglementaire: 42, reporting: 58 },
      benchmark: [
        { label: 'Moyenne FinTechs CEMAC', score: 52 },
        { label: 'PayCEMAC SA', score: 48 },
        { label: 'Seuil Inspection COBAC', score: 60 },
      ],
      interpretation: 'Score de 48/100 — PRÉPARATION INSUFFISANTE. PayCEMAC est proche de la moyenne des fintechs CEMAC mais en dessous du seuil d\'inspection. L\'avantage est la plateforme nativement digitale qui permet des corrections rapides. L\'audit externe est le point bloquant principal.',
      points_critiques_inspection: ['Audit externe non planifié à 2 mois de l\'échéance — risque de non-conformité automatique', 'Scoring risque déclaratif — non conforme aux exigences COBAC', 'Procédure VASP inexistante pour une fintech de paiement'],
      recommandations_derniere_minute: ['PRIORITÉ ABSOLUE : Sélectionner le cabinet d\'audit cette semaine', 'Documenter le plan de déploiement du scoring automatisé à présenter aux inspecteurs', 'Rédiger une procédure VASP même sommaire avant l\'audit'],
    },
    metadata: {
      auditeur: 'KOS Senior Compliance Auditor™ — Big Four Grade v2.3',
      date_audit: '2026-06-24',
      duree_mission_jours: 10,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'Normes ISA 250'],
      prochaine_inspection_estimee: 'Q3 2026 (première inspection COBAC post-agrément)',
    },
  },

  // ─── INST-004 : Banque Commerciale de Guinée Équatoriale ───
  {
    institution: INSTITUTIONS[3],
    executive_summary: {
      note_globale: 'La Banque Commerciale de Guinée Équatoriale présente un profil de risque MODÉRÉ. L\'établissement a un bon niveau de conformité global (73/100) mais une exposition significative aux transactions internationales avec des pays à haut risque GAFI. Le dispositif LBC/FT est mature mais le filtrage des transactions transfrontalières présente des angles morts. La gouvernance est conforme au R-2025/07.',
      constats_cles: [
        'Filtrage transactions : 12% des transactions internationales ne font pas l\'objet d\'un screening sanctions en temps réel',
        'Registre BE : 96% documenté — bon niveau, mais 4% restants sont des clients corporate complexes',
        'Classification risques : 3 niveaux, revue trimestrielle effective — conforme',
        'Audit externe LBC/FT 2025 réalisé — 2 recommandations non implémentées',
        'Plan de Financement d\'Urgence : documenté mais dernier test date de 2024',
      ],
      top_3_risques: [
        { risque: '12% de transactions internationales non screenées en temps réel', criticite: 'Élevé', exposition: 'Risque de transaction avec entité sanctionnée — Art.7 COBAC R-2026/03' },
        { risque: 'BE corporate complexes non documentés (4% = 47 entités)', criticite: 'Modéré', exposition: 'Non-conformité partielle Art.4 COBAC R-2026/03' },
        { risque: 'PFU non testé depuis 2024 — exigence annuelle', criticite: 'Modéré', exposition: 'Non-conformité Art.8 BEAC n°008-2026' },
      ],
      recommandation_globale: 'Renforcer le filtrage temps réel des transactions internationales (objectif 100%). Finaliser la documentation BE des 47 entités corporate complexes. Planifier le test PFU 2026. Implémenter les 2 recommandations d\'audit externe restantes.',
    },
    gap_analysis: [
      { id: 'GAP-401', domaine: 'Filtrage Transactions Internationales', etat_actuel: '88% des transactions screenées en temps réel', etat_requis: '100% screening temps réel obligatoire', ecart: '12% non screenés (transactions overnight batch)', impact: 'Non-conformité Art.7 COBAC R-2026/03 — Élevé', preuve_absence: 'Logs moteur de filtrage : 12 450 transactions/mois, 10 956 screenées' },
      { id: 'GAP-402', domaine: 'BE Clients Corporate Complexes', etat_actuel: '47 entités corporate sans BE complet', etat_requis: '100% des entités avec BE identifié', ecart: '47 entités (4%) avec chaînes de détention complexes', impact: 'Non-conformité partielle Art.4 — Modéré', preuve_absence: 'Rapport registre BE : 47 entités en statut « en cours » depuis +6 mois' },
      { id: 'GAP-403', domaine: 'Test PFU Annuel', etat_actuel: 'Dernier test : 11/2024', etat_requis: 'Test annuel obligatoire', ecart: 'Test 2025 non réalisé (retard de 7 mois)', impact: 'Non-conformité Art.8 BEAC n°008-2026 — Modéré', preuve_absence: 'Rapport de test PFU le plus récent : 15/11/2024' },
    ],
    findings: [
      { id: 'F-401', constat: 'Écart de couverture du filtrage transactions internationales (12%)', severite: 'Élevé', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.7'], description: 'Les transactions traitées en batch overnight ne sont pas screenées en temps réel. Le screening est effectué le lendemain avec un délai de 12-24h, ce qui est insuffisant.', delai_correction: '60 jours', risque_inspection: 'Élevé — Le régulateur testera des scénarios de transactions vers pays à haut risque' },
      { id: 'F-402', constat: 'BE corporate complexes non finalisés depuis +6 mois', severite: 'Modéré', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.4'], description: '47 entités corporate avec structures de détention multi-juridictionnelles restent en statut « en cours » depuis plus de 6 mois. Pas de procédure d\'escalade pour les cas complexes.', delai_correction: '90 jours', risque_inspection: 'Modéré — Le régulateur tolère une marge pour les structures complexes mais exigera un plan d\'action' },
      { id: 'F-403', constat: 'Recommandations audit externe 2025 non implémentées', severite: 'Élevé', reference_reglementaire: 'COBAC R-2026/03', articles_violes: ['Art.25'], description: 'L\'audit externe LBC/FT 2025 a émis 5 recommandations dont 2 restent non implémentées : renforcement KYC PEP et automatisation des alertes GABAC.', delai_correction: '45 jours', risque_inspection: 'Élevé — Les inspecteurs vérifieront systématiquement le suivi des recommandations d\'audit' },
    ],
    regulatory_references: [
      { id: 'REF-401', texte: 'COBAC R-2026/03 — LBC/FT', autorite: 'COBAC', articles_applicables: ['Art.4', 'Art.7', 'Art.22', 'Art.25'], exigence: 'Dispositif LBC/FT mature et complet', statut_conformite: 'partiellement_conforme', preuve_conformite: 'BE 96%, scoring OK, filtrage 88%, 2 recommandations audit restantes' },
      { id: 'REF-402', texte: 'BEAC n°008-2026 — Liquidité', autorite: 'BEAC', articles_applicables: ['Art.2', 'Art.5', 'Art.8'], exigence: 'LCR ≥ 100%, NSFR ≥ 100%, PFU testé', statut_conformite: 'partiellement_conforme', preuve_conformite: 'LCR 134%, NSFR 118%, PFU non testé 2025' },
      { id: 'REF-403', texte: 'COBAC R-2025/07 — Gouvernance', autorite: 'COBAC', articles_applicables: ['Art.3', 'Art.5', 'Art.8', 'Art.12', 'Art.15'], exigence: 'Gouvernance Big Four conforme', statut_conformite: 'conforme', preuve_conformite: 'CA 40% indépendants, 4 comités opérationnels, CI documenté et testé' },
    ],
    remediation_plan: [
      { etape: 1, action: 'Étendre le filtrage temps réel aux transactions batch overnight', responsable: 'DSI + Resp. LBC/FT', delai: 'J+60', livrable: '100% transactions screenées en temps réel', cout_estime_fcfa: '18 000 000', priorite: 'P0', dependances: [], critere_succes: 'Taux de screening temps réel = 100%' },
      { etape: 2, action: 'Implémenter les 2 recommandations d\'audit externe restantes', responsable: 'Resp. LBC/FT', delai: 'J+45', livrable: 'KYC PEP renforcé + alertes GABAC automatisées', cout_estime_fcfa: '0 (budget déjà alloué)', priorite: 'P1', dependances: [], critere_succes: 'Recommandations clôturées dans l\'outil de suivi' },
      { etape: 3, action: 'Finaliser la documentation BE des 47 entités corporate complexes', responsable: 'Responsable Conformité', delai: 'J+90', livrable: 'BE documentés pour 100% des entités corporate', cout_estime_fcfa: '5 000 000', priorite: 'P2', dependances: [], critere_succes: '0 entité en statut « en cours »' },
      { etape: 4, action: 'Réaliser le test PFU 2025-2026', responsable: 'ALM / Trésorerie', delai: 'J+30', livrable: 'Rapport de test PFU 2026', cout_estime_fcfa: '2 000 000', priorite: 'P2', dependances: [], critere_succes: 'Test PFU documenté et présenté au CA' },
    ],
    inspection_readiness: {
      score_global: 71,
      breakdown: { gouvernance: 82, lbc_ft: 68, controle_interne: 75, gestion_risques: 72, conformite_reglementaire: 65, reporting: 80 },
      benchmark: [
        { label: 'Moyenne Banques CEMAC', score: 67 },
        { label: 'Top 5 Banques CEMAC', score: 85 },
        { label: 'Banque Commerciale GE', score: 71 },
        { label: 'Seuil Inspection COBAC', score: 60 },
      ],
      interpretation: 'Score de 71/100 — BONNE PRÉPARATION. L\'établissement est au-dessus du seuil d\'inspection et de la moyenne CEMAC. Les 2 principaux points d\'attention (filtrage 88% et recommandations audit) sont corrigeables en moins de 60 jours. L\'inspection devrait bien se passer si ces correctifs sont apportés.',
      points_critiques_inspection: [
        'Filtrage transactions : sera testé par scénarios — corriger avant inspection',
        'Recommandations d\'audit externes : suivi systématiquement vérifié → implémenter les 2 restantes',
        'PFU non testé 2025 : point modéré mais qui sera relevé',
      ],
      recommandations_derniere_minute: [
        'Finaliser le déploiement du filtrage temps réel — c\'est le principal risque d\'inspection',
        'Préparer un dossier de preuves pour chaque recommandation d\'audit (clôturées et en cours)',
        'Programmer le test PFU et documenter le planning pour le présenter aux inspecteurs',
      ],
    },
    metadata: {
      auditeur: 'KOS Senior Compliance Auditor™ — Big Four Grade v2.3',
      date_audit: '2026-06-24',
      duree_mission_jours: 14,
      normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026', 'Normes ISA 250'],
      prochaine_inspection_estimee: 'Q4 2026 (estimé Novembre 2026)',
    },
  },
];

// ═══════════════════════════════════════════════════════
// AUDITOR AGENTS
// ═══════════════════════════════════════════════════════

export const AUDITOR_AGENTS = [
  { id: 'ca-01', nom: 'Executive Risk Summarizer™', mission: 'Synthèse exécutive des risques avec classification automatique des constats critiques', statut: 'active', audits_realises: 4, precision: 98.0, icon: 'ri-file-warning-line' },
  { id: 'ca-02', nom: 'Gap Analyzer™', mission: 'Analyse des écarts État Actuel vs État Requis avec collecte de preuves d\'absence', statut: 'active', ecarts_identifies: 17, precision: 97.5, icon: 'ri-contrast-2-line' },
  { id: 'ca-03', nom: 'Severity Classifier™', mission: 'Classification COBAC des constats (Critique/Élevé/Modéré/Faible) avec mapping articles violés', statut: 'active', constats_classes: 19, precision: 99.0, icon: 'ri-alert-line' },
  { id: 'ca-04', nom: 'Regulatory Reference Mapper™', mission: 'Cartographie exhaustive des textes applicables avec statut de conformité par article', statut: 'active', textes_mappes: 14, precision: 98.8, icon: 'ri-scales-3-line' },
  { id: 'ca-05', nom: 'Remediation Planner™', mission: 'Génération de plans de remédiation step-by-step avec priorisation P0-P3, coûts et dépendances', statut: 'active', plans_generes: 4, precision: 96.5, icon: 'ri-tools-line' },
  { id: 'ca-06', nom: 'Inspection Readiness Scorer™', mission: 'Scoring 0-100 de préparation à l\'inspection avec benchmark sectoriel et recommandations dernière minute', statut: 'active', scores_calcules: 4, precision: 97.2, icon: 'ri-survey-line' },
];

export const AUDITOR_KPIS = {
  audits_realises: 4,
  institutions_auditees: ['Banque', 'EMF', 'FinTech'],
  constats_identifies: 19,
  constats_critiques: 9,
  ecarts_documentes: 17,
  plans_remediation_generes: 4,
  score_inspection_moyen: 45.5,
  normes_appliquees: ['COBAC R-2026/03', 'COBAC R-2025/07', 'BEAC n°008-2026', 'GABAC n°01/2026', 'GAFI 40 Recommandations'],
  mode: 'MOCK — Démo Interactive Senior Auditor',
};



