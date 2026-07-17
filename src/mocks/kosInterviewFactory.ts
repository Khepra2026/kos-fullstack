// ============================================================================
// KOS INTERVIEW FACTORY™ — Hub 94
// Big Four Institutional Virtual Expert Interview System
// Rôles × Questions/Relances × Réponses × Synthèses × Formats × KPIs
// ============================================================================

export interface ExpertRole {
  id: string;
  title: string;
  fullTitle: string;
  expertise: string[];
  icon: string;
  color: string;
  credentials: string;
  voiceProfile: string;
  topics: string[];
  samplePhrase: string;
}

export const INTERVIEW_ROLES: ExpertRole[] = [
  {
    id: 'ROLE-001', title: 'Président du Conseil', fullTitle: 'Président du Conseil d\'Administration',
    expertise: ['Gouvernance stratégique', 'Planification successorale', 'Relation régulateur', 'Fiduciaire board'],
    icon: 'ri-vip-crown-line', color: 'primary',
    credentials: 'PCA certifié IFC/IFC Governance, 25+ ans d\'expérience en conseil d\'administration, ancien DG de banque régionale',
    voiceProfile: 'KHEPRA Voice™ — Célestin Koffi (Autorité, Gravité, Sagesse)',
    topics: ['Indépendance administrateurs', 'Comités spécialisés', 'Évaluation du CA', 'Gestion des conflits d\'intérêts', 'Rémunération des mandataires'],
    samplePhrase: 'Le Conseil d\'Administration est le gardien ultime de la gouvernance. Chaque décision stratégique engage la pérennité de l\'institution.',
  },
  {
    id: 'ROLE-002', title: 'Directeur Général', fullTitle: 'Directeur Général / CEO',
    expertise: ['Leadership exécutif', 'Stratégie d\'entreprise', 'Performance financière', 'Transformation organisationnelle'],
    icon: 'ri-user-star-line', color: 'accent',
    credentials: 'MBA HEC Paris / INSEAD, 20+ ans en direction générale, spécialiste turnaround et croissance',
    voiceProfile: 'KHEPRA Voice™ — Aminata Sow (Leadership, Vision, Confiance)',
    topics: ['Stratégie 2026-2028', 'Levée de fonds', 'Transformation digitale', 'Expansion CEMAC', 'Fusions-acquisitions'],
    samplePhrase: 'La Direction Générale doit conjuguer vision stratégique et exécution opérationnelle. Notre priorité : créer de la valeur durable pour toutes les parties prenantes.',
  },
  {
    id: 'ROLE-003', title: 'Responsable Conformité', fullTitle: 'Chief Compliance Officer (CCO)',
    expertise: ['Dispositif LCB/FT', 'KYC/EDD', 'Déclaration de soupçon', 'Cartographie des risques', 'Formation conformité'],
    icon: 'ri-shield-check-line', color: 'secondary',
    credentials: 'CAMS Certified, 15+ ans conformité bancaire, auditeur certifié GAFI, formateur agréé BCEAO',
    voiceProfile: 'KHEPRA Voice™ — Fatoumata Diallo (Précision, Rigueur, Pédagogie)',
    topics: ['Bénéficiaires effectifs', 'PPE', 'Délai déclaration 24h', 'Crypto-actifs KYC', 'Évaluation mutuelle GIABA'],
    samplePhrase: 'La conformité n\'est pas un centre de coût — c\'est une assurance-vie pour l\'institution. Chaque euro investi en conformité en protège mille.',
  },
  {
    id: 'ROLE-004', title: 'Auditeur Interne', fullTitle: 'Directeur de l\'Audit Interne (CAE)',
    expertise: ['Audit basé sur les risques', 'Contrôle interne COSO', 'Cartographie processus', 'Reporting au Comité d\'Audit', 'Suivi recommandations'],
    icon: 'ri-search-eye-line', color: 'primary',
    credentials: 'CIA Certified, CRMA, 18+ ans en audit interne bancaire, formé IIA Global, auditeur certifié IFACI',
    voiceProfile: 'KHEPRA Voice™ — Célestin Koffi (Objectivité, Précision, Diplomatie)',
    topics: ['COSO 2013', 'Lignes de défense', 'Cartographie risques', 'Plans d\'audit annuels', 'Suivi plans d\'action'],
    samplePhrase: 'L\'audit interne est la troisième ligne de défense. Notre mission : donner une assurance raisonnable au Conseil sur la maîtrise des risques.',
  },
  {
    id: 'ROLE-005', title: 'Régulateur', fullTitle: 'Régulateur Bancaire / Superviseur',
    expertise: ['Supervision prudentielle', 'Agrément', 'Contrôle sur pièces et sur place', 'Ratio solvabilité', 'Reporting réglementaire'],
    icon: 'ri-government-line', color: 'accent',
    credentials: 'Ancien Directeur Supervision BCEAO, 22+ ans régulation bancaire, contributeur Bâle III UEMOA, expert comité Bâle',
    voiceProfile: 'KHEPRA Voice™ — Aminata Sow (Autorité, Neutralité, Vision systémique)',
    topics: ['Pilier 1/2/3 Bâle', 'Ratio liquidité LCR', 'Stress tests', 'Reporting SURFI', 'Plan préventif de redressement'],
    samplePhrase: 'Le régulateur n\'est pas un adversaire — c\'est un partenaire de la stabilité financière. La transparence et la proactivité sont vos meilleurs alliés.',
  },
  {
    id: 'ROLE-006', title: 'Expert ESG', fullTitle: 'Head of ESG & Sustainability',
    expertise: ['Stratégie ISSB/IFRS S1-S2', 'Bilan carbone scope 1-2-3', 'Taxonomie verte', 'Reporting extra-financier', 'Engagement parties prenantes'],
    icon: 'ri-seedling-line', color: 'secondary',
    credentials: 'SASB FSA Certified, GRI Certified, 12+ ans ESG, pilote 1er rapport ISSB UEMOA, consultant Climate Disclosure Project',
    voiceProfile: 'KHEPRA Voice™ — Fatoumata Diallo (Expertise, Pédagogie, Engagement)',
    topics: ['ISSB 2026', 'Scope 3 émissions financées', 'Stress test climatique', 'IFRS S2', 'Énergie renouvelable'],
    samplePhrase: 'L\'ESG est le nouveau langage de la finance. Les banques africaines qui l\'adoptent aujourd\'hui seront les leaders de demain.',
  },
];

