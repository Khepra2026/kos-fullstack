import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, redShading, defaultBorders } from './helpers';

export const cemacMapParagraphs: Paragraph[] = [
  createHeading('3. CARTOGRAPHIE RÉGLEMENTAIRE — ZONE CEMAC', 1),
  createParagraph(
    'La Communauté Économique et Monétaire de l\'Afrique Centrale (CEMAC) comprend six États membres partageant le Franc CFA BEAC. La régulation des établissements de microfinance est double : la Commission Bancaire de l\'Afrique Centrale (COBAC) assure la supervision prudentielle, tandis que la Banque des États de l\'Afrique Centrale (BEAC) gère la politique monétaire et les agréments. Ce cadre dual crée une complexité supplémentaire par rapport à la zone UEMOA.'
  ),
  createHeading('3.1 Architecture réglementaire CEMAC', 2),
  createParagraph('La hiérarchie des normes réglementaires applicables aux EMF/SFD dans la zone CEMAC est structurée comme suit :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Niveau', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Texte de référence', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Domaine couvert', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Traité', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Traité de la CEMAC (1994) et ses révisions', { width: 40 }),
          createTableCell('Principes de l\'union monétaire, coordination macroéconomique, libre circulation.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Règlement COBAC R-2017/05 (agrément SFD) et R-2017/06 (surveillance prudentielle)', { width: 40 }),
          createTableCell('Capital minimum, catégories, agrément, ratios, reporting, sanctions.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Règlement COBAC R-2018/01 (LBC/FT), R-2019/01 (contrôle interne), R-2021/01 (PCA), R-2023/01 (gouvernance)', { width: 40 }),
          createTableCell('Lutte contre le blanchiment, contrôle interne, continuité d\'activité, gouvernance.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instruction BEAC', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Instructions BEAC relatives aux opérations monétaires, aux réserves obligatoires, et aux conditions d\'accès au guichet de la BEAC', { width: 40 }),
          createTableCell('Politique monétaire, liquidité, réserves, refinancement.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Loi nationale', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Lois nationales de régulation des SFD (ex : Loi n°2019/002 du Cameroun, Ordonnance n°010/PR du Gabon)', { width: 40 }),
          createTableCell('Cadre juridique national, création, statuts, organes, dissolution.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('OHADA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Acte Uniforme OHADA relatif au Droit des Sociétés Commerciales (2014)', { width: 40 }),
          createTableCell('Forme juridique, SARL, SA, SAS, formalités, gouvernance.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SYSCOHADA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('SYSCOHADA révisé (2017) — Plan comptable des établissements de crédit', { width: 40 }),
          createTableCell('Comptabilisation, états financiers, ratios comptables.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('GAFI', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Recommandations GAFI (2023), Directive CEMAC sur la lutte anti-blanchiment (2021)', { width: 40 }),
          createCell('LBC/FT, vigilance, reporting, gel des avoirs.', { width: 40 }),
        ],
      }),
    ],
  }),
  createHeading('3.2 Conditions d\'agrément SFD 2ème catégorie — CEMAC', 2),
  createParagraph('Les conditions matérielles d\'obtention de l\'agrément de SFD de 2ème catégorie dans la zone CEMAC sont les suivantes :'),
  createBullet('Capital social minimum : 100 000 000 FCFA (Règlement COBAC R-2017/05, Article 8). Libération intégrale obligatoire au moment du dépôt, justifiée par certificat bancaire. Certaines juridictions (Cameroun) exigent un dépôt de garantie supplémentaire de 50 000 000 FCFA auprès de la BEAC.', 'Capital social :'),
  createBullet('Enquête de moralité renforcée pour tous les actionnaires (>5% du capital) et les dirigeants. La COBAC exige une déclaration UBO complète, une attestation de non-condamnation, et un rapport de diligence de la part d\'un cabinet d\'audit ou d\'un notaire agréé.', 'Moralité actionnaires :'),
  createBullet('Séparation effective des fonctions de PCA et de DG (Règlement COBAC R-2023/01, Article 5). Le DG doit résider dans le pays d\'implantation et justifier d\'au moins 7 ans d\'expérience dans le secteur financier. Le PCA ne peut être membre de la direction générale.', 'Gouvernance :'),
  createBullet('Dossier de demande plus volumineux que dans la zone UEMOA, comprenant : Business Plan 5 ans (SYSCOHADA), statuts (OHADA), manuels de procédures (6 catégories), manuel de contrôle interne conforme au Règlement COBAC R-2019/01, plan de continuité d\'activité (PCA) conforme au Règlement R-2021/01, dispositif LBC/FT conforme au Règlement R-2018/01, note technique SIG (architecture, hébergement local ou cloud, conformité RGPD/lois locales), rapport d\'audit du cabinet comptable agréé.', 'Dossier de demande :'),
  createHeading('3.3 Ratios prudentiels applicables — CEMAC', 2),
  createParagraph('Les SFD de 2ème catégorie doivent respecter les ratios prudentiels suivants, sous peine de mesures correctives, de retrait d\'agrément ou de sanctions pénales :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Ratio', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Seuil minimal', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Formule de calcul', { bold: true, shading: tealShading, width: 35, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Fréquence', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio de solvabilité', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 10%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Fonds propres / Actifs pondérés des risques', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio de liquidité', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 100%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Actifs liquides < 30 jours / Engagements < 30 jours', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Mensuelle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Couverture créances douteuses', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 100%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Provisions / Créances douteuses', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Concentration du risque', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≤ 25%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Exposition max / Fonds propres', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio d\'endettement', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≤ 300%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Dettes totales / Fonds propres', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Réserves obligatoires', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 5% des dépôts', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Réserves / Dépôts du public', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Mensuelle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('3.4 Procédure d\'agrément — CEMAC', 2),
  createParagraph('La procédure d\'agrément dans la zone CEMAC est plus complexe que dans la zone UEMOA en raison de la double supervision (COBAC + BEAC) :'),
  createBullet('Dépôt du dossier auprès du Ministère des Finances national et de la BEAC (siège Yaoundé ou délégation nationale), avec transmission simultanée à la COBAC.', 'Étape 1 (J0) :'),
  createBullet('Accusé de réception de la BEAC dans un délai de 30 jours. La COBAC dispose de 15 jours pour confirmer la recevabilité du dossier.', 'Étape 2 (J+30) :'),
  createBullet('Instruction par la COBAC (audit sur pièces, enquête de moralité, vérification du capital libéré, audition des dirigeants). La BEAC vérifie la conformité macroéconomique et la cohérence avec la politique monétaire.', 'Étape 3 (J+30 à J+180) :'),
  createBullet('Avis de la COBAC (favorable, sous conditions, ou défavorable). Si favorable sous conditions, délai de 45 jours pour régularisation.', 'Étape 4 (J+180 à J+240) :'),
  createBullet('Décision finale du Ministère des Finances national, après avis conforme de la COBAC et de la BEAC. Publication au Journal Officiel et enregistrement au RCCM.', 'Étape 5 (J+240 à J+360) :'),
  createParagraph('Délai total moyen : 9 à 14 mois. Le Cameroun présente le délai le plus court (9-10 mois). Le Gabon et le Congo peuvent atteindre 12-14 mois en raison de la complexité administrative et des exigences de la COBAC.', { italics: true }),
  new Paragraph({ text: '', pageBreakBefore: true }),
];

function createCell(text: string, options?: { width?: number }) {
  return createTableCell(text, { width: options?.width || 40 });
}