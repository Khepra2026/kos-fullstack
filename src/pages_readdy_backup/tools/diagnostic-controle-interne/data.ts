export interface DiagnosticQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: { value: number; labelFr: string; labelEn: string }[];
}

export interface DiagnosticAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: DiagnosticQuestion[];
}

export const CI_AXES: DiagnosticAxis[] = [
  {
    id: 'environnement-controle',
    titleFr: 'Environnement de Contrôle',
    titleEn: 'Control Environment',
    descriptionFr: 'Tone at the top, éthique, organisation, ressources',
    descriptionEn: 'Tone at the top, ethics, organization, resources',
    icon: 'ri-building-4-line',
    color: '#0f766e',
    questions: [
      {
        id: 'ci-env-1',
        questionFr: 'La direction démontre-t-elle un engagement fort en faveur du contrôle interne (tone at the top) ?',
        questionEn: 'Does management demonstrate strong commitment to internal control (tone at the top)?',
        options: [
          { value: 100, labelFr: 'Engagement formalisé, communication régulière, exemplarité, ressources allouées', labelEn: 'Formalized commitment, regular communication, exemplarity, allocated resources' },
          { value: 60, labelFr: 'Engagement affiché mais mise en œuvre partielle', labelEn: 'Displayed commitment but partial implementation' },
          { value: 25, labelFr: 'Engagement minimal, contrôle perçu comme contrainte', labelEn: 'Minimal commitment, control perceived as constraint' },
          { value: 0, labelFr: 'Aucun engagement visible de la direction', labelEn: 'No visible management commitment' },
        ],
      },
      {
        id: 'ci-env-2',
        questionFr: 'L\'organisation dispose-t-elle d\'un code de conduite formalisé et communiqué à tous les collaborateurs ?',
        questionEn: 'Does the organization have a formalized code of conduct communicated to all employees?',
        options: [
          { value: 100, labelFr: 'Code formalisé, communiqué, signé par tous, formation annuelle, mécanisme de contrôle', labelEn: 'Formalized code, communicated, signed by all, annual training, control mechanism' },
          { value: 60, labelFr: 'Code existant mais communication ou contrôle partiel', labelEn: 'Code exists but partial communication or control' },
          { value: 25, labelFr: 'Code informel ou en cours d\'élaboration', labelEn: 'Informal code or under development' },
          { value: 0, labelFr: 'Aucun code de conduite', labelEn: 'No code of conduct' },
        ],
      },
      {
        id: 'ci-env-3',
        questionFr: 'La structure organisationnelle est-elle claire avec des responsabilités et des délégations de pouvoirs documentées ?',
        questionEn: 'Is the organizational structure clear with documented responsibilities and delegations of authority?',
        options: [
          { value: 100, labelFr: 'Organigramme formalisé, fiches de poste, délégations documentées et à jour', labelEn: 'Formalized org chart, job descriptions, documented and updated delegations' },
          { value: 60, labelFr: 'Structure claire mais documentation partielle', labelEn: 'Clear structure but partial documentation' },
          { value: 25, labelFr: 'Structure informelle, responsabilités floues', labelEn: 'Informal structure, unclear responsibilities' },
          { value: 0, labelFr: 'Aucune structure formalisée', labelEn: 'No formalized structure' },
        ],
      },
      {
        id: 'ci-env-4',
        questionFr: 'Les ressources humaines allouées au contrôle interne sont-elles suffisantes en nombre et en compétences ?',
        questionEn: 'Are human resources allocated to internal control sufficient in number and skills?',
        options: [
          { value: 100, labelFr: 'Équipe dédiée, formée, effectifs suffisants, plan de formation continu', labelEn: 'Dedicated team, trained, sufficient staff, continuous training plan' },
          { value: 60, labelFr: 'Équipe existante mais sous-dimensionnée ou formation insuffisante', labelEn: 'Team exists but understaffed or insufficient training' },
          { value: 25, labelFr: 'Fonction contrôle assurée en complément d\'autres tâches', labelEn: 'Control function performed in addition to other tasks' },
          { value: 0, labelFr: 'Aucune ressource dédiée au contrôle interne', labelEn: 'No dedicated internal control resources' },
        ],
      },
    ],
  },
  {
    id: 'evaluation-risques',
    titleFr: 'Évaluation des Risques',
    titleEn: 'Risk Assessment',
    descriptionFr: 'Identification, analyse, hiérarchisation, cartographie',
    descriptionEn: 'Identification, analysis, prioritization, mapping',
    icon: 'ri-radar-line',
    color: '#d97706',
    questions: [
      {
        id: 'ci-risk-1',
        questionFr: 'Disposez-vous d\'une cartographie des risques opérationnels et financiers exhaustive et mise à jour ?',
        questionEn: 'Do you have an exhaustive and updated operational and financial risk mapping?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive, mise à jour annuelle, approuvée par la direction, plans de mitigation', labelEn: 'Exhaustive mapping, annually updated, management-approved, mitigation plans' },
          { value: 60, labelFr: 'Cartographie existante mais non exhaustive ou non mise à jour', labelEn: 'Mapping exists but not exhaustive or not updated' },
          { value: 25, labelFr: 'Identification informelle des risques', labelEn: 'Informal risk identification' },
          { value: 0, labelFr: 'Aucune cartographie des risques', labelEn: 'No risk mapping' },
        ],
      },
      {
        id: 'ci-risk-2',
        questionFr: 'Les objectifs de contrôle sont-ils clairement définis pour chaque processus critique ?',
        questionEn: 'Are control objectives clearly defined for each critical process?',
        options: [
          { value: 100, labelFr: 'Objectifs SMART documentés pour tous les processus critiques, alignés stratégie', labelEn: 'Documented SMART objectives for all critical processes, strategy-aligned' },
          { value: 60, labelFr: 'Objectifs définis pour les processus principaux', labelEn: 'Objectives defined for main processes' },
          { value: 25, labelFr: 'Objectifs implicites, non formalisés', labelEn: 'Implicit objectives, not formalized' },
          { value: 0, labelFr: 'Aucun objectif de contrôle défini', labelEn: 'No control objectives defined' },
        ],
      },
      {
        id: 'ci-risk-3',
        questionFr: 'La fraude est-elle identifiée comme un risque spécifique avec des scénarios documentés et des contrôles dédiés ?',
        questionEn: 'Is fraud identified as a specific risk with documented scenarios and dedicated controls?',
        options: [
          { value: 100, labelFr: 'Matrice des risques de fraude, scénarios documentés, contrôles anti-fraude, formation, canal alerte', labelEn: 'Fraud risk matrix, documented scenarios, anti-fraud controls, training, alert channel' },
          { value: 60, labelFr: 'Risque de fraude identifié mais contrôles partiels', labelEn: 'Fraud risk identified but partial controls' },
          { value: 25, labelFr: 'Fraude non traitée comme risque spécifique', labelEn: 'Fraud not addressed as specific risk' },
          { value: 0, labelFr: 'Aucune évaluation du risque de fraude', labelEn: 'No fraud risk assessment' },
        ],
      },
    ],
  },
  {
    id: 'activites-controle',
    titleFr: 'Activités de Contrôle',
    titleEn: 'Control Activities',
    descriptionFr: 'Procédures, séparation tâches, contrôles clés, ITGC',
    descriptionEn: 'Procedures, segregation of duties, key controls, ITGC',
    icon: 'ri-shield-check-line',
    color: '#059669',
    questions: [
      {
        id: 'ci-act-1',
        questionFr: 'Les processus critiques sont-ils documentés avec des procédures formalisées et des contrôles clés identifiés ?',
        questionEn: 'Are critical processes documented with formalized procedures and identified key controls?',
        options: [
          { value: 100, labelFr: 'Tous les processus documentés, procédures à jour, contrôles clés identifiés, testés régulièrement', labelEn: 'All processes documented, updated procedures, key controls identified, regularly tested' },
          { value: 60, labelFr: 'Processus principaux documentés, contrôles partiellement formalisés', labelEn: 'Main processes documented, controls partially formalized' },
          { value: 25, labelFr: 'Documentation partielle ou obsolète', labelEn: 'Partial or obsolete documentation' },
          { value: 0, labelFr: 'Aucune documentation des processus', labelEn: 'No process documentation' },
        ],
      },
      {
        id: 'ci-act-2',
        questionFr: 'La séparation des tâches est-elle effective pour les fonctions incompatibles (autorisation, exécution, enregistrement, contrôle) ?',
        questionEn: 'Is segregation of duties effective for incompatible functions (authorization, execution, recording, control)?',
        options: [
          { value: 100, labelFr: 'Séparation documentée, matrice SOD, contrôles compensatoires identifiés, revue périodique', labelEn: 'Documented segregation, SOD matrix, compensatory controls identified, periodic review' },
          { value: 60, labelFr: 'Séparation appliquée mais non formellement documentée', labelEn: 'Segregation applied but not formally documented' },
          { value: 25, labelFr: 'Séparation partielle, conflits identifiés non résolus', labelEn: 'Partial segregation, identified conflicts unresolved' },
          { value: 0, labelFr: 'Aucune séparation des tâches', labelEn: 'No segregation of duties' },
        ],
      },
      {
        id: 'ci-act-3',
        questionFr: 'Les contrôles informatiques généraux (ITGC) sont-ils en place : accès logiques, gestion des changements, opérations ?',
        questionEn: 'Are IT General Controls (ITGC) in place: logical access, change management, operations?',
        options: [
          { value: 100, labelFr: 'ITGC complets, revue périodique, matrice des accès, logs, gestion des changements documentée', labelEn: 'Complete ITGC, periodic review, access matrix, logs, documented change management' },
          { value: 60, labelFr: 'ITGC partiels, couverture des principaux risques', labelEn: 'Partial ITGC, coverage of main risks' },
          { value: 25, labelFr: 'Contrôles informatiques minimaux', labelEn: 'Minimal IT controls' },
          { value: 0, labelFr: 'Aucun contrôle informatique formalisé', labelEn: 'No formal IT controls' },
        ],
      },
      {
        id: 'ci-act-4',
        questionFr: 'Les rapprochements et revues périodiques (comptes, stocks, trésorerie) sont-ils effectués et documentés ?',
        questionEn: 'Are periodic reconciliations and reviews (accounts, inventory, cash) performed and documented?',
        options: [
          { value: 100, labelFr: 'Rapprochements mensuels documentés, revus par la hiérarchie, écarts analysés et corrigés', labelEn: 'Monthly documented reconciliations, reviewed by management, variances analyzed and corrected' },
          { value: 60, labelFr: 'Rapprochements effectués mais documentation ou revue partielle', labelEn: 'Reconciliations performed but partial documentation or review' },
          { value: 25, labelFr: 'Rapprochements ponctuels, non systématiques', labelEn: 'Occasional reconciliations, not systematic' },
          { value: 0, labelFr: 'Aucun rapprochement périodique', labelEn: 'No periodic reconciliations' },
        ],
      },
    ],
  },
  {
    id: 'information-communication',
    titleFr: 'Information & Communication',
    titleEn: 'Information & Communication',
    descriptionFr: 'SIG, reporting, remontée information, communication',
    descriptionEn: 'MIS, reporting, information escalation, communication',
    icon: 'ri-chat-3-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'ci-info-1',
        questionFr: 'Le système d\'information de gestion produit-il des rapports fiables, pertinents et en temps utile pour le pilotage ?',
        questionEn: 'Does the management information system produce reliable, relevant and timely reports for steering?',
        options: [
          { value: 100, labelFr: 'SIG intégré, tableaux de bord automatisés, données fiabilisées, accès en temps réel', labelEn: 'Integrated MIS, automated dashboards, reliable data, real-time access' },
          { value: 60, labelFr: 'SIG fonctionnel mais reporting partiellement automatisé', labelEn: 'Functional MIS but partially automated reporting' },
          { value: 25, labelFr: 'Reporting manuel, risques d\'erreurs', labelEn: 'Manual reporting, risk of errors' },
          { value: 0, labelFr: 'Aucun système de reporting formalisé', labelEn: 'No formal reporting system' },
        ],
      },
      {
        id: 'ci-info-2',
        questionFr: 'Existe-t-il un processus formalisé de remontée des incidents et des dysfonctionnements vers la direction ?',
        questionEn: 'Is there a formalized process for escalating incidents and dysfunctions to management?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, seuils d\'escalade définis, registre des incidents, analyse des causes racines', labelEn: 'Documented procedure, defined escalation thresholds, incident register, root cause analysis' },
          { value: 60, labelFr: 'Remontée effectuée mais procédure non formalisée', labelEn: 'Escalation performed but procedure not formalized' },
          { value: 25, labelFr: 'Remontée informelle, au cas par cas', labelEn: 'Informal escalation, case by case' },
          { value: 0, labelFr: 'Aucun processus de remontée d\'information', labelEn: 'No information escalation process' },
        ],
      },
      {
        id: 'ci-info-3',
        questionFr: 'La communication interne sur le contrôle interne (rôles, responsabilités, résultats) est-elle régulière et efficace ?',
        questionEn: 'Is internal communication on internal control (roles, responsibilities, results) regular and effective?',
        options: [
          { value: 100, labelFr: 'Communication trimestrielle, newsletter, réunions dédiées, intranet, feedback mesuré', labelEn: 'Quarterly communication, newsletter, dedicated meetings, intranet, measured feedback' },
          { value: 60, labelFr: 'Communication ponctuelle, principalement descendante', labelEn: 'Occasional communication, mainly top-down' },
          { value: 25, labelFr: 'Communication minimale, réduite aux situations de crise', labelEn: 'Minimal communication, limited to crisis situations' },
          { value: 0, labelFr: 'Aucune communication sur le contrôle interne', labelEn: 'No internal control communication' },
        ],
      },
    ],
  },
  {
    id: 'pilotage',
    titleFr: 'Pilotage & Surveillance',
    titleEn: 'Monitoring & Oversight',
    descriptionFr: 'Auto-évaluation, audits, indicateurs, amélioration continue',
    descriptionEn: 'Self-assessment, audits, indicators, continuous improvement',
    icon: 'ri-dashboard-line',
    color: '#0891b2',
    questions: [
      {
        id: 'ci-pil-1',
        questionFr: 'Des évaluations périodiques du dispositif de contrôle interne sont-elles réalisées (auto-évaluation, audit interne, audit externe) ?',
        questionEn: 'Are periodic evaluations of the internal control system conducted (self-assessment, internal audit, external audit)?',
        options: [
          { value: 100, labelFr: 'Auto-évaluation annuelle, audits internes trimestriels, audit externe annuel, plans d\'action suivis', labelEn: 'Annual self-assessment, quarterly internal audits, annual external audit, action plans followed' },
          { value: 60, labelFr: 'Audit interne annuel, auto-évaluation non systématique', labelEn: 'Annual internal audit, non-systematic self-assessment' },
          { value: 25, labelFr: 'Évaluations ponctuelles sans planification', labelEn: 'Occasional evaluations without planning' },
          { value: 0, labelFr: 'Aucune évaluation du dispositif de contrôle interne', labelEn: 'No internal control system evaluation' },
        ],
      },
      {
        id: 'ci-pil-2',
        questionFr: 'Disposez-vous d\'indicateurs clés de performance (KPIs) pour mesurer l\'efficacité du contrôle interne ?',
        questionEn: 'Do you have key performance indicators (KPIs) to measure the effectiveness of internal control?',
        options: [
          { value: 100, labelFr: 'KPIs définis, suivis mensuellement, tableau de bord, objectifs d\'amélioration, présentés au CA', labelEn: 'KPIs defined, monthly monitoring, dashboard, improvement objectives, presented to Board' },
          { value: 60, labelFr: 'Quelques indicateurs suivis mais non consolidés', labelEn: 'Some indicators monitored but not consolidated' },
          { value: 25, labelFr: 'Indicateurs absents ou non pertinents', labelEn: 'Indicators absent or not relevant' },
          { value: 0, labelFr: 'Aucun KPI de contrôle interne', labelEn: 'No internal control KPIs' },
        ],
      },
      {
        id: 'ci-pil-3',
        questionFr: 'Les constats d\'audit et les recommandations font-ils l\'objet d\'un suivi systématique avec des plans d\'action datés ?',
        questionEn: 'Are audit findings and recommendations systematically followed up with dated action plans?',
        options: [
          { value: 100, labelFr: 'Suivi systématique, plans d\'action avec responsables et échéances, tableau de bord, escalade si retard', labelEn: 'Systematic follow-up, action plans with owners and deadlines, dashboard, escalation if delayed' },
          { value: 60, labelFr: 'Suivi effectué mais non systématique ou non documenté', labelEn: 'Follow-up performed but not systematic or not documented' },
          { value: 25, labelFr: 'Suivi partiel, recommandations non priorisées', labelEn: 'Partial follow-up, recommendations not prioritized' },
          { value: 0, labelFr: 'Aucun suivi des recommandations d\'audit', labelEn: 'No audit recommendation follow-up' },
        ],
      },
    ],
  },
];

