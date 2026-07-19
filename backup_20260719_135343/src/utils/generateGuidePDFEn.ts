import jsPDF from 'jspdf';

const BRAND_R = 26, BRAND_G = 58, BRAND_B = 42;
const GOLD_R = 201, GOLD_G = 168, GOLD_B = 76;
const LIGHT_R = 249, LIGHT_G = 246, LIGHT_B = 240;

const LOGO_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png';

async function loadImageAsBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, { mode: 'cors', cache: 'no-cache' });
    if (!response.ok) return null;
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function addPageBackground(doc: jsPDF) {
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, 210, 297, 'F');
}

function hex(doc: jsPDF, r: number, g: number, b: number) {
  doc.setTextColor(r, g, b);
}

function addHeader(doc: jsPDF, pageNum: number, totalPages: number, guideTitle: string, logoBase64?: string | null) {
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 20, 210, 1.2, 'F');

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 14, 3, 13, 13);
    } catch { /* silent fallback */ }
  }

  const textX = logoBase64 ? 30 : 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  hex(doc, 255, 255, 255);
  doc.text('KHEPRA EXPERTS', textX, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text(guideTitle, textX, 18);

  if (pageNum > 1) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    hex(doc, GOLD_R, GOLD_G, GOLD_B);
    doc.text(`${pageNum} / ${totalPages}`, 200, 13, { align: 'right' });
  }
}

function addFooter(doc: jsPDF) {
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 284, 210, 13, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 284, 210, 0.8, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09  |  Nanegbe District, AISED crossroads, Lome, Togo', 105, 291, { align: 'center' });
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  hex(doc, 180, 180, 180);
  doc.text('khepraexperts.com', 105, 295, { align: 'center' });
}

function sectionTitle(doc: jsPDF, text: string, y: number): number {
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, y, 182, 0.5, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(14, y + 2, 5, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text(text, 23, y + 9);
  return y + 18;
}

function bodyText(doc: jsPDF, text: string, x: number, y: number, maxWidth: number): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  hex(doc, 70, 70, 70);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * 5.5;
}

