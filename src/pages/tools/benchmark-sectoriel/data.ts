import type { DiagnosticAxisConfig } from '../components/types';

const PRIMARY = '#0f766e';

export const BENCHMARK_SECTORIEL_AXES: DiagnosticAxisConfig[] = [
  {
    id: 'performance-financiere',
    titleFr: 'Performance Financière',
    titleEn: 'Financial Performance',
    descriptionFr: 'Rentabilité, croissance, efficacité du capital, liquidité, structure financière',
    descriptionEn: 'Profitability, growth, capital efficiency, liquidity, financial structure',
    icon: 'ri-funds-line',
    color: '#059669',
    weight: 25,
    questions: [
      {
        id: 'bs-pf-1',
        questionFr: 'Comment votre rentabilité (ROE, ROA, marge nette) se compare-t-elle à la moyenne de votre secteur ?',
        questionEn: 'How does your profitability (ROE, ROA, net margin) compare to your sector average?',
        options: [
          { value: 100, labelFr: 'Supérieure de plus de 20% à la moyenne sectorielle — leader de rentabilité', labelEn: 'More than 20% above sector average — profitability leader' },
          { value: 60, labelFr: 'Dans la moyenne sectorielle (±10%) — performance alignée', labelEn: 'Within sector average (±10%) — aligned performance' },
          { value: 25, labelFr: 'Inférieure de 20-50% à la moyenne sectorielle — sous-performance modérée', labelEn: '20-50% below sector average — moderate underperformance' },
          { value: 0, labelFr: 'Très inférieure (>50%) ou négative — sous-performance critique', labelEn: 'Significantly below (>50%) or negative — critical underperformance' },
        ],
      },
      {
        id: 'bs-pf-2',
        questionFr: 'Votre croissance du chiffre d\'affaires sur 3 ans est-elle supérieure, égale ou inférieure à celle de vos pairs ?',
        questionEn: 'Is your 3-year revenue growth higher, equal or lower than your peers?',
        options: [
          { value: 100, labelFr: 'Croissance > 15% par an, supérieure au marché — forte dynamique commerciale', labelEn: 'Growth > 15% per year, above market — strong commercial momentum' },
          { value: 60, labelFr: 'Croissance 5-15% — en ligne avec le marché', labelEn: 'Growth 5-15% — in line with market' },
          { value: 25, labelFr: 'Croissance 0-5% — stagnation relative', labelEn: 'Growth 0-5% — relative stagnation' },
          { value: 0, labelFr: 'Décroissance — perte de parts de marché', labelEn: 'Decline — loss of market share' },
        ],
      },
      {
        id: 'bs-pf-3',
        questionFr: 'Votre ratio d\'efficacité opérationnelle (coefficient d\'exploitation) est-il compétitif par rapport au benchmark sectoriel ?',
        questionEn: 'Is your operational efficiency ratio (cost-to-income) competitive compared to the sector benchmark?',
        options: [
          { value: 100, labelFr: 'Ratio < 50% — parmi les plus efficients du secteur', labelEn: 'Ratio < 50% — among the most efficient in the sector' },
          { value: 60, labelFr: 'Ratio 50-65% — bonne efficience, dans la norme sectorielle', labelEn: 'Ratio 50-65% — good efficiency, within sector norm' },
          { value: 25, labelFr: 'Ratio 65-80% — efficience à améliorer, coûts supérieurs à la moyenne', labelEn: 'Ratio 65-80% — efficiency to improve, above-average costs' },
          { value: 0, labelFr: 'Ratio > 80% — inefficience structurelle, risque de non-viabilité', labelEn: 'Ratio > 80% — structural inefficiency, viability risk' },
        ],
      },
      {
        id: 'bs-pf-4',
        questionFr: 'Votre structure financière (ratio d\'endettement, levier) est-elle optimale par rapport aux standards du secteur ?',
        questionEn: 'Is your financial structure (debt ratio, leverage) optimal compared to sector standards?',
        options: [
          { value: 100, labelFr: 'Structure financière optimale : levier maîtrisé, capacité d\'endettement préservée, notation favorable', labelEn: 'Optimal financial structure: controlled leverage, preserved debt capacity, favorable rating' },
          { value: 60, labelFr: 'Structure acceptable mais légèrement au-dessus de la moyenne sectorielle', labelEn: 'Acceptable structure but slightly above sector average' },
          { value: 25, labelFr: 'Surendettement modéré, ratio de levier supérieur aux normes prudentielles', labelEn: 'Moderate over-indebtedness, leverage ratio above prudential standards' },
          { value: 0, labelFr: 'Surendettement critique, risque de défaut, structure financière insoutenable', labelEn: 'Critical over-indebtedness, default risk, unsustainable financial structure' },
        ],
      },
    ],
  },
  {
    id: 'positionnement-marche',
    titleFr: 'Positionnement Marché',
    titleEn: 'Market Positioning',
    descriptionFr: 'Part de marché, différenciation, avantage concurrentiel, notoriété, fidélisation client',
    descriptionEn: 'Market share, differentiation, competitive advantage, brand awareness, customer loyalty',
    icon: 'ri-pie-chart-line',
    color: '#0ea5e9',
    weight: 25,
    questions: [
      {
        id: 'bs-pm-1',
        questionFr: 'Quelle est votre part de marché relative par rapport au leader de votre secteur ?',
        questionEn: 'What is your relative market share compared to your sector leader?',
        options: [
          { value: 100, labelFr: 'Leader du marché (> 30% de part) ou N°2 avec forte progression', labelEn: 'Market leader (> 30% share) or #2 with strong growth' },
          { value: 60, labelFr: 'Acteur significatif (10-30% de part) avec position établie', labelEn: 'Significant player (10-30% share) with established position' },
          { value: 25, labelFr: 'Acteur de niche (< 10% de part), position fragile', labelEn: 'Niche player (< 10% share), fragile position' },
          { value: 0, labelFr: 'Part de marché négligeable, pas de positionnement identifiable', labelEn: 'Negligible market share, no identifiable positioning' },
        ],
      },
      {
        id: 'bs-pm-2',
        questionFr: 'Votre proposition de valeur est-elle clairement différenciée de celle de vos concurrents directs ?',
        questionEn: 'Is your value proposition clearly differentiated from your direct competitors?',
        options: [
          { value: 100, labelFr: 'Différenciation forte et reconnue : innovation produit, service exclusif, positionnement unique validé par les clients', labelEn: 'Strong and recognized differentiation: product innovation, exclusive service, unique positioning validated by clients' },
          { value: 60, labelFr: 'Différenciation existante mais pas systématiquement communiquée ou perçue par le marché', labelEn: 'Existing differentiation but not systematically communicated or perceived by the market' },
          { value: 25, labelFr: 'Offre similaire aux concurrents, différenciation faible — concurrence principalement par les prix', labelEn: 'Offer similar to competitors, weak differentiation — mainly price competition' },
          { value: 0, labelFr: 'Aucune différenciation, offre commoditisée, risque de substitution élevé', labelEn: 'No differentiation, commoditized offer, high substitution risk' },
        ],
      },
      {
        id: 'bs-pm-3',
        questionFr: 'Votre taux de fidélisation client et votre NPS sont-ils supérieurs à la moyenne du secteur ?',
        questionEn: 'Is your customer retention rate and NPS above the sector average?',
        options: [
          { value: 100, labelFr: 'Taux de rétention > 90%, NPS > 50 — excellence relationnelle reconnue', labelEn: 'Retention rate > 90%, NPS > 50 — recognized relationship excellence' },
          { value: 60, labelFr: 'Rétention 75-90%, NPS 20-50 — bonne fidélisation, dans la norme', labelEn: 'Retention 75-90%, NPS 20-50 — good loyalty, within norm' },
          { value: 25, labelFr: 'Rétention 50-75%, NPS < 20 — attrition préoccupante', labelEn: 'Retention 50-75%, NPS < 20 — concerning attrition' },
          { value: 0, labelFr: 'Rétention < 50%, NPS négatif — défection massive, problème structurel', labelEn: 'Retention < 50%, negative NPS — massive defection, structural problem' },
        ],
      },
      {
        id: 'bs-pm-4',
        questionFr: 'Investissez-vous dans la notoriété de marque et le marketing de manière proportionnée par rapport à vos pairs ?',
        questionEn: 'Do you invest in brand awareness and marketing proportionately compared to your peers?',
        options: [
          { value: 100, labelFr: 'Budget marketing > 5% du CA, stratégie digitale mature, présence média cohérente, notoriété mesurée et en croissance', labelEn: 'Marketing budget > 5% revenue, mature digital strategy, coherent media presence, measured and growing awareness' },
          { value: 60, labelFr: 'Budget marketing 2-5% du CA, présence digitale établie, actions ponctuelles', labelEn: 'Marketing budget 2-5% revenue, established digital presence, ad hoc actions' },
          { value: 25, labelFr: 'Budget marketing < 2% du CA, présence digitale minimale, faible notoriété', labelEn: 'Marketing budget < 2% revenue, minimal digital presence, low awareness' },
          { value: 0, labelFr: 'Pas de budget marketing dédié, absence totale de stratégie de marque', labelEn: 'No dedicated marketing budget, total absence of brand strategy' },
        ],
      },
    ],
  },
  {
    id: 'efficacite-operationnelle',
    titleFr: 'Efficacité Opérationnelle',
    titleEn: 'Operational Efficiency',
    descriptionFr: 'Productivité, qualité de service, gestion des processus, chaîne d\'approvisionnement',
    descriptionEn: 'Productivity, service quality, process management, supply chain',
    icon: 'ri-settings-3-line',
    color: '#7c3aed',
    weight: 25,
    questions: [
      {
        id: 'bs-eo-1',
        questionFr: 'Votre productivité par employé (CA/ETP, valeur ajoutée/ETP) est-elle compétitive par rapport au benchmark sectoriel ?',
        questionEn: 'Is your productivity per employee (revenue/FTE, value added/FTE) competitive compared to the sector benchmark?',
        options: [
          { value: 100, labelFr: 'Productivité > 130% de la moyenne — équipes très performantes', labelEn: 'Productivity > 130% of average — very high-performing teams' },
          { value: 60, labelFr: 'Productivité dans la moyenne (90-110%) — performance standard', labelEn: 'Productivity within average (90-110%) — standard performance' },
          { value: 25, labelFr: 'Productivité 70-90% de la moyenne — sous-productivité modérée', labelEn: 'Productivity 70-90% of average — moderate under-productivity' },
          { value: 0, labelFr: 'Productivité < 70% de la moyenne — problème structurel de productivité', labelEn: 'Productivity < 70% of average — structural productivity problem' },
        ],
      },
      {
        id: 'bs-eo-2',
        questionFr: 'Avez-vous digitalisé et automatisé vos processus clés par rapport aux meilleures pratiques du secteur ?',
        questionEn: 'Have you digitized and automated your key processes compared to sector best practices?',
        options: [
          { value: 100, labelFr: 'Automatisation avancée : > 80% des processus digitalisés, RPA/AI déployé, zéro papier, dashboard temps réel', labelEn: 'Advanced automation: > 80% digitized processes, RPA/AI deployed, zero paper, real-time dashboard' },
          { value: 60, labelFr: 'Digitalisation partielle : 40-80% des processus, ERP en place, quelques workflows automatisés', labelEn: 'Partial digitization: 40-80% processes, ERP in place, some automated workflows' },
          { value: 25, labelFr: 'Digitalisation basique : < 40% des processus digitalisés, fort recours au papier/email', labelEn: 'Basic digitization: < 40% digitized processes, heavy paper/email reliance' },
          { value: 0, labelFr: 'Processus entièrement manuels, aucune digitalisation, perte de compétitivité', labelEn: 'Fully manual processes, no digitization, loss of competitiveness' },
        ],
      },
      {
        id: 'bs-eo-3',
        questionFr: 'Disposez-vous d\'une certification qualité (ISO 9001, ou équivalent sectoriel) et d\'une démarche d\'amélioration continue structurée ?',
        questionEn: 'Do you have a quality certification (ISO 9001, or sector equivalent) and a structured continuous improvement approach?',
        options: [
          { value: 100, labelFr: 'Certification ISO 9001 obtenue + démarche Lean/Six Sigma active, KPI qualité suivis, amélioration continue documentée', labelEn: 'ISO 9001 certification obtained + active Lean/Six Sigma, KPI quality monitoring, documented continuous improvement' },
          { value: 60, labelFr: 'Démarche qualité formalisée mais non certifiée, quelques outils d\'amélioration continue', labelEn: 'Formalized quality approach but not certified, some continuous improvement tools' },
          { value: 25, labelFr: 'Procédures qualité basiques, pas de démarche structurée, résolution de problèmes au cas par cas', labelEn: 'Basic quality procedures, no structured approach, ad hoc problem resolution' },
          { value: 0, labelFr: 'Aucune démarche qualité, pas de procédures documentées, approche artisanale', labelEn: 'No quality approach, no documented procedures, artisanal approach' },
        ],
      },
      {
        id: 'bs-eo-4',
        questionFr: 'Votre gestion de la chaîne d\'approvisionnement et vos relations fournisseurs sont-elles optimisées par rapport aux standards du secteur ?',
        questionEn: 'Is your supply chain management and supplier relations optimized compared to sector standards?',
        options: [
          { value: 100, labelFr: 'Supply chain intégrée : sourcing stratégique, évaluation fournisseurs, contrats cadres, gestion des risques fournisseurs, indicateurs de performance', labelEn: 'Integrated supply chain: strategic sourcing, supplier evaluation, framework contracts, supplier risk management, performance indicators' },
          { value: 60, labelFr: 'Gestion fournisseurs structurée mais processus d\'évaluation partiel, dépendance à quelques fournisseurs', labelEn: 'Structured supplier management but partial evaluation process, dependence on few suppliers' },
          { value: 25, labelFr: 'Gestion fournisseurs informelle, pas de procédure d\'évaluation, risque de rupture', labelEn: 'Informal supplier management, no evaluation procedure, disruption risk' },
          { value: 0, labelFr: 'Pas de gestion fournisseurs, dépendance critique non maîtrisée, prix non optimisés', labelEn: 'No supplier management, uncontrolled critical dependence, unoptimized prices' },
        ],
      },
    ],
  },
  {
    id: 'innovation-digital',
    titleFr: 'Innovation & Digital',
    titleEn: 'Innovation & Digital',
    descriptionFr: 'R&D, transformation digitale, culture d\'innovation, partenariats tech, cybersécurité',
    descriptionEn: 'R&D, digital transformation, innovation culture, tech partnerships, cybersecurity',
    icon: 'ri-rocket-2-line',
    color: '#dc2626',
    weight: 25,
    questions: [
      {
        id: 'bs-id-1',
        questionFr: 'Quel pourcentage de votre CA est réinvesti en R&D et innovation par rapport à la moyenne sectorielle ?',
        questionEn: 'What percentage of your revenue is reinvested in R&D and innovation compared to the sector average?',
        options: [
          { value: 100, labelFr: 'Investissement R&D > 5% du CA, portefeuille de projets d\'innovation actif, dépôts de brevets/PI', labelEn: 'R&D investment > 5% revenue, active innovation project portfolio, patent/IP filings' },
          { value: 60, labelFr: 'Investissement R&D 2-5% du CA, quelques projets d\'innovation en cours', labelEn: 'R&D investment 2-5% revenue, some ongoing innovation projects' },
          { value: 25, labelFr: 'Investissement R&D < 2% du CA, innovation ponctuelle non structurée', labelEn: 'R&D investment < 2% revenue, ad hoc unstructured innovation' },
          { value: 0, labelFr: 'Aucun investissement en R&D, absence totale de démarche d\'innovation', labelEn: 'No R&D investment, total absence of innovation approach' },
        ],
      },
      {
        id: 'bs-id-2',
        questionFr: 'Votre maturité digitale (cloud, data analytics, IA, cybersécurité) est-elle au niveau des leaders de votre secteur ?',
        questionEn: 'Is your digital maturity (cloud, data analytics, AI, cybersecurity) at the level of your sector leaders?',
        options: [
          { value: 100, labelFr: 'Cloud-native, data-driven, IA en production, cybersécurité certifiée ISO 27001 — niveau leader', labelEn: 'Cloud-native, data-driven, AI in production, ISO 27001 certified cybersecurity — leader level' },
          { value: 60, labelFr: 'Migration cloud en cours, analytics déployés, sécurité standard — niveau intermédiaire', labelEn: 'Cloud migration ongoing, analytics deployed, standard security — intermediate level' },
          { value: 25, labelFr: 'Infrastructure on-premise majoritaire, peu d\'analytics, sécurité de base — retard modéré', labelEn: 'Mostly on-premise infrastructure, little analytics, basic security — moderate lag' },
          { value: 0, labelFr: 'Aucune stratégie digitale, infrastructure obsolète, vulnérabilités majeures', labelEn: 'No digital strategy, obsolete infrastructure, major vulnerabilities' },
        ],
      },
    ],
  },
];

