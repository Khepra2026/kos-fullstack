// KOS Governance Formalization Command™ — Mock Data
// Consortium PwC · Deloitte · EY · KPMG
// Mandat : Nomination RSSI & LCB/FT, Constitution Comités d'Audit, Adoption Chartes, Plan Correctif KPIs Trimestriels

export const nominatedOfficers = [
  {
    id: "rssi-001",
    role: "RSSI — Responsable Sécurité des Systèmes d'Information",
    acronym: "RSSI",
    nominee: "Commandant Amara Diop",
    profile: "Ancien Directeur Cybersécurité — Banque Centrale (BCEAO). 18 ans d'expérience en sécurité des SI bancaires. Certifié CISSP, CISM, ISO 27001 Lead Auditor, CEH Master. Ancien Chef du CERT-UEMOA.",
    appointment_date: "2026-07-01",
    effective_date: "2026-07-15",
    mandate_duration: "3 ans renouvelable",
    reporting_line: "Directement au Managing Partner (DG)",
    scope: [
      "Définition et mise en œuvre de la politique de sécurité des SI (PSSI)",
      "Supervision du SOC 24/7 — 8 analystes",
      "Pilotage de la certification ISO/IEC 27001:2022 (cible Décembre 2026)",
      "Gestion des incidents de sécurité et plan de réponse (CERT-KHEPRA)",
      "Conformité NIST CSF 2.0, OWASP, RGPD, EU AI Act",
      "Formation et sensibilisation sécurité — 100% du personnel",
      "Due diligence sécurité des partenaires et fournisseurs SaaS",
      "Rapport trimestriel au Comité d'Audit et au COMEX"
    ],
    key_qualifications: ["CISSP", "CISM", "ISO 27001 LA", "CEH Master", "CCISO"],
    budget_annual: "82 500 000 FCFA",
    team_size: 9,
    kpis: [
      { name: "Score ISO 27001", current: 78, target: 100, deadline: "2026-12-31" },
      { name: "MTTD (Détection incidents)", current: "18 min", target: "5 min", deadline: "2026-09-30" },
      { name: "MTTR (Résolution incidents)", current: "45 min", target: "15 min", deadline: "2026-09-30" },
      { name: "Formation sécurité personnel", current: 60, target: 100, deadline: "2026-08-31" }
    ],
    priorite: "CRITIQUE — P0",
    status: "Nomination validée par le COMEX le 24 Juin 2026"
  },
  {
    id: "lcbf-001",
    role: "Responsable LCB/FT — Lutte Contre le Blanchiment et le Financement du Terrorisme",
    acronym: "RCLCB/FT",
    nominee: "Maître Fatoumata Diallo",
    profile: "Avocate au Barreau de Dakar, Docteure en Droit Bancaire (Université Paris II Panthéon-Assas). 15 ans d'expérience en conformité LCB/FT — ancienne Responsable Conformité Groupe Ecobank UEMOA. Certifiée CAMS, CGSS, ICA Diploma in AML. Membre du Groupe d'Experts GAFI/GIABA.",
    appointment_date: "2026-07-01",
    effective_date: "2026-07-15",
    mandate_duration: "3 ans renouvelable",
    reporting_line: "Directement au Managing Partner (DG) — Double rattachement fonctionnel au Comité Risques & Conformité",
    scope: [
      "Définition et mise en œuvre du dispositif LCB/FT — Politique Groupe",
      "Classification des risques LCB/FT (approche par les risques — GAFI Recommandation 1)",
      "Procédures KYC/CDD/EDD — clients, bénéficiaires effectifs, PPE",
      "Déclarations de soupçons — CENTIF (UEMOA) et ANIF (CEMAC)",
      "Formation obligatoire LCB/FT — 100% du personnel (initial + continu)",
      "Audit LCB/FT externe annuel (cabinet Big Four indépendant)",
      "Veille réglementaire — GAFI, GIABA, GABAC, BCEAO, COBAC",
      "Rapport trimestriel au Comité Risques & Conformité et au COMEX"
    ],
    key_qualifications: ["CAMS", "CGSS", "ICA Diploma AML", "Doctorat Droit Bancaire", "Barreau de Dakar"],
    budget_annual: "68 400 000 FCFA",
    team_size: 7,
    kpis: [
      { name: "Conformité KYC/CDD", current: 72, target: 100, deadline: "2026-09-30" },
      { name: "Délai déclaration soupçon", current: "72h", target: "24h", deadline: "2026-08-31" },
      { name: "Formation LCB/FT personnel", current: 55, target: 100, deadline: "2026-08-31" },
      { name: "Score conformité GAFI", current: 68, target: 95, deadline: "2026-12-31" }
    ],
    priorite: "CRITIQUE — P0",
    status: "Nomination validée par le COMEX le 24 Juin 2026"
  }
];

