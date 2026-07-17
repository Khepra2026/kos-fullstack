export interface BancabiliteQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: { value: number; labelFr: string; labelEn: string }[];
}

export interface BancabiliteAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: BancabiliteQuestion[];
}

export const BANCABILITE_AXES: BancabiliteAxis[] = [
  {
    id: 'strategie-business-model',
    titleFr: 'Stratégie & Business Model',
    titleEn: 'Strategy & Business Model',
    descriptionFr: 'Vision, différenciation, marché adressable, scalabilité, avantage concurrentiel, barrières à l\'entrée',
    descriptionEn: 'Vision, differentiation, addressable market, scalability, competitive advantage, barriers to entry',
    icon: 'ri-rocket-line',
    color: '#0f766e',
    questions: [
      {
        id: 'sbm-1',
        questionFr: 'Le projet dispose-t-il d\'un business model clairement articulé avec une proposition de valeur différenciée, des segments clients identifiés et des canaux de distribution définis ?',
        questionEn: 'Does the project have a clearly articulated business model with a differentiated value proposition, identified customer segments and defined distribution channels?',
        options: [
          { value: 100, labelFr: 'Business Model Canvas complet et documenté, proposition de valeur validée par des études de marché et des tests clients (MVP ou pilote), segments clients quantifiés, canaux testés, pricing validé, avantage concurrentiel démontré avec barrières à l\'entrée', labelEn: 'Complete and documented Business Model Canvas, value proposition validated by market studies and customer tests (MVP or pilot), quantified customer segments, tested channels, validated pricing, demonstrated competitive advantage with barriers to entry' },
          { value: 67, labelFr: 'Business model défini et documenté mais validation marché partielle, certains canaux encore théoriques, pricing en cours d\'optimisation', labelEn: 'Business model defined and documented but partial market validation, some channels still theoretical, pricing being optimized' },
          { value: 33, labelFr: 'Concept général défini mais sans business model formalisé, validation marché limitée à des discussions informelles, hypothèses non testées', labelEn: 'General concept defined but without formalized business model, market validation limited to informal discussions, untested assumptions' },
          { value: 0, labelFr: 'Idée de projet sans business model structuré, pas de validation marché, pas de définition claire des clients ou des canaux', labelEn: 'Project idea without structured business model, no market validation, no clear definition of customers or channels' },
        ],
      },
      {
        id: 'sbm-2',
        questionFr: 'Le marché adressable (TAM, SAM, SOM) est-il quantifié avec une méthodologie rigoureuse, des sources vérifiables et une analyse de la croissance sectorielle ?',
        questionEn: 'Is the addressable market (TAM, SAM, SOM) quantified with rigorous methodology, verifiable sources and sector growth analysis?',
        options: [
          { value: 100, labelFr: 'Analyse TAM/SAM/SOM détaillée avec sources primaires et secondaires vérifiables, données sectorielles actualisées (moins de 12 mois), taux de croissance documentés, analyse concurrentielle (Porter 5 forces), tendances réglementaires et technologiques intégrées', labelEn: 'Detailed TAM/SAM/SOM analysis with verifiable primary and secondary sources, updated sector data (less than 12 months), documented growth rates, competitive analysis (Porter 5 forces), regulatory and technology trends integrated' },
          { value: 67, labelFr: 'Marché quantifié avec des sources secondaires crédibles mais analyse TAM/SAM/SOM partielle, données sectorielles de plus de 12 mois', labelEn: 'Market quantified with credible secondary sources but partial TAM/SAM/SOM analysis, sector data older than 12 months' },
          { value: 33, labelFr: 'Estimations de marché approximatives basées sur des extrapolations ou des sources non vérifiées, pas de segmentation TAM/SAM/SOM', labelEn: 'Approximate market estimates based on extrapolations or unverified sources, no TAM/SAM/SOM segmentation' },
          { value: 0, labelFr: 'Aucune quantification du marché, taille du marché inconnue ou affirmée sans justification', labelEn: 'No market quantification, market size unknown or stated without justification' },
        ],
      },
      {
        id: 'sbm-3',
        questionFr: 'L\'avantage concurrentiel est-il clairement identifié, défendable (brevets, savoir-faire, exclusivité, effet de réseau) et documenté par rapport aux concurrents directs et indirects ?',
        questionEn: 'Is the competitive advantage clearly identified, defensible (patents, know-how, exclusivity, network effect) and documented against direct and indirect competitors?',
        options: [
          { value: 100, labelFr: 'Avantage concurrentiel documenté avec analyse comparative détaillée des concurrents, barrières à l\'entrée solides (PI, brevets, licences exclusives, contrats long terme, effets de réseau), veille concurrentielle systématique, stratégie de maintien de l\'avantage à 3-5 ans', labelEn: 'Documented competitive advantage with detailed competitor benchmarking, solid barriers to entry (IP, patents, exclusive licenses, long-term contracts, network effects), systematic competitive watch, 3-5 year advantage maintenance strategy' },
          { value: 67, labelFr: 'Avantage concurrentiel identifié et documenté mais barrières à l\'entrée modérées, analyse concurrentielle partielle', labelEn: 'Competitive advantage identified and documented but moderate barriers to entry, partial competitive analysis' },
          { value: 33, labelFr: 'Avantage concurrentiel évoqué de manière générale sans analyse comparative documentée, pas de barrières à l\'entrée identifiées', labelEn: 'Competitive advantage mentioned generally without documented comparative analysis, no barriers to entry identified' },
          { value: 0, labelFr: 'Pas d\'avantage concurrentiel identifié ou différenciation inexistante, projet facilement réplicable', labelEn: 'No competitive advantage identified or non-existent differentiation, easily replicable project' },
        ],
      },
      {
        id: 'sbm-4',
        questionFr: 'Le modèle de revenus est-il clairement défini, diversifié et testé — avec des hypothèses de prix validées, des cycles de vente documentés et une stratégie de rétention client ?',
        questionEn: 'Is the revenue model clearly defined, diversified and tested — with validated pricing assumptions, documented sales cycles and a customer retention strategy?',
        options: [
          { value: 100, labelFr: 'Modèle de revenus détaillé avec multiple streams, pricing validé par des transactions réelles, cycle de vente documenté (durée, taux de conversion par étape), CAC et LTV calculés avec données réelles, stratégie de rétention avec cohort analysis, prévisions par segment', labelEn: 'Detailed revenue model with multiple streams, pricing validated by real transactions, documented sales cycle (duration, conversion rate per step), CAC and LTV calculated with real data, retention strategy with cohort analysis, forecasts by segment' },
          { value: 67, labelFr: 'Modèle de revenus défini avec pricing documenté mais validation limitée, cycle de vente estimé, CAC/LTV calculés sur hypothèses', labelEn: 'Revenue model defined with documented pricing but limited validation, estimated sales cycle, CAC/LTV calculated on assumptions' },
          { value: 33, labelFr: 'Modèle de revenus basique (une source principale), pricing théorique non validé, pas d\'analyse CAC/LTV', labelEn: 'Basic revenue model (one main source), theoretical unvalidated pricing, no CAC/LTV analysis' },
          { value: 0, labelFr: 'Modèle de revenus flou ou inexistant, comment le projet gagnera de l\'argent n\'est pas clairement défini', labelEn: 'Unclear or non-existent revenue model, how the project will make money is not clearly defined' },
        ],
      },
      {
        id: 'sbm-5',
        questionFr: 'Une stratégie de mise à l\'échelle (scaling) est-elle documentée avec des phases claires, des besoins en ressources identifiés et des hypothèses de croissance réalistes ?',
        questionEn: 'Is a scaling strategy documented with clear phases, identified resource needs and realistic growth assumptions?',
        options: [
          { value: 100, labelFr: 'Plan de scaling détaillé sur 3 phases (amorçage, croissance, maturité) avec jalons quantifiés, besoins en ressources humaines et capex par phase, hypothèses de croissance basées sur des comparables sectoriels, risques de scaling identifiés avec plans de mitigation, économies d\'échelle documentées', labelEn: 'Detailed 3-phase scaling plan (seed, growth, maturity) with quantified milestones, HR and capex needs per phase, growth assumptions based on sector comparables, scaling risks identified with mitigation plans, documented economies of scale' },
          { value: 67, labelFr: 'Plan de croissance défini avec phases identifiées mais besoins en ressources partiellement documentés, hypothèses de croissance optimistes', labelEn: 'Growth plan defined with identified phases but partially documented resource needs, optimistic growth assumptions' },
          { value: 33, labelFr: 'Ambition de croissance exprimée sans plan de scaling documenté, pas d\'analyse des besoins en ressources', labelEn: 'Growth ambition expressed without documented scaling plan, no resource needs analysis' },
          { value: 0, labelFr: 'Aucune réflexion sur le scaling, le projet est pensé pour rester à petite échelle sans vision de croissance', labelEn: 'No scaling consideration, project is designed to remain small-scale without growth vision' },
        ],
      },
    ],
  },
  {
    id: 'gouvernance-equipe',
    titleFr: 'Gouvernance & Équipe Dirigeante',
    titleEn: 'Governance & Leadership Team',
    descriptionFr: 'Qualité de l\'équipe, track record, gouvernance, rétention, conseil, culture',
    descriptionEn: 'Team quality, track record, governance, retention, advisory, culture',
    icon: 'ri-team-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'ge-1',
        questionFr: 'L\'équipe dirigeante possède-t-elle le track record, les compétences techniques et l\'expérience sectorielle nécessaires pour exécuter le business plan avec crédibilité ?',
        questionEn: 'Does the leadership team have the track record, technical skills and sector experience necessary to execute the business plan credibly?',
        options: [
          { value: 100, labelFr: 'Équipe dirigeante exceptionnelle : track record démontré dans le secteur (succès mesurables), compétences complémentaires couvrant tous les domaines critiques (technique, commercial, finance, opérations), expérience internationale, réseau sectoriel établi, références vérifiables', labelEn: 'Exceptional leadership team: demonstrated sector track record (measurable successes), complementary skills covering all critical areas (technical, commercial, finance, operations), international experience, established sector network, verifiable references' },
          { value: 67, labelFr: 'Équipe compétente avec expérience sectorielle pertinente mais lacunes identifiables dans certaines fonctions clés, track record partiellement documenté', labelEn: 'Competent team with relevant sector experience but identifiable gaps in some key functions, partially documented track record' },
          { value: 33, labelFr: 'Équipe limitée — fondateur(s) avec expérience mais équipe incomplète, dépendance excessive à 1-2 personnes clés, pas de track record sectoriel direct', labelEn: 'Limited team — founder(s) with experience but incomplete team, excessive dependence on 1-2 key people, no direct sector track record' },
          { value: 0, labelFr: 'Équipe dirigeante absente ou inexpérimentée, pas de compétences sectorielles, projet porté par une seule personne sans équipe constituée', labelEn: 'Absent or inexperienced leadership team, no sector skills, project carried by a single person without a constituted team' },
        ],
      },
      {
        id: 'ge-2',
        questionFr: 'La structure de gouvernance est-elle adaptée aux attentes des investisseurs — Conseil d\'Administration, comités, séparation des pouvoirs, transparence ?',
        questionEn: 'Is the governance structure adapted to investor expectations — Board of Directors, committees, separation of powers, transparency?',
        options: [
          { value: 100, labelFr: 'Gouvernance de niveau institutional-grade : CA constitué avec administrateurs indépendants, comités spécialisés (Audit, Rémunération), séparation CEO/Chairman, reporting trimestriel structuré, pacte d\'actionnaires documenté, politique de transparence, comité consultatif (Advisory Board) avec profils reconnus', labelEn: 'Institutional-grade governance: constituted Board with independent directors, specialized committees (Audit, Compensation), CEO/Chairman separation, structured quarterly reporting, documented shareholders\' agreement, transparency policy, Advisory Board with recognized profiles' },
          { value: 67, labelFr: 'CA constitué mais sans administrateurs indépendants, comités non formalisés, reporting irrégulier, pacte d\'actionnaires basique', labelEn: 'Board constituted but without independent directors, non-formalized committees, irregular reporting, basic shareholders\' agreement' },
          { value: 33, labelFr: 'Gouvernance minimale — CA formel mais non opérationnel, pas de comités, reporting limité aux obligations légales, pas de pacte d\'actionnaires', labelEn: 'Minimal governance — formal but non-operational Board, no committees, reporting limited to legal obligations, no shareholders\' agreement' },
          { value: 0, labelFr: 'Aucune structure de gouvernance, décisions concentrées sur le fondateur sans contrepoids, pas de Conseil d\'Administration', labelEn: 'No governance structure, decisions concentrated on founder without counterbalance, no Board of Directors' },
        ],
      },
      {
        id: 'ge-3',
        questionFr: 'Un plan de rétention des talents clés est-il en place — rémunération compétitive, equity/stock options, plan de développement, culture d\'entreprise ?',
        questionEn: 'Is a key talent retention plan in place — competitive compensation, equity/stock options, development plan, company culture?',
        options: [
          { value: 100, labelFr: 'Plan de rétention complet : rémunération benchmarkée secteur, plan d\'intéressement (ESOP/stock options) documenté avec vesting schedule, plan de développement individuel pour chaque talent clé, culture d\'entreprise formalisée (valeurs, mission), taux de turnover faible et suivi, plan de succession pour postes critiques', labelEn: 'Complete retention plan: sector-benchmarked compensation, documented equity plan (ESOP/stock options) with vesting schedule, individual development plan for each key talent, formalized company culture (values, mission), low and tracked turnover rate, succession plan for critical positions' },
          { value: 67, labelFr: 'Rémunération compétitive mais pas de plan d\'intéressement formalisé, développement professionnel partiellement structuré, turnover modéré', labelEn: 'Competitive compensation but no formalized equity plan, partially structured professional development, moderate turnover' },
          { value: 33, labelFr: 'Rémunération basique sans benchmarking, pas de plan d\'intéressement, dépendance à quelques personnes clés sans plan de rétention, turnover élevé', labelEn: 'Basic compensation without benchmarking, no equity plan, dependence on a few key people without retention plan, high turnover' },
          { value: 0, labelFr: 'Aucune politique de rétention, équipe volatile, risque de départ des personnes clés à tout moment', labelEn: 'No retention policy, volatile team, risk of key people leaving at any time' },
        ],
      },
      {
        id: 'ge-4',
        questionFr: 'L\'équipe dispose-t-elle d\'un Conseil Consultatif (Advisory Board) ou de mentors expérimentés capables d\'apporter une crédibilité externe et un réseau ?',
        questionEn: 'Does the team have an Advisory Board or experienced mentors capable of providing external credibility and a network?',
        options: [
          { value: 100, labelFr: 'Advisory Board constitué avec 3+ profils reconnus dans le secteur/région, réunions trimestrielles documentées, apport démontrable en réseau, crédibilité et conseil stratégique, membres ayant une participation symbolique alignant les intérêts', labelEn: 'Advisory Board constituted with 3+ recognized profiles in the sector/region, documented quarterly meetings, demonstrable network, credibility and strategic advice contribution, members with symbolic equity aligning interests' },
          { value: 67, labelFr: '1-2 conseillers informels apportant un réseau et des conseils ponctuels, sans structuration formelle ni régularité', labelEn: '1-2 informal advisors providing network and occasional advice, without formal structure or regularity' },
          { value: 33, labelFr: 'Quelques contacts professionnels mobilisés ponctuellement, pas de conseil structuré, réseau limité', labelEn: 'A few professional contacts mobilized occasionally, no structured advice, limited network' },
          { value: 0, labelFr: 'Aucun conseil externe, équipe isolée sans réseau ni mentorat, pas de crédibilité externe', labelEn: 'No external advice, isolated team without network or mentoring, no external credibility' },
        ],
      },
      {
        id: 'ge-5',
        questionFr: 'La répartition du capital est-elle claire, équilibrée et documentée — avec un pacte d\'actionnaires traitant la gouvernance, les droits de vote et les conditions de sortie ?',
        questionEn: 'Is the capital distribution clear, balanced and documented — with a shareholders\' agreement addressing governance, voting rights and exit conditions?',
        options: [
          { value: 100, labelFr: 'Actionnariat clair et documenté : table de capitalisation à jour, pacte d\'actionnaires complet (gouvernance, droits de vote, droit de préemption, tag-along/drag-along, clauses de sortie, anti-dilution), valorisation documentée et justifiable, plan d\'intéressement salariés structuré (ESOP pool défini)', labelEn: 'Clear and documented shareholding: up-to-date cap table, comprehensive shareholders\' agreement (governance, voting rights, pre-emption right, tag-along/drag-along, exit clauses, anti-dilution), documented and justifiable valuation, structured employee equity plan (defined ESOP pool)' },
          { value: 67, labelFr: 'Actionnariat documenté mais pacte d\'actionnaires basique ou en cours d\'élaboration, table de capitalisation existante mais non optimisée', labelEn: 'Documented shareholding but basic or in-progress shareholders\' agreement, existing but non-optimized cap table' },
          { value: 33, labelFr: 'Actionnariat informel, pas de pacte d\'actionnaires, table de capitalisation non tenue à jour, répartition du capital source potentielle de conflits', labelEn: 'Informal shareholding, no shareholders\' agreement, non-updated cap table, capital distribution potential source of conflicts' },
          { value: 0, labelFr: 'Actionnariat confus ou non documenté, pas de pacte, pas de table de capitalisation, structure juridique inadéquate', labelEn: 'Confused or undocumented shareholding, no agreement, no cap table, inadequate legal structure' },
        ],
      },
    ],
  },
  {
    id: 'performance-financiere',
    titleFr: 'Performance Financière & Projections',
    titleEn: 'Financial Performance & Projections',
    descriptionFr: 'Historique financier, qualité des projections, unit economics, rentabilité, cash-flow, valorisation',
    descriptionEn: 'Financial history, projection quality, unit economics, profitability, cash flow, valuation',
    icon: 'ri-funds-line',
    color: '#dc2626',
    questions: [
      {
        id: 'pf-1',
        questionFr: 'Les états financiers historiques (3 ans minimum) sont-ils disponibles, audités ou revus par un commissaire aux comptes indépendant, et conformes aux normes SYSCOHADA ou IFRS ?',
        questionEn: 'Are historical financial statements (minimum 3 years) available, audited or reviewed by an independent auditor, and compliant with SYSCOHADA or IFRS standards?',
        options: [
          { value: 100, labelFr: 'États financiers audités sur 3+ ans par un cabinet de premier plan, conformes aux normes IFRS ou SYSCOHADA révisé, rapports du CAC sans réserve, historique de croissance documenté, comptes certifiés disponibles sous 90 jours après clôture', labelEn: 'Financial statements audited for 3+ years by a leading firm, compliant with IFRS or revised SYSCOHADA, unqualified auditor reports, documented growth history, certified accounts available within 90 days after closing' },
          { value: 67, labelFr: 'États financiers disponibles sur 2-3 ans mais audit limité ou réalisé par un cabinet de second rang, quelques réserves mineures, conformité SYSCOHADA', labelEn: 'Financial statements available for 2-3 years but limited audit or by second-tier firm, some minor reservations, SYSCOHADA compliance' },
          { value: 33, labelFr: 'États financiers partiels ou non audités, moins de 2 ans d\'historique, conformité SYSCOHADA incertaine, pas de commissaire aux comptes', labelEn: 'Partial or unaudited financial statements, less than 2 years of history, uncertain SYSCOHADA compliance, no auditor' },
          { value: 0, labelFr: 'Pas d\'états financiers formalisés ou comptabilité non fiable, absence totale d\'audit, données financières inexploitables', labelEn: 'No formalized financial statements or unreliable accounting, total absence of audit, unusable financial data' },
        ],
      },
      {
        id: 'pf-2',
        questionFr: 'Le business plan financier (3-5 ans) est-il construit sur des hypothèses explicites, avec des scénarios (best/base/worst case), une analyse de sensibilité et des drivers de croissance documentés ?',
        questionEn: 'Is the 3-5 year financial business plan built on explicit assumptions, with scenarios (best/base/worst case), sensitivity analysis and documented growth drivers?',
        options: [
          { value: 100, labelFr: 'Modèle financier complet sur 5 ans : hypothèses détaillées et justifiées avec sources, 3 scénarios (optimiste, base, pessimiste), analyse de sensibilité sur les variables clés (prix, volume, change, taux), DCF avec WACC documenté, forecasts mensuels la 1ère année, trimestriels les années 2-3, annuels au-delà, modèle audité ou revu par un tiers', labelEn: 'Complete 5-year financial model: detailed and justified assumptions with sources, 3 scenarios (optimistic, base, pessimistic), sensitivity analysis on key variables (price, volume, FX, rates), DCF with documented WACC, monthly forecasts year 1, quarterly year 2-3, annual beyond, model audited or reviewed by a third party' },
          { value: 67, labelFr: 'Business plan sur 3 ans avec hypothèses documentées mais analyse de sensibilité limitée, scénarios non formalisés, DCF simplifié', labelEn: '3-year business plan with documented assumptions but limited sensitivity analysis, non-formalized scenarios, simplified DCF' },
          { value: 33, labelFr: 'Prévisions financières basiques sur 1-2 ans, hypothèses non documentées, pas d\'analyse de sensibilité, pas de DCF', labelEn: 'Basic financial forecasts for 1-2 years, undocumented assumptions, no sensitivity analysis, no DCF' },
          { value: 0, labelFr: 'Pas de business plan financier ou projections irréalistes non étayées, chiffres avancés sans aucune justification', labelEn: 'No financial business plan or unrealistic unsubstantiated projections, figures advanced without any justification' },
        ],
      },
      {
        id: 'pf-3',
        questionFr: 'Les indicateurs d\'unit economics (CAC, LTV, marge brute par client, période de récupération du CAC) sont-ils calculés, suivis et comparables aux standards du secteur ?',
        questionEn: 'Are unit economics indicators (CAC, LTV, gross margin per customer, CAC payback period) calculated, tracked and comparable to sector standards?',
        options: [
          { value: 100, labelFr: 'Unit economics détaillés par segment client : CAC calculé avec données réelles (marketing + force de vente), LTV avec taux d\'attrition documenté, ratio LTV/CAC > 3x, période de récupération CAC < 12 mois, marge brute par client suivie mensuellement, benchmarks sectoriels intégrés, tendances positives documentées', labelEn: 'Detailed unit economics by customer segment: CAC calculated with real data (marketing + sales force), LTV with documented churn rate, LTV/CAC ratio > 3x, CAC payback period < 12 months, gross margin per customer tracked monthly, sector benchmarks integrated, documented positive trends' },
          { value: 67, labelFr: 'Unit economics calculés au niveau agrégé mais pas par segment, données partiellement réelles/estimées, LTV/CAC acceptable mais suivi irrégulier', labelEn: 'Unit economics calculated at aggregate level but not by segment, partially real/estimated data, acceptable LTV/CAC but irregular tracking' },
          { value: 33, labelFr: 'Unit economics estimés de manière approximative, pas de calcul formel du CAC ou du LTV, suivi inexistant', labelEn: 'Unit economics approximately estimated, no formal CAC or LTV calculation, non-existent tracking' },
          { value: 0, labelFr: 'Pas de calcul d\'unit economics, absence totale de mesure de la rentabilité par client', labelEn: 'No unit economics calculation, total absence of per-customer profitability measurement' },
        ],
      },
      {
        id: 'pf-4',
        questionFr: 'La structure de coûts est-elle maîtrisée avec une distinction claire entre charges fixes et variables, un point mort calculé, et une trajectoire vers la rentabilité documentée ?',
        questionEn: 'Is the cost structure mastered with a clear distinction between fixed and variable costs, a calculated break-even point, and a documented path to profitability?',
        options: [
          { value: 100, labelFr: 'Structure de coûts optimisée : distinction claire charges fixes/variables, point mort calculé et suivi mensuellement, trajectoire vers la rentabilité documentée avec date cible, ratio d\'efficacité opérationnelle suivi, plan d\'optimisation des coûts, benchmarking sectoriel, marge d\'EBITDA en amélioration', labelEn: 'Optimized cost structure: clear fixed/variable distinction, break-even point calculated and tracked monthly, documented path to profitability with target date, operational efficiency ratio tracked, cost optimization plan, sector benchmarking, improving EBITDA margin' },
          { value: 67, labelFr: 'Structure de coûts documentée avec point mort calculé mais trajectoire vers la rentabilité incertaine, optimisation des coûts partielle', labelEn: 'Documented cost structure with calculated break-even but uncertain path to profitability, partial cost optimization' },
          { value: 33, labelFr: 'Coûts suivis globalement sans analyse structurelle, point mort non calculé, pas de plan d\'optimisation des coûts, rentabilité lointaine et non documentée', labelEn: 'Costs tracked globally without structural analysis, break-even not calculated, no cost optimization plan, distant and undocumented profitability' },
          { value: 0, labelFr: 'Aucune maîtrise des coûts, pas de distinction charges fixes/variables, rentabilité non envisagée à moyen terme, consommation de trésorerie non maîtrisée', labelEn: 'No cost control, no fixed/variable distinction, profitability not considered in the medium term, uncontrolled cash burn' },
        ],
      },
      {
        id: 'pf-5',
        questionFr: 'Le besoin de financement est-il clairement quantifié avec un plan d\'utilisation des fonds (use of proceeds) détaillé, des jalons associés et une stratégie de financement future ?',
        questionEn: 'Is the financing need clearly quantified with a detailed use of proceeds plan, associated milestones and a future funding strategy?',
        options: [
          { value: 100, labelFr: 'Besoin de financement documenté : use of proceeds détaillé avec allocation précise (capex, opex, recrutement, marketing, fonds de roulement), jalons de déploiement avec calendrier, stratégie de tours de financement futurs (Series A, B) avec dilution anticipée, plan de trésorerie sur 18-24 mois, scénarios de stress testés', labelEn: 'Documented financing need: detailed use of proceeds with precise allocation (capex, opex, recruitment, marketing, working capital), deployment milestones with timeline, future funding round strategy (Series A, B) with anticipated dilution, 18-24 month cash flow plan, stress-tested scenarios' },
          { value: 67, labelFr: 'Besoin de financement identifié avec allocation générale mais use of proceeds non détaillé, jalons définis sans calendrier précis, réflexion sur les tours futurs mais non formalisée', labelEn: 'Financing need identified with general allocation but non-detailed use of proceeds, milestones defined without precise timeline, future round consideration but not formalized' },
          { value: 33, labelFr: 'Besoin de financement estimé globalement sans ventilation, pas de jalons associés, pas de réflexion sur les tours futurs', labelEn: 'Financing need globally estimated without breakdown, no associated milestones, no future round consideration' },
          { value: 0, labelFr: 'Besoin de financement non quantifié ou irréaliste, pas de plan d\'utilisation des fonds, pas de stratégie de financement', labelEn: 'Unquantified or unrealistic financing need, no use of proceeds plan, no funding strategy' },
        ],
      },
    ],
  },
  {
    id: 'due-diligence-conformite',
    titleFr: 'Due Diligence & Conformité',
    titleEn: 'Due Diligence & Compliance',
    descriptionFr: 'Documentation juridique, conformité réglementaire, propriété intellectuelle, risques, contentieux, assurances',
    descriptionEn: 'Legal documentation, regulatory compliance, intellectual property, risks, litigation, insurance',
    icon: 'ri-file-search-line',
    color: '#0ea5e9',
    questions: [
      {
        id: 'ddc-1',
        questionFr: 'La documentation juridique de l\'entreprise est-elle complète, à jour et accessible — statuts, registre des actionnaires, PV des assemblées générales, contrats clés ?',
        questionEn: 'Is the company\'s legal documentation complete, up-to-date and accessible — bylaws, shareholder register, general assembly minutes, key contracts?',
        options: [
          { value: 100, labelFr: 'Documentation juridique complète et organisée : statuts à jour, registre des actionnaires tenu, PV d\'AG et de CA archivés et signés, contrats clés (clients, fournisseurs, bail, travail) classés et résumés dans une data room, documentation conforme au droit OHADA, avis juridique externe disponible', labelEn: 'Complete and organized legal documentation: updated bylaws, maintained shareholder register, signed and archived GA and Board minutes, key contracts (clients, suppliers, lease, employment) classified and summarized in a data room, OHADA-compliant documentation, external legal opinion available' },
          { value: 67, labelFr: 'Documentation juridique existante mais partiellement organisée, certains PV manquants ou non signés, contrats clés disponibles mais non résumés', labelEn: 'Legal documentation exists but partially organized, some missing or unsigned minutes, key contracts available but not summarized' },
          { value: 33, labelFr: 'Documentation juridique lacunaire — statuts obsolètes, registres non tenus, PV non archivés, contrats dispersés, data room inexistante', labelEn: 'Deficient legal documentation — obsolete bylaws, unmaintained registers, unarchived minutes, scattered contracts, non-existent data room' },
          { value: 0, labelFr: 'Documentation juridique quasi-inexistante ou inaccessible, impossibilité de conduire une due diligence sérieuse', labelEn: 'Almost non-existent or inaccessible legal documentation, impossibility to conduct serious due diligence' },
        ],
      },
      {
        id: 'ddc-2',
        questionFr: 'L\'entreprise est-elle en conformité avec l\'ensemble des obligations réglementaires applicables — fiscales, sociales, sectorielles, environnementales — sans contentieux en cours ?',
        questionEn: 'Is the company compliant with all applicable regulatory obligations — tax, social, sectoral, environmental — without ongoing disputes?',
        options: [
          { value: 100, labelFr: 'Conformité réglementaire complète : attestations fiscales et sociales à jour, licences et agréments sectoriels valides, audits de conformité externes réalisés, zéro contentieux significatif, veille réglementaire active, conformité ESG documentée, politique de conformité formalisée', labelEn: 'Complete regulatory compliance: up-to-date tax and social certificates, valid sectoral licenses and approvals, external compliance audits performed, zero significant disputes, active regulatory watch, documented ESG compliance, formalized compliance policy' },
          { value: 67, labelFr: 'Conformité globalement assurée mais quelques obligations en cours de régularisation, contentieux mineurs en cours, veille réglementaire informelle', labelEn: 'Compliance generally assured but some obligations being regularized, minor ongoing disputes, informal regulatory watch' },
          { value: 33, labelFr: 'Conformité partielle — certaines obligations non respectées, contentieux en cours, pas de veille réglementaire, absence de politique de conformité', labelEn: 'Partial compliance — some obligations not met, ongoing disputes, no regulatory watch, absence of compliance policy' },
          { value: 0, labelFr: 'Non-conformité significative — obligations fiscales ou sociales non respectées, absence de licences requises, contentieux multiples, risque réglementaire élevé', labelEn: 'Significant non-compliance — unmet tax or social obligations, missing required licenses, multiple disputes, high regulatory risk' },
        ],
      },
      {
        id: 'ddc-3',
        questionFr: 'La propriété intellectuelle (marques, brevets, droits d\'auteur, savoir-faire, nom de domaine) est-elle protégée, documentée et détenue par l\'entreprise (pas par le fondateur) ?',
        questionEn: 'Is the intellectual property (trademarks, patents, copyrights, know-how, domain names) protected, documented and owned by the company (not by the founder)?',
        options: [
          { value: 100, labelFr: 'PI entièrement protégée : marques déposées auprès de l\'OAPI (zone OHADA), brevets déposés le cas échéant, droits d\'auteur documentés, savoir-faire formalisé dans des procédures internes, noms de domaine détenus par l\'entreprise, contrats de cession de PI des fondateurs/employés signés, clauses de confidentialité avec tous les partenaires, veille PI active', labelEn: 'Fully protected IP: trademarks registered with OAPI (OHADA zone), patents filed where applicable, documented copyrights, know-how formalized in internal procedures, domain names owned by the company, IP assignment contracts from founders/employees signed, confidentiality clauses with all partners, active IP watch' },
          { value: 67, labelFr: 'PI partiellement protégée : marques en cours de dépôt, brevets non déposés, savoir-faire documenté informellement, certains actifs PI encore détenus par le fondateur', labelEn: 'Partially protected IP: trademarks in registration process, patents not filed, informally documented know-how, some IP assets still held by founder' },
          { value: 33, labelFr: 'PI faiblement protégée : pas de dépôt de marque, pas de brevet, savoir-faire non documenté, PI détenue par le fondateur sans contrat de cession, risque de contrefaçon non évalué', labelEn: 'Weakly protected IP: no trademark registration, no patent, undocumented know-how, IP held by founder without assignment contract, unassessed infringement risk' },
          { value: 0, labelFr: 'Aucune protection de la PI, actifs intellectuels non identifiés, risque de perte totale de l\'avantage concurrentiel en cas de départ du fondateur ou de copie', labelEn: 'No IP protection, unidentified intellectual assets, risk of total competitive advantage loss if founder leaves or copying occurs' },
        ],
      },
      {
        id: 'ddc-4',
        questionFr: 'Une cartographie des risques (opérationnels, financiers, juridiques, réglementaires, réputationnels) est-elle établie avec des plans de mitigation documentés ?',
        questionEn: 'Is a risk mapping (operational, financial, legal, regulatory, reputational) established with documented mitigation plans?',
        options: [
          { value: 100, labelFr: 'Cartographie des risques exhaustive avec matrice probabilité/impact pour toutes les catégories, propriétaires de risques identifiés, plans de mitigation détaillés avec coûts et délais, revue trimestrielle par le CA, couverture assurantielle adaptée, stress tests réalisés, registre des risques tenu à jour', labelEn: 'Exhaustive risk mapping with probability/impact matrix for all categories, identified risk owners, detailed mitigation plans with costs and timelines, quarterly Board review, appropriate insurance coverage, stress tests performed, updated risk register' },
          { value: 67, labelFr: 'Risques principaux identifiés et documentés mais cartographie non exhaustive, plans de mitigation partiels, couverture assurantielle de base, revue annuelle', labelEn: 'Main risks identified and documented but non-exhaustive mapping, partial mitigation plans, basic insurance coverage, annual review' },
          { value: 33, labelFr: 'Risques identifiés informellement, pas de cartographie documentée, plans de mitigation inexistants ou improvisés, couverture assurantielle minimale', labelEn: 'Risks informally identified, no documented mapping, non-existent or improvised mitigation plans, minimal insurance coverage' },
          { value: 0, labelFr: 'Aucune gestion des risques, exposition totale à tous les aléas, pas de couverture assurantielle adaptée', labelEn: 'No risk management, total exposure to all hazards, no appropriate insurance coverage' },
        ],
      },
      {
        id: 'ddc-5',
        questionFr: 'L\'entreprise dispose-t-elle d\'une data room virtuelle (VDR) organisée, avec l\'ensemble des documents de due diligence classés par catégorie et accessibles de manière sécurisée ?',
        questionEn: 'Does the company have an organized virtual data room (VDR), with all due diligence documents classified by category and securely accessible?',
        options: [
          { value: 100, labelFr: 'VDR professionnelle déployée : structure par catégories (Corporate, Finance, Fiscal, Juridique, PI, RH, Commercial, Technique, Conformité), documents indexés et à jour, accès sécurisé avec gestion des droits par investisseur, traçabilité des consultations, résumés exécutifs par section, Q&A log documenté', labelEn: 'Professional VDR deployed: structured by categories (Corporate, Finance, Tax, Legal, IP, HR, Commercial, Technical, Compliance), indexed and up-to-date documents, secure access with investor-level rights management, consultation traceability, executive summaries per section, documented Q&A log' },
          { value: 67, labelFr: 'Documents organisés dans des dossiers partagés mais pas de VDR professionnelle, classification partielle, accès non tracé, indexation manuelle', labelEn: 'Documents organized in shared folders but no professional VDR, partial classification, untracked access, manual indexing' },
          { value: 33, labelFr: 'Documents dispersés entre emails, drives personnels et dossiers locaux, pas d\'organisation structurée, difficile à consolider pour une due diligence', labelEn: 'Documents scattered across emails, personal drives and local folders, no structured organization, difficult to consolidate for due diligence' },
          { value: 0, labelFr: 'Aucune organisation documentaire, impossibilité de fournir les documents de due diligence dans des délais raisonnables, data room inexistante', labelEn: 'No document organization, inability to provide due diligence documents within reasonable timelines, non-existent data room' },
        ],
      },
    ],
  },
  {
    id: 'structuration-investissement',
    titleFr: 'Structuration de l\'Investissement',
    titleEn: 'Investment Structuring',
    descriptionFr: 'Valorisation, term sheet, pacte d\'actionnaires, stratégie de sortie, gouvernance post-investissement, reporting',
    descriptionEn: 'Valuation, term sheet, shareholders\' agreement, exit strategy, post-investment governance, reporting',
    icon: 'ri-hand-coin-line',
    color: '#b45309',
    questions: [
      {
        id: 'si-1',
        questionFr: 'La valorisation de l\'entreprise est-elle étayée par une méthodologie reconnue (DCF, comparables, multiples sectoriels) avec des hypothèses explicites et justifiables ?',
        questionEn: 'Is the company valuation supported by a recognized methodology (DCF, comparables, sector multiples) with explicit and justifiable assumptions?',
        options: [
          { value: 100, labelFr: 'Valorisation robuste : DCF avec WACC documenté (taux sans risque, prime de risque pays, bêta sectoriel), analyse par comparables boursiers et transactions récentes, multiples sectoriels justifiés, analyse de sensibilité sur les paramètres clés (croissance, marge, WACC, multiple de sortie), fourchette de valorisation documentée, revue par un tiers indépendant', labelEn: 'Robust valuation: DCF with documented WACC (risk-free rate, country risk premium, sector beta), public comparables and recent transaction analysis, justified sector multiples, sensitivity analysis on key parameters (growth, margin, WACC, exit multiple), documented valuation range, independent third-party review' },
          { value: 67, labelFr: 'Valorisation calculée avec une méthodologie acceptable mais hypothèses partiellement documentées, DCF simplifié, comparables limités, pas de revue indépendante', labelEn: 'Valuation calculated with acceptable methodology but partially documented assumptions, simplified DCF, limited comparables, no independent review' },
          { value: 33, labelFr: 'Valorisation basée sur des règles empiriques ou des attentes du fondateur sans méthodologie rigoureuse, pas de DCF ni de comparables documentés', labelEn: 'Valuation based on rules of thumb or founder expectations without rigorous methodology, no documented DCF or comparables' },
          { value: 0, labelFr: 'Valorisation arbitraire sans aucune méthodologie, attentes irréalistes déconnectées des fondamentaux de l\'entreprise', labelEn: 'Arbitrary valuation without any methodology, unrealistic expectations disconnected from company fundamentals' },
        ],
      },
      {
        id: 'si-2',
        questionFr: 'Un term sheet préliminaire est-il préparé avec les termes clés de l\'investissement — montant, valorisation, instruments (equity, convertible, dette), droits des investisseurs, gouvernance post-investissement ?',
        questionEn: 'Is a preliminary term sheet prepared with key investment terms — amount, valuation, instruments (equity, convertible, debt), investor rights, post-investment governance?',
        options: [
          { value: 100, labelFr: 'Term sheet détaillé et professionnel : montant et tranches, valorisation pre-money/post-money, structure d\'investissement optimisée (equity/convertible/dette), droits de préférence (liquidation preference, anti-dilution, pre-emption), gouvernance post-investissement (sièges au CA, droits de veto, majorités qualifiées), conditions suspensives, exclusivité, jurisdictions, préparé avec un conseil juridique', labelEn: 'Detailed and professional term sheet: amount and tranches, pre-money/post-money valuation, optimized investment structure (equity/convertible/debt), preference rights (liquidation preference, anti-dilution, pre-emption), post-investment governance (Board seats, veto rights, qualified majorities), conditions precedent, exclusivity, jurisdictions, prepared with legal counsel' },
          { value: 67, labelFr: 'Term sheet esquissé avec les termes principaux mais incomplet sur les clauses de protection des investisseurs, structure d\'investissement basique, conseil juridique non encore impliqué', labelEn: 'Term sheet outlined with main terms but incomplete on investor protection clauses, basic investment structure, legal counsel not yet involved' },
          { value: 33, labelFr: 'Pas de term sheet formalisé, discussion informelle sur le montant et la valorisation, termes de l\'investissement non documentés, absence de conseil juridique', labelEn: 'No formalized term sheet, informal discussion on amount and valuation, undocumented investment terms, absence of legal counsel' },
          { value: 0, labelFr: 'Aucune préparation à la négociation d\'investissement, méconnaissance des termes standards d\'un term sheet, risque élevé d\'accepter des conditions défavorables', labelEn: 'No preparation for investment negotiation, ignorance of standard term sheet terms, high risk of accepting unfavorable conditions' },
        ],
      },
      {
        id: 'si-3',
        questionFr: 'Une stratégie de sortie claire est-elle définie pour les investisseurs — horizon temporel, scénarios de sortie (IPO, trade sale, secondary, rachat), rendement cible (TRI, multiple) ?',
        questionEn: 'Is a clear exit strategy defined for investors — time horizon, exit scenarios (IPO, trade sale, secondary, buyback), target return (IRR, multiple)?',
        options: [
          { value: 100, labelFr: 'Stratégie de sortie documentée : horizon 5-7 ans, 3 scénarios de sortie analysés (cession industrielle avec liste d\'acquéreurs potentiels, introduction en bourse régionale, secondary buyout), TRI cible par scénario avec hypothèses explicites, analyse des transactions comparables dans le secteur/région, préparation aux due diligence acquéreurs, clauses de sortie dans le pacte (tag-along, drag-along)', labelEn: 'Documented exit strategy: 5-7 year horizon, 3 analyzed exit scenarios (trade sale with potential acquirer list, regional IPO, secondary buyout), target IRR per scenario with explicit assumptions, comparable transaction analysis in sector/region, acquirer due diligence preparation, exit clauses in agreement (tag-along, drag-along)' },
          { value: 67, labelFr: 'Stratégie de sortie identifiée avec 1-2 scénarios mais analyse superficielle, TRI cible non documenté, pas d\'analyse des acquéreurs potentiels', labelEn: 'Exit strategy identified with 1-2 scenarios but superficial analysis, undocumented target IRR, no potential acquirer analysis' },
          { value: 33, labelFr: 'Sortie évoquée de manière vague (vente future, introduction en bourse) sans analyse concrète, pas de scénarios documentés, pas de TRI cible', labelEn: 'Exit vaguely mentioned (future sale, IPO) without concrete analysis, no documented scenarios, no target IRR' },
          { value: 0, labelFr: 'Aucune réflexion sur la stratégie de sortie, les investisseurs n\'ont aucune visibilité sur comment et quand ils pourront réaliser leur investissement', labelEn: 'No exit strategy consideration, investors have no visibility on how and when they can realize their investment' },
        ],
      },
      {
        id: 'si-4',
        questionFr: 'Le pacte d\'actionnaires post-investissement est-il anticipé avec des clauses équilibrées — gouvernance, droits de vote, liquidité, protection des minoritaires, résolution des conflits ?',
        questionEn: 'Is the post-investment shareholders\' agreement anticipated with balanced clauses — governance, voting rights, liquidity, minority protection, conflict resolution?',
        options: [
          { value: 100, labelFr: 'Pacte d\'actionnaires complet anticipé : clauses de gouvernance détaillées (composition CA, comités, décisions réservées), droits de vote et majorités qualifiées, clauses de liquidité (droit de sortie conjointe, droit de cession forcée, droit de préemption, clause d\'agrément), protection des minoritaires (droit d\'information renforcé, droit de veto sur décisions clés), résolution des conflits (médiation, arbitrage OHADA), clauses de bonne foi, ajustement de prix, earn-out', labelEn: 'Comprehensive shareholders\' agreement anticipated: detailed governance clauses (Board composition, committees, reserved matters), voting rights and qualified majorities, liquidity clauses (tag-along, drag-along, pre-emption right, approval clause), minority protection (enhanced information right, key decision veto right), conflict resolution (mediation, OHADA arbitration), good faith clauses, price adjustment, earn-out' },
          { value: 67, labelFr: 'Pacte d\'actionnaires esquissé avec clauses principales mais détails juridiques non finalisés, protection des minoritaires partielle, conseil juridique en cours', labelEn: 'Shareholders\' agreement outlined with main clauses but legal details not finalized, partial minority protection, legal counsel in progress' },
          { value: 33, labelFr: 'Pacte d\'actionnaires minimal ou inexistant, clauses de protection des investisseurs non anticipées, risque de blocage ou de conflit post-investissement', labelEn: 'Minimal or non-existent shareholders\' agreement, investor protection clauses not anticipated, risk of deadlock or post-investment conflict' },
          { value: 0, labelFr: 'Aucune anticipation du pacte d\'actionnaires, pas de conseil juridique, structure juridique inadaptée à l\'entrée d\'investisseurs, risque juridique élevé', labelEn: 'No shareholders\' agreement anticipation, no legal counsel, legal structure unsuitable for investor entry, high legal risk' },
        ],
      },
      {
        id: 'si-5',
        questionFr: 'Un cadre de reporting investisseur est-il préparé — fréquence, format, KPI, états financiers, indicateurs ESG, communication en cas de crise ?',
        questionEn: 'Is an investor reporting framework prepared — frequency, format, KPIs, financial statements, ESG indicators, crisis communication?',
        options: [
          { value: 100, labelFr: 'Cadre de reporting investisseur structuré : reporting trimestriel standardisé (KPI opérationnels, financiers, ESG), états financiers trimestriels, rapport annuel audité, tableau de bord investisseur avec comparaison budget/réalisé, comité de pilotage trimestriel, alerte précoce en cas d\'écart significatif (>10%), conférence call trimestrielle, data room investisseur mise à jour, communication de crise formalisée', labelEn: 'Structured investor reporting framework: standardized quarterly reporting (operational, financial, ESG KPIs), quarterly financial statements, audited annual report, investor dashboard with budget/actual comparison, quarterly steering committee, early warning in case of significant deviation (>10%), quarterly conference call, updated investor data room, formalized crisis communication' },
          { value: 67, labelFr: 'Reporting investisseur défini mais format non standardisé, fréquence trimestrielle ou semestrielle, KPI principaux suivis mais pas de dashboard structuré', labelEn: 'Investor reporting defined but non-standardized format, quarterly or semi-annual frequency, main KPIs tracked but no structured dashboard' },
          { value: 33, labelFr: 'Reporting basique envisagé (états financiers annuels), pas de KPI définis, pas de fréquence formalisée, pas de cadre de communication investisseur', labelEn: 'Basic reporting considered (annual financial statements), no KPIs defined, no formalized frequency, no investor communication framework' },
          { value: 0, labelFr: 'Aucun cadre de reporting investisseur, les investisseurs n\'auront aucune visibilité sur la performance de leur investissement, risque de défiance', labelEn: 'No investor reporting framework, investors will have no visibility on their investment performance, risk of distrust' },
        ],
      },
    ],
  },
];

