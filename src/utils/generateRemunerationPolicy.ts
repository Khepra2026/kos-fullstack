import {
  Document, Packer, Paragraph, Table, Header, Footer, TextRun, PageNumber,
  AlignmentType, BorderStyle, convertInchesToTwip,
} from 'docx';
import { coverPage, tableOfContents, NAVY_MID, STEEL, GRAY } from './remunerationPolicy/cover';
import { section1, section2 } from './remunerationPolicy/section1';
import { section3, section4 } from './remunerationPolicy/section2';
import { section5, section6 } from './remunerationPolicy/section3';
import { section7, section8 } from './remunerationPolicy/section4';
import { section9, section10 } from './remunerationPolicy/section5';

// ═══════════════════════════════════════════════════════════════════════════════
// POLITIQUE DE RÉMUNÉRATION DES DIRIGEANTS IMF — VERSION 1.0
// UEMOA & CEMAC — Niveau Big Four (PwC, Khepra Experts, EY, KPMG)
// Conformité BCEAO / COBAC / OHADA / OIT / IFC / BAD
// ═══════════════════════════════════════════════════════════════════════════════

export async function generateRemunerationPolicy(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    // ─── PAGE DE GARDE + SOMMAIRE ───────────────────────────────────────────
    ...coverPage(),
    ...tableOfContents(),

    // ─── SECTION 1 : EXECUTIVE SUMMARY ────────────────────────────────────
    ...section1(),

    // ─── SECTION 2 : CADRE RÉGLEMENTAIRE ────────────────────────────────────
    ...section2(),

    // ─── SECTION 3 : PRINCIPES ─────────────────────────────────────────────
    ...section3(),

    // ─── SECTION 4 : ARCHITECTURE ────────────────────────────────────────────
    ...section4(),

    // ─── SECTION 5 : GRILLE CHIFFRÉE ────────────────────────────────────────
    ...section5(),

    // ─── SECTION 6 : SIMULATION BONUS ──────────────────────────────────────
    ...section6(),

    // ─── SECTION 7 : BENCHMARK UEMOA vs CEMAC ───────────────────────────────
    ...section7(),

    // ─── SECTION 8 : ALIGNEMENT IFC / BAD ───────────────────────────────────
    ...section8(),

    // ─── SECTION 9 : GOUVERNANCE ────────────────────────────────────────────
    ...section9(),

    // ─── SECTION 10 : DISPOSITIFS DE CONTRÔLE ──────────────────────────────
    ...section10(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Politique de R\u00E9mun\u00E9ration des Dirigeants — IMF UEMOA & CEMAC — V1.0',
    description: 'Politique normative et chiffr\u00E9e de r\u00E9mun\u00E9ration des Administrateurs, DG et DGA pour institutions de microfinance UEMOA/CEMAC. Conformit\u00E9 BCEAO, COBAC, OHADA, OIT, IFC, BAD. Niveau Big Four.',
    subject: 'R\u00E9mun\u00E9ration, gouvernance, microfinance, BCEAO, COBAC, UEMOA, CEMAC, dirigeants',
    keywords: 'r\u00E9mun\u00E9ration, IMF, microfinance, UEMOA, CEMAC, BCEAO, COBAC, OHADA, OIT, IFC, BAD, DG, DGA, administrateurs, bonus, clawback, gouvernance, Big Four',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.0),
              bottom: convertInchesToTwip(1.0),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPRA EXPERTS  |  Politique de R\u00E9mun\u00E9ration IMF UEMOA/CEMAC  |  R\u00E9f. KE-REM-IMF-2026-001-V1.0  |  CONFIDENTIEL',
                    size: 15,
                    color: GRAY,
                    font: 'Calibri',
                  }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: NAVY_MID } },
                spacing: { after: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPRA EXPERTS \u2014 khepraexperts.com  |  Standards BCEAO \u00B7 COBAC \u00B7 OHADA \u00B7 OIT \u00B7 IFC \u00B7 BAD \u00B7 Big Four  |  Page ',
                    size: 15,
                    color: GRAY,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 15,
                    color: STEEL,
                    font: 'Calibri',
                    bold: true,
                  }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 2, color: NAVY_MID } },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allContent,
      },
    ],
  });

  return Packer.toBlob(doc);
}