export const auditCommittees = [
  {
    id: "com-audit",
    name: "Comité d'Audit",
    acronym: "CA",
    chairman: "Pr. Moussa Traoré — Administrateur Indépendant, Expert-Comptable Diplômé, Ancien Associé PwC Afrique",
    members: 4,
    composition: [
      { name: "Pr. Moussa Traoré", role: "Président — Administrateur Indépendant", expertise: "Audit, IFRS, ISA, COSO" },
      { name: "Dr. Célestine Koffi", role: "Membre — Associée Khepra Governance", expertise: "Contrôle Interne, BCEAO, COBAC" },
      { name: "Ibrahim Koné", role: "Membre — Directeur BU1 Régulation", expertise: "Audit prudentiel, Risk Management" },
      { name: "Commandant Amara Diop", role: "Membre Invité Permanent — RSSI", expertise: "Cybersécurité, ISO 27001, NIST" }
    ],
    charter_status: "Adoptée — 26/06/2026",
    charter_version: "v1.0",
    charter_reference: "CHT-CA-2026-001",
    frequency: "Trimestrielle (4 réunions/an) + sessions extraordinaires",
    next_meeting: "2026-09-15",
    responsibilities: [
      "Supervision de l'information financière — états financiers IFRS/OHADA",
      "Revue des contrôles internes — COSO 2013, ISA 315",
      "Supervision de l'audit externe — sélection, indépendance, honoraires",
      "Examen des conventions réglementées — Article 438 AUSCGIE",
      "Revue de la cartographie des risques — ISO 31000",
      "Supervision du dispositif de contrôle interne — COSO 2013",
      "Examen du rapport RSE/ESG — GRI, ISSB",
      "Suivi des recommandations des auditeurs externes et du régulateur"
    ]
  },
  {
    id: "com-esg",
    name: "Comité ESG & Durabilité",
    acronym: "CESG",
    chairman: "Dr. Aminata Bah — Experte ESG, Ancienne Directrice RSE Groupe Sonatel, PhD Développement Durable (Sciences Po)",
    members: 5,
    composition: [
      { name: "Dr. Aminata Bah", role: "Présidente — Experte ESG Indépendante", expertise: "ESG, GRI, ISSB, Taxonomie Verte" },
      { name: "Mamadou Bah", role: "Membre — Associé Khepra ESG", expertise: "Finance Durable, ISSB, CSRD" },
      { name: "Fatoumata Diallo", role: "Membre — RCLCB/FT", expertise: "Gouvernance, Conformité, Éthique" },
      { name: "Dr. Pascal Zongo", role: "Membre — Directeur Recherche", expertise: "Économie du Développement, ODD" },
      { name: "Nafissatou Sow", role: "Membre — Analyste ESG Senior", expertise: "Bilan Carbone, Scope 1/2/3, GRI" }
    ],
    charter_status: "Adoptée — 26/06/2026",
    charter_version: "v1.0",
    charter_reference: "CHT-CESG-2026-001",
    frequency: "Trimestrielle (4 réunions/an)",
    next_meeting: "2026-10-01",
    responsibilities: [
      "Définition de la stratégie ESG et durabilité Khepra 2026-2030",
      "Supervision du bilan carbone — Scope 1, 2, 3 (GHG Protocol)",
      "Pilotage du reporting ESG — GRI 2021, ISSB IFRS S1/S2",
      "Alignement Taxonomie Verte UEMOA et Principes de l'Équateur",
      "Programme Diversité & Inclusion — indicateurs, objectifs",
      "Stratégie achats responsables — charte fournisseurs ESG",
      "Revue du Rapport de Durabilité annuel (publication T1 2027)",
      "Benchmark ESG — positionnement vs Big Four et pairs africains"
    ]
  },
  {
    id: "com-rc",
    name: "Comité Risques & Conformité",
    acronym: "CRC",
    chairman: "Dr. Amadou Sow — Ancien Directeur de la Supervision Bancaire (BCEAO), PhD Monnaie-Finance-Banque, Certifié CAMS, FRM",
    members: 5,
    composition: [
      { name: "Dr. Amadou Sow", role: "Président — Administrateur Indépendant", expertise: "Supervision Bancaire, GAFI, Bâle III" },
      { name: "Fatoumata Diallo", role: "Vice-Présidente — RCLCB/FT", expertise: "LCB/FT, KYC, GAFI, GIABA, GABAC" },
      { name: "Commandant Amara Diop", role: "Membre — RSSI", expertise: "Cyber-risques, ISO 27001, Résilience" },
      { name: "Cdt. Amara Diop", role: "Membre — RSSI", expertise: "Sécurité SI, ISO 22301, PCA/PRA" },
      { name: "Ibrahim Koné", role: "Membre — Directeur BU1 Régulation", expertise: "Risques prudentiels, ICAAP/ILAAP" },
      { name: "Seydou Coulibaly", role: "Secrétaire — Forensic Analyst", expertise: "Investigation, Fraude, Forensic" }
    ],
    composition_effective: 5,
    charter_status: "Adoptée — 26/06/2026",
    charter_version: "v1.0",
    charter_reference: "CHT-CRC-2026-001",
    frequency: "Mensuelle (12 réunions/an) — Comité le plus actif",
    next_meeting: "2026-07-10",
    responsibilities: [
      "Cartographie globale des risques — ISO 31000, COSO ERM 2017",
      "Supervision du dispositif LCB/FT — GAFI 40 Recommandations",
      "Appétit au risque — définition, limites, seuils d'alerte",
      "Risques cyber — OWASP, NIST CSF 2.0, incidents",
      "Risques de non-conformité — BCEAO, COBAC, OHADA, RGPD, EU AI Act",
      "Risques opérationnels — PCA/PRA (ISO 22301), continuité d'activité",
      "Risques de réputation — media monitoring, crise",
      "Plan de remédiation — suivi trimestriel des gaps"
    ]
  },
  {
    id: "com-rem",
    name: "Comité de Rémunération & Nomination",
    acronym: "CRN",
    chairman: "Dr. Célestine Koffi — Associée Gérante Khepra Finance & Strategy, Ancienne Directrice Générale Banque Atlantique CI",
    members: 4,
    composition: [
      { name: "Dr. Célestine Koffi", role: "Présidente — DG Khepra Experts", expertise: "Gouvernance, Stratégie, Leadership" },
      { name: "Pr. Moussa Traoré", role: "Membre — Président Comité d'Audit", expertise: "Rémunération, Évaluation" },
      { name: "Dr. Aminata Bah", role: "Membre — Présidente Comité ESG", expertise: "D&I, Équité, Talents" },
      { name: "Mamadou Bah", role: "Membre — Associé ESG", expertise: "Compensation, Benchmarking" }
    ],
    charter_status: "Adoptée — 26/06/2026",
    charter_version: "v1.0",
    charter_reference: "CHT-CRN-2026-001",
    frequency: "Semestrielle (2 réunions/an) + sessions extraordinaires",
    next_meeting: "2026-10-15",
    responsibilities: [
      "Politique de rémunération — DG, COMEX, Associés, Managers",
      "Évaluation annuelle des mandataires sociaux — 360°",
      "Plan de succession — DG, Directeurs BU, Fonctions clés (RSSI, RCLCB/FT)",
      "Nomination des administrateurs indépendants — profils, diversité",
      "Benchmark rémunération — Big Four, Banques, Cabinets Conseil",
      "Politique D&I — objectifs, indicateurs, rapport annuel",
      "Formation continue des administrateurs — plan annuel",
      "Conformité Circulaire BCEAO 01-2017 — Gouvernance SFD"
    ]
  }
];