export function getBenchmarkSectorielScoreColor(score: number): string {
  if (score >= 80) return '#059669';
  if (score >= 60) return '#0ea5e9';
  if (score >= 40) return '#d97706';
  return '#dc2626';
}

export function getBenchmarkSectorielScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Leader Sectoriel' : 'Sector Leader';
  if (score >= 60) return isFr ? 'Dans la Moyenne Haute' : 'Above Average';
  if (score >= 40) return isFr ? 'Dans la Moyenne Basse' : 'Below Average';
  return isFr ? 'Retard Significatif' : 'Significant Lag';
}

export function getBenchmarkSectorielLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr ? 'Niveau 4 — Leader' : 'Level 4 — Leader';
  if (score >= 60) return isFr ? 'Niveau 3 — Performant' : 'Level 3 — Performer';
  if (score >= 40) return isFr ? 'Niveau 2 — En Rattrapage' : 'Level 2 — Catching Up';
  return isFr ? 'Niveau 1 — Décrocheur' : 'Level 1 — Laggard';
}

export function getBenchmarkSectorielReadiness(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 80) return isFr
    ? 'Votre organisation surperforme par rapport à son secteur. Continuez à investir dans l\'innovation et la différenciation pour maintenir cette avance.'
    : 'Your organization outperforms its sector. Continue investing in innovation and differentiation to maintain this lead.';
  if (score >= 60) return isFr
    ? 'Votre organisation se situe dans la moyenne haute. Des actions ciblées sur les axes les plus faibles vous permettront de rejoindre le peloton de tête.'
    : 'Your organization is in the upper average. Targeted actions on the weakest axes will allow you to join the leaders.';
  if (score >= 40) return isFr
    ? 'Votre organisation est en retard sur plusieurs axes stratégiques. Un plan de transformation est nécessaire pour combler les écarts concurrentiels.'
    : 'Your organization lags on several strategic axes. A transformation plan is needed to close competitive gaps.';
  return isFr
    ? 'Votre organisation accuse un retard significatif qui menace sa compétitivité. Une remise à niveau urgente est indispensable.'
    : 'Your organization shows a significant lag that threatens its competitiveness. Urgent upgrading is essential.';
}

