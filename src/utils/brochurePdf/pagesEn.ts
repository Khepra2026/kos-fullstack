import jsPDF from 'jspdf';
import {
  W, H, M, CW, TOP, BOT,
  BLK, GRN, GLD, WHT, CRM, GRY, SGR, DGR, LGR, HDR,
  tc, fc, dc, img, setFont, textBlock, justifyBlock, bullet,
  header, footer, sTitle, sTitleAlt, sTitleGreen, goldRule, premiumBadge,
  T_HERO, T_H1, T_H2, T_H3, T_BODY, T_SMALL, T_TINY,
  DOC_REF, DOC_DATE, DOC_CLASS,
} from './config';
import {
  statBox, statBoxLight, expertCard, stepBox, timelineStep,
  testimonialCard, milestoneTimeline, maturityTable,
  contactBlock, ndaBanner, caseStudyBox,
} from './components';

const TOTAL_PAGES = 6;

// ═══════════════════════════════════════════════════════════════
// PAGE 1 — INSTITUTIONAL COVER — KOS KNOWLEDGE OPERATING SYSTEM™
// ═══════════════════════════════════════════════════════════════
export async function drawPage1En(doc: jsPDF, logo: string | null, coverImg: string | null, founderImg: string | null) {
  fc(doc, DGR);
  doc.rect(0, 0, W, H, 'F');

  if (coverImg) {
    img(doc, coverImg, 0, 0, W, H);
    fc(doc, DGR);
    try { doc.setGState(new (doc as any).GState({ opacity: 0.45 })); } catch { /* */ }
    doc.rect(0, 0, W, H, 'F');
    try { doc.setGState(new (doc as any).GState({ opacity: 1 })); } catch { /* */ }
  } else {
    fc(doc, GRN);
    for (let i = 0; i < 12; i++) {
      const rx = (i % 4) * (W / 3.8) - 30;
      const ry = Math.floor(i / 4) * (H / 3) - 10;
      doc.setLineWidth(0.15);
      dc(doc, [...GLD, 0.08] as any);
      doc.roundedRect(rx, ry, W / 2.5, H / 2.5, 8, 8);
    }
    fc(doc, [...DGR, 0.6] as any);
    doc.rect(0, 0, W, H, 'F');
  }

  fc(doc, GRN);
  doc.rect(0, 0, 5, H, 'F');
  fc(doc, GLD);
  doc.rect(5, 0, 1.5, H, 'F');

  fc(doc, GLD);
  doc.roundedRect(18, 12, 120, 9, 2, 2, 'F');
  setFont(doc, 'b', 7.5);
  tc(doc, GRN);
  doc.text('KOS REGTECH AI™ — KNOWLEDGE OPERATING SYSTEM · 4 BUSINESS UNITS', 78, 17.5, { align: 'center' });

  img(doc, logo, 18, 30, 15, 15);
  if (!logo) {
    fc(doc, GRN);
    doc.roundedRect(18, 30, 15, 15, 2, 2, 'F');
    setFont(doc, 'b', 8);
    tc(doc, GLD);
    doc.text('KE', 25.5, 39.5, { align: 'center' });
  }
  setFont(doc, 'b', 9);
  tc(doc, WHT);
  doc.text('KHEPRA EXPERTS', 38, 37);
  setFont(doc, 'n', 6.5);
  tc(doc, GLD);
  doc.text('Regulatory Intelligence · Due Diligence · RegTech AI · Think Tank', 38, 43.5);

  const ruleY = 115;
  goldRule(doc, 18, ruleY, W - 28);

  setFont(doc, 'b', T_HERO);
  tc(doc, WHT);
  doc.text('KHEPRA', 18, ruleY - 48);
  tc(doc, GLD);
  doc.text('EXPERTS', 18, ruleY - 20);

  setFont(doc, 'n', 10.5);
  tc(doc, WHT);
  doc.text('The RegTech AI platform that turns compliance into competitive', 18, ruleY + 13);
  doc.text('advantage for Francophone Africa', 18, ruleY + 23);
  setFont(doc, 'n', 8);
  tc(doc, SGR);
  doc.text('UEMOA · CEMAC · OHADA — 17 countries · 4 Business Units · 127 KOS REGTECH AI Hubs · 509 Docs · 332 Sources · /pricing · /scan', 18, ruleY + 32);

  setFont(doc, 'b', 12);
  tc(doc, GLD);
  doc.text('127 Hubs. 101 Edge Functions. 509 KB Docs. 332 Sources. 75 AI Agents. 5 Social Networks. 1 KOS REGTECH AI™ System.', 18, ruleY + 48);
  setFont(doc, 'n', 7.5);
  tc(doc, SGR);
  doc.text('Triple ISO (42001/27001/9001) · 136 Regulations · 200 Verified Citations · Zero Hallucination · Intl. standards adapted', 18, ruleY + 58);

  const kpis = [
    { v: '509', l: 'KB\nDocuments' },
    { v: '332', l: 'Regulatory\nSources' },
    { v: '17', l: 'Countries\nUEMOA · CEMAC · OHADA' },
    { v: '4', l: 'Business Units\nIntl. Standards' },
  ];
  const kpiW = (W - 32 - 9) / 4;
  kpis.forEach((k, i) => {
    const kx = 18 + i * (kpiW + 3);
    const ky = ruleY + 70;
    statBox(doc, k.v, k.l, kx, ky, kpiW, 24);
  });

  const tlY = ruleY + 102;
  const tlW = (W - 34) / 4;
  const timelineSteps = [
    { n: '1', t: 'Diagnostic', d: '360° regulatory risk mapping and assessment' },
    { n: '2', t: 'Design', d: 'Custom KOS solutions — 75 AI agents mobilized' },
    { n: '3', t: 'Execution', d: 'International standard deliverables, adapted to African context' },
    { n: '4', t: 'Closing', d: 'Committee validation and AI skills transfer' },
  ];
  timelineSteps.forEach((s, i) => {
    timelineStep(doc, s.n, s.t, s.d, 17 + i * tlW, tlY, tlW, i === 3);
  });

  const fBoxY = tlY + 40;
  fc(doc, DGR);
  try { doc.setGState(new (doc as any).GState({ opacity: 0.88 })); } catch { /* */ }
  doc.roundedRect(16, fBoxY, W - 24, 36, 3, 3, 'F');
  try { doc.setGState(new (doc as any).GState({ opacity: 1 })); } catch { /* */ }
  fc(doc, GLD);
  doc.rect(16, fBoxY, W - 24, 0.8, 'F');

  const fpW = 26;
  if (founderImg) {
    img(doc, founderImg, 20, fBoxY + 5, fpW, 26);
    dc(doc, GLD);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, fBoxY + 5, fpW, 26, 1.5, 1.5);
    fc(doc, GRN);
    doc.roundedRect(20, fBoxY + 21, fpW, 10, 0, 0, 'F');
    setFont(doc, 'b', 5.5);
    tc(doc, GLD);
    doc.text('FOUNDER', 20 + fpW / 2, fBoxY + 27, { align: 'center' });
  } else {
    fc(doc, GRN);
    doc.roundedRect(20, fBoxY + 5, fpW, 26, 1.5, 1.5, 'F');
    setFont(doc, 'b', 14);
    tc(doc, GLD);
    doc.text('KE', 20 + fpW / 2, fBoxY + 20, { align: 'center' });
  }

  setFont(doc, 'b', 9);
  tc(doc, GLD);
  doc.text('SIMDA Essoyomèwè', 20 + fpW + 6, fBoxY + 12);
  setFont(doc, 'n', 7);
  tc(doc, WHT);
  doc.text('Managing Partner & Founder', 20 + fpW + 6, fBoxY + 18.5);
  setFont(doc, 'i', 6.5);
  tc(doc, SGR);
  doc.text('Due Diligence · Structuring · Investment Readiness · ESG · KOS REGTECH AI Architect', 20 + fpW + 6, fBoxY + 25);
  doc.text('22+ years of experience — KOS REGTECH AI Architecture · AfDB/IFC Standards', 20 + fpW + 6, fBoxY + 31);

  premiumBadge(doc, 'KOS REGTECH AI™ — INSTITUTIONAL BROCHURE 2026', 18 + (W - 28) - 62, fBoxY + 26, 57);

  // Footer minimal couverture
  fc(doc, [...DGR, 0.85] as any);
  doc.rect(0, H - 10, W, 10, 'F');
  fc(doc, GLD);
  doc.rect(0, H - 10, W, 0.5, 'F');
  setFont(doc, 'n', 5.5);
  tc(doc, SGR);
  doc.text(`${DOC_REF} | ${DOC_DATE} | ${DOC_CLASS}`, W / 2, H - 5, { align: 'center' });
  setFont(doc, 'b', 6);
  tc(doc, GLD);
  doc.text('1 / 6', W - M, H - 5, { align: 'right' });
}

