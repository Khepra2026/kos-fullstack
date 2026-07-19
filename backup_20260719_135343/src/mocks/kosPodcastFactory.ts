// ============================================================================
// KOS PODCAST FACTORY™ — Hub 93
// Big Four Institutional Podcast Industrial Production Chain
// Synopsis × Scripts × Multi-Format × Qualité Standard × KPIs
// ============================================================================

export interface PodcastSubject {
  id: string;
  title: string;
  domain: string;
  domainIcon: string;
  domainColor: string;
  synopsis: string;
  targetAudience: string;
  duration: string;
  keyTopics: string[];
  guestProfile: string;
  productionDate: string;
}

export const PODCAST_SUBJECTS: PodcastSubject[] = [
  {
    id: 'POD-001', title: 'Réforme du Ratio de Solvabilité UEMOA 2026 — Ce que les Banques Doivent Savoir', domain: 'BCEAO', domainIcon: 'ri-bank-line', domainColor: 'primary',
    synopsis: 'Analyse approfondie de la décision BCEAO/DEC/2026-004 réformant le ratio de solvabilité. De 9,5% à 12% pour les banques systémiques : implications, calendrier de mise en conformité, conséquences sur le crédit et la rentabilité. Avec des cas concrets de banques ayant anticipé la réforme.',
    targetAudience: 'DG, DGA, Directeurs Financiers, Risk Managers, Trésoriers', duration: '25 min', keyTopics: ['Ratio solvabilité', 'Coussin conservation', 'Banques systémiques', 'Fonds propres', 'Transition Bâle III'],
    guestProfile: 'Ancien Directeur de la Supervision Bancaire BCEAO ou Partner Audit Banque Big Four', productionDate: '2026-06-20',
  },
  {
    id: 'POD-002', title: 'GAFI 2026 — Les 5 Changements qui Impactent les Banques Africaines', domain: 'AML/CFT', domainIcon: 'ri-police-car-line', domainColor: 'accent',
    synopsis: 'Les nouvelles recommandations GAFI 2026 renforcent les exigences de transparence des bénéficiaires effectifs, élargissent le périmètre des PPE, et introduisent des obligations de reporting en temps quasi-réel. Décryptage des impacts pour les banques UEMOA et CEMAC.',
    targetAudience: 'Correspondants LCB/FT, Directeurs Conformité, DG, Risk Managers', duration: '30 min', keyTopics: ['GAFI 2026', 'Bénéficiaires effectifs', 'PPE', 'Reporting temps réel', 'Évaluation mutuelle'],
    guestProfile: 'Expert GAFI/GIABA ou Consultant Senior Compliance Big Four', productionDate: '2026-06-18',
  },
  {
    id: 'POD-003', title: 'Cybersécurité Bancaire — La Directive COBAC 2027 en 20 Minutes', domain: 'COBAC', domainIcon: 'ri-building-2-line', domainColor: 'secondary',
    synopsis: 'La directive COBAC sur la résilience opérationnelle numérique entre en vigueur le 1er janvier 2027. Tests de résilience annuels, cartographie des risques ICT, gestion des incidents : ce qu\'il faut mettre en place dès maintenant. Checklist pratique pour DSI et RSSI.',
    targetAudience: 'DSI, RSSI, Directeurs des Opérations, Risk Managers, DG', duration: '20 min', keyTopics: ['Cybersécurité', 'Résilience', 'ICT', 'DORA Afrique', 'Tests résilience'],
    guestProfile: 'RSSI d\'une banque CEMAC ou Expert Cybersécurité Big Four', productionDate: '2026-06-22',
  },
  {
    id: 'POD-004', title: 'ESG & Finance Durable — Comment les Banques Africaines se Préparent à l\'ISSB', domain: 'ESG', domainIcon: 'ri-seedling-line', domainColor: 'primary',
    synopsis: 'Les standards ISSB (IFRS S1/S2) vont redéfinir le reporting des banques africaines. Bilan carbone scope 3, stress tests climatiques, taxonomie verte : par où commencer ? Retour d\'expérience de la première banque UEMOA à avoir publié un rapport pilote ISSB.',
    targetAudience: 'DG, Directeurs Financiers, Responsables ESG, Risk Managers, Investisseurs', duration: '35 min', keyTopics: ['ISSB', 'IFRS S2', 'Bilan carbone', 'Scope 3', 'Finance durable'],
    guestProfile: 'Head of ESG d\'une banque cotée BRVM ou Partner Sustainability Big Four', productionDate: '2026-06-15',
  },
  {
    id: 'POD-005', title: 'Gouvernance SFD — Les 7 Piliers BCEAO pour Attirer les Investisseurs', domain: 'Microfinance', domainIcon: 'ri-hand-coin-line', domainColor: 'accent',
    synopsis: 'Les investisseurs en microfinance exigent désormais un standard de gouvernance équivalent à celui des banques. La BCEAO a défini 7 piliers de gouvernance pour les SFD. Comment les mettre en œuvre pour attirer des financements ? Études de cas de SFD ayant réussi leur transformation.',
    targetAudience: 'DG SFD, PCA, Administrateurs, Investisseurs, Bailleurs', duration: '25 min', keyTopics: ['Gouvernance SFD', '7 Piliers', 'Investisseurs', 'BCEAO', 'Transformation'],
    guestProfile: 'DG d\'une SFD transformée ou Expert Gouvernance Microfinance', productionDate: '2026-06-21',
  },
  {
    id: 'POD-006', title: 'Fintech UEMOA 2026-2027 — Le Guide Stratégique pour les Innovateurs', domain: 'Fintech', domainIcon: 'ri-smartphone-line', domainColor: 'secondary',
    synopsis: 'Le cadre réglementaire fintech UEMOA évolue rapidement : sandbox, établissement de paiement, émetteur monnaie électronique. Quelles opportunités pour les fintechs africaines ? Quels écueils éviter ? Analyse des 3 voies légales pour opérer.',
    targetAudience: 'Fondateurs Fintech, Investisseurs, Banquiers, Régulateurs', duration: '30 min', keyTopics: ['Fintech', 'Régulation', 'Sandbox', 'Paiement mobile', 'Open Banking'],
    guestProfile: 'CEO d\'une fintech agréée UEMOA ou Régulateur Fintech BCEAO', productionDate: '2026-06-19',
  },
];

