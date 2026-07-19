// ============================================================
// KOS LinkedIn Distribution Program — Lead Magnets S26
// Programme de distribution LinkedIn optimisé
// LI-LEADMAGNET-2026-S26 : 8 Lead Magnets, 17 posts, 46.3K reach
// ============================================================

export interface LinkedInPostDraft {
  id: string;
  articleId: string;
  articleSlug: string;
  articleTitle: string;
  articleAuthor: string;
  articleUrl: string;
  postType: 'article_share' | 'teaser' | 'insight_snippet' | 'framework_highlight' | 'cta_promo';
  postContent: string;
  hashtags: string[];
  bestTimeSlots: { day: string; time: string; expectedEngagement: number }[];
  characterCount: number;
  imageUrl: string;
  ctaLabel: string;
  targetAudience: string;
  expectedReach: number;
  expectedEngagement: number;
  status: 'draft' | 'scheduled' | 'published' | 'queued';
  scheduledDate: string;
}

export interface LinkedInDistributionProgram {
  programId: string;
  programName: string;
  articles: {
    id: string;
    slug: string;
    title: string;
    author: string;
    date: string;
  }[];
  posts: LinkedInPostDraft[];
  schedule: {
    phase: string;
    startDate: string;
    endDate: string;
    postsPerWeek: number;
    totalPosts: number;
  }[];
  kpis: {
    totalPosts: number;
    totalArticles: number;
    estimatedTotalReach: number;
    estimatedTotalEngagement: number;
    avgEngagementRate: number;
    hashtagsUsed: number;
    bestDays: string[];
    bestTimes: string[];
  };
}

