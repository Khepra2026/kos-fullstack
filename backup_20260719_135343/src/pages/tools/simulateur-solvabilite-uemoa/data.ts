export const SOLVABILITY_RATIOS = [
  {
    id: 'ratio-solvabilite',
    titleFr: 'Ratio de Solvabilité',
    titleEn: 'Solvency Ratio',
    descriptionFr: 'Fonds propres / Actifs pondérés (minimum 8% BCEAO)',
    descriptionEn: 'Equity / Risk-Weighted Assets (minimum 8% BCEAO)',
    icon: 'ri-shield-check-line',
    color: '#0f766e',
    threshold: 8,
    unit: '%',
    weight: 20,
    questions: [
      {
        id: 'ratio-solvabilite-q1',
        questionFr: 'Quel est le montant total de vos fonds propres réglementaires (Tier 1 + Tier 2) ?',
        questionEn: 'What is your total regulatory capital (Tier 1 + Tier 2)?',
        options: [
          { value: 100, labelFr: '> 15 milliards FCFA', labelEn: '> 15 billion FCFA' },
          { value: 75, labelFr: '5–15 milliards FCFA', labelEn: '5–15 billion FCFA' },
          { value: 50, labelFr: '1–5 milliards FCFA', labelEn: '1–5 billion FCFA' },
          { value: 25, labelFr: '< 1 milliard FCFA', labelEn: '< 1 billion FCFA' },
        ],
      },
      {
        id: 'ratio-solvabilite-q2',
        questionFr: 'Quel est le total de vos actifs pondérés en risque (RWA) ?',
        questionEn: 'What is your total Risk-Weighted Assets (RWA)?',
        options: [
          { value: 100, labelFr: '< 50 milliards FCFA', labelEn: '< 50 billion FCFA' },
          { value: 75, labelFr: '50–150 milliards FCFA', labelEn: '50–150 billion FCFA' },
          { value: 50, labelFr: '150–300 milliards FCFA', labelEn: '150–300 billion FCFA' },
          { value: 25, labelFr: '> 300 milliards FCFA', labelEn: '> 300 billion FCFA' },
        ],
      },
    ],
  },
  {
    id: 'ratio-liquidite',
    titleFr: 'Ratio de Liquidité',
    titleEn: 'Liquidity Ratio',
    descriptionFr: 'Actifs liquides / Passifs exigibles à court terme (minimum 100% BCEAO)',
    descriptionEn: 'Liquid assets / Short-term liabilities (minimum 100% BCEAO)',
    icon: 'ri-drop-line',
    color: '#0891b2',
    threshold: 100,
    unit: '%',
    weight: 15,
    questions: [
      {
        id: 'ratio-liquidite-q1',
        questionFr: 'Quelle est la valeur totale de vos actifs liquides (cash, titres souverains, dépôts BCEAO) ?',
        questionEn: 'What is the total value of your liquid assets (cash, sovereign bonds, BCEAO deposits)?',
        options: [
          { value: 100, labelFr: '> 50 milliards FCFA', labelEn: '> 50 billion FCFA' },
          { value: 75, labelFr: '15–50 milliards FCFA', labelEn: '15–50 billion FCFA' },
          { value: 50, labelFr: '5–15 milliards FCFA', labelEn: '5–15 billion FCFA' },
          { value: 25, labelFr: '< 5 milliards FCFA', labelEn: '< 5 billion FCFA' },
        ],
      },
      {
        id: 'ratio-liquidite-q2',
        questionFr: 'Quel est le montant de vos passifs exigibles à moins de 30 jours ?',
        questionEn: 'What is the amount of your liabilities due within 30 days?',
        options: [
          { value: 100, labelFr: '< 20 milliards FCFA', labelEn: '< 20 billion FCFA' },
          { value: 75, labelFr: '20–80 milliards FCFA', labelEn: '20–80 billion FCFA' },
          { value: 50, labelFr: '80–200 milliards FCFA', labelEn: '80–200 billion FCFA' },
          { value: 25, labelFr: '> 200 milliards FCFA', labelEn: '> 200 billion FCFA' },
        ],
      },
    ],
  },
  {
    id: 'ratio-grands-risques',
    titleFr: 'Ratio de Division des Risques',
    titleEn: 'Large Exposure Ratio',
    descriptionFr: 'Total grands risques / Fonds propres (maximum 800% BCEAO)',
    descriptionEn: 'Total large exposures / Equity (maximum 800% BCEAO)',
    icon: 'ri-alert-line',
    color: '#d97706',
    threshold: 800,
    unit: '%',
    weight: 15,
    questions: [
      {
        id: 'ratio-grands-risques-q1',
        questionFr: 'Combien de contreparties dépassent 10% de vos fonds propres ?',
        questionEn: 'How many counterparties exceed 10% of your equity?',
        options: [
          { value: 100, labelFr: '0–2', labelEn: '0–2' },
          { value: 75, labelFr: '3–5', labelEn: '3–5' },
          { value: 50, labelFr: '6–10', labelEn: '6–10' },
          { value: 25, labelFr: '> 10', labelEn: '> 10' },
        ],
      },
      {
        id: 'ratio-grands-risques-q2',
        questionFr: 'Le cumul de vos grands risques dépasse-t-il 800% des fonds propres ?',
        questionEn: 'Does your total large exposure exceed 800% of equity?',
        options: [
          { value: 100, labelFr: 'Non, < 400%', labelEn: 'No, < 400%' },
          { value: 75, labelFr: 'Entre 400% et 600%', labelEn: 'Between 400% and 600%' },
          { value: 50, labelFr: 'Entre 600% et 800%', labelEn: 'Between 600% and 800%' },
          { value: 25, labelFr: 'Oui, > 800%', labelEn: 'Yes, > 800%' },
        ],
      },
    ],
  },
  {
    id: 'ratio-creances',
    titleFr: 'Ratio Créances en Souffrance',
    titleEn: 'NPL Ratio',
    descriptionFr: 'Créances douteuses / Portefeuille brut (maximum 5% BCEAO)',
    descriptionEn: 'NPLs / Gross portfolio (maximum 5% BCEAO)',
    icon: 'ri-error-warning-line',
    color: '#dc2626',
    threshold: 5,
    unit: '%',
    weight: 15,
    questions: [
      {
        id: 'ratio-creances-q1',
        questionFr: 'Quel est le taux de créances en souffrance de votre portefeuille ?',
        questionEn: 'What is your portfolio\'s NPL ratio?',
        options: [
          { value: 100, labelFr: '< 2% — Très sain', labelEn: '< 2% — Very healthy' },
          { value: 75, labelFr: '2% à 5% — Acceptable', labelEn: '2% to 5% — Acceptable' },
          { value: 50, labelFr: '5% à 10% — Sous surveillance', labelEn: '5% to 10% — Under watch' },
          { value: 25, labelFr: '> 10% — Critique', labelEn: '> 10% — Critical' },
        ],
      },
    ],
  },
  {
    id: 'ratio-couverture',
    titleFr: 'Taux de Couverture des Provisions',
    titleEn: 'Provision Coverage Ratio',
    descriptionFr: 'Provisions / Créances douteuses (minimum 70% BCEAO pour Stage 3)',
    descriptionEn: 'Provisions / NPLs (minimum 70% BCEAO for Stage 3)',
    icon: 'ri-umbrella-line',
    color: '#7c3aed',
    threshold: 70,
    unit: '%',
    weight: 10,
    questions: [
      {
        id: 'ratio-couverture-q1',
        questionFr: 'Vos provisions couvrent-elles suffisamment vos créances en souffrance (Stage 3 IFRS 9) ?',
        questionEn: 'Do your provisions adequately cover your NPLs (Stage 3 IFRS 9)?',
        options: [
          { value: 100, labelFr: '> 90% — Très prudent', labelEn: '> 90% — Very prudent' },
          { value: 75, labelFr: '70% à 90% — Conforme', labelEn: '70% to 90% — Compliant' },
          { value: 50, labelFr: '50% à 70% — Insuffisant', labelEn: '50% to 70% — Insufficient' },
          { value: 25, labelFr: '< 50% — Très insuffisant', labelEn: '< 50% — Very insufficient' },
        ],
      },
    ],
  },
  {
    id: 'ratio-levier',
    titleFr: 'Ratio de Levier',
    titleEn: 'Leverage Ratio',
    descriptionFr: 'Fonds propres Tier 1 / Exposition totale (minimum 3% Bâle III / BCEAO)',
    descriptionEn: 'Tier 1 Capital / Total Exposure (minimum 3% Basel III / BCEAO)',
    icon: 'ri-scales-3-line',
    color: '#059669',
    threshold: 3,
    unit: '%',
    weight: 10,
    questions: [
      {
        id: 'ratio-levier-q1',
        questionFr: 'Quel est votre ratio de levier (Tier 1 / Exposition totale) ?',
        questionEn: 'What is your leverage ratio (Tier 1 / Total Exposure)?',
        options: [
          { value: 100, labelFr: '> 6% — Très confortable', labelEn: '> 6% — Very comfortable' },
          { value: 75, labelFr: '4% à 6% — Confortable', labelEn: '4% to 6% — Comfortable' },
          { value: 50, labelFr: '3% à 4% — Conforme', labelEn: '3% to 4% — Compliant' },
          { value: 25, labelFr: '< 3% — Non conforme', labelEn: '< 3% — Non-compliant' },
        ],
      },
    ],
  },
  {
    id: 'ratio-transformation',
    titleFr: 'Coefficient de Transformation',
    titleEn: 'Transformation Ratio',
    descriptionFr: 'Crédits / Dépôts (maximum 120% — mesure de stabilité du funding)',
    descriptionEn: 'Loans / Deposits (maximum 120% — funding stability measure)',
    icon: 'ri-swap-line',
    color: '#2563eb',
    threshold: 120,
    unit: '%',
    weight: 10,
    questions: [
      {
        id: 'ratio-transformation-q1',
        questionFr: 'Quel est votre ratio crédits / dépôts ?',
        questionEn: 'What is your loans-to-deposits ratio?',
        options: [
          { value: 100, labelFr: '< 80% — Excès de liquidité', labelEn: '< 80% — Excess liquidity' },
          { value: 75, labelFr: '80% à 100% — Équilibré', labelEn: '80% to 100% — Balanced' },
          { value: 50, labelFr: '100% à 120% — Tendu', labelEn: '100% to 120% — Tight' },
          { value: 25, labelFr: '> 120% — Surexposé', labelEn: '> 120% — Overexposed' },
        ],
      },
    ],
  },
  {
    id: 'ratio-rentabilite',
    titleFr: 'Rentabilité des Actifs (ROA)',
    titleEn: 'Return on Assets (ROA)',
    descriptionFr: 'Résultat net / Total bilan (benchmark BCEAO ≥ 1%)',
    descriptionEn: 'Net income / Total assets (BCEAO benchmark ≥ 1%)',
    icon: 'ri-line-chart-line',
    color: '#0f766e',
    threshold: 1,
    unit: '%',
    weight: 5,
    questions: [
      {
        id: 'ratio-rentabilite-q1',
        questionFr: 'Quel est le ROA de votre institution sur les 12 derniers mois ?',
        questionEn: 'What is your institution\'s ROA over the last 12 months?',
        options: [
          { value: 100, labelFr: '> 2% — Excellente', labelEn: '> 2% — Excellent' },
          { value: 75, labelFr: '1% à 2% — Satisfaisante', labelEn: '1% to 2% — Satisfactory' },
          { value: 50, labelFr: '0% à 1% — Faible', labelEn: '0% to 1% — Weak' },
          { value: 25, labelFr: '< 0% — Déficitaire', labelEn: '< 0% — Loss-making' },
        ],
      },
    ],
  },
];

