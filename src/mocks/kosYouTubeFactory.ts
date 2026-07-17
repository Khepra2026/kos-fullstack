// ============================================================================
// KOS YOUTUBE FACTORY™ — Hub 99
// Usine YouTube Autonome @KHEPRAEXPERTS
// Pipeline Automatisé: Recherche → Publication → Croissance
// ============================================================================

// ─── CONTENT PIPELINE ──────────────────────────────────────────────────────

export interface PipelineStep {
  id: string;
  stepNumber: number;
  name: string;
  icon: string;
  description: string;
  duration: string;
  tools: string[];
  qualityGate: string;
  status: 'optimized' | 'manual' | 'developing';
}

export const CONTENT_PIPELINE: PipelineStep[] = [
  {
    id: 'step-research',
    stepNumber: 1,
    name: 'Recherche & Veille',
    icon: 'ri-search-eye-line',
    description: 'Scan automatique des sources réglementaires (BCEAO, COBAC, GAFI, OHADA), identification des sujets à fort potentiel, analyse des tendances de recherche YouTube, croisement avec le calendrier réglementaire.',
    duration: 'Automatisé — 24/7',
    tools: ['KOS Regulatory Scanner', 'YouTube Trends API', 'Google Trends Analyzer', 'RAG Knowledge Graph'],
    qualityGate: 'Sujet validé si : source réglementaire vérifiée + potentiel recherche > 1000/mois + non couvert par KHEPRA < 6 mois',
    status: 'optimized',
  },
  {
    id: 'step-script',
    stepNumber: 2,
    name: 'Script & Structuration',
    icon: 'ri-file-text-line',
    description: 'Génération du script complet selon les templates Big Four validés. Structure : Hook → Contexte → Analyse → Recommandations → CTA. Adaptation au format (Short/Long/Podcast/Masterclass).',
    duration: '3-8 min (auto)',
    tools: ['KOS Script Engine', 'Big Four Templates', 'Voice Talent Matcher', 'Duration Calculator'],
    qualityGate: 'Script validé si : conformité réglementaire > 95% + score lisibilité orale > 80 + durée dans la cible ±15%',
    status: 'optimized',
  },
  {
    id: 'step-thumbnail',
    stepNumber: 3,
    name: 'Miniature & Design',
    icon: 'ri-image-line',
    description: 'Génération automatique de la miniature YouTube selon la charte KHEPRA. 3 variantes proposées, A/B testing automatique. Optimisation continue basée sur le CTR.',
    duration: '2-5 min (auto)',
    tools: ['KOS Canva Factory', 'YouTube Thumbnail A/B Engine', 'KHEPRA Brand Validator'],
    qualityGate: 'Miniature validée si : conformité charte KHEPRA + texte lisible sur mobile + contraste suffisant',
    status: 'optimized',
  },
  {
    id: 'step-video',
    stepNumber: 4,
    name: 'Production Vidéo',
    icon: 'ri-film-line',
    description: 'Assemblage automatique : voix KHEPRA + visuels + animations + sous-titres. Rendu 1080p. Intégration des éléments de marque (logo, couleurs, transitions).',
    duration: '5-15 min (auto)',
    tools: ['KOS Video Factory', 'Voice Factory (TTS)', 'Subtitle Engine', 'Brand Overlay Engine'],
    qualityGate: 'Vidéo validée si : résolution 1080p + sous-titres synchronisés > 98% + branding KHEPRA présent + pas d\'artefacts visuels',
    status: 'optimized',
  },
  {
    id: 'step-metadata',
    stepNumber: 5,
    name: 'Description & Chapitrage',
    icon: 'ri-file-list-3-line',
    description: 'Génération du titre optimisé SEO, description complète (200+ mots), chapitrage automatique (timestamps), hashtags stratégiques (15-20), tags YouTube.',
    duration: '1-3 min (auto)',
    tools: ['YouTube SEO Engine', 'Chapter Detector', 'Hashtag Optimizer', 'Keyword Density Analyzer'],
    qualityGate: 'Métadonnées validées si : titre 40-60 caractères + description > 200 mots + 5-8 chapitres + 15-20 hashtags pertinents',
    status: 'optimized',
  },
  {
    id: 'step-publish',
    stepNumber: 6,
    name: 'Publication & Programmation',
    icon: 'ri-send-plane-line',
    description: 'Upload automatique via YouTube API, programmation selon le calendrier éditorial, notification aux abonnés, activation des sous-titres automatiques, paramétrage de la monétisation.',
    duration: '2-4 min (auto)',
    tools: ['YouTube Data API v3', 'KOS Publication Scheduler', 'Notification Engine'],
    qualityGate: 'Publication validée si : upload réussi + visibilité Public + sous-titres activés + playlist assignée + notification push',
    status: 'optimized',
  },
  {
    id: 'step-analytics',
    stepNumber: 7,
    name: 'Analyse & Optimisation',
    icon: 'ri-line-chart-line',
    description: 'Suivi des performances 24h/48h/7j après publication. Analyse du CTR, rétention, engagement. Recommandations d\'optimisation automatiques pour les prochaines vidéos.',
    duration: 'Continu (24/7)',
    tools: ['YouTube Analytics API', 'Retention Analyzer', 'CTR Optimizer', 'Competitive Benchmark'],
    qualityGate: 'Rapport généré si : données 24h disponibles + comparaison avec moyenne canal + recommandations actionnables identifiées',
    status: 'optimized',
  },
];

