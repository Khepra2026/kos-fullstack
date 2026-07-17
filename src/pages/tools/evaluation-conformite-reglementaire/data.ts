export interface QuestionOption {
  value: number;
  labelFr: string;
  labelEn: string;
}

export interface ComplianceQuestion {
  id: string;
  sectionId: string;
  questionFr: string;
  questionEn: string;
  options: QuestionOption[];
  regulationRef?: string;
}

export interface ComplianceSection {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  questions: ComplianceQuestion[];
}

export const COMPLIANCE_SECTIONS: ComplianceSection[] = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Organisation',
    titleEn: 'Governance & Organization',
    descriptionFr: 'Structure de gouvernance, organes décisionnels, séparation des pouvoirs et conformité OHADA.',
    descriptionEn: 'Governance structure, decision-making bodies, separation of powers and OHADA compliance.',
    icon: 'ri-building-line',
    questions: [
      {
        id: 'gov-1',
        sectionId: 'gouvernance',
        questionFr: 'Votre organisation dispose-t-elle d\'un Conseil d\'Administration (ou organe équivalent) fonctionnel avec des réunions régulières documentées ?',
        questionEn: 'Does your organization have a functional Board of Directors (or equivalent body) with regular documented meetings?',
        regulationRef: 'OHADA AUS — Art. 441 et suivants',
        options: [
          { value: 100, labelFr: 'Oui — CA actif, PV réguliers, quorum respecté', labelEn: 'Yes — Active board, regular minutes, quorum respected' },
          { value: 50, labelFr: 'Partiellement — CA existant mais réunions irrégulières', labelEn: 'Partially — Board exists but meetings are irregular' },
          { value: 0, labelFr: 'Non — Aucun CA ou organe de gouvernance', labelEn: 'No — No board or governance body' },
          { value: -1, labelFr: 'N/A — Structure sans CA (association, ONG légère)', labelEn: 'N/A — Structure without board (association, light NGO)' },
        ],
      },
      {
        id: 'gov-2',
        sectionId: 'gouvernance',
        questionFr: 'Existe-t-il une séparation effective entre les fonctions de direction générale et de présidence du CA (ou contrôle interne) ?',
        questionEn: 'Is there an effective separation between General Management and Board Chair (or internal control) functions?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 / COBAC R-2017/01',
        options: [
          { value: 100, labelFr: 'Oui — Séparation claire avec fiches de poste distinctes', labelEn: 'Yes — Clear separation with distinct job descriptions' },
          { value: 50, labelFr: 'Partiellement — Séparation formelle mais chevauchement opérationnel', labelEn: 'Partially — Formal separation but operational overlap' },
          { value: 0, labelFr: 'Non — Cumul des fonctions DG/Président', labelEn: 'No — Combined CEO/Chairman roles' },
          { value: -1, labelFr: 'N/A — Structure familiale ou TPE', labelEn: 'N/A — Family business or very small enterprise' },
        ],
      },
      {
        id: 'gov-3',
        sectionId: 'gouvernance',
        questionFr: 'Les administrateurs/dirigeants sont-ils soumis à une politique de conflits d\'intérêts formalisée et actualisée annuellement ?',
        questionEn: 'Are directors/executives subject to a formalized conflict of interest policy updated annually?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 — COBAC Règlement 2017/01',
        options: [
          { value: 100, labelFr: 'Oui — Déclarations annuelles, registre tenu à jour', labelEn: 'Yes — Annual declarations, up-to-date register' },
          { value: 50, labelFr: 'Partiellement — Politique existante mais déclarations sporadiques', labelEn: 'Partially — Policy exists but declarations are sporadic' },
          { value: 0, labelFr: 'Non — Aucune politique de conflits d\'intérêts', labelEn: 'No — No conflict of interest policy' },
          { value: -1, labelFr: 'N/A — Structure sans administrateurs', labelEn: 'N/A — Structure without directors' },
        ],
      },
      {
        id: 'gov-4',
        sectionId: 'gouvernance',
        questionFr: 'Votre organisation dispose-t-elle d\'un manuel de procédures à jour, approuvé par les organes de gouvernance ?',
        questionEn: 'Does your organization have an up-to-date procedures manual approved by governance bodies?',
        regulationRef: 'OHADA SYSCOHADA révisé / BCEAO Instruction n°010-08-2010',
        options: [
          { value: 100, labelFr: 'Oui — Manuel complet, révisé < 12 mois, approuvé par le CA', labelEn: 'Yes — Complete manual, revised < 12 months, approved by board' },
          { value: 50, labelFr: 'Partiellement — Manuel existant mais obsolète (> 24 mois)', labelEn: 'Partially — Manual exists but outdated (> 24 months)' },
          { value: 0, labelFr: 'Non — Aucun manuel de procédures formalisé', labelEn: 'No — No formalized procedures manual' },
          { value: -1, labelFr: 'N/A — Activité sans procédures formalisées requises', labelEn: 'N/A — Activity without required formal procedures' },
        ],
      },
      {
        id: 'gov-5',
        sectionId: 'gouvernance',
        questionFr: 'Un dispositif de contrôle interne (ou audit interne) est-il en place et opérationnel ?',
        questionEn: 'Is an internal control (or internal audit) system in place and operational?',
        regulationRef: 'BCEAO Instruction n°010-08-2010 / COBAC R-93/13',
        options: [
          { value: 100, labelFr: 'Oui — Contrôle interne structuré avec plan annuel et rapports', labelEn: 'Yes — Structured internal control with annual plan and reports' },
          { value: 50, labelFr: 'Partiellement — Contrôle informel ou ponctuel', labelEn: 'Partially — Informal or occasional control' },
          { value: 0, labelFr: 'Non — Aucun dispositif de contrôle interne', labelEn: 'No — No internal control system' },
          { value: -1, labelFr: 'N/A — TPE sans obligation de contrôle interne', labelEn: 'N/A — Very small enterprise without internal control obligation' },
        ],
      },
    ],
  },
  {
    id: 'kyc',
    titleFr: 'KYC — Connaissance du Client',
    titleEn: 'KYC — Know Your Customer',
    descriptionFr: 'Identification, vérification et due diligence des clients conformément aux exigences BCEAO/BEAC.',
    descriptionEn: 'Identification, verification and customer due diligence in accordance with BCEAO/BEAC requirements.',
    icon: 'ri-user-search-line',
    questions: [
      {
        id: 'kyc-1',
        sectionId: 'kyc',
        questionFr: 'Votre organisation applique-t-elle une procédure d\'identification et de vérification d\'identité pour tous les nouveaux clients (personnes physiques et morales) ?',
        questionEn: 'Does your organization apply an identity identification and verification procedure for all new customers (natural and legal persons)?',
        regulationRef: 'BCEAO Instruction n°008-05-2014 / BEAC Règlement 01/CEMAC/UMAC/COBAC',
        options: [
          { value: 100, labelFr: 'Oui — ID systématique, pièces justificatives collectées et vérifiées', labelEn: 'Yes — Systematic ID, supporting documents collected and verified' },
          { value: 50, labelFr: 'Partiellement — ID pour certains clients seulement', labelEn: 'Partially — ID for some customers only' },
          { value: 0, labelFr: 'Non — Aucune procédure KYC formalisée', labelEn: 'No — No formalized KYC procedure' },
          { value: -1, labelFr: 'N/A — Activité sans relation client directe', labelEn: 'N/A — Activity without direct customer relationship' },
        ],
      },
      {
        id: 'kyc-2',
        sectionId: 'kyc',
        questionFr: 'Les clients à risque élevé (PEP, clients étrangers, secteurs sensibles) font-ils l\'objet d\'une due diligence renforcée (EDD) ?',
        questionEn: 'Are high-risk customers (PEPs, foreign customers, sensitive sectors) subject to enhanced due diligence (EDD)?',
        regulationRef: 'GIABA/GABAC — Recommandations 10, 12 et 22 du GAFI',
        options: [
          { value: 100, labelFr: 'Oui — EDD systématique avec documentation et approbation hiérarchique', labelEn: 'Yes — Systematic EDD with documentation and hierarchical approval' },
          { value: 50, labelFr: 'Partiellement — EDD ponctuelle sans formalisation', labelEn: 'Partially — Occasional EDD without formalization' },
          { value: 0, labelFr: 'Non — Aucune distinction de risque client', labelEn: 'No — No customer risk distinction' },
          { value: -1, labelFr: 'N/A — Clientèle locale homogène sans risque élevé identifié', labelEn: 'N/A — Homogeneous local clientele without identified high risk' },
        ],
      },
      {
        id: 'kyc-3',
        sectionId: 'kyc',
        questionFr: 'Les données KYC des clients sont-elles mises à jour régulièrement (au moins tous les 2-3 ans pour les clients standards) ?',
        questionEn: 'Are customer KYC data updated regularly (at least every 2-3 years for standard customers)?',
        regulationRef: 'BCEAO Instruction n°008-05-2014 — Art. 15',
        options: [
          { value: 100, labelFr: 'Oui — Mise à jour périodique planifiée et documentée', labelEn: 'Yes — Planned and documented periodic updates' },
          { value: 50, labelFr: 'Partiellement — Mise à jour ponctuelle sans calendrier', labelEn: 'Partially — Occasional updates without schedule' },
          { value: 0, labelFr: 'Non — Aucune mise à jour des données KYC', labelEn: 'No — No KYC data updates' },
          { value: -1, labelFr: 'N/A — Activité sans obligation de mise à jour KYC', labelEn: 'N/A — Activity without KYC update obligation' },
        ],
      },
      {
        id: 'kyc-4',
        sectionId: 'kyc',
        questionFr: 'Votre organisation vérifie-t-elle les clients et bénéficiaires effectifs contre les listes de sanctions nationales et internationales (ONU, UE, OFAC) ?',
        questionEn: 'Does your organization screen customers and beneficial owners against national and international sanctions lists (UN, EU, OFAC)?',
        regulationRef: 'Résolutions ONU 1267, 1373 / Règlements UE 2580/2001, 881/2002',
        options: [
          { value: 100, labelFr: 'Oui — Filtrage automatique ou manuel systématique avant ouverture', labelEn: 'Yes — Systematic automatic or manual screening before onboarding' },
          { value: 50, labelFr: 'Partiellement — Vérification ponctuelle sans processus formalisé', labelEn: 'Partially — Occasional checks without formalized process' },
          { value: 0, labelFr: 'Non — Aucune vérification des listes de sanctions', labelEn: 'No — No sanctions list screening' },
          { value: -1, labelFr: 'N/A — Activité non soumise aux sanctions internationales', labelEn: 'N/A — Activity not subject to international sanctions' },
        ],
      },
      {
        id: 'kyc-5',
        sectionId: 'kyc',
        questionFr: 'Les bénéficiaires effectifs (personnes qui détiennent >25% du capital ou contrôlent l\'entité) sont-ils identifiés et documentés pour les personnes morales ?',
        questionEn: 'Are beneficial owners (persons holding >25% of capital or controlling the entity) identified and documented for legal persons?',
        regulationRef: 'GAFI Recommandation 24 / BCEAO Instruction n°008-05-2014',
        options: [
          { value: 100, labelFr: 'Oui — Identification systématique avec registre des bénéficiaires', labelEn: 'Yes — Systematic identification with beneficial owner register' },
          { value: 50, labelFr: 'Partiellement — Identification pour certaines entités seulement', labelEn: 'Partially — Identification for some entities only' },
          { value: 0, labelFr: 'Non — Aucune identification des bénéficiaires effectifs', labelEn: 'No — No beneficial owner identification' },
          { value: -1, labelFr: 'N/A — Clientèle exclusivement personnes physiques', labelEn: 'N/A — Exclusively natural person clientele' },
        ],
      },
    ],
  },
  {
    id: 'labft',
    titleFr: 'LAB/FT — Lutte Anti-Blanchiment & Terrorisme',
    titleEn: 'AML/CFT — Anti-Money Laundering & Terrorism Financing',
    descriptionFr: 'Dispositif de détection, de surveillance et de déclaration des opérations suspectes.',
    descriptionEn: 'System for detecting, monitoring and reporting suspicious transactions.',
    icon: 'ri-shield-flash-line',
    questions: [
      {
        id: 'lab-1',
        sectionId: 'labft',
        questionFr: 'Votre organisation dispose-t-elle d\'un manuel LAB/FT (ou AML/CFT) approuvé et communiqué à l\'ensemble du personnel ?',
        questionEn: 'Does your organization have an approved AML/CFT manual communicated to all staff?',
        regulationRef: 'BCEAO Instruction n°008-05-2014 / COBAC R-2017/01 — Art. 45',
        options: [
          { value: 100, labelFr: 'Oui — Manuel à jour, formation annuelle, attestations signées', labelEn: 'Yes — Up-to-date manual, annual training, signed attestations' },
          { value: 50, labelFr: 'Partiellement — Manuel existant mais formation irrégulière', labelEn: 'Partially — Manual exists but training is irregular' },
          { value: 0, labelFr: 'Non — Aucun manuel LAB/FT', labelEn: 'No — No AML/CFT manual' },
          { value: -1, labelFr: 'N/A — Activité non financière sans obligation LAB/FT', labelEn: 'N/A — Non-financial activity without AML/CFT obligation' },
        ],
      },
      {
        id: 'lab-2',
        sectionId: 'labft',
        questionFr: 'Un dispositif de surveillance des transactions (monitoring) est-il en place pour détecter les opérations suspectes ?',
        questionEn: 'Is a transaction monitoring system in place to detect suspicious operations?',
        regulationRef: 'BCEAO Instruction n°008-05-2014 — Art. 28-32 / COBAC R-2017/01',
        options: [
          { value: 100, labelFr: 'Oui — Seuils définis, alertes automatisées, investigation formalisée', labelEn: 'Yes — Defined thresholds, automated alerts, formalized investigation' },
          { value: 50, labelFr: 'Partiellement — Surveillance manuelle sans seuils formalisés', labelEn: 'Partially — Manual monitoring without formalized thresholds' },
          { value: 0, labelFr: 'Non — Aucune surveillance des transactions', labelEn: 'No — No transaction monitoring' },
          { value: -1, labelFr: 'N/A — Faible volume de transactions (< 100/mois)', labelEn: 'N/A — Low transaction volume (< 100/month)' },
        ],
      },
      {
        id: 'lab-3',
        sectionId: 'labft',
        questionFr: 'Les opérations suspectes sont-elles déclarées au service de renseignement financier (CENTIF, ANIF ou équivalent) dans les délais légaux ?',
        questionEn: 'Are suspicious transactions reported to the financial intelligence unit (CENTIF, ANIF or equivalent) within legal deadlines?',
        regulationRef: 'Directive UEMOA n°02/2015 / Règlement CEMAC n°01/03 — Art. 12',
        options: [
          { value: 100, labelFr: 'Oui — Déclarations dans les 5 jours, registre des STR tenu', labelEn: 'Yes — Reports within 5 days, STR register maintained' },
          { value: 50, labelFr: 'Partiellement — Déclarations sporadiques sans registre', labelEn: 'Partially — Sporadic reports without register' },
          { value: 0, labelFr: 'Non — Aucune déclaration de suspicion effectuée', labelEn: 'No — No suspicious transaction reports filed' },
          { value: -1, labelFr: 'N/A — Activité non soumise à déclaration STR', labelEn: 'N/A — Activity not subject to STR reporting' },
        ],
      },
      {
        id: 'lab-4',
        sectionId: 'labft',
        questionFr: 'Un responsable de la conformité LAB/FT (ou DMLRO) est-il désigné, formé et doté de l\'autorité nécessaire ?',
        questionEn: 'Is an AML/CFT compliance officer (or DMLRO) designated, trained and given the necessary authority?',
        regulationRef: 'BCEAO Instruction n°008-05-2014 — Art. 8 / COBAC R-2017/01 — Art. 42',
        options: [
          { value: 100, labelFr: 'Oui — DMLRO désigné, formé certifié, indépendance opérationnelle', labelEn: 'Yes — DMLRO designated, certified training, operational independence' },
          { value: 50, labelFr: 'Partiellement — Responsable désigné mais sans formation spécifique', labelEn: 'Partially — Officer designated but without specific training' },
          { value: 0, labelFr: 'Non — Aucun responsable LAB/FT désigné', labelEn: 'No — No AML/CFT officer designated' },
          { value: -1, labelFr: 'N/A — TPE avec exemption de désignation DMLRO', labelEn: 'N/A — Very small enterprise exempt from DMLRO designation' },
        ],
      },
      {
        id: 'lab-5',
        sectionId: 'labft',
        questionFr: 'Votre organisation effectue-t-elle une évaluation des risques LAB/FT (ERA) documentée et actualisée au moins annuellement ?',
        questionEn: 'Does your organization conduct a documented AML/CFT risk assessment (ERA) updated at least annually?',
        regulationRef: 'GAFI Recommandation 1 / BCEAO Instruction n°008-05-2014 — Art. 6',
        options: [
          { value: 100, labelFr: 'Oui — ERA complète, révisée annuellement, approuvée par le CA', labelEn: 'Yes — Complete ERA, revised annually, approved by board' },
          { value: 50, labelFr: 'Partiellement — Évaluation ponctuelle sans mise à jour régulière', labelEn: 'Partially — Occasional assessment without regular updates' },
          { value: 0, labelFr: 'Non — Aucune évaluation des risques LAB/FT', labelEn: 'No — No AML/CFT risk assessment' },
          { value: -1, labelFr: 'N/A — Activité non soumise à l\'évaluation des risques LAB/FT', labelEn: 'N/A — Activity not subject to AML/CFT risk assessment' },
        ],
      },
    ],
  },
  {
    id: 'fatca-crs',
    titleFr: 'FATCA / CRS',
    titleEn: 'FATCA / CRS',
    descriptionFr: 'Conformité aux standards internationaux d\'échange automatique d\'informations fiscales.',
    descriptionEn: 'Compliance with international automatic exchange of tax information standards.',
    icon: 'ri-global-line',
    questions: [
      {
        id: 'fatca-1',
        sectionId: 'fatca-crs',
        questionFr: 'Votre organisation a-t-elle identifié sa classification FATCA/CRS (FFI, NFFE, exemptée) et déclaré son statut à l\'administration fiscale ?',
        questionEn: 'Has your organization identified its FATCA/CRS classification (FFI, NFFE, exempt) and declared its status to the tax administration?',
        regulationRef: 'Accords FATCA (IGA) / Convention multilatérale CRS (MCAA)',
        options: [
          { value: 100, labelFr: 'Oui — Classification établie, déclaration effectuée, GIIN obtenu si FFI', labelEn: 'Yes — Classification established, declaration filed, GIIN obtained if FFI' },
          { value: 50, labelFr: 'Partiellement — Classification connue mais déclaration non finalisée', labelEn: 'Partially — Classification known but declaration not finalized' },
          { value: 0, labelFr: 'Non — Aucune prise en compte de FATCA/CRS', labelEn: 'No — No FATCA/CRS consideration' },
          { value: -1, labelFr: 'N/A — Entité purement locale sans liens transfrontaliers', labelEn: 'N/A — Purely local entity without cross-border links' },
        ],
      },
      {
        id: 'fatca-2',
        sectionId: 'fatca-crs',
        questionFr: 'Les comptes des clients américains (FATCA) et des résidents fiscaux étrangers (CRS) sont-ils identifiés et déclarés conformément aux échéances ?',
        questionEn: 'Are accounts of US customers (FATCA) and foreign tax residents (CRS) identified and reported according to deadlines?',
        regulationRef: 'FATCA IGA / CRS MCAA — Échéances annuelles 31 mai',
        options: [
          { value: 100, labelFr: 'Oui — Déclarations annuelles dans les délais, contrôles documentés', labelEn: 'Yes — Annual reports on time, documented controls' },
          { value: 50, labelFr: 'Partiellement — Identification des comptes mais déclarations irrégulières', labelEn: 'Partially — Account identification but irregular reporting' },
          { value: 0, labelFr: 'Non — Aucun processus FATCA/CRS en place', labelEn: 'No — No FATCA/CRS process in place' },
          { value: -1, labelFr: 'N/A — Aucun client américain ni résident fiscal étranger', labelEn: 'N/A — No US customers or foreign tax residents' },
        ],
      },
      {
        id: 'fatca-3',
        sectionId: 'fatca-crs',
        questionFr: 'Le personnel concerné a-t-il été formé aux obligations FATCA/CRS et aux procédures d\'identification des indiciaires ?',
        questionEn: 'Have relevant staff been trained on FATCA/CRS obligations and indicia identification procedures?',
        regulationRef: 'OCDE CRS — Section VIII / FATCA IGA — Section 3',
        options: [
          { value: 100, labelFr: 'Oui — Formation annuelle, procédures d\'identification des indiciaires formalisées', labelEn: 'Yes — Annual training, formalized indicia identification procedures' },
          { value: 50, labelFr: 'Partiellement — Sensibilisation informelle sans procédures', labelEn: 'Partially — Informal awareness without procedures' },
          { value: 0, labelFr: 'Non — Aucune formation ni sensibilisation FATCA/CRS', labelEn: 'No — No FATCA/CRS training or awareness' },
          { value: -1, labelFr: 'N/A — Entité non soumise aux obligations FATCA/CRS', labelEn: 'N/A — Entity not subject to FATCA/CRS obligations' },
        ],
      },
      {
        id: 'fatca-4',
        sectionId: 'fatca-crs',
        questionFr: 'Les auto-certifications FATCA/CRS des clients sont-elles collectées, vérifiées et conservées conformément aux exigences ?',
        questionEn: 'Are customer FATCA/CRS self-certifications collected, verified and retained in accordance with requirements?',
        regulationRef: 'CRS MCAA — Section VII / FATCA IGA — Annex I',
        options: [
          { value: 100, labelFr: 'Oui — Auto-certifications systématiques, vérification, conservation 5+ ans', labelEn: 'Yes — Systematic self-certifications, verification, 5+ year retention' },
          { value: 50, labelFr: 'Partiellement — Collecte ponctuelle sans vérification rigoureuse', labelEn: 'Partially — Occasional collection without rigorous verification' },
          { value: 0, labelFr: 'Non — Aucune auto-certification collectée', labelEn: 'No — No self-certifications collected' },
          { value: -1, labelFr: 'N/A — Entité exemptée de FATCA/CRS', labelEn: 'N/A — Entity exempt from FATCA/CRS' },
        ],
      },
    ],
  },
  {
    id: 'deontologie',
    titleFr: 'Déontologie & Éthique',
    titleEn: 'Ethics & Professional Conduct',
    descriptionFr: 'Code de déontologie, prévention de la corruption, protection des lanceurs d\'alerte.',
    descriptionEn: 'Code of ethics, corruption prevention, whistleblower protection.',
    icon: 'ri-scales-3-line',
    questions: [
      {
        id: 'deo-1',
        sectionId: 'deontologie',
        questionFr: 'Votre organisation dispose-t-elle d\'un code de déontologie (ou charte éthique) approuvé par les organes de gouvernance et communiqué à tous les collaborateurs ?',
        questionEn: 'Does your organization have a code of ethics (or ethical charter) approved by governance bodies and communicated to all employees?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 / COBAC R-2017/01 — Art. 38',
        options: [
          { value: 100, labelFr: 'Oui — Code adopté, signé par tous, révision périodique', labelEn: 'Yes — Code adopted, signed by all, periodic review' },
          { value: 50, labelFr: 'Partiellement — Code existant mais non signé par tous', labelEn: 'Partially — Code exists but not signed by all' },
          { value: 0, labelFr: 'Non — Aucun code de déontologie', labelEn: 'No — No code of ethics' },
          { value: -1, labelFr: 'N/A — Structure trop petite pour un code formalisé', labelEn: 'N/A — Structure too small for a formalized code' },
        ],
      },
      {
        id: 'deo-2',
        sectionId: 'deontologie',
        questionFr: 'Un dispositif de prévention de la corruption (anti-corruption) est-il en place avec une cartographie des risques corruption ?',
        questionEn: 'Is an anti-corruption prevention system in place with a corruption risk mapping?',
        regulationRef: 'Convention des Nations Unies contre la corruption (CNUCC) / LOI n°2018-006 Togo',
        options: [
          { value: 100, labelFr: 'Oui — Cartographie, procédures, formation, canal éthique opérationnel', labelEn: 'Yes — Mapping, procedures, training, operational ethics channel' },
          { value: 50, labelFr: 'Partiellement — Mesures ponctuelles sans cartographie', labelEn: 'Partially — Occasional measures without mapping' },
          { value: 0, labelFr: 'Non — Aucune mesure anti-corruption', labelEn: 'No — No anti-corruption measures' },
          { value: -1, labelFr: 'N/A — Secteur à faible exposition corruption', labelEn: 'N/A — Low corruption exposure sector' },
        ],
      },
      {
        id: 'deo-3',
        sectionId: 'deontologie',
        questionFr: 'Un canal de signalement (lanceur d\'alerte) est-il accessible, protégé et opérationnel pour signaler les violations éthiques ?',
        questionEn: 'Is a whistleblowing channel accessible, protected and operational for reporting ethical violations?',
        regulationRef: 'Directive UE 2019/1937 / LOI n°2018-006 Togo — Art. 28-35',
        options: [
          { value: 100, labelFr: 'Oui — Canal anonyme, protection garantie, traitement formalisé', labelEn: 'Yes — Anonymous channel, guaranteed protection, formalized processing' },
          { value: 50, labelFr: 'Partiellement — Canal existant mais sans garantie de protection', labelEn: 'Partially — Channel exists but without protection guarantee' },
          { value: 0, labelFr: 'Non — Aucun canal de signalement', labelEn: 'No — No reporting channel' },
          { value: -1, labelFr: 'N/A — Structure < 50 personnes sans obligation', labelEn: 'N/A — Structure < 50 people without obligation' },
        ],
      },
      {
        id: 'deo-4',
        sectionId: 'deontologie',
        questionFr: 'Les cadeaux, invitations et avantages offerts/reçus par le personnel font-ils l\'objet d\'une politique formalisée avec des seuils et un registre ?',
        questionEn: 'Are gifts, invitations and benefits offered/received by staff subject to a formalized policy with thresholds and a register?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 / COBAC R-2017/01 — Art. 40',
        options: [
          { value: 100, labelFr: 'Oui — Politique claire, seuils définis, registre tenu, déclarations annuelles', labelEn: 'Yes — Clear policy, defined thresholds, maintained register, annual declarations' },
          { value: 50, labelFr: 'Partiellement — Règles informelles sans registre', labelEn: 'Partially — Informal rules without register' },
          { value: 0, labelFr: 'Non — Aucune politique sur les cadeaux et avantages', labelEn: 'No — No policy on gifts and benefits' },
          { value: -1, labelFr: 'N/A — Activité sans échange de cadeaux avec tiers', labelEn: 'N/A — Activity without gift exchange with third parties' },
        ],
      },
    ],
  },
  {
    id: 'pic',
    titleFr: 'Protection de la Clientèle (PIC)',
    titleEn: 'Customer Protection (PIC)',
    descriptionFr: 'Information, transparence, traitement des réclamations et protection des données clients.',
    descriptionEn: 'Information, transparency, complaint handling and customer data protection.',
    icon: 'ri-shield-user-line',
    questions: [
      {
        id: 'pic-1',
        sectionId: 'pic',
        questionFr: 'Les clients reçoivent-ils des informations claires et complètes sur les produits/services (coûts, risques, conditions de résiliation) avant contractualisation ?',
        questionEn: 'Do customers receive clear and complete information on products/services (costs, risks, termination conditions) before contracting?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 — Art. 55 / COBAC R-2017/01 — Art. 60',
        options: [
          { value: 100, labelFr: 'Oui — Fiches standardisées, explication orale, délai de réflexion respecté', labelEn: 'Yes — Standardized sheets, oral explanation, reflection period respected' },
          { value: 50, labelFr: 'Partiellement — Informations fournies mais non standardisées', labelEn: 'Partially — Information provided but not standardized' },
          { value: 0, labelFr: 'Non — Aucune information précontractuelle formalisée', labelEn: 'No — No formalized pre-contractual information' },
          { value: -1, labelFr: 'N/A — Activité B2B sans clientèle de détail', labelEn: 'N/A — B2B activity without retail clientele' },
        ],
      },
      {
        id: 'pic-2',
        sectionId: 'pic',
        questionFr: 'Un dispositif de traitement des réclamations clients est-il en place, accessible et documenté avec des délais de réponse ?',
        questionEn: 'Is a customer complaint handling system in place, accessible and documented with response deadlines?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 — Art. 58 / COBAC R-2017/01 — Art. 63',
        options: [
          { value: 100, labelFr: 'Oui — Procédure formalisée, délai 15 jours, registre, rapport annuel au CA', labelEn: 'Yes — Formalized procedure, 15-day deadline, register, annual report to board' },
          { value: 50, labelFr: 'Partiellement — Réclamations traitées mais sans procédure formalisée', labelEn: 'Partially — Complaints handled but without formalized procedure' },
          { value: 0, labelFr: 'Non — Aucun dispositif de traitement des réclamations', labelEn: 'No — No complaint handling system' },
          { value: -1, labelFr: 'N/A — Activité sans réclamation client significative', labelEn: 'N/A — Activity without significant customer complaints' },
        ],
      },
      {
        id: 'pic-3',
        sectionId: 'pic',
        questionFr: 'Les données personnelles des clients sont-elles collectées, traitées et conservées conformément à la réglementation en vigueur (loi sur la protection des données) ?',
        questionEn: 'Are customer personal data collected, processed and retained in accordance with applicable regulations (data protection law)?',
        regulationRef: 'Loi n°2019-014 Togo (Protection des données) / RGPD (si applicable) / Loi n°001/2021 CEMAC',
        options: [
          { value: 100, labelFr: 'Oui — Consentement, politique de confidentialité, registre des traitements, DPO si requis', labelEn: 'Yes — Consent, privacy policy, processing register, DPO if required' },
          { value: 50, labelFr: 'Partiellement — Données protégées mais sans politique formalisée', labelEn: 'Partially — Data protected but without formalized policy' },
          { value: 0, labelFr: 'Non — Aucune mesure de protection des données clients', labelEn: 'No — No customer data protection measures' },
          { value: -1, labelFr: 'N/A — Aucune collecte de données personnelles', labelEn: 'N/A — No personal data collection' },
        ],
      },
      {
        id: 'pic-4',
        sectionId: 'pic',
        questionFr: 'Les clients vulnérables (personnes âgées, analphabètes, handicapées) bénéficient-ils d\'un traitement adapté et de mesures de protection spécifiques ?',
        questionEn: 'Do vulnerable customers (elderly, illiterate, disabled) receive adapted treatment and specific protection measures?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 — Art. 56 / Principes de protection de la clientèle UEMOA',
        options: [
          { value: 100, labelFr: 'Oui — Procédures adaptées, formation du personnel, documentation simplifiée', labelEn: 'Yes — Adapted procedures, staff training, simplified documentation' },
          { value: 50, labelFr: 'Partiellement — Sensibilisation informelle sans procédures', labelEn: 'Partially — Informal awareness without procedures' },
          { value: 0, labelFr: 'Non — Aucune prise en compte des clients vulnérables', labelEn: 'No — No consideration for vulnerable customers' },
          { value: -1, labelFr: 'N/A — Clientèle ne comportant pas de personnes vulnérables', labelEn: 'N/A — Clientele without vulnerable persons' },
        ],
      },
    ],
  },
  {
    id: 'transverses',
    titleFr: 'Dispositifs Transverses',
    titleEn: 'Cross-cutting Systems',
    descriptionFr: 'Gestion des risques, continuité d\'activité, sécurité informatique et audit externe.',
    descriptionEn: 'Risk management, business continuity, IT security and external audit.',
    icon: 'ri-settings-3-line',
    questions: [
      {
        id: 'trv-1',
        sectionId: 'transverses',
        questionFr: 'Votre organisation dispose-t-elle d\'une cartographie des risques actualisée couvrant les risques opérationnels, financiers, juridiques et de conformité ?',
        questionEn: 'Does your organization have an up-to-date risk mapping covering operational, financial, legal and compliance risks?',
        regulationRef: 'BCEAO Instruction n°010-08-2010 / COBAC R-93/13 — Art. 15',
        options: [
          { value: 100, labelFr: 'Oui — Cartographie complète, révision annuelle, comité des risques, indicateurs', labelEn: 'Yes — Complete mapping, annual review, risk committee, indicators' },
          { value: 50, labelFr: 'Partiellement — Cartographie existante mais partielle ou obsolète', labelEn: 'Partially — Mapping exists but partial or outdated' },
          { value: 0, labelFr: 'Non — Aucune cartographie des risques', labelEn: 'No — No risk mapping' },
          { value: -1, labelFr: 'N/A — Activité à très faible exposition aux risques', labelEn: 'N/A — Very low risk exposure activity' },
        ],
      },
      {
        id: 'trv-2',
        sectionId: 'transverses',
        questionFr: 'Un plan de continuité d\'activité (PCA) et un plan de reprise d\'activité (PRA) sont-ils élaborés, testés et mis à jour régulièrement ?',
        questionEn: 'Are a business continuity plan (BCP) and disaster recovery plan (DRP) developed, tested and regularly updated?',
        regulationRef: 'BCEAO Instruction n°010-08-2010 — Art. 22 / COBAC R-93/13 — Art. 25',
        options: [
          { value: 100, labelFr: 'Oui — PCA/PRA documentés, tests annuels, mise à jour biennale', labelEn: 'Yes — BCP/DRP documented, annual tests, biennial updates' },
          { value: 50, labelFr: 'Partiellement — Plan existant mais jamais testé', labelEn: 'Partially — Plan exists but never tested' },
          { value: 0, labelFr: 'Non — Aucun plan de continuité', labelEn: 'No — No continuity plan' },
          { value: -1, labelFr: 'N/A — Activité sans criticité opérationnelle', labelEn: 'N/A — Activity without operational criticality' },
        ],
      },
      {
        id: 'trv-3',
        sectionId: 'transverses',
        questionFr: 'La sécurité informatique (cybersécurité) est-elle formalisée avec des politiques, des contrôles d\'accès et des sauvegardes régulières ?',
        questionEn: 'Is IT security (cybersecurity) formalized with policies, access controls and regular backups?',
        regulationRef: 'BCEAO Instruction n°010-06-2019 / COBAC Note 2018/01',
        options: [
          { value: 100, labelFr: 'Oui — Politique SI, contrôles d\'accès, sauvegardes, tests d\'intrusion, formation', labelEn: 'Yes — IT policy, access controls, backups, penetration tests, training' },
          { value: 50, labelFr: 'Partiellement — Antivirus et sauvegardes mais sans politique formalisée', labelEn: 'Partially — Antivirus and backups but without formalized policy' },
          { value: 0, labelFr: 'Non — Aucune mesure de sécurité informatique', labelEn: 'No — No IT security measures' },
          { value: -1, labelFr: 'N/A — Activité sans système informatique', labelEn: 'N/A — Activity without IT system' },
        ],
      },
      {
        id: 'trv-4',
        sectionId: 'transverses',
        questionFr: 'Les états financiers sont-ils audités annuellement par un commissaire aux comptes (ou cabinet d\'audit) agréé ?',
        questionEn: 'Are financial statements audited annually by an approved statutory auditor (or audit firm)?',
        regulationRef: 'OHADA AUS — Art. 64 et suivants / BCEAO Instruction n°010-08-2010',
        options: [
          { value: 100, labelFr: 'Oui — Audit externe annuel, rapport certifié, recommandations suivies', labelEn: 'Yes — Annual external audit, certified report, recommendations followed' },
          { value: 50, labelFr: 'Partiellement — Audit ponctuel ou révision contractuelle sans certification', labelEn: 'Partially — Occasional audit or contractual review without certification' },
          { value: 0, labelFr: 'Non — Aucun audit externe des états financiers', labelEn: 'No — No external audit of financial statements' },
          { value: -1, labelFr: 'N/A — Entité non soumise à l\'audit légal (TPE, association)', labelEn: 'N/A — Entity not subject to statutory audit (very small enterprise, association)' },
        ],
      },
      {
        id: 'trv-5',
        sectionId: 'transverses',
        questionFr: 'Votre organisation dispose-t-elle d\'un dispositif de gestion de la conformité (compliance) avec un responsable désigné et un plan de contrôle ?',
        questionEn: 'Does your organization have a compliance management system with a designated officer and a control plan?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 / COBAC R-2017/01 — Art. 44',
        options: [
          { value: 100, labelFr: 'Oui — Responsable conformité, plan de contrôle annuel, cartographie réglementaire', labelEn: 'Yes — Compliance officer, annual control plan, regulatory mapping' },
          { value: 50, labelFr: 'Partiellement — Conformité gérée de manière informelle', labelEn: 'Partially — Compliance managed informally' },
          { value: 0, labelFr: 'Non — Aucun dispositif de gestion de la conformité', labelEn: 'No — No compliance management system' },
          { value: -1, labelFr: 'N/A — TPE sans obligation de conformité formalisée', labelEn: 'N/A — Very small enterprise without formal compliance obligation' },
        ],
      },
    ],
  },
  {
    id: 'pilotage',
    titleFr: 'Pilotage & Reporting',
    titleEn: 'Management & Reporting',
    descriptionFr: 'Tableaux de bord, reporting réglementaire, indicateurs de performance et suivi des recommandations.',
    descriptionEn: 'Dashboards, regulatory reporting, performance indicators and recommendation follow-up.',
    icon: 'ri-bar-chart-grouped-line',
    questions: [
      {
        id: 'pil-1',
        sectionId: 'pilotage',
        questionFr: 'Votre organisation produit-elle des tableaux de bord de conformité et de risques régulièrement (au moins mensuellement) ?',
        questionEn: 'Does your organization produce compliance and risk dashboards regularly (at least monthly)?',
        regulationRef: 'BCEAO Instruction n°010-08-2010 / COBAC R-93/13 — Art. 30',
        options: [
          { value: 100, labelFr: 'Oui — Tableaux de bord mensuels, revue par le CA/Comité des risques', labelEn: 'Yes — Monthly dashboards, reviewed by board/Risk Committee' },
          { value: 50, labelFr: 'Partiellement — Reporting ponctuel sans régularité', labelEn: 'Partially — Occasional reporting without regularity' },
          { value: 0, labelFr: 'Non — Aucun tableau de bord de conformité', labelEn: 'No — No compliance dashboard' },
          { value: -1, labelFr: 'N/A — Structure sans obligation de reporting réglementaire', labelEn: 'N/A — Structure without regulatory reporting obligation' },
        ],
      },
      {
        id: 'pil-2',
        sectionId: 'pilotage',
        questionFr: 'Les rapports réglementaires (BCEAO, COBAC, CENTIF/ANIF, administration fiscale) sont-ils déposés dans les délais et avec l\'exactitude requise ?',
        questionEn: 'Are regulatory reports (BCEAO, COBAC, CENTIF/ANIF, tax administration) filed on time and with required accuracy?',
        regulationRef: 'BCEAO Instructions n°010-08-2010, n°007-02-2018 / COBAC R-93/13, R-2017/01',
        options: [
          { value: 100, labelFr: 'Oui — Tous les rapports dans les délais, contrôle qualité, historique conservé', labelEn: 'Yes — All reports on time, quality control, maintained history' },
          { value: 50, labelFr: 'Partiellement — Rapports déposés mais retards occasionnels ou erreurs', labelEn: 'Partially — Reports filed but occasional delays or errors' },
          { value: 0, labelFr: 'Non — Retards systématiques ou rapports non déposés', labelEn: 'No — Systematic delays or reports not filed' },
          { value: -1, labelFr: 'N/A — Entité non soumise au reporting réglementaire', labelEn: 'N/A — Entity not subject to regulatory reporting' },
        ],
      },
      {
        id: 'pil-3',
        sectionId: 'pilotage',
        questionFr: 'Les recommandations issues des audits internes, externes et des inspections réglementaires sont-elles suivies avec un plan d\'action et des échéances ?',
        questionEn: 'Are recommendations from internal audits, external audits and regulatory inspections followed up with an action plan and deadlines?',
        regulationRef: 'BCEAO Instruction n°010-08-2010 — Art. 35 / COBAC R-93/13 — Art. 35',
        options: [
          { value: 100, labelFr: 'Oui — Registre des recommandations, plan d\'action, suivi trimestriel, taux de réalisation > 80%', labelEn: 'Yes — Recommendation register, action plan, quarterly follow-up, > 80% completion rate' },
          { value: 50, labelFr: 'Partiellement — Recommandations connues mais suivi informel', labelEn: 'Partially — Recommendations known but informal follow-up' },
          { value: 0, labelFr: 'Non — Aucun suivi des recommandations d\'audit', labelEn: 'No — No audit recommendation follow-up' },
          { value: -1, labelFr: 'N/A — Aucun audit ni inspection réalisé récemment', labelEn: 'N/A — No recent audit or inspection' },
        ],
      },
      {
        id: 'pil-4',
        sectionId: 'pilotage',
        questionFr: 'Les indicateurs clés de performance (KPI) et de conformité sont-ils définis, mesurés et communiqués aux organes de décision ?',
        questionEn: 'Are key performance indicators (KPIs) and compliance indicators defined, measured and communicated to decision-making bodies?',
        regulationRef: 'BCEAO Instruction n°007-02-2018 — Art. 50 / COBAC R-2017/01 — Art. 55',
        options: [
          { value: 100, labelFr: 'Oui — KPIs définis, mesurés mensuellement, intégrés au reporting au CA', labelEn: 'Yes — KPIs defined, measured monthly, integrated into board reporting' },
          { value: 50, labelFr: 'Partiellement — Quelques indicateurs mais sans systématisation', labelEn: 'Partially — Some indicators but without systematization' },
          { value: 0, labelFr: 'Non — Aucun indicateur de performance ou de conformité', labelEn: 'No — No performance or compliance indicators' },
          { value: -1, labelFr: 'N/A — Structure sans obligation de pilotage par KPIs', labelEn: 'N/A — Structure without KPI-based management obligation' },
        ],
      },
    ],
  },
];