// ═══════════════════════════════════════════════════════════════
// PAGE 2 — 4 BUSINESS UNITS
// ═══════════════════════════════════════════════════════════════
export function drawPage2En(doc: jsPDF, logo: string | null) {
  fc(doc, CRM);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 2, TOTAL_PAGES, 'KOS REGTECH AI™ — 4 Business Units · KHEPRA Constitution Art. 2');
  footer(doc);

  let y = TOP;

  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 27, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 4, 27, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('KOS REGTECH AI™ — THE PLATFORM INSPIRED BY INTERNATIONAL STANDARDS, ADAPTED FOR FRANCOPHONE AFRICA', M + 8, y + 7.5);

  const tension = 'KHEPRA EXPERTS draws inspiration from the best international standards and adapts them to the specific context of Francophone Africa. KOS REGTECH AI™ is our Knowledge Operating System, a platform of 120 interconnected hubs, 102 Edge Functions, 75 AI agents and 4 exclusive Business Units operating in synergy. Result: Triple ISO Certified (42001/27001/9001), 99.999% uptime, zero hallucination. Discover our offers on /pricing.';
  justifyBlock(doc, tension, M + 8, y + 14, CW - 14, 6.5, SGR);

  y += 31;

  y = sTitle(doc, 'Our 4 Exclusive Business Units — KHEPRA Constitution Art. 2', y);

  const buCardW = Math.round(CW * 0.60);
  const buMinW = CW - buCardW - 5;
  const buMinX = M + buCardW + 5;

  const bus = [
    {
      n: '01', t: 'Financial Regulation & Compliance',
      risk: 'Regulatory shield: absolute protection for your institution against regulatory requirements. Mock audit methodology, prioritized remediation plan and evidence dossier.',
      arch: 'Free Diagnostic → Pre-Inspection → Remediation → KOS REGTECH AI Subscription',
      refs: 'BCEAO Circ. 01-03/2017 · COBAC R-2001/07 · FATF 2023 · Basel II/III · IFRS · OHADA',
      i: ['Mock audit 95+ control points — real inspection simulation', 'Prioritized remediation plan · Evidence dossier · Compliant procedures', 'KOS REGTECH AI regulatory monitoring subscription · Annual audit · Continuous support'],
    },
    {
      n: '02', t: 'Governance & Due Diligence',
      risk: 'Board performance assessment, conflict detection, pre-acquisition due diligence. Governance risk mapping and actionable recommendations.',
      arch: 'Free Diagnostic → Board Audit → Due Diligence → KOS REGTECH AI Subscription',
      refs: 'COSO 2013/2017 · ISO 37000 · OHADA AUSCGIE · IIA IPPF · GRI 2021 · ISSB',
      i: ['Governance audit — Board performance, independence, specialized committees', 'Pre-acquisition due diligence: financial, legal, ESG, governance', 'Governance policy · Board Charter · Remuneration · Ethics · Compliance'],
    },
    {
      n: '03', t: 'Climate, Transition & ESG',
      risk: 'Industrial asset valuation and protection against climate risks. Decarbonization engineering and integrated ESG strategy.',
      arch: 'Free Diagnostic → Carbon Audit → ESG Strategy → KOS REGTECH AI Subscription',
      refs: 'ISSB · GRI 2021 · CSRD · NGFS · TCFD · SDG · ISO 14064 · Paris Agreement Art. 6',
      i: ['Carbon footprint Scope 1-2-3 + decarbonization trajectory', 'ESG reporting ISSB/GRI/CSRD compliant — investor-ready dossier', 'Integrated ESG strategy · Climate due diligence · Green financing'],
    },
    {
      n: '04', t: 'KBR-Model & Business Intelligence',
      risk: 'Intellectual Property monetization. Premium articles, paid sector studies, actionable business intelligence.',
      arch: 'Lead Magnet → KBR Premium → KBR Corporate → KOS REGTECH AI Subscription',
      refs: 'BCEAO · COBAC · FATF · OECD · IMF · World Bank · AfDB · ISSB · NGFS',
      i: ['Premium sector studies · 28 studies/year · Regulatory barometers', 'Quarterly outlook notes · Policy Briefs · Position Papers', 'KOS REGTECH AI Knowledge Graph™ — 509 verified docs · 332 sources · 200 citations · 136 regulations'],
    },
  ];

  const sY = TOP + 31;
  statBox(doc, '120', 'KOS REGTECH AI\nHubs', buMinX, sY, buMinW, 22);
  statBox(doc, '101', 'Edge Functions\nDeployed', buMinX, sY + 25, buMinW, 22);
  statBox(doc, '4', 'Business Units\n+ KOS REGTECH AI', buMinX, sY + 50, buMinW, 22);
  statBox(doc, '17', 'Countries\nUEMOA · CEMAC · OHADA', buMinX, sY + 75, buMinW, 22);

  fc(doc, GLD);
  doc.roundedRect(buMinX, sY + 100, buMinW, 9, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GRN);
  doc.text('INTERNATIONAL STANDARDS ADAPTED', buMinX + buMinW / 2, sY + 105.5, { align: 'center' });

  const roiItems = [
    'International standards adapted to Africa',
    '75 AI agents + 102 Edge Functions',
    'Triple ISO certified (42001/27001/9001)',
    '99.999% uptime · MTTR < 5 min',
  ];
  let ry = sY + 112;
  for (const ri of roiItems) {
    bullet(doc, ri, buMinX + 3, ry, buMinW - 6, GLD, 6.5);
    ry += 4.8;
  }

  let buY = y;
  bus.forEach((bu, i) => {
    let itemLines = 0;
    const itemTextW = buCardW - 14;
    bu.i.forEach((it) => { itemLines += doc.splitTextToSize(it, itemTextW).length; });
    const cardH = 8 + 5.5 + itemLines * 3 + 6 + 8;
    const gap = i > 0 ? 2.5 : 0;
    const absY = buY + gap;

    fc(doc, WHT);
    doc.roundedRect(M, absY, buCardW, cardH, 1.8, 1.8, 'F');
    fc(doc, i === 3 ? GRN : GLD);
    doc.rect(M, absY, buCardW, 0.6, 'F');

    fc(doc, i === 3 ? GLD : GRN);
    doc.circle(M + 6, absY + 7, 4, 'F');
    setFont(doc, 'b', 7);
    tc(doc, i === 3 ? GRN : GLD);
    doc.text(bu.n, M + 6, absY + 9, { align: 'center' });

    setFont(doc, 'b', 8.5);
    tc(doc, i === 3 ? GLD : GRN);
    doc.text(bu.t, M + 13, absY + 8.5);

    setFont(doc, 'i', 6.5);
    tc(doc, BLK);
    const rl = doc.splitTextToSize(bu.risk, buCardW - 16);
    doc.text(rl, M + 13, absY + 15);

    const archW = doc.getTextWidth(bu.arch) + 10;
    const badgeY = absY + 15 + rl.length * 3.8;
    fc(doc, GLD);
    doc.roundedRect(M + 3, badgeY, Math.min(archW, buCardW - 6), 4.5, 1, 1, 'F');
    setFont(doc, 'b', 5.5);
    tc(doc, GRN);
    doc.text(bu.arch, M + 8, badgeY + 3.2);

    let itemY = badgeY + 7.5;
    setFont(doc, 'n', 6);
    tc(doc, GRY);
    bu.i.forEach((item) => {
      fc(doc, i === 3 ? GRN : GLD);
      doc.circle(M + 5.5, itemY - 1.3, 0.7, 'F');
      const il = doc.splitTextToSize(item, itemTextW);
      doc.text(il, M + 9, itemY);
      itemY += il.length * 3 + 0.8;
    });

    const refY = itemY + 0.5;
    fc(doc, CRM);
    doc.roundedRect(M + 3, refY, buCardW - 6, 5.2, 0.8, 0.8, 'F');
    setFont(doc, 'i', 5);
    tc(doc, GRY);
    doc.text(bu.refs, M + 8, refY + 3.6);

    buY = absY + cardH;
  });

  let offersEnd = buY + 3;

  const landY = offersEnd + 2;
  y = sTitleAlt(doc, 'Land & Expand Model — From Free Diagnostic to KOS REGTECH AI Subscription', landY);

  const landSteps = [
    { t: 'L1 — Diagnostic', d: 'Free · 8 min · Score /100 · Partner debrief 30 min' },
    { t: 'L2 — Premium', d: 'Full engagement · Dedicated Partner · International standard deliverables' },
    { t: 'L3 — Enterprise', d: 'Annual support · Quarterly steering committee' },
    { t: 'L4 — Subscription', d: 'KOS REGTECH AI continuous compliance · Dashboard · Alerts · Hotline' },
  ];
  const lW = (CW - 9) / 4;
  landSteps.forEach((step, i) => {
    const lx = M + i * (lW + 3);
    fc(doc, WHT);
    doc.roundedRect(lx, y, lW, 20, 1.5, 1.5, 'F');
    fc(doc, GRN);
    doc.rect(lx, y, lW, 0.6, 'F');
    setFont(doc, 'b', 7.5);
    tc(doc, GRN);
    doc.text(step.t, lx + lW / 2, y + 7, { align: 'center' });
    setFont(doc, 'n', 5.5);
    tc(doc, GRY);
    const dl = doc.splitTextToSize(step.d, lW - 5);
    doc.text(dl, lx + lW / 2, y + 12, { align: 'center' });
  });

  y += 24;

  y = sTitleAlt(doc, 'Lead Magnets — 6 Free Online Diagnostics', y);

  const leads = [
    { t: 'Regulatory Compliance Scan', d: '8 min — BCEAO/COBAC 95+ pts · Risk gap', p: 'Free' },
    { t: 'Governance Audit Score', d: '8 min — Board performance · 5 COSO axes', p: 'Free' },
    { t: 'ESG Maturity Diagnostic', d: '8 min — ISSB/GRI Score · SDG Alignment', p: 'Free' },
    { t: 'KBR Intelligence Sample', d: '8 min — Sector study preview · KPI snapshot', p: 'Free' },
    { t: 'Board Performance Scan', d: '8 min — Independence · Committees · Ethics', p: 'Free' },
    { t: 'Carbon Risk Assessment', d: '8 min — Scope 1-2-3 · Decarbonization path', p: 'Free' },
  ];
  const llW = (CW - 6) / 3;
  const llH = 22;
  leads.forEach((l, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const lx = M + col * (llW + 3);
    const ly = y + row * (llH + 3);
    fc(doc, CRM);
    doc.roundedRect(lx, ly, llW, llH, 1.5, 1.5, 'F');
    fc(doc, GRN);
    doc.rect(lx, ly, llW, 0.5, 'F');
    setFont(doc, 'b', 7);
    tc(doc, GRN);
    doc.text(l.t, lx + llW / 2, ly + 6.5, { align: 'center' });
    setFont(doc, 'n', 5.5);
    tc(doc, GRY);
    const dl = doc.splitTextToSize(l.d, llW - 4);
    doc.text(dl, lx + llW / 2, ly + 11.5, { align: 'center' });
    fc(doc, GLD);
    doc.roundedRect(lx + llW / 2 - 10, ly + llH - 5.5, 20, 4, 0.8, 0.8, 'F');
    setFont(doc, 'b', 5.5);
    tc(doc, GRN);
    doc.text(l.p, lx + llW / 2, ly + llH - 2.7, { align: 'center' });
  });

  y += 2 * (22 + 3);

  y = sTitleAlt(doc, 'Testimonials — Investors · Banks · Promoters', y);

  const testi = [
    { q: 'KOS REGTECH AI detected 14 critical red flags in 12 minutes. Our due diligence that took 3 weeks is now 92% automated.', a: 'Investment Director, PE Fund — Luxembourg' },
    { q: 'The KBR-Model sector study on UEMOA banking saved us 6 months of market research. The board approved our expansion on the spot.', a: 'CFO, Pan-African Banking Group — UEMOA' },
    { q: 'The BCEAO mock audit revealed 12 critical non-compliances. 90 days later, the real inspection concluded with zero sanctions.', a: 'CEO, Microfinance Institution — Benin' },
  ];
  const tW = (CW - 6) / 3;
  testi.forEach((t, i) => {
    const tx = M + i * (tW + 3);
    testimonialCard(doc, t.q, t.a, tx, y, tW, 38);
  });
}

