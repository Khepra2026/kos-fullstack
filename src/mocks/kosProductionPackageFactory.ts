// ============================================================
// KHEPRA EXPERTS — Production Package Factory
// Executive Producer & B2B Content Inbound Architect
// White Paper Deconstruction → Complete YouTube Production Package
// ============================================================

export interface VisualCue {
  timestamp: string;
  instruction: string;
  type: 'broll' | 'graphic' | 'text_overlay' | 'camera' | 'transition';
}

export interface ScriptSection {
  id: string;
  title: string;
  duration: string;
  type: 'hook' | 'context' | 'analysis' | 'case_study' | 'recommendation' | 'cta';
  script: string;
  visualCues: VisualCue[];
  voiceDirection: string;
}

export interface ProductionPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  targetAudience: {
    primary: string[];
    secondary: string[];
    painPoints: string[];
    decisionTriggers: string[];
  };
  sourceDocument: string;
  videoMetadata: {
    estimatedDuration: string;
    format: string;
    difficulty: 'standard' | 'advanced' | 'expert';
    thumbnailPrompt: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string[];
    hashtags: string[];
  };
  script: ScriptSection[];
  youtubeDescription: string;
  pinnedComment: string;
  linkedinSummary: string;
  blogArticleExcerpt: string;
  conversionStrategy: {
    leadMagnet: string;
    ctaPrimary: string;
    ctaSecondary: string;
    followUpSequence: string;
  };
  status: 'draft' | 'ready' | 'produced';
  priority: 'high' | 'medium' | 'low';
}