export const TOTAL_QUESTIONS = COMPLIANCE_SECTIONS.reduce(
  (sum, s) => sum + s.questions.length,
  0
);

export function getScoreColor(score: number): string {
  if (score >= 80) return '#22a05a'; // strategic-500
  if (score >= 50) return '#f59e0b'; // amber-500
  return '#ef4444'; // red-500
}

export function getScoreLabel(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Conformité Avancée';
    if (score >= 50) return 'Conformité Intermédiaire';
    return 'Conformité Faible';
  }
  if (score >= 80) return 'Advanced Compliance';
  if (score >= 50) return 'Intermediate Compliance';
  return 'Low Compliance';
}

export function getMaturityLevel(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Avancé';
    if (score >= 50) return 'Intermédiaire';
    return 'Faible';
  }
  if (score >= 80) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  return 'Low';
}

export function getReadinessIndicator(score: number, lang: string): string {
  if (lang === 'fr') {
    if (score >= 80) return 'Prêt pour audit / financement';
    if (score >= 60) return 'Préparation recommandée avant audit';
    return 'Accompagnement expert nécessaire';
  }
  if (score >= 80) return 'Ready for audit / funding';
  if (score >= 60) return 'Preparation recommended before audit';
  return 'Expert support needed';
}

export function getRecommendations(
  sectionScores: Record<string, number>,
  globalScore: number,
  lang: string
): Array<{ title: string; items: string[] }> {
  const recs: Array<{ title: string; items: string[] }> = [];

  if (lang === 'fr') {
    // Recommandations globales
    if (globalScore < 50) {
      recs.push({
        title: 'Priorité urgente — Fondations de la conformité',
        items: [
          'Désigner immédiatement un responsable conformité et un DMLRO (LAB/FT)',
          'Élaborer un manuel de procédures de base conforme aux exigences BCEAO/BEAC',
          'Mettre en place une cartographie des risques initiale',
          'Planifier un audit externe de diagnostic dans les 3 mois',
        ],
      });
    } else if (globalScore < 80) {
      recs.push({
        title: 'Renforcement recommandé — Optimisation de la conformité',
        items: [
          'Formaliser les procédures KYC avec due diligence renforcée pour les clients à risque',
          'Mettre en place un dispositif de surveillance des transactions (monitoring)',
          'Actualiser la cartographie des risques et le plan de contrôle annuel',
          'Renforcer la formation du personnel aux exigences LAB/FT et déontologiques',
        ],
      });
    } else {
      recs.push({
        title: 'Excellence — Maintien et anticipation',
        items: [
          'Anticiper les évolutions réglementaires (BCEAO, COBAC, GAFI)',
          'Mettre en place un programme d\'audit interne continu',
          'Développer une culture de conformité à travers des indicateurs avancés',
          'Envisager une certification de conformité ou un label de qualité',
        ],
      });
    }

    // Recommandations par section faible
    const weakSections = Object.entries(sectionScores).filter(([, s]) => s < 50);
    if (weakSections.length > 0) {
      const sectionNames = weakSections
        .map(([id]) => COMPLIANCE_SECTIONS.find((s) => s.id === id)?.titleFr)
        .filter(Boolean)
        .join(', ');
      recs.push({
        title: `Sections à renforcer : ${sectionNames}`,
        items: weakSections.map(([id]) => {
          const section = COMPLIANCE_SECTIONS.find((s) => s.id === id);
          return `Prioriser les actions dans la section "${section?.titleFr}" — score actuel : ${sectionScores[id]}/100`;
        }),
      });
    }
  } else {
    if (globalScore < 50) {
      recs.push({
        title: 'Urgent Priority — Compliance Foundations',
        items: [
          'Immediately appoint a compliance officer and a DMLRO (AML/CFT)',
          'Develop a basic procedures manual compliant with BCEAO/BEAC requirements',
          'Set up an initial risk mapping',
          'Schedule an external diagnostic audit within 3 months',
        ],
      });
    } else if (globalScore < 80) {
      recs.push({
        title: 'Recommended Strengthening — Compliance Optimization',
        items: [
          'Formalize KYC procedures with enhanced due diligence for high-risk customers',
          'Implement a transaction monitoring system',
          'Update risk mapping and annual control plan',
          'Strengthen staff training on AML/CFT and ethics requirements',
        ],
      });
    } else {
      recs.push({
        title: 'Excellence — Maintenance and Anticipation',
        items: [
          'Anticipate regulatory changes (BCEAO, COBAC, FATF)',
          'Implement a continuous internal audit program',
          'Develop a compliance culture through advanced indicators',
          'Consider compliance certification or quality label',
        ],
      });
    }

    const weakSections = Object.entries(sectionScores).filter(([, s]) => s < 50);
    if (weakSections.length > 0) {
      const sectionNames = weakSections
        .map(([id]) => COMPLIANCE_SECTIONS.find((s) => s.id === id)?.titleEn)
        .filter(Boolean)
        .join(', ');
      recs.push({
        title: `Sections to strengthen: ${sectionNames}`,
        items: weakSections.map(([id]) => {
          const section = COMPLIANCE_SECTIONS.find((s) => s.id === id);
          return `Prioritize actions in the "${section?.titleEn}" section — current score: ${sectionScores[id]}/100`;
        }),
      });
    }
  }

  return recs;
}

