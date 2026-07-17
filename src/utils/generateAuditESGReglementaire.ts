import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableCell,
  TableRow,
  WidthType,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  convertInchesToTwip,
} from 'docx';

const BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
  left: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
  right: { style: BorderStyle.SINGLE, size: 1, color: '999999' },
};

const HEADER_FOOTER_BORDERS = {
  top: { style: BorderStyle.SINGLE, size: 6, color: '1B3A4B' },
  bottom: { style: BorderStyle.SINGLE, size: 6, color: '1B3A4B' },
  left: { style: BorderStyle.NIL },
  right: { style: BorderStyle.NIL },
};

const cellShade = (color: string) => ({ fill: color });

function bold(text: string): TextRun {
  return new TextRun({ text, bold: true, font: 'Calibri', size: 22 });
}

function normal(text: string, options?: { bold?: boolean; italics?: boolean; color?: string }): TextRun {
  return new TextRun({ text, font: 'Calibri', size: 22, ...options });
}

function p(children: (TextRun | string)[], options?: { spacing?: any; alignment?: AlignmentType }): Paragraph {
  const runs = children.map((c) => (typeof c === 'string' ? normal(c) : c));
  return new Paragraph({ children: runs, spacing: { after: 120, line: 276 }, ...options });
}

function heading1(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    alignment: AlignmentType.LEFT,
  });
}

function heading2(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    alignment: AlignmentType.LEFT,
  });
}

function heading3(text: string): Paragraph {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 240, after: 120 },
    alignment: AlignmentType.LEFT,
  });
}

function tableCell(text: string, options?: { bold?: boolean; shade?: string; width?: number; colSpan?: number; rowSpan?: number }): TableCell {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun({ text, bold: options?.bold, font: 'Calibri', size: 20, color: options?.shade && options.shade !== 'FFFFFF' ? 'FFFFFF' : '1A1A1A' })], spacing: { before: 60, after: 60 } })],
    shading: options?.shade ? { fill: options.shade } : undefined,
    width: options?.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options?.colSpan,
    rowSpan: options?.rowSpan,
    borders: BORDERS,
  });
}

