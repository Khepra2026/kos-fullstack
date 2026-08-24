import {
  Paragraph, TextRun, Table,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, SILVER, DARK, WHITE, GOLD,
  sp, hr, h1, h2, tbl, pb,
} from '@/utils/businessPlanCGI/helpers';

export function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({
      children: [new TextRun({ text: '', size: 4 })],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      spacing: { before: 0, after: 0 },
    }),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS', bold: true, size: 40, color: STEEL, font: 'Calibri', allCaps: true, characterSpacing: 40 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Cabinet de Conseil de Réputation Internationale — Finance · Stratégie · Ingénierie de Projets', size: 20, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(GOLD),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'ÉTUDE DE MARCHÉ', bold: true, size: 52, color: NAVY, font: 'Calibri', allCaps: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Analyse Stratégique du Marché des Granulats — Togo & Afrique de l\'Ouest', bold: true, size: 30, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA', bold: true, size: 26, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Carrière de Granulats — Site de Siyimé, District du Haho, Togo', size: 22, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Capacité industrielle : 200-250 tonnes/heure — Équipements METSO Nordberg C120 + HP300', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 300 },
    }),
    sp(1),
    tbl(
      ['Client', 'Secteur', 'Pays / Région', 'Référence'],
      [['CORNERSTONE GROUP INTERNATIONAL (CGI) SA', 'Mines & Carrières — BTP', 'Togo / Afrique de l\'Ouest — CEDEAO', 'KE-EM-CGI-2026-001']],
      [35, 25, 20, 20]
    ),
    sp(1),
    tbl(
      ['Date d\'émission', 'Version', 'Statut', 'Validité'],
      [['Mai 2026', 'V2.0 — Définitif', 'CONFIDENTIEL', '12 mois']],
      [25, 25, 25, 25]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Conforme aux Normes BIDC · Code Minier Togolais · Acte Uniforme OHADA · Normes IFC Performance Standards · Principes Équateur · V2.0 — 10 Sections', size: 18, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    pb(),
  ];
}

export function legalNotice(): (Paragraph | Table)[] {
  return [
    h1('AVERTISSEMENT LÉGAL ET CONFIDENTIALITÉ'),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Le présent document d\'Étude de Marché a été préparé par KHEPRA EXPERTS, cabinet de conseil de réputation internationale, à la demande exclusive de CORNERSTONE GROUP INTERNATIONAL (CGI) SA. Il est destiné à un usage strictement confidentiel et ne peut être communiqué à des tiers sans l\'accord écrit préalable.', size: 20, font: 'Calibri' })],
      spacing: { before: 60, after: 80 },
      alignment: AlignmentType.JUSTIFIED,
    }),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Les analyses de marché, estimations de demande et projections sont fondées sur des données disponibles à la date d\'émission, issues de sources officielles (INSEED Togo, BCEAO, FMI, Banque Mondiale, DGMG, LNBTP). Elles constituent des estimations raisonnées et non des garanties de résultats.', size: 20, font: 'Calibri' })],
      spacing: { before: 60, after: 80 },
      alignment: AlignmentType.JUSTIFIED,
    }),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'Référence : KE-EM-CGI-2026-001 | Préparé par : KHEPRA EXPERTS | Pour : CORNERSTONE GROUP INTERNATIONAL (CGI) SA | Togo, 2026', size: 18, color: STEEL, font: 'Calibri', italics: true })],
      shading: { type: ShadingType.SOLID, color: 'D6E4F7', fill: 'D6E4F7' },
      border: { left: { style: BorderStyle.SINGLE, size: 8, color: STEEL } },
      indent: { left: 288 },
      spacing: { before: 160, after: 160 },
    }),
    pb(),
  ];
}



