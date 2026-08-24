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

export const COBAC_AXES: DiagnosticAxis[] = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Organisation',
    titleEn: 'Governance & Organization',
    descriptionFr: 'CA, comités spécialisés, séparation pouvoirs, conventions réglementées',
    descriptionEn: 'Board, specialized committees, separation of powers, regulated agreements',
    icon: 'ri-government-line',
    color: '#0f766e',
    questions: [
      {
        id: 'cobac-gov-1',
        questionFr: 'Votre Conseil d\'Administration est-il conforme aux exigences COBAC (Règlement R-2016/01) en matière de composition et d\'administrateurs indépendants ?',
        questionEn: 'Is your Board of Directors compliant with COBAC requirements (Regulation R-2016/01) regarding composition and independent directors?',
        options: [
          { value: 100, labelFr: 'CA pleinement conforme, comités spécialisés fonctionnels, administrateurs indépendants nommés', labelEn: 'Fully compliant Board, functional specialized committees, independent directors appointed' },
          { value: 60, labelFr: 'CA conforme mais comités partiellement opérationnels', labelEn: 'Compliant Board but committees partially operational' },
          { value: 25, labelFr: 'CA existant mais non conforme au Règlement R-2016/01', labelEn: 'Board exists but not compliant with Regulation R-2016/01' },
          { value: 0, labelFr: 'Aucun CA formalisé ou CA totalement non conforme', labelEn: 'No formal Board or totally non-compliant Board' },
        ],
      },
      {
        id: 'cobac-gov-2',
        questionFr: 'Les fonctions de Président du CA et de Directeur Général sont-elles effectivement séparées conformément au Règlement COBAC ?',
        questionEn: 'Are the Chairman and CEO roles effectively separated in accordance with COBAC Regulation?',
        options: [
          { value: 100, labelFr: 'Séparation effective, politique de conflits d\'intérêts documentée et appliquée', labelEn: 'Effective separation, documented and enforced conflict of interest policy' },
          { value: 60, labelFr: 'Séparation formelle mais politique non systématiquement appliquée', labelEn: 'Formal separation but policy not systematically enforced' },
          { value: 25, labelFr: 'Cumul des fonctions sans justification documentée', labelEn: 'Role combination without documented justification' },
          { value: 0, labelFr: 'Aucune séparation ni politique de conflits d\'intérêts', labelEn: 'No separation or conflict of interest policy' },
        ],
      },
      {
        id: 'cobac-gov-3',
        questionFr: 'Disposez-vous d\'un plan de relève de direction documenté et validé par le Conseil ?',
        questionEn: 'Do you have a documented management succession plan validated by the Board?',
        options: [
          { value: 100, labelFr: 'Plan de relève documenté, validé par le CA, mis à jour annuellement', labelEn: 'Documented succession plan, validated by Board, updated annually' },
          { value: 60, labelFr: 'Plan de relève en cours d\'élaboration ou partiellement documenté', labelEn: 'Succession plan under development or partially documented' },
          { value: 25, labelFr: 'Réflexion initiée sans document formalisé', labelEn: 'Reflection initiated without formal document' },
          { value: 0, labelFr: 'Aucun plan de relève de direction', labelEn: 'No management succession plan' },
        ],
      },
      {
        id: 'cobac-gov-4',
        questionFr: 'Les conventions réglementées sont-elles documentées et approuvées conformément au Règlement COBAC et à l\'AUSCGIE OHADA ?',
        questionEn: 'Are regulated agreements documented and approved in compliance with COBAC Regulation and OHADA AUSCGIE?',
        options: [
          { value: 100, labelFr: 'Toutes les conventions identifiées, autorisées par le CA, rapportées au CAC et publiées', labelEn: 'All agreements identified, authorized by Board, reported to auditor and published' },
          { value: 60, labelFr: 'Conventions documentées mais procédure d\'autorisation partiellement suivie', labelEn: 'Agreements documented but authorization procedure partially followed' },
          { value: 25, labelFr: 'Conventions existantes non formellement autorisées', labelEn: 'Existing agreements not formally authorized' },
          { value: 0, labelFr: 'Aucune identification ni documentation des conventions réglementées', labelEn: 'No identification or documentation of regulated agreements' },
        ],
      },
    ],
  },
  {
    id: 'controle-interne',
    titleFr: 'Contrôle Interne & Audit',
    titleEn: 'Internal Control & Audit',
    descriptionFr: 'Dispositif COBAC R-2016/04, audit interne, commissariat, reporting',
    descriptionEn: 'COBAC R-2016/04 system, internal audit, statutory audit, reporting',
    icon: 'ri-shield-check-line',
    color: '#059669',
    questions: [
      {
        id: 'cobac-ci-1',
        questionFr: 'Disposez-vous d\'un dispositif de contrôle interne formalisé conforme au Règlement COBAC R-2016/04 ?',
        questionEn: 'Do you have a formalized internal control system compliant with COBAC Regulation R-2016/04?',
        options: [
          { value: 100, labelFr: 'Dispositif complet, cartographie risques, plan de contrôle, procédures documentées, tests réguliers', labelEn: 'Complete system, risk mapping, control plan, documented procedures, regular testing' },
          { value: 60, labelFr: 'Dispositif existant mais documentation partielle ou tests non systématiques', labelEn: 'System exists but partial documentation or non-systematic testing' },
          { value: 25, labelFr: 'Contrôles informels sans cadre documenté', labelEn: 'Informal controls without documented framework' },
          { value: 0, labelFr: 'Aucun dispositif de contrôle interne formalisé', labelEn: 'No formal internal control system' },
        ],
      },
      {
        id: 'cobac-ci-2',
        questionFr: 'La fonction d\'audit interne est-elle indépendante et rattachée directement au Conseil d\'Administration ?',
        questionEn: 'Is the internal audit function independent and reporting directly to the Board of Directors?',
        options: [
          { value: 100, labelFr: 'Audit interne indépendant, plan annuel approuvé, rapports au Comité d\'Audit, suivi systématique', labelEn: 'Independent internal audit, approved annual plan, reports to Audit Committee, systematic follow-up' },
          { value: 60, labelFr: 'Audit interne existant mais plan non systématiquement approuvé', labelEn: 'Internal audit exists but plan not systematically approved' },
          { value: 25, labelFr: 'Fonction d\'audit interne non indépendante ou sans plan formalisé', labelEn: 'Internal audit function not independent or without formal plan' },
          { value: 0, labelFr: 'Aucune fonction d\'audit interne', labelEn: 'No internal audit function' },
        ],
      },
      {
        id: 'cobac-ci-3',
        questionFr: 'Le commissaire aux comptes est-il agréé COBAC et nommé conformément à la réglementation CEMAC ?',
        questionEn: 'Is the statutory auditor COBAC-approved and appointed in compliance with CEMAC regulations?',
        options: [
          { value: 100, labelFr: 'CAC agréé COBAC, nommé conformément AUSCGIE, rapports dans les délais, recommandations suivies', labelEn: 'COBAC-approved auditor, appointed per AUSCGIE, reports on time, recommendations followed' },
          { value: 60, labelFr: 'CAC agréé mais certains rapports en retard', labelEn: 'Approved auditor but some reports late' },
          { value: 25, labelFr: 'CAC non agréé COBAC', labelEn: 'Auditor not COBAC-approved' },
          { value: 0, labelFr: 'Aucun commissaire aux comptes nommé', labelEn: 'No statutory auditor appointed' },
        ],
      },
      {
        id: 'cobac-ci-4',
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
    descriptionFr: 'Cartographie risques, ratios COBAC, stress tests, ICAAP, concentration',
    descriptionEn: 'Risk mapping, COBAC ratios, stress tests, ICAAP, concentration',
    icon: 'ri-alert-line',
    color: '#d97706',
    questions: [
      {
        id: 'cobac-risk-1',
        questionFr: 'Disposez-vous d\'une cartographie des risques exhaustive couvrant toutes les typologies de risques COBAC ?',
        questionEn: 'Do you have an exhaustive risk map covering all COBAC risk typologies?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive, mise à jour annuelle, approuvée par le CA, plans de mitigation', labelEn: 'Exhaustive mapping, annually updated, Board-approved, mitigation plans' },
          { value: 60, labelFr: 'Cartographie existante mais non exhaustive ou non mise à jour', labelEn: 'Mapping exists but not exhaustive or not updated' },
          { value: 25, labelFr: 'Analyse informelle sans cartographie formalisée', labelEn: 'Informal analysis without formal mapping' },
          { value: 0, labelFr: 'Aucune cartographie des risques', labelEn: 'No risk mapping' },
        ],
      },
      {
        id: 'cobac-risk-2',
        questionFr: 'Avez-vous réalisé et documenté votre processus ICAAP (Internal Capital Adequacy Assessment Process) ?',
        questionEn: 'Have you conducted and documented your ICAAP (Internal Capital Adequacy Assessment Process)?',
        options: [
          { value: 100, labelFr: 'ICAAP complet, documenté, approuvé par le CA, intégré à la planification stratégique', labelEn: 'Complete ICAAP, documented, Board-approved, integrated into strategic planning' },
          { value: 60, labelFr: 'ICAAP réalisé mais documentation partielle ou non intégré', labelEn: 'ICAAP conducted but partial documentation or not integrated' },
          { value: 25, labelFr: 'ICAAP en cours d\'élaboration', labelEn: 'ICAAP under development' },
          { value: 0, labelFr: 'Aucun ICAAP réalisé', labelEn: 'No ICAAP conducted' },
        ],
      },
      {
        id: 'cobac-risk-3',
        questionFr: 'Les ratios prudentiels COBAC (solvabilité, liquidité, division des risques, grands risques) sont-ils respectés ?',
        questionEn: 'Are COBAC prudential ratios (solvency, liquidity, risk division, large exposures) respected?',
        options: [
          { value: 100, labelFr: 'Tous les ratios respectés avec marges confortables, reporting conforme, anticipation', labelEn: 'All ratios respected with comfortable margins, compliant reporting, anticipation' },
          { value: 60, labelFr: 'Ratios principaux respectés mais certains proches des seuils', labelEn: 'Main ratios respected but some near thresholds' },
          { value: 25, labelFr: 'Certains ratios non respectés ou calculs non conformes', labelEn: 'Some ratios not respected or calculations non-compliant' },
          { value: 0, labelFr: 'Ratios non calculés ou non respectés', labelEn: 'Ratios not calculated or not respected' },
        ],
      },
      {
        id: 'cobac-risk-4',
        questionFr: 'Réalisez-vous des stress tests et simulations de crise avec scénarios documentés ?',
        questionEn: 'Do you conduct stress tests and crisis simulations with documented scenarios?',
        options: [
          { value: 100, labelFr: 'Stress tests semestriels, scénarios documentés, plans de contingence testés, présentés au CA', labelEn: 'Semi-annual stress tests, documented scenarios, tested contingency plans, presented to Board' },
          { value: 60, labelFr: 'Stress tests réalisés mais scénarios limités', labelEn: 'Stress tests conducted but limited scenarios' },
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
    descriptionFr: 'Dispositif GABAC, KYC, déclaration soupçon ANIF, formation',
    descriptionEn: 'GABAC system, KYC, ANIF suspicious reporting, training',
    icon: 'ri-file-search-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'cobac-lbcft-1',
        questionFr: 'Disposez-vous d\'un dispositif LBC/FT conforme au Règlement COBAC R-2018/01 et aux standards GABAC ?',
        questionEn: 'Do you have an AML/CFT system compliant with COBAC Regulation R-2018/01 and GABAC standards?',
        options: [
          { value: 100, labelFr: 'Dispositif complet, responsable formé, politique approuvée, procédures appliquées', labelEn: 'Complete system, trained officer, approved policy, applied procedures' },
          { value: 60, labelFr: 'Responsable désigné et politique existante mais procédures partiellement appliquées', labelEn: 'Designated officer and policy exist but procedures partially applied' },
          { value: 25, labelFr: 'Dispositif minimal sans politique formalisée', labelEn: 'Minimal system without formal policy' },
          { value: 0, labelFr: 'Aucun dispositif LBC/FT', labelEn: 'No AML/CFT system' },
        ],
      },
      {
        id: 'cobac-lbcft-2',
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
        id: 'cobac-lbcft-3',
        questionFr: 'Avez-vous une procédure de déclaration de soupçon auprès de l\'ANIF et vos équipes sont-elles formées ?',
        questionEn: 'Do you have a suspicious transaction reporting procedure to ANIF and are your teams trained?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, personnel formé annuellement, déclarations conformes, registre tenu', labelEn: 'Documented procedure, annually trained staff, compliant declarations, register maintained' },
          { value: 60, labelFr: 'Procédure existante mais formation non systématique', labelEn: 'Procedure exists but training not systematic' },
          { value: 25, labelFr: 'Procédure non formalisée, équipes non formées', labelEn: 'Non-formalized procedure, untrained teams' },
          { value: 0, labelFr: 'Aucune procédure de déclaration de soupçon', labelEn: 'No suspicious transaction reporting procedure' },
        ],
      },
      {
        id: 'cobac-lbcft-4',
        questionFr: 'Avez-vous fait l\'objet d\'une évaluation GABAC ou d\'un contrôle LBC/FT par la COBAC récemment ?',
        questionEn: 'Have you been subject to a GABAC assessment or COBAC AML/CFT inspection recently?',
        options: [
          { value: 100, labelFr: 'Évaluation favorable ou sans réserve, recommandations traitées', labelEn: 'Favorable or unqualified assessment, recommendations addressed' },
          { value: 60, labelFr: 'Évaluation avec réserves mineures, plan d\'action en cours', labelEn: 'Assessment with minor reservations, action plan in progress' },
          { value: 25, labelFr: 'Évaluation avec réserves significatives ou plan non clôturé', labelEn: 'Assessment with significant reservations or unclosed plan' },
          { value: 0, labelFr: 'Aucune évaluation / évaluation défavorable', labelEn: 'No assessment / unfavorable assessment' },
        ],
      },
    ],
  },
  {
    id: 'systeme-information',
    titleFr: 'Système d\'Information & Cybersécurité',
    titleEn: 'Information System & Cybersecurity',
    descriptionFr: 'Gouvernance SI R-2024/01, PCA/PRA, sécurité, incidents',
    descriptionEn: 'IT governance R-2024/01, BCP/DRP, security, incidents',
    icon: 'ri-computer-line',
    color: '#0891b2',
    questions: [
      {
        id: 'cobac-si-1',
        questionFr: 'Votre gouvernance SI est-elle conforme au Règlement COBAC R-2024/01 (gouvernance des systèmes d\'information) ?',
        questionEn: 'Is your IT governance compliant with COBAC Regulation R-2024/01 (IT governance)?',
        options: [
          { value: 100, labelFr: 'Exigences intégrées, gouvernance SI documentée, conformité vérifiée, veille réglementaire', labelEn: 'Requirements integrated, documented IT governance, verified compliance, regulatory monitoring' },
          { value: 60, labelFr: 'Conformité partielle, certaines exigences en cours d\'intégration', labelEn: 'Partial compliance, some requirements being integrated' },
          { value: 25, labelFr: 'Conformité non évaluée ou non documentée', labelEn: 'Compliance not assessed or not documented' },
          { value: 0, labelFr: 'Exigences non connues ou non appliquées', labelEn: 'Requirements unknown or not applied' },
        ],
      },
      {
        id: 'cobac-si-2',
        questionFr: 'Disposez-vous d\'un Plan de Continuité d\'Activité (PCA) et d\'un Plan de Reprise d\'Activité (PRA) testés ?',
        questionEn: 'Do you have a tested Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP)?',
        options: [
          { value: 100, labelFr: 'PCA et PRA documentés, testés annuellement, approuvés par le CA, procédure de déclenchement', labelEn: 'BCP and DRP documented, tested annually, Board-approved, activation procedure' },
          { value: 60, labelFr: 'PCA/PRA documentés mais tests non réalisés', labelEn: 'BCP/DRP documented but tests not conducted' },
          { value: 25, labelFr: 'PCA/PRA partiels ou en cours d\'élaboration', labelEn: 'Partial BCP/DRP or under development' },
          { value: 0, labelFr: 'Aucun PCA ni PRA', labelEn: 'No BCP or DRP' },
        ],
      },
      {
        id: 'cobac-si-3',
        questionFr: 'Avez-vous une politique de cybersécurité documentée avec pare-feu, chiffrement et tests d\'intrusion ?',
        questionEn: 'Do you have a documented cybersecurity policy with firewall, encryption and penetration tests?',
        options: [
          { value: 100, labelFr: 'Politique complète, outils déployés, tests d\'intrusion annuels, veille sécurité', labelEn: 'Complete policy, deployed tools, annual penetration tests, security monitoring' },
          { value: 60, labelFr: 'Mesures en place mais politique partiellement documentée', labelEn: 'Measures in place but policy partially documented' },
          { value: 25, labelFr: 'Mesures de base sans politique documentée', labelEn: 'Basic measures without documented policy' },
          { value: 0, labelFr: 'Aucune politique de cybersécurité', labelEn: 'No cybersecurity policy' },
        ],
      },
      {
        id: 'cobac-si-4',
        questionFr: 'Disposez-vous d\'une procédure de gestion des incidents de sécurité avec notification à la COBAC ?',
        questionEn: 'Do you have a security incident management procedure with COBAC notification?',
        options: [
          { value: 100, labelFr: 'Procédure documentée, délais de notification définis, registre des incidents, reporting COBAC', labelEn: 'Documented procedure, defined notification deadlines, incident register, COBAC reporting' },
          { value: 60, labelFr: 'Procédure existante mais délais non définis', labelEn: 'Procedure exists but deadlines not defined' },
          { value: 25, labelFr: 'Gestion réactive sans procédure formalisée', labelEn: 'Reactive management without formal procedure' },
          { value: 0, labelFr: 'Aucune procédure de gestion des incidents', labelEn: 'No incident management procedure' },
        ],
      },
    ],
  },
];

