// ============================================================================
// KOS VOICE FACTORY™ — Hub 98
// Bibliothèque Vocale Propriétaire KHEPRA
// Identité Audio Unique — Voices, Tonal Guide, Sound Library
// ============================================================================

// ─── VOICE TALENTS ──────────────────────────────────────────────────────────

export interface VoiceTalent {
  id: string;
  name: string;
  role: 'narrateur' | 'expert' | 'presentateur' | 'intervieweur';
  gender: 'masculin' | 'feminin';
  description: string;
  voiceSignature: string;
  tonalRange: string[];
  bestContexts: string[];
  sampleScript: string;
  icon: string;
  color: string;
  clarityScore: number;
  authorityScore: number;
  warmthScore: number;
  versatilityScore: number;
  status: 'active' | 'development';
  languages: string[];
  brandGuidelines: string;
}

export const VOICE_TALENTS: VoiceTalent[] = [
  {
    id: 'khepra-narrateur',
    name: 'Narrateur KHEPRA',
    role: 'narrateur',
    gender: 'masculin',
    description: 'Voix narrative institutionnelle KHEPRA. Conçue pour les documentaires réglementaires, les grandes synthèses, les rapports annuels audio. Ton posé, grave, rassurant — la voix qui raconte l\'histoire de la conformité en Afrique.',
    voiceSignature: 'Grave, posé, résonnant. Timbre entre 80-120 Hz. Débit 140-150 mots/min. Pauses marquées entre les sections. Articulation impeccable des sigles réglementaires.',
    tonalRange: ['Grave institutionnel', 'Pédagogique calme', 'Solennel', 'Rassurant'],
    bestContexts: ['Documentaires réglementaires', 'Rapports annuels audio', 'Grandes synthèses', 'Livres audio institutionnels', 'Voix off corporate'],
    sampleScript: 'Le paysage réglementaire africain connaît sa plus profonde mutation depuis l\'indépendance des institutions financières. La BCEAO, la COBAC et les régulateurs nationaux convergent vers un standard de gouvernance qui redéfinit l\'exercice du métier bancaire.',
    icon: 'ri-mic-fill',
    color: '#B8860B',
    clarityScore: 97,
    authorityScore: 96,
    warmthScore: 74,
    versatilityScore: 68,
    status: 'active',
    languages: ['Français', 'Anglais'],
    brandGuidelines: 'Utiliser pour les contenus de plus de 8 minutes nécessitant une autorité calme. Éviter pour les formats courts (<3 min) ou dynamiques. Toujours accompagner d\'un fond sonore feutré (piano léger ou nappe ambiante basse).',
  },
  {
    id: 'khepra-expert',
    name: 'Expert KHEPRA',
    role: 'expert',
    gender: 'masculin',
    description: 'Voix d\'analyse technique KHEPRA. Incarne l\'expertise Big Four — précis, incisif, crédible. Conçue pour les décryptages réglementaires, les analyses de ratios prudentiels, les formations techniques avancées.',
    voiceSignature: 'Médium-grave, précis, articulé. Timbre 100-140 Hz. Débit 150-160 mots/min. Emphase sur les chiffres et les termes techniques. Micro-pauses avant chaque donnée chiffrée.',
    tonalRange: ['Analytique précis', 'Didactique', 'Incisif', 'Crédible'],
    bestContexts: ['Décryptages réglementaires', 'Analyses ratios prudentiels', 'Formations techniques', 'Podcasts experts', 'Vidéos YouTube format long'],
    sampleScript: 'Le ratio de solvabilité Tier 1 passe de 7,5% à 9,25% au 1er janvier 2027. Cette augmentation de 175 points de base constitue le resserrement prudentiel le plus agressif de l\'histoire de l\'UEMOA. Trois implications majeures pour votre institution.',
    icon: 'ri-brain-line',
    color: '#2E5A88',
    clarityScore: 99,
    authorityScore: 98,
    warmthScore: 52,
    versatilityScore: 72,
    status: 'active',
    languages: ['Français', 'Anglais'],
    brandGuidelines: 'Voix signature pour tous les contenus techniques et réglementaires. Maintenir un ton neutre et factuel — jamais alarmiste. Les données chiffrées doivent être livrées avec une pause avant et après pour maximiser l\'impact.',
  },
  {
    id: 'khepra-presentateur',
    name: 'Présentateur KHEPRA',
    role: 'presentateur',
    gender: 'feminin',
    description: 'Voix de présentation et d\'animation KHEPRA. Conçue pour les introductions de webinaires, les transitions de podcasts, les annonces institutionnelles. Ton chaleureux, engageant, énergique mais professionnel.',
    voiceSignature: 'Médium clair, chaleureux, dynamique. Timbre 180-220 Hz. Débit 155-170 mots/min. Variations tonales expressives. Sourire audible dans les transitions.',
    tonalRange: ['Chaleureux engageant', 'Dynamique', 'Professionnel animé', 'Accueillant'],
    bestContexts: ['Webinaires', 'Podcasts — animation', 'Événements live', 'Vidéos Shorts', 'Annonces institutionnelles', 'Messages de bienvenue'],
    sampleScript: 'Bienvenue dans ce nouveau numéro de KHEPRA Experts, votre rendez-vous réglementaire. Aujourd\'hui, nous décryptons ensemble la réforme du ratio de solvabilité UEMOA 2026. Un sujet technique, mais essentiel — et nous allons le rendre accessible.',
    icon: 'ri-megaphone-line',
    color: '#C75B39',
    clarityScore: 95,
    authorityScore: 78,
    warmthScore: 97,
    versatilityScore: 90,
    status: 'active',
    languages: ['Français', 'Anglais'],
    brandGuidelines: 'Utiliser pour tous les contenus d\'animation et d\'introduction. Ton toujours inclusif et accessible. Ne jamais être condescendant en simplifiant — « nous allons décrypter ensemble » plutôt que « je vais vous expliquer ».',
  },
  {
    id: 'khepra-intervieweur',
    name: 'Intervieweur KHEPRA',
    role: 'intervieweur',
    gender: 'feminin',
    description: 'Voix d\'interview et de dialogue KHEPRA. Curieuse, investigatrice, respectueuse. Conçue pour les formats d\'interview, les dialogues experts, les tables rondes virtuelles. Pose les bonnes questions au bon moment.',
    voiceSignature: 'Médium-aigu, curieux, posé. Timbre 200-260 Hz. Débit variable (145-175 mots/min). Intonations montantes sur les questions. Pauses stratégiques pour laisser « respirer » les réponses.',
    tonalRange: ['Curieux investigateur', 'Respectueux', 'Questionnant', 'Synthétique'],
    bestContexts: ['Interviews d\'experts', 'Tables rondes', 'Format Q&R', 'Podcasts — interview', 'Format dialogue'],
    sampleScript: 'Docteur Koffi, vous avez dirigé la mission d\'inspection de la BCEAO pour le compte de plusieurs établissements. Quelle est, selon vous, la principale évolution dans l\'approche du régulateur depuis la publication de la circulaire 01-2017 ?',
    icon: 'ri-question-answer-line',
    color: '#6B3FA0',
    clarityScore: 93,
    authorityScore: 72,
    warmthScore: 94,
    versatilityScore: 85,
    status: 'active',
    languages: ['Français'],
    brandGuidelines: 'Les questions doivent être ouvertes et ne jamais suggérer la réponse. Alterner entre questions techniques pointues et questions de vision stratégique. Toujours reformuler une partie de la réponse avant la question suivante.',
  },
];

