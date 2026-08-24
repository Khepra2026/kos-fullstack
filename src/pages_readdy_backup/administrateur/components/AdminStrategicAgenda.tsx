import { useState, useRef } from 'react';
import { generateAgendaRecapPDF } from '@/utils/generateAgendaRecapPDF';

/* ─── Types ─── */
type SequenceId = 'introductions' | 'contexte' | 'presentation' | 'feuille-route' | 'technique' | 'questions' | 'conclusion';

interface AgendaItem {
  time: string;
  duration: string;
  title: string;
  objective: string;
  keyMessage: string;
  control: 'lead' | 'listen' | 'balance';
}

interface ScriptBlock {
  posture: string;
  questions: string[];
  toEmerge: string[];
  risks: string[];
  influence: string[];
}

interface SectionData {
  id: SequenceId;
  label: string;
  emoji: string;
  color: string;
  agenda: AgendaItem[];
  script: ScriptBlock;
}

/* ─── Données — Agenda Khepra × Optasia ─── */
const SECTIONS: SectionData[] = [
  {
    id: 'introductions',
    label: '1. Introductions',
    emoji: '🤝',
    color: 'from-emerald-600 to-teal-700',
    agenda: [
      {
        time: '0:00–0:05',
        duration: '5 min',
        title: 'Accueil — Installation de la posture d\'expert',
        objective: 'Établir l\'aura d\'expert immédiatement. Créer un cadre de confidentialité et de co-construction.',
        keyMessage: 'Ce rendez-vous n\'est pas une simple présentation commerciale, c\'est un espace de co-construction pour sécuriser votre trajectoire de croissance en Afrique. Notre objectif aujourd\'hui est d\'aligner votre vision avec les exigences inflexibles des régulateurs pour garantir un succès dès le premier dépôt.',
        control: 'lead',
      },
    ],
    script: {
      posture: 'Expert calme, assuré, sans arrogance. Vous êtes le "senior partner" qui pose le cadre. Posture de co-construction, non de vente directe.',
      questions: [
        '« Merci de nous accorder ce temps. Avant de commencer, je voudrais clarifier un point : notre objectif aujourd\'hui est d\'aligner votre vision avec les exigences inflexibles des régulateurs pour garantir un succès dès le premier dépôt. »',
        '« Ce rendez-vous est un espace de co-construction. Nous allons ensemble cartographier les étapes critiques de votre agrément. »',
      ],
      toEmerge: [
        'Leur perception du rendez-vous (vente vs diagnostic)',
        'Leur niveau d\'ouverture à la co-construction',
        'La présence de tous les décideurs clés autour de la table',
      ],
      risks: [
        'Client qui reste distant → Reformuler : "Nous ne sommes pas ici pour vous vendre un service. Nous sommes ici pour construire avec vous la route la plus sûre vers votre agrément."',
        'Client qui montre de la méfiance → Utiliser la preuve sociale immédiate : "Nous avons accompagné des structures similaires à travers cette même démarche avec 85% de succès au premier dépôt."',
      ],
      influence: [
        'Technique du "cadre de confidentialité" : "Ce que nous allons échanger reste strictement entre nous."',
        'Technique de l\'ancrage autorité : Citer un agrément récent similaire sans nommer le client si NDA.',
        'Technique de la "posture de co-construction" : utiliser "ensemble", "avec vous", "notre route" à chaque phrase.',
      ],
    },
  },
  {
    id: 'contexte',
    label: '2. Contexte & Attentes',
    emoji: '🎯',
    color: 'from-amber-500 to-orange-600',
    agenda: [
      {
        time: '0:05–0:15',
        duration: '10 min',
        title: 'Cartographie des ambitions et attentes d\'Optasia',
        objective: 'Écoute active et validation des ambitions. Faire émerger la vision réelle derrière le projet.',
        keyMessage: 'Nous comprenons l\'envergure du projet d\'Optasia. Un réseau de microfinance à l\'échelle du continent nécessite une solidité irréprochable de l\'actionnariat et de la gouvernance. Nous sommes ici pour transformer cette vision en une structure capitalistique et organisationnelle conforme aux attentes de la COBAC et de la BCEAO.',
        control: 'listen',
      },
    ],
    script: {
      posture: 'Écoute active. Challenger bienveillant. Vous reformulez leurs réponses pour montrer que vous comprenez — et que vous voyez au-delà.',
      questions: [
        '« Optasia vise aujourd\'hui une expansion rapide à travers l\'Afrique. Quelle est votre zone prioritaire immédiate — UEMOA ou CEMAC ? »',
        '« Vous avez déjà initié des discussions avec des régulateurs, ou bien vous êtes en phase d\'exploration ? »',
        '« Quel est le timeline interne qui vous a été fixé pour être opérationnel en microcrédit mobile ? »',
        '« Quelle est la vision à 3 ans : combien de pays, quel volume de portefeuille, quelle cible client ? »',
        '« Quels sont les 3 plus grands défis que vous anticipez dans cette expansion réglementaire ? »',
      ],
      toEmerge: [
        'Leur zone prioritaire (UEMOA vs CEMAC)',
        'Leur niveau de maturité réglementaire (exploration vs avancé)',
        'La pression temporelle interne (board, investisseurs, partenaires)',
        'Leur vision chiffrée à 3 ans',
        'Leurs craintes principales',
      ],
      risks: [
        'Client qui reste vague sur la zone → Reformuler : "Si vous deviez choisir un pays pour démarrer dans 90 jours, lequel ?"',
        'Client qui minimise les délais → "Un agrément mal préparé prend 18 mois. Avec notre méthodologie, c\'est 6 à 9 mois. La différence n\'est pas le régulateur, c\'est la qualité du dossier."',
      ],
      influence: [
        'Technique du "diagnostic partagé" : utiliser le mot "ensemble" à chaque phrase pour créer un sentiment de co-construction.',
        'Technique de la "preuve par l\'absurde" : "Si vous déposiez demain, qu\'est-ce qui bloquerait selon vous ?"',
        'Technique de l\'étiquetage : "Vous avez une vision très claire du produit. Ce que je perçois, c\'est qu\'il vous manque un pont vers le régulateur."',
      ],
    },
  },
  {
    id: 'presentation',
    label: '3. Présentation Khepra',
    emoji: '🏛️',
    color: 'from-slate-700 to-slate-800',
    agenda: [
      {
        time: '0:15–0:25',
        duration: '10 min',
        title: 'Présentation du cabinet et de son approche end-to-end',
        objective: 'Crédibilité par la preuve sociale. Positionner Khepra comme référence agréments IMF en UEMOA/CEMAC sans monologue.',
        keyMessage: 'Khepra Experts, c\'est une expertise terrain avec 85% de succès au premier dépôt. Nous couvrons 5 pays UEMOA/CEMAC. Notre force est l\'approche End-to-End : nous ne nous contentons pas de rédiger, nous orchestrons l\'écosystème (notaires, CAC, experts juridiques OHADA) pour vous.',
        control: 'balance',
      },
    ],
    script: {
      posture: 'Expert confiant mais humble. Vous partagez des faits, pas des promesses. Chaque chiffre est vérifiable. Posture de co-construction.',
      questions: [
        '« Notre taux de succès au premier dépôt est de 85%. La moyenne sectorielle est de 40%. Savez-vous d\'où vient cette différence ? »',
        '« Nous intervenons dans 5 pays UEMOA et CEMAC. Chaque pays a ses spécificités réglementaires. Laquelle vous préoccupe le plus ? »',
        '« Notre approche End-to-End signifie que nous ne nous contentons pas de rédiger. Nous orchestrons l\'écosystème : notaires, CAC, experts juridiques OHADA. Vous n\'avez qu\'un seul interlocuteur. »',
        '« Qu\'attendez-vous le plus d\'un cabinet d\'accompagnement : la vitesse, la qualité, ou la sérénité ? »',
      ],
      toEmerge: [
        'Leur priorité parmi vitesse / qualité / sérénité',
        'Leur réaction au taux de succès de 85%',
        'Leur perception de l\'approche end-to-end',
        'Leur niveau de connaissance des exigences réglementaires spécifiques',
      ],
      risks: [
        'Client qui demande immédiatement un prix → "Nous y viendrons en dernière séquence, après avoir cadré précisément vos besoins. Le prix dépend de 3 variables : la zone, la catégorie d\'agrément, et l\'état de préparation actuel."',
        'Client qui compare avec un concurrent moins cher → "Notre proposition n\'est pas un coût. C\'est un investissement qui sécurise un agrément. La différence entre un dossier préparé par Khepra et un dossier standard, c\'est le taux de succès au premier dépôt et le temps gagné."',
      ],
      influence: [
        'Technique de la "preuve chiffrée" : Le 85% est un chiffre d\'ancrage irréfutable. Le répéter 2-3 fois pendant la réunion.',
        'Technique de l\'effet de communauté : "Nous travaillons avec des cabinets d\'audit, des notaires, des fintechs — tous coordinateurs sur vos dossiers."',
        'Technique de l\'urgence positive : "Plus nous intervenons tôt, plus nous pouvons anticiper les questions du régulateur avant qu\'il ne les pose."',
      ],
    },
  },
  {
    id: 'feuille-route',
    label: '4. Analyse Feuille de Route',
    emoji: '📐',
    color: 'from-rose-600 to-red-700',
    agenda: [
      {
        time: '0:25–0:40',
        duration: '15 min',
        title: 'Analyse critique de la feuille de route Optasia',
        objective: 'Maîtrise des risques et des délais. Identifier les points de friction avant qu\'ils ne deviennent des blocages.',
        keyMessage: 'Séquençage : un déploiement progressif est souvent plus prudent pour stabiliser le modèle opérationnel avant duplication. Jalons COBAC/MINFI : nous identifions les points de friction avant qu\'ils ne deviennent des blocages. Un agrément mal préparé prend 18 mois ; avec nous, c\'est 6 à 9 mois. Option UMOA : l\'intégration immédiate permet une synergie technologique et réglementaire dès le départ.',
        control: 'balance',
      },
    ],
    script: {
      posture: 'Architecte de solution. Vous dessinez le puzzle complet devant eux, pièce par pièce. Challenger bienveillant. Posture de co-construction.',
      questions: [
        '« Si je résume : votre modèle repose sur un score de crédit alternatif et une distribution mobile. C\'est exact. Maintenant, quel élément de ce modèle sera le plus scruté par la BCEAO ou le COBAC ? »',
        '« Votre actionnariat actuel est-il en mesure de présenter des états financiers certifiés pour les 3 dernières années ? »',
        '« Avez-vous déjà identifié un Commissaire aux Comptes agréé localement, ou bien c\'est une démarche à initier ? »',
        '« Quelle est la structure de gouvernance prévue ? Un Conseil d\'Administration est-il déjà constitué ? »',
        '« Votre capital social projeté respecte-t-il le minimum réglementaire du pays cible ? Par exemple, 500M FCFA au Togo pour une IMF 2ème catégorie. »',
        '« Concernant le séquençage : un déploiement progressif est souvent plus prudent pour stabiliser le modèle opérationnel avant duplication. Qu\'en pensez-vous ? »',
      ],
      toEmerge: [
        'Les faiblesses qu\'ils minimisent (ex: "on verra pour le CAC plus tard")',
        'Les divergences internes (tech vs compliance vs business)',
        'Leur niveau de connaissance des exigences BCEAO/COBAC spécifiques',
        'Leur vision du séquençage (progressif vs simultané)',
      ],
      risks: [
        'Client sous-estime la complexité réglementaire → "C\'est une bonne nouvelle que vous soyez confiants. Permettez-moi de vous partager un cas récent où un retard de 8 mois est venu d\'un point que tout le monde avait jugé mineur."',
        'Client devient défensif sur un point faible → Ne pas critiquer. Reformuler : "C\'est un point classique. Nous l\'avons vu sur de nombreux dossiers. Voici comment nous le traitons systématiquement."',
      ],
      influence: [
        'Technique du "séquençage logique" : montrer que le déploiement progressif réduit les risques et rassure le régulateur.',
        'Technique des "jalons réglementaires" : identifier les dates butoirs COBAC/MINFI et les anticiper.',
        'Technique de l\'option UMOA : présenter l\'intégration immédiate comme une synergie technologique et réglementaire dès le départ.',
      ],
    },
  },
  {
    id: 'technique',
    label: '5. Technique & Innovation',
    emoji: '💡',
    color: 'from-indigo-600 to-violet-700',
    agenda: [
      {
        time: '0:40–0:50',
        duration: '10 min',
        title: 'Volet technique, innovation et business model',
        objective: 'Maîtrise de la technologie et du Business Model. Traduire le modèle digital en documentation réglementaire.',
        keyMessage: 'Le régulateur exige aujourd\'hui une architecture IT documentée et une conformité RGPD stricte. Notre rôle est de traduire votre modèle digital en une documentation de sécurité et de flux que la COBAC validera sans réserve. Votre modèle économique doit démontrer une croissance prudente mais crédible avec une composante inclusion financière forte.',
        control: 'lead',
      },
    ],
    script: {
      posture: 'Expert technologique et financier. Vous parlez le langage du régulateur tout en comprenant la vision digitale du client. Posture de co-construction.',
      questions: [
        '« Le régulateur aujourd\'hui exige une architecture IT documentée et une conformité RGPD stricte. Où en êtes-vous sur ces deux dimensions ? »',
        '« Quel type de plateforme technologique envisagez-vous pour le core banking ? Amplitude, Carthago, ou autre ? »',
        '« Votre modèle économique cible-t-il exclusivement le microcrédit, ou intègre-t-il aussi une composante PME ou ESG ? »',
        '« Comment démontrerez-vous au régulateur que votre croissance est prudente mais crédible ? Avez-vous un stress-test financier ? »',
        '« La composante inclusion financière de votre modèle : comment la traduire en critères de scoring conformes aux attentes BCEAO/COBAC ? »',
      ],
      toEmerge: [
        'Leur maturité technologique (choix fait, en cours, non initié)',
        'Leur vision du business model (microcrédit pur vs hybride PME/ESG)',
        'Leur capacité à documenter l\'architecture IT pour le régulateur',
        'Leur compréhension des exigences RGPD en Afrique',
      ],
      risks: [
        'Client pense que la tech suffit → "La technologie est un enabler. Mais sans la documentation réglementaire qui l\'accompagne, le régulateur ne la verra pas."',
        'Client sous-estime la dimension ESG → "La BCEAO et la COBAC intègrent désormais l\'inclusion financière et la responsabilité sociale dans leur grille d\'évaluation."',
      ],
      influence: [
        'Technique de la "traduction réglementaire" : montrer comment transformer leur vision tech en langage régulateur.',
        'Technique du "modèle crédible" : démontrer que prudence ≠ faiblesse. Un régulateur préfère un modèle prudent réaliste à un modèle agressif irréaliste.',
        'Technique de l\'architecte IT : proposer d\'intégrer un architecte IT dans la mission dès le cadrage.',
      ],
    },
  },
  {
    id: 'questions',
    label: '6. Points Ouverts',
    emoji: '❓',
    color: 'from-cyan-600 to-blue-700',
    agenda: [
      {
        time: '0:50–1:00',
        duration: '10 min',
        title: 'Points ouverts et questions client-prestataire',
        objective: 'Lever les doutes. Transformer chaque objection en opportunité de montrer la maîtrise.',
        keyMessage: 'Chaque objection est une opportunité de montrer notre maîtrise. Que ce soit sur les délais ou la complexité, notre méthodologie est conçue pour éliminer les allers-retours inutiles avec le régulateur.',
        control: 'balance',
      },
    ],
    script: {
      posture: 'Closer élégant. Chaque objection est une opportunité. Vous ne défendez pas — vous démontrez. Posture de co-construction.',
      questions: [
        '« Quelles sont les 3 questions les plus importantes pour vous aujourd\'hui ? »',
        '« Y a-t-il un point qui vous fait hésiter à nous confier cette mission ? »',
        '« Si vous deviez résumer votre plus grande crainte dans ce processus d\'agrément, ce serait quoi ? »',
        '« Quel élément de notre approche souhaitez-vous que nous creusions plus en profondeur ? »',
      ],
      toEmerge: [
        'Leurs objections réelles (pas celles qu\'ils affichent)',
        'Leur niveau d\'engagement réel (curiosité vs décision)',
        'Les blocages finaux (budget, validation hiérarchique, calendrier)',
        'La présence d\'un sponsor interne fort',
      ],
      risks: [
        'Client dit "on revient vers vous" → Répondre : "Parfait. Pour vous faciliter la décision, nous vous remettrons la note de cadrage avec deux scénarios : un standard et un accéléré. Cela donnera à votre board une vision claire des options."',
        'Client demande un ROI chiffré → "Le ROI d\'un agrément, c\'est la capacité à opérer légalement. Sans agrément, le coût de l\'opportunité manquée est le marché entier. Notre mission sécurise ce droit d\'opérer."',
        'Client dit "c\'est cher" → "Je comprends. Le cadrage de 5 jours est facturé séparément et déductible de la mission complète. Cela vous permet de valider notre méthode avant de vous engager sur le long terme."',
        'Client dit "c\'est trop complexe, on va se débrouiller" → "La complexité réglementaire est réelle, et elle évolue chaque année. Ce que nous apportons, c\'est une méthodologie éprouvée qui transforme cette complexité en étapes actionnables. Vous restez maîtres de la décision — nous assurons l\'exécution."',
        'Client dit "on a déjà un cabinet juridique" → "Excellent. Nous ne remplaçons pas votre juridique — nous le complétons. Notre valeur ajoutée est le pont entre le juridique, le régulateur, la technologie et le business plan. Votre cabinet juridique sera un allié, pas un concurrent."',
      ],
      influence: [
        'Technique du "reframe d\'objection" : chaque objection est reformulée comme une étape logique du processus.',
        'Technique de la "preuve par le contre-exemple" : "Un client qui avait la même objection a finalement obtenu son agrément en 7 mois grâce à notre méthodologie."',
        'Technique du "cadrage déductible" : le cadrage de 5 jours comme preuve de valeur à faible risque.',
      ],
    },
  },
  {
    id: 'conclusion',
    label: '7. Conclusion & Next Steps',
    emoji: '🎯',
    color: 'from-violet-600 to-purple-700',
    agenda: [
      {
        time: '1:00–1:05',
        duration: '5 min',
        title: 'Conclusion et actions immédiates — Soft Close',
        objective: 'Engagement concret. Proposer le cadrage structuré de 5 jours comme prochaine étape.',
        keyMessage: 'Pour avancer, nous proposons un cadrage structuré de 5 jours. À l\'issue de cette semaine, vous aurez une note de mission précise, un planning Gantt, un budget et surtout, votre probabilité de succès. Si nous démarrons ce cadrage lundi prochain, quelle serait votre date idéale pour le kick-off officiel ?',
        control: 'lead',
      },
    ],
    script: {
      posture: 'Closer assumé, mais élégant. Vous ne forcez pas — vous guidez vers la décision logique. Posture de co-construction jusqu\'au bout.',
      questions: [
        '« Sur la base de ce que nous avons échangé, quel serait selon vous l\'impact le plus immédiat d\'un accompagnement structuré sur votre timeline ? »',
        '« Si nous vous remettions une note de cadrage dans 10 jours, qui serait le décideur final de la signature ? »',
        '« Y a-t-il un élément que vous souhaiteriez creuser plus en profondeur avant de valider le cadrage ? »',
        '« Si nous démarrions ce cadrage lundi prochain, quelle serait votre date idéale pour le kick-off officiel ? »',
      ],
      toEmerge: [
        'Leur niveau d\'engagement réel (curiosité vs décision)',
        'Le décideur final et le processus d\'approbation interne',
        'Leur calendrier idéal pour démarrer',
        'Leur réaction au concept de cadrage de 5 jours',
      ],
      risks: [
        'Client dit "on va réfléchir" → "Je vais préparer le PV de ce rendez-vous et la fiche de cadrage. Je vous les envoie d\'ici demain 18h. Vous me confirmez le créneau de kick-off ?"',
        'Client n\'est pas le décideur final → "Parfait. Je vous adresse également une synthèse à destination de votre board — orientée décision, avec les 4 piliers de valeur chiffrés : accélération, conformité, sérénité, succès."',
      ],
      influence: [
        'Technique du "soft close" : "Si nous démarrions le cadrage la semaine prochaine, quelle serait votre date idéale pour le kick-off ?"',
        'Technique de l\'assumptive close : agir comme si la décision était déjà prise. Passer aux détails opérationnels.',
        'Technique du "next-step close" : transformer l\'objection en prochaine étape constructive.',
        'Technique de l\'engagement public : "Je résume ce que nous avons décidé ensemble. Dites-moi si j\'ai mal compris un point."',
      ],
    },
  },
];