export const TOTAL_CI_QUESTIONS = CI_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getCIScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#0f766e';
  if (score >= 25) return '#d97706';
  return '#dc2626';
}

export function getCIScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Contrôle Interne Maîtrisé' : 'Effective Internal Control';
  if (score >= 50) return isFr ? 'Contrôle Interne Intermédiaire' : 'Intermediate Internal Control';
  if (score >= 25) return isFr ? 'Contrôle Interne Insuffisant' : 'Insufficient Internal Control';
  return isFr ? 'Contrôle Interne Critique' : 'Critical Internal Control';
}

export function getCIMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Maîtrisé' : 'Effective';
  if (score >= 50) return isFr ? 'Intermédiaire' : 'Intermediate';
  if (score >= 25) return isFr ? 'Insuffisant' : 'Insufficient';
  return isFr ? 'Critique' : 'Critical';
}

export function getCIReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre dispositif de contrôle interne est mature et efficace. Continuez à surveiller les indicateurs et à faire évoluer le dispositif avec l\'organisation.'
    : 'Your internal control system is mature and effective. Continue monitoring indicators and evolving the system with the organization.';
  if (score >= 50) return isFr
    ? 'Votre contrôle interne est structuré mais des améliorations ciblées sont nécessaires, notamment sur la formalisation et le pilotage.'
    : 'Your internal control is structured but targeted improvements are needed, particularly on formalization and monitoring.';
  if (score >= 25) return isFr
    ? 'Votre contrôle interne présente des lacunes significatives exposant l\'organisation à des erreurs, fraudes et non-conformités.'
    : 'Your internal control has significant gaps exposing the organization to errors, fraud and non-compliance.';
  return isFr
    ? 'Votre contrôle interne est critique. L\'absence de dispositif structuré expose l\'organisation à des risques majeurs de pertes financières et de non-conformité.'
    : 'Your internal control is critical. The absence of a structured system exposes the organization to major risks of financial losses and non-compliance.';
}