// ─── TONAL GUIDE ────────────────────────────────────────────────────────────

export interface TonalScene {
  id: string;
  sceneName: string;
  description: string;
  bestTalent: string;
  pace: string;
  pitch: string;
  energy: string;
  techniques: string[];
  exampleUsage: string;
  icon: string;
}

export const TONAL_GUIDE: TonalScene[] = [
  {
    id: 'tone-institutionnel',
    sceneName: 'Institutionnel Solennel',
    description: 'Ton formel et posé pour les communications corporate majeures. Gravité maîtrisée, aucune familiarité. Convient aux annonces officielles, rapports au Conseil, communications régulateurs.',
    bestTalent: 'Narrateur KHEPRA',
    pace: 'Lent à modéré (130-145 mots/min)',
    pitch: 'Médium-grave à grave',
    energy: 'Faible à modérée — Contrôlée',
    techniques: ['Pauses de 1.5-2s entre les phrases clés', 'Descente tonale en fin de paragraphe', 'Volume constant, jamais de pic', 'Respiration audible mais discrète', 'Articulation exagérée des sigles (x1.2 temps normal)'],
    exampleUsage: 'Message du Président du Conseil d\'Administration, Rapport Annuel, Communication à la BCEAO/COBAC.',
    icon: 'ri-building-line',
  },
  {
    id: 'tone-analytique',
    sceneName: 'Analytique Technique',
    description: 'Ton précis et incisif pour les décryptages techniques, les analyses de données, les démonstrations chiffrées. Précision chirurgicale, aucune approximation.',
    bestTalent: 'Expert KHEPRA',
    pace: 'Modéré à rapide (150-165 mots/min)',
    pitch: 'Médium — stable',
    energy: 'Modérée — Concentrée',
    techniques: ['Micro-pause (0.5s) avant chaque donnée chiffrée', 'Emphase de 15% sur les nombres', 'Ton plat pour les énumérations', 'Légère accélération sur les conclusions', 'Articulation maximale des termes anglais'],
    exampleUsage: 'Décryptage Ratio Solvabilité UEMOA, Analyse Portefeuille NPL, Formation IFRS 9.',
    icon: 'ri-bar-chart-grouped-line',
  },
  {
    id: 'tone-pedagogique',
    sceneName: 'Pédagogique Accessible',
    description: 'Ton didactique et encourageant pour les formations, les tutoriels, les contenus éducatifs. Simplifier sans vulgariser, guider sans condescendance.',
    bestTalent: 'Présentateur KHEPRA',
    pace: 'Modéré (140-150 mots/min)',
    pitch: 'Médium — modulé',
    energy: 'Modérée — Encourageante',
    techniques: ['Questions rhétoriques toutes les 2-3 minutes', 'Reformulation des concepts complexes', 'Répétition stratégique des points clés', 'Ton montant sur les transitions vers nouveau sujet', 'Pauses de 1s avant exercice/démonstration'],
    exampleUsage: 'Formation LBC/FT Niveau 1, Tutoriel Cartographie des Risques, Module E-Learning Gouvernance.',
    icon: 'ri-graduation-cap-line',
  },
  {
    id: 'tone-investigation',
    sceneName: 'Investigation & Dialogue',
    description: 'Ton curieux et respectueux pour les formats d\'interview et de dialogue. Écoute active simulée, relances naturelles, curiosité authentique.',
    bestTalent: 'Intervieweur KHEPRA',
    pace: 'Variable (145-175 mots/min)',
    pitch: 'Médium-aigu — expressif',
    energy: 'Variable — Interactive',
    techniques: ['Intonation montante de 20% sur les questions', 'Pause de 1s après réponse avant relance', 'Reformulation partielle avant nouvelle question', 'Sourire audible sur les transitions', 'Ton légèrement plus rapide sur les relances'],
    exampleUsage: 'Interview DG Conformité, Table Ronde Gouvernance, Podcast Club Experts, Format Q&R.',
    icon: 'ri-chat-3-line',
  },
  {
    id: 'tone-urgence',
    sceneName: 'Alerte & Urgence Maîtrisée',
    description: 'Ton d\'alerte contrôlé pour les communications urgentes mais institutionnelles. Gravité sans panique, urgence sans précipitation.',
    bestTalent: 'Expert KHEPRA',
    pace: 'Rapide mais contrôlé (160-170 mots/min)',
    pitch: 'Médium — tendu',
    energy: 'Élevée — Contrôlée',
    techniques: ['Phrases courtes (max 20 mots)', 'Trois points clés maximum', 'Ton descendant sur les actions requises', 'Pas d\'adjectifs subjectifs', 'Respiration moins audible (tension simulée)'],
    exampleUsage: 'Alerte Réglementaire Flash, Communication de Crise, Annonce Sanction Régulateur.',
    icon: 'ri-alert-line',
  },
  {
    id: 'tone-inspiration',
    sceneName: 'Inspiration & Vision',
    description: 'Ton inspirant et visionnaire pour les keynotes, les grands discours, les contenus de leadership. Émotion contrôlée, ambition palpable.',
    bestTalent: 'Présentateur KHEPRA / Narrateur KHEPRA',
    pace: 'Variable (135-160 mots/min)',
    pitch: 'Médium à médium-grave — ample',
    energy: 'Modérée à élevée — Inspirante',
    techniques: ['Montée tonale progressive sur la vision', 'Pause de 2-3s après l\'énoncé de la vision', 'Timbre légèrement plus grave sur les valeurs', 'Légère accélération sur les opportunités', 'Phrase finale avec descente tonale lente'],
    exampleUsage: 'Keynote DG Forum Bancaire, Discours Inaugural Conférence, Vidéo Corporate Vision 2030.',
    icon: 'ri-lightbulb-flash-line',
  },
];

