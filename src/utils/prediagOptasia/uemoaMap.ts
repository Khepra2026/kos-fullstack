import { Paragraph, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, amberShading, redShading, defaultBorders } from './helpers';

export const uemoaMapParagraphs: Paragraph[] = [
  createHeading('2. CARTOGRAPHIE RÉGLEMENTAIRE — ZONE UEMOA', 1),
  createParagraph(
    'L\'Union Économique et Monétaire Ouest Africaine (UEMOA) regroupe huit États membres partageant la même monnaie (le Franc CFA BCEAO) et soumis à la réglementation commune de la Banque Centrale des États de l\'Afrique de l\'Ouest (BCEAO). Le cadre réglementaire des établissements de microfinance est principalement défini par l\'Instruction BCEAO n°004-01-2014 et ses amendements successifs, complétés par des dispositions nationales.'
  ),
  createHeading('2.1 Architecture réglementaire UEMOA', 2),
  createParagraph('La hiérarchie des normes réglementaires applicables aux EMF/SFD dans la zone UEMOA est structurée comme suit :'),
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
          createTableCell('Traité de l\'UEMOA (1994) et ses révisions', { width: 40 }),
          createTableCell('Principes fondamentaux de l\'union monétaire, libre circulation des capitaux, coordination des politiques économiques.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instruction BCEAO', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Instruction n°004-01-2014 relative aux conditions d\'agrément des SFD et de surveillance prudentielle (modifiée par Instruction n°007-03-2018)', { width: 40 }),
          createTableCell('Capital minimum, catégories de SFD, conditions d\'agrément, ratios prudentiels, reporting, sanctions.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instruction BCEAO', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Instructions BCEAO 2024 (révisions en cours) : n°026 (SFD digital), n°027 (LBC/FT), n°028 (gouvernance), n°029 (cybersécurité)', { width: 40 }),
          createTableCell('Microfinance digitale, conformité LBC/FT renforcée, gouvernance des SFD, normes de cybersécurité et protection des données.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Circulaire BCEAO', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Circulaires n°01-2017 à 03-2017 (comités spécialisés, indépendance, 3 lignes de défense), Circulaire n°001-2020 (plans préventifs)', { width: 40 }),
          createTableCell('Gouvernance corporate (séparation PCA/DG, comités), contrôle interne, plans de redressement.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Loi nationale', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Lois nationales de régulation des SFD (ex : Loi n°2017-010 du Togo, Loi n°2019-01 du Bénin)', { width: 40 }),
          createTableCell('Cadre juridique national, création des SFD, statuts, organes, procédures judiciaires.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('OHADA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Acte Uniforme OHADA relatif au Droit des Sociétés Commerciales et du Groupement d\'Intérêt Économique (2014)', { width: 40 }),
          createTableCell('Forme juridique des sociétés, SARL, SA, SAS, formalités de création, gouvernance, dissolution.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SYSCOHADA', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('SYSCOHADA révisé (2017) — Plan comptable des établissements de crédit et assimilés', { width: 40 }),
          createTableCell('Comptabilisation des opérations, états financiers, ratios comptables, consolidation.', { width: 40 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('GAFI / CIF', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Recommandations GAFI (2023), Directive CIF de l\'UEMOA (2022)', { width: 40 }),
          createTableCell('Lutte contre le blanchiment et le financement du terrorisme, vigilance renforcée, reporting TRACFIN.', { width: 40 }),
        ],
      }),
    ],
  }),
  createHeading('2.2 Conditions d\'agrément SFD 2ème catégorie — UEMOA', 2),
  createParagraph('Les conditions matérielles d\'obtention de l\'agrément de SFD de 2ème catégorie (capable de recevoir des dépôts du public) dans la zone UEMOA sont les suivantes :'),
  createBullet('Capital social minimum : 100 000 000 FCFA (Instruction BCEAO n°007-03-2018, Article 12). Le capital doit être libéré intégralement au moment du dépôt du dossier et justifié par un certificat de dépôt émanant d\'une banque agréée.', 'Capital social :'),
  createBullet('Les actionnaires doivent faire l\'objet d\'une enquête de moralité (casier judiciaire vierge, absence de faillite personnelle, absence de condamnation pour délit financier). Les actionnaires de référence (>10% du capital) doivent fournir une déclaration UBO complète.', 'Moralité actionnaires :'),
  createBullet('Le Président du Conseil d\'Administration (PCA) et le Directeur Général (DG) doivent être de nationalité de l\'un des États membres de l\'UEMOA (Circulaire BCEAO n°02-2017, sauf dérogation exceptionnelle). Le DG doit justifier d\'au moins 5 ans d\'expérience dans le secteur financier.', 'Nationalité et compétences :'),
  createBullet('Dossier complet comprenant : Business Plan sur 5 ans (SYSCOHADA), statuts juridiques (OHADA), manuels de procédures (administratives, RH, opérationnelles, crédit/épargne, comptables), manuel de contrôle interne, plan de continuité d\'activité (PCA), dispositif LBC/FT, note technique SIG (architecture, hébergement, sécurité).', 'Dossier de demande :'),
  createHeading('2.3 Ratios prudentiels applicables — UEMOA', 2),
  createParagraph('Les SFD de 2ème catégorie doivent respecter les ratios prudentiels suivants, sous peine de mesures correctives ou de retrait d\'agrément :'),
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
          createTableCell('Ratio de solvabilité (fonds propres / actifs pondérés)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 10%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Fonds propres / Actifs pondérés des risques', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio de liquidité (actifs liquides / engagements)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 100%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Actifs liquides à moins de 30 jours / Engagements à moins de 30 jours', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Mensuelle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio de couverture des créances douteuses', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≥ 100%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Provisions / Créances douteuses', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Concentration du risque (exposition max / fonds propres)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≤ 25%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Exposition maximale sur un client / Fonds propres', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Ratio d\'endettement (dettes / fonds propres)', { width: 25, alignment: AlignmentType.CENTER }),
          createTableCell('≤ 300%', { bold: true, width: 20, alignment: AlignmentType.CENTER }),
          createTableCell('Dettes totales / Fonds propres', { width: 35, alignment: AlignmentType.CENTER }),
          createTableCell('Trimestrielle', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  createHeading('2.4 Procédure d\'agrément — UEMOA', 2),
  createParagraph('La procédure d\'agrément d\'un SFD de 2ème catégorie dans la zone UEMOA suit les étapes suivantes :'),
  createBullet('Dépôt du dossier complet auprès du Ministère des Finances du pays concerné (ou de l\'autorité compétente nationale), avec transmission simultanée à la BCEAO.', 'Étape 1 (J0) :'),
  createBullet('Accusé de réception officiel délivré par le Ministère dans un délai de 15 jours ouvrables. L\'absence d\'accusé de réception dans ce délai vaut rejet implicite (sauf enquête en cours).', 'Étape 2 (J+15) :'),
  createBullet('Instruction du dossier par la Commission Bancaire nationale (ou équivalent), avec enquête de moralité des actionnaires et dirigeants, audit sur pièces des documents techniques, et éventuellement audition des promoteurs.', 'Étape 3 (J+15 à J+120) :'),
  createBullet('Avis de la Commission Bancaire (favorable, favorable sous conditions, ou défavorable). Si l\'avis est favorable sous conditions, un délai de 30 jours est accordé pour régularisation.', 'Étape 4 (J+120 à J+180) :'),
  createBullet('Décision finale du Ministère des Finances (agrément ou rejet). L\'agrément est publié au Journal Officiel et notifié à la BCEAO.', 'Étape 5 (J+180 à J+270) :'),
  createParagraph('Délai total moyen : 6 à 9 mois selon les pays. Le Togo et le Bénin présentent les délais les plus courts (6-7 mois). Le Mali et le Burkina Faso peuvent atteindre 9-12 mois en raison de la complexité administrative.', { italics: true }),
  new Paragraph({ text: '', pageBreakBefore: true }),
];