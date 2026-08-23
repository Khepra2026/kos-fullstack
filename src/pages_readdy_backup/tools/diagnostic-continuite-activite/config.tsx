import type { DiagnosticToolConfig } from '';

const FORM_URL = 'https://readdy.ai/api/form/d8nab850ihgem5t5pe50';

// ============================================================
// 5 DIMENSIONS DU PCA (Plan de Continuité d'Activité)
// ============================================================

function getScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#0e7490';
  if (score >= 25) return '#d97706';
  return '#dc2626';
}

function getScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Continuité Maîtrisée' : 'Business Continuity Controlled';
  if (score >= 50) return isFr ? 'Continuité Intermédiaire' : 'Intermediate Continuity';
  if (score >= 25) return isFr ? 'Continuité Insuffisante' : 'Insufficient Continuity';
  return isFr ? 'Continuité Critique' : 'Critical Continuity';
}

function getMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Maîtrisé' : 'Controlled';
  if (score >= 50) return isFr ? 'Intermédiaire' : 'Intermediate';
  if (score >= 25) return isFr ? 'Insuffisant' : 'Insufficient';
  return isFr ? 'Critique' : 'Critical';
}

function getReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre organisation démontre une maturité élevée en continuité d\'activité. Le PCA est documenté, testé et régulièrement mis à jour. Continuez à challenger le dispositif face aux menaces émergentes.'
    : 'Your organization demonstrates high business continuity maturity. The BCP is documented, tested and regularly updated. Continue challenging the system against emerging threats.';
  if (score >= 50) return isFr
    ? 'Votre dispositif de continuité est structuré mais des améliorations sont nécessaires, notamment sur les tests réguliers et la formalisation du plan de gestion de crise.'
    : 'Your continuity system is structured but improvements are needed, particularly on regular testing and crisis management plan formalization.';
  if (score >= 25) return isFr
    ? 'Votre continuité d\'activité présente des lacunes significatives. L\'absence de BIA formalisé et de PCA documenté expose l\'organisation à des interruptions prolongées en cas de sinistre.'
    : 'Your business continuity has significant gaps. The absence of formalized BIA and documented BCP exposes the organization to prolonged interruptions in the event of a disaster.';
  return isFr
    ? 'Votre organisation est en situation critique. Sans PCA ni stratégie de continuité, un incident majeur pourrait entraîner un arrêt définitif de l\'activité. Une action immédiate est impérative.'
    : 'Your organization is in a critical situation. Without BCP or continuity strategy, a major incident could lead to permanent business closure. Immediate action is imperative.';
}

function getRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = !lang.startsWith('en');
  const risks: (string | { fr: string; en: string })[] = [];

  if ((perAxis['bia'] ?? 100) < 50) {
    risks.push({ fr: 'BIA — Score faible : absence d\'identification des activités critiques et des impacts financiers en cas d\'interruption', en: 'BIA — Low score: no identification of critical activities and financial impacts in case of interruption' });
  }
  if ((perAxis['strategie'] ?? 100) < 50) {
    risks.push({ fr: 'Stratégie de Continuité — Score faible : aucune stratégie documentée de reprise et de contournement', en: 'Continuity Strategy — Low score: no documented recovery and workaround strategy' });
  }
  if ((perAxis['pca'] ?? 100) < 50) {
    risks.push({ fr: 'PCA — Score faible : plan de continuité inexistant ou non documenté, pas de procédures opérationnelles', en: 'BCP — Low score: business continuity plan non-existent or undocumented, no operational procedures' });
  }
  if ((perAxis['tests'] ?? 100) < 50) {
    risks.push({ fr: 'Tests & Exercices — Score faible : PCA non testé, aucune validation de l\'efficacité des procédures', en: 'Testing & Exercises — Low score: BCP untested, no validation of procedure effectiveness' });
  }
  if ((perAxis['crise'] ?? 100) < 50) {
    risks.push({ fr: 'Gestion de Crise — Score faible : absence de cellule de crise, de processus de décision d\'urgence et de communication de crise', en: 'Crisis Management — Low score: no crisis unit, emergency decision process or crisis communication' });
  }
  if (globalScore < 25) {
    risks.push({ fr: 'Risque existentiel : un sinistre majeur (incendie, cyberattaque, catastrophe naturelle) pourrait entraîner la cessation définitive de l\'activité', en: 'Existential risk: a major disaster (fire, cyberattack, natural catastrophe) could lead to permanent business cessation' });
  }
  if (risks.length === 0) {
    risks.push({ fr: 'Risques de continuité globalement maîtrisés. Maintenir le cycle de tests et la mise à jour du PCA.', en: 'Continuity risks generally under control. Maintain the testing cycle and BCP update.' });
  }
  return risks;
}

function getRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis?: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis?: string; items: string[] }[] = [];

  const biaScore = perAxis['bia'] ?? 0;
  const stratScore = perAxis['strategie'] ?? 0;
  const pcaScore = perAxis['pca'] ?? 0;
  const testsScore = perAxis['tests'] ?? 0;
  const criseScore = perAxis['crise'] ?? 0;

  if (biaScore < 50) {
    recs.push({
      title: isFr ? 'Réaliser une Analyse d\'Impact sur l\'Activité (BIA)' : 'Conduct a Business Impact Analysis (BIA)',
      axis: 'bia',
      items: isFr
        ? ['Identifier et classer toutes les activités critiques par ordre de priorité', 'Définir le RTO (Recovery Time Objective) pour chaque activité critique', 'Définir le RPO (Recovery Point Objective) — perte de données maximale acceptable', 'Chiffrer l\'impact financier d\'une interruption par jour/semaine/mois', 'Identifier les dépendances : systèmes IT, fournisseurs, compétences clés']
        : ['Identify and classify all critical activities by priority', 'Define RTO (Recovery Time Objective) for each critical activity', 'Define RPO (Recovery Point Objective) — maximum acceptable data loss', 'Quantify the financial impact of an interruption per day/week/month', 'Identify dependencies: IT systems, suppliers, key skills'],
    });
  }
  if (stratScore < 50) {
    recs.push({
      title: isFr ? 'Définir la Stratégie de Continuité' : 'Define Continuity Strategy',
      axis: 'strategie',
      items: isFr
        ? ['Choisir les stratégies de reprise adaptées : site de repli, télétravail, redondance', 'Dimensionner les ressources de continuité (effectifs, locaux, équipements)', 'Définir les stratégies de contournement pour chaque scénario de crise', 'Budgéter les investissements nécessaires à la continuité (site secondaire, cloud)', 'Formaliser les contrats avec les prestataires de secours']
        : ['Choose appropriate recovery strategies: backup site, remote work, redundancy', 'Size continuity resources (staff, premises, equipment)', 'Define workaround strategies for each crisis scenario', 'Budget the necessary continuity investments (secondary site, cloud)', 'Formalize contracts with backup service providers'],
    });
  }
  if (pcaScore < 50) {
    recs.push({
      title: isFr ? 'Documenter le Plan de Continuité d\'Activité (PCA)' : 'Document the Business Continuity Plan (BCP)',
      axis: 'pca',
      items: isFr
        ? ['Rédiger les procédures de continuité pour chaque activité critique', 'Documenter l\'organigramme de crise avec rôles et suppléances', 'Établir les procédures de basculement vers le site de repli', 'Définir les procédures de retour à la normale post-incident', 'Intégrer les fournisseurs critiques dans le PCA avec des SLA continuité']
        : ['Write continuity procedures for each critical activity', 'Document the crisis organization chart with roles and backups', 'Establish failover procedures to the backup site', 'Define post-incident return-to-normal procedures', 'Integrate critical suppliers into the BCP with continuity SLAs'],
    });
  }
  if (testsScore < 50) {
    recs.push({
      title: isFr ? 'Mettre en place un programme de Tests & Exercices' : 'Implement a Testing & Exercise Program',
      axis: 'tests',
      items: isFr
        ? ['Planifier un exercice de simulation de crise annuel (tabletop exercise)', 'Tester le basculement vers le site de repli au moins une fois par an', 'Former les membres de la cellule de crise à leurs rôles', 'Documenter les retours d\'expérience (REX) après chaque test', 'Mettre à jour le PCA en fonction des résultats des tests']
        : ['Schedule an annual crisis simulation exercise (tabletop exercise)', 'Test failover to backup site at least once a year', 'Train crisis unit members in their roles', 'Document lessons learned (REX) after each test', 'Update the BCP based on test results'],
    });
  }
  if (criseScore < 50) {
    recs.push({
      title: isFr ? 'Structurer la Gestion de Crise' : 'Structure Crisis Management',
      axis: 'crise',
      items: isFr
        ? ['Créer une cellule de crise avec des rôles clairement définis (leader, logistique, communication, IT)', 'Établir un processus de déclenchement de crise avec des seuils précis', 'Rédiger un plan de communication de crise (interne, clients, régulateurs, médias)', 'Mettre en place une salle de crise équipée (physique ou virtuelle)', 'Définir les procédures de coordination avec les autorités et les parties prenantes externes']
        : ['Create a crisis unit with clearly defined roles (leader, logistics, communication, IT)', 'Establish a crisis trigger process with precise thresholds', 'Write a crisis communication plan (internal, clients, regulators, media)', 'Set up an equipped crisis room (physical or virtual)', 'Define coordination procedures with authorities and external stakeholders'],
    });
  }
  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence en continuité d\'activité' : 'Maintain business continuity excellence',
      items: isFr
        ? ['Poursuivre le cycle annuel de tests et d\'exercices avec des scénarios variés', 'Mettre à jour le BIA et le PCA après chaque changement organisationnel majeur', 'Benchmarker le dispositif avec les standards ISO 22301 et les guidelines BCEAO/COBAC', 'Anticiper les menaces émergentes : cyber-attaques, changement climatique, risques pandémiques', 'Former les nouveaux arrivants aux procédures de continuité dès l\'onboarding']
        : ['Continue the annual testing and exercise cycle with varied scenarios', 'Update BIA and BCP after each major organizational change', 'Benchmark the system with ISO 22301 standards and BCEAO/COBAC guidelines', 'Anticipate emerging threats: cyberattacks, climate change, pandemic risks', 'Train newcomers in continuity procedures from onboarding'],
    });
  }

  return recs;
}