// ─── CONTENT CALENDAR ──────────────────────────────────────────────────────

export interface ContentSlot {
  id: string;
  type: 'short' | 'video' | 'podcast' | 'masterclass';
  icon: string;
  frequency: string;
  duration: string;
  bestDay: string;
  bestTime: string;
  description: string;
  targetAudience: string;
  kpiPrimary: string;
  kpiSecondary: string;
  currentStreak: number;
  totalProduced: number;
  avgViews: number;
  color: string;
}

export const CONTENT_SLOTS: ContentSlot[] = [
  {
    id: 'short-daily',
    type: 'short',
    icon: 'ri-tiktok-line',
    frequency: 'Quotidien (5/semaine)',
    duration: '30-60 secondes',
    bestDay: 'Lun-Ven',
    bestTime: '08:00 GMT',
    description: 'Shorts YouTube quotidiens. Format : une statistique réglementaire choc + explication flash + CTA. Optimisé pour la découverte et l\'algorithme Shorts.',
    targetAudience: 'Professionnels de la finance (25-45 ans), DAF, Risk Managers',
    kpiPrimary: 'Vues Shorts',
    kpiSecondary: 'Taux de swipe away',
    currentStreak: 34,
    totalProduced: 142,
    avgViews: 2850,
    color: '#FF0000',
  },
  {
    id: 'video-weekly',
    type: 'video',
    icon: 'ri-youtube-line',
    frequency: 'Hebdomadaire (1/semaine)',
    duration: '10-15 minutes',
    bestDay: 'Mardi',
    bestTime: '14:00 GMT',
    description: 'Vidéo longue hebdomadaire. Décryptage approfondi d\'un sujet réglementaire majeur. Format Big Four : analyse, implications, recommandations.',
    targetAudience: 'DG, PCA, Directeurs Conformité, Régulateurs, Investisseurs',
    kpiPrimary: 'Temps de visionnage',
    kpiSecondary: 'Taux de rétention',
    currentStreak: 8,
    totalProduced: 34,
    avgViews: 4200,
    color: '#86BC25',
  },
  {
    id: 'podcast-weekly',
    type: 'podcast',
    icon: 'ri-headphone-line',
    frequency: 'Hebdomadaire (1/semaine)',
    duration: '20-30 minutes',
    bestDay: 'Jeudi',
    bestTime: '06:00 GMT',
    description: 'Podcast Club Experts KHEPRA. Format conversationnel avec analyse multi-angle. Distribution YouTube + plateformes podcast (Spotify, Apple, Deezer).',
    targetAudience: 'Cadres dirigeants, Consultants, Régulateurs, Étudiants Masters',
    kpiPrimary: 'Écoutes complètes',
    kpiSecondary: 'Partages',
    currentStreak: 6,
    totalProduced: 28,
    avgViews: 1800,
    color: '#C75B39',
  },
  {
    id: 'masterclass-monthly',
    type: 'masterclass',
    icon: 'ri-award-line',
    frequency: 'Mensuelle (1/mois)',
    duration: '45-60 minutes',
    bestDay: 'Samedi',
    bestTime: '10:00 GMT',
    description: 'Masterclass mensuelle KHEPRA. Formation approfondie sur une thématique réglementaire. Slides, démonstrations, cas pratiques, Q&R. Contenu premium.',
    targetAudience: 'Professionnels certifiés, Équipes conformité, Étudiants avancés',
    kpiPrimary: 'Taux de complétion',
    kpiSecondary: 'Inscriptions formation',
    currentStreak: 3,
    totalProduced: 12,
    avgViews: 3200,
    color: '#2E5A88',
  },
];

