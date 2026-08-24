// ============================================================
// KOS P0 EXECUTION — Exécution Intégrale des 5 Blocs P0
// Issu des Corrective Action Blocks (Enterprise Transformation Assessment 360°)
// 5 Blocs · 15 Actions P0 · 275.8M FCFA · Horizon 0-365 jours
// Version 2026.06.26
// ============================================================

export interface P0ExecutionAction {
  id: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  deadline: string;
  statut: 'non_demarre' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  preuve: string;
  dependanceDe: string;
  bloquePar: string;
  commentaire: string;
}

export interface P0ExecutionMilestone {
  id: string;
  nom: string;
  date: string;
  statut: 'a_venir' | 'en_cours' | 'atteint' | 'retard';
  bloc: string;
  actionsLiees: string[];
}

export interface P0ExecutionBlock {
  id: string;
  numero: string;
  nom: string;
  acronyme: string;
  icon: string;
  couleur: string;
  description: string;
  horizon: string;
  scoreActuel: number;
  scoreCible: number;
  budgetTotal: string;
  responsable: string;
  progressionGlobale: number;
  statutGlobal: 'non_demarre' | 'en_cours' | 'termine';
  actions: P0ExecutionAction[];
  jalons: P0ExecutionMilestone[];
}

export const P0_EXECUTION_BLOCKS: P0ExecutionBlock[] = [
  // ===== BLOC ALPHA — SÉCURITÉ & CONFORMITÉ IMMÉDIATE =====
  {
    id: 'bloc-alpha',
    numero: 'α',
    nom: 'Sécurité & Conformité Immédiate',
    acronyme: 'SEC-COM',
    icon: 'ri-shield-flash-line',
    couleur: 'primary',
    description: 'Résolution des 8 vulnérabilités critiques identifiées sur les axes Cybersécurité, Conformité et Données. Bloc P0 absolu — conditionne tous les autres blocs.',
    horizon: '0—90 jours',
    scoreActuel: 68,
    scoreCible: 95,
    budgetTotal: '62 300 000 FCFA',
    responsable: 'RSSI + CCO',
    progressionGlobale: 0,
    statutGlobal: 'non_demarre',
    actions: [
      {
        id: 'CYS-A01',
        action: 'Résoudre 5 gaps ISO 27001 critiques',
        description: 'Finaliser les 5 contrôles : sécurité physique (A.11), SDLC documenté (A.14), sécurité fournisseurs (A.15), formation 100% (A.7), PCA testé (A.17). Plan de remédiation avec dates butoir.',
        effort: '80h',
        budget: '17 200 000 FCFA',
        responsable: 'RSSI',
        kpi: '114/114 contrôles ISO 27001 passés',
        deadline: '2026-10-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Rapport de conformité ISO 27001 complet + Plan d\'actions résiduelles',
        preuve: 'Checklist 114 contrôles signée RSSI + CCO',
        dependanceDe: '',
        bloquePar: '',
        commentaire: '5 contrôles restants : A.11.1.1 (périmètre physique non documenté), A.14.2.1 (SDLC non formalisé), A.15.1.1 (pas d\'évaluation fournisseurs), A.7.2.2 (formation sécurité 78% au lieu de 100%), A.17.1.2 (PCA jamais testé)',
      },
      {
        id: 'CYS-A02',
        action: 'Déployer CSP + headers sécurité',
        description: 'Content-Security-Policy strict, Permissions-Policy, HSTS preload, Referrer-Policy, X-Content-Type-Options sur toutes les pages. Validation Mozilla Observatory.',
        effort: '8h',
        budget: '2 800 000 FCFA',
        responsable: 'RSSI + Lead Dev',
        kpi: 'Mozilla Observatory ≥ 95/100',
        deadline: '2026-08-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Headers déployés sur 100% des pages + rapport Observatory',
        preuve: 'Capture Observatory ≥ 95 + WAF logs',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Actuellement Observatory à 62/100. Manque CSP, HSTS max-age trop court, Permissions-Policy absent.',
      },
      {
        id: 'REG-A01',
        action: 'Améliorer KYC/CDD — PPE 65%→90%',
        description: 'Intégrer bases de données PPE internationales (WorldCheck, Dow Jones) dans le workflow KYC KOS. Automatiser la détection et le scoring.',
        effort: '60h',
        budget: '8 500 000 FCFA',
        responsable: 'Compliance Officer',
        kpi: 'Détection PPE ≥ 90%, conformité GAFI R.12',
        deadline: '2026-09-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Workflow KYC automatisé + Intégration WorldCheck + Dashboard conformité',
        preuve: 'Rapport test détection PPE 90%+ + Audit externe GAFI R.12',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Actuellement détection PPE à 65%. Manque intégration bases internationales et scoring automatique.',
      },
    ],
    jalons: [],
  },

  // ===== BLOC BETA — ARCHITECTURE & FONDATIONS TECHNIQUES =====
  {
    id: 'bloc-beta',
    numero: 'β',
    nom: 'Architecture & Fondations Techniques',
    acronyme: 'ARC-TECH',
    icon: 'ri-cpu-line',
    couleur: 'accent',
    description: 'Consolidation de l\'architecture KOS : fusion des edge functions (98→50), CI/CD avec quality gates, monitoring unifié, retry automatique 100%. Prérequis technique à toute nouvelle fonctionnalité.',
    horizon: '0—180 jours',
    scoreActuel: 60,
    scoreCible: 93,
    budgetTotal: '44 500 000 FCFA',
    responsable: 'CTO + Lead Dev Backend',
    progressionGlobale: 0,
    statutGlobal: 'non_demarre',
    actions: [
      {
        id: 'ARC-A01',
        action: 'Programme fusion edge functions (98→50)',
        description: 'Identifier et fusionner les edge functions redondantes. Cible : passer de 98 à 50 fonctions via regroupement par domaine. Audit de chaque fonction, identification des doublons, plan de fusion par lot.',
        effort: '160h',
        budget: '12 000 000 FCFA',
        responsable: 'CTO + Lead Dev Backend',
        kpi: '50 edge functions max, 0 régression',
        deadline: '2026-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Catalogue des 50 fonctions consolidées + Rapports de test de régression',
        preuve: 'Dashboard Supabase montrant 50 fonctions actives + logs 0 erreur',
        dependanceDe: '',
        bloquePar: '',
        commentaire: '98 edge functions actuellement. Forte redondance sur les fonctions RAG, SEO, KOS agents. Cible : 50 fonctions unifiées par domaine.',
      },
      {
        id: 'QAL-A02-beta',
        action: 'CI/CD avec quality gates',
        description: 'Pipeline CI/CD complet : lint, type-check, test, build, security scan, bundle analysis. Quality gates bloquantes.',
        effort: '60h',
        budget: '5 000 000 FCFA',
        responsable: 'CTO + DevOps',
        kpi: 'Pipeline CI/CD avec 5 quality gates',
        deadline: '2026-11-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Pipeline CI/CD configuré + 5 quality gates documentées',
        preuve: 'Logs pipeline montrant exécution des 5 gates sur le dernier commit',
        dependanceDe: 'ARC-A01',
        bloquePar: '',
        commentaire: 'Actuellement 0 CI/CD. Déploiement manuel. Aucune quality gate. Risque élevé de régression.',
      },
      {
        id: 'AUT-A01',
        action: 'Dashboard automation unifié',
        description: 'Dashboard unique montrant l\'état de tous les workflows, pipelines, crons, et edge functions en temps réel.',
        effort: '80h',
        budget: '8 000 000 FCFA',
        responsable: 'CTO',
        kpi: '100% workflows monitorés',
        deadline: '2026-11-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Dashboard KOS SysOps Health & Resiliency — page dédiée',
        preuve: 'Page KOS live montrant 100% des workflows avec statut temps réel',
        dependanceDe: 'ARC-A01',
        bloquePar: '',
        commentaire: 'Actuellement monitoring fragmenté. Certains crons non surveillés, alertes inconsistantes.',
      },
      {
        id: 'AUT-A02',
        action: 'Retry automatique 100% workflows',
        description: 'Implémenter le retry automatique avec backoff exponentiel sur tous les workflows KOS.',
        effort: '60h',
        budget: '5 000 000 FCFA',
        responsable: 'CTO + DevOps',
        kpi: '100% workflows retry, 0 échec silencieux',
        deadline: '2026-10-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Système de retry universal + Circuit breaker configuré',
        preuve: 'Logs montrant retry automatique activé sur tous les workflows',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Actuellement 60% des workflows ont un retry. 40% échouent silencieusement sans alerte.',
      },
    ],
    jalons: [],
  },

  // ===== BLOC GAMMA — IA & CONFORMITÉ RÉGLEMENTAIRE IA =====
  {
    id: 'bloc-gamma',
    numero: 'γ',
    nom: 'IA & Conformité Réglementaire IA',
    acronyme: 'IA-REG',
    icon: 'ri-brain-line',
    couleur: 'secondary',
    description: 'Mise en conformité du système IA KOS avec l\'EU AI Act, ISO 42001, et déploiement du GraphRAG réglementaire. Ce bloc sécurise l\'avance technologique de KOS.',
    horizon: '0—365 jours',
    scoreActuel: 62,
    scoreCible: 94,
    budgetTotal: '34 000 000 FCFA',
    responsable: 'CTO + AI Ethics Board',
    progressionGlobale: 0,
    statutGlobal: 'non_demarre',
    actions: [
      {
        id: 'IAK-A01',
        action: 'Mise en conformité EU AI Act — Digital Twin',
        description: 'Refactoring du Digital Twin pour conformité Art.14 (explicabilité) et Art.15 (exactitude). Documentation technique complète. Audit externe.',
        effort: '120h',
        budget: '18 000 000 FCFA',
        responsable: 'CTO + AI Ethics Board',
        kpi: 'Conformité EU AI Act, score ISO 42001 ≥ 95/100',
        deadline: '2026-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Documentation EU AI Act complète + Rapport audit externe + Certification ISO 42001 ready',
        preuve: 'Rapport audit externe + Déclaration de conformité EU AI Act',
        dependanceDe: 'bloc-beta',
        bloquePar: '',
        commentaire: 'Digital Twin classé High Risk selon EU AI Act. Art.14 (explicabilité) non conforme : les recommandations ne sont pas traçables. Art.15 (exactitude) : taux d\'hallucination 0.12% à réduire.',
      },
    ],
    jalons: [],
  },

  // ===== BLOC DELTA — BUSINESS MODEL & CROISSANCE =====
  {
    id: 'bloc-delta',
    numero: 'δ',
    nom: 'Business Model & Croissance',
    acronyme: 'BIZ-GRO',
    icon: 'ri-funds-box-line',
    couleur: 'accent',
    description: 'Transformation du business model : lancement SaaS KOS Platform, bureau CEMAC à Douala, offre IA Governance, automatisation des offres. Objectif : CA récurrent 15%→40%.',
    horizon: '0—365 jours',
    scoreActuel: 58,
    scoreCible: 92,
    budgetTotal: '83 000 000 FCFA',
    responsable: 'Managing Partner + Growth Director',
    progressionGlobale: 0,
    statutGlobal: 'non_demarre',
    actions: [
      {
        id: 'BMD-A01',
        action: 'Lancer offre SaaS KOS Platform (abonnement)',
        description: 'Offre d\'abonnement KOS Platform pour SFD et banques. Pricing : 2.5M-8M FCFA/mois selon taille. Période d\'essai 30 jours.',
        effort: '120h',
        budget: '18 000 000 FCFA',
        responsable: 'CTO + Growth Director',
        kpi: '10 clients abonnement d\'ici 12 mois, +25% CA récurrent',
        deadline: '2026-12-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Plateforme SaaS live + Page pricing + 3 premiers clients',
        preuve: 'Tableau de bord abonnements + Contrats signés',
        dependanceDe: 'bloc-beta, bloc-gamma',
        bloquePar: '',
        commentaire: 'Marché cible : 50 SFD UEMOA + 30 banques. Pricing compétitif vs solutions internationales (50-70% moins cher).',
      },
      {
        id: 'BMD-A02',
        action: 'Ouvrir bureau CEMAC (Douala)',
        description: 'Présence physique à Douala avec 1 Director + 2 Consultants. Cible : 15% du CA de la zone CEMAC en 18 mois.',
        effort: '160h',
        budget: '35 000 000 FCFA',
        responsable: 'Managing Partner',
        kpi: 'Bureau opérationnel, 5 clients CEMAC actifs',
        deadline: '2027-03-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Bureau physique + Équipe recrutée + Portefeuille clients CEMAC',
        preuve: 'Bail commercial + Contrats de travail + 5 mandats actifs',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Douala choisi comme hub CEMAC : hub financier, proximité COBAC/BEAC, écosystème dynamique. Budget inclut recrutement et setup.',
      },
      {
        id: 'POF-A01',
        action: 'Lancer offre IA Governance for Finance',
        description: '9ème offre : audit et conseil en gouvernance IA pour banques/SFD. ISO 42001, EU AI Act, guidelines BCEAO/COBAC.',
        effort: '80h',
        budget: '12 000 000 FCFA',
        responsable: 'CTO + BU1 Director',
        kpi: 'Offre lancée, 3 mandats en 6 mois',
        deadline: '2026-10-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: 'Fiche offre commerciale + Page web + Toolkit méthodologique + 3 mandats',
        preuve: 'Page offre live + Contrats signés',
        dependanceDe: 'bloc-gamma',
        bloquePar: '',
        commentaire: 'Offre pionnière en Afrique francophone. Aucun concurrent direct identifié. TJM cible : 850K FCFA.',
      },
      {
        id: 'POF-A02',
        action: 'Automatiser production de 4 offres via KOS',
        description: 'Industrialiser Due Diligence, Conformité BCEAO, Diagnostic ESG, Prix de Transfert avec KOS Automaton.',
        effort: '200h',
        budget: '28 000 000 FCFA',
        responsable: 'CTO + CQO',
        kpi: 'Score automatisation 38%→65%, délai livraison -40%',
        deadline: '2027-03-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: '4 offres automatisées dans KOS + Dashboard productivité',
        preuve: 'Rapport automatisation avant/après + Métriques délai livraison',
        dependanceDe: 'bloc-beta, bloc-gamma',
        bloquePar: '',
        commentaire: 'Gain de productivité estimé : 1300h/an économisées. ROI : 12 mois.',
      },
    ],
    jalons: [],
  },

  // ===== BLOC EPSILON — MARKETING & VISIBILITÉ DIGITALE =====
  {
    id: 'bloc-epsilon',
    numero: 'ε',
    nom: 'Marketing & Visibilité Digitale',
    acronyme: 'MKT-VIS',
    icon: 'ri-megaphone-line',
    couleur: 'primary',
    description: 'Programme de visibilité digitale complet : GEO (SOV 38%→50%), featured snippets 52→150, YouTube 2 vidéos/mois, Knowledge Graph 150+ entités.',
    horizon: '0—365 jours',
    scoreActuel: 52,
    scoreCible: 91,
    budgetTotal: '52 000 000 FCFA',
    responsable: 'Marketing Director + SEO/GEO Director',
    progressionGlobale: 0,
    statutGlobal: 'non_demarre',
    actions: [
      {
        id: 'SGO-A01',
        action: 'Programme GEO — SOV 38%→50%',
        description: '25 000 FAQs additionnelles, 6 pillar pages optimisées multi-moteur, partenariat crawlers IA. Positionnement sur les requêtes réglementaires et conformité.',
        effort: '120h',
        budget: '6 500 000 FCFA',
        responsable: 'SEO/GEO Director',
        kpi: 'SOV 50%, présence 5/5 moteurs ≥ 90%',
        deadline: '2027-03-31',
        statut: 'non_demarre',
        progression: 0,
        livrable: '25 000 FAQs publiées + 6 pillar pages optimisées + Rapport GEO trimestriel',
        preuve: 'Dashboard GEO montrant SOV 50% + captures moteurs IA',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Actuellement SOV à 38%. Concurrents : Deloitte 52%, PwC 48%. Objectif : dépasser PwC en 6 mois, Deloitte en 12 mois.',
      },
      {
        id: 'SGO-A02',
        action: 'Featured snippets 52→150',
        description: 'Reformuler 100 H2 en questions, générer réponses concises, déployer FAQ Schema sur 30 pages prioritaires.',
        effort: '60h',
        budget: '4 200 000 FCFA',
        responsable: 'SEO Director + Content Team',
        kpi: '150 featured snippets, +250% CTR',
        deadline: '2026-11-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: '100 H2 reformulés + 30 FAQ Schema déployés + Rapport GSC',
        preuve: 'Dashboard GSC montrant 150+ snippets + évolution CTR',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Pages cibles prioritaires : BCEAO, COBAC, SFD, Conformité. Format question/réponse optimisé pour Position 0.',
      },
      {
        id: 'MKT-A01',
        action: 'Relancer chaîne YouTube — 2 vidéos/mois',
        description: 'Calendrier éditorial YouTube : interviews régulateurs, explications circulaires, démos KOS, études de cas.',
        effort: '80h/mois',
        budget: '12 000 000 FCFA/an',
        responsable: 'Content Director',
        kpi: '24 vidéos/an, 5 000 abonnés',
        deadline: '2027-06-30',
        statut: 'non_demarre',
        progression: 0,
        livrable: '24 vidéos produites + Chaîne active + 5 000 abonnés',
        preuve: 'YouTube Analytics montrant 24 vidéos et 5K abonnés',
        dependanceDe: '',
        bloquePar: '',
        commentaire: 'Chaîne actuellement inactive. Calendrier : 2 vidéos/mois = 24 vidéos/an. Format : 10-15 min, production studio.',
      },
    ],
    jalons: [],
  },
];

