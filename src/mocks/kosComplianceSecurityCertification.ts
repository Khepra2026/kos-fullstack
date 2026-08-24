// KOS Compliance & Security Certification Command™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : KYC/CDD, LCB/FT Cartographie Risques, CEMAC/BCEAO/COBAC/OHADA, ISO 27001 Certification

export const kycCddProcedures = [
  {
    id: "kyc-001",
    procedure: "Identification du Client — Personnes Physiques",
    reference: "GAFI Rec. 10 / BCEAO Instruction LBC/FT Art. 12",
    scope: "Collecte et vérification des pièces d'identité (CNI, Passeport, Carte Consulaire), justificatif de domicile, profession, origine des fonds",
    status: "Déployé — Conforme GAFI",
    evidence_required: ["Copie CNI/Passeport certifiée", "Justificatif domicile < 3 mois", "Formulaire KYC signé", "Vérification biométrique (optionnelle)"],
    risk_level: "Standard",
    deadline: "2026-07-31",
    owner: "RCLCB/FT (Me Fatoumata Diallo)",
    kpi: "100% dossiers clients conformes",
    last_audit: "2026-06-15",
    audit_result: "Conforme — 98.5%"
  },
  {
    id: "kyc-002",
    procedure: "Identification du Bénéficiaire Effectif (BE)",
    reference: "GAFI Rec. 24-25 / BCEAO Circulaire 01-2017 / COBAC Règlement LCB/FT",
    scope: "Identification du/des BE détenant ≥ 25% du capital ou exerçant un contrôle effectif. Vérification registre de commerce, statuts, pactes d'actionnaires",
    status: "Partiel — 85%",
    evidence_required: ["Registre des BE mis à jour", "Déclaration BE signée", "Vérification registre RCCM", "Certification notariale si complexe"],
    risk_level: "Élevé",
    deadline: "2026-08-31",
    owner: "RCLCB/FT (Me Fatoumata Diallo)",
    kpi: "100% BE identifiés et vérifiés",
    last_audit: "2026-06-15",
    audit_result: "Partiel — 12 BE non vérifiés sur 80"
  },
  {
    id: "kyc-003",
    procedure: "Classification des Risques Client (Low / Medium / High)",
    reference: "GAFI Rec. 1 (Approche par les Risques) / BCEAO Instruction LBC/FT",
    scope: "Scoring automatique basé sur : profil client, pays de résidence (liste GAFI/OCDE), secteur d'activité, volume transactions, canal de distribution",
    status: "Déployé — Automatisé",
    evidence_required: ["Matrice scoring documentée", "Script scoring automatique", "Revue manuelle High Risk trimestrielle"],
    risk_level: "Standard",
    deadline: "2026-07-15",
    owner: "RSSI (Cdt. Amara Diop) + RCLCB/FT",
    kpi: "100% clients scorés en temps réel",
    last_audit: "2026-06-20",
    audit_result: "Conforme — scoring automatique opérationnel"
  },
  {
    id: "kyc-004",
    procedure: "Due Diligence Renforcée (EDD) — PPE & High Risk",
    reference: "GAFI Rec. 12 (PPE) / BCEAO / COBAC",
    scope: "Vérification approfondie pour les Personnes Politiquement Exposées (PPE) nationales, étrangères et OI. Validation par la hiérarchie (N+2), source des fonds détaillée",
    status: "Partiel — 60%",
    evidence_required: ["Formulaire EDD dédié", "Validation N+2 documentée", "Source des fonds détaillée (3 ans)", "Filtrage listes sanctions automatisé"],
    risk_level: "Critique",
    deadline: "2026-09-30",
    owner: "RCLCB/FT (Me Fatoumata Diallo)",
    kpi: "100% PPE identifiées + EDD complète",
    last_audit: "2026-06-10",
    audit_result: "Non conforme — 8 dossiers PPE sans EDD complète"
  },
  {
    id: "kyc-005",
    procedure: "Filtrage Listes Sanctions & Embargos",
    reference: "ONU (Résolutions 1267, 1373) / OFAC / UE / GAFI / GIABA / GABAC",
    scope: "Filtrage automatisé en temps réel contre les listes de sanctions internationales (ONU, OFAC, UE, UK HMT, GAFI) et régionales (GIABA, GABAC)",
    status: "Partiel — Liste BCEAO seulement",
    evidence_required: ["Outil filtrage opérationnel", "Logs de filtrage horodatés", "Procédure escalade en cas de hit", "Déclarations CENTIF/ANIF automatiques"],
    risk_level: "Critique",
    deadline: "2026-09-30",
    owner: "RSSI (Cdt. Amara Diop) + RCLCB/FT",
    kpi: "Filtrage 100% listes en temps réel",
    last_audit: "2026-06-10",
    audit_result: "Partiel — 2 listes non couvertes (OFAC, UK HMT) sur 7"
  },
  {
    id: "kyc-006",
    procedure: "Surveillance Continue des Transactions",
    reference: "GAFI Rec. 20 / BCEAO / COBAC",
    scope: "Monitoring automatisé des transactions : seuils d'alerte, profils comportementaux, transactions atypiques, pays à risque. Reporting Suspicious Activity Report (SAR)",
    status: "Planifié — Q3 2026",
    evidence_required: ["Module IA détection anomalies", "Paramétrage seuils par typologie", "Rapports SAR trimestriels", "Tableau de bord LCB/FT COMEX"],
    risk_level: "Élevé",
    deadline: "2026-12-31",
    owner: "RSSI (Cdt. Amara Diop)",
    kpi: "100% transactions surveillées, SAR < 24h",
    last_audit: "2026-06-05",
    audit_result: "Non commencé"
  }
];

