export interface RHPillar {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  weight: number;
  questions: RHQuestion[];
}

export interface RHQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: RHOption[];
}

export interface RHOption {
  value: number;
  labelFr: string;
  labelEn: string;
}

export const RH_PILLARS: RHPillar[] = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance RH',
    titleEn: 'HR Governance',
    descriptionFr: 'Politique RH, alignement stratégique et rôle de la direction',
    descriptionEn: 'HR policy, strategic alignment and leadership role',
    icon: 'ri-building-line',
    color: '#0f766e',
    weight: 18,
    questions: [
      {
        id: 'gov-1',
        questionFr: 'Votre organisation dispose-t-elle d\'une politique RH écrite et formalisée ?',
        questionEn: 'Does your organization have a written and formalized HR policy?',
        options: [
          { value: 0, labelFr: 'Aucune politique RH', labelEn: 'No HR policy' },
          { value: 25, labelFr: 'Politique informelle orale', labelEn: 'Informal oral policy' },
          { value: 50, labelFr: 'Politique écrite mais obsolète', labelEn: 'Written but outdated policy' },
          { value: 75, labelFr: 'Politique à jour, partiellement appliquée', labelEn: 'Up-to-date policy, partially applied' },
          { value: 100, labelFr: 'Politique complète, appliquée et révisée annuellement', labelEn: 'Complete policy, applied and reviewed annually' },
        ],
      },
      {
        id: 'gov-2',
        questionFr: 'La fonction RH est-elle alignée sur la stratégie globale de l\'entreprise ?',
        questionEn: 'Is the HR function aligned with the overall company strategy?',
        options: [
          { value: 0, labelFr: 'Aucun lien avec la stratégie', labelEn: 'No link to strategy' },
          { value: 25, labelFr: 'Alignement faible, réactif', labelEn: 'Weak alignment, reactive' },
          { value: 50, labelFr: 'Alignement partiel sur certains objectifs', labelEn: 'Partial alignment on some objectives' },
          { value: 75, labelFr: 'Alignement régulier avec la direction', labelEn: 'Regular alignment with management' },
          { value: 100, labelFr: 'RH partie intégrante du comité de direction stratégique', labelEn: 'HR integral part of strategic management committee' },
        ],
      },
      {
        id: 'gov-3',
        questionFr: 'Quel est le niveau de responsabilité et d\'autonomie de la direction RH ?',
        questionEn: 'What is the level of responsibility and autonomy of HR management?',
        options: [
          { value: 0, labelFr: 'Pas de responsable RH dédié', labelEn: 'No dedicated HR manager' },
          { value: 25, labelFr: 'Responsable RH junior, sous supervision stricte', labelEn: 'Junior HR manager, under strict supervision' },
          { value: 50, labelFr: 'Responsable RH avec autonomie opérationnelle', labelEn: 'HR manager with operational autonomy' },
          { value: 75, labelFr: 'DRH membre du comité de direction', labelEn: 'CHRO member of management committee' },
          { value: 100, labelFr: 'DRH avec voix décisionnelle et budget propre', labelEn: 'CHRO with decision-making power and own budget' },
        ],
      },
    ],
  },
  {
    id: 'recrutement',
    titleFr: 'Recrutement & Attractivité',
    titleEn: 'Recruitment & Attractiveness',
    descriptionFr: 'Processus de recrutement structuré, marque employeur et qualité des profils',
    descriptionEn: 'Structured recruitment process, employer brand and profile quality',
    icon: 'ri-user-search-line',
    color: '#d97706',
    weight: 17,
    questions: [
      {
        id: 'rec-1',
        questionFr: 'Votre processus de recrutement est-il structuré et documenté ?',
        questionEn: 'Is your recruitment process structured and documented?',
        options: [
          { value: 0, labelFr: 'Recrutement informel, sans processus', labelEn: 'Informal recruitment, no process' },
          { value: 25, labelFr: 'Processus basique, non documenté', labelEn: 'Basic process, not documented' },
          { value: 50, labelFr: 'Processus documenté mais irrégulièrement suivi', labelEn: 'Documented but irregularly followed' },
          { value: 75, labelFr: 'Processus structuré avec fiches de poste et entretiens standardisés', labelEn: 'Structured process with job descriptions and standardized interviews' },
          { value: 100, labelFr: 'Processus complet avec ATS, tests et onboarding structuré', labelEn: 'Complete process with ATS, tests and structured onboarding' },
        ],
      },
      {
        id: 'rec-2',
        questionFr: 'Comment évaluez-vous l\'attractivité de votre marque employeur ?',
        questionEn: 'How do you evaluate your employer brand attractiveness?',
        options: [
          { value: 0, labelFr: 'Aucune marque employeur définie', labelEn: 'No employer brand defined' },
          { value: 25, labelFr: 'Présence minimale sur les réseaux sociaux', labelEn: 'Minimal social media presence' },
          { value: 50, labelFr: 'Site carrière basique et présence LinkedIn', labelEn: 'Basic careers site and LinkedIn presence' },
          { value: 75, labelFr: 'Stratégie employeur active avec contenu régulier', labelEn: 'Active employer strategy with regular content' },
          { value: 100, labelFr: 'Marque employeur reconnue, récompensée, avec ambassadeurs internes', labelEn: 'Recognized employer brand, awarded, with internal ambassadors' },
        ],
      },
      {
        id: 'rec-3',
        questionFr: 'Quel est le taux de réussite de vos recrutements (bonne qualité de profil au bout de 6 mois) ?',
        questionEn: 'What is your recruitment success rate (good profile quality after 6 months)?',
        options: [
          { value: 0, labelFr: 'Moins de 30% de réussite', labelEn: 'Less than 30% success' },
          { value: 25, labelFr: '30-50% de réussite', labelEn: '30-50% success' },
          { value: 50, labelFr: '50-70% de réussite', labelEn: '50-70% success' },
          { value: 75, labelFr: '70-85% de réussite', labelEn: '70-85% success' },
          { value: 100, labelFr: 'Plus de 85% de réussite', labelEn: 'Over 85% success' },
        ],
      },
    ],
  },
  {
    id: 'performance',
    titleFr: 'Gestion des Performances',
    titleEn: 'Performance Management',
    descriptionFr: 'Objectifs clairs, système d\'évaluation et suivi des KPIs RH',
    descriptionEn: 'Clear objectives, evaluation system and HR KPI tracking',
    icon: 'ri-bar-chart-grouped-line',
    color: '#7c3aed',
    weight: 17,
    questions: [
      {
        id: 'perf-1',
        questionFr: 'Les objectifs individuels sont-ils clairement définis et alignés sur ceux de l\'entreprise ?',
        questionEn: 'Are individual objectives clearly defined and aligned with company objectives?',
        options: [
          { value: 0, labelFr: 'Aucun objectif individuel défini', labelEn: 'No individual objectives defined' },
          { value: 25, labelFr: 'Objectifs informels, non mesurables', labelEn: 'Informal, non-measurable objectives' },
          { value: 50, labelFr: 'Objectifs définis mais sans suivi régulier', labelEn: 'Objectives defined but without regular follow-up' },
          { value: 75, labelFr: 'Objectifs SMART avec revue semestrielle', labelEn: 'SMART objectives with semi-annual review' },
          { value: 100, labelFr: 'Objectifs SMART, revue trimestrielle, liés à la rémunération', labelEn: 'SMART objectives, quarterly review, linked to compensation' },
        ],
      },
      {
        id: 'perf-2',
        questionFr: 'Disposez-vous d\'un système d\'évaluation des performances formalisé ?',
        questionEn: 'Do you have a formalized performance evaluation system?',
        options: [
          { value: 0, labelFr: 'Aucun système d\'évaluation', labelEn: 'No evaluation system' },
          { value: 25, labelFr: 'Évaluation annuelle informelle', labelEn: 'Informal annual evaluation' },
          { value: 50, labelFr: 'Entretien annuel structuré', labelEn: 'Structured annual interview' },
          { value: 75, labelFr: 'Évaluation 360° ou semestrielle avec feedback', labelEn: '360° or semi-annual evaluation with feedback' },
          { value: 100, labelFr: 'Système continu avec OKRs, feedback régulier et plans de développement', labelEn: 'Continuous system with OKRs, regular feedback and development plans' },
        ],
      },
      {
        id: 'perf-3',
        questionFr: 'Suivez-vous des KPIs RH pertinents et les partagez-vous avec la direction ?',
        questionEn: 'Do you track relevant HR KPIs and share them with management?',
        options: [
          { value: 0, labelFr: 'Aucun KPI RH suivi', labelEn: 'No HR KPIs tracked' },
          { value: 25, labelFr: 'Quelques KPIs basiques calculés manuellement', labelEn: 'A few basic KPIs calculated manually' },
          { value: 50, labelFr: 'KPIs RH mensuels partagés avec la direction', labelEn: 'Monthly HR KPIs shared with management' },
          { value: 75, labelFr: 'Tableau de bord RH avec indicateurs clés et tendances', labelEn: 'HR dashboard with key indicators and trends' },
          { value: 100, labelFr: 'Tableau de bord RH intégré au pilotage stratégique avec alertes', labelEn: 'HR dashboard integrated into strategic management with alerts' },
        ],
      },
    ],
  },
  {
    id: 'competences',
    titleFr: 'Développement des Compétences',
    titleEn: 'Skills Development',
    descriptionFr: 'Formation, plans de carrière et gestion des talents',
    descriptionEn: 'Training, career plans and talent management',
    icon: 'ri-graduation-cap-line',
    color: '#059669',
    weight: 16,
    questions: [
      {
        id: 'comp-1',
        questionFr: 'Quel est le niveau d\'investissement en formation par collaborateur ?',
        questionEn: 'What is the level of training investment per employee?',
        options: [
          { value: 0, labelFr: 'Aucune formation prévue', labelEn: 'No training planned' },
          { value: 25, labelFr: 'Moins de 5 jours de formation/an', labelEn: 'Less than 5 training days/year' },
          { value: 50, labelFr: '5-10 jours de formation/an avec plan partiel', labelEn: '5-10 training days/year with partial plan' },
          { value: 75, labelFr: '10-15 jours avec plan de formation annuel structuré', labelEn: '10-15 days with structured annual training plan' },
          { value: 100, labelFr: 'Plus de 15 jours avec académie interne et certifications', labelEn: 'Over 15 days with internal academy and certifications' },
        ],
      },
      {
        id: 'comp-2',
        questionFr: 'Disposez-vous de plans de carrière et de succession pour les postes clés ?',
        questionEn: 'Do you have career and succession plans for key positions?',
        options: [
          { value: 0, labelFr: 'Aucun plan de carrière', labelEn: 'No career plan' },
          { value: 25, labelFr: 'Discussions informelles sur l\'évolution', labelEn: 'Informal discussions about progression' },
          { value: 50, labelFr: 'Plans de carrière pour quelques profils', labelEn: 'Career plans for a few profiles' },
          { value: 75, labelFr: 'Plans de carrière et succession pour postes clés', labelEn: 'Career and succession plans for key positions' },
          { value: 100, labelFr: 'Gestion des talents complète avec mentoring et mobilité interne', labelEn: 'Complete talent management with mentoring and internal mobility' },
        ],
      },
      {
        id: 'comp-3',
        questionFr: 'Comment identifiez-vous et gérez-vous les talents à haut potentiel ?',
        questionEn: 'How do you identify and manage high-potential talents?',
        options: [
          { value: 0, labelFr: 'Aucun processus de détection des talents', labelEn: 'No talent detection process' },
          { value: 25, labelFr: 'Détection informelle par les managers', labelEn: 'Informal detection by managers' },
          { value: 50, labelFr: 'Identification basée sur les évaluations annuelles', labelEn: 'Identification based on annual evaluations' },
          { value: 75, labelFr: 'Programme HiPo avec suivi personnalisé', labelEn: 'HiPo program with personalized follow-up' },
          { value: 100, labelFr: 'Programme HiPo structuré avec parcours accéléré et rétention ciblée', labelEn: 'Structured HiPo program with accelerated track and targeted retention' },
        ],
      },
    ],
  },
  {
    id: 'administration',
    titleFr: 'Administration RH',
    titleEn: 'HR Administration',
    descriptionFr: 'Contrats, conformité légale et gestion de la paie',
    descriptionEn: 'Contracts, legal compliance and payroll management',
    icon: 'ri-file-list-3-line',
    color: '#db2777',
    weight: 16,
    questions: [
      {
        id: 'adm-1',
        questionFr: 'Vos contrats de travail sont-ils conformes à la législation locale (OHADA, droit du travail) ?',
        questionEn: 'Are your employment contracts compliant with local legislation (OHADA, labor law)?',
        options: [
          { value: 0, labelFr: 'Contrats non conformes ou absents', labelEn: 'Non-compliant or missing contracts' },
          { value: 25, labelFr: 'Contrats basiques avec quelques clauses manquantes', labelEn: 'Basic contracts with some missing clauses' },
          { value: 50, labelFr: 'Contrats conformes mais non révisés régulièrement', labelEn: 'Compliant contracts but not regularly reviewed' },
          { value: 75, labelFr: 'Contrats conformes, révisés, avec clauses spécifiques', labelEn: 'Compliant contracts, reviewed, with specific clauses' },
          { value: 100, labelFr: 'Contrats optimisés, conformes, avec clauses de confidentialité et non-concurrence', labelEn: 'Optimized, compliant contracts with confidentiality and non-compete clauses' },
        ],
      },
      {
        id: 'adm-2',
        questionFr: 'Votre gestion de la paie est-elle fiable, sécurisée et conforme ?',
        questionEn: 'Is your payroll management reliable, secure and compliant?',
        options: [
          { value: 0, labelFr: 'Paie manuelle avec erreurs fréquentes', labelEn: 'Manual payroll with frequent errors' },
          { value: 25, labelFr: 'Paie sur Excel avec contrôles basiques', labelEn: 'Excel payroll with basic controls' },
          { value: 50, labelFr: 'Logiciel de paie dédié avec quelques contrôles', labelEn: 'Dedicated payroll software with some controls' },
          { value: 75, labelFr: 'Paie intégrée au SIRH avec conformité fiscale et sociale', labelEn: 'Payroll integrated into HRIS with tax and social compliance' },
          { value: 100, labelFr: 'Paie 100% automatisée, auditée, avec bulletins dématérialisés', labelEn: '100% automated payroll, audited, with digitalized payslips' },
        ],
      },
      {
        id: 'adm-3',
        questionFr: 'Votre conformité légale (déclarations sociales, inspections, contentieux) est-elle maîtrisée ?',
        questionEn: 'Is your legal compliance (social declarations, inspections, disputes) under control?',
        options: [
          { value: 0, labelFr: 'Contentieux fréquents, déclarations en retard', labelEn: 'Frequent disputes, late declarations' },
          { value: 25, labelFr: 'Quelques retards et contentieux mineurs', labelEn: 'Some delays and minor disputes' },
          { value: 50, labelFr: 'Conformité globale mais avec des lacunes ponctuelles', labelEn: 'Overall compliance but with occasional gaps' },
          { value: 75, labelFr: 'Bonne conformité avec veille juridique active', labelEn: 'Good compliance with active legal monitoring' },
          { value: 100, labelFr: 'Conformité parfaite, audits internes réguliers, zéro contentieux', labelEn: 'Perfect compliance, regular internal audits, zero disputes' },
        ],
      },
    ],
  },
  {
    id: 'climat',
    titleFr: 'Climat Social & Engagement',
    titleEn: 'Social Climate & Engagement',
    descriptionFr: 'Motivation, turnover et communication interne',
    descriptionEn: 'Motivation, turnover and internal communication',
    icon: 'ri-heart-pulse-line',
    color: '#dc2626',
    weight: 16,
    questions: [
      {
        id: 'cli-1',
        questionFr: 'Quel est votre taux de turnover annuel ?',
        questionEn: 'What is your annual turnover rate?',
        options: [
          { value: 0, labelFr: 'Plus de 40% de turnover', labelEn: 'Over 40% turnover' },
          { value: 25, labelFr: '25-40% de turnover', labelEn: '25-40% turnover' },
          { value: 50, labelFr: '15-25% de turnover', labelEn: '15-25% turnover' },
          { value: 75, labelFr: '8-15% de turnover', labelEn: '8-15% turnover' },
          { value: 100, labelFr: 'Moins de 8% de turnover', labelEn: 'Less than 8% turnover' },
        ],
      },
      {
        id: 'cli-2',
        questionFr: 'Mesurez-vous régulièrement la satisfaction et l\'engagement de vos collaborateurs ?',
        questionEn: 'Do you regularly measure employee satisfaction and engagement?',
        options: [
          { value: 0, labelFr: 'Jamais mesuré', labelEn: 'Never measured' },
          { value: 25, labelFr: 'Discussions informelles occasionnelles', labelEn: 'Occasional informal discussions' },
          { value: 50, labelFr: 'Enquête annuelle de satisfaction', labelEn: 'Annual satisfaction survey' },
          { value: 75, labelFr: 'Enquêtes semestrielles avec plans d\'action', labelEn: 'Semi-annual surveys with action plans' },
          { value: 100, labelFr: 'Mesure continue (eNPS, pulse surveys) avec actions correctives immédiates', labelEn: 'Continuous measurement (eNPS, pulse surveys) with immediate corrective actions' },
        ],
      },
      {
        id: 'cli-3',
        questionFr: 'Comment évaluez-vous la qualité de la communication interne ?',
        questionEn: 'How do you evaluate the quality of internal communication?',
        options: [
          { value: 0, labelFr: 'Communication inexistante ou chaotique', labelEn: 'Non-existent or chaotic communication' },
          { value: 25, labelFr: 'Communication top-down sporadique', labelEn: 'Sporadic top-down communication' },
          { value: 50, labelFr: 'Réunions régulières mais sens descendant uniquement', labelEn: 'Regular meetings but top-down only' },
          { value: 75, labelFr: 'Communication bidirectionnelle avec canaux multiples', labelEn: 'Two-way communication with multiple channels' },
          { value: 100, labelFr: 'Communication transparente, participative, avec intranet et réseau social interne', labelEn: 'Transparent, participatory communication with intranet and internal social network' },
        ],
      },
    ],
  },
];

