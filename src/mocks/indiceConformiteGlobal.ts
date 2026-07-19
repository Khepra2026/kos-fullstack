/**
 * ═══ INDICE DE CONFORMITÉ — 5 RÉFÉRENTIELS AGRÉGÉS ═══
 * KHEPRA REGULATORY INTELLIGENCE™
 * Dernière mise à jour : 10 Juillet 2026
 */

export interface ReferentielScore {
  code: string;
  name: string;
  fullName: string;
  zone: string;
  pays: number;
  domaines: number;
  exigences: number;
  controles: number;
  automatisables: number;
  scoreConformite: number;
  p0Critiques: number;
  p1Haute: number;
  p2Moyenne: number;
  effortTotalJH: number;
  budgetTotalEur: number;
  gainMoyen: number;
  reductionRisqueMoyen: number;
  couleur: string;
  icon: string;
}

export const referentielsScores: ReferentielScore[] = [
  {
    code: "COBAC",
    name: "COBAC",
    fullName: "Commission Bancaire de l'Afrique Centrale",
    zone: "CEMAC",
    pays: 6,
    domaines: 20,
    exigences: 42,
    controles: 36,
    automatisables: 29,
    scoreConformite: 78,
    p0Critiques: 6,
    p1Haute: 16,
    p2Moyenne: 5,
    effortTotalJH: 837,
    budgetTotalEur: 337000,
    gainMoyen: 80,
    reductionRisqueMoyen: 59,
    couleur: "#D97706",
    icon: "ri-bank-line",
  },
  {
    code: "BCEAO",
    name: "BCEAO/CB-UMOA",
    fullName: "Banque Centrale des États de l'Afrique de l'Ouest",
    zone: "UEMOA",
    pays: 8,
    domaines: 20,
    exigences: 42,
    controles: 38,
    automatisables: 34,
    scoreConformite: 82,
    p0Critiques: 7,
    p1Haute: 19,
    p2Moyenne: 8,
    effortTotalJH: 905,
    budgetTotalEur: 373000,
    gainMoyen: 82,
    reductionRisqueMoyen: 60,
    couleur: "#059669",
    icon: "ri-building-2-line",
  },
  {
    code: "OHADA",
    name: "OHADA",
    fullName: "Organisation pour l'Harmonisation du Droit des Affaires en Afrique",
    zone: "OHADA",
    pays: 17,
    domaines: 20,
    exigences: 15,
    controles: 15,
    automatisables: 15,
    scoreConformite: 85,
    p0Critiques: 4,
    p1Haute: 7,
    p2Moyenne: 4,
    effortTotalJH: 380,
    budgetTotalEur: 152000,
    gainMoyen: 75,
    reductionRisqueMoyen: 55,
    couleur: "#7C3AED",
    icon: "ri-scales-line",
  },
  {
    code: "GIABA",
    name: "GIABA",
    fullName: "Groupe Intergouvernemental d'Action contre le Blanchiment",
    zone: "CEDEAO",
    pays: 15,
    domaines: 20,
    exigences: 20,
    controles: 12,
    automatisables: 12,
    scoreConformite: 76,
    p0Critiques: 4,
    p1Haute: 6,
    p2Moyenne: 2,
    effortTotalJH: 420,
    budgetTotalEur: 168000,
    gainMoyen: 78,
    reductionRisqueMoyen: 62,
    couleur: "#DC2626",
    icon: "ri-shield-flash-line",
  },
  {
    code: "GABAC",
    name: "GABAC",
    fullName: "Groupe d'Action contre le Blanchiment en Afrique Centrale",
    zone: "CEMAC",
    pays: 6,
    domaines: 20,
    exigences: 15,
    controles: 12,
    automatisables: 12,
    scoreConformite: 74,
    p0Critiques: 4,
    p1Haute: 5,
    p2Moyenne: 3,
    effortTotalJH: 380,
    budgetTotalEur: 152000,
    gainMoyen: 77,
    reductionRisqueMoyen: 60,
    couleur: "#2563EB",
    icon: "ri-police-car-line",
  },
];

export const indiceGlobalKPIs = {
  scoreMoyen: 79,
  scoreMax: 85,
  scoreMin: 74,
  referentiels: 5,
  totalDomaines: 100,
  totalExigences: 134,
  totalControles: 113,
  totalAutomatisables: 102,
  totalP0: 25,
  totalP1: 53,
  totalP2: 22,
  effortTotalJH: 2922,
  budgetTotalEur: 1182000,
  gainMoyenGlobal: 78,
  reductionRisqueGlobale: 59,
  derniereEdition: "Q2 2026",
  progression: "+6 pts vs Q4 2025",
};

