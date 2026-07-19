import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType,
} from 'docx';
import {
  NAVY, NAVY_MID, STEEL, SILVER, DARK, WHITE, GOLD, GREEN, GREEN_LT,
  sp, h1, h2, h3, body, bullet, tbl, pb, infoBox, successBox,
} from '';

// ─── ANNEXES ─────────────────────────────────────────────────────────────────
export function annexes(): (Paragraph | Table)[] {
  return [
    h1('ANNEXES'),
    sp(),
    ...annexeA(),
    ...annexeB(),
    ...annexeC(),
    ...annexeD(),
    pb(),
  ];
}

// ─── ANNEXE A — CONCLUSIONS ET RECOMMANDATIONS ─────────────────────────────
function annexeA(): (Paragraph | Table)[] {
  return [
    h2('Annexe A — Conclusions et Recommandations'),
    sp(),
    h3('A.1 Synthèse des conclusions stratégiques et financières'),
    tbl(
      ['Dimension', 'Conclusion', 'Niveau de confiance'],
      [
        ['Viabilité technique', 'Capacité industrielle de 795 000 T/an réalisable avec équipements METSO standard international. Gisement Siyimé : masse volumique 2,63 g/cm³ — qualité premium certifiée LNBTP. Programme 3 solaire 3-4 MWc réduit OPEX énergie de 40%.', '✔ ÉLEVÉ'],
        ['Viabilité commerciale', 'Prix 8 000 FCFA/T conforme au marché togolais et béninois. Contrat cadre CIMCO 150 000 T/an sécurise 19% du CA. PND Togo 2025-2029 = demande structurelle 2,5 M T. Diversification dalles granite (marge 55%) réduit cyclicité BTP.', '✔ ÉLEVÉ'],
        ['Viabilité financière', 'TRI 16,2% — VAN positive 2 950 M FCFA — DSCR 1,85x moyen — Payback 6,0 ans — Marge de sécurité 54,8%. Stress tests : bancable jusqu\'à baisse prix -15% ou hausse énergie +30%.', '✔ ÉLEVÉ'],
        ['Bancabilité BIDC', '100% dette senior 11 440 M FCFA — DSCR > covenant 1,3x tous scénarios sauf extrême — Gearing < 1x dès 2030 — Structure directement présentable en comité de crédit.', '✔ ÉLEVÉ'],
        ['Conformité réglementaire', 'Permis d\'exploitation DGMG valide. Code Minier Togolais respecté. Certification LNBTP. Conformité OHADA (CA, Comité d\'Audit, SYSCOHADA).', '✔ ÉLEVÉ'],
        ['Conformité ESG / Banque Verte', 'PGES conforme IFC Performance Standards 1-6. Centrale solaire 3-4 MWc = réduction GES 35% + 1 200 T CO2/an évités. Budget ESG 280 M FCFA/an. Alignement critères Banque Verte BIDC 2024-2027.', '✔ ÉLEVÉ'],
      ],
      [20, 55, 25]
    ),
    sp(),
    h3('A.2 Recommandations prioritaires'),
    tbl(
      ['Priorité', 'Recommandation', 'Délai', 'Impact'],
      [
        ['1 — URGENT', 'Déposer le dossier de financement BIDC avec le présent Business Plan et les annexes CAPEX_BIDC', 'T1 2026', 'Tirage dette T2 2027 — calendrier Programmes 1-2-3 respecté'],
        ['2 — URGENT', 'Signer le contrat cadre d\'approvisionnement METSO avec clauses de livraison T2 2027 et pénalités de retard', 'T1 2026', 'Sécurisation calendrier mise en service Lignes 2 et 3'],
        ['3 — PRIORITAIRE', 'Finaliser le recrutement du Responsable HSE et du Directeur Commercial', 'T1 2026', 'Conformité IFC PS 2 — condition préalable tirage BIDC'],
        ['4 — PRIORITAIRE', 'Lancer l\'appel d\'offres pour la centrale solaire 3-4 MWc (Programme 3) avec critères BIDC Banque Verte', 'T2 2026', 'Réduction OPEX énergie — positionnement vert BIDC'],
        ['5 — IMPORTANT', 'Optimiser le plan de minage Ligne 1 (espacement 3×3 m) pour éliminer les blocs surdimensionnés', 'T1 2026', 'Disponibilité 60% → 80% — base rentable avant expansion'],
        ['6 — IMPORTANT', 'Développer le portefeuille clients Bénin (EBOMAF, CECA) pour sécuriser 50 000 T/an dès 2027', 'T2 2026', 'Diversification géographique — réduction risque marché Togo'],
        ['7 — MOYEN TERME', 'Obtenir la certification ISO 9001 (qualité) et initier ISO 14001 (environnement)', 'T3 2026-T1 2027', 'Accès marchés publics régionaux — différenciation premium'],
      ],
      [15, 40, 12, 33]
    ),
    sp(),
    h3('A.3 Conditions de succès et facteurs clés'),
    bullet('Exécution rigoureuse du programme d\'amélioration opérationnelle de la Ligne 1 dès T1 2026 (plan de minage, maintenance préventive, SOPs).'),
    bullet('Obtention du financement BIDC dans les délais prévus (T1 2027) — 11 440 M FCFA dette senior à 8% sur 8 ans avec différé 24 mois (CAPEX 8 899 M + BFR 2 541 M FCFA).'),
    bullet('Respect du planning de mise en service des Lignes 2 et 3 (T2 et T4 2027) avec équipements METSO et supervision constructeur.'),
    bullet('Mise en œuvre du PGES conforme IFC comme condition préalable au tirage de la dette BIDC — audit ESG externe T2 2026.'),
    bullet('Développement commercial proactif pour sécuriser les contrats long terme (Bénin, monuments, export dalles) avant la montée en capacité.'),
    bullet('Lancement du Programme 3 (solaire 3-4 MWc) pour réduire l\'OPEX énergie de 40% et renforcer le profil Banque Verte BIDC.'),
    bullet('Gestion rigoureuse du BFR — utilisation de la LC BIDC de 2 541 M FCFA comme tampon de trésorerie pendant la phase de montée en puissance.'),
    sp(),
    body('Perspective 2036 : À l\'horizon 2036, CGI SA aura consolidé sa position de producteur industriel de référence en Afrique de l\'Ouest, opérant un écosystème industriel intégré (granulats METSO, dalles granite, centrale solaire) et démontrant qu\'une entreprise togolaise peut maîtriser la chaîne de valeur complète — du gisement brut au produit fini exporté — en conformité avec les standards environnementaux internationaux.'),
    sp(),
    successBox('KHEPRA EXPERTS, cabinet de conseil de réputation internationale, recommande la mise en œuvre du plan d\'affaires 2026–2036 de CORNERSTONE GROUP INTERNATIONAL (CGI) SA tel que structuré dans le présent Business Plan. Le projet présente un profil risque/rendement attractif, une bancabilité confirmée avec un DSCR moyen de 1,91x au-dessus du covenant BIDC de 1,3x, et un impact de développement positif pour le Togo et la région CEDEAO (85 emplois directs + 120 indirects, réduction GES 35%). Le comité de crédit de la BIDC est invité à considérer ce financement comme un investissement dans le pilier de l\'émergence industrielle de l\'Afrique de l\'Ouest.'),
    sp(),
  ];
}

