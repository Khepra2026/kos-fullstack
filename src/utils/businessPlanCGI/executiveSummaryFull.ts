import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, STEEL_LT, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  AMBER, AMBER_LT,
  sp, hr, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox, alertBox, kpiRow,
} from './helpers';

// ─── CHAPITRE EXECUTIVE SUMMARY COMPLET ──────────────────────────────────
// Standard Big Four / Investment Committee Ready
// Présentation CGI SA, vision stratégique, proposition de valeur,
// opportunité marché, avantages concurrentiels, besoins financiers,
// KPI (CA, EBITDA, TRI, VAN, DSCR), impact ESG

export function executiveSummaryFull(): (Paragraph | Table)[] {
  return [
    h1('RÉSUMÉ EXÉCUTIF — EXECUTIVE SUMMARY'),
    sp(),
    ...es1(),
    ...es2(),
    ...es3(),
    ...es4(),
    ...es5(),
    ...es6(),
    ...es7(),
    pb(),
  ];
}

// ─── ES.1 PRÉSENTATION SYNTHÉTIQUE ────────────────────────────────────────
function es1(): (Paragraph | Table)[] {
  return [
    h2('ES.1 Le Projet en 3 lignes'),
    sp(),
    body('CORNERSTONE GROUP INTERNATIONAL (CGI) SA est une Société Anonyme de droit OHADA, immatriculée au RCCM de Lomé sous le numéro TG-LFW-03-2023-B12-00047 et au NIF 1001909876, au capital social de 2 500 000 000 FCFA. La société exploite une carrière de granulats et de granite sur le site de Siyimé (District du Haho, Région des Plateaux, Togo). Adossée à un gisement de gneiss précambrien certifié LNBTP de 11,9 millions de mètres cubes exploitables sur une profondeur de 60 mètres — soit une durée de vie du site supérieure à 100 ans au régime de 795 000 T/an — CGI SA dispose d\'une base industrielle unique en Afrique de l\'Ouest. La société a démontré sa maîtrise opérationnelle lors d\'une phase pilote 2024-2026 entièrement financée sur fonds propres (3 470 M FCFA investis, dont un actif corporel existant de 2 156 M FCFA en matériel et équipements). CGI SA sollicite aujourd\'hui auprès de la BIDC une dette senior de 11 440 M FCFA pour industrialiser l\'exploitation à 795 000 tonnes par an et lancer deux programmes complémentaires (dalles de granite haut de gamme et centrale solaire 3-4 MWc).'),
    sp(),
    body('Le marché national des granulats au Togo est évalué à 340 milliards FCFA, structuralement sous-approvisionné. CGI SA cible une segmentation commerciale précise : 45 % grands comptes BTP (CIMCO, EBOMAF, marchés publics ARMP), 30 % promoteurs immobiliers et 10 % export vers le Bénin, complétée par le marché local des Plateaux. Cette diversification réduit le risque de concentration client et maximise la valorisation du gisement premium Siyimé.'),
    sp(),
  ];
}

// ─── ES.2 TABLEAU DE BORD KPI ─────────────────────────────────────────────
function es2(): (Paragraph | Table)[] {
  return [
    h2('ES.2 Indicateurs Clés de Performance — Scénario Central'),
    sp(),
    kpiRow([
      { label: 'TRI Projet (10 ans)', value: '16,8 %', sub: 'Taux actualisation 12% — supérieur au WACC' },
      { label: 'VAN (12%)', value: '3 150 M FCFA', sub: 'Valeur actuelle nette positive' },
      { label: 'DSCR moyen', value: '1,88x', sub: 'Covenant BIDC 1,3x — marge de 45 %' },
      { label: 'Payback', value: '5,8 ans', sub: 'Récupération CAPEX avant fin dette' },
    ]),
    sp(),
    kpiRow([
      { label: 'CAPEX total', value: '8 899 M FCFA', sub: '4 tranches A/B/C/D — 14,7 M USD' },
      { label: 'Demande BIDC', value: '11 440 M FCFA', sub: 'Dette senior 100 % — CAPEX + BFR' },
      { label: 'Production cible', value: '795 000 T/an', sub: 'Régime de croisière dès 2028' },
      { label: 'Marge EBITDA 2028', value: '68,2 %', sub: 'CA 7 015 M FCFA — EBITDA 4 785 M' },
    ]),
    sp(),
  ];
}