export const TOTAL_QUESTIONS = RH_PILLARS.reduce((sum, p) => sum + p.questions.length, 0);

export function getScoreColor(score: number): string {
  if (score < 40) return '#dc2626';
  if (score < 70) return '#d97706';
  if (score < 85) return '#059669';
  return '#0f766e';
}

export function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 40) return isFr ? 'Niveau Critique' : 'Critical Level';
  if (score < 70) return isFr ? 'Niveau Intermédiaire' : 'Intermediate Level';
  if (score < 85) return isFr ? 'Niveau Avancé' : 'Advanced Level';
  return isFr ? 'Niveau d\'Excellence' : 'Excellence Level';
}

export function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 40) return isFr ? 'Critique' : 'Critical';
  if (score < 70) return isFr ? 'Intermédiaire' : 'Intermediate';
  if (score < 85) return isFr ? 'Avancé' : 'Advanced';
  return isFr ? 'Excellence' : 'Excellence';
}

export function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 40) {
    return isFr
      ? 'Votre fonction RH présente des risques structurels majeurs. Une intervention urgente est nécessaire pour sécuriser votre capital humain.'
      : 'Your HR function has major structural risks. Urgent intervention is needed to secure your human capital.';
  }
  if (score < 70) {
    return isFr
      ? 'Votre fonction RH dispose d\'une base solide mais des améliorations significatives sont nécessaires pour soutenir votre croissance.'
      : 'Your HR function has a solid foundation but significant improvements are needed to support your growth.';
  }
  if (score < 85) {
    return isFr
      ? 'Votre fonction RH est performante et bien structurée. Quelques optimisations vous permettront d\'atteindre l\'excellence.'
      : 'Your HR function is performing well and well structured. A few optimizations will help you reach excellence.';
  }
  return isFr
    ? 'Votre fonction RH est un véritable levier stratégique. Vous êtes exemplaire sur le marché africain.'
    : 'Your HR function is a true strategic lever. You are exemplary in the African market.';
}

