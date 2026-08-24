import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, redShading, defaultBorders } from '';

export const gapsParagraphs: Paragraph[] = [
  createHeading('4. ANALYSE DES GAPS RÉGLEMENTAIRES PAR PAYS', 1),
  createParagraph(
    'L\'analyse des gaps consiste à mesurer l\'écart entre les exigences réglementaires identifiées dans les chapitres précédents et les capacités actuelles ou projetées du modèle d\'affaires d\'OPTASIA. Cette analyse est fondamentale pour dimensionner les efforts de conformité, anticiper les risques de rejet, et prioriser les actions correctives.'
  ),
  createHeading('4.1 Méthodologie de scoring des gaps', 2),
  createParagraph('Chaque gap est évalué selon trois critères :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Critère', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Description', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Échelle', { bold: true, shading: tealShading, width: 35, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Criticité (C)', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Impact sur la probabilité d\'obtention de l\'agrément ou sur la viabilité opérationnelle.', { width: 40 }),
          createTableCell('1 (Faible) à 5 (Critique — risque de rejet)', { width: 35, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Effort (E)', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Ressources nécessaires pour combler le gap (temps, budget, expertise, ressources humaines).', { width: 40 }),
          createTableCell('1 (Faible) à 5 (Très élevé — > 6 mois / > 100M FCFA)', { width: 35, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Urgence (U)', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Délai avant lequel le gap doit être résolu pour ne pas impacter le calendrier de déploiement.', { width: 40 }),
          createTableCell('1 (Faible) à 5 (Immédiate — bloque le dépôt du dossier)', { width: 35, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createParagraph('Le score composite (SC) est calculé comme suit : SC = (C × 3) + (E × 2) + U. Un score supérieur à 20 indique un gap critique nécessitant une attention immédiate. Un score entre 10 et 20 est un gap majeur. Un score inférieur à 10 est un gap mineur gérable dans le cadre des opérations courantes.'),
  createHeading('4.2 Matrice des gaps par pays — Synthèse', 2),
  createParagraph('Le tableau suivant présente une synthèse des gaps identifiés par pays et par domaine :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Pays', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Capital', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Gouvernance', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('IT/SIG', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('LBC/FT', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Procédures', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Score max', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Statut', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Togo', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('6-7m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('18', { bold: true, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Gérable', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Bénin', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('6-7m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('18', { bold: true, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Gérable', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Burkina', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('9-12m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('21', { bold: true, shading: amberShading, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Mali', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('9-12m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('23', { bold: true, shading: amberShading, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Cameroun', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('5', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('9-10m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('24', { bold: true, shading: redShading, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Critique', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Gabon', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('2', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('12-14m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('23', { bold: true, shading: amberShading, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Majeur', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Congo', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('3', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('4', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('12-14m', { width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('24', { bold: true, shading: redShading, width: 10, alignment: AlignmentType.CENTER }),
          createTableCell('Critique', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('4.3 Gaps critiques — Analyse détaillée', 2),
  createParagraph('Trois (3) gaps sont identifiés comme critiques (score > 20) et nécessitent une attention immédiate :'),
  createBullet('Le Cameroun et le Congo exigent un hébergement local des données financières et une certification de conformité aux normes de cybersécurité (ISO 27001 ou équivalent). Le modèle cloud-first d\'OPTASIA nécessite une adaptation architecturale significative (hybride cloud-local) ou une négociation avec les régulateurs pour obtenir une dérogation sous conditions de sécurité renforcées. Cette adaptation est estimée à 4-6 mois et 80-120M FCFA par pays.', 'Gap CRITIQUE 1 — IT/SIG :'),
  createBullet('La séparation effective des fonctions de PCA et DG est une exigence stricte dans la zone CEMAC (Règlement COBAC R-2023/01) et en cours de renforcement dans la zone UEMOA (Instructions BCEAO 2024). Le modèle de gouvernance d\'OPTASIA, avec un siège à Dubaï, doit structurer une présence locale effective dans chaque pays (résidence du DG, indépendance du PCA, comités locaux). Cette adaptation structurelle est estimée à 3-4 mois par pays.', 'Gap CRITIQUE 2 — Gouvernance :'),
  createBullet('Le capital social minimum de 100M FCFA par pays (700M FCFA pour les 7 pays) doit être libéré intégralement avant le dépôt de chaque dossier. La synchronisation des libérations avec le calendrier de déploiement est un enjeu de trésorerie majeur. Le risque de non-libération à temps bloque le dépôt et retarde l\'ensemble du programme.', 'Gap CRITIQUE 3 — Capital social :'),
  createHeading('4.4 Gaps majeurs — Analyse détaillée', 2),
  createParagraph('Quatre (4) gaps majeurs (score 10-20) sont identifiés :'),
  createBullet('Les procédures de LBC/FT sont plus strictes en CEMAC (Règlement COBAC R-2018/01) qu\'en UEMOA. La mise en place d\'un dispositif LBC/FT conforme en CEMAC nécessite un système de surveillance des transactions, un dispositif de reporting automatique, et une formation continue des agents. Budget estimé : 30-50M FCFA par pays.', 'Gap MAJEUR 1 — LBC/FT :'),
  createBullet('Les manuels de procédures doivent être rédigés en français et adaptés aux spécificités locales. Le Cameroun exige des manuels en français et en anglais (bilinguisme officiel). La traduction et l\'adaptation sont estimées à 2-3 mois par pays.', 'Gap MAJEUR 2 — Procédures :'),
  createBullet('Les délais d\'agrément sont plus longs en CEMAC (9-14 mois) qu\'en UEMOA (6-9 mois). Cette différence structurelle impacte le calendrier de rentabilité et nécessite une planification de trésorerie plus conservative pour les pays CEMAC.', 'Gap MAJEUR 3 — Délais :'),
  createBullet('Le Burkina Faso et le Mali présentent un contexte sécuritaire dégradé qui peut impacter les délais d\'instruction, les déplacements des experts, et la sécurité des données. Des mesures d\'atténuation (sous-traitance locale, télétravail sécurisé) doivent être prévues.', 'Gap MAJEUR 4 — Contexte sécuritaire :'),
  new Paragraph({ text: '', pageBreakBefore: true }),
];