/* ─── Sous-données — Narratif & Orchestration ─── */
const NARRATIF_VALEUR = [
  {
    title: 'Accélération — Gagner 6 à 9 mois sur le processus standard',
    content:
      'Un agrément classique prend 12 à 18 mois. Avec notre méthodologie, nos clients obtiennent leur agrément en 6 à 9 mois. Ce gain de temps représente un avantage compétitif majeur : premiers sur le marché, premiers à capter les dépôts, premiers à établir la confiance. Chaque mois gagné est un mois de revenus générés et de parts de marché conquises.',
  },
  {
    title: 'Conformité — Respect strict des actes uniformes OHADA et des piliers COBAC/BCEAO',
    content:
      'Nous entretenons des relations professionnelles structurées avec la BCEAO (Direction des Etablissements de Crédit), la COBAC (Commission Bancaire de l\'Afrique Centrale), et les juridictions OHADA. Notre expertise pointue en conformité OHADA et régulations COBAC/BCEAO garantit que chaque dépôt est préparé selon les standards attendus, dans la langue réglementaire exacte.',
  },
  {
    title: 'Sérénité — Un interlocuteur unique qui gère tous les experts tiers (CAC, Notaires)',
    content:
      'Khepra Experts est votre seul point de contact. Nous orchestrons tous les experts tiers : Commissaires aux Comptes agréés, notaires, juristes OHADA, architectes IT. Vous n\'avez pas à gérer 5 cabinets différents. Un interlocuteur unique qui coordonne l\'ensemble de l\'écosystème pour vous, avec une vision transversale juridique, financière, technologique et réglementaire.',
  },
  {
    title: 'Succès — 85% de réussite dès la première soumission',
    content:
      'Notre taux de succès au premier dépôt dépasse 85% — contre une moyenne sectorielle de 40%. Cette différence ne vient pas du hasard. Elle vient d\'une méthodologie éprouvée, d\'une anticipation systématique des questions du régulateur, et d\'un dossier cohérent présenté avec une voix unique. Nous ne théorisons pas : nous avons traversé les mêmes étapes que vous.',
  },
];

