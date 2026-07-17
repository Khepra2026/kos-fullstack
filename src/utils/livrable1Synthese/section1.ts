import { Paragraph, TextRun, AlignmentType } from 'docx';
import { TEAL, DARK, RED, AMBER, h1, h2, h3, body, bulletBold, alertBox, buildTable, divider, numberedItem } from './helpers';

export const section1Paragraphs: Paragraph[] = [
  h1('PARTIE I — CARTOGRAPHIE RÉGLEMENTAIRE CONDENSÉE'),
  divider(),
  body('Cartographie synthétique des conditions d\'agrément, des ratios prudentiels et des textes applicables dans les zones UEMOA et CEMAC. Références à jour au 2 juin 2026.'),
  h2('I.1 — UEMOA : Textes applicables et conditions d\'agrément'),
  buildTable(
    ['Texte', 'Objet', 'Exigence clé', 'Sanction'],
    [
      ['Instruction BCEAO 004-01-2014', 'Agrément SFD', 'Capital 100 M FCFA libérés + KYC des fondateurs + plan d\'affaires 5 ans', 'Rejet de dossier'],
      ['Instruction BCEAO 007-03-2018', 'Capital & fonds propres', 'Capital minimum 100 M FCFA + réserves obligatoires + ratio solvabilité ≥ 10%', 'Réquisition + suspension'],
      ['Instruction BCEAO 008-05-2015', 'Rémunérations dirigeants', 'Plafond 8% du résultat net global (Administrateurs 3%, DG 5%, DGA 3%)', 'Réquisition + avis défavorable'],
      ['Instructions BCEAO 2024 n°026', 'SFD numériques', 'Autorisation spécifique pour crédit via Mobile Money + certification algorithme', 'Rejet ou suspension'],
      ['Instructions BCEAO 2024 n°028', 'Souveraineté numérique', 'Données clients stockées en UEMOA ou certifiées BCEAO', 'Rejet d\'agrément'],
      ['Instructions BCEAO 2024 n°029', 'Scoring alternatif', 'Traçabilité algorithmique + absence de biais discriminatoires + droit explication', 'Réquisition + révision obligatoire'],
      ['Circulaire BCEAO 001-2020', 'Continuité d\'activité', 'PCA obligatoire couvrant les systèmes numériques', 'Réquisition + suspension'],
      ['Circulaires BCEAO 01/02/03-2017', 'Gouvernance', 'Séparation PCA/DG + comités spécialisés + indépendance des fonctions clés', 'Avis défavorable'],
    ],
    { colWidths: [24, 22, 30, 24], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('I.2 — CEMAC : Textes applicables et conditions d\'agrément'),
  buildTable(
    ['Texte', 'Objet', 'Exigence clé', 'Sanction'],
    [
      ['Règlement COBAC R-2017/05', 'Agrément EMF', 'Capital 100 M FCFA + garantie BEAC 50 M FCFA + plan d\'affaires + étude de marché', 'Rejet de dossier'],
      ['Règlement COBAC R-2017/06', 'Fonds propres & solvabilité', 'Ratio solvabilité ≥ 10% + provisions ≥ 100% créances douteuses', 'Réquisition + suspension'],
      ['Règlement COBAC R-2021/01', 'Souveraineté numérique', 'Serveurs de production + bases de données + logs en CEMAC ou pays d\'implantation', 'Rejet d\'agrément'],
      ['Règlement COBAC R-2023/01', 'Gouvernance & Fit and Proper', 'Séparation PCA/DG + résidence DG + expérience 7 ans + indépendance fonctions clés', 'Avis défavorable'],
      ['Règlement COBAC R-2018/01', 'LBC/FT', 'Système de surveillance des transactions + déclarations CENTIF + formation obligatoire', 'Amende + responsabilité pénale'],
      ['Règlement COBAC R-2019/01', 'Contrôle interne', 'RCI + RCC + RLBC indépendants + reporting direct au CA', 'Réquisition + sanction'],
      ['Instruction BEAC sur paiements électroniques', 'Mobile Money', 'Conventions MNO déclarées + plafond transactions mensuel 3 M FCFA', 'Gel du wallet + notification BEAC'],
    ],
    { colWidths: [24, 22, 30, 24], headerBg: '1A5F6E', headerColor: 'FFFFFF' }
  ),
  h2('I.3 — Ratios prudentiels comparatifs UEMOA vs CEMAC'),
  buildTable(
    ['Ratio', 'UEMOA (BCEAO)', 'CEMAC (COBAC)', 'Seuil de vigilance'],
    [
      ['Solvabilité (FP / APR)', '≥ 10%', '≥ 10%', '< 8%'],
      ['Liquidité à court terme', '≥ 100%', '≥ 100%', '< 80%'],
      ['Couverture (Provisions / Créances douteuses)', '≥ 100%', '≥ 100%', '< 80%'],
      ['PAR 30', 'Non réglementé — benchmark 5-7%', 'Non réglementé — benchmark 5-8%', '> 8%'],
      ['Concentration par client', '≤ 25% des FP', '≤ 25% des FP', '> 30%'],
      ['Endettement (Dettes / FP)', '≤ 300%', '≤ 300%', '> 400%'],
    ],
    { colWidths: [28, 22, 22, 28], headerBg: AMBER, headerColor: 'FFFFFF' }
  ),
  h2('I.4 — Délais et procédures d\'agrément (par pays)'),
  buildTable(
    ['Pays', 'Délai moyen', 'Étapes', 'Point de blocage fréquent'],
    [
      ['Togo', '8-12 mois', 'Dépôt → Vérification formelle → Enquête de moralité → Inspection terrain → Avis BCEAO → Arrêté', 'Enquête de moralité des fondateurs (3-6 mois)'],
      ['Bénin', '8-12 mois', 'Idem Togo', 'Validation du plan d\'affaires par le Ministère des Finances'],
      ['Burkina Faso', '10-14 mois', 'Dépôt → Vérification → Enquête → Inspection → Avis BCEAO → Arrêté (contexte sécuritaire)', 'Accès des inspecteurs BCEAO aux zones rurales'],
      ['Mali', '12-16 mois', 'Idem Burkina', 'Enquête de moralité + contexte politique'],
      ['Cameroun', '10-14 mois', 'Dépôt → Vérification COBAC → Enquête → Inspection BEAC → Avis conjoint → Arrêté', 'Garantie BEAC 50 M FCFA + double supervision'],
      ['Gabon', '10-14 mois', 'Idem Cameroun', 'Expertise technique locale limitée — recours à expertise externe'],
      ['Congo', '12-18 mois', 'Idem Cameroun', 'Infrastructure bancaire limitée — délais de virement garantie'],
    ],
    { colWidths: [12, 12, 46, 30], headerBg: TEAL, headerColor: 'FFFFFF' }
  ),
  h2('I.5 — Gaps réglementaires par pays (matrice condensée)'),
  alertBox('Les gaps suivants ont été identifiés comme bloquants pour le dossier d\'agrément. Chaque gap doit être clos avant le dépôt.', 'warning'),
  buildTable(
    ['Pays', 'Gap 1 (bloquant)', 'Gap 2 (majeur)', 'Gap 3 (modéré)'],
    [
      ['Togo', 'Absence de DG résident', 'Cloud global sans localisation', 'PCA non indépendant'],
      ['Bénin', 'Absence de DG résident', 'Convention MNO non structurée', 'Politique rémunération non rédigée'],
      ['Burkina Faso', 'Contexte sécuritaire — inspection terrain', 'Capital non libéré', 'Procédures LBC/FT non formalisées'],
      ['Mali', 'Contexte politique — enquête moralité', 'Capital non libéré', 'PCA non identifié'],
      ['Cameroun', 'Garantie BEAC 50 M non constituée', 'Holding de substance non créée', 'Comités de contrôle non structurés'],
      ['Gabon', 'Expertise technique locale limitée', 'Garantie BEAC 50 M non constituée', 'Conventions MNO non négociées'],
      ['Congo', 'Infrastructure bancaire limitée', 'Capital non libéré', 'DG non identifié'],
    ],
    { colWidths: [12, 28, 28, 32], headerBg: RED, headerColor: 'FFFFFF' }
  ),
  new Paragraph({ children: [], pageBreakBefore: true }),
];