// --- SCRIPTS — 4 formats pour chaque sujet ---
export interface PodcastScript {
  id: string;
  subjectId: string;
  format: '5min' | '15min' | '30min' | '60min';
  durationSec: number;
  intro: string;
  segments: { title: string; durationSec: number; narration: string }[];
  transitions: string[];
  conclusion: string;
  callToAction: string;
  productionNotes: string;
  keywords: string[];
}

export const PODCAST_SCRIPTS: PodcastScript[] = [
  // POD-001 — Ratio Solvabilité — Format 5min
  {
    id: 'SCR-001-5', subjectId: 'POD-001', format: '5min', durationSec: 300,
    intro: 'Bonjour et bienvenue dans KHEPRA Expert Voices. Aujourd\'hui, en 5 minutes : la réforme du ratio de solvabilité UEMOA 2026. La BCEAO vient de publier une décision majeure qui va transformer le paysage bancaire ouest-africain. Voici ce que vous devez savoir.',
    segments: [
      { title: 'Le Contexte', durationSec: 90, narration: 'Le ratio de solvabilité minimum passe de 9,5% à 10,5% pour toutes les banques, et jusqu\'à 12% pour les établissements systémiques. Cette décision, publiée le 15 juin 2026, s\'inscrit dans le cadre de la convergence vers Bâle III. Le calendrier de mise en conformité s\'étend sur 24 mois, avec une première étape en décembre 2026.' },
      { title: 'Les Implications', durationSec: 120, narration: 'Concrètement, cela signifie que les banques devront renforcer leurs fonds propres ou réduire leurs expositions pondérées. Pour une banque moyenne avec 100 milliards FCFA d\'actifs pondérés, le gap de fonds propres peut atteindre 2,5 milliards. Trois options : augmentation de capital, rétention des bénéfices, ou optimisation du portefeuille de crédit.' },
      { title: 'Recommandations', durationSec: 90, narration: 'KHEPRA EXPERTS recommande de lancer dès maintenant un diagnostic de solvabilité, d\'évaluer les options de renforcement des fonds propres, et de préparer un plan de transition à soumettre à la Commission Bancaire. Contactez-nous pour un pré-diagnostic gratuit.' },
    ],
    transitions: ['Passons maintenant aux implications concrètes pour votre banque.', 'En résumé, voici ce que nous vous recommandons.'],
    conclusion: 'La réforme du ratio de solvabilité est une opportunité de renforcer la solidité financière de votre établissement. Les banques qui anticipent seront les gagnantes de cette transition.',
    callToAction: 'Téléchargez notre note d\'analyse complète sur khepraexperts.com/ratio-solvabilite-2026 et prenez rendez-vous pour un diagnostic flash confidentiel.',
    productionNotes: 'Ton institutionnel, rythme soutenu. Voix KHEPRA Femme (Aminata Sow). Fond musical discret — piano institutionnel.',
    keywords: ['ratio solvabilité', 'BCEAO', 'UEMOA', 'fonds propres', 'Bâle III', 'banques', '2026'],
  },
  // POD-001 — Ratio Solvabilité — Format 15min
  {
    id: 'SCR-001-15', subjectId: 'POD-001', format: '15min', durationSec: 900,
    intro: 'Bonjour et bienvenue dans KHEPRA Expert Voices, le podcast qui décrypte la régulation financière africaine avec les standards des Big Four. Je suis [Animateur], et aujourd\'hui nous recevons [Expert], ancien Directeur de la Supervision Bancaire à la BCEAO, pour analyser en profondeur la réforme du ratio de solvabilité UEMOA 2026.',
    segments: [
      { title: 'Contexte et Genèse de la Réforme', durationSec: 240, narration: 'Pourquoi maintenant ? La convergence Bâle III, les leçons des crises financières, et la nécessité d\'harmoniser les exigences UEMOA avec les standards internationaux. La BCEAO a mené une étude d\'impact sur 18 mois avant de publier cette décision. Les ratios actuels dans la zone : 60% des banques sont au-dessus de 10%, 25% entre 9,5% et 10%, 15% sous 9,5%.' },
      { title: 'Détail des Nouvelles Exigences', durationSec: 300, narration: 'Analyse article par article de la décision BCEAO/DEC/2026-004. Le coussin de conservation passe à 2,5%. Nouveau : un coussin contra-cyclique de 0 à 2,5% selon la décision du régulateur. Les banques systémiques (actifs > 500 milliards FCFA) sont soumises à un coussin supplémentaire de 1,5%. Calendrier : 31 décembre 2026 pour 50% de l\'effort, 31 décembre 2027 pour la conformité totale.' },
      { title: 'Cas Pratique — Simulation Banque Moyenne', durationSec: 240, narration: 'Prenons l\'exemple d\'une banque avec 150 milliards FCFA d\'actifs pondérés. Ratio actuel : 9,8%. Gap à combler : 2,1 milliards de fonds propres. Scénario 1 : augmentation de capital de 2,5 milliards (dilution 8%). Scénario 2 : réduction des expositions de 20% (perte de PNB estimée 1,2 milliard/an). Scénario 3 : mixte — augmentation 1 milliard + optimisation portefeuille. Analyse coût-bénéfice de chaque scénario.' },
      { title: 'Recommandations et Prochaines Étapes', durationSec: 120, narration: 'KHEPRA EXPERTS recommande aux banques de : 1) Réaliser un diagnostic de solvabilité sous 30 jours, 2) Modéliser les 3 scénarios, 3) Présenter un plan au Conseil d\'Administration, 4) Engager le dialogue avec la Commission Bancaire. Notre équipe a accompagné 12 banques dans cette démarche.' },
    ],
    transitions: ['Examinons maintenant le détail des nouvelles exigences.', 'Pour illustrer, prenons un cas concret.', 'En conclusion, voici nos recommandations.'],
    conclusion: 'La réforme BCEAO 2026 n\'est pas une contrainte — c\'est un levier de crédibilité pour les banques ouest-africaines. Celles qui affichent un ratio supérieur à 12% gagneront un avantage compétitif auprès des investisseurs, des correspondants bancaires et des agences de notation.',
    callToAction: 'Retrouvez notre analyse détaillée, les textes officiels et notre outil de simulation de ratio de solvabilité sur khepraexperts.com/ratio-solvabilite-2026. Abonnez-vous pour ne pas manquer notre prochain épisode sur les stress tests climatiques Pilier 2.',
    productionNotes: 'Ton institutionnel mais accessible. Voix KHEPRA Femme (Aminata Sow). Interview à 2 voix si possible. Fond musical discret. Pauses marquées entre segments.',
    keywords: ['ratio solvabilité', 'BCEAO', 'UEMOA', 'fonds propres', 'Bâle III', 'coussin', 'banques systémiques'],
  },
  // POD-002 — GAFI — Format 5min
  {
    id: 'SCR-002-5', subjectId: 'POD-002', format: '5min', durationSec: 300,
    intro: 'KHEPRA Expert Voices. Aujourd\'hui, en 5 minutes, les 5 changements GAFI 2026 qui impactent les banques africaines. Les nouvelles recommandations sont sorties. Voici l\'essentiel.',
    segments: [
      { title: 'Contexte', durationSec: 60, narration: 'Le GAFI a publié en mars 2026 une mise à jour majeure de ses recommandations. Le GIABA (UEMOA) et le GABAC (CEMAC) vont transposer ces exigences dans les mois à venir. Les banques africaines doivent anticiper.' },
      { title: 'Les 5 Changements Clés', durationSec: 180, narration: '1) Transparence des bénéficiaires effectifs : seuil abaissé à 10% (contre 25%). 2) Élargissement du périmètre PPE aux dirigeants d\'entreprises publiques. 3) Reporting des transactions suspectes sous 24h (contre 5 jours). 4) Nouvelles obligations sur les crypto-actifs. 5) Renforcement de la coopération transfrontalière entre cellules de renseignement financier.' },
      { title: 'Plan d\'Action', durationSec: 60, narration: 'Mettez à jour votre politique KYC, révisez votre classification PPE, adaptez votre processus de déclaration de soupçon, et formez vos équipes. KHEPRA EXPERTS vous accompagne.' },
    ],
    transitions: ['Concrètement, quels sont ces 5 changements ?', 'En pratique, que devez-vous faire ?'],
    conclusion: 'Les banques qui anticipent ces 5 changements éviteront les sanctions et gagneront en crédibilité internationale. La conformité LCB/FT est un investissement stratégique.',
    callToAction: 'Téléchargez notre checklist de mise en conformité GAFI 2026 sur khepraexperts.com/gafi-2026',
    productionNotes: 'Ton alerte, informatif. Voix KHEPRA Homme (Célestin Koffi). Rythme soutenu.',
    keywords: ['GAFI', 'LCB/FT', 'bénéficiaires effectifs', 'PPE', 'déclaration soupçon', 'GIABA', 'GABAC'],
  },
  // POD-002 — GAFI — Format 15min
  {
    id: 'SCR-002-15', subjectId: 'POD-002', format: '15min', durationSec: 900,
    intro: 'Bonjour et bienvenue dans KHEPRA Expert Voices. Je suis [Animateur]. Aujourd\'hui, nous recevons [Expert], consultant senior en conformité LCB/FT auprès des institutions financières africaines. Ensemble, nous décryptons les 5 changements GAFI 2026.',
    segments: [
      { title: 'Introduction au Nouveau Cadre GAFI 2026', durationSec: 180, narration: 'Contexte de la révision : montée des risques crypto, scandales de blanchiment via l\'immobilier de luxe, pressions internationales pour plus de transparence. Impact direct sur les évaluations mutuelles GIABA/GABAC à venir en 2027-2028.' },
      { title: 'Analyse Détaillée des 5 Changements', durationSec: 420, narration: 'Changement 1 : Bénéficiaires effectifs — seuil 10%, registre central obligatoire, sanctions pour fausse déclaration. Changement 2 : PPE — inclut désormais les DG et PCA d\'entreprises publiques, les hauts gradés militaires. Changement 3 : Délai déclaration soupçon — 24h pour les cas graves (terrorisme), 48h pour le reste. Changement 4 : Crypto-actifs — obligations KYC pour les exchanges, traçabilité des transactions. Changement 5 : Coopération internationale — protocole accéléré d\'échange d\'informations entre CENTIF.' },
      { title: 'Implications pour les Banques UEMOA/CEMAC', durationSec: 180, narration: 'Coût estimé de la mise en conformité : 50-200 millions FCFA selon la taille de l\'établissement. Délai de transposition dans les textes UEMOA/CEMAC : 12-18 mois. Recommandation : commencer la mise à jour des politiques et la formation des équipes dès maintenant.' },
      { title: 'Recommandations KHEPRA', durationSec: 120, narration: '1) Audit flash LCB/FT (2 semaines). 2) Mise à jour politique KYC/CDD/EDD. 3) Formation obligatoire 100% collaborateurs. 4) Stress test LCB/FT sur un échantillon de clients existants. 5) Préparation au prochain cycle d\'évaluation mutuelle.' },
    ],
    transitions: ['Plongeons maintenant dans le détail de chaque changement.', 'Qu\'est-ce que cela signifie concrètement pour votre institution ?', 'Voici la feuille de route que nous recommandons.'],
    conclusion: 'Le GAFI 2026 élève le standard LCB/FT. Pour les banques africaines, c\'est un défi — mais aussi une opportunité de démontrer leur maturité conforme aux meilleurs standards internationaux.',
    callToAction: 'Retrouvez notre guide complet "Mise en Conformité GAFI 2026" sur khepraexperts.com/gafi-2026 et contactez-nous pour un audit flash confidentiel.',
    productionNotes: 'Ton sérieux mais engageant. Voix KHEPRA Homme (Célestin Koffi). Fond musical sobre.',
    keywords: ['GAFI', 'LCB/FT', 'blanchiment', 'conformité', 'KYC', 'PPE', 'GIABA'],
  },
  // POD-003 — Cybersécurité COBAC — Format 15min
  {
    id: 'SCR-003-15', subjectId: 'POD-003', format: '15min', durationSec: 900,
    intro: 'KHEPRA Expert Voices. La directive COBAC sur la cybersécurité bancaire entre en vigueur le 1er janvier 2027. Dans 6 mois. Êtes-vous prêt ? Aujourd\'hui, nous vous donnons la checklist complète.',
    segments: [
      { title: 'Présentation de la Directive', durationSec: 180, narration: 'La directive COBAC 2027 sur la résilience opérationnelle numérique est le "DORA africain". Elle s\'applique à toutes les banques, SFD et établissements de paiement de la zone CEMAC. 5 piliers : gouvernance ICT, gestion des risques ICT, gestion des incidents, tests de résilience, gestion des prestataires tiers.' },
      { title: 'Checklist Pratique', durationSec: 360, narration: 'Pilier 1 : Désigner un responsable ICT au niveau COMEX. Pilier 2 : Cartographier tous les actifs ICT et leurs risques. Pilier 3 : Mettre en place un processus de gestion des incidents avec notification COBAC sous 24h pour les incidents majeurs. Pilier 4 : Réaliser un test de résilience annuel (pentest, scénario de crise). Pilier 5 : Auditer vos prestataires ICT critiques.' },
      { title: 'Budget et Calendrier', durationSec: 180, narration: 'Budget estimé pour une banque moyenne : 150-400 millions FCFA. Priorités des 6 prochains mois : septembre — cartographie ICT, octobre — politique cybersécurité, novembre — test de résilience, décembre — rapport de conformité initial.' },
      { title: 'Recommandations Finales', durationSec: 180, narration: 'Ne sous-estimez pas cette directive. Les sanctions peuvent aller jusqu\'à la suspension d\'agrément. KHEPRA EXPERTS a développé une méthodologie accélérée de mise en conformité COBAC 2027. Contactez-nous.' },
    ],
    transitions: ['Passons maintenant à la checklist pratique que vous devez suivre.', 'Côté budget et calendrier, voici ce qu\'il faut prévoir.', 'En conclusion.'],
    conclusion: 'La directive COBAC 2027 n\'est pas une option. C\'est une obligation réglementaire avec des sanctions significatives. Mais c\'est aussi l\'occasion de professionnaliser votre cybersécurité à un standard international.',
    callToAction: 'Téléchargez notre kit de mise en conformité COBAC 2027 sur khepraexperts.com/cobac-cybersecurite-2027',
    productionNotes: 'Ton urgent mais maîtrisé. Voix KHEPRA Femme (Fatoumata Diallo). Fond tech discret.',
    keywords: ['COBAC', 'cybersécurité', 'CEMAC', 'résilience', 'DORA', 'ICT', '2027'],
  },
  // POD-004 — ESG ISSB — Format 30min
  {
    id: 'SCR-004-30', subjectId: 'POD-004', format: '30min', durationSec: 1800,
    intro: 'Bonjour et bienvenue dans KHEPRA Expert Voices, votre podcast de référence sur la finance durable en Afrique. Aujourd\'hui, un épisode spécial de 30 minutes consacré aux standards ISSB et à leur impact sur les banques africaines. Nous avons le privilège de recevoir [Expert], qui a piloté le premier rapport ESG ISSB-compliant de la zone UEMOA.',
    segments: [
      { title: 'Introduction à l\'ISSB', durationSec: 240, narration: 'L\'ISSB, créé par la Fondation IFRS en 2023, a publié deux standards : IFRS S1 (exigences générales de durabilité) et IFRS S2 (informations liées au climat). Ces standards deviennent la référence mondiale. La BCEAO et la COBAC ont annoncé des feuilles de route d\'adoption. Les investisseurs internationaux exigeront bientôt un reporting ISSB pour toute banque sollicitant des financements.' },
      { title: 'Retour d\'Expérience — Première Banque UEMOA', durationSec: 480, narration: 'Notre invité partage son expérience : comment sa banque a construit son premier rapport ISSB en 9 mois. Les défis : absence de données ESG historiques, complexité du scope 3 (portefeuille de prêts), formation des équipes. Les solutions : méthodologie PCAF pour le bilan carbone, outil de collecte de données ESG intégré au core banking, accompagnement par KHEPRA EXPERTS. Résultats : score CDP "C", 3 nouveaux investisseurs, prime de réputation significative.' },
      { title: 'Focus — Bilan Carbone Scope 3', durationSec: 360, narration: 'Le scope 3 est le plus complexe pour une banque : il couvre les émissions financées — c\'est-à-dire les émissions des clients que la banque finance. La méthodologie PCAF fournit un cadre standardisé. Exemple concret : calcul des émissions financées d\'un portefeuille de crédit de 500 milliards FCFA. Facteurs d\'émission disponibles pour l\'Afrique de l\'Ouest. Limites et précautions méthodologiques.' },
      { title: 'Stress Tests Climatiques Pilier 2', durationSec: 360, narration: 'La BCEAO prépare l\'introduction de stress tests climatiques dans le Pilier 2. Scénarios NGFS (Network for Greening the Financial System) : "Net Zero 2050", "Delayed Transition", "Current Policies". Simulation d\'impact sur le portefeuille de crédit : hausse du coût du risque de 15-30% dans le scénario "Delayed Transition" pour les secteurs exposés (agriculture, énergie, transport).' },
      { title: 'Recommandations Stratégiques', durationSec: 360, narration: '1) Commencer par un diagnostic ESG (2-3 mois). 2) Réaliser un premier bilan carbone simplifié (scopes 1 et 2). 3) Initier la collecte de données scope 3 sur le portefeuille. 4) Préparer un rapport pilote ISSB pour 2027. 5) Intégrer l\'ESG dans la stratégie et la gouvernance. Budget total estimé : 100-300 millions FCFA sur 2 ans.' },
    ],
    transitions: ['Pour illustrer, écoutons le retour d\'expérience de notre invité.', 'Approfondissons maintenant le point le plus technique : le scope 3.', 'Les stress tests climatiques sont la prochaine étape.', 'En synthèse, voici notre feuille de route recommandée.'],
    conclusion: 'L\'ESG n\'est plus une option pour les banques africaines — c\'est une exigence des régulateurs, des investisseurs et bientôt des clients. Les pionniers gagneront un avantage compétitif durable. KHEPRA EXPERTS est votre partenaire pour cette transformation.',
    callToAction: 'Téléchargez notre guide "ESG pour les Banques Africaines — Guide Pratique ISSB" sur khepraexperts.com/esg-banques-africaines et contactez-nous pour un diagnostic ESG flash.',
    productionNotes: 'Ton institutionnel, pédagogique. Voix KHEPRA Femme (Aminata Sow) + interview. Format 2 voix recommandé.',
    keywords: ['ESG', 'ISSB', 'IFRS S2', 'bilan carbone', 'scope 3', 'PCAF', 'stress test climatique'],
  },
  // POD-005 — Gouvernance SFD — Format 25min (30min template)
  {
    id: 'SCR-005-30', subjectId: 'POD-005', format: '30min', durationSec: 1800,
    intro: 'KHEPRA Expert Voices. Aujourd\'hui, nous parlons gouvernance des SFD — un sujet crucial pour attirer les investisseurs dans la microfinance africaine. La BCEAO a défini 7 piliers de gouvernance. Nous allons les décrypter un par un.',
    segments: [
      { title: 'Pourquoi la Gouvernance SFD est Critique', durationSec: 240, narration: 'Les SFD africaines gèrent plus de 2 500 milliards FCFA d\'épargne et de crédit. Pourtant, 40% d\'entre elles ont une note de gouvernance inférieure à 50/100 selon les critères BCEAO. Les investisseurs — fonds d\'investissement, bailleurs, banques — exigent désormais un standard de gouvernance Big Four. La bonne gouvernance n\'est pas un coût : c\'est un accélérateur de financement.' },
      { title: 'Les 7 Piliers — Analyse Détaillée', durationSec: 720, narration: 'Pilier 1 — Composition du CA : minimum 5 membres, 30% indépendants. Pilier 2 — Rôle du CA : stratégie, contrôle, nomination DG. Pilier 3 — Comités spécialisés : Audit, Risques obligatoires pour SFD cat. 3. Pilier 4 — Transparence : reporting financier, publication états financiers audités. Pilier 5 — Gestion des conflits d\'intérêts : politique écrite, registre, abstention. Pilier 6 — Protection des clients : tarification transparente, traitement des réclamations. Pilier 7 — Évaluation annuelle : auto-évaluation du CA, plan d\'amélioration.' },
      { title: 'Cas Pratique — Transformation d\'une SFD', durationSec: 480, narration: 'Étude de cas : une SFD de catégorie 2 au Burkina Faso, 25 000 clients, souhaitant lever 2 milliards FCFA auprès d\'investisseurs. Diagnostic initial : note gouvernance 32/100. Plan de transformation sur 12 mois : restructuration CA, nomination 2 administrateurs indépendants, création comité d\'audit, refonte reporting financier. Résultat : note gouvernance 78/100, levée de fonds réussie (2,5 milliards FCFA), taux d\'intérêt réduit de 2 points.' },
      { title: 'Feuille de Route pour les SFD', durationSec: 360, narration: 'Phase 1 (0-3 mois) : auto-évaluation gouvernance, identification des gaps. Phase 2 (3-6 mois) : restructuration CA, nomination administrateurs indépendants. Phase 3 (6-9 mois) : mise en place comités, refonte reporting. Phase 4 (9-12 mois) : évaluation externe, préparation dossier investisseurs. KHEPRA EXPERTS accompagne les SFD à chaque étape.' },
    ],
    transitions: ['Détaillons maintenant les 7 piliers un par un.', 'Pour concrétiser, voici un cas réel de transformation.', 'En conclusion, voici votre feuille de route.'],
    conclusion: 'La gouvernance est le premier critère de décision des investisseurs en microfinance. Les SFD qui adoptent les 7 piliers BCEAO transforment une contrainte réglementaire en avantage compétitif.',
    callToAction: 'Téléchargez notre guide "7 Piliers de Gouvernance SFD" et notre outil d\'auto-évaluation sur khepraexperts.com/gouvernance-sfd',
    productionNotes: 'Ton pédagogique, motivant. Voix KHEPRA Femme (Fatoumata Diallo). Étude de cas à détailler.',
    keywords: ['gouvernance SFD', '7 piliers', 'BCEAO', 'microfinance', 'investisseurs', 'conseil administration'],
  },
  // POD-006 — Fintech UEMOA — Format 30min
  {
    id: 'SCR-006-30', subjectId: 'POD-006', format: '30min', durationSec: 1800,
    intro: 'KHEPRA Expert Voices. L\'UEMOA est en train de devenir l\'un des environnements réglementaires les plus favorables aux fintechs en Afrique. Aujourd\'hui, nous vous donnons le guide complet pour naviguer dans ce nouveau cadre.',
    segments: [
      { title: 'Le Nouveau Cadre Réglementaire Fintech UEMOA', durationSec: 360, narration: 'La BCEAO a publié en 2026 un cadre réglementaire complet pour les fintechs. Trois voies légales pour opérer : 1) Agrément d\'établissement de paiement, 2) Agrément d\'émetteur de monnaie électronique, 3) Sandbox réglementaire pour l\'expérimentation. Comparaison détaillée des exigences de capital, des activités autorisées, des obligations de reporting.' },
      { title: 'La Sandbox Réglementaire BCEAO', durationSec: 360, narration: 'La sandbox permet de tester un service innovant pendant 12 mois avec des exigences allégées. Conditions d\'éligibilité : innovation réelle, bénéfice pour l\'inclusion financière, plan de sortie vers un agrément complet. Processus de candidature : dossier technique, business plan, démonstration du produit. 8 fintechs actuellement dans la sandbox.' },
      { title: 'Cas Pratiques — 3 Fintechs', durationSec: 540, narration: 'Cas 1 : Une fintech de paiement mobile au Sénégal — parcours sandbox → agrément établissement de paiement en 18 mois. Cas 2 : Une plateforme de crowdfunding en Côte d\'Ivoire — défi de classification réglementaire, solution via un partenariat avec une banque agréée. Cas 3 : Un émetteur de monnaie électronique au Mali — exigences de capital, réseau d\'agents, interopérabilité.' },
      { title: 'Opportunités et Pièges', durationSec: 540, narration: 'Opportunités : marché de 140 millions d\'habitants, taux de bancarisation < 30%, croissance du mobile money (+25%/an), soutien des régulateurs. Pièges : sous-estimation des exigences de capital, complexité de la conformité LCB/FT, lenteur administrative, nécessité d\'un partenaire bancaire local. Recommandations : commencer par la sandbox, s\'entourer d\'experts réglementaires, prévoir 12-18 mois pour l\'agrément complet.' },
    ],
    transitions: ['Examinons maintenant la sandbox, une excellente porte d\'entrée.', 'Pour illustrer, voici trois parcours de fintechs réelles.', 'En conclusion, opportunités et pièges à connaître.'],
    conclusion: 'L\'UEMOA offre un cadre réglementaire structuré et favorable aux fintechs. La clé du succès : comprendre les exigences réglementaires dès le départ, choisir la bonne voie d\'agrément, et s\'entourer d\'experts. KHEPRA EXPERTS a accompagné 5 fintechs dans leur parcours d\'agrément.',
    callToAction: 'Téléchargez notre guide "Fintech UEMOA — Guide Stratégique 2026-2027" sur khepraexperts.com/fintech-uemoa-2026 et réservez une consultation.',
    productionNotes: 'Ton dynamique, inspirant. Voix KHEPRA Homme (Célestin Koffi). Cas pratiques à détailler.',
    keywords: ['fintech', 'UEMOA', 'régulation', 'sandbox', 'paiement mobile', 'monnaie électronique', 'agrément'],
  },
];

