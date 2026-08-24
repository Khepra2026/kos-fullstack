import jsPDF from 'jspdf';

// ═══════════════════════════════════════════════════════════════════
// PALETTE INSTITUTIONNELLE — BIG FOUR ADVISORY GRADE
// ═══════════════════════════════════════════════════════════════════
export const BLK = [12, 16, 22] as const;
export const GRN = [24, 102, 68] as const;
export const GLD = [194, 158, 60] as const;
export const WHT = [255, 255, 255] as const;
export const CRM = [249, 247, 243] as const;
export const GRY = [78, 82, 88] as const;
export const SGR = [175, 188, 178] as const;
export const DGR = [36, 40, 46] as const;
export const LGR = [235, 237, 239] as const;
export const MGR = [145, 150, 155] as const;
export const TNT = [245, 242, 236] as const;

// ═══════════════════════════════════════════════════════════════════
// DOCUMENT MÉTADONNÉES
// ═══════════════════════════════════════════════════════════════════
export const DOC_REF = 'KHEPRA-BRO-2026-V10.0-KOS-SIA-ISO';
export const DOC_DATE = '12 Juillet 2026';
export const DOC_CLASS = 'CONFIDENTIEL — Diffusion restreinte | KOS Knowledge Operating System™ — 127 Hubs · 101 Edge Functions · 75 Agents IA · 4 Business Units · Triple ISO (42001/27001/9001) · 509 Documents Réglementaires · 332 Sources · 200 Citations Vérifiées · 136 Textes BCEAO/COBAC/GAFI/OHADA · 5 Réseaux Sociaux (LinkedIn+Facebook+Instagram+X+YouTube) · Pipeline YouTube Auto · KBR-Model™ · /pricing · /scan';

// ═══════════════════════════════════════════════════════════════════
// LAYOUT A4 — GRILLE STRICTE 8mm
// ═══════════════════════════════════════════════════════════════════
export const W = 210;
export const H = 297;
export const M = 16;
export const CW = W - M * 2;
export const HDR = 18;
export const FTR = 14;
export const TOP = HDR + 8;
export const BOT = H - FTR - 4;

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHIE — ÉCHELLE COHÉRENTE
// ═══════════════════════════════════════════════════════════════════
export const FONT = 'helvetica';
export const T_HERO = 52;
export const T_H1 = 16;
export const T_H2 = 12;
export const T_H3 = 9.5;
export const T_BODY = 7.5;
export const T_SMALL = 6.5;
export const T_TINY = 5.5;

// ═══════════════════════════════════════════════════════════════════
// ASSETS
// ═══════════════════════════════════════════════════════════════════
export const LOGO_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png';
export const FOUNDER_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/7782181c6cc0a30206af53d49bbf9be9.jpeg';
export const COVER_URL = 'https://readdy.ai/api/search-image?query=heroic%20aerial%20perspective%20of%20a%20modern%20African%20skyline%20at%20golden%20hour%20with%20glass%20towers%20and%20a%20luminescent%20think%20tank%20observatory%20dome%20emerging%20from%20the%20cityscape%2C%20warm%20amber%20and%20emerald%20green%20light%20beams%20connecting%20buildings%20like%20a%20neural%20knowledge%20network%2C%20dark%20premium%20corporate%20atmosphere%20with%20gold%20accents%2C%20abstract%20data%20streams%20flowing%20between%20architecture%20representing%20intelligence%20and%20strategy%2C%20cinematic%20ultra%20wide%20composition%2C%20no%20people%2C%20luxury%20advisory%20brand%20aesthetic%2C%20deep%20charcoal%20sky%20with%20golden%20filaments&width=840&height=1188&seq=khe-cover-2026-v6-bftt&orientation=portrait';

