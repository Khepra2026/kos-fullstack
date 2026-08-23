export interface InspectionQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: { value: number; labelFr: string; labelEn: string }[];
}

export interface InspectionAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: InspectionQuestion[];
}

export const INSPECTION_AXES: InspectionAxis[] = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Organisation',
    titleEn: 'Governance & Organization',
    descriptionFr: 'Conseil d\'Administration, comités spécialisés, séparation des pouvoirs, plan de relève',
    descriptionEn: 'Board of Directors, specialized committees, separation of powers, succession plan',
    icon: 'ri-government-line',
    color: '#b45309',
    questions: [
      {
        id: 'gov-1',
        questionFr: 'Votre Conseil d\'Administration est-il conforme aux exigences BCEAO/COBAC en matière de composition (administrateurs indépendants, comités spécialisés) ?',
        questionEn: 'Is your Board of Directors compliant with BCEAO/COBAC requirements regarding composition (independent directors, specialized committees)?',
        options: [
          { value: 100, labelFr: 'CA pleinement conforme, comités spécialisés fonctionnels, administrateurs indépendants nommés', labelEn: 'Board fully compliant, functional specialized committees, independent directors appointed' },
          { value: 60, labelFr: 'CA conforme mais comités partiellement opérationnels ou administrateurs indépendants en cours de nomination', labelEn: 'Board compliant but committees partially operational or independent directors being appointed' },
          { value: 25, labelFr: 'CA existant mais non conforme aux exigences prudentielles (composition, indépendance)', labelEn: 'Board exists but not compliant with prudential requirements (composition, independence)' },
          { value: 0, labelFr: 'Aucun CA formalisé ou CA totalement non conforme', labelEn: 'No formal Board or Board totally non-compliant' },
        ],
      },
      {
        id: 'gov-2',
        questionFr: 'Les fonctions de Président du CA et de Directeur Général sont-elles effectivement séparées, et une politique de conflits d\'intérêts est-elle appliquée ?',
        questionEn: 'Are the Chairman and CEO roles effectively separated, and is a conflict of interest policy enforced?',
        options: [
          { value: 100, labelFr: 'Séparation effective, politique de conflits d\'intérêts documentée et appliquée, registre des conflits tenu à jour', labelEn: 'Effective separation, documented and enforced conflict of interest policy, updated conflict register' },
          { value: 60, labelFr: 'Séparation formelle mais la politique de conflits d\'intérêts n\'est pas systématiquement appliquée', labelEn: 'Formal separation but conflict of interest policy not systematically enforced' },
          { value: 25, labelFr: 'Cumul des fonctions sans justification documentée, pas de politique de conflits d\'intérêts', labelEn: 'Role combination without documented justification, no conflict of interest policy' },
          { value: 0, labelFr: 'Aucune séparation ni politique de conflits d\'intérêts', labelEn: 'No separation or conflict of interest policy' },
        ],
      },
      {
        id: 'gov-3',
        questionFr: 'Disposez-vous d\'un plan de relève de direction documenté et validé par le Conseil d\'Administration ?',
        questionEn: 'Do you have a documented management succession plan validated by the Board of Directors?',
        options: [
          { value: 100, labelFr: 'Plan de relève documenté, validé par le CA, mis à jour annuellement, avec identification des successeurs', labelEn: 'Documented succession plan, validated by Board, updated annually, with identified successors' },
          { value: 60, labelFr: 'Plan de relève informel ou en cours d\'élaboration', labelEn: 'Informal succession plan or under development' },
          { value: 25, labelFr: 'Réflexion initiée mais aucun document formalisé', labelEn: 'Reflection initiated but no formal document' },
          { value: 0, labelFr: 'Aucun plan de relève de direction', labelEn: 'No management succession plan' },
        ],
      },
      {
        id: 'gov-4',
        questionFr: 'Les conventions réglementées entre l\'institution et ses dirigeants/actionnaires sont-elles documentées et approuvées conformément à l\'AUSCGIE OHADA ?',
        questionEn: 'Are regulated agreements between the institution and its directors/shareholders documented and approved in compliance with OHADA AUSCGIE?',
        options: [
          { value: 100, labelFr: 'Toutes les conventions identifiées, autorisées par le CA, rapportées au commissaire aux comptes et publiées', labelEn: 'All agreements identified, authorized by Board, reported to auditor and published' },
          { value: 60, labelFr: 'Conventions existantes documentées mais procédure d\'autorisation partiellement suivie', labelEn: 'Existing agreements documented but authorization procedure partially followed' },
          { value: 25, labelFr: 'Conventions existantes non formellement autorisées par le CA', labelEn: 'Existing agreements not formally authorized by Board' },
          { value: 0, labelFr: 'Aucune identification ni documentation des conventions réglementées', labelEn: 'No identification or documentation of regulated agreements' },
        ],
      },
      {
        id: 'gov-5',
        questionFr: 'L\'organigramme est-il formalisé avec des descriptions de fonctions, des délégations de pouvoirs claires et une séparation effective des fonctions de contrôle ?',
        questionEn: 'Is the organization chart formalized with job descriptions, clear delegation of authority and effective segregation of control functions?',
        options: [
          { value: 100, labelFr: 'Organigramme formalisé, fiches de poste à jour, délégations de pouvoirs documentées, indépendance des fonctions de contrôle', labelEn: 'Formalized org chart, updated job descriptions, documented delegations, independent control functions' },
          { value: 60, labelFr: 'Organigramme existant mais fiches de poste ou délégations partiellement documentées', labelEn: 'Org chart exists but job descriptions or delegations partially documented' },
          { value: 25, labelFr: 'Organigramme informel, pas de délégations de pouvoirs formalisées', labelEn: 'Informal org chart, no formal delegations of authority' },
          { value: 0, labelFr: 'Aucun organigramme ni description de fonctions', labelEn: 'No org chart or job descriptions' },
        ],
      },
    ],
  },
  {
    id: 'controle-interne',
    titleFr: 'Contrôle Interne & Audit',
    titleEn: 'Internal Control & Audit',
    descriptionFr: 'Dispositif de contrôle interne, audit interne, conformité, reporting',
    descriptionEn: 'Internal control system, internal audit, compliance, reporting',
    icon: 'ri-shield-check-line',
    color: '#0f766e',
    questions: [
      {
        id: 'ci-1',
        questionFr: 'Disposez-vous d\'un dispositif de contrôle interne formalisé, documenté et conforme aux exigences BCEAO/COBAC ?',
        questionEn: 'Do you have a formalized, documented internal control system compliant with BCEAO/COBAC requirements?',
        options: [
          { value: 100, labelFr: 'Dispositif complet : cartographie des risques, plan de contrôle, procédures documentées, tests réguliers, reporting au CA', labelEn: 'Complete system: risk mapping, control plan, documented procedures, regular testing, Board reporting' },
          { value: 60, labelFr: 'Dispositif existant mais documentation partielle ou tests non systématiques', labelEn: 'System exists but partial documentation or non-systematic testing' },
          { value: 25, labelFr: 'Contrôles informels sans cadre documenté', labelEn: 'Informal controls without documented framework' },
          { value: 0, labelFr: 'Aucun dispositif de contrôle interne formalisé', labelEn: 'No formal internal control system' },
        ],
      },
      {
        id: 'ci-2',
        questionFr: 'La fonction d\'audit interne est-elle indépendante de la direction générale et dispose-t-elle d\'un plan d\'audit annuel approuvé par le Conseil ?',
        questionEn: 'Is the internal audit function independent from management and does it have an annual audit plan approved by the Board?',
        options: [
          { value: 100, labelFr: 'Audit interne indépendant, plan annuel approuvé par le CA, rapports transmis au Comité d\'Audit, suivi des recommandations', labelEn: 'Independent internal audit, annual plan approved by Board, reports to Audit Committee, recommendation follow-up' },
          { value: 60, labelFr: 'Audit interne existant mais plan annuel non systématiquement approuvé ou suivi partiel des recommandations', labelEn: 'Internal audit exists but annual plan not systematically approved or partial follow-up' },
          { value: 25, labelFr: 'Fonction d\'audit interne non indépendante ou sans plan formalisé', labelEn: 'Internal audit function not independent or without formal plan' },
          { value: 0, labelFr: 'Aucune fonction d\'audit interne', labelEn: 'No internal audit function' },
        ],
      },
      {
        id: 'ci-3',
        questionFr: 'Les procédures de contrôle permanent couvrent-elles l\'ensemble des processus critiques (crédit, trésorerie, conformité, SI, RH) ?',
        questionEn: 'Do permanent control procedures cover all critical processes (credit, treasury, compliance, IT, HR)?',
        options: [
          { value: 100, labelFr: 'Couverture exhaustive, contrôles de 1er et 2ème niveau documentés, indicateurs de performance des contrôles suivis', labelEn: 'Exhaustive coverage, documented 1st and 2nd level controls, control KPIs monitored' },
          { value: 60, labelFr: 'Couverture des processus principaux mais contrôles non exhaustifs sur certains processus support', labelEn: 'Main process coverage but non-exhaustive controls on some support processes' },
          { value: 25, labelFr: 'Contrôles limités aux processus les plus critiques sans formalisation', labelEn: 'Controls limited to most critical processes without formalization' },
          { value: 0, labelFr: 'Aucun contrôle permanent formalisé', labelEn: 'No formal permanent controls' },
        ],
      },
      {
        id: 'ci-4',
        questionFr: 'Le commissaire aux comptes est-il nommé conformément aux exigences OHADA et ses rapports sont-ils présentés au Conseil dans les délais ?',
        questionEn: 'Is the statutory auditor appointed in compliance with OHADA requirements and are their reports presented to the Board on time?',
        options: [
          { value: 100, labelFr: 'CAC nommé conformément à l\'AUSCGIE, rapports présentés dans les délais, recommandations suivies', labelEn: 'Auditor appointed per AUSCGIE, reports presented on time, recommendations followed' },
          { value: 60, labelFr: 'CAC nommé mais certains rapports présentés avec retard ou recommandations partiellement suivies', labelEn: 'Auditor appointed but some reports presented late or recommendations partially followed' },
          { value: 25, labelFr: 'CAC nommé mais absence de suivi structuré des recommandations', labelEn: 'Auditor appointed but no structured follow-up of recommendations' },
          { value: 0, labelFr: 'Aucun commissaire aux comptes nommé', labelEn: 'No statutory auditor appointed' },
        ],
      },
      {
        id: 'ci-5',
        questionFr: 'Disposez-vous d\'un mécanisme de remontée d\'alerte (whistleblowing) protégé et documenté ?',
        questionEn: 'Do you have a protected and documented whistleblowing mechanism?',
        options: [
          { value: 100, labelFr: 'Mécanisme formalisé, canal sécurisé, protection documentée du lanceur d\'alerte, procédure de traitement des signalements', labelEn: 'Formal mechanism, secure channel, documented whistleblower protection, alert processing procedure' },
          { value: 60, labelFr: 'Mécanisme existant mais protection du lanceur d\'alerte non formalisée', labelEn: 'Mechanism exists but whistleblower protection not formalized' },
          { value: 25, labelFr: 'Canal informel sans procédure documentée', labelEn: 'Informal channel without documented procedure' },
          { value: 0, labelFr: 'Aucun mécanisme de remontée d\'alerte', labelEn: 'No whistleblowing mechanism' },
        ],
      },
    ],
  },
  {
    id: 'conformite-lbcft',
    titleFr: 'Conformité & LBC/FT',
    titleEn: 'Compliance & AML/CFT',
    descriptionFr: 'Dispositif LBC/FT, KYC, déclaration de soupçon, formation, sanctions',
    descriptionEn: 'AML/CFT system, KYC, suspicious transaction reporting, training, sanctions',
    icon: 'ri-file-search-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'lbcft-1',
        questionFr: 'Disposez-vous d\'un dispositif LBC/FT complet : responsable conformité désigné, politique documentée, procédures KYC et vigilance renforcée ?',
        questionEn: 'Do you have a complete AML/CFT system: designated compliance officer, documented policy, KYC and enhanced due diligence procedures?',
        options: [
          { value: 100, labelFr: 'Dispositif complet, responsable désigné et formé, politique approuvée par le CA, procédures documentées et appliquées', labelEn: 'Complete system, designated trained officer, Board-approved policy, documented and applied procedures' },
          { value: 60, labelFr: 'Responsable désigné et politique existante mais procédures partiellement documentées ou appliquées', labelEn: 'Designated officer and policy exist but procedures partially documented or applied' },
          { value: 25, labelFr: 'Dispositif minimal : responsable désigné sans politique formalisée', labelEn: 'Minimal system: designated officer without formal policy' },
          { value: 0, labelFr: 'Aucun dispositif LBC/FT', labelEn: 'No AML/CFT system' },
        ],
      },
      {
        id: 'lbcft-2',
        questionFr: 'Les procédures KYC incluent-elles l\'identification des bénéficiaires effectifs et la vérification des PPE (Personnes Politiquement Exposées) ?',
        questionEn: 'Do KYC procedures include beneficial owner identification and PEP (Politically Exposed Persons) verification?',
        options: [
          { value: 100, labelFr: 'KYC complet : identité, BE, PPE, listes de sanctions (ONU, OFAC, UE), mise à jour périodique', labelEn: 'Complete KYC: identity, BO, PEP, sanctions lists (UN, OFAC, EU), periodic update' },
          { value: 60, labelFr: 'KYC avec identification BE mais vérification PPE ou sanctions non systématique', labelEn: 'KYC with BO identification but PEP or sanctions verification not systematic' },
          { value: 25, labelFr: 'KYC basique sans identification systématique des BE ni vérification PPE', labelEn: 'Basic KYC without systematic BO identification or PEP verification' },
          { value: 0, labelFr: 'Aucune procédure KYC formalisée', labelEn: 'No formal KYC procedure' },
        ],
      },
      {
        id: 'lbcft-3',
        questionFr: 'Avez-vous mis en place une procédure de déclaration de soupçon auprès de la CENTIF/ANIF et vos équipes sont-elles formées à la détection des opérations suspectes ?',
        questionEn: 'Have you implemented a suspicious transaction reporting procedure to CENTIF/ANIF and are your teams trained in detecting suspicious operations?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, personnel formé annuellement, déclarations effectuées conformément à la réglementation, registre tenu', labelEn: 'Documented procedure, annually trained staff, declarations made per regulation, register maintained' },
          { value: 60, labelFr: 'Procédure existante mais formation non systématique ou registre incomplet', labelEn: 'Procedure exists but training not systematic or register incomplete' },
          { value: 25, labelFr: 'Procédure non formalisée, équipes non formées spécifiquement', labelEn: 'Non-formalized procedure, teams not specifically trained' },
          { value: 0, labelFr: 'Aucune procédure de déclaration de soupçon', labelEn: 'No suspicious transaction reporting procedure' },
        ],
      },
      {
        id: 'lbcft-4',
        questionFr: 'Les données de conformité LBC/FT sont-elles conservées conformément aux exigences réglementaires (minimum 10 ans) et accessibles en cas de contrôle ?',
        questionEn: 'Are AML/CFT compliance data retained in accordance with regulatory requirements (minimum 10 years) and accessible for inspection?',
        options: [
          { value: 100, labelFr: 'Conservation conforme (10 ans), données centralisées, accessibles, sauvegardées, avec traçabilité des accès', labelEn: 'Compliant retention (10 years), centralized data, accessible, backed up, with access traceability' },
          { value: 60, labelFr: 'Conservation assurée mais données non centralisées ou accessibilité partielle', labelEn: 'Retention ensured but data not centralized or partial accessibility' },
          { value: 25, labelFr: 'Conservation non systématique, durée inférieure aux exigences', labelEn: 'Non-systematic retention, duration below requirements' },
          { value: 0, labelFr: 'Aucune politique de conservation des données de conformité', labelEn: 'No compliance data retention policy' },
        ],
      },
      {
        id: 'lbcft-5',
        questionFr: 'Avez-vous fait l\'objet d\'un contrôle ou d\'une évaluation LBC/FT par les autorités (BCEAO, COBAC, CENTIF, ANIF, GIABA, GABAC) au cours des 3 dernières années ?',
        questionEn: 'Have you been subject to an AML/CFT inspection or assessment by authorities (BCEAO, COBAC, CENTIF, ANIF, GIABA, GABAC) in the last 3 years?',
        options: [
          { value: 100, labelFr: 'Contrôle effectué avec conclusions favorables ou sans réserve, recommandations traitées', labelEn: 'Inspection completed with favorable or unqualified conclusions, recommendations addressed' },
          { value: 60, labelFr: 'Contrôle effectué avec réserves mineures, plan d\'action en cours', labelEn: 'Inspection completed with minor reservations, action plan in progress' },
          { value: 25, labelFr: 'Contrôle effectué avec réserves significatives ou plan d\'action non clôturé', labelEn: 'Inspection completed with significant reservations or unclosed action plan' },
          { value: 0, labelFr: 'Aucun contrôle effectué ou contrôle avec sanctions', labelEn: 'No inspection conducted or inspection with sanctions' },
        ],
      },
    ],
  },
  {
    id: 'gestion-risques',
    titleFr: 'Gestion des Risques',
    titleEn: 'Risk Management',
    descriptionFr: 'Cartographie des risques, appétit au risque, ALM, concentration, stress testing',
    descriptionEn: 'Risk mapping, risk appetite, ALM, concentration, stress testing',
    icon: 'ri-alert-line',
    color: '#dc2626',
    questions: [
      {
        id: 'risk-1',
        questionFr: 'Disposez-vous d\'une cartographie des risques exhaustive couvrant les risques de crédit, de marché, de liquidité, opérationnels, de conformité et stratégiques ?',
        questionEn: 'Do you have an exhaustive risk map covering credit, market, liquidity, operational, compliance and strategic risks?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive, mise à jour annuelle, approuvée par le CA, avec plans de mitigation documentés', labelEn: 'Exhaustive mapping, annually updated, Board-approved, with documented mitigation plans' },
          { value: 60, labelFr: 'Cartographie existante mais non exhaustive ou non mise à jour annuellement', labelEn: 'Mapping exists but not exhaustive or not annually updated' },
          { value: 25, labelFr: 'Analyse informelle des risques sans cartographie formalisée', labelEn: 'Informal risk analysis without formal mapping' },
          { value: 0, labelFr: 'Aucune cartographie des risques', labelEn: 'No risk mapping' },
        ],
      },
      {
        id: 'risk-2',
        questionFr: 'Un appétit au risque est-il défini, documenté et approuvé par le Conseil d\'Administration avec des limites et seuils d\'alerte par typologie de risque ?',
        questionEn: 'Is a risk appetite defined, documented and approved by the Board with limits and alert thresholds per risk type?',
        options: [
          { value: 100, labelFr: 'Appétit au risque défini, limites quantifiées, seuils d\'alerte, reporting trimestriel au CA, procédure d\'escalade', labelEn: 'Risk appetite defined, quantified limits, alert thresholds, quarterly Board reporting, escalation procedure' },
          { value: 60, labelFr: 'Appétit au risque défini mais limites non entièrement quantifiées ou reporting irrégulier', labelEn: 'Risk appetite defined but limits not fully quantified or irregular reporting' },
          { value: 25, labelFr: 'Déclaration générale sans limites précises ni mécanisme de suivi', labelEn: 'General statement without precise limits or monitoring mechanism' },
          { value: 0, labelFr: 'Aucun appétit au risque défini', labelEn: 'No risk appetite defined' },
        ],
      },
      {
        id: 'risk-3',
        questionFr: 'Le dispositif ALM (Actif-Passif) est-il opérationnel avec un comité ALM fonctionnel, des gaps de liquidité mesurés et des ratios réglementaires respectés ?',
        questionEn: 'Is the ALM (Asset-Liability Management) system operational with a functional ALM committee, measured liquidity gaps and compliant regulatory ratios?',
        options: [
          { value: 100, labelFr: 'Comité ALM trimestriel, gaps mesurés, ratios respectés, stress tests liquidité réalisés, reporting au CA', labelEn: 'Quarterly ALM committee, measured gaps, compliant ratios, liquidity stress tests conducted, Board reporting' },
          { value: 60, labelFr: 'Dispositif ALM existant mais comité irrégulier ou stress tests non systématiques', labelEn: 'ALM system exists but irregular committee or non-systematic stress tests' },
          { value: 25, labelFr: 'Suivi basique de la liquidité sans dispositif ALM structuré', labelEn: 'Basic liquidity monitoring without structured ALM system' },
          { value: 0, labelFr: 'Aucun dispositif ALM', labelEn: 'No ALM system' },
        ],
      },
      {
        id: 'risk-4',
        questionFr: 'Les ratios prudentiels (solvabilité, liquidité, division des risques, concentration) sont-ils calculés, respectés et déclarés conformément aux exigences BCEAO/COBAC ?',
        questionEn: 'Are prudential ratios (solvency, liquidity, risk division, concentration) calculated, respected and reported in compliance with BCEAO/COBAC requirements?',
        options: [
          { value: 100, labelFr: 'Tous les ratios calculés et respectés, reporting conforme aux formats et délais, anticipation des évolutions', labelEn: 'All ratios calculated and respected, reporting compliant with formats and deadlines, anticipating changes' },
          { value: 60, labelFr: 'Ratios principaux respectés mais certains ratios secondaires proches des seuils ou calculs à fiabiliser', labelEn: 'Main ratios respected but some secondary ratios near thresholds or calculations to be made reliable' },
          { value: 25, labelFr: 'Certains ratios non respectés ou calculs non conformes aux normes prudentielles', labelEn: 'Some ratios not respected or calculations not compliant with prudential standards' },
          { value: 0, labelFr: 'Ratios non calculés ou non déclarés', labelEn: 'Ratios not calculated or not reported' },
        ],
      },
      {
        id: 'risk-5',
        questionFr: 'Réalisez-vous des stress tests (liquidité, crédit, taux) et des simulations de crises avec des scénarios documentés et des plans de contingence ?',
        questionEn: 'Do you conduct stress tests (liquidity, credit, rate) and crisis simulations with documented scenarios and contingency plans?',
        options: [
          { value: 100, labelFr: 'Stress tests semestriels, scénarios documentés, plans de contingence testés, résultats présentés au CA', labelEn: 'Semi-annual stress tests, documented scenarios, tested contingency plans, results presented to Board' },
          { value: 60, labelFr: 'Stress tests réalisés mais scénarios limités ou plans de contingence non testés', labelEn: 'Stress tests conducted but limited scenarios or untested contingency plans' },
          { value: 25, labelFr: 'Stress tests ponctuels sans cadre formalisé', labelEn: 'Occasional stress tests without formal framework' },
          { value: 0, labelFr: 'Aucun stress test réalisé', labelEn: 'No stress tests conducted' },
        ],
      },
    ],
  },
  {
    id: 'cybersecurite-pca',
    titleFr: 'Cybersécurité & Continuité',
    titleEn: 'Cybersecurity & Continuity',
    descriptionFr: 'Sécurité SI, PCA/PRA, protection des données, incidents, tests de résilience',
    descriptionEn: 'IT security, BCP/DRP, data protection, incidents, resilience testing',
    icon: 'ri-computer-line',
    color: '#0891b2',
    questions: [
      {
        id: 'cyber-1',
        questionFr: 'Disposez-vous d\'une politique de cybersécurité documentée incluant pare-feu, IDS/IPS, chiffrement, gestion des accès et journalisation ?',
        questionEn: 'Do you have a documented cybersecurity policy including firewall, IDS/IPS, encryption, access management and logging?',
        options: [
          { value: 100, labelFr: 'Politique complète documentée, outils déployés et configurés, tests d\'intrusion annuels, veille sécurité active', labelEn: 'Complete documented policy, deployed and configured tools, annual penetration tests, active security monitoring' },
          { value: 60, labelFr: 'Mesures de sécurité en place mais politique partiellement documentée ou tests non systématiques', labelEn: 'Security measures in place but policy partially documented or non-systematic tests' },
          { value: 25, labelFr: 'Mesures de base (antivirus, pare-feu) sans politique documentée', labelEn: 'Basic measures (antivirus, firewall) without documented policy' },
          { value: 0, labelFr: 'Aucune politique de cybersécurité', labelEn: 'No cybersecurity policy' },
        ],
      },
      {
        id: 'cyber-2',
        questionFr: 'Avez-vous un Plan de Continuité d\'Activité (PCA) et un Plan de Reprise d\'Activité (PRA) documentés, testés et mis à jour ?',
        questionEn: 'Do you have a documented, tested and updated Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP)?',
        options: [
          { value: 100, labelFr: 'PCA et PRA documentés, testés au moins annuellement, mis à jour, approuvés par le CA, avec procédure de déclenchement', labelEn: 'BCP and DRP documented, tested at least annually, updated, Board-approved, with activation procedure' },
          { value: 60, labelFr: 'PCA/PRA documentés mais tests non réalisés ou non concluants', labelEn: 'BCP/DRP documented but tests not conducted or inconclusive' },
          { value: 25, labelFr: 'PCA/PRA partiels ou en cours d\'élaboration', labelEn: 'Partial BCP/DRP or under development' },
          { value: 0, labelFr: 'Aucun PCA ni PRA', labelEn: 'No BCP or DRP' },
        ],
      },
      {
        id: 'cyber-3',
        questionFr: 'Les données clients et les données critiques sont-elles sauvegardées régulièrement avec des tests de restauration périodiques et un stockage hors site ?',
        questionEn: 'Are client and critical data backed up regularly with periodic restoration tests and off-site storage?',
        options: [
          { value: 100, labelFr: 'Sauvegardes quotidiennes, tests de restauration mensuels, stockage hors site sécurisé, procédure documentée', labelEn: 'Daily backups, monthly restoration tests, secure off-site storage, documented procedure' },
          { value: 60, labelFr: 'Sauvegardes régulières mais tests de restauration non systématiques ou stockage non sécurisé', labelEn: 'Regular backups but non-systematic restoration tests or unsecured storage' },
          { value: 25, labelFr: 'Sauvegardes ponctuelles sans procédure formalisée', labelEn: 'Occasional backups without formal procedure' },
          { value: 0, labelFr: 'Aucune sauvegarde régulière', labelEn: 'No regular backups' },
        ],
      },
      {
        id: 'cyber-4',
        questionFr: 'Disposez-vous d\'une procédure de gestion des incidents de sécurité (détection, notification, remédiation, reporting au superviseur) ?',
        questionEn: 'Do you have a security incident management procedure (detection, notification, remediation, reporting to supervisor)?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, équipe dédiée, délais de notification définis, registre des incidents tenu, reporting au superviseur', labelEn: 'Documented procedure, dedicated team, defined notification deadlines, incident register maintained, supervisor reporting' },
          { value: 60, labelFr: 'Procédure existante mais délais de notification non définis ou registre partiel', labelEn: 'Procedure exists but notification deadlines not defined or partial register' },
          { value: 25, labelFr: 'Gestion réactive sans procédure formalisée', labelEn: 'Reactive management without formal procedure' },
          { value: 0, labelFr: 'Aucune procédure de gestion des incidents', labelEn: 'No incident management procedure' },
        ],
      },
      {
        id: 'cyber-5',
        questionFr: 'Les exigences du Règlement COBAC R-2024/01 (gouvernance des systèmes d\'information) ou équivalent BCEAO sont-elles intégrées dans votre dispositif SI ?',
        questionEn: 'Are the requirements of COBAC Regulation R-2024/01 (IT governance) or BCEAO equivalent integrated into your IT system?',
        options: [
          { value: 100, labelFr: 'Exigences intégrées, gouvernance SI documentée, conformité vérifiée, veille sur les évolutions réglementaires', labelEn: 'Requirements integrated, documented IT governance, verified compliance, regulatory monitoring' },
          { value: 60, labelFr: 'Conformité partielle, certaines exigences en cours d\'intégration', labelEn: 'Partial compliance, some requirements being integrated' },
          { value: 25, labelFr: 'Conformité non évaluée ou non documentée', labelEn: 'Compliance not assessed or not documented' },
          { value: 0, labelFr: 'Exigences non connues ou non appliquées', labelEn: 'Requirements unknown or not applied' },
        ],
      },
    ],
  },
];