// --- INTERVIEW QUESTIONS & ANSWERS ---
export interface InterviewQA {
  id: string;
  roleId: string;
  question: string;
  relance: string;
  answerExpert: string;
  keywords: string[];
  difficulty: 'débutant' | 'intermédiaire' | 'expert';
}

export const INTERVIEW_QAS: InterviewQA[] = [
  // Président du Conseil
  {
    id: 'QA-001', roleId: 'ROLE-001', difficulty: 'intermédiaire',
    question: 'Quels sont les critères essentiels pour qualifier un administrateur indépendant selon la circulaire BCEAO ?',
    relance: 'Comment le CA doit-il vérifier concrètement cette indépendance avant la nomination ?',
    answerExpert: 'La circulaire BCEAO 01-2017 définit l\'indépendance selon 5 critères cumulatifs. Premièrement, absence de relation d\'affaires significative avec la banque ou son groupe depuis 3 ans. Deuxièmement, absence de lien familial jusqu\'au 2e degré avec les dirigeants exécutifs. Troisièmement, non-exercice de fonctions exécutives dans la banque depuis 5 ans. Quatrièmement, absence de participation croisée dans les organes de gouvernance. Cinquièmement, absence de conflit d\'intérêts matériel. Le CA doit formaliser une grille d\'évaluation documentée pour chaque candidat, avec déclaration sur l\'honneur et vérification par le Comité de Nomination. La BCEAO examine cette documentation lors des inspections.',
    keywords: ['administrateur indépendant', 'circulaire 01-2017', 'BCEAO', 'gouvernance', 'conflit intérêts'],
  },
  {
    id: 'QA-002', roleId: 'ROLE-001', difficulty: 'expert',
    question: 'Comment structurer un Comité d\'Audit conforme aux exigences de la circulaire 03-2017 ?',
    relance: 'Quelle est la différence entre un Comité d\'Audit bancaire et un comité d\'audit d\'entreprise classique ?',
    answerExpert: 'Le Comité d\'Audit bancaire selon la circulaire 03-2017 doit comporter au minimum 3 membres, tous administrateurs non exécutifs, dont au moins un indépendant. Le président ne peut pas être le PCA. Ses missions vont au-delà du comité d\'audit classique : il supervise le dispositif de contrôle interne, examine les rapports d\'audit interne et externe, suit les recommandations des superviseurs, valide la nomination des CAC, et examine les conventions réglementées. Spécificité bancaire : il doit également examiner les rapports de la Conformité LCB/FT et de la Gestion des Risques. La fréquence minimale est trimestrielle, avec un plan de travail annuel approuvé par le CA.',
    keywords: ['comité audit', 'circulaire 03-2017', 'BCEAO', 'contrôle interne', 'gouvernance'],
  },
  {
    id: 'QA-003', roleId: 'ROLE-001', difficulty: 'débutant',
    question: 'Quelle est la fréquence minimale des réunions du Conseil d\'Administration pour une banque ?',
    relance: 'Que doit contenir obligatoirement l\'ordre du jour ?',
    answerExpert: 'La circulaire BCEAO impose un minimum de 4 réunions par an, soit une réunion trimestrielle. Dans la pratique des standards Big Four, nous recommandons 6 à 8 réunions annuelles pour les banques systémiques, incluant au moins une réunion stratégique annuelle hors site. L\'ordre du jour doit obligatoirement inclure : l\'examen des états financiers, le rapport du Comité d\'Audit, le rapport de Conformité, le rapport de Gestion des Risques, le suivi des recommandations des superviseurs, et l\'examen des conventions réglementées.',
    keywords: ['conseil administration', 'fréquence', 'BCEAO', 'ordre du jour', 'gouvernance'],
  },
  // Directeur Général
  {
    id: 'QA-004', roleId: 'ROLE-002', difficulty: 'intermédiaire',
    question: 'Comment piloter une levée de fonds de 10 milliards FCFA pour une banque en croissance ?',
    relance: 'Quels sont les 3 critères que les investisseurs regardent en premier ?',
    answerExpert: 'Une levée de fonds de cette ampleur nécessite une préparation rigoureuse sur 6-9 mois. Les 3 critères prioritaires des investisseurs sont : 1) La qualité de la gouvernance (indépendance du CA, comités spécialisés, transparence) — c\'est le premier filtre, 2) La rentabilité ajustée au risque (ROE > 15%, ratio de solvabilité > 12%, NPL ratio < 5%), 3) Le business plan avec un narratif clair de création de valeur. La structuration optimale combine augmentation de capital (dilution maximale 20%) et dette subordonnée Tier 2. La documentation doit inclure un IM (Information Memorandum) audité Big Four, des projections financières 5 ans avec stress tests, et un pacte d\'actionnaires révisé.',
    keywords: ['levée de fonds', 'investisseurs', 'capital', 'business plan', 'dilution'],
  },
  {
    id: 'QA-005', roleId: 'ROLE-002', difficulty: 'expert',
    question: 'Quelle stratégie pour digitaliser une banque traditionnelle sans perturber les opérations ?',
    relance: 'Comment gérez-vous la résistance au changement du middle management ?',
    answerExpert: 'La digitalisation d\'une banque traditionnelle suit une approche bimodale. Mode 1 : optimisation du core banking existant (migration progressive, pas de big bang). Mode 2 : création d\'une entité digitale séparée (digital factory) avec culture startup, recrutement externe tech, et agilité. La clé est le middle management — je recommande un programme "Digital Champions" : identifier 20% de managers volontaires, les former intensivement (bootcamp 4 semaines), leur donner des projets digitaux à responsabilité, et les promouvoir comme modèles. Budget typique : 5-8% du PNB annuel sur 3 ans. ROI attendu : réduction du cost/income ratio de 8-12 points, augmentation NPS de 15-25 points.',
    keywords: ['digitalisation', 'transformation', 'banque', 'bimodal', 'change management'],
  },
  // Responsable Conformité
  {
    id: 'QA-006', roleId: 'ROLE-003', difficulty: 'intermédiaire',
    question: 'Comment mettre en conformité le registre des bénéficiaires effectifs avec les nouvelles exigences GAFI ?',
    relance: 'Que faire quand un client refuse de déclarer son bénéficiaire effectif ?',
    answerExpert: 'Le GAFI 2026 abaisse le seuil de déclaration à 10% (contre 25%). La mise en conformité passe par 5 étapes : 1) Revue exhaustive du portefeuille clients personnes morales, 2) Identification des entités avec chaîne de détention complexe (fiducies, trusts, holdings), 3) Relance documentée des clients avec deadline 90 jours, 4) Pour les clients à risque élevé : vérification indépendante via registres officiels (RCCM) et bases de données (WorldCheck, LexisNexis), 5) Enrichissement du core banking avec un champ BE structuré. Si un client refuse après 2 relances formelles : classification en risque élevé, limitation des opérations, et déclaration de soupçon à la CENTIF si le refus est suspect. Ne jamais conserver un client sans BE documenté au-delà de 120 jours.',
    keywords: ['bénéficiaire effectif', 'GAFI', 'KYC', 'conformité', 'CENTIF'],
  },
  {
    id: 'QA-007', roleId: 'ROLE-003', difficulty: 'expert',
    question: 'Comment préparer la banque à une évaluation mutuelle GIABA/GABAC en 2027 ?',
    relance: 'Quels sont les 3 documents que les évaluateurs demandent en premier ?',
    answerExpert: 'La préparation à une évaluation mutuelle est un projet 18 mois. Les 3 documents immédiatement demandés : 1) La matrice de conformité technique (Technical Compliance) documentant chaque recommandation GAFI avec les textes nationaux de transposition, 2) Le rapport d\'évaluation nationale des risques (NERA) mis à jour, 3) Les statistiques LCB/FT sur 5 ans (nombre de déclarations de soupçon, suites judiciaires, gels d\'avoirs). Les points critiques pour les banques : démontrer une approche basée sur les risques (Risk-Based Approach) effective, pas seulement documentaire — les évaluateurs vérifient la réalité opérationnelle via des entretiens avec les chargés de conformité. Budget typique de préparation : 80-200 millions FCFA. KHEPRA EXPERTS a développé une méthodologie en 7 phases alignée sur la méthodologie GAFI 2013 révisée.',
    keywords: ['évaluation mutuelle', 'GIABA', 'GABAC', 'GAFI', 'conformité technique'],
  },
  // Auditeur Interne
  {
    id: 'QA-008', roleId: 'ROLE-004', difficulty: 'intermédiaire',
    question: 'Comment structurer un plan d\'audit annuel basé sur les risques pour une banque ?',
    relance: 'Quelle méthodologie utilisez-vous pour prioriser les missions d\'audit ?',
    answerExpert: 'Le plan d\'audit annuel basé sur les risques (Risk-Based Audit Plan) se construit en 4 phases. Phase 1 — Cartographie de l\'univers d\'audit : lister tous les processus, entités, systèmes et risques. Phase 2 — Évaluation des risques inhérents : chaque élément est noté sur 5 critères (impact financier, impact réglementaire, complexité, historique d\'incidents, maturité du contrôle interne). Phase 3 — Scoring et priorisation : les missions sont classées en 3 cycles (annuel pour risques élevés, 2 ans pour risques moyens, 3 ans pour risques faibles). Phase 4 — Allocation des ressources : 70% missions obligatoires/réglementaires, 20% missions basées sur les risques, 10% missions demandées par le management/CA. Le plan est présenté au Comité d\'Audit pour approbation et révisé semestriellement.',
    keywords: ['plan audit', 'risques', 'COSO', 'audit interne', 'priorisation'],
  },
  {
    id: 'QA-009', roleId: 'ROLE-004', difficulty: 'expert',
    question: 'Comment auditer le dispositif de provisionnement IFRS 9 d\'une banque UEMOA ?',
    relance: 'Quels sont les 5 contrôles clés à tester absolument ?',
    answerExpert: 'L\'audit du dispositif IFRS 9 est l\'une des missions les plus techniques. Les 5 contrôles clés : 1) Segmentation du portefeuille (Stage 1/2/3) — vérifier que les critères de transfert sont documentés, automatisés et appliqués sans exception manuelle, 2) Modèle ECL (Expected Credit Loss) — valider la formule de calcul (PD × LGD × EAD), tester les paramètres avec backtesting sur 3 ans, 3) Forward-Looking — vérifier que les scénarios macroéconomiques sont plausibles, documentés et approuvés par le Comité des Risques, 4) Gouvernance des modèles — s\'assurer que la validation est indépendante (pas par ceux qui ont conçu le modèle), 5) Rapprochement comptable — tester la réconciliation entre le moteur IFRS 9 et la comptabilité générale. Une mission typique mobilise 2 auditeurs senior pendant 4 semaines.',
    keywords: ['IFRS 9', 'provisionnement', 'ECL', 'Stage 1 2 3', 'audit'],
  },
  // Régulateur
  {
    id: 'QA-010', roleId: 'ROLE-005', difficulty: 'intermédiaire',
    question: 'Quels sont les 5 ratios prudentiels que la BCEAO surveille en priorité ?',
    relance: 'Que se passe-t-il si une banque enfreint l\'un de ces ratios pendant 2 trimestres consécutifs ?',
    answerExpert: 'La BCEAO surveille en priorité 5 ratios. 1) Ratio de solvabilité total (minimum 10,5%, 12% pour les systémiques) — c\'est le plus critique, un non-respect déclenche une inspection ciblée sous 30 jours. 2) Ratio de liquidité LCR (minimum 100%) — entré en vigueur progressivement, désormais pleinement applicable. 3) Ratio de levier (minimum 3%) — limite l\'endettement excessif. 4) Ratio de concentration des grands risques (max 25% des fonds propres sur un seul bénéficiaire). 5) Coefficient de transformation (max 200% pour les banques) — empêche une transformation excessive. En cas de non-respect 2 trimestres consécutifs : la BCEAO émet une injonction de mise en conformité avec plan de redressement sous 30 jours, peut limiter la distribution de dividendes, et en dernier recours nommer un administrateur provisoire.',
    keywords: ['ratios prudentiels', 'solvabilité', 'liquidité', 'BCEAO', 'supervision'],
  },
  {
    id: 'QA-011', roleId: 'ROLE-005', difficulty: 'expert',
    question: 'Comment la BCEAO prépare-t-elle les stress tests climatiques du Pilier 2 ?',
    relance: 'Les banques africaines ont-elles les données nécessaires pour ces stress tests ?',
    answerExpert: 'Les stress tests climatiques Pilier 2 représentent une innovation majeure. La BCEAO suit la méthodologie NGFS (Network for Greening the Financial System) avec 3 scénarios : ordonné (transition progressive vers Net Zero), désordonné (transition tardive et brutale), et "hot house" (aucune transition). Les banques doivent modéliser l\'impact sur leur portefeuille de crédit via 3 canaux : risque de crédit (défaut accru des secteurs exposés), risque de marché (dépréciation des actifs "bruns"), et risque opérationnel (événements climatiques). Le défi principal est la disponibilité des données : la BCEAO recommande l\'utilisation des proxies PCAF pour les émissions scope 3 quand les données primaires sont indisponibles. Calendrier : exercice pilote volontaire 2026, obligatoire pour les systémiques 2027, généralisation 2028.',
    keywords: ['stress test climatique', 'Pilier 2', 'BCEAO', 'NGFS', 'risque climatique'],
  },
  // Expert ESG
  {
    id: 'QA-012', roleId: 'ROLE-006', difficulty: 'intermédiaire',
    question: 'Par où commencer pour préparer un premier rapport ESG conforme à l\'ISSB ?',
    relance: 'Combien de temps et quel budget prévoir ?',
    answerExpert: 'Pour un premier rapport ISSB, je recommande une approche en 5 phases sur 12 mois. Phase 1 (mois 1-2) : Diagnostic ESG — évaluer la maturité actuelle, identifier les gaps vs ISSB, budget 15-25M FCFA. Phase 2 (mois 3-5) : Collecte données — bilan carbone scopes 1 et 2, identification des risques climatiques physiques et de transition, budget 25-40M. Phase 3 (mois 6-8) : Politique et gouvernance ESG — formaliser la stratégie, créer un comité ESG rattaché au CA, budget 20-30M. Phase 4 (mois 9-11) : Rédaction du rapport — suivant la structure IFRS S1/S2, avec analyse de matérialité, budget 30-50M. Phase 5 (mois 12) : Revue et publication — assurance externe limitée, validation CA, budget 15-25M. Budget total typique : 100-170M FCFA pour une banque moyenne. Le ROI inclut : accès à la finance verte (taux préférentiels), attractivité investisseurs, et conformité anticipée.',
    keywords: ['ISSB', 'ESG', 'bilan carbone', 'IFRS S1', 'IFRS S2', 'rapport'],
  },
  {
    id: 'QA-013', roleId: 'ROLE-006', difficulty: 'expert',
    question: 'Comment calculer les émissions financées (Scope 3 Catégorie 15) d\'un portefeuille de crédit ?',
    relance: 'Quelle est la précision acceptable pour un premier exercice ?',
    answerExpert: 'Le calcul des émissions financées suit la méthodologie PCAF (Partnership for Carbon Accounting Financials). Pour un portefeuille de crédit, la formule est : Émissions financées = Σ (Encours client i / Total actif client i) × Émissions scope 1+2 du client i. Pour les clients sans données primaires, PCAF fournit des facteurs d\'émission sectoriels par région. Niveaux de qualité des données : Data Quality 1 (données vérifiées du client — 5 points), DQ2 (données non vérifiées — 4 points), DQ3 (données d\'activité physique estimées — 3 points), DQ4 (proxy économique — 2 points), DQ5 (proxy sectoriel moyen — 1 point). Pour un premier exercice, un score moyen de 3/5 est acceptable. L\'objectif est d\'atteindre 4/5 en 3 ans. La BCEAO et la COBAC acceptent une approche progressive. Le défi africain : seulement 15% des entreprises cotées ont un bilan carbone, donc le DQ3-4 domine au début.',
    keywords: ['scope 3', 'émissions financées', 'PCAF', 'bilan carbone', 'catégorie 15'],
  },
];

