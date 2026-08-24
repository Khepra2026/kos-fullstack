// ============================================================
// KOS LEGISLATIVE ANALYST — Centre d'Analyse d'Impact Réglementaire
// Position Papers & Amendements pour Décideurs Publics
// Standard Big Four — McKinsey / Harvard Regulatory Style
// ============================================================

export const RIA_METHODOLOGY = {
  title: 'Grille d\'Évaluation d\'Impact Réglementaire (RIA) — Khepra Experts™',
  version: '1.0',
  standardApplicable: 'ISO 31000:2018 (Risk Management) × ISO 56002:2019 (Innovation Management)',
  principes: [
    'Tout texte analysé passe par les 3 étapes de la grille RIA. Aucune exception.',
    'Chaque proposition d\'amendement est au format "Texte Actuel vs. Texte Proposé" avec justification économique.',
    'Les position papers sont prêts à présenter aux décideurs publics (ministères, commissions, agences).',
  ],

  etapes: [
    {
      etape: 1,
      titre: 'Conformité aux Meilleures Pratiques Mondiales',
      icone: 'ri-global-line',
      description: 'Benchmark du texte contre les standards internationaux de référence.',
      sousEtapes: [
        { standard: 'GAFI (LBC/FT/FP)', applicable: 'FinTech, Banque, PSP, VASP, SFD', questions: ['Le texte aligne-t-il les obligations KYC/CDD sur R.10 du GAFI ?', 'La Travel Rule (R.16) est-elle correctement transposée ?', 'Les sanctions correspondent-elles aux listes ONU/nationales ?'] },
        { standard: 'Bâle III/IV', applicable: 'Banque, SFD, Établissements de Crédit', questions: ['Les ratios de solvabilité reflètent-ils le cadre Bâle III ?', 'Le Pilier 2 (supervisory review) est-il intégré ?', 'Les stress tests sont-ils calibrés aux risques africains ?'] },
        { standard: 'IFRS / ISA', applicable: 'Tous secteurs régulés', questions: ['La comptabilisation IFRS 9 est-elle alignée ?', 'Les normes d\'audit ISA sont-elles référencées ?', 'Le reporting financier est-il conforme ISSB ?'] },
        { standard: 'GRI / ISSB / TCFD', applicable: 'ESG, Finance Durable, Assurances', questions: ['Les obligations de reporting ESG sont-elles alignées ISSB ?', 'La taxonomie verte est-elle compatible UE/Afrique ?', 'Les stress tests climatiques sont-ils prévus ?'] },
        { standard: 'ISO 27001 / NIST', applicable: 'Cybersécurité, Data Privacy, Cloud', questions: ['Le SMSI est-il exigé pour les entités critiques ?', 'Les notifications de violation suivent-elles le standard 72h ?', 'Le chiffrement des données est-il spécifié ?'] },
      ],
    },
    {
      etape: 2,
      titre: 'Diagnostic des Frictions Opérationnelles & Barrières à l\'Innovation',
      icone: 'ri-alert-line',
      description: 'Analyse des coûts de conformité, barrières à l\'entrée et impacts sur l\'inclusion financière spécifiques aux économies d\'Afrique francophone.',
      dimensions: [
        { axe: 'Coûts de Conformité pour les PME', questions: ['Quel est le coût estimé de mise en conformité pour une PME de 50 employés ?', 'Le texte prévoit-il un régime proportionné (Tier 1/2/3) ?', 'Les délais de mise en conformité sont-ils réalistes en contexte africain ?'], metriques: ['Coût annuel récurrent estimé (FCFA)', 'Ratio coût / CA pour une PME type', 'Délai de grâce vs capacité d\'absorption'] },
        { axe: 'Inclusion Financière', questions: ['Le texte facilite-t-il ou freine-t-il l\'inclusion financière ?', 'Les exigences KYC sont-elles compatibles avec l\'identification biométrique mobile ?', 'Le mobile money et les agents sont-ils correctement régulés ?'], metriques: ['Taux de bancarisation projeté après application', 'Impact sur le coût des services financiers pour les populations rurales', 'Nombre d\'agents de mobile money impactés'] },
        { axe: 'Gouvernance Publique & Capacité Institutionnelle', questions: ['Le régulateur a-t-il la capacité technique de superviser ces nouvelles exigences ?', 'Le texte crée-t-il des doublons avec des textes existants ?', 'Les mécanismes de coordination inter-régulateurs sont-ils prévus ?'], metriques: ['Nombre d\'inspecteurs qualifiés nécessaires', 'Chevauchements réglementaires identifiés', 'Besoins en renforcement de capacités institutionnelles'] },
        { axe: 'Attractivité des Investissements (FDI)', questions: ['Le texte renforce-t-il ou affaiblit-il l\'attractivité de la zone pour les IDE ?', 'Les protections des investisseurs sont-elles suffisantes ?', 'La prévisibilité réglementaire est-elle assurée sur un horizon 5 ans ?'], metriques: ['Score Doing Business projeté', 'Impact sur les flux d\'IDE sectoriels', 'Comparaison régionale (UEMOA vs CEMAC vs East Africa)'] },
      ],
    },
    {
      etape: 3,
      titre: 'Propositions d\'Amendements — Format "Texte Actuel vs. Texte Proposé"',
      icone: 'ri-edit-line',
      description: 'Rédaction d\'amendements légaux précis avec justification économique et sociale. Chaque amendement est tracé, justifié, et prêt à soumettre.',
      format: {
        entete: ['Référence du texte source', 'Article concerné', 'Type d\'amendement (Modification / Ajout / Suppression)'],
        corps: ['Texte Actuel (citation exacte)', 'Texte Proposé (nouvelle rédaction)', 'Justification Économique & Sociale (5-10 lignes)', 'Impact Projeté (chiffré si possible)'],
        pied: ['Alignement standard international', 'Bénéficiaires directs & indirects', 'Risques si l\'amendement n\'est pas adopté'],
      },
    },
  ],
};

