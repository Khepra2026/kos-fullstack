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

export const KHEPRA_TEAL = '1F6F6B';
export const KHEPRA_DARK = '0D1B2A';
export const KHEPRA_SLATE = '334155';
export const KHEPRA_LIGHT = 'F0F4F8';
export const KHEPRA_RED = '991B1B';
export const KHEPRA_AMBER = 'B45309';

export function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, font: 'Calibri', color: KHEPRA_TEAL })],
    spacing: { before: 480, after: 240 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_1,
  });
}

export function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, font: 'Calibri', color: KHEPRA_DARK })],
    spacing: { before: 360, after: 180 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_2,
  });
}

export function h3(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, font: 'Calibri', color: KHEPRA_SLATE })],
    spacing: { before: 280, after: 140 },
    alignment: AlignmentType.LEFT,
    heading: HeadingLevel.HEADING_3,
  });
}

export function h4(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 20, font: 'Calibri', color: KHEPRA_DARK })],
    spacing: { before: 200, after: 120 },
    alignment: AlignmentType.LEFT,
  });
}

export function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; spacing?: { before?: number; after?: number } }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: 'Calibri', bold: opts?.bold, italic: opts?.italic, color: opts?.color })],
    spacing: { before: opts?.spacing?.before ?? 120, after: opts?.spacing?.after ?? 120 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

export function bullet(text: string, indent?: number): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '\u2022 ' + text, size: 20, font: 'Calibri' })],
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: indent ? convertInchesToTwip(indent) : convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.2) },
  });
}

export function bulletBold(label: string, text: string, indent?: number): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: '\u2022 ' + label + ' : ', size: 20, font: 'Calibri', bold: true }),
      new TextRun({ text, size: 20, font: 'Calibri' }),
    ],
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: indent ? convertInchesToTwip(indent) : convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.2) },
  });
}

export function alertBox(text: string, level: 'critical' | 'warning' | 'info' = 'warning'): Paragraph {
  const color = level === 'critical' ? KHEPRA_RED : level === 'warning' ? KHEPRA_AMBER : KHEPRA_TEAL;
  const label = level === 'critical' ? 'CRITICAL ALERT — ' : level === 'warning' ? 'WARNING — ' : 'NOTE — ';
  return new Paragraph({
    children: [
      new TextRun({ text: label, bold: true, size: 20, font: 'Calibri', color }),
      new TextRun({ text, size: 20, font: 'Calibri', color: KHEPRA_DARK }),
    ],
    spacing: { before: 160, after: 160 },
    alignment: AlignmentType.JUSTIFIED,
    border: {
      left: { style: BorderStyle.SINGLE, size: 24, color, space: 10 },
    },
    indent: { left: convertInchesToTwip(0.25) },
    shading: {
      type: ShadingType.CLEAR,
      color: 'auto',
      fill: level === 'critical' ? 'FEF2F2' : level === 'warning' ? 'FFFBEB' : 'F0FDFA',
    },
  });
}

export function spacer(lines: number = 1): Paragraph {
  return new Paragraph({
    children: [],
    spacing: { before: lines * 120, after: lines * 120 },
  });
}

export function pageBreak(): Paragraph {
  return new Paragraph({
    children: [],
    pageBreakBefore: true,
  });
}

export function divider(): Paragraph {
  return new Paragraph({
    children: [],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: KHEPRA_TEAL, space: 6 },
    },
    spacing: { before: 200, after: 200 },
  });
}

export function buildTable(
  headers: string[],
  rows: string[][],
  opts?: { colWidths?: number[]; headerBg?: string; headerColor?: string; boldFirstCol?: boolean }
): Table {
  const colCount = headers.length;
  const colWidths = opts?.colWidths ?? Array(colCount).fill(Math.floor(100 / colCount));
  const headerBg = opts?.headerBg ?? KHEPRA_TEAL;
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
                  children: [new TextRun({ text: cell, size: 18, font: 'Calibri', bold: opts?.boldFirstCol && idx === 0 })],
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

export function subBullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '\u25E6 ' + text, size: 20, font: 'Calibri', italic: true })],
    spacing: { before: 40, after: 40 },
    alignment: AlignmentType.JUSTIFIED,
    indent: { left: convertInchesToTwip(0.6), hanging: convertInchesToTwip(0.2) },
  });
}

export function numberedItem(num: number, text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 20, font: 'Calibri', color: KHEPRA_TEAL }),
      new TextRun({ text, size: 20, font: 'Calibri' }),
    ],
    spacing: { before: 100, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

export function organigramItem(level: number, role: string, entity: string, reporting: string): Paragraph {
  const indent = level * 0.4;
  const prefix = level === 0 ? '\u25A0' : level === 1 ? '\u25A1' : '\u25CB';
  return new Paragraph({
    children: [
      new TextRun({ text: `${prefix} ${role}`, bold: true, size: 20, font: 'Calibri', color: KHEPRA_TEAL }),
      new TextRun({ text: ` — ${entity}`, size: 20, font: 'Calibri', italic: true, color: KHEPRA_SLATE }),
      new TextRun({ text: ` [Reporting : ${reporting}]`, size: 18, font: 'Calibri', color: KHEPRA_DARK }),
    ],
    spacing: { before: 60, after: 40 },
    alignment: AlignmentType.LEFT,
    indent: { left: convertInchesToTwip(indent) },
  });
}