// --- INTERVIEW SYNTHESES ---
export interface InterviewSynthesis {
  id: string;
  title: string;
  roleIds: string[];
  format: 'video' | 'podcast' | 'article';
  summary: string;
  keyLessons: string[];
  duration: string;
  publicationLevel: string;
}

export const INTERVIEW_SYNTHESES: InterviewSynthesis[] = [
  {
    id: 'SYN-001',
    title: 'Table Ronde Gouvernance — PCA, DG et Auditeur Interne face aux Exigences BCEAO 2026',
    roleIds: ['ROLE-001', 'ROLE-002', 'ROLE-004'],
    format: 'podcast',
    summary: 'Cette table ronde exceptionnelle réunit le PCA, le DG et l\'Auditeur Interne pour un débat croisé sur la gouvernance bancaire. Le PCA expose sa vision de l\'indépendance du Conseil. Le DG partage les tensions entre stratégie de croissance et contraintes réglementaires. L\'Auditeur Interne apporte le regard de la 3e ligne de défense. Les trois experts convergent sur un point : l\'importance d\'un dialogue structuré et transparent entre les trois fonctions. Publication professionnelle — standard Big Four.',
    keyLessons: ['Le PCA doit formaliser une grille d\'évaluation des administrateurs indépendants', 'Le DG doit intégrer la conformité dans le business plan, pas la subir', 'L\'Auditeur Interne doit avoir un accès direct au PCA, sans filtre hiérarchique', 'Les 3 fonctions doivent se rencontrer trimestriellement hors CA'],
    duration: '45 min', publicationLevel: 'Publication professionnelle — Standard Big Four',
  },
  {
    id: 'SYN-002',
    title: 'Dialogue Régulateur-Conformité — Comment Préparer l\'Évaluation Mutuelle GIABA 2027',
    roleIds: ['ROLE-003', 'ROLE-005'],
    format: 'video',
    summary: 'Un dialogue inédit entre le Responsable Conformité et le Régulateur. Le CCO expose ses défis opérationnels quotidiens : difficulté d\'obtenir les bénéficiaires effectifs, lourdeur des déclarations de soupçon, formation des équipes. Le Régulateur apporte la perspective du superviseur : ce qui sera réellement examiné lors de l\'évaluation mutuelle, les erreurs à éviter, les bonnes pratiques observées chez les banques les mieux notées.',
    keyLessons: ['La documentation est aussi importante que l\'action — tout doit être tracé', 'L\'approche basée sur les risques doit être démontrable, pas seulement affirmée', 'Les statistiques LCB/FT sont le premier indicateur regardé par les évaluateurs', 'Former 100% des collaborateurs, pas seulement la conformité'],
    duration: '35 min', publicationLevel: 'Publication professionnelle — Standard Big Four',
  },
  {
    id: 'SYN-003',
    title: 'ESG & Finance Durable — Le DG et l\'Expert ESG face aux Standards ISSB',
    roleIds: ['ROLE-002', 'ROLE-006'],
    format: 'article',
    summary: 'Le DG et l\'Expert ESG débattent de l\'intégration de l\'ESG dans la stratégie bancaire. Le DG exprime les préoccupations business : coût, ROI, priorité vs autres investissements. L\'Expert ESG démontre que l\'ESG n\'est pas un coût mais un investissement stratégique : accès à la finance verte à taux préférentiels, différenciation concurrentielle, anticipation réglementaire. L\'article détaille le business case chiffré : une banque moyenne qui investit 150M FCFA en ESG sur 2 ans peut économiser 400M en coût de financement.',
    keyLessons: ['L\'ESG est un levier de réduction du coût du capital, pas un centre de coût', 'Commencer par le scope 1 et 2, le scope 3 viendra progressivement', 'La taxonomie verte UEMOA sera un avantage compétitif pour les pionniers', 'Les investisseurs ESG représentent déjà 35% des flux mondiaux'],
    duration: '25 min (lecture)', publicationLevel: 'Publication professionnelle — Standard Big Four',
  },
];

