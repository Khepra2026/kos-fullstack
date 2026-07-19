import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
  PageBreak, convertInchesToTwip,
} from 'docx';

// ─── PALETTE INSTITUTIONNELLE BIDC / BIG FOUR ───────────────────────────────
export const NAVY = '0A1F44';
export const NAVY_MID = '1B3A5C';
export const STEEL = '2E5FA3';
export const STEEL_LT = 'D6E4F7';
export const SILVER = '7B8FA8';
export const DARK = '1A2332';
export const LGRAY = 'F4F6F9';
export const WHITE = 'FFFFFF';
export const GOLD = 'C8A84B';
export const GREEN = '1A7A4A';
export const GREEN_LT = 'E6F4ED';
export const AMBER = 'D97706';
export const AMBER_LT = 'FFF8E1';

export const TAU_FCFA_USD = 605;

// ─── HELPERS DE BASE ─────────────────────────────────────────────────────────
export function sp(n = 1): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 0, after: n * 120 } });
}

export function hr(color = STEEL): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 4 })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color } },
    spacing: { before: 80, after: 80 },
  });
}

export function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `  ${text}  `, bold: true, size: 28, color: WHITE, font: 'Calibri', allCaps: true })],
    shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
    spacing: { before: 400, after: 200 },
    indent: { left: convertInchesToTwip(0.1) },
  });
}

export function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, color: NAVY_MID, font: 'Calibri' })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: STEEL } },
    spacing: { before: 320, after: 160 },
  });
}

export function h3(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: STEEL, font: 'Calibri' })],
    spacing: { before: 240, after: 120 },
  });
}

export function h4(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 20, color: DARK, font: 'Calibri' })],
    spacing: { before: 160, after: 80 },
  });
}

export function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: opts?.size || 20, font: 'Calibri', bold: opts?.bold, italics: opts?.italic, color: opts?.color || DARK })],
    spacing: { before: 60, after: 80 },
    alignment: AlignmentType.JUSTIFIED,
  });
}

export function bullet(text: string, icon = '▸'): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }),
      new TextRun({ text, size: 20, font: 'Calibri', color: DARK }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

export function infoBox(text: string, color = STEEL, bg = STEEL_LT): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, font: 'Calibri', italics: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

export function alertBox(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `⚠  ${text}`, size: 18, font: 'Calibri', bold: true, color: AMBER })],
    shading: { type: ShadingType.SOLID, color: AMBER_LT, fill: AMBER_LT },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: AMBER } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

export function successBox(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `✔  ${text}`, size: 18, font: 'Calibri', bold: true, color: GREEN })],
    shading: { type: ShadingType.SOLID, color: GREEN_LT, fill: GREEN_LT },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color: GREEN } },
    indent: { left: convertInchesToTwip(0.2) },
    spacing: { before: 160, after: 160 },
  });
}

export function kpiRow(items: Array<{ label: string; value: string; sub?: string }>): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE, size: 0, color: WHITE },
      bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
      left: { style: BorderStyle.NONE, size: 0, color: WHITE },
      right: { style: BorderStyle.NONE, size: 0, color: WHITE },
      insideH: { style: BorderStyle.NONE, size: 0, color: WHITE },
      insideV: { style: BorderStyle.NONE, size: 0, color: WHITE },
    },
    rows: [
      new TableRow({
        children: items.map(item =>
          new TableCell({
            width: { size: Math.floor(100 / items.length), type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            borders: {
              top: { style: BorderStyle.NONE, size: 0, color: WHITE },
              bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
              left: { style: BorderStyle.SINGLE, size: 2, color: GOLD },
              right: { style: BorderStyle.NONE, size: 0, color: WHITE },
            },
            children: [
              new Paragraph({
                children: [new TextRun({ text: item.value, bold: true, size: 36, color: WHITE, font: 'Calibri' })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 40 },
              }),
              new Paragraph({
                children: [new TextRun({ text: item.label, bold: true, size: 16, color: GOLD, font: 'Calibri', allCaps: true })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
              ...(item.sub ? [new Paragraph({
                children: [new TextRun({ text: item.sub, size: 14, color: 'AAAAAA', font: 'Calibri', italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 20, after: 0 },
              })] : []),
            ],
          })
        ),
      }),
    ],
  });
}

export function tbl(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const n = headers.length;
  let w = colWidths ? [...colWidths] : headers.map(() => Math.floor(100 / n));
  if (w.length < n) {
    const sumExisting = w.reduce((a, b) => a + (b || 0), 0);
    const remaining = Math.max(100 - sumExisting, 0);
    const avg = Math.floor(remaining / (n - w.length));
    while (w.length < n) w.push(avg > 0 ? avg : Math.floor(100 / n));
  }
  if (w.length > n) w = w.slice(0, n);
  w = w.map((val) => (val === undefined || val === null || Number.isNaN(val)) ? Math.floor(100 / n) : val);

  const normalizedRows = rows.map((row) => {
    if (row.length < n) return [...row, ...Array(n - row.length).fill('')];
    if (row.length > n) return row.slice(0, n);
    return row;
  });

  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h) =>
      new TableCell({
        shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER })],
      })
    ),
  });
  const dataRows = normalizedRows.map((row, ri) =>
    new TableRow({
      children: row.map((cell, ci) =>
        new TableCell({
          shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? WHITE : LGRAY, fill: ri % 2 === 0 ? WHITE : LGRAY },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK, bold: ci === 0 })], alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.CENTER })],
        })
      ),
    })
  );
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: w.map((val) => `${val}%`),
    rows: [headerRow, ...dataRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'CBD5E0' },
    },
  });
}

export function pb(): Paragraph { return new Paragraph({ children: [new PageBreak()] }); }

export function usdToF(m$: number): number {
  return Math.round(m$ * TAU_FCFA_USD);
}

export function fmtM(m$: number): string {
  return `${(m$ * TAU_FCFA_USD).toFixed(0)} M FCFA`;
}

export function fmtM$v2(m$: number): string {
  return `${m$.toFixed(2)} M$`;
}

export function fmtMFcfa(m$: number): string {
  return `${(m$ * TAU_FCFA_USD).toFixed(0)} M FCFA`;
}



