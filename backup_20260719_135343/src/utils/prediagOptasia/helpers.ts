import {
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  convertInchesToTwip,
  Shading,
  VerticalAlign,
} from 'docx';

export const CONFIDENTIAL = 'CONFIDENTIEL — STRICTEMENT PRIVÉ — KHEPRA EXPERTS SARL U × OPTASIA SOLUTIONS FZCO';
export const REFERENCE = 'Réf. KE-OPT-PREDIAG-2026-001-V1.0';
export const DATE = '02 juin 2026';

export const tealShading: Shading = {
  type: 'clear',
  fill: '0F4C3A',
};

export const lightTealShading: Shading = {
  type: 'clear',
  fill: 'E8F5F0',
};

export const grayShading: Shading = {
  type: 'clear',
  fill: 'F5F5F5',
};

export const amberShading: Shading = {
  type: 'clear',
  fill: 'FFF8E1',
};

export const redShading: Shading = {
  type: 'clear',
  fill: 'FFEBEE',
};

export const defaultBorders = {
  top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
};

export const headerBorders = {
  top: { style: BorderStyle.SINGLE, size: 2, color: '0F4C3A' },
  bottom: { style: BorderStyle.SINGLE, size: 2, color: '0F4C3A' },
  left: { style: BorderStyle.SINGLE, size: 1, color: '0F4C3A' },
  right: { style: BorderStyle.SINGLE, size: 1, color: '0F4C3A' },
};

export function createParagraph(text: string, options?: {
  bold?: boolean;
  size?: number;
  font?: string;
  alignment?: AlignmentType;
  spacing?: { before?: number; after?: number; line?: number };
  shading?: Shading;
  indent?: { left?: number; right?: number };
}): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: options?.bold, size: options?.size || 22, font: options?.font || 'Calibri' })],
    alignment: options?.alignment,
    spacing: options?.spacing || { after: 120, line: 276 },
    shading: options?.shading,
    indent: options?.indent,
  });
}

export function createHeading(text: string, level: number): Paragraph {
  const sizes: Record<number, number> = { 1: 32, 2: 28, 3: 24, 4: 22 };
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: sizes[level] || 24, font: 'Calibri', color: '0F4C3A' })],
    heading: HeadingLevel.HEADING_1 + (level - 1) as HeadingLevel,
    spacing: { before: 360, after: 180, line: 276 },
  });
}

export function createBullet(text: string, boldPrefix?: string): Paragraph {
  const children: TextRun[] = [];
  if (boldPrefix) {
    children.push(new TextRun({ text: boldPrefix + ' ', bold: true, size: 22, font: 'Calibri' }));
  }
  children.push(new TextRun({ text, size: 22, font: 'Calibri' }));
  return new Paragraph({
    children,
    bullet: { level: 0 },
    spacing: { after: 80, line: 276 },
  });
}

export function createTableCell(text: string, options?: {
  bold?: boolean;
  shading?: Shading;
  width?: number;
  alignment?: AlignmentType;
  colSpan?: number;
  fontSize?: number;
}): TableCell {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: options?.bold, size: options?.fontSize || 20, font: 'Calibri' })],
      alignment: options?.alignment || AlignmentType.LEFT,
    })],
    shading: options?.shading,
    width: { size: options?.width || 100, type: WidthType.PERCENTAGE },
    columnSpan: options?.colSpan,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 80, bottom: 80, left: 100, right: 100 },
    borders: defaultBorders,
  });
}

export function createSpacing(paragraphs: Paragraph[], count: number = 1): Paragraph[] {
  const result: Paragraph[] = [];
  for (let i = 0; i < count; i++) {
    result.push(new Paragraph({ text: '', spacing: { after: 0, line: 276 } }));
  }
  return [...paragraphs, ...result];
}

export function createSectionDivider(text?: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: text || '─',
        size: 14,
        color: '0F4C3A',
        font: 'Calibri',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 240, after: 240 },
  });
}



