import {
  Paragraph,
  TextRun,
  AlignmentType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
} from 'docx';
import { KHEPRA_TEAL, KHEPRA_DARK, KHEPRA_RED, spacer } from '';

export const coverParagraphs: Paragraph[] = [
  spacer(6),
  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 28, font: 'Calibri', color: KHEPRA_TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Cabinet de Conseil en Stratégie, Gouvernance et Conformité', size: 20, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: KHEPRA_TEAL, space: 12 },
    },
    spacing: { before: 200, after: 400 },
  }),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: 'DOCUMENT-CADRE D\'ARCHITECTURE DE GOUVERNANCE', bold: true, size: 36, font: 'Calibri', color: KHEPRA_TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Déploiement d\'OPTASIA GROUP en Afrique Subsaharienne', bold: true, size: 24, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Structure à Trois Niveaux : Tech Globale (Dubaï) / Holding Régionale (Cameroun) / Filiales Locales Opérationnelles', bold: true, size: 22, font: 'Calibri', color: KHEPRA_TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Zones UEMOA et CEMAC — 7 Pays Jurisdictions', size: 20, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: KHEPRA_TEAL, space: 12 },
    },
    spacing: { before: 200, after: 400 },
  }),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: 'Client exclusif :', bold: true, size: 20, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'OPTASIA SOLUTIONS FZCO', bold: true, size: 24, font: 'Calibri', color: KHEPRA_TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Groupe OPTASIA — Programme Panafricain Inclusion Financière', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: 'Niveau de rédaction : Partner — Associé Big Four', bold: true, size: 18, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Spécialité : Corporate Governance & Financial Institutions Regulation', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Classification : CONFIDENTIEL — STRICTEMENT PRIVÉ — À L\'ATTENTION EXCLUSIVE DU CEO', bold: true, size: 18, font: 'Calibri', color: KHEPRA_RED })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' },
  }),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: 'Référence : KE-OPT-GOV-2026-001-V1.0', bold: true, size: 18, font: 'Calibri', color: KHEPRA_TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Date d\'émission : 2 juin 2026', size: 18, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Date de péremption : 2 décembre 2026 (révision obligatoire)', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  spacer(2),
  new Paragraph({
    children: [new TextRun({ text: 'AVERTISSEMENT JURIDIQUE', bold: true, size: 18, font: 'Calibri', color: KHEPRA_RED })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Le présent document-cadre constitue une analyse de conformité structurale et de gouvernance d\'entreprise. Il ne comporte aucune évaluation financière, commerciale ou de rentabilité. Toute mention de dotation, de capitalisation ou de ressources s\'entend strictement au sens de l\'adéquation réglementaire, de la conformité prudentielle et de la traçabilité des structures de contrôle, sous réserve des obligations imposées par les normes GAFI, les instructions BCEAO, les règlements COBAC et les dispositions de l\'AUSCGIE OHADA.', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 200 },
    border: {
      left: { style: BorderStyle.SINGLE, size: 18, color: KHEPRA_RED, space: 10 },
    },
    indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' },
  }),
  new Paragraph({
    children: [],
    pageBreakBefore: true,
  }),
];