export const TOTAL_BANCABILITE_QUESTIONS = BANCABILITE_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getBancabiliteScoreColor(score: number): string {
  if (score >= 85) return '#059669';
  if (score >= 70) return '#0ea5e9';
  if (score >= 55) return '#d97706';
  if (score >= 35) return '#ea580c';
  return '#dc2626';
}

export function getBancabiliteScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr ? 'Excellente Bancabilité' : 'Excellent Bankability';
  if (score >= 70) return isFr ? 'Forte Bancabilité' : 'Strong Bankability';
  if (score >= 55) return isFr ? 'Bancabilité Modérée' : 'Moderate Bankability';
  if (score >= 35) return isFr ? 'Bancabilité Faible' : 'Weak Bankability';
  return isFr ? 'Bancabilité Insuffisante' : 'Insufficient Bankability';
}

export function getBancabiliteLevel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr ? 'Niveau 5 — Investment Grade' : 'Level 5 — Investment Grade';
  if (score >= 70) return isFr ? 'Niveau 4 — Proche Investment Grade' : 'Level 4 — Near Investment Grade';
  if (score >= 55) return isFr ? 'Niveau 3 — En Structuration' : 'Level 3 — Structuring';
  if (score >= 35) return isFr ? 'Niveau 2 — Pré-Bancabilité' : 'Level 2 — Pre-Bankability';
  return isFr ? 'Niveau 1 — Non Bancable' : 'Level 1 — Non-Bankable';
}