const PARTENAIRES = [
  {
    role: 'Juristes OHADA',
    when: 'Dès la phase de cadrage (S0-S1)',
    how: 'Mobilisés pour structurer les statuts, le pacte d\'actionnaires, et valider la conformité OHADA avant dépôt.',
    effect: 'Rassurer le régulateur sur la solidité juridique de la structure. Éviter les allers-retours statutaires.',
  },
  {
    role: 'Notaires',
    when: 'Phase de constitution (S2)',
    how: 'Rédaction et authentification des actes constitutifs, capital social, immatriculation.',
    effect: 'Crédibiliser l\'engagement des actionnaires. Sécuriser la chaîne de titre.',
  },
  {
    role: 'Commissaires aux Comptes (CAC)',
    when: 'Dès la phase de cadrage (S1) et tout au long du processus',
    how: 'Certification des états financiers actionnaires, audit du business plan, attestation de conformité comptable.',
    effect: 'Indispensable pour l\'agrément. Un CAC réputé rassure le régulateur sur la fiabilité des projections.',
  },
  {
    role: 'Partenaires technologiques (Core Banking, Fintech)',
    when: 'Phase de structuration opérationnelle (S3)',
    how: 'Amplitude, Carthago, ou autre plateforme : intégration technique, conformité IT, documentation sécurité.',
    effect: 'Démontrer au régulateur que la plateforme est prête, testée, et conforme aux exigences de sécurité.',
  },
];