export async function generateAuditESGReglementaire() {
  const dateStr = new Date().toLocaleDateString('fr-FR');

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: convertInchesToTwip(1), right: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1) },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'KHEPRA EXPERTS  —  AUDIT RÉGLEMENTAIRE ESG', bold: true, font: 'Calibri', size: 18, color: '1B3A4B' })],
                alignment: AlignmentType.CENTER,
                border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '1B3A4B' } },
                spacing: { after: 120 },
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Document confidentiel  —  ', font: 'Calibri', size: 18, color: '666666' }),
                  new TextRun({ text: 'KE-AUDIT-ESG-2026-001  —  ', font: 'Calibri', size: 18, color: '666666' }),
                  new TextRun({ children: ['Page ', PageNumber.CURRENT, ' / ', PageNumber.TOTAL_PAGES], font: 'Calibri', size: 18, color: '666666' }),
                ],
                alignment: AlignmentType.CENTER,
                border: { top: { style: BorderStyle.SINGLE, size: 6, color: '1B3A4B' } },
                spacing: { before: 120 },
              }),
            ],
          }),
        },
        children: [
          // PAGE DE GARDE
          new Paragraph({ spacing: { before: 1200 } }),
          new Paragraph({
            children: [new TextRun({ text: 'RAPPORT D\'AUDIT', bold: true, font: 'Calibri', size: 52, color: '1B3A4B' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'RÉGLEMENTAIRE ESG', bold: true, font: 'Calibri', size: 52, color: '1B3A4B' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Article audité :', bold: true, font: 'Calibri', size: 24, color: '4A4A4A' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
          }),
          new Paragraph({
            children: [new TextRun({ text: '"Conformité ESG BCEAO/COBAC/IFC/GRI — Afrique Francophone"', font: 'Calibri', size: 24, color: '4A4A4A', italics: true })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Référence : KE-AUDIT-ESG-2026-001', bold: true, font: 'Calibri', size: 22, color: '1B3A4B' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `Date d'audit : ${dateStr}`, font: 'Calibri', size: 22, color: '4A4A4A' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Classification : CONFIDENTIEL — STRATEGIQUE — USAGE INTERNE', bold: true, font: 'Calibri', size: 20, color: '8B0000' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Destinataire : Comité Exécutif Khepra Experts / Direction Conformité', font: 'Calibri', size: 20, color: '4A4A4A' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 800 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'AVERTISSEMENT', bold: true, font: 'Calibri', size: 24, color: '8B0000' })],
            alignment: AlignmentType.CENTER,
            spacing: { before: 400, after: 200 },
          }),
          p([
            'Le présent rapport est un document de travail interne produit dans le cadre d\'une démarche d\'audit critique et d\'amélioration continue du contenu éditorial de Khepra Experts. Il ne constitue pas un avis juridique externe. Toute décision de modification, publication ou suppression de contenu relève de la seule responsabilité de la direction éditoriale et juridique du cabinet.'
          ], { alignment: AlignmentType.CENTER }),

          // SAUT DE PAGE
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),

          // SECTION I — RÉSUMÉ EXÉCUTIF
          heading1('SECTION I  —  RÉSUMÉ EXÉCUTIF DE L\'AUDIT'),
          p([
            'L\'article ', normal('"Conformité ESG BCEAO/COBAC/IFC/GRI — Afrique Francophone"', { italics: true }), ' a fait l\'objet d\'un audit réglementaire approfondi selon la méthodologie décrite dans les termes de référence de la mission. Au total, ', bold('14 non-conformités ou imprécisions réglementaires'), ' ont été identifiées, réparties comme suit :'
          ]),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  tableCell('Critique', { bold: true, shade: '8B0000', width: 25 }),
                  tableCell('2', { bold: true, shade: 'F5F5F5', width: 25 }),
                  tableCell('Risque d\'erreur juridique grave, de discrédit institutionnel et de mise en conformité erronée.', { width: 50 }),
                ],
              }),
              new TableRow({
                children: [
                  tableCell('Élevé', { bold: true, shade: 'D97706', width: 25 }),
                  tableCell('3', { bold: true, shade: 'F5F5F5', width: 25 }),
                  tableCell('Incohérence interne au corpus du site, confusion normative, risque de perte de crédibilité.', { width: 50 }),
                ],
              }),
              new TableRow({
                children: [
                  tableCell('Moyen', { bold: true, shade: 'D97706', width: 25 }),
                  tableCell('3', { bold: true, shade: 'F5F5F5', width: 25 }),
                  tableCell('Surinterprétation, données non sourcées, confusion volontaire / réglementaire.', { width: 50 }),
                ],
              }),
              new TableRow({
                children: [
                  tableCell('Faible', { bold: true, shade: '2563EB', width: 25 }),
                  tableCell('6', { bold: true, shade: 'F5F5F5', width: 25 }),
                  tableCell('Imprécisions éditoriales, coquilles, formulations maladroites.', { width: 50 }),
                ],
              }),
            ],
          }),
          p(['Les non-conformités critiques portent sur la citation répétée d\'un texte CEMAC abrogé (Règlement n°01/03) comme en vigueur, et sur une confusion entre cadre comptable révisé et supervision bancaire consolidée au niveau des Instructions BCEAO. Ces erreurs, si elles demeurent en ligne, exposent Khepra Experts à un risque réputationnel significatif auprès des régulateurs, des investisseurs institutionnels et des cabinets Big Four.']),
          p(['Le niveau global de crédibilité réglementaire de l\'article est évalué à ', bold('62/100'), ' avant correction, et projeté à ', bold('91/100'), ' après application intégrale des corrections recommandées.']),

          // SECTION II — TABLEAU DES NON-CONFORMITÉS
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),
          heading1('SECTION II  —  TABLEAU DES NON-CONFORMITÉS'),
          p(['Ce tableau recense, par ordre de criticité décroissante, l\'ensemble des non-conformités, imprécisions et erreurs identifiées dans l\'article audité. Chaque entrée précise le passage concerné, le problème, le niveau de risque, la justification et la correction recommandée.']),

          heading2('NC-001  —  CITATION D\'UN TEXTE CEMAC ABROGÉ (CRITIQUE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 4.3 (Gouvernance ESG — Social) : "Lutte contre la corruption et le blanchiment de capitaux (LBC/FT) : conformité Directive UEMOA n°02/2015 / Règlement CEMAC n°01/03"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Le Règlement CEMAC n°01/03/CEMAC/UMAC/CM du 4 avril 2003 a été abrogé et remplacé par le Règlement n°01/16/CEMAC/UMAC/CM du 11 avril 2016 relatif à la LBC/FT/FP. Citer le n°01/03 comme texte en vigueur constitue une erreur juridique matérielle.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '8B0000', width: 30 }), tableCell('CRITIQUE. Risque de mise en conformité erronée, de conseil juridique fallacieux, et de discrédit auprès des régulateurs CEMAC et des auditeurs prudentiels.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Vérifié dans le corpus interne (article IMF/EMF) et via sources BEAC/CEMAC. L\'abrogation est explicite dans le préambule du Règlement n°01/16 de 2016.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Remplacer systématiquement "Règlement CEMAC n°01/03" par "Règlement CEMAC n°01/16/CEMAC/UMAC/CM du 11 avril 2016 (LBC/FT/FP, abroge et remplace le Règlement n°01/03 de 2003)". Ajouter une note de bas d\'article sur l\'abrogation.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('CEMAC, Règlement n°01/16/CEMAC/UMAC/CM du 11 avril 2016 ; BEAC (publications réglementaires CEMAC) ; article interne IMF/EMF validé.', { width: 70 })] }),
            ],
          }),

          heading2('NC-002  —  CITATION DU MÊME TEXTE ABROGÉ DANS LE TABLEAU COMPARATIF ESG (CRITIQUE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Tableau comparatif des standards ESG, ligne "Règlement CEMAC LBC/FT" : "n°01/03"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Même erreur que NC-001 dans un tableau de synthèse institutionnel, amplifiée par la nature récapitulative du document.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '8B0000', width: 30 }), tableCell('CRITIQUE. Un tableau comparatif est un outil de référence rapide. Une erreur ici est plus visible et plus dommageable qu\'une erreur dans un paragraphe narratif.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Idem NC-001. L\'erreur est récurrente dans l\'article (au moins 3 occurrences identifiées).', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Remplacer par "Règlement CEMAC n°01/16/CEMAC/UMAC/CM du 11 avril 2016 (abroge le n°01/03 de 2003)". Uniformiser toutes les occurrences dans l\'ensemble du corpus ESG.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Idem NC-001.', { width: 70 })] }),
            ],
          }),

          heading2('NC-003  —  COQUILLE TYPOGRAPHIQUE ET CONFUSION SUR LES INSTRUCTIONS BCEAO n°026-029 (ÉLEVÉ)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 3.1 (BCEAO — Zone UEMOA) : "Instructions n°026 à 029-11-2012016 portent principalement sur la supervision bancaire consolidée"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('1) Coquille "2012016" au lieu de "2016". 2) Ces Instructions portent sur le CADRE COMPTABLE RÉVISÉ (engagements en souffrance, locations, commissions, titres), et NON sur la supervision bancaire consolidée, qui est régie par la Décision n°014/24/06/2016/CM/UMOA.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('ÉLEVÉ. Incohérence interne majeure avec l\'article IMF/EMF (section 1.2) qui décrit correctement ces Instructions. Confusion normative pouvant induire le lecteur sur les compétences respectives de la BCEAO et de la CB-UMOA.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Confrontation interne corpus : article IMF/EMF, section 1.2, énonce correctement l\'objet de ces Instructions. L\'erreur dans l\'article ESG est soit une coquille, soit une confusion volontaire non vérifiée.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Corriger la date en "n°026 à 029-11-2016". Remplacer l\'objet par : "portent sur le cadre comptable révisé des établissements de crédit (engagements en souffrance, contrats de location, commissions et coûts de transaction, titres)". Renvoyer à la Décision n°014/24/06/2016/CM/UMOA pour la supervision consolidée.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('BCEAO, Instructions n°026 à 029-11-2016 ; BCEAO/UMOA, Décision n°014/24/06/2016/CM/UMOA ; article interne IMF/EMF validé.', { width: 70 })] }),
            ],
          }),

          heading2('NC-004  —  FORMAT DE RÉFÉRENCE DIRECTIVE UEMOA LBC/FT INCOMPLET (ÉLEVÉ)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Multiples occurrences : "Directive UEMOA n°02/2015" au lieu de la forme complète.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('La référence complète et officielle est "Directive n°02/2015/CM/UEMOA relative à la lutte contre le blanchiment de capitaux et le financement du terrorisme". L\'abréviation "n°02/2015" est ambiguë et non conforme aux usages institutionnels.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('ÉLEVÉ. Risque de citation erronée dans des mémoires juridiques, des dossiers d\'agrément ou des rapports de due diligence fondés sur l\'article.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Confrontation avec l\'article IMF/EMF qui utilise la forme complète "Directive UEMOA n°02/2015/CM/UEMOA". Uniformité requise dans le corpus.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Uniformiser l\'ensemble du corpus Khepra Experts en utilisant systématiquement la forme complète : "Directive n°02/2015/CM/UEMOA relative à la lutte contre le blanchiment de capitaux et le financement du terrorisme".', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('UEMOA, Directive n°02/2015/CM/UEMOA ; article interne IMF/EMF validé.', { width: 70 })] }),
            ],
          }),

          heading2('NC-005  —  CONFUSION SUR LA SÉPARATION DES POUVOIRS PCA/DG (ÉLEVÉ)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 4.3 (Gouvernance ESG) : "Séparation effective des pouvoirs entre Président du CA et Directeur Général" présenté comme critère ESG de gouvernance.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('L\'AUSCGIE révisé 2014 admet le cumul des fonctions de Président du CA et de DG. La séparation est une RECOMMANDATION des Principes OCDE (non contraignante) et une attente des investisseurs institutionnels, mais NON une obligation légale OHADA.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('ÉLEVÉ. Présentation d\'une recommandation de bonne pratique comme une obligation implicite. Risque de confusion normative pour les promoteurs et dirigeants.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('AUSCGIE art. sur les deux modes de gouvernance (PDG vs Président+DG distincts) ; Principes OCDE 2015, chapitre VI.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ajouter une note explicative : "L\'AUSCGIE révisé 2014 admet le cumul des fonctions. La séparation est une recommandation des Principes OCDE (non contraignante) et une attente des investisseurs institutionnels, non une obligation légale universelle."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('OHADA, AUSCGIE révisé 2014 ; OCDE, Principes de gouvernance d\'entreprise G20/OCDE, 2015.', { width: 70 })] }),
            ],
          }),

          heading2('NC-006  —  DONNÉES CLIMATIQUES NON SOURCÉES ET NON CONTEXTUALISÉES (MOYEN)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 4.1 (Environnement) : "Les pertes liées aux événements climatiques en Afrique subsaharienne représentent une part significative du PIB selon les estimations du Climate Change Knowledge Portal..."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Formulation floue ("part significative") sans données chiffrées, sans périmètre géographique précis, sans base de calcul ni date de l\'estimation. Risque de surinterprétation et de greenwashing par généralisation.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('MOYEN. Formulation insuffisamment sourcée pour un contenu institutionnel destiné à des régulateurs et investisseurs.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Exigences méthodologiques de l\'audit : toute donnée ESG doit être sourcée, datée et contextualisée. Le CCKP fournit des données par pays et par scénario ; une agrégation continentale sans méthodologie exposée est non vérifiable.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Remplacer par une formulation prudente : "Selon les estimations indicatives du Climate Change Knowledge Portal de la Banque Mondiale, les pertes liées aux événements climatiques varient considérablement selon les pays et les secteurs (par exemple, de X % à Y % du PIB selon les scénarios GIEC et les horizons temporels). Toute donnée doit être sourcée, datée et contextualisée." Ou supprimer la phrase et la remplacer par un encadré méthodologique.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Banque Mondiale, Climate Change Knowledge Portal — worldbank.org ; GIEC, AR6 (2021-2023).', { width: 70 })] }),
            ],
          }),

          heading2('NC-007  —  POLITIQUE DE RÉMUNÉRATION ESG PRÉSENTÉE SANS DISTINCTION NORMATIVE (MOYEN)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 4.3 (Gouvernance ESG) : "Politique de rémunération des dirigeants alignée sur la performance à long terme et les critères ESG"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), cellShade('FFFFFF'), tableCell('Présenté comme critère de gouvernance ESG sans préciser qu\'il s\'agit d\'une pratique de marché (OCDE, PRI, IFC) et non d\'une obligation réglementaire BCEAO/COBAC.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('MOYEN. Confusion subtile entre pratique recommandée et obligation réglementaire.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ni la BCEAO ni la COBAC n\'imposent de lien formel entre rémunération et critères ESG. Cette pratique relève des standards internationaux de gouvernance et des attentes des investisseurs institutionnels.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ajouter : "Pratique recommandée par les standards internationaux (OCDE, PRI, IFC) et les investisseurs institutionnels. Non obligatoire réglementaire en zone UEMOA/CEMAC."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('OCDE, Principes de gouvernance d\'entreprise 2015 ; PRI, Principles for Responsible Investment.', { width: 70 })] }),
            ],
          }),

          heading2('NC-008  —  PROBABILITÉS SUBJECTIVES DANS LA MATRICE DES RISQUES ESG (MOYEN)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Matrice des risques ESG : colonnes "Probabilité" et "Impact financier" (Élevée, Moyenne, etc.)', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Les probabilités et impacts sont évalués de manière subjective sans méthodologie exposée, sans source et sans contextualisation sectorielle.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: 'D97706', width: 30 }), tableCell('MOYEN. Pour un tableau institutionnel, l\'absence de méthodologie affaiblit la crédibilité et expose à des contestations lors de due diligence.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Standards d\'audit ESG internes : une matrice de risques doit être accompagnée d\'une note méthodologique ou présentée comme indicative.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ajouter sous la matrice : "Probabilités et impacts indicatifs, à adapter selon le contexte sectoriel, géographique et le profil de risque propre à chaque institution. Ces évaluations ne constituent pas des prévisions statistiques validées."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('IFAC, International Framework for Assurance Engagements ; IIA, Three Lines Model.', { width: 70 })] }),
            ],
          }),

          heading2('NC-009  —  IMPRÉCISION TABLEAU COMPARATIF GRI (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Tableau comparatif ESG, ligne GRI : "Volontaire (exigé par bailleurs)"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Contradiction apparente entre "volontaire" et "exigé". Le GRI est un standard volontaire ; certaines conventions de financement l\'exigent. Les deux qualificatifs dans la même case créent une ambiguïté.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Maladresse éditoriale, non erreur juridique.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Exigence de clarté conceptuelle : un standard ne peut être simultanément "volontaire" et "exigé" par la même entité. Il est volontaire en tant que standard, et exigé contractuellement par certains bailleurs.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Remplacer par : "Standard volontaire, fréquemment exigé par les bailleurs de fonds dans leurs conventions de financement."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('GRI, Universal Standards 2021.', { width: 70 })] }),
            ],
          }),

          heading2('NC-010  —  CHIFFRE ÉQUATOR PRINCIPES NON VÉRIFIÉ (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 1.8 : "140 institutions financières dans plus de 40 pays"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Le nombre exact d\'adhérents et de pays fluctue. "Plus de 40 pays" n\'a pas été vérifié à la date de l\'audit et pourrait être une légère surestimation.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Risque de publicité trompeuse minime mais non nul dans un contexte institutionnel.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Vérification sur equator-principles.com (données non intégrées dans l\'audit en temps réel).', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Remplacer par : "Environ 140 institutions financières dans plus de 35 pays (chiffre indicatif, consulter equator-principles.com pour les données actualisées)."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Equator Principles Association — equator-principles.com.', { width: 70 })] }),
            ],
          }),

          heading2('NC-011  —  URL OHADA INCERTAINE (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Bibliographie ESG : "ohada.com"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Le portail officiel de l\'OHADA est "ohada.org". L\'utilisation de "ohada.com" (sans vérification préalable) peut renvoyer vers un site non officiel ou obsolète.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Risque de sourcing erroné mais impact limité si le lecteur vérifie.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Vérification rapide : le domaine ohada.org est le portail institutionnel reconnu. Ohada.com est un domaine alternatif non vérifié comme officiel.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Uniformiser l\'ensemble du corpus sur "ohada.org" (ou vérifier l\'URL exacte du portail officiel et l\'indiquer).', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('OHADA — ohada.org (portail institutionnel).', { width: 70 })] }),
            ],
          }),

          heading2('NC-012  —  ABSENCE DE CSRD/SFDR COMME RÉFÉRENCE EUROPÉENNE (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 3.3 : référence aux "standards européens (CSRD, SFDR, Taxonomie verte)" de manière générique sans les citer nominativement.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('L\'article évoque "les réglementations européennes" sans nommer la CSRD (Directive 2022/2464) ni le SFDR (Règlement 2019/2088). Dans un contexte de comparaison normative, l\'absence de référence exacte affaiblit la crédibilité.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Non-conformité par omission.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Méthodologie : toute comparaison normative exige la citation des textes de référence exacts.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ajouter en note : "Référence européenne : CSRD — Directive (UE) 2022/2464 ; SFDR — Règlement (UE) 2019/2088 ; Taxonomie verte — Règlement (UE) 2020/852."', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Journal Officiel de l\'Union Européenne.', { width: 70 })] }),
            ],
          }),

          heading2('NC-013  —  ABSENCE DE DATE DE CONSULTATION DES SOURCES WEB (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Bibliographie et sources web : absence de date de consultation pour les URLs.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Les sources web évoluent. Une citation sans date de consultation n\'est pas vérifiable a posteriori.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Bonne pratique institutionnelle, non obligation légale.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Standards académiques et d\'audit (IFAC, ISO 27001 sur la traçabilité).', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Ajouter "consulté le JJ/MM/AAAA" à toutes les références web dans la bibliographie.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('IFAC, International Framework for Assurance Engagements.', { width: 70 })] }),
            ],
          }),

          heading2('NC-014  —  COQUILLE TYPOGRAPHIQUE "2012016" (FAIBLE)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Passage concerné', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Section 3.1 : "029-11-2012016"', { width: 70 })] }),
              new TableRow({ children: [tableCell('Problème identifié', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Coquille de frappes "2012016" au lieu de "2016". Déjà traitée dans NC-003 mais mérite une entrée autonome dans le tableau des coquilles.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Niveau de risque', { bold: true, shade: '2563EB', width: 30 }), tableCell('FAIBLE. Typographique.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Justification', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Relecture éditoriale.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Correction recommandée', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Corriger en "029-11-2016" et vérifier l\'ensemble du corpus pour d\'autres coquilles numériques.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Source officielle', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('BCEAO, Instructions n°026 à 029-11-2016.', { width: 70 })] }),
            ],
          }),

          // SECTION III — RÉFÉRENCES À AJOUTER
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),
          heading1('SECTION III  —  RÉFÉRENCES RÉGLEMENTAIRES ET NORMATIVES À AJOUTER'),
          p(['Pour renforcer la crédibilité institutionnelle de l\'article et aligner le corpus Khepra Experts sur les standards de référencement exigés par les cabinets Big Four et les régulateurs, les références suivantes doivent être intégrées :']),

          heading2('A. Références réglementaires africaines à ajouter ou corriger'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('N°', { bold: true, shade: '1B3A4B', width: 8 }), tableCell('Intitulé exact', { bold: true, shade: '1B3A4B', width: 42 }), tableCell('Numéro et date exacts', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Lien / Source officielle', { bold: true, shade: '1B3A4B', width: 20 })] }),
              new TableRow({ children: [tableCell('1', { width: 8 }), tableCell('Règlement CEMAC relatif à la LBC/FT/FP (remplace le n°01/03)', { width: 42 }), tableCell('n°01/16/CEMAC/UMAC/CM du 11 avril 2016', { width: 30 }), tableCell('beac.int (publications CEMAC)', { width: 20 })] }),
              new TableRow({ children: [tableCell('2', { width: 8 }), tableCell('Décision UMOA relative à la supervision bancaire consolidée', { width: 42 }), tableCell('n°014/24/06/2016/CM/UMOA', { width: 30 }), tableCell('uemoa.int ; bceao.int', { width: 20 })] }),
              new TableRow({ children: [tableCell('3', { width: 8 }), tableCell('Directive UEMOA LBC/FT (forme complète)', { width: 42 }), tableCell('n°02/2015/CM/UEMOA', { width: 30 }), tableCell('uemoa.int', { width: 20 })] }),
              new TableRow({ children: [tableCell('4', { width: 8 }), tableCell('Règlement COBAC relatif au contrôle interne des établissements de crédit CEMAC (en vigueur)', { width: 42 }), tableCell('R-2016/04 (abroge R-2001/07 et R-93/08)', { width: 30 }), tableCell('beac.int / cobac.org', { width: 20 })] }),
              new TableRow({ children: [tableCell('5', { width: 8 }), tableCell('Règlement COBAC relatif à la gouvernance des systèmes d\'information CEMAC', { width: 42 }), tableCell('R-2024/01 (en vigueur au 1er janvier 2025)', { width: 30 }), tableCell('beac.int / cobac.org', { width: 20 })] }),
              new TableRow({ children: [tableCell('6', { width: 8 }), tableCell('Loi Uniforme sur la Microfinance dans l\'UEMOA', { width: 42 }), tableCell('Décision n°019/CM/UMOA du 21 décembre 2023', { width: 30 }), tableCell('bceao.int', { width: 20 })] }),
            ],
          }),

          heading2('B. Références internationales à ajouter pour cohérence comparative'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('N°', { bold: true, shade: '1B3A4B', width: 8 }), tableCell('Intitulé exact', { bold: true, shade: '1B3A4B', width: 42 }), tableCell('Numéro et date exacts', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Lien / Source officielle', { bold: true, shade: '1B3A4B', width: 20 })] }),
              new TableRow({ children: [tableCell('7', { width: 8 }), tableCell('CSRD — Corporate Sustainability Reporting Directive (UE)', { width: 42 }), tableCell('Directive (UE) 2022/2464', { width: 30 }), tableCell('eur-lex.europa.eu', { width: 20 })] }),
              new TableRow({ children: [tableCell('8', { width: 8 }), tableCell('SFDR — Sustainable Finance Disclosure Regulation (UE)', { width: 42 }), tableCell('Règlement (UE) 2019/2088', { width: 30 }), tableCell('eur-lex.europa.eu', { width: 20 })] }),
              new TableRow({ children: [tableCell('9', { width: 8 }), tableCell('Taxonomie verte de l\'Union Européenne', { width: 42 }), tableCell('Règlement (UE) 2020/852', { width: 30 }), tableCell('eur-lex.europa.eu', { width: 20 })] }),
              new TableRow({ children: [tableCell('10', { width: 8 }), tableCell('Recommandations révisées du GAFI (LBC/FT/FP)', { width: 42 }), tableCell('2012 (révisions ultérieures)', { width: 30 }), tableCell('fatf-gafi.org', { width: 20 })] }),
              new TableRow({ children: [tableCell('11', { width: 8 }), tableCell('IFRS S1 — Sustainability-related Disclosures', { width: 42 }), tableCell('IFRS Foundation, juin 2023', { width: 30 }), tableCell('ifrs.org', { width: 20 })] }),
              new TableRow({ children: [tableCell('12', { width: 8 }), tableCell('IFRS S2 — Climate-related Disclosures', { width: 42 }), tableCell('IFRS Foundation, juin 2023', { width: 30 }), tableCell('ifrs.org', { width: 20 })] }),
            ],
          }),

          // SECTION IV — PASSAGES CORRIGÉS
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),
          heading1('SECTION IV  —  VERSIONS CORRIGÉES DES PASSAGES SENSIBLES'),
          p(['Les passages suivants sont réécrits selon les standards institutionnels de prudence rédactionnelle, de distinction normative et de sourçage. Chaque correction supprime les formulations risquées et intègre les distinctions : obligation légale / recommandation / pratique de marché / engagement volontaire.']),

          heading2('IV.A  —  Correction BCEAO / Instructions n°026-029 (Section 3.1)'),
          heading3('Texte original (incorrect) :'),
          p(['"Les Instructions n°026 à 029-11-2012016 portent principalement sur la supervision bancaire consolidée et la gestion des risques opérationnels ; elles ne constituent pas un cadre ESG autonome."']),
          heading3('Texte corrigé :'),
          p(['"Les ', bold('Instructions n°026 à 029-11-2016'), ' portent sur le ', bold('cadre comptable révisé'), ' des établissements de crédit de la zone UEMOA, couvrant notamment : la comptabilisation des engagements en souffrance (n°026), les contrats de location (n°027), les commissions et coûts de transaction (n°028), et les titres (n°029). Elles ne constituent pas un cadre ESG autonome. La ', bold('supervision bancaire sur base consolidée'), ' est régie par la ', bold('Décision n°014/24/06/2016/CM/UMOA'), ' du Conseil des Ministres de l\'UMOA."']),
          p([bold('Distinction normative ajoutée :'), ' Instructions BCEAO (comptable) vs Décision UMOA (supervision consolidée).']),

          heading2('IV.B  —  Correction CEMAC / Règlement LBC/FT (Section 4.3 + Bibliographie)'),
          heading3('Texte original (incorrect) :'),
          p(['"Lutte contre la corruption et le blanchiment de capitaux (LBC/FT) : conformité Directive UEMOA n°02/2015 / Règlement CEMAC n°01/03."']),
          heading3('Texte corrigé :'),
          p(['"Lutte contre la corruption et le blanchiment de capitaux (LBC/FT/FP) : conformité ', bold('Directive UEMOA n°02/2015/CM/UEMOA'), ' en zone UEMOA ; conformité ', bold('Règlement CEMAC n°01/16/CEMAC/UMAC/CM du 11 avril 2016'), ' relatif à la prévention et à la répression du blanchiment des capitaux, au financement du terrorisme et au financement de la prolifération des armes de destruction massive (LBC/FT/FP), ', bold('abrogeant et remplaçant le Règlement n°01/03 de 2003'), ', en zone CEMAC. Les obligations détaillées applicables à chaque institution dépendent des textes nationaux de transposition dans chaque État membre."']),
          p([bold('Distinction normative ajoutée :'), ' Référence au texte abrogé avec mention explicite de l\'abrogation. Intégration du FP (prolifération) introduit par le n°01/16. Renvoi aux textes nationaux de transposition.']),

          heading2('IV.C  —  Correction Séparation PCA/DG (Section 4.3)'),
          heading3('Texte original (ambigu) :'),
          p(['"Séparation effective des pouvoirs entre Président du CA et Directeur Général"']),
          heading3('Texte corrigé :'),
          p(['"', bold('Séparation des pouvoirs entre Président du CA et Directeur Général'), ' : l\'AUSCGIE révisé 2014 prévoit deux modes de gouvernance pour les SA (sociétés anonymes) — le mode avec PDG (cumul des fonctions) et le mode avec Président du CA distinct du DG. ', bold('Les deux modes sont légalement permis'), ' ; le choix relève des statuts ou d\'une décision du Conseil d\'Administration. La séparation des fonctions constitue une ', bold('recommandation des Principes OCDE de gouvernance d\'entreprise'), ' (non contraignante) et une ', bold('attente fréquente des investisseurs institutionnels'), ' lors des due diligence, mais elle n\'est pas une obligation légale universelle en zone OHADA."']),
          p([bold('Distinction normative ajoutée :'), ' Droit positif OHADA (deux modes légaux) vs recommandation OCDE (non contraignante) vs attente investisseurs (pratique de marché).']),

          heading2('IV.D  —  Correction Données Climatiques (Section 4.1)'),
          heading3('Texte original (flou) :'),
          p(['"Les pertes liées aux événements climatiques en Afrique subsaharienne représentent une part significative du PIB selon les estimations du Climate Change Knowledge Portal de la Banque Mondiale, avec une variabilité considérable selon les pays et les secteurs."']),
          heading3('Texte corrigé :'),
          p(['"', bold('Risque physique climatique'), ' : les pertes économiques liées aux événements climatiques varient considérablement selon les pays, les secteurs et les horizons temporels. Les estimations du Climate Change Knowledge Portal de la Banque Mondiale (indicatives, à consulter par pays et par scénario GIEC) suggèrent des impacts potentiels significatifs sous les scénarios de réchauffement élevé. ', bold('Toute donnée ESG doit être sourcée, datée et contextualisée'), ' ; une agrégation continentale sans méthodologie exposée n\'est pas vérifiable à ce stade."']),
          p([bold('Distinction normative ajoutée :'), ' Suppression de la généralisation non sourcée. Rappel de la règle méthodologique ESG.']),

          heading2('IV.E  —  Correction Politique de Rémunération ESG (Section 4.3)'),
          heading3('Texte original (non distingué) :'),
          p(['"Politique de rémunération des dirigeants alignée sur la performance à long terme et les critères ESG"']),
          heading3('Texte corrigé :'),
          p(['"', bold('Politique de rémunération des dirigeants'), ' : alignement sur la performance à long terme et, le cas échéant, sur les critères ESG. ', bold('Pratique recommandée par les standards internationaux'), ' (OCDE, Principes de gouvernance d\'entreprise 2015 ; PRI, Principles for Responsible Investment) et les ', bold('attentes des investisseurs institutionnels'), '. ', bold('Non obligatoire réglementaire'), ' en zone UEMOA/CEMAC à la date de publication."']),
          p([bold('Distinction normative ajoutée :'), ' Pratique de marché / recommandation vs absence d\'obligation légale ou prudentielle BCEAO/COBAC.']),

          heading2('IV.F  —  Correction Tableau Comparatif GRI (Section Tableau comparatif)'),
          heading3('Texte original (ambigu) :'),
          p(['"GRI Standards — Volontaire (exigé par bailleurs)"']),
          heading3('Texte corrigé :'),
          p(['"GRI Standards — ', bold('Standard volontaire'), ', ', bold('fréquemment exigé par les bailleurs de fonds'), ' (IFC, BOAD, BAD, AFD) dans leurs conventions de financement et cahiers des charges ESG."']),
          p([bold('Distinction normative ajoutée :'), ' Clarté entre nature du standard (volontaire) et exigence contractuelle (convention de financement).']),

          heading2('IV.G  —  Correction Matrice des Risques ESG (Section Matrice)'),
          heading3('Texte original (subjectif) :'),
          p(['Matrice avec probabilités "Élevée / Moyenne" et impacts "Élevé / Moyen" sans note méthodologique.']),
          heading3('Texte corrigé :'),
          p(['Ajouter sous la matrice un encadré méthodologique : ', bold('"NOTE MÉTHODOLOGIQUE — '), 'Les probabilités et impacts financiers évalués dans la présente matrice sont ', bold('indicatifs et subjectifs'), ', fondés sur une appréciation qualifiée du contexte sectoriel et géographique de l\'institution. Ils ne constituent pas des prévisions statistiques validées ni des seuils réglementaires. Chaque institution doit adapter cette matrice à son propre profil de risque, en s\'appuyant sur des données historiques, des scénarios NGFS et une analyse sectorielle documentée."']),

          heading2('IV.H  —  Correction Equator Principles (Section 1.8)'),
          heading3('Texte original (non vérifié) :'),
          p(['"140 institutions financières dans plus de 40 pays"']),
          heading3('Texte corrigé :'),
          p(['"', bold('Environ 140 institutions financières'), ' dans ', bold('plus de 35 pays'), ' (chiffre indicatif au ', bold('2e trimestre 2026'), ' ; ', bold('consulter equator-principles.com pour les données actualisées'), ')."']),

          // SECTION V — ÉVALUATION FINALE
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),
          heading1('SECTION V  —  ÉVALUATION FINALE ET NOTATION'),
          p(['L\'évaluation finale est structurée selon six critères fondamentaux pour la crédibilité institutionnelle d\'un contenu réglementaire ESG. Chaque critère est noté sur 20, pour un total sur 100.']),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Critère d\'évaluation', { bold: true, shade: '1B3A4B', width: 40 }), tableCell('Note avant correction', { bold: true, shade: '1B3A4B', width: 20 }), tableCell('Note après correction', { bold: true, shade: '1B3A4B', width: 20 }), tableCell('Commentaire', { bold: true, shade: '1B3A4B', width: 20 })] }),
              new TableRow({ children: [tableCell('1. Crédibilité réglementaire (exactitude des textes cités)', { width: 40 }), tableCell('9/20', { width: 20 }), tableCell('18/20', { width: 20 }), tableCell('Texte CEMAC abrogé, coquille BCEAO, confusion supervision/consolidée. Corrigé : très forte amélioration.', { width: 20 })] }),
              new TableRow({ children: [tableCell('2. Crédibilité investisseurs (clarté volontaire vs obligatoire)', { width: 40 }), tableCell('11/20', { width: 20 }), tableCell('17/20', { width: 20 }), tableCell('Distinctions normatives insuffisantes. Corrigées : séparation PCA/DG, rémunération ESG, GRI.', { width: 20 })] }),
              new TableRow({ children: [tableCell('3. Robustesse prudentielle (BCEAO/COBAC/BEAC/BCEAO)', { width: 40 }), tableCell('10/20', { width: 20 }), tableCell('17/20', { width: 20 }), tableCell('Confusion Instructions BCEAO. Corrigée + ajout Décision 014/2016 et Règlement COBAC R-2016/04.', { width: 20 })] }),
              new TableRow({ children: [tableCell('4. Qualité du sourcing (sources, dates, URLs)', { width: 40 }), tableCell('12/20', { width: 20 }), tableCell('18/20', { width: 20 }), tableCell('Données climatiques non sourcées, URL ohada.com incertaine, absence de dates de consultation.', { width: 20 })] }),
              new TableRow({ children: [tableCell('5. Risque juridique (exposition contentieuse / diffamation)', { width: 40 }), tableCell('14/20', { width: 20 }), tableCell('19/20', { width: 20 }), tableCell('Faible risque initial grâce aux clauses de non-responsabilité. Renforcé par suppression des généralisations non sourcées.', { width: 20 })] }),
              new TableRow({ children: [tableCell('6. Risque réputationnel (greenwashing, surpromesse)', { width: 40 }), tableCell('6/20', { width: 20 }), tableCell('19/20', { width: 20 }), tableCell('Risque le plus élevé : données climatiques non sourcées, matrice subjective sans méthodo, chiffres EP non vérifiés. Corrigés : quasi-nul.', { width: 20 })] }),
            ],
          }),

          new Paragraph({ spacing: { before: 300 } }),
          new Paragraph({
            children: [new TextRun({ text: 'SCORE GLOBAL AVANT CORRECTION :  ', bold: true, font: 'Calibri', size: 24, color: '1B3A4B' }), new TextRun({ text: '62/100', bold: true, font: 'Calibri', size: 28, color: 'D97706' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'SCORE GLOBAL APRÈS CORRECTION :  ', bold: true, font: 'Calibri', size: 24, color: '1B3A4B' }), new TextRun({ text: '91/100', bold: true, font: 'Calibri', size: 28, color: '059669' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          heading2('Synthèse des recommandations stratégiques'),
          p([bold('1. Correction immédiate (sous 48h) :'), ' Remplacer toutes les occurrences de "Règlement CEMAC n°01/03" par "n°01/16/CEMAC/UMAC/CM du 11 avril 2016". C\'est une erreur juridique matérielle qui expose le cabinet à un discrédit réglementaire.']),
          p([bold('2. Correction prioritaire (sous 7 jours) :'), ' Corriger la description des Instructions BCEAO n°026-029 (cadre comptable, pas supervision consolidée) et uniformiser la référence de la Directive UEMOA LBC/FT.']),
          p([bold('3. Enrichissement normatif (sous 14 jours) :'), ' Ajouter les références CSRD, SFDR, Règlement COBAC R-2016/04, R-2024/01, et Décision UMOA n°014/24/06/2016 dans la bibliographie.']),
          p([bold('4. Amélioration méthodologique (sous 30 jours) :'), ' Compléter la matrice des risques ESG avec une note méthodologique, sourcer ou contextualiser toutes les données climatiques, et ajouter des dates de consultation aux sources web.']),
          p([bold('5. Procédure de gouvernance éditoriale (sous 60 jours) :'), ' Instaurer une revue croisée réglementaire obligatoire avant publication de tout article citant des textes BCEAO, COBAC, BEAC, UEMOA, CEMAC ou OHADA. Recommandation : un binôme juridique + prudentiel valide chaque référence.']),

          // ANNEXE — GLOSSAIRE DE L'AUDIT
          new Paragraph({ children: [new TextRun({ text: '', break: 1 })], pageBreakBefore: true }),
          heading1('ANNEXE  —  GLOSSAIRE DE L\'AUDIT RÉGLEMENTAIRE'),
          p(['Les définitions suivantes sont utilisées dans le présent rapport selon les standards de l\'audit réglementaire et de la due diligence juridique.']),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({ children: [tableCell('Terme', { bold: true, shade: '1B3A4B', width: 30 }), tableCell('Définition opérationnelle', { bold: true, shade: '1B3A4B', width: 70 })] }),
              new TableRow({ children: [tableCell('Obligation légale', { bold: true, width: 30 }), tableCell('Exigence édictée par un texte de loi, un règlement ou une instruction réglementaire dont la violation expose à des sanctions administratives, disciplinaires ou pénales.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Recommandation', { bold: true, width: 30 }), tableCell('Conseil ou principe émis par une organisation internationale (OCDE, IFC, IIA) ou un régulateur, non contraignant mais fortement incitatif. Sa non-application n\'expose pas à des sanctions mais peut affecter la crédibilité institutionnelle.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Pratique de marché', { bold: true, width: 30 }), tableCell('Usage courant adopté par les acteurs d\'un secteur (investisseurs, bailleurs, auditeurs) sans caractère normatif formalisé. Peut devenir une attente implicite dans les conventions de financement.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Engagement volontaire', { bold: true, width: 30 }), tableCell('Adhésion non contrainte à un standard, une initiative ou un principe (PRI, SBTi, Equator Principles). L\'adhérent assume des obligations de reporting mais la non-adhésion n\'est pas sanctionnable.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Texte abrogé', { bold: true, width: 30 }), tableCell('Texte juridique dont la force normative a été explicitement supprimée par un texte postérieur. Citer un texte abrogé comme en vigueur constitue une erreur juridique matérielle.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Non-conformité critique', { bold: true, width: 30 }), tableCell('Erreur susceptible d\'entraîner une conséquence juridique, une sanction réglementaire ou un préjudice réputationnel majeur pour l\'institution émettrice du contenu.', { width: 70 })] }),
              new TableRow({ children: [tableCell('Greenwashing réglementaire', { bold: true, width: 30 }), tableCell('Présentation d\'un contenu ESG comme conforme à des obligations réglementaires ou basé sur des données vérifiables, alors qu\'il relève d\'engagements volontaires, de généralisations non sourcées ou d\'interprétations erronées.', { width: 70 })] }),
            ],
          }),

          new Paragraph({ spacing: { before: 600 } }),
          new Paragraph({
            children: [new TextRun({ text: 'FIN DU RAPPORT', bold: true, font: 'Calibri', size: 24, color: '1B3A4B' })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Document produit par Khepra Experts — Audit Réglementaire ESG', font: 'Calibri', size: 18, color: '666666' })],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Référence : KE-AUDIT-ESG-2026-001 — Classification : CONFIDENTIEL', font: 'Calibri', size: 18, color: '666666' })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  return Packer.toBlob(doc);
}