import { Paragraph, TextRun, AlignmentType, Table, TableRow } from 'docx';
import { heading1, heading2, cell, multiCell } from './helpers';

export const title10Paragraphs: Paragraph[] = [
  heading1("TITRE X — SIGNATURES"),
  new Paragraph({
    children: [
      new TextRun({
        text: "Fait à Lomé, Togo, et à Dubaï, Émirats Arabes Unis, en deux (02) exemplaires originaux, chacun des Parties déclarant avoir reçu le sien.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 200 },
    alignment: AlignmentType.BOTH,
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Le présent contrat est signé électroniquement, conformément à la loi uniforme OHADA sur le droit du commerce électronique, et engage les Parties à compter de la date de la dernière signature.",
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: 400 },
    alignment: AlignmentType.BOTH,
  }),
  new Table({
    width: { size: 100, type: 2 },
    rows: [
      new TableRow({
        children: [
          cell('Pour le Prestataire', { bold: true, width: 50, fontSize: 20 }),
          cell('Pour le Client', { bold: true, width: 50, fontSize: 20 }),
        ],
      }),
      new TableRow({
        children: [
          multiCell([
            'KHEPRA EXPERTS SARL U',
            '',
            'Représentée par :',
            'Monsieur Essoyomèwè SIMDA',
            'Associé Directeur',
            '',
            '',
            'Signature : _________________________',
            '',
            'Date : _________________________',
          ], { width: 50, fontSize: 20 }),
          multiCell([
            'OPTASIA SOLUTIONS FZCO',
            '',
            'Représentée par :',
            'Monsieur James Mark Rutherfoord',
            'Directeur',
            '',
            '',
            'Signature : _________________________',
            '',
            'Date : _________________________',
          ], { width: 50, fontSize: 20 }),
        ],
      }),
    ],
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'Référence du contrat : KE-MSA-OPT-2026-001',
        bold: true,
        size: 18,
        font: 'Calibri',
        color: '555555',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 100 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ',
        bold: true,
        size: 18,
        font: 'Calibri',
        color: '555555',
      }),
    ],
    alignment: AlignmentType.CENTER,
  }),
];