// ============================================================
// 15 QUESTIONS — 5 DIMENSIONS × 3 QUESTIONS
// ============================================================

const biaQuestions = [
  {
    id: 'bia_1', questionFr: 'Avez-vous identifié et classé vos activités critiques par ordre de priorité pour la continuité ?', questionEn: 'Have you identified and prioritized your critical activities for continuity?',
    opts: [{ v: 0, fr: 'Aucune identification', en: 'No identification' }, { v: 33, fr: 'Liste informelle', en: 'Informal list' }, { v: 67, fr: 'Activités critiques identifiées', en: 'Critical activities identified' }, { v: 100, fr: 'BIA complet avec classement par criticité et RTO/RPO', en: 'Complete BIA with criticality ranking and RTO/RPO' }],
  },
  {
    id: 'bia_2', questionFr: 'Avez-vous défini le RTO (Recovery Time Objective — délai maximal acceptable de reprise) pour chaque activité critique ?', questionEn: 'Have you defined the RTO (Recovery Time Objective) for each critical activity?',
    opts: [{ v: 0, fr: 'Aucun RTO défini', en: 'No RTO defined' }, { v: 33, fr: 'RTO estimé informellement', en: 'Informally estimated RTO' }, { v: 67, fr: 'RTO documenté pour les activités principales', en: 'RTO documented for main activities' }, { v: 100, fr: 'RTO et RPO documentés, validés par la direction', en: 'RTO and RPO documented, validated by management' }],
  },
  {
    id: 'bia_3', questionFr: 'Avez-vous chiffré l\'impact financier d\'une interruption prolongée de vos activités critiques ?', questionEn: 'Have you quantified the financial impact of a prolonged interruption of your critical activities?',
    opts: [{ v: 0, fr: 'Aucun chiffrage', en: 'No quantification' }, { v: 33, fr: 'Estimation approximative', en: 'Rough estimate' }, { v: 67, fr: 'Impact chiffré par jour d\'interruption', en: 'Impact quantified per day of interruption' }, { v: 100, fr: 'Modèle complet : perte de revenus, pénalités, coûts de reprise, impact réputationnel', en: 'Complete model: revenue loss, penalties, recovery costs, reputational impact' }],
  },
];