export const lcbfRiskMapping = {
  global_risk_score: 62,
  target_score: 95,
  last_assessment: "2026-06-15",
  assessor: "Groupe de Travail LCB/FT — Consortium Big Four",
  jurisdictions: [
    {
      id: "jur-uemoa",
      name: "UEMOA (BCEAO)",
      countries: ["Sénégal", "Côte d'Ivoire", "Burkina Faso", "Mali", "Niger", "Togo", "Bénin", "Guinée-Bissau"],
      regulator: "BCEAO + CENTIF",
      risk_level: "Moyen",
      compliance_score: 72,
      key_risks: [
        "Transactions transfrontalières non documentées",
        "Secteurs informels à fort volume cash",
        "Insuffisance des déclarations de soupçon CENTIF",
        "Faible couverture KYC dans les SFD décentralisés"
      ],
      gaps_count: 4,
      actions_required: "Renforcement dispositif LCB/FT + Formation CENTIF",
      deadline: "2026-09-30"
    },
    {
      id: "jur-cemac",
      name: "CEMAC (COBAC)",
      countries: ["Cameroun", "Gabon", "Congo", "Tchad", "RCA", "Guinée Équatoriale"],
      regulator: "COBAC + ANIF/GABAC",
      risk_level: "Élevé",
      compliance_score: 58,
      key_risks: [
        "Dispositif GABAC moins mature que GIABA",
        "Transits cash transfrontaliers non déclarés",
        "PPE régionales nombreuses — EDD lacunaire",
        "Filtrage sanctions GABAC non intégré"
      ],
      gaps_count: 6,
      actions_required: "Alignement procédures CEMAC + Formation GABAC",
      deadline: "2026-10-31"
    },
    {
      id: "jur-ohada",
      name: "Zone OHADA",
      countries: ["17 États membres OHADA"],
      regulator: "OHADA — Acte Uniforme Droit des Sociétés",
      risk_level: "Faible",
      compliance_score: 85,
      key_risks: [
        "Registres BE parfois obsolètes dans certains États",
        "Disparité des registres de commerce nationaux"
      ],
      gaps_count: 2,
      actions_required: "Harmonisation procédures BE OHADA",
      deadline: "2026-08-31"
    }
  ],
  risk_categories: [
    { name: "Risque Pays / Géographique", score: 65, target: 95, weight: 20 },
    { name: "Risque Client / BE", score: 70, target: 95, weight: 25 },
    { name: "Risque Produit / Service", score: 75, target: 90, weight: 15 },
    { name: "Risque Canal de Distribution", score: 55, target: 90, weight: 15 },
    { name: "Risque Transaction", score: 50, target: 95, weight: 25 }
  ]
};

