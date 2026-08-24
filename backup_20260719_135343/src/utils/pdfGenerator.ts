import { jsPDF } from 'jspdf';

export interface PDFDimensionScore {
  name: string;
  nameEn: string;
  score: number;
}

export interface PDFRecommendation {
  action: string;
  actionEn: string;
  delai: string;
  delaiEn: string;
  service: string;
  serviceEn: string;
}

export interface PDFRisk {
  fr: string;
  en: string;
}

export interface PDFToolConfig {
  toolNameFr: string;
  toolNameEn: string;
  toolSubtitleFr: string;
  toolSubtitleEn: string;
  primaryColor: [number, number, number];
  secondaryColor: [number, number, number];
}

export interface PDFData {
  userName: string;
  userOrganization: string;
  globalScore: number;
  levelFr: string;
  levelEn: string;
  dimensions: PDFDimensionScore[];
  recommendations: PDFRecommendation[];
  risks: PDFRisk[];
  config: PDFToolConfig;
  lang: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [15, 118, 110];
}

export function generatePremiumPDF(data: PDFData): void {
  const isFr = data.lang.startsWith('fr');
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentW = pageW - margin * 2;
  const [r, g, b] = data.config.primaryColor;
  const [r2, g2, b2] = data.config.secondaryColor;

  let y = 0;

  // ── Helpers ──
  const setColor = (cr: number, cg: number, cb: number) =>
    doc.setTextColor(cr / 255, cg / 255, cb / 255);
  const setGray = (level: number) => doc.setTextColor(level / 255, level / 255, level / 255);
  const addText = (
    text: string,
    size: number,
    bold: boolean = false,
    color?: [number, number, number],
    align: 'left' | 'center' | 'right' = 'left'
  ) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    if (color) setColor(color[0], color[1], color[2]);
    else setGray(60);
    const lines = doc.splitTextToSize(text, contentW);
    const x = align === 'center' ? pageW / 2 : align === 'right' ? pageW - margin : margin;
    doc.text(lines, x, y, { align });
    y += lines.length * (size * 0.42) + 1.5;
  };

  const addBar = (label: string, score: number, maxW: number = contentW) => {
    const barH = 5;
    const barY = y;
    doc.setFillColor(230, 230, 230);
    doc.roundedRect(margin, barY, maxW, barH, 1, 1, 'F');
    const fillW = (score / 100) * maxW;
    if (fillW > 0) {
      doc.setFillColor(r, g, b);
      doc.roundedRect(margin, barY, fillW, barH, 1, 1, 'F');
    }
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setColor(255, 255, 255);
    doc.text(`${score}/100`, margin + 3, barY + 3.5);
    setGray(60);
    doc.setFont('helvetica', 'normal');
    doc.text(label, margin + maxW + 3, barY + 3.5);
    y += barH + 4;
  };

  const addSectionHeader = (titleFr: string, titleEn: string) => {
    y += 3;
    doc.setFillColor(r, g, b);
    doc.rect(margin, y, 1.5, 8, 'F');
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    setColor(r, g, b);
    doc.text(isFr ? titleFr : titleEn, margin + 4, y + 5.5);
    y += 12;
  };

  const addDivider = () => {
    y += 2;
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageW - margin, y);
    y += 4;
  };

  const checkPageBreak = (needed: number = 30) => {
    if (y + needed > pageH - margin) {
      doc.addPage();
      y = margin;
      // Header on new page
      doc.setFillColor(r, g, b);
      doc.rect(0, 0, pageW, 10, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      setColor(255, 255, 255);
      doc.text('KHEPRA EXPERTS', margin, 7);
      doc.setFont('helvetica', 'normal');
      doc.text(
        isFr ? data.config.toolNameFr : data.config.toolNameEn,
        pageW - margin,
        7,
        { align: 'right' }
      );
      y = 18;
    }
  };

  // ═══════════════════════════════════════
  // PAGE 1 — COVER
  // ═══════════════════════════════════════
  // Background gradient simulation
  doc.setFillColor(250, 250, 250);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Top accent bar
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, 3, 'F');

  // Logo area
  y = 25;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  setColor(r, g, b);
  doc.text('KHEPRA EXPERTS', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  setGray(120);
  doc.text(
    isFr ? 'Cabinet de Conseil Stratégique' : 'Strategic Consulting Firm',
    margin,
    y + 4
  );

  y = 55;

  // Main title
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  setColor(30, 30, 30);
  const titleLines = doc.splitTextToSize(
    isFr ? data.config.toolNameFr : data.config.toolNameEn,
    contentW
  );
  doc.text(titleLines, margin, y);
  y += titleLines.length * 10 + 4;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  setGray(100);
  const subLines = doc.splitTextToSize(
    isFr ? data.config.toolSubtitleFr : data.config.toolSubtitleEn,
    contentW
  );
  doc.text(subLines, margin, y);
  y += subLines.length * 5 + 8;

  addDivider();

  // User info
  if (data.userName) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setGray(80);
    doc.text(isFr ? 'Préparé pour' : 'Prepared for', margin, y);
    y += 5;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    setColor(30, 30, 30);
    doc.text(data.userName, margin, y);
    y += 6;
    if (data.userOrganization) {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      setGray(100);
      doc.text(data.userOrganization, margin, y);
      y += 5;
    }
    y += 4;
  }

  // Date
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setGray(120);
  const dateStr = new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  doc.text(`${isFr ? 'Date' : 'Date'}: ${dateStr}`, margin, y);
  y += 6;
  doc.setFontSize(8);
  setGray(150);
  doc.text(
    isFr
      ? 'Ce rapport est confidentiel et destiné à usage interne.'
      : 'This report is confidential and for internal use only.',
    margin,
    y
  );

  // Score preview on cover
  y = pageH - 70;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, contentW, 55, 3, 3, 'F');

  const scoreY = y + 18;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setGray(100);
  doc.text(
    isFr ? 'SCORE GLOBAL' : 'GLOBAL SCORE',
    pageW / 2,
    scoreY - 6,
    { align: 'center' }
  );

  doc.setFontSize(36);
  doc.setFont('helvetica', 'bold');
  setColor(r, g, b);
  doc.text(`${data.globalScore}`, pageW / 2, scoreY + 8, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setGray(80);
  doc.text('/100', pageW / 2 + 22, scoreY + 8, { align: 'left' });

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  setColor(r2, g2, b2);
  doc.text(
    isFr ? data.levelFr : data.levelEn,
    pageW / 2,
    scoreY + 18,
    { align: 'center' }
  );

  // Footer
  doc.setFillColor(240, 240, 240);
  doc.rect(0, pageH - 12, pageW, 12, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  setGray(140);
  doc.text('khepraexperts.com', margin, pageH - 5);
  doc.text(
    isFr ? 'Page 1' : 'Page 1',
    pageW - margin,
    pageH - 5,
    { align: 'right' }
  );

  // ═══════════════════════════════════════
  // PAGE 2 — SCORES DÉTAILLÉS
  // ═══════════════════════════════════════
  doc.addPage();
  y = margin;

  // Header
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(255, 255, 255);
  doc.text('KHEPRA EXPERTS', margin, 7);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isFr ? data.config.toolNameFr : data.config.toolNameEn,
    pageW - margin,
    7,
    { align: 'right' }
  );
  y = 18;

  addSectionHeader('Scores par Dimension', 'Scores by Dimension');

  data.dimensions.forEach((dim) => {
    checkPageBreak(20);
    addBar(isFr ? dim.name : dim.nameEn, dim.score, contentW * 0.75);
  });

  y += 4;
  addDivider();

  // ═══════════════════════════════════════
  // PAGE 3 — ANALYSE & RISQUES
  // ═══════════════════════════════════════
  doc.addPage();
  y = margin;

  // Header
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(255, 255, 255);
  doc.text('KHEPRA EXPERTS', margin, 7);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isFr ? data.config.toolNameFr : data.config.toolNameEn,
    pageW - margin,
    7,
    { align: 'right' }
  );
  y = 18;

  addSectionHeader('Analyse & Risques Identifiés', 'Analysis & Identified Risks');

  // Score interpretation
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setGray(60);
  let interpretation = '';
  if (isFr) {
    if (data.globalScore < 40)
      interpretation =
        "Votre organisation présente des lacunes significatives qui nécessitent une attention immédiate. Les risques opérationnels et stratégiques sont élevés.";
    else if (data.globalScore < 70)
      interpretation =
        "Votre organisation dispose d'une base solide mais des améliorations substantielles sont nécessaires pour atteindre l'excellence.";
    else
      interpretation =
        "Votre organisation démontre un niveau de maturité avancé. Continuez à optimiser et à anticiper les évolutions.";
  } else {
    if (data.globalScore < 40)
      interpretation =
        'Your organization has significant gaps requiring immediate attention. Operational and strategic risks are high.';
    else if (data.globalScore < 70)
      interpretation =
        'Your organization has a solid foundation but substantial improvements are needed to achieve excellence.';
    else
      interpretation =
        'Your organization demonstrates an advanced maturity level. Continue optimizing and anticipating changes.';
  }
  const interpLines = doc.splitTextToSize(interpretation, contentW);
  doc.text(interpLines, margin, y);
  y += interpLines.length * 4.5 + 6;

  addDivider();

  // Risks
  if (data.risks.length > 0) {
    addSectionHeader('Risques Prioritaires', 'Priority Risks');
    data.risks.forEach((risk, i) => {
      checkPageBreak(12);
      doc.setFillColor(255, 245, 240);
      doc.roundedRect(margin, y, contentW, 10, 1.5, 1.5, 'F');
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      setColor(200, 80, 60);
      doc.text(`${i + 1}.`, margin + 3, y + 6);
      doc.setFont('helvetica', 'normal');
      setGray(60);
      const riskText = isFr ? risk.fr : risk.en;
      const riskLines = doc.splitTextToSize(riskText, contentW - 14);
      doc.text(riskLines, margin + 10, y + 6);
      y += Math.max(12, riskLines.length * 4 + 4);
    });
    y += 4;
  }

  // ═══════════════════════════════════════
  // PAGE 4 — RECOMMANDATIONS
  // ═══════════════════════════════════════
  doc.addPage();
  y = margin;

  // Header
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(255, 255, 255);
  doc.text('KHEPRA EXPERTS', margin, 7);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isFr ? data.config.toolNameFr : data.config.toolNameEn,
    pageW - margin,
    7,
    { align: 'right' }
  );
  y = 18;

  addSectionHeader('Recommandations Stratégiques', 'Strategic Recommendations');

  data.recommendations.forEach((rec, i) => {
    checkPageBreak(25);

    // Number badge
    doc.setFillColor(r, g, b);
    doc.circle(margin + 4, y + 4, 4, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    setColor(255, 255, 255);
    doc.text(`${i + 1}`, margin + 4, y + 5.5, { align: 'center' });

    // Action text
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setColor(30, 30, 30);
    const actionText = isFr ? rec.action : rec.actionEn;
    const actionLines = doc.splitTextToSize(actionText, contentW - 18);
    doc.text(actionLines, margin + 12, y + 4);
    y += actionLines.length * 4.2 + 2;

    // Meta info
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    setGray(100);
    const delai = isFr ? rec.delai : rec.delaiEn;
    const service = isFr ? rec.service : rec.serviceEn;
    doc.text(
      `${isFr ? 'Délai' : 'Timeline'}: ${delai}  |  ${isFr ? 'Service' : 'Service'}: ${service}`,
      margin + 12,
      y
    );
    y += 10;
  });

  y += 4;
  addDivider();

  // ═══════════════════════════════════════
  // PAGE 5 — CTA
  // ═══════════════════════════════════════
  doc.addPage();
  y = margin;

  // Header
  doc.setFillColor(r, g, b);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(255, 255, 255);
  doc.text('KHEPRA EXPERTS', margin, 7);
  doc.setFont('helvetica', 'normal');
  doc.text(
    isFr ? data.config.toolNameFr : data.config.toolNameEn,
    pageW - margin,
    7,
    { align: 'right' }
  );
  y = 18;

  addSectionHeader('Prochaines Étapes', 'Next Steps');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setGray(60);
  const ctaText = isFr
    ? "Ce diagnostic automatisé vous donne un aperçu de votre maturité. Pour aller plus loin, nos consultants certifiés peuvent réaliser un audit approfondi et élaborer un plan d'action sur mesure."
    : 'This automated diagnostic gives you an overview of your maturity. To go further, our certified consultants can conduct an in-depth audit and develop a tailored action plan.';
  const ctaLines = doc.splitTextToSize(ctaText, contentW);
  doc.text(ctaLines, margin, y);
  y += ctaLines.length * 4.5 + 8;

  // Contact box
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin, y, contentW, 45, 3, 3, 'F');
  doc.setDrawColor(r, g, b);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, contentW, 45, 3, 3, 'S');

  const boxY = y + 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  setColor(r, g, b);
  doc.text(
    isFr ? 'Contactez KHEPRA EXPERTS' : 'Contact KHEPRA EXPERTS',
    pageW / 2,
    boxY,
    { align: 'center' }
  );

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  setGray(80);
  doc.text('khepraexperts.com', pageW / 2, boxY + 8, { align: 'center' });
  doc.text(
    isFr
      ? 'Email: contact@khepraexperts.com | Tél: +228 XX XX XX XX'
      : 'Email: contact@khepraexperts.com | Phone: +228 XX XX XX XX',
    pageW / 2,
    boxY + 14,
    { align: 'center' }
  );
  doc.setFont('helvetica', 'bold');
  setColor(r, g, b);
  doc.text(
    isFr
      ? 'Demandez une consultation gratuite de 30 minutes'
      : 'Request a free 30-minute consultation',
    pageW / 2,
    boxY + 24,
    { align: 'center' }
  );

  y += 55;

  // Disclaimer
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  setGray(160);
  const disclaimer = isFr
    ? "Ce rapport est généré automatiquement à titre indicatif. Il ne constitue pas un avis professionnel exhaustif. Pour un audit complet, contactez KHEPRA EXPERTS."
    : 'This report is automatically generated for indicative purposes. It does not constitute a comprehensive professional opinion. For a full audit, contact KHEPRA EXPERTS.';
  const discLines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(discLines, margin, y);

  // Final footer
  doc.setFillColor(240, 240, 240);
  doc.rect(0, pageH - 12, pageW, 12, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  setGray(140);
  doc.text('khepraexperts.com', margin, pageH - 5);
  doc.text(
    `© ${new Date().getFullYear()} KHEPRA EXPERTS`,
    pageW - margin,
    pageH - 5,
    { align: 'right' }
  );

  // Save
  const safeName = (data.userOrganization || 'Organisation')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 30);
  const toolSlug = (isFr ? data.config.toolNameFr : data.config.toolNameEn)
    .replace(/[^a-zA-Z0-9]/g, '_')
    .substring(0, 20);
  const dateSlug = new Date().toISOString().split('T')[0];
  doc.save(`Khepra_${toolSlug}_${safeName}_${dateSlug}.pdf`);
}

// Predefined color palettes for each tool
export const PDF_PALETTES = {
  teal: { primary: hexToRgb('#0f766e'), secondary: hexToRgb('#059669') },
  blue: { primary: hexToRgb('#2563eb'), secondary: hexToRgb('#4f46e5') },
  purple: { primary: hexToRgb('#7c3aed'), secondary: hexToRgb('#db2777') },
  red: { primary: hexToRgb('#dc2626'), secondary: hexToRgb('#b91c1c') },
  amber: { primary: hexToRgb('#d97706'), secondary: hexToRgb('#b45309') },
  emerald: { primary: hexToRgb('#059669'), secondary: hexToRgb('#047857') },
} as const;