const strategieQuestions = [
  {
    id: 'strat_1', questionFr: 'Avez-vous défini une stratégie de continuité documentée (site de repli, télétravail, redondance) ?', questionEn: 'Have you defined a documented continuity strategy (backup site, remote work, redundancy)?',
    opts: [{ v: 0, fr: 'Aucune stratégie', en: 'No strategy' }, { v: 33, fr: 'Stratégie informelle', en: 'Informal strategy' }, { v: 67, fr: 'Stratégie documentée mais partielle', en: 'Documented but partial strategy' }, { v: 100, fr: 'Stratégie complète avec plusieurs scénarios et ressources dimensionnées', en: 'Complete strategy with multiple scenarios and sized resources' }],
  },
  {
    id: 'strat_2', questionFr: 'Disposez-vous d\'un site de repli (physique ou cloud) opérationnel en cas d\'indisponibilité de votre site principal ?', questionEn: 'Do you have an operational backup site (physical or cloud) in case your main site is unavailable?',
    opts: [{ v: 0, fr: 'Aucun site de repli', en: 'No backup site' }, { v: 33, fr: 'Solution improvisée (domicile, location ponctuelle)', en: 'Improvised solution (home, occasional rental)' }, { v: 67, fr: 'Site de repli identifié mais non testé', en: 'Backup site identified but untested' }, { v: 100, fr: 'Site de repli opérationnel, testé, avec infrastructure répliquée', en: 'Operational backup site, tested, with replicated infrastructure' }],
  },
  {
    id: 'strat_3', questionFr: 'Avez-vous identifié et contractualisé avec des fournisseurs de secours pour les ressources critiques ?', questionEn: 'Have you identified and contracted backup suppliers for critical resources?',
    opts: [{ v: 0, fr: 'Aucun fournisseur de secours', en: 'No backup suppliers' }, { v: 33, fr: 'Quelques contacts informels', en: 'Some informal contacts' }, { v: 67, fr: 'Fournisseurs identifiés sans contrats', en: 'Suppliers identified without contracts' }, { v: 100, fr: 'Contrats SLA avec fournisseurs de secours, testés annuellement', en: 'SLA contracts with backup suppliers, tested annually' }],
  },
];

const pcaQuestions = [
  {
    id: 'pca_1', questionFr: 'Disposez-vous d\'un Plan de Continuité d\'Activité (PCA) formalisé et approuvé par la direction ?', questionEn: 'Do you have a formalized and management-approved Business Continuity Plan (BCP)?',
    opts: [{ v: 0, fr: 'Aucun PCA', en: 'No BCP' }, { v: 33, fr: 'PCA en cours d\'élaboration', en: 'BCP under development' }, { v: 67, fr: 'PCA documenté mais non approuvé', en: 'BCP documented but not approved' }, { v: 100, fr: 'PCA complet, approuvé par la direction, diffusé à tous les acteurs', en: 'Complete BCP, management-approved, distributed to all stakeholders' }],
  },
  {
    id: 'pca_2', questionFr: 'Le PCA inclut-il des procédures détaillées de basculement et de reprise pour chaque activité critique ?', questionEn: 'Does the BCP include detailed failover and recovery procedures for each critical activity?',
    opts: [{ v: 0, fr: 'Aucune procédure', en: 'No procedures' }, { v: 33, fr: 'Procédures sommaires', en: 'Summary procedures' }, { v: 67, fr: 'Procédures détaillées pour les activités principales', en: 'Detailed procedures for main activities' }, { v: 100, fr: 'Procédures détaillées, checklists, fiches réflexes pour toutes les activités critiques', en: 'Detailed procedures, checklists, quick-reference cards for all critical activities' }],
  },
  {
    id: 'pca_3', questionFr: 'Le PCA est-il mis à jour régulièrement (au moins annuellement ou après chaque changement majeur) ?', questionEn: 'Is the BCP regularly updated (at least annually or after each major change)?',
    opts: [{ v: 0, fr: 'Pas de mise à jour', en: 'No updates' }, { v: 33, fr: 'Mise à jour ponctuelle (plus de 2 ans)', en: 'Occasional update (over 2 years ago)' }, { v: 67, fr: 'Mise à jour annuelle', en: 'Annual update' }, { v: 100, fr: 'Mise à jour continue avec version control, déclenchée par tout changement significatif', en: 'Continuous update with version control, triggered by any significant change' }],
  },
];