export interface ControleTop5 {
  rang: number;
  referentiel: string;
  nom: string;
  priorite: string;
  effortJH: number;
  coutEur: number;
  gainPct: number;
  risquePct: number;
}

export const topControlesP0: ControleTop5[] = [
  { rang: 1, referentiel: "COBAC", nom: "Moteur KYC Automatisé (ML/NLP)", priorite: "P0", effortJH: 85, coutEur: 45000, gainPct: 90, risquePct: 85 },
  { rang: 2, referentiel: "COBAC", nom: "Détection Opérations Atypiques ML", priorite: "P0", effortJH: 100, coutEur: 55000, gainPct: 95, risquePct: 90 },
  { rang: 3, referentiel: "BCEAO", nom: "Stress Test Liquidité Temps Réel", priorite: "P0", effortJH: 65, coutEur: 30000, gainPct: 85, risquePct: 70 },
  { rang: 4, referentiel: "COBAC", nom: "Monitoring Temps Réel Solvabilité", priorite: "P0", effortJH: 55, coutEur: 22000, gainPct: 88, risquePct: 75 },
  { rang: 5, referentiel: "BCEAO", nom: "Calcul Auto Ratios Prudentiels UMOA", priorite: "P0", effortJH: 40, coutEur: 16000, gainPct: 82, risquePct: 65 },
];

export interface TimelineEvent {
  date: string;
  titre: string;
  description: string;
  referentiel: string;
  type: "deploiement" | "audit" | "miseajour" | "alerte";
}

export const timelineEvenements: TimelineEvent[] = [
  { date: "2026-07-10", titre: "Edge Function Solvabilité BCEAO Déployée", description: "Stress Test Liquidité Temps Réel P0 — 65 JH, 30K€", referentiel: "BCEAO", type: "deploiement" },
  { date: "2026-07-09", titre: "Edge Function KYC COBAC Déployée", description: "Moteur KYC Automatisé P0 — 85 JH, 45K€", referentiel: "COBAC", type: "deploiement" },
  { date: "2026-07-08", titre: "Cartographie Étendue OHADA/GIABA/GABAC", description: "+39 contrôles automatisables — 5 référentiels", referentiel: "OHADA", type: "miseajour" },
  { date: "2026-07-07", titre: "Articles Thématiques COBAC Complétés", description: "20 articles blog/KBR/études flash/notes stratégiques", referentiel: "COBAC", type: "miseajour" },
  { date: "2026-07-06", titre: "Référentiel BCEAO Complété", description: "38 contrôles, 34 automatisables, 20/20 domaines", referentiel: "BCEAO", type: "miseajour" },
  { date: "2026-06-28", titre: "Audit ISO 27001 — Recommandation Conformité", description: "Mise en conformité sécurité des données", referentiel: "COBAC", type: "audit" },
  { date: "2026-06-15", titre: "Alerte : Nouvelle Directive COBAC Cyber", description: "R-2026/01 — Notification incidents 2h", referentiel: "COBAC", type: "alerte" },
  { date: "2026-05-20", titre: "Évaluation Mutuelle GIABA — Rapport Final", description: "Scores de conformité technique GAFI publiés", referentiel: "GIABA", type: "audit" },
];

export const indiceFAQ = [
  { q: "Comment est calculé l'Indice de Conformité KHEPRA ?", a: "L'Indice de Conformité KHEPRA est un score composite pondéré qui agrège les évaluations de 5 référentiels réglementaires (COBAC, BCEAO, OHADA, GIABA, GABAC). Chaque référentiel est noté sur 100 points en fonction de : nombre de contrôles conformes, taux d'automatisation, couverture des domaines, maturité des actions correctives et délai de mise en conformité." },
  { q: "Quels sont les 5 référentiels couverts ?", a: "COBAC (CEMAC, 6 pays), BCEAO/CB-UMOA (UEMOA, 8 pays), OHADA (17 États), GIABA (CEDEAO, 15 pays), GABAC (CEMAC, 6 pays). Au total, 102 contrôles automatisables cartographiés avec technologies, budget et ROI." },
  { q: "À quelle fréquence l'Indice est-il mis à jour ?", a: "L'Indice est mis à jour trimestriellement (mars, juin, septembre, décembre). Les mises à jour intègrent les nouveaux textes, les déploiements de contrôles et les résultats d'audits." },
  { q: "Comment puis-je améliorer mon score de conformité ?", a: "Contactez KHEPRA EXPERTS pour un diagnostic flash gratuit. Nos experts analysent votre exposition aux 5 référentiels et fournissent une feuille de route priorisée avec actions correctives et estimation budgétaire." },
];





