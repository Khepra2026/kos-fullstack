import jsPDF from 'jspdf';
import {
  W, H, M, CW, TOP, BOT, HDR,
  BLK, GRN, GLD, WHT, CRM, GRY, SGR, DGR, LGR, MGR,
  tc, fc, dc, img, setFont, textBlock, justifyBlock, bullet,
  header, footer, sTitle, sTitleAlt, sTitleGreen, goldRule, premiumBadge,
  T_HERO, T_H1, T_H2, T_H3, T_BODY, T_SMALL, T_TINY,
  DOC_REF, DOC_DATE, DOC_CLASS,
} from '';
import {
  statBox, statBoxLight, expertCard, stepBox, timelineStep,
  testimonialCard, milestoneTimeline, maturityTable,
  contactBlock, ndaBanner, caseStudyBox,
} from '';

const TOTAL_PAGES = 6;

// ═══════════════════════════════════════════════════════════════
// PAGE 1 — COUVERTURE KOS REGTECH AI™
// ═══════════════════════════════════════════════════════════════
export async function drawPage1(doc: jsPDF, logo: string | null, coverImg: string | null, founderImg: string | null) {
  fc(doc, DGR);
  doc.rect(0, 0, W, H, 'F');

  // Image de fond + overlay
  if (coverImg) {
    img(doc, coverImg, 0, 0, W, H);
    fc(doc, DGR);
    try { doc.setGState(new (doc as any).GState({ opacity: 0.45 })); } catch { /* */ }
    doc.rect(0, 0, W, H, 'F');
    try { doc.setGState(new (doc as any).GState({ opacity: 1 })); } catch { /* */ }
  } else {
    // Fallback — motif géométrique élégant si pas d'image
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

  // Bande verticale signature
  fc(doc, GRN);
  doc.rect(0, 0, 5, H, 'F');
  fc(doc, GLD);
  doc.rect(5, 0, 1.5, H, 'F');

  // Badge supérieur — KOS REGTECH AI
  fc(doc, GLD);
  doc.roundedRect(18, 12, 120, 9, 2, 2, 'F');
  setFont(doc, 'b', 7.5);
  tc(doc, GRN);
  doc.text('KOS REGTECH AI™ — KNOWLEDGE OPERATING SYSTEM · 4 BUSINESS UNITS', 78, 17.5, { align: 'center' });

  // Logo + baseline
  img(doc, logo, 18, 30, 15, 15);
  if (!logo) {
    // Fallback logo — texte stylisé
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
  doc.text('RegTech AI · Intelligence Réglementaire · Due Diligence · Think Tank', 38, 43.5);

  // Ligne dorée
  const ruleY = 115;
  goldRule(doc, 18, ruleY, W - 28);

  // Titre massif
  setFont(doc, 'b', T_HERO);
  tc(doc, WHT);
  doc.text('KHEPRA', 18, ruleY - 48);
  tc(doc, GLD);
  doc.text('EXPERTS', 18, ruleY - 20);

  // Sous-titre
  setFont(doc, 'n', 10.5);
  tc(doc, WHT);
  doc.text('La plateforme RegTech AI qui transforme la conformité', 18, ruleY + 13);
  doc.text('en avantage compétitif pour l\'Afrique Francophone', 18, ruleY + 23);
  setFont(doc, 'n', 8);
  tc(doc, SGR);
  doc.text('UEMOA · CEMAC · OHADA — 17 pays · 4 Business Units · 127 Hubs KOS REGTECH AI · 509 Documents · 332 Sources · /pricing · /scan', 18, ruleY + 32);

  // Promise KOS REGTECH AI 150%
  setFont(doc, 'b', 12);
  tc(doc, GLD);
  doc.text('127 Hubs. 101 Edge Functions. 509 Documents KB. 332 Sources. 75 Agents IA. 5 Réseaux Sociaux. 1 Système KOS REGTECH AI™.', 18, ruleY + 48);
  setFont(doc, 'n', 7.5);
  tc(doc, SGR);
  doc.text('Triple ISO (42001/27001/9001) · 136 Textes Réglementaires · 200 Citations Vérifiées · Zéro hallucination · LinkedIn+Facebook+Instagram+X+YouTube', 18, ruleY + 58);

  // 4 KPIs
  const kpis = [
    { v: '509', l: 'Documents\nBase Connaissance' },
    { v: '332', l: 'Sources\nRéglementaires' },
    { v: '17', l: 'Pays\nUEMOA · CEMAC · OHADA' },
    { v: '4', l: 'Business Units\nStandards Adaptés' },
  ];
  const kpiW = (W - 32 - 9) / 4;
  kpis.forEach((k, i) => {
    const kx = 18 + i * (kpiW + 3);
    const ky = ruleY + 70;
    statBox(doc, k.v, k.l, kx, ky, kpiW, 24);
  });

  // Timeline — Pipeline KOS REGTECH AI
  const tlY = ruleY + 102;
  const tlW = (W - 34) / 4;
  const timelineSteps = [
    { n: '1', t: 'Diagnostic', d: 'Audit 360° et cartographie des risques réglementaires' },
    { n: '2', t: 'Conception', d: 'Solutions sur mesure KOS — 75 agents IA mobilisés' },
    { n: '3', t: 'Exécution', d: 'Livrables selon standards internationaux, adaptés au contexte africain' },
    { n: '4', t: 'Closing', d: 'Validation comités et transfert compétences IA' },
  ];
  timelineSteps.forEach((s, i) => {
    timelineStep(doc, s.n, s.t, s.d, 17 + i * tlW, tlY, tlW, i === 3);
  });

  // Bloc Fondateur
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
    doc.text('FONDATEUR', 20 + fpW / 2, fBoxY + 27, { align: 'center' });
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
  doc.text('Directeur Associé & Fondateur', 20 + fpW + 6, fBoxY + 18.5);
  setFont(doc, 'i', 6.5);
  tc(doc, SGR);
  doc.text('Due Diligence · Structuration · Investment Readiness · ESG · KOS REGTECH AI Architect', 20 + fpW + 6, fBoxY + 25);
  doc.text('+22 ans d\'expérience — Architecture KOS REGTECH AI · Standards BAD/IFC', 20 + fpW + 6, fBoxY + 31);

  premiumBadge(doc, 'KOS REGTECH AI™ — BROCHURE INSTITUTIONNELLE 2026', 18 + (W - 28) - 62, fBoxY + 26, 57);

  // Footer minimal couverture — référence documentaire
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
// PAGE 2 — 4 BUSINESS UNITS + OFFRES
// ═══════════════════════════════════════════════════════════════
export function drawPage2(doc: jsPDF, logo: string | null) {
  fc(doc, CRM);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 2, TOTAL_PAGES, 'KOS REGTECH AI™ — 4 Business Units · Constitution KHEPRA Art. 2');
  footer(doc);

  let y = TOP;

  // Hook macro — KOS REGTECH AI + 4 BUs
  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 27, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 4, 27, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('KOS REGTECH AI™ — LA PLATEFORME INSPIRÉE DES MEILLEURS STANDARDS, ADAPTÉE À L\'AFRIQUE FRANCOPHONE', M + 8, y + 7.5);

  const tension = `KHEPRA EXPERTS s\'inspire des meilleurs standards internationaux pour les adapter au contexte spécifique de l\'Afrique Francophone. KOS REGTECH AI™ est notre Knowledge Operating System, une plateforme de 120 hubs interconnectés, 102 Edge Functions, 75 agents IA et 4 Business Units exclusives opérant en synergie. Résultat : Triple ISO certifiée (42001/27001/9001), 99.999% uptime, zéro hallucination. Découvrez nos offres sur /pricing.`;
  justifyBlock(doc, tension, M + 8, y + 14, CW - 14, 6.5, SGR);

  y += 31;

  // 4 BUSINESS UNITS
  y = sTitle(doc, `Nos 4 Business Units Exclusives — Constitution KHEPRA Article 2`, y);

  const buCardW = Math.round(CW * 0.60);
  const buMinW = CW - buCardW - 5;
  const buMinX = M + buCardW + 5;

  const bus = [
    {
      n: '01', t: `Régulation Financière & Conformité`,
      risk: `Bouclier réglementaire : protection absolue de votre établissement face aux exigences des régulateurs. Méthodologie d'audit à blanc, plan de remédiation et dossier de preuves.`,
      arch: 'Diagnostic gratuit → Pré-Inspection → Remédiation → Abonnement KOS REGTECH AI',
      refs: `BCEAO Circ. 01-03/2017 · COBAC R-2001/07 · GAFI 2023 · Bâle II/III · IFRS · OHADA`,
      i: ['Audit à blanc 95+ points de contrôle — simulation inspection réelle', 'Plan de remédiation priorisé · Dossier de preuves · Procédures conformes', 'Abonnement veille réglementaire KOS REGTECH AI · Audit annuel · Support continu'],
    },
    {
      n: '02', t: `Gouvernance & Due Diligence`,
      risk: `Performance des Boards, détection des conflits, due diligence pré-acquisition. Cartographie des risques de gouvernance et recommandations.`,
      arch: 'Diagnostic gratuit → Audit Board → Due Diligence → Abonnement KOS REGTECH AI',
      refs: `COSO 2013/2017 · ISO 37000 · OHADA AUSCGIE · IIA IPPF · GRI 2021 · ISSB`,
      i: ['Audit de gouvernance — performance Board, indépendance, comités spécialisés', 'Due diligence pré-acquisition : financière, juridique, ESG, gouvernance', 'Politique de gouvernance · Charte CA · Rémunération · Éthique · Conformité'],
    },
    {
      n: '03', t: `Climat, Transition & ESG`,
      risk: `Valorisation et sécurisation des actifs industriels face aux risques climatiques. Ingénierie de décarbonation et stratégie ESG intégrée.`,
      arch: 'Diagnostic gratuit → Bilan Carbone → Stratégie ESG → Abonnement KOS REGTECH AI',
      refs: `ISSB · GRI 2021 · CSRD · NGFS · TCFD · SDG · ISO 14064 · Accord de Paris Art. 6`,
      i: ['Bilan carbone Scope 1-2-3 + trajectoire de décarbonation', 'Reporting ESG conforme ISSB/GRI/CSRD — dossier investisseurs', 'Stratégie ESG intégrée · Due diligence climat · Financements verts'],
    },
    {
      n: '04', t: `KBR-Model & Intelligence d'Affaires`,
      risk: `Monétisation de la Propriété Intellectuelle. Articles premium, études sectorielles payantes, intelligence économique actionnable.`,
      arch: 'Lead Magnet → KBR Premium → KBR Corporate → Abonnement KOS REGTECH AI',
      refs: `BCEAO · COBAC · GAFI · OCDE · FMI · Banque Mondiale · BAD · ISSB · NGFS`,
      i: ['Études sectorielles premium · 28 études/an · Baromètres réglementaires', 'Notes de conjoncture trimestrielles · Policy Briefs · Position Papers', 'KOS REGTECH AI Knowledge Graph™ — 509 documents vérifiés · 332 sources · 200 citations · 136 textes'],
    },
  ];

  // Colonne droite — KPIs KOS REGTECH AI 150%
  const sY = TOP + 31;
  statBox(doc, '120', 'Hubs\nKOS REGTECH AI', buMinX, sY, buMinW, 22);
  statBox(doc, '101', 'Edge Functions\nDéployées', buMinX, sY + 25, buMinW, 22);
  statBox(doc, '4', 'Business Units\n+ KOS REGTECH AI', buMinX, sY + 50, buMinW, 22);
  statBox(doc, '17', 'Pays\nUEMOA · CEMAC · OHADA', buMinX, sY + 75, buMinW, 22);

  // Métriques Advisory KOS REGTECH AI
  fc(doc, GLD);
  doc.roundedRect(buMinX, sY + 100, buMinW, 9, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GRN);
  doc.text('STANDARDS INTERNATIONAUX ADAPTÉS', buMinX + buMinW / 2, sY + 105.5, { align: 'center' });

  const roiItems = [
    'Standards internationaux adaptés à l\'Afrique',
    '75 agents IA + 102 Edge Functions',
    'Triple ISO certifiée (42001/27001/9001)',
    '99.999% uptime · MTTR < 5 min',
  ];
  let ry = sY + 112;
  for (const ri of roiItems) {
    bullet(doc, ri, buMinX + 3, ry, buMinW - 6, GLD, 6.5);
    ry += 4.8;
  }

  // 4 BU cards — stacked vertically
  let buY = y;
  bus.forEach((bu, i) => {
    let itemLines = 0;
    const itemTextW = buCardW - 14;
    bu.i.forEach((it) => { itemLines += doc.splitTextToSize(it, itemTextW).length; });
    const cardH = 8 + 5.5 + itemLines * 3 + 6 + 8;
    const gap = i > 0 ? 2.5 : 0;
    const absY = buY + gap;

    // Fond carte
    fc(doc, WHT);
    doc.roundedRect(M, absY, buCardW, cardH, 1.8, 1.8, 'F');
    fc(doc, i === 3 ? GRN : GLD);
    doc.rect(M, absY, buCardW, 0.6, 'F');

    // Numéro cercle
    fc(doc, i === 3 ? GLD : GRN);
    doc.circle(M + 6, absY + 7, 4, 'F');
    setFont(doc, 'b', 7);
    tc(doc, i === 3 ? GRN : GLD);
    doc.text(bu.n, M + 6, absY + 9, { align: 'center' });

    // Titre
    setFont(doc, 'b', 8.5);
    tc(doc, i === 3 ? GLD : GRN);
    doc.text(bu.t, M + 13, absY + 8.5);

    // Risk hook
    setFont(doc, 'i', 6.5);
    tc(doc, BLK);
    const rl = doc.splitTextToSize(bu.risk, buCardW - 16);
    doc.text(rl, M + 13, absY + 15);

    // Architecture badge
    const archW = doc.getTextWidth(bu.arch) + 10;
    const badgeY = absY + 15 + rl.length * 3.8;
    fc(doc, GLD);
    doc.roundedRect(M + 3, badgeY, Math.min(archW, buCardW - 6), 4.5, 1, 1, 'F');
    setFont(doc, 'b', 5.5);
    tc(doc, GRN);
    doc.text(bu.arch, M + 8, badgeY + 3.2);

    // Bulletin points
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

    // Références réglementaires
    const refY = itemY + 0.5;
    fc(doc, CRM);
    doc.roundedRect(M + 3, refY, buCardW - 6, 5.2, 0.8, 0.8, 'F');
    setFont(doc, 'i', 5);
    tc(doc, GRY);
    doc.text(bu.refs, M + 8, refY + 3.6);

    buY = absY + cardH;
  });

  let offersEnd = buY + 3;

  // Modèle Land & Expand KOS REGTECH AI
  const landY = offersEnd + 2;
  y = sTitleAlt(doc, `Modèle Land & Expand — Du Diagnostic Gratuit à l'Abonnement KOS`, landY);

  const landSteps = [
    { t: 'N1 — Diagnostic', d: 'Gratuit · 8 min · Score /100 · Restitution Partner 30 min' },
    { t: 'N2 — Premium', d: 'Mission complète · Partner dédié · Livrables standards internationaux' },
    { t: 'N3 — Enterprise', d: 'Accompagnement annuel · Comité pilotage trimestriel' },
    { t: 'N4 — Abonnement', d: 'Conformité continue KOS REGTECH AI · Dashboard · Alertes · Hotline' },
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

  // Lead Magnets — 6 diagnostics premium
  y = sTitleAlt(doc, 'Lead Magnets — 6 Diagnostics Gratuits en Ligne', y);

  const leads = [
    { t: 'Diag Prix de Transfert', d: '8 min — Score BEPS /100 · Risques · Plan d\'action', p: 'Gratuit' },
    { t: 'Pré-Inspection BCEAO', d: '8 min — 25 constats critiques · Score conformité', p: 'Gratuit' },
    { t: 'Pré-Inspection COBAC', d: '8 min — 25 constats critiques · Score conformité CEMAC', p: 'Gratuit' },
    { t: 'Gouvernance & Risques', d: '8 min — 5 axes COSO · Score maturité GRC', p: 'Gratuit' },
    { t: 'Contrôle Interne', d: '8 min — 3 lignes de défense · Score conformité', p: 'Gratuit' },
    { t: 'ESG & Durabilité', d: '8 min — Score ISSB/GRI · Alignement SDG', p: 'Gratuit' },
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

  // Témoignages
  y = sTitleAlt(doc, 'Témoignages — Investisseurs · Banques · Promoteurs', y);

  const testi = [
    { q: 'KOS REGTECH AI a détecté 14 red flags critiques en 12 minutes. Notre due diligence qui prenait 3 semaines est maintenant automatisée à 92%.', a: 'Directeur Investissements, Fonds PE — Luxembourg' },
    { q: 'Notre documentation BEPS a été générée et validée par KOS REGTECH AI en 4 heures. Le dossier a été qualifié "exemplaire" par l\'auditeur externe.', a: 'DAF, Groupe Bancaire Panafricain — UEMOA' },
    { q: 'L\'audit à blanc BCEAO a révélé 12 non-conformités critiques. 90 jours plus tard, l\'inspection réelle s\'est conclue sans aucune sanction.', a: 'DG, Institution de Microfinance — Bénin' },
  ];
  const tW = (CW - 6) / 3;
  testi.forEach((t, i) => {
    const tx = M + i * (tW + 3);
    testimonialCard(doc, t.q, t.a, tx, y, tW, 38);
  });
}

// ═══════════════════════════════════════════════════════════════
// PAGE 3 — FONDATEUR, MÉTHODOLOGIE KOS REGTECH AI, ZONES
// ═══════════════════════════════════════════════════════════════
export function drawPage3(doc: jsPDF, logo: string | null, founderImg: string | null) {
  fc(doc, WHT);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 3, TOTAL_PAGES, `Directeur Associé · Méthodologie Internationale · 120 Hubs · 17 pays`);
  footer(doc);

  let y = TOP;

  // Fondateur
  y = sTitle(doc, `SIMDA Essoyomèwè — Directeur Associé & Fondateur · Architecte KOS REGTECH AI`, y);

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

  premiumBadge(doc, 'FONDATEUR & ARCHITECTE KOS REGTECH AI™', textX2, y, 55);

  setFont(doc, 'b', 14);
  tc(doc, DGR);
  doc.text('SIMDA Essoyomèwè', textX2, y + 16.5);

  setFont(doc, 'i', 8);
  tc(doc, GRN);
  doc.text('Due Diligence · Structuration · Investment Readiness · ESG · KOS REGTECH AI Architect', textX2, y + 23.5);

  goldRule(doc, textX2, y + 25.5, 95);

  const bio = 'Directeur Associé avec +22 ans d\'expérience terrain en Afrique de l\'Ouest et Centrale. Expert senior en structuration organisationnelle, advisory stratégique, gouvernance d\'entreprise et gestion des risques. Architecte du KOS REGTECH AI™ — plateforme de 120 hubs interconnectés, 102 Edge Functions, 75 agents IA et 4 Business Units opérant en synergie. La méthodologie s\'inspire des meilleurs standards internationaux pour les adapter aux réalités réglementaires africaines (UEMOA, CEMAC, OHADA, BCEAO, COBAC). Accompagne directement investisseurs, promoteurs et institutions financières dans la sécurisation de leurs décisions à haut enjeu.';
  justifyBlock(doc, bio, textX2, y + 31, textW2 - 4, 7.5, GRY);

  const tags = ['KOS REGTECH AI', 'OHADA', 'BCEAO', 'COBAC', 'BEAC', 'UEMOA', 'CEMAC', 'IFRS', 'ESG', 'BAD', 'IFC', '75 Agents IA'];
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
  doc.text(`linkedin.com/in/essoyomèwè-simda-650a5142`, textX2 + 21, tagY + 11);

  y = Math.max(y + photoH, tagY + 15) + 5;

  // Méthodologie KOS REGTECH AI
  y = sTitleAlt(doc, `Notre Méthodologie — KOS REGTECH AI™ · Constitution KHEPRA Art. 6`, y);

  const steps = [
    { n: '1', t: `Diagnostic 360°`, d: `Cartographie des risques et opportunités. Les 75 agents IA analysent votre contexte réglementaire en temps réel. Livrable : rapport 40+ pages.` },
    { n: '2', t: `Conception & Modélisation`, d: `Solutions sur mesure générées par KOS REGTECH AI, références réglementaires applicables, modèle financier multi-scénarios.` },
    { n: '3', t: `Exécution & Accompagnement`, d: `Livrables selon standards internationaux, auto-générés par les 4 BUs en synergie. Accompagnement terrain, gestion du changement.` },
    { n: '4', t: `Closing & Évaluation`, d: `Validation comités, mesure d'impact documentée, transfert compétences augmenté par IA, plan post-mission.` },
  ];

  const stW = (CW - 9) / 4;
  steps.forEach((s, i) => {
    const sx = M + i * (stW + 3);
    stepBox(doc, s.n, s.t, s.d, sx, y, stW, 34);
    if (i < steps.length - 1) {
      setFont(doc, 'b', 12);
      tc(doc, GLD);
      doc.text('\u25b8', sx + stW + 2.5, y + 16.5, { align: 'center' });
    }
  });

  y += 38;

  // Zones d'intervention
  y = sTitle(doc, `Zones d'intervention — 17 pays (UEMOA · CEMAC · OHADA)`, y);

  const westW = CW * 0.55 - 2;
  const centW = CW * 0.45 - 2;
  const centX = M + westW + 4;

  fc(doc, GLD);
  doc.roundedRect(M, y, westW, 7.5, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GRN);
  doc.text('UEMOA / OHADA — 11 pays', M + westW / 2, y + 5.3, { align: 'center' });

  fc(doc, GRN);
  doc.roundedRect(centX, y, centW, 7.5, 1.5, 1.5, 'F');
  setFont(doc, 'b', 7);
  tc(doc, GLD);
  doc.text('CEMAC — 6 pays', centX + centW / 2, y + 5.3, { align: 'center' });

  y += 10;

  const west = ['Bénin', 'Côte d\'Ivoire', 'Ghana', 'Guinée-Bissau', 'Mali', 'Niger', 'Sénégal', 'Togo \u2605 Siège', 'Burkina Faso', 'Guinée', 'Sierra Leone'];
  const central = ['Cameroun', 'Tchad', 'Centrafrique', 'Gabon', 'Guinée Éq.', 'Congo'];

  const wc = westW / 3;
  west.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const cx = M + col * wc + 2;
    const cy = y + row * 7;
    const isSiege = c.includes('Togo');
    if (isSiege) {
      fc(doc, GLD);
      doc.roundedRect(M + col * wc, cy - 4.5, wc - 1, 6, 0.8, 0.8, 'F');
    }
    setFont(doc, isSiege ? 'b' : 'n', 6.5);
    tc(doc, isSiege ? GRN : GRY);
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

  // CTA bas de page
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
    doc.text('KOS REGTECH AI™ — 120 Hubs · 102 Edge Functions · 75 Agents IA · /pricing', W / 2, y + 13, { align: 'center' });

    setFont(doc, 'i', 8);
    tc(doc, SGR);
    doc.text('\u00ab Pas de rapport théorique. Des diagnostics augmentés par IA, calibrés pour les réalités africaines. \u00bb', W / 2, y + 22, { align: 'center' });

    const ctCols = [
      { icon: '\u2709', lbl: 'Email', val: 'contact@khepraexperts.com' },
      { icon: '\u260e', lbl: 'Téléphone', val: '+228 93 98 49 09' },
      { icon: '\u2316', lbl: 'Adresse', val: 'Quartier Logogomè, Lomé, Togo' },
      { icon: '\u22a1', lbl: 'Web', val: 'khepraexperts.com' },
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

    ndaBanner(doc, M, y + ctaH - 14, CW, 'NDA SYSTÉMATIQUE · CONFIDENTIALITÉ ABSOLUE');

    if (logo) {
      img(doc, logo, W / 2 - 8, y + ctaH - 31, 16, 16);
      setFont(doc, 'b', 8);
      tc(doc, WHT);
      doc.text('KHEPRA EXPERTS — KOS REGTECH AI™', W / 2, y + ctaH - 3, { align: 'center' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE 4 — THINK TANK BU4 + SECTEURS
// ═══════════════════════════════════════════════════════════════
export function drawPage4(doc: jsPDF, logo: string | null) {
  fc(doc, WHT);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 4, TOTAL_PAGES, 'BU4 KBR-Model™ · Intelligence d\'Affaires · Monétisation PI · KOS REGTECH AI Research Institute™');
  footer(doc);

  let y = TOP;

  // HOOK — KOS REGTECH AI THINK TANK
  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 24, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 4, 24, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('BU4 KBR-MODEL™ & INTELLIGENCE D\'AFFAIRES — MONÉTISATION PI ALIMENTÉE PAR KOS REGTECH AI™', M + 8, y + 7.5);

  const hookText = 'Contrairement aux cabinets traditionnels qui s\'appuient sur de la littérature publique, KHEPRA EXPERTS a construit sa 4ème Business Unit comme un moteur de monétisation de la Propriété Intellectuelle intégré au KOS REGTECH AI™. Le KBR-Model (Knowledge-Based Revenue) transforme la connaissance en revenus récurrents : articles premium, études sectorielles payantes, baromètres réglementaires et notes de conjoncture alimentées par le KOS REGTECH AI Knowledge Graph™ (509 documents vérifiés, 332 sources réglementaires, 200 citations vérifiées, 136 textes BCEAO/COBAC/GAFI/OHADA). Cette intelligence est injectée en temps réel dans les 3 autres BUs, garantissant que chaque livrable anticipe les évolutions réglementaires plutôt que d\'y réagir.';
  justifyBlock(doc, hookText, M + 8, y + 14, CW - 14, 6.5, SGR);

  y += 28;

  // THINK TANK — SECTION PRINCIPALE
  y = sTitleGreen(doc, 'KBR-Model™ — BU4 · Monétisation PI & Intelligence d\'Affaires', y);

  const ttCardW = Math.floor((CW - 6) / 2);
  const ttCardH = 56;

  // Colonne gauche — Axes de recherche
  fc(doc, WHT);
  doc.roundedRect(M, y, ttCardW, ttCardH, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, ttCardW, 0.8, 'F');
  fc(doc, GRN);
  doc.rect(M, y, 3.5, ttCardH, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GRN);
  doc.text('5 Axes de Recherche & Monétisation KBR', M + 8, y + 8);

  const axes = [
    { n: '01', t: 'Régulation Financière & Prudentielle', d: 'BCEAO · COBAC · BEAC · GABAC · Bâle II/III · IFRS · Stress Tests' },
    { n: '02', t: 'Gouvernance & Due Diligence', d: 'Performance Boards · Audits pré-acquisition · Conflits · ISO 37000' },
    { n: '03', t: 'Climat, ESG & Décarbonation', d: 'Bilans carbone · ISSB/GRI/CSRD · Financements verts · NGFS' },
    { n: '04', t: 'KBR-Model & Business Intelligence', d: 'Études sectorielles premium · Notes de conjoncture · Baromètres' },
    { n: '05', t: 'Digital, FinTech & Cybersécurité', d: 'Open Banking · APIs · IA Réglementaire · CBDC · DORA · NIST' },
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

  // Colonne droite — Stats KOS REGTECH AI
  const ttRX = M + ttCardW + 6;
  fc(doc, DGR);
  doc.roundedRect(ttRX, y, ttCardW, ttCardH, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(ttRX, y, ttCardW, 0.8, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('Impact & Production KBR-Model', ttRX + 6, y + 8);

  const ttStats = [
    { v: '28', l: 'Études\n/ an' },
    { v: '500', l: 'Citations\nacadémiques' },
    { v: '509', l: 'Documents\nKnowledge Graph' },
    { v: '3', l: 'Niveaux\nKBR (L1/L2/L3)' },
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
    'Études Sectorielles Premium',
    'Notes de Conjoncture',
    'Baromètres Réglementaires',
    'Policy Briefs',
    'Position Papers',
    'Executive Summaries (L1)',
    'Articles Premium (L2)',
    'Rapports High-Ticket (L3)',
  ];
  let ptY = y + 33;
  setFont(doc, 'b', 7);
  tc(doc, GLD);
  doc.text('Publications & Livrables :', ttRX + 6, ptY);
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

  // SECTION A — Microfinance
  y = sTitle(doc, 'Pilier Sectoriel 1 — Microfinance & Institutions Financières', y);

  const mfCardW = (CW - 4) / 2;
  const mfOffers = [
    { n: 'MF1', t: 'Conformité & Gouvernance SFD/EMF', i: ['Audit conformité BCEAO/COBAC 95+ points de contrôle', 'Restructuration gouvernance et contrôle interne (3 lignes)', 'Préparation dossier agrément SFD/EMF et renouvellement', 'Manuel de procédures et politiques réglementaires KOS REGTECH AI'] },
    { n: 'MF2', t: 'Gestion des Risques & Performance', i: ['Politique gestion des risques intégrée conforme BCEAO', 'Modèles de scoring crédit adaptés au segment clients', 'Réduction PAR 30 : 50 à 75% en 12 à 18 mois', 'Provisionnement conforme normes prudentielles'] },
  ];

  const mfRow1 = [
    expertCard(doc, mfOffers[0].n, mfOffers[0].t, mfOffers[0].i, M, y, mfCardW),
    expertCard(doc, mfOffers[1].n, mfOffers[1].t, mfOffers[1].i, M + mfCardW + 4, y, mfCardW),
  ];
  y = Math.max(...mfRow1) + 1;

  // SECTION B — Projets Industriels
  y = sTitle(doc, 'Pilier Sectoriel 2 — Projets Industriels & Financement Structuré', y);

  const indOffers = [
    { n: 'PI1', t: 'Études de Faisabilité Industrielle', i: ['Étude intégrée marché · technique · financière · ESG', 'Modélisation financière 10 ans conforme BAD/IFC', 'Analyse de sensibilité et stress tests multi-scénarios', 'Dossier banque d\'investissement et comité de crédit'] },
    { n: 'PI2', t: 'Structuration & Project Finance', i: ['Montage financier optimisé dette / fonds propres', 'Due diligence technique, juridique et ESG', 'Négociation contrats et conventions de financement', 'Accompagnement jusqu\'au closing financier'] },
  ];

  const indRow1 = [
    expertCard(doc, indOffers[0].n, indOffers[0].t, indOffers[0].i, M, y, mfCardW),
    expertCard(doc, indOffers[1].n, indOffers[1].t, indOffers[1].i, M + mfCardW + 4, y, mfCardW),
  ];
  y = Math.max(...indRow1) + 1;

  // SECTION C — Étude de cas
  y = sTitleAlt(doc, 'Étude de Cas — Redressement Réseau Microfinance UEMOA — Powered by KOS REGTECH AI™', y);

  const caseHeader = 'RÉSEAU DE MICROFINANCE · 85 CAISSES · 250K CLIENTS · 52M\u20ac D\'ENCOURS · MISSION 18 MOIS · POWERED BY KOS REGTECH AI™';
  const caseContext = 'Réseau de 85 caisses, 250K clients, 52M\u20ac d\'encours, PAR 30 à 19%, pertes cumulées 3,1 M\u20ac, menace de retrait d\'agrément par la BCEAO, gouvernance défaillante, reporting tardif.';
  const caseMission = 'Audit conformité 95 points de contrôle, restructuration gouvernance avec PCA indépendant, refonte contrôle interne 3 lignes, déploiement core banking sur 85 caisses, formation 350 collaborateurs, lancement mobile banking et intégration APIs.';
  const caseResults = '100% conformité réglementaire, PAR 30 à 3,8%, résultat net +2,4 M\u20ac année 2, temps de reporting -78%, 42K clients mobile banking, agrément renouvelé sans réserve.';
  y = caseStudyBox(doc, caseHeader, caseContext, caseMission, caseResults, M, y, CW);

  y += 3;

  // Lead Magnets
  if (y < BOT - 28) {
    y = sTitleAlt(doc, 'Lead Magnets — Diagnostics sectoriels gratuits', y);
    const mfLeads = [
      { t: 'Diag Conformité SFD', d: '8 min — Écart BCEAO/COBAC 95+ points', p: 'Gratuit' },
      { t: 'Diag Prix de Transfert', d: '8 min — Score BEPS /100 · Risques TP', p: 'Gratuit' },
      { t: 'Maturité Stratégique', d: '8 min — 5 niveaux · Pilotage · Risques', p: 'Gratuit' },
      { t: 'Indice Bancabilité', d: '8 min — 5 dimensions · Niveau 1-5', p: 'Gratuit' },
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
// PAGE 5 — DIAGNOSTIC MATURITÉ, ROADMAP, CTA FINAL KOS REGTECH AI 150%
// ═══════════════════════════════════════════════════════════════
export function drawPage5(doc: jsPDF, logo: string | null) {
  fc(doc, CRM);
  doc.rect(0, 0, W, H, 'F');
  header(doc, logo, 5, TOTAL_PAGES, 'Diagnostic Maturité · Roadmap 18 Mois · Engagement KOS REGTECH AI™');
  footer(doc);

  let y = TOP;

  // Maturity Table
  y = sTitleGreen(doc, 'Diagnostic Maturité — 5 Dimensions d\'Analyse', y);

  const maturityCats = [
    { label: 'Gouvernance', score: 78, desc: 'Conseil, stratégie, pouvoirs, indépendance', indicators: '95 pts BCEAO · Comités spécialisés · PCA indépendant · Politique rémunération · Éthique' },
    { label: 'Conformité', score: 72, desc: 'Réglementation, reporting, contrôle', indicators: 'COBAC · Plans préventifs · Normes IFRS · Contrôle interne 3 lignes · Cartographie risques' },
    { label: 'Risques', score: 65, desc: 'Crédit, marché, opérationnel, concentration', indicators: 'PAR 30 < 5% · Scoring automatisé · Provisionnement conforme · Stress-test · ALM' },
    { label: 'Digital & IA', score: 58, desc: 'Core banking, mobile, APIs, KOS, cybersécurité', indicators: 'Mobile banking · APIs fintech · Reporting IA · Core banking · SOC 2 · KOS REGTECH AI Ready' },
    { label: 'Performance', score: 74, desc: 'Rentabilité, croissance, ROE, productivité', indicators: 'ROE > 15% · Levée fonds DFI · Expansion régionale · Productivité staff · NPL < 3%' },
  ];
  y = maturityTable(doc, maturityCats, M, y, CW) + 6;

  // Roadmap
  y = sTitle(doc, 'Feuille de Route Type — Transformation 18 Mois avec KOS REGTECH AI™', y);

  const milestones = [
    { m: 'M1-M3', d: 'Audit et diagnostic KOS REGTECH AI' },
    { m: 'M4-M6', d: 'Restructuration IA' },
    { m: 'M7-M9', d: 'Déploiement systèmes' },
    { m: 'M10-M12', d: 'Formation et pilotage' },
    { m: 'M13-M15', d: 'Digital et expansion' },
    { m: 'M16-M18', d: 'Validation et closing' },
  ];
  milestoneTimeline(doc, milestones, M, y, CW);
  y += 42;

  // KOS REGTECH AI Stats band
  fc(doc, DGR);
  doc.roundedRect(M, y, CW, 22, 2, 2, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.6, 'F');

  const quickStats = [
    { v: 'KOS\nREGTECH', l: 'AI\nPlatform' },
    { v: '127', l: 'Hubs\nKOS REGTECH AI' },
    { v: '101', l: 'Edge Functions\nDéployées' },
    { v: '5', l: 'Réseaux\nSociaux Actifs' },
    { v: '0', l: 'Hallucination\nTolérance Zéro' },
  ];
  const qsW = CW / 5;
  quickStats.forEach((s, i) => {
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

  // Call to Action final KOS REGTECH AI 150%
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
    doc.text('KOS REGTECH AI™ — La plateforme inspirée des meilleurs standards, adaptée à l\'Afrique Francophone', W / 2, y + 13, { align: 'center' });

    setFont(doc, 'i', 8.5);
    tc(doc, SGR);
    doc.text('\u00ab 120 Hubs. 102 Edge Functions. 75 Agents IA. 4 Business Units. KOS REGTECH AI™. Triple ISO. Zéro hallucination. /pricing. \u00bb', W / 2, y + 22, { align: 'center' });

    const contactItems = [
      { icon: '\u2709', label: 'Email', val: 'contact@khepraexperts.com' },
      { icon: '\u260e', label: 'Téléphone', val: '+228 93 98 49 09' },
      { icon: '\u2316', label: 'Adresse', val: 'Quartier Logogomè, Lomé, Togo' },
      { icon: '\u22a1', label: 'Web', val: 'khepraexperts.com' },
    ];
    contactBlock(doc, contactItems, M, y + 28, CW, ctaH - 32);

    ndaBanner(doc, M, y + ctaH - 12, CW, 'NDA SYSTÉMATIQUE · CONFIDENTIALITÉ ABSOLUE · KOS REGTECH AI™');

    if (logo) {
      img(doc, logo, W / 2 - 8, y + ctaH - 27, 16, 16);
      setFont(doc, 'b', 8);
      tc(doc, WHT);
      doc.text('KHEPRA EXPERTS — KOS REGTECH AI™', W / 2, y + ctaH - 2, { align: 'center' });
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// PAGE 6 — COVER ARRIÈRE KOS REGTECH AI™
// ═══════════════════════════════════════════════════════════════
export function drawPage6(doc: jsPDF, logo: string | null) {
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
  doc.text('Knowledge Operating System™ — Standards Internationaux Adaptés · /pricing · /scan', M + 15, 14.5);

  setFont(doc, 'b', 6.5);
  tc(doc, GLD);
  doc.text('6 / 6', W - M, 10, { align: 'right' });

  // Ligne signature
  goldRule(doc, M, HDR + 6, CW);

  let y = HDR + 16;

  // KOS REGTECH AI Architecture Stack — visuel puissant
  fc(doc, [...GRN, 0.15] as any);
  doc.roundedRect(M, y, CW, 48, 3, 3, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 1.2, 'F');

  setFont(doc, 'b', 11);
  tc(doc, GLD);
  doc.text('KOS REGTECH AI™ — KNOWLEDGE OPERATING SYSTEM', W / 2, y + 11, { align: 'center' });

  setFont(doc, 'i', 7.5);
  tc(doc, SGR);
  doc.text('Architecture certifiée Triple ISO (42001/27001/9001) — Standards internationaux adaptés à l\'Afrique Francophone', W / 2, y + 19.5, { align: 'center' });

  // 4 piliers technique
  const pillars = [
    { v: '120', l: 'Hubs\nKOS REGTECH AI', color: GRN },
    { v: '101', l: 'Edge Functions\nActives', color: GLD },
    { v: '75', l: 'Agents IA\nSupra-optimaux', color: GRN },
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

  // 4 Business Units — rappel visuel
  fc(doc, [...DGR, 0.5] as any);
  doc.roundedRect(M, y, CW, 42, 2.5, 2.5, 'F');
  fc(doc, GLD);
  doc.rect(M, y, CW, 0.7, 'F');

  setFont(doc, 'b', 8.5);
  tc(doc, GLD);
  doc.text('4 BUSINESS UNITS EXCLUSIVES — STANDARDS INTERNATIONAUX ADAPTÉS — CONSTITUTION KHEPRA ART. 2', W / 2, y + 9, { align: 'center' });

  const buRecap = [
    { n: 'BU1', t: 'Régulation Financière & Conformité', d: 'Audit · BCEAO/COBAC · Bouclier réglementaire' },
    { n: 'BU2', t: 'Gouvernance & Due Diligence', d: 'Audit Board · DD pré-acquisition · Conflits' },
    { n: 'BU3', t: 'Climat, Transition & ESG', d: 'Décarbonation · ISSB/GRI · Financements verts' },
    { n: 'BU4', t: 'KBR-Model & Intelligence d\'Affaires', d: 'Études premium · Baromètres · Monétisation PI' },
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

  // 17 pays badge
  fc(doc, GLD);
  doc.roundedRect(W / 2 - 45, y + 33, 90, 8, 1.5, 1.5, 'F');
  setFont(doc, 'b', 6.5);
  tc(doc, GRN);
  doc.text('17 PAYS — UEMOA · CEMAC · OHADA', W / 2, y + 37.5, { align: 'center' });

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
  doc.text('CONTACTEZ-NOUS', W / 2, y + 10, { align: 'center' });

  const contactItems = [
    { icon: '✉', label: 'Email', val: 'contact@khepraexperts.com' },
    { icon: '☎', label: 'Téléphone', val: '+228 93 98 49 09' },
    { icon: '⌖', label: 'Adresse', val: 'Quartier Logogomè, Lomé, Togo' },
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

  // NDA Banner
  ndaBanner(doc, M, y, CW, 'NDA SYSTÉMATIQUE · CONFIDENTIALITÉ ABSOLUE · KOS REGTECH AI™');

  y += 10;

  // Certification badges
  const certs = ['ISO 42001:2023 AI Management', 'ISO 27001:2022 Sécurité', 'ISO 9001:2015 Qualité', 'Standards Internationaux Adaptés'];
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
  doc.text('« 127 Hubs. 101 Edge Functions. 509 Documents KB. 75 Agents IA. 4 Business Units. 5 Réseaux Sociaux. KOS REGTECH AI™. »', W / 2, y + 6, { align: 'center' });
  setFont(doc, 'i', 6);
  tc(doc, SGR);
  doc.text('Khepra Experts — KOS REGTECH AI™ — Brochure Institutionnelle 2026 — ' + DOC_DATE, W / 2, y + 11.5, { align: 'center' });

  // Footer minimal
  fc(doc, [...DGR, 0.7] as any);
  doc.rect(0, H - 8, W, 8, 'F');
  fc(doc, GLD);
  doc.rect(0, H - 8, W, 0.4, 'F');
  setFont(doc, 'n', 5);
  tc(doc, SGR);
  doc.text(`${DOC_REF} — ${DOC_CLASS} — © Khepra Experts 2026 — Tous droits réservés`, W / 2, H - 3, { align: 'center' });
}



