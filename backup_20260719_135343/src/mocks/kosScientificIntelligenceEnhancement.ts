// KOS Scientific Intelligence Enhancement Program™ — Master Prompt Big Four
// Renforcement des compétences des agents et automates KOS avec les IA avancées de recherche scientifique

export interface ScientificIaModel {
  model: string;
  provider: string;
  type: 'reasoning' | 'academic';
  mission: string;
  capabilities: string[];
  useCases: string[];
  color: string;
  icon: string;
}

export interface MethodologyStep {
  step: number;
  name: string;
  description: string;
  requirements: string[];
  icon: string;
  color: string;
}

export interface EconometricSkill {
  name: string;
  category: 'model' | 'validation' | 'livrable';
  tools: string[];
  maturity: number;
  icon: string;
  color: string;
}

export interface FinancialModelSkill {
  name: string;
  description: string;
  standard: string;
  maturity: number;
  icon: string;
  color: string;
}

export interface SurveillanceInstitution {
  name: string;
  type: 'financial' | 'academic';
  country: string;
  domain: string;
  icon: string;
  color: string;
}

export interface EsgFramework {
  name: string;
  fullName: string;
  description: string;
  icon: string;
  color: string;
}

export interface ValidationAgent {
  id: string;
  name: string;
  tools: string[];
  role: string;
  icon: string;
  color: string;
}

export interface AntiHallucinationRule {
  type: 'interdiction' | 'obligation';
  rule: string;
  icon: string;
  color: string;
}

export interface ScientificMaturityKPI {
  id: string;
  name: string;
  category: 'research' | 'analysis' | 'impact';
  current: number;
  target: number;
  unit: string;
  trend: number;
  icon: string;
  color: string;
  subMetrics?: { label: string; value: number; target: number }[];
}

export interface ScientificBlock {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  status: 'deployed' | 'in_progress' | 'planned';
  maturity: number;
  agentsCovered: number;
  agentsTotal: number;
  metrics: { label: string; value: string; icon: string }[];
}

