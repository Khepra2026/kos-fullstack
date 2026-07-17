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

export const GOUV_AXES: DiagnosticAxis[] = [
  {
    id: 'structure',
    titleFr: 'Structure de Gouvernance',
    titleEn: 'Governance Structure',
    descriptionFr: 'CA, comités, séparation pouvoirs, organigramme, délégations',
    descriptionEn: 'Board, committees, separation of powers, org chart, delegations',
    icon: 'ri-building-4-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'gouv-str-1',
        questionFr: 'Votre Conseil d\'Administration est-il formellement constitué avec des réunions régulières (minimum 4/an) et des procès-verbaux documentés ?',
        questionEn: 'Is your Board of Directors formally constituted with regular meetings (minimum 4/year) and documented minutes?',
        options: [
          { value: 100, labelFr: 'CA constitué, 4+ réunions/an, PV documentés et approuvés, décisions tracées', labelEn: 'Board constituted, 4+ meetings/year, documented and approved minutes, traced decisions' },
          { value: 60, labelFr: 'CA constitué mais réunions irrégulières ou PV partiels', labelEn: 'Board constituted but irregular meetings or partial minutes' },
          { value: 25, labelFr: 'CA informel sans documentation systématique', labelEn: 'Informal Board without systematic documentation' },
          { value: 0, labelFr: 'Aucun Conseil d\'Administration formalisé', labelEn: 'No formal Board of Directors' },
        ],
      },
      {
        id: 'gouv-str-2',
        questionFr: 'Les fonctions de Président du CA et de Directeur Général sont-elles séparées avec une politique de conflits d\'intérêts appliquée ?',
        questionEn: 'Are the Chairman and CEO roles separated with an enforced conflict of interest policy?',
        options: [
          { value: 100, labelFr: 'Séparation effective, politique documentée, registre des conflits tenu à jour', labelEn: 'Effective separation, documented policy, updated conflict register' },
          { value: 60, labelFr: 'Séparation formelle mais politique non systématiquement appliquée', labelEn: 'Formal separation but policy not systematically enforced' },
          { value: 25, labelFr: 'Cumul sans justification ou sans politique de conflits', labelEn: 'Combination without justification or conflict policy' },
          { value: 0, labelFr: 'Aucune séparation ni politique', labelEn: 'No separation or policy' },
        ],
      },
      {
        id: 'gouv-str-3',
        questionFr: 'Disposez-vous de comités spécialisés (Audit, Risques, Rémunération) avec des chartes documentées ?',
        questionEn: 'Do you have specialized committees (Audit, Risk, Remuneration) with documented charters?',
        options: [
          { value: 100, labelFr: 'Tous les comités opérationnels, chartes documentées, membres formés, rapports au CA', labelEn: 'All committees operational, documented charters, trained members, Board reports' },
          { value: 60, labelFr: 'Certains comités créés mais chartes partiellement documentées', labelEn: 'Some committees created but charters partially documented' },
          { value: 25, labelFr: 'Comités informels sans charte', labelEn: 'Informal committees without charter' },
          { value: 0, labelFr: 'Aucun comité spécialisé', labelEn: 'No specialized committees' },
        ],
      },
    ],
  },
  {
    id: 'conformite',
    titleFr: 'Conformité Réglementaire',
    titleEn: 'Regulatory Compliance',
    descriptionFr: 'BCEAO, COBAC, OHADA, conventions réglementées',
    descriptionEn: 'BCEAO, COBAC, OHADA, regulated agreements',
    icon: 'ri-scales-3-line',
    color: '#0f766e',
    questions: [
      {
        id: 'gouv-conf-1',
        questionFr: 'Votre gouvernance est-elle alignée sur les exigences de l\'AUSCGIE OHADA (acte uniforme révisé 2014) ?',
        questionEn: 'Is your governance aligned with OHADA AUSCGIE requirements (revised 2014)?',
        options: [
          { value: 100, labelFr: 'Pleinement conforme AUSCGIE, vérifié par audit externe, documentation exhaustive', labelEn: 'Fully compliant AUSCGIE, verified by external audit, exhaustive documentation' },
          { value: 60, labelFr: 'Conforme sur les points principaux, quelques écarts documentés', labelEn: 'Compliant on main points, some documented gaps' },
          { value: 25, labelFr: 'Conformité partielle, écarts non documentés', labelEn: 'Partial compliance, undocumented gaps' },
          { value: 0, labelFr: 'Non-conformité OHADA non traitée', labelEn: 'Unaddressed OHADA non-compliance' },
        ],
      },
      {
        id: 'gouv-conf-2',
        questionFr: 'Les conventions réglementées entre l\'organisation et ses dirigeants/actionnaires sont-elles identifiées et approuvées ?',
        questionEn: 'Are regulated agreements between the organization and its directors/shareholders identified and approved?',
        options: [
          { value: 100, labelFr: 'Toutes identifiées, autorisées par le CA, rapportées au CAC, publiées', labelEn: 'All identified, authorized by Board, reported to auditor, published' },
          { value: 60, labelFr: 'Conventions documentées mais procédure d\'autorisation partiellement suivie', labelEn: 'Agreements documented but authorization procedure partially followed' },
          { value: 25, labelFr: 'Conventions existantes non formellement autorisées', labelEn: 'Existing agreements not formally authorized' },
          { value: 0, labelFr: 'Aucune identification des conventions réglementées', labelEn: 'No identification of regulated agreements' },
        ],
      },
      {
        id: 'gouv-conf-3',
        questionFr: 'Le Commissaire aux Comptes est-il nommé conformément à l\'OHADA et ses rapports sont-ils présentés dans les délais ?',
        questionEn: 'Is the Statutory Auditor appointed in compliance with OHADA and are reports presented on time?',
        options: [
          { value: 100, labelFr: 'CAC nommé conformément AUSCGIE, rapports dans les délais, recommandations suivies', labelEn: 'Auditor appointed per AUSCGIE, reports on time, recommendations followed' },
          { value: 60, labelFr: 'CAC nommé mais certains rapports en retard', labelEn: 'Auditor appointed but some reports late' },
          { value: 25, labelFr: 'CAC nommé sans suivi des recommandations', labelEn: 'Auditor appointed without follow-up of recommendations' },
          { value: 0, labelFr: 'Aucun commissaire aux comptes', labelEn: 'No statutory auditor' },
        ],
      },
    ],
  },
  {
    id: 'ethique',
    titleFr: 'Éthique & Déontologie',
    titleEn: 'Ethics & Deontology',
    descriptionFr: 'Code éthique, anti-corruption, whistleblowing, formation',
    descriptionEn: 'Code of ethics, anti-corruption, whistleblowing, training',
    icon: 'ri-heart-line',
    color: '#dc2626',
    questions: [
      {
        id: 'gouv-eth-1',
        questionFr: 'Disposez-vous d\'un code de déontologie formalisé et appliqué pour les dirigeants et administrateurs ?',
        questionEn: 'Do you have a formalized and enforced code of ethics for executives and directors?',
        options: [
          { value: 100, labelFr: 'Code documenté, signé par tous, formation annuelle, mécanisme de contrôle', labelEn: 'Documented code, signed by all, annual training, control mechanism' },
          { value: 60, labelFr: 'Code existant mais diffusion ou contrôle partiel', labelEn: 'Code exists but partial dissemination or control' },
          { value: 25, labelFr: 'Principes informels sans code écrit', labelEn: 'Informal principles without written code' },
          { value: 0, labelFr: 'Aucun code de déontologie', labelEn: 'No code of ethics' },
        ],
      },
      {
        id: 'gouv-eth-2',
        questionFr: 'Avez-vous un dispositif de prévention de la corruption et de gestion des conflits d\'intérêts ?',
        questionEn: 'Do you have a corruption prevention and conflict of interest management system?',
        options: [
          { value: 100, labelFr: 'Politique anti-corruption, due diligence tiers, registre cadeaux, formation annuelle', labelEn: 'Anti-corruption policy, third-party due diligence, gift register, annual training' },
          { value: 60, labelFr: 'Politique existante mais application partielle', labelEn: 'Policy exists but partial application' },
          { value: 25, labelFr: 'Mesures ponctuelles sans politique formalisée', labelEn: 'Occasional measures without formal policy' },
          { value: 0, labelFr: 'Aucun dispositif anti-corruption', labelEn: 'No anti-corruption system' },
        ],
      },
      {
        id: 'gouv-eth-3',
        questionFr: 'Disposez-vous d\'un mécanisme de remontée d\'alerte (whistleblowing) protégé et documenté ?',
        questionEn: 'Do you have a protected and documented whistleblowing mechanism?',
        options: [
          { value: 100, labelFr: 'Mécanisme formalisé, canal sécurisé, protection documentée, procédure de traitement', labelEn: 'Formal mechanism, secure channel, documented protection, processing procedure' },
          { value: 60, labelFr: 'Mécanisme existant mais protection non formalisée', labelEn: 'Mechanism exists but protection not formalized' },
          { value: 25, labelFr: 'Canal informel sans procédure', labelEn: 'Informal channel without procedure' },
          { value: 0, labelFr: 'Aucun mécanisme', labelEn: 'No mechanism' },
        ],
      },
    ],
  },
  {
    id: 'performance',
    titleFr: 'Performance & Évaluation',
    titleEn: 'Performance & Evaluation',
    descriptionFr: 'Évaluation CA, plan succession, KPIs gouvernance, formation',
    descriptionEn: 'Board evaluation, succession plan, governance KPIs, training',
    icon: 'ri-line-chart-line',
    color: '#059669',
    questions: [
      {
        id: 'gouv-perf-1',
        questionFr: 'Le Conseil d\'Administration fait-il l\'objet d\'une évaluation annuelle de sa performance ?',
        questionEn: 'Does the Board of Directors undergo an annual performance evaluation?',
        options: [
          { value: 100, labelFr: 'Évaluation annuelle formalisée, résultats discutés en CA, plan d\'amélioration', labelEn: 'Formalized annual evaluation, results discussed in Board, improvement plan' },
          { value: 60, labelFr: 'Auto-évaluation informelle sans documentation', labelEn: 'Informal self-evaluation without documentation' },
          { value: 25, labelFr: 'Évaluation ponctuelle non systématique', labelEn: 'Occasional non-systematic evaluation' },
          { value: 0, labelFr: 'Aucune évaluation du CA', labelEn: 'No Board evaluation' },
        ],
      },
      {
        id: 'gouv-perf-2',
        questionFr: 'Disposez-vous d\'un plan de succession pour les postes clés (DG, DAF, Directeurs) ?',
        questionEn: 'Do you have a succession plan for key positions (CEO, CFO, Directors)?',
        options: [
          { value: 100, labelFr: 'Plan documenté, validé par le CA, mis à jour annuellement, successeurs identifiés', labelEn: 'Documented plan, validated by Board, updated annually, successors identified' },
          { value: 60, labelFr: 'Plan en cours d\'élaboration', labelEn: 'Plan under development' },
          { value: 25, labelFr: 'Réflexion initiée sans document formalisé', labelEn: 'Reflection initiated without formal document' },
          { value: 0, labelFr: 'Aucun plan de succession', labelEn: 'No succession plan' },
        ],
      },
      {
        id: 'gouv-perf-3',
        questionFr: 'Les administrateurs bénéficient-ils d\'une formation continue sur les enjeux de gouvernance ?',
        questionEn: 'Do directors receive continuous training on governance issues?',
        options: [
          { value: 100, labelFr: 'Programme annuel de formation, sessions thématiques, évaluation des compétences', labelEn: 'Annual training program, thematic sessions, skills assessment' },
          { value: 60, labelFr: 'Formations ponctuelles sur demande', labelEn: 'Occasional training on request' },
          { value: 25, labelFr: 'Aucune formation structurée', labelEn: 'No structured training' },
          { value: 0, labelFr: 'Aucune formation des administrateurs', labelEn: 'No director training' },
        ],
      },
    ],
  },
];