export const cemacAdaptation = [
  {
    id: "cem-001",
    procedure: "Procédure LCB/FT — Alignement COBAC Règlement LCB/FT",
    reference: "COBAC Règlement LCB/FT 2023 / GABAC",
    gap: "Procédures KYC/CDD basées sur le référentiel BCEAO uniquement. Absence d'intégration du dispositif GABAC",
    adaptation: "Harmonisation du formulaire KYC — Ajout des champs spécifiques CEMAC (Carte de séjour CEMAC, Agrément BEAC pour opérations change)",
    status: "En cours — 70%",
    deadline: "2026-08-31",
    owner: "RCLCB/FT",
    budget: "4 500 000 FCFA",
    evidence: ["Formulaire KYC harmonisé UEMOA/CEMAC", "Procédure GABAC intégrée", "Test validation COBAC"]
  },
  {
    id: "cem-002",
    procedure: "Déclarations de Soupçon — Double Canal CENTIF + ANIF",
    reference: "CENTIF (UEMOA) / ANIF (CEMAC) / GABAC",
    gap: "Système de déclaration paramétré pour CENTIF uniquement. Canal ANIF non opérationnel",
    adaptation: "Configuration double circuit de déclaration automatique CENTIF + ANIF avec formats réglementaires respectifs",
    status: "Planifié — 30%",
    deadline: "2026-10-31",
    owner: "RSSI + RCLCB/FT",
    budget: "7 200 000 FCFA",
    evidence: ["Module déclaration ANIF", "Test circuit complet CENTIF+ANIF", "Template déclarations régionales"]
  },
  {
    id: "cem-003",
    procedure: "Formation LCB/FT — Module CEMAC/GABAC",
    reference: "GABAC / COBAC",
    gap: "Formation LCB/FT focalisée GIABA (UEMOA). Aucun module dédié GABAC (CEMAC)",
    adaptation: "Création module formation LCB/FT spécifique CEMAC : cadre réglementaire GABAC, typologies CEMAC, procédures ANIF",
    status: "Planifié — 20%",
    deadline: "2026-09-30",
    owner: "RCLCB/FT",
    budget: "3 800 000 FCFA",
    evidence: ["Module e-learning GABAC", "QCM validation", "Certificats de formation CEMAC"]
  },
  {
    id: "cem-004",
    procedure: "Registre des BE — Extension CEMAC",
    reference: "COBAC / OHADA / GABAC Rec. 24-25",
    gap: "Registre BE conforme BCEAO uniquement. Absence de format COBAC",
    adaptation: "Extension du registre BE au format COBAC avec vérification croisée RCCM CEMAC",
    status: "En cours — 50%",
    deadline: "2026-08-31",
    owner: "RCLCB/FT",
    budget: "2 100 000 FCFA",
    evidence: ["Registre BE format COBAC", "Procédure vérification RCCM CEMAC"]
  }
];

export const bceaoCobacOhadaAlignment = [
  {
    id: "ali-001",
    framework: "BCEAO",
    requirement: "Circulaire 01-2017 — Gouvernance SFD",
    status: "Conforme",
    score: 92,
    gap: "N/A",
    action: "Maintien conformité — revue trimestrielle",
    deadline: "Continu",
    owner: "Comité d'Audit"
  },
  {
    id: "ali-002",
    framework: "BCEAO",
    requirement: "Instruction LBC/FT — Dispositif Minimum",
    status: "Partiel",
    score: 68,
    gap: "Procédures EDD incomplètes, filtrage sanctions limité, formation insuffisante",
    action: "Renforcement EDD + Filtrage 7 listes + Formation 100%",
    deadline: "2026-09-30",
    owner: "RCLCB/FT"
  },
  {
    id: "ali-003",
    framework: "BCEAO",
    requirement: "Dispositif Prudentiel — SURFI",
    status: "Conforme",
    score: 88,
    gap: "Reporting SURFI OK — délai déclaration à améliorer",
    action: "Automatisation extraction SURFI temps réel",
    deadline: "2026-10-31",
    owner: "RSSI"
  },
  {
    id: "ali-004",
    framework: "COBAC",
    requirement: "Règlement LCB/FT — Dispositif Banques & SFD CEMAC",
    status: "Non Conforme",
    score: 45,
    gap: "Pas de dispositif GABAC intégré. Absence déclarations ANIF. Registre BE non conforme COBAC",
    action: "Déploiement complet dispositif CEMAC — 4 procédures",
    deadline: "2026-10-31",
    owner: "RCLCB/FT"
  },
  {
    id: "ali-005",
    framework: "COBAC",
    requirement: "Directive Résilience Opérationnelle 2027",
    status: "Partiel",
    score: 55,
    gap: "PCA/PRA documenté non testé. SOC 24/7 non aligné",
    action: "Test PCA/PRA annuel + Alignement SOC COBAC",
    deadline: "2027-06-30",
    owner: "RSSI"
  },
  {
    id: "ali-006",
    framework: "OHADA",
    requirement: "Acte Uniforme Droit des Sociétés (AUSCGIE) — Gouvernance",
    status: "Conforme",
    score: 90,
    gap: "RI-CA adopté, conventions réglementées suivies",
    action: "Maintien — mise à jour RI-CA si évolution AUSCGIE",
    deadline: "Continu",
    owner: "Comité d'Audit"
  },
  {
    id: "ali-007",
    framework: "OHADA",
    requirement: "Acte Uniforme Procédures Simplifiées — SFD",
    status: "Partiel",
    score: 70,
    gap: "Procédures spécifiques SFD UEMOA non transposées OHADA",
    action: "Harmonisation procédures SFD OHADA/UEMOA",
    deadline: "2026-11-30",
    owner: "Directeur BU1 Régulation"
  },
  {
    id: "ali-008",
    framework: "GAFI",
    requirement: "40 Recommandations — Évaluation Conformité Technique",
    status: "Partiel",
    score: 65,
    gap: "7 recommandations partiellement conformes (Rec. 10, 12, 20, 22, 24, 25, 33)",
    action: "Plan remédiation GAFI — 7 recommandations × actions",
    deadline: "2026-12-31",
    owner: "RCLCB/FT + Comité RC"
  }
];

