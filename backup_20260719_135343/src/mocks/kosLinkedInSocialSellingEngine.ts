// ═══════════════════════════════════════════════════════════════════
// KOS LinkedIn Social Selling Engine™ — Big Four Standard
// Moteur de Social Selling Niveau Deloitte / PwC / EY / KPMG
// Master Prompt v1.0 — 22 Juin 2026
// ═══════════════════════════════════════════════════════════════════

// ─── TYPES ───────────────────────────────────────────────────────────

export interface HookAuditResult {
  score: number;          // 0-100
  hasEmotion: boolean;
  hasCuriosity: boolean;
  hasRiskOrOpportunity: boolean;
  hasDataPoint: boolean;
  feedback: string;
  regeneratedHook?: string;
}

export interface URLAuditResult {
  present: boolean;
  active: boolean;
  https: boolean;
  indexable: boolean;
  url: string;
  blocked: boolean;
  correctiveAction?: string;
}

export interface PageMentionAuditResult {
  present: boolean;
  format: string;
  correct: boolean;
  added?: string;
}

export interface HashtagAuditResult {
  count: number;
  minimumMet: boolean;
  regulatory: string[];
  business: string[];
  sectoral: string[];
  brand: string[];
  allHashtags: string[];
  violations: string[];
  score: number;
}

export interface CTAAuditResult {
  hasDownload: boolean;
  hasDiscover: boolean;
  hasEvaluate: boolean;
  hasBook: boolean;
  hasAccess: boolean;
  allCTAs: string[];
  missing: string[];
  generatedCTA?: string;
  score: number;
}

export interface SocialProofAuditResult {
  present: boolean;
  elements: string[];
  types: ('field_experience' | 'benchmark' | 'mission_feedback' | 'study' | 'statistic' | 'reference')[];
  missing: string[];
}

export interface AmplificationComment {
  content: string;
  includesSummary: boolean;
  includesURL: boolean;
  includesCTA: boolean;
  autoPublishDelay: string;
}

export interface NativeArticle {
  title: string;
  wordCount: number;
  sections: { heading: string; summary: string; wordCount: number }[];
  includesContext: boolean;
  includesStakes: boolean;
  includesRisks: boolean;
  includesSolutions: boolean;
  includesConclusion: boolean;
  includesCTA: boolean;
}

export interface UTMTracking {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  fullTrackedURL: string;
}

export interface LinkedInContentBundle {
  articleId: string;
  hook: string;
  hookScore: number;
  postLinkedIn: string;
  versionDirigeant: string;
  versionPageEntreprise: string;
  amplificationComment: AmplificationComment;
  nativeArticle: NativeArticle;
  bannerPrompt: string;
  carouselSlides: { slide: number; title: string; content: string }[];
  hashtags: string[];
  trackedURL: UTMTracking;
}

export interface ScoringReport {
  hookScore: number;
  leadMagnetScore: number;
  engagementScore: number;
  authorityScore: number;
  conversionScore: number;
  globalScore: number;
  authorized: boolean;
  correctivePlan?: string[];
}

export interface SocialSellingArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  sourceUrl: string;
  leadMagnetSlug: string;
  status: 'audited' | 'generated' | 'scored' | 'approved' | 'blocked';
  // 7 Audits
  hookAudit: HookAuditResult;
  urlAudit: URLAuditResult;
  pageMentionAudit: PageMentionAuditResult;
  hashtagAudit: HashtagAuditResult;
  ctaAudit: CTAAuditResult;
  socialProofAudit: SocialProofAuditResult;
  // 10 Livrables
  contentBundle: LinkedInContentBundle;
  // Scoring
  scoring: ScoringReport;
}

export interface ArticleInputForm {
  title: string;
  content: string;
  sourceUrl: string;
  campaignName: string;
  leadMagnetName: string;
}

// ─── DONNÉES ────────────────────────────────────────────────────────

