export interface AxisQuestion {
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
  questions: AxisQuestion[];
}

export const PT_AXES: DiagnosticAxis[] = [
  {
    id: 'documentation-pt',
    titleFr: 'Documentation Prix de Transfert',
    titleEn: 'Transfer Pricing Documentation',
    descriptionFr: 'Master File, Local File, CbCR, conformité BEPS Action 13',
    descriptionEn: 'Master File, Local File, CbCR, BEPS Action 13 compliance',
    icon: 'ri-file-text-line',
    color: '#b45309',
    questions: [
      {
        id: 'doc-1',
        questionFr: 'Votre organisation dispose-t-elle d\'une documentation prix de transfert (Master File + Local File) conforme à l\'Action 13 BEPS OCDE ?',
        questionEn: 'Does your organization have transfer pricing documentation (Master File + Local File) compliant with BEPS Action 13?',
        options: [
          { value: 100, labelFr: 'Documentation complète, préparée avant la date de dépôt, mise à jour annuellement', labelEn: 'Complete documentation, prepared before filing deadline, updated annually' },
          { value: 60, labelFr: 'Documentation partielle (Local File seul, ou Master File incomplet)', labelEn: 'Partial documentation (Local File only, or incomplete Master File)' },
          { value: 25, labelFr: 'Documentation générique non spécifique aux transactions africaines', labelEn: 'Generic documentation not specific to African transactions' },
          { value: 0, labelFr: 'Aucune documentation prix de transfert', labelEn: 'No transfer pricing documentation' },
        ],
      },
      {
        id: 'doc-2',
        questionFr: 'Votre analyse fonctionnelle FAR (Fonctions, Actifs, Risques) est-elle documentée pour chaque entité africaine ?',
        questionEn: 'Is your FAR (Functions, Assets, Risks) functional analysis documented for each African entity?',
        options: [
          { value: 100, labelFr: 'Analyse FAR complète + étude de benchmarking avec comparables externes', labelEn: 'Complete FAR analysis + benchmarking study with external comparables' },
          { value: 60, labelFr: 'Analyse FAR réalisée sans benchmarking formel', labelEn: 'FAR analysis performed without formal benchmarking' },
          { value: 25, labelFr: 'Description générale des fonctions sans analyse approfondie', labelEn: 'General description of functions without in-depth analysis' },
          { value: 0, labelFr: 'Aucune analyse fonctionnelle documentée', labelEn: 'No documented functional analysis' },
        ],
      },
      {
        id: 'doc-3',
        questionFr: 'Avez-vous réalisé une étude de comparables (benchmarking) spécifique au marché africain ?',
        questionEn: 'Have you conducted a benchmarking study specific to the African market?',
        options: [
          { value: 100, labelFr: 'Benchmarking sur bases internationales avec ajustements Afrique, mis à jour < 3 ans', labelEn: 'Benchmarking on international databases with Africa adjustments, updated < 3 years' },
          { value: 60, labelFr: 'Benchmarking générique sans ajustements spécifiques Afrique', labelEn: 'Generic benchmarking without specific Africa adjustments' },
          { value: 25, labelFr: 'Étude ancienne (> 3 ans) ou non spécifique au secteur', labelEn: 'Old study (> 3 years) or not sector-specific' },
          { value: 0, labelFr: 'Aucune étude de comparables', labelEn: 'No benchmarking study' },
        ],
      },
    ],
  },
  {
    id: 'transactions-intragroupe',
    titleFr: 'Transactions Intragroupe',
    titleEn: 'Intragroup Transactions',
    descriptionFr: 'Management fees, redevances, financement, prix de cession interne',
    descriptionEn: 'Management fees, royalties, financing, internal transfer pricing',
    icon: 'ri-exchange-funds-line',
    color: '#0f766e',
    questions: [
      {
        id: 'tx-1',
        questionFr: 'Vos management fees sont-ils documentés avec la preuve de la réalité des prestations et l\'analyse de pleine concurrence ?',
        questionEn: 'Are your management fees documented with proof of services rendered and arm\'s length analysis?',
        options: [
          { value: 100, labelFr: 'Contrats + time sheets + analyse benchmark + bénéfices démontrés pour chaque filiale', labelEn: 'Contracts + time sheets + benchmark analysis + demonstrated benefits for each subsidiary' },
          { value: 60, labelFr: 'Contrats signés et méthode de calcul documentée', labelEn: 'Signed contracts and documented calculation method' },
          { value: 25, labelFr: 'Facturation sans documentation détaillée des services rendus', labelEn: 'Invoicing without detailed documentation of services rendered' },
          { value: 0, labelFr: 'Aucune documentation des management fees', labelEn: 'No management fees documentation' },
        ],
      },
      {
        id: 'tx-2',
        questionFr: 'Les financements intragroupe (prêts, avances, garanties) sont-ils documentés avec une analyse de taux de pleine concurrence ?',
        questionEn: 'Are intragroup financings (loans, advances, guarantees) documented with an arm\'s length interest rate analysis?',
        options: [
          { value: 100, labelFr: 'Contrats + analyse capacité d\'endettement + benchmark taux + analyse thin cap', labelEn: 'Contracts + debt capacity analysis + rate benchmark + thin cap analysis' },
          { value: 60, labelFr: 'Contrats signés avec taux documenté', labelEn: 'Signed contracts with documented rate' },
          { value: 25, labelFr: 'Prêts sans contrat formalisé ou sans justification du taux', labelEn: 'Loans without formal contract or rate justification' },
          { value: 0, labelFr: 'Aucune documentation des financements intragroupe', labelEn: 'No intragroup financing documentation' },
        ],
      },
      {
        id: 'tx-3',
        questionFr: 'Avez-vous une cartographie exhaustive de TOUTES les transactions intragroupe (y compris les flux non facturés et les garanties implicites) ?',
        questionEn: 'Do you have an exhaustive mapping of ALL intragroup transactions (including non-invoiced flows and implicit guarantees)?',
        options: [
          { value: 100, labelFr: 'Cartographie exhaustive + matrice des risques par transaction + revue trimestrielle', labelEn: 'Exhaustive mapping + risk matrix per transaction + quarterly review' },
          { value: 60, labelFr: 'Cartographie des principales transactions (> 90% des flux)', labelEn: 'Mapping of main transactions (> 90% of flows)' },
          { value: 25, labelFr: 'Liste partielle sans qualification juridique', labelEn: 'Partial list without legal qualification' },
          { value: 0, labelFr: 'Aucune cartographie des transactions intragroupe', labelEn: 'No intragroup transaction mapping' },
        ],
      },
    ],
  },
  {
    id: 'gouvernance-fiscale',
    titleFr: 'Gouvernance Fiscale',
    titleEn: 'Tax Governance',
    descriptionFr: 'Politique PT, comité, contrôle interne, veille réglementaire',
    descriptionEn: 'TP policy, committee, internal control, regulatory watch',
    icon: 'ri-government-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'gov-1',
        questionFr: 'Votre organisation a-t-elle une politique de prix de transfert formalisée, approuvée par le Conseil d\'Administration ?',
        questionEn: 'Does your organization have a formalized transfer pricing policy approved by the Board of Directors?',
        options: [
          { value: 100, labelFr: 'Politique PT approuvée par le CA + mise à jour annuelle + procédures de contrôle', labelEn: 'TP policy approved by Board + annual update + control procedures' },
          { value: 60, labelFr: 'Politique PT documentée mais non formellement approuvée par le CA', labelEn: 'TP policy documented but not formally approved by Board' },
          { value: 25, labelFr: 'Pratiques informelles sans politique écrite', labelEn: 'Informal practices without written policy' },
          { value: 0, labelFr: 'Aucune politique de prix de transfert', labelEn: 'No transfer pricing policy' },
        ],
      },
      {
        id: 'gov-2',
        questionFr: 'Disposez-vous d\'un comité ou responsable dédié aux prix de transfert avec reporting régulier au management ?',
        questionEn: 'Do you have a dedicated transfer pricing committee or officer with regular management reporting?',
        options: [
          { value: 100, labelFr: 'Comité PT trimestriel + responsable dédié + reporting au CA', labelEn: 'Quarterly TP committee + dedicated officer + Board reporting' },
          { value: 60, labelFr: 'Responsable PT désigné (même à temps partiel)', labelEn: 'Designated TP officer (even part-time)' },
          { value: 25, labelFr: 'Gestion ponctuelle par la direction fiscale/financière', labelEn: 'Occasional management by tax/finance department' },
          { value: 0, labelFr: 'Aucune gouvernance spécifique aux prix de transfert', labelEn: 'No specific transfer pricing governance' },
        ],
      },
      {
        id: 'gov-3',
        questionFr: 'Effectuez-vous une veille des évolutions réglementaires BEPS, ATAF et des administrations fiscales africaines ?',
        questionEn: 'Do you monitor BEPS, ATAF and African tax administration regulatory developments?',
        options: [
          { value: 100, labelFr: 'Veille structurée + alertes + mise à jour trimestrielle de l\'analyse de risques', labelEn: 'Structured monitoring + alerts + quarterly risk analysis update' },
          { value: 60, labelFr: 'Veille ponctuelle via les conseils externes', labelEn: 'Occasional monitoring via external advisors' },
          { value: 25, labelFr: 'Aucune veille proactive, réaction aux contrôles', labelEn: 'No proactive monitoring, reaction to audits' },
          { value: 0, labelFr: 'Aucune veille réglementaire', labelEn: 'No regulatory monitoring' },
        ],
      },
    ],
  },
  {
    id: 'exposition-risque',
    titleFr: 'Exposition au Risque',
    titleEn: 'Risk Exposure',
    descriptionFr: 'Contrôles fiscaux, contentieux, provisions, défense',
    descriptionEn: 'Tax audits, litigation, provisions, defense',
    icon: 'ri-alert-line',
    color: '#dc2626',
    questions: [
      {
        id: 'risk-1',
        questionFr: 'Avez-vous fait l\'objet d\'un contrôle fiscal sur les prix de transfert au cours des 5 dernières années ?',
        questionEn: 'Have you been subject to a transfer pricing tax audit in the last 5 years?',
        options: [
          { value: 100, labelFr: 'Aucun contrôle ou contrôle résolu favorablement avec documentation solide', labelEn: 'No audit or audit favorably resolved with solid documentation' },
          { value: 60, labelFr: 'Contrôle avec ajustements mineurs (< 5% des transactions)', labelEn: 'Audit with minor adjustments (< 5% of transactions)' },
          { value: 25, labelFr: 'Contrôle avec ajustements significatifs ou en cours', labelEn: 'Audit with significant adjustments or ongoing' },
          { value: 0, labelFr: 'Redressement majeur subi ou contrôle en cours sans défense structurée', labelEn: 'Major reassessment suffered or ongoing audit without structured defense' },
        ],
      },
      {
        id: 'risk-2',
        questionFr: 'Avez-vous provisionné les risques de redressement prix de transfert dans vos comptes ?',
        questionEn: 'Have you provisioned transfer pricing reassessment risks in your accounts?',
        options: [
          { value: 100, labelFr: 'Provisionnement actuariel documenté + revue annuelle par le comité d\'audit', labelEn: 'Documented actuarial provisioning + annual review by audit committee' },
          { value: 60, labelFr: 'Provision forfaitaire basée sur une estimation des risques', labelEn: 'Flat provision based on risk estimation' },
          { value: 25, labelFr: 'Identification des risques sans provisionnement', labelEn: 'Risk identification without provisioning' },
          { value: 0, labelFr: 'Aucune provision ni évaluation du risque de redressement', labelEn: 'No provision nor reassessment risk evaluation' },
        ],
      },
      {
        id: 'risk-3',
        questionFr: 'Pourriez-vous produire une documentation prix de transfert complète et défendable sous 30 jours en cas de contrôle ?',
        questionEn: 'Could you produce complete and defensible transfer pricing documentation within 30 days in case of an audit?',
        options: [
          { value: 100, labelFr: 'Oui, documentation prête, à jour et centralisée', labelEn: 'Yes, documentation ready, up-to-date and centralized' },
          { value: 60, labelFr: 'Probablement, avec quelques compléments à finaliser', labelEn: 'Probably, with some additions to finalize' },
          { value: 25, labelFr: 'Difficilement, la documentation est éparse ou incomplète', labelEn: 'With difficulty, documentation is scattered or incomplete' },
          { value: 0, labelFr: 'Non, la documentation n\'existe pas ou est largement insuffisante', labelEn: 'No, documentation does not exist or is largely insufficient' },
        ],
      },
    ],
  },
];

