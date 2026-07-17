import jsPDF from 'jspdf';
import {
  tc, fc, dc, setFont, textBlock, justifyBlock, bullet,
  W, M, CW, HDR, FTR, H, TOP, BOT,
  BLK, GRN, GLD, WHT, CRM, GRY, SGR, DGR, LGR, MGR, TNT,
  T_BODY, T_SMALL, T_TINY, T_H2, T_H3,
} from './config';

// ═══════════════════════════════════════════════════════════════════
// KPI STAT BOX — VERTICAL, IMPACT VISUEL AMÉLIORÉ
// ═══════════════════════════════════════════════════════════════════
export function statBox(d: jsPDF, val: string, lbl: string, x: number, y: number, w: number, h = 26) {
  // Fond carte
  fc(d, DGR);
  d.roundedRect(x, y, w, h, 2.5, 2.5, 'F');
  // Accent top
  fc(d, GLD);
  d.roundedRect(x, y, w, 1.2, 1, 1, 'F');
  // Ligne verte subtile
  fc(d, GRN);
  d.rect(x + w * 0.15, y + 1.8, w * 0.7, 0.25, 'F');

  // Valeur
  setFont(d, 'b', 20);
  tc(d, GLD);
  d.text(val, x + w / 2, y + 13, { align: 'center' });

  // Label sur 2 lignes max
  setFont(d, 'n', 5.5);
  tc(d, SGR);
  const ll = d.splitTextToSize(lbl, w - 6);
  d.text(ll, x + w / 2, y + 20.5, { align: 'center' });
}

export function statBoxLight(d: jsPDF, val: string, lbl: string, x: number, y: number, w: number, h = 26) {
  fc(d, WHT);
  d.roundedRect(x, y, w, h, 2, 2, 'F');
  fc(d, GRN);
  d.rect(x, y, w, 0.8, 'F');

  setFont(d, 'b', 18);
  tc(d, GRN);
  d.text(val, x + w / 2, y + 13, { align: 'center' });

  setFont(d, 'n', T_SMALL);
  tc(d, GRY);
  const ll = d.splitTextToSize(lbl, w - 6);
  d.text(ll, x + w / 2, y + 20.5, { align: 'center' });
}