export const POSITION_PAPER_TEMPLATE = {
  title: 'Architecture du Position Paper — Format Décideurs Publics',
  description: 'Structure standardisée pour chaque note stratégique destinée aux ministères, agences de régulation et commissions régionales.',
  sections: [
    { numero: 0, titre: 'Note de Couverture', contenu: 'Destinataire, date, classification, objet, recommandation clé en une phrase, impact chiffré' },
    { numero: 1, titre: 'Résumé Exécutif (1 page max)', contenu: 'Problématique, constat principal, option recommandée, bénéfice net estimé, calendrier proposé' },
    { numero: 2, titre: 'Analyse du Texte / Projet', contenu: 'Contexte, historique, benchmark international, forces et faiblesses du texte actuel' },
    { numero: 3, titre: 'Grille RIA Complète', contenu: 'Les 3 étapes de la grille RIA Khepra avec scores et commentaires' },
    { numero: 4, titre: 'Amendements Proposés', contenu: 'Format Texte Actuel vs. Texte Proposé pour chaque amendement, avec justification' },
    { numero: 5, titre: 'Analyse d\'Impact Économique', contenu: 'Coûts/bénéfices, impact sur les PME, inclusion financière, genre, environnement' },
    { numero: 6, titre: 'Scénarios Prospectifs', contenu: '3 scénarios (adoption / adoption partielle / rejet) avec projections chiffrées à 3 et 5 ans' },
    { numero: 7, titre: 'Plan d\'Action Recommandé', contenu: 'Qui fait quoi, quand, avec quels moyens. Jalons trimestriels. Indicateurs de succès.' },
    { numero: 8, titre: 'Annexes Techniques', contenu: 'Données sources, méthodologie détaillée, textes de référence, glossaire' },
  ],
  ton: {
    direct: 'Pas de circonvolutions diplomatiques. La recommandation est explicite et assumée.',
    pragmatique: 'Ancré dans le réalisable. Les propositions tiennent compte des contraintes budgétaires et institutionnelles.',
    competitivite: 'Chaque position paper répond à la question : comment ce texte renforce-t-il la compétitivité de la zone ?',
    fdi: 'L\'attractivité des investissements directs étrangers est un filtre systématique.',
    developpementDurable: 'Alignement ODD 8 (travail décent et croissance), ODD 9 (industrie, innovation, infrastructure), ODD 16 (paix, justice, institutions).',
  },
};