export const iso27001SmsiDocs = [
  { id: "smsi-001", document: "Politique de Sécurité des SI (PSSI)", reference: "ISO 27001 §5.2", status: "Adoptée — v2.0", pages: 35, owner: "RSSI", last_update: "2026-06-15", level: "Stratégique" },
  { id: "smsi-002", document: "Périmètre SMSI (Scope Statement)", reference: "ISO 27001 §4.3", status: "Adopté — v1.0", pages: 8, owner: "RSSI", last_update: "2026-06-15", level: "Stratégique" },
  { id: "smsi-003", document: "Politique de Classification de l'Information", reference: "ISO 27001 A.8.2", status: "Adoptée — v1.0", pages: 12, owner: "RSSI", last_update: "2026-06-20", level: "Tactique" },
  { id: "smsi-004", document: "Politique de Contrôle d'Accès Logique", reference: "ISO 27001 A.9.1", status: "Adoptée — v2.0", pages: 18, owner: "RSSI", last_update: "2026-06-20", level: "Tactique" },
  { id: "smsi-005", document: "Procédure Gestion des Incidents de Sécurité", reference: "ISO 27001 A.16.1", status: "Adoptée — v1.0", pages: 22, owner: "RSSI", last_update: "2026-06-18", level: "Opérationnel" },
  { id: "smsi-006", document: "Plan de Continuité d'Activité (PCA)", reference: "ISO 27001 A.17.1 / ISO 22301", status: "Brouillon — 75%", pages: 28, owner: "RSSI", last_update: "2026-06-22", level: "Tactique" },
  { id: "smsi-007", document: "Procédure Gestion des Capacités", reference: "ISO 27001 A.12.1.3", status: "Adopté — v1.0", pages: 10, owner: "RSSI", last_update: "2026-06-10", level: "Opérationnel" },
  { id: "smsi-008", document: "Politique de Sécurité Physique", reference: "ISO 27001 A.11", status: "À créer", pages: 0, owner: "RSSI", last_update: "N/A", level: "Tactique" },
  { id: "smsi-009", document: "Procédure SDLC Sécurisé (DevSecOps)", reference: "ISO 27001 A.14", status: "À créer", pages: 0, owner: "RSSI + Lead Dev", last_update: "N/A", level: "Opérationnel" },
  { id: "smsi-010", document: "Politique de Sécurité Fournisseurs", reference: "ISO 27001 A.15", status: "Brouillon — 40%", pages: 12, owner: "RSSI", last_update: "2026-06-20", level: "Tactique" },
  { id: "smsi-011", document: "Registre des Actifs Informationnels", reference: "ISO 27001 A.8.1", status: "Adopté — v1.0", pages: 45, owner: "RSSI", last_update: "2026-06-15", level: "Opérationnel" },
  { id: "smsi-012", document: "Matrice des Rôles et Responsabilités Sécurité", reference: "ISO 27001 A.6.1", status: "Adoptée — v1.0", pages: 8, owner: "RSSI", last_update: "2026-06-20", level: "Stratégique" }
];