export const LINKEDIN_DISTRIBUTION_PROGRAM: LinkedInDistributionProgram = {
  programId: 'LI-LEADMAGNET-2026-S26',
  programName: 'LinkedIn Distribution — Lead Magnets Ultra-Conversion S26/S27',
  articles: [
    {
      id: 'lm-1',
      slug: 'guide-bceao-2026',
      title: 'Guide BCEAO 2026 — Les 7 Contrôles qui Bloquent Votre Agrément',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-23',
    },
    {
      id: 'lm-2',
      slug: 'checklist-conformite-bceao-cobac',
      title: 'Checklist Conformité BCEAO/COBAC — 127 Points de Contrôle',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-24',
    },
    {
      id: 'lm-3',
      slug: 'diagnostic-flash-conformite-bceao-cobac-2026',
      title: 'Diagnostic Flash Conformité BCEAO/COBAC 2026 — 10 min, Score Immédiat',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-25',
    },
    {
      id: 'lm-4',
      slug: 'guide-levee-fonds-afrique',
      title: 'Guide Levée de Fonds Afrique Francophone — 89 Critères pour Passer le Screening',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-26',
    },
    {
      id: 'lm-5',
      slug: 'mini-rapport-due-diligence',
      title: 'Mini Rapport Due Diligence Express — 8 Red Flags Détectés en Moyenne',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-28',
    },
    {
      id: 'lm-6',
      slug: 'diagnostic-esg-maturite',
      title: 'Diagnostic de Maturité ESG — 4 Piliers en 12 Minutes',
      author: 'KHEPRA EXPERTS',
      date: '2026-06-29',
    },
    {
      id: 'lm-7',
      slug: 'template-audit-gouvernance',
      title: 'Template Audit de Gouvernance — Conforme AUSCGIE OHADA',
      author: 'KHEPRA EXPERTS',
      date: '2026-07-01',
    },
    {
      id: 'lm-8',
      slug: 'simulation-risque-reglementaire',
      title: 'Simulation Risque Réglementaire Bancaire — Votre Exposition en 10 Minutes',
      author: 'KHEPRA EXPERTS',
      date: '2026-07-02',
    },
  ],
  posts: [
    // ======== LEAD MAGNET #1 : Guide BCEAO 2026 ========
    {
      id: 'li-post-lm1a',
      articleId: 'lm-1',
      articleSlug: 'guide-bceao-2026',
      articleTitle: 'Agrément BCEAO 2026 : 80% des dossiers rejetés au premier dépôt',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/guide-bceao-2026',
      postType: 'article_share',
      postContent: '🚨 80% des dossiers d\'agrément BCEAO sont rejetés au premier dépôt.\n\nRetard moyen : 12 mois. Coût d\'opportunité : 200M+ FCFA.\n\nNotre guide décrypte les 7 contrôles qui bloquent :\n\n1️⃣ Gouvernance & Comités Spécialisés (35% des rejets)\n2️⃣ Ratios Prudentiels Bâle III (28% des rejets)\n3️⃣ LBC/FT & KYC (22% des rejets)\n4️⃣ Systèmes d\'Information & Cyber-résilience\n5️⃣ ALM & Liquidité\n6️⃣ Rémunération & Conflits d\'Intérêts\n7️⃣ PCA / PCI & Continuité d\'Activité\n\n📥 Téléchargez le Guide BCEAO 2026 gratuit — 15 pages de méthodologie, basé sur 50+ missions terrain. Lien en commentaire.',
      hashtags: ['AgrémentBCEAO', 'ConformitéBancaire', 'BCEAO', 'UEMOA', 'GuideGratuit', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Mardi', time: '08:00 GMT', expectedEngagement: 234 },
        { day: 'Jeudi', time: '09:30 GMT', expectedEngagement: 198 },
      ],
      characterCount: 747,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20regulatory%20compliance%20concept%20with%20emerald%20green%20and%20gold%20elements%20representing%20BCEAO%20banking%20standards%20in%20West%20Africa%2C%20clean%20corporate%20aesthetic%2C%20modern%20editorial%20illustration%2C%20no%20text%2C%20no%20people&width=1200&height=627&seq=li-lm1a-bceao&orientation=landscape',
      ctaLabel: 'Télécharger le Guide',
      targetAudience: 'DG Banques, Directeurs Conformité, Responsables Agrément, Risk Managers UEMOA',
      expectedReach: 5200,
      expectedEngagement: 234,
      status: 'scheduled',
      scheduledDate: '2026-06-23',
    },
    {
      id: 'li-post-lm1b',
      articleId: 'lm-1',
      articleSlug: 'guide-bceao-2026',
      articleTitle: 'BCEAO : Les 3 erreurs fatales dans un dossier d\'agrément',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/guide-bceao-2026',
      postType: 'insight_snippet',
      postContent: '⚡ Vous préparez un agrément BCEAO ? Évitez ces 3 erreurs qui coûtent 6 à 18 mois de retard.\n\n❌ Erreur 1 : Conseil d\'administration non conforme — pas assez d\'administrateurs indépendants, pas de comités spécialisés. Circulaire 01-2017.\n\n❌ Erreur 2 : Ratios prudentiels non documentés — Bâle III exige des calculs prospectifs, pas seulement historiques. 65% des dossiers échouent ici.\n\n❌ Erreur 3 : Dispositif LBC/FT incomplet — La directive 02-2015 renforcée exige un dispositif documenté, testé, et audité.\n\n💡 Notre Guide BCEAO 2026 contient les templates et checklists pour chaque contrôle. 85% de réussite au premier dépôt.',
      hashtags: ['BCEAO', 'Agrément', 'Conformité', 'BanqueAfrique', 'GuideGratuit'],
      bestTimeSlots: [
        { day: 'Jeudi', time: '12:00 GMT', expectedEngagement: 187 },
      ],
      characterCount: 612,
      imageUrl: 'https://readdy.ai/api/search-image?query=Minimalist%20infographic%20style%20abstract%20visualization%20with%20red%20warning%20elements%20and%20emerald%20green%20representing%20common%20regulatory%20filing%20mistakes%20in%20African%20banking%2C%20clean%20data%20visualization%20aesthetic%2C%20professional%20financial%20illustration%2C%20no%20text%2C%20no%20people&width=1200&height=627&seq=li-lm1b-errors&orientation=landscape',
      ctaLabel: 'Télécharger le Guide',
      targetAudience: 'DG Banques, Directeurs Conformité, Responsables Agrément UEMOA',
      expectedReach: 3800,
      expectedEngagement: 187,
      status: 'scheduled',
      scheduledDate: '2026-06-26',
    },

    // ======== LEAD MAGNET #2 : Checklist Conformité ========
    {
      id: 'li-post-lm2a',
      articleId: 'lm-2',
      articleSlug: 'checklist-conformite-bceao-cobac',
      articleTitle: 'Checklist Conformité BCEAO/COBAC : 127 points pour passer l\'audit',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/checklist-conformite-bceao-cobac',
      postType: 'article_share',
      postContent: '📋 127 points de contrôle. 7 domaines réglementaires. 1 checklist qui fait la différence.\n\nVotre institution est-elle vraiment prête pour l\'inspection ?\n\nNotre checklist couvre l\'intégralité des exigences BCEAO et COBAC :\n\n🔹 Gouvernance & Organigramme (18 points)\n🔹 Ratios Prudentiels Bâle III (24 points)\n🔹 LBC/FT & KYC (22 points)\n🔹 Systèmes d\'Information & Cyber-résilience (16 points)\n🔹 Gestion des Risques de Crédit (19 points)\n🔹 ALM & Liquidité (15 points)\n🔹 Reporting Réglementaire (13 points)\n\n📊 94% de réussite aux audits pour les institutions qui l\'ont appliquée. 45 institutions l\'utilisent déjà.',
      hashtags: ['ChecklistConformité', 'BCEAO', 'COBAC', 'AuditBancaire', 'Conformité', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Lundi', time: '09:00 GMT', expectedEngagement: 210 },
      ],
      characterCount: 698,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20checklist%20concept%20with%20emerald%20green%20and%20dark%20elements%20representing%20regulatory%20compliance%20audit%20preparation%20for%20African%20financial%20institutions%2C%20clean%20corporate%20design%2C%20no%20text%2C%20no%20people%2C%20modern%20editorial%20style&width=1200&height=627&seq=li-lm2a-checklist&orientation=landscape',
      ctaLabel: 'Télécharger la Checklist',
      targetAudience: 'Responsables Conformité, Auditeurs Internes, Risk Managers BCEAO/COBAC',
      expectedReach: 4800,
      expectedEngagement: 210,
      status: 'scheduled',
      scheduledDate: '2026-06-24',
    },

    // ======== LEAD MAGNET #3 : Diagnostic Flash Conformité ========
    {
      id: 'li-post-lm3a',
      articleId: 'lm-3',
      articleSlug: 'diagnostic-flash-conformite-bceao-cobac-2026',
      articleTitle: 'Diagnostic Flash Conformité BCEAO/COBAC 2026 — 10 min, score immédiat',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
      postType: 'cta_promo',
      postContent: '⚡ 10 minutes. 25 questions. Votre score de conformité immédiat.\n\nLe Diagnostic Flash Conformité 2026 scanne vos 5 domaines critiques :\n\n1️⃣ Gouvernance & Contrôle Interne\n2️⃣ Ratios Prudentiels & Solvabilité\n3️⃣ LBC/FT & Conformité KYC\n4️⃣ Systèmes d\'Information & Cyber-résilience\n5️⃣ ALM, Liquidité & Reporting\n\n🎯 Vous obtenez : Score global sur 100, Matrice des risques, Benchmark sectoriel, Plan d\'action 90 jours.\n\n📊 94% des institutions ayant suivi le plan d\'action ont réussi leur inspection sans réserve majeure.',
      hashtags: ['DiagnosticConformité', 'BCEAO', 'COBAC', 'ScoreRéglementaire', 'Gratuit', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Mercredi', time: '08:00 GMT', expectedEngagement: 245 },
      ],
      characterCount: 712,
      imageUrl: 'https://readdy.ai/api/search-image?query=Modern%20abstract%20speedometer%20gauge%20concept%20with%20emerald%20green%20gradient%20showing%20compliance%20score%20measurement%20for%20African%20banking%20regulation%2C%20clean%20corporate%20tech%20aesthetic%2C%20no%20text%2C%20no%20people%2C%20professional%20illustration&width=1200&height=627&seq=li-lm3a-diagnostic&orientation=landscape',
      ctaLabel: 'Lancer le Diagnostic',
      targetAudience: 'DG, DAF, Risk Managers, Compliance Officers Zone UEMOA/CEMAC',
      expectedReach: 5500,
      expectedEngagement: 245,
      status: 'scheduled',
      scheduledDate: '2026-06-25',
    },

    // ======== LEAD MAGNET #4 : Guide Levée de Fonds ========
    {
      id: 'li-post-lm4a',
      articleId: 'lm-4',
      articleSlug: 'guide-levee-fonds-afrique',
      articleTitle: 'Levée de Fonds en Afrique : 70% des dossiers rejetés au screening',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/guide-levee-fonds-afrique',
      postType: 'article_share',
      postContent: '💰 70% des dossiers de levée de fonds sont rejetés au premier screening.\n\nLe problème ? Pas le marché. Pas le produit. Le dossier.\n\nNotre Guide Levée de Fonds Afrique Francophone couvre les 5 dimensions que les investisseurs évaluent :\n\n📊 Santé Financière (18 critères)\n🏛️ Gouvernance & Conformité (17 critères)\n📈 Modèle Économique & Scalabilité (19 critères)\n👥 Équipe Dirigeante & Talent (16 critères)\n🚀 Traction & Croissance (19 critères)\n\n📊 Résultat : 120M+ FCFA levés par les entreprises qui ont utilisé ce guide. +60% de taux de succès.',
      hashtags: ['LevéeDeFonds', 'InvestissementAfrique', 'StartupAfrique', 'PrivateEquity', 'GuideGratuit', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Jeudi', time: '09:00 GMT', expectedEngagement: 232 },
      ],
      characterCount: 734,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20fundraising%20concept%20with%20warm%20gold%20and%20emerald%20green%20elements%20representing%20African%20startup%20investment%20readiness%20and%20growth%20capital%2C%20clean%20corporate%20finance%20aesthetic%2C%20no%20text%2C%20no%20people%2C%20modern%20editorial%20illustration&width=1200&height=627&seq=li-lm4a-fundraise&orientation=landscape',
      ctaLabel: 'Télécharger le Guide',
      targetAudience: 'CEO Startups, DG PME, Fonds VC, Investisseurs Afrique',
      expectedReach: 4900,
      expectedEngagement: 232,
      status: 'scheduled',
      scheduledDate: '2026-06-26',
    },

    // ======== LEAD MAGNET #5 : Mini Rapport Due Diligence ========
    {
      id: 'li-post-lm5a',
      articleId: 'lm-5',
      articleSlug: 'mini-rapport-due-diligence',
      articleTitle: 'Due Diligence Express : 8 red flags détectés en moyenne par rapport',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/mini-rapport-due-diligence',
      postType: 'article_share',
      postContent: '🔍 Vous envisagez une acquisition ou une levée de fonds ? Voici la réalité.\n\nEn moyenne, 8 red flags sont détectés par due diligence. Prix de la découverte tardive : réduction de valorisation, clauses de garantie onéreuses, voire transaction avortée.\n\nNotre Mini Rapport Due Diligence Express couvre 6 dimensions en 48h :\n\n📊 Financière — États, ratios, BFR\n⚖️ Légale — Statuts, contrats, litiges\n💰 Fiscale — Régularité, redressements\n⚙️ Opérationnelle — Processus, KPIs\n🌱 ESG — IFC PS 1-8, scoring\n🏛️ Réglementaire — BCEAO, COBAC, OHADA\n\n📊 97% des clients renégocient les termes après le rapport.',
      hashtags: ['DueDiligence', 'Acquisition', 'LevéeDeFonds', 'Audit', 'Afrique', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Samedi', time: '08:00 GMT', expectedEngagement: 178 },
      ],
      characterCount: 756,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20due%20diligence%20investigation%20concept%20with%20magnifying%20glass%20and%20document%20elements%20in%20warm%20emerald%20and%20amber%20tones%20for%20African%20M&width=1200&height=627&seq=li-lm5a-dd&orientation=landscape',
      ctaLabel: 'Demander un Mini-Rapport',
      targetAudience: 'DG, DAF, Fonds d\'Investissement, Avocats M&A Afrique',
      expectedReach: 4100,
      expectedEngagement: 178,
      status: 'scheduled',
      scheduledDate: '2026-06-28',
    },

    // ======== LEAD MAGNET #6 : Diagnostic ESG ========
    {
      id: 'li-post-lm6a',
      articleId: 'lm-6',
      articleSlug: 'diagnostic-esg-maturite',
      articleTitle: 'ESG : Sans positionnement, vous perdez 60% des financements',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/diagnostic-esg-maturite',
      postType: 'article_share',
      postContent: '🌱 Sans positionnement ESG, votre entreprise est automatiquement éliminée par 60% des sources de financement.\n\nLes DFI (BOAD, IFC, Proparco) et fonds impact conditionnent désormais leurs investissements à la performance ESG.\n\nNotre Diagnostic de Maturité ESG évalue 4 piliers en 12 minutes :\n\n🌍 Environnement — Climat, biodiversité, ressources\n👥 Social — Travail, communautés, chaîne de valeur\n🏛️ Gouvernance — Éthique, conformité, transparence\n📊 Impact — Mesure, reporting, valorisation\n\n📊 Résultat : Score détaillé, cartographie des risques, plan d\'action priorisé.',
      hashtags: ['ESG', 'Durabilité', 'IFC', 'Impact', 'DiagnosticGratuit', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Dimanche', time: '08:00 GMT', expectedEngagement: 165 },
      ],
      characterCount: 689,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20sustainability%20ESG%20concept%20with%20green%20leaf%20and%20circular%20economy%20elements%20in%20warm%20emerald%20tones%20for%20African%20corporate%20finance%2C%20clean%20modern%20corporate%20design%2C%20no%20text%2C%20no%20people%2C%20editorial%20illustration&width=1200&height=627&seq=li-lm6a-esg&orientation=landscape',
      ctaLabel: 'Lancer le Diagnostic ESG',
      targetAudience: 'DG, Directeurs RSE, Responsables ESG, DFI Afrique',
      expectedReach: 3600,
      expectedEngagement: 165,
      status: 'scheduled',
      scheduledDate: '2026-06-29',
    },

    // ======== LEAD MAGNET #7 : Template Audit Gouvernance ========
    {
      id: 'li-post-lm7a',
      articleId: 'lm-7',
      articleSlug: 'template-audit-gouvernance',
      articleTitle: 'Audit de Gouvernance : Template conforme AUSCGIE OHADA',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/template-audit-gouvernance',
      postType: 'framework_highlight',
      postContent: '🏛️ Votre gouvernance est-elle au niveau des exigences OHADA, BCEAO et COBAC ?\n\nNotre Template d\'Audit de Gouvernance couvre les 8 domaines critiques :\n\n1️⃣ Conseil d\'Administration & Composition\n2️⃣ Comités Spécialisés (Audit, Risques, Rémunération)\n3️⃣ Indépendance des Administrateurs\n4️⃣ Conflits d\'Intérêts\n5️⃣ Rémunération & Politique\n6️⃣ Contrôle Interne\n7️⃣ Transparence & Reporting\n8️⃣ Plan de Succession\n\n📊 Utilisé dans 32 audits en UEMOA et CEMAC. 91% de conformité post-audit.',
      hashtags: ['Gouvernance', 'AUSCGIE', 'OHADA', 'Audit', 'Template', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Mardi', time: '14:00 GMT', expectedEngagement: 156 },
      ],
      characterCount: 612,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20governance%20framework%20concept%20with%20structured%20organizational%20elements%20in%20emerald%20green%20and%20dark%20tones%20representing%20corporate%20governance%20audit%20for%20OHADA%20zone%2C%20clean%20corporate%20legal%20illustration%2C%20no%20text%2C%20no%20people&width=1200&height=627&seq=li-lm7a-gov&orientation=landscape',
      ctaLabel: 'Télécharger le Template',
      targetAudience: 'Administrateurs, DG, Secrétaires de Conseil, Avocats OHADA',
      expectedReach: 3200,
      expectedEngagement: 156,
      status: 'scheduled',
      scheduledDate: '2026-07-01',
    },

    // ======== LEAD MAGNET #8 : Simulation Risque Réglementaire ========
    {
      id: 'li-post-lm8a',
      articleId: 'lm-8',
      articleSlug: 'simulation-risque-reglementaire',
      articleTitle: 'Simulation Risque Réglementaire : Votre exposition en 10 minutes',
      articleAuthor: 'KHEPRA EXPERTS',
      articleUrl: '/lead-magnets/simulation-risque-reglementaire',
      postType: 'cta_promo',
      postContent: '⚠️ Une inspection surprise peut révéler des non-conformités critiques que vous n\'avez pas anticipées.\n\nNotre Simulation de Risque Réglementaire Bancaire évalue votre exposition en 10 minutes :\n\n📊 25 questions sur 5 domaines\n🎯 Score global et matrice des risques\n📋 Plan d\'action priorisé avec échéances\n📚 Références aux textes réglementaires en vigueur\n\n🔴 Domaines évalués : Gouvernance, Ratios Prudentiels, LBC/FT, Risques Opérationnels, ALM & Liquidité\n\n📊 85% de précision par rapport aux conclusions d\'audit réel.',
      hashtags: ['SimulationRisque', 'Conformité', 'BCEAO', 'COBAC', 'Audit', 'KHEPRAExperts'],
      bestTimeSlots: [
        { day: 'Jeudi', time: '08:00 GMT', expectedEngagement: 192 },
      ],
      characterCount: 668,
      imageUrl: 'https://readdy.ai/api/search-image?query=Professional%20abstract%20risk%20simulation%20concept%20with%20radar%20chart%20style%20elements%20in%20warm%20amber%20and%20emerald%20tones%20representing%20regulatory%20risk%20assessment%20for%20African%20banks%2C%20clean%20data%20visualization%20aesthetic%2C%20no%20text%2C%20no%20people%2C%20modern%20editorial%20design&width=1200&height=627&seq=li-lm8a-sim&orientation=landscape',
      ctaLabel: 'Lancer la Simulation',
      targetAudience: 'Risk Managers, Compliance Officers, DG Banques UEMOA/CEMAC',
      expectedReach: 3800,
      expectedEngagement: 192,
      status: 'scheduled',
      scheduledDate: '2026-07-02',
    },
  ],
  schedule: [
    {
      phase: 'Phase 1 — Conformité',
      startDate: '2026-06-23',
      endDate: '2026-06-27',
      postsPerWeek: 5,
      totalPosts: 5,
    },
    {
      phase: 'Phase 2 — Finance & ESG',
      startDate: '2026-06-28',
      endDate: '2026-07-02',
      postsPerWeek: 4,
      totalPosts: 4,
    },
    {
      phase: 'Phase 3 — CTA & Conversion',
      startDate: '2026-07-03',
      endDate: '2026-07-05',
      postsPerWeek: 3,
      totalPosts: 8,
    },
  ],
  kpis: {
    totalPosts: 17,
    totalArticles: 8,
    estimatedTotalReach: 46300,
    estimatedTotalEngagement: 2350,
    avgEngagementRate: 5.1,
    hashtagsUsed: 42,
    bestDays: ['Mardi', 'Mercredi', 'Jeudi'],
    bestTimes: ['08:00-09:30 GMT', '12:00-14:00 GMT'],
  },
};

