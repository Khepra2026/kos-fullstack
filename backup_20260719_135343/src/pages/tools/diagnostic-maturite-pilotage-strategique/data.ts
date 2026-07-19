export interface MaturiteQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: { value: number; labelFr: string; labelEn: string }[];
}

export interface MaturiteAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: MaturiteQuestion[];
}

export const MATURITE_AXES: MaturiteAxis[] = [
  {
    id: 'pilotage-strategique',
    titleFr: 'Pilotage Stratégique',
    titleEn: 'Strategic Steering',
    descriptionFr: 'Vision, planification stratégique, exécution, alignement organisationnel, revue stratégique',
    descriptionEn: 'Vision, strategic planning, execution, organizational alignment, strategy review',
    icon: 'ri-compass-3-line',
    color: '#0f766e',
    questions: [
      {
        id: 'ps-1',
        questionFr: 'L\'organisation dispose-t-elle d\'un plan stratégique formalisé sur 3-5 ans, avec des objectifs mesurables, des initiatives clés et un calendrier d\'exécution précis ?',
        questionEn: 'Does the organization have a formalized 3-5 year strategic plan with measurable objectives, key initiatives and a precise execution timeline?',
        options: [
          { value: 100, labelFr: 'Plan stratégique documenté sur 5 ans avec objectifs SMART, initiatives priorisées, roadmaps détaillées, budgets alloués, KPI mesurables et revues trimestrielles par le Conseil', labelEn: 'Documented 5-year strategic plan with SMART objectives, prioritized initiatives, detailed roadmaps, allocated budgets, measurable KPIs and quarterly Board reviews' },
          { value: 67, labelFr: 'Plan stratégique sur 3 ans avec objectifs définis mais suivi irrégulier, budgets partiellement alignés', labelEn: '3-year strategic plan with defined objectives but irregular monitoring, partially aligned budgets' },
          { value: 33, labelFr: 'Orientations stratégiques définies informellement par la direction, sans documentation structurée ni KPI formalisés', labelEn: 'Strategic directions informally defined by management, without structured documentation or formalized KPIs' },
          { value: 0, labelFr: 'Absence de plan stratégique formalisé, navigation à vue, décisions prises au fil de l\'eau', labelEn: 'No formalized strategic plan, short-term navigation, ad-hoc decisions' },
        ],
      },
      {
        id: 'ps-2',
        questionFr: 'Les objectifs stratégiques sont-ils déclinés en plans d\'action opérationnels par département/fonction avec des responsables clairement identifiés ?',
        questionEn: 'Are strategic objectives cascaded into operational action plans by department/function with clearly identified owners?',
        options: [
          { value: 100, labelFr: 'Cascade complète : objectifs corporate → business units → départements → individuels, alignement vérifié, matrice RACI, revues mensuelles de performance', labelEn: 'Full cascade: corporate objectives → business units → departments → individuals, verified alignment, RACI matrix, monthly performance reviews' },
          { value: 67, labelFr: 'Déclinaison partielle : objectifs corporate → directions, mais cascade incomplète vers les équipes opérationnelles', labelEn: 'Partial cascade: corporate objectives → divisions, but incomplete cascade to operational teams' },
          { value: 33, labelFr: 'Objectifs généraux communiqués verbalement, sans déclinaison formelle ni responsabilités documentées', labelEn: 'General objectives communicated verbally, without formal cascade or documented responsibilities' },
          { value: 0, labelFr: 'Aucune déclinaison des objectifs stratégiques, chaque unité fonctionne de manière autonome sans alignement', labelEn: 'No cascade of strategic objectives, each unit operates autonomously without alignment' },
        ],
      },
      {
        id: 'ps-3',
        questionFr: 'Un comité stratégique (ou équivalent) se réunit-il régulièrement pour suivre l\'exécution de la stratégie, analyser les écarts et prendre les décisions correctives ?',
        questionEn: 'Does a strategic committee (or equivalent) meet regularly to monitor strategy execution, analyze gaps and make corrective decisions?',
        options: [
          { value: 100, labelFr: 'Comité stratégique mensuel ou bimensuel, ordre du jour structuré, analyse des KPI vs cibles, décisions documentées, plan d\'action correctif formalisé, reporting au Conseil', labelEn: 'Monthly or bi-monthly strategic committee, structured agenda, KPI vs target analysis, documented decisions, formalized corrective action plan, Board reporting' },
          { value: 67, labelFr: 'Comité de direction trimestriel avec revue stratégique mais sans processus décisionnel formalisé ni suivi systématique des actions', labelEn: 'Quarterly executive committee with strategic review but without formal decision-making process or systematic action follow-up' },
          { value: 33, labelFr: 'Réunions de direction ponctuelles abordant la stratégie parmi d\'autres sujets, sans cadre structuré', labelEn: 'Occasional management meetings addressing strategy among other topics, without structured framework' },
          { value: 0, labelFr: 'Aucun comité stratégique, la stratégie n\'est pas suivie collectivement', labelEn: 'No strategic committee, strategy is not collectively monitored' },
        ],
      },
      {
        id: 'ps-4',
        questionFr: 'L\'organisation réalise-t-elle une analyse structurée de son environnement concurrentiel, des tendances sectorielles, des ruptures technologiques et des risques émergents ?',
        questionEn: 'Does the organization conduct a structured analysis of its competitive environment, sector trends, technological disruptions and emerging risks?',
        options: [
          { value: 100, labelFr: 'Veille stratégique systématique : analyse PESTEL et Porter actualisée annuellement, benchmarks sectoriels trimestriels, scans technologiques, études prospectives, présentations au Conseil', labelEn: 'Systematic strategic watch: annually updated PESTEL and Porter analysis, quarterly sector benchmarks, technology scans, foresight studies, Board presentations' },
          { value: 67, labelFr: 'Analyse environnementale réalisée périodiquement mais non systématique, veille concurrentielle informelle', labelEn: 'Environmental analysis conducted periodically but not systematic, informal competitive watch' },
          { value: 33, labelFr: 'Veille informelle basée sur l\'intuition du dirigeant et les retours terrain, sans méthodologie structurée', labelEn: 'Informal watch based on leader intuition and field feedback, without structured methodology' },
          { value: 0, labelFr: 'Aucune veille stratégique ni analyse concurrentielle, l\'organisation réagit aux événements plutôt qu\'elle ne les anticipe', labelEn: 'No strategic watch or competitive analysis, organization reacts to events rather than anticipates them' },
        ],
      },
      {
        id: 'ps-5',
        questionFr: 'Les décisions d\'investissement stratégique (acquisitions, nouveaux marchés, transformation) sont-elles fondées sur des business cases documentés, des analyses de rentabilité et des scénarios ?',
        questionEn: 'Are strategic investment decisions (acquisitions, new markets, transformation) based on documented business cases, profitability analyses and scenarios?',
        options: [
          { value: 100, labelFr: 'Business case obligatoire > seuil défini, modèle DCF avec scénarios (best/base/worst case), analyse de sensibilité, revue indépendante, suivi post-investissement avec comparaison prévisions/réalisé', labelEn: 'Mandatory business case > defined threshold, DCF model with scenarios (best/base/worst case), sensitivity analysis, independent review, post-investment tracking with forecast vs actual comparison' },
          { value: 67, labelFr: 'Business case requis pour les investissements majeurs mais analyse financière simplifiée, suivi post-investissement irrégulier', labelEn: 'Business case required for major investments but simplified financial analysis, irregular post-investment tracking' },
          { value: 33, labelFr: 'Décisions basées principalement sur l\'expérience du dirigeant, business case minimal ou informel', labelEn: 'Decisions based mainly on leader experience, minimal or informal business case' },
          { value: 0, labelFr: 'Décisions d\'investissement prises sans analyse formalisée, basées sur l\'intuition ou l\'opportunité du moment', labelEn: 'Investment decisions made without formalized analysis, based on intuition or momentary opportunity' },
        ],
      },
    ],
  },
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance',
    titleEn: 'Governance',
    descriptionFr: 'Conseil d\'Administration, comités spécialisés, transparence, rôles et responsabilités, éthique',
    descriptionEn: 'Board of Directors, specialized committees, transparency, roles and responsibilities, ethics',
    icon: 'ri-government-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'gv-1',
        questionFr: 'Le Conseil d\'Administration joue-t-il un rôle actif dans la définition et le suivi de la stratégie, au-delà de la simple validation formelle ?',
        questionEn: 'Does the Board of Directors play an active role in strategy definition and monitoring, beyond simple formal validation?',
        options: [
          { value: 100, labelFr: 'CA pleinement impliqué : sessions stratégiques annuelles dédiées, comité stratégique du CA, challenge des hypothèses, analyse des scénarios alternatifs, évaluation de la performance stratégique', labelEn: 'Fully involved Board: dedicated annual strategy sessions, Board strategy committee, assumption challenge, alternative scenario analysis, strategic performance evaluation' },
          { value: 67, labelFr: 'CA examine et valide la stratégie proposée par la direction, pose des questions mais sans challenge approfondi', labelEn: 'Board reviews and validates strategy proposed by management, asks questions but without in-depth challenge' },
          { value: 33, labelFr: 'CA entérine les décisions stratégiques sans débat substantiel, rôle principalement formel', labelEn: 'Board rubber-stamps strategic decisions without substantive debate, mainly formal role' },
          { value: 0, labelFr: 'CA inexistant ou purement symbolique, la stratégie est définie et exécutée sans gouvernance', labelEn: 'Non-existent or purely symbolic Board, strategy is defined and executed without governance' },
        ],
      },
      {
        id: 'gv-2',
        questionFr: 'Des comités spécialisés du Conseil (Audit, Stratégie, Risques, Rémunération) sont-ils constitués avec des membres indépendants et des chartes de fonctionnement ?',
        questionEn: 'Are specialized Board committees (Audit, Strategy, Risk, Compensation) formed with independent members and operating charters?',
        options: [
          { value: 100, labelFr: 'Comités spécialisés constitués avec chartes documentées, membres indépendants majoritaires, réunions régulières (trimestrielles), comptes-rendus au CA, évaluation annuelle de performance', labelEn: 'Specialized committees formed with documented charters, majority independent members, regular meetings (quarterly), reports to Board, annual performance evaluation' },
          { value: 67, labelFr: 'Comité d\'Audit existant, autres comités non constitués ou informels, indépendance partielle', labelEn: 'Audit Committee exists, other committees not formed or informal, partial independence' },
          { value: 33, labelFr: 'Aucun comité spécialisé formel, fonctions traitées en séance plénière du CA sans expertise dédiée', labelEn: 'No formal specialized committee, functions handled in Board plenary without dedicated expertise' },
          { value: 0, labelFr: 'Pas de comités spécialisés, pas de Conseil d\'Administration structuré', labelEn: 'No specialized committees, no structured Board of Directors' },
        ],
      },
      {
        id: 'gv-3',
        questionFr: 'La séparation des pouvoirs entre le Président du Conseil et le Directeur Général est-elle effective, avec des rôles clairement distincts et documentés ?',
        questionEn: 'Is the separation of powers between the Board Chair and CEO effective, with clearly distinct and documented roles?',
        options: [
          { value: 100, labelFr: 'Séparation effective : Président et DG distincts, rôles documentés dans un règlement intérieur, processus d\'évaluation du DG par le CA, comité de nomination indépendant, plan de succession DG formalisé', labelEn: 'Effective separation: distinct Chair and CEO, roles documented in internal regulations, CEO evaluation process by Board, independent nomination committee, formalized CEO succession plan' },
          { value: 67, labelFr: 'Président et DG distincts mais séparation théorique, le DG domine le CA ou le Président interfère dans la gestion', labelEn: 'Distinct Chair and CEO but theoretical separation, CEO dominates Board or Chair interferes in management' },
          { value: 33, labelFr: 'Cumul des fonctions Président-DG sans contre-pouvoir effectif au sein du CA', labelEn: 'Combined Chair-CEO role without effective Board counterbalance' },
          { value: 0, labelFr: 'Confusion totale des rôles, aucune distinction entre propriété, gouvernance et direction', labelEn: 'Total role confusion, no distinction between ownership, governance and management' },
        ],
      },
      {
        id: 'gv-4',
        questionFr: 'Un dispositif de gestion des conflits d\'intérêts est-il en place (déclaration annuelle, registre, procédure d\'abstention, examen par le comité d\'éthique) ?',
        questionEn: 'Is a conflict of interest management system in place (annual declaration, register, abstention procedure, ethics committee review)?',
        options: [
          { value: 100, labelFr: 'Dispositif complet : déclaration annuelle obligatoire pour tous les administrateurs et dirigeants, registre tenu à jour, procédure d\'abstention formalisée, comité d\'éthique indépendant, audit externe périodique', labelEn: 'Complete system: mandatory annual declaration for all directors and executives, up-to-date register, formalized abstention procedure, independent ethics committee, periodic external audit' },
          { value: 67, labelFr: 'Déclarations de conflits d\'intérêts collectées mais sans procédure formelle d\'examen ni registre centralisé', labelEn: 'Conflict of interest declarations collected but without formal review procedure or centralized register' },
          { value: 33, labelFr: 'Sensibilisation informelle aux conflits d\'intérêts, traitement au cas par cas sans cadre documenté', labelEn: 'Informal awareness of conflicts of interest, case-by-case handling without documented framework' },
          { value: 0, labelFr: 'Aucune gestion des conflits d\'intérêts, risques juridiques et réputationnels significatifs', labelEn: 'No conflict of interest management, significant legal and reputational risks' },
        ],
      },
      {
        id: 'gv-5',
        questionFr: 'La transparence de l\'information financière et stratégique envers les actionnaires et les parties prenantes est-elle assurée par des rapports réguliers et complets ?',
        questionEn: 'Is transparency of financial and strategic information to shareholders and stakeholders ensured through regular and comprehensive reports?',
        options: [
          { value: 100, labelFr: 'Transparence exemplaire : rapports trimestriels détaillés aux actionnaires, Assemblée Générale avec présentations stratégiques, rapport annuel intégré, communication proactive avec les investisseurs, site internet information financière', labelEn: 'Exemplary transparency: detailed quarterly reports to shareholders, General Assembly with strategic presentations, integrated annual report, proactive investor communication, financial information website' },
          { value: 67, labelFr: 'Information financière annuelle et semestrielle communiquée mais rapports synthétiques, communication réactive avec les actionnaires', labelEn: 'Annual and semi-annual financial information communicated but summary reports, reactive shareholder communication' },
          { value: 33, labelFr: 'Information minimale fournie (états financiers annuels obligatoires), communication limitée avec les actionnaires minoritaires', labelEn: 'Minimal information provided (mandatory annual financial statements), limited communication with minority shareholders' },
          { value: 0, labelFr: 'Opacité financière, information non communiquée ou tardive, asymétrie d\'information entre actionnaires majoritaires et minoritaires', labelEn: 'Financial opacity, information not communicated or late, information asymmetry between majority and minority shareholders' },
        ],
      },
    ],
  },
  {
    id: 'gestion-risques',
    titleFr: 'Gestion des Risques',
    titleEn: 'Risk Management',
    descriptionFr: 'Identification, cartographie, mitigation, appétence au risque, contrôle interne, crise',
    descriptionEn: 'Identification, mapping, mitigation, risk appetite, internal control, crisis',
    icon: 'ri-shield-flash-line',
    color: '#dc2626',
    questions: [
      {
        id: 'gr-1',
        questionFr: 'Une cartographie des risques stratégiques, opérationnels, financiers et de conformité est-elle établie, régulièrement mise à jour et présentée au Conseil ?',
        questionEn: 'Is a mapping of strategic, operational, financial and compliance risks established, regularly updated and presented to the Board?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive avec matrice probabilité/impact, seuils de matérialité, propriétaires de risques identifiés, mise à jour semestrielle, présentation au CA avec plans de mitigation chiffrés', labelEn: 'Exhaustive mapping with probability/impact matrix, materiality thresholds, identified risk owners, semi-annual update, Board presentation with quantified mitigation plans' },
          { value: 67, labelFr: 'Cartographie des risques principaux existante mais non exhaustive, mise à jour annuelle, présentation ponctuelle au CA', labelEn: 'Main risk mapping exists but not exhaustive, annual update, occasional Board presentation' },
          { value: 33, labelFr: 'Risques identifiés informellement par la direction, sans documentation structurée ni hiérarchisation', labelEn: 'Risks informally identified by management, without structured documentation or prioritization' },
          { value: 0, labelFr: 'Aucune cartographie des risques, l\'organisation ne connaît pas son exposition globale', labelEn: 'No risk mapping, organization does not know its global exposure' },
        ],
      },
      {
        id: 'gr-2',
        questionFr: 'L\'organisation a-t-elle défini son appétence au risque (risk appetite) de manière formelle, avec des limites quantifiées par catégorie de risque ?',
        questionEn: 'Has the organization formally defined its risk appetite, with quantified limits per risk category?',
        options: [
          { value: 100, labelFr: 'Appétence au risque formalisée et approuvée par le CA : limites quantitatives (VaR, ratios d\'endettement, exposition pays, concentration client), seuils d\'alerte, procédure d\'escalade, revue annuelle', labelEn: 'Formalized risk appetite approved by Board: quantitative limits (VaR, debt ratios, country exposure, client concentration), alert thresholds, escalation procedure, annual review' },
          { value: 67, labelFr: 'Appétence au risque définie qualitativement pour les risques majeurs, sans limites quantitatives précises', labelEn: 'Risk appetite defined qualitatively for major risks, without precise quantitative limits' },
          { value: 33, labelFr: 'Notion d\'appétence au risque évoquée en Conseil mais non formalisée, décisions de risque prises au cas par cas', labelEn: 'Risk appetite notion discussed at Board but not formalized, risk decisions made case-by-case' },
          { value: 0, labelFr: 'Aucune définition de l\'appétence au risque, l\'organisation prend des risques sans cadre de référence', labelEn: 'No risk appetite definition, organization takes risks without reference framework' },
        ],
      },
      {
        id: 'gr-3',
        questionFr: 'Un dispositif de contrôle interne est-il déployé pour prévenir et détecter les risques opérationnels, financiers et de conformité ?',
        questionEn: 'Is an internal control system deployed to prevent and detect operational, financial and compliance risks?',
        options: [
          { value: 100, labelFr: 'Dispositif complet : cartographie des contrôles, tests réguliers (walkthroughs), rapport de contrôle interne au comité d\'audit, plan de remédiation suivi, auto-évaluation par les opérationnels (RCSA)', labelEn: 'Complete system: control mapping, regular testing (walkthroughs), internal control report to audit committee, tracked remediation plan, operational self-assessment (RCSA)' },
          { value: 67, labelFr: 'Contrôles clés en place mais non exhaustifs, tests irréguliers, documentation partielle', labelEn: 'Key controls in place but not exhaustive, irregular testing, partial documentation' },
          { value: 33, labelFr: 'Contrôles de base (rapprochements bancaires, validation des paiements) sans cadre formalisé de contrôle interne', labelEn: 'Basic controls (bank reconciliations, payment validation) without formalized internal control framework' },
          { value: 0, labelFr: 'Absence de dispositif de contrôle interne structuré, risques de fraude et d\'erreurs élevés', labelEn: 'No structured internal control system, high fraud and error risks' },
        ],
      },
      {
        id: 'gr-4',
        questionFr: 'Un plan de continuité d\'activité (PCA) et un plan de gestion de crise sont-ils documentés, testés et actualisés ?',
        questionEn: 'Is a Business Continuity Plan (BCP) and crisis management plan documented, tested and updated?',
        options: [
          { value: 100, labelFr: 'PCA complet avec BIA (Business Impact Analysis), RTO/RPO définis, tests annuels (exercices de simulation), cellule de crise formalisée, plan de communication de crise, mise à jour après chaque incident majeur', labelEn: 'Complete BCP with BIA, defined RTO/RPO, annual tests (simulation exercises), formalized crisis unit, crisis communication plan, updated after each major incident' },
          { value: 67, labelFr: 'PCA documenté pour les processus critiques mais tests irréguliers, cellule de crise non formalisée', labelEn: 'BCP documented for critical processes but irregular tests, crisis unit not formalized' },
          { value: 33, labelFr: 'PCA partiel ou obsolète, reposant sur les personnes clés sans procédures documentées', labelEn: 'Partial or obsolete BCP, relying on key individuals without documented procedures' },
          { value: 0, labelFr: 'Aucun PCA ni plan de gestion de crise, l\'organisation est vulnérable à tout incident majeur', labelEn: 'No BCP or crisis management plan, organization is vulnerable to any major incident' },
        ],
      },
      {
        id: 'gr-5',
        questionFr: 'Les risques de conformité réglementaire sont-ils gérés de manière proactive avec une veille réglementaire, des analyses d\'impact et des plans de mise en conformité ?',
        questionEn: 'Are regulatory compliance risks managed proactively with regulatory watch, impact analyses and compliance plans?',
        options: [
          { value: 100, labelFr: 'Veille réglementaire systématique, matrice de conformité actualisée, analyses d\'impact préalables aux nouveaux textes, plans de mise en conformité avec responsables et délais, reporting trimestriel au comité d\'audit', labelEn: 'Systematic regulatory watch, updated compliance matrix, impact analyses prior to new regulations, compliance plans with owners and deadlines, quarterly reporting to audit committee' },
          { value: 67, labelFr: 'Veille réglementaire assurée par le juridique mais non systématique, plans de mise en conformité réactifs', labelEn: 'Regulatory watch handled by legal but not systematic, reactive compliance plans' },
          { value: 33, labelFr: 'Conformité gérée de manière réactive en réponse aux contrôles ou sanctions, veille réglementaire minimale', labelEn: 'Compliance managed reactively in response to controls or sanctions, minimal regulatory watch' },
          { value: 0, labelFr: 'Aucune gestion proactive de la conformité, exposition à des sanctions réglementaires majeures', labelEn: 'No proactive compliance management, exposure to major regulatory sanctions' },
        ],
      },
    ],
  },
  {
    id: 'performance-pilotage',
    titleFr: 'Performance & Pilotage',
    titleEn: 'Performance & Monitoring',
    descriptionFr: 'KPI, tableaux de bord, reporting, objectifs, évaluation, création de valeur',
    descriptionEn: 'KPIs, dashboards, reporting, objectives, evaluation, value creation',
    icon: 'ri-dashboard-line',
    color: '#0ea5e9',
    questions: [
      {
        id: 'pp-1',
        questionFr: 'L\'organisation dispose-t-elle de tableaux de bord stratégiques et opérationnels avec des indicateurs clés (KPI) alignés sur les objectifs stratégiques ?',
        questionEn: 'Does the organization have strategic and operational dashboards with key performance indicators (KPIs) aligned with strategic objectives?',
        options: [
          { value: 100, labelFr: 'Tableaux de bord intégrés : Balanced Scorecard ou équivalent, KPI financiers et extra-financiers, drill-down du stratégique à l\'opérationnel, data visualisation, mise à jour automatisée, revue mensuelle par le CODIR', labelEn: 'Integrated dashboards: Balanced Scorecard or equivalent, financial and extra-financial KPIs, strategic to operational drill-down, data visualization, automated update, monthly EXCOM review' },
          { value: 67, labelFr: 'Tableaux de bord existants mais couvrant principalement les aspects financiers, indicateurs extra-financiers partiels, reporting mensuel', labelEn: 'Dashboards exist but mainly covering financial aspects, partial extra-financial indicators, monthly reporting' },
          { value: 33, labelFr: 'Reporting basique basé sur Excel, indicateurs financiers rétrospectifs, pas de lien explicite avec la stratégie', labelEn: 'Basic Excel-based reporting, retrospective financial indicators, no explicit link with strategy' },
          { value: 0, labelFr: 'Pas de tableaux de bord structurés, le dirigeant pilote à partir d\'informations fragmentaires', labelEn: 'No structured dashboards, leader manages from fragmentary information' },
        ],
      },
      {
        id: 'pp-2',
        questionFr: 'Un processus budgétaire structuré est-il en place avec une construction bottom-up/top-down, des hypothèses documentées et un suivi régulier des écarts ?',
        questionEn: 'Is a structured budget process in place with bottom-up/top-down construction, documented assumptions and regular variance tracking?',
        options: [
          { value: 100, labelFr: 'Processus budgétaire mature : calendrier annuel formalisé, construction bottom-up avec agrégation, challenge top-down, hypothèses macro documentées, suivi mensuel des écarts avec analyses explicatives, révisions budgétaires (forecast glissant)', labelEn: 'Mature budget process: formalized annual calendar, bottom-up construction with aggregation, top-down challenge, documented macro assumptions, monthly variance tracking with explanatory analyses, budget revisions (rolling forecast)' },
          { value: 67, labelFr: 'Budget annuel construit et validé mais processus essentiellement top-down, suivi trimestriel sans forecast glissant', labelEn: 'Annual budget built and validated but essentially top-down process, quarterly tracking without rolling forecast' },
          { value: 33, labelFr: 'Budget élaboré de manière simplifiée par la direction financière, suivi irrégulier des réalisations', labelEn: 'Budget developed simply by finance department, irregular tracking of actuals' },
          { value: 0, labelFr: 'Pas de processus budgétaire formalisé, dépenses engagées sans cadre prévisionnel', labelEn: 'No formalized budget process, expenses incurred without forecast framework' },
        ],
      },
      {
        id: 'pp-3',
        questionFr: 'La performance des dirigeants et des managers est-elle évaluée sur la base d\'objectifs mesurables alignés avec la stratégie, avec des conséquences sur la rémunération ?',
        questionEn: 'Is executive and manager performance evaluated based on measurable objectives aligned with strategy, with consequences on compensation?',
        options: [
          { value: 100, labelFr: 'Système complet : objectifs individuels SMART alignés sur la stratégie, évaluation 360° ou équivalente, part variable significative liée à la performance, comité de rémunération indépendant, transparence des critères', labelEn: 'Complete system: SMART individual objectives aligned with strategy, 360° or equivalent evaluation, significant variable component linked to performance, independent compensation committee, criteria transparency' },
          { value: 67, labelFr: 'Objectifs individuels définis annuellement mais lien avec la stratégie partiellement explicite, évaluation annuelle, part variable modérée', labelEn: 'Individual objectives defined annually but partially explicit link with strategy, annual evaluation, moderate variable component' },
          { value: 33, labelFr: 'Évaluation informelle par le dirigeant, pas d\'objectifs formalisés, rémunération essentiellement fixe', labelEn: 'Informal evaluation by leader, no formalized objectives, essentially fixed compensation' },
          { value: 0, labelFr: 'Aucun système d\'évaluation de la performance, pas de lien entre contribution individuelle et rémunération', labelEn: 'No performance evaluation system, no link between individual contribution and compensation' },
        ],
      },
      {
        id: 'pp-4',
        questionFr: 'L\'organisation mesure-t-elle et suit-elle la création de valeur (EVA, ROIC, cash-flow disponible, VAN des projets) au-delà des seuls indicateurs comptables ?',
        questionEn: 'Does the organization measure and track value creation (EVA, ROIC, free cash flow, project NPV) beyond just accounting indicators?',
        options: [
          { value: 100, labelFr: 'Mesure systématique : ROIC par business unit, EVA calculée et communiquée, modèle de cash-flow actualisé pour les décisions d\'investissement, valorisation périodique de l\'entreprise, objectifs de création de valeur intégrés aux plans de rémunération', labelEn: 'Systematic measurement: ROIC by business unit, EVA calculated and communicated, discounted cash flow model for investment decisions, periodic business valuation, value creation objectives integrated into compensation plans' },
          { value: 67, labelFr: 'Indicateurs de rentabilité suivis (marge, ROCE) mais pas de mesure formalisée de la création de valeur actionnariale', labelEn: 'Profitability indicators tracked (margin, ROCE) but no formalized shareholder value creation measurement' },
          { value: 33, labelFr: 'Suivi limité aux indicateurs comptables classiques (Résultat Net, CA), pas de vision économique de la performance', labelEn: 'Tracking limited to classic accounting indicators (Net Income, Revenue), no economic view of performance' },
          { value: 0, labelFr: 'Aucune mesure de la création de valeur, focus exclusif sur la trésorerie à court terme', labelEn: 'No value creation measurement, exclusive focus on short-term cash flow' },
        ],
      },
      {
        id: 'pp-5',
        questionFr: 'Des revues de performance opérationnelle régulières sont-elles organisées avec les responsables de business units pour analyser les résultats et définir les actions correctives ?',
        questionEn: 'Are regular operational performance reviews organized with business unit heads to analyze results and define corrective actions?',
        options: [
          { value: 100, labelFr: 'Revues mensuelles structurées : ordre du jour standardisé, présentation des KPI vs cibles, analyse des écarts, identification des causes racines, plan d\'action avec responsables et délais, suivi des actions de la revue précédente', labelEn: 'Structured monthly reviews: standardized agenda, KPI vs target presentation, variance analysis, root cause identification, action plan with owners and deadlines, previous review action follow-up' },
          { value: 67, labelFr: 'Revues trimestrielles organisées mais format variable, suivi des actions correctives non systématique', labelEn: 'Quarterly reviews organized but variable format, non-systematic corrective action follow-up' },
          { value: 33, labelFr: 'Points informels avec les responsables, sans cadre structuré ni documentation', labelEn: 'Informal check-ins with managers, without structured framework or documentation' },
          { value: 0, labelFr: 'Aucune revue de performance opérationnelle structurée, chacun gère son périmètre de manière isolée', labelEn: 'No structured operational performance review, each manages their scope in isolation' },
        ],
      },
    ],
  },
  {
    id: 'prise-decision',
    titleFr: 'Prise de Décision & Valeur',
    titleEn: 'Decision-Making & Value',
    descriptionFr: 'Processus décisionnel, données, analyse, innovation, culture, agilité stratégique',
    descriptionEn: 'Decision process, data, analysis, innovation, culture, strategic agility',
    icon: 'ri-lightbulb-flash-line',
    color: '#b45309',
    questions: [
      {
        id: 'pd-1',
        questionFr: 'Les décisions stratégiques importantes sont-elles prises selon un processus formalisé incluant l\'analyse de données, des scénarios alternatifs et une évaluation des risques ?',
        questionEn: 'Are important strategic decisions made according to a formalized process including data analysis, alternative scenarios and risk assessment?',
        options: [
          { value: 100, labelFr: 'Processus décisionnel mature : note de cadrage, analyse quantitative (business case, scénarios, sensibilité), consultation des parties prenantes clés, avis d\'experts externes si nécessaire, décision documentée avec motivation, suivi de la mise en œuvre', labelEn: 'Mature decision process: scoping memo, quantitative analysis (business case, scenarios, sensitivity), key stakeholder consultation, external expert opinion if needed, documented decision with rationale, implementation follow-up' },
          { value: 67, labelFr: 'Processus décisionnel partiellement formalisé, analyses produites pour les décisions majeures mais pas systématiquement', labelEn: 'Partially formalized decision process, analyses produced for major decisions but not systematically' },
          { value: 33, labelFr: 'Décisions prises principalement par le dirigeant après consultation informelle, peu d\'analyses formalisées', labelEn: 'Decisions made mainly by the leader after informal consultation, few formalized analyses' },
          { value: 0, labelFr: 'Décisions impulsives ou basées sur l\'intuition, sans cadre d\'analyse ni consultation structurée', labelEn: 'Impulsive or intuition-based decisions, without analytical framework or structured consultation' },
        ],
      },
      {
        id: 'pd-2',
        questionFr: 'L\'organisation exploite-t-elle les données (data analytics, business intelligence) pour éclairer ses décisions stratégiques et opérationnelles ?',
        questionEn: 'Does the organization leverage data (data analytics, business intelligence) to inform its strategic and operational decisions?',
        options: [
          { value: 100, labelFr: 'Culture data-driven : infrastructure BI déployée, tableaux de bord analytics, analyses prédictives explorées, data quality management, Chief Data Officer ou équivalent, formations à la data literacy pour les managers', labelEn: 'Data-driven culture: deployed BI infrastructure, analytics dashboards, predictive analytics explored, data quality management, Chief Data Officer or equivalent, data literacy training for managers' },
          { value: 67, labelFr: 'Outils BI en place, rapports réguliers produits, mais l\'analyse prédictive n\'est pas exploitée, utilisation variable selon les départements', labelEn: 'BI tools in place, regular reports produced, but predictive analytics not leveraged, variable usage across departments' },
          { value: 33, labelFr: 'Données disponibles dans les systèmes opérationnels mais non consolidées, analyses ponctuelles sur Excel', labelEn: 'Data available in operational systems but not consolidated, occasional Excel analyses' },
          { value: 0, labelFr: 'Aucune exploitation structurée des données, décisions basées sur l\'expérience et l\'intuition exclusivement', labelEn: 'No structured data exploitation, decisions based exclusively on experience and intuition' },
        ],
      },
      {
        id: 'pd-3',
        questionFr: 'L\'organisation a-t-elle une culture d\'innovation et d\'amélioration continue, avec des processus pour capter, évaluer et déployer les idées nouvelles ?',
        questionEn: 'Does the organization have a culture of innovation and continuous improvement, with processes to capture, evaluate and deploy new ideas?',
        options: [
          { value: 100, labelFr: 'Culture d\'innovation structurée : processus d\'idéation formalisé, budget innovation dédié, indicateurs d\'innovation suivis (R&D/sales, time-to-market), partenariats innovation (startups, universités), veille technologique active', labelEn: 'Structured innovation culture: formalized ideation process, dedicated innovation budget, tracked innovation indicators (R&D/sales, time-to-market), innovation partnerships (startups, universities), active technology watch' },
          { value: 67, labelFr: 'Initiatives d\'innovation existantes mais non structurées, budget innovation ponctuel, processus d\'évaluation des idées informel', labelEn: 'Innovation initiatives exist but not structured, occasional innovation budget, informal idea evaluation process' },
          { value: 33, labelFr: 'Innovation incrémentale informelle, pas de budget ni de processus dédié, dépend des initiatives individuelles', labelEn: 'Informal incremental innovation, no dedicated budget or process, depends on individual initiatives' },
          { value: 0, labelFr: 'Aucune culture d\'innovation, l\'organisation se concentre exclusivement sur l\'exploitation sans exploration', labelEn: 'No innovation culture, organization focuses exclusively on exploitation without exploration' },
        ],
      },
      {
        id: 'pd-4',
        questionFr: 'Les dirigeants et managers clés bénéficient-ils d\'un accompagnement (coaching, mentorat, formations en leadership stratégique) pour renforcer leurs capacités décisionnelles ?',
        questionEn: 'Do key executives and managers benefit from support (coaching, mentoring, strategic leadership training) to strengthen their decision-making capabilities?',
        options: [
          { value: 100, labelFr: 'Programme complet : coaching exécutif individuel, mentorat croisé, formations certifiantes en leadership stratégique, évaluation 360° régulière, plan de développement individuel, participation à des cercles de dirigeants ou advisory boards', labelEn: 'Complete program: individual executive coaching, cross-mentoring, certified strategic leadership training, regular 360° evaluation, individual development plan, participation in CEO circles or advisory boards' },
          { value: 67, labelFr: 'Formations externes ponctuelles pour les dirigeants, pas de programme structuré de développement du leadership', labelEn: 'Occasional external training for executives, no structured leadership development program' },
          { value: 33, labelFr: 'Développement essentiellement par l\'expérience (learning by doing), pas d\'accompagnement formalisé', labelEn: 'Development mainly through experience (learning by doing), no formalized support' },
          { value: 0, labelFr: 'Aucun investissement dans le développement des dirigeants, compétences décisionnelles non développées', labelEn: 'No investment in executive development, decision-making skills not developed' },
        ],
      },
      {
        id: 'pd-5',
        questionFr: 'L\'organisation est-elle capable de pivoter rapidement sa stratégie face à des disruptions majeures, avec un processus d\'alerte précoce et de décision agile ?',
        questionEn: 'Is the organization able to quickly pivot its strategy in the face of major disruptions, with an early warning and agile decision process?',
        options: [
          { value: 100, labelFr: 'Agilité stratégique démontrée : système d\'alerte précoce (early warning indicators), processus de décision accéléré en mode crise, capacité à réallouer les ressources rapidement, exercices de simulation de crise stratégique, culture d\'adaptation continue, retours d\'expérience documentés', labelEn: 'Demonstrated strategic agility: early warning system, accelerated crisis-mode decision process, rapid resource reallocation capability, strategic crisis simulation exercises, continuous adaptation culture, documented lessons learned' },
          { value: 67, labelFr: 'Capacité d\'adaptation existante mais reposant sur les individus plutôt que sur des processus, délais de réaction moyens', labelEn: 'Adaptation capability exists but relies on individuals rather than processes, average reaction times' },
          { value: 33, labelFr: 'Organisation rigide, capacité d\'adaptation limitée, décisions de pivot longues à prendre et à exécuter', labelEn: 'Rigid organization, limited adaptation capability, pivot decisions long to make and execute' },
          { value: 0, labelFr: 'Organisation totalement figée, incapacité à changer de cap stratégique, risque existentiel en cas de disruption majeure', labelEn: 'Totally frozen organization, inability to change strategic direction, existential risk in case of major disruption' },
        ],
      },
    ],
  },
];