export function getBancabiliteInterpretation(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr
    ? 'Votre projet atteint le niveau Investment Grade. La stratégie est robuste, l\'équipe est crédible, les finances sont solides et la structuration est professionnelle. Vous êtes en position de force pour négocier avec les investisseurs. Maintenez ce niveau d\'excellence et préparez-vous à scaler après la levée de fonds.'
    : 'Your project reaches Investment Grade. Strategy is robust, team is credible, finances are solid and structuring is professional. You are in a strong position to negotiate with investors. Maintain this level of excellence and prepare to scale after fundraising.';
  if (score >= 70) return isFr
    ? 'Votre projet présente une forte bancabilité avec des fondamentaux solides. Quelques axes d\'amélioration ciblés — généralement en structuration juridique ou en due diligence — vous permettront d\'atteindre le niveau Investment Grade et d\'élargir votre pool d\'investisseurs potentiels.'
    : 'Your project shows strong bankability with solid fundamentals. A few targeted improvements — typically in legal structuring or due diligence — will allow you to reach Investment Grade and broaden your pool of potential investors.';
  if (score >= 55) return isFr
    ? 'Votre projet a posé des bases solides mais présente des lacunes significatives qui limiteront l\'intérêt des investisseurs institutionnels. La priorité est de renforcer la structuration financière, la documentation juridique et la préparation due diligence avant d\'approcher des investisseurs sérieux.'
    : 'Your project has laid solid foundations but shows significant gaps that will limit institutional investor interest. The priority is to strengthen financial structuring, legal documentation and due diligence preparation before approaching serious investors.';
  if (score >= 35) return isFr
    ? 'Votre projet est au stade de pré-bancabilité. De nombreux aspects critiques — business model, équipe, finances, documentation — ne sont pas encore au niveau attendu par les investisseurs. Un travail de structuration approfondi est nécessaire avant toute démarche de levée de fonds.'
    : 'Your project is at the pre-bankability stage. Many critical aspects — business model, team, finances, documentation — are not yet at the level expected by investors. Deep structuring work is needed before any fundraising approach.';
  return isFr
    ? 'Votre projet n\'est pas bancable en l\'état. Les fondamentaux — stratégie, équipe, finances, documentation — présentent des lacunes majeures qui entraîneront un rejet immédiat par tout investisseur professionnel. Un accompagnement structurant est indispensable avant d\'envisager une levée de fonds.'
    : 'Your project is not bankable in its current state. The fundamentals — strategy, team, finances, documentation — show major gaps that will lead to immediate rejection by any professional investor. Structuring support is essential before considering fundraising.';
}