export function getCIRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const envScore = perAxis['environnement-controle'] ?? 0;
  const riskScore = perAxis['evaluation-risques'] ?? 0;
  const actScore = perAxis['activites-controle'] ?? 0;
  const infoScore = perAxis['information-communication'] ?? 0;
  const pilScore = perAxis['pilotage'] ?? 0;

  if (envScore < 50) risks.push(isFr ? 'Environnement de contrôle défaillant — absence d\'engagement de la direction ou de cadre éthique' : 'Failing control environment — absence of management commitment or ethical framework');
  if (riskScore < 50) risks.push(isFr ? 'Évaluation des risques absente — pas de cartographie, exposition aux risques opérationnels non maîtrisés' : 'Absent risk assessment — no mapping, exposure to uncontrolled operational risks');
  if (actScore < 50) risks.push(isFr ? 'Activités de contrôle insuffisantes — absence de procédures, séparation des tâches ou contrôles IT' : 'Insufficient control activities — absence of procedures, segregation of duties or IT controls');
  if (infoScore < 50) risks.push(isFr ? 'Information et communication défaillantes — reporting non fiable, pas de remontée d\'incidents' : 'Failing information and communication — unreliable reporting, no incident escalation');
  if (pilScore < 50) risks.push(isFr ? 'Absence de pilotage — pas d\'évaluation ni de suivi des recommandations d\'audit' : 'Absence of monitoring — no evaluation or audit recommendation follow-up');
  if (globalScore < 25) risks.push(isFr ? 'Risque critique : défaillance systémique du contrôle interne — exposition à des pertes financières significatives et sanctions réglementaires' : 'Critical risk: systemic internal control failure — exposure to significant financial losses and regulatory sanctions');

  return risks;
}