export const TOTAL_MATURITE_QUESTIONS = MATURITE_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getMaturiteScoreColor(score: number): string {
  if (score >= 85) return '#059669';
  if (score >= 70) return '#0ea5e9';
  if (score >= 55) return '#d97706';
  if (score >= 35) return '#ea580c';
  return '#dc2626';
}

export function getMaturiteScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr ? 'Pilotage Stratégique d\'Excellence' : 'Strategic Excellence Steering';
  if (score >= 70) return isFr ? 'Pilotage Stratégique Avancé' : 'Advanced Strategic Steering';
  if (score >= 55) return isFr ? 'Pilotage Stratégique Structuré' : 'Structured Strategic Steering';
  if (score >= 35) return isFr ? 'Pilotage Stratégique Émergent' : 'Emerging Strategic Steering';
  return isFr ? 'Pilotage Stratégique Rudimentaire' : 'Rudimentary Strategic Steering';
}

export function getMaturiteLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr ? 'Niveau 5 — Excellence Stratégique' : 'Level 5 — Strategic Excellence';
  if (score >= 70) return isFr ? 'Niveau 4 — Pilotage Avancé' : 'Level 4 — Advanced Steering';
  if (score >= 55) return isFr ? 'Niveau 3 — Pilotage Structuré' : 'Level 3 — Structured Steering';
  if (score >= 35) return isFr ? 'Niveau 2 — Pilotage Émergent' : 'Level 2 — Emerging Steering';
  return isFr ? 'Niveau 1 — Pilotage Rudimentaire' : 'Level 1 — Rudimentary Steering';
}

