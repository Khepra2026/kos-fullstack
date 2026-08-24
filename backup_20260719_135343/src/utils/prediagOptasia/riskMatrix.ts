import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, redShading, defaultBorders } from '';

export const riskMatrixParagraphs: Paragraph[] = [
  createHeading('5. MATRICE DES RISQUES RÉGLEMENTAIRES', 1),
  createParagraph(
    'La matrice des risques identifie, évalue et hiérarchise les risques réglementaires, juridiques, opérationnels et réputationnels auxquels est exposé le programme de déploiement d\'OPTASIA. Cette matrice est un outil de pilotage stratégique destiné au Comité de Direction et au Comité de Pilotage Opérationnel.'
  ),
  createHeading('5.1 Méthodologie d\'évaluation des risques', 2),
  createParagraph('Chaque risque est évalué selon la méthodologie standard des cabinets Big Four :'),
  createBullet('Probabilité (P) : évaluée sur une échelle de 1 (très faible) à 5 (quasi-certaine), en fonction de la fréquence historique des occurrences et de la tendance réglementaire.', 'Probabilité :'),
  createBullet('Impact (I) : évalué sur une échelle de 1 (négligeable) à 5 (catastrophique), en fonction de l\'effet financier, opérationnel, juridique et réputationnel sur le projet.', 'Impact :'),
  createBullet('Niveau de risque (NR) = P × I. Un NR ≥ 15 est un risque critique (rouge). Un NR entre 8 et 14 est un risque majeur (orange). Un NR ≤ 7 est un risque modéré (jaune) ou faible (vert).', 'Niveau :'),
  createHeading('5.2 Matrice des risques réglementaires', 2),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Risque', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Description', { bold: true, shading: tealShading, width: 30, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Pays', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('P', { bold: true, shading: tealShading, width: 5, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('I', { bold: true, shading: tealShading, width: 5, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('NR', { bold: true, shading: tealShading, width: 8, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Niveau', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R1 — Rejet d\'agrément', { width: 25 }),
          createTableCell('Rejet définitif du dossier d\'agrément par la Commission Bancaire ou le Ministère des Finances, entraînant l\'impossibilité d\'opérer dans le pays.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('5', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('10', { bold: true, shading: amberShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R2 — Retard d\'agrément', { width: 25 }),
          createTableCell('Dépassement des délais d\'agrément de plus de 6 mois par rapport au calendrier prévu, impacant le ROI et la trésorerie.', { width: 30 }),
          createTableCell('CEMAC', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('16', { bold: true, shading: redShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Critique', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R3 — Réquisition réglementaire', { width: 25 }),
          createTableCell('Demande de modification ou de complément par le régulateur après dépôt, retardant l\'instruction et nécessitant des travaux supplémentaires.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('12', { bold: true, shading: amberShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R4 — Changement réglementaire', { width: 25 }),
          createTableCell('Modification imprévue des textes réglementaires en cours de déploiement, invalidant tout ou partie du travail réalisé.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('12', { bold: true, shading: amberShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R5 — Faute client', { width: 25 }),
          createTableCell('Fausse déclaration, non-libération du capital, opacité UBO, ou tout manquement imputable au Client qui bloque l\'agrément.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('5', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('10', { bold: true, shading: amberShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R6 — Problème IT/SIG', { width: 25 }),
          createTableCell('Non-conformité du système d\'information aux exigences de cybersécurité, d\'hébergement local ou de souveraineté des données.', { width: 30 }),
          createTableCell('CEMAC', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('12', { bold: true, shading: amberShading, width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R7 — Risque réputationnel', { width: 25 }),
          createTableCell('Atteinte à la réputation d\'OPTASIA suite à un rejet, un retard, ou une médiatisation négative du processus d\'agrément.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('6', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Modéré', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R8 — Risque de change', { width: 25 }),
          createTableCell('Le FCFA est indexé sur l\'euro, mais les variations de parité EUR/USD impactent les coûts en USD (infrastructure, licences logicielles, salaires expatriés).', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('6', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Modéré', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R9 — Risque politique', { width: 25 }),
          createTableCell('Changement de gouvernement, instabilité politique, ou modification des priorités sectorielles impactant la volonté politique d\'agrément.', { width: 30 }),
          createTableCell('Burkina, Mali, Congo', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('9', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Modéré', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('R10 — Risque de concurrence', { width: 25 }),
          createTableCell('Opposition de concurrents établis (banques, IMF existantes) qui pourraient influencer les décisions réglementaires ou médiatiser des critiques.', { width: 30 }),
          createTableCell('Tous', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 5, alignment: AlignmentType.CENTER }),
          createTableCell('6', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Modéré', { width: 12, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('5.3 Mesures d\'atténuation des risques critiques', 2),
  createParagraph('Pour chaque risque critique (NR ≥ 15) ou majeur (NR ≥ 10), des mesures d\'atténuation sont proposées :'),
  createBullet('Mesures d\'atténuation : (a) Constitution de dossiers "bulletproof" avec check-list pré-dépôt Khepra, (b) Diplomatie institutionnelle proactive avec les régulateurs avant dépôt, (c) Engagement d\'un cabinet d\'audit local agréé pour co-signer le dossier, (d) Diversification géographique (pas de dépendance à un seul pays).', 'R1 — Rejet :'),
  createBullet('Mesures d\'atténuation : (a) Clause de suspension des délais dans le contrat MSA, (b) Planification de trésorerie avec coussin de 6 mois pour les pays CEMAC, (c) Démarrage anticipé des travaux (6 mois avant le dépôt officiel), (d) Suivi hebdomadaire de l\'instruction avec relances formelles.', 'R2 — Retard :'),
  createBullet('Mesures d\'atténuation : (a) Revue qualité interne Khepra avant dépôt (3 niveaux de validation), (b) Simulation d\'audit réglementaire par un cabinet tiers, (c) Anticipation des questions récurrentes des régulateurs dans le dossier (FAQ intégrée), (d) Formation des dirigeants aux auditions.', 'R3 — Réquisition :'),
  createBullet('Mesures d\'atténuation : (a) Veille réglementaire continue (Khepra monitoring), (b) Architecture modulaire des livrables permettant des ajustements rapides, (c) Clauses de révision dans le contrat MSA, (d) Maintien de relations avec les rédacteurs des textes réglementaires.', 'R4 — Changement :'),
  createBullet('Mesures d\'atténuation : (a) Due diligence UBO complète avant engagement, (b) Certification des déclarations par un notaire, (c) Contrôle interne Khepra sur la véracité des documents fournis, (d) Clause contractuelle de suspension des délais en cas de faute client.', 'R5 — Faute client :'),
  createBullet('Mesures d\'atténuation : (a) Architecture hybride cloud-local (hébergement local des données sensibles, cloud pour le scoring et l\'analytics), (b) Certification ISO 27001 du prestataire IT, (c) Attestation de conformité RGPD + lois locales, (d) Audit de cybersécurité par un cabinet spécialisé.', 'R6 — IT/SIG :'),
  new Paragraph({ text: '', pageBreakBefore: true }),
];



