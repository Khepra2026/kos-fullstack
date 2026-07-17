import { Document, Header, Footer, PageNumber, Packer, convertInchesToTwip, AlignmentType, Paragraph, TextRun } from 'docx';

import { coverParagraphs } from './livrable1Synthese/cover';
import { dashboardParagraphs } from './livrable1Synthese/dashboard';
import { section1Paragraphs } from './livrable1Synthese/section1';
import { section2Paragraphs } from './livrable1Synthese/section2';
import { section3Paragraphs } from './livrable1Synthese/section3';
import { section4Paragraphs } from './livrable1Synthese/section4';
import { section5Paragraphs } from './livrable1Synthese/section5';
import { annexParagraphs } from './livrable1Synthese/annex';

const TEAL = '1A5F6E';

export async function generateLivrable1SyntheseOptasia(): Promise<Blob> {
  const allParagraphs: Paragraph[] = [
    ...coverParagraphs,
    ...dashboardParagraphs,
    ...section1Paragraphs,
    ...section2Paragraphs,
    ...section3Paragraphs,
    ...section4Paragraphs,
    ...section5Paragraphs,
    ...annexParagraphs,
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS SARL U',
    title: 'Livrable 1 — Édition Synthétique — Tableau de Bord CEO — KHEPRA × OPTASIA — KE-OPT-L1SYN-2026-001-V1.0',
    description: 'Document ultra-exécutif ≤50 pages : Cartographie réglementaire condensée, Hardening, Gouvernance, Produits & Services, Modèle économique, Veille réglementaire — Zones UEMOA & CEMAC — 7 pays',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.25),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS × OPTASIA', bold: true, size: 14, font: 'Calibri', color: TEAL }),
                  new TextRun({ text: '  |  ', size: 14, font: 'Calibri', color: '9CA3AF' }),
                  new TextRun({ text: 'Livrable 1 Synthétique — Tableau de Bord CEO', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ text: '  |  Réf. KE-OPT-L1SYN-2026-001-V1.0', size: 14, font: 'Calibri', color: '9CA3AF' }),
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
                  new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ — CEO ONLY', bold: true, size: 14, font: 'Calibri', color: '991B1B' }),
                  new TextRun({ text: '  |  Page ', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ text: ' / ', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, font: 'Calibri', color: '6B7280' }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allParagraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}