export function getSolvabilityScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#d97706';
  if (score >= 40) return '#ea580c';
  return '#dc2626';
}

export function getSolvabilityScoreLabel(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'Excellent — Solvency Strong';
    if (score >= 60) return 'Good — Minor Gaps';
    if (score >= 40) return 'Warning — Corrective Actions Required';
    return 'Critical — BCEAO Non-Compliant';
  }
  if (score >= 80) return 'Excellent — Solvabilité Solide';
  if (score >= 60) return 'Bon — Écarts Mineurs';
  if (score >= 40) return 'Attention — Actions Correctives Requises';
  return 'Critique — Non-Conforme BCEAO';
}

export function getSolvabilityMaturityLevel(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'ELITE — Solvency Leader';
    if (score >= 60) return 'STANDARD — Compliant';
    if (score >= 40) return 'SURVEILLANCE — Under Watch';
    return 'ALERT — Immediate Action Required';
  }
  if (score >= 80) return 'ELITE — Leader Solvabilité';
  if (score >= 60) return 'STANDARD — Conforme';
  if (score >= 40) return 'SURVEILLANCE — Sous Monitoring';
  return 'ALERTE — Action Immédiate Requise';
}

export function getSolvabilityReadiness(score: number, lang: string): string {
  if (lang.startsWith('en')) {
    if (score >= 80) return 'Your institution exceeds BCEAO prudential requirements. Positioned as a market leader.';
    if (score >= 60) return 'Your institution is compliant with most BCEAO ratios. Optimize 2-3 areas to reach excellence.';
    if (score >= 40) return 'Gaps detected vs BCEAO thresholds. 3 priority corrective actions identified.';
    return 'CRITICAL: Several ratios below BCEAO minimums. Immediate remediation plan required.';
  }
  if (score >= 80) return 'Votre institution dépasse les exigences prudentielles BCEAO. Positionnée comme leader du marché.';
  if (score >= 60) return 'Votre institution respecte la plupart des ratios BCEAO. Optimisez 2-3 axes pour atteindre l\'excellence.';
  if (score >= 40) return 'Écarts détectés vs seuils BCEAO. 3 actions correctives prioritaires identifiées.';
  return 'CRITIQUE : Plusieurs ratios en dessous des minimums BCEAO. Plan de remédiation immédiat requis.';
}