// ─── SOUND LIBRARY ──────────────────────────────────────────────────────────

export interface SoundAsset {
  id: string;
  name: string;
  category: 'intro' | 'transition' | 'background' | 'outro' | 'stinger' | 'ambiance';
  description: string;
  duration: string;
  mood: string;
  instruments: string;
  bpm: number;
  key: string;
  bestWith: string[];
  usageCount: number;
  icon: string;
}

export const SOUND_LIBRARY: SoundAsset[] = [
  {
    id: 'snd-intro-institutionnel',
    name: 'Intro Institutionnelle KHEPRA',
    category: 'intro',
    description: 'Signature sonore officielle KHEPRA. 8 secondes de piano feutré avec nappe de cordes, montée progressive. Identité audio immédiatement reconnaissable.',
    duration: '0:08',
    mood: 'Institutionnel, solennel, rassurant',
    instruments: 'Piano, cordes (violon alto), nappe synthétique basse',
    bpm: 72,
    key: 'Ré mineur',
    bestWith: ['Narrateur KHEPRA', 'Expert KHEPRA'],
    usageCount: 847,
    icon: 'ri-music-line',
  },
  {
    id: 'snd-intro-dynamique',
    name: 'Intro Dynamique KHEPRA',
    category: 'intro',
    description: 'Intro énergique pour formats courts et réseaux sociaux. 5 secondes, percussions légères, montée rapide. Optimisé pour YouTube Shorts et LinkedIn.',
    duration: '0:05',
    mood: 'Dynamique, moderne, professionnel',
    instruments: 'Percussions électroniques, synthé basse, piano rythmique',
    bpm: 110,
    key: 'Do majeur',
    bestWith: ['Présentateur KHEPRA'],
    usageCount: 523,
    icon: 'ri-flashlight-line',
  },
  {
    id: 'snd-transition-douce',
    name: 'Transition Douce — Changement de Section',
    category: 'transition',
    description: 'Transition feutrée de 3 secondes pour marquer un changement de section dans les contenus longs. Nappe de cordes ascendante avec résolution douce.',
    duration: '0:03',
    mood: 'Fluide, continu, professionnel',
    instruments: 'Cordes (quatuor), nappe synthétique',
    bpm: 60,
    key: 'La mineur → Do majeur',
    bestWith: ['Narrateur KHEPRA', 'Expert KHEPRA', 'Intervieweur KHEPRA'],
    usageCount: 1204,
    icon: 'ri-arrow-right-line',
  },
  {
    id: 'snd-transition-impact',
    name: 'Transition Impact — Point Clé',
    category: 'transition',
    description: 'Transition marquée de 2 secondes pour souligner un point clé ou une statistique importante. Hit percussif léger suivi d\'un silence de 0.5s.',
    duration: '0:02',
    mood: 'Impact, attention, focalisation',
    instruments: 'Hit percussif, réverbération',
    bpm: 90,
    key: 'N/A (effet)',
    bestWith: ['Expert KHEPRA'],
    usageCount: 876,
    icon: 'ri-focus-3-line',
  },
  {
    id: 'snd-background-analyse',
    name: 'Fond Sonore — Analyse & Décryptage',
    category: 'background',
    description: 'Nappe ambient basse continue pour les contenus d\'analyse technique. Présence discrète qui maintient l\'attention sans distraire. Boucle de 60 secondes.',
    duration: '1:00 (boucle)',
    mood: 'Concentré, analytique, sérieux',
    instruments: 'Nappe synthétique, basse continue, texture granulaire',
    bpm: 65,
    key: 'Mi mineur',
    bestWith: ['Expert KHEPRA', 'Narrateur KHEPRA'],
    usageCount: 2345,
    icon: 'ri-headphone-line',
  },
  {
    id: 'snd-background-institutionnel',
    name: 'Fond Sonore — Institutionnel Corporate',
    category: 'background',
    description: 'Fond orchestral léger pour les contenus institutionnels longs. Cordes douces, piano discret. Élégance et professionnalisme. Boucle de 120 secondes.',
    duration: '2:00 (boucle)',
    mood: 'Élégant, corporate, professionnel',
    instruments: 'Piano, cordes, contrebasse',
    bpm: 70,
    key: 'Sol majeur',
    bestWith: ['Narrateur KHEPRA', 'Présentateur KHEPRA'],
    usageCount: 1876,
    icon: 'ri-building-2-line',
  },
  {
    id: 'snd-background-podcast',
    name: 'Fond Sonore — Podcast Conversation',
    category: 'background',
    description: 'Fond léger et chaleureux pour les formats podcast et interview. Guitare acoustique douce, percussions feutrées. Boucle de 90 secondes.',
    duration: '1:30 (boucle)',
    mood: 'Chaleureux, conversationnel, engageant',
    instruments: 'Guitare acoustique, percussions douces, basse',
    bpm: 85,
    key: 'Do majeur',
    bestWith: ['Intervieweur KHEPRA', 'Présentateur KHEPRA'],
    usageCount: 1567,
    icon: 'ri-chat-smile-2-line',
  },
  {
    id: 'snd-outro-standard',
    name: 'Outro Standard KHEPRA',
    category: 'outro',
    description: 'Signature de sortie standard. 10 secondes avec résolution harmonique, fondu progressif. Inclut l\'espace pour le call-to-action.',
    duration: '0:10',
    mood: 'Conclusif, satisfaisant, professionnel',
    instruments: 'Piano, cordes, résolution harmonique',
    bpm: 72,
    key: 'Ré mineur → résolution',
    bestWith: ['Tous les talents'],
    usageCount: 956,
    icon: 'ri-stop-circle-line',
  },
  {
    id: 'snd-stinger-question',
    name: 'Stinger — Question / Suspense',
    category: 'stinger',
    description: 'Effet sonore de 1.5 seconde pour introduire une question ou créer un micro-suspense avant une révélation. Montée subtile, pas de résolution.',
    duration: '0:01.5',
    mood: 'Curiosité, attente, suspense léger',
    instruments: 'Synthé, texture ascendante',
    bpm: 100,
    key: 'Suspendu (pas de résolution)',
    bestWith: ['Intervieweur KHEPRA', 'Expert KHEPRA'],
    usageCount: 634,
    icon: 'ri-question-mark',
  },
  {
    id: 'snd-ambiance-uemoa',
    name: 'Ambiance — Afrique de l\'Ouest (UEMOA)',
    category: 'ambiance',
    description: 'Texture sonore évoquant l\'Afrique de l\'Ouest. Kora douce, percussions traditionnelles légères, nappe atmosphérique. Pour les contenus géo-spécifiques UEMOA.',
    duration: '2:00 (boucle)',
    mood: 'Africain, authentique, professionnel',
    instruments: 'Kora, balafon (discret), percussions, nappe',
    bpm: 75,
    key: 'Fa majeur',
    bestWith: ['Narrateur KHEPRA', 'Expert KHEPRA'],
    usageCount: 412,
    icon: 'ri-earth-line',
  },
];

