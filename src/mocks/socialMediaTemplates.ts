export const SOCIAL_PHONE = '+228 93 98 49 09';
export const SOCIAL_EMAIL = 'contact@khepraexperts.com';
export const SOCIAL_WEBSITE = 'khepraexperts.com';
export const SOCIAL_ADDRESS = 'Lomé, Togo';

export interface SocialMediaTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
}

export const TEMPLATES: SocialMediaTemplate[] = [
  { id: 'conformite-sfd-emf', name: 'Conformité Réglementaire SFD / EMF', category: 'conformite', description: 'BCEAO · UMOA · CEMAC · OHADA' },
  { id: 'gouvernance-org', name: 'Gouvernance & Organisation', category: 'gouvernance', description: 'Organes statutaires · politiques · procédures' },
  { id: 'finance-levee-fonds', name: 'Finance & Levée de Fonds', category: 'finance', description: 'Structuration · Business plan · Investisseurs' },
  { id: 'conseil-strategique', name: 'Conseil Stratégique', category: 'strategie', description: 'Vision · Roadmap · Positionnement' },
  { id: 'transformation-digitale', name: 'Transformation Digitale', category: 'digital', description: 'Maturité · Processus · Technologies' },
  { id: 'gestion-risques', name: 'Gestion des Risques', category: 'risques', description: 'Cartographie · Mesure · Suivi' },
  { id: 'audit-conformite', name: 'Audit & Contrôle Interne', category: 'audit', description: 'Évaluation · Recommandations · Plan d\'actions' },
  { id: 'renforcement-capacites', name: 'Renforcement des Capacités', category: 'formation', description: 'Formations sur mesure · Coaching · Mentoring' },
  { id: 'communication-strategique', name: 'Communication Stratégique', category: 'communication', description: 'Marque · Reputation · Relations publiques' },
  { id: 'ressources-humaines', name: 'Ressources Humaines', category: 'rh', description: 'Recrutement · Politique RH · Talent Management' },
  { id: 'diagnostic-org', name: 'Diagnostic Organisationnel', category: 'diagnostic', description: 'Évaluation · Analyse · Plan d\'actions' },
  { id: 'cfo-externalise', name: 'CFO Externalisé', category: 'finance', description: 'Pilotage financier · Reporting · Tableaux de bord' },
  { id: 'etude-faisabilite', name: 'Études de Faisabilité', category: 'etude', description: 'Technique · Commerciale · Financière · ESG' },
  { id: 'due-diligence', name: 'Due Diligence', category: 'audit', description: 'Finance · Légal · Technique · Environnement' },
  { id: 'esg-impact', name: 'ESG & Impact', category: 'esg', description: 'Environnement · Social · Gouvernance · Reporting' },
  // ---- PREMIUM LINKEDIN BANNERS ----
  { id: 'premium-audit-financier', name: 'Audit Financier — Bannière Premium', category: 'premium_audit', description: 'Graphiques boursiers et tableurs or sur fond noir. Conformité OHADA & Transparence Totale.' },
  { id: 'premium-audit-informatique', name: 'Audit Informatique — Bannière Premium', category: 'premium_audit', description: 'Schémas de serveurs et cadenas digitaux en vert néon discret. Sécurisez vos actifs numériques.' },
  { id: 'premium-outils-ia', name: 'Outils IA & Reporting — Bannière Premium', category: 'premium_digital', description: 'Interface de dashboard futuriste et data visualisation. L\'Audit intelligent piloté par l\'IA.' },
  { id: 'premium-recrutement', name: 'Recrutement & Équipe — Bannière Premium', category: 'premium_rh', description: 'Gros plan sur une poignée de main ou un bureau collaboratif. L\'expertise pluridisciplinaire à votre service.' },
  // ---- NOUVEAUX TEMPLATES PREMIUM 2025 ----
  { id: 'premium-levee-fonds', name: 'Levée de Fonds — Bannière Premium', category: 'premium_finance', description: 'Graphiques dorés de croissance, pièces et symboles monétaires flottants. Structuration financière & Investisseurs.' },
  { id: 'premium-conseil-strategique', name: 'Conseil Stratégique — Bannière Premium', category: 'premium_strategie', description: 'Échiquier d\'échecs doré, boussole lumineuse et carte de l\'Afrique stylisée. Définissez votre trajectoire.' },
  { id: 'premium-transformation-digitale', name: 'Transformation Digitale — Bannière Premium', category: 'premium_digital', description: 'Circuits imprimés dorés, matrice digitale et hologramme futuriste. Accélérez votre maturité technologique.' },
  { id: 'premium-gestion-risques', name: 'Gestion des Risques — Bannière Premium', category: 'premium_risques', description: 'Bouclier doré majestueux, matrice de risque et cadrans d\'alerte. Anticipez · Mesurez · Maîtrisez.' },
  { id: 'premium-gouvernance-org', name: 'Gouvernance d\'Entreprise — Bannière Premium', category: 'premium_gouvernance', description: 'Table de Conseil dorée, marteau institutionnel et organigramme abstrait. Structurez vos organes de décision.' },
  { id: 'premium-conformite-sfd-emf', name: 'Conformité SFD / EMF — Bannière Premium', category: 'premium_gouvernance', description: 'Documents réglementaires dorés, balance de justice et sceaux officiels. BCEAO · COBAC · OHADA.' },
  { id: 'premium-due-diligence', name: 'Due Diligence — Bannière Premium', category: 'premium_finance', description: 'Loupe dorée sur documents financiers, graphiques et tampons de vérification. Analysez · Validez · Décidez.' },
  { id: 'premium-esg-impact', name: 'ESG & Impact — Bannière Premium', category: 'premium_esg', description: 'Arbre doré lumineux, globe terrestre stylisé et énergies renouvelables. Reporting · Conformité · Valeur.' },
  { id: 'premium-agrement-imf-emf', name: 'Agrément IMF / EMF — Bannière Premium', category: 'premium_imf', description: 'Tampons d\'agrément officiels, documents IMF et carte UEMOA/CEMAC dorée. BCEAO · COBAC · 85% de succès.' },
];