export const TOTAL_PT_QUESTIONS = PT_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getPTScoreColor(score: number): string {
  if (score >= 71) return '#059669';
  if (score >= 41) return '#d97706';
  return '#dc2626';
}

export function getPTScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 81) return isFr ? 'Conformité Prix de Transfert Optimale' : 'Optimal Transfer Pricing Compliance';
  if (score >= 61) return isFr ? 'Conformité Prix de Transfert Solide' : 'Solid Transfer Pricing Compliance';
  if (score >= 41) return isFr ? 'Risque Modéré — Améliorations Nécessaires' : 'Moderate Risk — Improvements Needed';
  if (score >= 21) return isFr ? 'Risque Élevé — Action Prioritaire Requise' : 'High Risk — Priority Action Required';
  return isFr ? 'Risque Critique — Intervention Urgente' : 'Critical Risk — Urgent Intervention';
}

export function getPTMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 81) return isFr ? 'Conformité Avancée' : 'Advanced Compliance';
  if (score >= 61) return isFr ? 'Conformité Structurée' : 'Structured Compliance';
  if (score >= 41) return isFr ? 'Conformité Partielle' : 'Partial Compliance';
  if (score >= 21) return isFr ? 'Conformité Insuffisante' : 'Insufficient Compliance';
  return isFr ? 'Non-Conformité Critique' : 'Critical Non-Compliance';
}

