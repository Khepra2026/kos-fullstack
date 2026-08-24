// ============================================================
// KOS PHASE 3 — Expansion & Domination Continentale
// MKT-A06 + 7 Nouvelles Actions Stratégiques
// 8 Actions · 3 Sprints · 150 jours · 28.5M FCFA
// Version 2026.06.26 — AU-DELÀ DU CORRECTIF
// ============================================================

export interface P3Action {
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
  etapes: P3Etape[];
  journal: P3JournalEntry[];
}

export interface P3Etape {
  nom: string;
  description: string;
  statut: 'pending' | 'active' | 'done';
  progression: number;
}

export interface P3JournalEntry {
  date: string;
  type: 'info' | 'success' | 'warning' | 'blocker';
  message: string;
}

export interface P3SprintInfo {
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

export const P3_ACTIONS: P3Action[] = [
  // ===== MKT-A06 : Baromètre trimestriel (P2 hérité de l'audit) =====
  {
    id: 'MKT-A06',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Créer le Baromètre de Confiance Trimestriel — Indice KOS du climat réglementaire',
    description: 'Produit média flagship : baromètre trimestriel de la confiance des dirigeants dans le climat réglementaire africain. Enquête panel 200+ décideurs (DG, DAF, DFC, Risk Managers) dans 12 pays UEMOA/CEMAC. Publication médiatique avec data visualisations, executive summary, et conférence de presse trimestrielle.',
    effort: '100h',
    budget: '2 000 000 FCFA',
    responsable: 'Marketing Director + Intelligence Center',
    kpi: '4 éditions/an, 200+ répondants panel, 5+ reprises presse/trimestre, NPS panel > 70',
    standardVise: 'Barometer / Survey Methodology / ISO 20252',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Plateforme baromètre + Panel 200+ décideurs + 1ère édition + Kit presse + Data visualisations',
    pourquoiAction: 'Dernière action P2 de l\'Audit Final. Un baromètre propriétaire = outil de visibilité médiatique et de crédibilité institutionnelle. McKinsey a son Global Institute, KOS aura son Baromètre — c\'est l\'actif de marque ultime pour la domination.',
    dependances: ['MKT-A04'],
    sprint: 1,
    etapes: [
      { nom: 'Design méthodologique baromètre', description: 'Questionnaire, échantillonnage 200+ décideurs, méthodologie ISO 20252', statut: 'pending', progression: 0 },
      { nom: 'Constitution panel décideurs', description: 'Recrutement 200+ DG/DAF/DFC 12 pays, incentives, rétention', statut: 'pending', progression: 0 },
      { nom: 'Plateforme collecte + analyse', description: 'Outil survey, dashboard analyse, data visualisations auto', statut: 'pending', progression: 0 },
      { nom: '1ère édition + lancement médiatique', description: 'Publication Q1 2027, communiqué presse, outreach médias, kit presse', statut: 'pending', progression: 0 },
      { nom: 'Automatisation pipeline trimestriel', description: 'Workflow récurrent, dashboard KPIs, boucle amélioration continue', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A01 : Expansion géographique Afrique de l'Est =====
  {
    id: 'EXP-A01',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Expansion géographique — Observatoire Afrique de l\'Est & Australe',
    description: 'Extension de l\'Observatoire Réglementaire Africain au-delà de la zone UEMOA/CEMAC vers l\'Afrique de l\'Est (Kenya, Tanzanie, Ouganda, Rwanda) et Australe (Afrique du Sud, Botswana, Namibie). Recrutement correspondants locaux, traduction anglais, couverture nouveaux régulateurs.',
    effort: '200h',
    budget: '5 000 000 FCFA',
    responsable: 'Knowledge Manager + Africa Director',
    kpi: '5+ nouveaux pays couverts, 20+ publications/an zone Est/Australe, 3 correspondants locaux',
    standardVise: 'Think Tank Multinational / Pan-African Coverage',
    deadline: '2027-09-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Observatoire étendu 5+ pays + Recrutement correspondants + Publications inaugurales + Dashboard multi-pays',
    pourquoiAction: 'La domination continentale exige une couverture panafricaine. L\'Afrique de l\'Est et Australe sont les prochains hubs de croissance réglementaire. KOS doit y être avant la concurrence.',
    dependances: ['MKT-A04'],
    sprint: 1,
    etapes: [
      { nom: 'Cartographie réglementaire Afrique de l\'Est/Australe', description: 'Identification régulateurs, textes clés, enjeux par pays', statut: 'pending', progression: 0 },
      { nom: 'Recrutement correspondants locaux', description: '3 correspondants (Nairobi, Johannesburg, Kigali), onboarding', statut: 'pending', progression: 0 },
      { nom: 'Adaptation plateforme observatoire', description: 'Traduction anglais, nouveaux régulateurs, filtres pays étendus', statut: 'pending', progression: 0 },
      { nom: '10 publications inaugurales', description: 'Analyses flagship Est/Australe, partenariats médias locaux', statut: 'pending', progression: 0 },
      { nom: 'Dashboard multi-pays consolidé', description: 'KPIs par zone, comparaisons inter-régionales, tendances panafricaines', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A02 : Certification ISO formelle =====
  {
    id: 'EXP-A02',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Certification ISO 9001 & ISO 27001 formelle — Khepra Experts certifié',
    description: 'Lancement du processus de certification ISO 9001 (Qualité) et ISO 27001 (Sécurité de l\'information) avec un organisme certificateur accrédité. Audit externe, mise en conformité, obtention des certificats. Affichage sur le site et tous les supports.',
    effort: '240h',
    budget: '8 000 000 FCFA',
    responsable: 'Quality Manager + CTO + Managing Partner',
    kpi: 'Certificats ISO 9001 + 27001 obtenus, 0 non-conformité majeure, délai < 12 mois',
    standardVise: 'ISO 9001:2015 / ISO 27001:2022',
    deadline: '2027-12-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Certificats ISO 9001 + 27001 + Documentation SMSI/SMQ + Rapport audit externe',
    pourquoiAction: 'La certification ISO formelle est le différenciateur ultime vs cabinets locaux. Aucun cabinet de conseil africain de cette taille n\'a la double certification. C\'est le ticket d\'entrée pour les appels d\'offres bailleurs de fonds.',
    dependances: ['SYS-A05'],
    sprint: 2,
    etapes: [
      { nom: 'Diagnostic initial — gap analysis ISO 9001 + 27001', description: 'Audit interne, identification écarts, plan d\'action', statut: 'pending', progression: 0 },
      { nom: 'Mise en conformité SMQ (ISO 9001)', description: 'Politique qualité, procédures, manuel qualité, indicateurs', statut: 'pending', progression: 0 },
      { nom: 'Mise en conformité SMSI (ISO 27001)', description: 'Politique sécurité, analyse risques, SoA, contrôles', statut: 'pending', progression: 0 },
      { nom: 'Audit à blanc + corrections', description: 'Pré-audit, correction non-conformités, ajustements', statut: 'pending', progression: 0 },
      { nom: 'Audit de certification + obtention certificats', description: 'Audit externe organisme accrédité, obtention, communication', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A03 : Partenariats Stratégiques Continentaux =====
  {
    id: 'EXP-A03',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Programme Partenariats Stratégiques Continentaux — 10 alliances clés',
    description: 'Identification et signature de 10 partenariats stratégiques : cabinets d\'avocats africains, associations professionnelles (APBEF, FAPAC), institutions régionales (BCEAO, BEAC, COBAC), think tanks, universités. Co-création de contenu, co-organisation d\'événements, référencement croisé.',
    effort: '160h',
    budget: '3 500 000 FCFA',
    responsable: 'Managing Partner + Partnership Director',
    kpi: '10 partenariats signés, 5 événements co-organisés/an, 20+ co-publications/an',
    standardVise: 'Strategic Alliances / Co-Branding',
    deadline: '2027-09-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Accords 10 partenaires + Programme événements conjoints + Dashboard partenariats',
    pourquoiAction: 'Les partenariats stratégiques démultiplient la portée sans coût proportionnel. Un réseau de 10 alliés institutionnels = crédibilité instantanée + canaux de distribution + backlinks autorité.',
    dependances: ['MKT-A02'],
    sprint: 2,
    etapes: [
      { nom: 'Cartographie partenaires cibles', description: 'Identification 20+ cibles, scoring pertinence, priorisation top 10', statut: 'pending', progression: 0 },
      { nom: 'Démarches et négociations', description: 'Approche, présentation KOS, proposition valeur, négociation termes', statut: 'pending', progression: 0 },
      { nom: 'Signature accords + protocoles', description: 'MOU/accords formels, protocoles co-branding, co-publication', statut: 'pending', progression: 0 },
      { nom: 'Lancement 5 événements conjoints', description: 'Webinaires, conférences, masterclass — co-produits avec partenaires', statut: 'pending', progression: 0 },
      { nom: 'Dashboard partenariats + ROI', description: 'KPIs par partenaire, leads générés, visibilité, revue trimestrielle', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A04 : KOS Academy =====
  {
    id: 'EXP-A04',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'KOS Academy — Programme de formation certifiante en conformité réglementaire',
    description: 'Lancement d\'une académie de formation en ligne : modules certifiants sur la conformité BCEAO, COBAC, GAFI, OHADA, ISO. Certification délivrée par Khepra Experts. Pricing B2B (entreprises) et B2C (professionnels). 10 premiers modules.',
    effort: '280h',
    budget: '6 000 000 FCFA',
    responsable: 'Knowledge Manager + Learning Director + CTO',
    kpi: '10 modules live, 200+ apprenants/an 1, NPS formation > 80, revenus 15M+/an',
    standardVise: 'EdTech / Andragogie / Certification Professionnelle',
    deadline: '2027-12-31',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Plateforme LMS KOS Academy + 10 modules + Certification + Dashboard apprenants',
    pourquoiAction: 'La formation = 3ème pilier de revenus (Conseil + Observatoire + Academy). Capitalise sur l\'expertise KOS existante, crée un funnel de leads qualifiés, et positionne KOS comme l\'autorité formatrice de référence.',
    dependances: [],
    sprint: 2,
    etapes: [
      { nom: 'Design programme — 10 modules', description: 'Curriculum conformité, objectifs pédagogiques, certification framework', statut: 'pending', progression: 0 },
      { nom: 'Production contenus modules', description: 'Vidéos, slides, exercices, quiz, études de cas par module', statut: 'pending', progression: 0 },
      { nom: 'Plateforme LMS KOS Academy', description: 'Déploiement plateforme, auth, tracking progression, certificats auto', statut: 'pending', progression: 0 },
      { nom: 'Lancement B2B pilote — 5 entreprises', description: 'Offre entreprise, pilote 5 clients, feedback, ajustements', statut: 'pending', progression: 0 },
      { nom: 'Ouverture B2C + marketing', description: 'Site public, pricing, campagne lancement, funnel inscription', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A05 : KOS Regulatory Summit Africa =====
  {
    id: 'EXP-A05',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'KOS Regulatory Summit Africa — Conférence annuelle de référence',
    description: 'Création d\'un événement annuel flagship : le KOS Regulatory Summit Africa. 2 jours de conférences, keynotes régulateurs, panels experts, masterclasses. 300+ participants. Format hybride (présentiel Abidjan/Douala + streaming). Publication des Actes.',
    effort: '200h',
    budget: '4 000 000 FCFA',
    responsable: 'Managing Partner + Marketing Director + Events Manager',
    kpi: '300+ participants, 15+ intervenants régulateurs, 10+ sponsors, NPS > 80',
    standardVise: 'Event Management / MICE',
    deadline: '2027-11-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Summit 1ère édition + Actes + Captation vidéo + Dashboard participants + Sponsors',
    pourquoiAction: 'Un événement propriétaire = positionnement Think Tank ultime. Attire médias, régulateurs, décideurs. Crée un actif de marque annuel et un funnel de networking commercial inégalable.',
    dependances: ['EXP-A03'],
    sprint: 3,
    etapes: [
      { nom: 'Concept & programmation', description: 'Thème, format, agenda 2 jours, identification speakers régulateurs', statut: 'pending', progression: 0 },
      { nom: 'Logistique & production', description: 'Lieu, streaming, captation, traduction, catering, branding', statut: 'pending', progression: 0 },
      { nom: 'Sponsoring & commercialisation', description: 'Packs sponsors, billetterie early bird, partenariats médias', statut: 'pending', progression: 0 },
      { nom: 'Marketing & communication', description: 'Site événement, campagne email/LinkedIn, RP, media partnerships', statut: 'pending', progression: 0 },
      { nom: 'Exécution Summit + Post-production', description: 'Événement live, captation, Actes, montage vidéo, remerciements', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A06 : Expansion commerciale =====
  {
    id: 'EXP-A06',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Expansion commerciale — Recrutement Business Developers par zone',
    description: 'Structuration d\'une force commerciale dédiée : 3 Business Developers (UEMOA, CEMAC, International). CRM avancé, playbooks commerciaux, commissionnement, objectifs trimestriels. Pipeline commercial structuré avec KOS Closing Engine.',
    effort: '160h',
    budget: '3 000 000 FCFA',
    responsable: 'Growth Director + Managing Partner',
    kpi: '3 BD recrutés, pipeline 50+ opportunités qualifiées, +30% CA an 1',
    standardVise: 'B2B Sales Excellence / MEDDIC',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Équipe commerciale 3 BD + Playbooks + CRM structuré + Dashboard pipeline',
    pourquoiAction: 'KOS a le produit, le contenu, la crédibilité — il manque la force de vente dédiée pour convertir. 3 Business Developers = capacité à signer 15-20 mandats/an vs 5-8 actuellement.',
    dependances: ['MKT-A03'],
    sprint: 1,
    etapes: [
      { nom: 'Définition profils BD + recrutement', description: 'Job descriptions, chasse, sélection, 3 recrutements (UEMOA, CEMAC, International)', statut: 'pending', progression: 0 },
      { nom: 'Playbooks commerciaux', description: 'Scripts, argumentaires, pricing, objection handling, MEDDIC', statut: 'pending', progression: 0 },
      { nom: 'CRM + pipeline management', description: 'HubSpot/Salesforce setup, pipeline stages, automatisation relances', statut: 'pending', progression: 0 },
      { nom: 'Onboarding + formation', description: 'Formation KOS, offres, cibles, outils, shadowing missions', statut: 'pending', progression: 0 },
      { nom: 'Dashboard commercial + commissionnement', description: 'KPIs individuels, tableau de bord, plan commission, revues hebdo', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
  // ===== EXP-A07 : Dashboard Exécutif Consolidé =====
  {
    id: 'EXP-A07',
    axeId: 'axe-expansion',
    axeNom: 'Expansion & Domination',
    action: 'Dashboard Exécutif Consolidé Multi-Pays — Pilotage Expansion',
    description: 'Dashboard exécutif consolidé pour le COMEX : KPIs financiers par zone, pipeline commercial, production observatoire, trafic SEO/GEO, leads, NPS clients, revenus Academy, indicateurs baromètre. Single pane of glass pour le pilotage de l\'expansion.',
    effort: '120h',
    budget: '1 000 000 FCFA',
    responsable: 'CTO + Growth Director + Managing Partner',
    kpi: 'Dashboard live 20+ KPIs, mise à jour temps réel, utilisé en COMEX hebdo',
    standardVise: 'Executive Dashboard / BI',
    deadline: '2027-06-30',
    statut: 'a_faire',
    progression: 0,
    livrable: 'Dashboard exécutif + Intégration data sources + Rapports automatisés + Alertes',
    pourquoiAction: 'Avec 8 actions d\'expansion en parallèle, le COMEX a besoin d\'un cockpit unique pour piloter. Sans dashboard consolidé, c\'est le pilotage à vue.',
    dependances: ['MKT-A06', 'EXP-A01', 'EXP-A06'],
    sprint: 3,
    etapes: [
      { nom: 'Définition KPIs exécutifs', description: '20+ KPIs priorisés, sources data, fréquence mise à jour', statut: 'pending', progression: 0 },
      { nom: 'Intégration data sources', description: 'Connexion CRM, Analytics, production KOS, observatoire, finances', statut: 'pending', progression: 0 },
      { nom: 'Design dashboard exécutif', description: 'UI COMEX, data visualisations, filtres zone/période, drill-down', statut: 'pending', progression: 0 },
      { nom: 'Rapports automatisés', description: 'Génération PDF hebdo COMEX, envoi automatique, alertes seuils', statut: 'pending', progression: 0 },
      { nom: 'Déploiement + formation COMEX', description: 'Go-live dashboard, session formation COMEX, documentation', statut: 'pending', progression: 0 },
    ],
    journal: [],
  },
];

// ===== SPRINTS PHASE 3 =====
export const P3_SPRINTS: P3SprintInfo[] = [
  {
    numero: 1,
    nom: 'Fondations Expansion',
    periode: '01 Février — 31 Mars 2027',
    jours: 59,
    actions: ['MKT-A06', 'EXP-A01', 'EXP-A06'],
    objectif: 'Poser les fondations de l\'expansion : baromètre trimestriel, observatoire étendu, force commerciale — les 3 piliers de la croissance',
    couleur: 'primary',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 2,
    nom: 'Crédibilité & Monétisation',
    periode: '01 Avril — 31 Mai 2027',
    jours: 61,
    actions: ['EXP-A02', 'EXP-A03', 'EXP-A04'],
    objectif: 'Certification ISO formelle, partenariats stratégiques, lancement KOS Academy — crédibilité institutionnelle et nouveau pilier de revenus',
    couleur: 'accent',
    progression: 0,
    statut: 'a_venir',
  },
  {
    numero: 3,
    nom: 'Rayonnement & Pilotage',
    periode: '01 Juin — 31 Juillet 2027',
    jours: 61,
    actions: ['EXP-A05', 'EXP-A07'],
    objectif: 'KOS Regulatory Summit Africa, Dashboard Exécutif Consolidé — rayonnement continental et pilotage de la domination',
    couleur: 'emerald',
    progression: 0,
    statut: 'a_venir',
  },
];

// ===== MÉTADONNÉES PHASE 3 =====
export const P3_PHASE3_META = {
  titre: 'Phase 3 — Expansion & Domination Continentale',
  version: 'v1.0 LANCEMENT — 2026.06.26',
  actionsTotal: 8,
  budgetTotal: '32 500 000 FCFA',
  horizon: '180 jours (Février — Juillet 2027)',
  gouvernance: 'COMEX Mensuel Stratégique + Hebdo Opérationnel — Managing Partner + Growth Director + Knowledge Manager + CTO + Marketing Director',
  messageCle: 'La Phase 3 marque le basculement définitif de KOS : de la correction et l\'optimisation (Phases 1-2) vers l\'expansion et la domination continentale. 8 actions stratégiques. Budget 32.5M FCFA. À l\'issue : KOS est certifié ISO, présent dans 17+ pays africains, avec une Academy génératrice de revenus, un Summit annuel propriétaire, et un dashboard exécutif digne d\'un groupe panafricain.',
  risquePrincipal: 'L\'expansion géographique + le lancement simultané de l\'Academy et du Summit = dispersion possible des ressources. La certification ISO est le jalon de crédibilité le plus critique — tout retard impacte la crédibilité institutionnelle.',
  jalonFinal: '31 Juillet 2027 — KOS Regulatory Summit Africa 1ère édition + Dashboard Exécutif Live. KOS est un acteur panafricain certifié.',
};

// ===== FONCTIONS UTILITAIRES =====
export function computeP3KPIs() {
  const actions = P3_ACTIONS;
  const total = actions.length;

  const aFaire = actions.filter(a => a.statut === 'a_faire').length;
  const enCours = actions.filter(a => a.statut === 'en_cours').length;
  const termine = actions.filter(a => a.statut === 'termine').length;
  const bloque = actions.filter(a => a.statut === 'bloque').length;

  const progressionGlobale = Math.round(actions.reduce((s, a) => s + a.progression, 0) / total);

  const sprintActuel = P3_SPRINTS.find(s => s.statut === 'en_cours') || P3_SPRINTS[0];

  return {
    actions_total: total,
    a_faire: aFaire,
    en_cours: enCours,
    termine,
    bloque,
    progression_globale: progressionGlobale,
    budget_total_millions: 32.5,
    sprint_actuel: sprintActuel,
  };
}

export function getP3SprintActions(sprintNum: number): P3Action[] {
  const sprintActionIds = P3_SPRINTS.find(s => s.numero === sprintNum)?.actions || [];
  return P3_ACTIONS.filter(a => sprintActionIds.includes(a.id));
}





