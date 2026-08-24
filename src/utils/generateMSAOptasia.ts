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
import { title1Paragraphs } from '';
import { title2Paragraphs } from '';
import { title3Paragraphs } from '';
import { title4Paragraphs } from '';
import { title5Paragraphs } from '';
import { title6Paragraphs } from '';
import { title7Paragraphs } from '';
import { title8Paragraphs } from '';
import { title9Paragraphs } from '';
import { title10Paragraphs } from '';
import { annexAParagraphs } from '';
import { annexBParagraphs } from '';
import { annexCParagraphs } from '';

export async function generateMSAOptasia(): Promise<Blob> {
  const doc = new Document({
    creator: 'KHEPRA EXPERTS SARL U',
    title: 'Contrat de Prestation de Services et de Conseil Reglementaire — MSA KHEPRA × OPTASIA',
    description: 'Master Services Agreement entre KHEPRA EXPERTS et OPTASIA SOLUTIONS FZCO pour accompagnement agrément EMF/SFD 7 pays UEMOA/CEMAC',
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
                  new TextRun({ text: 'Contrat MSA — OPTASIA SOLUTIONS FZCO', size: 16, font: 'Calibri' }),
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
          ...title1Paragraphs,
          ...title2Paragraphs,
          ...title3Paragraphs,
          ...title4Paragraphs,
          ...title5Paragraphs,
          ...title6Paragraphs,
          ...title7Paragraphs,
          ...title8Paragraphs,
          ...title9Paragraphs,
          ...title10Paragraphs,
          ...annexAParagraphs,
          ...annexBParagraphs,
          ...annexCParagraphs,
        ],
      },
    ],
  });

  return await Packer.toBlob(doc);
}



