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
    children: [new TextRun({ text: 'MÉMORANDUM DE HARDENING RÉGLEMENTAIRE ET PRUDENTIEL', bold: true, size: 36, font: 'Calibri', color: KHEPRA_RED })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Sécurisation Absolue contre les Risques d\'Avis Défavorable ou de Non-Conformité', bold: true, size: 24, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Dossier d\'Agrément EMF / SFD — 2ème Catégorie', bold: true, size: 22, font: 'Calibri', color: KHEPRA_TEAL })],
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
    children: [new TextRun({ text: 'Niveau de rédaction : Expert Associé — Big Four', bold: true, size: 18, font: 'Calibri', color: KHEPRA_DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Spécialité : Financial Services Regulatory, Banking Compliance & Risk Management', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
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
    children: [new TextRun({ text: 'Référence : KE-OPT-HARD-2026-001-V1.0', bold: true, size: 18, font: 'Calibri', color: KHEPRA_TEAL })],
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
    children: [new TextRun({ text: 'Le présent mémorandum constitue une analyse de conformité pure et ne vise aucunement à évaluer la viabilité commerciale, la rentabilité ou les performances économiques du projet. Toute mention de dotation, de capitalisation ou de ressources s\'entend strictement au sens de l\'adéquation réglementaire et prudentielle, sans préjuger de la structure financière ou de l\'origine des fonds, sous réserve des obligations de traçabilité imposées par les normes GAFI et les dispositions locales en matière de lutte contre le blanchiment et le financement du terrorisme.', size: 18, font: 'Calibri', color: KHEPRA_DARK, italic: true })],
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



