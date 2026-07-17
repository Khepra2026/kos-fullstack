export interface PerenniteQuestion {
  id: string;
  questionFr: string;
  questionEn: string;
  options: { value: number; labelFr: string; labelEn: string }[];
}

export interface PerenniteAxis {
  id: string;
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  icon: string;
  color: string;
  questions: PerenniteQuestion[];
}

export const PERENNITE_AXES: PerenniteAxis[] = [
  {
    id: 'gouvernance-familiale',
    titleFr: 'Gouvernance Familiale',
    titleEn: 'Family Governance',
    descriptionFr: 'Conseil de famille, constitution familiale, charte, assemblée familiale, protocole',
    descriptionEn: 'Family council, family constitution, charter, family assembly, protocol',
    icon: 'ri-group-line',
    color: '#b45309',
    questions: [
      {
        id: 'gf-1',
        questionFr: 'Existe-t-il un Conseil de Famille formalisé, avec des réunions régulières, un ordre du jour structuré et des décisions documentées ?',
        questionEn: 'Is there a formalized Family Council with regular meetings, a structured agenda and documented decisions?',
        options: [
          { value: 100, labelFr: 'Conseil de Famille pleinement opérationnel, réunions trimestrielles, ordre du jour formalisé, PV documentés, règles de vote définies', labelEn: 'Fully operational Family Council, quarterly meetings, formal agenda, documented minutes, defined voting rules' },
          { value: 60, labelFr: 'Conseil de Famille existant mais réunions irrégulières, documentation partielle ou règles de gouvernance informelles', labelEn: 'Family Council exists but irregular meetings, partial documentation or informal governance rules' },
          { value: 25, labelFr: 'Réunions familiales ponctuelles sans cadre formalisé, décisions orales', labelEn: 'Occasional family meetings without formal framework, oral decisions' },
          { value: 0, labelFr: 'Aucun Conseil de Famille ni réunion familiale structurée', labelEn: 'No Family Council or structured family meetings' },
        ],
      },
      {
        id: 'gf-2',
        questionFr: 'Une Constitution Familiale (ou Charte Familiale) a-t-elle été rédigée, adoptée par l\'ensemble des membres de la famille et régulièrement mise à jour ?',
        questionEn: 'Has a Family Constitution (or Family Charter) been drafted, adopted by all family members and regularly updated?',
        options: [
          { value: 100, labelFr: 'Constitution Familiale rédigée, adoptée à l\'unanimité, mise à jour tous les 3 ans, valeurs et principes partagés par toutes les générations', labelEn: 'Family Constitution drafted, unanimously adopted, updated every 3 years, values and principles shared across all generations' },
          { value: 60, labelFr: 'Constitution Familiale rédigée mais adoption partielle ou mise à jour non systématique', labelEn: 'Family Constitution drafted but partial adoption or non-systematic update' },
          { value: 25, labelFr: 'Valeurs familiales partagées oralement mais aucun document formalisé', labelEn: 'Family values shared orally but no formal document' },
          { value: 0, labelFr: 'Aucune Constitution Familiale ni valeurs formalisées', labelEn: 'No Family Constitution or formalized values' },
        ],
      },
      {
        id: 'gf-3',
        questionFr: 'Les rôles entre la famille, le Conseil d\'Administration et la direction générale sont-ils clairement définis, documentés et respectés ?',
        questionEn: 'Are the roles between the family, the Board of Directors and management clearly defined, documented and respected?',
        options: [
          { value: 100, labelFr: 'Rôles clarifiés par écrit, séparation famille/entreprise effective, critères objectifs d\'accès aux postes de direction, évaluation régulière', labelEn: 'Roles clarified in writing, effective family/business separation, objective criteria for management positions, regular evaluation' },
          { value: 60, labelFr: 'Rôles définis informellement, séparation partielle entre famille et entreprise', labelEn: 'Roles defined informally, partial separation between family and business' },
          { value: 25, labelFr: 'Confusion fréquente entre décisions familiales et décisions d\'entreprise', labelEn: 'Frequent confusion between family decisions and business decisions' },
          { value: 0, labelFr: 'Aucune distinction entre famille et entreprise, décisions prises de manière informelle', labelEn: 'No distinction between family and business, decisions made informally' },
        ],
      },
      {
        id: 'gf-4',
        questionFr: 'Un Pacte d\'Actionnaires Familial est-il en place, définissant les conditions d\'entrée, de sortie, de cession et les droits de vote ?',
        questionEn: 'Is a Family Shareholders\' Agreement in place, defining entry, exit, transfer conditions and voting rights?',
        options: [
          { value: 100, labelFr: 'Pacte d\'Actionnaires juridiquement formalisé, clauses de sortie, de préemption, d\'agrément et d\'inaliénabilité définies, mis à jour', labelEn: 'Legally formalized Shareholders\' Agreement, exit, preemption, approval and inalienability clauses defined, updated' },
          { value: 60, labelFr: 'Pacte d\'Actionnaires existant mais clauses limitées ou non actualisées', labelEn: 'Shareholders\' Agreement exists but limited clauses or not updated' },
          { value: 25, labelFr: 'Accord informel entre actionnaires sans document juridique', labelEn: 'Informal agreement between shareholders without legal document' },
          { value: 0, labelFr: 'Aucun Pacte d\'Actionnaires, actions détenues sans cadre juridique', labelEn: 'No Shareholders\' Agreement, shares held without legal framework' },
        ],
      },
      {
        id: 'gf-5',
        questionFr: 'Des politiques claires existent-elles concernant l\'emploi des membres de la famille dans l\'entreprise (critères de recrutement, rémunération, évaluation) ?',
        questionEn: 'Are there clear policies regarding family member employment in the company (recruitment criteria, compensation, evaluation)?',
        options: [
          { value: 100, labelFr: 'Politique d\'emploi familial documentée, critères objectifs de recrutement, rémunération alignée sur le marché, évaluation de performance, parcours professionnel externe exigé', labelEn: 'Documented family employment policy, objective recruitment criteria, market-aligned compensation, performance evaluation, external career path required' },
          { value: 60, labelFr: 'Politique informelle, recrutement partiellement basé sur des critères objectifs', labelEn: 'Informal policy, recruitment partially based on objective criteria' },
          { value: 25, labelFr: 'Aucune politique formalisée, emploi familial basé sur des critères subjectifs', labelEn: 'No formal policy, family employment based on subjective criteria' },
          { value: 0, labelFr: 'Emploi familial sans aucun critère, rémunérations arbitraires', labelEn: 'Family employment without any criteria, arbitrary compensation' },
        ],
      },
    ],
  },
  {
    id: 'transmission-succession',
    titleFr: 'Transmission & Succession',
    titleEn: 'Transmission & Succession',
    descriptionFr: 'Plan de succession, formation de la génération suivante, continuité du leadership, mentorat',
    descriptionEn: 'Succession plan, next-gen training, leadership continuity, mentoring',
    icon: 'ri-arrow-right-circle-line',
    color: '#0f766e',
    questions: [
      {
        id: 'ts-1',
        questionFr: 'Un Plan de Succession formel est-il documenté, approuvé par les instances de gouvernance et régulièrement révisé ?',
        questionEn: 'Is a formal Succession Plan documented, approved by governance bodies and regularly reviewed?',
        options: [
          { value: 100, labelFr: 'Plan de succession documenté et approuvé, identification des successeurs potentiels, plan de développement individuel, calendrier de transition, révision annuelle', labelEn: 'Documented and approved succession plan, identified potential successors, individual development plan, transition timeline, annual review' },
          { value: 60, labelFr: 'Plan de succession informel ou en cours d\'élaboration, identification partielle des successeurs', labelEn: 'Informal succession plan or under development, partial successor identification' },
          { value: 25, labelFr: 'Réflexion initiée mais aucun document formalisé, la succession repose sur le postulat que les enfants reprendront naturellement', labelEn: 'Reflection initiated but no formal document, succession based on assumption children will naturally take over' },
          { value: 0, labelFr: 'Aucun plan de succession, le sujet n\'est pas abordé ou est tabou', labelEn: 'No succession plan, topic not addressed or is taboo' },
        ],
      },
      {
        id: 'ts-2',
        questionFr: 'La génération suivante bénéficie-t-elle d\'un programme structuré de formation et de mentorat pour la préparer à ses futures responsabilités ?',
        questionEn: 'Does the next generation benefit from a structured training and mentoring program to prepare them for future responsibilities?',
        options: [
          { value: 100, labelFr: 'Programme formel de développement : expérience externe exigée (3-5 ans), mentorat structuré, formation en gouvernance et leadership, évaluation régulière des compétences', labelEn: 'Formal development program: external experience required (3-5 years), structured mentoring, governance and leadership training, regular skills assessment' },
          { value: 60, labelFr: 'Formation partiellement structurée, expérience externe encouragée mais non exigée', labelEn: 'Partially structured training, external experience encouraged but not required' },
          { value: 25, labelFr: 'Formation informelle, immersion progressive dans l\'entreprise sans parcours défini', labelEn: 'Informal training, progressive immersion in the company without defined path' },
          { value: 0, labelFr: 'Aucun programme de formation, la génération suivante apprend sur le tas', labelEn: 'No training program, next generation learns on the job' },
        ],
      },
      {
        id: 'ts-3',
        questionFr: 'Le fondateur ou dirigeant actuel a-t-il formellement préparé son retrait progressif avec un calendrier de transition et un plan de transfert de compétences ?',
        questionEn: 'Has the founder or current leader formally prepared their gradual withdrawal with a transition timeline and skills transfer plan?',
        options: [
          { value: 100, labelFr: 'Retrait planifié sur 3-5 ans, calendrier documenté, transfert progressif des responsabilités, accompagnement post-transition, mécénat de compétences', labelEn: 'Withdrawal planned over 3-5 years, documented timeline, progressive transfer of responsibilities, post-transition support, skills patronage' },
          { value: 60, labelFr: 'Intention de retrait exprimée mais sans calendrier précis ni plan formalisé', labelEn: 'Withdrawal intention expressed but without precise timeline or formal plan' },
          { value: 25, labelFr: 'Le dirigeant déclare vouloir passer la main mais aucun acte concret n\'a été posé', labelEn: 'Leader states wanting to hand over but no concrete action has been taken' },
          { value: 0, labelFr: 'Aucune préparation, le dirigeant n\'envisage pas son départ ou refuse de l\'aborder', labelEn: 'No preparation, leader does not envision departure or refuses to address it' },
        ],
      },
      {
        id: 'ts-4',
        questionFr: 'Des dispositifs juridiques et fiscaux ont-ils été mis en place pour optimiser la transmission (donation-partage, holding familiale, assurance-vie, mandat de protection future) ?',
        questionEn: 'Have legal and tax arrangements been implemented to optimize transmission (gift-sharing, family holding company, life insurance, future protection mandate)?',
        options: [
          { value: 100, labelFr: 'Stratégie patrimoniale globale mise en œuvre, holding familiale structurée, donation-partage réalisée, fiscalité optimisée, conseils juridiques et fiscaux réguliers', labelEn: 'Global wealth strategy implemented, structured family holding, gift-sharing completed, optimized taxation, regular legal and tax advice' },
          { value: 60, labelFr: 'Certains dispositifs en place mais stratégie incomplète ou non actualisée', labelEn: 'Some arrangements in place but strategy incomplete or not updated' },
          { value: 25, labelFr: 'Réflexion initiée mais aucun dispositif formel mis en œuvre', labelEn: 'Reflection initiated but no formal arrangement implemented' },
          { value: 0, labelFr: 'Aucune optimisation juridique ou fiscale de la transmission', labelEn: 'No legal or tax optimization of transmission' },
        ],
      },
      {
        id: 'ts-5',
        questionFr: 'Les héritiers non impliqués dans l\'entreprise ont-ils un statut clair protégeant leurs droits sans entraver la gestion opérationnelle ?',
        questionEn: 'Do heirs not involved in the company have a clear status protecting their rights without hindering operational management?',
        options: [
          { value: 100, labelFr: 'Statut clairement défini : actions avec droits de vote différenciés, dividende prioritaire, représentation au Conseil de Famille, information financière régulière', labelEn: 'Clearly defined status: shares with differentiated voting rights, priority dividend, Family Council representation, regular financial information' },
          { value: 60, labelFr: 'Distinction partielle entre héritiers actifs et passifs mais cadre juridique incomplet', labelEn: 'Partial distinction between active and passive heirs but incomplete legal framework' },
          { value: 25, labelFr: 'Différenciation informelle sans statut juridique, source potentielle de conflits', labelEn: 'Informal differentiation without legal status, potential source of conflicts' },
          { value: 0, labelFr: 'Aucune distinction, tous les héritiers ont les mêmes droits indépendamment de leur implication', labelEn: 'No distinction, all heirs have the same rights regardless of involvement' },
        ],
      },
    ],
  },
  {
    id: 'preservation-patrimoine',
    titleFr: 'Préservation du Patrimoine',
    titleEn: 'Wealth Preservation',
    descriptionFr: 'Structure juridique, diversification des actifs, gestion des risques, stratégie d\'investissement',
    descriptionEn: 'Legal structure, asset diversification, risk management, investment strategy',
    icon: 'ri-bank-line',
    color: '#7c3aed',
    questions: [
      {
        id: 'pp-1',
        questionFr: 'Le patrimoine familial est-il structuré de manière à protéger les actifs stratégiques contre les risques juridiques, fiscaux et matrimoniaux ?',
        questionEn: 'Is the family wealth structured to protect strategic assets against legal, tax and matrimonial risks?',
        options: [
          { value: 100, labelFr: 'Structure juridique optimisée : holding animatrice, séparation immobilier/exploitation, régimes matrimoniaux adaptés, clauses d\'inaliénabilité, revue juridique annuelle', labelEn: 'Optimized legal structure: holding company, real estate/operations separation, adapted matrimonial regimes, inalienability clauses, annual legal review' },
          { value: 60, labelFr: 'Structure existante mais non optimisée ou partiellement documentée', labelEn: 'Structure exists but not optimized or partially documented' },
          { value: 25, labelFr: 'Structure juridique minimale, actifs détenus directement sans protection', labelEn: 'Minimal legal structure, assets held directly without protection' },
          { value: 0, labelFr: 'Aucune structuration patrimoniale, confusion entre patrimoine personnel et professionnel', labelEn: 'No wealth structuring, confusion between personal and professional assets' },
        ],
      },
      {
        id: 'pp-2',
        questionFr: 'Une stratégie de diversification des actifs du Groupe Familial est-elle en place pour réduire la concentration des risques sur un seul secteur ou une seule zone géographique ?',
        questionEn: 'Is a Family Group asset diversification strategy in place to reduce risk concentration on a single sector or geographical area?',
        options: [
          { value: 100, labelFr: 'Diversification sectorielle et géographique documentée, allocation d\'actifs définie, nouveaux investissements explorés systématiquement, revue stratégique annuelle', labelEn: 'Documented sector and geographical diversification, defined asset allocation, systematically explored new investments, annual strategic review' },
          { value: 60, labelFr: 'Diversification partielle, quelques investissements hors secteur principal mais sans stratégie globale', labelEn: 'Partial diversification, some investments outside main sector but without global strategy' },
          { value: 25, labelFr: 'Concentration forte sur un seul secteur ou une seule zone, diversification envisagée mais non réalisée', labelEn: 'Strong concentration on single sector or zone, diversification considered but not implemented' },
          { value: 0, labelFr: 'Aucune diversification, tous les actifs concentrés dans l\'entreprise familiale principale', labelEn: 'No diversification, all assets concentrated in main family business' },
        ],
      },
      {
        id: 'pp-3',
        questionFr: 'Les participations du Groupe sont-elles valorisées régulièrement avec une méthode objective et documentée, permettant une vision claire de la valeur du patrimoine ?',
        questionEn: 'Are the Group\'s holdings regularly valued with an objective and documented method, providing a clear view of wealth value?',
        options: [
          { value: 100, labelFr: 'Valorisation annuelle par méthode DCF et comparables, documentation complète, présentée au Conseil de Famille, utilisée pour les décisions stratégiques', labelEn: 'Annual valuation by DCF and comparable methods, complete documentation, presented to Family Council, used for strategic decisions' },
          { value: 60, labelFr: 'Valorisation périodique mais méthode non pleinement documentée ou non présentée aux instances familiales', labelEn: 'Periodic valuation but method not fully documented or not presented to family bodies' },
          { value: 25, labelFr: 'Valorisation approximative basée sur des critères subjectifs ou obsolètes', labelEn: 'Approximate valuation based on subjective or obsolete criteria' },
          { value: 0, labelFr: 'Aucune valorisation objective du patrimoine familial', labelEn: 'No objective valuation of family wealth' },
        ],
      },
      {
        id: 'pp-4',
        questionFr: 'Des mécanismes de liquidité sont-ils prévus pour les membres de la famille souhaitant sortir du capital sans déstabiliser l\'entreprise ?',
        questionEn: 'Are liquidity mechanisms provided for family members wishing to exit capital without destabilizing the company?',
        options: [
          { value: 100, labelFr: 'Mécanismes documentés : fonds de liquidité familial, droit de sortie conjointe, cession progressive programmée, valorisation objective, financement prévu', labelEn: 'Documented mechanisms: family liquidity fund, tag-along right, programmed progressive transfer, objective valuation, funding planned' },
          { value: 60, labelFr: 'Mécanismes partiels, clauses de sortie existantes mais financement non sécurisé', labelEn: 'Partial mechanisms, exit clauses exist but funding not secured' },
          { value: 25, labelFr: 'Clauses de sortie basiques sans mécanisme de financement, risque de conflit', labelEn: 'Basic exit clauses without funding mechanism, risk of conflict' },
          { value: 0, labelFr: 'Aucun mécanisme de liquidité, sortie impossible sans vendre à un tiers', labelEn: 'No liquidity mechanism, exit impossible without selling to a third party' },
        ],
      },
      {
        id: 'pp-5',
        questionFr: 'Une politique d\'endettement du Groupe est-elle formalisée, avec des ratios d\'endettement cibles, une gestion du risque de taux et une stratégie de financement ?',
        questionEn: 'Is a Group debt policy formalized, with target debt ratios, interest rate risk management and a financing strategy?',
        options: [
          { value: 100, labelFr: 'Politique d\'endettement documentée, ratios cibles respectés (Dette/EBITDA < 3x), couverture du risque de taux, sources de financement diversifiées, reporting régulier', labelEn: 'Documented debt policy, respected target ratios (Debt/EBITDA < 3x), interest rate risk hedging, diversified financing sources, regular reporting' },
          { value: 60, labelFr: 'Politique existante mais ratios non systématiquement suivis ou reporting irrégulier', labelEn: 'Policy exists but ratios not systematically tracked or irregular reporting' },
          { value: 25, labelFr: 'Endettement géré de manière réactive sans cadre formalisé', labelEn: 'Debt managed reactively without formal framework' },
          { value: 0, labelFr: 'Aucune politique d\'endettement, endettement non piloté', labelEn: 'No debt policy, uncontrolled debt' },
        ],
      },
    ],
  },
  {
    id: 'gestion-conflits',
    titleFr: 'Gestion des Conflits',
    titleEn: 'Conflict Management',
    descriptionFr: 'Prévention, médiation, mécanismes de résolution, communication familiale',
    descriptionEn: 'Prevention, mediation, resolution mechanisms, family communication',
    icon: 'ri-heart-line',
    color: '#dc2626',
    questions: [
      {
        id: 'gc-1',
        questionFr: 'Des mécanismes formels de résolution des conflits familiaux sont-ils en place (médiation, arbitrage familial, comité de résolution) ?',
        questionEn: 'Are formal family conflict resolution mechanisms in place (mediation, family arbitration, resolution committee)?',
        options: [
          { value: 100, labelFr: 'Mécanismes documentés : médiateur familial désigné, procédure de résolution en 3 étapes (dialogue / médiation / arbitrage), charte de résolution des conflits signée par tous', labelEn: 'Documented mechanisms: designated family mediator, 3-step resolution procedure (dialogue / mediation / arbitration), conflict resolution charter signed by all' },
          { value: 60, labelFr: 'Procédure de résolution existante mais non systématiquement appliquée ou non documentée', labelEn: 'Resolution procedure exists but not systematically applied or not documented' },
          { value: 25, labelFr: 'Résolution informelle reposant sur l\'autorité du fondateur ou du patriarche', labelEn: 'Informal resolution based on founder or patriarch authority' },
          { value: 0, labelFr: 'Aucun mécanisme de résolution des conflits, tensions ignorées ou gérées par évitement', labelEn: 'No conflict resolution mechanism, tensions ignored or managed by avoidance' },
        ],
      },
      {
        id: 'gc-2',
        questionFr: 'La communication au sein de la famille sur les sujets d\'entreprise est-elle structurée avec des canaux dédiés, une fréquence définie et une transparence des informations ?',
        questionEn: 'Is family communication on business matters structured with dedicated channels, defined frequency and information transparency?',
        options: [
          { value: 100, labelFr: 'Communication structurée : newsletter familiale trimestrielle, réunions d\'information semestrielles, rapports financiers simplifiés pour non-experts, espace d\'échange dédié', labelEn: 'Structured communication: quarterly family newsletter, semi-annual information meetings, simplified financial reports for non-experts, dedicated exchange space' },
          { value: 60, labelFr: 'Communication régulière mais informelle, information partagée de manière non systématique', labelEn: 'Regular but informal communication, information shared non-systematically' },
          { value: 25, labelFr: 'Communication limitée, rétention d\'information, asymétrie entre branches familiales', labelEn: 'Limited communication, information retention, asymmetry between family branches' },
          { value: 0, labelFr: 'Absence de communication structurée, rumeurs et non-dits dominent', labelEn: 'No structured communication, rumors and unspoken issues dominate' },
        ],
      },
      {
        id: 'gc-3',
        questionFr: 'Les conjoints et les membres de la famille par alliance sont-ils intégrés de manière claire dans la gouvernance familiale avec des droits et des limites définis ?',
        questionEn: 'Are spouses and in-laws clearly integrated into family governance with defined rights and limits?',
        options: [
          { value: 100, labelFr: 'Statut des conjoints documenté : participation au Conseil de Famille définie, droits d\'information, régime matrimonial aligné avec la Constitution Familiale, formation proposée', labelEn: 'Documented spouse status: Family Council participation defined, information rights, matrimonial regime aligned with Family Constitution, training offered' },
          { value: 60, labelFr: 'Règles informelles, droits et limites non documentés, source potentielle de tensions', labelEn: 'Informal rules, undocumented rights and limits, potential source of tensions' },
          { value: 25, labelFr: 'Situation ambiguë, décisions au cas par cas, inégalités entre branches familiales', labelEn: 'Ambiguous situation, case-by-case decisions, inequalities between family branches' },
          { value: 0, labelFr: 'Aucune règle, les conjoints sont soit exclus soit impliqués sans cadre, source majeure de conflits', labelEn: 'No rules, spouses either excluded or involved without framework, major source of conflicts' },
        ],
      },
      {
        id: 'gc-4',
        questionFr: 'Y a-t-il eu des conflits familiaux majeurs au cours des 5 dernières années ? Si oui, comment ont-ils été résolus et quels enseignements en ont été tirés ?',
        questionEn: 'Have there been major family conflicts in the last 5 years? If so, how were they resolved and what lessons were learned?',
        options: [
          { value: 100, labelFr: 'Aucun conflit majeur ou conflits résolus via des mécanismes formalisés, enseignements documentés, mesures préventives adoptées', labelEn: 'No major conflict or conflicts resolved through formal mechanisms, documented lessons learned, preventive measures adopted' },
          { value: 60, labelFr: 'Conflits résolus mais de manière informelle, sans capitalisation sur les enseignements', labelEn: 'Conflicts resolved but informally, without capitalizing on lessons learned' },
          { value: 25, labelFr: 'Conflits persistants, résolution partielle, ressentiment résiduel', labelEn: 'Persistent conflicts, partial resolution, residual resentment' },
          { value: 0, labelFr: 'Conflits majeurs non résolus, impact négatif sur l\'entreprise, risque d\'éclatement du Groupe', labelEn: 'Major unresolved conflicts, negative impact on business, risk of Group breakup' },
        ],
      },
      {
        id: 'gc-5',
        questionFr: 'Le principe d\'équité entre les branches familiales est-il formellement défini (équité vs égalité, traitement différencié justifié, critères objectifs) ?',
        questionEn: 'Is the principle of equity between family branches formally defined (equity vs equality, justified differentiated treatment, objective criteria)?',
        options: [
          { value: 100, labelFr: 'Principe d\'équité documenté dans la Constitution Familiale, distinction claire entre équité et égalité, critères objectifs de répartition, mécanisme d\'ajustement périodique', labelEn: 'Equity principle documented in Family Constitution, clear distinction between equity and equality, objective distribution criteria, periodic adjustment mechanism' },
          { value: 60, labelFr: 'Principe d\'équité reconnu mais non formalisé, application inconstante', labelEn: 'Equity principle recognized but not formalized, inconsistent application' },
          { value: 25, labelFr: 'Confusion entre équité et égalité, décisions subjectives, favoritisme perçu', labelEn: 'Confusion between equity and equality, subjective decisions, perceived favoritism' },
          { value: 0, labelFr: 'Aucun principe d\'équité, répartition arbitraire, ressentiment entre branches', labelEn: 'No equity principle, arbitrary distribution, resentment between branches' },
        ],
      },
    ],
  },
  {
    id: 'professionnalisation',
    titleFr: 'Professionnalisation',
    titleEn: 'Professionalization',
    descriptionFr: 'Management externe, Conseil d\'Administration, processus, systèmes, reporting',
    descriptionEn: 'External management, Board of Directors, processes, systems, reporting',
    icon: 'ri-briefcase-line',
    color: '#0891b2',
    questions: [
      {
        id: 'pro-1',
        questionFr: 'L\'entreprise familiale est-elle dirigée par des managers professionnels (familiaux ou externes) sélectionnés sur la base de compétences objectives ?',
        questionEn: 'Is the family business managed by professional managers (family or external) selected based on objective skills?',
        options: [
          { value: 100, labelFr: 'Direction professionnalisée : comité de direction avec managers externes expérimentés, recrutement basé sur compétences, évaluation 360°, plan de développement', labelEn: 'Professional management: executive committee with experienced external managers, skills-based recruitment, 360° evaluation, development plan' },
          { value: 60, labelFr: 'Mix managers familiaux et externes, processus de sélection partiellement objectif', labelEn: 'Mix of family and external managers, partially objective selection process' },
          { value: 25, labelFr: 'Direction principalement familiale, recrutement externe limité aux fonctions support', labelEn: 'Mainly family management, external recruitment limited to support functions' },
          { value: 0, labelFr: 'Direction exclusivement familiale sans critères de compétence objectifs', labelEn: 'Exclusively family management without objective skill criteria' },
        ],
      },
      {
        id: 'pro-2',
        questionFr: 'Le Conseil d\'Administration inclut-il des administrateurs indépendants externes à la famille, apportant une expertise complémentaire et un regard objectif ?',
        questionEn: 'Does the Board of Directors include independent directors external to the family, bringing complementary expertise and objective perspective?',
        options: [
          { value: 100, labelFr: 'CA équilibré : majorité d\'administrateurs indépendants, comités spécialisés (Audit, Stratégie, Rémunération), évaluation annuelle du CA, formation continue', labelEn: 'Balanced Board: majority of independent directors, specialized committees (Audit, Strategy, Compensation), annual Board evaluation, continuous training' },
          { value: 60, labelFr: 'Administrateurs indépendants présents mais minoritaires, comités partiellement constitués', labelEn: 'Independent directors present but minority, committees partially constituted' },
          { value: 25, labelFr: 'CA exclusivement familial, absence de regard externe', labelEn: 'Exclusively family Board, absence of external perspective' },
          { value: 0, labelFr: 'Pas de Conseil d\'Administration formalisé ou CA fantoche', labelEn: 'No formal Board or rubber-stamp Board' },
        ],
      },
      {
        id: 'pro-3',
        questionFr: 'Les processus clés (stratégie, budget, recrutement, investissement) sont-ils formalisés et suivent-ils des procédures écrites indépendantes des personnes ?',
        questionEn: 'Are key processes (strategy, budget, recruitment, investment) formalized and do they follow written procedures independent of individuals?',
        options: [
          { value: 100, labelFr: 'Processus clés documentés et digitalisés, délégations de pouvoirs formalisées, comités d\'investissement indépendants, cycle budgétaire structuré, tableaux de bord de pilotage', labelEn: 'Key processes documented and digitized, formalized delegation of authority, independent investment committees, structured budget cycle, management dashboards' },
          { value: 60, labelFr: 'Processus principaux documentés mais application inconstante ou non digitalisée', labelEn: 'Main processes documented but inconsistent or non-digitized application' },
          { value: 25, labelFr: 'Processus informels dépendant des personnes clés, absence de documentation', labelEn: 'Informal processes dependent on key individuals, absence of documentation' },
          { value: 0, labelFr: 'Aucun processus formalisé, décisions arbitraires au cas par cas', labelEn: 'No formalized processes, arbitrary case-by-case decisions' },
        ],
      },
      {
        id: 'pro-4',
        questionFr: 'Des systèmes d\'information de gestion (ERP, CRM, BI) sont-ils en place pour produire un reporting financier et opérationnel fiable et régulier ?',
        questionEn: 'Are management information systems (ERP, CRM, BI) in place to produce reliable and regular financial and operational reporting?',
        options: [
          { value: 100, labelFr: 'ERP intégré, CRM déployé, outils BI avec tableaux de bord, reporting mensuel au CA et au Conseil de Famille, données fiables et auditables', labelEn: 'Integrated ERP, deployed CRM, BI tools with dashboards, monthly reporting to Board and Family Council, reliable and auditable data' },
          { value: 60, labelFr: 'Systèmes partiellement intégrés, reporting disponible mais non consolidé ou avec délais', labelEn: 'Partially integrated systems, reporting available but not consolidated or with delays' },
          { value: 25, labelFr: 'Excel principalement, reporting basique, données non fiabilisées', labelEn: 'Mainly Excel, basic reporting, unreliable data' },
          { value: 0, labelFr: 'Aucun système d\'information de gestion, reporting inexistant ou non fiable', labelEn: 'No management information system, non-existent or unreliable reporting' },
        ],
      },
      {
        id: 'pro-5',
        questionFr: 'Une stratégie formalisée à 3-5 ans existe-t-elle, avec des objectifs mesurables, des plans d\'action et un suivi régulier par le Conseil ?',
        questionEn: 'Does a formalized 3-5 year strategy exist, with measurable objectives, action plans and regular monitoring by the Board?',
        options: [
          { value: 100, labelFr: 'Plan stratégique documenté sur 5 ans, objectifs SMART, plans d\'action détaillés, revue trimestrielle par le CA, ajustements basés sur KPIs, alignement avec la vision familiale', labelEn: 'Documented 5-year strategic plan, SMART objectives, detailed action plans, quarterly Board review, KPI-based adjustments, alignment with family vision' },
          { value: 60, labelFr: 'Plan stratégique existant mais non régulièrement suivi ou mis à jour', labelEn: 'Strategic plan exists but not regularly monitored or updated' },
          { value: 25, labelFr: 'Orientations stratégiques définies informellement, sans documentation ni suivi structuré', labelEn: 'Strategic directions defined informally, without documentation or structured follow-up' },
          { value: 0, labelFr: 'Aucune stratégie formalisée, navigation à vue', labelEn: 'No formalized strategy, short-term navigation' },
        ],
      },
    ],
  },
];

