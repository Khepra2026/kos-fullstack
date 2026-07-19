import { jsPDF } from 'jspdf';

const BRAND_R = 26;
const BRAND_G = 58;
const BRAND_B = 42;
const GOLD_R = 201;
const GOLD_G = 168;
const GOLD_B = 76;
const LIGHT_R = 249;
const LIGHT_G = 246;
const LIGHT_B = 240;
const WHITE = 255;

const LOGO_URL = 'https://static.readdy.ai/image/94858acf3a763d577325b92d19a0e156/2855a48cb2e2efe747d34a305b3cf200.png';

/* ─── Helpers ─── */
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
  doc.setFillColor(WHITE, WHITE, WHITE);
  doc.rect(0, 0, 210, 297, 'F');
}

function hex(doc: jsPDF, rVal: number, gVal: number, bVal: number) {
  doc.setTextColor(rVal / 255, gVal / 255, bVal / 255);
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
    } catch {
      // fallback
    }
  }

  const textX = logoBase64 ? 30 : 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('KHEPRA EXPERTS', textX, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(180 / 255, 180 / 255, 180 / 255);
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
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09  |  Quartier Nan\u00e9gb\u00e9, carrefour AISED, Lom\u00e9, Togo', 105, 291, { align: 'center' });
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  doc.setTextColor(180 / 255, 180 / 255, 180 / 255);
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
  doc.setTextColor(70 / 255, 70 / 255, 70 / 255);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * 5.5;
}

function bulletItem(doc: jsPDF, text: string, x: number, y: number, maxWidth: number): number {
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.circle(x + 1.8, y - 1.5, 1.1, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(70 / 255, 70 / 255, 70 / 255);
  const lines = doc.splitTextToSize(text, maxWidth - 7);
  doc.text(lines, x + 6, y);
  return y + lines.length * 5.5 + 1.5;
}

function infoBox(doc: jsPDF, title: string, items: string[], x: number, y: number, w: number, h: number): number {
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
    doc.setTextColor(70 / 255, 70 / 255, 70 / 255);
    const il = doc.splitTextToSize(item, w - 18);
    doc.text(il, x + 13, cy);
    cy += il.length * 4.5 + 2;
  }
  return y + h;
}

function highlightBox(doc: jsPDF, label: string, value: string, x: number, y: number): number {
  const boxH = 20;
  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(x, y, 86, boxH, 2, 2, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(x, y, 86, 4, 1.5, 1.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(120 / 255, 120 / 255, 120 / 255);
  doc.text(label, x + 5, y + 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text(value, x + 5, y + 17);
  return y + boxH + 4;
}

/* ─── Cover ─── */
function addCoverPage(doc: jsPDF, logoBase64: string | null) {
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 0, 210, 297, 'F');

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 14, 14, 24, 24);
    } catch {
      // fallback
    }
  }

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 195, 210, 1.5, 'F');
  doc.rect(0, 199, 210, 0.5, 'F');

  doc.setFillColor(WHITE, WHITE, WHITE);
  doc.rect(0, 205, 210, 92, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  hex(doc, WHITE, WHITE, WHITE);
  const title = 'PV Post-Rendez-vous';
  doc.text(title, 14, 72);

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 78, 50, 1.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(200 / 255, 215 / 255, 208 / 255);
  const subtitle = 'Khepra Experts x Optasia\nAgenda Strat\u00e9gique de Rendez-vous\nMission : Acc\u00e9l\u00e9rer l\'agr\u00e9ment IMF en UEMOA / CEMAC';
  doc.text(subtitle, 14, 84);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text('KHEPRA EXPERTS', 14, 220);

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 223, 50, 0.8, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80 / 255, 80 / 255, 80 / 255);
  doc.text('contact@khepraexperts.com', 14, 232);
  doc.text('+228 93 98 49 09', 14, 239);
  doc.text('Lom\u00e9, Togo', 14, 246);

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 172, 212, 24, 24);
    } catch {
      // fallback
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text(new Date().getFullYear().toString(), 196, 290, { align: 'right' });
}