export const TOTAL_GOUV_QUESTIONS = GOUV_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getGouvScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#7c3aed';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getGouvScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Gouvernance Mature — Bonnes Pratiques' : 'Mature Governance — Best Practices';
  if (score >= 50) return isFr ? 'Gouvernance Intermédiaire — Améliorations Nécessaires' : 'Intermediate Governance — Improvements Needed';
  if (score >= 25) return isFr ? 'Gouvernance Faible — Risques Significatifs' : 'Weak Governance — Significant Risks';
  return isFr ? 'Gouvernance Critique — Intervention Urgente' : 'Critical Governance — Urgent Intervention';
}

export function getGouvMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Mature' : 'Mature';
  if (score >= 50) return isFr ? 'Intermédiaire' : 'Intermediate';
  if (score >= 25) return isFr ? 'Faible' : 'Weak';
  return isFr ? 'Critique' : 'Critical';
}

export function getGouvReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre gouvernance démontre un niveau de maturité élevé. Continuez à renforcer les bonnes pratiques et à anticiper les évolutions réglementaires.'
    : 'Your governance demonstrates a high maturity level. Continue strengthening best practices and anticipating regulatory developments.';
  if (score >= 50) return isFr
    ? 'Votre gouvernance est structurée mais présente des axes d\'amélioration ciblés. Renforcez les comités, la formalisation et l\'évaluation.'
    : 'Your governance is structured but has targeted improvement areas. Strengthen committees, formalization and evaluation.';
  if (score >= 25) return isFr
    ? 'Votre gouvernance présente des lacunes significatives exposant l\'organisation à des risques juridiques, financiers et réputationnels.'
    : 'Your governance has significant gaps exposing the organization to legal, financial and reputational risks.';
  return isFr
    ? 'Votre gouvernance est en situation critique. L\'absence de structures formelles expose l\'organisation à des risques majeurs de mise en cause de la responsabilité des dirigeants.'
    : 'Your governance is in critical condition. The absence of formal structures exposes the organization to major risks of director liability.';
}

