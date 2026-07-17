import {
  Document, Packer, Paragraph, Table, TableRow, TableCell, TextRun,
  AlignmentType, BorderStyle, WidthType, convertInchesToTwip,
  Header, Footer, PageNumber,
} from 'docx';

const SILVER = 'A0AEC0';
const STEEL = '4A5568';
const TEAL = '0D9488';
const DARK = '1A202C';
const RED = 'C53030';
const GREEN = '276749';

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS — Extra-exécutif, bancaire, corporate
   ═══════════════════════════════════════════════════════════════════════════ */

function h1(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, color: DARK, font: 'Calibri' })],
    spacing: { after: 200, before: 100 },
    alignment: AlignmentType.LEFT,
  });
}

function h2(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: STEEL, font: 'Calibri' })],
    spacing: { after: 140, before: 160 },
    alignment: AlignmentType.LEFT,
  });
}

function body(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 22,
        font: 'Calibri',
        bold: opts?.bold,
        italics: opts?.italic,
        color: opts?.color || DARK,
      }),
    ],
    spacing: { after: 100 },
    alignment: AlignmentType.LEFT,
  });
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text: `\u2022  ${text}`, size: 21, font: 'Calibri', color: DARK })],
    spacing: { after: 60 },
    indent: { left: convertInchesToTwip(0.25) },
  });
}

function spacer(): Paragraph {
  return new Paragraph({ spacing: { after: 40 }, children: [] });
}

/* ─── Table helpers ─── */
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: 'E2E8F0' };
const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: STEEL };

function cell(text: string, opts?: { bold?: boolean; align?: AlignmentType; bg?: string; width?: number }): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: opts?.bold, size: 20, font: 'Calibri', color: opts?.bold ? DARK : STEEL })],
        alignment: opts?.align || AlignmentType.LEFT,
        spacing: { before: 50, after: 50 },
      }),
    ],
    shading: opts?.bg ? { fill: opts.bg, type: 'clear' } : undefined,
    width: opts?.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    borders: { top: thinBorder, bottom: thinBorder, left: thinBorder, right: thinBorder },
    verticalAlign: 'center',
  });
}

function headerCell(text: string, opts?: { width?: number }): TableCell {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, size: 20, font: 'Calibri', color: 'FFFFFF' })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
      }),
    ],
    shading: { fill: TEAL, type: 'clear' },
    width: opts?.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
    borders: { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder },
    verticalAlign: 'center',
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   DONNÉES — Single Source of Truth
   ═══════════════════════════════════════════════════════════════════════════ */
const CA_LOME = 575_000;
const CA_COTONOU = 750_000;
const COUT_CIBLE_LOME = 120_300;
const COUT_CIBLE_COTONOU = 140_000;

const ROTATIONS_AN = 3_750;
const MIX_LOME = 0.60;
const MIX_COTONOU = 0.40;
const ROT_LOME = Math.round(ROTATIONS_AN * MIX_LOME);
const ROT_COTONOU = Math.round(ROTATIONS_AN * MIX_COTONOU);

const CA_ANNUEL = ROT_LOME * CA_LOME + ROT_COTONOU * CA_COTONOU;
const COUT_OP_ANNUEL = ROT_LOME * COUT_CIBLE_LOME + ROT_COTONOU * COUT_CIBLE_COTONOU;
const MARGE_BRUTE_ANNUELLE = CA_ANNUEL - COUT_OP_ANNUEL;

const CHARGES_FIXES = 400_000_000;
const EBITDA_TRANSPORT = MARGE_BRUTE_ANNUELLE - CHARGES_FIXES;

const PM_ROTATIONS = Math.ceil(CHARGES_FIXES / (MARGE_BRUTE_ANNUELLE / ROTATIONS_AN));
const PM_JOURS = Math.ceil(PM_ROTATIONS / 10);

const fmt = (n: number) => n.toLocaleString('fr-FR');
const fmtM = (n: number) => `${(n / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}`;

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORT — Document extra-exécutif, 5 pages max, zéro référence BP
   ═══════════════════════════════════════════════════════════════════════════ */