// --- PRODUCTION CHAIN ---
export interface ProductionVariant {
  format: 'audio' | 'video' | 'blog' | 'linkedin';
  outputDescription: string;
  specifications: string;
  estimatedProductionTime: string;
  distributionChannels: string[];
  qualityChecks: string[];
}

export const PRODUCTION_VARIANTS: ProductionVariant[] = [
  {
    format: 'audio', outputDescription: 'Fichier MP3 320kbps stéréo, mastering professionnel, normalisation LUFS -16', specifications: 'MP3 320kbps / 44.1kHz, WAV master archive, chapitres embeddés, métadonnées ID3 complètes', estimatedProductionTime: '15-45 min selon durée', distributionChannels: ['Spotify', 'Apple Podcasts', 'Google Podcasts', 'Deezer', 'YouTube (static video)'],
    qualityChecks: ['Niveau sonore', 'Bruit de fond', 'Clics/pops', 'Transitions fluides', 'Durée exacte'],
  },
  {
    format: 'video', outputDescription: 'Vidéo 1080p avec waveform audio, logo KHEPRA, sous-titres FR/EN', specifications: 'MP4 H.264 1080p / 30fps, sous-titres SRT, miniature 1280×720, générique début/fin', estimatedProductionTime: '30-90 min selon durée', distributionChannels: ['YouTube', 'LinkedIn Video', 'Facebook Watch'],
    qualityChecks: ['Qualité vidéo', 'Synchronisation audio', 'Sous-titres exacts', 'Logo visible', 'Miniature conforme'],
  },
  {
    format: 'blog', outputDescription: 'Article blog 1500-3000 mots avec introduction, transcription éditée, visuels, FAQ, CTA', specifications: 'Markdown/HTML, H2/H3 structuré, méta-description SEO, tags, lien podcast, schema Article', estimatedProductionTime: '45-120 min', distributionChannels: ['khepraexperts.com/blog', 'Medium', 'LinkedIn Article'],
    qualityChecks: ['SEO titre < 60 car.', 'Structure H2/H3', 'Liens internes', 'CTA présent', 'Relecture orthographique'],
  },
  {
    format: 'linkedin', outputDescription: 'Post LinkedIn optimisé + résumé 1300 car. + hashtags + visuel + lien podcast', specifications: 'Texte 1300-3000 car., 3-5 hashtags ciblés, visuel 1200×627, lien podcast, CTA commentaire', estimatedProductionTime: '15-30 min', distributionChannels: ['LinkedIn (KHEPRA EXPERTS page)', 'Profils experts KHEPRA'],
    qualityChecks: ['Longueur < 3000 car.', 'Hashtags pertinents', 'Visuel présent', 'Lien fonctionnel', 'Ton professionnel'],
  },
];