// --- FORMAT CONFIGURATIONS ---
export interface FormatConfig {
  format: 'video' | 'podcast' | 'article';
  label: string;
  icon: string;
  specs: string;
  useCase: string;
  productionTime: string;
}

export const FORMAT_CONFIGS: FormatConfig[] = [
  {
    format: 'video', label: 'Interview Vidéo', icon: 'ri-film-line',
    specs: '1080p 30fps, fond studio KHEPRA, 2-3 caméras, sous-titres FR/EN, identité visuelle KHEPRA EXPERTS, durée 25-45 min',
    useCase: 'Contenu premium LinkedIn et YouTube, extraits courts pour réseaux sociaux, vignettes pour articles',
    productionTime: '3-5 jours ouvrés',
  },
  {
    format: 'podcast', label: 'Interview Podcast', icon: 'ri-mic-line',
    specs: 'MP3 320kbps, mastering professionnel LUFS -16, 2-3 voix, chapitres, transcription complète, durée 20-45 min',
    useCase: 'Distribution Spotify/Apple Podcasts/Deezer, intégration blog avec transcription, repurposing en posts LinkedIn',
    productionTime: '2-4 jours ouvrés',
  },
  {
    format: 'article', label: 'Interview Article', icon: 'ri-file-text-line',
    specs: '1500-3500 mots, structuré Q&A, citations encadrées, bio expert, visuels, SEO optimisé, Schema Article/FAQ',
    useCase: 'Blog KHEPRA EXPERTS, LinkedIn Article, Medium, newsletter, référencement SEO longue traîne, lead magnet',
    productionTime: '2-3 jours ouvrés',
  },
];

