// ============================================================================
// KOS KNOWLEDGE FACTORY™ — Hub 92
// Big Four Institutional Knowledge Production System
// 12 Domaines × Taxonomies × Glossaires × FAQs × Cas Pratiques × Modèles × Scripts
// ============================================================================

export interface KnowledgeTaxonomyDomain {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subThemes: string[];
  keywords: string[];
  maturity: number;
  coverageRate: number;
}

export const KNOWLEDGE_DOMAINS: KnowledgeTaxonomyDomain[] = [
  {
    id: 'gouvernance', name: 'Gouvernance', icon: 'ri-government-line', color: 'primary',
    description: 'Gouvernance d\'entreprise, rôle du Conseil d\'Administration, comités spécialisés, indépendance des administrateurs, dispositif de contrôle interne, transparence et redevabilité.',
    subThemes: ['Rôle et composition du CA', 'Comités spécialisés (Audit, Risques, Rémunération)', 'Administrateurs indépendants', 'Évaluation du CA', 'Gouvernance des filiales', 'Relation Conseil-Direction', 'Transparence financière', 'Droits des actionnaires'],
    keywords: ['board', 'conseil', 'administrateur', 'comité', 'gouvernance', 'indépendance', 'transparence'],
    maturity: 94, coverageRate: 98,
  },
  {
    id: 'audit-interne', name: 'Audit Interne', icon: 'ri-find-replace-line', color: 'accent',
    description: 'Fonction audit interne, normes IIA/IPPF, planification des missions, techniques d\'audit, rapport d\'audit, suivi des recommandations, assurance qualité.',
    subThemes: ['Normes IIA / IPPF', 'Planification audit', 'Programme de travail', 'Techniques d\'échantillonnage', 'Rapport d\'audit', 'Suivi recommandations', 'Revue qualité', 'Audit continu'],
    keywords: ['audit', 'assurance', 'contrôle', 'recommandation', 'échantillonnage', 'mission'],
    maturity: 91, coverageRate: 95,
  },
  {
    id: 'controle-interne', name: 'Contrôle Interne', icon: 'ri-shield-line', color: 'secondary',
    description: 'Cadre COSO, environnement de contrôle, évaluation des risques, activités de contrôle, information et communication, pilotage, dispositif permanent.',
    subThemes: ['COSO 2013 / 2024', 'Environnement de contrôle', 'Évaluation des risques', 'Activités de contrôle', 'Séparation des tâches', 'Information et communication', 'Pilotage et supervision'],
    keywords: ['coso', 'contrôle', 'risque', 'séparation', 'supervision', 'environnement'],
    maturity: 89, coverageRate: 93,
  },
  {
    id: 'gestion-risques', name: 'Gestion des Risques', icon: 'ri-alert-line', color: 'primary',
    description: 'Cadre ERM COSO, ISO 31000, appétit au risque, cartographie des risques, stress tests, plans de continuité, risques émergents.',
    subThemes: ['COSO ERM 2017', 'ISO 31000', 'Appétit au risque', 'Cartographie risques', 'Matrice probabilité-impact', 'Stress tests', 'PCA/PRA', 'Risques climatiques'],
    keywords: ['risque', 'erm', 'appétit', 'cartographie', 'stress', 'continuité', 'climat'],
    maturity: 87, coverageRate: 91,
  },
  {
    id: 'conformite', name: 'Conformité', icon: 'ri-scales-3-line', color: 'accent',
    description: 'Fonction conformité, cartographie des obligations, contrôle permanent, veille réglementaire, reporting conformité, culture de conformité.',
    subThemes: ['Cartographie obligations', 'Contrôle permanent conformité', 'Veille réglementaire', 'Reporting conformité', 'Culture conformité', 'Correspondant conformité', 'Plan de remédiation'],
    keywords: ['conformité', 'compliance', 'obligation', 'veille', 'reporting', 'remédiation'],
    maturity: 92, coverageRate: 96,
  },
  {
    id: 'aml-cft', name: 'AML/CFT', icon: 'ri-police-car-line', color: 'secondary',
    description: 'Lutte anti-blanchiment et financement du terrorisme, normes GAFI, KYC/CDD, déclaration de soupçon, gel des avoirs, sanctions internationales.',
    subThemes: ['Recommandations GAFI', 'KYC / CDD', 'Approche par les risques', 'Déclaration de soupçon', 'Gel des avoirs', 'Sanctions internationales', 'Correspondant LCB/FT', 'Formation LCB/FT'],
    keywords: ['blanchiment', 'terrorisme', 'gafi', 'kyc', 'cdd', 'soupçon', 'sanction'],
    maturity: 90, coverageRate: 94,
  },
  {
    id: 'bceao', name: 'BCEAO', icon: 'ri-bank-line', color: 'primary',
    description: 'Réglementation Banque Centrale des États de l\'Afrique de l\'Ouest : instructions aux SFD, circulaires bancaires, ratio de solvabilité, dispositif prudentiel, reporting périodique, agréments.',
    subThemes: ['Instructions aux SFD', 'Circulaires bancaires', 'Ratio de solvabilité', 'Dispositif prudentiel', 'Reporting périodique', 'Agréments', 'Finance islamique', 'Protection données'],
    keywords: ['bceao', 'uemoa', 'sfd', 'instruction', 'circulaire', 'solvabilité', 'agrément'],
    maturity: 95, coverageRate: 99,
  },
  {
    id: 'cobac', name: 'COBAC', icon: 'ri-building-2-line', color: 'accent',
    description: 'Commission Bancaire de l\'Afrique Centrale : directives prudentielles CEMAC, cybersécurité bancaire, résilience opérationnelle, gouvernance, inspection, reporting.',
    subThemes: ['Directives prudentielles', 'Cybersécurité 2027', 'Résilience opérationnelle', 'Gouvernance CEMAC', 'Inspection bancaire', 'Reporting COBAC', 'LBC/FT CEMAC'],
    keywords: ['cobac', 'cemac', 'prudentiel', 'cybersécurité', 'résilience', 'inspection'],
    maturity: 91, coverageRate: 95,
  },
  {
    id: 'cima', name: 'CIMA', icon: 'ri-building-line', color: 'secondary',
    description: 'Conférence Interafricaine des Marchés d\'Assurance : code CIMA, agrément assurance, contrôle des sociétés d\'assurance, solvabilité, reporting prudentiel.',
    subThemes: ['Code CIMA', 'Agrément assurance', 'Contrôle sociétés', 'Solvabilité CIMA', 'Reporting prudentiel', 'Micro-assurance', 'Intermédiation'],
    keywords: ['cima', 'assurance', 'code', 'solvabilité', 'agrément', 'micro-assurance'],
    maturity: 78, coverageRate: 82,
  },
  {
    id: 'microfinance', name: 'Microfinance', icon: 'ri-hand-coin-line', color: 'primary',
    description: 'Secteur microfinance UEMOA/CEMAC, SFD, agréments, instructions BCEAO, gouvernance SFD, indicateurs de performance, transformation institutionnelle.',
    subThemes: ['Agrément SFD', 'Instructions BCEAO SFD', 'Gouvernance SFD', 'Indicateurs SIG', 'Reporting SFD', 'Transformation SFD', 'Refinancement SFD', 'Finance islamique SFD'],
    keywords: ['microfinance', 'sfd', 'agrément', 'sig', 'refinancement', 'transformation'],
    maturity: 88, coverageRate: 92,
  },
  {
    id: 'fintech', name: 'Fintech', icon: 'ri-smartphone-line', color: 'accent',
    description: 'Régulation fintech UEMOA/CEMAC, établissement de paiement, émetteur monnaie électronique, open banking, sandbox réglementaire, innovation financière.',
    subThemes: ['Établissement paiement', 'Monnaie électronique', 'Open Banking', 'Sandbox réglementaire', 'Crowdfunding', 'Crypto-actifs', 'Finance numérique', 'Inclusion financière'],
    keywords: ['fintech', 'paiement', 'électronique', 'open banking', 'sandbox', 'crypto'],
    maturity: 82, coverageRate: 86,
  },
  {
    id: 'esg', name: 'ESG', icon: 'ri-seedling-line', color: 'secondary',
    description: 'Environnement, Social, Gouvernance : standards ISSB, taxonomie verte, bilan carbone, stress tests climatiques, reporting ESG, devoir de vigilance, finance durable.',
    subThemes: ['ISSB S1/S2', 'Taxonomie verte', 'Bilan carbone', 'Stress tests climat', 'Reporting ESG', 'Devoir de vigilance', 'GRI Standards', 'Finance durable'],
    keywords: ['esg', 'durabilité', 'issb', 'carbone', 'climat', 'taxonomie', 'vert'],
    maturity: 81, coverageRate: 85,
  },
];