/* ─── Agenda Data ─── */
const agendaItems = [
  {
    time: '0:00\u20130:05',
    title: 'Accueil \u2014 Installation de la posture',
    objective: '\u00c9tablir l\'aura d\'expert sans brusquer. Cr\u00e9er un cadre de confidentialit\u00e9.',
    message: 'Ce rendez-vous est un espace de co-construction, pas une vente.',
    control: 'LEAD',
  },
  {
    time: '0:05\u20130:15',
    title: 'Preuve sociale cibl\u00e9e & cadre m\u00e9thodologique',
    objective: 'Positionner Khepra comme r\u00e9f\u00e9rence agr\u00e9ments IMF en UEMOA/CEMAC sans monologue.',
    message: 'Nous avons s\u00e9curis\u00e9 X agr\u00e9ments en Y mois \u2014 parce que nous ma\u00eetrisons le dialogue avec les r\u00e9gulateurs.',
    control: '\u00c9QUILIBRE',
  },
  {
    time: '0:15\u20130:35',
    title: 'Cartographie des blocages r\u00e9glementaires & technologiques',
    objective: 'Faire \u00e9merger les points de friction r\u00e9els c\u00f4t\u00e9 client \u2014 sans les juger.',
    message: 'Chaque retard d\'agr\u00e9ment a une cause identifiable. Notre r\u00f4le est de les cartographier ensemble.',
    control: '\u00c9COUTE',
  },
  {
    time: '0:35\u20130:50',
    title: 'Identification des enjeux actionnariat, gouvernance & capital',
    objective: 'V\u00e9rifier la solidit\u00e9 des fondamentaux l\u00e9gaux \u2014 ou identifier les lacunes \u00e0 combler.',
    message: 'Un agr\u00e9ment ne se refuse pas \u2014 il se pr\u00e9pare. Et la pr\u00e9paration commence par la qualit\u00e9 de l\'actionnariat.',
    control: '\u00c9QUILIBRE',
  },
  {
    time: '0:50\u20131:10',
    title: 'D\u00e9monstration de la m\u00e9thodologie end-to-end Khepra',
    objective: 'Montrer comment Khepra connecte tous les maillons : juridique, technologique, r\u00e9glementaire, financier.',
    message: 'Nous ne sommes pas un simple cabinet conseil. Nous sommes votre bras op\u00e9rationnel pour s\u00e9curiser l\'agr\u00e9ment.',
    control: 'LEAD',
  },
  {
    time: '1:10\u20131:25',
    title: 'Introduction strat\u00e9gique des partenaires du consortium',
    objective: 'Rassurer sur la capacit\u00e9 \u00e0 mobiliser un \u00e9cosyst\u00e8me complet (notaires, CAC, juristes OHADA, fintechs).',
    message: 'Vous ne serez jamais seul face au r\u00e9gulateur. Nous structurons et orchestrons l\'ensemble des intervenants.',
    control: 'LEAD',
  },
  {
    time: '1:25\u20131:40',
    title: 'Proposition du cadrage de mission',
    objective: 'Transformer la conversation en engagement concret \u2014 sans discuter du prix.',
    message: 'Nous vous proposons un cadrage structur\u00e9 de 5 jours. \u00c0 l\'issue, vous aurez une note de mission pr\u00e9cise avec un planning, un budget, et une probabilit\u00e9 de succ\u00e8s.',
    control: 'LEAD',
  },
  {
    time: '1:40\u20131:55',
    title: 'Gestion des objections & validation des prochaines \u00e9tapes',
    objective: 'D\u00e9tecter les signaux d\'achat et les h\u00e9sitations. Adresser chaque objection avec un bridge vers la mission.',
    message: 'Chaque objection est une opportunit\u00e9 de montrer notre ma\u00eetrise.',
    control: '\u00c9QUILIBRE',
  },
  {
    time: '1:55\u20132:00',
    title: 'Synth\u00e8se imm\u00e9diate & checklist des informations \u00e0 transmettre',
    objective: 'Quitter la table avec un plan concret, pas une promesse vague.',
    message: 'Dans les 48h, nous vous transmettons le PV structur\u00e9 + la checklist. Vous nous retournez les \u00e9l\u00e9ments sous 7 jours.',
    control: 'LEAD',
  },
];

