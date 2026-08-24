import {
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx';
import {
  h1, h2, h3, h4, body, bullet, bulletBold, alertBox, spacer, divider, buildTable, subBullet, numberedItem,
  KHEPRA_RED,
  KHEPRA_DARK,
  KHEPRA_TEAL,
  KHEPRA_AMBER,
} from '';

export const section4Paragraphs: Paragraph[] = [
  h1('SECTION 4 — INGÉNIERIE PRUDENTIELLE DE LA RÉMUNÉRATION DES MANDATAIRES SOCIAUX'),
  divider(),

  alertBox(
    'L\'encadrement des rémunérations des dirigeants des EMF/SFD constitue un domaine de conformité souvent négligé par les promoteurs, et pourtant systématiquement audité par les régulateurs. Une politique de rémunération non conforme aux normes prudentielles est un motif de réquisition réglementaire, voire d\'avis défavorable en cas de non-régularisation.',
    'warning'
  ),
  spacer(),

  h2('4.1 — Fondements légaux et réglementaires applicables'),
  body(
    'L\'encadrement des rémunérations des mandataires sociaux des EMF/SFD repose sur un empilement normatif de cinq niveaux :'
  ),
  numberedItem(1, 'Instruction BCEAO n°008-05-2015 : Sur les conditions de rémunération des dirigeants des établissements de microfinance. Cette instruction fixe les plafonds de rémunération, les critères de performance, et les modalités de révision. Elle n\'a pas été abrogée par les Instructions 2024 et reste pleinement applicable.'),
  numberedItem(2, 'Règlement COBAC n°04/18-CEMAC-COBAC : Sur les conditions de rémunération des dirigeants des établissements de crédit et des établissements de microfinance de la CEMAC. Ce règlement fixe les plafonds de rémunération, les exigences de différé, et les clauses de malus et clawback.'),
  numberedItem(3, 'AUSCGIE OHADA (Acte Uniforme relatif au Droit des Sociétés Coopératives et des GIE) : Cadre applicable aux SFD coopératives, imposant une répartition équitable des excédents et une limitation des rémunérations des dirigeants.'),
  numberedItem(4, 'Conventions collectives de l\'UEMOA et de la CEMAC : Fixant les minima et les maxima de rémunération dans le secteur financier.'),
  numberedItem(5, 'Recommandations de la BCEAO et de la COBAC sur la gouvernance des rémunérations : Recommandations non contraignantes mais fortement incitatives, intégrées dans les grilles d\'évaluation des dossiers d\'agrément.'),
  spacer(),

  h2('4.2 — Le tableau de bord strict des rémunérations : les hard stops'),
  h3('4.2.1 — Plafond global de rémunération des dirigeants'),
  body(
    'La conformité prudentielle impose un plafond global de rémunération des dirigeants, exprimé en proportion du résultat net global de l\'EMF/SFD. Ce plafond constitue un hard stop non négociable.'
  ),
  buildTable(
    ['Poste', 'Plafond de rémunération fixe', 'Plafond de rémunération variable', 'Plafond total (% du résultat net global)', 'Référence normative'],
    [
      ['Administrateurs (hors DG)', '3 % du résultat net global', 'Non applicable', '3 %', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18'],
      ['Directeur Général (DG)', '4 % du résultat net global', '1 % du résultat net global (conditionné à la performance)', '5 %', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18'],
      ['Directeur Général Adjoint (DGA)', '2 % du résultat net global', '1 % du résultat net global (conditionné à la performance)', '3 %', 'BCEAO Inst. 008-05-2015 ; COBAC Règ. 04/18'],
      ['Directeurs de département', 'Plafond fixé par la convention collective', 'Variable indexée sur les KPIs de département', 'Fonction de la masse salariale', 'Convention collective sectorielle'],
    ],
    { colWidths: [20, 22, 22, 18, 18], headerBg: KHEPRA_RED, headerColor: 'FFFFFF' }
  ),
  spacer(),
  body(
    'Le total des rémunérations des dirigeants (PCA, DG, DGA, administrateurs) ne doit pas dépasser 8 % du résultat net global de l\'EMF/SFD. Ce plafond est un hard stop : toute dépassement constitue une non-conformité majeure, susceptible de réquisition réglementaire et, en cas de non-régularisation, d\'avis défavorable.',
    { bold: true, color: KHEPRA_RED }
  ),
  spacer(),

  h3('4.2.2 — Structure de la rémunération variable (bonus)'),
  body(
    'La rémunération variable (bonus) des dirigeants doit répondre aux critères suivants pour être conforme :'
  ),
  bulletBold('Indexation sur des KPIs prudentiels', 'La rémunération variable doit être indexée sur des indicateurs de performance prudentielle (ratios de solvabilité, ratio de liquidité, taux de défaut, taux de couverture des créances douteuses, conformité LBC/FT) et non sur des indicateurs commerciaux purs (volume de crédits, nombre de clients, etc.).'),
  bulletBold('Différé de la rémunération variable', 'Au minimum 30 % de la rémunération variable annuelle doit être différé sur une période de 3 exercices. Ce différé est assorti de clauses de malus et de clawback.'),
  bulletBold('Clause de malus', 'La clause de malus prévoit la réduction ou l\'annulation de la rémunération variable différée en cas de dégradation du portefeuille (PAR 30 > 5 %, PAR 90 > 2 %), de non-conformité réglementaire, ou de défaillance du contrôle interne.'),
  bulletBold('Clause de clawback', 'La clause de clawback prévoit le remboursement par le dirigeant de la rémunération variable déjà versée, en cas de découverte postérieure d\'une fraude, d\'une erreur matérielle dans les états financiers, ou d\'une sanction réglementaire.'),
  spacer(),

  h3('4.2.3 — Tableau de synthèse des clauses de malus et clawback'),
  buildTable(
    ['Événement déclencheur', 'Malus (réduction/annulation)', 'Clawback (remboursement)', 'Période de look-back'],
    [
      ['PAR 30 > 5 % ou PAR 90 > 2 %', 'Annulation du bonus différé de l\'exercice en cours', 'Remboursement de 50 % du bonus des 2 exercices antérieurs', '3 exercices'],
      ['Non-conformité LBC/FT majeure (sanction réglementaire)', 'Annulation du bonus différé de l\'exercice en cours', 'Remboursement intégral du bonus des 3 exercices antérieurs', '3 exercices'],
      ['Défaillance du contrôle interne (3 lignes de défense)', 'Réduction de 50 % du bonus différé', 'Remboursement de 30 % du bonus des 2 exercices antérieurs', '2 exercices'],
      ['Fraude ou erreur matérielle dans les états financiers', 'Annulation du bonus différé de l\'exercice en cours', 'Remboursement intégral du bonus des 3 exercices antérieurs', '3 exercices'],
      ['Dégradation du ratio de solvabilité sous le seuil réglementaire', 'Annulation du bonus différé de l\'exercice en cours', 'Remboursement de 50 % du bonus des 2 exercices antérieurs', '2 exercices'],
    ],
    { colWidths: [25, 25, 25, 25], headerBg: KHEPRA_AMBER, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h2('4.3 — Politique de rémunération : contenu obligatoire du dossier d\'agrément'),
  body(
    'Le dossier d\'agrément doit inclure une politique de rémunération des dirigeants répondant aux exigences suivantes :'
  ),
  numberedItem(1, 'Définition des critères de performance : Les KPIs prudentiels et commerciaux sur lesquels est indexée la rémunération variable doivent être explicitement définis, quantifiés, et validés par le Conseil d\'Administration.'),
  numberedItem(2, 'Définition des plafonds de rémunération : Les plafonds de rémunération fixe et variable doivent être exprimés en proportion du résultat net global et en valeur absolue, et validés par le Conseil.'),
  numberedItem(3, 'Définition des clauses de malus et clawback : Les conditions de déclenchement, les modalités de calcul, et les procédures de mise en œuvre des clauses de malus et clawback doivent être détaillées.'),
  numberedItem(4, 'Définition du processus de décision : Le processus de fixation et de révision des rémunérations des dirigeants doit être défini, avec la distinction des rôles du Conseil, du Comité des Rémunérations, et de l\'Assemblée Générale.'),
  numberedItem(5, 'Définition du processus de contrôle : Le processus de contrôle et de vérification de la conformité de la politique de rémunération aux normes prudentielles doit être défini, avec la désignation du responsable du contrôle.'),
  spacer(),

  h2('4.4 — Recommandations impératives de hardening'),
  bulletBold('Mesure 1 — Élaboration d\'une politique de rémunération conforme', 'Rédiger une politique de rémunération des dirigeants conforme aux normes BCEAO/COBAC/OHADA, avec les plafonds, les KPIs, les clauses de malus et clawback, et les processus de décision et de contrôle. Cette politique doit être validée par le Conseil d\'Administration et annexée au dossier d\'agrément.'),
  bulletBold('Mesure 2 — Simulation de rémunération sous stress', 'Réaliser une simulation de rémunération des dirigeants sous différents scénarios de stress (PAR 30 > 5 %, PAR 90 > 2 %, dégradation du ratio de solvabilité), pour démontrer l\'efficacité des clauses de malus et clawback. Cette simulation doit être jointe au dossier.'),
  bulletBold('Mesure 3 — Validation externe de la politique', 'Faire valider la politique de rémunération par un cabinet d\'audit externe ou un cabinet de conseil en gouvernance, et produire un rapport de validation destiné à être joint au dossier.'),
  bulletBold('Mesure 4 — Engagement de conformité continue', 'Souscrire un engagement de conformité continue envers le régulateur, prévoyant la communication annuelle de la politique de rémunération, de sa mise en œuvre, et de son adéquation aux normes prudentielles.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



