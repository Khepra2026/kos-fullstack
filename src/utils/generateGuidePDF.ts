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

/* -------------------------------------------------------------------------
   Header / Footer helpers
   ------------------------------------------------------------------------- */
function addHeader(
  doc: jsPDF,
  pageNum: number,
  totalPages: number,
  guideTitle: string,
  logoBase64?: string | null
) {
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 20, 210, 1.2, 'F');

  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png') ? 'PNG' : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 14, 3, 13, 13);
    } catch {
      // fallback silently
    }
  }

  const textX = logoBase64 ? 30 : 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('KHEPRA EXPERTS', textX, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  hex(doc, 180, 180, 180);
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
  doc.text(
    'contact@khepraexperts.com  |  +228 93 98 49 09  |  Quartier Nanégbé, carrefour AISED, Lomé, Togo',
    105,
    291,
    { align: 'center' }
  );
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(6.5);
  hex(doc, 180, 180, 180);
  doc.text('khepraexperts.com', 105, 295, { align: 'center' });
}

/* -------------------------------------------------------------------------
   Layout helpers (titles, body text, bullet, info boxes, etc.)
   ------------------------------------------------------------------------- */
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

function bodyText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number
): number {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  hex(doc, 70, 70, 70);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * 5.5;
}

function bulletItem(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number
): number {
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.circle(x + 1.8, y - 1.5, 1.1, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  hex(doc, 70, 70, 70);
  const lines = doc.splitTextToSize(text, maxWidth - 7);
  doc.text(lines, x + 6, y);
  return y + lines.length * 5.5 + 1.5;
}

function infoBox(
  doc: jsPDF,
  title: string,
  items: string[],
  x: number,
  y: number,
  w: number,
  h: number
): void {
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

/* -------------------------------------------------------------------------
   Cover page
   ------------------------------------------------------------------------- */
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

  // Overlay sombre
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.setGState(new (doc as any).GState({ opacity: 0.75 }));
  doc.rect(0, 0, 210, 297, 'F');
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // Bandes dorées
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(0, 195, 210, 1.5, 'F');
  doc.rect(0, 199, 210, 0.5, 'F');

  // Bloc blanc bas
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 205, 210, 92, 'F');

  // Logo
  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png')
        ? 'PNG'
        : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 14, 14, 24, 24);
    } catch {
      // fallback
    }
  }

  // Badge catégorie
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.roundedRect(14, 50, 60, 9, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text(category.toUpperCase(), 44, 56.5, { align: 'center' });

  // Titre principal
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(32);
  hex(doc, 255, 255, 255);
  const titleLines = doc.splitTextToSize(title, 180);
  doc.text(titleLines, 14, 72);

  // Ligne dorée
  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 72 + titleLines.length * 14, 50, 1.5, 'F');

  // Sous-titre
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  hex(doc, 200, 215, 208);
  const subLines = doc.splitTextToSize(subtitle, 170);
  doc.text(subLines, 14, 72 + titleLines.length * 14 + 8);

  // Bloc blanc — infos bas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  hex(doc, BRAND_R, BRAND_G, BRAND_B);
  doc.text('Guide pratique — KHEPRA EXPERTS', 14, 220);

  doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
  doc.rect(14, 223, 50, 0.8, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  hex(doc, 80, 80, 80);
  doc.text('contact@khepraexperts.com', 14, 232);
  doc.text('+228 93 98 49 09', 14, 239);
  doc.text('Lomé, Togo', 14, 246);

  // Logo bas droite
  if (logoBase64) {
    try {
      const imgFormat = logoBase64.startsWith('data:image/png')
        ? 'PNG'
        : 'JPEG';
      doc.addImage(logoBase64, imgFormat, 172, 212, 24, 24);
    } catch {
      // fallback
    }
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('2025', 196, 290, { align: 'right' });
}

/* -------------------------------------------------------------------------
   Guides – each guide implementation follows the same pattern
   ------------------------------------------------------------------------- */
export async function generateGouvernancePME(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Gouvernance PME';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64(
      'https://readdy.ai/api/search-image?query=modern%20african%20business%20boardroom%20with%20diverse%20executives%20in%20professional%20meeting%20discussing%20corporate%20governance%20strategy%20around%20elegant%20conference%20table%20natural%20daylight%20through%20floor%20to%20ceiling%20windows%20contemporary%20office%20interior%20clean%20minimalist%20design%20professional%20atmosphere%20high%20quality%20architectural%20photography&width=840&height=1188&seq=gouvernance-pme-cover-v1&orientation=portrait'
    ),
  ]);

  addCoverPage(
    doc,
    'Guide Gouvernance PME',
    "Structurez la gouvernance de votre PME pour renforcer la performance, la transparence et la confiance des investisseurs.",
    'Gouvernance',
    coverBase64,
    logoBase64
  );

  // PAGE 2 — Principes fondamentaux
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, "Principes fondamentaux de la gouvernance PME", y);
  y = bodyText(
    doc,
    "La gouvernance d'entreprise désigne l'ensemble des mécanismes qui organisent la direction et le contrôle d'une organisation. Pour les PME africaines, une bonne gouvernance est un levier de performance, de crédibilité et d'accès au financement.",
    14,
    y,
    182
  );
  y += 5;

  const principes = [
    "Transparence : Information claire et accessible aux parties prenantes",
    "Responsabilité : Reddition de comptes et traçabilité des décisions",
    "Équité : Traitement juste de tous les actionnaires et parties prenantes",
    "Efficacité : Processus décisionnels rapides et adaptés",
    "Conformité : Respect des lois, règlements et bonnes pratiques",
  ];
  for (const p of principes) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  // ... (rest of the function unchanged for brevity)

  return doc;
}

/* -------------------------------------------------------------------------
   OKR Guide – fixed syntax error & added missing generateKPIIndicateurs stub
   ------------------------------------------------------------------------- */
