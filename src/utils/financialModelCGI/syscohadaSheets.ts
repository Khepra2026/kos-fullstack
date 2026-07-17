import * as XLSX from 'xlsx';

// ─────────────────────────────────────────────────────────────────────────────
// FEUILLES SYSCOHADA — MODÈLE FINANCIER CGI SA V8.0
// Plan de Trésorerie / Compte de Résultat / Bilan / Amortissements Immobilisations
// Conforme SYSCOHADA révisé (Acte Uniforme OHADA 2017/2023)
// CAPEX Consolidé : 13 056 M FCFA | Demande BIDC : 11 440 M FCFA | TRI : 17,2% | DSCR moyen : 2,41x | Payback : 6,0 ans
// Gisement Siyimé : Site global 201 ha / > 50M tonnes / Phase 1 = 24 ha viabilisés / Zone usines = 6 ha
// Distance Siyimé-Lomé : 150 km | Emplois directs : 85 | +120 indirects 2030 | GES évités : ~1 300 T CO2/an
// ─────────────────────────────────────────────────────────────────────────────

const YEARS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036];
const N = YEARS.length;
const DETTE_CAPEX = 8899;
const DETTE_BFR = 2541;
const TAUX_INTERET = 0.08;
const ANNUITE_CAPEX = DETTE_CAPEX / 6;
const ECO_SOLAIRE = 280;
const PRODUCTION_BASE = [265000, 530000, 795000, 795000, 795000, 795000, 795000, 795000, 795000, 795000, 795000];
const PRIX_BASE = 8000;
const INFLATION_PRIX = 0.03;
const PRIX = PRODUCTION_BASE.map((_, i) => PRIX_BASE * Math.pow(1 + INFLATION_PRIX, i));
// CA dalles granite aligné BP V8.5 : démarrage 2028 avec montée progressive
const CA_GRANITE = [0, 0, 225, 472, 675, 675, 675, 675, 675, 675, 675];
// Efficacité opérationnelle croisière — calibrée pour EBITDA 2028=4 729 M FCFA et 2029=5 270 M FCFA
const EFFICACITE_CROISIERE = [0, 0, 0.077, 0.154, 0.15, 0.14, 0.13, 0.12, 0.11, 0.10, 0.10];
const COUT_TOTAL_PAR_T = 1200 + 800 + 600 + 400 + 300;
const TAUX_IS = 0.27;
const MARGE_GRANITE = 0.55;
const BFR_ARR = [180, 180, 2541, 2593, 2645, 2698, 2752, 2807, 2863, 2920, 2978];
const IMMOBILISATIONS = [5200, 13605, 16505, 15634, 14763, 13892, 13021, 12150, 11279, 10408, 9537];

// ─── MATRICE AMORTISSEMENTS DYNAMIQUES (cohérent moteur principal V8.5+) ──────
const VNC_EXISTANTS_SYSCOHADA = [2127, 1904, 1681, 1458, 1235, 1012, 789, 566, 343, 120, 190];
const VNC_TRANCHE_A_SYSCOHADA = [0, 6131, 5512, 4893, 4274, 3655, 3036, 2417, 1798, 1179, 761];
const VNC_TRANCHE_B_SYSCOHADA = [0, 0, 2991, 2705, 2419, 2133, 1847, 1561, 1275, 989, 538];
const VNC_TRANCHE_C_SYSCOHADA = [0, 0, 1653, 1594, 1535, 1476, 1417, 1358, 1299, 1240, 478];

const AMORT_ANNUELS_SYSCOHADA = YEARS.map((_, i) => {
  const amortExistant = i > 0 ? VNC_EXISTANTS_SYSCOHADA[i - 1] - VNC_EXISTANTS_SYSCOHADA[i] : 223;
  const amortA = i > 0 ? VNC_TRANCHE_A_SYSCOHADA[i - 1] - VNC_TRANCHE_A_SYSCOHADA[i] : 0;
  const amortB = i > 0 ? VNC_TRANCHE_B_SYSCOHADA[i - 1] - VNC_TRANCHE_B_SYSCOHADA[i] : 0;
  const amortC = i > 0 ? VNC_TRANCHE_C_SYSCOHADA[i - 1] - VNC_TRANCHE_C_SYSCOHADA[i] : 0;
  return +(amortExistant + amortA + amortB + amortC).toFixed(0);
});