export const formalCharters = [
  { id: "cht-001", title: "Charte du Comité d'Audit", reference: "CHT-CA-2026-001", committee: "Comité d'Audit", adoption_date: "2026-06-26", version: "v1.0", pages: 24, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["ISA 610", "COSO 2013", "AUSCGIE Art. 438", "BCEAO Circulaire 01-2017"] },
  { id: "cht-002", title: "Charte du Comité ESG & Durabilité", reference: "CHT-CESG-2026-001", committee: "Comité ESG & Durabilité", adoption_date: "2026-06-26", version: "v1.0", pages: 18, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["GRI 2021", "ISSB IFRS S1/S2", "Taxonomie Verte UEMOA"] },
  { id: "cht-003", title: "Charte du Comité Risques & Conformité", reference: "CHT-CRC-2026-001", committee: "Comité Risques & Conformité", adoption_date: "2026-06-26", version: "v1.0", pages: 22, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["ISO 31000", "COSO ERM 2017", "GAFI Rec. 1", "BCEAO Dispositif prudentiel"] },
  { id: "cht-004", title: "Charte du Comité de Rémunération & Nomination", reference: "CHT-CRN-2026-001", committee: "Comité de Rémunération & Nomination", adoption_date: "2026-06-26", version: "v1.0", pages: 16, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["AUSCGIE", "BCEAO Circulaire 01-2017", "OHADA Acte Uniforme Droit des Sociétés"] },
  { id: "cht-005", title: "Mandat du RSSI — Politique de Sécurité des SI", reference: "MND-RSSI-2026-001", committee: "RSSI", adoption_date: "2026-06-26", version: "v1.0", pages: 35, status: "Adopté", approved_by: "COMEX", regulatory_refs: ["ISO 27001:2022", "NIST CSF 2.0", "COBAC Directive Résilience 2027"] },
  { id: "cht-006", title: "Mandat du Responsable LCB/FT — Dispositif Groupe", reference: "MND-LCBFT-2026-001", committee: "RCLCB/FT", adoption_date: "2026-06-26", version: "v1.0", pages: 42, status: "Adopté", approved_by: "COMEX", regulatory_refs: ["GAFI 40 Recommandations", "BCEAO Instruction LBC/FT", "COBAC Règlement LBC/FT", "GIABA/GABAC"] },
  { id: "cht-007", title: "Code de Conduite & Éthique des Affaires", reference: "CCE-2026-001", committee: "Tous", adoption_date: "2026-06-26", version: "v2.0", pages: 28, status: "Adopté", approved_by: "Assemblée Générale", regulatory_refs: ["ISO 37001 (Anti-corruption)", "OHADA", "GAFI Rec. 33"] },
  { id: "cht-008", title: "Politique de Lancement d'Alerte (Whistleblowing)", reference: "PLA-2026-001", committee: "Tous", adoption_date: "2026-06-26", version: "v1.0", pages: 15, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["BCEAO Circulaire 01-2017 Art. 12", "COBAC", "Directive UE 2019/1937"] },
  { id: "cht-009", title: "Politique de Gestion des Conflits d'Intérêts", reference: "GCI-2026-001", committee: "Tous", adoption_date: "2026-06-27", version: "v1.0", pages: 12, status: "Adoptée", approved_by: "COMEX", regulatory_refs: ["AUSCGIE Art. 440-443", "BCEAO Circulaire 01-2017 Art. 8"] },
  { id: "cht-010", title: "Règlement Intérieur du Conseil d'Administration", reference: "RI-CA-2026-001", committee: "Conseil d'Administration", adoption_date: "2026-06-27", version: "v2.0", pages: 32, status: "Adopté", approved_by: "Assemblée Générale", regulatory_refs: ["AUSCGIE", "BCEAO Circulaire 01-2017", "COBAC"] }
];

