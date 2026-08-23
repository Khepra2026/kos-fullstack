export const AGREEMENT_AXES = [
  {
    id: 'gouvernance',
    titleFr: 'Gouvernance & Structure',
    titleEn: 'Governance & Structure',
    descriptionFr: 'Conformité du CA, direction générale et organes de contrôle (Circulaire BCEAO 01/2017 ou COBAC R-2016/01)',
    descriptionEn: 'Board, executive management and control bodies compliance (BCEAO Circular 01/2017 or COBAC R-2016/01)',
    icon: 'ri-government-line',
    color: '#0f766e',
    weight: 20,
    questions: [
      {
        id: 'gouv-q1',
        questionFr: 'Votre conseil d\'administration compte-t-il au moins 3 membres dont 1 indépendant ?',
        questionEn: 'Does your board of directors have at least 3 members including 1 independent?',
        options: [
          { value: 100, labelFr: 'Oui, 3+ membres dont ≥ 2 indépendants', labelEn: 'Yes, 3+ members with ≥ 2 independent' },
          { value: 75, labelFr: 'Oui, 3 membres dont 1 indépendant', labelEn: 'Yes, 3 members with 1 independent' },
          { value: 50, labelFr: '3 membres mais pas d\'indépendant', labelEn: '3 members but no independent' },
          { value: 0, labelFr: '< 3 membres ou structure informelle', labelEn: '< 3 members or informal structure' },
        ],
      },
      {
        id: 'gouv-q2',
        questionFr: 'Avez-vous un comité d\'audit et un comité des risques formalisés ?',
        questionEn: 'Do you have formalized audit and risk committees?',
        options: [
          { value: 100, labelFr: 'Oui, les deux avec charte et PV trimestriels', labelEn: 'Yes, both with charter and quarterly minutes' },
          { value: 75, labelFr: 'Oui, comité d\'audit seul formalisé', labelEn: 'Yes, audit committee only, formalized' },
          { value: 50, labelFr: 'En cours de création', labelEn: 'In progress' },
          { value: 0, labelFr: 'Aucun comité spécialisé', labelEn: 'No specialized committee' },
        ],
      },
      {
        id: 'gouv-q3',
        questionFr: 'Votre manuel de procédures administratives et comptables est-il à jour (moins de 12 mois) ?',
        questionEn: 'Is your administrative and accounting procedures manual up to date (less than 12 months)?',
        options: [
          { value: 100, labelFr: 'Oui, révisé < 6 mois, approuvé par le CA', labelEn: 'Yes, revised < 6 months, board-approved' },
          { value: 75, labelFr: 'Oui, < 12 mois', labelEn: 'Yes, < 12 months' },
          { value: 50, labelFr: '> 12 mois ou en cours de révision', labelEn: '> 12 months or under revision' },
          { value: 0, labelFr: 'Manuel inexistant ou > 24 mois', labelEn: 'Non-existent or > 24 months' },
        ],
      },
    ],
  },
  {
    id: 'conformite-lcbft',
    titleFr: 'Conformité LBC/FT & KYC',
    titleEn: 'AML/CFT & KYC Compliance',
    descriptionFr: 'Dispositif LBC/FT conforme GAFI/GIABA/GABAC et régulateur national',
    descriptionEn: 'AML/CFT framework compliant with FATF/GIABA/GABAC and national regulator',
    icon: 'ri-shield-keyhole-line',
    color: '#d97706',
    weight: 18,
    questions: [
      {
        id: 'lcbft-q1',
        questionFr: 'Avez-vous un Responsable Conformité LBC/FT nommé et déclaré au régulateur ?',
        questionEn: 'Have you appointed an AML/CFT Compliance Officer declared to the regulator?',
        options: [
          { value: 100, labelFr: 'Oui, nommé, déclaré et formé (certification ACAMS ou équivalent)', labelEn: 'Yes, appointed, declared and certified (ACAMS or equivalent)' },
          { value: 75, labelFr: 'Oui, nommé et déclaré', labelEn: 'Yes, appointed and declared' },
          { value: 50, labelFr: 'Nommé mais pas encore déclaré', labelEn: 'Appointed but not yet declared' },
          { value: 0, labelFr: 'Pas de responsable dédié', labelEn: 'No dedicated officer' },
        ],
      },
      {
        id: 'lcbft-q2',
        questionFr: 'Votre dispositif KYC couvre-t-il la vérification d\'identité, le screening sanctions/PEP et la due diligence renforcée ?',
        questionEn: 'Does your KYC framework cover identity verification, sanctions/PEP screening and enhanced due diligence?',
        options: [
          { value: 100, labelFr: 'Oui, 3 piliers avec outils automatisés (WorldCheck, Refinitiv)', labelEn: 'Yes, all 3 with automated tools (WorldCheck, Refinitiv)' },
          { value: 75, labelFr: 'Oui, 3 piliers mais partiellement manuels', labelEn: 'Yes, all 3 but partially manual' },
          { value: 50, labelFr: 'Vérification identité uniquement', labelEn: 'Identity verification only' },
          { value: 0, labelFr: 'Pas de dispositif KYC formalisé', labelEn: 'No formalized KYC framework' },
        ],
      },
    ],
  },
  {
    id: 'capital',
    titleFr: 'Capital & Fonds Propres',
    titleEn: 'Capital & Equity',
    descriptionFr: 'Capital minimum libéré et adéquation des fonds propres vs exigences réglementaires',
    descriptionEn: 'Minimum paid-up capital and capital adequacy vs regulatory requirements',
    icon: 'ri-funds-line',
    color: '#059669',
    weight: 15,
    questions: [
      {
        id: 'capital-q1',
        questionFr: 'Votre capital minimum libéré atteint-il le seuil réglementaire de votre catégorie d\'agrément ?',
        questionEn: 'Does your paid-up capital reach the regulatory threshold for your license category?',
        options: [
          { value: 100, labelFr: 'Oui, capital > 150% du minimum requis', labelEn: 'Yes, capital > 150% of minimum required' },
          { value: 75, labelFr: 'Oui, capital entre 100% et 150% du minimum', labelEn: 'Yes, capital between 100% and 150% of minimum' },
          { value: 50, labelFr: 'Atteint tout juste le minimum', labelEn: 'Barely meets the minimum' },
          { value: 0, labelFr: 'Capital < minimum requis', labelEn: 'Capital < minimum required' },
        ],
      },
      {
        id: 'capital-q2',
        questionFr: 'Disposez-vous d\'un business plan à 3 ans avec projections financières certifiées ?',
        questionEn: 'Do you have a 3-year business plan with certified financial projections?',
        options: [
          { value: 100, labelFr: 'Oui, audité par un cabinet externe (Big Four ou équivalent)', labelEn: 'Yes, audited by an external firm (Big Four or equivalent)' },
          { value: 75, labelFr: 'Oui, préparé en interne avec validation expert-comptable', labelEn: 'Yes, prepared internally with CPA validation' },
          { value: 50, labelFr: 'En cours de préparation', labelEn: 'In preparation' },
          { value: 0, labelFr: 'Pas de business plan formalisé', labelEn: 'No formalized business plan' },
        ],
      },
    ],
  },
  {
    id: 'si-continuite',
    titleFr: 'Système d\'Information & Continuité',
    titleEn: 'Information System & Continuity',
    descriptionFr: 'Infrastructure IT, PCA/PRA et cybersécurité conformes aux exigences du régulateur',
    descriptionEn: 'IT infrastructure, BCP/DRP and cybersecurity compliant with regulator requirements',
    icon: 'ri-server-line',
    color: '#0891b2',
    weight: 12,
    questions: [
      {
        id: 'si-q1',
        questionFr: 'Avez-vous un Plan de Continuité d\'Activité (PCA) et un Plan de Reprise d\'Activité (PRA) testés ?',
        questionEn: 'Do you have a tested Business Continuity Plan (BCP) and Disaster Recovery Plan (DRP)?',
        options: [
          { value: 100, labelFr: 'Oui, PCA + PRA testés < 6 mois, RTO/RPO documentés', labelEn: 'Yes, BCP + DRP tested < 6 months, RTO/RPO documented' },
          { value: 75, labelFr: 'Oui, documentés mais test > 12 mois', labelEn: 'Yes, documented but test > 12 months' },
          { value: 50, labelFr: 'En cours d\'élaboration', labelEn: 'In development' },
          { value: 0, labelFr: 'Pas de PCA/PRA', labelEn: 'No BCP/DRP' },
        ],
      },
      {
        id: 'si-q2',
        questionFr: 'Votre core banking system est-il hébergé dans un datacenter certifié (Tier II minimum) ?',
        questionEn: 'Is your core banking system hosted in a certified datacenter (Tier II minimum)?',
        options: [
          { value: 100, labelFr: 'Oui, Tier III+ avec redondance géographique', labelEn: 'Yes, Tier III+ with geographic redundancy' },
          { value: 75, labelFr: 'Oui, Tier II dans le pays', labelEn: 'Yes, Tier II in-country' },
          { value: 50, labelFr: 'Hébergement interne sécurisé', labelEn: 'Secure on-premise hosting' },
          { value: 0, labelFr: 'Pas d\'infrastructure dédiée', labelEn: 'No dedicated infrastructure' },
        ],
      },
    ],
  },
  {
    id: 'controle-interne',
    titleFr: 'Contrôle Interne & Gestion des Risques',
    titleEn: 'Internal Control & Risk Management',
    descriptionFr: 'Dispositif de contrôle interne, cartographie des risques et audit interne',
    descriptionEn: 'Internal control framework, risk mapping and internal audit',
    icon: 'ri-radar-line',
    color: '#7c3aed',
    weight: 15,
    questions: [
      {
        id: 'ci-q1',
        questionFr: 'Disposez-vous d\'une cartographie des risques couvrant les risques crédit, marché, opérationnel, liquidité et conformité ?',
        questionEn: 'Do you have a risk map covering credit, market, operational, liquidity and compliance risks?',
        options: [
          { value: 100, labelFr: 'Oui, 5 familles avec matrice probabilité × impact et plan de mitigation', labelEn: 'Yes, all 5 with probability × impact matrix and mitigation plan' },
          { value: 75, labelFr: 'Oui, partielle (3-4 familles couvertes)', labelEn: 'Yes, partial (3-4 families covered)' },
          { value: 50, labelFr: 'En cours de réalisation', labelEn: 'In progress' },
          { value: 0, labelFr: 'Pas de cartographie des risques', labelEn: 'No risk mapping' },
        ],
      },
      {
        id: 'ci-q2',
        questionFr: 'Avez-vous un auditeur interne indépendant (ou un comité d\'audit fonctionnel) ?',
        questionEn: 'Do you have an independent internal auditor (or a functional audit committee)?',
        options: [
          { value: 100, labelFr: 'Oui, auditeur interne dédié + comité d\'audit', labelEn: 'Yes, dedicated internal auditor + audit committee' },
          { value: 75, labelFr: 'Oui, auditeur interne seul', labelEn: 'Yes, internal auditor only' },
          { value: 50, labelFr: 'Externalisé à un cabinet', labelEn: 'Outsourced to a firm' },
          { value: 0, labelFr: 'Pas de fonction audit interne', labelEn: 'No internal audit function' },
        ],
      },
    ],
  },
  {
    id: 'documentation',
    titleFr: 'Dossier d\'Agrément & Documentation',
    titleEn: 'License Application & Documentation',
    descriptionFr: 'Complétude et qualité du dossier d\'agrément vs exigences du régulateur',
    descriptionEn: 'Completeness and quality of license application vs regulator requirements',
    icon: 'ri-folder-check-line',
    color: '#dc2626',
    weight: 20,
    questions: [
      {
        id: 'doc-q1',
        questionFr: 'Avez-vous constitué un dossier d\'agrément complet selon la checklist officielle du régulateur (BCEAO/COBAC/BEAC) ?',
        questionEn: 'Have you compiled a complete license application following the official regulator checklist (BCEAO/COBAC/BEAC)?',
        options: [
          { value: 100, labelFr: 'Oui, dossier complet, relu par un expert réglementaire', labelEn: 'Yes, complete, reviewed by a regulatory expert' },
          { value: 75, labelFr: 'Oui, dossier complet en interne', labelEn: 'Yes, complete internally' },
          { value: 50, labelFr: 'Partiellement constitué (> 60% des pièces)', labelEn: 'Partially compiled (> 60% of documents)' },
          { value: 0, labelFr: 'Démarrage ou < 30% des pièces', labelEn: 'Starting or < 30% of documents' },
        ],
      },
      {
        id: 'doc-q2',
        questionFr: 'Avez-vous identifié et préparé les documents spécifiques à votre type d\'agrément (Banque, EMF, FinTech, PSP, Assureur) ?',
        questionEn: 'Have you identified and prepared the specific documents for your license type (Bank, MFI, FinTech, PSP, Insurer)?',
        options: [
          { value: 100, labelFr: 'Oui, tous les documents spécifiques + études complémentaires', labelEn: 'Yes, all specific documents + supplementary studies' },
          { value: 75, labelFr: 'Oui, documents standards préparés', labelEn: 'Yes, standard documents prepared' },
          { value: 50, labelFr: 'Liste identifiée, préparation en cours', labelEn: 'List identified, preparation in progress' },
          { value: 0, labelFr: 'Pas encore identifié les exigences spécifiques', labelEn: 'Specific requirements not yet identified' },
        ],
      },
    ],
  },
];