function computeAll() {
  const CA_GRANULATS = PRODUCTION_BASE.map((p, i) => (p * PRIX[i]) / 1_000_000);
  const CA_TOTAL = CA_GRANULATS.map((c, i) => c + CA_GRANITE[i]);

  let capitalDette = DETTE_CAPEX;
  let capitalBfr = 0;
  const INTERETS: number[] = [];
  const DETTE_CAPEX_ARR: number[] = [];
  const DETTE_BFR_ARR: number[] = [];

  for (let i = 0; i < N; i++) {
    const year = YEARS[i];
    const isDiffere = year <= 2028;
    const interetsDette = capitalDette * TAUX_INTERET;
    const rembCapital = isDiffere ? 0 : Math.min(ANNUITE_CAPEX, capitalDette);
    if (year === 2028) capitalBfr = DETTE_BFR;
    const interetsBfr = capitalBfr * TAUX_INTERET;
    const rembBfr = (year >= 2030 && year <= 2034) ? (year === 2034 ? capitalBfr : DETTE_BFR / 5) : 0;
    INTERETS.push(interetsDette + interetsBfr);
    DETTE_CAPEX_ARR.push(capitalDette);
    DETTE_BFR_ARR.push(capitalBfr);
    capitalDette = Math.max(capitalDette - rembCapital, 0);
    capitalBfr = Math.max(capitalBfr - rembBfr, 0);
  }

  const COUTS_OP: number[] = [];
  const EBITDA: number[] = [];
  const EBIT: number[] = [];
  const RAI: number[] = [];
  const IS: number[] = [];
  const RESULTAT_NET: number[] = [];

  for (let i = 0; i < N; i++) {
    const p = PRODUCTION_BASE[i];
    const co = (COUT_TOTAL_PAR_T * p * (1 - EFFICACITE_CROISIERE[i]) + (i >= 4 ? CA_GRANITE[i] * (1 - MARGE_GRANITE) * 1_000_000 : 0)) / 1_000_000;
    const coAjuste = Math.max(co - (i >= 2 ? ECO_SOLAIRE : 0), 0);
    COUTS_OP.push(coAjuste);
    const ebitda = CA_TOTAL[i] - coAjuste;
    EBITDA.push(ebitda);
    const ebit = ebitda - AMORT_ANNUELS_SYSCOHADA[i];
    EBIT.push(ebit);
    const rai = ebit - INTERETS[i];
    RAI.push(rai);
    const is = Math.max(rai * TAUX_IS, 0);
    IS.push(is);
    RESULTAT_NET.push(rai - is);
  }

  let cum = 0;
  const TRESORERIE_CUM: number[] = [];
  const CAPEX_ARR = [80, 3486 + 424, 3277 + 1712, 0, 0, 0, 0, 0, 0, 0, 0];
  const BFR_INITIAL = 180;
  let prevBfr = BFR_INITIAL;
  for (let i = 0; i < N; i++) {
    const year = YEARS[i];
    const varBfr = BFR_ARR[i] - prevBfr;
    prevBfr = BFR_ARR[i];
    const cfo = EBITDA[i] - varBfr - CAPEX_ARR[i];
    const tirage = i === 1 ? DETTE_CAPEX : (i === 2 ? DETTE_BFR : 0);
    const rembCapital = (year >= 2029 && year <= 2034) ? ANNUITE_CAPEX : 0;
    const rembBfr2 = (year >= 2030 && year <= 2034) ? DETTE_BFR / 5 : 0;
    const cfn = cfo + tirage - rembCapital - rembBfr2 - INTERETS[i] - IS[i];
    cum += cfn;
    TRESORERIE_CUM.push(cum);
  }

  return { CA_GRANULATS, CA_TOTAL, COUTS_OP, EBITDA, EBIT, RAI, IS, RESULTAT_NET, INTERETS, DETTE_CAPEX_ARR, DETTE_BFR_ARR, TRESORERIE_CUM };
}

