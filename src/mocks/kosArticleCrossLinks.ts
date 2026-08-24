// ============================================================
// KOS Article Cross-Links — Maillage Interne SEO
// Chaque article référence 3-4 articles connexes avec une 
// description contextuelle expliquant le lien thématique.
// ============================================================

export interface CrossLink {
  slug: string;
  title: string;
  connection: string;
  theme: string;
}

export interface ArticleCrossLinks {
  articleSlug: string;
  links: CrossLink[];
}

export const ARTICLE_CROSS_LINKS: ArticleCrossLinks[] = [
  // ============================================================
  // ARTICLE 1 — Réforme Ratio Solvabilité UEMOA 2026
  // ============================================================
  {
    articleSlug: 'reforme-ratio-solvabilite-uemoa-2026',
    links: [
      {
        slug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
        title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique',
        connection: "Les stress tests climatiques Pilier 2 impactent directement l'adéquation des fonds propres — le volet ICAAP que vous devez maîtriser pour absorber la nouvelle exigence de solvabilité.",
        theme: 'Adéquation des Fonds Propres & ICAAP',
      },
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "La réforme du ratio de solvabilité sera un point central des prochaines inspections COBAC. Votre Board doit comprendre les implications de Bâle III sur la structure de capital.",
        theme: 'Gouvernance & Supervision',
      },
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "Le risque de non-conformité LBC/FT (grey-listing) peut dégrader la notation souveraine et augmenter le coût du capital — un facteur aggravant pour les banques en quête de recapitalisation.",
        theme: 'Risques Conformité & Coût du Capital',
      },
      {
        slug: 'esg-banques-africaines-standards-issb',
        title: 'ESG en Afrique : Les Banques face aux Standards ISSB',
        connection: "Le reporting ESG ISSB devient une condition d'accès aux financements internationaux — un levier stratégique pour les banques qui doivent lever des fonds propres.",
        theme: 'Financements Internationaux & Fonds Propres',
      },
    ],
  },

  // ============================================================
  // ARTICLE 2 — Prix de Transfert BEPS
  // ============================================================
  {
    articleSlug: 'prix-transfert-5-erreurs-fatales-documentation-beps',
    links: [
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "La documentation des prix de transfert et la conformité LBC/FT partagent un socle commun : la transparence des flux financiers intra-groupe. Les deux dispositifs se renforcent mutuellement face aux administrations.",
        theme: 'Transparence Financière & Conformité',
      },
      {
        slug: 'esg-banques-africaines-standards-issb',
        title: 'ESG en Afrique : Les Banques face aux Standards ISSB',
        connection: "Les prix de transfert et le reporting ESG impliquent tous deux une documentation rigoureuse des transactions intra-groupe — un enjeu de cohérence pour les DAF des multinationales.",
        theme: 'Documentation & Reporting International',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "Un redressement fiscal majeur en prix de transfert peut impacter les fonds propres — un risque que les DAF doivent intégrer dans leur planification prudentielle.",
        theme: 'Impact Fiscal sur les Fonds Propres',
      },
    ],
  },

  // ============================================================
  // ARTICLE 3 — Préparer CA Inspection COBAC
  // ============================================================
  {
    articleSlug: 'preparer-conseil-administration-inspection-cobac',
    links: [
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "La directive COBAC 2027 exige que le Conseil d'Administration supervise directement la cyber-résilience — un pilier de gouvernance que votre Board doit maîtriser avant l'inspection.",
        theme: 'Gouvernance & Supervision COBAC',
      },
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "La COBAC examine la conformité LBC/FT lors de ses inspections. Votre dispositif anti-blanchiment sera scruté avec la même rigueur que les aspects prudentiels.",
        theme: 'Conformité Réglementaire & Inspections',
      },
      {
        slug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
        title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique',
        connection: "Le Board doit valider les scénarios climatiques intégrés dans l'ICAAP — un exercice de gouvernance que la COBAC évaluera lors de ses inspections ciblées.",
        theme: 'Gouvernance des Risques & ICAAP',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "La stratégie de recapitalisation face aux nouvelles exigences de solvabilité est une décision Board — votre Conseil doit être prêt à la justifier devant le superviseur.",
        theme: 'Décisions Stratégiques Board',
      },
      {
        slug: 'regulation-fintech-uemoa-2026-2027',
        title: 'Régulation FinTech UEMOA 2026-2027 : Guide Complet de Conformité',
        connection: "Les banques qui nouent des partenariats avec des fintechs doivent comprendre le cadre réglementaire de leurs partenaires. La COBAC examinera la due diligence du Board sur les expositions aux fintechs — un sujet émergent des inspections 2027.",
        theme: 'Partenariats Banque-FinTech & Due Diligence',
      },
    ],
  },

  // ============================================================
  // ARTICLE 4 — ESG Banques Africaines ISSB
  // ============================================================
  {
    articleSlug: 'esg-banques-africaines-standards-issb',
    links: [
      {
        slug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
        title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique',
        connection: "Les scénarios climatiques NGFS utilisés dans les stress tests Pilier 2 sont le prolongement opérationnel de votre reporting ESG ISSB — les deux démarches se nourrissent mutuellement.",
        theme: 'Risques Climatiques & Reporting ESG',
      },
      {
        slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
        title: 'Digitalisation des SFD : Le Modèle BCEAO',
        connection: "L'inclusion financière et la finance durable convergent : les SFD qui adoptent les standards ESG attirent davantage de financements des bailleurs pour leur transformation digitale.",
        theme: 'Inclusion Financière & Finance Durable',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "Les financements verts internationaux (green bonds, lignes IFI) sont conditionnés au reporting ISSB — un levier de recapitalisation pour les banques en quête de fonds propres.",
        theme: 'Financements Verts & Fonds Propres',
      },
      {
        slug: 'regulation-fintech-uemoa-2026-2027',
        title: 'Régulation FinTech UEMOA 2026-2027 : Guide Complet de Conformité',
        connection: "L'inclusion financière numérique est un pilier du 'S' de l'ESG. Les fintechs qui déploient des solutions d'inclusion financière doivent aligner leur reporting d'impact social avec les standards ISSB et leur conformité réglementaire BCEAO.",
        theme: 'Inclusion Financière Digitale & ESG',
      },
    ],
  },

  // ============================================================
  // ARTICLE 5 — Digitalisation SFD BCEAO
  // ============================================================
  {
    articleSlug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
    links: [
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "La digitalisation implique le KYC digital, qui doit impérativement respecter les nouvelles exigences GAFI sur les bénéficiaires effectifs — un risque de non-conformité à ne pas sous-estimer.",
        theme: 'KYC Digital & Conformité LBC/FT',
      },
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "La transformation digitale des SFD crée de nouveaux vecteurs de cyberattaques. Les exigences de cyber-résilience s'appliquent aussi aux institutions de microfinance digitalisées.",
        theme: 'Cybersécurité & Transformation Digitale',
      },
      {
        slug: 'esg-banques-africaines-standards-issb',
        title: 'ESG en Afrique : Les Banques face aux Standards ISSB',
        connection: "L'inclusion financière par le digital est un pilier du 'S' de l'ESG. Les SFD qui démontrent leur impact social via le digital attirent davantage d'investisseurs à impact.",
        theme: 'Impact Social & Finance Durable',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "La réforme du ratio de solvabilité s'applique aussi aux SFD de catégorie 1. Votre projet de digitalisation doit intégrer l'impact sur vos fonds propres.",
        theme: 'SFD & Exigences Prudentielles',
      },
    ],
  },

  // ============================================================
  // ARTICLE 6 — Stress Tests Climatiques Pilier 2
  // ============================================================
  {
    articleSlug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
    links: [
      {
        slug: 'esg-banques-africaines-standards-issb',
        title: 'ESG en Afrique : Les Banques face aux Standards ISSB',
        connection: "Le reporting ESG ISSB fournit les données de base (émissions carbone, expositions sectorielles) nécessaires pour calibrer vos stress tests climatiques Pilier 2.",
        theme: 'Reporting ESG & Modélisation Climatique',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "Les stress tests climatiques impactent directement le ratio de solvabilité via les exigences P2R. Une banque qui modélise le climat sans optimiser son capital risque la double peine.",
        theme: 'ICAAP & Adéquation des Fonds Propres',
      },
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "La COBAC examinera la capacité du Board à superviser les risques climatiques. Votre Conseil doit démontrer sa maîtrise des scénarios NGFS.",
        theme: 'Gouvernance Climat & Supervision',
      },
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "La résilience opérationnelle et la résilience climatique sont les deux nouveaux piliers de la supervision COBAC. Les deux exigences convergeront dans vos rapports ICAAP.",
        theme: 'Résilience Globale & Supervision COBAC',
      },
    ],
  },

  // ============================================================
  // ARTICLE 7 — LBC/FT GAFI 2026
  // ============================================================
  {
    articleSlug: 'lbcft-nouvelles-exigences-gafi-2026',
    links: [
      {
        slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
        title: 'Digitalisation des SFD : Le Modèle BCEAO',
        connection: "Le KYC digital autorisé par la BCEAO doit respecter les exigences GAFI sur les bénéficiaires effectifs. La digitalisation sans conformité LBC/FT est un risque mortel pour les SFD.",
        theme: 'KYC Digital & Vigilance BE',
      },
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "Les cybercriminels exploitent les failles LBC/FT pour blanchir via les actifs virtuels. La cybersécurité et la conformité LBC/FT forment un continuum de protection des institutions.",
        theme: 'Cybercriminalité & Blanchiment',
      },
      {
        slug: 'prix-transfert-5-erreurs-fatales-documentation-beps',
        title: 'Prix de Transfert : Les 5 Erreurs Fatales BEPS',
        connection: "Les flux financiers intra-groupe mal documentés en prix de transfert peuvent masquer des opérations de blanchiment. Les deux disciplines de conformité se renforcent mutuellement.",
        theme: 'Flux Intra-Groupe & Transparence',
      },
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "Le dispositif LBC/FT est un point d'inspection systématique de la COBAC. Votre Conseil doit démontrer une supervision active de la conformité anti-blanchiment.",
        theme: 'Gouvernance LBC/FT & Inspections',
      },
    ],
  },

  // ============================================================
  // ARTICLE 8 — Cybersécurité COBAC 2027
  // ============================================================
  {
    articleSlug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
    links: [
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "La directive COBAC 2027 sur la cyber-résilience renforce les obligations du Board déjà examinées lors des inspections. Votre Conseil doit intégrer le risque cyber dans sa gouvernance.",
        theme: 'Gouvernance Cyber & Supervision',
      },
      {
        slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
        title: 'Digitalisation des SFD : Le Modèle BCEAO',
        connection: "Toute transformation digitale crée une surface d'attaque cyber. Les SFD qui se digitalisent doivent anticiper les exigences de cyber-résilience proportionnées à leur taille.",
        theme: 'Transformation Digitale & Risques Cyber',
      },
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "Les cyberattaques visent de plus en plus les données KYC et les registres de bénéficiaires effectifs. La protection de ces données sensibles est un enjeu commun cyber-LBC/FT.",
        theme: 'Protection des Données & Conformité',
      },
      {
        slug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
        title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique',
        connection: "Les tests de résilience (Red Team, pentests) exigés par la COBAC 2027 partagent la même philosophie que les stress tests climatiques : tester la robustesse avant la crise.",
        theme: 'Tests de Résilience & Stress Testing',
      },
    ],
  },

  // ============================================================
  // ARTICLE 9 — Régulation FinTech UEMOA 2026-2027
  // ============================================================
  {
    articleSlug: 'regulation-fintech-uemoa-2026-2027',
    links: [
      {
        slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
        title: 'Digitalisation des SFD : Le Modèle BCEAO',
        connection: "La digitalisation des SFD et la régulation FinTech partagent le même cadre BCEAO sur les services financiers numériques. Les SFD qui se digitalisent deviennent de facto des acteurs FinTech soumis aux mêmes exigences d'agrément.",
        theme: 'Services Financiers Numériques & Inclusion',
      },
      {
        slug: 'lbcft-nouvelles-exigences-gafi-2026',
        title: 'LBC/FT : Nouvelles Exigences GAFI 2026',
        connection: "Le régime PSAN est la transposition directe de la Recommandation 15 du GAFI. Toute fintech manipulant des actifs virtuels doit se conformer simultanément aux exigences BCEAO et aux standards GAFI sur le KYC et les bénéficiaires effectifs.",
        theme: 'PSAN, Crypto & Conformité LBC/FT',
      },
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "Les fintechs agrées sont soumises aux mêmes exigences de cyber-résilience que les banques. L'audit de sécurité indépendant est obligatoire pour tous les régimes d'agrément BCEAO — EP, EME et PSAN.",
        theme: 'Cybersécurité & Agréments FinTech',
      },
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "Les exigences de capital minimum des fintechs (0,5 à 3 Mrds FCFA) s'inscrivent dans le même mouvement de renforcement prudentiel que la réforme du ratio de solvabilité bancaire. La BCEAO applique une logique cohérente : fonds propres solides = stabilité de l'écosystème.",
        theme: 'Exigences de Capital & Fonds Propres',
      },
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "Les fintechs agrées sont soumises aux mêmes standards de gouvernance Board que les banques classiques. Votre Conseil d'Administration doit maîtriser le cadre d'inspection prudentielle — que ce soit COBAC pour les banques ou BCEAO pour les fintechs — pour démontrer une supervision active de la conformité.",
        theme: 'Gouvernance FinTech & Supervision',
      },
      {
        slug: 'esg-banques-africaines-standards-issb',
        title: 'ESG en Afrique : Les Banques face aux Standards ISSB',
        connection: "Les fintechs vertes et les plateformes de finance carbone sont au croisement de la régulation FinTech et du reporting ISSB. Les agrégateurs de green bonds, les wallets carbone et les plateformes d'investissement ESG doivent se conformer aux deux cadres simultanément.",
        theme: 'FinTech Verte & Reporting ISSB',
      },
    ],
  },

  // ============================================================
  // ARTICLE 10 — Gestion Actif-Passif (ALM) Bancaire UEMOA
  // ============================================================
  {
    articleSlug: 'gestion-actif-passif-alm-bancaire-uemoa',
    links: [
      {
        slug: 'reforme-ratio-solvabilite-uemoa-2026',
        title: 'Réforme du Ratio de Solvabilité UEMOA 2026',
        connection: "Le risque de duration mismatch détecté par l'ALM impacte directement l'adéquation des fonds propres. Une perte EVE de 8-12% pour +200 bps peut annuler les efforts de recapitalisation — les deux disciplines sont indissociables.",
        theme: 'Solvabilité & Fonds Propres',
      },
      {
        slug: 'stress-tests-climatiques-pilier-2-bceao-cobac',
        title: 'Stress Tests Climatiques Pilier 2 : Guide Pratique',
        connection: "Les stress tests climatiques partagent la même philosophie que les stress tests ALM : tester la robustesse avant la crise. Les scénarios de choc de taux (±200 bps) sont le pendant financier des scénarios climatiques NGFS.",
        theme: 'Stress Testing & Résilience',
      },
      {
        slug: 'preparer-conseil-administration-inspection-cobac',
        title: "Préparer son Conseil d'Administration à l'Inspection COBAC",
        connection: "L'ALCO est au bilan ce que le Conseil d'Administration est à la gouvernance. Le Board doit démontrer sa supervision active du risque de taux et de liquidité lors des inspections — l'ALM est un sujet Board.",
        theme: 'Gouvernance ALCO & Supervision',
      },
      {
        slug: 'cybersecurite-bancaire-directive-cobac-2027-resilience-operationnelle',
        title: 'Cybersécurité Bancaire : Directive COBAC 2027',
        connection: "La résilience opérationnelle (COBAC 2027) et la résilience financière (ALM) sont les deux faces de la même médaille. Un choc de taux qui déstabilise le bilan est aussi grave qu'une cyberattaque qui paralyse les systèmes.",
        theme: 'Résilience Globale',
      },
      {
        slug: 'digitalisation-sfd-modele-bceao-inclusion-financiere',
        title: 'Digitalisation des SFD : Le Modèle BCEAO',
        connection: "Les SFD ont un GAP de duration souvent supérieur à celui des banques (crédits MT financés par dépôts à vue). Leur transformation digitale doit intégrer un module ALM pour piloter ce risque structurel.",
        theme: 'ALM & SFD',
      },
    ],
  },
];

export function getCrossLinksForArticle(slug: string): CrossLink[] {
  const entry = ARTICLE_CROSS_LINKS.find(cl => cl.articleSlug === slug);
  return entry?.links || [];
}





