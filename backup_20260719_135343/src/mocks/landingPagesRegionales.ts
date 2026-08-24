/* ============================================================
   KOS — Mocks : Landing Pages Régionales
   Sénégal, Côte d'Ivoire, Cameroun, Gabon
   ============================================================ */

export interface RegionStat {
  label: string;
  value: string;
  icon: string;
}

export interface RegionRegulateur {
  nom: string;
  role: string;
  textes: number;
  icon: string;
}

export interface RegionService {
  titre: string;
  description: string;
  icon: string;
  lien: string;
}

export interface RegionPage {
  id: string;
  pays: string;
  capitale: string;
  zone: string;
  regulateurPrincipal: string;
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  stats: RegionStat[];
  regulateurs: RegionRegulateur[];
  services: RegionService[];
  agrementsInfo: string;
  observatoireInfo: string;
  complianceFactoryInfo: string;
  contextLocal: string;
  newsletterInfo: string;
  accentColor: string;
}

export const landingPagesRegionales: RegionPage[] = [
  {
    id: 'senegal',
    pays: 'Sénégal',
    capitale: 'Dakar',
    zone: 'UEMOA',
    regulateurPrincipal: 'BCEAO',
    slug: 'senegal',
    heroTitle: 'Intelligence Réglementaire au Sénégal',
    heroSubtitle: 'BCEAO · Commission Bancaire UEMOA · AMF-UEMOA · DRI',
    metaTitle: 'Conformité Réglementaire Sénégal — BCEAO Commission Bancaire UEMOA | KHEPRA EXPERTS',
    metaDescription: "KHEPRA EXPERTS Sénégal : veille réglementaire BCEAO, conformité bancaire UEMOA, agréments établissements financiers Dakar. Observatoire réglementaire africain, guides agréments SFD EMF FinTech, Digital Compliance Factory. 22 ans d'expertise, 17 pays UEMOA CEMAC.",
    keywords: 'conformité réglementaire Sénégal, agrément BCEAO Dakar, commission bancaire UEMOA, veille réglementaire UEMOA, conformité bancaire Sénégal, KHEPRA EXPERTS Sénégal',
    stats: [
      { label: 'Institutions bancaires', value: '32', icon: 'ri-bank-line' },
      { label: 'SFD actifs', value: '271', icon: 'ri-hand-heart-line' },
      { label: 'Taux bancarisation', value: '24%', icon: 'ri-percent-line' },
      { label: 'Textes BCEAO suivis', value: '487', icon: 'ri-file-text-line' },
    ],
    regulateurs: [
      { nom: 'BCEAO', role: 'Banque Centrale UEMOA', textes: 487, icon: 'ri-bank-line' },
      { nom: 'Commission Bancaire UEMOA', role: 'Supervision bancaire', textes: 124, icon: 'ri-shield-check-line' },
      { nom: 'AMF-UEMOA', role: 'Marché financier régional', textes: 89, icon: 'ri-funds-line' },
      { nom: 'DRI / BCEAO', role: 'Inclusion financière', textes: 58, icon: 'ri-hand-heart-line' },
    ],
    services: [
      { titre: 'Agrément Établissement de Crédit BCEAO', description: 'Guide complet pour les banques, établissements financiers et IMF en zone UEMOA. Capital minimum, procédure BCEAO, délais 6-12 mois.', icon: 'ri-award-line', lien: '/agrements-afrique/' },
      { titre: 'Conformité LBC/FT UEMOA', description: 'Directive UEMOA n°02/2015, Recommandations GAFI, obligations déclaratives CENTIF. Politiques et procédures sur mesure.', icon: 'ri-shield-check-line', lien: '/digital-compliance-factory/' },
      { titre: 'Veille Réglementaire BCEAO', description: 'Alertes en temps réel sur les textes BCEAO, notes de service, instructions et circulaires. 487 textes suivis.', icon: 'ri-radar-line', lien: '/observatoire-reglementaire-africain/' },
      { titre: 'Diagnostic Conformité Gratuit', description: 'Évaluez la maturité réglementaire de votre institution en 8 minutes. Scoring BCEAO, LBC/FT, prudentiel, gouvernance.', icon: 'ri-stethoscope-line', lien: '/compliance-score/' },
    ],
    agrementsInfo: "Le Sénégal est l'un des marchés les plus actifs en zone UEMOA pour les demandes d'agrément. La BCEAO et la Commission Bancaire instruisent les dossiers des banques, EMF/SFD, établissements de paiement et PSP. Notre Hub Agréments Afrique détaille les 6 types d'agrément avec procédures, capital minimum et délais.",
    observatoireInfo: "La réglementation bancaire sénégalaise suit les textes de la BCEAO et de la Commission Bancaire UEMOA. Notre Observatoire Réglementaire Africain surveille en temps réel les 487 textes applicables : ratios Bâle III (Instruction CB-UMOA n°026-2016), gouvernance (Circulaires 01-02-03/2017), LBC/FT (Directive UEMOA n°02/2015) et microfinance (Instruction n°005-06-2010).",
    complianceFactoryInfo: "Notre Digital Compliance Factory™ met à disposition 78 documents de conformité calibrés pour la zone UEMOA : politiques LBC/FT, procédures contrôle interne, matrices COSO, plans d'audit, rapports BCEAO. Utilisé par 127+ institutions dont plusieurs sénégalaises.",
    contextLocal: "Le Sénégal est le 2ème marché bancaire de l'UEMOA. Le secteur financier est régulé par la BCEAO, la Commission Bancaire UEMOA, le AMF-UEMOA pour les marchés financiers. Le pays compte 32 banques, 271 SFD actifs et un secteur FinTech en forte croissance (Wave, Orange Money, Free Money). Les axes prioritaires de conformité en 2026 : cybersécurité bancaire, reporting XBRL BCEAO, et conformité ESG.",
    newsletterInfo: 'Recevez notre Bulletin Réglementaire Sénégal — alertes BCEAO, textes Commission Bancaire UEMOA, analyses sectorielles.',
    accentColor: '#0D7B5F',
  },
  {
    id: 'cote-divoire',
    pays: "Côte d'Ivoire",
    capitale: 'Abidjan',
    zone: 'UEMOA',
    regulateurPrincipal: 'BCEAO',
    slug: 'cote-divoire',
    heroTitle: "Intelligence Réglementaire en Côte d'Ivoire",
    heroSubtitle: 'BCEAO · Commission Bancaire UEMOA · BRVM · AMF-UEMOA',
    metaTitle: "Conformité Réglementaire Côte d'Ivoire — BCEAO BRVM AMF-UEMOA | KHEPRA EXPERTS",
    metaDescription: "KHEPRA EXPERTS Côte d'Ivoire : veille réglementaire BCEAO, conformité bancaire UEMOA, agréments Abidjan, BRVM, AMF-UEMOA. Observatoire réglementaire africain, guides agréments FinTech SFD, Digital Compliance Factory. Expert réglementaire Abidjan.",
    keywords: "conformité réglementaire Côte d'Ivoire, agrément BCEAO Abidjan, BRVM Bourse Régionale Valeurs Mobilières, AMF-UEMOA, veille réglementaire Abidjan, KHEPRA EXPERTS Côte d'Ivoire",
    stats: [
      { label: 'Institutions bancaires', value: '28', icon: 'ri-bank-line' },
      { label: 'SFD actifs', value: '198', icon: 'ri-hand-heart-line' },
      { label: 'Taux bancarisation', value: '26%', icon: 'ri-percent-line' },
      { label: 'Textes BCEAO suivis', value: '487', icon: 'ri-file-text-line' },
    ],
    regulateurs: [
      { nom: 'BCEAO', role: 'Banque Centrale UEMOA', textes: 487, icon: 'ri-bank-line' },
      { nom: 'Commission Bancaire UEMOA', role: 'Supervision bancaire', textes: 124, icon: 'ri-shield-check-line' },
      { nom: 'AMF-UEMOA / BRVM', role: 'Marchés financiers régionaux', textes: 112, icon: 'ri-funds-line' },
      { nom: 'ARTCI', role: 'Télécommunications & FinTech', textes: 45, icon: 'ri-smartphone-line' },
    ],
    services: [
      { titre: 'Agrément Établissements Financiers UEMOA', description: "Banques, EMF/SFD, PSP, FinTech en zone UEMOA depuis Abidjan. Procédures BCEAO complètes, capital minimum, dossiers types.", icon: 'ri-award-line', lien: '/agrements-afrique/' },
      { titre: 'Conformité BRVM & Marchés Financiers', description: "Obligations déclaratives AMF-UEMOA, conformité émetteurs BRVM, règles de cotation et acteurs de marché. Documentation sur mesure.", icon: 'ri-line-chart-line', lien: '/digital-compliance-factory/' },
      { titre: 'Observatoire Réglementaire UEMOA', description: "Surveillance temps réel BCEAO, Commission Bancaire, AMF-UEMOA. Alertes sur les textes applicables aux institutions abidjanaises.", icon: 'ri-radar-line', lien: '/observatoire-reglementaire-africain/' },
      { titre: 'Diagnostic Flash Conformité', description: "30 minutes avec un expert. Évaluation BCEAO, LBC/FT, prudentiel et ESG. Rapport personnalisé avec plan d'action.", icon: 'ri-flashlight-line', lien: '/diagnostic-flash/' },
    ],
    agrementsInfo: "Abidjan est la capitale économique de l'UEMOA, premier marché pour les FinTech et établissements de paiement. La BCEAO instruit les dossiers d'agrément pour les établissements de crédit, EMF/SFD et PSP. Les délais sont de 6 à 12 mois selon le type. Notre Hub détaille les 6 catégories d'agrément avec guides complets.",
    observatoireInfo: "Côte d'Ivoire suit le cadre réglementaire BCEAO et Commission Bancaire UEMOA. Spécificité ivoirienne : présence de la BRVM et du AMF-UEMOA à Abidjan, ce qui ajoute une couche réglementaire marchés financiers. Notre Observatoire couvre les 487 textes BCEAO + les 112 textes AMF-UEMOA applicables.",
    complianceFactoryInfo: "Notre bibliothèque documentaire couvre les exigences BCEAO, AMF-UEMOA et Commission Bancaire. 78 documents calibrés pour l'UEMOA : politiques LBC/FT CENTIF-CI, procédures SYSCOHADA, matrices de contrôle COSO, plans d'audit prudentiel.",
    contextLocal: "La Côte d'Ivoire est le premier marché bancaire de l'UEMOA (28 banques, 198 SFD, 2 800 Mds FCFA de dépôts). Abidjan abrite le siège de la BRVM et du AMF-UEMOA. Le secteur FinTech est très dynamique (Orange Money, Wave, MTN Côte d'Ivoire, Djamo). Les axes prioritaires 2026 : conformité PSP (Instruction BCEAO 2023), rapports XBRL, ESG et crypto-actifs.",
    newsletterInfo: "Recevez notre Bulletin Réglementaire Côte d'Ivoire — alertes BCEAO, AMF-UEMOA, Commission Bancaire UEMOA.",
    accentColor: '#D4AF37',
  },
  {
    id: 'cameroun',
    pays: 'Cameroun',
    capitale: 'Yaoundé',
    zone: 'CEMAC',
    regulateurPrincipal: 'COBAC',
    slug: 'cameroun',
    heroTitle: 'Intelligence Réglementaire au Cameroun',
    heroSubtitle: 'COBAC · BEAC · ANIF · COSUMAF',
    metaTitle: 'Conformité Réglementaire Cameroun — COBAC BEAC ANIF COSUMAF | KHEPRA EXPERTS',
    metaDescription: 'KHEPRA EXPERTS Cameroun : veille réglementaire COBAC, conformité bancaire CEMAC, agréments Yaoundé Douala, BEAC, ANIF. Observatoire réglementaire africain, guides agréments EMF FinTech COBAC, Digital Compliance Factory. Expert réglementaire CEMAC.',
    keywords: 'conformité réglementaire Cameroun, agrément COBAC Cameroun, BEAC CEMAC, inspection COBAC Cameroun, veille réglementaire CEMAC, ANIF déclarations soupçon, KHEPRA EXPERTS Cameroun',
    stats: [
      { label: 'Banques agréées COBAC', value: '14', icon: 'ri-bank-line' },
      { label: 'EMF actifs', value: '485', icon: 'ri-hand-heart-line' },
      { label: 'Part PIB zone CEMAC', value: '42%', icon: 'ri-pie-chart-line' },
      { label: 'Textes COBAC suivis', value: '312', icon: 'ri-file-text-line' },
    ],
    regulateurs: [
      { nom: 'COBAC', role: 'Commission Bancaire CEMAC', textes: 312, icon: 'ri-shield-check-line' },
      { nom: 'BEAC', role: 'Banque Centrale CEMAC', textes: 178, icon: 'ri-bank-line' },
      { nom: 'ANIF', role: 'Cellule de renseignement financier', textes: 67, icon: 'ri-spy-line' },
      { nom: 'COSUMAF', role: 'Marchés financiers CEMAC', textes: 54, icon: 'ri-funds-line' },
    ],
    services: [
      { titre: 'Agrément Bancaire COBAC', description: "Procédure d'agrément bancaire et EMF en zone CEMAC. Instruction COBAC, BEAC, capital minimum, dossier d'agrément et accompagnement jusqu'à l'obtention.", icon: 'ri-award-line', lien: '/agrements-afrique/' },
      { titre: 'Conformité LBC/FT CEMAC', description: "Règlement COBAC R-2018/01 sur la LBC/FT, GAFI Recommandations, déclarations ANIF. Procédures et politiques sur mesure pour les banques camerounaises.", icon: 'ri-shield-check-line', lien: '/digital-compliance-factory/' },
      { titre: 'Observatoire COBAC CEMAC', description: "Surveillance temps réel COBAC, BEAC, COSUMAF, ANIF. 312 textes suivis, alertes sur ratios prudentiels et directives de gouvernance.", icon: 'ri-radar-line', lien: '/observatoire-reglementaire-africain/' },
      { titre: 'Préparation Inspection COBAC', description: "Plan de préparation à l'inspection COBAC en 90 jours. Revue ratios, gouvernance, LBC/FT, reporting. Expérience de 15+ inspections accompagnées.", icon: 'ri-search-eye-line', lien: '/inspection-cobac/' },
    ],
    agrementsInfo: "Le Cameroun est le principal marché bancaire de la CEMAC (42% du PIB de la zone). La COBAC instruit les dossiers d'agrément des banques et EMF pour toute la CEMAC. Notre Hub Agréments Afrique couvre les procédures d'agrément bancaire COBAC, EMF et microfinance avec détail des exigences de capital minimum (10 Mds FCFA pour les banques) et des délais réels.",
    observatoireInfo: "La réglementation camerounaise en zone CEMAC est pilotée par la COBAC (supervision) et la BEAC (politique monétaire). Notre Observatoire Réglementaire Africain surveille les 312 textes COBAC applicables : Règlement COBAC R-2018/01 (LBC/FT), Instruction 007-03-2022 (gouvernance), ratios prudentiels BEAC. Spécificité CEMAC : inspections COBAC annoncées, publication des sanctions sur le site COBAC.",
    complianceFactoryInfo: "Notre Digital Compliance Factory™ inclut des documents spécifiques COBAC : politiques LBC/FT calibrées Règlement R-2018/01, procédures Instruction 007-03-2022 (gouvernance), matrices de contrôle COBAC, modèles de rapport au Conseil d'Administration. 78 documents calibrés CEMAC.",
    contextLocal: "Le Cameroun est la première économie de la CEMAC. Le secteur bancaire compte 14 banques agréées COBAC, 485 EMF actifs. Les axes prioritaires 2026 : Renforcement de la cybersécurité (Règlement COBAC R-2024/01 en vigueur), ratios de solvabilité, et conformité LBC/FT post-évaluation GABAC 2025.",
    newsletterInfo: 'Recevez notre Bulletin Réglementaire Cameroun — alertes COBAC, BEAC, ANIF, mises à jour inspection.',
    accentColor: '#C2410C',
  },
  {
    id: 'gabon',
    pays: 'Gabon',
    capitale: 'Libreville',
    zone: 'CEMAC',
    regulateurPrincipal: 'COBAC',
    slug: 'gabon',
    heroTitle: 'Intelligence Réglementaire au Gabon',
    heroSubtitle: 'COBAC · BEAC · ANIF Gabon · COSUMAF',
    metaTitle: 'Conformité Réglementaire Gabon — COBAC BEAC ANIF Libreville | KHEPRA EXPERTS',
    metaDescription: 'KHEPRA EXPERTS Gabon : veille réglementaire COBAC, conformité bancaire CEMAC, agréments Libreville, BEAC, ANIF Gabon. Observatoire réglementaire africain, guides agréments EMF banques COBAC, Digital Compliance Factory. Expert réglementaire CEMAC Gabon.',
    keywords: 'conformité réglementaire Gabon, agrément COBAC Gabon, BEAC Libreville, inspection COBAC Gabon, ANIF Gabon, veille réglementaire CEMAC, KHEPRA EXPERTS Gabon',
    stats: [
      { label: 'Banques agréées COBAC', value: '8', icon: 'ri-bank-line' },
      { label: 'EMF actifs', value: '47', icon: 'ri-hand-heart-line' },
      { label: 'Pétrole % PIB', value: '34%', icon: 'ri-oil-line' },
      { label: 'Textes COBAC suivis', value: '312', icon: 'ri-file-text-line' },
    ],
    regulateurs: [
      { nom: 'COBAC', role: 'Commission Bancaire CEMAC', textes: 312, icon: 'ri-shield-check-line' },
      { nom: 'BEAC Gabon', role: 'Siège BEAC — Yaoundé', textes: 178, icon: 'ri-bank-line' },
      { nom: 'ANIF Gabon', role: 'Renseignement financier', textes: 52, icon: 'ri-spy-line' },
      { nom: 'Direction Générale des Impôts', role: 'Prix de transfert & fiscalité', textes: 38, icon: 'ri-file-chart-line' },
    ],
    services: [
      { titre: 'Agrément Bancaire et EMF au Gabon', description: "Accompagnement agrément COBAC pour banques et EMF au Gabon. Dossier complet, capital minimum 10 Mds FCFA (banques), délais et processus COBAC/BEAC.", icon: 'ri-award-line', lien: '/agrements-afrique/' },
      { titre: 'Conformité LBC/FT & ANIF Gabon', description: "Obligations ANIF Gabon, déclarations de soupçon, Règlement COBAC R-2018/01. Procédures et politiques sur mesure pour le secteur financier gabonais.", icon: 'ri-shield-check-line', lien: '/digital-compliance-factory/' },
      { titre: 'Observatoire COBAC CEMAC', description: "Veille réglementaire COBAC, BEAC, ANIF pour les institutions gabonaises. Alertes sur inspections, nouvelles directives et sanctions.", icon: 'ri-radar-line', lien: '/observatoire-reglementaire-africain/' },
      { titre: 'Prix de Transfert & Fiscalité Internationale', description: "Documentation OCDE BEPS Action 13, Master File, Local File, Benchmark. Conseil pour groupes gabonais à dimension régionale.", icon: 'ri-scales-3-line', lien: '/prix-de-transfert/' },
    ],
    agrementsInfo: "Le Gabon possède un secteur bancaire concentré (8 banques agréées COBAC) dominé par des groupes régionaux (BGFI Group, Orabank, Société Générale). L'agrément COBAC pour les banques requiert 10 Mds FCFA de capital minimum. Notre Hub Agréments Afrique couvre le processus COBAC complet, les exigences de gouvernance et les délais réalistes.",
    observatoireInfo: "Le Gabon suit le cadre réglementaire COBAC/BEAC, avec une spécificité : siège de la BEAC à Yaoundé (Cameroun) mais présence d'une agence nationale. Notre Observatoire surveille les textes COBAC et BEAC applicables aux 8 banques et 47 EMF gabonais. Textes prioritaires 2026 : Directive COBAC cybersécurité 2027, ratios de solvabilité renforcés, reporting BEAC.",
    complianceFactoryInfo: "Notre Digital Compliance Factory™ propose des documents adaptés au contexte CEMAC/Gabon : politiques LBC/FT ANIF-calibrées, procédures COBAC, matrices de contrôle interne, modèles de rapport COBAC. Documentation utilisée par les institutions gabonaises membres de notre réseau.",
    contextLocal: "Le Gabon a une économie dominée par le pétrole (34% du PIB) en transition vers la diversification. Le secteur financier gabonais est en modernisation : transformation digitale des banques, développement du Mobile Money (Airtel Money, Orange Money), projets d'agrément FinTech. Axes prioritaires 2026 : conformité Directive COBAC 2027 (cybersécurité), LBC/FT post-évaluation GABAC, et documentation des prix de transfert pour les groupes pétroliers.",
    newsletterInfo: 'Recevez notre Bulletin Réglementaire Gabon — alertes COBAC, BEAC Gabon, ANIF, analyses prix de transfert.',
    accentColor: '#1D4ED8',
  },
];