export const TOTAL_COBAC_QUESTIONS = COBAC_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getCOBACScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#d97706';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getCOBACScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible Risque — Bonne Préparation' : 'Low Risk — Good Preparation';
  if (score >= 50) return isFr ? 'Risque Modéré — Améliorations Nécessaires' : 'Moderate Risk — Improvements Needed';
  if (score >= 25) return isFr ? 'Risque Élevé — Action Urgente Requise' : 'High Risk — Urgent Action Required';
  return isFr ? 'Risque Critique — Intervention Immédiate' : 'Critical Risk — Immediate Intervention';
}

export function getCOBACRiskClass(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible risque' : 'Low risk';
  if (score >= 50) return isFr ? 'Risque modéré' : 'Moderate risk';
  if (score >= 25) return isFr ? 'Risque élevé' : 'High risk';
  return isFr ? 'Risque critique' : 'Critical risk';
}

export function getCOBACReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre institution est bien préparée pour une inspection COBAC. Maintenez votre dispositif à jour et poursuivez les tests réguliers.'
    : 'Your institution is well prepared for a COBAC inspection. Keep your system updated and continue regular testing.';
  if (score >= 50) return isFr
    ? 'Votre institution présente un niveau de préparation acceptable mais des lacunes ciblées doivent être corrigées avant une inspection COBAC.'
    : 'Your institution has an acceptable preparation level but targeted gaps must be addressed before a COBAC inspection.';
  if (score >= 25) return isFr
    ? 'Des lacunes significatives seraient identifiées lors d\'une inspection COBAC. Un plan d\'action prioritaire doit être lancé sans délai.'
    : 'Significant gaps would be identified during a COBAC inspection. A priority action plan must be launched without delay.';
  return isFr
    ? 'Votre institution est exposée à un risque critique de sanctions COBAC. Les défaillances justifient une intervention immédiate du Conseil.'
    : 'Your institution is exposed to a critical risk of COBAC sanctions. Failures justify immediate Board intervention.';
}