function bulletItem(doc: jsPDF, text: string, x: number, y: number, maxWidth: number): number {
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.circle(x + 1.8, y - 1.5, 1.1, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  hex(doc, 70, 70, 70);
  const lines = doc.splitTextToSize(text, maxWidth - 7);
  doc.text(lines, x + 6, y);
  return y + lines.length * 5.5 + 1.5;
}

function infoBox(doc: jsPDF, title: string, items: string[], x: number, y: number, w: number, h: number): void {
  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(x, y, w, h, 3, 3, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(x, y, 3, h, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text(title, x + 8, y + 9);
  let cy = y + 16;
  for (const item of items) {
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.circle(x + 9.5, cy - 1.3, 0.9, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 70, 70, 70);
    const il = doc.splitTextToSize(item, w - 18);
    doc.text(il, x + 13, cy);
    cy += il.length * 4.5 + 2;
  }
}

function addCoverPage(
  doc: jsPDF,
  title: string,
  subtitle: string,
  category: string,
  coverBase64: string | null,
  logoBase64: string | null
) {
  addPageBackground(doc);

  if (coverBase64) {
    try {
      doc.addImage(coverBase64, 'JPEG', 0, 0, 210, 297);
    } catch {
      doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
      doc.rect(0, 0, 210, 297, 'F');
    }
  } else {
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.rect(0, 0, 210, 297, 'F');
  }

  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.setGState(new (doc as any).GState({ opacity: 0.75 }));
  doc.rect(0, 0, 210, 297, 'F');
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 195, 210, 1.5, 'F');
  doc.rect(0, 199, 210, 0.5, 'F');

  doc.setFillColor(255, 255, 255);
  doc.rect(0, 205, 210, 92, 'F');

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 14, 14, 24, 24);
    } catch { /* fallback */ }
  }

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, 50, 60, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text(category.toUpperCase(), 44, 56.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  hex(doc, 255, 255, 255);
  const titleLines = doc.splitTextToSize(title, 180);
  doc.text(titleLines, 14, 72);

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 72 + titleLines.length * 14, 50, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  hex(doc, 200, 215, 208);
  const subLines = doc.splitTextToSize(subtitle, 170);
  doc.text(subLines, 14, 72 + titleLines.length * 14 + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text('Practical Guide — KHEPRA EXPERTS', 14, 220);

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 223, 50, 0.8, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  hex(doc, 80, 80, 80);
  doc.text('contact@khepraexperts.com', 14, 232);
  doc.text('+228 93 98 49 09', 14, 239);
  doc.text('Lome, Togo', 14, 246);

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 172, 212, 24, 24);
    } catch { /* fallback */ }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('2025', 196, 290, { align: 'right' });
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 1 — SME Governance Guide (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateGouvernancePMEEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'SME Governance Guide';
  const totalPages = 5;

  const [logoBase64, coverBase64, img2Base64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=Professional%20business%20governance%20meeting%20with%20diverse%20African%20executives%20around%20modern%20conference%20table%2C%20clean%20minimalist%20office%20interior%20with%20natural%20light%2C%20documents%20and%20laptops%2C%20corporate%20professional%20atmosphere%2C%20soft%20neutral%20tones%2C%20high%20quality%20business%20photography&width=840&height=1188&seq=gov-cover-v1&orientation=portrait'),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=Corporate%20board%20meeting%20room%20with%20governance%20documents%20and%20organizational%20charts%20on%20table%2C%20professional%20African%20business%20setting%2C%20clean%20modern%20boardroom%2C%20strategic%20planning%20session%2C%20warm%20lighting&width=400&height=220&seq=gov-img2-v1&orientation=landscape'),
  ]);

  // PAGE 1 — Cover
  addCoverPage(doc, 'SME Governance Guide', 'Implementing effective governance in your SME: board of directors, committees, decision-making processes and best practices.', 'Governance', coverBase64, logoBase64);

  // PAGE 2 — Introduction
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Why is governance essential?', y);
  y = bodyText(doc, 'Corporate governance refers to the set of rules, practices and processes by which a company is directed and controlled. For an African SME, good governance is a lever for growth, credibility and access to financing.', 14, y, 182);
  y += 5;

  if (img2Base64) {
    try {
      doc.addImage(img2Base64, 'JPEG', 14, y, 182, 40);
      doc.setDrawColor(GOLD_R, GOLD_G, GOLD_B);
      doc.setLineWidth(0.5);
      doc.rect(14, y, 182, 40);
      y += 46;
    } catch { y += 2; }
  }

  y = sectionTitle(doc, 'The 5 pillars of good SME governance', y);
  const pillars = [
    'Transparency — Clear and regular sharing of information with all stakeholders',
    'Accountability — Precise definition of roles, responsibilities and accountability of each actor',
    'Equity — Fair and equitable treatment of all shareholders and partners',
    'Compliance — Respect for laws, regulations and sector standards in force',
    'Sustainability — Decision-making oriented towards long-term value creation',
  ];
  for (const p of pillars) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Concrete benefits for your SME', y);
  const benefits = [
    'Better credibility with banks, investors and partners',
    'Reduction of conflicts between associates and managers',
    'Faster and better-documented decision-making',
    'Easier access to financing and public markets',
    'Better prepared and secured business transfer',
    'Enhanced attractiveness for talent and strategic partners',
  ];
  for (const b of benefits) {
    y = bulletItem(doc, b, 18, y, 178);
  }

  // PAGE 3 — Governance bodies
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Governance bodies to put in place', y);
  y = bodyText(doc, 'Depending on the size and maturity of your SME, here are the bodies to structure progressively:', 14, y, 182);
  y += 4;

  const organs = [
    {
      title: 'General Assembly (GA)',
      items: [
        'Mandatory annual meeting of all associates/shareholders',
        'Approval of accounts, allocation of results',
        'Appointment and dismissal of managers',
        'Major strategic decisions (merger, sale, capital increase)',
      ],
    },
    {
      title: 'Board of Directors (BoD)',
      items: [
        'Supervisory and strategic orientation body',
        'Recommended composition: 3 to 7 members including independents',
        'Minimum quarterly meetings with minutes',
        'Specialized committees: audit, remuneration, risks',
      ],
    },
    {
      title: 'General Management',
      items: [
        'Responsible for daily operational management',
        'Reports to the Board of Directors',
        'Formalized and documented delegations of authority',
        'Regular reporting to supervisory bodies',
      ],
    },
  ];

  for (const organ of organs) {
    infoBox(doc, organ.title, organ.items, 14, y, 182, 52);
    y += 58;
  }

  // PAGE 4 — Documents & Tools
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Fundamental governance documents', y);

  const docs_list = [
    { title: 'Articles of Association', items: ['Corporate purpose, capital, share distribution', 'Decision-making and voting rules', 'Conditions for transfer and transmission of shares', 'Exit and pre-emption clauses'] },
    { title: 'Internal Regulations', items: ['Detailed functioning of management bodies', 'Convening and deliberation procedures', 'Management of conflicts of interest', 'Remuneration policy for managers'] },
    { title: 'Governance Charter', items: ['Company values and guiding principles', 'Code of conduct and business ethics', 'CSR and sustainable development policy', 'Commitments to stakeholders'] },
  ];

  for (const d of docs_list) {
    infoBox(doc, d.title, d.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Governance dashboard — Key indicators', y);
  const kpis = [
    'Participation rate in GAs and BoD meetings',
    'Average time to produce financial statements',
    'Number of documented decisions per quarter',
    'Regulatory compliance rate (audits, declarations)',
    'Stakeholder satisfaction level (annual survey)',
  ];
  for (const kpi of kpis) {
    y = bulletItem(doc, kpi, 18, y, 178);
  }

  // PAGE 5 — Action plan
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Action Plan — Implement your governance in 6 steps', y);

  const steps = [
    { num: '01', title: 'Initial Diagnosis', desc: 'Assess the current state of your governance: existing documents, practices in place, identified gaps.' },
    { num: '02', title: 'Articles Revision', desc: 'Update the articles of association to reflect the current structure and future ambitions of the company.' },
    { num: '03', title: 'Body Creation', desc: 'Establish the Board of Directors or Management Committee with competent and independent members.' },
    { num: '04', title: 'Charter Drafting', desc: 'Develop the internal regulations, governance charter and delegations of authority.' },
    { num: '05', title: 'Leadership Training', desc: 'Train BoD members and management in governance best practices and legal obligations.' },
    { num: '06', title: 'Monitoring & Improvement', desc: 'Set up a governance dashboard and conduct an annual review of practices.' },
  ];

  for (const step of steps) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.num, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(step.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Need personalized support?', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('KHEPRA EXPERTS supports you in implementing your governance framework.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 2 — DFS Compliance Checklist (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateChecklistSFDEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'DFS Compliance Checklist — BCEAO / WAEMU';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=Financial%20compliance%20checklist%20document%20on%20modern%20desk%20with%20calculator%20and%20pen%2C%20African%20banking%20regulatory%20papers%2C%20organized%20workspace%2C%20professional%20financial%20setting%2C%20clean%20white%20background%2C%20top%20view%20flat%20lay%20photography&width=840&height=1188&seq=sfd-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'DFS Compliance Checklist', 'Ensuring regulatory compliance of your Decentralized Financial System according to BCEAO and WAEMU standards.', 'Finance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Regulatory framework applicable to DFS', y);
  y = bodyText(doc, 'Decentralized Financial Systems (DFS) operating in the WAEMU area are subject to a strict regulatory framework defined by the BCEAO. Compliance is a legal obligation and a guarantee of trust for your members and partners.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Reference texts', y);
  const texts = [
    'Framework law on the regulation of DFS in WAEMU member states',
    'BCEAO instruction on conditions of exercise and control of DFS',
    'Regulation on own funds and solvency of DFS',
    'Instruction on the DFS accounting plan (PCEC-DFS)',
    'Provisions relating to anti-money laundering (AML/CFT)',
    'Prudential standards and BCEAO regulatory ratios',
  ];
  for (const t of texts) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Licensing and authorization to operate', y);
  const agrement = [
    { title: 'License Application File', items: ['Compliant articles of association and internal regulations', 'Validated 3-year business plan', 'Proof of minimum equity capital', 'CVs and criminal records of managers', 'Administrative and financial procedures manual'] },
    { title: 'Renewal and Update', items: ['Annual activity declaration to BCEAO', 'Certified external audit report', 'Annual financial statements compliant with PCEC-DFS', 'Report on prudential ratios', 'Notification of any change of manager'] },
  ];
  for (const a of agrement) {
    infoBox(doc, a.title, a.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Prudential ratios to comply with', y);
  y = bodyText(doc, 'The BCEAO imposes strict prudential ratios that every DFS must monitor permanently. Here are the main ratios to control:', 14, y, 182);
  y += 4;

  const ratios = [
    { title: 'Solvency Ratio (Equity / Risk-weighted Assets)', items: ['Minimum required: 10% for level 1 and 2 DFS', 'Mandatory quarterly calculation', 'Reporting to BCEAO in case of non-compliance', 'Recovery plan within 30 days if ratio is insufficient'] },
    { title: 'Liquidity Ratio', items: ['Liquid assets / Short-term liabilities >= 80%', 'Monthly monitoring recommended', 'Mandatory reserves to be maintained with the central bank', 'Documented liquidity risk management'] },
    { title: 'Risk Limitation Ratio', items: ['Individual risk max: 10% of net equity', 'Overall risk max: 200% of net equity', 'Declaration of large risks to BCEAO', 'Mandatory credit committee for large commitments'] },
    { title: 'Long-term Employment Coverage Ratio', items: ['Stable resources / Long-term employment >= 100%', 'Adequacy between resources and employment', 'Documented transformation policy', 'Annual review by the Board of Directors'] },
  ];

  for (const r of ratios) {
    infoBox(doc, r.title, r.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Governance and internal control', y);
  const gouvernance = [
    'Board of Directors or equivalent body constituted and functional',
    'Internal audit committee operational with quarterly reports',
    'Separation of functions: management, control, operations',
    'Up-to-date credit, savings and cash procedures manual',
    'Management information system (MIS) compliant with BCEAO requirements',
    'Manager remuneration policy approved by the BoD',
    'Documented conflict of interest management procedures',
    'Annual internal audit with report transmitted to BCEAO',
  ];
  for (const g of gouvernance) {
    y = bulletItem(doc, g, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Anti-Money Laundering (AML/CFT)', y);
  const lcbft = [
    { title: 'Customer Identification (KYC)', items: ['Mandatory identity verification for every new member', 'Retention of supporting documents for 10 years', 'Regular update of customer files', 'Enhanced due diligence procedure for politically exposed persons (PEP)'] },
    { title: 'Suspicious Transaction Reports', items: ['Designation of an AML/CFT officer within the DFS', 'Documented reporting procedure to CENTIF', 'Annual staff training on AML/CFT risks', 'Up-to-date register of suspicious transaction reports'] },
  ];
  for (const l of lcbft) {
    infoBox(doc, l.title, l.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Compliance Checklist — Operational Summary', y);

  const checkItems = [
    '☐  Valid and up-to-date BCEAO license',
    '☐  Articles of association and internal regulations compliant with framework law',
    '☐  Equity at the required minimum level',
    '☐  Solvency ratio >= 10% (quarterly calculation)',
    '☐  Liquidity ratio >= 80% (monthly monitoring)',
    '☐  PCEC-DFS accounting plan applied',
    '☐  Annual financial statements certified by an external auditor',
    '☐  Annual report transmitted to BCEAO on time',
    '☐  Functional internal audit committee',
    '☐  Up-to-date credit procedures manual',
    '☐  Documented KYC and AML/CFT procedures',
    '☐  Designated and trained AML/CFT officer',
    '☐  Suspicious transaction reports transmitted to CENTIF if necessary',
    '☐  Annual staff training completed',
    '☐  Compliant management information system (MIS)',
  ];

  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(14, y, 182, checkItems.length * 9 + 8, 3, 3, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, y, 3, checkItems.length * 9 + 8, 1.5, 1.5, 'F');

  let cy = y + 9;
  for (const item of checkItems) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    hex(doc, 60, 60, 60);
    doc.text(item, 20, cy);
    cy += 9;
  }

  y = cy + 10;

  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('DFS Compliance Audit — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('We conduct comprehensive compliance audits for DFS in the WAEMU area.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 3 — Fundraising Guide in Africa (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateLeveeFondsEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Fundraising Guide in Africa';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20business%20pitch%20to%20investors%2C%20modern%20startup%20office%20with%20presentation%20screen%2C%20professional%20business%20meeting%2C%20diverse%20team%2C%20bright%20contemporary%20space%2C%20inspiring%20entrepreneurial%20atmosphere&width=840&height=1188&seq=lf-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Fundraising Guide in Africa', 'Strategies and best practices to succeed in your fundraising with African and international investors.', 'Entrepreneurship', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'The financing ecosystem in Africa', y);
  y = bodyText(doc, 'Africa has a rapidly expanding financing ecosystem. Understanding the different types of investors and their expectations is the first step to succeeding in your fundraising.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Types of investors in Africa', y);
  const investors = [
    { title: 'Venture Capital Funds (VC)', items: ['Invest in high-growth potential startups', 'Average ticket: $100,000 to $5 million', 'Expect x10 return over 5-7 years', 'Examples: Partech Africa, TLcom Capital, Novastar Ventures'] },
    { title: 'Private Equity Funds', items: ['Target SMEs in growth or transfer phase', 'Average ticket: $1 to $50 million', 'Investment horizon: 5-10 years', 'Examples: AfricInvest, Helios Investment Partners, Adenia Partners'] },
    { title: 'Development Banks', items: ['Long-term financing at preferential rates', 'BOAD, AfDB, IFC, Proparco, DEG, FMO', 'Strong ESG and social impact requirements', 'Long due diligence process (6-18 months)'] },
    { title: 'Business Angels & Family Offices', items: ['Wealthy individual investors or families', 'Smaller tickets: $10,000 to $500,000', 'Often bring network and sector expertise', 'Faster decision-making process'] },
  ];

  for (const inv of investors) {
    infoBox(doc, inv.title, inv.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Preparing your investment file', y);
  y = bodyText(doc, 'A solid investment file is the key to convincing investors. Here are the essential elements to prepare:', 14, y, 182);
  y += 4;

  const dossier = [
    { title: 'Executive Summary (2 pages max)', items: ['Problem solved and proposed solution', 'Target market and market size (TAM/SAM/SOM)', 'Business model and revenue sources', 'Founding team and key skills', 'Amount sought and use of funds'] },
    { title: 'Pitch Deck (10-15 slides)', items: ['Slide 1: Vision and mission in one sentence', 'Slides 2-4: Problem, solution, market', 'Slides 5-7: Product, traction, business model', 'Slides 8-10: Team, roadmap, financials', 'Slide 11: Ask — amount and use'] },
    { title: 'Detailed Business Plan', items: ['Market analysis and competitive study', 'Commercial strategy and marketing plan', 'Operational plan and human resources', 'Financial projections over 3-5 years (P&L, cash-flow, balance sheet)', 'Risk analysis and mitigation plan'] },
    { title: 'Data Room (due diligence)', items: ['Legal documents: articles, registration, major contracts', 'Audited financial statements for the last 3 years', 'Intellectual property: patents, trademarks, licenses', 'Client contracts and letters of intent (LOI)', 'Capital structure (cap table) and shareholders agreement'] },
  ];

  for (const d of dossier) {
    infoBox(doc, d.title, d.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Valuing your company', y);
  y = bodyText(doc, 'Valuation is often the most delicate negotiation point. Here are the most commonly used methods in Africa:', 14, y, 182);
  y += 4;

  const valuation = [
    'DCF Method (Discounted Cash Flow) — Discounting future cash flows',
    'Comparable Method — Sector valuation multiples (EV/EBITDA, P/E)',
    'Comparable Transactions Method — Prices paid in similar transactions',
    'Net Asset Value Method — Relevant for mature companies',
    'Berkus Method — For pre-revenue startups (max $2.5M per criterion)',
  ];
  for (const v of valuation) {
    y = bulletItem(doc, v, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Negotiation and deal structuring', y);
  const negotiation = [
    { title: 'Key terms to negotiate', items: ['Pre-money and post-money valuation', 'Preferential liquidation rights (liquidation preference)', 'Anti-dilution rights (full ratchet vs weighted average)', 'Voting and veto rights on strategic decisions', 'Drag-along and tag-along clauses'] },
    { title: 'Legal structuring', items: ['Structure choice: capital increase vs convertible debt', 'Shareholders agreement: rights and obligations of each party', 'Conditions precedent and closing schedule', 'Earn-out and ratchet mechanisms', 'Exit clauses: IPO, sale, buyback'] },
  ];
  for (const n of negotiation) {
    infoBox(doc, n.title, n.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'The 10 mistakes to avoid when fundraising', y);
  const errors = [
    'Overvaluing your company without solid justification',
    'Neglecting the preparation of the data room and legal documents',
    'Contacting too many investors at once without targeting',
    'Ignoring ESG and impact expectations of institutional investors',
    'Underestimating the time required (6 to 18 months on average)',
    'Not having a plan B in case of fundraising failure',
    'Accepting unfavorable terms out of impatience',
    'Neglecting references and network of potential investors',
    'Presenting unrealistic financial projections',
    'Forgetting to check cultural compatibility with the investor',
  ];
  for (const e of errors) {
    y = bulletItem(doc, e, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Typical fundraising timeline', y);
  const timeline = [
    { phase: 'Month 1-2', action: 'File preparation, valuation, identification of target investors' },
    { phase: 'Month 3-4', action: 'Initial contacts, sending executive summary, first meetings' },
    { phase: 'Month 5-6', action: 'Pitch deck presentations, letters of intent (LOI), preliminary due diligence' },
    { phase: 'Month 7-10', action: 'In-depth due diligence, term negotiation, agreement drafting' },
    { phase: 'Month 11-12', action: 'Closing, fund transfer, investor integration' },
  ];

  for (const t of timeline) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 16, 2, 2, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 28, 16, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(t.phase, 28, y + 10, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 60, 60, 60);
    doc.text(t.action, 46, y + 10);
    y += 20;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Prepare your fundraising with KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Full support: valuation, pitch deck, data room, negotiation.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 4 — Digital Transformation for SMEs (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateTransformationDigitaleEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Digital Transformation for SMEs';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=Modern%20digital%20transformation%20concept%20with%20African%20business%20professional%20using%20tablet%20and%20cloud%20technology%2C%20futuristic%20office%20environment%2C%20digital%20interface%20elements%2C%20clean%20tech%20aesthetic%2C%20bright%20innovative%20workspace&width=840&height=1188&seq=td-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Digital Transformation for SMEs', 'Practical roadmap to digitalize your business: tools, processes, change management and ROI. Adapted to the African context.', 'Digital Transformation', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Why digitalize your SME?', y);
  y = bodyText(doc, 'Digital transformation is no longer an option but a necessity for African SMEs that want to remain competitive. It reduces costs, improves operational efficiency and opens new markets.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Measurable benefits of digitalization', y);
  const benefits = [
    'Reduction of operational costs by 20 to 40% on average',
    'Improvement of team productivity by 25 to 35%',
    'Acceleration of sales and billing cycles',
    'Better visibility on performance in real time',
    'Access to new markets via e-commerce and digital channels',
    'Improved customer experience and loyalty',
    'Reduction of human errors and data loss',
    'Enhanced attractiveness for talent and strategic partners',
  ];
  for (const b of benefits) {
    y = bulletItem(doc, b, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Digital maturity assessment', y);
  const maturity = [
    { title: 'Level 1 — Beginner', items: ['No or few digital tools', 'Manual and paper-dominant processes', 'Low internet connectivity', 'Priority: basic equipment and training'] },
    { title: 'Level 2 — In Transition', items: ['Some office tools (Excel, email)', 'Basic web presence (showcase website)', 'Partially computerized accounting', 'Priority: ERP/CRM and automation of key processes'] },
    { title: 'Level 3 — Advanced', items: ['ERP and CRM deployed and used', 'Active digital presence (social media, e-commerce)', 'Centralized data and dashboards', 'Priority: AI, advanced analytics and innovation'] },
  ];
  for (const m of maturity) {
    infoBox(doc, m.title, m.items, 14, y, 182, 52);
    y += 58;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Essential digital tools for African SMEs', y);

  const tools = [
    { title: 'Management (ERP)', items: ['Odoo — Complete and affordable open source solution', 'Sage 50 — Adapted to French-speaking African SMEs', 'QuickBooks — Ideal for small structures', 'ERPNext — Open source, active African community'] },
    { title: 'Customer Relations (CRM)', items: ['HubSpot CRM — Free for basic functions', 'Zoho CRM — Excellent value for money', 'Salesforce — For high-growth SMEs', 'Freshsales — Intuitive and mobile-first interface'] },
    { title: 'Communication & Collaboration', items: ['Microsoft Teams or Google Workspace — Online collaboration', 'Slack — Team messaging and integrations', 'Zoom / Google Meet — Video conferencing', 'Trello / Asana — Project management'] },
    { title: 'Payment & Digital Finance', items: ['Wave, Orange Money, MTN MoMo — Mobile money', 'Stripe / PayDunya — Online payments', 'Sage Accounting — Cloud accounting', 'Expensify — Expense management'] },
  ];

  for (const t of tools) {
    infoBox(doc, t.title, t.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Digital transformation roadmap', y);
  y = bodyText(doc, 'A successful digital transformation takes place in progressive phases. Here is a roadmap adapted to African SMEs:', 14, y, 182);
  y += 4;

  const roadmap = [
    { phase: 'Phase 1 (0-3 months)', title: 'Foundations', desc: 'Assess the current state of your governance: existing documents, practices in place, identified gaps.' },
    { phase: 'Phase 2 (3-9 months)', title: 'Digitalization of key processes', desc: 'Update the articles of association to reflect the current structure and future ambitions of the company.' },
    { phase: 'Phase 3 (9-18 months)', title: 'Charter Drafting', desc: 'Develop the internal regulations, governance charter and delegations of authority.' },
    { phase: 'Phase 4 (18-24 months)', title: 'Leadership Training', desc: 'Train BoD members and management in governance best practices and legal obligations.' },
    { phase: 'Phase 5 (24-30 months)', title: 'Monitoring & Improvement', desc: 'Set up a governance dashboard and conduct an annual review of practices.' },
  ];

  for (const r of roadmap) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(r.phase, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(r.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(r.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Need personalized support?', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('KHEPRA EXPERTS supports you in implementing your governance framework.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 5 — Financial Audit Checklist (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateAuditFinancierEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Financial Audit Checklist';
  const totalPages = 4;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=Financial%20audit%20preparation%20with%20organized%20documents%20folders%20and%20financial%20statements%2C%20professional%20accounting%20workspace%2C%20calculator%20and%20reports%2C%20clean%20organized%20desk%2C%20neutral%20professional%20background%2C%20business%20photography&width=840&height=1188&seq=af-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Financial Audit Checklist', 'Methodological guide to prepare and succeed in your financial audit: required documents, control points, timeline and communication with auditors.', 'Finance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Preparing your financial audit', y);
  y = bodyText(doc, 'A well-prepared financial audit runs more quickly, generates fewer questions and results in a more favorable report. Here are the documents and information to gather before the auditors arrive.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Accounting and financial documents', y);
  const comptable = [
    '☐  General ledger for the complete fiscal year',
    '☐  General trial balance (before and after inventory)',
    '☐  Journal of accounting operations',
    '☐  Preliminary financial statements (balance sheet, income statement, cash flows)',
    '☐  Bank reconciliations for all accounts',
    '☐  Bank statements for the last 12 months',
    '☐  Fixed assets and depreciation schedule',
    '☐  Valued physical inventory of stocks',
    '☐  Accounts receivable aging schedule',
    '☐  Accounts payable schedule',
    '☐  Tax returns (VAT, corporate tax) for the fiscal year',
    '☐  Supporting documents for provisions and impairments',
  ];

  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(14, y, 182, comptable.length * 8.5 + 8, 3, 3, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, y, 3, comptable.length * 8.5 + 8, 1.5, 1.5, 'F');
  let cy = y + 9;
  for (const item of comptable) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 60, 60, 60);
    doc.text(item, 20, cy);
    cy += 8.5;
  }
  y = cy + 8;

  y = sectionTitle(doc, 'Legal and contractual documents', y);
  const juridique = [
    '☐  Articles of association and latest GA minutes',
    '☐  Up-to-date shareholder register and cap table',
    '☐  Major contracts (clients, suppliers, lease, loans)',
    '☐  Employment contracts of managers and key executives',
    '☐  Current insurance policies',
    '☐  Board of Directors decisions for the fiscal year',
    '☐  Ongoing litigation and correspondence with lawyers',
  ];

  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(14, y, 182, juridique.length * 8.5 + 8, 3, 3, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 3, juridique.length * 8.5 + 8, 1.5, 1.5, 'F');
  cy = y + 9;
  for (const item of juridique) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 60, 60, 60);
    doc.text(item, 20, cy);
    cy += 8.5;
  }
  y = cy + 8;

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Critical control points', y);

  const controls = [
    { title: 'Cash and liquidity', items: ['Reconciliation between accounting balances and bank statements', 'Justification of all cash transactions', 'Verification of outstanding checks', 'Control of inter-account transfers'] },
    { title: 'Accounts receivable', items: ['Direct confirmation with major clients', 'Aging analysis and adequate provisioning', 'Verification of credit notes and discounts granted', 'Control of post-closing collections'] },
    { title: 'Inventories and stock counts', items: ['Presence during year-end physical inventory', 'Verification of valuation method (FIFO, WAC)', 'Control of obsolete or slow-moving stocks', 'Reconciliation between physical and accounting inventory'] },
    { title: 'Fixed assets', items: ['Physical verification of fixed assets', 'Control of additions and disposals during the year', 'Verification of depreciation rates and methods', 'Control of finance lease (leasing) contracts'] },
  ];

  for (const c of controls) {
    infoBox(doc, c.title, c.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Typical financial audit timeline', y);

  const calendar = [
    { period: 'D-60', action: 'Preparation of preliminary accounting and financial documents' },
    { period: 'D-45', action: 'Transmission of working file to auditors' },
    { period: 'D-30', action: 'Physical inventory of stocks and fixed assets' },
    { period: 'D-15', action: 'Bank reconciliations and balance confirmations' },
    { period: 'D-7', action: 'Kick-off meeting with auditors' },
    { period: 'D to D+15', action: 'On-site audit work — accounting team availability required' },
    { period: 'D+20', action: 'Closing meeting — presentation of audit findings' },
    { period: 'D+30', action: 'Receipt of draft audit report' },
    { period: 'D+45', action: 'Responses to observations and final report' },
  ];

  for (const c of calendar) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 14, 2, 2, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 22, 14, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(c.period, 25, y + 9, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 60, 60, 60);
    doc.text(c.action, 40, y + 9);
    y += 18;
  }

  y += 4;
  y = sectionTitle(doc, 'Tips for communicating well with your auditors', y);
  const tips = [
    'Designate a single point of contact on the company side to coordinate exchanges',
    'Respond to information requests within 24-48 hours',
    'Proactively report any significant event (litigation, loss, fraud)',
    'Prepare a dedicated work room with access to archives',
    'Document all unusual accounting decisions',
  ];
  for (const t of tips) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 8;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Financial Audit & Diagnosis — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('We support you in the preparation and conduct of your financial audits.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 6 — Africa Business Plan Guide (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateBusinessPlanEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Africa Business Plan Guide';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20entrepreneur%20working%20on%20business%20plan%20with%20laptop%20and%20documents%2C%20modern%20coworking%20space%2C%20strategic%20planning%20charts%20and%20graphs%2C%20professional%20startup%20environment%2C%20bright%20motivational%20setting%2C%20clean%20contemporary%20workspace&width=840&height=1188&seq=bp-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Africa Business Plan Guide', 'Complete business plan template adapted to the African market with concrete examples, financial projections and sectoral market analysis.', 'Entrepreneurship', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Structure of an effective African business plan', y);
  y = bodyText(doc, 'A business plan adapted to the African context must take into account local specificities: access to financing, infrastructure, regulation and market dynamics specific to each country.', 14, y, 182);
  y += 5;

  const structure = [
    { title: '1. Executive Summary (2 pages max)', items: ['Vision, mission and unique value proposition', 'Target market and identified opportunity', 'Business model and revenue sources', 'Founding team and competitive advantages', 'Financing needs and use of funds'] },
    { title: '2. Company Presentation', items: ['History, legal status and location', 'Products/services offered and development stage', 'Intellectual property and strategic assets', 'Key partnerships and ecosystem', 'Social and environmental impact (ESG)'] },
    { title: '3. Market Analysis', items: ['Market size (TAM, SAM, SOM) with sources', 'Segmentation and target customer profile', 'Competitive analysis (strengths, weaknesses, positioning)', 'Sector trends and growth factors', 'Entry barriers and key success factors'] },
    { title: '4. Commercial Strategy', items: ['Pricing strategy and positioning', 'Distribution and sales channels', 'Marketing plan and customer acquisition', 'Loyalty and retention strategy', 'Commercial objectives over 3 years'] },
  ];

  for (const s of structure) {
    infoBox(doc, s.title, s.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Operational plan and human resources', y);

  const ops = [
    { title: '5. Operational Plan', items: ['Production or service delivery processes', 'Location, infrastructure and necessary equipment', 'Supply chain and inventory management', 'Information systems and management tools', 'Implementation plan and key milestones'] },
    { title: '6. Organization and Human Resources', items: ['Organizational chart and structure', 'Manager profiles and key skills', 'Recruitment plan over 3 years', 'Remuneration and profit-sharing policy', 'Training and skills development plan'] },
  ];

  for (const o of ops) {
    infoBox(doc, o.title, o.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'African market specificities to integrate', y);
  const specifics = [
    'Access to electricity and internet — plan alternative solutions',
    'Mobile payments (Mobile Money) — integrate Wave, Orange Money, MTN MoMo',
    'Local regulation — check specific licenses, authorizations and taxes',
    'Seasonality and economic cycles specific to each country',
    'Importance of informal networks and trust relationships',
    'Access to financing — identify available local and regional funds',
    'Country risks — exchange rate, political instability, infrastructure',
    'Social impact — value local job creation and community impact',
  ];
  for (const s of specifics) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Financial projections — 3-year model', y);
  y = bodyText(doc, 'Financial projections are the heart of the business plan. They must be realistic, documented and consistent with market assumptions.', 14, y, 182);
  y += 4;

  const financial = [
    { title: 'Projected Income Statement', items: ['Revenue by product/service line', 'Cost of sales and gross margin', 'Operating expenses (staff, rent, marketing)', 'EBITDA, EBIT and net income', 'Break-even point and time to reach it'] },
    { title: 'Cash Flow Plan', items: ['Detailed monthly receipts', 'Disbursements: fixed and variable costs', 'Working capital requirement (WCR)', 'Monthly cash balance', 'Identification of cash flow tension periods'] },
    { title: 'Projected Balance Sheet', items: ['Fixed assets and depreciation', 'Current assets (stocks, receivables, cash)', 'Equity and financial debt', 'Solvency and liquidity ratios', 'Financing structure and financial leverage'] },
    { title: 'Assumptions and Sensitivity', items: ['Documented market growth assumptions', 'Optimistic, realistic and pessimistic scenarios', 'Sensitivity analysis on key variables', 'Identified financial risks and mitigation measures', 'Key performance indicators (KPIs) to monitor'] },
  ];

  for (const f of financial) {
    infoBox(doc, f.title, f.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Risk analysis and mitigation plan', y);
  y = bodyText(doc, 'Any serious business plan must identify risks and propose mitigation measures. African investors are particularly attentive to this section.', 14, y, 182);
  y += 4;

  const risks = [
    'Market risk — Unfavorable evolution of demand or competition',
    'Operational risk — Failure of processes, systems or suppliers',
    'Financial risk — Insufficient cash flow, rising interest rates',
    'Regulatory risk — Change in legislation or tax policy',
    'Country risk — Political instability, currency devaluation',
    'Human risk — Departure of key people, recruitment difficulties',
    'Technological risk — Obsolescence, cybersecurity, breakdowns',
  ];
  for (const r of risks) {
    y = bulletItem(doc, r, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Final checklist before submission', y);
  const checklist = [
    '☐  Compelling and concise executive summary (2 pages max)',
    '☐  Market analysis with verifiable sources',
    '☐  Clearly explained business model',
    '☐  3-year financial projections (P&L, cash-flow, balance sheet)',
    '☐  Documented and realistic assumptions',
    '☐  Risk analysis and mitigation plan',
    '☐  Founders CVs and organizational chart',
    '☐  Implementation plan with key milestones',
    '☐  Detailed financing needs and use of funds',
    '☐  External expert review before submission',
  ];

  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(14, y, 182, checklist.length * 9 + 8, 3, 3, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, y, 3, checklist.length * 9 + 8, 1.5, 1.5, 'F');
  let cy = y + 9;
  for (const item of checklist) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    hex(doc, 60, 60, 60);
    doc.text(item, 20, cy);
    cy += 9;
  }
  y = cy + 8;

  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Build your business plan with KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Full support: market analysis, financial modeling, pitch deck.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 7 — Debt Management & Receivables Recovery Guide (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateImpayesRecouvrementEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Debt Management & Receivables Recovery Guide';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20financial%20professional%20reviewing%20overdue%20accounts%20and%20debt%20recovery%20documents%20at%20modern%20office%20desk%2C%20organized%20folders%20with%20payment%20records%20and%20collection%20notices%2C%20professional%20banking%20environment%20with%20calculator%20and%20laptop%2C%20warm%20focused%20lighting%2C%20clean%20neutral%20background%2C%20serious%20analytical%20atmosphere&width=840&height=1188&seq=ir-cover-v1&orientation=portrait'),
  ]);

  // PAGE 1 — Cover
  addCoverPage(
    doc,
    'Debt Management & Receivables Recovery',
    'Practical strategies and tools to prevent non-performing loans, manage overdue receivables and optimize amicable and judicial recovery.',
    'Finance',
    coverBase64,
    logoBase64
  );

  // PAGE 2 — Understanding & Preventing NPLs
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Understanding and preventing non-performing loans', y);
  y = bodyText(doc, 'A non-performing loan (NPL) is a receivable whose due date has passed without payment from the debtor. Prevention remains the best strategy: it is better to avoid the NPL than to recover it. A rigorous credit policy is the first line of defense.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Common causes of NPLs in Africa', y);
  const causes = [
    'Insufficient analysis of repayment capacity at the time of granting',
    'Absence of solid or poorly assessed guarantees',
    'External economic shocks (drought, crisis, inflation)',
    'Diversion of the credit purpose by the borrower',
    'Death, illness or accident of the borrower',
    'Poor management of the borrowing business or household',
    'Failure of the supply chain or commercial outlets',
    'Opportunistic behavior (bad faith of the debtor)',
  ];
  for (const c of causes) {
    y = bulletItem(doc, c, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Essential preventive measures', y);
  const preventions = [
    { title: 'Before granting credit', items: ['Rigorous file analysis (5Cs: Character, Capacity, Capital, Conditions, Collateral)', 'Credit history check (BCEAO credit bureau)', 'Realistic assessment of guarantees and securities', 'Borrower training in financial management', 'Setting repayment schedules adapted to the debtor\'s cash flows'] },
    { title: 'During the life of the credit', items: ['Regular monitoring of the debtor\'s activity and financial situation', 'Field visits for significant loans', 'Preventive reminders before each due date', 'Early detection of warning signs', 'Implementation of a portfolio scoring system'] },
  ];
  for (const p of preventions) {
    infoBox(doc, p.title, p.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3 — Early Detection & Classification
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Early detection — Warning signs', y);
  y = bodyText(doc, 'Quickly identifying at-risk receivables allows intervention before the situation deteriorates. Here are the main warning signs to monitor:', 14, y, 182);
  y += 4;

  const signals = [
    'First payment delay, even of a few days',
    'Repeated requests for due date extensions',
    'Significant decrease in turnover or account flows',
    'Change in behavior: avoidance of contact, relocation',
    'Negative information about the debtor in their environment',
    'Visible deterioration of economic activity (closure, empty stocks)',
    'Multiplication of debts with other creditors',
    'Family or social conflicts that may affect repayment capacity',
  ];
  for (const s of signals) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Classification of non-performing receivables', y);
  const classification = [
    { title: 'Overdue receivables (1–30 days)', items: ['Immediate phone follow-up from day 1', 'SMS or reminder message', 'Verification of the reason for the delay', 'Proposal of an arrangement if temporary difficulty'] },
    { title: 'Doubtful receivables (31–90 days)', items: ['Mandatory field visit', 'Formal written notice', 'Negotiation of a repayment schedule', 'Activation of available guarantees'] },
    { title: 'Disputed receivables (> 90 days)', items: ['File transferred to the litigation department', 'Formal notice with acknowledgment of receipt', 'Assessment of the debtor\'s residual solvency', 'Decision: judicial recovery or partial write-off'] },
  ];
  for (const cl of classification) {
    infoBox(doc, cl.title, cl.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4 — Amicable Recovery & Negotiation
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Amicable recovery procedures', y);
  y = bodyText(doc, 'Amicable recovery should always be prioritized before any legal action. It preserves the client relationship, is less costly and often more effective in the African context.', 14, y, 182);
  y += 4;

  const amiable = [
    { title: 'Step 1 — Preventive reminder (D+1 to D+7)', items: ['Courteous phone call to remind of the due date', 'SMS or WhatsApp reminder message', 'Verification that payment is not being processed', 'Recording of the reminder in the management system'] },
    { title: 'Step 2 — Formal reminder (D+8 to D+30)', items: ['Official reminder letter with debt details', 'Summons of the debtor to the office', 'Analysis of the reasons for non-payment', 'Proposal of an adapted repayment plan'] },
    { title: 'Step 3 — Formal notice (D+31 to D+60)', items: ['Formal notice by registered letter with acknowledgment', 'Response deadline: 8 to 15 days', 'Mentioning consequences in case of non-payment', 'Activation of sureties and guarantors'] },
    { title: 'Step 4 — Final negotiation (D+61 to D+90)', items: ['Negotiation meeting with the debtor', 'Proposal of restructuring or partial write-off', 'Signing of a written repayment agreement', 'Decision to proceed to litigation if failed'] },
  ];
  for (const a of amiable) {
    infoBox(doc, a.title, a.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 5 — Judicial Recovery & Provisioning
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Judicial recovery — Enforcement proceedings (OHADA)', y);
  y = bodyText(doc, 'In the OHADA area, several enforcement proceedings are available to recover unpaid receivables. The Uniform Act on simplified recovery procedures and enforcement proceedings (AUPSRVE) governs these procedures.', 14, y, 182);
  y += 4;

  const judiciaire = [
    { title: 'Payment injunction (simplified procedure)', items: ['Fast and inexpensive procedure for certain receivables', 'Application filed with the competent Court', 'Order issued without adversarial hearing', 'Served on the debtor — opposition deadline: 15 days'] },
    { title: 'Attachment of receivables', items: ['Seizure of the debtor\'s bank accounts', 'Requires an enforceable title (judgment, order)', 'Fast and effective procedure if the debtor has assets', 'Third party seized (bank) must declare assets within 8 days'] },
    { title: 'Seizure and sale of movable property', items: ['Seizure and auction of the debtor\'s movable property', 'Procedure governed by OHADA AUPSRVE', 'Bailiff competent for execution', 'Minimum delay between seizure and sale: 8 days'] },
    { title: 'Real estate seizure', items: ['For significant receivables secured by mortgage', 'Long procedure (6 to 18 months) but effective', 'Forced sale of the property at public auction', 'Discharge of mortgages and distribution of sale price'] },
  ];
  for (const j of judiciaire) {
    infoBox(doc, j.title, j.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 6 — Provisioning, KPIs & Action Plan
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Provisioning of doubtful receivables (BCEAO standards)', y);
  y = bodyText(doc, 'The BCEAO imposes strict provisioning rules for non-performing receivables for DFS and financial institutions in the WAEMU area:', 14, y, 182);
  y += 4;

  const provisions = [
    'Overdue receivables (1–30 days): 20% provision recommended',
    'Doubtful receivables (31–90 days): 50% provision mandatory',
    'Disputed receivables (91–180 days): 80% provision mandatory',
    'Irrecoverable receivables (> 180 days): 100% provision + write-off',
    'Quarterly portfolio review and provision adjustment',
    'Declaration of non-performing receivables to the BCEAO credit bureau',
  ];
  for (const p of provisions) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Recovery performance indicators (KPIs)', y);
  const kpis = [
    'Portfolio at risk ratio (PAR > 30 days) — Target: < 5%',
    'Overall recovery rate — Amounts recovered / Amounts outstanding',
    'Average recovery time (ART) — Average number of days to recover',
    'Write-off rate — Abandoned receivables / Total outstanding',
    'Recovery cost — Recovery charges / Amounts recovered',
    'Successful restructuring rate — Agreements respected / Agreements signed',
  ];
  for (const k of kpis) {
    y = bulletItem(doc, k, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Recovery action plan — Summary', y);
  const actions = [
    { num: '01', title: 'Credit Policy', desc: 'Review and formalize the credit granting policy with strict eligibility criteria.' },
    { num: '02', title: 'Monitoring System', desc: 'Set up a portfolio monitoring dashboard with automatic alerts.' },
    { num: '03', title: 'Dedicated Team', desc: 'Train a specialized recovery team with appropriate objectives and tools.' },
    { num: '04', title: 'Written Procedures', desc: 'Document reminder, formal notice and litigation procedures.' },
    { num: '05', title: 'Legal Partnerships', desc: 'Establish partnerships with bailiffs and lawyers specializing in OHADA recovery.' },
  ];

  for (const action of actions) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 20, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 20, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(action.num, 23, y + 13, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(action.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(action.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 25;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Optimize your recovery with KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Portfolio audit, team training, implementation of recovery procedures.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 8 — AML/CFT Compliance Guide — WAEMU Financial Institutions (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateLCBFTEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'AML/CFT Compliance Guide — WAEMU Financial Institutions';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20compliance%20officer%20reviewing%20anti-money%20laundering%20documents%20and%20regulatory%20files%20at%20a%20modern%20banking%20office%20desk%2C%20organized%20binders%20with%20AML%20CFT%20compliance%20reports%2C%20professional%20financial%20institution%20environment%2C%20serious%20focused%20atmosphere%2C%20clean%20neutral%20tones%2C%20high%20quality%20corporate%20photography%2C%20warm%20office%20lighting&width=840&height=1188&seq=lcbft-cover-v1&orientation=portrait'),
  ]);

  // PAGE 1 — Cover
  addCoverPage(doc, 'AML/CFT Compliance Guide', 'Comprehensive Anti-Money Laundering and Counter-Terrorism Financing compliance framework for banks, DFS and financial institutions in the WAEMU area.', 'Finance', coverBase64, logoBase64);

  // PAGE 2 — Regulatory Framework
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'AML/CFT Regulatory Framework in the WAEMU Area', y);
  y = bodyText(doc, 'Anti-Money Laundering and Counter-Terrorism Financing (AML/CFT) is a legal obligation for all financial institutions in the WAEMU area. The regulatory framework is based on community and national texts harmonized with FATF recommendations.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Reference texts', y);
  const textes = [
    'WAEMU Directive No. 02/2015/CM/WAEMU on AML/CFT',
    'Uniform AML/CFT law transposed in each member state',
    'BCEAO instruction on due diligence obligations of financial institutions',
    'FATF (Financial Action Task Force) Recommendations — 40 recommendations',
    'UN Security Council Resolutions (asset freezing)',
    'WAEMU regulation on fund transfers and traceability',
  ];
  for (const t of textes) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Institutions concerned', y);
  const institutions = [
    { title: 'Credit institutions', items: ['Commercial banks and investment banks', 'Microfinance institutions (DFS/MFI)', 'Electronic money institutions (EMI)', 'Finance and leasing companies'] },
    { title: 'Other obliged entities', items: ['Insurance and reinsurance companies', 'Money transfer agents (Western Union, MoneyGram)', 'Licensed exchange bureaus', 'Notaries, lawyers, accountants (regulated professions)'] },
  ];
  for (const inst of institutions) {
    infoBox(doc, inst.title, inst.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 3 — Risk-Based Approach & KYC
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Risk-Based Approach (RBA)', y);
  y = bodyText(doc, 'The risk-based approach is the foundation of the modern AML/CFT framework. It consists of identifying, assessing and prioritizing money laundering risks in order to allocate proportionate resources.', 14, y, 182);
  y += 4;

  const abr = [
    { title: 'National Risk Assessment (NRA)', items: ['Mapping of sectoral and geographical risks', 'Identification of high-risk sectors and products', 'Consideration of local money laundering typologies', 'Periodic update (every 3 years minimum)'] },
    { title: 'Internal Risk Assessment (IRA)', items: ['Analysis of institution-specific risks (clients, products, channels)', 'Risk matrix: probability x impact', 'Customer segmentation by risk level (low, medium, high)', 'Documentation and validation by General Management'] },
    { title: 'Proportionate due diligence measures', items: ['Simplified due diligence: low-risk clients (civil servants, employees)', 'Standard due diligence: medium-risk clients (traders, SMEs)', 'Enhanced due diligence: high-risk clients (PEPs, non-residents, cash-intensive)', 'Ongoing due diligence: permanent transaction monitoring'] },
  ];
  for (const a of abr) {
    infoBox(doc, a.title, a.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4 — KYC & Transaction Monitoring
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'KYC Device — Know Your Customer', y);
  y = bodyText(doc, 'KYC (Know Your Customer) is the obligation to identify and verify the identity of any client before entering into a business relationship. It is the first line of defense against money laundering.', 14, y, 182);
  y += 4;

  const kyc = [
    { title: 'Identification of natural persons', items: ['Valid official identity document (national ID, passport)', 'Proof of address less than 3 months old', 'Recent identity photo', 'Tax identification number (TIN) if available', 'Screening against sanctions lists (UN, EU, OFAC)'] },
    { title: 'Identification of legal entities', items: ['Trade register and articles of association', 'Identification of beneficial owners (> 25% of capital)', 'Powers of legal representatives', 'Recent financial statements (for major clients)', 'Verification of corporate purpose and actual activity'] },
    { title: 'Politically Exposed Persons (PEPs)', items: ['Systematic identification of PEPs and their entourage', 'General Management authorization for entering into relationship', 'Enhanced due diligence and continuous transaction monitoring', 'Annual update of PEP file', 'Systematic reporting in case of suspicion'] },
  ];
  for (const k of kyc) {
    infoBox(doc, k.title, k.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5 — Monitoring, CENTIF & Asset Freezing
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Transaction monitoring and suspicious activity detection', y);
  y = bodyText(doc, 'Transaction monitoring is a permanent obligation. It aims to detect atypical or suspicious transactions that may reveal money laundering or terrorism financing.', 14, y, 182);
  y += 4;

  const surveillance = [
    'Cash transactions exceeding the regulatory threshold (1,000,000 FCFA)',
    'Transactions with no apparent economic justification',
    'Structured transactions to circumvent reporting thresholds (structuring)',
    'Transfers to high-risk or sanctioned countries',
    'Unusual activity compared to the client\'s usual profile',
    'Large deposits followed by immediate withdrawals (smurfing)',
    'Intensive cash use in non-cash sectors',
    'Transactions involving shell companies or tax havens',
  ];
  for (const s of surveillance) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Suspicious Transaction Reports to CENTIF', y);
  const centif = [
    { title: 'Reporting procedure', items: ['Deadline: as soon as suspicion is detected (without delay)', 'Official CENTIF form duly completed', 'Secure transmission (registered mail or online platform)', 'Absolute confidentiality — prohibition to inform the client (tipping-off)', 'File retention for a minimum of 10 years'] },
    { title: 'Content of the report', items: ['Full identity of the client concerned', 'Precise description of the suspicious transaction', 'Amounts and dates of transactions', 'Grounds for suspicion with factual elements', 'Supporting documents attached'] },
  ];
  for (const c of centif) {
    infoBox(doc, c.title, c.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Asset freezing and sanctions lists', y);
  const gel = [
    'Daily consultation of UN, EU, OFAC and BCEAO lists',
    'Immediate asset freezing in case of a match',
    'Immediate notification to CENTIF and BCEAO',
    'No transaction can be carried out on a frozen account',
    'Unfreezing only upon authorization from the competent authority',
  ];
  for (const g of gel) {
    y = bulletItem(doc, g, 18, y, 178);
  }

  // PAGE 6
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Internal organization of the AML/CFT framework', y);

  const organisation = [
    { title: 'AML/CFT Compliance Officer (MLRO)', items: ['Mandatory appointment by General Management', 'Direct hierarchical reporting to GM or BoD', 'Access to all information necessary for the mission', 'Annual report to the Board of Directors', 'Official contact for CENTIF and BCEAO'] },
    { title: 'AML/CFT Committee', items: ['Minimum monthly meeting', 'Review of alerts and suspicious transaction reports', 'Validation of AML/CFT policies and procedures', 'Follow-up of audit recommendations', 'Reporting to the Board of Directors'] },
  ];
  for (const o of organisation) {
    infoBox(doc, o.title, o.items, 14, y, 182, 48);
    y += 54;
  }

  y = sectionTitle(doc, 'Staff training', y);
  const formation = [
    'Mandatory initial training for all new employees',
    'Annual refresher training for all staff',
    'Specialized training for client-facing agents',
    'Awareness of local and sectoral money laundering typologies',
    'Knowledge tests and assessment of learning outcomes',
    'Training traceability in each agent\'s HR file',
  ];
  for (const f of formation) {
    y = bulletItem(doc, f, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'AML/CFT Action Plan — Key steps', y);
  const steps = [
    { num: '01', title: 'Risk Assessment', desc: 'Conduct the internal AML/CFT risk assessment and update the risk mapping.' },
    { num: '02', title: 'Procedure Update', desc: 'Revise the AML/CFT manual, KYC procedures and reporting forms.' },
    { num: '03', title: 'MLRO Appointment', desc: 'Appoint or confirm the AML/CFT Compliance Officer and allocate necessary resources.' },
    { num: '04', title: 'Staff Training', desc: 'Plan and conduct annual AML/CFT training for all staff members.' },
    { num: '05', title: 'Internal AML/CFT Audit', desc: 'Conduct an annual audit of the AML/CFT framework and submit the report to BCEAO.' },
  ];

  for (const step of steps) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.num, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(step.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('AML/CFT Audit & Compliance — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('We support financial institutions in implementing their AML/CFT compliance framework.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE 9 — Mobile Money & Digital Payments Regulation Guide — WAEMU (EN)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMobileMoneyEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Mobile Money & Digital Payments Regulation Guide — WAEMU';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20mobile%20money%20payment%20transaction%20on%20smartphone%20with%20digital%20wallet%20interface%2C%20modern%20fintech%20environment%20in%20West%20Africa%2C%20person%20using%20mobile%20banking%20app%20with%20colorful%20digital%20payment%20icons%20floating%20around%2C%20clean%20bright%20contemporary%20office%20background%2C%20professional%20financial%20technology%20atmosphere%2C%20warm%20tones%2C%20high%20quality%20photography&width=840&height=1188&seq=mm-cover-v1&orientation=portrait'),
  ]);

  // PAGE 1 — Cover
  addCoverPage(doc, 'Mobile Money & Digital Payments Regulation Guide', 'Comprehensive regulatory framework for mobile money and digital payments in the WAEMU area: EMI licensing, interoperability, user protection and BCEAO supervision.', 'Finance', coverBase64, logoBase64);

  // PAGE 2 — BCEAO Regulatory Framework
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'BCEAO Regulatory Framework — Overview', y);
  y = bodyText(doc, 'The WAEMU area has a harmonized regulatory framework for digital payments and electronic money, managed by the BCEAO. This framework has undergone a major reform since 2015 to support the growth of mobile money and fintechs.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Reference texts', y);
  const textes = [
    'BCEAO Instruction No. 008-05-2015 on conditions and modalities for EMI activities',
    'Regulation No. 15/2002/CM/WAEMU on payment systems in member states',
    'BCEAO Instruction on financial services via mobile telephony',
    'WAEMU Directive No. 02/2015/CM/WAEMU on AML/CFT (applicable to EMIs)',
    'BCEAO Regulation on interoperability of payment systems',
    'Uniform law on scriptural payment instruments in WAEMU',
  ];
  for (const t of textes) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Market players and regulatory categories', y);
  const acteurs = [
    { title: 'Electronic Money Institutions (EMI)', items: ['Mobile money operators (Orange Money, Wave, MTN MoMo, Moov Money)', 'Fintechs issuing electronic money', 'Specific BCEAO license mandatory', 'Minimum required capital: 300 million FCFA'] },
    { title: 'Banks and credit institutions', items: ['Can issue electronic money via subsidiary or partnership', 'Mobile banking services', 'Subject to BCEAO banking regulation', 'Partnerships with telecom operators regulated'] },
    { title: 'Agents and distributors', items: ['Network of licensed agents for deposit/withdrawal operations', 'Mandatory agency contract with the EMI', 'Agent training and supervision by the EMI', 'EMI liability for acts of its agents'] },
  ];
  for (const a of acteurs) {
    infoBox(doc, a.title, a.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3 — EMI Licensing & Operating Conditions
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Electronic Money Institution Licensing', y);
  y = bodyText(doc, 'Any entity wishing to issue electronic money in the WAEMU area must obtain a license from the BCEAO. The procedure is rigorous and aims to guarantee the financial and operational soundness of issuers.', 14, y, 182);
  y += 4;

  const agrement = [
    { title: 'License Application — Required Documents', items: ['Articles of association and trade register extract', '3-year business plan with detailed financial projections', 'Proof of paid-up minimum capital (300 million FCFA)', 'Operational procedures and internal control manual', 'Documented AML/CFT framework (KYC policy, reporting procedures)', 'Contracts with technical partners and telecom operators'] },
    { title: 'Permanent Operating Conditions', items: ['Maintenance of minimum capital at all times', 'Segregation of customer funds (segregated account)', 'Commitment coverage ratio: equity ≥ 2% of outstanding balances', 'Annual activity report submitted to BCEAO', 'Annual external audit of accounts and control framework', 'Prior notification of any significant change'] },
  ];
  for (const a of agrement) {
    infoBox(doc, a.title, a.items, 14, y, 182, 54);
    y += 60;
  }

  y = sectionTitle(doc, 'Regulatory transaction limits', y);
  const limites = [
    'Maximum electronic wallet balance: 2,000,000 FCFA',
    'Maximum single transaction: 1,000,000 FCFA',
    'Monthly cumulative transactions: 5,000,000 FCFA (unverified clients)',
    'Verified clients (full KYC): higher limits upon BCEAO authorization',
    'Cross-border transactions: subject to WAEMU foreign exchange regulation',
    'Mandatory declaration of transactions exceeding 1,000,000 FCFA',
  ];
  for (const l of limites) {
    y = bulletItem(doc, l, 18, y, 178);
  }

  // PAGE 4 — Interoperability & User Protection
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Interoperability of payment systems', y);
  y = bodyText(doc, 'Interoperability is a major challenge for financial inclusion in WAEMU. The BCEAO has established a framework promoting transfers between different operators and payment systems.', 14, y, 182);
  y += 4;

  const interop = [
    { title: 'National interoperability', items: ['Interoperability obligation between licensed EMIs in the same country', 'Transfers between wallets of different operators', 'National clearing and settlement platform', 'Regulated pricing for interbank transactions'] },
    { title: 'Regional WAEMU interoperability', items: ['STAR-WAEMU regional payment system for large amounts', 'SICA-WAEMU for mass payments and transfers', 'Facilitated cross-border transfers between member countries', 'Harmonized technical standards (ISO 20022)'] },
    { title: 'Interoperability with the banking system', items: ['Gateways between bank accounts and mobile wallets', 'Transfer from bank account to mobile wallet and vice versa', 'Bill and public service payments via mobile money', 'Integration with merchant payment systems (POS, QR code)'] },
  ];
  for (const i of interop) {
    infoBox(doc, i.title, i.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'User protection', y);
  const protection = [
    'Clear prior information on tariffs, conditions and risks',
    'Right to complaint and processing deadline: maximum 72 hours',
    'Mandatory refund in case of proven error or fraud',
    'Confidentiality of personal and financial data',
    'Prohibition of unfair or misleading commercial practices',
    'Accessible and free dispute resolution mechanism',
  ];
  for (const p of protection) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  // PAGE 5 — AML/CFT Mobile Money & Supervision
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'AML/CFT obligations specific to mobile money', y);
  y = bodyText(doc, 'EMIs are subject to the same AML/CFT obligations as banks, with adaptations taking into account the specificities of mobile money (low-value transactions, unbanked clientele, agent network).', 14, y, 182);
  y += 4;

  const lcbft = [
    { title: 'Simplified KYC for small accounts', items: ['Registration with phone number and identity document', 'Biometric verification recommended (fingerprint, photo)', 'Reduced limits for unverified accounts', 'Mandatory KYC upgrade beyond regulatory thresholds'] },
    { title: 'Mobile transaction monitoring', items: ['Automatic detection of atypical transactions (scoring)', 'Alerts on structured transactions (structuring)', 'Monitoring of transfers to high-risk countries', 'Customer behavior analysis (profiling)'] },
    { title: 'Specific obligations for agents', items: ['Mandatory AML/CFT training for all agents', 'Customer identity verification during cash transactions', 'Reporting of suspicious transactions to the EMI', 'EMI liability for agent non-compliance'] },
  ];
  for (const l of lcbft) {
    infoBox(doc, l.title, l.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'BCEAO supervision and regulatory reporting', y);
  const supervision = [
    'Monthly activity report: volumes, values, number of active accounts',
    'Quarterly declaration of operational and security incidents',
    'Annual report on the AML/CFT framework and suspicious transaction reports',
    'Transmission of statistical data to the Monetary Policy Committee',
    'BCEAO on-site inspection: at least once every 3 years',
    'Cooperation with telecommunications regulatory authorities',
  ];
  for (const s of supervision) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  // PAGE 6 — Regulatory Innovations & Action Plan
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Regulatory innovations — Sandbox & Open Banking', y);
  y = bodyText(doc, 'The BCEAO and national regulators have put in place regulatory innovation frameworks to support the development of fintechs while managing risks.', 14, y, 182);
  y += 4;

  const innovations = [
    { title: 'Regulatory Sandbox', items: ['Experimentation framework for innovative fintechs', 'Temporary derogations from standard regulatory requirements', 'Limited duration: 12 to 24 months maximum', 'Enhanced supervision during the experimentation phase', 'Transition to full license upon success'] },
    { title: 'Open Banking & Open APIs', items: ['Access to banking data with customer consent', 'Development of third-party financial services (TPP)', 'Harmonized API standards at WAEMU level', 'Enhanced security: strong authentication (2FA)', 'Liability framework between banks and fintechs'] },
    { title: 'Decentralized Finance & Crypto-assets', items: ['Regulatory framework under development at WAEMU level', 'Increased vigilance on AML/CFT risks related to crypto-assets', 'Prohibition on issuing private cryptocurrencies without license', 'Reflection on a central bank digital currency (CBDC)', 'Cooperation with IMF and World Bank on standards'] },
  ];
  for (const i of innovations) {
    infoBox(doc, i.title, i.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Action Plan — Regulatory compliance', y);
  const steps = [
    { num: '01', title: 'Regulatory Audit', desc: 'Assess current compliance with BCEAO requirements: license, capital, procedures, AML/CFT.' },
    { num: '02', title: 'License Application', desc: 'Prepare or update the EMI license application with all required documents.' },
    { num: '03', title: 'AML/CFT Framework', desc: 'Implement the KYC framework, transaction monitoring and reporting procedures.' },
    { num: '04', title: 'Interoperability', desc: 'Connect systems to national and regional WAEMU interoperability platforms.' },
    { num: '05', title: 'BCEAO Reporting', desc: 'Set up monthly, quarterly and annual regulatory reporting tools.' },
  ];

  for (const step of steps) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.num, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(step.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(step.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Mobile Money & Fintech Compliance — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Full regulatory support for EMIs, fintechs and WAEMU payment operators.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// NEW GUIDES — Performance, Audit, Risk (EN)
// ─────────────────────────────────────────────────────────────────────────────

export async function generateOKRMethodeEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'OKR Method Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'OKR Method Guide', 'Master the OKR (Objectives & Key Results) method to align your teams and drive strategic performance with agility.', 'Governance', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'OKR Principles and History', y);
  y = bodyText(doc, 'OKRs (Objectives & Key Results) are a management by objectives method created by Andy Grove at Intel in the 1970s, popularized by Google since 1999. Today adopted by thousands of organizations worldwide, it allows teams to align on clear and measurable priorities.', 14, y, 182);

  return doc;
}

export async function generateKPIIndicateursEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'KPI Indicators Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'KPI Indicators Guide', 'Quick guide to key performance indicators (KPIs) adapted to African organizations.', 'Performance', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Main KPIs to Monitor', y);
  const kpis = [
    'Revenue (turnover)',
    'Gross margin',
    'Revenue growth rate',
    'Customer acquisition cost (CAC)',
    'Customer lifetime value (CLV)',
    'Retention rate',
    'Productivity per employee',
    'Absenteeism rate',
    'NPS score',
  ];
  for (const k of kpis) {
    y = bulletItem(doc, k, 18, y, 178);
  }

  return doc;
}

export async function generateGestionPerformanceEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Performance Management Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'Performance Management Guide', 'Drive your organization\'s performance with proven methods: OKR, KPI, dashboards and performance culture.', 'Governance', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Principles of Performance Management', y);
  y = bodyText(doc, 'Performance management is a continuous process that aligns individual and collective objectives with the organization\'s strategy, measures progress and adjusts actions in real time.', 14, y, 182);

  return doc;
}

export async function generateAuditSocialEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Social Audit Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'Social Audit Guide', 'Conduct a comprehensive social audit of your organization: labor law compliance, social balance sheet, HR indicators and action plan.', 'Human Resources', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'What is a Social Audit?', y);
  y = bodyText(doc, 'A social audit is a comprehensive diagnosis of an organization\'s human resources management. It assesses regulatory compliance, HR practices effectiveness and identifies social risks.', 14, y, 182);

  return doc;
}

export async function generateAuditOrganisationEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Organizational Audit Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'Organizational Audit Guide', 'Diagnose and optimize your organization\'s structure and processes to gain efficiency and agility.', 'Governance', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'What is an Organizational Audit?', y);
  y = bodyText(doc, 'An organizational audit is a comprehensive diagnosis of an organization\'s structure, processes and functioning. It aims to identify dysfunctions, inefficiencies and improvement opportunities.', 14, y, 182);

  return doc;
}

export async function generateAnalyseRisqueCreditEn(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Credit Risk Analysis Guide';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(doc, 'Credit Risk Analysis Guide', 'Comprehensive methodology for analyzing credit risk in loan applications: fundamental principles, borrower assessment and decision-making.', 'Finance', coverBase64, logoBase64);

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Fundamental Principles of Credit Risk', y);
  y = bodyText(doc, 'Credit risk analysis is the process of evaluating a borrower\'s ability and willingness to repay a loan. It is based on the 5Cs: Character, Capacity, Capital, Conditions, and Collateral.', 14, y, 182);

  return doc;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dispatcher EN — generates the right PDF by guide ID
// ─────────────────────────────────────────────────────────────────────────────
export async function generateGuideByIdEn(resourceId: string, resourceTitle: string): Promise<void> {
  let doc: jsPDF;
  let filename: string;

  switch (resourceId) {
    case 'guide-gouvernance-pme':
      doc = await generateGouvernancePMEEn();
      filename = 'KHEPRA-SME-Governance-Guide.pdf';
      break;
    case 'checklist-conformite-sfd':
      doc = await generateChecklistSFDEn();
      filename = 'KHEPRA-DFS-Compliance-Checklist.pdf';
      break;
    case 'guide-levee-fonds-afrique':
      doc = await generateLeveeFondsEn();
      filename = 'KHEPRA-Fundraising-Guide-Africa.pdf';
      break;
    case 'transformation-digitale-pme':
      doc = await generateTransformationDigitaleEn();
      filename = 'KHEPRA-Digital-Transformation-SME.pdf';
      break;
    case 'audit-financier-checklist':
      doc = await generateAuditFinancierEn();
      filename = 'KHEPRA-Financial-Audit-Checklist.pdf';
      break;
    case 'guide-business-plan-afrique':
      doc = await generateBusinessPlanEn();
      filename = 'KHEPRA-Africa-Business-Plan-Guide.pdf';
      break;
    case 'guide-impayes-recouvrement':
      doc = await generateImpayesRecouvrementEn();
      filename = 'KHEPRA-Debt-Management-Recovery-Guide.pdf';
      break;
    case 'guide-lcbft':
    case 'guide-lcbft-uemoa':
      doc = await generateLCBFTEn();
      filename = 'KHEPRA-AML-CFT-Compliance-Guide-WAEMU.pdf';
      break;
    case 'guide-mobile-money':
    case 'guide-mobile-money-uemoa':
      doc = await generateMobileMoneyEn();
      filename = 'KHEPRA-Mobile-Money-Digital-Payments-WAEMU.pdf';
      break;
    case 'guide-okr-methode':
      doc = await generateOKRMethodeEn();
      filename = 'KHEPRA-OKR-Method-Guide.pdf';
      break;
    case 'guide-kpi-indicateurs':
      doc = await generateKPIIndicateursEn();
      filename = 'KHEPRA-KPI-Indicators-Guide.pdf';
      break;
    case 'guide-gestion-performance':
      doc = await generateGestionPerformanceEn();
      filename = 'KHEPRA-Performance-Management-Guide.pdf';
      break;
    case 'guide-audit-social':
      doc = await generateAuditSocialEn();
      filename = 'KHEPRA-Social-Audit-Guide.pdf';
      break;
    case 'guide-audit-organisation':
      doc = await generateAuditOrganisationEn();
      filename = 'KHEPRA-Organizational-Audit-Guide.pdf';
      break;
    case 'guide-analyse-risque-credit':
      doc = await generateAnalyseRisqueCreditEn();
      filename = 'KHEPRA-Credit-Risk-Analysis-Guide.pdf';
      break;
    default:
      doc = await generateGouvernancePMEEn();
      filename = `KHEPRA-${resourceTitle.replace(/\s+/g, '-')}.pdf`;
  }

  doc.save(filename);
}




