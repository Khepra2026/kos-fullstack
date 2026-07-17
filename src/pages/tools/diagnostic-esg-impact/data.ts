export interface ESGPillar {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  weight: number;
  questions: ESGQuestion[];
}

export interface ESGQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: ESGOption[];
}

export interface ESGOption {
  value: number;
  labelFr: string;
  labelEn: string;
}

export const ESG_PILLARS: ESGPillar[] = [
  {
    id: 'environnement',
    titleFr: 'Environnement',
    titleEn: 'Environment',
    descriptionFr: 'Empreinte carbone, gestion des ressources, biodiversité et économie circulaire',
    descriptionEn: 'Carbon footprint, resource management, biodiversity and circular economy',
    icon: 'ri-leaf-line',
    color: '#059669',
    weight: 25,
    questions: [
      {
        id: 'env-1',
        questionFr: 'Votre organisation mesure-t-elle et réduit-elle son empreinte carbone ?',
        questionEn: 'Does your organization measure and reduce its carbon footprint?',
        options: [
          { value: 0, labelFr: 'Aucune mesure ni réduction', labelEn: 'No measurement or reduction' },
          { value: 25, labelFr: 'Quelques actions ponctuelles (recyclage, économie d\'énergie)', labelEn: 'Some occasional actions (recycling, energy saving)' },
          { value: 50, labelFr: 'Bilan carbone réalisé avec plan de réduction', labelEn: 'Carbon assessment done with reduction plan' },
          { value: 75, labelFr: 'Objectifs de réduction chiffrés et suivis annuellement', labelEn: 'Quantified reduction targets tracked annually' },
          { value: 100, labelFr: 'Neutralité carbone visée avec compensation et innovation verte', labelEn: 'Carbon neutrality targeted with compensation and green innovation' },
        ],
      },
      {
        id: 'env-2',
        questionFr: 'Comment gérez-vous la consommation d\'eau, d\'énergie et les déchets ?',
        questionEn: 'How do you manage water, energy consumption and waste?',
        options: [
          { value: 0, labelFr: 'Aucune gestion spécifique', labelEn: 'No specific management' },
          { value: 25, labelFr: 'Sensibilisation informelle des collaborateurs', labelEn: 'Informal employee awareness' },
          { value: 50, labelFr: 'Suivi des consommations et tri sélectif en place', labelEn: 'Consumption tracking and selective sorting in place' },
          { value: 75, labelFr: 'Objectifs de réduction avec reporting régulier', labelEn: 'Reduction targets with regular reporting' },
          { value: 100, labelFr: 'Certification ISO 14001 ou équivalent, économie circulaire intégrée', labelEn: 'ISO 14001 certification or equivalent, integrated circular economy' },
        ],
      },
      {
        id: 'env-3',
        questionFr: 'Intégrez-vous les critères environnementaux dans votre chaîne de valeur ?',
        questionEn: 'Do you integrate environmental criteria into your value chain?',
        options: [
          { value: 0, labelFr: 'Aucun critère environnemental', labelEn: 'No environmental criteria' },
          { value: 25, labelFr: 'Quelques fournisseurs évalués ponctuellement', labelEn: 'Some suppliers evaluated occasionally' },
          { value: 50, labelFr: 'Charte fournisseurs avec clauses environnementales', labelEn: 'Supplier charter with environmental clauses' },
          { value: 75, labelFr: 'Audit environnemental des fournisseurs stratégiques', labelEn: 'Environmental audit of strategic suppliers' },
          { value: 100, labelFr: 'Supply chain 100% traçée avec score ESG fournisseurs', labelEn: '100% traceable supply chain with supplier ESG score' },
        ],
      },
    ],
  },
  {
    id: 'social',
    titleFr: 'Social & Droits Humains',
    titleEn: 'Social & Human Rights',
    descriptionFr: 'Droits des travailleurs, diversité, inclusion, santé-sécurité et impact communautaire',
    descriptionEn: 'Workers rights, diversity, inclusion, health-safety and community impact',
    icon: 'ri-group-line',
    color: '#d97706',
    weight: 25,
    questions: [
      {
        id: 'soc-1',
        questionFr: 'Votre organisation respecte-t-elle et promeut-elle les droits des travailleurs ?',
        questionEn: 'Does your organization respect and promote workers rights?',
        options: [
          { value: 0, labelFr: 'Conformité légale minimale uniquement', labelEn: 'Minimum legal compliance only' },
          { value: 25, labelFr: 'Charte éthique basique affichée', labelEn: 'Basic ethics charter displayed' },
          { value: 50, labelFr: 'Code de conduite formalisé et signé par tous', labelEn: 'Formalized code of conduct signed by all' },
          { value: 75, labelFr: 'Due diligence droits humains avec reporting annuel', labelEn: 'Human rights due diligence with annual reporting' },
          { value: 100, labelFr: 'Certification SA8000 ou équivalent, audits tiers réguliers', labelEn: 'SA8000 certification or equivalent, regular third-party audits' },
        ],
      },
      {
        id: 'soc-2',
        questionFr: 'Comment promevez-vous la diversité, l\'équité et l\'inclusion (DEI) ?',
        questionEn: 'How do you promote diversity, equity and inclusion (DEI)?',
        options: [
          { value: 0, labelFr: 'Aucune politique DEI', labelEn: 'No DEI policy' },
          { value: 25, labelFr: 'Engagement verbal de la direction', labelEn: 'Verbal management commitment' },
          { value: 50, labelFr: 'Politique DEI écrite et indicateurs de suivi', labelEn: 'Written DEI policy and tracking indicators' },
          { value: 75, labelFr: 'Programmes actifs (mentoring, recrutement diversifié, formation)', labelEn: 'Active programs (mentoring, diverse recruitment, training)' },
          { value: 100, labelFr: 'DEI intégrée à la stratégie avec objectifs chiffrés et comité dédié', labelEn: 'DEI integrated into strategy with quantified targets and dedicated committee' },
        ],
      },
      {
        id: 'soc-3',
        questionFr: 'Quel est votre impact social sur les communautés locales ?',
        questionEn: 'What is your social impact on local communities?',
        options: [
          { value: 0, labelFr: 'Aucun programme social communautaire', labelEn: 'No community social program' },
          { value: 25, labelFr: 'Donations ou sponsoring ponctuels', labelEn: 'Occasional donations or sponsorships' },
          { value: 50, labelFr: 'Programme RSE avec partenariats locaux', labelEn: 'CSR program with local partnerships' },
          { value: 75, labelFr: 'Fondation ou fonds de développement communautaire', labelEn: 'Foundation or community development fund' },
          { value: 100, labelFr: 'Impact mesuré et rapporté (emploi local, chaîne de valeur inclusive)', labelEn: 'Measured and reported impact (local employment, inclusive value chain)' },
        ],
      },
    ],
  },
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Éthique',
    titleEn: 'Governance & Ethics',
    descriptionFr: 'Transparence, lutte anti-corruption, conformité et gouvernance responsable',
    descriptionEn: 'Transparency, anti-corruption, compliance and responsible governance',
    icon: 'ri-shield-check-line',
    color: '#0f766e',
    weight: 25,
    questions: [
      {
        id: 'gov-1',
        questionFr: 'Votre gouvernance est-elle transparente et responsable ?',
        questionEn: 'Is your governance transparent and responsible?',
        options: [
          { value: 0, labelFr: 'Gouvernance opaque, sans reporting externe', labelEn: 'Opaque governance, no external reporting' },
          { value: 25, labelFr: 'Rapport annuel basique avec chiffres clés', labelEn: 'Basic annual report with key figures' },
          { value: 50, labelFr: 'Reporting ESG partiel avec indicateurs clés', labelEn: 'Partial ESG reporting with key indicators' },
          { value: 75, labelFr: 'Reporting ESG complet selon standards (GRI, SASB, TCFD)', labelEn: 'Complete ESG reporting per standards (GRI, SASB, TCFD)' },
          { value: 100, labelFr: 'Reporting intégré, audité par tiers, accessible au public', labelEn: 'Integrated reporting, third-party audited, publicly available' },
        ],
      },
      {
        id: 'gov-2',
        questionFr: 'Disposez-vous d\'un dispositif de lutte contre la corruption ?',
        questionEn: 'Do you have an anti-corruption mechanism?',
        options: [
          { value: 0, labelFr: 'Aucun dispositif anti-corruption', labelEn: 'No anti-corruption mechanism' },
          { value: 25, labelFr: 'Code d\'éthique mentionnant la corruption', labelEn: 'Ethics code mentioning corruption' },
          { value: 50, labelFr: 'Politique anti-corruption avec formation des collaborateurs', labelEn: 'Anti-corruption policy with employee training' },
          { value: 75, labelFr: 'Due diligence anti-corruption sur fournisseurs et partenaires', labelEn: 'Anti-corruption due diligence on suppliers and partners' },
          { value: 100, labelFr: 'Programme complet avec whistleblowing, audits et certification', labelEn: 'Complete program with whistleblowing, audits and certification' },
        ],
      },
      {
        id: 'gov-3',
        questionFr: 'Votre conseil d\'administration / direction est-il diversifié et indépendant ?',
        questionEn: 'Is your board of directors / management diversified and independent?',
        options: [
          { value: 0, labelFr: 'Direction monolithique sans diversité', labelEn: 'Monolithic management without diversity' },
          { value: 25, labelFr: 'Quelques femmes ou jeunes dans l\'équipe dirigeante', labelEn: 'Some women or young people in the management team' },
          { value: 50, labelFr: 'Politique de diversité au conseil avec objectifs', labelEn: 'Board diversity policy with targets' },
          { value: 75, labelFr: 'Conseil diversifié avec membres indépendants et comités spécialisés', labelEn: 'Diversified board with independent members and specialized committees' },
          { value: 100, labelFr: 'Gouvernance exemplaire : parité, indépendance, rotation, évaluation', labelEn: 'Exemplary governance: parity, independence, rotation, evaluation' },
        ],
      },
    ],
  },
  {
    id: 'impact',
    titleFr: 'Impact Social Mesurable',
    titleEn: 'Measurable Social Impact',
    descriptionFr: 'Emploi local, chaîne de valeur inclusive, innovation sociale et reporting d\'impact',
    descriptionEn: 'Local employment, inclusive value chain, social innovation and impact reporting',
    icon: 'ri-heart-pulse-line',
    color: '#db2777',
    weight: 25,
    questions: [
      {
        id: 'imp-1',
        questionFr: 'Mesurez-vous et maximisez-vous l\'emploi local et la création de valeur ?',
        questionEn: 'Do you measure and maximize local employment and value creation?',
        options: [
          { value: 0, labelFr: 'Aucun suivi de l\'emploi local', labelEn: 'No local employment tracking' },
          { value: 25, labelFr: 'Recrutement local privilégié sans objectif chiffré', labelEn: 'Preferred local recruitment without quantified target' },
          { value: 50, labelFr: 'Ratio emploi local suivi avec objectif de 70%', labelEn: 'Local employment ratio tracked with 70% target' },
          { value: 75, labelFr: 'Politique d\'achat local et partenariats avec PME locales', labelEn: 'Local purchasing policy and partnerships with local SMEs' },
          { value: 100, labelFr: 'Impact économique local mesuré et rapporté (emplois, revenus, taxes)', labelEn: 'Local economic impact measured and reported (jobs, income, taxes)' },
        ],
      },
      {
        id: 'imp-2',
        questionFr: 'Votre chaîne de valeur favorise-t-elle l\'inclusion économique ?',
        questionEn: 'Does your value chain promote economic inclusion?',
        options: [
          { value: 0, labelFr: 'Aucune attention à l\'inclusion', labelEn: 'No attention to inclusion' },
          { value: 25, labelFr: 'Quelques fournisseurs locaux ou artisans', labelEn: 'Some local suppliers or artisans' },
          { value: 50, labelFr: 'Programme d\'inclusion avec micro-entrepreneurs et coopératives', labelEn: 'Inclusion program with micro-entrepreneurs and cooperatives' },
          { value: 75, labelFr: 'Chaîne de valeur inclusive formalisée avec indicateurs', labelEn: 'Formalized inclusive value chain with indicators' },
          { value: 100, labelFr: 'Modèle d\'affaires à impact : création de valeur partagée mesurée', labelEn: 'Impact business model: measured shared value creation' },
        ],
      },
      {
        id: 'imp-3',
        questionFr: 'Développez-vous des innovations à impact social ou environnemental ?',
        questionEn: 'Do you develop social or environmental impact innovations?',
        options: [
          { value: 0, labelFr: 'Aucune innovation à impact', labelEn: 'No impact innovation' },
          { value: 25, labelFr: 'Quelques produits/services à vocation sociale', labelEn: 'Some products/services with social purpose' },
          { value: 50, labelFr: 'Programme d\'innovation sociale avec budget dédié', labelEn: 'Social innovation program with dedicated budget' },
          { value: 75, labelFr: 'Produits/services à impact mesuré et scalabilité prouvée', labelEn: 'Impact products/services with measured and proven scalability' },
          { value: 100, labelFr: 'Modèle d\'affaires d\'impact reconnu, brevets, récompenses', labelEn: 'Recognized impact business model, patents, awards' },
        ],
      },
    ],
  },
];

