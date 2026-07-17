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

export const LBCFT_AXES: DiagnosticAxis[] = [
  {
    id: 'gouvernance-lbcft',
    titleFr: 'Gouvernance LBC/FT',
    titleEn: 'AML/CFT Governance',
    descriptionFr: 'Politique, responsable, comité, conseil, ressources',
    descriptionEn: 'Policy, officer, committee, board, resources',
    icon: 'ri-government-line',
    color: '#b45309',
    questions: [
      { id: 'lbcft-gov-1', questionFr: 'Disposez-vous d\'une politique LBC/FT formalisée, approuvée par le Conseil d\'Administration et régulièrement mise à jour ?', questionEn: 'Do you have a formalized AML/CFT policy, approved by the Board and regularly updated?', options: [{ value: 100, labelFr: 'Politique documentée, approuvée par le CA, mise à jour annuellement, diffusée à tout le personnel', labelEn: 'Documented policy, Board-approved, annually updated, distributed to all staff' }, { value: 60, labelFr: 'Politique existante mais non approuvée formellement ou mise à jour irrégulière', labelEn: 'Policy exists but not formally approved or irregularly updated' }, { value: 25, labelFr: 'Politique informelle ou en cours d\'élaboration', labelEn: 'Informal policy or under development' }, { value: 0, labelFr: 'Aucune politique LBC/FT', labelEn: 'No AML/CFT policy' }] },
      { id: 'lbcft-gov-2', questionFr: 'Un responsable conformité LBC/FT est-il désigné, avec un rattachement direct au Conseil et des moyens suffisants ?', questionEn: 'Is an AML/CFT compliance officer designated, with direct Board reporting and sufficient resources?', options: [{ value: 100, labelFr: 'Responsable désigné, rattachement direct au CA, équipe dédiée, budget propre, formation continue', labelEn: 'Designated officer, direct Board reporting, dedicated team, own budget, continuous training' }, { value: 60, labelFr: 'Responsable désigné mais moyens limités ou rattachement non direct', labelEn: 'Designated officer but limited resources or non-direct reporting' }, { value: 25, labelFr: 'Responsable désigné à temps partiel, sans équipe', labelEn: 'Part-time designated officer, no team' }, { value: 0, labelFr: 'Aucun responsable LBC/FT désigné', labelEn: 'No designated AML/CFT officer' }] },
      { id: 'lbcft-gov-3', questionFr: 'Le Conseil d\'Administration est-il régulièrement informé des risques LBC/FT et des évolutions réglementaires ?', questionEn: 'Is the Board regularly informed of AML/CFT risks and regulatory developments?', options: [{ value: 100, labelFr: 'Reporting trimestriel au CA, formation annuelle des administrateurs, présentation des risques émergents', labelEn: 'Quarterly Board reporting, annual director training, emerging risk presentation' }, { value: 60, labelFr: 'Reporting annuel, information ponctuelle', labelEn: 'Annual reporting, occasional information' }, { value: 25, labelFr: 'Information informelle, pas de reporting structuré', labelEn: 'Informal information, no structured reporting' }, { value: 0, labelFr: 'Aucune information du Conseil', labelEn: 'No Board information' }] },
    ],
  },
  {
    id: 'kyc-due-diligence',
    titleFr: 'KYC & Due Diligence',
    titleEn: 'KYC & Due Diligence',
    descriptionFr: 'Identification, BE, PPE, vigilance renforcée, conservation',
    descriptionEn: 'Identification, BO, PEP, enhanced due diligence, retention',
    icon: 'ri-user-search-line',
    color: '#0f766e',
    questions: [
      { id: 'lbcft-kyc-1', questionFr: 'Les procédures KYC incluent-elles l\'identification et la vérification de l\'identité des clients avant la relation d\'affaires ?', questionEn: 'Do KYC procedures include client identification and verification before business relationship?', options: [{ value: 100, labelFr: 'KYC systématique avant relation, documents vérifiés, procédure documentée, contrôles qualité', labelEn: 'Systematic KYC before relationship, verified documents, documented procedure, quality controls' }, { value: 60, labelFr: 'KYC réalisé mais pas toujours avant la première transaction', labelEn: 'KYC performed but not always before first transaction' }, { value: 25, labelFr: 'KYC partiel, documents parfois manquants', labelEn: 'Partial KYC, sometimes missing documents' }, { value: 0, labelFr: 'Aucune procédure KYC formalisée', labelEn: 'No formal KYC procedure' }] },
      { id: 'lbcft-kyc-2', questionFr: 'Identifiez-vous systématiquement les bénéficiaires effectifs et vérifiez-vous les PPE (Personnes Politiquement Exposées) ?', questionEn: 'Do you systematically identify beneficial owners and verify PEPs?', options: [{ value: 100, labelFr: 'BE identifiés systématiquement, registre tenu, PPE vérifiés sur bases de données, vigilance renforcée appliquée', labelEn: 'BOs systematically identified, register maintained, PEPs verified on databases, enhanced DD applied' }, { value: 60, labelFr: 'BE identifiés mais vérification PPE non systématique', labelEn: 'BOs identified but PEP verification not systematic' }, { value: 25, labelFr: 'BE non systématiquement identifiés', labelEn: 'BOs not systematically identified' }, { value: 0, labelFr: 'Aucune identification des BE ni vérification PPE', labelEn: 'No BO identification or PEP verification' }] },
      { id: 'lbcft-kyc-3', questionFr: 'Appliquez-vous des mesures de vigilance renforcée pour les clients à haut risque (PPE, pays GAFI, secteurs sensibles) ?', questionEn: 'Do you apply enhanced due diligence for high-risk clients?', options: [{ value: 100, labelFr: 'Classification des risques documentée, EDD systématique, approbation hiérarchique, revue périodique', labelEn: 'Documented risk classification, systematic EDD, hierarchical approval, periodic review' }, { value: 60, labelFr: 'EDD appliquée mais classification des risques partielle', labelEn: 'EDD applied but partial risk classification' }, { value: 25, labelFr: 'EDD ponctuelle, sans critères formalisés', labelEn: 'Occasional EDD, without formalized criteria' }, { value: 0, labelFr: 'Aucune vigilance renforcée', labelEn: 'No enhanced due diligence' }] },
      { id: 'lbcft-kyc-4', questionFr: 'Les données KYC sont-elles conservées conformément aux exigences réglementaires (minimum 10 ans après la fin de la relation) ?', questionEn: 'Are KYC data retained in compliance with regulatory requirements (minimum 10 years after relationship end)?', options: [{ value: 100, labelFr: 'Conservation conforme, données centralisées et sécurisées, accessibles, traçabilité des accès', labelEn: 'Compliant retention, centralized and secure data, accessible, access traceability' }, { value: 60, labelFr: 'Conservation assurée mais accès ou traçabilité partiels', labelEn: 'Retention ensured but partial access or traceability' }, { value: 25, labelFr: 'Conservation non systématique, durée insuffisante', labelEn: 'Non-systematic retention, insufficient duration' }, { value: 0, labelFr: 'Aucune politique de conservation', labelEn: 'No retention policy' }] },
    ],
  },
  {
    id: 'surveillance',
    titleFr: 'Surveillance & Détection',
    titleEn: 'Monitoring & Detection',
    descriptionFr: 'Monitoring transactions, scénarios, alertes, investigation',
    descriptionEn: 'Transaction monitoring, scenarios, alerts, investigation',
    icon: 'ri-radar-line',
    color: '#7c3aed',
    questions: [
      { id: 'lbcft-surv-1', questionFr: 'Disposez-vous d\'un système de surveillance automatisé des transactions pour détecter les opérations atypiques ?', questionEn: 'Do you have an automated transaction monitoring system to detect atypical operations?', options: [{ value: 100, labelFr: 'Système automatisé, scénarios paramétrés et revus, alertes traitées dans les délais, seuils calibrés', labelEn: 'Automated system, configured and reviewed scenarios, alerts processed on time, calibrated thresholds' }, { value: 60, labelFr: 'Système existant mais scénarios non régulièrement revus', labelEn: 'System exists but scenarios not regularly reviewed' }, { value: 25, labelFr: 'Surveillance manuelle, sans outil dédié', labelEn: 'Manual monitoring, without dedicated tool' }, { value: 0, labelFr: 'Aucune surveillance des transactions', labelEn: 'No transaction monitoring' }] },
      { id: 'lbcft-surv-2', questionFr: 'Avez-vous défini des scénarios de détection adaptés à votre activité (structuration, pays à risque, profils atypiques) ?', questionEn: 'Have you defined detection scenarios adapted to your activity?', options: [{ value: 100, labelFr: 'Scénarios documentés, calibrés sur l\'activité, revus annuellement, back-testing réalisé', labelEn: 'Documented scenarios, calibrated to activity, annually reviewed, back-testing performed' }, { value: 60, labelFr: 'Scénarios définis mais non revus ou calibrés', labelEn: 'Scenarios defined but not reviewed or calibrated' }, { value: 25, labelFr: 'Quelques scénarios génériques', labelEn: 'A few generic scenarios' }, { value: 0, labelFr: 'Aucun scénario de détection', labelEn: 'No detection scenarios' }] },
      { id: 'lbcft-surv-3', questionFr: 'Les alertes générées sont-elles analysées, documentées et escaladées dans des délais définis ?', questionEn: 'Are generated alerts analyzed, documented and escalated within defined deadlines?', options: [{ value: 100, labelFr: 'Analyse systématique, documentation complète, délais respectés, procédure d\'escalade, comité de validation', labelEn: 'Systematic analysis, complete documentation, respected deadlines, escalation procedure, validation committee' }, { value: 60, labelFr: 'Alertes traitées mais documentation ou délais partiels', labelEn: 'Alerts processed but partial documentation or deadlines' }, { value: 25, labelFr: 'Traitement ponctuel, sans procédure formalisée', labelEn: 'Occasional processing, without formal procedure' }, { value: 0, labelFr: 'Alertes non traitées ou ignorées', labelEn: 'Alerts not processed or ignored' }] },
    ],
  },
  {
    id: 'declaration',
    titleFr: 'Déclaration de Soupçon',
    titleEn: 'Suspicious Transaction Reporting',
    descriptionFr: 'Procédure, CENTIF/ANIF, registre, confidentialité',
    descriptionEn: 'Procedure, CENTIF/ANIF, register, confidentiality',
    icon: 'ri-alert-line',
    color: '#dc2626',
    questions: [
      { id: 'lbcft-dec-1', questionFr: 'Avez-vous une procédure formalisée de déclaration de soupçon auprès de la CENTIF (UEMOA) ou ANIF (CEMAC) ?', questionEn: 'Do you have a formalized STR procedure to CENTIF (UEMOA) or ANIF (CEMAC)?', options: [{ value: 100, labelFr: 'Procédure documentée, délais de déclaration définis, formulaire standardisé, confidentialité stricte', labelEn: 'Documented procedure, defined reporting deadlines, standardized form, strict confidentiality' }, { value: 60, labelFr: 'Procédure existante mais délais ou formulaire non standardisés', labelEn: 'Procedure exists but deadlines or form not standardized' }, { value: 25, labelFr: 'Procédure informelle, déclarations ponctuelles', labelEn: 'Informal procedure, occasional reports' }, { value: 0, labelFr: 'Aucune procédure de déclaration de soupçon', labelEn: 'No STR procedure' }] },
      { id: 'lbcft-dec-2', questionFr: 'Tenez-vous un registre des déclarations de soupçon effectuées et des suites données ?', questionEn: 'Do you maintain a register of STRs made and their follow-up?', options: [{ value: 100, labelFr: 'Registre sécurisé, confidentiel, exhaustif, accessible uniquement aux personnes autorisées', labelEn: 'Secure register, confidential, exhaustive, accessible only to authorized persons' }, { value: 60, labelFr: 'Registre tenu mais sécurité ou exhaustivité partielle', labelEn: 'Register maintained but partial security or exhaustiveness' }, { value: 25, labelFr: 'Registre informel ou incomplet', labelEn: 'Informal or incomplete register' }, { value: 0, labelFr: 'Aucun registre des déclarations', labelEn: 'No STR register' }] },
      { id: 'lbcft-dec-3', questionFr: 'La confidentialité des déclarations de soupçon est-elle strictement garantie (interdiction d\'informer le client) ?', questionEn: 'Is STR confidentiality strictly guaranteed (prohibition of informing the client)?', options: [{ value: 100, labelFr: 'Procédure stricte, clause de confidentialité signée, sensibilisation régulière, sanctions en cas de violation', labelEn: 'Strict procedure, signed confidentiality clause, regular awareness, sanctions in case of breach' }, { value: 60, labelFr: 'Confidentialité assurée mais procédure non formalisée', labelEn: 'Confidentiality ensured but procedure not formalized' }, { value: 25, labelFr: 'Risque de rupture de confidentialité identifié', labelEn: 'Identified risk of confidentiality breach' }, { value: 0, labelFr: 'Aucune garantie de confidentialité', labelEn: 'No confidentiality guarantee' }] },
    ],
  },
  {
    id: 'formation-controle',
    titleFr: 'Formation & Contrôle LBC/FT',
    titleEn: 'Training & AML/CFT Control',
    descriptionFr: 'Formation, sensibilisation, audit, contrôle permanent, sanctions',
    descriptionEn: 'Training, awareness, audit, permanent control, sanctions',
    icon: 'ri-graduation-cap-line',
    color: '#059669',
    questions: [
      { id: 'lbcft-form-1', questionFr: 'Tous les collaborateurs concernés reçoivent-ils une formation LBC/FT initiale et continue adaptée à leurs fonctions ?', questionEn: 'Do all concerned employees receive initial and ongoing AML/CFT training adapted to their roles?', options: [{ value: 100, labelFr: 'Formation initiale obligatoire, recyclage annuel, formation spécifique par fonction, évaluation des acquis', labelEn: 'Mandatory initial training, annual refresher, role-specific training, knowledge assessment' }, { value: 60, labelFr: 'Formation dispensée mais non systématique pour toutes les fonctions', labelEn: 'Training provided but not systematic for all roles' }, { value: 25, labelFr: 'Formation ponctuelle, non structurée', labelEn: 'Occasional, unstructured training' }, { value: 0, labelFr: 'Aucune formation LBC/FT', labelEn: 'No AML/CFT training' }] },
      { id: 'lbcft-form-2', questionFr: 'Le dispositif LBC/FT fait-il l\'objet d\'un contrôle interne permanent et d\'audits périodiques indépendants ?', questionEn: 'Is the AML/CFT system subject to permanent internal control and periodic independent audits?', options: [{ value: 100, labelFr: 'Contrôle permanent documenté, audit interne annuel, audit externe périodique, plans d\'action suivis', labelEn: 'Documented permanent control, annual internal audit, periodic external audit, action plans followed' }, { value: 60, labelFr: 'Audit interne annuel, contrôle permanent non formalisé', labelEn: 'Annual internal audit, non-formalized permanent control' }, { value: 25, labelFr: 'Audit ponctuel, pas de contrôle permanent', labelEn: 'Occasional audit, no permanent control' }, { value: 0, labelFr: 'Aucun contrôle ni audit LBC/FT', labelEn: 'No AML/CFT control or audit' }] },
      { id: 'lbcft-form-3', questionFr: 'Avez-vous mis en place un dispositif de gel des avoirs et de respect des sanctions internationales (ONU, GAFI) ?', questionEn: 'Have you implemented an asset freeze and international sanctions compliance system (UN, FATF)?', options: [{ value: 100, labelFr: 'Filtrage systématique sur listes de sanctions, procédure de gel documentée, mise à jour en temps réel', labelEn: 'Systematic sanctions list screening, documented freeze procedure, real-time update' }, { value: 60, labelFr: 'Filtrage effectué mais listes non mises à jour en temps réel', labelEn: 'Screening performed but lists not updated in real-time' }, { value: 25, labelFr: 'Filtrage ponctuel, sans procédure formalisée', labelEn: 'Occasional screening, without formal procedure' }, { value: 0, labelFr: 'Aucun dispositif de filtrage sanctions', labelEn: 'No sanctions screening system' }] },
    ],
  },
];

