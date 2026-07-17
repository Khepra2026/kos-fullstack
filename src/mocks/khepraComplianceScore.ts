export interface ComplianceQuestion {
  id: string;
  domain: string;
  domainIcon: string;
  question: string;
  description: string;
  options: { value: number; label: string; detail: string }[];
}

export interface ComplianceDomain {
  id: string;
  name: string;
  icon: string;
  description: string;
  maxScore: number;
  weight: number;
  regulatoryRefs: string[];
}

export interface ComplianceScoreResult {
  overallScore: number;
  grade: string;
  gradeLabel: string;
  gradeDescription: string;
  domainScores: { domainId: string; domainName: string; icon: string; score: number; maxScore: number; percentage: number; status: string; recommendations: string[] }[];
  top3Strengths: string[];
  top3Weaknesses: string[];
  urgencyLevel: string;
  urgencyDescription: string;
  nextSteps: string[];
  estimatedTimeline: string;
  benchmarkComparison: string;
}

export const complianceDomains: ComplianceDomain[] = [
  {
    id: 'governance',
    name: 'Gouvernance & Organisation',
    icon: 'ri-government-line',
    description: 'Évalue la robustesse de votre structure de gouvernance, la composition du Conseil, les comités spécialisés et l\'indépendance des administrateurs.',
    maxScore: 20,
    weight: 20,
    regulatoryRefs: ['Circulaire BCEAO 01/2017/CB', 'OHADA Acte Uniforme SYSCOHADA', 'Règlement COBAC R-2016/01', 'GAFI Recommandation 2'],
  },
  {
    id: 'compliance',
    name: 'Conformité & LBC/FT',
    icon: 'ri-shield-check-line',
    description: 'Mesure la maturité de votre dispositif LBC/FT, la cartographie des risques, le dispositif KYC, le gel des avoirs et les déclarations de soupçons.',
    maxScore: 20,
    weight: 20,
    regulatoryRefs: ['Règlement CEMAC n°01/16 LBC/FT', 'Directive UEMOA n°02/2015', 'GAFI 40 Recommandations', 'GIABA/GABAC'],
  },
  {
    id: 'prudential',
    name: 'Gestion Prudentielle',
    icon: 'ri-funds-line',
    description: 'Analyse vos ratios prudentiels, la gestion actif-passif, le provisionnement, la solvabilité et la liquidité.',
    maxScore: 20,
    weight: 20,
    regulatoryRefs: ['BCEAO Dispositif Prudentiel', 'Bâle II/III', 'COBAC Règlement CEMAC', 'IFRS 9'],
  },
  {
    id: 'risk',
    name: 'Gestion des Risques',
    icon: 'ri-radar-line',
    description: 'Évalue votre cartographie des risques, le dispositif de contrôle interne, la continuité d\'activité et la gestion de crise.',
    maxScore: 15,
    weight: 15,
    regulatoryRefs: ['COSO 2013', 'ISO 31000', 'Circulaire BCEAO 001/2020', 'COBAC Plan Préventif Redressement'],
  },
  {
    id: 'digital',
    name: 'Transformation Digitale & Cyber',
    icon: 'ri-computer-line',
    description: 'Mesure la résilience de votre système d\'information, la cybersécurité, la protection des données et votre maturité digitale.',
    maxScore: 15,
    weight: 15,
    regulatoryRefs: ['Directive COBAC 2027 Résilience Opérationnelle', 'ISO 27001', 'RGPD / Loi Protection Données', 'NIST CSF 2.0'],
  },
  {
    id: 'esg',
    name: 'ESG & Finance Durable',
    icon: 'ri-leaf-line',
    description: 'Évalue votre intégration des critères ESG, le reporting ISSB, l\'alignement taxonomie verte et les stress tests climatiques.',
    maxScore: 10,
    weight: 10,
    regulatoryRefs: ['ISSB IFRS S1/S2', 'NGFS', 'BCEAO Taxonomie Verte UEMOA', 'GRI 2021'],
  },
];