// ─── ANNEXE B — SOURCES OFFICIELLES ────────────────────────────────────────
function annexeB(): (Paragraph | Table)[] {
  return [
    h2('Annexe B — Sources officielles et références réglementaires'),
    sp(),
    tbl(
      ['Institution / Texte', 'Document', 'Année', 'Référence'],
      [
        ['Code Minier Togolais', 'Loi n° 96-004/PR du 15 février 1996, modifiée par la Loi n° 2014-010 du 14 mai 2014', '2014', 'mines.gouv.tg'],
        ['Acte Uniforme OHADA — Droit des Sociétés', 'Acte Uniforme portant droit commercial général et sociétés — Révision 2023', '2023', 'ohada.com'],
        ['BIDC', 'Conditions de financement — Projets industriels CEDEAO', '2024', 'bidc.org'],
        ['BIDC', 'Guide d\'évaluation des projets d\'investissement — Section BFR', '2023', 'bidc.org'],
        ['BIDC', 'Banque Verte Framework — Critères énergies renouvelables', '2024-2027', 'bidc.org/green'],
        ['IFC', 'Performance Standards on Environmental and Social Sustainability (rév. 2023)', '2012 (rév. 2023)', 'ifc.org/performancestandards'],
        ['Principes Équateur', 'Principes Équateur IV (EP4)', '2020', 'equator-principles.com'],
        ['FMI', 'World Economic Outlook — Perspectives économiques mondiales', 'Avril 2025', 'imf.org/WEO'],
        ['Banque Africaine de Développement (BAD)', 'African Economic Outlook 2024', '2024', 'afdb.org'],
        ['Banque Mondiale', 'Togo Infrastructure Assessment', '2024', 'worldbank.org/togo'],
        ['BCEAO', 'Rapport annuel 2024 — Zone UEMOA', '2024', 'bceao.int'],
        ['Code Général des Impôts du Togo', 'Loi de finances 2024 — Taux IS 27%', '2024', 'dgid.gouv.tg'],
        ['DGMG Togo', 'Rapport d\'évaluation des ressources minérales — District du Haho', '2022', 'mines.gouv.tg'],
        ['ICMM', 'Mining Contribution to Sustainable Development in Africa', '2023', 'icmm.com'],
        ['METSO Outotec', 'Crushing and Screening Equipment — Sub-Saharan Africa Catalogue', '2024', 'mogroup.com'],
        ['INSEED Togo', 'Rapport sur les activités du secteur BTP — Atlas des transports', '2023', 'inseed.tg'],
        ['INSAE Bénin', 'Statistiques du secteur de la construction', '2024', 'insae.bj'],
        ['CEET Togo', 'Bilan électrique national — Production et consommation', '2024', 'ceet.tg'],
        ['CEPI Europe', 'Rapport sur les importations de pierre naturelle — Granite africain', '2024', 'cepi.org'],
      ],
      [25, 35, 10, 30]
    ),
    sp(),
  ];
}