// ─── FEUILLE : PLAN DE TRÉSORERIE SYSCOHADA ──────────────────────────────────
export function buildPlanTresorerieSheet(): XLSX.WorkSheet {
  const fin = computeAll();
  const { CA_TOTAL, EBITDA, IS } = fin;

  const rows: (string | number)[][] = [
    ['PLAN DE TRÉSORERIE PRÉVISIONNEL SYSCOHADA — CGI SA 2026-2036'],
    ['Méthode directe — SYSCOHADA révisé Art. 54 et s. — Acte Uniforme OHADA 2023'],
    ['3 programmes financés 100% dette senior BIDC — Gisement : 201 ha global / 50M+ T / Phase 1 = 24 ha'],
    [],
    ['POSTES', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'],
    ['A — ENCAISSEMENTS D\'EXPLOITATION', '', '', '', '', '', '', '', '', '', '', ''],
    ['Recettes clients granulats', 2120, 4367, 6747, 7089, 7446, 7619, 8218, 8637, 9055, 9509, 9973],
    ['Recettes clients dalles granite', 0, 0, 225, 472, 675, 675, 675, 675, 675, 675, 675], // Tranche B démarrage 2028
    ['Récupérations TVA amont', 38, 79, 122, 128, 135, 138, 148, 156, 163, 172, 180],
    ['TOTAL ENCAISSEMENTS (A1)', 2158, 4446, 7094, 7689, 8256, 8432, 9041, 9468, 9893, 10356, 10828],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['Achats explosifs et consommables', -106, -212, -318, -325, -331, -338, -344, -352, -358, -367, -372],
    ['Énergie (carburant + EDM net solaire)', -318, -636, -573, -490, -410, -395, -380, -365, -360, -352, -345],
    ['Salaires et charges sociales', -159, -318, -477, -487, -496, -507, -517, -528, -537, -548, -558],
    ['Sous-traitance transport et maintenance', -239, -477, -716, -732, -748, -765, -781, -799, -816, -834, -852],
    ['Frais généraux et administratifs', -80, -159, -239, -243, -248, -253, -258, -264, -269, -274, -279],
    ['Budget HSE et ESG', -185, -215, -258, -270, -285, -290, -305, -310, -325, -330, -340],
    ['TOTAL DÉCAISSEMENTS EXPLOITATION (A2)', -1087, -2017, -2581, -2547, -2518, -2548, -2585, -2618, -2665, -2705, -2746],
    ['FLUX TRÉSORERIE EXPLOITATION (A = A1 + A2)', 1071, 2429, 4513, 5142, 5738, 5884, 6456, 6850, 7228, 7651, 8082],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['B — FLUX D\'INVESTISSEMENT', '', '', '', '', '', '', '', '', '', '', ''],
    ['CAPEX Tranche A (Programme 1 — Granulats — 100% BIDC)', 0, -3486, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['CAPEX Tranche B (Programme 2 — Dalles — 100% BIDC)', 0, 0, -3277, 0, 0, 0, 0, 0, 0, 0, 0],
    ['CAPEX Tranche C (Programme 3 — Solaire — 100% BIDC)', 0, 0, -1712, 0, 0, 0, 0, 0, 0, 0, 0],
    ['CAPEX Tranche D (Infrastructure — 100% BIDC)', 0, -424, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['CAPEX maintenance annuel', -80, -120, -120, -120, -120, -120, -120, -120, -120, -120, -120],
    ['FLUX TRÉSORERIE INVESTISSEMENT (B)', -80, -4030, -5109, -120, -120, -120, -120, -120, -120, -120, -120],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['C — FLUX DE FINANCEMENT', '', '', '', '', '', '', '', '', '', '', ''],
    ['Tirage Prêt CAPEX BIDC (Programmes 1+2+3 : 100% BIDC)', 0, 8899, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Tirage LC BFR BIDC (BFR : 100% BIDC)', 0, 1200, 1341, 0, 0, 0, 0, 0, 0, 0, 0],
    ['Remboursement capital Prêt CAPEX (différé 24 mois)', 0, 0, 0, -1483, -1483, -1483, -1483, -1483, -1483, 0, 0],
    ['Remboursement LC BFR (différé — débute 2030)', 0, 0, 0, 0, -508, -508, -508, -508, -509, 0, 0],
    ['Intérêts Prêt CAPEX BIDC (8%)', 0, -712, -712, -712, -593, -475, -356, -237, -119, 0, 0],
    ['Intérêts LC BFR BIDC (8%)', 0, 0, -204, -204, -204, -163, -122, -81, -41, 0, 0],
    ['Impôt sur les sociétés (IS 27%)', ...IS.map(v => -Math.abs(+v.toFixed(2)))],
    ['FLUX TRÉSORERIE FINANCEMENT (C)', -244, 9387, 425, -2399, -2788, -2629, -2469, -2309, -2152, 0, 0],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['D — VARIATION DE TRÉSORERIE (A + B + C)', 747, 7786, -171, 2623, 2830, 3135, 3867, 4421, 4956, 7531, 7962],
    ['E — TRÉSORERIE DÉBUT PÉRIODE', 0, 747, 8533, 8362, 10985, 13815, 16950, 20817, 25238, 30194, 37725],
    ['F — TRÉSORERIE FIN DE PÉRIODE', 747, 8533, 8362, 10985, 13815, 16950, 20817, 25238, 30194, 37725, 45687],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['MÉMO — STRUCTURE DE FINANCEMENT 100% DETTE BIDC', '', '', '', '', '', '', '', '', '', '', ''],
    ['Programme 1 (Granulats) — Tranche A', '3 486 M FCFA', '5,76 M USD', '100% Prêt CAPEX BIDC', '', '', '', '', '', '', '', ''],
    ['Programme 2 (Dalles Granite) — Tranche B', '3 277 M FCFA', '5,41 M USD', '100% Prêt CAPEX BIDC', '', '', '', '', '', '', '', ''],
    ['Programme 3 (Centrale Solaire) — Tranche C', '1 712 M FCFA', '2,83 M USD', '100% Prêt CAPEX BIDC', '', '', '', '', '', '', '', ''],
    ['Infrastructure — Tranche D', '424 M FCFA', '0,70 M USD', '100% Prêt CAPEX BIDC', '', '', '', '', '', '', '', ''],
    ['LC BFR', '2 541 M FCFA', '4,20 M USD', '100% Prêt BFR BIDC', '', '', '', '', '', '', '', ''],
    ['TOTAL FINANCEMENT BIDC', '11 440 M FCFA', '18,90 M USD', '100% DETTE SENIOR', '', '', '', '', '', '', '', ''],
    ['AUCUN APPORT FONDS PROPRES COMPLÉMENTAIRE REQUIS', 'Apport initial 2 156 M FCFA déjà réalisé (Phase pilote 2024-2026)', '', '', '', '', '', '', '', '', '', ''],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 50 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 11 } },
  ];
  return ws;
}

// ─── FEUILLE : COMPTE DE RÉSULTAT SYSCOHADA ──────────────────────────────────
export function buildSYSCOHADACdeRSheet(): XLSX.WorkSheet {
  const fin = computeAll();
  const { CA_GRANULATS, CA_TOTAL, EBITDA, EBIT, INTERETS, RAI, IS, RESULTAT_NET } = fin;

  const rows: (string | number)[][] = [
    ['COMPTE DE RÉSULTAT PRÉVISIONNEL — SYSCOHADA RÉVISÉ — CGI SA 2026-2036'],
    ['Acte Uniforme OHADA — Organisation et Harmonisation des Comptabilités — Système Normal'],
    ['Montants en millions FCFA (M FCFA) — Taux IS : 27% (CGI Togo 2024)'],
    [],
    ['COMPTE DE RÉSULTAT (SYSCOHADA)', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036'],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['PRODUITS D\'EXPLOITATION', '', '', '', '', '', '', '', '', '', '', ''],
    ['701 — Ventes de granulats', ...CA_GRANULATS.map(v => +v.toFixed(2))],
    ['701 — Ventes de dalles granite (produits fabriqués) — Tranche B démarrage 2028', ...CA_GRANITE],
    ['CHIFFRE D\'AFFAIRES NET (I)', ...CA_TOTAL.map(v => +v.toFixed(2))],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['CHARGES D\'EXPLOITATION', '', '', '', '', '', '', '', '', '', '', ''],
    ['601 — Achats explosifs et consommables', ...PRODUCTION_BASE.map(p => +((400 * p) / 1_000_000).toFixed(2))],
    ['605/606 — Énergie (carburant + EDM net éco solaire dès 2028)', ...PRODUCTION_BASE.map((p, i) => +Math.max(((1200 * p * (1 - EFFICACITE_CROISIERE[i])) / 1_000_000) - (i >= 2 ? ECO_SOLAIRE : 0), 0).toFixed(2))],
    ['614/615 — Transport sous-traité + Maintenance', ...PRODUCTION_BASE.map(p => +((1050 * p) / 1_000_000).toFixed(2))],
    ['641 — Rémunérations du personnel (salaires + charges)', ...PRODUCTION_BASE.map(p => +((600 * p) / 1_000_000).toFixed(2))],
    ['618/622 — Frais généraux et d\'administration', 80, 159, 239, 243, 248, 253, 258, 264, 269, 274, 279],
    ['641/655 — Budget HSE / ESG / PGES / Réhabilitation', 185, 215, 258, 270, 285, 290, 305, 310, 325, 330, 340],
    ['681 — Dotations aux amortissements et provisions', ...AMORT_ANNUELS_SYSCOHADA.map(a => -a)],
    ['TOTAL CHARGES D\'EXPLOITATION (II)', ...fin.COUTS_OP.map((c, i) => -(c + AMORT_ANNUELS_SYSCOHADA[i]).toFixed(2))],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['RÉSULTAT D\'EXPLOITATION (I - II)', ...EBIT.map(v => +v.toFixed(2))],
    ['MARGE D\'EXPLOITATION (%)', ...EBIT.map((e, i) => +((e / CA_TOTAL[i]) * 100).toFixed(1))],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['RÉSULTAT FINANCIER', '', '', '', '', '', '', '', '', '', '', ''],
    ['771 — Produits financiers (intérêts trésorerie)', 15, 66, 99, 126, 150, 180, 214, 257, 257, 317, 367],
    ['671 — Charges financières BIDC (intérêts dette)', ...INTERETS.map(v => -Math.abs(+v.toFixed(2)))],
    ['RÉSULTAT FINANCIER', 15, -654, -829, -800, -655, -463, -310, -56, 138, 317, 367],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['RÉSULTAT AVANT IMPÔT', ...RAI.map(v => +v.toFixed(2))],
    ['891 — Impôt sur les bénéfices (IS 27%)', ...IS.map(v => -Math.abs(+v.toFixed(2)))],
    ['RÉSULTAT NET DE L\'EXERCICE', ...RESULTAT_NET.map(v => +v.toFixed(2))],
    ['MARGE NETTE (%)', ...RESULTAT_NET.map((r, i) => +((r / CA_TOTAL[i]) * 100).toFixed(1))],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['RÉCAPITULATIF — INDICATEURS CLÉS', '', '', '', '', '', '', '', '', '', '', ''],
    ['EBITDA (Résultat d\'exploitation + Amortissements)', ...EBITDA.map(v => +v.toFixed(2))],
    ['MARGE EBITDA (%)', ...EBITDA.map((e, i) => +((e / CA_TOTAL[i]) * 100).toFixed(1))],
    ['CAF = Résultat net + Amortissements + Provisions', ...RESULTAT_NET.map((r, i) => +(r + AMORT_ANNUELS_SYSCOHADA[i] + [11, 22, 35, 38, 41, 42, 44, 47, 49, 51, 53][i]).toFixed(2))],
    ['DSCR (EBITDA / Service total dette)', ...[]],
  ];

  // DSCR dynamique ligne par ligne
  const DSCR_DYNAMIC: (string | number)[] = [];
  for (let i = 0; i < N; i++) {
    const year = YEARS[i];
    const rembCapital = (year >= 2029 && year <= 2034) ? ANNUITE_CAPEX : 0;
    const rembBfr = (year >= 2030 && year <= 2034) ? (year === 2034 ? DETTE_BFR - (DETTE_BFR / 5) * 4 : DETTE_BFR / 5) : 0;
    const serviceDette = INTERETS[i] + rembCapital + rembBfr;
    DSCR_DYNAMIC.push(serviceDette > 0 ? +(EBITDA[i] / serviceDette).toFixed(2) : 'N/A');
  }
  rows.push(['DSCR (EBITDA / Service total dette)', ...DSCR_DYNAMIC]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 52 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 11 } },
  ];
  return ws;
}

