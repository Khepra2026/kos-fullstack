import { Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType } from 'docx';
import { TEAL, DARK, RED, SLATE, GOLD, spacer } from '';

export const coverParagraphs: Paragraph[] = [
  spacer(4),
  new Paragraph({ children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 48, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
  new Paragraph({ children: [new TextRun({ text: 'Conseil · Gouvernance · Finance · Réglementation Bancaire', size: 20, font: 'Calibri', color: SLATE, italic: true })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
  new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: TEAL, space: 8 } }, spacing: { before: 100, after: 300 } }),
  new Paragraph({ children: [new TextRun({ text: 'LIVRABLE 1 — ÉDITION SYNTHÉTIQUE', bold: true, size: 26, font: 'Calibri', color: GOLD })], alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
  new Paragraph({ children: [new TextRun({ text: 'SYNTHÈSE EXÉCUTIVE ET TABLEAU DE BORD CEO', bold: true, size: 40, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { after: 140 } }),
  new Paragraph({ children: [new TextRun({ text: 'Programme Agréments EMF/SFD 2ème Catégorie — UEMOA & CEMAC', bold: true, size: 24, font: 'Calibri', color: DARK })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
  new Paragraph({ children: [new TextRun({ text: '7 Pays — Format Ultra-Exécutif (≤50 pages)', bold: true, size: 22, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
  new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD, space: 8 } }, spacing: { before: 100, after: 300 } }),
  new Paragraph({ children: [new TextRun({ text: 'Client exclusif', bold: true, size: 20, font: 'Calibri', color: SLATE })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: 'OPTASIA SOLUTIONS FZCO', bold: true, size: 28, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { after: 60 } }),
  new Paragraph({ children: [new TextRun({ text: 'Unit 806B, JBC 4, JLT — Dubaï, Émirats Arabes Unis', size: 20, font: 'Calibri', color: SLATE, italic: true })], alignment: AlignmentType.CENTER, spacing: { after: 300 } }),
  new Paragraph({ children: [new TextRun({ text: 'Référence : KE-OPT-L1SYN-2026-001-V1.0', bold: true, size: 18, font: 'Calibri', color: TEAL })], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: 'Émission : 2 juin 2026 — Péremption : 2 décembre 2026', size: 18, font: 'Calibri', color: DARK })], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: 'Niveau : Partner Big Four — Corporate Governance & Financial Institutions Regulation', size: 18, font: 'Calibri', color: DARK })], alignment: AlignmentType.CENTER, spacing: { after: 40 } }),
  new Paragraph({ children: [new TextRun({ text: 'Classification : CONFIDENTIEL — STRICTEMENT PRIVÉ — CEO ONLY', bold: true, size: 18, font: 'Calibri', color: RED })], alignment: AlignmentType.CENTER, spacing: { after: 300 }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' } }),
  new Paragraph({ children: [new TextRun({ text: 'AVERTISSEMENT JURIDIQUE', bold: true, size: 18, font: 'Calibri', color: RED })], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
  new Paragraph({ children: [new TextRun({ text: 'Document confidentiel protégé par le droit d\'auteur (OAPI) et le secret professionnel. Reproduction, diffusion ou communication interdites sans accord écrit préalable de KHEPRA EXPERTS. Réflecte l\'état du droit au 2 juin 2026. Ne se substitue pas à un avis juridique ponctuel.', size: 17, font: 'Calibri', color: DARK, italic: true })], alignment: AlignmentType.JUSTIFIED, spacing: { after: 200 }, border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } }, indent: { left: 200, right: 200 }, shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' } }),
  new Paragraph({ children: [], pageBreakBefore: true }),
];



