import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, kpiRow, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function section1(): (Paragraph | Table)[] {
  return [
    h1('SECTION I — ANALYSE DIMENSIONNELLE DU MARCHÉ (TAM / SAM / SOM)'),
    sp(),

    h2('I.1 Introduction méthodologique'),
    body('L\'analyse dimensionnelle du marché repose sur la méthodologie TAM/SAM/SOM (Total Addressable Market / Serviceable Addressable Market / Serviceable Obtainable Market), standardisée par les cabinets de conseil stratégique internationaux (McKinsey, BCG, Bain) et systématiquement requise par les institutions de financement du développement (BIDC, BAD, IFC) dans l\'évaluation des projets industriels en Afrique subsaharienne.'),
    sp(),
    body('Cette segmentation hiérarchique permet de quantifier l\'opportunité de marché à trois niveaux de granularité, de démontrer le réalisme de la cible commerciale à l\'investisseur, d\'identifier le chemin de croissance structurel de CGI SA sur 2026-2036, et de justifier le dimensionnement industriel (200-250 TPH) et le CAPEX demandé (8 899 M FCFA).'),
    sp(),

    h2('I.2 Total Addressable Market (TAM) — Afrique de l\'Ouest'),
    sp(),
    body('Le TAM représente l\'ensemble de la demande théorique de granulats concassés en Afrique de l\'Ouest (CEDEAO), incluant les 15 États membres de la CEDEAO plus le Tchad et le Cameroun (marchés connexes via les corridors).'),
    sp(),

    tbl(
      ['Paramètre', 'Valeur', 'Source / Méthode'],
      [
        ['Production totale granulats Afrique de l\'Ouest', '45 millions de tonnes/an', 'Banque Mondiale 2023 — secteur BTP extractif'],
        ['Valeur marché (prix moyen 8 000 FCFA/T)', '360 Mds FCFA/an', 'Calcul KHEPRA EXPERTS'],
        ['Croissance annuelle moyenne (CAGR)', '+4,8 %/an', 'FMI — Perspectives économiques Afrique 2024-2029'],
        ['Part BTP dans la demande', '78 %', 'INSEED Togo + BCEAO — études sectorielles'],
        ['Part industrie / mines', '15 %', 'Direction Générale des Mines Togo'],
        ['Part export / transit', '7 %', 'Douanes Togo — statistiques export 2022-2024'],
      ],
      [35, 30, 35]
    ),
    sp(),

    h3('I.2.1 Dynamique de croissance du TAM'),
    body('Le marché des granulats en Afrique de l\'Ouest connaît une croissance structurelle portée par trois facteurs macroéconomiques :'),
    sp(),
    bullet('Programmes d\'infrastructures régionaux : Programme d\'Infrastructure Prioritaire (PIP) CEDEAO, Corridor Abidjan-Lagos (1 028 km), projet de route transafricaine (Cairo-Cape Town) passant par Lomé.'),
    bullet('Urbanisation galopante : Le taux d\'urbanisation en Afrique de l\'Ouest passe de 42% (2010) à 48% (2024) et devrait atteindre 55% d\'ici 2035 (Banque Mondiale, 2024). Lomé, Cotonou, Accra et Abidjan concentrent 65% de la demande.'),
    bullet('Fiscalité extractive favorable : Les gouvernements de la CEDEAO (Togo, Bénin, Ghana) ont adopté des codes miniers encourageant l\'exploitation industrielle locale vs l\'importation de granulats.'),
    sp(),
    infoBox('Source : Banque Mondiale — « West Africa BTP & Extractive Industries Outlook 2024 » | FMI — « Regional Economic Outlook : Sub-Saharan Africa, October 2024 » | BCEAO — « Note de conjoncture économique UEMOA, T4 2024 »'),

    h2('I.3 Serviceable Addressable Market (SAM) — Rayon 500 km'),
    sp(),
    body('Le SAM restreint l\'analyse au périmètre géographique effectivement adressable par CGI SA, compte tenu des contraintes logistiques (rayon économique de transport routier pour les granulats : 150-250 km optimum, 500 km maximum compétitif).'),
    sp(),

    tbl(
      ['Zone géographique', 'Rayon depuis Siyimé', 'Demande granulats (T/an)', 'Valeur marché (Mds FCFA)', 'Part du SAM'],
      [
        ['Togo — Grand Lomé', '120-150 km', '2 800 000', '22,4', '32,9 %'],
        ['Togo — Régions centrales', '80-180 km', '1 200 000', '9,6', '14,1 %'],
        ['Togo — Régions Kara / Savanes', '200-350 km', '850 000', '6,8', '10,0 %'],
        ['Bénin — Cotonou / Porto-Novo', '176-200 km', '1 900 000', '15,2', '22,4 %'],
        ['Bénin — Régions intérieures', '250-400 km', '600 000', '4,8', '7,1 %'],
        ['Ghana — Régions Volta / Est', '180-350 km', '900 000', '7,2', '10,6 %'],
        ['Ghana — Accra (périphérie)', '350-500 km', '250 000', '2,0', '2,9 %'],
        ['TOTAL SAM', '—', '8 500 000', '68,0', '100 %'],
      ],
      [22, 18, 18, 20, 22]
    ),
    sp(),

    h3('I.3.1 Cartographie de la demande par zone'),
    body('La demande est fortement concentrée autour de trois pôles urbains : Lomé (Togo), Cotonou (Bénin) et Accra (Ghana). La position de Siyimé à 150 km de Lomé et 176 km de Cotonou place CGI SA au carrefour de deux des trois plus grands marchés de la sous-région.'),
    sp(),
    bullet('Grand Lomé (Togo) : 2,8 M T/an — Croissance démographique +3,2%/an, Plan National de Développement 2025-2029, extension portuaire. CGI SA bénéficie d\'un avantage logistique de 20-40% vs les carrières du sud du Togo.'),
    bullet('Cotonou / Porto-Novo (Bénin) : 1,9 M T/an — Programme d\'investissements publics du Bénin 2023-2027 (PIP 2.0) avec 800 Mds FCFA alloués aux infrastructures. CGI SA peut capter 50-80K T/an via des contrats cadres B2B.'),
    bullet('Ghana oriental (Volta Region) : 900K T/an — Ghana Infrastructure Plan 2024-2028. Ce marché devient accessible si CGI SA développe une logistique intermodale.'),
    sp(),
    infoBox('Source : INSEED Togo — « Annuaire statistique 2023 » | Institut National de la Statistique du Bénin (INSAE) — « Comptes nationaux 2023 » | Ghana Statistical Service — « GDP by Industry 2024 » | Douanes Togo — « Statistiques exportations granulats 2022-2024 »'),

    h2('I.4 Serviceable Obtainable Market (SOM) — Cible CGI SA 2028'),
    sp(),
    body('Le SOM représente la part de marché réaliste et atteignable par CGI SA d\'ici 2028, compte tenu de sa capacité industrielle (795 000 T/an en régime croisière), de son portefeuille client initial (contrat cadre CIMCO 150 000 T/an), et de sa stratégie commerciale déployée.'),
    sp(),

    tbl(
      ['Scénario', 'Volume cible (T/an)', 'Part SAM', 'Chiffre d\'affaires (Mds FCFA)', 'Conditions'],
      [
        ['Scénario prudent (2026-2027)', '450 000', '5,3 %', '3,6', 'Phase pilote — Ligne 1 seule, portefeuille local'],
        ['Scénario central (2028)', '795 000', '9,4 %', '6,4', 'Régime croisière — Lignes 1+2+3, CIMCO + grands comptes + export Bénin'],
        ['Scénario optimiste (2030)', '1 200 000', '14,1 %', '9,6', 'Extension Phase 2 du gisement, logistique intégrée, marché Ghana'],
      ],
      [25, 20, 15, 20, 20]
    ),
    sp(),

    h3('I.4.1 Justification du SOM cible (9,4% du SAM)'),
    body('Le choix d\'un SOM de 9,4% du SAM (795 000 T/an) repose sur une analyse factuelle et conservatrice :'),
    sp(),
    bullet('Base installée : CGI SA dispose déjà d\'un contrat cadre CIMCO (150 000 T/an), soit 18,9% du volume cible, démontrant la traction commerciale existante.'),
    bullet('Capacité industrielle : 795 000 T/an correspond à 75% de la capacité maximale théorique (1 060 000 T/an), laissant une marge de sécurité de 25% pour les pics de demande saisonnière et la maintenance planifiée.'),
    bullet('Positionnement différencié : CGI SA est le seul producteur industriel certifié LNBTP dans le nord du Togo. Les concurrents actuels opèrent dans le sud avec des coûts logistiques supérieurs de 20-40%.'),
    bullet('Barrières à l\'entrée : Le permis d\'exploitation DGMG, le gisement de 201 ha / 50M+ tonnes, et l\'investissement METSO (CAPEX 8 899 M FCFA) constituent des barrières significatives pour tout nouvel entrant.'),
    bullet('Diversification produit : Les gammes spécialisées (dalles granite, granulats haute résistance > 120 MPa) adressent des segments à marge supérieure (55% vs 35% pour les granulats standards).'),
    sp(),

    h2('I.5 Tableau de bord TAM / SAM / SOM'),
    sp(),
    kpiRow([
      { label: 'TAM Afrique de l\'Ouest', value: '45 M T/an', sub: '360 Mds FCFA/an — CAGR +4,8%' },
      { label: 'SAM (rayon 500 km)', value: '8,5 M T/an', sub: '68 Mds FCFA/an — Togo / Bénin / Ghana' },
      { label: 'SOM cible 2028', value: '795 K T/an', sub: '9,4% du SAM — 6,4 Mds FCFA' },
      { label: 'Marge de sécurité', value: '25 %', sub: 'Capacité théorique vs SOM' },
    ]),
    sp(),

    h2('I.6 Évolution prospective du marché (2026-2036)'),
    sp(),
    body('Sur l\'horizon 10 ans du Business Plan, le marché des granulats dans le SAM devrait croître à un rythme moyen de +4,2%/an, porté par :'),
    sp(),
    bullet('Le Plan National de Développement (PND) Togo 2025-2029 et son successeur 2030-2035 : 2 500 km de routes supplémentaires, 120 000 logements sociaux, 5 nouvelles zones industrielles.'),
    bullet('Le Programme d\'Investissements Publics du Bénin (PIP 3.0) 2028-2032 : 1 200 Mds FCFA en infrastructures, dont 40% en BTP nécessitant des granulats certifiés.'),
    bullet('L\'intégration du corridor Abidjan-Lagos dans le réseau transafricain : 8 Mds USD d\'investissements sur 2025-2035 (Banque Africaine de Développement, 2024).'),
    bullet('La croissance démographique : La population de Lomé passe de 2,2M (2024) à 3,1M (2035), soit +41%, générant une demande structurelle en logement, voirie et équipements publics.'),
    sp(),

    tbl(
      ['Année', 'SAM projeté (M T/an)', 'SOM CGI projeté (K T/an)', 'Part de marché', 'CA CGI (Mds FCFA)'],
      [
        ['2026', '8,5', '450', '5,3 %', '3,6'],
        ['2027', '8,9', '620', '7,0 %', '5,0'],
        ['2028', '9,3', '795', '8,5 %', '6,4'],
        ['2029', '9,7', '850', '8,8 %', '6,8'],
        ['2030', '10,1', '920', '9,1 %', '7,4'],
        ['2031', '10,5', '980', '9,3 %', '7,8'],
        ['2032', '10,9', '1 040', '9,5 %', '8,3'],
        ['2033', '11,4', '1 100', '9,7 %', '8,8'],
        ['2034', '11,9', '1 150', '9,7 %', '9,2'],
        ['2035', '12,4', '1 200', '9,7 %', '9,6'],
        ['2036', '12,9', '1 250', '9,7 %', '10,0'],
      ],
      [12, 22, 22, 22, 22]
    ),
    sp(),
    infoBox('Hypothèse de croissance SAM : +4,2%/an (CAGR), fondée sur les projections BCEAO, Banque Mondiale et plans nationaux d\'investissement. Hypothèse prix : +3%/an (conservateur vs +5,4% observé à Lomé).'),
    pb(),
  ];
}



