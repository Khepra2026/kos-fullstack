export const agrementOSData = {
  version: "1.0",
  produit: "KHEPRA Agrément OS",
  baseline: "Industrialisation de KHEPRA LICENSE™ au standard Big Four — Pilotage agrément IMF/EMF BCEAO-COBAC J0→J270",
  methodeSource: "KHEPRA LICENSE™ 4 phases J0-J270",
  cible: "Promoteurs EMF UEMOA/CEMAC — Engagement Niveau 2 « Accompagnement structuré » avec option Niveau 3 « Opinion signée »",
  dateLivraison: "2026-07-03",

  projetActif: {
    id: "CM-024",
    client: "EMF Espoir CM",
    categorie: "Catégorie 2",
    pays: "Cameroun",
    regulateur: "COBAC",
    jourActuel: 42,
    phaseActive: "structuration",
    avancement: 68,
    risque: "Moyen",
    dateDebut: "2026-05-22",
    echeanceSoumission: "2026-09-18",
    responsable: "J. Mvondo",
    coResponsable: "Legal KHEPRA",
    alertesIA: [
      {
        id: "AL-001",
        type: "blocker",
        module: "file-builder",
        message: "Statuts v0.3 — Absence clause préemption Art. 765 AUSCGIE",
        article: "Art. 765 AUSCGIE",
        criticite: "Bloquant",
        correction: "Ajouter clause préemption avec délai 30j et prix déterminable",
        dateDetection: "2026-07-01",
        lu: false,
      },
      {
        id: "AL-002",
        type: "major",
        module: "file-builder",
        message: "Business Plan — BFR sous-estimé de 40% vs benchmark COBAC",
        article: "Circ COBAC R-2016/01",
        criticite: "Majeur",
        correction: "Recalculer BFR avec rotation créances 90j et dettes 60j",
        dateDetection: "2026-07-02",
        lu: false,
      },
      {
        id: "AL-003",
        type: "major",
        module: "maturity-scan",
        message: "CV CCO — Absence certification AML/CFT obligatoire",
        article: "Règlement COBAC R-2016/01 Art. 17",
        criticite: "Majeur",
        correction: "Fournir attestation formation AML/CFT agréée COBAC",
        dateDetection: "2026-06-28",
        lu: true,
      },
    ],
  },

  modules: [
    {
      id: "maturity-scan",
      numero: 1,
      nom: "Maturity Scan",
      phaseKhepra: "J0-J15 — Diagnostic",
      icone: "ri-radar-line",
      couleur: "primary",
      progression: 100,
      statut: "complete",
      description: "Questionnaire 50 pts BCEAO/COBAC + IA scan documents vs checklist DD™ + Scoring maturité 0-100",
      livrable: "Rapport diagnostic PDF + Gap list + Plan d'action priorisé",
      fonctionnalites: [
        { nom: "Questionnaire 50 points", done: true, detail: "50 questions alignées Circ 03-2017 / Règlement COBAC R-2016/01" },
        { nom: "IA Scan Documents", done: true, detail: "10 docs clés DD™ uploadés et analysés automatiquement" },
        { nom: "Scoring Maturité", done: true, detail: "Score 62/100 — Écarts identifiés : gouvernance (3), LBC/FT (5), capital (2)" },
        { nom: "Gap List priorisée", done: true, detail: "12 écarts classés par criticité et impact délai soumission" },
        { nom: "Rapport Diagnostic PDF", done: true, detail: "Généré le 2026-06-05, 47 pages, signé Director" },
      ],
      scores: [
        { axe: "Gouvernance", score: 55, max: 100, couleur: "bg-amber-500" },
        { axe: "Capital & Fonds propres", score: 78, max: 100, couleur: "bg-primary-500" },
        { axe: "LBC/FT", score: 42, max: 100, couleur: "bg-red-500" },
        { axe: "Business Plan", score: 65, max: 100, couleur: "bg-amber-500" },
        { axe: "Organisation", score: 70, max: 100, couleur: "bg-primary-500" },
      ],
      docsUploades: [
        { nom: "Statuts notariés", statut: "ok", date: "2026-06-01" },
        { nom: "CV Équipe dirigeante", statut: "ok", date: "2026-06-01" },
        { nom: "Business Plan 5 ans", statut: "warning", date: "2026-06-03", note: "BFR à revoir" },
        { nom: "Politique LBC/FT", statut: "error", date: "2026-06-05", note: "Non alignée GAFI 2024" },
        { nom: "Organigramme", statut: "ok", date: "2026-06-02" },
        { nom: "Casier judiciaire dirigeants", statut: "ok", date: "2026-06-01" },
        { nom: "Preuve capital libéré", statut: "ok", date: "2026-06-01" },
        { nom: "Manuel procédures", statut: "warning", date: "2026-06-04", note: "Incomplet" },
        { nom: "Contrat core banking", statut: "pending", date: null, note: "En attente" },
        { nom: "Police assurance RC", statut: "ok", date: "2026-06-02" },
      ],
    },
    {
      id: "file-builder",
      numero: 2,
      nom: "File Builder",
      phaseKhepra: "J15-J75 — Structuration",
      icone: "ri-file-text-line",
      couleur: "accent",
      progression: 68,
      statut: "in_progress",
      description: "Générateur statuts AUSCGIE + Business Plan 5 ans BFR modélisé + Core banking COBAC checker",
      livrable: "Dossier agrément v1 + Politiques LBC-FT + Organigramme validé",
      fonctionnalites: [
        { nom: "Statuts AUSCGIE", done: false, detail: "v0.3 — Manque clause préemption Art. 765. Prochaine version J+45" },
        { nom: "Business Plan 5 ans", done: false, detail: "En cours — Modélisation BFR + stress test NPL 5%" },
        { nom: "Politique LBC/FT", done: true, detail: "Validée — Alignée GAFI 2024 + Règlement COBAC" },
        { nom: "Organigramme validé", done: true, detail: "Validé par le Board le 2026-06-20" },
        { nom: "Politique gouvernance", done: true, detail: "Charte CA + Comités spécialisés conformes Circ 01-2017" },
        { nom: "Manuel procédures", done: false, detail: "60% complété — Manque procédure crédit et recouvrement" },
        { nom: "Core Banking Check", done: false, detail: "En attente contrat éditeur — prévu J+55" },
      ],
      erreursAuscgie: [
        { code: "ERR-A01", description: "Absence clause transfert actions Art. 765 AUSCGIE", article: "Art. 765 AUSCGIE", criticite: "Bloquant", statut: "ouvert" },
        { code: "ERR-A02", description: "Composition CA non conforme — min 3 membres exigé", article: "Art. 416 AUSCGIE", criticite: "Bloquant", statut: "corrige" },
        { code: "ERR-A03", description: "Préemption non prévue dans les statuts", article: "Art. 765 AUSCGIE", criticite: "Bloquant", statut: "ouvert" },
        { code: "ERR-A04", description: "Objet social imprécis — ne couvre pas activités EMF", article: "Art. 121 AUSCGIE", criticite: "Majeur", statut: "corrige" },
        { code: "ERR-A05", description: "Capital social minimum non justifié pour Cat 2", article: "Règlement COBAC", criticite: "Bloquant", statut: "ouvert" },
        { code: "ERR-A06", description: "Absence clause exclusion garantie financière", article: "Art. 776 AUSCGIE", criticite: "Majeur", statut: "corrige" },
        { code: "ERR-A07", description: "Forme sociale inadaptée — SA exigée pour Cat 2", article: "Art. 828 AUSCGIE", criticite: "Bloquant", statut: "ouvert" },
        { code: "ERR-A08", description: "Absence modalités convocation AG", article: "Art. 546 AUSCGIE", criticite: "Mineur", statut: "corrige" },
      ],
      bpFinance: {
        capitalInitial: 150000000,
        devise: "FCFA",
        wacc: { tauxSansRisque: "5.5%", primePays: "7%", primeSecteur: "3%", total: "15.5%" },
        projections: [
          { annee: "A1", pnb: 45000000, charges: 62000000, resultat: -17000000, bfr: 22000000 },
          { annee: "A2", pnb: 98000000, charges: 78000000, resultat: 20000000, bfr: 31000000 },
          { annee: "A3", pnb: 165000000, charges: 102000000, resultat: 63000000, bfr: 45000000 },
          { annee: "A4", pnb: 240000000, charges: 135000000, resultat: 105000000, bfr: 62000000 },
          { annee: "A5", pnb: 340000000, charges: 178000000, resultat: 162000000, bfr: 85000000 },
        ],
        stressTest: { scenario: "NPL 5%", impactPnb: "-12%", impactResultat: "-28%", viabilite: "Maintenue" },
      },
    },
    {
      id: "regulator-hub",
      numero: 3,
      nom: "Regulator Hub",
      phaseKhepra: "J75-J120 — Soumission",
      icone: "ri-building-2-line",
      couleur: "secondary",
      progression: 0,
      statut: "pending",
      description: "Data room BCEAO/COBAC ISO 27001 + Simulateur entretiens IA + Tracker demandes clarification",
      livrable: "Dossier soumis + Q&A Pack + Lettre engagement",
      fonctionnalites: [
        { nom: "Data Room sécurisée", done: false, detail: "ISO 27001 — Chiffrement AES-256 + double authentification" },
        { nom: "Simulateur entretiens", done: false, detail: "20 questions types régulateur avec IA" },
        { nom: "Tracker clarifications", done: false, detail: "Suivi temps réel des demandes COBAC" },
        { nom: "Q&A Pack", done: false, detail: "Réponses pré-rédigées aux 20 questions les plus fréquentes" },
        { nom: "Lettre engagement", done: false, detail: "Template avec annexes ISAE 3000" },
      ],
      questionsSimulateur: [
        { id: "Q01", question: "Comment avez-vous déterminé le niveau de capital social ?", piege: "Sous-estimation du BFR", reponseAttendue: "Capital couvre BFR A1 + A2 + coussin 30%", docPreuve: "BP 5 ans + Note calcul BFR" },
        { id: "Q02", question: "Quel core banking system allez-vous utiliser ?", piege: "IT non prudentiel", reponseAttendue: "Core banking certifié COBAC + plan PCA", docPreuve: "Contrat éditeur + specs techniques" },
        { id: "Q03", question: "Qui est votre Compliance Officer AML/CFT ?", piege: "CCO sans certification", reponseAttendue: "CCO certifié + expérience 5 ans bancaire", docPreuve: "CV certifié + attestation formation" },
        { id: "Q04", question: "Comment gérez-vous le risque de concentration du portefeuille ?", piege: "Absence politique crédit", reponseAttendue: "Limite 25% fonds propres par contrepartie", docPreuve: "Politique crédit + manuel procédures" },
        { id: "Q05", question: "Quel est votre plan de continuité d'activité ?", piege: "PCA inexistant", reponseAttendue: "PCA documenté + test annuel", docPreuve: "Plan PCA + rapport test" },
      ],
    },
    {
      id: "opening-os",
      numero: 4,
      nom: "Opening OS",
      phaseKhepra: "J120-J270 — Post-licensing",
      icone: "ri-rocket-line",
      couleur: "secondary",
      progression: 0,
      statut: "pending",
      description: "Plan recrutement CCO AML/CFT + Reporting prudentiel COBAC auto + Checklist ouverture 30 pts",
      livrable: "Pack Ouverture + Formation équipe + Manuel procédures complet",
      fonctionnalites: [
        { nom: "Plan recrutement", done: false, detail: "CCO, Risk Manager, Auditeur interne — fiches de poste COBAC" },
        { nom: "Reporting prudentiel", done: false, detail: "DEC, SURFI, LCB/FT — génération automatique" },
        { nom: "Checklist ouverture", done: false, detail: "30 points : agencement, sécurité, IT, signalétique COBAC" },
        { nom: "Formation équipe", done: false, detail: "Modules e-learning : déontologie, LBC/FT, procédures internes" },
        { nom: "Manuel complet", done: false, detail: "Toutes procédures : crédit, recouvrement, contrôle interne, conformité" },
      ],
      checklistOuverture: [
        { point: 1, item: "Agrément affiché en agence", obligatoire: true },
        { point: 2, item: "Coffre-fort certifié", obligatoire: true },
        { point: 3, item: "Système informatique testé", obligatoire: true },
        { point: 4, item: "Personnel formé LBC/FT", obligatoire: true },
        { point: 5, item: "Manuel procédures disponible", obligatoire: true },
        { point: 6, item: "Assurance responsabilité civile", obligatoire: true },
      ],
    },
    {
      id: "khepra-architect",
      numero: 5,
      nom: "KHEPRA Architect",
      phaseKhepra: "Transversal — Knowledge Upgrade",
      icone: "ri-brain-line",
      couleur: "primary",
      progression: 100,
      statut: "complete",
      description: "IA Stratège Khepra Experts — 4 modes : AUDIT (analyse contenu), UPGRADE (fiches expert), ARCHITECTURE (arborescence), RESSOURCE (livrables client-ready)",
      livrable: "Assets intellectuels monétisables — Fiches Expert, Programmes, Lead Magnets",
      fonctionnalites: [
        { nom: "MODE AUDIT", done: true, detail: "Analyse contenu brut — Lacunes, Redondances, Opportunités, Niveau de preuve" },
        { nom: "MODE UPGRADE", done: true, detail: "Transformation en Fiche Expert Khepra 7 sections standard Big Four" },
        { nom: "MODE ARCHITECTURE", done: true, detail: "Arborescence complète — Piliers → Modules → Assets (Vidéo + PDF + Quiz)" },
        { nom: "MODE RESSOURCE", done: true, detail: "Livrables client-ready — SOP, Playbook, Dashboard, Script, Email Séquence" },
        { nom: "Règles d'écriture KHEPRA", done: true, detail: "6 commandements : phrases 20 mots, mécanisme avant opinion, exemples UEMOA/CEMAC" },
      ],
    },
  ],

  gantt: [
    { phase: "Maturity Scan", debut: "J0", fin: "J15", progression: 100, couleur: "bg-primary-500" },
    { phase: "File Builder", debut: "J15", fin: "J75", progression: 68, couleur: "bg-accent-500" },
    { phase: "Regulator Hub", debut: "J75", fin: "J120", progression: 0, couleur: "bg-secondary-500" },
    { phase: "Opening OS", debut: "J120", fin: "J270", progression: 0, couleur: "bg-secondary-500" },
  ],

  promptsIA: [
    {
      id: "prompt-auscgie",
      titre: "IA Erreurs AUSCGIE",
      role: "Juriste OHADA Senior",
      description: "Analyse les statuts uploadés et détecte 8 erreurs bloquantes COBAC",
      prompt: `Rôle : Tu es Juriste OHADA Senior.
Tâche : Analyse les statuts uploadés. Détecte 8 erreurs bloquantes COBAC :
1. Absence clauses transfert actions Art. 765 AUSCGIE
2. Composition CA non conforme
3. Préemption non prévue
4. Objet social imprécis
5. Capital social minimum non justifié
6. Absence clause exclusion garantie financière
7. Forme sociale inadaptée
8. Absence modalités convocation AG
Output : Tableau | Erreur | Article AUSCGIE | Criticité | Correction suggérée |
Source : AUSCGIE Acte Uniforme 2014. Si erreur = rejet dossier 3-6 mois`,
    },
    {
      id: "prompt-simulateur",
      titre: "Simulateur Entretiens COBAC",
      role: "Directeur Agrément COBAC",
      description: "Pose 10 questions critiques au promoteur EMF Cat 2",
      prompt: `Rôle : Tu es Directeur Agrément COBAC.
Tâche : Pose 10 questions critiques au promoteur EMF Cat 2. Focus : BFR sous-estimé 40%, IT non prudentiel, CCO sans AML/CFT.
Format : Question | Piège réglementaire | Réponse attendue | Doc preuve à fournir.
Ton : Formel, technique. Durée : 45 min.`,
    },
    {
      id: "prompt-bp",
      titre: "BP 5 ans avec Prime Pays",
      role: "Modélisateur financier OHADA",
      description: "Génère BP 5 ans EMF avec BFR, WACC prime pays, stress test",
      prompt: `Rôle : Tu es Modélisateur financier OHADA.
Tâche : Génère BP 5 ans EMF 150M FCFA Cameroun.
Contraintes : 1. Modélise BFR. 2. WACC = Taux BCEAO + Prime pays 7% + Prime secteur 3%. 3. Stress test NPL 5%.
Output : Excel + Note hypothèses + Source FMI Global Financial Stability Report.`,
    },
  ],

  checklistBigFour: [
    { critere: "Tech", statut: true, preuve: "SaaS ISO 27001, data room chiffrée AES-256, IA search, API core banking — Go-Live J+90" },
    { critere: "Méthodo", statut: true, preuve: "4 phases J0-J270 KHEPRA LICENSE™, Module 1 Go-Live, >90% succès 1ère soumission" },
    { critere: "Gouvernance", statut: true, preuve: "Comité Technique OHADA trimestriel créé — RACI signé J+60" },
    { critere: "Assurance", statut: true, preuve: "Niveau 2 Accompagnement structuré. Option Niv 3 RC 10M€. ISO 27001 certifié" },
    { critere: "REX", statut: true, preuve: "Cas #CM-024 publié — 1er REX EMF CEMAC anonymisé — 100 cas/an objectif" },
  ],

  rex: {
    titre: "Cas #CM-024 — EMF Espoir CM",
    contexte: "Promoteur camerounais — 1ère demande agrément Cat 2 COBAC",
    erreurs: "Statuts non conformes AUSCGIE (3 clauses manquantes), BP BFR sous-estimé 40%, absence CCO certifié AML/CFT",
    actionsKhepra: "Correction statuts Auto-IA + Recalcul BP avec prime pays 7% + Recrutement CCO certifié",
    impact: "Délai soumission réduit de 6 mois à 4 mois. Taux succès estimé 85%",
    date: "2026-07-03",
  },

  disclaimer: "Ce livrable KOS constitue un dispositif d'accompagnement méthodologique. Il ne constitue pas une garantie d'obtention d'agrément. Pour « Opinion signée », activation Comité Technique + RC 10M€ requise.",

  nextSteps: [
    { echeance: "J+7", action: "Valider wireframe avec 2 clients pilotes EMF. Lancer dev Module 1 Maturity Scan", responsable: "Product Owner", livrable: "Wireframe validé + Specs Module 1", statut: "complete" },
    { echeance: "J+30", action: "Intégrer base AUSCGIE + BCEAO dans Vector DB. Former IA Erreurs Statuts sur 50 cas rejetés", responsable: "Tech Lead", livrable: "Base vectorielle + Modèle IA entraîné", statut: "complete" },
    { echeance: "J+90", action: "Go-live Module 1-2. Certifier ISO 27001. Publier 1er REX anonymisé", responsable: "Partner", livrable: "MVP Live + Certif ISO + REX #CM-024", statut: "complete" },
  ],
};



