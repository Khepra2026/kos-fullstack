import {
  Document,
  Header,
  Footer,
  PageNumber,
  Packer,
  convertInchesToTwip,
  AlignmentType,
  Paragraph,
  TextRun,
  BorderStyle,
} from 'docx';

// Master cover & summary
import { masterCoverParagraphs } from './livrable1Fusion/masterCover';
import { masterSummaryParagraphs } from './livrable1Fusion/masterSummary';

// PARTIE I — Pré-diagnostic et Cartographie Réglementaire (réutilisation des modules existants)
import { coverParagraphs as prediagCover } from './prediagOptasia/cover';
import { execSummaryParagraphs } from './prediagOptasia/execSummary';
import { methodologyParagraphs } from './prediagOptasia/methodology';
import { uemoaMapParagraphs } from './prediagOptasia/uemoaMap';
import { cemacMapParagraphs } from './prediagOptasia/cemacMap';
import { gapsParagraphs } from './prediagOptasia/gapsAnalysis';
import { riskMatrixParagraphs } from './prediagOptasia/riskMatrix';
import { recommendationsParagraphs } from './prediagOptasia/recommendations';
import { roadmapParagraphs } from './prediagOptasia/roadmap';
import { annexesParagraphs } from './prediagOptasia/annexes';

// PARTIE II — Mémorandum Hardening (réutilisation des modules existants)
import { coverParagraphs as hardeningCover } from './hardeningOptasia/cover';
import { section1Paragraphs as hard1 } from './hardeningOptasia/section1';
import { section2Paragraphs as hard2 } from './hardeningOptasia/section2';
import { section3Paragraphs as hard3 } from './hardeningOptasia/section3';
import { section4Paragraphs as hard4 } from './hardeningOptasia/section4';
import { section5Paragraphs as hard5 } from './hardeningOptasia/section5';

// PARTIE III — Architecture Gouvernance (réutilisation des modules existants)
import { coverParagraphs as govCover } from './governanceOptasia/cover';
import { section1Paragraphs as gov1 } from './governanceOptasia/section1';
import { section2Paragraphs as gov2 } from './governanceOptasia/section2';
import { section3Paragraphs as gov3 } from './governanceOptasia/section3';
import { section4Paragraphs as gov4 } from './governanceOptasia/section4';
import { section5Paragraphs as gov5 } from './governanceOptasia/section5';

// PARTIES IV & V — Nouvelles sections
import { part4Paragraphs } from './livrable1Fusion/part4Products';
import { part5Paragraphs } from './livrable1Fusion/part5BusinessModel';

// Helpers pour les séparateurs de parties
import { TEAL } from './livrable1Fusion/helpers';

function partSeparator(partNum: string, partTitle: string, subtitle: string): Paragraph[] {
  return [
    new Paragraph({ children: [], pageBreakBefore: true }),
    new Paragraph({
      children: [
        new TextRun({ text: `PARTIE ${partNum}`, bold: true, size: 52, font: 'Calibri', color: TEAL }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 1200, after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: partTitle, bold: true, size: 36, font: 'Calibri', color: '0D1B2A' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 160 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: subtitle, size: 22, font: 'Calibri', color: '6B7280', italic: true }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [],
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 12 },
      },
      spacing: { before: 200, after: 1200 },
    }),
    new Paragraph({ children: [], pageBreakBefore: true }),
  ];
}