// ─── SCRIPT ENGINE — YOUTUBE ───────────────────────────────────────────────

export interface YouTubeScript {
  id: string;
  title: string;
  format: 'short' | 'video' | 'podcast' | 'masterclass';
  domain: string;
  status: 'published' | 'scheduled' | 'in_production' | 'draft';
  date: string;
  duration: string;
  sections: { name: string; duration: string; content: string }[];
  seoKeywords: string[];
  voiceTalent: string;
  thumbnailVariant: string;
}

export const YOUTUBE_SCRIPTS: YouTubeScript[] = [
  {
    id: 'yt-script-001',
    title: 'Ratio Solvabilité UEMOA 2026 : Ce qui change pour votre banque',
    format: 'video',
    domain: 'BCEAO',
    status: 'published',
    date: '2026-06-20',
    duration: '12:45',
    sections: [
      { name: 'Hook — Le chiffre qui inquiète', duration: '0:45', content: '9,25%. C\'est le nouveau ratio de solvabilité minimum que votre banque devra respecter au 1er janvier 2027. 175 points de base de plus qu\'aujourd\'hui. Qu\'est-ce que cela signifie concrètement pour votre institution ?' },
      { name: 'Contexte — La réforme décryptée', duration: '2:30', content: 'Analyse du nouveau dispositif prudentiel UEMOA. Calendrier de mise en œuvre. Comparaison Bâle III. Institutions concernées. Périmètre d\'application.' },
      { name: 'Analyse — 3 Implications Majeures', duration: '5:00', content: '1) Augmentation de capital nécessaire — calcul par type d\'établissement. 2) Restructuration du portefeuille d\'actifs — pondération des risques. 3) Gouvernance et reporting — nouvelles exigences.' },
      { name: 'Recommandations — Plan d\'Action', duration: '3:00', content: 'Calendrier recommandé : audit flash → gap analysis → plan de recapitalisation → dialogue régulateur. Points d\'attention par taille d\'établissement.' },
      { name: 'CTA — Passez à l\'action', duration: '1:30', content: 'Téléchargez notre guide complet. Contactez KHEPRA EXPERTS pour un diagnostic flash. Abonnez-vous pour le prochain décryptage. Likez et partagez.' },
    ],
    seoKeywords: ['ratio solvabilité UEMOA', 'réforme prudentielle 2026', 'fonds propres banques', 'BCEAO Bâle III', 'ratio Tier 1'],
    voiceTalent: 'Expert KHEPRA',
    thumbnailVariant: 'A — Graphique choc + Texte impact',
  },
  {
    id: 'yt-script-002',
    title: 'GAFI 2026 : Les 3 nouvelles exigences LBC/FT qui changent tout',
    format: 'video',
    domain: 'AML/CFT',
    status: 'scheduled',
    date: '2026-06-27',
    duration: '14:20',
    sections: [
      { name: 'Hook — Urgence Conformité', duration: '0:40', content: 'Le GAFI vient de publier sa mise à jour 2026. Trois recommandations renforcées qui impactent directement votre dispositif LBC/FT. Vous avez 6 mois pour vous mettre en conformité.' },
      { name: 'Contexte — Évolution GAFI', duration: '3:00', content: 'Historique des recommandations GAFI. Cycle d\'évaluation 2026. Implications pour l\'Afrique francophone. Lien avec les régulateurs BCEAO/COBAC.' },
      { name: 'Analyse — 3 Nouvelles Exigences', duration: '6:00', content: '1) Bénéficiaires effectifs — registre centralisé obligatoire. 2) PEP — élargissement de la définition. 3) Actifs virtuels — nouveau cadre de surveillance.' },
      { name: 'Recommandations — Mise en Conformité', duration: '3:00', content: 'Checklist de conformité. Calendrier de mise en œuvre. Outils et ressources KHEPRA. Formation des équipes.' },
      { name: 'CTA', duration: '1:40', content: 'Diagnostic flash LBC/FT gratuit. Formation certifiante KHEPRA. Abonnement canal.' },
    ],
    seoKeywords: ['GAFI 2026', 'LCB FT nouvelles exigences', 'bénéficiaires effectifs', 'PEP élargissement', 'conformité bancaire'],
    voiceTalent: 'Expert KHEPRA',
    thumbnailVariant: 'B — Visage expert + Alerte rouge',
  },
  {
    id: 'yt-script-003',
    title: 'Shorts : Le saviez-vous ? 80% des SFD UEMOA ne respectent pas ce ratio',
    format: 'short',
    domain: 'Microfinance',
    status: 'published',
    date: '2026-06-22',
    duration: '0:55',
    sections: [
      { name: 'Hook visuel + question', duration: '0:05', content: '80% des SFD — texte choc à l\'écran' },
      { name: 'Le chiffre expliqué', duration: '0:25', content: 'Le ratio de couverture des emplois moyens et longs par les ressources stables. Instruction BCEAO. Pourquoi c\'est critique.' },
      { name: 'CTA + swipe up', duration: '0:25', content: 'Diagnostic flash gratuit en description. Like si vous voulez la suite. Abonnez-vous.' },
    ],
    seoKeywords: ['SFD UEMOA', 'ratio prudentiel', 'microfinance BCEAO', 'conformité SFD'],
    voiceTalent: 'Présentateur KHEPRA',
    thumbnailVariant: 'Short — Texte plein écran',
  },
  {
    id: 'yt-script-004',
    title: 'Club Experts — Gouvernance SFD : Les 7 piliers qui attirent les investisseurs',
    format: 'podcast',
    domain: 'Gouvernance',
    status: 'published',
    date: '2026-06-19',
    duration: '25:30',
    sections: [
      { name: 'Intro & Présentation', duration: '2:00', content: 'Bienvenue au Club Experts KHEPRA. Aujourd\'hui : gouvernance SFD et attractivité investisseurs. Un sujet crucial pour les 750 SFD de l\'UEMOA.' },
      { name: 'Contexte — Pourquoi la gouvernance ?', duration: '4:00', content: 'Les investisseurs regardent d\'abord la gouvernance. Ratio de transformation gouvernance → valorisation. Étude KHEPRA sur 50 SFD.' },
      { name: 'Les 7 Piliers — Analyse', duration: '12:00', content: '1) Indépendance du CA. 2) Comités spécialisés. 3) Transparence financière. 4) Gestion des conflits d\'intérêts. 5) Plan de succession. 6) Digitalisation de la gouvernance. 7) Reporting investisseurs.' },
      { name: 'Interview — Témoignage DG SFD', duration: '5:00', content: 'Interview d\'un DG de SFD ayant implémenté les 7 piliers. Résultats après 12 mois.' },
      { name: 'Conclusion & Prochain Épisode', duration: '2:30', content: 'Résumé. Ressources. Prochain épisode : Finance Islamique SFD.' },
    ],
    seoKeywords: ['gouvernance SFD', 'attirer investisseurs', 'UEMOA microfinance', 'conseil administration SFD', '7 piliers gouvernance'],
    voiceTalent: 'Intervieweur KHEPRA + Expert KHEPRA',
    thumbnailVariant: 'Podcast — Visuels doubles + Logo',
  },
  {
    id: 'yt-script-005',
    title: 'Shorts : 1 minute pour comprendre le nouveau ratio de liquidité BCEAO',
    format: 'short',
    domain: 'BCEAO',
    status: 'published',
    date: '2026-06-21',
    duration: '0:58',
    sections: [
      { name: 'Question', duration: '0:05', content: 'Votre banque est-elle liquide ?' },
      { name: 'Explication flash', duration: '0:28', content: 'Le LCR — Liquidity Coverage Ratio. Minimum 100%. Actifs liquides / sorties nettes de trésorerie sur 30 jours. Nouveau calibrage BCEAO 2026.' },
      { name: 'CTA', duration: '0:25', content: 'Calculateur LCR gratuit en description. Abonnez-vous pour plus de décryptages.' },
    ],
    seoKeywords: ['ratio liquidité BCEAO', 'LCR banque', 'trésorerie bancaire', 'ratio prudentiel'],
    voiceTalent: 'Présentateur KHEPRA',
    thumbnailVariant: 'Short — Infographie rapide',
  },
  {
    id: 'yt-script-006',
    title: 'Masterclass — Cartographie des Risques : Méthodologie COSO intégrale (60 min)',
    format: 'masterclass',
    domain: 'Audit & Contrôle Interne',
    status: 'scheduled',
    date: '2026-07-05',
    duration: '55:00',
    sections: [
      { name: 'Introduction & Objectifs', duration: '5:00', content: 'Présentation du formateur. Objectifs pédagogiques. Programme de la masterclass. Prérequis.' },
      { name: 'Module 1 — Fondamentaux COSO', duration: '12:00', content: 'Les 5 composantes COSO. Les 17 principes. Application au contexte africain. Spécificités BCEAO/COBAC.' },
      { name: 'Module 2 — Méthodologie de Cartographie', duration: '15:00', content: 'Identification des risques. Évaluation impact × probabilité. Heat map. Appétit au risque. Cas pratique : banque UEMOA.' },
      { name: 'Module 3 — Outils & Templates', duration: '10:00', content: 'Matrice des risques KHEPRA. Template Excel. Logiciels de GRC. Dashboard risques.' },
      { name: 'Module 4 — Cas Pratique Complet', duration: '8:00', content: 'Exercice guidé : cartographier les risques d\'une SFD. Correction et feedback.' },
      { name: 'Q&R & Certification', duration: '5:00', content: 'Questions des participants. Attestation de participation. Prochaines masterclass.' },
    ],
    seoKeywords: ['cartographie des risques', 'COSO méthodologie', 'contrôle interne banque', 'gestion des risques', 'formation COSO'],
    voiceTalent: 'Expert KHEPRA',
    thumbnailVariant: 'Masterclass — Slides + Formateur',
  },
  {
    id: 'yt-script-007',
    title: 'Cybersécurité COBAC 2027 : Êtes-vous prêt pour la directive DORA africaine ?',
    format: 'video',
    domain: 'COBAC',
    status: 'in_production',
    date: '2026-07-01',
    duration: '13:50',
    sections: [
      { name: 'Hook — Alerte Cyber', duration: '0:40', content: '2027. C\'est la date butoir de la directive cybersécurité COBAC. Inspirée de DORA Europe. Votre établissement est-il prêt ? 72% des banques CEMAC ne le sont pas.' },
      { name: 'Contexte — DORA Afrique', duration: '3:00', content: 'Genèse de la directive. Parallèle avec DORA européen. Spécificités CEMAC. Périmètre d\'application.' },
      { name: 'Analyse — 5 Piliers', duration: '5:30', content: '1) Gouvernance cyber. 2) Gestion des incidents. 3) Tests de résilience. 4) Gestion des tiers. 5) Partage d\'information.' },
      { name: 'Recommandations', duration: '3:00', content: 'Roadmap de mise en conformité. Budget type. Compétences requises. Solutions KHEPRA.' },
      { name: 'CTA', duration: '1:40', content: 'Audit cybersécurité flash. Contact KHEPRA EXPERTS.' },
    ],
    seoKeywords: ['cybersécurité COBAC', 'directive DORA Afrique', 'résilience opérationnelle', 'CEMAC cybersécurité', 'conformité COBAC 2027'],
    voiceTalent: 'Expert KHEPRA',
    thumbnailVariant: 'A — Alerte cyber + Code binaire',
  },
  {
    id: 'yt-script-008',
    title: 'Club Experts — Finance Islamique SFD : Opportunités et cadre BCEAO',
    format: 'podcast',
    domain: 'Finance Islamique',
    status: 'draft',
    date: '2026-07-10',
    duration: '28:00',
    sections: [
      { name: 'Intro', duration: '2:00', content: 'La finance islamique dans l\'UEMOA. Un marché de 2,5 milliards FCFA en croissance de 30%/an.' },
      { name: 'Cadre Réglementaire', duration: '8:00', content: 'Instructions BCEAO 003-2018, 005-05-2018. Produits autorisés. Conditions d\'exercice.' },
      { name: 'Opportunités SFD', duration: '10:00', content: 'Murabaha, Ijara, Mudaraba. Adaptation aux SFD. Retour d\'expérience.' },
      { name: 'Défis & Solutions', duration: '5:00', content: 'Formation, systèmes d\'information, Sharia Board, refinancement.' },
      { name: 'Conclusion', duration: '3:00', content: 'Potentiel du marché. Ressources KHEPRA.' },
    ],
    seoKeywords: ['finance islamique UEMOA', 'SFD sharia compliant', 'BCEAO finance islamique', 'Murabaha microfinance'],
    voiceTalent: 'Intervieweur KHEPRA + Expert KHEPRA',
    thumbnailVariant: 'Podcast — Finance Islamique',
  },
];