// --- KPIs ---
export interface InterviewFactoryKPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  history: { month: string; value: number }[];
}

export const INTERVIEW_FACTORY_KPIS: InterviewFactoryKPI[] = [
  { id: 'experts', name: 'Experts Disponibles', current: 6, target: 12, unit: '', icon: 'ri-team-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 2 }, { month: 'Mai', value: 4 }, { month: 'Juin', value: 6 }],
  },
  { id: 'interviews', name: 'Interviews Produites', current: 13, target: 100, unit: '/an', icon: 'ri-chat-quote-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 13 }],
  },
  { id: 'formats', name: 'Formats Disponibles', current: 3, target: 3, unit: '/3', icon: 'ri-stack-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 3 }],
  },
  { id: 'syntheses', name: 'Synthèses Multi-Experts', current: 3, target: 24, unit: '', icon: 'ri-brain-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 3 }],
  },
  { id: 'quality', name: 'Score Qualité', current: 94, target: 98, unit: '/100', icon: 'ri-medal-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 94 }],
  },
  { id: 'coverage', name: 'Couverture Domaines', current: 8, target: 12, unit: '', icon: 'ri-radar-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 8 }],
  },
];

export const INTERVIEW_FACTORY_STATS = {
  totalRoles: 6,
  totalQAs: 13,
  totalSyntheses: 3,
  totalFormats: 3,
  qualityScore: 94,
  maturityScore: 72,
  targetMaturity: 95,
  standardLevel: 'Publication Professionnelle — Cabinet International',
  engineVersion: 'v1.0 — Virtual Expert Interview System',
};