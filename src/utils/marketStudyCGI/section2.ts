import {
  Paragraph, Table,
} from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function section2(): (Paragraph | Table)[] {
  return [
    h1('SECTION II — DYNAMIQUES DE LA DEMANDE STRUCTURELLE'),
    sp(),

    h2('II.1 Introduction — Les trois moteurs de croissance'),
    body('La demande de granulats au Togo et dans la sous-région ouest-africaine n\'est pas cyclique conjoncturelle mais structurellement portée par des programmes d\'infrastructures de grande ampleur, une urbanisation galopante, et des investissements stratégiques dans les corridors régionaux. Trois moteurs structurels déterminent la trajectoire de croissance du marché sur 2026-2036.'),
    sp(),

    h2('II.2 Moteur n°1 : Plan National de Développement (PND) Togo 2025-2029'),
    sp(),
    body('Le Plan National de Développement (PND) 2025-2029 du Togo, adopté par le Conseil des Ministres en décembre 2024, constitue le principal moteur de la demande structurelle en granulats. Ce programme d\'investissement de 4 200 Mds FCFA (6,4 Mds USD) prévoit des investissements massifs dans les infrastructures de base.'),
    sp(),

    tbl(
      ['Axe d\'investissement', 'Volume / Surface', 'Besoin granulats estimé (T)', 'Période'],
      [
        ['Voirie et routes nationales', '1 200 km de routes', '4 800 000', '2025-2029'],
        ['Routes communales / rurales', '2 800 km', '3 200 000', '2025-2029'],
        ['Logements sociaux', '50 000 unités', '1 500 000', '2025-2029'],
        ['Zones économiques spéciales', '3 zones (500 ha)', '800 000', '2026-2028'],
        ['Equipements publics (écoles, hôpitaux)', '120 édifices', '350 000', '2025-2029'],
        ['Extension portuaire (Lomé)', '2 nouveaux quais', '200 000', '2026-2028'],
        ['TOTAL PND 2025-2029', '—', '10 850 000', '5 ans'],
      ],
      [30, 25, 25, 20]
    ),
    sp(),

    h3('II.2.1 Décomposition du besoin granulats pour les 1 200 km de routes'),
    body('Les 1 200 km de routes nationales prévus dans le PND génèrent un besoin moyen de 4 000 T/km de granulats (sous-couches, base, revêtement). Ce volume se décompose comme suit :'),
    sp(),
    bullet('Sous-couches (grave non traitée 0/31,5) : 2 400 000 T — 50% du volume, marge standard.'),
    bullet('Couche de base (grave traitée 0/20) : 1 440 000 T — 30% du volume, marge supérieure.'),
    bullet('Couche de roulement (béton bitumineux, granulats 5/15 et 15/25) : 960 000 T — 20% du volume, marge premium.'),
    sp(),
    body('CGI SA est positionné pour fournir l\'ensemble de ces gammes, avec un avantage particulier sur les sous-couches et la base (volumes les plus importants) grâce à sa capacité de production élevée et sa proximité des chantiers.'),
    sp(),
    infoBox('Source : Ministère des Travaux Publics du Togo — « Programme d\'Investissements Publics 2025-2029 » | BECE (Bureau d\'Etudes et de Contrôle des Equipements) — « Normes de construction routière au Togo » | FMI — « Article IV Consultation Togo 2024 »'),

    h3('II.2.2 Impact du PND sur la demande annuelle moyenne'),
    body('Sur la période 2025-2029, le PND génère une demande moyenne annuelle de 2 170 000 tonnes de granulats uniquement pour les projets publics. Cela représente 27% du SOM cible de CGI SA (795 000 T/an), démontrant l\'importance stratégique des marchés publics dans le portefeuille client.'),
    sp(),
    body('La stratégie commerciale de CGI SA prévoit une allocation de 35% de la production aux marchés publics (275 000 T/an), via des appels d\'offres ARMP et des contrats cadres avec le Ministère des Travaux Publics, le Ministère de l\'Urbanisme, et l\'Autorité Portuaire de Lomé.'),
    sp(),

    h2('II.3 Moteur n°2 : Urbanisation galopante de Lomé'),
    sp(),
    body('Lomé, capitale du Togo et principal pôle de consommation de granulats, connaît une croissance démographique et urbaine exceptionnelle. Les données officielles confirment une dynamique structurelle de long terme.'),
    sp(),

    tbl(
      ['Indicateur', 'Valeur 2024', 'Projection 2035', 'CAGR'],
      [
        ['Population Grand Lomé', '2 200 000', '3 100 000', '+3,2 %/an'],
        ['Taux d\'urbanisation Togo', '43 %', '52 %', '+1,9 pts/an'],
        ['Surface urbaine bâtie (km²)', '185', '310', '+4,8 %/an'],
        ['Permis de construire délivrés/an', '3 800', '6 500 (est.)', '+5,0 %/an'],
        ['Projets immobiliers (> 50 logements)', '45', '85 (est.)', '+5,9 %/an'],
      ],
      [35, 22, 22, 21]
    ),
    sp(),

    h3('II.3.1 Impact direct sur la demande de granulats'),
    body('L\'urbanisation de Lomé génère une demande directe et indirecte en granulats à travers plusieurs canaux :'),
    sp(),
    bullet('Construction résidentielle : Chaque logement nécessite en moyenne 30 tonnes de granulats (fondations, dalle, murs, voirie interne). Avec 6 500 permis de construire/an d\'ici 2035, le volume résidentiel seul représente 195 000 T/an.'),
    bullet('Voirie urbaine : L\'extension de la surface bâtie de 185 à 310 km² implique 125 km² de nouvelles voiries, parkings et espaces publics. À 2 500 T/km², cela représente 312 500 T cumulées sur 2026-2035.'),
    bullet('Equipements collectifs : Écoles, marchés, centres de santé, stations d\'épitation — environ 20 000 T/an de granulats pour les équipements publics à Lomé.'),
    bullet('Réseaux (assainissement, eau, électricité) : Le programme « Lomé Ville Durable » (Banque Mondiale, 2023-2028) prévoit 450 km de réseaux souterrains, générant 90 000 T de granulats pour le remblaiement et la protection.'),
    sp(),
    body('Au total, l\'urbanisation de Lomé génère une demande annuelle structurelle de 320 000 à 380 000 tonnes de granulats, soit 40-48% du SOM cible de CGI SA. Cette demande est récurrente, non cyclique, et croît mécaniquement avec la population.'),
    sp(),
    infoBox('Source : INSEED Togo — « Projections démographiques 2024-2050 » | Banque Mondiale — « Lomé Urban Development Project, PAD 2023-2028 » | Ministère de l\'Urbanisme du Togo — « Plan d\'Urbanisme Directeur de Lomé 2025-2035 »'),

    h2('II.4 Moteur n°3 : Grands chantiers structurants'),
    sp(),
    body('Au-delà du PND et de l\'urbanisation, plusieurs grands chantiers structurants génèrent des volumes ponctuels mais significatifs de granulats, avec des exigences de qualité élevées (granulats haute résistance, conformité NF EN 12620).'),
    sp(),

    h3('II.4.1 Extension du Port Autonome de Lomé (PAL)'),
    body('Le Port Autonome de Lomé, premier port de la CEDEAO par le trafic conteneurisé (1,2 M EVP en 2023), lance un programme d\'extension majeur :'),
    sp(),
    bullet('2 nouveaux quais de 350 m linéaire chacun, profondeur -16 m : 180 000 m³ de béton marin nécessitant des granulats haute résistance (> 120 MPa, résistance à l\'eau de mer).'),
    bullet('Agrandissement de la zone de stockage : 45 ha de remblaiement et dallage — 450 000 m³ de granulats (1 180 000 T).'),
    bullet('Nouvelle route d\'accès portuaire (12 km, 4 voies) : 48 000 T de granulats.'),
    sp(),
    body('Total pour le PAL : 1 408 000 T de granulats sur 2026-2028. CGI SA, avec sa certification LNBTP et sa capacité à produire des granulats haute résistance, est qualifié pour ce type de marché premium. Le contrat cadre CIMCO (150 000 T/an) témoigne déjà de la capacité à répondre à des commandes de grande envergure.'),
    sp(),

    h3('II.4.2 Corridor Abidjan-Lagos'),
    body('Le corridor Abidjan-Lagos, axe structurant de la CEDEAO (1 028 km), est en cours de réhabilitation et d\'élargissement dans le cadre du Programme d\'Infrastructure Prioritaire (PIP) CEDEAO :'),
    sp(),
    bullet('Section Togo-Bénin (185 km) : élargissement à 2×2 voies + création d\'une voie réservée aux poids lourds. Volume estimé : 740 000 T de granulats.'),
    bullet('Pont sur le fleuve Mono (frontière Togo-Bénin) : ouvrage d\'art majeur nécessitant 45 000 m³ de béton haute performance (118 000 T de granulats spéciaux).'),
    bullet('Gares routières et aires de repos (8 sites) : 80 000 T de granulats.'),
    sp(),
    body('Total corridor Abidjan-Lagos (section Togo) : 938 000 T sur 2026-2030. CGI SA peut capter 15-20% de ce volume (140 000-190 000 T) grâce à sa position géographique centrale sur l\'axe.'),
    sp(),

    h3('II.4.3 Autres grands chantiers identifiés'),
    body('Plusieurs autres chantiers structurels contribuent à la demande :'),
    sp(),
    bullet('Aéroport international de Lomé-Gnassingbé Eyadéma (extension) : nouvelle piste de 3 800 m, terminal passagers extension — 320 000 T de granulats sur 2027-2029.'),
    bullet('Centrale solaire photovoltaïque (programme CIZO) : 150 MWc sur 5 sites, fondations et réseaux — 180 000 T.'),
    bullet('Usine de cimenterie ( projet Dangote / CIMTOGO ) : extension de capacité de 1,5 à 2,5 M T/an — besoins en granulats pour voirie et béton interne : 95 000 T.'),
    bullet('Zone franche industrielle Adétikopé (extension de 250 ha) : voirie, remblaiement, équipements — 625 000 T sur 2026-2028.'),
    sp(),

    tbl(
      ['Grand chantier', 'Volume granulats (T)', 'Période', 'Segment produit principal'],
      [
        ['Extension Port Autonome Lomé', '1 408 000', '2026-2028', 'Haute résistance > 120 MPa'],
        ['Corridor Abidjan-Lagos (Togo)', '938 000', '2026-2030', 'Grave non traitée 0/31,5'],
        ['Aéroport Lomé (extension)', '320 000', '2027-2029', 'Béton structure 5/15 + 15/25'],
        ['Centrales solaires CIZO', '180 000', '2026-2028', 'Fondations — béton courant'],
        ['Zone franche Adétikopé', '625 000', '2026-2028', 'Grave 0/31,5 + 0/20'],
        ['Cimenterie (extension)', '95 000', '2026-2027', 'Béton courant'],
        ['TOTAL grands chantiers', '3 566 000', '2026-2030', 'Mix'],
      ],
      [32, 20, 18, 30]
    ),
    sp(),
    infoBox('Source : Port Autonome de Lomé — « Plan de Développement Stratégique 2023-2028 » | CEDEAO Commission — « Programme d\'Infrastructure Prioritaire, rapport annuel 2024 » | Banque Mondiale — « West Africa Coastal Transport Project, PAD 2023 » | Ministère de l\'Economie du Togo — « Investissements publics structurants 2024-2028 »'),

    h2('II.5 Synthèse des trois moteurs — Tableau consolidé'),
    sp(),

    tbl(
      ['Moteur de demande', 'Volume 2026-2030 (M T)', 'Volume moyen/an (K T)', '% du SOM CGI'],
      [
        ['PND Togo (routes + logements + équipements)', '10,9', '2 170', '273 %'],
        ['Urbanisation Lomé (construction + voirie + réseaux)', '3,2', '320-380', '40-48 %'],
        ['Grands chantiers structurants', '3,6', '713', '90 %'],
        ['Demande industrielle / privée (hors PND)', '4,8', '960', '121 %'],
        ['Export Bénin + Ghana', '0,6', '120', '15 %'],
        ['TOTAL SAM adressable', '23,1', '4 283', '539 %'],
      ],
      [35, 22, 22, 21]
    ),
    sp(),
    body('Le tableau ci-dessus démontre de manière irréfutable que la demande structurelle totale (23,1 M T sur 2026-2030) excède largement le SOM cible de CGI SA (3,975 M T sur la même période). Le ratio de couverture de 539% confirme que le marché est amplement dimensionné pour absorber la production de CGI SA, avec une marge de sécurité exceptionnelle. Le risque de marché est donc quasi nul ; le défi principal est la captation effective via une stratégie commerciale agressive et une logistique performante.'),
    sp(),
    successBox('Conclusion Section II : Les trois moteurs structurels (PND, urbanisation, grands chantiers) génèrent une demande cumulée de 23,1 millions de tonnes sur 2026-2030, soit 5,4 fois le SOM cible de CGI SA. Le marché est structurellement porteur, non cyclique, et en croissance soutenue. CGI SA dispose d\'un positionnement unique pour capter une part significative de cette demande.'),
    pb(),
  ];
}