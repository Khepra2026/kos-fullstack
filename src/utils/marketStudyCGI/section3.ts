import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function section3(): (Paragraph | Table)[] {
  return [
    h1('SECTION III — SEGMENTATION PRODUITS ET QUALITÉ'),
    sp(),

    h2('III.1 Introduction — Matrice de segmentation produit / application'),
    body('La production de granulats chez CGI SA s\'articule autour d\'une matrice de segmentation double : (i) par classe granulométrique, déterminant les applications techniques, et (ii) par niveau de performance, déterminant les marchés adressables et les marges. Cette segmentation est structurée conformément aux normes techniques internationales (NF EN 12620, NF EN 13043) et aux exigences de la LNBTP (Laboratoire National du Bâtiment et des Travaux Publics du Togo).'),
    sp(),

    h2('III.2 Segmentation par classe granulométrique'),
    sp(),
    body('Les équipements METSO (Nordberg C120 + HP300) permettent de produire l\'ensemble des classes granulométriques standard du marché BTP, avec une flexibilité de réglage des cribles pour ajuster les courbes granulométriques selon la demande client.'),
    sp(),

    tbl(
      ['Classe granulométrique', 'Désignation technique', 'Applications principales', 'Volume cible CGI (%)', 'Marge brute estimée'],
      [
        ['Grave non traitée 0/31,5', 'GNT 0/31,5 — NF EN 12620, Cat. A', 'Sous-couches routières, remblaiement, fondations larges', '35 %', '28-32 %'],
        ['Grave non traitée 0/20', 'GNT 0/20 — NF EN 12620, Cat. A', 'Couches de base routière, fondations bâtiments', '15 %', '30-34 %'],
        ['Granulats 15/25', 'G 15/25 — NF EN 12620', 'Béton structure (poteaux, poutres, dalles), ouvrages d\'art', '20 %', '38-42 %'],
        ['Granulats 5/15', 'G 5/15 — NF EN 12620', 'Béton courant, dalles, murs, voirie urbaine', '15 %', '35-39 %'],
        ['Sable de concassage 0/5', 'S 0/5 — NF EN 12620', 'Mortiers, chapes, enduits, béton finition', '8 %', '32-36 %'],
        ['Fines 0/2', 'F 0/2 — NF EN 12620', 'Couche de finition, stabilisation, produits dérivés', '4 %', '25-28 %'],
        ['Rebut / tout-venant', 'TV — non normalisé', 'Remblaiement bas de gamme, terrassement', '3 %', '15-18 %'],
      ],
      [20, 25, 30, 13, 12]
    ),
    sp(),

    h3('III.2.1 Caractéristiques techniques par classe'),
    body('Chaque classe granulométrique doit satisfaire des critères techniques précis pour être certifiée LNBTP et conforme aux normes NF EN 12620. Les paramètres de qualité contrôlés sont :'),
    sp(),
    bullet('Los Angeles (LA) : Mesure de la résistance à l\'usure. Seuil LNBTP : LA < 30 pour les couches de base et béton structure. LA < 35 pour les sous-couches. Les granites de Siyimé affichent un LA moyen de 24-26 (excellent).'),
    bullet('Micro-Deval (MDE) : Mesure de la résistance à l\'usure par abrasion. Seuil LNBTP : MDE < 15 pour béton, MDE < 20 pour routes. Siyimé : MDE 12-14 (très bon).'),
    bullet('Coefficient d\'absorption : Capacité d\'absorption d\'eau. Seuil : < 2% pour béton, < 3% pour routes. Siyimé : 0,8-1,2% (excellent pour béton haute performance).'),
    bullet('Module de finesse (MF) : Indice de forme des granulats. Seuil : 2,3 < MF < 3,1 pour béton optimal. Siyimé : MF 2,6-2,8 (idéal).'),
    bullet('Masse volumique : Densité apparente. Siyimé : 2,63 g/cm³ (consistant, prévisible pour le dosage béton).'),
    sp(),

    tbl(
      ['Paramètre qualité', 'Seuil LNBTP / NF EN 12620', 'Valeur Siyimé', 'Conformité', 'Implication marché'],
      [
        ['Los Angeles (LA)', '< 30 (béton / base)', '24-26', '✔ Conforme', 'Couches de base, béton structure, ouvrages d\'art'],
        ['Micro-Deval (MDE)', '< 15 (béton)', '12-14', '✔ Conforme', 'Béton haute performance, précontraint'],
        ['Absorption d\'eau', '< 2 % (béton)', '0,8-1,2 %', '✔ Conforme', 'Béton marin, structures immergées'],
        ['Module de finesse', '2,3-3,1', '2,6-2,8', '✔ Conforme', 'Béton courant et structure optimal'],
        ['Masse volumique', '> 2,50 g/cm³', '2,63 g/cm³', '✔ Conforme', 'Dosage béton prévisible, contrôle qualité'],
        ['Tenue au gel', '< 1 % (perte masse)', '0,3-0,5 %', '✔ Conforme', 'Applications nord Togo, Bénin nord'],
      ],
      [20, 25, 18, 17, 20]
    ),
    sp(),
    infoBox('Source : Laboratoire National du Bâtiment et des Travaux Publics (LNBTP) — « Cahier des charges granulats pour BTP au Togo, édition 2023 » | NF EN 12620 :2013 — « Granulats pour béton » | NF EN 13043 :2013 — « Granulats pour enrobés » | Essais réalisés par le LNBTP sur échantillons Siyimé (rapport KE-LNBTP-2025-001)'),

    h2('III.3 Segment spécialité — Granulats haute résistance (> 120 MPa)'),
    sp(),
    body('Au-delà des granulats standards, CGI SA développe un segment spécialité à haute valeur ajoutée : les granulats haute résistance pour ouvrages d\'art, infrastructures lourdes et bétons à hautes performances (BHP/BTHP). Ce segment représente 20% du volume mais 30% de la marge brute, en raison des barrières techniques et de la rareté des gisements qualifiés.'),
    sp(),

    h3('III.3.1 Caractéristiques des granulats haute résistance'),
    body('Les granulats haute résistance Siyimé sont issus de la zone à grain fin du gisement (faciès porphyroïde à texture dense), avec les caractéristiques suivantes :'),
    sp(),
    bullet('Résistance à la compression du matériau rocheux : 145-180 MPa (vs 80-120 MPa pour les granites standard).'),
    bullet('LA < 20 (excellent) et MDE < 10 (exceptionnel) — permettant des bétons de classe C50/60 et supérieur.'),
    bullet('Absorption < 0,8% — garantissant la durabilité en environnement agressif (eau de mer, sulfates).'),
    bullet('Module d\'élasticité du granulat : 65-75 GPa — compatible avec les bétons précontraints et les ouvrages d\'art.'),
    sp(),

    h3('III.3.2 Applications et marchés cibles'),
    body('Les granulats haute résistance adressent des marchés premium avec des volumes plus faibles mais des marges significativement supérieures :'),
    sp(),

    tbl(
      ['Application', 'Exigence technique', 'Volume potentiel (T/an)', 'Prix cible (FCFA/T)', 'Marge brute'],
      [
        ['Béton haute performance (BHP C50/60)', 'LA < 20, MDE < 10, Abs < 0,8%', '45 000', '12 000-15 000', '48-52 %'],
        ['Ouvrages d\'art (ponts, viaducs)', 'Résistance > 120 MPa, Abs < 1%', '35 000', '10 000-14 000', '45-50 %'],
        ['Béton marin (quais, brise-lames)', 'Abs < 0,8%, MDE < 8, Alcali-réaction négative', '25 000', '11 000-14 000', '47-51 %'],
        ['Bétons précontraints (tabliers, poutres)', 'Module élast. > 65 GPa, LA < 22', '20 000', '13 000-16 000', '50-55 %'],
        ['Dalles et revêtements industriels', 'LA < 25, Polissage > 80 gloss', '30 000', '9 000-12 000', '42-46 %'],
        ['TOTAL spécialité', '—', '155 000', '—', '46-51 %'],
      ],
      [28, 25, 17, 17, 13]
    ),
    sp(),
    body('Le segment spécialité représente 19,5% du volume cible CGI SA (155 000 T sur 795 000 T) mais contribue à 26% de la marge brute totale. Il constitue un pilier stratégique de la différenciation et de la résilience économique face à la concurrence des granulats bas de gamme.'),
    sp(),

    h2('III.4 Matrice prix / volume / marge par segment'),
    sp(),

    tbl(
      ['Segment', 'Volume (K T/an)', 'Prix moyen (FCFA/T)', 'CA (Mds FCFA)', 'Marge brute (%)', 'Marge brute (Mds FCFA)'],
      [
        ['Grave non traitée 0/31,5', '278', '6 500', '1,81', '30 %', '0,54'],
        ['Grave non traitée 0/20', '119', '7 200', '0,86', '32 %', '0,28'],
        ['Granulats 15/25', '159', '8 500', '1,35', '40 %', '0,54'],
        ['Granulats 5/15', '119', '8 000', '0,95', '37 %', '0,35'],
        ['Sable 0/5', '64', '7 500', '0,48', '34 %', '0,16'],
        ['Fines 0/2', '32', '5 000', '0,16', '26 %', '0,04'],
        ['Rebut / TV', '24', '3 500', '0,08', '16 %', '0,01'],
        ['Spécialité haute résistance', '155', '11 500', '1,78', '48 %', '0,85'],
        ['TOTAL', '950', '—', '7,47', '—', '2,77'],
      ],
      [22, 12, 16, 14, 14, 22]
    ),
    sp(),
    body('Note : Le volume total de 950 000 T/an inclut une marge de sécurité de 20% par rapport au SOM cible (795 000 T/an), permettant de répondre aux pics de demande saisonnière (saison sèche = +30% d\'activité BTP). La marge brute moyenne pondérée s\'établit à 37,1%.'),
    sp(),

    h2('III.5 Positionnement qualitatif vs concurrents'),
    sp(),
    body('La matrice de positionnement suivante compare CGI SA aux principaux acteurs du marché sur les dimensions qualité, certification, capacité et flexibilité produit :'),
    sp(),

    tbl(
      ['Critère', 'CGI SA (Siyimé)', 'Granutogo (sud Togo)', 'Carrières artisanales', 'Import (Ghana / Bénin)'],
      [
        ['Certification LNBTP', '✔ Oui — complète', '✔ Oui — partielle', '✘ Non', 'Variable'],
        ['Norme NF EN 12620', '✔ Conforme', '✔ Conforme', '✘ Non conforme', '✔ Conforme'],
        ['Los Angeles (LA)', '24-26 (excellent)', '28-32 (bon)', '35-45 (moyen)', '22-28 (bon)'],
        ['Micro-Deval (MDE)', '12-14 (très bon)', '15-18 (bon)', '20-30 (moyen)', '12-16 (très bon)'],
        ['Capacité industrielle (TPH)', '200-250', '150-200', '20-50', '—'],
        ['Flexibilité granulométrique', '✔ 7 classes', '✔ 5 classes', '✘ 2-3 classes', 'Variable'],
        ['Granulats haute résistance', '✔ Oui (> 120 MPa)', '✘ Non', '✘ Non', '✔ Oui (rare)'],
        ['Contrôle qualité continu', '✔ Oui — labo intégré', '✔ Oui — externe', '✘ Non', '✔ Oui'],
        ['Traçabilité lot', '✔ Oui — QR code', '✘ Non', '✘ Non', 'Variable'],
      ],
      [22, 22, 22, 22, 12]
    ),
    sp(),
    body('CGI SA se distingue par la combinaison unique de certification complète LNBTP, conformité stricte NF EN 12620, capacité industrielle élevée (200-250 TPH), et offre de granulats haute résistance — un positionnement que ni Granutogo ni les carrières artisanales ne peuvent répliquer à court ou moyen terme.'),
    sp(),
    infoBox('Source : LNBTP — « Rapport de certification des carrières actives au Togo, 2024 » | Visites techniques KHEPRA EXPERTS sur sites concurrents (Granutogo, 4 carrières artisanales) | Entretiens avec bureaux d\'études Togolais et Béninois (BECE, SETSTO, EGIS) | Benchmark importateurs granulats Ghana (Kaneshie Quarry, Eastern Quarries).'),
    pb(),
  ];
}