export const ESG_TOTAL_QUESTIONS = ESG_PILLARS.reduce((sum, p) => sum + p.questions.length, 0);

export function getESGScoreColor(score: number): string {
  if (score < 30) return '#dc2626';
  if (score < 50) return '#d97706';
  if (score < 70) return '#d97706';
  if (score < 85) return '#059669';
  return '#0f766e';
}

export function getESGScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 30) return isFr ? 'Niveau Initiation' : 'Initiation Level';
  if (score < 50) return isFr ? 'Niveau Émergent' : 'Emerging Level';
  if (score < 70) return isFr ? 'Niveau Structuré' : 'Structured Level';
  if (score < 85) return isFr ? 'Niveau Avancé' : 'Advanced Level';
  return isFr ? 'Niveau d\'Excellence ESG' : 'ESG Excellence Level';
}

export function getESGMaturityLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 30) return isFr ? 'Initiation' : 'Initiation';
  if (score < 50) return isFr ? 'Émergent' : 'Emerging';
  if (score < 70) return isFr ? 'Structuré' : 'Structured';
  if (score < 85) return isFr ? 'Avancé' : 'Advanced';
  return isFr ? 'Excellence' : 'Excellence';
}

export function getESGReadinessIndicator(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score < 30) {
    return isFr
      ? 'Votre démarche ESG est à ses débuts. Vous risquez d\'être pénalisé par les investisseurs, les régulateurs et les partenaires commerciaux.'
      : 'Your ESG approach is in its infancy. You risk being penalized by investors, regulators and business partners.';
  }
  if (score < 50) {
    return isFr
      ? 'Vous avez des bases ESG mais elles ne sont pas encore structurées. Des progrès rapides sont possibles avec un plan d\'action ciblé.'
      : 'You have ESG foundations but they are not yet structured. Rapid progress is possible with a targeted action plan.';
  }
  if (score < 70) {
    return isFr
      ? 'Votre démarche ESG est structurée et crédible. Vous pouvez maintenant viser la certification et l\'intégration aux standards internationaux.'
      : 'Your ESG approach is structured and credible. You can now aim for certification and integration with international standards.';
  }
  if (score < 85) {
    return isFr
      ? 'Votre performance ESG est avancée. Vous êtes prêt pour le reporting intégré et l\'attractivité auprès des investisseurs d\'impact.'
      : 'Your ESG performance is advanced. You are ready for integrated reporting and attractiveness to impact investors.';
  }
  return isFr
    ? 'Votre organisation est un modèle ESG en Afrique. Votre leadership peut inspirer l\'écosystème et attirer les meilleurs partenariats.'
    : 'Your organization is an ESG model in Africa. Your leadership can inspire the ecosystem and attract the best partnerships.';
}