export const TOTAL_PERENNITE_QUESTIONS = PERENNITE_AXES.reduce((sum, a) => sum + a.questions.length, 0);

export function getPerenniteScoreColor(score: number): string {
  if (score >= 75) return '#059669';
  if (score >= 50) return '#d97706';
  if (score >= 25) return '#ea580c';
  return '#dc2626';
}

export function getPerenniteScoreLabel(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr ? 'Pérennité Assurée — Excellence Familiale' : 'Sustainability Assured — Family Excellence';
  if (score >= 50) return isFr ? 'Pérennité Fragile — Améliorations Requises' : 'Fragile Sustainability — Improvements Needed';
  if (score >= 25) return isFr ? 'Pérennité Menacée — Plan d\'Action Urgent' : 'Threatened Sustainability — Urgent Action Plan';
  return isFr ? 'Pérennité en Danger Critique — Intervention Immédiate' : 'Critical Sustainability Risk — Immediate Intervention';
}

export function getPerenniteRating(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 85) return isFr ? 'Groupe Familial d\'Excellence' : 'Excellence Family Group';
  if (score >= 75) return isFr ? 'Groupe Familial Robuste' : 'Robust Family Group';
  if (score >= 65) return isFr ? 'Groupe Familial en Consolidation' : 'Consolidating Family Group';
  if (score >= 50) return isFr ? 'Groupe Familial Vulnérable' : 'Vulnerable Family Group';
  if (score >= 35) return isFr ? 'Groupe Familial à Haut Risque' : 'High-Risk Family Group';
  return isFr ? 'Groupe Familial en Péril' : 'Endangered Family Group';
}

