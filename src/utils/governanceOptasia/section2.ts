import { Paragraph } from 'docx';
import { h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, numberedItem } from './helpers';

export const section2Paragraphs: Paragraph[] = [
  h1('SECTION 2 — MATRICE DE DÉLÉGATION DE POUVOIRS ET GOUVERNANCE MATRICIELLE (GROUP VS LOCALS)'),
  divider(),
  spacer(),

  h2('2.1 Conflit structurel : Contrôle centralisé vs Autonomie juridique locale'),
  body('Le modèle d\'OPTASIA repose sur une tension fondamentale : le contrôle stratégique exercé par la maison-mère technologique à Dubaï entre en contradiction avec l\'autonomie juridique et la responsabilité pénale des dirigeants locaux imposée par l\'AUSCGIE OHADA et les régulateurs bancaires (BCEAO, COBAC). Cette tension, si elle n\'est pas résolue par une matrice de délégation explicite, constitue un motif d\'avis défavorable.'),
  spacer(),
  alertBox('La gouvernance matricielle doit être formalisée par écrit dans les statuts de chaque filiale, dans un Règlement Intérieur du Conseil d\'Administration, et dans une Charte de Gouvernance de Groupe approuvée par le CA de la Holding et de chaque filiale. L\'absence de cette formalisation est un motif de rejet.', 'critical'),
  spacer(),

  h2('2.2 Prérogatives exclusives des Conseils d\'Administration locaux'),
  body('Conformément à l\'AUSCGIE OHADA, aux Instructions BCEAO 004-01-2014 et Circulaires 01-03/2017, et aux Règlements COBAC R-2017/05 et R-2023/01, les Conseils d\'Administration des filiales locales disposent de prérogatives exclusives qui ne peuvent être déléguées ni au Groupe ni à la Holding.'),
  spacer(),

  h3('2.2.1 Tableau de délimitation des compétences — Group vs Local'),
  buildTable(
    ['Domaine', 'Prérogative CA Local (EXCLUSIF)', 'Prérogative Holding / Groupe (ORIENTATRICE)', 'Référence normative'],
    [
      ['Stratégie locale', 'Définition de la stratégie commerciale locale, choix des segments de clientèle, fixation des plafonds de crédit par segment, politique de tarification locale', 'Validation des orientations stratégiques globales, alignement avec la politique de risque groupe, rapports de performance trimestriels', 'AUSCGIE OHADA Art. 6 ; BCEAO Inst. 004-01-2014 Art. 9 ; COBAC R-2023/01 Art. 8'],
      ['Conformité réglementaire', 'Mise en œuvre de la conformité locale, déclarations aux régulateurs locaux, réponse aux réquisitions, maintenance des agréments', 'Élaboration des standards de conformité groupe, veille réglementaire transfrontalière, formation des équipes conformité', 'BCEAO Circulaire 01/2017 ; COBAC R-2019/01 Art. 3'],
      ['Gestion des risques de crédit', 'Définition des politiques de crédit locales, scoring des clients, décision d\'octroi/refus de crédit, suivi des impayés, provisioning', 'Cadre global de gestion des risques, modèles de scoring centralisés, politique de provisioning groupe, rapports de concentration', 'COBAC R-2017/05 Art. 12 ; BCEAO Inst. 004-01-2014 Art. 11'],
      ['Nominations fonctions clés', 'Nomination du DG, du DGA, du DAF, du RCI, du RCC, du DRC (sous réserve de l\'agrément du régulateur)', 'Proposition de candidats, validation des profils, veille sur les critères de Fit and Proper, formation continue des dirigeants', 'BCEAO Circulaire 02/2017 ; COBAC R-2023/01 Art. 10'],
      ['Politique LBC/FT', 'Mise en œuvre du dispositif LBC/FT local, déclarations CENTIF/TRACFIN, suivi des clients à haut risque, formation du personnel', 'Standards LBC/FT groupe, mise à disposition des outils de surveillance, rapports de suspicion transfrontaliers', 'BCEAO Instruction 008-05-2015 ; COBAC R-2019/01 Art. 5'],
      ['Technologie et SI', 'Choix des fournisseurs locaux, hébergement des données sur le territoire national, maintenance du CBS local, gestion des incidents', 'Architecture globale, développement du moteur d\'IA central, standards de sécurité, audits de cybersécurité', 'COBAC R-2021/01 Art. 7 ; BCEAO Instructions 2024 n°026-029'],
      ['Rémunérations dirigeants', 'Fixation des rémunérations des dirigeants locaux (dans la limite des plafonds réglementaires), attribution des bonus, clause de malus/clawback', 'Politique de rémunération groupe, plafonds de référence, alignement avec les KPIs prudentiels, validation des packages de rémunération', 'BCEAO Instruction 008-05-2015 ; COBAC Règlement 04/18 ; AUSCGIE OHADA Art. 14'],
    ],
    { colWidths: [14, 28, 28, 30], boldFirstCol: true }
  ),
  spacer(),

  h3('2.2.2 Principe de non-ingérence dans les prérogatives exclusives'),
  body('Le Groupe (Dubaï) et la Holding (Cameroun) ne peuvent en aucun cas imposer une décision relevant d\'une prérogative exclusive du CA local. Toute ingérence constitue une violation de l\'AUSCGIE OHADA et un motif de rejet d\'agrément.'),
  bullet('Le Groupe peut émettre des recommandations, des lignes directrices, des standards techniques. Ces documents sont qualifiés de « politiques d\'orientation » et non de « directives contraignantes ».'),
  bullet('Le CA local dispose d\'un droit de dérogation motivée : il peut s\'écarter d\'une orientation du Groupe en cas d\'incompatibilité avec la réglementation locale, sous réserve de l\'information préalable de la Holding et de la justification écrite.'),
  bullet('Les dérogations doivent être inscrites au registre des délibérations du CA local et transmises à la Holding pour information.'),
  spacer(),

  h2('2.3 Mécanisme de « Veto Prudentiel » du Directeur Général local'),
  alertBox('Le DG local dispose d\'un droit de veto absolu sur toute directive du Groupe ou de la Holding qui contrevient aux ratios prudentiels locaux, aux règles de change, ou aux dispositions réglementaires de la zone. Ce veto est un droit légal, non une option.', 'critical'),
  spacer(),

  h3('2.3.1 Fondement juridique du Veto Prudentiel'),
  body('Le Veto Prudentiel repose sur les fondements juridiques suivants :'),
  numberedItem(1, 'Responsabilité pénale personnelle du DG : Conformément à l\'AUSCGIE OHADA, le DG est civilement et pénalement responsable des actes de la société. Il ne peut être contraint à commettre une infraction pénale (violation des ratios prudentiels, fraude fiscale, blanchiment).'),
  numberedItem(2, 'Obligation de déclaration aux régulateurs : Le DG est tenu de déclarer tout fait susceptible de mettre en cause la solvabilité, la liquidité ou la conformité de l\'établissement. Un ordre de la Holding contraire à cette obligation constitue une complicité d\'infraction.'),
  numberedItem(3, 'Protection du lanceur d\'alerte : Conformément à la Circulaire BCEAO 01/2017 et au Règlement COBAC R-2023/01, le DG bénéficie d\'une protection renforcée s\'il dénonce une ingérence illégale du Groupe.'),
  numberedItem(4, 'Clause de sauvegarde dans le contrat de travail : Le contrat de travail du DG doit intégrer une clause de sauvegarde (« safe harbour clause ») stipulant que le DG ne peut être sanctionné pour avoir exercé son veto prudentiel.'),
  spacer(),

  h3('2.3.2 Procédure de déclenchement du Veto Prudentiel'),
  buildTable(
    ['Étape', 'Action', 'Délai', 'Document produit'],
    [
      ['1. Détection', 'Le DG identifie une directive du Groupe/Holding incompatible avec la réglementation locale', 'Immédiat', 'Note de constat interne'],
      ['2. Opposition formelle', 'Le DG notifie par écrit son opposition au Président du CA local et au DG de la Holding', '48 heures', 'Lettre de veto prudentiel motivée'],
      ['3. Réunion d\'urgence', 'Le CA local se réunit en urgence pour examiner la conformité de la directive', '5 jours ouvrables', 'PV de CA d\'urgence'],
      ['4. Décision du CA', 'Le CA local statue : adoption de la directive avec dérogation, ou rejet de la directive', '10 jours ouvrables', 'Délibération du CA'],
      ['5. Information régulateur', 'En cas de risque grave, le DG informe le régulateur local (BCEAO/COBAC) de la situation', '15 jours ouvrables', 'Lettre d\'information au régulateur'],
      ['6. Médiation groupe', 'La Holding médie entre le Groupe et la filiale pour trouver une solution conforme', '30 jours ouvrables', 'Rapport de médiation'],
    ],
    { colWidths: [16, 34, 16, 34], boldFirstCol: true }
  ),
  spacer(),

  h3('2.3.3 Illustration du Veto Prudentiel — Cas d\'école'),
  body('Cas n°1 — Directive de crédit contraire aux ratios prudentiels : Le Groupe impose à la filiale camerounaise d\'octroyer un crédit de 500 millions à un client stratégique du Groupe. Ce crédit dépasserait le ratio de concentration (25% des fonds propres) imposé par le Règlement COBAC R-2017/05. Le DG local oppose un veto. Le CA local confirme le veto. Le crédit n\'est pas octroyé.'),
  body('Cas n°2 — Transfert de fonds non déclaré : La Holding demande un transfert de 200 millions vers Dubaï sans déclaration de change. Le DG local oppose un veto au titre de l\'interdiction des transferts non déclarés (BEAC/BCEAO). Le DG informe la BEAC. Le transfert est annulé.'),
  spacer(),

  h2('2.4 Charte de Gouvernance de Groupe — Obligation de formalisation'),
  body('La Charte de Gouvernance de Groupe est un document contractuel obligatoire, annexé aux statuts de la Holding et de chaque filiale. Elle doit être approuvée par le CA de chaque entité.'),
  spacer(),

  h3('2.4.1 Contenu obligatoire de la Charte de Gouvernance'),
  bullet('Définition des niveaux de gouvernance (Niveau 1 : Groupe Dubaï — Niveau 2 : Holding Cameroun — Niveau 3 : Filiales locales).'),
  bullet('Matrice de délégation de pouvoirs (décisions réservées, décisions partagées, décisions déléguées).'),
  bullet('Mécanisme du Veto Prudentiel (déclenchement, procédure, médiation).'),
  bullet('Lignes de reporting et de contre-reporting (dual reporting).'),
  bullet('Comités de groupe et comités locaux (composition, fréquence, attributions).'),
  bullet('Procédure de résolution des conflits (médiation interne, recours au régulateur, arbitrage).'),
  bullet('Politique de conformité transversale (LBC/FT, protection des données, cybersécurité).'),
  bullet('Clause de révision et d\'adaptation (révision annuelle, adaptation aux évolutions réglementaires).'),
  spacer(),

  h3('2.4.2 Approbation et validation de la Charte'),
  numberedItem(1, 'Rédaction par un cabinet d\'avocats spécialisé en droit OHADA et en droit bancaire (Big Four ou équivalent).'),
  numberedItem(2, 'Examen par le Conseil d\'Administration de la Holding (Cameroun) avec rapport spécial du CAC.'),
  numberedItem(3, 'Examen par les Conseils d\'Administration de chaque filiale avec délibération motivée.'),
  numberedItem(4, 'Transmission aux régulateurs (BCEAO, COBAC) pour information et validation de conformité.'),
  numberedItem(5, 'Publication interne et formation de tous les mandataires sociaux et dirigeants.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];