export function getBancabiliteRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const sbmScore = perAxis['strategie-business-model'] ?? 0;
  const geScore = perAxis['gouvernance-equipe'] ?? 0;
  const pfScore = perAxis['performance-financiere'] ?? 0;
  const ddcScore = perAxis['due-diligence-conformite'] ?? 0;
  const siScore = perAxis['structuration-investissement'] ?? 0;

  if (sbmScore < 55) risks.push(isFr
    ? 'Business model non validé ou absence de différenciation : le marché n\'est pas quantifié, l\'avantage concurrentiel n\'est pas démontré, le modèle de revenus est flou — les investisseurs n\'investissent pas dans des concepts, ils investissent dans des business models éprouvés'
    : 'Unvalidated business model or absence of differentiation: market is not quantified, competitive advantage is not demonstrated, revenue model is unclear — investors don\'t invest in concepts, they invest in proven business models');
  if (geScore < 55) risks.push(isFr
    ? 'Équipe dirigeante insuffisante ou gouvernance absente : track record non démontré, équipe incomplète, absence de Conseil d\'Administration structuré — l\'équipe est le critère n°1 des investisseurs, une équipe faible tue le deal quelles que soient les autres qualités du projet'
    : 'Insufficient leadership team or absent governance: unproven track record, incomplete team, no structured Board — team is the #1 investor criterion, a weak team kills the deal regardless of other project qualities');
  if (pfScore < 55) risks.push(isFr
    ? 'Performance financière opaque ou projections non crédibles : pas d\'audit, hypothèses non documentées, unit economics non maîtrisés, pas de trajectoire vers la rentabilité — sans données financières fiables, aucune due diligence investisseur ne peut aboutir'
    : 'Opaque financial performance or non-credible projections: no audit, undocumented assumptions, unmastered unit economics, no path to profitability — without reliable financial data, no investor due diligence can succeed');
  if (ddcScore < 55) risks.push(isFr
    ? 'Due diligence et conformité lacunaires : documentation juridique éparse, conformité réglementaire incertaine, propriété intellectuelle non protégée, pas de data room — une due diligence qui révèle des lacunes documentaires entraîne soit l\'abandon du deal, soit une décote massive de valorisation (20-40 %)'
    : 'Deficient due diligence and compliance: scattered legal documentation, uncertain regulatory compliance, unprotected intellectual property, no data room — a due diligence revealing documentary gaps leads to either deal abandonment or massive valuation discount (20-40%)');
  if (siScore < 55) risks.push(isFr
    ? 'Structuration d\'investissement inexistante : valorisation non étayée, pas de term sheet, pas de pacte d\'actionnaires, pas de stratégie de sortie — sans structuration, les investisseurs ne peuvent pas évaluer les conditions de leur entrée ni de leur sortie, le deal est impossible à finaliser'
    : 'Non-existent investment structuring: unsubstantiated valuation, no term sheet, no shareholders\' agreement, no exit strategy — without structuring, investors cannot evaluate their entry or exit conditions, the deal is impossible to finalize');
  if (globalScore < 35) risks.push(isFr
    ? 'Profil de bancabilité critique : défaillances multiples et systémiques sur l\'ensemble des axes — le projet n\'est pas bancable en l\'état. Un accompagnement structurant (KHEPRA 360°) est indispensable avant toute démarche de levée de fonds. Approcher des investisseurs dans cet état nuira durablement à la crédibilité du projet.'
    : 'Critical bankability profile: multiple systemic failures across all axes — the project is not bankable in its current state. Structuring support (KHEPRA 360°) is essential before any fundraising approach. Approaching investors in this state will durably harm project credibility.');

  return risks;
}