// --- GLOSSAIRE (30 entrées clés) ---
export interface GlossaryEntry {
  id: string;
  term: string;
  domainId: string;
  definition: string;
  context: string;
  relatedTerms: string[];
  sourceReference: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { id: 'GL-001', term: 'Ratio de Solvabilité', domainId: 'bceao', definition: 'Rapport entre les fonds propres nets et les risques pondérés. Minimum réglementaire fixé par la BCEAO pour les banques et SFD de l\'UEMOA.', context: 'Dispositif prudentiel Bâle II/III adapté UEMOA', relatedTerms: ['Fonds propres', 'Risques pondérés', 'Coussin de conservation'], sourceReference: 'BCEAO/DEC/2026-004' },
  { id: 'GL-002', term: 'Déclaration de Soupçon', domainId: 'aml-cft', definition: 'Obligation légale imposée aux institutions financières de signaler à la cellule nationale de traitement des informations financières toute opération suspecte de blanchiment ou de financement du terrorisme.', context: 'Obligation LCB/FT permanente', relatedTerms: ['Gel des avoirs', 'KYC', 'CENTIF'], sourceReference: 'Directive UEMOA 07/2002/CM/UEMOA' },
  { id: 'GL-003', term: 'Agrément SFD', domainId: 'microfinance', definition: 'Autorisation administrative délivrée par la BCEAO ou la COBAC permettant à une institution d\'exercer des activités de microfinance dans l\'UEMOA ou la CEMAC.', context: 'Condition préalable à toute activité SFD', relatedTerms: ['Instruction 004-2010', 'Retrait agrément', 'Modification statutaire'], sourceReference: 'Loi portant réglementation des SFD UEMOA' },
  { id: 'GL-004', term: 'COSO', domainId: 'controle-interne', definition: 'Committee of Sponsoring Organizations of the Treadway Commission. Cadre de référence international pour le contrôle interne et la gestion des risques.', context: 'Référentiel Big Four universel', relatedTerms: ['Environnement de contrôle', 'Activités de contrôle', 'ERM'], sourceReference: 'COSO Internal Control — Integrated Framework 2013' },
  { id: 'GL-005', term: 'GAFI', domainId: 'aml-cft', definition: 'Groupe d\'Action Financière. Organisme intergouvernemental qui émet les normes internationales de lutte contre le blanchiment de capitaux et le financement du terrorisme.', context: '40 Recommandations + évaluations mutuelles', relatedTerms: ['Recommandations GAFI', 'Évaluation mutuelle', 'GIABA/GABAC'], sourceReference: 'Recommandations GAFI révisées 2023' },
  { id: 'GL-006', term: 'PCA', domainId: 'gestion-risques', definition: 'Plan de Continuité d\'Activité. Ensemble de procédures documentées permettant à une organisation de maintenir ses fonctions essentielles en cas de sinistre ou de perturbation majeure.', context: 'Obligatoire pour toutes les institutions financières', relatedTerms: ['PRA', 'BIA', 'RTO/RPO'], sourceReference: 'ISO 22301' },
  { id: 'GL-007', term: 'KYC', domainId: 'aml-cft', definition: 'Know Your Customer. Processus d\'identification et de vérification de l\'identité des clients avant et pendant la relation d\'affaires.', context: 'Pilier fondamental du dispositif LCB/FT', relatedTerms: ['CDD', 'EDD', 'Profil risque client'], sourceReference: 'Recommandation 10 GAFI' },
  { id: 'GL-008', term: 'IFRS 9', domainId: 'bceao', definition: 'Norme internationale d\'information financière sur les instruments financiers. Introduit le modèle de provisionnement fondé sur les pertes de crédit attendues.', context: 'Adoptée dans l\'UEMOA pour les banques', relatedTerms: ['Pertes attendues', 'Dépréciation', 'Staging'], sourceReference: 'IFRS 9 — Instruments Financiers (IASB)' },
  { id: 'GL-009', term: 'Circulaire 01-2017', domainId: 'gouvernance', definition: 'Circulaire BCEAO fixant les règles de gouvernance applicables aux établissements de crédit et SFD de l\'UEMOA : composition des CA, comités spécialisés, indépendance des administrateurs.', context: 'Texte fondateur gouvernance bancaire UEMOA', relatedTerms: ['Comité Audit', 'Administrateur indépendant', 'Comité Risques'], sourceReference: 'BCEAO/CIRC/01/2017/CB' },
  { id: 'GL-010', term: 'ISSB', domainId: 'esg', definition: 'International Sustainability Standards Board. Organisme créé par la Fondation IFRS pour émettre des normes globales de reporting de durabilité.', context: 'Remplace progressivement les référentiels ESG fragmentés', relatedTerms: ['IFRS S1', 'IFRS S2', 'TCFD'], sourceReference: 'IFRS Foundation — ISSB (2023)' },
  { id: 'GL-011', term: 'SIG', domainId: 'microfinance', definition: 'Système d\'Information de Gestion. Ensemble des outils, processus et procédures permettant la collecte, le traitement et l\'analyse des données opérationnelles d\'une SFD.', context: 'Obligatoire pour le reporting BCEAO/COREC', relatedTerms: ['COREC', 'Indicateurs SIG', 'Portefeuille à risque'], sourceReference: 'Instruction BCEAO 018-2010' },
  { id: 'GL-012', term: 'DORA', domainId: 'cobac', definition: 'Digital Operational Resilience Act. Règlementation sur la résilience opérationnelle numérique du secteur financier, transposée dans la directive COBAC 2027.', context: 'Cadre cybersécurité CEMAC', relatedTerms: ['Tests de résilience', 'Gestion incidents', 'ICT risk'], sourceReference: 'Directive COBAC 2027/CEMAC' },
  { id: 'GL-013', term: 'ERM', domainId: 'gestion-risques', definition: 'Enterprise Risk Management. Cadre intégré de gestion des risques d\'entreprise développé par le COSO.', context: 'Standard Big Four pour la gestion globale des risques', relatedTerms: ['Appétit au risque', 'Cartographie', 'COSO Cube'], sourceReference: 'COSO ERM — Integrating with Strategy and Performance (2017)' },
  { id: 'GL-014', term: 'EDD', domainId: 'aml-cft', definition: 'Enhanced Due Diligence. Mesures de vigilance renforcées applicables aux relations d\'affaires et transactions présentant un risque élevé de blanchiment ou de financement du terrorisme.', context: 'Obligatoire pour PPE et pays à haut risque', relatedTerms: ['CDD', 'PPE', 'Risque élevé'], sourceReference: 'Recommandation 12 GAFI' },
  { id: 'GL-015', term: 'COREC', domainId: 'microfinance', definition: 'Comité de Réflexion sur la Comptabilité et le Contrôle des SFD. Organe technique chargé de la normalisation comptable et prudentielle des SFD dans l\'UEMOA.', context: 'Standardise le reporting financier des SFD', relatedTerms: ['Plan comptable SFD', 'États financiers', 'Indicateurs SIG'], sourceReference: 'Règlement COREC' },
  { id: 'GL-016', term: 'OHADA', domainId: 'gouvernance', definition: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires. Produit des Actes Uniformes applicables dans 17 États africains.', context: 'Cadre juridique unifié pour les sociétés commerciales', relatedTerms: ['AUSC-GIE', 'Acte Uniforme', 'RCCM'], sourceReference: 'Traité OHADA révisé 2008' },
  { id: 'GL-017', term: 'Sandbox Réglementaire', domainId: 'fintech', definition: 'Cadre réglementaire d\'expérimentation permettant aux fintechs de tester des produits et services innovants sous supervision allégée avant obtention d\'un agrément complet.', context: 'Innovation financière encadrée', relatedTerms: ['Innovation hub', 'Agrément progressif', 'Testing License'], sourceReference: 'Instruction BCEAO Fintech 2026' },
  { id: 'GL-018', term: 'BIA', domainId: 'gestion-risques', definition: 'Business Impact Analysis. Analyse d\'impact sur l\'activité qui identifie les fonctions critiques et évalue les conséquences d\'une interruption.', context: 'Préalable au PCA', relatedTerms: ['PCA', 'RTO', 'RPO', 'Fonctions critiques'], sourceReference: 'ISO 22301' },
  { id: 'GL-019', term: 'Comité d\'Audit', domainId: 'gouvernance', definition: 'Comité spécialisé du Conseil d\'Administration chargé du suivi du processus d\'élaboration de l\'information financière, de l\'efficacité des systèmes de contrôle interne et de l\'audit.', context: 'Obligatoire pour banques et SFD UEMOA/CEMAC', relatedTerms: ['Comité Risques', 'Comité Rémunération', 'CA'], sourceReference: 'Circulaire BCEAO 01-2017 Annexe 1' },
  { id: 'GL-020', term: 'Instruction 004-2010', domainId: 'microfinance', definition: 'Instruction BCEAO fixant les conditions et modalités de retrait d\'agrément des SFD dans l\'UEMOA.', context: 'Sanction suprême du régulateur', relatedTerms: ['Agrément', 'Liquidation', 'Radiation'], sourceReference: 'BCEAO/INST/004/2010' },
  { id: 'GL-021', term: 'Dispositif Prudentiel', domainId: 'bceao', definition: 'Ensemble des règles édictées par le régulateur bancaire pour garantir la solvabilité, la liquidité et la solidité financière des établissements assujettis.', context: 'Pilier fondamental de la supervision bancaire', relatedTerms: ['Ratio solvabilité', 'Ratio liquidité', 'Grands risques'], sourceReference: 'Règlement BCEAO dispositif prudentiel' },
  { id: 'GL-022', term: 'PPE', domainId: 'aml-cft', definition: 'Personne Politiquement Exposée. Individu exerçant ou ayant exercé des fonctions publiques importantes, soumis à des mesures de vigilance renforcées.', context: 'LBC/FT — Risque accru de corruption', relatedTerms: ['EDD', 'Proche PPE', 'Vigilance renforcée'], sourceReference: 'Recommandation 12 GAFI' },
  { id: 'GL-023', term: 'SFD', domainId: 'microfinance', definition: 'Système Financier Décentralisé. Institution de microfinance régie par la loi portant réglementation des SFD dans l\'UEMOA et les textes subséquents de la BCEAO.', context: 'Acteur clé de l\'inclusion financière', relatedTerms: ['Microfinance', 'Agrément', 'BCEAO'], sourceReference: 'Loi SFD UEMOA' },
  { id: 'GL-024', term: 'BEPS', domainId: 'conformite', definition: 'Base Erosion and Profit Shifting. Cadre de l\'OCDE visant à lutter contre l\'érosion de la base d\'imposition et le transfert de bénéfices.', context: 'Enjeu majeur prix de transfert Afrique', relatedTerms: ['Prix de transfert', 'Substance économique', 'Déclaration pays par pays'], sourceReference: 'OCDE BEPS Actions 1-15' },
  { id: 'GL-025', term: 'GRI', domainId: 'esg', definition: 'Global Reporting Initiative. Organisme international de normalisation pour le reporting de développement durable.', context: 'Standard ESG le plus utilisé mondialement', relatedTerms: ['ISSB', 'SASB', 'TCFD', 'Reporting ESG'], sourceReference: 'GRI Standards 2021' },
  { id: 'GL-026', term: 'RTO / RPO', domainId: 'gestion-risques', definition: 'Recovery Time Objective (durée maximale d\'interruption admissible) et Recovery Point Objective (perte de données maximale admissible).', context: 'Paramètres fondamentaux du PCA', relatedTerms: ['PCA', 'BIA', 'Continuité'], sourceReference: 'ISO 22301 / BCI Good Practice Guidelines' },
  { id: 'GL-027', term: 'Open Banking', domainId: 'fintech', definition: 'Système bancaire ouvert permettant à des prestataires tiers d\'accéder aux données bancaires des clients via des API standardisées, avec leur consentement.', context: 'Transformation numérique du secteur financier', relatedTerms: ['API', 'Consentement', 'PSD2', 'Fintech'], sourceReference: 'Cadre Open Banking UEMOA (en développement)' },
  { id: 'GL-028', term: 'Comité ALCO', domainId: 'gouvernance', definition: 'Asset Liability Committee. Comité de gestion actif-passif chargé de piloter les risques de bilan : taux, liquidité, change.', context: 'Obligatoire pour les banques', relatedTerms: ['ALM', 'Gestion taux', 'Liquidité'], sourceReference: 'Dispositif prudentiel BCEAO' },
  { id: 'GL-029', term: 'CENTIF', domainId: 'aml-cft', definition: 'Cellule Nationale de Traitement des Informations Financières. Organe national chargé de recevoir et analyser les déclarations de soupçon.', context: 'Maillon central du dispositif LCB/FT national', relatedTerms: ['Déclaration soupçon', 'Gel avoirs', 'GAFI'], sourceReference: 'Directive UEMOA 07/2002/CM/UEMOA' },
  { id: 'GL-030', term: 'TCFD', domainId: 'esg', definition: 'Task Force on Climate-related Financial Disclosures. Groupe de travail sur la publication d\'informations financières relatives au climat.', context: 'Remplacée progressivement par l\'ISSB (IFRS S2)', relatedTerms: ['ISSB', 'IFRS S2', 'Risques climatiques'], sourceReference: 'TCFD Recommendations 2017' },
];

// --- FAQ (20 questions clés) ---
export interface FAQEntry {
  id: string;
  domainId: string;
  question: string;
  answer: string;
  tags: string[];
  difficulty: 'débutant' | 'intermédiaire' | 'expert';
  lastUpdated: string;
}

export const FAQ_ENTRIES: FAQEntry[] = [
  { id: 'FAQ-001', domainId: 'bceao', question: 'Quel est le ratio de solvabilité minimum exigé par la BCEAO pour les banques UEMOA ?', answer: 'Le ratio de solvabilité minimum est de 9,5% pour les banques, incluant un coussin de conservation de 2,5%. La réforme 2026 introduit des exigences supplémentaires pour les banques systémiques (jusqu\'à 12%). Pour les SFD, le ratio minimum dépend de la catégorie.', tags: ['ratio', 'solvabilité', 'fonds propres'], difficulty: 'débutant', lastUpdated: '2026-06-20' },
  { id: 'FAQ-002', domainId: 'gouvernance', question: 'Combien de comités spécialisés sont exigés par la circulaire BCEAO 01-2017 ?', answer: 'La circulaire exige au minimum trois comités spécialisés : le Comité d\'Audit, le Comité des Risques et le Comité de Rémunération. Un Comité de Nominations est fortement recommandé pour les établissements systémiques.', tags: ['comité', 'audit', 'risques', 'rémunération'], difficulty: 'débutant', lastUpdated: '2026-06-22' },
  { id: 'FAQ-003', domainId: 'aml-cft', question: 'Quelle est la différence entre CDD et EDD ?', answer: 'La CDD (Customer Due Diligence) est la vigilance standard appliquée à tous les clients. L\'EDD (Enhanced Due Diligence) est la vigilance renforcée pour les clients à haut risque — PPE, pays à haut risque, transactions complexes — incluant des vérifications supplémentaires sur l\'origine des fonds et le suivi renforcé.', tags: ['cdd', 'edd', 'kyc', 'vigilance'], difficulty: 'intermédiaire', lastUpdated: '2026-06-18' },
  { id: 'FAQ-004', domainId: 'esg', question: 'Les banques africaines sont-elles concernées par les standards ISSB ?', answer: 'Oui. L\'ISSB (IFRS S1 et S2) s\'applique progressivement à toutes les entités d\'intérêt public, y compris les banques africaines. La BCEAO et la COBAC ont annoncé des feuilles de route d\'adoption pour 2027-2028. Un reporting pilote est recommandé dès 2026.', tags: ['issb', 'reporting', 'durabilité', 'climat'], difficulty: 'intermédiaire', lastUpdated: '2026-06-15' },
  { id: 'FAQ-005', domainId: 'microfinance', question: 'Quelles sont les catégories de SFD selon la réglementation UEMOA ?', answer: 'Trois catégories : SFD de catégorie 1 (collecte d\'épargne et octroi de crédit aux membres), catégorie 2 (octroi de crédit sans collecte d\'épargne), catégorie 3 (collecte d\'épargne et octroi de crédit au public). Chaque catégorie a des exigences de capital minimum distinctes.', tags: ['sfd', 'catégorie', 'agrément', 'capital'], difficulty: 'débutant', lastUpdated: '2026-06-21' },
  { id: 'FAQ-006', domainId: 'controle-interne', question: 'Quels sont les 5 composants du COSO ?', answer: 'Les 5 composants sont : 1) Environnement de contrôle, 2) Évaluation des risques, 3) Activités de contrôle, 4) Information et communication, 5) Pilotage. Chaque composant se décline en 17 principes dans le COSO 2013.', tags: ['coso', 'composants', 'principes'], difficulty: 'débutant', lastUpdated: '2026-06-10' },
  { id: 'FAQ-007', domainId: 'cobac', question: 'Quand la directive COBAC cybersécurité 2027 entre-t-elle en vigueur ?', answer: 'La directive COBAC sur la cybersécurité bancaire a été adoptée et entrera en vigueur le 1er janvier 2027. Elle impose des tests de résilience annuels, un cadre de gestion des incidents, et une cartographie des risques ICT pour tous les établissements assujettis.', tags: ['cybersécurité', 'dora', 'résilience', 'ict'], difficulty: 'expert', lastUpdated: '2026-06-17' },
  { id: 'FAQ-008', domainId: 'audit-interne', question: 'Quelle est la fréquence minimale du plan d\'audit interne basé sur les risques ?', answer: 'Le plan d\'audit interne doit être établi annuellement et révisé trimestriellement. Il doit couvrir l\'ensemble du périmètre d\'audit sur un cycle de 3 à 5 ans maximum, avec une priorisation basée sur la cartographie des risques.', tags: ['plan', 'fréquence', 'risques', 'cycle'], difficulty: 'intermédiaire', lastUpdated: '2026-06-14' },
  { id: 'FAQ-009', domainId: 'fintech', question: 'Comment une fintech peut-elle opérer légalement dans l\'UEMOA ?', answer: 'Une fintech peut opérer via : 1) Un agrément d\'établissement de paiement, 2) Un agrément d\'émetteur de monnaie électronique, 3) Un partenariat avec une banque agréée, 4) La sandbox réglementaire BCEAO pour l\'expérimentation. Chaque voie a des exigences de capital et opérationnelles distinctes.', tags: ['agrément', 'paiement', 'monnaie électronique', 'sandbox'], difficulty: 'expert', lastUpdated: '2026-06-19' },
  { id: 'FAQ-010', domainId: 'gestion-risques', question: 'Qu\'est-ce que l\'appétit au risque et comment le définir ?', answer: 'L\'appétit au risque est le niveau global de risque qu\'une organisation accepte de prendre dans la poursuite de ses objectifs stratégiques. Il se décline en limites quantitatives (ratios, pertes max, VaR) et qualitatives (types de risques acceptés/exclus). Il doit être approuvé par le Conseil d\'Administration.', tags: ['appétit', 'tolérance', 'limites', 'conseil'], difficulty: 'intermédiaire', lastUpdated: '2026-06-16' },
  { id: 'FAQ-011', domainId: 'conformite', question: 'Comment organiser une fonction conformité efficace dans une banque ?', answer: 'La fonction conformité doit : 1) Être indépendante (rattachement direct au DG ou CA), 2) Disposer de ressources suffisantes, 3) Maintenir une cartographie des obligations, 4) Produire un plan de contrôle annuel, 5) Rendre compte trimestriellement au Comité d\'Audit, 6) Animer la culture conformité par des formations régulières.', tags: ['organisation', 'indépendance', 'cartographie', 'plan'], difficulty: 'intermédiaire', lastUpdated: '2026-06-12' },
  { id: 'FAQ-012', domainId: 'bceao', question: 'Quel est le processus d\'agrément d\'une SFD dans l\'UEMOA ?', answer: 'Le processus comprend : 1) Dépôt du dossier (statuts, business plan 5 ans, étude de marché, CV dirigeants, manuel de procédures), 2) Instruction par la BCEAO (90 jours), 3) Avis de la Commission Bancaire, 4) Délivrance de l\'agrément par arrêté du Ministre des Finances. Le capital minimum varie selon la catégorie.', tags: ['agrément', 'sfd', 'processus', 'dossier'], difficulty: 'intermédiaire', lastUpdated: '2026-06-23' },
  { id: 'FAQ-013', domainId: 'esg', question: 'Comment réaliser un bilan carbone pour une institution financière ?', answer: 'Le bilan carbone couvre 3 scopes : Scope 1 (émissions directes), Scope 2 (émissions indirectes liées à l\'énergie), Scope 3 (émissions de la chaîne de valeur — dont le portefeuille de financement, critique pour les banques). La méthodologie PCAF (Partnership for Carbon Accounting Financials) est la référence pour le secteur financier.', tags: ['carbone', 'scope', 'pcaf', 'portefeuille'], difficulty: 'expert', lastUpdated: '2026-06-13' },
  { id: 'FAQ-014', domainId: 'gouvernance', question: 'Qu\'est-ce qu\'un administrateur indépendant selon les critères BCEAO ?', answer: 'Un administrateur indépendant n\'a pas de relation d\'affaires, familiale ou salariale avec l\'établissement, ses dirigeants ou ses actionnaires de contrôle. Il ne doit pas avoir été auditeur ou conseil de l\'établissement dans les 3 dernières années. Son mandat est limité à 12 ans cumulés maximum.', tags: ['indépendance', 'administrateur', 'critères'], difficulty: 'débutant', lastUpdated: '2026-06-22' },
  { id: 'FAQ-015', domainId: 'aml-cft', question: 'Quand faut-il effectuer une déclaration de soupçon ?', answer: 'Une déclaration de soupçon doit être effectuée dès qu\'il existe un soupçon de blanchiment ou de financement du terrorisme, même si le montant est faible. Le délai est "sans délai" — dès que le soupçon est formé. La tentative de transaction suffit à déclencher l\'obligation, même si la transaction n\'est pas exécutée.', tags: ['déclaration', 'soupçon', 'délai', 'obligation'], difficulty: 'intermédiaire', lastUpdated: '2026-06-18' },
  { id: 'FAQ-016', domainId: 'cima', question: 'Quel est le capital minimum pour une société d\'assurance dans l\'espace CIMA ?', answer: 'Le capital minimum est fixé à 1 milliard FCFA pour les sociétés d\'assurance non-vie, 2 milliards FCFA pour les sociétés d\'assurance vie, et 3 milliards FCFA pour les sociétés mixtes (vie et non-vie). Des exigences de marge de solvabilité s\'ajoutent au capital minimum.', tags: ['capital', 'assurance', 'solvabilité', 'agrément'], difficulty: 'débutant', lastUpdated: '2026-06-20' },
  { id: 'FAQ-017', domainId: 'conformite', question: 'Comment mettre en place une cartographie des obligations réglementaires ?', answer: 'La cartographie se construit en 5 étapes : 1) Recensement exhaustif des textes applicables (BCEAO/COBAC/OHADA/national), 2) Extraction des obligations individuelles, 3) Rattachement aux processus métier, 4) Évaluation du niveau de conformité (conforme/non conforme/partiel), 5) Définition du plan de remédiation avec priorisation par criticité.', tags: ['cartographie', 'obligations', 'méthodologie', 'remédiation'], difficulty: 'expert', lastUpdated: '2026-06-19' },
  { id: 'FAQ-018', domainId: 'microfinance', question: 'Quels sont les indicateurs SIG obligatoires pour une SFD UEMOA ?', answer: 'Les indicateurs SIG incluent : PAR30 (Portefeuille à Risque > 30 jours, max 5%), ratio de couverture des risques, rendement des actifs, autosuffisance opérationnelle, ratio de capitalisation, ratio de liquidité, et taux de pénétration. Le reporting est mensuel pour les SFD de catégorie 3.', tags: ['sig', 'indicateurs', 'par30', 'reporting'], difficulty: 'intermédiaire', lastUpdated: '2026-06-21' },
  { id: 'FAQ-019', domainId: 'gestion-risques', question: 'Comment réaliser un stress test de liquidité pour une banque ?', answer: 'Le stress test de liquidité simule des scénarios de crise (idiosyncratique, systémique, combiné) sur un horizon de 30 jours à 1 an. Il projette les flux de trésorerie contractuels et comportementaux, identifie les gaps de liquidité et teste l\'adéquation du coussin d\'actifs liquides (LCR/NSFR).', tags: ['stress', 'liquidité', 'lcr', 'nsfr', 'scénarios'], difficulty: 'expert', lastUpdated: '2026-06-16' },
  { id: 'FAQ-020', domainId: 'fintech', question: 'Quelle est la différence entre un établissement de paiement et un émetteur de monnaie électronique ?', answer: 'L\'établissement de paiement exécute des opérations de paiement sans gérer de comptes de dépôt (transferts, paiement mobile, cartes prépayées). L\'émetteur de monnaie électronique crée de la monnaie électronique en contrepartie de fonds reçus, et peut la distribuer via des agents. Les exigences de capital sont plus élevées pour l\'émetteur.', tags: ['paiement', 'monnaie électronique', 'agrément', 'capital'], difficulty: 'expert', lastUpdated: '2026-06-17' },
];

// --- CAS PRATIQUES ---
export interface CaseStudy {
  id: string;
  domainId: string;
  title: string;
  sector: string;
  context: string;
  problem: string;
  solution: string;
  results: string;
  keyLearnings: string[];
  tags: string[];
  complexity: 'simple' | 'moyen' | 'complexe';
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'CS-001', domainId: 'gouvernance', title: 'Restructuration du Conseil d\'Administration d\'une Banque UEMOA', sector: 'Banque',
    context: 'Banque commerciale de taille moyenne dans l\'UEMOA, 3 actionnaires de référence, CA de 9 membres sans administrateurs indépendants.', problem: 'Non-conformité avec la Circulaire BCEAO 01-2017 : absence de comités spécialisés, 0 administrateur indépendant, cumul Président-DG.', solution: 'Séparation des fonctions Président/DG, nomination de 3 administrateurs indépendants, création des 3 comités spécialisés réglementaires, adoption d\'un règlement intérieur du CA et d\'une charte de l\'administrateur.', results: 'Conformité réglementaire atteinte en 4 mois. Note gouvernance passée de 38/100 à 82/100 (auto-évaluation COBAC). 0 réserve des commissaires aux comptes sur la gouvernance au prochain exercice.', keyLearnings: ['L\'accompagnement des actionnaires est clé pour accepter l\'indépendance', 'Un plan de transition sur 12 mois est préférable à un big-bang', 'La formation des administrateurs est indispensable'], tags: ['ca', 'indépendance', 'comités', 'conformité'], complexity: 'complexe',
  },
  {
    id: 'CS-002', domainId: 'aml-cft', title: 'Remédiation LCB/FT post-évaluation GAFI — Banque CEMAC', sector: 'Banque',
    context: 'Banque universelle dans la zone CEMAC, évaluation mutuelle GAFI/GABAC ayant relevé 14 insuffisances majeures.', problem: 'Dispositif KYC incomplet, absence de classification des risques clients, pas de cartographie LCB/FT, logiciel de filtrage obsolète, formation quasi inexistante.', solution: 'Refonte complète du dispositif : cartographie LCB/FT, nouvelle politique KYC/CDD/EDD, acquisition d\'un outil de filtrage sanctions, plan de formation 100% collaborateurs, désignation d\'un correspondant LCB/FT dédié, audit externe trimestriel.', results: '12/14 insuffisances résolues en 8 mois. Gel de 3 avoirs suspects. Note conformité COBAC passée de 42 à 78/100. Levée partielle des mesures de surveillance renforcée.', keyLearnings: ['La qualité des données clients est le prérequis absolu', 'Un correspondant LCB/FT à temps plein est indispensable pour une banque > 50 employés', 'L\'outil de filtrage doit être mis à jour en temps réel'], tags: ['lcb/ft', 'gafi', 'kyc', 'remédiation'], complexity: 'complexe',
  },
  {
    id: 'CS-003', domainId: 'microfinance', title: 'Transformation d\'une Coopec en SFD de Catégorie 3', sector: 'Microfinance',
    context: 'Coopérative d\'épargne et de crédit dans l\'UEMOA, 15 000 membres, souhaitant s\'ouvrir au public et obtenir l\'agrément catégorie 3.', problem: 'Capital insuffisant, gouvernance coopérative incompatible avec les exigences SFD, système d\'information non conforme, absence de manuel de procédures.', solution: 'Augmentation de capital via transformation en société coopérative avec investisseurs, recrutement DG expérimenté, implémentation d\'un core banking system certifié, rédaction complète des manuels de procédures (crédit, épargne, LCB/FT, contrôle interne).', results: 'Agrément obtenu en 14 mois. Portefeuille multiplié par 2,3 en 18 mois post-agrément. PAR30 maintenu sous 3%. Notation institutionnelle : passage de "faible" à "satisfaisant".', keyLearnings: ['La transformation institutionnelle prend 12-18 mois minimum', 'L\'investissement SIG doit représenter 15-20% du budget transformation', 'L\'accompagnement des membres historiques est crucial pour l\'acceptation'], tags: ['sfd', 'transformation', 'agrément', 'coopec'], complexity: 'complexe',
  },
  {
    id: 'CS-004', domainId: 'controle-interne', title: 'Implémentation COSO 2013 dans un Groupe Bancaire Panafricain', sector: 'Banque',
    context: 'Groupe bancaire présent dans 8 pays UEMOA/CEMAC, exigence de la maison-mère d\'adopter COSO 2013 sur tout le périmètre.', problem: 'Disparité des pratiques entre filiales, absence de cartographie des risques groupe, contrôles manuels et non documentés, pas de fonction audit interne dans 3 filiales.', solution: 'Déploiement progressif : cartographie des risques groupe, auto-évaluation COSO par filiale, création des fonctions audit interne manquantes, implémentation d\'un outil GRC groupe, formation 100% managers, certification externe par un Big Four.', results: 'Conformité COSO atteinte dans toutes les filiales en 18 mois. 847 contrôles documentés et testés. Matrice risques groupe mise à jour trimestriellement. Certification sans réserve.', keyLearnings: ['Le sponsorship du CEO Groupe est le facteur clé de succès', 'L\'outil GRC doit être déployé avant les processus', 'Prévoir 18-24 mois pour un groupe multi-pays plutôt que 12'], tags: ['coso', 'contrôle', 'grc', 'groupe'], complexity: 'complexe',
  },
  {
    id: 'CS-005', domainId: 'esg', title: 'Premier Rapport ESG ISSB — Banque UEMOA', sector: 'Banque',
    context: 'Banque cotée à la BRVM, exigence des investisseurs internationaux de publier un rapport ESG aligné ISSB.', problem: 'Aucune donnée ESG historisée, pas de bilan carbone, équipe ESG inexistante, méthodologie ISSB nouvelle et complexe pour le contexte africain.', solution: 'Création d\'une direction ESG, réalisation du bilan carbone (scopes 1, 2, 3), implémentation d\'un système de collecte de données ESG, formation des métiers, rédaction du rapport pilote ISSB avec revue externe.', results: 'Premier rapport ESG ISSB-compliant de la zone UEMOA. Score CDP : C (première notation). 3 investisseurs internationaux entrés au capital. Prime de réputation significative.', keyLearnings: ['Le bilan carbone scope 3 (portefeuille de prêts) est le plus complexe', 'Commencer par un pilote partiel avant le rapport complet', 'La collecte de données doit être intégrée au core banking'], tags: ['esg', 'issb', 'carbone', 'reporting'], complexity: 'complexe',
  },
  {
    id: 'CS-006', domainId: 'conformite', title: 'Plan de Remédiation Conformité — SFD sous injonction BCEAO', sector: 'Microfinance',
    context: 'SFD de catégorie 3 sous injonction BCEAO suite à une inspection ayant révélé 23 non-conformités.', problem: 'Cartographie des obligations inexistante, LCB/FT non implémenté, ratio de solvabilité sous le minimum, reporting BCEAO erroné, gouvernance défaillante.', solution: 'Plan de remédiation priorisé en 3 phases : urgence (solvabilité, LCB/FT), consolidation (gouvernance, contrôle interne), optimisation (reporting, formation). Renforcement des fonds propres, recrutement d\'un responsable conformité, refonte du dispositif LCB/FT.', results: '23/23 non-conformités résolues en 12 mois. Ratio solvabilité remonté à 12%. Nouvelle inspection : 0 réserve majeure. Levée totale de l\'injonction BCEAO.', keyLearnings: ['La priorisation par criticité est impérative (solvabilité > LCB/FT > gouvernance)', 'Un plan de remédiation crédible rassure le régulateur', 'L\'accompagnement externe est nécessaire pour les SFD sans fonction conformité'], tags: ['conformité', 'remédiation', 'injonction', 'bceao'], complexity: 'très complexe',
  },
];

