import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  PageOrientation,
  convertInchesToTwip,
  UnderlineType,
} from 'docx';

// ─── Palette fidèle au modèle Université Laval ────────────────────────────────
const NAVY = '1A2B5E';
const DARK_TEXT = '1A1A1A';
const GRAY_TEXT = '555555';
const LIGHT_GRAY = '888888';
const RED_SEAL = 'B22222';
const WHITE = 'FFFFFF';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function spacer(pts = 200): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: '', size: 20 })],
    spacing: { before: 0, after: pts },
  });
}

function thinRule(color = LIGHT_GRAY): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text: '',
        size: 4,
      }),
    ],
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color },
    },
    spacing: { before: 60, after: 60 },
  });
}

// ─── CONSTRUCTION DU DIPLÔME ──────────────────────────────────────────────────
function buildDiplome(): Paragraph[] {
  const content: Paragraph[] = [];

  // ── ESPACE SUPÉRIEUR ──
  content.push(spacer(300));

  // ── LOGO TEXTUEL — UNIVERSITÉ LAVAL (haut gauche, style image) ──
  // Armoiries simulées en ASCII art + texte
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '⬛ UNIVERSITÉ',
          bold: true,
          size: 36,
          color: NAVY,
          font: 'Arial',
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 0 },
      indent: { left: convertInchesToTwip(0.5) },
    })
  );

  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: '    LAVAL',
          bold: true,
          size: 52,
          color: NAVY,
          font: 'Arial',
          characterSpacing: 80,
        }),
      ],
      alignment: AlignmentType.LEFT,
      spacing: { before: 0, after: 0 },
      indent: { left: convertInchesToTwip(0.5) },
    })
  );

  content.push(spacer(600));

  // ── TEXTE INTRODUCTIF ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Vu le rapport favorable des autorités compétentes attestant que',
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    })
  );

  // ── NOM DU RÉCIPIENDAIRE ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'SIMDA Essoyomèwè',
          bold: true,
          size: 56,
          color: DARK_TEXT,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    })
  );

  // ── A SATISFAIT AUX EXIGENCES ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'a satisfait aux exigences du programme de',
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
    })
  );

  // ── NOM DU PROGRAMME ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Maîtrise en administration des affaires - gestion des entreprises',
          size: 24,
          color: DARK_TEXT,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    })
  );

  // ── CONFÉRÉ LE GRADE ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "l'Université Laval lui a conféré, en vertu des pouvoirs qu'elle détient, le grade de",
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    })
  );

  // ── TITRE DU GRADE ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Maître en administration des affaires (M.B.A.)',
          bold: true,
          size: 36,
          color: DARK_TEXT,
          font: 'Times New Roman',
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 300 },
    })
  );

  // ── EN FOI DE QUOI ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'En foi de quoi, nous avons signé le présent diplôme',
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    })
  );

  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: "portant le sceau de l'Université.",
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
    })
  );

  // ── DATE ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'Québec, le 10 juin 2019',
          size: 22,
          color: DARK_TEXT,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 400 },
    })
  );

  // ── ZONE SIGNATURES + SCEAU ──
  // Tableau 3 colonnes : Sceau | Signature gauche | Signature droite
  content.push(
    new Table({
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
          children: [
            // ── Colonne 1 : Sceau rouge ──
            new TableCell({
              width: { size: 28, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: WHITE },
                bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
                left: { style: BorderStyle.NONE, size: 0, color: WHITE },
                right: { style: BorderStyle.NONE, size: 0, color: WHITE },
              },
              children: [
                // Sceau circulaire simulé
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '●',
                      size: 160,
                      color: RED_SEAL,
                      font: 'Times New Roman',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: '· SCEAU DE L\'UNIVERSITÉ LAVAL ·',
                      size: 12,
                      color: RED_SEAL,
                      font: 'Times New Roman',
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 40, after: 0 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'QUÉBEC · CANADA · EST. 1852',
                      size: 10,
                      color: RED_SEAL,
                      font: 'Times New Roman',
                    }),
                  ],
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 20, after: 0 },
                }),
              ],
              margins: { top: 0, bottom: 0, left: 200, right: 200 },
            }),

            // ── Colonne 2 : Signature gauche (Secrétaire générale) ──
            new TableCell({
              width: { size: 36, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: WHITE },
                bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
                left: { style: BorderStyle.NONE, size: 0, color: WHITE },
                right: { style: BorderStyle.NONE, size: 0, color: WHITE },
              },
              children: [
                // Signature manuscrite simulée
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Monique Richer',
                      size: 36,
                      color: DARK_TEXT,
                      font: 'Times New Roman',
                      italics: true,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 60 },
                }),
                // Ligne de signature
                new Paragraph({
                  children: [new TextRun({ text: '', size: 4 })],
                  border: {
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: DARK_TEXT },
                  },
                  spacing: { before: 0, after: 80 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Secrétaire générale',
                      size: 18,
                      color: DARK_TEXT,
                      font: 'Times New Roman',
                      italics: true,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 0 },
                }),
              ],
              margins: { top: 0, bottom: 0, left: 300, right: 200 },
            }),

            // ── Colonne 3 : Signature droite (Rectrice) ──
            new TableCell({
              width: { size: 36, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: WHITE },
                bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
                left: { style: BorderStyle.NONE, size: 0, color: WHITE },
                right: { style: BorderStyle.NONE, size: 0, color: WHITE },
              },
              children: [
                // Signature manuscrite simulée
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Sophie D\'Amours',
                      size: 36,
                      color: DARK_TEXT,
                      font: 'Times New Roman',
                      italics: true,
                      bold: true,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 60 },
                }),
                // Ligne de signature
                new Paragraph({
                  children: [new TextRun({ text: '', size: 4 })],
                  border: {
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: DARK_TEXT },
                  },
                  spacing: { before: 0, after: 80 },
                }),
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'Rectrice',
                      size: 18,
                      color: DARK_TEXT,
                      font: 'Times New Roman',
                      italics: true,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                  spacing: { before: 0, after: 0 },
                }),
              ],
              margins: { top: 0, bottom: 0, left: 200, right: 300 },
            }),
          ],
        }),
      ],
    })
  );

  content.push(spacer(200));

  // ── NUMÉRO DE DIPLÔME (discret, bas de page) ──
  content.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'N° UL-FSA-MBA-2019-047823',
          size: 14,
          color: LIGHT_GRAY,
          font: 'Times New Roman',
          italics: true,
        }),
      ],
      alignment: AlignmentType.RIGHT,
      spacing: { before: 0, after: 0 },
    })
  );

  return content;
}

// ─── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────
export async function generateDiplomeUniversitaire(): Promise<Blob> {
  const doc = new Document({
    creator: 'Université Laval',
    title: 'Diplôme de Maîtrise en Administration des Affaires — SIMDA Essoyomèwè',
    description: 'MBA — Gestion des Entreprises — Université Laval',
    subject: 'Diplôme universitaire officiel',
    keywords: 'MBA, Université Laval, diplôme, Gestion des Entreprises, FSA',
    sections: [
      {
        properties: {
          page: {
            // FORMAT PORTRAIT — comme le vrai diplôme Laval
            size: {
              orientation: PageOrientation.PORTRAIT,
              width: convertInchesToTwip(8.27),
              height: convertInchesToTwip(11.69),
            },
            margin: {
              top: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.2),
              bottom: convertInchesToTwip(1.0),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        children: buildDiplome(),
      },
    ],
  });

  return Packer.toBlob(doc);
}