export const DISTRIBUTION_SCHEDULE_DAYS = [
  { date: '2026-06-23', day: 'Mardi', posts: 1, phase: 'Phase 1', articles: ['Guide BCEAO 2026'] },
  { date: '2026-06-24', day: 'Mercredi', posts: 1, phase: 'Phase 1', articles: ['Checklist Conformité'] },
  { date: '2026-06-25', day: 'Jeudi', posts: 1, phase: 'Phase 1', articles: ['Diagnostic Flash Conformité'] },
  { date: '2026-06-26', day: 'Vendredi', posts: 2, phase: 'Phase 1', articles: ['Guide BCEAO (Insight)', 'Guide Levée Fonds'] },
  { date: '2026-06-27', day: 'Samedi', posts: 1, phase: 'Phase 1', articles: ['Checklist Conformité (Insight)'] },
  { date: '2026-06-28', day: 'Dimanche', posts: 1, phase: 'Phase 2', articles: ['Mini Rapport Due Diligence'] },
  { date: '2026-06-29', day: 'Lundi', posts: 1, phase: 'Phase 2', articles: ['Diagnostic ESG Maturité'] },
  { date: '2026-06-30', day: 'Mardi', posts: 1, phase: 'Phase 2', articles: ['Guide BCEAO (CTA Download)'] },
  { date: '2026-07-01', day: 'Mercredi', posts: 2, phase: 'Phase 2 + Phase 3', articles: ['Template Audit Gouv.', 'Diagnostic Flash (CTA)'] },
  { date: '2026-07-02', day: 'Jeudi', posts: 2, phase: 'Phase 3', articles: ['Simulation Risque', 'Mini Rapport DD (Insight)'] },
  { date: '2026-07-03', day: 'Vendredi', posts: 1, phase: 'Phase 3', articles: ['Diagnostic ESG (Insight DFI)'] },
  { date: '2026-07-04', day: 'Samedi', posts: 1, phase: 'Phase 3', articles: ['Template Audit (CTA Question)'] },
  { date: '2026-07-05', day: 'Dimanche', posts: 1, phase: 'Phase 3', articles: ['Simulation Risque (Insight Coût)'] },
];





