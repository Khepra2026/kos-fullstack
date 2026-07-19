// ============================================================
// KHEPRA BUSINESS REVIEW (KBR) — Fiches de Connaissance Khepra
// Système de capitalisation éditoriale — Standard McKinsey / HBR
// ============================================================

export const FCK_001_EDITORIAL_METHODOLOGY = {
  fckId: 'FCK-001',
  title: 'Méthodologie Éditoriale Khepra Business Review (KBR)',
  version: '1.0',
  dateCreation: '2026-06-27',
  classification: 'INTERNE — Direction Éditoriale',
  domaines: ['Stratégie Éditoriale', 'Capitalisation des Connaissances', 'Gouvernance du Contenu'],

  // ── RÉFÉRENTIELS ──
  referentiel: {
    standardsInternationaux: [
      { code: 'ISO 56002:2019', titre: "Management de l'innovation — Système de management de l'innovation", usage: 'Cadre de la veille innovation et prospective éditoriale' },
      { code: 'ISO 31000:2018', titre: 'Management du risque', usage: 'Analyse des risques réglementaires et sectoriels dans les publications' },
      { code: 'ISO 37000:2021', titre: 'Gouvernance des organismes', usage: 'Référentiel gouvernance pour les analyses CA et comités spécialisés' },
      { code: 'IFRS / ISA', titre: 'Normes internationales d\'information financière et d\'audit', usage: 'Analyse des impacts financiers et due diligence' },
      { code: 'GRI / ISSB', titre: 'Global Reporting Initiative / International Sustainability Standards Board', usage: 'Cadre ESG et reporting de durabilité' },
      { code: 'GAFI 2012 (rév.)', titre: 'Recommandations du GAFI — LBC/FT/FP', usage: 'Analyse conformité LBC/FT zone UEMOA/CEMAC' },
      { code: 'Bâle III', titre: 'Comité de Bâle — Cadre prudentiel bancaire', usage: 'Analyses ratios prudentiels et solvabilité bancaire' },
    ],
    benchmarksInstitutionnels: [
      { institution: 'Banque Mondiale (IFC)', publication: 'Doing Business / Global Findex', usage: 'Données climat des affaires, inclusion financière Afrique' },
      { institution: 'BAD — Banque Africaine de Développement', publication: 'Perspectives Économiques en Afrique', usage: 'Données macro-économiques par zone UEMOA/CEMAC' },
      { institution: 'BOAD — Banque Ouest-Africaine de Développement', publication: 'Rapports annuels et sectoriels', usage: 'Financement du développement, projets infrastructuraux' },
      { institution: 'OCDE', publication: 'Principes de gouvernance G20/OCDE / BEPS', usage: 'Gouvernance, prix de transfert, fiscalité internationale' },
      { institution: 'PNUD', publication: 'Rapports sur le développement humain', usage: 'Indicateurs ESG, développement durable Afrique' },
      { institution: 'BCEAO', publication: 'Instructions, circulaires, rapports annuels CB-UMOA', usage: 'Supervision prudentielle UEMOA, ratios, agréments' },
      { institution: 'COBAC / BEAC', publication: 'Règlements COBAC, instructions BEAC', usage: 'Supervision prudentielle CEMAC, LBC/FT, gouvernance SI' },
      { institution: 'OHADA', publication: 'AUSCGIE, AUDCIF, SYSCOHADA', usage: 'Droit des sociétés, comptabilité, gouvernance corporate' },
    ],
    realitesAfriqueFrancophone: [
      'Secteur informel prédominant : 55-80% du PIB selon les pays — adapter les modèles de projection',
      'Transition numérique mobile-first : +85% de pénétration mobile vs 25% bancarisation classique',
      'Décentralisation asymétrique : disparités de capacité institutionnelle entre capitales et régions',
      'Intégration régionale progressive : ZLECAF, UEMOA, CEMAC — analyser les frictions de mise en œuvre',
      'Contrainte infrastructurelle : accès énergie 45-60%, connectivité rurale limitée',
      'Mécanismes de marché spécifiques : tontines, agents, mobile money, garanties solidaires',
      'Régimes de change : FCFA (arrimé EUR), Naira (flottant), Cedi (flottant) — impacts sur les projections',
    ],
  },

  // ── MÉTHODOLOGIE PYRAMIDE DE MINTO ──
  pyramideMinto: {
    description: "Structure chaque réponse et article en plaçant la conclusion et les recommandations stratégiques en premier. Développe ensuite les arguments, puis les données de preuve.",
    niveaux: [
      {
        niveau: 1,
        nom: 'Conclusion & Recommandations (Top)',
        description: "Le lecteur découvre immédiatement la réponse à la question qu'il se pose. Pas de suspense académique. La recommandation est explicite, chiffrée, actionnable.",
        elements: ['Résumé exécutif 5 lignes', 'Recommandation prioritaire avec impact chiffré', 'Décision attendue du lecteur'],
      },
      {
        niveau: 2,
        nom: 'Arguments Structurants (Milieu)',
        description: "Les 3-5 arguments qui soutiennent la recommandation. Chaque argument est indépendant, MECE (Mutually Exclusive, Collectively Exhaustive).",
        elements: ['3-5 piliers d\'argumentation', 'Chaque pilier autonome et vérifiable', 'Logique déductive : principe → application → implication'],
      },
      {
        niveau: 3,
        nom: 'Données de Preuve (Base)',
        description: "Les faits, chiffres, références réglementaires et cas concrets qui étayent chaque argument. Sources systématiquement citées.",
        elements: ['Données chiffrées sourcées', 'Références réglementaires exactes (article, date)', 'Cas d\'usage contextualisés', 'Benchmarks comparatifs'],
      },
    ],
    antiPatterns: [
      'Éviter le suspense académique (ne pas garder la conclusion pour la fin)',
      'Éviter le storytelling sans substance (le récit est au service des données, pas l\'inverse)',
      'Éviter les recommandations vagues ("il faut renforcer") → chiffrer, dater, responsabiliser',
    ],
  },

  // ── ANALYSE RÉTRO-PROSPECTIVE ──
  analyseRetroProspective: {
    description: "Ne pas se contenter de décrire un état de fait. Structurer l'analyse en trois temps.",
    phases: [
      {
        phase: 1,
        titre: 'Historique & Diagnostic',
        icone: 'ri-history-line',
        questions: [
          'Quelle est la trajectoire sur 5-10 ans ?',
          'Quels ont été les points de rupture (crises, réformes, innovations) ?',
          'Quel est l\'état de l\'art réglementaire actuel ?',
          'Quels écarts par rapport aux standards internationaux ?',
        ],
        livrables: ['Frise chronologique des événements clés', 'Cartographie de l\'existant', 'Gap analysis vs standards'],
      },
      {
        phase: 2,
        titre: 'Enjeux & Goulots d\'Étranglement Actuels',
        icone: 'ri-alert-line',
        questions: [
          'Quels sont les 3-5 blocages structurels ?',
          'Qui sont les acteurs en tension ?',
          'Quels risques si inaction ?',
          'Quel est le coût de l\'immobilisme ?',
        ],
        livrables: ['Matrice enjeux × criticité', 'Cartographie des parties prenantes', 'Scénario de statu quo (business as usual)'],
      },
      {
        phase: 3,
        titre: 'Scénarios Prospectifs 5 & 10 Ans',
        icone: 'ri-compass-3-line',
        questions: [
          'Scénario conservateur (probabilité 60%) : que se passe-t-il si la tendance actuelle se poursuit ?',
          'Scénario transformateur (probabilité 25%) : que se passe-t-il si les réformes clés aboutissent ?',
          'Scénario disruptif (probabilité 15%) : quel événement pourrait tout changer ?',
          'Quelles implications pour chaque catégorie d\'acteur ?',
        ],
        livrables: ['3 scénarios chiffrés avec probabilités', 'Matrice implications par acteur', 'Signaux faibles à surveiller'],
      },
    ],
  },

  // ── STANDARDS DE QUALITÉ ──
  standardsQualite: {
    description: 'Chaque publication KBR doit satisfaire 9 critères de qualité avant publication.',
    criteres: [
      { id: 'Q1', critere: 'Conclusion en premier (Pyramide Minto)', ponderation: 'Critique', verification: 'La recommandation apparaît dans les 150 premiers mots' },
      { id: 'Q2', critere: 'Triple ancrage (ISO + Institutionnel + Afrique)', ponderation: 'Critique', verification: 'Au moins 1 référence ISO, 1 benchmark institutionnel, 1 spécificité Afrique francophone' },
      { id: 'Q3', critere: 'Analyse rétro-prospective complète', ponderation: 'Majeur', verification: 'Les 3 phases sont présentes : historique, enjeux, prospectif' },
      { id: 'Q4', critere: 'Données sourcées et vérifiables', ponderation: 'Critique', verification: 'Chaque donnée chiffrée a une source, un périmètre et une date' },
      { id: 'Q5', critere: 'Recommandation actionnable', ponderation: 'Critique', verification: 'La recommandation inclut : qui, quoi, quand, combien' },
      { id: 'Q6', critere: 'Cadre normatif complet', ponderation: 'Majeur', verification: 'Références réglementaires exactes (numéro, article, date de vigueur)' },
      { id: 'Q7', critere: 'Zéro hallucination réglementaire', ponderation: 'Critique', verification: 'Aucune référence inventée — chaque texte cité est vérifiable' },
      { id: 'Q8', critere: 'Tonalité neutre et institutionnelle', ponderation: 'Standard', verification: 'Ni promotionnel, ni alarmiste — équilibre McKinsey/HBR' },
      { id: 'Q9', critere: 'FCK générée et indexée', ponderation: 'Standard', verification: 'Une Fiche de Connaissance Khepra est produite et taguée' },
    ],
  },

  // ── AUDIENCES CIBLES ──
  audiences: [
    { id: 'A1', profil: 'DG / CEO — Afrique francophone', besoins: 'Décisions stratégiques, benchmark concurrentiel, signaux faibles', ton: 'Direct, synthétique, orienté action', format: 'Synopsis Exécutif (F1)' },
    { id: 'A2', profil: 'DAF / CFO', besoins: 'Impacts financiers, ratios prudentiels, stress tests, IFRS', ton: 'Technique, chiffré, normatif', format: 'Synopsis Exécutif (F1) + Article Expert (F4)' },
    { id: 'A3', profil: 'Directeur Conformité / RCLBC/FT', besoins: 'Veille réglementaire, gap analysis, plans de remédiation', ton: 'Juridique, précis, référencé', format: 'Article Expert (F4) + FAQ (F7)' },
    { id: 'A4', profil: 'Administrateur / Président CA', besoins: 'Gouvernance, risques fiduciaires, benchmark CA', ton: 'Institutionnel, synthétique, orientation surveillance', format: 'Synopsis Exécutif (F1) + Newsletter (F6)' },
    { id: 'A5', profil: 'Investisseur / DFI', besoins: 'Due diligence, ESG, viabilité financière, risques pays', ton: 'Analytique, comparatif, orienté décision', format: 'Article Expert (F4) + Cas d\'usage' },
    { id: 'A6', profil: 'Régulateur / BCEAO / COBAC', besoins: 'Conformité systémique, analyses sectorielles, risques émergents', ton: 'Technique, neutre, prudentiel', format: 'FAQ (F7) + Article Expert (F4)' },
    { id: 'A7', profil: 'Partenaire Technique / Bailleur', besoins: 'Alignement ODD, impact développement, ESG', ton: 'Stratégique, orienté résultats, développement', format: 'Article Expert (F4) + Newsletter (F6)' },
  ],

  // ── MÉTADONNÉES D'INDEXATION KOS ──
  metaKOS: {
    tags: ['FCK', 'Méthodologie', 'Éditorial', 'KBR', 'Pyramide Minto', 'ISO', 'McKinsey', 'HBR', 'Big Four', 'Afrique francophone'],
    agentsConcernes: ['KOS Content Factory Command', 'KOS Blog Writing Automates', 'KOS Regulatory Quality Assurance Engine'],
    blocKOS: 'Bloc Editorial & Thought Leadership',
    dependances: ['editorialHub.ts', 'kbrFichesConnaissance.ts', 'blogArticles.ts'],
    prochaineRevision: '2026-09-27',
  },
};