export function getAgreementScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#d97706';
  if (score >= 40) return '#ea580c';
  return '#dc2626';
}

export function getAgreementScoreLabel(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'READY — File Immediately';
    if (score >= 60) return 'ADVANCED — Finalize in 30 Days';
    if (score >= 40) return 'IN PROGRESS — Launch 90-Day Roadmap';
    return 'EARLY STAGE — Structural Gaps to Address';
  }
  if (score >= 80) return 'PRÊT — Déposez votre dossier';
  if (score >= 60) return 'AVANCÉ — Finalisez sous 30 jours';
  if (score >= 40) return 'EN COURS — Lancez votre roadmap 90 jours';
  return 'AMORÇAGE — Lacunes structurelles à combler';
}

export function getAgreementMaturity(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'J-30 — Final Polish';
    if (score >= 60) return 'J-90 — Completion Phase';
    if (score >= 40) return 'J-180 — Build-Up Phase';
    return 'J-270 — Foundation Phase';
  }
  if (score >= 80) return 'J-30 — Finalisation';
  if (score >= 60) return 'J-90 — Phase d\'Achèvement';
  if (score >= 40) return 'J-180 — Phase de Construction';
  return 'J-270 — Phase de Fondation';
}

export function getAgreementReadiness(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'Your licensing file is nearly complete. Submit within 30 days with high confidence of approval.';
    if (score >= 60) return 'Strong progress. Focus on the identified gaps to reach submission readiness in 60-90 days.';
    if (score >= 40) return 'Significant work ahead. Use our 6-pillar roadmap to prioritize actions over the next 90-180 days.';
    return 'Foundational gaps detected. Start with governance formalization before progressing to technical requirements.';
  }
  if (score >= 80) return 'Votre dossier d\'agrément est quasi complet. Déposez sous 30 jours avec une forte probabilité d\'approbation.';
  if (score >= 60) return 'Belle progression. Concentrez-vous sur les écarts identifiés pour être prêt dans 60-90 jours.';
  if (score >= 40) return 'Travail significatif à fournir. Utilisez notre roadmap 6 piliers pour prioriser les actions sur 90-180 jours.';
  return 'Lacunes fondamentales détectées. Commencez par la formalisation de la gouvernance avant d\'aborder les exigences techniques.';
}