export const iso27001RiskAssessment = [
  {
    id: "risk-001",
    risk: "Accès non autorisé aux données clients (KYC, BE, transactions)",
    category: "Confidentialité",
    likelihood: "Moyenne",
    impact: "Critique",
    inherent_risk: 16,
    controls: ["MFA obligatoire", "RBAC strict", "Audit trail complet", "Chiffrement AES-256"],
    residual_risk: 4,
    risk_owner: "RSSI",
    treatment: "Réduire",
    deadline: "2026-08-15"
  },
  {
    id: "risk-002",
    risk: "Attaque par ransomware sur infrastructure KOS",
    category: "Disponibilité",
    likelihood: "Élevée",
    impact: "Critique",
    inherent_risk: 20,
    controls: ["Backup immuable 30 jours", "EDR CrowdStrike", "SOC 24/7", "PCA testé"],
    residual_risk: 6,
    risk_owner: "RSSI",
    treatment: "Réduire",
    deadline: "2026-09-30"
  },
  {
    id: "risk-003",
    risk: "Non-conformité LCB/FT — Sanction régulateur (BCEAO/COBAC)",
    category: "Conformité",
    likelihood: "Moyenne",
    impact: "Majeur",
    inherent_risk: 15,
    controls: ["Procédures KYC/CDD/EDD", "Filtrage 7 listes sanctions", "Formation 100% personnel", "Audit externe annuel"],
    residual_risk: 3,
    risk_owner: "RCLCB/FT",
    treatment: "Réduire",
    deadline: "2026-09-30"
  },
  {
    id: "risk-004",
    risk: "Faille de sécurité dans le code applicatif (OWASP Top 10)",
    category: "Intégrité",
    likelihood: "Élevée",
    impact: "Majeur",
    inherent_risk: 16,
    controls: ["SAST/DAST pipeline CI/CD", "Pentest trimestriel", "Bug bounty program", "WAF Cloudflare"],
    residual_risk: 4,
    risk_owner: "RSSI + Lead Dev",
    treatment: "Réduire",
    deadline: "2026-08-31"
  },
  {
    id: "risk-005",
    risk: "Défaillance fournisseur SaaS critique (Supabase, Netlify)",
    category: "Disponibilité",
    likelihood: "Faible",
    impact: "Majeur",
    inherent_risk: 12,
    controls: ["Multi-cloud strategy", "SLA contractuels", "Plan bascule (< 4h)", "Due diligence fournisseurs"],
    residual_risk: 3,
    risk_owner: "RSSI",
    treatment: "Accepter (risque résiduel faible)",
    deadline: "2026-10-31"
  },
  {
    id: "risk-006",
    risk: "Vol ou perte de données personnelles (RGPD / UEMOA Data Protection)",
    category: "Confidentialité",
    likelihood: "Moyenne",
    impact: "Critique",
    inherent_risk: 15,
    controls: ["Chiffrement au repos et en transit", "DLP monitoring", "Registre traitements", "DPO désigné"],
    residual_risk: 4,
    risk_owner: "RSSI",
    treatment: "Réduire",
    deadline: "2026-09-15"
  },
  {
    id: "risk-007",
    risk: "Compromission des clés de chiffrement / certificats",
    category: "Confidentialité",
    likelihood: "Faible",
    impact: "Critique",
    inherent_risk: 12,
    controls: ["HSM / KMS managé", "Rotation automatique 90j", "Séparation des environnements"],
    residual_risk: 2,
    risk_owner: "RSSI",
    treatment: "Accepter",
    deadline: "2026-08-15"
  },
  {
    id: "risk-008",
    risk: "Insider threat — employé malveillant ou négligent",
    category: "Intégrité",
    likelihood: "Faible",
    impact: "Majeur",
    inherent_risk: 8,
    controls: ["RBAC + least privilege", "Background check", "Session recording", "Revue trimestrielle accès"],
    residual_risk: 2,
    risk_owner: "DRH + RSSI",
    treatment: "Accepter",
    deadline: "2026-09-30"
  }
];

export const iso27001InternalAudit = {
  audit_date: "2026-06-18",
  auditor: "RSSI (Cdt. Amara Diop) — Auto-évaluation préparatoire",
  next_audit: "2026-09-15 — Audit blanc extern",
  overall_score: 68,
  target_score: 90,
  findings: [
    { id: "aud-001", domain: "A.8 — Gestion des Actifs", finding: "Registre des actifs complet mais non revu depuis 3 mois", severity: "Mineure", status: "Corrigé", correction_date: "2026-06-20" },
    { id: "aud-002", domain: "A.11 — Sécurité Physique", finding: "Absence de politique de sécurité physique documentée", severity: "Majeure", status: "En cours", correction_date: "2026-07-31" },
    { id: "aud-003", domain: "A.14 — Acquisition & Développement", finding: "Absence de procédure SDLC sécurisé (DevSecOps)", severity: "Majeure", status: "En cours", correction_date: "2026-08-31" },
    { id: "aud-004", domain: "A.15 — Relations Fournisseurs", finding: "Politique sécurité fournisseurs incomplète (40%)", severity: "Majeure", status: "En cours", correction_date: "2026-07-31" },
    { id: "aud-005", domain: "A.17 — Continuité d'Activité", finding: "PCA documenté à 75% mais jamais testé", severity: "Critique", status: "En cours", correction_date: "2026-09-30" },
    { id: "aud-006", domain: "A.18 — Conformité", finding: "Revue conformité RGPD / Data Protection UEMOA incomplète", severity: "Majeure", status: "Planifié", correction_date: "2026-08-15" },
    { id: "aud-007", domain: "A.9 — Contrôle d'Accès", finding: "Revue trimestrielle des accès non effectuée (retard 1 mois)", severity: "Mineure", status: "Corrigé", correction_date: "2026-06-22" },
    { id: "aud-008", domain: "A.12 — Sécurité Opérationnelle", finding: "Absence de procédure gestion des vulnérabilités documentée", severity: "Majeure", status: "Planifié", correction_date: "2026-07-15" }
  ],
  non_conformities: { critiques: 1, majeures: 4, mineures: 2, total: 7 },
  resolved: { critiques: 0, majeures: 0, mineures: 2, total: 2 }
};