export function getPerenniteInterpretation(score: number, lang: string): string {
  const isFr = !lang.startsWith('en');
  if (score >= 75) return isFr
    ? 'Votre Groupe Familial présente une gouvernance mature, une transmission préparée et un patrimoine protégé. Continuez à renforcer vos pratiques et à anticiper les transitions générationnelles.'
    : 'Your Family Group has mature governance, prepared succession and protected wealth. Continue strengthening your practices and anticipating generational transitions.';
  if (score >= 50) return isFr
    ? 'Votre Groupe Familial présente des forces mais aussi des vulnérabilités qui pourraient compromettre la pérennité à la deuxième génération. Un plan d\'amélioration ciblé sur les axes les plus faibles est recommandé.'
    : 'Your Family Group has strengths but also vulnerabilities that could compromise second-generation sustainability. A targeted improvement plan on the weakest axes is recommended.';
  if (score >= 25) return isFr
    ? 'Votre Groupe Familial présente des lacunes significatives en matière de gouvernance et de préparation à la transmission. Sans action corrective, la pérennité à la deuxième génération est sérieusement compromise.'
    : 'Your Family Group has significant gaps in governance and succession preparation. Without corrective action, second-generation sustainability is seriously compromised.';
  return isFr
    ? 'Votre Groupe Familial est exposé à un risque critique de dislocation ou de disparition à la prochaine transition générationnelle. Les défaillances constatées sur plusieurs axes exigent une intervention immédiate et structurée.'
    : 'Your Family Group is exposed to a critical risk of dislocation or disappearance at the next generational transition. The failures identified across multiple axes require immediate and structured intervention.';
}