export const TOTAL_INSPECTION_QUESTIONS = INSPECTION_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getInspectionScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#d97706';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getInspectionScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible Risque — Bonne Préparation' : 'Low Risk — Good Preparation';
  if (score >= 50) return isFr ? 'Risque Modéré — Améliorations Nécessaires' : 'Moderate Risk — Improvements Needed';
  if (score >= 25) return isFr ? 'Risque Élevé — Plan d\'Action Urgent Requis' : 'High Risk — Urgent Action Plan Required';
  return isFr ? 'Risque Critique — Intervention Immédiate Impérative' : 'Critical Risk — Immediate Intervention Imperative';
}

export function getInspectionRiskClass(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible risque' : 'Low risk';
  if (score >= 50) return isFr ? 'Risque modéré' : 'Moderate risk';
  if (score >= 25) return isFr ? 'Risque élevé' : 'High risk';
  return isFr ? 'Risque critique' : 'Critical risk';
}

export function getInspectionReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre institution est bien préparée pour une inspection BCEAO/COBAC. Maintenez votre dispositif à jour et poursuivez les tests réguliers.'
    : 'Your institution is well prepared for a BCEAO/COBAC inspection. Keep your system updated and continue regular testing.';
  if (score >= 50) return isFr
    ? 'Votre institution présente un niveau de préparation acceptable mais des lacunes ciblées doivent être corrigées avant une inspection. Concentrez-vous sur les axes les plus faibles.'
    : 'Your institution has an acceptable preparation level but targeted gaps must be addressed before an inspection. Focus on the weakest areas.';
  if (score >= 25) return isFr
    ? 'Votre institution présente des lacunes significatives qui seraient identifiées lors d\'une inspection. Un plan d\'action prioritaire doit être lancé sans délai.'
    : 'Your institution has significant gaps that would be identified during an inspection. A priority action plan must be launched without delay.';
  return isFr
    ? 'Votre institution est exposée à un risque critique de sanctions en cas d\'inspection. Les défaillances constatées justifient une intervention immédiate de la direction générale et du Conseil.'
    : 'Your institution is exposed to a critical risk of sanctions in case of inspection. The identified failures justify immediate intervention by management and the Board.';
}

