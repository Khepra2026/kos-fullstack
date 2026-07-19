// ─────────────────────────────────────────────────────────────────────────────
// GLOSSAIRE CENTRALISÉ — KHEPRA EXPERTS
// Sigles, formules et sources utilisés dans les articles du blog
// Conforme aux meilleures pratiques internationales (ISO, IFRS, OHADA, BCEAO, COBAC)
// ─────────────────────────────────────────────────────────────────────────────

export interface GlossaryTerm {
  acronym: string;
  fullFr: string;
  fullEn: string;
  definitionFr: string;
  definitionEn: string;
  category: 'sigle' | 'formule' | 'indicateur' | 'institution' | 'cadre';
}

export interface ArticleSource {
  label: string;
  labelEn: string;
  url?: string;
  type: 'regulation' | 'institution' | 'standard' | 'study';
}

// ─────────────────────────────────────────────────────────────────────────────
// DICTIONNAIRE GLOBAL DES SIGLES ET FORMULES
// ─────────────────────────────────────────────────────────────────────────────

export const GLOSSARY_DICT: Record<string, GlossaryTerm> = {
  ALM: {
    acronym: 'ALM',
    fullFr: 'Gestion Actif-Passif',
    fullEn: 'Asset-Liability Management',
    definitionFr: 'Approche de gestion financière visant à équilibrer les actifs et les passifs d\'une institution financière en termes de maturité, de taux et de liquidité, afin de maîtriser les risques de transformation.',
    definitionEn: 'Financial management approach aimed at balancing an institution\'s assets and liabilities in terms of maturity, rate, and liquidity, to control transformation risks.',
    category: 'sigle',
  },
  IMF: {
    acronym: 'IMF',
    fullFr: 'Institution de Microfinance',
    fullEn: 'Microfinance Institution',
    definitionFr: 'Établissement financier spécialisé dans l\'offre de services financiers (crédit, épargne, assurance) aux populations à faibles revenus exclues du système bancaire classique.',
    definitionEn: 'Financial institution specializing in providing financial services (credit, savings, insurance) to low-income populations excluded from the conventional banking system.',
    category: 'institution',
  },
  EMF: {
    acronym: 'EMF',
    fullFr: 'Établissement de Microfinance',
    fullEn: 'Microfinance Establishment',
    definitionFr: 'Dénomination réglementaire utilisée en zone CEMAC (COBAC) pour désigner les institutions de microfinance, classées en catégories 1, 2 et 3 selon leur taille et leurs activités.',
    definitionEn: 'Regulatory denomination used in the CEMAC zone (COBAC) for microfinance institutions, classified into categories 1, 2, and 3 based on size and activities.',
    category: 'institution',
  },
  SFD: {
    acronym: 'SFD',
    fullFr: 'Système Financier Décentralisé',
    fullEn: 'Decentralized Financial System',
    definitionFr: 'Terme générique utilisé en zone UEMOA (BCEAO) pour désigner les institutions de microfinance, coopératives d\'épargne et de crédit, et autres structures financières non bancaires.',
    definitionEn: 'Generic term used in the UEMOA zone (BCEAO) for microfinance institutions, savings and credit cooperatives, and other non-banking financial structures.',
    category: 'institution',
  },
  BCEAO: {
    acronym: 'BCEAO',
    fullFr: 'Banque Centrale des États de l\'Afrique de l\'Ouest',
    fullEn: 'Central Bank of West African States',
    definitionFr: 'Banque centrale commune aux huit États membres de l\'UEMOA (Bénin, Burkina Faso, Côte d\'Ivoire, Guinée-Bissau, Mali, Niger, Sénégal, Togo). Elle émet la monnaie, conduit la politique monétaire et supervise les institutions financières de la zone.',
    definitionEn: 'Common central bank for the eight UEMOA member states (Benin, Burkina Faso, Côte d\'Ivoire, Guinea-Bissau, Mali, Niger, Senegal, Togo). It issues currency, conducts monetary policy, and supervises financial institutions in the zone.',
    category: 'institution',
  },
  COBAC: {
    acronym: 'COBAC',
    fullFr: 'Commission Bancaire de l\'Afrique Centrale',
    fullEn: 'Banking Commission of Central Africa',
    definitionFr: 'Organe de supervision bancaire de la zone CEMAC, chargé du contrôle et de la réglementation des établissements de crédit et des établissements de microfinance dans les six États membres (Cameroun, Centrafrique, Congo, Gabon, Guinée Équatoriale, Tchad).',
    definitionEn: 'Banking supervisory body of the CEMAC zone, responsible for the control and regulation of credit institutions and microfinance establishments in the six member states (Cameroon, Central African Republic, Congo, Gabon, Equatorial Guinea, Chad).',
    category: 'institution',
  },
  BEAC: {
    acronym: 'BEAC',
    fullFr: 'Banque des États de l\'Afrique Centrale',
    fullEn: 'Bank of Central African States',
    definitionFr: 'Banque centrale commune aux six États membres de la CEMAC. Elle émet le franc CFA BEAC, conduit la politique monétaire et gère les réserves de change de la zone.',
    definitionEn: 'Common central bank for the six CEMAC member states. It issues the BEAC CFA franc, conducts monetary policy, and manages the zone\'s foreign exchange reserves.',
    category: 'institution',
  },
  UEMOA: {
    acronym: 'UEMOA',
    fullFr: 'Union Économique et Monétaire Ouest-Africaine',
    fullEn: 'West African Economic and Monetary Union',
    definitionFr: 'Union économique et monétaire regroupant huit pays d\'Afrique de l\'Ouest partageant le franc CFA BCEAO. Elle harmonise les politiques économiques, fiscales et financières de ses membres.',
    definitionEn: 'Economic and monetary union grouping eight West African countries sharing the BCEAO CFA franc. It harmonizes the economic, fiscal, and financial policies of its members.',
    category: 'institution',
  },
  CEMAC: {
    acronym: 'CEMAC',
    fullFr: 'Communauté Économique et Monétaire de l\'Afrique Centrale',
    fullEn: 'Economic and Monetary Community of Central Africa',
    definitionFr: 'Communauté économique et monétaire regroupant six pays d\'Afrique centrale partageant le franc CFA BEAC. Elle harmonise les politiques économiques et financières de ses membres.',
    definitionEn: 'Economic and monetary community grouping six Central African countries sharing the BEAC CFA franc. It harmonizes the economic and financial policies of its members.',
    category: 'institution',
  },
  OHADA: {
    acronym: 'OHADA',
    fullFr: 'Organisation pour l\'Harmonisation en Afrique du Droit des Affaires',
    fullEn: 'Organization for the Harmonization of Business Law in Africa',
    definitionFr: 'Organisation internationale regroupant 17 États africains, dont l\'objectif est d\'harmoniser le droit des affaires par l\'adoption d\'Actes Uniformes directement applicables dans tous les États membres.',
    definitionEn: 'International organization grouping 17 African states, whose objective is to harmonize business law through the adoption of Uniform Acts directly applicable in all member states.',
    category: 'cadre',
  },
  SYSCOHADA: {
    acronym: 'SYSCOHADA',
    fullFr: 'Système Comptable OHADA',
    fullEn: 'OHADA Accounting System',
    definitionFr: 'Référentiel comptable commun aux États membres de l\'OHADA, révisé en 2017. Il définit les règles de comptabilisation, d\'évaluation et de présentation des états financiers des entreprises de la zone.',
    definitionEn: 'Common accounting framework for OHADA member states, revised in 2017. It defines the rules for recording, valuation, and presentation of financial statements for companies in the zone.',
    category: 'cadre',
  },
  AUSC: {
    acronym: 'AUSC',
    fullFr: 'Acte Uniforme relatif au droit des Sociétés Commerciales et du Groupement d\'Intérêt Économique',
    fullEn: 'Uniform Act on Commercial Companies and Economic Interest Groups',
    definitionFr: 'Acte Uniforme OHADA régissant la création, le fonctionnement et la dissolution des sociétés commerciales dans les 17 États membres. Révisé en 2014, il introduit notamment la SAS (Société par Actions Simplifiée).',
    definitionEn: 'OHADA Uniform Act governing the creation, operation, and dissolution of commercial companies in the 17 member states. Revised in 2014, it notably introduces the SAS (Simplified Joint Stock Company).',
    category: 'cadre',
  },
  AUDCIF: {
    acronym: 'AUDCIF',
    fullFr: 'Acte Uniforme relatif au Droit Comptable et à l\'Information Financière',
    fullEn: 'Uniform Act on Accounting Law and Financial Information',
    definitionFr: 'Acte Uniforme OHADA définissant le SYSCOHADA Révisé 2017. Il impose les états financiers obligatoires (bilan, compte de résultat, TFT, TAFIRE, annexes) et les règles comptables applicables dans les États membres.',
    definitionEn: 'OHADA Uniform Act defining the Revised SYSCOHADA 2017. It mandates required financial statements (balance sheet, income statement, CFS, TAFIRE, notes) and accounting rules applicable in member states.',
    category: 'cadre',
  },
  BFR: {
    acronym: 'BFR',
    fullFr: 'Besoin en Fonds de Roulement',
    fullEn: 'Working Capital Requirement (WCR)',
    definitionFr: 'Indicateur financier mesurant le besoin de financement du cycle d\'exploitation d\'une entreprise. Formule SYSCOHADA : BFR = Stocks + Créances clients − Dettes fournisseurs. Un BFR positif signifie que l\'entreprise doit financer son cycle d\'exploitation.',
    definitionEn: 'Financial indicator measuring the financing need of a company\'s operating cycle. SYSCOHADA formula: WCR = Inventory + Client receivables − Supplier payables. A positive WCR means the company must finance its operating cycle.',
    category: 'formule',
  },
  TFT: {
    acronym: 'TFT',
    fullFr: 'Tableau des Flux de Trésorerie',
    fullEn: 'Cash Flow Statement (CFS)',
    definitionFr: 'État financier obligatoire en système normal SYSCOHADA présentant les entrées et sorties de trésorerie classées en trois catégories : activités opérationnelles, d\'investissement et de financement. Seul document donnant une vision réelle du cash généré ou consommé.',
    definitionEn: 'Financial statement mandatory under the SYSCOHADA normal system presenting cash inflows and outflows classified into three categories: operating, investing, and financing activities. The only document providing a real view of cash generated or consumed.',
    category: 'formule',
  },
  DSO: {
    acronym: 'DSO',
    fullFr: 'Délai de Recouvrement des Créances Clients (Jours de Créances Clients)',
    fullEn: 'Days Sales Outstanding',
    definitionFr: 'Indicateur mesurant le nombre moyen de jours nécessaires pour encaisser les créances clients. Formule : DSO = (Créances clients / CA TTC) × 365. Un DSO élevé signifie que l\'entreprise finance ses clients sur une longue période.',
    definitionEn: 'Indicator measuring the average number of days needed to collect client receivables. Formula: DSO = (Client receivables / Revenue incl. tax) × 365. A high DSO means the company finances its clients over a long period.',
    category: 'indicateur',
  },
  DIO: {
    acronym: 'DIO',
    fullFr: 'Délai de Rotation des Stocks (Jours de Stocks)',
    fullEn: 'Days Inventory Outstanding',
    definitionFr: 'Indicateur mesurant le nombre moyen de jours pendant lesquels les stocks sont détenus avant d\'être vendus. Formule : DIO = (Stocks / Coût des ventes) × 365. Un DIO élevé immobilise du cash inutilement.',
    definitionEn: 'Indicator measuring the average number of days inventory is held before being sold. Formula: DIO = (Inventory / Cost of goods sold) × 365. A high DIO unnecessarily immobilizes cash.',
    category: 'indicateur',
  },
  DPO: {
    acronym: 'DPO',
    fullFr: 'Délai de Règlement des Fournisseurs (Jours de Dettes Fournisseurs)',
    fullEn: 'Days Payable Outstanding',
    definitionFr: 'Indicateur mesurant le nombre moyen de jours mis pour payer les fournisseurs. Formule : DPO = (Dettes fournisseurs / Achats TTC) × 365. Un DPO élevé est favorable à la trésorerie de l\'entreprise.',
    definitionEn: 'Indicator measuring the average number of days taken to pay suppliers. Formula: DPO = (Supplier payables / Purchases incl. tax) × 365. A high DPO is favorable to the company\'s treasury.',
    category: 'indicateur',
  },
  DSCR: {
    acronym: 'DSCR',
    fullFr: 'Ratio de Couverture du Service de la Dette',
    fullEn: 'Debt Service Coverage Ratio',
    definitionFr: 'Ratio mesurant la capacité d\'une entreprise à rembourser sa dette à partir de son cash-flow opérationnel. Formule : DSCR = Cash-flow opérationnel / (Remboursement capital + Intérêts). Un DSCR ≥ 1,2x est généralement exigé par les banques.',
    definitionEn: 'Ratio measuring a company\'s ability to repay its debt from operating cash flow. Formula: DSCR = Operating cash flow / (Principal repayment + Interest). A DSCR ≥ 1.2x is generally required by banks.',
    category: 'indicateur',
  },
  NPL: {
    acronym: 'NPL',
    fullFr: 'Créances Douteuses / Prêts Non Performants',
    fullEn: 'Non-Performing Loans',
    definitionFr: 'Créances pour lesquelles le débiteur n\'a pas effectué les paiements prévus depuis plus de 90 jours. Le taux de NPL = NPL / Encours total de crédit. Un taux supérieur à 10 % est un signal d\'alerte pour les régulateurs BCEAO et COBAC.',
    definitionEn: 'Receivables for which the debtor has not made scheduled payments for more than 90 days. NPL rate = NPL / Total credit outstanding. A rate above 10% is a warning signal for BCEAO and COBAC regulators.',
    category: 'indicateur',
  },
  LCR: {
    acronym: 'LCR',
    fullFr: 'Ratio de Couverture des Liquidités',
    fullEn: 'Liquidity Coverage Ratio',
    definitionFr: 'Ratio prudentiel issu de Bâle III mesurant la capacité d\'un établissement à faire face à ses sorties nettes de trésorerie sur 30 jours avec ses actifs liquides de haute qualité. Minimum réglementaire BCEAO : 100 %.',
    definitionEn: 'Prudential ratio from Basel III measuring an institution\'s ability to cover its net cash outflows over 30 days with high-quality liquid assets. BCEAO regulatory minimum: 100%.',
    category: 'indicateur',
  },
  ROI: {
    acronym: 'ROI',
    fullFr: 'Retour sur Investissement',
    fullEn: 'Return on Investment',
    definitionFr: 'Indicateur mesurant la rentabilité d\'un investissement. Formule : ROI = (Gain net de l\'investissement / Coût de l\'investissement) × 100. Exprimé en pourcentage, il permet de comparer la rentabilité de différents investissements.',
    definitionEn: 'Indicator measuring the profitability of an investment. Formula: ROI = (Net gain from investment / Cost of investment) × 100. Expressed as a percentage, it allows comparison of the profitability of different investments.',
    category: 'indicateur',
  },
  OSS: {
    acronym: 'OSS',
    fullFr: 'Taux d\'Autosuffisance Opérationnelle',
    fullEn: 'Operational Self-Sufficiency',
    definitionFr: 'Indicateur clé de performance des IMF mesurant leur capacité à couvrir leurs charges opérationnelles par leurs produits financiers. Formule : OSS = Produits financiers / (Charges financières + Dotations aux provisions + Charges opérationnelles). Un OSS ≥ 110 % est généralement exigé par les bailleurs.',
    definitionEn: 'Key performance indicator for MFIs measuring their ability to cover operating expenses with financial income. Formula: OSS = Financial income / (Financial charges + Provisions + Operating expenses). An OSS ≥ 110% is generally required by donors.',
    category: 'indicateur',
  },
  CAC: {
    acronym: 'CAC',
    fullFr: 'Coût d\'Acquisition Client',
    fullEn: 'Customer Acquisition Cost',
    definitionFr: 'Indicateur mesurant le coût total pour acquérir un nouveau client. Formule : CAC = Total des dépenses marketing et ventes / Nombre de nouveaux clients acquis. Un CAC élevé par rapport à la LTV indique un modèle économique non viable.',
    definitionEn: 'Indicator measuring the total cost to acquire a new customer. Formula: CAC = Total marketing and sales spend / Number of new customers acquired. A high CAC relative to LTV indicates a non-viable business model.',
    category: 'indicateur',
  },
  LTV: {
    acronym: 'LTV',
    fullFr: 'Valeur Vie Client',
    fullEn: 'Customer Lifetime Value',
    definitionFr: 'Indicateur mesurant le revenu total qu\'un client génère sur toute la durée de sa relation avec l\'entreprise. Un ratio LTV/CAC ≥ 3x est généralement considéré comme le seuil de viabilité d\'un modèle économique.',
    definitionEn: 'Indicator measuring the total revenue a customer generates over the entire duration of their relationship with the company. An LTV/CAC ratio ≥ 3x is generally considered the viability threshold for a business model.',
    category: 'indicateur',
  },
  KYC: {
    acronym: 'KYC',
    fullFr: 'Connaissance du Client',
    fullEn: 'Know Your Customer',
    definitionFr: 'Ensemble des procédures d\'identification et de vérification de l\'identité des clients, obligatoires dans le cadre de la lutte contre le blanchiment de capitaux et le financement du terrorisme (LBC/FT). Exigé par la BCEAO et la COBAC.',
    definitionEn: 'Set of procedures for identifying and verifying the identity of customers, mandatory under anti-money laundering and counter-terrorism financing (AML/CFT) regulations. Required by BCEAO and COBAC.',
    category: 'sigle',
  },
  'LBC/FT': {
    acronym: 'LBC/FT',
    fullFr: 'Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme',
    fullEn: 'Anti-Money Laundering / Counter-Terrorism Financing (AML/CFT)',
    definitionFr: 'Dispositif réglementaire visant à prévenir l\'utilisation du système financier à des fins de blanchiment d\'argent ou de financement d\'activités terroristes. En UEMOA : Directive n°02/2015. En CEMAC : Règlement n°01/03.',
    definitionEn: 'Regulatory framework aimed at preventing the use of the financial system for money laundering or terrorist financing. In UEMOA: Directive No. 02/2015. In CEMAC: Regulation No. 01/03.',
    category: 'sigle',
  },
  'AML/CFT': {
    acronym: 'AML/CFT',
    fullFr: 'Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme',
    fullEn: 'Anti-Money Laundering / Counter-Terrorism Financing',
    definitionFr: 'Voir LBC/FT. Terminologie anglophone équivalente utilisée dans les standards internationaux du GAFI (Groupe d\'Action Financière).',
    definitionEn: 'See LBC/FT. English equivalent terminology used in FATF (Financial Action Task Force) international standards.',
    category: 'sigle',
  },
  GAFI: {
    acronym: 'GAFI',
    fullFr: 'Groupe d\'Action Financière',
    fullEn: 'Financial Action Task Force (FATF)',
    definitionFr: 'Organisation intergouvernementale établissant les normes internationales de lutte contre le blanchiment de capitaux, le financement du terrorisme et la prolifération des armes de destruction massive.',
    definitionEn: 'Intergovernmental organization establishing international standards for combating money laundering, terrorist financing, and proliferation of weapons of mass destruction.',
    category: 'institution',
  },
  CENTIF: {
    acronym: 'CENTIF',
    fullFr: 'Cellule Nationale de Traitement des Informations Financières',
    fullEn: 'National Financial Intelligence Unit',
    definitionFr: 'Cellule nationale de renseignement financier chargée de recevoir, analyser et transmettre aux autorités judiciaires les déclarations de soupçon en matière de blanchiment de capitaux. Présente dans chaque État membre de l\'UEMOA.',
    definitionEn: 'National financial intelligence unit responsible for receiving, analyzing, and transmitting suspicious transaction reports to judicial authorities. Present in each UEMOA member state.',
    category: 'institution',
  },
  ANIF: {
    acronym: 'ANIF',
    fullFr: 'Agence Nationale d\'Investigation Financière',
    fullEn: 'National Financial Investigation Agency',
    definitionFr: 'Cellule nationale de renseignement financier dans les États membres de la CEMAC, équivalent de la CENTIF en zone UEMOA. Reçoit les déclarations de soupçon et les transmet aux autorités judiciaires.',
    definitionEn: 'National financial intelligence unit in CEMAC member states, equivalent to CENTIF in the UEMOA zone. Receives suspicious transaction reports and transmits them to judicial authorities.',
    category: 'institution',
  },
  CAPEX: {
    acronym: 'CAPEX',
    fullFr: 'Dépenses d\'Investissement',
    fullEn: 'Capital Expenditures',
    definitionFr: 'Dépenses engagées pour acquérir, améliorer ou maintenir des actifs physiques à long terme (équipements, immobilier, infrastructures). Comptabilisées à l\'actif du bilan et amorties sur leur durée de vie utile.',
    definitionEn: 'Expenditures incurred to acquire, improve, or maintain long-term physical assets (equipment, real estate, infrastructure). Recorded as assets on the balance sheet and depreciated over their useful life.',
    category: 'sigle',
  },
  OPEX: {
    acronym: 'OPEX',
    fullFr: 'Dépenses Opérationnelles',
    fullEn: 'Operating Expenditures',
    definitionFr: 'Dépenses courantes nécessaires au fonctionnement quotidien d\'une entreprise (salaires, loyers, fournitures, services). Comptabilisées directement en charges dans le compte de résultat de l\'exercice.',
    definitionEn: 'Current expenses necessary for the daily operation of a company (salaries, rent, supplies, services). Recorded directly as expenses in the income statement for the period.',
    category: 'sigle',
  },
  ERP: {
    acronym: 'ERP',
    fullFr: 'Progiciel de Gestion Intégré',
    fullEn: 'Enterprise Resource Planning',
    definitionFr: 'Logiciel intégrant l\'ensemble des processus de gestion d\'une entreprise (comptabilité, stocks, ventes, RH, production) dans un système d\'information unique. Exemples : Sage, Odoo, SAP Business One.',
    definitionEn: 'Software integrating all business management processes (accounting, inventory, sales, HR, production) into a single information system. Examples: Sage, Odoo, SAP Business One.',
    category: 'sigle',
  },
  CRM: {
    acronym: 'CRM',
    fullFr: 'Gestion de la Relation Client',
    fullEn: 'Customer Relationship Management',
    definitionFr: 'Système d\'information dédié à la gestion des interactions avec les clients et prospects, permettant le suivi du pipeline commercial, la gestion des réclamations et la prévision des encaissements.',
    definitionEn: 'Information system dedicated to managing interactions with customers and prospects, enabling commercial pipeline tracking, complaint management, and collection forecasting.',
    category: 'sigle',
  },
  SAS: {
    acronym: 'SAS',
    fullFr: 'Société par Actions Simplifiée',
    fullEn: 'Simplified Joint Stock Company',
    definitionFr: 'Forme juridique introduite par l\'AUSC OHADA révisé 2014, offrant une grande flexibilité statutaire. Recommandée pour les startups et les entreprises en croissance dans les 17 États membres de l\'OHADA.',
    definitionEn: 'Legal form introduced by the revised AUSC OHADA 2014, offering great statutory flexibility. Recommended for startups and growing companies in the 17 OHADA member states.',
    category: 'cadre',
  },
  RCCM: {
    acronym: 'RCCM',
    fullFr: 'Registre du Commerce et du Crédit Mobilier',
    fullEn: 'Trade and Personal Property Credit Register',
    definitionFr: 'Registre officiel OHADA dans lequel toutes les entreprises commerciales doivent s\'immatriculer. L\'immatriculation au RCCM confère la personnalité morale et est obligatoire pour accéder aux financements formels.',
    definitionEn: 'Official OHADA register in which all commercial companies must register. RCCM registration confers legal personality and is mandatory for accessing formal financing.',
    category: 'cadre',
  },
  "AMF-UEMOA": {
    acronym: 'AMF-UEMOA',
    fullFr: 'Autorité des Marchés Financiers de l\'UEMOA',
    fullEn: 'Financial Markets Authority of UEMOA',
    definitionFr: 'Autorité de régulation des marchés financiers de l\'UEMOA, supervisant la BRVM (Bourse Régionale des Valeurs Mobilières) et les émissions publiques de titres dans la zone.',
    definitionEn: 'Financial markets regulatory authority of UEMOA, supervising the BRVM (Regional Securities Exchange) and public securities issuances in the zone.',
    category: 'institution',
  },
  COSUMAF: {
    acronym: 'COSUMAF',
    fullFr: 'Commission de Surveillance du Marché Financier de l\'Afrique Centrale',
    fullEn: 'Central African Financial Market Supervisory Commission',
    definitionFr: 'Autorité de régulation des marchés financiers de la CEMAC, supervisant la BVMAC (Bourse des Valeurs Mobilières de l\'Afrique Centrale) et les émissions publiques de titres dans la zone.',
    definitionEn: 'Financial markets regulatory authority of CEMAC, supervising the BVMAC (Central African Securities Exchange) and public securities issuances in the zone.',
    category: 'institution',
  },
  BRVM: {
    acronym: 'BRVM',
    fullFr: 'Bourse Régionale des Valeurs Mobilières',
    fullEn: 'Regional Securities Exchange',
    definitionFr: 'Marché boursier régional commun aux huit États membres de l\'UEMOA, basé à Abidjan. Permet aux entreprises de lever des capitaux par émission d\'actions et d\'obligations.',
    definitionEn: 'Regional stock exchange common to the eight UEMOA member states, based in Abidjan. Allows companies to raise capital through the issuance of shares and bonds.',
    category: 'institution',
  },
  BOAD: {
    acronym: 'BOAD',
    fullFr: 'Banque Ouest Africaine de Développement',
    fullEn: 'West African Development Bank',
    definitionFr: 'Institution financière de développement de l\'UEMOA, finançant les projets d\'investissement dans les secteurs productifs et les infrastructures des États membres.',
    definitionEn: 'Development finance institution of UEMOA, financing investment projects in the productive sectors and infrastructure of member states.',
    category: 'institution',
  },
  BDEAC: {
    acronym: 'BDEAC',
    fullFr: 'Banque de Développement des États de l\'Afrique Centrale',
    fullEn: 'Development Bank of Central African States',
    definitionFr: 'Institution financière de développement de la CEMAC, finançant les projets d\'investissement dans les secteurs productifs et les infrastructures des États membres.',
    definitionEn: 'Development finance institution of CEMAC, financing investment projects in the productive sectors and infrastructure of member states.',
    category: 'institution',
  },
  FAGACE: {
    acronym: 'FAGACE',
    fullFr: 'Fonds Africain de Garantie et de Coopération Économique',
    fullEn: 'African Guarantee and Economic Cooperation Fund',
    definitionFr: 'Fonds de garantie régional facilitant l\'accès au financement des entreprises et projets dans les États membres de l\'UEMOA et au-delà, en garantissant les prêts accordés par les banques partenaires.',
    definitionEn: 'Regional guarantee fund facilitating access to financing for companies and projects in UEMOA member states and beyond, by guaranteeing loans granted by partner banks.',
    category: 'institution',
  },
  GIABA: {
    acronym: 'GIABA',
    fullFr: 'Groupe Intergouvernemental d\'Action contre le Blanchiment d\'Argent en Afrique de l\'Ouest',
    fullEn: 'Inter-Governmental Action Group against Money Laundering in West Africa',
    definitionFr: 'Organisme régional de type GAFI pour l\'Afrique de l\'Ouest, chargé de renforcer les capacités des États membres en matière de LBC/FT et d\'évaluer leur conformité aux standards internationaux.',
    definitionEn: 'FATF-style regional body for West Africa, responsible for strengthening member states\' AML/CFT capacities and evaluating their compliance with international standards.',
    category: 'institution',
  },
  GABAC: {
    acronym: 'GABAC',
    fullFr: 'Groupe d\'Action contre le Blanchiment d\'Argent en Afrique Centrale',
    fullEn: 'Action Group against Money Laundering in Central Africa',
    definitionFr: 'Organisme régional de type GAFI pour l\'Afrique centrale, chargé de renforcer les capacités des États membres de la CEMAC en matière de LBC/FT.',
    definitionEn: 'FATF-style regional body for Central Africa, responsible for strengthening CEMAC member states\' AML/CFT capacities.',
    category: 'institution',
  },
  PDCA: {
    acronym: 'PDCA',
    fullFr: 'Planifier-Déployer-Contrôler-Agir (Roue de Deming)',
    fullEn: 'Plan-Do-Check-Act (Deming Cycle)',
    definitionFr: 'Méthode d\'amélioration continue en quatre étapes : Planifier (identifier le problème), Déployer (mettre en œuvre), Contrôler (mesurer les résultats), Agir (standardiser ou recommencer). Fondement du Management par la Qualité Totale (TQM).',
    definitionEn: 'Four-step continuous improvement method: Plan (identify the problem), Do (implement), Check (measure results), Act (standardize or restart). Foundation of Total Quality Management (TQM).',
    category: 'formule',
  },
  TQM: {
    acronym: 'TQM',
    fullFr: 'Management par la Qualité Totale',
    fullEn: 'Total Quality Management',
    definitionFr: 'Approche de management visant l\'amélioration continue de la qualité de tous les processus d\'une organisation, impliquant l\'ensemble des collaborateurs. Repose sur le cycle PDCA et les outils Lean.',
    definitionEn: 'Management approach aimed at continuous quality improvement of all organizational processes, involving all employees. Based on the PDCA cycle and Lean tools.',
    category: 'sigle',
  },
  DAF: {
    acronym: 'DAF',
    fullFr: 'Directeur Administratif et Financier',
    fullEn: 'Chief Financial Officer (CFO)',
    definitionFr: 'Dirigeant responsable de la gestion financière, comptable et administrative d\'une organisation. Dans le cadre du DAF externalisé, cette fonction est assurée par un prestataire externe à temps partiel.',
    definitionEn: 'Executive responsible for the financial, accounting, and administrative management of an organization. In the context of an outsourced CFO, this function is provided by an external part-time service provider.',
    category: 'sigle',
  },
  DG: {
    acronym: 'DG',
    fullFr: 'Directeur Général',
    fullEn: 'Chief Executive Officer (CEO)',
    definitionFr: 'Dirigeant exécutif responsable de la gestion opérationnelle et stratégique d\'une organisation, nommé par le Conseil d\'Administration conformément à l\'AUSC OHADA.',
    definitionEn: 'Executive leader responsible for the operational and strategic management of an organization, appointed by the Board of Directors in accordance with AUSC OHADA.',
    category: 'sigle',
  },
  CA: {
    acronym: 'CA',
    fullFr: 'Conseil d\'Administration',
    fullEn: 'Board of Directors',
    definitionFr: 'Organe de gouvernance d\'une société anonyme (SA) ou d\'une SAS, chargé de définir la stratégie, de contrôler la gestion et de protéger les intérêts des actionnaires. Ses obligations sont définies par l\'AUSC OHADA.',
    definitionEn: 'Governance body of a joint stock company (SA) or SAS, responsible for defining strategy, controlling management, and protecting shareholder interests. Its obligations are defined by AUSC OHADA.',
    category: 'sigle',
  },
  FCFA: {
    acronym: 'FCFA',
    fullFr: 'Franc CFA (Franc de la Communauté Financière Africaine)',
    fullEn: 'CFA Franc (African Financial Community Franc)',
    definitionFr: 'Monnaie commune utilisée dans les zones UEMOA (FCFA BCEAO) et CEMAC (FCFA BEAC). Arrimée à l\'euro à un taux fixe de 655,957 FCFA pour 1 euro.',
    definitionEn: 'Common currency used in the UEMOA (BCEAO CFA franc) and CEMAC (BEAC CFA franc) zones. Pegged to the euro at a fixed rate of 655.957 CFA francs per euro.',
    category: 'sigle',
  },
  CGAP: {
    acronym: 'CGAP',
    fullFr: 'Groupe Consultatif d\'Assistance aux Pauvres',
    fullEn: 'Consultative Group to Assist the Poor',
    definitionFr: 'Organisation internationale hébergée par la Banque mondiale, spécialisée dans la promotion de l\'inclusion financière. Publie des standards et indicateurs de performance pour les IMF (dont l\'OSS).',
    definitionEn: 'International organization hosted by the World Bank, specializing in promoting financial inclusion. Publishes performance standards and indicators for MFIs (including OSS).',
    category: 'institution',
  },
  ACFE: {
    acronym: 'ACFE',
    fullFr: 'Association des Examinateurs Certifiés de Fraude',
    fullEn: 'Association of Certified Fraud Examiners',
    definitionFr: 'Organisation professionnelle internationale spécialisée dans la lutte contre la fraude. Publie le rapport biennal "Report to the Nations" sur les pertes liées aux fraudes dans les organisations mondiales.',
    definitionEn: 'International professional organization specializing in fraud prevention. Publishes the biennial "Report to the Nations" on fraud losses in global organizations.',
    category: 'institution',
  },
  SRIF: {
    acronym: 'SRIF',
    fullFr: 'Stratégie Régionale d\'Inclusion Financière',
    fullEn: 'Regional Financial Inclusion Strategy',
    definitionFr: 'Cadre stratégique régional de la BCEAO visant à accroître l\'accès aux services financiers formels dans les États membres de l\'UEMOA, avec des objectifs chiffrés de taux de bancarisation.',
    definitionEn: 'BCEAO regional strategic framework aimed at increasing access to formal financial services in UEMOA member states, with quantified banking penetration rate targets.',
    category: 'cadre',
  },
  ABR: {
    acronym: 'ABR',
    fullFr: 'Approche Basée sur les Risques',
    fullEn: 'Risk-Based Approach (RBA)',
    definitionFr: 'Méthodologie LBC/FT recommandée par le GAFI consistant à évaluer et hiérarchiser les risques de blanchiment selon quatre dimensions : clients, produits/services, canaux de distribution, zones géographiques.',
    definitionEn: 'AML/CFT methodology recommended by FATF consisting of assessing and prioritizing money laundering risks across four dimensions: customers, products/services, distribution channels, geographic areas.',
    category: 'sigle',
  },
  'RCLBC/FT': {
    acronym: 'RCLBC/FT',
    fullFr: 'Responsable de la Conformité en matière de LBC/FT',
    fullEn: 'AML/CFT Compliance Officer',
    definitionFr: 'Personne désignée au sein d\'une institution financière pour superviser la mise en œuvre du dispositif LBC/FT, coordonner les déclarations de soupçon et assurer la formation des équipes. Obligatoire selon les directives BCEAO et COBAC.',
    definitionEn: 'Person designated within a financial institution to oversee AML/CFT framework implementation, coordinate suspicious transaction reports, and ensure staff training. Mandatory under BCEAO and COBAC directives.',
    category: 'sigle',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES PAR ARTICLE
// Chaque article référence ses sources officielles
// ─────────────────────────────────────────────────────────────────────────────

export const ARTICLE_SOURCES: Record<string, ArticleSource[]> = {
  'alm-microfinance-uemoa': [
    {
      label: 'BCEAO — Instruction n°010-08-2010 relative aux règles prudentielles des SFD',
      labelEn: 'BCEAO — Instruction No. 010-08-2010 on SFD Prudential Rules',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'Commission Bancaire UMOA — Pouvoirs de supervision et sanctions',
      labelEn: 'UMOA Banking Commission — Supervisory powers and sanctions',
      url: 'https://www.bceao.int',
      type: 'institution',
    },
    {
      label: 'BOAD — Mécanismes de refinancement pour les SFD UEMOA',
      labelEn: 'BOAD — Refinancing mechanisms for UEMOA MFIs',
      url: 'https://www.boad.org',
      type: 'institution',
    },
  ],
  'alm-microfinance-cemac': [
    {
      label: 'COBAC — Règlement EMF-2017 relatif aux conditions d\'exercice et de contrôle des EMF',
      labelEn: 'COBAC — EMF-2017 Regulation on MFI operating conditions and supervision',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'BEAC — Politique monétaire et systèmes de paiement CEMAC',
      labelEn: 'BEAC — Monetary policy and CEMAC payment systems',
      url: 'https://www.beac.int',
      type: 'institution',
    },
    {
      label: 'BDEAC — Mécanismes de refinancement pour les EMF CEMAC',
      labelEn: 'BDEAC — Refinancing mechanisms for CEMAC MFIs',
      url: 'https://www.bdeac.org',
      type: 'institution',
    },
  ],
  'bilan-bancaire-uemoa': [
    {
      label: 'BCEAO — Instructions n°026 à 029-11-2016 sur les ratios prudentiels bancaires',
      labelEn: 'BCEAO — Instructions No. 026 to 029-11-2016 on banking prudential ratios',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'Commission Bancaire UMOA — Procédures de supervision et sanctions',
      labelEn: 'UMOA Banking Commission — Supervision procedures and sanctions',
      url: 'https://www.bceao.int',
      type: 'institution',
    },
  ],
  'bilan-bancaire-cemac': [
    {
      label: 'COBAC — Règlement R-93/13 sur la division, couverture des risques et liquidité',
      labelEn: 'COBAC — Regulation R-93/13 on risk division, coverage, and liquidity',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'COBAC — Processus d\'alignement sur Bâle III (en cours)',
      labelEn: 'COBAC — Basel III alignment process (ongoing)',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  'lbcft-sfd-uemoa': [
    {
      label: 'BCEAO — Directive UEMOA n°02/2015 relative à la LBC/FT',
      labelEn: 'BCEAO — UEMOA Directive No. 02/2015 on AML/CFT',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'GIABA — Évaluations mutuelles des États membres UEMOA',
      labelEn: 'GIABA — Mutual evaluations of UEMOA member states',
      url: 'https://www.giaba.org',
      type: 'institution',
    },
    {
      label: 'GAFI — 40 Recommandations sur la LBC/FT',
      labelEn: 'FATF — 40 Recommendations on AML/CFT',
      url: 'https://www.fatf-gafi.org',
      type: 'standard',
    },
  ],
  'lbcft-emf-cemac': [
    {
      label: 'COBAC — Règlement CEMAC n°01/03 relatif à la LBC/FT',
      labelEn: 'COBAC — CEMAC Regulation No. 01/03 on AML/CFT',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'GABAC — Évaluations mutuelles des États membres CEMAC',
      labelEn: 'GABAC — Mutual evaluations of CEMAC member states',
      url: 'https://www.gabac-cm.org',
      type: 'institution',
    },
    {
      label: 'GAFI — 40 Recommandations sur la LBC/FT',
      labelEn: 'FATF — 40 Recommendations on AML/CFT',
      url: 'https://www.fatf-gafi.org',
      type: 'standard',
    },
  ],
  'alm-microfinance-afrique': [
    {
      label: 'BCEAO — Instruction n°010-08-2010 relative aux SFD',
      labelEn: 'BCEAO — Instruction No. 010-08-2010 on SFDs',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement EMF-2017 relatif aux conditions d\'exercice et de contrôle des EMF',
      labelEn: 'COBAC — EMF-2017 Regulation on MFI operating conditions and supervision',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'BCEAO — Instructions n°026 à 029-11-2016 sur les ratios prudentiels',
      labelEn: 'BCEAO — Instructions No. 026 to 029-11-2016 on prudential ratios',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
  ],
  'pme-africaines-tresorerie-70-pourcent': [
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'BCEAO — Taux d\'usure applicable aux PME en zone UEMOA',
      labelEn: 'BCEAO — Usury rate applicable to SMEs in the UEMOA zone',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
  ],
  'pilotage-financier-vs-intuition': [
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
  'structuration-bilan-bancaire-afrique': [
    {
      label: 'BCEAO — Instructions n°026 à 029-11-2016 sur les ratios prudentiels bancaires',
      labelEn: 'BCEAO — Instructions No. 026 to 029-11-2016 on banking prudential ratios',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement R-93/13 sur la division, couverture des risques et liquidité',
      labelEn: 'COBAC — Regulation R-93/13 on risk division, coverage, and liquidity',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  'cash-flow-vs-chiffre-affaires': [
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
  '1': [
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'FAGACE — Fonds Africain de Garantie et de Coopération Économique',
      labelEn: 'FAGACE — African Guarantee and Economic Cooperation Fund',
      url: 'https://www.fagace.org',
      type: 'institution',
    },
  ],
  '2': [
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'AMF-UEMOA — Conseil Régional de l\'Épargne Publique et des Marchés Financiers',
      labelEn: 'AMF-UEMOA — Regional Council for Public Savings and Financial Markets',
      url: 'https://www.crepmf.org',
      type: 'institution',
    },
    {
      label: 'COSUMAF — Commission de Surveillance du Marché Financier de l\'Afrique Centrale',
      labelEn: 'COSUMAF — Central African Financial Market Supervisory Commission',
      url: 'https://www.cosumaf.org',
      type: 'institution',
    },
  ],
  '3': [
    {
      label: 'BCEAO — Stratégie Régionale d\'Inclusion Financière (SRIF)',
      labelEn: 'BCEAO — Regional Financial Inclusion Strategy (RFIS)',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement EMF-2017',
      labelEn: 'COBAC — EMF-2017 Regulation',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'CGAP — Indicateurs de performance des IMF',
      labelEn: 'CGAP — MFI Performance Indicators',
      url: 'https://www.cgap.org',
      type: 'study',
    },
  ],
  '4': [
    {
      label: 'BCEAO — Circulaire 2021 sur les systèmes d\'information des SFD',
      labelEn: 'BCEAO — 2021 Circular on MFI information systems',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement EMF-2017 sur les exigences SI des EMF',
      labelEn: 'COBAC — EMF-2017 Regulation on MFI information system requirements',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '5': [
    {
      label: 'BCEAO — Instructions n°028 et n°029-11-2016 sur la liquidité et la concentration des risques',
      labelEn: 'BCEAO — Instructions No. 028 and 029-11-2016 on liquidity and risk concentration',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement R-93/13 sur la division des risques',
      labelEn: 'COBAC — Regulation R-93/13 on risk division',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '6': [
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'BCEAO — Ratios prudentiels applicables aux institutions financières UEMOA',
      labelEn: 'BCEAO — Prudential ratios applicable to UEMOA financial institutions',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
  ],
  '7': [
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'AMF-UEMOA — Réglementation des émissions publiques en zone UEMOA',
      labelEn: 'AMF-UEMOA — Regulation of public offerings in the UEMOA zone',
      url: 'https://www.crepmf.org',
      type: 'institution',
    },
  ],
  '8': [
    {
      label: 'ACFE — Report to the Nations 2022 (Global Fraud Study)',
      labelEn: 'ACFE — Report to the Nations 2022 (Global Fraud Study)',
      url: 'https://www.acfe.com/report-to-the-nations',
      type: 'study',
    },
    {
      label: 'BCEAO — Instructions sur le contrôle interne des institutions financières',
      labelEn: 'BCEAO — Instructions on internal control for financial institutions',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement R-2001/07 sur le contrôle interne',
      labelEn: 'COBAC — Regulation R-2001/07 on internal control',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '9': [
    {
      label: 'BCEAO — Stratégie Régionale d\'Inclusion Financière (SRIF)',
      labelEn: 'BCEAO — Regional Financial Inclusion Strategy',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement EMF-2017',
      labelEn: 'COBAC — EMF-2017 Regulation',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '10': [
    {
      label: 'BCEAO — Programme d\'éducation financière et protection des utilisateurs',
      labelEn: 'BCEAO — Financial education program and user protection',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'CGAP — Bonnes pratiques en éducation financière pour les populations vulnérables',
      labelEn: 'CGAP — Best practices in financial education for vulnerable populations',
      url: 'https://www.cgap.org',
      type: 'study',
    },
  ],
  '11': [
    {
      label: 'BCEAO — Instruction n°008-05-2015 sur la monnaie électronique',
      labelEn: 'BCEAO — Instruction No. 008-05-2015 on electronic money',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'BEAC — Règlement sur les systèmes de paiement et la monnaie électronique',
      labelEn: 'BEAC — Regulation on payment systems and electronic money',
      url: 'https://www.beac.int',
      type: 'regulation',
    },
  ],
  '12': [
    {
      label: 'BCEAO — Instructions sur la protection des utilisateurs de services financiers',
      labelEn: 'BCEAO — Instructions on financial services user protection',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Instructions sur la protection des clients des établissements de crédit',
      labelEn: 'COBAC — Instructions on credit institution client protection',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '13': [
    {
      label: 'BOAD — Mécanismes de financement de l\'agrobusiness en zone UEMOA',
      labelEn: 'BOAD — Agribusiness financing mechanisms in the UEMOA zone',
      url: 'https://www.boad.org',
      type: 'institution',
    },
    {
      label: 'AMF-UEMOA — Réglementation des fonds d\'investissement en zone UEMOA',
      labelEn: 'AMF-UEMOA — Investment fund regulation in the UEMOA zone',
      url: 'https://www.crepmf.org',
      type: 'institution',
    },
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Coopératives (AUCE 2010)',
      labelEn: 'OHADA — Uniform Act on Cooperative Law (AUCE 2010)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
  '14': [
    {
      label: 'BCEAO — Instruction n°008-05-2015 sur la monnaie électronique et le Système STAR-UEMOA',
      labelEn: 'BCEAO — Instruction No. 008-05-2015 on electronic money and the STAR-UEMOA System',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'BEAC — Règlement sur les systèmes SYSTAC/SYGMA',
      labelEn: 'BEAC — Regulation on SYSTAC/SYGMA systems',
      url: 'https://www.beac.int',
      type: 'regulation',
    },
  ],
  '15': [
    {
      label: 'BCEAO — Instruction n°010-08-2010 relative aux règles prudentielles des SFD',
      labelEn: 'BCEAO — Instruction No. 010-08-2010 on SFD Prudential Rules',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement EMF-2017 relatif aux conditions d\'exercice et de contrôle des EMF',
      labelEn: 'COBAC — EMF-2017 Regulation on MFI operating conditions and supervision',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '16': [
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
  '17': [
    {
      label: 'OIT — Conventions internationales du travail ratifiées par les États membres UEMOA/CEMAC',
      labelEn: 'ILO — International labor conventions ratified by UEMOA/CEMAC member states',
      url: 'https://www.ilo.org',
      type: 'standard',
    },
  ],
  '18': [
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'BCEAO — Circulaire 2021 sur la gouvernance des SFD',
      labelEn: 'BCEAO — 2021 Circular on MFI governance',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
  ],
  '19': [
    {
      label: 'BCEAO — Instructions sur le contrôle interne des institutions financières',
      labelEn: 'BCEAO — Instructions on internal control for financial institutions',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement R-2001/07 sur le contrôle interne et le manuel de procédures',
      labelEn: 'COBAC — Regulation R-2001/07 on internal control and procedures manual',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
  ],
  '20': [
    {
      label: 'BCEAO — Nouvelles exigences prudentielles 2025 (ratio de solvabilité, coussin de conservation)',
      labelEn: 'BCEAO — 2025 new prudential requirements (solvency ratio, conservation buffer)',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Révision des règlements prudentiels (alignement Bâle III)',
      labelEn: 'COBAC — Revision of prudential regulations (Basel III alignment)',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'GAFI — Recommandations révisées sur la LBC/FT',
      labelEn: 'FATF — Revised recommendations on AML/CFT',
      url: 'https://www.fatf-gafi.org',
      type: 'standard',
    },
  ],
  '21': [
    {
      label: 'BCEAO — Directive UEMOA n°02/2015 relative à la LBC/FT',
      labelEn: 'BCEAO — UEMOA Directive No. 02/2015 on AML/CFT',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement CEMAC n°01/03 relatif à la LBC/FT',
      labelEn: 'COBAC — CEMAC Regulation No. 01/03 on AML/CFT',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'GIABA — Évaluations mutuelles des États membres UEMOA',
      labelEn: 'GIABA — Mutual evaluations of UEMOA member states',
      url: 'https://www.giaba.org',
      type: 'institution',
    },
    {
      label: 'GABAC — Évaluations mutuelles des États membres CEMAC',
      labelEn: 'GABAC — Mutual evaluations of CEMAC member states',
      url: 'https://www.gabac-cm.org',
      type: 'institution',
    },
  ],
  '22': [
    {
      label: 'OHADA — Acte Uniforme relatif au droit des Sociétés Commerciales (AUSC révisé 2014)',
      labelEn: 'OHADA — Uniform Act on Commercial Companies (revised AUSC 2014)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
    {
      label: 'BCEAO — Exigences de reporting financier pour les institutions financières',
      labelEn: 'BCEAO — Financial reporting requirements for financial institutions',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
  ],
  '23': [
    {
      label: 'BCEAO — Instructions sur le contrôle interne et le TFT (SYSCOHADA)',
      labelEn: 'BCEAO — Instructions on internal control and CFS (SYSCOHADA)',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlement R-2001/07 sur le contrôle interne',
      labelEn: 'COBAC — Regulation R-2001/07 on internal control',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'OHADA — Acte Uniforme relatif au Droit Comptable et à l\'Information Financière (AUDCIF 2017)',
      labelEn: 'OHADA — Uniform Act on Accounting Law and Financial Information (AUDCIF 2017)',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
  'bceao-ohada-conformite': [
    {
      label: 'BCEAO — Ensemble des instructions et circulaires prudentielles',
      labelEn: 'BCEAO — All prudential instructions and circulars',
      url: 'https://www.bceao.int',
      type: 'regulation',
    },
    {
      label: 'COBAC — Règlements prudentiels applicables aux établissements de crédit et EMF',
      labelEn: 'COBAC — Prudential regulations applicable to credit institutions and MFIs',
      url: 'https://www.cobac.org',
      type: 'regulation',
    },
    {
      label: 'OHADA — Actes Uniformes applicables aux entreprises des États membres',
      labelEn: 'OHADA — Uniform Acts applicable to companies in member states',
      url: 'https://www.ohada.com',
      type: 'standard',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SIGLES PAR ARTICLE
// Mapping article → liste des sigles présents dans le contenu
// ─────────────────────────────────────────────────────────────────────────────

export const ARTICLE_ACRONYMS: Record<string, string[]> = {
  'alm-microfinance-uemoa': ['ALM', 'SFD', 'BCEAO', 'UEMOA', 'LCR', 'BOAD', 'SRIF'],
  'alm-microfinance-cemac': ['ALM', 'EMF', 'COBAC', 'CEMAC', 'BEAC', 'BDEAC'],
  'bilan-bancaire-uemoa': ['BCEAO', 'UEMOA', 'NPL', 'LCR', 'CA', 'FCFA'],
  'bilan-bancaire-cemac': ['COBAC', 'CEMAC', 'NPL', 'CA', 'FCFA'],
  'lbcft-sfd-uemoa': ['LBC/FT', 'BCEAO', 'SFD', 'KYC', 'CENTIF', 'ABR', 'RCLBC/FT', 'GIABA', 'GAFI', 'UEMOA'],
  'lbcft-emf-cemac': ['LBC/FT', 'COBAC', 'EMF', 'KYC', 'ANIF', 'ABR', 'RCLBC/FT', 'GABAC', 'GAFI', 'CEMAC'],
  'alm-microfinance-afrique': ['ALM', 'IMF', 'EMF', 'SFD', 'BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'LCR'],
  'pme-africaines-tresorerie-70-pourcent': ['BFR', 'TFT', 'DSO', 'SYSCOHADA', 'OHADA', 'AUDCIF', 'FCFA', 'BCEAO'],
  'pilotage-financier-vs-intuition': ['SYSCOHADA', 'OHADA', 'AUDCIF', 'ROI', 'BFR', 'FCFA', 'CA', 'DAF'],
  'structuration-bilan-bancaire-afrique': ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'NPL', 'LCR', 'CA', 'FCFA'],
  'cash-flow-vs-chiffre-affaires': ['TFT', 'SYSCOHADA', 'OHADA', 'AUDCIF', 'BFR', 'DSO', 'DIO', 'DPO', 'DSCR', 'FCFA'],
  '1': ['OHADA', 'AUSC', 'RCCM', 'FAGACE', 'UEMOA', 'CEMAC', 'SYSCOHADA', 'CA'],
  '2': ['OHADA', 'SYSCOHADA', 'AUDCIF', 'BFR', 'DSCR', 'AMF-UEMOA', 'COSUMAF', 'BRVM', 'CA'],
  '3': ['IMF', 'SFD', 'EMF', 'BCEAO', 'COBAC', 'OSS', 'CGAP', 'UEMOA', 'CEMAC'],
  '4': ['ERP', 'CRM', 'ALM', 'BCEAO', 'COBAC', 'SYSCOHADA', 'ROI'],
  '5': ['ALM', 'BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'FCFA', 'DSO', 'CA'],
  '6': ['BFR', 'TFT', 'DSCR', 'ALM', 'SYSCOHADA', 'OHADA', 'AUDCIF', 'BCEAO', 'COBAC'],
  '7': ['SAS', 'AUSC', 'OHADA', 'RCCM', 'AMF-UEMOA', 'COSUMAF', 'BRVM', 'CAC', 'LTV'],
  '8': ['ACFE', 'BCEAO', 'COBAC', 'OHADA', 'FCFA', 'CA'],
  '9': ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'SFD', 'EMF', 'SRIF'],
  '10': ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'CGAP'],
  '11': ['BCEAO', 'BEAC', 'UEMOA', 'CEMAC', 'KYC'],
  '12': ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'FCFA'],
  '13': ['BOAD', 'BDEAC', 'AMF-UEMOA', 'COSUMAF', 'OHADA', 'AUSC', 'UEMOA', 'CEMAC', 'FCFA'],
  '14': ['BCEAO', 'BEAC', 'UEMOA', 'CEMAC'],
  '15': ['BCEAO', 'COBAC', 'SFD', 'EMF', 'UEMOA', 'CEMAC', 'ALM', 'CA'],
  '16': ['OHADA', 'AUSC', 'CA'],
  '17': [],
  '18': ['OHADA', 'AUSC', 'BCEAO', 'CA'],
  '19': ['TQM', 'PDCA', 'BCEAO', 'COBAC'],
  '20': ['BCEAO', 'COBAC', 'UEMOA', 'CEMAC', 'LCR', 'LBC/FT', 'GAFI'],
  '21': ['LBC/FT', 'BCEAO', 'COBAC', 'SFD', 'EMF', 'KYC', 'CENTIF', 'ANIF', 'ABR', 'RCLBC/FT', 'GIABA', 'GABAC', 'UEMOA', 'CEMAC'],
  '22': ['DAF', 'OHADA', 'AUSC', 'AUDCIF', 'SYSCOHADA', 'BCEAO', 'COBAC', 'DSO', 'BFR', 'FCFA'],
  '23': ['BCEAO', 'COBAC', 'OHADA', 'AUDCIF', 'TFT', 'SYSCOHADA', 'BFR', 'DSO'],
  'bceao-ohada-conformite': ['BCEAO', 'COBAC', 'OHADA', 'UEMOA', 'CEMAC', 'SFD', 'EMF', 'AUSC', 'AUDCIF', 'SYSCOHADA'],
};





