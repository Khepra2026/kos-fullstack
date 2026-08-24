import { Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow } from 'docx';
import { heading1, heading2, item, cell, multiCell, separator } from '';

export const annexCParagraphs: Paragraph[] = [
  new Paragraph({
    children: [new TextRun({ text: '', size: 1, font: 'Calibri' })],
    spacing: { before: 800, after: 0 },
    pageBreakBefore: true,
  }),
  new Paragraph({
    children: [new TextRun({ text: 'ANNEXE C — TABLEAU DE BORD DE GOUVERNANCE DE MISSION', bold: true, size: 26, font: 'Calibri', color: '1F4E3D' })],
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.LEFT,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Cette annexe définit la structure de gouvernance, les mécanismes de pilotage, les indicateurs de performance (KPI), et les modalités de reporting applicables pendant toute la durée du mandat. Elle garantit la transparence, la traçabilité, et l'alignement stratégique entre les Parties.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
  heading2('C.1 — Structure de gouvernance'),
  item('C.1.1', "Comité de Direction (Steering Committee) : composé de deux (02) représentants de chaque Partie (soit quatre membres). Le Comité de Direction se réunit mensuellement (visioconférence ou présentiel) pour valider les orientations stratégiques, arbitrer les blocages majeurs, et valider les budgets des phases à venir. Les décisions sont prises à l'unanimité ;", { after: 60, indent: 720 }),
  item('C.1.2', "Comité de Pilotage Opérationnel (Operational Committee) : composé de un (01) représentant de chaque Partie (soit deux membres), plus le Directeur de Mission Khepra. Le Comité de Pilotage se réunit toutes les deux semaines (visioconférence) pour suivre l'avancement des travaux, valider les livrables intermédiaires, et ajuster les planning. Les décisions sont prises à la majorité, le Directeur de Mission ayant voix prépondérante sur les questions techniques ;", { after: 60, indent: 720 }),
  item('C.1.3', "Cellule Projet Khepra (Project Team) : composée de cinq (05) à sept (07) experts selon la phase, sous la direction du Directeur de Mission. La Cellule Projet est responsable de la production des livrables, de la qualité interne, et du respect des délais. Elle rend compte au Comité de Pilotage ;", { after: 60, indent: 720 }),
  item('C.1.4', "Point Focal Client (Client Single Point of Contact) : le Client désigne un interlocuteur unique, avec pouvoir de décision et d'arbitrage, disponible pour les réunions de pilotage, les validations, et les urgences réglementaires. Le Point Focal est l'interface unique entre le Client et la Cellule Projet Khepra ;", { after: 60, indent: 720 }),
  item('C.1.5', "Comité de Revue Qualité (Quality Review Board) : composé de trois (03) experts seniors indépendants de Khepra, le Comité de Revue Qualité valide chaque livrable avant transmission au Client. Il émet des avis de conformité, de cohérence réglementaire, et de qualité rédactionnelle. Le Comité de Revue se réunit toutes les trois semaines.", { after: 200, indent: 720 }),
  heading2('C.2 — Mécanismes de réunion et de reporting'),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Réunion / Reporting', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Fréquence', { bold: true, width: 15, shading: '1F4E3D', fontSize: 18 }),
          cell('Participants', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Objet', { bold: true, width: 20, shading: '1F4E3D', fontSize: 18 }),
          cell('Livrable', { bold: true, width: 15, shading: '1F4E3D', fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Comité de Direction', { width: 25, fontSize: 18 }),
          cell('Mensuel', { width: 15, fontSize: 18 }),
          cell('2 repr. Khepra + 2 repr. Optasia', { width: 25, fontSize: 18 }),
          cell('Orientations stratégiques, arbitrage budget, validation jalons majeurs', { width: 20, fontSize: 18 }),
          cell('PV signé', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Comité de Pilotage', { width: 25, fontSize: 18 }),
          cell('Bimensuel', { width: 15, fontSize: 18 }),
          cell('1 repr. Khepra + 1 repr. Optasia + Directeur de Mission', { width: 25, fontSize: 18 }),
          cell('Suivi avancement, validation livrables, ajustement planning', { width: 20, fontSize: 18 }),
          cell('Compte-rendu + KPIs', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Revue Qualité', { width: 25, fontSize: 18 }),
          cell('Toutes les 3 semaines', { width: 15, fontSize: 18 }),
          cell('3 experts seniors Khepra (indépendants)', { width: 25, fontSize: 18 }),
          cell('Validation conformité, cohérence réglementaire, qualité rédactionnelle', { width: 20, fontSize: 18 }),
          cell('Fiche de validation', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell("Rapport d'activité mensuel", { width: 25, fontSize: 18 }),
          cell('Mensuel', { width: 15, fontSize: 18 }),
          cell('Directeur de Mission + Point Focal Optasia', { width: 25, fontSize: 18 }),
          cell('Avancement global, écarts, risques, actions correctives', { width: 20, fontSize: 18 }),
          cell('Rapport PDF (20-30 p.)', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Rapport de synthèse par pays', { width: 25, fontSize: 18 }),
          cell('Trimestriel', { width: 15, fontSize: 18 }),
          cell('Directeur de Mission + Point Focal Optasia', { width: 25, fontSize: 18 }),
          cell('Bilan pays par pays, avancement agrément, obstacles, prévisions', { width: 20, fontSize: 18 }),
          cell('Rapport PDF (10-15 p.)', { width: 15, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Alertes / Escalade', { width: 25, fontSize: 18 }),
          cell('En temps réel', { width: 15, fontSize: 18 }),
          cell('Directeur de Mission + Point Focal + Comité de Direction', { width: 25, fontSize: 18 }),
          cell('Signalement immédiat des blocages, réquisitions, ou risques majeurs', { width: 20, fontSize: 18 }),
          cell("Note d'alerte (email + réunion)", { width: 15, fontSize: 18 }),
        ],
      }),
    ],
  }),
  heading2('C.3 — Indicateurs de performance (KPI) — Tableau de bord'),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Catégorie KPI', { bold: true, width: 20, shading: '1F4E3D', fontSize: 18 }),
          cell('Indicateur', { bold: true, width: 30, shading: '1F4E3D', fontSize: 18 }),
          cell('Cible / Seuil', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
          cell('Fréquence de mesure', { bold: true, width: 25, shading: '1F4E3D', fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Qualité des livrables', { width: 20, fontSize: 18 }),
          multiCell(['Taux de conformité réglementaire (check-list pré-dépôt)', 'Taux de rejet formel des dossiers par les régulateurs', 'Taux de révisions majeures post-Revu Qualité'], { width: 30, fontSize: 18 }),
          multiCell(['≥ 95 %', '0 %', '≤ 5 %'], { width: 25, fontSize: 18 }),
          multiCell(['Par livrable', 'Par dépôt', 'Par livrable'], { width: 25, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Respect des délais', { width: 20, fontSize: 18 }),
          multiCell(['Taux de respect des délais contractuels par phase', 'Écart moyen de retard (jours)', 'Taux de livrables livrés à temps'], { width: 30, fontSize: 18 }),
          multiCell(['≥ 90 %', '≤ 5 jours', '≥ 95 %'], { width: 25, fontSize: 18 }),
          multiCell(['Mensuel', 'Mensuel', 'Mensuel'], { width: 25, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Efficacité réglementaire', { width: 20, fontSize: 18 }),
          multiCell(['Nombre de réquisitions majeures par dossier', 'Nombre de cycles de révision par dossier', "Taux d'agrément obtenu par pays"], { width: 30, fontSize: 18 }),
          multiCell(['≤ 2', '≤ 3', '100 % (objectif)'], { width: 25, fontSize: 18 }),
          multiCell(['Par dépôt', 'Par dépôt', 'Par pays'], { width: 25, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Satisfaction client', { width: 20, fontSize: 18 }),
          multiCell(['Score de satisfaction Optasia (enquête trimestrielle)', 'Nombre de plaintes / réclamations', 'Temps de réponse aux sollicitations (heures)'], { width: 30, fontSize: 18 }),
          multiCell(['≥ 4,2 / 5', '0', '≤ 24h'], { width: 25, fontSize: 18 }),
          multiCell(['Trimestriel', 'Mensuel', 'En continu'], { width: 25, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Gouvernance', { width: 20, fontSize: 18 }),
          multiCell(['Taux de participation aux réunions de pilotage', 'Taux de validation des PV dans les délais', 'Nombre de réunions de mise à niveau'], { width: 30, fontSize: 18 }),
          multiCell(['≥ 95 %', '≥ 95 %', '≤ 2 par trimestre'], { width: 25, fontSize: 18 }),
          multiCell(['Mensuel', 'Mensuel', 'Trimestriel'], { width: 25, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          cell('Budget', { width: 20, fontSize: 18 }),
          multiCell(['Écart budgétaire par phase', 'Taux de frais de déplacement dans la enveloppe', 'Taux de facturation dans les délais'], { width: 30, fontSize: 18 }),
          multiCell(['≤ ± 10 %', '≤ 100 %', '≥ 95 %'], { width: 25, fontSize: 18 }),
          multiCell(['Trimestriel', 'Mensuel', 'Mensuel'], { width: 25, fontSize: 18 }),
        ],
      }),
    ],
  }),
  heading2('C.4 — Gestion des risques et des écarts'),
  item('C.4.1', "Matrice des risques : la Cellule Projet Khepra maintient une matrice des risques à jour, classés par probabilité et impact (faible, moyen, élevé, critique). Les risques sont revus mensuellement lors du Comité de Pilotage ;", { after: 60, indent: 720 }),
  item('C.4.2', "Seuils d'alerte : tout écart de délai supérieur à cinq (05) jours ouvrables, tout écart budgétaire supérieur à cinq pour cent (5 %), ou tout risque classé « élevé » ou « critique » déclenche automatiquement une procédure d'alerte : note d'alerte au Point Focal, réunion d'escalade dans les 48 heures, et mise en place d'un plan d'action correctif ;", { after: 60, indent: 720 }),
  item('C.4.3', "Procédure d'escalade : en cas de blocage persistant plus de dix (10) jours ouvrables, le Comité de Pilotage élève le dossier au Comité de Direction, qui dispose d'un délai de cinq (05) jours pour arbitrer. Si le blocage persiste, les Parties conviennent d'une réunion extraordinaire (présentiel ou visioconférence) dans les sept (07) jours ;", { after: 60, indent: 720 }),
  item('C.4.4', "Rapport d'écarts : chaque mois, le Prestataire transmet un rapport d'écarts détaillant les déviances par rapport au plan initial (délais, budget, qualité), avec analyse des causes racines et plan d'action correctif. Ce rapport fait partie intégrante du Rapport d'Activité Mensuel ;", { after: 60, indent: 720 }),
  item('C.4.5', "Le Client dispose d'un droit de visite et d'audit sur les documents de travail de Khepra, sur demande écrite préalable de cinq (05) jours ouvrables, dans le respect des obligations de confidentialité.", { after: 300, indent: 720 }),
  heading2('C.5 — Outils de pilotage et plateforme collaborative'),
  item('C.5.1', "Le Prestataire met à disposition du Client une plateforme collaborative sécurisée (type Microsoft SharePoint, Google Workspace, ou équivalent) pour le partage des documents, le suivi des tâches, et l'archivage des livrables. L'accès est strictement limité aux membres des Comités de Direction et de Pilotage ;", { after: 60, indent: 720 }),
  item('C.5.2', "Un tableau de bord en temps réel (type Power BI, Tableau, ou équivalent) est accessible au Client, affichant les KPIs, les avancements par pays, les écarts, et les alertes. Le tableau de bord est mis à jour automatiquement toutes les 24 heures ;", { after: 60, indent: 720 }),
  item('C.5.3', "Un canal de communication sécurisé (type Slack, Microsoft Teams, ou équivalent) est dédié à la mission, avec des canaux thématiques par pays et par phase. Les échanges sont archivés et considérés comme des documents de travail ;", { after: 60, indent: 720 }),
  item('C.5.4', "Tous les documents, livrables, et échanges sont conservés par le Prestataire pendant une durée de cinq (05) ans après la fin du contrat, conformément aux obligations de l'OHADA et aux exigences des régulateurs.", { after: 300, indent: 720 }),
  heading2('C.6 — Dispositions finales de l\'annexe'),
  item('C.6.1', "La présente annexe C fait partie intégrante du contrat. Toute modification de la structure de gouvernance, des KPIs, ou des outils de pilotage fera l'objet d'un avenant écrit, validé par les deux Parties ;", { after: 60, indent: 720 }),
  item('C.6.2', "En cas de conflit entre les dispositions de l'annexe C et celles du corps du contrat, les dispositions les plus protectrices pour la qualité de la mission et la transparence prévalent ;", { after: 60, indent: 720 }),
  item('C.6.3', "Les Parties reconnaissent que la gouvernance de mission, le reporting rigoureux, et le tableau de bord sont des facteurs critiques de succès pour l'obtention des agréments dans les délais contractuels.", { after: 400, indent: 720 }),
  new Paragraph({
    children: [
      new TextRun({ text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', size: 20, font: 'Calibri', color: 'C5A059' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'FIN DES ANNEXES', bold: true, size: 22, font: 'Calibri', color: '1F4E3D' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Référence du contrat : KE-MSA-OPT-2026-001', bold: true, size: 18, font: 'Calibri', color: '555555' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ', bold: true, size: 18, font: 'Calibri', color: '555555' }),
    ],
    alignment: AlignmentType.CENTER,
  }),
];