// ─── ANNEXE C — GLOSSAIRE ─────────────────────────────────────────────────
function annexeC(): (Paragraph | Table)[] {
  return [
    h2('Annexe C — Glossaire des termes techniques et financiers'),
    sp(),
    tbl(
      ['Terme', 'Définition'],
      [
        ['CAPEX', 'Capital Expenditure — Dépenses d\'investissement en immobilisations corporelles (Tranches A/B/C).'],
        ['OPEX', 'Operating Expenditure — Charges opérationnelles courantes (énergie, maintenance, main-d\'œuvre).'],
        ['EBITDA', 'Earnings Before Interest, Taxes, Depreciation and Amortization — Marge opérationnelle avant amortissements et charges financières.'],
        ['EBIT', 'Earnings Before Interest and Taxes — Résultat opérationnel après amortissements.'],
        ['DSCR', 'Debt Service Coverage Ratio — EBITDA / Service total de la dette (capital + intérêts). Covenant BIDC = 1,3x.'],
        ['VAN', 'Valeur Actuelle Nette — Somme des flux de trésorerie actualisés au taux retenu (12%).'],
        ['TRI', 'Taux de Rentabilité Interne — Taux d\'actualisation annulant la VAN.'],
        ['BFR', 'Besoin en Fonds de Roulement — Besoin de financement du cycle d\'exploitation (stocks + créances - dettes fournisseurs).'],
        ['Capex Intensity', 'Ratio CAPEX / CA — Mesure de l\'intensité capitalistique du projet.'],
        ['PGES', 'Plan de Gestion Environnementale et Sociale — Document requis par IFC PS 1 et Code Minier Togolais.'],
        ['FPIC', 'Free, Prior and Informed Consent — Consentement Libre, Préalable et Éclairé des communautés locales.'],
        ['IFC PS', 'IFC Performance Standards — 8 normes environnementales et sociales internationales.'],
        ['LNBTP', 'Laboratoire National du Bâtiment et des Travaux Publics du Togo — Certification qualité granulats.'],
        ['DGMG', 'Direction Générale des Mines et de la Géologie du Togo — Délivrance permis d\'exploitation.'],
        ['BIDC', 'Banque d\'Investissement et de Développement de la CEDEAO — Institution régionale de développement.'],
        ['BAD', 'Banque Africaine de Développement.'],
        ['SYSCOHADA', 'Système Comptable Ouest Africain et de la OHADA — Référentiel comptable harmonisé.'],
        ['IS', 'Impôt sur les Sociétés — Taux 27% au Togo (Code Général des Impôts 2024).'],
        ['Banque Verte BIDC', 'Label BIDC pour les projets à fort impact environnemental positif (ENR, efficacité, réduction GES).'],
        ['Capex Intensity', 'Ratio investissement / chiffre d\'affaires — indicateur de rentabilité du capital investi.'],
      ],
      [20, 80]
    ),
    sp(),
  ];
}