export function getBancabiliteRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];

  const sbmScore = perAxis['strategie-business-model'] ?? 0;
  const geScore = perAxis['gouvernance-equipe'] ?? 0;
  const pfScore = perAxis['performance-financiere'] ?? 0;
  const ddcScore = perAxis['due-diligence-conformite'] ?? 0;
  const siScore = perAxis['structuration-investissement'] ?? 0;

  if (sbmScore < 55) {
    recs.push({
      title: isFr ? 'Structurer le Business Model et la Stratégie' : 'Structure the Business Model and Strategy',
      axis: 'strategie-business-model',
      items: isFr ? [
        'Formaliser un Business Model Canvas complet avec proposition de valeur, segments clients, canaux, relations clients, sources de revenus, ressources clés, activités clés, partenaires et structure de coûts',
        'Quantifier le marché adressable (TAM, SAM, SOM) avec une méthodologie rigoureuse, des sources vérifiables et une mise à jour annuelle',
        'Documenter l\'avantage concurrentiel avec une analyse comparative détaillée des concurrents directs et indirects, et identifier les barrières à l\'entrée',
        'Définir et tester le modèle de revenus — pricing, cycle de vente, CAC, LTV — avec des données réelles de transactions',
        'Élaborer un plan de scaling sur 3 phases (amorçage, croissance, maturité) avec des jalons quantifiés et des besoins en ressources documentés',
      ] : [
        'Formalize a complete Business Model Canvas with value proposition, customer segments, channels, customer relationships, revenue streams, key resources, key activities, partners and cost structure',
        'Quantify the addressable market (TAM, SAM, SOM) with rigorous methodology, verifiable sources and annual updates',
        'Document competitive advantage with detailed benchmarking of direct and indirect competitors, and identify barriers to entry',
        'Define and test the revenue model — pricing, sales cycle, CAC, LTV — with real transaction data',
        'Develop a 3-phase scaling plan (seed, growth, maturity) with quantified milestones and documented resource needs',
      ],
    });
  }

  if (geScore < 55) {
    recs.push({
      title: isFr ? 'Renforcer l\'Équipe Dirigeante et la Gouvernance' : 'Strengthen the Leadership Team and Governance',
      axis: 'gouvernance-equipe',
      items: isFr ? [
        'Compléter l\'équipe dirigeante avec des profils expérimentés couvrant toutes les fonctions critiques (technique, commercial, finance, opérations)',
        'Constituer un Conseil d\'Administration avec des administrateurs indépendants et mettre en place des comités spécialisés (Audit, Stratégie)',
        'Mettre en place un plan de rétention des talents : rémunération benchmarkée, plan d\'intéressement (ESOP), plan de développement individuel',
        'Constituer un Advisory Board avec 3+ profils reconnus apportant crédibilité, réseau et conseil stratégique',
        'Régulariser la répartition du capital : table de capitalisation à jour, pacte d\'actionnaires complet, plan d\'intéressement salariés structuré',
      ] : [
        'Complete the leadership team with experienced profiles covering all critical functions (technical, commercial, finance, operations)',
        'Constitute a Board of Directors with independent directors and set up specialized committees (Audit, Strategy)',
        'Implement a talent retention plan: benchmarked compensation, equity plan (ESOP), individual development plan',
        'Constitute an Advisory Board with 3+ recognized profiles providing credibility, network and strategic advice',
        'Regularize capital distribution: up-to-date cap table, comprehensive shareholders\' agreement, structured employee equity plan',
      ],
    });
  }

  if (pfScore < 55) {
    recs.push({
      title: isFr ? 'Professionnaliser la Performance Financière' : 'Professionalize Financial Performance',
      axis: 'performance-financiere',
      items: isFr ? [
        'Faire auditer les états financiers historiques par un commissaire aux comptes indépendant selon les normes SYSCOHADA ou IFRS',
        'Construire un business plan financier sur 5 ans avec hypothèses explicites, 3 scénarios (best/base/worst), DCF et analyse de sensibilité',
        'Calculer et suivre les indicateurs d\'unit economics (CAC, LTV, marge brute, période de récupération) par segment client',
        'Documenter la structure de coûts (fixes/variables), calculer le point mort et tracer une trajectoire crédible vers la rentabilité',
        'Quantifier précisément le besoin de financement avec un use of proceeds détaillé, des jalons associés et une stratégie de tours futurs',
      ] : [
        'Have historical financial statements audited by an independent auditor according to SYSCOHADA or IFRS standards',
        'Build a 5-year financial business plan with explicit assumptions, 3 scenarios (best/base/worst), DCF and sensitivity analysis',
        'Calculate and track unit economics indicators (CAC, LTV, gross margin, payback period) by customer segment',
        'Document cost structure (fixed/variable), calculate break-even point and trace a credible path to profitability',
        'Precisely quantify financing need with a detailed use of proceeds, associated milestones and future round strategy',
      ],
    });
  }

  if (ddcScore < 55) {
    recs.push({
      title: isFr ? 'Préparer la Due Diligence et la Conformité' : 'Prepare Due Diligence and Compliance',
      axis: 'due-diligence-conformite',
      items: isFr ? [
        'Organiser et compléter la documentation juridique : statuts à jour, registres, PV d\'AG/CA, contrats clés classés et résumés',
        'Réaliser un audit de conformité réglementaire complet (fiscal, social, sectoriel, environnemental) et régulariser les écarts',
        'Protéger la propriété intellectuelle : dépôt de marques (OAPI), brevets, formalisation du savoir-faire, contrats de cession PI',
        'Établir une cartographie des risques exhaustive avec plans de mitigation, couverture assurantielle adaptée et registre des risques',
        'Déployer une data room virtuelle (VDR) professionnelle avec tous les documents de due diligence classés par catégorie et accessibles de manière sécurisée',
      ] : [
        'Organize and complete legal documentation: updated bylaws, registers, GA/Board minutes, key contracts classified and summarized',
        'Perform a complete regulatory compliance audit (tax, social, sectoral, environmental) and regularize gaps',
        'Protect intellectual property: trademark registration (OAPI), patents, know-how formalization, IP assignment contracts',
        'Establish an exhaustive risk mapping with mitigation plans, appropriate insurance coverage and risk register',
        'Deploy a professional virtual data room (VDR) with all due diligence documents classified by category and securely accessible',
      ],
    });
  }

  if (siScore < 55) {
    recs.push({
      title: isFr ? 'Structurer l\'Investissement' : 'Structure the Investment',
      axis: 'structuration-investissement',
      items: isFr ? [
        'Établir une valorisation robuste avec DCF (WACC documenté), comparables boursiers, transactions récentes et analyse de sensibilité',
        'Préparer un term sheet professionnel avec tous les termes clés : montant, valorisation, instruments, droits, gouvernance, conditions',
        'Définir une stratégie de sortie documentée sur 5-7 ans avec 3 scénarios analysés (cession, IPO, secondary), TRI cible et acquéreurs potentiels',
        'Anticiper le pacte d\'actionnaires post-investissement : gouvernance, droits de vote, liquidité, protection des minoritaires, résolution des conflits',
        'Structurer le cadre de reporting investisseur : fréquence trimestrielle, KPI standardisés, dashboard, comité de pilotage, alerte précoce',
      ] : [
        'Establish a robust valuation with DCF (documented WACC), public comparables, recent transactions and sensitivity analysis',
        'Prepare a professional term sheet with all key terms: amount, valuation, instruments, rights, governance, conditions',
        'Define a documented 5-7 year exit strategy with 3 analyzed scenarios (trade sale, IPO, secondary), target IRR and potential acquirers',
        'Anticipate the post-investment shareholders\' agreement: governance, voting rights, liquidity, minority protection, conflict resolution',
        'Structure the investor reporting framework: quarterly frequency, standardized KPIs, dashboard, steering committee, early warning',
      ],
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'Excellence de Bancabilité' : 'Maintain Bankability Excellence',
      axis: 'strategie-business-model',
      items: isFr ? [
        'Continuer à enrichir le business plan avec des analyses prospectives et des scénarios de disruption sectorielle',
        'Renforcer la gouvernance avec des administrateurs de stature internationale et un comité stratégique de haut niveau',
        'Préparer une stratégie de cotation sur un marché régional (BRVM, BVMAC) à horizon 3-5 ans',
        'Investir dans l\'analytique avancée et l\'IA pour optimiser les unit economics et la prédiction de la performance',
        'Développer une stratégie ESG de niveau institutional-grade pour attirer les fonds d\'impact et les investisseurs institutionnels internationaux',
      ] : [
        'Continue enriching the business plan with forward-looking analyses and sector disruption scenarios',
        'Strengthen governance with internationally-recognized directors and a high-level strategic committee',
        'Prepare a listing strategy on a regional market (BRVM, BVMAC) within 3-5 years',
        'Invest in advanced analytics and AI to optimize unit economics and performance prediction',
        'Develop an institutional-grade ESG strategy to attract impact funds and international institutional investors',
      ],
    });
  }

  return recs;
}