// ─── SEO & DISTRIBUTION ENGINE ─────────────────────────────────────────────

export interface SEODistributionConfig {
  id: string;
  platform: 'youtube' | 'linkedin' | 'twitter' | 'facebook' | 'blog';
  icon: string;
  description: string;
  optimizationTips: string[];
  hashtagStrategy: string;
  crossPosting: string;
  active: boolean;
}

export const SEO_DISTRIBUTION_CONFIGS: SEODistributionConfig[] = [
  {
    id: 'dist-youtube',
    platform: 'youtube',
    icon: 'ri-youtube-fill',
    description: 'Distribution primaire. Titre optimisé SEO (40-60 car.), description 200+ mots, 5-8 chapitres, 15-20 hashtags, playlist thématique, carte de fin, écran de fin.',
    optimizationTips: [
      'Titre : Mot-clé principal dans les 40 premiers caractères',
      'Description : 2-3 premiers paragraphes = résumé SEO avec mots-clés',
      'Hashtags : 3-5 broad + 5-8 medium + 5-7 niche',
      'Playlist : Toujours ajouter à une playlist thématique',
      'End screen : Lien vers la vidéo la plus performante du même thème',
    ],
    hashtagStrategy: '#KHEPRAEXPERTS + 3 niche réglementaires + 2 géographiques + 5 thématiques',
    crossPosting: 'Plateforme primaire — contenu original',
    active: true,
  },
  {
    id: 'dist-linkedin',
    platform: 'linkedin',
    icon: 'ri-linkedin-fill',
    description: 'Distribution secondaire B2B. Post LinkedIn avec extrait 30s + analyse écrite + lien vidéo YouTube. Format natif LinkedIn Video pour les shorts.',
    optimizationTips: [
      'Post LinkedIn : Hook + 3 points clés + CTA lien YouTube',
      'Natif LinkedIn Video pour Shorts (meilleur reach)',
      'Tagguer 3-5 experts/profils pertinents',
      'Publier mardi-jeudi 8h-10h GMT',
      'Répondre aux commentaires dans l\'heure',
    ],
    hashtagStrategy: '#Gouvernance #Conformité #BCEAO #FinanceAfrique + 3 thématiques',
    crossPosting: 'Extraits 30s + article lié + lien vidéo complète YouTube',
    active: true,
  },
  {
    id: 'dist-twitter',
    platform: 'twitter',
    icon: 'ri-twitter-x-fill',
    description: 'Distribution X (Twitter). Thread de 5-7 tweets résumant la vidéo. Extrait vidéo 60s. Lien YouTube en dernier tweet.',
    optimizationTips: [
      'Thread: Hook tweet 1 → 3-5 tweets analyse → Tweet final CTA + lien',
      'Intégrer la vidéo Shorts en natif',
      'Hashtags : 2 max par tweet',
      'Publiquer en semaine 12h-14h GMT',
      'Épingler le thread au profil pendant 48h',
    ],
    hashtagStrategy: '#KHEPRA #BCEAO #Conformité — 2 max',
    crossPosting: 'Thread résumé + extrait vidéo + lien YouTube',
    active: true,
  },
  {
    id: 'dist-facebook',
    platform: 'facebook',
    icon: 'ri-facebook-fill',
    description: 'Distribution Facebook. Post avec vidéo native + description + lien. Groupes professionnels ciblés.',
    optimizationTips: [
      'Vidéo native Facebook (pas de lien YouTube externe en post principal)',
      'Groupes : Finance Afrique, Banque UEMOA, Microfinance',
      'Description courte + émoticônes + question d\'engagement',
      'Publier mercredi-vendredi 18h-20h GMT',
    ],
    hashtagStrategy: '#FinanceAfrique #Banque #Conformité — 3 max',
    crossPosting: 'Vidéo native + lien YouTube en premier commentaire',
    active: false,
  },
  {
    id: 'dist-blog',
    platform: 'blog',
    icon: 'ri-article-line',
    description: 'Transformation automatique vidéo → article de blog SEO. Script converti en article 1500-3000 mots, optimisé SEO, avec vidéo embarquée.',
    optimizationTips: [
      'Article 1500-3000 mots basé sur le script vidéo',
      'Vidéo YouTube embarquée en haut de l\'article',
      'Optimisation SEO : H1, H2, H3, méta-description, schema VideoObject',
      'Liens internes vers articles connexes',
      'Publication simultanée avec la vidéo',
    ],
    hashtagStrategy: 'N/A — SEO traditionnel',
    crossPosting: 'Article de blog avec vidéo embarquée + lien YouTube',
    active: true,
  },
];

