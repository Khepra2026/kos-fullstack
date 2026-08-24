import {
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Table,
  TableCell,
  TableRow,
  WidthType,
  ShadingType,
  convertInchesToTwip,
} from 'docx';

export const TEAL = '0F4C3A';
export const DARK = '0D1B2A';
export const SLATE = '334155';
export const RED = '991B1B';
export const AMBER = 'B45309';
export const INDIGO = '1E3A5F';
export const FOREST = '1A4731';
export const GOLD = '92400E';

export function coverH1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 52, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
  });
}

export function coverH2(text: string, color = DARK): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 30, font: 'Calibri', color })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  });
}

export function coverH3(text: string, color = SLATE): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, font: 'Calibri', color })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  });
}

export function coverBody(text: string, color = SLATE): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Calibri', color })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  });
}

export function partTitle(num: string, title: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `PARTIE ${num} — ${title}`, bold: true, size: 36, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { before: 480, after: 300 },
    pageBreakBefore: true,
  });
}

export function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, font: 'Calibri', color: TEAL })],
    spacing: { before: 480, after: 240 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_1,
  });
}

export function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, font: 'Calibri', color: DARK })],
    spacing: { before: 360, after: 180 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_2,
  });
}

export function h3(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, font: 'Calibri', color: SLATE })],
    spacing: { before: 280, after: 140 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_3,
  });
}

export function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Calibri', bold: opts?.bold, italic: opts?.italic, color: opts?.color })],
    spacing: { before: 100, after: 100 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

export function bullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '\u2022 ' + text, size: 20, font: 'Calibri' })],
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.2) },
  });
}

export function bulletBold(label: string, text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: '\u2022 ' + label + ' : ', size: 20, font: 'Calibri', bold: true }),
      new TextRun({ text, size: 20, font: 'Calibri' }),
    ],
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.2) },
  });
}

export function alertBox(text: string, level: 'critical' | 'warning' | 'info' = 'warning'): Paragraph {
  const color = level === 'critical' ? RED : level === 'warning' ? AMBER : TEAL;
  const label = level === 'critical' ? '\u26A0 CRITICAL ALERT — ' : level === 'warning' ? '\u26A0 WARNING — ' : '\u2139 NOTE — ';
  return new Paragraph({
    children: [
      new TextRun({ text: label, bold: true, size: 20, font: 'Calibri', color }),
      new TextRun({ text, size: 20, font: 'Calibri', color: DARK }),
    ],
    spacing: { before: 160, after: 160 },
    alignment: AlignmentType.JUSTIFIED,
    border: { left: { style: BorderStyle.SINGLE, size: 24, color, space: 10 } },
    indent: { left: convertInchesToTwip(0.25) },
    shading: {
      type: ShadingType.CLEAR,
      color: 'auto',
      fill: level === 'critical' ? 'FEF2F2' : level === 'warning' ? 'FFFBEB' : 'F0FDFA',
    },
  });
}

export function spacer(n = 1): Paragraph {
  return new Paragraph({ children: [], spacing: { before: n * 120, after: n * 120 } });
}

export function divider(color = TEAL): Paragraph {
  return new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color, space: 6 } },
    spacing: { before: 200, after: 200 },
  });
}

export function numberedItem(num: number, text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 20, font: 'Calibri', color: TEAL }),
      new TextRun({ text, size: 20, font: 'Calibri' }),
    ],
    spacing: { before: 80, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

export function buildTable(
  headers: string[],
  rows: string[][],
  opts?: { colWidths?: number[]; headerBg?: string; headerColor?: string; boldFirstCol?: boolean }
): Table {
  const colCount = headers.length;
  const colWidths = opts?.colWidths ?? Array(colCount).fill(Math.floor(100 / colCount));
  const headerBg = opts?.headerBg ?? TEAL;
  const headerColor = opts?.headerColor ?? 'FFFFFF';

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: headers.map((h) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: h, bold: true, size: 18, font: 'Calibri', color: headerColor })],
                alignment: AlignmentType.CENTER,
              }),
            ],
            shading: { type: ShadingType.CLEAR, color: 'auto', fill: headerBg },
            verticalAlign: 'center',
          })
        ),
      }),
      ...rows.map((row) =>
        new TableRow({
          children: row.map((cell, idx) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 17, font: 'Calibri', bold: opts?.boldFirstCol && idx === 0 })],
                  alignment: AlignmentType.LEFT,
                }),
              ],
              verticalAlign: 'center',
            })
          ),
        })
      ),
    ],
    columnWidths: colWidths.map((w) => convertInchesToTwip(w / 100 * 6.5)),
  });
}

export function transitionPage(from: string, to: string, note: string): Paragraph[] {
  return [
    new Paragraph({ children: [], pageBreakBefore: true }),
    new Paragraph({
      children: [new TextRun({ text: '\u2500\u2500\u2500 FIN DE LA ' + from + ' \u2500\u2500\u2500', size: 18, font: 'Calibri', color: '9CA3AF', italic: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: note, size: 18, font: 'Calibri', color: SLATE, italic: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
      border: {
        top: { style: BorderStyle.DASHED, size: 4, color: 'D1D5DB', space: 8 },
        bottom: { style: BorderStyle.DASHED, size: 4, color: 'D1D5DB', space: 8 },
      },
    }),
    new Paragraph({ children: [], pageBreakBefore: true }),
  ];
}



