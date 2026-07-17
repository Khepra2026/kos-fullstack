import {
  Document,
  Header,
  Footer,
  PageNumber,
  Packer,
  convertInchesToTwip,
  AlignmentType,
  Paragraph,
  TextRun,
} from 'docx';

import { coverParagraphs } from './hardeningOptasia/cover';
import { section1Paragraphs } from './hardeningOptasia/section1';
import { section2Paragraphs } from './hardeningOptasia/section2';
import { section3Paragraphs } from './hardeningOptasia/section3';
import { section4Paragraphs } from './hardeningOptasia/section4';
import { section5Paragraphs } from './hardeningOptasia/section5';

export async function generateHardeningOptasia(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS SARL U',
    title: 'Mémorandum de Hardening Réglementaire et Prudentiel — KHEPRA × OPTASIA',
    description: 'Sécurisation Absolue contre les Risques d\'Avis Défavorable ou de Non-Conformité — Dossier d\'Agrément EMF/SFD 2ème Catégorie — Zones UEMOA et CEMAC',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 16, font: 'Calibri' }),
                  new TextRun({ text: '  |  ', size: 16, font: 'Calibri' }),
                  new TextRun({ text: 'Mémorandum Hardening — OPTASIA SOLUTIONS FZCO', size: 16, font: 'Calibri' }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ — À L\'ATTENTION EXCLUSIVE DU CEO', bold: true, size: 14, font: 'Calibri' }),
                  new TextRun({ text: '  |  Page ', size: 14, font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 14, font: 'Calibri' }),
                  new TextRun({ text: ' / ', size: 14, font: 'Calibri' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, font: 'Calibri' }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: [
          ...coverParagraphs,
          ...section1Paragraphs,
          ...section2Paragraphs,
          ...section3Paragraphs,
          ...section4Paragraphs,
          ...section5Paragraphs,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}