export const correctivePlan = {
  global_score_initial: 28,
  global_score_cible: 95,
  budget_total: "150 900 000 FCFA",
  timeline: "Q3 2026 — Q2 2027 (12 mois)",
  roi_projete: "> 31× (CA additionnel ~4.7 Mds FCFA)",
  pillars: [
    {
      id: "pil-nominations",
      name: "Pilier 1 — Nominations Formelles",
      score_initial: 10,
      score_cible: 100,
      actions: [
        { id: "act-001", action: "Nomination formelle du RSSI — Lettre de mission, rattachement DG, budget", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "RSSI en poste effectif" },
        { id: "act-002", action: "Nomination formelle du Responsable LCB/FT — Lettre de mission, double rattachement DG + Comité RC", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "RCLCB/FT en poste effectif" },
        { id: "act-003", action: "Déclaration RSSI + RCLCB/FT auprès de la BCEAO/COBAC — Formulaire réglementaire", responsable: "RCLCB/FT", deadline: "2026-07-15", priorite: "P0 — Critique", budget: "0 FCFA", status: "En cours", kpi: "Déclaration transmise + accusé réception" },
        { id: "act-004", action: "Formation initiale RSSI — ISO 27001 Lead Implementer + NIST CSF", responsable: "RSSI", deadline: "2026-08-31", priorite: "P1 — Haute", budget: "4 800 000 FCFA", status: "Planifié", kpi: "Certification ISO 27001 LI obtenue" },
        { id: "act-005", action: "Formation initiale RCLCB/FT — GAFI 40 Recommandations + GIABA/GABAC", responsable: "RCLCB/FT", deadline: "2026-08-31", priorite: "P1 — Haute", budget: "3 200 000 FCFA", status: "Planifié", kpi: "Certification CAMS/GAFI obtenue" }
      ]
    },
    {
      id: "pil-comites",
      name: "Pilier 2 — Constitution des Comités d'Audit",
      score_initial: 5,
      score_cible: 95,
      actions: [
        { id: "act-006", action: "Constitution formelle du Comité d'Audit — 4 membres, PCA indépendant", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "Comité d'Audit opérationnel" },
        { id: "act-007", action: "Constitution formelle du Comité ESG & Durabilité — 5 membres, Présidente externe", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "Comité ESG opérationnel" },
        { id: "act-008", action: "Constitution formelle du Comité Risques & Conformité — 5 membres", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "Comité RC opérationnel" },
        { id: "act-009", action: "Constitution formelle du Comité Rémunération & Nomination — 4 membres", responsable: "Managing Partner (DG)", deadline: "2026-07-01", priorite: "P1 — Haute", budget: "0 FCFA", status: "Terminé", kpi: "Comité RN opérationnel" },
        { id: "act-010", action: "1ère réunion du Comité Risques & Conformité — Cartographie initiale", responsable: "Président CRC", deadline: "2026-07-10", priorite: "P0 — Critique", budget: "0 FCFA", status: "Planifié", kpi: "PV de réunion + cartographie risques" },
        { id: "act-011", action: "1ère réunion du Comité d'Audit — Plan d'audit 2026-2027", responsable: "Président CA", deadline: "2026-09-15", priorite: "P1 — Haute", budget: "0 FCFA", status: "Planifié", kpi: "Plan d'audit annuel approuvé" },
        { id: "act-012", action: "1ère réunion du Comité ESG — Feuille de route ISSB/GRI", responsable: "Présidente CESG", deadline: "2026-10-01", priorite: "P1 — Haute", budget: "0 FCFA", status: "Planifié", kpi: "Feuille de route ESG validée" }
      ]
    },
    {
      id: "pil-chartes",
      name: "Pilier 3 — Adoption des Chartes & Mandats",
      score_initial: 8,
      score_cible: 100,
      actions: [
        { id: "act-013", action: "Adoption des 4 chartes de comités — CA, CESG, CRC, CRN", responsable: "COMEX", deadline: "2026-06-26", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "4/4 chartes adoptées" },
        { id: "act-014", action: "Adoption des mandats RSSI + RCLCB/FT — Périmètre, KPIs, reporting", responsable: "COMEX", deadline: "2026-06-26", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "2/2 mandats adoptés" },
        { id: "act-015", action: "Adoption du Code de Conduite & Éthique v2.0 — Signature obligatoire", responsable: "DRH", deadline: "2026-07-31", priorite: "P1 — Haute", budget: "0 FCFA", status: "En cours", kpi: "100% signatures collectées" },
        { id: "act-016", action: "Adoption Politique Lancement d'Alerte — Canal sécurisé + Protection", responsable: "RCLCB/FT", deadline: "2026-07-15", priorite: "P1 — Haute", budget: "1 200 000 FCFA", status: "En cours", kpi: "Canal opérationnel + procédure" },
        { id: "act-017", action: "Adoption Politique Conflits d'Intérêts — Déclaration annuelle obligatoire", responsable: "DRH", deadline: "2026-07-31", priorite: "P1 — Haute", budget: "0 FCFA", status: "En cours", kpi: "100% déclarations collectées" },
        { id: "act-018", action: "Adoption Règlement Intérieur CA — Révisé v2.0", responsable: "Conseil d'Administration", deadline: "2026-06-27", priorite: "P0 — Critique", budget: "0 FCFA", status: "Terminé", kpi: "RI-CA approuvé AG" }
      ]
    },
    {
      id: "pil-iso",
      name: "Pilier 4 — Certification ISO/IEC 27001:2022",
      score_initial: 5,
      score_cible: 100,
      actions: [
        { id: "act-019", action: "Gap analysis ISO 27001 — 114 contrôles, 19 gaps identifiés", responsable: "RSSI", deadline: "2026-07-15", priorite: "P0 — Critique", budget: "18 500 000 FCFA", status: "En cours", kpi: "Rapport gap analysis livré" },
        { id: "act-020", action: "Résolution des 5 gaps critiques — Sécurité physique, SDLC, Fournisseurs, Formation, PCA/PRA", responsable: "RSSI", deadline: "2026-09-30", priorite: "P0 — Critique", budget: "17 200 000 FCFA", status: "Planifié", kpi: "5/5 gaps critiques résolus" },
        { id: "act-021", action: "Audit à blanc ISO 27001 — Pré-certification", responsable: "RSSI + Auditeur externe", deadline: "2026-10-31", priorite: "P0 — Critique", budget: "9 800 000 FCFA", status: "Planifié", kpi: "Score ≥ 90% à l'audit blanc" },
        { id: "act-022", action: "Audit de certification ISO 27001:2022", responsable: "Organisme certificateur accrédité", deadline: "2026-12-15", priorite: "P0 — Critique", budget: "12 500 000 FCFA", status: "Planifié", kpi: "Certificat ISO 27001 obtenu" }
      ]
    },
    {
      id: "pil-lcbf",
      name: "Pilier 5 — Conformité LCB/FT GAFI",
      score_initial: 12,
      score_cible: 98,
      actions: [
        { id: "act-023", action: "Audit externe LCB/FT — Gap analysis GAFI 40 Recommandations", responsable: "RCLCB/FT + Cabinet Big Four", deadline: "2026-08-31", priorite: "P0 — Critique", budget: "22 000 000 FCFA", status: "Planifié", kpi: "Rapport d'audit LCB/FT livré" },
        { id: "act-024", action: "Déploiement procédures KYC/CDD/EDD — Clients, Bénéficiaires Effectifs, PPE", responsable: "RCLCB/FT", deadline: "2026-09-30", priorite: "P0 — Critique", budget: "8 500 000 FCFA", status: "Planifié", kpi: "Procédures opérationnelles 100%" },
        { id: "act-025", action: "Formation LCB/FT — 100% du personnel (initial + continu annuel)", responsable: "RCLCB/FT", deadline: "2026-08-31", priorite: "P0 — Critique", budget: "5 200 000 FCFA", status: "En cours", kpi: "100% personnel formé" },
        { id: "act-026", action: "Mise en place outil de filtrage — Listes sanctions (ONU, OFAC, UE, GAFI)", responsable: "RSSI + RCLCB/FT", deadline: "2026-09-30", priorite: "P1 — Haute", budget: "12 300 000 FCFA", status: "Planifié", kpi: "Outil opérationnel + intégré KYC" },
        { id: "act-027", action: "Audit LCB/FT externe annuel — Certification conformité", responsable: "Comité Risques & Conformité", deadline: "2026-12-31", priorite: "P1 — Haute", budget: "18 000 000 FCFA", status: "Planifié", kpi: "Rapport annuel LCB/FT certifié" }
      ]
    },
    {
      id: "pil-kpi",
      name: "Pilier 6 — KPIs & Reporting Gouvernance",
      score_initial: 5,
      score_cible: 92,
      actions: [
        { id: "act-028", action: "Mise en place dashboard gouvernance — COMEX trimestriel", responsable: "RSSI", deadline: "2026-08-31", priorite: "P1 — Haute", budget: "3 500 000 FCFA", status: "Planifié", kpi: "Dashboard opérationnel" },
        { id: "act-029", action: "Rapport annuel Gouvernance — Publication T1 2027", responsable: "Président Comité d'Audit", deadline: "2027-03-31", priorite: "P2 — Moyenne", budget: "5 200 000 FCFA", status: "Planifié", kpi: "Rapport publié + téléchargements" },
        { id: "act-030", action: "Évaluation externe gouvernance — Mission Big Four", responsable: "Comité d'Audit", deadline: "2027-06-30", priorite: "P2 — Moyenne", budget: "35 000 000 FCFA", status: "Planifié", kpi: "Score ≥ 95/100" }
      ]
    }
  ]
};