export const CATEGORY_LABELS: Record<string, string> = {
  conformite: 'Conformité',
  gouvernance: 'Gouvernance',
  finance: 'Finance',
  strategie: 'Stratégie',
  digital: 'Digital',
  risques: 'Risques',
  audit: 'Audit',
  formation: 'Formation',
  communication: 'Communication',
  rh: 'RH',
  diagnostic: 'Diagnostic',
  etude: 'Études',
  esg: 'ESG',
  premium_audit: 'Audit Premium',
  premium_digital: 'Digital Premium',
  premium_rh: 'RH Premium',
  // ---- NOUVELLES CATÉGORIES PREMIUM ----
  premium_finance: 'Finance Premium',
  premium_strategie: 'Stratégie Premium',
  premium_risques: 'Risques Premium',
  premium_gouvernance: 'Gouvernance Premium',
  premium_esg: 'ESG Premium',
  premium_imf: 'IMF Premium',
};

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; accent: string }> = {
  conformite: { bg: 'from-emerald-900 to-slate-900', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  gouvernance: { bg: 'from-teal-900 to-slate-900', text: 'text-teal-400', accent: 'bg-teal-500' },
  finance: { bg: 'from-emerald-900 to-slate-900', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  strategie: { bg: 'from-indigo-900 to-slate-900', text: 'text-indigo-400', accent: 'bg-indigo-500' },
  digital: { bg: 'from-cyan-900 to-slate-900', text: 'text-cyan-400', accent: 'bg-cyan-500' },
  risques: { bg: 'from-rose-900 to-slate-900', text: 'text-rose-400', accent: 'bg-rose-500' },
  audit: { bg: 'from-orange-900 to-slate-900', text: 'text-orange-400', accent: 'bg-orange-500' },
  formation: { bg: 'from-violet-900 to-slate-900', text: 'text-violet-400', accent: 'bg-violet-500' },
  communication: { bg: 'from-pink-900 to-slate-900', text: 'text-pink-400', accent: 'bg-pink-500' },
  rh: { bg: 'from-sky-900 to-slate-900', text: 'text-sky-400', accent: 'bg-sky-500' },
  diagnostic: { bg: 'from-yellow-900 to-slate-900', text: 'text-yellow-400', accent: 'bg-yellow-500' },
  etude: { bg: 'from-lime-900 to-slate-900', text: 'text-lime-400', accent: 'bg-lime-500' },
  esg: { bg: 'from-green-900 to-slate-900', text: 'text-green-400', accent: 'bg-green-500' },
  premium_audit: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_digital: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_rh: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  // ---- NOUVELLES COULEURS PREMIUM ----
  premium_finance: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_strategie: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_risques: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_gouvernance: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_esg: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
  premium_imf: { bg: 'from-black to-emerald-950', text: 'text-emerald-400', accent: 'bg-emerald-500' },
};

export interface TemplateContent {
  title: string;
  subtitle: string;
  domains: { icon: string; title: string; desc: string }[];
  whyUs: string[];
  cta: string;
  badge: string;
}

export const TEMPLATE_CONTENT: Record<string, TemplateContent> = {
  'conformite-sfd-emf': {
    title: 'CONFORMITÉ RÉGLEMENTAIRE',
    subtitle: 'DES SFD / EMF',
    domains: [
      { icon: 'ri-government-line', title: 'GOUVERNANCE & ORGANISATION', desc: 'Mise en place des organes statutaires, politiques et procédures conformes aux exigences légales.' },
      { icon: 'ri-shield-check-line', title: 'CONTRÔLE INTERNE & GESTION DES RISQUES', desc: 'Dispositifs de contrôle interne, cartographie des risques, dispositifs de mesure et de suivi.' },
      { icon: 'ri-file-shield-line', title: 'CONFORMITÉ LBC/FT', desc: 'Mise en place du dispositif de Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme.' },
      { icon: 'ri-article-line', title: 'REPORTING & OBLIGATIONS RÉGLEMENTAIRES', desc: 'Production des états réglementaires, transparence financière et respect des délais de transmission aux autorités.' },
      { icon: 'ri-hand-heart-line', title: 'ACCOMPAGNEMENT RÉGLEMENTAIRE', desc: 'Préparation aux inspections BCEAO/COBAC, mise à niveau et suivi post-inspection.' },
    ],
    whyUs: [
      'Expertise pointue des réglementations BCEAO, UMOA, CEMAC et OHADA',
      'Expérience avérée auprès des SFD/EMF et institutions financières en Afrique',
      'Méthodologie éprouvée et outils adaptés aux nouvelles exigences',
      'Approche pragmatique, orientée résultats et durabilité',
    ],
    cta: 'DEMANDEZ UN DIAGNOSTIC CONFORMITÉ GRATUIT',
    badge: 'CONFORMITÉ AUJOURD\'HUI\nSÉCURITÉ DEMAIN !',
  },
  'gouvernance-org': {
    title: 'GOUVERNANCE D\'ENTREPRISE',
    subtitle: 'STRUCTUREZ VOS ORGANES DE DÉCISION',
    domains: [
      { icon: 'ri-building-line', title: 'ORGANES STATUTAIRES', desc: 'Conseil d\'administration, comités spécialisés, répartition des rôles et responsabilités.' },
      { icon: 'ri-clipboard-line', title: 'POLITIQUES & PROCÉDURES', desc: 'Charte éthique, code de conduite, manuel de procédures, politique de rémunération.' },
      { icon: 'ri-pie-chart-line', title: 'RÉPARTITION DU POUVOIR', desc: 'Séparation des pouvoirs, délégation, processus décisionnels et comités d\'audit.' },
      { icon: 'ri-group-line', title: 'DIVERSITÉ & INDÉPENDANCE', desc: 'Composition équilibrée du CA, profils indépendants, comités de nomination.' },
      { icon: 'ri-bar-chart-grouped-line', title: 'ÉVALUATION & PERFORMANCE', desc: 'Scorecard gouvernance, évaluation annuelle du CA, indicateurs de performance ESG.' },
    ],
    whyUs: [
      'Cadre méthodologique inspiré des standards OCDE et IFC',
      'Adaptation aux réalités des entreprises africaines',
      'Outils propriétaires d\'évaluation de maturité',
      'Accompagnement sur mesure de la conception à la mise en oeuvre',
    ],
    cta: 'AUDITEZ VOTRE GOUVERNANCE EN 48H',
    badge: 'GOUVERNANCE\nSOLIDE\nPERFORMANCE\nDURABLE',
  },
  'finance-levee-fonds': {
    title: 'LEVÉE DE FONDS &',
    subtitle: 'STRUCTURATION FINANCIÈRE',
    domains: [
      { icon: 'ri-coins-line', title: 'DIAGNOSTIC FINANCIER', desc: 'Évaluation de la santé financière, identification des leviers de création de valeur.' },
      { icon: 'ri-file-list-3-line', title: 'BUSINESS PLAN & PROSPECTUS', desc: 'Élaboration de documents professionnels pour investisseurs et bailleurs de fonds.' },
      { icon: 'ri-hand-heart-line', title: 'ACCOMPAGNEMENT INVESTISSEURS', desc: 'Due diligence, roadshows, négociation des term sheets et closing.' },
      { icon: 'ri-line-chart-line', title: 'MODÉLISATION FINANCIÈRE', desc: 'Budgets, projections, analyse de sensibilité, VAN, TRI, DSCR — prêts pour comité.' },
      { icon: 'ri-bank-line', title: 'FINANCEMENT STRUCTURÉ', desc: 'Dette, quasi-fonds propres, garanties, subventions, financement climatique.' },
    ],
    whyUs: [
      'Expertise terrain sur les marchés de capitaux africains',
      'Réseau de contacts institutionnels et investisseurs',
      'Méthodologie éprouvée avec des banques de développement',
      'Accompagnement de bout en bout jusqu\'au closing',
    ],
    cta: 'PRÉPAREZ VOTRE LEVÉE EN 90 JOURS',
    badge: 'FONDS LEVÉS\nCROISSANCE\nASSURÉE',
  },
  'conseil-strategique': {
    title: 'CONSEIL STRATÉGIQUE',
    subtitle: 'DÉFINISSEZ VOTRE TRAJECTOIRE',
    domains: [
      { icon: 'ri-compass-3-line', title: 'VISION & MISSION', desc: 'Rédaction ou révision de la vision, mission, valeurs et culture d\'entreprise.' },
      { icon: 'ri-map-2-line', title: 'PLAN STRATÉGIQUE', desc: 'Analyse stratégique, scénarios de croissance, plan d\'actions 3-5 ans.' },
      { icon: 'ri-focus-3-line', title: 'POSITIONNEMENT', desc: 'Différenciation concurrentielle, cible prioritaire, promesse de valeur.' },
      { icon: 'ri-git-merge-line', title: 'CROISSANCE & INNOVATION', desc: 'Développement de nouveaux marchés, partenariats stratégiques, M&A.' },
      { icon: 'ri-dashboard-3-line', title: 'TABLEAU DE BORD STRATÉGIQUE', desc: 'KPIs stratégiques, balanced scorecard, revue trimestrielle de performance.' },
    ],
    whyUs: [
      'Approche combinant stratégie McKinsey et agilité start-up africaine',
      'Expérience multisectorielle : finance, TIC, agriculture, énergie',
      'Outils de planification stratégique propriétaires',
      'Accompagnement exécutionnel, pas seulement des rapports',
    ],
    cta: 'LANCER VOTRE PLAN STRATÉGIQUE',
    badge: 'VISION CLAIRE\nEXÉCUTION\nRAPIDE',
  },
  'transformation-digitale': {
    title: 'TRANSFORMATION DIGITALE',
    subtitle: 'ACCELÉREZ VOTRE MATURITÉ TECHNOLOGIQUE',
    domains: [
      { icon: 'ri-scan-line', title: 'DIAGNOSTIC MATURITÉ', desc: 'Évaluation de la maturité digitale sur 5 axes : stratégie, processus, technologie, culture, gouvernance.' },
      { icon: 'ri-settings-3-line', title: 'DIGITALISATION DES PROCESSUS', desc: 'Automatisation, workflows digitaux, ERP, CRM, outils collaboratifs.' },
      { icon: 'ri-database-2-line', title: 'GOUVERNANCE DES DONNÉES', desc: 'Politique de données, sécurité, conformité RGPD/RGPD-adapté, analytics.' },
      { icon: 'ri-customer-service-line', title: 'EXPÉRIENCE CLIENT', desc: 'Parcours client digitaux, applications mobiles, omnicanalité.' },
      { icon: 'ri-rocket-line', title: 'ROADMAP DÉPLOIEMENT', desc: 'Plan de migration, budget, calendrier, KPIs, formation des équipes.' },
    ],
    whyUs: [
      'Framework de maturité digitale adapté au contexte africain',
      'Expertise technique et stratégique combinée',
      'Partenariats avec éditeurs et intégrateurs locaux',
      'Approche ROI-first : chaque investissement justifié',
    ],
    cta: 'ÉVALUEZ VOTRE MATURITÉ DIGITALE',
    badge: 'DIGITAL\nNATIVE\nPERFORMANCE\nX10',
  },
  'gestion-risques': {
    title: 'GESTION DES RISQUES',
    subtitle: 'ANTICIPEZ · MESUREZ · MAÎTRISEZ',
    domains: [
      { icon: 'ri-search-line', title: 'IDENTIFICATION DES RISQUES', desc: 'Ateliers de cartographie, risques stratégiques, opérationnels, financiers, réglementaires.' },
      { icon: 'ri-scales-3-line', title: 'ÉVALUATION & PRIORISATION', desc: 'Matrice de risque, scoring, indicateurs clés de risque (KRI), cartographie dynamique.' },
      { icon: 'ri-shield-star-line', title: 'PLAN DE TRAITEMENT', desc: 'Stratégies d\'atténuation, transfert, acceptation, plans de continuité.' },
      { icon: 'ri-alarm-warning-line', title: 'SURVEILLANCE & ALERTES', desc: 'Tableaux de bord risque, seuils d\'alerte, revue trimestrielle, reporting réglementaire.' },
      { icon: 'ri-loop-right-line', title: 'AMÉLIORATION CONTINUE', desc: 'Audit interne risques, revue annuelle, mise à jour des dispositifs, formation.' },
    ],
    whyUs: [
      'Cadre ERM (Enterprise Risk Management) conforme COSO/ISO 31000',
      'Expertise sectorielle : finance, assurances, énergie, santé',
      'Outils de cartographie et scoring propriétaires',
      'Intégration avec la conformité réglementaire',
    ],
    cta: 'AUDITEZ VOS RISQUES EN 15 MIN',
    badge: 'RISQUES\nMAÎTRISÉS\nPERFORMANCE\nOPTIMALE',
  },
  'audit-conformite': {
    title: 'AUDIT & CONTRÔLE INTERNE',
    subtitle: 'ÉVALUEZ · RECOMMANDEZ · AMÉLIOREZ',
    domains: [
      { icon: 'ri-file-search-line', title: 'AUDIT FINANCIER', desc: 'Vérification des états financiers, conformité OHADA/SYSCOHADA, revue analytique.' },
      { icon: 'ri-shield-check-line', title: 'AUDIT OPÉRATIONNEL', desc: 'Efficacité des processus, optimisation des ressources, analyse des écarts.' },
      { icon: 'ri-lock-line', title: 'AUDIT DE CONFORMITÉ', desc: 'Conformité réglementaire, BCEAO, COBAC, Banque Mondiale, IFC.' },
      { icon: 'ri-bug-line', title: 'AUDIT INFORMATIQUE', desc: 'Sécurité SI, gouvernance IT, continuité, protection des données.' },
      { icon: 'ri-file-list-3-line', title: 'AUDIT INTERNE', desc: 'Plan d\'audit annuel, missions terrain, rapports d\'audit, suivi des recommandations.' },
    ],
    whyUs: [
      'Normes internationales ISA et normes OHADA',
      'Équipe pluridisciplinaire (comptables, juristes, IT)',
      'Outils d\'audit et reporting automatisés',
      'Indépendance totale et confidentialité absolue',
    ],
    cta: 'DEMANDEZ UN AUDIT FLASH GRATUIT',
    badge: 'TRANSPARENCE\nTOTALE\nCONFIANCE\nABSOLUE',
  },
  'renforcement-capacites': {
    title: 'RENFORCEMENT DES CAPACITÉS',
    subtitle: 'FORMEZ · ACCOMPAGNEZ · PERFORMEZ',
    domains: [
      { icon: 'ri-presentation-line', title: 'FORMATIONS SUR MESURE', desc: 'Programmes adaptés à vos besoins : gouvernance, finance, conformité, leadership.' },
      { icon: 'ri-user-star-line', title: 'COACHING EXECUTIF', desc: 'Accompagnement personnalisé des dirigeants, prise de décision, gestion de crise.' },
      { icon: 'ri-team-line', title: 'MENTORING D\'ÉQUIPES', desc: 'Montée en compétences collectives, culture d\'apprentissage, knowledge sharing.' },
      { icon: 'ri-award-line', title: 'CERTIFICATIONS & DIPLÔMES', desc: 'Préparation aux certifications professionnelles, diplômes universitaires.' },
      { icon: 'ri-book-open-line', title: 'RESSOURCES PÉDAGOGIQUES', desc: 'Supports de formation, e-learning, cas pratiques, simulations.' },
    ],
    whyUs: [
      'Formateurs experts avec expérience terrain africain',
      'Pédagogie active et immersive',
      'Certificats reconnus et partenariats universitaires',
      'Impact mesurable sur la performance post-formation',
    ],
    cta: 'DÉCOUVREZ NOS PROGRAMMES DE FORMATION',
    badge: 'CAPACITÉS\nRENFORCÉES\nPERFORMANCE\nDÉCUPLE',
  },
  'communication-strategique': {
    title: 'COMMUNICATION STRATÉGIQUE',
    subtitle: 'CONSTRUISEZ VOTRE RÉPUTATION',
    domains: [
      { icon: 'ri-megaphone-line', title: 'STRATÉGIE DE MARQUE', desc: 'Positionnement, identité visuelle, charte graphique, messages clés.' },
      { icon: 'ri-global-line', title: 'RELATIONS PUBLIQUES', desc: 'Presse, influenceurs, relations médias, gestion de crise communicationnelle.' },
      { icon: 'ri-share-box-line', title: 'DIGITAL & RÉSEAUX SOCIAUX', desc: 'Stratégie social media, content marketing, community management, paid media.' },
      { icon: 'ri-user-voice-line', title: 'INFLUENCE & THOUGHT LEADERSHIP', desc: 'Articles d\'opinion, conférences, podcasts, personal branding dirigeants.' },
      { icon: 'ri-bar-chart-line', title: 'ANALYSE D\'IMAGE', desc: 'Veille réputationnelle, audits d\'image, baromètres, rapports d\'influence.' },
    ],
    whyUs: [
      'Expertise B2B et institutionnelle en Afrique francophone',
      'Réseau de contacts médias et institutionnels',
      'Approche data-driven : chaque décision chiffrée',
      'Crisis-ready : réactivité 24/7 en cas d\'alerte',
    ],
    cta: 'AUDITEZ VOTRE IMAGE DE MARQUE',
    badge: 'VOIX ENTENDUE\nMARQUE\nRECONNUE',
  },
  'ressources-humaines': {
    title: 'RESSOURCES HUMAINES',
    subtitle: 'ATTRIBUEZ · DÉVELOPPEZ · FIDÉLISEZ',
    domains: [
      { icon: 'ri-user-search-line', title: 'RECRUTEMENT & TALENT', desc: 'Sourcing, sélection, onboarding, intégration, plan de succession.' },
      { icon: 'ri-slideshow-line', title: 'POLITIQUE RH & GRH', desc: 'Règlement intérieur, classification des emplois, politique de rémunération.' },
      { icon: 'ri-line-chart-line', title: 'PERFORMANCE & ÉVALUATION', desc: 'Entretiens annuels, objectifs SMART, scorecards, plans de développement.' },
      { icon: 'ri-heart-pulse-line', title: 'ENGAGEMENT & BIEN-ÊTRE', desc: 'Enquêtes d\'engagement, QVT, programmes de bien-être, culture d\'entreprise.' },
      { icon: 'ri-git-pull-request-line', title: 'TRANSFORMATION RH', desc: 'Digitalisation RH, SIRH, analytics RH, transformation des processus.' },
    ],
    whyUs: [
      'Expertise locale et internationale des marchés du travail africains',
      'Outils d\'évaluation et de développement du talent',
      'Approche inclusive et diversité',
      'Alignement RH avec la stratégie d\'entreprise',
    ],
    cta: 'AUDITEZ VOTRE POLITIQUE RH',
    badge: 'TALENTS\nRÉVÉLÉS\nPERFORMANCE\nDÉPLOYÉE',
  },
  'diagnostic-org': {
    title: 'DIAGNOSTIC ORGANISATIONNEL',
    subtitle: 'ÉVALUEZ · IDENTIFIEZ · ACTIONNEZ',
    domains: [
      { icon: 'ri-search-2-line', title: 'ANALYSE STRUCTURELLE', desc: 'Organigramme, répartition des rôles, clarté des missions, optimisation.' },
      { icon: 'ri-git-merge-line', title: 'CARTOGRAPHIE DES PROCESSUS', desc: 'Modélisation des processus clés, identification des goulots, gains d\'efficacité.' },
      { icon: 'ri-user-settings-line', title: 'ÉVALUATION DES COMPÉTENCES', desc: 'Cartographie des compétences, écarts, plans de développement.' },
      { icon: 'ri-heart-pulse-line', title: 'DIAGNOSTIC CULTUREL', desc: 'Culture d\'entreprise, engagement, valeurs, dysfonctionnements organisationnels.' },
      { icon: 'ri-lightbulb-line', title: 'PLAN D\'ACTIONS', desc: 'Recommandations priorisées, roadmap, budgets, indicateurs de suivi.' },
    ],
    whyUs: [
      'Méthodologie éprouvée sur plus de 50 diagnostics en Afrique',
      'Outils de diagnostic propriétaires (questionnaires, entretiens, ateliers)',
      'Rapport exécutif + plan d\'actions détaillé',
      'Accompagnement à la mise en oeuvre des recommandations',
    ],
    cta: 'LANCEZ VOTRE DIAGNOSTIC EN 48H',
    badge: 'CLAIRVOYANCE\nORGANISATIONNELLE\nPERFORMANCE\nDÉBLOQUÉE',
  },
  'cfo-externalise': {
    title: 'CFO EXTERNALISÉ',
    subtitle: 'UN DG SÉNIOR POUR LE PRIX D\'UN EMPLOYÉ JUNIOR',
    domains: [
      { icon: 'ri-funds-line', title: 'PILOTAGE FINANCIER', desc: 'Budget annuel, suivi mensuel, variance analysis, réajustements.' },
      { icon: 'ri-bar-chart-grouped-line', title: 'REPORTING & TABLEAUX DE BORD', desc: 'KPIs financiers, tableaux de bord mensuels, reporting pour CA et actionnaires.' },
      { icon: 'ri-calculator-line', title: 'CONTRÔLE DE GESTION', desc: 'Analyse des coûts, rentabilité par produit/service, optimisation du BFR.' },
      { icon: 'ri-refresh-line', title: 'CASH-FLOW & TRÉSORERIE', desc: 'Prévisions de trésorerie, gestion des flux, optimisation du WCR, plan de dette.' },
      { icon: 'ri-shield-user-line', title: 'CONFORMITÉ FINANCIÈRE', desc: 'Clôture comptable, états consolidés, audit interne financier, reporting réglementaire.' },
    ],
    whyUs: [
      'Expertise multisectorielle : PME, IMF, ONG, projets',
      'Modèle flexible : temps partagé, mission ponctuelle, projet',
      'Outils de reporting et analytics avancés',
      'Réduction de 40% des coûts vs un DG interne',
    ],
    cta: 'DÉCOUVREZ NOS FORFAITS CFO',
    badge: 'FINANCES\nMAÎTRISÉES\nCROISSANCE\nSÉCURISÉE',
  },
  'etude-faisabilite': {
    title: 'ÉTUDES DE FAISABILITÉ',
    subtitle: 'TECHNIQUE · COMMERCIALE · FINANCIÈRE · ESG',
    domains: [
      { icon: 'ri-tools-line', title: 'FAISABILITÉ TECHNIQUE', desc: 'Étude technique, dimensionnement, processus, choix technologiques, plan de production.' },
      { icon: 'ri-shopping-cart-2-line', title: 'FAISABILITÉ COMMERCIALE', desc: 'Étude de marché, concurrence, positionnement, plan commercial, prévisions de vente.' },
      { icon: 'ri-coins-line', title: 'FAISABILITÉ FINANCIÈRE', desc: 'CAPEX, OPEX, modélisation 10 ans, VAN, TRI, DSCR, BFR, plan de dette, sensibilité.' },
      { icon: 'ri-leaf-line', title: 'ÉTUDE D\'IMPACT ENVIRONNEMENTAL', desc: 'PGES, étude d\'impact, conformité IFC, plan de gestion environnementale.' },
      { icon: 'ri-bar-chart-box-line', title: 'RAPPORT SYNTHÉTIQUE', desc: 'Document conforme standards BAD, BIDC, IFC, prêt pour comité de crédit.' },
    ],
    whyUs: [
      'Conformité aux standards internationaux BAD, BIDC, IFC',
      'Modélisation financière avancée et auditée',
      'Études ESG intégrées selon les Performance Standards IFC',
      'Livrable clé-en-main pour comité de crédit',
    ],
    cta: 'DEMANDEZ UNE ÉTUDE CLÉ-EN-MAIN',
    badge: 'FAISABILITÉ\nPROUVÉE\nINVESTISSEMENT\nSÉCURISÉ',
  },
  'due-diligence': {
    title: 'DUE DILIGENCE',
    subtitle: 'ANALYSEZ · VALIDEZ · DÉCIDEZ EN TOUTE SÉCURITÉ',
    domains: [
      { icon: 'ri-calculator-line', title: 'DUE DILIGENCE FINANCIÈRE', desc: 'Analyse des états financiers, quality of earnings, dette, working capital, ajustements.' },
      { icon: 'ri-scales-3-line', title: 'DUE DILIGENCE LÉGALE', desc: 'Structure juridique, contrats, litiges, conformité, propriété intellectuelle.' },
      { icon: 'ri-settings-4-line', title: 'DUE DILIGENCE TECHNIQUE', desc: 'Actifs, installations, technologies, maintenance, plans d\'investissement.' },
      { icon: 'ri-leaf-line', title: 'DUE DILIGENCE ENVIRONNEMENTALE', desc: 'Conformité ESG, permis, audits environnementaux, risques liés au climat.' },
      { icon: 'ri-file-shield-line', title: 'RAPPORT & RECOMMANDATIONS', desc: 'Rapport intégré, red flags, risques clés, négociation, plan d\'intégration.' },
    ],
    whyUs: [
      'Équipe pluridisciplinaire senior (finance, droit, technique, ESG)',
      'Indépendance totale et confidentialité absolue',
      'Méthodologie inspirée des Big Four',
      'Accompagnement jusqu\'à la négociation et au closing',
    ],
    cta: 'LANCER UNE DUE DILIGENCE',
    badge: 'TRANSPARENCE\nTOTALE\nDÉCISION\nÉCLAIRÉE',
  },
  'esg-impact': {
    title: 'ESG & IMPACT',
    subtitle: 'REPORTING · CONFORMITÉ · VALEUR',
    domains: [
      { icon: 'ri-leaf-line', title: 'STRATÉGIE ENVIRONNEMENTALE', desc: 'Bilan carbone, plan de décarbonation, économie circulaire, green finance.' },
      { icon: 'ri-heart-3-line', title: 'STRATÉGIE SOCIALE', desc: 'Diversité, inclusion, santé-sécurité, relations communautaires, droits humains.' },
      { icon: 'ri-government-line', title: 'GOUVERNANCE ESG', desc: 'Politique ESG, comité ESG, indicateurs, reporting, due diligence fournisseurs.' },
      { icon: 'ri-bar-chart-box-line', title: 'REPORTING & RATING', desc: 'Rapports de durabilité, notation ESG, alignement ODD, GRI, SASB, TCFD.' },
      { icon: 'ri-seedling-line', title: 'IMPACT MEASUREMENT', desc: 'Théorie du changement, indicateurs d\'impact, SROI, monitoring et évaluation.' },
    ],
    whyUs: [
      'Expertise reconnue en finance climatique et développement durable',
      'Conformité IFC Performance Standards et Principes ESG',
      'Outils de mesure d\'impact et reporting automatisés',
      'Accès aux financements verts et subventions climatiques',
    ],
    cta: 'AUDITEZ VOTRE MATURITÉ ESG',
    badge: 'IMPACT\nMESURÉ\nVALEUR\nCRÉÉE',
  },
  // ---- PREMIUM CONTENT ----
  'premium-audit-financier': {
    title: 'AUDIT FINANCIER',
    subtitle: 'Conformité OHADA & Transparence Totale',
    domains: [
      { icon: 'ri-file-search-line', title: 'AUDIT DES ÉTATS FINANCIERS', desc: 'Vérification conforme SYSCOHADA révisé, identification des anomalies et ajustements.' },
      { icon: 'ri-shield-check-line', title: 'CONTRÔLE INTERNE', desc: 'Évaluation des dispositifs de contrôle, cartographie des risques financiers.' },
      { icon: 'ri-bar-chart-line', title: 'ANALYSE FINANCIÈRE', desc: 'Ratios, rentabilité, trésorerie, BFR, indicateurs de performance détaillés.' },
    ],
    whyUs: [
      'Expertise des normes comptables OHADA et IFRS',
      'Méthodologie inspirée des Big Four',
      'Rapports d\'audit clairs et actionnables',
      'Indépendance et confidentialité absolues',
    ],
    cta: 'DEMANDEZ UN DIAGNOSTIC FLASH GRATUIT',
    badge: 'AUDIT\nFINANCIER\nEXPERT\nCERTIFIÉ',
  },
  'premium-audit-informatique': {
    title: 'AUDIT INFORMATIQUE',
    subtitle: 'Sécurisez vos actifs numériques',
    domains: [
      { icon: 'ri-lock-line', title: 'SÉCURITÉ DES SYSTÈMES D\'INFORMATION', desc: 'Audit de sécurité SI, tests de pénétration, conformité réglementaire.' },
      { icon: 'ri-server-line', title: 'INFRASTRUCTURE IT', desc: 'Évaluation des serveurs, réseaux, sauvegardes, plans de continuité.' },
      { icon: 'ri-shield-keyhole-line', title: 'PROTECTION DES DONNÉES', desc: 'Conformité RGPD-adapté, politique de confidentialité, gestion des accès.' },
    ],
    whyUs: [
      'Certifications internationales en cybersécurité',
      'Outils d\'audit automatisés et IA',
      'Rapports conformes aux standards ISO 27001',
      'Accompagnement post-audit et mise en conformité',
    ],
    cta: 'AUDITEZ VOTRE SI EN 48H',
    badge: 'CYBERSÉCURITÉ\nMAÎTRISÉE\nACTIFS\nPROTÉGÉS',
  },
  'premium-outils-ia': {
    title: 'OUTILS IA & REPORTING',
    subtitle: 'L\'Audit intelligent piloté par l\'IA',
    domains: [
      { icon: 'ri-brain-line', title: 'INTELLIGENCE ARTIFICIELLE', desc: 'Algorithmes de détection d\'anomalies, prédiction des risques, automatisation.' },
      { icon: 'ri-dashboard-line', title: 'DASHBOARDS EN TEMPS RÉEL', desc: 'Visualisation interactive des KPIs, indicateurs de conformité, alertes.' },
      { icon: 'ri-robot-line', title: 'AUTOMATISATION DES PROCESSUS', desc: 'RPA, workflows intelligents, réduction des tâches manuelles de 70%.' },
    ],
    whyUs: [
      'Plateformes propriétaires d\'audit assisté par IA',
      'Intégration avec vos systèmes existants',
      'Reporting temps réel et prédictif',
      'Réduction des coûts d\'audit de 40%',
    ],
    cta: 'DÉCOUVREZ L\'AUDIT 4.0',
    badge: 'IA POWERED\nAUDIT\nINTELLIGENT\nRÉSULTATS\nIMMÉDIATS',
  },
  'premium-recrutement': {
    title: 'RECRUTEMENT & ÉQUIPE',
    subtitle: 'L\'expertise pluridisciplinaire à votre service',
    domains: [
      { icon: 'ri-user-search-line', title: 'TALENTS SÉNIORS', desc: 'Consultants certifiés avec expérience terrain en Afrique et internationale.' },
      { icon: 'ri-team-line', title: 'ÉQUIPES DÉDIÉES', desc: 'Cellules pluridisciplinaires : finance, IT, droit, stratégie, RH.' },
      { icon: 'ri-award-line', title: 'EXPERTISE RECONNUE', desc: 'Certifications Big Four, universitaires et professionnelles sectorielles.' },
    ],
    whyUs: [
      'Équipe senior avec 15+ ans d\'expérience moyenne',
      'Profils multiculturels et multilingues',
      'Approche collaborative et agile',
      'Engagement qualité et satisfaction client',
    ],
    cta: 'RENCONTREZ NOS EXPERTS',
    badge: 'EXPERTS\nSÉNIORS\nMULTI\nDISCIPLINES',
  },
  // ---- NOUVEAUX CONTENUS PREMIUM 2025 ----
  'premium-levee-fonds': {
    title: 'LEVÉE DE FONDS',
    subtitle: 'Structuration Financière & Investisseurs',
    domains: [
      { icon: 'ri-coins-line', title: 'DIAGNOSTIC FINANCIER', desc: 'Évaluation de la santé financière, identification des leviers de création de valeur avant la levée.' },
      { icon: 'ri-file-list-3-line', title: 'BUSINESS PLAN & PROSPECTUS', desc: 'Documents professionnels pour investisseurs, banques de développement et fonds d\'impact.' },
      { icon: 'ri-hand-heart-line', title: 'ACCOMPAGNEMENT INVESTISSEURS', desc: 'Due diligence, roadshows, négociation des term sheets et closing structuré.' },
      { icon: 'ri-line-chart-line', title: 'MODÉLISATION FINANCIÈRE', desc: 'Projections 10 ans, VAN, TRI, DSCR, stress tests — prêts pour comité de crédit.' },
    ],
    whyUs: [
      'Expertise terrain sur les marchés de capitaux africains',
      'Réseau institutionnel : BIDC, BOAD, IFC, fonds d\'impact',
      'Méthodologie éprouvée niveau Big Four',
      'Accompagnement de bout en bout jusqu\'au closing',
    ],
    cta: 'PRÉPAREZ VOTRE LEVÉE EN 90 JOURS',
    badge: 'FONDS\nLEVÉS\nCROISSANCE\nASSURÉE',
  },
  'premium-conseil-strategique': {
    title: 'CONSEIL STRATÉGIQUE',
    subtitle: 'Définissez votre trajectoire de croissance',
    domains: [
      { icon: 'ri-compass-3-line', title: 'VISION & MISSION', desc: 'Rédaction ou révision de la vision, mission, valeurs et culture d\'entreprise.' },
      { icon: 'ri-map-2-line', title: 'PLAN STRATÉGIQUE', desc: 'Analyse stratégique, scénarios de croissance, plan d\'actions 3-5 ans avec KPIs.' },
      { icon: 'ri-focus-3-line', title: 'POSITIONNEMENT', desc: 'Différenciation concurrentielle, cible prioritaire, promesse de valeur unique.' },
      { icon: 'ri-git-merge-line', title: 'CROISSANCE & INNOVATION', desc: 'Développement de nouveaux marchés, partenariats stratégiques, M&A.' },
    ],
    whyUs: [
      'Approche combinant stratégie McKinsey et agilité africaine',
      'Expérience multisectorielle : finance, TIC, agriculture, énergie',
      'Outils de planification stratégique propriétaires',
      'Accompagnement exécutionnel, pas seulement des rapports',
    ],
    cta: 'LANCER VOTRE PLAN STRATÉGIQUE',
    badge: 'VISION\nCLAIRE\nEXÉCUTION\nRAPIDE',
  },
  'premium-transformation-digitale': {
    title: 'TRANSFORMATION DIGITALE',
    subtitle: 'Accélérez votre maturité technologique',
    domains: [
      { icon: 'ri-scan-line', title: 'DIAGNOSTIC MATURITÉ', desc: 'Évaluation sur 5 axes : stratégie, processus, technologie, culture, gouvernance.' },
      { icon: 'ri-settings-3-line', title: 'DIGITALISATION DES PROCESSUS', desc: 'Automatisation, workflows digitaux, ERP, CRM, outils collaboratifs.' },
      { icon: 'ri-database-2-line', title: 'GOUVERNANCE DES DONNÉES', desc: 'Politique de données, sécurité, conformité RGPD-adapté, analytics.' },
      { icon: 'ri-rocket-line', title: 'ROADMAP DÉPLOIEMENT', desc: 'Plan de migration, budget, calendrier, KPIs, formation des équipes.' },
    ],
    whyUs: [
      'Framework de maturité digitale adapté au contexte africain',
      'Expertise technique et stratégique combinée',
      'Approche ROI-first : chaque investissement justifié',
      'Partenariats avec éditeurs et intégrateurs locaux',
    ],
    cta: 'ÉVALUEZ VOTRE MATURITÉ DIGITALE',
    badge: 'DIGITAL\nNATIVE\nPERFORMANCE\nX10',
  },
  'premium-gestion-risques': {
    title: 'GESTION DES RISQUES',
    subtitle: 'Anticipez · Mesurez · Maîtrisez',
    domains: [
      { icon: 'ri-search-line', title: 'IDENTIFICATION DES RISQUES', desc: 'Ateliers de cartographie, risques stratégiques, opérationnels, financiers, réglementaires.' },
      { icon: 'ri-scales-3-line', title: 'ÉVALUATION & PRIORISATION', desc: 'Matrice de risque, scoring, indicateurs clés de risque (KRI), cartographie dynamique.' },
      { icon: 'ri-shield-star-line', title: 'PLAN DE TRAITEMENT', desc: 'Stratégies d\'atténuation, transfert, acceptation, plans de continuité.' },
      { icon: 'ri-alarm-warning-line', title: 'SURVEILLANCE & ALERTES', desc: 'Tableaux de bord risque, seuils d\'alerte, revue trimestrielle, reporting réglementaire.' },
    ],
    whyUs: [
      'Cadre ERM conforme COSO/ISO 31000',
      'Expertise sectorielle : finance, assurances, énergie, santé',
      'Outils de cartographie et scoring propriétaires',
      'Intégration avec la conformité réglementaire',
    ],
    cta: 'AUDITEZ VOS RISQUES EN 15 MIN',
    badge: 'RISQUES\nMAÎTRISÉS\nPERFORMANCE\nOPTIMALE',
  },
  'premium-gouvernance-org': {
    title: 'GOUVERNANCE D\'ENTREPRISE',
    subtitle: 'Structurez vos organes de décision',
    domains: [
      { icon: 'ri-building-line', title: 'ORGANES STATUTAIRES', desc: 'Conseil d\'administration, comités spécialisés, répartition des rôles et responsabilités.' },
      { icon: 'ri-clipboard-line', title: 'POLITIQUES & PROCÉDURES', desc: 'Charte éthique, code de conduite, manuel de procédures, politique de rémunération.' },
      { icon: 'ri-pie-chart-line', title: 'RÉPARTITION DU POUVOIR', desc: 'Séparation des pouvoirs, délégation, processus décisionnels et comités d\'audit.' },
      { icon: 'ri-bar-chart-grouped-line', title: 'ÉVALUATION & PERFORMANCE', desc: 'Scorecard gouvernance, évaluation annuelle du CA, indicateurs de performance ESG.' },
    ],
    whyUs: [
      'Cadre méthodologique inspiré des standards OCDE et IFC',
      'Adaptation aux réalités des entreprises africaines',
      'Outils propriétaires d\'évaluation de maturité',
      'Accompagnement sur mesure de la conception à la mise en oeuvre',
    ],
    cta: 'AUDITEZ VOTRE GOUVERNANCE EN 48H',
    badge: 'GOUVERNANCE\nSOLIDE\nPERFORMANCE\nDURABLE',
  },
  'premium-conformite-sfd-emf': {
    title: 'CONFORMITÉ RÉGLEMENTAIRE',
    subtitle: 'SFD / EMF · BCEAO · COBAC · OHADA',
    domains: [
      { icon: 'ri-government-line', title: 'GOUVERNANCE & ORGANISATION', desc: 'Mise en place des organes statutaires, politiques et procédures conformes aux exigences.' },
      { icon: 'ri-shield-check-line', title: 'CONTRÔLE INTERNE & RISQUES', desc: 'Dispositifs de contrôle interne, cartographie des risques, mesure et suivi.' },
      { icon: 'ri-file-shield-line', title: 'CONFORMITÉ LBC/FT', desc: 'Dispositif de Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme.' },
      { icon: 'ri-article-line', title: 'REPORTING & OBLIGATIONS', desc: 'États réglementaires, transparence financière, respect des délais BCEAO/COBAC.' },
    ],
    whyUs: [
      'Expertise pointue des réglementations BCEAO, UMOA, CEMAC et OHADA',
      'Expérience avérée auprès des SFD/EMF en Afrique',
      'Méthodologie éprouvée et outils adaptés aux nouvelles exigences',
      'Approche pragmatique, orientée résultats et durabilité',
    ],
    cta: 'DEMANDEZ UN DIAGNOSTIC CONFORMITÉ GRATUIT',
    badge: 'CONFORMITÉ\nAUJOURD\'HUI\nSÉCURITÉ\nDEMAIN',
  },
  'premium-due-diligence': {
    title: 'DUE DILIGENCE',
    subtitle: 'Analysez · Validez · Décidez en toute sécurité',
    domains: [
      { icon: 'ri-calculator-line', title: 'DUE DILIGENCE FINANCIÈRE', desc: 'Analyse des états financiers, quality of earnings, dette, working capital, ajustements.' },
      { icon: 'ri-scales-3-line', title: 'DUE DILIGENCE LÉGALE', desc: 'Structure juridique, contrats, litiges, conformité, propriété intellectuelle.' },
      { icon: 'ri-settings-4-line', title: 'DUE DILIGENCE TECHNIQUE', desc: 'Actifs, installations, technologies, maintenance, plans d\'investissement.' },
      { icon: 'ri-leaf-line', title: 'DUE DILIGENCE ENVIRONNEMENTALE', desc: 'Conformité ESG, permis, audits environnementaux, risques liés au climat.' },
    ],
    whyUs: [
      'Équipe pluridisciplinaire senior (finance, droit, technique, ESG)',
      'Indépendance totale et confidentialité absolue',
      'Méthodologie inspirée des Big Four',
      'Accompagnement jusqu\'à la négociation et au closing',
    ],
    cta: 'LANCER UNE DUE DILIGENCE',
    badge: 'TRANSPARENCE\nTOTALE\nDÉCISION\nÉCLAIRÉE',
  },
  'premium-esg-impact': {
    title: 'ESG & IMPACT',
    subtitle: 'Reporting · Conformité · Valeur',
    domains: [
      { icon: 'ri-leaf-line', title: 'STRATÉGIE ENVIRONNEMENTALE', desc: 'Bilan carbone, plan de décarbonation, économie circulaire, green finance.' },
      { icon: 'ri-heart-3-line', title: 'STRATÉGIE SOCIALE', desc: 'Diversité, inclusion, santé-sécurité, relations communautaires, droits humains.' },
      { icon: 'ri-government-line', title: 'GOUVERNANCE ESG', desc: 'Politique ESG, comité ESG, indicateurs, reporting, due diligence fournisseurs.' },
      { icon: 'ri-bar-chart-box-line', title: 'REPORTING & RATING', desc: 'Rapports de durabilité, notation ESG, alignement ODD, GRI, SASB, TCFD.' },
    ],
    whyUs: [
      'Expertise reconnue en finance climatique et développement durable',
      'Conformité IFC Performance Standards et Principes ESG',
      'Outils de mesure d\'impact et reporting automatisés',
      'Accès aux financements verts et subventions climatiques',
    ],
    cta: 'AUDITEZ VOTRE MATURITÉ ESG',
    badge: 'IMPACT\nMESURÉ\nVALEUR\nCRÉÉE',
  },
  'premium-agrement-imf-emf': {
    title: 'AGRÉMENT IMF / EMF',
    subtitle: 'BCEAO · COBAC · UEMOA · CEMAC',
    domains: [
      { icon: 'ri-file-shield-line', title: 'DOSSIER D\'AGRÉMENT', desc: 'Constitution du dossier complet : actionnariat, capital, gouvernance, business plan.' },
      { icon: 'ri-shield-check-line', title: 'CONFORMITÉ RÉGLEMENTAIRE', desc: 'Alignement sur les exigences BCEAO/COBAC, normes OHADA, directives sectorielles.' },
      { icon: 'ri-hand-heart-line', title: 'ACCOMPAGNEMENT INSTITUTIONNEL', desc: 'Relations avec régulateurs, réponses aux objections, suivi post-dépôt.' },
      { icon: 'ri-bar-chart-line', title: 'Taux de succès : 85%', desc: '85% de réussite au premier dépôt grâce à une méthodologie éprouvée en 5 pays.' },
    ],
    whyUs: [
      'Expertise pointue des procédures BCEAO et COBAC',
      'Accompagnement End-to-End : du cadrage à l\'obtention de l\'agrément',
      'Réseau de partenaires : CAC, notaires, juristes OHADA',
      'Taux de succès de 85% au premier dépôt',
    ],
    cta: 'LANCER VOTRE PROCEDURE D\'AGRÉMENT',
    badge: 'AGRÉMENT\nSÉCURISÉ\nOPÉRATION\nRAPIDE',
  },
};

export const TEMPLATE_IMAGES: Record<string, Record<string, string>> = {
  'premium-audit-financier': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20financial%20audit%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20stock%20market%20charts%20and%20glowing%20spreadsheet%20data%20overlays%2C%203D%20golden%20fiber%20optic%20lines%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20PwC%20Khepra%20Experts%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20studio%20lighting%2C%20premium%20luxury%20aesthetic%2C%204K%20resolution%2C%20dark%20sophisticated%20atmosphere&width=1200&height=627&seq=1001&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20financial%20audit%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20financial%20charts%20and%20data%20tables%20floating%20in%203D%20space%2C%20golden%20fiber%20optic%20light%20trails%2C%20subtle%20emerald%20green%20gradients%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20luxury%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1002&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20financial%20audit%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20stock%20charts%20and%20data%20visualization%2C%20golden%20neon%20lines%2C%20emerald%20green%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1003&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20financial%20audit%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20financial%20data%20visualization%20and%20stock%20charts%2C%20golden%20fiber%20optic%20lines%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20luxury%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1004&orientation=squarish',
  },
  'premium-audit-informatique': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20IT%20audit%20cybersecurity%20compliance%20Khepra%20Experts%2C%20deep%20black%20background%20with%20neon%20green%20server%20rack%20schematics%20and%20glowing%20digital%20padlocks%2C%20abstract%20network%20topology%20diagrams%2C%20emerald%20green%20neon%20fiber%20optic%20lines%2C%20Big%20Four%20Khepra%20Experts%20PwC%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1005&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20IT%20cybersecurity%20audit%20Khepra%20Experts%2C%20deep%20black%20background%20with%20glowing%20neon%20green%20digital%20padlocks%20and%20server%20infrastructure%20diagrams%2C%20emerald%20green%20fiber%20optic%20light%20trails%2C%20abstract%20data%20security%20visualization%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20studio%20lighting%2C%20premium%20luxury%20tech%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1006&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20IT%20audit%20cybersecurity%20Khepra%20Experts%2C%20deep%20black%20background%20with%20neon%20green%20digital%20padlocks%20and%20server%20schematics%2C%20emerald%20green%20network%20lines%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1007&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20IT%20cybersecurity%20audit%20Khepra%20Experts%2C%20deep%20black%20background%20with%20neon%20green%20digital%20security%20visualization%20and%20server%20diagrams%2C%20emerald%20green%20fiber%20optic%20lines%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1008&orientation=squarish',
  },
  'premium-outils-ia': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20AI-powered%20business%20intelligence%20reporting%20tools%20Khepra%20Experts%2C%20deep%20black%20background%20with%20futuristic%20holographic%20dashboard%20interface%2C%20emerald%20green%20and%20metallic%20gold%20data%20visualization%20charts%2C%203D%20golden%20fiber%20optic%20lines%2C%20Big%20Four%20consulting%20firm%20aesthetic%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20innovation%20atmosphere%2C%204K%20resolution&width=1200&height=627&seq=1009&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20AI%20business%20intelligence%20dashboard%20Khepra%20Experts%2C%20deep%20black%20background%20with%20emerald%20green%20holographic%20data%20visualization%20and%20golden%20glowing%20metrics%2C%20futuristic%20reporting%20interface%20floating%20in%20space%2C%20golden%20fiber%20optic%20lines%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20luxury%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1010&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20AI%20business%20intelligence%20Khepra%20Experts%2C%20deep%20black%20background%20with%20holographic%20dashboard%20and%20emerald%20green%20data%20visualization%2C%20golden%20neon%20lines%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20innovation%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1011&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20AI%20business%20intelligence%20reporting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20futuristic%20holographic%20dashboard%20and%20emerald%20green%20golden%20data%20charts%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1012&orientation=squarish',
  },
  'premium-recrutement': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20executive%20recruitment%20multidisciplinary%20team%20expertise%20Khepra%20Experts%2C%20deep%20black%20background%20with%20professional%20business%20handshake%20in%20modern%20glass%20office%2C%20blurred%20collaborative%20workspace%20silhouette%2C%20emerald%20green%20and%20metallic%20gold%20corporate%20lighting%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20photography%2C%20sleek%20atmosphere%2C%204K%20resolution&width=1200&height=627&seq=1013&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20professional%20recruitment%20team%20expertise%20Khepra%20Experts%2C%20deep%20black%20background%20with%20close-up%20business%20handshake%20in%20contemporary%20glass%20office%2C%20collaborative%20team%20workspace%20blurred%20in%20background%2C%20emerald%20green%20and%20metallic%20gold%20lighting%20accents%2C%20Big%20Four%20consulting%20aesthetic%2C%20professional%20photorealistic%20photography%2C%20sleek%20luxury%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1014&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20executive%20recruitment%20team%20Khepra%20Experts%2C%20deep%20black%20background%20with%20professional%20handshake%20in%20glass%20office%2C%20emerald%20green%20and%20gold%20corporate%20lighting%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20photography%2C%20sleek%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1015&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20professional%20recruitment%20team%20Khepra%20Experts%2C%20deep%20black%20background%20with%20business%20handshake%20in%20modern%20office%2C%20emerald%20green%20and%20metallic%20gold%20corporate%20lighting%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20photography%2C%20sleek%20luxury%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1016&orientation=squarish',
  },
  // ---- NOUVELLES IMAGES PREMIUM 2025 ----
  'premium-levee-fonds': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20investment%20fundraising%20and%20financial%20structuring%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20ascending%20bar%20charts%20and%20glowing%20financial%20growth%20curves%2C%20golden%20coins%20and%20currency%20symbols%20floating%20in%203D%20space%2C%20subtle%20emerald%20green%20light%20accents%2C%20abstract%20stock%20exchange%20visualization%2C%20Big%20Four%20PwC%20Khepra%20Experts%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20studio%20lighting%2C%20premium%20luxury%20financial%20aesthetic%2C%204K%20resolution%2C%20dark%20sophisticated%20atmosphere&width=1200&height=627&seq=1017&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20investment%20fundraising%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20ascending%20financial%20charts%20and%20glowing%20growth%20curves%2C%20golden%20coins%20floating%20vertically%2C%20emerald%20green%20subtle%20light%20accents%2C%20abstract%20capital%20markets%20visualization%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20luxury%20financial%20atmosphere%2C%20portrait%20orientation%2C%204K%20resolution&width=1080&height=1350&seq=1018&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20investment%20fundraising%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20financial%20growth%20charts%20and%20glowing%20bar%20graphs%2C%20golden%20currency%20symbols%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20financial%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1019&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20investment%20fundraising%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20metallic%20gold%20ascending%20charts%20and%20glowing%20financial%20curves%2C%20golden%20coins%20and%20symbols%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20luxury%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1020&orientation=squarish',
  },
  'premium-conseil-strategique': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20strategic%20consulting%20and%20business%20advisory%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20a%20golden%20chessboard%20and%20strategic%20chess%20pieces%20in%203D%2C%20a%20glowing%20golden%20compass%20pointing%20forward%2C%20abstract%20map%20of%20Africa%20with%20golden%20highlights%2C%20subtle%20emerald%20green%20light%20trails%2C%20Big%20Four%20McKinsey%20BCG%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20studio%20lighting%2C%20premium%20strategic%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1021&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20strategic%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20chess%20pieces%20and%20strategic%20board%20floating%20in%203D%20space%2C%20glowing%20compass%20and%20abstract%20African%20continent%20map%20with%20golden%20highlights%2C%20emerald%20green%20subtle%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20strategic%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1022&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20strategic%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20chessboard%20pieces%20and%20glowing%20compass%2C%20abstract%20African%20map%20with%20golden%20highlights%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20strategic%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1023&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20strategic%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20chess%20pieces%20and%20strategic%20board%2C%20glowing%20compass%20and%20African%20continent%20highlights%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1024&orientation=squarish',
  },
  'premium-transformation-digitale': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20digital%20transformation%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20intricate%20golden%20circuit%20board%20patterns%20and%20glowing%20digital%20matrix%20grid%2C%20futuristic%20holographic%20interface%20elements%20floating%20in%203D%2C%20emerald%20green%20neon%20fiber%20optic%20lines%2C%20abstract%20data%20flow%20visualization%2C%20Big%20Four%20Khepra%20Experts%20Accenture%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1025&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20digital%20transformation%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20circuit%20boards%20and%20glowing%20digital%20matrix%20floating%20vertically%2C%20futuristic%20holographic%20interfaces%2C%20emerald%20green%20neon%20fiber%20optic%20trails%2C%20abstract%20technology%20flow%20visualization%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1026&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20digital%20transformation%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20circuit%20patterns%20and%20glowing%20digital%20grid%2C%20holographic%20interface%20elements%2C%20emerald%20green%20neon%20lines%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1027&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20digital%20transformation%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20circuit%20boards%20and%20glowing%20digital%20matrix%2C%20futuristic%20holographic%20elements%2C%20emerald%20green%20neon%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20tech%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1028&orientation=squarish',
  },
  'premium-gestion-risques': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20enterprise%20risk%20management%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20a%20majestic%20golden%20shield%20and%20glowing%20risk%20matrix%20grid%2C%20abstract%20pressure%20gauges%20and%20alert%20indicators%20in%20gold%2C%20subtle%20emerald%20green%20warning%20light%20accents%2C%20Big%20Four%20Khepra%20Experts%20PwC%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20studio%20lighting%2C%20premium%20risk%20control%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1029&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20risk%20management%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20shield%20and%20glowing%20risk%20matrix%20floating%20vertically%2C%20abstract%20alert%20indicators%20and%20pressure%20dials%20in%20gold%2C%20emerald%20green%20subtle%20warning%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20risk%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1030&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20enterprise%20risk%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20shield%20and%20glowing%20risk%20indicators%2C%20abstract%20matrix%20and%20alert%20gauges%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1031&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20risk%20management%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20shield%20and%20glowing%20risk%20matrix%2C%20abstract%20alert%20indicators%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1032&orientation=squarish',
  },
  'premium-gouvernance-org': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20corporate%20governance%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20an%20elegant%20golden%20boardroom%20table%20and%20leather%20chairs%20in%20perspective%2C%20a%20glowing%20golden%20gavel%20and%20legal%20documents%2C%20abstract%20organizational%20chart%20in%20gold%20lines%2C%20subtle%20emerald%20green%20institutional%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20governance%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1033&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20corporate%20governance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20elegant%20golden%20boardroom%20and%20leather%20chairs%2C%20glowing%20gavel%20and%20legal%20statutes%20floating%2C%20abstract%20org%20chart%20in%20gold%2C%20emerald%20green%20institutional%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1034&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20governance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20boardroom%20table%20and%20gavel%2C%20legal%20documents%20and%20org%20chart%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1035&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20corporate%20governance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20boardroom%20and%20legal%20elements%2C%20glowing%20gavel%20and%20organizational%20charts%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1036&orientation=squarish',
  },
  'premium-conformite-sfd-emf': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20regulatory%20compliance%20SFD%20EMF%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20legal%20documents%20and%20regulatory%20certificates%20floating%2C%20a%20glowing%20golden%20balance%20of%20justice%20and%20official%20stamps%2C%20abstract%20BCEAO%20and%20banking%20symbols%2C%20subtle%20emerald%20green%20compliance%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20regulatory%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1037&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20regulatory%20compliance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20legal%20certificates%20and%20regulatory%20documents%20floating%20vertically%2C%20glowing%20balance%20of%20justice%20and%20official%20stamps%2C%20abstract%20banking%20symbols%2C%20emerald%20green%20subtle%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1038&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20regulatory%20compliance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20legal%20documents%20and%20balance%20of%20justice%2C%20official%20stamps%20and%20banking%20symbols%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1039&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20regulatory%20compliance%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20legal%20documents%20and%20justice%20balance%2C%20official%20regulatory%20stamps%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1040&orientation=squarish',
  },
  'premium-due-diligence': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern corporate LinkedIn banner for due diligence and M&A advisory firm Khepra Experts, deep black background with a large golden magnifying glass examining financial documents, glowing charts and spreadsheets in 3D, abstract audit trails and verification stamps in gold, subtle emerald green investigation light accents, Big Four Khepra Experts KPMG style, professional photorealistic textures, sleek lighting, premium M&A aesthetic, 4K resolution&width=1200&height=627&seq=1041&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20due%20diligence%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20magnifying%20glass%20and%20financial%20documents%20floating%20vertically%2C%20glowing%20spreadsheets%20and%20audit%20trails%2C%20abstract%20verification%20symbols%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1042&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20due%20diligence%20advisory%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20magnifying%20glass%20and%20financial%20charts%2C%20audit%20documents%20and%20verification%20stamps%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1043&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20due%20diligence%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20magnifying%20glass%20examining%20documents%2C%20glowing%20financial%20spreadsheets%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1044&orientation=squarish',
  },
  'premium-esg-impact': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20ESG%20impact%20and%20sustainability%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20a%20glowing%20golden%20tree%20and%20green%20leaves%20made%20of%20light%2C%20abstract%20sustainable%20Earth%20globe%20with%20golden%20continents%2C%20solar%20panels%20and%20wind%20turbines%20in%20gold%20silhouette%2C%20subtle%20emerald%20green%20environmental%20light%20accents%2C%20Big%20Four%20ESG%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20sustainability%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1045&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20ESG%20sustainability%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20glowing%20golden%20tree%20and%20green%20light%20leaves%20floating%20vertically%2C%20abstract%20Earth%20globe%20with%20golden%20continents%2C%20renewable%20energy%20symbols%2C%20emerald%20green%20environmental%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1046&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20ESG%20impact%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20tree%20and%20green%20leaves%2C%20sustainable%20Earth%20globe%20and%20renewable%20energy%20symbols%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1047&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20ESG%20sustainability%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20tree%20and%20glowing%20green%20leaves%2C%20Earth%20globe%20with%20golden%20highlights%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1048&orientation=squarish',
  },
  'premium-agrement-imf-emf': {
    linkedin: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20LinkedIn%20banner%20for%20microfinance%20institution%20licensing%20IMF%20EMF%20consulting%20firm%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20official%20approval%20stamps%20and%20licensing%20documents%20floating%20in%203D%2C%20abstract%20map%20of%20West%20and%20Central%20Africa%20with%20golden%20highlights%2C%20banking%20regulatory%20seals%20and%20authorization%20certificates%2C%20subtle%20emerald%20green%20institutional%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20regulatory%20aesthetic%2C%204K%20resolution&width=1200&height=627&seq=1049&orientation=landscape',
    story: 'https://readdy.ai/api/search-image?query=Ultra-modern%20vertical%20corporate%20banner%20for%20IMF%20EMF%20licensing%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20official%20stamps%20and%20approval%20documents%20floating%20vertically%2C%20abstract%20African%20continent%20map%20with%20golden%20highlights%2C%20regulatory%20banking%20seals%2C%20emerald%20green%20institutional%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%20portrait%20orientation%2C%204K&width=1080&height=1350&seq=1050&orientation=portrait',
    twitter: 'https://readdy.ai/api/search-image?query=Ultra-modern%20corporate%20Twitter%20banner%20for%20microfinance%20licensing%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20official%20stamps%20and%20African%20map%2C%20regulatory%20approval%20documents%20and%20banking%20seals%2C%20emerald%20green%20light%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1200&height=675&seq=1051&orientation=landscape',
    square: 'https://readdy.ai/api/search-image?query=Ultra-modern%20square%20corporate%20banner%20for%20IMF%20EMF%20licensing%20consulting%20Khepra%20Experts%2C%20deep%20black%20background%20with%20golden%20official%20stamps%20and%20African%20continent%20highlights%2C%20regulatory%20documents%20and%20banking%20seals%2C%20emerald%20green%20subtle%20accents%2C%20Big%20Four%20consulting%20style%2C%20professional%20photorealistic%20textures%2C%20sleek%20lighting%2C%20premium%20atmosphere%2C%204K%20resolution&width=1080&height=1080&seq=1052&orientation=squarish',
  },
};

export const APPROACH_STEPS = [
  { num: '1', title: 'DIAGNOSTIC', desc: 'Évaluation de votre niveau de conformité' },
  { num: '2', title: 'PLAN D\'ACTIONS', desc: 'Élaboration d\'un plan priorisé' },
  { num: '3', title: 'MISE EN CONFORMITÉ', desc: 'Mise en oeuvre des dispositifs' },
  { num: '4', title: 'FORMATION', desc: 'Renforcement des capacités' },
  { num: '5', title: 'SUIVI & AMÉLIORATION', desc: 'Suivi régulier et amélioration' },
];