export const textesEnAnalyse = [
  {
    id: 'TXT-001',
    reference: 'Directive UEMOA N°008-2026/CD',
    titre: 'Open Banking — Partage des Données Client',
    datePublication: '2026-05-20',
    dateEntreeVigueur: '2028-01-01',
    regulateur: 'UEMOA',
    zone: 'UEMOA',
    statut: 'En analyse',
    scoreRIA: 68,
    etapeActuelle: 2,
    description: 'Directive-cadre imposant aux banques d\'exposer des API standardisées pour le partage des données clients avec les Fintechs agréées, sous consentement explicite du client.',
    articlesCles: ['Art. 12 — API obligatoires', 'Art. 18 — Consentement client', 'Art. 25 — Agrément FinTech Open Banking'],
    amendements: [
      {
        ref: 'AM-001-A', article: 'Art. 12', type: 'Modification',
        texteActuel: 'Les établissements bancaires mettent à disposition des API conformes à la norme ISO 20022 dans un délai de 12 mois à compter de l\'entrée en vigueur de la présente directive.',
        textePropose: 'Les établissements bancaires mettent à disposition des API conformes à la norme ISO 20022. Un calendrier progressif est établi : (i) Banques Tier 1 (>500 Mds FCFA d\'actifs) : 12 mois ; (ii) Banques Tier 2 (100-500 Mds FCFA) : 24 mois ; (iii) Banques Tier 3 (<100 Mds FCFA) : 36 mois. Une période de bac à sable réglementaire de 6 mois précède chaque échéance.',
        justification: 'Les banques de taille moyenne en Afrique de l\'Ouest n\'ont ni l\'infrastructure technique ni les ressources humaines pour une mise en conformité en 12 mois. Un régime proportionné évite une consolidation forcée du secteur au profit des seules grandes banques internationales. Le bac à sable permet de tester les API en conditions réelles avant la mise en production obligatoire.',
        impactProjete: 'Coût moyen de mise en conformité réduit de 40% pour les banques Tier 3. Évite la fermeture potentielle de 5-8 banques moyennes.',
      },
      {
        ref: 'AM-001-B', article: 'Art. 25', type: 'Ajout',
        texteActuel: '(Non existant)',
        textePropose: 'Art. 25bis — Fonds de Garantie Open Banking : Il est créé un fonds de garantie mutualisé alimenté par une contribution annuelle de 0.05% des transactions API, destiné à indemniser les clients en cas de fraude liée au partage de données. Le fonds est géré par la BCEAO.',
        justification: 'La confiance des clients est le principal frein à l\'Open Banking en Afrique (étude BCEAO 2025 : 72% des clients refuseraient le partage de leurs données bancaires). Un fonds de garantie visible lève cette barrière psychologique et protège les populations vulnérables.',
        impactProjete: 'Taux d\'acceptation client projeté : de 28% à 55%. Protection de 15M+ de clients bancaires UEMOA.',
      },
    ],
  },
  {
    id: 'TXT-002',
    reference: 'Règlement COBAC R-2026/03',
    titre: 'Exigences de Fonds Propres — Alignement Bâle III',
    datePublication: '2026-06-10',
    dateEntreeVigueur: '2027-06-10',
    regulateur: 'COBAC',
    zone: 'CEMAC',
    statut: 'Analyse RIA terminée',
    scoreRIA: 74,
    etapeActuelle: 3,
    description: 'Règlement portant révision des exigences de fonds propres pour les établissements de crédit, introduisant un ratio CET1 minimum de 9%, un coussin de conservation de 2.5% et un coussin contra-cyclique de 0-2.5%.',
    articlesCles: ['Art. 4 — CET1 minimum 9%', 'Art. 7 — Coussin de conservation 2.5%', 'Art. 11 — Coussin contra-cyclique'],
    amendements: [
      {
        ref: 'AM-002-A', article: 'Art. 4', type: 'Modification',
        texteActuel: 'Le ratio Common Equity Tier 1 (CET1) minimum est fixé à 9% des actifs pondérés des risques.',
        textePropose: 'Le ratio Common Equity Tier 1 (CET1) minimum est fixé à 9% des actifs pondérés des risques pour les banques systémiques (Tier 1). Pour les banques non systémiques (Tier 2 et 3), le ratio CET1 minimum est de 7.5%, avec une convergence progressive vers 9% sur 5 ans (+0.3 point/an).',
        justification: 'Les banques de taille moyenne en zone CEMAC opèrent sur des marchés peu profonds avec un accès limité aux marchés de capitaux. Un CET1 à 9% pour toutes les banques — au-dessus du minimum Bâle III de 4.5% — pénaliserait la concurrence et la couverture bancaire dans les zones rurales (taux de bancarisation CEMAC : 19.2%). La convergence progressive permet le renforcement sans crise de liquidité.',
        impactProjete: 'Évite un credit crunch de 1200-1800 Mds FCFA. Protège 8 banques non systémiques d\'une restructuration forcée.',
      },
      {
        ref: 'AM-002-B', article: 'Art. 11', type: 'Ajout',
        texteActuel: 'Le coussin contra-cyclique est fixé par la BEAC dans une fourchette de 0 à 2.5% des actifs pondérés des risques.',
        textePropose: 'Le coussin contra-cyclique est fixé par la BEAC dans une fourchette de 0 à 2.5% des actifs pondérés des risques. Pour les économies dont le PIB dépend à plus de 25% des matières premières, un coussin contra-cyclique sectoriel additionnel de 1% maximum peut être activé sur les expositions aux secteurs extractifs.',
        justification: 'Les économies de la CEMAC sont structurellement exposées aux chocs des prix des matières premières (pétrole : 40% du PIB Congo et Gabon). Le coussin contra-cyclique classique (basé sur le cycle de crédit global) ne capture pas adéquatement le risque de concentration sectorielle. Un coussin sectoriel additionnel, activable en période de prix élevés, constitue un amortisseur contra-cyclique plus précis pour les économies mono-exportatrices.',
        impactProjete: 'Réduction de 30% du risque systémique en cas de choc pétrolier. Évite les crises bancaires de type 2014-2016 (coût : 2500 Mds FCFA de recapitalisation).',
      },
    ],
  },
  {
    id: 'TXT-003',
    reference: 'Instruction BCEAO N°010-2026/SP',
    titre: 'Provisionnement IFRS 9 — Créances en Souffrance',
    datePublication: '2026-04-25',
    dateEntreeVigueur: '2027-01-01',
    regulateur: 'BCEAO',
    zone: 'UEMOA',
    statut: 'Position Paper en cours',
    scoreRIA: 81,
    etapeActuelle: 2,
    description: 'Instruction harmonisant le provisionnement des créances selon IFRS 9 pour les banques et SFD de l\'UEMOA, avec un calendrier progressif et des seuils de matérialité adaptés.',
    articlesCles: ['Art. 6 — Méthodologie ECL (Expected Credit Loss)', 'Art. 14 — Seuils de matérialité', 'Art. 22 — Calendrier progressif'],
    amendements: [
      {
        ref: 'AM-003-A', article: 'Art. 6', type: 'Modification',
        texteActuel: 'Les établissements appliquent la méthodologie ECL (Expected Credit Loss) à l\'ensemble de leur portefeuille de crédit selon les trois stages définis par IFRS 9.',
        textePropose: 'Les établissements appliquent la méthodologie ECL selon les trois stages IFRS 9. Les SFD de moins de 5 Mds FCFA d\'encours de crédit peuvent opter pour une matrice de provisionnement simplifiée validée par la BCEAO, basée sur des taux de migration historiques par zone géographique (urbain, péri-urbain, rural) et par typologie de crédit (groupe, individuel, agricole, commercial).',
        justification: 'Les SFD de petite taille n\'ont pas la capacité technique ni les données historiques nécessaires pour construire des modèles ECL probabilistes robustes. Une matrice simplifiée — co-construite avec la BCEAO et basée sur les données agrégées du secteur — permet de maintenir la couverture prudentielle sans imposer un coût disproportionné. Ce mécanisme a été déployé avec succès aux Philippines et au Pérou.',
        impactProjete: 'Coût de conformité réduit de 65% pour les SFD <5 Mds. Protège 320+ SFD de proximité en zone UEMOA.',
      },
    ],
  },
  {
    id: 'TXT-004',
    reference: 'Projet de Loi Uniforme OHADA',
    titre: 'Société par Actions Simplifiée (SAS) — Introduction en Droit OHADA',
    datePublication: '2026-05-15',
    dateEntreeVigueur: 'Consultation',
    regulateur: 'OHADA',
    zone: 'OHADA',
    statut: 'En consultation',
    scoreRIA: 89,
    etapeActuelle: 1,
    description: 'Projet de loi uniforme introduisant la Société par Actions Simplifiée dans les 17 États membres de l\'OHADA. La SAS permet une liberté statutaire étendue, une responsabilité limitée et des mécanismes de gouvernance flexibles.',
    articlesCles: ['Art. 853-1 — Définition SAS', 'Art. 853-12 — Gouvernance libre', 'Art. 853-20 — Cession d\'actions'],
    amendements: [
      {
        ref: 'AM-004-A', article: 'Art. 853-12', type: 'Modification',
        texteActuel: 'Les statuts de la SAS déterminent librement les organes de direction et les modalités de prise de décision collective.',
        textePropose: 'Les statuts de la SAS déterminent librement les organes de direction. Pour les SAS unipersonnelles (associé unique), un registre de décisions numériques certifié par horodatage blockchain est admis comme équivalent du registre papier, sous réserve de validation par le Registre du Commerce et du Crédit Mobilier (RCCM) du pays d\'immatriculation.',
        justification: 'L\'introduction de la SAS unipersonnelle digitalisée est un levier majeur pour la formalisation des entrepreneurs individuels africains. La certification blockchain des décisions résout le problème de l\'archivage physique (coûteux, peu fiable en climat tropical) et facilite l\'accès au crédit bancaire (décisions d\'emprunt horodatées et inaltérables). L\'Estonie et le Rwanda ont déployé des solutions similaires avec succès.',
        impactProjete: 'Formalisation projetée de 50 000+ entrepreneurs en 5 ans. Réduction de 70% du coût de conformité administrative pour les TPE.',
      },
    ],
  },
  {
    id: 'TXT-005',
    reference: 'Circulaire COBAC R-2026/02',
    titre: 'Cybersécurité & Résilience Opérationnelle — DORA Afrique',
    datePublication: '2026-06-01',
    dateEntreeVigueur: '2027-06-01',
    regulateur: 'COBAC',
    zone: 'CEMAC',
    statut: 'Analyse RIA terminée',
    scoreRIA: 72,
    etapeActuelle: 3,
    description: 'Circulaire imposant un cadre de résilience opérationnelle numérique aux établissements bancaires CEMAC : tests d\'intrusion obligatoires, plan de continuité TIC, notification des incidents majeurs sous 24h, audits externes annuels.',
    articlesCles: ['Art. 8 — Tests d\'intrusion obligatoires', 'Art. 15 — Notification incidents 24h', 'Art. 22 — Audit externe annuel'],
    amendements: [
      {
        ref: 'AM-005-A', article: 'Art. 22', type: 'Modification',
        texteActuel: 'Les établissements bancaires font réaliser un audit externe annuel de cybersécurité par un prestataire qualifié.',
        textePropose: 'Un audit externe annuel est obligatoire pour les banques Tier 1. Les banques Tier 2 et 3 peuvent mutualiser leurs audits via un pool de cybersécurité sectoriel, supervisé par la COBAC et opéré par un prestataire unique agréé, avec un rapport individuel par établissement.',
        justification: 'Les banques Tier 3 en zone CEMAC (actifs <50 Mds FCFA) font face à un coût d\'audit cybersécurité annuel de 25-40M FCFA, soit 2-5% de leur résultat net. La mutualisation réduit ce coût à 8-12M FCFA tout en maintenant un niveau d\'audit équivalent. Ce modèle de pool sectoriel est pratiqué au Kenya (CBK Cybersecurity Pool) et en Afrique du Sud.',
        impactProjete: 'Économie de 200-350M FCFA/an pour les banques Tier 3. Maintien du niveau de sécurité. Évite le risque d\'audits de complaisance faute de budget.',
      },
    ],
  },
];

