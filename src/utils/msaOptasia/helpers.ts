import {
  Paragraph,
  TextRun,
  TableCell,
  TableRow,
  WidthType,
  BorderStyle,
  AlignmentType,
} from 'docx';

export function createBorder() {
  return {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  };
}

export function cell(
  text: string,
  options?: {
    bold?: boolean;
    width?: number;
    shading?: string;
    fontSize?: number;
    alignment?: AlignmentType;
  },
) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: options?.bold,
            size: options?.fontSize ? options.fontSize * 2 : 18,
            font: 'Calibri',
          }),
        ],
        alignment: options?.alignment || AlignmentType.LEFT,
      }),
    ],
    width: { size: options?.width || 100, type: WidthType.PERCENTAGE },
    shading: options?.shading ? { fill: options.shading } : undefined,
    borders: createBorder(),
  });
}

export function multiCell(
  lines: string[],
  options?: {
    bold?: boolean;
    width?: number;
    shading?: string;
    fontSize?: number;
  },
) {
  return new TableCell({
    children: lines.map(
      (line) =>
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              bold: options?.bold,
              size: options?.fontSize ? options.fontSize * 2 : 18,
              font: 'Calibri',
            }),
          ],
          spacing: { after: 60 },
        }),
    ),
    width: { size: options?.width || 100, type: WidthType.PERCENTAGE },
    shading: options?.shading ? { fill: options.shading } : undefined,
    borders: createBorder(),
  });
}

export function para(text: string, opts?: { bold?: boolean; size?: number; color?: string; after?: number; before?: number; indent?: number; alignment?: AlignmentType }) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: opts?.bold,
        size: opts?.size ? opts.size * 2 : 20,
        font: 'Calibri',
        color: opts?.color,
      }),
    ],
    spacing: { after: opts?.after || 200, before: opts?.before || 0 },
    alignment: opts?.alignment || AlignmentType.BOTH,
    indent: opts?.indent ? { left: opts.indent } : undefined,
  });
}

export function heading1(text: string) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        font: 'Calibri',
        color: '1F4E3D',
      }),
    ],
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.LEFT,
  });
}

export function heading2(text: string, opts?: { before?: number; after?: number }) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 22,
        font: 'Calibri',
      }),
    ],
    spacing: { before: opts?.before || 200, after: opts?.after || 100 },
  });
}

export function item(number: string, text: string, opts?: { after?: number; indent?: number }) {
  return new Paragraph({
    children: [
      new TextRun({
        text: `${number} `,
        bold: true,
        size: 20,
        font: 'Calibri',
      }),
      new TextRun({
        text,
        size: 20,
        font: 'Calibri',
      }),
    ],
    spacing: { after: opts?.after || 60 },
    alignment: AlignmentType.BOTH,
    indent: opts?.indent ? { left: opts.indent } : undefined,
  });
}

export function separator() {
  return new Paragraph({
    children: [
      new TextRun({
        text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        size: 20,
        font: 'Calibri',
        color: 'C5A059',
      }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { before: 400, after: 100 },
  });
}