export function getMaturiteInterpretation(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr
    ? 'Votre organisation a atteint un niveau d\'excellence en pilotage stratégique. La stratégie est intégrée à tous les niveaux, la gouvernance est mature, les risques sont maîtrisés et la création de valeur est mesurée et pilotée. Continuez à innover et à anticiper les ruptures pour maintenir votre avance concurrentielle.'
    : 'Your organization has reached a level of strategic excellence. Strategy is integrated at all levels, governance is mature, risks are mastered and value creation is measured and steered. Continue innovating and anticipating disruptions to maintain your competitive advantage.';
  if (score >= 70) return isFr
    ? 'Votre organisation dispose d\'un pilotage stratégique avancé avec des processus solides sur la plupart des axes. Quelques dimensions restent à renforcer pour atteindre l\'excellence, notamment en matière d\'agilité stratégique et de prise de décision data-driven.'
    : 'Your organization has advanced strategic steering with solid processes on most axes. Some dimensions remain to be strengthened to reach excellence, particularly in strategic agility and data-driven decision-making.';
  if (score >= 55) return isFr
    ? 'Votre organisation a posé les bases d\'un pilotage stratégique structuré mais des lacunes significatives subsistent. La formalisation des processus, le renforcement de la gouvernance et l\'amélioration du suivi de la performance sont nécessaires pour sécuriser la trajectoire de croissance.'
    : 'Your organization has laid the foundations for structured strategic steering but significant gaps remain. Formalizing processes, strengthening governance and improving performance monitoring are necessary to secure the growth trajectory.';
  if (score >= 35) return isFr
    ? 'Votre organisation est au stade émergent du pilotage stratégique. De nombreuses pratiques essentielles sont absentes ou informelles, exposant l\'organisation à des risques de décisions sous-optimales, de perte de compétitivité et de crises évitables.'
    : 'Your organization is at the emerging stage of strategic steering. Many essential practices are absent or informal, exposing the organization to risks of sub-optimal decisions, loss of competitiveness and avoidable crises.';
  return isFr
    ? 'Votre organisation présente un pilotage stratégique rudimentaire qui constitue un risque existentiel. L\'absence de processus formalisés, de gouvernance structurée et de gestion proactive des risques expose l\'organisation à des erreurs stratégiques pouvant coûter plusieurs centaines de millions FCFA.'
    : 'Your organization has rudimentary strategic steering that constitutes an existential risk. The absence of formalized processes, structured governance and proactive risk management exposes the organization to strategic errors that can cost hundreds of millions FCFA.';
}

