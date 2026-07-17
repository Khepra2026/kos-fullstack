import {
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Shading,
  BorderStyle,
} from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, defaultBorders, REFERENCE } from './helpers';

export const execSummaryParagraphs: Paragraph[] = [
  createHeading('EXECUTIVE SUMMARY', 1),
  createParagraph(
    'Le présent Livrable 1 constitue le pré-diagnostic et la cartographie réglementaire exhaustive de l\'environnement juridique et institutionnel régissant les agréments d\'Établissements de Microfinance (EMF) et de Systèmes Financiers Décentralisés (SFD) de 2ème catégorie dans les zones UEMOA et CEMAC. Ce document, rédigé selon les standards de diligence et de rigueur des cabinets Big Four (Deloitte, PwC, EY, KPMG), vise à fournir à OPTASIA SOLUTIONS FZCO une base factuelle, sourcée et actionnable pour la planification stratégique de son déploiement panafricain.'
  ),
  createParagraph(
    'Le mandat couvre sept (7) pays répartis en deux zones monétaires distinctes, chacune soumise à une architecture réglementaire spécifique, des exigences prudentielles différenciées et des procédures d\'agrément variées. La compréhension fine de ces disparités est critique pour l\'optimisation du calendrier de déploiement, la constitution des dossiers de demande d\'agrément, et l\'anticipation des risques réglementaires.'
  ),
  createHeading('Objectifs du Livrable 1', 2),
  createParagraph('Ce document poursuit quatre objectifs stratégiques interdépendants :'),
  createBullet('Cartographier l\'ensemble des textes réglementaires applicables dans chaque juridiction, avec hiérarchisation des normes contraignantes et identification des textes obsolètes ou en instance de révision.', 'Objectif 1 :'),
  createBullet('Identifier les exigences matérielles d\'agrément (capital social minimum, critères de moralité, compétences des dirigeants, dispositifs de conformité, infrastructure IT/SIG) et les écarts potentiels avec le modèle d\'affaires d\'OPTASIA.', 'Objectif 2 :'),
  createBullet('Évaluer les délais moyens d\'instruction, les points de friction administratifs, et les leviers d\'accélération ou de ralentissement du processus d\'agrément dans chaque pays.', 'Objectif 3 :'),
  createBullet('Formuler des recommandations structurées par pays et par zone, classées par priorité stratégique, avec échéanciers et budgets indicatifs.', 'Objectif 4 :'),
  createHeading('Périmètre géographique', 2),
  createParagraph('Le périmètre couvre les sept juridictions suivantes, structurées en vagues de déploiement :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Zone', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Pays', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Régulateur', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Vague', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Statut', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('UEMOA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Togo', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('BCEAO / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Pilote 1', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Prioritaire', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('UEMOA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Bénin', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('BCEAO / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Pilote 1', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Prioritaire', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('UEMOA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Burkina Faso', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('BCEAO / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Duplication 2', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Planifié', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('UEMOA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Mali', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('BCEAO / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Duplication 2', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Planifié', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('CEMAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Cameroun', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('COBAC / BEAC / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Pilote 1', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Prioritaire', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('CEMAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Gabon', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('COBAC / BEAC / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Apprentissage 2', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Planifié', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('CEMAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Congo-Brazzaville', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('COBAC / BEAC / Ministère des Finances', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Duplication 3', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Planifié', { width: 15, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('Synthèse des conclusions clés', 2),
  createParagraph('L\'analyse approfondie des cadres réglementaires UEMOA et CEMAC révèle des disparités structurantes qui conditionnent la stratégie de déploiement d\'OPTASIA :'),
  createBullet('La zone UEMOA bénéficie d\'un cadre réglementaire plus harmonisé depuis l\'Instruction BCEAO n°004-01-2014 et ses amendements, avec des procédures d\'agrément relativement standardisées et des délais moyens d\'instruction compris entre 6 et 9 mois. Le capital social minimum est fixé à 100 millions FCFA pour les SFD de 2ème catégorie (Instruction BCEAO n°007-03-2018).', 'UEMOA :'),
  createBullet('La zone CEMAC présente une double juridiction (COBAC + BEAC) avec des exigences prudentielles plus strictes, notamment en matière de gouvernance (séparation effective PCA/DG, comités spécialisés conformément au Règlement COBAC R-2019/01), de conformité (LBC/FT renforcé par le Règlement COBAC R-2018/01), et de continuité d\'activité (PCA, Règlement R-2021/01). Les délais d\'agrément sont plus longs (9 à 14 mois) et la probabilité de réquisitions est plus élevée.', 'CEMAC :'),
  createBullet('La question de la souveraineté des données et de l\'hébergement local des systèmes d\'information (SIG) est un point de vigilance majeur dans les deux zones. Les régulateurs exigent soit un hébergement local, soit une attestation de conformité aux normes de cybersécurité applicables.', 'Digital :'),
  createBullet('L\'enquête de moralité des actionnaires et dirigeants (KYC renforcé, UBO transparency) constitue un gâteau de passage obligatoire dans les deux zones, avec des exigences croissantes depuis les directives GAFI et les révisions des Instructions BCEAO 2024.', 'Moralité :'),
  createParagraph(''),
  createParagraph('Le présent document est structuré en sept parties principales, complétées par trois annexes techniques, et constitue la base de référence pour l\'ensemble des livrables ultérieurs (Business Plans, Manuels de Procédures, Dossiers de Moralité, etc.).', { italics: true, size: 20 }),
  new Paragraph({ text: '', pageBreakBefore: true }),
];