export const certificationPlan = {
  global_score_initial: 52,
  global_score_cible: 95,
  budget_total: "226 800 000 FCFA",
  timeline: "Q3 2026 — Q2 2027 (12 mois)",
  roi_projete: "> 28× (Évitement sanctions + CA conformité)",
  consortium: "PwC · Deloitte · EY · KPMG",
  phases: [
    {
      id: "phase-1",
      name: "Phase 1 — Procédures KYC/CDD & Cartographie LCB/FT",
      period: "Juillet — Août 2026 (2 mois)",
      budget: "48 500 000 FCFA",
      score_cible: 75,
      deliverables: [
        "6 procédures KYC/CDD/EDD déployées et auditées",
        "Cartographie risques LCB/FT — 3 juridictions (UEMOA, CEMAC, OHADA)",
        "Filtrage 7 listes sanctions opérationnel",
        "Formation LCB/FT 100% personnel (initial)",
        "Alignement BCEAO/COBAC/OHADA documenté",
        "Registre BE multi-juridiction conforme"
      ],
      evidence: [
        "Procédures KYC/CDD v2.0 signées COMEX",
        "Rapport cartographie risques LCB/FT",
        "Logs filtrage sanctions 7 listes",
        "Certificats formation LCB/FT 100%",
        "Matrice alignement BCEAO/COBAC/OHADA"
      ],
      milestones: [
        "KYC/CDD 100% déployé — 31 Juillet 2026",
        "Filtrage sanctions complet — 15 Août 2026",
        "Formation LCB/FT terminée — 31 Août 2026",
        "Cartographie risques livrée — 31 Août 2026"
      ]
    },
    {
      id: "phase-2",
      name: "Phase 2 — Adaptation CEMAC & Alignement Réglementaire",
      period: "Septembre — Octobre 2026 (2 mois)",
      budget: "37 600 000 FCFA",
      score_cible: 82,
      deliverables: [
        "4 procédures CEMAC adaptées (KYC, déclarations, formation, BE)",
        "8 alignements BCEAO/COBAC/OHADA complétés",
        "Double circuit déclaration CENTIF + ANIF opérationnel",
        "Module formation GABAC déployé",
        "Registre BE COBAC conforme"
      ],
      evidence: [
        "Procédures CEMAC v1.0 validées COBAC",
        "Rapport alignement multi-juridiction",
        "Test circuit double déclaration réussi",
        "Module e-learning GABAC certifié"
      ],
      milestones: [
        "Procédures CEMAC adaptées — 30 Septembre 2026",
        "Double déclaration opérationnelle — 15 Octobre 2026",
        "Alignement BCEAO/COBAC/OHADA complété — 31 Octobre 2026"
      ]
    },
    {
      id: "phase-3",
      name: "Phase 3 — Documentation SMSI ISO 27001 & Risk Assessment",
      period: "Novembre — Décembre 2026 (2 mois)",
      budget: "82 700 000 FCFA",
      score_cible: 90,
      deliverables: [
        "12 documents SMSI complétés (3 restants → 100%)",
        "8 risques évalués avec traitements documentés",
        "Audit interne ISO 27001 — 0 non-conformité critique",
        "PCA testé et validé",
        "Politique sécurité fournisseurs finalisée",
        "Procédure SDLC sécurisé déployée"
      ],
      evidence: [
        "PSSI v2.0 + 12 documents SMSI",
        "Rapport risk assessment ISO 27001",
        "Rapport audit interne — score ≥ 85/100",
        "Rapport test PCA — RTO/RPO validés",
        "Due diligence fournisseurs critiques"
      ],
      milestones: [
        "SMSI documentation 100% — 15 Novembre 2026",
        "Risk assessment terminé — 30 Novembre 2026",
        "Audit interne ISO 27001 — 15 Décembre 2026",
        "PCA testé — 31 Décembre 2026"
      ]
    },
    {
      id: "phase-4",
      name: "Phase 4 — Certification ISO 27001 & Audit Externe",
      period: "Janvier — Juin 2027 (6 mois)",
      budget: "58 000 000 FCFA",
      score_cible: 95,
      deliverables: [
        "Audit blanc ISO 27001 — score ≥ 90%",
        "Certification ISO 27001:2022 obtenue",
        "Audit externe GAFI 40 Recommandations — score ≥ 95",
        "Rapport annuel Conformité & Sécurité publié",
        "Certification LCB/FT externe — Big Four",
        "Notation EcoVadis — Gouvernance & Éthique (Gold+)"
      ],
      evidence: [
        "Certificat ISO 27001:2022",
        "Rapport audit GAFI externe",
        "Rapport annuel Conformité & Sécurité",
        "Rapport LCB/FT externe certifié",
        "Notation EcoVadis Gold/Platinum"
      ],
      milestones: [
        "Audit blanc ISO 27001 — 31 Janvier 2027",
        "Audit certification ISO 27001 — 28 Février 2027",
        "Certificat ISO 27001 obtenu — 15 Mars 2027",
        "Audit GAFI externe — 31 Mars 2027",
        "Certification LCB/FT — 30 Avril 2027",
        "Notation EcoVadis — 30 Juin 2027"
      ]
    }
  ]
};