export async function loadImg(url: string): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const r = await fetch(url, { mode: 'cors', cache: 'no-cache', signal: controller.signal });
    clearTimeout(timeoutId);
    if (!r.ok) {
      console.warn(`[Brochure PDF] Image non chargée (${r.status}): ${url.substring(0, 80)}...`);
      return null;
    }
    const blob = await r.blob();
    if (blob.size < 100) {
      console.warn(`[Brochure PDF] Image trop petite (${blob.size} bytes): ${url.substring(0, 80)}...`);
      return null;
    }
    return new Promise((res, rej) => {
      const fr = new FileReader();
      fr.onloadend = () => res(fr.result as string);
      fr.onerror = () => { console.warn(`[Brochure PDF] Erreur FileReader: ${url.substring(0, 80)}...`); res(null); };
      fr.onabort = () => { console.warn(`[Brochure PDF] FileReader abort: ${url.substring(0, 80)}...`); res(null); };
      fr.readAsDataURL(blob);
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`[Brochure PDF] Échec chargement image: ${msg} — ${url.substring(0, 80)}...`);
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════
// COLOR HELPERS
// ═══════════════════════════════════════════════════════════════════
export const tc = (d: jsPDF, c: readonly number[]) => d.setTextColor(c[0], c[1], c[2]);
export const fc = (d: jsPDF, c: readonly number[]) => d.setFillColor(c[0], c[1], c[2]);
export const dc = (d: jsPDF, c: readonly number[]) => d.setDrawColor(c[0], c[1], c[2]);

export function img(d: jsPDF, b64: string | null, x: number, y: number, w: number, h: number) {
  if (!b64) return;
  try {
    const fmt = b64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
    d.addImage(b64, fmt, x, y, w, h);
  } catch { /* silent */ }
}

// ═══════════════════════════════════════════════════════════════════
// TYPOGRAPHY HELPERS — PROPRE, UNIFORMISÉ
// ═══════════════════════════════════════════════════════════════════
export function setFont(d: jsPDF, style: 'n' | 'b' | 'i' | 'bi' = 'n', size = T_BODY) {
  const map: Record<string, string> = { n: 'normal', b: 'bold', i: 'italic', bi: 'bolditalic' };
  d.setFont(FONT, map[style]);
  d.setFontSize(size);
}

export function textBlock(
  d: jsPDF, text: string, x: number, y: number, w: number,
  size = T_BODY, color: readonly number[] = GRY, align: 'left' | 'center' | 'right' = 'left',
  style: 'n' | 'b' | 'i' | 'bi' = 'n', lineH = 1.45
): number {
  setFont(d, style, size);
  tc(d, color);
  const lines = d.splitTextToSize(text, w);
  if (align === 'center') {
    for (let i = 0; i < lines.length; i++) {
      d.text(lines[i], x + w / 2, y + i * size * 0.3528 * lineH, { align: 'center' });
    }
  } else if (align === 'right') {
    d.text(lines, x + w, y, { align: 'right' });
  } else {
    d.text(lines, x, y);
  }
  return y + lines.length * size * 0.3528 * lineH + 1;
}

export function justifyBlock(
  d: jsPDF, text: string, x: number, y: number, w: number,
  size = T_BODY, color: readonly number[] = GRY
): number {
  setFont(d, 'n', size);
  tc(d, color);
  const words = text.split(' ');
  const lines: string[][] = [];
  let cur: string[] = [];
  let cw = 0;
  for (const wd of words) {
    const ww = d.getTextWidth(wd + ' ');
    if (cw + ww > w && cur.length > 0) { lines.push(cur); cur = [wd]; cw = d.getTextWidth(wd + ' '); }
    else { cur.push(wd); cw += ww; }
  }
  if (cur.length) lines.push(cur);
  let cy = y;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i].join(' ');
    const lw = d.getTextWidth(ln);
    if (i === lines.length - 1 || lines[i].length === 1 || lw >= w - 1) {
      d.text(ln, x, cy);
    } else {
      const extra = w - lw;
      const gap = extra / (lines[i].length - 1);
      let cx = x;
      for (let j = 0; j < lines[i].length; j++) {
        d.text(lines[i][j], cx, cy);
        if (j < lines[i].length - 1) cx += d.getTextWidth(lines[i][j] + ' ') + gap;
      }
    }
    cy += size * 0.42;
  }
  return cy + 0.5;
}

export function bullet(
  d: jsPDF, text: string, x: number, y: number, w: number,
  dot: readonly number[] = GLD, size = T_SMALL, color: readonly number[] = GRY
): number {
  fc(d, dot);
  d.circle(x + 1.8, y - 1.2, 0.9, 'F');
  return textBlock(d, text, x + 5.5, y, w - 6, size, color);
}