export const positionPapers = [
  {
    id: 'PP-001',
    titre: 'Position Paper — Open Banking UEMOA : Recommandations pour une Directive Proportionnée',
    texteLie: 'TXT-001',
    datePublication: '2026-06-26',
    destinataire: 'Commission de l\'UEMOA — Département des Services Financiers',
    classification: 'PUBLIC',
    resume: 'La Directive UEMOA sur l\'Open Banking est une avancée majeure pour l\'innovation financière. Cependant, sans régime proportionné pour les banques de taille moyenne et sans mécanisme de confiance client, elle risque de consolider le secteur au profit des grands groupes internationaux. KHEPRA EXPERTS recommande 3 amendements clés : calendrier progressif, fonds de garantie, et bac à sable réglementaire.',
    scoreImpact: 87,
    statut: 'Finalisé',
  },
  {
    id: 'PP-002',
    titre: 'Position Paper — Fonds Propres CEMAC : Plaidoyer pour une Convergence Progressive',
    texteLie: 'TXT-002',
    datePublication: '2026-06-26',
    destinataire: 'COBAC — Secrétariat Général',
    classification: 'CONFIDENTIEL',
    resume: 'Le relèvement du CET1 à 9% pour toutes les banques est supérieur aux exigences Bâle III et risque de provoquer un credit crunch en zone rurale. KHEPRA EXPERTS démontre qu\'une convergence progressive sur 5 ans avec un coussin sectoriel pour les économies pétrolières permet d\'atteindre les objectifs prudentiels sans sacrifier l\'inclusion financière.',
    scoreImpact: 91,
    statut: 'Finalisé',
  },
  {
    id: 'PP-003',
    titre: 'Position Paper — SAS OHADA : Levier de Formalisation pour l\'Entrepreneuriat Africain',
    texteLie: 'TXT-004',
    datePublication: '2026-06-27',
    destinataire: 'Conseil des Ministres OHADA — Commission Législative',
    classification: 'PUBLIC',
    resume: 'L\'introduction de la SAS en droit OHADA représente la réforme la plus structurante pour l\'entrepreneuriat depuis l\'AUDCG. KHEPRA EXPERTS recommande d\'aller plus loin avec la SAS unipersonnelle digitalisée, l\'horodatage blockchain des décisions, et l\'interopérabilité RCCM panafricaine. Ces trois mesures pourraient formaliser 50 000+ entrepreneurs en 5 ans.',
    scoreImpact: 94,
    statut: 'Finalisé',
  },
];