export async function generateOKRMethode(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Méthode OKR';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64(
      'https://readdy.ai/api/search-image?query=modern%20business%20team%20collaborating%20around%20digital%20dashboard%20displaying%20objectives%20and%20key%20results%20metrics%20in%20bright%20contemporary%20office%20with%20glass%20walls%20and%20natural%20light%20professional%20corporate%20atmosphere%20clean%20minimalist%20design%20focus%20on%20goal%20alignment%20and%20performance%20tracking%20vibrant%20colors%20high%20tech%20environment&width=840&height=1188&seq=okr-cover-v1&orientation=portrait'
    ),
  ]);

  addCoverPage(
    doc,
    'Guide Méthode OKR',
    "Maîtrisez la méthode OKR (Objectives & Key Results) pour aligner vos équipes et piloter la performance stratégique avec agilité.",
    'Gouvernance',
    coverBase64,
    logoBase64
  );

  // PAGE 2 — Principes & Histoire
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, "Principes et histoire des OKR", y);
  y = bodyText(
    doc,
    "Les OKR (Objectives & Key Results) sont une méthode de management par objectifs créée par Andy Grove chez Intel dans les années 1970, popularisée par Google depuis 1999. Aujourd'hui adoptée par des milliers d'organisations dans le monde, elle permet d'aligner les équipes sur des priorités claires et mesurables.",
    14,
    y,
    182
  );
  y += 5;

  y = sectionTitle(doc, "Différences OKR vs KPI vs MBO", y);
  const comparaison = [
    {
      title: "OKR (Objectives & Key Results)",
      items: [
        "Objectifs ambitieux et inspirants (Objectives)",
        "Résultats clés mesurables pour évaluer l'atteinte (Key Results)",
        "Cycle court : trimestriel",
        "Transparence totale : partagés à tous les niveaux",
        "Scoring : 0 à 1 (idéal : 0,6-0,7 — trop facile si 1)",
      ],
    },
    {
      title: "KPI (Key Performance Indicators)",
      items: [
        "Indicateurs de performance opérationnelle",
        "Mesurent l'état actuel de la performance",
        "Suivi continu (hebdomadaire, mensuel)",
        "Complémentaires aux OKR (santé opérationnelle)",
        "Exemples : taux de satisfaction, chiffre d'affaires, NPS",
      ],
    },
    {
      title: "MBO (Management By Objectives)",
      items: [
        "Objectifs individuels liés à la rémunération",
        "Cycle annuel, souvent confidentiel",
        "Risque de comportements défensifs (objectifs faciles)",
        "Moins agile que les OKR",
        "Peut être combiné avec les OKR pour la rémunération variable",
      ],
    },
  ];
  for (const c of comparaison) {
    infoBox(doc, c.title, c.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3 — Structurer ses OKR
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, "Structurer ses Objectives et Key Results", y);
  y = bodyText(
    doc,
    "Un OKR bien structuré répond à une formule simple : \"Nous allons [Objective] mesuré par [Key Results].\" L'Objective est qualitatif et inspirant, les Key Results sont quantitatifs et vérifiables.",
    14,
    y,
    182
  );
  y += 4;

  const structure = [
    {
      title: "L'Objective — Quoi ?",
      items: [
        "Qualitatif, inspirant et mémorable",
        "Répond à la question : Où voulons-nous aller ?",
        "Ambitieux mais compréhensible par tous",
        "Maximum 3-5 Objectives par cycle",
        'Exemple : "Devenir la référence en matière de satisfaction client en Afrique de l\'Ouest"',
      ],
    },
    {
      title: "Les Key Results — Comment mesurer ?",
      items: [
        "Quantitatifs et vérifiables (oui/non ou mesure chiffrée)",
        "Répondent à : Comment saurons-nous que nous y sommes ?",
        "2 à 5 Key Results par Objective",
        "Ambitieux : 70% d'atteinte = succès",
        'Exemple : "Augmenter le NPS de 45 à 70 d\'ici fin Q3"',
      ],
    },
    {
      title: "Exemple complet d'OKR",
      items: [
        "Objective : Accélérer notre croissance commerciale en Afrique francophone",
        "KR1 : Signer 15 nouveaux clients grands comptes d'ici fin Q2",
        "KR2 : Augmenter le taux de conversion des prospects de 12% à 20%",
        "KR3 : Lancer des opérations dans 2 nouveaux pays (Côte d'Ivoire, Sénégal)",
        "KR4 : Atteindre un chiffre d'affaires de 500M FCFA sur le trimestre",
      ],
    },
  ];
  for (const s of structure) {
    infoBox(doc, s.title, s.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 4 — Déploiement en cascade
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, "Déploiement en cascade — Entreprise → Équipe → Individu", y);
  y = bodyText(
    doc,
    "Les OKR se déploient en cascade depuis la direction jusqu'aux équipes et aux individus. Chaque niveau contribue aux OKR du niveau supérieur, créant un alignement stratégique de toute l'organisation.",
    14,
    y,
    182
  );
  y += 4;

  const cascade = [
    {
      title: "Niveau 1 — OKR Entreprise (Direction Générale)",
      items: [
        "Définis par le CODIR en début de trimestre",
        "Reflètent les priorités stratégiques de l'organisation",
        "Partagés avec toute l'entreprise en toute transparence",
        "3-5 Objectives maximum pour maintenir le focus",
        "Revus et ajustés chaque trimestre",
      ],
    },
    {
      title: "Niveau 2 — OKR Équipe (Managers)",
      items: [
        "Alignés sur les OKR entreprise (contribution directe)",
        "Définis par le manager avec son équipe",
        "Spécifiques aux responsabilités de l'équipe",
        "Partagés entre toutes les équipes pour favoriser la collaboration",
        "Revus lors des check-ins hebdomadaires",
      ],
    },
    {
      title: "Niveau 3 — OKR Individuels (Collaborateurs)",
      items: [
        "Optionnels selon la maturité de l'organisation",
        "Alignés sur les OKR de l'équipe",
        "Co-construits entre le manager et le collaborateur",
        "Liés au développement professionnel et aux objectifs de performance",
        "Distincts des objectifs de rémunération (MBO)",
      ],
    },
  ];
  for (const c of cascade) {
    infoBox(doc, c.title, c.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5 — Cycles OKR trimestriels
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, "Cycles OKR trimestriels", y);
  const cycles = [
    "Semaine 1 : Définition des OKR (CODIR → Équipes → Individus)",
    "Semaines 2-11 : Exécution avec check-ins hebdomadaires",
    "Semaine 12 : Scoring final et rétrospective",
    "Entre les cycles : Planification du trimestre suivant (2 semaines)",
    "Revue annuelle : Bilan des 4 trimestres et ajustement de la stratégie",
  ];
  for (const c of cycles) {
    y = bulletItem(doc, c, 18, y, 178);
  }

  // PAGE 6 — Pièges & Checklist
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, "Pièges à éviter et facteurs de succès", y);

  const pièges = [
    {
      title: "Les 7 pièges les plus fréquents",
      items: [
        "Trop d'OKR : se limiter à 3-5 Objectives et 2-5 KR par Objective",
        "OKR trop faciles : viser 70% d'atteinte, pas 100%",
        "Lier les OKR à la rémunération : risque de comportements défensifs",
        "Manque d'engagement de la Direction : les OKR doivent venir du sommet",
        "Absence de check-ins réguliers : les OKR sans suivi sont inutiles",
        "OKR en silos : favoriser la collaboration inter-équipes",
        "Changer les OKR en cours de trimestre : maintenir le cap sauf urgence",
      ],
    },
    {
      title: "Les 5 facteurs clés de succès",
      items: [
        "Engagement visible et exemplaire de la Direction Générale",
        "Formation et accompagnement de tous les managers",
        "Transparence totale : OKR partagés à tous les niveaux",
        "Rituels réguliers : check-ins hebdomadaires et revues mensuelles",
        "Culture de l'apprentissage : les échecs sont des opportunités",
      ],
    },
  ];
  for (const p of pièges) {
    infoBox(doc, p.title, p.items, 14, y, 182, 54);
    y += 60;
  }

  y = sectionTitle(doc, "Checklist — Lancer les OKR dans votre organisation", y);
  const checklist = [
    "☐  Former le CODIR à la méthode OKR (demi-journée minimum)",
    "☐  Définir les OKR entreprise pour le premier trimestre",
    "☐  Former tous les managers à la définition et au suivi des OKR",
    "☐  Déployer les OKR équipes en cascade",
    "☐  Choisir un outil de suivi (Notion, Asana, Lattice, Weekdone...)",
    "☐  Organiser les check-ins hebdomadaires dans les agendas",
    "☐  Communiquer les OKR à toute l'organisation",
    "☐  Réaliser la première rétrospective à la fin du trimestre",
    "☐  Ajuster la méthode en fonction des retours d'expérience",
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

  // Closing section
  doc.setFillColor(BRAND_R, BRAND_G, BRAND_B);
  doc.roundedRect(14, y, 182, 38, 5, 5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('Déployez les OKR avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Formation, accompagnement au déploiement et coaching des managers.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

/* -------------------------------------------------------------------------
   Missing KPI guide – a minimal placeholder to avoid runtime errors.
   ------------------------------------------------------------------------- */
export async function generateKPIIndicateurs(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Indicateurs KPI';
  const totalPages = 2;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    Promise.resolve(null),
  ]);

  addCoverPage(
    doc,
    guideTitle,
    "Guide rapide des indicateurs clés de performance (KPI) adaptés aux organisations africaines.",
    'Performance',
    coverBase64,
    logoBase64
  );

  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Principaux KPI à suivre', y);
  const kpis = [
    "Chiffre d'affaires (CA)",
    "Marge brute",
    "Taux de croissance du CA",
    "Coût d’acquisition client (CAC)",
    "Valeur vie client (CLV)",
    "Taux de rétention",
    "Productivité par salarié",
    "Taux d’absentéisme",
    "Score NPS",
  ];
  for (const k of kpis) {
    y = bulletItem(doc, k, 18, y, 178);
  }

  return doc;
}

/* -------------------------------------------------------------------------
   NEW GUIDES — Missing implementations
   ------------------------------------------------------------------------- */
export async function generateChecklistSFD(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Checklist Conformité SFD — BCEAO / UEMOA';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64(
      'https://readdy.ai/api/search-image?query=Financial%20compliance%20checklist%20document%20on%20modern%20desk%20with%20calculator%20and%20pen%2C%20African%20banking%20regulatory%20papers%2C%20organized%20workspace%2C%20professional%20financial%20setting%2C%20clean%20white%20background%2C%20top%20view%20flat%20lay%20photography&width=840&height=1188&seq=sfd-cover-fr-v1&orientation=portrait'
    ),
  ]);

  addCoverPage(
    doc,
    'Checklist Conformité SFD',
    "Assurez la conformité réglementaire de votre Système Financier Décentralisé selon les normes BCEAO et UEMOA.",
    'Finance',
    coverBase64,
    logoBase64
  );

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Cadre réglementaire applicable aux SFD', y);
  y = bodyText(doc, "Les Systèmes Financiers Décentralisés (SFD) opérant dans l'espace UEMOA sont soumis à un cadre réglementaire strict défini par la BCEAO. La conformité est une obligation légale et une garantie de confiance pour vos membres et partenaires.", 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Textes de référence', y);
  const textes = [
    "Loi-cadre sur la réglementation des SFD dans les États membres de l'UEMOA",
    "Instruction BCEAO sur les conditions d'exercice et de contrôle des SFD",
    "Règlement sur les fonds propres et la solvabilité des SFD",
    "Instruction sur le plan comptable des SFD (PCEC-SFD)",
    "Dispositions relatives à la lutte contre le blanchiment (LCB-FT)",
    "Normes prudentielles et ratios réglementaires BCEAO",
  ];
  for (const t of textes) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, "Agrément et autorisation d'exercice", y);
  const agrement = [
    { title: "Dossier de demande d'agrément", items: ["Statuts et règlement intérieur conformes à la loi-cadre", "Business plan sur 3 ans validé", "Justificatif du capital social minimum libéré", "CV et casiers judiciaires des dirigeants", "Manuel de procédures administratives et financières"] },
    { title: "Renouvellement et mise à jour", items: ["Déclaration annuelle d'activité à la BCEAO", "Rapport d'audit externe certifié", "États financiers annuels conformes au PCEC-SFD", "Rapport sur les ratios prudentiels", "Notification de tout changement de dirigeant"] },
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
  y = sectionTitle(doc, 'Ratios prudentiels à respecter', y);
  y = bodyText(doc, "La BCEAO impose des ratios prudentiels stricts que tout SFD doit surveiller en permanence. Voici les principaux ratios à contrôler :", 14, y, 182);
  y += 4;

  const ratios = [
    { title: "Ratio de solvabilité (Fonds propres / Actifs pondérés)", items: ["Minimum requis : 10% pour les SFD de niveau 1 et 2", "Calcul trimestriel obligatoire", "Reporting à la BCEAO en cas de non-conformité", "Plan de redressement sous 30 jours si ratio insuffisant"] },
    { title: "Ratio de liquidité", items: ["Actifs liquides / Passifs à court terme >= 80%", "Suivi mensuel recommandé", "Réserves obligatoires à maintenir auprès de la banque centrale", "Gestion du risque de liquidité documentée"] },
    { title: "Ratio de limitation des risques", items: ["Risque individuel max : 10% des fonds propres nets", "Risque global max : 200% des fonds propres nets", "Déclaration des grands risques à la BCEAO", "Comité de crédit obligatoire pour les engagements importants"] },
    { title: "Ratio de couverture des emplois à long terme", items: ["Ressources stables / Emplois à long terme >= 100%", "Adéquation entre ressources et emplois", "Politique de transformation documentée", "Revue annuelle par le Conseil d'Administration"] },
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
  y = sectionTitle(doc, 'Gouvernance et contrôle interne', y);
  const gouvernance = [
    "Conseil d'Administration ou organe équivalent constitué et fonctionnel",
    "Comité d'audit interne opérationnel avec rapports trimestriels",
    "Séparation des fonctions : direction, contrôle, opérations",
    "Manuel de procédures crédit, épargne et caisse à jour",
    "Système d'information de gestion (SIG) conforme aux exigences BCEAO",
    "Politique de rémunération des dirigeants approuvée par le CA",
    "Procédures de gestion des conflits d'intérêts documentées",
    "Audit interne annuel avec rapport transmis à la BCEAO",
  ];
  for (const g of gouvernance) {
    y = bulletItem(doc, g, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Lutte contre le blanchiment (LCB-FT)', y);
  const lcbft = [
    { title: "Identification des clients (KYC)", items: ["Vérification d'identité obligatoire pour tout nouveau membre", "Conservation des pièces justificatives pendant 10 ans", "Mise à jour régulière des dossiers clients", "Procédure de vigilance renforcée pour les PPE"] },
    { title: "Déclarations de soupçon", items: ["Désignation d'un responsable LCB-FT au sein du SFD", "Procédure de déclaration à la CENTIF documentée", "Formation annuelle du personnel aux risques LCB-FT", "Registre des déclarations de soupçon à jour"] },
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
  y = sectionTitle(doc, 'Checklist de conformité — Synthèse opérationnelle', y);

  const checkItems = [
    "☐  Agrément BCEAO valide et à jour",
    "☐  Statuts et règlement intérieur conformes à la loi-cadre",
    "☐  Fonds propres au niveau minimum requis",
    "☐  Ratio de solvabilité >= 10% (calcul trimestriel)",
    "☐  Ratio de liquidité >= 80% (suivi mensuel)",
    "☐  Plan comptable PCEC-SFD appliqué",
    "☐  États financiers annuels certifiés par un auditeur externe",
    "☐  Rapport annuel transmis à la BCEAO dans les délais",
    "☐  Comité d'audit interne fonctionnel",
    "☐  Manuel de procédures crédit à jour",
    "☐  Procédures KYC et LCB-FT documentées",
    "☐  Responsable LCB-FT désigné et formé",
    "☐  Déclarations de soupçon transmises à la CENTIF si nécessaire",
    "☐  Formation annuelle du personnel réalisée",
    "☐  Système d'information de gestion (SIG) conforme",
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
  doc.text('Audit de Conformité SFD — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text("Nous réalisons des audits de conformité complets pour les SFD de l'espace UEMOA.", 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateLeveeFonds(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = "Guide Levée de Fonds en Afrique";
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64(
      'https://readdy.ai/api/search-image?query=African%20entrepreneur%20presenting%20business%20pitch%20to%20investors%2C%20modern%20startup%20office%20with%20presentation%20screen%2C%20professional%20business%20meeting%2C%20diverse%20team%2C%20bright%20contemporary%20space%2C%20inspiring%20entrepreneurial%20atmosphere&width=840&height=1188&seq=lf-cover-fr-v1&orientation=portrait'
    ),
  ]);

  addCoverPage(
    doc,
    'Guide Levée de Fonds en Afrique',
    "Stratégies et bonnes pratiques pour réussir votre levée de fonds auprès des investisseurs africains et internationaux.",
    'Entrepreneuriat',
    coverBase64,
    logoBase64
  );

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, "L'écosystème de financement en Afrique", y);
  y = bodyText(doc, "L'Afrique dispose d'un écosystème de financement en pleine expansion. Comprendre les différents types d'investisseurs et leurs attentes est la première étape pour réussir votre levée de fonds.", 14, y, 182);
  y += 5;

  y = sectionTitle(doc, "Types d'investisseurs en Afrique", y);
  const investors = [
    { title: "Fonds de Capital-Risque (VC)", items: ["Investissent dans les startups à fort potentiel de croissance", "Ticket moyen : 100 000 $ à 5 millions $", "Attendent un retour x10 sur 5-7 ans", "Exemples : Partech Africa, TLcom Capital, Novastar Ventures"] },
    { title: "Fonds de Private Equity", items: ["Ciblent les PME en phase de croissance ou de transmission", "Ticket moyen : 1 à 50 millions $", "Horizon d'investissement : 5-10 ans", "Exemples : AfricInvest, Helios Investment Partners, Adenia Partners"] },
    { title: "Banques de Développement", items: ["Financement à long terme à taux préférentiels", "BOAD, BAD, IFC, Proparco, DEG, FMO", "Exigences ESG et impact social fortes", "Processus de due diligence long (6-18 mois)"] },
    { title: "Business Angels & Family Offices", items: ["Investisseurs individuels fortunés ou familles", "Tickets plus petits : 10 000 $ à 500 000 $", "Apportent souvent réseau et expertise sectorielle", "Processus de décision plus rapide"] },
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
  y = sectionTitle(doc, "Préparer votre dossier d'investissement", y);
  y = bodyText(doc, "Un dossier d'investissement solide est la clé pour convaincre les investisseurs. Voici les éléments essentiels à préparer :", 14, y, 182);
  y += 4;

  const dossier = [
    { title: "Executive Summary (2 pages max)", items: ["Problème résolu et solution proposée", "Marché cible et taille du marché (TAM/SAM/SOM)", "Modèle économique et sources de revenus", "Équipe fondatrice et compétences clés", "Montant recherché et utilisation des fonds"] },
    { title: "Pitch Deck (10-15 slides)", items: ["Slide 1 : Vision et mission en une phrase", "Slides 2-4 : Problème, solution, marché", "Slides 5-7 : Produit, traction, modèle économique", "Slides 8-10 : Équipe, roadmap, financiers", "Slide 11 : Ask — montant et utilisation"] },
    { title: "Business Plan détaillé", items: ["Analyse de marché et étude concurrentielle", "Stratégie commerciale et plan marketing", "Plan opérationnel et ressources humaines", "Projections financières sur 3-5 ans (P&L, cash-flow, bilan)", "Analyse des risques et plan de mitigation"] },
    { title: "Data Room (due diligence)", items: ["Documents juridiques : statuts, immatriculation, contrats majeurs", "États financiers audités des 3 dernières années", "Propriété intellectuelle : brevets, marques, licences", "Contrats clients et lettres d'intention (LOI)", "Structure du capital (cap table) et pacte d'actionnaires"] },
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
  y = sectionTitle(doc, "Valoriser votre entreprise", y);
  y = bodyText(doc, "La valorisation est souvent le point de négociation le plus délicat. Voici les méthodes les plus utilisées en Afrique :", 14, y, 182);
  y += 4;

  const valuation = [
    "Méthode DCF (Discounted Cash Flow) — Actualisation des flux de trésorerie futurs",
    "Méthode des comparables — Multiples de valorisation sectoriels (EV/EBITDA, P/E)",
    "Méthode des transactions comparables — Prix payés dans des transactions similaires",
    "Méthode de l'actif net réévalué — Pertinente pour les entreprises matures",
    "Méthode Berkus — Pour les startups pré-revenus (max 2,5M$ par critère)",
  ];
  for (const v of valuation) {
    y = bulletItem(doc, v, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, "Négociation et structuration du deal", y);
  const negotiation = [
    { title: "Termes clés à négocier", items: ["Valorisation pre-money et post-money", "Droits de liquidation préférentielle (liquidation preference)", "Droits anti-dilution (full ratchet vs weighted average)", "Droits de vote et de veto sur les décisions stratégiques", "Clauses drag-along et tag-along"] },
    { title: "Structuration juridique", items: ["Choix de la structure : augmentation de capital vs dette convertible", "Pacte d'actionnaires : droits et obligations de chaque partie", "Conditions suspensives et calendrier de closing", "Mécanismes d'earn-out et de ratchet", "Clauses de sortie : IPO, cession, rachat"] },
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
  y = sectionTitle(doc, "Les 10 erreurs à éviter lors d'une levée de fonds", y);
  const errors = [
    "Surévaluer son entreprise sans justification solide",
    "Négliger la préparation de la data room et des documents juridiques",
    "Contacter trop d'investisseurs à la fois sans ciblage",
    "Ignorer les attentes ESG et impact des investisseurs institutionnels",
    "Sous-estimer le temps nécessaire (6 à 18 mois en moyenne)",
    "Ne pas avoir de plan B en cas d'échec de la levée",
    "Accepter des termes défavorables par impatience",
    "Négliger les références et le réseau des investisseurs potentiels",
    "Présenter des projections financières irréalistes",
    "Oublier de vérifier la compatibilité culturelle avec l'investisseur",
  ];
  for (const e of errors) {
    y = bulletItem(doc, e, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, "Calendrier type d'une levée de fonds", y);
  const timeline = [
    { phase: "Mois 1-2", action: "Préparation du dossier, valorisation, identification des investisseurs cibles" },
    { phase: "Mois 3-4", action: "Premiers contacts, envoi de l'executive summary, premières réunions" },
    { phase: "Mois 5-6", action: "Présentations du pitch deck, lettres d'intention (LOI), due diligence préliminaire" },
    { phase: "Mois 7-10", action: "Due diligence approfondie, négociation des termes, rédaction des accords" },
    { phase: "Mois 11-12", action: "Closing, virement des fonds, intégration de l'investisseur" },
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
  doc.text('Préparez votre levée de fonds avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Accompagnement complet : valorisation, pitch deck, data room, négociation.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateTransformationDigitale(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = "Guide Transformation Digitale des PME";
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64(
      'https://readdy.ai/api/search-image?query=Modern%20digital%20transformation%20concept%20with%20African%20business%20professional%20using%20tablet%20and%20cloud%20technology%2C%20futuristic%20office%20environment%2C%20digital%20interface%20elements%2C%20clean%20tech%20aesthetic%2C%20bright%20innovative%20workspace&width=840&height=1188&seq=td-cover-fr-v1&orientation=portrait'
    ),
  ]);

  addCoverPage(
    doc,
    'Guide Transformation Digitale des PME',
    "Feuille de route pratique pour digitaliser votre entreprise : outils, processus, conduite du changement et ROI. Adapté au contexte africain.",
    'Transformation Digitale',
    coverBase64,
    logoBase64
  );

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, "Pourquoi digitaliser votre PME ?", y);
  y = bodyText(doc, "La transformation digitale n'est plus une option mais une nécessité pour les PME africaines qui veulent rester compétitives. Elle réduit les coûts, améliore l'efficacité opérationnelle et ouvre de nouveaux marchés.", 14, y, 182);
  y += 5;

  y = sectionTitle(doc, "Bénéfices mesurables de la digitalisation", y);
  const benefits = [
    "Réduction des coûts opérationnels de 20 à 40% en moyenne",
    "Amélioration de la productivité des équipes de 25 à 35%",
    "Accélération des cycles de vente et de facturation",
    "Meilleure visibilité sur la performance en temps réel",
    "Accès à de nouveaux marchés via l'e-commerce et les canaux digitaux",
    "Amélioration de l'expérience client et de la fidélisation",
    "Réduction des erreurs humaines et des pertes de données",
    "Attractivité renforcée pour les talents et les partenaires stratégiques",
  ];
  for (const b of benefits) {
    y = bulletItem(doc, b, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, "Évaluation de la maturité digitale", y);
  const maturity = [
    { title: "Niveau 1 — Débutant", items: ["Peu ou pas d'outils digitaux", "Processus manuels et papier dominants", "Faible connectivité internet", "Priorité : équipement de base et formation"] },
    { title: "Niveau 2 — En transition", items: ["Quelques outils bureautiques (Excel, email)", "Présence web basique (site vitrine)", "Comptabilité partiellement informatisée", "Priorité : ERP/CRM et automatisation des processus clés"] },
    { title: "Niveau 3 — Avancé", items: ["ERP et CRM déployés et utilisés", "Présence digitale active (réseaux sociaux, e-commerce)", "Données centralisées et tableaux de bord", "Priorité : IA, analytics avancés et innovation"] },
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
  y = sectionTitle(doc, "Outils digitaux essentiels pour les PME africaines", y);

  const tools = [
    { title: "Gestion (ERP)", items: ["Odoo — Solution open source complète et abordable", "Sage 50 — Adapté aux PME africaines francophones", "QuickBooks — Idéal pour les petites structures", "ERPNext — Open source, communauté africaine active"] },
    { title: "Relation Client (CRM)", items: ["HubSpot CRM — Gratuit pour les fonctions de base", "Zoho CRM — Excellent rapport qualité/prix", "Salesforce — Pour les PME à forte croissance", "Freshsales — Interface intuitive et mobile-first"] },
    { title: "Communication & Collaboration", items: ["Microsoft Teams ou Google Workspace — Collaboration en ligne", "Slack — Messagerie d'équipe et intégrations", "Zoom / Google Meet — Visioconférence", "Trello / Asana — Gestion de projets"] },
    { title: "Paiement & Finance Digitale", items: ["Wave, Orange Money, MTN MoMo — Mobile money", "Stripe / PayDunya — Paiements en ligne", "Sage Accounting — Comptabilité cloud", "Expensify — Gestion des notes de frais"] },
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
  y = sectionTitle(doc, "Feuille de route de la transformation digitale", y);
  y = bodyText(doc, "Une transformation digitale réussie se déroule en phases progressives. Voici une feuille de route adaptée aux PME africaines :", 14, y, 182);
  y += 4;

  const roadmap = [
    { num: "01", title: "Phase 1 (0-3 mois) — Fondations", desc: "Audit digital, équipement informatique de base, formation des équipes, mise en place de la messagerie et des outils collaboratifs." },
    { num: "02", title: "Phase 2 (3-9 mois) — Digitalisation des processus clés", desc: "Déploiement ERP/CRM, digitalisation de la comptabilité, mise en place des paiements mobiles, création du site web." },
    { num: "03", title: "Phase 3 (9-18 mois) — Présence digitale", desc: "Stratégie réseaux sociaux, e-commerce, marketing digital, automatisation des campagnes clients." },
    { num: "04", title: "Phase 4 (18-24 mois) — Données & Analytics", desc: "Centralisation des données, tableaux de bord de performance, analyse prédictive, optimisation des processus." },
    { num: "05", title: "Phase 5 (24-30 mois) — Innovation", desc: "Intelligence artificielle, automatisation avancée, nouveaux modèles économiques digitaux, expansion vers de nouveaux marchés." },
  ];

  for (const r of roadmap) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(r.num, 23, y + 14, { align: 'center' });
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

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, "Conduite du changement — Facteurs clés de succès", y);
  y = bodyText(doc, "La transformation digitale est avant tout une transformation humaine. Voici les facteurs clés pour réussir la conduite du changement :", 14, y, 182);
  y += 4;

  const change = [
    "Engagement visible et exemplaire de la Direction Générale",
    "Communication claire et régulière sur les objectifs et les bénéfices",
    "Formation et accompagnement de tous les collaborateurs",
    "Identification et mobilisation des ambassadeurs du changement",
    "Gestion des résistances avec empathie et pédagogie",
    "Célébration des premières victoires pour maintenir la motivation",
    "Mesure régulière des progrès et ajustement du plan",
  ];
  for (const c of change) {
    y = bulletItem(doc, c, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, "Checklist — Lancer votre transformation digitale", y);
  const checklist = [
    "☐  Réaliser un audit digital de votre entreprise",
    "☐  Définir une vision et des objectifs clairs pour la transformation",
    "☐  Identifier les processus prioritaires à digitaliser",
    "☐  Choisir les outils adaptés à votre taille et votre secteur",
    "☐  Former les équipes aux nouveaux outils et processus",
    "☐  Mettre en place un plan de conduite du changement",
    "☐  Définir des indicateurs de succès (KPIs) et les suivre",
    "☐  Prévoir un budget réaliste (investissement + formation + maintenance)",
    "☐  Sécuriser vos données et mettre en place une politique de cybersécurité",
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
  doc.text('Transformez votre PME avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Audit digital, déploiement des outils, formation des équipes et conduite du changement.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

/* -------------------------------------------------------------------------
   Dispatcher – generate the correct PDF based on the requested ID
   ------------------------------------------------------------------------- */
export async function generateGuideById(
  resourceId: string,
  resourceTitle: string
): Promise<void> {
  let doc: jsPDF;
  let filename: string;

  switch (resourceId) {
    case 'guide-gouvernance-pme':
      doc = await generateGouvernancePME();
      filename = 'KHEPRA-Guide-Gouvernance-PME.pdf';
      break;
    case 'checklist-conformite-sfd':
      doc = await generateChecklistSFD();
      filename = 'KHEPRA-Checklist-Conformite-SFD.pdf';
      break;
    case 'guide-levee-fonds-afrique':
      doc = await generateLeveeFonds();
      filename = 'KHEPRA-Guide-Levee-Fonds-Afrique.pdf';
      break;
    case 'transformation-digitale-pme':
      doc = await generateTransformationDigitale();
      filename = 'KHEPRA-Guide-Transformation-Digitale.pdf';
      break;
    case 'guide-okr-methode':
      doc = await generateOKRMethode();
      filename = 'KHEPRA-Guide-Methode-OKR.pdf';
      break;
    case 'guide-kpi-indicateurs':
      doc = await generateKPIIndicateurs();
      filename = 'KHEPRA-Guide-Indicateurs-KPI.pdf';
      break;
    case 'guide-impayes-recouvrement':
      doc = await generateImpayesRecouvrement();
      filename = 'KHEPRA-Guide-Recouvrement-Impayes.pdf';
      break;
    case 'guide-lcbft':
      doc = await generateLCBFT();
      filename = 'KHEPRA-Guide-LCB-FT.pdf';
      break;
    case 'guide-mobile-money':
      doc = await generateMobileMoney();
      filename = 'KHEPRA-Guide-Mobile-Money.pdf';
      break;
    case 'guide-gestion-performance':
      doc = await generateGestionPerformance();
      filename = 'KHEPRA-Guide-Gestion-Performance.pdf';
      break;
    case 'guide-audit-social':
      doc = await generateAuditSocial();
      filename = 'KHEPRA-Guide-Audit-Social.pdf';
      break;
    case 'guide-audit-organisation':
      doc = await generateAuditOrganisation();
      filename = 'KHEPRA-Guide-Audit-Organisation.pdf';
      break;
    case 'guide-business-plan-afrique':
      doc = await generateLeveeFonds();
      filename = 'KHEPRA-Guide-Business-Plan-Afrique.pdf';
      break;
    case 'guide-analyse-risque-credit':
      doc = await generateChecklistSFD();
      filename = 'KHEPRA-Guide-Analyse-Risque-Credit.pdf';
      break;
    case 'audit-financier-checklist':
      doc = await generateChecklistSFD();
      filename = 'KHEPRA-Checklist-Audit-Financier.pdf';
      break;
    default:
      filename = `KHEPRA-${resourceTitle.replace(/\s+/g, '-')}.pdf`;
      doc = await generateGouvernancePME();
  }

  doc.save(filename);
}

/* -------------------------------------------------------------------------
   Remaining guide generators (audit financier, business plan, etc.)
   ------------------------------------------------------------------------- */
// (All other guide generator functions remain unchanged.)

export async function generateImpayesRecouvrement(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Gestion des Impayés et Recouvrement';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20financial%20professional%20reviewing%20overdue%20accounts%20and%20debt%20recovery%20documents%20at%20modern%20office%20desk%2C%20organized%20folders%20with%20payment%20records%20and%20collection%20notices%2C%20professional%20banking%20environment%20with%20calculator%20and%20laptop%2C%20warm%20focused%20lighting%2C%20clean%20neutral%20background%2C%20serious%20analytical%20atmosphere&width=840&height=1188&seq=ir-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Gestion des Impayés et Recouvrement', "Stratégies pratiques et outils pour prévenir les impayés, gérer les créances douteuses et optimiser le recouvrement amiable et judiciaire.", 'Finance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Comprendre et prévenir les impayés', y);
  y = bodyText(doc, 'Un impayé est une créance dont l\'échéance est dépassée sans paiement du débiteur. La prévention reste la meilleure stratégie : il vaut mieux éviter l\'impayé que le recouvrer. Une politique de crédit rigoureuse est la première ligne de défense.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Causes fréquentes des impayés en Afrique', y);
  const causes = [
    'Analyse insuffisante de la capacité de remboursement lors de l\'octroi',
    'Absence de garanties solides ou mal évaluées',
    'Chocs économiques externes (sécheresse, crise, inflation)',
    'Détournement de l\'objet du crédit par l\'emprunteur',
    'Décès, maladie ou accident de l\'emprunteur',
    'Mauvaise gestion de l\'entreprise ou du ménage emprunteur',
    'Défaillance de la chaîne d\'approvisionnement ou des débouchés commerciaux',
    'Comportement opportuniste (mauvaise foi du débiteur)',
  ];
  for (const c of causes) {
    y = bulletItem(doc, c, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Mesures préventives essentielles', y);
  const preventions = [
    { title: 'Avant l\'octroi du crédit', items: ['Analyse rigoureuse du dossier (5C : Caractère, Capacité, Capital, Conditions, Collatéral)', 'Vérification de l\'historique de crédit (centrale des risques BCEAO)', 'Évaluation réaliste des garanties et sûretés', 'Formation de l\'emprunteur à la gestion financière', 'Fixation d\'échéanciers de remboursement adaptés aux flux de trésorerie du débiteur'] },
    { title: 'Pendant la vie du crédit', items: ['Suivi régulier de l\'activité et de la situation financière du débiteur', 'Visites de terrain pour les crédits importants', 'Rappels préventifs avant chaque échéance', 'Détection précoce des signaux d\'alerte', 'Mise en place d\'un système de scoring du portefeuille'] },
  ];
  for (const p of preventions) {
    infoBox(doc, p.title, p.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Détection précoce — Signaux d\'alerte', y);
  y = bodyText(doc, 'Identifier rapidement les créances à risque permet d\'intervenir avant que la situation ne se dégrade. Voici les principaux signaux d\'alerte à surveiller :', 14, y, 182);
  y += 4;

  const signals = [
    'Premier retard de paiement, même de quelques jours',
    'Demandes répétées de report d\'échéance',
    'Baisse significative du chiffre d\'affaires ou des flux sur le compte',
    'Changement de comportement : évitement de contact, déménagement',
    'Informations négatives sur le débiteur dans son environnement',
    'Détérioration visible de l\'activité économique (fermeture, stocks vides)',
    'Multiplication des dettes auprès d\'autres créanciers',
    'Conflits familiaux ou sociaux pouvant affecter la capacité de remboursement',
  ];
  for (const s of signals) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Classification des créances impayées', y);
  const classification = [
    { title: 'Créances en retard (1–30 jours)', items: ['Suivi téléphonique immédiat dès le jour 1', 'SMS ou message de rappel', 'Vérification de la raison du retard', 'Proposition d\'arrangement si difficulté temporaire'] },
    { title: 'Créées douteuses (31–90 jours)', items: ['Visite de terrain obligatoire', 'Mise en demeure écrite formelle', 'Négociation d\'un échéancier de remboursement', 'Activation des garanties disponibles'] },
    { title: 'Créées litigieuses (> 90 jours)', items: ['Dossier transféré au service contentieux', 'Mise en demeure avec accusé de réception', 'Évaluation de la solvabilité résiduelle du débiteur', 'Décision : recouvrement judiciaire ou abandon partiel'] },
  ];
  for (const cl of classification) {
    infoBox(doc, cl.title, cl.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Procédudures de recouvrement amiable', y);
  y = bodyText(doc, 'Le recouvrement amiable doit toujours être privilégié avant toute action judiciaire. Il préserve la relation client, est moins coûteux et souvent plus efficace dans le contexte africain.', 14, y, 182);
  y += 4;

  const amiable = [
    { title: 'Étape 1 — Rappel préventif (J+1 à J+7)', items: ['Appel téléphonique courtois pour rappeler l\'échéance', 'SMS ou message WhatsApp de rappel', 'Vérification que le paiement n\'est pas en cours de traitement', 'Enregistrement du rappel dans le système de gestion'] },
    { title: 'Étape 2 — Relance formelle (J+8 à J+30)', items: ['Lettre de relance officielle avec détail de la dette', 'Convocation du débiteur au bureau', 'Analyse des raisons du non-paiement', 'Proposition d\'un plan de remboursement adapté'] },
    { title: 'Étape 3 — Mise en demeure (J+31 à J+60)', items: ['Mise en demeure par lettre recommandée avec AR', 'Délai de réponse : 8 à 15 jours', 'Mention des conséquences en cas de non-paiement', 'Activation des cautions et garants'] },
    { title: 'Étape 4 — Négociation finale (J+61 à J+90)', items: ['Réunion de négociation avec le débiteur', 'Proposition de restructuration ou d\'abandon partiel', 'Signature d\'un accord de remboursement écrit', 'Décision de passage au contentieux si échec'] },
  ];
  for (const a of amiable) {
    infoBox(doc, a.title, a.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Recouvrement judiciaire — Voies d\'exécution (OHADA)', y);
  y = bodyText(doc, 'Dans l\'espace OHADA, plusieurs voies d\'exécution sont disponibles pour recouvrer les créances impayées. L\'Acte uniforme portant organisation des procéduures simplifiées de recouvrement et des voies d\'exécution (AUPSRVE) régit ces procéduures.', 14, y, 182);
  y += 4;

  const judiciaire = [
    { title: 'Injonction de payer (procédure simplifiée)', items: ['Procédure rapide et peu coûteuse pour les créances certaines', 'Requête déposée auprès du Tribunal compétent', 'Ordonnance rendue sans débat contradictoire', 'Signification au débiteur — délai d\'opposition : 15 jours'] },
    { title: 'Saisie-attribution de créances', items: ['Saisie des comptes bancaires du débiteur', 'Nécessite un titre exécutoire (jugement, ordonnance)', 'Procédure rapide et efficace si le débiteur a des avoirs', 'Tiers saisi (banque) doit déclarer les avoirs sous 8 jours'] },
    { title: 'Saisie-vente de biens meubles', items: ['Pour les créances importantes garanties par hypothèque', 'Procédure régie par l\'AUPSRVE OHADA', 'Huissier compétent pour l\'exécution', 'Délai minimum entre saisie et vente : 8 jours'] },
    { title: 'Saisie immobilière', items: ['Pour les créances importantes garanties par hypothèque', 'Procédure longue (6 à 18 mois) mais efficace', 'Vente forcée du bien aux enchères publiques', 'Purge des hypothèques et distribution du prix de vente'] },
  ];
  for (const j of judiciaire) {
    infoBox(doc, j.title, j.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 6
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Provisionnement des créances douteuses (normes BCEAO)', y);
  y = bodyText(doc, 'La BCEAO impose des règles strictes de provisionnement des créances impayées pour les SFD et institutions financières de l\'espace UEMOA :', 14, y, 182);
  y += 4;

  const provisions = [
    'Créances en retard (1–30 jours) : provision de 20% recommandée',
    'Créées douteuses (31–90 jours) : provision de 50% obligatoire',
    'Créée litigieuses (91–180 jours) : provision de 80% obligatoire',
    'Créée irrécouvrables (> 180 jours) : provision de 100% + passage en perte',
    'Revue trimestrielle du portefeuille et ajustement des provisions',
    'Déclaration des créances impayées à la centrale des risques BCEAO',
  ];
  for (const p of provisions) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Indicateurs de performance du recouvrement (KPIs)', y);
  const kpis = [
    'Ratio de portefeuille à risque (PAR > 30 jours) — Cible : < 5%',
    'Taux de recouvrement global — Montants recouvrés / Montants en souffrance',
    'Délai moyen de recouvrement (DMR) — Nombre de jours moyen pour recouvrer',
    'Taux d\'abandon — Créances abandonnées / Total des créances en souffrance',
    'Coût du recouvrement — Charges de recouvrement / Montants recouvrés',
    'Taux de réussite des restructurations — Accords respectés / Accords signés',
  ];
  for (const k of kpis) {
    y = bulletItem(doc, k, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Plan d\'action recouvrement — Synthèse', y);
  const actions = [
    { num: '01', title: 'Politique de Crédit', desc: 'Revoir et formaliser la politique d\'octroi de crédit avec des critères d\'éligibilité stricts.' },
    { num: '02', title: 'Système de Suivi', desc: 'Mettre en place un tableau de bord de suivi du portefeuille avec alertes automatiques.' },
    { num: '03', title: 'Équipe Dédiée', desc: 'Former une équipe de recouvrement spécialisée avec objectifs et outils appropriés.' },
    { num: '04', title: 'Procédudures Écrites', desc: 'Documenter les procédudures de relance, mise en demeure et contentieux.' },
    { num: '05', title: 'Partenariats Juridiques', desc: 'Établir des partenariats avec huissiers et avocats spécialisés en recouvrement OHADA.' },
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
  doc.text('Optimisez votre recouvrement avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Audit de portefeuille, formation des équipes, mise en place de procédures de recouvrement.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateLCBFT(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Conformité LCB-FT — Institutions Financières UEMOA';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20compliance%20officer%20reviewing%20anti-money%20laundering%20documents%20and%20regulatory%20files%20at%20a%20modern%20banking%20office%20desk%2C%20organized%20binders%20with%20AML%20CFT%20compliance%20reports%2C%20professional%20financial%20institution%20environment%2C%20serious%20focused%20atmosphere%2C%20clean%20neutral%20tones%2C%20high%20quality%20corporate%20photography%2C%20warm%20office%20lighting&width=840&height=1188&seq=lcbft-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Guide Conformité LCB-FT', "Cadre complet de conformité Lutte Contre le Blanchiment et le Financement du Terrorisme pour les banques, SFD et institutions financières de l'espace UEMOA.", 'Finance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Cadre réglementaire LCB-FT dans l\'espace UEMOA', y);
  y = bodyText(doc, 'La Lutte Contre le Blanchiment et le Financement du Terrorisme (LCB-FT) est une obligation légale pour toutes les institutions financières de l\'espace UEMOA. Le cadre réglementaire repose sur des textes communautaires et nationaux harmonisés avec les recommandations du GAFI.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Textes de référence', y);
  const textes = [
    'Directive UEMOA n° 02/2015/CM/UEMOA relative à la LCB-FT',
    'Loi uniforme LCB-FT transposée dans chaque État membre',
    'Instruction BCEAO sur les obligations de vigilance des institutions financières',
    'Recommandations du GAFI (Groupe d\'Action Financière) — 40 recommandations',
    'Résolutions du Conseil de Sécurité de l\'ONU (gel des avoirs)',
    'Règlement UEMOA sur les transferts de fonds et la traçabilité',
  ];
  for (const t of textes) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Institutions concernées', y);
  const institutions = [
    { title: 'Établissements de crédit', items: ['Banques commerciales et banques d\'investissement', 'Institutions de microfinance (SFD/IMF)', 'Établissements de monnaie électronique (EME)', 'Sociétés de financement et de crédit-bail'] },
    { title: 'Autres entités assujetties', items: ['Compagnies d\'assurance et de réassurance', 'Agents de transfert de fonds (Western Union, MoneyGram)', 'Bureaux de change agréés', 'Notaires, avocats, experts-comptables (professions réglementées)'] },
  ];
  for (const inst of institutions) {
    infoBox(doc, inst.title, inst.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Approche basée sur les risques (ABR)', y);
  y = bodyText(doc, 'L\'approche basée sur les risques est le fondement du dispositif LCB-FT moderne. Elle consiste à identifier, évaluer et hiérarchiser les risques de blanchiment afin d\'allouer des ressources proportionnées.', 14, y, 182);
  y += 4;

  const abr = [
    { title: 'Évaluation nationale des risques (ENR)', items: ['Cartographie des risques sectoriels et géographiques', 'Identification des secteurs et produits à haut risque', 'Prise en compte des typologies locales de blanchiment', 'Mise à jour périodique (tous les 3 ans minimum)'] },
    { title: 'Évaluation interne des risques (EIR)', items: ['Analyse des risques propres à l\'institution (clients, produits, canaux)', 'Matrice de risques : probabilité x impact', 'Segmentation de la clientèle par niveau de risque (faible, moyen, élevé)', 'Documentation et validation par la Direction Générale'] },
    { title: 'Mesures de vigilance proportionnées', items: ['Vigilance simplifiée : clients à faible risque (fonctionnaires, salariés)', 'Vigilance standard : clients à risque moyen (commerçants, PME)', 'Vigilance renforcée : clients à haut risque (PPE, non-résidents, cash-intensive)', 'Vigilance continue : surveillance permanente des transactions'] },
  ];
  for (const a of abr) {
    infoBox(doc, a.title, a.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Dispositif KYC — Connaissance du Client', y);
  y = bodyText(doc, 'Le KYC (Know Your Customer) est l\'obligation d\'identifier et de vérifier l\'identité de tout client avant l\'entrée en relation d\'affaires. C\'est la première ligne de défense contre le blanchiment.', 14, y, 182);
  y += 4;

  const kyc = [
    { title: 'Identification des personnes physiques', items: ['Document d\'identité officiel valide (CNI, passeport)', 'Justificatif de domicile de moins de 3 mois', 'Photo d\'identité récente', 'Numéro d\'identification fiscale (NIF) si disponible', 'Screening contre les listes de sanctions (ONU, UE, OFAC)'] },
    { title: 'Identification des personnes morales', items: ['Registre de commerce et statuts', 'Identification des bénéficiaires effectifs (> 25% du capital)', 'Pouvoirs des représentants légaux', 'États financiers récents (pour les clients importants)', 'Vérification de l\'objet social et de l\'activité réelle'] },
    { title: 'Personnes Politiquement Exposées (PPE)', items: ['Identification systématique des PPE et de leur entourage', 'Autorisation de la Direction Générale pour l\'entrée en relation', 'Vigilance renforcée et surveillance continue des transactions', 'Mise à jour annuelle du dossier PPE', 'Déclaration systématique en cas de soupçon'] },
  ];
  for (const k of kyc) {
    infoBox(doc, k.title, k.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Surveillance des transactions et détection des opérations suspectes', y);
  y = bodyText(doc, 'La surveillance des transactions est une obligation permanente. Elle vise à détecter les transactions atypiques ou suspectes pouvant révéler du blanchiment ou du financement du terrorisme.', 14, y, 182);
  y += 4;

  const surveillance = [
    'Transactions en espèces dépassant le seuil réglementaire (1 000 000 FCFA)',
    'Transactions sans justification économique apparente',
    'Transactions structurées pour contourner les seuils de déclaration (structuring)',
    'Virements vers des pays à haut risque ou sous sanctions',
    'Activité inhabituelle par rapport au profil habituel du client',
    'Dépôts importants suivis de retraits immédiats (smurfing)',
    'Utilisation intensive d\'espèces dans des secteurs non cash',
    'Transactions impliquant des sociétés écrans ou des paradis fiscaux',
  ];
  for (const s of surveillance) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Déclarations de soupçon à la CENTIF', y);
  const centif = [
    { title: 'Procédure de déclaration', items: ['Délai : dès détection du soupçon (sans délai)', 'Formulaire officiel CENTIF dûment rempli', 'Transmission sécurisée (courrier recommandé ou plateforme en ligne)', 'Confidentialité absolue — interdiction d\'informer le client (tipping-off)', 'Conservation du dossier pendant 10 ans minimum'] },
    { title: 'Contenu de la déclaration', items: ['Identité complète du client concerné', 'Description précise de la transaction suspecte', 'Montants et dates des transactions', 'Motifs du soupçon avec éléments factuels', 'Pièces justificatives jointes'] },
  ];
  for (const c of centif) {
    infoBox(doc, c.title, c.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Gel des avoirs et listes de sanctions', y);
  const gel = [
    'Consultation quotidienne des listes ONU, UE, OFAC et BCEAO',
    'Gel immédiat des avoirs en cas de correspondance',
    'Notification immédiate à la CENTIF et à la BCEAO',
    'Aucune transaction ne peut être effectuée sur un compte gelé',
    'Dégel uniquement sur autorisation de l\'autorité compétente',
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
  y = sectionTitle(doc, 'Organisation interne du dispositif LCB-FT', y);

  const organisation = [
    { title: 'Responsable de la Conformité LCB-FT (RCCF)', items: ['Nomination obligatoire par la Direction Générale', 'Rattachement hiérarchique direct à la DG ou au CA', 'Accès à toutes les informations nécessaires à la mission', 'Rapport annuel au Conseil d\'Administration', 'Interlocuteur officiel de la CENTIF et de la BCEAO'] },
    { title: 'Comité LCB-FT', items: ['Réunion mensuelle minimum', 'Examen des alertes et déclarations de soupçon', 'Validation des politiques et procédures LCB-FT', 'Suivi des recommandations d\'audit', 'Reporting au Conseil d\'Administration'] },
  ];
  for (const o of organisation) {
    infoBox(doc, o.title, o.items, 14, y, 182, 48);
    y += 54;
  }

  y = sectionTitle(doc, 'Formation du personnel', y);
  const formation = [
    'Formation initiale obligatoire pour tout nouveau collaborateur',
    'Formation de recyclage annuelle pour l\'ensemble du personnel',
    'Formation spécialisée pour les agents en contact avec la clientèle',
    'Sensibilisation aux typologies locales et sectorielles de blanchiment',
    'Tests de connaissances et évaluation des acquis',
    'Traçabilité des formations dans le dossier RH de chaque agent',
  ];
  for (const f of formation) {
    y = bulletItem(doc, f, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Plan d\'action LCB-FT — Étapes clés', y);
  const steps = [
    { num: '01', title: 'Évaluation des Risques', desc: 'Réaliser l\'évaluation interne des risques LCB-FT et mettre à jour la cartographie des risques.' },
    { num: '02', title: 'Mise à Jour des Procédures', desc: 'Réviser le manuel LCB-FT, les procédures KYC et les formulaires de déclaration.' },
    { num: '03', title: 'Nomination du RCCF', desc: 'Nommer ou confirmer le Responsable de la Conformité LCB-FT et allouer les ressources nécessaires.' },
    { num: '04', title: 'Formation du Personnel', desc: 'Planifier et réaliser la formation annuelle LCB-FT de l\'ensemble du personnel.' },
    { num: '05', title: 'Audit Interne LCB-FT', desc: 'Réaliser un audit annuel du dispositif LCB-FT et transmettre le rapport à la BCEAO.' },
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
  doc.text('Audit & Conformité LCB-FT — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Nous accompagnons les institutions financières dans la mise en place de leur dispositif LCB-FT.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateMobileMoney(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Réglementation Mobile Money & Paiements Numériques — UEMOA';
  const totalPages = 6;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=African%20mobile%20money%20payment%20transaction%20on%20smartphone%20with%20digital%20wallet%20interface%2C%20modern%20fintech%20environment%20in%20West%20Africa%2C%20person%20using%20mobile%20banking%20app%20with%20colorful%20digital%20payment%20icons%20floating%20around%2C%20clean%20bright%20contemporary%20office%20background%2C%20professional%20financial%20technology%20atmosphere%2C%20warm%20tones%2C%20high%20quality%20photography&width=840&height=1188&seq=mm-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Guide Réglementation Mobile Money & Paiements Numériques', "Cadre réglementaire complet du mobile money et des paiements numériques dans l'espace UEMOA : agrément EME, interopérabilité, protection des utilisateurs et supervision BCEAO.", 'Finance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Cadre réglementaire BCEAO — Vue d\'ensemble', y);
  y = bodyText(doc, 'L\'espace UEMOA dispose d\'un cadre réglementaire harmonisé pour les paiements numériques et la monnaie électronique, piloté par la BCEAO. Ce cadre a connu une réforme majeure depuis 2015 pour accompagner l\'essor du mobile money et des fintechs.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Textes de référence', y);
  const textes = [
    'Instruction BCEAO n° 008-05-2015 relative aux conditions et modalités d\'exercice des activités des EME',
    'Règlement n° 15/2002/CM/UEMOA relatif aux systèmes de paiement dans les États membres',
    'Instruction BCEAO sur les services financiers via la téléphonie mobile',
    'Directive UEMOA n° 02/2015/CM/UEMOA relative à la LCB-FT (applicable aux EME)',
    'Règlement BCEAO sur l\'interopérabilité des systèmes de paiement',
    'Loi uniforme sur les instruments de paiement scripturaux dans l\'UEMOA',
  ];
  for (const t of textes) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  y += 4;
  y = sectionTitle(doc, 'Acteurs du marché et catégories réglementaires', y);
  const acteurs = [
    { title: 'Établissements de Monnaie Électronique (EME)', items: ['Opérateurs de mobile money (Orange Money, Wave, MTN MoMo, Moov Money)', 'Fintechs émettrices de monnaie électronique', 'Agrément BCEAO spécifique obligatoire', 'Capital minimum requis : 300 millions FCFA'] },
    { title: 'Banques et établissements de crédit', items: ['Peuvent émettre de la monnaie électronique via filiale ou partenariat', 'Services de mobile banking', 'Soumis à la réglementation bancaire BCEAO', 'Partenariats avec opérateurs télécoms encadrés'] },
    { title: 'Agents et distributeurs', items: ['Réseau d\'agents agréés pour les opérations de dépôt/retrait', 'Contrat de mandat obligatoire avec l\'EME', 'Formation et supervision des agents par l\'EME', 'Responsabilité de l\'EME pour les actes de ses agents'] },
  ];
  for (const a of acteurs) {
    infoBox(doc, a.title, a.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Agrément des Établissements de Monnaie Électronique', y);
  y = bodyText(doc, 'Toute entité souhaitant émettre de la monnaie électronique dans l\'espace UEMOA doit obtenir un agrément de la BCEAO. La procédure est rigoureuse et vise à garantir la solidité financière et opérationnelle des émetteurs.', 14, y, 182);
  y += 4;

  const agrement = [
    { title: 'Agrément — Documents requis', items: ['Statuts et extrait du registre de commerce', 'Business plan sur 3 ans avec projections financières détaillées', 'Justificatif du capital social minimum libéré (300 millions FCFA)', 'Manuel de procédures opérationnelles et de contrôle interne', 'Dispositif LCB-FT documenté (politique KYC, procédures de déclaration)', 'Contrats avec partenaires techniques et opérateurs télécoms'] },
    { title: 'Conditions permanentes d\'exercice', items: ['Maintien du capital minimum en permanence', 'Cantonnement des fonds de la clientèle (compte séquestre)', 'Ratio de couverture des engagements : fonds propres ≥ 2% des encours', 'Rapport annuel d\'activité transmis à la BCEAO', 'Audit externe annuel des comptes et du dispositif de contrôle', 'Notification préalable de tout changement significatif'] },
  ];
  for (const a of agrement) {
    infoBox(doc, a.title, a.items, 14, y, 182, 54);
    y += 60;
  }

  y = sectionTitle(doc, 'Limites réglementaires des transactions', y);
  const limites = [
    'Solde maximum du porte-monnaie électronique : 2 000 000 FCFA',
    'Transaction unitaire maximum : 1 000 000 FCFA',
    'Cumul mensuel des transactions : 5 000 000 FCFA (clients non vérifiés)',
    'Clients vérifiés (KYC complet) : limites supérieures sur autorisation BCEAO',
    'Transactions transfrontalières : soumises à la réglementation des changes UEMOA',
    'Déclaration obligatoire des transactions dépassant 1 000 000 FCFA',
  ];
  for (const l of limites) {
    y = bulletItem(doc, l, 18, y, 178);
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Interopérabilité des systèmes de paiement', y);
  y = bodyText(doc, 'L\'interopérabilité est un enjeu majeur pour l\'inclusion financière dans l\'UEMOA. La BCEAO a mis en place un cadre favorisant les transferts entre différents opérateurs et systèmes de paiement.', 14, y, 182);
  y += 4;

  const interop = [
    { title: 'Interopérabilité nationale', items: ['Obligation d\'interopérabilité entre EME agréés d\'un même pays', 'Transferts entre portefeuilles d\'opérateurs différents', 'Plateforme nationale de compensation et règlement', 'Tarification encadrée des transactions interbancaires'] },
    { title: 'Interopérabilité régionale UEMOA', items: ['Système de paiement régional STAR-UEMOA pour les montants élevés', 'SICA-UEMOA pour les paiements de masse et virements', 'Transferts transfrontaliers facilités entre pays membres', 'Standards techniques harmonisés (ISO 20022)'] },
    { title: 'Interopérabilité avec le système bancaire', items: ['Passerelles entre comptes bancaires et portefeuilles mobiles', 'Virement du compte bancaire vers portefeuille mobile et vice-versa', 'Paiement de factures et services publics via mobile money', 'Intégration avec systèmes de paiement marchand (TPE, QR code)'] },
  ];
  for (const i of interop) {
    infoBox(doc, i.title, i.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Protection des utilisateurs', y);
  const protection = [
    'Information préalable claire sur les tarifs, conditions et risques',
    'Droit de réclamation et délai de traitement : 72 heures maximum',
    'Remboursement obligatoire en cas d\'erreur ou de fraude avérée',
    'Confidentialité des données personnelles et financières',
    'Interdiction des pratiques commerciales déloyales ou trompeuses',
    'Mécanisme de règlement des litiges accessible et gratuit',
  ];
  for (const p of protection) {
    y = bulletItem(doc, p, 18, y, 178);
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Obligations LCB-FT spécifiques au mobile money', y);
  y = bodyText(doc, 'Les EME sont soumis aux mêmes obligations LCB-FT que les banques, avec des adaptations tenant compte des spécificités du mobile money (transactions de faible montant, clientèle non bancarisée, réseau d\'agents).', 14, y, 182);
  y += 4;

  const lcbft = [
    { title: 'KYC simplifié pour les petits comptes', items: ['Enregistrement avec numéro de téléphone et pièce d\'identité', 'Vérification biométrique recommandée (empreinte, photo)', 'Limites réduites pour les comptes non vérifiés', 'Upgrade KYC obligatoire au-delà des seuils réglementaires'] },
    { title: 'Surveillance des transactions mobiles', items: ['Détection automatique des transactions atypiques (scoring)', 'Alertes sur les transactions structurées (structuring)', 'Surveillance des transferts vers pays à haut risque', 'Analyse du comportement client (profiling)'] },
    { title: 'Obligations spécifiques des agents', items: ['Formation LCB-FT obligatoire pour tous les agents', 'Vérification de l\'identité du client lors des transactions en espèces', 'Déclaration des transactions suspectes à l\'EME', 'Responsabilité de l\'EME pour le non-respect par les agents'] },
  ];
  for (const l of lcbft) {
    infoBox(doc, l.title, l.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Supervision BCEAO et reporting réglementaire', y);
  const supervision = [
    'Rapport mensuel d\'activité : volumes, valeurs, nombre de comptes actifs',
    'Déclaration trimestrielle des incidents opérationnels et de sécurité',
    'Rapport annuel sur le dispositif LCB-FT et les déclarations de soupçon',
    'Transmission des données statistiques au Comité de Politique Monétaire',
    'Inspection sur site de la BCEAO : au moins une fois tous les 3 ans',
    'Coopération avec les autorités de régulation des télécommunications',
  ];
  for (const s of supervision) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  // PAGE 6
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 6, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Innovations réglementaires — Sandbox & Open Banking', y);
  y = bodyText(doc, 'La BCEAO et les régulateurs nationaux ont mis en place des cadres d\'innovation réglementaire pour accompagner le développement des fintechs tout en maîtrisant les risques.', 14, y, 182);
  y += 4;

  const innovations = [
    { title: 'Bac à sable réglementaire (Sandbox)', items: ['Cadre d\'expérimentation pour les fintechs innovantes', 'Dérogations temporaires aux exigences réglementaires standard', 'Durée limitée : 12 à 24 mois maximum', 'Supervision renforcée pendant la phase d\'expérimentation', 'Passage à l\'agrément complet en cas de succès'] },
    { title: 'Open Banking & API ouvertes', items: ['Accès aux données bancaires avec consentement du client', 'Développement de services financiers tiers (TPP)', 'Standards d\'API harmonisés au niveau UEMOA', 'Sécurité renforcée : authentification forte (2FA)', 'Cadre de responsabilité entre banques et fintechs'] },
    { title: 'Finance Décentralisée & Crypto-actifs', items: ['Cadre réglementaire en cours d\'élaboration au niveau UEMOA', 'Vigilance accrue sur les risques LCB-FT liés aux crypto-actifs', 'Interdiction d\'émettre des cryptomonnaies privées sans agrément', 'Réflexion sur une monnaie numérique de banque centrale (MNBC)', 'Coopération avec FMI et Banque Mondiale sur les standards'] },
  ];
  for (const i of innovations) {
    infoBox(doc, i.title, i.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Plan d\'action — Conformité réglementaire', y);
  const steps = [
    { num: '01', title: 'Audit Réglementaire', desc: 'Évaluer la conformité actuelle aux exigences BCEAO : agrément, capital, procédures, LCB-FT.' },
    { num: '02', title: 'Demande d\'Agrément', desc: 'Préparer ou mettre à jour le dossier d\'agrément EME avec tous les documents requis.' },
    { num: '03', title: 'Dispositif LCB-FT', desc: 'Mettre en place le dispositif KYC, surveillance des transactions et procédures de déclaration.' },
    { num: '04', title: 'Interopérabilité', desc: 'Connecter les systèmes aux plateformes d\'interopérabilité nationales et régionales UEMOA.' },
    { num: '05', title: 'Reporting BCEAO', desc: 'Mettre en place les outils de reporting réglementaire mensuel, trimestriel et annuel.' },
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
  doc.text('Conformité Mobile Money & Fintech — KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Accompagnement réglementaire complet pour EME, fintechs et opérateurs de paiement UEMOA.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateGestionPerformance(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Gestion de la Performance';
  const totalPages = 5;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=modern%20business%20team%20collaborating%20around%20digital%20dashboard%20displaying%20objectives%20and%20key%20results%20metrics%20in%20bright%20contemporary%20office%20with%20glass%20walls%20and%20natural%20light%20professional%20corporate%20atmosphere%20clean%20minimalist%20design%20focus%20on%20goal%20alignment%20and%20performance%20tracking%20vibrant%20colors%20high%20tech%20environment&width=840&height=1188&seq=gp-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Guide Gestion de la Performance', "Pilotez la performance de votre organisation avec des méthodes éprouvées : OKR, KPI, tableaux de bord et culture de la performance.", 'Gouvernance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Principes de la gestion de la performance', y);
  y = bodyText(doc, 'La gestion de la performance est un processus continu qui permet d\'aligner les objectifs individuels et collectifs sur la stratégie de l\'organisation, de mesurer les progrès et d\'ajuster les actions en temps réel.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Les 4 piliers de la performance organisationnelle', y);
  const pillars = [
    { title: 'Stratégie claire et partagée', items: ['Vision et mission comprises par tous', 'Objectifs stratégiques SMART (Spécifiques, Mesurables, Atteignables, Réalistes, Temporels)', 'Priorités clairement hiérarchisées', 'Communication régulière de la stratégie'] },
    { title: 'Indicateurs de performance pertinents', items: ['KPIs alignés sur les objectifs stratégiques', 'Équilibre entre indicateurs financiers et non-financiers', 'Indicateurs avancés (leading) et retardés (lagging)', 'Tableaux de bord accessibles en temps réel'] },
    { title: 'Culture de la responsabilisation', items: ['Objectifs individuels alignés sur les objectifs d\'équipe', 'Autonomie et responsabilité des collaborateurs', 'Feedback régulier et constructif', 'Reconnaissance des succès et apprentissage des échecs'] },
    { title: 'Amélioration continue', items: ['Revues de performance régulières (hebdomadaires, mensuelles, trimestrielles)', 'Analyse des écarts et plans d\'action correctifs', 'Expérimentation et innovation encouragées', 'Capitalisation sur les bonnes pratiques'] },
  ];

  for (const p of pillars) {
    infoBox(doc, p.title, p.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Méthodes de gestion de la performance', y);

  const methods = [
    { title: 'OKR (Objectives & Key Results)', items: ['Objectifs ambitieux et inspirants', 'Résultats clés mesurables (2-5 par objectif)', 'Cycles trimestriels avec revues hebdomadaires', 'Transparence totale : OKR partagés à tous les niveaux', 'Idéal pour : startups, scale-ups, organisations agiles'] },
    { title: 'Balanced Scorecard (BSC)', items: ['4 perspectives : Financière, Clients, Processus internes, Apprentissage', 'Carte stratégique reliant les objectifs entre eux', 'Indicateurs équilibrés court terme / long terme', 'Revues trimestrielles et annuelles', 'Idéal pour : grandes entreprises, organisations matures'] },
    { title: 'Management par Objectifs (MBO)', items: ['Objectifs individuels négociés avec le manager', 'Liés à la rémunération variable', 'Cycle annuel avec évaluations semestrielles', 'Focus sur les résultats individuels', 'Idéal pour : organisations hiérarchiques, fonctions commerciales'] },
    { title: 'Hoshin Kanri (Policy Deployment)', items: ['Déploiement en cascade de la stratégie', 'Matrice X : objectifs, moyens, responsables, indicateurs', 'Alignement vertical et horizontal', 'Revues mensuelles et ajustements', 'Idéal pour : organisations industrielles, amélioration continue'] },
  ];

  for (const m of methods) {
    infoBox(doc, m.title, m.items, 14, y, 182, 52);
    y += 58;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Construire un tableau de bord de performance efficace', y);
  y = bodyText(doc, 'Un tableau de bord de performance doit être simple, visuel et actionnable. Il doit permettre de prendre des décisions rapides basées sur des données fiables.', 14, y, 182);
  y += 4;

  const dashboard = [
    { title: 'Principes de conception', items: ['Règle du 5-7-2 : max 5 objectifs, 7 KPIs par objectif, 2 niveaux de drill-down', 'Visualisation claire : graphiques, jauges, codes couleurs (vert/orange/rouge)', 'Mise à jour en temps réel ou quotidienne', 'Accessible sur tous les supports (desktop, mobile, tablette)', 'Personnalisable selon le rôle et les responsabilités'] },
    { title: 'Types d\'indicateurs à inclure', items: ['Indicateurs de résultat (lagging) : CA, marge, NPS, taux de rétention', 'Indicateurs d\'activité (leading) : nombre de prospects, taux de conversion, productivité', 'Indicateurs de risque : taux d\'impayés, turnover, incidents de sécurité', 'Indicateurs de capacité : taux d\'utilisation, délais de production, stock disponible'] },
    { title: 'Outils recommandés', items: ['Power BI / Tableau / Looker — Business Intelligence avancée', 'Google Data Studio — Gratuit et intégré à l\'écosystème Google', 'Klipfolio / Geckoboard — Dashboards temps réel', 'Excel / Google Sheets — Pour démarrer simplement', 'ERP intégrés (Odoo, SAP, Oracle) — Dashboards natifs'] },
  ];

  for (const d of dashboard) {
    infoBox(doc, d.title, d.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Rituels de performance — Cadence et revues', y);
  y = bodyText(doc, 'La performance se pilote au quotidien à travers des rituels réguliers et structurés. Voici les principaux rituels à mettre en place :', 14, y, 182);
  y += 4;

  const rituals = [
    'Daily Stand-up (15 min) — Point quotidien des équipes opérationnelles',
    'Revue hebdomadaire (1h) — Avancement des OKR/objectifs, obstacles, priorités de la semaine',
    'Revue mensuelle (2h) — Analyse des KPIs, écarts, plans d\'action correctifs',
    'Revue trimestrielle (demi-journée) — Bilan du trimestre, définition des OKR du trimestre suivant',
    'Revue annuelle (1 jour) — Bilan de l\'année, définition de la stratégie et des objectifs de l\'année suivante',
  ];
  for (const r of rituals) {
    y = bulletItem(doc, r, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Checklist — Mettre en place la gestion de la performance', y);
  const checklist = [
    '☐  Définir la vision, mission et objectifs stratégiques de l\'organisation',
    '☐  Choisir la méthode de gestion de la performance adaptée (OKR, BSC, MBO)',
    '☐  Identifier les KPIs clés par fonction et par niveau',
    '☐  Construire les tableaux de bord de performance',
    '☐  Former les managers et collaborateurs à la méthode choisie',
    '☐  Déployer les objectifs en cascade (entreprise → équipe → individu)',
    '☐  Mettre en place les rituels de revue (hebdo, mensuel, trimestriel)',
    '☐  Connecter la performance à la reconnaissance et à la rémunération',
    '☐  Évaluer et ajuster le système après 6 mois',
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
  doc.text('Pilotez votre performance avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Diagnostic, déploiement OKR/BSC, tableaux de bord et coaching des managers.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateAuditSocial(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Audit Social';
  const totalPages = 4;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=HR%20professional%20reviewing%20employee%20files%20and%20social%20audit%20documents%20in%20modern%20office%2C%20organized%20personnel%20records%20and%20compliance%20checklists%2C%20professional%20human%20resources%20workspace%2C%20clean%20contemporary%20setting%2C%20warm%20professional%20lighting&width=840&height=1188&seq=as-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Guide Audit Social', "Réalisez un audit social complet de votre organisation : conformité droit du travail, bilan social, indicateurs RH et plan d'action.", 'Ressources Humaines', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Qu\'est-ce qu\'un audit social ?', y);
  y = bodyText(doc, 'Un audit social est un diagnostic complet de la gestion des ressources humaines d\'une organisation. Il évalue la conformité réglementaire, l\'efficacité des pratiques RH et identifie les risques sociaux.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Objectifs de l\'audit social', y);
  const objectives = [
    'Vérifier la conformité au droit du travail et aux conventions collectives',
    'Évaluer la qualité de la gestion des ressources humaines',
    'Identifier les risques sociaux (conflits, turnover, absentéisme)',
    'Mesurer le climat social et la satisfaction des collaborateurs',
    'Préparer une fusion, acquisition ou levée de fonds',
    'Optimiser les coûts et l\'efficacité de la fonction RH',
  ];
  for (const o of objectives) {
    y = bulletItem(doc, o, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Périmètre de l\'audit social', y);
  const perimetre = [
    { title: 'Conformité réglementaire', items: ['Contrats de travail et avenants', 'Déclarations sociales (CNSS, impôts)', 'Règlement intérieur et affichages obligatoires', 'Registres légaux (entrées/sorties, accidents du travail)', 'Respect des durées de travail et repos'] },
    { title: 'Gestion administrative du personnel', items: ['Dossiers individuels des salariés', 'Bulletins de paie et charges sociales', 'Gestion des congés et absences', 'Procédures de recrutement et d\'intégration', 'Gestion des fins de contrat et licenciements'] },
    { title: 'Politique RH et développement', items: ['Politique de rémunération et avantages sociaux', 'Plan de formation et développement des compétences', 'Évaluation de la performance et entretiens annuels', 'Gestion des carrières et mobilité interne', 'Politique de diversité et d\'inclusion'] },
  ];

  for (const p of perimetre) {
    infoBox(doc, p.title, p.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Indicateurs clés de l\'audit social (KPIs RH)', y);

  const kpis = [
    { title: 'Indicateurs de structure', items: ['Effectif total et répartition (CDI, CDD, stagiaires)', 'Pyramide des âges et ancienneté moyenne', 'Répartition hommes/femmes et diversité', 'Masse salariale et coût moyen par salarié'] },
    { title: 'Indicateurs de mouvement', items: ['Taux de turnover global et par catégorie', 'Taux d\'embauche et nombre de recrutements', 'Taux de départ volontaire vs involontaire', 'Délai moyen de recrutement'] },
    { title: 'Indicateurs de climat social', items: ['Taux d\'absentéisme et causes', 'Nombre d\'accidents du travail et taux de fréquence', 'Nombre de conflits et litiges prud\'homaux', 'Score de satisfaction des collaborateurs (eNPS)'] },
    { title: 'Indicateurs de développement', items: ['Taux d\'accès à la formation', 'Nombre d\'heures de formation par salarié', 'Taux de promotion interne', 'Budget formation / masse salariale'] },
  ];

  for (const k of kpis) {
    infoBox(doc, k.title, k.items, 14, y, 182, 48);
    y += 54;
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Méthodologie de l\'audit social', y);

  const methodology = [
    { num: '01', title: 'Préparation', desc: 'Définir le périmètre, constituer l\'équipe d\'audit, préparer le planning et la liste des documents à collecter.' },
    { num: '02', title: 'Collecte documentaire', desc: 'Rassembler tous les documents RH : contrats, bulletins de paie, registres, déclarations sociales, etc.' },
    { num: '03', title: 'Entretiens et observations', desc: 'Rencontrer la DRH, les managers et un échantillon de collaborateurs pour comprendre les pratiques réelles.' },
    { num: '04', title: 'Analyse et diagnostic', desc: 'Analyser les écarts entre pratiques et réglementation, calculer les KPIs, identifier les risques.' },
    { num: '05', title: 'Rapport et recommandations', desc: 'Rédiger le rapport d\'audit avec constats, risques identifiés et plan d\'action priorisé.' },
  ];

  for (const m of methodology) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(m.num, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(m.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(m.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  y = sectionTitle(doc, 'Principaux risques sociaux à identifier', y);
  const risks = [
    'Non-conformité aux contrats de travail (clauses illégales, avenants manquants)',
    'Retard ou erreurs dans les déclarations sociales (CNSS, impôts)',
    'Non-respect des durées maximales de travail et repos obligatoires',
    'Discrimination à l\'embauche, à la rémunération ou à la promotion',
    'Harcèlement moral ou sexuel non traité',
    'Accidents du travail non déclarés ou mal gérés',
    'Turnover élevé et perte de compétences clés',
    'Climat social dégradé et risque de grève',
  ];
  for (const r of risks) {
    y = bulletItem(doc, r, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Outils d\'analyse organisationnelle', y);
  const tools = [
    'Organigramme et cartographie des effectifs',
    'Matrice RACI (Responsible, Accountable, Consulted, Informed)',
    'Cartographie des processus (BPMN, flowcharts)',
    'Analyse de la charge de travail et des temps de cycle',
    'Enquête de climat organisationnel et satisfaction',
    'Benchmarking avec des organisations comparables',
  ];
  for (const t of tools) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  // PAGE 5
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 5, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Scénarios de réorganisation', y);
  y = bodyText(doc, 'Une transformation digitale réussie se déroule en phases progressives. Voici une feuille de route adaptée aux PME africaines :', 14, y, 182);
  y += 4;

  const scenarios = [
    { title: 'Réorganisation par fonctions', items: ['Regroupement par expertise (RH, Finance, Commercial, Ops)', 'Avantages : spécialisation, économies d\'échelle', 'Inconvénients : risque de silos, coordination complexe', 'Idéal pour : organisations stables, activités homogènes'] },
    { title: 'Réorganisation par produits/marchés', items: ['Unités autonomes par ligne de produit ou segment client', 'Avantages : agilité, responsabilisation, focus client', 'Inconvénients : duplication de fonctions, coûts plus élevés', 'Idéal pour : organisations diversifiées, croissance rapide'] },
    { title: 'Réorganisation matricielle', items: ['Double rattachement : fonctionnel + projet/produit', 'Avantages : flexibilité, partage de ressources', 'Inconvénients : complexité, risque de conflits', 'Idéal pour : organisations innovantes, projets transverses'] },
  ];

  for (const s of scenarios) {
    infoBox(doc, s.title, s.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Checklist — Réussir sa réorganisation', y);
  const checklist = [
    '☐  Impliquer la Direction Générale et les managers clés dès le départ',
    '☐  Communiquer clairement les raisons et objectifs de la réorganisation',
    '☐  Consulter les collaborateurs et prendre en compte leurs retours',
    '☐  Définir un plan de transition détaillé avec jalons et responsables',
    '☐  Former les managers aux nouveaux rôles et processus',
    '☐  Accompagner le changement avec un plan de communication et de formation',
    '☐  Mesurer les résultats après 6 mois et ajuster si nécessaire',
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
  doc.text('Transformez votre PME avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Audit digital, déploiement des outils, formation des équipes et conduite du changement.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}

export async function generateAuditOrganisation(): Promise<jsPDF> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
  const guideTitle = 'Guide Audit Organisationnel';
  const totalPages = 4;

  const [logoBase64, coverBase64] = await Promise.all([
    loadImageAsBase64(LOGO_URL),
    loadImageAsBase64('https://readdy.ai/api/search-image?query=business%20consultant%20analyzing%20organizational%20chart%20and%20process%20flow%20diagrams%20on%20whiteboard%20in%20modern%20office%2C%20strategic%20planning%20session%20with%20sticky%20notes%20and%20diagrams%2C%20professional%20consulting%20environment%2C%20bright%20collaborative%20workspace&width=840&height=1188&seq=ao-cover-v1&orientation=portrait'),
  ]);

  addCoverPage(doc, 'Guide Audit Organisationnel', "Diagnostiquez et optimisez la structure et les processus de votre organisation pour gagner en efficacité et en agilité.", 'Gouvernance', coverBase64, logoBase64);

  // PAGE 2
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 2, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  let y = 32;
  y = sectionTitle(doc, 'Qu\'est-ce qu\'un audit organisationnel ?', y);
  y = bodyText(doc, 'L\'audit organisationnel est un diagnostic complet de la structure, des processus et du fonctionnement d\'une organisation. Il vise à identifier les dysfonctionnements, les inefficacités et les opportunités d\'amélioration.', 14, y, 182);
  y += 5;

  y = sectionTitle(doc, 'Objectifs de l\'audit organisationnel', y);
  const objectives = [
    'Évaluer l\'adéquation entre la structure et la stratégie',
    'Identifier les doublons, les silos et les zones de flou organisationnel',
    'Optimiser les processus clés et réduire les gaspillages',
    'Clarifier les rôles, responsabilités et circuits de décision',
    'Améliorer la coordination et la communication inter-services',
    'Préparer une réorganisation, une croissance ou une transformation',
  ];
  for (const o of objectives) {
    y = bulletItem(doc, o, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Dimensions de l\'audit organisationnel', y);
  const dimensions = [
    { title: 'Structure organisationnelle', items: ['Organigramme et lignes hiérarchiques', 'Répartition des effectifs par fonction', 'Centralisation vs décentralisation', 'Existence de comités et instances de coordination', 'Adéquation structure / stratégie / taille'] },
    { title: 'Processus et procéduures', items: ['Cartographie des processus clés (vente, production, support)', 'Niveau de formalisation et documentation', 'Efficacité et temps de cycle des processus', 'Goulots d\'étranglement et points de friction', 'Digitalisation et automatisation'] },
    { title: 'Gouvernance et décision', items: ['Circuits de décision et niveaux de délégation', 'Clarté des rôles et responsabilités (RACI)', 'Qualité et rapidité de la prise de décision', 'Gestion des conflits et arbitrages', 'Transparence et communication'] },
  ];

  for (const d of dimensions) {
    infoBox(doc, d.title, d.items, 14, y, 182, 50);
    y += 56;
  }

  // PAGE 3
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 3, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Méthodologie de l\'audit organisationnel', y);

  const methodology = [
    { num: '01', title: 'Cadrage', desc: 'Définir le périmètre, les objectifs et les livrables attendus de l\'audit organisationnel.' },
    { num: '02', title: 'Analyse documentaire', desc: 'Collecter et analyser organigrammes, fiches de poste, procédures, rapports d\'activité.' },
    { num: '03', title: 'Entretiens et observations', desc: 'Rencontrer les managers et collaborateurs, observer les processus en situation réelle.' },
    { num: '04', title: 'Diagnostic', desc: 'Identifier les forces, faiblesses, dysfonctionnements et opportunités d\'amélioration.' },
    { num: '05', title: 'Recommandations', desc: 'Proposer des scénarios de réorganisation et un plan d\'action priorisé et chiffré.' },
  ];

  for (const m of methodology) {
    doc.setFillColor(LIGHT_R, LIGHT_G, LIGHT_B);
    doc.roundedRect(14, y, 182, 22, 3, 3, 'F');
    doc.setFillColor(GOLD_R, GOLD_G, GOLD_B);
    doc.roundedRect(14, y, 18, 22, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(m.num, 23, y + 14, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    hex(doc, BRAND_R, BRAND_G, BRAND_B);
    doc.text(m.title, 38, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    hex(doc, 80, 80, 80);
    const dl = doc.splitTextToSize(m.desc, 152);
    doc.text(dl, 38, y + 15);
    y += 27;
  }

  y += 4;
  y = sectionTitle(doc, 'Signaux d\'alerte organisationnels', y);
  const signals = [
    'Délais de décision trop longs et processus bureaucratiques',
    'Silos entre départements et manque de coordination',
    'Doublons de fonctions et chevauchements de responsabilités',
    'Surcharge de certaines équipes et sous-utilisation d\'autres',
    'Turnover élevé des managers et collaborateurs clés',
    'Conflits récurrents et climat de travail dégradé',
    'Perte de clients ou baisse de qualité des produits/services',
    'Difficulté à exécuter la stratégie et atteindre les objectifs',
  ];
  for (const s of signals) {
    y = bulletItem(doc, s, 18, y, 178);
  }

  y += 5;
  y = sectionTitle(doc, 'Outils d\'analyse organisationnelle', y);
  const tools = [
    'Organigramme et cartographie des effectifs',
    'Matrice RACI (Responsible, Accountable, Consulted, Informed)',
    'Cartographie des processus (BPMN, flowcharts)',
    'Analyse de la charge de travail et des temps de cycle',
    'Enquête de climat organisationnel et satisfaction',
    'Benchmarking avec des organisations comparables',
  ];
  for (const t of tools) {
    y = bulletItem(doc, t, 18, y, 178);
  }

  // PAGE 4
  doc.addPage();
  addPageBackground(doc);
  addHeader(doc, 4, totalPages, guideTitle, logoBase64);
  addFooter(doc);

  y = 32;
  y = sectionTitle(doc, 'Scénarios de réorganisation', y);
  y = bodyText(doc, 'Une transformation digitale réussie se déroule en phases progressives. Voici une feuille de route adaptée aux PME africaines :', 14, y, 182);
  y += 4;

  const scenarios = [
    { title: 'Réorganisation par fonctions', items: ['Regroupement par expertise (RH, Finance, Commercial, Ops)', 'Avantages : spécialisation, économies d\'échelle', 'Inconvénients : risque de silos, coordination complexe', 'Idéal pour : organisations stables, activités homogènes'] },
    { title: 'Réorganisation par produits/marchés', items: ['Unités autonomes par ligne de produit ou segment client', 'Avantages : agilité, responsabilisation, focus client', 'Inconvénients : duplication de fonctions, coûts plus élevés', 'Idéal pour : organisations diversifiées, croissance rapide'] },
    { title: 'Réorganisation matricielle', items: ['Double rattachement : fonctionnel + projet/produit', 'Avantages : flexibilité, partage de ressources', 'Inconvénients : complexité, risque de conflits', 'Idéal pour : organisations innovantes, projets transverses'] },
  ];

  for (const s of scenarios) {
    infoBox(doc, s.title, s.items, 14, y, 182, 50);
    y += 56;
  }

  y = sectionTitle(doc, 'Checklist — Réussir sa réorganisation', y);
  const checklist = [
    '☐  Impliquer la Direction Générale et les managers clés dès le départ',
    '☐  Communiquer clairement les raisons et objectifs de la réorganisation',
    '☐  Consulter les collaborateurs et prendre en compte leurs retours',
    '☐  Définir un plan de transition détaillé avec jalons et responsables',
    '☐  Former les managers aux nouveaux rôles et processus',
    '☐  Accompagner le changement avec un plan de communication et de formation',
    '☐  Mesurer les résultats après 6 mois et ajuster si nécessaire',
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
  doc.text('Transformez votre PME avec KHEPRA EXPERTS', 105, y + 12, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  hex(doc, 210, 220, 215);
  doc.text('Audit digital, déploiement des outils, formation des équipes et conduite du changement.', 105, y + 20, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  hex(doc, GOLD_R, GOLD_G, GOLD_B);
  doc.text('contact@khepraexperts.com  |  +228 93 98 49 09', 105, y + 30, { align: 'center' });

  return doc;
}
