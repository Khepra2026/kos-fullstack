import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function section5(): (Paragraph | Table)[] {
  return [
    h1('SECTION V — STRATÉGIE DE PRIX ET EXPORT'),
    sp(),

    h2('V.1 Introduction — Philosophie de prix'),
    body('La stratégie de prix de CGI SA repose sur trois principes fondamentaux : (i) la prudence financière, (ii) la compétitivité structurelle par l\'avantage logistique, et (iii) la segmentation par valeur (value-based pricing) qui différencie les granulats standards des produits haute performance. L\'hypothèse de croissance des prix adoptée est délibérément conservative (+3%/an) afin de garantir la robustesse des projections financières et de surprendre positivement les investisseurs.'),
    sp(),

    h2('V.2 Hypothèse de prix — Croissance conservative +3%/an'),
    sp(),
    body('L\'observation des prix des granulats à Lomé sur la période 2019-2024 révèle une croissance moyenne de +5,4%/an, portée par la tension entre l\'offre structurellement limitée (production nationale 2,5 M T/an vs demande 3,2 M T/an) et la demande croissante. Cependant, CGI SA adopte pour ses projections une hypothèse de +3%/an uniquement, pour trois raisons :'),
    sp(),
    bullet('Prudence financière : Une hypothèse conservative renforce la crédibilité du modèle auprès des comités de crédit BIDC/BAD/IFC et réduit le risque de sous-performance.'),
    bullet('Marge de sécurité : À +3%/an, le DSCR moyen s\'établit à 1,85x (scénario central). À +5,4%/an, le DSCR atteindrait 2,15x, créant une marge de sécurité additionnelle de 16%.'),
    bullet('Risque concurrentiel : L\'entrée de CGI SA pourrait inciter Granutogo à maintenir ses prix ou à les réduire légèrement sur le segment 0/31,5. L\'hypothèse +3%/an anticipe cette pression concurrentielle.'),
    sp(),

    tbl(
      ['Année', 'Prix moyen FCFA/T', 'Croissance', 'Prix Lomé (transport inclus)', 'Écart vs Lomé'],
      [
        ['2024 (référence)', '7 800', '—', '10 500', '—'],
        ['2025', '8 000', '+2,6 %', '10 800', '+35 %'],
        ['2026', '8 240', '+3,0 %', '11 124', '+35 %'],
        ['2027', '8 487', '+3,0 %', '11 457', '+35 %'],
        ['2028', '8 742', '+3,0 %', '11 801', '+35 %'],
        ['2029', '9 004', '+3,0 %', '12 155', '+35 %'],
        ['2030', '9 274', '+3,0 %', '12 520', '+35 %'],
        ['2031', '9 552', '+3,0 %', '12 895', '+35 %'],
        ['2032', '9 839', '+3,0 %', '13 283', '+35 %'],
        ['2033', '10 134', '+3,0 %', '13 681', '+35 %'],
        ['2034', '10 438', '+3,0 %', '14 091', '+35 %'],
        ['2035', '10 751', '+3,0 %', '14 514', '+35 %'],
        ['2036', '11 074', '+3,0 %', '14 950', '+35 %'],
      ],
      [10, 16, 14, 25, 25]
    ),
    sp(),

    h3('V.2.1 Hypothèse transport Lomé'),
    body('Le prix « départ site » de 8 000 FCFA/T en 2025 devient un prix « livré Lomé » de 10 800 FCFA/T après ajout des coûts de transport. Ce coût de transport de 2 800 FCFA/T (distance 150 km, camion benne 30T, carburant, main-d\'œuvre, assurance) reste compétitif par rapport aux carrières du sud (2 800-3 500 FCFA/T) en raison de l\'absence de congestion portuaire sur l\'axe Siyimé-Lomé et de la proximité de la route nationale N1.'),
    sp(),
    infoBox('Source : ENTRACO (transporteur régional) — « Tarifs transport granulats 2024 » | Direction des Routes du Togo — « État des routes nationales 2024 » | Calcul KHEPRA EXPERTS basé sur 150 km, camion 30T, 3 voyages/jour, carburant 850 FCFA/litre.'),

    h2('V.3 Grille de prix par segment produit'),
    sp(),
    body('Les prix sont segmentés par classe granulométrique et par niveau de performance, conformément à la stratégie de value-based pricing :'),
    sp(),

    tbl(
      ['Segment produit', 'Prix 2025 (FCFA/T)', 'Prix 2028 (FCFA/T)', 'Prix 2033 (FCFA/T)', 'CAGR', 'Marge brute'],
      [
        ['Grave non traitée 0/31,5', '6 500', '7 100', '8 225', '+3,0 %', '30 %'],
        ['Grave non traitée 0/20', '7 200', '7 865', '9 111', '+3,0 %', '32 %'],
        ['Granulats 15/25 (standard)', '8 500', '9 285', '10 757', '+3,0 %', '38 %'],
        ['Granulats 5/15 (standard)', '8 000', '8 740', '10 125', '+3,0 %', '35 %'],
        ['Sable de concassage 0/5', '7 500', '8 193', '9 492', '+3,0 %', '34 %'],
        ['Fines 0/2', '5 000', '5 462', '6 328', '+3,0 %', '26 %'],
        ['Rebut / tout-venant', '3 500', '3 824', '4 431', '+3,0 %', '16 %'],
        ['Granulats haute résistance (> 120 MPa)', '12 000', '13 109', '15 190', '+3,0 %', '48 %'],
        ['Dalles granite (gamme premium)', '15 000', '16 386', '18 987', '+3,0 %', '55 %'],
      ],
      [25, 12, 12, 12, 12, 12]
    ),
    sp(),

    h3('V.3.1 Justification des prix premium (haute résistance / dalles)'),
    body('Les segments premium se justifient par la rareté de l\'offre et la valeur générée pour le client :'),
    sp(),
    bullet('Granulats haute résistance (> 120 MPa) : Seuls 3 producteurs dans la CEDEAO (Ghana, Nigeria, Togo/CGI SA) offrent des granulats certifiés > 120 MPa. Le prix de 12 000 FCFA/T représente un premium de 50% vs le granulat standard, mais permet au client de réduire son volume de ciment de 15-20% dans les bétons BHP (économie 2 500-4 000 FCFA/m³ de béton).'),
    bullet('Dalles granite : La gamme de dalles en granite poli (60×60, 80×80, formats sur mesure) s\'adresse au marché de la construction haut de gamme (hôtels, résidences de standing, espaces publics). Le prix de 15 000 FCFA/m² (équivalent 15 000 FCFA/T en granulat équivalent) est 40% inférieur aux importations chinoises (25 000 FCFA/m²) et de qualité supérieure (granite local, masse volumique 2,63, polish > 80 gloss).'),
    sp(),

    h2('V.4 Stratégie export — Marché béninois'),
    sp(),
    body('L\'export vers le Bénin constitue un pilier stratégique de diversification géographique, réduisant la dépendance du marché togolais et capitalisant sur la proximité de Cotonou (176 km de Siyimé).'),
    sp(),

    h3('V.4.1 Analyse du marché béninois'),
    body('Le marché béninois des granulats est structurellement sous-alimenté, avec une demande estimée à 2,5 millions de tonnes/an et une production nationale de 1,8 million de tonnes/an. Le déficit de 700 000 T/an est comblé par des importations depuis le Nigeria (granulats bas de gamme) et le Ghana (granulats haute performance à prix élevés).'),
    sp(),

    tbl(
      ['Paramètre', 'Valeur', 'Source'],
      [
        ['Demande totale granulats Bénin', '2 500 000 T/an', 'INSAE Bénin — Comptes nationaux 2023'],
        ['Production nationale', '1 800 000 T/an', 'Ministère des Mines Bénin — Rapport 2024'],
        ['Déficit structurel', '700 000 T/an', 'Calcul KHEPRA EXPERTS'],
        ['Prix moyen Cotonou (import)', '10 500-12 000 FCFA/T', 'Douanes Bénin — Statistiques import 2023'],
        ['Prix moyen Cotonou (national)', '8 500-9 500 FCFA/T', 'Carrière SONAPIER — Fiche technique 2024'],
        ['Grands projets en cours', 'Route inter-urbaine Cotonou-Parakou, Port de Cotonou extension', 'Gouvernement du Bénin — PIP 2.0'],
      ],
      [35, 30, 35]
    ),
    sp(),

    h3('V.4.2 Volume adressable et stratégie de pénétration'),
    body('Le volume adressable par CGI SA sur le marché béninois est estimé à 50 000-80 000 tonnes/an sur la période 2027-2030, réparti comme suit :'),
    sp(),
    bullet('Contrats cadres B2B (50%) : 25 000-40 000 T/an via des contrats cadres avec les grands entrepreneurs béninois (SETSTO, EGIS Bénin, Colas Bénin) pour les projets de voirie et ouvrages d\'art. Prix cible : 9 000-10 000 FCFA/T livré Cotonou (compétitif vs import Ghana à 11 000-12 000 FCFA/T).'),
    bullet('Marché des promoteurs immobiliers (30%) : 15 000-24 000 T/an pour les projets de logements et immeubles de bureaux à Cotonou et Porto-Novo. Prix cible : 8 500-9 500 FCFA/T (compétitif vs granulats locaux béninois de qualité inférieure).'),
    bullet('Grands chantiers publics (15%) : 7 500-12 000 T/an via les marchés publics ARMP Bénin (routes Cotonou-Parakou, extension portuaire). Prix cible : 9 500-10 500 FCFA/T.'),
    bullet('Segment spécialité (5%) : 2 500-4 000 T/an de granulats haute résistance pour ouvrages d\'art (ponts, viaducs) et bétons marins. Prix cible : 12 000-14 000 FCFA/T.'),
    sp(),

    h3('V.4.3 Logistique export et barrières douanières'),
    body('L\'export vers le Bénin implique des contraintes logistiques et réglementaires que CGI SA doit maîtriser :'),
    sp(),
    bullet('Transport : Route nationale Togo-Bénin (RNIE3) — 176 km de Siyimé à Cotonou. Temps de transit moyen : 4-5h. Camions bennes 30T avec permis de transit CEDEAO (certificat de circulation). Coût de transport : 2 200-2 800 FCFA/T (vs 2 800 FCFA/T pour Lomé).'),
    bullet('Douanes et fiscalité : Exemption de droits de douane intra-CEDEAO (Traité de la CEDEAO, article 35). TVA à l\'importation Bénin : 18% sur la valeur CIF. CGI SA peut optimiser via un établissement commercial au Bénin (filiale ou représentant) pour récupérer la TVA et réduire la charge fiscale.'),
    bullet('Certification : Les granulats certifiés LNBTP sont reconnus au Bénin (accord de reconnaissance mutuelle LNBTP-LCBC). Aucune certification supplémentaire requise pour le marché béninois.'),
    bullet('Concurrence locale : La SONAPIER (carrière publique béninoise) produit 450 000 T/an avec une qualité moyenne (LA 30-35). CGI SA se différencie par la certification complète et les granulats haute résistance.'),
    sp(),
    infoBox('Source : Douanes du Bénin — « Tarif douanier CEDEAO 2024 » | Ministère des Mines du Bénin — « Statistiques de production minière 2023 » | SETSTO / EGIS Bénin — Entretiens KHEPRA EXPERTS (février 2025) | Traité de la CEDEAO — Article 35 (libre circulation des biens) | CNUCED — « World Investment Report 2024 — Benin Profile ».'),

    h2('V.5 Autres marchés export potentiels'),
    sp(),
    body('Au-delà du Bénin, CGI SA peut explorer des opportunités d\'export vers d\'autres marchés de la sous-région, avec des priorités et des degrés de difficulté évalués :'),
    sp(),

    tbl(
      ['Marché cible', 'Distance', 'Volume potentiel (T/an)', 'Difficulté', 'Priorité'],
      [
        ['Bénin — Cotonou', '176 km', '50 000-80 000', 'Faible', '1 — IMMÉDIATE'],
        ['Ghana — Volta Region', '180 km', '20 000-40 000', 'Moyenne', '2 — COURT TERME'],
        ['Burkina Faso — Ouagadougou', '450 km', '15 000-25 000', 'Moyenne', '3 — MOYEN TERME'],
        ['Ghana — Accra', '350 km', '10 000-20 000', 'Élevée', '4 — MOYEN TERME'],
        ['Nigeria — Lagos (via Bénin)', '280 km', '5 000-15 000', 'Élevée', '5 — LONG TERME'],
      ],
      [22, 18, 22, 20, 18]
    ),
    sp(),

    h2('V.6 Matrice prix / volume / valeur par canal'),
    sp(),
    body('La matrice suivante synthétise la stratégie de prix de CGI SA par canal de distribution et par segment, sur la base du scénario central 2028 :'),
    sp(),

    tbl(
      ['Canal / Marché', 'Volume (K T)', 'Prix moyen (FCFA/T)', 'CA (Mds FCFA)', '% du CA total'],
      [
        ['Marché local Togo — Grands comptes', '275', '8 200', '2,26', '35,3 %'],
        ['Marché local Togo — Promoteurs / PME', '170', '7 800', '1,33', '20,7 %'],
        ['Marchés publics Togo (ARMP)', '120', '8 500', '1,02', '15,9 %'],
        ['Export Bénin — B2B / grands chantiers', '55', '9 200', '0,51', '7,9 %'],
        ['Export Bénin — Promoteurs', '25', '8 800', '0,22', '3,4 %'],
        ['Spécialité haute résistance', '75', '11 500', '0,86', '13,4 %'],
        ['Dalles granite (premium)', '15', '15 000', '0,23', '3,5 %'],
        ['Rebut / bas de gamme', '60', '3 800', '0,23', '3,5 %'],
        ['TOTAL 2028', '795', '—', '6,36', '100 %'],
      ],
      [28, 15, 20, 20, 17]
    ),
    sp(),
    body('Cette matrice confirme la diversification stratégique de CGI SA : aucun canal ne représente plus de 35% du chiffre d\'affaires, réduisant le risque de concentration client. Les segments à forte valeur ajoutée (spécialité + dalles) contribuent à 16,9% du CA avec seulement 11,3% du volume, illustrant l\'efficacité de la stratégie de value-based pricing.'),
    sp(),
    successBox('Conclusion Section V : La stratégie de prix de CGI SA repose sur une hypothèse conservative de +3%/an, une grille de prix segmentée par valeur (standards à 6 500-8 500 FCFA/T, spécialité à 12 000-15 000 FCFA/T), et une stratégie d\'export prioritaire vers le Bénin (50-80K T/an à 8 800-9 200 FCFA/T). Cette approche garantit une marge brute moyenne de 37,1% et un DSCR de 1,85x, avec une diversification géographique et produit qui réduit les risques de concentration.'),
    pb(),
  ];
}