export function getGouvRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const strScore = perAxis['structure'] ?? 0;
  const confScore = perAxis['conformite'] ?? 0;
  const ethScore = perAxis['ethique'] ?? 0;
  const perfScore = perAxis['performance'] ?? 0;

  if (strScore < 50) risks.push(isFr ? 'Structure de gouvernance défaillante — absence de CA formalisé ou de comités spécialisés' : 'Failing governance structure — absence of formal Board or specialized committees');
  if (confScore < 50) risks.push(isFr ? 'Non-conformité OHADA ou réglementaire — risque de mise en cause juridique' : 'OHADA or regulatory non-compliance — risk of legal liability');
  if (ethScore < 50) risks.push(isFr ? 'Absence de cadre éthique — risque de corruption, conflits d\'intérêts non gérés' : 'Absence of ethical framework — risk of corruption, unmanaged conflicts of interest');
  if (perfScore < 50) risks.push(isFr ? 'Absence d\'évaluation de la performance — risque de gouvernance obsolète' : 'Absence of performance evaluation — risk of obsolete governance');
  if (globalScore < 25) risks.push(isFr ? 'Risque critique : la gouvernance défaillante expose les dirigeants à une responsabilité personnelle et l\'organisation à des sanctions' : 'Critical risk: failing governance exposes directors to personal liability and the organization to sanctions');

  return risks;
}