export function getAgreementRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const isFr = lang.startsWith('fr');
  const risks: (string | { fr: string; en: string })[] = [];

  if ((perAxis['gouvernance'] ?? 0) < 50) {
    risks.push(isFr
      ? `RISQUE CRITIQUE : Gouvernance non conforme — Motif #1 de rejet des dossiers d'agrément BCEAO/COBAC. 3 administrateurs minimum dont 1 indépendant requis.`
      : `CRITICAL RISK: Non-compliant governance — #1 rejection reason for BCEAO/COBAC license applications. Minimum 3 directors including 1 independent required.`);
  }
  if ((perAxis['documentation'] ?? 0) < 40) {
    risks.push(isFr
      ? `RISQUE MAJEUR : Dossier incomplet — Votre dossier ne contient pas les pièces minimales exigées. Risque de rejet administratif sans examen du fond.`
      : `MAJOR RISK: Incomplete file — Your application lacks required minimum documents. Risk of administrative rejection without merit review.`);
  }
  if ((perAxis['capital'] ?? 0) < 50) {
    risks.push(isFr
      ? `RISQUE ÉLEVÉ : Capital insuffisant — Le capital minimum libéré est un critère bloquant. Sans capital conforme, le dossier n'est pas recevable.`
      : `HIGH RISK: Insufficient capital — Paid-up minimum capital is a blocking criterion. Without compliant capital, the application is not admissible.`);
  }

  if (risks.length === 0) {
    risks.push(isFr
      ? 'Aucun risque bloquant identifié. Votre dossier est bien avancé. Finalisez les derniers ajustements et déposez.'
      : 'No blocking risks identified. Your file is well advanced. Finalize the last adjustments and submit.');
  }

  return risks;
}