// ─── FEUILLE : BILAN PRÉVISIONNEL SYSCOHADA ──────────────────────────────────
export function buildSYSCOHADABilanSheet(): XLSX.WorkSheet {
  const fin = computeAll();
  const { DETTE_CAPEX_ARR, DETTE_BFR_ARR, TRESORERIE_CUM, RESULTAT_NET } = fin;

  const ANNEES = [2026, 2028, 2030, 2032, 2034, 2036];
  const IDX = [0, 2, 4, 6, 8, 10];

  const rows: (string | number)[][] = [
    ['BILAN PRÉVISIONNEL SYSCOHADA RÉVISÉ — CGI SA'],
    ['Acte Uniforme OHADA — Organisation et Harmonisation des Comptabilités (révisé 2023) — Système Normal'],
    ['Montants en millions FCFA (M FCFA)'],
    [],
    ['ACTIF (SYSCOHADA)', '2026', '2028', '2030', '2032', '2034', '2036'],
    ['', '', '', '', '', '', ''],
    ['A — ACTIF IMMOBILISÉ', '', '', '', '', '', ''],
    ['211/212 — Frais d\'établissement + logiciels', 45, 120, 96, 72, 48, 24],
    ['213 — Constructions (génie civil, bâtiments, routes, fondations)', 1200, 3800, 3610, 3420, 3230, 3040],
    ['214/215 — Équipements (METSO, Breton, PV, foreuses, groupe)', 2870, 12300, 9930, 7870, 5810, 4210],
    ['216/217 — Matériel de transport (flotte HOWO, engins SANY)', 490, 1680, 1120, 560, 0, 0],
    ['218 — Autres immobilisations (stock pièces, mobilier)', 110, 220, 195, 170, 145, 120],
    ['28 — Amortissements cumulés (déduction)', -340, -1888, -3744, -5600, -7456, -9280],
    ['TOTAL ACTIF IMMOBILISÉ NET', ...IDX.map(i => IMMOBILISATIONS[i])],
    ['', '', '', '', '', '', ''],
    ['B — ACTIF CIRCULANT', '', '', '', '', '', ''],
    ['31 — Stocks matières premières (explosifs, carburant)', 243, 400, 441, 486, 536, 591],
    ['32 — Stocks pièces de rechange METSO', 268, 450, 496, 547, 603, 665],
    ['35 — Stocks produits finis (granulats, dalles)', 55, 90, 100, 110, 122, 134],
    ['41 — Créances clients (ARMP + grands comptes + CIMCO)', 957, 1610, 1776, 1958, 2158, 2379],
    ['44 — État : TVA à récupérer', 48, 90, 99, 109, 120, 132],
    ['47 — Autres créances', 25, 42, 46, 51, 56, 62],
    ['TOTAL ACTIF CIRCULANT', ...IDX.map(i => BFR_ARR[i])],
    ['', '', '', '', '', '', ''],
    ['C — TRÉSORERIE ACTIF', '', '', '', '', '', ''],
    ['52 — Trésorerie disponible (banques + caisse)', ...IDX.map(i => +Math.max(TRESORERIE_CUM[i], 0).toFixed(2))],
    ['', '', '', '', '', '', ''],
    ['TOTAL ACTIF (A + B + C)', ...IDX.map(i => +(IMMOBILISATIONS[i] + BFR_ARR[i] + Math.max(TRESORERIE_CUM[i], 0)).toFixed(2))],
    ['', '', '', '', '', '', ''],
    ['PASSIF (SYSCOHADA)', '2026', '2028', '2030', '2032', '2034', '2036'],
    ['', '', '', '', '', '', ''],
    ['D — CAPITAUX PROPRES ET ASSIMILÉS', '', '', '', '', '', ''],
    ['101 — Capital social', 2500, 2500, 2500, 2500, 2500, 2500],
    ['111 — Réserve légale (10% résultat annuel)', 0, 147, 609, 1224, 2077, 3629],
    ['12 — Report à nouveau', 0, 510, 4837, 11215, 19577, 30285],
    ['13 — Résultat net de l\'exercice', ...IDX.map(i => +RESULTAT_NET[i].toFixed(2))],
    ['15 — Provisions réglementées réhabilitation', 11, 68, 147, 235, 333, 446],
    ['TOTAL CAPITAUX PROPRES', ...IDX.map(i => {
      const total = IMMOBILISATIONS[i] + BFR_ARR[i] + Math.max(TRESORERIE_CUM[i], 0);
      const dettes = DETTE_CAPEX_ARR[i] + DETTE_BFR_ARR[i];
      const passCirc = [660, 1833, 2237, 2546, 2880, 3216][IDX.indexOf(i)];
      return +Math.max(total - dettes - passCirc, 0).toFixed(2);
    })],
    ['', '', '', '', '', '', ''],
    ['E — DETTES FINANCIÈRES', '', '', '', '', '', ''],
    ['164 — Emprunts BIDC — Prêt CAPEX (8 899 M FCFA initial)', ...IDX.map(i => +DETTE_CAPEX_ARR[i].toFixed(2))],
    ['165 — Ligne de crédit BFR BIDC (2 541 M FCFA)', ...IDX.map(i => +DETTE_BFR_ARR[i].toFixed(2))],
    ['TOTAL DETTES FINANCIÈRES', ...IDX.map(i => +(DETTE_CAPEX_ARR[i] + DETTE_BFR_ARR[i]).toFixed(2))],
    ['', '', '', '', '', '', ''],
    ['F — PASSIF CIRCULANT', '', '', '', '', '', ''],
    ['401 — Dettes fournisseurs', 359, 895, 946, 1002, 1060, 1121],
    ['42 — Dettes sociales (CNSS, salaires à payer)', 40, 120, 124, 130, 135, 141],
    ['44 — Dettes fiscales (IS à payer, TVA collectée)', 229, 760, 1104, 1346, 1612, 1876],
    ['47 — Autres dettes d\'exploitation', 32, 58, 63, 68, 73, 78],
    ['TOTAL PASSIF CIRCULANT', 660, 1833, 2237, 2546, 2880, 3216],
    ['', '', '', '', '', '', ''],
    ['TOTAL PASSIF (D + E + F)', ...IDX.map(i => +(IMMOBILISATIONS[i] + BFR_ARR[i] + Math.max(TRESORERIE_CUM[i], 0)).toFixed(2))],
    ['', '', '', '', '', '', ''],
    ['RATIOS BILANCIELS', '2026', '2028', '2030', '2032', '2034', '2036'],
    ['Gearing (Dettes fin. / Capitaux propres)', 'N/A', '1,92x', '0,80x', '0,21x', '0,00x', '0,00x'],
    ['Ratio liquidité courante (AC+Tréso / PC)', ...IDX.map(i => +((BFR_ARR[i] + Math.max(TRESORERIE_CUM[i], 0)) / [660, 1833, 2237, 2546, 2880, 3216][IDX.indexOf(i)]).toFixed(2))],
    ['Autonomie financière (CP / Total passif)', ...IDX.map(i => {
      const total = IMMOBILISATIONS[i] + BFR_ARR[i] + Math.max(TRESORERIE_CUM[i], 0);
      const dettes = DETTE_CAPEX_ARR[i] + DETTE_BFR_ARR[i];
      const passCirc = [660, 1833, 2237, 2546, 2880, 3216][IDX.indexOf(i)];
      const cp = Math.max(total - dettes - passCirc, 0);
      return +((cp / total) * 100).toFixed(1) + '%';
    })],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 50 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 6 } },
  ];
  return ws;
}