export function getESGBenchmarkPosition(score: number, lang: string): { label: string; color: string } {
  const isFr = !lang.startsWith('en');
  if (score < 30) return { label: isFr ? 'En retard sur le marché' : 'Behind the market', color: '#dc2626' };
  if (score < 50) return { label: isFr ? 'Dans la moyenne basse' : 'Below average', color: '#d97706' };
  if (score < 70) return { label: isFr ? 'Dans la moyenne' : 'Average', color: '#d97706' };
  if (score < 85) return { label: isFr ? 'Performante ESG' : 'ESG performing', color: '#059669' };
  return { label: isFr ? 'Leader ESG' : 'ESG leader', color: '#0f766e' };
}

export function getESGRisks(score: number, perAxis: Record<string, number>, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  if (score < 30) {
    risks.push(isFr
      ? 'RISQUE MAJEUR : Votre organisation est exposée à des risques ESG significatifs. Les investisseurs et partenaires commerciaux peuvent vous pénaliser.'
      : 'MAJOR RISK: Your organization is exposed to significant ESG risks. Investors and business partners may penalize you.');
  }

  Object.entries(perAxis).forEach(([axisId, axisScore]) => {
    const pillar = ESG_PILLARS.find((p) => p.id === axisId);
    if (!pillar) return;

    if (axisScore < 30) {
      if (axisId === 'environnement') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Absence de gestion environnementale. Risque réglementaire croissant et perte d'attractivité.`
          : `CRITICAL RISK — ${pillar.titleEn}: No environmental management. Increasing regulatory risk and loss of attractiveness.`);
      } else if (axisId === 'social') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Droits des travailleurs et inclusion non maîtrisés. Risque de conflits sociaux et d'image négative.`
          : `CRITICAL RISK — ${pillar.titleEn}: Workers rights and inclusion not controlled. Risk of social conflicts and negative image.`);
      } else if (axisId === 'gouvernance') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Gouvernance opaque et corruption non contrôlée. Risque juridique et financier majeur.`
          : `CRITICAL RISK — ${pillar.titleEn}: Opaque governance and uncontrolled corruption. Major legal and financial risk.`);
      } else if (axisId === 'impact') {
        risks.push(isFr
          ? `RISQUE CRITIQUE — ${pillar.titleFr} : Aucun impact social mesuré. Perte de légitimité auprès des communautés et des parties prenantes.`
          : `CRITICAL RISK — ${pillar.titleEn}: No measured social impact. Loss of legitimacy with communities and stakeholders.`);
      }
    } else if (axisScore < 50) {
      risks.push(isFr
        ? `RISQUE ÉLEVÉ — ${pillar.titleFr} (${axisScore}/100) : Des lacunes importantes nécessitent une attention immédiate.`
        : `HIGH RISK — ${pillar.titleEn} (${axisScore}/100): Significant gaps require immediate attention.`);
    }
  });

  if (risks.length === 0) {
    risks.push(isFr
      ? 'Aucun risque critique identifié. Votre démarche ESG est globalement saine. Concentrez-vous sur l\'optimisation continue.'
      : 'No critical risks identified. Your ESG approach is generally healthy. Focus on continuous optimization.');
  }

  return risks;
}

export function getESGRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; items: string[] }[] = [];

  if (globalScore < 30) {
    recs.push({
      title: isFr ? 'URGENCE : Lancer une démarche ESG fondamentale' : 'URGENT: Launch a fundamental ESG approach',
      items: isFr
        ? [
            'Nommer un responsable ESG ou faire appel à un consultant externe',
            'Réaliser un diagnostic ESG rapide pour identifier les priorités',
            'Rédiger une charte éthique et un code de conduite minimal',
            'Mettre en place un suivi basique des consommations (eau, énergie, déchets)',
          ]
        : [
            'Appoint an ESG manager or hire an external consultant',
            'Conduct a rapid ESG diagnostic to identify priorities',
            'Write an ethics charter and a minimum code of conduct',
            'Set up basic consumption tracking (water, energy, waste)',
          ],
    });
  }

  Object.entries(perAxis).forEach(([axisId, axisScore]) => {
    if (axisScore >= 70) return;
    const pillar = ESG_PILLARS.find((p) => p.id === axisId);
    if (!pillar) return;

    if (axisId === 'environnement' && axisScore < 70) {
      recs.push({
        title: isFr ? `Renforcer la dimension environnementale (${axisScore}/100)` : `Strengthen environmental dimension (${axisScore}/100)`,
        items: isFr
          ? [
              'Réaliser un bilan carbone (scope 1, 2 et 3 si possible)',
              'Établir un plan de réduction des émissions avec objectifs chiffrés',
              'Mettre en place un système de gestion des déchets et de tri sélectif',
              'Intégrer des clauses environnementales dans les contrats fournisseurs',
            ]
          : [
              'Conduct a carbon assessment (scope 1, 2 and 3 if possible)',
              'Establish an emission reduction plan with quantified targets',
              'Set up a waste management and selective sorting system',
              'Integrate environmental clauses into supplier contracts',
            ],
      });
    }

    if (axisId === 'social' && axisScore < 70) {
      recs.push({
        title: isFr ? `Renforcer la dimension sociale (${axisScore}/100)` : `Strengthen social dimension (${axisScore}/100)`,
        items: isFr
          ? [
              'Formaliser une politique de diversité, équité et inclusion (DEI)',
              'Mettre en place un programme de santé-sécurité au travail',
              'Créer un canal de signalement éthique (whistleblowing)',
              'Développer un programme d\'impact communautaire structuré',
            ]
          : [
              'Formalize a diversity, equity and inclusion (DEI) policy',
              'Set up an occupational health and safety program',
              'Create an ethics reporting channel (whistleblowing)',
              'Develop a structured community impact program',
            ],
      });
    }

    if (axisId === 'gouvernance' && axisScore < 70) {
      recs.push({
        title: isFr ? `Renforcer la gouvernance responsable (${axisScore}/100)` : `Strengthen responsible governance (${axisScore}/100)`,
        items: isFr
          ? [
              'Rédiger une politique anti-corruption avec formation des collaborateurs',
              'Mettre en place un comité d\'audit et de conformité',
              'Publier un rapport de durabilité selon les standards GRI ou SASB',
              'Diversifier le conseil d\'administration avec des profils indépendants',
            ]
          : [
              'Write an anti-corruption policy with employee training',
              'Set up an audit and compliance committee',
              'Publish a sustainability report per GRI or SASB standards',
              'Diversify the board of directors with independent profiles',
            ],
      });
    }

    if (axisId === 'impact' && axisScore < 70) {
      recs.push({
        title: isFr ? `Développer l\'impact social mesurable (${axisScore}/100)` : `Develop measurable social impact (${axisScore}/100)`,
        items: isFr
          ? [
              'Définir des indicateurs d\'impact social clés (emploi local, revenus créés)',
              'Mettre en place un programme d\'achat local et de partenariats PME',
              'Développer des produits/services à impact social ou environnemental',
              'Publier un rapport d\'impact annuel avec données chiffrées',
            ]
          : [
              'Define key social impact indicators (local employment, income created)',
              'Set up a local purchasing program and SME partnerships',
              'Develop social or environmental impact products/services',
              'Publish an annual impact report with quantified data',
            ],
      });
    }
  });

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'excellence ESG' : 'Maintain ESG excellence',
      items: isFr
        ? [
            'Poursuivre l\'innovation ESG avec des objectifs ambitieux',
            'Partager les bonnes pratiques avec l\'écosystème africain',
            'Préparer une certification internationale (B Corp, ISO 26000)',
            'Développer des partenariats avec des investisseurs d\'impact',
          ]
        : [
            'Continue ESG innovation with ambitious targets',
            'Share best practices with the African ecosystem',
            'Prepare for international certification (B Corp, ISO 26000)',
            'Develop partnerships with impact investors',
          ],
    });
  }

  return recs;
}