export function getCOBACRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const lbcftScore = perAxis['lbcft'] ?? 0;
  const siScore = perAxis['systeme-information'] ?? 0;

  if (govScore < 50) risks.push(isFr ? 'Gouvernance non conforme au Règlement R-2016/01 — risque de mise en demeure COBAC' : 'Governance non-compliant with Regulation R-2016/01 — risk of COBAC formal notice');
  if (ciScore < 50) risks.push(isFr ? 'Contrôle interne insuffisant — risque de sanction au titre du Règlement R-2016/04' : 'Insufficient internal control — risk of sanction under Regulation R-2016/04');
  if (riskScore < 50) risks.push(isFr ? 'Gestion des risques non structurée — absence d\'ICAAP ou non-conformité aux ratios COBAC' : 'Unstructured risk management — absence of ICAAP or non-compliance with COBAC ratios');
  if (lbcftScore < 50) risks.push(isFr ? 'Dispositif LBC/FT lacunaire — risque de sanction GABAC et ANIF' : 'Deficient AML/CFT system — risk of GABAC and ANIF sanction');
  if (siScore < 50) risks.push(isFr ? 'Gouvernance SI non conforme R-2024/01 — risque de sanction COBAC et risque opérationnel' : 'IT governance non-compliant R-2024/01 — risk of COBAC sanction and operational risk');
  if (globalScore < 25) risks.push(isFr ? 'Profil critique : plusieurs défaillances majeures — exposition à des sanctions COBAC pouvant aller jusqu\'au retrait d\'agrément' : 'Critical profile: several major failures — exposure to COBAC sanctions up to license withdrawal');

  return risks;
}