export const complianceQuestions: ComplianceQuestion[] = [
  // Gouvernance
  { id: 'gov-1', domain: 'governance', domainIcon: 'ri-government-line', question: 'Votre Conseil d\'Administration compte-t-il au moins 1/3 d\'administrateurs indépendants ?', description: 'L\'indépendance du CA est une exigence clé de la Circulaire BCEAO 01/2017.', options: [{ value: 5, label: 'Oui, > 1/3 indépendants', detail: 'Conformité optimale' }, { value: 3, label: 'Partiellement (1-2 indépendants)', detail: 'Conformité partielle' }, { value: 1, label: 'Aucun administrateur indépendant', detail: 'Non-conformité' }, { value: 0, label: 'Pas de CA formalisé', detail: 'Gap critique' }] },
  { id: 'gov-2', domain: 'governance', domainIcon: 'ri-government-line', question: 'Disposez-vous de comités spécialisés (Audit, Risques, Rémunération) fonctionnels ?', description: 'Les comités spécialisés sont obligatoires pour les établissements bancaires et recommandés pour les SFD.', options: [{ value: 5, label: '3 comités, réunions trimestrielles', detail: 'Conformité optimale' }, { value: 3, label: '1-2 comités opérationnels', detail: 'Conformité partielle' }, { value: 1, label: 'Comités créés mais non opérationnels', detail: 'Non-conformité' }, { value: 0, label: 'Aucun comité spécialisé', detail: 'Gap critique' }] },
  { id: 'gov-3', domain: 'governance', domainIcon: 'ri-government-line', question: 'Fréquence des réunions du Conseil d\'Administration et taux de présence ?', description: 'Un CA qui se réunit régulièrement avec un bon taux de présence est un indicateur fort de gouvernance.', options: [{ value: 5, label: '≥ 4 réunions/an, présence > 80%', detail: 'Conformité optimale' }, { value: 4, label: '≥ 4 réunions/an, présence 60-80%', detail: 'Bonne pratique' }, { value: 2, label: '2-3 réunions/an', detail: 'Conformité minimale' }, { value: 0, label: '< 2 réunions/an ou absence non justifiée', detail: 'Gap critique' }] },
  { id: 'gov-4', domain: 'governance', domainIcon: 'ri-government-line', question: 'Avez-vous mis en place un dispositif de prévention des conflits d\'intérêts (registre, déclarations) ?', description: 'Exigence renforcée par la Circulaire BCEAO et le Règlement COBAC.', options: [{ value: 5, label: 'Registre + déclarations annuelles obligatoires', detail: 'Conformité optimale' }, { value: 3, label: 'Politique écrite mais application partielle', detail: 'Conformité partielle' }, { value: 1, label: 'Politique informelle uniquement', detail: 'Insuffisant' }, { value: 0, label: 'Aucun dispositif formalisé', detail: 'Gap critique' }] },

  // Conformité LBC/FT
  { id: 'cft-1', domain: 'compliance', domainIcon: 'ri-shield-check-line', question: 'Disposez-vous d\'un Responsable Conformité LBC/FT désigné auprès du régulateur ?', description: 'La nomination d\'un Compliance Officer est obligatoire (GAFI R18, BCEAO, COBAC).', options: [{ value: 5, label: 'Oui, déclaré + expérience ≥ 5 ans', detail: 'Conformité optimale' }, { value: 3, label: 'Oui, déclaré mais expérience < 5 ans', detail: 'Conformité acceptable' }, { value: 1, label: 'Non déclaré / Fonction cumulée', detail: 'Non-conformité' }, { value: 0, label: 'Pas de Responsable Conformité', detail: 'Gap critique' }] },
  { id: 'cft-2', domain: 'compliance', domainIcon: 'ri-shield-check-line', question: 'Votre dispositif KYC couvre-t-il l\'identification, la vérification et la mise à jour périodique ?', description: 'Le KYC est le socle du dispositif LBC/FT.', options: [{ value: 5, label: 'KYC complet + révision annuelle systématique', detail: 'Conformité optimale' }, { value: 3, label: 'KYC à l\'entrée en relation, révision irrégulière', detail: 'Conformité partielle' }, { value: 1, label: 'KYC basique, pas de mise à jour', detail: 'Insuffisant' }, { value: 0, label: 'Pas de procédure KYC formalisée', detail: 'Gap critique' }] },
  { id: 'cft-3', domain: 'compliance', domainIcon: 'ri-shield-check-line', question: 'Avez-vous réalisé une cartographie des risques LBC/FT dans les 12 derniers mois ?', description: 'La cartographie des risques est une obligation réglementaire (GAFI R1, BCEAO, COBAC).', options: [{ value: 5, label: 'Oui, documentée + mise à jour annuelle', detail: 'Conformité optimale' }, { value: 3, label: 'Oui, réalisée il y a 12-24 mois', detail: 'Conformité partielle' }, { value: 1, label: 'En cours de réalisation', detail: 'En progression' }, { value: 0, label: 'Aucune cartographie réalisée', detail: 'Gap critique' }] },
  { id: 'cft-4', domain: 'compliance', domainIcon: 'ri-shield-check-line', question: 'Nombre de Déclarations de Soupçons (DS) transmises à la CRF dans les 12 derniers mois ?', description: 'L\'absence totale de DS peut être un signal d\'alerte pour le régulateur.', options: [{ value: 5, label: 'DS régulières, seuils de déclenchement automatisés', detail: 'Conformité optimale' }, { value: 3, label: 'Quelques DS transmises', detail: 'Conformité acceptable' }, { value: 1, label: 'Aucune DS transmise', detail: 'Risque de non-détection' }, { value: 0, label: 'Pas de processus DS en place', detail: 'Gap critique' }] },

  // Prudentiel
  { id: 'pru-1', domain: 'prudential', domainIcon: 'ri-funds-line', question: 'Votre ratio de solvabilité est-il supérieur au minimum réglementaire (8% Bâle / seuil BCEAO) ?', description: 'Le ratio de solvabilité est l\'indicateur central de santé financière.', options: [{ value: 5, label: '> 12% (confortablement au-dessus)', detail: 'Excellente santé financière' }, { value: 4, label: '10-12%', detail: 'Bonne santé financière' }, { value: 2, label: '8-10% (proche du minimum)', detail: 'Surveillance requise' }, { value: 0, label: '< 8% (sous le minimum)', detail: 'Gap critique' }] },
  { id: 'pru-2', domain: 'prudential', domainIcon: 'ri-funds-line', question: 'Disposez-vous d\'un processus ALM (Asset-Liability Management) formalisé ?', description: 'La gestion actif-passif est essentielle pour la stabilité financière.', options: [{ value: 5, label: 'ALM complet, comité ALCO trimestriel', detail: 'Conformité optimale' }, { value: 3, label: 'ALM partiel, suivi semestriel', detail: 'Conformité partielle' }, { value: 1, label: 'Suivi informel uniquement', detail: 'Insuffisant' }, { value: 0, label: 'Pas de processus ALM', detail: 'Gap critique' }] },
  { id: 'pru-3', domain: 'prudential', domainIcon: 'ri-funds-line', question: 'Votre taux de provisionnement des créances douteuses est-il conforme aux normes IFRS 9 / BCEAO ?', description: 'Le provisionnement adéquat protège contre les pertes de crédit.', options: [{ value: 5, label: 'Provisionnement > 100% des exigences', detail: 'Conformité optimale' }, { value: 3, label: 'Provisionnement conforme (95-100%)', detail: 'Conformité acceptable' }, { value: 1, label: 'Provisionnement < 95% des exigences', detail: 'Risque de sous-provisionnement' }, { value: 0, label: 'Pas de calcul IFRS 9', detail: 'Gap critique' }] },

  // Risques
  { id: 'rsk-1', domain: 'risk', domainIcon: 'ri-radar-line', question: 'Disposez-vous d\'une cartographie globale des risques (opérationnels, crédit, marché, conformité) ?', description: 'La cartographie des risques est le socle de l\'ERM.', options: [{ value: 5, label: 'Cartographie complète, mise à jour annuelle', detail: 'Conformité optimale' }, { value: 3, label: 'Cartographie partielle (1-2 domaines manquants)', detail: 'Conformité partielle' }, { value: 1, label: 'En cours d\'élaboration', detail: 'En progression' }, { value: 0, label: 'Pas de cartographie des risques', detail: 'Gap critique' }] },
  { id: 'rsk-2', domain: 'risk', domainIcon: 'ri-radar-line', question: 'Avez-vous testé votre Plan de Continuité d\'Activité (PCA) dans les 12 derniers mois ?', description: 'Le PCA doit être testé régulièrement pour garantir son efficacité.', options: [{ value: 5, label: 'Test complet réalisé + compte-rendu au CA', detail: 'Conformité optimale' }, { value: 3, label: 'Test partiel (> 12 mois)', detail: 'Conformité partielle' }, { value: 1, label: 'PCA documenté mais jamais testé', detail: 'Non vérifié' }, { value: 0, label: 'Pas de PCA formalisé', detail: 'Gap critique' }] },
  { id: 'rsk-3', domain: 'risk', domainIcon: 'ri-radar-line', question: 'Disposez-vous d\'une fonction Audit Interne indépendante ?', description: 'L\'audit interne est le 3ème niveau de contrôle (COSO).', options: [{ value: 5, label: 'Fonction dédiée, reporting direct au CA', detail: 'Conformité optimale' }, { value: 3, label: 'Fonction externalisée, reporting régulier', detail: 'Conformité acceptable' }, { value: 1, label: 'Pas de fonction Audit Interne', detail: 'Non-conformité' }, { value: 0, label: 'Aucun dispositif d\'audit', detail: 'Gap critique' }] },

  // Digital
  { id: 'dig-1', domain: 'digital', domainIcon: 'ri-computer-line', question: 'Avez-vous réalisé un audit de cybersécurité (pentest, vulnérabilités) dans les 12 derniers mois ?', description: 'Les audits de sécurité réguliers sont une exigence croissante (Directive COBAC 2027).', options: [{ value: 5, label: 'Audit indépendant complet + plan de remédiation', detail: 'Conformité optimale' }, { value: 3, label: 'Audit partiel ou > 12 mois', detail: 'Conformité partielle' }, { value: 1, label: 'Pas d\'audit récent', detail: 'Risque élevé' }, { value: 0, label: 'Aucun audit cybersécurité réalisé', detail: 'Gap critique' }] },
  { id: 'dig-2', domain: 'digital', domainIcon: 'ri-computer-line', question: 'Disposez-vous d\'un DPO (Délégué à la Protection des Données) désigné ?', description: 'Obligation légale dans la plupart des juridictions UEMOA/CEMAC.', options: [{ value: 5, label: 'DPO désigné + registre des traitements à jour', detail: 'Conformité optimale' }, { value: 3, label: 'DPO désigné, registre en cours', detail: 'Conformité partielle' }, { value: 1, label: 'Pas de DPO désigné', detail: 'Non-conformité' }, { value: 0, label: 'Aucune démarche protection des données', detail: 'Gap critique' }] },
  { id: 'dig-3', domain: 'digital', domainIcon: 'ri-computer-line', question: 'Votre Core Banking System est-il à jour et maintenu ?', description: 'Un SI obsolète présente des risques opérationnels et de sécurité majeurs.', options: [{ value: 5, label: 'CBS récent (< 5 ans), maintenance active', detail: 'Conformité optimale' }, { value: 3, label: 'CBS 5-10 ans, maintenance assurée', detail: 'Conformité acceptable' }, { value: 1, label: 'CBS > 10 ans, maintenance limitée', detail: 'Risque opérationnel' }, { value: 0, label: 'Pas de CBS ou système obsolète', detail: 'Gap critique' }] },

  // ESG
  { id: 'esg-1', domain: 'esg', domainIcon: 'ri-leaf-line', question: 'Avez-vous initié un reporting ESG aligné sur les standards ISSB ou GRI ?', description: 'Le reporting ESG devient obligatoire dans plusieurs juridictions.', options: [{ value: 5, label: 'Rapport ESG publié, aligné ISSB/GRI', detail: 'Conformité optimale' }, { value: 3, label: 'Reporting ESG partiel ou en cours', detail: 'Conformité partielle' }, { value: 1, label: 'Pas de reporting ESG', detail: 'En retard' }, { value: 0, label: 'Aucune démarche ESG initiée', detail: 'Gap critique' }] },
  { id: 'esg-2', domain: 'esg', domainIcon: 'ri-leaf-line', question: 'Avez-vous réalisé une analyse de l\'exposition de votre portefeuille aux risques climatiques ?', description: 'Les stress tests climatiques sont requis par le NGFS et recommandés par la BCEAO.', options: [{ value: 5, label: 'Analyse complète + plan de transition', detail: 'Conformité optimale' }, { value: 3, label: 'Analyse partielle ou en cours', detail: 'Conformité partielle' }, { value: 1, label: 'Pas d\'analyse risques climatiques', detail: 'En retard' }, { value: 0, label: 'Aucune démarche', detail: 'Gap critique' }] },
];