export const complianceSecurityStats = {
  kyc_cdd_procedures: 6,
  kyc_cdd_deployed: 2,
  kyc_cdd_partial: 3,
  kyc_cdd_planned: 1,
  lcbf_jurisdictions: 3,
  lcbf_risk_score: 62,
  cemac_procedures: 4,
  cemac_adapted: 0,
  cemac_in_progress: 2,
  alignment_items: 8,
  alignment_conforme: 3,
  alignment_partial: 4,
  alignment_non_conforme: 1,
  iso27001_docs: 12,
  iso27001_docs_adopted: 8,
  iso27001_docs_draft: 2,
  iso27001_docs_missing: 2,
  iso27001_risks: 8,
  iso27001_risks_treated: 8,
  iso27001_audit_score: 68,
  iso27001_nc_critiques: 1,
  iso27001_nc_majeures: 4,
  iso27001_nc_mineures: 2,
  certification_phases: 4,
  total_actions: 42,
  actions_completed: 12,
  actions_in_progress: 18,
  actions_planned: 12,
  budget_total: "226 800 000 FCFA",
  global_score: 52,
  target_score: 95,
  consortium: "PwC · Deloitte · EY · KPMG",
  audit_date: "19 Juin 2026",
  next_review: "19 Septembre 2026"
};