const testsQuestions = [
  {
    id: 'tests_1', questionFr: 'Organisez-vous des exercices de simulation de crise (tabletop, simulation, test réel) ?', questionEn: 'Do you organize crisis simulation exercises (tabletop, simulation, live test)?',
    opts: [{ v: 0, fr: 'Jamais', en: 'Never' }, { v: 33, fr: 'Exercice ponctuel (il y a plus de 2 ans)', en: 'One-time exercise (over 2 years ago)' }, { v: 67, fr: 'Exercice annuel de type tabletop', en: 'Annual tabletop exercise' }, { v: 100, fr: 'Programme complet : tabletop semestriel, simulation annuelle, test réel biannuel', en: 'Complete program: semi-annual tabletop, annual simulation, biannual live test' }],
  },
  {
    id: 'tests_2', questionFr: 'Le basculement vers le site de repli a-t-il été testé au cours des 12 derniers mois ?', questionEn: 'Has the failover to the backup site been tested in the last 12 months?',
    opts: [{ v: 0, fr: 'Non testé', en: 'Not tested' }, { v: 33, fr: 'Test partiel (certains composants)', en: 'Partial test (some components)' }, { v: 67, fr: 'Test complet mais datant de plus d\'un an', en: 'Full test but over a year ago' }, { v: 100, fr: 'Test complet dans les 12 mois, résultats documentés, écarts corrigés', en: 'Full test within 12 months, results documented, gaps corrected' }],
  },
  {
    id: 'tests_3', questionFr: 'Documentez-vous les retours d\'expérience (REX) après chaque exercice et mettez-vous à jour le PCA en conséquence ?', questionEn: 'Do you document lessons learned after each exercise and update the BCP accordingly?',
    opts: [{ v: 0, fr: 'Aucun REX documenté', en: 'No documented lessons learned' }, { v: 33, fr: 'REX informel, sans suivi', en: 'Informal lessons learned, no follow-up' }, { v: 67, fr: 'REX documenté, plan d\'actions partiellement suivi', en: 'Documented lessons learned, partially tracked action plan' }, { v: 100, fr: 'REX systématique, plan d\'actions avec responsables et échéances, PCA mis à jour', en: 'Systematic lessons learned, action plan with owners and deadlines, BCP updated' }],
  },
];

const criseQuestions = [
  {
    id: 'crise_1', questionFr: 'Disposez-vous d\'une cellule de crise formalisée avec des rôles et des suppléances clairement définis ?', questionEn: 'Do you have a formalized crisis unit with clearly defined roles and backups?',
    opts: [{ v: 0, fr: 'Aucune cellule de crise', en: 'No crisis unit' }, { v: 33, fr: 'Cellule informelle, désignation ad hoc', en: 'Informal unit, ad hoc designation' }, { v: 67, fr: 'Cellule définie mais suppléances non documentées', en: 'Unit defined but backups not documented' }, { v: 100, fr: 'Cellule formalisée, rôles et suppléances documentés, formation régulière', en: 'Formalized unit, documented roles and backups, regular training' }],
  },
  {
    id: 'crise_2', questionFr: 'Avez-vous un processus de déclenchement de crise avec des seuils et des critères d\'activation clairs ?', questionEn: 'Do you have a crisis trigger process with clear activation thresholds and criteria?',
    opts: [{ v: 0, fr: 'Pas de processus défini', en: 'No defined process' }, { v: 33, fr: 'Processus informel, décision du dirigeant', en: 'Informal process, leader decision' }, { v: 67, fr: 'Seuils définis pour les crises majeures', en: 'Thresholds defined for major crises' }, { v: 100, fr: 'Matrice de déclenchement multicritères avec niveaux de crise gradués', en: 'Multi-criteria trigger matrix with graduated crisis levels' }],
  },
  {
    id: 'crise_3', questionFr: 'Disposez-vous d\'un plan de communication de crise (interne, clients, régulateurs, médias, réseaux sociaux) ?', questionEn: 'Do you have a crisis communication plan (internal, clients, regulators, media, social networks)?',
    opts: [{ v: 0, fr: 'Aucun plan de communication de crise', en: 'No crisis communication plan' }, { v: 33, fr: 'Messages types informels', en: 'Informal template messages' }, { v: 67, fr: 'Plan documenté pour les parties prenantes principales', en: 'Documented plan for main stakeholders' }, { v: 100, fr: 'Plan complet avec porte-parole désignés, messages pré-rédigés, canaux multiples, simulations médias', en: 'Complete plan with designated spokespersons, pre-written messages, multiple channels, media simulations' }],
  },
];