export function getESGUltraClosingMessage(score: number, lang: string): { title: string; subtitle: string; cta: string } {
  const isFr = !lang.startsWith('en');

  if (score < 30) {
    return {
      title: isFr
        ? 'Votre organisation est en retard ESG — agissez maintenant'
        : 'Your organization is behind on ESG — act now',
      subtitle: isFr
        ? 'Les investisseurs, régulateurs et partenaires commerciaux exigent désormais une performance ESG minimale. Nos experts peuvent vous accompagner dans une transformation rapide et structurée.'
        : 'Investors, regulators and business partners now require a minimum ESG performance. Our experts can support you in a rapid and structured transformation.',
      cta: isFr ? 'Demander un audit ESG d\'urgence' : 'Request an urgent ESG audit',
    };
  }

  if (score < 50) {
    return {
      title: isFr
        ? 'Votre démarche ESG a besoin d\'être structurée'
        : 'Your ESG approach needs to be structured',
      subtitle: isFr
        ? 'Vous avez des intentions mais manquez de cadre et de mesure. Un plan d\'action de 90 jours peut transformer votre crédibilité ESG auprès de vos parties prenantes.'
        : 'You have intentions but lack framework and measurement. A 90-day action plan can transform your ESG credibility with your stakeholders.',
      cta: isFr ? 'Planifier un diagnostic ESG approfondi' : 'Schedule an in-depth ESG diagnostic',
    };
  }

  if (score < 70) {
    return {
      title: isFr
        ? 'Votre ESG est solide — passons à la certification'
        : 'Your ESG is solid — let\'s move to certification',
      subtitle: isFr
        ? 'Vous avez une base crédible. Il est temps de formaliser votre reporting, de viser la certification et d\'attirer les investisseurs d\'impact.'
        : 'You have a credible base. It is time to formalize your reporting, aim for certification and attract impact investors.',
      cta: isFr ? 'Découvrir nos programmes ESG avancés' : 'Discover our advanced ESG programs',
    };
  }

  if (score < 85) {
    return {
      title: isFr
        ? 'Votre ESG est avancée — devenez un leader africain'
        : 'Your ESG is advanced — become an African leader',
      subtitle: isFr
        ? 'Vous faites partie des entreprises africaines les plus performantes en ESG. Capitalisez sur cette position pour influencer l\'écosystème et attirer les meilleurs partenariats.'
        : 'You are among the highest-performing African companies in ESG. Capitalize on this position to influence the ecosystem and attract the best partnerships.',
      cta: isFr ? 'Devenir référence ESG avec Khepra' : 'Become an ESG reference with Khepra',
    };
  }

  return {
    title: isFr
      ? 'Votre organisation est un modèle ESG en Afrique'
      : 'Your organization is an ESG model in Africa',
    subtitle: isFr
      ? 'Félicitations ! Vous êtes exemplaire sur tous les axes ESG. Partagez votre leadership et continuez à inspirer l\'écosystème africain.'
      : 'Congratulations! You are exemplary on all ESG axes. Share your leadership and continue to inspire the African ecosystem.',
    cta: isFr ? 'Pérenniser l\'excellence ESG avec Khepra' : 'Sustain ESG excellence with Khepra',
  };
}