export const quarterlyKPIs = {
  period_start: "2026-07-01",
  period_end: "2027-06-30",
  quarters: [
    {
      id: "q3-2026",
      label: "Q3 2026 — Fondations",
      months: "Juillet — Septembre 2026",
      target_score: 45,
      milestones: [
        "RSSI + RCLCB/FT en poste effectif (15 Juillet)",
        "4 comités d'audit constitués + 1ère réunion CRC (10 Juillet)",
        "10 chartes adoptées (26-27 Juin)",
        "Gap analysis ISO 27001 terminé (15 Juillet)",
        "Formation LCB/FT 100% personnel (31 Août)",
        "Déclaration BCEAO/COBAC transmise",
        "Audit externe LCB/FT lancé",
        "Politique Lancement d'Alerte opérationnelle"
      ],
      kpi_targets: [
        { name: "Nominations formelles", target: "2/2 (RSSI + RCLCB/FT)", weight: 15 },
        { name: "Comités constitués", target: "4/4 opérationnels", weight: 20 },
        { name: "Chartes adoptées", target: "10/10", weight: 15 },
        { name: "Gaps ISO 27001 critiques", target: "5 → 0 résolus", weight: 15 },
        { name: "Formation LCB/FT", target: "100%", weight: 10 },
        { name: "Score gouvernance BCEAO Circulaire 01-2017", target: "≥ 65/100", weight: 25 }
      ],
      budget: "62 200 000 FCFA"
    },
    {
      id: "q4-2026",
      label: "Q4 2026 — Structuration",
      months: "Octobre — Décembre 2026",
      target_score: 68,
      milestones: [
        "Audit blanc ISO 27001 réussi ≥ 90% (31 Octobre)",
        "Audit LCB/FT externe terminé + rapport",
        "Procédures KYC/CDD/EDD 100% déployées",
        "Outil filtrage sanctions opérationnel",
        "1ère réunion Comité ESG — Feuille de route ISSB (1 Octobre)",
        "Dashboard gouvernance COMEX opérationnel",
        "Certification ISO 27001:2022 obtenue (15 Décembre)",
        "1ère réunion Comité Rémunération & Nomination (15 Octobre)"
      ],
      kpi_targets: [
        { name: "Certification ISO 27001", target: "OUI — Certificat obtenu", weight: 20 },
        { name: "Audit LCB/FT externe", target: "Score ≥ 85/100", weight: 20 },
        { name: "Procédures KYC/CDD", target: "100% déployées", weight: 10 },
        { name: "Dashboard COMEX", target: "Opérationnel", weight: 10 },
        { name: "Score gouvernance BCEAO Circulaire 01-2017", target: "≥ 80/100", weight: 25 },
        { name: "Rapport trimestriel CRC", target: "3/3 livrés", weight: 15 }
      ],
      budget: "48 000 000 FCFA"
    },
    {
      id: "q1-2027",
      label: "Q1 2027 — Consolidation",
      months: "Janvier — Mars 2027",
      target_score: 82,
      milestones: [
        "Rapport annuel Gouvernance publié (31 Mars)",
        "2ème cycle de réunions des 4 comités — régularité confirmée",
        "Audit de suivi ISO 27001 — 0 non-conformité",
        "Formation continue LCB/FT — 2ème session annuelle",
        "Code de Conduite — Audit de conformité interne",
        "Rapport annuel LCB/FT certifié",
        "Évaluation 360° mandataires sociaux — Comité RN"
      ],
      kpi_targets: [
        { name: "Score gouvernance BCEAO Circulaire 01-2017", target: "≥ 90/100", weight: 30 },
        { name: "Taux présence comités", target: "≥ 90%", weight: 10 },
        { name: "Rapport Gouvernance publié", target: "OUI", weight: 15 },
        { name: "ISO 27001 suivi", target: "0 NC", weight: 15 },
        { name: "Formation continue LCB/FT", target: "100%", weight: 10 },
        { name: "Déclarations conflits intérêts", target: "100%", weight: 20 }
      ],
      budget: "25 800 000 FCFA"
    },
    {
      id: "q2-2027",
      label: "Q2 2027 — Excellence",
      months: "Avril — Juin 2027",
      target_score: 95,
      milestones: [
        "Évaluation externe gouvernance — Mission Big Four (score ≥ 95/100)",
        "Benchmark gouvernance vs Deloitte/PwC/EY/KPMG",
        "Revue annuelle des 10 chartes — Mise à jour v2.0",
        "Plan de succession — DG, Directeurs BU, RSSI, RCLCB/FT",
        "Publication Rapport de Durabilité 2026 — GRI/ISSB",
        "Notation EcoVadis — Gouvernance & Éthique",
        "Programme LCB/FT Groupe — Extension filiales"
      ],
      kpi_targets: [
        { name: "Score gouvernance BCEAO Circulaire 01-2017", target: "≥ 95/100", weight: 30 },
        { name: "Évaluation Big Four externe", target: "Score ≥ 95/100", weight: 20 },
        { name: "Notation EcoVadis", target: "Gold ou Platinum", weight: 15 },
        { name: "Plan de succession", target: "Documenté + approuvé CA", weight: 15 },
        { name: "Rapport Durabilité", target: "Publié GRI/ISSB", weight: 10 },
        { name: "Benchmark Big Four", target: "Top 3 Afrique Francophone", weight: 10 }
      ],
      budget: "14 900 000 FCFA"
    }
  ],
  summary_kpis: [
    { name: "Score Global Gouvernance", initial: 28, q3: 45, q4: 68, q1: 82, q2: 95, cible: 95 },
    { name: "Nominations Clés (RSSI + RCLCB/FT)", initial: 0, q3: 2, q4: 2, q1: 2, q2: 2, cible: 2 },
    { name: "Comités d'Audit Constitués", initial: 0, q3: 4, q4: 4, q1: 4, q2: 4, cible: 4 },
    { name: "Chartes & Mandats Adoptés", initial: 0, q3: 10, q4: 10, q1: 10, q2: 10, cible: 10 },
    { name: "Certification ISO 27001", initial: 0, q3: 5, q4: 95, q1: 100, q2: 100, cible: 100 },
    { name: "Conformité LCB/FT GAFI", initial: 12, q3: 35, q4: 65, q1: 85, q2: 98, cible: 98 },
    { name: "Score BCEAO Circulaire 01-2017", initial: 15, q3: 65, q4: 80, q1: 90, q2: 95, cible: 95 }
  ]
};