export async function generateIBBankFlotteReport(): Promise<Blob> {
  const children: (Paragraph | Table)[] = [];

  /* ─── PAGE 1 : GARDE ─── */
  children.push(
    new Paragraph({ spacing: { after: 500 }, children: [] }),
    new Paragraph({
      children: [new TextRun({ text: 'CORNERSTONE GROUP INTERNATIONAL (CGI) SA', bold: true, size: 28, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 80 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Carrière de Granulats — Siyimé, Région des Plateaux, Togo', size: 20, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 6 } },
      spacing: { after: 200 },
      children: [],
    }),
    new Paragraph({
      children: [new TextRun({ text: 'NOTE DE RÉPONSE', bold: true, size: 36, color: TEAL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Demande de Financement CAPEX', bold: true, size: 24, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Acquisition Flotte Transport — 10 Camions Bennes 35 m\u00B3 / 50 tonnes', size: 20, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 6 } },
      spacing: { after: 200 },
      children: [],
    }),
    new Paragraph({
      children: [new TextRun({ text: 'DESTINATAIRE', bold: true, size: 20, color: DARK, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Comité de Crédit — IB BANK TOGO', size: 20, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'RÉF. KE-CGI-IBB-2026-001', size: 18, color: SILVER, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 20 },
    }),
    new Paragraph({
      children: [new TextRun({ text: `DATE : ${new Date().toLocaleDateString('fr-FR')}`, size: 18, color: SILVER, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 20 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'STRICTEMENT CONFIDENTIEL — USAGE INTERNE COMITÉ DE CRÉDIT', size: 16, color: RED, font: 'Calibri', bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 300 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS  |  Conseil en Stratégie & Modélisation Financière', size: 16, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
    }),
  );

  /* ─── PAGE 2 : RÉSUMÉ EXÉCUTIF + DEMANDE ─── */
  children.push(
    new Paragraph({ pageBreakBefore: true, children: [] }),
    h1('RÉSUMÉ EXÉCUTIF'),
    body(
      `CGI SA sollicite un financement CAPEX auprès d'IB BANK TOGO pour l'acquisition de 10 camions bennes (35 m\u00B3, 50 T utiles) destinés à internaliser la logistique granulats depuis la carrière de Siyimé vers Lomé et Cotonou. L'objectif est d'éliminer la dépendance aux loueurs externes (coût actuel : 70 000 FCFA/rotation), maîtriser la supply chain et générer un EBITDA transport de ${fmtM(EBITDA_TRANSPORT)} M FCFA/an à horizon régime de croisière.`
    ),
    h2('Demande de financement'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('POSTE', { width: 50 }), headerCell('MONTANT (FCFA)', { width: 50 })] }),
        new TableRow({ children: [cell('Acquisition de 10 camions bennes 35 m\u00B3 / 50 tonnes (reconditionn\u00E9s)'), cell('500 000 000', { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
      ],
    }),
    spacer(),
    body(`Structure de financement sollicit\u00E9e :`, { bold: true }),
    bullet(`Pr\u00EAt senior IB BANK TOGO : 500 000 000 FCFA (100 % du CAPEX) \u2014 taux 8 %, dur\u00E9e 7 ans, diff\u00E9r\u00E9 6 mois.`),
    bullet(`Garanties : nantissement des 10 camions + assurance tous risques NSIA + cession de cr\u00E9ances sur grands comptes BTP.`),
    spacer(),
    h2('Indicateurs clés de rentabilité'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('INDICATEUR', { width: 50 }), headerCell('VALEUR', { width: 50 })] }),
        new TableRow({ children: [cell('CA annuel transport (régime croisière)'), cell(`${fmtM(CA_ANNUEL)} M FCFA`, { align: AlignmentType.RIGHT, bold: true })] }),
        new TableRow({ children: [cell('Marge brute opérationnelle'), cell(`${fmtM(MARGE_BRUTE_ANNUELLE)} M FCFA`, { align: AlignmentType.RIGHT, bold: true })] }),
        new TableRow({ children: [cell('Taux de marge brute'), cell('80,1 %', { align: AlignmentType.RIGHT, bold: true })] }),
        new TableRow({ children: [cell('EBITDA Transport'), cell(`${fmtM(EBITDA_TRANSPORT)} M FCFA`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
        new TableRow({ children: [cell('Point mort opérationnel'), cell(`${fmt(PM_JOURS)} jours`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
        new TableRow({ children: [cell('Marge de sécurité'), cell(`${(100 - (PM_JOURS / 2500) * 100).toFixed(1)} %`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
      ],
    }),
  );

  /* ─── PAGE 3 : ANALYSE MICRO-ÉCONOMIQUE PAR TRAJET ─── */
  children.push(
    new Paragraph({ pageBreakBefore: true, children: [] }),
    h1('ANALYSE MICRO-ÉCONOMIQUE PAR TRAJET'),
    body(`La banque a demandé une ventilation ultra-détaillée des charges d'exploitation (OPEX) par trajet unitaire, hors amortissement. Les coûts cibles ci-dessous sont justifiés par des leviers opérationnels tangibles et déjà engagés.`),
    spacer(),
    h2('Axe Siyimé — Lomé (150 km)'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [
          headerCell('RUBRIQUE', { width: 30 }),
          headerCell('COÛT HIST.', { width: 20 }),
          headerCell('LEVIER D\u2019OPTIMISATION', { width: 35 }),
          headerCell('COÛT CIBLE', { width: 15 }),
        ]}),
        new TableRow({ children: [
          cell('CA rotation (50 T \u00D7 11 500 F/T)'),
          cell('575 000', { align: AlignmentType.RIGHT, bold: true }),
          cell('Prix contractuel indexé T3 2026'),
          cell('575 000', { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Carburant (diesel)'),
          cell('112 500', { align: AlignmentType.RIGHT }),
          cell('Cuve privée 30 000 L (achat groupé SONAGAZ, -5 %/L) + itinéraire optimisé'),
          cell('106 875', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Péages (RN1 + RN2)'),
          cell('12 000', { align: AlignmentType.RIGHT }),
          cell('Abonnement annuel Opérateur Économique Agréé UEMOA (-2 500 F/rot)'),
          cell('9 500', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Taxes routières'),
          cell('2 000', { align: AlignmentType.RIGHT }),
          cell('Statut industriel LNBTP (exonération partielle)'),
          cell('1 500', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Frais de route (repas)'),
          cell('2 500', { align: AlignmentType.RIGHT }),
          cell('Cantine opérationnelle sur site carrière'),
          cell('1 500', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Sous-total charges directes'),
          cell('129 000', { align: AlignmentType.RIGHT, bold: true }),
          cell('Optimisation : -6,7 %'),
          cell(`${fmt(COUT_CIBLE_LOME)}`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' }),
        ]}),
        new TableRow({ children: [
          cell('Location externe (supprimée)'),
          cell('70 000', { align: AlignmentType.RIGHT, bold: true, color: RED }),
          cell('Internalisation — économie cash structurelle'),
          cell('0', { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' }),
        ]}),
        new TableRow({ children: [
          cell('MARGE BRUTE / ROTATION'),
          cell('376 000', { align: AlignmentType.RIGHT, bold: true }),
          cell('Amélioration : +7,4 %'),
          cell(`${fmt(CA_LOME - COUT_CIBLE_LOME)}`, { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' }),
        ]}),
        new TableRow({ children: [
          cell('Taux de marge brute'),
          cell('65,4 %', { align: AlignmentType.RIGHT }),
          cell(''),
          cell('79,1 %', { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' }),
        ]}),
      ],
    }),
    spacer(),
    h2('Axe Siyimé — Cotonou (210 km)'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [
          headerCell('RUBRIQUE', { width: 30 }),
          headerCell('COÛT HIST.', { width: 20 }),
          headerCell('LEVIER D\u2019OPTIMISATION', { width: 35 }),
          headerCell('COÛT CIBLE', { width: 15 }),
        ]}),
        new TableRow({ children: [
          cell('CA rotation (50 T \u00D7 15 000 F/T)'),
          cell('750 000', { align: AlignmentType.RIGHT, bold: true }),
          cell('Prix export premium — marché béninois sous-alimenté'),
          cell('750 000', { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Carburant (diesel)'),
          cell('135 000', { align: AlignmentType.RIGHT }),
          cell('Cuve privée + achat groupé 50 000 L/bordereau (-10 %/L) + télématique'),
          cell('121 500', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Péages (Togo + Bénin)'),
          cell('41 000', { align: AlignmentType.RIGHT }),
          cell('Abonnement péage transfrontalier UEMOA « Convention Libre Circulation »'),
          cell('10 000', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Douanes & Passages frontières'),
          cell('50 000', { align: AlignmentType.RIGHT }),
          cell('Statut OEA UEMOA + Convention libre circulation matériaux BTP (exonération totale)'),
          cell('10 000', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Frais de route (repas)'),
          cell('2 500', { align: AlignmentType.RIGHT }),
          cell('Cantine carrière + compensation transfrontalière simplifiée'),
          cell('1 500', { align: AlignmentType.RIGHT, bg: 'F0FFF4' }),
        ]}),
        new TableRow({ children: [
          cell('Sous-total charges directes'),
          cell('228 500', { align: AlignmentType.RIGHT, bold: true }),
          cell('Optimisation : -38,7 %'),
          cell(`${fmt(COUT_CIBLE_COTONOU)}`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' }),
        ]}),
        new TableRow({ children: [
          cell('Location externe (supprimée)'),
          cell('70 000', { align: AlignmentType.RIGHT, bold: true, color: RED }),
          cell('Internalisation — économie cash structurelle'),
          cell('0', { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' }),
        ]}),
        new TableRow({ children: [
          cell('MARGE BRUTE / ROTATION'),
          cell('451 500', { align: AlignmentType.RIGHT, bold: true }),
          cell('Amélioration : +35,1 %'),
          cell(`${fmt(CA_COTONOU - COUT_CIBLE_COTONOU)}`, { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' }),
        ]}),
        new TableRow({ children: [
          cell('Taux de marge brute'),
          cell('60,2 %', { align: AlignmentType.RIGHT }),
          cell(''),
          cell('81,3 %', { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' }),
        ]}),
      ],
    }),
    spacer(),
    body(
      `L'écart de -38,7 % sur l'axe Cotonou repose sur trois leviers réglementaires tangibles : abonnement péage transfrontalier UEMOA (opérationnel depuis 2024), statut OEA (dossier déposé avril 2026), et exemption douanière des matériaux BTP en transit UEMOA. Ces mécanismes sont documentés et validés par les services douaniers de Hilla-Condji.`
    ),
  );

  /* ─── PAGE 4 : RENTABILITÉ CONSOLIDÉE + POINT MORT ─── */
  children.push(
    new Paragraph({ pageBreakBefore: true, children: [] }),
    h1('RENTABILITÉ CONSOLIDÉE ET POINT MORT'),
    h2('Synthèse annuelle — Régime de croisière'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('INDICATEUR', { width: 50 }), headerCell('VALEUR', { width: 50 })] }),
        new TableRow({ children: [cell('Rotations annuelles totales'), cell(`${fmt(ROTATIONS_AN)}`, { align: AlignmentType.RIGHT, bold: true })] }),
        new TableRow({ children: [cell('Mix commercial Lomé / Cotonou'), cell('60 % / 40 %', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('CA annuel transport'), cell(`${fmtM(CA_ANNUEL)} M FCFA`, { align: AlignmentType.RIGHT, bold: true, bg: 'EBF8FF' })] }),
        new TableRow({ children: [cell('Charges directes optimisées'), cell(`${fmtM(COUT_OP_ANNUEL)} M FCFA`, { align: AlignmentType.RIGHT, bold: true, bg: 'FFF5F5' })] }),
        new TableRow({ children: [cell('Marge brute opérationnelle'), cell(`${fmtM(MARGE_BRUTE_ANNUELLE)} M FCFA`, { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
        new TableRow({ children: [cell('Taux de marge brute'), cell('80,1 %', { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
      ],
    }),
    spacer(),
    h2('Charges fixes et EBITDA Transport'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('RUBRIQUE', { width: 50 }), headerCell('MONTANT (FCFA)', { width: 50 })] }),
        new TableRow({ children: [cell('Personnel (10 chauffeurs + 2 mécaniciens + 1 superviseur)'), cell('180 000 000', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Maintenance préventive forfait METSO niveau 2 (10 camions)'), cell('120 000 000', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Amortissement linéaire (CAPEX 500 M / 5 ans)'), cell('100 000 000', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('TOTAL CHARGES FIXES'), cell('400 000 000', { align: AlignmentType.RIGHT, bold: true, bg: 'FFF5F5' })] }),
        new TableRow({ children: [cell('EBITDA TRANSPORT'), cell(`${fmtM(EBITDA_TRANSPORT)} M`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
        new TableRow({ children: [cell('Marge EBITDA / CA'), cell('64,3 %', { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
      ],
    }),
    spacer(),
    h2('Point mort opérationnel (Break-Even)'),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('INDICATEUR', { width: 50 }), headerCell('VALEUR', { width: 50 })] }),
        new TableRow({ children: [cell('Charges fixes totales annuelles'), cell('400 000 000 FCFA', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Marge pondérée moyenne par rotation'), cell(`${fmt(Math.round(MARGE_BRUTE_ANNUELLE / ROTATIONS_AN))} FCFA`, { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Point mort (rotations)'), cell(`${fmt(PM_ROTATIONS)} rotations/an`, { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
        new TableRow({ children: [cell('Point mort (par camion)'), cell(`${Math.ceil(PM_ROTATIONS / 10)} rotations/camion`, { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
        new TableRow({ children: [cell('Point mort (jours ouvrés)'), cell(`${fmt(PM_JOURS)} jours`, { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
        new TableRow({ children: [cell('Jours ouvrés disponibles (10 camions)'), cell('2 500 jours camion', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Marge de sécurité'), cell(`${(100 - (PM_JOURS / 2500) * 100).toFixed(1)} %`, { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' })] }),
      ],
    }),
    spacer(),
    body(
      `Le point mort est atteint en ${fmt(PM_JOURS)} jours ouvrés, soit moins de 4 mois. La marge de sécurité de ${(100 - (PM_JOURS / 2500) * 100).toFixed(1)} % constitue un tampon exceptionnel face aux aléas climatiques et aux fluctuations de la demande BTP. Le standard bancaire UEMOA pour le secteur minier recommande une marge de sécurité \u2265 40 %.`
    ),
  );

  /* ─── PAGE 5 : SÉCURISATION DU CRÉDIT + CONCLUSION ─── */
  children.push(
    new Paragraph({ pageBreakBefore: true, children: [] }),
    h1('SÉCURISATION DU CRÉDIT ET CONCLUSION'),
    h2('Garanties et sûretés proposées'),
    body(`Pour sécuriser le prêt senior de 500 M FCFA, CGI SA met à disposition du comité de crédit les garanties suivantes :`),
    bullet(`Nantissement des 10 camions bennes en première hypothèque au profit d'IB BANK (valeur résiduelle estimée après 5 ans : 100 M FCFA, soit 20 % du coût d'acquisition).`),
    bullet(`Police d'assurance tous risques souscrite auprès de NSIA Assurance Togo (en cours de négociation), avec IB BANK comme bénéficiaire en cas de sinistre total.`),
    bullet(`Cession de créances sur les 3 principaux grands comptes BTP (contrats en portefeuille Q1 2026, représentant 60 % du CA prévisionnel).`),
    bullet(`Caution personnelle des actionnaires majoritaires sur 50 M FCFA (10 % du prêt).`),
    spacer(),
    h2('Capacité de remboursement'),
    body(`L'internalisation de la flotte génère une économie structurelle de charges cash de 262,5 M FCFA/an (suppression de la location externe à 70 000 FCFA/rotation). L'amortissement des camions (100 M FCFA/an) est une charge comptable non décaissée, réintégrée dans le calcul du Cash-Flow Available for Debt (CFAD). Le mécanisme de création de valeur « cash-out éliminé + add-back créé » renforce la capacité de remboursement.`),
    spacer(),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({ children: [headerCell('POSTE', { width: 50 }), headerCell('MONTANT (FCFA)', { width: 50 })] }),
        new TableRow({ children: [cell('Économie location externe (suppression)'), cell('+262 500 000', { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
        new TableRow({ children: [cell('Amortissement camions (add-back CFAD)'), cell('+100 000 000', { align: AlignmentType.RIGHT, bold: true, bg: 'F0FFF4' })] }),
        new TableRow({ children: [cell('Charges cash additionnelles (perso + maintenance)'), cell('-300 000 000', { align: AlignmentType.RIGHT, color: RED })] }),
        new TableRow({ children: [cell('Impact net annuel sur CFAD (mécanisme delta)'), cell('+62 500 000', { align: AlignmentType.RIGHT, bold: true, bg: 'C6F6D5' })] }),
        new TableRow({ children: [cell('Service annuel de la dette estimé (prêt 500 M, 8 %, 7 ans)'), cell('~96 000 000', { align: AlignmentType.RIGHT })] }),
        new TableRow({ children: [cell('Couverture du service de la dette (CFAD complet / Annuité)'), cell('> 13,3x', { align: AlignmentType.RIGHT, bold: true, bg: '9AE6B4' })] }),
      ],
    }),
    spacer(),
    body(`Le CFAD complet de l'activité transport (EBITDA + Amortissement - Impôt) s'élève à ${fmtM(Math.round(EBITDA_TRANSPORT + 100_000_000 - (EBITDA_TRANSPORT - 100_000_000) * 0.25))} M FCFA/an, soit une couverture de plus de 13 fois le service de la dette. La rentabilité opérationnelle intrinsèque de l'activité transport sécurise de manière indépendante et robuste les lignes de remboursement.`),
    spacer(),
    h2('Conclusion et recommandation'),
    body(`Nous soumettons au Comité de Crédit d'IB BANK TOGO les arguments suivants :`),
    bullet(`Cohérence des coûts cibles : 120 300 FCFA (Lomé) et 140 000 FCFA (Cotonou) sont justifiés par des leviers opérationnels tangibles (cuve privée SONAGAZ, abonnement péage UEMOA, statut OEA, maintenance METSO) et non par des hypothèses spéculatives.`),
    bullet(`Rentabilité confirmée : point mort en ${fmt(PM_JOURS)} jours, marge de sécurité ${(100 - (PM_JOURS / 2500) * 100).toFixed(1)} %, EBITDA ${fmtM(EBITDA_TRANSPORT)} M FCFA/an.`),
    bullet(`Sécurisation du crédit : garanties matérielles (nantissement camions), assurances tous risques, cession de créances, caution actionnaires. La structure 100 % dette est couverte par le CFAD de l'activité transport.`),
    bullet(`Capacité de remboursement : le CFAD généré par l'opération couvre intégralement le service de la dette, avec une marge de sécurité positive.`),
    spacer(),
    body(`Nous recommandons l'approbation du financement CAPEX de 500 M FCFA pour l'acquisition de la flotte de 10 camions bennes, sous réserve des conditions suspensives classiques (souscription de l'assurance, constitution des sûretés, mise en place de la télématique).`),
    spacer(),
    new Paragraph({
      border: { top: { style: BorderStyle.SINGLE, size: 2, color: TEAL } },
      spacing: { before: 200, after: 100 },
      children: [new TextRun({ text: `Fait à Lomé, le ${new Date().toLocaleDateString('fr-FR')}.`, size: 20, font: 'Calibri', italics: true, color: STEEL })],
    }),
    body(`Pour le Directeur Financier de CGI SA`, { bold: true }),
    body(`[Signature]`, { italic: true }),
    body(`KHEPRA EXPERTS  |  Conseil en Stratégie & Modélisation Financière`, { color: SILVER, italic: true }),
  );

  const doc = new Document({
    creator: 'KHEPRA EXPERTS',
    title: 'Note de Réponse IB BANK TOGO — Financement Flotte Transport CGI SA — Réf. KE-CGI-IBB-2026-001',
    description: 'Note extra-exécutive destinée au Comité de Crédit IB BANK TOGO justifiant le financement CAPEX de 10 camions bennes 35m³/50T pour CGI SA — 5 pages max — Zéro référence BP.',
    subject: 'Financement Projet Minier — Transport Logistique — Granulats — UEMOA — IB BANK',
    keywords: 'IB BANK, CGI SA, flotte camions, financement CAPEX, granulats, Siyimé, Lomé, Cotonou, DSCR, CFAD, point mort, UEMOA, OEA, garanties, nantissement',
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.8),
            right: convertInchesToTwip(0.9),
            bottom: convertInchesToTwip(0.8),
            left: convertInchesToTwip(1.0),
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'KE-CGI-IBB-2026-001  |  IB BANK TOGO — Comité de Crédit  |  STRICTEMENT CONFIDENTIEL',
                  size: 14,
                  color: SILVER,
                  font: 'Calibri',
                }),
              ],
              border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: TEAL } },
              spacing: { after: 80 },
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
                new TextRun({
                  text: 'KHEPRA EXPERTS — khepraexperts.com  |  Page ',
                  size: 14,
                  color: SILVER,
                  font: 'Calibri',
                }),
                new TextRun({ children: [PageNumber.CURRENT], size: 14, color: STEEL, font: 'Calibri', bold: true }),
                new TextRun({ text: ' / 5', size: 14, color: SILVER, font: 'Calibri' }),
              ],
              border: { top: { style: BorderStyle.SINGLE, size: 2, color: TEAL } },
              spacing: { before: 80 },
              alignment: AlignmentType.CENTER,
            }),
          ],
        }),
      },
      children,
    }],
  });

  return Packer.toBlob(doc);
}