// ─── ES.3 OPPORTUNITÉ DE MARCHÉ ───────────────────────────────────────────
function es3(): (Paragraph | Table)[] {
  return [
    h2('ES.3 Opportunité de marché — Demande structurelle confirmée'),
    sp(),
    body('Le marché des granulats au Togo est évalué à 340 milliards FCFA (source : DGMG Togo — Bilan annuel mines et carrières 2024). Il est structurellement sous-approvisionné : le Plan National de Développement (PND 2025-2029) du Togo prévoit 1 200 km de routes bitumées, 50 000 logements sociaux et 12 nouveaux bâtiments publics, générant une demande estimée à 2,5 millions de tonnes de granulats sur la période. À l\'horizon 2028, CGI SA, avec 795 000 T/an, n\'adresserait que 9,4 % du marché adressable régional (SAM : 8,5 M T/an) — une part de marché conservatrice dans un marché en forte croissance structurelle (+5,5 %/an).'),
    sp(),
    tbl(
      ['Segment', 'Part cible', 'Volume cible (T/an)', 'Valeur (Mds FCFA)', 'Commentaire'],
      [
        ['Grands comptes BTP (CIMCO, EBOMAF, ARMP)', '45 %', '358 000', '2,9', 'Contrats cadre long terme — tarifs négociés — volumes garantis'],
        ['Promoteurs immobiliers et PME construction', '30 %', '238 000', '1,9', 'Marché privé Lomé — béton structure — fondations'],
        ['Export Bénin (CIMCO, grands comptes)', '10 %', '80 000', '0,7', 'Proximité 176 km — économie logistique vs Nigeria'],
        ['Marché local Plateaux (Kpalimé, Atakpamé)', '15 %', '119 000', '1,0', 'Faible coût transport — part de marché dominante locale'],
        ['TOTAL MARCHE ADRESSABLE CGI SA', '100 %', '795 000', '6,5', 'Part de marché = 9,4 % du SAM / 1,8 % du TAM'],
      ],
      [28, 14, 18, 14, 26]
    ),
    sp(),
  ];
}

// ─── ES.4 AVANTAGES CONCURRENTIELS ────────────────────────────────────────
function es4(): (Paragraph | Table)[] {
  return [
    h2('ES.4 Avantages concurrentiels — Différenciation VRIO'),
    sp(),
    body('CGI SA dispose de quatre avantages concurrentiels durables, validés par l\'analyse VRIO (Valuable, Rare, Inimitable, Organizationally supported) et renforcés par les données techniques du plan d\'affaires CORNERSTONE GP :'),
    sp(),
    tbl(
      ['Avantage concurrentiel', 'Éléments différenciants', 'Valeur créée', 'Durabilité'],
      [
        ['Gisement Siyimé Premium', 'Gneiss précambrien — 11,9 M m³ exploitables — profondeur 60 m — durée vie > 100 ans — masse volumique 2,63 g/cm³ certifiée LNBTP — aucun gisement équivalent dans un rayon de 150 km', '+15 % vs granulat standard — accès marchés aéroports et ouvrages d\'art', '> 100 ans (permis DGMG 10 ans renouvelable) — réserves stratégiques'],
        ['Technologie METSO & Qualité', 'Concasseurs C120 + HP300 — disponibilité documentée 92 % — spécifications LA < 22 %, MDE < 15 %, Absorption < 1,5 % — SAV bureau Accra', 'Taux de disponibilité 80 % vs 60 % concurrents locaux — qualité premium certifiée', 'Contrat SAV exclusif — pièces 7-14 jours — formation continue'],
        ['Diversification Dalles Granite', 'Marge brute 55 % vs 45 % granulats — marché premium — export Europe/Moyen-Orient', 'CA dalles 675 M FCFA/an — réduction dépendance BTP cyclique', 'Équipements Breton — savoir-faire transformé — impossible à imiter rapidement'],
        ['Autonomie Énergétique Solaire', '60 % autoconsommation 2029 — 280 M FCFA économie/an — réduction GES 35 %', 'Réduction OPEX structurelle — label Banque Verte BIDC — avantage compétitif coût', 'PV 25 ans — batteries 15 ans — avantage coût durable'],
      ],
      [20, 35, 25, 20]
    ),
    sp(),
  ];
}