// ─── PRONUNCIATION DICTIONARY (VOICE FACTORY SPECIFIC) ─────────────────────

export interface VoicePronunciationRule {
  id: string;
  category: string;
  rule: string;
  examples: { term: string; correct: string; wrong: string }[];
  priority: 'critical' | 'high' | 'medium';
  appliedBy: string[];
}

export const VOICE_PRONUNCIATION_RULES: VoicePronunciationRule[] = [
  {
    id: 'vpr-001',
    category: 'Sigles Réglementaires',
    rule: 'Tous les sigles réglementaires de 3 lettres ou plus sont épelés à la première occurrence dans un contenu. Les sigles de 2 lettres sont toujours épelés. Exceptions : BCEAO, COBAC, UEMOA, CEMAC, OHADA (prononcés comme des mots).',
    examples: [
      { term: 'LBC/FT', correct: 'el-bé-cé / ef-té', wrong: 'el-bi-si / ef-ti' },
      { term: 'AMF-UEMOA', correct: 'cré-pé-em-ef', wrong: 'cré-pe-me-fe' },
      { term: 'GAFI', correct: 'ga-fi', wrong: 'ga-fi (prononcé à l\'anglaise)' },
      { term: 'ISSB', correct: 'i-es-es-bé', wrong: 'i-es-es-bi (anglicisme)' },
    ],
    priority: 'critical',
    appliedBy: ['Narrateur KHEPRA', 'Expert KHEPRA', 'Présentateur KHEPRA', 'Intervieweur KHEPRA'],
  },
  {
    id: 'vpr-002',
    category: 'Nombres et Données',
    rule: 'Les nombres entiers ≤ 100 sont lus en toutes lettres. Au-delà, format numérique. Les pourcentages : « X pour cent ». Les années : « deux-mille-vingt-six ». Les décimales : « virgule » (jamais « point »).',
    examples: [
      { term: '2026', correct: 'deux-mille-vingt-six', wrong: 'vingt-vingt-six' },
      { term: '9,25%', correct: 'neuf virgule vingt-cinq pour cent', wrong: 'neuf point vingt-cinq pourcent' },
      { term: '175 bps', correct: 'cent-soixante-quinze points de base', wrong: 'un-sept-cinq bips' },
      { term: '1 500 000 000 FCFA', correct: 'un milliard cinq cents millions de francs CFA', wrong: 'un virgule cinq milliard' },
    ],
    priority: 'critical',
    appliedBy: ['Narrateur KHEPRA', 'Expert KHEPRA', 'Présentateur KHEPRA', 'Intervieweur KHEPRA'],
  },
  {
    id: 'vpr-003',
    category: 'Anglicismes',
    rule: 'Proscrire tout anglicisme phonétique dans la production audio KHEPRA. Les termes anglais intégrés au français financier africain sont prononcés à la française. Exception : noms propres de personnes ou marques.',
    examples: [
      { term: 'Compliance', correct: 'com-pli-ance (francisé)', wrong: 'com-plaïe-ance (prononciation anglaise)' },
      { term: 'Reporting', correct: 're-por-ting (francisé)', wrong: 'ri-por-ting (prononciation anglaise)' },
      { term: 'Stress test', correct: 'stress test (prononcé à la française)', wrong: 'strèss tèst (accent anglais)' },
      { term: 'Due diligence', correct: 'dué di-li-gence (francisé)', wrong: 'diou di-li-djence (prononciation anglaise)' },
    ],
    priority: 'high',
    appliedBy: ['Narrateur KHEPRA', 'Expert KHEPRA', 'Présentateur KHEPRA', 'Intervieweur KHEPRA'],
  },
  {
    id: 'vpr-004',
    category: 'Institutions Africaines',
    rule: 'Les noms d\'institutions africaines sont prononcés selon la phonétique locale, jamais anglicisés. Respecter l\'accent tonique local.',
    examples: [
      { term: 'BCEAO (Siège Dakar)', correct: 'bé-cé-eu-a-o', wrong: 'bi-ci-i-é-o' },
      { term: 'COBAC (Siège Libreville)', correct: 'co-bac', wrong: 'co-bake' },
      { term: 'BRVM (Abidjan)', correct: 'bé-er-vé-em', wrong: 'bi-ar-vi-em' },
      { term: 'BOAD (Lomé)', correct: 'bé-o-a-dé', wrong: 'bo-ad' },
    ],
    priority: 'high',
    appliedBy: ['Narrateur KHEPRA', 'Expert KHEPRA', 'Présentateur KHEPRA', 'Intervieweur KHEPRA'],
  },
  {
    id: 'vpr-005',
    category: 'Texte Juridique et Réglementaire',
    rule: 'Les références juridiques sont lues avec le numéro en toutes lettres. Les articles : « article » + numéro en chiffres. Les alinéas : « alinéa » + numéro en chiffres. Les circulaires : « circulaire » + numéro complet.',
    examples: [
      { term: 'Art. L. 511-1', correct: 'article el cinq-cent-onze un', wrong: 'article L cinq-un-un' },
      { term: 'Circ. 01-2017/CB', correct: 'circulaire zéro-un deux-mille-dix-sept cé-bé', wrong: 'circulaire un deux-mille-dix-sept' },
      { term: 'Instr. 003-2018', correct: 'instruction zéro-zéro-trois deux-mille-dix-huit', wrong: 'instruction trois deux-mille-dix-huit' },
      { term: 'Art. 44 Al. 2', correct: 'article quarante-quatre alinéa deux', wrong: 'article quarante-quatre alinéa second' },
    ],
    priority: 'critical',
    appliedBy: ['Expert KHEPRA', 'Narrateur KHEPRA'],
  },
  {
    id: 'vpr-006',
    category: 'Noms Propres Africains',
    rule: 'Respecter scrupuleusement la prononciation des noms propres africains. Vérifier auprès de sources locales si incertitude. Ne jamais franciser ou angliciser un nom africain.',
    examples: [
      { term: 'Ouattara', correct: 'wa-ta-ra', wrong: 'ou-a-ta-ra' },
      { term: 'Nguéma', correct: 'en-gué-ma', wrong: 'gué-ma' },
      { term: 'Kaboré', correct: 'ka-bo-ré', wrong: 'ka-bo-ré (accent tonique déplacé)' },
      { term: 'Diallo', correct: 'dja-lo', wrong: 'di-a-lo' },
    ],
    priority: 'high',
    appliedBy: ['Narrateur KHEPRA', 'Intervieweur KHEPRA', 'Présentateur KHEPRA'],
  },
];