export function getPTReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 81) return isFr
    ? 'Votre organisation est bien préparée pour défendre ses prix de transfert. Continuez à maintenir votre documentation à jour et votre veille réglementaire active.'
    : 'Your organization is well prepared to defend its transfer pricing. Continue maintaining up-to-date documentation and active regulatory monitoring.';
  if (score >= 61) return isFr
    ? 'Votre conformité est solide mais présente des axes d\'amélioration ciblés. Renforcez les maillons faibles avant qu\'un contrôle ne les expose.'
    : 'Your compliance is solid but has targeted improvement areas. Strengthen weak links before an audit exposes them.';
  if (score >= 41) return isFr
    ? 'Votre organisation présente des lacunes significatives en matière de documentation et de gouvernance des prix de transfert. Un contrôle fiscal pourrait entraîner des ajustements matériels.'
    : 'Your organization has significant gaps in transfer pricing documentation and governance. A tax audit could lead to material adjustments.';
  if (score >= 21) return isFr
    ? 'Votre exposition au risque prix de transfert est élevée. L\'absence de documentation structurée expose votre organisation à des redressements potentiels de plusieurs centaines de millions FCFA.'
    : 'Your transfer pricing risk exposure is high. The absence of structured documentation exposes your organization to potential reassessments of several hundred million FCFA.';
  return isFr
    ? 'Votre situation est critique. L\'absence de documentation et de gouvernance expose votre organisation à un risque de redressement majeur pouvant dépasser le milliard FCFA. Une intervention immédiate est impérative.'
    : 'Your situation is critical. The absence of documentation and governance exposes your organization to a major reassessment risk potentially exceeding one billion FCFA. Immediate intervention is imperative.';
}