export const SOCIAL_SELLING_ARTICLES: SocialSellingArticle[] = [
  // ═══════════ ARTICLE 1 : Guide BCEAO 2026 ═══════════
  {
    id: 'ss-001',
    title: 'Guide BCEAO 2026 — Les 7 Contrôles qui Bloquent Votre Agrément',
    author: 'KHEPRA EXPERTS',
    date: '2026-06-23',
    sourceUrl: 'https://khepraexperts.com/lead-magnets/guide-bceao-2026',
    leadMagnetSlug: 'guide-bceao-2026',
    status: 'approved',

    // ─── AUDIT 1 : HOOK ───────────────────────────────
    hookAudit: {
      score: 97,
      hasEmotion: true,
      hasCuriosity: true,
      hasRiskOrOpportunity: true,
      hasDataPoint: true,
      feedback: 'Hook exceptionnel. Émotion (alerte), curiosité (les 7 contrôles), risque (rejet), donnée chiffrée (80%). Score Big Four.',
    },

    // ─── AUDIT 2 : URL ────────────────────────────────
    urlAudit: {
      present: true,
      active: true,
      https: true,
      indexable: true,
      url: 'https://khepraexperts.com/lead-magnets/guide-bceao-2026',
      blocked: false,
    },

    // ─── AUDIT 3 : PAGE ENTREPRISE ────────────────────
    pageMentionAudit: {
      present: true,
      format: 'Publié par KHEPRA EXPERTS',
      correct: true,
    },

    // ─── AUDIT 4 : HASHTAGS ───────────────────────────
    hashtagAudit: {
      count: 12,
      minimumMet: true,
      regulatory: ['#BCEAO', '#UEMOA', '#OHADA'],
      business: ['#ConformiteBancaire', '#AuditInterne', '#GestionDesRisques'],
      sectoral: ['#BanqueAfrique', '#AgrémentBancaire'],
      brand: ['#KHEPRAExperts', '#platform', '#BigFourStandard', '#GuideBCEAO2026'],
      allHashtags: [
        '#BCEAO', '#UEMOA', '#OHADA',
        '#ConformiteBancaire', '#AuditInterne', '#GestionDesRisques',
        '#BanqueAfrique', '#AgrémentBancaire',
        '#KHEPRAExperts', '#platform', '#BigFourStandard', '#GuideBCEAO2026',
      ],
      violations: [],
      score: 100,
    },

    // ─── AUDIT 5 : CTA ────────────────────────────────
    ctaAudit: {
      hasDownload: true,
      hasDiscover: true,
      hasEvaluate: false,
      hasBook: false,
      hasAccess: true,
      allCTAs: ['📥 Téléchargez le Guide BCEAO 2026', '🔍 Découvrez les 7 contrôles', '📊 Accédez au guide complet'],
      missing: ['Évaluer', 'Réserver'],
      score: 85,
    },

    // ─── AUDIT 6 : PREUVE SOCIALE ─────────────────────
    socialProofAudit: {
      present: true,
      elements: [
        '50+ missions terrain BCEAO',
        '85% de réussite au premier dépôt',
        'Basé sur les retours de 12 établissements agréés',
        'Statistique : 200M+ FCFA de coût d\'opportunité moyen',
      ],
      types: ['field_experience', 'statistic', 'mission_feedback', 'benchmark'],
      missing: [],
    },

    // ─── 10 LIVRABLES ─────────────────────────────────
    contentBundle: {
      articleId: 'ss-001',
      hook: '🚨 80% des dossiers d\'agrément BCEAO sont rejetés au premier dépôt. Retard moyen : 12 mois. Coût : 200M+ FCFA.',
      hookScore: 97,
      postLinkedIn: '🚨 80% des dossiers d\'agrément BCEAO sont rejetés au premier dépôt.\n\nRetard moyen : 12 mois. Coût d\'opportunité : 200M+ FCFA.\n\nNotre guide décrypte les 7 contrôles qui bloquent :\n\n1️⃣ Gouvernance & Comités Spécialisés (35% des rejets)\n2️⃣ Ratios Prudentiels Bâle III (28% des rejets)\n3️⃣ LBC/FT & KYC (22% des rejets)\n4️⃣ Systèmes d\'Information & Cyber-résilience\n5️⃣ ALM & Liquidité\n6️⃣ Rémunération & Conflits d\'Intérêts\n7️⃣ PCA / PCI & Continuité d\'Activité\n\n📊 Après 50+ missions terrain en zone UEMOA, 85% des institutions qui ont suivi ce guide ont obtenu leur agrément au premier dépôt.\n\n📥 Téléchargez le Guide BCEAO 2026 gratuit — 15 pages de méthodologie. Lien en commentaire 👇\n\nPublié par KHEPRA EXPERTS\n\n#BCEAO #UEMOA #OHADA #ConformiteBancaire #AuditInterne #GestionDesRisques #BanqueAfrique #AgrémentBancaire #KHEPRAExperts #platform #BigFourStandard #GuideBCEAO2026',
      versionDirigeant: 'Chers collègues du secteur bancaire UEMOA,\n\nAprès 22 ans d\'accompagnement des établissements financiers en Afrique de l\'Ouest, un constat s\'impose : 80% des dossiers d\'agrément sont rejetés au premier dépôt. Le coût ? 12 mois de retard en moyenne, soit plus de 200 millions FCFA d\'opportunités perdues.\n\nNous avons formalisé notre méthodologie dans un guide de 15 pages, structuré autour des 7 contrôles critiques de la BCEAO. Ce n\'est pas un document théorique — c\'est le résultat de 50+ missions terrain.\n\n85% des institutions qui l\'ont appliqué ont obtenu leur agrément sans réserve majeure.\n\nJe vous invite à le télécharger. C\'est gratuit, et cela peut vous épargner des mois de procédure.\n\nhttps://khepraexperts.com/lead-magnets/guide-bceao-2026?utm_source=linkedin&utm_medium=social&utm_campaign=bceao-agrement-2026&utm_content=guide-bceao-dirigeant\n\nSIMDA Essoyomèwè\nManaging Partner — KHEPRA EXPERTS',
      versionPageEntreprise: '📋 [RESSOURCE GRATUITE] Guide BCEAO 2026 — Les 7 Contrôles qui Bloquent Votre Agrément\n\n80% des dossiers rejetés. 12 mois de retard. 200M+ FCFA de coût.\n\nKHEPRA EXPERTS met à disposition son guide méthodologique de 15 pages, basé sur 50+ missions terrain en zone UEMOA.\n\nCe que vous trouverez :\n✅ Les 7 contrôles décryptés (Gouvernance, Ratios, LBC/FT, SI, ALM, Rémunération, PCA)\n✅ Checklist d\'auto-évaluation par contrôle\n✅ Templates de documentation réglementaire\n✅ Plan d\'action 90 jours\n\n📥 Téléchargement gratuit : https://khepraexperts.com/lead-magnets/guide-bceao-2026?utm_source=linkedin&utm_medium=social&utm_campaign=bceao-agrement-2026&utm_content=guide-bceao-page\n\n#BCEAO #UEMOA #ConformiteBancaire #AgrémentBancaire #KHEPRAExperts',
      amplificationComment: {
        content: '📥 Le Guide BCEAO 2026 est disponible en téléchargement gratuit ici :\n\n👉 https://khepraexperts.com/lead-magnets/guide-bceao-2026?utm_source=linkedin&utm_medium=social&utm_campaign=bceao-agrement-2026&utm_content=guide-bceao-comment\n\n📊 15 pages de méthodologie concrète, basées sur 50+ missions terrain. 85% de réussite au premier dépôt pour les institutions qui l\'ont appliqué.\n\n🔍 Vous préparez un dossier d\'agrément ? Téléchargez-le avant de soumettre votre dossier. Cela peut vous épargner 12 mois de procédure.',
        includesSummary: true,
        includesURL: true,
        includesCTA: true,
        autoPublishDelay: '5 minutes',
      },
      nativeArticle: {
        title: 'Agrément BCEAO 2026 : Pourquoi 80% des Dossiers Sont Rejetés et Comment Réussir au Premier Dépôt',
        wordCount: 1850,
        sections: [
          { heading: 'Contexte : Le nouveau paradigme de l\'agrément bancaire UEMOA', summary: 'Introduction au durcissement réglementaire post-2024 et ses implications pour les établissements financiers.', wordCount: 180 },
          { heading: 'Enjeux : 200M+ FCFA de coût d\'opportunité par dossier rejeté', summary: 'Analyse chiffrée de l\'impact économique des retards d\'agrément sur les institutions financières.', wordCount: 220 },
          { heading: 'Risques : Les 7 contrôles qui font échouer 80% des dossiers', summary: 'Décomposition détaillée des 7 domaines de contrôle avec statistiques de rejet par domaine.', wordCount: 580 },
          { heading: 'Solutions : La méthodologie KHEPRA en 4 phases', summary: 'Présentation de l\'approche structurée : diagnostic, remédiation, documentation, simulation.', wordCount: 450 },
          { heading: 'Conclusion : 85% de réussite au premier dépôt est atteignable', summary: 'Synthèse des résultats observés et appel à l\'action.', wordCount: 220 },
          { heading: 'Ressources : Téléchargez le Guide complet', summary: 'CTA final avec lien de téléchargement.', wordCount: 200 },
        ],
        includesContext: true,
        includesStakes: true,
        includesRisks: true,
        includesSolutions: true,
        includesConclusion: true,
        includesCTA: true,
      },
      bannerPrompt: 'Professional LinkedIn banner for BCEAO banking compliance guide, emerald green and gold abstract geometric elements representing regulatory framework in West Africa, clean corporate consulting aesthetic, sophisticated data visualization accents, no text overlay, premium editorial style, 1200x627 format',
      carouselSlides: [
        { slide: 1, title: 'Le Constat', content: '80% des dossiers d\'agrément BCEAO rejetés au premier dépôt. 12 mois de retard. 200M+ FCFA perdus.' },
        { slide: 2, title: 'Contrôle 1-2', content: 'Gouvernance & Comités (35% des rejets) + Ratios Prudentiels Bâle III (28% des rejets)' },
        { slide: 3, title: 'Contrôle 3-4', content: 'LBC/FT & KYC (22% des rejets) + Systèmes d\'Information & Cyber-résilience' },
        { slide: 4, title: 'Contrôle 5-7', content: 'ALM & Liquidité + Rémunération & Conflits + PCA/PCI & Continuité d\'Activité' },
        { slide: 5, title: 'La Solution', content: 'Guide 15 pages — Méthodologie éprouvée — 85% de réussite — Téléchargement gratuit' },
      ],
      hashtags: [
        '#BCEAO', '#UEMOA', '#OHADA',
        '#ConformiteBancaire', '#AuditInterne', '#GestionDesRisques',
        '#BanqueAfrique', '#AgrémentBancaire',
        '#KHEPRAExperts', '#platform', '#BigFourStandard', '#GuideBCEAO2026',
      ],
      trackedURL: {
        utm_source: 'linkedin',
        utm_medium: 'social',
        utm_campaign: 'bceao-agrement-2026',
        utm_content: 'guide-bceao-2026',
        fullTrackedURL: 'https://khepraexperts.com/lead-magnets/guide-bceao-2026?utm_source=linkedin&utm_medium=social&utm_campaign=bceao-agrement-2026&utm_content=guide-bceao-2026',
      },
    },

    // ─── SCORING ──────────────────────────────────────
    scoring: {
      hookScore: 97,
      leadMagnetScore: 92,
      engagementScore: 89,
      authorityScore: 95,
      conversionScore: 88,
      globalScore: 92,
      authorized: true,
    },
  },

  // ═══════════ ARTICLE 2 : Diagnostic Flash Conformité ═══════════
  {
    id: 'ss-002',
    title: 'Diagnostic Flash Conformité BCEAO/COBAC 2026 — 10 min, Score Immédiat',
    author: 'KHEPRA EXPERTS',
    date: '2026-06-25',
    sourceUrl: 'https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
    leadMagnetSlug: 'diagnostic-flash-conformite-bceao-cobac-2026',
    status: 'approved',

    hookAudit: {
      score: 95,
      hasEmotion: true,
      hasCuriosity: true,
      hasRiskOrOpportunity: true,
      hasDataPoint: true,
      feedback: 'Excellent hook. Urgence (inspection imminente), curiosité (score immédiat), opportunité (10 min), donnée chiffrée. Légère amélioration possible sur l\'émotion.',
    },

    urlAudit: {
      present: true,
      active: true,
      https: true,
      indexable: true,
      url: 'https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026',
      blocked: false,
    },

    pageMentionAudit: {
      present: true,
      format: 'Publié par KHEPRA EXPERTS',
      correct: true,
    },

    hashtagAudit: {
      count: 12,
      minimumMet: true,
      regulatory: ['#BCEAO', '#COBAC', '#UEMOA'],
      business: ['#ConformiteReglementaire', '#AuditBancaire', '#RiskManagement'],
      sectoral: ['#BanqueAfrique', '#FintechAfrique'],
      brand: ['#KHEPRAExperts', '#platform', '#DiagnosticConformite', '#BigFourStandard'],
      allHashtags: [
        '#BCEAO', '#COBAC', '#UEMOA',
        '#ConformiteReglementaire', '#AuditBancaire', '#RiskManagement',
        '#BanqueAfrique', '#FintechAfrique',
        '#KHEPRAExperts', '#platform', '#DiagnosticConformite', '#BigFourStandard',
      ],
      violations: [],
      score: 100,
    },

    ctaAudit: {
      hasDownload: false,
      hasDiscover: true,
      hasEvaluate: true,
      hasBook: false,
      hasAccess: true,
      allCTAs: ['⚡ Lancez le Diagnostic', '📊 Évaluez votre conformité', '🎯 Accédez au diagnostic gratuit'],
      missing: ['Télécharger', 'Réserver'],
      score: 90,
    },

    socialProofAudit: {
      present: true,
      elements: [
        '94% des institutions ont réussi leur inspection après avoir suivi le plan d\'action',
        'Basé sur les grilles d\'inspection réelles BCEAO et COBAC',
        '45 institutions utilisent déjà l\'outil',
      ],
      types: ['statistic', 'field_experience', 'benchmark'],
      missing: [],
    },

    contentBundle: {
      articleId: 'ss-002',
      hook: '⚡ Votre prochaine inspection peut arriver demain. Êtes-vous prêt ? 10 minutes pour le savoir.',
      hookScore: 95,
      postLinkedIn: '⚡ Votre prochaine inspection BCEAO ou COBAC peut arriver demain. Êtes-vous prêt ?\n\n10 minutes. 25 questions. Votre score de conformité immédiat.\n\nLe Diagnostic Flash Conformité 2026 scanne vos 5 domaines critiques :\n\n1️⃣ Gouvernance & Contrôle Interne\n2️⃣ Ratios Prudentiels & Solvabilité\n3️⃣ LBC/FT & Conformité KYC\n4️⃣ Systèmes d\'Information & Cyber-résilience\n5️⃣ ALM, Liquidité & Reporting\n\n🎯 Vous obtenez : Score global sur 100, Matrice des risques, Benchmark sectoriel, Plan d\'action 90 jours.\n\n📊 94% des institutions ayant suivi le plan d\'action ont réussi leur inspection sans réserve majeure. 45 institutions l\'utilisent déjà.\n\n⚡ Lancez votre diagnostic gratuit maintenant — lien en commentaire 👇\n\nPublié par KHEPRA EXPERTS\n\n#BCEAO #COBAC #UEMOA #ConformiteReglementaire #AuditBancaire #RiskManagement #BanqueAfrique #FintechAfrique #KHEPRAExperts #platform #DiagnosticConformite #BigFourStandard',
      versionDirigeant: 'Chers DG, DAF, Risk Managers,\n\nUne inspection réglementaire peut arriver sans préavis. En 22 ans de pratique, j\'ai vu trop d\'institutions découvrir leurs non-conformités le jour J.\n\nNous avons développé un outil de diagnostic flash : 10 minutes, 25 questions, un score immédiat sur 100. C\'est gratuit, confidentiel, et basé sur les grilles d\'inspection réelles de la BCEAO et de la COBAC.\n\n94% des institutions qui ont suivi le plan d\'action généré ont réussi leur inspection suivante sans réserve majeure.\n\nPrenez 10 minutes maintenant. Cela peut vous épargner des mois de remédiation forcée.\n\nhttps://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026?utm_source=linkedin&utm_medium=social&utm_campaign=conformite-flash-2026&utm_content=diagnostic-flash-dirigeant\n\nSIMDA Essoyomèwè\nManaging Partner — KHEPRA EXPERTS',
      versionPageEntreprise: '⚡ [OUTIL GRATUIT] Diagnostic Flash Conformité BCEAO/COBAC 2026\n\n10 minutes. 25 questions. Score immédiat sur 100.\n\nKHEPRA EXPERTS lance son outil de diagnostic réglementaire, basé sur les grilles d\'inspection réelles.\n\nCe que vous obtenez :\n✅ Score global de conformité sur 100\n✅ Matrice des risques par domaine\n✅ Benchmark sectoriel anonymisé\n✅ Plan d\'action 90 jours priorisé\n\n📊 94% de réussite aux inspections post-diagnostic. 45 institutions utilisatrices.\n\n⚡ Lancez votre diagnostic : https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026?utm_source=linkedin&utm_medium=social&utm_campaign=conformite-flash-2026&utm_content=diagnostic-flash-page\n\n#BCEAO #COBAC #ConformiteReglementaire #AuditBancaire #KHEPRAExperts',
      amplificationComment: {
        content: '⚡ Le Diagnostic Flash Conformité est gratuit et prend 10 minutes.\n\n👉 https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026?utm_source=linkedin&utm_medium=social&utm_campaign=conformite-flash-2026&utm_content=diagnostic-flash-comment\n\n📊 25 questions, 5 domaines, score immédiat. Basé sur les grilles d\'inspection réelles BCEAO et COBAC.\n\n94% des institutions qui ont suivi le plan d\'action post-diagnostic ont passé leur inspection sans réserve majeure. Prenez 10 minutes maintenant.',
        includesSummary: true,
        includesURL: true,
        includesCTA: true,
        autoPublishDelay: '5 minutes',
      },
      nativeArticle: {
        title: 'Préparer une Inspection BCEAO/COBAC : Le Diagnostic Flash qui Révèle les Non-Conformités Avant qu\'il ne Soit Trop Tard',
        wordCount: 2100,
        sections: [
          { heading: 'Contexte : Le risque inspection, une épée de Damoclès pour 100% des établissements', summary: 'Panorama du paysage d\'inspection UEMOA/CEMAC et fréquence des contrôles inopinés.', wordCount: 200 },
          { heading: 'Enjeux : 6 à 24 mois de remédiation forcée en cas de non-conformité majeure', summary: 'Conséquences opérationnelles, financières et réputationnelles d\'une inspection défavorable.', wordCount: 250 },
          { heading: 'Risques : Les 5 angles morts que les grilles d\'inspection révèlent systématiquement', summary: 'Analyse détaillée des domaines les plus sanctionnés avec données chiffrées.', wordCount: 600 },
          { heading: 'Solutions : Le Diagnostic Flash KHEPRA, mode d\'emploi', summary: 'Présentation de l\'outil, de sa méthodologie et des résultats attendus.', wordCount: 500 },
          { heading: 'Conclusion : 10 minutes aujourd\'hui peuvent vous épargner 24 mois demain', summary: 'Synthèse et appel à l\'action urgent.', wordCount: 300 },
          { heading: 'Passez à l\'action : Diagnostic gratuit', summary: 'CTA final.', wordCount: 250 },
        ],
        includesContext: true,
        includesStakes: true,
        includesRisks: true,
        includesSolutions: true,
        includesConclusion: true,
        includesCTA: true,
      },
      bannerPrompt: 'Professional LinkedIn banner for regulatory compliance diagnostic tool, warm amber and emerald green geometric speedometer concept representing immediate risk assessment for African banks, clean fintech aesthetic, premium corporate design, no text, 1200x627 format',
      carouselSlides: [
        { slide: 1, title: 'Le Contexte', content: 'Inspection BCEAO/COBAC imminente ? 10 minutes pour connaître votre niveau de préparation réel.' },
        { slide: 2, title: 'Les 5 Domaines', content: 'Gouvernance · Ratios Prudentiels · LBC/FT · Systèmes d\'Information · ALM & Liquidité' },
        { slide: 3, title: 'Ce Que Vous Obtenez', content: 'Score /100 · Matrice des risques · Benchmark sectoriel · Plan d\'action 90 jours' },
        { slide: 4, title: 'Les Résultats', content: '94% de réussite aux inspections post-diagnostic. 45 institutions. 5 domaines scannés.' },
        { slide: 5, title: 'Passez à l\'Action', content: '10 minutes maintenant. Gratuit. Confidentiel. Lancez votre diagnostic →' },
      ],
      hashtags: [
        '#BCEAO', '#COBAC', '#UEMOA',
        '#ConformiteReglementaire', '#AuditBancaire', '#RiskManagement',
        '#BanqueAfrique', '#FintechAfrique',
        '#KHEPRAExperts', '#platform', '#DiagnosticConformite', '#BigFourStandard',
      ],
      trackedURL: {
        utm_source: 'linkedin',
        utm_medium: 'social',
        utm_campaign: 'conformite-flash-2026',
        utm_content: 'diagnostic-flash-conformite',
        fullTrackedURL: 'https://khepraexperts.com/lead-magnets/diagnostic-flash-conformite-bceao-cobac-2026?utm_source=linkedin&utm_medium=social&utm_campaign=conformite-flash-2026&utm_content=diagnostic-flash-conformite',
      },
    },

    scoring: {
      hookScore: 95,
      leadMagnetScore: 94,
      engagementScore: 91,
      authorityScore: 93,
      conversionScore: 90,
      globalScore: 93,
      authorized: true,
    },
  },

  // ═══════════ ARTICLE 3 : Guide Levée de Fonds (BLOQUÉ — Score < 90) ═══════════
  {
    id: 'ss-003',
    title: 'Guide Levée de Fonds Afrique Francophone — 89 Critères pour Passer le Screening',
    author: 'KHEPRA EXPERTS',
    date: '2026-06-26',
    sourceUrl: 'https://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique',
    leadMagnetSlug: 'guide-levee-fonds-afrique',
    status: 'blocked',

    hookAudit: {
      score: 78,
      hasEmotion: false,
      hasCuriosity: true,
      hasRiskOrOpportunity: true,
      hasDataPoint: true,
      feedback: 'Hook insuffisant. Donnée chiffrée présente (70%), risque présent, mais l\'émotion est absente. Manque l\'urgence ou la tension qui provoque l\'action immédiate. Score < 95 : REGENERATION REQUISE.',
      regeneratedHook: '💰 Votre levée de fonds est morte avant d\'avoir commencé. 70% des dossiers rejetés au premier screening. Voici pourquoi.',
    },

    urlAudit: {
      present: true,
      active: true,
      https: true,
      indexable: true,
      url: 'https://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique',
      blocked: false,
    },

    pageMentionAudit: {
      present: false,
      format: '',
      correct: false,
      added: 'Publié par KHEPRA EXPERTS',
    },

    hashtagAudit: {
      count: 8,
      minimumMet: false,
      regulatory: ['#UEMOA', '#CEMAC'],
      business: ['#LevéeDeFonds', '#PrivateEquity'],
      sectoral: ['#StartupAfrique'],
      brand: ['#KHEPRAExperts', '#platform', '#GuideLevéeDeFonds'],
      allHashtags: [
        '#UEMOA', '#CEMAC',
        '#LevéeDeFonds', '#PrivateEquity',
        '#StartupAfrique',
        '#KHEPRAExperts', '#platform', '#GuideLevéeDeFonds',
      ],
      violations: ['#LevéeDeFonds', '#PrivateEquity', '#StartupAfrique'],
      score: 55,
    },

    ctaAudit: {
      hasDownload: true,
      hasDiscover: false,
      hasEvaluate: false,
      hasBook: false,
      hasAccess: false,
      allCTAs: ['📥 Téléchargez le Guide'],
      missing: ['Découvrir', 'Évaluer', 'Réserver', 'Accéder'],
      generatedCTA: '🔍 Découvrez les 89 critères · 📊 Évaluez votre dossier · 📥 Téléchargez le Guide complet',
      score: 40,
    },

    socialProofAudit: {
      present: false,
      elements: [],
      types: [],
      missing: ['Aucun élément de preuve sociale. Ajouter statistiques, retours mission, ou benchmark.'],
    },

    contentBundle: {
      articleId: 'ss-003',
      hook: '💰 70% des dossiers de levée de fonds sont rejetés au premier screening.',
      hookScore: 78,
      postLinkedIn: '💰 70% des dossiers de levée de fonds sont rejetés au premier screening.\n\nLe problème ? Pas le marché. Pas le produit. Le dossier.\n\nNotre Guide Levée de Fonds Afrique Francophone couvre les 5 dimensions que les investisseurs évaluent :\n\n📊 Santé Financière (18 critères)\n🏛️ Gouvernance & Conformité (17 critères)\n📈 Modèle Économique & Scalabilité (19 critères)\n👥 Équipe Dirigeante & Talent (16 critères)\n🚀 Traction & Croissance (19 critères)\n\n📥 Téléchargez le Guide gratuit — lien en commentaire.\n\n#UEMOA #CEMAC #LevéeDeFonds #PrivateEquity #StartupAfrique #KHEPRAExperts #platform #GuideLevéeDeFonds',
      versionDirigeant: 'Chers entrepreneurs et dirigeants,\n\nLa levée de fonds en Afrique francophone suit des règles précises. 70% des dossiers échouent au premier screening. Notre guide décrypte les 89 critères que les investisseurs examinent.\n\nhttps://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique?utm_source=linkedin&utm_medium=social&utm_campaign=levee-fonds-afrique-2026&utm_content=guide-levee-fonds-dirigeant',
      versionPageEntreprise: '💰 Guide Levée de Fonds Afrique — Téléchargement gratuit.\n\nhttps://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique?utm_source=linkedin&utm_medium=social&utm_campaign=levee-fonds-afrique-2026&utm_content=guide-levee-fonds-page',
      amplificationComment: {
        content: '📥 Guide disponible ici : https://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique?utm_source=linkedin&utm_medium=social&utm_campaign=levee-fonds-afrique-2026&utm_content=guide-levee-fonds-comment',
        includesSummary: false,
        includesURL: true,
        includesCTA: false,
        autoPublishDelay: '5 minutes',
      },
      nativeArticle: {
        title: 'Levée de Fonds en Afrique Francophone : Les 89 Critères qui Font la Différence',
        wordCount: 1200,
        sections: [
          { heading: 'Introduction', summary: 'Contexte des levées de fonds en zone UEMOA/CEMAC.', wordCount: 150 },
          { heading: 'Les 5 dimensions', summary: 'Présentation des critères.', wordCount: 600 },
          { heading: 'Conclusion', summary: 'Synthèse.', wordCount: 200 },
          { heading: 'Téléchargement', summary: 'CTA.', wordCount: 250 },
        ],
        includesContext: true,
        includesStakes: false,
        includesRisks: false,
        includesSolutions: false,
        includesConclusion: true,
        includesCTA: true,
      },
      bannerPrompt: 'Professional LinkedIn banner for African startup fundraising guide, warm gold and emerald green geometric elements representing investment readiness and growth capital, clean corporate finance aesthetic, no text, 1200x627',
      carouselSlides: [
        { slide: 1, title: 'Le Constat', content: '70% des dossiers rejetés au premier screening. 89 critères à maîtriser.' },
        { slide: 2, title: 'Les 5 Dimensions', content: 'Santé Financière · Gouvernance · Modèle Économique · Équipe · Traction' },
        { slide: 3, title: 'Téléchargement', content: 'Guide gratuit →' },
      ],
      hashtags: [
        '#UEMOA', '#CEMAC',
        '#LevéeDeFonds', '#PrivateEquity',
        '#StartupAfrique',
        '#KHEPRAExperts', '#platform', '#GuideLevéeDeFonds',
      ],
      trackedURL: {
        utm_source: 'linkedin',
        utm_medium: 'social',
        utm_campaign: 'levee-fonds-afrique-2026',
        utm_content: 'guide-levee-fonds',
        fullTrackedURL: 'https://khepraexperts.com/lead-magnets/guide-levee-fonds-afrique?utm_source=linkedin&utm_medium=social&utm_campaign=levee-fonds-afrique-2026&utm_content=guide-levee-fonds',
      },
    },

    scoring: {
      hookScore: 78,
      leadMagnetScore: 72,
      engagementScore: 60,
      authorityScore: 65,
      conversionScore: 55,
      globalScore: 66,
      authorized: false,
      correctivePlan: [
        'REGENERER le hook — Score actuel 78/100, minimum requis 95/100',
        'AJOUTER mention "Publié par KHEPRA EXPERTS"',
        'AJOUTER 2 hashtags réglementaires supplémentaires (#OHADA, #BCEAO)',
        'AJOUTER 1 hashtag métier supplémentaire (#GestionDesRisques)',
        'AJOUTER 1 hashtag sectoriel supplémentaire (#InvestissementAfrique)',
        'AJOUTER 1 hashtag marque supplémentaire (#BigFourStandard)',
        'AJOUTER CTA multiples : Découvrir, Évaluer, Accéder, Réserver',
        'AJOUTER preuve sociale : statistique de levées réussies, benchmark, retours mission',
        'ENRICHIR le commentaire d\'amplification : ajouter résumé + CTA',
        'COMPLÉTER l\'article natif : ajouter Enjeux, Risques, Solutions (actuellement 1200 mots, cible 1800+)',
        'AJOUTER 2 slides au carrousel (actuellement 3, minimum 5 recommandé)',
      ],
    },
  },
];