// ============================================================
// FCK-002 — Template de Fiche de Connaissance Khepra
// Structure standardisée pour toute capitalisation
// ============================================================

export const FCK_TEMPLATE = {
  structure: {
    entete: ['fckId', 'title', 'version', 'dateCreation', 'classification', 'domaines'],
    referentiels: ['standardsInternationaux', 'benchmarksInstitutionnels', 'realitesAfriqueFrancophone'],
    corps: ['methodologie', 'donnees', 'analyses', 'recommandations'],
    meta: ['tags', 'agentsConcernes', 'blocKOS', 'dependances'],
  },
  exempleBalises: {
    fckId: 'FCK-XXX — Identifiant unique incrémental',
    classification: 'INTERNE | PUBLIC | CONFIDENTIEL',
    domaines: 'Liste des domaines KOS concernés (max 5)',
  },
};

// ============================================================
// FCK-003 — Indicateurs de Performance Éditoriale KBR
// KPIs de pilotage de la direction éditoriale
// ============================================================

export const FCK_003_KPI_EDITORIAUX = {
  fckId: 'FCK-003',
  title: 'KPIs de Pilotage Éditorial KBR',
  version: '1.0',
  dateCreation: '2026-06-27',

  kpis: {
    production: [
      { indicateur: 'Volume mensuel', cible: '8-12 publications / mois', unite: 'articles', seuilAlerte: '< 6' },
      { indicateur: 'Délai moyen de production', cible: '5 jours ouvrés', unite: 'jours', seuilAlerte: '> 8 jours' },
      { indicateur: 'Taux de respect du planning', cible: '≥ 90%', unite: '%', seuilAlerte: '< 75%' },
    ],
    qualite: [
      { indicateur: 'Score qualité Q1-Q9', cible: '≥ 8.5/10', unite: 'score', seuilAlerte: '< 7.0' },
      { indicateur: 'Taux de conformité Pyramide Minto', cible: '100%', unite: '%', seuilAlerte: '< 90%' },
      { indicateur: 'Taux d\'ancrage triple (ISO + Institutionnel + Afrique)', cible: '≥ 95%', unite: '%', seuilAlerte: '< 80%' },
      { indicateur: 'Taux de données sourcées', cible: '100%', unite: '%', seuilAlerte: '< 95%' },
      { indicateur: 'Zéro hallucination réglementaire', cible: '0', unite: 'occurrences', seuilAlerte: '≥ 1' },
    ],
    impact: [
      { indicateur: 'Pages vues / article (30j)', cible: '≥ 2 500', unite: 'vues', seuilAlerte: '< 1 000' },
      { indicateur: 'Taux de conversion → Lead Magnet', cible: '≥ 3.5%', unite: '%', seuilAlerte: '< 1.5%' },
      { indicateur: 'Partage LinkedIn / article', cible: '≥ 25', unite: 'partages', seuilAlerte: '< 10' },
      { indicateur: 'Taux de rebond', cible: '≤ 55%', unite: '%', seuilAlerte: '> 75%' },
      { indicateur: 'GEO visibility (ChatGPT/Perplexity)', cible: 'Top 3 citations', unite: 'position', seuilAlerte: 'Non cité' },
    ],
    capitalisation: [
      { indicateur: 'FCK générées / mois', cible: '≥ 8', unite: 'FCK', seuilAlerte: '< 4' },
      { indicateur: 'FCK indexées dans KOS', cible: '100%', unite: '%', seuilAlerte: '< 90%' },
      { indicateur: 'Concepts clés capitalisés', cible: '≥ 40 / mois', unite: 'concepts', seuilAlerte: '< 20' },
    ],
  },

  metaKOS: {
    tags: ['FCK', 'KPI', 'Éditorial', 'Performance', 'Pilotage'],
    agentsConcernes: ['KOS Content Factory Command', 'KOS Executive Command Center'],
    prochaineRevision: '2026-09-27',
  },
};