export function getInspectionRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const lbcftScore = perAxis['conformite-lbcft'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const cyberScore = perAxis['cybersecurite-pca'] ?? 0;

  if (govScore < 50) risks.push(isFr
    ? 'Gouvernance défaillante : composition du CA, comités spécialisés ou plan de relève non conformes — risque de mise en demeure'
    : 'Failing governance: Board composition, specialized committees or succession plan non-compliant — risk of formal notice');
  if (ciScore < 50) risks.push(isFr
    ? 'Contrôle interne insuffisant : absence d\'audit interne indépendant ou de dispositif de contrôle permanent — risque de sanction COBAC R-2016/04'
    : 'Insufficient internal control: absence of independent internal audit or permanent control system — risk of COBAC R-2016/04 sanction');
  if (lbcftScore < 50) risks.push(isFr
    ? 'Dispositif LBC/FT lacunaire : KYC, déclaration de soupçon ou formation non conformes — risque de sanction GIABA/GABAC et CENTIF/ANIF'
    : 'Deficient AML/CFT system: KYC, suspicious transaction reporting or training non-compliant — risk of GIABA/GABAC and CENTIF/ANIF sanction');
  if (riskScore < 50) risks.push(isFr
    ? 'Gestion des risques non structurée : absence de cartographie, d\'appétit au risque ou d\'ALM — non-conformité aux exigences prudentielles'
    : 'Unstructured risk management: absence of mapping, risk appetite or ALM — non-compliance with prudential requirements');
  if (cyberScore < 50) risks.push(isFr
    ? 'Cybersécurité et continuité d\'activité non maîtrisées : absence de PCA/PRA ou de politique de sécurité SI — risque opérationnel majeur'
    : 'Uncontrolled cybersecurity and business continuity: absence of BCP/DRP or IT security policy — major operational risk');
  if (globalScore < 25) risks.push(isFr
    ? 'Profil de risque critique : plusieurs défaillances majeures identifiées — exposition à des sanctions pouvant aller jusqu\'au retrait d\'agrément'
    : 'Critical risk profile: several major failures identified — exposure to sanctions up to license withdrawal');

  return risks;
}

