import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageBreak, convertInchesToTwip,
} from 'docx';

const NAVY = '0A2540', NAVY_MID = '123B5C', STEEL = '2E6DA4', STEEL_LT = 'D6E8F7',
  GOLD = 'B8860B', GOLD_LT = 'FDF6E3', DARK = '1A2332', GRAY = '5A6573', LGRAY = 'F4F6F9',
  WHITE = 'FFFFFF', GREEN = '1A7A4A', GREEN_LT = 'E6F4ED', AMBER = 'D97706', AMBER_LT = 'FEF3C7',
  RED = 'C0392B', RED_LT = 'FDECEC';

export { NAVY, NAVY_MID, STEEL, STEEL_LT, GOLD, GOLD_LT, DARK, GRAY, LGRAY, WHITE, GREEN, GREEN_LT, AMBER, AMBER_LT, RED, RED_LT };

export function sp(n = 1): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 0, after: n * 120 } });
}
export function hr(color = NAVY_MID): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 4 })], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color } }, spacing: { before: 80, after: 80 } });
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
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, color: NAVY_MID, font: 'Calibri' })], border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: STEEL } }, spacing: { before: 360, after: 160 } });
}
export function h3(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 22, color: STEEL, font: 'Calibri' })], spacing: { before: 280, after: 120 } });
}
export function h4(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: DARK, font: 'Calibri' })], spacing: { before: 160, after: 80 } });
}
export function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, size: opts?.size || 20, font: 'Calibri', bold: opts?.bold, italics: opts?.italic, color: opts?.color || DARK })], spacing: { before: 60, after: 80 }, alignment: AlignmentType.JUSTIFIED });
}
export function bullet(text: string, icon = '\u25B8'): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  `, bold: true, size: 20, color: STEEL, font: 'Calibri' }), new TextRun({ text, size: 20, font: 'Calibri', color: DARK })],
    spacing: { before: 60, after: 60 }, indent: { left: convertInchesToTwip(0.25) },
  });
}
export function box(text: string, color: string, bg: string, icon: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  ${text}`, size: 18, font: 'Calibri', bold: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 8, color } },
    indent: { left: convertInchesToTwip(0.2) }, spacing: { before: 160, after: 160 },
  });
}
export const infoBox = (t: string) => box(t, STEEL, STEEL_LT, '\u2139');
export const successBox = (t: string) => box(t, GREEN, GREEN_LT, '\u2714');
export const alertBox = (t: string) => box(t, AMBER, AMBER_LT, '\u26A0');
export const dangerBox = (t: string) => box(t, RED, RED_LT, '\u2717');
export const goldBox = (t: string) => box(t, GOLD, GOLD_LT, '\u2605');

export function tbl(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const n = headers.length;
  let w = colWidths ? [...colWidths] : headers.map(() => Math.floor(100 / n));
  if (w.length < n) { const sum = w.reduce((a, b) => a + (b || 0), 0); const rem = Math.max(100 - sum, 0); const avg = Math.floor(rem / (n - w.length)); while (w.length < n) w.push(avg > 0 ? avg : Math.floor(100 / n)); }
  if (w.length > n) w = w.slice(0, n);
  w = w.map(v => (v === undefined || v === null || Number.isNaN(v)) ? Math.floor(100 / n) : v);
  const normalized = rows.map(r => { if (r.length < n) return [...r, ...Array(n - r.length).fill('')]; if (r.length > n) return r.slice(0, n); return r; });
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      shading: { type: ShadingType.SOLID, color: NAVY_MID, fill: NAVY_MID },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 18, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER })],
    })),
  });
  const dataRows = normalized.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? WHITE : LGRAY, fill: ri % 2 === 0 ? WHITE : LGRAY },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 18, font: 'Calibri', color: DARK, bold: ci === 0 })], alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.LEFT })],
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: w.map(v => `${v}%`),
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