function mapQuestions(qs: typeof biaQuestions, axisId: string) {
  return qs.map((q) => ({
    id: q.id,
    axisId,
    questionFr: q.questionFr,
    questionEn: q.questionEn,
    options: q.opts.map((o) => ({ value: o.v, labelFr: o.fr, labelEn: o.en })),
  }));
}

export const diagnosticContinuiteActiviteConfig: DiagnosticToolConfig = {
  toolId: 'diagnostic-continuite-activite',
  toolNameFr: 'Diagnostic Continuité d\'Activité',
  toolNameEn: 'Business Continuity Diagnostic',
  toolSubtitleFr: 'Évaluez la résilience de votre organisation face aux interruptions. 15 questions sur 5 dimensions : BIA, Stratégie, PCA, Tests et Gestion de Crise.',
  toolSubtitleEn: 'Assess your organization\'s resilience to interruptions. 15 questions across 5 dimensions: BIA, Strategy, BCP, Testing and Crisis Management.',

  seoTitleFr: 'Diagnostic Continuité d\'Activité (PCA) | KHEPRA EXPERTS',
  seoTitleEn: 'Business Continuity Diagnostic (BCP) | KHEPRA EXPERTS',
  seoDescriptionFr: 'Évaluez votre Plan de Continuité d\'Activité (PCA) en 15 questions. Score de maturité BIA/Stratégie/PCA/Tests/Crise, recommandations ISO 22301.',
  seoDescriptionEn: 'Assess your Business Continuity Plan (BCP) in 15 questions. BIA/Strategy/BCP/Tests/Crisis maturity score, ISO 22301 recommendations.',
  seoKeywordsFr: 'continuité activité, PCA, plan continuité, BIA, gestion crise, site repli, reprise après sinistre, ISO 22301, BCEAO',
  seoKeywordsEn: 'business continuity, BCP, BIA, crisis management, backup site, disaster recovery, ISO 22301, BCEAO',
  canonicalPath: '/tools/diagnostic-continuite-activite',

  axes: [
    {
      id: 'bia',
      titleFr: 'Analyse d\'Impact sur l\'Activité (BIA)',
      titleEn: 'Business Impact Analysis (BIA)',
      descriptionFr: 'Identification des activités critiques, RTO, RPO, impact financier des interruptions',
      descriptionEn: 'Critical activity identification, RTO, RPO, financial impact of interruptions',
      icon: 'ri-bar-chart-box-line',
      color: '#dc2626',
      questions: mapQuestions(biaQuestions, 'bia'),
    },
    {
      id: 'strategie',
      titleFr: 'Stratégie de Continuité',
      titleEn: 'Continuity Strategy',
      descriptionFr: 'Stratégies de reprise, site de repli, redondance, fournisseurs de secours',
      descriptionEn: 'Recovery strategies, backup site, redundancy, backup suppliers',
      icon: 'ri-compass-3-line',
      color: '#d97706',
      questions: mapQuestions(strategieQuestions, 'strategie'),
    },
    {
      id: 'pca',
      titleFr: 'Plan de Continuité d\'Activité (PCA)',
      titleEn: 'Business Continuity Plan (BCP)',
      descriptionFr: 'Documentation, procédures, basculement, mise à jour, approbation direction',
      descriptionEn: 'Documentation, procedures, failover, updates, management approval',
      icon: 'ri-file-list-3-line',
      color: '#0e7490',
      questions: mapQuestions(pcaQuestions, 'pca'),
    },
    {
      id: 'tests',
      titleFr: 'Tests & Exercices',
      titleEn: 'Testing & Exercises',
      descriptionFr: 'Simulations de crise, tests de basculement, retours d\'expérience, amélioration continue',
      descriptionEn: 'Crisis simulations, failover tests, lessons learned, continuous improvement',
      icon: 'ri-test-tube-line',
      color: '#7c3aed',
      questions: mapQuestions(testsQuestions, 'tests'),
    },
    {
      id: 'crise',
      titleFr: 'Gestion de Crise',
      titleEn: 'Crisis Management',
      descriptionFr: 'Cellule de crise, processus de déclenchement, communication de crise, coordination',
      descriptionEn: 'Crisis unit, trigger process, crisis communication, coordination',
      icon: 'ri-alert-line',
      color: '#0891b2',
      questions: mapQuestions(criseQuestions, 'crise'),
    },
  ],

  howToNameFr: 'Diagnostic Continuité d\'Activité KHEPRA™',
  howToNameEn: 'Business Continuity Diagnostic KHEPRA™',
  howToDescriptionFr: 'Évaluez la résilience de votre organisation en 15 questions sur 5 dimensions : BIA, Stratégie de Continuité, PCA, Tests & Exercices, Gestion de Crise. Score de maturité et recommandations alignées ISO 22301.',
  howToDescriptionEn: 'Assess your organization\'s resilience in 15 questions across 5 dimensions: BIA, Continuity Strategy, BCP, Testing & Exercises, Crisis Management. Maturity score and ISO 22301-aligned recommendations.',
  howToTotalTime: '6M',
  howToSteps: [
    { name: 'Analyse d\'Impact (BIA)', text: 'Identifiez vos activités critiques, définissez les RTO/RPO et chiffrez l\'impact financier d\'une interruption prolongée.' },
    { name: 'Stratégie de Continuité', text: 'Évaluez vos stratégies de reprise, votre site de repli et vos contrats avec les fournisseurs de secours.' },
    { name: 'Plan de Continuité (PCA)', text: 'Vérifiez la documentation de votre PCA, les procédures de basculement et la fréquence de mise à jour.' },
    { name: 'Tests & Exercices', text: 'Examinez votre programme de tests : simulations de crise, tests de basculement et retours d\'expérience.' },
    { name: 'Gestion de Crise', text: 'Évaluez votre cellule de crise, le processus de déclenchement et votre plan de communication de crise.' },
  ],

  getScoreColor,
  getScoreLabel,
  getMaturityLevel,
  getReadinessIndicator,

  getRisks: (perAxis, globalScore, lang) => getRisks(perAxis, globalScore, lang),
  getRecommendations: (perAxis, globalScore, lang) => getRecommendations(perAxis, globalScore, lang),

  getOptionStyle: (value, isSelected) => {
    if (value === 100) return isSelected ? 'border-primary-500 bg-primary-50' : 'border-secondary-200 hover:border-primary-300';
    if (value === 67) return isSelected ? 'border-sky-500 bg-sky-50' : 'border-secondary-200 hover:border-sky-300';
    if (value === 33) return isSelected ? 'border-accent-500 bg-accent-50' : 'border-secondary-200 hover:border-accent-300';
    if (value === 0) return isSelected ? 'border-red-500 bg-red-50' : 'border-secondary-200 hover:border-red-300';
    return isSelected ? 'border-gray-500 bg-gray-50' : 'border-secondary-200 hover:border-secondary-300';
  },
  getOptionIcon: (value) => {
    if (value === 100) return 'ri-check-double-line';
    if (value === 67) return 'ri-check-line';
    if (value === 33) return 'ri-subtract-line';
    return 'ri-close-line';
  },
  getOptionColor: (value) => {
    if (value === 100) return 'text-primary-600';
    if (value === 67) return 'text-sky-600';
    if (value === 33) return 'text-accent-600';
    return 'text-red-600';
  },

  showLeadForm: true,
  formUrl: FORM_URL,

  hashtags: ['ContinuiteActivite', 'PCA', 'BusinessContinuity', 'GestionDeCrise', 'ISO22301'],

  showRadarChart: false,

  badgeIcon: 'ri-restart-line',
  badgeTextFr: '5 axes · 15 questions · 6 min',
  badgeTextEn: '5 axes · 15 questions · 6 min',

  expertCTA: {
    titleFr: 'Besoin d\'un accompagnement en continuité d\'activité ?',
    titleEn: 'Need business continuity support?',
    descriptionFr: 'Nos experts vous accompagnent dans l\'élaboration, le test et la certification ISO 22301 de votre Plan de Continuité d\'Activité. Audit complet, BIA, PCA, exercices de crise et formation des équipes.',
    descriptionEn: 'Our experts support you in developing, testing and certifying your Business Continuity Plan to ISO 22301. Complete audit, BIA, BCP, crisis exercises and team training.',
    ctaFr: 'Planifier un diagnostic',
    ctaEn: 'Schedule a diagnosis',
    ctaLink: '/contact',
  },
};