export function statBoxGold(d: jsPDF, val: string, lbl: string, x: number, y: number, w: number, h = 26) {
  fc(d, GLD);
  d.roundedRect(x, y, w, h, 2, 2, 'F');
  fc(d, GRN);
  d.rect(x, y, w, 0.8, 'F');

  setFont(d, 'b', 18);
  tc(d, GRN);
  d.text(val, x + w / 2, y + 13, { align: 'center' });

  setFont(d, 'n', T_SMALL);
  tc(d, [55, 55, 55]);
  const ll = d.splitTextToSize(lbl, w - 6);
  d.text(ll, x + w / 2, y + 20.5, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// EXPERT CARD — OFFRE STRATÉGIQUE, DESIGN PROPRE
// ═══════════════════════════════════════════════════════════════════
export function expertCard(
  d: jsPDF, num: string, title: string, items: string[],
  x: number, y: number, w: number
): number {
  const tl = d.splitTextToSize(title, w - 14);
  let h = 5 + tl.length * 4 + 2;
  for (const it of items) h += d.splitTextToSize(it, w - 16).length * 3.8 + 1.3;
  h += 5;

  // Fond carte
  fc(d, WHT);
  d.roundedRect(x, y, w, h, 2, 2, 'F');
  fc(d, GRN);
  d.roundedRect(x, y, 3.5, h, 1.5, 1.5, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.7, 'F');

  // Numéro
  setFont(d, 'b', 7);
  tc(d, GLD);
  d.text(num, x + 6, y + 6);

  // Titre
  setFont(d, 'b', 8.5);
  tc(d, GRN);
  d.text(tl, x + 9, y + 11);
  let cy = y + 11 + tl.length * 4 + 2.5;

  // Items
  for (const it of items) {
    fc(d, GLD);
    d.circle(x + 7.5, cy - 0.8, 0.7, 'F');
    setFont(d, 'n', 7);
    tc(d, GRY);
    const il = d.splitTextToSize(it, w - 16);
    d.text(il, x + 11.5, cy);
    cy += il.length * 3.8 + 1.3;
  }

  // Finition border bottom
  fc(d, GLD);
  d.rect(x, y + h - 0.6, w, 0.3, 'F');

  return y + h + 4;
}

// ═══════════════════════════════════════════════════════════════════
// STEP BOX — MÉTHODOLOGIE 4 PHASES (PREMIUM UPGRADE)
// ═══════════════════════════════════════════════════════════════════
export function stepBox(d: jsPDF, n: string, title: string, desc: string, x: number, y: number, w: number, h = 36) {
  fc(d, WHT);
  d.roundedRect(x, y, w, h, 2, 2, 'F');
  // Accent top
  fc(d, GRN);
  d.rect(x, y, w, 1, 'F');
  // Ligne or sous l'accent
  fc(d, GLD);
  d.rect(x + w * 0.2, y + 1.3, w * 0.6, 0.3, 'F');

  // Cercle numéro
  fc(d, GRN);
  d.circle(x + w / 2, y + 13, 7, 'F');
  fc(d, GLD);
  d.circle(x + w / 2, y + 13, 5.5, 'F');
  setFont(d, 'b', 14);
  tc(d, GRN);
  d.text(n, x + w / 2, y + 16, { align: 'center' });

  // Titre
  setFont(d, 'b', 8);
  tc(d, DGR);
  d.text(title, x + w / 2, y + 23.5, { align: 'center' });

  // Description
  setFont(d, 'n', 5.5);
  tc(d, GRY);
  const dl = d.splitTextToSize(desc, w - 6);
  d.text(dl, x + w / 2, y + 29, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// TIMELINE STEP — COUVERTURE
// ═══════════════════════════════════════════════════════════════════
export function timelineStep(d: jsPDF, n: string, title: string, desc: string, x: number, y: number, w: number, isLast = false) {
  const r = 7.5;
  fc(d, DGR);
  d.circle(x + w / 2, y + r, r, 'F');
  fc(d, GLD);
  d.circle(x + w / 2, y + r, r - 1.5, 'F');

  setFont(d, 'b', 9);
  tc(d, DGR);
  d.text(n, x + w / 2, y + r + 3, { align: 'center' });

  if (!isLast) {
    fc(d, GLD);
    d.rect(x + w / 2 + r, y + r - 0.5, w - r * 2, 1, 'F');
  }

  setFont(d, 'b', 7.5);
  tc(d, WHT);
  d.text(title, x + w / 2, y + r * 2 + 4, { align: 'center' });

  setFont(d, 'n', T_SMALL);
  tc(d, SGR);
  const dl = d.splitTextToSize(desc, w - 4);
  d.text(dl, x + w / 2, y + r * 2 + 11, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// PROGRESS BAR — POURCENTAGE LINÉAIRE
// ═══════════════════════════════════════════════════════════════════
export function progressBar(d: jsPDF, label: string, pct: number, x: number, y: number, w: number, color: readonly number[] = GRN) {
  fc(d, LGR);
  d.roundedRect(x, y, w, 5, 1, 1, 'F');
  fc(d, color);
  const fw = Math.max((w * pct) / 100, 2);
  d.roundedRect(x, y, fw, 5, 1, 1, 'F');
  setFont(d, 'b', T_SMALL);
  tc(d, DGR);
  d.text(label, x, y - 1.5);
  setFont(d, 'b', T_SMALL);
  tc(d, color);
  d.text(`${pct}%`, x + w + 3, y + 3.5);
}

// ═══════════════════════════════════════════════════════════════════
// SCORE GAUGE — BARRE COLORÉE AVEC SCORE
// ═══════════════════════════════════════════════════════════════════
export function scoreGauge(d: jsPDF, label: string, score: number, x: number, y: number, w: number) {
  const barH = 5;
  fc(d, LGR);
  d.roundedRect(x, y, w, barH, 1, 1, 'F');
  const fw = Math.max((w * score) / 100, 2);
  const color = score >= 80 ? GRN : score >= 50 ? GLD : [195, 72, 58];
  fc(d, color);
  d.roundedRect(x, y, fw, barH, 1, 1, 'F');
  setFont(d, 'b', T_SMALL);
  tc(d, DGR);
  d.text(label, x, y - 1.5);
  setFont(d, 'b', T_SMALL);
  tc(d, color);
  d.text(`${score}/100`, x + w + 3, y + 3.5);
}

// ═══════════════════════════════════════════════════════════════════
// MILESTONE TIMELINE — ROADMAP 18 MOIS (PREMIUM UPGRADE)
// ═══════════════════════════════════════════════════════════════════
export function milestoneTimeline(d: jsPDF, milestones: { m: string; d: string }[], x: number, y: number, w: number) {
  const spacing = w / (milestones.length - 1);
  const lineY = y + 9;

  // Ligne double
  fc(d, GLD);
  d.rect(x, lineY, w, 0.8, 'F');
  fc(d, GRN);
  d.rect(x, lineY + 1.2, w, 0.4, 'F');

  milestones.forEach((ms, i) => {
    const mx = x + i * spacing;
    // Cercle extérieur
    fc(d, GRN);
    d.circle(mx, lineY + 1, 4, 'F');
    // Cercle intérieur
    fc(d, GLD);
    d.circle(mx, lineY + 1, 2.5, 'F');
    // Numéro
    setFont(d, 'b', 5.5);
    tc(d, GRN);
    d.text(`${i + 1}`, mx, lineY + 2.6, { align: 'center' });

    // Mois
    setFont(d, 'b', 6.5);
    tc(d, DGR);
    d.text(ms.m, mx, y + 19, { align: 'center' });

    // Description
    setFont(d, 'n', 5.5);
    tc(d, GRY);
    const dl = d.splitTextToSize(ms.d, spacing - 6);
    d.text(dl, mx, y + 24, { align: 'center' });
  });
}



// ═══════════════════════════════════════════════════════════════════
// MATURITY TABLE — DIAGNOSTIC 5 DIMENSIONS (PREMIUM UPGRADE)
// ═══════════════════════════════════════════════════════════════════
export function maturityTable(
  d: jsPDF,
  categories: { label: string; score: number; desc: string; indicators: string }[],
  x: number, y: number, w: number
): number {
  const rowH = 12.5;
  const headerH = 8;
  const gapX = 3;

  // Header premium
  fc(d, DGR);
  d.roundedRect(x, y, w, headerH, 1.5, 1.5, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.6, 'F');
  setFont(d, 'b', 6);
  tc(d, GLD);
  d.text('DIMENSION', x + 18, y + 5.3, { align: 'center' });
  d.text('SCORE / NIVEAU', x + 56, y + 5.3, { align: 'center' });
  d.text('INDICATEURS CLÉS DE MATURITÉ', x + w - gapX, y + 5.3, { align: 'right' });

  let cy = y + headerH;

  categories.forEach((cat, i) => {
    const ry = cy + i * rowH;
    // Fond alterné
    fc(d, i % 2 === 0 ? TNT : WHT);
    d.rect(x, ry, w, rowH, 'F');
    // Séparateur léger
    dc(d, LGR);
    d.setLineWidth(0.1);
    d.line(x, ry, x + w, ry);

    // Score color
    const color = cat.score >= 80 ? GRN : cat.score >= 50 ? GLD : [195, 72, 58];

    // Label dimension + mini icône cercle
    fc(d, color);
    d.circle(x + 6, ry + rowH / 2, 2.5, 'F');
    setFont(d, 'b', 7);
    tc(d, DGR);
    d.text(cat.label, x + 11, ry + 5.5);
    // Description sous label
    setFont(d, 'n', 5.5);
    tc(d, GRY);
    d.text(cat.desc, x + 11, ry + 9.2);

    // Barre de score élargie
    const barX = x + 42;
    const barW = 28;
    const barH = 3.5;
    const barY = ry + (rowH - barH) / 2 - 1;
    fc(d, LGR);
    d.roundedRect(barX, barY, barW, barH, 0.8, 0.8, 'F');
    fc(d, color);
    const fw = Math.max((barW * cat.score) / 100, 1.5);
    d.roundedRect(barX, barY, fw, barH, 0.8, 0.8, 'F');
    // Score chiffre
    setFont(d, 'b', 8);
    tc(d, color);
    d.text(`${cat.score}`, barX + barW + 4, ry + rowH / 2 + 1.8, { align: 'left' });
    setFont(d, 'n', 5.5);
    d.text('/100', barX + barW + 10, ry + rowH / 2 + 1.8, { align: 'left' });

    // Indicateurs
    setFont(d, 'n', 5.5);
    tc(d, GRY);
    const il = d.splitTextToSize(cat.indicators, w - barX - barW - 26);
    d.text(il, barX + barW + 18, ry + rowH / 2 - 1.5);
  });

  const totalH = headerH + categories.length * rowH;
  dc(d, LGR);
  d.setLineWidth(0.25);
  d.roundedRect(x, y, w, totalH, 2, 2);
  return y + totalH + 4;
}

// ═══════════════════════════════════════════════════════════════════
// PROCESS CASCADING — ÉTAPES LINÉAIRES AVEC FLÈCHES
// ═══════════════════════════════════════════════════════════════════
export function processCascading(d: jsPDF, steps: { n: string; t: string; d: string }[], x: number, y: number, w: number) {
  const stepW = (w - (steps.length - 1) * 4) / steps.length;
  steps.forEach((s, i) => {
    const sx = x + i * (stepW + 4);
    const h = 28;
    fc(d, WHT);
    d.roundedRect(sx, y, stepW, h, 2, 2, 'F');
    fc(d, GRN);
    d.rect(sx, y, stepW, 0.8, 'F');

    setFont(d, 'b', 14);
    tc(d, GRN);
    d.text(s.n, sx + stepW / 2, y + 10, { align: 'center' });

    setFont(d, 'b', 7);
    tc(d, DGR);
    d.text(s.t, sx + stepW / 2, y + 17, { align: 'center' });

    setFont(d, 'n', 5.5);
    tc(d, GRY);
    const dl = d.splitTextToSize(s.d, stepW - 5);
    d.text(dl, sx + stepW / 2, y + 22, { align: 'center' });

    if (i < steps.length - 1) {
      setFont(d, 'b', 10);
      tc(d, GLD);
      d.text('▸', sx + stepW + 2.5, y + 14, { align: 'center' });
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// TESTIMONIAL CARD — CITATION INSTITUTIONNELLE
// ═══════════════════════════════════════════════════════════════════
export function testimonialCard(d: jsPDF, quote: string, author: string, x: number, y: number, w: number, h = 36) {
  fc(d, TNT);
  d.roundedRect(x, y, w, h, 2, 2, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.7, 'F');
  fc(d, GRN);
  d.rect(x, y, 3.5, h, 'F');

  setFont(d, 'b', 22);
  tc(d, GLD);
  d.text('\u201C', x + 6, y + 13);

  setFont(d, 'i', 7);
  tc(d, GRY);
  const ql = d.splitTextToSize(quote, w - 12);
  d.text(ql, x + 8, y + 18);

  fc(d, GRN);
  d.rect(x + 8, y + h - 8, 16, 0.4, 'F');
  setFont(d, 'b', 6);
  tc(d, GRN);
  d.text(author, x + 8, y + h - 3);
}

// ═══════════════════════════════════════════════════════════════════
// CONTACT CTA BLOCK — PIED DE PAGE PREMIUM
// ═══════════════════════════════════════════════════════════════════
export function contactBlock(
  d: jsPDF,
  items: { icon: string; label: string; val: string }[],
  x: number, y: number, w: number, h: number
) {
  fc(d, DGR);
  d.roundedRect(x, y, w, h, 3, 3, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.8, 'F');
  fc(d, GRN);
  d.rect(x, y, 3.5, h, 'F');

  const colW = w / items.length;
  items.forEach((it, i) => {
    const cx = x + i * colW;
    if (i > 0) {
      dc(d, GLD);
      d.setLineWidth(0.2);
      d.line(cx, y + 12, cx, y + h - 10);
    }

    // Icône Unicode
    setFont(d, 'b', 14);
    tc(d, GLD);
    d.text(it.icon, cx + colW / 2, y + 22, { align: 'center' });

    setFont(d, 'b', 7.5);
    tc(d, GLD);
    d.text(it.label, cx + colW / 2, y + 30, { align: 'center' });

    setFont(d, 'n', T_SMALL);
    tc(d, SGR);
    const vl = d.splitTextToSize(it.val, colW - 10);
    d.text(vl, cx + colW / 2, y + 37, { align: 'center' });
  });
}

// ═══════════════════════════════════════════════════════════════════
// NDA BANNER — PIED DE PAGE CONFIDENTIALITÉ
// ═══════════════════════════════════════════════════════════════════
export function ndaBanner(d: jsPDF, x: number, y: number, w: number, text: string) {
  fc(d, GRN);
  d.roundedRect(x + w / 2 - 48, y, 96, 8, 1.5, 1.5, 'F');
  setFont(d, 'b', 6.5);
  tc(d, GLD);
  d.text(text, x + w / 2, y + 5, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// CASE STUDY BOX — ÉTUDE DE CAS STRUCTURÉE
// ═══════════════════════════════════════════════════════════════════
export function caseStudyBox(
  d: jsPDF, header: string, context: string, mission: string, results: string,
  x: number, y: number, w: number
): number {
  fc(d, DGR);
  d.roundedRect(x, y, w, 45, 2.5, 2.5, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.8, 'F');
  fc(d, GRN);
  d.rect(x, y, 3.5, 45, 'F');

  setFont(d, 'b', 8);
  tc(d, GLD);
  d.text(header, x + 8, y + 8);

  const sections = [
    { label: 'CONTEXTE', text: context },
    { label: 'MISSION', text: mission },
    { label: 'RÉSULTATS', text: results },
  ];

  let sy = y + 14;
  for (const sec of sections) {
    setFont(d, 'b', 6.5);
    tc(d, GLD);
    d.text(sec.label, x + 8, sy + 3);
    setFont(d, 'n', 6.5);
    tc(d, SGR);
    const tl = d.splitTextToSize(sec.text, w - 16);
    d.text(tl, x + 8, sy + 7);
    sy += tl.length * 2.5 + 8;
  }

  return y + 49;
}

// ═══════════════════════════════════════════════════════════════════
// COMPARISON TABLE — TABLEAU COMPARATIF
// ═══════════════════════════════════════════════════════════════════
export function comparisonTable(d: jsPDF, headers: string[], rows: string[][], x: number, y: number, w: number) {
  const colW = w / headers.length;
  const rowH = 7;
  fc(d, GRN);
  d.roundedRect(x, y, w, rowH, 1, 1, 'F');
  setFont(d, 'b', T_SMALL);
  tc(d, GLD);
  headers.forEach((h, i) => d.text(h, x + colW * i + colW / 2, y + 4.5, { align: 'center' }));
  rows.forEach((row, ri) => {
    const ry = y + rowH + ri * rowH;
    fc(d, ri % 2 === 0 ? TNT : WHT);
    d.rect(x, ry, w, rowH, 'F');
    setFont(d, 'n', 6);
    tc(d, GRY);
    row.forEach((cell, ci) => d.text(cell, x + colW * ci + 2, ry + 4.5));
  });
}