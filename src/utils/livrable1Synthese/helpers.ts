import {
  Paragraph, TextRun, AlignmentType, BorderStyle, Table, TableCell, TableRow, WidthType, ShadingType, convertInchesToTwip,
} from 'docx';

export const TEAL = '1A5F6E';
export const DARK = '0D1B2A';
export const RED = '991B1B';
export const AMBER = 'B45309';
export const SLATE = '6B7280';
export const GOLD = 'B45309';

export const spacer = (lines = 1) => new Paragraph({ children: [], spacing: { after: lines * 200 } });
export const divider = () => new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 8 } }, spacing: { after: 240 } });
export const h1 = (text: string) => new Paragraph({ children: [new TextRun({ text, bold: true, size: 28, font: 'Calibri', color: TEAL })], spacing: { before: 400, after: 160 } });
export const h2 = (text: string) => new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, font: 'Calibri', color: DARK })], spacing: { before: 300, after: 120 } });
export const h3 = (text: string) => new Paragraph({ children: [new TextRun({ text, bold: true, size: 22, font: 'Calibri', color: SLATE })], spacing: { before: 200, after: 100 } });
export const body = (text: string) => new Paragraph({ children: [new TextRun({ text, size: 20, font: 'Calibri', color: DARK })], spacing: { after: 120 }, alignment: AlignmentType.JUSTIFIED });
export const bullet = (text: string) => new Paragraph({ children: [new TextRun({ text: '• ' + text, size: 20, font: 'Calibri', color: DARK })], spacing: { after: 80 }, indent: { left: 360 } });
export const bulletBold = (label: string, text: string) => new Paragraph({ children: [new TextRun({ text: '• ' + label + ' : ', bold: true, size: 20, font: 'Calibri', color: DARK }), new TextRun({ text, size: 20, font: 'Calibri', color: DARK })], spacing: { after: 80 }, indent: { left: 360 } });
export const numberedItem = (n: number, text: string) => new Paragraph({ children: [new TextRun({ text: `${n}. ` + text, size: 20, font: 'Calibri', color: DARK })], spacing: { after: 80 }, indent: { left: 360 } });
export const alertBox = (text: string, type: 'critical' | 'warning' | 'info' = 'info') => {
  const colors = { critical: { border: RED, fill: 'FEF2F2', text: RED }, warning: { border: AMBER, fill: 'FFFBEB', text: AMBER }, info: { border: TEAL, fill: 'F0FDFA', text: TEAL } };
  const c = colors[type];
  return new Paragraph({
    children: [new TextRun({ text, size: 19, font: 'Calibri', color: c.text, bold: true })],
    spacing: { before: 160, after: 160 },
    border: { left: { style: BorderStyle.SINGLE, size: 24, color: c.border, space: 8 } },
    indent: { left: 200, right: 200 },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: c.fill },
  });
};
export const partTitle = (partNum: string, partTitle: string) => [
  new Paragraph({ children: [], pageBreakBefore: true }),
  new Paragraph({ children: [new TextRun({ text: `PARTIE ${partNum}`, bold: true, size: 40, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { before: 800, after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: partTitle, bold: true, size: 28, font: 'Calibri', color: DARK })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
  new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 8 } }, spacing: { before: 200, after: 600 } }),
  new Paragraph({ children: [], pageBreakBefore: true }),
];

export const buildTable = (headers: string[], rows: string[][], opts: { colWidths?: number[]; headerBg?: string; headerColor?: string } = {}) => {
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, font: 'Calibri', color: opts.headerColor || 'FFFFFF' })], alignment: AlignmentType.CENTER })],
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: opts.headerBg || TEAL },
      width: { type: WidthType.PERCENTAGE, size: opts.colWidths ? opts.colWidths[i] : 100 / headers.length },
    })),
  });
  const dataRows = rows.map((row) => new TableRow({
    children: row.map((cell, i) => new TableCell({
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK })], alignment: AlignmentType.LEFT })],
      width: { type: WidthType.PERCENTAGE, size: opts.colWidths ? opts.colWidths[i] : 100 / headers.length },
    })),
  }));
  return new Table({
    rows: [headerRow, ...dataRows],
    width: { type: WidthType.PERCENTAGE, size: 100 },
  });
};