export function getSolvabilityRisks(perAxis: Record<string, number>, globalScore: number, lang: string): (string | { fr: string; en: string })[] {
  const risks: (string | { fr: string; en: string })[] = [];
  const isFr = lang.startsWith('fr');

  const ratioNames: Record<string, { fr: string; en: string }> = {
    'ratio-solvabilite': { fr: 'Ratio de Solvabilité', en: 'Solvency Ratio' },
    'ratio-liquidite': { fr: 'Ratio de Liquidité', en: 'Liquidity Ratio' },
    'ratio-grands-risques': { fr: 'Ratio de Division des Risques', en: 'Large Exposure Ratio' },
    'ratio-creances': { fr: 'Ratio Créances en Souffrance', en: 'NPL Ratio' },
    'ratio-couverture': { fr: 'Taux de Couverture', en: 'Coverage Ratio' },
    'ratio-levier': { fr: 'Ratio de Levier', en: 'Leverage Ratio' },
    'ratio-transformation': { fr: 'Coefficient de Transformation', en: 'Transformation Ratio' },
    'ratio-rentabilite': { fr: 'Rentabilité (ROA)', en: 'ROA' },
  };

  // Critical risks
  if ((perAxis['ratio-solvabilite'] ?? 0) < 50) {
    risks.push(isFr
      ? `RISQUE CRITIQUE : Solvabilité insuffisante — Fonds propres probablement < 8% des RWA. Sanction BCEAO possible (mise sous administration provisoire).`
      : `CRITICAL RISK: Insufficient solvency — Equity likely < 8% of RWA. BCEAO sanction possible (provisional administration).`);
  }
  if ((perAxis['ratio-creances'] ?? 0) < 40) {
    risks.push(isFr
      ? `RISQUE MAJEUR : Portefeuille dégradé — Taux de créances en souffrance critique. Provisionnement IFRS 9 à renforcer d'urgence.`
      : `MAJOR RISK: Degraded portfolio — Critical NPL ratio. IFRS 9 provisioning to be urgently strengthened.`);
  }

  // Moderate risks
  Object.entries(perAxis).forEach(([id, score]) => {
    if (score < 60 && !risks.some(r => typeof r === 'string' ? r.includes(id) : false)) {
      const name = ratioNames[id] || { fr: id, en: id };
      const label = isFr ? name.fr : name.en;
      risks.push(isFr
        ? `RISQUE ÉLEVÉ : ${label} — Score ${score}/100. Écart significatif vs exigences BCEAO. Action corrective requise sous 90 jours.`
        : `HIGH RISK: ${label} — Score ${score}/100. Significant gap vs BCEAO requirements. Corrective action required within 90 days.`);
    }
  });

  if (risks.length === 0) {
    risks.push(isFr
      ? 'Aucun risque critique détecté. Surveillance continue recommandée pour maintenir la conformité BCEAO.'
      : 'No critical risks detected. Continuous monitoring recommended to maintain BCEAO compliance.');
  }

  return risks;
}

