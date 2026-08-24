// ============================================================
// KOS PHASE 1 P0 IMMEDIATE — 9 Actions Critiques
// Exécution immédiate · 4 Sprints · 90 jours
// Version 2026.06.26 — PHASE 1 LANCEMENT
// ============================================================

export interface P0Action {
  id: string;
  axeId: string;
  axeNom: string;
  action: string;
  description: string;
  effort: string;
  budget: string;
  responsable: string;
  kpi: string;
  standardVise: string;
  deadline: string;
  statut: 'a_faire' | 'en_cours' | 'termine' | 'bloque';
  progression: number;
  livrable: string;
  pourquoiAction: string;
  dependances: string[];
  sprint: number;
  etapes: P0Etape[];
  journal: P0JournalEntry[];
}

export interface P0Etape {
  nom: string;
  description: string;
  statut: 'pending' | 'active' | 'done';
  progression: number;
}

export interface P0JournalEntry {
  date: string;
  type: 'info' | 'success' | 'warning' | 'blocker';
  message: string;
}

export interface SprintInfo {
  numero: number;
  nom: string;
  periode: string;
  jours: number;
  actions: string[];
  objectif: string;
  couleur: string;
  progression: number;
  statut: 'a_venir' | 'en_cours' | 'termine';
}

export const P0_ACTIONS: P0Action[] = [
  {
    id: 'MKT-A01',
    axeId: 'axe-marche',
    axeNom: 'Marché & Positionnement',
    action: 'Cartographier les besoins du marché Afrique francophone',
    description: 'Étude de marché approfondie : analyse des besoins par pays (UEMOA, CEMAC, RDC, Maghreb), par secteur (banques, SFD, fintechs, États), et par taille d\'entreprise. Identification des lacunes des cabinets traditionnels. Publication d\'un rapport public de positionnement.',
    effort: '120h',
    budget: '6 000 000 FCFA',
    responsable: 'Growth Director + Intelligence Center',
    kpi: 'Rapport de marché 100+ pages publié, 5 segments documentés, 3 personas calibrés',
    standardVise: 'Market Research Best Practices',
    deadline: '2026-09-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Rapport d\'étude de marché + Personas + Matrice besoins/offres',
    pourquoiAction: 'Sans cartographie précise, KOS cible tout le monde = ne cible personne. Une étude documentée positionne KOS comme l\'autorité de référence sur son propre marché.',
    dependances: [],
    sprint: 1,
    etapes: [
      { nom: 'Collecte données pays (UEMOA, CEMAC, RDC, Maghreb)', description: 'Agrégation données macro, réglementaires, sectorielles par pays', statut: 'pending', progression: 0 },
      { nom: 'Analyse sectorielle (banques, SFD, fintechs, États, PME)', description: 'Profiling besoins, lacunes, tendances par secteur', statut: 'pending', progression: 0 },
      { nom: 'Identification lacunes cabinets traditionnels', description: 'Benchmark concurrentiel, angles morts Big Four et locaux', statut: 'pending', progression: 0 },
      { nom: 'Construction personas et matrice besoins/offres', description: '3 personas calibrés, mapping besoins → offres KOS', statut: 'pending', progression: 0 },
      { nom: 'Rédaction et publication rapport', description: 'Document 100+ pages, design professionnel, diffusion', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'MKT-A02',
    axeId: 'axe-marche',
    axeNom: 'Marché & Positionnement',
    action: 'Formaliser le positionnement "Cabinet de Conseil Augmenté"',
    description: 'Rédaction du document de positionnement stratégique : Khepra Experts = hybride entre l\'excellence méthodologique Big Four et la puissance d\'un Think Tank automatisé. Différenciateurs clés : réactivité immédiate, données locales exclusives, coût optimisé.',
    effort: '80h',
    budget: '3 000 000 FCFA',
    responsable: 'Managing Partner + Marketing Director',
    kpi: 'Document de positionnement validé COMEX, message clé décliné sur tous les supports',
    standardVise: 'Strategic Positioning / Porter',
    deadline: '2026-10-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Document de positionnement + Pitch deck + Messages clés par segment',
    pourquoiAction: 'Le positionnement actuel est flou. Sans positionnement clair, le marketing est dilué et la proposition de valeur invisible.',
    dependances: ['MKT-A01'],
    sprint: 2,
    etapes: [
      { nom: 'Analyse positionnement actuel et concurrence', description: 'Audit image de marque, perception marché, benchmark', statut: 'pending', progression: 0 },
      { nom: 'Définition ADN Khepra Experts', description: 'Valeurs, mission, vision, différenciateurs', statut: 'pending', progression: 0 },
      { nom: 'Rédaction document positionnement stratégique', description: 'Document 30+ pages formalisé', statut: 'pending', progression: 0 },
      { nom: 'Création pitch deck et messages par segment', description: 'Deck COMEX, messages clés Gouvernements/Grandes Entreprises/PME', statut: 'pending', progression: 0 },
      { nom: 'Validation COMEX et déclinaison supports', description: 'Validation formelle, déclinaison site, brochures, commerciaux', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SEO-A01',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'Optimisation GEO — Structurer le site comme source primaire pour IA',
    description: 'Optimisation Generative Engine : données structurées JSON-LD exhaustives (Dataset, Article, FAQ, HowTo, Organization), contenu factuel avec citations vérifiables, entités Knowledge Graph, statistiques originales, méthodologie documentée.',
    effort: '200h',
    budget: '5 000 000 FCFA',
    responsable: 'SEO Director + Content Director',
    kpi: '300+ entités KG, 200+ featured snippets, citations IA +150%',
    standardVise: 'Google GEO / Schema.org',
    deadline: '2027-01-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Audit GEO + Plan optimisation + JSON-LD exhaustif + Dashboard citations IA',
    pourquoiAction: 'La GEO est le nouveau SEO. Les décideurs utilisent ChatGPT/Perplexity pour leurs recherches. Sans GEO, KOS est invisible sur ces canaux émergents.',
    dependances: [],
    sprint: 1,
    etapes: [
      { nom: 'Audit GEO complet du site existant', description: 'Scan 600+ pages, identification gaps JSON-LD, entités KG', statut: 'pending', progression: 0 },
      { nom: 'Déploiement JSON-LD exhaustif', description: 'Dataset, Article, FAQ, HowTo, Organization sur toutes les pages', statut: 'pending', progression: 0 },
      { nom: 'Enrichissement Knowledge Graph', description: '300+ entités, relations sémantiques, citations croisées', statut: 'pending', progression: 0 },
      { nom: 'Contenu factuel + méthodologie documentée', description: 'Statistiques originales, sources vérifiables, méthodologie par article', statut: 'pending', progression: 0 },
      { nom: 'Dashboard citations IA et suivi', description: 'Monitoring citations ChatGPT, Perplexity, Claude, Google SGE', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SEO-A02',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'Standardiser contenu niveau EEAT — Auteurs, Méthodologie, Sources',
    description: 'Chaque article/blog doit inclure : profil auteur vérifié (Expertise), méthodologie claire (Expérience), citations textes de lois/normes ISO (Autorité), dates de mise à jour (Trust). Relecture systématique de tous les contenus existants.',
    effort: '240h',
    budget: '3 500 000 FCFA',
    responsable: 'Content Director + Quality Assurance',
    kpi: '100% contenus conformes EEAT, 4.5+ étoiles qualité, 0 contenu non sourcé',
    standardVise: 'Google EEAT / Big Four Editorial',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Guide EEAT + Audit 600+ pages + Corrections + Dashboard qualité contenu',
    pourquoiAction: 'Google EEAT est le facteur de classement #1 pour les contenus YMYL (réglementaire). Sans EEAT, impossible de ranker sur les requêtes à forte valeur.',
    dependances: ['SEO-A01'],
    sprint: 2,
    etapes: [
      { nom: 'Rédaction guide éditorial EEAT KOS', description: 'Standards, templates, checklist qualité par type de contenu', statut: 'pending', progression: 0 },
      { nom: 'Création profils auteurs vérifiés', description: 'Bio, photo, credentials, linkedIn, publications', statut: 'pending', progression: 0 },
      { nom: 'Audit 600+ pages existantes', description: 'Scan qualité, gaps EEAT, priorisation corrections', statut: 'pending', progression: 0 },
      { nom: 'Correction prioritaire — pages stratégiques', description: 'Refonte top 50 pages avec EEAT complet', statut: 'pending', progression: 0 },
      { nom: 'Dashboard qualité contenu automatisé', description: 'Scoring temps réel, alertes non-conformité, rapports', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SEO-A04',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'Core Web Vitals — 100% Excellent sur toutes les pages',
    description: 'Optimisation systématique pour atteindre LCP < 1.5s, INP < 50ms, CLS < 0.05 sur 100% des pages. Optimisation images WebP/AVIF, lazy loading, code splitting, edge caching, font optimization.',
    effort: '180h',
    budget: '3 000 000 FCFA',
    responsable: 'CTO + Lead Dev Frontend',
    kpi: '100% pages CWV Excellent, LCP < 1.5s, INP < 50ms, CLS < 0.05',
    standardVise: 'Google CWV / Lighthouse',
    deadline: '2027-03-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Dashboard CWV 100% + Rapport optimisation + Plan maintenance',
    pourquoiAction: 'En Afrique où la connectivité est hétérogène, la performance est encore plus critique. CWV Excellent = top 1% mondial, avantage compétitif massif.',
    dependances: [],
    sprint: 1,
    etapes: [
      { nom: 'Audit CWV 600+ pages', description: 'Lighthouse batch, identification pages critiques, priorités', statut: 'pending', progression: 0 },
      { nom: 'Optimisation images (WebP/AVIF + lazy loading)', description: 'Conversion batch, responsive images, lazy loading natif', statut: 'pending', progression: 0 },
      { nom: 'Code splitting + bundle optimization', description: 'Tree shaking, dynamic imports, chunk stratégie', statut: 'pending', progression: 0 },
      { nom: 'Edge caching + font optimization', description: 'Cache headers, CDN config, font-display swap, subset', statut: 'pending', progression: 0 },
      { nom: 'Dashboard CWV continu + alerting', description: 'Monitoring temps réel, alertes dégradation, rapports hebdo', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SEO-A05',
    axeId: 'axe-seo-geo',
    axeNom: 'Marketing Digital & SEO/GEO',
    action: 'GSC Zéro Erreur — Tolérance Zéro 5xx/4xx + Indexation Instantanée',
    description: 'Nettoyage complet GSC : zéro erreur serveur, zéro redirection défectueuse. Intégration Google Indexing API pour indexation instantanée dès qu\'une étude est générée par KOS.',
    effort: '100h',
    budget: '1 500 000 FCFA',
    responsable: 'CTO + SEO Director',
    kpi: '0 erreur GSC, indexation < 5min après publication, couverture 100%',
    standardVise: 'Google Indexing API / GSC',
    deadline: '2026-12-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'GSC Dashboard clean + Intégration Indexing API + Monitoring alertes',
    pourquoiAction: 'Les erreurs GSC = perte de ranking immédiate. L\'indexation instantanée = avantage concurrentiel quand KOS publie des études exclusives.',
    dependances: ['SEO-A04'],
    sprint: 3,
    etapes: [
      { nom: 'Audit GSC — identification toutes erreurs', description: 'Scan 5xx, 4xx, redirect chains, soft 404, couverture', statut: 'pending', progression: 0 },
      { nom: 'Correction batch — zéro erreur', description: 'Fix serveur, redirections, pages orphelines, canonical', statut: 'pending', progression: 0 },
      { nom: 'Intégration Google Indexing API', description: 'API key, workflow automatique, test batch', statut: 'pending', progression: 0 },
      { nom: 'Pipeline indexation instantanée', description: 'Trigger publication → Indexing API, suivi statut', statut: 'pending', progression: 0 },
      { nom: 'Dashboard GSC + alerting temps réel', description: 'Monitoring continu, alertes immédiates, rapport couverture', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SYS-A01',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'Optimiser couche Supabase — Async, Cache Redis, PG Vectoriel local',
    description: 'Migration des requêtes lourdes vers processus asynchrones avec queue management. Implémentation cache Redis multi-niveaux pour éviter requêtes répétitives. Optimisation PG vectoriel pour recherche sémantique locale.',
    effort: '200h',
    budget: '12 000 000 FCFA',
    responsable: 'CTO + Data Architect',
    kpi: 'Latence P95 -60%, hit ratio cache > 80%, 0 timeout sur requêtes complexes',
    standardVise: 'PostgreSQL / Redis Best Practices',
    deadline: '2026-12-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Architecture async + Cluster Redis + Dashboard performance DB + Plan migration',
    pourquoiAction: 'Les timeouts et les requêtes répétitives dégradent l\'expérience utilisateur et gaspillent des ressources. L\'optimisation DB est le socle de toute l\'architecture.',
    dependances: [],
    sprint: 1,
    etapes: [
      { nom: 'Audit performance DB — requêtes lentes, hotspots', description: 'pg_stat_statements, explain analyze, index missing', statut: 'pending', progression: 0 },
      { nom: 'Mise en place queue management async', description: 'pg-boss / bull queue, workers dédiés, retry logic', statut: 'pending', progression: 0 },
      { nom: 'Déploiement cache Redis multi-niveaux', description: 'Cache L1 (mémoire) + L2 (Redis), invalidation intelligente', statut: 'pending', progression: 0 },
      { nom: 'Optimisation PG vectoriel local', description: 'Index ivfflat/hnsw, dimension tuning, batch embedding', statut: 'pending', progression: 0 },
      { nom: 'Dashboard performance DB + alerting', description: 'Latence, hit ratio, timeouts, slow queries monitoring', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'SYS-A06',
    axeId: 'axe-maturite',
    axeNom: 'Maturité Système KOS',
    action: 'Qualité livrables 100% Big Four — MECE, ISO, Taxonomie réglementaire',
    description: 'Intégration dans le prompt-engineering KOS : frameworks MECE, référentiels ISO (9001, 27001, 31000), taxonomie Observatoire économique. Relecture systématique des livrables par un agent Quality Controller.',
    effort: '160h',
    budget: '7 000 000 FCFA',
    responsable: 'AI Director + Quality Manager + Knowledge Manager',
    kpi: 'Score qualité livrables > 90/100, conformité MECE 100%, citations ISO vérifiées',
    standardVise: 'MECE / ISO 9001 / ISO 31000',
    deadline: '2027-01-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Quality Controller agent + Base frameworks MECE/ISO + Dashboard qualité livrables',
    pourquoiAction: 'Les livrables KOS doivent systématiquement égaler le standard Big Four. Sans cadre MECE + ISO + taxonomie, la qualité est inégale.',
    dependances: [],
    sprint: 2,
    etapes: [
      { nom: 'Construction base frameworks MECE + ISO', description: 'Documentation MECE, ISO 9001 clauses, ISO 31000 risk, taxonomie', statut: 'pending', progression: 0 },
      { nom: 'Intégration prompt-engineering KOS', description: 'System prompts enrichis, templates livrables, règles qualité', statut: 'pending', progression: 0 },
      { nom: 'Développement Quality Controller agent', description: 'Agent dédié relecture, scoring MECE, vérification ISO', statut: 'pending', progression: 0 },
      { nom: 'Calibration sur 50 livrables témoins', description: 'Benchmark qualité, ajustement scoring, validation COMEX', statut: 'pending', progression: 0 },
      { nom: 'Dashboard qualité + boucle amélioration continue', description: 'Scoring temps réel, tendances, alertes qualité insuffisante', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  {
    id: 'UX-A01',
    axeId: 'axe-uiux',
    axeNom: 'UI/UX & Conversion',
    action: 'Refonte design premium — Minimalisme Big Four + Design System V1',
    description: 'Refonte complète de l\'identité visuelle : sobriété, espaces blancs généreux, typographie institutionnelle (Inter, DM Sans), palette premium. Design system 100+ composants réutilisables. Micro-interactions fluides.',
    effort: '200h',
    budget: '4 000 000 FCFA',
    responsable: 'Lead Dev Frontend + Creative Director',
    kpi: 'Score design > 90/100, composants 100% réutilisables, guide de style documenté',
    standardVise: 'Material Design 3 / Apple HIG',
    deadline: '2026-11-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Design system + Storybook + Guide de style + Composants Premium + Templates',
    pourquoiAction: 'La première impression visuelle = confiance institutionnelle. Un design Big Four inspire immédiatement crédibilité et professionnalisme.',
    dependances: [],
    sprint: 1,
    etapes: [
      { nom: 'Audit design existant + moodboard Big Four', description: 'Analyse UI actuelle, benchmark McKinsey/BCG/Bain, inspiration', statut: 'pending', progression: 0 },
      { nom: 'Définition palette, typographie, spacing system', description: 'Tokens design, échelle typographique, grille spacing', statut: 'pending', progression: 0 },
      { nom: 'Design System V1 — 100+ composants', description: 'Atoms, molecules, organisms, templates, documentation', statut: 'pending', progression: 0 },
      { nom: 'Storybook + Guide de style interactif', description: 'Documentation interactive, guidelines, exemples', statut: 'pending', progression: 0 },
      { nom: 'Intégration progressive pages clés', description: 'Homepage, services, blog — migration design system', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
];

export const P0_SPRINTS: SprintInfo[] = [
  {
    numero: 1,
    nom: 'Socle Fondateur',
    periode: '03 Juillet — 28 Juillet 2026',
    jours: 25,
    actions: ['MKT-A01', 'SEO-A01', 'SEO-A04', 'SYS-A01', 'UX-A01'],
    objectif: 'Poser les fondations : cartographie marché, GEO, CWV, optimisation DB, Design System',
    couleur: 'primary',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 2,
    nom: 'Qualité & Positionnement',
    periode: '31 Juillet — 25 Août 2026',
    jours: 25,
    actions: ['MKT-A02', 'SEO-A02', 'SYS-A06'],
    objectif: 'Formaliser le positionnement, standardiser la qualité contenu et livrables',
    couleur: 'accent',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 3,
    nom: 'Performance & Intégration',
    periode: '28 Août — 22 Septembre 2026',
    jours: 25,
    actions: ['SEO-A05'],
    objectif: 'Zéro erreur GSC, Indexation Instantanée, intégration continue',
    couleur: 'secondary',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 4,
    nom: 'Validation & Déploiement',
    periode: '25 Septembre — 30 Septembre 2026',
    jours: 6,
    actions: [],
    objectif: 'Revue finale COMEX, validation des 9 actions, déploiement production',
    couleur: 'emerald',
    progression: 0,
    statut: 'a_venir',
  },
];

export const P0_PHASE1_META = {
  titre: 'Phase 1 Immédiate (P0) — 9 Actions Critiques',
  version: 'v1.0 LANCEMENT — 2026.06.26',
  actionsTotal: 9,
  budgetTotal: '45 000 000 FCFA',
  horizon: '90 jours (Juillet — Septembre 2026)',
  gouvernance: 'COMEX Hebdomadaire — Managing Partner + CTO + Growth Director + SEO Director + Creative Director',
  messageCle: 'La Phase 1 P0 lance l\'exécution immédiate des 9 actions critiques identifiées par l\'Audit Final. En 90 jours : positionnement formalisé, GEO lancée, CWV 100%, GSC zéro erreur, optimisation DB, qualité MECE/ISO, Design System V1. Budget : 45M FCFA. C\'est le point de bascule vers l\'excellence Big Four.',
  risquePrincipal: 'Le principal risque est la dispersion. 9 actions simultanées sur 4 axes nécessitent une coordination IRONCLAD. Le COMEX hebdomadaire est non-négociable.',
  jalonFinal: '30 Septembre 2026 — Démo COMEX : les 9 actions P0 livrées et validées.',
};

export function computeP0KPIs() {
  const actions = P0_ACTIONS;
  const total = actions.length;

  const aFaire = actions.filter(a => a.statut === 'a_faire').length;
  const enCours = actions.filter(a => a.statut === 'en_cours').length;
  const termine = actions.filter(a => a.statut === 'termine').length;
  const bloque = actions.filter(a => a.statut === 'bloque').length;

  const progressionGlobale = Math.round(actions.reduce((s, a) => s + a.progression, 0) / total);

  const sprintActuel = P0_SPRINTS.find(s => s.statut === 'en_cours') || P0_SPRINTS[0];

  return {
    actions_total: total,
    a_faire: aFaire,
    en_cours: enCours,
    termine,
    bloque,
    progression_globale: progressionGlobale,
    budget_total: '45 000 000 FCFA',
    sprints_actifs: P0_SPRINTS.filter(s => s.statut === 'en_cours').length,
    sprint_actuel: sprintActuel,
  };
}

export function getSprintActions(sprintNum: number): P0Action[] {
  const sprintActionIds = P0_SPRINTS.find(s => s.numero === sprintNum)?.actions || [];
  return P0_ACTIONS.filter(a => sprintActionIds.includes(a.id));
}