export function getBenchmarkPosition(score: number, lang: string): { label: string; color: string } {
  const isFr = !lang.startsWith('en');
  if (score < 40) return { label: isFr ? 'En dessous du marché' : 'Below market', color: '#dc2626' };
  if (score < 60) return { label: isFr ? 'Dans la moyenne basse' : 'Below average', color: '#d97706' };
  if (score < 75) return { label: isFr ? 'Dans la moyenne' : 'Average', color: '#d97706' };
  if (score < 90) return { label: isFr ? 'Performante' : 'Performing', color: '#059669' };
  return { label: isFr ? 'Excellence sectorielle' : 'Sector excellence', color: '#0f766e' };
}

export function getRisks(score: number, perAxis: Record<string, number>, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  if (score < 40) {
    risks.push(isFr
      ? 'RISQUE MAJEUR : Votre fonction RH est en situation critique. Vous risquez une dégradation rapide de votre capital humain et une perte de compétitivité.'
      : 'MAJOR RISK: Your HR function is in a critical situation. You risk rapid degradation of your human capital and loss of competitiveness.');
  }

  Object.entries(perAxis).forEach(([axisId, axisScore]) => {
    const pillar = RH_PILLARS.find((p) => p.id === axisId);
    if (!pillar) return;

    if (axisScore < 30) {
      if (axisId === 'gouvernance') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Absence de politique RH et de vision stratégique. Décisions RH arbitraires et risques juridiques élevés.`
          : `CRITICAL RISK — ${pillar.titleEn}: No HR policy and strategic vision. Arbitrary HR decisions and high legal risks.`);
      } else if (axisId === 'recrutement') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Recrutement non structuré entraînant des embauches inadaptées et des coûts cachés élevés.`
          : `CRITICAL RISK — ${pillar.titleEn}: Unstructured recruitment leading to unsuitable hires and high hidden costs.`);
      } else if (axisId === 'performance') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Absence d'objectifs et d'évaluation. Les collaborateurs évoluent sans repères ni motivation.`
          : `CRITICAL RISK — ${pillar.titleEn}: No objectives and evaluation. Employees progress without benchmarks or motivation.`);
      } else if (axisId === 'competences') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Aucun investissement en formation. Obsolescence des compétences et départ des talents.`
          : `CRITICAL RISK — ${pillar.titleEn}: No training investment. Skills obsolescence and talent departure.`);
      } else if (axisId === 'administration') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Non-conformité légale majeure. Risque d'inspection, de sanctions et de contentieux coûteux.`
          : `CRITICAL RISK — ${pillar.titleEn}: Major legal non-compliance. Risk of inspection, sanctions and costly disputes.`);
      } else if (axisId === 'climat') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Turnover élevé et climat dégradé. Perte de productivité et détérioration de l'image employeur.`
          : `CRITICAL RISK — ${pillar.titleEn}: High turnover and degraded climate. Loss of productivity and deterioration of employer image.`);
      }
    } else if (axisScore < 50) {
      risks.push(isFr
        ? `RISQUE ÉLEVÉ — ${pillar.titleFr} (${axisScore}/100) : Des lacunes importantes nécessitent une attention immédiate.`
        : `HIGH RISK — ${pillar.titleEn} (${axisScore}/100): Significant gaps require immediate attention.`);
    }
  });

  if (risks.length === 0) {
    risks.push(isFr
      ? 'Aucun risque critique identifié. Votre fonction RH est globalement saine. Concentrez-vous sur l\'optimisation continue.'
      : 'No critical risks identified. Your HR function is generally healthy. Focus on continuous optimization.');
  }

  return risks;
}