export function getMaturiteRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const psScore = perAxis['pilotage-strategique'] ?? 0;
  const gvScore = perAxis['gouvernance'] ?? 0;
  const grScore = perAxis['gestion-risques'] ?? 0;
  const ppScore = perAxis['performance-pilotage'] ?? 0;
  const pdScore = perAxis['prise-decision'] ?? 0;

  if (psScore < 55) risks.push(isFr
    ? 'Planification stratégique absente ou immature : pas de plan formalisé à 3-5 ans, pas de déclinaison opérationnelle, navigation à vue — risque de dérive stratégique et de perte de compétitivité'
    : 'Absent or immature strategic planning: no formalized 3-5 year plan, no operational cascade, short-term navigation — risk of strategic drift and loss of competitiveness');
  if (gvScore < 55) risks.push(isFr
    ? 'Gouvernance défaillante : Conseil d\'Administration passif ou inexistant, pas de comités spécialisés, confusion des rôles — risque de décisions non challengées et de conflits d\'intérêts'
    : 'Failing governance: passive or non-existent Board, no specialized committees, role confusion — risk of unchallenged decisions and conflicts of interest');
  if (grScore < 55) risks.push(isFr
    ? 'Gestion des risques insuffisante : pas de cartographie, pas d\'appétence au risque définie, contrôle interne faible — risque de crises majeures non anticipées et de pertes financières significatives'
    : 'Insufficient risk management: no mapping, no defined risk appetite, weak internal control — risk of unanticipated major crises and significant financial losses');
  if (ppScore < 55) risks.push(isFr
    ? 'Pilotage de la performance insuffisant : pas de tableaux de bord stratégiques, pas de mesure de la création de valeur, objectifs non alignés — risque d\'allocation sous-optimale des ressources et de performance dégradée'
    : 'Insufficient performance monitoring: no strategic dashboards, no value creation measurement, misaligned objectives — risk of sub-optimal resource allocation and degraded performance');
  if (pdScore < 55) risks.push(isFr
    ? 'Prise de décision non structurée et absence d\'agilité : décisions basées sur l\'intuition, pas d\'exploitation des données, culture d\'innovation absente, incapacité à pivoter — risque de décisions stratégiques catastrophiques'
    : 'Unstructured decision-making and absence of agility: intuition-based decisions, no data exploitation, absent innovation culture, inability to pivot — risk of catastrophic strategic decisions');
  if (globalScore < 35) risks.push(isFr
    ? 'Profil de maturité critique : défaillances multiples et systémiques sur l\'ensemble des axes — le coût des erreurs stratégiques pour l\'organisation peut se chiffrer en plusieurs centaines de millions FCFA. Un CEO Advisory Board ou un accompagnement stratégique externe est fortement recommandé.'
    : 'Critical maturity profile: multiple systemic failures across all axes — the cost of strategic errors for the organization can amount to several hundred million FCFA. A CEO Advisory Board or external strategic support is strongly recommended.');

  return risks;
}