export function getCIRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];
  const envScore = perAxis['environnement-controle'] ?? 0;
  const riskScore = perAxis['evaluation-risques'] ?? 0;
  const actScore = perAxis['activites-controle'] ?? 0;
  const infoScore = perAxis['information-communication'] ?? 0;
  const pilScore = perAxis['pilotage'] ?? 0;

  if (envScore < 50) recs.push({ title: isFr ? 'Renforcer l\'environnement de contrôle' : 'Strengthen control environment', axis: 'environnement-controle', items: isFr ? ['Formaliser l\'engagement de la direction (tone at the top)', 'Déployer un code de conduite signé par tous', 'Documenter la structure organisationnelle et les délégations', 'Allouer des ressources suffisantes au contrôle interne'] : ['Formalize management commitment (tone at the top)', 'Deploy code of conduct signed by all', 'Document organizational structure and delegations', 'Allocate sufficient internal control resources'] });
  if (riskScore < 50) recs.push({ title: isFr ? 'Structurer l\'évaluation des risques' : 'Structure risk assessment', axis: 'evaluation-risques', items: isFr ? ['Réaliser une cartographie exhaustive des risques', 'Définir des objectifs de contrôle SMART par processus', 'Documenter les scénarios de fraude', 'Hiérarchiser les risques par criticité'] : ['Conduct exhaustive risk mapping', 'Define SMART control objectives per process', 'Document fraud scenarios', 'Prioritize risks by criticality'] });
  if (actScore < 50) recs.push({ title: isFr ? 'Formaliser les activités de contrôle' : 'Formalize control activities', axis: 'activites-controle', items: isFr ? ['Documenter les procédures pour tous les processus critiques', 'Mettre en place une matrice de séparation des tâches', 'Déployer les contrôles ITGC', 'Systématiser les rapprochements et revues périodiques'] : ['Document procedures for all critical processes', 'Implement segregation of duties matrix', 'Deploy ITGC controls', 'Systematize periodic reconciliations and reviews'] });
  if (infoScore < 50) recs.push({ title: isFr ? 'Améliorer l\'information et la communication' : 'Improve information and communication', axis: 'information-communication', items: isFr ? ['Mettre en place un SIG fiable avec tableaux de bord', 'Formaliser la procédure de remontée des incidents', 'Instaurer une communication interne régulière sur le contrôle'] : ['Implement reliable MIS with dashboards', 'Formalize incident escalation procedure', 'Establish regular internal communication on control'] });
  if (pilScore < 50) recs.push({ title: isFr ? 'Mettre en place un pilotage efficace' : 'Implement effective monitoring', axis: 'pilotage', items: isFr ? ['Planifier des évaluations périodiques du dispositif', 'Définir et suivre des KPIs de contrôle interne', 'Systématiser le suivi des recommandations d\'audit', 'Instaurer un comité de contrôle interne'] : ['Schedule periodic system evaluations', 'Define and monitor internal control KPIs', 'Systematize audit recommendation follow-up', 'Establish internal control committee'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence du contrôle interne' : 'Maintain internal control excellence', axis: 'pilotage', items: isFr ? ['Poursuivre l\'évaluation continue du dispositif', 'Mettre à jour la cartographie des risques annuellement', 'Renforcer l\'automatisation des contrôles', 'Benchmarker avec les standards COSO 2013'] : ['Continue continuous system evaluation', 'Update risk mapping annually', 'Strengthen control automation', 'Benchmark with COSO 2013 standards'] });

  return recs;
}