export function getCOBACRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];
  const govScore = perAxis['gouvernance'] ?? 0;
  const ciScore = perAxis['controle-interne'] ?? 0;
  const riskScore = perAxis['gestion-risques'] ?? 0;
  const lbcftScore = perAxis['lbcft'] ?? 0;
  const siScore = perAxis['systeme-information'] ?? 0;

  if (govScore < 50) recs.push({ title: isFr ? 'Mettre la gouvernance en conformité R-2016/01' : 'Bring governance into R-2016/01 compliance', axis: 'gouvernance', items: isFr ? ['Revoir la composition du CA avec administrateurs indépendants', 'Rendre opérationnels les comités spécialisés', 'Formaliser le plan de relève', 'Documenter les conventions réglementées'] : ['Review Board composition with independent directors', 'Operationalize specialized committees', 'Formalize succession plan', 'Document regulated agreements'] });
  if (ciScore < 50) recs.push({ title: isFr ? 'Structurer le contrôle interne R-2016/04' : 'Structure internal control per R-2016/04', axis: 'controle-interne', items: isFr ? ['Documenter le dispositif de contrôle interne', 'Rendre l\'audit interne indépendant', 'Nommer un CAC agréé COBAC', 'Mettre en place un mécanisme de whistleblowing'] : ['Document internal control system', 'Make internal audit independent', 'Appoint COBAC-approved auditor', 'Implement whistleblowing mechanism'] });
  if (riskScore < 50) recs.push({ title: isFr ? 'Structurer la gestion des risques et l\'ICAAP' : 'Structure risk management and ICAAP', axis: 'gestion-risques', items: isFr ? ['Élaborer une cartographie exhaustive des risques', 'Réaliser et documenter l\'ICAAP', 'Fiabiliser le calcul des ratios prudentiels COBAC', 'Mettre en place des stress tests semestriels'] : ['Develop exhaustive risk mapping', 'Conduct and document ICAAP', 'Make COBAC prudential ratio calculation reliable', 'Implement semi-annual stress tests'] });
  if (lbcftScore < 50) recs.push({ title: isFr ? 'Renforcer le dispositif LBC/FT GABAC' : 'Strengthen GABAC AML/CFT system', axis: 'lbcft', items: isFr ? ['Désigner un responsable LBC/FT formé', 'Formaliser les procédures KYC complètes', 'Documenter la procédure de déclaration de soupçon ANIF', 'Préparer l\'évaluation GABAC'] : ['Designate trained AML/CFT officer', 'Formalize complete KYC procedures', 'Document ANIF suspicious reporting procedure', 'Prepare for GABAC assessment'] });
  if (siScore < 50) recs.push({ title: isFr ? 'Sécuriser le SI conformément au R-2024/01' : 'Secure IT per R-2024/01', axis: 'systeme-information', items: isFr ? ['Documenter la gouvernance SI', 'Élaborer et tester le PCA/PRA', 'Déployer une politique de cybersécurité', 'Formaliser la gestion des incidents avec notification COBAC'] : ['Document IT governance', 'Develop and test BCP/DRP', 'Deploy cybersecurity policy', 'Formalize incident management with COBAC notification'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence de conformité COBAC' : 'Maintain COBAC compliance excellence', axis: 'gouvernance', items: isFr ? ['Poursuivre la mise à jour annuelle des documentations', 'Renforcer la veille réglementaire COBAC', 'Maintenir le rythme des tests et formations', 'Anticiper les nouveaux règlements COBAC'] : ['Continue annual documentation updates', 'Strengthen COBAC regulatory monitoring', 'Maintain testing and training pace', 'Anticipate new COBAC regulations'] });

  return recs;
}