// --- MODÈLES & TEMPLATES ---
export interface TemplateItem {
  id: string;
  domainId: string;
  title: string;
  type: 'politique' | 'procédure' | 'charte' | 'rapport' | 'matrice' | 'plan' | 'manuel' | 'formulaire';
  description: string;
  sections: string[];
  pages: number;
  format: 'Word' | 'Excel' | 'PowerPoint' | 'PDF';
  usageCount: number;
}

export const TEMPLATES: TemplateItem[] = [
  { id: 'TPL-001', domainId: 'gouvernance', title: 'Règlement Intérieur du Conseil d\'Administration', type: 'politique', description: 'Modèle complet de règlement intérieur conforme à la circulaire BCEAO 01-2017 : composition, rôles, réunions, comités, évaluation, confidentialité.', sections: ['Composition du CA', 'Attributions', 'Fonctionnement des réunions', 'Comités spécialisés', 'Évaluation du CA', 'Devoirs et confidentialité', 'Dispositions finales'], pages: 28, format: 'Word', usageCount: 234 },
  { id: 'TPL-002', domainId: 'conformite', title: 'Cartographie des Obligations Réglementaires', type: 'matrice', description: 'Matrice Excel de cartographie complète : textes applicables, obligations individuelles, processus impactés, évaluation conformité, plans d\'action.', sections: ['Textes applicables', 'Obligations', 'Processus métier', 'Évaluation conformité', 'Plans d\'action'], pages: 12, format: 'Excel', usageCount: 187 },
  { id: 'TPL-003', domainId: 'gestion-risques', title: 'Matrice de Cartographie des Risques', type: 'matrice', description: 'Matrice risques avec scoring probabilité × impact, appétit au risque, contrôles atténuants, risque résiduel, plans d\'action.', sections: ['Identification risques', 'Scoring brut', 'Contrôles existants', 'Risque résiduel', 'Plans d\'atténuation'], pages: 18, format: 'Excel', usageCount: 312 },
  { id: 'TPL-004', domainId: 'audit-interne', title: 'Programme de Travail d\'Audit Interne', type: 'plan', description: 'Template de programme de travail annuel basé sur les risques, incluant l\'univers d\'audit, la priorisation, le calendrier et le budget.', sections: ['Univers d\'audit', 'Évaluation risques', 'Priorisation missions', 'Calendrier annuel', 'Budget et ressources'], pages: 22, format: 'Word', usageCount: 156 },
  { id: 'TPL-005', domainId: 'aml-cft', title: 'Politique LCB/FT', type: 'politique', description: 'Politique cadre de lutte anti-blanchiment conforme aux recommandations GAFI et exigences BCEAO/COBAC.', sections: ['Gouvernance LCB/FT', 'KYC/CDD/EDD', 'Surveillance transactions', 'Déclaration soupçon', 'Formation', 'Contrôle interne LCB/FT'], pages: 45, format: 'Word', usageCount: 278 },
  { id: 'TPL-006', domainId: 'microfinance', title: 'Dossier de Demande d\'Agrément SFD', type: 'formulaire', description: 'Checklist et templates pour constitution du dossier complet d\'agrément SFD auprès de la BCEAO.', sections: ['Statuts', 'Business plan 5 ans', 'Étude de marché', 'CV dirigeants', 'Manuel procédures', 'Projections financières'], pages: 85, format: 'Word', usageCount: 94 },
  { id: 'TPL-007', domainId: 'controle-interne', title: 'Auto-évaluation COSO 2013', type: 'matrice', description: 'Grille d\'auto-évaluation COSO avec les 17 principes, notation maturité, preuves documentaires, plans d\'amélioration.', sections: ['Environnement contrôle', 'Évaluation risques', 'Activités contrôle', 'Information communication', 'Pilotage'], pages: 35, format: 'Excel', usageCount: 203 },
  { id: 'TPL-008', domainId: 'bceao', title: 'Rapport de Conformité Trimestriel BCEAO', type: 'rapport', description: 'Template de rapport trimestriel couvrant tous les domaines de conformité exigés par la BCEAO.', sections: ['Synthèse exécutive', 'Conformité prudentielle', 'LCB/FT', 'Gouvernance', 'Indicateurs clés', 'Plans d\'action'], pages: 32, format: 'Word', usageCount: 145 },
  { id: 'TPL-009', domainId: 'esg', title: 'Rapport ESG Pilote ISSB', type: 'rapport', description: 'Structure de rapport ESG conforme IFRS S1/S2 avec intégration des spécificités africaines.', sections: ['Gouvernance ESG', 'Stratégie et risques', 'Indicateurs ISSB S2', 'Bilan carbone', 'Plan transition', 'Annexes PCAF'], pages: 48, format: 'Word', usageCount: 67 },
  { id: 'TPL-010', domainId: 'cobac', title: 'Plan de Continuité d\'Activité — Banque CEMAC', type: 'plan', description: 'Template PCA conforme aux exigences COBAC : BIA, stratégie de continuité, plans de repli, tests, maintenance.', sections: ['BIA', 'Stratégie continuité', 'Plans de repli', 'Plan de crise', 'Tests et exercices', 'Maintenance'], pages: 52, format: 'Word', usageCount: 112 },
];

