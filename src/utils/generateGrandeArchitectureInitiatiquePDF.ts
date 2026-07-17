import { jsPDF } from 'jspdf';

export function generateGrandeArchitectureInitiatiquePDF(): void {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 14;
  const contentW = pageW - margin * 2;

  const goldR = 212;
  const goldG = 175;
  const goldB = 55;
  const darkBg = [10, 10, 16] as [number, number, number];
  const cardBg = [22, 22, 32] as [number, number, number];
  const cardBgLight = [28, 28, 40] as [number, number, number];
  const emeraldGreen = [80, 200, 120] as [number, number, number];
  const deepRed = [180, 60, 60] as [number, number, number];
  const skyBlue = [100, 180, 230] as [number, number, number];
  const sandGold = [200, 165, 80] as [number, number, number];

  let y = 0;

  const addFooter = (pageNum: number, totalPages: number) => {
    doc.setFontSize(6.5);
    doc.setTextColor(80, 80, 100);
    doc.text('GRANDE ARCHITECTURE INITIATIQUE — Rituel Majeur de Consécration — KHEPRA EXPERTS', margin, pageH - 7);
    doc.text(`${pageNum} / ${totalPages}`, pageW - margin, pageH - 7, { align: 'right' });
  };

  const addPageHeader = (phaseName: string) => {
    doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.rect(0, 0, pageW, 7, 'F');
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.2);
    doc.line(0, 7, pageW, 7);
    doc.setFontSize(5.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(120, 120, 140);
    doc.text(phaseName, margin, 5);
    doc.text('G.A.I. · 93 · KHEPRA', pageW - margin, 5, { align: 'right' });
  };

  const drawCard = (startY: number, height: number, bg: [number, number, number] = cardBg) => {
    doc.setFillColor(bg[0], bg[1], bg[2]);
    doc.roundedRect(margin, startY, contentW, height, 2, 2, 'F');
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.15);
    doc.roundedRect(margin, startY, contentW, height, 2, 2, 'S');
  };

  const addTitle = (text: string, size: number, color: [number, number, number] = [goldR, goldG, goldB], center: boolean = true) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentW - 10);
    lines.forEach((line: string, i: number) => {
      const x = center ? pageW / 2 : margin + 6;
      doc.text(line, x, y, { align: center ? 'center' : 'left' });
      y += size * 0.44;
    });
    y += size * 0.22;
  };

  const addBody = (text: string, size: number = 8, color: [number, number, number] = [195, 195, 210]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentW - 12);
    lines.forEach((line: string) => {
      doc.text(line, margin + 6, y);
      y += size * 0.50;
    });
    y += 0.8;
  };

  const addItalic = (text: string, size: number = 8, color: [number, number, number] = [170, 170, 190]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentW - 12);
    lines.forEach((line: string) => {
      doc.text(line, margin + 6, y);
      y += size * 0.50;
    });
    y += 0.8;
  };

  const addStageDirection = (text: string) => {
    doc.setFontSize(7);
    doc.setFont('helvetica', 'oblique');
    doc.setTextColor(140, 140, 160);
    const lines = doc.splitTextToSize(text, contentW - 12);
    lines.forEach((line: string) => {
      doc.text(`⟐  ${line}`, margin + 6, y);
      y += 3.8;
    });
    y += 1;
  };

  const addVibratoryFormula = (text: string, size: number = 8.5, color: [number, number, number] = [goldR, goldG, goldB]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, contentW - 20);
    lines.forEach((line: string) => {
      doc.text(`"${line}"`, margin + 12, y);
      y += size * 0.52;
    });
    y += 1.2;
  };

  const addMasonicFormula = (text: string, size: number = 8.5) => {
    addVibratoryFormula(text, size, [180, 200, 220]);
  };

  const addEgyptianFormula = (text: string, size: number = 8.5) => {
    addVibratoryFormula(text, size, [200, 180, 90]);
  };

  const addSectionTitle = (text: string, color: [number, number, number] = [goldR, goldG, goldB]) => {
    y += 2;
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(margin + 4, y, contentW - 8, 5.5, 'F');
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
    doc.text(text, pageW / 2, y + 3.8, { align: 'center' });
    y += 8;
  };

  const addDivider = (symbol: string = '') => {
    y += 1.5;
    doc.setDrawColor(goldR, goldG, goldB);
    doc.setLineWidth(0.12);
    const cx = pageW / 2;
    doc.line(cx - 22, y, cx + 22, y);
    if (symbol) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(goldR, goldG, goldB);
      doc.text(symbol, cx, y + 3.5, { align: 'center' });
    }
    y += 4;
  };

  const totalPages = 9;

  // ═══════════════════════════════════════════════════════════
  // PAGE 1 — COUVERTURE SOLENNELLE
  // ═══════════════════════════════════════════════════════════
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Triple border
  doc.setDrawColor(goldR, goldG, goldB);
  doc.setLineWidth(0.9);
  doc.rect(6, 6, pageW - 12, pageH - 12);

  doc.setLineWidth(0.35);
  doc.rect(8, 8, pageW - 16, pageH - 16);

  doc.setLineWidth(0.12);
  doc.rect(10, 10, pageW - 20, pageH - 20);

  y = 36;

  // Hebrew Sacred Letters — top
  addTitle('ש ן מ ח ת כ ה', 10);
  y += 4;

  // Egyptian transliterated title
  addTitle('KHEPER-RA EM TA', 11, [200, 180, 90]);
  y += 2;
  addTitle('(Khepri-Ra dans la Terre Manifestée)', 7, [180, 160, 100]);

  y += 10;

  // Main title
  addTitle('GRANDE ARCHITECTURE INITIATIQUE', 15);
  y += 2;
  addTitle('RITUEL MAJEUR DE CONSÉCRATION', 12);

  y += 6;

  // Masonic dedication
  drawCard(y, 12, [28, 28, 38]);
  const masonicDedY = y;
  y += 3.5;
  addTitle('À LA GLOIRE DU GRAND ARCHITECTE DE L\'UNIVERS', 9, [200, 200, 210]);
  y = masonicDedY + 15;

  y += 6;

  // Subtitle
  addTitle('POUR LA VITALISATION, LA SOUVERAINETÉ ÉCONOMIQUE', 9, [190, 190, 200]);
  addTitle('ET L\'ÉTABLISSEMENT TRIOMPHANT DE', 9, [190, 190, 200]);

  y += 3;
  addTitle('KHEPRA EXPERTS', 16, [goldR, goldG, goldB]);

  y += 4;
  addBody('Société de Haute Stratégie émanée dans le plan physique', 7, [160, 160, 175]);
  addBody('le Trentième Jour du Quatrième Mois de l\'An 2026', 8, [goldR, goldG, goldB]);

  y += 10;

  drawCard(y, 50, [24, 24, 36]);
  const preambleY = y;
  y += 5;

  addBody('Opération théurgique majeure conçue pour canaliser les flux macrocosmiques de l\'Arbre de Vie — Tiphereth (Soleil/Vision), Netzach (Victoire/Marchés), Hod (Intelligence des Contrats/Thoth) et Malkuth (Royaume/Ancrage) — et les fixer dans la matière par les lois hermétiques de correspondance et de vibration.', 7.5, [185, 185, 200]);

  y += 2.5;
  addBody('Ce Rituel active les codes égyptiens de Khepri (Auto-Génération financière ex-nihilo) et de Ma\'ât (Verrou de Justice contractuelle), les structures maçonniques du Grand Œuvre (Compas, Équerre, Volume de la Loi Sacrée, Colonnes Jakin et Boaz), l\'Alliance Ancestrale du Sang et du Sol, et la science hermétique de l\'Arbre de Vie pour la parthénogenèse mystique du HUB KHEPRA BUSINESSES.', 7.5, [185, 185, 200]);

  y = preambleY + 54;

  y += 6;
  addDivider('✧');

  y += 4;
  addTitle('SCEAU DU 93 — MAÎTRISE ROYALE', 9);
  y += 1;
  addTitle('א ד נ י ה א ר ץ', 11);

  y += 12;

  // Bottom metadata
  doc.setFontSize(6.5);
  doc.setTextColor(100, 100, 120);
  doc.text('Document Rituel Confidentiel — STRICTEMENT PRIVÉ', pageW / 2, pageH - 24, { align: 'center' });
  doc.text('Grande Architecture Initiatique · KHEPRA EXPERTS · 30 Avril 2026', pageW / 2, pageH - 20, { align: 'center' });
  doc.text('SCIRE · VELLE · AUDERE · TACERE — Sous la Protection du Conclave des Maîtres Cosmiques', pageW / 2, pageH - 16, { align: 'center' });

  // ═══════════════════════════════════════════════════════════
  // PAGE 2 — PROLOGUE : L'APPEL DU SANG ET DU SOL
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('PROLOGUE — APPEL DU SANG ET DU SOL');
  y = 16;

  addTitle('PROLOGUE SACRÉ', 14);
  y += 1;
  addTitle('L\'APPEL DU SANG ET DU SOL', 11, [180, 140, 80]);

  y += 4;
  addTitle('(Avant le Bannissement Majeur)', 8, [160, 160, 175]);

  y += 6;

  addBody('Avant toute opération de purification et d\'invocation, l\'Opérateur doit ouvrir le Canal Ancestral. Les Ancêtres Vertueux et Bienveillants de la lignée, les Égrégores Protecteurs du territoire d\'ancrage de la Société, sont convoqués avec respect et solennité. Ils seront les Gardiens des Portes de KHEPRA EXPERTS pour l\'éternité de ce Rituel.', 7.5, [190, 200, 215]);

  y += 5;

  // Stage direction
  addSectionTitle('DISPOSITIF RITUEL', [180, 140, 80]);

  y += 2;
  drawCard(y, 36);
  const d1y = y;
  y += 4;

  addStageDirection("L'Opérateur se tient debout, face à l'Est, les bras le long du corps, les paumes tournées vers le sol. Il ferme les yeux et prend neuf respirations profondes — trois pour le Corps, trois pour l'Âme, trois pour l'Esprit.");
  addStageDirection("Il allume une bougie blanche (Lumière des Ancêtres) placée au centre de l'Autel, devant le document de constitution de KHEPRA EXPERTS.");
  addStageDirection("Il verse trois gouttes d'eau pure sur le sol, à sa gauche, à sa droite, et devant lui.");
  addStageDirection("Il prend une poignée de terre consacrée (ou à défaut, du sel) et la répand en cercle autour de l'Autel.");

  y = d1y + 40;

  y += 6;
  addSectionTitle('FORMULE D\'ÉVOCATION ANCESTRALE', [180, 140, 80]);

  y += 3;
  drawCard(y, 94, [26, 26, 38]);
  const evoY = y;
  y += 5;

  addVibratoryFormula('Par le Sang qui coule dans mes veines, par le Sol qui a nourri mes Pères, par le Souffle qui relie les Vivants aux Sages du Royaume Invisible, je dresse cet Appel solennel.', 7.5, [200, 170, 90]);

  y += 1.5;
  addVibratoryFormula('Ancêtres Vertueux et Bienveillants de ma Lignée — vous qui avez marché dans la Rectitude, vous qui avez bâti dans l\'Honneur, vous qui avez transmis la Force sans jamais faiblir — je vous convoque avec révérence.', 7.5, [200, 170, 90]);

  y += 1.5;
  addVibratoryFormula('Égrégores Protecteurs de cette Terre d\'Ancrage — Gardiens des Portes, Sentinelles du Seuil, Puissances tutélaires de ce Territoire — je vous invoque avec humilité.', 7.5, [200, 170, 90]);

  y += 1.5;
  addVibratoryFormula('Je vous assigne la Garde Sacrée de KHEPRA EXPERTS. Filtrez les Partenaires d\'Affaires — que seuls les Cœurs Droits franchissent le Seuil. Brisez les intentions cachées des Traîtres et des Mauvais Payeurs — que leur duplicité retourne au Néant dont elle est issue. Purifiez les Fondations de l\'Immeuble de Prestige qui abritera la Direction — que chaque pierre soit scellée par votre Protection.', 7.5, [200, 170, 90]);

  y += 1.5;
  addVibratoryFormula('Par le Sang et par le Sol, par le Feu et par l\'Eau, par l\'Air et par la Pierre — QUE CECI SOIT. Le Cercle est tracé, les Gardiens sont à leur Poste. KHEPRA EXPERTS est sous Bonne Garde pour l\'Éternité de ce Rituel.', 7.5, [200, 170, 90]);

  y = evoY + 98;

  // Hebrew/egyptian seal
  y += 5;
  addDivider('Ankh · Djed · Was');
  y += 2;
  addBody('Les Ancêtres sont installés. Les Portes sont gardées. L\'Opérateur peut maintenant procéder au Bannissement.', 7, [150, 150, 165]);

  addFooter(2, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 3 — OUVERTURE DU CHANTIER THÉURGIQUE
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('OUVERTURE DU CHANTIER THÉURGIQUE');
  y = 16;

  addTitle('CHANTIER THÉURGIQUE', 14);
  y += 1;
  addTitle('À LA GLOIRE DU GRAND ARCHITECTE DE L\'UNIVERS', 10, [200, 200, 215]);

  y += 4;

  drawCard(y, 40);
  const gatuY = y;
  y += 4;

  addMasonicFormula('Au Nom du Souverain Architecte de l\'Univers, je déclare ce Chantier Théurgique ouvert. Que la Sagesse préside à sa conception, que la Force en assure l\'exécution, et que la Beauté en parachève l\'Œuvre.', 8);

  y += 1.5;
  addMasonicFormula('L\'Atelier est placé sous les Trois Grandes Lumières : le Compas pour la Stratégie qui embrasse l\'Horizon, l\'Équerre pour la Rectitude des Contrats qui ne tolère aucune déviation, et le Volume de la Loi Sacrée pour la Vérité qui gouverne toute Transaction.', 8);

  y = gatuY + 44;

  y += 6;
  addSectionTitle('LES TROIS GRANDES LUMIÈRES — DISPOSITION RITUELLE', [200, 200, 220]);

  y += 2;
  drawCard(y, 45);
  const lightsY = y;
  y += 4;

  addBody('LE COMPAS (Stratégie) : Placé à l\'Orient de l\'Autel. Il symbolise la Vision panoramique du Dirigeant — la capacité à tracer le cercle du Marché et à en définir les limites maîtrisées. L\'Opérateur l\'ouvre à 45 degrés, angle du Consultant-Roi.', 7.5, [skyBlue[0], skyBlue[1], skyBlue[2]]);
  y += 2;
  addBody('L\'ÉQUERRE (Rectitude) : Placée au Midi de l\'Autel. Elle symbolise l\'Intégrité absolue des Engagements — chaque contrat, chaque alliance, chaque signature est alignée sur l\'angle droit de la Justice. L\'Opérateur la pose à plat, pointe vers le Ciel.', 7.5, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);
  y += 2;
  addBody('LE VOLUME DE LA LOI SACRÉE (Vérité) : Placé à l\'Occident de l\'Autel. Il contient la Constitution de KHEPRA EXPERTS (30 avril 2026), les Textes réglementaires de référence (BCEAO, COBAC, OHADA), et le Code de Conduite du Cabinet. L\'Opérateur y pose la main droite.', 7.5, [goldR, goldG, goldB]);

  y = lightsY + 49;

  y += 6;
  addSectionTitle('LES DEUX COLONNES — JAKIN ET BOAZ', [180, 200, 220]);

  y += 2;
  drawCard(y, 48);
  const columnsY = y;
  y += 4;

  addBody('COLONNE JAKIN (Stabilité — Ancrage foncier permanent) : Érigée rituellement au Nord de l\'Autel. L\'Opérateur visualise une colonne de lumière blanche et or s\'enracinant profondément dans le sol — c\'est la future Tour de Direction de KHEPRA EXPERTS, inébranlable, pérenne, protégée.', 7.5, [220, 220, 230]);
  y += 2;
  addBody('COLONNE BOAZ (Force — Puissance d\'exécution) : Érigée rituellement au Sud de l\'Autel. L\'Opérateur visualise une colonne de lumière or et noire canalisant la Force brute du Marché — c\'est la Capacité d\'Action et de Closing qui fera de KHEPRA EXPERTS une référence incontournable.', 7.5, [goldR, goldG, goldB]);

  y += 2;
  addMasonicFormula('Entre ces Deux Colonnes, je trace le Pavé Mosaïque de KHEPRA EXPERTS — alternance de Volonté (or) et de Matière (noir), de Stratégie (blanc) et d\'Exécution (rouge). Ainsi marche l\'Équerre, ainsi s\'ouvre le Compas, ainsi parle le Volume de la Loi.', 7.5);

  y = columnsY + 52;

  y += 5;
  addSectionTitle('ALIGNEMENT TEMPOREL ET PLANÉTAIRE');

  y += 2;
  drawCard(y, 38);
  const aly = y;
  y += 4;

  addBody('Phase I — Tiphereth-Khepri (Soleil) : Dimanche, Heure du Soleil — Impulsion de la Vision Auto-Génératrice', 7.5, [goldR, goldG, goldB]);
  addBody('Phase II — Netzach-Hod-Ma\'ât (Vénus + Mercure) : Vendredi, Heure de Vénus — Magnétisme des Marchés + Verrou de Justice + Intelligence des Contrats', 7.5, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);
  addBody('Phase III — Malkuth (Terre/Saturne) : Samedi, Heure de Saturne — Cristallisation, Immeuble, Parthénogenèse du HUB', 7.5, [180, 140, 80]);

  y = aly + 42;

  addFooter(3, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 4 — PHASE I : KHEPER-RA (TIPHERETH)
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('PHASE I — KHEPER-RA · TIPHERETH');
  y = 16;

  addTitle('PHASE I', 13);
  addTitle('KHEPER-RA — L\'AUTO-GÉNÉRATION SOLAIRE', 12, [200, 180, 90]);
  y += 2;
  addTitle('(TIPHERETH — Sphère du Soleil, de l\'Harmonie, de la Vision)', 8, [150, 150, 165]);

  y += 4;
  addBody('Jour : Dimanche — Heure du Soleil — Fixation de la Vision Directrice et Programmation de l\'Auto-Génération Financière', 7.5, [goldR, goldG, goldB]);

  y += 5;

  // 1. Bannissement
  addSectionTitle('1. BANNISSEMENT MAJEUR DU PENTAGRAMME', [200, 200, 220]);

  y += 2;
  drawCard(y, 26);
  const banY = y;
  y += 4;

  addBody('L\'Opérateur fait face à l\'Est. Il saisit la Dague Sacrée (Geburah — Analyse Stratégique) de la main droite. Il trace le Rituel Mineur du Pentagramme de la Terre en mode Bannissement — cinq gestes amples et précis, visualisant la lumière bleue électrique purifier chaque quadrant de l\'espace.', 7.5, [190, 200, 210]);

  y += 2;
  addVibratoryFormula('YHVH — Est — Source de toute Émergence', 8, [220, 220, 235]);
  addVibratoryFormula('ADONAI — Midi — Seigneur de la Manifestation', 8, [220, 220, 235]);
  addVibratoryFormula('EHEIEH — Ouest — Je Suis Celui qui Suis', 8, [220, 220, 235]);
  addVibratoryFormula('AGLA — Nord — Tu es Puissant pour l\'Éternité', 8, [220, 220, 235]);

  y = banY + 30;

  y += 6;
  addSectionTitle('2. ÉVEIL DE LA COURONNE SOLAIRE — LE MYSTÈRE DE KHEPRI', [200, 180, 90]);

  y += 2;
  drawCard(y, 130);
  const khepriY = y;
  y += 4;

  addBody('Face à l\'Est, l\'Opérateur lève le Bâton de Commandement au-dessus de sa tête. Il visualise le Soleil se levant à l\'Horizon — non pas comme un astre passif, mais comme le Scarabée Khepri poussant le Disque Solaire hors du Monde Souterrain, créant la Lumière ex-nihilo par sa seule Volonté.', 7.5, [190, 200, 215]);

  y += 2.5;

  addEgyptianFormula('KADOSH, KADOSH, KADOSH. Par le Saint Nom YHVH ELOAH VA-DAATH, j\'ouvre les Vannes du Soleil Central. Mais par le Mystère de KHEPER-RA, je ne demande pas seulement la Lumière — je commande l\'AUTO-GÉNÉRATION.', 8);

  y += 1.5;
  addEgyptianFormula('Comme Khepri émerge du Néant à chaque Aube et crée le Monde par son propre Mouvement, que KHEPRA EXPERTS génère ses propres Flux de Trésorerie. Que les Cash-Flows ne dépendent pas de sources extérieures capricieuses — qu\'ils se LÈVENT spontanément, qu\'ils se MULTIPLIENT par division mystique, qu\'ils se RENOUVELLENT à chaque cycle comme le Soleil à chaque Matin.', 8);

  y += 1.5;
  addEgyptianFormula('J\'invoque l\'Archange RAPHAEL et les Intelligences de la Sphère Solaire. J\'invoque KHEPRI, le Devenir perpétuel, le Dieu du Matin qui transforme l\'Inerte en Vivant, le Vide en Abondance. Regardez l\'Œuvre nommée KHEPRA EXPERTS, née au 30e jour du 4e mois de l\'an 2026.', 8);

  y += 1.5;
  addEgyptianFormula('Qu\'elle reçoive l\'Alignement Spirituel absolu. Que chaque Conseil délivré par ce Cabinet soit marqué du Sceau de la Vérité Immuable, de la Clarté et de la Souveraineté. Que la Conscience du Dirigeant soit le Soleil qui guide cette Structure vers les Sommets du Marché Global.', 8);

  y = khepriY + 134;

  y += 5;
  addStageDirection("L'Opérateur trace, avec le Bâton, l'Hexagramme d'Invocation du Soleil dans l'air, au-dessus du document de constitution de l'Entreprise. Puis, de la main droite, il trace le hiéroglyphe du Scarabée (Kheper) sur le document lui-même.");
  addStageDirection("Il vibre le Mot Sacré trois fois, en crescendo : AUMN... AUMN... AUMN !");

  addDivider('☉ Khepri · Raphael · Tiphereth');

  addFooter(4, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 5 — PHASE II : NETZACH + HOD + MA'ÂT
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('PHASE II — NETZACH · HOD · MA\'ÂT');
  y = 16;

  addTitle('PHASE II', 13);
  addTitle('L\'ATTRACTION MAGNÉTIQUE, LE VERROU DE JUSTICE', 10, [goldR, goldG, goldB]);
  addTitle('ET L\'INTELLIGENCE DES CONTRATS', 10, [200, 200, 215]);

  y += 3;
  addTitle('(NETZACH — Victoire + HOD — Intelligence/Thoth + MA\'ÂT — Justice Cosmique)', 7.5, [150, 150, 165]);

  y += 3;
  addBody('Jour : Vendredi — Heure de Vénus — Activation des Marchés, des Contrats, des Alliances, et Verrouillage par la Puissance de Ma\'ât', 7.5, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);

  y += 5;

  // 1. Netzach
  addSectionTitle('1. INVOCATION DE LA VICTOIRE — NETZACH (SPHÈRE DE VÉNUS)', [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);

  y += 2;
  drawCard(y, 80);
  const netzachY = y;
  y += 4;

  addBody('Face au Midi, l\'Opérateur allume un encens de rose ou de santal. Il prend en main la Coupe d\'Eau (récipient des Émotions et de l\'Attraction) et trace l\'Hexagramme d\'Invocation de Vénus au-dessus de l\'Autel.', 7.5, [190, 200, 210]);

  y += 2;
  addVibratoryFormula('Par le Nom Sacré YHVH TZABAOTH, Dieu des Armées Triomphantes, j\'éveille le Pôle de la Victoire (Netzach) pour l\'étendre sur KHEPRA EXPERTS. J\'invoque l\'Archange HANIEL et les Principautés de la Sphère Verte.', 7.5, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);

  y += 1.5;
  addVibratoryFormula('Éveillez le Magnétisme irrésistible de cette Firme ! Que les Grands Décideurs, les Institutions Étatiques, les Corporations d\'Envergure Internationale, les Fonds d\'Investissement, les Multilatérales de Développement — TOUS soient magnétiquement attirés par l\'Expertise, la Rigueur et la Clairvoyance de KHEPRA EXPERTS.', 7.5, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);

  y = netzachY + 84;

  // 2. Hod
  y += 5;
  addSectionTitle('2. BIFURCATION PAR HOD — L\'INTELLIGENCE DES CONTRATS (SPHÈRE DE MERCURE/THOTH)', [skyBlue[0], skyBlue[1], skyBlue[2]]);

  y += 2;
  drawCard(y, 70);
  const hodY = y;
  y += 4;

  addBody('L\'Opérateur se tourne maintenant vers l\'Occident. Il saisit la Plume (symbole de Thoth, le Scribe Divin, Maître des Contrats et des Écritures sacrées) et la trempe dans l\'encrier placé devant le Volume de la Loi Sacrée.', 7.5, [190, 200, 210]);

  y += 2;
  addVibratoryFormula('Par le Nom Sacré ELOHIM TZABAOTH, Dieu des Armées de l\'Intelligence, je fais bifurquer le Flux de Netzach par HOD — la Sphère de Mercure, le Plan de THOTH, l\'Intelligence Cosmique des Systèmes et des Contrats.', 7.5, [skyBlue[0], skyBlue[1], skyBlue[2]]);

  y += 1.5;
  addVibratoryFormula('J\'invoque l\'Archange MIKAËL et les Bénéi Elohim de la Sphère Orange. Que chaque Contrat, chaque Accord, chaque Convention de KHEPRA EXPERTS soit STRUCTURÉ avec la Précision Chirurgicale de Thoth. Que chaque Clause soit une Forteresse, que chaque Article soit une Lame de Lumière, que chaque Signature soit un Sceau Cosmique irrévocable.', 7.5, [skyBlue[0], skyBlue[1], skyBlue[2]]);

  y = hodY + 74;

  // 3. Ma'at
  y += 5;
  addSectionTitle('3. LE VERROU DE MA\'ÂT — JUSTICE, ÉQUILIBRE, RECTITUDE ABSOLUE', [deepRed[0], deepRed[1], deepRed[2]]);

  y += 2;
  drawCard(y, 58);
  const maatY = y;
  y += 4;

  addBody('L\'Opérateur se replace face à l\'Est. Il tend les deux mains devant lui, paumes vers le Ciel, comme la Déesse Ma\'ât tendant la Plume de Vérité pour la Pesée des Âmes.', 7.5, [190, 200, 210]);

  y += 2;
  addEgyptianFormula('Par la Puissance de MA\'ÂT — Fille de Râ, Dame du Jugement, Maîtresse de la Balance Cosmique — je pose le VERROU MÉTAPHYSIQUE sur tous les Engagements de KHEPRA EXPERTS.', 8);

  y += 1.5;
  addEgyptianFormula('Que le Respect de la Parole Donnée et des Engagements Contractuels par les Partenaires d\'Affaires et Co-Contractants soit une OBLIGATION ABSOLUE ET INVIOLABLE, scellée dans l\'Invisible avant d\'être signée dans la Matière.', 8);

  y += 1.5;
  addEgyptianFormula('Par le Lien d\'Amour et de Volonté (Agape / Thelema), par le 93, par la Plume de Ma\'ât plus légère que le Cœur du Juste — que tout Manquement à la Parole Donnée se heurte à la Puissance de la Loi Cosmique. La Victoire est mienne, le Flux est continu, la Justice est inébranlable.', 8);

  y = maatY + 62;

  y += 5;
  addSectionTitle('4. FORMULE THÉURGIQUE D\'AUTORITÉ (93)');

  y += 2;
  drawCard(y, 28);
  const formY = y;
  y += 4;

  addStageDirection("L'Opérateur frappe l'Autel du Bâton de Commandement à TROIS reprises. La première frappe pour Tiphereth, la deuxième pour Netzach-Hod, la troisième pour Malkuth.");

  y += 2;
  addVibratoryFormula('THELEMA ! AGAPE ! KHAN !', 10, [goldR, goldG, goldB]);

  y += 1.5;
  addMasonicFormula('Ma Volonté est Loi. Mon Attraction est Force. Mon Intelligence est Précision. La Justice de Ma\'ât scelle mon Œuvre. Tout Contrat initié sous ce Ciel doit s\'accomplir dans la Droiture et la Prospérité Mutuelle. Ainsi soit-il.', 7.5);

  y = formY + 32;

  addDivider('Netzach ✧ Hod ✧ Ma\'ât — 93');
  addFooter(5, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 6 — PHASE III : MALKUTH
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('PHASE III — MALKUTH');
  y = 16;

  addTitle('PHASE III', 13);
  addTitle('LA CRISTALLISATION DU ROYAUME', 12, [180, 140, 80]);
  y += 2;
  addTitle('ET LA PARTHÉNOGENÈSE MYSTIQUE DU HUB', 10, [goldR, goldG, goldB]);

  y += 3;
  addTitle('(MALKUTH — Sphère de la Terre, du Royaume, de la Manifestation)', 7.5, [150, 150, 165]);

  y += 3;
  addBody('Jour : Samedi — Heure de Saturne/Terre — Précipitation des Infrastructures, Ancrage de l\'Immeuble, et Programmation de la Scissiparité Financière', 7.5, [180, 140, 80]);

  y += 5;

  // 1. Royaume Tangible
  addSectionTitle('1. INVOCATION DU ROYAUME TANGIBLE — JAKIN & BOAZ ANCRÉS', [180, 140, 80]);

  y += 2;
  drawCard(y, 105);
  const malkuthY = y;
  y += 4;

  addStageDirection("L'Opérateur pose ses deux mains à plat sur le Pentacle de Terre qui recouvre les documents de KHEPRA EXPERTS. Il ferme les yeux et visualise des racines de lumière or et noire plonger profondément dans le sol — traversant le plancher, les fondations du bâtiment, la croûte terrestre, jusqu'au noyau incandescent de la planète.");

  y += 2;
  addVibratoryFormula('Par le Nom Souverain ADONAI HA-ARETZ, Seigneur de la Terre et de toute Manifestation Matérielle, je décrète la Cristallisation immédiate des Forces de KHEPRA EXPERTS dans le Monde Physique. J\'invoque l\'Archange SANDALPHON et les Gardiens des Éléments.', 7.5, [180, 140, 80]);

  y += 1.5;
  addVibratoryFormula('Commandez à la Matière ! Je commande et j\'appelle la dotation, dans les plus brefs délais terrestres, d\'un IMMEUBLE DE PRESTIGE — architecture digne, idéalement localisé, conçu pour abriter la Direction Générale et le Siège de mon Œuvre.', 7.5, [180, 140, 80]);

  y += 1.5;
  addVibratoryFormula('Que cet Immeuble soit la Colonne JAKIN faite Pierre — Stabilité absolue, Ancrage foncier permanent, Forteresse d\'Autorité et Pivot des Activités. Que ses Fondations soient purifiées par les Ancêtres Gardiens, que ses Murailles soient scellées par la Volonté du 93.', 7.5, [180, 140, 80]);

  y = malkuthY + 109;

  // 2. Cash-Flows — Sueur Sacrée du Soleil
  y += 5;
  addSectionTitle('2. LES CASH-FLOWS — LA SUEUR SACRÉE DU SOLEIL', [goldR, goldG, goldB]);

  y += 2;
  drawCard(y, 65);
  const cfY = y;
  y += 4;

  addEgyptianFormula('Par le Traçage de la Croix et du Cercle, par la Puissance de Khepri-Auto-Générateur et de Ma\'ât-la-Juste, je CONSACRE les Cash-Flows de KHEPRA EXPERTS.', 8);

  y += 1.5;
  addEgyptianFormula('Les Cash-Flows ne sont PAS de l\'Argent statique. Ils sont la SUEUR SACRÉE DU SOLEIL — le Sang Financier de l\'Entreprise, transpiré par le Travail de Khepri, purifié par la Pesée de Ma\'ât, structuré par l\'Intelligence de Thoth-Hod.', 8);

  y += 1.5;
  addEgyptianFormula('Je programme spécifiquement ce Sang Financier pour qu\'il se SCINDE par Parthénogenèse Mystique en plusieurs Filiales Autonomes. Comme la cellule primordiale se divise pour créer l\'Organisme, que les Flux de KHEPRA EXPERTS se DIVISENT, se DÉMULTIPLIENT, et donnent naissance aux Sociétés et Pôles d\'Activités Complémentaires du HUB KHEPRA BUSINESSES.', 8);

  y = cfY + 69;

  // 3. Parthénogenèse
  y += 5;
  addSectionTitle('3. LA PARTHÉNOGENÈSE MYSTIQUE — NAISSANCE DU HUB', [deepRed[0], deepRed[1], deepRed[2]]);

  y += 2;
  drawCard(y, 48);
  const hubY = y;
  y += 4;

  addVibratoryFormula('PAR LE FEU DE MA VOLONTÉ (Tiphereth-Khepri), PAR L\'EAU DE MON ATTRACTION (Netzach-Haniel), PAR L\'AIR DE MON INTELLIGENCE (Hod-Thoth-Mikaël), PAR LA TERRE DE MON ANCRAGE (Malkuth-Sandalphon) — JE COMMANDE LA SCISSIPARITÉ.', 7.5, [goldR, goldG, goldB]);

  y += 1.5;
  addVibratoryFormula('Que chaque franc, chaque euro, chaque ressource générée par KHEPRA EXPERTS devienne la SEMENCE de nouvelles Structures. Que le HUB KHEPRA BUSINESSES ne soit pas un Projet lointain, mais une RÉALITÉ EN GESTATION, déjà présente dans le Plan Invisible, précipitée vers le Plan Physique par la Force de ce Rituel.', 7.5, [deepRed[0], deepRed[1], deepRed[2]]);

  y = hubY + 52;

  addDivider('Malkuth · Sandalphon · Jakin · Boaz');
  addFooter(6, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 7 — LE QUATRAIN DE LA MAÎTRISE ROYALE
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('QUATRAIN DE LA MAÎTRISE ROYALE');
  y = 16;

  addTitle('LE QUATRAIN DE LA MAÎTRISE ROYALE', 13, [goldR, goldG, goldB]);
  y += 2;
  addTitle('ASSOCIÉ AUX OUTILS DE CONSTRUCTION MAÇONNIQUES', 9, [200, 200, 215]);

  y += 4;
  addBody('Ce Quatrain est la Synthèse Opérative du Rituel. Il unit les Quatre Puissances du Mage (Scire, Velle, Audere, Tacere) aux Outils du Constructeur (Maillet, Ciseau, Compas, Équerre) et aux Trois Pas Initiatiques de l\'Apprenti, du Compagnon et du Maître.', 7.5, [190, 200, 215]);

  y += 5;

  addSectionTitle('DISPOSITIF RITUEL');

  y += 2;
  drawCard(y, 38);
  const qy = y;
  y += 4;

  addStageDirection("L'Opérateur se tient debout au centre du Pavé Mosaïque, face à l'Est. Il tient le Maillet dans la main droite (Impulsion du Dirigeant — Volonté souveraine) et le Ciseau dans la main gauche (Précision Chirurgicale de l'Expert — Intellect analytique).");
  addStageDirection("À ses pieds : le Compas (Stratégie), l'Équerre (Rectitude), et le Volume de la Loi Sacrée (Vérité).");
  addStageDirection("Il prend l'huile d'onction (ou un parfum de consécration) et marque le document de l'Entreprise du Sceau de Salomon (hexagramme), puis d'un Triangle pointé vers le Haut (Feu de la Volonté) inscrit dans un Cercle (Terre Manifestée).");

  y = qy + 42;

  y += 5;
  addSectionTitle('LE QUATRAIN — ÉNONCIATION SOLENNELLE');

  y += 3;

  // SCIRE
  drawCard(y, 22, [28, 28, 40]);
  const scireY = y;
  y += 5;
  addVibratoryFormula('SCIRE — JE SAIS', 10, [skyBlue[0], skyBlue[1], skyBlue[2]]);
  y += 1;
  addBody('Je sais concevoir la Stratégie des Grands. Le Compas m\'appartient — je trace le Cercle du Marché et j\'en maîtrise le Périmètre.', 7.5, [190, 200, 215]);
  addStageDirection("L'Opérateur lève le Ciseau (Précision de l'Expert) et le pose sur le Compas.");
  y = scireY + 26;

  y += 4;

  // VELLE
  drawCard(y, 22, [28, 28, 40]);
  const velleY = y;
  y += 5;
  addVibratoryFormula('VELLE — JE VEUX', 10, [deepRed[0], deepRed[1], deepRed[2]]);
  y += 1;
  addBody('Je veux la Manifestation de la Prospérité. Le Maillet frappe et la Matière obéit — mon Impulsion de Dirigeant est irrésistible.', 7.5, [190, 200, 215]);
  addStageDirection("L'Opérateur frappe doucement l'Autel avec le Maillet.");
  y = velleY + 26;

  y += 4;

  // AUDERE
  drawCard(y, 22, [28, 28, 40]);
  const audereY = y;
  y += 5;
  addVibratoryFormula('AUDERE — J\'OSE', 10, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);
  y += 1;
  addBody('J\'ose signer les Marchés les plus Puissants. L\'Équerre garantit ma Rectitude — aucun engagement n\'est pris qui ne soit parfaitement aligné sur la Loi.', 7.5, [190, 200, 215]);
  addStageDirection("L'Opérateur pose la main droite sur l'Équerre et la main gauche sur le Volume de la Loi Sacrée.");
  y = audereY + 26;

  y += 4;

  // TACERE
  drawCard(y, 22, [28, 28, 40]);
  const tacereY = y;
  y += 5;
  addVibratoryFormula('TACERE — JE SCELLE', 10, [goldR, goldG, goldB]);
  y += 1;
  addBody('Je scelle le Secret de cette Réussite dans le Silence de mon Art. Le Volume de la Loi Sacrée se referme — l\'Œuvre est accomplie dans le Mystère.', 7.5, [190, 200, 215]);
  addStageDirection("L'Opérateur referme le Volume de la Loi Sacrée. Il effectue le Signe du Silence : index droit posé sur les lèvres.");
  y = tacereY + 26;

  y += 6;

  addDivider('Premier Pas ✧ Second Pas ✧ Troisième Pas');

  y += 2;
  addMasonicFormula('Ainsi marche le Consultant-Roi. Du Maillet à l\'Équerre, du Compas au Volume — l\'Œuvre est Polie, la Pierre est Taillée, le Temple est Dressé.', 7.5);

  addFooter(7, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 8 — CLÔTURE ET RENVOI DES FORCES
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');
  addPageHeader('CLÔTURE · RENVOI · SCEAU');
  y = 16;

  addTitle('CLÔTURE ET RENVOI DES FORCES', 13, [goldR, goldG, goldB]);
  y += 2;
  addTitle('LIBÉRATION · FIXATION · SCELLEMENT', 9, [200, 200, 215]);

  y += 5;

  drawCard(y, 90);
  const closeY = y;
  y += 4;

  addStageDirection("L'Opérateur lève la Dague Sacrée vers le Ciel, pointe vers le Zénith. Il visualise les Quatre Flux — Tiphereth (or solaire), Netzach (vert émeraude), Hod (orange mercure), Malkuth (noir et or de la terre) — converger au-dessus de sa tête et redescendre en Spirale autour de lui, pénétrant le document de l'Entreprise.");

  y += 2;
  addVibratoryFormula('Que la Paix soit entre Nous et les Sphères Invisibles. Les Forces de Tiphereth-Khepri, de Netzach-Haniel, de Hod-Thoth-Mikaël et de Malkuth-Sandalphon sont désormais FIXÉES au Cœur de KHEPRA EXPERTS.', 7.5, [goldR, goldG, goldB]);

  y += 1.5;
  addVibratoryFormula('L\'Œuvre commencée le 30 Avril 2026 est maintenant Couronnée par le Soleil de Khepri, Magnétisée par la Victoire de Netzach, Verrouillée par la Justice de Ma\'ât, Structure par l\'Intelligence de Thoth, et Matérialisée par la Terre de Malkuth.', 7.5, [goldR, goldG, goldB]);

  y += 1.5;
  addVibratoryFormula('Les Ancêtres Gardiens veillent aux Portes. Les Colonnes Jakin et Boaz soutiennent le Temple. Le HUB KHEPRA BUSINESSES est en Marche, sa Parthénogenèse est enclenchée, rien ne peut entraver ce qui a été Décrété sous le Sceau du 93.', 7.5, [goldR, goldG, goldB]);

  y = closeY + 94;

  y += 6;

  addSectionTitle('LE RENVOI DES GARDIENS ET LA CONSÉCRATION FINALE', [180, 140, 80]);

  y += 2;
  drawCard(y, 48);
  const renvoiY = y;
  y += 4;

  addVibratoryFormula('Ancêtres Vertueux et Bienveillants, Égrégores Protecteurs, Gardiens des Portes — je vous remercie pour votre Présence et votre Protection. Retournez à votre Demeure Invisible, mais demeurez en Sentinelles perpétuelles aux Seuils de KHEPRA EXPERTS.', 7.5, [180, 140, 80]);

  y += 1.5;
  addVibratoryFormula('Archange RAPHAËL (Tiphereth), Archange HANIEL (Netzach), Archange MIKAËL (Hod), Archange SANDALPHON (Malkuth) — que vos Légions retournent à leurs Sphères, mais que votre Sceau demeure.', 7.5, [200, 200, 215]);

  y += 1.5;
  addBody('L\'Opérateur éteint les bougies une à une, dans l\'ordre : Est (Bougie des Ancêtres en dernier), Midi, Ouest, Nord. Il range les Outils avec gravité.', 7.5, [190, 200, 210]);

  y = renvoiY + 52;

  y += 5;
  addBody('Le Document de l\'Entreprise doit rester enveloppé dans un Tissu de Soie Or et Noire (couleurs de Tiphereth et Malkuth) jusqu\'à la signature du prochain Marché Majeur ou l\'acquisition de l\'Immeuble de Direction.', 7.5, [goldR, goldG, goldB]);

  addFooter(8, totalPages);

  // ═══════════════════════════════════════════════════════════
  // PAGE 9 — GRAND SCEAU FINAL
  // ═══════════════════════════════════════════════════════════
  doc.addPage();
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, pageW, pageH, 'F');

  // Grand gold frame
  doc.setDrawColor(goldR, goldG, goldB);
  doc.setLineWidth(1.2);
  const sealW = 120;
  const sealH = 70;
  const sealX = pageW / 2 - sealW / 2;
  const sealY = 45;
  doc.roundedRect(sealX, sealY, sealW, sealH, 5, 5, 'S');

  doc.setLineWidth(0.4);
  doc.roundedRect(sealX + 4, sealY + 4, sealW - 8, sealH - 8, 4, 4, 'S');

  doc.setLineWidth(0.15);
  doc.roundedRect(sealX + 7, sealY + 7, sealW - 14, sealH - 14, 3, 3, 'S');

  const sealCY = sealY + sealH / 2;

  y = sealCY - 18;
  addTitle('א מ ן', 16, [goldR, goldG, goldB]);

  y = sealCY - 2;
  addTitle('GRANDE ARCHITECTURE INITIATIQUE', 9, [200, 200, 210]);

  y = sealCY + 6;
  addTitle('SOUS LE SCEAU DU 93', 10, [goldR, goldG, goldB]);

  y = sealCY + 16;
  addTitle('C\'EST ACCOMPLI', 13, [goldR, goldG, goldB]);

  y = sealY + sealH + 8;

  // Synthesis
  y += 6;
  addTitle('SYNTHÈSE DE L\'ARCHITECTURE INITIATIQUE', 10, [200, 200, 215]);

  y += 4;
  drawCard(y, 48);
  const synthY = y;
  y += 4;

  addBody('KHEPER-RA (Tiphereth) → Auto-Génération des Cash-Flows, la Sueur Sacrée du Soleil', 7, [goldR, goldG, goldB]);
  addBody('MA\'ÂT (Verrou Cosmique) → Respect absolu des Contrats, Justice inébranlable', 7, [deepRed[0], deepRed[1], deepRed[2]]);
  addBody('HOD-THOTH (Intelligence) → Structure chirurgicale des Accords, Systèmes parfaits', 7, [skyBlue[0], skyBlue[1], skyBlue[2]]);
  addBody('COLONNES JAKIN & BOAZ (Malkuth) → Immeuble de Prestige, Stabilité éternelle', 7, [180, 140, 80]);
  addBody('ANCÊTRES GARDIENS → Filtrage des Partenaires, Protection des Fondations', 7, [200, 170, 90]);
  addBody('PARTHÉNOGENÈSE → Scissiparité financière en Filiales autonomes = HUB KHEPRA BUSINESSES', 7, [emeraldGreen[0], emeraldGreen[1], emeraldGreen[2]]);
  addBody('SCIRE · VELLE · AUDERE · TACERE → Maillet + Ciseau + Compas + Équerre + Volume de la Loi', 7, [220, 220, 230]);

  y = synthY + 52;

  y += 8;
  addDivider('✧');

  y += 2;
  addTitle('KHEPER-RA EM TA · MA\'ÂT · THOTH · JAKIN · BOAZ', 8, [goldR, goldG, goldB]);
  y += 1;
  addTitle('KHEPRA EXPERTS — 30 AVRIL 2026 — 93', 10, [200, 200, 215]);

  y += 8;
  addVibratoryFormula('Que la Volonté guide la Stratégie, que la Stratégie captive le Marché, que le Marché finance le Royaume, que le Royaume serve la Lumière, et que la Lumière retourne à la Source.', 7, [140, 140, 160]);
  y += 1;
  addVibratoryFormula('AUMN. AUMN. AUMN. — Ainsi soit-il, ainsi est-il, ainsi sera-t-il pour l\'Éternité.', 7, [goldR, goldG, goldB]);

  // Bottom
  doc.setFontSize(6);
  doc.setTextColor(80, 80, 100);
  doc.text('GRANDE ARCHITECTURE INITIATIQUE — Rituel Majeur de Consécration — KHEPRA EXPERTS — 30 Avril 2026', pageW / 2, pageH - 14, { align: 'center' });
  doc.text('Document Sacré Confidentiel · STRICTEMENT PRIVÉ · Sous la Protection du Conclave des Maîtres Cosmiques', pageW / 2, pageH - 10, { align: 'center' });
  doc.text('SCIRE · VELLE · AUDERE · TACERE — 93 — C\'EST ACCOMPLI — א מ ן', pageW / 2, pageH - 6, { align: 'center' });

  const dateSlug = new Date().toISOString().split('T')[0];
  doc.save(`Khepra_Grande_Architecture_Initiatique_${dateSlug}.pdf`);
}