export const scenariosLegislatifs = [
  {
    id: 'SC-001', texteLie: 'TXT-001', titre: 'Scénarios Open Banking UEMOA 2026-2031',
    scenarios: [
      { nom: 'Adoption Complète (Prob. 40%)', description: 'La directive est adoptée avec les amendements KHEPRA. Calendrier progressif + fonds de garantie + bac à sable.', impact: 'Croissance FinTech : +280% en 5 ans. 12M de nouveaux clients bancaires digitaux. 3-5 licornes FinTech émergentes. Score inclusion financière UEMOA : 39% → 55%.' },
      { nom: 'Adoption Partielle (Prob. 45%)', description: 'La directive est adoptée sans les amendements. Les banques Tier 3 peinent à se conformer.', impact: 'Consolidation bancaire : 5-8 banques moyennes disparaissent. Croissance FinTech limitée aux hubs (Abidjan, Dakar). Score inclusion : 39% → 45%. Risque de capture du marché par 3-4 acteurs internationaux.' },
      { nom: 'Rejet ou Report (Prob. 15%)', description: 'La directive est rejetée ou repoussée sine die face à l\'opposition des banques.', impact: 'Statu quo réglementaire. Fuite des talents FinTech vers le Kenya, Nigéria, Afrique du Sud. Retard de 5-7 ans sur l\'Open Banking vs Afrique de l\'Est. Score inclusion : stagnation à 39-41%.' },
    ],
  },
  {
    id: 'SC-002', texteLie: 'TXT-002', titre: 'Scénarios Fonds Propres CEMAC 2026-2031',
    scenarios: [
      { nom: 'Adoption Amendée (Prob. 50%)', description: 'Convergence progressive + coussin sectoriel pétrole adoptés.', impact: 'Stabilité financière renforcée. Aucune banque en difficulté. Ratio CET1 moyen : 8.5% → 11.2% en 5 ans. Maintien de l\'emploi bancaire en zone rurale.' },
      { nom: 'Adoption Telle Quelle (Prob. 35%)', description: 'CET1 9% pour toutes les banques, sans régime proportionné.', impact: 'Credit crunch estimé : 1200-1800 Mds FCFA. 2-4 banques Tier 3 en restructuration. Baisse de 15% des crédits aux PME rurales. Concentration bancaire accrue.' },
      { nom: 'Convergence Accélérée (Prob. 15%)', description: 'Alignement total Bâle III en 3 ans au lieu de 5, sous pression du FMI.', impact: 'Credit crunch sévère : 2500+ Mds FCFA. 6-8 banques en difficulté. Intervention publique nécessaire. Recul de 5-8 points du taux de bancarisation.' },
    ],
  },
];

