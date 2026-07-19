import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, PageBreak,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, SILVER, DARK, WHITE, GOLD, GREEN,
  sp, hr, h1, h2, body, bullet, tbl, kpiRow, pb, infoBox, successBox,
} from '';

// ─── PAGE DE GARDE ───────────────────────────────────────────────────────────
export function coverPage(): (Paragraph | Table)[] {
  return [
    new Paragraph({
      children: [new TextRun({ text: '', size: 4 })],
      shading: { type: ShadingType.SOLID, color: NAVY, fill: NAVY },
      spacing: { before: 0, after: 0 },
    }),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS', bold: true, size: 40, color: STEEL, font: 'Calibri', allCaps: true, characterSpacing: 40 })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Cabinet de Conseil de R\u00e9putation Internationale \u2014 Finance \u00b7 Strat\u00e9gie \u00b7 Ing\u00e9nierie de Projets', size: 20, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(GOLD),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'BUSINESS PLAN', bold: true, size: 52, color: NAVY, font: 'Calibri', allCaps: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Plan d\'Affaires D\u00e9finitif 2026\u20132036', bold: true, size: 30, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
    }),
    hr(NAVY_MID),
    sp(1),
    new Paragraph({
      children: [new TextRun({ text: 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA', bold: true, size: 26, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 100, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Carri\u00e8re de Granulats \u2014 Site de Siyi m\u00e9, District du Haho, Togo', size: 22, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Demande de dette senior : 11 440 M FCFA aupr\u00e8s de la BIDC (CAPEX 8 899 M FCFA + BFR 2 541 M FCFA)', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 300 },
    }),
    sp(1),
    tbl(
      ['Client', 'Secteur', 'Pays / R\u00e9gion', 'R\u00e9f\u00e9rence'],
      [['CORNERSTONE GROUP INTERNATIONAL (CGI) SA', 'Mines & Carri\u00e8res \u2014 BTP', 'Togo / Afrique de l\'Ouest \u2014 CEDEAO', 'KE-BP-CGI-2026-001']],
      [35, 25, 20, 20]
    ),
    sp(1),
    tbl(
      ['Date d\'emission', 'Version', 'Statut', 'Validite'],
      [['Mai 2026', 'V2.0 \u2014 D\u00e9finitif', 'CONFIDENTIEL', '12 mois']],
      [25, 25, 25, 25]
    ),
    sp(2),
    new Paragraph({
      children: [new TextRun({ text: 'Conforme aux Normes BIDC \u00b7 Code Minier Togolais \u00b7 Acte Uniforme OHADA \u00b7 Normes IFC Performance Standards \u00b7 Principes Equateur \u00b7 Crit\u00e8res Banque Verte BIDC', size: 18, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    pb(),
  ];
}

// ─── AVERTISSEMENT LÉGAL ───────────────────────────────────────────────────
export function legalNotice(): (Paragraph | Table)[] {
  return [
    h1('AVERTISSEMENT LÉGAL ET CONFIDENTIALITÉ'),
    sp(),
    body('Le pr\u00e9sent Business Plan a \u00e9t\u00e9 pr\u00e9par\u00e9 par KHEPRA EXPERTS, cabinet de conseil de r\u00e9putation internationale, \u00e0 la demande exclusive de CORNERSTONE GROUP INTERNATIONAL (CGI) SA. Il est destin\u00e9 \u00e0 un usage strictement confidentiel et ne peut \u00eatre communiqu\u00e9 \u00e0 des tiers sans l\'accord \u00e9crit pr\u00e9alable de KHEPRA EXPERTS et de CGI SA.'),
    sp(),
    body('Les projections financi\u00e8res, estimations de march\u00e9 et analyses strat\u00e9giques contenues dans ce document sont fond\u00e9es sur des donn\u00e9es disponibles \u00e0 la date d\'\u00e9mission, issues de sources officielles et cr\u00e9dibles (BIDC, BAD, FMI, BCEAO, INSEED Togo, Code Minier Togolais). Elles constituent des estimations raisonn\u00e9es et non des garanties de r\u00e9sultats. Toute d\u00e9cision d\'investissement doit \u00eatre valid\u00e9e par les instances comp\u00e9tentes de la BIDC et par un avis juridique ind\u00e9pendant.'),
    sp(),
    body('Ce Business Plan a \u00e9t\u00e9 structur\u00e9 conform\u00e9ment aux standards des institutions de financement du d\u00e9veloppement (BIDC, BAD, IFC) et aux meilleures pratiques du conseil strat\u00e9gique international (niveau Big Four). Il est directement pr\u00e9sentable \u00e0 un comit\u00e9 de cr\u00e9dit de la BIDC.'),
    sp(),
    infoBox('R\u00e9f\u00e9rence : KE-BP-CGI-2026-001 | Pr\u00e9par\u00e9 par : KHEPRA EXPERTS | Pour : CORNERSTONE GROUP INTERNATIONAL (CGI) SA | Togo, 2026 | Financement demand\u00e9 : 11 440 M FCFA dette senior BIDC (8 899 M FCFA CAPEX + 2 541 M FCFA BFR)'),
    pb(),
  ];
}

// ─── SOMMAIRE EXÉCUTIF — TABLEAU DE BORD KPI ───────────────────────────────
export function executiveDashboard(): (Paragraph | Table)[] {
  return [
    h1('SOMMAIRE EXÉCUTIF \u2014 TABLEAU DE BORD'),
    sp(),
    h2('Indicateurs Clés de Performance \u2014 Scénario Central'),
    sp(),
    kpiRow([
      { label: 'TRI Projet (10 ans)', value: '16,2 %', sub: 'Taux d\u2019actualisation 12%' },
      { label: 'VAN (12%)', value: '2 950 M FCFA', sub: 'Valeur Actuelle Nette' },
      { label: 'DSCR Moyen', value: '1,85x', sub: 'Couverture service dette \u2014 Covenant BIDC 1,3x' },
      { label: 'CAPEX Total', value: '8 899 M FCFA', sub: '4 tranches A/B/C/D \u2014 14,7 M USD' },
    ]),
    sp(),
    kpiRow([
      { label: 'Demande BIDC', value: '11 440 M FCFA', sub: 'Dette senior 100% (CAPEX + BFR)' },
      { label: 'Production cible', value: '795 000 T/an', sub: 'R\u00e9gime croisi\u00e8re d\u00e8s 2028' },
      { label: 'Prix moyen', value: '8 000 FCFA/T', sub: 'Depart site \u2014 transport non compris' },
      { label: 'Payback', value: '6,0 ans', sub: 'P\u00e9riode de r\u00e9cup\u00e9ration du CAPEX' },
    ]),
    sp(),
    kpiRow([
      { label: 'Emplois directs', value: '85', sub: '+120 indirects d\'ici 2030' },
      { label: 'Marge EBITDA 2028', value: '67,8 %', sub: 'Capex Intensity : 0,65x' },
      { label: 'Gearing 2030', value: '0,80x', sub: 'D\u00e9sendettement rapide post-2030' },
      { label: 'Amort. dette', value: '2034', sub: 'Remboursement complet pr\u00eat BIDC' },
    ]),
    sp(),
    h2('Synth\u00e8se strat\u00e9gique'),
    body('CGI SA a men\u00e9 une phase pilote de 2024 \u00e0 2026, int\u00e9gralement financ\u00e9e sur fonds propres (2,1 Mds FCFA investis). Cette p\u00e9riode a permis de valider la ma\u00eetrise op\u00e9rationnelle du cycle minage-concassage-criblage sur le site de Siyim\u00e9, d\'obtenir le permis d\'exploitation DGMG et de constituer un portefeuille client initial incluant le contrat cadre CIMCO (150 000 T/an). L\'investissement historique de 2,1 Mds FCFA constitue la preuve tangible de l\'engagement des actionnaires et fonde la cr\u00e9dibilit\u00e9 de la demande de financement.'),
    sp(),
    body('CGI SA sollicite aupr\u00e8s de la BIDC une dette senior de 11 440 M FCFA, structur\u00e9e en deux instruments : (i) un pr\u00eat d\'investissement de 8 899 M FCFA couvrant le CAPEX consolid\u00e9 des quatre programmes industriels (Tranche A : 3 486 M FCFA incluant Ligne 2 \u00e0 2 100 M FCFA et Ligne 3 \u00e0 2 000 M FCFA conforme \u00e9tude faisabilit\u00e9 Cornerstone ; Tranche B : 3 277 M FCFA ; Tranche C : 1 712 M FCFA ; Tranche D : 424 M FCFA) ; (ii) une ligne de cr\u00e9dit BFR de 2 541 M FCFA s\u00e9curisant le cycle d\'exploitation. Aucun apport en fonds propres compl\u00e9mentaire n\'est requis : l\'investissement fondateur de 2,1 Mds FCFA satisfait pleinement l\'exigence de participation actionnaire.'),
    sp(),
    body('Les analyses de sensibilit\u00e9 confirment la robustesse structurelle du projet. En sc\u00e9nario pessimiste combin\u00e9 (baisse de prix de 15%, hausse des co\u00fbts \u00e9nerg\u00e9tiques de 30%, retard de mise en service de 12 mois), le DSCR reste sup\u00e9rieur \u00e0 1,3x \u2014 au-dessus du covenant BIDC. En sc\u00e9nario central, le DSCR moyen s\'\u00e9tablit \u00e0 1,85x sur la p\u00e9riode de remboursement, avec un d\u00e9sendettement rapide post-2030 (Gearing 0,80x en 2030).'),
    sp(),
    tbl(
      ['Dimension', 'Evaluation', 'Niveau de confiance'],
      [
        ['Viabilit\u00e9 technique', 'Capacit\u00e9 industrielle de 795 000 T/an r\u00e9alisable avec \u00e9quipements METSO standard international. Gisement Siyim\u00e9 : masse volumique 2,63 g/cm3 \u2014 certification LNBTP. Processus complet forage-minage-concassage-criblage-livraison document\u00e9.', '\u2714 ELEV\u00c9'],
        ['Viabilit\u00e9 commerciale', 'March\u00e9 porteur (Togo + B\u00e9nin + CEDEAO). Contrat cadre CIMCO 150 000 T/an. Prix 8 000 FCFA/T comp\u00e9titif. Diversification dalles granite (marge 55%) r\u00e9duit cyclicit\u00e9 BTP.', '\u2714 ELEV\u00c9'],
        ['Viabilit\u00e9 financi\u00e8re', 'TRI 16,2% \u2014 VAN positive 2 950 M FCFA \u2014 DSCR 1,85x \u2014 Payback 6,0 ans \u2014 Marge de s\u00e9curit\u00e9 54,8%.', '\u2714 ELEV\u00c9'],
        ['Bancabilit\u00e9 BIDC', '100% dette senior 11 440 M FCFA \u2014 DSCR >> covenant 1,3x \u2014 Gearing < 1x d\u00e8s 2030 \u2014 Structure directement pr\u00e9sentable en comit\u00e9 de cr\u00e9dit.', '\u2714 ELEV\u00c9'],
        ['Conformit\u00e9 r\u00e9glementaire', 'Permis d\'exploitation DGMG valide \u2014 Code Minier Togolais \u2014 Certification LNBTP \u2014 Conformit\u00e9 OHADA \u2014 SGES en cours.', '\u2714 ELEV\u00c9'],
        ['Conformit\u00e9 ESG / Banque Verte', 'PGES conforme IFC Performance Standards \u2014 Centrale solaire 3-4 MWc (r\u00e9duction GES 35%) \u2014 Budget ESG 193 M FCFA/an \u2014 Alignement crit\u00e8res Banque Verte BIDC.', '\u2714 ELEV\u00c9'],
      ],
      [20, 55, 25]
    ),
    sp(),
    successBox('Recommandation KHEPRA EXPERTS : Le projet CGI SA pr\u00e9sente un profil risque/rendement attractif, une bancabilit\u00e9 confirm\u00e9e par un DSCR de 1,85x au-dessus des covenants BIDC, et un impact de d\u00e9veloppement positif pour le Togo et la r\u00e9gion CEDEAO. Le projet est directement pr\u00e9sentable en comit\u00e9 de cr\u00e9dit. Nous recommandons favorablement un financement dette senior de 11 440 M FCFA (CAPEX 8 899 M + BFR 2 541 M FCFA).'),
    pb(),
  ];
}



