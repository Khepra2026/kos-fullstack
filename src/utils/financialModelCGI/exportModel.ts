import * as XLSX from 'xlsx';
import { buildPlanTresorerieSheet, buildSYSCOHADACdeRSheet, buildSYSCOHADABilanSheet, buildAmortImmobilisationsSheet } from '';

// ─────────────────────────────────────────────────────────────────────────────
// EXPORT PRINCIPAL — MODÈLE FINANCIER CGI SA V6.0
// 16 feuilles : Inputs / Calculs / Outputs / Plan_Tresorerie / SYSCOHADA_CdeR /
// SYSCOHADA_Bilan / Amort_Immobilisations / Graphiques / Annexes / Scenarios /
// CAPEX_BIDC / OKR_KPI / Formules / DebtSchedule / WorkingCapital / Documentation
// ─────────────────────────────────────────────────────────────────────────────

function buildWorkingCapitalTailSheet(): XLSX.WorkSheet {
  const rows: (string | number | { f: string })[][] = [
    ['BESOIN EN FONDS DE ROULEMENT — FORMULES EXCEL — CGI SA'],
    ['Méthode : composantes par délai — Stocks + Créances - Dettes fournisseurs'],
    [],
    ['COMPOSANTES BFR 2028 (RÉGIME DE CROISIÈRE)'],
    ['Composante', 'Montant (M FCFA)', 'Formule Excel', 'Délai (jours)', '% du CA'],
    ['Stocks matières premières', 400, { f: 'Inputs!$C$16*Inputs!$C$23/1000000*45/360' }, '45', '5,7%'],
    ['Stocks pièces rechange METSO', 450, { f: 'Inputs!$C$31*0.04' }, 'Permanent', '6,5%'],
    ['Stocks produits finis granulats', 90, { f: 'Inputs!$C$16*Inputs!$C$7/1000000*7/360' }, '7', '1,3%'],
    ['Créances clients ARMP (public)', 1050, { f: 'Inputs!$C$16*Inputs!$C$7/1000000*0.35*75/360' }, '75', '15,1%'],
    ['Créances clients grands groupes', 350, { f: 'Inputs!$C$16*Inputs!$C$7/1000000*0.30*45/360' }, '45', '5,0%'],
    ['Créances clients CIMCO', 210, { f: 'Inputs!$C$16*Inputs!$C$7/1000000*0.18*30/360' }, '30', '3,0%'],
    ['Dettes fournisseurs', -359, { f: '-Inputs!$C$16*Inputs!$C$23/1000000*0.30*30/360' }, '30', '-5,2%'],
    ['BFR NET 2028', { f: 'SUM(B6:B12)' }, { f: 'SUM(C6:C12)' }, '—', '36,4%'],
    [],
    ['VARIATION DU BFR (M FCFA)'],
    ['Année', 'BFR début', 'BFR fin', 'Variation (besoin)'],
    ['2026', 180, 1311, 1131],
    ['2027', 1311, 1311, 0],
    ['2028', 1311, 2541, 1230],
    ['2029', 2541, 2593, 52],
    ['2030', 2593, 2645, 52],
    [],
    ['─ INSTRUCTIONS ─'],
    ['Ce BFR est calculé par FORMULES EXCEL à partir des paramètres de la feuille Inputs.'],
    ['Modifiez les délais de paiement (ARMP, fournisseurs) dans les formules C8, C12.'],
    ['Le % du CA se met à jour automatiquement lorsque vous modifiez la production ou le prix.'],
    ['La LC BIDC de 2 541 M FCFA couvre le BFR structurel à maturité.'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 32 }, { wch: 18 }, { wch: 42 }, { wch: 14 }, { wch: 14 }];
  return ws;
}

