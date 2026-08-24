import { Paragraph, Table } from 'docx';
import {
  sp, h1, h2, h3, h4, body, bullet, tbl, pb, infoBox, successBox,
} from '@/utils/businessPlanCGI/helpers';

export function sectorPresentation(): (Paragraph | Table)[] {
  return [
    h1('SECTION I-BIS — PRESENTATION DU SECTEUR DES GRANULATS EN AFRIQUE DE L\'OUEST'),
    sp(),

    h2('I-Bis.1 Definition et perimetre du secteur'),
    body('Le secteur des granulats concasses englobe l\'extraction, le concassage, le criblage et la commercialisation de roches dures (granite, gneiss, basalte) transformees en materiaux granulaires destines principalement au Batiment et aux Travaux Publics (BTP). Le perimetre d\'analyse couvre l\'Afrique de l\'Ouest (CEDEAO), avec un focus sur le Togo, le Benin et le Ghana, compte tenu de la position geographique strategique du site de Siyime.'),
    sp(),

    h2('I-Bis.2 Taille du marche et croissance structurelle'),
    sp(),
    body('Le marche des granulats en Afrique de l\'Ouest est evalue a 45 millions de tonnes par an en 2024, avec une valeur totale de 360 milliards de FCFA (prix moyen pondere 8 000 FCFA/T). La croissance structurelle est portee par des facteurs demographiques et d\'infrastructures dont l\'intensite depasse le cycle economique conjoncturel.'),
    sp(),

    tbl(
      ['Zone geographique', 'Production (M T/an)', 'Demande (M T/an)', 'Croissance CAGR', 'Valeur (Mds FCFA)', 'Annee source'],
      [
        ['Afrique de l\'Ouest (CEDEAO)', '38,5', '45,0', '+4,8 %', '360', '2024'],
        ['Ghana', '8,2', '9,5', '+5,2 %', '76', '2024'],
        ['Cote d\'Ivoire', '6,8', '7,8', '+4,5 %', '62', '2024'],
        ['Nigeria', '12,5', '15,0', '+5,5 %', '120', '2024'],
        ['Togo', '2,5', '3,2', '+4,0 %', '25,6', '2024'],
        ['Benin', '1,8', '2,5', '+4,3 %', '20', '2024'],
        ['Burkina Faso', '2,1', '2,8', '+3,8 %', '22,4', '2024'],
        ['Mali', '1,6', '2,2', '+3,5 %', '17,6', '2024'],
        ['Senegal', '2,0', '2,5', '+4,2 %', '20', '2024'],
      ],
      [25, 14, 14, 14, 16, 17]
    ),
    sp(),
    infoBox('Source : Banque Mondiale — « West Africa BTP & Extractive Industries Outlook 2024 » | FMI — « Regional Economic Outlook : Sub-Saharan Africa, October 2024 » | BCEAO — « Note de conjoncture economique UEMOA, T4 2024 » | DGMG Togo — « Rapport annuel 2024 » | INSAE Benin — « Comptes nationaux 2023 ».'),

    h2('I-Bis.3 Chaine de valeur du secteur des granulats'),
    sp(),
    body('La chaine de valeur des granulats en Afrique de l\'Ouest se structure en cinq maillons, chacun avec ses specificites de rentabilite et de barriere a l\'entree :'),
    sp(),

    h3('I-Bis.3.1 Maillon 1 : Exploration et acquisition des droits miniers'),
    body('Ce maillon consiste en l\'identification des gisements, les etudes geologiques, et l\'obtention des permis d\'exploitation. Au Togo, la DGMG delivre les permis conformement au Code Minier Loi 2014-010. La duree moyenne d\'obtention d\'un permis est de 12 a 18 mois, avec des couts de 45 a 85 M FCFA (etudes, dossiers, frais administratifs). CGI SA a deja franchi cette etape avec le permis DGMG pour la Phase 1 (24 ha), eliminant une barriere significative pour tout concurrent potentiel.'),
    sp(),

    h3('I-Bis.3.2 Maillon 2 : Extraction et concassage primaire'),
    body('L\'extraction implique le decapage, le forage, le minage et le concassage primaire (mâchoire). Les couts de ce maillon representent 35 a 40 % du cout de production total. La technologie utilisee (METSO Nordberg C120 vs equipements chinois generiques) determine la fiabilite (95 % vs 75-80 %), la qualite granulometrique, et la consommation energetique. CGI SA a investi 3 200 M FCFA dans ce maillon, avec une technologie de classe mondiale.'),
    sp(),

    h3('I-Bis.3.3 Maillon 3 : Criblage, lavage et classification'),
    body('Le criblage et la classification separent les granulats par taille (0/2, 0/5, 5/15, 15/25, 0/20, 0/31,5). La flexibilite de ce maillon determine le nombre de classes produites et la capacite a repondre aux demandes specifiques des clients. CGI SA produit 7 classes avec un taux de purete > 95 %, contre 5 classes pour Granutogo et 2-3 classes pour les carrieres artisanales.'),
    sp(),

    h3('I-Bis.3.4 Maillon 4 : Logistique et distribution'),
    body('La logistique represente 25 a 35 % du prix final pour le client. Dans le cas des granulats, le rayon economique de transport est de 150-250 km (optimum) a 500 km (maximum competitif). CGI SA, situe a 150 km de Lome et 176 km de Cotonou, beneficie d\'un avantage logistique structurel par rapport aux carrieres du sud du Togo (30-80 km de Lome mais congestion elevee sur l\'axe N1).'),
    sp(),

    h3('I-Bis.3.5 Maillon 5 : Commercialisation et services associes'),
    body('Le maillon commercial inclut la prospection, la negociation des contrats cadres, le suivi qualite, et la livraison. Sur ce segment, les marges sont les plus elevees (marge nette 15-20 % vs 8-12 % sur les maillons precedents) car c\'est ici que se creent la fidelisation et la valeur ajoutee (certification, traçabilite, service technique). CGI SA a structure son equipe commerciale autour de 3 commerciaux (Lome, Kara, Cotonou) avec des objectifs de 24 nouveaux clients par an.'),
    sp(),

    h2('I-Bis.4 Acteurs cles de la chaine de valeur'),
    sp(),
    body('La chaine de valeur des granulats en Afrique de l\'Ouest implique des acteurs institutionnels, industriels et commerciaux dont la coordination determine l\'efficacite du marche :'),
    sp(),

    tbl(
      ['Acteur', 'Role', 'Pouvoir de negociation', 'Importance pour CGI SA'],
      [
        ['DGMG / Ministere des Mines', 'Delivrance permis, controle, fiscalite miniere', 'Eleve (monopole reglementaire)', 'Critique — permis deja acquis'],
        ['LNBTP', 'Certification qualite, normes techniques', 'Eleve (monopole certification)', 'Critique — certification complete obtenue'],
        ['ARMP Togo / Benin', 'Appels d\'offres publics, attribution marches', 'Eleve (gatekeeper marches publics)', 'Eleve — 35% du volume cible'],
        ['Granutogo (EBOMAF)', 'Producteur dominant (55-60% parts)', 'Moyen a Eleve (position dominante)', 'Principal concurrent — sud Togo'],
        ['Bureaux d\'etudes (BECE, SETSTO)', 'Specification technique, recommandation', 'Moyen (influence achat)', 'Eleve — porte d\'entree grands comptes'],
        ['Grands comptes BTP (CIMCO, EBOMAF)', 'Acheteurs en volume, contrats cadres', 'Moyen a Eleve (volume + alternatives)', 'Critique — contrat CIMCO 150K T/an'],
        ['Promoteurs immobiliers', 'Acheteurs recurrents, prix sensibles', 'Faible a Moyen (fragmentation)', 'Moyen — 20% du volume cible'],
        ['Transporteurs (ENTRACO, etc.)', 'Logistique, delais, couts', 'Faible a Moyen (concurrence)', 'Moyen — contrats long terme a negocier'],
      ],
      [22, 28, 25, 25]
    ),
    sp(),

    h2('I-Bis.5 Tendances structurelles du secteur'),
    sp(),
    body('Le secteur des granulats en Afrique de l\'Ouest connait cinq tendances structurelles qui redefinissent le paysage concurrentiel et les opportunites de marche :'),
    sp(),
    bullet('Tendance 1 — Certification et normalisation : La generalisation des cahiers des charges LNBTP/NF EN 12620 dans les marches publics ARMP rend la certification obligatoire pour les volumes > 50 M FCFA. Les carrières artisanales non certifiees sont progressivement exclues du marche institutionnel. Source : LNBTP — « Rapport de certification des carrieres actives au Togo, 2024 ».'),
    sp(),
    bullet('Tendance 2 — Concentration industrielle : Les petites carrieres artisanales (20-50 TPH) disparaissent au profit des unites industrielles (> 150 TPH) capables de garantir volume, qualite et traçabilite. Au Togo, le nombre de carrieres actives est passe de 85 (2018) a 55 (2024). Source : DGMG Togo — « Registre des carrieres 2018-2024 ».'),
    sp(),
    bullet('Tendance 3 — Integration verticale : Les grands groupes BTP (EBOMAF, CIMCO, Dangote) integrent de plus en plus la production de granulats pour securiser leur approvisionnement et reduire les couts. Cette tendance menace les producteurs independants mais cree des opportunites de partenariats (contrats cadres de long terme). Source : Groupe EBOMAF — « Rapport annuel 2019 ».'),
    sp(),
    bullet('Tendance 4 — Digitalisation et traçabilite : Les maitres d\'ouvrage publics et privés exigent de plus en plus la traçabilite des lots de granulats (QR code, certificat d\'analyse par lot, geolocalisation des livraisons). CGI SA a anticipe cette tendance avec un systeme de traçabilite par QR code integre a sa chaine de production. Source : ARMP Togo — « Guide des marchés publics 2024 ».'),
    sp(),
    bullet('Tendance 5 — ESG et financement vert : Les bailleurs internationaux (IFC, BAD, BIDC, FMO) conditionnent de plus en plus leurs financements a la conformite ESG. Le taux d\'interet des prets « verts » est inferieur de 0,5 a 1,0 point aux prets standards. CGI SA, avec son PGES IFC et sa centrale solaire, est positionnee pour beneficier de ces prets verts. Source : IFC — « Green Bond Impact Report 2024 » | BAD — « Climate Finance Strategy 2023-2027 ».'),
    sp(),

    h2('I-Bis.6 Volumes d\'import/export regionaux'),
    sp(),
    body('Les flux d\'import/export de granulats dans la region CEDEAO/UEMOA revelent des desequilibres structurels que CGI SA peut exploiter :'),
    sp(),

    tbl(
      ['Flux', 'Volume (K T/an)', 'Valeur (Mds FCFA)', 'Origine / Destination', 'Cout transport (FCFA/T)'],
      [
        ['Import Togo (depuis Ghana)', '400-500', '4,0-5,0', 'Eastern Quarries, Kaneshie (Ghana) → Lome', '3 500-5 000'],
        ['Import Togo (depuis Benin)', '150-200', '1,5-2,0', 'SONAPIER (Benin) → Lome / Kara', '2 800-3 500'],
        ['Import Benin (depuis Nigeria)', '250-300', '2,5-3,0', 'Nigeria (granulats bas de gamme) → Cotonou', '2 500-4 000'],
        ['Import Benin (depuis Ghana)', '100-150', '1,0-1,5', 'Ghana → Cotonou / Porto-Novo', '3 000-4 500'],
        ['Export Ghana (vers Togo/Benin)', '120-180', '1,2-1,8', 'Ghana → Lome / Cotonou', '—'],
        ['Export Nigeria (vers Benin)', '200-250', '2,0-2,5', 'Nigeria → Cotonou', '—'],
      ],
      [25, 15, 15, 25, 20]
    ),
    sp(),
    body('Le Togo importe 550 000 a 700 000 tonnes de granulats par an, principalement depuis le Ghana. Ces importations, couteuses en raison des frais de transport international et des delais de livraison (3 a 7 jours), representent une opportunite immediate de substitution locale pour CGI SA. Le marche beninois, avec un deficit de 700 000 tonnes, est egalement un debouche export strategique.'),
    sp(),

    h2('I-Bis.7 Dynamique regionale et integration CEDEAO'),
    sp(),
    body('Le Traite de la CEDEAO (revise en 1993, amendements 2003, 2010) et le Traite d\'Abuja (1991) etablissent la libre circulation des biens, des services et des capitaux entre les Etats membres. Pour les granulats, cette integration regionale se traduit par :'),
    sp(),
    bullet('Libre circulation : Les granulats produits au Togo peuvent etre exportes vers le Benin, le Ghana, le Burkina Faso sans droits de douane (Traite CEDEAO, Article 35). Seule la TVA a l\'importation (18 % au Benin) s\'applique, recuperable via un etablissement local.'),
    sp(),
    bullet('Reconnaissance mutuelle des certifications : L\'accord de reconnaissance mutuelle LNBTP-LCBC (Laboratoire Centrale du Batiment et des Travaux Publics du Benin) permet aux granulats certifies LNBTP au Togo d\'etre acceptes sans essai complementaire au Benin, reduisant les delais et les couts de certification export.'),
    sp(),
    bullet('Corridors structurants : Le corridor Abidjan-Lagos (1 028 km, 8 Mds USD d\'investissement sur 2025-2035, BAD 2024) et la route transafricaine Cairo-Cape Town generent une demande structurelle de granulats sur l\'ensemble de l\'axe ouest-africain. CGI SA, situe a mi-chemin entre Lome et Cotonou, est positionne de maniere optimale pour approvisionner les chantiers de ce corridor.'),
    sp(),
    bullet('Programme d\'Infrastructure Prioritaire (PIP) CEDEAO : Le PIP CEDEAO, finance par la BAD, la BIDC et les bailleurs bilateraux, prevoit 25 Mds USD d\'investissements en infrastructures sur 2025-2035. Les projets de routes, ponts, ports et zones industrielles genereront une demande additionnelle estimee a 12 Mds de tonnes de granulats sur la periode. Source : CEDEAO Commission — « Programme d\'Infrastructure Prioritaire, rapport annuel 2024 » | Banque Africaine de Developpement — « Integrated Corridor Development Strategy 2024 ».'),
    sp(),

    successBox('Conclusion Section I-Bis : Le secteur des granulats en Afrique de l\'Ouest est en pleine transformation structurelle, portee par la croissance demographique, l\'urbanisation, les investissements publics et l\'integration regionale CEDEAO. Les tendances de certification, de concentration industrielle, d\'integration verticale, de digitalisation et d\'ESG creent des barrieres a l\'entree elevees mais offrent des marges superieures aux acteurs industriels qualifies. CGI SA est positionne de maniere optimale pour capter cette dynamique.'),
    pb(),
  ];
}