export function getPTRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const docScore = perAxis['documentation-pt'] ?? 0;
  const txScore = perAxis['transactions-intragroupe'] ?? 0;
  const govScore = perAxis['gouvernance-fiscale'] ?? 0;
  const riskScore = perAxis['exposition-risque'] ?? 0;

  if (docScore < 60) risks.push(isFr
    ? 'Documentation prix de transfert insuffisante ou inexistante — risque de rejet total par l\'administration'
    : 'Insufficient or non-existent transfer pricing documentation — risk of total rejection by tax authorities');
  if (txScore < 60) risks.push(isFr
    ? 'Transactions intragroupe non documentées (management fees, financement) — risque de réintégration des charges'
    : 'Undocumented intragroup transactions (management fees, financing) — risk of expense reintegration');
  if (govScore < 60) risks.push(isFr
    ? 'Absence de gouvernance fiscale structurée — défense impossible en cas de contrôle approfondi'
    : 'Absence of structured tax governance — defense impossible in case of thorough audit');
  if (riskScore < 60) risks.push(isFr
    ? 'Exposition non provisionnée au risque de redressement — impact potentiel sur les comptes et les ratios prudentiels'
    : 'Unprovisioned reassessment risk exposure — potential impact on accounts and prudential ratios');
  if (globalScore < 40) risks.push(isFr
    ? 'Profil de risque critique : redressement potentiel estimé entre 500 millions et 2 milliards FCFA selon le volume des transactions'
    : 'Critical risk profile: potential reassessment estimated between 500 million and 2 billion FCFA depending on transaction volume');
  if (globalScore >= 60 && risks.length === 0) risks.push(isFr
    ? 'Risque résiduel faible — maintien de la veille et des mises à jour annuelles requis'
    : 'Low residual risk — maintaining monitoring and annual updates required');

  return risks;
}

