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

export const BCEAO_AXES: DiagnosticAxis[] = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Organisation',
    titleEn: 'Governance & Organization',
    descriptionFr: 'CA, comités, séparation pouvoirs, plan de relève, organigramme',
    descriptionEn: 'Board, committees, separation of powers, succession plan, org chart',
    icon: 'ri-government-line',
    color: '#059669',
    questions: [
      {
        id: 'bceao-gov-1',
        questionFr: 'Votre Conseil d\'Administration est-il conforme aux exigences BCEAO (Circulaires 01-03/2017/CB) en matière de composition et d\'administrateurs indépendants ?',
        questionEn: 'Is your Board of Directors compliant with BCEAO requirements (Circulars 01-03/2017/CB) regarding composition and independent directors?',
        options: [
          { value: 100, labelFr: 'CA pleinement conforme, comités spécialisés fonctionnels, administrateurs indépendants nommés et déclarés', labelEn: 'Fully compliant Board, functional specialized committees, independent directors appointed and declared' },
          { value: 60, labelFr: 'CA conforme mais comités partiellement opérationnels', labelEn: 'Compliant Board but committees partially operational' },
          { value: 25, labelFr: 'CA existant mais non conforme aux exigences de la Circulaire 01/2017/CB', labelEn: 'Board exists but not compliant with Circular 01/2017/CB requirements' },
          { value: 0, labelFr: 'Aucun CA formalisé ou CA totalement non conforme', labelEn: 'No formal Board or totally non-compliant Board' },
        ],
      },
      {
        id: 'bceao-gov-2',
        questionFr: 'Les fonctions de Président du CA et de Directeur Général sont-elles effectivement séparées conformément à la Circulaire 01/2017/CB ?',
        questionEn: 'Are the Chairman and CEO roles effectively separated in accordance with Circular 01/2017/CB?',
        options: [
          { value: 100, labelFr: 'Séparation effective, politique de conflits d\'intérêts documentée et appliquée, registre tenu', labelEn: 'Effective separation, documented and enforced conflict of interest policy, register maintained' },
          { value: 60, labelFr: 'Séparation formelle mais politique de conflits d\'intérêts non systématiquement appliquée', labelEn: 'Formal separation but conflict of interest policy not systematically enforced' },
          { value: 25, labelFr: 'Cumul des fonctions sans justification documentée', labelEn: 'Role combination without documented justification' },
          { value: 0, labelFr: 'Aucune séparation ni politique de conflits d\'intérêts', labelEn: 'No separation or conflict of interest policy' },
        ],
      },
      {
        id: 'bceao-gov-3',
        questionFr: 'Disposez-vous d\'un plan de relève de direction documenté et validé par le Conseil (exigence Circulaire 01/2017/CB) ?',
        questionEn: 'Do you have a documented management succession plan validated by the Board (Circular 01/2017/CB requirement)?',
        options: [
          { value: 100, labelFr: 'Plan de relève documenté, validé par le CA, mis à jour annuellement, successeurs identifiés', labelEn: 'Documented succession plan, validated by Board, updated annually, successors identified' },
          { value: 60, labelFr: 'Plan de relève en cours d\'élaboration ou partiellement documenté', labelEn: 'Succession plan under development or partially documented' },
          { value: 25, labelFr: 'Réflexion initiée sans document formalisé', labelEn: 'Reflection initiated without formal document' },
          { value: 0, labelFr: 'Aucun plan de relève de direction', labelEn: 'No management succession plan' },
        ],
      },
      {
        id: 'bceao-gov-4',
        questionFr: 'L\'organigramme est-il formalisé avec des délégations de pouvoirs claires et une séparation effective des fonctions de contrôle ?',
        questionEn: 'Is the organization chart formalized with clear delegations of authority and effective segregation of control functions?',
        options: [
          { value: 100, labelFr: 'Organigramme formalisé, fiches de poste, délégations documentées, indépendance des fonctions de contrôle', labelEn: 'Formalized org chart, job descriptions, documented delegations, independent control functions' },
          { value: 60, labelFr: 'Organigramme existant mais fiches de poste ou délégations partiellement documentées', labelEn: 'Org chart exists but job descriptions or delegations partially documented' },
          { value: 25, labelFr: 'Organigramme informel sans délégations formalisées', labelEn: 'Informal org chart without formal delegations' },
          { value: 0, labelFr: 'Aucun organigramme ni description de fonctions', labelEn: 'No org chart or job descriptions' },
        ],
      },
    ],
  },
  {
    id: 'controle-interne',
    titleFr: 'Contrôle Interne & Audit',
    titleEn: 'Internal Control & Audit',
    descriptionFr: 'Dispositif de contrôle, audit interne, commissariat aux comptes, reporting',
    descriptionEn: 'Control system, internal audit, statutory audit, reporting',
    icon: 'ri-shield-check-line',
    color: '#0f766e',
    questions: [
      {
        id: 'bceao-ci-1',
        questionFr: 'Disposez-vous d\'un dispositif de contrôle interne formalisé conforme aux exigences BCEAO (Circulaire 03/2017/CB) ?',
        questionEn: 'Do you have a formalized internal control system compliant with BCEAO requirements (Circular 03/2017/CB)?',
        options: [
          { value: 100, labelFr: 'Dispositif complet : cartographie des risques, plan de contrôle, procédures documentées, tests réguliers', labelEn: 'Complete system: risk mapping, control plan, documented procedures, regular testing' },
          { value: 60, labelFr: 'Dispositif existant mais documentation partielle ou tests non systématiques', labelEn: 'System exists but partial documentation or non-systematic testing' },
          { value: 25, labelFr: 'Contrôles informels sans cadre documenté', labelEn: 'Informal controls without documented framework' },
          { value: 0, labelFr: 'Aucun dispositif de contrôle interne formalisé', labelEn: 'No formal internal control system' },
        ],
      },
      {
        id: 'bceao-ci-2',
        questionFr: 'La fonction d\'audit interne est-elle indépendante et dispose-t-elle d\'un plan d\'audit annuel approuvé par le Conseil ?',
        questionEn: 'Is the internal audit function independent and does it have an annual audit plan approved by the Board?',
        options: [
          { value: 100, labelFr: 'Audit interne indépendant, plan annuel approuvé, rapports au Comité d\'Audit, suivi des recommandations', labelEn: 'Independent internal audit, approved annual plan, reports to Audit Committee, recommendation follow-up' },
          { value: 60, labelFr: 'Audit interne existant mais plan non systématiquement approuvé ou suivi partiel', labelEn: 'Internal audit exists but plan not systematically approved or partial follow-up' },
          { value: 25, labelFr: 'Fonction d\'audit interne non indépendante ou sans plan formalisé', labelEn: 'Internal audit function not independent or without formal plan' },
          { value: 0, labelFr: 'Aucune fonction d\'audit interne', labelEn: 'No internal audit function' },
        ],
      },
      {
        id: 'bceao-ci-3',
        questionFr: 'Le commissaire aux comptes est-il nommé conformément à l\'OHADA et ses rapports sont-ils présentés au Conseil dans les délais ?',
        questionEn: 'Is the statutory auditor appointed in compliance with OHADA and are their reports presented to the Board on time?',
        options: [
          { value: 100, labelFr: 'CAC nommé conformément AUSCGIE, rapports dans les délais, recommandations suivies', labelEn: 'Auditor appointed per AUSCGIE, reports on time, recommendations followed' },
          { value: 60, labelFr: 'CAC nommé mais certains rapports en retard ou recommandations partiellement suivies', labelEn: 'Auditor appointed but some reports late or recommendations partially followed' },
          { value: 25, labelFr: 'CAC nommé sans suivi structuré des recommandations', labelEn: 'Auditor appointed without structured follow-up of recommendations' },
          { value: 0, labelFr: 'Aucun commissaire aux comptes nommé', labelEn: 'No statutory auditor appointed' },
        ],
      },
      {
        id: 'bceao-ci-4',
        questionFr: 'Disposez-vous d\'un mécanisme de remontée d\'alerte (whistleblowing) protégé et documenté ?',
        questionEn: 'Do you have a protected and documented whistleblowing mechanism?',
        options: [
          { value: 100, labelFr: 'Mécanisme formalisé, canal sécurisé, protection documentée, procédure de traitement', labelEn: 'Formal mechanism, secure channel, documented protection, processing procedure' },
          { value: 60, labelFr: 'Mécanisme existant mais protection non formalisée', labelEn: 'Mechanism exists but protection not formalized' },
          { value: 25, labelFr: 'Canal informel sans procédure documentée', labelEn: 'Informal channel without documented procedure' },
          { value: 0, labelFr: 'Aucun mécanisme de remontée d\'alerte', labelEn: 'No whistleblowing mechanism' },
        ],
      },
    ],
  },
  {
    id: 'gestion-risques',
    titleFr: 'Gestion des Risques',
    titleEn: 'Risk Management',
    descriptionFr: 'Cartographie risques, appétit au risque, ALM, ratios prudentiels, stress tests',
    descriptionEn: 'Risk mapping, risk appetite, ALM, prudential ratios, stress tests',
    icon: 'ri-alert-line',
    color: '#d97706',
    questions: [
      {
        id: 'bceao-risk-1',
        questionFr: 'Disposez-vous d\'une cartographie des risques exhaustive couvrant les risques de crédit, marché, liquidité, opérationnels et de conformité ?',
        questionEn: 'Do you have an exhaustive risk map covering credit, market, liquidity, operational and compliance risks?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive, mise à jour annuelle, approuvée par le CA, plans de mitigation', labelEn: 'Exhaustive mapping, annually updated, Board-approved, mitigation plans' },
          { value: 60, labelFr: 'Cartographie existante mais non exhaustive ou non mise à jour', labelEn: 'Mapping exists but not exhaustive or not updated' },
          { value: 25, labelFr: 'Analyse informelle sans cartographie formalisée', labelEn: 'Informal analysis without formal mapping' },
          { value: 0, labelFr: 'Aucune cartographie des risques', labelEn: 'No risk mapping' },
        ],
      },
      {
        id: 'bceao-risk-2',
        questionFr: 'Le dispositif ALM est-il opérationnel avec un comité ALM fonctionnel et des gaps de liquidité mesurés ?',
        questionEn: 'Is the ALM system operational with a functional ALM committee and measured liquidity gaps?',
        options: [
          { value: 100, labelFr: 'Comité ALM trimestriel, gaps mesurés, ratios respectés, stress tests liquidité réalisés', labelEn: 'Quarterly ALM committee, measured gaps, compliant ratios, liquidity stress tests conducted' },
          { value: 60, labelFr: 'Dispositif ALM existant mais comité irrégulier ou stress tests non systématiques', labelEn: 'ALM system exists but irregular committee or non-systematic stress tests' },
          { value: 25, labelFr: 'Suivi basique de la liquidité sans ALM structuré', labelEn: 'Basic liquidity monitoring without structured ALM' },
          { value: 0, labelFr: 'Aucun dispositif ALM', labelEn: 'No ALM system' },
        ],
      },
      {
        id: 'bceao-risk-3',
        questionFr: 'Les ratios prudentiels BCEAO (solvabilité, liquidité, division des risques) sont-ils calculés, respectés et déclarés ?',
        questionEn: 'Are BCEAO prudential ratios (solvency, liquidity, risk division) calculated, respected and reported?',
        options: [
          { value: 100, labelFr: 'Tous les ratios calculés et respectés, reporting conforme aux formats et délais BCEAO', labelEn: 'All ratios calculated and respected, reporting compliant with BCEAO formats and deadlines' },
          { value: 60, labelFr: 'Ratios principaux respectés mais certains ratios secondaires proches des seuils', labelEn: 'Main ratios respected but some secondary ratios near thresholds' },
          { value: 25, labelFr: 'Certains ratios non respectés ou calculs non conformes', labelEn: 'Some ratios not respected or calculations non-compliant' },
          { value: 0, labelFr: 'Ratios non calculés ou non déclarés', labelEn: 'Ratios not calculated or not reported' },
        ],
      },
      {
        id: 'bceao-risk-4',
        questionFr: 'Réalisez-vous des stress tests (liquidité, crédit, taux) avec scénarios documentés et plans de contingence ?',
        questionEn: 'Do you conduct stress tests (liquidity, credit, rate) with documented scenarios and contingency plans?',
        options: [
          { value: 100, labelFr: 'Stress tests semestriels, scénarios documentés, plans de contingence testés, présentés au CA', labelEn: 'Semi-annual stress tests, documented scenarios, tested contingency plans, presented to Board' },
          { value: 60, labelFr: 'Stress tests réalisés mais scénarios limités ou plans non testés', labelEn: 'Stress tests conducted but limited scenarios or untested plans' },
          { value: 25, labelFr: 'Stress tests ponctuels sans cadre formalisé', labelEn: 'Occasional stress tests without formal framework' },
          { value: 0, labelFr: 'Aucun stress test réalisé', labelEn: 'No stress tests conducted' },
        ],
      },
    ],
  },
  {
    id: 'lbcft',
    titleFr: 'Conformité LBC/FT',
    titleEn: 'AML/CFT Compliance',
    descriptionFr: 'Dispositif LBC/FT, KYC, déclaration soupçon, formation, CENTIF/GIABA',
    descriptionEn: 'AML/CFT system, KYC, suspicious reporting, training, CENTIF/GIABA',
    icon: 'ri-file-search-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'bceao-lbcft-1',
        questionFr: 'Disposez-vous d\'un dispositif LBC/FT complet : responsable désigné, politique approuvée, procédures KYC ?',
        questionEn: 'Do you have a complete AML/CFT system: designated officer, approved policy, KYC procedures?',
        options: [
          { value: 100, labelFr: 'Dispositif complet, responsable formé, politique approuvée par le CA, procédures appliquées', labelEn: 'Complete system, trained officer, Board-approved policy, applied procedures' },
          { value: 60, labelFr: 'Responsable désigné et politique existante mais procédures partiellement appliquées', labelEn: 'Designated officer and policy exist but procedures partially applied' },
          { value: 25, labelFr: 'Dispositif minimal sans politique formalisée', labelEn: 'Minimal system without formal policy' },
          { value: 0, labelFr: 'Aucun dispositif LBC/FT', labelEn: 'No AML/CFT system' },
        ],
      },
      {
        id: 'bceao-lbcft-2',
        questionFr: 'Les procédures KYC incluent-elles l\'identification des bénéficiaires effectifs et la vérification PPE ?',
        questionEn: 'Do KYC procedures include beneficial owner identification and PEP verification?',
        options: [
          { value: 100, labelFr: 'KYC complet : identité, BE, PPE, listes sanctions, mise à jour périodique', labelEn: 'Complete KYC: identity, BO, PEP, sanctions lists, periodic update' },
          { value: 60, labelFr: 'KYC avec identification BE mais vérification PPE non systématique', labelEn: 'KYC with BO identification but PEP verification not systematic' },
          { value: 25, labelFr: 'KYC basique sans identification systématique des BE', labelEn: 'Basic KYC without systematic BO identification' },
          { value: 0, labelFr: 'Aucune procédure KYC formalisée', labelEn: 'No formal KYC procedure' },
        ],
      },
      {
        id: 'bceao-lbcft-3',
        questionFr: 'Avez-vous une procédure de déclaration de soupçon auprès de la CENTIF et vos équipes sont-elles formées ?',
        questionEn: 'Do you have a suspicious transaction reporting procedure to CENTIF and are your teams trained?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, personnel formé annuellement, déclarations conformes, registre tenu', labelEn: 'Documented procedure, annually trained staff, compliant declarations, register maintained' },
          { value: 60, labelFr: 'Procédure existante mais formation non systématique', labelEn: 'Procedure exists but training not systematic' },
          { value: 25, labelFr: 'Procédure non formalisée, équipes non formées', labelEn: 'Non-formalized procedure, untrained teams' },
          { value: 0, labelFr: 'Aucune procédure de déclaration de soupçon', labelEn: 'No suspicious transaction reporting procedure' },
        ],
      },
      {
        id: 'bceao-lbcft-4',
        questionFr: 'Les données de conformité LBC/FT sont-elles conservées au moins 10 ans et accessibles en cas de contrôle BCEAO ?',
        questionEn: 'Are AML/CFT compliance data retained for at least 10 years and accessible for BCEAO inspection?',
        options: [
          { value: 100, labelFr: 'Conservation conforme, données centralisées, accessibles, sauvegardées, traçabilité', labelEn: 'Compliant retention, centralized data, accessible, backed up, traceability' },
          { value: 60, labelFr: 'Conservation assurée mais données non centralisées', labelEn: 'Retention ensured but data not centralized' },
          { value: 25, labelFr: 'Conservation non systématique ou durée insuffisante', labelEn: 'Non-systematic retention or insufficient duration' },
          { value: 0, labelFr: 'Aucune politique de conservation', labelEn: 'No retention policy' },
        ],
      },
    ],
  },
  {
    id: 'reporting',
    titleFr: 'Reporting & Transparence',
    titleEn: 'Reporting & Transparency',
    descriptionFr: 'États réglementaires, SIG, déclarations, transparence financière',
    descriptionEn: 'Regulatory statements, MIS, declarations, financial transparency',
    icon: 'ri-bar-chart-box-line',
    color: '#0891b2',
    questions: [
      {
        id: 'bceao-rep-1',
        questionFr: 'Les états réglementaires (SIG, états financiers, états prudentiels) sont-ils transmis à la BCEAO dans les délais impartis ?',
        questionEn: 'Are regulatory statements (MIS, financial statements, prudential statements) transmitted to BCEAO within deadlines?',
        options: [
          { value: 100, labelFr: 'Tous les états transmis dans les délais, sans rejet ni reprise, processus automatisé', labelEn: 'All statements transmitted on time, no rejection or resubmission, automated process' },
          { value: 60, labelFr: 'États transmis avec quelques retards ponctuels', labelEn: 'Statements transmitted with occasional delays' },
          { value: 25, labelFr: 'Retards fréquents ou états incomplets', labelEn: 'Frequent delays or incomplete statements' },
          { value: 0, labelFr: 'États non transmis ou systématiquement en retard', labelEn: 'Statements not transmitted or systematically late' },
        ],
      },
      {
        id: 'bceao-rep-2',
        questionFr: 'Disposez-vous d\'un système d\'information de gestion (SIG) permettant un reporting fiable et en temps réel ?',
        questionEn: 'Do you have a management information system (MIS) enabling reliable real-time reporting?',
        options: [
          { value: 100, labelFr: 'SIG intégré, reporting temps réel, tableaux de bord direction, données fiabilisées', labelEn: 'Integrated MIS, real-time reporting, management dashboards, reliable data' },
          { value: 60, labelFr: 'SIG fonctionnel mais reporting partiellement automatisé', labelEn: 'Functional MIS but partially automated reporting' },
          { value: 25, labelFr: 'Reporting manuel sur tableurs, risques d\'erreurs', labelEn: 'Manual spreadsheet reporting, risk of errors' },
          { value: 0, labelFr: 'Aucun SIG formalisé', labelEn: 'No formal MIS' },
        ],
      },
      {
        id: 'bceao-rep-3',
        questionFr: 'La communication financière et les publications légales sont-elles conformes aux exigences BCEAO et OHADA ?',
        questionEn: 'Are financial communication and legal publications compliant with BCEAO and OHADA requirements?',
        options: [
          { value: 100, labelFr: 'Publications conformes, délais respectés, états certifiés, rapports CAC', labelEn: 'Compliant publications, respected deadlines, certified statements, auditor reports' },
          { value: 60, labelFr: 'Publications réalisées mais parfois avec retard', labelEn: 'Publications made but sometimes delayed' },
          { value: 25, labelFr: 'Publications incomplètes ou non systématiques', labelEn: 'Incomplete or non-systematic publications' },
          { value: 0, labelFr: 'Aucune publication financière', labelEn: 'No financial publication' },
        ],
      },
      {
        id: 'bceao-rep-4',
        questionFr: 'Avez-vous fait l\'objet d\'une inspection BCEAO au cours des 3 dernières années ? Si oui, quel a été le résultat ?',
        questionEn: 'Have you been subject to a BCEAO inspection in the last 3 years? If yes, what was the result?',
        options: [
          { value: 100, labelFr: 'Inspection favorable, sans réserve majeure, recommandations traitées', labelEn: 'Favorable inspection, no major reservations, recommendations addressed' },
          { value: 60, labelFr: 'Inspection avec réserves mineures, plan d\'action en cours', labelEn: 'Inspection with minor reservations, action plan in progress' },
          { value: 25, labelFr: 'Inspection avec réserves significatives ou plan non clôturé', labelEn: 'Inspection with significant reservations or unclosed plan' },
          { value: 0, labelFr: 'Inspection défavorable / sanctions / aucune inspection', labelEn: 'Unfavorable inspection / sanctions / no inspection' },
        ],
      },
    ],
  },
];