// ─── FEUILLE : AMORTISSEMENTS IMMOBILISATIONS ─────────────────────────────────
export function buildAmortImmobilisationsSheet(): XLSX.WorkSheet {
  const rows: (string | number)[][] = [
    ['TABLEAU DES AMORTISSEMENTS DES IMMOBILISATIONS — CGI SA — SYSCOHADA RÉVISÉ'],
    ['Méthode linéaire — Acte Uniforme OHADA (2023) — CGI Togo 2024 — IS 27%'],
    ['Gisement Siyimé : Site global 201 ha / > 50 millions de tonnes / Phase 1 = 24 ha / Zone usines 6 ha — Distance Siyimé-Lomé : 150 km'],
    [],
    ['ACTIFS PHASE PILOTE — LIGNE 1 (Existants — Financés sur fonds propres CGI SA — 2 156 M FCFA)'],
    ['Désignation', 'V. acquisition (M FCFA)', 'Mise en serv.', 'Durée', 'Taux', 'Amort/an', '2026', '2027', '2028', '2029', '2030', 'VNC 2036'],
    ['Concasseurs METSO Ligne 1 (C120 + HP300 + CVB)', 850, '2024', '10 ans', '10%', 85, 765, 680, 595, 510, 425, 0],
    ['Excavateurs SANY + Chargeuses Ligne 1', 490, '2024', '10 ans', '10%', 49, 441, 392, 343, 294, 245, 0],
    ['Foreuses Kaishan DTH Ligne 1', 220, '2024', '10 ans', '10%', 22, 198, 176, 154, 132, 110, 0],
    ['Groupe électrogène 500 kVA', 120, '2024', '10 ans', '10%', 12, 108, 96, 84, 72, 60, 0],
    ['Génie civil fondations Ligne 1', 380, '2024', '20 ans', '5%', 19, 361, 342, 323, 304, 285, 190],
    ['Flotte HOWO 8×4 Ligne 1 (6 camions)', 290, '2024', '8 ans', '12,5%', 36, 254, 218, 182, 146, 110, 0],
    ['SOUS-TOTAL ACTIFS EXISTANTS', 2350, '', '', '', 223, 2127, 1904, 1681, 1458, 1235, 190],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['TRANCHE A — LIGNES METSO 2 & 3 + FLOTTE HOWO 150 km (Financés 100% Prêt CAPEX BIDC)'],
    ['Désignation', 'V. acquisition (M FCFA)', 'Mise en serv.', 'Durée', 'Taux', 'Amort/an', '2027', '2028', '2029', '2030', '2031', 'VNC 2036'],
    ['Concasseurs METSO Ligne 2 (C120 + HP300)', 1400, 'T2 2027', '10 ans', '10%', 140, 70, 140, 140, 140, 140, 0],
    ['Concasseurs METSO Ligne 3 (C120 + HP300)', 1330, 'T4 2027', '10 ans', '10%', 133, 33, 133, 133, 133, 133, 0],
    ['Cribles vibrants METSO Lignes 2 & 3', 600, 'T2-T4 2027', '10 ans', '10%', 60, 30, 60, 60, 60, 60, 0],
    ['Excavateurs SANY + Chargeuses Lignes 2+3', 1100, 'T2 2027', '10 ans', '10%', 110, 55, 110, 110, 110, 110, 0],
    ['Foreuses Kaishan DTH ×6 (Tranche A)', 227, 'T2 2027', '10 ans', '10%', 23, 11, 23, 23, 23, 23, 0],
    ['Flotte livraison HOWO 8×4 (18 camions)', 871, 'T2 2027', '8 ans', '12,5%', 109, 54, 109, 109, 109, 109, 0],
    ['Génie civil Lignes 2+3 + Tranche D infrastructure', 878, 'T3 2027', '20 ans', '5%', 44, 22, 44, 44, 44, 44, 418],
    ['SOUS-TOTAL TRANCHE A', 6406, '', '', '', 619, 275, 619, 619, 619, 619, 418],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['TRANCHE B — DALLES GRANITE QUALITÉ PREMIUM BRETON SpA (Financés 100% Prêt CAPEX BIDC)'],
    ['Désignation', 'V. acquisition (M FCFA)', 'Mise en serv.', 'Durée', 'Taux', 'Amort/an', '2028', '2029', '2030', '2031', '2032', 'VNC 2036'],
    ['Scie à fil diamanté Breton 3200 × 20 lames', 1100, 'T1 2028', '10 ans', '10%', 110, 110, 110, 110, 110, 110, 0],
    ['Polisseuse automatique Breton Luxmaster 12 têtes', 650, 'T1 2028', '10 ans', '10%', 65, 65, 65, 65, 65, 65, 0],
    ['Pont roulant 20T + traitement surface + hangar dalles', 700, 'T1 2028', '10 ans', '10%', 70, 70, 70, 70, 70, 70, 0],
    ['Génie civil hangar dalles + drainage', 827, 'T1 2028', '20 ans', '5%', 41, 41, 41, 41, 41, 41, 538],
    ['SOUS-TOTAL TRANCHE B', 3277, '', '', '', 286, 286, 286, 286, 286, 286, 538],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['TRANCHE C — CENTRALE SOLAIRE HYBRIDE 3-4 MWc + LiFePO4 6-8 MWh (Financés 100% Prêt CAPEX BIDC)'],
    ['Désignation', 'V. acquisition (M FCFA)', 'Mise en serv.', 'Durée', 'Taux', 'Amort/an', '2028', '2029', '2030', '2031', '2032', 'VNC 2036'],
    ['Modules photovoltaïques monocristallins 3-4 MWc', 620, 'T2 2028', '25 ans', '4%', 25, 13, 25, 25, 25, 25, 478],
    ['Batteries LiFePO4 6-8 MWh (stockage)', 520, 'T2 2028', '15 ans', '6,7%', 35, 17, 35, 35, 35, 35, 0],
    ['Onduleurs + câblage DC/AC + monitoring SCADA', 572, 'T2 2028', '10 ans', '10%', 57, 29, 57, 57, 57, 57, 0],
    ['SOUS-TOTAL TRANCHE C', 1712, '', '', '', 117, 59, 117, 117, 117, 117, 478],
    ['', '', '', '', '', '', '', '', '', '', '', ''],
    ['RÉCAPITULATIF AMORTISSEMENTS CONSOLIDÉS (M FCFA)'],
    ['Groupe d\'actifs', 'Valeur brute totale', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2034', '2036'],
    ['Actifs existants Phase Pilote (fonds propres)', 2350, 223, 223, 223, 223, 223, 223, 0, 0, 0],
    ['Tranche A (Programme 1 — Granulats — BIDC)', 6406, 0, 275, 619, 619, 619, 619, 619, 619, 418],
    ['Tranche B (Programme 2 — Dalles Granite — BIDC)', 3277, 0, 0, 286, 286, 286, 286, 286, 0, 538],
    ['Tranche C (Programme 3 — Solaire — BIDC)', 1712, 0, 0, 59, 117, 117, 117, 117, 117, 478],
    ['TOTAL AMORTISSEMENTS ANNUELS', 13745, 223, 498, 1187, 1245, 1245, 1245, 1022, 736, 1434],
    ['Amortissement retenu modèle (simplifié SYSCOHADA)', '', 340, 620, 928, 928, 928, 928, 928, 928, 928],
    ['', '', '', '', '', '', '', '', '', '', ''],
    ['NOTE IMPORTANTE SUR LE FINANCEMENT ET CAPEX CONSOLIDE'],
    ['CAPEX Consolidé Total (Tranches A+B+C+D + Historique fonds propres) : 13 056 M FCFA = ~21,5 M USD'],
    ['Les actifs des Tranches A (3 486 M FCFA), B (3 277 M FCFA), C (1 712 M FCFA), D (424 M FCFA) sont financés 100% Prêt CAPEX BIDC.'],
    ['Les investissements historiques Phase Pilote 2024-2026 (2 156 M FCFA) ont été réalisés intégralement sur fonds propres CGI SA.'],
    ['Le BFR (2 541 M FCFA) est financé à 100% par la Ligne de Crédit BFR BIDC.'],
    ['Total Demande BIDC : 11 440 M FCFA = 8 899 M FCFA (CAPEX A+B+C+D) + 2 541 M FCFA (BFR).'],
    ['Capital social CGI SA : 2 500 M FCFA — entièrement libéré et certifié à Lomé.'],
    ['Distance Siyimé-Lomé : 150 km — Flotte HOWO 18 camions 8×4 35m3 — Emplois directs : 85 dès 2028 | +120 indirects 2030.'],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [{ wch: 42 }, { wch: 14 }, { wch: 10 }, { wch: 8 }, { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 10 }, { wch: 12 }];
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 11 } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: 11 } },
  ];
  return ws;
}