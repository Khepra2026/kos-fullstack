import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, defaultBorders } from '';

export const recommendationsParagraphs: Paragraph[] = [
  createHeading('6. RECOMMANDATIONS STRATÉGIQUES', 1),
  createParagraph(
    'Les recommandations suivantes sont formulées sur la base de l\'analyse réglementaire, de l\'évaluation des gaps et de la matrice des risques. Elles sont structurées par zone, par pays, et par domaine fonctionnel, avec priorisation stratégique et budgets indicatifs.'
  ),
  createHeading('6.1 Recommandations stratégiques globales', 2),
  createBullet('Adopter une approche "pilote-duplicate" rigoureuse : le Togo et le Bénin (UEMOA) ainsi que le Cameroun (CEMAC) servent de laboratoires pour valider le modèle, les procédures, et les relations avec les régulateurs. Les succès et les échecs des pilotes alimentent directement les duplications.', 'Stratégie 1 :'),
  createBullet('Investir immédiatement dans la structuration de la gouvernance locale : recrutement des DG résidents dans chaque pays CEMAC, séparation effective PCA/DG, constitution des comités spécialisés (Risques, Audit, Conformité), et mise en place du dispositif des 3 lignes de défense.', 'Stratégie 2 :'),
  createBullet('Développer une architecture IT hybride (cloud + local) dès la conception : les données financières sensibles et les données clients sont hébergées localement (conformité réglementaire), tandis que le scoring, l\'analytics et le machine learning sont hébergés sur cloud sécurisé (performance et scalabilité).', 'Stratégie 3 :'),
  createBullet('Constituer un fonds de roulement de 1,5 milliard FCFA (en sus des 700M FCFA de capital social) pour couvrir les délais d\'agrément, les réquisitions, les déplacements des experts, et les adaptations imprévues.', 'Stratégie 4 :'),
  createBullet('Engager une stratégie de diplomatie institutionnelle dès le mois 1 : rencontres bilatérales avec les régulateurs, participation aux réunions sectorielles, et mise en place d\'un point de contact permanent dans chaque pays.', 'Stratégie 5 :'),
  createHeading('6.2 Recommandations par pays — UEMOA', 2),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Pays', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Recommandation prioritaire', { bold: true, shading: tealShading, width: 38, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Budget indicatif', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Priorité', { bold: true, shading: tealShading, width: 13, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Responsable', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Togo', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Démarrage rapide avec capital libéré dès le mois 1. Recrutement DG résident togolais. Développement pilote de l\'architecture IT hybride. Mise en place du dispositif LBC/FT conforme Instruction BCEAO 2024.', { width: 38 }),
          createTableCell('180M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('6-8 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P1', { bold: true, shading: tealShading, width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Bénin', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Duplication du modèle togolais avec adaptation au contexte béninois (présence concurrentielle plus forte, exigences de la CRRU plus strictes). Focus sur la différenciation par le scoring alternatif et l\'intégration Mobile Money.', { width: 38 }),
          createTableCell('160M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('6-8 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P1', { bold: true, shading: tealShading, width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Burkina', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Prudence accrue en raison du contexte sécuritaire. Sous-traitance des déplacements à un cabinet local. Télétravail sécurisé pour les travaux documentaires. Budget sécurité renforcé (assurance, escorte).', { width: 38 }),
          createTableCell('200M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('9-12 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P2', { width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Mali', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Même approche que le Burkina. Attention particulière à la stabilité des institutions (Commission Bancaire, Ministère des Finances). Renforcement du dispositif de veille politique. Budget adapté aux contraintes logistiques.', { width: 38 }),
          createTableCell('200M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('9-12 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P2', { width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('6.3 Recommandations par pays — CEMAC', 2),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Pays', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Recommandation prioritaire', { bold: true, shading: tealShading, width: 38, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Budget indicatif', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Délai', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Priorité', { bold: true, shading: tealShading, width: 13, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Responsable', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Cameroun', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Pilote CEMAC : capital libéré + garantie BEAC (50M FCFA). Recrutement DG résident camerounais. Architecture IT hybride avec hébergement local des données. Manuels en français + anglais. Diplomatie COBAC + BEAC dès le mois 1.', { width: 38 }),
          createTableCell('250M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('10-12 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P1', { bold: true, shading: tealShading, width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Gabon', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Apprentissage du modèle camerounais. Focus sur la conformité LBC/FT (Règlement COBAC R-2018/01) et la gouvernance (Règlement R-2023/01). Budget adapté aux coûts élevés du Gabon (salaries, logistique).', { width: 38 }),
          createTableCell('220M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('12-14 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P2', { width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Congo', { bold: true, width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Duplication du modèle camerounais. Attention à la complexité administrative et aux délais longs. Renforcement du dispositif de suivi de l\'instruction (relances hebdomadaires). Budget sécurité/logistique important.', { width: 38 }),
          createTableCell('230M FCFA', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('12-14 mois', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('P3', { width: 13, alignment: AlignmentType.CENTER }),
          createTableCell('Khepra', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('6.4 Budget global indicatif', 2),
  createParagraph('Le budget global indicatif pour le pré-diagnostic, la préparation des dossiers et l\'obtention des agréments dans les 7 pays est récapitulé ci-dessous :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Poste', { bold: true, shading: tealShading, width: 35, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('UEMOA (4 pays)', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('CEMAC (3 pays)', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Total', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Capital social (libération)', { width: 35 }),
          createTableCell('400M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('300M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('700M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Honoraires Khepra (fixes)', { width: 35 }),
          createTableCell('295M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('275M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('570M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Success fees (agrément obtenu)', { width: 35 }),
          createTableCell('100M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('90M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('190M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Frais de déplacement', { width: 35 }),
          createTableCell('60M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('80M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('140M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Frais IT/SIG (architecture, hébergement, sécurité)', { width: 35 }),
          createTableCell('80M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('120M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('200M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Frais administratifs (CAC, notaire, dépôts)', { width: 35 }),
          createTableCell('40M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('50M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('90M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Fonds de roulement (coussin)', { width: 35 }),
          createTableCell('100M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('100M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('200M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Frais divers (formation, traduction, assurance)', { width: 35 }),
          createTableCell('30M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('40M FCFA', { width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('70M FCFA', { bold: true, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('TOTAL', { bold: true, shading: tealShading, width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('1 105M FCFA', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('955M FCFA', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('2 060M FCFA', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createParagraph('Ce budget est indicatif et sera affiné lors de la phase de cadrage détaillée (Phase 1 du contrat MSA). Une marge de variation de ±10% est prévue pour les postes IT/SIG et frais de déplacement.', { italics: true }),
  new Paragraph({ text: '', pageBreakBefore: true }),
];