const CRITIQUES_REGLEMENTAIRES = [
  {
    theme: 'Actionnariat',
    points: [
      'Qualité des actionnaires : expérience sectorielle, antécédents bancaires, non-condamnation.',
      'États financiers certifiés des 3 dernières années pour chaque actionnaire moral.',
      'Transparence de la chaîne de contrôle (UBO — Ultimate Beneficial Owner).',
      'Pacte d\'actionnaires conforme OHADA et aux exigences spécifiques du régulateur cible.',
    ],
    approche:
      'Ne pas présenter l\'actionnariat "tel quel". Le restructurer dès le cadrage si nécessaire. Anticiper les questions du régulateur sur la capacité financière des actionnaires à soutenir la croissance.',
  },
  {
    theme: 'Gouvernance & Dirigeants',
    points: [
      'Agrément individuel des dirigeants (honnêteté, expérience bancaire/ financière, formation).',
      'Composition du Conseil d\'Administration : indépendance, diversité des compétences.',
      'Séparation des fonctions : Président du CA / DG / DFinances.',
      'Politique de rémunération et d\'intérêts liés.',
    ],
    approche:
      'Préparer un "dossier dirigeants" parallèle au dossier sociétaire. Anticiper les entretiens individuels avec le régulateur. Ne jamais sous-estimer le temps de cette phase (3 à 6 mois).',
  },
  {
    theme: 'Capital Social',
    points: [
      'Respect du minimum réglementaire (ex: 500M FCFA au Togo pour IMF 2ème catégorie).',
      'Libération du capital : calendrier, modalités, preuves de versement.',
      'Fonds propres supplémentaires : capacité à injecter en cas de crise.',
    ],
    approche:
      'Le capital est le premier filtre du régulateur. Un capital insuffisant ou mal libéré est un refus immédiat. Structurer la libération en tranches cohérentes avec le business plan.',
  },
  {
    theme: 'Modèle Économique Microfinance',
    points: [
      'Cohérence entre le modèle de crédit scoring, la cible client, et les taux débiteurs.',
      'Plan de développement 3 ans : croissance prudente mais crédible.',
      'Modèle de distribution : agences, agents, digital, hybride.',
      'Composante ESG : critères environnementaux et sociaux intégrés au scoring.',
      'Composante PME : éligibilité si le modèle le prévoit.',
    ],
    approche:
      'Le régulateur vérifie que le modèle est viable ET responsable. Un modèle trop agressif = refus. Un modèle trop conservateur = refus pour manque d\'ambition. Trouver l\'équilibre via notre méthodologie de stress-test.',
  },
  {
    theme: 'Conformité Technologique',
    points: [
      'Architecture IT documentée (schémas, flux, hébergement, backup).',
      'Conformité RGPD / loi locale sur la protection des données.',
      'Audit de sécurité (pentest) réalisé par un cabinet tierce partie reconnu.',
      'Plan de continuité d\'activité (PCA / PRA).',
      'Intégration des plateformes de scoring avec le core banking.',
    ],
    approche:
      'Le régulateur africain est désormais très attentif à la dimension IT. Un dossier sans documentation technique solide est systématiquement retardé. Nous intégrons un architecte IT dans chaque mission dès le cadrage.',
  },
];