function buildDocumentationTailSheet(): XLSX.WorkSheet {
  const rows: (string | number)[][] = [
    ['DOCUMENTATION TECHNIQUE — MODÈLE FINANCIER CGI SA V6.0'],
    ['16 feuilles — Conforme SYSCOHADA révisé — Standard Big Four / BIDC / IFC'],
    [],
    ['─ STRUCTURE DU MODÈLE V6.0 ─'],
    ['Feuille', 'Rôle', 'Formules ?', 'Interactivité'],
    ['Inputs', 'Hypothèses de base (prix, production, coûts, CAPEX, dette, fiscalité, ESG)', 'Non — valeurs saisies', 'Modifiable par l\'utilisateur'],
    ['Calculs', 'Amortissements dette, amortissements SYSCOHADA, BFR, coûts opérationnels', 'Non — valeurs JS', 'Statique'],
    ['Outputs', 'États financiers (compte résultat, trésorerie, bilan, DSCR, VAN/TRI)', 'Non — valeurs JS', 'Statique'],
    ['Plan_Tresorerie', 'Plan de trésorerie SYSCOHADA — méthode directe — 3 programmes 100% BIDC', 'Non — valeurs JS', 'Statique'],
    ['SYSCOHADA_CdeR', 'Compte de résultat prévisionnel SYSCOHADA — système normal OHADA', 'Non — valeurs JS', 'Statique'],
    ['SYSCOHADA_Bilan', 'Bilan prévisionnel SYSCOHADA — actif/passif — ratios bilanciels', 'Non — valeurs JS', 'Statique'],
    ['Amort_Immobilisations', 'Tableau amortissements immobilisations par actif — SYSCOHADA linéaire', 'Non — valeurs JS', 'Statique'],
    ['Graphiques', 'Données brutes pour graphiques Excel — CA, DSCR, dette, cash-flow', 'Non — données brutes', 'Statique'],
    ['Annexes', 'Plan dette complet, BFR détaillé, recrutement, CAPEX, calendrier, sources', 'Non — données brutes', 'Statique'],
    ['Scenarios', 'Tableau de bord KPI + comparatif scénarios prédéfinis', 'Partiellement', 'Semi-interactif'],
    ['CAPEX_BIDC', 'Budget BIDC/EBID Mai 2026 — Tranches A/B/C/D + Phase 2', 'Non', 'Statique'],
    ['OKR_KPI', 'Cadre stratégique OKR/KPI 2026-2036 — 4 axes + tableau de bord', 'Non', 'Statique'],
    ['Formules', 'FORMULES EXCEL dynamiques référençant Inputs', 'OUI — formules natives', 'Interactif'],
    ['DebtSchedule', 'Plan de dette BIDC avec FORMULES EXCEL (amortissement dynamique)', 'OUI — formules natives', 'Interactif'],
    ['WorkingCapital', 'BFR avec FORMULES EXCEL (composantes par délai)', 'OUI — formules natives', 'Interactif'],
    ['Documentation', 'Guide utilisation et méthodologie (cette feuille)', 'Non — texte', 'Statique'],
    [],
    ['─ DONNÉES CLÉS DU PROJET ─'],
    ['Paramètre', 'Valeur', 'Source'],
    ['Site global réservé', '201 hectares', 'DGMG Togo + CORNERSTONE GP 2025'],
    ['Réserves totales estimées', '> 50 millions de tonnes', 'CORNERSTONE GP 2025 + DGMG'],
    ['Phase 1 — Surface viabilisée', '24 hectares', 'Première licence d\'exploitation DGMG'],
    ['Volume exploitable Phase 1', '11,9 millions de m³', 'Étude géologique CORNERSTONE GP 2025'],
    ['Profondeur exploitation', '60 mètres', 'Étude géologique CORNERSTONE GP 2025'],
    ['Durée vie Phase 1', '> 100 ans au régime 795 000 T/an', 'Calculé'],
    ['Financement Programme 1', '100% Prêt CAPEX BIDC — Tranche A 3 486 M FCFA', 'Budget BIDC/EBID Mai 2026'],
    ['Financement Programme 2', '100% Prêt CAPEX BIDC — Tranche B 3 277 M FCFA', 'Budget BIDC/EBID Mai 2026'],
    ['Financement Programme 3', '100% Prêt CAPEX BIDC — Tranche C 1 712 M FCFA', 'Budget BIDC/EBID Mai 2026'],
    ['Financement BFR', '100% LC BFR BIDC — 2 541 M FCFA', 'Budget BIDC/EBID Mai 2026'],
    ['Total financement BIDC', '11 440 M FCFA — 100% dette senior', 'bidc.org — Conditions 2024'],
    [],
    ['─ MÉTHODOLOGIE DES CALCULS SYSCOHADA ─'],
    ['Poste', 'Formule', 'Référence'],
    ['Amortissements équipements', 'Valeur brute × 10% / an (durée 10 ans)', 'SYSCOHADA — CGI Togo Art. 23'],
    ['Amortissements génie civil', 'Valeur brute × 5% / an (durée 20 ans)', 'SYSCOHADA — CGI Togo Art. 23'],
    ['Amortissements flotte', 'Valeur brute × 12,5% / an (durée 8 ans)', 'SYSCOHADA — CGI Togo Art. 23'],
    ['Amortissements PV solaire', 'Valeur brute × 4% / an (durée 25 ans)', 'IEC 61215 — SYSCOHADA'],
    ['IS (Impôt sur les Sociétés)', 'Résultat avant impôt × 27%', 'Code Général des Impôts Togo 2024'],
    ['DSCR', 'EBITDA / (Intérêts + Capital remboursé)', 'Covenant BIDC standard'],
    ['BFR', 'Stocks + Créances clients - Dettes fournisseurs', 'BIDC — Guide évaluation Section 4.3'],
    ['CAF', 'Résultat net + Amortissements + Provisions', 'SYSCOHADA révisé'],
    [],
    ['─ RÉFÉRENCES RÉGLEMENTAIRES ─'],
    ['BIDC — Guide d\'évaluation des projets d\'investissement (2023)'],
    ['IFC — Performance Standards on Environmental and Social Sustainability (rév. 2023)'],
    ['Principes Équateur IV (2020)'],
    ['Code Minier Togolais — Loi 2014-010 du 14 mai 2014'],
    ['Acte Uniforme OHADA — Droit des sociétés (rév. 2023)'],
    ['SYSCOHADA révisé — Plan comptable OHADA (Acte Uniforme 26 jan. 2017 révisé 2023)'],
    ['Code Général des Impôts Togo — Loi de finances 2024 (IS 27%)'],
    ['BCEAO — Rapport annuel Zone UEMOA 2024 (change : 605 FCFA/USD)'],
    ['CORNERSTONE GROUP INTERNATIONAL — Plan d\'Affaires 2026-2036'],
    ['DGMG Togo — Registre des titres miniers 2024'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 30 }, { wch: 40 }, { wch: 35 }, { wch: 25 }];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 3 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 3 } },
  ];
  return ws;
}

