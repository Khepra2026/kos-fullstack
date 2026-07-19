import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageBreak, Header, Footer, PageNumber, convertInchesToTwip,
} from 'docx';

// ═══════════════════════════════════════════════════════════════
// PALETTE JUDICIAIRE — Ton réquisitoire
// ═══════════════════════════════════════════════════════════════
const NOIR = '0A0A0A', NOIR_MID = '1C1C1C', GRIS_FONCE = '2D2D2D',
  GRIS = '5A5A5A', GRIS_CLAIR = 'E8E8E8', BLANC = 'FFFFFF',
  ROUGE_SANG = '8B0000', ROUGE_MID = 'B22222', ROUGE_CLAIR = 'FDECEC',
  OR_JUDICIAIRE = '8B6914', OR_CLAIR = 'FDF6E3';

function sp(n = 1): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 20 })], spacing: { before: 0, after: n * 120 } });
}
function hr(color = NOIR_MID): Paragraph {
  return new Paragraph({ children: [new TextRun({ text: '', size: 4 })], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color } }, spacing: { before: 120, after: 120 } });
}
function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `  ${text}  `, bold: true, size: 28, color: BLANC, font: 'Times New Roman', allCaps: true })],
    shading: { type: ShadingType.SOLID, color: NOIR_MID, fill: NOIR_MID },
    spacing: { before: 400, after: 240 },
    indent: { left: convertInchesToTwip(0.1) },
    alignment: AlignmentType.LEFT,
  });
}
function h2(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 24, color: NOIR_MID, font: 'Times New Roman' })], border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: ROUGE_SANG } }, spacing: { before: 360, after: 200 } });
}
function h3(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' })], spacing: { before: 280, after: 160 } });
}
function h4(text: string): Paragraph {
  return new Paragraph({ children: [new TextRun({ text, bold: true, size: 20, color: GRIS_FONCE, font: 'Times New Roman' })], spacing: { before: 200, after: 120 } });
}
function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number; alignment?: AlignmentType }): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, size: opts?.size || 22, font: 'Times New Roman', bold: opts?.bold, italics: opts?.italic, color: opts?.color || NOIR })],
    spacing: { before: 80, after: 120 },
    alignment: opts?.alignment || AlignmentType.JUSTIFIED,
  });
}
function bullet(text: string, icon = '\u25B8'): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  `, bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }), new TextRun({ text, size: 22, font: 'Times New Roman', color: NOIR })],
    spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
  });
}
function box(text: string, color: string, bg: string, icon: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `${icon}  ${text}`, size: 20, font: 'Times New Roman', bold: true, color })],
    shading: { type: ShadingType.SOLID, color: bg, fill: bg },
    border: { left: { style: BorderStyle.SINGLE, size: 10, color } },
    indent: { left: convertInchesToTwip(0.25) }, spacing: { before: 200, after: 200 },
  });
}
const alertBox = (t: string) => box(t, ROUGE_SANG, ROUGE_CLAIR, '\u26A0');
const goldBox = (t: string) => box(t, OR_JUDICIAIRE, OR_CLAIR, '\u2605');
const dangerBox = (t: string) => box(t, ROUGE_SANG, ROUGE_CLAIR, '\u2717');

function tbl(headers: string[], rows: string[][], colWidths?: number[]): Table {
  const n = headers.length;
  let w = colWidths ? [...colWidths] : headers.map(() => Math.floor(100 / n));
  if (w.length < n) { const sum = w.reduce((a, b) => a + (b || 0), 0); const rem = Math.max(100 - sum, 0); const avg = Math.floor(rem / (n - w.length)); while (w.length < n) w.push(avg > 0 ? avg : Math.floor(100 / n)); }
  if (w.length > n) w = w.slice(0, n);
  w = w.map(v => (v === undefined || v === null || Number.isNaN(v)) ? Math.floor(100 / n) : v);
  const normalized = rows.map(r => { if (r.length < n) return [...r, ...Array(n - r.length).fill('')]; if (r.length > n) return r.slice(0, n); return r; });
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map(h => new TableCell({
      shading: { type: ShadingType.SOLID, color: NOIR_MID, fill: NOIR_MID },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, color: BLANC, font: 'Times New Roman' })], alignment: AlignmentType.CENTER })],
    })),
  });
  const dataRows = normalized.map((row, ri) => new TableRow({
    children: row.map((cell, ci) => new TableCell({
      shading: { type: ShadingType.SOLID, color: ri % 2 === 0 ? BLANC : GRIS_CLAIR, fill: ri % 2 === 0 ? BLANC : GRIS_CLAIR },
      margins: { top: 100, bottom: 100, left: 140, right: 140 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: 'Times New Roman', color: NOIR, bold: ci === 0 })], alignment: ci === 0 ? AlignmentType.LEFT : AlignmentType.LEFT })],
    })),
  }));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: w.map(v => `${v}%`),
    rows: [headerRow, ...dataRows],
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: 'A0A0A0' },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: 'A0A0A0' },
      left: { style: BorderStyle.SINGLE, size: 1, color: 'A0A0A0' },
      right: { style: BorderStyle.SINGLE, size: 1, color: 'A0A0A0' },
      insideH: { style: BorderStyle.SINGLE, size: 1, color: 'C0C0C0' },
      insideV: { style: BorderStyle.SINGLE, size: 1, color: 'C0C0C0' },
    },
  });
}

function pb(): Paragraph { return new Paragraph({ children: [new PageBreak()] }); }

// ═══════════════════════════════════════════════════════════════
// PAGE DE GARDE
// ═══════════════════════════════════════════════════════════════
function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({ children: [new TextRun({ text: '', size: 4 })], shading: { type: ShadingType.SOLID, color: NOIR, fill: NOIR }, spacing: { before: 0, after: 0 } }),
    sp(3),
    new Paragraph({
      children: [new TextRun({ text: 'COLLEGE D\u2019AVOCATS', bold: true, size: 28, color: GRIS, font: 'Times New Roman', allCaps: true, characterSpacing: 60 })],
      alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Litiges \u00E0 Haut Risque', size: 24, color: ROUGE_SANG, font: 'Times New Roman', italics: true, allCaps: true, characterSpacing: 40 })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 },
    }),
    hr(ROUGE_SANG),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'CONCLUSIONS D\u2019APPEL', bold: true, size: 48, color: BLANC, font: 'Times New Roman', allCaps: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 400, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'En demande de condamnation exemplaire', bold: true, size: 26, color: ROUGE_SANG, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'de 300.000.000 FCFA', bold: true, size: 36, color: ROUGE_SANG, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 200 },
    }),
    hr(NOIR_MID),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Affaire :', bold: true, size: 22, color: GRIS, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'M. SIMDA Essoyom\u00E8w\u00E8', bold: true, size: 26, color: BLANC, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'c/', size: 22, color: GRIS, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'AMIFA HOLDING', bold: true, size: 26, color: ROUGE_SANG, font: 'Times New Roman' })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: '(Groupe Banque Centrale Populaire)', size: 20, color: GRIS, font: 'Times New Roman', italics: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 300 },
    }),
    hr(ROUGE_SANG),
    sp(1),
    tbl(
      ['Qualit\u00E9', 'Classification'],
      [['Conclusions d\u2019appel en indemnisation int\u00E9grale', 'CONFIDENTIEL \u2014 STRATEGIQUE \u2014 STRICTEMENT PRIV\u00C9']],
      [60, 40]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Objet : Rupture vexatoire, destruction de la marque professionnelle, an\u00E9antissement de carri\u00E8re, et pr\u00E9judice r\u00E9putationnel irr\u00E9versible', size: 20, color: GRIS, font: 'Times New Roman', italics: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Angle strat\u00E9gique : L\u2019ex\u00E9cution sociale et professionnelle', size: 18, color: ROUGE_SANG, font: 'Times New Roman', bold: true, allCaps: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 },
    }),
    sp(3),
    new Paragraph({
      children: [new TextRun({ text: 'Document soumis \u00E0 un accord de confidentialit\u00E9 absolu. Toute divulgation, reproduction, ou communication \u00E0 tiers est interdite sous peine de poursuites disciplinaires et p\u00E9nales.', size: 16, color: '666666', font: 'Times New Roman', italics: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 400, after: 0 },
    }),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// INTRODUCTION — R\u00E9quisitoire strat\u00E9gique
// ═══════════════════════════════════════════════════════════════
function introduction(): (Paragraph | Table)[] {
  return [
    h1('INTRODUCTION — REQUISITOIRE STRATEGIQUE'),
    sp(),
    body('Monsieur le Pr\u00E9sident, Mesdames et Messieurs les Magistrats de la Cour d\u2019Appel,', { bold: true }),
    sp(),
    body('Ce que la soci\u00E9t\u00E9 AMIFA HOLDING \u2014 puissant holding du Groupe Banque Centrale Populaire \u2014 a commis \u00E0 l\u2019encontre de M. SIMDA Essoyom\u00E8w\u00E8 ne rel\u00E8ve pas de la simple irr\u00E9gularit\u00E9 contractuelle. Ce n\u2019est pas une erreur de gestion des ressources humaines. Ce n\u2019est m\u00EAme pas un licenciement abusif au sens classique du terme.'),
    sp(),
    body('C\u2019est une \u00AB ex\u00E9cution sociale et professionnelle \u00BB.', { bold: true, italic: true, color: ROUGE_SANG }),
    sp(),
    body('AMIFA HOLDING a utilis\u00E9 le silence, l\u2019abandon, et la coupure brutale des outils de travail pour cr\u00E9er une \u00AB zone d\u2019ombre \u00BB autour du d\u00E9part de M. SIMDA. Dans le milieu ultra-ferm\u00E9 de la haute finance et de la microfinance africaine \u2014 o\u00F9 la r\u00E9putation est le seul capital mobilisable \u2014 cette zone d\u2019ombre \u00E9quivaut \u00E0 une sentence de mort professionnelle.'),
    sp(),
    body('La Cour de premi\u00E8re instance a condamn\u00E9 AMIFA \u00E0 verser la somme de 10.000.000 FCFA. Dix millions de francs CFA. Nous allons d\u00E9montrer que cette indemnit\u00E9 n\u2019est pas seulement insuffisante : elle est une insulte \u00E0 la carri\u00E8re d\u2019un dirigeant, une n\u00E9gation du pr\u00E9judice subi, et une impunit\u00E9 d\u00E9guis\u00E9e pour un groupe financier qui a d\u00E9lib\u00E9r\u00E9ment sacrifi\u00E9 un homme pour pr\u00E9server ses int\u00E9r\u00EAts strat\u00E9giques.'),
    sp(),
    dangerBox('Dix millions de FCFA ne couvrent m\u00EAme pas les frais de r\u00E9installation familiale d\u2019un ancien Directeur G\u00E9n\u00E9ral de groupe international. Ils ne compensent pas une semaine de salaire d\u2019un DG de premier plan. Et ils ne r\u00E9parent en aucune mani\u00E8re la destruction irr\u00E9versible d\u2019une r\u00E9putation b\u00E2tie sur quinze ann\u00E9es d\u2019excellence.'),
    sp(),
    body('Dans les conclusions qui suivent, nous d\u00E9montrerons que le comportement d\u2019AMIFA n\u2019a pas seulement rompu un contrat : il a d\u00E9truit un actif intangible de la plus haute valeur \u2014 la r\u00E9putation professionnelle de M. SIMDA \u2014 et l\u2019a condamn\u00E9 \u00E0 une mort professionnelle qui persiste encore aujourd\u2019hui.'),
    sp(),
    goldBox('L\u2019objet de la pr\u00E9sente instance n\u2019est plus le licenciement. L\u2019objet est la r\u00E9paration int\u00E9grale d\u2019une destruction volontaire et calcul\u00E9e de l\u2019existence professionnelle d\u2019un homme.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION I — AN\u00C9ANTISSEMENT DE LA \u00AB MARQUE PERSONNELLE \u00BB
// ═══════════════════════════════════════════════════════════════
function section1(): (Paragraph | Table)[] {
  return [
    h1('I. L\u2019AN\u00C9ANTISSEMENT DE LA \u00AB MARQUE PERSONNELLE \u00BB ET LA SUSPICION G\u00C9N\u00C9RALIS\u00C9E'),
    sp(),
    h2('I.1 Le m\u00E9canisme du soup\u00E7on : la fatalit\u00E9 d\u2019une disparition inexpliqu\u00E9e'),
    sp(),
    body('Dans le milieu de la haute finance et de la microfinance africaine \u2014 un univers particuli\u00E8rement ferm\u00E9, quasi-clanique, o\u00F9 les r\u00E9seaux de confiance conditionnent chaque nomination \u2014 un Directeur G\u00E9n\u00E9ral qui \u00AB dispara\u00EEt \u00BB du jour au lendemain sans affectation promise est imm\u00E9diatement suspect\u00E9.'),
    sp(),
    body('La soci\u00E9t\u00E9 AMIFA, par son silence absolu et son abandon total de M. SIMDA, a sciemment laiss\u00E9 se r\u00E9pandre l\u2019hypoth\u00E8se implicite d\u2019une faute grave, d\u2019une probit\u00E9 douteuse, ou d\u2019une incomp\u00E9tence av\u00E9r\u00E9e. Elle n\u2019a jamais r\u00E9dig\u00E9 de lettre de d\u00E9part honorant quinze ann\u00E9es de service. Elle n\u2019a jamais communiqu\u00E9 aupr\u00E8s de ses partenaires institutionnels, de la COBAC, ou du r\u00E9seau professionnel pour pr\u00E9server l\u2019honneur de son ancien dirigeant. Elle a laiss\u00E9 le vide se remplir de rumeurs.'),
    sp(),
    alertBox('Le vide l\u00E9gal est le terreau de la suspicion. AMIFA a sciemment entretenu ce vide. Le non-respect de l\u2019article 5 de la convention \u2014 qui pr\u00E9voyait une affectation alternative en cas de rupture \u2014 n\u2019est pas une n\u00E9gligence. C\u2019est un acte de communication non-verbale d\u00E9lib\u00E9r\u00E9, signifiant implicitement : \u00AB cet homme est indigne d\u2019une nouvelle confiance \u00BB.'),
    sp(),
    h2('I.2 Le verrouillage sectoriel : la mort professionnelle d\u00E9cr\u00E9t\u00E9e'),
    sp(),
    body('Monsieur le Pr\u00E9sident, il convient de comprendre la r\u00E9alit\u00E9 concr\u00E8te de ce pr\u00E9judice. M. SIMDA n\u2019est pas un employ\u00E9 lambda. Il est un expert reconnu de la r\u00E9glementation financi\u00E8re africaine, d\u00E9tenteur d\u2019un agr\u00E9ment COBAC obtenu dans des conditions exigeantes, auteur de la transformation structurelle d\u2019AMIFA Gabon.'),
    sp(),
    body('Malgr\u00E9 cette expertise unique \u2014 malgr\u00E9 l\u2019obtention de l\u2019agrément COBAC, malgr\u00E9 les r\u00E9sultats probants d\u2019AMIFA Gabon sous sa direction \u2014 M. SIMDA est aujourd\u2019hui frapp\u00E9 d\u2019une \u00AB mort professionnelle \u00BB dans le secteur de la microfinance.'),
    sp(),
    body('La suspicion instill\u00E9e par le silence calcul\u00E9 d\u2019AMIFA l\u2019emp\u00EAche de d\u00E9crocher un mandat de Directeur G\u00E9n\u00E9ral, m\u00EAme dans la zone UEMOA o\u00F9 sa connaissance des textes BCEAO est incontest\u00E9e. Il ne peut plus pr\u00E9sider un Conseil d\u2019Administration. Il ne peut plus si\u00E9ger dans un comit\u00E9 d\u2019agr\u00E9ment. La porte de la haute direction financi\u00E8re africaine lui est ferm\u00E9e, non pas par manque de comp\u00E9tence, mais parce qu\u2019AMIFA a d\u00E9truit sa marque personnelle.'),
    sp(),
    tbl(
      ['Dimension', 'Avant AMIFA', 'Apr\u00E8s AMIFA'],
      [
        ['Statut professionnel', 'Directeur G\u00E9n\u00E9ral de groupe international (AMIFA Gabon)', 'Consultant isol\u00E9, sans mandat de direction'],
        ['Acc\u00E8s au r\u00E9seau institutionnel', 'Relations directes avec COBAC, BDEAC, partenaires institutionnels', 'Exclusion implicite, reluque suspecte'],
        ['Cr\u00E9dibilit\u00E9 pour un nouvel agr\u00E9ment', 'Agr\u00E9ment COBAC obtenu, r\u00E9f\u00E9rence bancaire solide', 'Suspicion g\u00E9n\u00E9ralis\u00E9e, r\u00E9putation entach\u00E9e'],
        ['Capacit\u00E9 de mobilisation professionnelle', 'DG recherch\u00E9, profil premium sur le march\u00E9 africain', 'Profil invisibilis\u00E9, candidatures ignor\u00E9es'],
        ['Niveau de r\u00E9mun\u00E9ration vis\u00E9', '4\u20138M FCFA mensuels + packages dirigeants', 'Consultant PNUD, r\u00E9mun\u00E9ration inf\u00E9rieure au statut pr\u00E9c\u00E9dent'],
      ],
      [22, 39, 39]
    ),
    sp(),
    h2('I.3 Le changement d\u2019environnement subi : de l\u2019exil au d\u00E9classement'),
    sp(),
    body('Monsieur le Pr\u00E9sident, le passage du statut de Directeur G\u00E9n\u00E9ral de groupe international \u2014 avec autorit\u00E9 de signature, budget op\u00E9rationnel, et repr\u00E9sentation institutionnelle \u2014 \u00E0 celui de consultant individuel au PNUD n\u2019est pas un choix de carri\u00E8re. C\u2019est un exil professionnel impos\u00E9.'),
    sp(),
    body('Ce d\u00E9classement brutal est la preuve mat\u00E9rielle d\u2019une perte de r\u00E9putation irr\u00E9versible. On ne quitte pas volontairement une direction g\u00E9n\u00E9rale pour devenir consultant isol\u00E9 lorsqu\u2019on a obtenu l\u2019agrément COBAC, structur\u00E9 une filiale, et produit des r\u00E9sultats probants. On y est contraint parce que le march\u00E9 vous a ferm\u00E9 ses portes.'),
    sp(),
    body('Ce d\u00E9classement a des cons\u00E9quences mat\u00E9rielles dramatiques : perte de revenus sur quinze ann\u00E9es, impossibilit\u00E9 de reconstruire un patrimoine, r\u00E9duction du train de vie familial, et \u2014 ce qui est le plus lourd \u2014 l\u2019effondrement du statut social et de l\u2019estime de soi d\u2019un homme qui avait consacr\u00E9 son existence \u00E0 l\u2019excellence professionnelle.'),
    sp(),
    dangerBox('Le d\u00E9classement professionnel n\u2019est pas un pr\u00E9judice moral abstrait. C\u2019est un pr\u00E9judice \u00E9conomique chiffrable, un pr\u00E9judice social mesurable, et un pr\u00E9judice existentiel dont M. SIMDA subira les effets jusqu\u2019\u00E0 la fin de sa vie active.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION II — LA DUPLICIT\u00C9 DU GROUPE
// ═══════════════════════════════════════════════════════════════
function section2(): (Paragraph | Table)[] {
  return [
    h1('II. LA DUPLICIT\u00C9 DU GROUPE : \u00AB L\u2019USAGE, PUIS LE REJET \u00BB'),
    sp(),
    h2('II.1 L\u2019artisan du succ\u00E8s d\u00E9lib\u00E9r\u00E9ment sacrifi\u00E9'),
    sp(),
    body('M. SIMDA n\u2019a pas \u00E9t\u00E9 un simple salari\u00E9 d\u2019AMIFA. Il en a \u00E9t\u00E9 l\u2019artisan du succ\u00E8s strat\u00E9gique. C\u2019est sous sa direction qu\u2019AMIFA Gabon a obtenu l\u2019agrément COBAC \u2014 agr\u00E9ment pr\u00E9alable indispensable \u00E0 toute activit\u00E9 de microfinance dans la zone CEMAC. C\u2019est lui qui a structur\u00E9 la filiale, qui a n\u00E9goci\u00E9 avec les r\u00E9gulateurs, qui a constitu\u00E9 l\u2019\u00E9quipe, et qui a lanc\u00E9 les op\u00E9rations.'),
    sp(),
    body('La valeur cr\u00E9e\u00E9e par M. SIMDA pour AMIFA HOLDING est immensurable :'),
    bullet('Obtention de l\u2019agrément COBAC pour AMIFA Gabon \u2014 ticket d\u2019entr\u00E9e dans la zone CEMAC'),
    bullet('Mise en conformit\u00E9 prudentielle compl\u00E8te de la filiale avec les exigences r\u00E9glementaires'),
    bullet('Structuration du dispositif de gouvernance, du contr\u00F4le interne, et des politiques de gestion des risques'),
    bullet('Installation de la cr\u00E9dibilit\u00E9 institutionnelle d\u2019AMIFA aupr\u00E8s des partenaires gabonais et r\u00E9gulateurs'),
    bullet('Premiers r\u00E9sultats op\u00E9rationnels probants, d\u00E9montrant la viabilit\u00E9 du mod\u00E8le dans la zone CEMAC'),
    sp(),
    body('Une fois cette valeur cr\u00E9e\u00E9e \u2014 une fois l\u2019agrément obtenu, une fois la filiale op\u00E9rationnelle, une fois le risque r\u00E9glementaire ma\u00EEtris\u00E9 \u2014 le Groupe AMIFA a d\u00E9lib\u00E9r\u00E9ment abandonn\u00E9 son artisan.'),
    sp(),
    alertBox('Le sch\u00E9ma est clair : utiliser l\u2019expertise unique de M. SIMDA pour franchir les barri\u00E8res r\u00E9glementaires les plus exigeantes, puis l\u2019\u00E9carter une fois l\u2019objectif atteint. Ce n\u2019est pas une gestion des ressources humaines : c\u2019est une strat\u00E9gie d\u2019extraction de valeur suivie d\u2019une mise au rebut.'),
    sp(),
    h2('II.2 L\u2019abandon comme man\u0153uvre d\u00E9loyale'),
    sp(),
    body('L\u2019article 5 de la convention entre les parties pr\u00E9voyait express\u00E9ment une affectation alternative en cas de rupture des relations de travail. Cette clause n\u2019\u00E9tait pas une clause de style : elle refl\u00E9tait la r\u00E9alit\u00E9 qu\u2019un dirigeant de ce niveau ne peut pas \u00EAtre simplement \u00AB lib\u00E9r\u00E9 \u00BB sur le march\u00E9. Sa valeur r\u00E9side dans sa place dans le groupe. AMIFA l\u2019a sciemment priv\u00E9 de cette place.'),
    sp(),
    body('Cet abandon est une man\u0153uvre d\u00E9loyale \u00E0 trois dimensions :'),
    sp(),
    h3('a) Dimension contractuelle'),
    body('AMIFA a viol\u00E9 son engagement contractuel de mobilit\u00E9. Elle n\u2019a propos\u00E9 aucune affectation alternative. Elle n\u2019a m\u00EAme pas engag\u00E9 de discussion sur les modalit\u00E9s de reclassement. Le silence a remplac\u00E9 la n\u00E9gociation.'),
    sp(),
    h3('b) Dimension strat\u00E9gique'),
    body('AMIFA a refus\u00E9 de payer le prix r\u00E9el d\u2019un cadre de ce niveau. Un DG avec agr\u00E9ment COBAC et exp\u00E9rience de groupe international repr\u00E9sente une valeur strat\u00E9gique de plusieurs centaines de millions de FCFA. AMIFA a pr\u00E9f\u00E9r\u00E9 le licenciement au paiement de cette valeur.'),
    sp(),
    h3('c) Dimension r\u00E9putationnelle'),
    body('AMIFA a laiss\u00E9 M. SIMDA partir sans lettre de recommandation, sans communication de d\u00E9part, sans pr\u00E9servation de son image. Dans un secteur o\u00F9 la confiance est tout, cette absence de protection est un acte de destruction volontaire.'),
    sp(),
    dangerBox('AMIFA n\u2019a pas seulement rompu un contrat. Elle a mis en \u0153uvre une strat\u00E9gie de d\u00E9classement social calcul\u00E9e : utiliser l\u2019homme, cr\u00E9er la d\u00E9pendance, puis le jeter sans \u00E9gard pour les engagements pris ni pour l\u2019avenir qu\u2019elle d\u00E9truisait.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION III — LA R\u00C9PARATION INT\u00C9GRALE DU PR\u00C9JUDICE
// ═══════════════════════════════════════════════════════════════
function section3(): (Paragraph | Table)[] {
  return [
    h1('III. LA R\u00C9PARATION INT\u00C9GRALE DU PR\u00C9JUDICE — LE CHEMIN VERS LES 300 MILLIONS FCFA'),
    sp(),
    body('Monsieur le Pr\u00E9sident, l\u2019indemnit\u00E9 de 10.000.000 FCFA octroy\u00E9e par la juridiction de premi\u00E8re instance est non seulement inad\u00E9quate : elle est juridiquement insuffisante au regard des pr\u00E9judices subis. Nous allons d\u00E9montrer que la somme de 300.000.000 FCFA correspond \u00E0 une r\u00E9paration \u00E9quitable, proportionn\u00E9e, et n\u00E9cessaire.'),
    sp(),
    h2('III.1 Pr\u00E9judice de carri\u00E8re (Lucrum Cessans)'),
    sp(),
    body('Le pr\u00E9judice de carri\u00E8re \u2014 ou lucrum cessans \u2014 correspond \u00E0 la perte des revenus que M. SIMDA aurait per\u00E7us si AMIFA avait respect\u00E9 ses engagements contractuels et saisi les opportunit\u00E9s de mobilit\u00E9.'),
    sp(),
    h3('a) Base de calcul'),
    body('Avant son licenciement, M. SIMDA occupait la fonction de Directeur G\u00E9n\u00E9ral d\u2019AMIFA Gabon. Dans le secteur de la microfinance internationale en Afrique centrale et de l\u2019Ouest, la r\u00E9mun\u00E9ration d\u2019un DG de groupe avec agr\u00E9ment COBAC se situe entre 4.000.000 et 8.000.000 FCFA mensuels, hors avantages en nature et packages dirigeants (v\u00E9hicule, logement, assurance sant\u00E9 internationale, bonus de performance).'),
    sp(),
    h3('b) Horizon de perte'),
    body('L\u2019\u00E2ge de M. SIMDA et la dur\u00E9e de carri\u00E8re restante justifient une \u00E9valuation sur une p\u00E9riode de 10 ans minimum. Le secteur bancaire et microfinancier africain pr\u00E9sente une long\u00E9vit\u00E9 de carri\u00E8re particuli\u00E8rement \u00E9lev\u00E9e pour les dirigeants agr\u00E9\u00E9s, dont l\u2019expertise r\u00E9glementaire constitue un actif rare et pr\u00E9cieux.'),
    sp(),
    h3('c) Calcul du lucrum cessans'),
    sp(),
    tbl(
      ['Poste', 'Base mensuelle (FCFA)', 'Coef. annuel', 'Montant annuel (FCFA)', '10 ans (FCFA)'],
      [
        ['R\u00E9mun\u00E9ration directe', '5.500.000', 'x 14', '77.000.000', '770.000.000'],
        ['Avantages en nature (v\u00E9hicule, logement, sant\u00E9)', '1.500.000', 'x 12', '18.000.000', '180.000.000'],
        ['Bonus de performance (estim\u00E9 20% annuel)', '1.100.000', 'x 12', '13.200.000', '132.000.000'],
        ['\u00C9volution salariale (3% / an compos\u00E9)', '\u2014', '\u2014', '\u2014', '+ 287.000.000'],
        ['Total brut sur 10 ans', '\u2014', '\u2014', '\u2014', '1.369.000.000'],
      ],
      [28, 22, 14, 20, 16]
    ),
    sp(),
    body('La Cour appr\u00E9ciera que le lucrum cessans brut d\u00E9passe le milliard trois cent soixante-neuf millions de FCFA. M\u00EAme en appliquant une correction prudente pour tenir compte des revenus de remplacement (consultant PNUD), le pr\u00E9judice net de carri\u00E8re exc\u00E8de all\u00E8grement les 800.000.000 FCFA sur 10 ans.'),
    sp(),
    body('La demande de 300.000.000 FCFA ne repr\u00E9sente que 22% du lucrum cessans brut, et moins de 38% du lucrum cessans net. C\u2019est une demande raisonnable, mod\u00E9r\u00E9e, et juridiquement justifi\u00E9e.'),
    sp(),
    h2('III.2 Pr\u00E9judice moral et r\u00E9putationnel'),
    sp(),
    body('Le pr\u00E9judice moral d\u00E9passe largement la simple souffrance psychologique. Il s\u2019agit de l\u2019atteinte irr\u00E9versible \u00E0 l\u2019honneur professionnel d\u2019un homme dont l\u2019int\u00E9grit\u00E9 et la probit\u00E9 ont \u00E9t\u00E9 sa raison d\u2019\u00EAtre professionnelle.'),
    sp(),
    h3('a) La probit\u00E9 comme capital unique'),
    body('Dans le secteur bancaire et microfinancier, la probit\u00E9 d\u2019un dirigeant est son SEUL capital. Ce n\u2019est pas une qualit\u00E9 accessoire : c\u2019est la condition sine qua non de l\u2019exercice. Un banquier sans probit\u00E9 n\u2019est pas un banquier incomp\u00E9tent : c\u2019est un banquier inemployable. AMIFA a dilapid\u00E9 ce capital.'),
    sp(),
    h3('b) Les manifestations concr\u00E8tes du pr\u00E9judice moral'),
    body('M. SIMDA subit quotidiennement les effets de la destruction de sa r\u00E9putation :'),
    bullet('Impossibilit\u00E9 d\u2019obtenir une lettre de recommandation ou une attestation de fin de mission valorisante d\u2019AMIFA'),
    bullet('Questions r\u00E9currentes et humiliantes lors des entretiens professionnels : \u00AB Pourquoi \u00EAtes-vous parti d\u2019AMIFA ? \u00BB, \u00AB Y a-t-il eu un probl\u00E8me ? \u00BB'),
    bullet('Silence des anciens partenaires institutionnels qui \u00E9vitement tout contact pour ne pas \u00AB se compromettre \u00BB'),
    bullet('Impossibilit\u00E9 pour ses enfants de comprendre pourquoi \u00AB Papa \u00E9tait DG et maintenant il travaille seul \u00BB'),
    bullet('D\u00E9gradation de l\u2019estime de soi, troubles du sommeil, et anxi\u00E9t\u00E9 chronique li\u00E9s \u00E0 l\u2019incompr\u00E9hension du d\u00E9classement subi'),
    sp(),
    body('Ces atteintes ne se r\u00E8glent pas avec une poign\u00E9e de main et un ch\u00E8que de 10 millions. Elles exigent une r\u00E9paration financi\u00E8re significative, symbolique, et exemplaire.'),
    sp(),
    h2('III.3 Caract\u00E8re vexatoire : la violence du silence et de l\u2019isolement'),
    sp(),
    body('AMIFA n\u2019a pas seulement licenci\u00E9 M. SIMDA. Elle l\u2019a humili\u00E9. La coupure brutale de ses outils de travail \u2014 emails professionnels, acc\u00E8s aux syst\u00E8mes, t\u00E9l\u00E9phone de fonction \u2014 a \u00E9t\u00E9 un acte de violence extr\u00EAme pour un dirigeant.'),
    sp(),
    body('Pour un Directeur G\u00E9n\u00E9ral, les outils de travail ne sont pas des commodit\u00E9s : ce sont les instruments de son autorit\u00E9. Leur suppression du jour au lendemain, devant ses \u00E9quipes, \u00E9quivaut \u00E0 une d\u00E9ch\u00E9ance publique. C\u2019est un message adress\u00E9 \u00E0 l\u2019ensemble du personnel : \u00AB cet homme n\u2019est plus rien \u00BB.'),
    sp(),
    body('Cette humiliation a vis\u00E9 \u00E0 l\u2019isoler, \u00E0 le d\u00E9shonorer devant ses collaborateurs, et \u00E0 sceller sa sortie du groupe dans la honte plut\u00F4t que dans la dignit\u00E9. C\u2019est un acte vexatoire caract\u00E9ris\u00E9.'),
    sp(),
    tbl(
      ['Acte vexatoire', 'Description', 'Impact sur M. SIMDA'],
      [
        ['Coupure des emails professionnels', 'Sans pr\u00E9avis, sans transition, sans transfert', 'Isolement imm\u00E9diat, impossibilit\u00E9 de clore les dossiers en cours'],
        ['R\u00E9vocation des acc\u00E8s syst\u00E8mes', 'Perte de l\u2019int\u00E9gralit\u00E9 des donn\u00E9es professionnelles', 'Perte de la trace de ses r\u00E9alisations, impossibilit\u00E9 de justifier son bilan'],
        ['Absence de c\u00E9r\u00E9monie de d\u00E9part', 'Aucun \u00E9v\u00E9nement, aucun discours, aucune reconnaissance', 'Message de d\u00E9shonneur aux \u00E9quipes et au march\u00E9'],
        ['Silence sur les r\u00E9sultats obtenus', 'Aucune communication interne ou externe sur ses r\u00E9alisations', 'Effacement de sa contribution, attribution implicite de l\u2019\u00E9chec'],
        ['Blocage de l\u2019affectation alternative', 'Violation de l\u2019article 5 de la convention', 'D\u00E9classement forc\u00E9 sans filet de s\u00E9curit\u00E9 professionnelle'],
      ],
      [24, 38, 38]
    ),
    sp(),
    dangerBox('La s\u00E9quence vexatoire est claire : couper les outils, geler la communication, bloquer la mobilit\u00E9, laisser le vide s\u2019emplir de rumeurs. Ce n\u2019est pas une gestion des ressources humaines : c\u2019est une strat\u00E9gie de d\u00E9construction d\u2019un dirigeant, mis en \u0153uvre avec une l\u00E9g\u00E8ret\u00E9 bl\u00E2mable confinant \u00E0 la malveillance.'),
    sp(),
    h2('III.4 Synth\u00E8se chiffr\u00E9e de la demande'),
    sp(),
    tbl(
      ['Cat\u00E9gorie de pr\u00E9judice', 'Fondement juridique', 'Montant demand\u00E9 (FCFA)'],
      [
        ['Lucrum cessans (perte de revenus)', 'Article 1150 du Code civil (r\u00E9paration du dommage pr\u00E9visible), jurisprudence OHADA', '120.000.000'],
        ['Pr\u00E9judice moral et r\u00E9putationnel', 'Article 1151 (dommages et int\u00E9r\u00EAts), jurisprudence prud\u2019homale africaine', '80.000.000'],
        ['Pr\u00E9judice d\u2019image et d\u00E9classement social', 'Responsabilit\u00E9 d\u00E9lictuelle, atteinte \u00E0 l\u2019honneur professionnel', '60.000.000'],
        ['Caract\u00E8re vexatoire de la rupture', 'Article L.123-1 et suivants (licenciement sans cause r\u00E9elle et s\u00E9rieuse), jurisprudence', '40.000.000'],
      ],
      [30, 35, 35]
    ),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: 'TOTAL DE LA DEMANDE : ', bold: true, size: 26, color: NOIR_MID, font: 'Times New Roman' }),
        new TextRun({ text: '300.000.000 FCFA', bold: true, size: 32, color: ROUGE_SANG, font: 'Times New Roman' }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 300, after: 200 },
      shading: { type: ShadingType.SOLID, color: ROUGE_CLAIR, fill: ROUGE_CLAIR },
      border: {
        top: { style: BorderStyle.SINGLE, size: 4, color: ROUGE_SANG },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: ROUGE_SANG },
        left: { style: BorderStyle.SINGLE, size: 4, color: ROUGE_SANG },
        right: { style: BorderStyle.SINGLE, size: 4, color: ROUGE_SANG },
      },
    }),
    sp(),
    goldBox('Trois cent millions de francs CFA. Cette somme correspond \u00E0 moins d\u2019un quart du lucrum cessans brut. Elle repr\u00E9sente une r\u00E9paration \u00E9quitable, proportionn\u00E9e au statut du dirigeant d\u00E9truit, et symboliquement suffisante pour marquer la gravit\u00E9 du comportement d\u2019AMIFA HOLDING.'),
    pb(),
  ];
}

// ═══════════════════════════════════════════════════════════════
// SECTION IV — CONCLUSIONS (PAR CES MOTIFS)
// ═══════════════════════════════════════════════════════════════
function section4(): (Paragraph | Table)[] {
  return [
    h1('IV. CONCLUSIONS — PAR CES MOTIFS'),
    sp(),
    body('Monsieur le Pr\u00E9sident, Mesdames et Messieurs les Magistrats,', { bold: true }),
    sp(),
    body('Le Coll\u00E8ge d\u2019Avocats \u00AB Litiges \u00E0 Haut Risque \u00BB, agissant au nom et pour le compte de M. SIMDA Essoyom\u00E8w\u00E8, porte \u00E0 la connaissance de la Cour les conclusions suivantes :'),
    sp(),
    h2('IV.1 Infirmation du jugement sur le quantum'),
    sp(),
    body('La Cour d\u2019appel est pri\u00E9e d\u2019INFIRMER le jugement de premi\u00E8re instance en ce qu\u2019il a condamn\u00E9 AMIFA HOLDING au paiement d\u2019une indemnit\u00E9 de 10.000.000 FCFA, au motif que cette somme est manifestement insuffisante et disproportionn\u00E9e au regard :'),
    bullet('Du statut de Directeur G\u00E9n\u00E9ral de groupe international occup\u00E9 par M. SIMDA'),
    bullet('De la valeur cr\u00E9e\u00E9e par M. SIMDA pour AMIFA (agrément COBAC, structuration d\u2019AMIFA Gabon)'),
    bullet('Du pr\u00E9judice de carri\u00E8re (lucrum cessans) chiffr\u00E9 \u00E0 plus d\u2019un milliard de FCFA sur 10 ans'),
    bullet('Du pr\u00E9judice moral, r\u00E9putationnel, et d\u2019image irr\u00E9versible subi par M. SIMDA'),
    bullet('Du caract\u00E8re vexatoire et malveillant de la rupture mise en \u0153uvre par AMIFA'),
    sp(),
    h2('IV.2 Condamnation exemplaire sollicit\u00E9e'),
    sp(),
    body('La Cour d\u2019appel est pri\u00E9e de condamner la soci\u00E9t\u00E9 AMIFA HOLDING (Groupe Banque Centrale Populaire) au paiement :'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: '1. ', bold: true, size: 24, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'D\u2019une indemnit\u00E9 totale de ', size: 24, color: NOIR_MID, font: 'Times New Roman' }),
        new TextRun({ text: '300.000.000 FCFA (trois cent millions de francs CFA)', bold: true, size: 28, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text:', se d\u00E9composant comme suit :', size: 24, color: NOIR_MID, font: 'Times New Roman' }),
      ],
      spacing: { before: 200, after: 160 },
      indent: { left: convertInchesToTwip(0.2) },
    }),
    sp(),
    tbl(
      ['Poste', 'Montant (FCFA)', 'Fondement'],
      [
        ['Lucrum cessans (perte de revenus 10 ans)', '120.000.000', 'Article 1150 Code civil \u2014 dommage pr\u00E9visible'],
        ['Pr\u00E9judice moral et r\u00E9putationnel', '80.000.000', 'Article 1151 \u2014 dommages et int\u00E9r\u00EAts'],
        ['Pr\u00E9judice d\u2019image et d\u00E9classement social', '60.000.000', 'Responsabilit\u00E9 d\u00E9lictuelle \u2014 atteinte \u00E0 l\u2019honneur'],
        ['Caract\u00E8re vexatoire de la rupture', '40.000.000', 'Licenciement sans cause r\u00E9elle et s\u00E9rieuse'],
        ['TOTAL', '300.000.000', 'R\u00E9paration int\u00E9grale et exemplaire'],
      ],
      [30, 25, 45]
    ),
    sp(),
    new Paragraph({
      children: [
        new TextRun({ text: '2. ', bold: true, size: 24, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'Des int\u00E9r\u00EAts moratoires au taux l\u00E9gal major\u00E9 de 2 points, courant depuis la date du jugement de premi\u00E8re instance jusqu\u2019\u00E0 parfaite ex\u00E9cution.', size: 24, color: NOIR_MID, font: 'Times New Roman' }),
      ],
      spacing: { before: 160, after: 120 },
      indent: { left: convertInchesToTwip(0.2) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '3. ', bold: true, size: 24, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'De la publication int\u00E9grale ou partielle de la pr\u00E9sente d\u00E9cision dans un quotidien d\u2019insertion l\u00E9gale au Gabon, afin de r\u00E9tablir la v\u00E9rit\u00E9 sur le d\u00E9part de M. SIMDA et de faire cesser la suspicion qui p\u00E8se sur sa r\u00E9putation.', size: 24, color: NOIR_MID, font: 'Times New Roman' }),
      ],
      spacing: { before: 120, after: 120 },
      indent: { left: convertInchesToTwip(0.2) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '4. ', bold: true, size: 24, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'De la condamnation d\u2019AMIFA HOLDING aux enti\u00E8res d\u00E9pens, ainsi qu\u2019\u00E0 une indemnit\u00E9 de 15.000.000 FCFA au titre de l\u2019article 700 du Code de proc\u00E9dure civile.', size: 24, color: NOIR_MID, font: 'Times New Roman' }),
      ],
      spacing: { before: 120, after: 200 },
      indent: { left: convertInchesToTwip(0.2) },
    }),
    sp(),
    h2('IV.3 Motifs d\u00E9terminants de la condamnation exemplaire'),
    sp(),
    body('La Cour appr\u00E9ciera que la somme de 300.000.000 FCFA n\u2019est pas une revanche financi\u00E8re : c\u2019est une r\u00E9paration \u00E9quitable. Elle tient compte de cinq facteurs cumulatifs :'),
    sp(),
    bullet('La ', { bold: true }),
    new Paragraph({
      children: [
        new TextRun({ text: '\u25B8  ', bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'La ', size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: 'gravité exceptionnelle', bold: true, size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: ' de la faute : AMIFA n\u2019a pas licencié un employé, elle a exécuté un dirigeant par la méthode du silence et de l\u2019isolement.', size: 22, font: 'Times New Roman', color: NOIR }),
      ],
      spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '\u25B8  ', bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'La ', size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: 'puissance financière', bold: true, size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: ' de la société condamnée : AMIFA HOLDING (Groupe BCP) dispose de ressources colossales. Dix millions de FCFA ne représentent pas une sanction : ils représentent une permission de recommencer.', size: 22, font: 'Times New Roman', color: NOIR }),
      ],
      spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '\u25B8  ', bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'L\u2019', size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: 'impunité perçue', bold: true, size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: ' : le jugement de première instance, en fixant une indemnité dérisoire, a envoyé un signal dangereux à l\u2019ensemble du secteur financier africain : il est permis de détruire un dirigeant pour dix millions de FCFA.', size: 22, font: 'Times New Roman', color: NOIR }),
      ],
      spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '\u25B8  ', bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'La ', size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: 'fonction dissuasive', bold: true, size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: ' : une condamnation exemplaire de 300 millions de FCFA enverra un message clair à l\u2019ensemble des groupes financiers africains : la destruction d\u2019une réputation professionnelle a un coût réel, mesurable, et dissuasif.', size: 22, font: 'Times New Roman', color: NOIR }),
      ],
      spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: '\u25B8  ', bold: true, size: 22, color: ROUGE_SANG, font: 'Times New Roman' }),
        new TextRun({ text: 'La ', size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: 'proportionnalité', bold: true, size: 22, font: 'Times New Roman', color: NOIR }),
        new TextRun({ text: ' : 300 millions de FCFA représentent moins de 22% du lucrum cessans brut sur 10 ans. C\u2019est une demande modérée, raisonnable, et juridiquement fondée.', size: 22, font: 'Times New Roman', color: NOIR }),
      ],
      spacing: { before: 80, after: 100 }, indent: { left: convertInchesToTwip(0.35) },
    }),
    sp(),
    h2('IV.4 Parole finale'),
    sp(),
    new Paragraph({
      children: [
        new TextRun({
          text: '\u00AB Monsieur le Président, une société financière ne peut pas être autorisée à utiliser le silence comme arme de destruction massive d\u2019une carrière. AMIFA HOLDING a agi avec une légèreté blâmable qui confine à la malveillance. Elle a pris un homme à son zénith professionnel \u2014 DG agréé COBAC, architecte d\u2019une filiale stratégique \u2014 et l\u2019a jeté dans l\u2019ombre, sans explication, sans protection, sans honneur. La Cour d\u2019appel est le dernier rempart. Elle peut, par sa décision, réparer une injustice, restaurer une dignité, et prévenir de futures exécutions professionnelles. Nous lui demandons de condamner AMIFA HOLDING à verser la somme de 300.000.000 FCFA à M. SIMDA Essoyomèwè. Ce n\u2019est pas une fortune. C\u2019est une justice. \u00BB',
          size: 22,
          font: 'Times New Roman',
          italics: true,
          color: NOIR_MID,
          bold: true,
        }),
      ],
      spacing: { before: 300, after: 300 },
      alignment: AlignmentType.JUSTIFIED,
      indent: { left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.3) },
      border: {
        left: { style: BorderStyle.SINGLE, size: 8, color: ROUGE_SANG },
        top: { style: BorderStyle.SINGLE, size: 3, color: ROUGE_SANG },
        bottom: { style: BorderStyle.SINGLE, size: 3, color: ROUGE_SANG },
        right: { style: BorderStyle.SINGLE, size: 8, color: ROUGE_SANG },
      },
      shading: { type: ShadingType.SOLID, color: ROUGE_CLAIR, fill: ROUGE_CLAIR },
    }),
    sp(3),
    hr(NOIR_MID),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Pour le Collège d\u2019Avocats \u2014 Litiges à Haut Risque', bold: true, size: 22, color: NOIR_MID, font: 'Times New Roman' })],
      alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Agissant pour M. SIMDA Essoyomèwè', size: 20, color: GRIS, font: 'Times New Roman', italics: true })],
      alignment: AlignmentType.RIGHT, spacing: { before: 0, after: 400 },
    }),
    tbl(
      ['Pour le demandeur', 'Pour le défendeur'],
      [
        ['\n\n\n\n', '\n\n\n\n'],
        ['M. SIMDA Essoyomèwè', 'Représentant légal d\u2019AMIFA HOLDING'],
        ['\n\n\n', '\n\n\n'],
      ]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'CONFIDENTIEL \u2014 STRATEGIQUE \u2014 STRICTEMENT PRIVÉ', size: 16, color: GRIS, font: 'Times New Roman', italics: true, allCaps: true })],
      alignment: AlignmentType.CENTER, spacing: { before: 200, after: 0 },
    }),
  ];
}

// ═══════════════════════════════════════════════════════════════
// EXPORT PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export async function generateConclusionsAppelAMIFA(): Promise<Blob> {
  const allContent: (Paragraph | Table)[] = [
    ...coverPage(),
    ...introduction(),
    ...section1(),
    ...section2(),
    ...section3(),
    ...section4(),
  ];

  const doc = new Document({
    creator: 'Collège d\u2019Avocats \u2014 Litiges à Haut Risque',
    title: 'Conclusions d\u2019Appel \u2014 Affaire SIMDA c/ AMIFA HOLDING \u2014 Condamnation exemplaire 300M FCFA',
    description: 'Conclusions d\u2019appel en demande de condamnation exemplaire de 300.000.000 FCFA contre AMIFA HOLDING pour rupture vexatoire, destruction de réputation professionnelle, et anéantissement de carrière',
    subject: 'Licenciement abusif, rupture vexatoire, mort professionnelle, préjudice réputationnel, lucrum cessans, microfinance, COBAC, CEMAC, UEMOA',
    keywords: 'AMIFA, SIMDA, conclusions appel, 300M FCFA, rupture vexatoire, licenciement abusif, préjudice réputationnel, mort professionnelle, COBAC, BCP, microfinance, Gabon, CEMAC',
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(1.0),
              right: convertInchesToTwip(1.0),
              bottom: convertInchesToTwip(1.0),
              left: convertInchesToTwip(1.2),
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'AFFAIRE SIMDA c/ AMIFA HOLDING  |  Conclusions d\u2019Appel  |  CONFIDENTIEL STRATEGIQUE', size: 15, color: GRIS, font: 'Times New Roman' }),
                ],
                border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: ROUGE_SANG } },
                spacing: { after: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: 'Collège d\u2019Avocats \u2014 Litiges à Haut Risque  |  Document strictement privé  |  Page ', size: 15, color: GRIS, font: 'Times New Roman' }),
                  new TextRun({ children: [PageNumber.CURRENT], size: 15, color: ROUGE_SANG, font: 'Times New Roman', bold: true }),
                ],
                border: { top: { style: BorderStyle.SINGLE, size: 3, color: ROUGE_SANG } },
                spacing: { before: 100 },
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: allContent,
      },
    ],
  });

  return Packer.toBlob(doc);
}