export function getAgreementRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = lang.startsWith('fr');
  const entries = Object.entries(perAxis).sort(([, a], [, b]) => (a ?? 0) - (b ?? 0));
  const worstId = entries[0]?.[0] ?? '';

  const pillarRecs: Record<string, { fr: string; en: string; frItems: string[]; enItems: string[] }> = {
    'gouvernance': {
      fr: 'Priorité 1 : Formaliser la Gouvernance',
      en: 'Priority 1: Formalize Governance',
      frItems: ['Constituer un Conseil d\'Administration avec 3+ membres et 1 indépendant', 'Rédiger les chartes des comités spécialisés (audit, risques)', 'Mettre à jour le manuel de procédures (< 6 mois) avec approbation CA'],
      enItems: ['Form a Board of Directors with 3+ members and 1 independent', 'Draft specialized committee charters (audit, risk)', 'Update procedures manual (< 6 months) with Board approval'],
    },
    'documentation': {
      fr: 'Priorité 1 : Compléter le Dossier d\'Agrément',
      en: 'Priority 1: Complete License Application',
      frItems: ['Rassembler 100% des pièces selon la checklist officielle du régulateur', 'Faire relire le dossier par un expert réglementaire externe', 'Préparer les documents spécifiques à votre type d\'agrément'],
      enItems: ['Collect 100% of documents per the official regulator checklist', 'Have the file reviewed by an external regulatory expert', 'Prepare documents specific to your license type'],
    },
    'capital': {
      fr: 'Priorité 1 : Sécuriser le Capital',
      en: 'Priority 1: Secure Capital',
      frItems: ['Libérer le capital minimum requis avant le dépôt du dossier', 'Préparer un business plan 3 ans avec projections certifiées', 'Documenter l\'origine des fonds (conformité LBC/FT)'],
      enItems: ['Pay up the minimum required capital before filing', 'Prepare a 3-year business plan with certified projections', 'Document the source of funds (AML/CFT compliance)'],
    },
    'conformite-lcbft': {
      fr: 'Priorité 2 : Renforcer le Dispositif LBC/FT',
      en: 'Priority 2: Strengthen AML/CFT Framework',
      frItems: ['Nommer et déclarer un Responsable Conformité LBC/FT certifié', 'Déployer un outil de screening sanctions/PEP automatisé', 'Former 100% du personnel en contact clientèle au KYC'],
      enItems: ['Appoint and declare a certified AML/CFT Compliance Officer', 'Deploy an automated sanctions/PEP screening tool', 'Train 100% of customer-facing staff on KYC'],
    },
    'si-continuite': {
      fr: 'Priorité 2 : Sécuriser l\'Infrastructure IT',
      en: 'Priority 2: Secure IT Infrastructure',
      frItems: ['Finaliser et tester le PCA/PRA (RTO < 4h, RPO < 1h)', 'Migrer le core banking vers un datacenter certifié Tier II+', 'Réaliser un audit de sécurité externe (pentest + vue de code)'],
      enItems: ['Finalize and test BCP/DRP (RTO < 4h, RPO < 1h)', 'Migrate core banking to a certified Tier II+ datacenter', 'Conduct an external security audit (pentest + code review)'],
    },
    'controle-interne': {
      fr: 'Priorité 2 : Structurer le Contrôle Interne',
      en: 'Priority 2: Structure Internal Control',
      frItems: ['Réaliser la cartographie complète des risques (5 familles)', 'Recruter ou externaliser la fonction audit interne', 'Mettre en place un reporting trimestriel au Conseil d\'Administration'],
      enItems: ['Complete the full risk mapping (5 families)', 'Recruit or outsource the internal audit function', 'Establish quarterly Board reporting'],
    },
  };

  const specific = pillarRecs[worstId];
  if (specific) {
    return [
      { title: isFr ? specific.fr : specific.en, items: isFr ? specific.frItems : specific.enItems },
      {
        title: isFr ? 'Accélérer avec KHEPRA EXPERTS' : 'Accelerate with KHEPRA EXPERTS',
        items: isFr
          ? ['Bénéficiez de notre accompagnement complet : diagnostic J0, roadmap J0-J270, préparation du dossier et défense devant le régulateur', 'KHEPRA a accompagné 15+ institutions dans leur processus d\'agrément UEMOA/CEMAC avec 100% de succès', 'Contactez-nous pour un diagnostic flash gratuit de votre dossier']
          : ['Benefit from our complete support: J0 diagnosis, J0-J270 roadmap, file preparation and defense before the regulator', 'KHEPRA has supported 15+ institutions in their UEMOA/CEMAC licensing process with 100% success', 'Contact us for a free flash diagnosis of your application'],
      },
    ];
  }

  return [{
    title: isFr ? 'Votre Roadmap Agrément' : 'Your Licensing Roadmap',
    items: isFr
      ? ['Finalisez les derniers ajustements documentaires', 'Planifiez une simulation d\'audit avec un expert réglementaire', 'Préparez la défense orale devant le régulateur']
      : ['Finalize the last documentary adjustments', 'Schedule a mock audit with a regulatory expert', 'Prepare the oral defense before the regulator'],
  }];
}

export const AGREEMENT_QA: { question: string; answer: string }[] = [
  { question: 'Quel est le délai moyen d\'obtention d\'un agrément ?', answer: 'En zone UEMOA, le délai réglementaire est de 6 mois maximum après dépôt du dossier complet. En pratique, comptez 9-12 mois avec les allers-retours de compléments d\'information. En zone CEMAC, le délai peut atteindre 18 mois. KHEPRA EXPERTS réduit ce délai de 40% en moyenne.' },
  { question: 'Quels sont les motifs de rejet les plus fréquents ?', answer: '1) Gouvernance non conforme (CA incomplet), 2) Business plan irréaliste ou non certifié, 3) Capital insuffisant ou origine des fonds non documentée, 4) Dispositif LBC/FT incomplet, 5) Absence de PCA/PRA testé. Dans 80% des cas, ce sont des lacunes documentaires, pas des problèmes de fond.' },
  { question: 'Puis-je déposer un dossier sans accompagnement externe ?', answer: 'Oui, c\'est possible. Mais le taux de succès sans accompagnement est de 35% contre 92% avec un expert réglementaire. L\'investissement dans un cabinet spécialisé comme KHEPRA se rentabilise dès le premier mois d\'activité grâce à un agrément plus rapide.' },
];