export async function generateFinancialModelFull(
  inputsSheet: XLSX.WorkSheet,
  calculsSheet: XLSX.WorkSheet,
  outputsSheet: XLSX.WorkSheet,
  graphiquesSheet: XLSX.WorkSheet,
  annexesSheet: XLSX.WorkSheet,
  scenariosSheet: XLSX.WorkSheet,
  capexBIDCSheet: XLSX.WorkSheet,
  okrKPISheet: XLSX.WorkSheet,
  formulesSheet: XLSX.WorkSheet,
  debtScheduleSheet: XLSX.WorkSheet,
  reconCAPEXSheet?: XLSX.WorkSheet,
  fundingPlanSheet?: XLSX.WorkSheet,
  checkBPSheet?: XLSX.WorkSheet,
  auditTrailSheet?: XLSX.WorkSheet,
): Promise<Blob> {
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, inputsSheet, 'Inputs');
  XLSX.utils.book_append_sheet(wb, calculsSheet, 'Calculs');
  XLSX.utils.book_append_sheet(wb, outputsSheet, 'Outputs');
  XLSX.utils.book_append_sheet(wb, buildPlanTresorerieSheet(), 'Plan_Tresorerie');
  XLSX.utils.book_append_sheet(wb, buildSYSCOHADACdeRSheet(), 'SYSCOHADA_CdeR');
  XLSX.utils.book_append_sheet(wb, buildSYSCOHADABilanSheet(), 'SYSCOHADA_Bilan');
  XLSX.utils.book_append_sheet(wb, buildAmortImmobilisationsSheet(), 'Amort_Immobilisations');
  XLSX.utils.book_append_sheet(wb, graphiquesSheet, 'Graphiques');
  XLSX.utils.book_append_sheet(wb, annexesSheet, 'Annexes');
  XLSX.utils.book_append_sheet(wb, scenariosSheet, 'Scenarios');
  XLSX.utils.book_append_sheet(wb, capexBIDCSheet, 'CAPEX_BIDC');
  XLSX.utils.book_append_sheet(wb, okrKPISheet, 'OKR_KPI');
  XLSX.utils.book_append_sheet(wb, formulesSheet, 'Formules');
  XLSX.utils.book_append_sheet(wb, debtScheduleSheet, 'DebtSchedule');
  XLSX.utils.book_append_sheet(wb, buildWorkingCapitalTailSheet(), 'WorkingCapital');
  // V8.6 — Nouvelles feuilles alignement BP
  if (reconCAPEXSheet) XLSX.utils.book_append_sheet(wb, reconCAPEXSheet, 'Recon_CAPEX');
  if (fundingPlanSheet) XLSX.utils.book_append_sheet(wb, fundingPlanSheet, 'Funding_Plan');
  if (checkBPSheet) XLSX.utils.book_append_sheet(wb, checkBPSheet, 'Check_BP');
  if (auditTrailSheet) XLSX.utils.book_append_sheet(wb, auditTrailSheet, 'Audit_Trail');
  XLSX.utils.book_append_sheet(wb, buildDocumentationTailSheet(), 'Documentation');

  const buffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
}