// ============================================================
// FCK-005 — Méthodologie Directeur Scientifique Think Tank
// Sourcing Élite + Synthèse Cognitive + Auto-Apprentissage Systémique
// ============================================================

export const FCK_005_SCIENTIFIC_DIRECTOR = {
  fckId: 'FCK-005',
  title: 'Méthodologie du Directeur Scientifique — Think Tank KOS & Khepra Experts',
  version: '1.0',
  dateCreation: '2026-06-27',
  classification: 'INTERNE — Direction Scientifique',
  domaines: ['Recherche Scientifique', 'Synthèse Cognitive', 'Auto-Apprentissage', 'Capitalisation des Connaissances'],

  // ── RÉFÉRENTIELS ──
  referentiel: {
    standardsInternationaux: [
      { code: 'ISO 56002:2019', titre: "Management de l'innovation", usage: 'Cadre de gestion des leviers d\'innovation sectoriels' },
      { code: 'ISO 31000:2018', titre: 'Management du risque', usage: 'Évaluation des risques de transposition des modèles occidentaux en Afrique' },
      { code: 'ISO 30401:2018', titre: 'Systèmes de management des connaissances', usage: 'Protocole de capitalisation FCK et mémoire interne KOS' },
    ],
    principesSourcing: {
      description: 'Filtrage et sourcing exclusif depuis les sources de plus haut niveau académique mondial.',
      regles: [
        'Ignorer toute source secondaire ou non validée par les pairs',
        'Universités : exclusivement le Top 200 mondial (Harvard, MIT, Stanford, Oxford, LSE, NUS, UM6P, etc.)',
        'Revues : Strategic Management Journal, Journal of Finance, Management Science, Energy Policy, World Development et équivalents',
        'Think Tanks : Brookings, PIIE, Bruegel, Chatham House, ACET, PCNS et équivalents',
        'Pour chaque référence : auteur, titre, année, DOI, institution — AUCUNE EXCEPTION',
      ],
    },
    protocoleAutoApprentissage: {
      description: 'Audit continu et invisible des réponses KOS pour densifier la mémoire de contexte.',
      structure: [
        { champ: '[Axe Sectoriel]', description: 'Agro-business, FinTech, IA, Infrastructures/BTP, Politiques Publiques' },
        { champ: '[Réf. Scientifique Mondiale Majeure]', description: 'Source, auteur, année, insight clé' },
        { champ: '[Écart de Transposition en Afrique Francophone]', description: 'Gap identifié, sévérité, données locales' },
        { champ: '[Levier d\'Innovation Khepra Retenu]', description: 'Innovation concrète, impact estimé, timeline' },
      ],
      execution: 'INVISIBLE — exécution silencieuse à chaque cycle de recherche, sans interaction utilisateur',
    },
    secteursCibles: [
      { secteur: 'Agro-Business & Sécurité Alimentaire', priorite: 'P1', justification: '60% des terres arables non cultivées mondiales en Afrique — premier levier de transformation économique' },
      { secteur: 'FinTech & Inclusion Financière', priorite: 'P1', justification: '70% du volume mobile money mondial en Afrique — régulation et interopérabilité comme catalyseurs' },
      { secteur: 'Intelligence Artificielle & Data', priorite: 'P1', justification: '<1% des publications IA mondiales mais croissance 35%/an — souveraineté numérique critique' },
      { secteur: 'Infrastructures & BTP', priorite: 'P2', justification: 'Déficit 68-108 Md$/an — structuration financière et PPP comme leviers prioritaires' },
      { secteur: 'Politiques Publiques & Gouvernance', priorite: 'P2', justification: 'Capacité étatique comme prédicteur #1 de croissance — diagnostic et renforcement institutionnel' },
    ],
  },

  // ── MÉTADONNÉES KOS ──
  metaKOS: {
    tags: ['FCK', 'Directeur Scientifique', 'Think Tank', 'Sourcing Académique', 'Synthèse Cognitive', 'Auto-Apprentissage', 'Internal Memory', 'Top 200 Universités', 'Big Four'],
    agentsConcernes: ['KOS Scientific Director', 'KOS Scientific Intelligence Enhancement', 'KOS Autonomous Think Tank', 'KOS Content Factory Command', 'KOS Knowledge Graph'],
    blocKOS: 'Bloc Recherche & Innovation',
    dependances: ['scientificDirector.ts', 'kbrFichesConnaissance.ts', 'scientificIntelligenceEnhancement.ts'],
    prochaineRevision: '2026-09-27',
  },
};