export function getGouvRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];
  const strScore = perAxis['structure'] ?? 0;
  const confScore = perAxis['conformite'] ?? 0;
  const ethScore = perAxis['ethique'] ?? 0;
  const perfScore = perAxis['performance'] ?? 0;

  if (strScore < 50) recs.push({ title: isFr ? 'Formaliser la structure de gouvernance' : 'Formalize governance structure', axis: 'structure', items: isFr ? ['Constituer un Conseil d\'Administration formel', 'Formaliser les PV de réunion', 'Créer les comités spécialisés avec chartes', 'Séparer les fonctions Président/DG'] : ['Constitute a formal Board of Directors', 'Formalize meeting minutes', 'Create specialized committees with charters', 'Separate Chairman/CEO roles'] });
  if (confScore < 50) recs.push({ title: isFr ? 'Mettre en conformité réglementaire' : 'Achieve regulatory compliance', axis: 'conformite', items: isFr ? ['Auditer la conformité AUSCGIE OHADA', 'Documenter et faire approuver les conventions réglementées', 'Nommer un CAC conforme OHADA', 'Mettre en place une veille réglementaire'] : ['Audit AUSCGIE OHADA compliance', 'Document and approve regulated agreements', 'Appoint OHADA-compliant auditor', 'Implement regulatory monitoring'] });
  if (ethScore < 50) recs.push({ title: isFr ? 'Instaurer un cadre éthique' : 'Establish ethical framework', axis: 'ethique', items: isFr ? ['Rédiger et faire signer un code de déontologie', 'Déployer une politique anti-corruption', 'Mettre en place un mécanisme de whistleblowing', 'Former les administrateurs à l\'éthique'] : ['Draft and have code of ethics signed', 'Deploy anti-corruption policy', 'Implement whistleblowing mechanism', 'Train directors on ethics'] });
  if (perfScore < 50) recs.push({ title: isFr ? 'Améliorer la performance du CA' : 'Improve Board performance', axis: 'performance', items: isFr ? ['Mettre en place une évaluation annuelle du CA', 'Formaliser le plan de succession', 'Créer un programme de formation continue', 'Définir des KPIs de gouvernance'] : ['Implement annual Board evaluation', 'Formalize succession plan', 'Create continuous training program', 'Define governance KPIs'] });
  if (recs.length === 0) recs.push({ title: isFr ? 'Maintenir l\'excellence de gouvernance' : 'Maintain governance excellence', axis: 'structure', items: isFr ? ['Poursuivre l\'évaluation annuelle du CA', 'Renforcer la formation des administrateurs', 'Benchmarker avec les meilleures pratiques internationales', 'Anticiper les évolutions réglementaires'] : ['Continue annual Board evaluation', 'Strengthen director training', 'Benchmark with international best practices', 'Anticipate regulatory developments'] });

  return recs;
}