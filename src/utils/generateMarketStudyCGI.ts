import {
  Document, Packer, Paragraph, Table, TextRun,
  Header, Footer, PageNumber,
  AlignmentType, BorderStyle,
  convertInchesToTwip,
} from 'docx';
import { SILVER, STEEL } from './businessPlanCGI/helpers';
import { coverPage, legalNotice } from './marketStudyCGI/cover';
import { section0 } from './marketStudyCGI/section0';
import { sectorPresentation } from './marketStudyCGI/sectorPresentation';
import { section1 } from './marketStudyCGI/section1';
import { section2 } from './marketStudyCGI/section2';
import { section3 } from './marketStudyCGI/section3';
import { section4 } from './marketStudyCGI/section4';
import { section5 } from './marketStudyCGI/section5';
import { regulatoryFramework } from './marketStudyCGI/regulatoryFramework';
import { esgAnalysis } from './marketStudyCGI/esgAnalysis';
import { porterAnalysis } from './marketStudyCGI/porterAnalysis';
import { riskAnalysis } from './marketStudyCGI/riskAnalysis';
import { strategicImplications } from './marketStudyCGI/strategicImplications';
import { conclusion } from './marketStudyCGI/conclusion';

// ═══════════════════════════════════════════════════════════════════════════════
// ÉTUDE DE MARCHÉ CGI SA — VERSION 2.0 "BIG FOUR INVESTMENT READY"
// Analyse institutionnelle du marché des granulats — Togo & Afrique de l'Ouest
// 13 sections : Executive Summary, Présentation secteur, TAM/SAM/SOM,
// Dynamiques demande, Segmentation produits, Analyse concurrentielle,
// Stratégie prix/export, Cadre réglementaire, Analyse ESG, Porter/SWOT,
// Analyse des risques, Implications stratégiques, Conclusion viabilité
// Standard Big Four (PwC, Deloitte, EY, KPMG) — BIDC / BAD / IFC / Banque Mondiale
// Conforme aux standards IFC Performance Standards 1-8, BAD ISS, BIDC ESG
// Gisement : 201 ha global / 50M+ tonnes / Phase 1 = 24 ha viabilisés
// Capacité : 200-250 TPH — Équipements METSO Nordberg C120 + HP300
// ═══════════════════════════════════════════════════════════════════════════════

export async function generateMarketStudyCGI(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    // ─── PAGE DE GARDE + MENTIONS LÉGALES ───────────────────────────────
    ...coverPage(),
    ...legalNotice(),

    // ─── EXECUTIVE SUMMARY ───────────────────────────────────────────────
    ...section0(),

    // ─── SECTION I-BIS : PRÉSENTATION DU SECTEUR ─────────────────────────
    ...sectorPresentation(),

    // ─── SECTION I : ANALYSE TAM/SAM/SOM ────────────────────────────────
    ...section1(),

    // ─── SECTION II : DYNAMIQUES DE LA DEMANDE ───────────────────────────
    ...section2(),

    // ─── SECTION III : SEGMENTATION PRODUITS ET QUALITÉ ──────────────────
    ...section3(),

    // ─── SECTION IV : ANALYSE CONCURRENTIELLE ────────────────────────────
    ...section4(),

    // ─── SECTION V : STRATÉGIE DE PRIX ET EXPORT ──────────────────────────
    ...section5(),

    // ─── SECTION VI : CADRE RÉGLEMENTAIRE ET INSTITUTIONNEL ──────────────
    ...regulatoryFramework(),

    // ─── SECTION VII : ANALYSE ESG SECTORIELLE ───────────────────────────
    ...esgAnalysis(),

    // ─── SECTION VIII : ANALYSE PORTER ET DIAGNOSTIC STRATÉGIQUE ─────────
    ...porterAnalysis(),

    // ─── SECTION IX : ANALYSE DES RISQUES ────────────────────────────────
    ...riskAnalysis(),

    // ─── SECTION X : IMPLICATIONS STRATÉGIQUES ───────────────────────────
    ...strategicImplications(),

    // ─── CONCLUSION : VIABILITÉ COMMERCIALE ───────────────────────────────
    ...conclusion(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Etude de Marche V2.0 Big Four Investment Ready — CORNERSTONE GROUP INTERNATIONAL (CGI) SA — 13 Sections — Analyse institutionnelle granulats Togo & Afrique de l\'Ouest — BIDC/BAD/IFC',
    description: 'Etude de marche institutionnelle V2.0 Big Four Investment Ready — 13 sections — Executive Summary, Presentation secteur, TAM/SAM/SOM, Dynamiques demande, Segmentation produits, Analyse concurrentielle, Prix/Export, Cadre reglementaire, ESG, Porter/SWOT, Risques, Implications strategiques, Viabilite — Site global 201 ha / 50M+ tonnes / Phase 1 = 24 ha — Standard Big Four',
    subject: 'Mines & Carrieres — Granulats — Togo — BIDC — BAD — IFC — Etude de marche institutionnelle',
    keywords: 'Etude de Marche V2.0, CGI SA, CORNERSTONE GROUP INTERNATIONAL, granulats, Togo, BIDC, BAD, IFC, METSO, Siyime, 201 ha, 50M tonnes, Phase 1 24 ha, TAM, SAM, SOM, ESG, Porter, SWOT, Risques, Big Four, PwC, Deloitte, EY, KPMG',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.0),
              bottom: convertInchesToTwip(1.0),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPRA EXPERTS  |  Etude de Marche V2.0 Big Four Investment Ready — CGI SA — Carrieres Granulats Togo 2026  |  Ref. KE-EM-CGI-2026-002  |  CONFIDENTIEL',
                    size: 15,
                    color: SILVER,
                    font: 'Calibri',
                  }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: '2E5FA3' } },
                spacing: { after: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'KHEPRA EXPERTS — khepraexperts.com  |  Standards BAD · BIDC · IFC · Banque Mondiale · Big Four · IFC PS 1-8  |  V2.0 Big Four Investment Ready  |  Page ',
                    size: 15,
                    color: SILVER,
                    font: 'Calibri',
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 15,
                    color: STEEL,
                    font: 'Calibri',
                    bold: true,
                  }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 2, color: '2E5FA3' } },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allContent,
      },
    ],
  });

  return Packer.toBlob(doc);
}