// ─── ANNEXE D — ÉQUIPE KHEPRA EXPERTS ─────────────────────────────────────
function annexeD(): (Paragraph | Table)[] {
  return [
    h2('Annexe D — Équipe de rédaction KHEPRA EXPERTS'),
    sp(),
    tbl(
      ['Rôle', 'Profil', 'Contribution'],
      [
        ['Chef de mission', 'Senior Manager — Conseil financier, 20 ans d\'expérience Big Four, spécialisation projets miniers Afrique et structuration dette BIDC/BAD', 'Coordination globale, modélisation financière, structuration dette BIDC, rédaction et validation'],
        ['Expert technique mines & carrières', 'Ingénieur des Mines — 15 ans d\'expérience Afrique de l\'Ouest, expert certifié METSO, spécialisation concassage-criblage', 'Analyse technique, dimensionnement Programmes 1-2-3, CAPEX détaillé, plan minage, calendriers'],
        ['Analyste de marché', 'Économiste — Spécialisation BTP/Infrastructure Afrique, BCEAO/BAD, modélisation de la demande', 'Analyse de marché, projections demande granulats/dalles, prix de vente, benchmarks régionaux'],
        ['Expert ESG & Banque Verte', 'Spécialiste IFC Performance Standards — 10 ans, certification GRI, expérience BIDC Banque Verte', 'Analyse ESG, PGES, indicateurs de suivi, conformité BIDC vert, centrale solaire, reporting carbone'],
        ['Juriste OHADA / droit minier', 'Avocat — Droit des affaires Afrique, Code Minier Togolais, OHADA, 12 ans d\'expérience', 'Cadre réglementaire, permis, conformité OHADA, gouvernance, structuration sociétaire'],
      ],
      [20, 35, 45]
    ),
    sp(),
    sp(),
    new Paragraph({
      children: [new TextRun({ text: '─────────────────────────────────────────────────────────────────────────────', color: STEEL, size: 20, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 400, after: 200 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'KHEPRA EXPERTS — Cabinet de Conseil de Réputation Internationale', bold: true, size: 22, color: NAVY_MID, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Finance · Stratégie · Ingénierie de Projets · Conformité Réglementaire · ESG · Banque Verte', size: 18, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'khepraexperts.com | contact@khepraexperts.com', size: 18, color: STEEL, font: 'Calibri' })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [new TextRun({ text: 'Réf. KE-BP-CGI-2026-001 | Version 3.0 Définitif | Mai 2026 | CONFIDENTIEL | Budget BIDC/EBID 14 709 000 USD', size: 16, color: SILVER, font: 'Calibri', italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
    }),
  ];
}