export const TOTAL_LBCFT_QUESTIONS = LBCFT_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getLBCFTScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#b45309';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getLBCFTScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Dispositif LBC/FT Robuste' : 'Robust AML/CFT System';
  if (score >= 50) return isFr ? 'Dispositif LBC/FT Intermédiaire' : 'Intermediate AML/CFT System';
  if (score >= 25) return isFr ? 'Dispositif LBC/FT Insuffisant' : 'Insufficient AML/CFT System';
  return isFr ? 'Dispositif LBC/FT Critique' : 'Critical AML/CFT System';
}

export function getLBCFTRiskClass(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Faible risque' : 'Low risk';
  if (score >= 50) return isFr ? 'Risque modéré' : 'Moderate risk';
  if (score >= 25) return isFr ? 'Risque élevé' : 'High risk';
  return isFr ? 'Risque critique' : 'Critical risk';
}

export function getLBCFTReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Votre dispositif LBC/FT est robuste. Continuez à maintenir le dispositif à jour et à former régulièrement vos équipes.' : 'Your AML/CFT system is robust. Continue keeping the system updated and regularly training your teams.';
  if (score >= 50) return isFr ? 'Votre dispositif LBC/FT est structuré mais des améliorations ciblées sont nécessaires, notamment sur la surveillance et la déclaration.' : 'Your AML/CFT system is structured but targeted improvements are needed, particularly on monitoring and reporting.';
  if (score >= 25) return isFr ? 'Votre dispositif LBC/FT présente des lacunes significatives exposant à des sanctions CENTIF/ANIF et GIABA/GABAC.' : 'Your AML/CFT system has significant gaps exposing you to CENTIF/ANIF and GIABA/GABAC sanctions.';
  return isFr ? 'Votre dispositif LBC/FT est critique. L\'absence de système structuré expose à des sanctions majeures, y compris le retrait d\'agrément.' : 'Your AML/CFT system is critical. The absence of a structured system exposes you to major sanctions, including license withdrawal.';
}