// ===== MILESTONES GLOBALES =====
export const P0_GLOBAL_MILESTONES: P0ExecutionMilestone[] = [
  { id: 'MS-01', nom: 'ISO 27001 : 114/114 contrôles passés', date: '2026-10-31', statut: 'a_venir', bloc: 'bloc-alpha', actionsLiees: ['CYS-A01'] },
  { id: 'MS-02', nom: 'Mozilla Observatory ≥ 95/100', date: '2026-08-31', statut: 'a_venir', bloc: 'bloc-alpha', actionsLiees: ['CYS-A02'] },
  { id: 'MS-03', nom: 'Détection PPE ≥ 90% — Conforme GAFI R.12', date: '2026-09-30', statut: 'a_venir', bloc: 'bloc-alpha', actionsLiees: ['REG-A01'] },
  { id: 'MS-04', nom: 'Retry automatique 100% workflows', date: '2026-10-31', statut: 'a_venir', bloc: 'bloc-beta', actionsLiees: ['AUT-A02'] },
  { id: 'MS-05', nom: 'CI/CD 5 quality gates opérationnel', date: '2026-11-30', statut: 'a_venir', bloc: 'bloc-beta', actionsLiees: ['QAL-A02-beta'] },
  { id: 'MS-06', nom: 'Edge functions ≤ 50 + Dashboard unifié', date: '2026-12-31', statut: 'a_venir', bloc: 'bloc-beta', actionsLiees: ['ARC-A01', 'AUT-A01'] },
  { id: 'MS-07', nom: 'Offre IA Governance lancée', date: '2026-10-31', statut: 'a_venir', bloc: 'bloc-delta', actionsLiees: ['POF-A01'] },
  { id: 'MS-08', nom: 'EU AI Act conforme + ISO 42001 ≥ 95', date: '2026-12-31', statut: 'a_venir', bloc: 'bloc-gamma', actionsLiees: ['IAK-A01'] },
  { id: 'MS-09', nom: 'SaaS KOS Platform live + 3 clients', date: '2026-12-31', statut: 'a_venir', bloc: 'bloc-delta', actionsLiees: ['BMD-A01'] },
  { id: 'MS-10', nom: '150 featured snippets', date: '2026-11-30', statut: 'a_venir', bloc: 'bloc-epsilon', actionsLiees: ['SGO-A02'] },
  { id: 'MS-11', nom: 'Bureau Douala opérationnel', date: '2027-03-31', statut: 'a_venir', bloc: 'bloc-delta', actionsLiees: ['BMD-A02'] },
  { id: 'MS-12', nom: 'SOV 50% — Niveau Big Four', date: '2027-03-31', statut: 'a_venir', bloc: 'bloc-epsilon', actionsLiees: ['SGO-A01'] },
];