// ── LocalStorage comparison helpers ──

export interface SavedESGDiagnostic {
  date: string;
  globalScore: number;
  perAxis: Record<string, number>;
  answers: Record<string, number>;
  userName: string;
  userOrg: string;
}

const ESG_STORAGE_KEY = 'khepra_diagnostic_esg_baseline';

export function saveESGBaseline(diagnostic: SavedESGDiagnostic): void {
  try {
    localStorage.setItem(ESG_STORAGE_KEY, JSON.stringify(diagnostic));
  } catch {
    // ignore
  }
}

export function getESGBaseline(): SavedESGDiagnostic | null {
  try {
    const raw = localStorage.getItem(ESG_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedESGDiagnostic;
  } catch {
    return null;
  }
}

export function clearESGBaseline(): void {
  try {
    localStorage.removeItem(ESG_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getESGDeltaLabel(delta: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (delta > 15) return isFr ? 'Progression remarquable' : 'Remarkable progress';
  if (delta > 5) return isFr ? 'Bonne progression' : 'Good progress';
  if (delta > -5) return isFr ? 'Stable' : 'Stable';
  if (delta > -15) return isFr ? 'Légère régression' : 'Slight regression';
  return isFr ? 'Régression significative' : 'Significant regression';
}

export function getESGDeltaColor(delta: number): string {
  if (delta > 5) return '#059669';
  if (delta > -5) return '#6b7280';
  return '#dc2626';
}

export function getESGDeltaIcon(delta: number): string {
  if (delta > 5) return 'ri-arrow-up-line';
  if (delta > -5) return 'ri-subtract-line';
  return 'ri-arrow-down-line';
}