export function getLBCFTRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const govScore = perAxis['gouvernance-lbcft'] ?? 0;
  const kycScore = perAxis['kyc-due-diligence'] ?? 0;
  const survScore = perAxis['surveillance'] ?? 0;
  const decScore = perAxis['declaration'] ?? 0;
  const formScore = perAxis['formation-controle'] ?? 0;

  if (govScore < 50) risks.push(isFr ? 'Gouvernance LBC/FT défaillante — absence de politique ou de responsable désigné' : 'Failing AML/CFT governance — absence of policy or designated officer');
  if (kycScore < 50) risks.push(isFr ? 'KYC et due diligence insuffisants — risque de non-détection des clients à risque' : 'Insufficient KYC and due diligence — risk of not detecting high-risk clients');
  if (survScore < 50) risks.push(isFr ? 'Surveillance des transactions absente ou non automatisée — opérations suspectes non détectées' : 'Absent or non-automated transaction monitoring — suspicious operations not detected');
  if (decScore < 50) risks.push(isFr ? 'Absence de procédure de déclaration de soupçon — non-conformité réglementaire majeure' : 'Absence of STR procedure — major regulatory non-compliance');
  if (formScore < 50) risks.push(isFr ? 'Absence de formation et de contrôle interne LBC/FT — risque systémique' : 'Absence of AML/CFT training and internal control — systemic risk');
  if (globalScore < 25) risks.push(isFr ? 'Risque critique : le dispositif LBC/FT est quasi inexistant — sanctions CENTIF/ANIF, GIABA/GABAC, mise en cause pénale des dirigeants' : 'Critical risk: AML/CFT system is almost non-existent — CENTIF/ANIF, GIABA/GABAC sanctions, criminal liability of directors');

  return risks;
}