export function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  // Recommandations globales selon le score
  if (globalScore < 40) {
    recs.push({
      title: isFr ? 'URGENCE : Audit RH complet et immédiat' : 'URGENT: Complete and immediate HR audit',
      items: isFr
        ? [
            'Nommez immédiatement un responsable RH dédié ou faites appel à un consultant externe',
            'Rédigez une politique RH minimale couvrant recrutement, évaluation et paie',
            'Auditez la conformité légale de tous les contrats et déclarations sociales',
            'Mettez en place un entretien individuel avec chaque collaborateur pour identifier les risques de départ',
          ]
        : [
            'Immediately appoint a dedicated HR manager or hire an external consultant',
            'Write a minimum HR policy covering recruitment, evaluation and payroll',
            'Audit the legal compliance of all contracts and social declarations',
            'Set up an individual interview with each employee to identify departure risks',
          ],
    });
  }

  // Recommandations par pilier faible
  Object.entries(perAxis).forEach(([axisId, axisScore]) => {
    if (axisScore >= 70) return;
    const pillar = RH_PILLARS.find((p) => p.id === axisId);
    if (!pillar) return;

    if (axisId === 'gouvernance' && axisScore < 70) {
      recs.push({
        title: isFr ? `Renforcer la gouvernance RH (${axisScore}/100)` : `Strengthen HR governance (${axisScore}/100)`,
        items: isFr
          ? [
              'Rédiger ou actualiser la politique RH avec la direction générale',
              'Définir le rôle et les responsabilités du responsable RH dans l\'organigramme',
              'Établir un calendrier RH annuel (recrutements, évaluations, formations)',
              'Créer un comité RH avec représentants de la direction et des opérationnels',
            ]
          : [
              'Write or update the HR policy with the general management',
              'Define the role and responsibilities of the HR manager in the organization chart',
              'Establish an annual HR calendar (recruitments, evaluations, training)',
              'Create an HR committee with representatives from management and operations',
            ],
      });
    }

    if (axisId === 'recrutement' && axisScore < 70) {
      recs.push({
        title: isFr ? `Structurer le recrutement (${axisScore}/100)` : `Structure recruitment (${axisScore}/100)`,
        items: isFr
          ? [
              'Documenter le processus de recrutement étape par étape',
              'Créer des fiches de poste standardisées pour chaque fonction',
              'Mettre en place un entretien structuré avec grille d\'évaluation',
              'Développer une page carrière et une présence LinkedIn active',
            ]
          : [
              'Document the recruitment process step by step',
              'Create standardized job descriptions for each function',
              'Set up a structured interview with an evaluation grid',
              'Develop a careers page and an active LinkedIn presence',
            ],
      });
    }

    if (axisId === 'performance' && axisScore < 70) {
      recs.push({
        title: isFr ? `Instaurer la gestion des performances (${axisScore}/100)` : `Implement performance management (${axisScore}/100)`,
        items: isFr
          ? [
              'Définir des objectifs SMART pour chaque collaborateur',
              'Mettre en place un entretien d\'évaluation semestriel',
              'Créer un tableau de bord RH avec KPIs clés (turnover, absentéisme, productivité)',
              'Lier une partie de la rémunération variable aux résultats individuels',
            ]
          : [
              'Define SMART objectives for each employee',
              'Set up a semi-annual evaluation interview',
              'Create an HR dashboard with key KPIs (turnover, absenteeism, productivity)',
              'Link part of variable compensation to individual results',
            ],
      });
    }

    if (axisId === 'competences' && axisScore < 70) {
      recs.push({
        title: isFr ? `Investir dans le développement (${axisScore}/100)` : `Invest in development (${axisScore}/100)`,
        items: isFr
          ? [
              'Établir un plan de formation annuel avec budget dédié',
              'Identifier les compétences critiques et les talents à haut potentiel',
              'Mettre en place un programme de mentoring interne',
              'Proposer des plans de carrière pour les profils clés',
            ]
          : [
              'Establish an annual training plan with dedicated budget',
              'Identify critical skills and high-potential talents',
              'Set up an internal mentoring program',
              'Offer career plans for key profiles',
            ],
      });
    }

    if (axisId === 'administration' && axisScore < 70) {
      recs.push({
        title: isFr ? `Sécuriser l'administration RH (${axisScore}/100)` : `Secure HR administration (${axisScore}/100)`,
        items: isFr
          ? [
              'Faire auditer la conformité légale par un expert en droit du travail',
              'Mettre à jour tous les contrats de travail avec les clauses obligatoires',
              'Automatiser la paie avec un logiciel conforme à la législation locale',
              'Mettre en place un registre des déclarations sociales avec échéancier',
            ]
          : [
              'Have legal compliance audited by a labor law expert',
              'Update all employment contracts with mandatory clauses',
              'Automate payroll with software compliant with local legislation',
              'Set up a register of social declarations with a schedule',
            ],
      });
    }

    if (axisId === 'climat' && axisScore < 70) {
      recs.push({
        title: isFr ? `Améliorer le climat social (${axisScore}/100)` : `Improve social climate (${axisScore}/100)`,
        items: isFr
          ? [
              'Réaliser une enquête de satisfaction anonyme dès que possible',
              'Mettre en place des réunions d\'équipe régulières et des points individuels',
              'Identifier les causes de turnover par des entretiens de départ',
              'Créer un canal de feedback anonyme et des actions correctives rapides',
            ]
          : [
              'Conduct an anonymous satisfaction survey as soon as possible',
              'Set up regular team meetings and individual check-ins',
              'Identify turnover causes through exit interviews',
              'Create an anonymous feedback channel and rapid corrective actions',
            ],
      });
    }
  });

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence RH' : 'Maintain HR excellence',
      items: isFr
        ? [
            'Poursuivre l\'innovation RH avec des outils digitaux',
            'Développer une culture d\'apprentissage continu',
            'Partager les bonnes pratiques RH avec le réseau professionnel',
            'Préparer une certification Great Place to Work ou équivalent',
          ]
        : [
            'Continue HR innovation with digital tools',
            'Develop a continuous learning culture',
            'Share HR best practices with the professional network',
            'Prepare for Great Place to Work certification or equivalent',
          ],
    });
  }

  return recs;
}