// ─── ES.5 STRUCTURE DU FINANCEMENT ────────────────────────────────────────
function es5(): (Paragraph | Table)[] {
  return [
    h2('ES.5 Besoins financiers et structure du financement'),
    sp(),
    tbl(
      ['Instrument', 'Montant (M FCFA)', 'Conditions', 'Utilisation'],
      [
        ['Fonds propres CGI SA (historique)', '3 470', 'Déjà réalisés — 100 % engagés', 'Ligne 1 + phase pilote + R&D géologique'],
        ['Actifs corporels existants (équipements, matériel)', '2 156', 'Déjà acquis — inventaire certifié', 'Base industrielle actuelle — valorisation comptable auditée'],
        ['Dette senior BIDC — Prêt CAPEX', '8 899', '8 % fixe / 8 ans / différé 24 mois', 'Tranches A+B+C+D — 4 programmes industriels'],
        ['Dette senior BIDC — LC BFR', '2 541', '8 % / renouvelable / remb. 2030-2034', 'BFR structurel — stocks + créances ARMP'],
        ['TOTAL FINANCEMENT BIDC', '11 440', '100 % dette senior', '2027-2034'],
        ['TOTAL PROGRAMME D\'INVESTISSEMENT', '14 910', 'Fonds propres + dette senior', '2026-2036'],
      ],
      [22, 18, 22, 38]
    ),
    sp(),
    body('L\'investissement fondateur de 3 470 M FCFA, intégralement réalisé sur fonds propres entre 2023 et 2025, constitue la preuve tangible de l\'engagement des actionnaires. Parmi ce montant, 2 156 M FCFA sont consacrés à des actifs corporels (équipements METSO, excavateurs SANY, flotte HOWO, génie civil) dont l\'inventaire a été certifié par un cabinet d\'expertise comptable indépendant. Cette base patrimoniale existante renforce la solvabilité apparente de CGI SA et satisfait pleinement l\'exigence de participation actionnaire sans apport complémentaire requis pour le financement BIDC.'),
    sp(),
  ];
}

// ─── ES.6 IMPACT ESG ──────────────────────────────────────────────────────
function es6(): (Paragraph | Table)[] {
  return [
    h2('ES.6 Impact ESG et positionnement Banque Verte'),
    sp(),
    tbl(
      ['Dimension ESG', 'Indicateur clé', 'Valeur 2028', 'Valeur 2030', 'Alignement'],
      [
        ['Environnemental', 'Réduction émissions GES', '-35 %', '-40 %', 'IFC PS 3 — BIDC Banque Verte'],
        ['Environnemental', 'Autoconsommation solaire', '45 %', '60 %', 'NDC Togo 2025 — ODD 7'],
        ['Social', 'Emplois directs créés', '87', '115', 'IFC PS 2 — ODD 8'],
        ['Social', 'Recrutement local', '80 %', '82 %', 'IFC PS 7 — FPIC'],
        ['Gouvernance', 'Gearing (désendettement)', '1,90x', '0,80x', 'BIDC Covenant ≤ 3,0x'],
        ['Gouvernance', 'Score audit ESG externe', '> 75/100', '> 80/100', 'IFC PS 1 — GRI Standards'],
        ['Contribution fiscale', 'IS + TVA + redevances', '2 033 M FCFA', '2 482 M FCFA', 'Code Général des Impôts Togo'],
      ],
      [18, 22, 14, 14, 32]
    ),
    sp(),
  ];
}

// ─── ES.7 RECOMMANDATION ─────────────────────────────────────────────────
function es7(): (Paragraph | Table)[] {
  return [
    h2('ES.7 Recommandation — Thèse d\'investissement'),
    sp(),
    successBox('KHEPRA EXPERTS recommande favorablement le financement de CGI SA par la BIDC à hauteur de 11 440 M FCFA (dette senior à 8 % sur 8 ans, différé capital 24 mois). Le projet présente : (i) une viabilité technique confirmée (gisement certifié LNBTP, technologie METSO, phase pilote validée) ; (ii) une viabilité commerciale démontrée (contrat CIMCO 150 000 T/an, marché PND structurel, diversification dalles) ; (iii) une viabilité financière robuste (TRI 16,2 % > WACC 12 %, VAN +2 950 M FCFA, DSCR 1,85x > covenant 1,3x, Payback 6,0 ans < durée dette) ; (iv) un alignement ESG fort (Banque Verte BIDC, IFC Performance Standards, ODD) ; et (v) un impact de développement positif pour le Togo et la CEDEAO (434 emplois directs + indirects, 2 Mds FCFA/an contribution fiscale, industrialisation chaîne granulats).'),
    sp(),
    alertBox('Facteurs de risque clés à surveiller : (i) DSCR resserré 2028-2029 (1,50-1,54x) — mitigé par différé 24 mois + LC BFR ; (ii) délais paiement ARMP > 90 jours — mitigé par LC BFR + relances structurées ; (iii) retard livraison METSO — mitigé par clauses pénalités contractuelles.'),
    sp(),
  ];
}