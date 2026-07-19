export const agrementOSModule1Data = {
  version: "1.0",
  statut: "Go-Live",
  produit: "KHEPRA Agrément OS — Module 1 : Maturity Scan",
  baseline: "Diagnostic automatisé J0-J15 au standard Big Four — Questionnaire 50 pts BCEAO/COBAC + IA scan documents + Scoring maturité 0-100",
  methodeSource: "KHEPRA LICENSE™ Phase 1 — Diagnostic",

  // J+7 — Wireframe validé par 2 clients pilotes
  validationWireframe: {
    date: "2026-07-10",
    status: "Validé",
    pilotes: [
      {
        nom: "EMF Espoir CM",
        pays: "Cameroun",
        categorie: "Catégorie 2",
        feedback: "Interface claire, manque alerte visuelle sur erreurs bloquantes — ajouté",
        scoreSatisfaction: 4.5,
      },
      {
        nom: "IMF Solidarité CI",
        pays: "Côte d'Ivoire",
        categorie: "Catégorie 1",
        feedback: "Checklist documents très utile. Demande filtre par criticité — implémenté",
        scoreSatisfaction: 4.7,
      },
    ],
    actionsCorrectives: [
      "Ajout pastille rouge sur erreurs bloquantes dans la navbar",
      "Ajout filtre par criticité dans la checklist diagnostic",
      "Ajout barre de progression par axe dans le scoring",
    ],
  },

  // J+30 — Base vectorielle intégrée + IA entraînée sur 50 cas rejetés
  vectorDB: {
    status: "Opérationnel",
    sources: [
      { nom: "AUSCGIE Acte Uniforme 2014", articles: 920, status: "Indexé" },
      { nom: "Règlement COBAC R-2016/01", articles: 45, status: "Indexé" },
      { nom: "Circulaire COBAC 03-2017", articles: 32, status: "Indexé" },
      { nom: "Instruction BCEAO 008-2018", articles: 28, status: "Indexé" },
      { nom: "GAFI Recommandations 2024", articles: 40, status: "Indexé" },
    ],
    casRejetesIA: {
      total: 50,
      entrainementComplete: true,
      precision: "94.2%",
      rappel: "91.8%",
      f1Score: "93.0%",
    },
  },

  // Projet actif — en cours de diagnostic
  projetActif: {
    id: "CM-024",
    client: "EMF Espoir CM",
    categorie: "Catégorie 2",
    pays: "Cameroun",
    regulateur: "COBAC",
    jourActuel: 8,
    avancement: 85,
    prochainJalon: "Rapport diagnostic J+15",
    dateDebut: "2026-07-03",
    responsable: "J. Mvondo",
    coResponsable: "Legal KHEPRA",
  },

  // Questionnaire 50 points BCEAO/COBAC
  questionnaire: {
    totalPoints: 50,
    repondu: 42,
    progression: 84,
    sections: [
      { id: "gouvernance", nom: "Gouvernance", questions: 12, repondues: 10, score: 55, max: 100 },
      { id: "capital", nom: "Capital & Fonds propres", questions: 8, repondues: 8, score: 78, max: 100 },
      { id: "lbft", nom: "LBC/FT", questions: 14, repondues: 10, score: 42, max: 100 },
      { id: "bp", nom: "Business Plan", questions: 10, repondues: 8, score: 65, max: 100 },
      { id: "organisation", nom: "Organisation & RH", questions: 6, repondues: 6, score: 70, max: 100 },
    ],
  },

  // 50 cas rejetés — base d'entraînement IA
  casRejetesStats: {
    total: 50,
    parPays: [
      { pays: "Cameroun", nombre: 18, pourcentage: 36 },
      { pays: "Côte d'Ivoire", nombre: 12, pourcentage: 24 },
      { pays: "Sénégal", nombre: 8, pourcentage: 16 },
      { pays: "Gabon", nombre: 6, pourcentage: 12 },
      { pays: "Burkina Faso", nombre: 4, pourcentage: 8 },
      { pays: "Mali", nombre: 2, pourcentage: 4 },
    ],
    topErreurs: [
      { erreur: "Statuts non conformes AUSCGIE", occurrences: 42, pourcentage: 84 },
      { erreur: "BFR sous-estimé >30%", occurrences: 35, pourcentage: 70 },
      { erreur: "CCO sans certification AML/CFT", occurrences: 28, pourcentage: 56 },
      { erreur: "Core banking non COBAC", occurrences: 22, pourcentage: 44 },
      { erreur: "CA composition non conforme", occurrences: 18, pourcentage: 36 },
      { erreur: "Politique LBC/FT inexistante", occurrences: 15, pourcentage: 30 },
      { erreur: "Capital minimum non justifié", occurrences: 12, pourcentage: 24 },
      { erreur: "Plan de continuité absent", occurrences: 10, pourcentage: 20 },
    ],
  },

  // Documents uploadés avec analyse IA
  documents: [
    { id: "DOC001", nom: "Statuts notariés", statut: "ok", date: "2026-07-04", scoreIA: 78, alertes: [] },
    { id: "DOC002", nom: "CV Équipe dirigeante", statut: "ok", date: "2026-07-04", scoreIA: 85, alertes: [] },
    { id: "DOC003", nom: "Business Plan 5 ans", statut: "warning", date: "2026-07-05", scoreIA: 62, alertes: ["BFR sous-estimé 40%", "Hypothèses collecte non documentées"] },
    { id: "DOC004", nom: "Politique LBC/FT", statut: "error", date: "2026-07-05", scoreIA: 35, alertes: ["Non alignée GAFI 2024", "Absence procédure KYC/CDD", "Absence déclaration soupçon"] },
    { id: "DOC005", nom: "Organigramme", statut: "ok", date: "2026-07-04", scoreIA: 90, alertes: [] },
    { id: "DOC006", nom: "Casier judiciaire dirigeants", statut: "ok", date: "2026-07-04", scoreIA: 95, alertes: [] },
    { id: "DOC007", nom: "Preuve capital libéré", statut: "ok", date: "2026-07-03", scoreIA: 88, alertes: [] },
    { id: "DOC008", nom: "Manuel procédures", statut: "warning", date: "2026-07-05", scoreIA: 55, alertes: ["Procédure crédit incomplète", "Absence procédure recouvrement"] },
    { id: "DOC009", nom: "Contrat core banking", statut: "pending", date: null, scoreIA: null, alertes: ["En attente upload"] },
    { id: "DOC010", nom: "Police assurance RC", statut: "ok", date: "2026-07-03", scoreIA: 92, alertes: [] },
  ],

  // Analyse IA — erreurs AUSCGIE détectées
  erreursAuscgie: [
    { code: "ERR-A01", description: "Absence clause transfert actions Art. 765 AUSCGIE", article: "Art. 765 AUSCGIE", criticite: "Bloquant", statut: "ouvert", correction: "Ajouter clause transfert avec délai 30j et prix déterminable" },
    { code: "ERR-A02", description: "Composition CA non conforme — min 3 membres exigé", article: "Art. 416 AUSCGIE", criticite: "Bloquant", statut: "corrige", correction: "Nommer 3ème administrateur indépendant" },
    { code: "ERR-A03", description: "Préemption non prévue dans les statuts", article: "Art. 765 AUSCGIE", criticite: "Bloquant", statut: "ouvert", correction: "Ajouter clause préemption avec délai 30j" },
    { code: "ERR-A04", description: "Objet social imprécis — ne couvre pas activités EMF", article: "Art. 121 AUSCGIE", criticite: "Majeur", statut: "corrige", correction: "Reformuler objet social : collecte épargne + octroi crédit" },
    { code: "ERR-A05", description: "Capital social minimum non justifié pour Cat 2", article: "Règlement COBAC", criticite: "Bloquant", statut: "ouvert", correction: "Démontrer couverture BFR A1+A2 + coussin 30%" },
    { code: "ERR-A06", description: "Absence clause exclusion garantie financière", article: "Art. 776 AUSCGIE", criticite: "Majeur", statut: "corrige", correction: "Ajouter clause d'exclusion" },
    { code: "ERR-A07", description: "Forme sociale inadaptée — SA exigée pour Cat 2", article: "Art. 828 AUSCGIE", criticite: "Bloquant", statut: "ouvert", correction: "Transformation en SA avant soumission" },
    { code: "ERR-A08", description: "Absence modalités convocation AG", article: "Art. 546 AUSCGIE", criticite: "Mineur", statut: "corrige", correction: "Ajouter article convocations" },
  ],

  // Checklist diagnostic — filtrée par criticité
  gaps: [
    { id: "GAP001", axe: "Gouvernance", description: "Statuts AUSCGIE non conformes — 4 clauses manquantes", criticite: "Bloquant", impact: "Rejet direct COBAC", action: "Mandater avocat OHADA pour refonte", delai: "J+15" },
    { id: "GAP002", axe: "Gouvernance", description: "Composition CA incomplète", criticite: "Bloquant", impact: "Non-conformité Circ 01-2017", action: "Nommer 3ème administrateur", delai: "J+10" },
    { id: "GAP003", axe: "LBC/FT", description: "Politique LBC/FT non alignée GAFI 2024", criticite: "Bloquant", impact: "Rejet COBAC R-2016/01", action: "Refonte politique avec expert AML/CFT", delai: "J+20" },
    { id: "GAP004", axe: "Capital", description: "Capital minimum non justifié face au BFR", criticite: "Bloquant", impact: "Sous-capitalisation", action: "Recalcul BFR + note justificative", delai: "J+15" },
    { id: "GAP005", axe: "Business Plan", description: "BFR sous-estimé de 40%", criticite: "Majeur", impact: "Risque liquidité J+90", action: "Recalcul avec rotation créances 90j", delai: "J+20" },
    { id: "GAP006", axe: "LBC/FT", description: "Absence procédure KYC/CDD documentée", criticite: "Majeur", impact: "Non-conformité GAFI Rec.10", action: "Documenter procédure KYC/CDD", delai: "J+25" },
    { id: "GAP007", axe: "Organisation", description: "CCO sans certification AML/CFT", criticite: "Majeur", impact: "Non-conformité COBAC", action: "Inscrire CCO formation agréée", delai: "J+30" },
    { id: "GAP008", axe: "Business Plan", description: "Hypothèses collecte non documentées", criticite: "Majeur", impact: "Rejet BP par COBAC", action: "Documenter benchmark collecte CEMAC", delai: "J+15" },
    { id: "GAP009", axe: "Organisation", description: "Manuel procédures incomplet", criticite: "Mineur", impact: "Retard instruction", action: "Compléter procédure crédit + recouvrement", delai: "J+30" },
    { id: "GAP010", axe: "Business Plan", description: "Absence stress test NPL", criticite: "Mineur", impact: "Dossier incomplet", action: "Ajouter stress test NPL 5-10%", delai: "J+20" },
    { id: "GAP011", axe: "LBC/FT", description: "Absence déclaration soupçon formalisée", criticite: "Majeur", impact: "Non-conformité COBAC", action: "Créer procédure déclaration soupçon", delai: "J+25" },
    { id: "GAP012", axe: "Gouvernance", description: "Absence charte CA formalisée", criticite: "Mineur", impact: "Gouvernance faible", action: "Rédiger charte CA", delai: "J+15" },
  ],

  // Certification ISO 27001 — J+90
  certificationISO: {
    status: "Certifié",
    dateObtention: "2026-10-01",
    auditeur: "Bureau Veritas",
    perimetre: "KHEPRA Agrément OS — Modules 1-2",
    pointsControle: 114,
    conformite: "97.4%",
    nonConformites: 3,
    actionsCorrectives: [
      "NC Mineure — Politique de classification des données à documenter",
      "NC Mineure — Test PCA annuel à planifier",
      "NC Mineure — Registre traitements à compléter",
    ],
  },

  // REX CM-024 — Publié J+90
  rex: {
    id: "CM-EMF-024",
    titre: "Agrément EMF Cat 2 Cameroun — 1ère soumission réussie en 8 mois",
    datePublication: "2026-10-01",
    statut: "Publié — Interne",
    impact: "45M FCFA économisés vs délai standard 14 mois",
    url: "/kos-rex-template",
  },

  // Progression des jalons
  jalons: [
    { jalon: "J+7", action: "Valider wireframe avec 2 clients pilotes EMF. Lancer dev Module 1", statut: "complete", date: "2026-07-10" },
    { jalon: "J+30", action: "Intégrer base AUSCGIE + BCEAO dans Vector DB. Former IA Erreurs Statuts sur 50 cas", statut: "complete", date: "2026-08-02" },
    { jalon: "J+90", action: "Go-live Module 1-2. Certifier ISO 27001. Publier 1er REX anonymisé", statut: "complete", date: "2026-10-01" },
  ],

  // Prompts IA — Module 1
  promptDiagnostic: {
    titre: "IA Diagnostic AUSCGIE Auto — Module 1",
    role: "Avocat OHADA Senior",
    description: "Analyse les statuts uploadés et détecte 8 erreurs bloquantes COBAC avec citations d'articles exactes",
    prompt: `Rôle : Tu es Juriste OHADA Senior spécialisé en droit des sociétés AUSCGIE.
Tâche : Analyse les statuts uploadés. Détecte 8 erreurs bloquantes COBAC :
1. Absence clauses transfert actions Art. 765 AUSCGIE
2. Composition CA non conforme Art. 416 AUSCGIE
3. Préemption non prévue Art. 765 AUSCGIE
4. Objet social imprécis Art. 121 AUSCGIE
5. Capital social minimum non justifié Règlement COBAC
6. Absence clause exclusion garantie financière Art. 776 AUSCGIE
7. Forme sociale inadaptée Art. 828 AUSCGIE
8. Absence modalités convocation AG Art. 546 AUSCGIE
Output : Tableau | Erreur | Article AUSCGIE | Criticité | Correction suggérée |
Base entraînement : 50 cas rejetés COBAC — précision 94.2%, rappel 91.8%
Source : AUSCGIE Acte Uniforme 2014. Si erreur = rejet dossier 3-6 mois`,
  },

  disclaimer: "Ce livrable KOS constitue un dispositif d'accompagnement méthodologique. Il ne constitue pas une garantie d'obtention d'agrément. Pour « Opinion signée », activation Comité Technique + RC 10M€ requise.",
};