export const PRODUCTION_PACKAGES: ProductionPackage[] = [
  // ─── PACKAGE 1 ───
  {
    id: 'pp-001',
    slug: 'agrement-microfinance-uemoa-blueprint',
    title: 'Agrément Microfinance UEMOA : Le Blueprint Complet pour Obtenir Votre Autorisation',
    subtitle: 'Du dossier de demande à la décision ministérielle — la méthodologie KHEPRA EXPERTS',
    targetAudience: {
      primary: [
        'Promoteurs de SFD en phase de création',
        'Directeurs Généraux de SFD en extension',
        'Investisseurs en inclusion financière',
      ],
      secondary: [
        'Directions de la Microfinance (Ministères)',
        'Partenaires Techniques et Financiers',
        'Cabinets d\'avocats spécialisés',
      ],
      painPoints: [
        'Complexité du dossier réglementaire (22 instructions BCEAO)',
        'Délais administratifs imprévisibles (12-24 mois)',
        'Exigences de capital minimum et de gouvernance',
        'Risque de rejet pour dossier incomplet',
      ],
      decisionTriggers: [
        'Échéance réglementaire imminente',
        'Opportunité de marché (zone non couverte)',
        'Pression des investisseurs pour la licence',
        'Expansion géographique UEMOA → CEMAC',
      ],
    },
    sourceDocument: 'BLOC_CAPITALISATION_MFI_BP_UEMOA_v1.0.md + Instructions BCEAO 001 à 026',
    videoMetadata: {
      estimatedDuration: '18 min',
      format: 'analyse_reglementaire',
      difficulty: 'expert',
      thumbnailPrompt: 'Professional institutional thumbnail showing UEMOA map overlay with microfinance license certificate hologram, green and gold color scheme, KHEPRA EXPERTS branding in corner, clean corporate aesthetic with soft gradient background, regulatory document stack blurred on desk',
      seoTitle: 'Agrément Microfinance UEMOA : Guide Complet 2026 pour SFD | KHEPRA EXPERTS',
      seoDescription: "Obtenez votre agrément SFD en zone UEMOA. Guide détaillé : dossier type BCEAO, capital minimum, gouvernance exigée, délais, pièges à éviter. Méthodologie KHEPRA EXPERTS validée sur 15+ dossiers.",
      seoKeywords: ['agrément microfinance UEMOA', 'SFD BCEAO', 'licence microfinance', 'instruction BCEAO SFD', 'création SFD', 'agrément SFD 2026'],
      hashtags: ['#AgrémentSFD', '#Microfinance', '#UEMOA', '#BCEAO', '#InclusionFinancière', '#KhepraExperts', '#ConformitéRéglementaire', '#SFD', '#FinanceAfricaine', '#BigFour'],
    },
    script: [
      {
        id: 'pp-001-s1',
        title: 'Hook — Le Cauchemar du Dossier Incomplet',
        duration: '0:00-0:35',
        type: 'hook',
        script: "Saviez-vous que 60% des dossiers de demande d'agrément SFD sont rejetés par la BCEAO dès la première analyse ? Pas pour des raisons de fond. Pour des erreurs de forme. Des pièces manquantes. Des incohérences dans le business plan. Un promoteur a attendu 18 mois pour se voir refuser son agrément à cause d'une erreur de calcul dans son plan de trésorerie prévisionnel. 18 mois. Perdus. Cette vidéo va vous éviter ce cauchemar. Je vais vous donner le blueprint complet — celui que nous utilisons chez KHEPRA EXPERTS pour nos clients.",
        visualCues: [
          { timestamp: '0:00-0:05', instruction: 'Fond noir + texte rouge "60% REJETÉS" en plein écran, effet tremblement', type: 'text_overlay' },
          { timestamp: '0:05-0:15', instruction: 'Face caméra présentateur, fond institutionnel sobre, éclairage professionnel', type: 'camera' },
          { timestamp: '0:15-0:25', instruction: 'Split screen : photo dossier administratif épais + chronomètre qui défile', type: 'broll' },
          { timestamp: '0:25-0:35', instruction: 'Graphique camembert "60% rejet / 40% accepté" avec annotation "Erreurs de forme"', type: 'graphic' },
        ],
        voiceDirection: 'Ton grave et urgent. Rythme soutenu. Accentuation sur les chiffres chocs. Pause de 2 secondes après "18 mois. Perdus."',
      },
      {
        id: 'pp-001-s2',
        title: 'Contexte — Le Cadre Réglementaire UEMOA',
        duration: '0:35-4:00',
        type: 'context',
        script: "L'agrément des Systèmes Financiers Décentralisés dans l'UEMOA est régi par la loi-cadre PARMEC et pas moins de 22 instructions de la BCEAO. Ce cadre a été profondément révisé en 2023-2024, avec des exigences renforcées en matière de gouvernance, de capital minimum et de système d'information. Aujourd'hui, obtenir un agrément, c'est démontrer votre capacité à gérer une institution financière professionnelle — pas juste un projet social. Les 3 piliers de la demande : 1) Le dossier administratif — statuts, casier judiciaire, CV des dirigeants. 2) Le dossier économique — business plan, étude de marché, plan de trésorerie. 3) Le dossier technique — procédures, manuel de procédures, système d'information. Chaque pilier doit être irréprochable.",
        visualCues: [
          { timestamp: '0:35-1:00', instruction: 'Carte UEMOA animée avec les 8 pays membres, zoom progressif', type: 'graphic' },
          { timestamp: '1:00-2:00', instruction: 'Frise chronologique "Évolution réglementaire 2018-2026" avec dates clés', type: 'graphic' },
          { timestamp: '2:00-3:00', instruction: 'Schéma 3 piliers — icônes : 📋 administratif, 📊 économique, ⚙️ technique', type: 'graphic' },
          { timestamp: '3:00-4:00', instruction: 'Face caméra + bullet points animés au fur et à mesure', type: 'camera' },
        ],
        voiceDirection: 'Ton pédagogique et posé. Rythme modéré. Articuler clairement les références réglementaires. Marquer des pauses entre les piliers.',
      },
      {
        id: 'pp-001-s3',
        title: 'Analyse — Les 7 Points de Blocage',
        duration: '4:00-9:30',
        type: 'analysis',
        script: "Analysons les 7 points de blocage qui font échouer les dossiers. Point 1 : Le capital minimum. Beaucoup de promoteurs sous-estiment le montant requis — qui varie selon la catégorie de SFD visée. Pour une caisse de base, c'est 50 millions FCFA. Pour une union, 100 millions. Pour une faîtière, 250 millions. Et ce capital doit être intégralement libéré avant le dépôt. Point 2 : L'étude de marché. La BCEAO exige une analyse quantitative précise — pas des généralités. Vous devez démontrer la viabilité de votre zone d'implantation avec des données vérifiables. Point 3 : La gouvernance. Depuis 2024, les exigences de compétence des dirigeants ont été renforcées. Le PCA et le DG doivent justifier de 10 ans d'expérience dans la finance ou la microfinance. Point 4 : Le système d'information. Vous devez présenter un CBS conforme — pas un tableur Excel. Point 5 : Le manuel de procédures — souvent bâclé, il doit couvrir tous les processus : crédit, épargne, recouvrement, LCB/FT. Point 6 : Les projections financières — le piège classique. Des hypothèses trop optimistes = rejet immédiat. Point 7 : Le business plan — il doit démontrer l'équilibre financier à 3 ans.",
        visualCues: [
          { timestamp: '4:00-4:30', instruction: 'Tableau comparatif "Capital minimum par catégorie SFD" avec barres', type: 'graphic' },
          { timestamp: '4:30-5:30', instruction: 'Checklist animée des 7 points, chaque point cochable', type: 'graphic' },
          { timestamp: '5:30-6:30', instruction: 'Organigramme de gouvernance type avec PCA, DG, Comités', type: 'graphic' },
          { timestamp: '6:30-7:30', instruction: 'Comparatif CBS — logos de 3 plateformes agréées', type: 'broll' },
          { timestamp: '7:30-8:30', instruction: 'Graphique "Projections vs Réalité" — courbe réaliste vs courbe irréaliste', type: 'graphic' },
          { timestamp: '8:30-9:30', instruction: 'Face caméra + récapitulatif des 7 points en liste numérotée', type: 'camera' },
        ],
        voiceDirection: 'Ton analytique, factuel. Rythme soutenu pour garder l\'attention sur 7 points. Appuyer sur les chiffres. Pause après chaque point pour laisser le temps de lire les visuels.',
      },
      {
        id: 'pp-001-s4',
        title: 'Cas Concret — SFD Agréé en 8 Mois',
        duration: '9:30-13:00',
        type: 'case_study',
        script: "En 2025, KHEPRA EXPERTS a accompagné un promoteur qui souhaitait créer une caisse de base en zone rurale au Burkina Faso. Diagnostic initial : business plan trop optimiste, manuel de procédures incomplet, étude de marché qualitative seulement. Notre intervention en 4 phases : Phase 1 — Refonte complète du business plan avec hypothèses conservatrices validées par une enquête terrain. Phase 2 — Rédaction du manuel de procédures couvrant 14 processus clés. Phase 3 — Sélection et paramétrage d'un CBS conforme. Phase 4 — Constitution du dossier physique (7 classeurs, 2 800 pages). Résultat : agrément obtenu en 8 mois — contre une moyenne de 16 mois dans la sous-région. Le secret ? Chaque pièce du dossier répondait exactement à ce que la BCEAO attend. Ni plus. Ni moins.",
        visualCues: [
          { timestamp: '9:30-10:00', instruction: 'Carte Burkina Faso avec localisation zone rurale + photos zone d\'implantation', type: 'broll' },
          { timestamp: '10:00-11:00', instruction: 'Timeline "8 mois — de la demande à l\'agrément" avec jalons', type: 'graphic' },
          { timestamp: '11:00-12:00', instruction: 'Schéma 4 phases avec livrables par phase, style diagramme de Gantt', type: 'graphic' },
          { timestamp: '12:00-13:00', instruction: 'Comparatif "8 mois KHEPRA vs 16 mois moyenne" — bar chart', type: 'graphic' },
        ],
        voiceDirection: 'Ton narratif, inspirant. Rythme modéré, laisser le temps d\'absorber l\'histoire. Accentuation sur "8 mois contre 16 mois".',
      },
      {
        id: 'pp-001-s5',
        title: 'Recommandations — Votre Roadmap en 5 Étapes',
        duration: '13:00-16:30',
        type: 'recommendation',
        script: "Voici votre feuille de route en 5 étapes. Étape 1 — Diagnostic de préparabilité : faites évaluer votre projet par un expert avant de commencer. KHEPRA EXPERTS propose un diagnostic flash gratuit de 30 minutes. Étape 2 — Constitution du dossier administratif : rassemblez tous les documents requis — statuts, CV, casiers judiciaires, attestations. Comptez 4 à 6 semaines. Étape 3 — Business plan et étude de marché : c'est le cœur du dossier. Prévoyez 6 à 8 semaines avec un expert. Étape 4 — Manuel de procédures et SI : documentez tous vos processus, sélectionnez votre CBS. 4 à 6 semaines. Étape 5 — Dépôt et suivi : déposez le dossier complet à la BCEAO et préparez-vous aux questions complémentaires. La qualité du dossier initial détermine la rapidité de l'instruction.",
        visualCues: [
          { timestamp: '13:00-14:30', instruction: 'Roadmap 5 étapes — design type "steps" avec icônes et durées', type: 'graphic' },
          { timestamp: '14:30-15:30', instruction: 'Tableau "Checklist des documents" avec cases à cocher qui s\'animent', type: 'graphic' },
          { timestamp: '15:30-16:30', instruction: 'Face caméra + QR code "Diagnostic Flash Gratuit" en bas à droite', type: 'camera' },
        ],
        voiceDirection: 'Ton pragmatique et rassurant. Rythme posé. Articuler chaque étape clairement. Ton plus chaleureux sur l\'offre de diagnostic.',
      },
      {
        id: 'pp-001-s6',
        title: 'Conclusion & Call-to-Action',
        duration: '16:30-18:00',
        type: 'cta',
        script: "L'agrément SFD n'est pas une loterie. C'est un processus maîtrisable si vous savez exactement ce que la BCEAO attend. Et c'est notre métier chez KHEPRA EXPERTS. Nous avons accompagné plus de 15 SFD dans leur processus d'agrément en zone UEMOA et CEMAC. Téléchargez notre guide complet — lien dans la description. Réservez votre diagnostic flash gratuit de 30 minutes. Et abonnez-vous à @KHEPRAEXPERTS pour nos prochaines analyses réglementaires. Votre agrément commence aujourd'hui.",
        visualCues: [
          { timestamp: '16:30-17:00', instruction: 'Face caméra présentateur, éclairage chaleureux, fond institutionnel flouté', type: 'camera' },
          { timestamp: '17:00-17:30', instruction: 'Écran de fin : Logo KHEPRA EXPERTS + "Guide Complet Agrément SFD" + QR code + URL', type: 'graphic' },
          { timestamp: '17:30-18:00', instruction: 'Card "Prochain épisode" — teaser sur la conformité COBAC', type: 'graphic' },
        ],
        voiceDirection: 'Ton chaleureux et convaincant. Rythme modéré. Regard caméra direct. Sourire sur la dernière phrase.',
      },
    ],
    youtubeDescription: `📌 OBTENEZ VOTRE AGRÉMENT SFD EN ZONE UEMOA — LE GUIDE COMPLET

60% des dossiers de demande d'agrément SFD sont rejetés par la BCEAO au premier examen. Pas pour des raisons de fond — mais pour des erreurs de forme évitables.

Dans cette vidéo, KHEPRA EXPERTS vous livre le blueprint complet utilisé pour accompagner plus de 15 SFD vers l'obtention de leur agrément en zone UEMOA et CEMAC.

📋 AU PROGRAMME :
00:00 — Le cauchemar du dossier incomplet (Hook)
00:35 — Le cadre réglementaire UEMOA (22 instructions BCEAO)
04:00 — Les 7 points de blocage qui font échouer les dossiers
09:30 — Cas concret : SFD agréé en 8 mois au Burkina Faso
13:00 — Votre roadmap en 5 étapes
16:30 — Conclusion & Call-to-Action

🔑 CE QUE VOUS ALLEZ APPRENDRE :
• Le capital minimum requis par catégorie de SFD (50M à 250M FCFA)
• Comment structurer une étude de marché qui satisfait la BCEAO
• Les exigences de gouvernance pour PCA et DG
• Comment choisir un CBS conforme
• Le contenu obligatoire du manuel de procédures
• Les erreurs de projection financière qui entraînent un rejet immédiat

📥 RESSOURCES GRATUITES :
• Guide Complet Agrément SFD : https://khepraexperts.com/guide-agrement-sfd/
• Diagnostic Flash Gratuit (30 min) : https://khepraexperts.com/diagnostic-flash/
• Newsletter Exécutive : https://khepraexperts.com/newsletter/

👤 À PROPOS DE KHEPRA EXPERTS :
KHEPRA EXPERTS est un cabinet de conseil international spécialisé en gouvernance, conformité, risques et transformation en Afrique francophone. Nous accompagnons les SFD, banques, assurances, fintechs et organismes publics en zone UEMOA et CEMAC depuis 2018.

🌐 khepraexperts.com
📧 contact@khepraexperts.com
💼 LinkedIn : linkedin.com/company/khepra-experts

#AgrémentSFD #Microfinance #UEMOA #BCEAO #InclusionFinancière #KhepraExperts #ConformitéRéglementaire #SFD #FinanceAfricaine`,
    pinnedComment: `📥 Téléchargez gratuitement notre Guide Complet de l'Agrément SFD : https://khepraexperts.com/guide-agrement-sfd/

📞 Réservez votre diagnostic flash de 30 minutes avec un expert KHEPRA : https://khepraexperts.com/diagnostic-flash/

💬 Une question sur votre dossier d'agrément ? Posez-la en commentaire, notre équipe vous répond sous 24h.

🔔 Abonnez-vous et activez la cloche pour nos prochaines analyses réglementaires.`,
    linkedinSummary: "60% des dossiers d'agrément SFD sont rejetés par la BCEAO. Voici le blueprint pour faire partie des 40% qui réussissent. Capital minimum, gouvernance, manuel de procédures, CBS, business plan — chaque exigence décryptée. + Cas concret d'un SFD agréé en 8 mois au Burkina Faso. Le guide complet est en commentaire.",
    blogArticleExcerpt: "Obtenir un agrément de Système Financier Décentralisé dans l'UEMOA est un parcours exigeant, régi par 22 instructions de la BCEAO. Notre analyse détaille les 7 points de blocage qui conduisent 60% des dossiers au rejet, et propose une méthodologie en 5 étapes pour maximiser vos chances de succès.",
    conversionStrategy: {
      leadMagnet: 'Guide Complet Agrément SFD UEMOA — 45 pages (PDF)',
      ctaPrimary: 'Réserver un diagnostic flash gratuit (30 min)',
      ctaSecondary: 'Télécharger le guide complet',
      followUpSequence: 'Séquence email 5 jours — J1:Guide + J3:Cas client + J5:Offre accompagnement',
    },
    status: 'ready',
    priority: 'high',
  },

  // ─── PACKAGE 2 ───
  {
    id: 'pp-002',
    slug: 'gouvernance-bancaire-circulaire-bceao-01-2017',
    title: 'Gouvernance Bancaire UEMOA : Maîtrisez la Circulaire BCEAO 01-2017 Avant Votre Prochaine Inspection',
    subtitle: 'Comités spécialisés, indépendance des administrateurs, responsabilité personnelle — le guide définitif',
    targetAudience: {
      primary: [
        'Présidents de Conseil d\'Administration de banques',
        'Administrateurs de banques UEMOA',
        'Directeurs Généraux de banques',
      ],
      secondary: [
        'Secrétaires de Conseil d\'Administration',
        'Responsables Conformité bancaire',
        'Commissaires aux comptes',
      ],
      painPoints: [
        'Inspection COBAC/BCEAO imminente',
        'Mise en demeure pour non-conformité gouvernance',
        'Responsabilité personnelle engagée',
        'Comités spécialisés non fonctionnels',
      ],
      decisionTriggers: [
        'Rapport d\'inspection avec réserves',
        'Renouvellement du mandat des administrateurs',
        'Fusion/acquisition nécessitant due diligence gouvernance',
        'Exigence des investisseurs internationaux',
      ],
    },
    sourceDocument: 'BLOC_CAPITALISATION_GOVERNANCE_FLOW_v2.0.md + Circulaire BCEAO 01-2017/CB + 02-2017/CB',
    videoMetadata: {
      estimatedDuration: '20 min',
      format: 'guide_pratique',
      difficulty: 'advanced',
      thumbnailPrompt: 'Corporate boardroom with leather chairs and wooden table, one empty chair symbolizing absent governance, golden nameplate reading ADMINISTRATEUR INDÉPENDANT, soft professional lighting with dramatic shadows, dark green and gold accents, UEMOA flag subtly visible through window, editorial photography style, clean and authoritative',
      seoTitle: 'Gouvernance Bancaire UEMOA : Guide Circulaire 01-2017 BCEAO | KHEPRA EXPERTS',
      seoDescription: "Conformité gouvernance bancaire UEMOA : circulaires BCEAO 01 et 02-2017 décryptées. Comités spécialisés, indépendance, responsabilité des administrateurs. Checklist pré-inspection.",
      seoKeywords: ['gouvernance bancaire UEMOA', 'circulaire BCEAO 01-2017', 'comités spécialisés banque', 'administrateur indépendant', 'inspection COBAC', 'conseil administration banque'],
      hashtags: ['#GouvernanceBancaire', '#BCEAO', '#UEMOA', '#ConseilAdministration', '#COBAC', '#KhepraExperts', '#Banque', '#Conformité', '#BigFour', '#OHADA'],
    },
    script: [
      {
        id: 'pp-002-s1',
        title: 'Hook — La Responsabilité qui Vous Empêche de Dormir',
        duration: '0:00-0:45',
        type: 'hook',
        script: "Être administrateur de banque en zone UEMOA n'a jamais été aussi risqué. La circulaire BCEAO 01-2017 a introduit un principe simple : votre responsabilité personnelle peut être engagée. Amendes jusqu'à 50 millions FCFA. Interdiction d'exercer. Poursuites pénales possibles. Et pourtant, 70% des conseils d'administration que nous auditons chez KHEPRA EXPERTS ne sont pas pleinement conformes. Cette vidéo est votre bouclier. Je vais vous expliquer exactement ce que la BCEAO attend de vous et comment vous mettre en conformité avant votre prochaine inspection.",
        visualCues: [
          { timestamp: '0:00-0:10', instruction: 'Texte choc : "50 000 000 FCFA D\'AMENDE" en rouge sur fond noir, effet dramatique', type: 'text_overlay' },
          { timestamp: '0:10-0:25', instruction: 'Split screen : photo salle de conseil vide + texte juridique qui défile', type: 'broll' },
          { timestamp: '0:25-0:35', instruction: 'Statistique "70% NON CONFORMES" en grand, style dashboard KPI', type: 'graphic' },
          { timestamp: '0:35-0:45', instruction: 'Face caméra présentateur, lumière contrastée, ton sérieux', type: 'camera' },
        ],
        voiceDirection: 'Ton grave, solennel. Pause après chaque sanction. Regard caméra fixe. Débit lent au début puis accélération.',
      },
      {
        id: 'pp-002-s2',
        title: 'Décryptage — Les 3 Piliers de la Circulaire 01-2017',
        duration: '0:45-6:00',
        type: 'context',
        script: "La circulaire BCEAO 01-2017/CB du 1er septembre 2017, complétée par la 02-2017/CB, repose sur trois piliers fondamentaux. Pilier 1 : Les comités spécialisés obligatoires. Votre conseil doit créer et faire fonctionner 3 comités — comité d'audit, comité des risques, comité de nomination et de rémunération. Chaque comité doit avoir une charte écrite, des membres qualifiés, et se réunir au minimum 4 fois par an avec des comptes rendus formels. Pilier 2 : L'indépendance et la compétence. Au moins un tiers de votre conseil doit être composé d'administrateurs indépendants — sans lien d'affaires avec la banque. Chaque administrateur doit justifier de compétences spécifiques et suivre 40 heures de formation continue par an. Pilier 3 : La formalisation. Toutes les délibérations doivent être documentées. Les conflits d'intérêts doivent être déclarés et gérés. Les évaluations du conseil doivent être réalisées annuellement.",
        visualCues: [
          { timestamp: '0:45-2:30', instruction: 'Organigramme gouvernance avec 3 comités, flèches de reporting vers le CA', type: 'graphic' },
          { timestamp: '2:30-4:00', instruction: 'Diagramme "Administrateur Indépendant vs Administrateur Lié" avec critères', type: 'graphic' },
          { timestamp: '4:00-5:00', instruction: 'Calendrier annuel "Gouvernance" avec réunions obligatoires', type: 'graphic' },
          { timestamp: '5:00-6:00', instruction: 'Face caméra + check-list "3 Piliers" en incrustation', type: 'camera' },
        ],
        voiceDirection: 'Ton professoral, précis. Citer les références réglementaires avec leurs dates exactes. Rythme posé pour l\'assimilation.',
      },
      {
        id: 'pp-002-s3',
        title: 'Analyse de Risques — Ce que la BCEAO Sanctionne',
        duration: '6:00-10:30',
        type: 'analysis',
        script: "La BCEAO a significativement renforcé son pouvoir de sanction. Analysons les 5 motifs de sanction les plus fréquents. 1) Absence de comités spécialisés fonctionnels — sanction la plus fréquente. La BCEAO ne se contente pas de vérifier l'existence des comités sur le papier, elle examine les comptes rendus, les présences, la qualité des débats. 2) Concentration excessive des pouvoirs — quand le PCA cumule les fonctions exécutives, ce qui est interdit. 3) Administrateurs sans formation continue — la BCEAO demande les attestations de formation des 3 dernières années. 4) Conflits d'intérêts non déclarés — sanction aggravée si le conflit a causé un préjudice. 5) Absence d'évaluation annuelle du conseil — c'est l'oubli le plus courant, et le plus facile à corriger.",
        visualCues: [
          { timestamp: '6:00-7:00', instruction: 'Tableau "Top 5 sanctions BCEAO" avec icônes danger et barres de fréquence', type: 'graphic' },
          { timestamp: '7:00-8:30', instruction: 'Diagramme "Cumul des fonctions : ce qui est interdit" — croix rouges', type: 'graphic' },
          { timestamp: '8:30-9:30', instruction: 'Visualisation "Pyramide des sanctions" — avertissement → amende → interdiction → pénal', type: 'graphic' },
          { timestamp: '9:30-10:30', instruction: 'Face caméra + récapitulatif des 5 motifs', type: 'camera' },
        ],
        voiceDirection: 'Ton alerte, mettre en garde. Accélération progressive. Pause après chaque sanction. Emphase sur "facile à corriger".',
      },
      {
        id: 'pp-002-s4',
        title: 'Étude de Cas — Transformation d\'un CA en 90 Jours',
        duration: '10:30-15:00',
        type: 'case_study',
        script: "KHEPRA EXPERTS a été mandaté par une banque panafricaine suite à une inspection COBAC qui avait relevé 8 réserves majeures sur la gouvernance. Notre diagnostic a révélé : 2 comités sur 3 inexistants, 0 administrateur indépendant sur 9 membres, aucune formation suivie depuis 2020, et des procès-verbaux qui tenaient en 2 pages. Notre plan d'action en 90 jours : Semaines 1-2 — Formalisation des chartes des 3 comités. Semaines 3-4 — Identification et recrutement de 3 administrateurs indépendants. Semaines 5-6 — Plan de formation 40h pour tous les administrateurs. Semaines 7-8 — Mise en place du registre des conflits d'intérêts. Semaines 9-12 — Première auto-évaluation du conseil et rapport de conformité. Résultat : levée de toutes les réserves COBAC en 6 mois.",
        visualCues: [
          { timestamp: '10:30-11:30', instruction: 'Timeline 90 jours avec jalons colorés par semaine', type: 'graphic' },
          { timestamp: '11:30-13:00', instruction: 'Comparatif "Avant/Après" — 2 colonnes avec indicateurs gouvernance', type: 'graphic' },
          { timestamp: '13:00-14:00', instruction: 'Dashboard gouvernance avec KPI : comités, formations, réunions', type: 'graphic' },
          { timestamp: '14:00-15:00', instruction: 'Citation client masqué : "Nous avons retrouvé la confiance de la COBAC"', type: 'text_overlay' },
        ],
        voiceDirection: 'Ton narratif, inspirant. Rythme soutenu sur le plan d\'action. Pause avant de révéler le résultat.',
      },
      {
        id: 'pp-002-s5',
        title: 'Checklist Pré-Inspection — 10 Points de Contrôle',
        duration: '15:00-18:30',
        type: 'recommendation',
        script: 'Voici votre checklist pré-inspection en 10 points. 1) Vos 3 comités spécialisés sont-ils formalisés avec des chartes écrites ? 2) Vos comités se réunissent-ils au moins 4 fois par an avec des PV détaillés ? 3) Avez-vous au moins un tiers d\'administrateurs indépendants ? 4) Tous vos administrateurs ont-ils leur attestation de formation continue (40h/an) ? 5) Avez-vous un registre des conflits d\'intérêts à jour ? 6) Le PCA est-il distinct du DG ? 7) Réalisez-vous une auto-évaluation annuelle du conseil ? 8) Les jetons de présence sont-ils conformes à la réglementation ? 9) Avez-vous un plan de succession pour les dirigeants ? 10) Votre rapport annuel sur le gouvernement d\'entreprise est-il publié ?',
        visualCues: [
          { timestamp: '15:00-16:30', instruction: 'Checklist interactive 10 points — coches vertes/rouges qui s\'animent', type: 'graphic' },
          { timestamp: '16:30-17:30', instruction: 'Jauge "Score de conformité gouvernance" de 0 à 100%', type: 'graphic' },
          { timestamp: '17:30-18:30', instruction: 'Face caméra + QR code "Auto-évaluation gouvernance gratuite"', type: 'camera' },
        ],
        voiceDirection: 'Ton pragmatique, rassurant. Énumération claire, pause entre chaque point. Ton plus commercial sur le QR code.',
      },
      {
        id: 'pp-002-s6',
        title: 'Conclusion & Call-to-Action',
        duration: '18:30-20:00',
        type: 'cta',
        script: "La gouvernance n'est pas une charge administrative. C'est votre meilleure protection contre les sanctions, votre meilleur argument devant les investisseurs, et votre meilleur atout stratégique. Ne la négligez pas. Téléchargez notre checklist complète de conformité gouvernance — lien dans la description. Réservez un diagnostic gouvernance avec nos experts. Et abonnez-vous à @KHEPRAEXPERTS pour la suite de notre série sur la gouvernance bancaire. Protégez votre mandat. Protégez votre institution.",
        visualCues: [
          { timestamp: '18:30-19:15', instruction: 'Face caméra, regard direct, ton posé et convaincant', type: 'camera' },
          { timestamp: '19:15-20:00', instruction: 'Écran final : KHEPRA EXPERTS + Checklist Gouvernance + QR code + Abonnez-vous', type: 'graphic' },
        ],
        voiceDirection: 'Ton solennel puis chaleureux. Regard caméra. Dernière phrase avec conviction.',
      },
    ],
    youtubeDescription: `📌 GOUVERNANCE BANCAIRE UEMOA — CONFORMEZ-VOUS À LA CIRCULAIRE BCEAO 01-2017

70% des conseils d'administration de banques UEMOA ne sont pas pleinement conformes aux circulaires BCEAO 01-2017/CB et 02-2017/CB. Les sanctions peuvent atteindre 50 millions FCFA et l'interdiction d'exercer.

Cette vidéo vous donne la méthodologie complète pour auditer et renforcer votre gouvernance avant votre prochaine inspection COBAC ou BCEAO.

📋 AU PROGRAMME :
00:00 — La responsabilité qui vous empêche de dormir (Hook)
00:45 — Les 3 piliers de la Circulaire 01-2017
06:00 — Ce que la BCEAO sanctionne (Top 5)
10:30 — Transformation d'un CA en 90 jours (cas concret)
15:00 — Checklist pré-inspection : 10 points de contrôle
18:30 — Conclusion & Call-to-Action

🔑 CE QUE VOUS ALLEZ APPRENDRE :
• Les 3 comités spécialisés obligatoires et leur fonctionnement
• Le statut d'administrateur indépendant — conditions et obligations
• Les 40 heures de formation continue annuelle
• La tenue des registres de conflits d'intérêts
• L'auto-évaluation annuelle du conseil d'administration

📥 RESSOURCES :
• Checklist Conformité Gouvernance : https://khepraexperts.com/checklist-gouvernance/
• Diagnostic Gouvernance (45 min) : https://khepraexperts.com/diagnostic-gouvernance/
• Guide Administrateur Banque UEMOA : https://khepraexperts.com/guide-administrateur/

👤 KHEPRA EXPERTS — Conseil en gouvernance, conformité et risques en Afrique francophone.
🌐 khepraexperts.com | 📧 contact@khepraexperts.com

#GouvernanceBancaire #BCEAO #UEMOA #ConseilAdministration #COBAC #KhepraExperts #Banque`,
    pinnedComment: `📥 Téléchargez gratuitement la Checklist Conformité Gouvernance Bancaire : https://khepraexperts.com/checklist-gouvernance/

📞 Réservez un diagnostic gouvernance de 45 minutes : https://khepraexperts.com/diagnostic-gouvernance/

💬 Votre conseil est-il conforme ? Posez votre question en commentaire, nos experts vous répondent.

🔔 Abonnez-vous — prochain épisode : "Inspection COBAC : Les 15 documents que l'inspecteur va vous demander"`,
    linkedinSummary: "70% des CA de banques UEMOA ne sont pas conformes à la circulaire BCEAO 01-2017. Amendes jusqu'à 50M FCFA. Voici la checklist en 10 points pour auditer votre gouvernance avant l'inspection. + Cas concret : transformation complète d'un CA en 90 jours.",
    blogArticleExcerpt: "La circulaire BCEAO 01-2017/CB a profondément transformé les exigences de gouvernance des établissements bancaires en zone UEMOA. Notre analyse couvre les trois piliers de la réforme — comités spécialisés, indépendance des administrateurs, formalisation — et propose une checklist pratique en 10 points.",
    conversionStrategy: {
      leadMagnet: 'Checklist Conformité Gouvernance Bancaire — 10 points (PDF)',
      ctaPrimary: 'Réserver un diagnostic gouvernance (45 min)',
      ctaSecondary: 'Télécharger la checklist',
      followUpSequence: 'Séquence 7 jours — J1:Checklist + J3:Formation administrateurs + J7:Offre mission gouvernance',
    },
    status: 'ready',
    priority: 'high',
  },

  // ─── PACKAGE 3 ───
  {
    id: 'pp-003',
    slug: 'conformite-lcbft-gafi-2026-afrique',
    title: 'LCB/FT 2026 : Les 10 Nouvelles Exigences GAFI qui Redéfinissent la Conformité en Afrique',
    subtitle: 'Liste grise, bénéficiaires effectifs, due diligence renforcée — le décryptage complet',
    targetAudience: {
      primary: [
        'Responsables Conformité — Banques et SFD',
        'Directeurs Généraux — Institutions Financières',
        'Correspondants LCB/FT — Groupes bancaires',
      ],
      secondary: [
        'Cellules de Renseignement Financier (CRF)',
        'Commissaires aux comptes',
        'Régulateurs et superviseurs',
      ],
      painPoints: [
        'Pays en liste grise GAFI',
        'Correspondants bancaires qui menacent de couper les relations',
        'Amendes LCB/FT en augmentation',
        'Due diligence bénéficiaires effectifs complexe',
      ],
      decisionTriggers: [
        'Évaluation mutuelle GAFI imminente',
        'Injonction du régulateur',
        'Pression des correspondants internationaux',
        'Fusion/acquisition nécessitant due diligence LCB/FT',
      ],
    },
    sourceDocument: 'BLOC_CAPITALISATION_LCBFT_v1.0.md + Recommandations GAFI 2024-2026',
    videoMetadata: {
      estimatedDuration: '16 min',
      format: 'analyse_reglementaire',
      difficulty: 'expert',
      thumbnailPrompt: 'Dark sophisticated financial crime prevention theme, magnifying glass over banknotes revealing hidden data patterns, world map with Africa highlighted in gold, LCB/FT acronym in authoritative typography, institutional green and dark charcoal color palette, forensic investigation aesthetic, clean and serious',
      seoTitle: 'Conformité LCB/FT 2026 : Nouvelles Exigences GAFI pour l\'Afrique | KHEPRA EXPERTS',
      seoDescription: "LCB/FT Afrique : décryptage des 10 nouvelles exigences GAFI 2026. Bénéficiaires effectifs, due diligence renforcée, liste grise, sanctions. Guide complet.",
      seoKeywords: ['LCB FT Afrique', 'GAFI 2026', 'bénéficiaires effectifs', 'liste grise GAFI', 'conformité bancaire', 'blanchiment capitaux', 'due diligence KYC'],
      hashtags: ['#LCBFT', '#GAFI', '#Conformité', '#KYC', '#Blanchiment', '#KhepraExperts', '#Banque', '#RégulationFinancière', '#SFD', '#Afrique'],
    },
    script: [
      {
        id: 'pp-003-s1',
        title: 'Hook — Le Correspondant Bancaire qui Menace de Couper',
        duration: '0:00-0:40',
        type: 'hook',
        script: "Vous recevez un email de votre banque correspondante à Paris ou New York. Objet : 'Revue de votre dispositif LCB/FT'. Pièce jointe : un questionnaire de 80 questions. Délai de réponse : 15 jours. Si vos réponses ne sont pas satisfaisantes, votre relation de correspondance bancaire sera terminée. C'est la réalité de 2026. 12 pays africains sont sur la liste grise du GAFI. Les exigences LCB/FT n'ont jamais été aussi élevées. Et les conséquences d'une non-conformité n'ont jamais été aussi graves. Cette vidéo vous donne les clés pour protéger votre institution.",
        visualCues: [
          { timestamp: '0:00-0:10', instruction: 'Simulation d\'écran : email "URGENT — Revue LCB/FT" avec délai clignotant', type: 'text_overlay' },
          { timestamp: '0:10-0:20', instruction: 'Carte Afrique avec 12 pays en rouge (liste grise GAFI)', type: 'graphic' },
          { timestamp: '0:20-0:30', instruction: 'Graphique barres "Amendes LCB/FT 2020-2026" en forte hausse', type: 'graphic' },
          { timestamp: '0:30-0:40', instruction: 'Face caméra, ton urgent, fond institutionnel', type: 'camera' },
        ],
        voiceDirection: 'Ton urgent, alarmant mais pas paniqué. Laisser le temps aux visuels. Accentuer "12 pays sur liste grise".',
      },
      {
        id: 'pp-003-s2',
        title: 'Panorama — Le Nouveau Paysage GAFI 2026',
        duration: '0:40-4:30',
        type: 'context',
        script: "Le GAFI a révisé ses 40 recommandations en février 2024, avec une entrée en vigueur progressive jusqu'en 2026. Les changements majeurs concernent 5 domaines. 1) Les bénéficiaires effectifs : transparence totale exigée, registres centraux obligatoires dans chaque pays, accès aux autorités en temps réel. 2) Les actifs virtuels : les crypto-actifs sont désormais pleinement intégrés au dispositif LCB/FT — les exchanges et wallets doivent appliquer les mêmes règles KYC que les banques. 3) La due diligence renforcée : elle devient la norme pour tous les clients à risque élevé, avec des seuils abaissés. 4) La coopération internationale : les délais de réponse aux demandes d'entraide sont réduits à 30 jours maximum. 5) La supervision : les régulateurs doivent démontrer l'efficacité de leur dispositif, pas seulement son existence.",
        visualCues: [
          { timestamp: '0:40-1:30', instruction: 'Frise GAFI 2012-2026 avec révisions majeures marquées', type: 'graphic' },
          { timestamp: '1:30-3:00', instruction: 'Infographie 5 domaines — icônes et descriptions', type: 'graphic' },
          { timestamp: '3:00-4:00', instruction: 'Carte "Pays en liste grise vs liste noire" avec légende', type: 'graphic' },
          { timestamp: '4:00-4:30', instruction: 'Face caméra + transition', type: 'camera' },
        ],
        voiceDirection: 'Ton analytique, factuel. Rythme soutenu. Bien articuler les numéros des recommandations GAFI.',
      },
      {
        id: 'pp-003-s3',
        title: 'Les 10 Mesures Clés — Checklist de Conformité',
        duration: '4:30-10:00',
        type: 'analysis',
        script: "Voici les 10 mesures que toute institution financière en Afrique doit déployer. 1) Cartographie nationale des risques LCB/FT. 2) Identification et vérification des bénéficiaires effectifs — pour TOUS les clients personnes morales. 3) Due diligence renforcée systématique pour les Personnes Politiquement Exposées (PPE). 4) Déclarations de soupçon structurées et traçables. 5) Formation obligatoire de tout le personnel — minimum 8 heures par an. 6) Audit externe annuel du dispositif LCB/FT. 7) Procédures de gel des avoirs — conformes aux listes ONU et nationales. 8) Contrôle renforcé des relations de correspondance bancaire. 9) Adoption de solutions RegTech pour l'automatisation KYC. 10) Coopération proactive avec la Cellule de Renseignement Financier nationale.",
        visualCues: [
          { timestamp: '4:30-6:30', instruction: 'Checklist 10 mesures avec cases à cocher, progression 1→10', type: 'graphic' },
          { timestamp: '6:30-8:00', instruction: 'Schéma "Bénéficiaire Effectif" — pyramide des actionnaires jusqu\'à la personne physique', type: 'graphic' },
          { timestamp: '8:00-9:00', instruction: 'Tableau comparatif "RegTech KYC" — 3 solutions avec fonctionnalités', type: 'graphic' },
          { timestamp: '9:00-10:00', instruction: 'Face caméra + récapitulatif des 10 points', type: 'camera' },
        ],
        voiceDirection: 'Ton méthodique, structuré. Pause de 2 secondes entre chaque mesure. Emphase sur "tous les clients".',
      },
      {
        id: 'pp-003-s4',
        title: 'Cas Pratique — Sortie de Liste Grise en 10 Mois',
        duration: '10:00-13:30',
        type: 'case_study',
        script: "KHEPRA EXPERTS a accompagné un État africain dans son programme de sortie de la liste grise GAFI. La situation initiale : 18 des 40 recommandations notées 'non conformes' ou 'partiellement conformes'. Notre approche en 3 axes : Axe 1 — Réformes législatives : rédaction et adoption de 4 lois en 6 mois. Axe 2 — Renforcement institutionnel : création d'un registre central des bénéficiaires effectifs, modernisation de la CRF. Axe 3 — Mise en œuvre opérationnelle : formation des magistrats, des enquêteurs, des banques. Résultat : sortie de la liste grise en 10 mois — un record dans la sous-région.",
        visualCues: [
          { timestamp: '10:00-11:00', instruction: 'Timeline 10 mois avec jalons législatifs, institutionnels, opérationnels', type: 'graphic' },
          { timestamp: '11:00-12:00', instruction: 'Dashboard "Score GAFI" — Avant 18 NC/PC → Après 2 NC seulement', type: 'graphic' },
          { timestamp: '12:00-13:30', instruction: 'Infographie "3 axes d\'intervention" avec livrables', type: 'graphic' },
        ],
        voiceDirection: 'Ton narratif et inspirant. Mettre en valeur le "record de 10 mois".',
      },
      {
        id: 'pp-003-s5',
        title: 'Recommandations — Plan d\'Action 90 Jours',
        duration: '13:30-15:00',
        type: 'recommendation',
        script: "Votre plan d'action pour les 90 prochains jours : Mois 1 — Réalisez un autodiagnostic de votre dispositif LCB/FT. Identifiez vos 3 principales vulnérabilités. Mois 2 — Mettez en place un registre des bénéficiaires effectifs pour vos clients existants. Priorisez les PPE et les sociétés offshore. Mois 3 — Formez votre personnel et testez votre dispositif via un exercice de simulation de déclaration de soupçon. KHEPRA EXPERTS peut vous accompagner sur chacune de ces étapes.",
        visualCues: [
          { timestamp: '13:30-14:30', instruction: 'Roadmap 3 mois — Mois 1/2/3 avec actions clés', type: 'graphic' },
          { timestamp: '14:30-15:00', instruction: 'Face caméra + CTA Diagnostic LCB/FT', type: 'camera' },
        ],
        voiceDirection: 'Ton pragmatique, orienté action. Phrases courtes. Rythme rapide.',
      },
      {
        id: 'pp-003-s6',
        title: 'Conclusion & Call-to-Action',
        duration: '15:00-16:00',
        type: 'cta',
        script: "La conformité LCB/FT n'est pas une option. C'est votre licence d'opérer — au sens propre. Sans dispositif robuste, vous perdez vos correspondants bancaires, vous risquez des amendes, et dans le pire des cas, vous perdez votre agrément. Protégez votre institution. Téléchargez notre guide complet LCB/FT 2026. Réservez un diagnostic flash avec nos experts. Abonnez-vous à @KHEPRAEXPERTS. La conformité, c'est la confiance.",
        visualCues: [
          { timestamp: '15:00-15:30', instruction: 'Face caméra, ton convaincant, regard direct', type: 'camera' },
          { timestamp: '15:30-16:00', instruction: 'Écran final KHEPRA EXPERTS + Guide LCB/FT + QR code', type: 'graphic' },
        ],
        voiceDirection: 'Ton convaincant et rassurant. Dernière phrase comme une signature.',
      },
    ],
    youtubeDescription: `📌 CONFORMITÉ LCB/FT 2026 — PROTÉGEZ VOTRE INSTITUTION

12 pays africains sont sur la liste grise du GAFI en 2026. Les correspondants bancaires internationaux durcissent leurs exigences. Les amendes LCB/FT atteignent des niveaux record.

KHEPRA EXPERTS décrypte les 10 nouvelles mesures qui redéfinissent la conformité LCB/FT en Afrique.

📋 AU PROGRAMME :
00:00 — Le correspondant bancaire qui menace de couper
00:40 — Le nouveau paysage GAFI 2026 (5 domaines clés)
04:30 — Les 10 mesures de conformité obligatoires
10:00 — Cas pratique : sortie de liste grise en 10 mois
13:30 — Plan d'action 90 jours
15:00 — Conclusion & Call-to-Action

🔑 POINTS CLÉS :
• Registre central des bénéficiaires effectifs
• Due diligence renforcée pour les PPE
• Intégration des crypto-actifs au dispositif LCB/FT
• Solutions RegTech pour l'automatisation KYC

📥 RESSOURCES :
• Guide Complet LCB/FT 2026 : https://khepraexperts.com/guide-lcbft/
• Diagnostic Flash LCB/FT : https://khepraexperts.com/diagnostic-lcbft/

👤 KHEPRA EXPERTS — Conseil en conformité réglementaire en Afrique francophone.

#LCBFT #GAFI #Conformité #KYC #Blanchiment #KhepraExperts #Afrique`,
    pinnedComment: `📥 Guide Complet LCB/FT 2026 : https://khepraexperts.com/guide-lcbft/

📞 Diagnostic flash LCB/FT gratuit (30 min) : https://khepraexperts.com/diagnostic-lcbft/

💬 Votre pays est-il sur la liste grise ? Posez vos questions en commentaire.

🔔 Abonnez-vous pour la suite — "RegTech : Comment automatiser votre conformité KYC"`,
    linkedinSummary: "12 pays africains sur liste grise GAFI. Votre correspondant bancaire menace de couper la relation. Voici les 10 mesures LCB/FT que toute institution financière doit déployer en 2026. Bénéficiaires effectifs, due diligence PPE, RegTech KYC — le guide complet.",
    blogArticleExcerpt: "La révision 2024 des 40 recommandations du GAFI, entrée en vigueur en 2026, durcit considérablement les exigences LCB/FT pour les institutions financières africaines. Notre analyse détaille les 10 mesures critiques à déployer pour protéger votre institution.",
    conversionStrategy: {
      leadMagnet: 'Guide Complet LCB/FT 2026 — 38 pages (PDF)',
      ctaPrimary: 'Réserver un diagnostic flash LCB/FT',
      ctaSecondary: 'Télécharger le guide complet',
      followUpSequence: 'Séquence 5 jours — J1:Guide + J3:Cas client + J5:Offre mission conformité',
    },
    status: 'ready',
    priority: 'high',
  },

  // ─── PACKAGE 4 ───
  {
    id: 'pp-004',
    slug: 'reporting-esg-issb-afrique-2027',
    title: 'ESG Reporting 2027 : Comment Préparer Votre Conformité ISSB Avant l\'Échéance',
    subtitle: 'Double matérialité, IFRS S1/S2, collecte de données — la méthode KHEPRA EXPERTS',
    targetAudience: {
      primary: [
        'Directeurs Financiers — Grandes entreprises',
        'Responsables RSE / Développement Durable',
        'Directeurs Généraux — Groupes panafricains',
      ],
      secondary: [
        'Commissaires aux comptes',
        'Investisseurs ESG',
        'Agences de notation extra-financière',
      ],
      painPoints: [
        'Absence de données ESG historiques',
        'Coût de mise en conformité',
        'Complexité de la double matérialité',
        'Manque de compétences ESG en interne',
      ],
      decisionTriggers: [
        'Exigence des investisseurs internationaux',
        'Accès à des financements verts (green bonds)',
        'Cotation sur un marché régional (BRVM)',
        'Pression des parties prenantes',
      ],
    },
    sourceDocument: 'Normes IFRS S1 et S2 (ISSB, juin 2023) + Guide BCEAO Finance Durable 2025',
    videoMetadata: {
      estimatedDuration: '15 min',
      format: 'tendance_marche',
      difficulty: 'advanced',
      thumbnailPrompt: 'Clean modern ESG visualization showing sustainability dashboard with green energy icons, African continent outline with growing leaf patterns, corporate skyline transitioning to green, IFRS/ISSB standards document floating, professional and optimistic tone, soft natural green and earth tones with institutional authority',
      seoTitle: 'Reporting ESG ISSB 2027 : Guide Pratique pour l\'Afrique | KHEPRA EXPERTS',
      seoDescription: "Préparez votre reporting ESG avant l'échéance ISSB 2027. IFRS S1/S2, double matérialité, collecte de données. Méthodologie KHEPRA EXPERTS adaptée aux entreprises africaines.",
      seoKeywords: ['reporting ESG Afrique', 'ISSB 2027', 'IFRS S1 S2', 'double matérialité', 'finance durable Afrique', 'green bonds', 'durabilité entreprise'],
      hashtags: ['#ESG', '#ISSB', '#FinanceDurable', '#ReportingESG', '#Afrique', '#KhepraExperts', '#IFRS', '#Durabilité', '#GreenFinance', '#RSE'],
    },
    script: [
      {
        id: 'pp-004-s1',
        title: 'Hook — 2027, C\'est Dans 6 Mois',
        duration: '0:00-0:35',
        type: 'hook',
        script: "2027 vous paraît loin ? Pour votre reporting ESG ISSB, c'est demain. Plus précisément, dans 6 mois. Si vous commencez maintenant, vous serez juste à l'heure. Si vous attendez janvier, vous serez en retard. Et si vous attendez juin 2027, vous devrez expliquer à vos investisseurs pourquoi votre entreprise n'est pas conforme aux normes internationales de durabilité. La question n'est plus 'Est-ce que ça nous concerne ?' mais 'Est-ce qu'on a commencé ?'",
        visualCues: [
          { timestamp: '0:00-0:10', instruction: 'Compte à rebours géant "6 MOIS" qui défile, effets sonores tic-tac', type: 'text_overlay' },
          { timestamp: '0:10-0:20', instruction: 'Calendrier 2026-2027 avec jalons ESG, aujourd\'hui marqué en rouge', type: 'graphic' },
          { timestamp: '0:20-0:35', instruction: 'Face caméra, fond corporate lumineux avec plantes vertes', type: 'camera' },
        ],
        voiceDirection: 'Ton engageant et légèrement pressant. Bonne énergie. Regard caméra direct.',
      },
      {
        id: 'pp-004-s2',
        title: 'Comprendre l\'ISSB — IFRS S1 et S2',
        duration: '0:35-4:00',
        type: 'context',
        script: "L'International Sustainability Standards Board a été créé par la Fondation IFRS en 2021. Ses deux premières normes — IFRS S1 'Exigences générales' et IFRS S2 'Informations liées au climat' — ont été publiées en juin 2023. Elles deviennent la référence mondiale. IFRS S1 impose de publier toutes les informations significatives sur les risques et opportunités liés à la durabilité. IFRS S2 se concentre spécifiquement sur les risques climatiques — physiques et de transition. Le principe clé : la double matérialité — vous devez évaluer à la fois l'impact de l'environnement sur votre entreprise ET l'impact de votre entreprise sur l'environnement.",
        visualCues: [
          { timestamp: '0:35-1:30', instruction: 'Schéma "Gouvernance ISSB" — IFRS Foundation → ISSB → Normes S1/S2', type: 'graphic' },
          { timestamp: '1:30-2:30', instruction: 'Split screen : S1 vs S2 — comparaison des exigences', type: 'graphic' },
          { timestamp: '2:30-3:30', instruction: 'Animation "Double Matérialité" — deux cercles qui se superposent', type: 'graphic' },
          { timestamp: '3:30-4:00', instruction: 'Face caméra récapitulative', type: 'camera' },
        ],
        voiceDirection: 'Ton pédagogique. Expliquer comme si on parlait à un DAF, pas à un expert ESG. Simplifier sans vulgariser.',
      },
      {
        id: 'pp-004-s3',
        title: 'Les 4 Défis Spécifiques à l\'Afrique',
        duration: '4:00-8:00',
        type: 'analysis',
        script: "Les entreprises africaines font face à 4 défis spécifiques. Défi 1 — La disponibilité des données. Peu d'entreprises ont un historique de données ESG structurées. Il faut souvent partir de zéro. Défi 2 — Le coût. La mise en conformité ISSB peut coûter entre 30 000 et 150 000 USD selon la taille de l'entreprise — un investissement significatif. Défi 3 — Les compétences. Le marché africain manque de professionnels ESG qualifiés. Défi 4 — L'adaptation contextuelle. Les normes ISSB ont été conçues avec une perspective occidentale. Il faut les adapter aux réalités africaines sans perdre la conformité.",
        visualCues: [
          { timestamp: '4:00-5:00', instruction: 'Infographie 4 défis — icônes + descriptions', type: 'graphic' },
          { timestamp: '5:00-6:00', instruction: 'Graphique "Coût mise en conformité ISSB par taille d\'entreprise"', type: 'graphic' },
          { timestamp: '6:00-7:00', instruction: 'Carte Afrique "Disponibilité des données ESG par pays" — code couleur', type: 'graphic' },
          { timestamp: '7:00-8:00', instruction: 'Tableau "Adaptation contextuelle ISSB pour l\'Afrique"', type: 'graphic' },
        ],
        voiceDirection: 'Ton analytique mais optimiste. Ne pas décourager. Montrer que chaque défi a une solution.',
      },
      {
        id: 'pp-004-s4',
        title: 'La Méthode KHEPRA — 4 Phases',
        duration: '8:00-12:00',
        type: 'case_study',
        script: "KHEPRA EXPERTS a développé une méthodologie en 4 phases spécifiquement adaptée aux entreprises africaines. Phase 1 — Diagnostic maturité ESG (2 semaines) : nous évaluons votre niveau actuel sur 25 indicateurs alignés ISSB. Phase 2 — Collecte et structuration (4 semaines) : nous identifions les sources de données, créons les processus de collecte, et structurons l'information dans notre plateforme. Phase 3 — Calcul et analyse (4 semaines) : nous appliquons la double matérialité, calculons les indicateurs S1 et S2, et identifions les gaps. Phase 4 — Production du rapport (2 semaines) : nous rédigeons votre rapport ESG conforme ISSB, prêt pour vérification externe.",
        visualCues: [
          { timestamp: '8:00-9:00', instruction: 'Roadmap 4 phases — design circulaire avec icônes', type: 'graphic' },
          { timestamp: '9:00-10:30', instruction: 'Dashboard "25 indicateurs ESG" — jauge de maturité', type: 'graphic' },
          { timestamp: '10:30-11:30', instruction: 'Aperçu d\'un rapport ESG type KHEPRA — pages qui défilent', type: 'broll' },
          { timestamp: '11:30-12:00', instruction: 'Face caméra + témoignage chiffré', type: 'camera' },
        ],
        voiceDirection: 'Ton méthodique et confiant. Présenter la méthode comme éprouvée et rassurante.',
      },
      {
        id: 'pp-004-s5',
        title: 'Recommandations — Commencez Maintenant',
        duration: '12:00-14:00',
        type: 'recommendation',
        script: "Mes 3 recommandations : 1) Lancez un diagnostic de maturité ESG dès ce mois-ci. Vous ne pouvez pas améliorer ce que vous ne mesurez pas. 2) Désignez un responsable ESG interne — même à temps partiel — qui sera le point focal. 3) Planifiez votre budget 2027 en incluant la mise en conformité ISSB. Le coût de l'inaction — perte d'investisseurs, exclusion des marchés — est bien supérieur au coût de la conformité.",
        visualCues: [
          { timestamp: '12:00-13:00', instruction: 'Checklist 3 recommandations — style actionable cards', type: 'graphic' },
          { timestamp: '13:00-14:00', instruction: 'Comparatif "Coût conformité vs Coût inaction" — bar chart', type: 'graphic' },
        ],
        voiceDirection: 'Ton pragmatique et orienté action. Autorité tranquille.',
      },
      {
        id: 'pp-004-s6',
        title: 'Conclusion & Call-to-Action',
        duration: '14:00-15:00',
        type: 'cta',
        script: "Le train ISSB ne va pas ralentir pour l'Afrique. Et c'est une bonne nouvelle — parce que les entreprises qui montent à bord maintenant gagnent un avantage compétitif décisif. Téléchargez notre guide de préparation ISSB pour l'Afrique. Réservez un diagnostic ESG avec nos experts. Abonnez-vous à @KHEPRAEXPERTS. Votre rapport ESG 2027 commence aujourd'hui.",
        visualCues: [
          { timestamp: '14:00-14:30', instruction: 'Face caméra, ton rassurant et motivant', type: 'camera' },
          { timestamp: '14:30-15:00', instruction: 'Écran final KHEPRA EXPERTS + Guide ISSB + QR code', type: 'graphic' },
        ],
        voiceDirection: 'Ton inspirant. Donner envie d\'agir. Regard caméra direct. Sourire.',
      },
    ],
    youtubeDescription: `📌 REPORTING ESG ISSB — PRÉPAREZ-VOUS AVANT 2027

Les normes IFRS S1 et S2 de l'ISSB deviennent obligatoires pour les entreprises cotées et les institutions financières. L'échéance 2027 approche — et la préparation prend 6 à 12 mois.

KHEPRA EXPERTS vous donne la méthodologie complète pour vous mettre en conformité, adaptée aux spécificités des entreprises africaines.

📋 AU PROGRAMME :
00:00 — 2027, c'est dans 6 mois (Hook)
00:35 — Comprendre l'ISSB : IFRS S1 et S2
04:00 — Les 4 défis spécifiques à l'Afrique
08:00 — La méthode KHEPRA en 4 phases
12:00 — Recommandations : commencez maintenant
14:00 — Conclusion & Call-to-Action

🔑 POINTS CLÉS :
• Double matérialité : impact sur l'entreprise + impact de l'entreprise
• Collecte de données ESG dans un contexte africain
• Budget et calendrier de mise en conformité
• Adaptation contextuelle des normes ISSB

📥 RESSOURCES :
• Guide Préparation ISSB Afrique : https://khepraexperts.com/guide-issb/
• Diagnostic ESG Gratuit : https://khepraexperts.com/diagnostic-esg/

👤 KHEPRA EXPERTS — Votre partenaire ESG en Afrique francophone.

#ESG #ISSB #FinanceDurable #ReportingESG #Afrique #KhepraExperts #IFRS #Durabilité`,
    pinnedComment: `📥 Guide Gratuit "Préparation ISSB pour l'Afrique" : https://khepraexperts.com/guide-issb/

📞 Diagnostic ESG gratuit (30 min) : https://khepraexperts.com/diagnostic-esg/

💬 Où en est votre entreprise dans la préparation ISSB ? Dites-le nous en commentaire.

🔔 Abonnez-vous — prochain épisode : "Green Bonds en Afrique : Comment y accéder"`,
    linkedinSummary: "2027 = dans 6 mois. Votre reporting ESG ISSB doit commencer maintenant. IFRS S1/S2, double matérialité, collecte de données — la méthodologie KHEPRA EXPERTS en 4 phases, spécialement adaptée au contexte africain. Le guide complet est en commentaire.",
    blogArticleExcerpt: "L'entrée en vigueur des normes ISSB en 2027 représente un défi majeur pour les entreprises africaines, confrontées à des problématiques spécifiques de disponibilité des données et d'adaptation contextuelle. Notre analyse propose une méthodologie en 4 phases pour une mise en conformité efficace.",
    conversionStrategy: {
      leadMagnet: 'Guide Préparation ISSB pour l\'Afrique — 42 pages (PDF)',
      ctaPrimary: 'Réserver un diagnostic ESG gratuit',
      ctaSecondary: 'Télécharger le guide',
      followUpSequence: 'Séquence 7 jours — J1:Guide + J3:Webinar ESG + J7:Offre accompagnement ISSB',
    },
    status: 'ready',
    priority: 'high',
  },

  // ─── PACKAGE 5 ───
  {
    id: 'pp-005',
    slug: 'levee-fonds-business-plan-afrique',
    title: 'Levée de Fonds en Afrique : Les 5 Erreurs Fatales qui Font Fuir les Investisseurs',
    subtitle: 'Business plan, projections financières, due diligence — le guide du fondateur africain',
    targetAudience: {
      primary: [
        'Fondateurs de startups et scale-ups africaines',
        'Directeurs Généraux de PME en croissance',
        'Directeurs Financiers préparant une levée',
      ],
      secondary: [
        'Investisseurs et fonds de capital-risque',
        'Business Angels',
        'Banques d\'investissement',
      ],
      painPoints: [
        'Refus répétés des investisseurs',
        'Valorisation sous-estimée',
        'Due diligence qui révèle des failles',
        'Term sheet défavorable',
      ],
      decisionTriggers: [
        'Besoin de financement Series A/B',
        'Expansion géographique',
        'Préparation à la cotation BRVM',
        'Pression des actionnaires existants',
      ],
    },
    sourceDocument: 'BLOC_CAPITALISATION_CFO_FP_PARTNER_v2.0.md',
    videoMetadata: {
      estimatedDuration: '14 min',
      format: 'etude_cas',
      difficulty: 'standard',
      thumbnailPrompt: 'Dramatic split design showing a rejected business plan on left side (red stamp REJETÉ) versus an approved investment deal on right side (green stamp APPROUVÉ), African entrepreneur shaking hands with investor silhouette, gold accent colors, clean modern corporate design, motivational and professional',
      seoTitle: 'Levée de Fonds Afrique : 5 Erreurs Fatales du Business Plan | KHEPRA EXPERTS',
      seoDescription: "Évitez les 5 erreurs qui font fuir les investisseurs. Business plan, projections financières, valorisation, due diligence. Guide du fondateur africain.",
      seoKeywords: ['levée de fonds Afrique', 'business plan investisseur', 'startup Afrique', 'venture capital', 'due diligence', 'valorisation entreprise'],
      hashtags: ['#LevéeDeFonds', '#StartupAfrique', '#BusinessPlan', '#Investissement', '#VentureCapital', '#KhepraExperts', '#PME', '#FinanceAfricaine', '#BRVM'],
    },
    script: [
      {
        id: 'pp-005-s1',
        title: 'Hook — 85% des Business Plans Rejetés en 30 Secondes',
        duration: '0:00-0:35',
        type: 'hook',
        script: "Un investisseur passe en moyenne 30 secondes sur votre executive summary avant de décider de lire la suite ou de passer au suivant. 30 secondes. Et 85% des business plans que nous analysons chez KHEPRA EXPERTS échouent à ce test. Pas parce que le projet est mauvais. Mais parce que la présentation est mauvaise. Cette vidéo vous montre les 5 erreurs fatales — et comment les corriger.",
        visualCues: [
          { timestamp: '0:00-0:08', instruction: 'Chronomètre géant "0:30" en plein écran', type: 'text_overlay' },
          { timestamp: '0:08-0:20', instruction: 'Statistique "85%" en grand, avec icône poubelle pour les BP rejetés', type: 'graphic' },
          { timestamp: '0:20-0:35', instruction: 'Face caméra, ton direct, fond bureau exécutif', type: 'camera' },
        ],
        voiceDirection: 'Ton percutant. Rythme rapide. Créer l\'urgence. Regard caméra fixe.',
      },
      {
        id: 'pp-005-s2',
        title: 'Les 5 Erreurs Fatales — Analyse Détaillée',
        duration: '0:35-8:00',
        type: 'analysis',
        script: "Erreur n°1 — Les projections irréalistes. 300% de croissance par an sans justification. Les investisseurs connaissent le marché africain. Ils savent que la croissance réelle est de 15-40%. Montrez des hypothèses solides, pas des courbes exponentielles. Erreur n°2 — L'absence d'analyse concurrentielle locale. Citer Uber et Amazon comme concurrents n'impressionne personne. Analysez vos vrais concurrents — y compris les acteurs informels. Erreur n°3 — La sous-estimation du besoin en fonds de roulement. Beaucoup de fondateurs confondent chiffre d'affaires et trésorerie. Résultat : rupture de cash 6 mois après la levée. Erreur n°4 — Le plan de sortie inexistant. L'investisseur veut savoir comment il récupérera sa mise. Acquisition ? IPO ? Rachat par les fondateurs ? Erreur n°5 — La négligence des risques réglementaires. En Afrique, le risque réglementaire est le risque n°1 pour un investisseur étranger. Montrez que vous le maîtrisez.",
        visualCues: [
          { timestamp: '0:35-1:30', instruction: 'Graphique "Projections vs Réalité" — une courbe réaliste, une irréaliste barrée', type: 'graphic' },
          { timestamp: '1:30-2:30', instruction: 'Matrice concurrentielle avec acteurs formels ET informels', type: 'graphic' },
          { timestamp: '2:30-4:00', instruction: 'Schéma "Chiffre d\'affaires ≠ Trésorerie" — démonstration visuelle BFR', type: 'graphic' },
          { timestamp: '4:00-5:30', instruction: 'Timeline "Scénarios de sortie" — Acquisition / IPO / Rachat', type: 'graphic' },
          { timestamp: '5:30-7:00', instruction: 'Carte "Risques réglementaires par pays africain" — heatmap', type: 'graphic' },
          { timestamp: '7:00-8:00', instruction: 'Face caméra récapitulatif 5 erreurs', type: 'camera' },
        ],
        voiceDirection: 'Ton direct, sans filtre. Dire les choses franchement. Style "tough love".',
      },
      {
        id: 'pp-005-s3',
        title: 'Cas Concret — Levée de 5M USD en Series A',
        duration: '8:00-11:30',
        type: 'case_study',
        script: "KHEPRA EXPERTS a structuré le business plan d'une fintech ouest-africaine qui a levé 5 millions de dollars en série A. Notre approche : 1) Des hypothèses de croissance conservatrices — 25% la première année, validées par une enquête terrain auprès de 500 utilisateurs potentiels. 2) Un benchmark concurrentiel détaillé incluant 8 acteurs locaux. 3) Un plan de trésorerie mensuel sur 24 mois démontrant l'utilisation précise des fonds. 4) Trois scénarios de sortie modélisés avec TRI pour l'investisseur. 5) Une cartographie des risques réglementaires avec plan de mitigation pour chaque pays d'opération. Résultat : 3 term sheets reçues en 6 semaines.",
        visualCues: [
          { timestamp: '8:00-9:00', instruction: 'Dashboard "Business Plan type KHEPRA" avec sections clés', type: 'graphic' },
          { timestamp: '9:00-10:00', instruction: 'Graphique "Utilisation des fonds" — camembert 5M USD', type: 'graphic' },
          { timestamp: '10:00-11:00', instruction: 'Timeline levée de fonds — 6 semaines avec jalons', type: 'graphic' },
          { timestamp: '11:00-11:30', instruction: 'Citation fondateur : "3 term sheets en 6 semaines"', type: 'text_overlay' },
        ],
        voiceDirection: 'Ton inspirant. Mettre en valeur les résultats. Détails concrets.',
      },
      {
        id: 'pp-005-s4',
        title: 'Recommandations — Votre Checklist Investisseur',
        duration: '11:30-13:00',
        type: 'recommendation',
        script: "Votre checklist en 5 points avant de pitcher : 1) Votre executive summary passe-t-il le test des 30 secondes ? Faites-le lire à un inconnu. 2) Vos projections sont-elles défendables avec des hypothèses documentées ? 3) Avez-vous identifié et analysé vos 5 vrais concurrents — y compris informels ? 4) Votre plan de trésorerie montre-t-il précisément l'utilisation de chaque dollar levé ? 5) Avez-vous une cartographie des risques réglementaires ? Si la réponse à l'une de ces questions est non, ne pitchez pas encore.",
        visualCues: [
          { timestamp: '11:30-12:30', instruction: 'Checklist 5 points avec validation visuelle oui/non', type: 'graphic' },
          { timestamp: '12:30-13:00', instruction: 'Face caméra + CTA Template Business Plan', type: 'camera' },
        ],
        voiceDirection: 'Ton pragmatique. Style "no-nonsense". Direct et utile.',
      },
      {
        id: 'pp-005-s5',
        title: 'Conclusion & Call-to-Action',
        duration: '13:00-14:00',
        type: 'cta',
        script: "Votre business plan est votre premier produit. Traitez-le avec le même soin que votre produit principal. Téléchargez notre template de business plan investisseur — lien dans la description. Réservez une session de revue de votre pitch deck avec nos experts. Et abonnez-vous à @KHEPRAEXPERTS. La différence entre un non et un oui, c'est souvent la qualité de votre préparation.",
        visualCues: [
          { timestamp: '13:00-13:30', instruction: 'Face caméra, ton convaincant', type: 'camera' },
          { timestamp: '13:30-14:00', instruction: 'Écran final KHEPRA EXPERTS + Template BP + QR code', type: 'graphic' },
        ],
        voiceDirection: 'Ton motivant et confiant. Laisser le spectateur avec l\'envie d\'agir.',
      },
    ],
    youtubeDescription: `📌 LEVÉE DE FONDS EN AFRIQUE — NE FAITES PAS FUIR LES INVESTISSEURS

85% des business plans sont rejetés par les investisseurs en moins de 30 secondes. Pas pour la qualité du projet — mais pour des erreurs de présentation évitables.

KHEPRA EXPERTS décrypte les 5 erreurs fatales et vous donne la méthode pour un business plan qui convainc.

📋 AU PROGRAMME :
00:00 — 85% rejetés en 30 secondes (Hook)
00:35 — Les 5 erreurs fatales (analyse détaillée)
08:00 — Cas concret : levée de 5M USD en Series A
11:30 — Checklist investisseur : 5 points de contrôle
13:00 — Conclusion & Call-to-Action

🔑 POINTS CLÉS :
• Projections réalistes vs irréalistes
• Analyse concurrentielle — inclure l'informel
• Besoin en fonds de roulement
• Plan de sortie pour l'investisseur
• Cartographie des risques réglementaires

📥 RESSOURCES :
• Template Business Plan Investisseur : https://khepraexperts.com/template-bp/
• Revue de Pitch Deck (45 min) : https://khepraexperts.com/revue-pitch/

👤 KHEPRA EXPERTS — Votre CFO Partner pour la levée de fonds.

#LevéeDeFonds #StartupAfrique #BusinessPlan #Investissement #KhepraExperts`,
    pinnedComment: `📥 Template Business Plan Investisseur (gratuit) : https://khepraexperts.com/template-bp/

📞 Revue de votre pitch deck par nos experts (45 min) : https://khepraexperts.com/revue-pitch/

💬 Quelle a été votre plus grande difficulté pour lever des fonds ? Partagez en commentaire.

🔔 Abonnez-vous — prochain épisode : "Valorisation de startup en Afrique : les 3 méthodes".`,
    linkedinSummary: "Un investisseur passe 30 secondes sur votre executive summary. 85% des business plans échouent ce test. Voici les 5 erreurs fatales — projections, concurrence, BFR, sortie, risques réglementaires — et comment une fintech a levé 5M USD en les évitant. Template gratuit en commentaire.",
    blogArticleExcerpt: "L'analyse de 200 business plans de startups africaines révèle des patterns d'échec récurrents qui conduisent 85% des dossiers au rejet dès l'executive summary. Notre étude identifie les 5 erreurs fatales et propose une méthodologie de structuration éprouvée.",
    conversionStrategy: {
      leadMagnet: 'Template Business Plan Investisseur — Excel + Guide (ZIP)',
      ctaPrimary: 'Réserver une revue de pitch deck (45 min)',
      ctaSecondary: 'Télécharger le template',
      followUpSequence: 'Séquence 5 jours — J1:Template + J3:Cas client + J5:Offre CFO Partner',
    },
    status: 'ready',
    priority: 'high',
  },

  // ─── PACKAGE 6 ───
  {
    id: 'pp-006',
    slug: 'transformation-digitale-sfd-bceao-2026',
    title: 'Transformation Digitale des SFD Africains : Le Cadre BCEAO 2026 Expliqué',
    subtitle: 'CBS, interopérabilité, mobile money, sécurité des données — votre roadmap en 18 mois',
    targetAudience: {
      primary: [
        'Directeurs Généraux de SFD',
        'Directeurs des Systèmes d\'Information',
        'Responsables Transformation Digitale',
      ],
      secondary: [
        'Éditeurs de CBS pour la microfinance',
        'Partenaires FinTech',
        'Investisseurs en technologie financière',
      ],
      painPoints: [
        'Délai 18 mois imposé par la BCEAO',
        'Coût de la transformation digitale',
        'Résistance au changement des équipes',
        'Choix technologique complexe',
      ],
      decisionTriggers: [
        'Injonction BCEAO imminente',
        'Système actuel obsolète ou non conforme',
        'Fusion de SFD nécessitant harmonisation SI',
        'Opportunité de financement tech',
      ],
    },
    sourceDocument: 'BLOC_CAPITALISATION_CBS_MICROFINANCE_v1.0.md + Instruction BCEAO Digitalisation SFD 2026',
    videoMetadata: {
      estimatedDuration: '13 min',
      format: 'guide_pratique',
      difficulty: 'standard',
      thumbnailPrompt: 'Modern fintech microfinance theme, smartphone displaying loan dashboard with African women entrepreneurs, digital interface overlay with green data flows, traditional SFD office transitioning to digital hub, UEMOA map with connectivity lines, warm and empowering tone, professional clean design, KHEPRA EXPERTS branding',
      seoTitle: 'Transformation Digitale SFD : Cadre BCEAO 2026 — Guide Complet | KHEPRA EXPERTS',
      seoDescription: "Digitalisez votre SFD avant l'échéance BCEAO 2026. CBS, mobile money, interopérabilité, sécurité. Roadmap 18 mois. Guide complet KHEPRA EXPERTS.",
      seoKeywords: ['transformation digitale SFD', 'BCEAO 2026', 'CBS microfinance', 'digitalisation SFD', 'mobile money', 'inclusion financière', 'interopérabilité'],
      hashtags: ['#TransformationDigitale', '#SFD', '#Microfinance', '#BCEAO', '#Fintech', '#InclusionFinancière', '#KhepraExperts', '#CBS', '#MobileMoney'],
    },
    script: [
      {
        id: 'pp-006-s1',
        title: 'Hook — 18 Mois pour Tout Changer',
        duration: '0:00-0:30',
        type: 'hook',
        script: "La BCEAO vous donne 18 mois pour digitaliser votre SFD. 18 mois pour choisir un CBS, migrer vos données, former vos équipes, et être opérationnel. C'est le plus grand défi technologique que la microfinance africaine ait jamais connu. Et beaucoup de SFD ne sont pas prêts. Cette vidéo est votre guide de survie.",
        visualCues: [
          { timestamp: '0:00-0:08', instruction: 'Compte à rebours "18 MOIS" en énorme, tic-tac sonore', type: 'text_overlay' },
          { timestamp: '0:08-0:18', instruction: 'Carte UEMOA avec points SFD — beaucoup rouges (non digitalisés), quelques verts', type: 'graphic' },
          { timestamp: '0:18-0:30', instruction: 'Face caméra, fond moderne avec écrans', type: 'camera' },
        ],
        voiceDirection: 'Ton urgent mais calme. Créer la prise de conscience sans paniquer.',
      },
      {
        id: 'pp-006-s2',
        title: 'Le Cadre BCEAO — 4 Axes',
        duration: '0:30-4:00',
        type: 'context',
        script: "Le cadre de digitalisation publié par la BCEAO en mars 2026 s'articule autour de 4 axes. Axe 1 — Interopérabilité : votre CBS doit pouvoir communiquer avec les autres SFD, les banques, et les plateformes de mobile money. Axe 2 — Sécurité des données : normes minimales de cybersécurité, sauvegarde, PCA/PRA obligatoires. Axe 3 — Reporting automatisé : vos états réglementaires (BCEAO, CENTIF) doivent être générés automatiquement. Axe 4 — Inclusion financière : votre solution digitale doit permettre d'atteindre les populations non bancarisées, y compris en zone rurale.",
        visualCues: [
          { timestamp: '0:30-1:30', instruction: 'Schéma 4 axes — icônes interconnectées', type: 'graphic' },
          { timestamp: '1:30-2:30', instruction: 'Diagramme "Interopérabilité" — SFD ↔ Banque ↔ Mobile Money', type: 'graphic' },
          { timestamp: '2:30-3:30', instruction: 'Checklist "Sécurité des données" — 8 points', type: 'graphic' },
          { timestamp: '3:30-4:00', instruction: 'Face caméra transition', type: 'camera' },
        ],
        voiceDirection: 'Ton pédagogique. Expliquer comme à un DG de SFD, pas à un DSI.',
      },
      {
        id: 'pp-006-s3',
        title: 'Choisir son CBS — SaaS vs Sur Mesure',
        duration: '4:00-7:30',
        type: 'analysis',
        script: "La décision la plus critique : choisir entre une solution SaaS et un développement sur mesure. La solution SaaS (5K-15K USD/an) : avantages — déploiement rapide, mises à jour automatiques, conformité réglementaire intégrée. Inconvénients — personnalisation limitée, dépendance éditeur. Le développement sur mesure (50K-150K USD) : avantages — adaptation totale à vos processus, indépendance technologique. Inconvénients — délai 12-18 mois, maintenance à votre charge. Pour 80% des SFD de moins de 50 000 clients, la solution SaaS est la plus pertinente.",
        visualCues: [
          { timestamp: '4:00-5:30', instruction: 'Tableau comparatif SaaS vs Sur Mesure — colonnes avec avantages/inconvénients', type: 'graphic' },
          { timestamp: '5:30-6:30', instruction: 'Graphique "Coût total sur 3 ans" — SaaS vs Sur Mesure', type: 'graphic' },
          { timestamp: '6:30-7:30', instruction: 'Recommandation visuelle "80% SaaS" avec seuil de 50 000 clients', type: 'graphic' },
        ],
        voiceDirection: 'Ton analytique et pratique. Donner des chiffres concrets. Ne pas jargonner.',
      },
      {
        id: 'pp-006-s4',
        title: 'Roadmap de Déploiement — 4 Phases',
        duration: '7:30-10:30',
        type: 'case_study',
        script: "KHEPRA EXPERTS a développé une roadmap en 4 phases. Phase 1 (mois 1-3) : diagnostic et choix de la solution — audit de l'existant, cahier des charges, sélection éditeur. Phase 2 (mois 4-9) : paramétrage et migration — configuration du CBS, reprise des données historiques, tests. Phase 3 (mois 10-15) : formation et tests — formation des équipes, tests utilisateurs, procédures. Phase 4 (mois 16-18) : go-live et audit — mise en production, audit de conformité BCEAO. Le secret : commencer la phase 1 le plus tôt possible.",
        visualCues: [
          { timestamp: '7:30-9:00', instruction: 'Roadmap 4 phases — diagramme de Gantt visuel', type: 'graphic' },
          { timestamp: '9:00-10:00', instruction: 'Checklist par phase avec livrables', type: 'graphic' },
          { timestamp: '10:00-10:30', instruction: 'Face caméra + alerte "Commencez maintenant"', type: 'camera' },
        ],
        voiceDirection: 'Ton méthodique et rassurant. Donner confiance que c\'est faisable.',
      },
      {
        id: 'pp-006-s5',
        title: 'Recommandations Finales',
        duration: '10:30-12:00',
        type: 'recommendation',
        script: "3 recommandations clés. 1) Ne sous-estimez pas le temps — 18 mois, c'est le minimum, pas du luxe. 2) Impliquez vos équipes dès le début — la résistance au changement est le risque n°1. 3) Faites-vous accompagner — le coût d'un mauvais choix technologique est 10 fois supérieur au coût de l'accompagnement.",
        visualCues: [
          { timestamp: '10:30-11:30', instruction: '3 cartes "Recommandations" avec icônes', type: 'graphic' },
          { timestamp: '11:30-12:00', instruction: 'Graphique "Coût erreur vs Coût accompagnement" — bar chart', type: 'graphic' },
        ],
        voiceDirection: 'Ton pragmatique. Donner des conseils actionnables.',
      },
      {
        id: 'pp-006-s6',
        title: 'Conclusion & Call-to-Action',
        duration: '12:00-13:00',
        type: 'cta',
        script: "La digitalisation de votre SFD n'est pas une option. C'est une obligation réglementaire — et une opportunité stratégique. Les SFD qui réussiront cette transformation seront les leaders de demain. Téléchargez notre guide de digitalisation SFD. Réservez un diagnostic flash avec nos experts. Abonnez-vous à @KHEPRAEXPERTS. Votre transformation commence aujourd'hui.",
        visualCues: [
          { timestamp: '12:00-12:30', instruction: 'Face caméra, ton inspirant', type: 'camera' },
          { timestamp: '12:30-13:00', instruction: 'Écran final KHEPRA EXPERTS + Guide Digitalisation + QR code', type: 'graphic' },
        ],
        voiceDirection: 'Ton motivant. Terminer sur une note d\'optimisme et d\'action.',
      },
    ],
    youtubeDescription: `📌 DIGITALISATION SFD — CONFORMEZ-VOUS AU CADRE BCEAO 2026

La BCEAO impose un délai de 18 mois aux SFD pour digitaliser leurs opérations. CBS conforme, interopérabilité, sécurité des données — c'est le plus grand défi technologique de la microfinance africaine.

KHEPRA EXPERTS vous donne la roadmap complète.

📋 AU PROGRAMME :
00:00 — 18 mois pour tout changer (Hook)
00:30 — Le cadre BCEAO : 4 axes
04:00 — Choisir son CBS : SaaS vs Sur Mesure
07:30 — Roadmap de déploiement en 4 phases
10:30 — Recommandations finales
12:00 — Conclusion & Call-to-Action

🔑 POINTS CLÉS :
• Comparatif SaaS (5-15K USD/an) vs Sur Mesure (50-150K USD)
• Roadmap 18 mois phase par phase
• Critères de choix d'un CBS conforme BCEAO
• Gestion du changement et formation des équipes

📥 RESSOURCES :
• Guide Digitalisation SFD : https://khepraexperts.com/guide-digitalisation-sfd/
• Diagnostic Flash SFD : https://khepraexperts.com/diagnostic-sfd/

👤 KHEPRA EXPERTS — Conseil en transformation digitale pour la microfinance.

#TransformationDigitale #SFD #Microfinance #BCEAO #Fintech #KhepraExperts`,
    pinnedComment: `📥 Guide Complet Digitalisation SFD : https://khepraexperts.com/guide-digitalisation-sfd/

📞 Diagnostic flash digitalisation (30 min) : https://khepraexperts.com/diagnostic-sfd/

💬 Quel CBS utilisez-vous actuellement ? Dites-le nous en commentaire.

🔔 Abonnez-vous — prochain épisode : "Cybersécurité des SFD : Protégez vos données clients".`,
    linkedinSummary: "La BCEAO donne 18 mois aux SFD pour se digitaliser. CBS, interopérabilité, sécurité, reporting automatisé — le cadre complet décrypté. + Roadmap de déploiement en 4 phases. SaaS vs Sur Mesure : le comparatif chiffré. Le guide est en commentaire.",
    blogArticleExcerpt: "Le cadre de digitalisation des SFD publié par la BCEAO en mars 2026 impose une transformation profonde des systèmes d'information en 18 mois. Notre analyse compare les approches SaaS et sur mesure, et propose une roadmap de déploiement en 4 phases.",
    conversionStrategy: {
      leadMagnet: 'Guide Digitalisation SFD — 35 pages (PDF)',
      ctaPrimary: 'Réserver un diagnostic flash digitalisation',
      ctaSecondary: 'Télécharger le guide',
      followUpSequence: 'Séquence 5 jours — J1:Guide + J3:Comparatif CBS + J5:Offre accompagnement',
    },
    status: 'ready',
    priority: 'medium',
  },
];

// ─── FACTORY STATS ───
export const FACTORY_STATS = {
  totalPackages: 6,
  readyToProduce: 6,
  totalDuration: '96 min',
  averageDuration: '16 min',
  topicsCovered: 6,
  formatsAvailable: ['analyse_reglementaire', 'guide_pratique', 'tendance_marche', 'etude_cas'],
  conversionRate: '12.4%',
};