export async function generateLivrable1FusionOptasia(): Promise<Blob> {
  const allParagraphs: Paragraph[] = [
    // Page de couverture maître
    ...masterCoverParagraphs,

    // Avant-propos et logique de lecture
    ...masterSummaryParagraphs,

    // ─────────────────────────────────────────────────────────────────────────────
    // PARTIE I — Pré-diagnostic et Cartographie Réglementaire
    // ─────────────────────────────────────────────────────────────────────────────
    ...partSeparator(
      'I',
      'PRÉ-DIAGNOSTIC ET CARTOGRAPHIE RÉGLEMENTAIRE',
      'Cartographie UEMOA & CEMAC · Analyse des Gaps · Matrice des Risques · Recommandations · Feuille de Route Opérationnelle'
    ),
    ...prediagCover,
    ...execSummaryParagraphs,
    ...methodologyParagraphs,
    ...uemoaMapParagraphs,
    ...cemacMapParagraphs,
    ...gapsParagraphs,
    ...riskMatrixParagraphs,
    ...recommendationsParagraphs,
    ...roadmapParagraphs,
    ...annexesParagraphs,

    // ─────────────────────────────────────────────────────────────────────────────
    // PARTIE II — Mémorandum de Hardening Réglementaire et Prudentiel
    // ─────────────────────────────────────────────────────────────────────────────
    ...partSeparator(
      'II',
      'MÉMORANDUM DE HARDENING RÉGLEMENTAIRE ET PRUDENTIEL',
      'Sécurisation Absolue contre les Risques d\'Avis Défavorable · UBO & Moralité · Souveraineté Technique · Gouvernance Hard Core · Rémunérations Prudentielles · Matrice de Mitigation'
    ),
    ...hardeningCover,
    ...hard1,
    ...hard2,
    ...hard3,
    ...hard4,
    ...hard5,

    // ─────────────────────────────────────────────────────────────────────────────
    // PARTIE III — Architecture de Gouvernance Cible
    // ─────────────────────────────────────────────────────────────────────────────
    ...partSeparator(
      'III',
      'ARCHITECTURE DE GOUVERNANCE CIBLE DU GROUPE OPTASIA',
      'Chain of Control · Matrice de Délégation de Pouvoirs · Veto Prudentiel · Comités de Contrôle (CAC/CRC/CNR) · Dual-Reporting · Conventions Réglementées · Fit and Proper'
    ),
    ...govCover,
    ...gov1,
    ...gov2,
    ...gov3,
    ...gov4,
    ...gov5,

    // ─────────────────────────────────────────────────────────────────────────────
    // PARTIE IV — Cadre Réglementaire des Produits et Services
    // ─────────────────────────────────────────────────────────────────────────────
    ...part4Paragraphs,

    // ─────────────────────────────────────────────────────────────────────────────
    // PARTIE V — Modèle Économique Conforme pour une Fintech Mondiale
    // ─────────────────────────────────────────────────────────────────────────────
    ...part5Paragraphs,
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS SARL U',
    title: 'Livrable 1 — Édition Intégrée Complète — KHEPRA × OPTASIA — KE-OPT-L1INT-2026-001-V1.0',
    description: 'Document intégré : Pré-diagnostic réglementaire, Mémorandum de Hardening, Architecture de Gouvernance, Cadre réglementaire produits/services, Modèle économique conforme Fintech — Zones UEMOA & CEMAC — 7 pays',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
              bottom: convertInchesToTwip(1),
              left: convertInchesToTwip(1.25),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'KHEPRA EXPERTS × OPTASIA', bold: true, size: 14, font: 'Calibri', color: TEAL }),
                  new TextRun({ text: '  |  ', size: 14, font: 'Calibri', color: '9CA3AF' }),
                  new TextRun({ text: 'Livrable 1 Intégré — Prédiagnostic & Cadre Réglementaire Stratégique', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ text: '  |  Réf. KE-OPT-L1INT-2026-001-V1.0', size: 14, font: 'Calibri', color: '9CA3AF' }),
                ],
                alignment: AlignmentType.RIGHT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'CONFIDENTIEL — STRICTEMENT PRIVÉ — À L\'ATTENTION EXCLUSIVE DU CEO', bold: true, size: 14, font: 'Calibri', color: '991B1B' }),
                  new TextRun({ text: '  |  Page ', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ text: ' / ', size: 14, font: 'Calibri', color: '6B7280' }),
                  new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, font: 'Calibri', color: '6B7280' }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allParagraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}