const SIGNAUX_ACHAT = [
  'Le client pose des questions sur le "comment" plutôt que sur le "pourquoi" (mode opérationnel).',
  'Il demande des dates précises : "Si on démarre quand ?"',
  'Il mentionne un budget ou un processus d\'approbation interne.',
  'Il demande à rencontrer l\'équipe qui sera sur le terrain.',
  'Il reformule votre proposition avec ses propres mots — signe d\'appropriation.',
  'Il mentionne des concurrents pour se comparer (signe d\'intérêt sérieux, pas de fuite).',
];

const CHECKLIST_POST_RDV = [
  'PV structuré du rendez-vous (envoyé sous 24h)',
  'Checklist documentaire personnalisée (selon les lacunes identifiées)',
  'Note de cadrage de mission (5 jours de travail)',
  'Présentation de l\'équipe projet Khepra + partenaires identifiés',
  'Proposition de NDA spécifique si documents sensibles évoqués',
  'Calendrier de suivi : point d\'avancement hebdomadaire ou bi-mensuel',
];

const LIVRABLES_CADRAGE = [
  { name: 'Note de Cadrage Stratégique', desc: 'Diagnostic initial, analyse des lacunes, plan de travail détaillé, budget prévisionnel, planning Gantt.' },
  { name: 'Roadmap Agrément', desc: 'Chronogramme opérationnel phase par phase (S1-S5), avec jalons réglementaires et livrables intermédiaires.' },
  { name: 'Fiche de Risques & Mitigations', desc: 'Identification des 10 risques principaux, probabilité, impact, et actions préventives.' },
  { name: 'Présentation Board', desc: 'Slides de synthèse pour le Comité de Direction ou le Board d\'Optasia, orientés décision.' },
];

