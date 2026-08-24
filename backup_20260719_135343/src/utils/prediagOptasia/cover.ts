import {
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  convertInchesToTwip,
  Shading,
  BorderStyle,
} from 'docx';
import { createParagraph, createHeading, createTableCell, tealShading, lightTealShading, defaultBorders, REFERENCE, DATE } from '';

export const coverParagraphs: Paragraph[] = [
  new Paragraph({ text: '', spacing: { after: 0 } }),
  new Paragraph({ text: '', spacing: { after: 0 } }),
  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 48, font: 'Calibri', color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Conseil en Stratégie · Gouvernance · Finance · Réglementation', size: 22, font: 'Calibri', color: '666666' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '─', size: 20, color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'LIVRABLE 1', bold: true, size: 28, font: 'Calibri', color: 'B8860B' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'PRÉ-DIAGNOSTIC ET CARTOGRAPHIE RÉGLEMENTAIRE', bold: true, size: 36, font: 'Calibri', color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Agréments d\'Établissements de Microfinance (EMF) / Systèmes Financiers Décentralisés (SFD) de 2ème Catégorie', bold: true, size: 24, font: 'Calibri', color: '333333' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Zones UEMOA & CEMAC — 7 Pays', bold: true, size: 26, font: 'Calibri', color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '─', size: 20, color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'CLIENT', bold: true, size: 20, font: 'Calibri', color: '666666' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'OPTASIA SOLUTIONS FZCO', bold: true, size: 28, font: 'Calibri', color: '333333' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Unit 806B, Jumeirah Business Center 4, JLT, Dubaï — Émirats Arabes Unis', size: 20, font: 'Calibri', color: '666666' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Groupe OPTASIA — Infrastructure Scalable Inclusion Financière Panafricaine', size: 20, font: 'Calibri', color: '666666', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '─', size: 20, color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Référence : ', bold: true, size: 20, font: 'Calibri', color: '333333' }),
      new TextRun({ text: REFERENCE, size: 20, font: 'Calibri', color: '333333' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Date : ', bold: true, size: 20, font: 'Calibri', color: '333333' }),
      new TextRun({ text: DATE, size: 20, font: 'Calibri', color: '333333' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Classification : ', bold: true, size: 20, font: 'Calibri', color: '333333' }),
      new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ', size: 20, font: 'Calibri', color: 'CC0000', bold: true }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: '─', size: 20, color: '0F4C3A' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Document rédigé par', size: 18, font: 'Calibri', color: '666666', italics: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 22, font: 'Calibri', color: '333333' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Logogomé, Rue Carrefour Aised, Lomé, Togo', size: 18, font: 'Calibri', color: '666666' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'RCCM : ', bold: true, size: 18, font: 'Calibri', color: '666666' }),
      new TextRun({ text: 'TG-LFW-01-2026-813-01347', size: 18, font: 'Calibri', color: '666666' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'NIF : ', bold: true, size: 18, font: 'Calibri', color: '666666' }),
      new TextRun({ text: '1002124216', size: 18, font: 'Calibri', color: '666666' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Directeur de Mission : ', bold: true, size: 18, font: 'Calibri', color: '666666' }),
      new TextRun({ text: 'M. Essoyomèwè SIMDA, Associé Directeur', size: 18, font: 'Calibri', color: '666666' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 600 },
  }),
  new Paragraph({ text: '', pageBreakBefore: true }),
];