export const clausesISO = [
  { clause: 'ISO 31000:2018 §6.4.3 — Évaluation des Risques', score: 92, applicable: 'Étape 1 RIA — Identification des risques réglementaires', statut: 'Conforme' },
  { clause: 'ISO 56002:2019 §8.3 — Processus d\'Innovation', score: 85, applicable: 'Barrières à l\'innovation — Diagnostic des frictions', statut: 'Conforme' },
  { clause: 'ISO 37000:2021 §6.2 — Prise de Décision', score: 90, applicable: 'Position Papers — Recommandations aux décideurs', statut: 'Conforme' },
  { clause: 'ISO 37001:2016 §4.4 — Anti-Corruption', score: 95, applicable: 'Transparence des amendements proposés', statut: 'Conforme' },
  { clause: 'GAFI R.15 — Nouvelles Technologies', score: 88, applicable: 'Évaluation FinTech, crypto-actifs, VASP', statut: 'Conforme' },
  { clause: 'Bâle III — Pilier 2 (Supervisory Review)', score: 83, applicable: 'Fonds propres, coussins contra-cycliques, stress tests', statut: 'Conforme' },
];

export const KPIsLegislatifs = {
  textesAnalyses: 47,
  amendementsProposes: 128,
  positionPapers: 12,
  tauxAdoption: '68%',
  paysImpactes: 17,
  delaiMoyenAnalyse: '72h',
  scoreSatisfaction: '94/100',
  citationsDansTextes: 23,
};