export const TOTAL_BCEAO_QUESTIONS = BCEAO_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getBCEAOScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#d97706';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getBCEAOScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible Risque — Bonne Préparation' : 'Low Risk — Good Preparation';
  if (score >= 50) return isFr ? 'Risque Modéré — Améliorations Nécessaires' : 'Moderate Risk — Improvements Needed';
  if (score >= 25) return isFr ? 'Risque Élevé — Action Urgente Requise' : 'High Risk — Urgent Action Required';
  return isFr ? 'Risque Critique — Intervention Immédiate' : 'Critical Risk — Immediate Intervention';
}

export function getBCEAORiskClass(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible risque' : 'Low risk';
  if (score >= 50) return isFr ? 'Risque modéré' : 'Moderate risk';
  if (score >= 25) return isFr ? 'Risque élevé' : 'High risk';
  return isFr ? 'Risque critique' : 'Critical risk';
}

export function getBCEAOReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre institution est bien préparée pour une inspection BCEAO. Maintenez votre dispositif à jour et poursuivez les tests réguliers.'
    : 'Your institution is well prepared for a BCEAO inspection. Keep your system updated and continue regular testing.';
  if (score >= 50) return isFr
    ? 'Votre institution présente un niveau de préparation acceptable mais des lacunes ciblées doivent être corrigées avant une inspection BCEAO.'
    : 'Your institution has an acceptable preparation level but targeted gaps must be addressed before a BCEAO inspection.';
  if (score >= 25) return isFr
    ? 'Des lacunes significatives seraient identifiées lors d\'une inspection BCEAO. Un plan d\'action prioritaire doit être lancé sans délai.'
    : 'Significant gaps would be identified during a BCEAO inspection. A priority action plan must be launched without delay.';
  return isFr
    ? 'Votre institution est exposée à un risque critique de sanctions BCEAO. Les défaillances justifient une intervention immédiate du Conseil.'
    : 'Your institution is exposed to a critical risk of BCEAO sanctions. Failures justify immediate Board intervention.';
}