export function calculateComplianceScore(answers: Record<string, number>): ComplianceScoreResult {
  const domainScores = complianceDomains.map((domain) => {
    const domainQuestions = complianceQuestions.filter((q) => q.domain === domain.id);
    const scored = domainQuestions.reduce((sum, q) => sum + (answers[q.id] || 0), 0);
    const percentage = Math.round((scored / domain.maxScore) * 100);
    let status: string;
    let recommendations: string[];
    if (percentage >= 80) {
      status = 'Excellent';
      recommendations = ['Maintenir le niveau de conformité', 'Anticiper les évolutions réglementaires 2027'];
    } else if (percentage >= 60) {
      status = 'Bon';
      recommendations = ['Renforcer les points faibles identifiés', `Plan d'action 90 jours recommandé`];
    } else if (percentage >= 40) {
      status = 'À améliorer';
      recommendations = [`Audit détaillé ${domain.name} prioritaire`, 'Mise en conformité sous 6 mois recommandée'];
    } else {
      status = 'Critique';
      recommendations = [`Refonte urgente du dispositif ${domain.name}`, 'Accompagnement expert KHEPRA fortement recommandé'];
    }
    return { domainId: domain.id, domainName: domain.name, icon: domain.icon, score: scored, maxScore: domain.maxScore, percentage, status, recommendations };
  });

  const totalMax = complianceDomains.reduce((s, d) => s + d.maxScore, 0);
  const totalScored = domainScores.reduce((s, d) => s + d.score, 0);
  const overallScore = Math.round((totalScored / totalMax) * 100);

  let grade: string;
  let gradeLabel: string;
  let gradeDescription: string;
  let urgencyLevel: string;
  let urgencyDescription: string;
  let benchmarkComparison: string;

  if (overallScore >= 85) {
    grade = 'A';
    gradeLabel = 'Conformité Excellence';
    gradeDescription = 'Votre institution affiche un niveau de conformité réglementaire élevé, comparable aux grandes banques de la place. Maintien et anticipation requis.';
    urgencyLevel = 'Faible';
    urgencyDescription = 'Pas d\'urgence immédiate. Focus sur l\'anticipation réglementaire et le maintien du niveau.';
    benchmarkComparison = 'Top 15% des institutions UEMOA/CEMAC';
  } else if (overallScore >= 70) {
    grade = 'B';
    gradeLabel = 'Conformité Solide';
    gradeDescription = 'Bon niveau global avec des axes d\'amélioration identifiés. Votre institution est sur la bonne trajectoire.';
    urgencyLevel = 'Modérée';
    urgencyDescription = 'Plan d\'action 90 jours recommandé sur les axes faibles.';
    benchmarkComparison = 'Top 40% des institutions UEMOA/CEMAC';
  } else if (overallScore >= 55) {
    grade = 'C';
    gradeLabel = 'Conformité Partielle';
    gradeDescription = 'Des lacunes significatives existent dans plusieurs domaines. Une mise à niveau structurée est nécessaire.';
    urgencyLevel = 'Élevée';
    urgencyDescription = 'Mise en conformité prioritaire sous 6 mois. Risque de sanctions ou d\'observations du régulateur.';
    benchmarkComparison = 'Médiane des institutions UEMOA/CEMAC';
  } else if (overallScore >= 40) {
    grade = 'D';
    gradeLabel = 'Conformité Insuffisante';
    gradeDescription = 'Plusieurs domaines sont en situation de non-conformité critique. Une action corrective urgente est impérative.';
    urgencyLevel = 'Très Élevée';
    urgencyDescription = 'Intervention urgente requise. Risque de mise sous surveillance ou de sanctions réglementaires.';
    benchmarkComparison = 'Quartile inférieur — Risque réglementaire élevé';
  } else {
    grade = 'E';
    gradeLabel = 'Conformité Critique';
    gradeDescription = 'Votre institution présente des défaillances systémiques de conformité. Une refonte complète est nécessaire.';
    urgencyLevel = 'Immédiate';
    urgencyDescription = 'Danger immédiat : risque de retrait d\'agrément, sanctions lourdes. Contactez KHEPRA EXPERTS sans délai.';
    benchmarkComparison = 'Dernier décile — Situation d\'urgence réglementaire';
  }

  const domainPercentages = domainScores.map((d) => ({ ...d, percentage: d.percentage }));
  const sortedAsc = [...domainPercentages].sort((a, b) => a.percentage - b.percentage);
  const sortedDesc = [...domainPercentages].sort((a, b) => b.percentage - a.percentage);

  const top3Strengths = sortedDesc.slice(0, 3).map((d) => `${d.domainName} (${d.percentage}%)`);
  const top3Weaknesses = sortedAsc.slice(0, 3).map((d) => `${d.domainName} (${d.percentage}%)`);

  const nextSteps: string[] = [];
  if (overallScore < 70) {
    nextSteps.push('Réserver un Diagnostic Flash Conformité (30 min, gratuit)');
    nextSteps.push('Télécharger le Rapport Complet KHEPRA Compliance Score™');
    nextSteps.push('Planifier un entretien stratégique avec un Partner KHEPRA');
  } else {
    nextSteps.push('Télécharger le Rapport Complet KHEPRA Compliance Score™');
    nextSteps.push('Recevoir le benchmarking sectoriel détaillé');
    nextSteps.push('Explorer les services KHEPRA pour anticiper les évolutions 2027');
  }

  return {
    overallScore,
    grade,
    gradeLabel,
    gradeDescription,
    domainScores,
    top3Strengths,
    top3Weaknesses,
    urgencyLevel,
    urgencyDescription,
    nextSteps,
    estimatedTimeline: overallScore >= 70 ? 'Maintien + anticipation' : overallScore >= 55 ? '6 mois' : '3-6 mois (urgent)',
    benchmarkComparison,
  };
}

export const complianceScoreStats = {
  totalEvaluations: 1247,
  averageScore: 64,
  gradeDistribution: { A: 12, B: 28, C: 35, D: 18, E: 7 },
  industries: ['Banque', 'Microfinance/SFD', 'FinTech', 'Assurance', 'Établissement de Paiement', 'Autre'],
  topJurisdictions: ['UEMOA', 'CEMAC', 'OHADA'],
  avgCompletionTime: '8 minutes',
};