export function getSolvabilityRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; items: string[] }[] {
  const isFr = lang.startsWith('fr');
  const recs: { title: string; items: string[] }[] = [];

  // Priority action based on worst-performing ratio
  const worstRatio = Object.entries(perAxis).sort(([, a], [, b]) => (a ?? 0) - (b ?? 0))[0];
  const worstId = worstRatio?.[0] ?? '';
  const worstScore = worstRatio?.[1] ?? 100;

  if (worstScore < 60) {
    const ratioTitles: Record<string, { fr: string; en: string; frItems: string[]; enItems: string[] }> = {
      'ratio-solvabilite': {
        fr: 'Action Prioritaire : Renforcer la Solvabilité',
        en: 'Priority Action: Strengthen Solvency',
        frItems: ['Augmenter les fonds propres via injection de capital ou mise en réserve des bénéfices', 'Réduire les actifs pondérés en risque (RWA) via cession ou titrisation', 'Établir un plan de capitalisation sur 12 mois avec jalons trimestriels BCEAO'],
        enItems: ['Increase equity via capital injection or retained earnings allocation', 'Reduce risk-weighted assets (RWA) via divestiture or securitization', 'Establish a 12-month capitalization plan with quarterly BCEAO milestones'],
      },
      'ratio-liquidite': {
        fr: 'Action Prioritaire : Améliorer la Liquidité',
        en: 'Priority Action: Improve Liquidity',
        frItems: ['Augmenter la réserve d\'actifs liquides (titres souverains, dépôts BCEAO)', 'Réduire la dépendance au refinancement court terme', 'Établir un plan de contingence liquidité (CFP) conforme Circulaire BCEAO'],
        enItems: ['Increase liquid asset reserves (sovereign bonds, BCEAO deposits)', 'Reduce short-term refinancing dependency', 'Establish a Contingency Funding Plan (CFP) compliant with BCEAO Circular'],
      },
      'ratio-creances': {
        fr: 'Action Prioritaire : Assainir le Portefeuille',
        en: 'Priority Action: Clean Up Portfolio',
        frItems: ['Lancer un programme de recouvrement accéléré des créances douteuses', 'Renforcer le provisionnement IFRS 9 (Stage 2 → Stage 3)', 'Revoir la politique de crédit et les critères d\'octroi'],
        enItems: ['Launch an accelerated NPL recovery program', 'Strengthen IFRS 9 provisioning (Stage 2 → Stage 3)', 'Review credit policy and origination criteria'],
      },
      'ratio-grands-risques': {
        fr: 'Action Prioritaire : Diversifier les Risques',
        en: 'Priority Action: Diversify Risks',
        frItems: ['Identifier les concentrations sectorielles et par contrepartie', 'Établir des limites internes plus strictes que le plafond BCEAO', 'Diversifier le portefeuille vers de nouveaux secteurs et zones géographiques'],
        enItems: ['Identify sector and counterparty concentrations', 'Establish internal limits stricter than BCEAO ceiling', 'Diversify portfolio into new sectors and geographic areas'],
      },
      'ratio-couverture': {
        fr: 'Action Prioritaire : Renforcer la Couverture',
        en: 'Priority Action: Strengthen Coverage',
        frItems: ['Augmenter les provisions sur créances douteuses à 70% minimum', 'Réviser les paramètres IFRS 9 (PD, LGD, EAD)', 'Mettre en place un suivi trimestriel du taux de couverture'],
        enItems: ['Increase NPL provisions to minimum 70%', 'Review IFRS 9 parameters (PD, LGD, EAD)', 'Establish quarterly coverage ratio monitoring'],
      },
      'ratio-levier': {
        fr: 'Action Prioritaire : Maîtriser le Levier',
        en: 'Priority Action: Control Leverage',
        frItems: ['Plafonner la croissance du bilan si Tier 1 insuffisant', 'Renforcer le Tier 1 via bénéfices non distribués ou augmentation de capital', 'Mettre en place un suivi mensuel du ratio de levier'],
        enItems: ['Cap balance sheet growth if Tier 1 insufficient', 'Strengthen Tier 1 via retained earnings or capital increase', 'Establish monthly leverage ratio monitoring'],
      },
      'ratio-transformation': {
        fr: 'Action Prioritaire : Rééquilibrer la Transformation',
        en: 'Priority Action: Rebalance Transformation',
        frItems: ['Freiner la production de crédit si ratio > 120%', 'Développer la collecte de dépôts stables', 'Diversifier les sources de funding (obligations, lignes de refinancement)'],
        enItems: ['Slow credit production if ratio > 120%', 'Develop stable deposit collection', 'Diversify funding sources (bonds, refinancing lines)'],
      },
      'ratio-rentabilite': {
        fr: 'Action Prioritaire : Restaurer la Rentabilité',
        en: 'Priority Action: Restore Profitability',
        frItems: ['Réduire les charges d\'exploitation via optimisation des processus', 'Diversifier les sources de revenus (commissions, services digitaux)', 'Établir un plan de retour à la rentabilité sur 18 mois'],
        enItems: ['Reduce operating costs via process optimization', 'Diversify revenue sources (fees, digital services)', 'Establish an 18-month return-to-profitability plan'],
      },
    };

    const specific = ratioTitles[worstId];
    if (specific) {
      recs.push({ title: isFr ? specific.fr : specific.en, items: isFr ? specific.frItems : specific.enItems });
    }
  }

  // General recommendation
  recs.push({
    title: isFr ? 'Optimisation Globale de la Conformité Prudentielle' : 'Global Prudential Compliance Optimization',
    items: isFr
      ? ['Mettre en place un tableau de bord mensuel des 8 ratios clés avec alertes automatiques', 'Désigner un Responsable Conformité Prudentielle dédié (reporting direct Conseil d\'Administration)', 'Planifier un audit externe des ratios prudentiels dans les 90 jours pour validation BCEAO']
      : ['Set up a monthly dashboard of 8 key ratios with automatic alerts', 'Designate a dedicated Prudential Compliance Officer (direct Board reporting)', 'Schedule an external prudential ratio audit within 90 days for BCEAO validation'],
  });

  return recs;
}