// ============================================================
// FCK-006 — Méthodologie Growth & Commercial Strategy
// Lead Magnets Big Four · Nurturing High Touch · Value-Based Selling
// Architecture Offres 3 Niveaux · Closing Premium · Capitalisation GROWTH-DATA
// ============================================================

export const FCK_006_GROWTH_COMMERCIAL_STRATEGY = {
  fckId: 'FCK-006',
  title: 'Méthodologie Growth & Commercial Strategy — Lead Magnets, Nurturing, Value-Based Selling & Closing Premium',
  version: '1.0',
  dateCreation: '2026-06-27',
  classification: 'INTERNE — Direction de la Stratégie Commerciale',
  domaines: ['Stratégie Commerciale', 'Growth', 'Lead Generation', 'Value-Based Selling', 'Closing Premium', 'Capitalisation Commerciale'],

  // ── RÉFÉRENTIELS ──
  referentiel: {
    standardsInternationaux: [
      { code: 'ISO 56002:2019', titre: "Management de l'innovation", usage: 'Cadre de conception des Lead Magnets innovants et processus de capture' },
      { code: 'ISO 31000:2018', titre: 'Management du risque', usage: 'Ancrage des offres sur le coût des risques évités (Value-Based Selling)' },
      { code: 'ISO 37000:2021', titre: 'Gouvernance des organismes', usage: 'Alignement institutionnel des séquences nurturing avec la posture des décideurs' },
      { code: 'GAFI 2012 (rév.)', titre: 'Recommandations du GAFI — LBC/FT/FP', usage: 'Lead Magnets conformité LBC/FT, diagnostics GAFI 40 Recommandations' },
      { code: 'Bâle III/IV', titre: 'Comité de Bâle — Cadre prudentiel bancaire', usage: 'Lead Magnets ratios prudentiels et solvabilité bancaire' },
      { code: 'IFRS / ISA', titre: "Normes internationales d'information financière et d'audit", usage: 'Simulateurs IFRS 9, diagnostics provisions' },
    ],
    cadresMethodologie: [
      { cadre: 'Value-Based Selling (Big Four)', description: 'Tarification ancrée sur la valeur créée/risque évité, pas sur le temps passé. ROI démontré ≥ 7x.' },
      { cadre: 'Solution Selling (McKinsey)', description: 'Le prospect n\'achète pas du conseil, il achète une solution à un problème documenté et chiffré.' },
      { cadre: 'Challenger Sale (Gartner/CEB)', description: 'Le commercial challenge la pensée du prospect en démontrant le coût de l\'inaction plutôt que le coût du conseil.' },
      { cadre: 'SPIN Selling (Huthwaite)', description: 'Situation → Problem → Implication → Need-Payoff. Séquence structurée de découverte des besoins.' },
      { cadre: 'MEDDIC/MEDDPICC', description: 'Metrics · Economic Buyer · Decision Criteria · Decision Process · Identify Pain · Champion · Competition. Qualification rigoureuse.' },
    ],
    realitesAfriqueFrancophone: [
      'Cycle de décision High Touch : composante relationnelle prédominante — le décideur achète la confiance avant la compétence',
      'Décision centralisée : DG ou PCA valide les missions > 20M FCFA — nécessite un nurturing parallèle COMEX/CA',
      'Budget annualisé : cycles budgétaires publics (janvier-décembre) et privés (souvent calés sur exercice fiscal)',
      'Préférence locale : « On préfère travailler avec quelqu\'un qu\'on connaît » — importance du réseau et des recommandations',
      'Sensibilité prix : les offres doivent démontrer un ROI clair en FCFA, pas en pourcentage ou en concepts',
      'Délais administratifs : validation ministérielle, CA trimestriel — le paiement phasé est un outil de closing essentiel',
    ],
  },

  // ── INGÉNIERIE DU LEAD MAGNET ──
  leadMagnetEngineering: {
    description: "Chaque publication KBR doit être associée à un outil de diagnostic actionnable (Self-Assessment Tool ou Checklist d'éligibilité), pas à un simple PDF.",
    etapes: [
      {
        etape: 1,
        titre: 'Du Contenu Théorique à l\'Outil Actionnable',
        regles: [
          'Associer un Self-Assessment Tool à chaque article expert',
          'Proposer une Checklist d\'Éligibilité aux Financements pour les contenus stratégie',
          'Le lead magnet doit produire un résultat personnalisé immédiat',
          'Le score doit créer un sentiment d\'urgence documenté',
        ],
      },
      {
        etape: 2,
        titre: 'Friction Qualifiante',
        champsObligatoires: [
          { champ: 'Secteur', justification: 'Segmentation par verticale — les offres Khepra sont sectorialisées' },
          { champ: 'Chiffre d\'Affaires / Budget Géré', justification: 'Qualification Grands Comptes vs PME' },
          { champ: 'Problématique Prioritaire', justification: 'Orientation vers le bon BU et la bonne offre' },
          { champ: 'Pays d\'Opération', justification: 'Activation géographique et conformité par zone' },
        ],
      },
    ],
    catalogue: [
      { id: 'LM-001', magnet: 'Auto-Évaluation Conformité COBAC — 247 Points', conversion: '12.5%', impact: '85M FCFA', priorite: 'P0' },
      { id: 'LM-002', magnet: 'Checklist Éligibilité BAD/IFC', conversion: '10.8%', impact: '210M FCFA', priorite: 'P0' },
      { id: 'LM-003', magnet: 'Diagnostic Flash Gouvernance COSO/ISO 37000', conversion: '14.2%', impact: '55M FCFA', priorite: 'P1' },
      { id: 'LM-004', magnet: 'Simulateur Impact IFRS 9', conversion: '16.8%', impact: '120M FCFA', priorite: 'P0' },
      { id: 'LM-005', magnet: 'Matrice Maturité ESG GRI/ISSB', conversion: '11.3%', impact: '95M FCFA', priorite: 'P1' },
      { id: 'LM-006', magnet: 'Audit Express LBC/FT — 40 Recommandations GAFI', conversion: '18.5%', impact: '150M FCFA', priorite: 'P0' },
      { id: 'LM-007', magnet: 'Diagnostic Prix de Transfert BEPS Action 13', conversion: '13.7%', impact: '180M FCFA', priorite: 'P1' },
      { id: 'LM-008', magnet: "Score d'Investment Readiness — 25 Critères", conversion: '9.8%', impact: '65M FCFA', priorite: 'P2' },
    ],
  },

  // ── STRATÉGIE DE NURTURING HIGH TOUCH ──
  nurturingHighTouch: {
    description: "Le cycle de décision en Afrique francophone repose sur une haute composante relationnelle. Adresser le décideur par sa posture de contribution au développement économique ou à la conformité réglementaire.",
    piliers: [
      {
        pilier: 'Alignement Institutionnel',
        technique: "Adresser le décideur par sa posture de contribution au développement économique ou à la conformité réglementaire — levier de statut et de sécurité.",
      },
      {
        pilier: 'Preuve de Concept Locale (PoC)',
        technique: "S'appuyer systématiquement sur des études de cas africaines chiffrées en FCFA — « Comment l'entreprise X en Côte d'Ivoire a restructuré sa dette de 20% ».",
      },
      {
        pilier: "Ancrage de la Perte d'Opportunité",
        technique: "Démontrer le coût de l'inaction plutôt que le coût du conseil — sanctions réglementaires, pertes d'efficacité, opportunités ZLECAF manquées.",
      },
    ],
    sequences: [
      { id: 'SEQ-001', nom: 'Post-Diagnostic Lead Chaud', duree: '14 jours', conversion: '25-35%' },
      { id: 'SEQ-002', nom: 'Institutionnelle Grands Comptes', duree: '45 jours', conversion: '40-55%' },
      { id: 'SEQ-003', nom: 'Réactivation Lead Froid', duree: '21 jours', conversion: '8-15%' },
    ],
  },

  // ── ARCHITECTURE DES OFFRES ──
  offreArchitecture: {
    description: "Présenter toujours 3 options pour déplacer la question de 'Est-ce que je travaille avec Khepra ?' à 'Quelle option correspond le mieux à mon budget ?'",
    niveaux: [
      { niveau: 'Gold', prix: '8.5M FCFA', cible: 'PME, SFD < 5Md', conversion: '40-50%' },
      { niveau: 'Premium', prix: '35M FCFA', cible: 'Banques, Groupes, SFD > 5Md', conversion: '25-35%' },
      { niveau: 'Enterprise', prix: '150-500M FCFA', cible: 'Groupes panafricains, DFI, Régulateurs', conversion: '15-25%' },
    ],
    tarificationValeur: {
      regle: "Calculer le ROI estimé pour le client. Si la note de l'Observatoire permet d'éviter un risque de 100M FCFA, l'offre Khepra s'ancre sur cette valeur.",
      exemples: [
        { scenario: 'Risque de redressement évité', valeur: '100M FCFA', prix: '12.5M FCFA', ratio: '8x' },
        { scenario: 'Optimisation provisions IFRS 9', valeur: '250M FCFA', prix: '35M FCFA', ratio: '7.1x' },
        { scenario: 'Obtention agrément accélérée', valeur: '180M FCFA/an', prix: '22.5M FCFA', ratio: '8x' },
      ],
    },
    objections: [
      { objection: '"Pas de budget"', technique: 'Ancrage ROI + offre entry-level + escalade budgétaire interne' },
      { objection: '"Processus de validation trop long"', technique: "Retourner la lenteur administrative en urgence d'action" },
      { objection: '"Préférence cabinets occidentaux"', technique: 'Positionnement complémentaire + avantage local + avantage prix (30-50% inférieur)' },
      { objection: '"On gère en interne"', technique: "Respect équipe interne + gain de temps + couverture des angles morts" },
    ],
  },

  // ── SCRIPTS DE CLOSING PREMIUM ──
  closingScripts: [
    { id: 'CS-001', scenario: 'Premier appel découverte', duree: '25-30 min', conversion: '30%', panier: '12.5M FCFA' },
    { id: 'CS-002', scenario: 'Présentation COMEX/CA', duree: '45-60 min', conversion: '45%', panier: '35M FCFA' },
    { id: 'CS-003', scenario: 'Négociation finale', duree: '15-20 min', conversion: '70%', panier: '31.5M FCFA' },
  ],

  // ── PROTOCOLE DE CAPITALISATION GROWTH-DATA ──
  growthData: {
    description: "À chaque closing ou structuration d'offre, isoler [TRIGGER], [BARRIER], [PRICE], [VERTICAL], [ZONE], [DEAL_SIZE].",
    insights: [
      { categorie: 'TRIGGER', insight: "Le déclencheur #1 est l'inspection réglementaire imminente (40% des deals)" },
      { categorie: 'BARRIER', insight: 'La barrière #1 est le budget non provisionné (35% des objections). Le paiement phasé réduit cette barrière de 60%.' },
      { categorie: 'PRICE', insight: 'Le panier moyen est 31.5M FCFA. Les deals > 150M = 15% du volume mais 55% du revenu.' },
      { categorie: 'DEAL_SIZE', insight: 'Le taux de conversion augmente avec la taille du deal : 22% pour &lt; 10M, 55% pour > 150M.' },
    ],
  },

  // ── MÉTADONNÉES KOS ──
  metaKOS: {
    tags: ['FCK', 'GROWTH-DATA', 'Commercial', 'Lead Magnet', 'Nurturing', 'Value-Based Selling', 'Closing', 'Big Four', 'Afrique francophone'],
    agentsConcernes: ['KOS Growth Commercial Strategy', 'KOS Closing Growth Engine', 'KOS Khepra Growth Engine', 'KBR Dashboard', 'KOS Lead Scoring Command', 'KOS Growth Orchestrator'],
    blocKOS: 'Bloc Commercial & Growth',
    dependances: ['growthCommercialStrategy.ts', 'kbrFichesConnaissance.ts', 'closingGrowthEngine.ts', 'khepraGrowthEngine.ts'],
    prochaineRevision: '2026-09-27',
  },
};