export function getPerenniteRisks(perAxis: Record<string, number>, globalScore: number, lang: string): string[] {
  const isFr = !lang.startsWith('en');
  const risks: string[] = [];

  const gfScore = perAxis['gouvernance-familiale'] ?? 0;
  const tsScore = perAxis['transmission-succession'] ?? 0;
  const ppScore = perAxis['preservation-patrimoine'] ?? 0;
  const gcScore = perAxis['gestion-conflits'] ?? 0;
  const proScore = perAxis['professionnalisation'] ?? 0;

  if (gfScore < 50) risks.push(isFr
    ? 'Gouvernance familiale absente ou immature : pas de Conseil de Famille ni de Constitution — risque de décisions arbitraires et de conflits non gérés'
    : 'Absent or immature family governance: no Family Council or Constitution — risk of arbitrary decisions and unmanaged conflicts');
  if (tsScore < 50) risks.push(isFr
    ? 'Transmission non préparée : absence de plan de succession, de formation des héritiers et de préparation au retrait du dirigeant — risque de vacance du leadership et de crise de succession'
    : 'Unprepared succession: absence of succession plan, heir training and leader withdrawal preparation — risk of leadership vacuum and succession crisis');
  if (ppScore < 50) risks.push(isFr
    ? 'Patrimoine non protégé : structure juridique inadaptée, absence de diversification et de mécanismes de liquidité — risque de dilution ou de perte du patrimoine familial'
    : 'Unprotected wealth: inadequate legal structure, absence of diversification and liquidity mechanisms — risk of dilution or loss of family wealth');
  if (gcScore < 50) risks.push(isFr
    ? 'Gestion des conflits non structurée : absence de mécanismes de résolution, communication défaillante — risque de conflits ouverts pouvant mener à l\'éclatement du Groupe'
    : 'Unstructured conflict management: absence of resolution mechanisms, failing communication — risk of open conflicts that could lead to Group breakup');
  if (proScore < 50) risks.push(isFr
    ? 'Professionnalisation insuffisante : management familial sans critères objectifs, absence d\'administrateurs indépendants, processus informels — risque de décisions sous-optimales et de perte de compétitivité'
    : 'Insufficient professionalization: family management without objective criteria, absence of independent directors, informal processes — risk of sub-optimal decisions and loss of competitiveness');
  if (globalScore < 30) risks.push(isFr
    ? 'Profil de pérennité critique : défaillances multiples et systémiques — le Groupe Familial est statistiquement dans la zone des 70 % d\'entreprises qui ne survivent pas à la deuxième génération'
    : 'Critical sustainability profile: multiple systemic failures — the Family Group is statistically in the 70% zone of companies that do not survive the second generation');

  return risks;
}