// ===== EXECUTION TIMELINE =====
export interface P0TimelinePhase {
  nom: string;
  periode: string;
  blocs: string[];
  budget: string;
  jalon: string;
}

export const P0_TIMELINE: P0TimelinePhase[] = [
  { nom: 'Phase 1 — Fondations', periode: 'Juillet—Août 2026', blocs: ['bloc-alpha'], budget: '10 100 000 FCFA', jalon: 'CSP + KYC/PPE + ISO 27001 lancé' },
  { nom: 'Phase 2 — Architecture Core', periode: 'Septembre—Octobre 2026', blocs: ['bloc-alpha', 'bloc-beta'], budget: '41 500 000 FCFA', jalon: 'ISO 27001 114/114 + Retry 100% + Offre IA Gov' },
  { nom: 'Phase 3 — Industrialisation', periode: 'Novembre—Décembre 2026', blocs: ['bloc-beta', 'bloc-gamma', 'bloc-delta'], budget: '63 000 000 FCFA', jalon: 'CI/CD live + EU AI Act + SaaS KOS live' },
  { nom: 'Phase 4 — Scale & Visibilité', periode: 'Janvier—Mars 2027', blocs: ['bloc-delta', 'bloc-epsilon'], budget: '118 300 000 FCFA', jalon: 'Bureau Douala + SOV 50% + Automatisation offres' },
  { nom: 'Phase 5 — Consolidation', periode: 'Avril—Juin 2027', blocs: ['bloc-epsilon'], budget: '42 900 000 FCFA', jalon: 'YouTube 12 vidéos + 2 500 abonnés' },
];