// ─── AUDIO IDENTITY CHARTER ─────────────────────────────────────────────────

export interface AudioIdentityPrinciple {
  id: string;
  principle: string;
  description: string;
  icon: string;
  doList: string[];
  dontList: string[];
}

export const AUDIO_IDENTITY_PRINCIPLES: AudioIdentityPrinciple[] = [
  {
    id: 'aip-001',
    principle: 'Une Voix, Une Signature',
    description: 'Chaque contenu KHEPRA doit être immédiatement reconnaissable comme provenant de KHEPRA EXPERTS, avant même que le nom ne soit prononcé. L\'identité sonore est aussi importante que l\'identité visuelle.',
    icon: 'ri-fingerprint-line',
    doList: [
      'Utiliser systématiquement les 4 voix signature KHEPRA',
      'Commencer chaque contenu par le jingle signature KHEPRA (Intro Institutionnelle)',
      'Maintenir une cohérence tonale sur tous les canaux',
      'Terminer par la signature de sortie standard',
    ],
    dontList: [
      'Ne jamais mélanger les voix KHEPRA avec des voix TTS génériques non validées',
      'Ne pas utiliser de musiques libres de droits non validées par la charte',
      'Ne pas commencer un contenu sans l\'intro KHEPRA',
    ],
  },
  {
    id: 'aip-002',
    principle: 'Excellence Francophone Africaine',
    description: 'L\'accent et la prononciation KHEPRA reflètent l\'excellence professionnelle africaine francophone. Ni imitation du français hexagonal, ni anglicisation. Une identité propre, crédible, authentique.',
    icon: 'ri-global-line',
    doList: [
      'Prononcer les termes africains avec leur phonétique locale',
      'Utiliser le français professionnel UEMOA/CEMAC standard',
      'Respecter les accents toniques locaux dans les noms propres',
      'Adapter le rythme au public africain (ni trop lent, ni trop rapide)',
    ],
    dontList: [
      'Ne jamais imiter l\'accent français hexagonal',
      'Ne jamais angliciser la prononciation des termes français',
      'Ne pas utiliser d\'expressions idiomatiques non comprises en Afrique',
    ],
  },
  {
    id: 'aip-003',
    principle: 'Autorité Sans Arrogance',
    description: 'Le ton KHEPRA est expert et crédible, mais jamais arrogant ni condescendant. L\'autorité vient de la précision, pas du volume. Le public est traité en pair, pas en élève.',
    icon: 'ri-scales-line',
    doList: [
      'Utiliser le « nous » inclusif plutôt que le « je »',
      'Expliquer les termes techniques à la première occurrence',
      'Nuancer les affirmations par des données et des sources',
      'Reconnaître les zones d\'incertitude réglementaire',
    ],
    dontList: [
      'Ne jamais utiliser un ton professoral ou condescendant',
      'Ne pas faire d\'affirmations péremptoires sans source',
      'Ne pas parler plus fort pour paraître plus crédible',
    ],
  },
  {
    id: 'aip-004',
    principle: 'Rigueur Réglementaire Absolue',
    description: 'Chaque contenu audio KHEPRA est une publication professionnelle engageant la crédibilité du cabinet. Les références réglementaires sont exactes, vérifiées, et à jour. Zéro approximation.',
    icon: 'ri-shield-check-line',
    doList: [
      'Vérifier chaque référence réglementaire avant enregistrement',
      'Citer le numéro exact de l\'instruction/circulaire/directive',
      'Inclure un disclaimer oral pour les contenus d\'analyse',
      'Mettre à jour les contenus quand la réglementation évolue',
    ],
    dontList: [
      'Ne jamais dire « la réglementation dit que... » sans citer la référence',
      'Ne pas utiliser de données obsolètes sans le préciser',
      'Ne pas faire de recommandations juridiques sans disclaimer',
    ],
  },
];