export const SOLVABILITY_QA: { question: string; answer: string }[] = [
  { question: 'Pourquoi le Ratio de Solvabilité est-il le plus important ?', answer: 'C\'est le ratio central du dispositif Bâle III / BCEAO. Il mesure la capacité de votre institution à absorber les pertes. Un ratio < 8% déclenche une mise sous administration provisoire par la BCEAO. En 2025, 4 banques UEMOA ont été sanctionnées pour insuffisance de solvabilité.' },
  { question: 'Que faire si mon Ratio Créances en Souffrance dépasse 5% ?', answer: 'Déclenchez immédiatement un plan de recouvrement accéléré. Renforcez le provisionnement IFRS 9 Stage 3. La BCEAO exige un plan de retour sous 5% dans les 12 mois. KHEPRA EXPERTS a accompagné 3 banques UEMOA dans ce processus.' },
  { question: 'À quelle fréquence dois-je calculer ces ratios ?', answer: 'La BCEAO exige un reporting trimestriel. Nous recommandons un suivi mensuel interne avec tableau de bord. Les ratios de liquidité doivent être suivis en hebdomadaire (LCR). Le ratio de levier est mensuel.' },
  { question: 'Ce simulateur remplace-t-il un audit prudentiel ?', answer: 'Non. Ce simulateur donne une estimation indicative basée sur vos réponses. Un audit prudentiel complet nécessite l\'analyse des états financiers certifiés, la revue des procédures internes et un contrôle sur place. KHEPRA EXPERTS est mandaté par la BCEAO pour ces missions.' },
];