// --- SCRIPTS PÉDAGOGIQUES ---
export interface TrainingScript {
  id: string;
  domainId: string;
  title: string;
  format: 'présentation' | 'atelier' | 'e-learning' | 'webinar';
  duration: string;
  audience: string;
  learningObjectives: string[];
  modules: { title: string; duration: string; content: string }[];
}

export const TRAINING_SCRIPTS: TrainingScript[] = [
  {
    id: 'TR-001', domainId: 'gouvernance', title: 'Gouvernance Bancaire — Standards Big Four', format: 'présentation', duration: '3h30', audience: 'Administrateurs, DG, DGA, Secrétaire du Conseil',
    learningObjectives: ['Comprendre les exigences BCEAO/COBAC en matière de gouvernance', 'Savoir organiser un CA efficace', 'Maîtriser le rôle des comités spécialisés', 'Connaître les bonnes pratiques internationales'],
    modules: [
      { title: 'Module 1 : Fondamentaux de la Gouvernance Bancaire', duration: '45 min', content: 'Définition, principes Bâle, exigences BCEAO/COBAC. Les 7 piliers de gouvernance SFD. Benchmark international Big Four.' },
      { title: 'Module 2 : Le Conseil d\'Administration — Rôle et Responsabilités', duration: '50 min', content: 'Composition, attributions, devoirs fiduciaires. Indépendance des administrateurs. Fréquence et conduite des réunions. Évaluation annuelle.' },
      { title: 'Module 3 : Les Comités Spécialisés', duration: '45 min', content: 'Comité d\'Audit, Comité des Risques, Comité de Rémunération, Comité de Nomination. Composition, charte, fréquence, reporting.' },
      { title: 'Module 4 : Exercice Pratique — Simulation de CA', duration: '60 min', content: 'Cas pratique : restructuration CA d\'une banque. Simulation de réunion avec dilemmes éthiques. Élaboration d\'un plan d\'amélioration gouvernance.' },
    ],
  },
  {
    id: 'TR-002', domainId: 'aml-cft', title: 'LCB/FT — Formation Obligatoire Niveau 1', format: 'e-learning', duration: '2h', audience: 'Tous les collaborateurs des institutions financières',
    learningObjectives: ['Identifier les obligations LCB/FT fondamentales', 'Reconnaître une transaction suspecte', 'Connaître la procédure de déclaration de soupçon', 'Comprendre le rôle de chacun dans le dispositif'],
    modules: [
      { title: 'Module 1 : Introduction à la LCB/FT', duration: '30 min', content: 'Qu\'est-ce que le blanchiment ? Le financement du terrorisme ? Cadre GAFI, UEMOA/CEMAC. Sanctions encourues.' },
      { title: 'Module 2 : KYC et Vigilance', duration: '35 min', content: 'Identification clients, bénéficiaires effectifs. CDD standard, simplifiée, renforcée. Profil de risque client. Conservation des documents.' },
      { title: 'Module 3 : Détection et Déclaration de Soupçon', duration: '35 min', content: 'Indices d\'alerte, typologies de blanchiment. Processus de déclaration interne. Rôle de la CENTIF. Confidentialité absolue.' },
      { title: 'Module 4 : Quiz et Certification', duration: '20 min', content: 'QCM 30 questions. Score minimum 80%. Certificat de formation valable 1 an.' },
    ],
  },
  {
    id: 'TR-003', domainId: 'controle-interne', title: 'COSO 2013 — Atelier d\'Implémentation', format: 'atelier', duration: '6h', audience: 'Directeurs contrôle interne, auditeurs internes, risk managers',
    learningObjectives: ['Maîtriser le cadre COSO 2013 (5 composants, 17 principes)', 'Savoir réaliser une auto-évaluation COSO', 'Identifier les points d\'attention dans le contexte africain', 'Définir un plan d\'amélioration priorisé'],
    modules: [
      { title: 'Module 1 : COSO 2013 — Cadre Théorique', duration: '1h30', content: 'Historique, évolution COSO 1992→2013→2024. Les 5 composants. Les 17 principes. Points d\'attention pour les institutions financières africaines.' },
      { title: 'Module 2 : Auto-évaluation Pratique', duration: '2h', content: 'Méthodologie d\'auto-évaluation : grille de notation, collecte des preuves, scoring maturité. Exercice pratique sur une fonction réelle.' },
      { title: 'Module 3 : Définition du Plan d\'Amélioration', duration: '1h30', content: 'Analyse des gaps, priorisation, quick wins vs projets structurants. Définition du plan d\'action avec responsables et échéances.' },
      { title: 'Module 4 : Intégration avec les Autres Référentiels', duration: '1h', content: 'Articulation COSO avec ISO 31000, COSO ERM, IIA. Cas des groupes multi-régulateurs (BCEAO + COBAC).' },
    ],
  },
  {
    id: 'TR-004', domainId: 'esg', title: 'ESG & Finance Durable — Sensibilisation COMEX', format: 'webinar', duration: '2h', audience: 'COMEX, DG, DGA, Directeurs métier',
    learningObjectives: ['Comprendre les enjeux ESG pour une institution financière africaine', 'Connaître le cadre ISSB et les attentes des régulateurs', 'Identifier les risques et opportunités ESG du portefeuille'],
    modules: [
      { title: 'Module 1 : ESG — Pourquoi Maintenant ?', duration: '40 min', content: 'Contexte international (ISSB, CSRD, SEC). Attentes BCEAO/COBAC. Pression des investisseurs et bailleurs. Risque réputationnel.' },
      { title: 'Module 2 : Le Cadre ISSB (IFRS S1/S2)', duration: '40 min', content: 'Gouvernance ESG, Stratégie, Gestion des risques, Indicateurs. Bilan carbone scope 3. Stress tests climatiques Pilier 2.' },
      { title: 'Module 3 : Feuille de Route ESG pour une Banque Africaine', duration: '40 min', content: 'Phase 1 : Diagnostic et sensibilisation. Phase 2 : Collecte données et bilan carbone. Phase 3 : Premier rapport. Phase 4 : Intégration stratégique.' },
    ],
  },
];