// ─── CHANNEL KPIs ──────────────────────────────────────────────────────────

export interface YouTubeChannelKPI {
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

export const YOUTUBE_CHANNEL_KPIS: YouTubeChannelKPI[] = [
  {
    id: 'subscribers',
    name: 'Abonnés @KHEPRAEXPERTS',
    icon: 'ri-user-add-line',
    color: 'primary',
    current: 4850,
    previous: 2100,
    target: 10000,
    unit: '',
    trend: 'up',
    history: [
      { month: 'Jan', value: 520 }, { month: 'Fév', value: 890 }, { month: 'Mar', value: 1450 },
      { month: 'Avr', value: 2100 }, { month: 'Mai', value: 3400 }, { month: 'Juin', value: 4850 },
    ],
  },
  {
    id: 'watch-time',
    name: 'Temps de Visionnage',
    icon: 'ri-time-line',
    color: 'accent',
    current: 12500,
    previous: 5800,
    target: 40000,
    unit: 'heures',
    trend: 'up',
    history: [
      { month: 'Jan', value: 1200 }, { month: 'Fév', value: 2100 }, { month: 'Mar', value: 3600 },
      { month: 'Avr', value: 5800 }, { month: 'Mai', value: 8700 }, { month: 'Juin', value: 12500 },
    ],
  },
  {
    id: 'engagement',
    name: 'Taux d\'Engagement',
    icon: 'ri-heart-line',
    color: 'secondary',
    current: 8.7,
    previous: 5.2,
    target: 12,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 3.1 }, { month: 'Fév', value: 3.8 }, { month: 'Mar', value: 4.5 },
      { month: 'Avr', value: 5.2 }, { month: 'Mai', value: 6.8 }, { month: 'Juin', value: 8.7 },
    ],
  },
  {
    id: 'ctr',
    name: 'Taux de Clic (CTR)',
    icon: 'ri-cursor-line',
    color: 'primary',
    current: 8.2,
    previous: 5.8,
    target: 10,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 3.5 }, { month: 'Fév', value: 4.2 }, { month: 'Mar', value: 4.9 },
      { month: 'Avr', value: 5.8 }, { month: 'Mai', value: 7.1 }, { month: 'Juin', value: 8.2 },
    ],
  },
  {
    id: 'retention',
    name: 'Rétention Moyenne',
    icon: 'ri-user-follow-line',
    color: 'accent',
    current: 62,
    previous: 48,
    target: 70,
    unit: '%',
    trend: 'up',
    history: [
      { month: 'Jan', value: 38 }, { month: 'Fév', value: 42 }, { month: 'Mar', value: 45 },
      { month: 'Avr', value: 48 }, { month: 'Mai', value: 55 }, { month: 'Juin', value: 62 },
    ],
  },
  {
    id: 'authority',
    name: 'Autorité Sectorielle',
    icon: 'ri-medal-line',
    color: 'secondary',
    current: 74,
    previous: 45,
    target: 90,
    unit: '/100',
    trend: 'up',
    history: [
      { month: 'Jan', value: 25 }, { month: 'Fév', value: 32 }, { month: 'Mar', value: 40 },
      { month: 'Avr', value: 45 }, { month: 'Mai', value: 58 }, { month: 'Juin', value: 74 },
    ],
  },
  {
    id: 'revenue',
    name: 'Leads Générés',
    icon: 'ri-money-dollar-circle-line',
    color: 'primary',
    current: 128,
    previous: 42,
    target: 300,
    unit: 'leads/mois',
    trend: 'up',
    history: [
      { month: 'Jan', value: 8 }, { month: 'Fév', value: 15 }, { month: 'Mar', value: 28 },
      { month: 'Avr', value: 42 }, { month: 'Mai', value: 78 }, { month: 'Juin', value: 128 },
    ],
  },
];

// ─── GLOBAL STATS ───────────────────────────────────────────────────────────

export const YOUTUBE_FACTORY_STATS = {
  channelName: '@KHEPRAEXPERTS',
  channelUrl: 'https://youtube.com/@KHEPRAEXPERTS',
  totalVideos: 216,
  totalShorts: 142,
  totalPodcasts: 28,
  totalMasterclass: 12,
  pipelineSteps: 7,
  optimizedSteps: 6,
  scriptsInProduction: 3,
  scheduledContent: 5,
  contentSlots: 4,
  distributionChannels: 5,
  activeDistributions: 4,
  totalSubscribers: 4850,
  totalWatchTimeHours: 12500,
  avgCTR: 8.2,
  avgRetention: 62,
  authorityScore: 74,
  maturityScore: 72,
  targetMaturity: 95,
  governanceStatus: 'Actif — Chaque contenu publié sur @KHEPRAEXPERTS suit le pipeline automatisé complet (recherche → publication) avec validation qualité à chaque étape.',
};