// ===== EXECUTIVE SUMMARY =====
export const P0_EXECUTIVE_SUMMARY = {
  titre: 'KOS P0 — Plan d\'Exécution Intégral',
  auditSource: 'Enterprise Transformation Assessment 360°',
  auditId: 'KOS-ETA360-2026-06-26-001',
  blocsTotal: 5,
  actionsP0Total: 15,
  budgetTotal: '275 800 000 FCFA',
  budget12m: '146 100 000 FCFA',
  horizon: '12 mois (Juillet 2026 — Juin 2027)',
  scoreMoyenActuel: 60,
  scoreMoyenCible: 93,
  progressionGlobale: 0,
  referentiels: 'ISO 27001 · ISO 42001 · EU AI Act · GAFI · NIST CSF · OWASP · COBIT · TOGAF',
  prioriteAbsolue: 'Bloc Alpha (Sécurité & Conformité) — conditionne tous les autres blocs',
  risqueCouvert: '15 risques sur 15 identifiés dans l\'audit 360°',
  gouvernance: 'Comité de Pilotage P0 hebdomadaire — Managing Partner + CTO + RSSI + CCO + Growth Director',
};

export function computeP0ExecutionKPIs() {
  const blocs = P0_EXECUTION_BLOCKS;
  const allActions = blocs.flatMap(b => b.actions);
  const actionsNonDemarre = allActions.filter(a => a.statut === 'non_demarre').length;
  const actionsEnCours = allActions.filter(a => a.statut === 'en_cours').length;
  const actionsTerminees = allActions.filter(a => a.statut === 'termine').length;
  const actionsBloquees = allActions.filter(a => a.statut === 'bloque').length;
  const progressionGlobale = allActions.length > 0
    ? Math.round(allActions.reduce((s, a) => s + a.progression, 0) / allActions.length)
    : 0;
  const blocsNonDemarre = blocs.filter(b => b.statutGlobal === 'non_demarre').length;
  const blocsEnCours = blocs.filter(b => b.statutGlobal === 'en_cours').length;
  const blocsTermines = blocs.filter(b => b.statutGlobal === 'termine').length;

  return {
    blocs_total: blocs.length,
    actions_total: allActions.length,
    actions_non_demarre: actionsNonDemarre,
    actions_en_cours: actionsEnCours,
    actions_terminees: actionsTerminees,
    actions_bloquees: actionsBloquees,
    progression_globale: progressionGlobale,
    blocs_non_demarre: blocsNonDemarre,
    blocs_en_cours: blocsEnCours,
    blocs_termines: blocsTermines,
    budget_total: '275 800 000 FCFA',
    budget_12m: '146 100 000 FCFA',
  };
}