export const quarterlyMilestones = {
  quarters: [
    {
      id: "q3-2026",
      label: "Q3 2026 — Fondations Conformité",
      months: "Juillet — Septembre 2026",
      target_score: 75,
      milestones: [
        "6 procédures KYC/CDD déployées + auditées (31 Juillet)",
        "Cartographie risques LCB/FT 3 juridictions (31 Août)",
        "Filtrage 7 listes sanctions opérationnel (15 Août)",
        "Formation LCB/FT 100% personnel (31 Août)",
        "Alignement BCEAO/COBAC/OHADA documenté (30 Septembre)",
        "4 procédures CEMAC adaptées (30 Septembre)",
        "Registre BE multi-juridiction conforme (31 Août)",
        "Double circuit CENTIF+ANIF testé (30 Septembre)"
      ],
      budget: "86 100 000 FCFA",
      kpis: [
        { name: "KYC/CDD Déployé", target: "100% (6/6)", weight: 20 },
        { name: "Score LCB/FT Global", target: "75/100", weight: 20 },
        { name: "Procédures CEMAC", target: "4/4 adaptées", weight: 15 },
        { name: "Alignement Réglementaire", target: "≥ 80% conforme", weight: 15 },
        { name: "Personnel Formé LCB/FT", target: "100%", weight: 15 },
        { name: "Filtrage Sanctions", target: "7/7 listes", weight: 15 }
      ]
    },
    {
      id: "q4-2026",
      label: "Q4 2026 — SMSI & Risk Assessment ISO 27001",
      months: "Octobre — Décembre 2026",
      target_score: 85,
      milestones: [
        "12 documents SMSI finalisés (15 Novembre)",
        "Risk assessment ISO 27001 terminé (30 Novembre)",
        "Audit interne ISO 27001 ≥ 85/100 (15 Décembre)",
        "PCA testé et validé — RTO < 4h (31 Décembre)",
        "Politique sécurité fournisseurs finalisée (31 Octobre)",
        "Procédure SDLC sécurisé (DevSecOps) déployée (30 Novembre)",
        "Audit LCB/FT externe terminé (15 Décembre)",
        "0 non-conformité critique ISO 27001"
      ],
      budget: "82 700 000 FCFA",
      kpis: [
        { name: "Documentation SMSI", target: "12/12 documents", weight: 20 },
        { name: "Score Audit Interne ISO", target: "≥ 85/100", weight: 25 },
        { name: "Risk Assessment", target: "8/8 risques traités", weight: 15 },
        { name: "PCA Testé", target: "RTO < 4h", weight: 15 },
        { name: "SDLC Sécurisé", target: "Déployé", weight: 10 },
        { name: "NC ISO 27001 Critiques", target: "0", weight: 15 }
      ]
    },
    {
      id: "q1-2027",
      label: "Q1 2027 — Certification ISO 27001",
      months: "Janvier — Mars 2027",
      target_score: 92,
      milestones: [
        "Audit blanc ISO 27001 ≥ 90% (31 Janvier)",
        "Audit certification ISO 27001:2022 (28 Février)",
        "Certificat ISO 27001 obtenu (15 Mars)",
        "Audit GAFI 40 Recommandations externe (31 Mars)",
        "Rapport annuel Conformité & Sécurité publié (31 Mars)",
        "Certification LCB/FT externe Big Four (31 Mars)"
      ],
      budget: "38 000 000 FCFA",
      kpis: [
        { name: "Audit Blanc ISO 27001", target: "Score ≥ 90%", weight: 25 },
        { name: "Certification ISO 27001", target: "OBTENUE", weight: 30 },
        { name: "Audit GAFI Externe", target: "Score ≥ 90/100", weight: 20 },
        { name: "Certification LCB/FT", target: "OBTENUE", weight: 15 },
        { name: "Rapport Annuel", target: "Publié", weight: 10 }
      ]
    },
    {
      id: "q2-2027",
      label: "Q2 2027 — Excellence & Maintien",
      months: "Avril — Juin 2027",
      target_score: 95,
      milestones: [
        "Surveillance continue des transactions IA — 100% (30 Avril)",
        "Audit de suivi ISO 27001 — 0 NC (30 Mai)",
        "Notation EcoVadis Gold/Platinum (30 Juin)",
        "Benchmark conformité vs Big Four — Top 3 (30 Juin)",
        "Publication Rapport Développement Durable GRI/ISSB (30 Juin)",
        "Plan amélioration continue ISO 27001 — Cycle 2",
        "Formation continue LCB/FT — 2ème session annuelle"
      ],
      budget: "20 000 000 FCFA",
      kpis: [
        { name: "Score Global Conformité", target: "95/100", weight: 30 },
        { name: "Notation EcoVadis", target: "Gold ou Platinum", weight: 20 },
        { name: "Audit Suivi ISO 27001", target: "0 NC", weight: 20 },
        { name: "Surveillance IA Transaction", target: "100% opérationnelle", weight: 15 },
        { name: "Benchmark Big Four", target: "Top 3 Afrique", weight: 15 }
      ]
    }
  ],
  summary_trajectory: [
    { kpi: "Score Global Conformité & Sécurité", initial: 52, q3: 75, q4: 85, q1: 92, q2: 95, cible: 95 },
    { kpi: "Procédures KYC/CDD", initial: 30, q3: 100, q4: 100, q1: 100, q2: 100, cible: 100 },
    { kpi: "Score LCB/FT GAFI", initial: 62, q3: 75, q4: 85, q1: 93, q2: 95, cible: 95 },
    { kpi: "Alignement Réglementaire (BCEAO/COBAC/OHADA)", initial: 48, q3: 82, q4: 90, q1: 95, q2: 98, cible: 98 },
    { kpi: "Documentation SMSI ISO 27001", initial: 60, q3: 75, q4: 100, q1: 100, q2: 100, cible: 100 },
    { kpi: "Certification ISO 27001:2022", initial: 0, q3: 15, q4: 55, q1: 100, q2: 100, cible: 100 },
    { kpi: "Risk Assessment ISO 27001 (risques résiduels)", initial: 4, q3: 3, q4: 2.5, q1: 2, q2: 2, cible: 2 }
  ]
};