export const SCIENTIFIC_BLOCKS: ScientificBlock[] = [
  {
    id: 1,
    number: '01',
    title: 'Cartographie des IA de Raisonnement',
    subtitle: 'ChatGPT · Claude · Gemini — Analyse stratégique, modélisation, recherche',
    description: 'Identification et documentation systématique des capacités de chaque IA de raisonnement pour le conseil Big Four. ChatGPT pour le raisonnement complexe, la modélisation financière et les scénarios économiques. Claude pour le traitement documentaire massif et l\'analyse réglementaire (BCEAO, OHADA, UEMOA). Gemini pour la veille web, la recherche multimodale et la surveillance sectorielle.',
    icon: 'ri-cpu-line',
    color: '#F59E0B',
    status: 'deployed',
    maturity: 92,
    agentsCovered: 75,
    agentsTotal: 75,
    metrics: [
      { label: 'IA raisonnement cartographiées', value: '3', icon: 'ri-cpu-line' },
      { label: 'Capacités documentées', value: '18', icon: 'ri-file-list-3-line' },
      { label: 'Cas d\'usage KHEPRA', value: '13', icon: 'ri-building-2-line' },
      { label: 'Agents formés', value: '75/75', icon: 'ri-team-line' },
    ],
  },
  {
    id: 2,
    number: '02',
    title: 'IA de Recherche Académique',
    subtitle: 'Consensus · Elicit · SciSpace · Semantic Scholar · Research Rabbit · Connected Papers',
    description: 'Cartographie complète des 6 outils d\'IA de recherche académique les plus avancés. Consensus pour identifier le consensus scientifique et extraire les conclusions d\'études. Elicit pour automatiser les revues de littérature. SciSpace pour analyser les méthodologies. Semantic Scholar pour la recherche bibliographique et l\'analyse des citations. Research Rabbit pour la cartographie des chercheurs. Connected Papers pour la cartographie des connaissances.',
    icon: 'ri-flask-line',
    color: '#8B5CF6',
    status: 'deployed',
    maturity: 85,
    agentsCovered: 68,
    agentsTotal: 75,
    metrics: [
      { label: 'Outils académiques', value: '6', icon: 'ri-tools-line' },
      { label: 'Publications accessibles', value: '214M+', icon: 'ri-article-line' },
      { label: 'Agents certifiés', value: '68/75', icon: 'ri-award-line' },
      { label: 'Revues littérature/jour', value: '24', icon: 'ri-book-open-line' },
    ],
  },
  {
    id: 3,
    number: '03',
    title: 'Méthodologie Scientifique Obligatoire',
    subtitle: 'Recherche documentaire · Analyse comparative · Évaluation critique · Synthèse',
    description: 'Protocole rigoureux en 4 étapes avant toute conclusion. Étape 1 : recherche documentaire avec minimum 20 publications pertinentes. Étape 2 : analyse comparative identifiant convergences, divergences et limites méthodologiques. Étape 3 : évaluation critique de la robustesse, taille d\'échantillon, validité statistique et récence. Étape 4 : synthèse produisant consensus scientifique, controverses et implications pratiques.',
    icon: 'ri-test-tube-line',
    color: '#10B981',
    status: 'deployed',
    maturity: 89,
    agentsCovered: 71,
    agentsTotal: 75,
    metrics: [
      { label: 'Publications min. requises', value: '20', icon: 'ri-bookmark-line' },
      { label: 'Agents conformes', value: '71/75', icon: 'ri-shield-check-line' },
      { label: 'Score rigueur', value: '94%', icon: 'ri-check-double-line' },
      { label: 'Temps moyen protocole', value: '4.2h', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 4,
    number: '04',
    title: 'Économétrie et Modélisation',
    subtitle: 'Régressions · Logit/Probit · Panel · Séries temporelles · VAR · ARIMA',
    description: 'Formation intensive des agents KOS aux modèles économétriques avancés : régressions linéaires, modèles logit/probit, données de panel, séries temporelles, VAR, ARIMA. Validation systématique de la multicolinéarité, autocorrélation, hétéroscédasticité et significativité. Production de livrables avec interprétation, recommandations et visualisations.',
    icon: 'ri-line-chart-line',
    color: '#0EA5E9',
    status: 'in_progress',
    maturity: 78,
    agentsCovered: 49,
    agentsTotal: 75,
    metrics: [
      { label: 'Modèles maîtrisés', value: '6', icon: 'ri-function-line' },
      { label: 'Tests validation', value: '4', icon: 'ri-checkbox-multiple-line' },
      { label: 'Agents formés', value: '49/75', icon: 'ri-team-line' },
      { label: 'Précision modèles', value: '91%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 5,
    number: '05',
    title: 'Modélisation Financière',
    subtitle: 'DCF · VAN · TRI · Monte Carlo · Scoring Crédit · Analyse Sensibilité',
    description: 'Capacités de modélisation financière conformes aux standards CFA Institute et International Valuation Standards Council. Discounted Cash Flow, Valeur Actuelle Nette, Taux de Rendement Interne, simulations Monte Carlo, scoring de crédit et analyses de sensibilité. Chaque livrable respecte les normes internationales d\'évaluation.',
    icon: 'ri-funds-line',
    color: '#EF4444',
    status: 'deployed',
    maturity: 88,
    agentsCovered: 62,
    agentsTotal: 75,
    metrics: [
      { label: 'Méthodes maîtrisées', value: '6', icon: 'ri-calculator-line' },
      { label: 'Standards alignés', value: 'CFA+IVSC', icon: 'ri-scales-3-line' },
      { label: 'Agents certifiés', value: '62/75', icon: 'ri-award-line' },
      { label: 'Précision VAN', value: '±2.1%', icon: 'ri-focus-line' },
    ],
  },
  {
    id: 6,
    number: '06',
    title: 'Veille Stratégique Mondiale',
    subtitle: 'World Bank · IMF · AfDB · BCEAO · Harvard · MIT · INSEAD · HEC Paris',
    description: 'Surveillance continue des institutions financières internationales (Banque Mondiale, FMI, BAD, BCEAO) et des institutions académiques de référence (Harvard Business School, MIT Sloan, INSEAD, HEC Paris). Intégration systématique des rapports, études et données dans les analyses KOS.',
    icon: 'ri-globe-line',
    color: '#EC4899',
    status: 'in_progress',
    maturity: 81,
    agentsCovered: 55,
    agentsTotal: 75,
    metrics: [
      { label: 'Institutions surveillées', value: '8', icon: 'ri-building-4-line' },
      { label: 'Rapports intégrés/mois', value: '340', icon: 'ri-file-chart-line' },
      { label: 'Alertes veille/jour', value: '28', icon: 'ri-notification-3-line' },
      { label: 'Couverture géographique', value: '54 pays', icon: 'ri-earth-line' },
    ],
  },
  {
    id: 7,
    number: '07',
    title: 'ESG et Développement Durable',
    subtitle: 'ISSB · GRI · TCFD — Analyses, matrices de matérialité, risques',
    description: 'Intégration systématique des référentiels ESG internationaux : International Sustainability Standards Board (ISSB), Global Reporting Initiative (GRI), Task Force on Climate-related Financial Disclosures (TCFD). Production d\'analyses ESG complètes, matrices de matérialité et cartographies de risques climatiques et sociaux.',
    icon: 'ri-leaf-line',
    color: '#14B8A6',
    status: 'deployed',
    maturity: 86,
    agentsCovered: 60,
    agentsTotal: 75,
    metrics: [
      { label: 'Référentiels intégrés', value: '3', icon: 'ri-scales-3-line' },
      { label: 'Analyses ESG/mois', value: '45', icon: 'ri-bar-chart-box-line' },
      { label: 'Agents formés', value: '60/75', icon: 'ri-team-line' },
      { label: 'Score conformité', value: '93%', icon: 'ri-shield-check-line' },
    ],
  },
  {
    id: 8,
    number: '08',
    title: 'Validation Croisée Multi-IA',
    subtitle: '4 agents : Recherche · Analyse Critique · Vérification Sources · Contrôle Qualité',
    description: 'Protocole de validation croisée obligatoire avant toute production stratégique. Agent 1 : Recherche scientifique (Consensus, Elicit). Agent 2 : Analyse critique (Claude, ChatGPT). Agent 3 : Vérification des sources (Gemini, Semantic Scholar). Agent 4 : Contrôle qualité final (ChatGPT, Claude). Aucun livrable stratégique ne quitte KOS sans cette quadruple validation.',
    icon: 'ri-git-branch-line',
    color: '#6366F1',
    status: 'deployed',
    maturity: 91,
    agentsCovered: 72,
    agentsTotal: 75,
    metrics: [
      { label: 'Agents validation', value: '4', icon: 'ri-team-line' },
      { label: 'IA mobilisées', value: '7', icon: 'ri-cpu-line' },
      { label: 'Validation systématique', value: '100%', icon: 'ri-check-double-line' },
      { label: 'Délai validation', value: '1.8h', icon: 'ri-timer-line' },
    ],
  },
  {
    id: 9,
    number: '09',
    title: 'Lutte Contre les Hallucinations',
    subtitle: '4 interdictions absolues · 5 obligations documentaires',
    description: 'Politique zéro tolérance : interdiction absolue d\'inventer une source, une statistique, une étude ou une référence réglementaire. Pour chaque affirmation : source, auteur, année, lien et niveau de confiance obligatoires. Traçabilité complète de la chaîne documentaire avec scoring de fiabilité automatisé.',
    icon: 'ri-shield-flash-line',
    color: '#F97316',
    status: 'deployed',
    maturity: 94,
    agentsCovered: 75,
    agentsTotal: 75,
    metrics: [
      { label: 'Interdictions absolues', value: '4', icon: 'ri-forbid-line' },
      { label: 'Obligations source', value: '5', icon: 'ri-file-list-3-line' },
      { label: 'Taux hallucination', value: '1.2%', icon: 'ri-alert-line' },
      { label: 'Score traçabilité', value: '99.1%', icon: 'ri-footprint-line' },
    ],
  },
  {
    id: 10,
    number: '10',
    title: 'KPI de Maturité Scientifique',
    subtitle: 'Recherche · Analyse · Impact — 9 indicateurs, dashboard temps réel',
    description: 'Mesure continue de la maturité scientifique KOS sur 3 axes : Recherche (études exploitées, qualité sources, taux citations), Analyse (exactitude, cohérence, robustesse) et Impact (missions générées, publications produites, trafic SEO/GEO, visibilité IA). Dashboard temps réel avec projections Big Four.',
    icon: 'ri-dashboard-3-line',
    color: '#78716C',
    status: 'deployed',
    maturity: 87,
    agentsCovered: 75,
    agentsTotal: 75,
    metrics: [
      { label: 'Axes KPIs', value: '3', icon: 'ri-stack-line' },
      { label: 'Indicateurs actifs', value: '9', icon: 'ri-bar-chart-2-line' },
      { label: 'Publications/an', value: '1,240', icon: 'ri-article-line' },
      { label: 'Score maturité', value: '87/100', icon: 'ri-medal-line' },
    ],
  },
];

export const SCIENTIFIC_IA_REASONING: ScientificIaModel[] = [
  {
    model: 'ChatGPT',
    provider: 'OpenAI',
    type: 'reasoning',
    mission: 'Raisonnement complexe, modélisation financière et analyse stratégique',
    capabilities: ['Raisonnement complexe', 'Modélisation financière', 'Scénarios économiques', 'Analyse stratégique', 'Rédaction exécutive', 'Synthèse décisionnelle'],
    useCases: ['Plans stratégiques', 'Business plans', 'Études de faisabilité', 'Rapports d\'investissement'],
    color: '#10A37F',
    icon: 'ri-openai-line',
  },
  {
    model: 'Claude',
    provider: 'Anthropic',
    type: 'reasoning',
    mission: 'Traitement documentaire massif et analyse réglementaire approfondie',
    capabilities: ['Traitement documentaire massif', 'Synthèses complexes', 'Recherche qualitative', 'Analyse réglementaire'],
    useCases: ['BCEAO', 'OHADA', 'UEMOA', 'Lois nationales', 'Directives internationales'],
    color: '#D97706',
    icon: 'ri-brain-line',
  },
  {
    model: 'Gemini',
    provider: 'Google',
    type: 'reasoning',
    mission: 'Veille web, recherche multimodale et surveillance sectorielle',
    capabilities: ['Veille web', 'Recherche multimodale', 'Surveillance sectorielle', 'Analyse de tendances'],
    useCases: ['Intelligence économique', 'Veille concurrentielle', 'Veille technologique'],
    color: '#4285F4',
    icon: 'ri-google-line',
  },
];

export const SCIENTIFIC_IA_ACADEMIC: ScientificIaModel[] = [
  {
    model: 'Consensus',
    provider: 'Consensus NLP',
    type: 'academic',
    mission: 'Identifier le consensus scientifique et extraire les conclusions des études',
    capabilities: ['Synthèse de consensus', 'Extraction de conclusions', 'Recherche sémantique', 'Analyse de méta-études'],
    useCases: ['ESG', 'Finance durable', 'Gouvernance', 'Politiques publiques'],
    color: '#10B981',
    icon: 'ri-scales-3-line',
  },
  {
    model: 'Elicit',
    provider: 'Elicit (Ought)',
    type: 'academic',
    mission: 'Automatiser les revues de littérature et construire des synthèses scientifiques',
    capabilities: ['Revue de littérature', 'Synthèse automatique', 'Extraction de données', 'Classification d\'études'],
    useCases: ['Économétrie', 'Finance', 'Stratégie', 'Recherche appliquée'],
    color: '#8B5CF6',
    icon: 'ri-book-read-line',
  },
  {
    model: 'SciSpace',
    provider: 'Typeset',
    type: 'academic',
    mission: 'Expliquer les articles scientifiques et analyser les méthodologies',
    capabilities: ['Explication d\'articles', 'Analyse méthodologique', 'Chat avec PDF', 'Comparaison d\'études'],
    useCases: ['Recherche appliquée', 'Modélisation', 'Méthodologies quantitatives'],
    color: '#0EA5E9',
    icon: 'ri-microscope-line',
  },
  {
    model: 'Semantic Scholar',
    provider: 'Allen Institute for AI',
    type: 'academic',
    mission: 'Recherche bibliographique et analyse des citations académiques',
    capabilities: ['Recherche bibliographique', 'Analyse de citations', 'Identification d\'experts', 'Cartographie thématique'],
    useCases: ['Benchmark académique', 'Identification d\'experts', 'Veille scientifique'],
    color: '#EC4899',
    icon: 'ri-search-eye-line',
  },
  {
    model: 'Research Rabbit',
    provider: 'Research Rabbit',
    type: 'academic',
    mission: 'Cartographie des chercheurs et des réseaux scientifiques',
    capabilities: ['Cartographie chercheurs', 'Réseaux scientifiques', 'Recommandations personnalisées', 'Collections partagées'],
    useCases: ['Veille académique', 'Partenariats universitaires', 'Cartographie d\'expertise'],
    color: '#F97316',
    icon: 'ri-user-shared-line',
  },
  {
    model: 'Connected Papers',
    provider: 'Connected Papers',
    type: 'academic',
    mission: 'Cartographie des connaissances — état de l\'art et recherche avancée',
    capabilities: ['Cartographie connaissances', 'Graphes de similarité', 'Travaux antérieurs', 'Travaux dérivés'],
    useCases: ['État de l\'art', 'Recherche avancée', 'Exploration thématique'],
    color: '#14B8A6',
    icon: 'ri-node-tree',
  },
];

export const SCIENTIFIC_METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    step: 1,
    name: 'Recherche Documentaire',
    description: 'Identification et collecte d\'un minimum de 20 publications pertinentes. Consultation des bases académiques, rapports institutionnels et littérature grise. Aucune limitation de périmètre disciplinaire.',
    requirements: ['20+ publications pertinentes', 'Couverture multidisciplinaire', 'Sources primaires et secondaires', 'Période : 5 ans minimum'],
    icon: 'ri-search-line',
    color: '#0EA5E9',
  },
  {
    step: 2,
    name: 'Analyse Comparative',
    description: 'Identification systématique des convergences, divergences et limites méthodologiques entre les études. Cartographie des contradictions et des zones de consensus.',
    requirements: ['Matrice de convergence', 'Identification des divergences', 'Analyse des limites', 'Confrontation des résultats'],
    icon: 'ri-arrow-left-right-line',
    color: '#8B5CF6',
  },
  {
    step: 3,
    name: 'Évaluation Critique',
    description: 'Mesure de la robustesse méthodologique : taille d\'échantillon, validité statistique, récence des données. Pondération des études selon leur qualité scientifique.',
    requirements: ['Score de robustesse', 'Taille d\'échantillon', 'Validité statistique', 'Récence (< 5 ans idéal)'],
    icon: 'ri-shield-check-line',
    color: '#F59E0B',
  },
  {
    step: 4,
    name: 'Synthèse',
    description: 'Production d\'une synthèse structurée : consensus scientifique établi, controverses persistantes, implications pratiques pour le client. Niveau de confiance par assertion.',
    requirements: ['Consensus documenté', 'Controverses explicites', 'Implications pratiques', 'Niveau de confiance'],
    icon: 'ri-file-text-line',
    color: '#10B981',
  },
];

export const SCIENTIFIC_ECONOMETRIC_SKILLS: EconometricSkill[] = [
  { name: 'Régressions Linéaires', category: 'model', tools: ['MCO', 'MCO robustes', 'WLS'], maturity: 88, icon: 'ri-arrow-up-down-line', color: '#0EA5E9' },
  { name: 'Modèles Logit/Probit', category: 'model', tools: ['Logit', 'Probit', 'Effets marginaux'], maturity: 82, icon: 'ri-braces-line', color: '#8B5CF6' },
  { name: 'Données de Panel', category: 'model', tools: ['Effets fixes', 'Effets aléatoires', 'Hausman'], maturity: 76, icon: 'ri-table-line', color: '#10B981' },
  { name: 'Séries Temporelles', category: 'model', tools: ['Stationnarité', 'Cointégration', 'ECM'], maturity: 74, icon: 'ri-timeline-view', color: '#F59E0B' },
  { name: 'VAR', category: 'model', tools: ['VAR', 'Impulsion', 'Décomposition variance'], maturity: 68, icon: 'ri-pulse-line', color: '#EF4444' },
  { name: 'ARIMA', category: 'model', tools: ['ARIMA', 'SARIMA', 'Prévision'], maturity: 71, icon: 'ri-line-chart-line', color: '#EC4899' },
  { name: 'Multicolinéarité', category: 'validation', tools: ['VIF', 'Corrélation', 'Régularisation'], maturity: 85, icon: 'ri-contrast-line', color: '#14B8A6' },
  { name: 'Autocorrélation', category: 'validation', tools: ['Durbin-Watson', 'Breusch-Godfrey', 'Newey-West'], maturity: 79, icon: 'ri-git-branch-line', color: '#6366F1' },
  { name: 'Hétéroscédasticité', category: 'validation', tools: ['Breusch-Pagan', 'White', 'WLS'], maturity: 78, icon: 'ri-shapes-line', color: '#F97316' },
  { name: 'Interprétation', category: 'livrable', tools: ['Marges', 'Élasticités', 'Simulations'], maturity: 83, icon: 'ri-file-chart-line', color: '#78716C' },
  { name: 'Recommandations', category: 'livrable', tools: ['Implications', 'Scénarios', 'Décision'], maturity: 86, icon: 'ri-lightbulb-line', color: '#F59E0B' },
  { name: 'Visualisations', category: 'livrable', tools: ['Graphiques', 'Tableaux', 'Dashboards'], maturity: 81, icon: 'ri-pie-chart-line', color: '#10B981' },
];

export const SCIENTIFIC_FINANCIAL_SKILLS: FinancialModelSkill[] = [
  { name: 'Discounted Cash Flow', description: 'Valorisation par actualisation des flux de trésorerie futurs. Projections à 5-10 ans, taux d\'actualisation WACC.', standard: 'CFA Institute', maturity: 91, icon: 'ri-cash-line', color: '#10B981' },
  { name: 'Valeur Actuelle Nette', description: 'Calcul de la VAN pour évaluer la rentabilité des projets d\'investissement. Seuil de décision explicite.', standard: 'CFA Institute', maturity: 89, icon: 'ri-money-dollar-circle-line', color: '#0EA5E9' },
  { name: 'Taux de Rendement Interne', description: 'Détermination du TRI pour comparer les projets. Analyse multi-scénarios et sensibilité.', standard: 'CFA Institute', maturity: 87, icon: 'ri-percent-line', color: '#8B5CF6' },
  { name: 'Simulation Monte Carlo', description: 'Modélisation stochastique pour l\'analyse de risques. 10 000+ itérations, distributions paramétriques.', standard: 'IVSC', maturity: 76, icon: 'ri-dice-line', color: '#F59E0B' },
  { name: 'Scoring de Crédit', description: 'Modèles de scoring avancés intégrant ratios financiers, données sectorielles et historiques de défaut.', standard: 'Bâle III / IVSC', maturity: 82, icon: 'ri-bar-chart-box-line', color: '#EF4444' },
  { name: 'Analyse de Sensibilité', description: 'Tests de stress sur variables clés. Tornado charts, analyses de seuil, scénarios optimiste/pessimiste.', standard: 'CFA Institute', maturity: 84, icon: 'ri-radar-line', color: '#EC4899' },
];

export const SCIENTIFIC_SURVEILLANCE_INSTITUTIONS: SurveillanceInstitution[] = [
  { name: 'World Bank', type: 'financial', country: 'International', domain: 'Développement économique', icon: 'ri-building-2-line', color: '#0052CC' },
  { name: 'International Monetary Fund', type: 'financial', country: 'International', domain: 'Stabilité financière mondiale', icon: 'ri-bank-line', color: '#003087' },
  { name: 'African Development Bank', type: 'financial', country: 'Afrique', domain: 'Développement Afrique', icon: 'ri-global-line', color: '#007A3D' },
  { name: 'BCEAO', type: 'financial', country: 'UEMOA', domain: 'Politique monétaire', icon: 'ri-bank-card-line', color: '#C8A951' },
  { name: 'Harvard Business School', type: 'academic', country: 'USA', domain: 'Stratégie & Leadership', icon: 'ri-graduation-cap-line', color: '#A51C30' },
  { name: 'MIT Sloan', type: 'academic', country: 'USA', domain: 'Innovation & Technologie', icon: 'ri-microscope-line', color: '#A31F34' },
  { name: 'INSEAD', type: 'academic', country: 'France/Singapour', domain: 'Business International', icon: 'ri-earth-line', color: '#005A8B' },
  { name: 'HEC Paris', type: 'academic', country: 'France', domain: 'Finance & Management', icon: 'ri-briefcase-line', color: '#1E3A5F' },
];

export const SCIENTIFIC_ESG_FRAMEWORKS: EsgFramework[] = [
  { name: 'ISSB', fullName: 'International Sustainability Standards Board', description: 'Normes globales de reporting développement durable. IFRS S1 (exigences générales) et IFRS S2 (informations climatiques).', icon: 'ri-scales-3-line', color: '#10B981' },
  { name: 'GRI', fullName: 'Global Reporting Initiative', description: 'Cadre de reporting ESG le plus utilisé mondialement. Standards universels, sectoriels et thématiques pour la transparence extra-financière.', icon: 'ri-file-list-3-line', color: '#8B5CF6' },
  { name: 'TCFD', fullName: 'Task Force on Climate-related Financial Disclosures', description: 'Recommandations sur la gouvernance climat, stratégie, gestion des risques, indicateurs et objectifs. Intégré dans ISSB IFRS S2.', icon: 'ri-temp-hot-line', color: '#EF4444' },
];

export const SCIENTIFIC_VALIDATION_AGENTS: ValidationAgent[] = [
  { id: 'agent-1', name: 'Recherche Scientifique', tools: ['Consensus', 'Elicit', 'SciSpace'], role: 'Identifier les publications pertinentes, extraire les données, documenter les méthodologies', icon: 'ri-search-eye-line', color: '#0EA5E9' },
  { id: 'agent-2', name: 'Analyse Critique', tools: ['Claude', 'ChatGPT'], role: 'Analyser la robustesse méthodologique, identifier les biais, évaluer la validité statistique', icon: 'ri-brain-line', color: '#8B5CF6' },
  { id: 'agent-3', name: 'Vérification des Sources', tools: ['Gemini', 'Semantic Scholar'], role: 'Vérifier les citations, croiser les références, authentifier les auteurs et institutions', icon: 'ri-shield-check-line', color: '#10B981' },
  { id: 'agent-4', name: 'Contrôle Qualité Final', tools: ['ChatGPT', 'Claude'], role: 'Évaluer la cohérence globale, valider les conclusions, vérifier la conformité académique', icon: 'ri-award-line', color: '#F59E0B' },
];

export const SCIENTIFIC_ANTI_HALLUCINATION_RULES: AntiHallucinationRule[] = [
  { type: 'interdiction', rule: 'Inventer une source inexistante, même partiellement', icon: 'ri-forbid-line', color: '#EF4444' },
  { type: 'interdiction', rule: 'Inventer une statistique non vérifiable', icon: 'ri-forbid-line', color: '#EF4444' },
  { type: 'interdiction', rule: 'Citer une étude académique sans DOI ou lien', icon: 'ri-forbid-line', color: '#EF4444' },
  { type: 'interdiction', rule: 'Référencer une réglementation sans numéro officiel', icon: 'ri-forbid-line', color: '#EF4444' },
  { type: 'obligation', rule: 'Source complète : auteur, titre, année, DOI/URL', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', rule: 'Niveau de confiance explicite par assertion', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', rule: 'Date de consultation pour chaque source web', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', rule: 'Traçabilité complète de la chaîne documentaire', icon: 'ri-checkbox-circle-line', color: '#10B981' },
  { type: 'obligation', rule: 'Vérification croisée sur minimum 3 sources indépendantes', icon: 'ri-checkbox-circle-line', color: '#10B981' },
];

export const SCIENTIFIC_MATURITY_KPIS: ScientificMaturityKPI[] = [
  { id: 'studies-exploited', name: 'Études Exploitées', category: 'research', current: 1420, target: 2000, unit: 'études/mois', trend: 85, icon: 'ri-article-line', color: '#0EA5E9', subMetrics: [{ label: 'Académiques', value: 680, target: 1000 }, { label: 'Institutionnelles', value: 440, target: 600 }, { label: 'Sectorielles', value: 300, target: 400 }] },
  { id: 'source-quality', name: 'Qualité des Sources', category: 'research', current: 91, target: 98, unit: 'score/100', trend: 2, icon: 'ri-star-line', color: '#F59E0B', subMetrics: [{ label: 'Impact Factor moyen', value: 4.8, target: 6.0 }, { label: 'Sources primaires', value: 74, target: 85 }, { label: 'Peer-reviewed', value: 82, target: 92 }] },
  { id: 'citation-rate', name: 'Taux de Citations', category: 'research', current: 78, target: 95, unit: '%', trend: 4, icon: 'ri-double-quotes-l', color: '#8B5CF6', subMetrics: [{ label: 'Citations moy/livrable', value: 18, target: 25 }, { label: 'DOI cités', value: 65, target: 90 }, { label: 'Sources < 2 ans', value: 58, target: 75 }] },
  { id: 'accuracy-score', name: 'Exactitude', category: 'analysis', current: 93.5, target: 99, unit: '%', trend: 1.8, icon: 'ri-check-double-line', color: '#10B981' },
  { id: 'coherence-score', name: 'Cohérence', category: 'analysis', current: 89.2, target: 97, unit: '%', trend: 2.4, icon: 'ri-link-m', color: '#14B8A6' },
  { id: 'robustness-score', name: 'Robustesse', category: 'analysis', current: 87.8, target: 95, unit: '%', trend: 3.1, icon: 'ri-shield-check-line', color: '#6366F1' },
  { id: 'missions-generated', name: 'Missions Générées', category: 'impact', current: 22, target: 40, unit: 'missions/mois', trend: 4, icon: 'ri-briefcase-line', color: '#EC4899' },
  { id: 'publications', name: 'Publications Produites', category: 'impact', current: 104, target: 200, unit: 'articles/mois', trend: 12, icon: 'ri-file-text-line', color: '#F97316' },
  { id: 'ai-visibility', name: 'Visibilité IA', category: 'impact', current: 74, target: 95, unit: 'score/100', trend: 5, icon: 'ri-radar-line', color: '#0EA5E9' },
];

export const SCIENTIFIC_GLOBAL_METRICS = {
  totalAgents: 75,
  agentsFormed: 75,
  avgMaturity: 100,
  certificationsDelivered: 390,
  hallucinationRate: 0.2,
  studiesExploitedMonthly: 2480,
  crossValidationRate: 100,
  publicationsYearly: 1580,
  lastAudit: '2026-06-18',
  consolidationComplete: true,
};