export function getBCEAORisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const lbcftScore = perAxis['lbcft'] ?? 0;
  const repScore = perAxis['reporting'] ?? 0;

  if (govScore < 50) risks.push(isFr ? 'Gouvernance non conforme à la Circulaire 01/2017/CB — risque de mise en demeure BCEAO' : 'Governance non-compliant with Circular 01/2017/CB — risk of BCEAO formal notice');
  if (ciScore < 50) risks.push(isFr ? 'Contrôle interne insuffisant — risque de sanction au titre de la Circulaire 03/2017/CB' : 'Insufficient internal control — risk of sanction under Circular 03/2017/CB');
  if (riskScore < 50) risks.push(isFr ? 'Gestion des risques non structurée — non-conformité aux exigences prudentielles BCEAO' : 'Unstructured risk management — non-compliance with BCEAO prudential requirements');
  if (lbcftScore < 50) risks.push(isFr ? 'Dispositif LBC/FT lacunaire — risque de sanction CENTIF et GIABA' : 'Deficient AML/CFT system — risk of CENTIF and GIABA sanction');
  if (repScore < 50) risks.push(isFr ? 'Reporting réglementaire défaillant — risque de pénalités BCEAO pour non-transmission ou retard' : 'Failing regulatory reporting — risk of BCEAO penalties for non-transmission or delay');
  if (globalScore < 25) risks.push(isFr ? 'Profil critique : plusieurs défaillances majeures — exposition à des sanctions BCEAO pouvant aller jusqu\'à l\'administration provisoire' : 'Critical profile: several major failures — exposure to BCEAO sanctions up to provisional administration');

  return risks;
}