// --- FACTORY KPIs ---
export interface KnowledgeFactoryKPI {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  icon: string;
  color: string;
  history: { month: string; value: number }[];
}

export const KNOWLEDGE_FACTORY_KPIS: KnowledgeFactoryKPI[] = [
  { id: 'coverage', name: 'Couverture Réglementaire', current: 92, target: 100, unit: '%', icon: 'ri-radar-line', color: 'primary',
    history: [{ month: 'Jan', value: 65 }, { month: 'Fév', value: 72 }, { month: 'Mar', value: 78 }, { month: 'Avr', value: 84 }, { month: 'Mai', value: 88 }, { month: 'Juin', value: 92 }],
  },
  { id: 'domains', name: 'Domaines Complétés', current: 12, target: 12, unit: '/12', icon: 'ri-stack-line', color: 'accent',
    history: [{ month: 'Jan', value: 4 }, { month: 'Fév', value: 6 }, { month: 'Mar', value: 8 }, { month: 'Avr', value: 10 }, { month: 'Mai', value: 11 }, { month: 'Juin', value: 12 }],
  },
  { id: 'glossary', name: 'Entrées Glossaire', current: 30, target: 500, unit: '', icon: 'ri-book-open-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 30 }],
  },
  { id: 'faq', name: 'FAQ Validées', current: 20, target: 200, unit: '', icon: 'ri-question-answer-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 20 }],
  },
  { id: 'cases', name: 'Cas Pratiques', current: 6, target: 60, unit: '', icon: 'ri-file-search-line', color: 'accent',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 6 }],
  },
  { id: 'templates', name: 'Modèles & Templates', current: 10, target: 100, unit: '', icon: 'ri-file-copy-line', color: 'secondary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 10 }],
  },
  { id: 'trainings', name: 'Scripts Pédagogiques', current: 4, target: 40, unit: '', icon: 'ri-presentation-line', color: 'primary',
    history: [{ month: 'Jan', value: 0 }, { month: 'Fév', value: 0 }, { month: 'Mar', value: 0 }, { month: 'Avr', value: 0 }, { month: 'Mai', value: 0 }, { month: 'Juin', value: 4 }],
  },
];

export const KNOWLEDGE_FACTORY_STATS = {
  totalDomains: 12,
  domainsCompleted: 12,
  totalGlossaryEntries: 30,
  totalFAQ: 20,
  totalCaseStudies: 6,
  totalTemplates: 10,
  totalTrainingScripts: 4,
  totalKnowledgeItems: 82,
  coverageRate: 92,
  maturityScore: 89,
  targetMaturity: 100,
  zeroDuplication: true,
  bigFourStandard: true,
  lastAuditDate: '2026-06-23',
  projectVersion: 'v1.0 — Big Four Knowledge Factory',
};