export function getBenchmarkSectorielRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];
  const pfScore = perAxis['performance-financiere'] ?? 0;
  const pmScore = perAxis['positionnement-marche'] ?? 0;
  const eoScore = perAxis['efficacite-operationnelle'] ?? 0;
  const idScore = perAxis['innovation-digital'] ?? 0;

  if (pfScore < 50) risks.push(isFr
    ? 'RISQUE ÉLEVÉ — Performance financière inférieure au secteur : rentabilité, croissance ou structure financière non compétitives, risque de perte d\'attractivité pour les investisseurs'
    : 'HIGH RISK — Below-sector financial performance: non-competitive profitability, growth or financial structure, risk of investor attractiveness loss');
  if (pmScore < 50) risks.push(isFr
    ? 'RISQUE ÉLEVÉ — Positionnement marché fragile : faible part de marché, différenciation insuffisante, attrition client — risque de marginalisation concurrentielle'
    : 'HIGH RISK — Fragile market positioning: low market share, insufficient differentiation, customer attrition — competitive marginalization risk');
  if (eoScore < 50) risks.push(isFr
    ? 'RISQUE MAJEUR — Efficacité opérationnelle dégradée : productivité inférieure, processus non digitalisés, pas de démarche qualité — coûts excessifs et qualité de service insuffisante'
    : 'MAJOR RISK — Degraded operational efficiency: lower productivity, non-digitized processes, no quality approach — excessive costs and insufficient service quality');
  if (idScore < 50) risks.push(isFr
    ? 'RISQUE CRITIQUE — Absence d\'innovation : pas de R&D, maturité digitale insuffisante — risque d\'obsolescence face aux concurrents qui innovent'
    : 'CRITICAL RISK — Absence of innovation: no R&D, insufficient digital maturity — obsolescence risk against innovating competitors');

  return risks;
}