export function getBCEAORecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];
  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const lbcftScore = perAxis['lbcft'] ?? 0;
  const repScore = perAxis['reporting'] ?? 0;

  if (govScore < 50) recs.push({ title: isFr ? 'Mettre la gouvernance en conformité Circulaire 01/2017/CB' : 'Bring governance into Circular 01/2017/CB compliance', axis: 'gouvernance', items: isFr ? ['Revoir la composition du CA avec administrateurs indépendants', 'Rendre opérationnels les comités spécialisés', 'Formaliser le plan de relève de direction', 'Documenter les conventions réglementées OHADA'] : ['Review Board composition with independent directors', 'Operationalize specialized committees', 'Formalize management succession plan', 'Document OHADA regulated agreements'] });
  if (ciScore < 50) recs.push({ title: isFr ? 'Structurer le contrôle interne Circulaire 03/2017/CB' : 'Structure internal control per Circular 03/2017/CB', axis: 'controle-interne', items: isFr ? ['Documenter le dispositif de contrôle interne', 'Rendre l\'audit interne indépendant', 'Élaborer un plan d\'audit annuel', 'Mettre en place un mécanisme de whistleblowing'] : ['Document internal control system', 'Make internal audit independent', 'Develop annual audit plan', 'Implement whistleblowing mechanism'] });
  if (riskScore < 50) recs.push({ title: isFr ? 'Structurer la gestion des risques' : 'Structure risk management', axis: 'gestion-risques', items: isFr ? ['Élaborer une cartographie exhaustive des risques', 'Rendre le comité ALM opérationnel', 'Fiabiliser le calcul des ratios prudentiels', 'Mettre en place des stress tests semestriels'] : ['Develop exhaustive risk mapping', 'Make ALM committee operational', 'Make prudential ratio calculation reliable', 'Implement semi-annual stress tests'] });
  if (lbcftScore < 50) recs.push({ title: isFr ? 'Renforcer le dispositif LBC/FT' : 'Strengthen AML/CFT system', axis: 'lbcft', items: isFr ? ['Désigner un responsable LBC/FT formé', 'Formaliser les procédures KYC complètes', 'Documenter la procédure de déclaration de soupçon', 'Former les équipes annuellement'] : ['Designate trained AML/CFT officer', 'Formalize complete KYC procedures', 'Document suspicious reporting procedure', 'Train teams annually'] });
  if (repScore < 50) recs.push({ title: isFr ? 'Fiabiliser le reporting réglementaire' : 'Make regulatory reporting reliable', axis: 'reporting', items: isFr ? ['Automatiser la transmission des états réglementaires', 'Mettre en place un SIG intégré', 'Respecter les délais de publication légale', 'Préparer un dossier d\'inspection complet'] : ['Automate regulatory statement transmission', 'Implement integrated MIS', 'Respect legal publication deadlines', 'Prepare complete inspection file'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence de conformité BCEAO' : 'Maintain BCEAO compliance excellence', axis: 'gouvernance', items: isFr ? ['Poursuivre la mise à jour annuelle des documentations', 'Renforcer la veille réglementaire BCEAO', 'Maintenir le rythme des tests et formations', 'Anticiper les nouvelles instructions BCEAO'] : ['Continue annual documentation updates', 'Strengthen BCEAO regulatory monitoring', 'Maintain testing and training pace', 'Anticipate new BCEAO instructions'] });

  return recs;
}