export const gouvernanceStats = {
  total_charters: 10,
  charters_adopted: 10,
  total_committees: 4,
  committees_constituted: 4,
  total_nominations: 2,
  nominations_completed: 2,
  total_actions: 30,
  actions_completed: 10,
  actions_in_progress: 5,
  actions_planned: 15,
  budget_annual: "150 900 000 FCFA",
  budget_spent: "0 FCFA (démarrage Q3 2026)",
  critical_gaps_resolved: "6/6 P0",
  global_governance_score: 28,
  target_governance_score: 95,
  certification_target: "AAAA Big Four Supreme — Gouvernance",
  consortium: "PwC · Deloitte · EY · KPMG",
  audit_date: "19 Juin 2026",
  next_audit: "19 Septembre 2026 (revue trimestrielle Q3)"
};

export const quarterlyCommitteeCalendar = [
  { month: "Juillet 2026", meetings: [{ committee: "CRC", date: "10/07" }] },
  { month: "Août 2026", meetings: [] },
  { month: "Septembre 2026", meetings: [{ committee: "CA", date: "15/09" }] },
  { month: "Octobre 2026", meetings: [{ committee: "CESG", date: "01/10" }, { committee: "CRN", date: "15/10" }, { committee: "CRC", date: "10/10" }] },
  { month: "Novembre 2026", meetings: [] },
  { month: "Décembre 2026", meetings: [{ committee: "CA", date: "15/12" }] },
  { month: "Janvier 2027", meetings: [{ committee: "CRC", date: "10/01" }] },
  { month: "Février 2027", meetings: [] },
  { month: "Mars 2027", meetings: [{ committee: "CA", date: "15/03" }] },
  { month: "Avril 2027", meetings: [{ committee: "CESG", date: "01/04" }, { committee: "CRC", date: "10/04" }, { committee: "CRN", date: "15/04" }] },
  { month: "Mai 2027", meetings: [] },
  { month: "Juin 2027", meetings: [{ committee: "CA", date: "15/06" }, { committee: "CRC", date: "10/06" }] }
];





