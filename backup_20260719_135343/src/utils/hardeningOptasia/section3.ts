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

export const section3Paragraphs: Paragraph[] = [
  h1('SECTION 3 — GOUVERNANCE HARD CORE : INDÉPENDANCE ET SUBSISTANCE OPÉRATIONNELLE'),
  divider(),

  alertBox(
    'La gouvernance des EMF/SFD 2ème catégorie est soumise à un régime de conformité quasi-bancaire. Les régulateurs n\'admettent aucune dérogation sur les critères d\'indépendance, de compétence, de résidence, et de substance locale des dirigeants. Le cumul de fonctions, le pilotage à distance, et l\'absence de présence physique permanente sont des motifs d\'avis défavorable irréversibles.',
    'critical'
  ),
  spacer(),

  h2('3.1 — Référentiel normatif de gouvernance EMF/SFD'),
  body(
    'Le référentiel de gouvernance applicable aux EMF/SFD 2ème catégorie repose sur les textes suivants :'
  ),
  numberedItem(1, 'Règlement COBAC R-2023/01 : Normes de gouvernance et de gestion des risques applicables aux établissements de crédit et aux établissements de microfinance de la CEMAC. Ce règlement impose une séparation stricte entre le Président du Conseil d\'Administration (PCA) et le Directeur Général (DG), et définit les critères de compétence, d\'honneurabilité, et d\'indépendance des dirigeants.'),
  numberedItem(2, 'Circulaire BCEAO 01/2017 : Sur les comités spécialisés au sein des établissements de crédit et des établissements de microfinance. Cette circulaire impose la constitution de comités spécialisés (Risques, Audit, Crédit, Conformité) avec des majorités d\'administrateurs indépendants.'),
  numberedItem(3, 'Circulaire BCEAO 02/2017 : Sur les critères de nationalité et de compétences des dirigeants exécutifs des établissements de microfinance. Cette circulaire établit les critères de nationalité, de résidence, et d\'expérience minimale pour les dirigeants exécutifs des EMF/SFD.'),
  numberedItem(4, 'Circulaire BCEAO 03/2017 : Sur les lignes de défense et le contrôle interne. Cette circulaire définit les trois lignes de défense et impose une indépendance structurelle entre la fonction de contrôle interne et la fonction opérationnelle.'),
  numberedItem(5, 'Instruction BCEAO n°004-01-2014 : Sur les conditions d\'agrément des SFD 2ème catégorie. Cette instruction impose des critères de moralité et de compétence pour les dirigeants.'),
  numberedItem(6, 'AUSCGIE OHADA (Acte Uniforme relatif au Droit des Sociétés Coopératives et des GIE) : Cadre juridique applicable aux SFD coopératives, imposant une gouvernance démocratique et une répartition des pouvoirs.'),
  spacer(),

  h2('3.2 — Les gaps de gouvernance et leurs conséquences'),
  h3('3.2.1 — Cumul de fonctions et pilotage à distance'),
  body(
    'Le cumul de fonctions entre le Président du Conseil d\'Administration (PCA) et le Directeur Général (DG) est expressément interdit par le Règlement COBAC R-2023/01 (article 8) et fortement déconseillé par la Circulaire BCEAO 01/2017. Les conséquences sont :'
  ),
  bullet('Avis défavorable de la Commission Bancaire lorsque le cumul est détecté dans le dossier d\'agrément.'),
  bullet('Révocation immédiate de l\'agrément en cas de cumul découvert post-agrément.'),
  bullet('Inscription du promoteur sur la liste des personnes non éligibles pour une durée de 5 ans.'),
  body(
    'Le pilotage à distance par des cadres basés hors-zone (ex : Dubaï, Europe, Asie) est un motif d\'avis défavorable supplémentaire. Les régulateurs exigent une présence physique permanente du DG dans le pays d\'implantation, avec une fréquence de déplacement minimale de 4 jours par semaine sur le site principal. La résidence fiscale du DG doit être dans le pays d\'implantation ou, à défaut, dans un pays de la zone monétaire (UEMOA ou CEMAC).'
  ),
  spacer(),

  h3('3.2.2 — Absence de substance locale et de personnel permanent'),
  body(
    'Les régulateurs exigent une substance opérationnelle minimale pour toute EMF/SFD 2ème catégorie. Les critères de substance sont :'
  ),
  bullet('Un effectif permanent minimum de 10 employés à temps plein dans le pays d\'implantation, dont au moins 3 dans la fonction de contrôle interne (conformité, audit, risques).'),
  bullet('Un siège social autonome avec des bureaux physiques distincts de ceux d\'autres entités du groupe.'),
  bullet('Un système d\'information local avec un administrateur système résident dans le pays.'),
  bullet('Un comité de crédit local, un comité des risques local, et un comité d\'audit local, réunis au moins une fois par mois.'),
  spacer(),

  h2('3.3 — Conditions de substance locale : le tableau des hard stops'),
  h3('3.3.1 — Directeur Général (DG)'),
  body(
    'Le DG est le premier dirigeant de l\'EMF/SFD. Sa conformité est un hard stop absolu. Les conditions suivantes sont impératives :'
  ),
  buildTable(
    ['Critère', 'Exigence UEMOA', 'Exigence CEMAC', 'Sanction de non-conformité'],
    [
      ['Résidence physique', 'Résidence fiscale dans le pays d\'implantation (Togo, Bénin, Burkina, Mali)', 'Résidence fiscale dans le pays d\'implantation (Cameroun, Gabon, Congo) ou dans un pays de la CEMAC', 'Rejet du dossier'],
      ['Présence sur site', 'Minimum 4 jours / semaine sur le siège social', 'Minimum 4 jours / semaine sur le siège social', 'Réquisition + délai 30 jours'],
      ['Expérience minimale', '5 ans d\'expérience dans le secteur financier en UEMOA, dont 2 ans en poste de direction', '7 ans d\'expérience dans le secteur financier en CEMAC, dont 3 ans en poste de direction', 'Rejet du dossier'],
      ['Nationalité', 'Nationalité d\'un pays membre de l\'UEMOA ou justification de compétences exceptionnelles', 'Nationalité d\'un pays membre de la CEMAC ou justification de compétences exceptionnelles', 'Réquisition + délai 60 jours'],
      ['Casier judiciaire', 'Bulletin n°3 vierge de toute condamnation pénale ou disciplinaire', 'Extrait de casier judiciaire vierge de toute condamnation pénale ou disciplinaire', 'Rejet du dossier'],
      ['Indépendance', 'Ne pas être membre du Conseil d\'Administration de la maison-mère ou d\'une entité affiliée exerçant une activité concurrente', 'Ne pas être membre du Conseil d\'Administration de la maison-mère ou d\'une entité affiliée', 'Réquisition + délai 30 jours'],
    ],
    { colWidths: [20, 25, 25, 30], headerBg: KHEPRA_TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h3('3.3.2 — Président du Conseil d\'Administration (PCA)'),
  body(
    'Le PCA est le garant de l\'indépendance du Conseil et de la qualité de la gouvernance. Les conditions suivantes sont impératives :'
  ),
  buildTable(
    ['Critère', 'Exigence UEMOA', 'Exigence CEMAC', 'Sanction de non-conformité'],
    [
      ['Indépendance réelle', 'Ne pas être salarié, actionnaire majoritaire, ou membre de la direction de la filiale ou de la maison-mère', 'Ne pas être salarié, actionnaire majoritaire, ou membre de la direction de la filiale ou de la maison-mère', 'Rejet du dossier'],
      ['Expérience', '10 ans d\'expérience dans le secteur financier ou la gouvernance d\'entreprise', '10 ans d\'expérience dans le secteur financier ou la gouvernance d\'entreprise', 'Réquisition + délai 60 jours'],
      ['Nationalité', 'Nationalité d\'un pays membre de l\'UEMOA ou justification de compétences exceptionnelles', 'Nationalité d\'un pays membre de la CEMAC ou justification de compétences exceptionnelles', 'Réquisition + délai 60 jours'],
      ['Résidence', 'Résidence dans le pays d\'implantation ou dans un pays de la zone', 'Résidence dans le pays d\'implantation ou dans un pays de la zone', 'Réquisition + délai 30 jours'],
      ['Cumul de fonctions', 'Interdiction stricte de cumuler la fonction de PCA avec celle de DG, DGA, ou tout poste exécutif', 'Interdiction stricte de cumuler la fonction de PCA avec celle de DG, DGA, ou tout poste exécutif', 'Rejet du dossier'],
    ],
    { colWidths: [20, 25, 25, 30], headerBg: KHEPRA_TEAL, headerColor: 'FFFFFF' }
  ),
  spacer(),

  h3('3.3.3 — Directeur Général Adjoint (DGA) et Directeurs de département'),
  body(
    'Les DGA et directeurs de département (Crédit, Risques, Conformité, IT, Opérations) doivent répondre aux critères suivants :'
  ),
  bullet('Résidence dans le pays d\'implantation ou dans un pays de la zone monétaire.'),
  bullet('Expérience minimale de 3 ans dans la fonction concernée (5 ans pour le DGA).'),
  bullet('Nationalité d\'un pays de la zone ou justification de compétences exceptionnelles (avec engagement de formation et de transfert de compétences).'),
  bullet('Casier judiciaire vierge et attestation de moralité.'),
  bullet('Indépendance vis-à-vis des fournisseurs et partenaires commerciaux de la filiale.'),
  spacer(),

  h2('3.4 — Recommandations impératives de hardening'),
  bulletBold('Mesure 1 — Recrutement anticipé des dirigeants locaux', 'Lancer le recrutement du DG, du PCA, et du DGA au moins 6 mois avant le dépôt du dossier d\'agrément. Les candidats doivent être présentés au régulateur lors de la phase pré-dépôt (entretien de cadrage).'),
  bulletBold('Mesure 2 — Séparation stricte des fonctions', 'Mettre en place une charte de gouvernance interdisant formellement le cumul des fonctions de PCA et de DG. Cette charte doit être annexée au dossier d\'agrément.'),
  bulletBold('Mesure 3 — Constitution de comités spécialisés locaux', 'Constituer les comités spécialisés (Risques, Audit, Crédit, Conformité) avant le dépôt du dossier, avec des membres indépendants et des procès-verbaux de réunion. Joindre les PV au dossier.'),
  bulletBold('Mesure 4 — Engagement de substance locale', 'Souscrire un engagement écrit de substance locale envers le régulateur, stipulant le respect des effectifs minimaux, de la présence physique des dirigeants, et de l\'autonomie opérationnelle de la filiale.'),
  bulletBold('Mesure 5 — Plan de formation et de transfert de compétences', 'Élaborer un plan de formation et de transfert de compétences pour les cadres locaux, couvrant une période de 3 ans. Ce plan doit être validé par le régulateur et intégré au dossier.'),
  spacer(),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