// ═══════════════════════════════════════════════════════════════
// PAGE 3 — FOUNDER, KOS METHODOLOGY, ZONES
// ═══════════════════════════════════════════════════════════════
export function drawPage3En(doc: jsPDF, logo: string | null, founderImg: string | null) {
  fc(doc, WHT);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 3, TOTAL_PAGES, 'Managing Partner · International Methodology · 127 Hubs · 509 Docs · 17 Countries');
  footer(doc);

  let y = TOP;

  y = sTitle(doc, 'SIMDA Essoyomèwè — Managing Partner & Founder · KOS REGTECH AI Architect', y);

  const photoW = 52;
  const photoH = 66;
  const textX2 = M + photoW + 7;
  const textW2 = CW - photoW - 7;

  if (founderImg) {
    img(doc, founderImg, M, y, photoW, photoH);
    dc(doc, GLD);
    doc.setLineWidth(0.7);
    doc.roundedRect(M, y, photoW, photoH, 2.5, 2.5);
    fc(doc, GRN);
    doc.roundedRect(M, y + photoH - 10, photoW, 10, 0, 0, 'F');
    setFont(doc, 'b', 6);
    tc(doc, GLD);
    doc.text('KOS REGTECH AI ARCHITECT', M + photoW / 2, y + photoH - 3.5, { align: 'center' });
  }

  premiumBadge(doc, 'FOUNDER & KOS REGTECH AI ARCHITECT™', textX2, y, 55);

  setFont(doc, 'b', 14);
  tc(doc, DGR);
  doc.text('SIMDA Essoyomèwè', textX2, y + 16.5);

  setFont(doc, 'i', 8);
  tc(doc, GRN);
  doc.text('Due Diligence · Structuring · Investment Readiness · ESG · KOS REGTECH AI Platform', textX2, y + 23.5);

  goldRule(doc, textX2, y + 25.5, 95);

  const bio = 'Managing Partner with 22+ years of field experience in West and Central Africa. Senior expert in organizational structuring, strategic advisory, corporate governance and risk management. Architect of the KOS REGTECH AI™ — a platform of 120 interconnected hubs, 102 Edge Functions, 75 AI agents and 4 Business Units operating in synergy. The methodology draws inspiration from the best international standards and adapts them to African regulatory realities (UEMOA, CEMAC, OHADA, BCEAO, COBAC). Directly supports investors, promoters and financial institutions in securing their high-stakes decisions.';
  justifyBlock(doc, bio, textX2, y + 31, textW2 - 4, 7.5, GRY);

  const tags = ['KOS REGTECH AI', 'OHADA', 'BCEAO', 'UEMOA', 'CEMAC', 'IFRS', 'ESG', 'AfDB', 'IFC', '75 AI Agents', 'Governance'];
  let tagX = textX2;
  let tagY = y + 56;
  for (const tag of tags) {
    const tw = doc.getStringUnitWidth(tag) * 6.5 * (1 / doc.internal.scaleFactor) + 8;
    if (tagX + tw > M + CW) { tagX = textX2; tagY += 9; }
    fc(doc, tag === 'KOS REGTECH AI' ? GLD : GRN);
    doc.roundedRect(tagX, tagY - 5, tw, 7, 1.5, 1.5, 'F');
    setFont(doc, 'b', 6.5);
    tc(doc, tag === 'KOS REGTECH AI' ? GRN : GLD);
    doc.text(tag, tagX + tw / 2, tagY, { align: 'center' });
    tagX += tw + 3;
  }

  setFont(doc, 'b', 7);
  tc(doc, GRN);
  doc.text('LinkedIn :', textX2, tagY + 11);
  setFont(doc, 'n', 7);
  tc(doc, GRY);
  doc.text('linkedin.com/in/essoyomèwè-simda-650a5142', textX2 + 21, tagY + 11);

  y = Math.max(y + photoH, tagY + 15) + 5;

  y = sTitleAlt(doc, 'Our Methodology — KOS REGTECH AI™ · KHEPRA Constitution Art. 6', y);

  const steps = [
    { n: '1', t: '360-degree Diagnostic', d: 'Risk and opportunity mapping. 75 AI agents analyze your regulatory context in real time. Deliverable: 40+ page report.' },
    { n: '2', t: 'Design & Modeling', d: 'Custom KOS REGTECH AI-generated solutions, applicable regulatory references, multi-scenario financial model.' },
    { n: '3', t: 'Execution & Support', d: 'International standard deliverables auto-generated by 4 BUs in synergy. Field support, change management.' },
    { n: '4', t: 'Closing & Evaluation', d: 'Committee validation, documented impact measurement, AI-augmented skills transfer, post-mission plan.' },
  ];
  const stW = (CW - 9) / 4;
  steps.forEach((s, i) => {
    const sx = M + i * (stW + 3);
    stepBox(doc, s.n, s.t, s.d, sx, y, stW, 34);
    if (i < steps.length - 1) {
      setFont(doc, 'b', 12);
      tc(doc, GLD);
      doc.text('▸', sx + stW + 2.5, y + 16.5, { align: 'center' });
    }
  });

  y += 38;

  y = sTitle(doc, 'Intervention Zones — 17 Countries (UEMOA · CEMAC · OHADA)', y);

  const westW = CW * 0.55 - 2;
  const centW = CW * 0.45 - 2;
  const centX = M + westW + 4;

  fc(doc, GLD);
  doc.roundedRect(M, y, westW, 7.5, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GRN);
  doc.text('UEMOA / OHADA — 11 countries', M + westW / 2, y + 5.3, { align: 'center' });

  fc(doc, GRN);
  doc.roundedRect(centX, y, centW, 7.5, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GLD);
  doc.text('CEMAC — 6 countries', centX + centW / 2, y + 5.3, { align: 'center' });

  y += 10;

  const west = ['Benin', 'Côte d\'Ivoire', 'Ghana', 'Guinea-Bissau', 'Mali', 'Niger', 'Senegal', 'Togo ★ HQ', 'Burkina Faso', 'Guinea', 'Sierra Leone'];
  const central = ['Cameroon', 'Chad', 'CAR', 'Gabon', 'Eq. Guinea', 'Congo'];

  const wc = westW / 3;
  west.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = M + col * wc + 2;
    const cy = y + row * 7;
    const isHQ = c.includes('Togo');
    if (isHQ) {
      fc(doc, GLD);
      doc.roundedRect(M + col * wc, cy - 4.5, wc - 1, 6, 0.8, 0.8, 'F');
    }
    setFont(doc, isHQ ? 'b' : 'n', 6.5);
    tc(doc, isHQ ? GRN : GRY);
    doc.text(c, cx, cy);
  });

  const cc = centW / 2;
  central.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    setFont(doc, 'n', 6.5);
    tc(doc, GRY);
    doc.text(c, centX + col * cc + 2, y + row * 7);
  });

  const zoneRows = Math.max(Math.ceil(west.length / 3), Math.ceil(central.length / 2));
  const zoneH = zoneRows * 7 + 5;

  dc(doc, GLD);
  doc.setLineWidth(0.3);
  doc.roundedRect(M, y - 9, westW, zoneH + 9, 2, 2);
  dc(doc, GRN);
  doc.roundedRect(centX, y - 9, centW, zoneH + 9, 2, 2);

  y += zoneH + 8;

  const ctaH = BOT - y - 2;
  if (ctaH > 45) {
    fc(doc, DGR);
    doc.roundedRect(M, y, CW, ctaH, 4, 4, 'F');
    fc(doc, GLD);
    doc.rect(M, y, CW, 0.8, 'F');
    fc(doc, GRN);
    doc.rect(M, y, 4, ctaH, 'F');

    setFont(doc, 'b', 11);
    tc(doc, GLD);
    doc.text('Your next high-stakes decision deserves KOS REGTECH AI — 127 Hubs · 101 Edge Functions · 509 Docs · 75 AI Agents · 5 Networks · /pricing', W / 2, y + 13, { align: 'center' });

    setFont(doc, 'i', 8);
    tc(doc, SGR);
    doc.text('"No theoretical reports. AI-augmented diagnostics, calibrated for African realities."', W / 2, y + 22, { align: 'center' });

    const ctCols = [
      { icon: '✉', lbl: 'Email', val: 'contact@khepraexperts.com' },
      { icon: '☎', lbl: 'Phone', val: '+228 93 98 49 09' },
      { icon: '⌖', lbl: 'Address', val: 'Quartier Logogomè, Lomé, Togo' },
      { icon: '⊡', lbl: 'Web', val: 'khepraexperts.com' },
    ];
    const ccW = CW / 4;
    ctCols.forEach((cc, i) => {
      const ccX = M + i * ccW;
      if (i > 0) {
        dc(doc, GLD);
        doc.setLineWidth(0.2);
        doc.line(ccX, y + 26, ccX, y + ctaH - 6);
      }
      setFont(doc, 'b', 15);
      tc(doc, GLD);
      doc.text(cc.icon, ccX + ccW / 2, y + 36, { align: 'center' });
      setFont(doc, 'b', 7.5);
      tc(doc, GLD);
      doc.text(cc.lbl, ccX + ccW / 2, y + 44, { align: 'center' });
      setFont(doc, 'n', 6.5);
      tc(doc, SGR);
      const vl = doc.splitTextToSize(cc.val, ccW - 8);
      doc.text(vl, ccX + ccW / 2, y + 51, { align: 'center' });
    });

    ndaBanner(doc, M, y + ctaH - 14, CW, 'SYSTEMATIC NDA · ABSOLUTE CONFIDENTIALITY');

    if (logo) {
      img(doc, logo, W / 2 - 8, y + ctaH - 31, 16, 16);
      setFont(doc, 'b', 8);
      tc(doc, WHT);
      doc.text('KHEPRA EXPERTS — KOS REGTECH AI™', W / 2, y + ctaH - 3, { align: 'center' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE 4 — THINK TANK BU4 + SECTORS
// ═══════════════════════════════════════════════════════════════
export function drawPage4En(doc: jsPDF, logo: string | null) {
  fc(doc, WHT);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 4, TOTAL_PAGES, 'BU4 KBR-Model™ · Business Intelligence · IP Monetization · KOS REGTECH AI Research Institute™');
  footer(doc);

  let y = TOP;

  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 24, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 4, 24, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('BU4 KBR-MODEL™ & BUSINESS INTELLIGENCE — IP MONETIZATION POWERED BY KOS REGTECH AI™', M + 8, y + 7.5);

  const hookText = 'Unlike traditional firms relying on public literature, KHEPRA EXPERTS has built its 4th Business Unit as an Intellectual Property monetization engine integrated into the KOS REGTECH AI™. The KBR-Model (Knowledge-Based Revenue) transforms knowledge into recurring revenue: premium articles, paid sector studies, regulatory barometers and economic outlook notes powered by the KOS REGTECH AI Knowledge Graph™ (509 verified documents, 332 regulatory sources, 200 verified citations, 136 BCEAO/COBAC/FATF/OHADA texts). This intelligence is injected in real time into the other 3 BUs, ensuring every deliverable anticipates regulatory evolution rather than reacting to it.';
  justifyBlock(doc, hookText, M + 8, y + 14, CW - 14, 6.5, SGR);

  y += 28;

  y = sTitleGreen(doc, 'KBR-Model™ — BU4 · IP Monetization & Business Intelligence', y);

  const ttCardW = Math.floor((CW - 6) / 2);
  const ttCardH = 56;

  fc(doc, WHT);
  doc.roundedRect(M, y, ttCardW, ttCardH, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, ttCardW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 3.5, ttCardH, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GRN);
  doc.text('5 Research & IP Monetization Axes — KBR-Model', M + 8, y + 8);

  const axes = [
    { n: '01', t: 'Financial & Prudential Regulation', d: 'BCEAO · COBAC · BEAC · GABAC · Basel II/III · IFRS · Stress Tests' },
    { n: '02', t: 'Governance & Due Diligence', d: 'Board Performance · Pre-acquisition Audits · Conflicts · ISO 37000' },
    { n: '03', t: 'Climate, ESG & Decarbonization', d: 'Carbon Footprints · ISSB/GRI/CSRD · Green Financing · NGFS' },
    { n: '04', t: 'KBR-Model & Business Intelligence', d: 'Premium Sector Studies · Outlook Notes · Barometers' },
    { n: '05', t: 'Digital, FinTech & Cybersecurity', d: 'Open Banking · APIs · Regulatory AI · CBDC · DORA · NIST' },
  ];

  let axY = y + 14;
  axes.forEach((ax) => {
    fc(doc, GRN);
    doc.circle(M + 12, axY - 1.5, 2.5, 'F');
    setFont(doc, 'b', 6);
    tc(doc, GLD);
    doc.text(ax.n, M + 12, axY, { align: 'center' });
    setFont(doc, 'b', 7.5);
    tc(doc, DGR);
    doc.text(ax.t, M + 18, axY);
    setFont(doc, 'n', 5.5);
    tc(doc, GRY);
    doc.text(ax.d, M + 18, axY + 4.5);
    axY += 8;
  });

  const ttRX = M + ttCardW + 6;
  fc(doc, DGR);
  doc.roundedRect(ttRX, y, ttCardW, ttCardH, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(ttRX, y, ttCardW, 0.8, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('Impact & Production — KBR-Model', ttRX + 6, y + 8);

  const ttStats = [
    { v: '28', l: 'Studies\n/ year' },
    { v: '500', l: 'Academic\nCitations' },
    { v: '509', l: 'Knowledge Graph\nDocuments' },
    { v: '3', l: 'KBR Levels\n(L1/L2/L3)' },
  ];
  const ttStatW = (ttCardW - 12) / 4;
  ttStats.forEach((s, i) => {
    const sx = ttRX + 3 + i * ttStatW;
    fc(doc, GRN);
    doc.roundedRect(sx + ttStatW / 2 - 15, y + 13, 30, 8, 1, 1, 'F');
    setFont(doc, 'b', 7);
    tc(doc, GLD);
    doc.text(s.v, sx + ttStatW / 2, y + 18.5, { align: 'center' });
    setFont(doc, 'n', 5);
    tc(doc, SGR);
    const sl = doc.splitTextToSize(s.l, ttStatW - 4);
    doc.text(sl, sx + ttStatW / 2, y + 24, { align: 'center' });
  });

  const pubTypes = [
    'Premium Sector Studies',
    'Economic Outlook Notes',
    'Regulatory Barometers',
    'Policy Briefs',
    'Position Papers',
    'Executive Summaries (L1)',
    'Premium Articles (L2)',
    'High-Ticket Reports (L3)',
  ];
  let ptY = y + 33;
  setFont(doc, 'b', 7);
  tc(doc, GLD);
  doc.text('Publications & Deliverables:', ttRX + 6, ptY);
  ptY += 5;
  const ptColW = (ttCardW - 16) / 2;
  pubTypes.forEach((pt, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const ptx = ttRX + 6 + col * ptColW;
    const pty = ptY + row * 5.5;
    fc(doc, GLD);
    doc.circle(ptx + 2.5, pty - 0.8, 0.7, 'F');
    setFont(doc, 'n', 5);
    tc(doc, SGR);
    doc.text(pt, ptx + 5, pty);
  });

  y += ttCardH + 5;

  y = sTitle(doc, 'Sector Pillar 1 — Microfinance & Financial Institutions', y);

  const mfCardW = (CW - 4) / 2;
  const mfOffers = [
    { n: 'MF1', t: 'SFD/EMF Compliance & Governance', i: ['BCEAO/COBAC compliance audit 95+ control points', 'Governance restructuring and internal control (3 lines)', 'SFD/EMF license application and renewal preparation', 'KOS REGTECH AI-integrated regulatory procedures manual'] },
    { n: 'MF2', t: 'Risk Management & Performance', i: ['Integrated risk management policy BCEAO compliant', 'Custom credit scoring models for client segments', 'PAR 30 reduction 50 to 75% in 12 to 18 months', 'Prudential standard compliant provisioning'] },
  ];

  const mfRow1 = [
    expertCard(doc, mfOffers[0].n, mfOffers[0].t, mfOffers[0].i, M, y, mfCardW),
    expertCard(doc, mfOffers[1].n, mfOffers[1].t, mfOffers[1].i, M + mfCardW + 4, y, mfCardW),
  ];
  y = Math.max(...mfRow1) + 1;

  y = sTitle(doc, 'Sector Pillar 2 — Industrial Projects & Structured Finance', y);

  const indOffers = [
    { n: 'PI1', t: 'Industrial Feasibility Studies', i: ['Integrated market · technical · financial · ESG study', '10-year financial modeling AfDB/IFC compliant', 'Sensitivity analysis and multi-scenario stress tests', 'Investment bank and credit committee ready dossier'] },
    { n: 'PI2', t: 'Structuring & Project Finance', i: ['Optimized debt/equity financial structuring', 'Technical, legal and ESG due diligence', 'Contract and financing agreement negotiation', 'Support through to financial closing'] },
  ];

  const indRow1 = [
    expertCard(doc, indOffers[0].n, indOffers[0].t, indOffers[0].i, M, y, mfCardW),
    expertCard(doc, indOffers[1].n, indOffers[1].t, indOffers[1].i, M + mfCardW + 4, y, mfCardW),
  ];
  y = Math.max(...indRow1) + 1;

  y = sTitleAlt(doc, 'Case Study — UEMOA Microfinance Network Turnaround — Powered by KOS REGTECH AI™', y);

  const caseHeader = 'MICROFINANCE NETWORK · 85 BRANCHES · 250K CLIENTS · \u20ac52M PORTFOLIO · 18-MONTH MISSION · POWERED BY KOS™';
  const caseContext = 'Network of 85 branches, 250K clients, \u20ac52M portfolio, PAR 30 at 19%, cumulative losses \u20ac3.1M, threat of license withdrawal by BCEAO, failing governance, delayed reporting.';
  const caseMission = '95-point compliance audit, governance restructuring with independent Chair, internal control overhaul (3 lines), core banking deployment across 85 branches, training of 350 staff, mobile banking launch and API integration.';
  const caseResults = '100% regulatory compliance, PAR 30 at 3.8%, net result +\u20ac2.4M year 2, reporting time -78%, 42K mobile banking clients, license renewed without reservation.';
  y = caseStudyBox(doc, caseHeader, caseContext, caseMission, caseResults, M, y, CW);

  y += 3;

  if (y < BOT - 28) {
    y = sTitleAlt(doc, 'Lead Magnets — Free Sector Diagnostics', y);
    const mfLeads = [
      { t: 'Regulatory Scan', d: '8 min — BCEAO/COBAC gap 95+ pts', p: 'Free' },
      { t: 'Governance Audit', d: '8 min — Board performance · 5 axes', p: 'Free' },
      { t: 'ESG Maturity', d: '8 min — ISSB/GRI · Decarbonization', p: 'Free' },
      { t: 'KBR Sample', d: '8 min — Premium study preview', p: 'Free' },
    ];
    const mlW = (CW - 9) / 4;
    mfLeads.forEach((l, i) => {
      const lx = M + i * (mlW + 3);
      fc(doc, CRM);
      doc.roundedRect(lx, y, mlW, 24, 2, 2, 'F');
      fc(doc, GRN);
      doc.rect(lx, y, mlW, 0.7, 'F');
      setFont(doc, 'b', 7);
      tc(doc, GRN);
      doc.text(l.t, lx + mlW / 2, y + 7, { align: 'center' });
      setFont(doc, 'n', T_SMALL);
      tc(doc, GRY);
      const dl = doc.splitTextToSize(l.d, mlW - 6);
      doc.text(dl, lx + mlW / 2, y + 13, { align: 'center' });
      fc(doc, GLD);
      doc.roundedRect(lx + mlW / 2 - 12, y + 18, 24, 4.5, 1, 1, 'F');
      setFont(doc, 'b', 6);
      tc(doc, GRN);
      doc.text(l.p, lx + mlW / 2, y + 21, { align: 'center' });
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE 5 — MATURITY DIAGNOSTIC, ROADMAP, FINAL CTA KOS 150%
// ═══════════════════════════════════════════════════════════════
export function drawPage5En(doc: jsPDF, logo: string | null) {
  fc(doc, CRM);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 5, TOTAL_PAGES, 'Maturity Diagnostic · 18-Month Roadmap · KOS REGTECH AI™ Engagement');
  footer(doc);

  let y = TOP;

  y = sTitleGreen(doc, 'Maturity Diagnostic — 5 Analysis Dimensions', y);

  const maturityCats = [
    { label: 'Governance', score: 78, desc: 'Board, strategy, powers, independence', indicators: '95 BCEAO points · Specialized committees · Independent Chair · Remuneration policy · Ethics' },
    { label: 'Compliance', score: 72, desc: 'Regulation, reporting, control', indicators: 'COBAC · Preventive plans · IFRS standards · 3 lines of defense · Risk mapping' },
    { label: 'Risk', score: 65, desc: 'Credit, market, operational, concentration', indicators: 'PAR 30 < 5% · Automated scoring · Compliant provisioning · Stress-testing · ALM' },
    { label: 'Digital & AI', score: 58, desc: 'Core banking, mobile, APIs, KOS REGTECH AI, cybersecurity', indicators: 'Mobile banking · Fintech APIs · AI reporting · Core banking · SOC 2 · KOS REGTECH AI Ready' },
    { label: 'Performance', score: 74, desc: 'Profitability, growth, ROE, productivity', indicators: 'ROE > 15% · DFI fundraising · Regional expansion · Staff productivity · NPL < 3%' },
  ];
  y = maturityTable(doc, maturityCats, M, y, CW) + 6;

  y = sTitle(doc, 'Typical Roadmap — 18-Month Transformation with KOS REGTECH AI™', y);

  const milestones = [
    { m: 'M1-M3', d: 'Audit and KOS REGTECH AI diagnostic' },
    { m: 'M4-M6', d: 'AI restructuring' },
    { m: 'M7-M9', d: 'System deployment' },
    { m: 'M10-M12', d: 'Training and steering' },
    { m: 'M13-M15', d: 'Digital and expansion' },
    { m: 'M16-M18', d: 'Validation and closing' },
  ];
  milestoneTimeline(doc, milestones, M, y, CW);
  y += 42;

  // KOS Stats band
  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 22, 2, 2, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.6, 'F');

  const kosQuickStats = [
    { v: 'KOS\nREGTECH', l: 'AI\nPlatform' },
    { v: '120', l: 'KOS REGTECH AI\nHubs' },
    { v: '101', l: 'Edge Functions\nDeployed' },
    { v: '499k', l: 'FCFA/mo\nKOS REGTECH AI Pro /pricing' },
    { v: '0', l: 'Hallucination\nZero Tolerance' },
  ];
  const qsW = CW / 5;
  kosQuickStats.forEach((s, i) => {
    const sx = M + i * qsW;
    setFont(doc, 'b', 11);
    tc(doc, GLD);
    doc.text(s.v, sx + qsW / 2, y + 9, { align: 'center' });
    setFont(doc, 'n', 6);
    tc(doc, SGR);
    const sl = doc.splitTextToSize(s.l, qsW - 6);
    doc.text(sl, sx + qsW / 2, y + 15, { align: 'center' });
  });

  y += 27;

  const ctaH = Math.min(BOT - y - 2, 70);
  if (ctaH > 45) {
    fc(doc, DGR);
    doc.roundedRect(M, y, CW, ctaH, 3, 3, 'F');
    fc(doc, GLD);
    doc.rect(M, y, CW, 0.8, 'F');
    fc(doc, GRN);
    doc.rect(M, y, 4, ctaH, 'F');

    setFont(doc, 'b', 12);
    tc(doc, GLD);
    doc.text('KOS REGTECH AI™ — The platform inspired by the best standards, adapted for Francophone Africa', W / 2, y + 13, { align: 'center' });

    setFont(doc, 'i', 8.5);
    tc(doc, SGR);
    doc.text('"127 Hubs. 101 Edge Functions. 509 KB Docs. 75 AI Agents. 4 Business Units. 5 Social Networks. KOS REGTECH AI™. Triple ISO. Zero hallucination."', W / 2, y + 22, { align: 'center' });

    const contactItems = [
      { icon: '✉', label: 'Email', val: 'contact@khepraexperts.com' },
      { icon: '☎', label: 'Phone', val: '+228 93 98 49 09' },
      { icon: '⌖', label: 'Address', val: 'Quartier Logogomè, Lomé, Togo' },
      { icon: '⊡', label: 'Web', val: 'khepraexperts.com' },
    ];
    contactBlock(doc, contactItems, M, y + 28, CW, ctaH - 32);

    ndaBanner(doc, M, y + ctaH - 12, CW, 'SYSTEMATIC NDA · ABSOLUTE CONFIDENTIALITY · KOS REGTECH AI™');

    if (logo) {
      img(doc, logo, W / 2 - 8, y + ctaH - 27, 16, 16);
      setFont(doc, 'b', 8);
      tc(doc, WHT);
      doc.text('KHEPRA EXPERTS — KOS REGTECH AI™', W / 2, y + ctaH - 2, { align: 'center' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE 6 — BACK COVER KOS KNOWLEDGE OPERATING SYSTEM™
// ═══════════════════════════════════════════════════════════════
export function drawPage6En(doc: jsPDF, logo: string | null) {
  fc(doc, DGR);
  doc.rect(0, 0, W, H, 'F');

  // Header minimal
  fc(doc, [...GRN, 0.3] as any);
  doc.rect(0, 0, W, HDR, 'F');
  fc(doc, GLD);
  doc.rect(0, HDR - 1, W, 1, 'F');

  if (logo) {
    img(doc, logo, M, 3, 12, 12);
  }

  setFont(doc, 'b', 9);
  tc(doc, GLD);
  doc.text('KHEPRA EXPERTS — KOS REGTECH AI™', M + 15, 8.5);
  setFont(doc, 'n', 6);
  tc(doc, SGR);
  doc.text('Knowledge Operating System™ — International Standards Adapted · /pricing · /scan', M + 15, 14.5);

  setFont(doc, 'b', 6.5);
  tc(doc, GLD);
  doc.text('6 / 6', W - M, 10, { align: 'right' });

  goldRule(doc, M, HDR + 6, CW);

  let y = HDR + 16;

  // KOS Architecture Stack
  fc(doc, [...GRN, 0.15] as any);
  doc.roundedRect(M, y, CW, 48, 3, 3, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 1.2, 'F');

  setFont(doc, 'b', 11);
  tc(doc, GLD);
  doc.text('KOS REGTECH AI™ — KNOWLEDGE OPERATING SYSTEM', W / 2, y + 11, { align: 'center' });

  setFont(doc, 'i', 7.5);
  tc(doc, SGR);
  doc.text('Triple ISO Certified Architecture (42001/27001/9001) — International standards adapted to Francophone Africa', W / 2, y + 19.5, { align: 'center' });

  const pillars = [
    { v: '120', l: 'KOS REGTECH AI\nHubs', color: GRN },
    { v: '101', l: 'Edge Functions\nActive', color: GLD },
    { v: '75', l: 'AI Agents\nSupra-optimal', color: GRN },
    { v: '4', l: 'Business Units\nRegTech AI', color: GLD },
  ];
  const pillW = (CW - 15) / 4;
  pillars.forEach((p, i) => {
    const px = M + 3 + i * (pillW + 3);
    fc(doc, DGR);
    doc.roundedRect(px, y + 25, pillW, 21, 1.5, 1.5, 'F');
    fc(doc, p.color);
    doc.rect(px, y + 25, pillW, 0.8, 'F');
    setFont(doc, 'b', 16);
    tc(doc, GLD);
    doc.text(p.v, px + pillW / 2, y + 37, { align: 'center' });
    setFont(doc, 'n', 5);
    tc(doc, SGR);
    const pl = doc.splitTextToSize(p.l, pillW - 4);
    doc.text(pl, px + pillW / 2, y + 42.5, { align: 'center' });
  });

  y += 52;

  // 4 Business Units recap
  fc(doc, [...DGR, 0.5] as any);
  doc.roundedRect(M, y, CW, 42, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.7, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('4 EXCLUSIVE BUSINESS UNITS — INTERNATIONAL STANDARDS ADAPTED — KHEPRA CONSTITUTION ART. 2', W / 2, y + 9, { align: 'center' });

  const buRecap = [
    { n: 'BU1', t: 'Financial Regulation & Compliance', d: 'Audit · BCEAO/COBAC · Regulatory Shield' },
    { n: 'BU2', t: 'Governance & Due Diligence', d: 'Board Audit · Pre-acquisition DD · Conflicts' },
    { n: 'BU3', t: 'Climate, Transition & ESG', d: 'Decarbonization · ISSB/GRI · Green Finance' },
    { n: 'BU4', t: 'KBR-Model & Business Intelligence', d: 'Premium Studies · Barometers · IP Monetization' },
  ];
  const buRecapW = (CW - 12) / 4;
  buRecap.forEach((bu, i) => {
    const bx = M + 3 + i * (buRecapW + 2);
    fc(doc, i === 3 ? GLD : GRN);
    doc.roundedRect(bx, y + 12, buRecapW, 4.5, 0.8, 0.8, 'F');
    setFont(doc, 'b', 5.5);
    tc(doc, i === 3 ? GRN : GLD);
    doc.text(bu.n, bx + buRecapW / 2, y + 15.2, { align: 'center' });
    setFont(doc, 'b', 7);
    tc(doc, WHT);
    doc.text(bu.t, bx + buRecapW / 2, y + 22, { align: 'center' });
    setFont(doc, 'n', 5);
    tc(doc, SGR);
    doc.text(bu.d, bx + buRecapW / 2, y + 27.5, { align: 'center' });
  });

  fc(doc, GLD);
  doc.roundedRect(W / 2 - 45, y + 33, 90, 8, 1.5, 1.5, 'F');
  setFont(doc, 'b', 6.5);
  tc(doc, GRN);
  doc.text('17 COUNTRIES — UEMOA · CEMAC · OHADA', W / 2, y + 37.5, { align: 'center' });

  y += 46;

  // Contact block
  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 55, 3, 3, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 4, 55, 'F');

  setFont(doc, 'b', 9);
  tc(doc, GLD);
  doc.text('CONTACT US', W / 2, y + 10, { align: 'center' });

  const contactItems = [
    { icon: '✉', label: 'Email', val: 'contact@khepraexperts.com' },
    { icon: '☎', label: 'Phone', val: '+228 93 98 49 09' },
    { icon: '⌖', label: 'Address', val: 'Quartier Logogomè, Lomé, Togo' },
    { icon: '⊡', label: 'Web', val: 'khepraexperts.com' },
  ];
  const ccW = CW / 4;
  contactItems.forEach((cc, i) => {
    const ccX = M + i * ccW;
    if (i > 0) {
      dc(doc, GLD);
      doc.setLineWidth(0.2);
      doc.line(ccX, y + 14, ccX, y + 48);
    }
    setFont(doc, 'b', 15);
    tc(doc, GLD);
    doc.text(cc.icon, ccX + ccW / 2, y + 25, { align: 'center' });
    setFont(doc, 'b', 7.5);
    tc(doc, GLD);
    doc.text(cc.label, ccX + ccW / 2, y + 34, { align: 'center' });
    setFont(doc, 'n', 6.5);
    tc(doc, SGR);
    const vl = doc.splitTextToSize(cc.val, ccW - 8);
    doc.text(vl, ccX + ccW / 2, y + 41, { align: 'center' });
  });

  y += 59;

  ndaBanner(doc, M, y, CW, 'SYSTEMATIC NDA · ABSOLUTE CONFIDENTIALITY · KOS REGTECH AI™');

  y += 10;

  const certs = ['ISO 42001:2023 AI Management', 'ISO 27001:2022 Security', 'ISO 9001:2015 Quality', 'International Standards Adapted'];
  const certW = (CW - 15) / 4;
  certs.forEach((cert, i) => {
    const cx = M + 3 + i * (certW + 4);
    fc(doc, GRN);
    doc.roundedRect(cx, y, certW, 8, 1, 1, 'F');
    setFont(doc, 'b', 5);
    tc(doc, GLD);
    doc.text(cert, cx + certW / 2, y + 5, { align: 'center' });
  });

  y += 14;

  // Closing statement
  fc(doc, [...GRN, 0.2] as any);
  doc.roundedRect(M, y, CW, 14, 2, 2, 'F');
  setFont(doc, 'b', 7.5);
  tc(doc, GLD);
  doc.text('"127 Hubs. 101 Edge Functions. 75 AI Agents. 4 Business Units. 5 Social Networks. KOS REGTECH AI™."', W / 2, y + 6, { align: 'center' });
  setFont(doc, 'i', 6);
  tc(doc, SGR);
  doc.text('Khepra Experts — KOS REGTECH AI™ — Institutional Brochure 2026 — ' + DOC_DATE, W / 2, y + 11.5, { align: 'center' });

  // Footer minimal
  fc(doc, [...DGR, 0.7] as any);
  doc.rect(0, H - 8, W, 8, 'F');
  fc(doc, GLD);
  doc.rect(0, H - 8, W, 0.4, 'F');
  setFont(doc, 'n', 5);
  tc(doc, SGR);
  doc.text(`${DOC_REF} — ${DOC_CLASS} — © Khepra Experts 2026 — All rights reserved`, W / 2, H - 3, { align: 'center' });
}