export function getBenchmarkSectorielRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis?: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis?: string; items: string[] }[] = [];
  const pfScore = perAxis['performance-financiere'] ?? 0;
  const pmScore = perAxis['positionnement-marche'] ?? 0;
  const eoScore = perAxis['efficacite-operationnelle'] ?? 0;
  const idScore = perAxis['innovation-digital'] ?? 0;

  if (pfScore < 60) recs.push({ title: isFr ? 'Optimiser la performance financière' : 'Optimize financial performance', axis: 'performance-financiere', items: isFr ? ['Analyser les leviers de rentabilité par produit/client pour réallouer les ressources', 'Optimiser la structure de coûts en benchmarkant les ratios du secteur', 'Revoir la structure financière pour réduire le coût du capital'] : ['Analyze profitability drivers by product/client to reallocate resources', 'Optimize cost structure by benchmarking sector ratios', 'Review financial structure to reduce cost of capital'] });
  if (pmScore < 60) recs.push({ title: isFr ? 'Renforcer le positionnement marché' : 'Strengthen market positioning', axis: 'positionnement-marche', items: isFr ? ['Définir une stratégie de différenciation claire et la communiquer au marché', 'Investir dans des programmes de fidélisation pour réduire l\'attrition', 'Allouer un budget marketing proportionné pour renforcer la notoriété'] : ['Define a clear differentiation strategy and communicate it to the market', 'Invest in loyalty programs to reduce attrition', 'Allocate a proportionate marketing budget to strengthen awareness'] });
  if (eoScore < 60) recs.push({ title: isFr ? 'Améliorer l\'efficacité opérationnelle' : 'Improve operational efficiency', axis: 'efficacite-operationnelle', items: isFr ? ['Lancer un programme de digitalisation des processus prioritaires', 'Engager une démarche de certification qualité (ISO 9001 ou sectorielle)', 'Mettre en place des indicateurs de productivité et des objectifs d\'amélioration'] : ['Launch a priority process digitization program', 'Engage a quality certification approach (ISO 9001 or sectoral)', 'Implement productivity indicators and improvement objectives'] });
  if (idScore < 60) recs.push({ title: isFr ? 'Accélérer l\'innovation' : 'Accelerate innovation', axis: 'innovation-digital', items: isFr ? ['Allouer un budget R&D dédié avec des objectifs de retour sur investissement', 'Définir une roadmap de transformation digitale sur 3 ans', 'Établir des partenariats technologiques pour accélérer l\'adoption de l\'IA et du cloud'] : ['Allocate dedicated R&D budget with ROI objectives', 'Define a 3-year digital transformation roadmap', 'Establish technology partnerships to accelerate AI and cloud adoption'] });

  if (recs.length === 0) recs.push({ title: isFr ? 'Consolider le leadership sectoriel' : 'Consolidate sector leadership', items: isFr ? ['Investir dans l\'innovation de rupture pour creuser l\'écart', 'Partager votre expertise via des publications et conférences sectorielles', 'Explorer des opportunités de croissance externe (acquisitions, alliances)'] : ['Invest in disruptive innovation to widen the gap', 'Share your expertise through sector publications and conferences', 'Explore external growth opportunities (acquisitions, alliances)'] });

  return recs;
}