import { Document, Packer, Paragraph, Table, TextRun,
  Header, Footer, PageNumber,
  AlignmentType, BorderStyle,
  convertInchesToTwip,
} from 'docx';
import { SILVER, STEEL } from './businessPlanCGI/helpers';
import { coverPage, legalNotice, executiveDashboard } from './businessPlanCGI/cover';
import { executiveSummaryFull } from './businessPlanCGI/executiveSummaryFull';
import { executiveDashboardMaster } from './businessPlanCGI/executiveDashboardMaster';
import { chapterCompany } from './businessPlanCGI/chapterCompany';
import { chapter1 } from './businessPlanCGI/chapter1';
import { chapter1Extended } from './businessPlanCGI/chapter1Extended';
import { chapter2 } from './businessPlanCGI/chapter2';
import { chapter6 } from './businessPlanCGI/chapter6';
import { chapter7 } from './businessPlanCGI/chapter7';
import { chapter8 } from './businessPlanCGI/chapter8';
import { chapter3 } from './businessPlanCGI/chapter3';
import { chapterHypotheses } from './businessPlanCGI/chapterHypotheses';
import { chapterTresorerie } from './businessPlanCGI/chapterTresorerie';
import { chapter10 } from './businessPlanCGI/chapter10';
import { chapter4 } from './businessPlanCGI/chapter4';
import { chapter12 } from './businessPlanCGI/chapter12';
import { chapter5 } from './businessPlanCGI/chapter5';
import { complianceNote } from './businessPlanCGI/complianceNote';
import { annexes } from './businessPlanCGI/annexes';

// ═══════════════════════════════════════════════════════════════════════════════
// BUSINESS PLAN CGI SA — VERSION 7.0 "BIG FOUR INVESTMENT READY"
// V6.0 + Hypothèses détaillées + Étude de marché enrichie + Réglementation
// + Axes stratégiques 3 Programmes + Suppression Centrale à béton / Préfabrication
// Données gisement : 201 ha global / 50M+ tonnes / Phase 1 = 24 ha
// Financement 3 programmes : 100% dette senior BIDC + cash-flow
// Standard Big Four (PwC, Deloitte, EY, KPMG) — BAD / BIDC / IFC / Banque Mondiale
// ═══════════════════════════════════════════════════════════════════════════════

export async function generateBusinessPlanCGI(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    // ─── PAGE DE GARDE + MENTIONS LÉGALES ───────────────────────────────
    ...coverPage(),
    ...legalNotice(),

    // ─── TABLE OF CONTENTS (EXECUTIVE DASHBOARD) ────────────────────────
    ...executiveDashboard(),

    // ─── SOMMAIRE EXÉCUTIF — TABLEAU DE BORD UNIQUE ET COMPLET (V8.0) ───
    ...executiveDashboardMaster(),

    // ─── RÉSUMÉ EXÉCUTIF COMPLET ─────────────────────────────────────────
    ...executiveSummaryFull(),

    // ─── CHAPITRE 2 : PRÉSENTATION DE L'ENTREPRISE ──────────────────────
    ...chapterCompany(),

    // ─── CHAPITRE 3 : DIAGNOSTIC STRATÉGIQUE + ÉTUDE DE MARCHÉ ──────────
    // Section 1-5 : PESTEL, Porter, TOWS, TAM/SAM/SOM, concurrence, prix
    // Section 6 : Aspects réglementaires (Code Minier, OHADA, BCEAO, ARMP)
    // Section 7-8 : Axes stratégiques + Objectifs Programmes 1-2-3 détaillés
    ...chapter1(),
    ...chapter1Extended(),

    // ─── CHAPITRE 4 : DESCRIPTION TECHNIQUE ─────────────────────────────
    // V7 : Vision développement 2036 sans Centrale à béton ni Préfabrication
    ...chapter2(),

    // ─── CHAPITRE 5 : ESG ET DÉVELOPPEMENT DURABLE ───────────────────────
    ...chapter6(),

    // ─── CHAPITRE 6 : PLAN OPÉRATIONNEL ──────────────────────────────────
    ...chapter7(),

    // ─── CHAPITRE 7 : PLAN D'INVESTISSEMENT CAPEX ────────────────────────
    ...chapter8(),

    // ─── CHAPITRE 8 : HYPOTHÈSES D'ACTIVITÉ ET FINANCIÈRES ────────────────
    // NOUVEAU V7 : 7 sections, 30+ hypothèses documentées, réconciliation
    ...chapterHypotheses(),

    // ─── CHAPITRE 9 : MODÈLE ÉCONOMIQUE ET PRÉVISIONS FINANCIÈRES ────────
    ...chapter3(),

    // ─── CHAPITRE 9B : PLAN DE TRÉSORERIE SYSCOHADA ──────────────────────
    ...chapterTresorerie(),

    // ─── CHAPITRE 10 : STRUCTURE DE FINANCEMENT ──────────────────────────
    ...chapter10(),

    // ─── CHAPITRE 11 : ANALYSE DES RISQUES ────────────────────────────────
    ...chapter4(),

    // ─── CHAPITRE 12 : IMPACT ÉCONOMIQUE ET SOCIAL ───────────────────────
    ...chapter12(),

    // ─── CHAPITRE 13 : CONCLUSION — INVESTMENT CASE ──────────────────────
    ...chapter5(),

    // ─── NOTE DE CONFORMITÉ ───────────────────────────────────────────────
    ...complianceNote(),

    // ─── CHAPITRE 14 : ANNEXES ───────────────────────────────────────────
    ...annexes(),
  ];

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Business Plan V7.0 Big Four Investment Ready — CORNERSTONE GROUP INTERNATIONAL (CGI) SA — Carrière Granulats Togo 2026-2036 — BIDC/BAD/IFC',
    description: 'Business Plan institutionnel V7.0 Big Four Investment Ready — 17 chapitres — Hypothèses détaillées — Étude de marché enrichie — Aspects réglementaires — Axes stratégiques 3 Programmes — Site global 201 ha / 50M+ tonnes / Phase 1 = 24 ha — Standard Big Four',
    subject: 'Mines & Carrières — Granulats — Togo — BIDC — BAD — IFC — Financement — Business Plan — SYSCOHADA',
    keywords: 'Business Plan V7.0, CGI SA, CORNERSTONE GROUP INTERNATIONAL, granulats, Togo, BIDC, BAD, IFC, dette senior, METSO, Siyimé, 201 ha, 50M tonnes, Phase 1 24 ha, 2026-2036, ESG, SYSCOHADA, Hypothèses, Big Four',
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
                    text: 'KHEPRA EXPERTS  |  Business Plan V7.0 Big Four Investment Ready — CGI SA — Carrière Granulats Togo 2026-2036  |  Réf. KE-BP-CGI-2026-001-V7.0  |  CONFIDENTIEL',
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
                    text: 'KHEPRA EXPERTS — khepraexperts.com  |  Standards BAD · BIDC · IFC · Banque Mondiale · Big Four · SYSCOHADA  |  V7.0 Big Four Investment Ready  |  Page ',
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