// ─── KPIs ───────────────────────────────────────────────────────────────────

export interface VoiceFactoryKPI {
  id: string;
  name: string;
  icon: string;
  color: string;
  current: number;
  previous: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: { month: string; value: number }[];
}

export const VOICE_FACTORY_KPIS: VoiceFactoryKPI[] = [
  {
    id: 'brand-consistency',
    name: 'Cohérence de Marque Audio',
    icon: 'ri-fingerprint-line',
    color: 'primary',
    current: 96,
    previous: 82,
    target: 98,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 65 }, { month: 'Fév', value: 72 }, { month: 'Mar', value: 78 },
      { month: 'Avr', value: 82 }, { month: 'Mai', value: 89 }, { month: 'Juin', value: 96 },
    ],
  },
  {
    id: 'voice-usage',
    name: 'Utilisation Voix Propriétaires',
    icon: 'ri-mic-fill',
    color: 'accent',
    current: 78,
    previous: 45,
    target: 95,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 20 }, { month: 'Fév', value: 30 }, { month: 'Mar', value: 38 },
      { month: 'Avr', value: 45 }, { month: 'Mai', value: 62 }, { month: 'Juin', value: 78 },
    ],
  },
  {
    id: 'sound-library-coverage',
    name: 'Couverture Bibliothèque Sonore',
    icon: 'ri-music-line',
    color: 'secondary',
    current: 85,
    previous: 60,
    target: 100,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 30 }, { month: 'Fév', value: 40 }, { month: 'Mar', value: 50 },
      { month: 'Avr', value: 60 }, { month: 'Mai', value: 72 }, { month: 'Juin', value: 85 },
    ],
  },
  {
    id: 'pronunciation-accuracy',
    name: 'Précision Prononciation',
    icon: 'ri-book-open-line',
    color: 'primary',
    current: 98.5,
    previous: 91,
    target: 99.5,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 82 }, { month: 'Fév', value: 86 }, { month: 'Mar', value: 89 },
      { month: 'Avr', value: 91 }, { month: 'Mai', value: 95 }, { month: 'Juin', value: 98.5 },
    ],
  },
  {
    id: 'listener-retention',
    name: 'Rétention Auditeurs',
    icon: 'ri-user-heart-line',
    color: 'accent',
    current: 74,
    previous: 58,
    target: 85,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 50 }, { month: 'Mar', value: 54 },
      { month: 'Avr', value: 58 }, { month: 'Mai', value: 66 }, { month: 'Juin', value: 74 },
    ],
  },
  {
    id: 'production-speed',
    name: 'Vitesse Production Audio',
    icon: 'ri-timer-flash-line',
    color: 'secondary',
    current: 22,
    previous: 38,
    target: 15,
    unit: 'min',
    trend: 'down',
    history: [
      { month: 'Jan', value: 45 }, { month: 'Fév', value: 40 }, { month: 'Mar', value: 38 },
      { month: 'Avr', value: 38 }, { month: 'Mai', value: 29 }, { month: 'Juin', value: 22 },
    ],
  },
  {
    id: 'maturity',
    name: 'Maturité Identité Audio',
    icon: 'ri-medal-line',
    color: 'primary',
    current: 78,
    previous: 52,
    target: 95,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 30 }, { month: 'Fév', value: 40 }, { month: 'Mar', value: 48 },
      { month: 'Avr', value: 52 }, { month: 'Mai', value: 65 }, { month: 'Juin', value: 78 },
    ],
  },
];

// ─── GLOBAL STATS ───────────────────────────────────────────────────────────

export const VOICE_FACTORY_STATS = {
  programName: 'KOS Voice Factory™',
  programVersion: 'v1.0',
  launched: '2026-06-23',
  totalTalents: 4,
  activeTalents: 4,
  tonalScenes: 6,
  soundAssets: 10,
  pronunciationRules: 6,
  identityPrinciples: 4,
  totalSoundLibraryDuration: '8:45 (total assets)',
  totalProductions: 2340,
  productionsThisMonth: 312,
  averageQualityScore: 94.2,
  maturityScore: 78,
  targetMaturity: 95,
  governanceStatus: 'Actif — Chaque production audio KHEPRA doit utiliser exclusivement les 4 voix signature et respecter la charte d\'identité audio.',
};