// --- QUALITY STANDARDS ---
export interface QualityStandard {
  dimension: string;
  description: string;
  threshold: number;
  icon: string;
}

export const QUALITY_STANDARDS: QualityStandard[] = [
  { dimension: 'Qualité Audio', description: 'Niveau sonore normalisé LUFS -16 (±1), bruit de fond < -50dB, pas de distorsion', threshold: 90, icon: 'ri-volume-up-line' },
  { dimension: 'Qualité Contenu', description: 'Exactitude factuelle 100%, références réglementaires vérifiées, ton institutionnel KHEPRA', threshold: 95, icon: 'ri-file-text-line' },
  { dimension: 'SEO Découverte', description: 'Titre optimisé, description avec mots-clés, tags 10-20, transcription textuelle complète', threshold: 85, icon: 'ri-search-line' },
  { dimension: 'Branding KHEPRA', description: 'Logo KHEPRA EXPERTS visible, signature institutionnelle, charte éditoriale respectée', threshold: 90, icon: 'ri-palette-line' },
  { dimension: 'Structure Podcast', description: 'Intro → Segments → Transitions → Conclusion → CTA, durée respectée ± 5%', threshold: 90, icon: 'ri-layout-line' },
  { dimension: 'Accessibilité', description: 'Sous-titres FR, transcription texte, descriptions audio si vidéo', threshold: 80, icon: 'ri-user-voice-line' },
];