export function getLBCFTRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];
  const govScore = perAxis['gouvernance-lbcft'] ?? 0;
  const kycScore = perAxis['kyc-due-diligence'] ?? 0;
  const survScore = perAxis['surveillance'] ?? 0;
  const decScore = perAxis['declaration'] ?? 0;
  const formScore = perAxis['formation-controle'] ?? 0;

  if (govScore < 50) recs.push({ title: isFr ? 'Structurer la gouvernance LBC/FT' : 'Structure AML/CFT governance', axis: 'gouvernance-lbcft', items: isFr ? ['Formaliser la politique LBC/FT et la faire approuver par le CA', 'Désigner un responsable LBC/FT avec rattachement direct au CA', 'Instaurer un reporting trimestriel au Conseil'] : ['Formalize AML/CFT policy and have it approved by Board', 'Designate AML/CFT officer with direct Board reporting', 'Establish quarterly Board reporting'] });
  if (kycScore < 50) recs.push({ title: isFr ? 'Renforcer le dispositif KYC' : 'Strengthen KYC system', axis: 'kyc-due-diligence', items: isFr ? ['Systématiser le KYC avant toute relation d\'affaires', 'Identifier les bénéficiaires effectifs et vérifier les PPE', 'Appliquer la vigilance renforcée aux clients à haut risque', 'Assurer la conservation des données pendant 10 ans'] : ['Systematize KYC before any business relationship', 'Identify beneficial owners and verify PEPs', 'Apply enhanced DD to high-risk clients', 'Ensure 10-year data retention'] });
  if (survScore < 50) recs.push({ title: isFr ? 'Automatiser la surveillance' : 'Automate monitoring', axis: 'surveillance', items: isFr ? ['Déployer un système automatisé de monitoring', 'Définir des scénarios adaptés à l\'activité', 'Documenter le traitement des alertes', 'Réviser les scénarios annuellement'] : ['Deploy automated monitoring system', 'Define activity-adapted scenarios', 'Document alert processing', 'Review scenarios annually'] });
  if (decScore < 50) recs.push({ title: isFr ? 'Formaliser la déclaration de soupçon' : 'Formalize STR procedure', axis: 'declaration', items: isFr ? ['Documenter la procédure de déclaration', 'Tenir un registre sécurisé des déclarations', 'Garantir la confidentialité absolue', 'Définir les délais de déclaration'] : ['Document STR procedure', 'Maintain secure STR register', 'Guarantee absolute confidentiality', 'Define reporting deadlines'] });
  if (formScore < 50) recs.push({ title: isFr ? 'Former et contrôler' : 'Train and control', axis: 'formation-controle', items: isFr ? ['Déployer un programme de formation continue', 'Mettre en place un contrôle permanent LBC/FT', 'Réaliser des audits internes annuels', 'Implémenter le filtrage sanctions internationales'] : ['Deploy continuous training program', 'Implement permanent AML/CFT control', 'Conduct annual internal audits', 'Implement international sanctions screening'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence LBC/FT' : 'Maintain AML/CFT excellence', axis: 'gouvernance-lbcft', items: isFr ? ['Poursuivre la veille réglementaire GAFI/GIABA/GABAC', 'Renforcer les scénarios de détection', 'Maintenir le rythme des formations et audits', 'Anticiper les évaluations mutuelles'] : ['Continue GAFI/GIABA/GABAC regulatory monitoring', 'Strengthen detection scenarios', 'Maintain training and audit pace', 'Anticipate mutual evaluations'] });

  return recs;
}