const closingObjections = [
  { q: '\"C\'est trop cher\"', r: 'Je comprends. Le cadrage de 5 jours est factur\u00e9 s\u00e9par\u00e9ment et d\u00e9ductible de la mission compl\u00e8te. Le co\u00fbt d\'un retard d\'agr\u00e9ment de 6 mois est bien sup\u00e9rieur \u00e0 notre honoraire.' },
  { q: '\"Le d\u00e9lai est trop long\"', r: 'Un agr\u00e9ment mal pr\u00e9par\u00e9 prend 18 mois. Un agr\u00e9ment Khepra prend 6 \u00e0 9 mois. Chaque aller-retour avec le r\u00e9gulateur co\u00fbte 2 \u00e0 3 mois. Nous les \u00e9liminons.' },
  { q: '\"C\'est trop complexe, on va se d\u00e9brouiller\"', r: 'La complexit\u00e9 r\u00e9glementaire est r\u00e9elle. Nous la transformons en \u00e9tapes actionnables. Vous restez ma\u00eetres de la d\u00e9cision \u2014 nous assurons l\'ex\u00e9cution.' },
  { q: '\"On a d\u00e9j\u00e0 un cabinet juridique\"', r: 'Excellent. Nous ne rempla\u00e7ons pas votre juridique \u2014 nous le compl\u00e9tons. Notre valeur ajout\u00e9e est le pont entre le juridique, le r\u00e9gulateur, la technologie et le business plan.' },
];

const checklistPostRDV = [
  'PV structur\u00e9 du rendez-vous (envoy\u00e9 sous 24h)',
  'Checklist documentaire personnalis\u00e9e (selon les lacunes identifi\u00e9es)',
  'Note de cadrage de mission (5 jours de travail)',
  'Pr\u00e9sentation de l\'\u00e9quipe projet Khepra + partenaires identifi\u00e9s',
  'Proposition de NDA sp\u00e9cifique si documents sensibles \u00e9voqu\u00e9s',
  'Calendrier de suivi : point d\'avancement hebdomadaire ou bi-mensuel',
];

const livrablesCadrage = [
  { name: 'Note de Cadrage Strat\u00e9gique', desc: 'Diagnostic initial, analyse des lacunes, plan de travail d\u00e9taill\u00e9, budget pr\u00e9visionnel, planning Gantt.' },
  { name: 'Roadmap Agr\u00e9ment', desc: 'Chronogramme op\u00e9rationnel phase par phase (S1\u2013S5), avec jalons r\u00e9glementaires et livrables interm\u00e9diaires.' },
  { name: 'Fiche de Risques & Mitigations', desc: 'Identification des 10 risques principaux, probabilit\u00e9, impact, et actions pr\u00e9ventives.' },
  { name: 'Pr\u00e9sentation Board', desc: 'Slides de synth\u00e8se pour le Comit\u00e9 de Direction ou le Board d\'Optasia, orient\u00e9s d\u00e9cision.' },
];