export function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({ children: [new TextRun({ text: '', size: 4 })], shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY }, spacing: { before: 0, after: 0 } }),
    sp(2),
    new Paragraph({ children: [new TextRun({ text: 'KHEPRA EXPERTS', bold: true, size: 40, color: STEEL, font: 'Calibri', allCaps: true, characterSpacing: 40 })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Cabinet International de Conseil \u2014 Gouvernance \u00B7 Strat\u00E9gie \u00B7 Finance \u00B7 R\u00E9glementation', size: 20, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 } }),
    hr(GOLD),
    sp(1),
    new Paragraph({ children: [new TextRun({ text: 'POLITIQUE DE R\u00C9MUN\u00C9RATION', bold: true, size: 42, color: WHITE, font: 'Calibri', allCaps: true })], alignment: AlignmentType.CENTER, spacing: { before: 300, after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'DES DIRIGEANTS', bold: true, size: 52, color: GOLD, font: 'Calibri', allCaps: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 } }),
    new Paragraph({ children: [new TextRun({ text: 'Administrateurs \u00B7 Directeur G\u00E9n\u00E9ral \u00B7 Directeur G\u00E9n\u00E9ral Adjoint', bold: true, size: 24, color: STEEL, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'Institutions de Microfinance \u2014 Zone UEMOA & CEMAC', bold: true, size: 22, color: GRAY, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 300 } }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({ children: [new TextRun({ text: 'Document normatif et chiffr\u00E9 \u2014 Conformit\u00E9 BCEAO / COBAC / OHADA / IFC / BAD', bold: true, size: 22, color: WHITE, font: 'Calibri' })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Niveau Big Four \u2014 Senior Partner \u2014 Gouvernance Bancaire & Microfinance Afrique', size: 20, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 400 } }),
    tbl(['Client cible', 'P\u00E9rim\u00E8tre', 'R\u00E9f\u00E9rence', 'Classification'], [['R\u00E9seau IMF UEMOA / CEMAC', 'UEMOA (8 \u00E9tats) \u00B7 CEMAC (6 \u00E9tats)', 'KE-REM-IMF-2026-001-V1.0', 'CONFIDENTIEL \u2014 STRICTEMENT PRIV\u00C9']], [25, 40, 20, 15]),
    sp(1),
    tbl(['Date d\u2019\u00E9mission', 'Version', 'Statut', 'Langue'], [['Mai 2026', 'V1.0', 'CONFIDENTIEL', 'Fran\u00E7ais']], [25, 25, 25, 25]),
    sp(2),
    new Paragraph({ children: [new TextRun({ text: 'Produit par KHEPRA EXPERTS \u2014 Niveau PwC / Khepra Experts / EY / KPMG / IFC / Banque Mondiale', size: 18, color: GRAY, font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 } }),
    new Paragraph({ children: [new TextRun({ text: 'Ce document est soumis \u00E0 un accord de confidentialit\u00E9. Toute reproduction ou divulgation est interdite.', size: 16, color: 'AAAAAA', font: 'Calibri', italics: true })], alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 } }),
    pb(),
  ];
}

export function tableOfContents(): (Paragraph | Table)[] {
  const items = [
    { n: '1.', t: 'Executive Summary', p: '3' },
    { n: '2.', t: 'Cadre R\u00E9glementaire et Normatif', p: '5' },
    { n: '3.', t: 'Principes de R\u00E9mun\u00E9ration', p: '12' },
    { n: '4.', t: 'Architecture de R\u00E9mun\u00E9ration', p: '16' },
    { n: '5.', t: 'Grille de R\u00E9mun\u00E9ration Chiffr\u00E9e', p: '22' },
    { n: '6.', t: 'Simulation de Bonus DG / DGA', p: '26' },
    { n: '7.', t: 'Benchmark UEMOA vs CEMAC', p: '30' },
    { n: '8.', t: 'Alignement IFC / BAD', p: '34' },
    { n: '9.', t: 'Gouvernance de la R\u00E9mun\u00E9ration', p: '38' },
    { n: '10.', t: 'Dispositifs de Contr\u00F4le et Conformit\u00E9', p: '42' },
  ];
  return [
    h1('SOMMAIRE'),
    sp(),
    ...items.map(item => new Paragraph({
      children: [
        new TextRun({ text: `${item.n}  `, bold: true, size: 20, font: 'Calibri', color: STEEL }),
        new TextRun({ text: item.t, size: 20, font: 'Calibri', color: DARK }),
        new TextRun({ text: `  ....  p. ${item.p}`, size: 20, font: 'Calibri', color: GRAY }),
      ],
      spacing: { before: 100, after: 100 },
      border: { bottom: { style: BorderStyle.DOTTED, size: 1, color: 'E5E7EB' } },
    })),
    pb(),
  ];
}



