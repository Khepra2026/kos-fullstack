import {
  Paragraph,
  TextRun,
  AlignmentType,
} from 'docx';

export const coverParagraphs: Paragraph[] = [
  new Paragraph({ spacing: { before: 600 } }),
  new Paragraph({
    children: [
      new TextRun({
        text: "KHEPRA EXPERTS SARL U",
        bold: true,
        size: 32,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Cabinet d'Expertise en Conseil Stratégique, Audit & Gouvernance",
        size: 20,
        font: 'Calibri',
        color: '555555',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        size: 20,
        font: 'Calibri',
        color: 'C5A059',
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'CONTRAT DE PRESTATION DE SERVICES',
        bold: true,
        size: 28,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'ET DE CONSEIL RÉGLEMENTAIRE',
        bold: true,
        size: 28,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({ text: '« ', size: 24, font: 'Calibri', color: 'C5A059' }),
      new TextRun({
        text: 'Master Services Agreement',
        bold: true,
        size: 24,
        font: 'Calibri',
        color: 'C5A059',
        italics: true,
      }),
      new TextRun({ text: ' »', size: 24, font: 'Calibri', color: 'C5A059' }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        size: 20,
        font: 'Calibri',
        color: 'C5A059',
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'Référence : KE-MSA-OPT-2026-001',
        bold: true,
        size: 20,
        font: 'Calibri',
        color: '333333',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 300, after: 600 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'ENTRE :',
        bold: true,
        size: 20,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.LEFT,
    spacing: { before: 400, after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "KHEPRA EXPERTS SARL U",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", société à responsabilité limitée unipersonnelle, immatriculée au Registre du Commerce et du Crédit Mobilier du Togo sous le numéro ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: 'TG-LFW-01-2026-813-01347',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", dont le numéro d'identification fiscale est ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: '1002124216',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", dont le siège social est situé à ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Logogomé, Rue Carrefour Aised, Lomé, Togo",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", représentée par son Associé Directeur, ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: 'Monsieur Essoyomèwè SIMDA',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", ci-après dénommée le ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "« Prestataire »",
        bold: true,
        size: 20,
        font: 'Calibri',
        italics: true,
      }),
      new TextRun({ text: ',', size: 20, font: 'Calibri' }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'ET :',
        bold: true,
        size: 20,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.LEFT,
    spacing: { before: 200, after: 200 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'OPTASIA SOLUTIONS FZCO',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ', Free Zone Company, membre du ',
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: 'Groupe OPTASIA',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", dont le siège social est situé à ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "Unit 806B, Jumeirah Business Center 4, JLT, Dubaï, Émirats Arabes Unis",
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", représentée par son Directeur, ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: 'Monsieur James Mark Rutherfoord',
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: ", ci-après dénommée le ",
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "« Client »",
        bold: true,
        size: 20,
        font: 'Calibri',
        italics: true,
      }),
      new TextRun({ text: ',', size: 20, font: 'Calibri' }),
    ],
    spacing: { after: 300 },
    alignment: AlignmentType.BOTH,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'Les parties ont été préalablement désignées ensemble la ',
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "« Partie »",
        bold: true,
        size: 20,
        font: 'Calibri',
        italics: true,
      }),
      new TextRun({
        text: ' ou la ',
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "« Partie »",
        bold: true,
        size: 20,
        font: 'Calibri',
        italics: true,
      }),
      new TextRun({
        text: ', et ensemble les ',
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text: "« Parties »",
        bold: true,
        size: 20,
        font: 'Calibri',
        italics: true,
      }),
      new TextRun({ text: '.', size: 20, font: 'Calibri' }),
    ],
    spacing: { after: 600 },
    alignment: AlignmentType.BOTH,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'IL A ÉTÉ CONVENU CE QUI SUIT :',
        bold: true,
        size: 22,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 600 },
  }),
];