/* ─── Composant ─── */
function ControlBadge({ mode }: { mode: AgendaItem['control'] }) {
  const config = {
    lead: { label: 'LEAD', bg: 'bg-emerald-100 text-emerald-700', icon: 'ri-mic-line' },
    listen: { label: 'ÉCOUTE', bg: 'bg-amber-100 text-amber-700', icon: 'ri-headphone-line' },
    balance: { label: 'ÉQUILIBRE', bg: 'bg-slate-100 text-slate-700', icon: 'ri-scales-3-line' },
  };
  const c = config[mode];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold ${c.bg}`}>
      <i className={c.icon} /> {c.label}
    </span>
  );
}

interface AdminStrategicAgendaProps {
  onUploadGeneratedFile?: (formData: FormData) => Promise<void>;
  onShowToast?: (msg: string, type: 'success' | 'error') => void;
}

export default function AdminStrategicAgenda({ onUploadGeneratedFile, onShowToast }: AdminStrategicAgendaProps) {
  const [openSection, setOpenSection] = useState<SequenceId | null>('introductions');
  const [showScript, setShowScript] = useState(false);
  const [activeTab, setActiveTab] = useState<'agenda' | 'scripts' | 'narratif' | 'partenaires' | 'reglementaire' | 'closing' | 'next'>('agenda');
  const [generatingPDF, setGeneratingPDF] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGeneratePDF = async () => {
    setGeneratingPDF(true);
    onShowToast?.('Génération du PV Post-RDV en cours...', 'success');
    try {
      const blob = await generateAgendaRecapPDF();

      // Download locally
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Khepra_AgendaStrategique_Khepra-x-Optasia_PV-Post-RDV_${new Date().toISOString().split('T')[0]}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      // Upload to admin space if handler provided
      if (onUploadGeneratedFile) {
        const formData = new FormData();
        formData.append('file', blob, `Khepra_AgendaStrategique_Khepra-x-Optasia_PV-Post-RDV_${new Date().toISOString().split('T')[0]}.pdf`);
        formData.append('name', 'PV Post-Rendez-vous — Agenda Stratégique Khepra Experts × Optasia');
        formData.append('description', 'Procès-verbal post-rendez-vous généré automatiquement. Inclut : agenda minuté, scripts de closing, gestion des objections, orchestration des partenaires, points critiques réglementaires, et plan des prochaines étapes.');
        formData.append('category', 'rapport');
        formData.append('client', 'Optasia');
        formData.append('tags', 'PV,RDV,Optasia,agrément,IMF,UEMOA,CEMAC,BCEAO,COBAC,OHADA,closing');
        formData.append('notes', `Généré automatiquement le ${new Date().toLocaleDateString('fr-FR')} depuis l'espace administrateur Khepra Experts.`);

        await onUploadGeneratedFile(formData);
      }

      onShowToast?.('PV Post-RDV généré et sauvegardé avec succès !', 'success');
    } catch (err) {
      console.error(err);
      onShowToast?.('Erreur lors de la génération du PDF', 'error');
    } finally {
      setGeneratingPDF(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── HEADER ── */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-900 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white/10 rounded-md text-xs font-semibold tracking-wider uppercase">Confidentiel — Usage interne</span>
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-md text-xs font-semibold tracking-wider uppercase">Big Four Standard</span>
            </div>
            <button
              onClick={handleGeneratePDF}
              disabled={generatingPDF}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              {generatingPDF ? (
                <><i className="ri-loader-4-line animate-spin" /> Génération PDF...</>
              ) : (
                <><i className="ri-file-pdf-line" /> Générer le PV Post-RDV</>
              )}
            </button>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Agenda Stratégique de Rendez-vous
          </h2>
          <p className="text-lg text-white/80 font-light">
            Khepra Experts <span className="text-amber-400 font-semibold">×</span> Optasia
          </p>
          <p className="text-sm text-white/60 mt-2 max-w-2xl">
            Mission : Accélérer l&apos;agrément IMF en UEMOA / CEMAC. Obtenir un accord de principe,
            sécuriser le closing de la mission d&apos;accompagnement à l&apos;agrément,
            définir les prochaines étapes opérationnelles.
          </p>
          <div className="flex items-center gap-4 mt-5 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <i className="ri-time-line" />
              <span>Durée : 60–90 minutes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <i className="ri-map-pin-line" />
              <span>Contexte : UEMOA / CEMAC</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <i className="ri-shield-check-line" />
              <span>Régulateurs : BCEAO / COBAC / OHADA</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION DES SÉQUENCES ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => { setOpenSection(s.id); setActiveTab('agenda'); scrollToContent(); }}
            className={`text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
              openSection === s.id
                ? 'border-amber-400 bg-gradient-to-br ' + s.color + ' text-white shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm text-gray-700'
            }`}
          >
            <div className="text-2xl mb-2">{s.emoji}</div>
            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${openSection === s.id ? 'text-white/70' : 'text-gray-400'}`}>
              Séquence {SECTIONS.indexOf(s) + 1}
            </p>
            <p className="text-sm font-semibold leading-snug">{s.label.replace('Séquence \d+ — ', '')}</p>
          </button>
        ))}
      </div>

      {/* ── TABS DU CONTENU ── */}
      <div ref={contentRef} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center gap-1 px-4 pt-4 overflow-x-auto">
          {[
            { id: 'agenda', label: 'Agenda minuté', icon: 'ri-time-line' },
            { id: 'scripts', label: 'Script stratégique', icon: 'ri-chat-quote-line' },
            { id: 'narratif', label: 'Narratif de valeur', icon: 'ri-trophy-line' },
            { id: 'partenaires', label: 'Orchestration', icon: 'ri-team-line' },
            { id: 'reglementaire', label: 'Points critiques', icon: 'ri-error-warning-line' },
            { id: 'closing', label: 'Closing', icon: 'ri-lock-unlock-line' },
            { id: 'next', label: 'Prochaines étapes', icon: 'ri-calendar-check-line' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* ── AGENDA MINUTÉ ── */}
          {activeTab === 'agenda' && openSection && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {SECTIONS.find(s => s.id === openSection)?.label}
                </h3>
                <button
                  onClick={() => setShowScript(!showScript)}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className={showScript ? 'ri-eye-off-line' : 'ri-eye-line'} />
                  {showScript ? 'Masquer le script' : 'Afficher le script détaillé'}
                </button>
              </div>
              {SECTIONS.find(s => s.id === openSection)?.agenda.map((item, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-slate-900 text-white rounded-md text-xs font-bold">
                        {item.time}
                      </span>
                      <span className="text-sm font-semibold text-gray-700">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{item.duration}</span>
                      <ControlBadge mode={item.control} />
                    </div>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Objectif stratégique</p>
                      <p className="text-sm text-gray-700">{item.objective}</p>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-lg">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Message clé à faire passer</p>
                      <p className="text-sm text-amber-900 font-medium italic">"{item.keyMessage}"</p>
                    </div>
                  </div>
                  {showScript && (
                    <div className="px-5 py-4 border-t border-gray-100 bg-slate-50/50">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Script suggéré</p>
                      <div className="space-y-2">
                        {SECTIONS.find(s => s.id === openSection)?.script.questions.map((q, qIdx) => (
                          <div key={qIdx} className="flex gap-3">
                            <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
                              {qIdx + 1}
                            </span>
                            <p className="text-sm text-gray-700 leading-relaxed">{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── SCRIPT STRATÉGIQUE ── */}
          {activeTab === 'scripts' && openSection && (
            <div className="space-y-6">
              {(() => {
                const script = SECTIONS.find(s => s.id === openSection)?.script;
                if (!script) return null;
                return (
                  <>
                    <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <i className="ri-user-voice-line text-xl text-slate-600" />
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Posture à adopter</h4>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{script.posture}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-question-answer-line text-teal-600" />
                        Questions puissantes à poser
                      </h4>
                      <div className="space-y-3">
                        {script.questions.map((q, idx) => (
                          <div key={idx} className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4">
                            <span className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-teal-600 text-white rounded-lg text-sm font-bold">
                              {idx + 1}
                            </span>
                            <p className="text-sm text-gray-800 leading-relaxed font-medium">{q}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                        <h4 className="text-sm font-bold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <i className="ri-lightbulb-flash-line" />
                          Éléments à faire émerger
                        </h4>
                        <ul className="space-y-2">
                          {script.toEmerge.map((e, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-emerald-900">
                              <i className="ri-check-line text-emerald-600 mt-0.5" />
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                        <h4 className="text-sm font-bold text-red-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                          <i className="ri-alert-line" />
                          Risques à anticiper
                        </h4>
                        <ul className="space-y-2">
                          {script.risks.map((r, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-red-900">
                              <i className="ri-error-warning-line text-red-600 mt-0.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                      <h4 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <i className="ri-magic-line" />
                        Techniques d&apos;influence et de persuasion
                      </h4>
                      <ul className="space-y-2">
                        {script.influence.map((i, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-amber-900">
                            <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-amber-200 text-amber-800 rounded-md text-xs font-bold">
                              {idx + 1}
                            </span>
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* ── NARRATIF DE VALEUR ── */}
          {activeTab === 'narratif' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Discours de valeur — Khepra Experts</h3>
                <p className="text-sm text-white/80">Construire un narratif de crédibilité, différenciation et maîtrise réglementaire.</p>
              </div>
              {NARRATIF_VALEUR.map((n, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span className="w-7 h-7 flex items-center justify-center bg-teal-600 text-white rounded-lg text-xs font-bold">
                        {idx + 1}
                      </span>
                      {n.title}
                    </h4>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{n.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── ORCHESTRATION DES PARTENAIRES ── */}
          {activeTab === 'partenaires' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Stratégie d&apos;Orchestration des Partenaires</h3>
                <p className="text-sm text-white/80">Quand et comment introduire chaque intervenant dans le processus d&apos;agrément.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Intervenant</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Quand mobiliser</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Comment</th>
                      <th className="px-4 py-3 text-left font-bold text-gray-700">Effet recherché</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {PARTENAIRES.map((p, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            <i className="ri-shield-user-line text-teal-600" />
                            <span className="font-semibold text-gray-900">{p.role}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-700">{p.when}</td>
                        <td className="px-4 py-4 text-gray-700 max-w-sm">{p.how}</td>
                        <td className="px-4 py-4">
                          <span className="inline-block bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-medium">
                            {p.effect}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── POINTS CRITIQUES RÉGLEMENTAIRES ── */}
          {activeTab === 'reglementaire' && (
            <div className="space-y-5">
              <div className="bg-gradient-to-r from-slate-900 to-teal-900 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Gestion des Points Critiques Réglementaires</h3>
                <p className="text-sm text-white/80">5 piliers de conformité à maîtriser pour sécuriser l&apos;agrément.</p>
              </div>
              {CRITIQUES_REGLEMENTAIRES.map((c, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center gap-2">
                    <span className="w-7 h-7 flex items-center justify-center bg-rose-600 text-white rounded-lg text-xs font-bold">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{c.theme}</h4>
                  </div>
                  <div className="px-5 py-4 space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Points de vigilance</p>
                      <ul className="space-y-1.5">
                        {c.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-sm text-gray-700">
                            <i className="ri-checkbox-blank-circle-fill text-teal-500 text-[6px] mt-1.5" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-amber-50 border-l-4 border-amber-400 px-4 py-3 rounded-r-lg">
                      <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Approche Khepra</p>
                      <p className="text-sm text-amber-900">{c.approche}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── CLOSING ── */}
          {activeTab === 'closing' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rose-700 to-red-800 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Stratégie de Closing</h3>
                <p className="text-sm text-white/80">Détecter les signaux, adresser les objections, proposer l&apos;engagement concret.</p>
              </div>

              {/* Signaux d'achat */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-200">
                  <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2">
                    <i className="ri-radar-line" />
                    Signaux d&apos;achat à détecter
                  </h4>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2">
                    {SIGNAUX_ACHAT.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <i className="ri-eye-line text-emerald-600 mt-0.5" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Techniques de closing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: 'Soft Close',
                    desc: 'Poser une question hypothétique qui engage sans pression.',
                    example: '« Si nous démarrions le cadrage la semaine prochaine, quelle serait votre date idéale pour le kick-off ? »',
                    color: 'bg-slate-100 border-slate-200',
                    badge: 'bg-slate-200 text-slate-800',
                  },
                  {
                    title: 'Assumptive Close',
                    desc: 'Agir comme si la décision était déjà prise. Passer aux détails opérationnels.',
                    example: '« Je vais préparer le PV et la fiche de cadrage. Je vous les envoie d\'ici demain 18h. Vous me confirmez le créneau ? »',
                    color: 'bg-amber-50 border-amber-200',
                    badge: 'bg-amber-200 text-amber-800',
                  },
                  {
                    title: 'Next-Step Close',
                    desc: 'Transformer l\'objection en prochaine étape constructive.',
                    example: '« Quel que soit votre choix, la note de cadrage vous apportera une vision stratégique que vous n\'avez pas aujourd\'hui. C\'est déjà une valeur. »',
                    color: 'bg-emerald-50 border-emerald-200',
                    badge: 'bg-emerald-200 text-emerald-800',
                  },
                ].map((t, idx) => (
                  <div key={idx} className={`border rounded-xl p-5 ${t.color}`}>
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-bold mb-3 ${t.badge}`}>
                      {t.title}
                    </span>
                    <p className="text-sm text-gray-700 mb-3">{t.desc}</p>
                    <div className="bg-white/70 border border-white rounded-lg p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Formulation exacte</p>
                      <p className="text-sm text-gray-900 italic">&ldquo;{t.example}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gestion des objections */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-rose-50 px-5 py-3 border-b border-rose-200">
                  <h4 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                    <i className="ri-shield-cross-line" />
                    Gestion des objections principales
                  </h4>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    {
                      objection: '"C\'est trop cher"',
                      reponse: 'Je comprends. Le cadrage de 5 jours est facturé séparément et déductible de la mission complète. Cela vous permet de valider notre méthode avant de vous engager sur le long terme. Le coût d\'un retard d\'agrément de 6 mois est bien supérieur à notre honoraire.',
                    },
                    {
                      objection: '"Le délai est trop long"',
                      reponse: 'Un agrément mal préparé prend 18 mois. Un agrément Khepra prend 6 à 9 mois. La différence n\'est pas dans notre vitesse, mais dans la qualité du dossier au premier dépôt. Chaque aller-retour avec le régulateur coûte 2 à 3 mois. Nous les éliminons.',
                    },
                    {
                      objection: '"C\'est trop complexe, on va se débrouiller"',
                      reponse: 'La complexité réglementaire est réelle, et elle évolue chaque année. Ce que nous apportons, c\'est une méthodologie éprouvée qui transforme cette complexité en étapes actionnables. Vous restez maîtres de la décision — nous assurons l\'exécution.',
                    },
                    {
                      objection: '"On a déjà un cabinet juridique"',
                      reponse: 'Excellent. Nous ne remplaçons pas votre juridique — nous le complétons. Notre valeur ajoutée est le pont entre le juridique, le régulateur, la technologie et le business plan. Votre cabinet juridique sera un allié, pas un concurrent.',
                    },
                  ].map((o, idx) => (
                    <div key={idx} className="px-5 py-4">
                      <p className="text-sm font-bold text-rose-700 mb-2">{o.objection}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{o.reponse}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── PROCHAINES ÉTAPES ── */}
          {activeTab === 'next' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-700 to-violet-800 rounded-xl p-5 text-white">
                <h3 className="text-lg font-bold mb-2">Plan des Prochaines Étapes</h3>
                <p className="text-sm text-white/80">Quitter la table avec un plan concret, des dates, et des responsables.</p>
              </div>

              {/* Checklist */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-indigo-50 px-5 py-3 border-b border-indigo-200">
                  <h4 className="text-sm font-bold text-indigo-800 flex items-center gap-2">
                    <i className="ri-task-line" />
                    Checklist des informations à demander sous 7 jours
                  </h4>
                </div>
                <div className="px-5 py-4">
                  <ul className="space-y-2">
                    {CHECKLIST_POST_RDV.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-indigo-100 text-indigo-700 rounded-md text-xs font-bold">
                          {idx + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Livrables du cadrage */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LIVRABLES_CADRAGE.map((l, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-7 h-7 flex items-center justify-center bg-violet-100 text-violet-700 rounded-lg text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-gray-900">{l.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{l.desc}</p>
                  </div>
                ))}
              </div>

              {/* Planning post-RDV */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <i className="ri-calendar-todo-line text-teal-600" />
                    Planning post-rendez-vous — 14 jours
                  </h4>
                </div>
                <div className="px-5 py-4">
                  <div className="space-y-4">
                    {[
                      { day: 'J+1', action: 'Envoi du PV structuré du rendez-vous par email + récapitulatif des engagements', resp: 'Consultant Khepra' },
                      { day: 'J+2', action: 'Transmission de la checklist documentaire personnalisée', resp: 'Consultant Khepra' },
                      { day: 'J+3', action: 'Réunion interne Khepra : analyse des forces/faiblesses du prospect, scoring qualité', resp: 'Équipe Khepra' },
                      { day: 'J+5', action: 'Relance téléphonique : confirmation de réception + clarification des points flous', resp: 'Consultant Khepra' },
                      { day: 'J+7', action: 'Date butoir de réception des documents par Optasia', resp: 'Optasia' },
                      { day: 'J+10', action: 'Analyse des documents reçus + préparation de la note de cadrage', resp: 'Équipe Khepra' },
                      { day: 'J+14', action: 'Présentation de la note de cadrage + proposition de mission formelle', resp: 'Consultant Khepra' },
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-14 flex-shrink-0 text-center">
                          <span className="inline-block px-2 py-1 bg-slate-900 text-white rounded-md text-xs font-bold">
                            {step.day}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 font-medium">{step.action}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Responsable : {step.resp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gouvernance projet */}
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200 rounded-xl p-5">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <i className="ri-team-line text-slate-600" />
                  Organisation du travail — Gouvernance projet
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900 mb-1">Point focal Khepra</p>
                    <p className="text-gray-600">Consultant principal dédié, interlocuteur unique, avec accès direct au fondateur pour les arbitrages stratégiques.</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900 mb-1">Point focal Optasia</p>
                    <p className="text-gray-600">Interlocuteur nommé avec pouvoir de décision sur les arbitrages. Accès direct au board pour les validations stratégiques.</p>
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="font-semibold text-gray-900 mb-1">Comité de pilotage</p>
                    <p className="text-gray-600">Réunion bi-mensuelle (ou hebdo selon urgence) avec les deux points focaux + le notaire + le CAC + l&apos;architecte IT.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── FOOTER NOTE ── */}
      <div className="bg-gray-100 rounded-xl p-4 text-center">
        <p className="text-xs text-gray-500">
          <i className="ri-lock-line mr-1" />
          Document confidentiel — Khepra Experts — Usage interne exclusif. Ne pas diffuser en dehors du cabinet.
        </p>
      </div>
    </div>
  );
}