// --- PODCAST FACTORY KPIs ---
export interface PodcastFactoryKPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  history: { month: string; value: number }[];
}

export const PODCAST_FACTORY_KPIS: PodcastFactoryKPI[] = [
  { id: 'episodes', name: 'Épisodes Produits', current: 6, target: 50, unit: '/an', icon: 'ri-mic-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 6 }],
  },
  { id: 'formats', name: 'Formats Disponibles', current: 4, target: 4, unit: '/4', icon: 'ri-stack-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 4 }],
  },
  { id: 'subjects', name: 'Sujets Couverts', current: 6, target: 50, unit: '', icon: 'ri-lightbulb-flash-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 6 }],
  },
  { id: 'quality', name: 'Score Qualité', current: 92, target: 95, unit: '/100', icon: 'ri-medal-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 92 }],
  },
  { id: 'production', name: 'Temps Production Moyen', current: 45, target: 30, unit: 'min', icon: 'ri-timer-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 45 }],
  },
  { id: 'channels', name: 'Canaux de Diffusion', current: 8, target: 12, unit: '', icon: 'ri-share-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 8 }],
  },
];

export const PODCAST_FACTORY_STATS = {
  totalSubjects: 6,
  totalScripts: 8,
  totalFormats: 4,
  totalEpisodesProduced: 6,
  totalProductionVariants: 4,
  qualityScore: 92,
  maturityScore: 78,
  targetMaturity: 95,
  standardLevel: 'Cabinet International — Big Four Grade',
  productionEngineVersion: 'v1.0 — Industrial Podcast Chain',
};



