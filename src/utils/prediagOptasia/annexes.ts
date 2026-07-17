import { Paragraph, TextRun, AlignmentType, Table, TableRow, TableCell, WidthType } from 'docx';
import { createParagraph, createHeading, createTableCell, createBullet, tealShading, lightTealShading, grayShading, defaultBorders, REFERENCE } from './helpers';

export const annexesParagraphs: Paragraph[] = [
  createHeading('ANNEXE A — GLOSSAIRE DES TERMES RÉGLEMENTAIRES', 1),
  createParagraph('Le présent glossaire définit les termes techniques et réglementaires utilisés dans ce document :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Terme', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Définition', { bold: true, shading: tealShading, width: 75, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('EMF', { bold: true, width: 25 }),
          createTableCell('Établissement de Microfinance — Institution financière spécialisée dans les opérations de crédit et d\'épargne à destination des micro-entrepreneurs et des ménages à faible revenu.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SFD', { bold: true, width: 25 }),
          createTableCell('Système Financier Décentralisé — Catégorie d\'établissements de microfinance agréés par la BCEAO ou le COBAC, classés en 1ère, 2ème ou 3ème catégorie selon leur activité.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SFD 2ème catégorie', { bold: true, width: 25 }),
          createTableCell('SFD autorisé à recevoir des dépôts du public et à délivrer des crédits, soumis aux ratios prudentiels les plus stricts et à la surveillance renforcée de la BCEAO ou du COBAC.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('BCEAO', { bold: true, width: 25 }),
          createTableCell('Banque Centrale des États de l\'Afrique de l\'Ouest — Institution d\'émission monétaire et de régulation bancaire pour les 8 États membres de l\'UEMOA.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('BEAC', { bold: true, width: 25 }),
          createTableCell('Banque des États de l\'Afrique Centrale — Institution d\'émission monétaire pour les 6 États membres de la CEMAC, gestionnaire de la politique monétaire et des réserves obligatoires.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('COBAC', { bold: true, width: 25 }),
          createTableCell('Commission Bancaire de l\'Afrique Centrale — Organisme de supervision prudentielle des établissements de crédit dans la zone CEMAC, rattaché à la BEAC.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('PCA', { bold: true, width: 25 }),
          createTableCell('Plan de Continuité d\'Activité — Document obligatoire définissant les procédures de maintien des opérations critiques en cas d\'incident majeur (panne IT, catastrophe naturelle, crise politique).', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('LBC/FT', { bold: true, width: 25 }),
          createTableCell('Lutte contre le Blanchiment de Capitaux et le Financement du Terrorisme — Ensemble des dispositifs juridiques, organisationnels et techniques visant à prévenir et détecter les flux financiers illicites.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SIG', { bold: true, width: 25 }),
          createTableCell('Système d\'Information de Gestion — Infrastructure IT couvrant la gestion des clients, des comptes, des crédits, de la comptabilité, et du reporting réglementaire.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('UBO', { bold: true, width: 25 }),
          createTableCell('Ultimate Beneficial Owner — Bénéficiaire effectif ultime d\'une entité juridique, personne physique détenant plus de 25% du capital ou exercant un contrôle effectif.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SYSCOHADA', { bold: true, width: 25 }),
          createTableCell('Système Comptable Ouest Africain et D\'Afrique Centrale — Plan comptable harmonisé applicable dans les 17 États membres de l\'OHADA, incluant un plan comptable spécifique pour les établissements de crédit.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('OHADA', { bold: true, width: 25 }),
          createTableCell('Organisation pour l\'Harmonisation en Afrique du Droit des Affaires — Organisation internationale créant un droit des affaires uniforme dans 17 pays africains, incluant les Actes Uniformels sur les sociétés commerciales et le droit comptable.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('DSCR', { bold: true, width: 25 }),
          createTableCell('Debt Service Coverage Ratio — Ratio de couverture du service de la dette, mesurant la capacité d\'un emprunteur à rembourser ses dettes à partir de ses flux de trésorerie.', { width: 75 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('GAFI', { bold: true, width: 25 }),
          createTableCell('Groupe d\'Action Financière — Organisme intergouvernemental fixant les standards internationaux en matière de lutte contre le blanchiment et le financement du terrorisme.', { width: 75 }),
        ],
      }),
    ],
  }),
  new Paragraph({ text: '', pageBreakBefore: true }),
  createHeading('ANNEXE B — LISTE DES TEXTES RÉGLEMENTAIRES CITÉS', 1),
  createParagraph('La liste suivante recense les principaux textes réglementaires cités dans ce document, avec leur référence exacte et leur date de publication :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('Référence', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Titre', { bold: true, shading: tealShading, width: 40, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Date', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 20 }),
          createTableCell('Zone', { bold: true, shading: tealShading, width: 20, alignment: AlignmentType.CENTER, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instruction BCEAO n°004-01-2014', { bold: true, width: 25 }),
          createTableCell('Instruction relative aux conditions d\'agrément des SFD et de surveillance prudentielle', { width: 40 }),
          createTableCell('2014', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instruction BCEAO n°007-03-2018', { bold: true, width: 25 }),
          createTableCell('Instruction modifiant et complétant l\'Instruction n°004-01-2014 (capital minimum, catégories)', { width: 40 }),
          createTableCell('2018', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Instructions BCEAO 2024', { bold: true, width: 25 }),
          createTableCell('Instructions n°026 à 029 (SFD digital, LBC/FT, gouvernance, cybersécurité)', { width: 40 }),
          createTableCell('2024', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Circulaire BCEAO n°01-2017', { bold: true, width: 25 }),
          createTableCell('Circulaire relative aux comités spécialisés des SFD', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Circulaire BCEAO n°02-2017', { bold: true, width: 25 }),
          createTableCell('Circulaire relative à l\'indépendance des administrateurs et à la nationalité des dirigeants', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Circulaire BCEAO n°03-2017', { bold: true, width: 25 }),
          createTableCell('Circulaire relative aux 3 lignes de défense dans les SFD', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Circulaire BCEAO n°001-2020', { bold: true, width: 25 }),
          createTableCell('Circulaire relative aux plans préventifs et aux plans de redressement', { width: 40 }),
          createTableCell('2020', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2017/05', { bold: true, width: 25 }),
          createTableCell('Règlement relatif aux conditions d\'agrément des SFD', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2017/06', { bold: true, width: 25 }),
          createTableCell('Règlement relatif à la surveillance prudentielle des SFD', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2018/01', { bold: true, width: 25 }),
          createTableCell('Règlement relatif à la lutte contre le blanchiment et le financement du terrorisme', { width: 40 }),
          createTableCell('2018', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2019/01', { bold: true, width: 25 }),
          createTableCell('Règlement relatif au contrôle interne des établissements de crédit', { width: 40 }),
          createTableCell('2019', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2021/01', { bold: true, width: 25 }),
          createTableCell('Règlement relatif au plan de continuité d\'activité (PCA)', { width: 40 }),
          createTableCell('2021', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Règlement COBAC R-2023/01', { bold: true, width: 25 }),
          createTableCell('Règlement relatif à la gouvernance des établissements de crédit (séparation PCA/DG)', { width: 40 }),
          createTableCell('2023', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Acte Uniforme OHADA (2014)', { bold: true, width: 25 }),
          createTableCell('Acte Uniforme relatif au droit des sociétés commerciales et du GIE', { width: 40 }),
          createTableCell('2014', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA/CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('SYSCOHADA révisé (2017)', { bold: true, width: 25 }),
          createTableCell('Plan comptable des établissements de crédit et assimilés', { width: 40 }),
          createTableCell('2017', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA/CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('Recommandations GAFI (2023)', { bold: true, width: 25 }),
          createTableCell('Recommandations du Groupe d\'Action Financière sur la LBC/FT', { width: 40 }),
          createTableCell('2023', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('UEMOA/CEMAC', { width: 20, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  new Paragraph({ text: '', pageBreakBefore: true }),
  createHeading('ANNEXE C — TABLEAU DE BORD DE SUIVI DES GAPS', 1),
  createParagraph('Cette annexe fournit un outil de pilotage pour le suivi des gaps et des actions correctives :'),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          createTableCell('ID', { bold: true, shading: tealShading, width: 8, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Pays', { bold: true, shading: tealShading, width: 12, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Gap', { bold: true, shading: tealShading, width: 25, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Action corrective', { bold: true, shading: tealShading, width: 30, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Responsable', { bold: true, shading: tealShading, width: 15, alignment: AlignmentType.CENTER, fontSize: 18 }),
          createTableCell('Échéance', { bold: true, shading: tealShading, width: 10, alignment: AlignmentType.CENTER, fontSize: 18 }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-001', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Cameroun, Congo', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Hébergement local des données obligatoire', { width: 25 }),
          createTableCell('Développement architecture hybride cloud-local + certification ISO 27001', { width: 30 }),
          createTableCell('Khepra IT / Optasia', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+4', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-002', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC (3 pays)', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Séparation PCA/DG effective', { width: 25 }),
          createTableCell('Recrutement DG résident, nomination PCA indépendant, constitution comités', { width: 30 }),
          createTableCell('Khepra / Optasia', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+3', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-003', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Tous (7 pays)', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Libération capital social 100M FCFA/pays', { width: 25 }),
          createTableCell('Libération progressive alignée sur le calendrier de dépôt', { width: 30 }),
          createTableCell('Optasia', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+1 à M+12', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-004', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('CEMAC (3 pays)', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Dispositif LBC/FT conforme R-2018/01', { width: 25 }),
          createTableCell('Mise en place système surveillance transactions, reporting automatique, formation agents', { width: 30 }),
          createTableCell('Khepra LBC/FT', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+5', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-005', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Cameroun', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Manuels de procédures bilingues FR/EN', { width: 25 }),
          createTableCell('Traduction professionnelle et adaptation juridique des manuels', { width: 30 }),
          createTableCell('Khepra', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+4', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-006', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Burkina, Mali', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Contexte sécuritaire dégradé', { width: 25 }),
          createTableCell('Sous-traitance locale, télétravail sécurisé, assurance risque pays', { width: 30 }),
          createTableCell('Khepra', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+2', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-007', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Tous', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Enquête de moralité actionnaires/dirigeants', { width: 25 }),
          createTableCell('Constitution dossiers KYC/UBO, casiers judiciaires, attestations bancaires', { width: 30 }),
          createTableCell('Khepra / Optasia', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+3', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
      new TableRow({
        children: [
          createTableCell('G-008', { width: 8, alignment: AlignmentType.CENTER }),
          createTableCell('Tous', { width: 12, alignment: AlignmentType.CENTER }),
          createTableCell('Veille réglementaire continue', { width: 25 }),
          createTableCell('Abonnement aux publications BCEAO/COBAC/BEAC, veille hebdomadaire Khepra', { width: 30 }),
          createTableCell('Khepra', { width: 15, alignment: AlignmentType.CENTER }),
          createTableCell('M+1 (permanent)', { width: 10, alignment: AlignmentType.CENTER }),
        ],
      }),
    ],
  }),
  new Paragraph({ text: '', pageBreakBefore: true }),
  createHeading('ANNEXE D — ORGANIGRAMME DE MISSION', 1),
  createParagraph('L\'organigramme de mission Khepra pour le programme OPTASIA est structuré comme suit :'),
  createBullet('Directeur de Mission : M. Essoyomèwè SIMDA — Supervision stratégique, arbitrage des contentieux, relations avec le Comité de Direction Optasia.', 'Niveau 1 :'),
  createBullet('Responsable Juridique OHADA : Expert senior — Rédaction des statuts, conformité OHADA, formalités de création, contentieux.', 'Niveau 2 :'),
  createBullet('Responsable Ingénierie Financière : Expert senior — Business Plans, modélisation financière, ratios prudentiels, stress tests.', 'Niveau 2 :'),
  createBullet('Responsable Réglementaire BCEAO : Expert senior — Conformité UEMOA, relations avec la BCEAO, instruction des dossiers.', 'Niveau 2 :'),
  createBullet('Responsable Réglementaire COBAC : Expert senior — Conformité CEMAC, relations avec le COBAC et la BEAC, instruction des dossiers.', 'Niveau 2 :'),
  createBullet('Responsable IT/SIG : Ingénieur système — Architecture IT, hébergement, cybersécurité, conformité SIG, intégration Mobile Money.', 'Niveau 2 :'),
  createBullet('Responsable LBC/FT : Expert conformité — Dispositif LBC/FT, reporting, formation, veille GAFI.', 'Niveau 2 :'),
  createBullet('Juristes nationaux (7 pays) : Juristes locaux — Adaptation des livrables aux spécificités nationales, relations avec les administrations, dépôts physiques.', 'Niveau 3 :'),
  createBullet('Comptables agréés (CAC) : Cabinets locaux — Audit des comptes, certification des états financiers, attestation de conformité SYSCOHADA.', 'Niveau 3 :'),
  new Paragraph({ text: '', spacing: { after: 400 } }),
  new Paragraph({
    children: [
      new TextRun({ text: '─ Fin du document ─', size: 20, color: '0F4C3A', font: 'Calibri' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: REFERENCE, size: 18, font: 'Calibri', color: '666666' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Document confidentiel — Strictement privé — Reproduction interdite', size: 16, font: 'Calibri', color: 'CC0000', bold: true }),
    ],
    alignment: AlignmentType.CENTER,
  }),
];