export function getPerenniteRecommendations(perAxis: Record<string, number>, globalScore: number, lang: string): { title: string; axis: string; items: string[] }[] {
  const isFr = !lang.startsWith('en');
  const recs: { title: string; axis: string; items: string[] }[] = [];

  const gfScore = perAxis['gouvernance-familiale'] ?? 0;
  const tsScore = perAxis['transmission-succession'] ?? 0;
  const ppScore = perAxis['preservation-patrimoine'] ?? 0;
  const gcScore = perAxis['gestion-conflits'] ?? 0;
  const proScore = perAxis['professionnalisation'] ?? 0;

  if (gfScore < 50) {
    recs.push({
      title: isFr ? 'Instaurer une Gouvernance Familiale Structurée' : 'Establish Structured Family Governance',
      axis: 'gouvernance-familiale',
      items: isFr ? [
        'Créer un Conseil de Famille avec des réunions trimestrielles, un ordre du jour formalisé et des PV documentés',
        'Rédiger et faire adopter une Constitution Familiale définissant les valeurs, les principes et les règles de gouvernance',
        'Clarifier les rôles entre la famille, le Conseil d\'Administration et la direction générale par écrit',
        'Formaliser un Pacte d\'Actionnaires avec clauses d\'entrée, de sortie, de préemption et d\'inaliénabilité',
        'Définir une politique d\'emploi familial avec des critères objectifs de recrutement, de rémunération et d\'évaluation',
      ] : [
        'Create a Family Council with quarterly meetings, formal agenda and documented minutes',
        'Draft and adopt a Family Constitution defining values, principles and governance rules',
        'Clarify roles between family, Board of Directors and management in writing',
        'Formalize a Shareholders\' Agreement with entry, exit, preemption and inalienability clauses',
        'Define a family employment policy with objective recruitment, compensation and evaluation criteria',
      ],
    });
  }

  if (tsScore < 50) {
    recs.push({
      title: isFr ? 'Préparer la Transmission et la Succession' : 'Prepare Transmission and Succession',
      axis: 'transmission-succession',
      items: isFr ? [
        'Documenter un Plan de Succession avec identification des successeurs, plan de développement et calendrier de transition sur 3-5 ans',
        'Mettre en place un programme structuré de formation de la génération suivante avec expérience externe exigée (3-5 ans) et mentorat',
        'Formaliser le retrait progressif du dirigeant actuel avec un calendrier documenté et un transfert progressif des responsabilités',
        'Optimiser les dispositifs juridiques et fiscaux de transmission : holding familiale, donation-partage, assurance-vie',
        'Définir un statut clair pour les héritiers non impliqués dans l\'entreprise (droits de vote différenciés, dividende prioritaire)',
      ] : [
        'Document a Succession Plan with successor identification, development plan and 3-5 year transition timeline',
        'Implement a structured next-generation training program with required external experience (3-5 years) and mentoring',
        'Formalize the gradual withdrawal of the current leader with documented timeline and progressive transfer of responsibilities',
        'Optimize legal and tax transmission arrangements: family holding, gift-sharing, life insurance',
        'Define clear status for heirs not involved in the company (differentiated voting rights, priority dividend)',
      ],
    });
  }

  if (ppScore < 50) {
    recs.push({
      title: isFr ? 'Protéger et Pérenniser le Patrimoine Familial' : 'Protect and Sustain Family Wealth',
      axis: 'preservation-patrimoine',
      items: isFr ? [
        'Structurer juridiquement le patrimoine : holding animatrice, séparation immobilier/exploitation, régimes matrimoniaux adaptés',
        'Définir une stratégie de diversification sectorielle et géographique pour réduire la concentration des risques',
        'Mettre en place une valorisation annuelle objective des participations (méthode DCF et comparables)',
        'Créer des mécanismes de liquidité pour les membres souhaitant sortir du capital (fonds de liquidité familial, cession progressive)',
        'Formaliser une politique d\'endettement avec ratios cibles et gestion du risque de taux',
      ] : [
        'Legally structure the wealth: holding company, real estate/operations separation, adapted matrimonial regimes',
        'Define a sector and geographical diversification strategy to reduce risk concentration',
        'Implement annual objective valuation of holdings (DCF and comparable methods)',
        'Create liquidity mechanisms for members wishing to exit capital (family liquidity fund, progressive transfer)',
        'Formalize a debt policy with target ratios and interest rate risk management',
      ],
    });
  }

  if (gcScore < 50) {
    recs.push({
      title: isFr ? 'Structurer la Gestion des Conflits Familiaux' : 'Structure Family Conflict Management',
      axis: 'gestion-conflits',
      items: isFr ? [
        'Mettre en place des mécanismes formels de résolution : médiateur familial, procédure en 3 étapes (dialogue / médiation / arbitrage)',
        'Structurer la communication familiale : newsletter trimestrielle, réunions d\'information semestrielles, rapports financiers simplifiés',
        'Définir le statut des conjoints et des membres par alliance dans la gouvernance familiale avec droits et limites documentés',
        'Formaliser le principe d\'équité entre branches familiales, avec distinction claire entre équité et égalité',
        'Capitaliser sur les conflits passés : documenter les enseignements et adopter des mesures préventives',
      ] : [
        'Implement formal resolution mechanisms: family mediator, 3-step procedure (dialogue / mediation / arbitration)',
        'Structure family communication: quarterly newsletter, semi-annual information meetings, simplified financial reports',
        'Define spouse and in-law status in family governance with documented rights and limits',
        'Formalize the principle of equity between family branches, with clear distinction between equity and equality',
        'Capitalize on past conflicts: document lessons learned and adopt preventive measures',
      ],
    });
  }

  if (proScore < 50) {
    recs.push({
      title: isFr ? 'Professionnaliser la Gestion de l\'Entreprise Familiale' : 'Professionalize Family Business Management',
      axis: 'professionnalisation',
      items: isFr ? [
        'Constituer un comité de direction avec des managers externes expérimentés, recrutés sur critères de compétences objectifs',
        'Intégrer des administrateurs indépendants au Conseil d\'Administration et constituer des comités spécialisés (Audit, Stratégie)',
        'Formaliser et digitaliser les processus clés : stratégie, budget, recrutement, investissement avec délégations de pouvoirs',
        'Déployer des systèmes d\'information de gestion (ERP, BI) pour un reporting fiable et régulier au CA et au Conseil de Famille',
        'Élaborer un plan stratégique documenté à 5 ans avec objectifs SMART, plans d\'action et revue trimestrielle',
      ] : [
        'Form an executive committee with experienced external managers, recruited on objective skill criteria',
        'Integrate independent directors into the Board and form specialized committees (Audit, Strategy)',
        'Formalize and digitize key processes: strategy, budget, recruitment, investment with delegation of authority',
        'Deploy management information systems (ERP, BI) for reliable reporting to Board and Family Council',
        'Develop a documented 5-year strategic plan with SMART objectives, action plans and quarterly review',
      ],
    });
  }

  if (recs.length === 0) {
    recs.push({
      title: isFr ? 'Maintenir l\'Excellence de la Gouvernance Familiale' : 'Maintain Family Governance Excellence',
      axis: 'gouvernance-familiale',
      items: isFr ? [
        'Poursuivre la mise à jour périodique de la Constitution Familiale (tous les 3 ans)',
        'Renforcer le programme de mentorat intergénérationnel et la formation continue des administrateurs familiaux',
        'Anticiper la transition vers la troisième génération en documentant les principes de gouvernance',
        'Évaluer régulièrement la performance du Conseil de Famille et du Conseil d\'Administration',
        'Participer à des réseaux de Groupes Familiaux pour benchmarker les meilleures pratiques (FBN, IEF)',
      ] : [
        'Continue periodic updating of the Family Constitution (every 3 years)',
        'Strengthen intergenerational mentoring and continuous training of family directors',
        'Anticipate third-generation transition by documenting governance principles',
        'Regularly evaluate Family Council and Board of Directors performance',
        'Participate in Family Business networks to benchmark best practices (FBN, IEF)',
      ],
    });
  }

  return recs;
}