// ─── STATISTIQUES GLOBALES ──────────────────────────────────────────

export const SOCIAL_SELLING_KPIS = {
  totalArticles: 3,
  articlesApproved: 2,
  articlesBlocked: 1,
  averageGlobalScore: 84,
  averageHookScore: 90,
  averageLeadMagnetScore: 86,
  averageEngagementScore: 80,
  averageAuthorityScore: 84,
  averageConversionScore: 78,
  totalDeliverablesGenerated: 30,
  totalHashtagsGenerated: 32,
  totalUTMLinksCreated: 9,
  publicationGateThreshold: 90,
  bigFourStandardVersion: 'KOS-LSSE-v1.0-BigFour',
};

// ─── RÈGLES DU MASTER PROMPT (pour affichage dashboard) ─────────────

export const MASTER_PROMPT_RULES = {
  hook: {
    minimum: 95,
    criteria: ['Émotion forte', 'Curiosité', 'Risque ou opportunité', 'Donnée chiffrée'],
    weight: 25,
  },
  url: {
    criteria: ['Présente', 'Active', 'HTTPS', 'Indexable'],
    blockingViolation: 'URL absente = BLOCAGE IMMÉDIAT',
    weight: 0,
  },
  pageMention: {
    format: 'Publié par KHEPRA EXPERTS',
    weight: 10,
  },
  hashtags: {
    minimum: 10,
    distribution: '3 réglementaires + 3 métiers + 2 sectoriels + 2 marque',
    examples: ['#BCEAO', '#COBAC', '#OHADA', '#ConformiteBancaire', '#AuditInterne', '#RiskManagement', '#BanqueAfrique', '#FintechAfrique', '#KHEPRAExperts', '#platform'],
    weight: 15,
  },
  cta: {
    types: ['Télécharger', 'Découvrir', 'Évaluer', 'Réserver', 'Accéder'],
    weight: 15,
  },
  socialProof: {
    types: ['Expérience terrain', 'Benchmark', 'Retour mission', 'Étude', 'Statistique', 'Référentiel'],
    minimum: 1,
    weight: 10,
  },
  amplificationComment: {
    required: ['Résumé', 'URL', 'CTA'],
    autoPublishDelay: '5 minutes',
    weight: 10,
  },
  nativeArticle: {
    wordCount: '1 200 - 2 500 mots',
    structure: ['Contexte', 'Enjeux', 'Risques', 'Solutions', 'Conclusion', 'CTA'],
    weight: 15,
  },
  scoring: {
    dimensions: [
      { key: 'hookScore', label: 'Hook Score', max: 100 },
      { key: 'leadMagnetScore', label: 'Lead Magnet Score', max: 100 },
      { key: 'engagementScore', label: 'Engagement Score', max: 100 },
      { key: 'authorityScore', label: 'Authority Score', max: 100 },
      { key: 'conversionScore', label: 'Conversion Score', max: 100 },
    ],
    publicationThreshold: 90,
    rule: 'Score Global < 90 → INTERDIRE PUBLICATION + PLAN ACTION CORRECTIF',
  },
  mandatoryDeliverables: [
    '1. Hook LinkedIn',
    '2. Post LinkedIn',
    '3. Version dirigeant',
    '4. Version page entreprise',
    '5. Commentaire d\'amplification',
    '6. Article LinkedIn natif',
    '7. Bannière LinkedIn',
    '8. Carrousel LinkedIn',
    '9. Liste hashtags',
    '10. URL trackée',
  ],
};

// ─── FONCTIONS UTILITAIRES ─────────────────────────────────────────

export function getStatusColor(status: SocialSellingArticle['status']): { bg: string; text: string; dot: string; label: string } {
  switch (status) {
    case 'approved': return { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Approuvé ≥ 90' };
    case 'blocked': return { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', label: 'Bloqué < 90' };
    case 'scored': return { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Scoring en cours' };
    case 'generated': return { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-500', label: 'Contenu généré' };
    case 'audited': return { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500', label: 'Audité' };
    default: return { bg: 'bg-gray-50', text: 'text-gray-700', dot: 'bg-gray-500', label: 'N/A' };
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return '#059669';
  if (score >= 80) return '#D97706';
  if (score >= 60) return '#EA580C';
  return '#DC2626';
}

export function getScoreLabel(score: number): string {
  if (score >= 95) return 'BIG FOUR SUPREME';
  if (score >= 90) return 'BIG FOUR STANDARD';
  if (score >= 80) return 'CORRECTIONS MINEURES';
  if (score >= 60) return 'RÉVISIONS SIGNIFICATIVES';
  return 'NON CONFORME';
}



