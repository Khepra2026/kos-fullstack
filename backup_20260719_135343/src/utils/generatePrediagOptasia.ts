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

import { coverParagraphs } from '';
import { execSummaryParagraphs } from '';
import { methodologyParagraphs } from '';
import { uemoaMapParagraphs } from '';
import { cemacMapParagraphs } from '';
import { gapsParagraphs } from '';
import { riskMatrixParagraphs } from '';
import { recommendationsParagraphs } from '';
import { roadmapParagraphs } from '';
import { annexesParagraphs } from '';

export async function generatePrediagOptasia(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS SARL U',
    title: 'Livrable 1 — Pré-diagnostic et Cartographie Réglementaire — KHEPRA × OPTASIA',
    description: 'Pré-diagnostic et cartographie réglementaire des agréments EMF/SFD 2ème catégorie dans 7 pays UEMOA/CEMAC pour OPTASIA SOLUTIONS FZCO',
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
                  new TextRun({ text: 'Livrable 1 — Pré-diagnostic Réglementaire — OPTASIA', size: 16, font: 'Calibri' }),
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
                  new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ', bold: true, size: 14, font: 'Calibri' }),
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
          ...execSummaryParagraphs,
          ...methodologyParagraphs,
          ...uemoaMapParagraphs,
          ...cemacMapParagraphs,
          ...gapsParagraphs,
          ...riskMatrixParagraphs,
          ...recommendationsParagraphs,
          ...roadmapParagraphs,
          ...annexesParagraphs,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}