export function getUltraClosingMessage(score: number, lang: string): { title: string; subtitle: string; cta: string } {
  const isFr = !lang.startsWith('en');

  if (score < 40) {
    return {
      title: isFr
        ? 'Votre fonction RH présente un risque structurel ÉLEVÉ'
        : 'Your HR function has a HIGH structural risk',
      subtitle: isFr
        ? 'Chaque jour sans action expose votre organisation à des pertes de talents, des contentieux et une baisse de productivité. Nos experts RH peuvent sécuriser votre capital humain en 30 jours.'
        : 'Every day without action exposes your organization to talent losses, disputes and decreased productivity. Our HR experts can secure your human capital in 30 days.',
      cta: isFr ? 'Demander un audit RH d\'urgence' : 'Request an urgent HR audit',
    };
  }

  if (score < 70) {
    return {
      title: isFr
        ? 'Votre fonction RH a un potentiel significatif à débloquer'
        : 'Your HR function has significant potential to unlock',
      subtitle: isFr
        ? 'Des améliorations ciblées sur 2-3 piliers peuvent transformer votre fonction RH en levier de croissance. Nos consultants vous accompagnent dans cette transformation.'
        : 'Targeted improvements on 2-3 pillars can transform your HR function into a growth lever. Our consultants support you in this transformation.',
      cta: isFr ? 'Planifier un diagnostic RH approfondi' : 'Schedule an in-depth HR diagnostic',
    };
  }

  if (score < 85) {
    return {
      title: isFr
        ? 'Votre fonction RH est solide — passons à l\'excellence'
        : 'Your HR function is solid — let\'s move to excellence',
      subtitle: isFr
        ? 'Vous êtes sur la bonne voie. Quelques optimisations stratégiques vous permettront d\'atteindre le top 10% des entreprises africaines en matière de gestion des talents.'
        : 'You are on the right track. A few strategic optimizations will help you reach the top 10% of African companies in talent management.',
      cta: isFr ? 'Découvrir nos programmes d\'excellence RH' : 'Discover our HR excellence programs',
    };
  }

  return {
    title: isFr
      ? 'Votre fonction RH est un modèle d\'excellence'
      : 'Your HR function is a model of excellence',
    subtitle: isFr
      ? 'Félicitations ! Vous faites partie des entreprises africaines les plus performantes en gestion des ressources humaines. Partagez vos bonnes pratiques et continuez à innover.'
      : 'Congratulations! You are among the highest-performing African companies in human resource management. Share your best practices and continue to innovate.',
    cta: isFr ? 'Devenir référence RH avec Khepra' : 'Become an HR reference with Khepra',
  };
}