/* ─── Generator ─── */
export async function generateAgendaRecapPDF(): Promise<Blob> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'PV Post-RDV Khepra x Optasia';
  const totalPages = 6;

  const logoBase64 = await loadImageAsBase64(LOGO_URL);

  // PAGE 1 — Cover
  addCoverPage(doc, logoBase64);

  // PAGE 2 — Agenda minuté
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Agenda minut\u00e9 du rendez-vous', y);
  y = bodyText(doc, 'Dur\u00e9e totale : 60\u201390 minutes. 5 s\u00e9quences chronom\u00e9tr\u00e9es de l\'icebreaker au closing.', 14, y, 182);
  y += 4;

  for (let i = 0; i < agendaItems.length; i++) {
    const item = agendaItems[i];
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 2 + i, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }

    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 28, 2, 2, 'F');
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.roundedRect(14, y, 22, 28, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, GOLD_R, GOLD_G, GOLD_B);
    doc.text(item.time, 25, y + 11, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(item.title, 42, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80 / 255, 80 / 255, 80 / 255);
    const objLines = doc.splitTextToSize(item.objective, 148);
    doc.text(objLines, 42, y + 14);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(160 / 255, 100 / 255, 20 / 255);
    const msgLines = doc.splitTextToSize(`\u00ab ${item.message} \u00bb`, 148);
    doc.text(msgLines, 42, y + 14 + objLines.length * 4);

    const boxH = 28 + objLines.length * 4 + msgLines.length * 4 - 10;
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, boxH, 2, 2, 'F');
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.roundedRect(14, y, 22, boxH, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, GOLD_R, GOLD_G, GOLD_B);
    doc.text(item.time, 25, y + 11, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(item.title, 42, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80 / 255, 80 / 255, 80 / 255);
    doc.text(objLines, 42, y + 14);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(160 / 255, 100 / 255, 20 / 255);
    doc.text(msgLines, 42, y + 14 + objLines.length * 4);

    // Control badge
    const controlColor = item.control === 'LEAD'
      ? [14, 165, 100]
      : item.control === '\u00c9COUTE'
        ? [245, 158, 11]
        : [100, 116, 139];
    doc.setFillColor(controlColor[0], controlColor[1], controlColor[2]);
    doc.roundedRect(170, y + 2, 22, 7, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(WHITE / 255, WHITE / 255, WHITE / 255);
    doc.text(item.control, 181, y + 6.5, { align: 'center' });

    y += boxH + 5;
  }

  // PAGE 3 — Closing & Objections
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Strat\u00e9gie de Closing', y);
  y = bodyText(doc, 'D\u00e9tecter les signaux d\'achat, adresser les objections, proposer l\'engagement concret. Le co\u00fbt n\'est PAS discut\u00e9 \u00e0 ce stade.', 14, y, 182);
  y += 4;

  y = highlightBox(doc, 'Technique de Soft Close', '\u00ab Si nous d\u00e9marrions le cadrage la semaine prochaine, quelle serait votre date id\u00e9ale pour le kick-off ? \u00bb', 14, y);
  y = highlightBox(doc, 'Technique Assumptive Close', '\u00ab Je vais pr\u00e9parer le PV de ce rendez-vous et la fiche de cadrage. Je vous les envoie d\'ici demain 18h. Vous me confirmez le cr\u00e9neau de kick-off ? \u00bb', 14, y);
  y = highlightBox(doc, 'Technique Next-Step Close', '\u00ab Quel que soit votre choix final, la note de cadrage vous apportera une vision strat\u00e9gique que vous n\'avez pas aujourd\'hui. C\'est d\u00e9j\u00e0 une valeur en soi. \u00bb', 14, y);

  y += 4;
  y = sectionTitle(doc, 'Gestion des objections principales', y);
  for (const o of closingObjections) {
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 3, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }
    doc.setFillColor(255, 245, 240);
    doc.roundedRect(14, y, 182, 18, 2, 2, 'F');
    doc.setFillColor(200, 80, 60);
    doc.roundedRect(14, y, 3, 18, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, 200, 80, 60);
    doc.text(o.q, 22, y + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(70 / 255, 70 / 255, 70 / 255);
    const rl = doc.splitTextToSize(o.r, 170);
    doc.text(rl, 22, y + 13);
    y += 22;
  }

  // PAGE 4 — Narratif de valeur & Orchestration
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Narratif de valeur Khepra Experts', y);

  const narratif = [
    {
      title: 'Cr\u00e9dibilit\u00e9 \u2014 Exp\u00e9rience terrain',
      items: [
        '85% de taux de succ\u00e8s au premier d\u00e9p\u00f4t d\'agr\u00e9ment',
        '5 pays UEMOA/CEMAC couverts',
        'Relations structur\u00e9es avec BCEAO, COBAC et juridictions OHADA',
      ],
    },
    {
      title: 'Diff\u00e9renciation \u2014 Approche end-to-end',
      items: [
        'Conformit\u00e9 OHADA d\u00e8s le jour 1',
        'Structuration actionnariale int\u00e9gr\u00e9e',
        'Plateforme technologique et dialogue r\u00e9gulateur synchronis\u00e9s',
      ],
    },
    {
      title: 'Acc\u00e9l\u00e9ration \u2014 Gagner 6 \u00e0 9 mois',
      items: [
        'D\u00e9lai moyen : 6 \u00e0 9 mois vs 12 \u00e0 18 mois standard',
        'M\u00e9thodologie \u00e9liminant les allers-retours avec le r\u00e9gulateur',
        'Avantage comp\u00e9titif : premiers sur le march\u00e9, premiers \u00e0 capter les d\u00e9p\u00f4ts',
      ],
    },
  ];

  for (const n of narratif) {
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 4, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }
    y = infoBox(doc, n.title, n.items, 14, y, 182, 40);
    y += 6;
  }

  y += 2;
  y = sectionTitle(doc, 'Orchestration des partenaires', y);
  const partenaires = [
    ['Juristes OHADA', 'D\u00e8s la phase de cadrage (S0\u2013S1)', 'R\u00e9daction des statuts, pacte d\'actionnaires, conformit\u00e9 OHADA'],
    ['Notaires', 'Phase de constitution (S2)', 'Actes constitutifs, capital social, immatriculation'],
    ['Commissaires aux Comptes (CAC)', 'D\u00e8s S1 et tout au long', 'Certification des \u00e9tats financiers, audit du business plan'],
    ['Partenaires technologiques', 'Phase S3 (core banking, fintech)', 'Int\u00e9gration technique, conformit\u00e9 IT, documentation s\u00e9curit\u00e9'],
  ];

  for (const p of partenaires) {
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 4, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 20, 2, 2, 'F');
    doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
    doc.roundedRect(14, y, 44, 20, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    hex(doc, GOLD_R, GOLD_G, GOLD_B);
    doc.text(p[0], 36, y + 8, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(180 / 255, 180 / 255, 180 / 255);
    doc.text(p[1], 36, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(p[2], 64, y + 12);
    y += 24;
  }

  // PAGE 5 — Points critiques réglementaires
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Points critiques r\u00e9glementaires', y);
  y = bodyText(doc, '5 piliers de conformit\u00e9 \u00e0 ma\u00eetriser pour s\u00e9curiser l\'agr\u00e9ment. Chaque pilier avec points de vigilance + approche Khepra.', 14, y, 182);
  y += 4;

  const critiques = [
    {
      title: 'Actionnariat',
      items: [
        'Qualit\u00e9 des actionnaires : exp\u00e9rience sectorielle, non-condamnation',
        '\u00c9tats financiers certifi\u00e9s des 3 derni\u00e8res ann\u00e9es',
        'Transparence UBO (Ultimate Beneficial Owner)',
        'Pacte d\'actionnaires conforme OHADA',
      ],
    },
    {
      title: 'Gouvernance & Dirigeants',
      items: [
        'Agr\u00e9ment individuel des dirigeants : honn\u00eate\u00e9, exp\u00e9rience bancaire',
        'Conseil d\'Administration : ind\u00e9pendance, diversit\u00e9 des comp\u00e9tences',
        'S\u00e9paration des fonctions : Pr\u00e9sident CA / DG / DFinances',
        'Politique de r\u00e9mun\u00e9ration et int\u00e9r\u00eats li\u00e9s',
      ],
    },
    {
      title: 'Capital Social',
      items: [
        'Minimum r\u00e9glementaire respect\u00e9 (ex: 500M FCFA au Togo IMF 2\u00e8me cat\u00e9gorie)',
        'Lib\u00e9ration du capital : calendrier, modalit\u00e9s, preuves',
        'Fonds propres suppl\u00e9mentaires : capacit\u00e9 d\'injection en cas de crise',
      ],
    },
    {
      title: 'Mod\u00e8le \u00c9conomique',
      items: [
        'Coh\u00e9rence scoring, cible client, taux d\u00e9biteurs',
        'Plan de d\u00e9veloppement 3 ans : croissance prudente mais cr\u00e9dible',
        'Composante ESG int\u00e9gr\u00e9e au scoring',
        'Composante PME \u00e9ligible si pr\u00e9vu',
      ],
    },
    {
      title: 'Conformit\u00e9 Technologique',
      items: [
        'Architecture IT document\u00e9e (sch\u00e9mas, flux, h\u00e9bergement, backup)',
        'Conformit\u00e9 RGPD / protection des donn\u00e9es',
        'Audit de s\u00e9curit\u00e9 (pentest) par cabinet tierce partie',
        'Plan de continuit\u00e9 d\'activit\u00e9 (PCA / PRA)',
      ],
    },
  ];

  for (const c of critiques) {
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 5, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }
    y = infoBox(doc, c.title, c.items, 14, y, 182, 36);
    y += 4;
  }

  // PAGE 6 — Prochaines étapes & Synthèse
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Plan des prochaines \u00e9tapes', y);
  y = bodyText(doc, 'Quitter la table avec un plan concret, des dates, et des responsables.', 14, y, 182);
  y += 4;

  // Checklist
  doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
  doc.roundedRect(14, y, 182, checklistPostRDV.length * 9 + 8, 3, 3, 'F');
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 3, checklistPostRDV.length * 9 + 8, 1.5, 1.5, 'F');
  let cy = y + 9;
  for (const item of checklistPostRDV) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(60 / 255, 60 / 255, 60 / 255);
    doc.text(item, 20, cy);
    cy += 9;
  }
  y = cy + 10;

  // Livrables
  y = sectionTitle(doc, 'Livrables du cadrage', y);
  for (const l of livrablesCadrage) {
    if (y > 260) {
      doc.addPage();
      addPageBackground(doc);
      addHeader(doc, 6, totalPages, guideTitle, logoBase64);
      addFooter(doc);
      y = 32;
    }
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 18, 2, 2, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 4, 18, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(l.name, 24, y + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80 / 255, 80 / 255, 80 / 255);
    const dl = doc.splitTextToSize(l.desc, 166);
    doc.text(dl, 24, y + 13);
    y += 22;
  }

  y += 4;
  y = sectionTitle(doc, 'Gouvernance projet', y);
  const gouvernance = [
    { role: 'Point focal Khepra', desc: 'Consultant principal d\u00e9di\u00e9, interlocuteur unique, acc\u00e8s direct au fondateur.' },
    { role: 'Point focal Optasia', desc: 'Interlocuteur nomm\u00e9 avec pouvoir de d\u00e9cision, acc\u00e8s direct au board.' },
    { role: 'Comit\u00e9 de pilotage', desc: 'R\u00e9union bi-mensuelle : points focaux + notaire + CAC + architecte IT.' },
  ];

  for (const g of gouvernance) {
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(14, y, 182, 18, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(g.role, 20, y + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(80 / 255, 80 / 255, 80 / 255);
    doc.text(g.desc, 20, y + 13);
    y += 22;
  }

  y += 4;
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('KHEPRA EXPERTS \u2014 Votre bras op\u00e9rationnel pour l\'agr\u00e9ment', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(210 / 255, 220 / 255, 215 / 255);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09  |  khepraexperts.com', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('CONFIDENTIEL \u2014 Usage interne exclusif', 105, y + 30, { align: 'center' });

  return new Promise((resolve) => {
    const blob = doc.output('blob');
    resolve(blob);
  });
}