export function getRisks(globalScore: number, lang: string): string[] {
  if (lang === 'fr') {
    if (globalScore < 50) {
      return [
        'Risque élevé de sanctions réglementaires (amendes BCEAO/COBAC, retrait d\'agrément)',
        'Risque juridique : responsabilité des dirigeants en cas de manquement grave',
        'Risque réputationnel : perte de confiance des partenaires et clients',
        'Risque opérationnel : blocage des financements et des partenariats institutionnels',
        'Risque LAB/FT : exposition pénale en cas de blanchiment non détecté',
      ];
    }
    if (globalScore < 80) {
      return [
        'Risque modéré de sanctions en cas d\'inspection réglementaire ciblée',
        'Risque de non-conformité partielle pouvant entraîner des mesures correctives',
        'Risque réputationnel limité mais potentiel lors d\'audit externe',
        'Risque opérationnel : retards dans les agréments ou renouvellements',
      ];
    }
    return [
      'Risque faible de non-conformité réglementaire',
      'Risque résiduel lié aux évolutions réglementaires à anticiper',
      'Risque opérationnel minimal sur les aspects couverts',
    ];
  }
  if (globalScore < 50) {
    return [
      'High risk of regulatory sanctions (BCEAO/COBAC fines, license withdrawal)',
      'Legal risk: executive liability in case of serious breach',
      'Reputational risk: loss of partner and customer confidence',
      'Operational risk: blocking of funding and institutional partnerships',
      'AML/CFT risk: criminal exposure in case of undetected money laundering',
    ];
  }
  if (globalScore < 80) {
    return [
      'Moderate risk of sanctions in case of targeted regulatory inspection',
      'Risk of partial non-compliance potentially leading to corrective measures',
      'Limited but potential reputational risk during external audit',
      'Operational risk: delays in licensing or renewals',
    ];
  }
  return [
    'Low risk of regulatory non-compliance',
    'Residual risk linked to regulatory changes to anticipate',
    'Minimal operational risk on covered aspects',
  ];
}