export function getPTRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];

  const docScore = perAxis['documentation-pt'] ?? 0;
  const txScore = perAxis['transactions-intragroupe'] ?? 0;
  const govScore = perAxis['gouvernance-fiscale'] ?? 0;
  const riskScore = perAxis['exposition-risque'] ?? 0;

  if (docScore < 60) {
    recs.push({
      title: isFr ? 'Structurer la documentation BEPS Action 13' : 'Structure BEPS Action 13 documentation',
      axis: 'documentation-pt',
      items: isFr ? [
        'Élaborer un Master File décrivant la politique globale de prix de transfert du groupe',
        'Rédiger les Local Files pour chaque filiale africaine avec analyse FAR détaillée',
        'Réaliser des études de benchmarking avec comparables pertinents pour le marché africain',
        'Mettre en place un calendrier de mise à jour annuelle avant la date de dépôt fiscal',
      ] : [
        'Develop a Master File describing the group\'s global transfer pricing policy',
        'Draft Local Files for each African subsidiary with detailed FAR analysis',
        'Conduct benchmarking studies with relevant comparables for the African market',
        'Implement an annual update schedule before the tax filing deadline',
      ],
    });
  }

  if (txScore < 60) {
    recs.push({
      title: isFr ? 'Documenter et justifier les transactions intragroupe' : 'Document and justify intragroup transactions',
      axis: 'transactions-intragroupe',
      items: isFr ? [
        'Cartographier exhaustivement tous les flux intragroupe, y compris les flux non facturés',
        'Documenter chaque catégorie de management fees avec preuves des services rendus',
        'Formaliser les contrats de financement intragroupe avec analyse de taux de pleine concurrence',
        'Qualifier juridiquement chaque transaction (service, redevance, financement)',
      ] : [
        'Exhaustively map all intragroup flows, including non-invoiced flows',
        'Document each category of management fees with proof of services rendered',
        'Formalize intragroup financing contracts with arm\'s length rate analysis',
        'Legally qualify each transaction (service, royalty, financing)',
      ],
    });
  }

  if (govScore < 60) {
    recs.push({
      title: isFr ? 'Mettre en place une gouvernance fiscale structurée' : 'Implement structured tax governance',
      axis: 'gouvernance-fiscale',
      items: isFr ? [
        'Faire approuver une politique de prix de transfert par le Conseil d\'Administration',
        'Désigner un responsable prix de transfert avec reporting trimestriel',
        'Mettre en place un comité prix de transfert associant directions fiscale, financière et opérationnelle',
        'Instaurer une veille réglementaire BEPS/ATAF/administrations fiscales africaines',
      ] : [
        'Have a transfer pricing policy approved by the Board of Directors',
        'Designate a transfer pricing officer with quarterly reporting',
        'Establish a transfer pricing committee involving tax, finance and operational departments',
        'Set up BEPS/ATAF/African tax administration regulatory monitoring',
      ],
    });
  }

  if (riskScore < 60) {
    recs.push({
      title: isFr ? 'Réduire l\'exposition au risque de redressement' : 'Reduce reassessment risk exposure',
      axis: 'exposition-risque',
      items: isFr ? [
        'Provisionner les risques de redressement sur la base d\'une analyse actuarielle documentée',
        'Préparer un dossier de défense fiscale complet et le maintenir à jour en permanence',
        'Simuler un contrôle fiscal contradictoire pour identifier les faiblesses avant un contrôle réel',
        'Former les équipes locales à la défense des prix de transfert',
      ] : [
        'Provision reassessment risks based on documented actuarial analysis',
        'Prepare a complete tax defense file and keep it permanently updated',
        'Simulate an adversarial tax audit to identify weaknesses before a real audit',
        'Train local teams in transfer pricing defense',
      ],
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence en conformité prix de transfert' : 'Maintain transfer pricing compliance excellence',
      axis: 'documentation-pt',
      items: isFr ? [
        'Poursuivre la mise à jour annuelle des documentations Master File et Local File',
        'Renforcer le benchmarking avec des données africaines spécifiques',
        'Anticiper les évolutions BEPS 2.0 (Pilier 1 et Pilier 2)',
        'Documenter les APA (Accords Préalables de Prix) lorsque pertinent',
      ] : [
        'Continue annual updating of Master File and Local File documentation',
        'Strengthen benchmarking with specific African data',
        'Anticipate BEPS 2.0 developments (Pillar 1 and Pillar 2)',
        'Document APAs (Advance Pricing Agreements) where relevant',
      ],
    });
  }

  return recs;
}