export function getMaturiteRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];

  const psScore = perAxis['pilotage-strategique'] ?? 0;
  const gvScore = perAxis['gouvernance'] ?? 0;
  const grScore = perAxis['gestion-risques'] ?? 0;
  const ppScore = perAxis['performance-pilotage'] ?? 0;
  const pdScore = perAxis['prise-decision'] ?? 0;

  if (psScore < 55) {
    recs.push({
      title: isFr ? 'Formaliser un Plan Stratégique 3-5 Ans' : 'Formalize a 3-5 Year Strategic Plan',
      axis: 'pilotage-strategique',
      items: isFr ? [
        'Élaborer un plan stratégique documenté avec vision, mission, objectifs SMART, initiatives clés et roadmaps détaillées',
        'Décliner les objectifs stratégiques en plans d\'action opérationnels par département avec des responsables identifiés (matrice RACI)',
        'Mettre en place un comité stratégique mensuel avec ordre du jour structuré, analyse des KPI vs cibles et décisions documentées',
        'Instaurer une veille stratégique systématique : analyse PESTEL, Porter, benchmarks sectoriels, études prospectives',
        'Exiger un business case documenté (DCF, scénarios, analyse de sensibilité) pour toute décision d\'investissement stratégique au-delà d\'un seuil défini',
      ] : [
        'Develop a documented strategic plan with vision, mission, SMART objectives, key initiatives and detailed roadmaps',
        'Cascade strategic objectives into operational action plans by department with identified owners (RACI matrix)',
        'Set up a monthly strategic committee with structured agenda, KPI vs target analysis and documented decisions',
        'Institute systematic strategic watch: PESTEL, Porter analysis, sector benchmarks, foresight studies',
        'Require a documented business case (DCF, scenarios, sensitivity analysis) for any strategic investment decision beyond a defined threshold',
      ],
    });
  }

  if (gvScore < 55) {
    recs.push({
      title: isFr ? 'Renforcer la Gouvernance Stratégique' : 'Strengthen Strategic Governance',
      axis: 'gouvernance',
      items: isFr ? [
        'Dynamiser le Conseil d\'Administration : sessions stratégiques annuelles dédiées, challenge des hypothèses, évaluation de la performance stratégique',
        'Constituer des comités spécialisés (Audit, Stratégie, Risques, Rémunération) avec des chartes documentées et des membres indépendants',
        'Formaliser et rendre effective la séparation des pouvoirs entre le Président du Conseil et le Directeur Général',
        'Mettre en place un dispositif complet de gestion des conflits d\'intérêts : déclaration annuelle, registre, procédure d\'abstention',
        'Assurer une transparence exemplaire : rapports trimestriels détaillés, communication proactive avec les actionnaires, rapport annuel intégré',
      ] : [
        'Energize the Board: dedicated annual strategy sessions, assumption challenge, strategic performance evaluation',
        'Form specialized committees (Audit, Strategy, Risk, Compensation) with documented charters and independent members',
        'Formalize and make effective the separation of powers between Board Chair and CEO',
        'Implement a complete conflict of interest management system: annual declaration, register, abstention procedure',
        'Ensure exemplary transparency: detailed quarterly reports, proactive shareholder communication, integrated annual report',
      ],
    });
  }

  if (grScore < 55) {
    recs.push({
      title: isFr ? 'Déployer une Gestion Proactive des Risques' : 'Deploy Proactive Risk Management',
      axis: 'gestion-risques',
      items: isFr ? [
        'Établir une cartographie exhaustive des risques (stratégiques, opérationnels, financiers, conformité) avec matrice probabilité/impact',
        'Définir et faire approuver par le Conseil l\'appétence au risque avec des limites quantitatives par catégorie',
        'Déployer un dispositif de contrôle interne structuré : cartographie des contrôles, tests réguliers, plan de remédiation',
        'Documenter et tester un Plan de Continuité d\'Activité (PCA) et un plan de gestion de crise avec cellule de crise formalisée',
        'Mettre en place une veille réglementaire systématique avec analyses d\'impact et plans de mise en conformité proactifs',
      ] : [
        'Establish an exhaustive risk mapping (strategic, operational, financial, compliance) with probability/impact matrix',
        'Define and have the Board approve risk appetite with quantitative limits per category',
        'Deploy a structured internal control system: control mapping, regular testing, remediation plan',
        'Document and test a Business Continuity Plan (BCP) and crisis management plan with formalized crisis unit',
        'Set up systematic regulatory watch with impact analyses and proactive compliance plans',
      ],
    });
  }

  if (ppScore < 55) {
    recs.push({
      title: isFr ? 'Installer un Pilotage de la Performance' : 'Install Performance Monitoring',
      axis: 'performance-pilotage',
      items: isFr ? [
        'Déployer des tableaux de bord stratégiques et opérationnels (Balanced Scorecard ou équivalent) avec des KPI alignés sur la stratégie',
        'Structurer le processus budgétaire : calendrier formalisé, construction bottom-up/top-down, forecast glissant, suivi mensuel des écarts',
        'Mettre en place un système d\'évaluation de la performance des dirigeants basé sur des objectifs SMART avec part variable liée aux résultats',
        'Instaurer la mesure systématique de la création de valeur : ROIC, EVA, cash-flow disponible, valorisation périodique de l\'entreprise',
        'Organiser des revues de performance opérationnelle mensuelles structurées avec analyse des causes racines et plans d\'action',
      ] : [
        'Deploy strategic and operational dashboards (Balanced Scorecard or equivalent) with KPIs aligned with strategy',
        'Structure the budget process: formalized calendar, bottom-up/top-down construction, rolling forecast, monthly variance tracking',
        'Set up an executive performance evaluation system based on SMART objectives with variable component linked to results',
        'Institute systematic value creation measurement: ROIC, EVA, free cash flow, periodic business valuation',
        'Organize structured monthly operational performance reviews with root cause analysis and action plans',
      ],
    });
  }

  if (pdScore < 55) {
    recs.push({
      title: isFr ? 'Améliorer la Prise de Décision et l\'Agilité Stratégique' : 'Improve Decision-Making and Strategic Agility',
      axis: 'prise-decision',
      items: isFr ? [
        'Formaliser le processus de décision stratégique : note de cadrage, analyse quantitative (business case, scénarios), consultation, décision documentée',
        'Déployer une infrastructure Business Intelligence pour exploiter les données dans les décisions stratégiques et opérationnelles',
        'Structurer une culture d\'innovation : processus d\'idéation, budget innovation dédié, partenariats innovation, veille technologique',
        'Mettre en place un programme de développement du leadership (coaching exécutif, mentorat, formations certifiantes, cercle de dirigeants)',
        'Développer l\'agilité stratégique : early warning indicators, processus de décision accéléré en mode crise, exercices de simulation, capacité de réallocation rapide des ressources',
      ] : [
        'Formalize the strategic decision process: scoping memo, quantitative analysis (business case, scenarios), consultation, documented decision',
        'Deploy Business Intelligence infrastructure to leverage data in strategic and operational decisions',
        'Structure an innovation culture: ideation process, dedicated innovation budget, innovation partnerships, technology watch',
        'Set up a leadership development program (executive coaching, mentoring, certified training, CEO circle)',
        'Develop strategic agility: early warning indicators, accelerated crisis-mode decision process, simulation exercises, rapid resource reallocation capability',
      ],
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'Excellence du Pilotage Stratégique' : 'Maintain Strategic Steering Excellence',
      axis: 'pilotage-strategique',
      items: isFr ? [
        'Continuer à enrichir le plan stratégique avec des scénarios prospectifs à 10 ans et une vision long terme',
        'Renforcer l\'agilité stratégique avec des processus de veille avancée et des exercices de simulation de disruption',
        'Participer à un CEO Advisory Board pour confronter les décisions stratégiques à des regards externes de haut niveau',
        'Investir dans l\'intelligence artificielle et l\'analytique prédictive pour anticiper les tendances sectorielles',
        'Développer une culture de la performance durable intégrant les enjeux ESG dans le pilotage stratégique',
      ] : [
        'Continue enriching the strategic plan with 10-year foresight scenarios and long-term vision',
        'Strengthen strategic agility with advanced watch processes and disruption simulation exercises',
        'Participate in a CEO Advisory Board to confront strategic decisions with high-level external perspectives',
        'Invest in artificial intelligence and predictive analytics to anticipate sector trends',
        'Develop a sustainable performance culture integrating ESG issues into strategic steering',
      ],
    });
  }

  return recs;
}