export function getInspectionRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];

  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const lbcftScore = perAxis['conformite-lbcft'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const cyberScore = perAxis['cybersecurite-pca'] ?? 0;

  if (govScore < 50) {
    recs.push({
      title: isFr ? 'Mettre la gouvernance en conformité avec les exigences BCEAO/COBAC' : 'Bring governance into compliance with BCEAO/COBAC requirements',
      axis: 'gouvernance',
      items: isFr ? [
        'Revoir la composition du Conseil d\'Administration pour intégrer des administrateurs indépendants',
        'Rendre opérationnels les comités spécialisés (Audit, Risques, ALM) avec des chartes documentées',
        'Formaliser et faire approuver le plan de relève de direction par le Conseil',
        'Documenter les conventions réglementées et les faire approuver conformément à l\'AUSCGIE OHADA',
        'Formaliser l\'organigramme avec des descriptions de fonctions et délégations de pouvoirs claires',
      ] : [
        'Review Board composition to include independent directors',
        'Operationalize specialized committees (Audit, Risk, ALM) with documented charters',
        'Formalize and have the management succession plan approved by the Board',
        'Document regulated agreements and have them approved per OHADA AUSCGIE',
        'Formalize organization chart with clear job descriptions and delegation of authority',
      ],
    });
  }

  if (ciScore < 50) {
    recs.push({
      title: isFr ? 'Structurer le dispositif de contrôle interne et d\'audit' : 'Structure the internal control and audit system',
      axis: 'controle-interne',
      items: isFr ? [
        'Documenter le dispositif de contrôle interne avec cartographie des risques et plan de contrôle',
        'Rendre la fonction d\'audit interne indépendante de la direction générale',
        'Élaborer un plan d\'audit annuel couvrant tous les processus critiques et le faire approuver par le CA',
        'Mettre en place un mécanisme de remontée d\'alerte protégé et documenté',
        'Assurer le suivi systématique des recommandations d\'audit et de commissariat aux comptes',
      ] : [
        'Document the internal control system with risk mapping and control plan',
        'Make the internal audit function independent from management',
        'Develop an annual audit plan covering all critical processes and have it approved by the Board',
        'Implement a protected and documented whistleblowing mechanism',
        'Ensure systematic follow-up of audit and statutory auditor recommendations',
      ],
    });
  }

  if (lbcftScore < 50) {
    recs.push({
      title: isFr ? 'Renforcer le dispositif LBC/FT' : 'Strengthen the AML/CFT system',
      axis: 'conformite-lbcft',
      items: isFr ? [
        'Désigner un responsable conformité LBC/FT formé et indépendant',
        'Documenter et faire approuver la politique LBC/FT par le Conseil d\'Administration',
        'Mettre en place des procédures KYC complètes incluant bénéficiaires effectifs et PPE',
        'Formaliser la procédure de déclaration de soupçon et former les équipes annuellement',
        'Assurer la conservation des données de conformité pour une durée minimale de 10 ans',
      ] : [
        'Designate a trained and independent AML/CFT compliance officer',
        'Document and have the AML/CFT policy approved by the Board of Directors',
        'Implement complete KYC procedures including beneficial owners and PEPs',
        'Formalize the suspicious transaction reporting procedure and train teams annually',
        'Ensure compliance data retention for a minimum of 10 years',
      ],
    });
  }

  if (riskScore < 50) {
    recs.push({
      title: isFr ? 'Structurer la gestion des risques' : 'Structure risk management',
      axis: 'gestion-risques',
      items: isFr ? [
        'Élaborer une cartographie exhaustive des risques couvrant toutes les typologies',
        'Définir et faire approuver l\'appétit au risque avec des limites quantifiées',
        'Rendre le comité ALM opérationnel avec des gaps de liquidité mesurés et des stress tests',
        'Fiabiliser le calcul et la déclaration des ratios prudentiels',
        'Mettre en place des stress tests semestriels avec scénarios documentés et plans de contingence',
      ] : [
        'Develop an exhaustive risk map covering all typologies',
        'Define and have the risk appetite approved with quantified limits',
        'Make the ALM committee operational with measured liquidity gaps and stress tests',
        'Make prudential ratio calculation and reporting reliable',
        'Implement semi-annual stress tests with documented scenarios and contingency plans',
      ],
    });
  }

  if (cyberScore < 50) {
    recs.push({
      title: isFr ? 'Sécuriser le système d\'information et la continuité d\'activité' : 'Secure the information system and business continuity',
      axis: 'cybersecurite-pca',
      items: isFr ? [
        'Documenter et déployer une politique de cybersécurité complète (pare-feu, IDS/IPS, chiffrement)',
        'Élaborer et tester le PCA et le PRA avec des exercices annuels',
        'Mettre en place des sauvegardes quotidiennes avec tests de restauration mensuels',
        'Formaliser la procédure de gestion des incidents de sécurité avec délais de notification',
        'Évaluer et documenter la conformité au Règlement COBAC R-2024/01 ou équivalent BCEAO',
      ] : [
        'Document and deploy a complete cybersecurity policy (firewall, IDS/IPS, encryption)',
        'Develop and test BCP and DRP with annual exercises',
        'Implement daily backups with monthly restoration tests',
        'Formalize the security incident management procedure with notification deadlines',
        'Assess and document compliance with COBAC Regulation R-2024/01 or BCEAO equivalent',
      ],
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence du dispositif de conformité prudentielle' : 'Maintain prudential compliance excellence',
      axis: 'gouvernance',
      items: isFr ? [
        'Poursuivre la mise à jour annuelle de l\'ensemble des documentations',
        'Renforcer la veille réglementaire BCEAO, COBAC, GIABA, GABAC',
        'Anticiper les évolutions réglementaires (R-2024/01, nouvelles instructions BCEAO)',
        'Maintenir le rythme des tests (PCA, stress tests, audit) et des formations',
      ] : [
        'Continue annual updating of all documentation',
        'Strengthen BCEAO, COBAC, GIABA, GABAC regulatory monitoring',
        'Anticipate regulatory developments (R-2024/01, new BCEAO instructions)',
        'Maintain the pace of testing (BCP, stress tests, audit) and training',
      ],
    });
  }

  return recs;
}