// ═══════════════════════════════════════════════════════════════════
// HEADER & FOOTER — PROFESSIONNEL
// ═══════════════════════════════════════════════════════════════════
export function header(d: jsPDF, logo: string | null, page: number, totalPages: number, label: string) {
  fc(d, DGR);
  d.rect(0, 0, W, HDR, 'F');
  fc(d, GLD);
  d.rect(0, HDR - 1, W, 1, 'F');

  img(d, logo, M, 3, 12, 12);

  setFont(d, 'b', 9);
  tc(d, WHT);
  d.text('KHEPRA EXPERTS', M + 15, 8.5);
  setFont(d, 'n', 6);
  tc(d, GLD);
  d.text(label, M + 15, 14.5);

  // Référence document
  setFont(d, 'n', 5.5);
  tc(d, MGR);
  d.text(`${DOC_REF}  |  ${DOC_DATE}  |  ${DOC_CLASS}`, W - M, 7, { align: 'right' });

  setFont(d, 'b', 7);
  tc(d, GLD);
  d.text(`${page} / ${totalPages}`, W - M, 10, { align: 'right' });
}

export function footer(d: jsPDF) {
  fc(d, DGR);
  d.rect(0, H - FTR, W, FTR, 'F');
  fc(d, GLD);
  d.rect(0, H - FTR, W, 0.6, 'F');

  setFont(d, 'n', 6);
  tc(d, GLD);
  d.text('contact@khepraexperts.com  |  +228 93 98 49 09  |  Quartier Logogomè, Lomé, Togo  |  khepraexperts.com', W / 2, H - 8, { align: 'center' });
  setFont(d, 'i', 5);
  tc(d, MGR);
  d.text(`${DOC_REF} — ${DOC_CLASS} — Khepra Experts © 2026`, W / 2, H - 4, { align: 'center' });
}

// ═══════════════════════════════════════════════════════════════════
// TITRES DE SECTION — 3 VARIANTES
// ═══════════════════════════════════════════════════════════════════
export function sTitle(d: jsPDF, text: string, y: number): number {
  const h = 10;
  fc(d, DGR);
  d.roundedRect(M, y, CW, h, 1.5, 1.5, 'F');
  fc(d, GLD);
  d.rect(M, y, 3.5, h, 'F');
  setFont(d, 'b', T_H3);
  tc(d, GLD);
  d.text(text, M + 8, y + 6.5);
  return y + 14;
}

export function sTitleAlt(d: jsPDF, text: string, y: number): number {
  const h = 10;
  fc(d, GLD);
  d.roundedRect(M, y, CW, h, 1.5, 1.5, 'F');
  fc(d, DGR);
  d.rect(M, y, 3.5, h, 'F');
  setFont(d, 'b', T_H3);
  tc(d, DGR);
  d.text(text, M + 8, y + 6.5);
  return y + 14;
}

export function sTitleGreen(d: jsPDF, text: string, y: number): number {
  const h = 10;
  fc(d, GRN);
  d.roundedRect(M, y, CW, h, 1.5, 1.5, 'F');
  fc(d, GLD);
  d.rect(M, y, 3.5, h, 'F');
  setFont(d, 'b', T_H3);
  tc(d, GLD);
  d.text(text, M + 8, y + 6.5);
  return y + 14;
}

// ═══════════════════════════════════════════════════════════════════
// LIGNES SÉPARATRICES
// ═══════════════════════════════════════════════════════════════════
export function goldRule(d: jsPDF, x: number, y: number, w: number) {
  fc(d, GLD);
  d.rect(x, y, w, 0.5, 'F');
  fc(d, GRN);
  d.rect(x, y + 1.2, w * 0.28, 0.35, 'F');
}

export function doubleRule(d: jsPDF, x: number, y: number, w: number) {
  fc(d, GLD);
  d.rect(x, y, w, 0.3, 'F');
  fc(d, GRN);
  d.rect(x, y + 0.8, w * 0.3, 0.4, 'F');
}

// ═══════════════════════════════════════════════════════════════════
// BADGES
// ═══════════════════════════════════════════════════════════════════
export function premiumBadge(d: jsPDF, text: string, x: number, y: number, w: number) {
  fc(d, DGR);
  d.roundedRect(x, y, w, 7.5, 1.5, 1.5, 'F');
  fc(d, GLD);
  d.rect(x, y, w, 0.7, 'F');
  setFont(d, 'b', 6);
  tc(d, GLD);
  d.text(text, x + w / 2, y + 5.3, { align: 'center' });
}

export function tagPill(d: jsPDF, text: string, x: number, y: number) {
  const tw = d.getTextWidth(text) + 8;
  fc(d, GRN);
  d.roundedRect(x, y - 4.5, tw, 6.5, 1.2, 1.2, 'F');
  setFont(d, 'b', 6);
  tc(d, GLD);
  d.text(text, x + tw / 2, y, { align: 'center' });
  return tw;
}



