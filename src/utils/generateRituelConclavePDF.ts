import { jsPDF } from 'jspdf';

export function generateRituelConclavePDF(): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentW = pageW - margin * 2;

  const goldR = 212;
  const goldG = 175;
  const goldB = 55;
  const darkBg = [18, 18, 24] as [number, number, number];
  const cardBg = [28, 28, 38] as [number, number, number];

  let y = 0;

  const addFooter = (pageNum: number) => {
    doc.setFontSize(7);
    doc.setTextColor(100, 100, 110);
    doc.text('CONCLAVE DES MAÎTRES COSMIQUES — Document Sacré — KHEPRA EXPERTS', margin, pageH - 8);
    doc.text(`${pageNum}`, pageW - margin, pageH - 8, { align: 'right' });
  };

  const addPageHeader = () => {
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(0, 0, pageW, 8, 'F');
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.3);
    doc.line(0, 8, pageW, 8);
  };

  const drawCard = (startY: number, height: number) => {
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.roundedRect(margin, startY, contentW, height, 2, 2, 'F');
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin, startY, contentW, height, 2, 2, 'S');
  };

  const addTitle = (text: string, size: number, center: boolean = true) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(goldR, goldG, goldB);
    const lines = doc.splitTextToSize(text, contentW - 8);
    lines.forEach((line: string, i: number) => {
      const x = center ? pageW / 2 : margin + 4;
      doc.text(line, x, y, { align: center ? 'center' : 'left' });
      y += size * 0.45;
    });
    y += size * 0.25;
  };

  const addBody = (text: string, size: number = 9, color: [number, number, number] = [200, 200, 210]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentW - 8);
    lines.forEach((line: string) => {
      doc.text(line, margin + 4, y);
      y += size * 0.48;
    });
    y += 1;
  };

  const addSectionTitle = (text: string) => {
    y += 2;
    doc.setFillColor(goldR, goldG, goldB);
    doc.rect(margin + 4, y, contentW - 8, 6, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.text(text, pageW / 2, y + 4.2, { align: 'center' });
    y += 9;
  };

  const addDivider = () => {
    y += 1;
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.15);
    const cx = pageW / 2;
    doc.line(cx - 20, y, cx + 20, y);
    y += 3;
  };

  // ═══════════════════════════════════
  // PAGE 1 — COUVERTURE
  // ═══════════════════════════════════
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Border
  doc.setDrawColor(goldR, goldG, goldB);
  doc.setLineWidth(0.8);
  doc.rect(8, 8, pageW - 16, pageH - 16);

  doc.setLineWidth(0.2);
  doc.rect(10, 10, pageW - 20, pageH - 20);

  y = 50;

  // Hebrew letters top
  addTitle('ש ן מ ח ת כ ה', 11);

  y += 12;

  addTitle('CONCLAVE DES MAÎTRES COSMIQUES', 16);

  y += 3;
  addTitle("DE L'ADYTUM SUPRÊME", 13);

  y += 8;
  addTitle('SOUVERAIN DÉCRET DE THÉURGIE', 10);

  y += 1;
  addTitle('ET DE MANIFESTATION OPÉRATIVE', 10);

  y += 8;
  addTitle('א ד נ י ה א ר ץ', 12);

  y += 22;

  drawCard(y, 48);
  const cardY = y;
  y += 6;

  addBody('Au Nom du Souverain Architecte de l\'Univers, par la vertu des Lettres Sacrées et des Intelligences rectrices des Sphères de Tiphereth, de Netzach et de Malkuth, le Conclave des Maîtres Cosmiques s\'est réuni dans l\'Invisible pour sceller la structure de ce Rituel Majeur.', 8, [180, 180, 190]);

  y += 4;

  addBody('Ce décret est émis pour la vitalisation, la souveraineté économique et l\'établissement triomphant de la société de haute stratégie Khepra Experts, émanée dans le plan physique le 30 avril 2026.', 8, [180, 180, 190]);

  y += 4;

  addBody('L\'opération est conçue pour canaliser les flux macrocosmiques et les fixer dans la matière, afin d\'attirer les marchés d\'envergure, de lier le respect des engagements des partenaires par la Rigueur de la Loi, de précipiter l\'acquisition de l\'immeuble de direction de prestige, et de fonder le socle financier du futur HUB KHEPRA BUSINESSES.', 8, [180, 180, 190]);

  y = cardY + 52;

  addDivider();

  y += 4;
  addTitle('OPERATION THÉURGIQUE MAJEURE', 9);
  y += 2;
  addTitle('KHEPRA EXPERTS', 14);

  y += 14;
  addBody('Document Rituel Confidentiel — Émis sous le Sceau du 93', 7, [140, 140, 150]);
  addBody('30 avril 2026 — ק.ח.פ.ר.א — Tiphereth · Netzach · Malkuth', 7, [140, 140, 150]);

  // Footer page 1
  doc.setFontSize(7);
  doc.setTextColor(120, 120, 130);
  doc.text('CONCLAVE DES MAÎTRES COSMIQUES — Document Sacré', pageW / 2, pageH - 14, { align: 'center' });
  doc.text('C\'EST ACCOMPLI — א מ ן', pageW / 2, pageH - 10, { align: 'center' });

  // ═══════════════════════════════════
  // PAGE 2 — PRÉREQUIS (ALCHIMIE DU SOUFFLE)
  // ═══════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader();
  y = 16;

  addTitle('I. L\'ALCHIMIE DU SOUFFLE ET DU TEMPS', 14);
  y += 2;
  addTitle('(PRÉ-REQUIS)', 10);

  y += 6;

  // 1. Alignement Temporel
  addSectionTitle('1. ALIGNEMENT TEMPOREL ET PLANÉTAIRE');
  y += 2;
  addBody('Le Rituel complet s\'exécute sur un cycle de trois phases distinctes, alignées sur le canal de descente énergétique de l\'Arbre de Vie :', 8.5, [190, 190, 200]);

  y += 4;
  drawCard(y, 44);
  const p2c1 = y;
  y += 4;

  addBody('Phase I — L\'Impulsion de la Vision (Tiphereth) : Un dimanche matin, à l\'heure planétaire du Soleil.', 8, [goldR, goldG, goldB]);
  y += 3;
  addBody('Phase II — Le Magnétisme du Marché (Netzach) : Le vendredi suivant, à l\'heure planétaire de Vénus.', 8, [160, 210, 160]);
  y += 3;
  addBody('Phase III — La Fixation et l\'Infrastructure (Malkuth) : Le samedi suivant, à l\'heure planétaire de la Terre/Saturne.', 8, [180, 140, 100]);

  y = p2c1 + 50;

  // 2. Préparation de l'Oratoire
  y += 4;
  addSectionTitle('2. PRÉPARATION DE L\'ORATOIRE');

  y += 3;
  drawCard(y, 40);
  const p2c2 = y;
  y += 4;

  addBody('Orientation : Face à l\'Est (Source de la Lumière et de l\'Émergence).', 8, [190, 200, 220]);
  y += 2;
  addBody('Couleurs Vibratoires : Or/Jaune safran (Tiphereth), Vert émeraude (Netzach), Noir et Or de la Terre (Malkuth).', 8, [190, 200, 220]);
  y += 2;
  addBody('Éléments sur l\'Autel : La Dague ou l\'Épée à droite (Geburah/Analyse stratégique), le Pentacle de Cire ou de Métal au centre (Malkuth/Ancrage), et le Bâton de commandement au sommet (Feu de la Volonté Pure).', 8, [190, 200, 220]);
  y += 2;
  addBody('Le document officiel de constitution de Khepra Experts (daté du 30 avril 2026) est placé sous le Pentacle central.', 8, [goldR, goldG, goldB]);

  y = p2c2 + 44;
  y += 6;

  addFooter(2);

  // ═══════════════════════════════════
  // PAGE 3 — PHASE I: TIPHERETH
  // ═══════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader();
  y = 16;

  addTitle('II. PHASE I : L\'OUVERTURE ET L\'ALIGNEMENT SOLAIRE', 13);
  y += 1;
  addTitle('(TIPHERETH)', 10);

  y += 4;
  addBody('Jour : Dimanche — Heure du Soleil — Fixation de la Vision Directrice', 8, [goldR, goldG, goldB]);

  y += 6;

  // 1. Le Bannissement Majeur
  addSectionTitle('1. LE BANNISSEMENT MAJEUR');

  y += 3;
  drawCard(y, 30);
  const p3c1 = y;
  y += 4;

  addBody('L\'opérateur fait face à l\'Est. Tenant la dague sacrée, il trace le Rituel Mineur du Pentagramme de la Terre (Bannissement) pour purifier l\'espace de toute interférence ou larve astrale nuisant aux affaires.', 8, [190, 200, 210]);

  y += 2;
  addBody('Il vibre aux quatre cardinaux :', 8, [goldR, goldG, goldB]);
  y += 1;
  addBody('YHVH (Est) — ADONAI (Midi) — EHEIEH (Ouest) — AGLA (Nord)', 9, [220, 220, 230]);

  y = p3c1 + 34;

  // 2. L'Éveil de la Couronne Solaire
  y += 6;
  addSectionTitle('2. L\'ÉVEIL DE LA COURONNE SOLAIRE');

  y += 3;
  drawCard(y, 80);
  const p3c2 = y;
  y += 4;

  addBody('Face à l\'Est, l\'opérateur lève le Bâton vers le ciel et récite l\'Invocation de la Sphère de l\'Harmonie :', 8, [190, 200, 210]);

  y += 3;

  addBody('"KADOSH, KADOSH, KADOSH. Par le Saint Nom YHVH ELOAH VA-DAATH, j\'ouvre les vannes du Soleil Central. Que la Lumière de Tiphereth descende sur mon Logos. J\'invoque l\'Archange RAPHAEL et les Intelligences de la Sphère Solaire."', 8, [goldR, goldG, goldB]);

  y += 2;

  addBody('"Regardez l\'Œuvre nommée KHEPRA EXPERTS, née au trentième jour du quatrième mois de l\'an 2026. Qu\'elle reçoive l\'alignement spirituel absolu. Que chaque conseil délivré par ce cabinet soit marqué du sceau de la vérité immuable, de la clarté et de la souveraineté. Que ma conscience soit le Soleil qui guide cette structure vers les sommets du Marché global."', 8, [goldR, goldG, goldB]);

  y += 2;

  addBody('L\'opérateur trace l\'Hexagramme d\'Invocation du Soleil dans l\'air au-dessus du document de l\'entreprise. Il vibre le mot sacré : AUMN.', 8, [190, 200, 210]);

  y = p3c2 + 84;
  y += 8;

  addDivider();
  addBody('Sceau de la Vérité Immuable · Clarté · Souveraineté', 7, [120, 120, 130]);

  addFooter(3);

  // ═══════════════════════════════════
  // PAGE 4 — PHASE II: NETZACH
  // ═══════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader();
  y = 16;

  addTitle('III. PHASE II : L\'ATTRACTION MAGNÉTIQUE DES MARCHÉS', 13);
  y += 1;
  addTitle('(NETZACH)', 10);

  y += 4;
  addBody('Jour : Vendredi — Heure de Vénus — Activation des Contrats et Alliances', 8, [160, 210, 160]);

  y += 6;

  // 1. L'Invocation de la Victoire
  addSectionTitle('1. L\'INVOCATION DE LA VICTOIRE (NETZACH)');

  y += 3;
  drawCard(y, 110);
  const p4c1 = y;
  y += 4;

  addBody('Face au Midi, l\'opérateur allume un encens de rose ou de santal. Il prend en main la Coupe d\'eau et trace l\'Hexagramme d\'Invocation de Vénus.', 8, [190, 200, 210]);

  y += 3;

  addBody('"Par le Nom Sacré YHVH TZABAOTH, Dieu des Armées Triomphantes, j\'éveille le pôle de la Victoire (Netzach) pour l\'étendre sur KHEPRA EXPERTS. J\'invoque l\'Archange HANIEL et les Principautés de la Sphère Verte."', 8, [160, 210, 160]);

  y += 2;

  addBody('"Éveillez le magnétisme irrésistible de cette firme ! Que les grands décideurs, les institutions étatiques et les corporations d\'envergure internationale soient magnétiquement attirés par l\'expertise de Khepra Experts."', 8, [160, 210, 160]);

  y += 2;

  addBody('"Par le lien d\'amour et de volonté (Agape / Thelema), je lie la volonté de mes partenaires d\'affaires : que le respect de leur parole et de leurs engagements contractuels soit une obligation absolue et inviolable, scellée dans l\'invisible avant d\'être signée dans la matière. La Victoire est mienne, le flux est continu."', 8, [160, 210, 160]);

  y = p4c1 + 114;

  // 2. La Formule Théurgique
  y += 6;
  addSectionTitle('2. LA FORMULE THÉURGIQUE D\'AUTORITÉ (93)');

  y += 3;
  drawCard(y, 32);
  const p4c2 = y;
  y += 4;

  addBody('L\'opérateur frappe l\'autel de son bâton à trois reprises et prononce à voix haute et vibrante les Mots de Passe de l\'Égrégore :', 8, [190, 200, 210]);

  y += 3;

  addBody('"THELEMA ! AGAPE ! KHAN !"', 10, [goldR, goldG, goldB]);

  y += 2;

  addBody('"Ma Volonté est Loi, mon Attraction est Force. Tout contrat initié sous ce ciel doit s\'accomplir dans la droiture et la prospérité mutuelle."', 8, [190, 200, 210]);

  y = p4c2 + 36;
  y += 8;

  addDivider();
  addBody('THELEMA · AGAPE · KHAN — Sceau du 93', 7, [120, 120, 130]);

  addFooter(4);

  // ═══════════════════════════════════
  // PAGE 5 — PHASE III: MALKUTH
  // ═══════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader();
  y = 16;

  addTitle('IV. PHASE III : LA CRISTALLISATION ET L\'ANCRAGE DU ROYAUME', 13);
  y += 1;
  addTitle('(MALKUTH)', 10);

  y += 4;
  addBody('Jour : Samedi — Heure de la Terre — Précipitations des Infrastructures et des Cash-Flows', 8, [180, 140, 100]);

  y += 4;
  addBody('Il s\'agit ici de l\'étape cruciale : figer l\'énergie des sphères supérieures dans le plan tridimensionnel pour acquérir l\'immeuble et bâtir le Hub.', 8, [190, 200, 210]);

  y += 6;

  // 1. L'Invocation du Royaume Tangible
  addSectionTitle('1. L\'INVOCATION DU ROYAUME TANGIBLE');

  y += 3;
  drawCard(y, 110);
  const p5c1 = y;
  y += 4;

  addBody('L\'opérateur pose ses deux mains à plat sur le Pentacle de Terre qui recouvre les documents de Khepra Experts. Il visualise des racines de lumière or et noire plonger profondément dans le sol.', 8, [190, 200, 210]);

  y += 3;
  addBody('"Par le Nom Souverain ADONAI HA-ARETZ, Seigneur de la Terre et de toute manifestation matérielle, je décrète la cristallisation immédiate des forces de Khepra Experts dans le monde physique. J\'invoque l\'Archange SANDALPHON et les Gardiens des Éléments."', 8, [180, 140, 100]);

  y += 2;
  addBody('"Commandez à la matière ! Je commande et j\'appelle la dotation, dans les plus brefs délais terrestres, d\'un Immeuble de Prestige, d\'une architecture digne et idéalement localisée, pour abriter la Direction Générale et le siège de mon œuvre. Que ce lieu devienne une forteresse d\'autorité et le pivot de mes activités."', 8, [180, 140, 100]);

  y += 2;
  addBody('"Par le tracé de la Croix et du Cercle, je consacre les Cash-Flows de Khepra Experts. Que l\'abondance financière y circule sans interruption, s\'accumulant et se démultipliant pour donner naissance aux autres sociétés et pôles d\'activités complémentaires. Que chaque franc, chaque ressource générée serve de fondation inébranlable pour l\'établissement final du HUB KHEPRA BUSINESSES."', 8, [180, 140, 100]);

  y = p5c1 + 114;

  // 2. La Clé du Grand Sceau
  y += 6;
  addSectionTitle('2. LA CLÉ DU GRAND SCEAU (L\'ANCRAGE)');

  y += 3;
  drawCard(y, 55);
  const p5c2 = y;
  y += 4;

  addBody('L\'opérateur prend l\'huile d\'onction ou un parfum de consécration et marque le document de l\'entreprise d\'un triangle pointé vers le haut (le Feu de la Volonté) inscrit dans un cercle (la Terre manifestée).', 8, [190, 200, 210]);

  y += 2;
  addBody('Il récite le Quatrain de la Maîtrise avec force :', 8, [goldR, goldG, goldB]);

  y += 3;

  addBody('SCIRE : Je sais concevoir la stratégie des Grands.', 9, [220, 220, 230]);
  addBody('VELLE : Je veux la manifestation de la Prospérité.', 9, [220, 220, 230]);
  addBody('AUDERE : J\'ose signer les marchés les plus puissants.', 9, [220, 220, 230]);
  addBody('TACERE : Je scelle le secret de cette réussite dans le silence de mon art.', 9, [220, 220, 230]);

  y = p5c2 + 59;

  addFooter(5);

  // ═══════════════════════════════════
  // PAGE 6 — CLÔTURE + SCEAU FINAL
  // ═══════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader();
  y = 16;

  addTitle('V. LA CLÔTURE ET LE RENVOI DES FORCES', 14);

  y += 6;

  drawCard(y, 75);
  const p6c1 = y;
  y += 4;

  addBody('L\'opérateur lève sa dague vers le ciel et prononce la formule de libération et de fixation :', 8, [190, 200, 210]);

  y += 3;

  addBody('"Que la paix soit entre nous et les sphères invisibles. Les forces de Tiphereth, de Netzach et de Malkuth sont désormais fixées au cœur de KHEPRA EXPERTS. L\'œuvre commencée le 30 avril 2026 est maintenant couronnée, magnétisée et matérialisée. Le HUB KHEPRA BUSINESSES est en marche. Rien ne peut entraver ce qui a été décrété par le Conclave des Maîtres."', 8, [goldR, goldG, goldB]);

  y += 2;

  addBody('L\'opérateur effectue le signe du Silence (le doigt sur les lèvres), éteint les bougies et range ses outils avec gravité. Le document de l\'entreprise doit rester enveloppé dans un tissu de soie or ou noire jusqu\'à la signature du prochain marché majeur ou l\'acquisition de l\'immeuble de direction.', 8, [190, 200, 210]);

  y = p6c1 + 79;

  // SCEAU FINAL
  y += 30;

  // Large gold frame
  doc.setDrawColor(goldR, goldG, goldB);
  doc.setLineWidth(1);
  const sealW = 100;
  const sealH = 52;
  const sealX = pageW / 2 - sealW / 2;
  doc.roundedRect(sealX, y, sealW, sealH, 4, 4, 'S');

  doc.setLineWidth(0.3);
  doc.roundedRect(sealX + 3, y + 3, sealW - 6, sealH - 6, 3, 3, 'S');

  const sealCY = y + sealH / 2;

  addTitle('א מ ן', 14);
  y = sealCY - 5;
  addTitle('SOUS LE SCEAU DU 93', 9);
  y = sealCY + 8;
  addTitle('C\'EST ACCOMPLI', 11);

  y = sealCY + 24;

  y += 14;
  addDivider();
  y += 2;
  addTitle('SCIRE · VELLE · AUDERE · TACERE', 8);
  y += 1;
  addTitle('KHEPRA EXPERTS — 30 AVRIL 2026', 9);

  // Bottom quote
  y += 10;
  addBody('"Que la Volonté guide la Stratégie, que la Stratégie captive le Marché,', 7, [140, 140, 150]);
  addBody('que le Marché finance le Royaume, et que le Royaume serve la Lumière."', 7, [140, 140, 150]);

  addFooter(6);

  // Save
  const dateSlug = new Date().toISOString().split('T')[0];
  doc.save(`Khepra_Rituel_Conclave_Maitres_Cosmiques_${dateSlug}.pdf`);
}