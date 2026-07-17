import { Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, defaultBorders } from './helpers';

export const methodologyParagraphs: Paragraph[] = [
  createHeading('1. MÉTHODOLOGIE DU PRÉ-DIAGNOSTIC', 1),
  createParagraph(
    'La méthodologie adoptée pour ce pré-diagnostic réglementaire s\'inspire des standards de diligence des cabinets d\'audit et de conseil de niveau international (Big Four), adaptés aux spécificités du continent africain et aux exigences des régulateurs bancaires et monétaires de la zone francophone.'
  ),
  createHeading('1.1 Cadre méthodologique', 2),
  createParagraph('Le pré-diagnostic repose sur une approche en cinq phases :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Phase', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Dénomination', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Description', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Livrables', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('P1', { bold: true, width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Recensement réglementaire', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Identification exhaustive des textes législatifs, réglementaires, instructions et circulaires applicables à chaque pays, avec classification par niveau de contrainte (contraignant, recommandé, indicatif) et par domaine (prudentiel, gouvernance, opérationnel, IT, LBC/FT).', { width: 40 }),
          createTableCell('Matrice réglementaire par pays', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('P2', { bold: true, width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Analyse comparative', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Comparaison systématique des exigences entre pays d\'une même zone et entre zones UEMOA/CEMAC, identification des points de convergence et des divergences critiques pour le modèle d\'affaires d\'OPTASIA.', { width: 40 }),
          createTableCell('Matrice comparative UEMOA/CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('P3', { bold: true, width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Évaluation des gaps', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Mesure de l\'écart entre les exigences réglementaires et les capacités actuelles ou projetées d\'OPTASIA, avec scoring de criticité et estimation des efforts de conformité (temps, ressources, budget).', { width: 40 }),
          createTableCell('Matrice des gaps par pays', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('P4', { bold: true, width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Analyse des risques', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Identification des risques réglementaires, juridiques, opérationnels et réputationnels associés à chaque juridiction, avec évaluation de la probabilité et de l\'impact, et définition des mesures d\'atténuation.', { width: 40 }),
          createTableCell('Matrice des risques réglementaires', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('P5', { bold: true, width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('Recommandations', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('Formulation de recommandations actionnables classées par priorité stratégique, avec feuille de route opérationnelle, budgets indicatifs et échéanciers de déploiement.', { width: 40 }),
          createTableCell('Feuille de route + Budgets', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('1.2 Sources et références', 2),
  createParagraph('Les sources utilisées pour ce pré-diagnostic sont classées en quatre catégories :'),
  createBullet('Textes officiels : lois, décrets, arrêtés, instructions, circulaires, règlements des Banques Centrales (BCEAO, BEAC), du COBAC, des Ministères des Finances et des Commissions Bancaires nationales. Tous les textes cités sont sourcés avec référence exacte, date de publication et date de mise à jour lorsqu\'applicable.', 'Sources primaires :'),
  createBullet('Publications institutionnelles : rapports annuels des Banques Centrales, études sectorielles de la BCEAO, publications du COBAC, rapports du Fonds Monétaire International (FMI), de la Banque Mondiale, et de la Banque Africaine de Développement (BAD).', 'Sources secondaires :'),
  createBullet('Entretiens et veille : échanges avec des régulateurs, des praticiens du secteur, des cabinets d\'audit locaux, et veille réglementaire continue via les canaux officiels des institutions de surveillance.', 'Sources tertiaires :'),
  createBullet('Base de données internes Khepra : archives de dossiers d\'agrément précédents, analyses comparatives, jurisprudence des contentieux réglementaires, et retours d\'expérience des missions réalisées dans les pays concernés.', 'Sources propriétaires :'),
  createHeading('1.3 Limites du pré-diagnostic', 2),
  createParagraph('Le pré-diagnostic est réalisé à la date de rédaction (02 juin 2026) et reflète l\'état du droit et de la réglementation à cette date. Les utilisateurs sont informés des limites suivantes :'),
  createBullet('Les textes réglementaires sont susceptibles d\'évolution. Les révisions en cours de l\'Instruction BCEAO n°004-01-2014 et du Règlement COBAC R-2017/05 pourraient modifier certaines exigences avant la fin du déploiement.', 'Évolutivité :'),
  createBullet('L\'interprétation des textes réglementaires relève parfois du pouvoir discrétionnaire des régulateurs. Les pratiques d\'instruction peuvent varier d\'une Commission Bancaire à l\'autre, indépendamment du texte écrit.', 'Interprétation :'),
  createBullet('Le pré-diagnostic ne constitue pas un avis juridique définitif. Il s\'agit d\'un outil de planification stratégique qui devra être complété par des analyses juridiques ponctuelles au moment du dépôt de chaque dossier.', 'Portée :'),
  new Paragraph({ text: '', pageBreakBefore: true }),
];