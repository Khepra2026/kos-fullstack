import { Paragraph, TextRun, AlignmentType, BorderStyle, ShadingType, convertInchesToTwip } from 'docx';
import { TEAL, DARK, RED, AMBER, SLATE, GOLD, divider, spacer } from './helpers';

export const masterCoverParagraphs: Paragraph[] = [
  spacer(4),

  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 52, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Conseil en Stratégie · Gouvernance · Finance · Réglementation Bancaire', size: 22, font: 'Calibri', color: SLATE, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),

  new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: TEAL, space: 8 } },
    spacing: { before: 100, after: 300 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'LIVRABLE 1 — ÉDITION INTÉGRÉE COMPLÈTE', bold: true, size: 28, font: 'Calibri', color: GOLD })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'PRÉ-DIAGNOSTIC ET CADRE RÉGLEMENTAIRE STRATÉGIQUE', bold: true, size: 44, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 140 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'Programme d\'Agréments EMF/SFD de 2ème Catégorie', bold: true, size: 26, font: 'Calibri', color: DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'Zones UEMOA & CEMAC — 7 Pays Cibles', bold: true, size: 24, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),

  new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: AMBER, space: 8 } },
    spacing: { before: 100, after: 300 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'CINQ PARTIES THÉMATIQUES', bold: true, size: 22, font: 'Calibri', color: AMBER })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  }),

  new Paragraph({
    children: [
      new TextRun({ text: 'Partie I ', bold: true, size: 20, font: 'Calibri', color: TEAL }),
      new TextRun({ text: 'Pré-diagnostic et Cartographie Réglementaire (UEMOA & CEMAC, 7 pays)', size: 20, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Partie II ', bold: true, size: 20, font: 'Calibri', color: RED }),
      new TextRun({ text: 'Mémorandum de Hardening Réglementaire et Prudentiel', size: 20, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Partie III ', bold: true, size: 20, font: 'Calibri', color: AMBER }),
      new TextRun({ text: 'Architecture de Gouvernance Cible du Groupe', size: 20, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Partie IV ', bold: true, size: 20, font: 'Calibri', color: '1E3A5F' }),
      new TextRun({ text: 'Cadre Réglementaire des Produits, Services et Modèle Économique Fintech', size: 20, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Partie V ', bold: true, size: 20, font: 'Calibri', color: '1A4731' }),
      new TextRun({ text: 'Modèle Économique Conforme pour une Fintech de Classe Mondiale', size: 20, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),

  new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: TEAL, space: 8 } },
    spacing: { before: 100, after: 300 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'Client exclusif', bold: true, size: 20, font: 'Calibri', color: SLATE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'OPTASIA SOLUTIONS FZCO', bold: true, size: 30, font: 'Calibri', color: TEAL })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Unit 806B, Jumeirah Business Center 4, JLT — Dubaï, Émirats Arabes Unis', size: 20, font: 'Calibri', color: SLATE, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 60 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Groupe OPTASIA — Infrastructure Scalable pour l\'Inclusion Financière Panafricaine', size: 20, font: 'Calibri', color: DARK, italic: true })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),

  new Paragraph({
    children: [new TextRun({ text: 'Rédigé par', size: 18, font: 'Calibri', color: SLATE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'KHEPRA EXPERTS SARL U', bold: true, size: 24, font: 'Calibri', color: DARK })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [new TextRun({ text: 'Logogomé, Rue Carrefour Aised — Lomé, Togo', size: 18, font: 'Calibri', color: SLATE })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'RCCM : TG-LFW-01-2026-813-01347  |  NIF : 1002124216', size: 18, font: 'Calibri', color: SLATE }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Directeur de Mission : ', bold: true, size: 18, font: 'Calibri', color: DARK }),
      new TextRun({ text: 'M. Essoyomèwè SIMDA, Associé Directeur', size: 18, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
  }),

  new Paragraph({
    children: [
      new TextRun({ text: 'Référence : ', bold: true, size: 18, font: 'Calibri', color: DARK }),
      new TextRun({ text: 'KE-OPT-L1INT-2026-001-V1.0', bold: true, size: 18, font: 'Calibri', color: TEAL }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Date d\'émission : ', bold: true, size: 18, font: 'Calibri', color: DARK }),
      new TextRun({ text: '2 juin 2026', size: 18, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Niveau de rédaction : ', bold: true, size: 18, font: 'Calibri', color: DARK }),
      new TextRun({ text: 'Expert Associé — Big Four | Partner — Corporate Governance & Financial Institutions Regulation', size: 18, font: 'Calibri', color: DARK }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({ text: 'Classification : ', bold: true, size: 18, font: 'Calibri', color: DARK }),
      new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ — À L\'ATTENTION EXCLUSIVE DU CEO', bold: true, size: 18, font: 'Calibri', color: RED }),
    ],
    alignment: AlignmentType.CENTER,
    spacing: { after: 300 },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' },
  }),

  spacer(2),

  new Paragraph({
    children: [new TextRun({ text: 'AVERTISSEMENT JURIDIQUE', bold: true, size: 18, font: 'Calibri', color: RED })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
  }),
  new Paragraph({
    children: [new TextRun({
      text: 'Le présent document intégré rassemble cinq analyses stratégiques et réglementaires de niveau Big Four. Il constitue une œuvre de conseil confidentielle, protégée par le droit d\'auteur (OAPI) et le secret professionnel. Sa reproduction, diffusion ou communication à des tiers, en tout ou en partie, est strictement interdite sans l\'accord écrit préalable de KHEPRA EXPERTS SARL U. Les analyses et recommandations reflètent l\'état du droit au 2 juin 2026 et sont susceptibles d\'évoluer. Ce document ne saurait se substituer à un avis juridique ponctuel.',
      size: 17, font: 'Calibri', color: DARK, italic: true,
    })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 200 },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: RED, space: 10 } },
    indent: { left: convertInchesToTwip(0.2), right: convertInchesToTwip(0.2) },
    shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF2F2' },
  }),

  new Paragraph({ children: [], pageBreakBefore: true }),
];