export interface SavedDiagnostic {
  date: string;
  globalScore: number;
  perAxis: Record<string, number>;
  answers: Record<string, number>;
  userName: string;
  userOrg: string;
}

const STORAGE_KEY = 'khepra_diagnostic_rh_baseline';

export function saveBaseline(diagnostic: SavedDiagnostic): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diagnostic));
  } catch {
    // ignore
  }
}

export function getBaseline(): SavedDiagnostic | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedDiagnostic;
  } catch {
    return null;
  }
}

export function clearBaseline(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getDeltaLabel(delta: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (delta > 15) return isFr ? 'Progression remarquable' : 'Remarkable progress';
  if (delta > 5) return isFr ? 'Bonne progression' : 'Good progress';
  if (delta > -5) return isFr ? 'Stable' : 'Stable';
  if (delta > -15) return isFr ? 'Légère régression' : 'Slight regression';
  return isFr ? 'Régression significative' : 'Significant regression';
}

export function getDeltaColor(delta: number): string {
  if (delta > 5) return '#059669';
  if (delta > -5) return '#6b7280';
  return '#dc2626';
}

export function getDeltaIcon(delta: number): string {
  if (delta > 5) return 'ri-arrow-up-line';
  if (delta > -5) return 'ri-subtract-line';
  return 'ri-arrow-down-line';
}