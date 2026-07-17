import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  sp, h1, h2, h3, body, bullet, tbl, pb, infoBox, successBox, alertBox,
} from './helpers';

// ═══════════════════════════════════════════════════════════════════════════════
// NOTE DE CONFORMITÉ — CGI SA BUSINESS PLAN 2026-2036
// Document de 1 page présentant l'alignement sur les standards IFC/BIDC/BAD
// ═══════════════════════════════════════════════════════════════════════════════

export function complianceNote(): (Paragraph | Table)[] {
  return [
    h1('NOTE DE CONFORMITÉ'),
    sp(),
    body('La présente Note de Conformité atteste que le Business Plan CORNERSTONE GROUP INTERNATIONAL (CGI) SA 2026-2036 et le Modèle Financier associé ont été élaborés conformément aux standards suivants :'),
    sp(),
    h2('1. Standards institutionnels'),
    sp(),
    tbl(
      ['Standard', 'Référence', 'Conformité', 'Preuve'],
      [
        ['BIDC — Guide d\'évaluation des projets', 'Section 4.3 — BFR et Section 5.2 — Risques', 'Conforme', 'Modèle BFR granulaire — Matrice risques ISO 31000'],
        ['BIDC — Conditions de financement 2024', 'Taux fixe 8 % — durée 8 ans — différé 24 mois', 'Conforme', 'Structure dette Chapter 5 V.6'],
        ['BIDC — Banque Verte Framework', '30 % portefeuille vert — critères ENR', 'Conforme', 'Programme 3 solaire 3-4 MWc — réduction GES 35 %'],
        ['IFC Performance Standards', 'PS 1-8 — évaluation ESG complète', 'Conforme', 'Matrice PS Chapter 5 V.4 — PGES — audit externe'],
        ['Principes Équateur IV', 'Catégorie B — EIES simplifiée', 'Conforme', 'Classification EP4 — PGES documenté'],
        ['ISO 31000 — Risk Management', 'Évaluation risques — mitigation — monitoring', 'Conforme', 'Matrice risques Chapter 4 et 5 — triggers'],
        ['Code Minier Togolais', 'Loi 2014-010 — permis DGMG — réhabilitation', 'Conforme', 'Permis valide — budget réhabilitation 0,5 % CA'],
        ['Acte Uniforme OHADA', 'Droit des sociétés — SYSCOHADA révisé', 'Conforme', 'Gouvernance CA/Comité Audit/DG — comptes certifiés'],
        ['Code Général des Impôts Togo', 'IS 27 % — amortissements linéaires', 'Conforme', 'Fiscalité Chapter 3 III.1.3'],
      ],
      [25, 30, 15, 30]
    ),
    sp(),
    h2('2. Règles de rédaction Investment Committee Ready'),
    sp(),
    bullet('Ton neutre et factuel : les termes « leader », « preuve », « robuste confirmé » ont été systématiquement remplacés par des formulations prudentes (« acteur différencié », « les simulations suggèrent », « l\'analyse indique »).'),
    bullet('Hypothèses explicites : chaque projection financière est assortie d\'une hypothèse de base, d\'une source institutionnelle et d\'un scénario pessimiste.'),
    bullet('Aucune donnée non sourcée : toute donnée de marché provient de sources institutionnelles (World Bank, BAD, BCEAO, INSEED, ICMM, USGS). Les données sans source explicite sont qualifiées d\'hypothèses.'),
    bullet('Traçabilité des incohérences : les écarts identifiés entre les versions antérieures (CAPEX, BFR, timeline) ont été corrigés et documentés dans les notes de cohérence.'),
    bullet('Stress tests complet : le modèle a été testé avec des chocs simultanés (prix -15 %, énergie +30 %, retard 12 mois) et le DSCR reste supérieur au covenant dans les scénarios pessimistes individuels.'),
    sp(),
    h2('3. Vérification numérique et cohérence'),
    sp(),
    tbl(
      ['Élément vérifié', 'Version antérieure', 'Version V3.0', 'Écart résolu'],
      [
        ['CAPEX total consolidé', '10 290 M / 8 899 M (incoherence)', '8 899 M FCFA (14,7 M USD)', 'Alignement unique sur budget BIDC/EBID Mai 2026'],
        ['BFR structurel', '2 815 M / 2 541 M (incoherence)', '2 541 M FCFA (4,2 M USD)', 'Retenu avec marge sécurité 10 %'],
        ['Timeline Ligne 2', 'T2 2027 / T2 2028 (divergence)', 'T2 2027 (METSO)', 'Alignement calendrier Chapter 2 II.2'],
        ['EBITDA 2028', 'Valeur non benchmarkée', '4 729 M FCFA (marge 67,8 %)', 'Benchmark ICMM 35-50 % — valeur haute justifiée par solaire'],
        ['DSCR moyen', '1,91x (optimiste)', '1,85x (conservateur)', 'Recalcul avec charges financières complètes'],
        ['Seuil de rentabilité', '357 000 T / 362 000 T (divergence)', '362 000 T/an', 'Unification méthode charges fixes / marge variable'],
        ['BFR / CA 2028', '41,7 % / 45 % (divergence)', '41,7 % puis décroissance', 'Explication saisons + ARMP dans Chapter 3'],
      ],
      [25, 25, 25, 25]
    ),
    sp(),
    h2('4. Limites et réserves'),
    sp(),
    body('La présente Note de Conformité est soumise aux limites suivantes :'),
    bullet('Les projections financières 2026-2036 constituent des simulations fondées sur des hypothèses explicites. Elles ne constituent pas des garanties de résultats futurs.'),
    bullet('Les données de marché proviennent de sources publiques à la date d\'émission (Mai 2026). Toute modification significative du contexte macroéconomique (guerre, pandémie, choc énergétique majeur) pourrait invalider certaines hypothèses.'),
    bullet('La conformité ESG (IFC Performance Standards) est conditionnée à la mise en œuvre effective du PGES et à la réalisation des audits externes programmés.'),
    bullet('Le Modèle Financier Excel associé contient des formules de calcul intégrées. Toute modification manuelle des formules par l\'utilisateur rompt la traçabilité et invalide la présente attestation de conformité.'),
    sp(),
    successBox('Attestation : KHEPRA EXPERTS atteste que le Business Plan CGI SA 2026-2036 (Version 3.0) et le Modèle Financier Excel associé ont été élaborés conformément aux standards des institutions de financement du développement (BIDC, IFC, BAD) et aux meilleures pratiques du conseil stratégique international (niveau Big Four). Le dossier est directement présentable à un comité d\'investissement. Référence : KE-BP-CGI-2026-001-V3.0. Date : Mai 2026.'),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS — Cabinet de Conseil de Réputation Internationale', bold: true, size: 20, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 200, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Réf. KE-BP-CGI-2026-001-V3.0 | Mai 2026 | CONFIDENTIEL', size: 16, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
    pb(),
  ];
}